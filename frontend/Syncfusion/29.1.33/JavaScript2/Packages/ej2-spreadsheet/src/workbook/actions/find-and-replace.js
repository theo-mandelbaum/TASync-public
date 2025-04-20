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
import { getCell, getSheet, isHiddenRow, isHiddenCol, getColumn, getRow } from '../base/index';
import { getCellIndexes, getCellAddress, find, count, getRangeIndexes, getSheetIndexFromAddress, isReadOnly, workbookReadonlyAlert } from '../common/index';
import { goto, replace, replaceAll, showFindAlert, replaceAllDialog } from '../common/index';
import { isNullOrUndefined, isUndefined, getNumericObject } from '@syncfusion/ej2-base';
import { findAllValues, workBookeditAlert, updateCell, beginAction } from '../common/index';
import { isLocked, findToolDlg, getFormattedCellObject } from '../common/index';
import { isNumber, isCustomDateTime } from '../index';
/**
 * `WorkbookFindAndReplace` module is used to handle the search action in Spreadsheet.
 */
var WorkbookFindAndReplace = /** @class */ (function () {
    /**
     * Constructor for WorkbookFindAndReplace module.
     *
     * @param {Workbook} parent - Specifies the workbook.
     */
    function WorkbookFindAndReplace(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the FindAndReplace module.
     *
     * @returns {void} - To destroy the FindAndReplace module.
     */
    WorkbookFindAndReplace.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    WorkbookFindAndReplace.prototype.addEventListener = function () {
        this.parent.on(find, this.find, this);
        this.parent.on(replace, this.replace, this);
        this.parent.on(replaceAll, this.replaceAll, this);
        this.parent.on(count, this.totalCount, this);
        this.parent.on(findAllValues, this.findAllValues, this);
    };
    WorkbookFindAndReplace.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(find, this.find);
            this.parent.off(replace, this.replace);
            this.parent.off(replaceAll, this.replaceAll);
            this.parent.off(count, this.totalCount);
            this.parent.off(findAllValues, this.findAllValues);
        }
    };
    WorkbookFindAndReplace.prototype.find = function (args) {
        args.sheetIndex = isUndefined(args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex;
        var sheet = this.parent.sheets[args.sheetIndex];
        var activeCell = getRangeIndexes(sheet.activeCell);
        var findArgs = { startRow: activeCell[0], startCol: activeCell[1],
            findVal: args.isCSen ? args.value : args.value.toLowerCase(), activeCell: activeCell };
        if (args.searchBy === 'By Row' ? findArgs.startRow > sheet.usedRange.rowIndex : findArgs.startCol > sheet.usedRange.colIndex) {
            if (args.findOpt === 'next') {
                findArgs.startRow = findArgs.startCol = 0;
            }
            else {
                findArgs.startRow = sheet.usedRange.rowIndex;
                findArgs.startCol = sheet.usedRange.colIndex;
            }
        }
        else {
            if (args.searchBy === 'By Row') {
                if (findArgs.startCol > sheet.usedRange.colIndex) {
                    if (args.findOpt === 'next') {
                        findArgs.startRow++;
                        if (findArgs.startRow > sheet.usedRange.rowIndex) {
                            findArgs.startRow = 0;
                        }
                        findArgs.startCol = 0;
                    }
                    else {
                        findArgs.startRow--;
                        if (findArgs.startRow < 0) {
                            findArgs.startRow = sheet.usedRange.rowIndex;
                        }
                        findArgs.startCol = sheet.usedRange.colIndex;
                    }
                }
            }
            else {
                if (findArgs.startRow > sheet.usedRange.rowIndex) {
                    if (args.findOpt === 'next') {
                        findArgs.startCol++;
                        if (findArgs.startCol > sheet.usedRange.colIndex) {
                            findArgs.startRow = 0;
                        }
                        findArgs.startRow = 0;
                    }
                    else {
                        findArgs.startCol--;
                        if (findArgs.startCol < 0) {
                            findArgs.startCol = sheet.usedRange.colIndex;
                        }
                        findArgs.startRow = sheet.usedRange.colIndex;
                    }
                }
            }
        }
        if (args.mode === 'Workbook') {
            findArgs.sheets = this.parent.sheets;
            findArgs.sheetIdx = args.sheetIndex;
        }
        else {
            findArgs.sheets = [sheet];
            findArgs.sheetIdx = 0;
        }
        var headerHgt;
        var hdrPanel = args.showDialog && this.parent.element && this.parent.element.querySelector('.e-header-panel');
        if (hdrPanel) {
            headerHgt = (hdrPanel.offsetHeight || (sheet.showHeaders ? 30 : 0)) + 1;
        }
        args.localeObj = getNumericObject(this.parent.locale);
        if (args.findOpt === 'next') {
            this.findNext(args, findArgs);
        }
        else {
            this.findPrevious(args, findArgs);
        }
        if (args.showDialog) {
            this.parent.notify(findToolDlg, { findValue: args.value, isPublic: true, headerHgt: headerHgt });
        }
    };
    WorkbookFindAndReplace.prototype.findNext = function (args, findArgs) {
        var _this = this;
        var findOnSheet = function (startIdx, endIdx, initIteration) {
            var sheet;
            var cellAddr;
            for (var sheetIdx = startIdx; sheetIdx <= endIdx; sheetIdx++) {
                sheet = findArgs.sheets[sheetIdx];
                if (sheetIdx === findArgs.sheetIdx) {
                    if (initIteration) {
                        cellAddr = _this.findNextOnSheet(args, findArgs.startRow, findArgs.startCol, findArgs.findVal, sheet, undefined, findArgs.activeCell);
                    }
                    else {
                        cellAddr = _this.findNextOnSheet(args, 0, 0, findArgs.findVal, sheet, args.searchBy === 'By Row' ? findArgs.startRow : findArgs.startCol);
                    }
                }
                else {
                    cellAddr = _this.findNextOnSheet(args, 0, 0, findArgs.findVal, sheet);
                }
                if (cellAddr) {
                    break;
                }
            }
            return cellAddr;
        };
        var cellAddr = findOnSheet(findArgs.sheetIdx, findArgs.sheets.length - 1, true);
        if (!cellAddr) {
            cellAddr = findOnSheet(0, findArgs.sheetIdx);
        }
        if (cellAddr) {
            this.parent.notify(goto, { address: cellAddr });
        }
        else {
            this.parent.notify(showFindAlert, null);
        }
    };
    WorkbookFindAndReplace.prototype.findNextOnSheet = function (args, startRow, startCol, findVal, sheet, endIdx, activeCell) {
        var cellAddr;
        var rowIdx;
        var colIdx;
        if (args.searchBy === 'By Row') {
            if (endIdx === undefined) {
                endIdx = sheet.rows.length - 1;
            }
            var colLen = void 0;
            for (rowIdx = startRow; rowIdx <= endIdx; rowIdx++) {
                if (isHiddenRow(sheet, rowIdx)) {
                    continue;
                }
                colIdx = activeCell && rowIdx === startRow ? startCol : 0;
                colLen = sheet.rows[rowIdx] && sheet.rows[rowIdx].cells && sheet.rows[rowIdx].cells.length;
                for (colIdx; colIdx < colLen; colIdx++) {
                    if (!isHiddenCol(sheet, colIdx)) {
                        cellAddr = this.checkMatch(args, findVal, rowIdx, colIdx, sheet, activeCell);
                        if (cellAddr) {
                            return cellAddr;
                        }
                    }
                }
            }
        }
        else {
            if (endIdx === undefined) {
                endIdx = sheet.usedRange.colIndex;
            }
            var endRow = sheet.rows && sheet.rows.length - 1;
            for (colIdx = startCol; colIdx <= endIdx; colIdx++) {
                if (isHiddenCol(sheet, colIdx)) {
                    continue;
                }
                rowIdx = activeCell && colIdx === startCol ? startRow : 0;
                for (rowIdx; rowIdx <= endRow; rowIdx++) {
                    if (!isHiddenRow(sheet, rowIdx)) {
                        cellAddr = this.checkMatch(args, findVal, rowIdx, colIdx, sheet, activeCell);
                        if (cellAddr) {
                            return cellAddr;
                        }
                    }
                }
            }
        }
        return cellAddr;
    };
    WorkbookFindAndReplace.prototype.findPrevious = function (args, findArgs) {
        var _this = this;
        var findOnSheet = function (startIdx, endIdx, initIteration) {
            var sheet;
            var cellAddr;
            for (var sheetIdx = startIdx; sheetIdx >= endIdx; sheetIdx--) {
                sheet = findArgs.sheets[sheetIdx];
                if (sheetIdx === findArgs.sheetIdx) {
                    if (initIteration) {
                        cellAddr = _this.findPrevOnSheet(args, findArgs.startRow, findArgs.startCol, 0, 0, findArgs.findVal, sheet, findArgs.activeCell);
                    }
                    else {
                        if (args.searchBy === 'By Row') {
                            cellAddr = _this.findPrevOnSheet(args, sheet.usedRange.rowIndex, sheet.usedRange.colIndex, findArgs.startRow, 0, findArgs.findVal, sheet);
                        }
                        else {
                            cellAddr = _this.findPrevOnSheet(args, sheet.usedRange.rowIndex, sheet.usedRange.colIndex, 0, findArgs.startCol, findArgs.findVal, sheet);
                        }
                    }
                }
                else {
                    cellAddr = _this.findPrevOnSheet(args, sheet.usedRange.rowIndex, sheet.usedRange.colIndex, 0, 0, findArgs.findVal, sheet);
                }
                if (cellAddr) {
                    break;
                }
            }
            return cellAddr;
        };
        var cellAddr;
        cellAddr = findOnSheet(findArgs.sheetIdx, 0, true);
        if (!cellAddr) {
            cellAddr = findOnSheet(findArgs.sheets.length - 1, findArgs.sheetIdx);
        }
        if (cellAddr) {
            this.parent.notify(goto, { address: cellAddr });
        }
        else {
            this.parent.notify(showFindAlert, null);
        }
    };
    WorkbookFindAndReplace.prototype.findPrevOnSheet = function (args, startRow, startCol, endRow, endCol, findVal, sheet, activeCell) {
        var cellAddr;
        var colIdx;
        var rowIdx;
        if (args.searchBy === 'By Row') {
            for (rowIdx = startRow; rowIdx >= endRow; rowIdx--) {
                if (isHiddenRow(sheet, rowIdx)) {
                    continue;
                }
                colIdx = activeCell && rowIdx === startRow ? startCol : sheet.rows[rowIdx] &&
                    sheet.rows[rowIdx].cells && sheet.rows[rowIdx].cells.length - 1;
                for (colIdx; colIdx >= endCol; colIdx--) {
                    if (!isHiddenCol(sheet, colIdx)) {
                        cellAddr = this.checkMatch(args, findVal, rowIdx, colIdx, sheet, activeCell);
                        if (cellAddr) {
                            return cellAddr;
                        }
                    }
                }
            }
        }
        else {
            for (colIdx = startCol; colIdx >= endCol; colIdx--) {
                if (isHiddenCol(sheet, colIdx)) {
                    continue;
                }
                rowIdx = activeCell && colIdx === startCol ? startRow : sheet.rows && sheet.rows.length - 1;
                for (rowIdx; rowIdx >= endRow; rowIdx--) {
                    if (!isHiddenRow(sheet, rowIdx)) {
                        cellAddr = this.checkMatch(args, findVal, rowIdx, colIdx, sheet, activeCell);
                        if (cellAddr) {
                            return cellAddr;
                        }
                    }
                }
            }
        }
        return cellAddr;
    };
    WorkbookFindAndReplace.prototype.checkMatch = function (args, findVal, rowIdx, colIdx, sheet, curCell) {
        if (curCell && rowIdx === curCell[0] && colIdx === curCell[1]) {
            return null;
        }
        var cell = getCell(rowIdx, colIdx, sheet, false, true);
        if (sheet.isProtected && !sheet.protectSettings.selectCells && sheet.protectSettings.selectUnLockedCells &&
            isLocked(cell, getColumn(sheet, colIdx))) {
            return null;
        }
        var checkValues = function (cellVal) {
            if (cellVal) {
                if (!args.isCSen) {
                    cellVal = cellVal.toLowerCase();
                }
                if (args.isEMatch) {
                    if (cellVal === findVal) {
                        return sheet.name + "!" + getCellAddress(rowIdx, colIdx);
                    }
                }
                else if (cellVal.includes(findVal)) {
                    return sheet.name + "!" + getCellAddress(rowIdx, colIdx);
                }
            }
            return null;
        };
        var displayText = this.getDisplayText(cell, rowIdx, colIdx, args.localeObj);
        var cellAddr = checkValues(displayText);
        if (!cellAddr) {
            cell = getCell(rowIdx, colIdx, sheet, false, true);
            if (cell.format && !isCustomDateTime(cell.format, true) && !displayText.includes('%')) {
                cellAddr = checkValues(this.getCellVal(cell, args.localeObj));
            }
        }
        return cellAddr;
    };
    WorkbookFindAndReplace.prototype.replace = function (args) {
        var _this = this;
        var sheetIndex = isUndefined(args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex;
        var sheet = getSheet(this.parent, args.sheetIndex);
        if (sheet.isProtected) {
            this.parent.notify(workBookeditAlert, null);
            return;
        }
        var address = args.address;
        var activeCell = getRangeIndexes(address || sheet.activeCell);
        var activeCellModel = getCell(activeCell[0], activeCell[1], sheet, false, true);
        var compareVal = this.parent.getDisplayText(activeCellModel).toString();
        var checkValue;
        args.value = args.value.toString();
        if (!args.isCSen) {
            checkValue = args.value.toLowerCase();
        }
        var localeObj = getNumericObject(this.parent.locale);
        var getReplaceValue = function (isRecursive) {
            var replaceVal;
            if (args.isCSen) {
                if (args.isEMatch) {
                    replaceVal = compareVal === args.value && args.replaceValue;
                }
                else {
                    replaceVal = compareVal.indexOf(args.value) > -1 && compareVal.replace(args.value, args.replaceValue);
                }
            }
            else {
                if (args.isEMatch) {
                    replaceVal = compareVal.toLowerCase() === checkValue && args.replaceValue;
                }
                else {
                    var regExp = RegExp;
                    replaceVal = (compareVal.toLowerCase().includes(checkValue)) &&
                        compareVal.replace(new regExp(args.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig'), args.replaceValue);
                }
            }
            if (!isRecursive && !replacedValue && activeCellModel.format && !isCustomDateTime(activeCellModel.format, true) &&
                !compareVal.includes('%')) {
                compareVal = _this.getCellVal(activeCellModel, localeObj);
                if (compareVal) {
                    replaceVal = getReplaceValue(true);
                }
            }
            return replaceVal;
        };
        var replacedValue = getReplaceValue();
        if (!replacedValue) {
            args.findOpt = 'next';
            this.find(args);
            activeCell = getCellIndexes(sheet.activeCell);
            activeCellModel = getCell(activeCell[0], activeCell[1], sheet, false, true);
            compareVal = this.parent.getDisplayText(activeCellModel).toString();
            replacedValue = getReplaceValue();
            if (!replacedValue) {
                return;
            }
        }
        if (isReadOnly(getCell(activeCell[0], activeCell[1], sheet), getColumn(sheet, activeCell[1]), getRow(sheet, activeCell[0]))) {
            this.parent.notify(workbookReadonlyAlert, null);
            return;
        }
        var eventArgs = { address: sheet.name + "!" + getCellAddress(activeCell[0], activeCell[1]), cancel: false,
            compareValue: args.value, replaceValue: args.replaceValue, sheetIndex: sheetIndex };
        if (args.isAction) {
            this.parent.notify(beginAction, { action: 'beforeReplace', eventArgs: eventArgs });
            if (eventArgs.cancel) {
                return;
            }
            delete eventArgs.cancel;
        }
        updateCell(this.parent, sheet, { cell: { value: replacedValue }, rowIdx: activeCell[0], colIdx: activeCell[1], uiRefresh: true,
            checkCF: true, valChange: true });
        if (args.isAction) {
            this.parent.notify('actionComplete', { action: 'replace', eventArgs: eventArgs });
        }
    };
    WorkbookFindAndReplace.prototype.replaceAll = function (args) {
        var _this = this;
        var startSheet = args.mode === 'Sheet' ? args.sheetIndex : 0;
        var sheet = this.parent.sheets[startSheet];
        var endRow = sheet.usedRange.rowIndex;
        var startRow = 0;
        var endColumn = sheet.usedRange.colIndex;
        var startColumn = 0;
        var addressCollection = [];
        var triggerEvent = args.isAction;
        var activeCellIdx = getCellIndexes(sheet.activeCell);
        var eventArgs = __assign({ addressCollection: addressCollection, cancel: false }, args);
        var replaceCount = 0;
        var updateAsync = function (val, index, cell) {
            if (requestAnimationFrame) {
                requestAnimationFrame(function () {
                    if (!eventArgs.cancel && eventArgs.addressCollection[index]) {
                        var indexes = getCellIndexes(eventArgs.addressCollection[index].substring(eventArgs.addressCollection[index].lastIndexOf('!') + 1));
                        var sheetIndex = getSheetIndexFromAddress(_this.parent, eventArgs.addressCollection[index]);
                        updateCell(_this.parent, _this.parent.sheets[sheetIndex], { cell: { value: val }, rowIdx: indexes[0],
                            uiRefresh: true, checkCF: true, colIdx: indexes[1], valChange: true,
                            skipFormatCheck: args.skipFormatCheck });
                        if (activeCellIdx[0] === indexes[0] && activeCellIdx[1] === indexes[1]) {
                            _this.parent.notify('formulaBarOperation', { action: 'refreshFormulabar',
                                cell: getCell(indexes[0], indexes[1], _this.parent.sheets[sheetIndex], false, true) });
                        }
                        if (index === eventArgs.addressCollection.length - 1 && triggerEvent) {
                            _this.parent.notify('actionComplete', { action: 'replaceAll', eventArgs: eventArgs });
                        }
                    }
                });
            }
            else {
                _this.parent.updateCellDetails({ value: val }, eventArgs.addressCollection[index], undefined, undefined, true);
            }
            if (!cell.formula) {
                replaceCount++;
            }
        };
        var checkMatch = function (cellval, cell) {
            var matchFound;
            if (cellval) {
                if (args.isCSen) {
                    if (args.isEMatch) {
                        if (cellval === args.value) {
                            updateAsync(args.replaceValue, addressCollection.length, cell);
                            addressCollection.push(sheet.name + '!' + getCellAddress(startRow, startColumn));
                            matchFound = true;
                        }
                    }
                    else {
                        if (cellval.indexOf(args.value) > -1) {
                            updateAsync(cellval.replace(args.value, args.replaceValue), addressCollection.length, cell);
                            addressCollection.push(sheet.name + '!' + getCellAddress(startRow, startColumn));
                            matchFound = true;
                        }
                    }
                }
                else {
                    if (args.isEMatch) {
                        if (cellval.toLowerCase() === args.value) {
                            updateAsync(args.replaceValue, addressCollection.length, cell);
                            addressCollection.push(sheet.name + '!' + getCellAddress(startRow, startColumn));
                            matchFound = true;
                        }
                    }
                    else {
                        var val = cellval.toLowerCase();
                        if ((cellval === args.value || val.indexOf(args.value.toString().toLowerCase()) > -1) || val ===
                            args.value || cellval === args.value || val.indexOf(args.value) > -1) {
                            var regExp = RegExp;
                            regX = new regExp(args.value.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
                            updateAsync(cellval.replace(regX, args.replaceValue), addressCollection.length, cell);
                            addressCollection.push(sheet.name + '!' + getCellAddress(startRow, startColumn));
                            matchFound = true;
                        }
                    }
                }
            }
            return matchFound;
        };
        var displayText;
        var row;
        var regX;
        var localeObj = getNumericObject(this.parent.locale);
        var cell;
        for (startRow; startRow <= endRow + 1; startRow++) {
            if (startColumn > endColumn && startRow > endRow) {
                if (args.mode === 'Workbook') {
                    startSheet++;
                    sheet = this.parent.sheets[startSheet];
                    if (sheet) {
                        startColumn = 0;
                        startRow = 0;
                        endColumn = sheet.usedRange.colIndex;
                        endRow = sheet.usedRange.rowIndex;
                    }
                    else {
                        break;
                    }
                }
            }
            row = sheet.rows[startRow];
            if (row) {
                if (startColumn === endColumn + 1) {
                    startColumn = 0;
                }
                for (startColumn; startColumn <= endColumn; startColumn++) {
                    if (row) {
                        cell = row.cells && row.cells[startColumn];
                        if (cell) {
                            if (isReadOnly(cell, getColumn(sheet, startColumn), row)) {
                                continue;
                            }
                            displayText = this.getDisplayText(cell, startRow, startColumn, localeObj).toString();
                            if (!checkMatch(displayText, cell) && cell.format && !isCustomDateTime(cell.format, true) &&
                                !displayText.includes('%')) {
                                checkMatch(this.getCellVal(row.cells[startColumn], localeObj), cell);
                            }
                        }
                    }
                }
            }
        }
        if (addressCollection.length && triggerEvent) {
            this.parent.notify('actionBegin', { action: 'beforeReplaceAll', eventArgs: eventArgs });
            if (!eventArgs.cancel) {
                this.parent.notify(replaceAllDialog, { count: replaceCount, replaceValue: eventArgs.replaceValue });
            }
        }
        else {
            this.parent.notify(replaceAllDialog, { count: replaceCount, replaceValue: eventArgs.replaceValue });
        }
    };
    WorkbookFindAndReplace.prototype.getDisplayText = function (cell, rowIdx, colIdx, localeObj) {
        if (!cell) {
            return '';
        }
        if (!cell.value && cell.value !== 0) {
            if (cell.hyperlink) {
                return typeof cell.hyperlink === 'string' ? cell.hyperlink : cell.hyperlink.address || '';
            }
            return '';
        }
        var cellValue = cell.value.toString();
        if (cell.format || cellValue.includes(localeObj.dateSeparator)) {
            var eventArgs = { value: cell.value, format: cell.format, formattedText: cell.value, cell: cell,
                rowIndex: rowIdx, colIndex: colIdx };
            this.parent.notify(getFormattedCellObject, eventArgs);
            return eventArgs.formattedText;
        }
        else {
            return cellValue;
        }
    };
    WorkbookFindAndReplace.prototype.getCellVal = function (cell, localeObj) {
        if (isNumber(cell.value)) {
            if (localeObj.decimal !== '.') {
                return cell.value.toString().split('.').join(localeObj.decimal);
            }
            return cell.value.toString();
        }
        return cell.value ? cell.value.toString().toLowerCase() : '';
    };
    WorkbookFindAndReplace.prototype.totalCount = function (args) {
        var _this = this;
        var sheet = this.parent.sheets[args.sheetIndex];
        var activeCell = getCellIndexes(sheet.activeCell);
        var count = 0;
        var requiredCount = 0;
        var findValue = args.value.toLowerCase();
        var localeObj = getNumericObject(this.parent.locale);
        var displayText;
        sheet.rows.filter(function (row, rowIdx) { return row && row.cells && (!row.isFiltered && !row.hidden) &&
            row.cells.filter(function (cell, colIdx) {
                if (cell && (cell.value || cell.value === 0) && !isHiddenCol(sheet, colIdx) && (!sheet.isProtected ||
                    sheet.protectSettings.selectCells || !isLocked(cell, getColumn(sheet, colIdx)))) {
                    displayText = _this.getDisplayText(cell, rowIdx, colIdx, localeObj).toLowerCase();
                    if (displayText.includes(findValue) || (cell.format && !isCustomDateTime(cell.format, true) &&
                        !displayText.includes('%') && _this.getCellVal(cell, localeObj).includes(findValue))) {
                        count++;
                        if ((rowIdx === activeCell[0] && colIdx >= activeCell[1]) || rowIdx > activeCell[0]) {
                            requiredCount++;
                        }
                    }
                }
            }); });
        requiredCount -= 1;
        var totalCount = count;
        count = totalCount - requiredCount;
        if (count > totalCount) {
            count = totalCount;
        }
        if (count !== 0 && !this.parent.getDisplayText(getCell(activeCell[0], activeCell[1], sheet)).toLowerCase().includes(findValue)) {
            count -= 1;
        }
        args.findCount = count + " of " + totalCount;
    };
    WorkbookFindAndReplace.prototype.findAllValues = function (findAllArguments) {
        var startSheet = findAllArguments.sheetIndex;
        var sheet = this.parent.sheets[startSheet];
        var endRow = sheet.usedRange.rowIndex;
        var rowIndex = 0;
        var count = 0;
        var address;
        var endColumn = sheet.usedRange.colIndex;
        var columnIndex = 0;
        var sheetLength = this.parent.sheets.length;
        var initialSheet = findAllArguments.sheetIndex;
        for (rowIndex; rowIndex <= endRow + 1; rowIndex++) {
            if ((initialSheet !== 1) && (findAllArguments.sheetIndex === sheetLength)) {
                startSheet = 1;
            }
            if (rowIndex > endRow && columnIndex > endColumn) {
                if (findAllArguments.mode === 'Workbook') {
                    startSheet++;
                    if (startSheet > sheetLength - 1) {
                        startSheet = 0;
                    }
                    if (initialSheet === startSheet) {
                        if (count === 0) {
                            return;
                        }
                        return;
                    }
                    sheet = this.parent.sheets[startSheet];
                    if (sheet) {
                        rowIndex = 0;
                        columnIndex = 0;
                        endColumn = sheet.usedRange.colIndex;
                        endRow = sheet.usedRange.rowIndex;
                    }
                }
            }
            if (!isNullOrUndefined(sheet)) {
                if (sheet.rows[rowIndex]) {
                    var row = sheet.rows[rowIndex];
                    if (columnIndex === endColumn + 2) {
                        columnIndex = 0;
                    }
                    for (columnIndex; columnIndex <= endColumn + 1; columnIndex++) {
                        if (row) {
                            if (row.cells && row.cells[columnIndex]) {
                                var cell = sheet.rows[rowIndex].cells[columnIndex];
                                if (cell && !isNullOrUndefined(cell.value) && cell.value !== '' && (!sheet.isProtected ||
                                    sheet.protectSettings.selectCells || (sheet.protectSettings.selectUnLockedCells &&
                                    !isLocked(cell, getColumn(sheet, columnIndex))))) {
                                    var cellFormat = cell.format;
                                    var cellvalue = void 0;
                                    if (cellFormat) {
                                        var displayTxt = this.parent.getDisplayText(sheet.rows[rowIndex].cells[columnIndex]);
                                        cellvalue = displayTxt.toString();
                                    }
                                    else {
                                        cellvalue = cell.value.toString();
                                    }
                                    if (findAllArguments.isCSen && findAllArguments.isEMatch) {
                                        if (cellvalue === findAllArguments.value) {
                                            address = sheet.name + '!' + getCellAddress(rowIndex, columnIndex);
                                            findAllArguments.findCollection.push(address);
                                            count++;
                                        }
                                    }
                                    else if (findAllArguments.isCSen && !findAllArguments.isEMatch) {
                                        var index = cellvalue.indexOf(findAllArguments.value) > -1;
                                        if ((cellvalue === findAllArguments.value) || (index)) {
                                            address = sheet.name + '!' + getCellAddress(rowIndex, columnIndex);
                                            findAllArguments.findCollection.push(address);
                                            count++;
                                        }
                                    }
                                    else if (!findAllArguments.isCSen && findAllArguments.isEMatch) {
                                        var val = cellvalue.toString().toLowerCase();
                                        if (val === findAllArguments.value.toLowerCase()) {
                                            address = sheet.name + '!' + getCellAddress(rowIndex, columnIndex);
                                            findAllArguments.findCollection.push(address);
                                            count++;
                                        }
                                    }
                                    else if (!findAllArguments.isCSen && !findAllArguments.isEMatch) {
                                        var val = cellvalue.toString().toLowerCase();
                                        var index = val.indexOf(findAllArguments.value.toLowerCase()) > -1;
                                        if ((val === findAllArguments.value) || ((cellvalue === findAllArguments.value) || (index)) ||
                                            ((cellvalue === findAllArguments.value))) {
                                            address = sheet.name + '!' + getCellAddress(rowIndex, columnIndex);
                                            findAllArguments.findCollection.push(address);
                                            count++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (count === 0) {
            return;
        }
        return;
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Return the string
     */
    WorkbookFindAndReplace.prototype.getModuleName = function () {
        return 'workbookfindAndReplace';
    };
    return WorkbookFindAndReplace;
}());
export { WorkbookFindAndReplace };
