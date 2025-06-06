import { Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getRowIndexFromElement, isGroupAdaptive, checkIsVirtual, getVisiblePage } from '../base/util';
import { RowModelGenerator } from '../services/row-model-generator';
import { GroupModelGenerator } from '../services/group-model-generator';
import * as events from '../base/constant';
import * as literals from '../base/string-literals';
/**
 * Content module is used to render grid content
 */
var VirtualRowModelGenerator = /** @class */ (function () {
    function VirtualRowModelGenerator(parent) {
        this.cOffsets = {};
        this.cache = {};
        this.rowCache = {};
        this.data = {};
        this.groups = {};
        this.currentInfo = {};
        this.prevInfo = {};
        this.parent = parent;
        this.model = this.parent.pageSettings;
        this.rowModelGenerator = this.parent.allowGrouping ? new GroupModelGenerator(this.parent) : new RowModelGenerator(this.parent);
    }
    VirtualRowModelGenerator.prototype.columnInfiniteRows = function (data, e) {
        var result = [];
        if (e.requestType === 'virtualscroll') {
            var rows = this.parent.getRowsObject();
            // eslint-disable-next-line prefer-spread
            result.push.apply(result, this.rowModelGenerator.refreshRows(rows));
            if (this.parent.infiniteScrollSettings.enableCache) {
                var currentRowStartIndex = this.parent.frozenRows && this.parent.pageSettings.currentPage === 1 ? 0
                    : getRowIndexFromElement(this.parent.getContentTable().querySelector('.e-row:not(.e-addedrow)'));
                var newResult = result
                    .slice(currentRowStartIndex, currentRowStartIndex + (this.parent.pageSettings.pageSize * 3));
                if (this.parent.frozenRows && this.parent.pageSettings.currentPage !== 1) {
                    newResult = result.slice(0, this.parent.frozenRows).concat(newResult);
                }
                result = newResult;
            }
        }
        else {
            // eslint-disable-next-line prefer-spread
            result.push.apply(result, this.rowModelGenerator.generateRows(data, e));
        }
        return result;
    };
    VirtualRowModelGenerator.prototype.generateRows = function (data, e) {
        var _this = this;
        if (this.parent.enableColumnVirtualization && this.parent.enableInfiniteScrolling) {
            return this.columnInfiniteRows(data, e);
        }
        var isManualRefresh = false;
        var info = e.virtualInfo = e.virtualInfo
            || ((e.requestType === 'sorting' || e.requestType === 'delete') && checkIsVirtual(this.parent) && this.prevInfo)
            || this.getData();
        this.prevInfo = info;
        var xAxis = info.sentinelInfo && info.sentinelInfo.axis === 'X';
        var page = !xAxis && info.loadNext && !info.loadSelf ? info.nextInfo.page : info.page;
        var result = [];
        var indexes = this.getBlockIndexes(page);
        var loadedBlocks = [];
        if (this.currentInfo.blockIndexes) {
            indexes = info.blockIndexes = e.virtualInfo.blockIndexes = this.includePrevPage ? this.currentInfo.blockIndexes.slice(1)
                : this.currentInfo.blockIndexes.slice(0, this.currentInfo.blockIndexes.length - 1);
            isManualRefresh = true;
        }
        this.checkAndResetCache(e.requestType);
        if (isGroupAdaptive(this.parent) && this.parent.vcRows.length) {
            var dataRows = this.parent.vcRows.filter(function (row) { return row.isDataRow; });
            if ((this.parent.isManualRefresh && dataRows.length === data['records'].length) || !this.parent.isManualRefresh) {
                return result = this.parent.vcRows;
            }
        }
        if (this.parent.enableColumnVirtualization) {
            for (var i = 0; i < info.blockIndexes.length; i++) {
                if (this.isBlockAvailable(info.blockIndexes[parseInt(i.toString(), 10)])) {
                    this.cache[info.blockIndexes[parseInt(i.toString(), 10)]] =
                        this.rowModelGenerator.refreshRows(this.cache[info.blockIndexes[parseInt(i.toString(), 10)]]);
                }
            }
        }
        var values = info.blockIndexes;
        var _loop_1 = function (i) {
            if (!this_1.isBlockAvailable(values[parseInt(i.toString(), 10)])) {
                var startIdx = !isNullOrUndefined(this_1.startIndex) ? this_1.startIndex :
                    this_1.getStartIndex(values[parseInt(i.toString(), 10)], data);
                startIdx = isGroupAdaptive(this_1.parent) && !this_1.parent.vcRows.length && (e.requestType === 'sorting'
                    || e.requestType === 'delete') ? 0 : startIdx;
                var rows = this_1.rowModelGenerator.generateRows(data, {
                    virtualInfo: info, startIndex: startIdx
                });
                if (isGroupAdaptive(this_1.parent) && !this_1.parent.vcRows.length) {
                    this_1.recordsCount = data.records.length;
                    this_1.parent.vRows = rows;
                    this_1.parent.vcRows = rows;
                    this_1.parent.notify(events.refreshVirtualMaxPage, {});
                }
                var median = void 0;
                if (isGroupAdaptive(this_1.parent)) {
                    this_1.getGroupVirtualRecordsByIndex(rows);
                }
                else {
                    if (isManualRefresh) {
                        this_1.setBlockForManualRefresh(this_1.cache, indexes, rows);
                    }
                    else if ((e.requestType === 'sorting' || e.requestType === 'delete') && checkIsVirtual(this_1.parent)) {
                        var visiblePage = getVisiblePage(info.blockIndexes);
                        var prevEndIndex = 0;
                        for (var i_1 = 0; i_1 < visiblePage.length; i_1++) {
                            var indexes_1 = this_1.getBlockIndexes(visiblePage[parseInt(i_1.toString(), 10)]);
                            var startIndex = this_1.model.pageSize * i_1;
                            var endIndex = startIndex + this_1.model.pageSize;
                            if (this_1.parent.allowGrouping && this_1.parent.groupSettings.columns.length) {
                                var dataRowObject = rows.filter(function (row) { return row.isDataRow; })
                                    .slice(startIndex, endIndex);
                                startIndex = prevEndIndex;
                                endIndex = rows.indexOf(dataRowObject[dataRowObject.length - 1]) + 1;
                            }
                            var pageRecord = rows.slice(startIndex, endIndex);
                            var median_1 = ~~Math.max(pageRecord.length, this_1.model.pageSize) / 2;
                            if (!this_1.isBlockAvailable(indexes_1[0])) {
                                this_1.cache[indexes_1[0]] = pageRecord.slice(0, median_1);
                            }
                            if (!this_1.isBlockAvailable(indexes_1[1])) {
                                this_1.cache[indexes_1[1]] = pageRecord.slice(median_1);
                            }
                            prevEndIndex = endIndex;
                        }
                    }
                    else {
                        median = ~~Math.max(rows.length, this_1.model.pageSize) / 2;
                        if (!this_1.isBlockAvailable(indexes[0])) {
                            this_1.cache[indexes[0]] = rows.slice(0, median);
                        }
                        if (!this_1.isBlockAvailable(indexes[1])) {
                            this_1.cache[indexes[1]] = rows.slice(median);
                        }
                    }
                }
            }
            if (this_1.parent.groupSettings.columns.length && !xAxis && this_1.cache[values[parseInt(i.toString(), 10)]] &&
                !this_1.parent.groupSettings.enableLazyLoading) {
                this_1.cache[values[parseInt(i.toString(), 10)]] =
                    this_1.updateGroupRow(this_1.cache[values[parseInt(i.toString(), 10)]], values[parseInt(i.toString(), 10)]);
            }
            if (!e.renderMovableContent && !e.renderFrozenRightContent && this_1.cache[values[parseInt(i.toString(), 10)]]) {
                // eslint-disable-next-line prefer-spread
                result.push.apply(result, this_1.cache[values[parseInt(i.toString(), 10)]]);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var DataRecord_1 = [];
                if (this_1.parent.enableVirtualization && this_1.parent.groupSettings.columns.length) {
                    result.forEach(function (data) {
                        if (!DataRecord_1.includes(data)) {
                            DataRecord_1.push(data);
                        }
                    });
                }
                result = DataRecord_1.length ? DataRecord_1 : result;
            }
            if (this_1.isBlockAvailable(values[parseInt(i.toString(), 10)])) {
                loadedBlocks.push(values[parseInt(i.toString(), 10)]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < values.length; i++) {
            _loop_1(i);
        }
        if (isGroupAdaptive(this.parent) && this.parent.vcRows.length && e.requestType === 'sorting'
            && e.scrollTop.top !== 0) {
            return result = this.parent.vcRows;
        }
        info.blockIndexes = loadedBlocks;
        var grouping = 'records';
        if (this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
            this.parent.currentViewData["" + grouping] = result.map(function (m) { return m.data; });
        }
        else {
            this.parent.currentViewData = result.map(function (m) { return m.data; });
        }
        if (e.requestType === 'grouping') {
            this.parent.currentViewData["" + grouping] = this.parent.currentViewData["" + grouping].filter(function (item, index) {
                return _this.parent.currentViewData["" + grouping].indexOf(item) === index;
            });
        }
        if (isGroupAdaptive(this.parent) && this.parent.vcRows.length) {
            if (['save', 'delete'].some(function (value) { return e.requestType === value; })) {
                return result = this.parent.vcRows;
            }
        }
        return result;
    };
    VirtualRowModelGenerator.prototype.setBlockForManualRefresh = function (cache, blocks, rows) {
        var size = this.model.pageSize / 2;
        if (this.includePrevPage) {
            cache[blocks[0] - 1] = rows.slice(0, size);
            cache[blocks[0]] = rows.slice(size, size * 2);
            cache[blocks[1]] = rows.slice(size * 2, size * 3);
            cache[blocks[2]] = rows.slice(size * 3, size * 4);
        }
        else {
            cache[blocks[0]] = rows.slice(0, size);
            cache[blocks[1]] = rows.slice(size, size * 2);
            cache[blocks[2]] = rows.slice(size * 2, size * 3);
            cache[blocks[2] + 1] = rows.slice(size * 3, size * 4);
        }
    };
    VirtualRowModelGenerator.prototype.getBlockIndexes = function (page) {
        return [page + (page - 1), page * 2];
    };
    VirtualRowModelGenerator.prototype.getPage = function (block) {
        return block % 2 === 0 ? block / 2 : (block + 1) / 2;
    };
    VirtualRowModelGenerator.prototype.isBlockAvailable = function (value) {
        return value in this.cache;
    };
    VirtualRowModelGenerator.prototype.getData = function () {
        return {
            page: this.model.currentPage,
            blockIndexes: this.getBlockIndexes(this.model.currentPage),
            direction: 'down',
            columnIndexes: this.parent.getColumnIndexesInView()
        };
    };
    VirtualRowModelGenerator.prototype.getStartIndex = function (blk, data, full) {
        if (full === void 0) { full = true; }
        var page = this.getPage(blk);
        var even = blk % 2 === 0;
        var index = (page - 1) * this.model.pageSize;
        return full || !even ? index : index + ~~(this.model.pageSize / 2);
    };
    VirtualRowModelGenerator.prototype.getColumnIndexes = function (content) {
        var _this = this;
        if (content === void 0) { content = this.parent.getHeaderContent().querySelector('.' + literals.headerContent); }
        var indexes = [];
        var sLeft = content.scrollLeft | 0;
        var keys = Object.keys(this.cOffsets);
        var cWidth = content.getBoundingClientRect().width;
        sLeft = Math.min(this.cOffsets[keys.length - 1] - cWidth, sLeft);
        var calWidth = Browser.isDevice ? 2 * cWidth : cWidth / 2;
        var left = sLeft + cWidth + (sLeft === 0 ? calWidth : 0);
        var frzLeftWidth = 0;
        var diffWidth = sLeft - calWidth;
        if (this.parent.isFrozenGrid()) {
            frzLeftWidth = this.parent.leftrightColumnWidth('left');
            if (diffWidth > 0) {
                for (var i = this.parent.getVisibleFrozenLeftCount() - 1; i >= 0; i--) {
                    if (diffWidth <= this.cOffsets[parseInt(i.toString(), 10)]) {
                        frzLeftWidth = frzLeftWidth - this.cOffsets[parseInt(i.toString(), 10)];
                        break;
                    }
                }
            }
            if (this.parent.getFrozenMode() === literals.leftRight) {
                var rightCol = this.parent.getVisibleFrozenRightCount();
                keys.splice((keys.length - 1) - rightCol, rightCol);
            }
        }
        var frozenLeftCount = this.parent.getVisibleFrozenLeftCount();
        keys.some(function (offset) {
            var iOffset = Number(offset);
            var offsetVal = _this.cOffsets["" + offset];
            var border = (diffWidth < 0 && iOffset < frozenLeftCount) || ((diffWidth + frzLeftWidth) <= offsetVal &&
                (left + calWidth) >= offsetVal);
            if (border) {
                indexes.push(iOffset);
            }
            return left + calWidth < offsetVal;
        });
        return indexes;
    };
    VirtualRowModelGenerator.prototype.checkAndResetCache = function (action) {
        var actions = ['paging', 'refresh', 'sorting', 'filtering', 'searching', 'grouping', 'ungrouping', 'reorder',
            'save', 'delete'];
        var clear = actions.some(function (value) { return action === value; });
        if (clear) {
            this.cache = {};
            this.data = {};
            this.groups = {};
        }
        return clear;
    };
    VirtualRowModelGenerator.prototype.refreshColOffsets = function () {
        var _this = this;
        var col = 0;
        this.cOffsets = {};
        var gLen = this.parent.groupSettings.columns.length;
        var cols = this.parent.getVisibleColumns();
        var cLen = cols.length;
        var isVisible = function (column) { return column.visible &&
            (!_this.parent.groupSettings.showGroupedColumn ? _this.parent.groupSettings.columns.indexOf(column.field) < 0 : column.visible); };
        var c = this.parent.groupSettings.columns;
        for (var i = 0; i < c.length; i++) {
            this.cOffsets[parseInt(i.toString(), 10)] = (this.cOffsets[i - 1] | 0) + 30;
        }
        // eslint-disable-next-line prefer-spread
        var blocks = Array.apply(null, Array(cLen)).map(function () { return col++; });
        for (var j = 0; j < blocks.length; j++) {
            blocks[parseInt(j.toString(), 10)] = blocks[parseInt(j.toString(), 10)] + gLen;
            this.cOffsets[blocks[parseInt(j.toString(), 10)]] =
                (this.cOffsets[blocks[parseInt(j.toString(), 10)] - 1] | 0) + (isVisible(cols[parseInt(j.toString(), 10)]) ?
                    parseInt(cols[parseInt(j.toString(), 10)].width, 10) : 0);
        }
    };
    VirtualRowModelGenerator.prototype.updateGroupRow = function (current, block) {
        var currentFirst = current[0];
        var rows = [];
        var keys = Object.keys(this.cache);
        for (var i = 0; i < keys.length; i++) {
            if (Number(keys[parseInt(i.toString(), 10)]) < block) {
                rows = rows.concat(this.cache[keys[parseInt(i.toString(), 10)]]);
            }
        }
        if ((currentFirst && currentFirst.isDataRow) || block % 2 === 0) {
            return current;
        }
        return this.iterateGroup(current, rows);
    };
    VirtualRowModelGenerator.prototype.iterateGroup = function (current, rows) {
        var currentFirst = current[0];
        var offset = 0;
        if (currentFirst && currentFirst.isDataRow) {
            return current;
        }
        var isPresent = current.some(function (row) {
            return rows.some(function (oRow, index) {
                var res = oRow && oRow.data.field !== undefined
                    && oRow.data.field === row.data.field &&
                    oRow.data.key === row.data.key;
                if (res) {
                    offset = index;
                }
                return res;
            });
        });
        if (isPresent) {
            current.shift();
            current = this.iterateGroup(current, rows.slice(offset));
        }
        return current;
    };
    VirtualRowModelGenerator.prototype.getRows = function () {
        var rows = [];
        var keys = Object.keys(this.cache);
        for (var i = 0; i < keys.length; i++) {
            rows = rows.concat(this.cache[keys[parseInt(i.toString(), 10)]]);
        }
        return rows;
    };
    VirtualRowModelGenerator.prototype.generateCells = function (foreignKeyData) {
        var cells = [];
        var cols = this.parent.columnModel;
        for (var i = 0; i < cols.length; i++) {
            cells.push(this.rowModelGenerator.generateCell(cols[parseInt(i.toString(), 10)], null, null, null, null, foreignKeyData));
        }
        return cells;
    };
    VirtualRowModelGenerator.prototype.getGroupVirtualRecordsByIndex = function (rows) {
        var blocks = this.parent.contentModule.getGroupedTotalBlocks();
        var blockSize = this.parent.contentModule.getBlockSize();
        for (var i = 1; i <= blocks; i++) {
            var count = 0;
            this.cache[parseInt(i.toString(), 10)] = [];
            for (var j = ((i - 1) * blockSize); j < rows.length; j++) {
                if (count === blockSize) {
                    break;
                }
                this.cache[parseInt(i.toString(), 10)].push(rows[parseInt(j.toString(), 10)]);
                if (rows[parseInt(j.toString(), 10)].isDataRow) {
                    count++;
                }
            }
        }
    };
    return VirtualRowModelGenerator;
}());
export { VirtualRowModelGenerator };
