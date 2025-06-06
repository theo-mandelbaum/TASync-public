/* eslint-disable @typescript-eslint/no-explicit-any */
import { append, addClass, remove, isNullOrUndefined, setStyleAttribute, createElement, prepend, removeClass } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import * as cls from '../base/css-constant';
import * as util from '../base/util';
/**
 * Virtual Scroll
 */
var VirtualScroll = /** @class */ (function () {
    function VirtualScroll(parent) {
        this.translateY = 0;
        this.itemSize = 60;
        this.renderedLength = 0;
        this.averageRowHeight = 0;
        this.startIndex = 0;
        this.existingDataCollection = [];
        this.enableTransition = true;
        this.parent = parent;
        this.bufferCount = parent.activeViewOptions.overscanCount < 3 ? 3 : parent.activeViewOptions.overscanCount;
        this.addEventListener();
    }
    VirtualScroll.prototype.addEventListener = function () {
        if (!this.parent || this.parent && this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.virtualScroll, this.virtualScrolling, this);
    };
    VirtualScroll.prototype.removeEventListener = function () {
        if (!this.parent || this.parent && this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.virtualScroll, this.virtualScrolling);
    };
    VirtualScroll.prototype.getRenderedCount = function () {
        this.setItemSize();
        var containerSize = this.isHorizontalScroll ? this.parent.element.clientWidth : this.parent.element.clientHeight;
        this.renderedLength = Math.ceil(containerSize / this.itemSize) + this.bufferCount;
        return this.renderedLength;
    };
    VirtualScroll.prototype.renderVirtualTrack = function (contentWrap) {
        var wrap = createElement('div', { className: cls.VIRTUAL_TRACK_CLASS });
        if (this.isHorizontalScroll) {
            var colCount = this.parent.activeView.colLevels[this.parent.activeView.colLevels.length - 1].length;
            wrap.style.width = (colCount * this.itemSize) + 'px';
        }
        else {
            wrap.style.height = (this.parent.resourceBase.expandedResources.length * this.itemSize) + 'px';
        }
        contentWrap.appendChild(wrap);
    };
    VirtualScroll.prototype.updateVirtualScrollHeight = function () {
        var virtual = this.parent.element.querySelector('.' + cls.VIRTUAL_TRACK_CLASS);
        var lastResourceIndex = this.parent.resourceBase.expandedResources[this.parent.resourceBase.expandedResources.length - 1].groupIndex;
        var lastRenderIndex = this.parent.resourceBase.renderedResources[this.parent.resourceBase.renderedResources.length - 1].groupIndex;
        if (lastRenderIndex !== lastResourceIndex) {
            var conTable = this.parent.element.querySelector('.' + cls.CONTENT_TABLE_CLASS);
            this.renderedLength = conTable.querySelector('tbody').children.length;
            virtual.style.height = (conTable.offsetHeight + (this.parent.resourceBase.expandedResources.length - (this.renderedLength)) *
                conTable.offsetHeight / this.renderedLength) + 'px';
            var conWrap = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
            if ((conWrap.scrollHeight - conWrap.scrollTop) < conWrap.offsetHeight * this.bufferCount) {
                virtual.style.height = parseInt(virtual.style.height, 10) + (conWrap.offsetHeight * this.bufferCount) + 'px';
            }
        }
        else {
            virtual.style.height = '';
        }
        this.averageRowHeight = virtual.offsetHeight / this.parent.resourceBase.expandedResources.length;
    };
    VirtualScroll.prototype.updateVirtualTrackHeight = function (wrap) {
        var resourceCount = this.parent.resourceBase.renderedResources.length;
        if (resourceCount !== this.getRenderedCount()) {
            wrap.style.height = this.parent.element.querySelector('.e-content-wrap').clientHeight + 'px';
            var resWrap = this.parent.element.querySelector('.' + cls.RESOURCE_COLUMN_WRAP_CLASS);
            var conWrap = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
            var eventWrap = this.parent.element.querySelector('.' + cls.EVENT_TABLE_CLASS);
            this.translateY = 0;
            this.setTranslate(resWrap, conWrap, eventWrap);
        }
        else {
            var lastRenderIndex = this.parent.resourceBase.renderedResources[resourceCount - 1].groupIndex;
            var lastCollIndex = this.parent.resourceBase.expandedResources[this.parent.resourceBase.expandedResources.length - 1].groupIndex;
            var renderedResCount = resourceCount + (lastCollIndex - lastRenderIndex);
            renderedResCount = (renderedResCount > this.parent.resourceBase.expandedResources.length) ?
                this.parent.resourceBase.expandedResources.length : renderedResCount;
            wrap.style.height = (renderedResCount * this.itemSize) + 'px';
        }
    };
    VirtualScroll.prototype.setItemSize = function () {
        if (this.isHorizontalScroll) {
            this.itemSize = util.getElementWidthFromClass(this.parent.activeView.element, cls.WORK_CELLS_CLASS, this.parent.uiStateValues.isTransformed) || this.itemSize;
        }
        else {
            this.itemSize = this.parent.getElementHeightFromClass(this.parent.activeView.element, cls.WORK_CELLS_CLASS) || this.itemSize;
        }
    };
    VirtualScroll.prototype.refreshLayout = function () {
        var initialHeight = this.parent.uiStateValues.scheduleHeight;
        this.parent.uiStateValues.scheduleHeight = this.parent.element.offsetHeight;
        var preRenderedLength = this.renderedLength;
        if (this.parent.uiStateValues.scheduleHeight !== initialHeight) {
            if (preRenderedLength < this.getRenderedCount()) {
                this.isRemoteRefresh = true;
            }
            var resWrap = this.parent.element.querySelector('.' + cls.RESOURCE_COLUMN_WRAP_CLASS);
            var conWrap = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
            var eventWrap = this.parent.element.querySelector('.' + cls.EVENT_TABLE_CLASS);
            if (!this.parent.rowAutoHeight) {
                this.enableTransition = false;
                removeClass([conWrap, resWrap], 'e-transition');
            }
            var firstTDIndex = parseInt(resWrap.querySelector('tbody td').getAttribute('data-group-index'), 10);
            var endIndex = (firstTDIndex + this.renderedLength);
            firstTDIndex = (endIndex > this.parent.resourceBase.expandedResources.length) ?
                (this.parent.resourceBase.expandedResources.length - this.renderedLength) : firstTDIndex;
            firstTDIndex = firstTDIndex < 0 ? 0 : firstTDIndex;
            this.existingDataCollection = this.parent.resourceBase.renderedResources;
            this.parent.resourceBase.renderedResources = this.parent.resourceBase.expandedResources.slice(firstTDIndex, endIndex);
            if (this.parent.resourceBase.renderedResources.length > 0) {
                this.updateContent(resWrap, conWrap, eventWrap, this.parent.resourceBase.renderedResources);
            }
        }
    };
    VirtualScroll.prototype.renderEvents = function () {
        this.setTabIndex();
        var dynamicData = this.triggerScrollEvent(events.virtualScrollStop);
        if (this.parent.activeViewOptions && this.parent.activeViewOptions.enableLazyLoading && this.parent.crudModule) {
            if (dynamicData.length > 0) {
                this.parent.crudModule.refreshProcessedData(true, dynamicData);
                this.parent.hideSpinner();
                return;
            }
            this.parent.crudModule.refreshDataManager();
            return;
        }
        if (this.parent.crudModule) {
            this.parent.crudModule.refreshProcessedData(true);
        }
        if (this.parent.currentView !== 'Month') {
            this.parent.notify(events.contentReady, {});
        }
        this.parent.hideSpinner();
    };
    VirtualScroll.prototype.virtualScrolling = function () {
        var _this = this;
        if (this.parent.quickPopup) {
            this.parent.quickPopup.quickPopupHide();
            this.parent.quickPopup.morePopup.hide();
        }
        var conWrap = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        if (this.isHorizontalScroll) {
            this.horizontalScrolling(conWrap);
        }
        else {
            var resWrap = this.parent.element.querySelector('.' + cls.RESOURCE_COLUMN_WRAP_CLASS);
            var eventWrap = this.parent.element.querySelector('.' + cls.EVENT_TABLE_CLASS);
            var timeIndicator = this.parent.element.querySelector('.' + cls.CURRENT_TIMELINE_CLASS);
            var conTable = this.parent.element.querySelector('.' + cls.CONTENT_TABLE_CLASS);
            if (!this.parent.rowAutoHeight) {
                addClass([conWrap, resWrap], 'e-transition');
            }
            this.renderedLength = resWrap.querySelector('tbody').children.length;
            var firstTDIndex = parseInt(resWrap.querySelector('tbody td').getAttribute('data-group-index'), 10);
            var scrollHeight = this.parent.rowAutoHeight ?
                (conTable.offsetHeight - conWrap.offsetHeight) : this.bufferCount * this.itemSize;
            var resCollection = [];
            this.existingDataCollection = this.parent.resourceBase.renderedResources;
            if ((conWrap.scrollTop) - this.translateY < 0) {
                resCollection = this.upScroll(conWrap, firstTDIndex);
            }
            else if (conWrap.scrollTop - this.translateY > scrollHeight) {
                resCollection = this.downScroll(conWrap, firstTDIndex);
            }
            if (!isNullOrUndefined(resCollection) && resCollection.length > 0) {
                this.triggerScrollEvent(events.virtualScrollStart);
                var selectedEle = this.parent.getSelectedCells();
                this.focusedEle = selectedEle[selectedEle.length - 1] || this.focusedEle;
                this.updateContent(resWrap, conWrap, eventWrap, resCollection);
                this.setTranslate(resWrap, conWrap, eventWrap, timeIndicator);
                if (this.parent.dragAndDropModule && this.parent.dragAndDropModule.actionObj.action === 'drag') {
                    this.parent.dragAndDropModule.navigationWrapper();
                }
                window.clearTimeout(this.timeValue);
                this.timeValue = window.setTimeout(function () { _this.renderEvents(); }, 250);
            }
        }
    };
    VirtualScroll.prototype.horizontalScrolling = function (conWrap) {
        var _this = this;
        var resCollection = [];
        var scrollWidth = this.bufferCount * this.itemSize;
        if (Math.abs(conWrap.scrollLeft) - Math.abs(this.translateY) < 0) {
            resCollection = this.leftScroll(conWrap);
        }
        else if (Math.abs(conWrap.scrollLeft) - Math.abs(this.translateY) > scrollWidth) {
            resCollection = this.rightScroll(conWrap);
        }
        if (!isNullOrUndefined(resCollection) && resCollection.length > 0) {
            if (this.parent.resourceBase.expandedResources.length !== resCollection.length ||
                this.parent.resourceBase.expandedResources[0] !== resCollection[0] ||
                this.parent.resourceBase.expandedResources[this.parent.resourceBase.expandedResources.length - 1] !==
                    resCollection[resCollection.length - 1]) {
                this.triggerScrollEvent(events.virtualScrollStart);
                var colLevels = this.parent.activeView.colLevels.slice(0);
                this.updateHorizontalContent(conWrap, resCollection);
                setStyleAttribute(conWrap.querySelector('table'), { transform: "translateX(" + this.translateY + "px)" });
                this.parent.activeView.colLevels = colLevels;
                if (this.parent.dragAndDropModule && this.parent.dragAndDropModule.actionObj.action === 'drag') {
                    this.parent.dragAndDropModule.navigationWrapper();
                }
            }
            window.clearTimeout(this.timeValue);
            this.timeValue = window.setTimeout(function () { _this.renderEvents(); }, 250);
        }
    };
    VirtualScroll.prototype.triggerScrollEvent = function (action) {
        var _this = this;
        var dynamicData = [];
        if (!this.parent.activeView) {
            return dynamicData;
        }
        var eventArgs = {
            startDate: this.parent.activeView.startDate(),
            endDate: this.parent.activeView.endDate(),
            startIndex: this.parent.resourceBase.renderedResources[0].groupIndex,
            endIndex: this.parent.resourceBase.renderedResources[this.parent.resourceBase.renderedResources.length - 1].groupIndex,
            resourceData: this.parent.resourceBase.renderedResources.map(function (x) { return x.resourceData; }),
            name: action
        };
        this.parent.trigger(action, eventArgs, function (args) {
            if (action === events.virtualScrollStart) {
                _this.parent.showSpinner();
            }
            else if (action === events.virtualScrollStop && !isNullOrUndefined(args.eventData) && args.eventData.length > 0) {
                dynamicData = args.eventData;
            }
        });
        return dynamicData;
    };
    VirtualScroll.prototype.upScroll = function (conWrap, firstTDIndex) {
        var index = 0;
        index = (~~(conWrap.scrollTop / this.itemSize) + Math.ceil(conWrap.clientHeight / this.itemSize)) - this.renderedLength;
        if (this.parent.rowAutoHeight) {
            index = (index > firstTDIndex) ? firstTDIndex - this.bufferCount : index;
        }
        index = (index > 0) ? index : 0;
        var prevSetCollection = this.getBufferCollection(index, index + this.renderedLength);
        this.parent.resourceBase.renderedResources = prevSetCollection;
        if (firstTDIndex === 0) {
            this.translateY = conWrap.scrollTop;
        }
        else {
            var height = (this.parent.rowAutoHeight) ? this.averageRowHeight : this.itemSize;
            height = (height > 0) ? height : this.itemSize;
            this.translateY = (conWrap.scrollTop - (this.bufferCount * height) > 0) ?
                conWrap.scrollTop - (this.bufferCount * height) : 0;
        }
        return prevSetCollection;
    };
    VirtualScroll.prototype.downScroll = function (conWrap, firstTDIndex) {
        var lastResource = this.parent.resourceBase.
            renderedResources[this.parent.resourceBase.renderedResources.length - 1].groupIndex;
        var lastResourceIndex = this.parent.resourceBase.expandedResources[this.parent.resourceBase.expandedResources.length - 1].groupIndex;
        if (lastResource === lastResourceIndex) {
            return null;
        }
        var nextSetResIndex = 0;
        nextSetResIndex = ~~(conWrap.scrollTop / this.itemSize);
        if (this.parent.rowAutoHeight) {
            nextSetResIndex = ~~((conWrap.scrollTop - this.translateY) / this.averageRowHeight) + firstTDIndex;
            nextSetResIndex = (nextSetResIndex > firstTDIndex + this.bufferCount) ? nextSetResIndex : firstTDIndex + this.bufferCount;
        }
        var lastIndex = nextSetResIndex + this.renderedLength;
        lastIndex = (lastIndex > this.parent.resourceBase.expandedResources.length) ?
            nextSetResIndex + (this.parent.resourceBase.expandedResources.length - nextSetResIndex) : lastIndex;
        var nextSetCollection = this.getBufferCollection(lastIndex - this.renderedLength, lastIndex);
        this.translateY = conWrap.scrollTop;
        return nextSetCollection;
    };
    VirtualScroll.prototype.leftScroll = function (conWrap) {
        var index = 0;
        index = (~~(Math.abs(conWrap.scrollLeft) / this.itemSize) + Math.ceil(conWrap.clientWidth / this.itemSize)) - this.renderedLength;
        index = (index > 0) ? index : 0;
        return this.getCollection(index, index + this.renderedLength);
    };
    VirtualScroll.prototype.rightScroll = function (conWrap) {
        var lastLevel = this.parent.activeView.colLevels[this.parent.activeView.colLevels.length - 1];
        var nextSetIndex = 0;
        nextSetIndex = ~~(Math.abs(conWrap.scrollLeft) / this.itemSize);
        var lastIndex = nextSetIndex + this.renderedLength;
        lastIndex = (lastIndex > lastLevel.length - 1) ? lastLevel.length - 1 : lastIndex;
        return this.getCollection(lastIndex - this.renderedLength, lastIndex);
    };
    VirtualScroll.prototype.getCollection = function (startIndex, endIndex) {
        this.translateY = startIndex * this.itemSize;
        var lastLevel = this.getResCollection(startIndex, endIndex);
        if (this.parent.enableRtl) {
            this.translateY = -this.translateY;
        }
        return lastLevel;
    };
    VirtualScroll.prototype.getResCollection = function (startIndex, endIndex) {
        var lastLevel = this.parent.activeView.colLevels[this.parent.activeView.colLevels.length - 1];
        var resCollection = [];
        var index = { startIndex: 0, endIndex: 0 };
        if (this.parent.activeViewOptions.group.byDate) {
            if (lastLevel[parseInt(startIndex.toString(), 10)].date.getTime() ===
                this.parent.resourceBase.expandedResources[0].date.getTime() &&
                lastLevel[parseInt(endIndex.toString(), 10)].date.getTime() ===
                    this.parent.resourceBase.expandedResources[this.parent.resourceBase.expandedResources.length - 1].date.getTime()) {
                return this.parent.resourceBase.expandedResources;
            }
            resCollection =
                this.getByDateCollection(lastLevel[parseInt(startIndex.toString(), 10)], lastLevel[parseInt(endIndex.toString(), 10)], index);
            this.setRenderedDates(resCollection);
        }
        else {
            if (lastLevel[parseInt(startIndex.toString(), 10)].groupIndex === this.parent.resourceBase.expandedResources[0].groupIndex &&
                lastLevel[parseInt(endIndex.toString(), 10)].groupIndex ===
                    this.parent.resourceBase.expandedResources[this.parent.resourceBase.expandedResources.length - 1].groupIndex) {
                return this.parent.resourceBase.expandedResources;
            }
            resCollection =
                this.getByIdCollection(lastLevel[parseInt(startIndex.toString(), 10)], lastLevel[parseInt(endIndex.toString(), 10)], index);
        }
        if (this.parent.currentView !== 'Month') {
            this.startIndex = index.startIndex;
            resCollection = lastLevel.slice(index.startIndex, index.endIndex);
        }
        this.translateY = index.startIndex * this.itemSize;
        return resCollection;
    };
    VirtualScroll.prototype.getByDateCollection = function (firstItem, lastItem, index) {
        var resCollection = this.parent.activeView.colLevels[0].filter(function (data) {
            return firstItem.date.getTime() <= data.date.getTime() &&
                data.date.getTime() <= lastItem.date.getTime();
        });
        this.setStartEndIndex(this.parent.activeView.colLevels[0], resCollection[0], resCollection[resCollection.length - 1], index);
        return resCollection;
    };
    VirtualScroll.prototype.getByIdCollection = function (firstItem, lastItem, index) {
        var resCollection = this.parent.resourceBase.lastResourceLevel.filter(function (data) {
            return firstItem.groupIndex <= data.groupIndex && data.groupIndex <= lastItem.groupIndex;
        });
        this.parent.resourceBase.renderedResources = resCollection;
        this.setStartEndIndex(this.parent.resourceBase.lastResourceLevel, resCollection[0], resCollection[resCollection.length - 1], index);
        return resCollection;
    };
    VirtualScroll.prototype.setStartEndIndex = function (data, firstItem, lastItem, colIndex) {
        var index = 0;
        data.filter(function (data) {
            if (firstItem === data) {
                colIndex.startIndex = index;
            }
            else if (lastItem === data) {
                colIndex.endIndex = index + data.colSpan;
            }
            index += data.colSpan;
        });
        if (firstItem === lastItem) {
            colIndex.endIndex = colIndex.startIndex + lastItem.colSpan;
        }
    };
    VirtualScroll.prototype.updateContent = function (resWrap, conWrap, eventWrap, resCollection) {
        var renderedLength = resWrap.querySelector('tbody').children.length;
        if (document.activeElement && document.activeElement.classList.contains(cls.RESOURCE_CELLS_CLASS)) {
            this.isResourceCell = true;
            this.parent.element.focus();
        }
        for (var i = 0; i < renderedLength; i++) {
            remove(eventWrap.querySelector('div'));
        }
        this.parent.resourceBase.renderedResources = resCollection;
        var currentGroupIndices = this.parent.activeView.getGroupIndices(resCollection);
        var previousGroupIndices = this.parent.activeView.getGroupIndices(this.existingDataCollection);
        var newGroupIndices = currentGroupIndices.filter(function (index) { return previousGroupIndices.indexOf(index) < 0; });
        var resWrapRows = Array.from(resWrap.querySelectorAll('tbody tr'));
        var conWrapRows = Array.from(conWrap.querySelectorAll('tbody tr'));
        var resWrapBody = resWrap.querySelector('tbody');
        var conWrapBody = conWrap.querySelector('tbody');
        this.removeObsoleteRows(resWrapRows, currentGroupIndices);
        this.removeObsoleteRows(conWrapRows, currentGroupIndices);
        var resourceRows = this.parent.resourceBase.getContentRows(resCollection, true);
        var contentRows = this.parent.activeView.getContentRows();
        var eventRows = this.parent.activeView.getEventRows(resCollection.length);
        for (var i = 0; i < newGroupIndices.length; i++) {
            var index = currentGroupIndices.indexOf(newGroupIndices[parseInt(i.toString(), 10)]);
            if (index === 0) {
                prepend([resourceRows[parseInt(i.toString(), 10)]], resWrapBody);
                prepend([contentRows[parseInt(i.toString(), 10)]], conWrapBody);
            }
            else if (resWrapBody && conWrapBody && resWrapBody.children[parseInt(index.toString(), 10)] &&
                conWrapBody.children[parseInt(index.toString(), 10)]) {
                resWrapBody.insertBefore(resourceRows[parseInt(i.toString(), 10)], resWrapBody.children[parseInt(index.toString(), 10)]);
                conWrapBody.insertBefore(contentRows[parseInt(i.toString(), 10)], conWrapBody.children[parseInt(index.toString(), 10)]);
            }
            else {
                append([resourceRows[parseInt(i.toString(), 10)]], resWrapBody);
                append([contentRows[parseInt(i.toString(), 10)]], conWrapBody);
            }
        }
        append(eventRows, eventWrap);
    };
    VirtualScroll.prototype.removeObsoleteRows = function (elements, currentGroupIndices) {
        elements.forEach(function (element) {
            var groupIndex = parseInt(element.firstElementChild.getAttribute('data-group-index'), 10);
            if (currentGroupIndices.indexOf(groupIndex) < 0) {
                remove(element);
            }
        });
    };
    VirtualScroll.prototype.updateHorizontalContent = function (conWrap, resCollection) {
        this.existingDataCollection = this.parent.resourceBase.expandedResources;
        this.parent.resourceBase.expandedResources = resCollection;
        var selectedEle = this.parent.getSelectedCells();
        this.focusedEle = selectedEle[selectedEle.length - 1] || this.focusedEle;
        var tbody = conWrap.querySelector('tbody');
        var renderedRows = Array.from(tbody.querySelectorAll('tr'));
        if (this.parent.currentView === 'Month') {
            this.updateMonthViewContent(conWrap, resCollection);
        }
        else {
            this.updateOtherViewContent(conWrap, resCollection, renderedRows);
        }
    };
    VirtualScroll.prototype.updateMonthViewContent = function (conWrap, resCollection) {
        var renderedLength = conWrap.querySelectorAll(' tr').length;
        for (var i = 0; i < renderedLength; i++) {
            remove(conWrap.querySelector('tbody tr'));
        }
        if (this.parent.activeViewOptions.group.byDate) {
            this.parent.activeView.colLevels[0] = resCollection;
        }
        else {
            this.parent.activeView.colLevels[this.parent.activeView.colLevels.length - 2] = resCollection;
        }
        var contentRows = this.parent.activeView.getContentRows();
        append(contentRows, conWrap.querySelector('tbody'));
    };
    VirtualScroll.prototype.updateOtherViewContent = function (conWrap, resCollection, renderedRows) {
        var tbody = conWrap.querySelector('tbody');
        var colGroup = conWrap.querySelector('colgroup');
        var thead = conWrap.querySelector('thead');
        var table = conWrap.querySelector('table');
        this.parent.activeView.colLevels[this.parent.activeView.colLevels.length - 1] = resCollection;
        var newGroupIndices = new Set(resCollection.map(function (data) { return data.groupIndex; }));
        renderedRows.forEach(function (row) {
            var tdElements = row.querySelectorAll('td');
            tdElements.forEach(function (td) {
                var groupIndex = parseInt(td.getAttribute('data-group-index'), 10);
                if (!newGroupIndices.has(groupIndex)) {
                    td.remove();
                }
            });
        });
        var col = [].slice.call(conWrap.querySelector('colgroup').children);
        for (var i = 0; i < col.length; i++) {
            remove(col[parseInt(i.toString(), 10)]);
        }
        resCollection.forEach(function () { return colGroup.appendChild(createElement('col')); });
        var tHead = [].slice.call(conWrap.querySelector('thead').children);
        for (var i = 0; i < tHead.length; i++) {
            remove(tHead[parseInt(i.toString(), 10)]);
        }
        thead.appendChild(this.parent.eventBase.createEventWrapper('', this.startIndex > 0 ? this.startIndex : 0));
        if (this.parent.activeViewOptions.timeScale.enable) {
            thead.appendChild(this.parent.eventBase.createEventWrapper('timeIndicator'));
        }
        prepend([thead], table);
        var contentRows = this.parent.activeView.getContentRows();
        this.mergeNewTdData(tbody, contentRows);
    };
    VirtualScroll.prototype.mergeNewTdData = function (tbody, contentRows) {
        var existingRows = Array.from(tbody.querySelectorAll('tr'));
        existingRows.forEach(function (existingRow, rowIndex) {
            if (rowIndex < contentRows.length) {
                var newRow = contentRows[parseInt(rowIndex.toString(), 10)];
                var existingTds_1 = Array.from(existingRow.querySelectorAll('td'));
                var newTds = Array.from(newRow.querySelectorAll('td'));
                newTds.forEach(function (newTd) {
                    var newGroupIndex = parseInt(newTd.getAttribute('data-group-index').toString(), 10);
                    var inserted = false;
                    for (var _i = 0, existingTds_2 = existingTds_1; _i < existingTds_2.length; _i++) {
                        var existingTd = existingTds_2[_i];
                        var existingGroupIndex = parseInt(existingTd.getAttribute('data-group-index').toString(), 10);
                        if (newGroupIndex < existingGroupIndex) {
                            existingRow.insertBefore(newTd, existingTd);
                            inserted = true;
                            break;
                        }
                    }
                    if (!inserted) {
                        existingRow.appendChild(newTd);
                    }
                });
            }
        });
    };
    VirtualScroll.prototype.getBufferCollection = function (startIndex, endIndex) {
        return this.parent.resourceBase.expandedResources.slice(startIndex, endIndex);
    };
    VirtualScroll.prototype.setTranslate = function (resWrap, conWrap, eventWrap, timeIndicator) {
        setStyleAttribute(resWrap.querySelector('table'), { transform: "translateY(" + this.translateY + "px)" });
        setStyleAttribute(conWrap.querySelector('table'), { transform: "translateY(" + this.translateY + "px)" });
        setStyleAttribute(eventWrap, { transform: "translateY(" + this.translateY + "px)" });
        if (!isNullOrUndefined(timeIndicator)) {
            setStyleAttribute(timeIndicator, { transform: "translateY(" + this.translateY + "px)" });
        }
    };
    VirtualScroll.prototype.updateFocusedWorkCell = function () {
        if (this.focusedEle) {
            var date = parseInt(this.focusedEle.getAttribute('data-date'), 10);
            var groupIndex = parseInt(this.focusedEle.getAttribute('data-group-index'), 10);
            var ele = this.parent.element.querySelector("." + cls.WORK_CELLS_CLASS + "[data-date=\"" + date + "\"][data-group-index=\"" + groupIndex + "\"]");
            if (ele) {
                this.parent.addSelectedClass([ele], ele, true);
            }
            this.focusedEle = null;
        }
    };
    VirtualScroll.prototype.setRenderedDates = function (resCollection) {
        if (this.parent.currentView !== 'Month') {
            var dateCol_1 = resCollection.map(function (x) { return x.date; });
            this.parent.resourceBase.renderedResources.forEach(function (x) { return x.renderDates = dateCol_1; });
        }
        else {
            var dateCol_2 = resCollection.map(function (x) { return x.date.getDay(); });
            var renderDates_1 = this.parent.activeView.renderDates.filter(function (x) { return dateCol_2.indexOf(x.getDay()) >= 0; });
            this.parent.resourceBase.renderedResources.forEach(function (x) { return x.renderDates = renderDates_1; });
        }
    };
    VirtualScroll.prototype.setTabIndex = function () {
        var resColWrap = this.parent.element.querySelector('.' + cls.RESOURCE_COLUMN_WRAP_CLASS);
        var resCells = [].slice.call(this.parent.element.querySelectorAll('.' + cls.RESOURCE_CELLS_CLASS));
        if (resCells && resColWrap) {
            resCells.forEach(function (element) {
                if (element.getBoundingClientRect().top >= resColWrap.getBoundingClientRect().top) {
                    element.setAttribute('tabindex', '0');
                }
            });
        }
        var focusResCell = this.parent.element.querySelector("." + cls.RESOURCE_CELLS_CLASS + "[tabindex=\"" + 0 + "\"]");
        if (this.isResourceCell && focusResCell) {
            focusResCell.focus();
            this.isResourceCell = false;
        }
    };
    VirtualScroll.prototype.destroy = function () {
        this.removeEventListener();
        this.focusedEle = null;
    };
    return VirtualScroll;
}());
export { VirtualScroll };
