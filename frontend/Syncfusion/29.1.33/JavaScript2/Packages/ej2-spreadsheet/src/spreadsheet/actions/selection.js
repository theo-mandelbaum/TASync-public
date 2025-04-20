import { contentLoaded, mouseDown, virtualContentLoaded, cellNavigate, getUpdateUsingRaf, focusBorder, positionAutoFillElement, hideAutoFillOptions, performAutoFill, selectAutoFillRange, addDPRValue, rangeSelectionByKeydown } from '../common/index';
import { showAggregate, refreshOverlayElem, getRowIdxFromClientY, getColIdxFromClientX, hideAutoFillElement, showNote } from '../common/index';
import { updateSelectedRange, getColumnWidth, mergedRange, activeCellMergedRange, getSelectedRange, checkColumnValidation } from '../../workbook/index';
import { getRowHeight, isSingleCell, activeCellChanged, checkIsFormula, getSheetIndex } from '../../workbook/index';
import { EventHandler, addClass, removeClass, isNullOrUndefined, Browser, closest, remove, detach, getComponent } from '@syncfusion/ej2-base';
import { getMoveEvent, getEndEvent, isTouchStart, isMouseUp, isDiscontinuousRange } from '../common/index';
import { isTouchEnd, isTouchMove, getClientX, getClientY, mouseUpAfterSelection, selectRange, rowHeightChanged, completeAction } from '../common/index';
import { colWidthChanged, protectSelection, editOperation, initiateFormulaReference, initiateCur, clearCellRef, getScrollBarWidth } from '../common/index';
import { getRangeIndexes, getCellAddress, getRangeAddress, getCellIndexes, getSwapRange } from '../../workbook/common/address';
import { addressHandle, isMouseDown, isMouseMove, selectionStatus, setPosition, removeRangeEle, removeNoteContainer, setActionData } from '../common/index';
import { isCellReference, getSheetNameFromAddress, isLocked, getColumn, getCell, updateCell, getSheetName } from '../../workbook/index';
import { getIndexesFromAddress, selectionComplete, skipHiddenIdx, parseFormulaArgument, getChartRowIdxFromClientY, getChartColIdxFromClientX } from '../../workbook/common/index';
/**
 * Represents selection support for Spreadsheet.
 */
var Selection = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet selection module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet selection module.
     * @private
     */
    function Selection(parent) {
        this.invalidOperators = ['%'];
        this.formulaRange = [];
        /** @hidden */
        this.isNoteActiveElement = false;
        this.isNoteTouch = false;
        this.parent = parent;
        this.addEventListener();
        this.mouseMoveEvt = this.mouseMoveHandler.bind(this);
    }
    Selection.prototype.addEventListener = function () {
        this.parent.on(contentLoaded, this.init, this);
        this.parent.on(mouseDown, this.mouseDownHandler, this);
        this.parent.on(virtualContentLoaded, this.virtualContentLoadedHandler, this);
        this.parent.on(cellNavigate, this.cellNavigateHandler, this);
        this.parent.on(selectRange, this.selectRange, this);
        this.parent.on(rowHeightChanged, this.rowHeightChanged, this);
        this.parent.on(colWidthChanged, this.colWidthChanged, this);
        this.parent.on(protectSelection, this.protectHandler, this);
        this.parent.on(initiateFormulaReference, this.initiateFormulaSelection, this);
        this.parent.on(clearCellRef, this.clearBorder, this);
        this.parent.on(getRowIdxFromClientY, this.getRowIdxFromClientY, this);
        this.parent.on(getColIdxFromClientX, this.getColIdxFromClientX, this);
        this.parent.on(getChartRowIdxFromClientY, this.getRowIdxFromClientY, this);
        this.parent.on(getChartColIdxFromClientX, this.getColIdxFromClientX, this);
        this.parent.on(focusBorder, this.chartBorderHandler, this);
        this.parent.on(selectionStatus, this.isTouchSelectionStarted, this);
        this.parent.on(rangeSelectionByKeydown, this.selectionByKeydown, this);
    };
    Selection.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(contentLoaded, this.init);
            this.parent.off(mouseDown, this.mouseDownHandler);
            this.parent.off(virtualContentLoaded, this.virtualContentLoadedHandler);
            this.parent.off(cellNavigate, this.cellNavigateHandler);
            this.parent.off(selectRange, this.selectRange);
            this.parent.off(rowHeightChanged, this.rowHeightChanged);
            this.parent.off(colWidthChanged, this.colWidthChanged);
            this.parent.off(protectSelection, this.protectHandler);
            this.parent.off(initiateFormulaReference, this.initiateFormulaSelection);
            this.parent.off(clearCellRef, this.clearBorder);
            this.parent.off(getRowIdxFromClientY, this.getRowIdxFromClientY);
            this.parent.off(getColIdxFromClientX, this.getColIdxFromClientX);
            this.parent.off(getChartRowIdxFromClientY, this.getRowIdxFromClientY);
            this.parent.off(getChartColIdxFromClientX, this.getColIdxFromClientX);
            this.parent.off(focusBorder, this.chartBorderHandler);
            this.parent.off(selectionStatus, this.isTouchSelectionStarted);
            this.parent.off(rangeSelectionByKeydown, this.selectionByKeydown);
        }
    };
    Selection.prototype.isTouchSelectionStarted = function (args) {
        args.touchSelectionStarted = this.touchSelectionStarted;
    };
    Selection.prototype.selectionByKeydown = function (args) {
        this.selectRangeByIdx(args.range, args.e, false, false, false, false, undefined, false);
    };
    Selection.prototype.rowHeightChanged = function (args) {
        var _this = this;
        if (!args.threshold) {
            return;
        }
        getUpdateUsingRaf(function () {
            if (!_this.parent) {
                return;
            }
            var sheet = _this.parent.getActiveSheet();
            var ele = _this.getActiveCell();
            if (ele && (sheet.frozenRows || sheet.frozenColumns || sheet.selectedRange.includes(' '))) {
                _this.selectRange({ address: sheet.selectedRange, isRowHeightChanged: true });
                return;
            }
            var sRange = getSwapRange(getRangeIndexes(sheet.selectedRange));
            var mergeArgs = { range: sRange, isActiveCell: false, skipChecking: true };
            var isActiveCell;
            if (ele) {
                var rowIdx = getCellIndexes(sheet.activeCell)[0];
                _this.parent.notify(mergedRange, mergeArgs);
                if (mergeArgs.isActiveCell) {
                    var cell = getCell(sRange[0], sRange[1], sheet, false, true);
                    isActiveCell = cell.rowSpan > 1 && sRange[0] <= args.rowIdx && sRange[2] >= args.rowIdx;
                }
                if (rowIdx === args.rowIdx || isActiveCell) {
                    ele.style.height = parseFloat(ele.style.height) + args.threshold + "px";
                }
                else if (rowIdx > args.rowIdx) {
                    ele.style.top = parseFloat(ele.style.top) + args.threshold + "px";
                }
            }
            ele = _this.getSelectionElement();
            if (ele) {
                if (isActiveCell || (sRange[0] === sRange[2] && sRange[1] === sRange[3])) {
                    return;
                }
                var rowStart = sRange[0];
                var rowEnd = sRange[2];
                if (rowStart <= args.rowIdx && rowEnd >= args.rowIdx && ele) {
                    ele.style.height = parseFloat(ele.style.height) + args.threshold + "px";
                }
                else if (rowStart > args.rowIdx && ele) {
                    ele.style.top = parseFloat(ele.style.top) + args.threshold + "px";
                }
            }
        });
    };
    Selection.prototype.colWidthChanged = function (args) {
        var _this = this;
        if (!args.threshold) {
            return;
        }
        getUpdateUsingRaf(function () {
            if (!_this.parent) {
                return;
            }
            var sheet = _this.parent.getActiveSheet();
            var ele = _this.getActiveCell();
            var isRtl = _this.parent.enableRtl;
            if (ele && (sheet.frozenRows || sheet.frozenColumns || sheet.selectedRange.includes(' '))) {
                _this.selectRange({ address: sheet.selectedRange });
                return;
            }
            var sRange = getSwapRange(getRangeIndexes(sheet.selectedRange));
            var e = { range: sRange, isActiveCell: false, skipChecking: true };
            var isActiveCell;
            if (ele) {
                _this.parent.notify(mergedRange, e);
                var colIdx = getCellIndexes(sheet.activeCell)[1];
                if (e.isActiveCell) {
                    var cell = getCell(sRange[0], sRange[1], sheet, false, true);
                    isActiveCell = cell.rowSpan > 1 || cell.colSpan > 1;
                }
                if (colIdx === args.colIdx || isActiveCell) {
                    ele.style.width = parseFloat(ele.style.width) + args.threshold + "px";
                }
                else if (colIdx > args.colIdx) {
                    if (isRtl) {
                        ele.style.right = parseFloat(ele.style.right) + args.threshold + "px";
                    }
                    else {
                        ele.style.left = parseFloat(ele.style.left) + args.threshold + "px";
                    }
                }
            }
            ele = _this.getSelectionElement();
            if (!ele || isActiveCell || (sRange[0] === sRange[2] && sRange[1] === sRange[3])) {
                return;
            }
            var colStart = sRange[1];
            var colEnd = sRange[3];
            if (colStart <= args.colIdx && colEnd >= args.colIdx && ele) {
                ele.style.width = parseFloat(ele.style.width) + args.threshold + "px";
            }
            else if (colStart > args.colIdx && ele) {
                if (isRtl) {
                    ele.style.right = parseFloat(ele.style.right) + args.threshold + "px";
                }
                else {
                    ele.style.left = parseFloat(ele.style.left) + args.threshold + "px";
                }
            }
        });
    };
    Selection.prototype.selectRange = function (args) {
        args.address = this.parent.selectionSettings.mode === 'Single' ? getRangeAddress(getCellIndexes(args.address)) : args.address;
        this.selectMultiRange(args.address, null, null, args.skipChecking, args.isRowHeightChanged);
    };
    Selection.prototype.init = function () {
        this.createSelectionElement();
        var sheet = this.parent.getActiveSheet();
        var sRange = getSwapRange(getRangeIndexes(sheet.selectedRange));
        var actRange = getCellIndexes(sheet.activeCell);
        var inRange = sRange[0] <= actRange[0] && sRange[2] >= actRange[0] && sRange[1] <= actRange[1]
            && sRange[3] >= actRange[1];
        this.selectMultiRange(sheet.selectedRange, true, inRange);
    };
    Selection.prototype.selectMultiRange = function (address, isInit, inRange, skipChecking, isisRowHeightChanged) {
        var _this = this;
        var sheetIdx = this.parent.activeSheetIndex;
        if (address.indexOf('!') > -1) {
            sheetIdx = getSheetIndex(this.parent, getSheetNameFromAddress(address));
            address = address.substring(address.lastIndexOf('!') + 1);
        }
        if (this.parent.activeSheetIndex === sheetIdx) {
            address.split(' ').forEach(function (rng, idx) {
                _this.selectRangeByIdx(getRangeIndexes(rng), { type: 'mousedown', ctrlKey: idx !== 0 }, null, inRange, isInit, skipChecking, undefined, false, isisRowHeightChanged);
            });
        }
        else {
            updateSelectedRange(this.parent, address, this.parent.sheets[sheetIdx]);
        }
    };
    Selection.prototype.createSelectionElement = function () {
        var content = this.parent.getMainContent();
        var ele = this.parent.createElement('div', { className: 'e-selection' });
        content.appendChild(ele);
        ele = this.parent.createElement('div', { className: 'e-active-cell' });
        content.appendChild(ele);
    };
    Selection.prototype.isMergeActiveCell = function (sheet, activeIdx, rowIdx, colIdx) {
        var cell = getCell(rowIdx, colIdx, sheet, false, true);
        if ((!!cell.rowSpan && cell.rowSpan !== 1) || (!!cell.colSpan && cell.colSpan !== 1)) {
            var mergeArgs = { range: [rowIdx, colIdx, rowIdx, colIdx] };
            this.parent.notify(activeCellMergedRange, mergeArgs);
            var mergeRange = mergeArgs.range;
            return mergeRange[0] === activeIdx[0] && mergeRange[1] === activeIdx[1];
        }
        return false;
    };
    Selection.prototype.mouseDownHandler = function (e) {
        var _this = this;
        this.isNoteActiveElement = !isNullOrUndefined(document) && !isNullOrUndefined(document.activeElement) &&
            typeof document.activeElement.className === 'string' && document.activeElement.className.indexOf('e-addNoteContainer') > -1;
        if (closest(e.target, '.e-scrollbar') || e.target.classList.contains('e-main-panel') ||
            e.target.classList.contains('e-sheet')) {
            return;
        }
        var eventArgs = { action: 'getCurrentEditValue', editedValue: '' };
        var sheet = this.parent.getActiveSheet();
        this.parent.notify(editOperation, eventArgs);
        var isFormulaEdit = checkIsFormula(eventArgs.editedValue, true);
        var isNoteCellIndex = this.parent.enableNotes && !isNullOrUndefined(this.parent.spreadsheetNoteModule.noteCellIndexes);
        var cellIndexes = isNoteCellIndex ? this.parent.spreadsheetNoteModule.noteCellIndexes :
            getCellIndexes(this.parent.getActiveSheet().activeCell);
        var targetElement = this.parent.getCell(cellIndexes[0], cellIndexes[1]);
        if (!isNullOrUndefined(targetElement) && targetElement.children !== null && targetElement.children.length > 0
            && this.isNoteActiveElement && targetElement.children[targetElement.children.length - 1].classList.contains('e-addNoteIndicator')) {
            var cell = getCell(cellIndexes[0], cellIndexes[1], sheet);
            var eventAction = !isNullOrUndefined(cell) && cell.notes ? 'editNote' : 'addNote';
            var noteContainer = document.getElementsByClassName('e-addNoteContainer')[0];
            var address = getSheetName(this.parent, this.parent.activeSheetIndex) + '!' + getRangeAddress(cellIndexes);
            if (!isNullOrUndefined(noteContainer) && !isNullOrUndefined(noteContainer.value) && e.target.className !== 'e-addNoteContainer'
                && ((isNullOrUndefined(cell) || isNullOrUndefined(cell.notes)) || (cell.notes !== noteContainer.value))) {
                this.parent.notify(setActionData, { args: { action: 'beforeCellSave', eventArgs: { address: address } } });
                updateCell(this.parent, this.parent.getActiveSheet(), { rowIdx: cellIndexes[0], colIdx: cellIndexes[1], preventEvt: true,
                    cell: { notes: noteContainer.value, isNoteEditable: false } });
                var eventArgs_1 = { notes: noteContainer.value, address: address };
                this.parent.notify(completeAction, { eventArgs: eventArgs_1, action: eventAction });
            }
            else if (e.target.className !== 'e-addNoteContainer') {
                updateCell(this.parent, this.parent.getActiveSheet(), { rowIdx: cellIndexes[0], colIdx: cellIndexes[1], preventEvt: true,
                    cell: { isNoteEditable: false } });
            }
            this.parent.spreadsheetNoteModule.isShowNote = null;
        }
        if (!this.isNoteTouch && e.target.className !== 'e-addNoteContainer' && document.getElementsByClassName('e-addNoteContainer') && document.getElementsByClassName('e-addNoteContainer').length > 0) {
            this.parent.notify(removeNoteContainer, '');
        }
        if (this.isNoteTouch && e.type.indexOf('mouse') > -1) {
            this.isNoteTouch = false;
        }
        if (!this.parent.isEdit || isFormulaEdit) {
            var overlayElem = document.getElementById(this.parent.element.id + '_overlay');
            if (typeof (e.target.className) === 'string') {
                if (e.target.className.indexOf('e-ss-overlay') > -1) {
                    return;
                }
            }
            else if (overlayElem) {
                overlayElem.classList.remove('e-ss-overlay-active');
            }
            if (closest(e.target, '.e-datavisualization-chart')) {
                return;
            }
            if (sheet.isProtected && !sheet.protectSettings.selectCells && !sheet.protectSettings.selectUnLockedCells) {
                return;
            }
            if (!(closest(e.target, '.e-findtool-dlg') || closest(e.target, '.e-dragfill-ddb'))) {
                if (this.getSheetElement().contains(e.target) && !e.target.classList.contains('e-colresize')
                    && !e.target.classList.contains('e-rowresize')) {
                    var sheet_1 = this.parent.getActiveSheet();
                    var mode = this.parent.selectionSettings.mode;
                    var mouseClientX = getClientX(e);
                    var mouseClientY = getClientY(e);
                    var rowIdx = this.getRowIdxFromClientY({ clientY: mouseClientY, target: e.target });
                    var colIdx = this.getColIdxFromClientX({ clientX: mouseClientX, target: e.target });
                    var activeIdx = getCellIndexes(sheet_1.activeCell);
                    var isRowSelected = void 0;
                    var isColSelected = void 0;
                    if (sheet_1.showHeaders) {
                        var trgt = e.target;
                        if (sheet_1.frozenColumns || sheet_1.frozenRows) {
                            var headerEle = this.parent.getSelectAllContent().querySelector('thead');
                            if (headerEle) {
                                isColSelected = (this.parent.getColumnHeaderContent().contains(trgt) || headerEle.contains(trgt)) &&
                                    trgt.classList.contains('e-header-cell') || (trgt.classList.contains('e-selectall-table') &&
                                    rowIdx < 0 && colIdx >= this.parent.frozenColCount(sheet_1));
                            }
                            else {
                                isColSelected = this.parent.getColumnHeaderContent().contains(trgt) &&
                                    trgt.classList.contains('e-header-cell');
                            }
                            headerEle = this.parent.getSelectAllContent().querySelector('tbody');
                            if (headerEle) {
                                isRowSelected = (this.parent.getRowHeaderContent().contains(trgt) || headerEle.contains(trgt)) &&
                                    trgt.classList.contains('e-header-cell') || (trgt.classList.contains('e-selectall-table') &&
                                    colIdx < 0 && rowIdx >= this.parent.frozenRowCount(sheet_1));
                            }
                            else {
                                isRowSelected = this.parent.getRowHeaderContent().contains(trgt) &&
                                    trgt.classList.contains('e-header-cell');
                            }
                            if (rowIdx === -1) {
                                rowIdx = 0;
                            }
                            if (colIdx === -1) {
                                colIdx = 0;
                            }
                        }
                        else {
                            isRowSelected = this.parent.getRowHeaderContent().contains(e.target);
                            isColSelected = this.parent.getColumnHeaderContent().contains(e.target);
                        }
                    }
                    if ((sheet_1.frozenRows || sheet_1.frozenColumns) && !isColSelected && !isRowSelected) {
                        var trgt_1 = e.target;
                        var idx = ['e-rowhdr-table', 'e-selectall-table', 'e-colhdr-table'].findIndex(function (cls) { return trgt_1.classList.contains(cls); });
                        if (idx > -1) {
                            var selector = ['.e-row-header', '.e-selectall-container', '.e-column-header'][idx];
                            var closestEle = closest(trgt_1, selector);
                            if (closestEle && closestEle.style.zIndex) {
                                var cell = getCell(rowIdx, colIdx, sheet_1);
                                if ((cell && cell.validation && cell.validation.type === 'List') ||
                                    (checkColumnValidation(sheet_1.columns[colIdx], rowIdx, colIdx) &&
                                        sheet_1.columns[colIdx].validation.type === 'List')) {
                                    var td = this.parent.getCell(rowIdx, colIdx);
                                    if (td) {
                                        var listEle = td.querySelector('.e-validation-list');
                                        if (listEle) {
                                            var listEleRect = listEle.getBoundingClientRect();
                                            var dropdownClicked = mouseClientX >= listEleRect.left &&
                                                mouseClientX <= listEleRect.right && mouseClientY >= listEleRect.top &&
                                                mouseClientY <= listEleRect.bottom;
                                            if (dropdownClicked) {
                                                var ddlEle = listEle.querySelector('.e-dropdownlist');
                                                if (ddlEle) {
                                                    var ddlInst = getComponent(ddlEle, 'dropdownlist');
                                                    if (ddlInst) {
                                                        ddlInst.showPopup();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (e.which === 3 && this.isSelected(rowIdx, colIdx)) {
                        return;
                    }
                    if (e.target.classList.contains('e-autofill')) {
                        this.isautoFillClicked = true;
                        var autoFillDdb = e.target.parentElement.querySelector('.e-dragfill-ddb');
                        if (!autoFillDdb || autoFillDdb.classList.contains('e-hide')) {
                            this.dAutoFillCell = sheet_1.selectedRange;
                        }
                    }
                    var topLeftIdx = getRangeIndexes(sheet_1.topLeftCell);
                    var range = void 0;
                    if (isRowSelected) {
                        this.isRowSelected = true;
                        if (!e.shiftKey || mode === 'Single') {
                            this.startCell = [rowIdx, 0];
                        }
                        else if (!this.startCell) {
                            this.startCell = [topLeftIdx[0], 0];
                        }
                        range = [this.startCell[0], sheet_1.frozenColumns ? topLeftIdx[1] : 0, rowIdx, sheet_1.colCount - 1];
                    }
                    else if (isColSelected) {
                        this.isColSelected = true;
                        if (!e.shiftKey || mode === 'Single') {
                            this.startCell = [0, colIdx];
                        }
                        else if (!this.startCell) {
                            this.startCell = [0, topLeftIdx[1]];
                        }
                        range = [sheet_1.frozenRows ? topLeftIdx[0] : 0, this.startCell[1], sheet_1.rowCount - 1, colIdx];
                    }
                    else if (closest(e.target, '.e-select-all-cell')) {
                        this.startCell = [sheet_1.frozenRows ? topLeftIdx[0] : 0, sheet_1.frozenColumns ? topLeftIdx[1] : 0];
                        range = [].concat(this.startCell, [sheet_1.rowCount - 1, sheet_1.colCount - 1]);
                    }
                    else if (!e.target.classList.contains('e-sheet-content')) {
                        if (!e.shiftKey || mode === 'Single') {
                            this.startCell = [rowIdx, colIdx];
                        }
                        if (!this.isautoFillClicked && !closest(e.target, '.e-filloption')) {
                            range = [].concat(this.startCell ? this.startCell : getCellIndexes(sheet_1.activeCell), [rowIdx, colIdx]);
                        }
                    }
                    if (isTouchStart(e) && !(isRowSelected || isColSelected) && range) {
                        var colRowSelectArgs = this.isRowColSelected(range);
                        this.isRowSelected = colRowSelectArgs.isRowSelected;
                        this.isColSelected = colRowSelectArgs.isColSelected;
                    }
                    var preventEvt = e.ctrlKey && range && sheet_1.selectedRange.includes(getRangeAddress(range));
                    if (!preventEvt && mode === 'Multiple' && (!isTouchEnd(e) && (!isTouchStart(e) ||
                        (isTouchStart(e) && ((activeIdx[0] === rowIdx && activeIdx[1] === colIdx) ||
                            this.isMergeActiveCell(sheet_1, activeIdx, rowIdx, colIdx)))) || isColSelected || isRowSelected)) {
                        document.addEventListener(getMoveEvent().split(' ')[0], this.mouseMoveEvt);
                        if (!Browser.isPointer) {
                            if (Browser.isIos && isTouchStart(e) && e.target && e.target.classList.contains('e-cell')) {
                                e.preventDefault();
                            }
                            document.addEventListener(getMoveEvent().split(' ')[1], this.mouseMoveEvt, { passive: false });
                        }
                        this.touchSelectionStarted = true;
                    }
                    else {
                        this.touchSelectionStarted = false;
                    }
                    if (!isTouchEnd(e)) {
                        if (preventEvt) {
                            if (this.parent.isEdit) {
                                var updateFormulaCurPos_1 = function (e) {
                                    EventHandler.remove(document, getEndEvent(), updateFormulaCurPos_1);
                                    _this.updateFormulaCursorPosition(e);
                                };
                                EventHandler.add(document, getEndEvent(), updateFormulaCurPos_1, this);
                            }
                        }
                        else {
                            EventHandler.add(document, getEndEvent(), this.mouseUpHandler, this);
                        }
                    }
                    var isNoteAvailable = (e.target.className === 'e-addNoteIndicator' ||
                        (e.target.children.length > 0 && e.target.children[e.target.childElementCount - 1].className.indexOf('e-addNoteIndicator') > -1));
                    if (isTouchStart(e) && isNoteAvailable) {
                        var cellIndexes_1 = getCellIndexes(getRangeAddress(range).split(':')[0]);
                        this.parent.notify(showNote, { rowIndex: cellIndexes_1[0], columnIndex: cellIndexes_1[1], isNoteEditable: false });
                        this.isNoteTouch = true;
                        this.parent.spreadsheetNoteModule.isNoteVisibleOnTouch = true;
                    }
                    if (isTouchStart(e) && !(isColSelected || isRowSelected)) {
                        this.touchEvt = e;
                        return;
                    }
                    if (range) {
                        this.selectRangeByIdx(range, e);
                    }
                    if (!this.isNoteTouch && e.type.indexOf('mouse') > -1 && isNoteAvailable) {
                        var cellIndexes_2 = getCellIndexes(getRangeAddress(range).split(':')[0]);
                        this.parent.notify(showNote, { rowIndex: cellIndexes_2[0], columnIndex: cellIndexes_2[1], isNoteEditable: false });
                        this.parent.spreadsheetNoteModule.isNoteVisible = true;
                    }
                    if (this.parent.isMobileView()) {
                        this.parent.element.classList.add('e-mobile-focused');
                        this.parent.renderModule.setSheetPanelSize();
                    }
                }
            }
        }
        if (isFormulaEdit && (e.target.classList.contains('e-cell') || e.target.classList.contains('e-wrap-content') ||
            e.target.classList.contains('e-header-cell')) && this.parent.isEdit) {
            var range = this.parent.getActiveSheet().selectedRange;
            var lastRange = range.split(' ');
            range = isSingleCell(getIndexesFromAddress(lastRange[lastRange.length - 1])) ? lastRange[lastRange.length - 1].split(':')[0] : lastRange[lastRange.length - 1];
            this.parent.notify(addressHandle, { range: range, isSelect: false, isMouseDown: e.ctrlKey });
        }
    };
    Selection.prototype.mouseMoveHandler = function (e) {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        if (isTouchMove(e)) {
            e.preventDefault();
        }
        var eventArgs = { action: 'getCurrentEditValue', editedValue: '' };
        this.parent.notify(editOperation, eventArgs);
        var isFormulaEdit = checkIsFormula(eventArgs.editedValue, true);
        var verticalContent = this.parent.getMainContent().parentElement;
        var horizontalContent = this.parent.element.getElementsByClassName('e-scroller')[0];
        var clientRect = verticalContent.getBoundingClientRect();
        var frozenCol = this.parent.frozenColCount(sheet);
        var left = clientRect.left + this.parent.sheetModule.getRowHeaderWidth(sheet, false, true);
        var right = clientRect.right - getScrollBarWidth();
        var top = clientRect.top;
        var bottom = clientRect.bottom;
        var clientX = getClientX(e);
        var clientY = getClientY(e);
        // remove math.min or handle top and left auto scroll
        var colIdx = this.isRowSelected ? sheet.colCount - 1 :
            this.getColIdxFromClientX({ clientX: clientX, target: e.target });
        var rowIdx = this.isColSelected ? sheet.rowCount - 1 :
            this.getRowIdxFromClientY({ clientY: clientY, target: e.target });
        var prevIndex;
        var rangeIndex;
        if (e.ctrlKey) {
            var selRanges = sheet.selectedRange.split(' ');
            prevIndex = getRangeIndexes(selRanges[selRanges.length - 1]);
        }
        else {
            prevIndex = getRangeIndexes(sheet.selectedRange);
        }
        if (Browser.isDevice) {
            var screenWidth = screen.availWidth;
            if (right >= screenWidth - 40) {
                right -= (40 - (screenWidth - right));
            }
            if (!sheet.showHeaders && left < 40) {
                left += (40 - left);
            }
        }
        var mergeArgs = { range: [rowIdx, colIdx, rowIdx, colIdx] };
        this.parent.notify(activeCellMergedRange, mergeArgs);
        if (mergeArgs.range[2] === prevIndex[2] && mergeArgs.range[3] === prevIndex[3] && clientY <= bottom && clientY >= top &&
            clientX <= right && clientX >= left) {
            return;
        }
        var frozenRow = this.parent.frozenRowCount(sheet);
        if (!isFormulaEdit && !this.isColSelected && !this.isRowSelected) {
            prevIndex = getCellIndexes(sheet.activeCell);
        }
        var isScrollDown = clientY > bottom && !this.isColSelected && rowIdx < sheet.rowCount;
        var isScrollUp = clientY < top && rowIdx >= 0 && !this.isColSelected &&
            !!verticalContent.scrollTop && (!frozenRow || prevIndex[0] >= frozenRow);
        var isScrollRight = clientX > right && !this.isRowSelected && colIdx < sheet.colCount;
        var isScrollLeft = clientX < left && colIdx >= 0 && !this.isRowSelected &&
            !!horizontalContent.scrollLeft && (!frozenCol || prevIndex[1] >= frozenCol);
        this.clearInterval();
        var scrollUpRowIdx;
        var scrollUpColIdx;
        if (isScrollDown || isScrollUp || isScrollRight || isScrollLeft) {
            if (isScrollUp || isScrollLeft) {
                scrollUpRowIdx = rowIdx;
                scrollUpColIdx = colIdx;
            }
            var scrollSelection_1 = function () {
                if (isScrollDown || isScrollUp) {
                    rowIdx = _this.getRowIdxFromClientY({ clientY: isScrollDown ? bottom : top });
                    if (rowIdx >= sheet.rowCount) { // clear interval when scroll up
                        _this.clearInterval();
                        return;
                    }
                    verticalContent.scrollTop += (isScrollDown ? 1 : -1) * getRowHeight(sheet, rowIdx);
                }
                if (isScrollRight || isScrollLeft) {
                    colIdx = _this.getColIdxFromClientX({ clientX: isScrollRight ? right : left, isFScroll: true });
                    if (colIdx >= sheet.colCount) { // clear interval when scroll left
                        _this.clearInterval();
                        return;
                    }
                    horizontalContent.scrollLeft += (isScrollRight ? 1 : -1) * getColumnWidth(sheet, colIdx);
                }
                if ((isScrollUp && sheet.frozenRows && !verticalContent.scrollTop) ||
                    (isScrollLeft && sheet.frozenColumns && !horizontalContent.scrollLeft)) {
                    _this.selectRangeByIdx([].concat(prevIndex[0], prevIndex[1], [scrollUpRowIdx, scrollUpColIdx]), e);
                    _this.clearInterval();
                    return;
                }
                _this.selectRangeByIdx([].concat(prevIndex[0], prevIndex[1], [rowIdx, colIdx]), e);
            };
            scrollSelection_1();
            this.scrollInterval = setInterval(function () {
                scrollSelection_1();
                _this.clearInterval();
                _this.scrollInterval = setInterval(scrollSelection_1, 100);
            });
        }
        else {
            var indexes = [].concat(prevIndex[0], prevIndex[1], [rowIdx, colIdx]);
            if (frozenRow && indexes[0] < frozenRow && indexes[2] >= frozenRow && verticalContent.scrollTop) {
                verticalContent.scrollTop = 0;
                indexes[2] = frozenRow;
            }
            if (frozenCol && indexes[1] < frozenCol && indexes[3] >= frozenCol && horizontalContent.scrollLeft) {
                horizontalContent.scrollLeft = 0;
                indexes[3] = frozenCol;
            }
            if (this.isautoFillClicked) {
                if (e.target.classList.contains('e-autofill')) {
                    this.dAutoFillCell = sheet.selectedRange;
                }
                var args = { e: e, indexes: null };
                this.parent.notify(selectAutoFillRange, args);
                indexes = args.indexes;
                rangeIndex = indexes;
            }
            this.selectRangeByIdx(indexes, e);
        }
        if (isFormulaEdit && this.parent.isEdit && !closest(e.target, '#' + this.parent.element.id + '_edit')) {
            var range = void 0;
            if (this.isautoFillClicked) {
                range = getRangeAddress(rangeIndex);
            }
            else {
                range = this.parent.getActiveSheet().selectedRange;
            }
            var lastRange = range.split(' ');
            this.parent.notify(addressHandle, { range: lastRange[lastRange.length - 1], isSelect: false });
        }
    };
    Selection.prototype.mouseUpHandler = function (e) {
        var rowIdx = this.getRowIdxFromClientY({ clientY: getClientY(e), target: e.target });
        var colIdx = this.getColIdxFromClientX({ clientX: getClientX(e), target: e.target });
        this.clearInterval();
        if (isTouchEnd(e) && !(this.isColSelected || this.isRowSelected) &&
            (this.getRowIdxFromClientY({ clientY: getClientY(this.touchEvt), target: e.target }) === rowIdx &&
                this.getColIdxFromClientX({ clientX: getClientX(this.touchEvt), target: e.target }) === colIdx)) {
            this.mouseDownHandler(e);
        }
        document.removeEventListener(getMoveEvent().split(' ')[0], this.mouseMoveEvt);
        if (!Browser.isPointer) {
            document.removeEventListener(getMoveEvent().split(' ')[1], this.mouseMoveEvt);
        }
        EventHandler.remove(document, getEndEvent(), this.mouseUpHandler);
        var sheet = this.parent.getActiveSheet();
        if (sheet.frozenRows || sheet.frozenColumns) {
            removeRangeEle(this.parent.element, null, 'e-cur-selection', true, true);
        }
        this.parent.notify(mouseUpAfterSelection, e);
        if (this.isautoFillClicked) {
            var sheet_2 = this.parent.getActiveSheet();
            var indexes = getRangeIndexes(sheet_2.selectedRange);
            if (!(this.isColSelected && indexes[1] === colIdx) && !(this.isRowSelected && indexes[0] === rowIdx)) {
                var autoFillDdb = e.target.parentElement.querySelector('.e-dragfill-ddb');
                if (!autoFillDdb || autoFillDdb.classList.contains('e-hide')) {
                    this.dAutoFillCell = sheet_2.selectedRange;
                }
                this.parent.notify(performAutoFill, { event: e, dAutoFillCell: this.dAutoFillCell });
            }
            this.isautoFillClicked = false;
        }
        else if (!e.ctrlKey && !isDiscontinuousRange(getSelectedRange(this.parent.getActiveSheet()))) {
            this.parent.notify(positionAutoFillElement, null);
        }
        else {
            this.parent.notify(hideAutoFillElement, null);
        }
        this.updateFormulaCursorPosition(e);
    };
    Selection.prototype.updateFormulaCursorPosition = function (e) {
        if (this.parent.isEdit) {
            var eventArgs = { action: 'getCurrentEditValue', editedValue: '' };
            this.parent.notify(editOperation, eventArgs);
            var isFormulaEdit = checkIsFormula(eventArgs.editedValue, true);
            if (isFormulaEdit) {
                this.parent.notify(initiateCur, { isCellEdit: e.target.classList.contains('e-spreadsheet-edit') });
            }
        }
    };
    Selection.prototype.isSelected = function (rowIdx, colIdx) {
        var isSelected = false;
        var indexes;
        var ranges = this.parent.getActiveSheet().selectedRange.split(' ');
        for (var i = 0; i < ranges.length; i++) {
            indexes = getSwapRange(getRangeIndexes(ranges[i]));
            if (indexes[0] <= rowIdx && rowIdx <= indexes[2] && indexes[1] <= colIdx && colIdx <= indexes[3]) {
                isSelected = true;
                break;
            }
        }
        return isSelected;
    };
    Selection.prototype.virtualContentLoadedHandler = function (args) {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        var indexes;
        var isColSelected;
        var isRowSelected;
        sheet.selectedRange.split(' ').forEach(function (rng, idx) {
            indexes = getRangeIndexes(rng);
            isRowSelected = (indexes[1] === 0 && indexes[3] === args.prevRowColCnt.colCount - 1);
            isColSelected = (indexes[0] === 0 && indexes[2] === args.prevRowColCnt.rowCount - 1);
            if (isRowSelected || isColSelected) {
                if (isColSelected && isRowSelected) {
                    indexes = [0, 0, sheet.rowCount - 1, sheet.colCount - 1];
                }
                else if (isColSelected) {
                    indexes = [0, indexes[1], sheet.rowCount - 1, indexes[3]];
                }
                else {
                    indexes = [indexes[0], 0, indexes[2], sheet.colCount - 1];
                }
                if (sheet.frozenRows || sheet.frozenColumns) {
                    _this.selectRangeByIdx(indexes, { type: 'mousedown', ctrlKey: idx !== 0 }, false, false, false, false, undefined, true);
                }
                else {
                    _this.selectRangeByIdx(indexes, null, true, null, null, null, idx);
                }
            }
            else {
                indexes = getRangeIndexes(rng);
                var topIdx = _this.parent.viewport.topIndex + _this.parent.frozenRowCount(sheet);
                var leftIdx = _this.parent.viewport.leftIndex + _this.parent.frozenColCount(sheet);
                _this.highlightHdr(indexes, idx === 0 ? false : true, indexes[0] >= topIdx || indexes[2] >= topIdx, indexes[1] >= leftIdx || indexes[3] >= leftIdx);
            }
        });
    };
    Selection.prototype.clearInterval = function () {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        }
    };
    Selection.prototype.getScrollLeft = function () {
        return this.parent.scrollModule ? this.parent.scrollModule.prevScroll.scrollLeft : 0;
    };
    Selection.prototype.cellNavigateHandler = function (args) {
        var sheet = this.parent.getActiveSheet();
        if (sheet.isProtected && !sheet.protectSettings.selectCells && !sheet.protectSettings.selectUnLockedCells) {
            return;
        }
        args.type = 'mousedown';
        this.selectRangeByIdx(args.range, args, false, false, false, false, undefined, args.preventAnimation);
    };
    Selection.prototype.getColIdxFromClientX = function (e) {
        var _this = this;
        var width = 0;
        var sheet = this.parent.getActiveSheet();
        var left = 0;
        if (e.isImage) {
            left = e.clientX;
        }
        else {
            var cliRect = document.getElementById(this.parent.element.id + '_sheet').getBoundingClientRect();
            if (this.parent.enableRtl) {
                left = (cliRect.right - this.parent.sheetModule.getRowHeaderWidth(sheet, true, true) - 1) - e.clientX;
            }
            else {
                left = e.clientX - (cliRect.left + this.parent.sheetModule.getRowHeaderWidth(sheet, true, true) + 1);
            }
            left += this.parent.viewport.beforeFreezeWidth;
            var frozenColPosition = function () {
                var frozenCol = _this.parent.element.querySelector('.e-frozen-column');
                return parseInt(frozenCol.style[_this.parent.enableRtl ? 'right' : 'left'], 10) / _this.parent.viewport.scaleX;
            };
            if ((!e.target || (!closest(e.target, '.e-row-header') && !closest(e.target, '.e-selectall-container')) ||
                this.isScrollableArea(e.clientX, e.target, true)) && (!this.parent.frozenColCount(sheet) ||
                left > frozenColPosition() || e.isFScroll)) {
                left += (this.getScrollLeft() / this.parent.viewport.scaleX);
            }
            if (sheet.frozenRows && left < 0 && sheet.showHeaders) {
                return -1;
            }
        }
        var size;
        for (var i = 0;; i++) {
            size = width += getColumnWidth(sheet, i, null, !e.isImage) / this.parent.viewport.scaleX;
            if (left < (e.isImage ? Number(addDPRValue(size).toFixed(2)) : size) ||
                (this.parent.scrollSettings.isFinite && i === sheet.colCount - 1)) {
                if (!e.isImage) {
                    e.size = left;
                }
                e.clientX = i;
                return i;
            }
        }
    };
    Selection.prototype.isScrollableArea = function (offset, target, isclientX) {
        if (!target.classList.contains('e-table')) {
            return false;
        }
        if (isclientX) {
            return offset > this.parent.getMainContent().getBoundingClientRect().left;
        }
        else {
            return offset > this.parent.getMainContent().parentElement.getBoundingClientRect().top;
        }
    };
    Selection.prototype.getRowIdxFromClientY = function (args) {
        var height = 0;
        var sheet = this.parent.getActiveSheet();
        var top = 0;
        if (args.isImage) {
            top = args.clientY;
        }
        else {
            var sheetEle = document.getElementById(this.parent.element.id + '_sheet');
            top = args.clientY + this.parent.viewport.beforeFreezeHeight -
                (sheetEle.getBoundingClientRect().top + (sheet.showHeaders ? 31 / this.parent.viewport.scaleY : 0));
            if (!args.target || !closest(args.target, '.e-header-panel') || this.isScrollableArea(args.clientY, args.target)) {
                top += (this.parent.getMainContent().parentElement.scrollTop / this.parent.viewport.scaleY);
            }
            if (sheet.frozenColumns && top < 0 && sheet.showHeaders) {
                return -1;
            }
        }
        var size;
        for (var i = 0;; i++) {
            size = height += getRowHeight(sheet, i, !args.isImage) / this.parent.viewport.scaleY;
            if (top < (args.isImage ? Number(addDPRValue(size).toFixed(2)) : size) ||
                (this.parent.scrollSettings.isFinite && i === sheet.rowCount - 1)) {
                if (!args.isImage) {
                    args.size = top;
                }
                args.clientY = i;
                return i;
            }
        }
    };
    Selection.prototype.initFormulaReferenceIndicator = function (range) {
        if (this.parent.isEdit) {
            var forRefIndicator = this.parent.createElement('div', { className: 'e-formularef-indicator' });
            forRefIndicator.appendChild(this.parent.createElement('div', { className: 'e-top' }));
            forRefIndicator.appendChild(this.parent.createElement('div', { className: 'e-bottom' }));
            forRefIndicator.appendChild(this.parent.createElement('div', { className: 'e-left' }));
            forRefIndicator.appendChild(this.parent.createElement('div', { className: 'e-right' }));
            this.parent.getMainContent().appendChild(forRefIndicator);
            setPosition(this.parent, forRefIndicator, range, 'e-formularef-indicator');
        }
    };
    Selection.prototype.isMouseEvent = function (e) {
        return isMouseDown(e) || isMouseUp(e) || isMouseMove(e);
    };
    Selection.prototype.selectRangeByIdx = function (range, e, isScrollRefresh, isActCellChanged, isInit, skipChecking, selectedRowColIdx, preventAnimation, isisRowHeightChanged) {
        var _this = this;
        var isMouseEvent = e && this.isMouseEvent(e);
        if (e && e.target && isMouseEvent && closest(e.target, '#' + this.parent.element.id + '_edit')) {
            return;
        }
        var eventArgs = { action: 'getCurrentEditValue', editedValue: '',
            endFormulaRef: false };
        this.parent.notify(editOperation, eventArgs);
        var isFormulaEdit = (this.parent.isEdit ? checkIsFormula(eventArgs.editedValue, true) : false) &&
            !eventArgs.endFormulaRef;
        var isMultiRange = e && e.ctrlKey && isMouseDown(e);
        var ele;
        if (!isMultiRange) {
            ele = this.getSelectionElement(e, selectedRowColIdx);
        }
        var sheet = this.parent.getActiveSheet();
        var topLeftIdx = getRangeIndexes(sheet.topLeftCell);
        var formulaRefIndicator = this.parent.element.querySelector('.e-formularef-indicator');
        var mergeArgs = { range: [].slice.call(range), isActiveCell: false, skipChecking: skipChecking };
        var isMergeRange;
        var rowColSelectArgs = this.isRowColSelected(range);
        if (!rowColSelectArgs.isColSelected && !rowColSelectArgs.isRowSelected) {
            this.parent.notify(mergedRange, mergeArgs);
        }
        if (range !== mergeArgs.range) {
            isMergeRange = true;
        }
        range = mergeArgs.range;
        var promise = new Promise(function (resolve) { resolve((function () { })()); });
        var args = { range: getRangeAddress(range), cancel: false };
        if (sheet.isProtected) {
            var protectCell = getCell(range[2], range[3], sheet);
            if (sheet.protectSettings.selectUnLockedCells && !sheet.protectSettings.selectCells) {
                if (!isNullOrUndefined(protectCell)) {
                    if ((protectCell.isLocked === true || isNullOrUndefined(protectCell.isLocked))) {
                        return;
                    }
                    else {
                        var sheetEle = this.parent.element.getElementsByClassName('e-sheet-panel')[0];
                        if (sheetEle && sheetEle.classList.contains('e-protected')) {
                            sheetEle.classList.remove('e-protected');
                        }
                    }
                }
                else if (!sheet.protectSettings.selectCells) {
                    return;
                }
            }
        }
        this.parent.trigger('beforeSelect', args);
        if (args.cancel) {
            return;
        }
        if (isFormulaEdit && formulaRefIndicator) {
            formulaRefIndicator.parentElement.removeChild(formulaRefIndicator);
        }
        if (!isisRowHeightChanged) {
            this.parent.notify(hideAutoFillOptions, null);
        }
        if ((isSingleCell(range) || mergeArgs.isActiveCell) && !isMultiRange) {
            if (ele) {
                if (!ele.classList.contains('e-multi-range')) {
                    ele.classList.add('e-hide');
                }
                if (sheet.frozenRows || sheet.frozenColumns) {
                    var clsName = isMouseMove(e) ? 'e-cur-selection' : 'e-selection';
                    removeRangeEle(this.parent.getSelectAllContent(), null, clsName, true);
                    removeRangeEle(this.parent.getColumnHeaderContent(), null, clsName, true);
                    removeRangeEle(this.parent.getRowHeaderContent(), null, clsName, true);
                }
            }
            if (!sheet.frozenColumns && !sheet.frozenRows && ele) {
                setPosition(this.parent, ele, range);
            }
            if (isFormulaEdit && e && e.target && (!isMouseEvent || !e.target.classList.contains('e-spreadsheet-edit'))
                && this.parent.isEdit) {
                var addRefArgs = {
                    range: getRangeAddress(range).split(':')[0], isSelect: true
                };
                this.parent.notify(addressHandle, addRefArgs);
                if (addRefArgs.isAlertDlgOpen) {
                    return;
                }
                this.initFormulaReferenceIndicator(range);
            }
        }
        else {
            if (isMultiRange) {
                if (selectedRowColIdx === undefined) {
                    var selRange_1 = getRangeAddress(range);
                    if (sheet.selectedRange.includes(selRange_1) && !isFormulaEdit) {
                        var selRanges = sheet.selectedRange.split(' ');
                        if (selRanges.length > 1) {
                            selRanges.splice(selRanges.indexOf(selRange_1), 1);
                            selRange_1 = selRanges.join(' ');
                        }
                        else {
                            selRange_1 = sheet.activeCell + ':' + sheet.activeCell;
                        }
                        this.selectRange({ address: selRange_1 });
                        return;
                    }
                    else {
                        ele = this.getSelectionElement(e, selectedRowColIdx);
                    }
                }
                else {
                    ele = this.getSelectionElement(e, selectedRowColIdx);
                }
            }
            if (isFormulaEdit && this.parent.isEdit) {
                if (e && e.target && (!isMouseEvent || !e.target.classList.contains('e-spreadsheet-edit')) && this.parent.isEdit) {
                    var addRefArgs = {
                        range: getRangeAddress(range), isSelect: true
                    };
                    this.parent.notify(addressHandle, addRefArgs);
                    if (addRefArgs.isAlertDlgOpen) {
                        return;
                    }
                    this.initFormulaReferenceIndicator(range);
                }
            }
            else {
                var clsName = void 0;
                if (ele) {
                    ele.classList.remove('e-hide');
                    if (sheet.frozenRows || sheet.frozenColumns) {
                        if (e && e.target || isMultiRange) {
                            clsName = 'e-cur-selection';
                            if (isMouseMove(e) && ele.classList.contains('e-cur-selection')) {
                                ele.classList.add('e-hide');
                            }
                            else {
                                ele.classList.add(clsName);
                            }
                        }
                        if (!isMultiRange && (this.isColSelected || this.isRowSelected) && isMouseDown(e)) {
                            removeRangeEle(this.parent.getSelectAllContent(), null, 'e-selection');
                            removeRangeEle(this.parent.getColumnHeaderContent(), null, 'e-selection');
                            removeRangeEle(this.parent.getRowHeaderContent(), null, 'e-selection');
                        }
                    }
                }
                var offset = (this.isColSelected && this.isRowSelected) ? undefined
                    : this.getOffset(range[2], range[3]);
                if (isMergeRange && offset) { // Need to handle half hidden merge cell in better way
                    offset.left = { idx: 0, size: 0 };
                }
                promise = setPosition(this.parent, ele, range, clsName, preventAnimation, isMultiRange, isMultiRange && !e.target) ||
                    promise;
            }
        }
        var eArgs = { action: 'getCurrentEditSheetIdx', sheetIndex: null };
        this.parent.notify(editOperation, eArgs);
        if (sheet.frozenColumns && range[1] > 0 && range[1] === topLeftIdx[1] && range[3] === sheet.colCount - 1) {
            range[1] = 0;
        }
        if (sheet.frozenRows && range[0] > 0 && range[0] === topLeftIdx[0] && range[2] === sheet.rowCount - 1) {
            range[0] = 0;
        }
        var selRange = getRangeAddress(range);
        if (e && e.ctrlKey && (isMouseMove(e) || isMouseUp(e)) && !isFormulaEdit) {
            selRange = sheet.selectedRange.slice(0, sheet.selectedRange.lastIndexOf(' ')) + ' ' + selRange;
        }
        else if (selectedRowColIdx > -1) {
            var selRanges = sheet.selectedRange.split(' ');
            selRanges[selectedRowColIdx] = selRange;
            selRange = selRanges.join(' ');
        }
        if (!isFormulaEdit && !this.isautoFillClicked) {
            var isSelectRangeChange = false;
            if (sheet.selectedRange !== selRange) {
                isSelectRangeChange = true;
            }
            updateSelectedRange(this.parent, selRange, sheet, isMultiRange);
            if (isSelectRangeChange) {
                promise.then(function () {
                    if (_this.parent) {
                        _this.parent.trigger('select', { range: _this.parent.getActiveSheet().selectedRange });
                    }
                });
            }
        }
        else if (!isInit && !this.isautoFillClicked) {
            updateSelectedRange(this.parent, selRange, sheet, isMultiRange);
        }
        rowColSelectArgs = this.isRowColSelected(range);
        this.isRowSelected = rowColSelectArgs.isRowSelected;
        this.isColSelected = rowColSelectArgs.isColSelected;
        this.highlightHdr(range, e && e.ctrlKey);
        if (!isScrollRefresh && !(e && (e.type === 'mousemove' || isTouchMove(e)))) {
            if (!isFormulaEdit) {
                this.updateActiveCell(isActCellChanged ? getRangeIndexes(sheet.activeCell) : range, isInit, preventAnimation);
            }
            else if (eArgs.sheetIndex === this.parent.getActiveSheet().id - 1 && isInit) {
                isActCellChanged = true;
                this.updateActiveCell(isActCellChanged ? getRangeIndexes(sheet.activeCell) : range, isInit, preventAnimation);
            }
            else if (!this.parent.isEdit) {
                this.updateActiveCell(isActCellChanged ? getRangeIndexes(sheet.activeCell) : range, isInit, preventAnimation);
            }
        }
        if (isNullOrUndefined(e)) {
            e = { type: 'mousedown' };
        }
        if (!isFormulaEdit) {
            this.parent.notify(selectionComplete, e);
        }
        else if (!isInit) {
            this.parent.notify(selectionComplete, e);
        }
        if (!isMultiRange && !isDiscontinuousRange(getSelectedRange(this.parent.getActiveSheet()))) {
            this.parent.notify(positionAutoFillElement, { preventAnimation: preventAnimation });
        }
        else {
            this.parent.notify(hideAutoFillElement, null);
        }
        if (this.parent.showAggregate) {
            this.parent.notify(showAggregate, {});
        }
        this.parent.notify(refreshOverlayElem, null);
    };
    Selection.prototype.isRowColSelected = function (indexes) {
        var sheet = this.parent.getActiveSheet();
        return { isRowSelected: indexes[1] === 0 && indexes[3] === sheet.colCount - 1,
            isColSelected: indexes[0] === 0 && indexes[2] === sheet.rowCount - 1 };
    };
    Selection.prototype.updateActiveCell = function (range, isInit, preventAnimation) {
        var sheet = this.parent.getActiveSheet();
        var topLeftIdx = getRangeIndexes(sheet.topLeftCell);
        var rowIdx;
        var colIdx;
        var isMergeRange;
        if (this.isColSelected) {
            rowIdx = topLeftIdx[0];
            colIdx = range[1];
            if (this.isRowSelected) {
                colIdx = topLeftIdx[1];
            }
        }
        else {
            rowIdx = range[0];
            colIdx = range[1];
            if (this.isRowSelected) {
                colIdx = topLeftIdx[1];
            }
        }
        var mergeArgs = { range: [rowIdx, colIdx].concat([rowIdx, colIdx]) };
        this.parent.notify(activeCellMergedRange, mergeArgs);
        if (range !== mergeArgs.range) {
            isMergeRange = true;
        }
        range = mergeArgs.range;
        if (sheet.activeCell !== getCellAddress(range[0], range[1]) || isInit) {
            this.previousActiveCell = sheet.activeCell.indexOf(':') > -1 ? this.previousActiveCell : sheet.activeCell;
            this.parent.setSheetPropertyOnMute(sheet, 'activeCell', getCellAddress(range[0], range[1]));
            if (sheet.isProtected) {
                var element = this.parent.element.querySelector('.e-formula-bar');
                var cell = getCell(range[0], range[1], sheet);
                var isCellLocked = isLocked(cell, getColumn(sheet, range[1]));
                if (isCellLocked && element && !element.disabled) {
                    element.disabled = true;
                }
                else if (!isCellLocked && element && element.disabled) {
                    element.disabled = false;
                }
            }
            if (this.getActiveCell()) {
                var offset = this.getOffset(range[2], range[3]);
                if (isMergeRange) {
                    offset.left = { idx: 0, size: 0 };
                }
                setPosition(this.parent, this.getActiveCell(), range, 'e-active-cell', preventAnimation);
            }
            this.parent.notify(activeCellChanged, null);
        }
        else {
            setPosition(this.parent, this.getActiveCell(), range, 'e-active-cell', preventAnimation);
        }
    };
    Selection.prototype.getOffset = function (rowIdx, colIdx) {
        var offset = { left: { idx: 0, size: 0 }, top: { idx: 0, size: 0 } };
        if (this.parent.scrollModule) {
            if (colIdx >= this.parent.scrollModule.offset.left.idx) {
                offset.left = this.parent.scrollModule.offset.left;
            }
            if (rowIdx >= this.parent.scrollModule.offset.top.idx) {
                offset.top = this.parent.scrollModule.offset.top;
            }
        }
        return offset;
    };
    Selection.prototype.getSelectionElement = function (e, selectedRowColIdx) {
        var sheet = this.parent.getActiveSheet();
        if (e && e.ctrlKey && !this.parent.isEdit) {
            if (isMouseUp(e) || isMouseMove(e)) {
                if (sheet.frozenColumns || sheet.frozenRows) {
                    var ele = this.parent.getMainContent().querySelector('.e-cur-selection');
                    if (ele) {
                        return ele;
                    }
                    else {
                        ele = this.parent.element.querySelector('.e-multi-range');
                        return ele && ele.cloneNode();
                    }
                }
                else {
                    return this.parent.getMainContent().querySelector('.e-selection:last-child');
                }
            }
            else {
                var selElem = this.parent.getMainContent().getElementsByClassName('e-selection')[0];
                var ele = selElem.cloneNode();
                ele.classList.add('e-multi-range');
                if (sheet.frozenColumns || sheet.frozenRows) {
                    if (!sheet.selectedRange.includes(' ')) {
                        selElem.classList.remove('e-hide');
                        setPosition(this.parent, selElem, getSwapRange(getRangeIndexes(sheet.selectedRange)), undefined, false, true);
                    }
                    if (!this.parent.getMainContent().querySelector('.e-multi-range') && selElem.classList.contains('e-hide')) {
                        return selElem;
                    }
                    return ele;
                }
                else {
                    selElem.classList.remove('e-hide');
                    return this.parent.getMainContent().appendChild(ele);
                }
            }
        }
        else if (selectedRowColIdx > -1) {
            return ((sheet.frozenRows || sheet.frozenColumns) ?
                this.parent.element.querySelector('.e-sheet').getElementsByClassName('e-selection')[selectedRowColIdx] :
                this.parent.getMainContent().getElementsByClassName('e-selection')[selectedRowColIdx]);
        }
        else {
            var elems = [].slice.call(this.parent.element.getElementsByClassName('e-multi-range'));
            elems.forEach(function (ele) {
                remove(ele);
            });
            return this.parent.getMainContent().getElementsByClassName('e-selection')[0];
        }
    };
    Selection.prototype.getActiveCell = function () {
        return this.parent.getMainContent().getElementsByClassName('e-active-cell')[0];
    };
    Selection.prototype.getSheetElement = function () {
        return document.getElementById(this.parent.element.id + '_sheet');
    };
    Selection.prototype.highlightHdr = function (range, isMultiRange, isRowRefresh, isColRefresh) {
        var _this = this;
        if (isRowRefresh === void 0) { isRowRefresh = true; }
        if (isColRefresh === void 0) { isColRefresh = true; }
        var sheet = this.parent.getActiveSheet();
        if (sheet.showHeaders) {
            if (!isMultiRange) {
                removeClass(this.getSheetElement().querySelectorAll('.e-highlight'), 'e-highlight');
                removeClass(this.getSheetElement().querySelectorAll('.e-prev-highlight'), 'e-prev-highlight');
            }
            var selectAllEle = this.parent.element.getElementsByClassName('e-select-all-cell')[0];
            if (selectAllEle) {
                removeClass([selectAllEle], ['e-prev-highlight-right', 'e-prev-highlight-bottom']);
            }
            var rowHdr = [];
            var colHdr = [];
            var swapRange_1 = getSwapRange(range);
            if (this.isRowSelected) {
                swapRange_1[1] = skipHiddenIdx(sheet, swapRange_1[1], true, 'columns');
            }
            if (this.isColSelected) {
                swapRange_1[0] = skipHiddenIdx(sheet, swapRange_1[0], true);
            }
            var frozenIdx_1 = [0, 0, 0, 0];
            var indexes_1 = [0, 0, 0, 0];
            var topLeftIndex_1 = getCellIndexes(sheet.topLeftCell);
            var i_1;
            var j_1;
            var updateIndex = function (freezePane, layout, offset) {
                var idx;
                var hiddenCount;
                if (freezePane && swapRange_1[i_1] < freezePane) {
                    topLeftIndex_1[i_1] = skipHiddenIdx(sheet, topLeftIndex_1[i_1], true, layout);
                    var startIdx = skipHiddenIdx(sheet, swapRange_1[i_1], true, layout);
                    if (startIdx === topLeftIndex_1[i_1]) {
                        swapRange_1[i_1] = startIdx;
                    }
                    hiddenCount = _this.parent.hiddenCount(topLeftIndex_1[i_1], swapRange_1[i_1] - 1, layout, sheet);
                    frozenIdx_1[i_1] = swapRange_1[i_1] - hiddenCount - topLeftIndex_1[i_1];
                    idx = swapRange_1[j_1] < freezePane ? swapRange_1[j_1] : freezePane - 1;
                    frozenIdx_1[j_1] = idx - _this.parent.hiddenCount(swapRange_1[i_1], idx, layout, sheet) - hiddenCount -
                        topLeftIndex_1[i_1] + 1;
                    idx = _this.parent.viewport["" + offset] + freezePane;
                    if (swapRange_1[j_1] >= idx) {
                        indexes_1[i_1] = 0;
                        indexes_1[i_1] -= _this.parent.hiddenCount(idx, idx, layout, sheet);
                        indexes_1[j_1] = swapRange_1[j_1] - _this.parent.hiddenCount(idx, swapRange_1[j_1], layout, sheet) - idx + 1;
                    }
                }
                else {
                    idx = skipHiddenIdx(sheet, _this.parent.viewport["" + offset] + freezePane, true, layout);
                    var startIdx = skipHiddenIdx(sheet, swapRange_1[i_1], true, layout);
                    if (idx === startIdx) {
                        swapRange_1[i_1] = idx;
                    }
                    hiddenCount = _this.parent.hiddenCount(idx, swapRange_1[i_1] - 1, layout, sheet);
                    indexes_1[i_1] = swapRange_1[i_1] - hiddenCount - idx;
                    indexes_1[j_1] = swapRange_1[j_1] - _this.parent.hiddenCount(swapRange_1[i_1], swapRange_1[j_1], layout, sheet) - hiddenCount - idx + 1;
                }
            };
            var updateCell_1 = function (idx, parent, hdrArr) {
                var header = [].slice.call(parent.getElementsByClassName('e-header-cell'));
                for (var k = idx[i_1]; k < idx[j_1]; k++) {
                    if (header[k]) {
                        hdrArr.push(header[k]);
                    }
                }
            };
            if (isRowRefresh) {
                i_1 = 0;
                j_1 = 2;
                updateIndex(this.parent.frozenRowCount(sheet), 'rows', 'topIndex');
                if (sheet.frozenRows) {
                    var selectAllBody = this.parent.getSelectAllContent().querySelector('tbody');
                    if (selectAllBody) {
                        updateCell_1(frozenIdx_1, selectAllBody, rowHdr);
                    }
                }
                updateCell_1(indexes_1, this.parent.getRowHeaderContent(), rowHdr);
            }
            if (isColRefresh) {
                i_1 = 1;
                j_1 = 3;
                updateIndex(this.parent.frozenColCount(sheet), 'columns', 'leftIndex');
                if (sheet.frozenColumns) {
                    var selectAllHdr = this.parent.getSelectAllContent().querySelector('thead');
                    if (selectAllHdr) {
                        updateCell_1(frozenIdx_1, selectAllHdr, colHdr);
                    }
                }
                updateCell_1(indexes_1, this.parent.getColumnHeaderContent(), colHdr);
            }
            if (sheet.isProtected && !sheet.protectSettings.selectCells) {
                removeClass([].concat(rowHdr, colHdr), 'e-highlight');
            }
            else {
                addClass([].concat(rowHdr, colHdr), 'e-highlight');
            }
            if (rowHdr.length && rowHdr[0].parentElement.previousElementSibling) {
                rowHdr[0].parentElement.previousElementSibling.classList.add('e-prev-highlight');
            }
            if (colHdr.length && colHdr[0].previousElementSibling) {
                colHdr[0].previousElementSibling.classList.add('e-prev-highlight');
            }
            if (this.isRowSelected && this.isColSelected) {
                if (sheet.isProtected && !sheet.protectSettings.selectCells) {
                    document.getElementById(this.parent.element.id + "_select_all").classList.remove('e-highlight');
                }
                else {
                    document.getElementById(this.parent.element.id + "_select_all").classList.add('e-highlight');
                }
            }
            if (selectAllEle) {
                if (skipHiddenIdx(sheet, swapRange_1[0], true) === skipHiddenIdx(sheet, 0, true)) {
                    selectAllEle.classList.add('e-prev-highlight-bottom');
                }
                if (skipHiddenIdx(sheet, swapRange_1[1], true, 'columns') === skipHiddenIdx(sheet, 0, true, 'columns')) {
                    selectAllEle.classList.add('e-prev-highlight-right');
                }
            }
        }
    };
    Selection.prototype.protectHandler = function () {
        var range = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
        var swapRange = getSwapRange(range);
        var actRange = getCellIndexes(this.parent.getActiveSheet().activeCell);
        var inRange = swapRange[0] <= actRange[0] && swapRange[2] >= actRange[0] && swapRange[1] <= actRange[1]
            && swapRange[3] >= actRange[1];
        this.selectRangeByIdx(range, null, null, inRange);
    };
    Selection.prototype.initiateFormulaSelection = function (args) {
        this.processFormulaEditRange(args.range, args.formulaSheetIdx);
    };
    Selection.prototype.processFormulaEditRange = function (val, formulaStartSheetIdx) {
        var str;
        var formulaSheetIdx = formulaStartSheetIdx;
        var i = 0;
        var eventArgs = { formula: val };
        this.parent.notify(parseFormulaArgument, eventArgs);
        var parsedVal = eventArgs.formulaArr;
        var len = parsedVal.length;
        var ctrlKeyCount = 0;
        var formulaBorder = [['e-vborderright', 'e-vborderbottom'], ['e-pborderright', 'e-pborderbottom'],
            ['e-cborderright', 'e-cborderbottom'], ['e-gborderright', 'e-gborderbottom'], ['e-oborderright', 'e-oborderbottom'],
            ['e-bborderright', 'e-bborderbottom']];
        this.clearBorder();
        var actSheetIdx = this.parent.getActiveSheet().id - 1;
        while (i < len) {
            str = parsedVal[i];
            if (this.invalidOperators.indexOf(str) > -1) {
                break;
            }
            if (isCellReference(str.toUpperCase())) {
                str = str.replace(/\$/g, '');
                if (i > 0) {
                    if (parsedVal[i - 1].lastIndexOf('!') === parsedVal[i - 1].length - 1) {
                        var sheetName = parsedVal[i - 1].substring(1, parsedVal[i - 1].lastIndexOf('!') - 1);
                        formulaSheetIdx = sheetName ? getSheetIndex(this.parent, sheetName) : formulaSheetIdx;
                    }
                }
                if (parsedVal[i + 1] === ':') {
                    i++;
                    if (parsedVal[i + 1] && isCellReference(parsedVal[i + 1].toUpperCase())) {
                        str = str + ':' + parsedVal[i + 1];
                        i++;
                    }
                }
                if (actSheetIdx === formulaSheetIdx) {
                    this.updateFormulaEditRange(str, ctrlKeyCount, formulaBorder);
                }
                formulaSheetIdx = formulaStartSheetIdx;
                ctrlKeyCount++;
            }
            i++;
        }
    };
    Selection.prototype.updateFormulaEditRange = function (str, i, formulaBorder) {
        var indices = getRangeIndexes(str);
        this.formulaRange[i] = str;
        this.dStartCell = { rowIndex: indices[0], colIndex: indices[1] };
        this.dEndCell = { rowIndex: indices[2], colIndex: indices[3] };
        this.focusBorder(this.dStartCell, this.dEndCell, formulaBorder[i % 6]);
    };
    Selection.prototype.chartBorderHandler = function (args) {
        this.focusBorder(args.startcell, args.endcell, args.classes, true);
    };
    Selection.prototype.focusBorder = function (startcell, endcell, classes, isChart) {
        isChart = isNullOrUndefined(isChart) ? false : isChart;
        var sheet = this.parent.getActiveSheet();
        var range = getSwapRange([startcell.rowIndex, startcell.colIndex, endcell.rowIndex, endcell.colIndex]);
        var topLeftIdx = getRangeIndexes(sheet.topLeftCell);
        var hiddenCol = this.parent.hiddenCount(topLeftIdx[1], range[3] - 1, 'columns', sheet);
        if (isChart && hiddenCol > 0) {
            range[1] -= hiddenCol;
            range[3] -= hiddenCol;
        }
        if (sheet.frozenRows || sheet.frozenColumns) {
            var rangeReference = this.parent.createElement('div', {
                className: isChart ? 'e-range-indicator e-chart-range' : 'e-range-indicator e-formuala-range'
            });
            rangeReference.appendChild(this.parent.createElement('div', { className: 'e-top' }));
            rangeReference.appendChild(this.parent.createElement('div', { className: 'e-bottom' }));
            rangeReference.appendChild(this.parent.createElement('div', { className: 'e-left' }));
            rangeReference.appendChild(this.parent.createElement('div', { className: 'e-right' }));
            setPosition(this.parent, rangeReference, range, 'e-range-indicator');
            return;
        }
        var minr = range[0];
        var minc = range[1];
        var maxr = range[2];
        var maxc = range[3];
        if (minr) {
            (this.getEleFromRange([minr - 1, minc, minr - 1, maxc])).forEach(function (td) {
                if (td) {
                    td.classList.add(classes[1]);
                    if (!isChart) {
                        td.classList.add('e-formularef-selection');
                    }
                }
            }); // top
        }
        (this.getEleFromRange([minr, maxc, maxr, maxc])).forEach(function (td) {
            if (td) {
                td.classList.add(classes[0]);
                if (!isChart) {
                    td.classList.add('e-formularef-selection');
                }
            }
        }); // right
        this.getEleFromRange([maxr, minc, maxr, maxc]).forEach(function (td) {
            if (td) {
                td.classList.add(classes[1]);
                if (!isChart) {
                    td.classList.add('e-formularef-selection');
                }
            }
        }); // bottom
        if (minc) {
            (this.getEleFromRange([minr, minc - 1, maxr, minc - 1])).forEach(function (td) {
                if (td) {
                    td.classList.add(classes[0]);
                    if (!isChart) {
                        td.classList.add('e-formularef-selection');
                    }
                }
            }); // left
        }
    };
    Selection.prototype.getEleFromRange = function (range) {
        var startRIndex = range[0];
        var startCIndex = range[1];
        var endRIndex = range[2];
        var endCIndex = range[3];
        var i;
        var rowIdx;
        var temp;
        var tempCells = [];
        var rowCells;
        var cells = [];
        if (startRIndex > endRIndex) {
            temp = startRIndex;
            startRIndex = endRIndex;
            endRIndex = temp;
        }
        if (startCIndex > endCIndex) {
            temp = startCIndex;
            startCIndex = endCIndex;
            endCIndex = temp;
        }
        if (this.parent.scrollSettings.enableVirtualization) {
            for (i = startRIndex; i <= endRIndex; i++) {
                rowIdx = i;
                if (rowIdx > -1) {
                    var row = this.parent.getRow(rowIdx, null);
                    if (row) {
                        rowCells = row.getElementsByClassName('e-cell');
                        tempCells = (endCIndex === startCIndex) ?
                            [rowCells[endCIndex]] : this.getRowCells(rowCells, startCIndex, endCIndex + 1);
                        this.merge(cells, tempCells);
                    }
                }
            }
        }
        return cells;
    };
    Selection.prototype.getRowCells = function (rowCells, startCIndex, endCIndex) {
        var tdCol = [];
        for (startCIndex; startCIndex < endCIndex; startCIndex++) {
            if (rowCells[startCIndex]) {
                tdCol.push(rowCells[startCIndex]);
            }
        }
        return tdCol;
    };
    Selection.prototype.merge = function (first, second) {
        if (!first || !second) {
            return;
        }
        Array.prototype.push.apply(first, second);
    };
    Selection.prototype.clearBorder = function () {
        var sheet = this.parent.getActiveSheet();
        if (sheet.frozenColumns || sheet.frozenRows) {
            var formualIndicator = [].slice.call(this.parent.element.getElementsByClassName('e-formuala-range'));
            formualIndicator.forEach(function (indicator) { detach(indicator); });
            return;
        }
        var borderEleColl = this.parent.element.getElementsByClassName('e-formularef-selection');
        for (var idx = borderEleColl.length - 1; idx >= 0; idx--) {
            var td = borderEleColl[idx];
            var classArr = ['e-vborderright', 'e-vborderbottom', 'e-pborderright', 'e-pborderbottom',
                'e-cborderright', 'e-cborderbottom', 'e-gborderright', 'e-gborderbottom', 'e-oborderright',
                'e-oborderbottom', 'e-bborderright', 'e-bborderbottom', 'e-formularef-selection'];
            for (var idx_1 = 0; idx_1 < classArr.length; idx_1++) {
                td.classList.remove(classArr[idx_1]);
            }
        }
        // for (let idx: number = 0; idx < borderEleColl.length; idx++) {
        //     const td: HTMLElement = borderEleColl[idx] as HTMLElement;
        // }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Get the module name.
     */
    Selection.prototype.getModuleName = function () {
        return 'selection';
    };
    Selection.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    return Selection;
}());
export { Selection };
