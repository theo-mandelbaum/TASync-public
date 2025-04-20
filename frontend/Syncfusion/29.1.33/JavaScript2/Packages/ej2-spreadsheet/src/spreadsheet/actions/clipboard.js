var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { detach, EventHandler, Browser, isNullOrUndefined, extend, isUndefined } from '@syncfusion/ej2-base';
import { getRangeIndexes, getCell, getSheet, getSwapRange, inRange, isReadOnly, getRow, isReadOnlyCells, setCell, checkColumnValidation } from '../../workbook/index';
import { getRangeAddress, getSheetIndexFromId, getSheetName } from '../../workbook/index';
import { getFormattedCellObject, workbookFormulaOperation, checkIsFormula, mergedRange } from '../../workbook/index';
import { setMerge, getCellIndexes } from '../../workbook/index';
import { ribbonClick, copy, paste, initiateFilterUI, setPosition, isLockedCells, focus, readonlyAlert } from '../common/index';
import { hasTemplate, getTextHeightWithBorder, getLines, getExcludedColumnWidth, editAlert } from '../common/index';
import { enableToolbarItems, rowHeightChanged, completeAction, insertImage } from '../common/index';
import { clearCopy, selectRange, dialog, contentLoaded, tabSwitch, cMenuBeforeOpen, createImageElement, setMaxHgt } from '../common/index';
import { getMaxHgt, setRowEleHeight, locale, deleteImage, getRowIdxFromClientY, getColIdxFromClientX, cut } from '../common/index';
import { colWidthChanged, getFilterRange } from '../common/index';
import { Deferred } from '@syncfusion/ej2-data';
import { refreshRibbonIcons, refreshClipboard, getColumn, isLocked as isCellLocked } from '../../workbook/index';
import { setFilteredCollection, setChart, parseIntValue, isSingleCell, activeCellMergedRange, getRowsHeight } from '../../workbook/index';
import { getUpdatedFormula, clearCFRule, checkUniqueRange, clearFormulaDependentCells } from '../../workbook/index';
import { updateCell, beginAction, isFilterHidden, applyCF, checkRange } from '../../workbook/index';
import { cellValidation, removeUniquecol } from '../../workbook/common/event';
/**
 * Represents clipboard support for Spreadsheet.
 */
var Clipboard = /** @class */ (function () {
    function Clipboard(parent) {
        this.parent = parent;
        this.init();
        this.addEventListener();
    }
    Clipboard.prototype.init = function () {
        this.parent.element.appendChild(this.parent.createElement('input', { className: 'e-clipboard', attrs: { 'contenteditable': 'true', 'tabindex': '-1', 'aria-hidden': 'true' } }));
    };
    Clipboard.prototype.addEventListener = function () {
        var ele = this.getClipboardEle();
        this.parent.on(cut, this.cut, this);
        this.parent.on(copy, this.copy, this);
        this.parent.on(paste, this.paste, this);
        this.parent.on(clearCopy, this.clearCopiedInfo, this);
        this.parent.on(tabSwitch, this.tabSwitchHandler, this);
        this.parent.on(cMenuBeforeOpen, this.cMenuBeforeOpenHandler, this);
        this.parent.on(ribbonClick, this.ribbonClickHandler, this);
        this.parent.on(contentLoaded, this.initCopyIndicator, this);
        this.parent.on(rowHeightChanged, this.rowHeightChanged, this);
        this.parent.on(colWidthChanged, this.colWidthChanged, this);
        this.parent.on(refreshClipboard, this.refreshOnInsertDelete, this);
        EventHandler.add(ele, 'cut', this.cut, this);
        EventHandler.add(ele, 'copy', this.copy, this);
        EventHandler.add(ele, 'paste', this.paste, this);
    };
    Clipboard.prototype.removeEventListener = function () {
        var ele = this.getClipboardEle();
        if (!this.parent.isDestroyed) {
            this.parent.off(cut, this.cut);
            this.parent.off(copy, this.copy);
            this.parent.off(paste, this.paste);
            this.parent.off(clearCopy, this.clearCopiedInfo);
            this.parent.off(tabSwitch, this.tabSwitchHandler);
            this.parent.off(cMenuBeforeOpen, this.cMenuBeforeOpenHandler);
            this.parent.off(ribbonClick, this.ribbonClickHandler);
            this.parent.off(contentLoaded, this.initCopyIndicator);
            this.parent.off(rowHeightChanged, this.rowHeightChanged);
            this.parent.off(colWidthChanged, this.colWidthChanged);
            this.parent.off(refreshClipboard, this.refreshOnInsertDelete);
        }
        EventHandler.remove(ele, 'cut', this.cut);
        EventHandler.remove(ele, 'copy', this.copy);
        EventHandler.remove(ele, 'paste', this.paste);
    };
    Clipboard.prototype.ribbonClickHandler = function (args) {
        var parentId = this.parent.element.id;
        switch (args.item.id) {
            case parentId + '_cut':
                this.cut({ invokeCopy: true });
                break;
            case parentId + '_copy':
                this.copy({ invokeCopy: true });
                break;
        }
    };
    Clipboard.prototype.tabSwitchHandler = function (args) {
        if (args.activeTab === 0 && !this.copiedInfo && !this.copiedShapeInfo) {
            this.hidePaste();
        }
    };
    Clipboard.prototype.cMenuBeforeOpenHandler = function (e) {
        var sheet = this.parent.getActiveSheet();
        var l10n = this.parent.serviceLocator.getService(locale);
        var delRowItems = [];
        var hideRowItems = [];
        var delColItems = [];
        var hideColItems = [];
        var actCell = sheet.activeCell;
        var actCellIndex = getCellIndexes(actCell);
        var cellObj = getCell(actCellIndex[0], actCellIndex[1], sheet);
        var isLocked = sheet.isProtected && isCellLocked(cellObj, getColumn(sheet, actCellIndex[1]));
        var isReadonlyCell = isReadOnly(cellObj, getColumn(sheet, actCellIndex[1]), getRow(sheet, actCellIndex[0]));
        if (e.target === 'Content' || e.target === 'RowHeader' || e.target === 'ColumnHeader' || e.target === 'SelectAll') {
            this.parent.enableContextMenuItems([l10n.getConstant('Paste'), l10n.getConstant('PasteSpecial')], (this.copiedInfo ||
                this.copiedShapeInfo && !isLocked) ? true : false);
            this.parent.enableContextMenuItems([l10n.getConstant('Cut')], !isLocked);
        }
        if (e.target === 'Content') {
            if (sheet.isProtected) {
                this.parent.enableContextMenuItems([l10n.getConstant('Filter'), l10n.getConstant('Sort'),
                    l10n.getConstant('AddNote')], false);
            }
            if (isLocked) {
                this.parent.enableContextMenuItems([l10n.getConstant('Cut'), l10n.getConstant('Hyperlink'),
                    l10n.getConstant('EditNote'), l10n.getConstant('DeleteNote')], false);
            }
            else if (isReadonlyCell) {
                this.parent.enableContextMenuItems([l10n.getConstant('Cut'), l10n.getConstant('Paste'), l10n.getConstant('PasteSpecial'),
                    l10n.getConstant('Filter'), l10n.getConstant('Sort'), l10n.getConstant('Hyperlink'), l10n.getConstant('EditHyperlink'),
                    l10n.getConstant('OpenHyperlink'), l10n.getConstant('RemoveHyperlink'), l10n.getConstant('AddNote')], false);
            }
            else if (sheet.isProtected && !sheet.protectSettings.insertLink) {
                this.parent.enableContextMenuItems([l10n.getConstant('Hyperlink')], false);
            }
        }
        if (sheet.isProtected) {
            if (e.target === 'ColumnHeader') {
                delColItems = [l10n.getConstant('DeleteColumn'), l10n.getConstant('DeleteColumns'),
                    l10n.getConstant('InsertColumn'), l10n.getConstant('InsertColumns')];
                hideColItems = [l10n.getConstant('HideColumn'), l10n.getConstant('HideColumns'), l10n.getConstant('UnhideColumns')];
                this.parent.enableContextMenuItems(delColItems, false);
                this.parent.enableContextMenuItems(hideColItems, sheet.protectSettings.formatColumns);
            }
            if (e.target === 'RowHeader') {
                delRowItems = [l10n.getConstant('DeleteRow'), l10n.getConstant('DeleteRows'),
                    l10n.getConstant('InsertRow'), l10n.getConstant('InsertRows')];
                hideRowItems = [l10n.getConstant('HideRow'), l10n.getConstant('HideRows'), l10n.getConstant('UnhideRows')];
                this.parent.enableContextMenuItems(delRowItems, false);
                this.parent.enableContextMenuItems(hideRowItems, sheet.protectSettings.formatRows);
            }
        }
    };
    Clipboard.prototype.rowHeightChanged = function (args) {
        if (this.copiedInfo) {
            var ele = this.getCopyIndicator();
            if (ele) {
                if (this.copiedInfo.range[0] > args.rowIdx) {
                    ele.style.top = parseFloat(ele.style.top) + args.threshold + "px";
                }
                else if (inRange(this.copiedInfo.range, args.rowIdx, this.copiedInfo.range[1])) {
                    ele.style.height = parseFloat(ele.style.height) + args.threshold + "px";
                }
            }
        }
    };
    Clipboard.prototype.colWidthChanged = function (args) {
        if (this.copiedInfo) {
            var ele = this.getCopyIndicator();
            if (ele) {
                if (this.copiedInfo.range[1] > args.colIdx) {
                    ele.style.left = parseFloat(ele.style.left) + args.threshold + "px";
                }
                else if (inRange(this.copiedInfo.range, this.copiedInfo.range[0], args.colIdx)) {
                    ele.style.width = parseFloat(ele.style.width) + args.threshold + "px";
                }
            }
        }
    };
    Clipboard.prototype.cut = function (args) {
        this.setCopiedInfo(args, true);
    };
    Clipboard.prototype.copy = function (args) {
        this.setCopiedInfo(args, false);
    };
    Clipboard.prototype.paste = function (args) {
        var _this = this;
        if (this.parent.isEdit || this.parent.element.getElementsByClassName('e-dlg-overlay').length > 0) {
            var editEle = this.parent.element.getElementsByClassName('e-spreadsheet-edit')[0];
            editEle.style.height = 'auto';
            return;
        }
        var rfshRange;
        var isExternal = ((args && args.clipboardData) || window['clipboardData']);
        if (isExternal && args.clipboardData && args.clipboardData.getData('isInternalCut').length && !this.copiedInfo) {
            return; // to prevent multiple cut paste action
        }
        if (isExternal || this.copiedShapeInfo || (args.isInternal && this.copiedInfo)) {
            args.isInternal = !isExternal;
            var isCut = void 0;
            var copiedIdx = this.getCopiedIdx();
            args.isAction = !!isExternal || args.isAction;
            var cSIdx = args && args.sIdx > -1 ? args.sIdx : this.parent.activeSheetIndex;
            var curSheet = getSheet(this.parent, cSIdx);
            var selIdx = getSwapRange(args && args.range || getRangeIndexes(curSheet.selectedRange));
            var pasteModelArgs = void 0;
            var rows = void 0;
            if (isExternal) {
                pasteModelArgs = this.getExternalCells(args);
                rows = pasteModelArgs.model;
                if (!args.isInternal && pasteModelArgs.internal) {
                    isExternal = false;
                    if (!this.copiedInfo) {
                        return;
                    }
                }
                if (!rows || !rows.length) { // If image pasted
                    if (pasteModelArgs.file) {
                        this.parent.notify(insertImage, { file: pasteModelArgs.file });
                        return;
                    }
                    else if (this.copiedInfo) {
                        isExternal = false;
                    }
                    else {
                        return;
                    }
                }
            }
            pasteModelArgs = pasteModelArgs;
            var copyInfo = Object.assign({ isExternal: isExternal }, this.copiedInfo);
            var cIdx_1;
            var pSheetIdx_1;
            var column = void 0;
            var notRemoveMerge = void 0;
            var isRepeative = void 0;
            var cSheetSel = void 0;
            var prevSheet_1;
            var isRowSelected = void 0;
            var isColSelected = void 0;
            if (isExternal) {
                pSheetIdx_1 = cSIdx;
                prevSheet_1 = getSheet(this.parent, pSheetIdx_1);
                column = {};
                cSheetSel = pasteModelArgs.selection;
                isRepeative = cSheetSel !== 'Sheet' && (selIdx[2] - selIdx[0] + 1) % pasteModelArgs.rowCount === 0 &&
                    (selIdx[3] - selIdx[1] + 1) % pasteModelArgs.colCount === 0;
                cIdx_1 = [0, 0, pasteModelArgs.usedRowIndex, pasteModelArgs.usedColIndex];
            }
            else {
                cIdx_1 = getSwapRange(this.copiedShapeInfo ? getRangeIndexes(curSheet.selectedRange) : this.copiedInfo.range);
                pSheetIdx_1 = copiedIdx;
                column = getColumn(curSheet, cIdx_1[1]);
                notRemoveMerge = isSingleCell(cIdx_1) && this.isRangeMerged(selIdx, curSheet);
                prevSheet_1 = getSheet(this.parent, pSheetIdx_1);
                isRepeative = !notRemoveMerge && (selIdx[2] - selIdx[0] + 1) % (cIdx_1[2] - cIdx_1[0] + 1) === 0 &&
                    (selIdx[3] - selIdx[1] + 1) % (cIdx_1[3] - cIdx_1[1] + 1) === 0;
                if (prevSheet_1) {
                    isRowSelected = cIdx_1[1] === 0 && cIdx_1[3] === prevSheet_1.colCount - 1;
                    isColSelected = cIdx_1[0] === 0 && cIdx_1[2] === prevSheet_1.rowCount - 1;
                    if (isRowSelected) {
                        if (isColSelected) {
                            cSheetSel = 'Sheet';
                            cIdx_1[2] = prevSheet_1.usedRange.rowIndex;
                            cIdx_1[3] = prevSheet_1.usedRange.colIndex;
                        }
                        else {
                            cSheetSel = 'Row';
                            cIdx_1[3] = prevSheet_1.usedRange.colIndex;
                        }
                    }
                    else if (isColSelected) {
                        cSheetSel = 'Column';
                        cIdx_1[2] = prevSheet_1.usedRange.rowIndex;
                    }
                }
            }
            rfshRange = isRepeative ? selIdx : [selIdx[0], selIdx[1]]
                .concat([selIdx[0] + cIdx_1[2] - cIdx_1[0], selIdx[1] + cIdx_1[3] - cIdx_1[1] || selIdx[1]]);
            if (cSheetSel) {
                if ((cSheetSel === 'Sheet' || cSheetSel === 'Column') && rfshRange[2] < curSheet.usedRange.rowIndex) {
                    rfshRange[2] = curSheet.usedRange.rowIndex;
                }
                if ((cSheetSel === 'Sheet' || cSheetSel === 'Row') && rfshRange[3] < curSheet.usedRange.colIndex) {
                    rfshRange[3] = curSheet.usedRange.colIndex;
                }
            }
            var pasteType = (args && args.type) || 'All';
            if (isReadOnlyCells(this.parent, rfshRange)) {
                this.parent.notify(readonlyAlert, null);
                return;
            }
            else if (curSheet.isProtected && isLockedCells(this.parent, rfshRange)) {
                this.parent.notify(editAlert, null);
                return;
            }
            if (args.isAction && !this.copiedShapeInfo) {
                var beginEventArgs = { requestType: 'paste', copiedInfo: this.copiedInfo,
                    copiedRange: getRangeAddress(cIdx_1), pastedRange: getRangeAddress(rfshRange), type: pasteType, cancel: false };
                this.parent.notify(beginAction, { eventArgs: beginEventArgs, action: 'clipboard' });
                if (beginEventArgs.cancel) {
                    return;
                }
                selIdx = getRangeIndexes(beginEventArgs.pastedRange);
                if (isExternal) {
                    isRepeative = pasteModelArgs.selection !== 'Sheet' && (selIdx[2] - selIdx[0] + 1) % pasteModelArgs.rowCount === 0 &&
                        (selIdx[3] - selIdx[1] + 1) % pasteModelArgs.colCount === 0;
                }
                else {
                    isRepeative = !notRemoveMerge && !isRowSelected && (selIdx[2] - selIdx[0] + 1) % (cIdx_1[2] - cIdx_1[0] + 1) === 0
                        && !isColSelected && (selIdx[3] - selIdx[1] + 1) % (cIdx_1[3] - cIdx_1[1] + 1) === 0;
                }
                rfshRange = isRepeative ? selIdx : [selIdx[0], selIdx[1]].concat([selIdx[0] + cIdx_1[2] - cIdx_1[0], selIdx[1] + cIdx_1[3] - cIdx_1[1] || selIdx[1]]);
                pasteType = beginEventArgs.type;
            }
            var selectionRange = void 0;
            if (cSheetSel) {
                selectionRange = [].concat(rfshRange);
                if (cSheetSel === 'Sheet' || cSheetSel === 'Column') {
                    if (rfshRange[2] < curSheet.usedRange.rowIndex) {
                        rfshRange[2] = curSheet.usedRange.rowIndex;
                    }
                    if (cIdx_1[2] < curSheet.usedRange.rowIndex) {
                        cIdx_1[2] += curSheet.usedRange.rowIndex - cIdx_1[2];
                    }
                    if (selectionRange[2] < curSheet.rowCount) {
                        selectionRange[2] = curSheet.rowCount - 1;
                    }
                }
                if (cSheetSel === 'Sheet' || cSheetSel === 'Row') {
                    if (rfshRange[3] < curSheet.usedRange.colIndex) {
                        cIdx_1[3] += curSheet.usedRange.colIndex - rfshRange[3];
                        rfshRange[3] = curSheet.usedRange.colIndex;
                    }
                    if (cIdx_1[3] < curSheet.usedRange.colIndex) {
                        cIdx_1[3] += curSheet.usedRange.colIndex - cIdx_1[3];
                    }
                    if (selectionRange[3] < curSheet.colCount) {
                        selectionRange[3] = curSheet.colCount - 1;
                    }
                }
            }
            else {
                selectionRange = rfshRange;
            }
            var cell = void 0;
            var isExtend = void 0;
            var prevCell = void 0;
            var rowIdx = selIdx[0];
            var mergeCollection = [];
            if (curSheet.isProtected && isLockedCells(this.parent, rfshRange)) {
                this.parent.notify(editAlert, null);
                return;
            }
            if (this.copiedShapeInfo && !this.copiedInfo) {
                var pictureElem = this.copiedShapeInfo.pictureElem;
                if (pictureElem.classList.contains('e-datavisualization-chart')) {
                    this.copiedShapeInfo.chartInfo.top = null;
                    this.copiedShapeInfo.chartInfo.left = null;
                    this.parent.notify(setChart, {
                        chart: [this.copiedShapeInfo.chartInfo], isInitCell: true, isUndoRedo: true, isPaste: true,
                        dataSheetIdx: this.copiedShapeInfo.sheetIdx, isCut: this.copiedShapeInfo.isCut, sheetId: curSheet.id,
                        range: args.range || curSheet.name + "!" + curSheet.selectedRange
                    });
                }
                else {
                    this.parent.notify(createImageElement, {
                        options: {
                            src: pictureElem.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2'),
                            height: this.copiedShapeInfo.height, width: this.copiedShapeInfo.width,
                            id: this.copiedShapeInfo.isCut ? pictureElem.id : ''
                        },
                        range: getRangeAddress([rowIdx, selIdx[1], rowIdx, selIdx[1]]), isPublic: false, isUndoRedo: true
                    });
                }
                var pastedCell = getCell(rowIdx, selIdx[1], curSheet);
                if (pastedCell && !isNullOrUndefined(pastedCell.image) && pastedCell.image.length > 0) {
                    var eventArgs = {
                        requestType: 'imagePaste',
                        copiedShapeInfo: this.copiedShapeInfo,
                        pasteSheetIndex: this.parent.activeSheetIndex,
                        pastedRange: getSheetName(this.parent) + '!' + getRangeAddress([rowIdx, selIdx[1], rowIdx, selIdx[1]]),
                        pastedPictureElement: document.getElementById(pastedCell.image[pastedCell.image.length - 1].id)
                    };
                    this.parent.notify(completeAction, { eventArgs: eventArgs, action: 'clipboard' });
                }
            }
            else {
                var cRows = [];
                var isInRange = this.isInRange(cIdx_1, selIdx, copiedIdx);
                var isFullRowMerge = false;
                var isFullColMerge = false;
                var hiddenCount = 0;
                var cf = [];
                var cfRule = void 0;
                var cancel = void 0;
                if (!isRepeative && pasteType !== 'Values') {
                    cfRule = this.setCF(cIdx_1, rfshRange, prevSheet_1, curSheet, cf, cfRule);
                }
                var isUniqueCell = false;
                var uniqueCellColl = [];
                var copyCellArgs = {
                    sheet: curSheet, isExternal: !!isExternal
                };
                var pasteSetCell = this.setCell(copyCellArgs);
                var cutSetCell_1 = !isExternal && this.copiedInfo.isCut && this.setCell({ sheet: prevSheet_1 });
                var prevSheetMergeCollection = [];
                var colValidationCollection = [];
                for (var i = cIdx_1[0], l = 0; i <= cIdx_1[2]; i++, l++) {
                    if (!isExternal && !copyInfo.isCut && isFilterHidden(prevSheet_1, i)) {
                        l--;
                        hiddenCount++;
                        continue;
                    }
                    if (isInRange) {
                        cRows[selIdx[0] + l] = { cells: [] };
                    }
                    for (var j = cIdx_1[1], k = 0; j <= cIdx_1[3]; j++, k++) {
                        if (isInRange) {
                            cRows[selIdx[0] + l].cells[selIdx[1] + k] = getCell(selIdx[0] + l, selIdx[1] + k, prevSheet_1, false, true);
                        }
                        cell = isExternal ? (rows[i] && rows[i].cells[j]) || {} :
                            extend({}, (isInRange && cRows[i] && cRows[i].cells[j]) ?
                                cRows[i].cells[j] : getCell(i, j, prevSheet_1), null, true);
                        column = getColumn(prevSheet_1, j);
                        if (!cell.validation && checkColumnValidation(column, i, j)) {
                            var validation = Object.assign({}, column.validation);
                            var prevIdx = [0, cIdx_1[1], 0, cIdx_1[3]];
                            var value1 = validation.value1;
                            var value2 = validation.value2;
                            if (checkIsFormula(value1)) {
                                validation.value1 = getUpdatedFormula([i, j], prevIdx, prevSheet_1, this.parent, { formula: value1 });
                            }
                            if (checkIsFormula(value2)) {
                                validation.value2 = getUpdatedFormula([i, j], prevIdx, prevSheet_1, this.parent, { formula: value2 });
                            }
                            cell.validation = validation;
                        }
                        if (cell && cell.isReadOnly) {
                            delete cell.isReadOnly;
                        }
                        if (isRowSelected || isColSelected) {
                            if (cell && cell.rowSpan) {
                                if (cell.rowSpan > 0) {
                                    if ((cell.rowSpan + i) - 1 <= cIdx_1[2]) {
                                        isFullRowMerge = true;
                                    }
                                    else {
                                        cell = {};
                                    }
                                }
                                else if (!isFullRowMerge) {
                                    cell = {};
                                }
                                else if (cell.rowSpan < 0) {
                                    var rowSpan = cell.rowSpan;
                                    var colSpan = cell.colSpan ? cell.colSpan : 0;
                                    var spanCell = getCell(rowIdx + rowSpan, (selIdx[1] + k) + colSpan, curSheet);
                                    if (spanCell && !spanCell.rowSpan) {
                                        cell = {};
                                    }
                                }
                            }
                            if (cell && cell.colSpan) {
                                if (cell.colSpan > 0) {
                                    if ((cell.colSpan + j) - 1 <= cIdx_1[3]) {
                                        isFullColMerge = true;
                                    }
                                    else {
                                        cell = {};
                                    }
                                }
                                else if (!isFullColMerge) {
                                    cell = {};
                                }
                            }
                        }
                        if (cell && pasteType) {
                            var model = void 0;
                            switch (pasteType) {
                                case 'Formats':
                                    model = { format: cell.format, style: cell.style };
                                    if (this.copiedInfo && !this.copiedInfo.isCut) {
                                        if (cell.rowSpan) {
                                            model.rowSpan = cell.rowSpan;
                                        }
                                        if (cell.colSpan) {
                                            model.colSpan = cell.colSpan;
                                        }
                                    }
                                    cell = model;
                                    break;
                                case 'Values':
                                    cell = { value: cell.value };
                                    if (cell.value && cell.value.toString().indexOf('\n') > -1) {
                                        var ele = this.parent.getCell(selIdx[0], selIdx[1]);
                                        ele.classList.add('e-alt-unwrap');
                                    }
                                    break;
                            }
                            isExtend = ['Formats', 'Values'].indexOf(pasteType) > -1;
                        }
                        if ((!this.parent.scrollSettings.isFinite && (cIdx_1[2] - cIdx_1[0] > (1048575 - selIdx[0])
                            || cIdx_1[3] - cIdx_1[1] > (16383 - selIdx[1])))
                            || (this.parent.scrollSettings.isFinite && (cIdx_1[2] - cIdx_1[0] > (curSheet.rowCount - 1 - selIdx[0])
                                || cIdx_1[3] - cIdx_1[1] > (curSheet.colCount - 1 - selIdx[1])))) {
                            this.showDialog();
                            return;
                        }
                        if (isRepeative) {
                            for (var x = selIdx[0]; x <= selIdx[2]; x += (cIdx_1[2] - cIdx_1[0]) + 1) {
                                if (!copyInfo.isCut && !hiddenCount && isFilterHidden(curSheet, x + l)) {
                                    continue;
                                }
                                for (var y = selIdx[1]; y <= selIdx[3]; y += (cIdx_1[3] - cIdx_1[1] + 1)) {
                                    if (i === cIdx_1[0] && j === cIdx_1[1] && (cfRule === undefined || cfRule.length) &&
                                        pasteType !== 'Values') {
                                        cfRule = this.setCF(cIdx_1, [x, y, x + (cIdx_1[2] - cIdx_1[0]), y + (cIdx_1[3] - cIdx_1[1])], prevSheet_1, curSheet, cf, cfRule);
                                    }
                                    prevCell = getCell(x + l, y + k, curSheet, false, true);
                                    if (!isExternal && (!isNullOrUndefined(prevCell.colSpan) || !isNullOrUndefined(prevCell.rowSpan))) {
                                        if (isRowSelected || isColSelected) {
                                            continue;
                                        }
                                        var merge = { range: [x + l, y + k, x + l, y + k], merge: false, isAction: false, type: 'All',
                                            sheetIndex: cSIdx, preventRefresh: cSIdx !== this.parent.activeSheetIndex };
                                        mergeCollection.push(merge);
                                        this.parent.notify(setMerge, merge);
                                    }
                                    var colInd = y + k;
                                    cell = extend({}, cell ? cell : {}, null, true);
                                    if (!isExtend && this.copiedInfo && !this.copiedInfo.isCut && cell.formula) {
                                        var newFormula = getUpdatedFormula([x + l, colInd], [i, j], prevSheet_1, this.parent, isInRange ? cell : null);
                                        if (!isNullOrUndefined(newFormula)) {
                                            cell.formula = newFormula;
                                        }
                                    }
                                    if (this.copiedInfo && !this.copiedInfo.isCut && cell.validation) {
                                        var currIdx = selIdx;
                                        var prevIdx = cIdx_1;
                                        var updatedVal = getUpdatedFormula(currIdx, prevIdx, prevSheet_1, this.parent, { formula: cell.validation.value1 });
                                        cell.validation.value1 = updatedVal;
                                        if (cell.validation.value2 !== '') {
                                            updatedVal = getUpdatedFormula(currIdx, prevIdx, prevSheet_1, this.parent, { formula: cell.validation.value2 });
                                            cell.validation.value2 = updatedVal;
                                        }
                                    }
                                    if (curSheet.isProtected && cell && cell.isLocked !== false) {
                                        cell.isLocked = prevCell.isLocked;
                                    }
                                    if (prevCell && prevCell.formula && prevCell.formula.indexOf('=UNIQUE(') > -1) {
                                        this.parent.notify(removeUniquecol, null);
                                    }
                                    var uniqueFormulaArgs = {
                                        cellIdx: [i, j], isUnique: false, uniqueRange: '', sheetName: prevSheet_1.name
                                    };
                                    this.parent.notify(checkUniqueRange, uniqueFormulaArgs);
                                    if (uniqueFormulaArgs.isUnique) {
                                        cell.value = null;
                                    }
                                    isUniqueCell = false;
                                    if (cell && cell.formula && cell.formula.indexOf('=UNIQUE(') > -1) {
                                        isUniqueCell = true;
                                        uniqueCellColl.push([x, colInd]);
                                        cell.value = null;
                                    }
                                    cancel = pasteSetCell(x + l, colInd, cell, colInd === selIdx[3], isExtend, isUniqueCell, args.beforeActionData, args.isUndo);
                                    if (cancel) {
                                        continue;
                                    }
                                    if (cell.formula && this.copiedInfo && this.copiedInfo.isCut) {
                                        this.parent.notify(clearFormulaDependentCells, { cellRef: getRangeAddress([i, j, i, j]) });
                                    }
                                }
                            }
                        }
                        else {
                            if (isExternal || !hasTemplate(this.parent, i, j, copiedIdx)) {
                                if (notRemoveMerge) {
                                    pasteSetCell(rowIdx, selIdx[1] + k, { value: cell.value }, j === cIdx_1[3], true);
                                }
                                else {
                                    pasteSetCell(rowIdx, selIdx[1] + k, cell, j === cIdx_1[3], isExtend);
                                }
                            }
                        }
                        if (!isExternal && this.copiedInfo.isCut && !(inRange(selIdx, i, j) &&
                            copiedIdx === this.parent.activeSheetIndex)) {
                            var cell_1 = getCell(i, j, prevSheet_1);
                            if (cell_1) {
                                if (cell_1.isReadOnly) {
                                    continue;
                                }
                                if (cell_1.isLocked || isNullOrUndefined(cell_1.isLocked)) {
                                    if ((isRowSelected || isColSelected) && (cell_1.rowSpan !== undefined || cell_1.colSpan !== undefined)) {
                                        if (cell_1.rowSpan > 1 || cell_1.colSpan > 1) {
                                            prevSheetMergeCollection.push({ range: [i, j, i, j], rowSpan: cell_1.rowSpan, colSpan: cell_1.colSpan });
                                            cell_1 = null;
                                        }
                                        else {
                                            continue;
                                        }
                                    }
                                    else {
                                        if (!cell_1.validation && prevSheet_1.columns[j] && prevSheet_1.columns[j].validation
                                            && colValidationCollection.indexOf(j) === -1) {
                                            colValidationCollection.push(j);
                                        }
                                        cell_1 = null;
                                    }
                                }
                                else if (cell_1.isLocked === false) {
                                    if (prevSheet_1.isProtected) {
                                        cell_1 = { isLocked: false };
                                    }
                                    else {
                                        cell_1 = null;
                                    }
                                }
                            }
                            cutSetCell_1(i, j, cell_1, j === cIdx_1[3]);
                        }
                    }
                    rowIdx++;
                }
                if (prevSheetMergeCollection.length) {
                    prevSheetMergeCollection.forEach(function (mergeInfo) {
                        setCell(mergeInfo.range[0], mergeInfo.range[1], prevSheet_1, {
                            rowSpan: mergeInfo.rowSpan, colSpan: mergeInfo.colSpan
                        });
                        var mergeArgs = { range: mergeInfo.range };
                        _this.parent.notify(mergedRange, mergeArgs);
                        _this.parent.notify(setMerge, {
                            merge: false, range: mergeArgs.range, type: 'All',
                            sheetIndex: pSheetIdx_1, preventRefresh: pSheetIdx_1 !== _this.parent.activeSheetIndex
                        });
                        mergeArgs.range = mergeArgs.range;
                        for (var sRowIdx = mergeArgs.range[0]; sRowIdx <= mergeArgs.range[2]; sRowIdx++) {
                            for (var sColIdx = mergeArgs.range[1]; sColIdx <= mergeArgs.range[3]; sColIdx++) {
                                cutSetCell_1(sRowIdx, sColIdx, null);
                            }
                        }
                    });
                }
                if (colValidationCollection.length) {
                    colValidationCollection.forEach(function (colIdx) {
                        _this.parent.notify(cellValidation, { range: prevSheet_1.name + '!' + getRangeAddress([cIdx_1[0], colIdx, cIdx_1[2], colIdx]), isRemoveValidation: true });
                    });
                }
                if (uniqueCellColl.length) {
                    for (var i = 0; i < uniqueCellColl.length; i++) {
                        this.parent.serviceLocator.getService('cell').refresh(uniqueCellColl[i][0], uniqueCellColl[i][1]);
                    }
                }
                if (copyCellArgs.isRandFormula && this.parent.calculationMode === 'Automatic') {
                    this.parent.notify(workbookFormulaOperation, { action: 'refreshRandomFormula' });
                }
                this.parent.notify(refreshRibbonIcons, null);
                var hiddenDiff = rfshRange[2] - hiddenCount;
                var selHiddenDiff = selectionRange[2] - hiddenCount;
                rfshRange[2] = hiddenDiff;
                selectionRange[2] = selHiddenDiff;
                this.parent.setUsedRange(rfshRange[2], rfshRange[3]);
                var selRange = getRangeAddress(selectionRange);
                if (cSIdx === this.parent.activeSheetIndex && !args.isFromUpdateAction) {
                    this.parent.notify(selectRange, { address: selRange });
                }
                if (!isExternal && this.copiedInfo.isCut) {
                    isCut = this.copiedInfo.isCut;
                    if (copiedIdx === this.parent.activeSheetIndex) {
                        this.parent.serviceLocator.getService('cell').refreshRange(cIdx_1);
                    }
                    this.clearCopiedInfo();
                }
                if ((isExternal || isInRange) && this.copiedInfo) {
                    this.clearCopiedInfo();
                }
                var clearCFArgs = void 0;
                if (isCut) {
                    if (cfRule && cfRule.length && pasteType !== 'Values') {
                        clearCFArgs = { range: cIdx_1, sheetIdx: pSheetIdx_1, isClear: true };
                        this.parent.notify(clearCFRule, clearCFArgs);
                    }
                    //this.updateFilter(copyInfo, rfshRange);
                    setMaxHgt(prevSheet_1, cIdx_1[0], cIdx_1[1], (this.parent.getRow(cIdx_1[0], null, this.parent.frozenColCount(prevSheet_1)) || { offsetHeight: 20 }).offsetHeight);
                    var hgt = getMaxHgt(prevSheet_1, cIdx_1[0]);
                    setRowEleHeight(this.parent, prevSheet_1, hgt, cIdx_1[0]);
                }
                if (cf.length && cSIdx === this.parent.activeSheetIndex) {
                    this.parent.notify(applyCF, { cfModel: cf, isAction: true });
                }
                var copySheet = getSheet(this.parent, copiedIdx);
                if (!isExternal && cIdx_1[0] === cIdx_1[2] && cSheetSel === 'Row') {
                    var hgt = copySheet.rows[cIdx_1[0]].height;
                    for (var i = selIdx[0]; i <= selIdx[2]; i++) {
                        setRowEleHeight(this.parent, this.parent.getActiveSheet(), hgt, i);
                    }
                    if (isCut) {
                        var defaultHeight = copySheet && copySheet.standardHeight ? copySheet.standardHeight : 20;
                        setRowEleHeight(this.parent, copySheet, defaultHeight, cIdx_1[0]);
                    }
                }
                if (args.isAction) {
                    var eventArgs = {
                        requestType: 'paste',
                        copiedInfo: copyInfo,
                        mergeCollection: mergeCollection,
                        pasteSheetIndex: this.parent.activeSheetIndex,
                        copiedRange: prevSheet_1.name + '!' + (copyInfo.range ? getRangeAddress(copyInfo.range) : prevSheet_1.selectedRange),
                        pastedRange: curSheet.name + '!' + getRangeAddress(rfshRange),
                        type: pasteType || 'All',
                        selectedRange: selRange
                    };
                    if (hiddenCount) {
                        eventArgs['skipFilterCheck'] = true;
                    }
                    if (clearCFArgs && clearCFArgs.cfClearActionArgs) {
                        eventArgs['cfClearActionArgs'] = clearCFArgs.cfClearActionArgs;
                    }
                    if (cf.length) {
                        eventArgs['cfActionArgs'] = { cfModel: cf, sheetIdx: cSIdx };
                    }
                    this.parent.notify(completeAction, { eventArgs: eventArgs, action: 'clipboard' });
                }
                if (args.focus) {
                    focus(this.parent.element);
                }
            }
        }
        else {
            this.getClipboardEle().select();
        }
    };
    Clipboard.prototype.setCF = function (cRange, pRange, cSheet, pSheet, cf, conditionalFormats) {
        var _this = this;
        var cfRange;
        var indexes;
        var assignCF = function (conditionalFormat) {
            cfRange = [pRange[0] + (indexes[0] <= cRange[0] ? 0 : indexes[0] - cRange[0]),
                pRange[1] + (indexes[1] <= cRange[1] ? 0 : indexes[1] - cRange[1]),
                pRange[2] - (indexes[2] >= cRange[2] ? 0 : cRange[2] - indexes[2]),
                pRange[3] - (indexes[3] >= cRange[3] ? 0 : cRange[3] - indexes[3])];
            if (!pSheet.conditionalFormats) {
                _this.parent.setSheetPropertyOnMute(pSheet, 'conditionalFormats', []);
            }
            var cfRule = {
                range: getRangeAddress(cfRange), type: conditionalFormat.type,
                cFColor: conditionalFormat.cFColor, value: conditionalFormat.value, format: conditionalFormat.format
            };
            pSheet.conditionalFormats.push(cfRule);
            cf.push(cfRule);
        };
        if (conditionalFormats) {
            for (var i = 0, len = conditionalFormats.length; i < len; i++) {
                indexes = getRangeIndexes(conditionalFormats[i].range);
                assignCF(conditionalFormats[i]);
            }
        }
        else {
            conditionalFormats = [];
            if (cSheet.conditionalFormats) {
                for (var i = 0, len = cSheet.conditionalFormats.length; i < len; i++) {
                    indexes = getRangeIndexes(cSheet.conditionalFormats[i].range);
                    if (checkRange([cRange], cSheet.conditionalFormats[i].range)) {
                        conditionalFormats.push(cSheet.conditionalFormats[i]);
                        assignCF(cSheet.conditionalFormats[i]);
                    }
                }
            }
        }
        return conditionalFormats;
    };
    Clipboard.prototype.isRangeMerged = function (range, sheet) {
        var cell = getCell(range[0], range[1], sheet);
        if (cell && (cell.colSpan > 1 || cell.rowSpan > 1)) {
            var args = { range: range.slice(2, 4).concat(range.slice(2, 4)) };
            this.parent.notify(activeCellMergedRange, args);
            return args.range[0] === range[0] && args.range[1] === range[1] && args.range[2] === range[2] && args.range[3] === range[3];
        }
        return false;
    };
    Clipboard.prototype.updateFilter = function (copyInfo, pastedRange) {
        var isFilterCut;
        var diff;
        this.parent.notify(setFilteredCollection, null);
        for (var i = 0; i < this.parent.sheets.length; i++) {
            if (this.parent.filterCollection && this.parent.filterCollection[i] &&
                this.parent.filterCollection[i].sheetIndex === getSheetIndexFromId(this.parent, copyInfo.sId)) {
                var range = copyInfo.range;
                var fRange = getRangeIndexes(this.parent.filterCollection[i].filterRange);
                range = getSwapRange(range);
                if (fRange[0] === range[0] && fRange[2] === range[2] && fRange[1] === range[1] && fRange[3] === range[3]) {
                    isFilterCut = true;
                    diff = [Math.abs(range[0] - fRange[0]), Math.abs(range[1] - fRange[1]),
                        Math.abs(range[2] - fRange[2]), Math.abs(range[3] - fRange[3])];
                }
            }
        }
        var cell = this.parent.getCell(copyInfo.range[0], copyInfo.range[1]);
        cell = cell ? (cell.querySelector('.e-filter-icon') ? cell : this.parent.getCell(copyInfo.range[2], copyInfo.range[3])) : cell;
        var asc = cell ? cell.querySelector('.e-sortasc-filter') : cell;
        var desc = cell ? cell.querySelector('.e-sortdesc-filter') : cell;
        if (isFilterCut) {
            for (var n = 0; n < this.parent.filterCollection.length; n++) {
                var filterCol = this.parent.filterCollection[n];
                var sheetIndex = copyInfo && copyInfo.sId ? getSheetIndexFromId(this.parent, copyInfo.sId) :
                    this.parent.activeSheetIndex;
                if (filterCol.sheetIndex === sheetIndex) {
                    this.parent.notify(initiateFilterUI, { predicates: null, range: filterCol.filterRange, sIdx: sheetIndex, isCut: true });
                }
                if (filterCol.sheetIndex === sheetIndex && sheetIndex === this.parent.activeSheetIndex) {
                    diff = [pastedRange[0] + diff[0], pastedRange[1] + diff[1],
                        Math.abs(pastedRange[2] - diff[2]), Math.abs(pastedRange[3] - diff[3])];
                    this.parent.notify(initiateFilterUI, { predicates: null, range: getRangeAddress(diff), sIdx: null, isCut: true });
                    if (copyInfo.range[3] === copyInfo.range[1]) { // To update sorted icon after pasting.
                        var filteredCell = this.parent.getCell(pastedRange[0], pastedRange[1]);
                        if (asc && filteredCell) {
                            filteredCell.querySelector('.e-filter-icon').classList.add('e-sortasc-filter');
                        }
                        if (desc && filteredCell) {
                            filteredCell.querySelector('.e-filter-icon').classList.add('e-sortdesc-filter');
                        }
                    }
                }
            }
        }
    };
    Clipboard.prototype.isInRange = function (cRng, pRng, sIdx) {
        var activeSheetIndex = this.parent.activeSheetIndex;
        return (inRange(cRng, pRng[0], pRng[1]) && sIdx === activeSheetIndex) ||
            (inRange(cRng, pRng[2], pRng[3]) && sIdx === activeSheetIndex);
    };
    Clipboard.prototype.setCell = function (args) {
        var _this = this;
        var sheet = args.sheet;
        var uiRefresh = sheet.name === this.parent.getActiveSheet().name;
        return function (rIdx, cIdx, cell, lastCell, isExtend, isUniqueCell, actionData, isUndo) {
            if (cell && cell.formula && (cell.formula.indexOf('RANDBETWEEN(') > -1 || cell.formula.indexOf('RAND(') > -1 ||
                cell.formula.indexOf('NOW(') > -1)) {
                args.isRandFormula = true;
            }
            var cancel = updateCell(_this.parent, sheet, {
                cell: cell, rowIdx: rIdx, colIdx: cIdx, pvtExtend: !isExtend, valChange: !isUniqueCell, lastCell: lastCell,
                uiRefresh: uiRefresh, requestType: 'paste', skipFormatCheck: !args.isExternal, isRandomFormula: args.isRandFormula
            }, actionData, isUndo);
            if (!cancel && cell && cell.style && args.isExternal) {
                var hgt = getTextHeightWithBorder(_this.parent, rIdx, cIdx, sheet, cell.style || _this.parent.cellStyle, cell.wrap ? getLines(_this.parent.getDisplayText(cell), getExcludedColumnWidth(sheet, rIdx, cIdx, cell.colSpan > 1 ? cIdx + cell.colSpan - 1 : cIdx), cell.style, _this.parent.cellStyle) : 1);
                hgt = Math.round(hgt);
                if (hgt < 20) {
                    hgt = 20; // default height
                }
                setMaxHgt(sheet, rIdx, cIdx, hgt);
                var prevHeight = getRowsHeight(sheet, rIdx);
                var maxHgt = getMaxHgt(sheet, rIdx);
                var heightChanged = maxHgt > prevHeight;
                if (heightChanged) {
                    setRowEleHeight(_this.parent, sheet, maxHgt, rIdx);
                }
            }
            return cancel;
        };
    };
    Clipboard.prototype.getCopiedIdx = function () {
        if (this.copiedInfo) {
            for (var i = 0; i < this.parent.sheets.length; i++) {
                if (this.parent.sheets[i].id === this.copiedInfo.sId) {
                    return i;
                }
            }
            this.clearCopiedInfo();
        }
        return -1;
    };
    Clipboard.prototype.setCopiedInfo = function (args, isCut) {
        var _this = this;
        if (this.parent.isEdit) {
            return;
        }
        var deferred = new Deferred();
        args.promise = deferred.promise;
        var sheet = this.parent.getActiveSheet();
        var range;
        if (args && args.range) {
            var isRowSelected = (args.range[1] === 0 && args.range[3] === sheet.colCount - 1);
            var isColSelected = (args.range[0] === 0 && args.range[2] === sheet.rowCount - 1);
            var mergeArgs = { range: args.range };
            if (!(isRowSelected || isColSelected)) {
                this.parent.notify(mergedRange, mergeArgs);
            }
            range = mergeArgs.range;
        }
        else {
            range = getRangeIndexes(sheet.selectedRange);
        }
        if (isCut && isReadOnlyCells(this.parent, range)) {
            this.parent.notify(readonlyAlert, null);
            return;
        }
        if (args && !args.isPublic && !args.clipboardData) {
            var eventArgs = { copiedRange: sheet.name + "!" + getRangeAddress(range), cancel: false, action: isCut ? 'cut' : 'copy' };
            this.parent.notify(beginAction, eventArgs);
            if (eventArgs.cancel) {
                return;
            }
        }
        var option = {
            sheet: sheet, indexes: [0, 0, sheet.rowCount - 1, sheet.colCount - 1], isFinite: this.parent.scrollSettings.isFinite,
            promise: new Promise(function (resolve) { resolve((function () { })()); })
        };
        var pictureElements = document.getElementsByClassName('e-ss-overlay-active');
        var pictureLen = pictureElements.length;
        if (sheet.isLocalData && !(args && args.clipboardData) && range[0] === 0 && range[2] === (sheet.rowCount - 1) && !pictureLen) {
            this.parent.showSpinner();
            this.parent.notify('updateSheetFromDataSource', option);
        }
        this.checkForUncalculatedFormula(range, (args && args.sId) ? args.sId : sheet.id);
        option.promise.then(function () {
            if (pictureLen > 0) {
                var imgRowIdx = {
                    clientY: pictureElements[0].offsetTop,
                    isImage: true
                };
                _this.parent.notify(getRowIdxFromClientY, imgRowIdx);
                var imgColIdx = {
                    clientX: pictureElements[0].offsetLeft,
                    isImage: true
                };
                _this.parent.notify(getColIdxFromClientX, imgColIdx);
                _this.copiedShapeInfo = {
                    sId: (args && args.sId) ? args.sId : sheet.id, sheetIdx: sheet.index, isCut: isCut, pictureElem: pictureElements[0], copiedRange: getRangeAddress([imgRowIdx.clientY, imgColIdx.clientX,
                        imgRowIdx.clientY, imgColIdx.clientX]), height: pictureElements[0].offsetHeight,
                    width: pictureElements[0].offsetWidth,
                    chartInfo: _this.getChartElemInfo(pictureElements[0])
                };
                if (!pictureElements[0].classList.contains('e-datavisualization-chart')) {
                    var imgURL = window.getComputedStyle(pictureElements[0]).backgroundImage.slice(5, -2);
                    _this.addImgToClipboard(imgURL, _this.copiedShapeInfo.height, _this.copiedShapeInfo.width);
                }
                _this.hidePaste(true);
                if (isCut) {
                    if (pictureElements[0].classList.contains('e-datavisualization-chart')) {
                        _this.parent.deleteChart(_this.copiedShapeInfo.chartInfo.id);
                    }
                    else {
                        _this.parent.notify(deleteImage, {
                            id: _this.copiedShapeInfo.pictureElem.id, sheetIdx: _this.copiedShapeInfo.sId,
                            range: _this.copiedShapeInfo.copiedRange
                        });
                    }
                }
            }
            else if (!(args && args.clipboardData)) {
                if (_this.copiedInfo) {
                    _this.clearCopiedInfo();
                }
                _this.copiedInfo = {
                    range: range, sId: (args && args.sId) ? args.sId : sheet.id, isCut: isCut
                };
                _this.hidePaste(true);
                if (!args.isFromUpdateAction) {
                    _this.initCopyIndicator();
                }
                if (!Browser.isIE) {
                    _this.getClipboardEle().select();
                }
                if (args && args.invokeCopy) {
                    document.execCommand(isCut ? 'cut' : 'copy');
                }
                _this.parent.hideSpinner();
            }
            if (Browser.isIE) {
                _this.setExternalCells(args, isCut);
            }
            deferred.resolve();
        });
        if (args && args.clipboardData) {
            this.setExternalCells(args, isCut);
            this.getClipboardEle().setAttribute('aria-label', sheet.selectedRange + " " + this.parent.serviceLocator.getService(locale).getConstant(isCut ? 'Cut' : 'Copy'));
        }
    };
    Clipboard.prototype.imageToCanvas = function (src, height, width) {
        return new Promise(function (res) {
            var canvas = document.createElement('canvas');
            var canvasCtx = canvas.getContext('2d');
            var img = new Image();
            img.src = src;
            img.crossOrigin = 'anonymous';
            img.onload = function () {
                canvas.width = width;
                canvas.height = height;
                canvasCtx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(function (blob) {
                    res(blob);
                }, 'image/png');
            };
        });
    };
    Clipboard.prototype.addImgToClipboard = function (src, height, width) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, navigator, imageBlob;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        navigator = window.navigator;
                        return [4 /*yield*/, this.imageToCanvas(src, height, width)];
                    case 1:
                        imageBlob = _b.sent();
                        return [4 /*yield*/, navigator.clipboard.write([new ClipboardItem((_a = {}, _a[imageBlob.type] = imageBlob, _a))])];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Clipboard.prototype.checkForUncalculatedFormula = function (range, sheetId) {
        var cell;
        var sheetIdx = getSheetIndexFromId(this.parent, sheetId);
        var sheet = getSheet(this.parent, sheetIdx);
        for (var i = range[0]; i <= range[2]; i++) {
            for (var j = range[1]; j <= range[3]; j++) {
                cell = getCell(i, j, sheet, null, true);
                if (cell.formula && isUndefined(cell.value)) {
                    this.parent.notify(workbookFormulaOperation, {
                        action: 'refreshCalculate', value: cell.formula, rowIndex: i, colIndex: j, isFormula: checkIsFormula(cell.formula), sheetIndex: sheetIdx
                    });
                }
            }
        }
    };
    Clipboard.prototype.getChartElemInfo = function (overlayEle) {
        var chartColl = this.parent.chartColl;
        if (overlayEle.classList.contains('e-datavisualization-chart')) {
            var chartId = overlayEle.getElementsByClassName('e-control')[0].id;
            for (var idx = 0; idx < chartColl.length; idx++) {
                if (chartColl[idx].id === chartId) {
                    var chart = chartColl[idx];
                    return chart;
                }
            }
        }
        return null;
    };
    Clipboard.prototype.clearCopiedInfo = function () {
        if (this.copiedInfo) {
            if (this.parent.getActiveSheet().id === this.copiedInfo.sId) {
                this.removeIndicator(this.parent.getSelectAllContent());
                this.removeIndicator(this.parent.getColumnHeaderContent());
                this.removeIndicator(this.parent.getRowHeaderContent());
                this.removeIndicator(this.parent.getMainContent());
            }
            this.copiedInfo = null;
            this.hidePaste();
        }
        if (this.copiedShapeInfo) {
            this.copiedShapeInfo = null;
            this.hidePaste();
        }
    };
    Clipboard.prototype.removeIndicator = function (ele) {
        if (ele) {
            var indicator = ele.getElementsByClassName('e-copy-indicator')[0];
            if (indicator) {
                detach(indicator);
            }
        }
    };
    Clipboard.prototype.initCopyIndicator = function () {
        if (this.copiedInfo && this.parent.getActiveSheet().id === this.copiedInfo.sId) {
            var copyIndicator = this.parent.createElement('div', { className: 'e-copy-indicator' });
            copyIndicator.appendChild(this.parent.createElement('div', { className: 'e-top' }));
            copyIndicator.appendChild(this.parent.createElement('div', { className: 'e-bottom' }));
            copyIndicator.appendChild(this.parent.createElement('div', { className: 'e-left' }));
            copyIndicator.appendChild(this.parent.createElement('div', { className: 'e-right' }));
            setPosition(this.parent, copyIndicator, this.copiedInfo.range, 'e-copy-indicator');
        }
    };
    Clipboard.prototype.showDialog = function () {
        var _this = this;
        this.parent.serviceLocator.getService(dialog).show({
            header: 'Spreadsheet',
            height: 205, width: 340, isModal: true, showCloseIcon: true,
            content: this.parent.serviceLocator.getService(locale).getConstant('PasteAlert'),
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'PasteDialog',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
            }
        });
    };
    Clipboard.prototype.hidePaste = function (isShow) {
        if (this.parent.getActiveSheet().isProtected) {
            isShow = false;
        }
        this.parent.notify(enableToolbarItems, [{ items: [this.parent.element.id + '_paste'], enable: isShow || false }]);
    };
    Clipboard.prototype.setExternalCells = function (args, isCut) {
        var cell;
        var val;
        var text = '';
        var cellStyle;
        var sheet = this.parent.getActiveSheet();
        var range = getSwapRange(this.copiedInfo.range);
        var isRowSelected = range[1] === 0 && range[3] === sheet.colCount - 1;
        var isColSelected = range[0] === 0 && range[2] === sheet.rowCount - 1;
        var data = '<html><body><table class="e-spreadsheet" xmlns="http://www.w3.org/1999/xhtml" style="border-collapse:collapse;"';
        if (isRowSelected || isColSelected) {
            data += " aria-rowcount=\"" + sheet.usedRange.rowIndex + "\" aria-colcount=\"" + sheet.usedRange.colIndex + "\"";
            data += " aria-label=\"" + (isRowSelected && isColSelected ? 'Sheet' : isRowSelected ? 'Row' : 'Column') + "\"";
        }
        data += '><tbody>';
        for (var i = range[0]; i <= range[2]; i++) {
            if (!isCut && isFilterHidden(sheet, i)) {
                continue;
            }
            data += '<tr>';
            for (var j = range[1]; j <= range[3]; j++) {
                cell = getCell(i, j, sheet, false, true);
                if (cell.colSpan < 0 || cell.rowSpan < 0) {
                    continue;
                }
                data += '<td';
                if (cell.colSpan) {
                    data += ' colspan="' + cell.colSpan + '"';
                }
                if (cell.rowSpan) {
                    data += ' rowspan="' + cell.rowSpan + '"';
                }
                if (cell.style) {
                    cellStyle = '';
                    if (!cell.style['whiteSpace']) {
                        cellStyle += 'white-space:' + (cell.wrap ? 'normal' : 'nowrap') + ';';
                    }
                    if (!cell.style.verticalAlign) {
                        cellStyle += 'vertical-align:bottom;';
                    }
                    Object.keys(cell.style).forEach(function (style) {
                        var cellStyleValue = cell.style["" + style];
                        if (style.includes('border') && cellStyleValue.includes('dashed') && cellStyleValue.includes('1px')) {
                            cellStyleValue = cellStyleValue.replace('1px', 'thin');
                        }
                        var regex = style.match(/[A-Z]/);
                        cellStyle += (style === 'backgroundColor' ? 'background' : (regex ? style.replace(regex[0], '-'
                            + regex[0].toLowerCase()) : style)) + ':' + ((style === 'backgroundColor' || style === 'color')
                            ? cell.style["" + style].slice(0, 7) : cellStyleValue) + ';';
                    });
                    data += cellStyle.includes('"') ? " style='" + cellStyle + "'" : " style=\"" + cellStyle + "\"";
                }
                else {
                    data += ' style="white-space:' + (cell.wrap ? 'normal' : 'nowrap') + ';vertical-align:bottom;"';
                }
                if (!isNullOrUndefined(cell.value)) {
                    val = cell.value;
                    if (cell.format && cell.format !== 'General') {
                        data += cell.value.toString().includes('"') ? ' cell-value=\'' + val + '\'' : ' cell-value="' + cell.value + '"';
                        data += cell.format.includes('"') ? ' num-format=\'' + cell.format + '\'' : ' num-format="' + cell.format + '"';
                        var eventArgs = { formattedText: val, value: val, format: cell.format, cell: cell, rowIndex: i,
                            colIndex: j, dataUpdate: true };
                        this.parent.notify(getFormattedCellObject, eventArgs);
                        val = eventArgs.formattedText;
                    }
                    data += '>';
                    if (typeof val === 'string' && val.includes('\n')) {
                        data += val.split('\n').join('<br>');
                    }
                    else {
                        data += val;
                    }
                    text += val;
                    data += '</td>';
                }
                else {
                    data += '></td>';
                }
                text += j === range[3] ? '' : '\t';
            }
            data += '</tr>';
            text += i === range[2] ? '' : '\n';
        }
        data += '</tbody></table></body></html>';
        if (Browser.isIE) {
            window['clipboardData'].setData('text', text);
            if (isCut) {
                window['clipboardData'].setData('isInternalCut', text);
            }
        }
        else {
            args.clipboardData.setData('text/html', data);
            args.clipboardData.setData('text/plain', text);
            if (isCut) {
                args.clipboardData.setData('isInternalCut', text);
            }
            args.preventDefault();
        }
    };
    Clipboard.prototype.getExternalCells = function (args) {
        var _this = this;
        var html;
        var text;
        var rows = [];
        var pasteModelArgs = { model: rows };
        var ele = this.parent.createElement('span');
        var clearClipboard = function () { return setTimeout(function () { _this.getClipboardEle().innerHTML = ''; }, 0); };
        if (Browser.isIE) {
            text = window['clipboardData'].getData('text');
        }
        else {
            html = args.clipboardData.getData('text/html');
            text = args.clipboardData.getData('text/plain');
            if (this.copiedInfo && html.includes('<table class="e-spreadsheet"')) {
                var isFilteredRange = false;
                if (!this.copiedInfo.isCut) {
                    var filterArgs = { sheetIdx: getSheetIndexFromId(this.parent, this.copiedInfo.sId) };
                    this.parent.notify(getFilterRange, filterArgs);
                    if (filterArgs.isFiltered) {
                        var indexes = filterArgs.filterRange;
                        var copyIndexes = this.copiedInfo.range;
                        isFilteredRange = indexes[0] === copyIndexes[0] && indexes[1] === copyIndexes[1] && indexes[2] === copyIndexes[2] &&
                            indexes[3] === copyIndexes[3];
                    }
                }
                if (!isFilteredRange) {
                    clearClipboard();
                    return { internal: true };
                }
            }
            ele.innerHTML = html;
        }
        if (ele.querySelector('table')) {
            this.generateCells(ele, pasteModelArgs);
        }
        else if (ele.querySelector('img')) {
            var img = ele.querySelector('img');
            this.parent.notify(createImageElement, { options: { src: img.src, height: img.height, width: img.width }, isPublic: true });
        }
        else if (text) {
            var cells_1 = [];
            var cellStyle_1;
            var childArr_1;
            var filteredChild_1;
            if (html) {
                childArr_1 = [].slice.call(ele.children);
            }
            var getStyle_1 = this.cellStyle(ele);
            pasteModelArgs.colCount = 1;
            text.split('\n').forEach(function (row) {
                cellStyle_1 = null;
                if (html) {
                    filteredChild_1 = childArr_1.filter(function (elem) { return elem.textContent && elem.textContent.replace(/(\r\n|\n|\r|\s)/gm, ' ').trim() === row.trim(); })[0];
                    if (filteredChild_1) {
                        cellStyle_1 = getStyle_1(filteredChild_1);
                        childArr_1.splice(childArr_1.indexOf(filteredChild_1), 1);
                    }
                }
                row.split('\t').forEach(function (col, j) {
                    if (col || cellStyle_1) {
                        cells_1[j] = {};
                        if (cellStyle_1) {
                            if (cellStyle_1.whiteSpace &&
                                cellStyle_1.whiteSpace !== 'nowrap') {
                                cells_1[j].wrap = true;
                                delete cellStyle_1['whiteSpace'];
                                if (Object.keys(cellStyle_1).length) {
                                    cells_1[j].style = cellStyle_1;
                                }
                            }
                            else {
                                cells_1[j].style = cellStyle_1;
                            }
                        }
                        if (col) {
                            if (checkIsFormula(col)) {
                                cells_1[j].formula = col;
                            }
                            else {
                                cells_1[j].value = parseIntValue(col.trim(), true, true);
                            }
                        }
                    }
                });
                rows.push({ cells: cells_1 });
                pasteModelArgs.colCount = Math.max(pasteModelArgs.colCount, cells_1.length);
                cells_1 = [];
            });
            pasteModelArgs.rowCount = rows.length;
            pasteModelArgs.usedRowIndex = rows.length - 1;
            pasteModelArgs.usedColIndex = pasteModelArgs.colCount - 1;
        }
        else if (args.clipboardData.files && args.clipboardData.files[0] && args.clipboardData.files[0].type.includes('image')) {
            clearClipboard();
            return { file: args.clipboardData.files[0] };
        }
        clearClipboard();
        return pasteModelArgs;
    };
    Clipboard.prototype.generateCells = function (ele, pasteModelArgs) {
        var rows = pasteModelArgs.model;
        var table = ele.querySelector('table');
        var isSpreadsheet = table.classList.contains('e-spreadsheet');
        var tableStyleObj = {};
        var rowStyleObj = {};
        pasteModelArgs.usedRowIndex = table.rows.length - 1;
        pasteModelArgs.rowCount = table.rows.length;
        if (isSpreadsheet) {
            pasteModelArgs.selection = table.getAttribute('aria-label');
            if (pasteModelArgs.selection) {
                if (pasteModelArgs.selection === 'Sheet') {
                    pasteModelArgs.usedRowIndex = Number(table.getAttribute('aria-rowcount'));
                    pasteModelArgs.usedColIndex = Number(table.getAttribute('aria-colcount'));
                }
                else if (pasteModelArgs.selection === 'Row') {
                    pasteModelArgs.usedColIndex = Number(table.getAttribute('aria-colcount'));
                }
                else {
                    pasteModelArgs.usedRowIndex = Number(table.getAttribute('aria-rowcount'));
                }
            }
        }
        var tableStyles = [];
        if (!isNullOrUndefined(table)) {
            if (!isNullOrUndefined(table.getAttribute('style'))) {
                tableStyles.push(table.getAttribute('style'));
                this.generateStyles(tableStyles, tableStyleObj);
            }
        }
        var getStyle = this.cellStyle(ele, isSpreadsheet);
        var tr;
        var cells;
        var cellStyle;
        var td;
        var cellCount = 1;
        var colLen;
        var formatStr;
        var curColIdx;
        pasteModelArgs.colCount = 1;
        var rowStyles = [];
        for (var rowIdx = 0, rowLen = pasteModelArgs.usedRowIndex; rowIdx <= rowLen; rowIdx++) {
            tr = table.rows[rowIdx];
            if (!isNullOrUndefined(tr.getAttribute('style'))) {
                rowStyles.push(tr.getAttribute('style'));
                this.generateStyles(rowStyles, rowStyleObj);
            }
            if (!rows[rowIdx]) {
                rows[rowIdx] = { cells: [] };
            }
            cells = rows[rowIdx].cells;
            pasteModelArgs.colCount = Math.max(pasteModelArgs.colCount, tr.cells.length);
            colLen = pasteModelArgs.usedColIndex < tr.cells.length ? pasteModelArgs.usedColIndex : tr.cells.length - 1;
            for (var colIdx = 0; colIdx <= colLen; colIdx++) {
                td = tr.cells[colIdx];
                curColIdx = colIdx;
                if (cells[colIdx]) {
                    colIdx = this.getNewIndex(cells, colIdx);
                }
                cells[colIdx] = {};
                cellStyle = getStyle(td, rowStyleObj, tableStyleObj);
                td.textContent = td.textContent.replace(/(\r\n|\n|\r)/gm, '');
                td.textContent = td.textContent.replace(/\s+/g, ' ');
                if (cellStyle.whiteSpace &&
                    cellStyle.whiteSpace !== 'nowrap') {
                    cells[colIdx].wrap = true;
                    delete cellStyle['whiteSpace'];
                }
                if (Object.keys(cellStyle).length) {
                    if (cellStyle.border) {
                        ['borderBottom', 'borderTop', 'borderLeft', 'borderRight'].forEach(function (prop) {
                            cellStyle["" + prop] = cellStyle.border;
                        });
                        delete cellStyle.border;
                    }
                    cells[colIdx].style = cellStyle;
                }
                if (td.textContent) {
                    cells[colIdx].value = parseIntValue(td.textContent.trim(), true, true);
                }
                formatStr = isSpreadsheet ? 'num-format' : 'number-format';
                if (td.getAttribute(formatStr)) {
                    cells[colIdx].format = td.getAttribute(formatStr);
                    if (cells[colIdx].value && td.getAttribute('cell-value')) {
                        cells[colIdx].value = parseIntValue(td.getAttribute('cell-value').trim(), true, true);
                    }
                }
                if (td.getAttribute('colspan') && parseInt(td.getAttribute('colspan'), 10) > 1) {
                    cells[colIdx].colSpan = parseInt(td.getAttribute('colspan'), 10);
                }
                if (td.getAttribute('rowspan') && parseInt(td.getAttribute('rowspan'), 10) > 1) {
                    cells[colIdx].rowSpan = parseInt(td.getAttribute('rowspan'), 10);
                }
                if (cells[colIdx].colSpan > 1 && cells[colIdx].rowSpan > 1) {
                    var cell = void 0;
                    for (var k = rowIdx, len = rowIdx + cells[colIdx].rowSpan; k < len; k++) {
                        for (var l = colIdx, len_1 = colIdx + cells[colIdx].colSpan; l < len_1; l++) {
                            if (k === rowIdx && l === colIdx) {
                                continue;
                            }
                            cell = cells[colIdx].style ? { style: extend({}, cells[colIdx].style) } : {};
                            if (k !== rowIdx) {
                                cell.rowSpan = rowIdx - k;
                            }
                            if (l !== colIdx) {
                                cell.colSpan = colIdx - l;
                            }
                            if (!rows[k]) {
                                rows[k] = { cells: [] };
                            }
                            rows[k].cells[l] = cell;
                        }
                    }
                }
                else if (cells[colIdx].colSpan > 1) {
                    for (var k = colIdx + 1, len = colIdx + cells[colIdx].colSpan; k < len; k++) {
                        cells[k] = { colSpan: colIdx - k, style: extend({}, cellStyle) };
                    }
                }
                else if (cells[colIdx].rowSpan > 1) {
                    for (var k = rowIdx + 1, len = rowIdx + cells[colIdx].rowSpan; k < len; k++) {
                        if (!rows[k]) {
                            rows[k] = { cells: [] };
                        }
                        rows[k].cells[colIdx] = { rowSpan: rowIdx - k, style: extend({}, cellStyle) };
                    }
                }
                colIdx = curColIdx;
            }
            cellCount = Math.max(cellCount, cells.length);
        }
        pasteModelArgs.usedColIndex = cellCount - 1;
    };
    Clipboard.prototype.getNewIndex = function (cells, index) {
        if (cells[index]) {
            index++;
            index = this.getNewIndex(cells, index);
        }
        return index;
    };
    Clipboard.prototype.cellStyle = function (ele, isSpreadsheet) {
        var _this = this;
        var eleStyle;
        var commonStyle;
        if (!isSpreadsheet) {
            eleStyle = ele.querySelector('style') && ele.querySelector('style').innerHTML;
            var keys = Object.keys(this.parent.commonCellStyle);
            if (keys && keys.length && eleStyle) {
                var tdStyle = eleStyle.includes('td') ? eleStyle.split('td')[1] : eleStyle;
                tdStyle = tdStyle.includes('{') ? tdStyle.split('{')[1].split('}')[0] : tdStyle.split('}')[0];
                commonStyle = {};
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var regex = key.match(/[A-Z]/);
                    if (regex) {
                        key = key.replace(regex[0], '-' + regex[0].toLowerCase());
                    }
                    if (tdStyle.indexOf(key) > -1) {
                        commonStyle[keys[i]] = tdStyle.split(key + ':')[1].split(';')[0].trim();
                    }
                }
            }
        }
        return function (td, rowStyleObj, tableStyleObj) {
            var cellStyle = {};
            var styles;
            if (isSpreadsheet) {
                if (td.getAttribute('style')) {
                    styles = td.getAttribute('style').split(';');
                }
                else {
                    return cellStyle;
                }
            }
            else {
                styles = [];
                if (eleStyle && td.className && eleStyle.includes(td.classList[0])) {
                    var styleTagCSS = eleStyle.split(td.classList[0]);
                    styles.push(styleTagCSS[styleTagCSS.length - 1].split('{')[1].split('}')[0]);
                }
                var nodeList = [].slice.call(td.querySelectorAll('*'));
                nodeList.unshift(td);
                nodeList.forEach(function (node) {
                    if (node.getAttribute('style')) {
                        styles.push(node.getAttribute('style'));
                    }
                    if (node.tagName === 'B') {
                        styles.push('font-weight:bold');
                    }
                    if (node.tagName === 'I') {
                        styles.push('font-style:italic');
                    }
                    if (node.tagName === 'U') {
                        styles.push('text-decoration:underline');
                    }
                });
                Object.assign(cellStyle, tableStyleObj, rowStyleObj, commonStyle);
            }
            if (styles.length) {
                _this.generateStyles(styles, cellStyle);
            }
            if (td.querySelector('S')) {
                cellStyle.textDecoration = cellStyle.textDecoration ? 'underline line-through' : 'line-through';
            }
            if (cellStyle.textDecoration &&
                ['underline', 'line-through', 'underline line-through', 'none'].indexOf(cellStyle.textDecoration) === -1) {
                cellStyle.textDecoration = 'none';
            }
            if (cellStyle.textAlign && ['left', 'center', 'right'].indexOf(cellStyle.textAlign) === -1) {
                cellStyle.textAlign = 'left';
            }
            if (cellStyle.verticalAlign && ['bottom', 'middle', 'top'].indexOf(cellStyle.verticalAlign) === -1) {
                cellStyle.verticalAlign = 'bottom';
            }
            if (cellStyle.fontSize) {
                cellStyle.fontSize = Math.round(parseFloat((cellStyle.fontSize.indexOf('px') > -1) ? (parseFloat(cellStyle.fontSize) * 0.75).toString() :
                    ((cellStyle.fontSize.indexOf('em') > -1) ? (parseFloat(cellStyle.fontSize) * 16 / 1.3333).toString() : cellStyle.fontSize))) + 'pt';
            }
            if (cellStyle.fontWeight && ['bold', 'normal'].indexOf(cellStyle.fontWeight) === -1) {
                cellStyle.fontWeight = cellStyle.fontWeight > '599' ? 'bold' : 'normal';
            }
            return cellStyle;
        };
    };
    Clipboard.prototype.generateStyles = function (styles, styleObj) {
        var index;
        var value;
        var splitValue;
        var splitBorder;
        var borderSize;
        // `styleAttr` holds the `CSS` property and `styleValue` holds its corresponding `JS` property in same order, common for border.
        var styleAttr = ['font-family', 'vertical-align', 'text-align', 'text-indent', 'color', 'white-space',
            'font-weight', 'font-style', 'font-size', 'text-decoration', 'background', 'background-color'];
        var styleValue = ['fontFamily', 'verticalAlign', 'textAlign', 'textIndent', 'color', 'whiteSpace', 'fontWeight',
            'fontStyle', 'fontSize', 'textDecoration', 'backgroundColor', 'backgroundColor'];
        var borderAttr = ['border-bottom', 'border-top', 'border-right', 'border-left', 'border'];
        var borderValue = ['borderBottom', 'borderTop', 'borderRight', 'borderLeft', 'border'];
        if (styles && styles.length) {
            styles.forEach(function (styles) {
                styles.split(';').forEach(function (style) {
                    value = style.split(':')[0].trim();
                    index = styleAttr.indexOf(value);
                    if (index > -1) {
                        value = style.split(':')[1].trim();
                        styleObj[styleValue[index]] = value;
                    }
                    else {
                        index = borderAttr.indexOf(value);
                        if (index > -1) {
                            value = style.split(':')[1].trim();
                            if (value === 'none') {
                                value = undefined;
                            }
                            else if (value.includes('pt')) {
                                splitValue = value.split('pt');
                                splitBorder = splitValue[0].split(' ');
                                for (var i = 0; i < splitBorder.length; i++) {
                                    borderSize = parseFloat(splitBorder[i]);
                                    if (borderSize) {
                                        splitBorder.splice(i, 1);
                                        splitBorder.unshift((borderSize / 0.75).toFixed(2) + 'px');
                                        splitValue[0] = splitBorder.join(' ');
                                        break;
                                    }
                                }
                                value = splitValue.join('');
                            }
                            styleObj[borderValue[index]] = value;
                        }
                    }
                });
            });
        }
    };
    Clipboard.prototype.refreshOnInsertDelete = function (args) {
        if (this.copiedInfo) {
            if (args.model.id !== this.copiedInfo.sId) {
                return;
            }
            var range = this.copiedInfo.range;
            if (args.isInsert) {
                if (args.modelType === 'Column') {
                    if (args.start <= range[3]) {
                        if (args.start <= range[1]) {
                            var len = args.end - args.start + 1;
                            range[1] += len;
                            range[3] += len;
                        }
                        else {
                            range[3] = range[1] + (args.start - range[1] - 1);
                        }
                        this.performAction();
                    }
                }
                else {
                    if (args.start <= range[2]) {
                        if (args.start <= range[0]) {
                            var len = args.end - args.start + 1;
                            range[0] += len;
                            range[2] += len;
                        }
                        else {
                            range[2] = range[1] + (args.start - range[1] - 1);
                        }
                        this.performAction();
                    }
                }
            }
            else {
                this.clearCopiedInfo();
            }
        }
    };
    Clipboard.prototype.performAction = function () {
        var copyIndicator = this.getCopyIndicator();
        if (copyIndicator) {
            setPosition(this.parent, copyIndicator, this.copiedInfo.range, 'e-copy-indicator');
        }
    };
    Clipboard.prototype.getClipboardEle = function () {
        return this.parent.element.getElementsByClassName('e-clipboard')[0];
    };
    Clipboard.prototype.getCopyIndicator = function () {
        return this.parent.element.getElementsByClassName('e-copy-indicator')[0];
    };
    Clipboard.prototype.getModuleName = function () {
        return 'clipboard';
    };
    Clipboard.prototype.destroy = function () {
        this.removeEventListener();
        var ele = this.getClipboardEle();
        detach(ele);
        this.parent = null;
    };
    return Clipboard;
}());
export { Clipboard };
