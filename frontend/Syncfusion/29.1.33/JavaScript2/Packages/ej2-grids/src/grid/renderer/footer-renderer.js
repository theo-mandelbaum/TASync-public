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
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { formatUnit, removeClass } from '@syncfusion/ej2-base';
import { colGroupRefresh, columnWidthChanged, scroll, columnVisibilityChanged, refreshFooterRenderer } from '../base/constant';
import { ContentRender } from './content-renderer';
import { RowRenderer } from './row-renderer';
import { SummaryModelGenerator } from '../services/summary-model-generator';
import { calculateAggregate, iterateExtend, addRemoveEventListener, applyStickyLeftRightPosition } from '../base/util';
import { DataUtil } from '@syncfusion/ej2-data';
import * as literals from '../base/string-literals';
/**
 * Footer module is used to render grid content
 *
 * @hidden
 */
var FooterRenderer = /** @class */ (function (_super) {
    __extends(FooterRenderer, _super);
    function FooterRenderer(gridModule, serviceLocator) {
        var _this = _super.call(this, gridModule, serviceLocator) || this;
        _this.aggregates = {};
        _this.parent = gridModule;
        _this.locator = serviceLocator;
        _this.modelGenerator = new SummaryModelGenerator(_this.parent);
        _this.addEventListener();
        return _this;
    }
    /**
     * The function is used to render grid footer div
     *
     * @returns {void}
     */
    FooterRenderer.prototype.renderPanel = function () {
        var div = this.parent.createElement('div', { className: literals.gridFooter });
        var innerDiv = this.parent.createElement('div', { className: 'e-summarycontent' });
        div.appendChild(innerDiv);
        this.setPanel(div);
        if (this.parent.getPager() != null) {
            this.parent.element.insertBefore(div, this.parent.getPager());
        }
        else {
            this.parent.element.appendChild(div);
        }
    };
    /**
     * The function is used to render grid footer table
     *
     * @returns {void}
     */
    FooterRenderer.prototype.renderTable = function () {
        var innerDiv = this.createContentTable('_footer_table');
        var table = innerDiv.querySelector('.' + literals.table);
        var tFoot = this.parent.createElement('tfoot');
        table.appendChild(tFoot);
        this.setTable(table);
    };
    FooterRenderer.prototype.renderSummaryContent = function (e, table, cStart, cEnd) {
        var input = this.parent.dataSource instanceof Array ? !this.parent.getDataModule().isRemote() &&
            this.parent.parentDetails ? this.getData() : this.parent.dataSource : this.parent.currentViewData;
        var summaries = this.modelGenerator.getData();
        var dummies = isNullOrUndefined(cStart) ? this.modelGenerator.getColumns() :
            this.modelGenerator.getColumns(cStart);
        // eslint-disable-next-line max-len
        var rows = isNullOrUndefined(cStart) ? this.modelGenerator.generateRows(input, e || this.aggregates) :
            this.modelGenerator.generateRows(input, e || this.aggregates, cStart, cEnd);
        var fragment = document.createDocumentFragment();
        var rowrenderer = new RowRenderer(this.locator, null, this.parent);
        rowrenderer.element = this.parent.createElement('TR', { className: 'e-summaryrow', attrs: { role: 'row' } });
        for (var srow = 0, len = summaries.length; srow < len; srow++) {
            var row = rows[parseInt(srow.toString(), 10)];
            if (!row) {
                continue;
            }
            var tr = rowrenderer.render(row, dummies);
            if (tr.querySelectorAll('.e-leftfreeze').length && tr.querySelectorAll('.e-indentcell').length) {
                var td = tr.querySelectorAll('.e-indentcell');
                for (var i = 0; i < td.length; i++) {
                    td[parseInt(i.toString(), 10)].classList.add('e-leftfreeze');
                    applyStickyLeftRightPosition(td[parseInt(i.toString(), 10)], i * 30, this.parent.enableRtl, 'Left');
                }
            }
            if (this.parent.isFrozenGrid() && tr.querySelectorAll('.e-summarycell').length) {
                removeClass([].slice.call(tr.querySelectorAll('.e-summarycell')), ['e-freezeleftborder', 'e-freezerightborder']);
            }
            fragment.appendChild(tr);
        }
        var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
            this.parent.parentDetails.parentInstObj.isReact;
        if ((this.parent.isReact || isReactChild) && summaries.length && this.parent.isInitialLoad) {
            this.parent.renderTemplates(function () {
                table.tFoot.innerHTML = '';
                table.tFoot.appendChild(fragment);
            });
        }
        else {
            table.tFoot.appendChild(fragment);
        }
        this.aggregates = !isNullOrUndefined(e) ? e : this.aggregates;
    };
    FooterRenderer.prototype.refresh = function (e) {
        var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
            this.parent.parentDetails.parentInstObj.isReact;
        if (!(this.parent.isReact || isReactChild) || !this.parent.isInitialLoad) {
            this.getTable().tFoot.innerHTML = '';
        }
        this.renderSummaryContent(e, this.getTable(), undefined, undefined);
        if (isNullOrUndefined(e) && this.parent.isAutoFitColumns) {
            this.parent.autoFitColumns();
        }
        this.onScroll();
    };
    FooterRenderer.prototype.refreshCol = function () {
        // frozen table
        var mheaderCol = this.parent.enableColumnVirtualization ? this.parent.headerModule.getColGroup() :
            this.parent.element.querySelector('.' + literals.gridHeader).querySelector(literals.colGroup).cloneNode(true);
        this.getTable().replaceChild(mheaderCol, this.getColGroup());
        this.setColGroup(mheaderCol);
    };
    FooterRenderer.prototype.onWidthChange = function (args) {
        this.getColFromIndex(args.index).style.width = formatUnit(args.width);
        if (this.parent.allowResizing && args.module === 'resize') {
            this.updateFooterTableWidth(this.getTable());
        }
    };
    FooterRenderer.prototype.onScroll = function (e) {
        if (e === void 0) { e = {
            left: this.parent.getContent().firstChild.scrollLeft
        }; }
        this.getTable().parentElement.scrollLeft = e.left;
    };
    FooterRenderer.prototype.getColFromIndex = function (index) {
        return this.getColGroup().children[parseInt(index.toString(), 10)];
    };
    FooterRenderer.prototype.columnVisibilityChanged = function () {
        this.refresh();
    };
    FooterRenderer.prototype.addEventListener = function () {
        this.evtHandlers = [{ event: colGroupRefresh, handler: this.refreshCol },
            { event: columnWidthChanged, handler: this.onWidthChange },
            { event: scroll, handler: this.onScroll },
            { event: columnVisibilityChanged, handler: this.columnVisibilityChanged },
            { event: refreshFooterRenderer, handler: this.refreshFooterRenderer }];
        addRemoveEventListener(this.parent, this.evtHandlers, true, this);
    };
    FooterRenderer.prototype.removeEventListener = function () {
        addRemoveEventListener(this.parent, this.evtHandlers, false);
    };
    FooterRenderer.prototype.updateFooterTableWidth = function (tFoot) {
        var tHead = this.parent.getHeaderTable();
        if (tHead && tFoot) {
            tFoot.style.width = tHead.style.width;
        }
    };
    FooterRenderer.prototype.refreshFooterRenderer = function (editedData) {
        var aggregates = this.onAggregates(editedData);
        this.refresh(aggregates);
    };
    FooterRenderer.prototype.getIndexByKey = function (data, ds) {
        var key = this.parent.getPrimaryKeyFieldNames()[0];
        for (var i = 0; i < ds.length; i++) {
            if (ds[parseInt(i.toString(), 10)]["" + key] === data["" + key]) {
                return i;
            }
        }
        return -1;
    };
    FooterRenderer.prototype.getData = function () {
        return this.parent.getDataModule().dataManager.executeLocal(this.parent.getDataModule().generateQuery(true));
    };
    FooterRenderer.prototype.onAggregates = function (editedData) {
        editedData = editedData instanceof Array ? editedData : [];
        var field = this.parent.getPrimaryKeyFieldNames()[0];
        var dataSource = [];
        var isModified = false;
        var batchChanges = {};
        var gridData = 'dataSource';
        var isFiltered = false;
        if (!(this.parent.renderModule.data.isRemote() || (!isNullOrUndefined(this.parent.dataSource)
            && this.parent.dataSource.result)) && ((this.parent.allowFiltering
            && this.parent.filterSettings.columns.length) || this.parent.searchSettings.key.length)) {
            isFiltered = true;
        }
        var currentViewData;
        if (!isNullOrUndefined(this.parent.dataSource) && this.parent.dataSource.result) {
            currentViewData = this.parent.getCurrentViewRecords();
        }
        else {
            currentViewData = this.parent.dataSource instanceof Array ?
                (isFiltered ? this.parent.getFilteredRecords() : this.parent.dataSource) : (this.parent.dataSource["" + gridData].json.length ?
                (isFiltered ? this.parent.getFilteredRecords() : this.parent.dataSource["" + gridData].json)
                : this.parent.getCurrentViewRecords());
        }
        if (this.parent.parentDetails && !this.parent.getDataModule().isRemote()) {
            currentViewData = this.getData();
        }
        if (this.parent.editModule) {
            batchChanges = this.parent.editModule.getBatchChanges();
        }
        if (Object.keys(batchChanges).length) {
            for (var i = 0; i < currentViewData.length; i++) {
                isModified = false;
                // eslint-disable-next-line max-len
                if (batchChanges[literals.changedRecords].length && this.getIndexByKey(currentViewData[parseInt(i.toString(), 10)], batchChanges[literals.changedRecords]) > -1) {
                    isModified = true;
                    // eslint-disable-next-line max-len
                    dataSource.push(batchChanges[literals.changedRecords][this.getIndexByKey(currentViewData[parseInt(i.toString(), 10)], batchChanges[literals.changedRecords])]);
                }
                // eslint-disable-next-line max-len
                if (batchChanges[literals.deletedRecords].length && this.getIndexByKey(currentViewData[parseInt(i.toString(), 10)], batchChanges[literals.deletedRecords]) > -1) {
                    isModified = true;
                }
                else if (!isModified) {
                    dataSource.push(currentViewData[parseInt(i.toString(), 10)]);
                }
            }
            if (batchChanges[literals.addedRecords].length) {
                for (var i = 0; i < batchChanges[literals.addedRecords].length; i++) {
                    dataSource.push(batchChanges[literals.addedRecords][parseInt(i.toString(), 10)]);
                }
            }
        }
        else {
            if (editedData.length) {
                var data = iterateExtend(currentViewData);
                dataSource = data.map(function (item) {
                    var idVal = DataUtil.getObject(field, item);
                    var value;
                    var hasVal = editedData.some(function (cItem) {
                        value = cItem;
                        return idVal === DataUtil.getObject(field, cItem);
                    });
                    return hasVal ? value : item;
                });
            }
            else {
                dataSource = currentViewData;
            }
        }
        var eData = editedData;
        if ((eData.type && eData.type === 'cancel')) {
            dataSource = currentViewData;
        }
        var aggregate = {};
        var agrVal;
        var aggregateRows = this.parent.aggregates;
        for (var i = 0; i < aggregateRows.length; i++) {
            for (var j = 0; j < aggregateRows[parseInt(i.toString(), 10)].columns.length; j++) {
                var data = [];
                var type = aggregateRows[parseInt(i.toString(), 10)]
                    .columns[parseInt(j.toString(), 10)].type.toString();
                data = dataSource;
                var types = type.split(',').map(function (t) { return t.trim(); });
                for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                    var aggregateType = types_1[_i];
                    agrVal = calculateAggregate(aggregateType, data, aggregateRows[parseInt(i.toString(), 10)]
                        .columns[parseInt(j.toString(), 10)], this.parent);
                    aggregate[aggregateRows[parseInt(i.toString(), 10)].columns[parseInt(j.toString(), 10)].field + ' - ' + aggregateType.toLowerCase()] = agrVal;
                }
            }
        }
        var result = {
            result: dataSource,
            count: dataSource.length,
            aggregates: aggregate
        };
        return result;
    };
    return FooterRenderer;
}(ContentRender));
export { FooterRenderer };
