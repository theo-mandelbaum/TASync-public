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
import { remove, createElement, closest, formatUnit, Browser, extend } from '@syncfusion/ej2-base';
import { isNullOrUndefined, removeClass } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { dataReady, modelChanged, refreshVirtualBlock, contentReady } from '../base/constant';
import * as events from '../base/constant';
import { RenderType } from '../base/enum';
import { ContentRender } from './content-renderer';
import { HeaderRender } from './header-renderer';
import { InterSectionObserver } from '../services/intersection-observer';
import { VirtualRowModelGenerator } from '../services/virtual-row-model-generator';
import { isGroupAdaptive, ensureLastRow, ensureFirstRow, getEditedDataIndex, getTransformValues, checkIsVirtual, getVisiblePage, parentsUntil } from '../base/util';
import { setStyleAttribute } from '@syncfusion/ej2-base';
import * as literals from '../base/string-literals';
/**
 * VirtualContentRenderer
 *
 * @hidden
 */
var VirtualContentRenderer = /** @class */ (function (_super) {
    __extends(VirtualContentRenderer, _super);
    function VirtualContentRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.prevHeight = 0;
        /** @hidden */
        _this.startIndex = 0;
        _this.preStartIndex = 0;
        _this.preventEvent = false;
        _this.actions = ['filtering', 'searching', 'grouping', 'ungrouping'];
        /** @hidden */
        _this.offsets = {};
        _this.tmpOffsets = {};
        /** @hidden */
        _this.virtualEle = new VirtualElementHandler();
        _this.offsetKeys = [];
        _this.isFocused = false;
        _this.isSelection = false;
        _this.isBottom = false;
        _this.isBottomNotify = false;
        _this.diff = 0;
        _this.heightChange = false;
        /** @hidden */
        _this.isTop = false;
        _this.empty = undefined;
        _this.isCancel = false;
        _this.requestTypes = ['beginEdit', 'cancel', 'delete', 'add', 'save', 'sorting'];
        _this.isNormaledit = _this.parent.editSettings.mode === 'Normal';
        /** @hidden */
        _this.virtualData = {};
        _this.virtualInfiniteData = {};
        _this.emptyRowData = {};
        _this.isContextMenuOpen = false;
        _this.isSelectionScroll = false;
        _this.validationCheck = false;
        /** @hidden */
        _this.firstCellFocus = false;
        _this.prevPage = 0;
        _this.prevCurrentInfo = {};
        _this.locator = locator;
        _this.eventListener('on');
        _this.widthServices = locator.getService('widthService');
        _this.parent.on(events.columnVisibilityChanged, _this.setVisible, _this);
        _this.vgenerator = _this.generator;
        return _this;
    }
    VirtualContentRenderer.prototype.renderTable = function () {
        this.header = this.locator.getService('rendererFactory').getRenderer(RenderType.Header);
        _super.prototype.renderTable.call(this);
        this.virtualEle.table = this.getTable();
        this.virtualEle.content = this.content = this.getPanel().querySelector('.' + literals.content);
        this.virtualEle.renderWrapper(this.parent.height);
        this.virtualEle.renderPlaceHolder();
        if (!(!this.parent.enableVirtualization && this.parent.enableColumnVirtualization)) {
            this.virtualEle.wrapper.style.position = 'absolute';
        }
        var debounceEvent = (this.parent.dataSource instanceof DataManager && !this.parent.dataSource.dataSource.offline);
        var opt = {
            container: this.content, pageHeight: this.getBlockHeight() * 2, debounceEvent: debounceEvent,
            axes: this.parent.enableColumnVirtualization ? ['X', 'Y'] : ['Y']
        };
        this.observer = new InterSectionObserver(this.virtualEle.wrapper, opt);
    };
    VirtualContentRenderer.prototype.renderEmpty = function (tbody) {
        this.getTable().appendChild(tbody);
        if (this.parent.frozenRows) {
            this.parent.getHeaderContent().querySelector(literals.tbody).innerHTML = '';
        }
        this.virtualEle.adjustTable(0, 0);
    };
    VirtualContentRenderer.prototype.getReorderedFrozenRows = function (args) {
        var blockIndex = args.virtualInfo.blockIndexes;
        var colsIndex = args.virtualInfo.columnIndexes;
        var page = args.virtualInfo.page;
        args.virtualInfo.blockIndexes = [1, 2];
        args.virtualInfo.page = 1;
        args.virtualInfo.columnIndexes = [];
        var recordslength = this.parent.getCurrentViewRecords().length;
        var firstRecords = this.parent.renderModule.data.dataManager.dataSource.json.slice(0, recordslength);
        var virtualRows = this.vgenerator.generateRows(firstRecords, args);
        args.virtualInfo.blockIndexes = blockIndex;
        args.virtualInfo.columnIndexes = colsIndex;
        args.virtualInfo.page = page;
        return virtualRows.splice(0, this.parent.frozenRows);
    };
    VirtualContentRenderer.prototype.scrollListener = function (scrollArgs) {
        if ((!this.parent.enableVirtualization && this.parent.enableColumnVirtualization && (scrollArgs.direction === 'up'
            || scrollArgs.direction === 'down')) || this.isBottomNotify) {
            return;
        }
        this.scrollAfterEdit();
        if (this.parent.enablePersistence) {
            this.parent.scrollPosition = scrollArgs.offset;
        }
        if (this.preventEvent || this.parent.isDestroyed) {
            this.preventEvent = false;
            return;
        }
        if (isNullOrUndefined(document.activeElement)) {
            this.isFocused = false;
        }
        else {
            this.isFocused = this.content === closest(document.activeElement, '.' + literals.content) || this.content === document.activeElement;
        }
        if (this.parent.islazyloadRequest && scrollArgs.direction === 'down') {
            this.parent.removeMaskRow();
            this.parent.islazyloadRequest = false;
            return;
        }
        var info = scrollArgs.sentinel;
        var viewInfo = this.currentInfo = this.getInfoFromView(scrollArgs.direction, info, scrollArgs.offset);
        if (isGroupAdaptive(this.parent)) {
            if (viewInfo.blockIndexes && this.prevInfo.blockIndexes.toString() === viewInfo.blockIndexes.toString()) {
                this.parent.removeMaskRow();
                return;
            }
            else {
                viewInfo.event = 'refresh-virtual-block';
                if (!isNullOrUndefined(viewInfo.offsets)) {
                    viewInfo.offsets.top = this.content.scrollTop;
                }
                this.parent.pageSettings.currentPage = viewInfo.page;
                if (this.parent.enableVirtualMaskRow) {
                    this.parent.showMaskRow(info.axis);
                    this.parent.addShimmerEffect();
                }
                if (this.parent.editSettings.showAddNewRow) {
                    this.parent.closeEdit();
                }
                this.parent.notify(viewInfo.event, { requestType: 'virtualscroll', virtualInfo: viewInfo, focusElement: scrollArgs.focusElement });
                return;
            }
        }
        if (this.prevInfo && ((info.axis === 'Y' && this.prevInfo.blockIndexes.toString() === viewInfo.blockIndexes.toString())
            || ((info.axis === 'X' && this.prevInfo.columnIndexes.toString() === viewInfo.columnIndexes.toString())
                || (this.parent.isFrozenGrid() && info.axis === 'X' && this.parent.getVisibleFrozenLeftCount() >= viewInfo.columnIndexes[0]
                    && this.prevInfo.columnIndexes.toString().includes(viewInfo.columnIndexes.toString()))))) {
            this.parent.removeMaskRow();
            if (Browser.isIE) {
                this.parent.hideSpinner();
            }
            this.requestType = this.requestType === 'virtualscroll' ? this.empty : this.requestType;
            if (info.axis === 'Y') {
                this.restoreEdit();
            }
            if (this.parent.groupSettings.enableLazyLoading && this.prevInfo.blockIndexes[0] === 1 && viewInfo.blockIndexes[0] === 1 &&
                scrollArgs.direction === 'up') {
                this.virtualEle.adjustTable(0, viewInfo.offsets.top < this.offsets[1] ? 0 : this.getBlockHeight());
            }
            return;
        }
        this.parent.setColumnIndexesInView(this.parent.enableColumnVirtualization ? viewInfo.columnIndexes : []);
        if (!(!this.parent.enableVirtualization && this.parent.enableColumnVirtualization)) {
            this.parent.pageSettings.currentPage = viewInfo.loadNext && !viewInfo.loadSelf ? viewInfo.nextInfo.page : viewInfo.page;
        }
        this.requestType = 'virtualscroll';
        if (this.parent.enableVirtualMaskRow) {
            this.parent.showMaskRow(info.axis);
            this.parent.addShimmerEffect();
        }
        this.parent.islazyloadRequest = false;
        if (this.parent.editSettings.showAddNewRow) {
            this.parent.closeEdit();
        }
        this.parent.notify(events.renderResponsiveColumnChooserDiv, { action: 'clear' });
        if (!(!this.parent.isInitialLoad && this.parent.enablePersistence)) {
            if (this.prevPage === this.parent.pageSettings.currentPage && viewInfo.event === modelChanged) {
                this.currentInfo = this.prevCurrentInfo;
                return;
            }
            if (viewInfo.event === modelChanged) {
                this.prevPage = this.parent.pageSettings.currentPage;
                this.prevCurrentInfo = this.currentInfo;
            }
            this.isBottomNotify = this.isBottom && viewInfo.event === modelChanged;
            this.parent.notify(viewInfo.event, {
                requestType: 'virtualscroll', virtualInfo: viewInfo,
                focusElement: scrollArgs.focusElement
            });
        }
        if (this.parent.enableColumnVirtualization && !this.parent.getContentTable().querySelector('tr.e-row')) {
            this.parent.removeMaskRow();
            this.appendContent(undefined, undefined, {
                requestType: 'virtualscroll', virtualInfo: viewInfo,
                focusElement: scrollArgs.focusElement
            });
            this.prevInfo = viewInfo;
        }
    };
    VirtualContentRenderer.prototype.block = function (blk) {
        return this.vgenerator.isBlockAvailable(blk);
    };
    VirtualContentRenderer.prototype.getInfoFromView = function (direction, info, e) {
        var isBlockAdded = false;
        var tempBlocks = [];
        var infoType = { direction: direction, sentinelInfo: info, offsets: e,
            startIndex: this.preStartIndex, endIndex: this.preEndIndex };
        infoType.page = this.getPageFromTop(e.top, infoType);
        infoType.blockIndexes = tempBlocks = this.vgenerator.getBlockIndexes(infoType.page);
        infoType.loadSelf = !this.vgenerator.isBlockAvailable(tempBlocks[infoType.block]);
        var blocks = this.ensureBlocks(infoType);
        if (this.activeKey === 'upArrow' && infoType.blockIndexes.toString() !== blocks.toString()) {
            // To avoid dupilcate row index problem in key focus support
            var newBlock = blocks[blocks.length - 1];
            if (infoType.blockIndexes.indexOf(newBlock) === -1) {
                isBlockAdded = true;
            }
        }
        if (!(!this.parent.enableVirtualization && this.parent.enableColumnVirtualization)) {
            infoType.blockIndexes = blocks;
        }
        infoType.loadNext = !blocks.filter(function (val) { return tempBlocks.indexOf(val) === -1; })
            .every(this.block.bind(this));
        infoType.event = (infoType.loadNext || infoType.loadSelf) ? modelChanged : refreshVirtualBlock;
        infoType.nextInfo = infoType.loadNext ? { page: Math.max(1, infoType.page + (direction === 'down' ? 1 : -1)) } : {};
        if (isBlockAdded) {
            infoType.blockIndexes = [infoType.blockIndexes[0] - 1, infoType.blockIndexes[0], infoType.blockIndexes[0] + 1];
        }
        if (this.activeKey === 'downArrow' && !isNaN(this.rowIndex)) {
            var firstBlock = Math.ceil(this.rowIndex / this.getBlockSize());
            if (firstBlock !== 1 && (infoType.blockIndexes[1] !== firstBlock || infoType.blockIndexes.length < 3)) {
                infoType.blockIndexes = [firstBlock - 1, firstBlock, firstBlock + 1];
                if (infoType.loadNext) {
                    var nextBlock = this.vgenerator.getBlockIndexes(infoType.nextInfo.page);
                    var hasCommonValue = false;
                    for (var i = 0; i < infoType.blockIndexes.length; i++) {
                        for (var j = 0; j < nextBlock.length; j++) {
                            if (infoType.blockIndexes[parseInt(i.toString(), 10)] === nextBlock[parseInt(j.toString(), 10)]) {
                                hasCommonValue = true;
                                break;
                            }
                        }
                        if (hasCommonValue) {
                            break;
                        }
                    }
                    if (!hasCommonValue) {
                        infoType.loadNext = false;
                        infoType.nextInfo = {};
                        infoType.event = refreshVirtualBlock;
                    }
                }
            }
        }
        infoType.columnIndexes = info.axis === 'X' ? this.vgenerator.getColumnIndexes() : this.parent.getColumnIndexesInView();
        if (this.parent.enableColumnVirtualization && info.axis === 'X') {
            infoType.event = refreshVirtualBlock;
        }
        return infoType;
    };
    VirtualContentRenderer.prototype.ensureBlocks = function (info) {
        var _this = this;
        var index = info.blockIndexes[info.block];
        var mIdx;
        var old = index;
        var max = Math.max;
        var indexes = info.direction === 'down' ? [max(index, 1), ++index, ++index] : [max(index - 1, 1), index, index + 1];
        this.prevInfo = this.prevInfo || this.vgenerator.getData();
        indexes = indexes.filter(function (val, ind) { return indexes.indexOf(val) === ind; });
        var preventSelf = false;
        if (checkIsVirtual(this.parent) && info.direction === 'up' && (((info.page + 1 === this.prevInfo.page
            || info.page === this.prevInfo.page) && (info.block === 1 || (info.block === 0
            && info.page === 1))) || (info.page === this.prevInfo.page && indexes.length === 2))
            && this.vgenerator.isBlockAvailable(info.blockIndexes[1] + 1)) {
            preventSelf = (info.page + 1) === this.prevInfo.page && info.block === 1;
            index += 1;
            indexes = [max(index - 1, 1), index, index + 1];
        }
        if (this.prevInfo.blockIndexes.toString() === indexes.toString()) {
            return indexes;
        }
        if ((info.loadSelf && !preventSelf) || (info.direction === 'down' && this.isEndBlock(old))) {
            indexes = this.vgenerator.getBlockIndexes(info.page);
        }
        indexes.some(function (val, ind) {
            var result = val === (isGroupAdaptive(_this.parent) ? _this.getGroupedTotalBlocks() : _this.getTotalBlocks());
            if (result) {
                mIdx = ind;
            }
            return result;
        });
        if (mIdx !== undefined) {
            indexes = indexes.slice(0, mIdx + 1);
            if (info.block === 0 && indexes.length === 1 && this.vgenerator.isBlockAvailable(indexes[0] - 1)) {
                indexes = [indexes[0] - 1, indexes[0]];
            }
        }
        return indexes;
    };
    // tslint:disable-next-line:max-func-body-length
    VirtualContentRenderer.prototype.appendContent = function (target, newChild, e) {
        var _this = this;
        // currentInfo value will be used if there are multiple dom updates happened due to mousewheel
        var info = e.virtualInfo.sentinelInfo && e.virtualInfo.sentinelInfo.axis === 'Y' && this.currentInfo.page &&
            this.currentInfo.page !== e.virtualInfo.page ? this.currentInfo : e.virtualInfo;
        this.prevInfo = this.prevInfo || e.virtualInfo;
        var cBlock = (info.columnIndexes[0]) - 1;
        var cOffset = this.getColumnOffset(cBlock);
        var width;
        var blocks = info.blockIndexes;
        if (this.parent.groupSettings.columns.length) {
            this.refreshOffsets();
        }
        if (this.parent.height === '100%') {
            this.parent.element.style.height = '100%';
        }
        var vHeight = this.parent.height.toString().indexOf('%') < 0 ? this.content.getBoundingClientRect().height :
            this.parent.element.getBoundingClientRect().height;
        if (!this.parent.enableVirtualization && this.parent.enableColumnVirtualization) {
            vHeight = 0;
        }
        var reduceWidth = 0;
        if (this.parent.enableColumnVirtualization && this.parent.isFrozenGrid()) {
            var frzLeftWidth_1 = 0;
            this.parent.getColumns().filter(function (col) {
                if (col.visible) {
                    reduceWidth += parseInt(col.width.toString(), 10);
                    if (col.freeze === 'Left') {
                        frzLeftWidth_1 += parseInt(col.width.toString(), 10);
                    }
                }
            });
            var cIndex = info.columnIndexes;
            width = this.getColumnOffset(cIndex[cIndex.length - 1]) - this.getColumnOffset(cIndex[0] - 1) + '';
            if (cBlock > this.parent.getVisibleFrozenLeftCount()) {
                cOffset = cOffset - frzLeftWidth_1;
            }
            this.resetStickyLeftPos(cOffset, newChild);
        }
        if (!this.requestTypes.some(function (value) { return value === _this.requestType; })) {
            var translate = this.getTranslateY(this.content.scrollTop, vHeight, info);
            if (this.parent.groupSettings.enableLazyLoading && info && this.prevInfo && this.prevInfo.blockIndexes[0] === 1 &&
                info.blockIndexes[0] === 1 && info.direction === 'up') {
                this.virtualEle.adjustTable(0, this.content.scrollTop < this.offsets[1] ? 0 : this.getBlockHeight());
            }
            else {
                this.virtualEle.adjustTable(cOffset, translate);
            }
        }
        if (this.parent.enableColumnVirtualization) {
            this.header.virtualEle.adjustTable(cOffset, 0);
        }
        if (this.parent.enableColumnVirtualization) {
            var cIndex = info.columnIndexes;
            width = this.getColumnOffset(cIndex[cIndex.length - 1]) - this.getColumnOffset(cIndex[0] - 1) + '';
            if (this.parent.isFrozenGrid()) {
                width = reduceWidth.toString();
                if (this.parent.allowResizing) {
                    this.parent.getHeaderTable().style.width = reduceWidth + 'px';
                    this.parent.getContentTable().style.width = reduceWidth + 'Px';
                }
            }
            this.header.virtualEle.setWrapperWidth(width);
        }
        this.virtualEle.setWrapperWidth(width, Browser.isIE || Browser.info.name === 'edge');
        if (this.parent.enableColumnVirtualization && isNullOrUndefined(target) && isNullOrUndefined(newChild)) {
            return;
        }
        if (!isNullOrUndefined(target) && !isNullOrUndefined(target.parentNode)) {
            remove(target);
        }
        var tbody = this.parent.element.querySelector('.' + literals.content).querySelector(literals.tbody);
        if (tbody) {
            remove(tbody);
            target = null;
        }
        var isReact = this.parent.isReact && !isNullOrUndefined(this.parent.rowTemplate);
        if (!isReact) {
            target = this.parent.createElement(literals.tbody, { attrs: { role: 'rowgroup' } });
            target.appendChild(newChild);
        }
        else {
            target = newChild;
        }
        if (this.parent.frozenRows && e.requestType === 'virtualscroll' && (this.parent.pageSettings.currentPage === 1
            || this.isInfiniteColumnvirtualization())) {
            for (var i = 0; i < this.parent.frozenRows; i++) {
                target.children[0].remove();
            }
        }
        this.getTable().appendChild(target);
        this.requestType = this.requestType === 'virtualscroll' ? this.empty : this.requestType;
        if (!this.parent.enableVirtualization && this.parent.enableColumnVirtualization && (info.direction === 'right' || info.direction === 'left')) {
            this.content.scrollTop = this.currentInfo.offsets.top;
            this.content.scrollLeft = this.currentInfo.offsets.left;
        }
        if (this.parent.groupSettings.columns.length) {
            if (!isGroupAdaptive(this.parent) && info.direction === 'up') {
                var blk = this.offsets[this.getTotalBlocks()] - this.prevHeight;
                var sTop = this.content.scrollTop;
                this.content.scrollTop = sTop + blk;
            }
            this.setVirtualHeight();
            if (!this.parent.groupSettings.enableLazyLoading) {
                this.observer.setPageHeight(this.getOffset(blocks[blocks.length - 1]) - this.getOffset(blocks[0] - 1));
            }
        }
        if (!this.parent.groupSettings.enableLazyLoading && this.parent.groupSettings.columns.length === 0 &&
            e.requestType === 'ungrouping') {
            this.observer.setPageHeight(this.getBlockHeight() * 2);
        }
        this.prevInfo = info;
        if (this.isFocused && this.activeKey !== 'downArrow' && this.activeKey !== 'upArrow') {
            this.content.focus();
        }
        var lastPage = Math.ceil(this.getTotalBlocks() / 2);
        if (this.isBottom) {
            this.isBottom = false;
            this.isBottomNotify = false;
            this.parent.getContent().firstElementChild.scrollTop = this.offsets[this.offsetKeys.length - 1];
        }
        if ((this.parent.pageSettings.currentPage + 1 === lastPage || this.parent.pageSettings.currentPage === lastPage) &&
            blocks.length === 2 && e.requestType === 'delete') {
            this.parent.getContent().firstElementChild.scrollTop = this.offsets[this.offsetKeys.length - 1];
        }
        if ((this.parent.pageSettings.currentPage === lastPage) && blocks.length === 1) {
            this.isBottom = true;
            setTimeout(function () {
                var scrollElement = _this.parent.getContent().firstElementChild;
                scrollElement.scrollTop = _this.offsets[_this.offsetKeys.length - 2];
                var scrollValues = { direction: 'up', sentinel: _this.observer.sentinelInfo.up,
                    offset: { top: scrollElement.scrollTop, left: scrollElement.scrollLeft }, focusElement: _this.parent.element };
                _this.scrollListener(scrollValues);
            }, 0);
        }
        if (this.isTop) {
            this.parent.getContent().firstElementChild.scrollTop = 0;
            this.isTop = false;
        }
        if (e.requestType === 'virtualscroll' && e.virtualInfo.sentinelInfo.axis === 'X') {
            this.parent.notify(events.autoCol, {});
        }
        this.focusCell(e);
        if (this.firstCellFocus) {
            this.firstCellFocus = false;
            var focusModule = this.parent.focusModule;
            var current = focusModule.active.matrix.current;
            var cell = this.parent.getContentTable().rows[current[0]].cells[current[1]];
            focusModule.currentInfo.element = cell;
            focusModule.currentInfo.elementToFocus = cell;
            cell.classList.add('e-focus');
            cell.classList.add('e-focused');
            cell.tabIndex = 0;
            cell.focus();
        }
        this.restoreEdit(e);
        this.restoreAdd();
        this.ensureSelectedRowPosition();
        this.validationScrollLeft();
        if (this.parent.isFrozenGrid() && this.parent.enableColumnVirtualization) {
            this.widthServices.refreshFrozenScrollbar();
        }
        if (!this.initialRowTop) {
            var gridTop = this.parent.element.getBoundingClientRect().top;
            if (this.parent.getRowByIndex(0)) {
                this.initialRowTop = this.parent.getRowByIndex(0).getBoundingClientRect().top - gridTop;
            }
        }
    };
    VirtualContentRenderer.prototype.validationScrollLeft = function () {
        if (this.validationCheck) {
            if (this.validationCol) {
                var offset = this.vgenerator.cOffsets[(this.validationCol.index - this.parent.getVisibleFrozenColumns()) - 1];
                this.validationCol = null;
                this.content.scrollLeft = offset;
            }
            else {
                this.validationCheck = false;
                this.parent.editModule.editFormValidate();
            }
        }
    };
    VirtualContentRenderer.prototype.ensureSelectedRowPosition = function () {
        if (!this.isSelection && this.isSelectionScroll && !isNullOrUndefined(this.selectRowIndex)) {
            this.isSelectionScroll = false;
            var row = this.parent.getRowByIndex(this.selectRowIndex);
            if (row && !this.isRowInView(row)) {
                this.rowSelected({ rowIndex: this.selectRowIndex, row: row }, true);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualContentRenderer.prototype.focusCell = function (e) {
        if (this.activeKey !== 'upArrow' && this.activeKey !== 'downArrow') {
            return;
        }
        var row = this.parent.getRowByIndex(this.rowIndex);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var cell = row.cells[this.cellIndex];
        cell.focus({ preventScroll: true });
        if (!this.parent.selectionSettings.checkboxOnly) {
            this.parent.selectRow(parseInt(row.getAttribute(literals.ariaRowIndex), 10) - 1);
        }
        this.activeKey = this.empty;
    };
    VirtualContentRenderer.prototype.restoreEdit = function (e) {
        if (this.isNormaledit) {
            if (this.parent.editSettings.allowEditing
                && this.parent.editModule && !isNullOrUndefined(this.editedRowIndex)) {
                var row = this.getRowByIndex(this.editedRowIndex);
                var content = this.content;
                var keys = Object.keys(this.virtualData);
                var isXaxis = e && e.virtualInfo && e.virtualInfo.sentinelInfo.axis === 'X';
                if (keys.length && row && !content.querySelector('.' + literals.editedRow) &&
                    ['sorting', 'filtering', 'grouping', 'refresh', 'searching', 'ungrouping', 'reorder'].indexOf(e.requestType) === -1) {
                    var top_1 = row.getBoundingClientRect().top - this.parent.element.getBoundingClientRect().top;
                    if (isXaxis || (top_1 < this.content.offsetHeight && top_1 > this.parent.getRowHeight())) {
                        this.parent.isEdit = false;
                        this.parent.editModule.startEdit(row);
                    }
                }
                if (row && this.content.querySelector('.' + literals.editedRow) && !keys.length) {
                    var rowData = (!this.parent.enableVirtualization && this.parent.enableColumnVirtualization) ?
                        this.enableCacheOnInfiniteColumnVirtual() ? this.virtualInfiniteData :
                            extend({}, this.parent.getCurrentViewRecords()[this.editedRowIndex]) :
                        extend({}, this.getRowObjectByIndex(this.editedRowIndex));
                    this.virtualData = this.getVirtualEditedData(rowData);
                }
            }
            this.restoreAdd();
        }
    };
    VirtualContentRenderer.prototype.getVirtualEditedData = function (rowData) {
        var editForms = [].slice.call(this.parent.element.getElementsByClassName('e-gridform'));
        var isFormDestroyed = this.parent.editModule && this.parent.editModule.formObj
            && this.parent.editModule.formObj.isDestroyed;
        if (!isFormDestroyed) {
            for (var i = 0; i < editForms.length; i++) {
                rowData = this.parent.editModule.getCurrentEditedData(editForms[parseInt(i.toString(), 10)], rowData);
            }
        }
        return rowData;
    };
    VirtualContentRenderer.prototype.restoreAdd = function () {
        var startAdd = !this.parent.element.querySelector('.' + literals.addedRow);
        if (this.isNormaledit && this.isAdd && startAdd) {
            var isTop = this.parent.editSettings.newRowPosition === 'Top' && this.content.scrollTop < this.parent.getRowHeight();
            var isBottom = this.parent.editSettings.newRowPosition === 'Bottom'
                && this.parent.pageSettings.currentPage === this.maxPage;
            if (isTop || isBottom) {
                this.parent.isEdit = false;
                this.parent.addRecord();
            }
        }
    };
    VirtualContentRenderer.prototype.onDataReady = function (e) {
        if (!isNullOrUndefined(e.count)) {
            this.count = e.count;
            this.maxPage = Math.ceil((this.parent.groupSettings.columns.length && this.parent.vcRows.length ? this.parent.vcRows.length
                : e.count) / this.parent.pageSettings.pageSize);
        }
        this.vgenerator.checkAndResetCache(e.requestType);
        if (['refresh', 'filtering', 'searching', 'grouping', 'ungrouping', 'reorder', undefined]
            .some(function (value) { return e.requestType === value; })) {
            this.refreshOffsets();
        }
        this.setVirtualHeight();
        this.resetScrollPosition(e.requestType);
    };
    /**
     * @param {number} height - specifies the height
     * @returns {void}
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualContentRenderer.prototype.setVirtualHeight = function (height) {
        var width = this.parent.enableColumnVirtualization ?
            this.getColumnOffset(this.parent.getVisibleColumns().length + this.parent.groupSettings.columns.length - 1) + 'px' : '100%';
        var virtualHeight = (this.offsets[isGroupAdaptive(this.parent) && this.count !== 0 ? this.getGroupedTotalBlocks() :
            this.getTotalBlocks()]);
        if (!this.parent.enableVirtualization && this.parent.enableColumnVirtualization) {
            virtualHeight = 0;
        }
        var totalBlocks = isGroupAdaptive(this.parent) && this.count !== 0 ? this.getGroupedTotalBlocks()
            : this.getTotalBlocks();
        var lastPage = Math.ceil(totalBlocks / 2);
        var placeHolderBottom = Math.round(this.virtualEle.placeholder.getBoundingClientRect().bottom);
        var wrapperBottom = Math.round(this.virtualEle.wrapper.getBoundingClientRect().bottom);
        if ((this.currentInfo.page === lastPage || this.currentInfo.page + 1 === lastPage) && this.currentInfo.direction === 'down' &&
            placeHolderBottom > wrapperBottom && !this.diff) {
            this.diff = placeHolderBottom - wrapperBottom;
        }
        if (this.diff && (this.currentInfo.page === lastPage) && placeHolderBottom > wrapperBottom &&
            !(this.isAdd && this.parent.editSettings.newRowPosition === 'Bottom')) {
            virtualHeight -= this.diff;
            this.heightChange = true;
        }
        else if (this.requestType === 'virtualscroll' && this.diff && this.heightChange) {
            virtualHeight -= this.diff;
            this.heightChange = false;
        }
        this.virtualEle.setVirtualHeight(virtualHeight, width);
        if (this.virtualEle && this.virtualEle.wrapper) {
            if (!this.parent.enableVirtualization && this.parent.enableColumnVirtualization) {
                this.virtualEle.wrapper.style.minHeight = '';
            }
            else {
                this.virtualEle.wrapper.style.minHeight = !isNullOrUndefined(virtualHeight) ? formatUnit(this.parent.height) : '0px';
            }
        }
        if (this.parent.enableColumnVirtualization) {
            this.header.virtualEle.setVirtualHeight(1, width);
        }
    };
    /**
     * @param {number} sTop - specifies the sTop
     * @param {VirtualInfo} info - specifies the info
     * @returns {number} - return the page
     * @hidden
     */
    VirtualContentRenderer.prototype.getPageFromTop = function (sTop, info) {
        var _this = this;
        var total = (isGroupAdaptive(this.parent)) ? this.getGroupedTotalBlocks() : this.getTotalBlocks();
        var page = 0;
        this.offsetKeys.some(function (offset) {
            var iOffset = Number(offset);
            var border = sTop <= _this.offsets["" + offset] || (iOffset === total && sTop > _this.offsets["" + offset]);
            if (border) {
                if (_this.offsetKeys.length % 2 !== 0 && iOffset.toString() === _this.offsetKeys[_this.offsetKeys.length - 2]
                    && sTop <= _this.offsets[_this.offsetKeys.length - 1]) {
                    iOffset = iOffset + 1;
                }
                info.block = iOffset % 2 === 0 ? 1 : 0;
                page = Math.max(1, Math.min(_this.vgenerator.getPage(iOffset), _this.maxPage));
            }
            return border;
        });
        return page;
    };
    VirtualContentRenderer.prototype.getTranslateY = function (sTop, cHeight, info, isOnenter) {
        if (info === undefined) {
            info = { page: this.getPageFromTop(sTop, {}) };
            info.blockIndexes = this.vgenerator.getBlockIndexes(info.page);
        }
        var block = (info.blockIndexes[0] || 1) - 1;
        var translate = this.getOffset(block);
        var endTranslate = this.getOffset(info.blockIndexes[info.blockIndexes.length - 1]);
        if (isOnenter) {
            info = this.prevInfo;
        }
        var result = translate > sTop ?
            this.getOffset(block - 1) : endTranslate < (sTop + cHeight) ? this.getOffset(block + 1) : translate;
        var blockHeight = this.offsets[info.blockIndexes[info.blockIndexes.length - 1]] -
            this.tmpOffsets[info.blockIndexes[0]];
        var totalBlocks = isGroupAdaptive(this.parent) ? this.getGroupedTotalBlocks() : this.getTotalBlocks();
        if (result + blockHeight > this.offsets[parseInt(totalBlocks.toString(), 10)]) {
            result -= (result + blockHeight) - this.offsets[parseInt(totalBlocks.toString(), 10)];
        }
        if (info.page === 1 && info.block === 0 && info.direction === 'up') {
            result = 0;
        }
        if (!this.parent.enableVirtualization && this.parent.enableColumnVirtualization) {
            result = 0;
        }
        return result;
    };
    VirtualContentRenderer.prototype.getOffset = function (block) {
        return Math.min(this.offsets[parseInt(block.toString(), 10)] | 0, this.offsets[this.maxBlock] | 0);
    };
    VirtualContentRenderer.prototype.onEntered = function () {
        var _this = this;
        return function (element, current, direction, e, isWheel, check) {
            if ((direction === 'down' || direction === 'up') && !_this.parent.enableVirtualization && _this.parent.enableColumnVirtualization) {
                return;
            }
            if (Browser.isIE && !isWheel && check && !_this.preventEvent && !_this.parent.enableVirtualMaskRow) {
                _this.parent.showSpinner();
            }
            _this.prevInfo = _this.prevInfo || _this.vgenerator.getData();
            var viewInfo = _this.getInfoFromView(direction, current, e);
            if (_this.parent.isFrozenGrid() && current.axis === 'X' && _this.parent.getVisibleFrozenLeftCount() >= viewInfo.columnIndexes[0]
                && _this.prevInfo && _this.prevInfo.columnIndexes.toString().includes(viewInfo.columnIndexes.toString())) {
                return;
            }
            if (_this.parent.enableVirtualMaskRow && !_this.preventEvent) {
                var firstOffSetKey = parseInt(_this.offsetKeys[0], 10);
                var lastOffSetKey = parseInt(_this.offsetKeys[_this.offsetKeys.length - 1], 10);
                var blockIndex = _this.currentInfo.blockIndexes;
                var disableShowMaskRow = (_this.prevInfo && current.axis === 'X'
                    && _this.prevInfo.columnIndexes.toString() === viewInfo.columnIndexes.toString())
                    || (direction === 'down' && _this.parent.allowGrouping && _this.parent.groupSettings.columns.length
                        && ((_this.parent.allowFiltering && _this.parent.filterSettings.columns.length)
                            || _this.parent.searchSettings.key.length) && _this.offsetKeys.length <= 2);
                if (!((blockIndex && blockIndex[0] === firstOffSetKey && direction === 'up') ||
                    (blockIndex && blockIndex[blockIndex.length - 1] === lastOffSetKey && direction === 'down') || disableShowMaskRow)) {
                    setTimeout(function () {
                        _this.parent.showMaskRow(current.axis);
                    }, 0);
                }
            }
            var xAxis = current.axis === 'X';
            var top = _this.prevInfo.offsets ? _this.prevInfo.offsets.top : null;
            var height = _this.content.getBoundingClientRect().height;
            var x = _this.getColumnOffset(xAxis ? _this.vgenerator.getColumnIndexes()[0] - 1 : _this.prevInfo.columnIndexes[0] - 1);
            if (_this.parent.isFrozenGrid() && _this.parent.enableColumnVirtualization && _this.currentInfo &&
                _this.currentInfo.columnIndexes) {
                var cBlock = _this.currentInfo.columnIndexes[0] - 1;
                var frzLeftWidth_2 = 0;
                _this.parent.getColumns().filter(function (col) {
                    if (col.visible && col.freeze === 'Left') {
                        frzLeftWidth_2 += parseInt(col.width.toString(), 10);
                    }
                });
                if (cBlock > _this.parent.getVisibleFrozenLeftCount()) {
                    x = x - frzLeftWidth_2;
                }
            }
            if (xAxis) {
                var idx = Object.keys(_this.vgenerator.cOffsets).length - _this.prevInfo.columnIndexes.length;
                var maxLeft = _this.vgenerator.cOffsets[idx - 1];
                x = x > maxLeft ? maxLeft : x; //TODO: This fix horizontal scrollbar jumping issue in column virtualization.
            }
            if (!_this.parent.enableVirtualization && _this.parent.enableColumnVirtualization) {
                _this.virtualEle.adjustTable(x, 0);
            }
            else {
                var y = _this.getTranslateY(e.top, height, xAxis && top === e.top ? _this.prevInfo : undefined, true);
                _this.virtualEle.adjustTable(x, Math.min(y, _this.offsets[_this.maxBlock]));
            }
            if (_this.parent.enableColumnVirtualization) {
                _this.header.virtualEle.adjustTable(x, 0);
                if (_this.parent.isFrozenGrid()) {
                    _this.resetStickyLeftPos(x);
                }
            }
        };
    };
    VirtualContentRenderer.prototype.dataBound = function () {
        this.parent.notify(events.refreshVirtualFrozenHeight, {});
        if (this.isSelection && this.activeKey !== 'upArrow' && this.activeKey !== 'downArrow') {
            this.parent.selectRow(this.selectedRowIndex);
        }
        else {
            this.activeKey = this.empty;
            this.requestType = this.empty;
        }
    };
    /**
     * To calculate the position of frozen cells
     *
     * @param {number} valueX - specifies the transform X value
     * @param {DocumentFragment | HTMLElement} newChild - specifies the element to transform
     * @returns {void}
     * @hidden
     */
    VirtualContentRenderer.prototype.resetStickyLeftPos = function (valueX, newChild) {
        var cells = [].slice.call(this.parent.getHeaderContent().querySelectorAll('.e-leftfreeze,.e-rightfreeze,.e-fixedfreeze')).concat([].slice.call((newChild ? newChild : this.parent.getContent()).querySelectorAll('.e-leftfreeze,.e-rightfreeze,.e-fixedfreeze')));
        var frzLeftWidth = 0;
        var frzRightWidth = 0;
        if (this.parent.getHeaderContent().querySelectorAll('.e-fixedfreeze').length) {
            frzLeftWidth = this.parent.leftrightColumnWidth('left');
            frzRightWidth = this.parent.leftrightColumnWidth('right');
        }
        if (cells.length) {
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[parseInt(i.toString(), 10)];
                var col = void 0;
                if (cell.classList.contains('e-rowcell')) {
                    if (isNullOrUndefined(cell.getAttribute('aria-colindex')) && cell.querySelector('[e-mappinguid]')) {
                        var uid = cell.querySelector('[e-mappinguid]').getAttribute('e-mappinguid');
                        col = this.parent.getColumnByUid(uid);
                    }
                    else {
                        var idx = parseInt(cell.getAttribute('aria-colindex'), 10) - 1;
                        col = this.parent.getColumnByIndex(parseInt(idx.toString(), 10));
                    }
                }
                else {
                    if (cell.classList.contains('e-headercell') || cell.classList.contains('e-filterbarcell')) {
                        var uid = cell.classList.contains('e-filterbarcell') ? cell.getAttribute('e-mappinguid') :
                            cell.querySelector('[e-mappinguid]').getAttribute('e-mappinguid');
                        col = this.parent.getColumnByUid(uid);
                    }
                }
                if (col.freeze === 'Left') {
                    cell.style.left = (col.valueX - valueX) + 'px';
                }
                else if (col.freeze === 'Right') {
                    cell.style.right = (col.valueX + valueX) + 'px';
                }
                else if (col.freeze === 'Fixed') {
                    cell.style.left = (frzLeftWidth - valueX) + 'px';
                    cell.style.right = (frzRightWidth + valueX) + 'px';
                }
            }
        }
        this.parent.translateX = valueX;
    };
    VirtualContentRenderer.prototype.rowSelected = function (args, isSelection) {
        if ((this.isSelection || isSelection) && !this.isLastBlockRow(args.rowIndex)) {
            var transform = getTransformValues(this.content.firstElementChild);
            var gridTop = this.parent.element.getBoundingClientRect().top;
            var rowTop = args.row.getBoundingClientRect().top - gridTop;
            var height = this.content.getBoundingClientRect().height;
            var isBottom = height < rowTop;
            var remainHeight = isBottom ? rowTop - height : this.initialRowTop - rowTop;
            var translateY = isBottom ? transform.height - remainHeight : transform.height + remainHeight;
            this.virtualEle.adjustTable(transform.width, translateY);
            var wrapperInfo = this.virtualEle.wrapper.getBoundingClientRect();
            var contentInfo = this.content.getBoundingClientRect();
            if (wrapperInfo.top > contentInfo.top) {
                this.virtualEle.adjustTable(transform.width, translateY - (wrapperInfo.top - contentInfo.top));
            }
            var lastRowTop = this.content.querySelector('tbody').lastElementChild.getBoundingClientRect().top - gridTop;
            if (lastRowTop < height) {
                translateY = translateY + (height - (args.row.getBoundingClientRect().top - gridTop));
                this.virtualEle.adjustTable(transform.width, translateY - (this.parent.getRowHeight() / 2));
            }
            else if (contentInfo.bottom > wrapperInfo.bottom) {
                this.virtualEle.adjustTable(transform.width, translateY + (contentInfo.bottom - wrapperInfo.bottom));
            }
            if (this.parent.isFrozenGrid() && this.parent.enableColumnVirtualization) {
                this.resetStickyLeftPos(transform.width);
            }
        }
        this.isSelection = false;
    };
    VirtualContentRenderer.prototype.isLastBlockRow = function (index) {
        var scrollEle = this.parent.getContent().firstElementChild;
        var visibleRowCount = Math.floor(scrollEle.offsetHeight / this.parent.getRowHeight()) - 1;
        var startIdx = (this.maxPage * this.parent.pageSettings.pageSize) - visibleRowCount;
        return index >= startIdx;
    };
    VirtualContentRenderer.prototype.refreshMaxPage = function () {
        if (this.parent.groupSettings.columns.length && this.parent.vcRows.length) {
            this.maxPage = Math.ceil(this.parent.vcRows.length / this.parent.pageSettings.pageSize);
        }
    };
    VirtualContentRenderer.prototype.setVirtualPageQuery = function (args) {
        var visiblePage = [];
        if (this.prevInfo && this.prevInfo.blockIndexes) {
            visiblePage = getVisiblePage(this.prevInfo.blockIndexes);
        }
        if ((this.requestType === 'sorting' || this.requestType === 'delete') && visiblePage.length && checkIsVirtual(this.parent)) {
            args.query.skip(this.parent.pageSettings.pageSize * (visiblePage[0] - 1));
            args.query.take(this.parent.pageSettings.pageSize * visiblePage.length);
            args.skipPage = true;
            return;
        }
        var row = this.parent.getContent().querySelector('.e-row');
        if (this.requestType === 'virtualscroll' && this.vgenerator.currentInfo.blockIndexes) {
            this.vgenerator.currentInfo = {};
        }
        if (row && this.parent.isManualRefresh && this.currentInfo.blockIndexes
            && (this.currentInfo.blockIndexes.length === 3 || visiblePage.length > 1)) {
            this.vgenerator.startIndex = parseInt(row.getAttribute('aria-rowindex'), 10) - 1;
            this.vgenerator.currentInfo = extend({}, this.currentInfo);
            this.vgenerator.currentInfo.blockIndexes = this.currentInfo.blockIndexes.slice();
            var includePrevPage = this.vgenerator.includePrevPage = this.currentInfo.blockIndexes[0] % 2 === 0;
            if (includePrevPage) {
                this.vgenerator.startIndex = this.vgenerator.startIndex - this.getBlockSize();
                this.vgenerator.currentInfo.blockIndexes.unshift(this.currentInfo.blockIndexes[0] - 1);
            }
            else {
                this.vgenerator.currentInfo.blockIndexes.push(this.currentInfo.blockIndexes[this.currentInfo.blockIndexes.length - 1] + 1);
            }
            var skip = (this.vgenerator.currentInfo.blockIndexes[0] - 1) * this.getBlockSize();
            var take = this.vgenerator.currentInfo.blockIndexes.length * this.getBlockSize();
            args.query.skip(skip);
            args.query.take(take);
            args.skipPage = true;
        }
    };
    VirtualContentRenderer.prototype.eventListener = function (action) {
        var _this = this;
        this.parent["" + action](dataReady, this.onDataReady, this);
        this.parent.addEventListener(events.dataBound, this.dataBound.bind(this));
        this.parent.addEventListener(events.actionBegin, this.actionBegin.bind(this));
        this.parent.addEventListener(events.actionComplete, this.actionComplete.bind(this));
        this.parent.addEventListener(events.rowSelected, this.rowSelected.bind(this));
        this.parent["" + action](refreshVirtualBlock, this.refreshContentRows, this);
        this.parent["" + action](events.refreshVirtualLazyLoadCache, this.refreshVirtualLazyLoadCache, this);
        this.parent["" + action](events.selectVirtualRow, this.selectVirtualRow, this);
        this.parent["" + action](events.virtaulCellFocus, this.virtualCellFocus, this);
        this.parent["" + action](events.virtualScrollEditActionBegin, this.editActionBegin, this);
        this.parent["" + action](events.virtualScrollAddActionBegin, this.addActionBegin, this);
        this.parent["" + action](events.virtualScrollEdit, this.restoreEdit, this);
        this.parent["" + action](events.virtualScrollEditSuccess, this.editSuccess, this);
        this.parent["" + action](events.refreshVirtualCache, this.refreshCache, this);
        this.parent["" + action](events.editReset, this.resetIsedit, this);
        this.parent["" + action](events.getVirtualData, this.getVirtualData, this);
        this.parent["" + action](events.virtualScrollEditCancel, this.editCancel, this);
        this.parent["" + action](events.refreshVirtualMaxPage, this.refreshMaxPage, this);
        this.parent["" + action](events.setVirtualPageQuery, this.setVirtualPageQuery, this);
        this.parent["" + action](events.selectRowOnContextOpen, this.selectRowOnContextOpen, this);
        this.parent["" + action](events.resetVirtualFocus, this.resetVirtualFocus, this);
        this.parent["" + action](events.refreshVirtualEditFormCells, this.refreshCells, this);
        this.parent["" + action](events.scrollToEdit, this.scrollToEdit, this);
        var event = this.actions;
        for (var i = 0; i < event.length; i++) {
            this.parent["" + action](event[parseInt(i.toString(), 10)] + "-begin", this.onActionBegin, this);
        }
        var fn = function () {
            _this.observer.observe(function (scrollArgs) { return _this.scrollListener(scrollArgs); }, _this.onEntered());
            var gObj = _this.parent;
            if (gObj.enablePersistence && gObj.scrollPosition) {
                if (gObj.scrollPosition.top > 0) {
                    _this.content.scrollTop = gObj.scrollPosition.top;
                    var scrollValues = { direction: 'down', sentinel: _this.observer.sentinelInfo.down,
                        offset: gObj.scrollPosition, focusElement: gObj.element };
                    _this.scrollListener(scrollValues);
                }
                if (gObj.enableColumnVirtualization) {
                    _this.content.scrollLeft = gObj.scrollPosition.left;
                }
            }
            _this.parent.off(contentReady, fn);
        };
        this.parent.on(contentReady, fn, this);
    };
    VirtualContentRenderer.prototype.refreshVirtualLazyLoadCache = function (e) {
        var blockIndex = this.currentInfo.blockIndexes;
        if (isNullOrUndefined(this.currentInfo.blockIndexes)) {
            blockIndex = [1, 2];
        }
        var block;
        var index;
        var cache;
        for (var i = 0; i < blockIndex.length; i++) {
            var rows = this.vgenerator.cache[blockIndex[parseInt(i.toString(), 10)]];
            for (var j = 0; j < rows.length; j++) {
                if (rows[parseInt(j.toString(), 10)].uid === e.uid) {
                    block = blockIndex[parseInt(i.toString(), 10)];
                    index = j;
                    cache = rows;
                    break;
                }
            }
        }
        if (e.count) {
            this.vgenerator.cache[parseInt(block.toString(), 10)].splice(index + 1, e.count);
        }
        else if (e.rows && e.rows.length) {
            this.vgenerator.cache[parseInt(block.toString(), 10)] = ([].slice.call(cache.slice(0, index + 1)).concat([].slice.call(e.rows))).concat([].slice.call(cache.slice(index + 1, cache.length)));
        }
        this.refreshOffsets();
    };
    VirtualContentRenderer.prototype.scrollToEdit = function (col) {
        var allowScroll = true;
        this.validationCheck = true;
        if (this.isAdd && this.content.scrollTop > 0) {
            allowScroll = false;
            var keys = Object.keys(this.offsets);
            this.content.scrollTop = this.parent.editSettings.newRowPosition === 'Top' ? 0 : this.offsets[keys.length - 1];
        }
        var row = this.parent.getRowByIndex(this.editedRowIndex);
        if (!row && !isNullOrUndefined(this.editedRowIndex)) {
            if (!row || !this.isRowInView(row)) {
                var rowIndex = this.parent.getRowHeight();
                var scrollTop = this.editedRowIndex * rowIndex;
                if (!isNullOrUndefined(scrollTop)) {
                    allowScroll = false;
                    this.content.scrollTop = scrollTop;
                }
            }
        }
        if (col && allowScroll) {
            var offset = this.vgenerator.cOffsets[(col.index - this.parent.getVisibleFrozenColumns()) - 1];
            if (!this.parent.enableColumnVirtualization) {
                var header = this.parent.getHeaderContent().querySelector('.e-headercelldiv[e-mappinguid="' + col.uid + '"]');
                offset = header.parentElement.offsetLeft;
            }
            if (this.parent.enableColumnVirtualization && this.parent.getVisibleFrozenLeftCount()) {
                offset -= this.parent.leftrightColumnWidth('left');
            }
            this.content.scrollLeft = this.parent.enableRtl ? -Math.abs(offset) : offset;
        }
        if (col && !allowScroll) {
            this.validationCol = col;
        }
    };
    VirtualContentRenderer.prototype.refreshCells = function (rowObj) {
        rowObj.cells = this.vgenerator.generateCells(rowObj.foreignKeyData);
    };
    VirtualContentRenderer.prototype.resetVirtualFocus = function (e) {
        this.isCancel = e.isCancel;
    };
    /**
     * @param {Object} data - specifies the data
     * @param {Object} data.virtualData -specifies the data
     * @param {boolean} data.isAdd - specifies isAdd
     * @param {boolean} data.isCancel - specifies boolean in cancel
     * @param {boolean} data.isScroll - specifies boolean for scroll
     * @returns {void}
     * @hidden
     */
    VirtualContentRenderer.prototype.getVirtualData = function (data) {
        if (this.isNormaledit) {
            var error = this.parent.element.querySelector('.e-griderror:not([style*="display: none"])');
            var keys = Object.keys(this.virtualData);
            data.isScroll = keys.length !== 0 && this.currentInfo.sentinelInfo && this.currentInfo.sentinelInfo.axis === 'X';
            if (error) {
                return;
            }
            this.virtualData = keys.length ? this.virtualData : data.virtualData;
            this.getVirtualEditedData(this.virtualData);
            data.virtualData = this.virtualData;
            data.isAdd = this.isAdd || this.parent.editSettings.showAddNewRow;
            data.isCancel = this.isCancel;
        }
    };
    VirtualContentRenderer.prototype.selectRowOnContextOpen = function (args) {
        this.isContextMenuOpen = args.isOpen;
    };
    VirtualContentRenderer.prototype.editCancel = function (args) {
        var dataIndex = getEditedDataIndex(this.parent, args.data);
        if (!isNullOrUndefined(dataIndex)) {
            args.data = this.parent.getCurrentViewRecords()[parseInt(dataIndex.toString(), 10)];
        }
    };
    VirtualContentRenderer.prototype.editSuccess = function (args) {
        if (this.isNormaledit) {
            if (!this.isAdd && args.data) {
                this.updateCurrentViewData(args.data);
            }
            this.isAdd = false;
        }
    };
    VirtualContentRenderer.prototype.updateCurrentViewData = function (data) {
        var dataIndex = getEditedDataIndex(this.parent, data);
        if (!isNullOrUndefined(dataIndex)) {
            this.parent.getCurrentViewRecords()[parseInt(dataIndex.toString(), 10)] = data;
        }
    };
    VirtualContentRenderer.prototype.actionBegin = function (args) {
        if (args.requestType !== 'virtualscroll') {
            this.requestType = args.requestType;
        }
        if (!args.cancel) {
            this.parent.notify(events.refreshVirtualFrozenRows, args);
        }
    };
    VirtualContentRenderer.prototype.virtualCellFocus = function (e) {
        // To decide the action (select or scroll), when using arrow keys for cell focus
        var ele = document.activeElement;
        if (!ele.classList.contains(literals.rowCell) && (ele instanceof HTMLInputElement
            || !isNullOrUndefined(ele.closest('.e-templatecell')))) {
            ele = ele.closest('.e-rowcell');
        }
        if (this.parent.allowGrouping && this.parent.groupSettings.columns.length
            && ele && (ele.classList.contains(literals.rowCell) || !isNullOrUndefined(parentsUntil(ele, literals.groupCaptionRow)))
            && e && (e.action === 'shiftEnter' || e.action === 'upArrow' || e.action === 'downArrow')) {
            var scrollEle = this.parent.getContent().firstElementChild;
            var scrollEleInfo = scrollEle.getBoundingClientRect();
            var row = closest(ele, 'tr');
            var nextFocusRow = e.action === 'downArrow' ? row.nextElementSibling : row.previousElementSibling;
            var nextFocusRowInfo = !isNullOrUndefined(nextFocusRow) ? nextFocusRow.getBoundingClientRect()
                : undefined;
            if (isNullOrUndefined(nextFocusRow) || (e.action === 'downArrow' && nextFocusRowInfo.bottom > scrollEleInfo.bottom)
                || ((e.action === 'upArrow' || e.action === 'shiftEnter') && nextFocusRowInfo.top < scrollEleInfo.top)) {
                this.activeKey = e.action;
                this.parent.focusModule.virtualSelectionInfo = { isPending: isNullOrUndefined(nextFocusRow),
                    direction: e.action, event: e };
                var viewDifference = isNullOrUndefined(nextFocusRow) ? this.parent.getRowHeight()
                    : e.action === 'downArrow' ? nextFocusRowInfo.bottom - scrollEleInfo.bottom
                        : scrollEleInfo.top - nextFocusRowInfo.top;
                scrollEle.scrollTop = e.action === 'downArrow' ? scrollEle.scrollTop + viewDifference
                    : scrollEle.scrollTop - viewDifference;
            }
            else {
                this.activeKey = this.empty;
            }
            return;
        }
        if (ele && ele.classList.contains(literals.rowCell)
            && e && (e.action === 'upArrow' || e.action === 'downArrow' || e.action === 'shiftEnter')) {
            var rowIndex = parseInt(ele.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
            if (e && (e.action === 'upArrow' || e.action === 'shiftEnter' || e.action === 'downArrow')) {
                var scrollEle = this.parent.getContent().firstElementChild;
                if (e.action === 'downArrow') {
                    rowIndex += 1;
                }
                else {
                    rowIndex -= 1;
                }
                this.rowIndex = rowIndex;
                this.cellIndex = parseInt(ele.getAttribute(literals.ariaColIndex), 10) - 1;
                var row = this.parent.getRowByIndex(rowIndex);
                var page = this.parent.pageSettings.currentPage;
                var visibleRowCount = Math.floor(scrollEle.offsetHeight / this.parent.getRowHeight()) - 1;
                var emptyRow = false;
                if (isNullOrUndefined(row)) {
                    emptyRow = true;
                    if ((e.action === 'downArrow' && page === this.maxPage - 1) || ((e.action === 'upArrow' || e.action === 'shiftEnter') && page === 1)) {
                        emptyRow = false;
                    }
                }
                if (emptyRow || (ensureLastRow(row, this.parent) && e.action === 'downArrow')
                    || (ensureFirstRow(row, this.parent.getRowHeight() * 2) && (e.action === 'upArrow' || e.action === 'shiftEnter'))) {
                    this.activeKey = e.action;
                    scrollEle.scrollTop = e.action === 'downArrow' ?
                        (rowIndex - visibleRowCount) * this.parent.getRowHeight() : rowIndex * this.parent.getRowHeight();
                }
                else {
                    this.activeKey = this.empty;
                }
                if (!this.parent.selectionSettings.checkboxOnly) {
                    this.parent.selectRow(rowIndex);
                }
            }
        }
    };
    VirtualContentRenderer.prototype.editActionBegin = function (e) {
        this.editedRowIndex = e.index;
        var rowData = (!this.parent.enableVirtualization && this.parent.enableColumnVirtualization) ?
            extend({}, this.parent.getCurrentViewRecords()[e.index]) : extend({}, this.getRowObjectByIndex(e.index));
        var keys = Object.keys(this.virtualData);
        e.data = keys.length && !this.parent.editSettings.showAddNewRow ? this.virtualData : this.isInfiniteColumnvirtualization() ?
            e.data : rowData;
        if (this.enableCacheOnInfiniteColumnVirtual()) {
            this.virtualInfiniteData = e.data;
        }
        e.isScroll = keys.length !== 0 && this.currentInfo.sentinelInfo && this.currentInfo.sentinelInfo.axis === 'X';
    };
    VirtualContentRenderer.prototype.getEditedRowObject = function () {
        var rowObjects = this.parent.vcRows;
        var editedrow;
        for (var i = 0; i < rowObjects.length; i++) {
            if (rowObjects[parseInt(i.toString(), 10)].index === this.editedRowIndex) {
                editedrow = rowObjects[parseInt(i.toString(), 10)];
            }
        }
        return editedrow;
    };
    VirtualContentRenderer.prototype.refreshCache = function (args) {
        if (this.isInfiniteColumnvirtualization()) {
            return;
        }
        var block = Math.ceil((this.editedRowIndex + 1) / this.getBlockSize());
        if (this.parent.allowPaging && this.parent.enableColumnVirtualization) {
            block = Math.ceil((this.editedRowIndex + 1 + ((this.parent.pageSettings.currentPage - 1) *
                this.parent.pageSettings.pageSize)) / this.getBlockSize());
        }
        var index = (this.parent.allowPaging && this.parent.enableColumnVirtualization) ?
            this.editedRowIndex % this.getBlockSize() : this.editedRowIndex - ((block - 1) * this.getBlockSize());
        if (this.parent.groupSettings.columns.length) {
            var editRowObject = this.getEditedRowObject();
            if (editRowObject) {
                editRowObject.data = args.data;
            }
        }
        else {
            this.vgenerator.cache[parseInt(block.toString(), 10)][parseInt(index.toString(), 10)].data = args.data;
        }
    };
    VirtualContentRenderer.prototype.actionComplete = function (args) {
        if (!(this.parent.enableVirtualization || this.parent.enableColumnVirtualization)) {
            return;
        }
        var editRequestTypes = ['delete', 'save', 'cancel'];
        var dataActionRequestTypes = ['sorting', 'filtering', 'grouping', 'refresh', 'searching', 'ungrouping', 'reorder'];
        if (editRequestTypes.some(function (value) { return value === args.requestType; })) {
            this.refreshOffsets();
            this.refreshVirtualElement();
        }
        if (this.isNormaledit && (dataActionRequestTypes.some(function (value) { return value === args.requestType; })
            || editRequestTypes.some(function (value) { return value === args.requestType; }))) {
            this.isCancel = true;
            this.isAdd = false || this.parent.editSettings.showAddNewRow;
            this.editedRowIndex = this.empty;
            this.virtualData = {};
            this.virtualInfiniteData = {};
            if (this.parent.editModule) {
                this.parent.editModule.editModule.previousData = undefined;
            }
        }
        if (this.parent.enableColumnVirtualization && args.requestType === 'filterAfterOpen'
            && this.currentInfo.columnIndexes && this.currentInfo.columnIndexes[0] > 0) {
            this.parent.resetFilterDlgPosition(args.columnName);
        }
    };
    VirtualContentRenderer.prototype.resetIsedit = function () {
        if (this.parent.enableVirtualization && this.isNormaledit) {
            if ((this.parent.editSettings.allowEditing && Object.keys(this.virtualData).length)
                || (this.parent.editSettings.allowAdding && this.isAdd)) {
                this.parent.isEdit = true;
            }
        }
    };
    VirtualContentRenderer.prototype.scrollAfterEdit = function () {
        if (this.parent.editModule && this.parent.editSettings.allowEditing && this.isNormaledit) {
            if (this.parent.element.querySelector('.e-gridform')) {
                var editForm = this.parent.element.querySelector('.' + literals.editedRow);
                var addForm = this.parent.element.querySelector('.' + literals.addedRow);
                if (editForm || addForm) {
                    var rowData = editForm ? extend({}, this.getRowObjectByIndex(this.editedRowIndex))
                        : extend({}, this.emptyRowData);
                    var keys = Object.keys(this.virtualData);
                    this.virtualData = keys.length ? this.getVirtualEditedData(this.virtualData) : this.getVirtualEditedData(rowData);
                }
            }
        }
    };
    VirtualContentRenderer.prototype.createEmptyRowdata = function () {
        var _this = this;
        this.parent.columnModel.filter(function (e) {
            _this.emptyRowData[e.field] = _this.empty;
        });
    };
    VirtualContentRenderer.prototype.addActionBegin = function (args) {
        if (this.isNormaledit) {
            if (!Object.keys(this.emptyRowData).length) {
                this.createEmptyRowdata();
            }
            this.isAdd = true;
            var page = this.parent.pageSettings.currentPage;
            if (!this.parent.frozenRows && this.content.scrollTop > 0 && this.parent.editSettings.newRowPosition === 'Top') {
                this.isAdd = true;
                this.onActionBegin();
                args.startEdit = false;
                this.content.scrollTop = 0;
            }
            if (page < this.maxPage - 1 && this.parent.editSettings.newRowPosition === 'Bottom') {
                this.isAdd = true;
                this.parent.setProperties({ pageSettings: { currentPage: this.maxPage - 1 } }, true);
                args.startEdit = false;
                this.content.scrollTop = this.offsets[this.offsetKeys.length];
            }
        }
    };
    /**
     * @param {number} index - specifies the index
     * @returns {Object} returns the object
     * @hidden
     */
    VirtualContentRenderer.prototype.getRowObjectByIndex = function (index) {
        var data = this.getRowCollection(index, true);
        return data;
    };
    VirtualContentRenderer.prototype.getBlockSize = function () {
        return this.parent.pageSettings.pageSize >> 1;
    };
    VirtualContentRenderer.prototype.getBlockHeight = function () {
        return this.getBlockSize() * this.parent.getRowHeight();
    };
    VirtualContentRenderer.prototype.isEndBlock = function (index) {
        var totalBlocks = isGroupAdaptive(this.parent) ? this.getGroupedTotalBlocks() : this.getTotalBlocks();
        return index >= totalBlocks || index === totalBlocks - 1;
    };
    VirtualContentRenderer.prototype.isOddPageSize = function () {
        return this.parent.pageSettings.pageSize % 2 !== 0;
    };
    VirtualContentRenderer.prototype.getOddBlockSize = function () {
        return this.isOddPageSize() ? this.parent.pageSettings.pageSize / 2 : this.getBlockSize();
    };
    VirtualContentRenderer.prototype.getGroupedTotalBlocks = function () {
        var rows = this.parent.vcRows;
        return Math.floor((rows.length / this.getOddBlockSize()) < 1 ? 1 : rows.length / this.getOddBlockSize());
    };
    VirtualContentRenderer.prototype.getTotalBlocks = function () {
        return Math.ceil(this.count / this.getOddBlockSize());
    };
    VirtualContentRenderer.prototype.getColumnOffset = function (block) {
        return this.vgenerator.cOffsets[parseInt(block.toString(), 10)] | 0;
    };
    VirtualContentRenderer.prototype.getModelGenerator = function () {
        return new VirtualRowModelGenerator(this.parent);
    };
    VirtualContentRenderer.prototype.resetScrollPosition = function (action) {
        if (this.actions.some(function (value) { return value === action; })) {
            this.preventEvent = this.content.scrollTop !== 0;
            this.content.scrollTop = 0;
        }
        if (action !== 'virtualscroll') {
            this.isAdd = false;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualContentRenderer.prototype.onActionBegin = function (e) {
        //Update property silently..
        this.parent.setProperties({ pageSettings: { currentPage: 1 } }, true);
    };
    VirtualContentRenderer.prototype.getRows = function () {
        return this.isInfiniteColumnvirtualization() ? this.getInfiniteRows() : this.vgenerator.getRows();
    };
    VirtualContentRenderer.prototype.getRowByIndex = function (index) {
        var row;
        if (isGroupAdaptive(this.parent)) {
            if (!isNullOrUndefined(index) && this.parent.enableVirtualization && this.parent.groupSettings.columns.length) {
                for (var i = 0; i < this.parent.getDataRows().length; i++) {
                    if (parseInt(this.parent.getDataRows()[parseInt(i.toString(), 10)].getAttribute(literals.ariaRowIndex), 10) - 1 ===
                        index) {
                        row = this.parent.getDataRows()[parseInt(i.toString(), 10)];
                    }
                }
            }
            else {
                row = !isNullOrUndefined(index) ? this.parent.getDataRows()[parseInt(index.toString(), 10)] : undefined;
            }
        }
        else if (!this.parent.enableVirtualization && this.parent.enableColumnVirtualization) {
            row = !isNullOrUndefined(index) ? this.enableCacheOnInfiniteColumnVirtual() ? this.parent.getDataRows()
                .find(function (element) { return parseInt(element.getAttribute(literals.ariaRowIndex), 10) - 1 === index; }) :
                this.parent.getDataRows()[parseInt(index.toString(), 10)] : undefined;
        }
        else if (this.prevInfo) {
            row = this.getRowCollection(index, false);
        }
        return row;
    };
    VirtualContentRenderer.prototype.getMovableVirtualRowByIndex = function (index) {
        return this.getRowCollection(index, false);
    };
    VirtualContentRenderer.prototype.getFrozenRightVirtualRowByIndex = function (index) {
        return this.getRowCollection(index, false);
    };
    VirtualContentRenderer.prototype.getRowCollection = function (index, isRowObject) {
        var prev = this.prevInfo.blockIndexes;
        var startIdx = (prev[0] - 1) * this.getBlockSize();
        if (this.parent.pageSettings.pageSize % 2 !== 0) {
            startIdx += Math.floor((startIdx / this.getBlockSize()) / 2);
        }
        var rowCollection = this.parent.getDataRows();
        var collection = isRowObject ? this.parent.getCurrentViewRecords() : rowCollection;
        if (isRowObject && this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
            startIdx = parseInt(this.parent.getRows()[0].getAttribute(literals.ariaRowIndex), 10) - 1;
            collection = collection.filter(function (m) { return isNullOrUndefined(m.items); });
        }
        if (!isRowObject && this.parent.allowGrouping && this.parent.groupSettings.columns.length && rowCollection.length) {
            startIdx = parseInt(rowCollection[0].getAttribute(literals.ariaRowIndex), 10) - 1;
        }
        var selectedRow = collection[index - startIdx];
        if (this.parent.frozenRows && this.parent.pageSettings.currentPage > 1) {
            if (!isRowObject) {
                selectedRow = index <= this.parent.frozenRows ? rowCollection[parseInt(index.toString(), 10)]
                    : rowCollection[(index - startIdx) + this.parent.frozenRows];
            }
            else {
                selectedRow = index <= this.parent.frozenRows ? this.parent.getRowsObject()[parseInt(index.toString(), 10)].data
                    : selectedRow;
            }
        }
        return selectedRow;
    };
    VirtualContentRenderer.prototype.getVirtualRowIndex = function (index) {
        var prev = this.prevInfo.blockIndexes;
        var startIdx = (prev[0] - 1) * this.getBlockSize();
        if (this.parent.enableVirtualization && this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
            var vGroupedRows = this.vgenerator.cache[prev[0]];
            for (var i = 0; i < vGroupedRows.length; i++) {
                if (vGroupedRows["" + i].isDataRow) {
                    startIdx = vGroupedRows["" + i].index;
                    break;
                }
            }
        }
        return startIdx + index;
    };
    /**
     * @returns {void}
     * @hidden */
    VirtualContentRenderer.prototype.refreshOffsets = function () {
        var gObj = this.parent;
        var row = 0;
        var blockSize = this.getBlockSize();
        var oddBlockSize = this.getOddBlockSize();
        var total = isGroupAdaptive(this.parent) ? this.getGroupedTotalBlocks() : this.getTotalBlocks();
        this.prevHeight = this.offsets[parseInt(total.toString(), 10)];
        this.maxBlock = total % 2 === 0 ? total - 2 : total - 1;
        this.offsets = {};
        //Row offset update
        // eslint-disable-next-line prefer-spread
        var blocks = Array.apply(null, Array(total)).map(function () { return ++row; });
        for (var i = 0; i < blocks.length; i++) {
            var tmp = (this.vgenerator.cache[blocks[parseInt(i.toString(), 10)]] || []).length;
            var rem = !isGroupAdaptive(this.parent) ? this.isOddPageSize() ?
                Math.ceil(this.count % oddBlockSize) : this.count % blockSize : this.isOddPageSize() ?
                Math.ceil(gObj.vcRows.length % oddBlockSize) : (gObj.vcRows.length % blockSize);
            var size = !isGroupAdaptive(this.parent) && blocks[parseInt(i.toString(), 10)] in this.vgenerator.cache ?
                tmp * this.parent.getRowHeight() : rem && blocks[parseInt(i.toString(), 10)] === total ? rem * this.parent.getRowHeight() :
                this.getBlockHeight();
            if (this.isOddPageSize() && !(blocks[parseInt(i.toString(), 10)] in this.vgenerator.cache)
                && !(rem && blocks[parseInt(i.toString(), 10)] === total)) {
                size = (blocks[parseInt(i.toString(), 10)] % 2 !== 0 ? Math.floor(oddBlockSize)
                    : Math.ceil(oddBlockSize)) * this.parent.getRowHeight();
            }
            // let size: number = this.parent.groupSettings.columns.length && block in this.vgenerator.cache ?
            // tmp * getRowHeight() : this.getBlockHeight();
            this.offsets[blocks[parseInt(i.toString(), 10)]] = (this.offsets[blocks[parseInt(i.toString(), 10)] - 1] | 0) + size;
            this.tmpOffsets[blocks[parseInt(i.toString(), 10)]] = this.offsets[blocks[parseInt(i.toString(), 10)] - 1] | 0;
        }
        this.offsetKeys = Object.keys(this.offsets);
        if (isGroupAdaptive(this.parent)) {
            this.parent.vGroupOffsets = this.offsets;
        }
        //Column offset update
        if (this.parent.enableColumnVirtualization) {
            this.vgenerator.refreshColOffsets();
        }
    };
    VirtualContentRenderer.prototype.refreshVirtualElement = function () {
        this.vgenerator.refreshColOffsets();
        this.setVirtualHeight();
    };
    VirtualContentRenderer.prototype.setVisible = function (columns) {
        var gObj = this.parent;
        var rows = [];
        rows = this.getRows();
        var testRow;
        rows.some(function (r) { if (r.isDataRow) {
            testRow = r;
        } return r.isDataRow; });
        var isRefresh = true;
        if (!gObj.groupSettings.columns.length && testRow) {
            isRefresh = false;
        }
        var tr = gObj.getDataRows();
        for (var c = 0, clen = columns.length; c < clen; c++) {
            var column = columns[parseInt(c.toString(), 10)];
            var idx = gObj.getNormalizedColumnIndex(column.uid);
            var displayVal = column.visible === true ? '' : 'none';
            var colGrp = this.getColGroup().children;
            if (idx !== -1 && testRow && idx < testRow.cells.length) {
                setStyleAttribute(colGrp[parseInt(idx.toString(), 10)], { 'display': displayVal });
            }
            if (!isRefresh) {
                var width = void 0;
                if (column.width) {
                    if (column.visible) {
                        width = this.virtualEle.wrapper.offsetWidth + parseInt(column.width.toString(), 10);
                    }
                    else {
                        width = this.virtualEle.wrapper.offsetWidth - parseInt(column.width.toString(), 10);
                    }
                }
                if (width > gObj.width) {
                    this.setDisplayNone(tr, idx, displayVal, rows);
                    if (this.parent.enableColumnVirtualization) {
                        this.virtualEle.setWrapperWidth(width + '');
                    }
                    this.refreshVirtualElement();
                }
                else {
                    isRefresh = true;
                }
            }
            if (!this.parent.invokedFromMedia && column.hideAtMedia) {
                this.parent.updateMediaColumns(column);
            }
            this.parent.invokedFromMedia = false;
        }
        if (isRefresh) {
            this.refreshContentRows({ requestType: 'refresh' });
        }
        else {
            this.parent.notify(events.partialRefresh, { rows: rows, args: { isFrozen: false, rows: rows } });
        }
    };
    VirtualContentRenderer.prototype.selectVirtualRow = function (args) {
        var _this = this;
        var count = isGroupAdaptive(this.parent) ? this.vgenerator.recordsCount : this.count;
        args.isAvailable = args.selectedIndex < count;
        if (args.isAvailable && !this.isContextMenuOpen && this.activeKey !== 'upArrow'
            && this.activeKey !== 'downArrow' && !this.isSelection && !this.requestTypes.some(function (value) { return value === _this.requestType; })
            && !this.parent.selectionModule.isInteracted) {
            var selectedRow = this.parent.getRowByIndex(args.selectedIndex);
            var rowHeight = this.parent.getRowHeight();
            if (!selectedRow || !this.isRowInView(selectedRow)) {
                this.isSelection = true;
                this.selectedRowIndex = args.selectedIndex;
                var scrollTop = args.selectedIndex * rowHeight;
                if (isGroupAdaptive(this.parent)) {
                    var selectedRowObjectIndex = this.parent.vcRows
                        .findIndex(function (row) { return row.index === args.selectedIndex; });
                    scrollTop = selectedRowObjectIndex !== -1 ? selectedRowObjectIndex * rowHeight : undefined;
                    this.isSelection = selectedRowObjectIndex !== -1 ? this.isSelection : false;
                }
                else if (this.parent.groupSettings.columns.length && this.parent.getDataModule().isRemote()) {
                    var page = Math.ceil((args.selectedIndex + 1) / this.parent.pageSettings.pageSize);
                    var blockIndexes = this.vgenerator.getBlockIndexes(page);
                    scrollTop = this.offsets[blockIndexes[0]];
                }
                if (!isNullOrUndefined(scrollTop)) {
                    var direction = this.content.scrollTop < scrollTop ? 'down' : 'up';
                    this.selectRowIndex = args.selectedIndex;
                    this.content.scrollTop = scrollTop;
                    this.isSelectionScroll = this.observer.check(direction);
                }
            }
        }
        this.requestType = this.empty;
    };
    VirtualContentRenderer.prototype.isRowInView = function (row) {
        var top = row.getBoundingClientRect().top;
        var bottom = row.getBoundingClientRect().bottom;
        return (top >= this.content.getBoundingClientRect().top && bottom <= this.content.getBoundingClientRect().bottom);
    };
    return VirtualContentRenderer;
}(ContentRender));
export { VirtualContentRenderer };
/**
 * @hidden
 */
var VirtualHeaderRenderer = /** @class */ (function (_super) {
    __extends(VirtualHeaderRenderer, _super);
    function VirtualHeaderRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.virtualEle = new VirtualElementHandler();
        _this.isMovable = false;
        _this.gen = new VirtualRowModelGenerator(_this.parent);
        _this.parent.on(events.columnVisibilityChanged, _this.setVisible, _this);
        _this.parent.on(refreshVirtualBlock, function (e) { return e.virtualInfo.sentinelInfo.axis === 'X' ? _this.refreshUI() : null; }, _this);
        return _this;
    }
    VirtualHeaderRenderer.prototype.renderTable = function () {
        this.gen.refreshColOffsets();
        this.parent.setColumnIndexesInView(this.gen.getColumnIndexes(this.getPanel().querySelector('.' + literals.headerContent)));
        _super.prototype.renderTable.call(this);
        this.virtualEle.table = this.getTable();
        this.virtualEle.content = this.getPanel().querySelector('.' + literals.headerContent);
        this.virtualEle.content.style.position = 'relative';
        this.virtualEle.renderWrapper();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (!(this.parent.enableVirtualization || this.parent.enableInfiniteScrolling) && this.parent.enableColumnVirtualization) ?
            this.virtualEle.renderPlaceHolder() : this.virtualEle.renderPlaceHolder('absolute');
    };
    VirtualHeaderRenderer.prototype.appendContent = function (table) {
        this.virtualEle.wrapper.appendChild(table);
    };
    VirtualHeaderRenderer.prototype.refreshUI = function () {
        this.gen.refreshColOffsets();
        this.parent.setColumnIndexesInView(this.gen.getColumnIndexes(this.getPanel().querySelector('.' + literals.headerContent)));
        _super.prototype.refreshUI.call(this);
    };
    VirtualHeaderRenderer.prototype.setVisible = function (columns) {
        var gObj = this.parent;
        var displayVal;
        var idx;
        var needFullRefresh;
        for (var c = 0, clen = columns.length; c < clen; c++) {
            var column = columns[parseInt(c.toString(), 10)];
            idx = gObj.getNormalizedColumnIndex(column.uid);
            displayVal = column.visible ? '' : 'none';
            var colGrp = this.getColGroup().children;
            if (gObj.getColumnByField(column.field)) {
                setStyleAttribute(colGrp[parseInt(idx.toString(), 10)], { 'display': displayVal });
            }
            if (gObj.enableColumnVirtualization && !gObj.groupSettings.columns.length) {
                var tablewidth = void 0;
                if (column.visible) {
                    tablewidth = this.virtualEle.wrapper.offsetWidth + parseInt(column.width.toString(), 10);
                }
                else {
                    tablewidth = this.virtualEle.wrapper.offsetWidth - parseInt(column.width.toString(), 10);
                }
                if (tablewidth > gObj.width) {
                    this.setDisplayNone(column, displayVal);
                    this.virtualEle.setWrapperWidth(tablewidth + '');
                    this.gen.refreshColOffsets();
                }
                else {
                    needFullRefresh = true;
                }
            }
            else {
                needFullRefresh = true;
            }
            if (needFullRefresh) {
                this.refreshUI();
            }
        }
    };
    VirtualHeaderRenderer.prototype.setDisplayNone = function (col, displayVal) {
        var table = this.getTable();
        for (var _i = 0, _a = [].slice.apply(table.querySelectorAll('th.e-headercell')); _i < _a.length; _i++) {
            var ele = _a[_i];
            if (ele.querySelector('[e-mappinguid]') &&
                ele.querySelector('[e-mappinguid]').getAttribute('e-mappinguid') === col.uid) {
                setStyleAttribute(ele, { 'display': displayVal });
                if (displayVal === '') {
                    removeClass([ele], 'e-hide');
                }
                break;
            }
        }
    };
    return VirtualHeaderRenderer;
}(HeaderRender));
export { VirtualHeaderRenderer };
/**
 * @hidden
 */
var VirtualElementHandler = /** @class */ (function () {
    function VirtualElementHandler() {
    }
    VirtualElementHandler.prototype.renderWrapper = function (height) {
        this.wrapper = createElement('div', { className: 'e-virtualtable' });
        this.wrapper.style.minHeight = formatUnit(height);
        this.wrapper.appendChild(this.table);
        this.content.appendChild(this.wrapper);
    };
    VirtualElementHandler.prototype.renderPlaceHolder = function (position) {
        if (position === void 0) { position = 'relative'; }
        this.placeholder = createElement('div', { className: 'e-virtualtrack' });
        this.placeholder.style.position = position;
        this.content.appendChild(this.placeholder);
    };
    VirtualElementHandler.prototype.renderFrozenWrapper = function (height) {
        this.wrapper = createElement('div', { className: 'e-virtualtable' });
        this.wrapper.style.cssText = "min-height:" + formatUnit(height) + "; display: flex;";
        this.content.appendChild(this.wrapper);
    };
    VirtualElementHandler.prototype.renderFrozenPlaceHolder = function () {
        this.placeholder = createElement('div', { className: 'e-virtualtrack' });
        this.content.appendChild(this.placeholder);
    };
    VirtualElementHandler.prototype.adjustTable = function (xValue, yValue) {
        this.wrapper.style.transform = "translate(" + xValue + "px, " + yValue + "px)";
    };
    VirtualElementHandler.prototype.setWrapperWidth = function (width, full) {
        if (width && width.indexOf('%') === -1 && !(this.content.getBoundingClientRect().width < parseInt(width, 10))) {
            width = undefined;
            full = true;
        }
        this.wrapper.style.width = width ? width + "px" : full ? '100%' : '';
    };
    VirtualElementHandler.prototype.setVirtualHeight = function (height, width) {
        this.placeholder.style.height = !isNullOrUndefined(height) ? height + "px" : '0px';
        if (width && width.indexOf('%') === -1 && !(this.content.getBoundingClientRect().width < parseInt(width, 10))) {
            width = '100%';
        }
        this.placeholder.style.width = width;
    };
    VirtualElementHandler.prototype.setFreezeWrapperWidth = function (wrapper, width, full) {
        wrapper.style.width = width ? width + "px" : full ? '100%' : '';
    };
    return VirtualElementHandler;
}());
export { VirtualElementHandler };
