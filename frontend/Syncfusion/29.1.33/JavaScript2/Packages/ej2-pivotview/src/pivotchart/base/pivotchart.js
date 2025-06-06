import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { Chart, ColumnSeries, LineSeries, Legend, Tooltip, Category, AreaSeries, Selection, StripLine, DataLabel, StackingLineSeries } from '@syncfusion/ej2-charts';
import { AccumulationChart, PieSeries, FunnelSeries, PyramidSeries } from '@syncfusion/ej2-charts';
import { SplineAreaSeries, MultiColoredLineSeries, RangeAreaSeries, StackingAreaSeries, StepAreaSeries } from '@syncfusion/ej2-charts';
import { MultiColoredAreaSeries, SplineSeries, StepLineSeries, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-charts';
import { StackingColumnSeries, RangeColumnSeries, BarSeries, StackingBarSeries, ScatterSeries } from '@syncfusion/ej2-charts';
import { RadarSeries } from '@syncfusion/ej2-charts';
import { ScrollBar, Zoom, PolarSeries } from '@syncfusion/ej2-charts';
import { ParetoSeries, Export, Crosshair, MultiLevelLabel } from '@syncfusion/ej2-charts';
import { BubbleSeries } from '@syncfusion/ej2-charts';
import { AccumulationDataLabel, getSeriesColor } from '@syncfusion/ej2-charts';
import { createElement, remove, isNullOrUndefined, select } from '@syncfusion/ej2-base';
import { PivotUtil } from '../../base/util';
import { ContextMenu } from '@syncfusion/ej2-navigations';
import { hideSpinner } from '@syncfusion/ej2-popups';
import { DataManager } from '@syncfusion/ej2-data';
var PivotChart = /** @class */ (function () {
    /**
     * Constructor for pivot chart module.
     *
     *  @param {PivotView} parent - Instance of pivot table.
     */
    function PivotChart(parent) {
        this.headerColl = {};
        this.maxLevel = 0;
        this.columnGroupObject = {};
        this.selectedLegend = 0;
        this.chartSeriesInfo = {};
        this.measurePos = -1;
        this.measuresNames = {};
        this.accumulationType = ['Pie', 'Pyramid', 'Doughnut', 'Funnel'];
        this.isChartInitial = true;
        this.parent = parent;
    }
    /**
     * Get component name.
     *
     * @returns {string} - string
     * @private
     */
    PivotChart.prototype.getModuleName = function () {
        return 'pivotChart';
    };
    /**
     * Initialize the pivot chart rendering
     *
     * @param {PivotView} parent - Specifies the pivot table component instance.
     * @param {ChartSettingsModel} chartSettings - Specifies the chart settings.
     * @returns {void}
     * @private
     */
    PivotChart.prototype.loadChart = function (parent, chartSettings) {
        this.parent = parent;
        this.measuresNames = {};
        this.engineModule = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        this.dataSourceSettings = this.parent.dataSourceSettings;
        this.chartSettings = chartSettings;
        var isDataAvail = parent.dataType === 'olap' ?
            (parent.dataSourceSettings.url !== '' && !parent.olapEngineModule.isEmptyData &&
                parent.olapEngineModule.tupColumnInfo.length > 0 && parent.olapEngineModule.tupRowInfo.length > 0 &&
                (!isNullOrUndefined(parent.olapEngineModule.colMeasurePos) || !isNullOrUndefined(parent.olapEngineModule.rowMeasurePos)))
            : this.parent.dataSourceSettings.mode === 'Server' ? (!isNullOrUndefined(parent.dataSourceSettings.url) &&
                parent.dataSourceSettings.url !== '' && parent.dataSourceSettings.values.length > 0 && !parent.engineModule.isEmptyData) :
                (parent.dataSourceSettings.values.length > 0 && parent.dataSourceSettings.dataSource &&
                    (parent.dataSourceSettings.dataSource.length > 0 ||
                        (parent.dataSourceSettings.dataSource instanceof DataManager)) && !parent.engineModule.isEmptyData);
        if (isDataAvail) {
            if (!this.parent.chart && (this.parent.element.querySelector('.e-chart') || this.parent.element.querySelector('.e-accumulationchart'))) {
                remove(select('#' + this.parent.element.id + '_chart', this.parent.element));
            }
            if (this.chartSettings.enableMultipleAxis && this.accumulationType.indexOf(chartSettings.chartSeries.type) < 0 && this.chartSettings.chartSeries.type !== 'Pareto') {
                this.measureList = this.dataSourceSettings.values.map(function (item) { return item.name; });
            }
            else {
                this.measureList = [chartSettings.value === '' ? this.dataSourceSettings.values[0].name : chartSettings.value];
            }
            for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
                var field = _a[_i];
                var fieldName = field.name.replace(/[^A-Z0-9]+/ig, '_');
                this.measuresNames[field.name] = fieldName;
                this.measuresNames[fieldName] = field.name;
                if ((this.chartSettings.chartSeries.type === 'Polar' || this.chartSettings.chartSeries.type === 'Radar')) {
                    this.measuresNames[field.caption ? field.caption : field.name] = field.name;
                }
            }
        }
        else if (this.parent.chart) {
            if (this.parent.element.querySelector('.e-chart')) {
                this.parent.chart.series = [];
                this.parent.chart.rows = [];
                this.parent.chart.primaryXAxis.title = '';
                this.parent.chart.primaryYAxis.title = '';
                this.parent.chart.primaryXAxis.multiLevelLabels = [];
                this.parent.chart.primaryYAxis.multiLevelLabels = [];
                if (this.parent.chart.axes.length > 0) {
                    this.parent.chart.axes[0].title = '';
                }
                this.parent.chart.primaryXAxis.zoomFactor = isNullOrUndefined(this.parent.chartSettings.primaryXAxis.zoomFactor)
                    ? 1 : this.parent.chartSettings.primaryXAxis.zoomFactor;
            }
            else if (this.parent.element.querySelector('.e-accumulationchart')) {
                this.parent.chart.series[0].dataSource = [{}];
                this.parent.chart.series[0].dataLabel = {};
            }
            this.parent.chart.refresh();
            return;
        }
        else {
            this.parent.appendChartElement();
            if (this.parent.enableVirtualization && this.isChartInitial) {
                this.isChartInitial = false;
                this.parent.onContentReady();
            }
            this.parent.notify(events.contentReady, {});
            return;
        }
        this.columnGroupObject = {};
        this.accEmptyPoint = false;
        var pivotValues = this.engineModule.pivotValues;
        this.currentMeasure = (chartSettings.enableMultipleAxis && this.accumulationType.indexOf(chartSettings.chartSeries.type) < 0 && this.chartSettings.chartSeries.type !== 'Pareto') ? this.measureList[0] :
            (((chartSettings.value === '' || this.dataSourceSettings.values.filter(function (item) {
                return item.name === chartSettings.value;
            }).length === 0) && this.dataSourceSettings.values.length > 0) ? this.dataSourceSettings.values[0].name : chartSettings.value);
        var totColIndex = this.getColumnTotalIndex(pivotValues);
        var rKeys = Object.keys(pivotValues);
        var prevLevel;
        var firstLevelUName;
        var levelCollection = {};
        var prevCell;
        var integratedLevel = 0;
        var indexCount = -0.5;
        this.headerColl = {};
        this.maxLevel = 0;
        var levelPos = {};
        var lastHierarchy = '';
        var lastDimension = '';
        var memberCell;
        var drillDimension = '';
        this.chartSeriesInfo = {};
        this.selectedLegend = 0;
        var isDrill = false;
        var measureNames = {};
        var isValidHeader = false;
        var delimiter = this.parent.dataSourceSettings.valueSortSettings.headerDelimiter;
        for (var _b = 0, _c = this.dataSourceSettings.values; _b < _c.length; _b++) {
            var field = _c[_b];
            var fieldName = field.name;
            measureNames[fieldName] = field.caption ? field.caption : fieldName;
            measureNames[field.caption ? field.caption : fieldName] = fieldName;
        }
        if (this.parent.dataType === 'olap') {
            var fieldPosition = [];
            levelPos = this.groupHierarchyWithLevels(pivotValues, fieldPosition);
            lastHierarchy = fieldPosition[fieldPosition.length - 1];
            lastDimension = (this.measurePos === (fieldPosition.length - 1) && fieldPosition.length > 1) ?
                fieldPosition[fieldPosition.length - 2] : lastHierarchy;
            drillDimension = lastDimension;
        }
        var reductionLevel = 0;
        var reductionLevelCount = 0;
        var finalReductionLevel = 0;
        var rowsInclude = false;
        var ignoreCount = 0;
        var rowReduction = 0;
        var previousHeader = 0;
        for (var _d = 0, rKeys_1 = rKeys; _d < rKeys_1.length; _d++) {
            var rKey = rKeys_1[_d];
            var rowIndex = Number(rKey);
            var drillMem = void 0;
            var previousRow = false;
            var firstRowCell = void 0;
            var indexReduction = void 0;
            if (rowsInclude) {
                firstRowCell = pivotValues[rowIndex - rowReduction][this.parent.engineModule.rowMaxLevel];
            }
            else {
                firstRowCell = pivotValues[rowIndex][this.parent.gridSettings.layout === 'Tabular' ?
                    this.parent.engineModule.rowMaxLevel : 0];
            }
            if (firstRowCell) {
                indexReduction = rowReduction === firstRowCell.level ? 1 : (rowReduction + 1);
            }
            if (this.parent.gridSettings.layout === 'Tabular' && (!this.parent.dataSourceSettings.showSubTotals ||
                (!this.parent.dataSourceSettings.showRowSubTotals && this.parent.dataSourceSettings.showColumnSubTotals))) {
                if (firstRowCell && pivotValues[rowIndex - (rowReduction === firstRowCell.level ? 1 : (rowReduction + 1))] &&
                    !this.dataSourceSettings.showSubTotals &&
                    pivotValues[rowIndex - indexReduction][this.parent.engineModule.rowMaxLevel]) {
                    var previousRowCell = rowsInclude ?
                        pivotValues[rowIndex - (rowReduction + 1)][this.parent.engineModule.rowMaxLevel]
                        : pivotValues[rowIndex - indexReduction][this.parent.engineModule.rowMaxLevel];
                    var previousRowLevelName = previousRowCell.valueSort.levelName;
                    var previousRowLevelNameCollection = previousRowLevelName.split(delimiter);
                    var firstRowLevelName = firstRowCell.valueSort.levelName;
                    var levelNameCollection = firstRowLevelName.split(delimiter);
                    var previousRowTextCollection = previousRowCell.formattedText.split(' ');
                    drillMem = this.isMemberDrilled(previousRowCell, previousRowTextCollection);
                    for (var z = ((previousRowLevelNameCollection.length - 2) - previousHeader); z >= 0; z--) {
                        if (previousRowLevelNameCollection[z] !==
                            levelNameCollection[z] && !drillMem) {
                            if (ignoreCount !== 1) {
                                firstRowCell = rowsInclude ? pivotValues[rowIndex - (rowReduction + 1)][z] :
                                    pivotValues[rowIndex - (rowReduction === firstRowCell.level ? 1 : (rowReduction + 1))][z];
                                previousRow = true;
                                rowsInclude = true;
                                ignoreCount++;
                                rowReduction++;
                                var rowKeys = Number(rKeys[rKeys.length - 1]) + 1;
                                rKeys[rKeys.length] = rowKeys.toString();
                                if (previousRowLevelNameCollection[z - 1] && previousRowLevelNameCollection[z - 1] !==
                                    levelNameCollection[z - 1]) {
                                    ignoreCount = 0;
                                    previousHeader++;
                                }
                                else {
                                    previousHeader = 0;
                                }
                            }
                            else {
                                ignoreCount--;
                            }
                            break;
                        }
                    }
                }
            }
            if (!isNullOrUndefined(pivotValues[rowIndex - rowReduction])) {
                var colIndex = this.parent.gridSettings.layout === 'Tabular' ? this.parent.engineModule.rowMaxLevel : 0;
                var header = pivotValues[rowIndex - rowReduction][colIndex];
                var valueSort = header && header.valueSort && !isNullOrUndefined(header.valueSort.levelName) ?
                    header.valueSort.levelName.toString().split(delimiter) : undefined;
                isValidHeader = false;
                if (valueSort && valueSort[0] !== 'Grand Total') {
                    if ((chartSettings.enableMultipleAxis && this.accumulationType.indexOf(chartSettings.chartSeries.type) < 0 && this.chartSettings.chartSeries.type !== 'Pareto') ||
                        valueSort.indexOf(measureNames[this.currentMeasure]) > -1) {
                        isValidHeader = true;
                    }
                    if (!isValidHeader) {
                        for (var _e = 0, valueSort_1 = valueSort; _e < valueSort_1.length; _e++) {
                            var levelName = valueSort_1[_e];
                            if (measureNames[levelName]) {
                                isValidHeader = true;
                                break;
                            }
                        }
                        isValidHeader = isValidHeader ? false : true;
                    }
                }
                if (header && header.axis === 'row' && (this.dataSourceSettings.rows.length === 0 ? true :
                    (header.type !== 'grand sum' && isValidHeader))) {
                    if (this.parent.gridSettings.layout !== 'Tabular') {
                        if (firstRowCell.isSum) {
                            continue;
                        }
                    }
                    var tupInfo = this.parent.dataType === 'olap' ?
                        this.engineModule.tupRowInfo[firstRowCell.ordinal] : undefined;
                    var fieldPos = -1;
                    var currrentLevel = firstRowCell.level;
                    if (this.parent.dataType === 'olap') {
                        isDrill = firstRowCell.hierarchy === '[Measures]' ? isDrill : this.isAttributeDrill(firstRowCell.hierarchy, tupInfo.drillInfo);
                        drillDimension = drillDimension === lastDimension ? lastDimension : (firstRowCell.hierarchy === '[Measures]' || firstRowCell.isNamedSet || (this.engineModule.fieldList[firstRowCell.hierarchy] && !this.engineModule.fieldList[firstRowCell.hierarchy].hasAllMember)) ? lastDimension : drillDimension;
                        fieldPos = tupInfo.drillInfo.length - 1;
                        if (firstRowCell.memberType !== 3 && (tupInfo.measureName ?
                            tupInfo.measureName === this.dataSourceSettings.values[0].name : true)) {
                            firstLevelUName = firstLevelUName === undefined ? firstRowCell.levelUniqueName : firstLevelUName;
                            integratedLevel = firstLevelUName === firstRowCell.levelUniqueName ? 0 : integratedLevel;
                            levelCollection = integratedLevel === 0 ? {} : levelCollection;
                            integratedLevel = (prevCell && firstLevelUName !== firstRowCell.levelUniqueName) ?
                                (prevCell.hierarchy === firstRowCell.hierarchy ?
                                    (integratedLevel + (firstRowCell.level - prevCell.level)) :
                                    (isNullOrUndefined(levelCollection[firstRowCell.levelUniqueName]) ?
                                        (levelPos[firstRowCell.hierarchy].start) :
                                        levelCollection[firstRowCell.levelUniqueName])) : integratedLevel;
                            levelCollection[firstRowCell.levelUniqueName] = integratedLevel;
                            currrentLevel = integratedLevel;
                            indexCount += (prevCell && drillDimension === prevCell.hierarchy && !(prevCell.isDrilled && prevCell.hasChild))
                                ? 1 : 0;
                            drillDimension = isDrill ? firstRowCell.hierarchy : lastDimension;
                            prevLevel = integratedLevel;
                            prevCell = firstRowCell;
                        }
                    }
                    else if (firstRowCell.type !== 'value') {
                        if (this.parent.gridSettings.layout === 'Tabular') {
                            var firstRowLevelName = firstRowCell.valueSort.levelName;
                            var levelNameCollection = firstRowLevelName.split(delimiter);
                            var formattedTextCollection = firstRowCell.formattedText.split(' ');
                            drillMem = this.isMemberDrilled(firstRowCell, levelNameCollection);
                            var valueSortIndex = (valueSort.length - 2) !== (this.parent.engineModule.rowMaxLevel - 1) ?
                                (valueSort.length - 2) : this.parent.engineModule.rowMaxLevel - 1;
                            for (var k = 0; k <= this.parent.engineModule.rowMaxLevel; k++) {
                                if (this.headerColl[indexCount] && this.headerColl[indexCount][k] ||
                                    previousRow) {
                                    if (firstRowCell.isSum || previousRow) {
                                        if (firstRowCell.level > 0) {
                                            indexCount = indexCount - (firstRowCell.level === this.parent.engineModule.rowMaxLevel - 1 ?
                                                reductionLevel - 1 : reductionLevelCount - 1);
                                            firstRowCell.formattedText = (!this.parent.dataSourceSettings.showSubTotals ||
                                                (!this.parent.dataSourceSettings.showRowSubTotals &&
                                                    this.parent.dataSourceSettings.showColumnSubTotals)) ? firstRowCell.formattedText :
                                                formattedTextCollection.length > 2 ?
                                                    formattedTextCollection.slice(0, formattedTextCollection.length - 1).join(' ') :
                                                    formattedTextCollection[0];
                                            firstRowCell.hasChild = true;
                                            break;
                                        }
                                        else {
                                            indexCount = indexCount - (finalReductionLevel - 1);
                                            firstRowCell.formattedText = (!this.parent.dataSourceSettings.showSubTotals ||
                                                (!this.parent.dataSourceSettings.showRowSubTotals &&
                                                    this.parent.dataSourceSettings.showColumnSubTotals)) ? firstRowCell.formattedText :
                                                formattedTextCollection.length > 2 ?
                                                    formattedTextCollection.slice(0, formattedTextCollection.length - 1).join(' ') :
                                                    formattedTextCollection[0];
                                            firstRowCell.hasChild = true;
                                            break;
                                        }
                                    }
                                    else {
                                        if (this.headerColl[indexCount][k] && valueSort[valueSortIndex] !==
                                            this.headerColl[indexCount][k].name) {
                                            indexCount++;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (!firstRowCell.isSum && !previousRow) {
                                reductionLevel++;
                                reductionLevelCount++;
                                finalReductionLevel++;
                            }
                            if (!this.parent.dataSourceSettings.expandAll) {
                                firstRowCell.isDrilled = drillMem ? true : false;
                            }
                            else {
                                firstRowCell.isDrilled = drillMem ? false : true;
                            }
                        }
                        else {
                            if (!(prevLevel === undefined || prevLevel < currrentLevel)) {
                                indexCount++;
                            }
                        }
                        prevLevel = currrentLevel;
                    }
                    this.maxLevel = currrentLevel > this.maxLevel ? currrentLevel : this.maxLevel;
                    var name_1 = this.parent.dataType === 'olap' ? firstRowCell.formattedText :
                        (firstRowCell.actualText ? firstRowCell.actualText.toString() : firstRowCell.formattedText.toString());
                    var values = this.engineModule.fieldList[this.currentMeasure];
                    var text = this.parent.dataSourceSettings.rows.length === 0 ? this.parent.localeObj.getConstant('total') + ' ' + this.parent.localeObj.getConstant(values.aggregateType) + ' ' +
                        this.parent.localeObj.getConstant('of') + ' ' + (!isNullOrUndefined(values.caption) ? values.caption : values.name) : firstRowCell.formattedText ? firstRowCell.formattedText.toString() : name_1;
                    var caption = (firstRowCell.hasChild && !firstRowCell.isNamedSet) ?
                        ((firstRowCell.isDrilled ? ' - ' : ' + ') + text) : text;
                    var levelName = tupInfo ? tupInfo.uNameCollection : firstRowCell.valueSort.levelName.toString();
                    var cellInfo = {
                        name: name_1,
                        text: caption,
                        hasChild: firstRowCell.hasChild,
                        isDrilled: firstRowCell.isDrilled,
                        levelName: levelName,
                        level: currrentLevel,
                        fieldName: firstRowCell.valueSort.axis ? firstRowCell.valueSort.axis.toString() : '',
                        rowIndex: rowIndex - rowReduction,
                        colIndex: 0,
                        cell: firstRowCell
                    };
                    if (this.parent.dataType === 'olap' ? firstRowCell.memberType !== 3 : firstRowCell.type !== 'value') {
                        if (this.headerColl[indexCount]) {
                            this.headerColl[indexCount][currrentLevel] = cellInfo;
                        }
                        else {
                            this.headerColl[indexCount] = {};
                            this.headerColl[indexCount][currrentLevel] = cellInfo;
                        }
                        if (this.parent.gridSettings.layout === 'Tabular') {
                            if (firstRowCell.isSum || previousRow) {
                                if (firstRowCell.level > 0) {
                                    indexCount = indexCount + (firstRowCell.level === this.parent.engineModule.rowMaxLevel - 1 ?
                                        reductionLevel - 1 : reductionLevelCount - 1);
                                }
                                else {
                                    indexCount = indexCount + (finalReductionLevel - 1);
                                }
                            }
                            if (firstRowCell.level === 0) {
                                reductionLevelCount = 0;
                                reductionLevel = 0;
                                finalReductionLevel = 0;
                            }
                            else if (firstRowCell.level === this.parent.engineModule.rowMaxLevel - 1) {
                                reductionLevel = 0;
                            }
                            else if (firstRowCell.level < this.parent.engineModule.rowMaxLevel - 1 && firstRowCell.level !== 0) {
                                reductionLevelCount = 0;
                            }
                        }
                    }
                    var rows = this.parent.gridSettings.layout === 'Tabular' ? pivotValues[rowIndex - rowReduction]
                        : pivotValues[rowIndex];
                    var cKeys = Object.keys(rows);
                    var prevMemberCell = void 0;
                    if (this.parent.dataType === 'olap') {
                        memberCell = firstRowCell.memberType !== 3 ? firstRowCell : memberCell;
                    }
                    else {
                        memberCell = firstRowCell.type !== 'value' ? firstRowCell : memberCell;
                        if (firstRowCell.type !== 'value') {
                            memberCell = firstRowCell;
                        }
                        else {
                            var valueSort_2 = firstRowCell && firstRowCell.valueSort && firstRowCell.valueSort.levelName &&
                                firstRowCell.valueSort.levelName.toString().split(delimiter);
                            var levelName_1 = void 0;
                            if (valueSort_2 && valueSort_2.length > 0) {
                                valueSort_2.splice(valueSort_2.length - 1, 1);
                                levelName_1 = valueSort_2.join(delimiter);
                            }
                            if ((this.parent.dataSourceSettings.valueIndex <= 0 || this.engineModule.valueAxis &&
                                this.dataSourceSettings.rows.length === this.engineModule.measureIndex) ||
                                isNullOrUndefined(memberCell.valueSort) || (levelName_1 === memberCell.valueSort.levelName)) {
                                memberCell = memberCell;
                            }
                            else {
                                var prevIndex = rowIndex;
                                while (prevIndex > -1) {
                                    if (pivotValues[prevIndex] && pivotValues[prevIndex][0] &&
                                        pivotValues[prevIndex][0].valueSort &&
                                        pivotValues[prevIndex][0].valueSort.levelName === levelName_1) {
                                        memberCell = pivotValues[prevIndex][0];
                                        prevIndex = 0;
                                    }
                                    prevIndex--;
                                }
                            }
                        }
                    }
                    for (var f = this.parent.gridSettings.layout === 'Tabular' ? this.parent.engineModule.rowMaxLevel : 0; f < cKeys.length; f++) {
                        var cKey = cKeys[f];
                        var cellIndex = Number(cKey);
                        var cell = pivotValues[rowIndex - rowReduction][cellIndex];
                        var measureAllow = isNullOrUndefined(cell.rowHeaders) ? this.dataSourceSettings.rows.length === 0 : true;
                        var actualText = (this.parent.dataType === 'olap' && tupInfo && tupInfo.measureName) ?
                            tupInfo.measureName : cell.actualText;
                        if (!(this.parent.dataType === 'olap' && cell.isGrandSum) && !totColIndex[cell.colIndex] && cell.axis === 'value' && firstRowCell.type !== 'header' &&
                            actualText !== '' && ((chartSettings.enableMultipleAxis && this.accumulationType.indexOf(chartSettings.chartSeries.type) < 0 && this.chartSettings.chartSeries.type !== 'Pareto') ? true : actualText === this.currentMeasure)) {
                            if (isNullOrUndefined(firstRowCell.members)) {
                                firstRowCell.members = [];
                            }
                            if (this.parent.dataType === 'olap' ? ((lastHierarchy === firstRowCell.hierarchy || isDrill) ?
                                ((firstRowCell.memberType === 3 && prevMemberCell) ?
                                    (fieldPos === this.measurePos ? (prevMemberCell.isDrilled && prevMemberCell.hasChild) : true) :
                                    (firstRowCell.isDrilled && firstRowCell.hasChild)) : true)
                                : (((firstRowCell.type === 'value' && prevMemberCell) ?
                                    (!isNullOrUndefined(prevMemberCell.members) && prevMemberCell.hasChild &&
                                        prevMemberCell.isDrilled) : firstRowCell.hasChild && firstRowCell.isDrilled) ||
                                    !measureAllow)) {
                                break;
                            }
                            if (this.parent.dataType === 'olap' && cell.isSum === true && this.parent.dataSourceSettings.valueAxis === 'row') {
                                continue;
                            }
                            var colHeaders = '';
                            if (this.parent.dataType === 'olap') {
                                colHeaders = cell.columnHeaders.toString().split(/~~|::/).join(' - ');
                            }
                            else {
                                var values_1 = cell.columnHeaders.toString().split(delimiter);
                                colHeaders = PivotUtil.formatChartHeaders(values_1, this, true, cell);
                            }
                            var rowHeaders = '';
                            if (this.parent.dataType === 'olap') {
                                rowHeaders = cell.rowHeaders.toString().split(/~~|::/).join(' - ');
                            }
                            else {
                                var values_2 = cell.rowHeaders.toString().split(delimiter);
                                rowHeaders = PivotUtil.formatChartHeaders(values_2, this, false, cell);
                            }
                            var columnSeries = colHeaders + ' | ' + actualText;
                            this.chartSeriesInfo[colHeaders] = { uniqueName: colHeaders, caption: cell.hierarchyName && cell.hierarchyName.toString().split(delimiter).join(' - '), colorIndex: [] };
                            this.chartSeriesInfo[this.chartSeriesInfo[colHeaders].caption] =
                                this.chartSeriesInfo[colHeaders];
                            var yValue = (this.parent.dataType === 'pivot' ? (this.engineModule.aggregatedValueMatrix[rowIndex] &&
                                !isNullOrUndefined(this.engineModule.aggregatedValueMatrix[rowIndex][cellIndex])) ?
                                Number(this.engineModule.aggregatedValueMatrix[rowIndex][cellIndex]) :
                                (!isNullOrUndefined(cell.value) ? Number(cell.value) : cell.value) : (!isNullOrUndefined(cell.value)
                                ? Number(cell.value) : cell.value));
                            yValue = yValue === Infinity ? null : yValue;
                            if (yValue === 0) {
                                this.accEmptyPoint = true;
                            }
                            if (this.columnGroupObject[columnSeries]) {
                                this.columnGroupObject[columnSeries].push({
                                    x: this.dataSourceSettings.rows.length === 0 ? firstRowCell.formattedText : rowHeaders,
                                    y: yValue,
                                    rIndex: rowIndex,
                                    cIndex: cellIndex
                                });
                            }
                            else {
                                this.columnGroupObject[columnSeries] = [{
                                        x: this.dataSourceSettings.rows.length === 0 ? firstRowCell.formattedText : rowHeaders,
                                        y: yValue,
                                        rIndex: rowIndex,
                                        cIndex: cellIndex
                                    }];
                            }
                        }
                        prevMemberCell = memberCell;
                    }
                }
            }
        }
        this.refreshChart();
    };
    /**
     * Refreshing chart based on the updated chartSettings.
     *
     * @returns {void}
     * @hidden
     */
    PivotChart.prototype.refreshChart = function () {
        this.chartSeries = [];
        var prevColorIndex = 0;
        var chartSeriesInfo = {};
        var columnKeys = Object.keys(this.columnGroupObject);
        this.persistSettings = JSON.parse(this.parent.getChartSettings()).chartSettings;
        var seriesColors = this.persistSettings.palettes && this.persistSettings.palettes.length > 0
            ? this.persistSettings.palettes : getSeriesColor(this.chartSettings.theme);
        var delimiter = this.parent.chartSettings.columnDelimiter ? this.parent.chartSettings.columnDelimiter : '-';
        var columnHeader = (this.parent.chartSettings.columnHeader && this.parent.chartSettings.columnHeader !== '') ?
            this.parent.chartSettings.columnHeader.split(delimiter).join(' - ') : '';
        var chartType = this.chartSettings.chartSeries ? this.chartSettings.chartSeries.type : undefined;
        var fieldWithCaption = {};
        for (var i = 0; i < this.parent.dataSourceSettings.values.length; i++) {
            fieldWithCaption[this.parent.dataSourceSettings.values[i].name] =
                !isNullOrUndefined(this.parent.dataSourceSettings.values[i].caption) ?
                    this.parent.dataSourceSettings.values[i].caption : undefined;
        }
        if (this.accumulationType.indexOf(chartType) > -1 && columnKeys.length > 0) {
            this.currentColumn = (columnKeys.indexOf(columnHeader + ' | ' + this.currentMeasure) > -1 && columnHeader !== undefined) ? columnHeader + ' | ' + this.currentMeasure : columnKeys[0];
            var currentSeries = {};
            currentSeries = this.persistSettings.chartSeries ? this.frameChartSeries(this.persistSettings.chartSeries) : currentSeries;
            if ((isNullOrUndefined(currentSeries.palettes) || currentSeries.palettes.length === 0) &&
                !isNullOrUndefined(this.persistSettings.palettes) && this.persistSettings.palettes.length > 0) {
                currentSeries.palettes = this.persistSettings.palettes;
            }
            currentSeries.dataSource = this.columnGroupObject[this.currentColumn];
            currentSeries.xName = 'x';
            currentSeries.yName = 'y';
            if (this.persistSettings.chartSeries && this.persistSettings.chartSeries.dataLabel) {
                currentSeries.dataLabel = this.persistSettings.chartSeries.dataLabel;
                currentSeries.dataLabel.name = 'x';
            }
            else {
                currentSeries.dataLabel = { visible: true, position: 'Outside', name: 'x' };
                this.parent.setProperties({ chartSettings: { chartSeries: { dataLabel: { visible: true, position: 'Outside' } } } }, true);
            }
            if (this.accEmptyPoint && currentSeries.emptyPointSettings) {
                currentSeries.emptyPointSettings.mode = 'Zero';
            }
            else if (this.accEmptyPoint) {
                currentSeries.emptyPointSettings = { mode: 'Zero' };
            }
            currentSeries.name = this.currentColumn;
            if (chartType === 'Doughnut') {
                currentSeries.type = 'Pie';
                currentSeries.innerRadius = this.chartSettings.chartSeries.innerRadius ? this.chartSettings.chartSeries.innerRadius : '40%';
            }
            else if (chartType === 'Pie') {
                currentSeries.innerRadius = this.chartSettings.chartSeries.innerRadius ? this.chartSettings.chartSeries.innerRadius : '0';
            }
            this.chartSeries = this.chartSeries.concat(currentSeries);
        }
        else {
            for (var _i = 0, columnKeys_1 = columnKeys; _i < columnKeys_1.length; _i++) {
                var key = columnKeys_1[_i];
                var currentSeries = {};
                currentSeries = this.persistSettings.chartSeries ? this.frameChartSeries(this.persistSettings.chartSeries) : currentSeries;
                if (!isNullOrUndefined(currentSeries.palettes) &&
                    currentSeries.palettes.length > 0 && (isNullOrUndefined(this.persistSettings.palettes) ||
                    this.persistSettings.palettes.length === 0)) {
                    this.chartSettings.palettes = currentSeries.palettes;
                }
                for (var i = 0; i < this.columnGroupObject[key].length; i++) {
                    var values = this.engineModule.fieldList[this.currentMeasure];
                    this.columnGroupObject[key][i].x = (this.parent.dataSourceSettings.rows.length === 0 && !this.chartSettings.showMultiLevelLabels) ? this.parent.localeObj.getConstant('total') + ' ' + this.parent.localeObj.getConstant(values.aggregateType) + ' ' +
                        this.parent.localeObj.getConstant('of') + ' ' + (!isNullOrUndefined(values.caption) ? values.caption : values.name) : this.columnGroupObject[key][i].x === '' ? this.parent.localeObj.getConstant('blank') : this.columnGroupObject[key][i].x;
                }
                currentSeries.dataSource = this.columnGroupObject[key];
                currentSeries.xName = 'x';
                currentSeries.yName = 'y';
                currentSeries.visible = true;
                var multiAxisKey = void 0;
                var fieldName = void 0;
                var currentSeriesName = void 0;
                for (var i = 0, j = key.split(' | '); i < j.length; i++) {
                    if (this.measuresNames && this.measuresNames[j[i]]) {
                        fieldName = j[i];
                        currentSeriesName = key.split((' | ' + fieldName))[0];
                    }
                }
                if (this.chartSettings.enableMultipleAxis) {
                    var fieldCaptionName = fieldName;
                    fieldCaptionName = !isNullOrUndefined(fieldWithCaption[fieldCaptionName]) ?
                        fieldWithCaption[fieldCaptionName] : fieldCaptionName;
                    multiAxisKey = currentSeriesName + ' | ' + fieldCaptionName;
                }
                currentSeries.name = this.chartSettings.enableMultipleAxis ? multiAxisKey : currentSeriesName;
                if (this.chartSettings.showPointColorByMembers && this.chartSettings.enableMultipleAxis) {
                    currentSeries.name = currentSeriesName;
                    var seriesName = this.chartSeriesInfo[currentSeries.name].caption;
                    currentSeries.name = seriesName !== undefined && seriesName !== null ? seriesName : currentSeries.name;
                    if (!chartSeriesInfo[currentSeries.name]) {
                        prevColorIndex = seriesColors[prevColorIndex] ? prevColorIndex : 0;
                        chartSeriesInfo[currentSeries.name] = { name: currentSeries.name, color: seriesColors[prevColorIndex] };
                        currentSeries.fill = seriesColors[prevColorIndex++];
                        this.chartSeriesInfo[currentSeries.name].colorIndex.push(this.selectedLegend++);
                    }
                    else {
                        currentSeries.fill = chartSeriesInfo[currentSeries.name].color;
                        this.chartSeriesInfo[currentSeries.name].colorIndex.push(this.selectedLegend++);
                        currentSeries.name = undefined;
                    }
                }
                if (['Radar', 'Polar'].indexOf(chartType) < 0) {
                    var measure = fieldName;
                    currentSeries.tooltipMappingName = this.measuresNames[measure];
                    currentSeries.yAxisName = (this.chartSettings.enableMultipleAxis && this.chartSettings.multipleAxisMode === 'Combined') ?
                        this.measureList.join('_') : this.measuresNames[measure] ? this.measuresNames[measure] : measure;
                }
                if (this.persistSettings.chartSeries && this.persistSettings.chartSeries.emptyPointSettings) {
                    currentSeries.emptyPointSettings = this.persistSettings.chartSeries.emptyPointSettings;
                }
                if (!currentSeries.emptyPointSettings) {
                    currentSeries.emptyPointSettings = { mode: 'Zero' };
                }
                this.chartSeries = this.chartSeries.concat(currentSeries);
            }
        }
        var seriesEvent = { series: this.chartSeries, cancel: false };
        var pivotChart = this;
        this.parent.trigger(events.chartSeriesCreated, seriesEvent, function (observedArgs) {
            if (!observedArgs.cancel) {
                pivotChart.bindChart();
            }
            else {
                if (pivotChart.element) {
                    remove(pivotChart.element);
                }
                pivotChart.parent.notify(events.contentReady, {});
            }
        });
    };
    PivotChart.prototype.frameObjectWithKeys = function (series) {
        var keys = Object.keys(series);
        var keyPos = 0;
        var framedSeries = {};
        while (keyPos < keys.length) {
            framedSeries[keys[keyPos]] = series[keys[keyPos]];
            keyPos++;
        }
        return framedSeries;
    };
    PivotChart.prototype.frameChartSeries = function (series) {
        var keys = Object.keys(series);
        var keyPos = 0;
        var framedSeries = {};
        while (keyPos < keys.length) {
            if ((this.accumulationType.indexOf(this.parent.chartSettings.chartSeries.type) > -1 && ['fill', 'dashArray', 'width', 'segmentAxis',
                'drawType', 'isClosed', 'segments', 'stackingGroup', 'marker', 'errorBar', 'trendlines', 'minRadius',
                'splineType', 'maxRadius', 'cardinalSplineTension', 'columnWidth', 'columnSpacing', 'cornerRadius'].indexOf(keys[keyPos]) > -1) ||
                (this.accumulationType.indexOf(this.parent.chartSettings.chartSeries.type) < 0 && ['endAngle', 'explode', 'explodeAll', 'explodeIndex',
                    'explodeOffset', 'gapRatio', 'groupMode', 'groupTo', 'neckHeight', 'neckWidth', 'pyramidMode', 'startAngle',
                    'dataLabel', 'innerRadius'].indexOf(keys[keyPos]) > -1)) {
                keyPos++;
                continue;
            }
            framedSeries[keys[keyPos]] = series[keys[keyPos]];
            keyPos++;
        }
        return framedSeries;
    };
    PivotChart.prototype.bindChart = function () {
        this.parent.showWaitingPopup();
        var currentXAxis = this.configXAxis();
        var currentTooltipSettings = this.configTooltipSettings();
        var currentLegendSettings = this.configLegendSettings();
        var currentZoomSettings = this.configZoomSettings();
        var axesWithRows = this.frameAxesWithRows();
        var type = this.chartSettings.chartSeries.type;
        if (this.parent.displayOption.view === 'Both') {
            this.element = this.parent.displayOption.primary === 'Chart' ?
                (this.parent.element.insertBefore((!this.element ?
                    (createElement('div', {
                        className: cls.PIVOTCHART, id: this.parent.element.id + '_chart'
                    }))
                    : this.element), this.parent.element.querySelector('.' + cls.GRID_CLASS))) :
                (this.parent.element.appendChild(!this.element ? (createElement('div', {
                    className: cls.PIVOTCHART, id: this.parent.element.id + '_chart'
                })) : this.element));
        }
        else if (!this.element) {
            this.element = this.parent.element.appendChild(createElement('div', {
                className: cls.PIVOTCHART, id: this.parent.element.id + '_chart'
            }));
        }
        if (!this.chartElement && this.parent.chartSettings.enableScrollOnMultiAxis && this.parent.chartSettings.enableMultipleAxis && this.chartSettings.chartSeries.type !== 'Pareto') {
            this.parent.element.querySelector('.' + cls.PIVOTCHART).innerHTML = '';
            this.chartElement = this.parent.element.querySelector('.' + cls.PIVOTCHART).appendChild(createElement('div', {
                className: cls.PIVOTCHART_INNER, id: this.parent.element.id + '_chartInner'
            }));
        }
        if (this.parent.element.querySelector('.' + cls.PIVOTCHART_INNER)) {
            this.parent.element.querySelector('.' + cls.PIVOTCHART_INNER).innerHTML = '';
        }
        if (this.parent.showGroupingBar) {
            this.element.style.minWidth = this.parent.minWidth ? this.parent.minWidth + 'px' : '400px !important';
        }
        else {
            this.element.style.minWidth = this.parent.minWidth ? this.parent.minWidth + 'px' : '310px !important';
        }
        var width = this.parent.width.toString();
        if (this.parent.showToolbar && this.parent.grid) {
            width = this.parent.getGridWidthAsNumber().toString();
        }
        var height = this.getChartHeight();
        if (this.parent.chartSettings.enableScrollOnMultiAxis && this.parent.chartSettings.enableMultipleAxis &&
            this.accumulationType.indexOf(type) < 0 && this.chartSettings.chartSeries.type !== 'Pareto') {
            this.parent.element.querySelector('.' + cls.PIVOTCHART).style.height =
                (height === 'auto' ? this.getChartAutoHeight() : height) + 'px';
            this.parent.element.querySelector('.' + cls.PIVOTCHART).style.width = width + 'px';
            if (this.parent.chartSettings.chartSeries.type !== 'Polar' && this.parent.chartSettings.chartSeries.type !== 'Radar') {
                this.parent.element.querySelector('.' + cls.PIVOTCHART).style.overflow = 'auto';
                this.parent.element.querySelector('.' + cls.PIVOTCHART).style.overflowX = 'hidden';
            }
        }
        if (this.parent.chart && ((this.parent.chart.getModuleName() === 'accumulationchart' &&
            this.accumulationType.indexOf(type) < 0) || (this.parent.chart.getModuleName() === 'chart' &&
            this.accumulationType.indexOf(type) > -1 && this.chartSettings.chartSeries.type !== 'Pareto'))) {
            this.parent.chart.destroy();
            if (select('#' + this.parent.element.id + '_chart', this.parent.element)) {
                select('#' + this.parent.element.id + '_chart', this.parent.element).innerHTML = '';
                select('#' + this.parent.element.id + '_chart', this.parent.element).appendChild(createElement('div', {
                    className: cls.PIVOTCHART_INNER, id: this.parent.element.id + '_chartInner'
                }));
            }
        }
        if (!(this.parent.chart && this.parent.chart.element && this.parent.element.querySelector('.e-chart') || this.parent.element.querySelector('.e-accumulationchart')) ||
            (this.parent.toolbarModule && this.parent.toolbarModule.isMultiAxisChange)) {
            if (this.parent.toolbarModule && this.parent.toolbarModule.isMultiAxisChange && this.parent.chart) {
                if (!this.parent.chart.isDestroyed) {
                    this.parent.chart.destroy();
                }
                this.parent.chart = undefined;
                select('#' + this.parent.element.id + '_chart', this.parent.element).innerHTML = '';
                select('#' + this.parent.element.id + '_chart', this.parent.element).appendChild(createElement('div', {
                    className: cls.PIVOTCHART_INNER, id: this.parent.element.id + '_chartInner'
                }));
                this.parent.toolbarModule.isMultiAxisChange = false;
            }
            Chart.Inject(ColumnSeries, StackingColumnSeries, RangeColumnSeries, BarSeries, StackingBarSeries, ScatterSeries, BubbleSeries, LineSeries, StepLineSeries, SplineSeries, SplineAreaSeries, MultiColoredLineSeries, PolarSeries, RadarSeries, AreaSeries, RangeAreaSeries, StackingAreaSeries, StepAreaSeries, StackingLineSeries, MultiColoredAreaSeries, ParetoSeries, Legend, Tooltip, Category, MultiLevelLabel, ScrollBar, Zoom, Export, Crosshair, Selection, StripLine, DataLabel);
            AccumulationChart.Inject(PieSeries, FunnelSeries, PyramidSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip, Export);
            if (this.accumulationType.indexOf(type) > -1) {
                this.parent.chart = new AccumulationChart({
                    series: this.chartSeries.length > 0 ? this.chartSeries : [{}],
                    legendSettings: currentLegendSettings,
                    tooltip: currentTooltipSettings,
                    width: width,
                    height: height.toString(),
                    title: this.chartSettings.title,
                    enableSmartLabels: this.chartSettings.enableSmartLabels,
                    center: this.chartSettings.pieCenter,
                    enableBorderOnMouseMove: this.chartSettings.enableBorderOnMouseMove,
                    highlightMode: this.chartSettings.highlightMode,
                    highlightPattern: this.chartSettings.highlightPattern,
                    titleStyle: this.chartSettings.titleStyle,
                    subTitle: this.chartSettings.subTitle,
                    subTitleStyle: this.chartSettings.subTitleStyle,
                    margin: this.chartSettings.margin,
                    border: this.chartSettings.border,
                    background: this.chartSettings.background,
                    theme: this.chartSettings.theme,
                    selectionMode: this.chartSettings.accumulationSelectionMode,
                    isMultiSelect: this.chartSettings.isMultiSelect,
                    enableExport: this.parent.allowPdfExport,
                    selectedDataIndexes: this.chartSettings.selectedDataIndexes,
                    enableAnimation: this.chartSettings.enableAnimation,
                    useGroupingSeparator: this.chartSettings.useGroupingSeparator,
                    locale: this.parent.locale,
                    enableRtl: this.parent.enableRtl,
                    beforePrint: this.beforePrint.bind(this),
                    animationComplete: this.animationComplete.bind(this),
                    legendRender: this.legendRender.bind(this),
                    textRender: this.textRender.bind(this),
                    pointRender: this.pointRender.bind(this),
                    seriesRender: this.seriesRender.bind(this),
                    chartMouseMove: this.chartMouseMove.bind(this),
                    chartMouseClick: this.chartMouseClick.bind(this),
                    pointMove: this.pointMove.bind(this),
                    pointClick: this.pointClick.bind(this),
                    chartMouseLeave: this.chartMouseLeave.bind(this),
                    chartMouseDown: this.chartMouseDown.bind(this),
                    chartMouseUp: this.chartMouseUp.bind(this),
                    tooltipRender: this.tooltipRender.bind(this),
                    loaded: this.loaded.bind(this),
                    load: this.load.bind(this),
                    resized: this.resized.bind(this)
                });
            }
            else {
                this.parent.chart = new Chart({
                    series: this.chartSeries.length > 0 ? this.chartSeries : [{}],
                    legendSettings: currentLegendSettings,
                    tooltip: currentTooltipSettings,
                    zoomSettings: currentZoomSettings,
                    axes: (type === 'Polar' || type === 'Radar') ? [] : axesWithRows.axes,
                    rows: (type === 'Polar' || type === 'Radar') ? [{}] :
                        (type === 'Bar' || type === 'StackingBar' || type === 'StackingBar100' || type === 'Pareto' &&
                            this.chartSettings.enableMultipleAxis) ? [{ height: '100%' }] : axesWithRows.rows,
                    columns: (type === 'Polar' || type === 'Radar') ? [{}] :
                        (type === 'Bar' || type === 'StackingBar' || type === 'StackingBar100' &&
                            this.chartSettings.enableMultipleAxis) ? axesWithRows.columns : [{ width: '100%' }],
                    primaryYAxis: (type === 'Polar' || type === 'Radar') ? axesWithRows.axes[0] : { visible: false },
                    primaryXAxis: currentXAxis,
                    width: width,
                    height: (this.parent.chartSettings.chartSeries.type !== 'Polar' &&
                        this.parent.chartSettings.chartSeries.type !== 'Radar' && this.parent.chartSettings.enableScrollOnMultiAxis &&
                        this.parent.chartSettings.enableMultipleAxis && this.parent.chartSettings.chartSeries.type !== 'Pareto' && this.parent.dataSourceSettings.values.length > 0) ?
                        Number(height) > (this.parent.dataSourceSettings.values.length * 235) + 100 ? isNaN(Number(height)) ?
                            height.toString() : (Number(height) - 5).toString() :
                            (!isNaN(Number(height)) || this.parent.dataSourceSettings.values.length > 1) ?
                                ((this.parent.dataSourceSettings.values.length * 235) + 100).toString() :
                                height.toString() : height.toString(),
                    title: this.chartSettings.title,
                    titleStyle: this.chartSettings.titleStyle,
                    subTitle: this.chartSettings.subTitle,
                    subTitleStyle: this.chartSettings.subTitleStyle,
                    margin: this.chartSettings.margin,
                    border: this.chartSettings.border,
                    background: this.chartSettings.background,
                    chartArea: !isNullOrUndefined(this.persistSettings.chartArea) ? this.persistSettings.chartArea :
                        this.chartSettings.chartArea,
                    palettes: this.chartSettings.palettes,
                    theme: this.chartSettings.theme,
                    crosshair: this.chartSettings.crosshair,
                    selectionMode: this.chartSettings.selectionMode,
                    isMultiSelect: this.chartSettings.isMultiSelect,
                    enableExport: this.parent.allowPdfExport,
                    selectedDataIndexes: this.chartSettings.selectedDataIndexes,
                    isTransposed: this.chartSettings.isTransposed,
                    enableAnimation: this.chartSettings.enableAnimation,
                    enableCanvas: this.chartSettings.enableCanvas,
                    useGroupingSeparator: this.chartSettings.useGroupingSeparator,
                    description: this.chartSettings.description,
                    tabIndex: this.chartSettings.tabIndex,
                    locale: this.parent.locale,
                    enableRtl: this.parent.enableRtl,
                    enableSideBySidePlacement: this.chartSettings.enableSideBySidePlacement,
                    beforePrint: this.beforePrint.bind(this),
                    animationComplete: this.animationComplete.bind(this),
                    legendRender: this.legendRender.bind(this),
                    textRender: this.textRender.bind(this),
                    pointRender: this.pointRender.bind(this),
                    seriesRender: this.seriesRender.bind(this),
                    chartMouseMove: this.chartMouseMove.bind(this),
                    chartMouseClick: this.chartMouseClick.bind(this),
                    pointMove: this.pointMove.bind(this),
                    pointClick: this.pointClick.bind(this),
                    chartMouseLeave: this.chartMouseLeave.bind(this),
                    chartMouseDown: this.chartMouseDown.bind(this),
                    chartMouseUp: this.chartMouseUp.bind(this),
                    dragComplete: this.dragComplete.bind(this),
                    zoomComplete: this.zoomComplete.bind(this),
                    scrollStart: this.scrollStart.bind(this),
                    scrollEnd: this.scrollEnd.bind(this),
                    scrollChanged: this.scrollChanged.bind(this),
                    tooltipRender: this.tooltipRender.bind(this),
                    legendClick: this.legendClick.bind(this),
                    loaded: this.loaded.bind(this),
                    load: this.load.bind(this),
                    resized: this.resized.bind(this),
                    axisLabelRender: this.axisLabelRender.bind(this),
                    multiLevelLabelClick: this.multiLevelLabelClick.bind(this),
                    axisMultiLabelRender: this.multiLevelLabelRender.bind(this)
                });
            }
            this.parent.chart.isStringTemplate = true;
        }
        else {
            this.parent.chart.series = this.chartSeries;
            this.parent.chart.title = this.parent.chartSettings.title;
            this.parent.chart.subTitle = this.parent.chartSettings.subTitle;
            this.parent.chart.background = this.parent.chartSettings.background;
            this.parent.chart.theme = this.parent.chartSettings.theme;
            this.parent.chart.legendSettings = currentLegendSettings;
            this.parent.chart.selectionMode = this.parent.chartSettings.selectionMode;
            this.parent.chart.enableExport = this.parent.allowPdfExport;
            this.parent.chart.isMultiSelect = this.parent.chartSettings.isMultiSelect;
            this.parent.chart.enableAnimation = this.parent.chartSettings.enableAnimation;
            this.parent.chart.useGroupingSeparator = this.parent.chartSettings.useGroupingSeparator;
            this.parent.chart.highlightPattern = this.parent.chartSettings.highlightPattern;
            if (this.accumulationType.indexOf(type) > -1) {
                this.parent.chart.enableBorderOnMouseMove = this.parent.chartSettings.enableBorderOnMouseMove;
                this.parent.chart.highlightMode = this.parent.chartSettings.highlightMode;
                this.parent.chart.enableSmartLabels = this.parent.chartSettings.enableSmartLabels;
            }
            else {
                this.parent.chart.palettes = this.parent.chartSettings.palettes;
                this.parent.chart.isTransposed = this.parent.chartSettings.isTransposed;
                this.parent.chart.enableSideBySidePlacement = this.parent.chartSettings.enableSideBySidePlacement;
                this.parent.chart.tabIndex = this.parent.chartSettings.tabIndex;
                this.parent.chart.description = this.parent.chartSettings.description;
                this.parent.chart.enableCanvas = this.parent.chartSettings.enableCanvas;
            }
            if (type === 'Polar' || type === 'Radar') {
                this.parent.chart.primaryXAxis = currentXAxis;
                this.parent.chart.primaryYAxis.visible = true;
                this.parent.chart.primaryYAxis = axesWithRows.axes[0];
                this.parent.chart.axes = [];
                this.parent.chart.rows = [{}];
            }
            else if ((this.accumulationType.indexOf(type) < 0) && this.parent.chart.getModuleName() === 'chart') {
                this.parent.chart.primaryYAxis.visible = false;
                this.parent.chart.primaryXAxis = currentXAxis;
                this.parent.chart.axes = axesWithRows.axes;
                if (type === 'Bar' || type === 'StackingBar' || type === 'StackingBar100' &&
                    this.chartSettings.enableMultipleAxis) {
                    this.parent.chart.rows = [{ height: '100%' }];
                    this.parent.chart.columns = axesWithRows.columns;
                }
                else if (type === 'Pareto' && this.chartSettings.enableMultipleAxis) {
                    this.parent.chart.rows = [{ height: '100%' }];
                    this.parent.chart.columns = [{ width: '100%' }];
                }
                else {
                    this.parent.chart.rows = axesWithRows.rows;
                    this.parent.chart.columns = [{ width: '100%' }];
                }
            }
            this.parent.chart.refresh();
            if ((this.accumulationType.indexOf(type) > -1) && this.parent.chart.getModuleName() === 'accumulationchart' && (this.parent.dataSourceSettings.rows.length === 0 || this.parent.dataSourceSettings.columns.length === 0)) {
                this.parent.hideWaitingPopup();
                if (this.parent.pivotFieldListModule) {
                    hideSpinner(this.parent.pivotFieldListModule.fieldListSpinnerElement);
                }
            }
        }
        if (this.parent.chartSettings.enableScrollOnMultiAxis && this.parent.chartSettings.enableMultipleAxis) {
            this.parent.chart.appendTo(select('#' + this.parent.element.id + '_chartInner', this.parent.element));
        }
        else {
            this.parent.chart.appendTo(select('#' + this.parent.element.id + '_chart', this.parent.element));
        }
    };
    PivotChart.prototype.legendClick = function (args) {
        if (this.chartSettings.showPointColorByMembers && this.chartSettings.enableMultipleAxis) {
            var colorIndex = this.chartSeriesInfo[args.legendText].colorIndex;
            for (var i = 1; i < colorIndex.length; i++) {
                args.chart.series[colorIndex[i]].visible = !args.chart.series[colorIndex[i]].visible;
            }
        }
        this.parent.trigger(events.chartLegendClick, args);
    };
    PivotChart.prototype.pointClick = function (args) {
        var dataSource = args.series.dataSource ? args.series.dataSource :
            this.parent.chart.series[args.seriesIndex].dataSource;
        if (((['Pie', 'Funnel', 'Doughnut', 'Pyramid', 'Radar', 'Polar'].indexOf(this.parent.chartSettings.chartSeries.type) > -1) ||
            !this.parent.chartSettings.showMultiLevelLabels) && (this.parent.dataType === 'olap' ? true :
            this.parent.dataSourceSettings.rows.length > 1)) {
            this.pivotIndex = {
                rIndex: dataSource ? dataSource[args.pointIndex].rIndex : undefined,
                cIndex: dataSource ? dataSource[args.pointIndex].cIndex : undefined
            };
            this.creatMenu();
            var pos = this.parent.element.getBoundingClientRect();
            var y = (this.parent.element.querySelector('.e-pivot-toolbar') ?
                this.parent.element.querySelector('.e-pivot-toolbar').clientHeight : 0) +
                (this.parent.element.querySelector('.e-chart-grouping-bar') ?
                    this.parent.element.querySelector('.e-chart-grouping-bar').clientHeight : 0) +
                (window.scrollY || document.documentElement.scrollTop) + pos.top;
            this.accumulationMenu.open(y + args.y, args.x + pos.left + (window.scrollX || document.documentElement.scrollLeft));
        }
        else if ((this.parent.allowDrillThrough || this.parent.editSettings.allowEditing) && this.parent.drillThroughModule) {
            var rIndex = dataSource[args.pointIndex].rIndex;
            var cIndex = dataSource[args.pointIndex].cIndex;
            this.parent.drillThroughModule.executeDrillThrough(this.parent.pivotValues[rIndex][cIndex], rIndex, cIndex);
        }
        this.parent.trigger(events.chartPointClick, args);
    };
    PivotChart.prototype.frameAxesWithRows = function () {
        var axes = [];
        var rows = [];
        var columns = [];
        var yAxisTitles = [];
        var percentChart = this.persistSettings.chartSeries && (this.persistSettings.chartSeries.type === 'StackingColumn100' ||
            this.persistSettings.chartSeries.type === 'StackingBar100' ||
            this.persistSettings.chartSeries.type === 'StackingArea100' ||
            this.persistSettings.chartSeries.type === 'StackingLine100');
        var percentAggregateTypes = ['PercentageOfGrandTotal', 'PercentageOfColumnTotal', 'PercentageOfRowTotal',
            'PercentageOfDifferenceFrom', 'PercentageOfParentRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentTotal'];
        if (this.chartSettings.enableMultipleAxis) {
            var valCnt = 0;
            var divider = (100 / this.dataSourceSettings.values.length) + '%';
            for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
                var item = _a[_i];
                var measureField = this.engineModule.fieldList[item.name];
                var measureAggregatedName = (this.parent.dataType === 'olap' ? '' : (this.parent.localeObj.getConstant(measureField.aggregateType) + ' ' +
                    this.parent.localeObj.getConstant('of') + ' ')) + measureField.caption;
                // let formatSetting: IFormatSettings = this.dataSourceSettings.formatSettings.filter((itm: IFormatSettings) => {
                //     return itm.name === item.name;
                // })[0];
                yAxisTitles.push(measureAggregatedName);
                var formatSetting = void 0;
                for (var _b = 0, _c = this.dataSourceSettings.formatSettings; _b < _c.length; _b++) {
                    var field = _c[_b];
                    if (field.name === item.name) {
                        formatSetting = field;
                        break;
                    }
                }
                var format = PivotUtil.inArray(measureField.aggregateType, percentAggregateTypes) !== -1 ? 'P2' : (formatSetting ? formatSetting.format :
                    this.parent.dataType === 'olap' ? this.getFormat(measureField.formatString) : 'N');
                var resFormat = (this.chartSettings.chartSeries.type === 'Polar' || this.chartSettings.chartSeries.type === 'Radar') ? true : false;
                var currentYAxis = {};
                currentYAxis = this.persistSettings.primaryYAxis ? this.frameObjectWithKeys(this.persistSettings.primaryYAxis) : currentYAxis;
                currentYAxis.labelFormat = currentYAxis.labelFormat ?
                    currentYAxis.labelFormat : (percentChart ? '' : (!resFormat ? format : 'N'));
                currentYAxis.title = currentYAxis.title ? currentYAxis.title :
                    (this.chartSettings.multipleAxisMode === 'Combined') ? yAxisTitles.join(' - ') : measureAggregatedName;
                currentYAxis.zoomFactor = isNullOrUndefined(this.chartSettings.primaryYAxis.zoomFactor) ? 1
                    : this.chartSettings.primaryYAxis.zoomFactor;
                currentYAxis.edgeLabelPlacement = this.chartSettings.primaryYAxis.edgeLabelPlacement ?
                    this.chartSettings.primaryYAxis.edgeLabelPlacement : this.persistSettings.primaryYAxis.edgeLabelPlacement;
                if (this.chartSettings.chartSeries.type === 'Bar' || this.chartSettings.chartSeries.type === 'StackingBar' ||
                    this.chartSettings.chartSeries.type === 'StackingBar100') {
                    currentYAxis.plotOffsetRight = currentYAxis.plotOffsetRight ? currentYAxis.plotOffsetRight : 30;
                }
                else {
                    currentYAxis.plotOffsetTop = currentYAxis.plotOffsetTop ? currentYAxis.plotOffsetTop : 30;
                }
                if (!resFormat) {
                    currentYAxis.name = (this.chartSettings.multipleAxisMode === 'Combined') ? this.measureList.join('_') :
                        this.measuresNames[item.name] ? this.measuresNames[item.name] : item.name;
                }
                axes = axes.concat(currentYAxis);
                if (this.chartSettings.multipleAxisMode === 'Combined') {
                    axes = [axes[axes.length - 1]];
                }
                if (this.chartSettings.multipleAxisMode === 'Stacked') {
                    currentYAxis.rowIndex = valCnt;
                    currentYAxis.columnIndex = valCnt;
                    rows.push({ height: divider });
                    columns.push({ width: divider });
                }
                else {
                    currentYAxis.rowIndex = 0;
                    currentYAxis.columnIndex = 0;
                    rows = [{ height: '100%' }];
                    columns = [{ width: '100%' }];
                }
                valCnt++;
            }
        }
        else {
            var measureField = this.engineModule.fieldList[this.currentMeasure];
            var measureAggregatedName = (this.parent.dataType === 'olap' ? '' :
                (this.parent.localeObj.getConstant(measureField.aggregateType) + ' ' +
                    this.parent.localeObj.getConstant('of') + ' ')) + measureField.caption;
            // let formatSetting: IFormatSettings = this.dataSourceSettings.formatSettings.filter((item: IFormatSettings) => {
            //     return item.name === this.currentMeasure;
            // })[0];
            var formatSetting = void 0;
            for (var _d = 0, _e = this.dataSourceSettings.formatSettings; _d < _e.length; _d++) {
                var item = _e[_d];
                if (item.name === this.currentMeasure) {
                    formatSetting = item;
                    break;
                }
            }
            var currentYAxis = {};
            var format = PivotUtil.inArray(measureField.aggregateType, percentAggregateTypes) !== -1 ? 'P2' : (formatSetting ? formatSetting.format :
                this.parent.dataType === 'olap' ? this.getFormat(measureField.formatString) : 'N');
            currentYAxis = this.persistSettings.primaryYAxis ? this.frameObjectWithKeys(this.persistSettings.primaryYAxis) : currentYAxis;
            currentYAxis.zoomFactor = isNullOrUndefined(this.chartSettings.primaryYAxis.zoomFactor) ? 1
                : this.chartSettings.primaryYAxis.zoomFactor;
            currentYAxis.rowIndex = 0;
            currentYAxis.columnIndex = 0;
            currentYAxis.edgeLabelPlacement = this.chartSettings.primaryYAxis.edgeLabelPlacement ?
                this.chartSettings.primaryYAxis.edgeLabelPlacement : this.persistSettings.primaryYAxis.edgeLabelPlacement;
            if (!(this.chartSettings.chartSeries.type === 'Polar' || this.chartSettings.chartSeries.type === 'Radar')) {
                currentYAxis.name = this.measuresNames[this.currentMeasure] ? this.measuresNames[this.currentMeasure] : this.currentMeasure;
            }
            currentYAxis.labelFormat = currentYAxis.labelFormat ? currentYAxis.labelFormat : (percentChart ? '' : format);
            currentYAxis.title = currentYAxis.title ? currentYAxis.title : measureAggregatedName;
            axes = axes.concat(currentYAxis);
            rows.push({ height: '100%' });
            columns.push({ width: '100%' });
        }
        return { axes: axes, rows: rows, columns: columns };
    };
    PivotChart.prototype.getFormat = function (format) {
        if (format === 'Currency') {
            format = 'C';
        }
        else if (format === 'Percent') {
            format = 'P';
        }
        else {
            format = 'N';
        }
        return format;
    };
    /** @hidden */
    PivotChart.prototype.getColumnTotalIndex = function (pivotValues) {
        var colIndexColl = {};
        var rKeys = Object.keys(pivotValues);
        for (var _i = 0, rKeys_2 = rKeys; _i < rKeys_2.length; _i++) {
            var rowIndex = rKeys_2[_i];
            var rows = pivotValues[Number(rowIndex)];
            var cKeys = void 0;
            if (!isNullOrUndefined(rows)) {
                cKeys = Object.keys(rows);
                for (var _a = 0, cKeys_1 = cKeys; _a < cKeys_1.length; _a++) {
                    var cellIndex = cKeys_1[_a];
                    var cell = rows[Number(cellIndex)];
                    if (!isNullOrUndefined(cell)) {
                        if (cell.axis !== 'column') {
                            return colIndexColl;
                        }
                        else if ((cell.type === 'sum' || (this.dataSourceSettings && this.dataSourceSettings.columns &&
                            this.dataSourceSettings.columns.length === 0 ? false : cell.type === 'grand sum')) && cell.rowSpan !== -1) {
                            colIndexColl[cell.colIndex] = cell.colIndex;
                        }
                    }
                }
            }
        }
        return colIndexColl;
    };
    PivotChart.prototype.groupHierarchyWithLevels = function (pivotValues, fieldPosition) {
        var _a, _b;
        var group = {};
        var fieldCount = 0;
        var levelPos = {};
        this.measurePos = this.engineModule.tupRowInfo[0].measurePosition;
        for (var rowPos = 0; rowPos < pivotValues.length; rowPos++) {
            var cell = pivotValues[rowPos][0];
            if (cell && cell.axis === 'row' && cell.type !== 'grand sum') {
                if (isNullOrUndefined(group[cell.hierarchy])) {
                    if (cell.memberType === 3) {
                        if (fieldCount === this.measurePos) {
                            fieldPosition[this.measurePos] = cell.hierarchy;
                            group[cell.hierarchy] = (_a = {}, _a[cell.levelUniqueName] = cell.levelUniqueName, _a);
                        }
                        else {
                            fieldCount--;
                        }
                    }
                    else {
                        fieldPosition[fieldCount] = cell.hierarchy;
                        group[cell.hierarchy] = (_b = {}, _b[cell.levelUniqueName] = cell.levelUniqueName, _b);
                    }
                    fieldCount++;
                }
                else {
                    group[cell.hierarchy][cell.levelUniqueName] = cell.levelUniqueName;
                }
            }
        }
        var lastEnd = -1;
        for (var pos = 0; pos < fieldPosition.length; pos++) {
            if (this.measurePos !== pos) {
                levelPos[fieldPosition[pos]] = {
                    start: (lastEnd + 1),
                    end: (lastEnd + Object.keys(group[fieldPosition[pos]]).length)
                };
                lastEnd = levelPos[fieldPosition[pos]].end;
            }
        }
        return levelPos;
    };
    PivotChart.prototype.frameMultiLevelLabels = function () {
        var startKeys = Object.keys(this.headerColl);
        var parentHeaders = this.headerColl[-0.5];
        for (var _i = 0, startKeys_1 = startKeys; _i < startKeys_1.length; _i++) {
            var startKey = startKeys_1[_i];
            var sKey = Number(startKey);
            var headers = this.headerColl[sKey];
            var levelPos = 0;
            var isAvail = false;
            while (levelPos <= this.maxLevel) {
                if (!isAvail) {
                    if (!headers[levelPos]) {
                        headers[levelPos] = parentHeaders[levelPos];
                    }
                    else {
                        isAvail = true;
                    }
                }
                else if (!headers[levelPos]) {
                    headers[levelPos] = {
                        name: headers[levelPos - 1].name,
                        // text: headers[levelPos - 1].text,
                        text: '',
                        hasChild: headers[levelPos - 1].hasChild,
                        isDrilled: headers[levelPos - 1].isDrilled,
                        levelName: headers[levelPos - 1].levelName,
                        level: headers[levelPos - 1].level,
                        fieldName: headers[levelPos - 1].fieldName,
                        rowIndex: headers[levelPos - 1].rowIndex,
                        colIndex: headers[levelPos - 1].colIndex,
                        span: -1
                    };
                    // headers[levelPos - 1].span = 0;
                }
                levelPos++;
            }
            parentHeaders = this.headerColl[sKey];
        }
        var gRows = {};
        for (var _a = 0, startKeys_2 = startKeys; _a < startKeys_2.length; _a++) {
            var startKey = startKeys_2[_a];
            var sKey = Number(startKey);
            var headers = this.headerColl[sKey];
            var lKeys = Object.keys(headers);
            for (var _b = 0, lKeys_1 = lKeys; _b < lKeys_1.length; _b++) {
                var levelKey = lKeys_1[_b];
                var lKey = Number(levelKey);
                if (gRows[lKey]) {
                    var len = gRows[lKey].length;
                    if (headers[lKey].levelName === parentHeaders[lKey].levelName) {
                        gRows[lKey][len - 1].end = gRows[lKey][len - 1].end + 1;
                    }
                    else {
                        gRows[lKey].push({
                            start: sKey, end: sKey + 1, text: headers[lKey].text,
                            type: (headers[lKey].span === -1 ? 'WithoutTopandBottomBorder' : 'WithoutTopBorder'),
                            customAttributes: headers[lKey]
                        });
                    }
                }
                else {
                    gRows[lKey] = [{
                            start: sKey, end: sKey + 1, text: headers[lKey].text,
                            type: (headers[lKey].span === -1 ? 'WithoutTopandBottomBorder' : 'WithoutTopBorder'),
                            customAttributes: headers[lKey]
                        }];
                }
            }
            parentHeaders = headers;
        }
        var levellength = Object.keys(gRows).length;
        var multiLevelLabels = [];
        for (var level = levellength - 1; level > -1; level--) {
            multiLevelLabels.push({ categories: gRows[level], border: { width: 1 }, overflow: 'Trim' });
        }
        return multiLevelLabels;
    };
    PivotChart.prototype.getZoomFactor = function () {
        this.calculatedWidth = this.getCalulatedWidth();
        var seriesLength = (this.chartSeries.length * 10) > 120 ? (this.chartSeries.length * 10) : 120;
        var zoomFactor = this.chartSeries.length > 0 ?
            (this.calculatedWidth / (Object.keys(this.chartSeries[0].dataSource).length * seriesLength)) : 1;
        zoomFactor = (zoomFactor < 1 && zoomFactor > 0) ? zoomFactor : 1;
        return zoomFactor;
    };
    /** @hidden */
    PivotChart.prototype.getCalulatedWidth = function () {
        if (!isNaN(Number(this.parent.width))) {
            this.calculatedWidth = Number(this.parent.width);
        }
        else if (this.parent.width.indexOf('%') > -1) {
            this.calculatedWidth = this.parent.element.clientWidth * (parseFloat(this.parent.width) / 100);
        }
        else if (this.parent.width.indexOf('px') > -1) {
            this.calculatedWidth = Number(this.parent.width.toString().split('px')[0]);
        }
        else {
            this.calculatedWidth = this.parent.element.clientWidth;
        }
        return this.calculatedWidth;
    };
    PivotChart.prototype.configTooltipSettings = function () {
        var tooltip = this.persistSettings.tooltip ? this.persistSettings.tooltip :
            this.chartSettings.tooltip;
        tooltip.enable = tooltip.enable === undefined ? true : tooltip.enable;
        if (tooltip.enable && tooltip.template) {
            this.templateFn = this.parent.templateParser(tooltip.template);
        }
        if (this.parent.tooltipTemplate) {
            tooltip.template = tooltip.template ? tooltip.template : this.parent.tooltipTemplate;
        }
        tooltip.header = tooltip.header ? tooltip.header : '';
        tooltip.enableMarker = tooltip.enableMarker === undefined ? true : tooltip.enableMarker;
        return tooltip;
    };
    PivotChart.prototype.configLegendSettings = function () {
        var legendSettings = {};
        if (this.chartSettings.legendSettings) {
            var keyPos = 0;
            var keys = Object.keys(this.chartSettings.legendSettings);
            while (keyPos < keys.length) {
                legendSettings[keys[keyPos]] = this.chartSettings.legendSettings[keys[keyPos]];
                keyPos++;
            }
        }
        legendSettings.visible = legendSettings.visible !== false;
        legendSettings.padding = legendSettings.padding ? legendSettings.padding : 25;
        legendSettings.shapePadding = legendSettings.shapePadding ? legendSettings.shapePadding : 10;
        return legendSettings;
    };
    PivotChart.prototype.configXAxis = function () {
        var currentXAxis = {};
        currentXAxis = this.persistSettings.primaryXAxis ? this.frameObjectWithKeys(this.persistSettings.primaryXAxis) : currentXAxis;
        currentXAxis.valueType = 'Category';
        currentXAxis.labelIntersectAction = currentXAxis.labelIntersectAction ? currentXAxis.labelIntersectAction : 'Rotate45';
        currentXAxis.title = currentXAxis.title ? currentXAxis.title :
            this.dataSourceSettings.rows.map(function (args) {
                return args.caption || args.name;
            }).join(' / ');
        currentXAxis.zoomFactor = isNullOrUndefined(this.parent.chartSettings.primaryXAxis.zoomFactor) ? this.getZoomFactor()
            : this.parent.chartSettings.primaryXAxis.zoomFactor;
        if (!this.parent.chartSettings.zoomSettings.enableScrollbar) {
            currentXAxis.zoomFactor = 1;
        }
        if (this.chartSettings.showMultiLevelLabels && this.chartSettings.chartSeries.type !== 'Pareto') {
            currentXAxis.multiLevelLabels = this.frameMultiLevelLabels();
            currentXAxis.border = { width: 1, type: 'WithoutTopandBottomBorder' };
            currentXAxis.majorTickLines = { width: 0, height: -10 };
        }
        else {
            currentXAxis.multiLevelLabels = [];
            currentXAxis.border = { width: 1, type: 'Rectangle' };
            currentXAxis.majorTickLines = { width: 0, height: 5 };
        }
        return currentXAxis;
    };
    PivotChart.prototype.configZoomSettings = function () {
        var zoomSettings = this.chartSettings.zoomSettings;
        zoomSettings.enableSelectionZooming = zoomSettings.enableSelectionZooming === undefined ? true :
            zoomSettings.enableSelectionZooming;
        zoomSettings.enableScrollbar = zoomSettings.enableScrollbar === undefined ? true : zoomSettings.enableScrollbar;
        return zoomSettings;
    };
    PivotChart.prototype.tooltipRender = function (args) {
        var measure = (this.chartSettings.enableMultipleAxis && this.chartSettings.multipleAxisMode === 'Combined' &&
            this.accumulationType.indexOf(this.chartSettings.chartSeries.type) < 0 && this.chartSettings.chartSeries.type !== 'Radar' &&
            this.chartSettings.chartSeries.type !== 'Polar') ? args.series.tooltipMappingName :
            args.series.yAxisName ? (args.series.yAxisName.split('_CumulativeAxis')[0]) :
                ((this.chartSettings.enableMultipleAxis && this.accumulationType.indexOf(this.chartSettings.chartSeries.type) < 0 &&
                    this.chartSettings.chartSeries.type !== 'Pareto') ? args.series.name ? args.series.name.split(' | ')[1] :
                    args.data.seriesName ? args.data.seriesName.split(' | ')[1] : this.currentMeasure : this.measuresNames[this.currentMeasure] ?
                    this.measuresNames[this.currentMeasure] : this.currentMeasure);
        var dataSource = args.series.dataSource ? args.series.dataSource
            : this.parent.chart.series[args.data.seriesIndex].dataSource;
        var rowIndex = dataSource ? dataSource[args.data.pointIndex].rIndex : undefined;
        var colIndex = dataSource ? dataSource[args.data.pointIndex].cIndex : undefined;
        var measureField = this.engineModule.fieldList[this.measuresNames[measure]
            ? this.measuresNames[measure] : measure];
        var aggregateType = this.parent.dataType === 'olap' ? '' : this.parent.localeObj.getConstant(measureField.aggregateType);
        var measureAggregatedName = (this.parent.dataType === 'olap' ? '' : aggregateType + ' ' +
            this.parent.localeObj.getConstant('of') + ' ') + measureField.caption;
        var formattedText = this.engineModule.pivotValues[rowIndex][colIndex].formattedText;
        var formatField = this.engineModule.formatFields[measureField.id];
        var valueFormat = this.engineModule.getFormattedValue(args.point.y, measureField.id, formattedText);
        var formattedValue = (formatField && formatField.format && formatField.format.toLowerCase().match(/n|p|c/) !== null &&
            this.chartSettings.useGroupingSeparator) ? this.parent.dataType === 'olap' ?
            valueFormat.toString() : valueFormat.formattedText :
            formattedText;
        var cell = this.parent.pivotValues[rowIndex][colIndex];
        var text = cell.columnHeaders;
        var columnText = '';
        if (isNullOrUndefined(text)) {
            columnText = undefined;
        }
        else if (this.parent.dataType === 'olap') {
            columnText = this.chartSeriesInfo[text.toString().split(/~~|::/).join(' - ')].uniqueName;
        }
        else {
            var values = text.toString().split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter);
            text = PivotUtil.formatChartHeaders(values, this, true, cell);
            columnText = this.chartSeriesInfo[text.toString()].uniqueName;
        }
        var rowText = args.point.x;
        if (this.parent.tooltipTemplate && this.parent.getTooltipTemplate() !== undefined || this.chartSettings.tooltip.template) {
            var rowFields = dataSource ? this.parent.getHeaderField(rowIndex, colIndex, 'row') : '';
            var columnFields = dataSource ? this.parent.getHeaderField(rowIndex, colIndex, 'Column') : '';
            var templateVariable = {
                rowHeaders: rowText,
                columnHeaders: columnText,
                aggregateType: aggregateType,
                value: formattedValue,
                valueField: measureField.caption,
                rowFields: rowFields,
                columnFields: columnFields
            };
            var template = void 0;
            if (this.parent.chartSettings && this.parent.chartSettings.tooltip &&
                this.parent.chartSettings.tooltip.enable && this.parent.chartSettings.tooltip.template) {
                template = this.tooltipTemplateFn()(templateVariable, this, 'tooltipTemplate', this.element.id + '1tooltipTemplate')[0].outerHTML;
            }
            else {
                template = this.parent.getTooltipTemplate()(templateVariable, this, 'tooltipTemplate', this.element.id + 'tooltipTemplate')[0].outerHTML;
            }
            args.template = template;
        }
        else {
            args.text = measureAggregatedName + ': ' + formattedValue +
                (this.dataSourceSettings.columns.length === 0 ? '' :
                    (' <br/>' + this.parent.localeObj.getConstant('column') + ': ' + columnText)) +
                (this.dataSourceSettings.rows.length === 0 ? '' :
                    (' <br/>' + this.parent.localeObj.getConstant('row') + ': ' + rowText)) +
                ((args.data && args.data.seriesName === 'Pareto') ?
                    " <br/>" + this.parent.localeObj.getConstant('pareto') + ": " + args.data.pointY + "%" : '');
            this.parent.trigger(events.chartTooltipRender, args);
        }
    };
    PivotChart.prototype.tooltipTemplateFn = function () {
        return this.templateFn;
    };
    PivotChart.prototype.loaded = function (args) {
        this.parent.isChartLoaded = true;
        var width = this.parent.grid ? this.parent.getGridWidthAsNumber().toString() : this.parent.getWidthAsNumber().toString();
        if (this.parent.chart && this.parent.showGroupingBar && this.parent.groupingBarModule &&
            this.parent.showFieldList && this.parent.currentView === 'Chart') {
            this.parent.groupingBarModule.alignIcon();
        }
        if (this.chartSettings.showMultiLevelLabels) {
            var multilabelAxisName = PivotUtil.inArray(this.chartSettings.chartSeries.type, ['Bar', 'StackingBar', 'StackingBar100']) > -1 ?
                '_chartYAxisMultiLevelLabel0' : '_chartXAxisMultiLevelLabel0';
            if (!isNullOrUndefined(select('#' + this.parent.element.id + multilabelAxisName, this.parent.element))) {
                this.parent.element.querySelector('#' + this.parent.element.id + multilabelAxisName).setAttribute('cursor', 'pointer');
            }
        }
        var height = this.getChartHeight();
        this.parent.chart.height = height;
        if (this.parent.chartSettings.enableScrollOnMultiAxis && this.parent.chartSettings.enableMultipleAxis) {
            if (['Pie', 'Funnel', 'Pyramid', 'Doughnut', 'Radar', 'Polar', 'Pareto'].indexOf(this.parent.chartSettings.chartSeries.type) >= 0) {
                this.parent.element.querySelector('.' + cls.PIVOTCHART).style.overflow = 'visible';
            }
            else {
                this.parent.element.querySelector('.' + cls.PIVOTCHART).style.overflow = 'auto';
                this.parent.element.querySelector('.' + cls.PIVOTCHART).style.overflowX = 'hidden';
            }
            this.parent.element.querySelector('.' + cls.PIVOTCHART).style.width = width + 'px';
            this.parent.element.querySelector('.' + cls.PIVOTCHART).style.height = height + 'px';
        }
        this.updateView();
        if (this.parent.displayOption.primary === 'Chart' || this.parent.displayOption.view === 'Chart') {
            this.parent.notify(events.contentReady, {});
        }
        this.parent.trigger(events.chartLoaded, args);
        if ((this.parent.dataSourceSettings.mode === 'Server' && this.parent.isServerWaitingPopup) || this.parent.dataSourceSettings.mode === 'Local') {
            this.parent.hideWaitingPopup();
        }
    };
    /** @hidden */
    PivotChart.prototype.updateView = function () {
        if (this.parent.grid && this.parent.chart && this.parent.showToolbar) {
            var groupingTable = this.parent.element.querySelector('.e-pivot-grouping-bar');
            var groupingChartTable = this.parent.element.querySelector('.e-chart-grouping-bar');
            if (this.parent.currentView === 'Table') {
                this.parent.grid.element.style.display = '';
                this.parent.chart.element.style.display = 'none';
                if (this.parent.showGroupingBar && this.parent.groupingBarModule) {
                    if (groupingTable) {
                        groupingTable.style.display = '';
                        if (groupingTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) &&
                            this.parent.groupingBarModule.gridPanel != null && !this.parent.groupingBarModule.gridPanel.isDestroyed) {
                            this.parent.groupingBarModule.gridPanel.refreshOverflow();
                        }
                    }
                    if (groupingChartTable) {
                        groupingChartTable.style.display = 'none';
                    }
                }
                if (this.parent.chartSettings.enableMultipleAxis && this.parent.chartSettings.enableScrollOnMultiAxis) {
                    this.parent.element.querySelector('.e-pivotchart').style.display = 'none';
                }
            }
            else {
                this.parent.grid.element.style.display = 'none';
                this.parent.chart.element.style.display = '';
                if (this.parent.showGroupingBar && this.parent.groupingBarModule) {
                    if (groupingTable) {
                        groupingTable.style.display = 'none';
                    }
                    if (groupingChartTable) {
                        groupingChartTable.style.display = '';
                        if (groupingChartTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) &&
                            this.parent.groupingBarModule.chartPanel != null && !this.parent.groupingBarModule.chartPanel.isDestroyed) {
                            this.parent.groupingBarModule.chartPanel.refreshOverflow();
                        }
                    }
                }
                if (this.parent.chartSettings.enableMultipleAxis && this.parent.chartSettings.enableScrollOnMultiAxis) {
                    this.parent.element.querySelector('.e-pivotchart').style.display = '';
                }
            }
        }
    };
    PivotChart.prototype.creatMenu = function () {
        if (this.accumulationMenu && !this.accumulationMenu.isDestroyed) {
            this.accumulationMenu.destroy();
        }
        var items = ((this.parent.allowDrillThrough || this.parent.editSettings.allowEditing)
            && this.parent.drillThroughModule) ? ['expand', 'collapse', 'drillThrough', 'exit'] :
            ['expand', 'collapse', 'exit'];
        var option = [];
        for (var i = 0; i < items.length; i++) {
            option.push({
                id: this.parent.element.id + '_DrillMenuChart_' + items[i],
                text: this.parent.localeObj.getConstant(items[i]),
                items: []
            });
        }
        var getString = this.getMenuItems();
        var expand = [];
        var collapse = [];
        for (var i = 0; i < getString.length; i++) {
            if (getString[i].type === 'expand') {
                expand.push({ id: this.element.id + 'drillExpand_' + getString[i].key, text: getString[i].value });
            }
            else {
                collapse.push({ id: this.element.id + 'drillCollapse_' + getString[i].key, text: getString[i].value });
            }
        }
        if (expand.length > 0) {
            option[0].items = expand;
        }
        if (collapse.length > 0) {
            option[1].items = collapse;
        }
        var menuOptions = {
            cssClass: this.parent.element.id + '_accumulationChart' + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
            items: option,
            enableRtl: this.parent.enableRtl,
            beforeOpen: this.drillMenuOpen.bind(this),
            select: this.drillMenuSelect.bind(this),
            locale: this.parent.locale
        };
        this.accumulationMenu = new ContextMenu(menuOptions);
        var contextMenu;
        if (select('#' + this.parent.element.id + '_accumulationChart', this.parent.element)) {
            contextMenu = select('#' + this.parent.element.id + '_accumulationChart', this.parent.element);
            contextMenu.innerHTML = '';
        }
        else {
            contextMenu = createElement('ul', {
                id: this.parent.element.id + '_accumulationChart'
            });
            this.parent.element.appendChild(contextMenu);
        }
        this.accumulationMenu.isStringTemplate = true;
        this.accumulationMenu.appendTo(contextMenu);
    };
    PivotChart.prototype.drillMenuOpen = function (args) {
        if (args.items[0] && args.items[0].text === this.parent.localeObj.getConstant('expand') &&
            args.items[0].items && args.items[0].items.length === 0) {
            this.accumulationMenu.enableItems([this.parent.localeObj.getConstant('expand')], false);
        }
        if (args.items[1] && args.items[1].text === this.parent.localeObj.getConstant('collapse') &&
            args.items[1].items && args.items[1].items.length === 0) {
            this.accumulationMenu.enableItems([this.parent.localeObj.getConstant('collapse')], false);
        }
    };
    PivotChart.prototype.getMenuItems = function () {
        var rowIndex = this.pivotIndex.rIndex;
        var menuItem = [];
        var pivotValues = this.engineModule.pivotValues;
        var levelCol = [];
        var pivotValue = pivotValues[rowIndex][this.pivotIndex.cIndex];
        // let hierarchy: string = pivotValues[rowIndex][0].hierarchy;
        var level = (!pivotValues[rowIndex][0].isNamedSet && pivotValues[rowIndex][0].hasChild) ?
            pivotValues[rowIndex][0].level : undefined;
        var levels = this.parent.dataType === 'olap' ? pivotValue.rowHeaders.toString().split(/~~|::/)
            : pivotValue.rowHeaders.toString().split(this.engineModule.valueSortSettings.headerDelimiter);
        while (pivotValues[rowIndex][0]) {
            pivotValue = pivotValues[rowIndex][0];
            if ((levels.length !== 0) && (levels.indexOf(pivotValue.formattedText.toString()) === (levels.length - 1))) {
                if (pivotValue.hasChild && !pivotValue.isNamedSet && levelCol.indexOf(pivotValue.level) < 0 &&
                    (level ? level >= pivotValue.level : (level === 0 ? (pivotValue.level === 0) : true))) {
                    if (!(pivotValue.isDrilled && pivotValue.hasChild)) {
                        menuItem.push({
                            key: rowIndex,
                            type: 'expand',
                            value: pivotValue.formattedText
                        });
                    }
                    else {
                        menuItem.push({
                            key: rowIndex,
                            type: 'collapse',
                            value: pivotValue.formattedText
                        });
                    }
                    levelCol.push(pivotValue.level);
                    level = level ? (level - 1) : (pivotValue.level - 1);
                }
                var index = levels.indexOf(pivotValue.formattedText.toString());
                levels.splice(index, 1);
            }
            if (pivotValue.level === 0 && pivotValue.hasChild && !pivotValue.isNamedSet) {
                level = undefined;
                levelCol = [];
            }
            rowIndex--;
        }
        return menuItem;
    };
    PivotChart.prototype.drillMenuSelect = function (args) {
        var pivotValues = (this.parent.dataType === 'olap' ?
            this.parent.olapEngineModule.pivotValues : this.parent.engineModule.pivotValues);
        var option = (args.element.id).split('_DrillMenuChart_')[1];
        if (args.element.id.indexOf(this.element.id + 'drill') === 0) {
            var type = args.element.id.split(this.element.id + 'drill')[1].indexOf('Expand') >= 0 ? 'drillExpand' : 'drillCollapse';
            var rowIndex = Number(args.element.id.split(this.element.id + type + '_')[1]);
            var pivotValue = pivotValues[rowIndex][0];
            var name_2 = this.parent.dataType === 'olap' ? pivotValue.formattedText :
                (pivotValue.actualText ? pivotValue.actualText.toString() : pivotValue.formattedText.toString());
            var text = pivotValue.formattedText ? pivotValue.formattedText.toString() : name_2;
            var caption = (pivotValue.hasChild && !pivotValue.isNamedSet) ?
                ((pivotValue.isDrilled ? ' - ' : ' + ') + text) : text;
            var tupInfo = this.parent.dataType === 'olap' ?
                this.engineModule.tupRowInfo[pivotValue.ordinal] : undefined;
            var levelName = tupInfo ? tupInfo.uNameCollection : pivotValue.valueSort.levelName.toString();
            var customAttributes = {
                fieldName: pivotValue.valueSort.axis,
                level: pivotValue.level,
                hasChild: pivotValue.hasChild,
                levelName: levelName,
                name: name_2,
                text: caption,
                rowIndex: rowIndex,
                colIndex: 0,
                isDrilled: pivotValue.isDrilled,
                cell: pivotValue
            };
            if (this.parent.dataType === 'olap') {
                this.parent.onDrill(undefined, customAttributes);
            }
            else {
                this.onDrill({ customAttributes: customAttributes });
            }
        }
        else if (option === 'drillThrough') {
            this.parent.drillThroughModule.executeDrillThrough(pivotValues[this.pivotIndex.rIndex][this.pivotIndex.cIndex], this.pivotIndex.rIndex, this.pivotIndex.rIndex);
        }
        else if (option === 'exit') {
            this.accumulationMenu.close();
        }
    };
    /**
     *
     * @returns {string} - string.
     * @hidden
     */
    PivotChart.prototype.getChartHeight = function () {
        var height;
        var offSetHeight;
        if (isNullOrUndefined(this.parent.getHeightAsNumber())) {
            height = 'auto';
        }
        else {
            var offSetVal = this.parent.showToolbar ? 6 : 5;
            height = (this.parent.getHeightAsNumber() - offSetVal).toString();
            offSetHeight = this.parent.getHeightAsNumber() - offSetVal;
        }
        if (!isNullOrUndefined(this.parent.getHeightAsNumber())) {
            var isNone = false;
            if (this.parent.element.querySelector('.e-chart-grouping-bar') !== null && this.parent.element.querySelector('.e-chart-grouping-bar').style.display.toLowerCase() === 'none') {
                isNone = true;
                this.parent.element.querySelector('.e-chart-grouping-bar').style.display = 'block';
            }
            if (this.parent.showToolbar && this.parent.showGroupingBar) {
                height = (offSetHeight - (this.parent.element.querySelector('.e-pivot-toolbar') ?
                    this.parent.element.querySelector('.e-pivot-toolbar').clientHeight : 42) -
                    (this.parent.element.querySelector('.e-chart-grouping-bar') ?
                        this.parent.element.querySelector('.e-chart-grouping-bar').clientHeight : 62)).toString();
            }
            else if (this.parent.showToolbar) {
                height = (offSetHeight - (this.parent.element.querySelector('.e-pivot-toolbar') ?
                    this.parent.element.querySelector('.e-pivot-toolbar').clientHeight : 42)).toString();
            }
            else if (this.parent.showGroupingBar) {
                height = (offSetHeight - (this.parent.element.querySelector('.e-chart-grouping-bar') ?
                    this.parent.element.querySelector('.e-chart-grouping-bar').clientHeight : 62)).toString();
            }
            else if ((this.parent.chart && parseInt(this.parent.chart.height, 10) < 200) || offSetHeight < 200) {
                height = '200';
            }
            if (isNone) {
                this.parent.element.querySelector('.e-chart-grouping-bar').style.display = 'none';
            }
        }
        else {
            height = 'auto';
        }
        return height;
    };
    PivotChart.prototype.getChartAutoHeight = function () {
        var height = this.parent.element.offsetHeight < this.parent.minHeight ? this.parent.minHeight :
            this.parent.element.offsetHeight;
        if (this.parent.showToolbar && this.parent.showGroupingBar) {
            height = height - (this.parent.element.querySelector('.e-pivot-toolbar') ?
                this.parent.element.querySelector('.e-pivot-toolbar').clientHeight : 42) -
                (this.parent.element.querySelector('.e-chart-grouping-bar') ?
                    this.parent.element.querySelector('.e-chart-grouping-bar').clientHeight : 62);
        }
        else if (this.parent.showToolbar) {
            height = height - (this.parent.element.querySelector('.e-pivot-toolbar') ?
                this.parent.element.querySelector('.e-pivot-toolbar').clientHeight : 42);
        }
        else if (this.parent.showGroupingBar) {
            height = height - (this.parent.element.querySelector('.e-chart-grouping-bar') ?
                this.parent.element.querySelector('.e-chart-grouping-bar').clientHeight : 62);
        }
        return height;
    };
    PivotChart.prototype.axisLabelRender = function (args) {
        if (this.chartSettings.showMultiLevelLabels && this.chartSettings.chartSeries.type !== 'Pareto') {
            if (args.axis.name === 'primaryXAxis') {
                args.text = '';
            }
        }
        if (args.axis.name !== 'primaryXAxis' && !(this.parent.chartSettings.chartSeries.type === 'StackingColumn100' ||
            this.parent.chartSettings.chartSeries.type === 'StackingBar100' ||
            this.parent.chartSettings.chartSeries.type === 'StackingArea100' ||
            this.parent.chartSettings.chartSeries.type === 'StackingLine100')) {
            var key = (this.chartSettings.enableMultipleAxis &&
                this.chartSettings.multipleAxisMode === 'Combined') ? this.currentMeasure :
                this.parent.dataType === 'olap' ? this.measuresNames[args.axis.name] : args.axis.name;
            var formatField = this.engineModule.formatFields[key] || null;
            var valueFormat = this.engineModule.getFormattedValue(args.value, (this.chartSettings.enableMultipleAxis &&
                this.chartSettings.multipleAxisMode === 'Combined') ? this.currentMeasure : args.axis.name, args.text);
            var formattedValue = ((formatField && formatField.format &&
                this.chartSettings.useGroupingSeparator) ? this.parent.dataType === 'olap' ? valueFormat.toString() :
                valueFormat.formattedText : args.value.toString());
            args.text = formattedValue;
        }
        this.parent.trigger(events.chartAxisLabelRender, args);
    };
    PivotChart.prototype.multiLevelLabelClick = function (args) {
        var eventArgs = {
            axis: args.axis,
            text: args.text,
            cell: !isNullOrUndefined(args.customAttributes) ? args.customAttributes.cell : undefined,
            cancel: false
        };
        this.parent.trigger(events.multiLevelLabelClick, eventArgs);
        if (!eventArgs.cancel && args.customAttributes && args.customAttributes.hasChild &&
            !args.customAttributes.cell.isNamedSet) {
            if (this.parent.dataType === 'olap') {
                this.parent.onDrill(undefined, args.customAttributes);
            }
            else {
                this.onDrill(args);
            }
        }
    };
    /**
     * It helped to drills the row or columns.
     *
     * @param {IMultiLevelLabelClickEventArgs} args - It contains the drillInfo.
     * @returns {void}
     * @hidden
     */
    PivotChart.prototype.onDrill = function (args) {
        var labelInfo = args.customAttributes;
        var delimiter = (this.dataSourceSettings.drilledMembers[0] && this.dataSourceSettings.drilledMembers[0].delimiter) ?
            this.dataSourceSettings.drilledMembers[0].delimiter : '**';
        var fieldName = labelInfo.fieldName;
        var currentColIndex = (this.parent.gridSettings.layout === 'Tabular' ? (!this.parent.dataSourceSettings.showSubTotals ||
            (!this.parent.dataSourceSettings.showRowSubTotals && this.parent.dataSourceSettings.showColumnSubTotals)) ?
            labelInfo.level : this.parent.engineModule.rowMaxLevel : labelInfo.colIndex);
        var currentCell = this.engineModule.pivotValues[labelInfo.rowIndex][currentColIndex];
        var memberUqName = currentCell.valueSort.levelName.
            split(this.engineModule.valueSortSettings.headerDelimiter).join(delimiter);
        var fieldAvail = false;
        if (this.dataSourceSettings.drilledMembers.length === 0) {
            this.parent.setProperties({
                dataSourceSettings: { drilledMembers: [{ name: fieldName, items: [memberUqName], delimiter: delimiter }] }
            }, true);
        }
        else {
            for (var fCnt = 0; fCnt < this.dataSourceSettings.drilledMembers.length; fCnt++) {
                var field = this.dataSourceSettings.drilledMembers[fCnt];
                memberUqName = memberUqName.split(delimiter).join(field.delimiter ? field.delimiter : delimiter);
                delimiter = field.delimiter = field.delimiter ? field.delimiter : delimiter;
                if (field.name === fieldName) {
                    fieldAvail = true;
                    var memIndex = field.items.indexOf(memberUqName);
                    if (memIndex > -1) {
                        field.items.splice(memIndex, 1);
                    }
                    else {
                        field.items.push(memberUqName);
                    }
                }
                else {
                    continue;
                }
            }
            if (!fieldAvail) {
                this.dataSourceSettings.drilledMembers.push({ name: fieldName, items: [memberUqName], delimiter: delimiter });
            }
        }
        this.parent.showWaitingPopup();
        var pivot = this;
        //setTimeout(() => {
        var drilledItem = {
            fieldName: fieldName, memberName: memberUqName, delimiter: delimiter,
            axis: 'row',
            action: labelInfo.isDrilled ? 'up' : 'down',
            currentCell: currentCell
        };
        var drillArgs = {
            drillInfo: drilledItem,
            pivotview: pivot.parent
        };
        pivot.parent.trigger(events.drill, drillArgs);
        var enginePopulatingEventArgs = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings)
        };
        this.parent.trigger(events.enginePopulating, enginePopulatingEventArgs);
        this.parent.setProperties({ dataSourceSettings: enginePopulatingEventArgs.dataSourceSettings }, true);
        if (pivot.parent.enableVirtualization || pivot.parent.enablePaging) {
            if (pivot.parent.dataSourceSettings.mode === 'Server') {
                pivot.parent.getEngine('onDrill', drilledItem, null, null, null, null, null);
            }
            else {
                pivot.engineModule.drilledMembers = pivot.dataSourceSettings.drilledMembers;
                pivot.engineModule.onDrill(drilledItem);
            }
        }
        else if (pivot.parent.dataSourceSettings.mode === 'Server') {
            pivot.parent.getEngine('onDrill', drilledItem, null, null, null, null, null);
        }
        else {
            pivot.engineModule.generateGridData(pivot.dataSourceSettings, true);
        }
        pivot.parent.allowServerDataBinding = false;
        pivot.parent.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
        pivot.parent.allowServerDataBinding = true;
        var eventArgs = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings),
            pivotValues: this.parent.pivotValues
        };
        this.parent.trigger(events.enginePopulated, eventArgs);
        pivot.engineModule.pivotValues = eventArgs.pivotValues;
        pivot.parent.renderPivotGrid();
        //});
    };
    PivotChart.prototype.isAttributeDrill = function (hierarchy, drillInfo) {
        var isDrill = false;
        for (var i = 0; i < this.dataSourceSettings.drilledMembers.length; i++) {
            if (this.dataSourceSettings.drilledMembers[i].name === hierarchy) {
                for (var j = 0; j < this.dataSourceSettings.drilledMembers[i].items.length; j++) {
                    var drillItems = this.dataSourceSettings.drilledMembers[i].items[j]
                        .split(this.dataSourceSettings.drilledMembers[i].delimiter);
                    var levelName = '';
                    for (var k = 0; k < drillItems.length; k++) {
                        if (drillInfo[k] && drillInfo[k].uName) {
                            levelName = levelName + (levelName === '' ? '' : this.dataSourceSettings.drilledMembers[i].delimiter) +
                                (drillInfo[k].uName.indexOf('[Measures]') > -1 ? '[Measures]' : drillInfo[k].uName);
                        }
                    }
                    if (levelName === this.dataSourceSettings.drilledMembers[i].items[j]) {
                        isDrill = true;
                        break;
                    }
                }
            }
        }
        return isDrill;
    };
    PivotChart.prototype.load = function (args) {
        if (args.chart.zoomModule) {
            args.chart.zoomModule.isZoomed = true;
        }
        this.parent.trigger(events.chartLoad, args);
    };
    PivotChart.prototype.beforePrint = function (args) {
        this.parent.trigger(events.beforePrint, args);
    };
    PivotChart.prototype.animationComplete = function (args) {
        this.parent.trigger(events.animationComplete, args);
    };
    PivotChart.prototype.legendRender = function (args) {
        this.parent.trigger(events.legendRender, args);
    };
    PivotChart.prototype.textRender = function (args) {
        this.parent.trigger(events.textRender, args);
    };
    PivotChart.prototype.pointRender = function (args) {
        this.parent.trigger(events.pointRender, args);
    };
    PivotChart.prototype.seriesRender = function (args) {
        this.parent.trigger(events.seriesRender, args);
    };
    PivotChart.prototype.chartMouseMove = function (args) {
        this.parent.trigger(events.chartMouseMove, args);
    };
    PivotChart.prototype.chartMouseClick = function (args) {
        this.parent.trigger(events.chartMouseClick, args);
    };
    PivotChart.prototype.pointMove = function (args) {
        this.parent.trigger(events.pointMove, args);
    };
    PivotChart.prototype.chartMouseLeave = function (args) {
        this.parent.trigger(events.chartMouseLeave, args);
    };
    PivotChart.prototype.chartMouseDown = function (args) {
        this.parent.trigger(events.chartMouseDown, args);
    };
    PivotChart.prototype.chartMouseUp = function (args) {
        this.parent.trigger(events.chartMouseUp, args);
    };
    PivotChart.prototype.dragComplete = function (args) {
        this.parent.trigger(events.dragComplete, args);
    };
    PivotChart.prototype.zoomComplete = function (args) {
        this.parent.trigger(events.zoomComplete, args);
    };
    PivotChart.prototype.scrollStart = function (args) {
        this.parent.trigger(events.scrollStart, args);
    };
    PivotChart.prototype.scrollEnd = function (args) {
        this.parent.trigger(events.scrollEnd, args);
    };
    PivotChart.prototype.scrollChanged = function (args) {
        this.parent.trigger(events.scrollChanged, args);
    };
    PivotChart.prototype.multiLevelLabelRender = function (args) {
        this.parent.trigger(events.multiLevelLabelRender, args);
    };
    PivotChart.prototype.resized = function (args) {
        if (this.accumulationType.indexOf(this.chartSettings.chartSeries.type) < 0) {
            args.chart.primaryXAxis.zoomFactor = isNullOrUndefined(this.parent.chartSettings.primaryXAxis.zoomFactor)
                ? this.getZoomFactor() : this.parent.chartSettings.primaryXAxis.zoomFactor;
            if (!this.parent.chartSettings.zoomSettings.enableScrollbar) {
                args.chart.primaryXAxis.zoomFactor = isNullOrUndefined(this.parent.chartSettings.primaryXAxis.zoomFactor)
                    ? 1 : this.parent.chartSettings.primaryXAxis.zoomFactor;
            }
        }
        this.parent.trigger(events.chartResized, args);
    };
    PivotChart.prototype.isMemberDrilled = function (previousRowCell, previousRowTextCollection) {
        var drillMem = false;
        for (var n = 0; n < this.parent.dataSourceSettings.drilledMembers.length; n++) {
            var drillItems = this.parent.dataSourceSettings.drilledMembers[n].items;
            for (var v = 0; v < drillItems.length; v++) {
                var drillItemsCollection = drillItems[v].split(this.parent.dataSourceSettings
                    .drilledMembers[n].delimiter);
                if (drillItemsCollection[drillItemsCollection.length - 1] === previousRowCell.formattedText.split(' ')[0]
                    && drillItemsCollection[0] === previousRowTextCollection[0]) {
                    drillMem = true;
                    break;
                }
            }
        }
        return drillMem;
    };
    /** @hidden */
    PivotChart.prototype.getResizedChartHeight = function () {
        var height = ['Pie', 'Funnel', 'Pyramid', 'Doughnut', 'Radar', 'Polar', 'Pareto'].indexOf(this.parent.chartSettings.chartSeries.type) < 0 &&
            this.parent.chartSettings.enableScrollOnMultiAxis && this.parent.chartSettings.enableMultipleAxis &&
            this.parent.dataSourceSettings.values.length > 0 ? Number(this.parent.chart.height) >
            (this.parent.dataSourceSettings.values.length * 235) + 100 ? isNaN(Number(this.getChartHeight())) ?
            this.getChartHeight().toString() : (Number(this.getChartHeight()) - 5).toString() :
            (!isNaN(Number(this.getChartHeight())) || this.parent.dataSourceSettings.values.length > 1) ?
                ((this.parent.dataSourceSettings.values.length * 235) + 100).toString() : this.getChartHeight().toString()
            : this.getChartHeight().toString();
        return height;
    };
    /**
     * To destroy the chart module
     *
     * @returns {void}
     * @hidden
     */
    PivotChart.prototype.destroy = function () {
        if (this.parent && this.parent.isDestroyed) {
            return;
        }
        if (this.engineModule && !this.parent.destroyEngine) {
            this.engineModule.fieldList = {};
            this.engineModule = {};
        }
        if (this.chartSeries) {
            this.chartSeries = null;
        }
        if (this.columnGroupObject) {
            this.columnGroupObject = null;
        }
        if (this.chartSeriesInfo) {
            this.chartSeriesInfo = {};
            this.selectedLegend = null;
        }
        if (this.chartSettings) {
            this.chartSettings = null;
        }
        if (this.dataSourceSettings) {
            this.dataSourceSettings = null;
        }
        if (this.accumulationMenu && !this.accumulationMenu.isDestroyed) {
            this.accumulationMenu.destroy();
            this.accumulationMenu = null;
        }
        if (this.parent && this.parent.chart && !this.parent.chart.isDestroyed) {
            this.parent.chart.destroy();
            this.parent.chart = null;
        }
        else {
            return;
        }
    };
    return PivotChart;
}());
export { PivotChart };
