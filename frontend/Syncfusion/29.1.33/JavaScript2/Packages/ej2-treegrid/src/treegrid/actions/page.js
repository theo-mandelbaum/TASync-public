import { Grid } from '@syncfusion/ej2-grids';
import { Page as GridPage } from '@syncfusion/ej2-grids';
import * as events from '../base/constant';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';
import { getValue, isNullOrUndefined, addClass, removeClass } from '@syncfusion/ej2-base';
import { getExpandStatus, isFilterChildHierarchy } from '../utils';
/**
 * The `Page` module is used to render pager and handle paging action.
 *
 * @hidden
 */
var Page = /** @class */ (function () {
    function Page(parent) {
        Grid.Inject(GridPage);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * @hidden
     * @returns {void}
     */
    Page.prototype.addEventListener = function () {
        this.parent.on(events.localPagedExpandCollapse, this.collapseExpandPagedchilds, this);
        this.parent.on(events.pagingActions, this.pageAction, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    Page.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.localPagedExpandCollapse, this.collapseExpandPagedchilds);
        this.parent.off(events.pagingActions, this.pageAction);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Pager module name
     */
    Page.prototype.getModuleName = function () {
        return 'pager';
    };
    /**
     * Refreshes the page count, pager information, and external message.
     *
     * @returns {void}
     */
    Page.prototype.refresh = function () {
        this.parent.grid.pagerModule.refresh();
    };
    /**
     * To destroy the pager
     *
     * @returns {void}
     * @hidden
     */
    Page.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * Navigates to the target page according to the given number.
     *
     * @param  {number} pageNo - Defines the page number to navigate.
     * @returns {void}
     */
    Page.prototype.goToPage = function (pageNo) {
        this.parent.grid.pagerModule.goToPage(pageNo);
    };
    /**
     * Defines the text of the external message.
     *
     * @param  {string} message - Defines the message to update.
     * @returns {void}
     */
    Page.prototype.updateExternalMessage = function (message) {
        if (isNullOrUndefined(message)) {
            var error = 'The provided value for the message is undefined. Please ensure the message contains string.';
            this.parent.trigger(events.actionFailure, { error: error });
        }
        this.parent.grid.pagerModule.updateExternalMessage(message);
    };
    /**
     * @param {{action: string, row: HTMLTableRowElement, record: ITreeData, args: RowCollapsedEventArgs}} rowDetails - Expand Collapse details arguments
     * @param {string} rowDetails.action - Expand Collapse action type
     * @param {HTMLTableRowElement} rowDetails.row - Row element
     * @param {ITreeData} rowDetails.record - Row object data
     * @param {RowCollapsedEventArgs} rowDetails.args - Expand Collapse event arguments
     * @hidden
     * @returns {void}
     */
    Page.prototype.collapseExpandPagedchilds = function (rowDetails) {
        rowDetails.record.expanded = rowDetails.action === 'collapse' ? false : true;
        this.parent.flatData.map(function (e) { return e.expanded = e.uniqueID === rowDetails.record.uniqueID &&
            e.expanded !== rowDetails.record.expanded ? rowDetails.record.expanded : e.expanded; });
        if (this.parent.enableImmutableMode) {
            var primaryKeyField_1 = this.parent.getPrimaryKeyFieldNames()[0];
            var record = this.parent.flatData.filter(function (e) {
                return e["" + primaryKeyField_1] === rowDetails.record["" + primaryKeyField_1];
            });
            if (record.length) {
                record[0].expanded = rowDetails.record.expanded;
            }
        }
        var ret = {
            result: this.parent.flatData,
            row: rowDetails.row,
            action: rowDetails.action,
            record: rowDetails.record,
            count: this.parent.flatData.length
        };
        getValue('grid.renderModule', this.parent).dataManagerSuccess(ret);
        if (this.parent.enableImmutableMode) {
            var row = 'row';
            var action = 'action';
            var targetEle = void 0;
            if (ret["" + action] === 'collapse') {
                targetEle = ret["" + row].getElementsByClassName('e-treegridexpand')[0];
                if (!isNullOrUndefined(targetEle)) {
                    removeClass([targetEle], 'e-treegridexpand');
                    addClass([targetEle], 'e-treegridcollapse');
                }
            }
            else if (ret["" + action] === 'expand') {
                targetEle = ret["" + row].getElementsByClassName('e-treegridcollapse')[0];
                if (!isNullOrUndefined(targetEle)) {
                    removeClass([targetEle], 'e-treegridcollapse');
                    addClass([targetEle], 'e-treegridexpand');
                }
            }
        }
    };
    Page.prototype.pageRoot = function (pagedResults, temp, result) {
        var newResults = isNullOrUndefined(result) ? [] : result;
        var _loop_1 = function (t) {
            newResults.push(temp[parseInt(t.toString(), 10)]);
            var res = [];
            if (temp[parseInt(t.toString(), 10)].hasChildRecords) {
                res = pagedResults.filter(function (e) {
                    return temp[parseInt(t.toString(), 10)].uniqueID === e.parentUniqueID;
                });
                newResults = this_1.pageRoot(pagedResults, res, newResults);
            }
        };
        var this_1 = this;
        for (var t = 0; t < temp.length; t++) {
            _loop_1(t);
        }
        return newResults;
    };
    Page.prototype.updatePageSize = function (pageingDetails) {
        var updateSize = pageingDetails.count;
        var gridPagerModule = this.parent.grid.pagerModule;
        if (this.parent.pageSettings.pageSizes === true) {
            if (gridPagerModule.pagerObj.pagerdropdownModule['dropDownListObject'].value === gridPagerModule.pagerObj.getLocalizedLabel('All')) {
                gridPagerModule['pagerObj'].totalRecordsCount = updateSize;
                this.parent.grid.pageSettings.pageSize = updateSize;
            }
        }
    };
    Page.prototype.pageAction = function (pageingDetails) {
        var _this = this;
        var dm = new DataManager(pageingDetails.result);
        if (this.parent.pageSettings.pageSizeMode === 'Root') {
            var temp = [];
            var propname = (this.parent.grid.filterSettings.columns.length > 0) &&
                (this.parent.filterSettings.hierarchyMode === 'Child' || this.parent.filterSettings.hierarchyMode === 'None') ?
                'filterLevel' : 'level';
            var query = new Query().where(propname, 'equal', 0);
            temp = dm.executeLocal(query);
            pageingDetails.count = temp.length;
            var size = this.parent.grid.pageSettings.pageSize;
            var current = this.parent.grid.pageSettings.currentPage;
            var skip = size * (current - 1);
            query = query.skip(skip).take(size);
            temp = dm.executeLocal(query);
            var newResults = this.pageRoot(pageingDetails.result, temp);
            pageingDetails.result = newResults;
        }
        else {
            var dm_1 = new DataManager(pageingDetails.result);
            var expanded = new Predicate('expanded', 'notequal', null).or('expanded', 'notequal', undefined);
            var parents_1 = dm_1.executeLocal(new Query().where(expanded));
            var visualData = void 0;
            if (isFilterChildHierarchy(this.parent) && (pageingDetails.actionArgs.action !== 'collapse' &&
                pageingDetails.actionArgs.action !== 'expand')) {
                visualData = parents_1;
            }
            else {
                visualData = parents_1.filter(function (e) {
                    return getExpandStatus(_this.parent, e, parents_1);
                });
            }
            pageingDetails.count = visualData.length;
            var query = new Query();
            var size = this.parent.grid.pageSettings.pageSize;
            this.updatePageSize(pageingDetails);
            var current = this.parent.grid.pageSettings.currentPage;
            if (visualData.length < (current * size)) {
                current = (Math.floor(visualData.length / size)) + ((visualData.length % size) ? 1 : 0);
                current = current ? current : 1;
                this.parent.grid.setProperties({ pageSettings: { currentPage: current } }, true);
            }
            var skip = size * (current - 1);
            query = query.skip(skip).take(size);
            dm_1.dataSource.json = visualData;
            pageingDetails.result = dm_1.executeLocal(query);
        }
        this.parent.notify('updateAction', pageingDetails);
    };
    return Page;
}());
export { Page };
