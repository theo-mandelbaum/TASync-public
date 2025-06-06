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
import { extend, remove, isNullOrUndefined, setStyleAttribute, removeClass, addClass } from '@syncfusion/ej2-base';
import { ContentRender } from './content-renderer';
import * as events from '../base/constant';
import { isRowEnteredInGrid, parentsUntil, setDisplayValue, generateExpandPredicates, getPredicates, getGroupKeysAndFields } from '../base/util';
import { RowRenderer } from '../renderer/row-renderer';
import { GroupModelGenerator } from '../services/group-model-generator';
import { GroupSummaryModelGenerator, CaptionSummaryModelGenerator } from '../services/summary-model-generator';
import * as literals from '../base/string-literals';
/**
 * GroupLazyLoadRenderer is used to perform lazy load grouping
 *
 * @hidden
 */
var GroupLazyLoadRenderer = /** @class */ (function (_super) {
    __extends(GroupLazyLoadRenderer, _super);
    function GroupLazyLoadRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.childCount = 0;
        _this.scrollData = [];
        _this.isFirstChildRow = false;
        _this.isScrollDown = false;
        _this.isScrollUp = false;
        _this.groupCache = {};
        _this.cacheRowsObj = {};
        _this.startIndexes = {};
        _this.captionCounts = {};
        _this.rowsByUid = {};
        _this.objIdxByUid = {};
        _this.initialGroupCaptions = {};
        _this.requestType = ['paging', 'columnstate', 'reorder', 'cancel', 'save', 'beginEdit', 'add', 'delete',
            'filterBeforeOpen', 'filterchoicerequest', 'infiniteScroll', 'virtualscroll'];
        _this.scrollTopCache = undefined;
        /** @hidden */
        _this.refRowsObj = {};
        /** @hidden */
        _this.cacheMode = false;
        /** @hidden */
        _this.cacheBlockSize = 5;
        /** @hidden */
        _this.ignoreAccent = _this.parent.allowFiltering ? _this.parent.filterSettings.ignoreAccent : false;
        /** @hidden */
        _this.allowCaseSensitive = false;
        /** @hidden */
        _this.lazyLoadQuery = [];
        _this.locator = locator;
        _this.groupGenerator = new GroupModelGenerator(_this.parent);
        _this.summaryModelGen = new GroupSummaryModelGenerator(_this.parent);
        _this.captionModelGen = new CaptionSummaryModelGenerator(_this.parent);
        _this.rowRenderer = new RowRenderer(_this.locator, null, _this.parent);
        _this.eventListener();
        return _this;
    }
    GroupLazyLoadRenderer.prototype.eventListener = function () {
        this.parent.addEventListener(events.actionBegin, this.actionBegin.bind(this));
        this.parent.addEventListener(events.actionComplete, this.actionComplete.bind(this));
        this.parent.on(events.initialEnd, this.setLazyLoadPageSize, this);
        this.parent.on(events.setGroupCache, this.setCache, this);
        this.parent.on(events.lazyLoadScrollHandler, this.scrollHandler, this);
        this.parent.on(events.columnVisibilityChanged, this.setVisible, this);
        this.parent.on(events.groupCollapse, this.collapseShortcut, this);
    };
    /**
     * @param {HTMLTableRowElement} tr - specifies the table row element
     * @returns {void}
     * @hidden
     */
    GroupLazyLoadRenderer.prototype.captionExpand = function (tr) {
        var _this = this;
        var page = this.parent.pageSettings.currentPage;
        var rowsObject = this.groupCache[parseInt(page.toString(), 10)];
        var uid = tr.getAttribute('data-uid');
        this.refreshCaches();
        if ((!this.scrollTopCache || this.parent.scrollModule['content'].scrollTop > this.scrollTopCache) &&
            !this.parent.enableVirtualization) {
            this.scrollTopCache = this.parent.scrollModule['content'].scrollTop;
        }
        var oriIndex = this.getRowObjectIndexByUid(uid);
        var isRowExist = rowsObject[oriIndex + 1] ?
            rowsObject[parseInt(oriIndex.toString(), 10)].indent < rowsObject[oriIndex + 1].indent : false;
        if (this.parent.enableVirtualization) {
            isRowExist = this.cacheRowsObj["" + uid] ? true : false;
        }
        var data = rowsObject[parseInt(oriIndex.toString(), 10)];
        var key = getGroupKeysAndFields(oriIndex, rowsObject);
        for (var i = 0; i < key.fields.length; i++) {
            var column = this.parent.getColumnByField(key.fields[parseInt(i.toString(), 10)]);
            if (column.enableGroupByFormat) {
                key.keys[parseInt(i.toString(), 10)] = this.locator.getService('valueFormatter').fromView(key.keys[parseInt(i.toString(), 10)], column.getParser(), (column.type === 'dateonly' ? 'date' : column.type));
            }
        }
        var e = { captionRowElement: tr, groupInfo: data, enableCaching: true, cancel: false };
        this.parent.trigger(events.lazyLoadGroupExpand, e, function (args) {
            if (args.cancel) {
                return;
            }
            args.keys = key.keys;
            args.fields = key.fields;
            args.rowIndex = tr.rowIndex;
            args.makeRequest = !args.enableCaching || !isRowExist;
            if (!args.enableCaching && isRowExist) {
                _this.clearCache([uid]);
            }
            args.skip = 0;
            args.take = _this.pageSize;
            data.isExpand = true;
            if (_this.rowsByUid[parseInt(page.toString(), 10)][data.uid]) {
                _this.rowsByUid[parseInt(page.toString(), 10)][data.uid].isExpand = true;
            }
            _this.captionRowExpand(args);
        });
    };
    /**
     * @param {HTMLTableRowElement} tr - specifies the table row element
     * @returns {void}
     * @hidden
     */
    GroupLazyLoadRenderer.prototype.captionCollapse = function (tr) {
        var _this = this;
        var cache = this.groupCache[this.parent.pageSettings.currentPage];
        var rowIdx = tr.rowIndex;
        var uid = tr.getAttribute('data-uid');
        this.refreshCaches();
        var captionIndex = this.getRowObjectIndexByUid(uid);
        var e = {
            captionRowElement: tr, groupInfo: cache[parseInt(captionIndex.toString(), 10)], cancel: false
        };
        this.parent.trigger(events.lazyLoadGroupCollapse, e, function (args) {
            if (args.cancel) {
                return;
            }
            args.isExpand = false;
            for (var i = 0; i < _this.lazyLoadQuery.length; i++) {
                var query = _this.lazyLoadQuery[parseInt(i.toString(), 10)];
                var where = query[0];
                var removeCollapse = args.groupInfo.data;
                if (removeCollapse['key'] === where['value']) {
                    _this.lazyLoadQuery.splice(i, 1);
                }
            }
            _this.removeRows(captionIndex, rowIdx, uid);
            if (_this.parent.enableInfiniteScrolling || _this.parent.enableVirtualization) {
                _this.groupCache[_this.parent.pageSettings.currentPage] = extend([], _this.refRowsObj[_this.parent.pageSettings.currentPage]);
                _this.refreshRowObjects([], captionIndex);
            }
        });
    };
    /**
     * @returns {void}
     * @hidden */
    GroupLazyLoadRenderer.prototype.setLazyLoadPageSize = function () {
        var scrollEle = this.parent.getContent().firstElementChild;
        var blockSize = Math.floor(scrollEle.offsetHeight / this.parent.getRowHeight()) - 1;
        this.pageSize = this.pageSize ? this.pageSize : blockSize * 3;
        this.blockSize = Math.ceil(this.pageSize / 2);
    };
    /**
     * @returns {void}
     * @hidden */
    GroupLazyLoadRenderer.prototype.clearLazyGroupCache = function () {
        this.clearCache();
    };
    GroupLazyLoadRenderer.prototype.clearCache = function (uids) {
        uids = uids ? uids : this.getInitialCaptionIndexes();
        var cache = this.groupCache[this.parent.pageSettings.currentPage];
        if (uids.length) {
            for (var i = 0; i < uids.length; i++) {
                var capIdx = this.getRowObjectIndexByUid(uids[parseInt(i.toString(), 10)]);
                var capRow = cache[parseInt(capIdx.toString(), 10)];
                if (!capRow) {
                    continue;
                }
                if (this.captionCounts[this.parent.pageSettings.currentPage][capRow.uid]) {
                    for (var i_1 = capIdx + 1; i_1 < cache.length; i_1++) {
                        if (cache[parseInt(i_1.toString(), 10)].indent === capRow.indent
                            || cache[parseInt(i_1.toString(), 10)].indent < capRow.indent) {
                            delete this.captionCounts[this.parent.pageSettings.currentPage][capRow.uid];
                            break;
                        }
                        if (cache[parseInt(i_1.toString(), 10)].isCaptionRow) {
                            delete this.captionCounts[this.parent.pageSettings.currentPage][cache[parseInt(i_1.toString(), 10)].uid];
                        }
                    }
                }
                if (capRow.isExpand) {
                    var tr = this.parent.getRowElementByUID(capRow.uid);
                    if (!tr) {
                        return;
                    }
                    this.parent.groupModule.expandCollapseRows(tr.querySelector('.e-recordplusexpand'));
                }
                var child = this.getNextChilds(capIdx);
                if (!child.length) {
                    continue;
                }
                var subChild = [];
                if (child[child.length - 1].isCaptionRow) {
                    subChild = this.getChildRowsByParentIndex(cache.indexOf(child[child.length - 1]), false, false, null, true, true);
                }
                var start = cache.indexOf(child[0]);
                var end = subChild.length ? cache.indexOf(subChild[subChild.length - 1]) : cache.indexOf(child[child.length - 1]);
                cache.splice(start, end - (start - 1));
                this.refreshCaches();
            }
        }
    };
    GroupLazyLoadRenderer.prototype.refreshCaches = function () {
        var page = this.parent.pageSettings.currentPage;
        var cache = this.groupCache[parseInt(page.toString(), 10)];
        if (this.parent.enableInfiniteScrolling) {
            this.rowsByUid[parseInt(page.toString(), 10)] = [];
            this.objIdxByUid[parseInt(page.toString(), 10)] = [];
        }
        else {
            this.rowsByUid = {};
            this.objIdxByUid = {};
        }
        for (var i = 0; i < cache.length; i++) {
            this.maintainRows(cache[parseInt(i.toString(), 10)], i);
        }
    };
    GroupLazyLoadRenderer.prototype.getInitialCaptionIndexes = function () {
        var page = this.parent.pageSettings.currentPage;
        var uids = [];
        for (var i = 0; i < this.initialGroupCaptions[parseInt(page.toString(), 10)].length; i++) {
            uids.push(this.initialGroupCaptions[parseInt(page.toString(), 10)][parseInt(i.toString(), 10)].uid);
        }
        return uids;
    };
    /**
     * @param {string} uid - specifies the uid
     * @returns {number} returns the row object uid
     * @hidden
     */
    GroupLazyLoadRenderer.prototype.getRowObjectIndexByUid = function (uid) {
        return this.objIdxByUid[this.parent.pageSettings.currentPage]["" + uid];
    };
    GroupLazyLoadRenderer.prototype.collapseShortcut = function (args) {
        if (this.parent.groupSettings.columns.length &&
            args.target && parentsUntil(args.target, literals.content) && args.target.parentElement.tagName === 'TR') {
            if (!args.collapse && parentsUntil(args.target, literals.row)) {
                return;
            }
            var row = args.target.parentElement;
            var uid = row.getAttribute('data-uid');
            if (args.collapse) {
                var rowObj = this.getRowByUid(uid);
                var capRow = this.getRowByUid(rowObj.parentUid);
                if (capRow.isCaptionRow && capRow.isExpand) {
                    var capEle = this.getRowElementByUid(rowObj.parentUid);
                    this.parent.groupModule.expandCollapseRows(capEle.cells[rowObj.indent - 1]);
                }
            }
            else {
                var capRow = this.getRowByUid(uid);
                if (capRow.isCaptionRow && !capRow.isExpand) {
                    var capEle = this.getRowElementByUid(uid);
                    this.parent.groupModule.expandCollapseRows(capEle.cells[capRow.indent]);
                }
            }
        }
    };
    GroupLazyLoadRenderer.prototype.getRowByUid = function (uid) {
        return this.rowsByUid[this.parent.pageSettings.currentPage]["" + uid];
    };
    GroupLazyLoadRenderer.prototype.actionBegin = function (args) {
        if (!args.cancel) {
            if (!this.requestType.some(function (value) { return value === args.requestType; })) {
                this.groupCache = {};
                this.resetRowMaintenance();
                if (this.parent.enableVirtualization) {
                    this.parent.contentModule.currentInfo = {};
                }
            }
            if (args.requestType === 'reorder' && this.parent.groupSettings.columns.length) {
                var keys = Object.keys(this.groupCache);
                for (var j = 0; j < keys.length; j++) {
                    var cache = this.groupCache[keys[parseInt(j.toString(), 10)]];
                    for (var i = 0; i < cache.length; i++) {
                        if (cache[parseInt(i.toString(), 10)].isCaptionRow && !this.captionModelGen.isEmpty()) {
                            this.changeCaptionRow(cache[parseInt(i.toString(), 10)], null, keys[parseInt(j.toString(), 10)]);
                        }
                        if (cache[parseInt(i.toString(), 10)].isDataRow) {
                            var from = args.fromIndex + cache[parseInt(i.toString(), 10)].indent;
                            var to = args.toIndex + cache[parseInt(i.toString(), 10)].indent;
                            this.moveCells(cache[parseInt(i.toString(), 10)].cells, from, to);
                        }
                    }
                }
            }
            if (args.requestType === 'delete'
                || (args.action === 'add' && args.requestType === 'save')) {
                this.groupCache = {};
                this.resetRowMaintenance();
                if (this.parent.enableVirtualization) {
                    this.parent.contentModule.currentInfo = {};
                }
            }
        }
    };
    GroupLazyLoadRenderer.prototype.actionComplete = function (args) {
        if (!args.cancel && args.requestType !== 'columnstate' && args.requestType !== 'beginEdit'
            && args.requestType !== 'delete' && args.requestType !== 'save' && args.requestType !== 'reorder'
            && args.requestType !== 'infiniteScroll') {
            this.scrollReset();
        }
    };
    GroupLazyLoadRenderer.prototype.resetRowMaintenance = function () {
        this.startIndexes = {};
        this.captionCounts = {};
        this.rowsByUid = {};
        this.objIdxByUid = {};
        this.initialGroupCaptions = {};
    };
    GroupLazyLoadRenderer.prototype.moveCells = function (arr, from, to) {
        if (from >= arr.length) {
            var k = from - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(from, 0, arr.splice(to, 1)[0]);
    };
    GroupLazyLoadRenderer.prototype.removeRows = function (idx, trIdx, uid) {
        var page = this.parent.pageSettings.currentPage;
        var rows = this.groupCache[parseInt(page.toString(), 10)];
        var trs = [].slice.call(this.parent.getContent().querySelectorAll('tr'));
        var aggUid;
        var count = 0;
        if (this.parent.aggregates.length) {
            var agg = this.getAggregateByCaptionIndex(idx);
            aggUid = agg.length ? agg[agg.length - 1].uid : undefined;
        }
        var indent = rows[parseInt(idx.toString(), 10)].indent;
        this.addClass(this.getNextChilds(parseInt(idx.toString(), 10)));
        rows[parseInt(idx.toString(), 10)].isExpand = false;
        if (this.rowsByUid[parseInt(page.toString(), 10)][rows[parseInt(idx.toString(), 10)].uid]) {
            this.rowsByUid[parseInt(page.toString(), 10)][rows[parseInt(idx.toString(), 10)].uid].isExpand = false;
        }
        var capUid;
        for (var i = idx + 1; i < rows.length; i++) {
            if (rows[parseInt(i.toString(), 10)].indent === indent || rows[parseInt(i.toString(), 10)].indent < indent) {
                capUid = rows[parseInt(i.toString(), 10)].uid;
                break;
            }
            if (rows[parseInt(i.toString(), 10)].isCaptionRow && rows[parseInt(i.toString(), 10)].isExpand) {
                this.addClass(this.getNextChilds(i));
            }
        }
        for (var i = trIdx + 1; i < trs.length; i++) {
            if (trs[parseInt(i.toString(), 10)].getAttribute('data-uid') === capUid) {
                break;
            }
            else if (trs[parseInt(i.toString(), 10)].getAttribute('data-uid') === aggUid) {
                remove(trs[parseInt(i.toString(), 10)]);
                break;
            }
            else {
                remove(trs[parseInt(i.toString(), 10)]);
                this.refRowsObj[parseInt(page.toString(), 10)].splice(trIdx + 1, 1);
                count = count + 1;
            }
        }
        if (this.parent.enableVirtualization) {
            this.cacheRowsObj["" + uid] = this.groupCache[parseInt(page.toString(), 10)].slice(idx + 1, idx + 1 + count);
            this.groupCache[parseInt(page.toString(), 10)].splice(idx + 1, count);
            this.parent.notify(events.refreshVirtualLazyLoadCache, { rows: [], uid: rows[parseInt(idx.toString(), 10)].uid, count: count });
            this.parent.contentModule.setVirtualHeight();
            this.parent.islazyloadRequest = false;
        }
        if (this.parent.scrollModule['content'].scrollTop > this.scrollTopCache && !this.parent.enableVirtualization) {
            this.parent.scrollModule['content'].scrollTop = this.scrollTopCache;
        }
        if (this.parent.getContentTable().scrollHeight < this.parent.getContent().clientHeight && this.parent.height !== 'auto') {
            this.parent.scrollModule.setLastRowCell();
        }
        this.parent.notify(events.refreshExpandandCollapse, { rows: this.refRowsObj[parseInt(page.toString(), 10)] });
    };
    GroupLazyLoadRenderer.prototype.addClass = function (rows) {
        var last = rows[this.blockSize];
        if (last) {
            last.lazyLoadCssClass = 'e-lazyload-middle-down';
        }
    };
    GroupLazyLoadRenderer.prototype.getNextChilds = function (index, rowObjects) {
        var group = this.groupCache[this.parent.pageSettings.currentPage];
        var rows = rowObjects ? rowObjects : group;
        var indent = group[parseInt(index.toString(), 10)].indent + 1;
        var childRows = [];
        for (var i = rowObjects ? 0 : index + 1; i < rows.length; i++) {
            if (rows[parseInt(i.toString(), 10)].indent < indent) {
                break;
            }
            if (rows[parseInt(i.toString(), 10)].indent === indent) {
                childRows.push(rows[parseInt(i.toString(), 10)]);
            }
        }
        return childRows;
    };
    GroupLazyLoadRenderer.prototype.lazyLoadHandler = function (args) {
        this.setStartIndexes();
        var tr = this.parent.getContent().querySelectorAll('tr')[args.index];
        var uid = tr.getAttribute('data-uid');
        var captionIndex = this.getRowObjectIndexByUid(uid);
        var captionRow = this.groupCache[this.parent.pageSettings.currentPage][parseInt(captionIndex.toString(), 10)];
        var rows = args.isRowExist ? args.isScroll ? this.scrollData
            : this.parent.enableVirtualization ? this.cacheRowsObj["" + uid] :
                this.getChildRowsByParentIndex(captionIndex, true, true, null, true) : [];
        this.scrollData = [];
        if (!args.isRowExist) {
            this.setRowIndexes(captionIndex, captionRow);
            this.refreshCaptionRowCount(this.groupCache[this.parent.pageSettings.currentPage][parseInt(captionIndex.toString(), 10)], args.count);
            if (Object.keys(args.data).indexOf('GroupGuid') !== -1) {
                for (var i = 0; i < args.data.length; i++) {
                    var data = this.groupGenerator.generateCaptionRow(args.data[parseInt(i.toString(), 10)], args.level, captionRow.parentGid, undefined, 0, captionRow.uid);
                    rows.push(data);
                    if (this.parent.aggregates.length) {
                        rows = rows.concat((this.summaryModelGen.generateRows(args.data[parseInt(i.toString(), 10)], { level: args.level + 1, parentUid: data.uid })));
                    }
                }
            }
            else {
                this.groupGenerator.index = this.getStartIndex(captionIndex, args.isScroll);
                rows = this.groupGenerator.generateDataRows(args.data, args.level, captionRow.parentGid, 0, captionRow.uid);
            }
        }
        var trIdx = args.isScroll ? this.rowIndex : args.index;
        var nxtChild = this.getNextChilds(captionIndex, rows);
        var lastRow = !args.up ? this.hasLastChildRow(args.isScroll, args.count, nxtChild.length) : true;
        if (!args.isRowExist && !lastRow) {
            nxtChild[this.blockSize].lazyLoadCssClass = 'e-lazyload-middle-down';
        }
        if (!lastRow) {
            nxtChild[nxtChild.length - 1].lazyLoadCssClass = 'e-not-lazyload-end';
        }
        var aggregates = !args.isScroll && !args.isRowExist ? this.getAggregateByCaptionIndex(captionIndex) : [];
        if (!args.up) {
            if (!args.isRowExist || (this.parent.enableVirtualization && args.isRowExist && this.cacheRowsObj["" + uid])) {
                this.refreshRowObjects(rows, args.isScroll ? this.rowObjectIndex : captionIndex);
            }
        }
        if (this.parent.enableVirtualization) {
            var uid_1 = args.isScroll ? this.groupCache[this.parent.pageSettings.currentPage][this.rowIndex].uid : captionRow.uid;
            this.parent.notify(events.refreshVirtualLazyLoadCache, { rows: rows, uid: uid_1 });
            this.parent.contentModule.setVirtualHeight();
            this.parent.contentModule.isTop = false;
        }
        this.render(trIdx, rows, lastRow, aggregates);
        if (this.isFirstChildRow && !args.up) {
            this.parent.getContent().firstElementChild.scrollTop = rows.length * this.parent.getRowHeight();
        }
        this.isFirstChildRow = false;
        this.rowIndex = undefined;
        this.rowObjectIndex = undefined;
        this.childCount = 0;
        for (var i = 0; i < rows.length; i++) {
            this.refRowsObj[this.parent.pageSettings.currentPage].splice(captionIndex + i + 1, 0, rows[parseInt(i.toString(), 10)]);
        }
        if (lastRow && tr.querySelector('.e-lastrowcell')) {
            this.parent.groupModule.lastCaptionRowBorder();
        }
        this.parent.notify(events.refreshExpandandCollapse, { rows: this.refRowsObj[this.parent.pageSettings.currentPage] });
        if (this.parent.enableVirtualMaskRow) {
            this.parent.removeMaskRow();
        }
    };
    GroupLazyLoadRenderer.prototype.setRowIndexes = function (capIdx, row) {
        if (!this.captionCounts[this.parent.pageSettings.currentPage]) {
            this.captionCounts[this.parent.pageSettings.currentPage] = {};
        }
        if (row.isCaptionRow) {
            this.captionCounts[this.parent.pageSettings.currentPage][row.uid] = row.data.count;
        }
    };
    GroupLazyLoadRenderer.prototype.getStartIndex = function (capIdx, isScroll) {
        var page = this.parent.pageSettings.currentPage;
        var cache = this.groupCache[parseInt(page.toString(), 10)];
        if (isScroll) {
            return cache[this.rowObjectIndex].index + 1;
        }
        var count = 0;
        var idx = 0;
        var prevCapRow = this.getRowByUid(cache[parseInt(capIdx.toString(), 10)].parentUid);
        if (prevCapRow) {
            idx = this.prevCaptionCount(prevCapRow);
        }
        if (cache[parseInt(capIdx.toString(), 10)].indent > 0) {
            for (var i = capIdx - 1; i >= 0; i--) {
                if (cache[parseInt(i.toString(), 10)].indent < cache[parseInt(capIdx.toString(), 10)].indent) {
                    break;
                }
                if (cache[parseInt(i.toString(), 10)].isCaptionRow && cache[parseInt(i.toString(), 10)]
                    .indent === cache[parseInt(capIdx.toString(), 10)].indent) {
                    count = count + cache[parseInt(i.toString(), 10)].data.count;
                }
            }
        }
        var index = count + idx
            + this.startIndexes[parseInt(page.toString(), 10)][cache[parseInt(capIdx.toString(), 10)].parentGid];
        return index;
    };
    GroupLazyLoadRenderer.prototype.prevCaptionCount = function (prevCapRow) {
        var page = this.parent.pageSettings.currentPage;
        var cache = this.groupCache[parseInt(page.toString(), 10)];
        var idx = 0;
        for (var i = cache.indexOf(prevCapRow) - 1; i >= 0; i--) {
            if (cache[parseInt(i.toString(), 10)].indent === 0) {
                break;
            }
            if (cache[parseInt(i.toString(), 10)].indent < prevCapRow.indent) {
                break;
            }
            if (cache[parseInt(i.toString(), 10)].isCaptionRow && cache[parseInt(i.toString(), 10)].indent === prevCapRow.indent) {
                var count = this.captionCounts[parseInt(page.toString(), 10)][cache[parseInt(i.toString(), 10)].uid];
                idx = idx + (count ? count : cache[parseInt(i.toString(), 10)].data.count);
            }
        }
        var capRow = this.getRowByUid(prevCapRow.parentUid);
        if (capRow) {
            idx = idx + this.prevCaptionCount(capRow);
        }
        return idx;
    };
    GroupLazyLoadRenderer.prototype.setStartIndexes = function () {
        var cache = this.groupCache[this.parent.pageSettings.currentPage];
        if (!this.startIndexes[this.parent.pageSettings.currentPage]) {
            var indexes = [];
            var idx = void 0;
            for (var i = 0; i < cache.length; i++) {
                if (cache[parseInt(i.toString(), 10)].isCaptionRow) {
                    if (!indexes.length) {
                        indexes.push(0);
                    }
                    else {
                        indexes.push(cache[parseInt(idx.toString(), 10)].data.count + indexes[indexes.length - 1]);
                    }
                    idx = i;
                }
            }
            this.startIndexes[this.parent.pageSettings.currentPage] = indexes;
        }
    };
    GroupLazyLoadRenderer.prototype.hasLastChildRow = function (isScroll, captionCount, rowCount) {
        return isScroll ? captionCount === this.childCount + rowCount : captionCount === rowCount;
    };
    GroupLazyLoadRenderer.prototype.refreshCaptionRowCount = function (row, count) {
        row.data.count = count;
    };
    GroupLazyLoadRenderer.prototype.render = function (trIdx, rows, hasLastChildRow, aggregates) {
        var tr = this.parent.getContent().querySelectorAll('tr')[parseInt(trIdx.toString(), 10)];
        var scrollEle = this.parent.getContent().firstElementChild;
        var rowHeight = this.parent.getRowHeight();
        if (tr && aggregates.length) {
            for (var i = aggregates.length - 1; i >= 0; i--) {
                tr.insertAdjacentElement('afterend', this.rowRenderer.render(aggregates[parseInt(i.toString(), 10)], this.parent.getColumns()));
            }
        }
        if (tr && rows.length) {
            for (var i = rows.length - 1; i >= 0; i--) {
                if (this.confirmRowRendering(rows[parseInt(i.toString(), 10)])) {
                    tr.insertAdjacentElement('afterend', this.rowRenderer.render(rows[parseInt(i.toString(), 10)], this.parent.getColumns()));
                    if (this.isScrollDown) {
                        scrollEle.scrollTop = scrollEle.scrollTop - rowHeight;
                    }
                    if (this.isScrollUp) {
                        scrollEle.scrollTop = scrollEle.scrollTop + rowHeight;
                    }
                }
            }
        }
        this.isScrollDown = false;
        this.isScrollUp = false;
    };
    /**
     * @param {Row<Column>} row - specifies the row
     * @param {number} index - specifies the index
     * @returns {void}
     * @hidden
     */
    GroupLazyLoadRenderer.prototype.maintainRows = function (row, index) {
        var page = this.parent.pageSettings.currentPage;
        if (!this.rowsByUid[parseInt(page.toString(), 10)]) {
            this.rowsByUid[parseInt(page.toString(), 10)] = {};
            this.objIdxByUid[parseInt(page.toString(), 10)] = {};
        }
        if (row.uid) {
            this.rowsByUid[parseInt(page.toString(), 10)][row.uid] = row;
        }
        this.objIdxByUid[parseInt(page.toString(), 10)][row.uid] = index;
    };
    GroupLazyLoadRenderer.prototype.confirmRowRendering = function (row) {
        var check = true;
        if (isNullOrUndefined(row.indent) && !row.isDataRow && !row.isCaptionRow) {
            var cap = this.getRowByUid(row.parentUid);
            if (cap.isCaptionRow && !cap.isExpand) {
                check = false;
            }
        }
        return check;
    };
    GroupLazyLoadRenderer.prototype.refreshRowObjects = function (newRows, index) {
        var page = this.parent.pageSettings.currentPage;
        var rowsObject = this.groupCache[parseInt(page.toString(), 10)];
        this.rowsByUid[parseInt(page.toString(), 10)] = {};
        this.objIdxByUid[parseInt(page.toString(), 10)] = {};
        var newRowsObject = [];
        var k = 0;
        for (var i = 0; i < rowsObject.length; i++) {
            if (i === index) {
                this.maintainRows(rowsObject[parseInt(i.toString(), 10)], k);
                newRowsObject.push(rowsObject[parseInt(i.toString(), 10)]);
                k++;
                for (var j = 0; j < newRows.length; j++) {
                    this.maintainRows(newRows[parseInt(j.toString(), 10)], k);
                    newRowsObject.push(newRows[parseInt(j.toString(), 10)]);
                    k++;
                }
            }
            else {
                this.maintainRows(rowsObject[parseInt(i.toString(), 10)], k);
                newRowsObject.push(rowsObject[parseInt(i.toString(), 10)]);
                k++;
            }
        }
        this.groupCache[this.parent.pageSettings.currentPage] = extend([], newRowsObject);
        this.updateCurrentViewData();
    };
    GroupLazyLoadRenderer.prototype.getAggregateByCaptionIndex = function (index) {
        var cache = this.groupCache[this.parent.pageSettings.currentPage];
        var parent = cache[parseInt(index.toString(), 10)];
        var indent = parent.indent;
        var uid = parent.uid;
        var agg = [];
        for (var i = index + 1; i < cache.length; i++) {
            if (cache[parseInt(i.toString(), 10)].indent === indent) {
                break;
            }
            if (isNullOrUndefined(cache[parseInt(i.toString(), 10)].indent) && cache[parseInt(i.toString(), 10)].parentUid === uid) {
                agg.push(cache[parseInt(i.toString(), 10)]);
            }
        }
        return agg;
    };
    GroupLazyLoadRenderer.prototype.getChildRowsByParentIndex = function (index, deep, block, data, includeAgg, includeCollapseAgg) {
        var cache = data ? data : this.groupCache[this.parent.pageSettings.currentPage];
        var parentRow = cache[parseInt(index.toString(), 10)];
        var agg = [];
        if (!parentRow.isCaptionRow || (parentRow.isCaptionRow && !parentRow.isExpand && !includeCollapseAgg)) {
            return [];
        }
        if (includeAgg && this.parent.aggregates.length) {
            agg = this.getAggregateByCaptionIndex(index);
        }
        var indent = parentRow.indent;
        var uid = parentRow.uid;
        var rows = [];
        var count = 0;
        for (var i = index + 1; i < cache.length; i++) {
            if (cache[parseInt(i.toString(), 10)].parentUid === uid) {
                if (isNullOrUndefined(cache[parseInt(i.toString(), 10)].indent)) {
                    continue;
                }
                count++;
                rows.push(cache[parseInt(i.toString(), 10)]);
                if (deep && cache[parseInt(i.toString(), 10)].isCaptionRow) {
                    rows = rows.concat(this.getChildRowsByParentIndex(i, deep, block, data, includeAgg));
                }
                if (block && count === this.pageSize) {
                    break;
                }
            }
            if (cache[parseInt(i.toString(), 10)].indent === indent) {
                break;
            }
        }
        return rows.concat(agg);
    };
    /**
     * @param {boolean} isReorder - specifies the isreorder
     * @returns {Row<Column>[]} returns the row
     * @hidden
     */
    GroupLazyLoadRenderer.prototype.initialGroupRows = function (isReorder) {
        var rows = [];
        var cache = this.groupCache[this.parent.pageSettings.currentPage];
        if (isReorder) {
            return this.getRenderedRowsObject();
        }
        for (var i = 0; i < cache.length; i++) {
            if (cache[parseInt(i.toString(), 10)].indent === 0) {
                rows.push(cache[parseInt(i.toString(), 10)]);
                rows = rows.concat(this.getChildRowsByParentIndex(i, true, true, cache, true));
            }
        }
        return rows;
    };
    /**
     * @returns {Row<Column>[]} retruns the row
     * @hidden */
    GroupLazyLoadRenderer.prototype.getRenderedRowsObject = function () {
        var rows = [];
        var trs = [].slice.call(this.parent.getContent().querySelectorAll('tr'));
        for (var i = 0; i < trs.length; i++) {
            rows.push(this.getRowByUid(trs[parseInt(i.toString(), 10)].getAttribute('data-uid')));
        }
        return rows;
    };
    GroupLazyLoadRenderer.prototype.getCacheRowsOnDownScroll = function (index) {
        var rows = [];
        var rowsObject = this.groupCache[this.parent.pageSettings.currentPage];
        var k = index;
        for (var i = 0; i < this.pageSize; i++) {
            if (!rowsObject[parseInt(k.toString(), 10)] || rowsObject[parseInt(k.toString(), 10)]
                .indent < rowsObject[parseInt(index.toString(), 10)].indent) {
                break;
            }
            if (rowsObject[parseInt(k.toString(), 10)].indent === rowsObject[parseInt(index.toString(), 10)].indent) {
                rows.push(rowsObject[parseInt(k.toString(), 10)]);
                if (rowsObject[parseInt(k.toString(), 10)].isCaptionRow && rowsObject[parseInt(k.toString(), 10)].isExpand) {
                    rows = rows.concat(this.getChildRowsByParentIndex(k, true, true, null, true));
                }
            }
            if (rowsObject[parseInt(k.toString(), 10)].indent > rowsObject[parseInt(index.toString(), 10)].indent
                || isNullOrUndefined(rowsObject[parseInt(k.toString(), 10)].indent)) {
                i--;
            }
            k++;
        }
        return rows;
    };
    GroupLazyLoadRenderer.prototype.getCacheRowsOnUpScroll = function (start, end, index) {
        var rows = [];
        var rowsObject = this.groupCache[this.parent.pageSettings.currentPage];
        var str = false;
        for (var i = 0; i < rowsObject.length; i++) {
            if (str && (!rowsObject[parseInt(i.toString(), 10)] || rowsObject[parseInt(i.toString(), 10)]
                .indent < rowsObject[parseInt(index.toString(), 10)].indent || rowsObject[parseInt(i.toString(), 10)].uid === end)) {
                break;
            }
            if (!str && rowsObject[parseInt(i.toString(), 10)].uid === start) {
                str = true;
            }
            if (str && rowsObject[parseInt(i.toString(), 10)].indent === rowsObject[parseInt(index.toString(), 10)].indent) {
                rows.push(rowsObject[parseInt(i.toString(), 10)]);
                if (rowsObject[parseInt(i.toString(), 10)].isCaptionRow && rowsObject[parseInt(i.toString(), 10)].isExpand) {
                    rows = rows.concat(this.getChildRowsByParentIndex(i, true, true, null, true));
                }
            }
        }
        return rows;
    };
    GroupLazyLoadRenderer.prototype.scrollHandler = function (e) {
        if (this.parent.isDestroyed || this.childCount) {
            return;
        }
        var downTrs = [].slice.call(this.parent.getContent().getElementsByClassName('e-lazyload-middle-down'));
        var upTrs = [].slice.call(this.parent.getContent().getElementsByClassName('e-lazyload-middle-up'));
        var endTrs = [].slice.call(this.parent.getContent().getElementsByClassName('e-not-lazyload-end'));
        var tr;
        var lazyLoadDown = false;
        var lazyLoadUp = false;
        var lazyLoadEnd = false;
        if (e.scrollDown && downTrs.length) {
            var result = this.findRowElements(downTrs);
            tr = result.tr;
            lazyLoadDown = result.entered;
        }
        if (!e.scrollDown && endTrs) {
            for (var i = 0; i < endTrs.length; i++) {
                var top_1 = endTrs[parseInt(i.toString(), 10)].getBoundingClientRect().top;
                var scrollHeight = this.parent.getContent().scrollHeight;
                if (top_1 > 0 && top_1 < scrollHeight) {
                    tr = endTrs[parseInt(i.toString(), 10)];
                    lazyLoadEnd = true;
                    this.rowIndex = tr.rowIndex;
                    break;
                }
            }
        }
        if (!e.scrollDown && upTrs.length && !lazyLoadEnd) {
            var result = this.findRowElements(upTrs);
            tr = result.tr;
            lazyLoadUp = result.entered;
        }
        if (tr && !tr.classList.contains('e-masked-row')) {
            if (lazyLoadDown && e.scrollDown && lazyLoadDown && tr) {
                this.scrollDownHandler(tr);
            }
            if (!e.scrollDown && lazyLoadEnd && tr) {
                this.scrollUpEndRowHandler(tr);
            }
            if (this.cacheMode && !e.scrollDown && !lazyLoadEnd && lazyLoadUp && tr) {
                this.scrollUpHandler(tr);
            }
        }
    };
    GroupLazyLoadRenderer.prototype.scrollUpEndRowHandler = function (tr) {
        var page = this.parent.pageSettings.currentPage;
        var rows = this.groupCache[parseInt(page.toString(), 10)];
        var uid = tr.getAttribute('data-uid');
        var index = this.rowObjectIndex = this.getRowObjectIndexByUid(uid);
        var idx = index;
        var childRow = rows[parseInt(index.toString(), 10)];
        var parentCapRow = this.getRowByUid(childRow.parentUid);
        var capRowObjIdx = this.getRowObjectIndexByUid(parentCapRow.uid);
        var captionRowEle = this.parent.getContent().querySelector('tr[data-uid=' + parentCapRow.uid + ']');
        var capRowEleIndex = captionRowEle.rowIndex;
        var child = this.getChildRowsByParentIndex(capRowObjIdx);
        var childIdx = child.indexOf(childRow);
        var currentPage = Math.ceil(childIdx / this.pageSize);
        if (currentPage === 1) {
            return;
        }
        this.childCount = currentPage * this.pageSize;
        index = this.getCurrentBlockEndIndex(childRow, index);
        if (this.childCount < parentCapRow.data.count) {
            tr.classList.remove('e-not-lazyload-end');
            childRow.lazyLoadCssClass = '';
            var isRowExist = rows[index + 1] ? childRow.indent === rows[index + 1].indent : false;
            this.scrollData = isRowExist ? this.getCacheRowsOnDownScroll(index + 1) : [];
            var key = getGroupKeysAndFields(capRowObjIdx, rows);
            var args = {
                rowIndex: capRowEleIndex, makeRequest: !isRowExist, groupInfo: parentCapRow, fields: key.fields,
                keys: key.keys, skip: this.childCount, take: this.pageSize, isScroll: true
            };
            if (this.cacheMode && this.childCount >= (this.pageSize * this.cacheBlockSize)) {
                var child_1 = this.getChildRowsByParentIndex(capRowObjIdx);
                var currenBlock = Math.ceil((child_1.indexOf(rows[parseInt(idx.toString(), 10)]) / this.pageSize));
                var removeBlock = currenBlock - (this.cacheBlockSize - 1);
                this.removeBlock(uid, isRowExist, removeBlock, child_1);
                args.cachedRowIndex = (removeBlock * this.pageSize);
            }
            this.captionRowExpand(args);
        }
        else {
            this.childCount = 0;
        }
    };
    GroupLazyLoadRenderer.prototype.scrollDownHandler = function (tr) {
        var page = this.parent.pageSettings.currentPage;
        var rows = this.groupCache[parseInt(page.toString(), 10)];
        var uid = tr.getAttribute('data-uid');
        var index = this.getRowObjectIndexByUid(uid);
        var idx = index;
        var childRow = rows[parseInt(index.toString(), 10)];
        var parentCapRow = this.getRowByUid(childRow.parentUid);
        var capRowObjIdx = this.getRowObjectIndexByUid(parentCapRow.uid);
        var captionRowEle = this.getRowElementByUid(parentCapRow.uid);
        var capRowEleIndex = captionRowEle.rowIndex;
        var child = this.getChildRowsByParentIndex(capRowObjIdx);
        if (child.length === 0) {
            return;
        }
        var childIdx = child.indexOf(childRow);
        var currentPage = Math.ceil(childIdx / this.pageSize);
        this.childCount = currentPage * this.pageSize;
        if (isNullOrUndefined(child[this.childCount - 1])) {
            return;
        }
        if (this.parent.enableVirtualization) {
            this.parent.islazyloadRequest = true;
        }
        index = this.rowObjectIndex = this.getRowObjectIndexByUid(child[this.childCount - 1].uid);
        var lastchild = rows[parseInt(index.toString(), 10)];
        var lastRow = this.getRowElementByUid(lastchild.uid);
        this.rowIndex = lastRow.rowIndex;
        index = this.getCurrentBlockEndIndex(lastchild, index);
        if (this.childCount === parentCapRow.data.count) {
            this.parent.islazyloadRequest = false;
        }
        if (this.childCount < parentCapRow.data.count) {
            var isRowExist = rows[index + 1] ? childRow.indent === rows[index + 1].indent : false;
            if (isRowExist && !isNullOrUndefined(this.getRowElementByUid(rows[index + 1].uid))) {
                this.parent.islazyloadRequest = false;
                this.childCount = 0;
                return;
            }
            if (currentPage > 1 || !this.cacheMode) {
                tr.classList.remove('e-lazyload-middle-down');
                lastRow.classList.remove('e-not-lazyload-end');
                lastchild.lazyLoadCssClass = '';
            }
            this.scrollData = isRowExist ? this.getCacheRowsOnDownScroll(this.rowObjectIndex + 1) : [];
            var query = getGroupKeysAndFields(capRowObjIdx, rows);
            var args = {
                rowIndex: capRowEleIndex, makeRequest: !isRowExist, groupInfo: parentCapRow, fields: query.fields,
                keys: query.keys, skip: this.childCount, take: this.pageSize, isScroll: true
            };
            if (this.cacheMode && (this.childCount - this.pageSize) >= (this.pageSize * this.cacheBlockSize)) {
                this.isScrollDown = true;
                var child_2 = this.getChildRowsByParentIndex(capRowObjIdx);
                var currenBlock = Math.ceil((child_2.indexOf(rows[parseInt(idx.toString(), 10)]) / this.pageSize)) - 1;
                var removeBlock = (currenBlock - (this.cacheBlockSize - 1)) + 1;
                this.removeBlock(uid, isRowExist, removeBlock, child_2, lastchild);
                args.cachedRowIndex = (removeBlock * this.pageSize);
            }
            this.captionRowExpand(args);
        }
        else {
            this.childCount = 0;
            this.parent.islazyloadRequest = false;
        }
    };
    GroupLazyLoadRenderer.prototype.getCurrentBlockEndIndex = function (row, index) {
        var page = this.parent.pageSettings.currentPage;
        var rows = this.groupCache[parseInt(page.toString(), 10)];
        if (row.isCaptionRow) {
            if (row.isExpand) {
                var childCount = this.getChildRowsByParentIndex(index, true).length;
                this.rowIndex = this.rowIndex + childCount;
            }
            var agg = this.getAggregateByCaptionIndex(index);
            this.rowObjectIndex = this.rowObjectIndex + agg.length;
            var idx = index;
            for (var i = idx + 1; i < rows.length; i++) {
                if (rows[parseInt(i.toString(), 10)].indent === rows[parseInt(index.toString(), 10)].indent
                    || rows[parseInt(i.toString(), 10)].indent < rows[parseInt(index.toString(), 10)].indent) {
                    index = idx;
                    break;
                }
                else {
                    idx++;
                }
            }
        }
        return index;
    };
    GroupLazyLoadRenderer.prototype.removeBlock = function (uid, isRowExist, removeBlock, child, lastchild) {
        var page = this.parent.pageSettings.currentPage;
        var rows = this.groupCache[parseInt(page.toString(), 10)];
        var uid1 = child[(((removeBlock + 1) * this.pageSize) - 1) - this.blockSize].uid;
        var uid2 = child[(removeBlock * this.pageSize) - this.pageSize].uid;
        var uid3 = child[(removeBlock * this.pageSize)].uid;
        var firstIdx = this.getRowObjectIndexByUid(uid1);
        rows[parseInt(firstIdx.toString(), 10)].lazyLoadCssClass = 'e-lazyload-middle-up';
        this.getRowElementByUid(uid1).classList.add('e-lazyload-middle-up');
        if (lastchild) {
            this.getRowElementByUid(uid3).classList.add('e-not-lazyload-first');
            this.getRowByUid(uid3).lazyLoadCssClass = 'e-not-lazyload-first';
            this.getRowByUid(uid2).lazyLoadCssClass = '';
        }
        if (isRowExist) {
            this.removeTopRows(lastchild ? lastchild.uid : uid, uid2, uid3);
        }
        else {
            this.uid1 = uid2;
            this.uid2 = uid3;
            this.uid3 = lastchild ? lastchild.uid : uid;
        }
    };
    GroupLazyLoadRenderer.prototype.scrollUpHandler = function (tr) {
        var page = this.parent.pageSettings.currentPage;
        var rows = this.groupCache[parseInt(page.toString(), 10)];
        var uid = tr.getAttribute('data-uid');
        var row = this.getRowByUid(uid);
        var index = this.rowObjectIndex = this.getRowObjectIndexByUid(uid);
        var parentCapRow = this.getRowByUid(row.parentUid);
        var capRowObjIdx = this.rowIndex = this.getRowObjectIndexByUid(parentCapRow.uid);
        var captionRowEle = this.parent.getRowElementByUID(parentCapRow.uid);
        var capRowEleIndex = captionRowEle.rowIndex;
        var child = this.getChildRowsByParentIndex(capRowObjIdx);
        var childIdx = child.indexOf(rows[parseInt(index.toString(), 10)]);
        var currenBlock = Math.floor((childIdx / this.pageSize));
        var idx = this.blockSize;
        if ((this.blockSize * 2) > this.pageSize) {
            idx = (this.blockSize * 2) - this.pageSize;
            idx = this.blockSize - idx;
        }
        var start = child[(childIdx - (idx - 1)) - this.pageSize].uid;
        var end = child[childIdx - (idx - 1)].uid;
        this.scrollData = this.getCacheRowsOnUpScroll(start, end, index - (idx - 1));
        this.isFirstChildRow = currenBlock > 1;
        if (this.isFirstChildRow) {
            this.scrollData[0].lazyLoadCssClass = 'e-not-lazyload-first';
        }
        this.getRowByUid(end).lazyLoadCssClass = '';
        this.getRowElementByUid(end).classList.remove('e-not-lazyload-first');
        var removeBlock = currenBlock + this.cacheBlockSize;
        if (child.length !== parentCapRow.data.count && (removeBlock * this.pageSize > child.length)) {
            this.isFirstChildRow = false;
            this.scrollData[0].lazyLoadCssClass = '';
            this.getRowElementByUid(end).classList.add('e-not-lazyload-first');
            return;
        }
        var count = removeBlock * this.pageSize > parentCapRow.data.count
            ? parentCapRow.data.count : removeBlock * this.pageSize;
        var size = removeBlock * this.pageSize > parentCapRow.data.count
            ? (this.pageSize - ((this.pageSize * removeBlock) - parentCapRow.data.count)) : this.pageSize;
        var childRows = this.getChildRowsByParentIndex(rows.indexOf(child[count - 1]), true, false, null, true);
        var uid1 = childRows.length ? childRows[childRows.length - 1].uid : child[(count - 1)].uid;
        var uid2 = child[count - size].uid;
        var uid3 = child[(count - size) - 1].uid;
        var lastIdx = this.objIdxByUid[parseInt(page.toString(), 10)]["" + uid2] - idx;
        if (rows[parseInt(lastIdx.toString(), 10)].lazyLoadCssClass === 'e-lazyload-middle-down') {
            var trEle = this.getRowElementByUid(rows[parseInt(lastIdx.toString(), 10)].uid);
            if (trEle) {
                trEle.classList.add('e-lazyload-middle-down');
            }
        }
        this.getRowByUid(uid1).lazyLoadCssClass = '';
        this.getRowByUid(uid3).lazyLoadCssClass = 'e-not-lazyload-end';
        this.getRowElementByUid(uid3).classList.add('e-not-lazyload-end');
        this.removeBottomRows(uid1, uid2, uid3);
        this.rowIndex = tr.rowIndex - idx;
        if (tr.classList.length > 1) {
            tr.classList.remove('e-lazyload-middle-up');
        }
        else {
            tr.removeAttribute('class');
        }
        if (!isNullOrUndefined(this.getRowElementByUid(start))) {
            this.childCount = 0;
            this.scrollData = [];
            return;
        }
        var key = getGroupKeysAndFields(this.getRowObjectIndexByUid(parentCapRow.uid), rows);
        var args = {
            rowIndex: capRowEleIndex, makeRequest: false, groupInfo: parentCapRow, fields: key.fields,
            keys: key.keys, skip: this.childCount, take: this.pageSize, isScroll: true, scrollUp: true
        };
        this.isScrollUp = true;
        this.captionRowExpand(args);
    };
    GroupLazyLoadRenderer.prototype.findRowElements = function (rows) {
        var entered = false;
        var tr;
        for (var i = 0; i < rows.length; i++) {
            var rowIdx = rows[parseInt(i.toString(), 10)].rowIndex;
            if (this.parent.enableVirtualization) {
                var currentInfo = this.parent.contentModule.currentInfo;
                if (currentInfo && currentInfo.blockIndexes && currentInfo.blockIndexes[0] > 1) {
                    rowIdx = rowIdx + (this.parent.contentModule.offsets[currentInfo.blockIndexes[0] - 1] /
                        this.parent.getRowHeight());
                }
            }
            if (isRowEnteredInGrid(rowIdx, this.parent)) {
                entered = true;
                this.rowIndex = rowIdx;
                tr = rows[parseInt(i.toString(), 10)];
                break;
            }
        }
        return { entered: entered, tr: tr };
    };
    GroupLazyLoadRenderer.prototype.getRowElementByUid = function (uid) {
        return this.parent.getContent().querySelector('tr[data-uid=' + uid + ']');
    };
    GroupLazyLoadRenderer.prototype.removeTopRows = function (uid1, uid2, uid3) {
        var trs = [].slice.call(this.parent.getContent().querySelectorAll('tr'));
        var start = false;
        for (var i = 0; i < trs.length; i++) {
            if (trs[parseInt(i.toString(), 10)].getAttribute('data-uid') === uid3) {
                var tr = this.parent.getContent().querySelector('tr[data-uid=' + uid1 + ']');
                if (tr) {
                    this.rowIndex = tr.rowIndex;
                }
                break;
            }
            if (trs[parseInt(i.toString(), 10)].getAttribute('data-uid') === uid2) {
                start = true;
            }
            if (start) {
                remove(trs[parseInt(i.toString(), 10)]);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GroupLazyLoadRenderer.prototype.removeBottomRows = function (uid1, uid2, uid3) {
        var trs = [].slice.call(this.parent.getContent().querySelectorAll('tr'));
        var trigger = false;
        for (var i = 0; i < trs.length; i++) {
            if (trs[parseInt(i.toString(), 10)].getAttribute('data-uid') === uid2) {
                trigger = true;
            }
            if (trigger) {
                remove(trs[parseInt(i.toString(), 10)]);
                if (trs[parseInt(i.toString(), 10)].getAttribute('data-uid') === uid1) {
                    break;
                }
            }
        }
    };
    GroupLazyLoadRenderer.prototype.setCache = function (e) {
        var page = this.parent.pageSettings.currentPage;
        if (this.parent.enableVirtualization) {
            this.parent.lazyLoadRender = this;
        }
        if (this.parent.enableInfiniteScrolling && e.args.requestType === 'infiniteScroll' &&
            e.args['prevPage'] !== e.args['currentPage']) {
            this.groupCache[parseInt(page.toString(), 10)] = this.initialGroupCaptions[parseInt(page.toString(), 10)] = this.groupCache[e.args['prevPage']]
                .concat(extend([], e.data));
            var groupCacheKeys = Object.keys(this.groupCache);
            for (var i = 0; i < groupCacheKeys.length; i++) {
                if (e.args['currentPage'] !== parseInt(groupCacheKeys[parseInt(i.toString(), 10)], 10)) {
                    delete this.groupCache["" + groupCacheKeys[parseInt(i.toString(), 10)]];
                    delete this.initialGroupCaptions["" + groupCacheKeys[parseInt(i.toString(), 10)]];
                }
            }
        }
        else {
            this.groupCache[parseInt(page.toString(), 10)] =
                this.initialGroupCaptions[parseInt(page.toString(), 10)] = extend([], e.data);
        }
    };
    GroupLazyLoadRenderer.prototype.captionRowExpand = function (args) {
        var _this = this;
        var captionRow = args.groupInfo;
        var level = this.parent.groupSettings.columns.indexOf(captionRow.data.field) + 1;
        var pred = generateExpandPredicates(args.fields, args.keys, this);
        var predicateList = getPredicates(pred);
        var lazyLoad = { level: level, skip: args.skip, take: args.take, where: predicateList };
        args.lazyLoadQuery = lazyLoad;
        args.requestType = 'onDemandGroupInfo';
        if (args.makeRequest) {
            var query = this.parent.renderModule.data.generateQuery(true);
            if (!query.isCountRequired) {
                query.isCountRequired = true;
            }
            query.lazyLoad.push({ key: 'onDemandGroupInfo', value: lazyLoad });
            this.lazyLoadQuery.push(lazyLoad['where']);
            if (args.isScroll && this.parent.enableVirtualMaskRow) {
                this.parent.showMaskRow();
            }
            else {
                this.parent.showSpinner();
            }
            this.parent.renderModule.data.getData(args, query).then(function (e) {
                if (_this.parent.enableVirtualization) {
                    _this.parent.islazyloadRequest = true;
                }
                _this.parent.hideSpinner();
                _this.parent.removeMaskRow();
                if (e.result.length === 0) {
                    return;
                }
                if (_this.cacheMode && _this.uid1 && _this.uid2) {
                    _this.removeTopRows(_this.uid3, _this.uid1, _this.uid2);
                    _this.uid1 = _this.uid2 = _this.uid3 = undefined;
                }
                _this.lazyLoadHandler({
                    data: e.result, count: e.count, level: level, index: args.rowIndex,
                    isRowExist: false, isScroll: args.isScroll, up: false, rowIndex: args.cachedRowIndex
                });
            })
                .catch(function (e) { return _this.parent.renderModule.dataManagerFailure(e, { requestType: 'grouping' }); });
        }
        else {
            this.lazyLoadHandler({
                data: null, count: args.groupInfo.data.count, level: level, index: args.rowIndex,
                isRowExist: true, isScroll: args.isScroll, up: args.scrollUp, rowIndex: args.cachedRowIndex
            });
        }
    };
    GroupLazyLoadRenderer.prototype.scrollReset = function (top) {
        this.parent.getContent().firstElementChild.scrollTop = top ? this.parent.getContent().firstElementChild.scrollTop + top : 0;
    };
    GroupLazyLoadRenderer.prototype.updateCurrentViewData = function () {
        var records = [];
        this.getRows().filter(function (row) {
            if (row.isDataRow) {
                records[row.index] = row.data;
            }
        });
        this.parent.currentViewData = records.length ? records : this.parent.currentViewData;
    };
    /**
     * @returns {Row<Column>[]} returns the row
     * @hidden */
    GroupLazyLoadRenderer.prototype.getGroupCache = function () {
        return this.groupCache;
    };
    /**
     * @returns {Row<Column>[]} returns the row
     * @hidden */
    GroupLazyLoadRenderer.prototype.getRows = function () {
        return this.groupCache[this.parent.pageSettings.currentPage] || [];
    };
    /**
     * @returns {Element} returns the element
     * @hidden */
    GroupLazyLoadRenderer.prototype.getRowElements = function () {
        return [].slice.call(this.parent.getContent().getElementsByClassName(literals.row));
    };
    /**
     * @param {number} index - specifies the index
     * @returns {Element} returns the element
     * @hidden
     */
    GroupLazyLoadRenderer.prototype.getRowByIndex = function (index) {
        var tr = [].slice.call(this.parent.getContent().getElementsByClassName(literals.row));
        var row;
        for (var i = 0; !isNullOrUndefined(index) && i < tr.length; i++) {
            if (parseInt(tr[parseInt(i.toString(), 10)].getAttribute(literals.ariaRowIndex).toString(), 10) - 1 === index) {
                row = tr[parseInt(i.toString(), 10)];
                break;
            }
        }
        return row;
    };
    /**
     * Tucntion to set the column visibility
     *
     * @param {Column[]} columns - specifies the column
     * @returns {void}
     * @hidden
     */
    GroupLazyLoadRenderer.prototype.setVisible = function (columns) {
        var gObj = this.parent;
        var rows = this.getRows();
        var testRow;
        rows.some(function (r) { if (r.isDataRow) {
            testRow = r;
        } return r.isDataRow; });
        var contentrows = this.getRows().filter(function (row) { return !row.isDetailRow; });
        for (var i = 0; i < columns.length; i++) {
            var column = columns[parseInt(i.toString(), 10)];
            var idx = this.parent.getNormalizedColumnIndex(column.uid);
            var colIdx = this.parent.getColumnIndexByUid(column.uid);
            var displayVal = column.visible === true ? '' : 'none';
            if (idx !== -1 && testRow && idx < testRow.cells.length) {
                setStyleAttribute(this.getColGroup().childNodes[parseInt(idx.toString(), 10)], { 'display': displayVal });
            }
            this.setDisplayNone(gObj.getDataRows(), colIdx, displayVal, contentrows, idx);
            if (!this.parent.invokedFromMedia && column.hideAtMedia) {
                this.parent.updateMediaColumns(column);
            }
            this.parent.invokedFromMedia = false;
        }
    };
    /**
     * Function to set display.
     *
     * @param {Object} tr - specifies the row object
     * @param {number} idx - specifies the index
     * @param {string} displayVal - specifies the display value
     * @param {Row<Column>[]} rows - specifies the array of rows
     * @param {number} oriIdx - specifies the index
     * @returns {void}
     * @hidden
     */
    GroupLazyLoadRenderer.prototype.setDisplayNone = function (tr, idx, displayVal, rows, oriIdx) {
        if (!this.parent.groupSettings.columns.length) {
            setDisplayValue(tr, idx, displayVal, rows);
        }
        else {
            var keys = Object.keys(this.groupCache);
            for (var j = 0; j < keys.length; j++) {
                var uids = this.rowsByUid[keys[parseInt(j.toString(), 10)]];
                var idxs = Object.keys(uids);
                for (var i = 0; i < idxs.length; i++) {
                    var tr_1 = this.parent.getContent()
                        .querySelector('tr[data-uid=' + idxs[parseInt(i.toString(), 10)] + ']');
                    var row = uids[idxs[parseInt(i.toString(), 10)]];
                    if (row.isCaptionRow) {
                        if (!this.captionModelGen.isEmpty()) {
                            this.changeCaptionRow(row, tr_1, keys[parseInt(j.toString(), 10)]);
                        }
                        else {
                            row.cells[row.indent + 1].colSpan = displayVal === '' ? row.cells[row.indent + 1].colSpan + 1
                                : row.cells[row.indent + 1].colSpan - 1;
                            if (tr_1) {
                                tr_1.cells[row.indent + 1].colSpan = row.cells[row.indent + 1].colSpan;
                            }
                        }
                    }
                    if (row.isDataRow) {
                        this.showAndHideCells(tr_1, idx, displayVal, false);
                        row.cells[parseInt(oriIdx.toString(), 10)].visible = displayVal === '' ? true : false;
                    }
                    if (!row.isCaptionRow && !row.isDataRow && isNullOrUndefined(row.indent)) {
                        row.cells[parseInt(oriIdx.toString(), 10)].visible = displayVal === '' ? true : false;
                        row.visible = row.cells.some(function (cell) { return cell.isDataCell && cell.visible; });
                        this.showAndHideCells(tr_1, idx, displayVal, true, row);
                    }
                }
            }
        }
    };
    GroupLazyLoadRenderer.prototype.changeCaptionRow = function (row, tr, index) {
        var capRow = row;
        var captionData = row.data;
        var data = this.groupGenerator.generateCaptionRow(captionData, capRow.indent, capRow.parentGid, undefined, capRow.tIndex, capRow.parentUid);
        data.uid = row.uid;
        data.isExpand = row.isExpand;
        data.lazyLoadCssClass = row.lazyLoadCssClass;
        this.rowsByUid[parseInt(index.toString(), 10)][row.uid] = data;
        this.groupCache[parseInt(index.toString(), 10)][this.objIdxByUid[parseInt(index.toString(), 10)][row.uid]] = data;
        if (tr) {
            var tbody = this.parent.getContentTable().querySelector(literals.tbody);
            tbody.replaceChild(this.rowRenderer.render(data, this.parent.getColumns()), tr);
        }
    };
    GroupLazyLoadRenderer.prototype.showAndHideCells = function (tr, idx, displayVal, isSummary, row) {
        if (tr) {
            var cls = isSummary ? 'td.e-summarycell' : 'td.e-rowcell';
            setStyleAttribute(tr.querySelectorAll(cls)[parseInt(idx.toString(), 10)], { 'display': displayVal });
            if (tr.querySelectorAll(cls)[parseInt(idx.toString(), 10)].classList.contains('e-hide')) {
                removeClass([tr.querySelectorAll(cls)[parseInt(idx.toString(), 10)]], ['e-hide']);
            }
            if (isSummary) {
                if (row.visible && tr.classList.contains('e-hide')) {
                    removeClass([tr], ['e-hide']);
                }
                else if (!row.visible) {
                    addClass([tr], ['e-hide']);
                }
            }
        }
    };
    return GroupLazyLoadRenderer;
}(ContentRender));
export { GroupLazyLoadRenderer };
