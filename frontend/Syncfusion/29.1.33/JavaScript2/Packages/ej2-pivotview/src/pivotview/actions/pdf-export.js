import { PdfGrid, PdfPen, PointF, PdfDocument, PdfStandardFont, PdfFontFamily, PdfSolidBrush, PdfColor, PdfStringFormat, PdfVerticalAlignment, PdfTextAlignment, PdfFontStyle, PdfBorders, SizeF, PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import * as events from '../../common/base/constant';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PivotExportUtil } from '../../base/export-util';
import { PivotUtil } from '../../base/util';
import { PDFExportHelper } from './pdf-export-helper';
/**
 * @hidden
 * `PDFExport` module is used to handle the PDF export action.
 */
var PDFExport = /** @class */ (function () {
    /**
     * Constructor for the PivotGrid PDF Export module.
     *
     * @param {PivotView} parent - Instance of pivot table.
     * @hidden
     */
    function PDFExport(parent) {
        this.parent = parent;
        this.pdfExportHelper = new PDFExportHelper();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - string.
     * @private
     */
    PDFExport.prototype.getModuleName = function () {
        return 'pdfExport';
    };
    PDFExport.prototype.addPage = function (eventParams, pdfExportProperties) {
        pdfExportProperties = pdfExportProperties ? pdfExportProperties : this.exportProperties.pdfExportProperties;
        var documentSection = eventParams.document.sections.add();
        var documentHeight = eventParams.document.pageSettings.height;
        var documentWidth = eventParams.document.pageSettings.width;
        if (this.exportProperties.width || this.exportProperties.height) {
            eventParams.document.pageSettings.orientation = ((this.exportProperties.width > this.exportProperties.height)
                || (!this.exportProperties.height && (this.exportProperties.width > documentHeight)) || (!this.exportProperties.width
                && (documentWidth > this.exportProperties.height))) ? PdfPageOrientation.Landscape : PdfPageOrientation.Portrait;
            eventParams.document.pageSettings.size = new SizeF(this.exportProperties.width ? this.exportProperties.width :
                documentWidth, this.exportProperties.height ? this.exportProperties.height : documentHeight);
        }
        else {
            eventParams.document.pageSettings.orientation = (this.exportProperties.orientation === 0 || this.exportProperties.orientation)
                ? this.exportProperties.orientation : (!isNullOrUndefined(pdfExportProperties) &&
                !isNullOrUndefined(pdfExportProperties.pageOrientation)) ? (pdfExportProperties.pageOrientation === 'Landscape' ?
                PdfPageOrientation.Landscape : PdfPageOrientation.Portrait) : PdfPageOrientation.Landscape;
            if (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.pageSize)) {
                eventParams.document.pageSettings.size = PivotUtil.getPageSize(pdfExportProperties.pageSize);
            }
        }
        if (!isNullOrUndefined(this.exportProperties.pdfMargins)) {
            var margins = eventParams.document.pageSettings.margins;
            margins.top = !isNullOrUndefined(this.exportProperties.pdfMargins.top) ? this.exportProperties.pdfMargins.top : margins.top;
            margins.bottom = !isNullOrUndefined(this.exportProperties.pdfMargins.bottom) ? this.exportProperties.pdfMargins.bottom :
                margins.bottom;
            margins.left = !isNullOrUndefined(this.exportProperties.pdfMargins.left) ? this.exportProperties.pdfMargins.left : margins.left;
            margins.right = !isNullOrUndefined(this.exportProperties.pdfMargins.right) ? this.exportProperties.pdfMargins.right :
                margins.right;
        }
        documentSection.setPageSettings(eventParams.document.pageSettings);
        var page = documentSection.pages.add();
        if (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.header)) {
            this.pdfExportHelper.drawHeader(pdfExportProperties, eventParams.document);
        }
        if (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.footer)) {
            this.pdfExportHelper.drawFooter(pdfExportProperties, eventParams.document);
        }
        return page;
    };
    PDFExport.prototype.getFontStyle = function (theme) {
        var fontType = PdfFontStyle.Regular;
        if (!isNullOrUndefined(theme) && theme.bold) {
            fontType |= PdfFontStyle.Bold;
        }
        if (!isNullOrUndefined(theme) && theme.italic) {
            fontType |= PdfFontStyle.Italic;
        }
        if (!isNullOrUndefined(theme) && theme.underline) {
            fontType |= PdfFontStyle.Underline;
        }
        if (!isNullOrUndefined(theme) && theme.strikeout) {
            fontType |= PdfFontStyle.Strikeout;
        }
        return fontType;
    };
    PDFExport.prototype.getBorderStyle = function (borderStyle) {
        var borders = new PdfBorders();
        if (!isNullOrUndefined(borderStyle)) {
            var borderWidth = borderStyle.width;
            // set border width
            var width = (!isNullOrUndefined(borderWidth) && typeof borderWidth === 'number') ? borderWidth * 0.75 : undefined;
            // set border color
            var color = new PdfColor(196, 196, 196);
            if (!isNullOrUndefined(borderStyle.color)) {
                var borderColor = this.pdfExportHelper.hexDecToRgb(borderStyle.color);
                color = new PdfColor(borderColor.r, borderColor.g, borderColor.b);
            }
            var pen = new PdfPen(color, width);
            // set border dashStyle 'Solid <default>, Dash, Dot, DashDot, DashDotDot'
            if (!isNullOrUndefined(borderStyle.dashStyle)) {
                pen.dashStyle = this.pdfExportHelper.getDashStyle(borderStyle.dashStyle);
            }
            borders.all = pen;
        }
        else {
            var pdfColor = new PdfColor(234, 234, 234);
            borders.all = new PdfPen(pdfColor);
        }
        return borders;
    };
    PDFExport.prototype.getStyle = function () {
        var border = new PdfBorders();
        if (!isNullOrUndefined(this.gridStyle)) {
            var fontFamily = !isNullOrUndefined(this.gridStyle.header.fontName) ?
                this.getFontFamily(this.gridStyle.header.fontName) : PdfFontFamily.Helvetica;
            var fontStyle = this.getFontStyle(this.gridStyle.header);
            var fontSize = !isNullOrUndefined(this.gridStyle.header.fontSize) ? this.gridStyle.header.fontSize : 10.5;
            var pdfColor = new PdfColor();
            if (!isNullOrUndefined(this.gridStyle.header.fontColor)) {
                var penBrushColor = this.pdfExportHelper.hexDecToRgb(this.gridStyle.header.fontColor);
                pdfColor = new PdfColor(penBrushColor.r, penBrushColor.g, penBrushColor.b);
            }
            var font = new PdfStandardFont(fontFamily, fontSize, fontStyle);
            if (!isNullOrUndefined(this.gridStyle.header.font)) {
                font = this.gridStyle.header.font;
            }
            return {
                border: this.getBorderStyle(this.gridStyle.header.border), font: font, brush: new PdfSolidBrush(pdfColor)
            };
        }
        else {
            return {
                brush: new PdfSolidBrush(new PdfColor()),
                border: border, font: undefined
            };
        }
    };
    PDFExport.prototype.setRecordThemeStyle = function (row, border) {
        if (!isNullOrUndefined(this.gridStyle) && !isNullOrUndefined(this.gridStyle.record)) {
            var fontFamily = !isNullOrUndefined(this.gridStyle.record.fontName) ?
                this.getFontFamily(this.gridStyle.record.fontName) : PdfFontFamily.Helvetica;
            var fontSize = !isNullOrUndefined(this.gridStyle.record.fontSize) ? this.gridStyle.record.fontSize : 9.75;
            var fontStyle = this.getFontStyle(this.gridStyle.record);
            var font = new PdfStandardFont(fontFamily, fontSize, fontStyle);
            if (!isNullOrUndefined(this.gridStyle.record.font)) {
                font = this.gridStyle.record.font;
            }
            row.style.setFont(font);
            var pdfColor = new PdfColor();
            if (!isNullOrUndefined(this.gridStyle.record.fontColor)) {
                var penBrushColor = this.pdfExportHelper.hexDecToRgb(this.gridStyle.record.fontColor);
                pdfColor = new PdfColor(penBrushColor.r, penBrushColor.g, penBrushColor.b);
            }
            row.style.setTextBrush(new PdfSolidBrush(pdfColor));
        }
        var borderRecord = this.gridStyle && this.gridStyle.record &&
            this.gridStyle.record.border ? this.getBorderStyle(this.gridStyle.record.border) : border;
        row.style.setBorder(borderRecord);
        return row;
    };
    /**
     * Method to perform pdf export.
     *
     * @param  {PdfExportProperties} pdfExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {Object} pdfDoc - Defined the PDF document if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<Object>}
     * @hidden
     */
    PDFExport.prototype.exportToPDF = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        var _this = this;
        var _a;
        this.engine = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        this.gridStyle = !isNullOrUndefined(this.exportProperties.pdfExportProperties) ?
            this.exportProperties.pdfExportProperties.theme : undefined;
        var eventParams = this.applyEvent();
        if (!isNullOrUndefined(pdfDoc)) {
            eventParams.document = pdfDoc;
        }
        var headerStyle = this.getStyle();
        var fileName = !isNullOrUndefined(this.exportProperties) && !isNullOrUndefined(this.exportProperties.fileName) ?
            this.exportProperties.fileName : (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.fileName)) ?
            pdfExportProperties.fileName : 'default';
        var indent = this.parent.renderModule.maxIndent ? this.parent.renderModule.maxIndent : 5;
        var firstColumnWidth = 100 + (indent * 20);
        var size = Math.floor((540 - firstColumnWidth) / 90) + 1;
        /** Fill data and export */
        var dataCollIndex = 0;
        var pivotValues = eventParams.args.pivotValues[dataCollIndex];
        if (this.exportProperties.columnSize || this.exportProperties.width || this.exportProperties.height) {
            size = this.exportProperties.columnSize > 0 ? this.exportProperties.columnSize : pivotValues[0].length;
        }
        this.exportProperties.allowRepeatHeader =
            this.exportProperties.allowRepeatHeader === true || isNullOrUndefined(this.exportProperties.allowRepeatHeader);
        var allowRepeatHeader = this.exportProperties.allowRepeatHeader ? this.exportProperties.allowRepeatHeader : false;
        var isHeaderRepeatEligible = allowRepeatHeader && size > 1;
        var rowMaxLevel;
        if (this.parent.isTabular) {
            rowMaxLevel = this.parent.engineModule.rowMaxLevel;
            size = rowMaxLevel + 1 < size ? size : rowMaxLevel + 2;
        }
        for (var vLen = 0; isHeaderRepeatEligible && vLen < pivotValues.length; vLen++) {
            for (var vCnt = size; pivotValues[vLen] && vCnt < pivotValues[vLen].length; vCnt += size) {
                var rowHeaderLevel = this.parent.isTabular
                    ? pivotValues[vLen].slice(0, rowMaxLevel + 1) : [pivotValues[vLen][0]];
                (_a = pivotValues[vLen]).splice.apply(_a, [vCnt, 0].concat(rowHeaderLevel));
            }
        }
        var colLength = pivotValues && pivotValues.length > 0 ? pivotValues[0].length : 0;
        var integratedCnt = 0;
        do {
            if (!isNullOrUndefined(pdfExportProperties)) {
                this.exportProperties.header = (!isNullOrUndefined(pdfExportProperties.header) &&
                    !isNullOrUndefined(pdfExportProperties.header.contents) && !isNullOrUndefined(pdfExportProperties.header.contents[0].value))
                    ? pdfExportProperties.header.contents[0].value : this.exportProperties.header;
                this.exportProperties.footer = (!isNullOrUndefined(pdfExportProperties.footer) &&
                    !isNullOrUndefined(pdfExportProperties.footer.contents) && !isNullOrUndefined(pdfExportProperties.footer.contents[0].value))
                    ? pdfExportProperties.footer.contents[0].value : this.exportProperties.footer;
            }
            var page = this.addPage(eventParams, pdfExportProperties);
            var pdfGrid = new PdfGrid();
            var pageSize = size > 0 ? size : 5;
            if (pivotValues && pivotValues.length > 0) {
                pdfGrid.columns.add(pivotValues[0].length - integratedCnt >= pageSize ? pageSize : pivotValues[0].length - integratedCnt);
                var rowLen = pivotValues.length;
                var actualrCnt = 0;
                var maxLevel = 0;
                var columnWidth = 0;
                for (var rCnt = 0; rCnt < rowLen; rCnt++) {
                    if (pivotValues[rCnt]) {
                        var isColHeader = !(pivotValues[rCnt][0] && pivotValues[rCnt][0].axis === 'row');
                        var colLen = pivotValues[rCnt].length > (integratedCnt + pageSize) ? (integratedCnt + pageSize)
                            : pivotValues[rCnt].length;
                        var rowCount = 0;
                        if (isColHeader) {
                            pdfGrid.headers.add(1);
                        }
                        var pdfGridRow = !isColHeader ? pdfGrid.rows.addRow() : pdfGrid.headers.getHeader(actualrCnt);
                        if (isColHeader) {
                            pdfGridRow.style.setBorder(headerStyle.border);
                            if (headerStyle.font) {
                                pdfGridRow.style.setFont(headerStyle.font);
                            }
                            pdfGridRow.style.setTextBrush(headerStyle.brush);
                        }
                        else {
                            this.setRecordThemeStyle(pdfGridRow, headerStyle.border);
                        }
                        var localCnt = 0;
                        var isEmptyRow = true;
                        for (var cCnt = integratedCnt; cCnt < colLen; cCnt++) {
                            var isValueCell = false;
                            if (pivotValues[rCnt][cCnt] && pivotValues[rCnt][cCnt].rowSpan !== 0) {
                                var pivotCell = pivotValues[rCnt][cCnt];
                                var cellValue = pivotCell.formattedText;
                                cellValue = (this.parent.dataSourceSettings.rows.length === 0 || this.parent.dataSourceSettings.columns.length === 0) ? this.parent.getValuesHeader(pivotCell, 'value') : cellValue;
                                cellValue = pivotCell.type === 'grand sum' ? (this.parent.dataSourceSettings.rows.length === 0 || this.parent.dataSourceSettings.columns.length === 0) ? this.parent.getValuesHeader(pivotCell, 'grandTotal') :
                                    this.parent.localeObj.getConstant('grandTotal') : (pivotCell.type === 'sum' ?
                                    cellValue.toString().replace('Total', this.parent.localeObj.getConstant('total')) : cellValue);
                                if (!(pivotCell.level === -1 && !pivotCell.rowSpan)) {
                                    if (!(pivotCell.level === -1 && !pivotCell.rowSpan)) {
                                        pdfGridRow.cells.getCell(localCnt).columnSpan = pivotCell.colSpan ?
                                            (pageSize - localCnt < pivotCell.colSpan ? pageSize - localCnt : pivotCell.colSpan) : 1;
                                        if ((isColHeader && pivotCell.rowSpan && pivotCell.rowSpan > 1) ||
                                            (!isColHeader && pivotCell.rowSpan && pivotCell.rowSpan > 1 && this.parent.isTabular)) {
                                            pdfGridRow.cells.getCell(localCnt).rowSpan = pivotCell.rowSpan ? pivotCell.rowSpan : 1;
                                        }
                                        pdfGridRow.cells.getCell(localCnt).value = cellValue ? cellValue.toString() : '';
                                    }
                                    if (cellValue !== '') {
                                        isEmptyRow = false;
                                    }
                                }
                                maxLevel = pivotCell.level > maxLevel ? pivotCell.level : maxLevel;
                                isValueCell = pivotCell.axis === 'value';
                                cCnt = cCnt + (pdfGridRow.cells.getCell(localCnt).columnSpan ?
                                    (pdfGridRow.cells.getCell(localCnt).columnSpan - 1) : 0);
                                localCnt = localCnt + (pdfGridRow.cells.getCell(localCnt).columnSpan ?
                                    (pdfGridRow.cells.getCell(localCnt).columnSpan - 1) : 0);
                                if (pivotCell.style) {
                                    pdfGridRow = this.applyStyle(pdfGridRow, pivotCell, localCnt);
                                }
                                var args = {
                                    style: undefined,
                                    pivotCell: pivotCell,
                                    cell: pdfGridRow.cells.getCell(localCnt),
                                    column: pdfGrid.columns.getColumn(localCnt)
                                };
                                this.parent.trigger(events.onPdfCellRender, args);
                                if (pivotCell.axis === 'column') {
                                    args = {
                                        style: args.style,
                                        cell: args.cell,
                                        gridCell: args.pivotCell
                                    };
                                    this.parent.trigger(events.pdfHeaderQueryCellInfo, args);
                                    pdfGridRow.cells.getCell(localCnt).value = args.gridCell.formattedText ?
                                        args.gridCell.formattedText : cellValue;
                                }
                                else {
                                    args = {
                                        style: args.style,
                                        cell: args.cell,
                                        column: undefined,
                                        data: args.pivotCell,
                                        value: cellValue
                                    };
                                    this.parent.trigger(events.pdfQueryCellInfo, args);
                                    pdfGridRow.cells.getCell(localCnt).value = args.value ? args.value : cellValue;
                                }
                                if (args.style) {
                                    this.processCellStyle(pdfGridRow.cells.getCell(localCnt), args);
                                }
                            }
                            else {
                                var args = {
                                    style: undefined,
                                    pivotCell: undefined,
                                    cell: pdfGridRow.cells.getCell(localCnt),
                                    column: pdfGrid.columns.getColumn(localCnt)
                                };
                                this.parent.trigger(events.onPdfCellRender, args);
                                columnWidth = args.column.width;
                                var pivotCell = { formattedText: '' };
                                if (pivotCell.axis === 'column') {
                                    args = {
                                        style: args.style,
                                        cell: args.cell,
                                        gridCell: args.pivotCell
                                    };
                                    this.parent.trigger(events.pdfHeaderQueryCellInfo, args);
                                }
                                if (args.style) {
                                    this.processCellStyle(pdfGridRow.cells.getCell(localCnt), args);
                                }
                                pdfGridRow.cells.getCell(localCnt).value = '';
                                if (this.parent.isTabular && rowCount === 0) {
                                    if (cCnt === 0 && isColHeader && this.parent.dataSourceSettings.columns &&
                                        this.parent.dataSourceSettings.columns.length > 0) {
                                        pdfGrid.headers.getHeader(0).cells.getCell(0).rowSpan =
                                            Object.keys(this.engine.headerContent).length + 1;
                                        pdfGrid.headers.getHeader(0).cells.getCell(0).columnSpan = this.parent.engineModule.rowMaxLevel + 1;
                                    }
                                    else if (cCnt !== 0 && isColHeader && this.parent.dataSourceSettings.columns &&
                                        this.parent.dataSourceSettings.columns.length > 0 &&
                                        pdfGrid.headers.getHeader(0).cells.getCell(0).rowSpan <
                                            Object.keys(this.engine.headerContent).length) {
                                        pdfGrid.headers.getHeader(0).cells.getCell(0).rowSpan =
                                            Object.keys(this.engine.headerContent).length;
                                        pdfGrid.headers.getHeader(0).cells.getCell(0).columnSpan = this.parent.engineModule.rowMaxLevel + 1;
                                    }
                                    rowCount++;
                                }
                                else {
                                    if (cCnt === 0 && isColHeader && this.parent.dataSourceSettings.columns &&
                                        this.parent.dataSourceSettings.columns.length > 0) {
                                        pdfGrid.headers.getHeader(0).cells.getCell(0).rowSpan++;
                                    }
                                    else if (cCnt !== 0 && isColHeader && this.parent.dataSourceSettings.columns &&
                                        this.parent.dataSourceSettings.columns.length > 0 &&
                                        pdfGrid.headers.getHeader(0).cells.getCell(0).rowSpan <
                                            Object.keys(this.engine.headerContent).length) {
                                        pdfGrid.headers.getHeader(0).cells.getCell(0).rowSpan++;
                                    }
                                }
                            }
                            var stringFormat = new PdfStringFormat();
                            if (this.parent.dataType === 'olap') {
                                var indent_1 = (!isColHeader && localCnt === 0 &&
                                    pivotValues[rCnt][cCnt]) ?
                                    (this.parent.renderModule.indentCollection[pivotValues[rCnt][cCnt]
                                        .rowIndex]) : 0;
                                stringFormat.paragraphIndent = indent_1 * 15;
                                maxLevel = maxLevel > indent_1 ? maxLevel : indent_1;
                            }
                            else {
                                stringFormat.paragraphIndent = 0;
                                if ((!isColHeader && localCnt === 0 && pivotValues[rCnt][cCnt] &&
                                    pivotValues[rCnt][cCnt].level !== -1)) {
                                    var cell = pivotValues[rCnt][cCnt];
                                    var levelName = cell.valueSort ? cell.valueSort.levelName.toString() : '';
                                    var memberPos = cell.actualText ?
                                        cell.actualText.toString().split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter)
                                            .length : 0;
                                    var levelPosition = levelName.split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length -
                                        (memberPos ? memberPos - 1 : memberPos);
                                    var level = levelPosition ? (levelPosition - 1) : 0;
                                    stringFormat.paragraphIndent = level * 10;
                                }
                            }
                            stringFormat.alignment = isValueCell ? PdfTextAlignment.Right : PdfTextAlignment.Left;
                            stringFormat.lineAlignment = PdfVerticalAlignment.Middle;
                            pdfGridRow.cells.getCell(localCnt).style.stringFormat = stringFormat;
                            localCnt++;
                        }
                        if (isEmptyRow) {
                            pdfGridRow.height = 16;
                        }
                        actualrCnt++;
                    }
                }
                pdfGrid.columns.getColumn(0).width = columnWidth > 0 ? columnWidth : 100 + (maxLevel * 20);
            }
            if (integratedCnt === 0 && this.parent.dataSourceSettings.columns && this.parent.dataSourceSettings.columns.length > 0) {
                pdfGrid.headers.getHeader(0).cells.getCell(0).rowSpan--;
            }
            pdfGrid.draw(page, new PointF(10, 20));
            integratedCnt = integratedCnt + pageSize;
            if (integratedCnt >= colLength && eventParams.args.pivotValues.length > (dataCollIndex + 1)) {
                dataCollIndex++;
                pivotValues = eventParams.args.pivotValues[dataCollIndex];
                colLength = pivotValues && pivotValues.length > 0 ? pivotValues[0].length : 0;
                integratedCnt = 0;
            }
        } while (integratedCnt < colLength);
        return new Promise(function (resolve) {
            var blobData;
            if (isBlob || isMultipleExport) {
                if (isBlob) {
                    blobData = eventParams.document.save();
                }
            }
            else {
                eventParams.document.save(fileName + '.pdf');
                eventParams.document.destroy();
            }
            var exportCompleteEventArgs = {
                type: 'PDF',
                promise: isBlob ? blobData : null
            };
            _this.parent.trigger(events.exportComplete, exportCompleteEventArgs);
            resolve(eventParams.document);
        });
    };
    PDFExport.prototype.applyStyle = function (pdfGridRow, pivotCell, localCnt) {
        var color = this.parent.conditionalFormattingModule.hexToRgb(pivotCell.style.backgroundColor);
        var brush = new PdfSolidBrush(new PdfColor(color.r, color.g, color.b));
        pdfGridRow.cells.getCell(localCnt).style.backgroundBrush = brush;
        var size = Number(pivotCell.style.fontSize.split('px')[0]);
        var font = new PdfStandardFont(PdfFontFamily.TimesRoman, size, PdfFontStyle.Regular);
        pdfGridRow.cells.getCell(localCnt).style.font = font;
        color = this.parent.conditionalFormattingModule.hexToRgb(pivotCell.style.color);
        brush = new PdfSolidBrush(new PdfColor(color.r, color.g, color.b));
        pdfGridRow.cells.getCell(localCnt).style.textBrush = brush;
        return pdfGridRow;
    };
    PDFExport.prototype.getFontFamily = function (family) {
        switch (family) {
            case 'TimesRoman':
                return 2;
            case 'Courier':
                return 1;
            case 'Symbol':
                return 3;
            case 'ZapfDingbats':
                return 4;
            default:
                return 0;
        }
    };
    PDFExport.prototype.getFont = function (theme) {
        if (theme.style.font) {
            return theme.style.font;
        }
        var fontSize = (theme.cell['cellStyle'].font &&
            theme.cell['cellStyle'].font.fontSize) ? theme.cell['cellStyle'].font.fontSize :
            (!isNullOrUndefined(theme.style.fontSize)) ? (theme.style.fontSize * 0.75) : 9.75;
        var fontFamily = (!isNullOrUndefined(theme.style.fontFamily)) ?
            (this.getFontFamily(theme.style.fontFamily)) : PdfFontFamily.TimesRoman;
        var fontStyle = PdfFontStyle.Regular;
        if (!isNullOrUndefined(theme.style.bold) && theme.style.bold) {
            fontStyle |= PdfFontStyle.Bold;
        }
        if (!isNullOrUndefined(theme.style.italic) && theme.style.italic) {
            fontStyle |= PdfFontStyle.Italic;
        }
        if (!isNullOrUndefined(theme.style.underline) && theme.style.underline) {
            fontStyle |= PdfFontStyle.Underline;
        }
        if (!isNullOrUndefined(theme.style.strikeout) && theme.style.strikeout) {
            fontStyle |= PdfFontStyle.Strikeout;
        }
        return new PdfStandardFont(fontFamily, fontSize, fontStyle);
    };
    PDFExport.prototype.processCellStyle = function (gridCell, arg) {
        if (!isNullOrUndefined(arg.style.backgroundColor)) {
            var backColor = this.pdfExportHelper.hexDecToRgb(arg.style.backgroundColor);
            gridCell.style.backgroundBrush = new PdfSolidBrush(new PdfColor(backColor.r, backColor.g, backColor.b));
        }
        if (!isNullOrUndefined(arg.style.textBrushColor)) {
            var textBrushColor = this.pdfExportHelper.hexDecToRgb(arg.style.textBrushColor);
            gridCell.style.textBrush = new PdfSolidBrush(new PdfColor(textBrushColor.r, textBrushColor.g, textBrushColor.b));
        }
        if (!isNullOrUndefined(arg.style.textPenColor)) {
            var textColor = this.pdfExportHelper.hexDecToRgb(arg.style.textPenColor);
            gridCell.style.textPen = new PdfPen(new PdfColor(textColor.r, textColor.g, textColor.b));
        }
        if (!isNullOrUndefined(arg.style.fontFamily) || !isNullOrUndefined(arg.style.fontSize) || !isNullOrUndefined(arg.style.bold) ||
            !isNullOrUndefined(arg.style.italic) || !isNullOrUndefined(arg.style.underline) || !isNullOrUndefined(arg.style.strikeout)) {
            gridCell.style.font = this.getFont(arg);
        }
        if (!isNullOrUndefined(arg.style.border)) {
            var border = new PdfBorders();
            var borderWidth = arg.style.border.width;
            // set border width
            var width = (!isNullOrUndefined(borderWidth) && typeof borderWidth === 'number') ? (borderWidth * 0.75) : (undefined);
            // set border color
            var color = new PdfColor(196, 196, 196);
            if (!isNullOrUndefined(arg.style.border.color)) {
                var borderColor = this.pdfExportHelper.hexDecToRgb(arg.style.border.color);
                color = new PdfColor(borderColor.r, borderColor.g, borderColor.b);
            }
            var pen = new PdfPen(color, width);
            // set border dashStyle 'Solid <default>, Dash, Dot, DashDot, DashDotDot'
            if (!isNullOrUndefined(arg.style.border.dashStyle)) {
                pen.dashStyle = this.pdfExportHelper.getDashStyle(arg.style.border.dashStyle);
            }
            border.all = pen;
            gridCell.style.borders = border;
        }
    };
    PDFExport.prototype.applyEvent = function () {
        /** Event trigerring */
        var clonedValues;
        var mdxQuery;
        var currentPivotValues = PivotExportUtil.getClonedPivotValues(this.engine.pivotValues);
        if (this.parent.exportAllPages && (this.parent.enableVirtualization || this.parent.enablePaging) && this.parent.dataSourceSettings.mode !== 'Server') {
            var pageSettings = this.engine.pageSettings;
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
            pivotValues: [clonedValues]
        };
        this.parent.trigger(events.enginePopulated, args);
        this.document = new PdfDocument();
        return { document: this.document, args: args };
    };
    PDFExport.prototype.updateOlapPageSettings = function (isUpdate) {
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
     * To destroy the pdf export module.
     *
     * @returns {void}
     * @hidden
     */
    PDFExport.prototype.destroy = function () {
        if (this.engine) {
            this.engine = null;
        }
        if (this.exportProperties) {
            this.exportProperties = null;
        }
        if (this.document) {
            this.document = null;
        }
        if (this.pdfExportHelper) {
            this.pdfExportHelper = null;
        }
    };
    return PDFExport;
}());
export { PDFExport };
