import { keyDown, cut, paste, copy, clearCopy, performUndoRedo, initiateHyperlink, editHyperlink, renderInsertDlg, getRightIdx, getBottomOffset, keyUp } from '../common/index';
import { findDlg, gotoDlg, initiateFilterUI, getFilterRange, performAutoFill, focus, addNote, editNote } from '../common/index';
import { setCellFormat, textDecorationUpdate, getCellIndexes, findToolDlg, getRangeIndexes, hideShow, applyNumberFormatting, insertModel, getSwapRange, getRangeAddress, beginAction, isReadOnlyCells } from '../../workbook/common/index';
import { getColumn, isLocked as isCellLocked, exportDialog, getFormatFromType } from '../../workbook/index';
import { completeAction } from '../../spreadsheet/common/index';
import { setCell, getCell, skipHiddenIdx, selectionComplete, refreshRibbonIcons } from '../../workbook/index';
import { isNullOrUndefined, closest, select, getComponent, EventHandler } from '@syncfusion/ej2-base';
/**
 * Represents keyboard shortcut support for Spreadsheet.
 */
var KeyboardShortcut = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet Keyboard Shortcut module.
     *
     * @param {Spreadsheet} parent - Specify the spreadsheet.
     * @private
     */
    function KeyboardShortcut(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    KeyboardShortcut.prototype.addEventListener = function () {
        this.parent.on(keyDown, this.keyDownHandler, this);
        this.parent.on(keyUp, this.keyUpHandler, this);
    };
    KeyboardShortcut.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(keyDown, this.keyDownHandler);
            this.parent.off(keyUp, this.keyUpHandler);
        }
    };
    KeyboardShortcut.prototype.isTrgtNotInput = function (e) {
        var trgt = e.target;
        return (!closest(trgt, '.e-filter-popup')
            && !closest(trgt, '.e-find-dlg') && !closest(trgt, '.e-hyperlink-dlg') &&
            !closest(trgt, '.e-sheet-tab') && !closest(trgt, '.e-name-box') && !closest(trgt, '.e-link-dialog'));
    };
    KeyboardShortcut.prototype.ribbonShortCuts = function (e) {
        if (this.parent.showRibbon && e.altKey && !e.ctrlKey && !e.shiftKey) {
            var tabObj = getComponent(this.parent.element.querySelector('.e-ribbon .e-tab'), 'tab');
            var tabIdx = void 0;
            if (e.keyCode === 72) { /*alt + H =home*/
                tabIdx = 1;
            }
            else if (e.keyCode === 78) { /*alt + N =insert */
                tabIdx = 2;
            }
            else if (e.keyCode === 65) { /*alt + A =data */
                tabIdx = 4;
            }
            else if (e.keyCode === 87) { /*alt + W =view*/
                tabIdx = 5;
            }
            else if (e.keyCode === 77) { /*alt + M =formula */
                tabIdx = 3;
            }
            else if (e.keyCode === 70) { /*alt + F =file */
                e.preventDefault();
                select('#' + this.parent.element.id + '_File', this.parent.element).click();
            }
            else if (e.keyCode === 18) { /** alt = active tab focus */
                e.preventDefault();
                var activeCell = getCellIndexes(this.parent.getActiveSheet().activeCell);
                var args = { sheetIdx: this.parent.activeSheetIndex };
                this.parent.notify(getFilterRange, args);
                if (!(args.hasFilter && args.filterRange && args.filterRange[0] === activeCell[0] && args.filterRange[1] <= activeCell[1] &&
                    args.filterRange[3] >= activeCell[1])) {
                    var actEle = document.activeElement;
                    if (!actEle.classList.contains('e-spreadsheet-edit') && !actEle.classList.contains('e-sheet-rename') &&
                        actEle.id !== this.parent.element.id + "_name_box" && !closest(actEle, '.e-dropdown-btn') &&
                        !closest(actEle, '.e-split-btn') && !closest(actEle, '.e-popup-open')) {
                        var cell = this.parent.getCell(activeCell[0], activeCell[1]);
                        if (cell && cell.querySelector('.e-validation-list')) {
                            return;
                        }
                        if (closest(actEle, '.e-ribbon')) {
                            focus(this.parent.element);
                            return;
                        }
                        for (var i = 0; i <= this.parent.ribbonModule.ribbon.items.length; i++) {
                            if (i === this.parent.ribbonModule.ribbon.selectedTab) {
                                var focusEle = this.parent.element.querySelector('.e-toolbar-items').children[i + 2].children[0];
                                focusEle.setAttribute('tabindex', '0');
                                focus(focusEle);
                                return;
                            }
                        }
                    }
                }
            }
            if (tabIdx) {
                if (!tabObj.items[tabIdx].disabled && !tabObj.items[tabIdx].cssClass.includes('e-hide')) {
                    e.preventDefault();
                    tabObj.select(tabIdx, Object.assign(e, { isShortcut: true }));
                }
                else {
                    focus(this.parent.element);
                }
            }
        }
    };
    KeyboardShortcut.prototype.keyUpHandler = function (e) {
        if (e.keyCode === 37 || e.keyCode === 39) {
            var activeEle = document.activeElement;
            if (activeEle.classList.contains('e-colorpicker-wrapper') || activeEle.classList.contains('e-split-btn-wrapper')) {
                var colorPickerBtn = activeEle.querySelector('.e-split-btn');
                if (colorPickerBtn) {
                    focus(colorPickerBtn);
                }
            }
        }
        else if (e.keyCode === 13) {
            var target_1 = e.target;
            if (target_1.classList.contains('e-scroll-nav')) {
                var focusScroll_1 = function () {
                    if (!target_1.getAttribute('tabindex')) {
                        target_1.setAttribute('tabindex', '0');
                        focus(target_1);
                    }
                    EventHandler.remove(target_1, 'blur', focusScroll_1);
                };
                EventHandler.add(target_1, 'blur', focusScroll_1, this);
            }
        }
    };
    KeyboardShortcut.prototype.keyDownHandler = function (e) {
        var isSelectionNone = this.parent.selectionSettings.mode === 'None';
        this.ribbonShortCuts(e);
        var sheet = this.parent.getActiveSheet();
        var target = e.target;
        var textarea = e.target;
        if (!isNullOrUndefined(textarea) && textarea.classList.contains('e-addNoteContainer')) {
            return;
        }
        if ((e.ctrlKey || e.metaKey) && this.isTrgtNotInput(e)) {
            if (!closest(target, '.e-find-dlg') && !isSelectionNone) {
                if ([79, 83].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
                else if (e.keyCode === 65 && !this.parent.isEdit) {
                    e.preventDefault();
                }
            }
            var indexes = getCellIndexes(sheet.activeCell);
            if (e.keyCode === 79) { /*Ctrl + O*/
                if (this.parent.allowOpen && this.parent.openUrl) {
                    select('#' + this.parent.element.id + '_fileUpload', this.parent.element).click();
                }
            }
            else if (e.keyCode === 83) { /*Ctrl + S*/
                if (this.parent.saveUrl && this.parent.allowSave) {
                    this.parent.notify(exportDialog, null);
                }
            }
            else if (e.keyCode === 67 && !isSelectionNone) { /*Ctrl + C*/
                this.parent.notify(copy, { promise: Promise });
            }
            else if (e.keyCode === 75 && !isSelectionNone) { /*Ctrl + K*/
                var row = sheet.rows[indexes[0]];
                var cell = void 0;
                e.preventDefault();
                if (!isNullOrUndefined(row)) {
                    cell = row.cells[indexes[1]];
                }
                if (isNullOrUndefined(cell)) {
                    setCell(indexes[0], indexes[1], sheet, cell, false);
                }
                if (cell && cell.hyperlink) {
                    this.parent.notify(editHyperlink, null);
                }
                else {
                    this.parent.notify(initiateHyperlink, null);
                }
            }
            else if (e.keyCode === 90 && !isSelectionNone) { /* Ctrl + Z */
                if (!this.parent.isEdit) {
                    e.preventDefault();
                    this.parent.notify(performUndoRedo, { isUndo: true });
                }
            }
            else if (e.keyCode === 89 && !isSelectionNone) { /* Ctrl + Y */
                if (!this.parent.isEdit) {
                    e.preventDefault();
                    this.parent.notify(performUndoRedo, { isUndo: false });
                }
            }
            else if ((e.keyCode === 82 || e.keyCode === 68) && !isSelectionNone) { /* Ctrl + R */ /* Ctrl + D */
                e.preventDefault();
                var selectRange = getSwapRange(getRangeIndexes(sheet.selectedRange));
                var startCell = { colIndex: selectRange[1], rowIndex: selectRange[0] };
                var direction = void 0;
                var dataRange = void 0;
                if (e.keyCode === 68) {
                    if (selectRange[0] === selectRange[2]) {
                        startCell.rowIndex = selectRange[0] - 1;
                    }
                    else {
                        selectRange[0] += 1;
                    }
                    dataRange = getRangeAddress([startCell.rowIndex, startCell.colIndex, startCell.rowIndex, selectRange[3]]);
                    direction = 'Down';
                }
                else {
                    if (selectRange[1] === selectRange[3]) {
                        startCell.colIndex = selectRange[1] - 1;
                    }
                    else {
                        selectRange[1] += 1;
                    }
                    direction = 'Right';
                    dataRange = getRangeAddress([startCell.rowIndex, startCell.colIndex, selectRange[2], startCell.colIndex]);
                }
                if (startCell.rowIndex < 0 || startCell.colIndex < 0) {
                    return;
                }
                this.parent.notify(performAutoFill, {
                    fillType: getCell(startCell.rowIndex, startCell.colIndex, sheet, false, true).formula ? 'FillSeries' : 'CopyCells',
                    dAutoFillCell: dataRange, rangeInfo: {
                        direction: direction, startCell: startCell,
                        endCell: { rowIndex: selectRange[2], colIndex: selectRange[3] }, fillRange: selectRange
                    }
                });
                this.parent.notify(selectionComplete, { type: 'mousedown' });
                this.parent.notify(refreshRibbonIcons, null);
            }
            var isLocked = sheet.isProtected && isCellLocked(getCell(indexes[0], indexes[1], sheet), getColumn(sheet, indexes[1]));
            if (e.keyCode === 70 && !isSelectionNone && this.parent.allowFindAndReplace) { /* Ctrl + F */
                e.preventDefault();
                this.parent.notify(findToolDlg, {});
            }
            if ((!isLocked || !sheet.isProtected || e.keyCode === 86) && e.keyCode !== 70 && !isSelectionNone) {
                if (e.keyCode === 71) { /* Ctrl + G */
                    e.preventDefault();
                    this.parent.notify(gotoDlg, null);
                }
                else if (e.keyCode === 72) { /* Ctrl + H */
                    e.preventDefault();
                    this.parent.notify(findDlg, null);
                }
                else if (e.keyCode === 88) { /* Ctrl + X */
                    this.parent.notify(cut, { promise: Promise });
                }
                else if (e.keyCode === 86) { /* Ctrl + v */
                    this.parent.notify(paste, { isAction: true });
                }
                if (e.shiftKey && e.keyCode === 76 && !this.parent.isEdit && !sheet.isProtected) { /* Ctrl + Shift + L */
                    e.preventDefault();
                    this.parent.notify(initiateFilterUI, {});
                }
            }
            if (!isSelectionNone && (!sheet.isProtected || sheet.protectSettings.formatCells)) {
                if (e.keyCode === 66) { /* Ctrl + B */
                    e.preventDefault();
                    var value = this.parent.getCellStyleValue(['fontWeight'], indexes).fontWeight;
                    value = value === 'bold' ? 'normal' : 'bold';
                    this.parent.notify(setCellFormat, { style: { fontWeight: value }, onActionUpdate: true, refreshRibbon: true });
                }
                else if (e.keyCode === 73) { /* Ctrl + I */
                    e.preventDefault();
                    var value = this.parent.getCellStyleValue(['fontStyle'], indexes).fontStyle;
                    value = value === 'italic' ? 'normal' : 'italic';
                    this.parent.notify(setCellFormat, { style: { fontStyle: value }, onActionUpdate: true, refreshRibbon: true });
                }
                else if (e.ctrlKey && e.keyCode === 85 && !e.shiftKey) { /* Ctrl + U */
                    e.preventDefault();
                    this.parent.notify(textDecorationUpdate, { style: { textDecoration: 'underline' }, refreshRibbon: true });
                }
                else if (e.ctrlKey && e.keyCode === 53 && !e.shiftKey) { /* Ctrl + 5 */
                    e.preventDefault();
                    this.parent.notify(textDecorationUpdate, { style: { textDecoration: 'line-through' }, refreshRibbon: true });
                }
            }
        }
        if (e.keyCode === 27) { /*ESC*/
            this.parent.notify(clearCopy, null);
        }
        if ((((e.ctrlKey || e.metaKey) && e.keyCode === 119) || (e.keyCode === 13 && target.classList.contains('e-drop-icon')))
            && this.parent.showRibbon) { /*ctrl + f8 or Enter*/
            e.preventDefault();
            var expandCollapseIcon = this.parent.element.querySelector('.e-drop-icon');
            if (expandCollapseIcon) {
                expandCollapseIcon.click();
            }
        }
        //general key actions
        if ((e.ctrlKey || e.metaKey) && !isSelectionNone) {
            if (e.keyCode === 57) { /*ctrl + 9(row-hide)*/
                if (!sheet.isProtected || sheet.protectSettings.formatRows) {
                    e.preventDefault();
                    var indexes = getRangeIndexes(sheet.selectedRange);
                    this.parent.notify(hideShow, { startIndex: indexes[0], endIndex: indexes[2], hide: !e.shiftKey, isCol: false,
                        actionUpdate: true });
                }
            }
            else if (e.keyCode === 48) { /*ctrl + 0(col-hide)*/
                if (!sheet.isProtected || sheet.protectSettings.formatColumns) {
                    var indexes = getRangeIndexes(sheet.selectedRange);
                    this.parent.notify(hideShow, { startIndex: indexes[1], endIndex: indexes[3], hide: !e.shiftKey, isCol: true,
                        actionUpdate: true });
                }
            }
        }
        if (e.shiftKey && !isSelectionNone) {
            if (e.keyCode === 113 && !sheet.isProtected) { /*shift + F2(Add note)*/
                e.preventDefault();
                if (e.target.children.length > 0 && typeof e.target.children[e.target.children.length - 1].className === 'string' &&
                    e.target.children[e.target.children.length - 1].className.indexOf('e-addNoteIndicator') > -1) {
                    this.parent.notify(editNote, null);
                }
                else {
                    this.parent.notify(addNote, null);
                }
            }
            else if (e.keyCode === 114) { /*shift + F3(insert-function dialog)*/
                e.preventDefault();
                this.parent.notify(renderInsertDlg, null);
            }
            else if (e.keyCode === 116 && this.parent.allowFindAndReplace) { /* shift + F5 */
                e.preventDefault();
                this.parent.notify(findToolDlg, {});
            }
            else if (e.keyCode === 121) { /* Context menu open Shift+F10 */
                var className_1 = document.activeElement.className;
                if (['e-spreadsheet', 'e-cell', 'e-header-cell', 'e-clipboard', 'e-rowhdr-table', 'e-selectall-table', 'e-main-panel'].some(function (cls) { return className_1.includes(cls); })) {
                    this.focusTarget(sheet);
                }
            }
        }
        if (e.altKey && !isSelectionNone) {
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 78) { /*ctrl+alt+N*/
                e.preventDefault();
                this.parent.refresh(true);
            }
            else if (e.keyCode === 113 && this.parent.saveUrl) { /*alt + F2*/
                e.preventDefault();
                this.parent.notify(exportDialog, null);
            }
        }
        //number-formatting
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && !isSelectionNone) {
            if (!sheet.isProtected || sheet.protectSettings.formatCells) {
                var range = sheet.selectedRange;
                var format = void 0;
                if (e.keyCode === 192) { /*ctrl + shift + ~(General)*/
                    format = 'General';
                }
                else if (e.keyCode === 52) { /*ctrl + shift + $(currency)*/
                    format = getFormatFromType('CurrencyWithColorCode');
                }
                else if (e.keyCode === 53) { /*ctrl + shift + %(percent)*/
                    format = '0%';
                }
                else if (e.keyCode === 54) { /*ctrl + shift + ^(scentific)*/
                    format = getFormatFromType('Scientific');
                }
                else if (e.keyCode === 51) { /*ctrl + shift + #(Date)*/
                    format = 'dd-mmm-yy';
                }
                else if (e.keyCode === 50) { /*ctrl + shift + @(Time)*/
                    format = 'h:mm AM/PM';
                }
                else if (e.keyCode === 49) { /*ctrl + shift + !(Number)*/
                    format = getFormatFromType('Number');
                }
                else if (e.keyCode === 55) { /*ctrl + shift + 7*/
                    e.preventDefault();
                    var border = '1px solid #000000';
                    this.parent.notify(setCellFormat, { style: { border: border }, onActionUpdate: true, borderType: 'Outer' });
                }
                if (format) {
                    var isReadonly = isReadOnlyCells(this.parent, getSwapRange(getRangeIndexes(range)));
                    if (!isReadonly) {
                        var eventArgs = {
                            format: format, range: range, cancel: false, requestType: 'NumberFormat'
                        };
                        var actionArgs = {
                            range: sheet.name + '!' + eventArgs.range, format: eventArgs.format, requestType: 'NumberFormat'
                        };
                        this.parent.trigger('beforeCellFormat', eventArgs);
                        this.parent.notify(beginAction, { eventArgs: eventArgs, action: 'format' });
                        if (!eventArgs.cancel) {
                            this.parent.notify(applyNumberFormatting, eventArgs);
                            this.parent.notify(selectionComplete, { type: 'mousedown' });
                            this.parent.notify(completeAction, { eventArgs: actionArgs, action: 'format' });
                            this.parent.notify(refreshRibbonIcons, null);
                        }
                    }
                }
            }
            if (e.keyCode === 85) { /*ctrl + shift + U*/
                e.preventDefault();
                var formulaExpand = this.parent.element.querySelector('.e-formula-bar-panel .e-drop-icon');
                if (formulaExpand) {
                    formulaExpand.click();
                }
            }
        }
        if (e.keyCode === 122 && e.shiftKey && !e.ctrlKey && !this.parent.isProtected) { // shift+f11
            this.parent.notify(insertModel, {
                model: this.parent, start: this.parent.activeSheetIndex + 1, end: this.parent.activeSheetIndex + 1, modelType: 'Sheet', isAction: true, activeSheetIndex: this.parent.activeSheetIndex + 1
            });
        }
        if (e.shiftKey && e.altKey && e.keyCode === 75 && this.parent.showSheetTabs) { /* Shift + Alt + K*/
            this.parent.element.querySelector('.e-sheets-list').click();
        }
    };
    KeyboardShortcut.prototype.focusTarget = function (sheet) {
        var indexes = getSwapRange(getRangeIndexes(sheet.selectedRange));
        var isRowSelected = (indexes[1] === 0 && indexes[3] === sheet.colCount - 1);
        var isColSelected = (indexes[0] === 0 && indexes[2] === sheet.rowCount - 1);
        var target;
        if (isRowSelected && isColSelected) {
            target = this.parent.element.querySelector('.e-selectall');
        }
        else if (isRowSelected) {
            var frozenRow = this.parent.frozenRowCount(sheet);
            if (indexes[0] < frozenRow) {
                var freezeHdrRow = this.parent.getRow(indexes[0], this.parent.sheetModule.getSelectAllTable());
                target = freezeHdrRow && freezeHdrRow.cells[0];
            }
            else {
                indexes[0] = skipHiddenIdx(sheet, indexes[0], true);
                var topIdx = skipHiddenIdx(sheet, getRangeIndexes(sheet.paneTopLeftCell)[0], true);
                var bottomIdx = getBottomOffset(this.parent, topIdx).index;
                var hdrRow = void 0;
                if (indexes[0] > topIdx && indexes[0] < bottomIdx) {
                    hdrRow = this.parent.getRow(indexes[0], this.parent.getRowHeaderTable());
                }
                else if (indexes[0] >= bottomIdx) {
                    hdrRow = this.parent.getRow(bottomIdx - 1, this.parent.getRowHeaderTable());
                }
                else {
                    hdrRow = this.parent.getRow(topIdx + 1, this.parent.getRowHeaderTable());
                }
                target = hdrRow && hdrRow.cells[0];
            }
        }
        else if (isColSelected) {
            var frozenCol = this.parent.frozenColCount(sheet);
            if (indexes[1] < frozenCol) {
                var freezeHdrRow = this.parent.element.querySelector('.e-selectall-container .e-header-row');
                target = freezeHdrRow && this.parent.getCell(0, indexes[1], freezeHdrRow);
            }
            else {
                indexes[1] = skipHiddenIdx(sheet, indexes[1], true, 'columns');
                var leftIdx = skipHiddenIdx(sheet, getRangeIndexes(sheet.paneTopLeftCell)[1], true, 'columns');
                var rightIdx = getRightIdx(this.parent, leftIdx);
                var hdrRow = this.parent.element.querySelector('.e-column-header .e-header-row');
                if (indexes[1] > leftIdx && indexes[1] < rightIdx) {
                    target = hdrRow && this.parent.getCell(0, indexes[1], hdrRow);
                }
                else if (indexes[1] >= rightIdx) {
                    target = hdrRow && this.parent.getCell(0, rightIdx - 1, hdrRow);
                }
                else {
                    target = hdrRow && this.parent.getCell(0, leftIdx + 1, hdrRow);
                }
            }
        }
        else {
            var topLeftIdx = getRangeIndexes(sheet.paneTopLeftCell);
            target = this.parent.getCell(indexes[0], indexes[1]);
            var frozenRow = this.parent.frozenRowCount(sheet);
            var frozenCol = this.parent.frozenColCount(sheet);
            if (indexes[0] < frozenRow && indexes[1] < frozenCol) {
                target = this.parent.getCell(indexes[0], indexes[1]);
            }
            else if (indexes[0] < frozenRow) {
                var leftIdx = getRangeIndexes(sheet.paneTopLeftCell)[1];
                var rightIdx = getRightIdx(this.parent, leftIdx);
                if (indexes[1] > leftIdx && indexes[1] < rightIdx) {
                    target = this.parent.getCell(indexes[0], indexes[1]);
                }
                else if (indexes[1] >= rightIdx) {
                    target = this.parent.getCell(indexes[0], rightIdx - 1);
                }
                else {
                    target = this.parent.getCell(indexes[0], leftIdx + 1);
                }
            }
            else if (indexes[1] < frozenCol) {
                var topIdx = getRangeIndexes(sheet.paneTopLeftCell)[0];
                var bottomIdx = getBottomOffset(this.parent, topIdx).index;
                if (indexes[0] > topIdx && indexes[0] < bottomIdx) {
                    target = this.parent.getCell(indexes[0], indexes[1]);
                }
                else if (indexes[0] >= bottomIdx) {
                    target = this.parent.getCell(bottomIdx - 1, indexes[1]);
                }
                else {
                    target = this.parent.getCell(topIdx + 1, indexes[1]);
                }
            }
            else {
                var topIdx = getRangeIndexes(sheet.paneTopLeftCell)[0];
                var bottomIdx = getBottomOffset(this.parent, topIdx).index;
                var leftIdx = getRangeIndexes(sheet.paneTopLeftCell)[1];
                var rightIdx = getRightIdx(this.parent, leftIdx);
                if (indexes[0] > topIdx && indexes[0] < bottomIdx) {
                    if (indexes[1] > leftIdx && indexes[1] < rightIdx) {
                        target = this.parent.getCell(indexes[0], indexes[1]);
                    }
                    else if (indexes[1] >= rightIdx) {
                        target = this.parent.getCell(indexes[0], rightIdx - 1);
                    }
                    else {
                        target = this.parent.getCell(indexes[0], leftIdx + 1);
                    }
                }
                else if (indexes[0] >= bottomIdx) {
                    if (indexes[1] > leftIdx && indexes[1] < rightIdx) {
                        target = this.parent.getCell(bottomIdx - 1, indexes[1]);
                    }
                    else if (indexes[1] >= rightIdx) {
                        target = this.parent.getCell(bottomIdx - 1, rightIdx - 1);
                    }
                    else {
                        target = this.parent.getCell(bottomIdx - 1, leftIdx + 1);
                    }
                }
                else {
                    if (indexes[1] > leftIdx && indexes[1] < rightIdx) {
                        target = this.parent.getCell(topIdx + 1, indexes[1]);
                    }
                    else if (indexes[1] >= rightIdx) {
                        target = this.parent.getCell(topIdx + 1, rightIdx - 1);
                    }
                    else {
                        target = this.parent.getCell(topIdx + 1, leftIdx + 1);
                    }
                }
            }
            if (!target) {
                target = this.parent.getCell(topLeftIdx[0] + 1, topLeftIdx[1] + 1);
            }
        }
        if (target) {
            focus(target);
        }
    };
    KeyboardShortcut.prototype.getModuleName = function () {
        return 'keyboardShortcut';
    };
    KeyboardShortcut.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    return KeyboardShortcut;
}());
export { KeyboardShortcut };
