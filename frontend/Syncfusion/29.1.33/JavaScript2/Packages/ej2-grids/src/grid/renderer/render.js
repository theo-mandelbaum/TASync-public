import { remove, resetBlazorTemplate, blazorTemplates, getValue } from '@syncfusion/ej2-base';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { DataManager, Query, Deferred, Predicate, DataUtil } from '@syncfusion/ej2-data';
import { ValueFormatter } from '../services/value-formatter';
import { RenderType, CellType } from '../base/enum';
import { Data } from '../actions/data';
import { Column } from '../models/column';
import { Row } from '../models/row';
import { Cell } from '../models/cell';
import * as events from '../base/constant';
import { prepareColumns, setFormatter, isGroupAdaptive, getDatePredicate, getObject, clearReactVueTemplates } from '../base/util';
import { ContentRender } from '../renderer/content-renderer';
import { HeaderRender } from '../renderer/header-renderer';
import { CellRenderer } from '../renderer/cell-renderer';
import { HeaderCellRenderer } from '../renderer/header-cell-renderer';
import { StackedHeaderCellRenderer } from '../renderer/stacked-cell-renderer';
import { IndentCellRenderer } from '../renderer/indent-cell-renderer';
import { GroupCaptionCellRenderer, GroupCaptionEmptyCellRenderer } from '../renderer/caption-cell-renderer';
import { ExpandCellRenderer } from '../renderer/expand-cell-renderer';
import { HeaderIndentCellRenderer } from '../renderer/header-indent-renderer';
import { DetailHeaderIndentCellRenderer } from '../renderer/detail-header-indent-renderer';
import { DetailExpandCellRenderer } from '../renderer/detail-expand-cell-renderer';
import { RowDragDropRenderer } from './row-drag-drop-renderer';
import { RowDragDropHeaderRenderer } from '../renderer/row-drag-header-indent-render';
import * as literals from '../base/string-literals';
/**
 * Content module is used to render grid content
 *
 * @hidden
 */
var Render = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} locator - specifies the serviceLocator
     */
    function Render(parent, locator) {
        this.emptyGrid = false;
        this.counter = 0;
        this.parent = parent;
        this.locator = locator;
        this.data = new Data(parent, locator);
        this.l10n = locator.getService('localization');
        this.ariaService = this.locator.getService('ariaService');
        this.renderer = this.locator.getService('rendererFactory');
        this.addEventListener();
    }
    /**
     * To initialize grid header, content and footer rendering
     *
     * @returns {void}
     */
    Render.prototype.render = function () {
        var gObj = this.parent;
        this.headerRenderer = this.renderer.getRenderer(RenderType.Header);
        this.contentRenderer = this.renderer.getRenderer(RenderType.Content);
        this.headerRenderer.renderPanel();
        this.contentRenderer.renderPanel();
        if (gObj.getColumns().length) {
            this.isLayoutRendered = true;
            this.headerRenderer.renderTable();
            this.contentRenderer.renderTable();
            this.emptyRow(false);
        }
        this.parent.scrollModule.setWidth();
        this.parent.scrollModule.setHeight();
        if (this.parent.height !== 'auto') {
            this.parent.scrollModule.setPadding();
        }
        this.refreshDataManager();
    };
    /**
     * Refresh the entire Grid.
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     */
    Render.prototype.refresh = function (e) {
        var _this = this;
        if (e === void 0) { e = { requestType: 'refresh' }; }
        var gObj = this.parent;
        gObj.notify(e.requestType + "-begin", e);
        gObj.trigger(events.actionBegin, e, function (args) {
            if (args === void 0) { args = { requestType: 'refresh' }; }
            if (args.cancel) {
                gObj.notify(events.cancelBegin, args);
                if (args.action === 'clearFilter' && _this.parent.filterSettings.type === 'Menu') {
                    _this.parent.filterSettings.columns[_this.parent.filterModule.filterObjIndex] = _this.parent.filterModule.prevFilterObject;
                    var iconClass = _this.parent.showColumnMenu && _this.parent.filterModule['column'].showColumnMenu ? '.e-columnmenu' : '.e-icon-filter';
                    var col = _this.parent.element.querySelector('[e-mappinguid="' + _this.parent.filterModule['column'].uid + '"]').parentElement;
                    var flIcon = col.querySelector(iconClass);
                    if (!isNullOrUndefined(_this.parent.filterModule.prevFilterObject)) {
                        flIcon.classList.add('e-filtered');
                    }
                }
                if (args.action === 'clear-filter' && (_this.parent.filterSettings.type === 'CheckBox' || _this.parent.filterSettings.type === 'Excel')) {
                    _this.parent.filterSettings.columns = _this.parent.filterModule.checkboxPrevFilterObject;
                }
                if (args.requestType === 'grouping') {
                    // Remove the dropped column name from groupsettings.columns if args.cancel is true
                    var index = gObj.groupSettings.columns.indexOf(args.columnName);
                    if (index !== -1) {
                        gObj.setProperties({ groupSettings: { Columns: gObj.groupSettings.columns.splice(index, 1) } }, true);
                        gObj.setProperties({ sortSettings: { Columns: gObj.sortSettings.columns.splice(index, 1) } }, true);
                        var column = gObj.getColumnByField(args.columnName);
                        var headerCell = gObj.getColumnHeaderByField(column.field);
                        column.visible = (!isNullOrUndefined(headerCell) && !headerCell.classList.contains('e-hide'));
                    }
                }
                return;
            }
            _this.parent.notify(events.destroyEditForm, args);
            if (args.requestType === 'virtualscroll' && (_this.parent.getDataModule().isRemote() || 'result' in _this.parent.dataSource)
                && args.virtualInfo && args.virtualInfo.direction === 'down') {
                _this.parent.contentModule.prevInfo = args.virtualInfo;
            }
            if (_this.parent.groupModule && args.preventFocusOnGroup) {
                _this.parent.groupModule.preventFocusOnGroup = args.preventFocusOnGroup;
            }
            if (gObj.allowSelection && (args.action === 'clearFilter' || args.action === 'clear-filter' ||
                (args.requestType === 'searching' && args.searchString === '') || args.action === 'add')) {
                gObj.selectionModule['rmtHdrChkbxClicked'] = false;
            }
            if (gObj.allowPaging && gObj.pageSettings.pageSizes && gObj.pagerModule.pagerObj.isAllPage &&
                (args.action === 'add' && args.requestType === 'save') && gObj.pagerModule.pagerObj.checkAll) {
                gObj.setProperties({ pageSettings: { pageSize: gObj.pageSettings.pageSize + 1 } }, true);
            }
            if (args.requestType === 'delete' && gObj.allowPaging) {
                var dataLength = args.data.length;
                var count = gObj.pageSettings.totalRecordsCount - dataLength;
                var currentViewData = gObj.getCurrentViewRecords().length;
                // eslint-disable-next-line max-len
                if ((!(currentViewData - dataLength) && count && ((gObj.pageSettings.currentPage - 1) * gObj.pageSettings.pageSize) === count) || (count && count <= dataLength)) {
                    gObj.prevPageMoving = true;
                    gObj.setProperties({
                        pageSettings: {
                            totalRecordsCount: count, currentPage: Math.ceil(count / gObj.pageSettings.pageSize)
                        }
                    }, true);
                    gObj.pagerModule.pagerObj.totalRecordsCount = count;
                }
            }
            if (args.requestType === 'reorder' && _this.parent.dataSource && 'result' in _this.parent.dataSource) {
                _this.contentRenderer.refreshContentRows(args);
            }
            else if ((args.requestType === 'paging' || args.requestType === 'columnstate' || args.requestType === 'reorder')
                && _this.parent.groupSettings.enableLazyLoading && _this.parent.groupSettings.columns.length
                && (_this.parent.enableVirtualization ? _this.parent.lazyLoadRender :
                    _this.parent.contentModule).getGroupCache()[_this.parent.pageSettings.currentPage]) {
                _this.contentRenderer.refreshContentRows(args);
            }
            else {
                _this.refreshDataManager(args);
            }
        });
    };
    /**
     * @returns {void}
     * @hidden
     */
    Render.prototype.resetTemplates = function () {
        var gObj = this.parent;
        var gridColumns = gObj.getColumns();
        if (gObj.detailTemplate) {
            var detailTemplateID = gObj.element.id + 'detailTemplate';
            blazorTemplates["" + detailTemplateID] = [];
            resetBlazorTemplate(detailTemplateID, 'DetailTemplate');
        }
        if (gObj.groupSettings.captionTemplate) {
            resetBlazorTemplate(gObj.element.id + 'captionTemplate', 'CaptionTemplate');
        }
        if (gObj.rowTemplate) {
            resetBlazorTemplate(gObj.element.id + 'rowTemplate', 'RowTemplate');
        }
        if (gObj.toolbarTemplate) {
            resetBlazorTemplate(gObj.element.id + 'toolbarTemplate', 'ToolbarTemplate');
        }
        if (gObj.pageSettings.template) {
            resetBlazorTemplate(gObj.element.id + '_template', 'pageSettings');
        }
        for (var i = 0; i < gridColumns.length; i++) {
            if (gridColumns[parseInt(i.toString(), 10)].template) {
                blazorTemplates[gObj.element.id + gridColumns[parseInt(i.toString(), 10)].uid] = [];
                resetBlazorTemplate(gObj.element.id + gridColumns[parseInt(i.toString(), 10)].uid, 'Template');
            }
            if (gridColumns[parseInt(i.toString(), 10)].headerTemplate) {
                resetBlazorTemplate(gObj.element.id + gridColumns[parseInt(i.toString(), 10)].uid + 'headerTemplate', 'HeaderTemplate');
            }
            if (gridColumns[parseInt(i.toString(), 10)].filterTemplate) {
                resetBlazorTemplate(gObj.element.id + gridColumns[parseInt(i.toString(), 10)].uid + 'filterTemplate', 'FilterTemplate');
            }
        }
        var guid = 'guid';
        for (var k = 0; k < gObj.aggregates.length; k++) {
            for (var j = 0; j < gObj.aggregates[parseInt(k.toString(), 10)].columns.length; j++) {
                if (gObj.aggregates[parseInt(k.toString(), 10)].columns[parseInt(j.toString(), 10)].footerTemplate) {
                    var tempID = gObj.element.id + gObj.aggregates[parseInt(k.toString(), 10)].columns[parseInt(j.toString(), 10)]["" + guid] + 'footerTemplate';
                    resetBlazorTemplate(tempID, 'FooterTemplate');
                }
                if (gObj.aggregates[parseInt(k.toString(), 10)].columns[parseInt(j.toString(), 10)].groupFooterTemplate) {
                    var tempID = gObj.element.id + gObj.aggregates[parseInt(k.toString(), 10)].columns[parseInt(j.toString(), 10)]["" + guid] + 'groupFooterTemplate';
                    resetBlazorTemplate(tempID, 'GroupFooterTemplate');
                }
                if (gObj.aggregates[parseInt(k.toString(), 10)].columns[parseInt(j.toString(), 10)].groupCaptionTemplate) {
                    var tempID = gObj.element.id + gObj.aggregates[parseInt(k.toString(), 10)].columns[parseInt(j.toString(), 10)]["" + guid] + 'groupCaptionTemplate';
                    resetBlazorTemplate(tempID, 'GroupCaptionTemplate');
                }
            }
        }
    };
    Render.prototype.refreshComplete = function (e) {
        this.parent.trigger(events.actionComplete, e);
    };
    /**
     * The function is used to refresh the dataManager
     *
     * @param {NotifyArgs} args - specifies the args
     * @returns {void}
     */
    Render.prototype.refreshDataManager = function (args) {
        var _this = this;
        if (args === void 0) { args = {}; }
        var gObj = this.parent;
        var maskRow = (gObj.loadingIndicator.indicatorType === 'Shimmer' && args.requestType !== 'virtualscroll'
            && args.requestType !== 'infiniteScroll') || ((args.requestType === 'virtualscroll' || args.requestType === 'infiniteScroll')
            && gObj.enableVirtualMaskRow);
        if (args.requestType !== 'virtualscroll' && !args.isCaptionCollapse && !maskRow) {
            this.parent.showSpinner();
        }
        if (maskRow) {
            gObj.showMaskRow(args.requestType === 'virtualscroll' ? args.virtualInfo.sentinelInfo.axis
                : args.requestType === 'infiniteScroll' ? args.direction : undefined);
        }
        this.parent.notify(events.resetInfiniteBlocks, args);
        this.emptyGrid = false;
        var dataManager;
        var isFActon = this.isNeedForeignAction();
        this.ariaService.setBusy(this.parent.getContent().querySelector('.' + literals.content), true);
        if (isFActon) {
            var deffered = new Deferred();
            dataManager = this.getFData(deffered, args);
        }
        if (!dataManager) {
            if (gObj.allowPaging && !gObj.getDataModule().dataManager.dataSource.offline && gObj.pageSettings
                && gObj.pageSettings.pageSizes && gObj.pagerModule && gObj.pagerModule.pagerObj && gObj.pagerModule.pagerObj.isAllPage) {
                gObj.pagerModule.pagerObj.isAllPage = undefined;
            }
            dataManager = this.data.getData(args, this.data.generateQuery().requiresCount());
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            dataManager = dataManager.then(function (e) {
                var query = _this.data.generateQuery().requiresCount();
                if (_this.emptyGrid) {
                    var def = new Deferred();
                    def.resolve({ result: [], count: 0 });
                    return def.promise;
                }
                return _this.data.getData(args, query);
            });
        }
        var foreignKeyColumns = this.parent.getForeignKeyColumns();
        var foreignKeyLength = foreignKeyColumns.length;
        if (this.parent.columnQueryMode === 'ExcludeHidden' && foreignKeyLength) {
            foreignKeyLength = foreignKeyColumns.filter(function (col) { return col.visible !== false; }).length;
        }
        if (foreignKeyLength && (!isFActon || this.parent.searchSettings.key.length)) {
            var deffered_1 = new Deferred();
            dataManager = dataManager.then(function (e) {
                _this.parent.notify(events.getForeignKeyData, { dataManager: dataManager, result: e, promise: deffered_1, action: args });
                return deffered_1.promise;
            });
        }
        if (this.parent.groupSettings.disablePageWiseAggregates && this.parent.groupSettings.columns.length) {
            dataManager = dataManager.then(function (e) { return _this.validateGroupRecords(e); });
        }
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, args); })
            .catch(function (e) { return _this.dataManagerFailure(e, args); });
    };
    Render.prototype.getFData = function (deferred, args) {
        this.parent.notify(events.getForeignKeyData, { isComplex: true, promise: deferred, action: args });
        return deferred.promise;
    };
    Render.prototype.isNeedForeignAction = function () {
        var gObj = this.parent;
        return !!((gObj.allowFiltering && gObj.filterSettings.columns.length) ||
            (!isNullOrUndefined(gObj.searchSettings.key) && gObj.searchSettings.key.length))
            && this.foreignKey(this.parent.getForeignKeyColumns());
    };
    Render.prototype.foreignKey = function (columns) {
        var _this = this;
        return columns.some(function (col) {
            var fbool = false;
            fbool = _this.parent.filterSettings.columns.some(function (value) {
                return col.uid === value.uid;
            });
            return !!(fbool || _this.parent.searchSettings.key.length);
        });
    };
    Render.prototype.sendBulkRequest = function (args) {
        var _this = this;
        args.requestType = 'batchsave';
        var gObj = this.parent;
        if (gObj.allowPaging && gObj.pageSettings.pageSizes && gObj.pagerModule.pagerObj.isAllPage && gObj.pagerModule.pagerObj.checkAll) {
            var dataLength = args['changes'].addedRecords.length;
            if (dataLength) {
                gObj.setProperties({ pageSettings: { pageSize: gObj.pageSettings.pageSize + dataLength } }, true);
            }
        }
        if (gObj.allowPaging && (args.changes.addedRecords.length ||
            args.changes.deletedRecords.length ||
            args.changes.changedRecords.length) && gObj.pageSettings
            && gObj.pageSettings.pageSizes && gObj.pagerModule && gObj.pagerModule.pagerObj
            && !gObj.getDataModule().dataManager.dataSource.offline && gObj.pagerModule.pagerObj.isAllPage) {
            gObj.pagerModule.pagerObj.isAllPage = undefined;
        }
        var promise = this.data.saveChanges(args.changes, this.parent.getPrimaryKeyFieldNames()[0], args.original);
        var query = this.data.generateQuery().requiresCount();
        if (this.data.dataManager.dataSource.offline) {
            this.refreshDataManager({ requestType: 'batchsave' });
            return;
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            promise.then(function (e) {
                _this.data.getData(args, query)
                    .then(function (e) { return _this.dmSuccess(e, args); })
                    .catch(function (e) { return _this.dmFailure(e, args); });
            })
                .catch(function (e) { return _this.dmFailure(e, args); });
        }
    };
    Render.prototype.dmSuccess = function (e, args) {
        this.dataManagerSuccess(e, args);
    };
    Render.prototype.dmFailure = function (e, args) {
        this.dataManagerFailure(e, args);
    };
    /**
     * Render empty row to Grid which is used at the time to represent to no records.
     *
     * @returns {void}
     * @hidden
     */
    Render.prototype.renderEmptyRow = function () {
        this.emptyRow(true);
    };
    Render.prototype.emptyRow = function (isTrigger) {
        var gObj = this.parent;
        var tbody = this.contentRenderer.getTable().querySelector(literals.tbody);
        if (!isNullOrUndefined(tbody)) {
            remove(tbody);
        }
        tbody = this.parent.createElement(literals.tbody, { attrs: { role: 'rowgroup' } });
        var spanCount = gObj.allowRowDragAndDrop && isNullOrUndefined(gObj.rowDropSettings.targetID) ? 1 : 0;
        if (gObj.detailTemplate || gObj.childGrid) {
            ++spanCount;
        }
        var className = gObj.editSettings.showAddNewRow && gObj.editSettings.newRowPosition === 'Bottom' ?
            'e-emptyrow e-show-added-row' : 'e-emptyrow';
        var tr = this.parent.createElement('tr', { className: className, attrs: { role: 'row' } });
        var td;
        if (gObj.emptyRecordTemplate) {
            var emptyRecordTemplateID = gObj.element.id + 'emptyRecordTemplate';
            td = this.parent.createElement('td', { attrs: { colspan: (gObj.getVisibleColumns().length +
                        spanCount + gObj.groupSettings.columns.length).toString() } });
            if (gObj.isVue || (gObj.parentDetails && gObj.parentDetails.parentInstObj && gObj.parentDetails.parentInstObj.isVue)) {
                td.appendChild(gObj.getEmptyRecordTemplate()(gObj.dataSource, gObj, 'emptyRecordTemplate', emptyRecordTemplateID, undefined, undefined, undefined, this.parent['root'])[1]);
            }
            else {
                td.appendChild(gObj.getEmptyRecordTemplate()(gObj.dataSource, gObj, 'emptyRecordTemplate', emptyRecordTemplateID, undefined, undefined, undefined, this.parent['root'])[0]);
            }
            if (gObj.isReact) {
                this.parent.renderTemplates();
            }
        }
        else {
            td = this.parent.createElement('td', {
                innerHTML: this.l10n.getConstant('EmptyRecord'),
                attrs: { colspan: (gObj.getVisibleColumns().length + spanCount + (!isNullOrUndefined(gObj.groupSettings.columns) ?
                        gObj.groupSettings.columns.length : 0)).toString() }
            });
        }
        if (gObj.isFrozenGrid()) {
            td.classList.add('e-leftfreeze');
            td.style.left = 0 + 'px';
        }
        if (gObj.frozenRows && gObj.element.querySelector('.e-frozenrow-border')) {
            this.parent.element.querySelector('.e-frozenrow-border').classList.add('e-frozenrow-empty');
        }
        tr.appendChild(td);
        tbody.appendChild(tr);
        this.contentRenderer.renderEmpty(tbody);
        if (isTrigger) {
            if (!this.parent.isInitialLoad) {
                this.parent.focusModule.setFirstFocusableTabIndex();
            }
            this.parent.trigger(events.dataBound, {});
            this.parent.notify(events.onEmpty, { rows: [new Row({ isDataRow: true, cells: [new Cell({ isDataCell: true, visible: true })] })] });
            if (gObj.editSettings.showAddNewRow) {
                gObj.addRecord();
                this.parent.notify(events.showAddNewRowFocus, {});
            }
        }
    };
    Render.prototype.dynamicColumnChange = function () {
        if (this.parent.getCurrentViewRecords().length) {
            this.updateColumnType(this.parent.getCurrentViewRecords()[0]);
        }
    };
    Render.prototype.updateColumnType = function (record) {
        var columns = this.parent.getColumns();
        var value;
        var cFormat = 'customFormat';
        var equalTo = 'equalTo';
        var data = record && record.items ? record.items[0] : record;
        var fmtr = this.locator.getService('valueFormatter');
        for (var i = 0, len = columns.length; i < len; i++) {
            value = getObject(columns[parseInt(i.toString(), 10)].field || '', data);
            if (!isNullOrUndefined(columns[parseInt(i.toString(), 10)]["" + cFormat])) {
                columns[parseInt(i.toString(), 10)].format = columns[parseInt(i.toString(), 10)]["" + cFormat];
            }
            if (!isNullOrUndefined(columns[parseInt(i.toString(), 10)].validationRules)
                && !isNullOrUndefined(columns[parseInt(i.toString(), 10)].validationRules["" + equalTo])) {
                columns[parseInt(i.toString(), 10)].validationRules["" + equalTo][0] = this.parent.element.id + columns[parseInt(i.toString(), 10)].validationRules["" + equalTo][0];
            }
            if (columns[parseInt(i.toString(), 10)].isForeignColumn() && columns[parseInt(i.toString(), 10)].columnData) {
                value = getObject(columns[parseInt(i.toString(), 10)].foreignKeyValue || '', columns[parseInt(i.toString(), 10)].columnData[0]);
            }
            if (!isNullOrUndefined(value)) {
                this.isColTypeDef = true;
                if (!columns[parseInt(i.toString(), 10)].type) {
                    columns[parseInt(i.toString(), 10)].type = value.getDay ? (value.getHours() > 0 || value.getMinutes() > 0 ||
                        value.getSeconds() > 0 || value.getMilliseconds() > 0 ? 'datetime' : 'date') : typeof (value);
                }
            }
            else {
                columns[parseInt(i.toString(), 10)].type = columns[parseInt(i.toString(), 10)].type || null;
            }
            var valueFormatter = new ValueFormatter();
            if (columns[parseInt(i.toString(), 10)].format && (columns[parseInt(i.toString(), 10)].format.skeleton
                || (columns[parseInt(i.toString(), 10)].format.format &&
                    typeof columns[parseInt(i.toString(), 10)].format.format === 'string'))) {
                columns[parseInt(i.toString(), 10)].setFormatter(valueFormatter.getFormatFunction(extend({}, columns[parseInt(i.toString(), 10)].format)));
                columns[parseInt(i.toString(), 10)].setParser(valueFormatter.getParserFunction(columns[parseInt(i.toString(), 10)].format));
            }
            if (typeof (columns[parseInt(i.toString(), 10)].format) === 'string') {
                setFormatter(this.locator, columns[parseInt(i.toString(), 10)]);
            }
            else if (!columns[parseInt(i.toString(), 10)].format && columns[parseInt(i.toString(), 10)].type === 'number') {
                columns[parseInt(i.toString(), 10)].setParser(fmtr.getParserFunction({ format: 'n2' }));
            }
            if (columns[parseInt(i.toString(), 10)].type === 'dateonly' && !columns[parseInt(i.toString(), 10)].format) {
                columns[parseInt(i.toString(), 10)].format = 'yMd';
                setFormatter(this.locator, columns[parseInt(i.toString(), 10)]);
            }
        }
    };
    /**
     * @param {ReturnType} e - specifies the return type
     * @param {NotifyArgs} args - specifies the Notifyargs
     * @returns {void}
     * @hidden
     */
    // tslint:disable-next-line:max-func-body-length
    Render.prototype.dataManagerSuccess = function (e, args) {
        var _this = this;
        var gObj = this.parent;
        this.contentRenderer = this.renderer.getRenderer(RenderType.Content);
        this.headerRenderer = this.renderer.getRenderer(RenderType.Header);
        e.actionArgs = args;
        var detailGrid = gObj.childGrid || gObj.detailTemplate ? true : false;
        var isInfiniteDelete = this.parent.enableInfiniteScrolling && !this.parent.infiniteScrollSettings.enableCache &&
            !gObj.groupSettings.enableLazyLoading && ((args.requestType === 'delete' && !detailGrid) || (args.requestType === 'save' &&
            this.parent.infiniteScrollModule.requestType === 'add' && !(gObj.sortSettings.columns.length ||
            gObj.filterSettings.columns.length || this.parent.groupSettings.columns.length || gObj.searchSettings.key || detailGrid)));
        // tslint:disable-next-line:max-func-body-length
        gObj.trigger(events.beforeDataBound, e, function (dataArgs) {
            if (dataArgs.cancel) {
                return;
            }
            dataArgs.result = isNullOrUndefined(dataArgs.result) ? [] : dataArgs.result;
            var len = Object.keys(dataArgs.result).length;
            if (_this.parent.isDestroyed) {
                return;
            }
            if ((!gObj.getColumns().length && !len) && !(gObj.columns.length && gObj.columns[0] instanceof Column)) {
                gObj.hideSpinner();
                return;
            }
            if (_this.isInfiniteEnd(args) && !len) {
                _this.parent.notify(events.infiniteEditHandler, { e: args, result: e.result, count: e.count, agg: e.aggregates });
                return;
            }
            _this.parent.isEdit = false;
            _this.parent.notify(events.editReset, {});
            _this.parent.notify(events.tooltipDestroy, {});
            if (args && !((args.requestType === 'infiniteScroll' || args.requestType === 'delete' || args.action === 'add') &&
                gObj.enableInfiniteScrolling)) {
                _this.parent.notify(events.commandColumnDestroy, { type: 'refreshCommandColumn' });
            }
            _this.contentRenderer.prevCurrentView = !isNullOrUndefined(_this.parent.currentViewData) && _this.parent.currentViewData.slice();
            gObj.currentViewData = dataArgs.result;
            gObj.notify(events.refreshInfiniteCurrentViewData, { args: args, data: dataArgs.result });
            if (dataArgs.count && !gObj.allowPaging && (gObj.enableVirtualization || gObj.enableInfiniteScrolling)) {
                gObj.totalDataRecordsCount = dataArgs.count;
            }
            if (!len && dataArgs.count && gObj.allowPaging && args && args.requestType !== 'delete') {
                if (_this.parent.groupSettings.enableLazyLoading
                    && (args.requestType === 'grouping' || args.requestType === 'ungrouping')) {
                    _this.parent.notify(events.groupComplete, args);
                }
                gObj.prevPageMoving = true;
                gObj.pageSettings.totalRecordsCount = dataArgs.count;
                if (args.requestType !== 'paging') {
                    gObj.pageSettings.currentPage = Math.ceil(dataArgs.count / gObj.pageSettings.pageSize);
                }
                gObj.dataBind();
                return;
            }
            if ((!gObj.getColumns().length && len || !_this.isLayoutRendered) && !isGroupAdaptive(gObj)) {
                gObj.removeMaskRow();
                _this.updatesOnInitialRender(dataArgs);
            }
            if (!_this.isColTypeDef && gObj.getCurrentViewRecords()) {
                if (_this.data.dataManager.dataSource.offline && gObj.dataSource && gObj.dataSource.length) {
                    _this.updateColumnType(gObj.dataSource[0]);
                }
                else {
                    _this.updateColumnType(gObj.getCurrentViewRecords()[0]);
                }
            }
            if (!_this.parent.isInitialLoad && _this.parent.groupSettings.disablePageWiseAggregates &&
                !_this.parent.groupSettings.columns.length) {
                dataArgs.result = _this.parent.dataSource instanceof Array ? _this.parent.dataSource : _this.parent.currentViewData;
            }
            if ((_this.parent.isReact || _this.parent.isVue) && !isNullOrUndefined(args) && args.requestType !== 'infiniteScroll' && !args.isFrozen) {
                clearReactVueTemplates(_this.parent, ['footerTemplate']);
            }
            if (_this.parent.isAngular && _this.parent.allowGrouping && _this.parent.groupSettings.captionTemplate
                && !(!isNullOrUndefined(args) && args.requestType === 'infiniteScroll')) {
                _this.parent.destroyTemplate(['groupSettings_captionTemplate']);
            }
            _this.parent.notify(events.dataReady, extend({ count: dataArgs.count, result: dataArgs.result, aggregates: dataArgs.aggregates, loadSummaryOnEmpty: false }, args));
            if ((gObj.groupSettings.columns.length || (args && args.requestType === 'ungrouping'))
                && (args && args.requestType !== 'filtering')) {
                _this.headerRenderer.refreshUI();
            }
            if (len) {
                if (isGroupAdaptive(gObj)) {
                    var content = 'content';
                    args.scrollTop = { top: _this.contentRenderer["" + content].scrollTop };
                }
                if (!isInfiniteDelete) {
                    if (_this.parent.enableImmutableMode) {
                        _this.contentRenderer.immutableModeRendering(args);
                    }
                    else {
                        _this.contentRenderer.refreshContentRows(args);
                    }
                }
                else {
                    _this.parent.notify(events.infiniteEditHandler, { e: args, result: e.result, count: e.count, agg: e.aggregates });
                }
            }
            else {
                if (args && args.isCaptionCollapse) {
                    return;
                }
                if (!gObj.getColumns().length) {
                    gObj.element.innerHTML = '';
                    alert(_this.l10n.getConstant('EmptyDataSourceError')); //ToDO: change this alert as dialog
                    return;
                }
                _this.contentRenderer.setRowElements([]);
                _this.contentRenderer.setRowObjects([]);
                _this.ariaService.setBusy(_this.parent.getContent().querySelector('.' + literals.content), false);
                gObj.removeMaskRow();
                _this.renderEmptyRow();
                if (gObj.enableColumnVirtualization && !len) {
                    _this.parent.notify(events.contentReady, { rows: gObj.getRowsObject(), args: {} });
                }
                if (args) {
                    var action = (args.requestType || '').toLowerCase() + '-complete';
                    _this.parent.notify(action, args);
                    if (args.requestType === 'batchsave') {
                        args.cancel = false;
                        args.rows = [];
                        args.isFrozen = !args.isFrozen;
                        _this.parent.trigger(events.actionComplete, args);
                    }
                }
                if (_this.parent.autoFit) {
                    _this.parent.preventAdjustColumns();
                }
                _this.parent.hideSpinner();
            }
            _this.parent.notify(events.toolbarRefresh, {});
            _this.setRowCount(_this.parent.getCurrentViewRecords().length);
            if ('query' in e) {
                _this.parent.getDataModule().isQueryInvokedFromData = false;
            }
        });
    };
    /**
     * @param {object} e - specifies the object
     * @param {Object[]} e.result - specifies the result
     * @param {NotifyArgs} args - specifies the args
     * @returns {void}
     * @hidden
     */
    Render.prototype.dataManagerFailure = function (e, args) {
        if (!isNullOrUndefined(this.parent.contentModule)) {
            this.ariaService.setOptions(this.parent.getContent().querySelector('.' + literals.content), { busy: false, invalid: true });
            this.setRowCount(1);
        }
        this.parent.trigger(events.actionFailure, { error: e });
        this.parent.hideSpinner();
        this.parent.removeMaskRow();
        if (args.requestType === 'save' || args.requestType === 'delete'
            || args.name === 'bulk-save') {
            return;
        }
        this.parent.currentViewData = [];
        this.renderEmptyRow();
        if (!this.parent.isInitialLoad) {
            this.parent.focusModule.setFirstFocusableTabIndex();
        }
        this.parent.log('actionfailure', { error: e });
    };
    Render.prototype.setRowCount = function (dataRowCount) {
        this.ariaService.setOptions(this.parent.element, {
            rowcount: dataRowCount ? dataRowCount.toString() : '1'
        });
    };
    Render.prototype.isInfiniteEnd = function (args) {
        return this.parent.enableInfiniteScrolling && !this.parent.infiniteScrollSettings.enableCache && args.requestType === 'delete';
    };
    Render.prototype.updatesOnInitialRender = function (e) {
        this.isLayoutRendered = true;
        var isEmptyCol = false;
        if (this.parent.columns.length < 1) {
            this.buildColumns(e.result[0]);
            isEmptyCol = true;
        }
        prepareColumns(this.parent.columns, null, this.parent);
        if (isEmptyCol) {
            this.parent.notify(events.refreshSplitFrozenColumn, {});
        }
        this.headerRenderer.renderTable();
        this.contentRenderer.renderTable();
        this.parent.isAutoGen = true;
        this.parent.notify(events.autoCol, {});
    };
    Render.prototype.iterateComplexColumns = function (obj, field, split) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            var childKeys = typeof obj[keys[parseInt(i.toString(), 10)]] === 'object'
                && obj[keys[parseInt(i.toString(), 10)]] && !(obj[keys[parseInt(i.toString(), 10)]] instanceof Date) ?
                Object.keys(obj[keys[parseInt(i.toString(), 10)]]) : [];
            if (childKeys.length) {
                this.iterateComplexColumns(obj[keys[parseInt(i.toString(), 10)]], field + (keys[parseInt(i.toString(), 10)] + '.'), split);
            }
            else {
                split[this.counter] = field + keys[parseInt(i.toString(), 10)];
                this.counter++;
            }
        }
    };
    Render.prototype.buildColumns = function (record) {
        var cols = [];
        var complexCols = {};
        this.iterateComplexColumns(record, '', complexCols);
        var columns = Object.keys(complexCols).filter(function (e) { return complexCols["" + e] !== 'BlazId'; }).
            map(function (field) { return complexCols["" + field]; });
        for (var i = 0, len = columns.length; i < len; i++) {
            cols[parseInt(i.toString(), 10)] = { 'field': columns[parseInt(i.toString(), 10)] };
            if (this.parent.enableColumnVirtualization) {
                cols[parseInt(i.toString(), 10)].width = !isNullOrUndefined(cols[parseInt(i.toString(), 10)].width) ?
                    cols[parseInt(i.toString(), 10)].width : 200;
            }
        }
        this.parent.setProperties({ 'columns': cols }, true);
    };
    Render.prototype.instantiateRenderer = function () {
        this.renderer.addRenderer(RenderType.Header, new HeaderRender(this.parent, this.locator));
        this.renderer.addRenderer(RenderType.Content, new ContentRender(this.parent, this.locator));
        var cellrender = this.locator.getService('cellRendererFactory');
        cellrender.addCellRenderer(CellType.Header, new HeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Data, new CellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.StackedHeader, new StackedHeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Indent, new IndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.GroupCaption, new GroupCaptionCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.GroupCaptionEmpty, new GroupCaptionEmptyCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Expand, new ExpandCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.HeaderIndent, new HeaderIndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.StackedHeader, new StackedHeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.DetailHeader, new DetailHeaderIndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.RowDragHIcon, new RowDragDropHeaderRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.DetailExpand, new DetailExpandCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.DetailFooterIntent, new IndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.RowDragIcon, new RowDragDropRenderer(this.parent, this.locator));
    };
    Render.prototype.addEventListener = function () {
        var _this = this;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initialLoad, this.instantiateRenderer, this);
        this.parent.on('refreshdataSource', this.dataManagerSuccess, this);
        this.parent.on(events.modelChanged, this.refresh, this);
        this.parent.on(events.refreshComplete, this.refreshComplete, this);
        this.parent.on(events.bulkSave, this.sendBulkRequest, this);
        this.parent.on(events.showEmptyGrid, function () { _this.emptyGrid = true; }, this);
        this.parent.on(events.autoCol, this.dynamicColumnChange, this);
    };
    /**
     * @param {ReturnType} e - specifies the Return type
     * @returns {Promise<Object>} returns the object
     * @hidden
     */
    Render.prototype.validateGroupRecords = function (e) {
        var _this = this;
        var index = e.result.length - 1;
        if (index < 0) {
            return Promise.resolve(e);
        }
        var group0 = e.result[0];
        var groupN = e.result[parseInt(index.toString(), 10)];
        var predicate = [];
        var addWhere = function (input) {
            var groups = [group0, groupN];
            for (var i = 0; i < groups.length; i++) {
                predicate.push(new Predicate('field', '==', groups[parseInt(i.toString(), 10)].field).and(_this.getPredicate('key', 'equal', groups[parseInt(i.toString(), 10)].key)));
            }
            input.where(Predicate.or(predicate));
        };
        var query = new Query();
        addWhere(query);
        var curDm = new DataManager(e.result);
        var curFilter = curDm.executeLocal(query);
        var newQuery = this.data.generateQuery(true);
        var rPredicate = [];
        if (this.data.isRemote()) {
            var groups = [group0, groupN];
            for (var i = 0; i < groups.length; i++) {
                rPredicate.push(this.getPredicate(groups[parseInt(i.toString(), 10)].field, 'equal', groups[parseInt(i.toString(), 10)].key));
            }
            newQuery.where(Predicate.or(rPredicate));
        }
        else {
            addWhere(newQuery);
        }
        var deferred = new Deferred();
        this.data.getData({}, newQuery).then(function (r) {
            _this.updateGroupInfo(curFilter, r.result);
            deferred.resolve(e);
        }).catch(function (e) { return deferred.reject(e); });
        return deferred.promise;
    };
    /**
     * @param {string} key - Defines the key
     * @param {string} operator - Defines the operator
     * @param {string | number | Date} value - Defines the value
     * @returns {Predicate} - Returns the predicate
     * @hidden */
    Render.prototype.getPredicate = function (key, operator, value) {
        if (value instanceof Date) {
            return getDatePredicate({ field: key, operator: operator, value: value });
        }
        return new Predicate(key, operator, value);
    };
    /**
     * @param {Object[]} current - Defines the current object
     * @param {Object[]} untouched - Defines the object needs to merge
     * @returns {Object[]} - Returns the updated group information
     * @hidden */
    Render.prototype.updateGroupInfo = function (current, untouched) {
        var dm = new DataManager(untouched);
        var elements = current;
        for (var i = 0; i < elements.length; i++) {
            var updatedGroup = dm.executeLocal(new Query()
                .where(new Predicate('field', '==', elements[parseInt(i.toString(), 10)].field).and(this.getPredicate('key', 'equal', elements[parseInt(i.toString(), 10)].key))))[0];
            if (!isNullOrUndefined(updatedGroup)) {
                elements[parseInt(i.toString(), 10)].count = updatedGroup.count;
                var itemGroup = elements[parseInt(i.toString(), 10)].items;
                var updatedGroupItem = updatedGroup.items;
                if (itemGroup.GroupGuid) {
                    elements[parseInt(i.toString(), 10)].items =
                        this.updateGroupInfo(elements[parseInt(i.toString(), 10)].items, updatedGroup.items);
                }
                var rows = this.parent.aggregates;
                for (var j = 0; j < rows.length; j++) {
                    var row = rows[parseInt(j.toString(), 10)];
                    for (var k = 0; k < row.columns.length; k++) {
                        var column = row.columns[parseInt(k.toString(), 10)];
                        var types = column.type instanceof Array ? (column.type) : [(column.type)];
                        for (var l = 0; l < types.length; l++) {
                            var key = column.field + ' - ' + types[parseInt(l.toString(), 10)].toLowerCase();
                            var data = itemGroup.level ? updatedGroupItem.records : updatedGroup.items;
                            var context = this.parent;
                            if (types[parseInt(l.toString(), 10)] === 'Custom') {
                                var data_1 = itemGroup.level ? updatedGroupItem : updatedGroup;
                                var temp = column
                                    .customAggregate;
                                if (typeof temp === 'string') {
                                    temp = getValue(temp, window);
                                }
                                elements[parseInt(i.toString(), 10)].aggregates["" + key] = temp ? temp.call(context, data_1, row.columns[parseInt(k.toString(), 10)]) : '';
                            }
                            else {
                                elements[parseInt(i.toString(), 10)].aggregates["" + key] = DataUtil.aggregates[types[parseInt(l.toString(), 10)].toLowerCase()](data, row.columns[parseInt(k.toString(), 10)].field);
                            }
                        }
                    }
                }
            }
        }
        return current;
    };
    return Render;
}());
export { Render };
