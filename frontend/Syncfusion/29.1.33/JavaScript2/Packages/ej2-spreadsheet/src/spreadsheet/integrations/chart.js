import { getSheetIndex, isHiddenRow, getCell, setCell, getSheet } from '../../workbook/index';
import { initiateChart, getRangeIndexes, isNumber, getSheetIndexFromAddress } from '../../workbook/index';
import { refreshChartCellOnInit } from '../../workbook/index';
import { overlay, locale, refreshChartCellObj, getRowIdxFromClientY, getColIdxFromClientX, deleteChart, dialog, overlayEleSize, undoRedoForChartDesign, addDPRValue, refreshChartCellModel } from '../common/index';
import { completeAction, clearChartBorder, focusBorder } from '../common/index';
import { Chart, ColumnSeries, Category, StackingColumnSeries, BarSeries } from '@syncfusion/ej2-charts';
import { AreaSeries, StackingAreaSeries, AccumulationChart, Tooltip } from '@syncfusion/ej2-charts';
import { Legend, StackingBarSeries, LineSeries, StackingLineSeries, ScatterSeries } from '@syncfusion/ej2-charts';
import { AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel } from '@syncfusion/ej2-charts';
import { isNullOrUndefined, getComponent, closest, detach, isUndefined, getUniqueID } from '@syncfusion/ej2-base';
import { isCustomDateTime, getAutoDetectFormatParser, calculateFormula, checkRange, inRange } from '../../workbook/index';
import { refreshChart, deleteChartColl, getFormattedCellObject, setChart, getCellAddress } from '../../workbook/common/index';
import { insertChart, chartRangeSelection, addChartEle, chartDesignTab, removeDesignChart, insertDesignChart, getUpdateUsingRaf, focus } from '../common/index';
import { DataLabel } from '@syncfusion/ej2-charts';
import { isHiddenCol, beginAction } from '../../workbook/index';
Chart.Inject(ColumnSeries, LineSeries, BarSeries, AreaSeries, StackingColumnSeries, StackingLineSeries, StackingBarSeries, ScatterSeries);
Chart.Inject(StackingAreaSeries, Category, Legend, Tooltip, DataLabel);
AccumulationChart.Inject(PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationLegend);
/**
 * Represents Chart support for Spreadsheet.
 */
var SpreadsheetChart = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet Chart module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet Chart module.
     */
    function SpreadsheetChart(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * Adding event listener for success and failure
     *
     * @returns {void} - Adding event listener for success and failure
     */
    SpreadsheetChart.prototype.addEventListener = function () {
        this.parent.on(initiateChart, this.initiateChartHandler, this);
        this.parent.on(refreshChartCellObj, this.refreshChartCellObj, this);
        this.parent.on(refreshChartCellModel, this.refreshChartCellModel, this);
        this.parent.on(refreshChartCellOnInit, this.refreshChartCellObj, this);
        this.parent.on(deleteChart, this.deleteChart, this);
        this.parent.on(clearChartBorder, this.clearBorder, this);
        this.parent.on(insertChart, this.insertChartHandler, this);
        this.parent.on(chartRangeSelection, this.chartRangeHandler, this);
        this.parent.on(chartDesignTab, this.chartDesignTabHandler, this);
        this.parent.on(addChartEle, this.updateChartElement, this);
        this.parent.on(undoRedoForChartDesign, this.undoRedoForChartDesign, this);
        this.parent.on(refreshChart, this.refreshChartData, this);
    };
    SpreadsheetChart.prototype.insertChartHandler = function (args) {
        var _this = this;
        var chartType = 'Column';
        var markerVisible = false;
        switch (args.id) {
            case 'clusteredColumn':
                chartType = 'Column';
                break;
            case 'stackedColumn':
                chartType = 'StackingColumn';
                break;
            case 'stackedColumn100':
                chartType = 'StackingColumn100';
                break;
            case 'clusteredBar':
                chartType = 'Bar';
                break;
            case 'stackedBar':
                chartType = 'StackingBar';
                break;
            case 'stackedBar100':
                chartType = 'StackingBar100';
                break;
            case 'area':
                chartType = 'Area';
                break;
            case 'stackedArea':
                chartType = 'StackingArea';
                break;
            case 'stackedArea100':
                chartType = 'StackingArea100';
                break;
            case 'line':
                chartType = 'Line';
                break;
            case 'lineMarker':
                chartType = 'Line';
                markerVisible = true;
                break;
            case 'stackedLine':
                chartType = 'StackingLine';
                break;
            case 'stackedLineMarker':
                chartType = 'StackingLine';
                markerVisible = true;
                break;
            case 'stackedLine100':
                chartType = 'StackingLine100';
                break;
            case 'stackedLine100Marker':
                chartType = 'StackingLine100';
                markerVisible = true;
                break;
            case 'pie':
                chartType = 'Pie';
                break;
            case 'doughnut':
                chartType = 'Doughnut';
                break;
            //  case 'radar':
            //     chartType = ;
            //     break;
            //  case 'radar_markers':
            //     chartType = 'Column';
            //     break;
            case 'scatter':
                chartType = 'Scatter';
                break;
        }
        var chart = [{ type: chartType, markerSettings: { visible: markerVisible, isFilled: true } }];
        if (args.isChart) {
            this.parent.notify(setChart, { chart: chart });
            getUpdateUsingRaf(function () { return focus(_this.parent.element); });
        }
        else {
            this.parent.notify(chartDesignTab, { chartType: chartType, triggerEvent: true, markerVisible: markerVisible });
        }
    };
    SpreadsheetChart.prototype.chartRangeHandler = function () {
        var overlayEle = document.querySelector('.e-datavisualization-chart.e-ss-overlay-active');
        if (overlayEle) {
            var chartId = overlayEle.getElementsByClassName('e-control')[0].id;
            var chartColl = this.parent.chartColl;
            var chartCollLen = chartColl.length;
            for (var idx = 0; idx < chartCollLen; idx++) {
                var chartEle = document.getElementById(chartColl[idx].id);
                if (overlayEle && chartEle && chartColl[idx].id === chartId) {
                    this.initiateChartHandler({ option: chartColl[idx], isRefresh: true });
                }
            }
        }
    };
    SpreadsheetChart.prototype.refreshChartData = function (args) {
        if (!this.parent.chartColl || !this.parent.chartColl.length) {
            return;
        }
        var chart;
        var sheetName;
        var range;
        var insideRange;
        var chartEle;
        var chartObj;
        for (var i = 0, len = this.parent.chartColl.length; i < len; i++) {
            chart = this.parent.chartColl[i];
            if (chart.range.includes('!')) {
                sheetName = chart.range.substring(0, chart.range.lastIndexOf('!'));
                if (this.parent.activeSheetIndex !== getSheetIndex(this.parent, sheetName)) {
                    continue;
                }
                range = chart.range.substring(chart.range.lastIndexOf('!') + 1);
            }
            else {
                range = chart.range;
            }
            if (args.viewportIndexes) {
                for (var idx = 0; idx < args.viewportIndexes.length; idx++) {
                    if (checkRange([args.viewportIndexes[idx]], range)) {
                        insideRange = true;
                        break;
                    }
                }
            }
            else {
                insideRange = args.range ? checkRange([args.range], range) : (args.showHide ? this.inRowColumnRange(getRangeIndexes(range), args.rIdx, args.showHide) : inRange(getRangeIndexes(range), args.rIdx, args.cIdx));
            }
            if (insideRange || (args.isSelectAll && !args.isRefreshChart)) {
                chartEle = this.parent.element.querySelector('.' + chart.id);
                if (chartEle) {
                    chartObj = getComponent(chartEle, 'chart') || getComponent(chartEle, 'accumulationchart');
                    if (chartObj) {
                        chartObj.series = this.initiateChartHandler({ option: chart, isRefresh: true });
                        chartObj.refresh();
                    }
                }
            }
        }
    };
    SpreadsheetChart.prototype.inRowColumnRange = function (range, index, showHide) {
        return showHide === 'rows' ? index >= range[0] && index <= range[2] : index >= range[1] && index <= range[3];
    };
    SpreadsheetChart.prototype.refreshChartCellModel = function (args) {
        for (var i = 0, len = args.prevChartIndexes.length; i < len; i++) {
            var chart = args.prevChartIndexes[i].chart;
            var prevRowIdx = args.prevChartIndexes[i].chartRowIdx;
            var prevColIdx = args.prevChartIndexes[i].chartColIdx;
            var currentRowIdx = args.currentChartIndexes[i].chartRowIdx;
            var currentColIdx = args.currentChartIndexes[i].chartColIdx;
            var eventArgs = {
                prevTop: chart.top, prevLeft: chart.left, prevRowIdx: prevRowIdx, prevColIdx: prevColIdx,
                prevHeight: chart.height, prevWidth: chart.width, currentTop: chart.top, currentLeft: chart.left,
                currentRowIdx: currentRowIdx, currentColIdx: currentColIdx, currentHeight: chart.height,
                currentWidth: chart.width, id: chart.id, requestType: 'chartRefreshOnFilter'
            };
            this.parent.notify(refreshChartCellObj, eventArgs);
        }
    };
    SpreadsheetChart.prototype.refreshChartCellObj = function (args) {
        var sheetIndex = isUndefined(args.sheetIdx) ? this.parent.activeSheetIndex : args.sheetIdx;
        var sheet = getSheet(this.parent, sheetIndex);
        var prevCellObj = getCell(args.prevRowIdx, args.prevColIdx, sheet);
        var currCellObj = getCell(args.currentRowIdx, args.currentColIdx, sheet);
        var prevCellChart = prevCellObj ? prevCellObj.chart : [];
        var prevChartObj;
        var currChartObj;
        var prevCellChartLen = (prevCellChart && prevCellChart.length) ? prevCellChart.length : 0;
        if (prevCellChartLen) {
            for (var i = 0; i < prevCellChartLen; i++) {
                if (prevCellChart[i].id === args.id.split('_overlay')[0]) {
                    prevChartObj = prevCellChart[i];
                    prevChartObj.height = args.currentHeight;
                    prevChartObj.width = args.currentWidth;
                    prevChartObj.top = args.currentTop;
                    prevChartObj.left = args.currentLeft;
                    prevCellChart.splice(i, 1);
                    i--;
                    prevCellChartLen--;
                    for (var idx = 0, chartCollLen = this.parent.chartColl.length; idx < chartCollLen; idx++) {
                        if (prevChartObj.id === this.parent.chartColl[idx].id) {
                            prevChartObj.height = args.currentHeight;
                            this.parent.chartColl[idx].width = args.currentWidth;
                            this.parent.chartColl[idx].top = args.currentTop;
                            this.parent.chartColl[idx].left = args.currentLeft;
                        }
                    }
                }
            }
            if (currCellObj && currCellObj.chart) {
                currChartObj = currCellObj.chart;
                if (prevChartObj) {
                    currChartObj.push(prevChartObj);
                }
            }
            if (currChartObj) {
                setCell(args.currentRowIdx, args.currentColIdx, sheet, { chart: currChartObj }, true);
            }
            else {
                setCell(args.currentRowIdx, args.currentColIdx, sheet, { chart: [prevChartObj] }, true);
            }
            if (args.requestType === 'chartRefresh' && !args.isUndoRedo) {
                var eventArgs = {
                    requestType: 'chartRefresh', currentRowIdx: args.currentRowIdx, currentColIdx: args.currentColIdx,
                    currentWidth: args.currentWidth, prevHeight: args.prevHeight, prevWidth: args.prevWidth,
                    prevRowIdx: args.prevRowIdx, prevColIdx: args.prevColIdx, prevTop: args.prevTop, prevLeft: args.prevLeft,
                    currentTop: args.currentTop, currentLeft: args.currentLeft, currentHeight: args.currentHeight,
                    id: args.id, sheetIdx: sheetIndex
                };
                this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'chartRefresh' });
            }
        }
    };
    SpreadsheetChart.prototype.processChartRange = function (range, dataSheetIdx, opt) {
        var _this = this;
        var xRange;
        var yRange;
        var lRange;
        var minr = range[0];
        var minc = range[1];
        var isStringSeries = false;
        var maxr = range[2];
        var maxc = range[3];
        var isSingleRow = minr === maxr;
        var isSingleCol = minc === maxc;
        var isDateTimeFormat;
        var isDateTime;
        var sheet = getSheet(this.parent, dataSheetIdx);
        var autoDetectFormatFn = getAutoDetectFormatParser(this.parent);
        var getPropertyValue = function (rIdx, cIdx, isFirstCol, checkDateTime) {
            var cell = getCell(rIdx, cIdx, sheet);
            if (cell) {
                if (cell.formula && isNullOrUndefined(cell.value)) {
                    _this.parent.notify(calculateFormula, { cell: cell, rowIdx: rIdx, colIdx: cIdx, sheetIndex: dataSheetIdx });
                }
                var value = void 0;
                if (cell.format) {
                    var formatObj = { value: cell.value, format: cell.format, formattedText: cell.value, cell: cell,
                        rowIndex: rIdx, colIndex: cIdx };
                    _this.parent.notify(getFormattedCellObject, formatObj);
                    var isNum = isNumber(cell.value);
                    if (isNum && !isCustomDateTime(cell.format, true, null, true)) {
                        value = Number(cell.value);
                    }
                    else {
                        if (checkDateTime && isNum) {
                            isDateTimeFormat = true;
                        }
                        else if (isFirstCol && isNum) {
                            isDateTime = true;
                        }
                        value = formatObj.formattedText && formatObj.formattedText.toString();
                    }
                }
                else {
                    autoDetectFormatFn(cell);
                    value = cell.value;
                }
                return isNullOrUndefined(value) ? '' : value;
            }
            else {
                return '';
            }
        };
        var trVal = sheet ? getPropertyValue(minr, maxc, false, true) : '';
        var blVal = sheet ? getPropertyValue(maxr, minc, true) : '';
        var tlVal = sheet ? getPropertyValue(minr, minc, true) : '';
        if (!isNumber(blVal) || !tlVal) {
            isStringSeries = true;
        }
        if ((isNullOrUndefined(tlVal) || (opt.type === 'Scatter' && !opt.isSeriesInRows)) && !isSingleRow && !isSingleCol) {
            xRange = [minr + 1, minc, maxr, minc];
            yRange = [minr + 1, minc + 1, maxr, maxc];
            lRange = [minr, minc + 1, minr, maxc];
        }
        else if (!isNullOrUndefined(blVal) && isStringSeries && !isSingleRow && !isSingleCol && !isDateTimeFormat) {
            if (!isNullOrUndefined(trVal) && (!isNumber(trVal) || !tlVal)) {
                xRange = [minr + 1, minc, maxr, minc];
                yRange = [minr + 1, minc + 1, maxr, maxc];
                lRange = [minr, minc + 1, minr, maxc];
            }
            else {
                xRange = [minr, minc, maxr, minc];
                yRange = [minr, minc + 1, maxr, maxc];
            }
        }
        else {
            yRange = [minr, minc, maxr, maxc];
            if ((!isNullOrUndefined(trVal) && !isNumber(trVal) && !isDateTimeFormat)) {
                lRange = [minr, minc, minr, maxc];
                if (!isSingleRow) {
                    yRange[0] = yRange[0] + 1;
                }
            }
            else if ((isSingleRow || isSingleCol) && isNullOrUndefined(tlVal)) {
                lRange = [minr, minc, minr, maxc];
                if (isSingleRow) {
                    yRange[1] = yRange[1] + 1;
                    lRange[3] = lRange[1];
                }
                else {
                    yRange[0] = yRange[0] + 1;
                }
            }
        }
        return { xRange: xRange, yRange: yRange, lRange: lRange, isStringSeries: isStringSeries, isDateTime: isDateTime };
    };
    SpreadsheetChart.prototype.getRangeData = function (options) {
        var sheet = options.sheet;
        if (!options.range) {
            options.range = getRangeIndexes(sheet.selectedRange);
        }
        else if (typeof (options.range) === 'string') {
            options.range = getRangeIndexes(options.range);
        }
        var rangeData = [];
        var rObj;
        var cIdx;
        var formatArgs;
        var rIdx = options.range[0];
        var autoDetectFormatFn = options.isYvalue && getAutoDetectFormatParser(this.parent);
        while (rIdx <= options.range[2]) {
            if (isHiddenRow(sheet, rIdx)) {
                rIdx++;
                continue;
            }
            cIdx = options.range[1];
            while (cIdx <= options.range[3]) {
                if (isHiddenCol(sheet, cIdx)) {
                    cIdx++;
                    continue;
                }
                var cell = getCell(rIdx, cIdx, sheet, false, true);
                if (cell.formula && isNullOrUndefined(cell.value)) {
                    this.parent.notify(calculateFormula, { cell: cell, rowIdx: rIdx, colIdx: cIdx, sheetIndex: options.sheetIdx });
                }
                if (options.isYvalue) {
                    autoDetectFormatFn(cell);
                }
                rObj = { value: cell.value || (cell.value === 0 ? 0 : null) };
                if (cell.format) {
                    formatArgs = { formattedText: cell.value, value: cell.value, format: cell.format, cell: cell, skipFormatCheck: true };
                    this.parent.notify(getFormattedCellObject, formatArgs);
                    if (options.isYvalue) {
                        if (isNumber(cell.value)) {
                            rObj.value = Number(cell.value);
                            rObj.displayText = formatArgs.formattedText ? formatArgs.formattedText.toString() : '';
                        }
                        else {
                            rObj.displayText = rObj.value === null ? '' : this.parent.getDisplayText({ format: cell.format, value: '0' });
                            rObj.value = 0;
                        }
                    }
                    else {
                        if (options.isScatter && !options.isDateTime && isNumber(cell.value)) {
                            rObj.value = Number(cell.value);
                        }
                        else {
                            rObj.value = formatArgs.formattedText ? formatArgs.formattedText.toString() : null;
                        }
                    }
                }
                else if (options.isYvalue) {
                    if (isNumber(rObj.value)) {
                        rObj.displayText = rObj.value.toString();
                        rObj.value = Number(rObj.value);
                    }
                    else {
                        rObj.displayText = rObj.value === null ? '' : '0';
                        rObj.value = 0;
                    }
                }
                rangeData.push(rObj);
                cIdx++;
            }
            rIdx++;
        }
        return rangeData;
    };
    SpreadsheetChart.prototype.toArrayData = function (args) {
        var prop = 'value';
        var obj;
        var i = 0;
        var temp = [];
        var len = args.length;
        while (i < len) {
            obj = args[i];
            if (Object.keys(obj).length) {
                if (prop in obj) {
                    temp.push(obj["" + prop]);
                }
            }
            else {
                temp.push('');
            }
            i++;
        }
        return temp;
    };
    SpreadsheetChart.prototype.getVirtualXValues = function (limit) {
        var i = 1;
        var arr = [];
        while (i < limit) {
            arr.push(i.toString());
            i++;
        }
        return arr;
    };
    SpreadsheetChart.prototype.processChartSeries = function (options, sheetIndex, xRange, yRange, lRange, isDateTime) {
        options = options || {};
        var seriesName;
        var dataLabel = { name: 'displayText' };
        var xValue;
        var lValue;
        var diff;
        var pArr;
        var pObj = {};
        var j;
        var i = 0;
        var yInc = 0;
        var isPrint = this.parent.isPrintingProcessing;
        var sArr = [];
        sheetIndex = isNullOrUndefined(sheetIndex) ? this.parent.activeSheetIndex : sheetIndex;
        var sheet = getSheet(this.parent, sheetIndex);
        var isScatter = options && options.type === 'Scatter';
        var yValue = this.getRangeData({ range: yRange, sheet: sheet, isYvalue: true, sheetIdx: sheetIndex });
        var rDiff = ((yRange[2] - yRange[0]) + 1) - this.parent.hiddenCount(yRange[0], yRange[2], 'rows', sheet);
        var cDiff = ((yRange[3] - yRange[1]) + 1) - this.parent.hiddenCount(yRange[1], yRange[3], 'columns', sheet);
        if (options.isSeriesInRows) {
            xValue = lRange ? this.toArrayData(this.getRangeData({ range: lRange, sheet: sheet, isScatter: isScatter,
                isDateTime: isDateTime })) : this.getVirtualXValues(cDiff + 1);
            if (xRange) {
                lValue = this.toArrayData(this.getRangeData({ range: xRange, sheet: sheet }));
            }
            diff = rDiff;
        }
        else {
            xValue = xRange ? this.toArrayData(this.getRangeData({ range: xRange, sheet: sheet, isScatter: isScatter,
                isDateTime: isDateTime })) : this.getVirtualXValues(rDiff + 1);
            if (lRange) {
                lValue = this.toArrayData(this.getRangeData({ range: lRange, sheet: sheet }));
            }
            diff = cDiff;
        }
        var len = xValue.length;
        var inc = options.isSeriesInRows ? 1 : diff;
        if (!isNullOrUndefined(options.dataLabelSettings)) {
            dataLabel.visible = options.dataLabelSettings.visible;
            dataLabel.position = options.dataLabelSettings.position;
        }
        while (i < diff) {
            j = 0;
            pArr = [];
            yInc = options.isSeriesInRows ? yInc : i;
            while (j < len) {
                if (isNullOrUndefined(xValue[j])) {
                    xValue[j] = getUniqueID('spread-chart-empty-label-');
                }
                pArr.push({ x: xValue[j], y: yValue[yInc].value, displayText: yValue[yInc].displayText });
                yInc += inc;
                j++;
            }
            if (lValue && lValue.length > 0) {
                seriesName = lValue[i];
            }
            else {
                seriesName = options.type === 'Scatter' ? ('series' + (i + 1)) : ('series' + i);
            }
            seriesName = isNullOrUndefined(seriesName) ? '' : seriesName.toString();
            if (options.type) {
                var type = options.type;
                if (type === 'Line' || type === 'StackingLine' || type === 'StackingLine100') {
                    pObj = {
                        dataSource: pArr, type: options.type, xName: 'x', yName: 'y', name: seriesName,
                        animation: { enable: !isPrint }, tooltipMappingName: 'displayText',
                        marker: options.markerSettings ? { visible: options.markerSettings.visible, width: options.markerSettings.size,
                            height: options.markerSettings.size, shape: options.markerSettings.shape, dataLabel: dataLabel,
                            isFilled: options.markerSettings.isFilled, border: options.markerSettings.border,
                            fill: options.markerSettings.isFilled ? options.markerSettings.fill : null } : { dataLabel: dataLabel }
                    };
                }
                else if (type === 'Scatter') {
                    pObj = {
                        dataSource: pArr, type: options.type, xName: 'x', yName: 'y', name: seriesName,
                        tooltipMappingName: 'displayText', animation: { enable: !isPrint },
                        marker: { visible: false, width: 12, height: 12, shape: 'Circle', dataLabel: dataLabel }
                    };
                }
                else if (type === 'Pie' || type === 'Doughnut') {
                    pObj = {
                        dataSource: pArr, radius: '100%', xName: 'x', yName: 'y', innerRadius: options.type === 'Pie' ? '0%' : '40%',
                        dataLabel: { visible: !!dataLabel.visible, position: dataLabel.position === 'Outer' ? 'Outside' : 'Inside',
                            name: 'displayText', font: { fontWeight: '600' } },
                        animation: { enable: !isPrint }, tooltipMappingName: 'displayText'
                    };
                }
                else {
                    pObj = {
                        dataSource: pArr, type: options.type, xName: 'x', yName: 'y', animation: { enable: !isPrint },
                        name: seriesName, marker: { dataLabel: dataLabel }, tooltipMappingName: 'displayText'
                    };
                }
            }
            sArr.push(pObj);
            i++;
        }
        var retVal;
        if (options.type) {
            retVal = {
                series: sArr, xRange: options.isSeriesInRows ? lRange : xRange,
                yRange: yRange, lRange: options.isSeriesInRows ? xRange : lRange
            };
        }
        return retVal;
    };
    SpreadsheetChart.prototype.getAxisFormat = function (yRange) {
        var format = '';
        if (!isNullOrUndefined(yRange)) {
            var cell = getCell(yRange[0], yRange[1], this.parent.getActiveSheet());
            if (cell && cell.format) {
                format = cell.format;
            }
        }
        return format;
    };
    SpreadsheetChart.prototype.focusChartRange = function (xRange, yRange, lRange) {
        var border = ['e-rcborderright', 'e-rcborderbottom', 'e-vcborderright', 'e-vcborderbottom', 'e-bcborderright', 'e-bcborderbottom'];
        this.clearBorder();
        var range;
        var sheet = this.parent.getActiveSheet();
        var isFreezePane = !!(sheet.frozenRows || sheet.frozenColumns);
        if (lRange) {
            if (isFreezePane) {
                range = lRange;
            }
            else {
                this.parent.notify(focusBorder, {
                    startcell: { rowIndex: lRange[0], colIndex: lRange[1] },
                    endcell: { rowIndex: lRange[2], colIndex: lRange[3] }, classes: [border[0], border[1]]
                });
            }
        }
        if (xRange) {
            if (isFreezePane) {
                if (range) {
                    range[0] = Math.min(lRange[0], xRange[0]);
                    range[1] = Math.min(lRange[1], xRange[1]);
                    range[2] = Math.max(lRange[2], xRange[2]);
                    range[3] = Math.max(lRange[3], xRange[3]);
                }
                else {
                    range = xRange;
                }
            }
            else {
                this.parent.notify(focusBorder, {
                    startcell: { rowIndex: xRange[0], colIndex: xRange[1] },
                    endcell: { rowIndex: xRange[2], colIndex: xRange[3] }, classes: [border[2], border[3]]
                });
            }
        }
        if (isFreezePane && range) {
            this.parent.notify(focusBorder, {
                startcell: { rowIndex: Math.min(range[0], yRange[0]), colIndex: Math.min(range[1], yRange[1]) },
                endcell: {
                    rowIndex: Math.max(range[2], yRange[2]), colIndex: Math.max(range[3], yRange[3])
                }, classes: [border[4], border[5]]
            });
        }
        else {
            this.parent.notify(focusBorder, {
                startcell: { rowIndex: yRange[0], colIndex: yRange[1] },
                endcell: { rowIndex: yRange[2], colIndex: yRange[3] }, classes: [border[4], border[5]]
            });
        }
    };
    SpreadsheetChart.prototype.clearBorder = function () {
        var sheet = this.parent.getActiveSheet();
        if (sheet.frozenColumns || sheet.frozenRows) {
            var chartIndicator = [].slice.call(this.parent.element.getElementsByClassName('e-chart-range'));
            chartIndicator.forEach(function (indicator) { detach(indicator); });
            return;
        }
        var mainCont = this.parent.getMainContent();
        var border = ['e-rcborderright', 'e-rcborderbottom', 'e-vcborderright', 'e-vcborderbottom', 'e-bcborderright', 'e-bcborderbottom'];
        for (var borderIdx = 0, borderLen = border.length; borderIdx < borderLen; borderIdx++) {
            var eleColl = mainCont.querySelectorAll('.' + border[borderIdx]);
            for (var tdIdx = 0, eleCollLen = eleColl.length; tdIdx < eleCollLen; tdIdx++) {
                var td = eleColl[tdIdx];
                td.classList.remove(border[borderIdx]);
            }
        }
    };
    SpreadsheetChart.prototype.initiateChartHandler = function (argsOpt) {
        var _this = this;
        var chart = argsOpt.option;
        var isRangeSelect = true;
        isRangeSelect = isNullOrUndefined(argsOpt.isInitCell) ? true : !argsOpt.isInitCell;
        argsOpt.triggerEvent = isNullOrUndefined(argsOpt.triggerEvent) ? true : argsOpt.triggerEvent;
        var seriesModel;
        argsOpt.isRefresh = isNullOrUndefined(argsOpt.isRefresh) ? false : argsOpt.isRefresh;
        var sheetIdx = (chart.range && chart.range.lastIndexOf('!') > 0) ?
            getSheetIndex(this.parent, chart.range.substring(0, chart.range.lastIndexOf('!'))) : this.parent.activeSheetIndex;
        var sheet = getSheet(this.parent, sheetIdx);
        var range = chart.range ? chart.range : this.parent.getActiveSheet().selectedRange;
        var rangeIdx = getRangeIndexes(range);
        var options = {};
        var isRowLesser;
        var eventArgs;
        if (!this.parent.allowChart && sheet.isProtected) {
            return seriesModel;
        }
        var args = {
            sheetIndex: sheetIdx, reqType: 'shape', type: 'actionBegin', shapeType: 'chart',
            action: 'create', options: chart, range: range, operation: 'create'
        };
        options = args.options;
        range = args.range;
        options = options || {};
        if (rangeIdx.length > 0 && !argsOpt.isRefresh && isRangeSelect) {
            var rDiff = rangeIdx[2] - rangeIdx[0];
            var cDiff = rangeIdx[3] - rangeIdx[1];
            if (rDiff < cDiff) {
                isRowLesser = true;
            }
        }
        options.isSeriesInRows = isRowLesser ? true : options.isSeriesInRows ? options.isSeriesInRows : false;
        argsOpt.dataSheetIdx = isNullOrUndefined(argsOpt.dataSheetIdx) ? sheetIdx : argsOpt.dataSheetIdx;
        var chartRange = this.processChartRange(rangeIdx, argsOpt.dataSheetIdx, options);
        var xRange = chartRange.xRange;
        var yRange = chartRange.yRange;
        var lRange = chartRange.lRange;
        if (sheetIdx === this.parent.activeSheetIndex && isRangeSelect) {
            this.focusChartRange(xRange, yRange, lRange);
        }
        if (argsOpt.triggerEvent && !argsOpt.isRefresh) {
            eventArgs = {
                type: chart.type, theme: chart.theme, isSeriesInRows: chart.isSeriesInRows, range: chart.range,
                markerSettings: options.markerSettings, dataLabelSettings: options.dataLabelSettings, title: options.title,
                legendSettings: options.legendSettings, primaryXAxis: options.primaryXAxis, primaryYAxis: options.primaryYAxis,
                id: chart.id, height: chart.height, width: chart.width, posRange: argsOpt.range, isInitCell: argsOpt.isInitCell,
                cancel: false, top: chart.top, left: chart.left
            };
            this.parent.notify(beginAction, { eventArgs: eventArgs, action: 'beforeInsertChart' });
            if (eventArgs.cancel) {
                return [];
            }
            chart.type = eventArgs.type;
            chart.theme = eventArgs.theme;
            chart.isSeriesInRows = eventArgs.isSeriesInRows;
            chart.markerSettings = eventArgs.markerSettings;
            chart.range = eventArgs.range;
            chart.id = eventArgs.id;
            chart.height = eventArgs.height;
            chart.width = eventArgs.width;
        }
        var chartOptions = this.processChartSeries(options, argsOpt.dataSheetIdx, xRange, yRange, lRange, chartRange.isDateTime);
        var primaryXAxis = {
            majorGridLines: chart.primaryXAxis && chart.primaryXAxis.majorGridLines &&
                !isNullOrUndefined(chart.primaryXAxis.majorGridLines.width) ?
                { width: chart.primaryXAxis.majorGridLines.width } : { width: 0 },
            minorGridLines: chart.primaryXAxis && chart.primaryXAxis.minorGridLines &&
                !isNullOrUndefined(chart.primaryXAxis.minorGridLines.width) ?
                { width: chart.primaryXAxis.minorGridLines.width } : { width: 0 },
            minorTicksPerInterval: chart.primaryXAxis && chart.primaryXAxis.minorGridLines && chart.primaryXAxis.minorGridLines.width > 0 ?
                5 : 0,
            lineStyle: { width: 0 },
            valueType: chart.type === 'Scatter' && !chartRange.isStringSeries && !chart.isSeriesInRows ? 'Double' : 'Category',
            rangePadding: chart.type === 'Scatter' && !chartRange.isStringSeries && !chart.isSeriesInRows ? 'Round' : 'Auto',
            visible: chart.primaryXAxis ? chart.primaryXAxis.visible : true,
            title: chart.primaryXAxis ? chart.primaryXAxis.title : '',
            edgeLabelPlacement: 'Shift'
        };
        var primaryYAxis = {
            lineStyle: { width: 0 },
            majorGridLines: chart.primaryYAxis && chart.primaryYAxis.majorGridLines &&
                !isNullOrUndefined(chart.primaryYAxis.majorGridLines.width) ?
                { width: chart.primaryYAxis.majorGridLines.width } : { width: 1 },
            minorGridLines: chart.primaryYAxis && chart.primaryYAxis.minorGridLines &&
                !isNullOrUndefined(chart.primaryYAxis.minorGridLines.width) ?
                { width: chart.primaryYAxis.minorGridLines.width } : { width: 0 },
            minorTicksPerInterval: chart.primaryYAxis && chart.primaryYAxis.minorGridLines && chart.primaryYAxis.minorGridLines.width > 0 ?
                5 : 0,
            visible: chart.primaryYAxis ? chart.primaryYAxis.visible : true,
            title: chart.primaryYAxis ? chart.primaryYAxis.title : '',
            edgeLabelPlacement: 'Shift'
        };
        if (argsOpt.isRefresh) {
            if (argsOpt.isSwitchRowColumn && chart.type === 'Scatter') {
                var chartObj = this.parent.element.querySelector('.' + chart.id);
                if (chartObj) {
                    var chartComp = getComponent(chartObj, 'chart');
                    chartComp.primaryXAxis.valueType = !chartRange.isStringSeries && !chart.isSeriesInRows ? 'Double' : 'Category';
                }
            }
            return chartOptions.series;
        }
        var id = chart.id + '_overlay';
        var overlayObj = this.parent.serviceLocator.getService(overlay);
        var eleRange = !isNullOrUndefined(argsOpt.isInitCell) && argsOpt.isInitCell ? argsOpt.range : range;
        var overlayProps = overlayObj.insertOverlayElement(id, eleRange, argsOpt.isChangeChartType ?
            this.parent.activeSheetIndex : getSheetIndexFromAddress(this.parent, eleRange));
        overlayProps.element.classList.add('e-datavisualization-chart');
        overlayProps.element.style.width = chart.width + 'px';
        overlayProps.element.style.height = chart.height + 'px';
        if (sheet && (sheet.frozenRows || sheet.frozenColumns)) {
            overlayObj.adjustFreezePaneSize(chart, overlayProps.element, eleRange);
        }
        else {
            if (isNullOrUndefined(chart.top)) {
                chart.top = overlayProps.top;
            }
            else {
                overlayProps.element.style.top = Number(addDPRValue(chart.top).toFixed(2)) + 'px';
            }
            if (isNullOrUndefined(chart.left)) {
                chart.left = overlayProps.left;
            }
            else {
                overlayProps.element.style.left = Number(addDPRValue(chart.left).toFixed(2)) + 'px';
            }
        }
        this.parent.notify(overlayEleSize, { height: chart.height, width: chart.width });
        var legendSettings = (chart.type === 'Pie' || chart.type === 'Doughnut') ? { position: 'Bottom', visible: true } : {};
        if (!isNullOrUndefined(chart.legendSettings)) {
            legendSettings.visible = chart.legendSettings.visible;
            legendSettings.position = chart.legendSettings.position;
        }
        var chartContent = this.parent.createElement('div', {
            id: chart.id, className: chart.id
        });
        var theme = chart.theme || 'Material';
        var primaryYAxisFormat = this.getAxisFormat(yRange);
        var primaryXAxisFormat = this.getAxisFormat(xRange);
        var borderWidth = Math.round(parseFloat(getComputedStyle(overlayProps.element).borderWidth)) * 2;
        var height = (parseFloat(overlayProps.element.style.height) - (isNaN(borderWidth) ? 0 : borderWidth)) + 'px';
        if (chart.type !== 'Pie' && chart.type !== 'Doughnut') {
            this.chart = new Chart({
                primaryXAxis: primaryXAxis,
                primaryYAxis: primaryYAxis,
                background: this.getThemeBgColor(theme),
                chartArea: { border: { width: 0 } },
                title: chart.title,
                legendSettings: legendSettings,
                theme: theme,
                series: chartOptions.series,
                tooltip: { enable: true, format: '${point.x} : <b>${point.tooltip}</b>' },
                width: overlayProps.element.style.width,
                height: height,
                enableRtl: this.parent.enableRtl,
                load: function (args) {
                    args.chart.theme = chart.theme || 'Material';
                },
                beforeResize: function (args) {
                    args.cancelResizedEvent = true; // This is for cancel the resized event.
                },
                axisLabelRender: function (args) {
                    if (args.axis.name === 'primaryYAxis' && primaryYAxisFormat && !chart.type.includes('100') &&
                        !isNullOrUndefined(args.value) && _this.parent) {
                        args.text = _this.parent.getDisplayText({ format: primaryYAxisFormat, value: args.value.toString() });
                    }
                    else if (args.axis.name === 'primaryXAxis' && args.text.startsWith('spread-chart-empty-label-')) {
                        args.text = '';
                    }
                    if (args.axis.name === 'primaryXAxis' && chart.type === 'Scatter' && !chartRange.isDateTime) {
                        if (args.axis.labels.length > 0 && !isNumber(args.text)) {
                            args.text = (args.axis.labels.indexOf(args.text) + 1).toString();
                        }
                        else if (primaryXAxisFormat && !isNullOrUndefined(args.value)) {
                            args.text = _this.parent.getDisplayText({ format: primaryXAxisFormat, value: args.value.toString() });
                        }
                    }
                }
            });
            this.chart.appendTo(chartContent);
        }
        else {
            this.chart = new AccumulationChart({
                title: chart.title,
                legendSettings: legendSettings,
                theme: theme,
                background: this.getThemeBgColor(theme),
                series: chartOptions.series,
                width: overlayProps.element.style.width,
                height: height,
                center: { x: '50%', y: '50%' },
                tooltip: { enable: true, format: '${point.x} : <b>${point.tooltip}</b>' },
                enableSmartLabels: true,
                enableAnimation: true,
                enableRtl: this.parent.enableRtl,
                load: function (args) {
                    args.chart.theme = chart.theme || 'Material';
                },
                beforeResize: function (args) {
                    args.cancelResizedEvent = true; // This is for cancel the resized event.
                }
            });
            this.chart.appendTo(chartContent);
        }
        overlayProps.element.appendChild(chartContent);
        if (overlayProps.element.classList.contains('e-ss-overlay-active') && !this.parent.isPrintingProcessing) {
            this.parent.notify(insertDesignChart, { id: overlayProps.element.id });
        }
        if (argsOpt.triggerEvent) {
            this.parent.notify(completeAction, { eventArgs: eventArgs, action: 'insertChart' });
        }
        return seriesModel;
    };
    SpreadsheetChart.prototype.deleteChart = function (args) {
        this.clearBorder();
        var chartElements = null;
        var sheet = this.parent.getActiveSheet();
        if (isNullOrUndefined(args.id)) {
            chartElements = document.querySelector('.e-datavisualization-chart.e-ss-overlay-active');
            args.id = chartElements ? chartElements.getElementsByClassName('e-control')[0].id : null;
        }
        else {
            args.id = args.id.includes('overlay') ? args.id : args.id + '_overlay';
            chartElements = document.getElementById(args.id);
        }
        if (isNullOrUndefined(args.id)) {
            return;
        }
        else {
            args.id = args.id.includes('overlay') ? args.id : args.id + '_overlay';
        }
        var rowIdx;
        var colIdx;
        var prevCellChart;
        var isRemoveEle = false;
        var chartObj;
        for (var i = 0, chartCollLen = this.parent.chartColl.length; i < chartCollLen; i++) {
            if (this.parent.chartColl[i].id === args.id.split('_overlay')[0]) {
                chartObj = this.parent.chartColl[i];
                break;
            }
        }
        var eventArgs = {
            id: chartObj.id, range: chartObj.range, type: chartObj.type, markerSettings: chartObj.markerSettings,
            dataLabelSettings: chartObj.dataLabelSettings, title: chartObj.title, legendSettings: chartObj.legendSettings,
            primaryXAxis: chartObj.primaryXAxis, primaryYAxis: chartObj.primaryYAxis, theme: chartObj.theme,
            height: chartObj.height, width: chartObj.width, isSeriesInRows: chartObj.isSeriesInRows,
            isInitCell: true, posRange: null, top: chartObj.top, left: chartObj.left, cancel: false
        };
        if (chartElements) {
            var chartTop = void 0;
            var chartleft = void 0;
            if (sheet.frozenRows || sheet.frozenColumns) {
                var clientRect = chartElements.getBoundingClientRect();
                chartTop = { clientY: clientRect.top };
                chartleft = { clientX: clientRect.left };
                if (clientRect.top < this.parent.getColumnHeaderContent().getBoundingClientRect().bottom) {
                    chartTop.target = this.parent.getColumnHeaderContent();
                }
                if (clientRect.left < this.parent.getRowHeaderContent().getBoundingClientRect().right) {
                    chartleft.target = this.parent.getRowHeaderTable();
                }
            }
            else {
                chartTop = { clientY: parseFloat(chartElements.style.top), isImage: true };
                chartleft = { clientX: parseFloat(chartElements.style.left), isImage: true };
            }
            this.parent.notify(deleteChartColl, { id: args.id });
            this.parent.notify(getRowIdxFromClientY, chartTop);
            this.parent.notify(getColIdxFromClientX, chartleft);
            isRemoveEle = true;
            rowIdx = chartTop.clientY;
            colIdx = chartleft.clientX;
            sheet = this.parent.sheets[this.parent.activeSheetIndex];
        }
        else {
            this.parent.notify(deleteChartColl, { id: args.id });
            var lastIndex = args.range ? args.range.lastIndexOf('!') : 0;
            var sheetIndex = args.range && lastIndex > 0 ?
                getSheetIndex(this.parent, args.range.substring(0, lastIndex)) : this.parent.activeSheetIndex;
            var rangeVal = args.range ? lastIndex > 0 ? args.range.substring(lastIndex + 1) : args.range :
                this.parent.getActiveSheet().selectedRange;
            var index = getRangeIndexes(rangeVal);
            rowIdx = index[0];
            colIdx = index[1];
            sheet = this.parent.sheets[sheetIndex];
        }
        var cellObj = getCell(rowIdx, colIdx, sheet);
        if (cellObj) {
            prevCellChart = cellObj.chart;
        }
        var chartLength = prevCellChart ? prevCellChart.length : null;
        for (var i = 0; i < chartLength; i++) {
            if (args.id === prevCellChart[i].id + '_overlay') {
                prevCellChart.splice(i, 1);
                chartLength = prevCellChart.length;
            }
        }
        if (isRemoveEle) {
            document.getElementById(args.id).remove();
            this.parent.notify(removeDesignChart, {});
        }
        setCell(rowIdx, colIdx, sheet, { chart: prevCellChart }, true);
        eventArgs.posRange = sheet.name + '!' + getCellAddress(rowIdx, colIdx);
        if (!args.isUndoRedo) {
            this.parent.notify(completeAction, { eventArgs: eventArgs, action: 'deleteChart', isClearAction: args.clearAction });
        }
    };
    SpreadsheetChart.prototype.updateChartModel = function (eleId, chartComp, currCellObj, chartCollId, isAccumulationChart) {
        var accumulationChartComp = chartComp;
        chartComp = chartComp;
        var chartId = this.parent.chartColl[chartCollId].id;
        if (isAccumulationChart &&
            ['PHAxes', 'PVAxes', 'PHAxisTitle', 'PVAxisTitle', 'GLMajorHorizontal',
                'GLMajorVertical', 'GLMinorHorizontal', 'GLMinorVertical'].indexOf(eleId) > -1) {
            return;
        }
        for (var idx = 0, chartsCount = currCellObj.chart.length; idx < chartsCount; idx++) {
            if (currCellObj.chart[idx].id === chartId) {
                switch (eleId) {
                    case 'PHAxes':
                    case 'PHAxisTitle':
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryXAxis)) {
                            currCellObj.chart[idx].primaryXAxis = {};
                            this.parent.chartColl[chartCollId].primaryXAxis = {};
                        }
                        if (eleId === 'PHAxes') {
                            currCellObj.chart[idx].primaryXAxis.visible = chartComp.primaryXAxis.visible;
                            this.parent.chartColl[chartCollId].primaryXAxis.visible = chartComp.primaryXAxis.visible;
                        }
                        else if (eleId === 'PHAxisTitle') {
                            currCellObj.chart[idx].primaryXAxis.title = chartComp.primaryXAxis.title;
                            this.parent.chartColl[chartCollId].primaryXAxis.title = chartComp.primaryXAxis.title;
                        }
                        break;
                    case 'PVAxes':
                    case 'PVAxisTitle':
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryYAxis)) {
                            currCellObj.chart[idx].primaryYAxis = {};
                            this.parent.chartColl[chartCollId].primaryYAxis = {};
                        }
                        if (eleId === 'PVAxes') {
                            currCellObj.chart[idx].primaryYAxis.visible = chartComp.primaryYAxis.visible;
                            this.parent.chartColl[chartCollId].primaryYAxis.visible = chartComp.primaryYAxis.visible;
                        }
                        else if (eleId === 'PVAxisTitle') {
                            currCellObj.chart[idx].primaryYAxis.title = chartComp.primaryYAxis.title;
                            this.parent.chartColl[chartCollId].primaryYAxis.title = chartComp.primaryYAxis.title;
                        }
                        break;
                    case 'ChartTitleNone':
                    case 'ChartTitleAbove':
                        currCellObj.chart[idx].title = chartComp.title;
                        this.parent.chartColl[chartCollId].title = chartComp.title;
                        break;
                    case 'DLNone':
                    case 'DLCenter':
                    case 'DLInsideend':
                    case 'DLInsidebase':
                    case 'DLOutsideend':
                        if (isNullOrUndefined(currCellObj.chart[idx].dataLabelSettings)) {
                            currCellObj.chart[idx].dataLabelSettings = {};
                            this.parent.chartColl[chartCollId].dataLabelSettings = {};
                        }
                        if (eleId === 'DLNone') {
                            currCellObj.chart[idx].dataLabelSettings.visible = false;
                            this.parent.chartColl[chartCollId].dataLabelSettings.visible = false;
                        }
                        else {
                            currCellObj.chart[idx].dataLabelSettings.visible = true;
                            this.parent.chartColl[chartCollId].dataLabelSettings.visible = true;
                            var position = void 0;
                            if (isAccumulationChart) {
                                position = accumulationChartComp.series[0].dataLabel.position === 'Outside' ? 'Outer' : 'Middle';
                            }
                            else {
                                position = chartComp.series[0].marker.dataLabel.position;
                            }
                            currCellObj.chart[idx].dataLabelSettings.position = position;
                            this.parent.chartColl[chartCollId].dataLabelSettings.position = position;
                        }
                        break;
                    case 'GLMajorHorizontal':
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryYAxis)) {
                            currCellObj.chart[idx].primaryYAxis = {};
                            this.parent.chartColl[chartCollId].primaryYAxis = {};
                        }
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryYAxis.majorGridLines)) {
                            currCellObj.chart[idx].primaryYAxis.majorGridLines = {};
                            this.parent.chartColl[chartCollId].primaryYAxis.majorGridLines = {};
                        }
                        currCellObj.chart[idx].primaryYAxis.majorGridLines.width = chartComp.primaryYAxis.majorGridLines.width;
                        this.parent.chartColl[chartCollId].primaryYAxis.majorGridLines.width =
                            chartComp.primaryYAxis.majorGridLines.width;
                        break;
                    case 'GLMajorVertical':
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryXAxis)) {
                            currCellObj.chart[idx].primaryXAxis = {};
                            this.parent.chartColl[chartCollId].primaryXAxis = {};
                        }
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryXAxis.majorGridLines)) {
                            currCellObj.chart[idx].primaryXAxis.majorGridLines = {};
                            this.parent.chartColl[chartCollId].primaryXAxis.majorGridLines = {};
                        }
                        currCellObj.chart[idx].primaryXAxis.majorGridLines.width = chartComp.primaryXAxis.majorGridLines.width;
                        this.parent.chartColl[chartCollId].primaryXAxis.majorGridLines.width =
                            chartComp.primaryXAxis.majorGridLines.width;
                        break;
                    case 'GLMinorHorizontal':
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryYAxis)) {
                            currCellObj.chart[idx].primaryYAxis = {};
                            this.parent.chartColl[chartCollId].primaryYAxis = {};
                        }
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryYAxis.minorGridLines)) {
                            currCellObj.chart[idx].primaryYAxis.minorGridLines = {};
                            this.parent.chartColl[chartCollId].primaryYAxis.minorGridLines = {};
                        }
                        currCellObj.chart[idx].primaryYAxis.minorGridLines.width = chartComp.primaryYAxis.minorGridLines.width;
                        this.parent.chartColl[chartCollId].primaryYAxis.minorGridLines.width =
                            chartComp.primaryYAxis.minorGridLines.width;
                        break;
                    case 'GLMinorVertical':
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryXAxis)) {
                            currCellObj.chart[idx].primaryXAxis = {};
                            this.parent.chartColl[chartCollId].primaryXAxis = {};
                        }
                        if (isNullOrUndefined(currCellObj.chart[idx].primaryXAxis.minorGridLines)) {
                            currCellObj.chart[idx].primaryXAxis.minorGridLines = {};
                            this.parent.chartColl[chartCollId].primaryXAxis.minorGridLines = {};
                        }
                        currCellObj.chart[idx].primaryXAxis.minorGridLines.width = chartComp.primaryXAxis.minorGridLines.width;
                        this.parent.chartColl[chartCollId].primaryXAxis.minorGridLines.width =
                            chartComp.primaryXAxis.minorGridLines.width;
                        break;
                    case 'LegendNone':
                    case 'LegendsRight':
                    case 'LegendsLeft':
                    case 'LegendsBottom':
                    case 'LegendsTop':
                        if (isNullOrUndefined(currCellObj.chart[idx].legendSettings)) {
                            currCellObj.chart[idx].legendSettings = {};
                            this.parent.chartColl[chartCollId].legendSettings = {};
                        }
                        currCellObj.chart[idx].legendSettings.visible = chartComp.legendSettings.visible;
                        this.parent.chartColl[chartCollId].legendSettings.visible = chartComp.legendSettings.visible;
                        if (eleId !== 'LegendNone') {
                            currCellObj.chart[idx].legendSettings.position = chartComp.legendSettings.position;
                            this.parent.chartColl[chartCollId].legendSettings.position =
                                chartComp.legendSettings.position;
                            break;
                        }
                }
            }
        }
    };
    SpreadsheetChart.prototype.updateChartElement = function (value, chartComp, currCellObj, chartCollId, title, isAccumulationChart, address, triggerEvent) {
        if (isAccumulationChart &&
            ['PHAxes', 'PVAxes', 'PHAxisTitle', 'PVAxisTitle', 'GLMajorHorizontal',
                'GLMajorVertical', 'GLMinorHorizontal', 'GLMinorVertical'].indexOf(value) > -1) {
            return;
        }
        var chartSeries;
        switch (value) {
            case 'PHAxes':
                chartComp = chartComp;
                chartComp.primaryXAxis.visible = !chartComp.primaryXAxis.visible;
                break;
            case 'PVAxes':
                chartComp = chartComp;
                chartComp.primaryYAxis.visible = !chartComp.primaryYAxis.visible;
                break;
            case 'PHAxisTitle':
                chartComp = chartComp;
                chartComp.primaryXAxis.title = title;
                break;
            case 'PVAxisTitle':
                chartComp = chartComp;
                chartComp.primaryYAxis.title = title;
                break;
            case 'ChartTitleNone':
                chartComp.title = '';
                break;
            case 'ChartTitleAbove':
                chartComp.title = title;
                break;
            case 'DLNone':
            case 'DLCenter':
            case 'DLInsideend':
            case 'DLInsidebase':
            case 'DLOutsideend':
                chartComp = isAccumulationChart ? chartComp : chartComp;
                chartSeries = chartComp.series;
                if (value === 'DLNone') {
                    for (var idx = 0, len = chartSeries.length; idx < len; idx++) {
                        if (isAccumulationChart) {
                            chartSeries[idx].dataLabel.visible = false;
                        }
                        else {
                            chartSeries[idx].marker.dataLabel.visible = false;
                        }
                    }
                }
                else {
                    for (var idx = 0, len = chartSeries.length; idx < len; idx++) {
                        if (isAccumulationChart) {
                            var position = value === 'DLOutsideend' ? 'Outside' : 'Inside';
                            chartSeries[idx].dataLabel.visible = true;
                            chartSeries[idx].dataLabel.position = position;
                        }
                        else {
                            var position = value === 'DLCenter' ? 'Middle' : value === 'DLInsideend' ? 'Top' : value === 'DLInsidebase' ?
                                'Bottom' : value === 'DLOutsideend' ? 'Outer' : chartSeries[0].marker.dataLabel.position;
                            chartSeries[idx].marker.dataLabel.visible = true;
                            chartSeries[idx].marker.dataLabel.position = position;
                        }
                    }
                }
                chartComp.series = chartSeries;
                if (isAccumulationChart) {
                    chartComp.refresh();
                }
                break;
            case 'GLMajorHorizontal':
                chartComp = chartComp;
                chartComp.primaryYAxis.majorGridLines.width = chartComp.primaryYAxis.majorGridLines.width === 0 ? 1 : 0;
                break;
            case 'GLMajorVertical':
                chartComp = chartComp;
                chartComp.primaryXAxis.majorGridLines.width = chartComp.primaryXAxis.majorGridLines.width === 0 ? 1 : 0;
                break;
            case 'GLMinorHorizontal':
                chartComp = chartComp;
                chartComp.primaryYAxis.minorTicksPerInterval = chartComp.primaryYAxis.minorGridLines.width === 0 ? 5 : 0;
                chartComp.primaryYAxis.minorGridLines.width = chartComp.primaryYAxis.minorGridLines.width === 0 ? 1 : 0;
                break;
            case 'GLMinorVertical':
                chartComp = chartComp;
                chartComp.primaryXAxis.minorTicksPerInterval = chartComp.primaryXAxis.minorGridLines.width === 0 ? 5 : 0;
                chartComp.primaryXAxis.minorGridLines.width = chartComp.primaryXAxis.minorGridLines.width === 0 ? 1 : 0;
                break;
            case 'LegendNone':
                chartComp.legendSettings.visible = false;
                break;
            case 'LegendsRight':
            case 'LegendsLeft':
            case 'LegendsBottom':
            case 'LegendsTop':
                chartComp.legendSettings.visible = true;
                chartComp.legendSettings.position = value === 'LegendsRight' ? 'Right' : value === 'LegendsLeft' ? 'Left' : value ===
                    'LegendsBottom' ? 'Bottom' : value === 'LegendsTop' ? 'Top' : chartComp.legendSettings.position;
                break;
        }
        this.updateChartModel(value, chartComp, currCellObj, chartCollId, isAccumulationChart);
        if (triggerEvent) {
            var eventArgs = { addChartEle: value, id: chartComp.element.id + '_overlay', title: title, address: address };
            this.parent.notify(completeAction, { action: 'chartDesign', eventArgs: eventArgs });
        }
    };
    SpreadsheetChart.prototype.undoRedoForChartDesign = function (args) {
        var overlayElem = document.getElementById(args.id);
        if (!overlayElem) {
            return;
        }
        var chartElem = this.getChartElement(overlayElem);
        var chartComp = getComponent(chartElem, 'chart');
        if (isNullOrUndefined(chartComp)) {
            chartComp = getComponent(chartElem, 'accumulationchart');
        }
        var addressInfo = this.parent.getAddressInfo(args.address);
        var cell = getCell(addressInfo.indices[0], addressInfo.indices[1], getSheet(this.parent, addressInfo.sheetIndex));
        var chartCollectionId = this.getChartCollectionId(chartElem.id);
        var chart;
        var property = args.addChartEle;
        var title = args.title;
        for (var i = 0; i < args.beforeActionData.cellDetails[0].chart.length; i++) {
            if (chartElem.id === args.beforeActionData.cellDetails[0].chart[i].id) {
                chart = args.beforeActionData.cellDetails[0].chart[i];
                break;
            }
        }
        var isMarkerEnabled = isNullOrUndefined(chart.markerSettings) ? false : chart.markerSettings.visible;
        if (args.switchRowColumn) {
            this.switchRowColumn(chartCollectionId, chartElem.id, chartComp, cell);
        }
        else if (args.chartTheme) {
            this.switchChartTheme(chartCollectionId, chartElem.id, args.isUndo ? chart.theme : args.chartTheme, chartComp, cell);
        }
        else if (args.chartType) {
            this.switchChartType(chartCollectionId, chartElem.id, args.isUndo ? chart.type : args.chartType, chartComp, cell, false, args.isUndo ? isMarkerEnabled : args.chartMarker, 'undoRedo');
        }
        else if (args.addChartEle) {
            if (args.isUndo) {
                var position = void 0;
                switch (property) {
                    case 'DLNone':
                    case 'DLCenter':
                    case 'DLInsideend':
                    case 'DLInsidebase':
                    case 'DLOutsideend':
                        position = chart.dataLabelSettings && chart.dataLabelSettings.position;
                        property = position === 'Middle' ? 'DLCenter' : position === 'Top' ? 'DLInsideend' : position === 'Bottom' ?
                            'DLInsidebase' : position === 'Outer' ? 'DLOutsideend' : 'DLNone';
                        break;
                    case 'LegendNone':
                    case 'LegendsRight':
                    case 'LegendsLeft':
                    case 'LegendsBottom':
                    case 'LegendsTop':
                        if (chart.legendSettings && !chart.legendSettings.visible) {
                            position = 'LegendNone';
                        }
                        else {
                            position = chart.legendSettings && chart.legendSettings.position;
                            property = position === 'Right' ? 'LegendsRight' : position === 'Left' ? 'LegendsLeft' : position ===
                                'Bottom' ? 'LegendsBottom' : position === 'Top' ? 'LegendsTop' : 'LegendsBottom';
                        }
                        break;
                    case 'PVAxisTitle':
                        title = chart.primaryYAxis && chart.primaryYAxis.title;
                        break;
                    case 'PHAxisTitle':
                        title = chart.primaryXAxis && chart.primaryXAxis.title;
                        break;
                    case 'ChartTitleNone':
                    case 'ChartTitleAbove':
                        title = chart.title;
                        break;
                }
            }
            this.updateChartElement(property, chartComp, cell, chartCollectionId, title, null, args.address);
        }
    };
    SpreadsheetChart.prototype.chartDesignTabHandler = function (args) {
        var isAccumulationChart = false;
        var sheet = this.parent.sheets[this.parent.activeSheetIndex];
        var switchRowColumn = args.switchRowColumn;
        var chartType = args.chartType;
        var chartTheme = args.chartTheme;
        var addChartEle = args.addChartEle;
        var chartComp = null;
        var overlayElem = args.id ? document.getElementById(args.id) : document.querySelector('.e-datavisualization-chart.e-ss-overlay-active');
        if (!overlayElem) {
            return;
        }
        var opensTitleDialog = addChartEle === 'ChartTitleAbove' || addChartEle === 'PHAxisTitle' || addChartEle === 'PVAxisTitle';
        var chartTop;
        var chartleft;
        if (sheet.frozenRows || sheet.frozenColumns) {
            var clientRect = overlayElem.getBoundingClientRect();
            chartTop = { clientY: clientRect.top };
            chartleft = { clientX: clientRect.left };
            if (clientRect.top < this.parent.getColumnHeaderContent().getBoundingClientRect().bottom) {
                chartTop.target = this.parent.getColumnHeaderContent();
            }
            if (clientRect.left < this.parent.getRowHeaderContent().getBoundingClientRect().right) {
                chartleft.target = this.parent.getRowHeaderTable();
            }
        }
        else {
            chartTop = { clientY: overlayElem.offsetTop, isImage: true };
            chartleft = { clientX: overlayElem.offsetLeft, isImage: true };
        }
        this.parent.notify(getRowIdxFromClientY, chartTop);
        this.parent.notify(getColIdxFromClientX, chartleft);
        var currCellObj = getCell(chartTop.clientY, chartleft.clientX, sheet);
        var address = sheet.name + '!' + getCellAddress(chartTop.clientY, chartleft.clientX);
        if (args.triggerEvent) {
            var eventArgs = {
                switchRowColumn: args.switchRowColumn, chartType: args.chartType, chartTheme: args.chartTheme,
                addChartEle: args.addChartEle, id: overlayElem.id, address: address, cancel: false
            };
            this.parent.notify(beginAction, { action: 'chartDesign', eventArgs: eventArgs });
            if (eventArgs.cancel) {
                return;
            }
        }
        var chartObj = this.getChartElement(overlayElem);
        var chartId = chartObj.getAttribute('id');
        var chartCollId = this.getChartCollectionId(chartId);
        if (chartObj) {
            chartComp = getComponent(chartObj, 'chart');
            if (isNullOrUndefined(chartComp)) {
                chartComp = getComponent(chartObj, 'accumulationchart');
                isAccumulationChart = true;
            }
        }
        if (switchRowColumn) {
            this.switchRowColumn(chartCollId, chartId, chartComp, currCellObj);
        }
        if (chartType) {
            this.switchChartType(chartCollId, chartId, chartType, chartComp, currCellObj, args.markerVisible);
        }
        if (chartTheme) {
            this.switchChartTheme(chartCollId, chartId, chartTheme, chartComp, currCellObj);
        }
        if (addChartEle) {
            if (opensTitleDialog && !args.title) {
                if (this.parent.element.getElementsByClassName('e-title-dlg').length > 0) {
                    return;
                }
                else {
                    this.titleDlgHandler(addChartEle, chartComp, currCellObj, chartCollId, isAccumulationChart, address, args.triggerEvent);
                }
            }
            else {
                this.updateChartElement(addChartEle, chartComp, currCellObj, chartCollId, args.title, isAccumulationChart);
            }
        }
        if (args.triggerEvent && !opensTitleDialog) {
            var eventArgs = {
                switchRowColumn: args.switchRowColumn, chartType: args.chartType, chartMarker: args.markerVisible,
                chartTheme: args.chartTheme, addChartEle: args.addChartEle, id: overlayElem.id, address: address
            };
            this.parent.notify(completeAction, { action: 'chartDesign', eventArgs: eventArgs });
        }
    };
    SpreadsheetChart.prototype.switchRowColumn = function (chartCollId, chartId, chartComp, cell) {
        var chart = this.parent.chartColl[chartCollId];
        chart.isSeriesInRows = isNullOrUndefined(chart.isSeriesInRows) ? true : !chart.isSeriesInRows;
        for (var idx = 0, chartCount = cell.chart.length; idx < chartCount; idx++) {
            if (cell.chart[idx].id === chartId) {
                cell.chart[idx].isSeriesInRows = chart.isSeriesInRows;
            }
        }
        var chartSeries = this.initiateChartHandler({ option: chart, isRefresh: true, isSwitchRowColumn: true });
        chartComp.series = chartSeries;
    };
    SpreadsheetChart.prototype.switchChartTheme = function (chartCollId, chartId, theme, chartComp, cell) {
        this.parent.chartColl[chartCollId].theme = theme;
        for (var idx = 0, chartCount = cell.chart.length; idx < chartCount; idx++) {
            if (cell.chart[idx].id === chartId) {
                cell.chart[idx].theme = theme;
            }
        }
        chartComp.setProperties({ theme: theme, background: this.getThemeBgColor(theme) }, true);
        chartComp.refresh();
    };
    SpreadsheetChart.prototype.getThemeBgColor = function (theme) {
        var bg;
        if (theme.includes('Dark')) {
            switch (theme) {
                case 'MaterialDark':
                    bg = '#383838';
                    break;
                case 'FabricDark':
                    bg = '#242424';
                    break;
                case 'BootstrapDark':
                    bg = '#1b1b1b';
                    break;
                case 'Bootstrap5Dark':
                    bg = '#212529';
                    break;
                case 'TailwindDark':
                    bg = '#1f2937';
                    break;
                case 'Tailwind3Dark':
                    bg = '#111827';
                    break;
                case 'FluentDark':
                    bg = '#1b1a19';
                    break;
                case 'Fluent2Dark':
                    bg = '#292929';
                    break;
                case 'Material3Dark':
                    bg = '#1C1B1F';
                    break;
            }
        }
        else if (theme.includes('HighContrast')) {
            bg = '#000000';
        }
        else {
            bg = '#FFFFFF';
        }
        return bg;
    };
    SpreadsheetChart.prototype.switchChartType = function (chartCollId, chartId, chartType, chartComp, cell, markerVisible, enableMarker, action) {
        var type = this.parent.chartColl[chartCollId].type;
        this.parent.chartColl[chartCollId].type = chartType;
        for (var idx = 0, chartCount = cell.chart.length; idx < chartCount; idx++) {
            if (cell.chart[idx].id === chartId) {
                cell.chart[idx].type = chartType;
                if (!isNullOrUndefined(cell.chart[idx].markerSettings)) {
                    cell.chart[idx].markerSettings.visible = markerVisible;
                }
            }
        }
        if (chartType !== 'Pie' && chartType !== 'Doughnut') {
            if (type === 'Pie' || type === 'Doughnut') {
                if (!isNullOrUndefined(this.parent.chartColl[chartCollId].markerSettings)) {
                    if (markerVisible) {
                        this.parent.chartColl[chartCollId].markerSettings.visible = markerVisible;
                    }
                    else if (action === 'undoRedo') {
                        this.parent.chartColl[chartCollId].markerSettings.visible = enableMarker;
                    }
                    else {
                        this.parent.chartColl[chartCollId].markerSettings.visible = false;
                    }
                }
                else if (markerVisible && (chartType === 'Line' || chartType === 'StackingLine' || chartType === 'StackingLine100')) {
                    this.parent.chartColl[chartCollId].markerSettings = { shape: 'Circle', visible: true, isFilled: false };
                }
                this.changeCharType(chartCollId);
            }
            else {
                if (type !== chartType) {
                    if (chartType === 'Scatter') {
                        var labels = chartComp.primaryXAxis['labels'];
                        if (labels && labels.length > 0 && isNumber(labels[labels.length - 1])) {
                            chartComp.primaryXAxis.valueType = 'Double';
                        }
                    }
                    else if (chartComp.primaryXAxis.valueType === 'Double') {
                        chartComp.primaryXAxis.valueType = 'Category';
                    }
                }
                var chartSeries = chartComp.series;
                var isLineChart = chartType === 'Line' || chartType === 'StackingLine' || chartType === 'StackingLine100';
                for (var idx = 0, len = chartSeries.length; idx < len; idx++) {
                    chartSeries[idx].type = chartType;
                    if (isLineChart) {
                        chartSeries[idx].marker.visible = markerVisible;
                        chartSeries[idx].marker.shape = isNullOrUndefined(chartSeries[idx].marker.shape) ? 'Circle' : chartSeries[idx].marker.shape;
                        if (action === 'undoRedo') {
                            chartSeries[idx].marker.visible = enableMarker;
                        }
                    }
                    else {
                        chartSeries[idx].marker.visible = false;
                    }
                }
                chartComp.series = chartSeries;
                chartComp.refresh();
            }
        }
        else {
            if (type === 'Pie' || type === 'Doughnut') {
                var chartSeries = chartComp.series;
                for (var idx = 0, len = chartSeries.length; idx < len; idx++) {
                    chartSeries[idx].innerRadius = chartType === 'Pie' ? '0%' : '40%';
                }
                chartComp.series = chartSeries;
                chartComp.refresh();
            }
            else {
                this.changeCharType(chartCollId);
            }
        }
    };
    SpreadsheetChart.prototype.getChartElement = function (overlayElem) {
        var chartObj = overlayElem.querySelector('.e-chart');
        if (isNullOrUndefined(chartObj)) {
            chartObj = overlayElem.querySelector('.e-accumulationchart');
        }
        return chartObj;
    };
    SpreadsheetChart.prototype.getChartCollectionId = function (id) {
        var chartCollectionId;
        for (var i = 0, len = this.parent.chartColl.length; i < len; i++) {
            if (id === this.parent.chartColl[i].id) {
                chartCollectionId = i;
            }
        }
        return chartCollectionId;
    };
    SpreadsheetChart.prototype.changeCharType = function (chartCollId) {
        var chartEle = document.getElementById(this.parent.chartColl[chartCollId].id);
        var chartParEle = closest(chartEle, '.e-datavisualization-chart');
        chartParEle.remove();
        this.initiateChartHandler({
            option: this.parent.chartColl[chartCollId], isInitCell: false, triggerEvent: false, isPaste: false,
            isChangeChartType: true
        });
        chartEle = document.getElementById(this.parent.chartColl[chartCollId].id);
        chartParEle = closest(chartEle, '.e-datavisualization-chart');
        if (!chartParEle.classList.contains('e-ss-overlay-active')) {
            chartParEle.classList.add('e-ss-overlay-active');
        }
    };
    SpreadsheetChart.prototype.titleDlgHandler = function (addChartEle, chartComp, currCellObj, chartCollId, isAccumulationChart, address, triggerEvent) {
        var _this = this;
        var title = '';
        if (isAccumulationChart && (addChartEle === 'PHAxisTitle' || addChartEle === 'PVAxisTitle')) {
            return;
        }
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            width: 375, showCloseIcon: true, isModal: true, cssClass: 'e-title-dlg',
            header: addChartEle === 'chart_abovechart' ? l10n.getConstant('ChartTitle') : addChartEle ===
                'PHAxisTitle' ? l10n.getConstant('HorizontalAxisTitle') : l10n.getConstant('VerticalAxisTitle'),
            beforeOpen: function () {
                dialogInst.dialogInstance.content = _this.titleDlgContent(addChartEle, chartComp);
                dialogInst.dialogInstance.dataBind();
                _this.parent.element.focus();
            },
            buttons: [{
                    buttonModel: {
                        content: l10n.getConstant('Ok'),
                        isPrimary: true,
                        cssClass: 'e-btn e-clearall-btn e-flat'
                    },
                    click: function () {
                        var dlgCont = _this.parent.element.querySelector('.e-title-dlg').
                            getElementsByClassName('e-title-dlg-content')[0];
                        title = dlgCont.getElementsByTagName('input')[0].value;
                        dialogInst.hide();
                        _this.updateChartElement(addChartEle, chartComp, currCellObj, chartCollId, title, null, address, triggerEvent);
                    }
                }]
        });
        dialogInst.dialogInstance.refresh();
    };
    SpreadsheetChart.prototype.titleDlgContent = function (addChartEle, chartComp) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var dlgContent = this.parent.createElement('div', { className: 'e-title-dlg-content' });
        var value1Text = this.parent.createElement('span', { className: 'e-header e-top-header' });
        value1Text.innerText = l10n.getConstant('EnterTitle');
        var value1Inp = this.parent.createElement('input', { className: 'e-input', id: 'titleInput', attrs: { type: 'text' } });
        dlgContent.appendChild(value1Text);
        dlgContent.appendChild(value1Inp);
        if (chartComp) {
            if (addChartEle === 'PHAxisTitle') {
                value1Inp.value = chartComp.primaryXAxis.title ? chartComp.primaryXAxis.title : value1Inp.value;
            }
            else if (addChartEle === 'PVAxisTitle') {
                value1Inp.value = chartComp.primaryYAxis.title ? chartComp.primaryYAxis.title : value1Inp.value;
            }
            else {
                value1Inp.value = chartComp.title ? chartComp.title : value1Inp.value;
            }
        }
        return dlgContent;
    };
    /**
     * Removing event listener for success and failure
     *
     * @returns {void} - Removing event listener for success and failure
     */
    SpreadsheetChart.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(initiateChart, this.initiateChartHandler);
            this.parent.off(refreshChartCellObj, this.refreshChartCellObj);
            this.parent.off(refreshChartCellOnInit, this.refreshChartCellModel);
            this.parent.off(refreshChartCellModel, this.refreshChartCellModel);
            this.parent.off(deleteChart, this.deleteChart);
            this.parent.off(clearChartBorder, this.clearBorder);
            this.parent.off(insertChart, this.insertChartHandler);
            this.parent.off(chartRangeSelection, this.chartRangeHandler);
            this.parent.off(chartDesignTab, this.chartDesignTabHandler);
            this.parent.off(addChartEle, this.updateChartElement);
            this.parent.off(undoRedoForChartDesign, this.undoRedoForChartDesign);
            this.parent.off(refreshChart, this.refreshChartData);
        }
    };
    /**
     * To Remove the event listeners.
     *
     * @returns {void} - To Remove the event listeners.
     */
    SpreadsheetChart.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
        var chartEle = null;
        if (this.chart) {
            chartEle = this.chart.element;
            this.chart.destroy();
        }
        if (chartEle) {
            detach(chartEle);
        }
        this.chart = null;
    };
    /**
     * Get the sheet chart module name.
     *
     * @returns {string} - Get the module name.
     */
    SpreadsheetChart.prototype.getModuleName = function () {
        return 'spreadsheetChart';
    };
    return SpreadsheetChart;
}());
export { SpreadsheetChart };
