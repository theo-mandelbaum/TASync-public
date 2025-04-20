import { inView, renderFilterCell, deleteNote, showNote } from '../common/index';
import { createHyperlinkElement, checkPrevMerge, createImageElement, createNoteIndicator } from '../common/index';
import { removeAllChildren, setRowEleHeight } from '../common/index';
import { getColumnHeaderText, getRangeIndexes, getRangeAddress } from '../../workbook/common/index';
import { setChart, refreshChart, getCellAddress } from '../../workbook/common/index';
import { skipDefaultValue, isHiddenRow, isHiddenCol, isImported } from '../../workbook/index';
import { getRowHeight, getCell, getColumnWidth, getSheet, setCell, checkColumnValidation } from '../../workbook/base/index';
import { addClass, attributes, extend, compile, isNullOrUndefined, detach, append } from '@syncfusion/ej2-base';
import { getFormattedCellObject, applyCellFormat, workbookFormulaOperation, wrapEvent, applyCF } from '../../workbook/common/index';
import { getTypeFromFormat, activeCellMergedRange, updateHighlight, getCellIndexes, updateView, skipHiddenIdx } from '../../workbook/index';
import { checkIsFormula, calculateFormula } from '../../workbook/common/index';
import { addListValidationDropdown } from './../../workbook/common/index';
/**
 * CellRenderer class which responsible for building cell content.
 *
 * @hidden
 */
var CellRenderer = /** @class */ (function () {
    function CellRenderer(parent) {
        this.parent = parent;
        this.element = this.parent.createElement('td');
        this.th = this.parent.createElement('th', { className: 'e-header-cell' });
        this.tableRow = parent.createElement('tr', { className: 'e-row' });
        this.parent.on(updateView, this.updateView, this);
        this.parent.on(calculateFormula, this.calculateFormula, this);
    }
    CellRenderer.prototype.renderColHeader = function (index, row, refChild) {
        var headerCell = this.th.cloneNode();
        var headerText = getColumnHeaderText(index + 1);
        headerCell.innerText = headerText;
        var sheet = this.parent.getActiveSheet();
        if (isHiddenCol(sheet, index + 1)) {
            headerCell.classList.add('e-hide-start');
        }
        if (index !== 0 && isHiddenCol(sheet, index - 1)) {
            headerCell.classList.add('e-hide-end');
        }
        if (refChild) {
            row.insertBefore(headerCell, refChild);
        }
        else {
            row.appendChild(headerCell);
        }
        this.parent.trigger('beforeCellRender', { cell: null, element: headerCell, address: headerText, colIndex: index });
        this.parent.notify(renderFilterCell, { td: headerCell, rowIndex: 0, colIndex: index });
        attributes(headerCell, { 'aria-colindex': (index + 1).toString(), 'tabindex': '-1' });
    };
    CellRenderer.prototype.renderRowHeader = function (index, row, refChild) {
        var headerCell = this.element.cloneNode();
        addClass([headerCell], 'e-header-cell');
        attributes(headerCell, { 'role': 'rowheader', 'tabindex': '-1' });
        headerCell.innerText = (index + 1).toString();
        if (refChild) {
            row.insertBefore(headerCell, refChild);
        }
        else {
            row.appendChild(headerCell);
        }
        this.parent.trigger('beforeCellRender', { cell: null, element: headerCell, address: "" + (index + 1), rowIndex: index });
    };
    CellRenderer.prototype.render = function (args) {
        var sheet = this.parent.getActiveSheet();
        args.td = this.element.cloneNode();
        args.td.className = 'e-cell';
        attributes(args.td, { 'aria-colindex': (args.colIdx + 1).toString(), 'tabindex': '-1' });
        if (this.checkMerged(args)) {
            this.createImageAndChart(args);
            if (args.refChild) {
                args.row.insertBefore(args.td, args.refChild);
            }
            else {
                args.row.appendChild(args.td);
            }
            return args.td;
        }
        args.isRefresh = false;
        args.skipFormatCheck = isImported(this.parent);
        var isTemplateCell = this.update(args);
        if (args.checkCF && args.cell && sheet.conditionalFormats && sheet.conditionalFormats.length) {
            this.parent.notify(applyCF, { indexes: [args.rowIdx, args.colIdx], cell: args.cell, ele: args.td, isRender: true });
        }
        if (!args.td.classList.contains('e-cell-template')) {
            this.parent.notify(renderFilterCell, { td: args.td, rowIndex: args.rowIdx, colIndex: args.colIdx });
        }
        if (args.refChild) {
            args.row.insertBefore(args.td, args.refChild);
        }
        else {
            args.row.appendChild(args.td);
        }
        var evtArgs = { cell: args.cell, element: args.td, address: args.address, rowIndex: args.rowIdx, colIndex: args.colIdx, needHeightCheck: false, row: args.row };
        this.parent.trigger('beforeCellRender', evtArgs);
        if (!sheet.rows[args.rowIdx] || !sheet.rows[args.rowIdx].customHeight) {
            if (evtArgs.needHeightCheck || (isTemplateCell && evtArgs.element && evtArgs.element.children.length)) {
                var clonedCell = evtArgs.element.cloneNode(true);
                clonedCell.style.width = getColumnWidth(sheet, args.colIdx, true) + 'px';
                this.tableRow.appendChild(clonedCell);
            }
            if (args.lastCell && this.tableRow.childElementCount) {
                var rowHeight = this.getRowHeightOnInit();
                if (rowHeight > getRowHeight(sheet, args.rowIdx)) {
                    setRowEleHeight(this.parent, sheet, rowHeight, args.rowIdx, args.row, args.hRow);
                }
                this.tableRow.innerText = '';
            }
        }
        this.setWrapByValue(sheet, args);
        return evtArgs.element;
    };
    CellRenderer.prototype.setWrapByValue = function (sheet, args) {
        if (args.cell && isNullOrUndefined(args.cell.wrap) && args.cell.value && args.cell.value.toString().includes('\n')) {
            setCell(args.rowIdx, args.colIdx, sheet, { wrap: true }, true);
            this.parent.notify(wrapEvent, { range: [args.rowIdx, args.colIdx, args.rowIdx, args.colIdx], wrap: true, initial: true, sheet: sheet,
                td: args.td, row: args.row, hRow: args.hRow });
        }
    };
    CellRenderer.prototype.update = function (args) {
        var sheet = this.parent.getActiveSheet();
        var isTemplateCell;
        // In SF-425413 ticket, we suggested to add the template property in the cell model to render the template using updateCell method.
        if (!args.isRefresh || (args.cell && args.cell.template)) {
            var compiledTemplate = this.processTemplates(args.cell, args.rowIdx, args.colIdx);
            if (compiledTemplate) {
                if (typeof compiledTemplate === 'string') {
                    args.td.innerHTML = compiledTemplate;
                }
                else {
                    removeAllChildren(args.td);
                    append(compiledTemplate, args.td);
                }
                args.td.classList.add('e-cell-template');
                isTemplateCell = true;
            }
        }
        if (args.isRefresh) {
            if (args.td.rowSpan) {
                this.mergeFreezeRow(sheet, args.rowIdx, args.colIdx, args.td.rowSpan, args.row, true);
                args.td.removeAttribute('rowSpan');
            }
            if (args.td.colSpan) {
                this.mergeFreezeCol(sheet, args.rowIdx, args.colIdx, args.td.colSpan, true);
                args.td.removeAttribute('colSpan');
            }
            if (this.checkMerged(args)) {
                return false;
            }
            if (args.cell && !args.cell.hyperlink) {
                var hyperlink = args.td.querySelector('.e-hyperlink');
                if (hyperlink) {
                    detach(hyperlink);
                }
            }
            if (args.cell && args.td.children.length > 0 &&
                args.td.children[args.td.childElementCount - 1].className.indexOf('e-addNoteIndicator') > -1) {
                var noteIndicator = args.td.querySelector('.e-addNoteIndicator');
                if (noteIndicator) {
                    detach(noteIndicator);
                }
            }
            if ((!args.cell || !this.parent.allowWrap) && args.td.classList.contains('e-wraptext')) {
                args.td.classList.remove('e-wraptext');
            }
        }
        if (args.cell && args.cell.formula && !args.isRandomFormula && this.parent.calculationMode === 'Automatic') {
            this.calculateFormula(args);
            if (args.fillType && args.fillType === 'FillWithoutFormatting') {
                delete args.cell.format;
            }
        }
        var formatArgs = { value: args.cell && args.cell.value,
            type: args.cell && getTypeFromFormat(args.cell.format), format: args.cell && args.cell.format,
            formattedText: args.cell && args.cell.value, isRightAlign: false, cell: args.cell, rowIndex: args.rowIdx, colIndex: args.colIdx,
            td: args.td, skipFormatCheck: args.skipFormatCheck, refresh: true };
        if (this.parent.calculationMode === 'Manual' && args.cell && !args.cell.value && args.cell.value !== '' && args.cell.formula) {
            formatArgs.value = 0;
            args.cell.value = '0';
        }
        if (args.cell) {
            this.parent.notify(getFormattedCellObject, formatArgs);
        }
        this.parent.refreshNode(args.td, formatArgs);
        var style = {};
        if (args.cell) {
            if (args.cell.style) {
                if (args.cell.style.properties) {
                    style = skipDefaultValue(args.cell.style, true);
                }
                else {
                    style = args.cell.style;
                }
            }
            if (formatArgs.color !== undefined) {
                style = Object.assign({}, style);
                style.color = formatArgs.color;
            }
            this.createImageAndChart(args);
            if (args.cell.hyperlink) {
                if (args.fillType === 'FillFormattingOnly') {
                    args.td.style.textDecoration = 'underline';
                    args.td.style.color = '#00e';
                }
                else {
                    this.parent.notify(createHyperlinkElement, {
                        cell: args.cell, style: style, td: args.td, rowIdx: args.rowIdx,
                        colIdx: args.colIdx, fillType: args.fillType, action: args.action
                    });
                }
            }
            if (args.cell.rowSpan > 1) {
                var rowSpan = args.rowSpan || (args.cell.rowSpan -
                    this.parent.hiddenCount(args.rowIdx, args.rowIdx + (args.cell.rowSpan - 1)));
                if (rowSpan > 1) {
                    args.td.rowSpan = rowSpan;
                    this.mergeFreezeRow(sheet, args.rowIdx, args.colIdx, rowSpan, args.row);
                }
            }
            if (args.cell.colSpan > 1) {
                var colSpan = args.colSpan || (args.cell.colSpan -
                    this.parent.hiddenCount(args.colIdx, args.colIdx + (args.cell.colSpan - 1), 'columns'));
                if (colSpan > 1) {
                    args.td.colSpan = colSpan;
                    this.mergeFreezeCol(sheet, args.rowIdx, args.colIdx, colSpan);
                }
            }
            if (!isNullOrUndefined(args.cell.notes) && !args.fillType) {
                this.parent.notify(createNoteIndicator, { targetElement: args.td, rowIndex: args.rowIdx, columnIndex: args.colIdx });
            }
            else if (!isNullOrUndefined(args.td) && args.td.children.length > 0 && args.td.children[args.td.childElementCount - 1].className.indexOf('e-addNoteIndicator') > -1) {
                this.parent.notify(deleteNote, { rowIndex: args.rowIdx, columnIndex: args.colIdx });
            }
            if (args.cell.isNoteEditable) {
                this.parent.notify(showNote, { rowIndex: args.rowIdx, columnIndex: args.colIdx, isNoteEditable: true,
                    isScrollWithNote: true, cellElement: args.td });
            }
        }
        if (args.isRefresh && isNullOrUndefined(args.cell) && !isNullOrUndefined(args.td) && args.td.children.length > 0 && args.td.children[args.td.childElementCount - 1].className.indexOf('e-addNoteIndicator') > -1) {
            this.parent.notify(deleteNote, { rowIndex: args.rowIdx, columnIndex: args.colIdx });
        }
        if (args.isRefresh) {
            this.removeStyle(args.td, args.rowIdx, args.colIdx);
        }
        if (args.lastCell && this.parent.chartColl && this.parent.chartColl.length) {
            this.parent.notify(refreshChart, {
                cell: args.cell, rIdx: args.rowIdx, cIdx: args.colIdx, sheetIdx: this.parent.activeSheetIndex, isSelectAll: args.isSelectAll
            });
        }
        this.applyStyle(args, style);
        if (args.checkNextBorder === 'Row') {
            var borderTop = this.parent.getCellStyleValue(['borderTop'], [Number(this.parent.getContentTable().rows[0].getAttribute('aria-rowindex')) - 1, args.colIdx]).borderTop;
            if (borderTop !== '' && (!args.cell || !args.cell.style || !args.cell.style.bottomPriority)) {
                args.style = { borderBottom: borderTop };
                this.parent.notify(applyCellFormat, args);
            }
        }
        if (args.checkNextBorder === 'Column') {
            var borderLeft = this.parent.getCellStyleValue(['borderLeft'], [args.rowIdx, args.colIdx + 1]).borderLeft;
            if (borderLeft !== '' && (!args.cell || !args.cell.style || (!args.cell.style.borderRight && !args.cell.style.border))) {
                args.style = { borderRight: borderLeft };
                this.parent.notify(applyCellFormat, args);
            }
        }
        if (args.cell && !isNullOrUndefined(args.cell.wrap)) {
            this.parent.notify(wrapEvent, {
                range: [args.rowIdx, args.colIdx, args.rowIdx, args.colIdx], wrap: args.cell.wrap, sheet: sheet, initial: true, td: args.td,
                row: args.row, hRow: args.hRow, isCustomHgt: !args.isRefresh &&
                    getRowHeight(sheet, args.rowIdx) > (sheet && sheet.standardHeight ? sheet.standardHeight : 20)
            });
        }
        var validation;
        var col;
        if (args.cell && args.cell.validation) {
            validation = args.cell.validation;
            col = sheet.columns && sheet.columns[args.colIdx];
        }
        else {
            validation = checkColumnValidation(sheet.columns && sheet.columns[args.colIdx], args.rowIdx, args.colIdx) &&
                sheet.columns[args.colIdx].validation;
        }
        if (validation) {
            if (validation.isHighlighted) {
                args.validation = validation;
                args.col = col;
                this.parent.notify(updateHighlight, args);
            }
            if (validation.type === 'List' && !args.isRefresh && args.address === sheet.activeCell) {
                args.validation = validation;
                this.parent.notify(addListValidationDropdown, args);
            }
        }
        return isTemplateCell;
    };
    CellRenderer.prototype.applyStyle = function (args, style) {
        if (Object.keys(style).length || Object.keys(this.parent.commonCellStyle).length || args.lastCell) {
            args.style = extend({}, this.parent.commonCellStyle, style);
            this.parent.notify(applyCellFormat, args);
        }
    };
    CellRenderer.prototype.createImageAndChart = function (args) {
        if (args.cell.chart && args.cell.chart.length > 0) {
            this.parent.notify(setChart, { chart: args.cell.chart, isInitCell: true, range: getCellAddress(args.rowIdx, args.colIdx),
                isUndoRedo: false });
        }
        if (args.cell.image && args.cell.image.length > 0) {
            for (var i = 0; i < args.cell.image.length; i++) {
                if (args.cell.image[i]) {
                    this.parent.notify(createImageElement, {
                        options: {
                            src: args.cell.image[i].src, id: args.cell.image[i].id,
                            height: args.cell.image[i].height, width: args.cell.image[i].width,
                            top: args.cell.image[i].top, left: args.cell.image[i].left
                        },
                        range: getRangeAddress([args.rowIdx, args.colIdx, args.rowIdx, args.colIdx]), isPublic: false
                    });
                }
            }
        }
    };
    CellRenderer.prototype.calculateFormula = function (args) {
        if (args.cell.value !== undefined && args.cell.value !== null) {
            var eventArgs_1 = { action: 'checkFormulaAdded', added: true, address: args.address, sheetId: (args.sheetIndex === undefined ? this.parent.getActiveSheet() :
                    getSheet(this.parent, args.sheetIndex)).id.toString() };
            this.parent.notify(workbookFormulaOperation, eventArgs_1);
            if (eventArgs_1.added) {
                return;
            }
        }
        else if (args.formulaRefresh) {
            args.cell.value = '';
        }
        var isFormula = checkIsFormula(args.cell.formula);
        var eventArgs = {
            action: 'refreshCalculate', value: args.cell.formula, rowIndex: args.rowIdx, colIndex: args.colIdx,
            isFormula: isFormula, sheetIndex: args.sheetIndex, isRefreshing: args.isRefreshing,
            isDependentRefresh: args.isDependentRefresh, isRandomFormula: args.isRandomFormula, fillType: args.fillType
        };
        if (this.parent.calculationMode === 'Automatic' || args.isSortAction || args.action === 'calculate' || args.isDependentRefresh) {
            this.parent.notify(workbookFormulaOperation, eventArgs);
        }
        if ((args.cell.value === undefined && this.parent.calculationMode === 'Manual' && !this.parent.getActiveSheet().isSheetCalculated)
            || (this.parent.isEdit && args.cell.value === '#CIRCULARREF!')) {
            args.cell.value = '0';
        }
        args.cell.value = getCell(args.rowIdx, args.colIdx, isNullOrUndefined(args.sheetIndex) ? this.parent.getActiveSheet() :
            getSheet(this.parent, args.sheetIndex)).value;
        if (isFormula && (args.cell.formula.indexOf('^+') > -1 || args.cell.formula.indexOf('&+') > -1)) {
            args.cell.formula = eventArgs.value; // for correcting the formulas 5^+3=>5^3 and 5&+3=>5&3 while rendering like Excel.
        }
    };
    CellRenderer.prototype.checkMerged = function (args) {
        if (args.cell && (args.cell.colSpan < 0 || args.cell.rowSpan < 0)) {
            var sheet = this.parent.getActiveSheet();
            if (sheet.frozenRows || sheet.frozenColumns) {
                var mergeArgs = { range: [args.rowIdx, args.colIdx, args.rowIdx, args.colIdx] };
                this.parent.notify(activeCellMergedRange, mergeArgs);
                var frozenRow = this.parent.frozenRowCount(sheet);
                var frozenCol = this.parent.frozenColCount(sheet);
                var setDisplay = void 0;
                mergeArgs.range = mergeArgs.range;
                if (sheet.frozenRows && sheet.frozenColumns) {
                    if (mergeArgs.range[0] < frozenRow && mergeArgs.range[1] < frozenCol) {
                        setDisplay = args.rowIdx < frozenRow && args.colIdx < frozenCol;
                    }
                    else if (mergeArgs.range[0] < frozenRow) {
                        setDisplay = args.rowIdx < frozenRow;
                    }
                    else if (mergeArgs.range[1] < frozenCol) {
                        setDisplay = args.colIdx < frozenCol;
                    }
                    else {
                        setDisplay = true;
                    }
                }
                else {
                    setDisplay = frozenRow ? (mergeArgs.range[0] >= frozenRow || args.rowIdx < frozenRow) : (mergeArgs.range[1] >= frozenCol
                        || args.colIdx < frozenCol);
                }
                if (setDisplay) {
                    args.td.style.display = 'none';
                }
            }
            else {
                args.td.style.display = 'none';
            }
            args.isMerged = true;
            var rowSpan = args.cell.rowSpan;
            var colSpan = args.cell.colSpan;
            if (colSpan < 0 || rowSpan < 0) {
                this.parent.notify(checkPrevMerge, args);
                if (colSpan < 0 && args.cell.style && args.cell.style.borderTop) {
                    this.applyStyle(args, { borderTop: args.cell.style.borderTop });
                }
                if (rowSpan < 0 && args.cell.style && args.cell.style.borderLeft) {
                    this.applyStyle(args, { borderLeft: args.cell.style.borderLeft });
                }
            }
            return args.isMerged;
        }
        return false;
    };
    CellRenderer.prototype.mergeFreezeRow = function (sheet, rowIdx, colIdx, rowSpan, tr, unMerge) {
        var frozenRow = this.parent.frozenRowCount(sheet);
        if (frozenRow && rowIdx < frozenRow && rowIdx + (rowSpan - 1) >= frozenRow) {
            var rowEle = void 0;
            var spanRowTop = 0;
            var height = void 0;
            var frozenCol = this.parent.frozenColCount(sheet);
            var row = tr || this.parent.getRow(rowIdx, null, colIdx);
            var emptyRows = [].slice.call(row.parentElement.querySelectorAll('.e-empty'));
            if (unMerge) {
                var curEmptyLength = rowIdx + rowSpan - frozenRow;
                if (curEmptyLength < emptyRows.length) {
                    return;
                }
                else {
                    var curSpan = 0;
                    if (curEmptyLength === emptyRows.length) {
                        var curCell = void 0;
                        var i = void 0;
                        var len = void 0;
                        if (frozenCol && colIdx < frozenCol) {
                            i = getCellIndexes(sheet.topLeftCell)[1];
                            len = frozenCol;
                        }
                        else {
                            i = this.parent.viewport.leftIndex + frozenCol;
                            len = this.parent.viewport.rightIndex;
                        }
                        for (i; i < len; i++) {
                            if (i === colIdx) {
                                continue;
                            }
                            curCell = getCell(rowIdx, i, sheet, false, true);
                            if (curCell.rowSpan && rowIdx + curCell.rowSpan - frozenRow > curSpan) {
                                curSpan = rowIdx + curCell.rowSpan - frozenRow;
                            }
                        }
                        if (curSpan === curEmptyLength) {
                            return;
                        }
                    }
                    else {
                        curSpan = curEmptyLength;
                    }
                    var lastRowIdx = rowIdx + (rowSpan - 1);
                    for (var i = curSpan, len = emptyRows.length; i < len; i++) {
                        spanRowTop += getRowHeight(sheet, lastRowIdx);
                        lastRowIdx--;
                        detach(emptyRows.pop());
                    }
                    this.updateSpanTop(colIdx, frozenCol, spanRowTop, true);
                    if (!emptyRows.length) {
                        this.updateColZIndex(colIdx, frozenCol, true);
                    }
                    return;
                }
            }
            this.updateColZIndex(colIdx, frozenCol);
            for (var i = frozenRow, len = rowIdx + (rowSpan - 1); i <= len; i++) {
                height = getRowHeight(sheet, skipHiddenIdx(sheet, i, true), true);
                spanRowTop += -height;
                if (frozenRow + emptyRows.length > i) {
                    continue;
                }
                rowEle = row.cloneNode();
                rowEle.classList.add('e-empty');
                rowEle.style.visibility = 'hidden';
                rowEle.style.height = height + 'px';
                row.parentElement.appendChild(rowEle);
            }
            this.updateSpanTop(colIdx, frozenCol, spanRowTop);
        }
    };
    CellRenderer.prototype.updateSpanTop = function (colIdx, frozenCol, top, update) {
        var mainPanel = this.parent.serviceLocator.getService('sheet').contentPanel;
        if (update) {
            if (!parseInt(mainPanel.style.top, 10)) {
                return;
            }
            top = parseInt(mainPanel.style.top, 10) + top;
        }
        if (frozenCol && colIdx < frozenCol && (update || !parseInt(mainPanel.style.top, 10) || top <
            parseInt(mainPanel.style.top, 10))) {
            mainPanel.style.top = top + 'px';
            var scroll_1 = mainPanel.nextElementSibling;
            if (scroll_1) {
                scroll_1.style.top = top + 'px';
            }
        }
    };
    CellRenderer.prototype.mergeFreezeCol = function (sheet, rowIdx, colIdx, colSpan, unMerge) {
        var frozenCol = this.parent.frozenColCount(sheet);
        if (frozenCol && colIdx < frozenCol && colIdx + (colSpan - 1) >= frozenCol) {
            var col = void 0;
            var width = void 0;
            var frozenRow = this.parent.frozenRowCount(sheet);
            var colGrp = (rowIdx < frozenRow ? this.parent.getSelectAllContent() : this.parent.getRowHeaderContent()).querySelector('colgroup');
            var emptyCols = [].slice.call(colGrp.querySelectorAll('.e-empty'));
            if (unMerge) {
                var curEmptyLength = colIdx + colSpan - frozenCol;
                if (curEmptyLength < emptyCols.length) {
                    return;
                }
                else {
                    var curSpan = 0;
                    if (curEmptyLength === emptyCols.length) {
                        var curCell = void 0;
                        var len = void 0;
                        var i = void 0;
                        if (frozenRow && rowIdx < frozenRow) {
                            len = frozenRow;
                            i = getCellIndexes(sheet.topLeftCell)[0];
                        }
                        else {
                            len = this.parent.viewport.bottomIndex;
                            i = this.parent.viewport.topIndex + frozenRow;
                        }
                        for (i; i < len; i++) {
                            if (i === rowIdx) {
                                continue;
                            }
                            curCell = getCell(i, colIdx, sheet, false, true);
                            if (curCell.colSpan && colIdx + curCell.colSpan - frozenCol > curSpan) {
                                curSpan = colIdx + curCell.colSpan - frozenCol;
                            }
                        }
                        if (curSpan === curEmptyLength) {
                            return;
                        }
                    }
                    else {
                        curSpan = curEmptyLength;
                    }
                    for (var i = curSpan, len = emptyCols.length; i < len; i++) {
                        detach(emptyCols.pop());
                    }
                    this.parent.serviceLocator.getService('sheet').setPanelWidth(sheet, this.parent.getRowHeaderContent());
                    if (!emptyCols.length) {
                        this.updateRowZIndex(rowIdx, frozenRow, true);
                    }
                    return;
                }
            }
            this.updateRowZIndex(rowIdx, frozenRow);
            for (var i = frozenCol, len = colIdx + (colSpan - 1); i <= len; i++) {
                if (frozenCol + emptyCols.length > i) {
                    continue;
                }
                col = colGrp.childNodes[0].cloneNode();
                col.classList.add('e-empty');
                col.style.visibility = 'hidden';
                width = getColumnWidth(sheet, skipHiddenIdx(sheet, i, true, 'columns'), null, true);
                col.style.width = width + 'px';
                colGrp.appendChild(col);
                if (i === len) {
                    this.parent.serviceLocator.getService('sheet').setPanelWidth(sheet, this.parent.getRowHeaderContent());
                }
            }
        }
    };
    CellRenderer.prototype.updateColZIndex = function (colIdx, frozenCol, remove) {
        if (colIdx < frozenCol) {
            this.updateSelectAllZIndex(remove);
        }
        else {
            this.parent.getColumnHeaderContent().style.zIndex = remove ? '' : '2';
            this.updatedHeaderZIndex(remove);
        }
    };
    CellRenderer.prototype.updateSelectAllZIndex = function (remove) {
        var frozenRowEle = this.parent.element.querySelector('.e-frozen-row');
        var frozenColEle = this.parent.element.querySelector('.e-frozen-column');
        if (remove) {
            this.parent.getSelectAllContent().style.zIndex = '';
            if (frozenRowEle) {
                frozenRowEle.style.zIndex = '';
            }
            if (frozenColEle) {
                frozenColEle.style.zIndex = '';
            }
        }
        else {
            var rowHeader = this.parent.getRowHeaderContent();
            var colHeader = this.parent.getColumnHeaderContent();
            if (rowHeader.style.zIndex || colHeader.style.zIndex) {
                this.parent.getSelectAllContent().style.zIndex = '3';
                if (frozenRowEle) {
                    frozenRowEle.style.zIndex = '4';
                }
                if (frozenColEle) {
                    frozenColEle.style.zIndex = '4';
                }
                var rowHdrSelection = rowHeader.querySelector('.e-selection');
                if (rowHdrSelection) {
                    rowHdrSelection.style.zIndex = '3';
                }
                var colHdrSelection = colHeader.querySelector('.e-selection');
                if (colHdrSelection) {
                    colHdrSelection.style.zIndex = '3';
                }
            }
            else {
                this.parent.getSelectAllContent().style.zIndex = '2';
            }
        }
    };
    CellRenderer.prototype.updatedHeaderZIndex = function (remove) {
        if (!remove && this.parent.getSelectAllContent().style.zIndex === '2') {
            this.parent.getSelectAllContent().style.zIndex = '3';
            var frozenRowEle = this.parent.element.querySelector('.e-frozen-row');
            var frozenColEle = this.parent.element.querySelector('.e-frozen-column');
            if (frozenColEle) {
                frozenColEle.style.zIndex = '4';
            }
            if (frozenRowEle) {
                frozenRowEle.style.zIndex = '4';
            }
            var rowHdrSelection = this.parent.getRowHeaderContent().querySelector('.e-selection');
            if (rowHdrSelection) {
                rowHdrSelection.style.zIndex = '3';
            }
            var colHdrSelection = this.parent.getColumnHeaderContent().querySelector('.e-selection');
            if (colHdrSelection) {
                colHdrSelection.style.zIndex = '3';
            }
        }
    };
    CellRenderer.prototype.updateRowZIndex = function (rowIdx, frozenRow, remove) {
        if (rowIdx < frozenRow) {
            this.updateSelectAllZIndex(remove);
        }
        else {
            this.parent.getRowHeaderContent().style.zIndex = remove ? '' : '2';
            this.updatedHeaderZIndex(remove);
        }
    };
    CellRenderer.prototype.processTemplates = function (cell, rowIdx, colIdx) {
        var sheet = this.parent.getActiveSheet();
        var ranges = sheet.ranges;
        var range;
        for (var j = 0, len = ranges.length; j < len; j++) {
            if (ranges[j].template) {
                range = getRangeIndexes(ranges[j].address.length ? ranges[j].address : ranges[j].startCell);
                if (range[0] <= rowIdx && range[1] <= colIdx && range[2] >= rowIdx && range[3] >= colIdx) {
                    if (cell) {
                        return this.compileCellTemplate(ranges[j].template, Object.assign({ rowIndex: rowIdx, colIndex: colIdx }, cell));
                    }
                    else {
                        if (!getCell(rowIdx, colIdx, sheet, true)) {
                            return this.compileCellTemplate(ranges[j].template, Object.assign({ rowIndex: rowIdx, colIndex: colIdx }, getCell(rowIdx, colIdx, sheet, null, true)));
                        }
                    }
                }
            }
        }
        return '';
    };
    CellRenderer.prototype.compileCellTemplate = function (template, cell) {
        var compiledStr;
        if (typeof template === 'string') {
            var templateString = void 0;
            if (template.trim().indexOf('#') === 0) {
                templateString = document.querySelector(template).innerHTML.trim();
            }
            else {
                templateString = template;
            }
            compiledStr = compile(templateString);
            if (!(this.parent).isVue || this.isSelector(template)) {
                return compiledStr(cell, this.parent, 'ranges', '', true)[0].outerHTML;
            }
            else {
                return compiledStr(cell, this.parent, 'ranges', '');
            }
        }
        else {
            compiledStr = compile(template);
            var compiledTemplate = compiledStr(cell, this.parent, 'ranges', '');
            return compiledTemplate[0] ? compiledTemplate : [compiledTemplate];
        }
    };
    CellRenderer.prototype.isSelector = function (template) {
        try {
            return !!document.querySelector(template);
        }
        catch (err) {
            return false;
        }
    };
    CellRenderer.prototype.getRowHeightOnInit = function () {
        var tTable = this.parent.createElement('table', { className: 'e-table e-test-table' });
        var tBody = tTable.appendChild(this.parent.createElement('tbody'));
        tBody.appendChild(this.tableRow);
        this.parent.element.appendChild(tTable);
        var height = this.tableRow.getBoundingClientRect().height;
        this.parent.element.removeChild(tTable);
        return height < 20 ? 20 : height;
    };
    CellRenderer.prototype.removeStyle = function (element, rowIdx, colIdx) {
        var cellStyle;
        if (element.style.length) {
            cellStyle = this.parent.getCellStyleValue(['borderLeft', 'border'], [rowIdx, colIdx + 1]);
            var rightBorder_1 = cellStyle.borderLeft || cellStyle.border;
            cellStyle = this.parent.getCellStyleValue(['borderTop', 'border'], [rowIdx + 1, colIdx]);
            var bottomBorder_1 = cellStyle.borderTop || cellStyle.border;
            if (rightBorder_1 || bottomBorder_1) {
                [].slice.call(element.style).forEach(function (style) {
                    if (rightBorder_1 && bottomBorder_1) {
                        if (!style.includes('border-right') && !style.includes('border-bottom')) {
                            element.style.removeProperty(style);
                        }
                    }
                    else if ((rightBorder_1 && !(style.indexOf('border-right') > -1) && (!bottomBorder_1 || bottomBorder_1 === 'none')) ||
                        (bottomBorder_1 && !(style.indexOf('border-bottom') > -1) && (!rightBorder_1 || rightBorder_1 === 'none'))) {
                        element.style.removeProperty(style);
                    }
                });
            }
            else {
                element.removeAttribute('style');
            }
        }
        var prevRowCell = this.parent.getCell(rowIdx - 1, colIdx);
        if (prevRowCell && prevRowCell.style.borderBottom) {
            var prevRowIdx = Number(prevRowCell.parentElement.getAttribute('aria-rowindex')) - 1;
            cellStyle = this.parent.getCellStyleValue(['borderBottom', 'border'], [prevRowIdx, colIdx]);
            if (!(cellStyle.borderBottom || cellStyle.border)) {
                prevRowCell.style.borderBottom = '';
            }
        }
        var prevColCell = element.previousElementSibling;
        if (prevColCell && prevColCell.style.borderRight) {
            colIdx = Number(prevColCell.getAttribute('aria-colindex')) - 1;
            cellStyle = this.parent.getCellStyleValue(['borderRight', 'border'], [rowIdx, colIdx]);
            if (!(cellStyle.borderRight || cellStyle.border)) {
                prevColCell.style.borderRight = '';
            }
        }
    };
    /**
     * @hidden
     * @param {number[]} range - Specifies the range.
     * @param {boolean} refreshing - Specifies the refresh.
     * @param {boolean} checkWrap - Specifies the range.
     * @param {boolean} checkHeight - Specifies the checkHeight.
     * @param {boolean} checkCF - Specifies the check for conditional format.
     * @param {boolean} skipFormatCheck - Specifies whether to skip the format checking while applying the number format.
     * @param {boolean} checkFormulaAdded - Specifies whether to check the formula added or not.
     * @param {boolean} isFromAutoFillOption - Specifies whether the value is from auto fill option or not.
     * @param {boolean} isHeightCheckNeeded - Specifies whether the refreshing is from undo-redo with format action.
     * @param {boolean} isSortAction - Specifies whether to check the sort action performed or not.
     * @param {boolean} isSelectAll - Specifies the all sheet cells selected or not.
     * @param {PreviousCellDetails[]} cells - Specifies the undo redo cell collections.
     * @returns {void}
     */
    CellRenderer.prototype.refreshRange = function (range, refreshing, checkWrap, checkHeight, checkCF, skipFormatCheck, checkFormulaAdded, isFromAutoFillOption, isHeightCheckNeeded, isSortAction, isSelectAll, cells) {
        if (isHeightCheckNeeded === void 0) { isHeightCheckNeeded = true; }
        var sheet = this.parent.getActiveSheet();
        var cRange = range.slice();
        var args;
        var cell;
        if (inView(this.parent, cRange, true)) {
            var cellIdx = 0;
            for (var i = cRange[0]; i <= cRange[2]; i++) {
                if (isHiddenRow(sheet, i)) {
                    continue;
                }
                for (var j = cRange[1]; j <= cRange[3]; j++) {
                    if (isHiddenCol(sheet, j)) {
                        continue;
                    }
                    cell = this.parent.getCell(i, j);
                    if (cell) {
                        args = { rowIdx: i, colIdx: j, td: cell, cell: getCell(i, j, sheet), isRefreshing: refreshing, lastCell: j ===
                                cRange[3], isRefresh: true, isHeightCheckNeeded: isHeightCheckNeeded, manualUpdate: true, first: '', onActionUpdate: checkHeight, skipFormatCheck: skipFormatCheck, isFromAutoFillOption: isFromAutoFillOption,
                            isSelectAll: isSelectAll, rowHeight: cells && cells[cellIdx] && cells[cellIdx].rowHeight };
                        cellIdx++;
                        if (checkFormulaAdded) {
                            args.address = getCellAddress(i, j);
                        }
                        this.update(args);
                        if (checkCF && sheet.conditionalFormats && sheet.conditionalFormats.length) {
                            this.parent.notify(applyCF, { indexes: [i, j], isAction: true });
                        }
                        this.parent.notify(renderFilterCell, { td: cell, rowIndex: i, colIndex: j });
                        if (checkWrap) {
                            this.setWrapByValue(sheet, args);
                        }
                    }
                    if (this.parent.calculationMode === 'Manual' && isSortAction) {
                        if (!cell) {
                            args = {
                                rowIdx: i, colIdx: j, td: cell, cell: getCell(i, j, sheet), isRefreshing: refreshing, lastCell: j ===
                                    cRange[3], isRefresh: true, isHeightCheckNeeded: isHeightCheckNeeded, manualUpdate: true, first: '',
                                onActionUpdate: checkHeight, skipFormatCheck: skipFormatCheck, isFromAutoFillOption: isFromAutoFillOption,
                                isSortAction: isSortAction
                            };
                        }
                        else {
                            args.isSortAction = isSortAction;
                        }
                        if (args.cell && args.cell.formula && sheet.isSheetCalculated) {
                            this.calculateFormula(args);
                        }
                    }
                }
            }
        }
    };
    CellRenderer.prototype.refresh = function (rowIdx, colIdx, lastCell, element, checkCF, checkWrap, skipFormatCheck, isRandomFormula, fillType) {
        var sheet = this.parent.getActiveSheet();
        if (!element && (isHiddenRow(sheet, rowIdx) || isHiddenCol(sheet, colIdx))) {
            return;
        }
        if (element || !this.parent.scrollSettings.enableVirtualization || this.parent.insideViewport(rowIdx, colIdx)) {
            var cell = (element || this.parent.getCell(rowIdx, colIdx));
            if (!cell) {
                return;
            }
            var args = { rowIdx: rowIdx, colIdx: colIdx, td: cell, cell: getCell(rowIdx, colIdx, sheet), isRefresh: true,
                lastCell: lastCell, isHeightCheckNeeded: true, manualUpdate: true, first: '', skipFormatCheck: skipFormatCheck,
                isRandomFormula: isRandomFormula, fillType: fillType };
            this.update(args);
            if (checkCF && sheet.conditionalFormats && sheet.conditionalFormats.length) {
                this.parent.notify(applyCF, { indexes: [rowIdx, colIdx], isAction: true });
            }
            this.parent.notify(renderFilterCell, { td: cell, rowIndex: rowIdx, colIndex: colIdx });
            if (checkWrap) {
                this.setWrapByValue(sheet, args);
            }
        }
    };
    CellRenderer.prototype.updateView = function (args) {
        if (isNullOrUndefined(args.sheetIndex) || (args.sheetIndex === this.parent.activeSheetIndex)) {
            if (!args.indexes) {
                var sheet = this.parent.getActiveSheet();
                var frozenRow = this.parent.frozenRowCount(sheet);
                var frozenCol = this.parent.frozenColCount(sheet);
                var topLeftCell = getRangeIndexes(sheet.topLeftCell);
                if (frozenRow && frozenCol) {
                    this.refreshRange([topLeftCell[0], topLeftCell[1], frozenRow - 1, frozenCol - 1], args.refreshing, args.checkWrap, false, args.checkCF);
                }
                if (frozenRow) {
                    this.refreshRange([topLeftCell[0], this.parent.viewport.leftIndex + frozenCol, frozenRow - 1, this.parent.viewport.rightIndex], args.refreshing, args.checkWrap, false, args.checkCF);
                }
                if (frozenCol) {
                    this.refreshRange([this.parent.viewport.topIndex + frozenRow, topLeftCell[1], this.parent.viewport.bottomIndex, frozenCol - 1], args.refreshing, args.checkWrap, false, args.checkCF);
                }
                args.indexes = [this.parent.viewport.topIndex + frozenRow, this.parent.viewport.leftIndex + frozenCol,
                    this.parent.viewport.bottomIndex, this.parent.viewport.rightIndex];
            }
            this.refreshRange(args.indexes, args.refreshing, args.checkWrap, false, args.checkCF);
        }
        else if (args.refreshing) {
            this.calculateFormula({ cell: getCell(args.indexes[0], args.indexes[1], getSheet(this.parent, args.sheetIndex), true, true),
                rowIdx: args.indexes[0], colIdx: args.indexes[1], sheetIndex: args.sheetIndex });
        }
    };
    /**
     * Removes the added event handlers and clears the internal properties of CellRenderer module.
     *
     * @returns {void}
     */
    CellRenderer.prototype.destroy = function () {
        this.parent.off(updateView, this.updateView);
        this.parent.off(calculateFormula, this.calculateFormula);
        if (this.element) {
            this.element.remove();
        }
        this.element = null;
        if (this.th) {
            this.th.remove();
        }
        this.th = null;
        if (this.tableRow) {
            this.tableRow.remove();
        }
        this.tableRow = null;
        this.parent = null;
    };
    return CellRenderer;
}());
export { CellRenderer };
