var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Grid, VirtualScroll as GridVirtualScroll } from '@syncfusion/ej2-grids';
import { RenderType } from '@syncfusion/ej2-grids';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { getExpandStatus } from '../utils';
import { VirtualTreeContentRenderer } from '../renderer/virtual-tree-content-render';
import { VirtualHeaderRenderer, getTransformValues } from '@syncfusion/ej2-grids';
/**
 * TreeGrid Virtual Scroll module will handle Virtualization
 *
 * @hidden
 */
var VirtualScroll = /** @class */ (function () {
    /**
     * Constructor for VirtualScroll module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function VirtualScroll(parent) {
        this.prevstartIndex = -1;
        this.setEndIndexToGantt = true;
        this.prevendIndex = -1;
        this.prevSelectedRecord = [];
        this.parent = parent;
        Grid.Inject(TreeVirtual);
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Returns VirtualScroll module name
     */
    VirtualScroll.prototype.getModuleName = function () {
        return 'virtualScroll';
    };
    /**
     * @hidden
     * @returns {void}
     */
    VirtualScroll.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.localPagedExpandCollapse, this.collapseExpandVirtualchilds, this);
        this.parent.on(events.pagingActions, this.virtualPageAction, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    VirtualScroll.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.localPagedExpandCollapse, this.collapseExpandVirtualchilds);
        this.parent.off(events.pagingActions, this.virtualPageAction);
        this.parent.off(events.destroy, this.destroy);
    };
    /**
     * Handles the virtual child collapse or expand action in a tree grid.
     *
     * @param {object} row - Object containing information about the collapse/expand action.
     * @param {string} row.action - The type of action, either "collapse" or "expand".
     * @param {HTMLTableRowElement} row.row - The HTML row element that is affected by the action.
     * @param {ITreeData} row.record - The tree data record associated with the row.
     * @param {RowCollapsedEventArgs} row.args - Additional event arguments related to the row collapse or expand.
     *
     * @returns {void} No return value as the function executes a procedure.
     */
    VirtualScroll.prototype.collapseExpandVirtualchilds = function (row) {
        this.parent.grid.notify(events.virtualActionArgs, { isExpandCollapse: true });
        this.expandCollapseRec = row.record;
        row.record.expanded = row.action === 'collapse' ? false : true;
        var actionDetails = {
            result: this.parent.flatData,
            row: row.row,
            action: row.action,
            record: row.record,
            count: this.parent.flatData.length
        };
        this.handleSelection();
        var requestType = getValue('isCollapseAll', this.parent) ? 'collapseAll' : 'refresh';
        getValue('grid.renderModule', this.parent).dataManagerSuccess(actionDetails, { requestType: requestType });
    };
    /**
     * Handles selection logic for the TreeGrid component.
     *
     * @returns {void}
     */
    VirtualScroll.prototype.handleSelection = function () {
        if ((this.parent.selectionSettings.mode === 'Cell' ||
            (this.parent.selectionSettings.mode === 'Row' && !this.parent.selectionSettings.persistSelection))) {
            this.parent.grid.clearSelection();
        }
        if (getValue('isCollapseAll', this.parent) && this.parent.selectionSettings.persistSelection && this.parent.getSelectedRecords().length > 0) {
            this.prevSelectedRecord = this.parent.getSelectedRecords();
            this.parent.grid.clearSelection();
        }
    };
    /**
     * Handles the action related to virtual scrolling with paging details.
     *
     * @param {Object} pageingDetails - Contains the result data, count of results, and action arguments.
     * @param {ITreeData[]} pageingDetails.result - The result data to be handled.
     * @param {number} pageingDetails.count - The count of results.
     * @param {ActionEventArgs} pageingDetails.actionArgs - The action arguments related to the virtual page action.
     * @returns {void}
     */
    VirtualScroll.prototype.virtualPageAction = function (pageingDetails) {
        var _this = this;
        var dm = new DataManager(pageingDetails.result);
        var expanded = new Predicate('expanded', 'notequal', null).or('expanded', 'notequal', undefined);
        var parents = dm.executeLocal(new Query().where(expanded));
        var visualData = parents.filter(function (e) {
            return getExpandStatus(_this.parent, e, parents);
        });
        this.visualData = visualData;
        pageingDetails.count = visualData.length;
        this.parent.grid.notify(events.dataListener, { data: visualData });
        var counts = { startIndex: -1, endIndex: -1, count: pageingDetails.count, requestType: pageingDetails.actionArgs.requestType };
        this.parent.grid.notify(events.indexModifier, counts);
        var startIndex = counts.startIndex;
        var endIndex = counts.endIndex;
        pageingDetails.count = visualData.length;
        if (startIndex === -1 && endIndex === -1) {
            var query = new Query();
            var size = this.parent.grid.pageSettings.pageSize;
            var current = this.parent.grid.pageSettings.currentPage;
            var skip = size * (current - 1);
            query = query.skip(skip).take(size);
            dm.dataSource.json = visualData;
            pageingDetails.result = dm.executeLocal(query);
        }
        else {
            var requestType = pageingDetails.actionArgs.requestType;
            if (requestType === 'filtering' || requestType === 'collapseAll' || requestType === 'searching' || (requestType === 'refresh' && getValue('isExpandAll', this.parent)) ||
                (requestType === 'refresh' && this.parent.enableCollapseAll && endIndex > visualData.length && isNullOrUndefined(this.expandCollapseRec))) {
                startIndex = 0;
                endIndex = this.parent.grid.pageSettings.pageSize;
                this.parent.grid.getContent().firstElementChild.scrollTop = 0;
                this.parent.grid.notify(events.virtualActionArgs, { setTop: true });
            }
            if ((requestType === 'save' && pageingDetails.actionArgs.index >= (counts.count - this.parent.grid.pageSettings.pageSize)) || (requestType === 'refresh' && this.parent['isGantt'] && this.parent['isAddedFromGantt'])) {
                if (this.setEndIndexToGantt) {
                    this.ganttEndIndex = counts.endIndex;
                }
                if ((counts.endIndex + this.parent.pageSettings.pageSize >= counts.count && (this.parent.root && counts.count - this.ganttEndIndex === this.visualData.length - this.parent.root['previousFlatData'].length))
                    || !(this.parent['isGantt'] && this.parent['isAddedFromGantt'])) {
                    startIndex = counts.startIndex + (counts.count - counts.endIndex);
                    endIndex = counts.count;
                    this.setEndIndexToGantt = false;
                }
                this.ganttEndIndex = endIndex;
                this.parent['isAddedFromGantt'] = false;
            }
            //if ((this.prevendIndex !== -1 && this.prevstartIndex !== -1) &&
            //this.prevendIndex === endIndex && this.prevstartIndex === startIndex) {
            var virtualWrapperElement = this.parent.grid.contentModule.virtualEle.wrapper;
            var translateY = getTransformValues(virtualWrapperElement).height;
            if (!isNullOrUndefined(this.expandCollapseRec) && (pageingDetails.actionArgs.requestType === 'virtualscroll' ||
                (pageingDetails.actionArgs.requestType === 'refresh' && startIndex !== this.prevstartIndex)) &&
                (startIndex < this.parent.getRows().length && endIndex <= startIndex + this.parent.getRows().length) && translateY === 0) {
                startIndex = 0;
            }
            if ((pageingDetails.actionArgs.requestType === 'save' && startIndex !== this.prevstartIndex) &&
                (startIndex < this.parent.getRows().length && endIndex <= startIndex + this.parent.getRows().length) && translateY === 0) {
                startIndex = 0;
                endIndex = startIndex + this.parent.grid.pageSettings.pageSize;
            }
            if (!isNullOrUndefined(this.expandCollapseRec)) {
                var resourceCount = this.parent.grid.pageSettings.pageSize;
                var sIndex = visualData.indexOf(this.expandCollapseRec);
                var tempdata = visualData.slice(sIndex, sIndex + resourceCount);
                if (tempdata.length < resourceCount && sIndex >= 0 && startIndex !== 0) {
                    sIndex = visualData.length - resourceCount;
                    sIndex = sIndex > 0 ? sIndex : 0;
                    endIndex = visualData.length;
                    if (endIndex - startIndex < resourceCount) {
                        var newRowsCount = sIndex - startIndex;
                        startIndex = sIndex;
                        if (visualData.indexOf(this.expandCollapseRec) > visualData.length - resourceCount / 2) {
                            var newTranslateY = translateY + (newRowsCount * this.parent.grid.getRowHeight());
                            this.parent.grid.contentModule['translateY'] = newTranslateY;
                            this.parent.grid.contentModule.virtualEle.adjustTable(0, newTranslateY);
                        }
                    }
                }
                else if (getValue('isCollapseAll', this.parent)) {
                    startIndex = 0;
                    endIndex = this.parent.grid.pageSettings.pageSize - 1;
                    this.parent.grid.notify(events.virtualActionArgs, { setTop: true });
                }
            }
            //}
            if (this.prevrequestType === 'collapseAll' && pageingDetails.actionArgs.requestType === 'virtualscroll'
                && !isNullOrUndefined(this.parent.idMapping) && startIndex === 0) {
                startIndex = 0;
                endIndex = this.parent.grid.pageSettings.pageSize - 1;
                this.parent.grid.notify(events.virtualActionArgs, { setTop: true });
            }
            if ((this.parent.enableCollapseAll || this.parent.expandStateMapping) && !isNullOrUndefined(this.expandCollapseRec)) {
                if (pageingDetails.count < this.parent.getRows()[0].getBoundingClientRect().height) {
                    startIndex = 0;
                }
                else if (!this.parent['isExpandAll']) {
                    startIndex = this.prevstartIndex === -1 ? 0 : this.prevstartIndex;
                }
            }
            this.expandCollapseRec = null;
            startIndex = startIndex < 0 ? 0 : startIndex;
            if (endIndex === 0 && visualData.length > 0) {
                pageingDetails.result = visualData;
            }
            else {
                pageingDetails.result = visualData.slice(startIndex, endIndex);
            }
            this.prevstartIndex = startIndex;
            this.prevendIndex = endIndex;
            this.prevrequestType = pageingDetails.actionArgs.requestType;
        }
        this.parent.notify('updateAction', pageingDetails);
    };
    /**
     * To destroy the virtualScroll module
     *
     * @returns {void}
     * @hidden
     */
    VirtualScroll.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * Updates the row selection when the header checkbox is clicked and the number of selected rows
     * does not match the current view data length.
     *
     * @param {RowDeselectEventArgs} args - The arguments containing details of the row deselection event.
     * @returns {void} - This method does not return a value.
     */
    VirtualScroll.prototype.updateSelection = function (args) {
        if (args.isHeaderCheckboxClicked &&
            this.parent.grid.currentViewData.length !== this.parent.grid.selectionModule.selectedRowIndexes.length) {
            var updateRowSelection = 'updateRowSelection';
            for (var i = 0; i < this.parent.getRows().length; i++) {
                if (this.parent.getRows()[parseInt(i.toString(), 10)].getElementsByClassName('e-frame e-icons e-uncheck').length) {
                    this.parent.grid.selectionModule["" + updateRowSelection](this.parent.getRows()[parseInt(i.toString(), 10)], 
                    // eslint-disable-next-line max-len
                    this.parent.getCurrentViewRecords()[parseInt(i.toString(), 10)].index);
                }
            }
        }
    };
    return VirtualScroll;
}());
export { VirtualScroll };
var TreeVirtual = /** @class */ (function (_super) {
    __extends(TreeVirtual, _super);
    function TreeVirtual(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        getValue('parent', _this).off('initial-load', getValue('instantiateRenderer', _this), _this);
        getValue('parent', _this).on('initial-load', _this.instantiateRenderers, _this);
        return _this;
    }
    TreeVirtual.prototype.getModuleName = function () {
        return 'treeVirtualScroll';
    };
    TreeVirtual.prototype.instantiateRenderers = function () {
        var parentGrid = getValue('parent', this);
        getValue('parent', this).log(['limitation', 'virtual_height'], 'virtualization');
        var renderer = getValue('locator', this).getService('rendererFactory');
        if (parentGrid.enableColumnVirtualization) {
            getValue('addRenderer', renderer)
                .apply(renderer, [RenderType.Header, new VirtualHeaderRenderer(getValue('parent', this), getValue('locator', this))]);
        }
        getValue('addRenderer', renderer)
            .apply(renderer, [RenderType.Content, new VirtualTreeContentRenderer(getValue('parent', this), getValue('locator', this))]);
        this.ensurePageSize();
    };
    TreeVirtual.prototype.ensurePageSize = function () {
        var parentGrid = getValue('parent', this);
        var rowHeight = parentGrid.getRowHeight();
        if (!isNullOrUndefined(parentGrid.height) && typeof (parentGrid.height) === 'string' && parentGrid.height.indexOf('%') !== -1) {
            parentGrid.element.style.height = parentGrid.height;
        }
        var vHeight = parentGrid.height.toString().indexOf('%') < 0 ? parseInt(parentGrid.height.toString(), 10) :
            parentGrid.element.getBoundingClientRect().height;
        var blockSize = ~~(vHeight / rowHeight);
        var height = blockSize * 2;
        var size = parentGrid.pageSettings.pageSize;
        parentGrid.setProperties({ pageSettings: { pageSize: size < height ? height : size } }, true);
    };
    return TreeVirtual;
}(GridVirtualScroll));
export { TreeVirtual };
