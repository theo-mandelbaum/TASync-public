var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { locale, deleteImage, createImageElement, positionAutoFillElement, showAggregate, paste, undoRedoForChartDesign, cut, copy } from '../../spreadsheet/index';
import { performUndoRedo, updateUndoRedoCollection, enableToolbarItems, completeAction, isColumnRange } from '../common/index';
import { setActionData, getBeforeActionData, updateAction } from '../common/index';
import { setUndoRedo, getUpdateUsingRaf } from '../common/index';
import { selectRange, clearUndoRedoCollection, setMaxHgt, getMaxHgt, setRowEleHeight } from '../common/index';
import { getRangeFromAddress, getRangeIndexes, workbookEditOperation, clearCFRule, isHeightCheckNeeded, getRow, getColumn, checkColumnValidation } from '../../workbook/index';
import { getSheet, checkUniqueRange, reApplyFormula, getCellAddress, getSwapRange, setColumn } from '../../workbook/index';
import { getIndexesFromAddress, getSheetNameFromAddress, updateSortedDataOnCell, getSheetIndexFromAddress } from '../../workbook/index';
import { sortComplete, isImported, cellValidation } from '../../workbook/index';
import { getCell, setCell, getSheetIndex, wrapEvent, getSheetIndexFromId } from '../../workbook/index';
import { setMerge, getRangeAddress, replaceAll, applyCellFormat } from '../../workbook/index';
import { addClass, extend, isNullOrUndefined, isObject, isUndefined, select } from '@syncfusion/ej2-base';
import { setCellFormat, refreshRibbonIcons, isFilterHidden, getRowHeight } from '../../workbook/index';
import { getColIndex, beginAction, updateCFModel, applyCF } from '../../workbook/index';
import { sheetRenameUpdate } from '../../workbook/common/index';
/**
 * UndoRedo module allows to perform undo redo functionalities.
 */
var UndoRedo = /** @class */ (function () {
    function UndoRedo(parent) {
        this.undoCollection = [];
        this.redoCollection = [];
        this.isUndo = false;
        this.undoRedoStep = 100;
        this.parent = parent;
        this.addEventListener();
    }
    UndoRedo.prototype.setActionData = function (options) {
        var sheet = this.parent.getActiveSheet();
        var address;
        var cells = [];
        var cutCellDetails = [];
        var args = options.args;
        var eventArgs = args.eventArgs;
        var copiedInfo = {};
        switch (args.action) {
            case 'format':
                address = getRangeIndexes(args.eventArgs.range);
                break;
            case 'clipboard':
                copiedInfo = eventArgs.copiedInfo;
                address = getRangeIndexes(getRangeFromAddress(eventArgs.pastedRange));
                if (copiedInfo && copiedInfo.isCut) {
                    cutCellDetails = this.getCellDetails(copiedInfo.range, getSheet(this.parent, getSheetIndexFromId(this.parent, copiedInfo.sId)), 'clipboard');
                }
                break;
            case 'beforeSort':
                address = getRangeIndexes(args.eventArgs.range);
                if (address[0] === address[2] && (address[2] - address[0]) === 0) { //if selected range is a single cell
                    address[0] = 0;
                    address[1] = 0;
                    address[2] = sheet.usedRange.rowIndex;
                    address[3] = sheet.usedRange.colIndex;
                }
                break;
            case 'beforeCellSave':
            case 'cellDelete':
            case 'cellSave':
            case 'addNote':
            case 'editNote':
            case 'deleteNote':
                address = getRangeIndexes(eventArgs.address);
                break;
            case 'beforeWrap':
            case 'beforeReplace':
            case 'chartDesign':
                address = this.parent.getAddressInfo(eventArgs.address).indices;
                break;
            case 'beforeClear':
                address = getRangeIndexes(eventArgs.range);
                break;
            case 'beforeInsertImage':
                address = getRangeIndexes(eventArgs.range);
                break;
            case 'deleteImage':
                address = getRangeIndexes(eventArgs.address);
                break;
            case 'beforeInsertChart':
                address = getRangeIndexes(eventArgs.range);
                break;
            case 'filter':
                address = getRangeIndexes(eventArgs.range);
                break;
            case 'autofill':
                address = getRangeIndexes(eventArgs.fillRange);
                break;
            case 'validation':
                if (isColumnRange(eventArgs.range.substring(eventArgs.range.lastIndexOf('!') + 1))) {
                    address = getRangeIndexes(eventArgs.range);
                    address[2] = sheet.usedRange.rowIndex;
                }
                else {
                    address = getRangeIndexes(eventArgs.range);
                }
                break;
            case 'removeValidation':
                if (eventArgs.isColSelected) {
                    this.beforeActionData = { cellDetails: [] };
                    var rangeArr = eventArgs.range.substring(eventArgs.range.lastIndexOf('!') + 1).split(':');
                    for (var start = getColIndex(rangeArr[0]), end = getColIndex(rangeArr[1]); start <= end; start++) {
                        if (sheet.columns[start] && sheet.columns[start].validation) {
                            this.beforeActionData.cellDetails.push({ colIndex: start, validation: sheet.columns[start].validation });
                        }
                    }
                }
                else {
                    address = getRangeIndexes(eventArgs.range);
                }
                break;
            case 'hyperlink':
            case 'removeHyperlink':
                address = getRangeIndexes(eventArgs.address);
                break;
        }
        if (args.action === 'beforeSort') {
            this.beforeActionData = { cellDetails: eventArgs.cellDetails };
            this.beforeActionData.sortedCellDetails = eventArgs.sortedCellDetails;
        }
        else if (address) {
            if (args.isClearAction && this.beforeActionData.cellDetails.length > 0) {
                cells = this.beforeActionData.cellDetails;
            }
            else {
                cells = this.getCellDetails(address, sheet, args.action);
            }
            this.beforeActionData = { cellDetails: cells, cutCellDetails: cutCellDetails };
        }
    };
    UndoRedo.prototype.getBeforeActionData = function (args) {
        args.beforeDetails = this.beforeActionData;
    };
    UndoRedo.prototype.performUndoRedo = function (args) {
        var undoRedoArgs;
        if (args.isFromUpdateAction) {
            undoRedoArgs = args;
        }
        else {
            undoRedoArgs = args.isUndo ? this.undoCollection.pop() : this.redoCollection.pop();
            if (args.setCollection) {
                args.undoArgs = undoRedoArgs;
            }
        }
        this.isUndo = args.isUndo;
        var preventEvt;
        if (undoRedoArgs) {
            var actionArgs = void 0;
            var undoRedoAction = undoRedoArgs.action;
            var replaceArgs = {};
            var address = [];
            var sheet_1;
            if (undoRedoArgs.action === 'autofill' || undoRedoArgs.action === 'autofillWithCF') {
                address = undoRedoArgs.eventArgs.fillRange.split('!');
            }
            else if (undoRedoArgs.action === 'cellSave' || undoRedoArgs.action === 'cellDelete') {
                address = undoRedoArgs.eventArgs.address.split('!');
            }
            else if (undoRedoArgs.action === 'clipboard') {
                address = undoRedoArgs.eventArgs.pastedRange.split('!');
            }
            if (address.length > 0) {
                sheet_1 = getSheet(this.parent, getSheetIndex(this.parent, address[0]));
            }
            else if (undoRedoArgs.action === 'clear') {
                sheet_1 = getSheet(this.parent, undoRedoArgs.eventArgs.sheetIndex);
            }
            if (undoRedoArgs.action === 'autofillWithCF') {
                undoRedoArgs.action = 'autofill';
                var conditionalFormat = sheet_1.conditionalFormats;
                if (conditionalFormat[conditionalFormat.length - 1].action === 'autofillWithCF' && args.isUndo) {
                    if (!conditionalFormat[conditionalFormat.length - 1].value) {
                        this.parent.notify(clearCFRule, { range: conditionalFormat[conditionalFormat.length - 1].range, isAction: true });
                    }
                    else {
                        conditionalFormat.pop();
                    }
                }
            }
            if (!args.isPublic) {
                var actionData = undoRedoArgs.eventArgs.beforeActionData;
                delete undoRedoArgs.eventArgs.beforeActionData;
                actionArgs = { action: undoRedoArgs.action, eventArgs: {} };
                extend(actionArgs.eventArgs, undoRedoArgs.eventArgs, null, true);
                if (this.parent.calculationMode === 'Manual' && (undoRedoArgs.action === 'clipboard' ||
                    undoRedoArgs.action === 'cellDelete' || undoRedoArgs.action === 'autofill' || undoRedoArgs.action === 'clear')) {
                    if (!args.isUndo) {
                        if (sheet_1.isSheetCalculated) {
                            (actionData.cutCellDetails.length ? actionData.cutCellDetails :
                                actionData.cellDetails).forEach(function (prevCell) {
                                var cellVal = getCell(prevCell.rowIndex, prevCell.colIndex, sheet_1, false, true).value;
                                if ((cellVal || cellVal === 0) && prevCell.value !== cellVal) {
                                    prevCell.value = cellVal;
                                }
                            });
                        }
                    }
                    else if ((undoRedoArgs.eventArgs.requestType === 'paste' && undoRedoArgs.action === 'clipboard') ||
                        undoRedoArgs.eventArgs.fillType) {
                        var undoActionName = void 0;
                        if (!actionData.cutCellDetails.length) {
                            undoActionName = undoRedoArgs.eventArgs.fillType ? 'autofill' : 'Copy';
                        }
                        else if (sheet_1.isSheetCalculated) {
                            undoActionName = 'Cut';
                        }
                        if (undoActionName) {
                            for (var i = 0, cellCol = actionData.cellDetails, cutCellCol = actionData.cutCellDetails; i < cellCol.length; i++) {
                                var cellValue = getCell(cellCol[i].rowIndex, cellCol[i].colIndex, sheet_1, false, true);
                                cellValue = cellValue ? cellValue.value : '';
                                if (undoActionName === 'Copy') {
                                    cellCol[i].copyCellValue = cellValue;
                                }
                                else if (undoActionName === 'autofill') {
                                    if (cellCol[i].value !== cellValue && cellCol[i].autoFillText !== cellValue) {
                                        cellCol[i].autoFillText = cellValue;
                                    }
                                }
                                else if (undoActionName === 'Cut') {
                                    if (cutCellCol[i].value !== cellValue) {
                                        cutCellCol[i].value = cellValue;
                                    }
                                }
                            }
                        }
                    }
                }
                undoRedoArgs.eventArgs.beforeActionData = actionData;
                actionArgs.eventArgs.cancel = false;
                undoRedoArgs.preventAction = actionArgs.preventAction = true;
                if (args.isUndo) {
                    actionArgs.isUndo = true;
                    if (undoRedoArgs.action === 'cellSave' && this.parent.calculationMode === 'Manual' &&
                        sheet_1.isSheetCalculated && actionData.cellDetails.length === 1) {
                        var cell = getCell(actionData.cellDetails[0].rowIndex, actionData.cellDetails[0].colIndex, sheet_1);
                        if (cell && undoRedoArgs.eventArgs.displayText !== cell.value) {
                            undoRedoArgs.eventArgs.displayText = cell.value;
                        }
                    }
                }
                else {
                    actionArgs.isRedo = true;
                }
                if (!args.isFromUpdateAction) {
                    this.parent.notify(beginAction, actionArgs);
                }
                if (actionArgs.eventArgs.cancel) {
                    this.updateUndoRedoIcons();
                    return;
                }
                delete actionArgs.eventArgs.cancel;
            }
            switch (undoRedoArgs.action) {
                case 'cellSave':
                case 'format':
                case 'wrap':
                case 'cellDelete':
                case 'autofill':
                case 'removeValidation':
                case 'hyperlink':
                case 'addNote':
                case 'editNote':
                case 'deleteNote':
                case 'removeHyperlink':
                    undoRedoArgs = this.performOperation(undoRedoArgs, args.preventEvt, args.preventReSelect, args.isFromAutoFillOption);
                    undoRedoArgs.action = undoRedoAction;
                    break;
                case 'sorting':
                    this.undoForSorting(undoRedoArgs, args.isUndo);
                    break;
                case 'clipboard':
                    undoRedoArgs = this.undoForClipboard(undoRedoArgs, args.isUndo, actionArgs);
                    preventEvt = true;
                    break;
                case 'resize':
                case 'resizeToFit':
                    undoRedoArgs = this.undoForResize(undoRedoArgs);
                    if (args.isUndo) {
                        var eventArgs = undoRedoArgs.eventArgs;
                        if (!eventArgs.isPrevCustomHeight) {
                            var sheet_2 = this.parent.sheets[eventArgs.sheetIndex];
                            var row = sheet_2 && getRow(sheet_2, eventArgs.index);
                            if (row && row.customHeight) {
                                delete row.customHeight;
                            }
                        }
                    }
                    break;
                case 'hideShow':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'replace':
                    undoRedoArgs = this.performOperation(undoRedoArgs);
                    break;
                case 'replaceAll':
                    undoRedoArgs.eventArgs.isAction = false;
                    if (args.isUndo) {
                        replaceArgs.value = undoRedoArgs.eventArgs.replaceValue;
                        replaceArgs.replaceValue = undoRedoArgs.eventArgs.value;
                        replaceArgs.skipFormatCheck = isImported(this.parent);
                    }
                    this.parent.notify(replaceAll, __assign({}, undoRedoArgs.eventArgs, replaceArgs));
                    break;
                case 'insert':
                case 'filter':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo, null, actionArgs);
                    preventEvt = undoRedoArgs.action === 'filter';
                    break;
                case 'delete':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'validation':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    undoRedoArgs = this.performOperation(undoRedoArgs);
                    break;
                case 'addHighlight':
                case 'removeHighlight':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'merge':
                    undoRedoArgs.eventArgs.merge = undoRedoArgs.isFromUpdateAction ?
                        undoRedoArgs.eventArgs.merge : !undoRedoArgs.eventArgs.merge;
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'clear':
                    undoRedoArgs = this.performOperation(undoRedoArgs);
                    if (args.isUndo && undoRedoArgs.eventArgs.cfClearActionArgs) {
                        updateAction({ action: 'clearCF', eventArgs: undoRedoArgs.eventArgs.cfClearActionArgs }, this.parent, !args.isUndo);
                    }
                    for (var i = this.undoCollection.length; i > 0; i--) {
                        if (this.undoCollection[i - 1].isClearAction) {
                            this.performUndoRedo(args);
                        }
                        else {
                            break;
                        }
                    }
                    break;
                case 'conditionalFormat':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo, this.undoCollection);
                    break;
                case 'clearCF':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'insertImage':
                case 'deleteImage':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'imageRefresh':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'insertChart':
                case 'deleteChart':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'chartRefresh':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
                case 'chartDesign':
                    undoRedoArgs.eventArgs.isUndo = args.isUndo;
                    this.parent.notify(undoRedoForChartDesign, undoRedoArgs.eventArgs);
                    break;
                case 'addDefinedName':
                    updateAction(undoRedoArgs, this.parent, !args.isUndo);
                    break;
            }
            if (!args.isFromUpdateAction) {
                if (args.isUndo) {
                    this.redoCollection.push(undoRedoArgs);
                }
                else {
                    this.undoCollection.push(undoRedoArgs);
                }
                if (this.undoCollection.length > this.undoRedoStep) {
                    this.undoCollection.splice(0, 1);
                }
                if (this.redoCollection.length > this.undoRedoStep) {
                    this.redoCollection.splice(0, 1);
                }
                this.updateUndoRedoIcons();
                if (!args.isPublic && !preventEvt) {
                    this.parent.notify(completeAction, extend({ isUndoRedo: true, isUndo: args.isUndo }, undoRedoArgs));
                }
            }
            this.parent.notify(refreshRibbonIcons, null);
        }
    };
    UndoRedo.prototype.undoForSorting = function (args, isUndo) {
        var _this = this;
        var sheetIndex = getSheetIndexFromAddress(this.parent, args.eventArgs.range);
        var range = getRangeIndexes(args.eventArgs.range);
        var updateSortIcon = function (idx, add) {
            if (sheetIndex === _this.parent.activeSheetIndex) {
                var td = _this.parent.getCell(range[0] - 1, _this.parent.sortCollection[idx].columnIndex);
                if (td) {
                    td = select('.e-filter-icon', td);
                    if (td) {
                        // Determine the class to add or remove
                        var sortClass = "e-sort" + (_this.parent.sortCollection[idx].order === 'Ascending' ? 'asc' : 'desc') + "-filter";
                        if (add) {
                            td.classList.add(sortClass);
                        }
                        else {
                            td.classList.remove(sortClass);
                        }
                    }
                }
            }
        };
        if (isUndo) {
            this.parent.notify(updateSortedDataOnCell, { result: args.eventArgs.beforeActionData.cellDetails, range: range, sheet: getSheet(this.parent, sheetIndex), jsonData: args.eventArgs.beforeActionData.sortedCellDetails, isUndo: true });
            this.parent.notify(sortComplete, { range: args.eventArgs.range });
            if (this.parent.sortCollection && args.eventArgs.previousSort) {
                for (var i = this.parent.sortCollection.length - 1; i >= 0; i--) {
                    if (this.parent.sortCollection[i].sheetIndex === sheetIndex) {
                        updateSortIcon(i, false);
                        this.parent.sortCollection.splice(i, 1);
                        var prevSort = args.eventArgs.previousSort;
                        if (Array.isArray(prevSort)) {
                            for (var j = 0; j < prevSort.length; j++) {
                                this.parent.sortCollection.splice(j, 0, prevSort[j]);
                                updateSortIcon(j, true);
                            }
                        }
                        if (!this.parent.sortCollection.length) {
                            this.parent.sortCollection = undefined;
                        }
                        break;
                    }
                }
            }
        }
        else {
            updateAction(args, this.parent, true);
            if (args.eventArgs.previousSort) {
                var idx = 0;
                if (this.parent.sortCollection) {
                    for (var i = this.parent.sortCollection.length - 1; i >= 0; i--) {
                        if (this.parent.sortCollection[i].sheetIndex === sheetIndex) {
                            updateSortIcon(i, false);
                            idx = i;
                            this.parent.sortCollection.splice(i, 1);
                        }
                    }
                }
                else {
                    this.parent.sortCollection = [];
                }
                this.parent.sortCollection.splice(idx, 0, { sortRange: args.eventArgs.range.substring(args.eventArgs.range.lastIndexOf('!') + 1), sheetIndex: sheetIndex,
                    columnIndex: getColIndex(args.eventArgs.sortOptions.sortDescriptors.field), order: args.eventArgs.sortOptions.sortDescriptors.order });
                updateSortIcon(idx, true);
            }
        }
    };
    UndoRedo.prototype.updateUndoRedoCollection = function (options) {
        var actionList = ['clipboard', 'format', 'sorting', 'cellSave', 'resize', 'resizeToFit', 'wrap', 'hideShow', 'replace',
            'validation', 'merge', 'clear', 'conditionalFormat', 'clearCF', 'insertImage', 'imageRefresh', 'insertChart', 'deleteChart',
            'chartRefresh', 'filter', 'cellDelete', 'autofill', 'autofillWithCF', 'addDefinedName', 'removeValidation', 'removeHighlight', 'addHighlight', 'hyperlink', 'removeHyperlink', 'deleteImage', 'chartDesign', 'replaceAll', 'addNote', 'editNote', 'deleteNote'];
        if ((options.args.action === 'insert' || options.args.action === 'delete') && options.args.eventArgs.modelType !== 'Sheet') {
            actionList.push(options.args.action);
        }
        var action = options.args.action;
        if (actionList.indexOf(action) === -1 && !options.isPublic) {
            return;
        }
        var eventArgs = options.args.eventArgs;
        if (action === 'clipboard' || action === 'sorting' || action === 'format' || action === 'cellSave' ||
            action === 'wrap' || action === 'replace' || action === 'validation' || action === 'clear' || action === 'conditionalFormat' ||
            action === 'clearCF' || action === 'insertImage' || action === 'imageRefresh' || action === 'insertChart' ||
            action === 'chartRefresh' || action === 'filter' || action === 'cellDelete' || action === 'autofill' || action === 'autofillWithCF' || action === 'removeValidation' ||
            action === 'addDefinedName' || action === 'hyperlink' || action === 'removeHyperlink' || action === 'deleteImage' || action === 'chartDesign' || action === 'addNote' || action === 'editNote' || action === 'deleteNote') {
            var beforeActionDetails = { beforeDetails: { cellDetails: [] } };
            this.parent.notify(getBeforeActionData, beforeActionDetails);
            eventArgs.beforeActionData = beforeActionDetails.beforeDetails;
        }
        if (action === 'clipboard' && eventArgs.copiedInfo && eventArgs.copiedInfo.isExternal) {
            var addressInfo = this.parent.getAddressInfo(eventArgs.pastedRange);
            eventArgs.copiedInfo.cellDetails = this.getCellDetails(addressInfo.indices, getSheet(this.parent, addressInfo.sheetIndex), action);
        }
        if (this.redoCollection.length > 0 && this.redoCollection[this.redoCollection.length - 1].action === 'autofillWithCF' && options.args.action === 'autofill') {
            options.args.action = 'autofillWithCF';
        }
        this.undoCollection.push(options.args);
        this.redoCollection = [];
        if (this.undoCollection.length > this.undoRedoStep) {
            this.undoCollection.splice(0, 1);
        }
        this.updateUndoRedoIcons();
    };
    UndoRedo.prototype.clearUndoRedoCollection = function () {
        this.undoCollection = [];
        this.redoCollection = [];
        this.updateUndoRedoIcons();
    };
    UndoRedo.prototype.updateUndoRedoIcons = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        this.parent.notify(enableToolbarItems, [{
                tab: l10n.getConstant('Home'), items: [this.parent.element.id + '_undo'],
                enable: this.undoCollection.length > 0
            }]);
        this.parent.notify(enableToolbarItems, [{
                tab: l10n.getConstant('Home'), items: [this.parent.element.id + '_redo'],
                enable: this.redoCollection.length > 0
            }]);
    };
    UndoRedo.prototype.updateUndoRedoSheetReferences = function (args) {
        var updateReference = function (collection) {
            collection.forEach(function (editArgs) {
                var eventArgs = editArgs.eventArgs;
                if (eventArgs) {
                    ['address', 'dataRange', 'fillRange'].forEach(function (property) {
                        if (eventArgs[property] && eventArgs[property].includes(args.pName)) {
                            eventArgs[property] = eventArgs[property].replace(args.pName, args.value);
                        }
                    });
                }
            });
        };
        updateReference(this.undoCollection);
        updateReference(this.redoCollection);
    };
    UndoRedo.prototype.undoForClipboard = function (args, isUndo, actionArgs) {
        var _this = this;
        var eventArgs = args.eventArgs;
        var address = [];
        address[0] = eventArgs.pastedRange.substring(0, eventArgs.pastedRange.lastIndexOf('!'));
        address[1] = eventArgs.pastedRange.substring(eventArgs.pastedRange.lastIndexOf('!') + 1);
        var range = getRangeIndexes(address[1]);
        var sheetIndex = getSheetIndex(this.parent, address[0]);
        var sheet = getSheet(this.parent, sheetIndex);
        var copiedInfo = eventArgs.copiedInfo;
        var actionData = eventArgs.beforeActionData;
        var isFromUpdateAction = args.isFromUpdateAction;
        var isRefresh = sheetIndex === this.parent.activeSheetIndex;
        var pictureElem;
        if (actionArgs) {
            actionArgs.isUndoRedo = true;
            actionArgs.eventArgs.beforeActionData = actionData;
        }
        if (args.eventArgs.requestType === 'imagePaste') {
            var copiedShapeInfo = eventArgs.copiedShapeInfo;
            if (isUndo) {
                pictureElem = copiedShapeInfo.pictureElem;
                if (copiedShapeInfo.isCut) {
                    this.parent.notify(deleteImage, {
                        id: pictureElem.id, sheetIdx: eventArgs.pasteSheetIndex + 1, isUndoRedo: true
                    });
                    this.parent.notify(createImageElement, {
                        options: {
                            src: pictureElem.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2'),
                            height: copiedShapeInfo.height, width: copiedShapeInfo.width, id: pictureElem.id
                        },
                        range: copiedShapeInfo.copiedRange, isPublic: false, isUndoRedo: true
                    });
                }
                else {
                    this.parent.notify(deleteImage, {
                        id: eventArgs.pastedPictureElement.id, sheetIdx: eventArgs.pasteSheetIndex + 1, isUndoRedo: true
                    });
                }
            }
            else {
                if (copiedShapeInfo.isCut) {
                    pictureElem = copiedShapeInfo.pictureElem;
                    this.parent.notify(deleteImage, {
                        id: pictureElem.id, sheetIdx: copiedShapeInfo.sId, isUndoRedo: true
                    });
                    this.parent.notify(createImageElement, {
                        options: {
                            src: pictureElem.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2'),
                            height: copiedShapeInfo.height, width: copiedShapeInfo.width, id: pictureElem.id
                        },
                        range: copiedShapeInfo.pastedRange, isPublic: false, isUndoRedo: true
                    });
                }
                else {
                    pictureElem = eventArgs.pastedPictureElement;
                    this.parent.notify(createImageElement, {
                        options: {
                            src: pictureElem.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2'),
                            height: pictureElem.offsetHeight, width: pictureElem.offsetWidth, id: pictureElem.id
                        },
                        range: copiedShapeInfo.pastedRange, isPublic: false, isUndoRedo: true
                    });
                }
            }
        }
        else {
            if (isUndo) {
                if (copiedInfo.isCut) {
                    var cells = actionData.cutCellDetails;
                    this.updateCellDetails(cells, getSheet(this.parent, getSheetIndexFromId(this.parent, copiedInfo.sId)), getSwapRange(copiedInfo.range), isRefresh, args);
                    if (eventArgs.cfClearActionArgs) {
                        updateAction({ action: 'clearCF', eventArgs: eventArgs.cfClearActionArgs }, this.parent, false);
                    }
                }
                if (actionData) {
                    this.updateCellDetails(actionData.cellDetails, sheet, range, isRefresh, args, null, null, actionArgs ?
                        actionArgs.isUndoRedo : null);
                }
                if (eventArgs.cfActionArgs) {
                    eventArgs.cfActionArgs.cfModel.forEach(function (cf) {
                        updateAction({ eventArgs: { range: cf.range, type: cf.type, cFColor: cf.cFColor, value: cf.value,
                                sheetIdx: eventArgs.cfActionArgs.sheetIdx, cancel: true }, action: 'conditionalFormat' }, _this.parent, false);
                    });
                }
                setMaxHgt(sheet, range[0], range[1], getRowHeight(sheet, range[0]));
                var hgt = getMaxHgt(sheet, range[0]);
                setRowEleHeight(this.parent, sheet, hgt, range[0]);
                eventArgs.mergeCollection.forEach(function (mergeArgs) {
                    mergeArgs.merge = !mergeArgs.merge;
                    _this.parent.notify(setMerge, mergeArgs);
                    mergeArgs.merge = !mergeArgs.merge;
                });
                if (actionArgs && !isFromUpdateAction) {
                    this.parent.notify(completeAction, actionArgs);
                }
            }
            else {
                if (copiedInfo.isExternal) {
                    var addressInfo = this.parent.getAddressInfo(eventArgs.pastedRange);
                    this.updateCellDetails(copiedInfo.cellDetails, getSheet(this.parent, addressInfo.sheetIndex), addressInfo.indices, true, args, null, null, actionArgs ?
                        actionArgs.isUndoRedo : null);
                    if (actionArgs && !isFromUpdateAction) {
                        this.parent.notify(completeAction, actionArgs);
                    }
                }
                else {
                    var clipboardPromise = new Promise(function (resolve) { resolve((function () { })()); });
                    var addressInfo = this.parent.getAddressInfo(eventArgs.copiedRange);
                    this.parent.notify(eventArgs.copiedInfo.isCut ? cut : copy, {
                        range: addressInfo.indices, sId: getSheet(this.parent, addressInfo.sheetIndex).id,
                        promise: clipboardPromise, invokeCopy: true, isPublic: true, isFromUpdateAction: isFromUpdateAction
                    });
                    clipboardPromise.then(function () {
                        _this.parent.notify(paste, {
                            range: address ? getIndexesFromAddress(eventArgs.pastedRange) : address,
                            sIdx: address ? getSheetIndex(_this.parent, getSheetNameFromAddress(eventArgs.pastedRange)) : address,
                            type: eventArgs.type, isAction: false, isInternal: true, isFromUpdateAction: isFromUpdateAction,
                            beforeActionData: eventArgs.beforeActionData, isUndo: isUndo
                        });
                        if (actionArgs && !isFromUpdateAction) {
                            _this.parent.notify(completeAction, actionArgs);
                        }
                    });
                }
            }
            if (isRefresh && !isFromUpdateAction) {
                this.parent.notify(selectRange, { address: eventArgs.selectedRange });
                this.parent.notify(positionAutoFillElement, {});
            }
            else {
                this.checkRefreshNeeded(sheetIndex, isFromUpdateAction);
            }
        }
        return args;
    };
    UndoRedo.prototype.undoForResize = function (args) {
        var eventArgs = args.eventArgs;
        if (eventArgs.hide === undefined) {
            if (eventArgs.isCol) {
                var temp = eventArgs.oldWidth;
                eventArgs.oldWidth = eventArgs.width;
                eventArgs.width = temp;
            }
            else {
                var temp = eventArgs.oldHeight;
                eventArgs.oldHeight = eventArgs.height;
                eventArgs.height = temp;
            }
        }
        else {
            eventArgs.hide = !eventArgs.hide;
        }
        updateAction(args, this.parent, false);
        var sheet = this.parent.getActiveSheet();
        var activeCell = getRangeIndexes(sheet.activeCell);
        var CellElem = getCell(activeCell[0], activeCell[1], sheet);
        if (CellElem && CellElem.rowSpan) {
            var td = this.parent.getCell(activeCell[0], activeCell[1]);
            this.parent.element.querySelector('.e-active-cell').style.height = td.offsetHeight + 'px';
        }
        else if (CellElem && CellElem.colSpan) {
            var td = this.parent.getCell(activeCell[0], activeCell[1]);
            this.parent.element.querySelector('.e-active-cell').style.width = td.offsetWidth + 'px';
        }
        return args;
    };
    UndoRedo.prototype.performOperation = function (args, preventEvt, preventReSelect, isFromAutoFillOption) {
        var eventArgs = args.eventArgs;
        var address = [];
        var undoRange = (args.action === 'cellSave' || args.action === 'wrap' || args.action === 'replace'
            || args.action === 'cellDelete' || args.action === 'hyperlink' || args.action === 'addNote' || args.action === 'editNote'
            || args.action === 'deleteNote' || args.action === 'removeHyperlink') ? eventArgs.address : eventArgs.range;
        if (args.action === 'autofill') {
            address[0] = eventArgs.fillRange.substring(0, eventArgs.fillRange.lastIndexOf('!'));
            address[1] = eventArgs.fillRange.substring(eventArgs.fillRange.lastIndexOf('!') + 1);
        }
        else {
            address[0] = undoRange.substring(0, undoRange.lastIndexOf('!'));
            address[1] = undoRange.substring(undoRange.lastIndexOf('!') + 1);
        }
        var sheetIndex = getSheetIndex(this.parent, address[0]);
        var sheet = getSheet(this.parent, sheetIndex);
        var range;
        if (eventArgs.isColSelected) {
            var rangeArr = address[1].split(':');
            range = [0, getColIndex(rangeArr[0]), sheet.rowCount - 1, getColIndex(rangeArr[1])];
        }
        else {
            range = getSwapRange(getRangeIndexes(address[1]));
        }
        var indexes = range;
        var actionData = eventArgs.beforeActionData;
        var isFromUpdateAction = args.isFromUpdateAction;
        var isRefresh = this.checkRefreshNeeded(sheetIndex, isFromUpdateAction);
        var uniqueArgs = { cellIdx: [range[0], range[1]], isUnique: false, uniqueRange: '' };
        if (!eventArgs.isColSelected) {
            this.parent.notify(checkUniqueRange, uniqueArgs);
        }
        if (this.isUndo) {
            if (uniqueArgs.isUnique && eventArgs.formula && eventArgs.formula.indexOf('UNIQUE') > -1) {
                var rangeIdx = getRangeIndexes(uniqueArgs.uniqueRange);
                if (getCell(rangeIdx[0], rangeIdx[1], this.parent.getActiveSheet()).value !== '#SPILL!') {
                    for (var j = rangeIdx[0]; j <= rangeIdx[2]; j++) {
                        for (var k = rangeIdx[1]; k <= rangeIdx[3]; k++) {
                            if (j === rangeIdx[0] && k === rangeIdx[1]) {
                                k = k + 1;
                            }
                            this.parent.updateCellInfo({ value: '' }, getRangeAddress([j, k]), true);
                        }
                    }
                }
            }
            this.updateCellDetails(actionData.cellDetails, sheet, range, isRefresh, args, preventEvt, eventArgs.isColSelected, true, isFromAutoFillOption);
            if (uniqueArgs.isUnique && args.action === 'cellDelete' && eventArgs.isSpill) {
                var rangeIdx = getRangeIndexes(uniqueArgs.uniqueRange);
                var cell = getCell(rangeIdx[0], rangeIdx[1], this.parent.getActiveSheet());
                for (var i = rangeIdx[0]; i <= rangeIdx[2]; i++) {
                    for (var j = rangeIdx[1]; j <= rangeIdx[3]; j++) {
                        for (var k = range[0]; k <= range[2]; k++) {
                            for (var l = range[1]; l <= range[3]; l++) {
                                if (i !== k || j !== l) {
                                    this.parent.updateCellInfo({ value: '' }, getCellAddress(i, j), true);
                                }
                            }
                        }
                    }
                }
                cell.value = '#SPILL!';
                this.parent.updateCellInfo(cell, getCellAddress(rangeIdx[0], rangeIdx[1]), true);
            }
            if (!eventArgs.isSpill && uniqueArgs.uniqueRange !== '') {
                var indexes_1 = getRangeIndexes(uniqueArgs.uniqueRange);
                for (var j = indexes_1[0]; j <= indexes_1[2]; j++) {
                    for (var k = indexes_1[1]; k <= indexes_1[3]; k++) {
                        if (j === indexes_1[0] && k === indexes_1[1]) {
                            k = k + 1;
                        }
                        this.parent.updateCellInfo({ value: '' }, getRangeAddress([j, k]), true);
                    }
                }
                this.parent.notify(reApplyFormula, null);
            }
        }
        else {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var argsEventArgs = args.eventArgs;
            var activeCellIndexes = getRangeIndexes(sheet.activeCell);
            var startRange = address[1] ? address[1].split(':') : [];
            if (indexes[0] !== activeCellIndexes[0] && indexes[1] !== activeCellIndexes[1] &&
                args.action === 'hyperlink' && startRange.length > 0) {
                sheet.activeCell = startRange[0];
                activeCellIndexes = getRangeIndexes(sheet.activeCell);
            }
            var cellValue = this.parent.getCellStyleValue(['textDecoration'], activeCellIndexes).textDecoration;
            if (argsEventArgs && argsEventArgs.style && argsEventArgs.style.textDecoration) {
                var value = argsEventArgs.style.textDecoration;
                var changedValue = value;
                var changedStyle = void 0;
                var removeProp = false;
                if (cellValue === 'underline') {
                    changedValue = value === 'underline' ? 'none' : 'underline line-through';
                }
                else if (cellValue === 'line-through') {
                    changedValue = value === 'line-through' ? 'none' : 'underline line-through';
                }
                else if (cellValue === 'underline line-through') {
                    changedValue = value === 'underline' ? 'line-through' : 'underline';
                    removeProp = true;
                }
                if (changedValue === 'none') {
                    removeProp = true;
                }
                argsEventArgs.style.textDecoration = changedValue;
                args.eventArgs = argsEventArgs;
                for (var i = indexes[0]; i <= indexes[2]; i++) {
                    for (var j = indexes[1]; j <= indexes[3]; j++) {
                        changedStyle = {};
                        cellValue = this.parent.getCellStyleValue(['textDecoration'], [i, j]).textDecoration;
                        if (cellValue === 'none') {
                            if (removeProp) {
                                continue;
                            }
                            changedStyle.textDecoration = value;
                        }
                        else if (cellValue === 'underline' || cellValue === 'line-through') {
                            if (removeProp) {
                                if (value === cellValue) {
                                    changedStyle.textDecoration = 'none';
                                }
                                else {
                                    continue;
                                }
                            }
                            else {
                                changedStyle.textDecoration = value !== cellValue ? 'underline line-through' : value;
                            }
                        }
                        else if (cellValue === 'underline line-through') {
                            if (removeProp) {
                                changedStyle.textDecoration = value === 'underline' ? 'line-through' : 'underline';
                            }
                            else {
                                continue;
                            }
                        }
                        this.parent.notify(setCellFormat, {
                            style: { textDecoration: changedStyle.textDecoration }, range: [i, j, i, j], refreshRibbon: true,
                            onActionUpdate: true
                        });
                    }
                }
                argsEventArgs.style.textDecoration = value;
                args.eventArgs = argsEventArgs;
            }
            else {
                if (!isNullOrUndefined(eventArgs.oldValue) && eventArgs.oldValue !== eventArgs.value && uniqueArgs.isUnique) {
                    var indexes_2 = getRangeIndexes(uniqueArgs.uniqueRange);
                    if (getCell(indexes_2[0], indexes_2[1], this.parent.getActiveSheet()).value !== '#SPILL!') {
                        for (var j = indexes_2[0]; j <= indexes_2[2]; j++) {
                            for (var k = indexes_2[1]; k <= indexes_2[3]; k++) {
                                if (j === indexes_2[0] && k === indexes_2[1]) {
                                    this.parent.updateCellInfo({ value: '#SPILL!' }, getRangeAddress([indexes_2[0], indexes_2[1]]), true);
                                    k = k + 1;
                                }
                                this.parent.updateCellInfo({ value: '' }, getRangeAddress([j, k]), true);
                            }
                        }
                    }
                }
                updateAction(args, this.parent, true);
                if (uniqueArgs.isUnique && args.action === 'cellDelete' && eventArgs.isSpill) {
                    var indexes_3 = getRangeIndexes(uniqueArgs.uniqueRange);
                    var Skip = false;
                    for (var i = indexes_3[0]; i <= indexes_3[1]; i++) {
                        for (var j = indexes_3[1]; j <= indexes_3[3]; j++) {
                            if (i === indexes_3[0] && j === indexes_3[1]) {
                                j++;
                            }
                            if (getCell(i, j, sheet) && !isNullOrUndefined(getCell(i, j, sheet).value)
                                && getCell(i, j, sheet).value !== '') {
                                Skip = true;
                            }
                        }
                    }
                    if (!Skip) {
                        var cell = getCell(indexes_3[0], indexes_3[1], this.parent.getActiveSheet());
                        cell.value = '';
                        this.parent.updateCellInfo(cell, getCellAddress(indexes_3[0], indexes_3[1]), true);
                        this.parent.notify(reApplyFormula, null);
                    }
                }
            }
        }
        if (args.action === 'autofill') {
            address[1] = this.isUndo ? args.eventArgs.dataRange : args.eventArgs.selectedRange;
        }
        if (isRefresh && !preventReSelect && !isFromUpdateAction) {
            if (eventArgs.isColSelected) {
                address[1] = sheet.selectedRange;
            }
            this.parent.notify(selectRange, { address: address[1] });
        }
        if (this.parent.showAggregate) {
            this.parent.notify(showAggregate, {});
        }
        return args;
    };
    UndoRedo.prototype.getCellDetails = function (address, sheet, action) {
        var _this = this;
        var cells = [];
        var cell;
        var filterCheck = action === 'cellDelete';
        var processedColumns = {};
        address = getSwapRange(address);
        var updateCellProps = function (rowIdx, colIdx) {
            var currentCell = {
                rowIndex: rowIdx, colIndex: colIdx, value: cell ? cell.value : '',
                formula: cell ? cell.formula : ''
            };
            var rowHeight = getRowHeight(sheet, rowIdx);
            if (cell) {
                if (cell.format) {
                    currentCell.format = cell.format;
                }
                if (!isNullOrUndefined(cell.isLocked)) {
                    currentCell.isLocked = cell.isLocked;
                }
                if (cell.style) {
                    currentCell.style = Object.assign({}, cell.style);
                }
                if (cell.wrap) {
                    currentCell.wrap = cell.wrap;
                }
                if (cell.rowSpan) {
                    currentCell.rowSpan = cell.rowSpan;
                }
                if (cell.colSpan) {
                    currentCell.colSpan = cell.colSpan;
                }
                if (cell.image) {
                    currentCell.image = cell.image;
                }
                if (cell.chart) {
                    currentCell.chart = JSON.parse(JSON.stringify(cell.chart));
                }
                if (cell.validation) {
                    currentCell.validation = Object.assign({}, cell.validation);
                }
                if (cell.notes) {
                    currentCell.notes = cell.notes;
                }
                if (cell.isReadOnly) {
                    currentCell.isReadOnly = cell.isReadOnly;
                }
                if (cell.formattedText) {
                    currentCell.formattedText = cell.formattedText;
                }
                if (cell.hyperlink) {
                    currentCell.hyperlink = (isObject(cell.hyperlink) ? extend({}, cell.hyperlink) : cell.hyperlink);
                }
                if (sheet.standardHeight ? rowHeight !== sheet.standardHeight : rowHeight !== 20) {
                    cell.rowHeight = currentCell.rowHeight = rowHeight;
                }
                var editModule = _this.parent.editModule;
                currentCell.value = cell && editModule && cell.formula === editModule.editCellData.value &&
                    (!isNullOrUndefined(editModule.editCellData.prevFormulaValue)) ?
                    editModule.editCellData.prevFormulaValue : currentCell.value;
            }
            cells.push(currentCell);
        };
        if (action === 'validation' || action === 'removeValidation') {
            for (var colIdx = address[1]; colIdx <= address[3]; colIdx++) {
                var column = getColumn(sheet, colIdx);
                for (var rowIdx = address[0]; rowIdx <= address[2]; rowIdx++) {
                    if (!processedColumns[colIdx] && checkColumnValidation(column, rowIdx, colIdx)) {
                        cells.push({ colIndex: colIdx, validation: Object.assign({}, column.validation) });
                        processedColumns[colIdx] = true;
                    }
                    cell = getCell(rowIdx, colIdx, sheet);
                    if (cell && !cell.validation) {
                        continue;
                    }
                    updateCellProps(rowIdx, colIdx);
                }
            }
        }
        else {
            for (var i = address[0]; i <= address[2]; i++) {
                if (filterCheck && isFilterHidden(sheet, i)) {
                    continue;
                }
                for (var j = address[1]; j <= address[3]; j++) {
                    cell = getCell(i, j, sheet);
                    updateCellProps(i, j);
                }
            }
        }
        return cells;
    };
    UndoRedo.prototype.updateCellDetails = function (cells, sheet, range, isRefresh, args, preventEvt, isColSelected, isUndoRedo, isFromAutoFillOption) {
        var _this = this;
        var len = cells.length;
        var triggerEvt = args && !preventEvt && (args.action === 'cellSave' || args.action === 'cellDelete' ||
            args.action === 'autofill' || args.action === 'clipboard');
        var cellElem;
        var prevCell;
        var select;
        var cf = args && !args.eventArgs.cfClearActionArgs && sheet.conditionalFormats &&
            sheet.conditionalFormats.length && [].slice.call(sheet.conditionalFormats);
        var cfRule = [];
        var cfRefreshAll;
        var evtArgs;
        var isDelete;
        var deletedRange;
        if (args.action === 'cellDelete') {
            isDelete = false;
            deletedRange = range;
        }
        var _loop_1 = function (i) {
            if (isColSelected || isUndefined(cells[i].rowIndex)) {
                setColumn(sheet, cells[i].colIndex, { validation: cells[i].validation });
                return "continue";
            }
            prevCell = getCell(cells[i].rowIndex, cells[i].colIndex, sheet, false, true);
            if (prevCell.style && args && (args.action === 'format' || args.action === 'clipboard')) {
                if (prevCell.style.borderTop && (!cells[i].style || !cells[i].style.borderTop)) {
                    this_1.parent.setBorder({ borderTop: '' }, sheet.name + '!' + getCellAddress(cells[i].rowIndex, cells[i].colIndex), null, isUndoRedo);
                }
                if (prevCell.style.borderLeft && (!cells[i].style || !cells[i].style.borderLeft)) {
                    this_1.parent.setBorder({ borderLeft: '' }, sheet.name + '!' + getCellAddress(cells[i].rowIndex, cells[i].colIndex), null, isUndoRedo);
                }
                if (prevCell.style.borderRight && (!cells[i].style ||
                    !cells[i].style.borderRight)) {
                    this_1.parent.setBorder({ borderRight: '' }, sheet.name + '!' + getCellAddress(cells[i].rowIndex, cells[i].colIndex), null, isUndoRedo);
                }
                if (prevCell.style.fontSize && (!cells[i].style || !cells[i].style.fontSize)) {
                    prevCell.style.fontSize = '11pt';
                    select = true;
                    this_1.parent.notify(applyCellFormat, { style: { fontSize: '11pt' }, rowIdx: cells[i].rowIndex, colIdx: cells[i].colIndex, lastCell: true, isHeightCheckNeeded: true, manualUpdate: true, onActionUpdate: true });
                }
                if (prevCell.style.fontFamily && (!cells[i].style || !cells[i].style.fontFamily)) {
                    select = true;
                    prevCell.style.fontFamily = 'Calibri';
                    this_1.parent.notify(applyCellFormat, { style: { fontFamily: 'Calibri' }, rowIdx: cells[i].rowIndex, colIdx: cells[i].colIndex, lastCell: true, isHeightCheckNeeded: true, manualUpdate: true, onActionUpdate: true });
                }
            }
            if (prevCell.image && args && args.action === 'clipboard') {
                prevCell.image.forEach(function (image) {
                    _this.parent.notify(deleteImage, { id: image.id, sheet: sheet, preventEventTrigger: true, rowIdx: cells[i].rowIndex,
                        colIdx: cells[i].colIndex });
                });
            }
            var currentCell = {
                value: (cells[i].formula && cells[i].formula.toUpperCase().includes('UNIQUE')) ? null : cells[i].value, formula: cells[i].formula
            };
            if (cells[i].format) {
                currentCell.format = cells[i].format;
            }
            if (!isNullOrUndefined(cells[i].isLocked)) {
                currentCell.isLocked = prevCell.isLocked ? prevCell.isLocked : cells[i].isLocked;
            }
            if (cells[i].style) {
                currentCell.style = Object.assign({}, cells[i].style);
            }
            if (cells[i].wrap) {
                currentCell.wrap = cells[i].wrap;
            }
            if (cells[i].rowSpan) {
                currentCell.rowSpan = cells[i].rowSpan;
            }
            if (cells[i].colSpan) {
                currentCell.colSpan = cells[i].colSpan;
            }
            if (cells[i].hyperlink) {
                currentCell.hyperlink = cells[i].hyperlink;
            }
            if (cells[i].image) {
                currentCell.image = cells[i].image;
            }
            if (cells[i].notes) {
                currentCell.notes = cells[i].notes;
            }
            if (cells[i].isReadOnly) {
                currentCell.isReadOnly = cells[i].isReadOnly;
            }
            if (cells[i].formattedText) {
                currentCell.formattedText = cells[i].formattedText;
            }
            setCell(cells[i].rowIndex, cells[i].colIndex, sheet, currentCell);
            evtArgs = {
                action: 'updateCellValue', address: [cells[i].rowIndex, cells[i].colIndex,
                    cells[i].rowIndex, cells[i].colIndex], notes: cells[i].notes,
                value: cells[i].formula ? cells[i].formula : cells[i].value,
                sheetIndex: getSheetIndex(this_1.parent, sheet.name), skipFormatCheck: isImported(this_1.parent),
                isDelete: isDelete, deletedRange: deletedRange, actionName: args.action
            };
            this_1.parent.notify(workbookEditOperation, evtArgs);
            if (cf && !cfRefreshAll) {
                cfRefreshAll = evtArgs.isFormulaDependent;
            }
            if (args && args.action === 'format' && args.eventArgs.requestType === 'NumberFormat' && currentCell.wrap &&
                currentCell.format !== prevCell.format && !getRow(sheet, cells[i].rowIndex).customHeight) {
                this_1.parent.notify(wrapEvent, {
                    range: [cells[i].rowIndex, cells[i].colIndex, cells[i].rowIndex,
                        cells[i].colIndex], wrap: true, sheet: sheet, initial: true, isOtherAction: true
                });
            }
            else if ((args && args.action === 'wrap' && args.eventArgs.wrap) || (prevCell.wrap && !cells[i].wrap)) {
                this_1.parent.notify(wrapEvent, {
                    range: [cells[i].rowIndex, cells[i].colIndex, cells[i].rowIndex,
                        cells[i].colIndex], wrap: false, sheet: sheet, initial: true
                });
            }
            if (args && cells[i].hyperlink && args.action === 'clear') {
                var hyperlinkRange = sheet.name + '!' + getRangeAddress([cells[i].rowIndex, cells[i].colIndex, cells[i].rowIndex, cells[i].colIndex]);
                cellElem = this_1.parent.getCell(cells[i].rowIndex, cells[i].colIndex);
                if (args.eventArgs.type === 'Clear All' || args.eventArgs.type === 'Clear Hyperlinks') {
                    this_1.parent.addHyperlink(cells[i].hyperlink, hyperlinkRange, cells[i].value);
                }
                else if (args.eventArgs.type === 'Clear Formats' && cellElem) {
                    addClass(cellElem.querySelectorAll('.e-hyperlink'), 'e-hyperlink-style');
                }
            }
            if (cells[i].validation) {
                this_1.parent.notify(cellValidation, { rules: cells[i].validation,
                    range: sheet.name + "!" + getCellAddress(cells[i].rowIndex, cells[i].colIndex) });
            }
            if (triggerEvt && cells[i].value !== prevCell.value) {
                this_1.parent.trigger('cellSave', { element: null, value: cells[i].value, oldValue: prevCell.value, formula: cells[i].formula, cancel: false,
                    address: sheet.name + "!" + getCellAddress(cells[i].rowIndex, cells[i].colIndex),
                    displayText: this_1.parent.getDisplayText(cells[i]) });
            }
            if (cf && !cfRefreshAll) {
                updateCFModel(cf, cfRule, cells[i].rowIndex, cells[i].colIndex);
            }
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        if (isRefresh) {
            if (range[0] === range[2] && range[1] === range[3]) {
                var cell = getCell(range[0], range[1], sheet);
                if (cell.rowSpan > 1) {
                    range[2] = range[0] + cell.rowSpan - 1;
                }
                if (cell.colSpan > 1) {
                    range[3] = range[1] + cell.colSpan - 1;
                }
            }
            var isHeightCheckFromUndo = false;
            if (args.action === 'autofill' || args.action === 'clipboard' || args.action === 'wrap') {
                isHeightCheckFromUndo = true;
            }
            else if (args.action === 'format' && args.eventArgs.requestType === 'CellFormat') {
                isHeightCheckFromUndo = isHeightCheckNeeded(args.eventArgs.style, true);
            }
            this.parent.serviceLocator.getService('cell').refreshRange(range, false, false, true, false, isImported(this.parent), null, isFromAutoFillOption, isHeightCheckFromUndo, null, null, cells);
            if (cfRule.length || cfRefreshAll) {
                this.parent.notify(applyCF, { cfModel: !cfRefreshAll && cfRule, refreshAll: cfRefreshAll, isAction: true });
            }
            if (select) {
                getUpdateUsingRaf(function () { return _this.parent.selectRange(sheet.selectedRange); });
            }
        }
    };
    UndoRedo.prototype.checkRefreshNeeded = function (sheetIndex, isFromUpdateAction) {
        var isRefresh = true;
        if (sheetIndex !== this.parent.activeSheetIndex) {
            if (!isFromUpdateAction) {
                this.parent.activeSheetIndex = sheetIndex;
                this.parent.dataBind();
            }
            isRefresh = false;
        }
        return isRefresh;
    };
    UndoRedo.prototype.addEventListener = function () {
        this.parent.on(performUndoRedo, this.performUndoRedo, this);
        this.parent.on(updateUndoRedoCollection, this.updateUndoRedoCollection, this);
        this.parent.on(setActionData, this.setActionData, this);
        this.parent.on(getBeforeActionData, this.getBeforeActionData, this);
        this.parent.on(clearUndoRedoCollection, this.clearUndoRedoCollection, this);
        this.parent.on(setUndoRedo, this.updateUndoRedoIcons, this);
        this.parent.on(sheetRenameUpdate, this.updateUndoRedoSheetReferences, this);
    };
    UndoRedo.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(performUndoRedo, this.performUndoRedo);
            this.parent.off(updateUndoRedoCollection, this.updateUndoRedoCollection);
            this.parent.off(setActionData, this.setActionData);
            this.parent.off(getBeforeActionData, this.getBeforeActionData);
            this.parent.off(clearUndoRedoCollection, this.clearUndoRedoCollection);
            this.parent.off(setUndoRedo, this.updateUndoRedoIcons);
            this.parent.off(sheetRenameUpdate, this.updateUndoRedoSheetReferences);
        }
    };
    /**
     * Destroy undo redo module.
     *
     * @returns {void} - Destroy undo redo module.
     */
    UndoRedo.prototype.destroy = function () {
        this.removeEventListener();
        if (this.undoCollection.length > 0) {
            this.undoCollection = [];
        }
        if (this.redoCollection.length > 0) {
            this.redoCollection = [];
        }
        if (this.beforeActionData && this.beforeActionData.cellDetails) {
            this.beforeActionData.cellDetails = [];
        }
        this.parent = null;
    };
    /**
     * Get the undo redo module name.
     *
     * @returns {string} - Get the undo redo module name.
     */
    UndoRedo.prototype.getModuleName = function () {
        return 'undoredo';
    };
    return UndoRedo;
}());
export { UndoRedo };
