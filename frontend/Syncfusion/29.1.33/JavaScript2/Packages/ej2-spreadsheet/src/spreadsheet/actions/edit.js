import { EventHandler, Browser, closest, isUndefined, isNullOrUndefined, select, detach, getComponent } from '@syncfusion/ej2-base';
import { getRangeIndexes, getRangeFromAddress, getIndexesFromAddress, getRangeAddress, isSingleCell } from '../../workbook/common/address';
import { keyDown, editOperation, clearCopy, enableToolbarItems, completeAction } from '../common/index';
import { formulaBarOperation, formulaOperation, setActionData, keyUp, getCellPosition, deleteImage, focus, isLockedCells, isNavigationKey } from '../common/index';
import { workbookEditOperation, getFormattedBarText, getFormattedCellObject, wrapEvent, isValidation, activeCellMergedRange, activeCellChanged, getUniqueRange, removeUniquecol, checkUniqueRange, reApplyFormula, refreshChart } from '../../workbook/common/event';
import { getSheetName, getSheetIndex, getCell, getColumn, getRowsHeight, getColumnsWidth, checkColumnValidation, setCell } from '../../workbook/base/index';
import { getSheetNameFromAddress, getSheet, selectionComplete, isHiddenRow, isHiddenCol, applyCF, setVisibleMergeIndex, isReadOnlyCells, getTypeFromFormat } from '../../workbook/index';
import { beginAction, updateCell, isReadOnly, getViewportIndexes, getRow } from '../../workbook/index';
import { hasTemplate, editAlert, getTextWidth, readonlyAlert, finiteAlert } from '../common/index';
import { getSwapRange, getCellIndexes, wrap as wrapText, checkIsFormula, isNumber, isLocked, isCellReference, workbookFormulaOperation } from '../../workbook/index';
import { initiateFormulaReference, initiateCur, clearCellRef, addressHandle, clearRange, dialog, locale } from '../common/index';
import { editValue, initiateEdit, forRefSelRender, isFormulaBarEdit, deleteChart, activeSheetChanged, mouseDown } from '../common/index';
import { checkFormulaRef, getData, clearFormulaDependentCells } from '../../workbook/index';
/**
 * The `Protect-Sheet` module is used to handle the Protecting functionalities in Spreadsheet.
 */
var Edit = /** @class */ (function () {
    /**
     * Constructor for edit module in Spreadsheet.
     *
     * @param {Spreadsheet} parent - Constructor for edit module in Spreadsheet.
     * @private
     */
    function Edit(parent) {
        this.editorElem = null;
        this.editCellData = {};
        this.isEdit = false;
        this.isCellEdit = true;
        this.isNewValueEdit = true;
        this.isAltEnter = false;
        this.curEndPos = null;
        this.curStartPos = null;
        this.uniqueColl = '';
        this.uniqueActCell = '';
        this.isSpill = false;
        this.keyCodes = {
            BACKSPACE: 8,
            SPACE: 32,
            TAB: 9,
            DELETE: 46,
            ESC: 27,
            ENTER: 13,
            FIRSTALPHABET: 65,
            LASTALPHABET: 90,
            FIRSTNUMBER: 48,
            LASTNUMBER: 59,
            FIRSTNUMPAD: 96,
            LASTNUMPAD: 111,
            SYMBOLSETONESTART: 186,
            SYMBOLSETONEEND: 192,
            SYMBOLSETTWOSTART: 219,
            SYMBOLSETTWOEND: 222,
            FIREFOXEQUALPLUS: 61,
            FIREFOXMINUS: 173,
            F2: 113
        };
        this.formulaErrorStrings = [
            'mismatched parentheses',
            'requires 3 arguments',
            'improper formula',
            'empty expression',
            'mismatched string quotes',
            'wrong number of arguments',
            'invalid arguments'
        ];
        this.parent = parent;
        this.addEventListener();
        //Spreadsheet.Inject(WorkbookEdit);
    }
    /**
     * To destroy the edit module.
     *
     * @returns {void} - To destroy the edit module.
     * @hidden
     */
    Edit.prototype.destroy = function () {
        if (this.isEdit) {
            this.cancelEdit(true, false);
        }
        this.removeEventListener();
        this.editorElem = null;
        if (this.formulaErrorStrings) {
            this.formulaErrorStrings = [];
        }
        if (this.editCellData) {
            this.editCellData = {};
        }
        if (this.keyCodes) {
            this.keyCodes = {};
        }
        this.parent = null;
    };
    Edit.prototype.addEventListener = function () {
        if (Browser.isDevice && Browser.info.name === 'safari' && (Browser.isIos || Browser.isIos7)) {
            EventHandler.add(this.parent.element, 'touchend', this.tapHandler, this);
        }
        else {
            EventHandler.add(this.parent.element, 'dblclick', this.dblClickHandler, this);
        }
        this.parent.on(mouseDown, this.mouseDownHandler, this);
        this.parent.on(keyUp, this.keyUpHandler, this);
        this.parent.on(keyDown, this.keyDownHandler, this);
        this.parent.on(editOperation, this.performEditOperation, this);
        this.parent.on(initiateCur, this.initiateCurPosition, this);
        this.parent.on(editValue, this.updateFormulaBarValue, this);
        this.parent.on(addressHandle, this.addressHandler, this);
        this.parent.on(initiateEdit, this.initiateRefSelection, this);
        this.parent.on(forRefSelRender, this.refSelectionRender, this);
        this.parent.on(checkUniqueRange, this.checkUniqueRange, this);
        this.parent.on(reApplyFormula, this.reApplyFormula, this);
        this.parent.on(activeSheetChanged, this.sheetChangeHandler, this);
        this.parent.on(readonlyAlert, this.readOnlyAlertHandler, this);
        this.parent.on(finiteAlert, this.finiteAlertHandler, this);
    };
    Edit.prototype.removeEventListener = function () {
        if (Browser.isDevice && Browser.info.name === 'safari' && (Browser.isIos || Browser.isIos7)) {
            EventHandler.remove(this.parent.element, 'touchend', this.tapHandler);
        }
        else {
            EventHandler.remove(this.parent.element, 'dblclick', this.dblClickHandler);
        }
        if (!this.parent.isDestroyed) {
            this.parent.off(mouseDown, this.mouseDownHandler);
            this.parent.off(keyUp, this.keyUpHandler);
            this.parent.off(keyDown, this.keyDownHandler);
            this.parent.off(editOperation, this.performEditOperation);
            this.parent.off(initiateCur, this.initiateCurPosition);
            this.parent.off(editValue, this.updateFormulaBarValue);
            this.parent.off(addressHandle, this.addressHandler);
            this.parent.off(initiateEdit, this.initiateRefSelection);
            this.parent.off(forRefSelRender, this.refSelectionRender);
            this.parent.off(checkUniqueRange, this.checkUniqueRange);
            this.parent.off(reApplyFormula, this.reApplyFormula);
            this.parent.off(activeSheetChanged, this.sheetChangeHandler);
            this.parent.off(readonlyAlert, this.readOnlyAlertHandler);
            this.parent.off(finiteAlert, this.finiteAlertHandler);
        }
    };
    /**
     * Get the module name.
     *
     * @returns {string} - Get the module name.
     * @private
     */
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    Edit.prototype.performEditOperation = function (args) {
        var action = args.action;
        switch (action) {
            case 'renderEditor':
                this.renderEditor();
                if (args.initLoad && Browser.isDevice && Browser.info.name === 'safari' && (Browser.isIos || Browser.isIos7)) {
                    var focusEditEle_1 = this.parent.createElement('div', { className: 'e-ss-focus-edit', attrs: { 'contentEditable': 'true', 'inputmode': 'none', 'tabindex': '-1' } });
                    var sheetPanel = this.parent.element.querySelector('.e-sheet-panel');
                    if (sheetPanel) {
                        sheetPanel.style.position = 'relative';
                        sheetPanel.appendChild(focusEditEle_1);
                    }
                    this.parent.element.onfocus = function () {
                        focus(focusEditEle_1);
                    };
                }
                break;
            case 'refreshEditor':
                this.refreshEditor(args.value, args.refreshFormulaBar, args.refreshEditorElem, args.isAppend, args.trigEvent);
                if (args.refreshCurPos) {
                    this.setCursorPosition();
                }
                break;
            case 'startEdit':
                if (!this.isEdit) {
                    this.isNewValueEdit = args.isNewValueEdit;
                    this.startEdit(args.address, args.value, args.refreshCurPos);
                }
                else {
                    var isEdit = false;
                    var arg = { isEdit: isEdit };
                    this.parent.notify(isFormulaBarEdit, arg);
                    if (arg.isEdit) {
                        this.isNewValueEdit = args.isNewValueEdit;
                        this.startEdit(args.address, args.value, args.refreshCurPos);
                    }
                }
                break;
            case 'endEdit':
                if (this.isEdit) {
                    this.endEdit(args.refreshFormulaBar, null, args.isPublic);
                }
                break;
            case 'cancelEdit':
                if (this.isEdit) {
                    this.cancelEdit(args.refreshFormulaBar);
                }
                break;
            case 'getCurrentEditValue':
                args.editedValue = this.editCellData.value;
                if (args.endFormulaRef !== undefined) {
                    args.endFormulaRef = this.endFormulaRef;
                }
                break;
            case 'refreshDependentCellValue':
                this.refreshDependentCellValue(args.rowIdx, args.colIdx, args.sheetIdx);
                break;
            case 'getElement':
                args.element = this.getEditElement(this.parent.getActiveSheet());
                break;
            case 'focusEditorElem':
                this.editorElem.focus();
                break;
            case 'getCurrentEditSheetIdx':
                args.sheetIndex = this.editCellData.sheetIndex;
                break;
        }
    };
    Edit.prototype.keyUpHandler = function (e) {
        if (this.isEdit) {
            var editElement = this.getEditElement(this.parent.getActiveSheet());
            if (e.altKey && e.keyCode === 13) {
                editElement.focus();
                this.altEnter();
                this.isAltEnter = true;
            }
            else if (this.isCellEdit && this.editCellData.value !== editElement.textContent && e.keyCode !== 16 && (!e.shiftKey ||
                (e.shiftKey && !isNavigationKey(e.keyCode)))) {
                this.refreshEditor(editElement.textContent, this.isCellEdit);
            }
            var isFormulaEdit = checkIsFormula(this.editCellData.value, true);
            if (isFormulaEdit && (!e || (e.keyCode !== 16 && e.keyCode !== 17 && (!e.shiftKey || !isNavigationKey(e.keyCode))))) {
                this.updateFormulaReference(editElement);
                if (this.endFormulaRef) {
                    var curOffset = this.getCurPosition();
                    var validCharacters = ['+', '-', '*', '/', this.parent.listSeparator, '(', '=', '&', ':'];
                    if (curOffset.end && validCharacters.indexOf(this.editCellData.value[curOffset.end - 1]) > -1) {
                        this.endFormulaRef = false;
                    }
                }
            }
        }
    };
    Edit.prototype.updateFormulaReference = function (editElement) {
        var formulaRefIndicator = this.parent.element.querySelector('.e-formularef-indicator');
        if (formulaRefIndicator) {
            formulaRefIndicator.parentElement.removeChild(formulaRefIndicator);
        }
        if (this.editCellData.value !== editElement.textContent) {
            this.refreshEditor(editElement.textContent, true);
        }
        var sheetIdx = this.editCellData.sheetIndex;
        var editValue = this.editCellData.value;
        this.parent.notify(initiateFormulaReference, { range: editValue, formulaSheetIdx: sheetIdx });
    };
    Edit.prototype.keyDownHandler = function (e) {
        var trgtElem = e.target;
        var keyCode = e.keyCode;
        var sheet = this.parent.getActiveSheet();
        var actCell = getCellIndexes(sheet.activeCell);
        var cell = getCell(actCell[0], actCell[1], sheet, false, true);
        var isKeyboardShortcut = this.parent.enableKeyboardShortcut;
        if (!isKeyboardShortcut && keyCode === this.keyCodes.SPACE && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            return;
        }
        if (!closest(trgtElem, '.e-spreadsheet .e-dialog')) {
            if (!sheet.isProtected || trgtElem.classList.contains('e-sheet-rename') || !isLocked(cell, getColumn(sheet, actCell[1])) || ((trgtElem.classList.contains('e-formula-bar') || trgtElem.classList.contains('e-combobox')) && !trgtElem.disabled)) {
                if (this.isEdit) {
                    var editorElem = this.getEditElement(sheet);
                    var isFormulaEdit = checkIsFormula(this.editCellData.value, true);
                    if (this.isCellEdit || (isFormulaEdit && this.editCellData.value !== editorElem.textContent && e.keyCode !== 16 &&
                        e.keyCode !== 17)) {
                        if (actCell[1] < this.parent.frozenColCount(sheet) && (!sheet.frozenRows || actCell[0] >=
                            this.parent.frozenRowCount(sheet)) && editorElem && editorElem.style.height !== 'auto') {
                            if (getTextWidth(editorElem.textContent, cell.style, this.parent.cellStyle) > parseInt(editorElem.style.maxWidth, 10)) {
                                editorElem.style.height = 'auto';
                            }
                        }
                        if (getTextWidth(editorElem.textContent, cell.style, this.parent.cellStyle) > parseInt(editorElem.style.maxWidth, 10) - 5) { // 5 decreased for padding.
                            editorElem.style.height = 'auto';
                        }
                        if (actCell[0] < this.parent.frozenRowCount(sheet) && editorElem && !editorElem.style.overflow && getTextWidth(editorElem.textContent, cell.style, this.parent.cellStyle) > parseInt(editorElem.style.maxWidth, 10)) {
                            editorElem.style.overflow = 'auto';
                        }
                        if (!e.shiftKey || (e.shiftKey && !isNavigationKey(e.keyCode))) {
                            this.refreshEditor(editorElem.textContent, this.isCellEdit, false, false, false);
                        }
                    }
                    if (!e.altKey) {
                        switch (keyCode) {
                            case this.keyCodes.ENTER:
                                if (Browser.isWindows) {
                                    e.preventDefault();
                                }
                                if (!isFormulaEdit) {
                                    this.endEdit(false, e);
                                }
                                else {
                                    var formulaRefIndicator = this.parent.element.querySelector('.e-formularef-indicator');
                                    if (formulaRefIndicator) {
                                        formulaRefIndicator.parentElement.removeChild(formulaRefIndicator);
                                    }
                                    if (getSheet(this.parent, this.editCellData.sheetIndex).id === sheet.id) {
                                        this.endEdit(false, e);
                                    }
                                    else {
                                        this.parent.goTo(this.editCellData.fullAddr);
                                        this.endEdit(false, e);
                                    }
                                }
                                break;
                            case this.keyCodes.TAB:
                                if (!this.hasFormulaSuggSelected()) {
                                    this.endEdit(false, e);
                                }
                                break;
                            case this.keyCodes.ESC:
                                if (isKeyboardShortcut) {
                                    this.cancelEdit(true, true, e);
                                }
                                break;
                        }
                    }
                }
                else if (trgtElem.classList.contains('e-spreadsheet') || closest(trgtElem, '.e-sheet-panel')) {
                    if (keyCode === 13 && trgtElem.contentEditable === 'true') {
                        e.preventDefault();
                    }
                    var key = String.fromCharCode(keyCode);
                    var isAlphabet = (keyCode >= this.keyCodes.FIRSTALPHABET && keyCode <= this.keyCodes.LASTALPHABET) ||
                        (key.toLowerCase() !== key.toUpperCase() && !(keyCode >= 112 && keyCode <= 123));
                    var isNumeric = (keyCode >= this.keyCodes.FIRSTNUMBER && keyCode <= this.keyCodes.LASTNUMBER);
                    var isNumpadKeys = (keyCode >= this.keyCodes.FIRSTNUMPAD && keyCode <= this.keyCodes.LASTNUMPAD);
                    var isSymbolkeys = (keyCode >= this.keyCodes.SYMBOLSETONESTART &&
                        keyCode <= this.keyCodes.SYMBOLSETONEEND);
                    if (!isSymbolkeys) {
                        isSymbolkeys = (keyCode >= this.keyCodes.SYMBOLSETTWOSTART && keyCode <= this.keyCodes.SYMBOLSETTWOEND);
                    }
                    var isFirefoxExceptionkeys = (keyCode === this.keyCodes.FIREFOXEQUALPLUS) ||
                        (keyCode === this.keyCodes.FIREFOXMINUS);
                    var isF2Edit = (!e.shiftKey && !e.ctrlKey && !e.metaKey && keyCode === this.keyCodes.F2) &&
                        isKeyboardShortcut;
                    var isBackSpace = keyCode === this.keyCodes.BACKSPACE && isKeyboardShortcut;
                    var isMacDelete = /(Macintosh|MacIntel|MacPPC|Mac68K|Mac|Mac OS|iPod|iPad)/i.test(navigator.userAgent) && isBackSpace;
                    var readonlyDialog = this.parent.element.querySelector('.e-readonly-alert-dlg');
                    var overlayElements = this.parent.element.getElementsByClassName('e-ss-overlay-active');
                    if ((!e.ctrlKey && !e.metaKey && !e.altKey && ((!e.shiftKey && keyCode === this.keyCodes.SPACE) || isAlphabet || isNumeric ||
                        isNumpadKeys || isSymbolkeys || (Browser.info.name === 'mozilla' && isFirefoxExceptionkeys))) || isF2Edit || isBackSpace) {
                        if (isF2Edit) {
                            this.isNewValueEdit = false;
                        }
                        if (!readonlyDialog) {
                            if (isReadOnlyCells(this.parent) && overlayElements.length === 0) {
                                this.parent.notify(readonlyAlert, null);
                            }
                            else if (overlayElements.length) {
                                if (isBackSpace && !isMacDelete) {
                                    this.editingHandler('delete');
                                }
                            }
                            else {
                                this.startEdit(null, null, true, true);
                                focus(this.getEditElement(sheet));
                            }
                        }
                    }
                    if ((keyCode === this.keyCodes.DELETE || isMacDelete) && isKeyboardShortcut) {
                        var islockcell = sheet.isProtected && isLockedCells(this.parent);
                        if (!readonlyDialog) {
                            if (islockcell) {
                                this.parent.notify(editAlert, null);
                            }
                            else if (isReadOnlyCells(this.parent) && overlayElements.length === 0) {
                                this.parent.notify(readonlyAlert, null);
                            }
                            else {
                                this.editingHandler('delete');
                                this.parent.notify(activeCellChanged, null);
                            }
                        }
                    }
                }
            }
            else if (((keyCode >= this.keyCodes.FIRSTALPHABET && keyCode <= this.keyCodes.LASTALPHABET) ||
                (keyCode >= this.keyCodes.FIRSTNUMBER && keyCode <= this.keyCodes.LASTNUMBER)
                || (keyCode === this.keyCodes.DELETE) || (keyCode === this.keyCodes.BACKSPACE) || (keyCode === this.keyCodes.SPACE)
                || (keyCode >= this.keyCodes.FIRSTNUMPAD && keyCode <= this.keyCodes.LASTNUMPAD) ||
                (keyCode >= this.keyCodes.SYMBOLSETONESTART && keyCode <= this.keyCodes.SYMBOLSETONEEND)
                || (keyCode >= 219 && keyCode <= 222) || (!e.shiftKey && !e.ctrlKey && !e.metaKey && keyCode === this.keyCodes.F2))
                && (keyCode !== 67) && (keyCode !== 89) && (keyCode !== 90)) {
                if (sheet.protectSettings.insertLink && keyCode === 75) {
                    return;
                }
                if (e.altKey && (keyCode === 65 || keyCode === 70 || keyCode === 72 || keyCode === 77
                    || keyCode === 78 || keyCode === 87)) {
                    return;
                }
                if (!e.ctrlKey && e.keyCode !== 70 && !this.parent.element.querySelector('.e-editAlert-dlg') &&
                    !trgtElem.parentElement.classList.contains('e-unprotectpwd-content') &&
                    !trgtElem.parentElement.classList.contains('e-password-content') &&
                    !trgtElem.parentElement.classList.contains('e-sheet-password-content') &&
                    !trgtElem.parentElement.classList.contains('e-unprotectsheetpwd-content') &&
                    !trgtElem.parentElement.classList.contains('e-reenterpwd-content')) {
                    this.parent.notify(editAlert, null);
                }
            }
        }
    };
    Edit.prototype.renderEditor = function () {
        if (!this.editorElem || !select('#' + this.parent.element.id + '_edit', this.parent.element)) {
            var editor = this.parent.createElement('div', { id: this.parent.element.id + '_edit', className: 'e-spreadsheet-edit', attrs: { 'contentEditable': 'true',
                    'role': 'textbox', 'spellcheck': 'false', 'aria-multiline': 'true' } });
            if (this.parent.element.getElementsByClassName('e-spreadsheet-edit')[0]) {
                this.parent.element.getElementsByClassName('e-spreadsheet-edit')[0].remove();
            }
            var sheetContentElem = this.parent.element.querySelector('.e-sheet-content');
            if (!sheetContentElem) {
                return;
            }
            sheetContentElem.appendChild(editor);
            this.editorElem = editor;
        }
        this.parent.notify(formulaOperation, { action: 'renderAutoComplete' });
    };
    Edit.prototype.refreshEditor = function (value, refreshFormulaBar, refreshEditorElem, isAppend, trigEvent, prevCellValue) {
        if (trigEvent === void 0) { trigEvent = true; }
        if (isAppend) {
            value = this.editCellData.value = this.editCellData.value + value;
        }
        else {
            this.editCellData.value = prevCellValue ? prevCellValue : value;
        }
        var editorElem = this.getEditElement(this.parent.getActiveSheet());
        if (refreshEditorElem && editorElem) {
            editorElem.textContent = value;
        }
        if (refreshFormulaBar) {
            this.parent.notify(formulaBarOperation, { action: 'refreshFormulabar', value: value });
        }
        if (this.parent.isEdit && editorElem && trigEvent && this.editCellData.value === editorElem.textContent) {
            if (this.triggerEvent('cellEditing').cancel) {
                this.cancelEdit(false, false, null, true);
            }
        }
        // if (this.editorElem.scrollHeight + 2 <= this.editCellData.element.offsetHeight) {
        //     this.editorElem.style.height = (this.editCellData.element.offsetHeight + 1) + 'px';
        // } else {
        //     this.editorElem.style.removeProperty('height');
        // }
    };
    Edit.prototype.startEdit = function (address, value, refreshCurPos, preventFormulaReference) {
        if (refreshCurPos === void 0) { refreshCurPos = true; }
        if (this.parent.showSheetTabs) {
            this.parent.element.querySelector('.e-add-sheet-tab').setAttribute('disabled', 'true');
        }
        var sheet = this.parent.getActiveSheet();
        var range = getCellIndexes(sheet.activeCell);
        var cell = getCell(range[0], range[1], sheet, false, true);
        if (this.parent.calculationMode === 'Manual' && checkIsFormula(cell.formula)) {
            this.editCellData.prevFormulaValue = cell.value;
        }
        if (hasTemplate(this.parent, range[0], range[1], this.parent.activeSheetIndex)) {
            var cellEle = this.parent.getCell(range[0], range[1]);
            var isDelTemplate = false;
            var value_1 = cellEle.innerHTML;
            if (cellEle) {
                if (value_1.indexOf('<') > -1 && value_1.indexOf('>') > -1 && value_1.indexOf('input') > -1) {
                    isDelTemplate = true;
                }
            }
            if (isDelTemplate) {
                return;
            }
        }
        var isMergedHiddenCell = this.updateEditCellDetail(address, value);
        this.initiateEditor(refreshCurPos, isMergedHiddenCell);
        this.positionEditor();
        this.parent.isEdit = this.isEdit = true;
        this.parent.notify(clearCopy, null);
        this.parent.notify(enableToolbarItems, [{ enable: false }]);
        if (cell.formula && !preventFormulaReference) {
            this.parent.notify(initiateFormulaReference, { range: cell.formula, formulaSheetIdx: this.editCellData.sheetIndex });
        }
    };
    Edit.prototype.setCursorPosition = function () {
        var elem = this.getEditElement(this.parent.getActiveSheet());
        var textLen = elem.textContent.length;
        if (textLen) {
            var selection = document.getSelection();
            var range = document.createRange();
            range.setStart(elem.firstChild, textLen);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        elem.focus();
    };
    Edit.prototype.hasFormulaSuggSelected = function () {
        var suggDdlElem = document.getElementById(this.parent.element.id + '_ac_popup');
        return suggDdlElem && suggDdlElem.style.visibility === 'visible' &&
            suggDdlElem.querySelectorAll('.e-item-focus').length > 0;
    };
    Edit.prototype.editingHandler = function (action) {
        var pictureElements = document.getElementsByClassName('e-ss-overlay-active');
        var pictureLen = pictureElements.length;
        var isSpill;
        switch (action) {
            case 'delete':
                if (pictureLen > 0) {
                    if (pictureElements[0].classList.contains('e-datavisualization-chart')) {
                        this.parent.notify(deleteChart, {
                            id: pictureElements[0].id, sheetIdx: this.parent.activeSheetIndex + 1
                        });
                    }
                    else {
                        this.parent.notify(deleteImage, {
                            id: pictureElements[0].id, sheetIdx: this.parent.activeSheetIndex + 1
                        });
                    }
                }
                else {
                    var sheet = this.parent.getActiveSheet();
                    var address = sheet.selectedRange;
                    var range = getIndexesFromAddress(address);
                    range = range[0] > range[2] || range[1] > range[3] ? getSwapRange(range) : range;
                    address = getRangeAddress(range);
                    var cellDeleteArgs = { address: sheet.name + '!' + address, cancel: false };
                    this.parent.notify(beginAction, { action: 'cellDelete', eventArgs: cellDeleteArgs });
                    if (cellDeleteArgs.cancel) {
                        return;
                    }
                    address = getRangeFromAddress(cellDeleteArgs.address);
                    range = getRangeIndexes(address);
                    clearRange(this.parent, range, this.parent.activeSheetIndex);
                    this.parent.notify(selectionComplete, {});
                    if (range[0] === 0 && range[1] === 0 && range[2] >= sheet.usedRange.rowIndex && range[3] >= sheet.usedRange.colIndex) {
                        this.parent.setUsedRange(0, 0, sheet, false, true);
                    }
                    var args = { cellIdx: range, isUnique: false };
                    this.checkUniqueRange(args);
                    if (args.isUnique) {
                        var indexes = getRangeIndexes(this.uniqueColl);
                        var cell = getCell(indexes[0], indexes[1], this.parent.getActiveSheet());
                        if (cell && cell.value) {
                            isSpill = cell.value.toString().indexOf('#SPILL!') > -1;
                        }
                    }
                    if (args.isUnique && this.uniqueColl.split(':')[0] === address.split(':')[0]) {
                        var index = getRangeIndexes(this.uniqueColl);
                        for (var i = index[0]; i <= index[2]; i++) {
                            for (var j = index[1]; j <= index[3]; j++) {
                                this.parent.updateCellInfo({ value: '', formula: '' }, getRangeAddress([i, j]), true);
                            }
                        }
                        this.parent.notify(removeUniquecol, null);
                        this.uniqueColl = '';
                    }
                    else if (args.isUnique) {
                        var uniqueRange = getRangeIndexes(this.uniqueColl);
                        if (getCell(uniqueRange[0], uniqueRange[1], sheet).value === '#SPILL!') {
                            var skip = false;
                            for (var j = uniqueRange[0]; j <= uniqueRange[2]; j++) {
                                for (var k = uniqueRange[1]; k <= uniqueRange[3]; k++) {
                                    var cell = getCell(j, k, sheet);
                                    if (j === uniqueRange[0] && k === uniqueRange[1]) {
                                        skip = false;
                                    }
                                    else if (cell && !isNullOrUndefined(cell.value) && cell.value !== '') {
                                        skip = true;
                                    }
                                }
                            }
                            if (!skip) {
                                this.reApplyFormula();
                            }
                        }
                    }
                    if (args.isUnique) {
                        this.parent.notify(completeAction, { action: 'cellDelete',
                            eventArgs: { address: sheet.name + '!' + address, isSpill: isSpill } });
                    }
                    else {
                        this.parent.notify(completeAction, { action: 'cellDelete', eventArgs: { address: sheet.name + '!' + address } });
                    }
                }
                break;
        }
    };
    Edit.prototype.getCurPosition = function () {
        var cursorOffset = {};
        var selection = window.getSelection();
        if (selection && selection.focusNode && selection.focusNode.classList &&
            selection.focusNode.classList.contains('e-formula-bar-panel')) {
            var formulaBar = selection.focusNode.getElementsByClassName('e-formula-bar e-css')[0];
            if (formulaBar.value === this.editCellData.value) {
                cursorOffset.start = formulaBar.selectionStart;
                cursorOffset.end = formulaBar.selectionEnd;
            }
        }
        else if (this.getEditElement(this.parent.getActiveSheet()).textContent === this.editCellData.value) {
            cursorOffset.start = selection.anchorOffset;
            cursorOffset.end = selection.focusOffset;
            if (cursorOffset.start > cursorOffset.end) {
                var x = cursorOffset.start;
                cursorOffset.start = cursorOffset.end;
                cursorOffset.end = x;
            }
        }
        return cursorOffset;
    };
    Edit.prototype.mouseDownHandler = function (e) {
        if (!closest(e.target, '.e-findtool-dlg') && !closest(e.target, '.e-validation-error-dlg')) {
            if (this.isEdit) {
                var curOffset = this.getCurPosition();
                var selectionStart = void 0;
                var selectionEnd = void 0;
                if (curOffset.start) {
                    this.curStartPos = selectionStart = curOffset.start;
                }
                if (curOffset.end) {
                    this.curEndPos = selectionEnd = curOffset.end;
                }
                var trgtElem = e.target;
                var sheet = this.parent.getActiveSheet();
                var formulaRefIndicator = this.parent.element.querySelector('.e-formularef-indicator');
                this.isCellEdit = trgtElem.classList.contains('e-spreadsheet-edit');
                var isFormula = checkIsFormula(this.editCellData.value, true);
                var editorElem = this.getEditElement(sheet);
                var validCharacters = ['+', '-', '*', '/', this.parent.listSeparator, '(', '=', '&', ':'];
                if (trgtElem.classList.contains('e-cell') || trgtElem.classList.contains('e-header-cell') ||
                    trgtElem.classList.contains('e-selectall') || closest(trgtElem, '.e-toolbar-item.e-active') || closest(trgtElem, '.e-table')) {
                    if (!isFormula || this.endFormulaRef) {
                        this.endFormulaRef = false;
                        this.endEdit(false, e);
                    }
                    else {
                        var actCellIdx = getCellIndexes(sheet.activeCell);
                        var cell = getCell(actCellIdx[0], actCellIdx[1], sheet);
                        var editorValue = document.activeElement.classList.contains('e-formula-bar') ?
                            document.activeElement.value : editorElem.textContent;
                        if (this.editCellData.value === editorValue) {
                            if (selectionStart === selectionEnd) {
                                if (this.editCellData.sheetIndex !== getSheetIndex(this.parent, sheet.name)) {
                                    if (validCharacters.indexOf(editorValue.substring(selectionStart - 1, selectionStart)) === -1) {
                                        if (formulaRefIndicator) {
                                            formulaRefIndicator.parentElement.removeChild(formulaRefIndicator);
                                        }
                                        this.parent.goTo(this.editCellData.fullAddr);
                                        this.endEdit(false, e);
                                        return;
                                    }
                                }
                                else if (validCharacters.indexOf(editorElem.textContent.substring(selectionStart - 1, selectionStart)) === -1) {
                                    if (formulaRefIndicator) {
                                        formulaRefIndicator.parentElement.removeChild(formulaRefIndicator);
                                    }
                                    this.endEdit(false, e);
                                    return;
                                }
                            }
                            else if (validCharacters.indexOf(editorValue.substring(selectionStart - 1, selectionStart)) !== -1 &&
                                isCellReference(editorValue.substring(selectionStart, selectionEnd)) &&
                                editorValue.indexOf(':') !== selectionEnd) {
                                this.editCellData.value = editorValue.substring(0, selectionStart) +
                                    editorValue.substring(selectionEnd, editorValue.length);
                            }
                        }
                        if (!cell) {
                            return;
                        }
                        isFormula = cell.formula && (checkIsFormula(cell.formula) || (this.editCellData.value &&
                            this.editCellData.value.toString().indexOf('=') === 0));
                        if (isFormula && this.parent.isEdit) {
                            var curPos = selectionEnd;
                            if (this.editCellData.value.length === curPos) {
                                if (this.editCellData.value.substring(this.editCellData.value.length - 1) === ')' ||
                                    isNumber(this.editCellData.value.substring(this.editCellData.value.length - 1))) {
                                    if (formulaRefIndicator) {
                                        formulaRefIndicator.parentElement.removeChild(formulaRefIndicator);
                                    }
                                    this.endEdit(false, e);
                                }
                            }
                            else if (this.editCellData.value === editorValue &&
                                validCharacters.indexOf(editorValue.substring(curPos - 1, curPos)) === -1) {
                                if (formulaRefIndicator) {
                                    formulaRefIndicator.parentElement.removeChild(formulaRefIndicator);
                                }
                                this.endEdit(false, e);
                            }
                        }
                    }
                }
                else {
                    if (isFormula && this.editCellData.value === editorElem.textContent && editorElem.textContent.indexOf('(') !==
                        editorElem.textContent.length - 1 && !this.isCellEdit && !trgtElem.classList.contains('e-formula-bar') &&
                        validCharacters.indexOf(this.editCellData.value.substring(selectionStart - 1, selectionStart)) === -1) {
                        if (getSheet(this.parent, this.editCellData.sheetIndex).id === sheet.id) {
                            var curPos = window.getSelection().focusOffset;
                            if (validCharacters.indexOf(editorElem.textContent.substring(curPos - 1, curPos)) === -1) {
                                if (formulaRefIndicator) {
                                    formulaRefIndicator.parentElement.removeChild(formulaRefIndicator);
                                }
                                this.parent.goTo(this.editCellData.fullAddr);
                                if (this.isEdit) {
                                    this.endEdit(false, e);
                                }
                                return;
                            }
                        }
                    }
                }
            }
        }
    };
    Edit.prototype.tapHandler = function (e) {
        var _this = this;
        if (!this.tapedTwice) {
            this.tapedTwice = true;
            setTimeout(function () {
                _this.tapedTwice = false;
                if (!_this.parent.isEdit && e.target.classList.contains('e-cell')) {
                    var focusEditEle = _this.parent.element.querySelector('.e-ss-focus-edit');
                    if (focusEditEle) {
                        focus(focusEditEle);
                    }
                }
            }, 300);
            return;
        }
        e.preventDefault();
        this.dblClickHandler(e);
    };
    Edit.prototype.dblClickHandler = function (e) {
        var trgt = e.target;
        if (!closest(trgt, '.e-datavisualization-chart') && !trgt.classList.contains('e-ss-overlay') &&
            (trgt.classList.contains('e-active-cell') || trgt.classList.contains('e-cell') || trgt.classList.contains('e-wrap-content') ||
                closest(trgt, '.e-sheet-content') || trgt.classList.contains('e-table'))) {
            var sheet = this.parent.getActiveSheet();
            var actCell = getCellIndexes(sheet.activeCell);
            var cell = getCell(actCell[0], actCell[1], sheet, false, true);
            if (isReadOnly(cell, getColumn(sheet, actCell[1]), getRow(sheet, actCell[0]))) {
                this.parent.notify(readonlyAlert, null);
            }
            else if (!sheet.isProtected || !isLocked(cell, getColumn(sheet, actCell[1]))) {
                if (this.isEdit) {
                    if (!trgt.classList.contains('e-spreadsheet-edit')) {
                        if (checkIsFormula(this.editCellData.value)) {
                            var sheetName = this.editCellData.fullAddr.substring(0, this.editCellData.fullAddr.lastIndexOf('!'));
                            if (this.parent.getActiveSheet().name === sheetName) {
                                this.endEdit();
                            }
                        }
                        else {
                            this.endEdit();
                        }
                    }
                }
                else {
                    this.isNewValueEdit = false;
                    this.startEdit();
                    focus(this.getEditElement(sheet));
                }
            }
            else {
                this.parent.notify(editAlert, null);
            }
        }
    };
    Edit.prototype.updateEditCellDetail = function (addr, value) {
        var sheetIdx;
        var sheet;
        var isMergedHiddenCell;
        if (isNullOrUndefined(this.editCellData.sheetIndex)) {
            if (addr && addr.lastIndexOf('!') > -1) {
                sheetIdx = getSheetIndex(this.parent, getSheetNameFromAddress(addr));
            }
            else {
                sheetIdx = this.parent.activeSheetIndex;
            }
        }
        else {
            sheetIdx = this.editCellData.sheetIndex;
        }
        if (!this.editCellData.addr) {
            sheet = getSheet(this.parent, sheetIdx);
            if (addr) {
                addr = getRangeFromAddress(addr);
            }
            else {
                addr = sheet.activeCell;
            }
        }
        else if (checkIsFormula(this.editCellData.value, true)) {
            sheet = getSheet(this.parent, sheetIdx);
            this.isNewValueEdit = false;
        }
        if (addr) {
            var range = getRangeIndexes(addr);
            var rowIdx = range[0];
            var colIdx = range[1];
            var model = getCell(rowIdx, colIdx, sheet, false, true);
            if (model.colSpan > 1 || model.rowSpan > 1) {
                var mergeArgs = { sheet: sheet, cell: model, rowIdx: rowIdx, colIdx: colIdx };
                setVisibleMergeIndex(mergeArgs);
                rowIdx = mergeArgs.rowIdx;
                colIdx = mergeArgs.colIdx;
                isMergedHiddenCell = mergeArgs.isMergedHiddenCell;
            }
            var cellElem = this.parent.getCell(rowIdx, colIdx);
            var cellPosition = getCellPosition(sheet, range, this.parent.frozenRowCount(sheet), this.parent.frozenColCount(sheet), this.parent.viewport.beforeFreezeHeight, this.parent.viewport.beforeFreezeWidth, this.parent.sheetModule.colGroupWidth);
            this.editCellData = {
                addr: addr,
                fullAddr: getSheetName(this.parent, sheetIdx) + '!' + addr,
                rowIndex: rowIdx,
                colIndex: colIdx,
                sheetIndex: sheetIdx,
                element: cellElem,
                value: value || '',
                position: cellPosition,
                prevFormulaValue: this.editCellData.prevFormulaValue
            };
        }
        return isMergedHiddenCell;
    };
    Edit.prototype.initiateEditor = function (refreshCurPos, isMergedHiddenCell) {
        var _this = this;
        getData(this.parent, this.editCellData.fullAddr, false, isMergedHiddenCell).then(function (values) {
            if (!_this.parent) {
                return;
            }
            values.forEach(function (cell) {
                var value;
                var updateEditValue = function () {
                    var args = { cell: cell, value: cell ? cell.value : '',
                        showFormattedText: _this.editCellData.showFormattedText };
                    _this.parent.notify(getFormattedBarText, args);
                    value = cell ? (cell.formula || args.value) : '';
                    _this.editCellData.oldValue = value;
                };
                updateEditValue();
                var evtArgs = _this.triggerEvent('cellEdit', null, value);
                if (evtArgs.cancel) {
                    _this.cancelEdit(true, false, null, true);
                    return;
                }
                if (evtArgs.showFormattedText) {
                    // For SF-354174 ticket we have provided 'dd/MM/yyyy' support and diplayed the formatted value in the editor which is
                    // not a default behavior. To handle this, we have added this property and it applies only for the 'dd/MM/yyyy' format.
                    _this.editCellData.showFormattedText = true;
                    updateEditValue();
                }
                if (_this.editCellData.value) {
                    value = _this.editCellData.value;
                }
                else {
                    _this.editCellData.value = value;
                }
                var prevCellValue;
                if (_this.isNewValueEdit) {
                    prevCellValue = value;
                    value = '';
                }
                else {
                    _this.isNewValueEdit = true;
                }
                if (isUndefined(value)) {
                    value = '';
                }
                _this.refreshEditor(value, false, true, false, false, prevCellValue);
                if (refreshCurPos) {
                    _this.setCursorPosition();
                }
            });
        });
    };
    Edit.prototype.positionEditor = function (isWrap) {
        var tdElem = this.editCellData.element;
        var isEdit = false;
        var cellEle;
        var arg = { isEdit: isEdit };
        this.parent.notify(isFormulaBarEdit, arg);
        if (arg.isEdit && isNullOrUndefined(tdElem)) {
            cellEle = this.parent.getCell(this.editCellData.rowIndex, this.editCellData.colIndex);
            tdElem = cellEle;
            this.editCellData.element = cellEle;
        }
        if (tdElem) {
            tdElem.classList.add('e-ss-edited');
            var sheet = this.parent.getActiveSheet();
            var cell = getCell(this.editCellData.rowIndex, this.editCellData.colIndex, sheet, false, true);
            var left = this.editCellData.position.left + 1;
            var top_1 = this.editCellData.position.top + 1;
            var args = { range: [this.editCellData.rowIndex, this.editCellData.colIndex, this.editCellData.rowIndex,
                    this.editCellData.colIndex] };
            this.parent.notify(activeCellMergedRange, args);
            var minHeight = getRowsHeight(sheet, args.range[0], args.range[2]) - 3;
            var minWidth = getColumnsWidth(sheet, args.range[1], args.range[3]) - 3;
            var cont = this.parent.getMainContent();
            var mainContElement = cont.parentElement;
            var editWidth = void 0;
            var frozenCol = this.parent.frozenColCount(sheet);
            var zIndex = void 0;
            var preventWrap = void 0;
            var frozenRow = this.parent.frozenRowCount(sheet);
            var addWrap = void 0;
            if (this.editCellData.colIndex < frozenCol) {
                editWidth = Math.abs(this.parent.getRowHeaderContent().getBoundingClientRect()[this.parent.enableRtl ? 'left' : 'right'] -
                    tdElem.getBoundingClientRect()[this.parent.enableRtl ? 'right' : 'left']) - 1;
                if (this.editCellData.rowIndex < frozenRow) {
                    if (this.parent.getRowHeaderContent().style.zIndex === '2') {
                        zIndex = '3';
                    }
                }
                else {
                    if (getTextWidth(cell.value, cell.style, this.parent.cellStyle) > editWidth) {
                        addWrap = true;
                    }
                }
            }
            else {
                editWidth = (mainContElement.offsetWidth - (left - cont.scrollLeft) - 28) -
                    this.parent.sheetModule.getRowHeaderWidth(sheet);
                var tdEleInf = tdElem.getBoundingClientRect();
                var mainContEleInf = mainContElement.getBoundingClientRect();
                var getCellRight = this.parent.enableRtl ? tdEleInf.left : tdEleInf.right;
                var getMainConEleRight = this.parent.enableRtl ? mainContEleInf.left : mainContEleInf.right;
                var horizontalScrollBar = this.parent.getScrollElement();
                var verticalScrollBarWidth = this.parent.sheetModule.getScrollSize();
                if (this.parent.enableRtl) {
                    if ((getMainConEleRight + verticalScrollBarWidth) > getCellRight) {
                        horizontalScrollBar.scrollLeft -= tdEleInf.width;
                    }
                }
                else {
                    if ((getMainConEleRight - verticalScrollBarWidth) < getCellRight) {
                        horizontalScrollBar.scrollLeft += tdEleInf.width;
                    }
                }
            }
            if (this.editCellData.rowIndex < frozenRow) {
                preventWrap = true;
            }
            var height = !preventWrap && ((cell && cell.wrap) || (tdElem && isWrap) || addWrap) ? 'auto;' : minHeight + 'px;';
            // let editHeight: number = mainContElement.offsetHeight - top - 28;
            var inlineStyles_1 = 'display:block;top:' + top_1 + 'px;' + (this.parent.enableRtl ? 'right:' : 'left:') + left + 'px;' +
                'min-width:' + minWidth + 'px;max-width:' + (cell && cell.wrap ? minWidth : editWidth) + 'px;' +
                'height:' + height + (cell && cell.wrap ? ('width:' + minWidth + 'px;') : '') + 'min-height:' + minHeight + 'px;' +
                (zIndex ? 'z-index: ' + zIndex + ';' : '') + (preventWrap && ((cell && !cell.wrap) || (tdElem && isWrap)) && (getTextWidth(cell.value, cell.style, this.parent.cellStyle) > editWidth || (tdElem && isWrap)) ? 'overflow: auto;' : '');
            var styles = tdElem.style.cssText.split(';');
            styles.forEach(function (style) {
                if (!style.includes('border')) {
                    inlineStyles_1 += style + ';';
                }
            });
            var editorElem = this.getEditElement(sheet, true);
            editorElem.style.cssText = inlineStyles_1;
            if (getTextWidth(editorElem.textContent, cell.style, this.parent.cellStyle) > editWidth) {
                editorElem.style.height = 'auto';
            }
            // we using edit div height as auto , while editing div enlarges and hide active cell bottom border for that
            // we increasing 1px height to active cell.
            var actCell = this.parent.element.querySelector('.e-active-cell');
            if (actCell) {
                actCell.style.height = (minHeight + 4) + 'px';
            }
            if (tdElem.classList.contains('e-right-align')) {
                editorElem.classList.add('e-right-align');
            }
            else if (tdElem.classList.contains('e-center-align')) {
                editorElem.classList.add('e-center-align');
            }
        }
    };
    Edit.prototype.updateEditedValue = function (tdRefresh, value, e, isPublic) {
        var _this = this;
        var oldCellValue = this.editCellData.oldValue;
        if (value) {
            this.editCellData.value = value;
        }
        var newVal = this.editCellData.value;
        /* To set the before cell details for undo redo. */
        this.parent.notify(setActionData, { args: { action: 'beforeCellSave', eventArgs: { address: this.editCellData.addr } } });
        var isValidCellValue = true;
        if (this.parent.allowDataValidation) {
            var sheet = this.parent.getActiveSheet();
            var cellIndex = getRangeIndexes(sheet.activeCell);
            var cell = getCell(cellIndex[0], cellIndex[1], sheet, false, true);
            var column = getColumn(sheet, cellIndex[1]);
            if (cell.validation || checkColumnValidation(column, cellIndex[0], cellIndex[1])) {
                var editedValue = this.editCellData.value || this.getEditElement(sheet).innerText;
                var sheetIdx = this.parent.activeSheetIndex;
                var range = typeof this.editCellData.addr === 'string' ? getRangeIndexes(this.editCellData.addr) :
                    this.editCellData.addr;
                var validEventArgs = { value: editedValue, range: range, sheetIdx: sheetIdx, isEdit: true, td: null, isValid: true };
                var currEditedCell = Object.assign({}, cell, { value: editedValue }); // Update edited value for validation purpose.
                setCell(cellIndex[0], cellIndex[1], sheet, currEditedCell);
                this.parent.notify(isValidation, validEventArgs);
                setCell(cellIndex[0], cellIndex[1], sheet, cell);
                isValidCellValue = validEventArgs.isValid;
                if (isValidCellValue) {
                    if (checkIsFormula(editedValue) || !cell.format) {
                        if (!this.editCellData.value) {
                            this.editCellData.value = editedValue;
                        }
                    }
                    else if (editedValue !== validEventArgs.value || (!this.editCellData.value && validEventArgs.value)) {
                        this.editCellData.value = validEventArgs.value;
                    }
                }
                else {
                    this.isCellEdit = true;
                }
            }
        }
        if (!isPublic && checkIsFormula(this.editCellData.value)) {
            var eventArgs_1 = { formula: this.editCellData.value };
            this.parent.notify(checkFormulaRef, eventArgs_1);
            if (eventArgs_1.isInvalid) {
                var isYesBtnClick_1;
                this.isCellEdit = true;
                isValidCellValue = false;
                var l10n = this.parent.serviceLocator.getService(locale);
                var erroDialogInst_1 = this.parent.serviceLocator.getService(dialog);
                erroDialogInst_1.show({
                    width: 400, isModal: true, showCloseIcon: true, target: this.parent.element, cssClass: 'e-validation-error-dlg',
                    content: l10n.getConstant('CellReferenceTypoError') + "<br>" + eventArgs_1.formula,
                    beforeOpen: function () { return _this.editCellData.element.focus(); },
                    buttons: [{
                            buttonModel: { content: l10n.getConstant('Yes'), isPrimary: true },
                            click: function () {
                                isYesBtnClick_1 = true;
                                erroDialogInst_1.hide();
                            }
                        },
                        {
                            buttonModel: { content: l10n.getConstant('No') },
                            click: function () { return erroDialogInst_1.hide(); }
                        }],
                    close: function () {
                        if (isYesBtnClick_1) {
                            value = _this.editCellData.value = eventArgs_1.formula;
                            _this.updateCell(oldCellValue, tdRefresh, value, newVal, e);
                            _this.parent.notify(formulaBarOperation, { action: 'refreshFormulabar', value: eventArgs_1.formula });
                        }
                        else {
                            var editorElem = _this.getEditElement(_this.parent.getActiveSheet());
                            if (editorElem.innerText) {
                                window.getSelection().selectAllChildren(editorElem);
                            }
                        }
                    }
                }, false);
            }
        }
        if (isValidCellValue) {
            this.updateCell(oldCellValue, tdRefresh, value, newVal, e);
        }
        else if (e) {
            e.preventDefault();
        }
    };
    Edit.prototype.updateCell = function (oldCellValue, tdRefresh, value, newVal, e) {
        var oldValue = oldCellValue ? oldCellValue.toString().toUpperCase() : '';
        var sheet = this.parent.getActiveSheet();
        if (oldCellValue || oldCellValue === 0) {
            oldCellValue = oldCellValue.toString();
        }
        var curCellValue = this.editCellData.value;
        if (curCellValue) {
            curCellValue = curCellValue.toString();
        }
        var isCellValChanged = oldCellValue !== curCellValue || checkIsFormula(oldValue);
        if (isCellValChanged) {
            if (this.isAltEnter && curCellValue && curCellValue.includes('\n')) {
                wrapText(sheet.activeCell, true, this.parent, true);
                this.refreshEditor(curCellValue, this.isCellEdit, false, false, false);
            }
            var cellIndex = getRangeIndexes(sheet.activeCell);
            if (oldCellValue && oldCellValue.indexOf('=UNIQUE(') > -1 && this.editCellData.value === '') {
                this.parent.notify(removeUniquecol, null);
            }
            var args = { cellIdx: cellIndex, isUnique: false };
            this.checkUniqueRange(args);
            var isUniqueRange = args.isUnique;
            if (isUniqueRange && oldCellValue !== '' && this.editCellData.value === '') {
                var rangeIdx = getRangeIndexes(this.uniqueColl);
                if (getCell(rangeIdx[0], rangeIdx[1], sheet).value.toString().indexOf('#SPILL!') === -1) {
                    return;
                }
            }
            if (oldCellValue && oldCellValue.indexOf('UNIQUE') > -1 &&
                this.editCellData.value && this.editCellData.value.toString().indexOf('UNIQUE') > -1 && isUniqueRange) {
                this.updateUniqueRange('');
            }
            var evtArgs = {
                action: 'updateCellValue',
                address: this.editCellData.addr, value: this.editCellData.value, skipCellFormat: this.editCellData.showFormattedText
            };
            this.parent.notify(workbookEditOperation, evtArgs);
            var updatedCell = getCell(cellIndex[0], cellIndex[1], sheet, true);
            var cellValue = void 0;
            if (!isNullOrUndefined(updatedCell)) {
                cellValue = updatedCell.value.toString();
            }
            var isCircularRefError = cellValue === '#CIRCULARREF!';
            var isInvalidFormula = this.formulaErrorStrings.indexOf(cellValue) > -1;
            if (isInvalidFormula || isCircularRefError) {
                var isDlgOpenCancel = void 0;
                if (e) {
                    var target_1 = e.target;
                    var ribbonCls = ['e-toolbar-item', 'e-tab-wrap', 'e-text-wrap', 'e-tab-text', 'e-caret'];
                    var skipAlertCls = ['e-scroller', 'e-main-panel', 'e-autofill'];
                    if ((!ribbonCls.some(function (cls) { return target_1.classList.contains(cls); }) || !closest(target_1, '.e-ribbon')) &&
                        !skipAlertCls.some(function (cls) { return target_1.classList.contains(cls); })) {
                        isDlgOpenCancel = this.showFormulaAlertDlg(cellValue, isCircularRefError);
                    }
                    if (!isDlgOpenCancel) {
                        e.preventDefault();
                    }
                }
                if (!isDlgOpenCancel) {
                    delete updatedCell.value;
                    delete updatedCell.formula;
                    this.parent.notify(clearFormulaDependentCells, { cellRef: sheet.activeCell, clearFormulaInfo: true });
                    if (checkIsFormula(oldValue)) {
                        this.parent.updateCellInfo({ formula: oldValue }, sheet.activeCell);
                    }
                    else if (oldCellValue) {
                        this.parent.updateCellInfo({ value: oldCellValue }, sheet.activeCell);
                    }
                    return;
                }
                else {
                    updatedCell.value = '0';
                }
            }
            var indexes = void 0;
            if (evtArgs.isFormulaDependent) {
                indexes = getViewportIndexes(this.parent, this.parent.viewport);
            }
            var cell = getCell(cellIndex[0], cellIndex[1], sheet, true);
            var eventArgs = this.getRefreshNodeArgs(cell, this.editCellData.element, this.editCellData.rowIndex, this.editCellData.colIndex);
            this.editCellData.value = eventArgs.value;
            this.parent.notify(refreshChart, { cell: null, rIdx: this.editCellData.rowIndex, cIdx: this.editCellData.colIndex, viewportIndexes: indexes });
            if (cell && cell.formula) {
                this.editCellData.formula = cell.formula;
            }
            if (tdRefresh) {
                this.parent.refreshNode(this.editCellData.element, eventArgs);
            }
            if (cell && cell.hyperlink) {
                this.parent.serviceLocator.getService('cell').refreshRange(cellIndex);
            }
            if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
                this.parent.notify(applyCF, {
                    indexes: [this.editCellData.rowIndex, this.editCellData.colIndex], isAction: true,
                    refreshAll: evtArgs.isFormulaDependent, isEdit: true
                });
            }
            if (cell && cell.wrap) {
                this.parent.notify(wrapEvent, { range: cellIndex, wrap: true, sheet: sheet });
            }
            if (isUniqueRange) {
                var rangeIdx = getRangeIndexes(this.uniqueColl);
                if (getCell(rangeIdx[0], rangeIdx[1], sheet).value.toString().indexOf('#SPILL!') > -1) {
                    this.isSpill = true;
                }
                if ((oldCellValue !== '' && this.editCellData.value === '') ||
                    (this.editCellData.formula && this.editCellData.formula.length > 1 &&
                        oldCellValue !== this.editCellData.formula)) {
                    var skip = false;
                    for (var j = rangeIdx[0]; j <= rangeIdx[2]; j++) {
                        for (var k = rangeIdx[1]; k <= rangeIdx[3]; k++) {
                            var cell_1 = getCell(j, k, sheet);
                            if (j === rangeIdx[0] && k === rangeIdx[1]) {
                                skip = false;
                            }
                            else if (cell_1 && !isNullOrUndefined(cell_1.value) && cell_1.value !== '') {
                                skip = true;
                            }
                        }
                    }
                    if (!skip) {
                        this.reApplyFormula();
                    }
                }
                else {
                    this.updateUniqueRange(newVal);
                }
            }
        }
        this.triggerEvent('cellSave', e, value);
        this.resetEditState();
        this.focusElement(e);
    };
    Edit.prototype.checkUniqueRange = function (uniquArgs) {
        var args = { range: [] };
        this.parent.notify(getUniqueRange, args);
        var collection = args.range;
        if (!uniquArgs.sheetName) {
            uniquArgs.sheetName = this.parent.getActiveSheet().name;
        }
        for (var i = 0; i < collection.length; i++) {
            if (collection[i].substring(0, collection[i].lastIndexOf('!')) === uniquArgs.sheetName) {
                var rangeIdx = getRangeIndexes(collection[i]);
                for (var j = rangeIdx[0]; j <= rangeIdx[2]; j++) {
                    for (var k = rangeIdx[1]; k <= rangeIdx[3]; k++) {
                        if (uniquArgs.cellIdx[0] === j && uniquArgs.cellIdx[1] === k) {
                            uniquArgs.isUnique = true;
                            this.uniqueCell = true;
                            var uniqueIndex = this.uniqueColl !== '' ? getRangeIndexes(this.uniqueColl) : [0, 0, 0, 0];
                            var collectionIndex = getRangeIndexes(collection[i]);
                            if (uniqueIndex[0] === collectionIndex[0] && uniqueIndex[1] === collectionIndex[1]) {
                                var index = [uniqueIndex[0], collectionIndex[1], uniqueIndex[0], collectionIndex[1]];
                                index[2] = uniqueIndex[2] > collectionIndex[2] ? uniqueIndex[2] : collectionIndex[2];
                                index[3] = uniqueIndex[3] > collectionIndex[3] ? uniqueIndex[3] : collectionIndex[3];
                                this.uniqueColl = getRangeAddress(index);
                                uniquArgs.uniqueRange = getRangeAddress(index);
                            }
                            else {
                                this.uniqueColl = collection[i];
                                uniquArgs.uniqueRange = collection[i];
                            }
                        }
                    }
                }
            }
        }
    };
    Edit.prototype.updateUniqueRange = function (value) {
        var rangeIdx = getRangeIndexes(this.uniqueColl);
        var skip = false;
        if (getCell(rangeIdx[0], rangeIdx[1], this.parent.getActiveSheet()).value !== '#SPILL!') {
            skip = true;
        }
        for (var j = rangeIdx[0]; j <= rangeIdx[2]; j++) {
            for (var k = rangeIdx[1]; k <= rangeIdx[3]; k++) {
                if (skip) {
                    if (j === rangeIdx[0] && k === rangeIdx[1]) {
                        this.parent.updateCellInfo({ value: '#SPILL!' }, getRangeAddress([j, k]), true);
                    }
                    else {
                        if (getRangeAddress([j, k]).split(':')[0] === this.editCellData.addr) {
                            this.parent.updateCellInfo({ value: value }, getRangeAddress([j, k]), true);
                        }
                        else {
                            this.parent.updateCellInfo({ value: '' }, getRangeAddress([j, k]), true);
                        }
                    }
                }
            }
        }
    };
    Edit.prototype.reApplyFormula = function () {
        var cellIdx = getRangeIndexes(this.uniqueColl);
        var cell = getCell(cellIdx[0], cellIdx[1], this.parent.getActiveSheet());
        this.parent.updateCellInfo({ value: '' }, getRangeAddress([cellIdx[0], cellIdx[1]]), true);
        var sheets = this.parent.sheets;
        var formula = cell.formula;
        for (var i = 0; i < sheets.length; i++) {
            if (formula.indexOf(sheets[i].name) > -1) {
                formula = formula.replace(sheets[i].name, '!' + i);
            }
        }
        this.parent.notify(workbookFormulaOperation, { action: 'computeExpression', formula: formula });
        this.uniqueCell = false;
        if (this.uniqueActCell !== '') {
            this.editCellData.value = this.uniqueActCell;
            this.uniqueActCell = '';
        }
    };
    Edit.prototype.refreshDependentCellValue = function (rowIdx, colIdx, sheetIdx) {
        if (rowIdx && colIdx) {
            rowIdx--;
            colIdx--;
            if (((this.editCellData.rowIndex !== rowIdx || this.editCellData.colIndex !== colIdx)
                && this.parent.activeSheetIndex === sheetIdx) || (this.uniqueCell && this.parent.activeSheetIndex === sheetIdx)) {
                var sheet = getSheet(this.parent, sheetIdx);
                var td = void 0;
                if (!isHiddenRow(sheet, rowIdx) && !isHiddenCol(sheet, colIdx)) {
                    td = this.parent.getCell(rowIdx, colIdx);
                }
                if (td) {
                    if (td.parentElement) {
                        var curRowIdx = td.parentElement.getAttribute('aria-rowindex');
                        if (curRowIdx && Number(curRowIdx) - 1 !== rowIdx) {
                            return;
                        }
                    }
                    var cell = getCell(rowIdx, colIdx, sheet);
                    var actCell = getRangeIndexes(sheet.activeCell);
                    if (actCell[0] === rowIdx && actCell[1] === colIdx) {
                        this.uniqueActCell = cell.value;
                    }
                    var eventArgs = this.getRefreshNodeArgs(cell, td, rowIdx, colIdx);
                    this.parent.refreshNode(td, eventArgs);
                }
            }
        }
    };
    Edit.prototype.getRefreshNodeArgs = function (cell, tdEle, rowIdx, colIdx) {
        cell = cell || {};
        var eventArgs = {
            value: cell.value, format: cell.format,
            formattedText: cell.formattedText && cell.formattedText !== '' ? cell.formattedText : cell.value, isRightAlign: false,
            type: 'General', cell: cell, rowIndex: rowIdx, td: tdEle, colIndex: colIdx, refresh: true, isEdit: true
        };
        this.parent.notify(getFormattedCellObject, eventArgs);
        return eventArgs;
    };
    Edit.prototype.endEdit = function (refreshFormulaBar, event, isPublic) {
        if (refreshFormulaBar === void 0) { refreshFormulaBar = false; }
        if (refreshFormulaBar) {
            this.refreshEditor(this.editCellData.oldValue, false, true, false, false);
        }
        var triggerEventArgs = this.triggerEvent('beforeCellSave');
        if (triggerEventArgs.cancel) {
            if (this.parent.isEdit && event) {
                event.preventDefault();
            }
            return;
        }
        if (!this.isAltEnter && triggerEventArgs.value && triggerEventArgs.value.toString().indexOf('\n') > -1) {
            var cell = getCell(this.editCellData.rowIndex, this.editCellData.colIndex, this.parent.getActiveSheet());
            wrapText(this.parent.getActiveSheet().activeCell, cell ? (cell.wrap === false ? false : true) :
                true, this.parent);
            this.refreshEditor(triggerEventArgs.value, this.isCellEdit, false, false, false);
        }
        this.updateEditedValue(true, triggerEventArgs.value, event, isPublic);
    };
    Edit.prototype.cancelEdit = function (refreshFormulaBar, trigEvent, event, isInternal) {
        if (refreshFormulaBar === void 0) { refreshFormulaBar = true; }
        if (trigEvent === void 0) { trigEvent = true; }
        this.refreshEditor(this.editCellData.oldValue, refreshFormulaBar, false, false, false);
        if (!isInternal) {
            if (trigEvent) {
                this.triggerEvent('cellSave', event, undefined, true);
            }
            else {
                this.triggerEvent('cellEdited');
            }
        }
        this.resetEditState();
        this.focusElement();
    };
    Edit.prototype.focusElement = function (e) {
        if (e && e.keyCode === 9 && document.activeElement.classList.contains('e-formula-bar')) {
            var focusEle = this.parent.element.querySelector(".e-formula-bar-panel " + (e.shiftKey ? '.e-insert-function' : '.e-combobox'));
            if (focusEle) {
                focus(focusEle);
            }
        }
        else {
            focus(this.parent.element);
        }
        this.parent.notify(enableToolbarItems, [{ enable: true }]);
    };
    Edit.prototype.triggerEvent = function (eventName, event, value, pvtManualCalc) {
        var sheet = this.parent.getActiveSheet();
        var cell = getCell(this.editCellData.rowIndex, this.editCellData.colIndex, sheet);
        var eventArgs = {
            element: this.editCellData.element,
            value: value ? value : this.editCellData.value,
            oldValue: this.editCellData.oldValue,
            address: this.editCellData.fullAddr,
            displayText: this.parent.getDisplayText(cell),
            previousFormulaValue: this.editCellData.prevFormulaValue
        };
        if (eventArgs.address) {
            var indexes = getRangeIndexes(eventArgs.address);
            var args = { cellIdx: indexes, isUnique: false };
            this.checkUniqueRange(args);
            if (args.isUnique) {
                eventArgs.isSpill = this.isSpill;
            }
        }
        var isValueChanged = (eventArgs.value ? eventArgs.value.toString() : eventArgs.value) !==
            (eventArgs.oldValue || eventArgs.oldValue === 0 ? eventArgs.oldValue.toString() : eventArgs.oldValue);
        if (isValueChanged || (!pvtManualCalc && checkIsFormula(eventArgs.value) && (!cell || !cell.format ||
            getTypeFromFormat(cell.format) !== 'Text'))) {
            if (eventName !== 'cellSave') {
                eventArgs.cancel = false;
            }
            if (eventName === 'beforeCellSave') {
                this.parent.notify(beginAction, { eventArgs: eventArgs, action: 'cellSave', preventAction: true });
                cell = checkIsFormula(eventArgs.value) ? { formula: eventArgs.value } : { value: eventArgs.value };
                var cancel = updateCell(this.parent, sheet, { cell: cell, rowIdx: this.editCellData.rowIndex, colIdx: this.editCellData.colIndex,
                    eventOnly: true });
                if (cancel) {
                    this.cancelEdit(false, false, null, true);
                    eventArgs.cancel = true;
                    return eventArgs;
                }
            }
            this.parent.trigger(eventName, eventArgs);
            if (eventName === 'cellSave') {
                this.parent.trigger('cellEdited', eventArgs);
                if (this.editCellData.formula) {
                    eventArgs.formula = this.editCellData.formula;
                }
                else if (!isValueChanged) {
                    eventArgs.formula = eventArgs.value;
                }
                if (cell.format) {
                    eventArgs.format = cell.format;
                }
                eventArgs.originalEvent = event;
                this.parent.notify(completeAction, { eventArgs: eventArgs, action: 'cellSave' });
            }
        }
        else if (eventName !== 'beforeCellSave') {
            if (eventName === 'cellSave') {
                this.parent.trigger('cellEdited', eventArgs);
            }
            else {
                this.parent.trigger(eventName, eventArgs);
            }
        }
        return eventArgs;
    };
    Edit.prototype.altEnter = function () {
        this.positionEditor(true);
        var selection = window.getSelection();
        var node = selection.anchorNode;
        var offset;
        var range = document.createRange();
        offset = (node.nodeType === 3) ? selection.anchorOffset : node.textContent.length;
        if (offset === 0 && node.textContent.length > 0) {
            offset = node.textContent.length;
        }
        var text = node.textContent;
        var textBefore = text.slice(0, offset);
        var textAfter = text.slice(offset) || ' ';
        node.textContent = textBefore + '\n' + textAfter;
        range = document.createRange();
        if (node.nodeType === 3) {
            range.setStart(node, offset + 1);
            range.setEnd(node, offset + 1);
        }
        else if (node.nodeType === 1) {
            range.setStart(node.firstChild, offset + 1);
            range.setEnd(node.firstChild, offset + 1);
        }
        selection.removeAllRanges();
        selection.addRange(range);
    };
    Edit.prototype.resetEditState = function (elemRefresh) {
        if (elemRefresh === void 0) { elemRefresh = true; }
        if (elemRefresh) {
            var editorElem = this.getEditElement(this.parent.getActiveSheet());
            if (checkIsFormula(editorElem.textContent) || editorElem.textContent === '') {
                this.parent.notify(clearCellRef, null);
            }
            if (this.editCellData.element) {
                this.editCellData.element.classList.remove('e-ss-edited');
                this.editorElem.textContent = '';
                if (editorElem === this.editorElem) {
                    this.editorElem.removeAttribute('style');
                    this.editorElem.classList.remove('e-right-align');
                }
                else {
                    detach(editorElem);
                }
            }
        }
        this.editCellData = {};
        this.parent.isEdit = this.isEdit = false;
        this.isCellEdit = true;
        this.isAltEnter = false;
        this.parent.notify(formulaOperation, { action: 'endEdit' });
        if (this.parent.showSheetTabs && !this.parent.isProtected) {
            var addSheetBtn = this.parent.element.querySelector('.e-add-sheet-tab');
            if (addSheetBtn) {
                addSheetBtn.removeAttribute('disabled');
            }
        }
    };
    Edit.prototype.refSelectionRender = function () {
        var editorElem = this.getEditElement(this.parent.getActiveSheet());
        if (editorElem) {
            if (checkIsFormula(editorElem.textContent)) {
                this.parent.notify(initiateFormulaReference, {
                    range: editorElem.textContent, formulaSheetIdx: this.editCellData.sheetIndex
                });
            }
        }
    };
    // Start edit the formula cell and set cursor position
    Edit.prototype.initiateRefSelection = function () {
        var sheetName = this.editCellData.fullAddr.substring(0, this.editCellData.fullAddr.lastIndexOf('!'));
        var value = this.editCellData.value;
        if (this.parent.getActiveSheet().name === sheetName && checkIsFormula(this.editCellData.value, true)) {
            this.startEdit(this.editCellData.addr, value, false);
            this.parent.notify(initiateFormulaReference, {
                range: this.editCellData.value, formulaSheetIdx: this.editCellData.sheetIndex
            });
            this.getEditElement(this.parent.getActiveSheet()).textContent = value;
            this.initiateCurPosition();
        }
        else {
            this.initiateCurPosition();
        }
    };
    Edit.prototype.addressHandler = function (args) {
        var dlgInst = this.parent.serviceLocator.getService(dialog).dialogInstance;
        if (dlgInst && dlgInst.element && dlgInst.element.classList.contains('e-validation-error-dlg')) {
            args.isAlertDlgOpen = true;
            return;
        }
        if (!this.curStartPos) {
            var curOffset = this.getCurPosition();
            if (curOffset.start) {
                this.curStartPos = curOffset.start;
            }
            if (curOffset.end) {
                this.curEndPos = curOffset.end;
            }
        }
        var address = args.range;
        var sheetIdx = this.editCellData.sheetIndex;
        var editorEle = this.getEditElement(this.parent.getActiveSheet());
        if (this.parent.activeSheetIndex !== sheetIdx) {
            address = '\'' + this.parent.getActiveSheet().name + '\'' + '!' + address;
            if (args.isNameBoxSelect) {
                sheetIdx = this.parent.activeSheetIndex;
            }
        }
        var editedValue = this.editCellData.value;
        if (args.isSelect) {
            this.parent.notify(initiateFormulaReference, { range: editedValue + address, formulaSheetIdx: sheetIdx });
        }
        else if (this.parent.activeSheetIndex === sheetIdx) {
            var editorContent = document.activeElement.classList.contains('e-formula-bar') ?
                document.activeElement.value : editorEle.textContent;
            if (args.isNameBoxSelect) {
                this.parent.notify(initiateFormulaReference, { range: editedValue + address, formulaSheetIdx: sheetIdx });
                this.curStartPos = editedValue.length;
            }
            var startVal = void 0;
            var endVal = void 0;
            if (args.isMouseDown && editorContent !== editedValue) {
                startVal = editorContent.substring(0, this.curEndPos) + this.parent.listSeparator;
                endVal = editorContent.substring(this.curEndPos);
                this.refreshEditor(startVal + endVal, false, true);
                this.parent.notify(initiateFormulaReference, { range: editorEle.textContent, formulaSheetIdx: sheetIdx });
                this.curEndPos += this.parent.listSeparator.length;
                this.curStartPos = this.curEndPos;
                startVal += address;
            }
            else {
                startVal = editedValue.substring(0, this.curStartPos) + address;
                endVal = editedValue.substring(this.curStartPos);
                if (args.isNameBoxSelect) {
                    this.refreshEditor(startVal + endVal, true, true);
                }
            }
            editorEle.textContent = startVal + endVal;
            this.curEndPos = startVal.length;
        }
    };
    Edit.prototype.updateFormulaBarValue = function (args) {
        var value = this.editCellData.value;
        var lastRange = this.parent.getActiveSheet().selectedRange.split(' ');
        var address = lastRange[lastRange.length - 1];
        address = isSingleCell(getIndexesFromAddress(address)) ? address.split(':')[0] : address;
        var formulaBar = this.parent.element.querySelector('.e-formula-bar');
        if (value && checkIsFormula(value, true)) {
            var sheetName = this.editCellData.fullAddr.substring(0, this.editCellData.fullAddr.lastIndexOf('!'));
            var otherSheet = this.parent.getActiveSheet().name !== sheetName;
            if (otherSheet) {
                address = '\'' + this.parent.getActiveSheet().name + '\'' + '!' + address;
            }
            var startVal = void 0;
            var endVal = void 0;
            if (otherSheet && args.isMouseDown && lastRange.length > 1 && args.formulaBarVal && args.formulaBarVal !== value) {
                startVal = args.formulaBarVal.substring(0, this.curEndPos) + this.parent.listSeparator;
                endVal = args.formulaBarVal.substring(this.curEndPos);
                this.refreshEditor(startVal + endVal, true);
                this.curEndPos += this.parent.listSeparator.length;
                this.curStartPos = this.curEndPos;
                startVal += address;
            }
            else {
                startVal = value.substring(0, this.curStartPos) + address;
                endVal = value.substring(this.curStartPos);
            }
            formulaBar.value = startVal + endVal;
            this.curEndPos = startVal.length;
        }
    };
    Edit.prototype.setFormulaBarCurPosition = function (input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.selectionStart = selectionStart;
            input.selectionEnd = selectionStart;
            input.setSelectionRange(selectionStart, selectionEnd);
        }
    };
    Edit.prototype.initiateCurPosition = function (args) {
        if (args === void 0) { args = { isCellEdit: false }; }
        var el = this.getEditElement(this.parent.getActiveSheet(), true);
        if (args.isCellEdit) {
            var curOffset = this.getCurPosition();
            if (!this.endFormulaRef && curOffset.start === curOffset.end) {
                this.updateFormulaReference(el);
                var validCharacters = ['+', '-', '*', '/', this.parent.listSeparator, '(', '=', '&', ':'];
                if (curOffset.end && validCharacters.indexOf(this.editCellData.value[curOffset.end - 1]) === -1) {
                    this.endFormulaRef = true;
                }
            }
            return;
        }
        var value = el.innerText;
        var selection = window.getSelection();
        if ((selection && selection.focusNode && selection.focusNode.classList &&
            selection.focusNode.classList.contains('e-formula-bar-panel'))) {
            var formulaBar = this.parent.element.querySelector('.e-formula-bar');
            this.setFormulaBarCurPosition(formulaBar, this.curEndPos, this.curEndPos);
            return;
        }
        if (value) {
            var range = document.createRange();
            if (value.indexOf(')') === value.length - 1) {
                range.setStart(el.childNodes[0], this.curEndPos);
                range.setEnd(el.childNodes[0], this.curEndPos);
            }
            else {
                range.setStart(el.childNodes[0], this.curEndPos);
                range.setEnd(el.childNodes[0], this.curEndPos);
            }
            selection.removeAllRanges();
            selection.addRange(range);
        }
        var sheetIdx = this.editCellData.sheetIndex;
        if (sheetIdx !== this.parent.activeSheetIndex) {
            var elem = this.parent.element.querySelector('.e-formula-bar');
            if (elem.value) {
                if (elem.value.indexOf(')') === this.curEndPos - 1) {
                    this.setFormulaBarCurPosition(elem, this.curEndPos - 1, this.curEndPos - 1);
                }
                else {
                    this.setFormulaBarCurPosition(elem, this.curEndPos, this.curEndPos);
                }
            }
        }
    };
    Edit.prototype.getEditElement = function (sheet, isEdit) {
        if ((this.isEdit || isEdit) && (sheet.frozenRows || sheet.frozenColumns)) {
            var frozenRow = this.parent.frozenRowCount(sheet);
            var frozenCol = this.parent.frozenColCount(sheet);
            var range = getCellIndexes(sheet.activeCell);
            var content = void 0;
            if (range[0] < frozenRow && range[1] < frozenCol) {
                content = this.parent.getSelectAllContent();
            }
            else if (range[0] < frozenRow) {
                content = this.parent.getColumnHeaderContent();
            }
            else if (range[1] < frozenCol) {
                content = this.parent.getRowHeaderContent();
            }
            else {
                return this.editorElem;
            }
            var editEle = content.getElementsByClassName('e-spreadsheet-edit')[0];
            if (!editEle && isEdit) {
                editEle = content.appendChild(this.editorElem.cloneNode());
            }
            return editEle;
        }
        return this.editorElem;
    };
    Edit.prototype.sheetChangeHandler = function () {
        if (!this.isEdit) {
            this.editCellData.value = null;
        }
    };
    Edit.prototype.showFormulaAlertDlg = function (errorString, triggerBeforeOpenEvt) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var alertDialog = this.parent.serviceLocator.getService('dialog');
        var cursorPosition;
        var errorKey = this.getFormulaErrorKey(errorString);
        var cancel;
        var content = l10n.getConstant(errorKey);
        var dlgInst = alertDialog.dialogInstance;
        if (dlgInst && dlgInst.visible && dlgInst.element.classList.contains('e-circularref-dlg')) {
            return cancel;
        }
        alertDialog.show({
            width: 400, isModal: true, showCloseIcon: true, target: this.parent.element, cssClass: 'e-validation-error-dlg e-circularref-dlg',
            content: content,
            beforeOpen: function (args) {
                if (triggerBeforeOpenEvt) {
                    var sheet = _this.parent.getActiveSheet();
                    var dlgArgs = { dialogName: 'CircularReferenceDialog', element: args.element,
                        target: args.target, cancel: args.cancel, cellAddress: sheet.name + "!" + sheet.activeCell, content: content };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = cancel = true;
                        return;
                    }
                    else if (dlgArgs.content !== content) {
                        alertDialog.dialogInstance.content = dlgArgs.content;
                        alertDialog.dialogInstance.dataBind();
                    }
                }
                if (window.getSelection().rangeCount > 0) {
                    var range = window.getSelection().getRangeAt(0);
                    cursorPosition = range.endOffset;
                }
            },
            buttons: [{
                    buttonModel: { content: l10n.getConstant('Ok'), isPrimary: true },
                    click: function () { return alertDialog.hide(); }
                }],
            close: function () {
                if (!cancel) {
                    var elem = _this.getEditElement(_this.parent.getActiveSheet());
                    if (elem.childElementCount) {
                        var textContent = elem.textContent;
                        cursorPosition = textContent.length;
                        elem.textContent = textContent;
                    }
                    var selection = document.getSelection();
                    var range = document.createRange();
                    range.setStart(elem.firstChild, cursorPosition);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    elem.focus();
                }
            }
        }, false);
        return cancel;
    };
    Edit.prototype.getFormulaErrorKey = function (errorString) {
        var errorKey;
        switch (errorString) {
            case 'invalid arguments':
                errorKey = 'InvalidArguments';
                break;
            case 'improper formula':
                errorKey = 'ImproperFormula';
                break;
            case 'empty expression':
                errorKey = 'EmptyExpression';
                break;
            case 'mismatched parentheses':
                errorKey = 'MismatchedParenthesis';
                break;
            case 'mismatched string quotes':
                errorKey = 'MismatchedStringQuotes';
                break;
            case 'wrong number of arguments':
                errorKey = 'WrongNumberOfArguments';
                break;
            case 'requires 3 arguments':
                errorKey = 'Requires3Arguments';
                break;
            case '#CIRCULARREF!':
                errorKey = 'FormulaCircularRef';
                break;
            default:
                errorKey = 'InvalidFormulaError';
        }
        return errorKey;
    };
    Edit.prototype.readOnlyAlertHandler = function () {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialog = this.parent.serviceLocator.getService('dialog');
        var findDialog = this.parent.element.querySelector('.e-find-dlg');
        var findDlgInst;
        if (!isNullOrUndefined(findDialog)) {
            findDlgInst = getComponent(findDialog, 'dialog');
        }
        dialog.show({
            content: l10n.getConstant('ReadonlyAlert'),
            isModal: true,
            closeOnEscape: true,
            showCloseIcon: true,
            width: '400px',
            cssClass: 'e-readonly-alert-dlg',
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'ReadOnlyAlertDialog',
                    content: l10n.getConstant('ReadonlyAlert'),
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    dialog.dialogInstance.content = dlgArgs.content;
                    focus(_this.parent.element);
                }
            },
            close: function () {
                if (!isNullOrUndefined(findDialog)) {
                    dialog.dialogInstance = findDlgInst;
                }
                focus(_this.parent.element);
            }
        });
    };
    Edit.prototype.finiteAlertHandler = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialog = this.parent.serviceLocator.getService('dialog');
        dialog.show({
            header: l10n.getConstant('Alert'),
            content: l10n.getConstant('FiniteAlert'),
            isModal: true,
            closeOnEscape: true,
            showCloseIcon: true,
            width: '400px',
            cssClass: 'e-finite-alert-dlg'
        });
    };
    return Edit;
}());
export { Edit };
