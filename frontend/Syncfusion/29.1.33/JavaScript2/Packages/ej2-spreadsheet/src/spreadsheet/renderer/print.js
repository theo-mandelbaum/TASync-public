import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { getSheetIndex, getColumnsWidth } from '../../workbook/index';
import { checkIsFormula, workbookFormulaOperation } from '../../workbook/index';
import { getColumnHeaderText, getIndexesFromAddress, updateSheetFromDataSource, getCellAddress } from '../../workbook/index';
import { getColIdxFromClientX, getBorderWidth, getRowIdxFromClientY, getTextWidth, getDPRValue } from '../common/index';
/**
 * This class supports the printing functionality in Spreadsheet.
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for Print module
     *
     * @param {Spreadsheet} parent - Specifies the spreadsheet instance.
     */
    function Print(parent) {
        this.totalSheetCount = [];
        this.workbookActiveSheetCount = 0;
        this.defaultCellWidth = 64;
        this.defaultCellHeight = 19;
        this.pageCounts = [];
        this.initialRowCount = 0;
        this.chartHeight = 0;
        this.columnIndex = 0;
        this.rowIndex = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.multipleCanvasDataURL = [];
        this.chartElements = [];
        this.totalCharts = 0;
        this.isChartLoaded = false;
        this.chartLoadedCount = 0;
        this.isImageLoaded = false;
        this.totalImages = 0;
        this.imageLoadedCount = 0;
        this.endRow = 0;
        this.isColumn = true;
        this.startNewPageCount = 0;
        this.allowTimer = false;
        this.parent = parent;
    }
    /**
     * To create the print module.
     *
     * @param {Spreadsheet} spreadsheet - Specifies the spreadsheet instance.
     * @param {PrintOptions} printOptions - Specifies the print options.
     * @returns {void} - To create the print module.
     * @private
     */
    Print.prototype.print = function (spreadsheet, printOptions) {
        var _this = this;
        spreadsheet.isPrintingProcessing = true;
        this.multipleCanvasDataURL = [];
        this.chartElements = [];
        if (printOptions.type === 'ActiveSheet') {
            var sheet = spreadsheet.sheets[spreadsheet.activeSheetIndex];
            this.activeSheetPrint(spreadsheet, sheet, printOptions, spreadsheet.activeSheetIndex);
        }
        else {
            this.totalSheetCount = [];
            this.workbookActiveSheetCount = 1;
            for (var i = 0; i < spreadsheet.sheets.length; i++) {
                if (spreadsheet.sheets[i].state === 'Visible') {
                    this.totalSheetCount.push(i);
                    if (this.totalSheetCount.length > 1 && this.parent.sheets[i].ranges.length > 0) {
                        var isDatasourceAvailable = this.parent.sheets[i].ranges.some(function (range) {
                            return !isNullOrUndefined(range.dataSource);
                        });
                        if (isDatasourceAvailable) {
                            this.allowTimer = true;
                            var sheet = spreadsheet.sheets[i];
                            var address = getCellAddress(0, 0) + ':' + getCellAddress(sheet.rowCount - 1, sheet.colCount - 1);
                            var cellIndexes = getIndexesFromAddress(address);
                            this.parent.notify(updateSheetFromDataSource, { sheet: sheet, indexes: cellIndexes });
                        }
                    }
                }
            }
            if (this.allowTimer) {
                this.allowTimer = false;
                setTimeout(function () {
                    _this.activeSheetPrint(spreadsheet, spreadsheet.sheets[_this.totalSheetCount[0]], printOptions, _this.totalSheetCount[0]);
                }, 2000);
            }
            else {
                this.activeSheetPrint(spreadsheet, spreadsheet.sheets[this.totalSheetCount[0]], printOptions, this.totalSheetCount[0]);
            }
        }
    };
    Print.prototype.updateChartRowAndColumnIndices = function (spreadsheet, sheetIndex) {
        var sheet = spreadsheet.sheets[sheetIndex];
        this.rowIndex = sheet.usedRange.rowIndex;
        this.columnIndex = sheet.usedRange.colIndex;
        if (spreadsheet.chartColl.length > 0) {
            for (var i = 0; i < spreadsheet.chartColl.length; i++) {
                var chart = spreadsheet.chartColl[i];
                var sheetIdx = getSheetIndex(spreadsheet, chart.range.substring(0, chart.range.lastIndexOf('!')));
                if (sheetIndex === sheetIdx) {
                    var chartleft = { clientX: chart.left, isImage: true };
                    var chartTop = { clientY: chart.top, isImage: true };
                    spreadsheet.notify(getRowIdxFromClientY, chartTop);
                    spreadsheet.notify(getColIdxFromClientX, chartleft);
                    if (chartTop.clientY > sheet.usedRange.rowIndex) {
                        this.rowIndex = Math.max(this.rowIndex, chartTop.clientY);
                    }
                    if (chartleft.clientX > sheet.usedRange.colIndex) {
                        this.columnIndex = Math.max(this.columnIndex, chartleft.clientX);
                    }
                }
            }
        }
    };
    Print.prototype.activeSheetPrint = function (spreadsheet, sheet, printOptions, sheetIndex) {
        this.updateChartRowAndColumnIndices(spreadsheet, sheetIndex);
        this.pageCounts = this.calculatePageCount(sheet, 1000, printOptions.allowRowColumnHeader);
        var canvas;
        var context;
        this.initialRowCount = 0;
        this.parent.currentPrintSheetIndex = sheetIndex;
        this.endRow = this.rowIndex + 1;
        this.processCell(0, 0, this.endRow, 2, [], context, canvas, sheet, this, 0, 0, true, sheetIndex, printOptions);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Print.prototype.processCell = function (page, rowsCount, rowCount, currentX, currentY, context, canvas, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sheet, printInstance, pageHeight, height, isCanvasDataUrl, sheetIndex, printOptions) {
        var _this = this;
        if (pageHeight === void 0) { pageHeight = 0; }
        if (height === void 0) { height = 0; }
        if (isCanvasDataUrl === void 0) { isCanvasDataUrl = true; }
        var defaultCellSpace = 0;
        var allowColumnAndRow = printOptions.allowRowColumnHeader;
        var headerWidth = 37;
        var lineHeight = 0;
        this.chartHeight = 0;
        var isExtraLine = false;
        for (var i = page; i < this.pageCounts.length; i++) {
            this.chartLoadedCount = 0;
            this.totalCharts = 0;
            this.imageLoadedCount = 0;
            this.totalImages = 0;
            pageHeight += (i === 0 ? 0 : 1100);
            // Create canvas element
            canvas = document.createElement('canvas');
            context = canvas.getContext('2d');
            canvas.width = 1000;
            canvas.height = 1100;
            context.font = '11pt Calibri';
            context.textBaseline = 'bottom';
            context['index'] = i;
            context['width'] = 1000;
            if (isCanvasDataUrl || (!this.isImageLoaded && !this.isChartLoaded)) {
                currentY = [];
                currentX = 0;
                height = 0;
            }
            // Loop through rows
            for (var j = rowsCount; j < this.endRow; j++) {
                isCanvasDataUrl = true;
                var borderOfHeaderText = false;
                this.isColumn = this.isColumn ? this.isColumn : (j === 0);
                var bottomStyle = { borderBottom: '1px solid black' };
                var rowHeight = (sheet.rows[j] && sheet.rows[j].height || this.defaultCellHeight);
                this.initialRowCount = j;
                currentX = defaultCellSpace;
                var start = i === 0 ? 0 : this.pageCounts[i - 1] + 1;
                var end = this.pageCounts[i];
                height += (isNullOrUndefined(sheet.rows[j]) ? this.defaultCellHeight : rowHeight + (j === 0 && allowColumnAndRow
                    ? this.defaultCellHeight : 0));
                var cellHeight = isNullOrUndefined(sheet.rows[j]) ? this.defaultCellHeight :
                    sheet.rows[j] && sheet.rows[j].height || this.defaultCellHeight;
                if (height > 1080) {
                    this.startNewPageCount = j;
                    lineHeight = allowColumnAndRow ? rowHeight + (j === 0 && allowColumnAndRow ? this.defaultCellHeight : 0) : 0;
                    borderOfHeaderText = false;
                    this.isColumn = true;
                    if (this.isImageLoaded || this.isChartLoaded) {
                        break;
                    }
                    pageHeight += 1100;
                    if (isCanvasDataUrl) {
                        this.multipleCanvasDataURL.push(canvas.toDataURL());
                    }
                    isCanvasDataUrl = true;
                    canvas = document.createElement('canvas');
                    context = canvas.getContext('2d');
                    canvas.width = 1000;
                    canvas.height = 1100;
                    context.font = '11pt Calibri';
                    context.textBaseline = 'bottom';
                    context['index'] = i;
                    context['width'] = 1000;
                    for (var m = 0; m < currentY.length; m++) {
                        if (currentY[m] !== undefined) {
                            currentY[m] -= height - cellHeight;
                        }
                    }
                    height = (allowColumnAndRow || printOptions.allowGridLines) ?
                        rowHeight + (allowColumnAndRow ? this.defaultCellHeight : 0) : rowHeight;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var style = { borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black' };
                var rightStyle = { borderRight: '1px solid black' };
                if (allowColumnAndRow && this.isColumn) {
                    for (var k = start; k <= end; k++) {
                        var columnText = getColumnHeaderText(k + 1);
                        var columnIndex = k === start ? 2 : 1;
                        context.font = '11pt Calibri';
                        for (var m = 0; m < columnIndex; m++) {
                            var titleWidth = (m === 0 && columnIndex === 2) ? headerWidth : (sheet.columns[k] &&
                                sheet.columns[k].hidden ? 0 : ((sheet.columns[k] &&
                                sheet.columns[k].width) || this.defaultCellWidth));
                            titleWidth = currentX + titleWidth > 1000 ? titleWidth - 1 - (currentX + titleWidth - 1000) :
                                titleWidth;
                            if (titleWidth !== 0) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                var textMetrics = context.measureText(columnText);
                                var textWidth = textMetrics.width;
                                var locationX = printInstance.calculateTextPosition(textWidth, titleWidth, currentX, 'Center');
                                var locationY = this.defaultCellHeight;
                                context.fillText(k === start && m === 0 ? '' : columnText, locationX, locationY);
                                printInstance.drawBorder(context, style, currentX, 0, titleWidth, this.defaultCellHeight);
                                currentX += titleWidth;
                                currentY[k] = this.defaultCellHeight;
                                if (k === end && (columnIndex === 2 ? m === 1 : m === 0)) {
                                    this.isColumn = !(k === end);
                                    currentX = 0;
                                }
                            }
                            else if (k === end) {
                                this.isColumn = false;
                                currentX = 0;
                            }
                        }
                    }
                }
                if (!isNullOrUndefined(sheet.rows[j]) && (isNullOrUndefined(sheet.rows[j].hidden) ||
                    !sheet.rows[j].hidden)) {
                    if (isExtraLine) {
                        var extaSpace = sheet.rows.slice(j, j + sheet.rows.length - j).map(function (row) {
                            return (row && row.height) || _this.defaultCellHeight;
                        }).reduce(function (accumulator, currentValue) {
                            return accumulator + (currentValue || _this.defaultCellHeight);
                        }, 0);
                        if (canvas.height > (height + (this.chartHeight - extaSpace))) {
                            this.endRow += Math.ceil((this.chartHeight - extaSpace) / 19);
                        }
                        else {
                            this.endRow += Math.ceil((canvas.height - (height + extaSpace)) / 19);
                        }
                        isExtraLine = false;
                    }
                    borderOfHeaderText = this.endRow === sheet.rows.length ? ((height + (sheet.rows[j + 1] ?
                        (sheet.rows[j + 1].height || this.defaultCellHeight) : this.defaultCellHeight)) +
                        (j === 0 && allowColumnAndRow ? this.defaultCellHeight : 0) > 1080) || (j === sheet.rows.length - 1) : false;
                    var _loop_1 = function (k) {
                        var cell = sheet.rows[j] && !isNullOrUndefined(sheet.rows[j].cells) &&
                            sheet.rows[j].cells[k];
                        if (!isNullOrUndefined(cell) && !isNullOrUndefined(cell.style)) {
                            style = this_1.setBorderStyle(cell, style);
                        }
                        if (isNullOrUndefined(sheet.columns[k]) || isNullOrUndefined(sheet.columns[k].hidden) ||
                            !sheet.columns[k].hidden) {
                            var isColumnSpan = !isNullOrUndefined(sheet.rows[j].cells) &&
                                !isNullOrUndefined(sheet.rows[j].cells[k]) &&
                                !isNaN(sheet.rows[j].cells[k].colSpan) &&
                                start > k + sheet.rows[j].cells[k].colSpan;
                            var isRowSpan = !isNullOrUndefined(sheet.rows[j].cells) &&
                                !isNullOrUndefined(sheet.rows[j].cells[k]) &&
                                !isNaN(sheet.rows[j].cells[k].rowSpan) &&
                                !(j + sheet.rows[j].cells[k].rowSpan > this_1.startNewPageCount) &&
                                this_1.startNewPageCount !== 0;
                            var cellText_1 = '';
                            var cellWidthSpan_1;
                            var cellWidth_1;
                            var cellRowSpan = !isNullOrUndefined(cell) ? (isNaN(cell.rowSpan) || isColumnSpan || isRowSpan) ? 1 :
                                Math.max(cell.rowSpan, 0) : 1;
                            currentY[k] = (isNaN(currentY[k]) ? defaultCellSpace : currentY[k]);
                            if (allowColumnAndRow && k === start) {
                                context.font = '11pt Calibri';
                                var rowHeaderHeight = currentY[k];
                                if (cellRowSpan > 0) {
                                    for (var o = 0; o < (cellRowSpan === 0 ? 1 : cellRowSpan); o++) {
                                        currentX = 0;
                                        rowHeaderHeight += (o === 0 ? 0 : (sheet.rows[j + o] && sheet.rows[j + o - 1].height ||
                                            this_1.defaultCellHeight));
                                        printInstance.rowHeaderText((j + 1 + o).toString(), context, printInstance, headerWidth, currentX, style, rowHeaderHeight, sheet.rows[j + o].height || this_1.defaultCellHeight);
                                        currentX += headerWidth;
                                    }
                                }
                                else {
                                    currentX = 0;
                                    currentX += headerWidth;
                                }
                            }
                            if (!isNullOrUndefined(cell) && cell) {
                                var fontSize = (cell.style ? cell.style.fontSize || '11pt' : '11pt');
                                var color_1 = (cell.style ? cell.style.color || '#000000' : '#000000');
                                if (!isNaN(sheet.rows[j].cells[k].rowSpan) &&
                                    sheet.rows[j].cells[k].rowSpan > 1) {
                                    if (isNaN(sheet.rows[j + 1].cells[k].rowSpan)) {
                                        this_1.parent.merge("" + getColumnHeaderText(k + 1) + (j + 1) + ":" + getColumnHeaderText(k + 1) + (j + sheet.rows[j].cells[k].rowSpan - 1));
                                    }
                                }
                                if (!isNaN(sheet.rows[j].cells[k].colSpan) &&
                                    sheet.rows[j].cells[k].colSpan > 1) {
                                    if (!isNullOrUndefined(sheet.rows[j + 1]) && !isNullOrUndefined(sheet.rows[j + 1].cells) &&
                                        sheet.rows[j + 1].cells.length > 0 && (!isNullOrUndefined(sheet.rows[j + 1].cells[k]) &&
                                        isNaN(sheet.rows[j + 1].cells[k].colSpan))) {
                                        this_1.parent.merge('' + getColumnHeaderText(k + 1) + (j + 1) + ':' +
                                            getColumnHeaderText(k + 1 + sheet.rows[j].cells[k].colSpan - 1) + (j + 1));
                                    }
                                    else if (isNullOrUndefined(sheet.rows[j].cells[k + 1].colSpan)) {
                                        for (var m = 1; m < sheet.rows[j].cells[k].colSpan; m++) {
                                            sheet.rows[j].cells[k + m]['colSpan'] = -m;
                                        }
                                    }
                                }
                                cellWidthSpan_1 = (isNaN(sheet.rows[j].cells[k].colSpan) || isColumnSpan) ? 1 :
                                    Math.max(sheet.rows[j].cells[k].colSpan, 0);
                                if (sheet.rows[j].cells[k].rowSpan && !isColumnSpan &&
                                    sheet.rows[j].cells[k].rowSpan < 0) {
                                    // eslint-disable-next-line max-len
                                    var colSpan = sheet.rows[j + sheet.rows[j].cells[k].rowSpan].cells[k].colSpan;
                                    cellWidthSpan_1 = colSpan ? colSpan : cellWidthSpan_1;
                                }
                                if ((k === start || (k > 0 && sheet.columns && sheet.columns[k - 1] &&
                                    sheet.columns[k - 1].hidden && (sheet.rows[j].cells[k - 1] &&
                                    sheet.rows[j].cells[k - 1].colSpan > 1))) &&
                                    cellWidthSpan_1 <= 0) {
                                    cellWidthSpan_1 = 1;
                                }
                                var backgroundColor = (cell.style ? cell.style.backgroundColor || '#ffffff' : '#ffffff');
                                var textAlign = cell.style ? cell.style['textAlign'] : '';
                                context.font = fontSize;
                                context.fillStyle = color_1;
                                var cellWidthSpanArray_1 = [];
                                if (cellWidthSpan_1 > 1) {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    var widthColumn = sheet.columns.slice(k, k + cellWidthSpan_1);
                                    for (var o = 0; o < widthColumn.length; o++) {
                                        cellWidthSpanArray_1.push(widthColumn['hidden'] ? 0 : ((widthColumn[o] && widthColumn[o]['width']) ||
                                            this_1.defaultCellWidth));
                                    }
                                    if (cellWidthSpanArray_1.length === 0) {
                                        cellWidthSpanArray_1.push((this_1.defaultCellWidth * cellWidthSpan_1));
                                    }
                                    else if (cellWidthSpanArray_1.length !== cellWidthSpan_1) {
                                        cellWidthSpanArray_1 = cellWidthSpanArray_1.map(function (value) { return value +
                                            (_this.defaultCellWidth * (cellWidthSpan_1 - 1 - cellWidthSpanArray_1.length)); });
                                    }
                                }
                                cellWidth_1 = cellWidthSpan_1 > 1 ? cellWidthSpanArray_1.reduce(function (acc, width) { return acc + width; }, 0) :
                                    cellWidthSpan_1 === 1 ? (sheet.columns[k] && sheet.columns[k].width ||
                                        this_1.defaultCellWidth) : 0;
                                cellWidth_1 = currentX + cellWidth_1 > 1000 ? cellWidth_1 - 1 - (currentX + cellWidth_1 - 1000) : cellWidth_1;
                                cellHeight = cellRowSpan > 1 ? sheet.rows.slice(j, j + cellRowSpan).map(function (row) { return row.height ||
                                    _this.defaultCellHeight; }).reduce(function (accumulator, currentValue) { return accumulator +
                                    (currentValue || _this.defaultCellHeight); }, 0) : cellRowSpan === 1 ? rowHeight : 0;
                                var verticalAlign = (cell.style ? cell.style['verticalAlign'] || 'Bottom' : 'Bottom').toLowerCase();
                                if (!isNullOrUndefined(cell.image) && cell.image.length > 0) {
                                    this_1.processImages(i, j, cell, canvas, context, height, this_1.endRow, rowHeight, lineHeight, allowColumnAndRow, printOptions, sheet, printInstance, currentX, currentY, pageHeight, sheetIndex);
                                }
                                if (!isNullOrUndefined(cell.chart) && cell.chart.length > 0) {
                                    this_1.handleCharts(i, j, cell, context, canvas, height, this_1.endRow, this_1.initialRowCount, lineHeight, rowHeight, allowColumnAndRow, printOptions, sheet, printInstance, this_1.multipleCanvasDataURL, currentX, currentY, pageHeight, sheetIndex);
                                }
                                if (!isNullOrUndefined(cell.value) || !isNullOrUndefined(cell.formula) ||
                                    !isNullOrUndefined(cell.hyperlink)) {
                                    var position_1;
                                    if (cell.formula && cell.format) {
                                        if (this_1.parent.calculationMode === 'Automatic') {
                                            this_1.parent.notify(workbookFormulaOperation, {
                                                action: 'refreshCalculate', rowIndex: j, colIndex: k,
                                                value: cell.formula, isFormula: checkIsFormula(cell.formula), sheetIndex: sheetIndex
                                            });
                                        }
                                        var numberFormatArgs = {
                                            value: cell.value, format: cell.format,
                                            rowIndex: j, colIndex: k, sheetIndex: this_1.parent.activeSheetIndex,
                                            cell: cell, refresh: true
                                        };
                                        cellText_1 = this_1.parent.workbookNumberFormatModule.getFormattedCell(numberFormatArgs);
                                        position_1 = "" + (textAlign ? textAlign : numberFormatArgs.isRightAlign ? 'Right' : 'Left');
                                    }
                                    else if (cell.format) {
                                        var numberFormatArgs = {
                                            value: cell.value, format: cell.format,
                                            rowIndex: j, colIndex: k, sheetIndex: this_1.parent.activeSheetIndex,
                                            cell: cell, refresh: true
                                        };
                                        cellText_1 = this_1.parent.workbookNumberFormatModule.getFormattedCell(numberFormatArgs);
                                        position_1 = "" + (textAlign ? textAlign : numberFormatArgs.isRightAlign ? 'Right' : 'Left');
                                    }
                                    else if (cell.formula) {
                                        if (this_1.parent.calculationMode === 'Automatic') {
                                            this_1.parent.notify(workbookFormulaOperation, {
                                                action: 'refreshCalculate', rowIndex: j, colIndex: k,
                                                value: cell.formula, isFormula: checkIsFormula(cell.formula), sheetIndex: sheetIndex
                                            });
                                        }
                                        cellText_1 = cell.value;
                                        position_1 = "" + (textAlign ? textAlign : 'Left');
                                    }
                                    else {
                                        if (!isNullOrUndefined(cell.hyperlink)) {
                                            if (isNullOrUndefined(cell.value)) {
                                                cell.value = (!isNullOrUndefined(cell.hyperlink) && typeof cell.hyperlink === 'object') ? cell.hyperlink['address'] : cell.hyperlink || cell.hyperlink['address'];
                                            }
                                            else if (isNullOrUndefined(cell.value) || cell.value === '') {
                                                cell.value = typeof cell.hyperlink === 'object' ? cell.hyperlink['address'] : cell.hyperlink;
                                            }
                                            color_1 = cell.style ? cell.style.color || '#00e' : '#00e';
                                        }
                                        cellText_1 = cell.value;
                                        var isNumber = !isNullOrUndefined(cell.value) && cell.value !== '' ? new RegExp('^[^\\p{L}]*$', 'u').test(cell.value) : false;
                                        position_1 = '' + (textAlign ? textAlign : isNumber ? 'Right' : 'Left');
                                    }
                                    var textSize = (cell.style ? cell.style.fontSize || '11pt' : '11pt');
                                    var fontFamily = (cell.style ? cell.style.fontFamily || 'Calibri' : 'Calibri');
                                    var fontstyle = (cell.style ? cell.style.fontStyle || '' : '');
                                    var fontWeight = (cell.style ? cell.style.fontWeight || 'normal' : 'normal');
                                    context.font = fontstyle + " " + fontWeight + " " + textSize + " " + fontFamily;
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    var textMetrics_1 = context.measureText(cellText_1);
                                    var textWidth_1 = textMetrics_1.width;
                                    // eslint-disable-next-line
                                    var textHeight = textMetrics_1.actualBoundingBoxAscent + textMetrics_1.actualBoundingBoxDescent;
                                    if (cell.wrap) {
                                        var cellLineHeight_1 = this_1.defaultCellHeight < cellHeight ? ((parseInt(textSize.replace('pt', ''), 10) / 72) * 96) : cellHeight;
                                        var endColIdx = cell.colSpan > 1 ? k + cell.colSpan - 1 : k;
                                        var colWidth = getDPRValue(getColumnsWidth(sheet, k, endColIdx) - (4 + (getBorderWidth(j, k, sheet) || 1)), true);
                                        var textLines = this_1.wrapText(cellText_1, colWidth, cell.style, this_1.parent.cellStyle);
                                        var space = (textLines.length === 1) ? cellHeight :
                                            (textLines.length * cellLineHeight_1 === cellHeight) ? cellLineHeight_1 :
                                                (textLines.length * cellLineHeight_1 < cellHeight) ?
                                                    cellHeight - ((textLines.length - 1) * cellLineHeight_1) : cellLineHeight_1;
                                        var startY_1 = currentY[k] + (verticalAlign === 'top' ? cellLineHeight_1 : verticalAlign === 'middle' ?
                                            space > cellLineHeight_1 + (space / 4) ? cellLineHeight_1 + (space / 4) : space : space);
                                        context.save();
                                        context.beginPath();
                                        context.rect(currentX, currentY[k], cellWidth_1, cellHeight);
                                        context.clip();
                                        context.fillStyle = backgroundColor;
                                        context.fillRect(currentX, currentY[k], cellWidth_1, (cellHeight + (verticalAlign === 'top' ? cellLineHeight_1 : 0)));
                                        textLines.forEach(function (line, index) {
                                            context.fillStyle = color_1;
                                            textMetrics_1 = context.measureText(line);
                                            textWidth_1 = textMetrics_1.width;
                                            var locationX = printInstance.calculateTextPosition(textWidth_1, cellWidth_1, currentX, position_1, true);
                                            var locationY = startY_1 + index * cellLineHeight_1;
                                            if (position_1.toLowerCase() === 'right') {
                                                context.textAlign = 'right';
                                                context.fillText(line.trim(), locationX, locationY);
                                            }
                                            else {
                                                context.fillText(line, locationX, locationY);
                                            }
                                            printInstance.textDecoration(cell, context, locationX, locationY, color_1, textMetrics_1, cellText_1, cellWidth_1);
                                        });
                                        context.restore();
                                    }
                                    else {
                                        context.save();
                                        context.beginPath();
                                        context.rect(currentX, currentY[k], cellWidth_1, cellHeight);
                                        context.clip();
                                        context.fillStyle = backgroundColor;
                                        context.fillRect(currentX, currentY[k], cellWidth_1, cellHeight);
                                        context.fillStyle = color_1;
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        var locationX = printInstance.calculateTextPosition(textWidth_1, cellWidth_1, currentX, position_1);
                                        var locationY = currentY[k];
                                        var midValue = (cellHeight / 2) + (textHeight / 2);
                                        if (verticalAlign === 'top') {
                                            context.textBaseline = 'top'; // Set baseline to the top to ensure consistent vertical placement. Baseline at top means no additional offset needed
                                        }
                                        else if (verticalAlign === 'middle' && cellHeight > midValue) {
                                            locationY += midValue; // Center text vertically
                                        }
                                        else {
                                            locationY += cellHeight; // Align text in default or bottom
                                        }
                                        if (!isNullOrUndefined(cell.style)) {
                                            locationY = (!isNullOrUndefined(cell.style.borderBottom) && cell.style.borderBottom.indexOf('double') > -1) || (!isNullOrUndefined(cell.style.borderTop) && cell.style.borderTop.indexOf('double') > -1) ? locationY - 2 : locationY;
                                            locationX = (!isNullOrUndefined(cell.style.borderLeft) && cell.style.borderLeft.indexOf('double') > -1) || (!isNullOrUndefined(cell.style.borderRight) && cell.style.borderRight.indexOf('double') > -1) ? locationX + (position_1 === 'Left' ? 2 : -3) : locationX;
                                        }
                                        context.fillText(cellText_1, locationX, locationY);
                                        context.restore();
                                        printInstance.textDecoration(cell, context, locationX, locationY, color_1, textMetrics_1, cellText_1, cellWidth_1);
                                    }
                                }
                                else {
                                    printInstance.rowHeaderRect(context, currentX, currentY[k], cellWidth_1, cellHeight, backgroundColor);
                                }
                                if (cell.style && (cellWidth_1 > 0 || cellHeight > 0) && (cell.style.borderBottom || cell.style.borderTop
                                    || cell.style.borderLeft || cell.style.borderRight && ((isNullOrUndefined(cell.rowSpan) &&
                                    isNullOrUndefined(cell.colSpan)) || (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan > 0) ||
                                    (!isNullOrUndefined(cell.colSpan) && cell.colSpan > 0)))) {
                                    printInstance.drawBorder(context, cell.style, currentX, (currentY[k] <= 0 ? 2 : currentY[k]), cellWidth_1, cellHeight);
                                }
                            }
                            var currentWidth = (cellWidthSpan_1 <= 0 ? cellWidth_1 : (cellWidth_1 ||
                                (sheet.columns[k] && sheet.columns[k].width) || this_1.defaultCellWidth));
                            if (printOptions.allowGridLines) {
                                style.borderRight = k === end && allowColumnAndRow ? undefined : '1px solid black';
                                printInstance.drawBorder(context, style, currentX, currentY[k], currentWidth, cellHeight);
                            }
                            currentX += currentWidth;
                            var currentYValue = 0;
                            if (cellRowSpan > 1) {
                                currentYValue = currentY[k];
                                for (var m = k; m < k + cellWidthSpan_1; m++) {
                                    var cell_1 = sheet.rows[j] && !isNullOrUndefined(sheet.rows[j].cells) &&
                                        sheet.rows[j].cells[m];
                                    if (cell_1 && !isNullOrUndefined(cell_1.image)) {
                                        this_1.processImages(i, j, cell_1, canvas, context, height, this_1.endRow, rowHeight, lineHeight, allowColumnAndRow, printOptions, sheet, printInstance, currentX, currentY, pageHeight, sheetIndex);
                                    }
                                    else if (cell_1 && !isNullOrUndefined(cell_1.chart)) {
                                        this_1.handleCharts(i, j, cell_1, context, canvas, height, this_1.endRow, this_1.initialRowCount, lineHeight, rowHeight, allowColumnAndRow, printOptions, sheet, printInstance, this_1.multipleCanvasDataURL, currentX, currentY, pageHeight, sheetIndex);
                                    }
                                    if (cell_1.style && m === k && cellHeight > 0 && (cell_1.style.borderBottom || cell_1.style.borderTop ||
                                        cell_1.style.borderLeft || cell_1.style.borderRight)) {
                                        printInstance.drawBorder(context, cell_1.style, currentX, currentY[k], 2, cellHeight);
                                    }
                                    currentY[m] = (isNaN(currentY[m]) ? defaultCellSpace :
                                        currentY[m]) + cellHeight;
                                }
                                k += cellWidthSpan_1 - 1;
                            }
                            if (k === end && allowColumnAndRow) {
                                printInstance.drawBorder(context, rightStyle, currentX - 2, currentY[k] - currentYValue, 2, cellHeight);
                            }
                            if (k === end && allowColumnAndRow && borderOfHeaderText && !isExtraLine) {
                                printInstance.drawBorder(context, bottomStyle, 0, currentY[k] - currentYValue, currentX, cellHeight);
                                borderOfHeaderText = false;
                            }
                            if (cellRowSpan <= 1) {
                                currentY[k] += cellHeight;
                            }
                        }
                        else if (allowColumnAndRow && k === start) {
                            var cellRowSpan = !isNullOrUndefined(cell) ?
                                isNaN(sheet.rows[j].cells[k].rowSpan) ? 1 :
                                    Math.max(sheet.rows[j].cells[k].rowSpan, 0) : 1;
                            currentY[k] = (isNaN(currentY[k]) ? defaultCellSpace : currentY[k]);
                            var rowHeaderHeight = currentY[k];
                            context.font = '11pt Calibri';
                            for (var o = 0; o < cellRowSpan; o++) {
                                currentX = 0;
                                rowHeaderHeight += (o === 0 ? 0 : (sheet.rows[j + o] && sheet.rows[j + o - 1].height ||
                                    this_1.defaultCellHeight));
                                printInstance.rowHeaderText((j + 1 + o).toString(), context, printInstance, headerWidth, currentX, style, rowHeaderHeight, sheet.rows[j + o].height || this_1.defaultCellHeight);
                                currentX += headerWidth;
                            }
                            currentY[k] += cellHeight;
                        }
                        out_k_1 = k;
                    };
                    var this_1 = this, out_k_1;
                    // Loop through cells in a row
                    for (var k = start; k <= end; k++) {
                        _loop_1(k);
                        k = out_k_1;
                    }
                }
                else if (isExtraLine || isNullOrUndefined(sheet.rows[j])) {
                    var style_1 = { borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black' };
                    borderOfHeaderText = ((height + cellHeight) + (j === 0 && allowColumnAndRow ?
                        this.defaultCellHeight : 0) > 1080) || (j === sheet.rows.length - 1) || (j === this.endRow - 1);
                    for (var k = start; k <= end; k++) {
                        var cell = sheet.rows[j] && !isNullOrUndefined(sheet.rows[j].cells) &&
                            sheet.rows[j].cells[k];
                        if (!isNullOrUndefined(cell) && !isNullOrUndefined(cell.style)) {
                            style_1 = this.setBorderStyle(cell, style_1);
                        }
                        if (allowColumnAndRow && k === start) {
                            printInstance.rowHeaderText((j + 1).toString(), context, printInstance, headerWidth, currentX, style_1, currentY[k], this.defaultCellHeight);
                            currentX += headerWidth;
                        }
                        var cellWidth = (sheet.columns[k] && sheet.columns[k].width || this.defaultCellWidth);
                        cellWidth = currentX + cellWidth > 1000 ? cellWidth - 1 - (currentX + cellWidth - 1000) : cellWidth;
                        currentY[k] = (isNaN(currentY[k]) ? defaultCellSpace : currentY[k]);
                        if (printOptions.allowGridLines) {
                            printInstance.drawBorder(context, style_1, currentX, currentY[k], cellWidth, cellHeight);
                        }
                        else if (allowColumnAndRow && !printOptions.allowGridLines && k === end) {
                            printInstance.drawBorder(context, { borderRight: '1px solid black' }, currentX, currentY[k], cellWidth, cellHeight);
                        }
                        currentX += cellWidth;
                        if (k === end && allowColumnAndRow && borderOfHeaderText) {
                            printInstance.drawBorder(context, bottomStyle, 0, currentY[k], currentX, cellHeight);
                            borderOfHeaderText = false;
                        }
                        currentY[k] += cellHeight;
                    }
                }
            }
            if (!this.isImageLoaded && !this.isChartLoaded) {
                if (isCanvasDataUrl && this.endRow > 0) {
                    this.multipleCanvasDataURL.push(canvas.toDataURL());
                }
                rowsCount = 0;
                if (this.pageCounts.length - 1 === i) {
                    printInstance.canvasPrint(this.parent, sheetIndex, printOptions);
                }
            }
            else if (this.isImageLoaded || this.isChartLoaded) {
                break;
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Print.prototype.setBorderStyle = function (cell, style) {
        style.borderBottom = !isNullOrUndefined(cell.style.borderBottom) ? cell.style.borderBottom : style.borderBottom;
        style.borderTop = !isNullOrUndefined(cell.style.borderTop) ? cell.style.borderTop : style.borderTop;
        style.borderRight = !isNullOrUndefined(cell.style.borderRight) ? cell.style.borderRight : style.borderRight;
        style.borderLeft = !isNullOrUndefined(cell.style.borderLeft) ? cell.style.borderLeft : style.borderLeft;
        return style;
    };
    Print.prototype.setToDefault = function () {
        this.parent.currentPrintSheetIndex = 0;
        this.initialRowCount = 0;
        this.chartHeight = 0;
        this.totalCharts = 0;
        this.totalImages = 0;
        this.chartLoadedCount = 0;
        this.imageLoadedCount = 0;
        this.endRow = 0;
        this.pageCounts = [];
        this.multipleCanvasDataURL = [];
        this.chartElements = [];
        this.isChartLoaded = false;
        this.isImageLoaded = false;
        this.startNewPageCount = 0;
    };
    Print.prototype.handleCharts = function (i, j, cell, context, canvas, height, rowCount, initialRowCount, lineHeight, rowHeight, allowColumnAndRow, printOptions, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sheet, printInstance, multipleCanvasDataURL, currentX, currentY, pageHeight, sheetIndex) {
        var _this = this;
        if (!isNullOrUndefined(cell.chart)) {
            var _loop_2 = function (chart) {
                this_2.totalCharts += 1;
                var image = new Image();
                chart.left = !isNullOrUndefined(chart.left) ? chart.left : 0;
                chart.top = !isNullOrUndefined(chart.top) ? chart.top : 0;
                var chartElement = document.getElementById(chart.id);
                if (isNullOrUndefined(chartElement)) {
                    this_2.parent.insertChart([chart]);
                    chartElement = document.getElementById(chart.id);
                    this_2.chartElements.push(chart.id + '_overlay');
                }
                if (!isNullOrUndefined(chartElement)) {
                    this_2.chartHeight = chart.height;
                    var isExtraLine = (this_2.initialRowCount + Math.ceil(chart.height / 19) > this_2.endRow) &&
                        (printOptions.allowRowColumnHeader || printOptions.allowGridLines);
                    if (isExtraLine) {
                        if (sheet.rows.length - 1 === j) {
                            var extraSpace = rowHeight + (allowColumnAndRow ? this_2.defaultCellHeight : 0);
                            if (canvas.height > height + (this_2.chartHeight - extraSpace)) {
                                this_2.endRow += Math.ceil((this_2.chartHeight - extraSpace) / 19);
                            }
                            else {
                                this_2.endRow += Math.ceil((canvas.height - (height + extraSpace)) / 19);
                            }
                        }
                    }
                    var svgElement = chartElement.cloneNode(true);
                    var url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(svgElement.childNodes[1])], { type: 'image/svg+xml' }));
                    image.onload = function () {
                        var chartLeftIndex = Math.ceil(chart.left / 1000) - 1;
                        var chartTopIndex = Math.ceil(chart.top / 1080) - 1;
                        var left = chart.left + (allowColumnAndRow ? 37 : 0);
                        var top = chart.top + (allowColumnAndRow ? 19 : 0) + (chartTopIndex > 0 ? lineHeight : 0);
                        context.drawImage(image, chartLeftIndex <= 0 ? left : left - (chartLeftIndex * 1000), chartTopIndex <= 0 ? top : top - (chartTopIndex * 1160), chart.width, chart.height);
                        _this.chartLoadedCount++;
                        if (_this.chartLoadedCount === _this.totalCharts) {
                            currentX += chart.width;
                            _this.isChartLoaded = false;
                            if (!_this.isImageLoaded) {
                                multipleCanvasDataURL.push(canvas.toDataURL());
                                var startValue = (_this.initialRowCount === sheet.rows.length - 1 && height < 1080) ?
                                    sheet.rows.length : _this.initialRowCount;
                                var endValue = _this.endRow;
                                _this.processCell(i, (startValue + 1 === endValue ? endValue : startValue), endValue, currentX, currentY, context, canvas, sheet, printInstance, pageHeight, height, false, sheetIndex, printOptions);
                            }
                        }
                    };
                    image.src = url;
                    this_2.isChartLoaded = true;
                }
            };
            var this_2 = this;
            for (var _i = 0, _a = cell.chart; _i < _a.length; _i++) {
                var chart = _a[_i];
                _loop_2(chart);
            }
        }
    };
    Print.prototype.processImages = function (i, j, cell, canvas, context, height, rowCount, rowHeight, lineHeight, allowColumnAndRow, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    printOptions, sheet, printInstance, currentX, currentY, pageHeight, sheetIndex) {
        var _this = this;
        if (!isNullOrUndefined(cell.image)) {
            var _loop_3 = function (image) {
                this_3.totalImages += 1;
                var img = new Image();
                img.src = image.src;
                image.left = !isNullOrUndefined(image.left) ? image.left : 0;
                image.top = !isNullOrUndefined(image.top) ? image.top : 0;
                this_3.chartHeight = image.height;
                var isExtraLine = (this_3.initialRowCount + Math.ceil(image.height / 19) > this_3.endRow) &&
                    (printOptions.allowRowColumnHeader || printOptions.allowGridLines);
                if (isExtraLine) {
                    if (j === sheet.rows.length - 1) {
                        var extraSpace = (rowHeight + (allowColumnAndRow ? this_3.defaultCellHeight : 0));
                        if (canvas.height > (height + (this_3.chartHeight - extraSpace))) {
                            this_3.endRow += Math.ceil((this_3.chartHeight - extraSpace) / 19);
                        }
                        else {
                            this_3.endRow += Math.ceil((canvas.height - (height + extraSpace)) / 19);
                        }
                    }
                }
                img.onload = function () {
                    var imageLeftIndex = Math.ceil(image.left / 1000) - 1;
                    var imageTopIndex = Math.ceil(image.top / 1080) - 1;
                    var left = image.left + (allowColumnAndRow ? 37 : 0);
                    var top = image.top + (allowColumnAndRow ? 19 : 0) + (imageTopIndex > 0 ? lineHeight : 0);
                    context.drawImage(img, (imageLeftIndex <= 0 ? left : left - (imageLeftIndex * 1000)), (imageTopIndex <= 0 ? top : top - (imageTopIndex * 1160)), image.width, image.height);
                    _this.imageLoadedCount++;
                    if (_this.imageLoadedCount === _this.totalImages) {
                        _this.isImageLoaded = false;
                        currentX += image.width;
                        if (!_this.isChartLoaded) {
                            _this.multipleCanvasDataURL.push(canvas.toDataURL());
                            var startValue = (_this.initialRowCount === sheet.rows.length - 1 &&
                                height < 1080) ? sheet.rows.length : _this.initialRowCount;
                            var endValue = _this.endRow;
                            _this.processCell(i, (startValue + 1 === endValue ? endValue : startValue), endValue, currentX, currentY, context, canvas, sheet, printInstance, pageHeight, height, false, sheetIndex, printOptions);
                        }
                    }
                };
                img.onerror = function () {
                    _this.imageLoadedCount++; // Increment count to prevent indefinite waiting
                    if (_this.imageLoadedCount === _this.totalImages) {
                        _this.isImageLoaded = false;
                        if (!_this.isChartLoaded) {
                            _this.multipleCanvasDataURL.push(canvas.toDataURL());
                            var startValue = (_this.initialRowCount === sheet.rows.length - 1 &&
                                height < 1080) ? sheet.rows.length : _this.initialRowCount;
                            var endValue = _this.endRow;
                            _this.processCell(i, (startValue + 1 === endValue ? endValue : startValue), endValue, currentX, currentY, context, canvas, sheet, printInstance, pageHeight, height, false, sheetIndex, printOptions);
                        }
                    }
                };
            };
            var this_3 = this;
            for (var _i = 0, _a = cell.image; _i < _a.length; _i++) {
                var image = _a[_i];
                _loop_3(image);
            }
            this.isImageLoaded = true;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Print.prototype.textDecoration = function (cell, context, locationX, locationY, color, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    textMetrics, cellText, cellWidth) {
        if (cellText !== '' && (!isNullOrUndefined(cell.style) && !isNullOrUndefined(cell.style.textDecoration) &&
            cell.style.textDecoration.toLowerCase().indexOf('underline') > -1 || !isNullOrUndefined(cell.hyperlink))) {
            context.beginPath();
            context.moveTo(locationX, locationY - 3);
            context.lineTo(locationX + (textMetrics.width > cellWidth ? cellWidth :
                textMetrics.width), locationY - 3);
            context.strokeStyle = color;
            context.lineWidth = 1;
            context.stroke();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Print.prototype.rowHeaderRect = function (context, currentX, currentY, cellWidth, cellHeight, backgroundColor) {
        if (backgroundColor === void 0) { backgroundColor = '#ffffff'; }
        context.save();
        context.beginPath();
        context.rect(currentX, currentY, cellWidth, cellHeight);
        context.clip();
        context.fillStyle = backgroundColor;
        context.fillRect(currentX, currentY, cellWidth, cellHeight);
        context.restore();
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Print.prototype.rowHeaderText = function (rowText, context, printInstance, headerWidth, currentX, style, currentY, height) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var textMetrics = context.measureText(rowText);
        var textWidth = textMetrics.width;
        var locationX = printInstance.calculateTextPosition(textWidth, headerWidth, currentX, 'Center');
        var locationY = currentY;
        context.save();
        context.beginPath();
        context.rect(currentX, currentY, headerWidth, height);
        context.clip();
        context.fillStyle = '#000000';
        context.fillText(rowText, locationX, (locationY + height));
        printInstance.drawBorder(context, style, currentX, (currentY || 0), headerWidth, height);
        context.restore();
    };
    Print.prototype.canvasPrint = function (spreadSheet, sheetIndex, printOptions) {
        var _this = this;
        if (printOptions.type === 'Workbook' && (this.totalSheetCount.length - 1) >= this.workbookActiveSheetCount) {
            var currentSheetIndex = this.totalSheetCount[this.workbookActiveSheetCount];
            var sheet = spreadSheet.sheets[currentSheetIndex];
            this.workbookActiveSheetCount++;
            this.activeSheetPrint(spreadSheet, sheet, printOptions, currentSheetIndex);
        }
        else {
            for (var i = 0; i < this.chartElements.length; i++) {
                var chartElement = document.getElementById(this.chartElements[i]);
                if (!isNullOrUndefined(chartElement)) {
                    chartElement.remove();
                }
            }
            if (this.multipleCanvasDataURL.length > 0) {
                var browserUserAgent = navigator.userAgent;
                var printWindow_1 = window.open(' ', '_blank', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
                printWindow_1.document.write('<html><head><title></title></head><body>');
                var canvasWidth_1 = 1000; // Adjust as needed
                var canvasHeight_1 = 1400; // Adjust as needed
                if ((browserUserAgent.indexOf('Chrome') !== -1) || (browserUserAgent.indexOf('Safari') !== -1) ||
                    (browserUserAgent.indexOf('Firefox')) !== -1) {
                    printWindow_1.document.write('<!DOCTYPE html>');
                    printWindow_1.document.write('<html><head><style>html, body {  }'
                        + ' img { height: 100%; width: 100%; display: block; }@media print { body {  }'
                        + ' img { width:100%; width:100%; box-sizing: border-box; }br, button { display: none; }'
                        + ' div{ page-break-inside: avoid; }} @page{ size:' + canvasWidth_1.toString() + 'px ' + canvasHeight_1.toString() + 'px; }</style></head><body>');
                }
                else {
                    printWindow_1.document.write('<!DOCTYPE html>');
                    printWindow_1.document.write('<html><head>'
                        + '<style>html, body {  } img { height: 100%; width: 100%; }@media print { body {  }'
                        + 'img { width:100%; width:100%; box-sizing: border-box; }br, button { display: none; } '
                        + 'div{ page-break-inside: avoid; }} @page{ size:' + canvasWidth_1.toString() + 'px ' + canvasHeight_1.toString() + 'px; }</style></head><body>');
                }
                this.multipleCanvasDataURL.forEach(function (dataURL, index) {
                    var canvas = printWindow_1.document.createElement('canvas');
                    canvas.width = canvasWidth_1;
                    canvas.height = canvasHeight_1;
                    var context = canvas.getContext('2d');
                    var image = new Image();
                    image.onload = function () {
                        context.drawImage(image, 0, 0, canvasWidth_1, canvasHeight_1);
                        if (index === _this.multipleCanvasDataURL.length - 1) {
                            spreadSheet.isPrintingProcessing = false;
                            printWindow_1.print();
                            printWindow_1.document.close();
                            printWindow_1.close();
                            spreadSheet.printModule.setToDefault();
                        }
                    };
                    image.src = dataURL;
                    printWindow_1.document.body.appendChild(canvas);
                });
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Print.prototype.drawBorder = function (context, borderStyles, locationX, locationY, cellWidth, cellHeight) {
        var borderBottom = borderStyles.borderBottom, borderLeft = borderStyles.borderLeft, borderRight = borderStyles.borderRight, borderTop = borderStyles.borderTop, borderColor = borderStyles.borderColor;
        context.strokeStyle = borderColor || 'black';
        if (!isNullOrUndefined(borderBottom) && borderBottom.indexOf('#FFFFFF') === -1) {
            context.strokeStyle = borderBottom.split(' ')[2];
            this.drawPath(locationX, (locationY === 2 ? -2 : locationY) + cellHeight, locationX + cellWidth, (locationY === 2 ? -2 : locationY) + cellHeight, context, borderBottom, false, borderStyles, 'bottom');
        }
        if (!isNullOrUndefined(borderLeft) && borderLeft.indexOf('#FFFFFF') === -1) {
            context.strokeStyle = borderLeft.split(' ')[2];
            this.drawPath(locationX, locationY, locationX, (locationY === 2 ? -2 : locationY) + cellHeight, context, borderLeft, true, borderStyles, 'left');
        }
        if (!isNullOrUndefined(borderRight) && borderRight.indexOf('#FFFFFF') === -1) {
            context.strokeStyle = borderRight.split(' ')[2];
            this.drawPath(locationX + cellWidth, locationY, locationX + cellWidth, (locationY === 2 ? -2 : locationY) + cellHeight, context, borderRight, false, borderStyles, 'right');
        }
        if (!isNullOrUndefined(borderTop) && borderTop.indexOf('#FFFFFF') === -1) {
            context.strokeStyle = borderTop.split(' ')[2];
            this.drawPath(locationX, locationY, locationX + cellWidth, locationY, context, borderTop, true, borderStyles, 'top');
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Print.prototype.drawPath = function (startX, startY, endX, endY, context, border, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isLeftOrTop, borderStyles, position) {
        context.beginPath();
        if (border.indexOf('dashed') > -1) {
            context.setLineDash([3, 2]);
            context.lineWidth = border.split(' ')[0].split('')[0];
        }
        else if (border.indexOf('dotted') > -1) {
            context.setLineDash([1, 1]);
            context.lineWidth = border.split(' ')[0].split('')[0];
        }
        else if (border.indexOf('double') > -1) {
            context.setLineDash([]);
            var isAllBorder = !isNullOrUndefined(borderStyles.borderBottom) && !isNullOrUndefined(borderStyles.borderLeft) &&
                !isNullOrUndefined(borderStyles.borderRight) && !isNullOrUndefined(borderStyles.borderTop);
            var isLeftBottom = !isNullOrUndefined(borderStyles.borderBottom) && !isNullOrUndefined(borderStyles.borderLeft) &&
                isNullOrUndefined(borderStyles.borderRight) && isNullOrUndefined(borderStyles.borderTop);
            var isLeftTop = isNullOrUndefined(borderStyles.borderBottom) && !isNullOrUndefined(borderStyles.borderLeft) &&
                isNullOrUndefined(borderStyles.borderRight) && !isNullOrUndefined(borderStyles.borderTop);
            var isLeftTopBotom = !isNullOrUndefined(borderStyles.borderBottom) && !isNullOrUndefined(borderStyles.borderLeft) &&
                isNullOrUndefined(borderStyles.borderRight) && !isNullOrUndefined(borderStyles.borderTop);
            var isRightBottom = !isNullOrUndefined(borderStyles.borderBottom) && isNullOrUndefined(borderStyles.borderLeft) &&
                !isNullOrUndefined(borderStyles.borderRight) && isNullOrUndefined(borderStyles.borderTop);
            var isRightTop = isNullOrUndefined(borderStyles.borderBottom) && isNullOrUndefined(borderStyles.borderLeft) &&
                !isNullOrUndefined(borderStyles.borderRight) && !isNullOrUndefined(borderStyles.borderTop);
            var isRightTopBottom = !isNullOrUndefined(borderStyles.borderBottom) && isNullOrUndefined(borderStyles.borderLeft) &&
                !isNullOrUndefined(borderStyles.borderRight) && !isNullOrUndefined(borderStyles.borderTop);
            var isLeftTopRight = isNullOrUndefined(borderStyles.borderBottom) && !isNullOrUndefined(borderStyles.borderLeft) &&
                !isNullOrUndefined(borderStyles.borderRight) && !isNullOrUndefined(borderStyles.borderTop);
            var isLeftBottomRight = !isNullOrUndefined(borderStyles.borderBottom) && !isNullOrUndefined(borderStyles.borderLeft)
                && !isNullOrUndefined(borderStyles.borderRight) && isNullOrUndefined(borderStyles.borderTop);
            context.lineWidth = 1;
            var extraSpace = 3;
            if (isAllBorder) {
                if (startX === endX) {
                    if (isLeftOrTop) {
                        this.drawDoubleBorder(context, startX, startY, endX, endY, startX + extraSpace, startY + extraSpace, endX + extraSpace, endY - (extraSpace - 1));
                    }
                    else {
                        this.drawDoubleBorder(context, startX, startY, endX, endY, startX - extraSpace, startY + extraSpace, endX - extraSpace, endY - (extraSpace - 1));
                    }
                }
                else if (startY === endY) {
                    if (isLeftOrTop) {
                        this.drawDoubleBorder(context, startX, startY, endX, endY, startX + (extraSpace - 1), startY + extraSpace, endX - (extraSpace - 1), endY + extraSpace);
                    }
                    else {
                        this.drawDoubleBorder(context, startX, startY, endX, endY, startX + (extraSpace - 1), startY - extraSpace, endX - (extraSpace - 1), endY - extraSpace);
                    }
                }
            }
            else if (isLeftBottom) {
                if (position === 'left') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + extraSpace, startY, endX + extraSpace, endY - (extraSpace - 1));
                }
                else {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + (extraSpace - 1), startY - extraSpace, endX, endY - extraSpace);
                }
            }
            else if (isLeftTop) {
                if (position === 'left') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + extraSpace, startY + (extraSpace - 1), endX + extraSpace, endY);
                }
                else {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + (extraSpace - 1), startY + extraSpace, endX, endY + extraSpace);
                }
            }
            else if (isLeftTopBotom) {
                if (position === 'left') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + extraSpace, startY + extraSpace, endX + extraSpace, endY - (extraSpace - 1));
                }
                else if (position === 'top') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + (extraSpace - 1), startY + extraSpace, endX, endY + extraSpace);
                }
                else {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + (extraSpace - 1), startY - extraSpace, endX, endY - extraSpace);
                }
            }
            else if (isRightBottom) {
                if (position === 'right') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX - extraSpace, startY, endX - extraSpace, endY - (extraSpace - 1));
                }
                else {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX, startY - extraSpace, endX - (extraSpace - 1), endY - extraSpace);
                }
            }
            else if (isRightTop) {
                if (position === 'right') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX - extraSpace, startY + extraSpace, endX - extraSpace, endY);
                }
                else {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX, startY + extraSpace, endX - (extraSpace - 1), endY + extraSpace);
                }
            }
            else if (isRightTopBottom) {
                if (position === 'right') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX - extraSpace, startY + extraSpace, endX - extraSpace, endY - (extraSpace - 1));
                }
                else if (position === 'top') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX, startY + extraSpace, endX - (extraSpace - 1), endY + extraSpace);
                }
                else {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX, startY - extraSpace, endX - (extraSpace - 1), endY - extraSpace);
                }
            }
            else if (isLeftTopRight) {
                if (position === 'right') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX - extraSpace, startY + extraSpace, endX - extraSpace, endY);
                }
                else if (position === 'top') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + extraSpace, startY + extraSpace, endX - (extraSpace - 1), endY + extraSpace);
                }
                else {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + extraSpace, startY + extraSpace, endX + extraSpace, endY);
                }
            }
            else if (isLeftBottomRight) {
                if (position === 'right') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX - extraSpace, startY, endX - extraSpace, endY - (extraSpace - 1));
                }
                else if (position === 'bottom') {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + (extraSpace - 1), startY - extraSpace, endX - (extraSpace - 1), endY - extraSpace);
                }
                else {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + extraSpace, startY, endX + extraSpace, endY - (extraSpace - 1));
                }
            }
            else {
                if (startX === endX) {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX + (position === 'left' ? extraSpace : -extraSpace), startY, endX + (position === 'left' ? extraSpace : -extraSpace), endY);
                }
                else if (startY === endY) {
                    this.drawDoubleBorder(context, startX, startY, endX, endY, startX, startY +
                        (position === 'top' ? extraSpace : -extraSpace), endX, endY + (position === 'top' ? extraSpace : -extraSpace));
                }
            }
            context.stroke();
            return;
        }
        else {
            context.setLineDash([]);
            context.lineWidth = border.split(' ')[0].split('')[0];
        }
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
    };
    Print.prototype.drawDoubleBorder = function (context, startX1, startY1, endX1, endY1, startX2, startY2, endX2, endY2) {
        context.moveTo(startX1, startY1);
        context.lineTo(endX1, endY1);
        context.moveTo(startX2, startY2);
        context.lineTo(endX2, endY2);
    };
    Print.prototype.calculateTextPosition = function (textWidth, totalWidth, currentX, position, isWrap) {
        var x;
        var space = 3;
        var availableSpace = totalWidth;
        if (availableSpace >= textWidth) {
            switch (position.toLowerCase()) {
                case 'left':
                    x = currentX + space;
                    break;
                case 'center':
                    x = currentX + (availableSpace - textWidth) / 2;
                    break;
                case 'right':
                    if (isWrap) {
                        x = currentX + (availableSpace - space);
                    }
                    else {
                        x = currentX + (availableSpace - space) - textWidth;
                    }
                    break;
            }
        }
        else if (textWidth < totalWidth) {
            x = position.toLowerCase() === 'left' ? currentX + space : position.toLowerCase() === 'center' ? currentX + (totalWidth - textWidth) / 2
                : currentX + totalWidth - textWidth;
        }
        else {
            x = currentX + space;
        }
        return x;
    };
    Print.prototype.calculatePageCount = function (sheet, columnHeaderWidth, allowColumnAndRow) {
        var allowHeader = allowColumnAndRow;
        var colIndex = this.columnIndex;
        if (sheet.columns.length === 0) {
            var columnCount = Math.floor(columnHeaderWidth / this.defaultCellWidth) - (allowHeader ? 1 : 0);
            return Array(Math.max(1, Math.ceil(colIndex / columnCount))).fill(columnCount);
        }
        var pageWidthCount = 0;
        var pageCount = [];
        for (var i = 0; i <= colIndex; i++) {
            var column = sheet.columns && sheet.columns[i];
            var columnWidth = (allowHeader ? 27 : 0) + ((column && column.hidden) ? 0 :
                (column && !isNullOrUndefined(column.width)) ? column.width : this.defaultCellWidth);
            pageWidthCount += columnWidth;
            allowHeader = false;
            if (pageWidthCount > columnHeaderWidth) {
                pageCount.push(i - 1);
                allowHeader = true;
                pageWidthCount = columnWidth;
            }
        }
        if (pageCount.length === 0 || colIndex > pageCount[pageCount.length - 1]) {
            pageCount.push(colIndex);
        }
        return pageCount;
    };
    Print.prototype.wrapText = function (text, colwidth, style, parentStyle) {
        if (isNullOrUndefined(text)) {
            return [''];
        }
        var displayText = [];
        var width;
        var splitTextArr;
        var lWidth;
        var cWidth;
        var prevChars;
        var prevWidth = 0;
        var textArr = text.toString().split(' ');
        var spaceWidth = getTextWidth(' ', style, parentStyle, true);
        var hypenWidth;
        var lines;
        var lineText = '';
        var lineCnt = 0;
        var maxCnt = 0;
        var calculateCount = function (txt) {
            if (prevWidth) {
                displayText.push(lineText);
            }
            if (getDPRValue(width / colwidth, true) > 1) {
                txt.split('').forEach(function (val) {
                    cWidth = getTextWidth(val, style, parentStyle, true);
                    lWidth += cWidth;
                    prevChars += val;
                    if (getDPRValue(lWidth, true) > colwidth) {
                        displayText.push(prevChars);
                        lWidth = cWidth;
                        prevChars = val;
                    }
                });
                width = lWidth;
                txt = prevChars;
            }
            lineText = txt;
            prevWidth = width;
        };
        var lastTextLen = textArr.length - 1;
        var addSpace = function (size, textIdx) {
            if (getDPRValue(size + spaceWidth, true) / colwidth >= 1) {
                width += 0;
            }
            else {
                width += spaceWidth;
                if (textIdx !== lastTextLen) {
                    lineText += ' ';
                }
            }
        };
        textArr.forEach(function (txt, textIdx) {
            lWidth = 0;
            cWidth = 0;
            prevChars = '';
            width = getTextWidth(txt, style, parentStyle, true);
            lines = getDPRValue(prevWidth + width, true) / colwidth;
            if (lines > 1) {
                splitTextArr = txt.split('-');
                if (splitTextArr.length > 1) {
                    var lastIdx_1 = splitTextArr.length - 1;
                    splitTextArr.forEach(function (splitText, index) {
                        lWidth = 0;
                        cWidth = 0;
                        prevChars = '';
                        if (!hypenWidth) {
                            hypenWidth = getTextWidth('-', style, parentStyle, true);
                        }
                        width = getTextWidth(splitText, style, parentStyle, true);
                        if (index < lastIdx_1) {
                            width += hypenWidth;
                            splitText += '-';
                        }
                        lines = getDPRValue(prevWidth + width, true) / colwidth;
                        if (lines > 1) {
                            calculateCount(splitText);
                            if (index === lastIdx_1) {
                                addSpace(width, textIdx);
                            }
                        }
                        else {
                            lineText += splitText;
                            if (index === lastIdx_1 && textArr[textArr.length - 1] !== txt) {
                                addSpace(prevWidth + width, textIdx);
                            }
                            prevWidth += width;
                        }
                    });
                }
                else {
                    calculateCount(txt);
                    addSpace(width, textIdx);
                }
            }
            else {
                lineText += txt;
                addSpace(prevWidth + width, textIdx);
                prevWidth += width;
            }
        });
        if (prevWidth) {
            lineCnt = getDPRValue(prevWidth - spaceWidth, true) / colwidth;
            maxCnt = parseFloat((lineCnt).toString().split('.')[0]);
            displayText.push(lineText);
        }
        return displayText;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Print.prototype.getModuleName = function () {
        return 'print';
    };
    /**
     * To destroy the print.
     *
     * @returns {void}
     * @private
     */
    Print.prototype.destroy = function () {
        this.setToDefault();
        this.totalSheetCount = [];
        this.parent = null;
    };
    return Print;
}());
export { Print };
