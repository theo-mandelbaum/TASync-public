import { getCell, setCell, getData, getSheet, isHiddenRow, wrap as wrapText } from '../base/index';
import { DataManager, Query, DataUtil, Deferred } from '@syncfusion/ej2-data';
import { getCellIndexes, getColumnHeaderText, getRangeAddress, workbookLocale, isNumber, getUpdatedFormula, getDataRange, getCellAddress } from '../common/index';
import { getSwapRange } from '../common/index';
import { parseIntValue, getColIndex } from '../common/index';
import { initiateSort, updateSortedDataOnCell } from '../common/event';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { refreshFilterRange } from '../../spreadsheet/common/event';
/**
 * The `WorkbookSort` module is used to handle sort action in Spreadsheet.
 */
var WorkbookSort = /** @class */ (function () {
    /**
     * Constructor for WorkbookSort module.
     *
     * @param {Workbook} parent - Specifies the workbook.
     */
    function WorkbookSort(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the sort module.
     *
     * @returns {void} - To destroy the sort module.
     */
    WorkbookSort.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    WorkbookSort.prototype.addEventListener = function () {
        this.parent.on(initiateSort, this.initiateSortHandler, this);
        this.parent.on(updateSortedDataOnCell, this.updateSortedDataOnCell, this);
    };
    WorkbookSort.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(initiateSort, this.initiateSortHandler);
            this.parent.off(updateSortedDataOnCell, this.updateSortedDataOnCell);
        }
    };
    /**
     * Sorts range of cells in the sheet.
     *
     * @param {{ args: BeforeSortEventArgs, promise: Promise<SortEventArgs> }} eventArgs - Specify the arguments.
     * @param {BeforeSortEventArgs} eventArgs.args - arguments for sorting.
     * @param {Promise<SortEventArgs>} eventArgs.promise - Specify the promise.
     * @param {SortCollectionModel} eventArgs.previousSort - Specify the previous sort model.
     * @returns {void} - Sorts range of cells in the sheet.
     */
    WorkbookSort.prototype.initiateSortHandler = function (eventArgs) {
        var _this = this;
        var args = eventArgs.args;
        var deferred = new Deferred();
        var addressInfo = this.parent.getAddressInfo(args.range);
        var sheet = getSheet(this.parent, addressInfo.sheetIndex);
        var range = getSwapRange(addressInfo.indices);
        var sortOptions = args.sortOptions || { sortDescriptors: {}, containsHeader: true };
        var isSingleCell = false;
        eventArgs.promise = deferred.promise;
        if (range[0] > sheet.usedRange.rowIndex || range[1] > sheet.usedRange.colIndex) {
            deferred.reject(this.parent.serviceLocator.getService(workbookLocale).getConstant('SortOutOfRangeError'));
            return;
        }
        var containsHeader = sortOptions.containsHeader;
        var checkForHeader = args.checkForHeader;
        if (range[0] === range[2] || checkForHeader) { //if selected range is a single cell
            if (!checkForHeader) {
                range = getDataRange(range[0], range[1], sheet);
            }
            isSingleCell = true;
            if (isNullOrUndefined(sortOptions.containsHeader)) {
                if (typeof getCell(range[0], range[1], sheet, null, true).value ===
                    typeof getCell(range[0] + 1, range[1], sheet, null, true).value) {
                    containsHeader = this.isSameStyle(getCell(range[0], range[1], sheet, null, true).style, getCell(range[0] + 1, range[1], sheet, null, true).style) ? this.isHeaderRow(sheet, range) : true;
                }
                else {
                    containsHeader = true;
                }
            }
        }
        if ((isNullOrUndefined(args.sortOptions) || isNullOrUndefined(args.sortOptions.containsHeader)) && !isSingleCell) {
            var firstCell = getCell(range[0], range[1], sheet);
            var secondCell = getCell(range[0] + 1, range[1], sheet);
            if (firstCell && secondCell) {
                if (typeof firstCell.value === typeof secondCell.value) {
                    containsHeader = !this.isSameStyle(firstCell.style, secondCell.style) || this.isHeaderRow(sheet, range);
                }
                else {
                    containsHeader = true;
                }
            }
        }
        range[0] = containsHeader ? range[0] + 1 : range[0];
        var cell = getCellIndexes(sheet.activeCell);
        var header = getColumnHeaderText(cell[1] + 1);
        delete sortOptions.containsHeader;
        var sortDescriptors = sortOptions.sortDescriptors;
        var query = new Query();
        if (Array.isArray(sortDescriptors)) { //multi-column sorting.
            if (!sortDescriptors || sortDescriptors.length === 0) {
                sortDescriptors = [{ field: header }];
            }
            for (var length_1 = sortDescriptors.length, i = length_1 - 1; i > -1; i--) {
                if (!sortDescriptors[length_1 - 1].field) {
                    sortDescriptors[length_1 - 1].field = header;
                }
                if (!sortDescriptors[i].field) {
                    continue;
                }
                var comparerFn = sortDescriptors[i].sortComparer
                    || this.sortComparer.bind(this, sortDescriptors[i], sortOptions.caseSensitive);
                query.sortBy(sortDescriptors[i].field, comparerFn);
                header = sortDescriptors[i].field;
            }
        }
        else { //single column sorting.
            if (!sortDescriptors) {
                sortDescriptors = { field: header };
            }
            if (!sortDescriptors.field) {
                sortDescriptors.field = header;
            }
            var comparerFn = sortDescriptors.sortComparer
                || this.sortComparer.bind(this, sortDescriptors, sortOptions.caseSensitive);
            query.sortBy(sortDescriptors.field, comparerFn);
            header = sortDescriptors.field;
        }
        var address = getRangeAddress(range);
        getData(this.parent, sheet.name + "!" + address, true, null, null, null, null, null, undefined, null, getColIndex(header)).then(function (jsonData) {
            var dataManager = new DataManager(jsonData);
            if (jsonData.length === 1 && (jsonData[0].throwMergeAlert)) {
                var sortModel = _this.parent.sortCollection &&
                    _this.parent.sortCollection[_this.parent.sortCollection.length - 1];
                if (sortModel) {
                    var prevSortModel = void 0;
                    if (eventArgs.previousSort && eventArgs.previousSort.length) {
                        for (var i = 0; i < eventArgs.previousSort.length; i++) {
                            var sort = eventArgs.previousSort[i];
                            if (sortModel.sheetIndex === sort.sheetIndex) {
                                prevSortModel = sort;
                            }
                        }
                    }
                    if (prevSortModel) {
                        sortModel.columnIndex = prevSortModel.columnIndex;
                        sortModel.order = prevSortModel.order;
                        sortModel.sortRange = prevSortModel.sortRange;
                    }
                    else {
                        _this.parent.sortCollection.pop();
                    }
                    _this.parent.notify(refreshFilterRange, null);
                }
                deferred.reject(_this.parent.serviceLocator.getService(workbookLocale).getConstant('AutoFillMergeAlertMsg'));
                return;
            }
            dataManager.executeQuery(query).then(function (e) {
                _this.parent.notify('setActionData', { args: { action: 'beforeSort', eventArgs: { range: address, cellDetails: jsonData, sortedCellDetails: e.result } } });
                _this.updateSortedDataOnCell({ result: e.result, range: range, sheet: sheet, jsonData: jsonData });
                var sortArgs = { range: sheet.name + "!" + address, sortOptions: args.sortOptions };
                if (eventArgs.previousSort) {
                    sortArgs.previousSort = eventArgs.previousSort;
                }
                deferred.resolve(sortArgs);
            });
        });
    };
    WorkbookSort.prototype.isHeaderRow = function (sheet, range) {
        if (!sheet.ranges || !sheet.ranges.length) {
            return false;
        }
        return sheet.ranges.some(function (rangeItem) {
            if (!rangeItem.dataSource || !rangeItem.showFieldAsHeader) {
                return false;
            }
            var startCellIndexes = getCellIndexes(rangeItem.startCell);
            return startCellIndexes[0] === range[0] && startCellIndexes[1] >= range[1] && startCellIndexes[1] <= range[3];
        });
    };
    WorkbookSort.prototype.updateSortedDataOnCell = function (args) {
        var _this = this;
        var fields = [];
        var cell;
        var updateCell = function (rowIdx, data) {
            for (var j = args.range[1], k = 0; j <= args.range[3]; j++, k++) {
                if (!fields[k]) {
                    fields[k] = getColumnHeaderText(j + 1);
                }
                if (data[fields[k]]) {
                    cell = extend({}, data[fields[k]], null, true);
                }
                else {
                    if (!getCell(rowIdx, j, args.sheet)) {
                        continue;
                    }
                    cell = null;
                }
                cell = _this.skipBorderOnSorting(rowIdx, j, args.sheet, cell);
                if (cell && cell.validation) {
                    delete cell.validation;
                }
                var existingCell = getCell(rowIdx, j, args.sheet);
                if (existingCell) {
                    if (existingCell.validation) {
                        cell = Object.assign({}, cell, { validation: existingCell.validation }); // To preserve validation settings
                    }
                    if (existingCell.wrap) {
                        wrapText(getCellAddress(rowIdx, j), false, _this.parent);
                    }
                }
                if (cell && cell.formula) {
                    cell.formula = getUpdatedFormula([rowIdx, j], [parseInt(data['__rowIndex'], 10) - 1, j], args.sheet, _this.parent, cell, true);
                }
                setCell(rowIdx, j, args.sheet, cell);
            }
        };
        var updatedCellDetails = args.isUndo && {};
        var rIdx;
        var result;
        for (var i = args.range[0], idx = 0; i <= args.range[2]; i++, idx++) {
            if (isHiddenRow(args.sheet, i)) {
                idx--;
                continue;
            }
            result = args.result[idx];
            if (args.isUndo) {
                if (result) {
                    rIdx = parseInt(result['__rowIndex'], 10) - 1;
                    updatedCellDetails[rIdx] = true;
                    updateCell(rIdx, result);
                    if (i === rIdx) {
                        continue;
                    }
                }
                if (!updatedCellDetails[i] && args.sheet.rows[i]) {
                    updateCell(i, {});
                }
            }
            else {
                updateCell(i, result || {});
            }
        }
    };
    WorkbookSort.prototype.skipBorderOnSorting = function (rowIndex, colIndex, sheet, cell) {
        var prevCell = getCell(rowIndex, colIndex, sheet);
        var borders = ['borderBottom', 'borderTop', 'borderRight', 'borderLeft', 'border'];
        if (cell && cell.style) {
            for (var _i = 0, borders_1 = borders; _i < borders_1.length; _i++) {
                var border = borders_1[_i];
                delete cell.style["" + border];
            }
        }
        if (prevCell && prevCell.style) {
            for (var _a = 0, borders_2 = borders; _a < borders_2.length; _a++) {
                var border = borders_2[_a];
                if (prevCell.style["" + border]) {
                    if (!cell) {
                        cell = {};
                    }
                    if (!cell.style) {
                        cell.style = {};
                    }
                    cell.style["" + border] = prevCell.style["" + border];
                }
            }
        }
        return cell;
    };
    WorkbookSort.prototype.isSameStyle = function (firstCellStyle, secondCellStyle) {
        if (!firstCellStyle) {
            firstCellStyle = {};
        }
        if (!secondCellStyle) {
            secondCellStyle = {};
        }
        var sameStyle = true;
        var keys = Object.keys(firstCellStyle);
        for (var i = 0; i < keys.length; i++) {
            if (firstCellStyle[keys[i]] === secondCellStyle[keys[i]] || this.parent.cellStyle[keys[i]] ===
                firstCellStyle[keys[i]]) {
                sameStyle = true;
            }
            else {
                sameStyle = false;
                break;
            }
        }
        return sameStyle;
    };
    /**
     * Compares the two cells for sorting.
     *
     * @param {SortDescriptor} sortDescriptor - protocol for sorting.
     * @param {boolean} caseSensitive - value for case sensitive.
     * @param {CellModel} x - first cell
     * @param {CellModel} y - second cell
     * @returns {number} - Compares the two cells for sorting.
     */
    WorkbookSort.prototype.sortComparer = function (sortDescriptor, caseSensitive, x, y) {
        var direction = sortDescriptor.order || '';
        var comparer = DataUtil.fnSort(direction);
        var xVal = x ? x.value : x;
        var yVal = y ? y.value : y;
        if (x && y && (typeof xVal === 'string' || typeof yVal === 'string') && xVal !== '' && yVal !== '') {
            var isXStringVal = void 0;
            var isYStringVal = void 0;
            if (isNumber(x.value)) { // Imported number values are of string type, need to handle this case in server side
                xVal = parseIntValue(x.value);
                if (x.format !== '@') {
                    x.value = xVal;
                }
                isXStringVal = true;
            }
            if (isNumber(y.value)) {
                yVal = parseIntValue(y.value);
                if (y.format !== '@') {
                    y.value = yVal;
                }
                isYStringVal = true;
            }
            if (!isXStringVal && !isYStringVal) {
                var caseOptions = { sensitivity: caseSensitive ? 'case' : 'base' };
                var collator = new Intl.Collator(this.parent.locale, caseOptions);
                if (!direction || direction.toLowerCase() === 'ascending') {
                    return collator.compare(xVal, yVal);
                }
                else {
                    return collator.compare(xVal, yVal) * -1;
                }
            }
        }
        if (isNullOrUndefined(yVal) || yVal === '') {
            return -1;
        }
        if (isNullOrUndefined(xVal) || xVal === '') {
            return 1;
        }
        return comparer(xVal, yVal);
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Get the module name.
     */
    WorkbookSort.prototype.getModuleName = function () {
        return 'workbookSort';
    };
    return WorkbookSort;
}());
export { WorkbookSort };
