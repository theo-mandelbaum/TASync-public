import { getRangeIndexes, getSwapRange, getRangeAddress } from '../common/index';
import { setCell, getSheetIndex, getCell, getSheetIndexFromId } from '../base/index';
import { setChart, initiateChart, deleteChartColl, refreshChartSize, focusChartBorder, getChartRowIdxFromClientY, getChartColIdxFromClientX, refreshChartCellOnInit } from '../common/event';
import { closest, isNullOrUndefined, getComponent, isUndefined, getUniqueID } from '@syncfusion/ej2-base';
/**
 * The `WorkbookChart` module is used to handle chart action in Spreadsheet.
 */
var WorkbookChart = /** @class */ (function () {
    /**
     * Constructor for WorkbookChart module.
     *
     * @param {Workbook} parent - Constructor for WorkbookChart module.
     */
    function WorkbookChart(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    WorkbookChart.prototype.addEventListener = function () {
        this.parent.on(setChart, this.setChartHandler, this);
        this.parent.on(deleteChartColl, this.deleteChartColl, this);
        this.parent.on(refreshChartSize, this.refreshChartSize, this);
        this.parent.on(focusChartBorder, this.focusChartBorder, this);
    };
    WorkbookChart.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(setChart, this.setChartHandler);
            this.parent.off(deleteChartColl, this.deleteChartColl);
            this.parent.off(refreshChartSize, this.refreshChartSize);
            this.parent.off(focusChartBorder, this.focusChartBorder);
        }
    };
    WorkbookChart.prototype.setChartHandler = function (args) {
        var i = 0;
        var rangeIdx = [];
        args.isInitCell = isNullOrUndefined(args.isInitCell) ? false : args.isInitCell;
        args.isUndoRedo = isNullOrUndefined(args.isUndoRedo) ? true : args.isUndoRedo;
        args.isPaste = isNullOrUndefined(args.isPaste) ? false : args.isPaste;
        var chart = args.chart;
        var chartModel;
        var chartLength;
        if (chart.length > 0) {
            while (i < chart.length) {
                if (args.isCut === false) {
                    if (document.getElementById(args.chart[i].id)) {
                        chart[i] = {
                            range: chart[i].range, id: getUniqueID('e_spreadsheet_chart'), theme: chart[i].theme,
                            isSeriesInRows: chart[i].isSeriesInRows, type: chart[i].type,
                            markerSettings: chart[i].markerSettings,
                            title: chart[i].title, legendSettings: chart[i].legendSettings,
                            primaryXAxis: chart[i].primaryXAxis, primaryYAxis: chart[i].primaryYAxis,
                            dataLabelSettings: chart[i].dataLabelSettings
                        };
                    }
                }
                if (document.getElementById(args.chart[i].id)) {
                    return;
                }
                chartModel = chart[i];
                chartModel.theme = chartModel.theme || 'Material';
                chartModel.type = chartModel.type || 'Line';
                chartModel.isSeriesInRows = chartModel.isSeriesInRows || false;
                if (isNullOrUndefined(chartModel.range)) {
                    var sheet = this.parent.getActiveSheet();
                    chartModel.range = sheet.selectedRange;
                    rangeIdx = getSwapRange(getRangeIndexes(chartModel.range));
                    if (rangeIdx[0] === 0 && rangeIdx[2] === sheet.rowCount - 1 && rangeIdx[2] > sheet.usedRange.rowIndex) {
                        rangeIdx[2] = sheet.usedRange.rowIndex;
                    }
                    if (rangeIdx[1] === 0 && rangeIdx[3] === sheet.colCount - 1 && rangeIdx[3] > sheet.usedRange.colIndex) {
                        rangeIdx[3] = sheet.usedRange.colIndex;
                    }
                }
                else {
                    rangeIdx = getSwapRange(getRangeIndexes(chartModel.range));
                }
                var rangeAddress = getRangeAddress(rangeIdx);
                if (chartModel.range.indexOf('!') > 0) {
                    chartModel.range = chartModel.range.substring(0, chartModel.range.lastIndexOf('!')) + '!' + rangeAddress;
                }
                else {
                    chartModel.range = this.parent.getActiveSheet().name + '!' + rangeAddress;
                }
                if (isNullOrUndefined(chartModel.id)) {
                    chartModel.id = getUniqueID('e_spreadsheet_chart');
                }
                if (chartModel.markerSettings && chartModel.markerSettings.visible) {
                    if (chartModel.markerSettings.isFilled === undefined) {
                        chartModel.markerSettings.isFilled = true;
                    }
                    if (chartModel.markerSettings.shape === undefined) {
                        chartModel.markerSettings.shape = 'Circle';
                    }
                }
                chartModel.height = chartModel.height || 290;
                chartModel.width = chartModel.width || 480;
                this.parent.notify(initiateChart, {
                    option: chartModel, isInitCell: args.isInitCell, triggerEvent: args.isUndoRedo,
                    dataSheetIdx: args.dataSheetIdx, range: args.range, isPaste: args.isPaste
                });
                this.parent.chartColl.push(chartModel);
                if (!args.isInitCell || args.isPaste || args.isUndo || args.isRedo) {
                    var sheetIdx = void 0;
                    var rowIdx = void 0;
                    var colIdx = void 0;
                    if (args.range && (args.isUndo || args.isRedo)) {
                        sheetIdx = getSheetIndex(this.parent, args.range.substring(0, args.range.lastIndexOf('!')));
                        var range = getSwapRange(getRangeIndexes(args.range));
                        rowIdx = range[0];
                        colIdx = range[1];
                    }
                    else {
                        sheetIdx = args.sheetId === undefined
                            ? ((chartModel.range && chartModel.range.lastIndexOf('!') > 0)
                                ? getSheetIndex(this.parent, chartModel.range.substring(0, chartModel.range.lastIndexOf('!')))
                                : this.parent.activeSheetIndex) : getSheetIndexFromId(this.parent, args.sheetId);
                        var chartRowIdx = { clientY: chartModel.top, isImage: true };
                        var chartColIdx = { clientX: chartModel.left, isImage: true };
                        this.parent.notify(getChartRowIdxFromClientY, chartRowIdx);
                        this.parent.notify(getChartColIdxFromClientX, chartColIdx);
                        rowIdx = chartRowIdx.clientY;
                        colIdx = chartColIdx.clientX;
                    }
                    var sheet = isUndefined(sheetIdx) ? this.parent.getActiveSheet()
                        : this.parent.sheets[sheetIdx];
                    var cell = getCell(rowIdx, colIdx, sheet);
                    if (!this.parent.isPrintingProcessing) {
                        if (cell && cell.chart) {
                            cell.chart.push(chartModel);
                        }
                        else {
                            setCell(rowIdx, colIdx, sheet, { chart: [chartModel] }, true);
                        }
                    }
                }
                else {
                    var indexes = getRangeIndexes(args.range);
                    var chartRowIdx = { clientY: chartModel.top, isImage: true };
                    var chartColIdx = { clientX: chartModel.left, isImage: true };
                    this.parent.notify(getChartRowIdxFromClientY, chartRowIdx);
                    this.parent.notify(getChartColIdxFromClientX, chartColIdx);
                    var eventArgs = {
                        prevTop: chartModel.top, prevLeft: chartModel.left, prevRowIdx: indexes[0], prevColIdx: indexes[1],
                        prevHeight: chartModel.height, prevWidth: chartModel.width, currentTop: chartModel.top,
                        currentLeft: chartModel.left, currentRowIdx: chartRowIdx.clientY, currentColIdx: chartColIdx.clientX,
                        currentHeight: chartModel.height, currentWidth: chartModel.width, id: chartModel.id, requestType: 'chartRefreshOnInit'
                    };
                    if (indexes[0] !== chartRowIdx.clientY || indexes[1] !== chartColIdx.clientX) {
                        chartLength = chart.length;
                        this.parent.notify(refreshChartCellOnInit, eventArgs);
                        i -= chartLength - chart.length;
                    }
                }
                i++;
            }
        }
    };
    WorkbookChart.prototype.refreshChartSize = function (args) {
        var chartCnt;
        var j = 1;
        var sheetCnt = this.parent.sheets.length + 1;
        while (j < sheetCnt) {
            var charts = this.parent.chartColl;
            chartCnt = charts ? charts.length : 0;
            if (chartCnt) {
                while (chartCnt--) {
                    var chart = this.parent.chartColl[chartCnt];
                    if (!isNullOrUndefined(args.overlayEle.querySelector('#' + chart.id))) {
                        var chartObj = this.parent.element.querySelector('.' + chart.id);
                        var excelFilter = getComponent(chartObj, 'chart') || getComponent(chartObj, 'accumulationchart');
                        if (excelFilter) {
                            excelFilter.height = args.height;
                            excelFilter.width = args.width;
                        }
                    }
                }
            }
            j++;
        }
    };
    WorkbookChart.prototype.focusChartBorder = function (args) {
        for (var idx = 0; idx < this.parent.chartColl.length; idx++) {
            var overlayEle = document.getElementById(args.id);
            var chartEle = document.getElementById(this.parent.chartColl[idx].id);
            if (overlayEle && chartEle && closest(chartEle, '.' + overlayEle.classList[1]) === overlayEle) {
                this.parent.notify(initiateChart, {
                    option: this.parent.chartColl[idx], isRefresh: true
                });
            }
        }
    };
    WorkbookChart.prototype.deleteChartColl = function (args) {
        for (var idx = 0; idx < this.parent.chartColl.length; idx++) {
            if (this.parent.chartColl[idx].id + '_overlay' === args.id) {
                this.parent.chartColl.splice(idx, 1);
            }
        }
    };
    /**
     * To Remove the event listeners.
     *
     * @returns {void} - To Remove the event listeners.
     */
    WorkbookChart.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the workbook chart module name.
     *
     * @returns {string} - Get the workbook chart module name.
     */
    WorkbookChart.prototype.getModuleName = function () {
        return 'workbookChart';
    };
    return WorkbookChart;
}());
export { WorkbookChart };
