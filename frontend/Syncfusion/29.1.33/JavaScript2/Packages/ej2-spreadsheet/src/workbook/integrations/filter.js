import { getData, getSheet } from '../base/index';
import { DataManager, Deferred } from '@syncfusion/ej2-data';
import { getIndexesFromAddress, getSwapRange, getRangeAddress, getRangeIndexes, skipHiddenIdx, getSheetIndexFromAddress, applyPredicates } from '../common/index';
import { setRow, getSheetIndex } from '../index';
import { initiateFilter, hideShow } from '../common/event';
/**
 * The `WorkbookFilter` module is used to handle filter action in Spreadsheet.
 */
var WorkbookFilter = /** @class */ (function () {
    /**
     * Constructor for WorkbookFilter module.
     *
     * @param {Workbook} parent - Constructor for WorkbookFilter module.
     */
    function WorkbookFilter(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the filter module.
     *
     * @returns {void} - To destroy the filter module.
     */
    WorkbookFilter.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    WorkbookFilter.prototype.addEventListener = function () {
        this.parent.on(initiateFilter, this.initiateFilterHandler, this);
    };
    WorkbookFilter.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(initiateFilter, this.initiateFilterHandler);
        }
    };
    /**
     * Filters a range of cells in the sheet.
     *
     * @param { {args: BeforeFilterEventArgs, promise: Promise<FilterEventArgs>}} eventArgs - Specify the event args.
     * @param {BeforeFilterEventArgs} eventArgs.args - arguments for filtering..
     * @param {Promise<FilterEventArgs>} eventArgs.promise - Specify the promise.
     * @param {boolean} eventArgs.refresh - Specify the refresh.
     * @returns {void} - Filters a range of cells in the sheet.
     */
    WorkbookFilter.prototype.initiateFilterHandler = function (eventArgs) {
        var _this = this;
        var args = eventArgs.args;
        var deferred = new Deferred();
        var sheet = getSheet(this.parent, getSheetIndexFromAddress(this.parent, args.range));
        var filterOptions = args.filterOptions || {};
        eventArgs.promise = deferred.promise;
        if (filterOptions.datasource) {
            this.setFilter(filterOptions.datasource, filterOptions.predicates, args.range, eventArgs.refresh, filterOptions.equalOrPredicates);
            var filterEventArgs = { range: args.range, filterOptions: filterOptions };
            deferred.resolve(filterEventArgs);
        }
        else {
            var range = getSwapRange(getIndexesFromAddress(args.range));
            if (range[0] > sheet.usedRange.rowIndex || range[1] > sheet.usedRange.colIndex) {
                deferred.reject('Select a cell or range inside the used range and try again.');
                return;
            }
            if (range[0] === range[2] && (range[2] - range[0]) === 0) { //if selected range is a single cell
                range[0] = 0;
                range[1] = 0;
                range[3] = sheet.usedRange.colIndex;
            }
            range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
            range[0] = range[0] + 1; //ignore first row
            var address_1 = getRangeAddress(range);
            getData(this.parent, sheet.name + "!" + address_1, true, true, null, null, null, null, false).then(function (jsonData) {
                var dataManager = new DataManager(jsonData);
                _this.setFilter(dataManager, filterOptions.predicates, args.range, eventArgs.refresh);
                var filterEventArgs = { range: address_1, filterOptions: filterOptions };
                deferred.resolve(filterEventArgs);
            });
        }
    };
    /**
     * Hides or unhides the rows based on the filter predicates.
     *
     * @param {DataManager} dataManager - Specify the dataManager.
     * @param {Predicate[]} predicates - Specify the predicates.
     * @param {string} range - Specify the range.
     * @param {boolean} refresh - Specify the refresh.
     * @param {Predicate[]} equalOrPredicates - Specify the equal condition or predicates.
     * @returns {void} - Hides or unhides the rows based on the filter predicates.
     */
    WorkbookFilter.prototype.setFilter = function (dataManager, predicates, range, refresh, equalOrPredicates) {
        var _this = this;
        if (dataManager && predicates) {
            var jsonData = dataManager.dataSource.json;
            var result_1 = applyPredicates(dataManager, predicates, equalOrPredicates);
            var rowKey_1 = '__rowIndex';
            var sheet_1;
            var sheetIdx_1;
            if (range.indexOf('!') > -1) {
                sheetIdx_1 = getSheetIndex(this.parent, range.substring(0, range.lastIndexOf('!')));
                sheet_1 = getSheet(this.parent, sheetIdx_1);
            }
            else {
                sheet_1 = this.parent.getActiveSheet();
                sheetIdx_1 = getSheetIndex(this.parent, sheet_1.name);
            }
            if (this.parent.getModuleName() === 'spreadsheet') {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var parent_1 = this.parent;
                var hide_1;
                var refreshUI_1;
                if ((parent_1.scrollSettings.enableVirtualization && ((sheet_1.rows || jsonData).length > (parent_1.viewport.rowCount +
                    (parent_1.getThreshold('row') * 2))) || sheet_1.frozenRows || sheet_1.frozenColumns) || refresh) {
                    jsonData.forEach(function (data) {
                        hide_1 = result_1.indexOf(data) < 0;
                        setRow(sheet_1, Number(data["" + rowKey_1]) - 1, { hidden: hide_1, isFiltered: hide_1 });
                    });
                    refreshUI_1 = sheetIdx_1 === parent_1.activeSheetIndex;
                    var paneIndexes = getRangeIndexes(sheet_1.paneTopLeftCell);
                    this.parent.updateTopLeftCell(skipHiddenIdx(sheet_1, paneIndexes[0], true) - this.parent.frozenRowCount(sheet_1), null, 'col');
                }
                else {
                    jsonData.forEach(function (data) {
                        hide_1 = result_1.indexOf(data) < 0;
                        if (refreshUI_1) {
                            setRow(sheet_1, Number(data["" + rowKey_1]) - 1, { hidden: hide_1, isFiltered: hide_1 });
                        }
                        else {
                            var eventArgs = { startIndex: Number(data["" + rowKey_1]) - 1, hide: hide_1,
                                isFiltering: true, sheetIndex: sheetIdx_1 };
                            eventArgs.endIndex = eventArgs.startIndex;
                            _this.parent.notify(hideShow, eventArgs);
                            refreshUI_1 = eventArgs.refreshUI;
                        }
                    });
                }
                if (refreshUI_1) {
                    parent_1.renderModule.refreshSheet(false, false, document.activeElement.id !== this.parent.element.id + "_SearchBox");
                }
            }
            else {
                var hide_2;
                jsonData.forEach(function (data) {
                    hide_2 = result_1.indexOf(data) < 0;
                    setRow(sheet_1, Number(data["" + rowKey_1]) - 1, { hidden: hide_2, isFiltered: hide_2 });
                });
            }
        }
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Get the module name.
     */
    WorkbookFilter.prototype.getModuleName = function () {
        return 'workbookFilter';
    };
    return WorkbookFilter;
}());
export { WorkbookFilter };
