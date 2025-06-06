import { Workbook } from '@syncfusion/ej2-excel-export';
import * as events from '../../common/base/constant';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PivotExportUtil } from '../../base/export-util';
/**
 * @hidden
 * `ExcelExport` module is used to handle the Excel export action.
 */
var ExcelExport = /** @class */ (function () {
    /**
     * Constructor for the PivotGrid Excel Export module.
     *
     * @param {PivotView} parent - Instance of pivot table.
     * @hidden
     */
    function ExcelExport(parent) {
        this.actualrCnt = 0;
        this.parent = parent;
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - string.
     * @private
     */
    ExcelExport.prototype.getModuleName = function () {
        return 'excelExport';
    };
    ExcelExport.prototype.addHeaderAndFooter = function (excelExportProperties, stringValue, type, rowCount) {
        var cells = [];
        if (!isNullOrUndefined(excelExportProperties.rows)) {
            this.actualrCnt = (type === 'footer') ? this.actualrCnt + rowCount - (excelExportProperties.rows[0].cells.length) : this.actualrCnt;
            var row = excelExportProperties.rows;
            for (var i = 0; i < row.length; i++) {
                var spanCount = 0;
                cells = [];
                var currentRow = row[i];
                for (var j = 0; j < currentRow.cells.length; j++) {
                    cells.push({
                        index: spanCount + 1, value: currentRow.cells[j].value,
                        colSpan: currentRow.cells[j].colSpan, rowSpan: currentRow.cells[j].rowSpan,
                        style: currentRow.cells[j].style
                    });
                    spanCount = spanCount + cells[j].colSpan;
                }
                this.actualrCnt++;
                this.rows.push({ index: this.actualrCnt, cells: cells });
            }
            this.actualrCnt = (type === 'header') ? rowCount : this.actualrCnt;
        }
        else {
            if (stringValue !== '') {
                if (type === 'footer') {
                    this.actualrCnt++;
                }
                cells.push({
                    index: 1, value: stringValue
                });
                this.rows.push({ index: this.actualrCnt + 1, cells: cells });
                this.actualrCnt = (type === 'header') ? this.actualrCnt + 2 : this.actualrCnt;
            }
        }
    };
    /**
     *
     * Method to perform excel export.
     *
     * @hidden
     */
    ExcelExport.prototype.exportToExcel = function (type, exportProperties, isBlob) {
        this.rows = [];
        this.actualrCnt = 0;
        var isHeaderSet = !isNullOrUndefined(exportProperties) && !isNullOrUndefined(exportProperties.header);
        var isFooterSet = !isNullOrUndefined(exportProperties) && !isNullOrUndefined(exportProperties.footer);
        var isFileNameSet = !isNullOrUndefined(exportProperties) && !isNullOrUndefined(exportProperties.fileName);
        this.engine = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        /** Event trigerring */
        var clonedValues;
        var currentPivotValues = PivotExportUtil.getClonedPivotValues(this.engine.pivotValues);
        var customFileName = isFileNameSet ? exportProperties.fileName : type === 'CSV' ? 'default.csv' : 'default.xlsx';
        if (this.parent.exportAllPages && (this.parent.enableVirtualization || this.parent.enablePaging)) {
            var pageSettings = this.engine.pageSettings;
            var mdxQuery = void 0;
            this.engine.isPagingOrVirtualizationEnabled = false;
            if (this.parent.dataType === 'olap') {
                this.updateOlapPageSettings(true);
                mdxQuery = this.parent.olapEngineModule.mdxQuery.slice(0);
            }
            else {
                this.engine.pageSettings = null;
            }
            this.engine.generateGridData(this.parent.dataSourceSettings, true, true);
            this.parent.applyFormatting(this.engine.pivotValues);
            clonedValues = PivotExportUtil.getClonedPivotValues(this.engine.pivotValues);
            this.engine.pivotValues = currentPivotValues;
            this.engine.pageSettings = pageSettings;
            this.engine.isPagingOrVirtualizationEnabled = true;
            if (this.parent.dataType === 'olap') {
                this.updateOlapPageSettings(false);
                this.parent.olapEngineModule.mdxQuery = mdxQuery;
            }
        }
        else {
            clonedValues = currentPivotValues;
        }
        var args = {
            fileName: customFileName, header: '', footer: '', dataCollections: [clonedValues], excelExportProperties: exportProperties
        };
        var fileName;
        var header;
        var footer;
        var dataCollections;
        this.parent.trigger(events.beforeExport, args, function (observedArgs) {
            fileName = observedArgs.fileName;
            header = observedArgs.header;
            footer = observedArgs.footer;
            dataCollections = observedArgs.dataCollections;
        });
        if (!isHeaderSet && isNullOrUndefined(args.excelExportProperties) && header !== '') {
            this.addHeaderAndFooter({}, header, 'header', undefined);
        }
        else if (!isNullOrUndefined(args.excelExportProperties) && !isNullOrUndefined(args.excelExportProperties.header)) {
            this.addHeaderAndFooter(args.excelExportProperties.header, '', 'header', args.excelExportProperties.header.headerRows);
        }
        /** Fill data and export */
        var workSheets = [];
        for (var dataColl = 0; dataColl < dataCollections.length; dataColl++) {
            var pivotValues = dataCollections[dataColl];
            var colLen = 0;
            var rowLen = pivotValues.length;
            var formatList = this.parent.renderModule.getFormatList();
            var maxLevel = 0;
            for (var rCnt = 0; rCnt < rowLen; rCnt++) {
                if (pivotValues[rCnt]) {
                    this.actualrCnt++;
                    colLen = pivotValues[rCnt].length;
                    var cells = [];
                    for (var cCnt = 0; cCnt < colLen; cCnt++) {
                        if (pivotValues[rCnt][cCnt]) {
                            var pivotCell = pivotValues[rCnt][cCnt];
                            var field = (this.parent.dataSourceSettings.valueAxis === 'row' &&
                                this.parent.dataType === 'olap' && pivotCell.rowOrdinal &&
                                this.engine.tupRowInfo[pivotCell.rowOrdinal]) ?
                                this.engine.tupRowInfo[pivotCell.rowOrdinal].measureName :
                                pivotCell.actualText;
                            var styles = (pivotCell.axis === 'row') ? { hAlign: 'Left', bold: true, wrapText: true } : { numberFormat: formatList[field], bold: false, wrapText: true };
                            var headerStyle = { bold: true, vAlign: 'Center', wrapText: true, indent: cCnt === 0 ? pivotCell.level * 10 : 0 };
                            if (!(pivotCell.level === -1 && !pivotCell.rowSpan)) {
                                var aggMatrix = this.engine.aggregatedValueMatrix;
                                var cellValue = pivotCell.axis === 'value' ? ((aggMatrix[rCnt] && aggMatrix[rCnt][cCnt]) ? aggMatrix[rCnt][cCnt] : (pivotCell.formattedText === '#DIV/0!' ? pivotCell.formattedText : pivotCell.value)) : pivotCell.formattedText;
                                var isgetValuesHeader = ((this.parent.dataSourceSettings.rows.length === 0 && this.parent.dataSourceSettings.valueAxis === 'row')
                                    || (this.parent.dataSourceSettings.columns.length === 0 && this.parent.dataSourceSettings.valueAxis === 'column'));
                                if (pivotCell.type === 'grand sum' && !(this.parent.dataSourceSettings.values.length === 1 && this.parent.dataSourceSettings.valueAxis === 'row' && pivotCell.axis === 'column')) {
                                    cellValue = isgetValuesHeader ? this.parent.getValuesHeader(pivotCell, 'grandTotal') : this.parent.localeObj.getConstant('grandTotal');
                                }
                                else if (pivotCell.type === 'sum') {
                                    cellValue = cellValue.toString().replace('Total', this.parent.localeObj.getConstant('total'));
                                }
                                else {
                                    cellValue = (!isNullOrUndefined(pivotCell.valueSort) && (this.parent.localeObj.getConstant('grandTotal') + this.parent.dataSourceSettings.valueSortSettings.headerDelimiter + pivotCell.formattedText
                                        === pivotCell.valueSort.levelName) && isgetValuesHeader) ? this.parent.getValuesHeader(pivotCell, 'value') : cellValue;
                                }
                                if (!(pivotCell.level === -1 && !pivotCell.rowSpan) && pivotCell.rowSpan !== 0) {
                                    cells.push({
                                        index: cCnt + 1, value: cellValue,
                                        colSpan: pivotCell.colSpan, rowSpan: (pivotCell.rowSpan === -1 ? 1 : pivotCell.rowSpan)
                                    });
                                    var lastCell = cells[cells.length - 1];
                                    if (pivotCell.axis === 'value') {
                                        if (isNaN(pivotCell.value) || pivotCell.formattedText === '' ||
                                            pivotCell.formattedText === undefined || isNullOrUndefined(pivotCell.value)) {
                                            lastCell.value = type === 'Excel' ? null : '';
                                        }
                                        styles.numberFormat = typeof cellValue === 'string' ? undefined : styles.numberFormat;
                                        lastCell.style = styles;
                                    }
                                    else {
                                        lastCell.style = headerStyle;
                                        if (pivotCell.axis === 'row' && cCnt === 0) {
                                            lastCell.style = styles;
                                            if (this.parent.dataType === 'olap') {
                                                var indent = this.parent.renderModule.indentCollection[rCnt];
                                                lastCell.style.indent = indent * 2;
                                                maxLevel = maxLevel > indent ? maxLevel : indent;
                                            }
                                            else {
                                                var levelName = pivotCell.valueSort ? pivotCell.valueSort.levelName.toString() : '';
                                                var memberPos = pivotCell.actualText ?
                                                    pivotCell.actualText.toString().
                                                        split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length : 0;
                                                var levelPosition = levelName.
                                                    split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length -
                                                    (memberPos ? memberPos - 1 : memberPos);
                                                var level = levelPosition ? (levelPosition - 1) : 0;
                                                lastCell.style.indent = level * 2;
                                                maxLevel = level > maxLevel ? level : maxLevel;
                                            }
                                        }
                                    }
                                    if (pivotCell.style || lastCell.style.backColor || lastCell.style.fontColor ||
                                        lastCell.style.fontName || lastCell.style.fontSize) {
                                        lastCell.style.backColor = lastCell.style.backColor ? lastCell.style.backColor
                                            : pivotCell.style.backgroundColor;
                                        lastCell.style.fontColor = lastCell.style.fontColor ? lastCell.style.fontColor
                                            : pivotCell.style.color;
                                        lastCell.style.fontName = lastCell.style.fontName ? lastCell.style.fontName
                                            : pivotCell.style.fontFamily;
                                        if (!isNullOrUndefined(lastCell.style.fontSize) || !isNullOrUndefined(pivotCell.style.fontSize)) {
                                            lastCell.style.fontSize = !isNullOrUndefined(lastCell.style.fontSize) ? Number(lastCell.style.fontSize) : Number(pivotCell.style.fontSize.split('px')[0]);
                                        }
                                    }
                                    lastCell.style.borders = { color: '#000000', lineStyle: 'thin' };
                                    var excelHeaderQueryCellInfoArgs = void 0;
                                    var excelQueryCellInfoArgs = void 0;
                                    if (pivotCell.axis === 'column') {
                                        excelHeaderQueryCellInfoArgs = {
                                            style: headerStyle,
                                            cell: pivotCell
                                        };
                                        this.parent.trigger(events.excelHeaderQueryCellInfo, excelHeaderQueryCellInfoArgs);
                                    }
                                    else {
                                        excelQueryCellInfoArgs = {
                                            style: styles,
                                            cell: pivotCell,
                                            column: undefined,
                                            data: pivotValues,
                                            value: cellValue
                                        };
                                        this.parent.trigger(events.excelQueryCellInfo, excelQueryCellInfoArgs);
                                    }
                                    lastCell.value = (pivotCell.axis === 'column') ? excelHeaderQueryCellInfoArgs.cell.formattedText : excelQueryCellInfoArgs.value;
                                    lastCell.style = (pivotCell.axis === 'column') ? excelHeaderQueryCellInfoArgs.style : excelQueryCellInfoArgs.style;
                                }
                            }
                            cCnt = cCnt + (pivotCell.colSpan ? (pivotCell.colSpan - 1) : 0);
                        }
                        else {
                            var pivotCell = { formattedText: '' };
                            var excelHeaderQueryCellInfoArgs = void 0;
                            if (pivotCell) {
                                excelHeaderQueryCellInfoArgs = {
                                    style: undefined,
                                    cell: pivotCell
                                };
                                this.parent.trigger(events.excelHeaderQueryCellInfo, excelHeaderQueryCellInfoArgs);
                            }
                            cells.push({
                                index: cCnt + 1, colSpan: 1, rowSpan: 1, value: pivotCell.formattedText,
                                style: excelHeaderQueryCellInfoArgs.style
                            });
                        }
                    }
                    this.rows.push({ index: this.actualrCnt, cells: cells });
                }
            }
            if (isFooterSet) {
                this.addHeaderAndFooter(exportProperties.footer, '', 'footer', exportProperties.footer.footerRows);
            }
            else if (!isFooterSet && footer !== '' && isNullOrUndefined(args.excelExportProperties)) {
                this.addHeaderAndFooter({}, footer, 'footer', undefined);
            }
            else if (!isNullOrUndefined(args.excelExportProperties) && !isNullOrUndefined(args.excelExportProperties.footer)) {
                this.addHeaderAndFooter(args.excelExportProperties.footer, '', 'footer', args.excelExportProperties.footer.footerRows);
            }
            var columns = [];
            for (var cCnt = 0; cCnt < colLen; cCnt++) {
                columns.push({ index: cCnt + 1, width: 100 });
            }
            if (maxLevel > 0) {
                columns[0].width = 100 + (maxLevel * 20);
            }
            workSheets.push({ columns: columns, rows: this.rows });
        }
        var book = new Workbook({ worksheets: workSheets }, type === 'Excel' ? 'xlsx' : 'csv', undefined, this.parent.currencyCode);
        var fileExtension = fileName.split('.').pop();
        var blobData;
        if (!isBlob) {
            book.save(fileExtension === 'xlsx' || fileExtension === 'csv' ? fileName : (fileName + (type === 'Excel' ? '.xlsx' : '.csv')));
        }
        else {
            blobData = book.saveAsBlob(fileExtension === 'xlsx' || type === 'Excel' ?
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/csv');
        }
        var exportCompleteEventArgs = {
            type: type,
            promise: isBlob ? blobData : null
        };
        this.parent.trigger(events.exportComplete, exportCompleteEventArgs);
    };
    ExcelExport.prototype.updateOlapPageSettings = function (isUpdate) {
        this.parent.olapEngineModule.isExporting = isUpdate ? true : false;
        if (!this.parent.exportSpecifiedPages) {
            this.parent.olapEngineModule.pageSettings = isUpdate ? null : this.parent.olapEngineModule.pageSettings;
            this.parent.olapEngineModule.isPaging = isUpdate ? false : true;
        }
        else {
            this.parent.olapEngineModule.exportSpeciedPages = this.parent.exportSpecifiedPages = isUpdate ?
                this.parent.exportSpecifiedPages : undefined;
        }
    };
    /**
     * To destroy the excel export module
     *
     * @returns {void}
     * @hidden
     */
    ExcelExport.prototype.destroy = function () {
        if (this.engine) {
            this.engine = null;
        }
    };
    return ExcelExport;
}());
export { ExcelExport };
