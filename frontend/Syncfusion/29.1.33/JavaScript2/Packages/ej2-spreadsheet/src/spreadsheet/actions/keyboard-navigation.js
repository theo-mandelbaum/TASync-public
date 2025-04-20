import { keyDown, cellNavigate, filterCellKeyDown, getUpdateUsingRaf, isLockedCells, focus, dialog, getRightIdx, addressHandle, initiateCur, rangeSelectionByKeydown, editOperation, isNavigationKey } from '../common/index';
import { getCellIndexes, getRangeAddress, getRowHeight, getColumnWidth, isHiddenCol, checkIsFormula } from '../../workbook/index';
import { getRangeIndexes, getSwapRange, isHiddenRow, isColumnSelected, isRowSelected, skipHiddenIdx, getCell } from '../../workbook/index';
import { getRowsHeight, getColumnsWidth, isLocked, getColumn, updateCell, getSheetName } from '../../workbook/index';
import { getBottomOffset, removeNoteContainer, setActionData, completeAction } from '../common/index';
import { Browser, closest, getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Represents keyboard navigation support for Spreadsheet.
 */
var KeyboardNavigation = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet Keyboard Navigation module.
     *
     * @private
     * @param {Spreadsheet} parent - Specify the spreadsheet
     */
    function KeyboardNavigation(parent) {
        this.parent = parent;
        this.addEventListener();
        /* code snippet */
    }
    KeyboardNavigation.prototype.addEventListener = function () {
        this.parent.on(keyDown, this.keyDownHandler, this);
        /* code snippet */
    };
    KeyboardNavigation.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(keyDown, this.keyDownHandler);
        }
        /* code snippet */
    };
    KeyboardNavigation.prototype.keyDownHandler = function (e) {
        var _this = this;
        var target = e.target;
        var isRtl = this.parent.enableRtl;
        var isKeyboardShortcut = this.parent.enableKeyboardShortcut;
        if (e.altKey && (e.keyCode === 38 || e.keyCode === 40) && !isKeyboardShortcut) {
            e.preventDefault();
            return;
        }
        /*alt + up to close filter popup*/
        if (e.altKey && e.keyCode === 38 && this.parent.element.lastElementChild.classList.contains('e-filter-popup')) {
            this.parent.notify(filterCellKeyDown, { closePopup: true });
            return;
        }
        if (this.parent.allowPrint && e.ctrlKey && e.keyCode === 80 && isKeyboardShortcut) {
            e.preventDefault();
            this.parent.print();
            return;
        }
        var textarea = e.target;
        if (!isNullOrUndefined(textarea) && textarea.classList.contains('e-addNoteContainer')) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                var isNoteCellIndex = !isNullOrUndefined(this.parent.spreadsheetNoteModule.noteCellIndexes);
                var cellIndexes = isNoteCellIndex ? this.parent.spreadsheetNoteModule.noteCellIndexes :
                    getCellIndexes(this.parent.getActiveSheet().activeCell);
                var cell = getCell(cellIndexes[0], cellIndexes[1], this.parent.getActiveSheet());
                var targetElement = this.parent.getCell(cellIndexes[0], cellIndexes[1]);
                var address = getSheetName(this.parent, this.parent.activeSheetIndex) + '!' + getRangeAddress(cellIndexes);
                if (!isNullOrUndefined(textarea) && !isNullOrUndefined(textarea.value)
                    && ((isNullOrUndefined(cell) || isNullOrUndefined(cell.notes)) || (cell.notes !== textarea.value))
                    && document.activeElement.className.indexOf('e-addNoteContainer') > -1) {
                    var eventAction = !isNullOrUndefined(cell) && cell.notes ? 'editNote' : 'addNote';
                    this.parent.notify(setActionData, { args: { action: 'beforeCellSave', eventArgs: { address: address } } });
                    updateCell(this.parent, this.parent.getActiveSheet(), { rowIdx: cellIndexes[0], colIdx: cellIndexes[1], preventEvt: true,
                        cell: { notes: textarea.value, isNoteEditable: false } });
                    var eventArgs = { notes: textarea.value, address: address };
                    this.parent.notify(completeAction, { eventArgs: eventArgs, action: eventAction });
                }
                this.parent.spreadsheetNoteModule.isShowNote = null;
                this.parent.notify(removeNoteContainer, '');
                focus(targetElement);
            }
            return;
        }
        var dlgInst = this.parent.serviceLocator.getService(dialog).dialogInstance;
        var isNameBox = target.id === this.parent.element.id + "_name_box";
        if (this.parent.selectionSettings.mode === 'None' || dlgInst || this.parent.isEdit || (target.classList.contains('e-ss-ddb') &&
            e.keyCode !== 117 && e.keyCode !== 9) || (isNameBox && e.keyCode !== 117) || target.classList.contains('e-sheet-rename') ||
            target.id === this.parent.element.id + "_SearchBox" || target.classList.contains('e-chk-hidden') || (target.classList.contains('e-ddl') &&
            target.classList.contains('e-input-focus'))) {
            if (dlgInst) {
                if (e.keyCode === 13) {
                    if (dlgInst.element.classList.contains('e-spreadsheet-function-dlg') &&
                        (target.classList.contains('e-formula-list') || target.classList.contains('e-list-item'))) {
                        focus(dlgInst.element.querySelector('.e-footer-content .e-primary'));
                    }
                }
                else if (e.keyCode === 9) { // To maintain the focus inside the dialogs on the tab or shift + tab key
                    if (dlgInst.element.classList.contains('e-find-dlg')) {
                        var footerBtns = dlgInst.element.querySelectorAll('.e-footer-content .e-btn:not(:disabled)');
                        var cls = footerBtns.length ? footerBtns[footerBtns.length - 1].className :
                            'e-findnreplace-checkmatch';
                        if (e.shiftKey) {
                            if (document.activeElement.classList.contains('e-dlg-closeicon-btn')) {
                                e.preventDefault();
                                if (footerBtns.length) {
                                    focus(footerBtns[footerBtns.length - 1]);
                                }
                                else {
                                    var cBoxWrapper = dlgInst.element.querySelector('.e-findnreplace-exactmatchcheckbox');
                                    if (cBoxWrapper) {
                                        focus(cBoxWrapper.querySelector('.e-findnreplace-checkmatch'));
                                        cBoxWrapper.classList.add('e-focus');
                                    }
                                }
                            }
                        }
                        else if (document.activeElement.className.includes(cls)) {
                            focus(dlgInst.element);
                        }
                    }
                    else if (dlgInst.element.classList.contains('e-protect-dlg')) {
                        if (e.shiftKey ? document.activeElement.classList.contains('e-primary') :
                            document.activeElement.id === this.parent.element.id + "_protect_check") {
                            var listWrapper = dlgInst.element.querySelector('.e-protect-option-list');
                            if (listWrapper && !listWrapper.querySelector('.e-list-item.e-focused')) {
                                var listEle = listWrapper.querySelector('.e-list-item');
                                if (listEle) {
                                    listEle.classList.add('e-focused');
                                }
                            }
                        }
                    }
                    else if (dlgInst.element.classList.contains('e-custom-format-dlg')) {
                        if (!e.shiftKey) {
                            if (document.activeElement.classList.contains('e-btn') &&
                                document.activeElement.parentElement.classList.contains('e-custom-dialog')) {
                                var listWrapper = dlgInst.element.querySelector('.e-custom-listview');
                                var listObj = getComponent(listWrapper, 'listview');
                                if (listWrapper) {
                                    var listEle = listWrapper.querySelector('.e-list-item.e-active');
                                    if (!listEle) {
                                        listEle = listWrapper.querySelector('.e-list-item');
                                        if (listEle) {
                                            listObj.selectItem(listEle);
                                        }
                                        else {
                                            return;
                                        }
                                    }
                                    e.preventDefault();
                                    listEle.focus();
                                }
                            }
                            else if (document.activeElement.classList.contains('e-list-item')) {
                                focus(dlgInst.element);
                            }
                        }
                        else if (document.activeElement.className.includes('e-list-item e-active')) {
                            var listWrapper = closest(document.activeElement, '.e-custom-listview');
                            if (listWrapper) {
                                focus(listWrapper);
                            }
                        }
                    }
                    else if (dlgInst.element.classList.contains('e-spreadsheet-function-dlg')) {
                        if (e.shiftKey && document.activeElement.className.includes('e-list-item e-active')) {
                            var listWrapper = closest(document.activeElement, '.e-formula-list');
                            if (listWrapper) {
                                focus(listWrapper);
                            }
                        }
                    }
                    else if (dlgInst.element.classList.contains('e-goto-dlg') && !dlgInst.element.classList.contains('e-dlg-modal')) {
                        if (e.shiftKey) {
                            if (document.activeElement.className.includes('e-dlg-closeicon-btn')) {
                                var footerOkBtn = dlgInst.element.querySelector('.e-footer-content .e-btn');
                                if (footerOkBtn) {
                                    e.preventDefault();
                                    focus(footerOkBtn);
                                }
                            }
                        }
                        else if (document.activeElement.className.includes('e-btn-goto-ok')) {
                            focus(dlgInst.element);
                        }
                    }
                }
            }
            else if (isNameBox && e.keyCode === 9 && e.shiftKey) {
                this.focusEle(e, '.e-formula-bar', false, true);
            }
            var eventArgs = { action: 'getCurrentEditValue', editedValue: '' };
            this.parent.notify(editOperation, eventArgs);
            var isFormulaEdit = checkIsFormula(eventArgs.editedValue, true);
            if (this.parent.isEdit && isFormulaEdit && e.shiftKey && !e.ctrlKey && isNavigationKey(e.keyCode)) {
                this.shiftSelection(e);
            }
            return;
        }
        var sheet = this.parent.getActiveSheet();
        var actIdxes = getCellIndexes(sheet.activeCell);
        if (e.altKey) {
            if (e.keyCode === 40) {
                if (target.classList.contains('e-dropdown-btn') || target.classList.contains('e-split-btn')) {
                    return;
                }
                var filterArgs = { e: e, isFilterCell: false };
                this.parent.notify(filterCellKeyDown, filterArgs);
                if (filterArgs.isFilterCell) { /*alt + down to open filter popup*/
                    return;
                }
            }
            if (e.keyCode === 40 && !document.getElementById(this.parent.element.id + 'listValid_popup')) {
                var cell = this.parent.getCell(actIdxes[0], actIdxes[1]);
                if (cell) {
                    var listValidation = cell.querySelector('.e-validation-list .e-ddl');
                    if (listValidation) {
                        focus(listValidation);
                        var ddlEle = listValidation.querySelector('.e-dropdownlist') || listValidation;
                        var listObj = getComponent(ddlEle, 'dropdownlist');
                        if (listObj) {
                            listObj.showPopup();
                        }
                        return;
                    }
                }
            }
        }
        if (target.id === this.parent.element.id + "_File") {
            focus(this.parent.element);
        }
        var isSheetTabFocus = target.classList.contains('e-add-sheet-tab') || target.classList.contains('e-sheets-list') ||
            (target.classList.contains('e-tab-wrap') && !!closest(target, '.e-sheet-tabs-items')) ||
            target.classList.contains('e-aggregate-list') || target.classList.contains('e-scroll-nav');
        if ([9, 37, 38, 39, 40, 33, 34, 35, 36].indexOf(e.keyCode) > -1 && !isSheetTabFocus) {
            e.preventDefault();
        }
        var isNavigate;
        var selectIdx = getRangeIndexes(sheet.selectedRange);
        if (e.keyCode === 36) { /* home key */
            var frozenCol = this.parent.frozenColCount(sheet);
            var selectIdxes = void 0;
            if (e.ctrlKey || e.metaKey) {
                var frozenRow = skipHiddenIdx(sheet, this.parent.frozenRowCount(sheet), true);
                if (e.shiftKey) { /* ctrl+shift+home */
                    selectIdxes = [actIdxes[0], actIdxes[1], frozenRow, skipHiddenIdx(sheet, frozenCol, true, 'columns')];
                }
                else { /* ctrl+home */
                    selectIdxes = [frozenRow, skipHiddenIdx(sheet, frozenCol, true, 'columns'), frozenRow];
                    selectIdxes[3] = selectIdxes[1];
                }
                var mainPanel = this.parent.element.querySelector('.e-main-panel');
                if (mainPanel.scrollTop) {
                    mainPanel.scrollTop = 0;
                }
                var hCont = this.parent.getScrollElement();
                if (hCont.scrollLeft) {
                    hCont.scrollLeft = 0;
                }
            }
            else if (e.shiftKey) { /* shift+home */
                var startCol = skipHiddenIdx(sheet, frozenCol, true, 'columns');
                if (sheet.frozenColumns && skipHiddenIdx(sheet, actIdxes[1], true, 'columns') === startCol) {
                    selectIdxes = [selectIdx[0], actIdxes[1], selectIdx[2], skipHiddenIdx(sheet, 0, true, 'columns')];
                }
                else {
                    selectIdxes = [selectIdx[0], actIdxes[1], selectIdx[2], startCol];
                }
                this.scrollNavigation([selectIdxes[2], selectIdxes[3]], true);
            }
            else {
                var startCol = skipHiddenIdx(sheet, frozenCol, true, 'columns');
                if (sheet.frozenColumns && (startCol === actIdxes[1] || frozenCol === actIdxes[1])) {
                    startCol = skipHiddenIdx(sheet, 0, true, 'columns');
                }
                selectIdxes = [actIdxes[0], startCol, actIdxes[0], startCol];
                this.scrollNavigation([selectIdxes[0], selectIdxes[1]], true);
            }
            this.updateSelection(sheet, selectIdxes, e);
        }
        else if (e.ctrlKey || e.metaKey) {
            if (e.keyCode === 35) { /*ctrl + end*/
                e.preventDefault();
                var lastRow = skipHiddenIdx(sheet, sheet.usedRange.rowIndex, false);
                lastRow = lastRow > -1 ? lastRow : sheet.usedRange.rowIndex;
                var lastCol = skipHiddenIdx(sheet, sheet.usedRange.colIndex, false, 'columns');
                lastCol = lastCol > -1 ? lastCol : sheet.usedRange.colIndex;
                if (!e.shiftKey) {
                    actIdxes[0] = lastRow;
                    actIdxes[1] = lastCol;
                }
                actIdxes[2] = lastRow;
                actIdxes[3] = lastCol;
                this.updateSelection(sheet, actIdxes.concat(actIdxes), e);
                this.scrollNavigation([lastRow, lastCol], true);
            }
            else if (e.keyCode === 32 && !e.shiftKey && isKeyboardShortcut) { /*ctrl + space*/
                selectIdx[0] = 0;
                selectIdx[2] = sheet.rowCount - 1;
                this.updateSelection(sheet, selectIdx, { shiftKey: true });
            }
            if (e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37) {
                if (e.shiftKey) {
                    if (e.keyCode === 40) { /* ctrl+shift+down */
                        selectIdx[2] = this.getNextNonEmptyCell(selectIdx[2], actIdxes[1], 'down');
                    }
                    else if ((e.keyCode === 39 && !isRtl) || (e.keyCode === 37 && isRtl)) { /* ctrl+shift+right */
                        selectIdx[3] = this.getNextNonEmptyCell(actIdxes[0], selectIdx[3], 'right');
                    }
                    else if (e.keyCode === 38) { /* ctrl+shift+up */
                        selectIdx[2] = this.getNextNonEmptyCell(selectIdx[2], actIdxes[1], 'top');
                    }
                    else { /* ctrl+shift+left */
                        selectIdx[3] = this.getNextNonEmptyCell(actIdxes[0], selectIdx[3], 'left');
                    }
                    this.updateSelection(sheet, selectIdx, e);
                    this.scrollNavigation([selectIdx[2], selectIdx[3]], true);
                }
                else {
                    if ((e.keyCode === 37 && !isRtl) || (e.keyCode === 39 && isRtl)) { /*ctrl + left*/
                        actIdxes[1] = this.getNextNonEmptyCell(actIdxes[0], actIdxes[1], 'left');
                    }
                    else if (e.keyCode === 38) { /*ctrl + up*/
                        actIdxes[0] = this.getNextNonEmptyCell(actIdxes[0], actIdxes[1], 'top');
                    }
                    else if ((e.keyCode === 39 && !isRtl) || (e.keyCode === 37 && isRtl)) { /*ctrl+ right*/
                        actIdxes[1] = this.getNextNonEmptyCell(actIdxes[0], actIdxes[1], 'right');
                    }
                    else { /*ctrl+ down*/
                        actIdxes[0] = this.getNextNonEmptyCell(actIdxes[0], actIdxes[1], 'down');
                    }
                    this.parent.selectRange(getRangeAddress(actIdxes));
                    this.scrollNavigation([actIdxes[0], actIdxes[1]], true);
                }
            }
            else if (e.keyCode === 117) {
                var activeEle = document.activeElement;
                if (activeEle.classList.contains('e-spreadsheet') || closest(activeEle, '.e-sheet')) {
                    this.setFocus('Sheet', e, true);
                }
                else if (isSheetTabFocus) {
                    this.setFocus('SheetTabs', e);
                }
                else if (closest(activeEle, '.e-ribbon')) {
                    this.setFocus('Ribbon', e);
                }
                else if (isNameBox || activeEle.classList.contains('e-insert-function')) {
                    this.setFocus('FormulaBar', e);
                }
            }
        }
        else {
            if (e.shiftKey) {
                if (e.keyCode === 32 && isKeyboardShortcut) { /*shift + space*/
                    e.preventDefault();
                    selectIdx[1] = 0;
                    selectIdx[3] = sheet.colCount - 1;
                    this.updateSelection(sheet, selectIdx, e);
                }
                this.shiftSelection(e);
                if ((e.keyCode === 34 || e.keyCode === 33) && (this.parent.scrollModule &&
                    this.parent.scrollModule.isKeyScroll)) { /* shift Page Up and Page Down*/
                    var scrollTop = 0;
                    var mainPanel = this.parent.element.querySelector('.e-main-panel');
                    var topRow = skipHiddenIdx(sheet, getCellIndexes(sheet.paneTopLeftCell)[0], true);
                    var viewportHgt = getBottomOffset(this.parent, topRow).height;
                    if (e.keyCode === 34) { /* Page Down*/
                        scrollTop = viewportHgt + this.parent.scrollModule.offset.top.size;
                        if (!this.parent.scrollSettings.isFinite) {
                            var vTrack = this.parent.getMainContent().querySelector('.e-virtualtrack');
                            if (vTrack && parseFloat(vTrack.style.height) < scrollTop + viewportHgt) {
                                vTrack.style.height = scrollTop + viewportHgt + "px";
                            }
                        }
                    }
                    else { /* Page up*/
                        scrollTop = this.parent.scrollModule.offset.top.size - viewportHgt;
                        if (Math.round(scrollTop) < 0) {
                            if (mainPanel.scrollTop) {
                                scrollTop = 0;
                            }
                            else {
                                this.parent.selectRange(getRangeAddress([selectIdx[0], selectIdx[1], topRow, selectIdx[3]]));
                                return;
                            }
                        }
                    }
                    var aRowIdx = skipHiddenIdx(sheet, getRangeIndexes(sheet.selectedRange)[2], true);
                    var selectDiff_1 = topRow > aRowIdx ? 0 : aRowIdx - topRow;
                    if (this.parent.scrollModule && mainPanel.scrollTop) {
                        this.parent.scrollModule.isKeyScroll = false;
                    }
                    mainPanel.scrollTop = scrollTop;
                    getUpdateUsingRaf(function () {
                        if (e.keyCode === 34) {
                            selectIdx[2] = skipHiddenIdx(sheet, getCellIndexes(sheet.paneTopLeftCell)[0] + selectDiff_1, true);
                            if (_this.parent.scrollSettings.isFinite && selectIdx[2] > sheet.rowCount - 1) {
                                selectIdx[2] = skipHiddenIdx(sheet, sheet.rowCount - 1, false);
                                selectIdx[2] = selectIdx[2] < 0 ? 0 : selectIdx[2];
                            }
                        }
                        else {
                            selectIdx[2] = skipHiddenIdx(sheet, getCellIndexes(sheet.paneTopLeftCell)[0] + selectDiff_1, false);
                            selectIdx[2] = selectIdx[2] < 0 ? 0 : selectIdx[2];
                        }
                        _this.updateSelection(sheet, selectIdx, e);
                    });
                }
            }
            else {
                if (e.keyCode === 9 || (this.parent.enableRtl ? e.keyCode === 37 : e.keyCode === 39)) { /*Right or Tab key*/
                    var cell = getCell(actIdxes[0], actIdxes[1], sheet);
                    if (cell && cell.colSpan > 1) {
                        actIdxes[1] += (cell.colSpan - 1);
                    }
                    if (actIdxes[1] < sheet.colCount - 1 && (!sheet.isProtected || sheet.protectSettings.selectCells)) {
                        actIdxes[1] += 1;
                        isNavigate = true;
                    }
                    else if (sheet.protectSettings.selectUnLockedCells) {
                        var idx = this.getNextUnlockedCell('right', actIdxes);
                        isNavigate = actIdxes[1] !== idx[1] || actIdxes[0] !== idx[0];
                        actIdxes[1] = idx[1];
                        actIdxes[0] = idx[0];
                    }
                }
                else if (e.keyCode === 13 || e.keyCode === 40) { /*Down or Enter Key*/
                    var cell = getCell(actIdxes[0], actIdxes[1], sheet);
                    if (cell && cell.rowSpan > 1) {
                        actIdxes[0] += (cell.rowSpan - 1);
                    }
                    if (actIdxes[0] < sheet.rowCount - 1 && (!sheet.isProtected || sheet.protectSettings.selectCells)) {
                        isNavigate = true;
                        actIdxes[0] += 1;
                    }
                    else if (sheet.protectSettings.selectUnLockedCells) {
                        var idx = this.getNextUnlockedCell('down', actIdxes);
                        isNavigate = actIdxes[0] !== idx[0] || actIdxes[1] !== idx[1];
                        actIdxes[1] = idx[1];
                        actIdxes[0] = idx[0];
                    }
                }
                else if ((e.keyCode === 34 || e.keyCode === 33) && (this.parent.scrollModule &&
                    this.parent.scrollModule.isKeyScroll)) { /*Page Up and Page Down*/
                    var mainPanel = this.parent.element.querySelector('.e-main-panel');
                    var scrollTop = 0;
                    var topRow_1 = skipHiddenIdx(sheet, getCellIndexes(sheet.paneTopLeftCell)[0], true);
                    var aRowIdx_1 = skipHiddenIdx(sheet, getCellIndexes(sheet.activeCell)[0], true);
                    var viewportHgt = getBottomOffset(this.parent, topRow_1).height;
                    if (e.keyCode === 34) { /*Page Down*/
                        scrollTop = this.parent.scrollModule.offset.top.size + viewportHgt;
                        if (!this.parent.scrollSettings.isFinite) {
                            var vTrack = this.parent.getMainContent().querySelector('.e-virtualtrack');
                            if (vTrack && parseFloat(vTrack.style.height) < scrollTop + viewportHgt) {
                                vTrack.style.height = scrollTop + viewportHgt + "px";
                            }
                        }
                    }
                    else { /*Page Up*/
                        scrollTop = this.parent.scrollModule.offset.top.size - viewportHgt;
                        if (sheet.frozenRows && actIdxes[0] < this.parent.frozenRowCount(sheet)) {
                            this.parent.selectRange(getRangeAddress([topRow_1, selectIdx[1], topRow_1, selectIdx[1]]));
                            return;
                        }
                        if (Math.round(scrollTop) < 0) {
                            if (mainPanel.scrollTop) {
                                scrollTop = 0;
                            }
                            else {
                                return;
                            }
                        }
                    }
                    var selectDiff_2 = topRow_1 > aRowIdx_1 ? 0 : aRowIdx_1 - topRow_1;
                    if (this.parent.scrollModule && mainPanel.scrollTop) {
                        this.parent.scrollModule.isKeyScroll = false;
                    }
                    mainPanel.scrollTop = scrollTop;
                    getUpdateUsingRaf(function () {
                        var activeRow;
                        if (e.keyCode === 34) {
                            activeRow = skipHiddenIdx(sheet, getCellIndexes(sheet.paneTopLeftCell)[0] + selectDiff_2, true);
                            if (_this.parent.scrollSettings.isFinite) {
                                if (activeRow > sheet.rowCount - 1) {
                                    activeRow = skipHiddenIdx(sheet, sheet.rowCount - 1, false);
                                    activeRow = activeRow < 0 ? 0 : activeRow;
                                }
                            }
                        }
                        else {
                            activeRow = getCellIndexes(sheet.paneTopLeftCell)[0] + selectDiff_2;
                            activeRow -= _this.parent.hiddenCount(topRow_1, aRowIdx_1);
                            activeRow = skipHiddenIdx(sheet, activeRow, false);
                            activeRow = activeRow < 0 ? 0 : activeRow;
                        }
                        _this.parent.notify(cellNavigate, { range: [activeRow, actIdxes[1], activeRow, actIdxes[1]], preventAnimation: true });
                    });
                }
            }
            if (e.shiftKey ? e.keyCode === 9 : (this.parent.enableRtl ? e.keyCode === 39 : e.keyCode === 37)) { /*left or shift+tab key*/
                if (actIdxes[1] > 0 && (!sheet.isProtected || sheet.protectSettings.selectCells)) {
                    actIdxes[1] -= 1;
                    isNavigate = true;
                }
                else if (sheet.protectSettings.selectUnLockedCells) {
                    var idx = this.getNextUnlockedCell('left', actIdxes);
                    isNavigate = actIdxes[1] !== idx[1] || actIdxes[0] !== idx[0];
                    actIdxes[1] = idx[1];
                    actIdxes[0] = idx[0];
                }
                if (actIdxes[1] <= 0) {
                    var content = this.parent.getMainContent();
                    if (actIdxes[1] === 0 && content.scrollLeft && !this.parent.enableRtl) {
                        content.scrollLeft = 0;
                    }
                }
            }
            else if (e.shiftKey ? e.keyCode === 13 : e.keyCode === 38) { /*up or shift+enter key */
                if (!this.parent.element.querySelector('.e-find-toolbar')) {
                    if (actIdxes[0] > 0 && (!sheet.isProtected || sheet.protectSettings.selectCells)) {
                        actIdxes[0] -= 1;
                        isNavigate = true;
                    }
                    else if (sheet.protectSettings.selectUnLockedCells) {
                        var cellIdx = this.getNextUnlockedCell('up', actIdxes);
                        isNavigate = actIdxes[0] !== cellIdx[0] || actIdxes[1] !== cellIdx[1];
                        actIdxes[1] = cellIdx[1];
                        actIdxes[0] = cellIdx[0];
                    }
                    if (actIdxes[0] <= 0) {
                        var contentEle = this.parent.getMainContent().parentElement;
                        if (actIdxes[0] === 0 && contentEle.scrollTop) {
                            contentEle.scrollTop = 0;
                        }
                    }
                }
            }
        }
        if (isNavigate && (!this.parent.scrollModule || this.parent.scrollModule.isKeyScroll) && !isSheetTabFocus &&
            !closest(document.activeElement, '.e-ribbon') && !target.classList.contains('e-insert-function')
            && (!target.classList.contains('e-formula-bar') || (target.classList.contains('e-formula-bar') && target.nodeName === 'TEXTAREA' && e.keyCode === 13))) {
            if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13) { /* down || up */
                while (isHiddenRow(sheet, actIdxes[0])) {
                    if (e.keyCode === 40 || (!e.shiftKey && e.keyCode === 13)) {
                        actIdxes[0] = actIdxes[0] + 1;
                    }
                    if (e.keyCode === 38 || (e.shiftKey && e.keyCode === 13)) {
                        actIdxes[0] = actIdxes[0] - 1;
                        if (actIdxes[0] < 0) {
                            return;
                        }
                    }
                }
            }
            if (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 9) { /* left || right || tab */
                while (isHiddenCol(sheet, actIdxes[1])) {
                    if (e.keyCode === 39 || (!e.shiftKey && e.keyCode === 9)) {
                        actIdxes[1] = actIdxes[1] + 1;
                    }
                    if (e.keyCode === 37 || (e.shiftKey && e.keyCode === 9)) {
                        actIdxes[1] = actIdxes[1] - 1;
                        if (actIdxes[1] < 0) {
                            return;
                        }
                    }
                }
            }
            var topLeftIdx = getRangeIndexes(sheet.topLeftCell);
            if (sheet.frozenRows && actIdxes[0] < topLeftIdx[0]) {
                actIdxes[0] = skipHiddenIdx(sheet, topLeftIdx[0], true);
            }
            if (sheet.frozenColumns && actIdxes[1] < topLeftIdx[1]) {
                actIdxes[1] = skipHiddenIdx(sheet, topLeftIdx[1], true, 'columns');
            }
            this.scrollNavigation(actIdxes);
            var range_1 = getRangeAddress(actIdxes);
            var navigateFn = function (preventAnimation) {
                if (range_1 === sheet.selectedRange) {
                    return;
                }
                _this.parent.selectionModule.previousActiveCell = sheet.activeCell;
                if (document.getElementsByClassName('e-addNoteContainer') && document.getElementsByClassName('e-addNoteContainer').length > 0) {
                    _this.parent.notify(removeNoteContainer, '');
                }
                _this.parent.setSheetPropertyOnMute(sheet, 'activeCell', range_1);
                _this.parent.notify(cellNavigate, { range: actIdxes.concat(actIdxes), preventAnimation: preventAnimation });
                var ele;
                if (Browser.isDevice && Browser.info.name === 'safari' && (Browser.isIos || Browser.isIos7)) {
                    ele = _this.parent.element.querySelector('.e-ss-focus-edit');
                }
                ele = ele || _this.parent.getCell(actIdxes[0], actIdxes[1]);
                if (ele) {
                    focus(ele);
                }
            };
            if (this.parent.scrollModule && this.parent.scrollModule.isKeyScroll) {
                if (range_1 === sheet.selectedRange) {
                    return;
                }
                getUpdateUsingRaf(navigateFn.bind(this, true));
            }
            else {
                navigateFn();
            }
        }
        else if (e.keyCode === 9) {
            var ribbon = this.parent.showRibbon && closest(document.activeElement, '.e-ribbon');
            if (ribbon) {
                if (closest(document.activeElement, '.e-tab-header')) {
                    if (e.shiftKey || ribbon.classList.contains('e-collapsed')) {
                        this.focusEle(e, '.e-ribbon .e-drop-icon');
                    }
                    else {
                        this.focusEle(e, '.e-ribbon .e-content .e-toolbar-item:not(.e-separator):not(.e-overlay):not(.e-hide) .e-btn');
                    }
                }
                else if (closest(document.activeElement, '.e-content')) {
                    if (e.shiftKey) {
                        this.focusEle(e, '.e-ribbon .e-toolbar-items .e-toolbar-item.e-active .e-tab-wrap', true);
                    }
                    else {
                        this.focusEle(e, '.e-ribbon .e-drop-icon');
                    }
                }
                else if (document.activeElement.classList.contains('e-drop-icon')) {
                    if (e.shiftKey && !ribbon.classList.contains('e-collapsed')) {
                        this.focusEle(e, '.e-ribbon .e-content .e-toolbar-item:not(.e-separator):not(.e-overlay):not(.e-hide) .e-btn');
                    }
                    else {
                        this.focusEle(e, '.e-ribbon .e-toolbar-items .e-toolbar-item.e-active .e-tab-wrap', true);
                    }
                }
            }
            else if (target.classList.contains('e-insert-function')) {
                if (e.shiftKey) {
                    this.focusEle(e, '.e-formula-bar-panel .e-combobox');
                }
                else {
                    this.focusEle(e, '.e-formula-bar', false, true);
                }
            }
            else if (isSheetTabFocus) {
                if (e.shiftKey) {
                    var isNavOrAggregate = target.classList.contains('e-aggregate-list') || target.classList.contains('e-scroll-left-nav');
                    if (target.classList.contains('e-add-sheet-tab') || isNavOrAggregate || (target.classList.contains('e-sheets-list') &&
                        target.previousElementSibling && target.previousElementSibling.disabled)) {
                        var focusEle = !isNavOrAggregate && this.parent.element.querySelector('.e-aggregate-list');
                        if (focusEle) {
                            this.focusEle(e, null, false, false, focusEle);
                        }
                        else if (!target.classList.contains('e-scroll-left-nav') && this.parent.element.querySelector('.e-sheet-tab-panel .e-scroll-nav')) {
                            this.focusEle(e, '.e-sheet-tab-panel .e-scroll-right-nav', true);
                        }
                        else {
                            var items = [].slice.call(this.parent.element.querySelectorAll('.e-sheet-tab-panel .e-toolbar-item'));
                            if (items[items.length - 1]) {
                                this.focusEle(e, null, true, false, items[items.length - 1].querySelector('.e-tab-wrap'));
                            }
                        }
                    }
                    else if (target.classList.contains('e-scroll-right-nav')) {
                        this.focusEle(e, '.e-sheet-tab-panel .e-scroll-left-nav', true);
                    }
                    else if (target.classList.contains('e-tab-wrap')) {
                        var items = [].slice.call(this.parent.element.querySelectorAll('.e-sheet-tab-panel .e-toolbar-item'));
                        var idx = items.indexOf(target.parentElement);
                        if (idx === 0) {
                            this.focusEle(e, '.e-sheet-tab-panel .e-sheets-list');
                        }
                        else {
                            this.focusEle(e, null, true, false, items[idx - 1].querySelector('.e-tab-wrap'));
                        }
                    }
                }
                else {
                    var isAggAvail = !!this.parent.element.querySelector('.e-aggregate-list');
                    if (target.classList.contains('e-aggregate-list') || (!isAggAvail && target.classList.contains('e-scroll-right-nav'))) {
                        this.focusEle(e, '.e-sheet-tab-panel .e-icon-btn:not(:disabled)');
                    }
                    else if (target.classList.contains('e-sheets-list')) {
                        this.focusEle(e, '.e-sheet-tab-panel .e-toolbar-item .e-tab-wrap', true);
                    }
                    else if (target.classList.contains('e-scroll-left-nav')) {
                        this.focusEle(e, '.e-sheet-tab-panel .e-scroll-right-nav', true);
                    }
                    else if (target.classList.contains('e-tab-wrap')) {
                        var items = [].slice.call(this.parent.element.querySelectorAll('.e-sheet-tab-panel .e-toolbar-item'));
                        var index = items.indexOf(target.parentElement);
                        if (index === items.length - 1) {
                            var isNav = !!this.parent.element.querySelector('.e-sheet-tab-panel .e-scroll-nav');
                            if (isNav || !isAggAvail) {
                                this.focusEle(e, ".e-sheet-tab-panel ." + (isNav ? 'e-scroll-nav' : 'e-icon-btn:not(:disabled)'), isNav);
                            }
                        }
                        else {
                            this.focusEle(e, null, true, false, items[index + 1].querySelector('.e-tab-wrap'));
                        }
                    }
                }
            }
        }
        if (e.keyCode === 121 && e.shiftKey && !this.parent.enableKeyboardShortcut) { /*Shift + F10*/
            e.preventDefault();
        }
    };
    KeyboardNavigation.prototype.setFocus = function (layout, e, isSheetArea) {
        if (layout === 'Sheet') {
            if (e.shiftKey) {
                if (this.parent.showFormulaBar) {
                    this.focusEle(e, '.e-formula-bar-panel .e-combobox');
                }
                else {
                    this.setFocus('FormulaBar', e, isSheetArea);
                }
            }
            else {
                if (this.parent.showSheetTabs) {
                    this.focusEle(e, '.e-sheet-tab-panel .e-icon-btn:not(:disabled)');
                }
                else {
                    this.setFocus('SheetTabs', e, isSheetArea);
                }
            }
        }
        else if (layout === 'SheetTabs') {
            if (e.shiftKey) {
                if (!isSheetArea) {
                    this.focusEle(e, '.e-selectall');
                }
            }
            else {
                if (this.parent.showRibbon) {
                    this.focusEle(e, '.e-ribbon .e-toolbar-items .e-toolbar-item.e-active .e-tab-wrap', true);
                }
                else {
                    this.setFocus('Ribbon', e, isSheetArea);
                }
            }
        }
        else if (layout === 'Ribbon') {
            if (e.shiftKey) {
                if (this.parent.showSheetTabs) {
                    this.focusEle(e, '.e-sheet-tab-panel .e-icon-btn:not(:disabled)');
                }
                else if (!isSheetArea) {
                    this.focusEle(e, '.e-selectall');
                }
            }
            else {
                if (this.parent.showFormulaBar) {
                    this.focusEle(e, '.e-formula-bar-panel .e-combobox');
                }
                else {
                    this.setFocus('FormulaBar', e, isSheetArea);
                }
            }
        }
        else if (layout === 'FormulaBar') {
            if (e.shiftKey) {
                if (this.parent.showRibbon) {
                    this.focusEle(e, '.e-ribbon .e-toolbar-items .e-toolbar-item.e-active .e-tab-wrap', true);
                }
                else {
                    this.setFocus('Ribbon', e, isSheetArea);
                }
            }
            else if (!isSheetArea) {
                this.focusEle(e, '.e-selectall');
            }
        }
    };
    KeyboardNavigation.prototype.focusEle = function (e, selector, setTabIndex, startEdit, focusEle) {
        focusEle = focusEle || this.parent.element.querySelector(selector);
        if (setTabIndex && !focusEle) {
            var tabEle = this.parent.element.querySelector('.e-ribbon .e-tab');
            var selectedTab = (tabEle && getComponent(tabEle, 'tab').selectedItem) || 0;
            focusEle = this.parent.element.querySelector('.e-tab-header').getElementsByClassName('e-toolbar-item')[selectedTab];
            focusEle = focusEle && focusEle.querySelector('.e-tab-wrap');
        }
        if (focusEle) {
            e.preventDefault();
            if (startEdit) {
                focusEle.click();
                focus(focusEle);
                focusEle.setSelectionRange(focusEle.value.length, focusEle.value.length);
            }
            else if (setTabIndex) {
                focusEle.setAttribute('tabindex', '0');
                if (focusEle.parentElement.classList.contains('e-active') && focusEle.parentElement.classList.contains('e-toolbar-item')) {
                    var tabEle = this.parent.element.querySelector('.e-sheet-tab-panel .e-sheet-tab');
                    if (!tabEle && tabEle.classList.contains('e-focused')) {
                        tabEle.classList.add('e-focused');
                    }
                }
                focusEle.focus();
            }
            else {
                focus(focusEle);
            }
        }
    };
    KeyboardNavigation.prototype.updateSelection = function (sheet, range, e) {
        if (sheet.isProtected && !sheet.protectSettings.selectCells && sheet.protectSettings.selectUnLockedCells) {
            if (!isLockedCells(this.parent, getSwapRange(range))) {
                this.parent.notify(cellNavigate, { range: range, shiftKey: e.shiftKey });
            }
        }
        else {
            this.parent.notify(cellNavigate, { range: range, shiftKey: e.shiftKey });
        }
    };
    KeyboardNavigation.prototype.getNextNonEmptyCell = function (rowIdx, colIdx, position) {
        var sheet = this.parent.getActiveSheet();
        var isNonEmptyCell = function (rowIdx, colIdx) {
            var cellVal = getCell(rowIdx, colIdx, sheet, null, true).value;
            return !isNullOrUndefined(cellVal) && cellVal !== '';
        };
        var checkForEmptyCell;
        var visibleIdx;
        if (position === 'down') {
            var startRow = skipHiddenIdx(sheet, rowIdx + 1, true);
            checkForEmptyCell = isNonEmptyCell(startRow, colIdx);
            var lastRow = skipHiddenIdx(sheet, sheet.rowCount - 1, false);
            for (var rowIdx_1 = startRow; rowIdx_1 < sheet.rowCount; rowIdx_1++) {
                if (rowIdx_1 === lastRow) {
                    return rowIdx_1;
                }
                if (checkForEmptyCell) {
                    if (!isNonEmptyCell(skipHiddenIdx(sheet, rowIdx_1, true), colIdx)) {
                        return skipHiddenIdx(sheet, rowIdx_1 - 1, false);
                    }
                }
                else {
                    visibleIdx = skipHiddenIdx(sheet, rowIdx_1 + 1, true);
                    if (isNonEmptyCell(visibleIdx, colIdx)) {
                        return visibleIdx;
                    }
                }
            }
            return rowIdx;
        }
        else if (position === 'top') {
            var startRow = skipHiddenIdx(sheet, rowIdx - 1, false);
            checkForEmptyCell = isNonEmptyCell(startRow, colIdx);
            var startIdx = this.parent.frozenRowCount(sheet) ? getRangeIndexes(sheet.topLeftCell)[0] : 0;
            var endIdx = skipHiddenIdx(sheet, startIdx, true);
            for (var rowIdx_2 = startRow; rowIdx_2 >= 0; rowIdx_2--) {
                if (rowIdx_2 === endIdx) {
                    return rowIdx_2;
                }
                if (checkForEmptyCell) {
                    if (!isNonEmptyCell(skipHiddenIdx(sheet, rowIdx_2, false), colIdx)) {
                        return skipHiddenIdx(sheet, rowIdx_2 + 1, true);
                    }
                }
                else {
                    visibleIdx = skipHiddenIdx(sheet, rowIdx_2 - 1, false);
                    if (isNonEmptyCell(visibleIdx, colIdx)) {
                        return visibleIdx;
                    }
                }
            }
            return rowIdx;
        }
        else if (position === 'right') {
            var startCol = skipHiddenIdx(sheet, colIdx + 1, true, 'columns');
            checkForEmptyCell = isNonEmptyCell(rowIdx, startCol);
            var lastCol = skipHiddenIdx(sheet, sheet.colCount - 1, false, 'columns');
            for (var colIdx_1 = startCol; colIdx_1 < sheet.colCount; colIdx_1++) {
                if (colIdx_1 === lastCol) {
                    return colIdx_1;
                }
                if (checkForEmptyCell) {
                    if (!isNonEmptyCell(rowIdx, skipHiddenIdx(sheet, colIdx_1, true, 'columns'))) {
                        return skipHiddenIdx(sheet, colIdx_1 - 1, false, 'columns');
                    }
                }
                else {
                    visibleIdx = skipHiddenIdx(sheet, colIdx_1 + 1, true, 'columns');
                    if (isNonEmptyCell(rowIdx, visibleIdx)) {
                        return visibleIdx;
                    }
                }
            }
            return colIdx;
        }
        else {
            var startCol = skipHiddenIdx(sheet, colIdx - 1, false, 'columns');
            checkForEmptyCell = isNonEmptyCell(rowIdx, startCol);
            var startIdx = this.parent.frozenColCount(sheet) ? getRangeIndexes(sheet.topLeftCell)[1] : 0;
            var endIdx = skipHiddenIdx(sheet, startIdx, true, 'columns');
            for (var colIdx_2 = startCol; colIdx_2 >= 0; colIdx_2--) {
                if (colIdx_2 === endIdx) {
                    return colIdx_2;
                }
                if (checkForEmptyCell) {
                    if (!isNonEmptyCell(rowIdx, skipHiddenIdx(sheet, colIdx_2, false, 'columns'))) {
                        return skipHiddenIdx(sheet, colIdx_2 + 1, true, 'columns');
                    }
                }
                else {
                    visibleIdx = skipHiddenIdx(sheet, colIdx_2 - 1, false, 'columns');
                    if (isNonEmptyCell(rowIdx, visibleIdx)) {
                        return visibleIdx;
                    }
                }
            }
            return colIdx;
        }
    };
    KeyboardNavigation.prototype.getNextUnlockedCell = function (position, actCellIdx) {
        var sheet = this.parent.getActiveSheet();
        var cell;
        var col;
        if (position === 'right') {
            var rowIdx = actCellIdx[0];
            var colIdx = void 0;
            var secIteration = void 0;
            var rowLen = sheet.usedRange.rowIndex;
            var colLen = sheet.usedRange.colIndex;
            while (rowIdx <= rowLen) {
                colIdx = colIdx === undefined ? actCellIdx[1] + 1 : 0;
                if (secIteration && rowIdx === actCellIdx[0]) {
                    colLen = actCellIdx[1] - 1;
                }
                for (colIdx; colIdx <= colLen; colIdx++) {
                    cell = getCell(rowIdx, colIdx, sheet);
                    col = getColumn(sheet, colIdx) || {};
                    if (!isLocked(cell, col) && !col.hidden && !isHiddenRow(sheet, rowIdx)) {
                        return [rowIdx, colIdx];
                    }
                }
                if (rowIdx === sheet.usedRange.rowIndex && !secIteration) {
                    rowIdx = 0;
                    rowLen = actCellIdx[0];
                    secIteration = true;
                }
                else {
                    rowIdx++;
                }
            }
        }
        else if (position === 'left') {
            var rowIdx = actCellIdx[0];
            var colIdx = void 0;
            var secIteration = void 0;
            var rowLen = 0;
            var colLen = 0;
            while (rowIdx >= rowLen) {
                colIdx = colIdx === undefined ? actCellIdx[1] - 1 : sheet.usedRange.colIndex;
                if (secIteration && rowIdx === actCellIdx[0]) {
                    colLen = actCellIdx[1] + 1;
                }
                for (colIdx; colIdx >= colLen; colIdx--) {
                    cell = getCell(rowIdx, colIdx, sheet);
                    col = getColumn(sheet, colIdx) || {};
                    if (!isLocked(cell, col) && !col.hidden && !isHiddenRow(sheet, rowIdx)) {
                        return [rowIdx, colIdx];
                    }
                }
                if (rowIdx === 0 && !secIteration) {
                    rowIdx = sheet.usedRange.rowIndex;
                    rowLen = actCellIdx[0];
                    secIteration = true;
                }
                else {
                    rowIdx--;
                }
            }
        }
        else if (position === 'down') {
            var colIdx = actCellIdx[1];
            var rowIdx = void 0;
            var secIteration = void 0;
            var colLen = sheet.usedRange.colIndex;
            var rowLen = sheet.usedRange.rowIndex;
            while (colIdx <= colLen) {
                rowIdx = rowIdx === undefined ? actCellIdx[0] + 1 : 0;
                if (secIteration && colIdx === actCellIdx[1]) {
                    rowLen = actCellIdx[0] - 1;
                }
                for (rowIdx; rowIdx <= rowLen; rowIdx++) {
                    cell = getCell(rowIdx, colIdx, sheet);
                    col = getColumn(sheet, colIdx) || {};
                    if (!isLocked(cell, col) && !col.hidden && !isHiddenRow(sheet, rowIdx)) {
                        return [rowIdx, colIdx];
                    }
                }
                if (colIdx === sheet.usedRange.colIndex && !secIteration) {
                    colIdx = 0;
                    colLen = actCellIdx[1];
                    secIteration = true;
                }
                else {
                    colIdx++;
                }
            }
        }
        else {
            var colIdx = actCellIdx[1];
            var rowIdx = void 0;
            var secIteration = void 0;
            var colLen = 0;
            var rowLen = 0;
            while (colIdx >= colLen) {
                rowIdx = rowIdx === undefined ? actCellIdx[0] - 1 : sheet.usedRange.rowIndex;
                if (secIteration && colIdx === actCellIdx[1]) {
                    rowLen = actCellIdx[0] + 1;
                }
                for (rowIdx; rowIdx >= rowLen; rowIdx--) {
                    cell = getCell(rowIdx, colIdx, sheet);
                    col = getColumn(sheet, colIdx) || {};
                    if (!isLocked(cell, col) && !col.hidden && !isHiddenRow(sheet, rowIdx)) {
                        return [rowIdx, colIdx];
                    }
                }
                if (colIdx === 0 && !secIteration) {
                    colIdx = sheet.usedRange.colIndex;
                    colLen = actCellIdx[1];
                    secIteration = true;
                }
                else {
                    colIdx--;
                }
            }
        }
        return actCellIdx;
    };
    KeyboardNavigation.prototype.shiftSelection = function (e) {
        var sheet = this.parent.getActiveSheet();
        var selectedRange = getRangeIndexes(sheet.selectedRange);
        var swapRange = getSwapRange(selectedRange);
        var noHidden = true;
        var isRtl = this.parent.enableRtl;
        if (e.keyCode === 38) { /*shift + up arrow*/
            for (var i = swapRange[1]; i <= swapRange[3]; i++) {
                var cell = getCell(selectedRange[2], i, sheet);
                if (!isNullOrUndefined(cell) && cell.rowSpan && cell.rowSpan < 0) {
                    selectedRange[2] = skipHiddenIdx(sheet, selectedRange[2] - (Math.abs(cell.rowSpan) + 1), false);
                    noHidden = false;
                    break;
                }
            }
            if (noHidden) {
                selectedRange[2] = skipHiddenIdx(sheet, selectedRange[2] - 1, false);
            }
            var startIdx = this.parent.frozenRowCount(sheet) ? getRangeIndexes(sheet.topLeftCell)[0] : 0;
            if (selectedRange[2] < startIdx) {
                return;
            }
        }
        if (e.keyCode === 40) { /*shift + down arrow*/
            for (var i = swapRange[1]; i <= swapRange[3]; i++) {
                var cell = getCell(selectedRange[2], i, sheet);
                if (!isNullOrUndefined(cell) && cell.rowSpan && cell.rowSpan > 0) {
                    selectedRange[2] = skipHiddenIdx(sheet, selectedRange[2] + Math.abs(cell.rowSpan), true);
                    noHidden = false;
                    break;
                }
            }
            if (noHidden) {
                selectedRange[2] = skipHiddenIdx(sheet, selectedRange[2] + 1, true);
            }
            if (selectedRange[2] >= sheet.rowCount) {
                selectedRange[2] = skipHiddenIdx(sheet, sheet.rowCount - 1, false);
                if (selectedRange[2] < 0) {
                    return;
                }
            }
        }
        if ((e.keyCode === 39 && !isRtl) || (e.keyCode === 37 && isRtl)) { /*shift + right arrow*/
            for (var i = swapRange[0]; i <= swapRange[2]; i++) {
                var cell = getCell(i, selectedRange[3], sheet);
                if (!isNullOrUndefined(cell) && cell.colSpan && cell.colSpan > 0) {
                    selectedRange[3] = skipHiddenIdx(sheet, selectedRange[3] + Math.abs(cell.colSpan), true, 'columns');
                    noHidden = false;
                    break;
                }
            }
            if (noHidden) {
                selectedRange[3] = skipHiddenIdx(sheet, selectedRange[3] + 1, true, 'columns');
            }
            if (selectedRange[3] >= sheet.colCount) {
                selectedRange[3] = skipHiddenIdx(sheet, sheet.colCount - 1, false, 'columns');
                if (selectedRange[3] < 0) {
                    return;
                }
            }
        }
        if ((e.keyCode === 37 && !isRtl) || (e.keyCode === 39 && isRtl)) { /*shift + left arrow*/
            for (var i = swapRange[0]; i <= swapRange[2]; i++) {
                var cell = getCell(i, selectedRange[3], sheet);
                if (!isNullOrUndefined(cell) && cell.colSpan && cell.colSpan < 0) {
                    selectedRange[3] = skipHiddenIdx(sheet, selectedRange[3] - (Math.abs(cell.colSpan) + 1), false, 'columns');
                    noHidden = false;
                    break;
                }
            }
            if (noHidden) {
                selectedRange[3] = skipHiddenIdx(sheet, selectedRange[3] - 1, false, 'columns');
            }
            var startIdx = this.parent.frozenColCount(sheet) ? getRangeIndexes(sheet.topLeftCell)[1] : 0;
            if (selectedRange[3] < startIdx) {
                return;
            }
        }
        if (!this.parent.scrollSettings.enableVirtualization && e.shiftKey && e.ctrlKey) { /*ctrl + shift selection*/
            var usedRange = [sheet.usedRange.rowIndex, sheet.usedRange.colIndex];
            if (e.keyCode === 37) {
                if (selectedRange[3] <= usedRange[1]) {
                    selectedRange[3] = skipHiddenIdx(sheet, 0, true, 'columns');
                }
                else {
                    selectedRange[3] = skipHiddenIdx(sheet, usedRange[1], true, 'columns');
                }
            }
            if (e.keyCode === 38) {
                if (selectedRange[2] <= usedRange[0]) {
                    selectedRange[2] = skipHiddenIdx(sheet, 0, true);
                }
                else {
                    selectedRange[2] = skipHiddenIdx(sheet, usedRange[0], true);
                }
            }
            if (e.keyCode === 39) {
                if (selectedRange[3] <= usedRange[1]) {
                    selectedRange[3] = skipHiddenIdx(sheet, usedRange[1], false, 'columns');
                }
                else {
                    selectedRange[3] = skipHiddenIdx(sheet, sheet.colCount, false, 'columns');
                }
                if (selectedRange[3] < 0) {
                    return;
                }
            }
            if (e.keyCode === 40) {
                if (selectedRange[2] <= usedRange[0]) {
                    selectedRange[2] = skipHiddenIdx(sheet, usedRange[0], false);
                }
                else {
                    selectedRange[2] = skipHiddenIdx(sheet, sheet.rowCount, false);
                }
                if (selectedRange[2] < 0) {
                    return;
                }
            }
        }
        if (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 40) { /*left,right,up,down*/
            var activeIdxes = getCellIndexes(sheet.activeCell);
            if (this.parent.isEdit && e.shiftKey) {
                e.preventDefault();
                this.parent.notify(rangeSelectionByKeydown, { range: selectedRange, e: e });
                this.parent.notify(addressHandle, { range: getRangeAddress(getSwapRange(selectedRange)), isSelect: false });
                this.parent.notify(initiateCur, {});
            }
            else {
                this.parent.notify(cellNavigate, { range: selectedRange, shiftKey: e.shiftKey });
            }
            this.scrollNavigation([isColumnSelected(sheet, selectedRange) ? activeIdxes[0] : selectedRange[2],
                isRowSelected(sheet, selectedRange) ? activeIdxes[1] : selectedRange[3]]);
        }
    };
    KeyboardNavigation.prototype.scrollNavigation = function (actIdxes, scrollToCell) {
        if (!this.parent.allowScrolling) {
            return;
        }
        var x = this.parent.enableRtl ? -1 : 1;
        var cont = this.parent.getMainContent().parentElement;
        var hCont = this.parent.getScrollElement();
        var sheet = this.parent.getActiveSheet();
        var selectedRange = getSwapRange(getRangeIndexes(sheet.selectedRange));
        var topLeftIdxes = getCellIndexes(sheet.topLeftCell);
        var frozenRow = this.parent.frozenRowCount(sheet);
        var frozenCol = this.parent.frozenColCount(sheet);
        var paneTopLeftIdxes = getCellIndexes(sheet.paneTopLeftCell);
        var topIdx = skipHiddenIdx(sheet, actIdxes[0] < frozenRow ? topLeftIdxes[0] : paneTopLeftIdxes[0], true);
        var offsetTopSize = this.parent.scrollModule.offset.top.size;
        if (cont.scrollTop) {
            if (frozenRow && actIdxes[0] !== selectedRange[2]) {
                if (actIdxes[0] === frozenRow) {
                    cont.scrollTop = 0;
                    return;
                }
                if (actIdxes[0] === frozenRow - 1) {
                    cont.scrollTop = 0;
                }
            }
            else if (actIdxes[0] === skipHiddenIdx(sheet, 0, true)) {
                cont.scrollTop = 0;
                return;
            }
        }
        if (hCont && hCont.scrollLeft) {
            if (frozenCol && actIdxes[1] !== selectedRange[3]) {
                if (actIdxes[1] === frozenCol) {
                    hCont.scrollLeft = 0;
                    return;
                }
                if (actIdxes[1] === frozenCol - 1) {
                    hCont.scrollLeft = 0;
                }
            }
            else if (actIdxes[1] === skipHiddenIdx(sheet, 0, true, 'columns')) {
                hCont.scrollLeft = 0;
                return;
            }
        }
        var viewportBtmIdx = getBottomOffset(this.parent, topIdx).index;
        if (viewportBtmIdx <= actIdxes[0]) {
            if (actIdxes[0] >= frozenRow) {
                if (scrollToCell) {
                    var viewPortHeight = cont.getBoundingClientRect().height;
                    var rowsHeight = getRowsHeight(sheet, paneTopLeftIdxes[0], actIdxes[0], true);
                    if (rowsHeight > viewPortHeight * 2) {
                        cont.scrollTop = offsetTopSize + rowsHeight - viewPortHeight;
                    }
                    else {
                        cont.scrollTop = offsetTopSize + rowsHeight - getRowHeight(sheet, actIdxes[0], true);
                    }
                    focus(this.parent.element);
                }
                else {
                    cont.scrollTop = offsetTopSize + getRowsHeight(sheet, viewportBtmIdx, actIdxes[0], true);
                }
            }
        }
        else if (topIdx > actIdxes[0]) {
            if (cont.scrollTop) {
                this.parent.scrollModule.isKeyScroll = false;
            }
            cont.scrollTop = offsetTopSize - Math.ceil(getRowsHeight(sheet, actIdxes[0], topIdx - 1, true));
            if (scrollToCell) {
                focus(this.parent.element);
            }
        }
        var scrollLeftIdx = getRightIdx(this.parent, paneTopLeftIdxes[1]);
        if (scrollLeftIdx <= actIdxes[1] && hCont) {
            if (actIdxes[1] >= frozenCol) {
                if (scrollToCell) {
                    var contWidth = hCont.getBoundingClientRect().width;
                    var scrollWidth = getColumnsWidth(sheet, paneTopLeftIdxes[1], actIdxes[1], true);
                    if (scrollWidth > contWidth * 2) {
                        hCont.scrollLeft = (this.parent.scrollModule.offset.left.size + scrollWidth - contWidth) * x;
                    }
                    else {
                        hCont.scrollLeft = (this.parent.scrollModule.offset.left.size +
                            (scrollWidth - getColumnWidth(sheet, actIdxes[0], null, true))) * x;
                    }
                    focus(this.parent.element);
                }
                else {
                    hCont.scrollLeft = (this.parent.scrollModule.offset.left.size + getColumnsWidth(sheet, scrollLeftIdx, actIdxes[1], true)) * x;
                }
            }
        }
        else if (paneTopLeftIdxes[1] > actIdxes[1] && hCont) {
            if (hCont.scrollLeft) {
                this.parent.scrollModule.isKeyScroll = false;
            }
            hCont.scrollLeft = (this.parent.scrollModule.offset.left.size -
                getColumnsWidth(sheet, actIdxes[1], paneTopLeftIdxes[1] - 1, true)) * x;
            if (scrollToCell) {
                focus(this.parent.element);
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Get the module name.
     */
    KeyboardNavigation.prototype.getModuleName = function () {
        return 'keyboardNavigation';
    };
    KeyboardNavigation.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    return KeyboardNavigation;
}());
export { KeyboardNavigation };
