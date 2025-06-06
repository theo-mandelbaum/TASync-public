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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addClass, Browser, EventHandler, remove, closest, extend, formatUnit, setStyleAttribute, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ActionBase } from '../actions/action-base';
import { MonthEvent } from '../event-renderer/month';
import * as util from '../base/util';
import * as event from '../base/constant';
import * as cls from '../base/css-constant';
/**
 * Schedule events resize actions
 */
var Resize = /** @class */ (function (_super) {
    __extends(Resize, _super);
    function Resize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resize.prototype.wireResizeEvent = function (element) {
        var resizeElement = [].slice.call(element.querySelectorAll('.' + cls.EVENT_RESIZE_CLASS));
        for (var _i = 0, resizeElement_1 = resizeElement; _i < resizeElement_1.length; _i++) {
            var element_1 = resizeElement_1[_i];
            EventHandler.add(element_1, Browser.touchStartEvent, this.resizeStart, this);
        }
    };
    Resize.prototype.resizeHelper = function () {
        if (this.parent.activeViewOptions.group.resources.length > 0 && this.parent.activeViewOptions.group.allowGroupEdit) {
            for (var i = 0, len = this.actionObj.originalElement.length; i < len; i++) {
                var cloneElement = this.createCloneElement(this.actionObj.originalElement[parseInt(i.toString(), 10)]);
                this.actionObj.cloneElement[parseInt(i.toString(), 10)] = cloneElement;
                if (this.actionObj.element === this.actionObj.originalElement[parseInt(i.toString(), 10)]) {
                    this.actionObj.clone = cloneElement;
                }
            }
        }
        else {
            if (this.actionObj.element) {
                this.actionObj.clone = this.createCloneElement(this.actionObj.element);
            }
            this.actionObj.cloneElement = [this.actionObj.clone];
            this.actionObj.originalElement = [this.actionObj.element];
        }
    };
    Resize.prototype.resizeStart = function (e) {
        var _this = this;
        if (e && e.type === 'touchstart' && (!this.parent.uiStateValues.isTapHold ||
            !closest(e.target, '.' + cls.APPOINTMENT_BORDER))) {
            return;
        }
        this.parent.eventBase.removeSelectedAppointmentClass();
        this.actionObj.action = 'resize';
        this.actionObj.slotInterval = this.parent.activeViewOptions.timeScale.interval / this.parent.activeViewOptions.timeScale.slotCount;
        this.actionObj.interval = this.actionObj.slotInterval;
        var resizeTarget = closest(e.target, '.' + cls.EVENT_RESIZE_CLASS);
        this.actionObj.element = closest(resizeTarget, '.' + cls.APPOINTMENT_CLASS);
        this.actionObj.event = this.parent.eventBase.getEventByGuid(this.actionObj.element.getAttribute('data-guid'));
        var eventObj = extend({}, this.actionObj.event, null, true);
        var resizeArgs = {
            cancel: false,
            data: eventObj,
            element: this.actionObj.element,
            event: e,
            interval: this.actionObj.interval,
            scroll: { enable: true, scrollBy: 30, timeDelay: 100 }
        };
        this.parent.trigger(event.resizeStart, resizeArgs, function (resizeEventArgs) {
            if (resizeEventArgs.cancel) {
                return;
            }
            _this.actionClass('addClass');
            _this.parent.uiStateValues.action = true;
            _this.resizeEdges = {
                left: resizeTarget.classList.contains(cls.LEFT_RESIZE_HANDLER),
                right: resizeTarget.classList.contains(cls.RIGHT_RESIZE_HANDLER),
                top: resizeTarget.classList.contains(cls.TOP_RESIZE_HANDLER),
                bottom: resizeTarget.classList.contains(cls.BOTTOM_RESIZE_HANDLER)
            };
            _this.actionObj.groupIndex = _this.parent.uiStateValues.isGroupAdaptive ? _this.parent.uiStateValues.groupIndex : 0;
            var workCell = _this.parent.element.querySelector('.' + cls.WORK_CELLS_CLASS);
            _this.actionObj.cellWidth = _this.parent.getElementWidth(workCell);
            _this.actionObj.cellHeight = _this.parent.getElementHeight(workCell);
            var hRows = _this.parent.activeViewOptions.headerRows.map(function (row) { return row.option; });
            if (_this.parent.activeView.isTimelineView() && hRows.length > 0 && ['Date', 'Hour'].indexOf(hRows.slice(-1)[0]) < 0) {
                var tr = _this.parent.getContentTable().querySelector('tr');
                var noOfDays = 0;
                var tdCollections = [].slice.call(tr.children);
                for (var _i = 0, tdCollections_1 = tdCollections; _i < tdCollections_1.length; _i++) {
                    var td = tdCollections_1[_i];
                    noOfDays += parseInt(td.getAttribute('colspan'), 10);
                }
                var trRect = tr.getBoundingClientRect();
                _this.actionObj.cellWidth = trRect.width / noOfDays;
                _this.actionObj.cellHeight = trRect.height;
            }
            var pages = _this.parent.eventBase.getPageCoordinates(e);
            _this.actionObj.X = pages.pageX;
            _this.actionObj.Y = pages.pageY;
            _this.actionObj.groupIndex = parseInt(_this.actionObj.element.getAttribute('data-group-index') || '0', 10);
            _this.actionObj.interval = resizeEventArgs.interval;
            _this.actionObj.scroll = resizeEventArgs.scroll;
            _this.actionObj.start = new Date(eventObj[_this.parent.eventFields.startTime].getTime());
            _this.actionObj.end = new Date(eventObj[_this.parent.eventFields.endTime].getTime());
            _this.actionObj.originalElement = _this.getOriginalElement(_this.actionObj.element);
            if (_this.parent.currentView === 'Month') {
                _this.daysVariation = -1;
                _this.monthEvent = new MonthEvent(_this.parent);
            }
            var viewElement = _this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
            _this.scrollArgs = { element: viewElement, width: viewElement.scrollWidth, height: viewElement.scrollHeight };
            // 883565 - To fix the resizing not working issue at the last column of the timeline view
            if (['Month', 'TimelineYear'].indexOf(_this.parent.currentView) < 0) {
                var scrollWidth = Math.round(_this.scrollArgs.width / _this.actionObj.cellWidth) * _this.actionObj.cellWidth;
                _this.scrollArgs.width = _this.scrollArgs.width < scrollWidth ? scrollWidth : _this.scrollArgs.width;
            }
            EventHandler.add(document, Browser.touchMoveEvent, _this.resizing, _this);
            EventHandler.add(document, Browser.touchEndEvent, _this.resizeStop, _this);
        });
    };
    Resize.prototype.resizing = function (e) {
        if (e && e.type === 'touchmove') {
            e.preventDefault();
        }
        if (this.parent.quickPopup) {
            this.parent.quickPopup.quickPopupHide();
        }
        if (this.parent.element.querySelectorAll('.' + cls.RESIZE_CLONE_CLASS).length === 0) {
            this.resizeHelper();
        }
        if ((!isNullOrUndefined(e.target)) && e.target.classList.contains(cls.DISABLE_DATES)) {
            return;
        }
        var pages = this.parent.eventBase.getPageCoordinates(e);
        if (this.parent.currentView === 'Month' || this.parent.currentView === 'TimelineYear') {
            var doc = document.documentElement;
            var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var top_1 = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            this.actionObj.pageX = pages.pageX - left;
            this.actionObj.pageY = pages.pageY - top_1;
        }
        else {
            this.actionObj.pageX = pages.pageX;
            this.actionObj.pageY = pages.pageY;
        }
        this.updateScrollPosition(e);
        this.updateResizingDirection(e);
        var eventObj = extend({}, this.actionObj.event, null, true);
        var resizeArgs = {
            cancel: false,
            data: eventObj,
            element: this.actionObj.element,
            event: e,
            startTime: this.actionObj.start,
            endTime: this.actionObj.end
        };
        if (this.parent.group.resources.length > 0) {
            resizeArgs.groupIndex = this.actionObj.groupIndex;
        }
        this.parent.trigger(event.resizing, resizeArgs);
    };
    Resize.prototype.updateResizingDirection = function (e) {
        if (this.parent.currentView === 'Month' || this.parent.currentView === 'TimelineYear') {
            this.monthResizing();
            return;
        }
        var resizeValidation = this.resizeValidation(e);
        if (this.resizeEdges.left) {
            if (resizeValidation) {
                var leftStyles = this.getLeftRightStyles(e, true);
                if (parseInt(leftStyles.width, 10) < 1) {
                    return;
                }
                for (var _i = 0, _a = this.actionObj.cloneElement; _i < _a.length; _i++) {
                    var cloneElement = _a[_i];
                    setStyleAttribute(cloneElement, leftStyles);
                    addClass([cloneElement], cls.LEFT_RESIZE_HANDLER);
                }
            }
            this.horizontalResizing(!this.parent.enableRtl);
        }
        if (this.resizeEdges.right) {
            if (resizeValidation) {
                var rightStyles = this.getLeftRightStyles(e, false);
                if (parseInt(rightStyles.width, 10) < 1) {
                    return;
                }
                for (var _b = 0, _c = this.actionObj.cloneElement; _b < _c.length; _b++) {
                    var cloneElement = _c[_b];
                    setStyleAttribute(cloneElement, rightStyles);
                    addClass([cloneElement], cls.RIGHT_RESIZE_HANDLER);
                }
            }
            this.horizontalResizing(this.parent.enableRtl);
        }
        if (this.resizeEdges.top) {
            if (resizeValidation) {
                var topStyles = this.getTopBottomStyles(e, true);
                if (parseInt(topStyles.height, 10) < 1) {
                    return;
                }
                for (var _d = 0, _e = this.actionObj.cloneElement; _d < _e.length; _d++) {
                    var cloneElement = _e[_d];
                    setStyleAttribute(cloneElement, topStyles);
                    addClass([cloneElement], cls.TOP_RESIZE_HANDLER);
                }
            }
            this.verticalResizing(true);
        }
        if (this.resizeEdges.bottom) {
            if (resizeValidation) {
                var bottomStyles = this.getTopBottomStyles(e, false);
                if (parseInt(bottomStyles.height, 10) < 1) {
                    return;
                }
                for (var _f = 0, _g = this.actionObj.cloneElement; _f < _g.length; _f++) {
                    var cloneElement = _g[_f];
                    setStyleAttribute(cloneElement, bottomStyles);
                    addClass([cloneElement], cls.BOTTOM_RESIZE_HANDLER);
                }
            }
            this.verticalResizing(false);
        }
    };
    Resize.prototype.monthResizing = function () {
        this.removeCloneElement();
        if (isNullOrUndefined(this.actionObj.pageX) || isNullOrUndefined(this.actionObj.pageY)) {
            return;
        }
        var td = document.elementFromPoint(this.actionObj.pageX, this.actionObj.pageY);
        if (isNullOrUndefined(td)) {
            return;
        }
        var resizeTime = this.parent.getDateFromElement(td);
        var isSameCell = this.parent.activeViewOptions.group.resources.length > 0 ?
            parseInt(td.getAttribute('data-group-index'), 10) === this.actionObj.groupIndex : true;
        var startTime = new Date(this.actionObj.event[this.parent.eventFields.startTime].getTime());
        var endTime = new Date(this.actionObj.event[this.parent.eventFields.endTime].getTime());
        if ((!this.parent.enableRtl && this.resizeEdges.left) || (this.parent.enableRtl && this.resizeEdges.right)
            || this.resizeEdges.top) {
            startTime = resizeTime;
        }
        else if ((!this.parent.enableRtl && this.resizeEdges.right) || (this.parent.enableRtl && this.resizeEdges.left)
            || this.resizeEdges.bottom) {
            endTime = util.addDays(resizeTime, 1);
        }
        if (isSameCell && startTime < endTime) {
            this.actionObj.start = startTime;
            this.actionObj.end = endTime;
            var event_1 = this.getUpdatedEvent(this.actionObj.start, this.actionObj.end, this.actionObj.event);
            if (this.parent.currentView === 'TimelineYear') {
                this.yearEventsRendering(event_1);
            }
            else {
                this.dynamicEventsRendering(event_1);
            }
            this.updateOriginalElement(this.actionObj.clone);
        }
    };
    Resize.prototype.yearEventsRendering = function (event) {
        var eventWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CLONE_ELEMENT_CLASS));
        for (var _i = 0, eventWrappers_1 = eventWrappers; _i < eventWrappers_1.length; _i++) {
            var wrapper = eventWrappers_1[_i];
            remove(wrapper);
        }
        var endDate = new Date(event[this.parent.eventFields.endTime]);
        var monthDiff = 0;
        if (this.parent.activeViewOptions.group.resources.length === 0) {
            monthDiff = this.getMonthDiff(event[this.parent.eventFields.startTime], util.addDays(endDate, -1));
        }
        for (var i = 0; i <= monthDiff; i++) {
            var eventObj = void 0;
            if (this.parent.activeViewOptions.group.resources.length === 0) {
                eventObj = this.getEventCount(event, this.actionObj.start.getMonth() + i);
            }
            else {
                eventObj = extend({}, event, null, true);
                endDate = this.resizeEdges.left || this.resizeEdges.right ? util.addDays(endDate, -1) : endDate;
                eventObj.count = this.getMonthDiff(event[this.parent.eventFields.startTime], endDate) + 1;
            }
            this.dynamicYearlyEventsRendering(eventObj, true);
        }
    };
    Resize.prototype.getMonthDiff = function (startDate, endDate) {
        var months;
        months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        months -= startDate.getMonth();
        months += endDate.getMonth();
        return months <= 0 ? 0 : months;
    };
    Resize.prototype.getEventCount = function (eventObj, month) {
        var eventData = extend({}, eventObj, null, true);
        var eventStart = eventData[this.parent.eventFields.startTime];
        var eventEnd = eventData[this.parent.eventFields.endTime];
        var monthStart = new Date(this.parent.selectedDate.getFullYear(), month, 1);
        var monthEnd = util.addDays(new Date(this.parent.selectedDate.getFullYear(), month + 1, 0), 1);
        var count = 1;
        if (eventStart.getTime() < monthStart.getTime()) {
            eventData[this.parent.eventFields.startTime] = monthStart;
        }
        if (eventEnd.getTime() > monthEnd.getTime()) {
            eventData[this.parent.eventFields.endTime] = monthEnd;
        }
        if (this.parent.activeViewOptions.group.resources.length === 0) {
            count = Math.ceil((eventData[this.parent.eventFields.endTime].getTime() -
                eventData[this.parent.eventFields.startTime].getTime()) / util.MS_PER_DAY);
        }
        eventData.count = count;
        return eventData;
    };
    Resize.prototype.resizeStop = function (e) {
        var _this = this;
        EventHandler.remove(document, Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(document, Browser.touchEndEvent, this.resizeStop);
        clearInterval(this.actionObj.scrollInterval);
        this.actionObj.scrollInterval = null;
        this.actionObj.action = null;
        this.removeCloneElementClasses();
        this.removeCloneElement();
        this.actionClass('removeClass');
        this.parent.uiStateValues.action = this.parent.uiStateValues.isTapHold = false;
        var resizeArgs = { cancel: false, data: this.getChangedData(), element: this.actionObj.element, event: e };
        this.parent.trigger(event.resizeStop, resizeArgs, function (resizeEventArgs) {
            if (resizeEventArgs.cancel) {
                return;
            }
            if (_this.parent.eventBase.checkOverlap(resizeEventArgs.data)) {
                return;
            }
            if (_this.parent.isSpecificResourceEvents()) {
                _this.parent.crudModule.crudObj.sourceEvent =
                    [_this.parent.resourceBase.lastResourceLevel[parseInt(resizeEventArgs.element.getAttribute('data-group-index'), 10)]];
                _this.parent.crudModule.crudObj.targetEvent = _this.parent.crudModule.crudObj.sourceEvent;
                _this.parent.crudModule.crudObj.isCrudAction = true;
            }
            _this.saveChangedData(resizeEventArgs);
        });
    };
    Resize.prototype.verticalResizing = function (isTop) {
        var offsetValue = this.actionObj.clone.offsetTop;
        if (!isTop) {
            offsetValue += this.actionObj.clone.offsetHeight;
        }
        var minutes = (offsetValue / this.actionObj.cellHeight) * this.actionObj.slotInterval;
        var element = this.actionObj.clone.offsetParent;
        if (isNullOrUndefined(element)) {
            return;
        }
        var resizeTime = util.resetTime(this.parent.getDateFromElement(element));
        resizeTime.setHours(this.parent.activeView.getStartHour().getHours());
        resizeTime.setMinutes(minutes + this.parent.activeView.getStartHour().getMinutes());
        if (isTop) {
            this.actionObj.start = this.calculateIntervalTime(resizeTime);
        }
        else {
            this.actionObj.end = this.calculateIntervalTime(resizeTime);
        }
        this.updateTimePosition(resizeTime);
    };
    Resize.prototype.horizontalResizing = function (isLeft) {
        var eventStart = new Date(this.actionObj.event[this.parent.eventFields.startTime].getTime());
        var eventEnd = new Date(this.actionObj.event[this.parent.eventFields.endTime].getTime());
        var resizeTime;
        var headerName = this.parent.currentView;
        var isTimelineMonth = this.parent.currentView === 'TimelineMonth';
        if (this.parent.activeView.isTimelineView()) {
            var tr = this.parent.getContentTable().querySelector('tr');
            if (this.parent.activeViewOptions.headerRows.length > 0) {
                var rows = this.parent.activeViewOptions.headerRows.map(function (row) { return row.option; });
                headerName = rows.slice(-1)[0];
                if (isTimelineMonth && headerName === 'Hour') {
                    headerName = rows.slice(-2)[0] || 'Month';
                }
            }
            resizeTime = isLeft ? eventStart : eventEnd;
            var cellIndex = 0;
            var tdCollections = [].slice.call(tr.children);
            var isLastCell = false;
            var pixelsPerMinute = this.actionObj.cellWidth / (this.parent.activeViewOptions.timeScale.interval /
                this.parent.activeViewOptions.timeScale.slotCount);
            var offset = parseFloat(this.parent.enableRtl ? this.actionObj.clone.style.right :
                this.actionObj.clone.style.left);
            offset = Math.round(offset / pixelsPerMinute) * pixelsPerMinute;
            if (['Year', 'Month', 'Week', 'Date'].indexOf(headerName) !== -1) {
                var noOfDays = 0;
                for (var _i = 0, tdCollections_2 = tdCollections; _i < tdCollections_2.length; _i++) {
                    var td = tdCollections_2[_i];
                    noOfDays += parseInt(td.getAttribute('colspan'), 10);
                }
                var offsetValue = this.parent.enableRtl ? parseInt(this.actionObj.clone.style.right, 10) :
                    parseInt(this.actionObj.clone.style.left, 10);
                offsetValue = Math.round(offsetValue / this.actionObj.cellWidth) * this.actionObj.cellWidth;
                if (!isLeft) {
                    offsetValue += (this.parent.getElementWidth(this.actionObj.clone) - this.actionObj.cellWidth);
                }
                cellIndex = !isTimelineMonth ? Math.round(offsetValue / (this.parent.getElementWidth(tr) / noOfDays)) :
                    Math.floor(offsetValue / Math.floor(this.parent.getElementWidth(tr) / noOfDays));
                cellIndex = isLeft ? cellIndex : isTimelineMonth ? cellIndex + 1 : cellIndex;
                isLastCell = cellIndex === tdCollections.length;
                cellIndex = (cellIndex < 0) ? 0 : (cellIndex >= noOfDays) ? noOfDays - 1 : cellIndex;
            }
            else {
                var cellWidth = this.actionObj.cellWidth;
                cellIndex = isLeft ? Math.round(offset / this.actionObj.cellWidth) :
                    Math.ceil((offset + (this.parent.getElementWidth(this.actionObj.clone) - cellWidth)) / this.actionObj.cellWidth);
                if (this.parent.enableRtl) {
                    var offsetWidth = (Math.round(offset / this.actionObj.cellWidth) *
                        this.actionObj.cellWidth) + (isLeft ? 0 : (this.parent.getElementWidth(this.actionObj.clone) -
                        this.actionObj.cellWidth));
                    cellIndex = Math.floor(offsetWidth / this.actionObj.cellWidth);
                }
                isLastCell = cellIndex === tdCollections.length;
                cellIndex = this.getIndex(cellIndex);
            }
            var resizeDate = void 0;
            if (['Year', 'Month', 'Week', 'Date'].indexOf(headerName) !== -1) {
                resizeDate = new Date(this.parent.activeView.renderDates[parseInt(cellIndex.toString(), 10)].getTime());
            }
            else {
                resizeDate = this.parent.getDateFromElement(tr.children[parseInt(cellIndex.toString(), 10)]);
            }
            if (['TimelineMonth', 'Year', 'Month', 'Week', 'Date'].indexOf(headerName) !== -1 ||
                !this.parent.activeViewOptions.timeScale.enable) {
                resizeTime = new Date(resizeDate.setHours(resizeTime.getHours(), resizeTime.getMinutes(), resizeTime.getSeconds()));
            }
            else {
                if (!isLeft) {
                    offset += this.parent.getElementWidth(this.actionObj.clone);
                }
                var spanMinutes = Math.floor((this.actionObj.slotInterval / this.actionObj.cellWidth) *
                    (offset - Math.floor(offset / this.actionObj.cellWidth) * this.actionObj.cellWidth));
                spanMinutes = (isLastCell || (!isLeft && spanMinutes === 0)) ? this.actionObj.slotInterval : spanMinutes;
                resizeTime = new Date(resizeDate.getTime());
                resizeTime = new Date(resizeDate.getTime() + (spanMinutes * util.MS_PER_MINUTE));
                this.updateTimePosition(resizeTime);
            }
        }
        else {
            var cloneIndex = closest(this.actionObj.clone, 'td').cellIndex;
            var originalWidth = Math.ceil((isLeft ? this.parent.getElementWidth(this.actionObj.element) : 0) /
                this.actionObj.cellWidth) * this.actionObj.cellWidth;
            var noOfDays = Math.ceil((this.parent.getElementWidth(this.actionObj.clone) - originalWidth) /
                this.actionObj.cellWidth);
            var tr = closest(this.actionObj.clone, 'tr');
            var dayIndex = isLeft ? cloneIndex - noOfDays : cloneIndex + noOfDays - 1;
            dayIndex = this.getIndex(dayIndex);
            resizeTime = this.parent.getDateFromElement(tr.children[parseInt(dayIndex.toString(), 10)]);
            if (isLeft) {
                resizeTime.setHours(eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds());
            }
            else {
                resizeTime.setHours(eventEnd.getHours(), eventEnd.getMinutes(), eventEnd.getSeconds());
            }
        }
        var isNotHourSlot = ['TimelineMonth', 'Year', 'Month', 'Week', 'WorkWeek', 'Date', 'Day'].indexOf(headerName) !== -1 ||
            !this.parent.activeViewOptions.timeScale.enable;
        if (isLeft) {
            if ((eventEnd.getTime() - resizeTime.getTime()) <= 0) {
                resizeTime = isNotHourSlot ? util.resetTime(eventEnd) : eventStart;
            }
            this.actionObj.start = !isNotHourSlot ? this.calculateIntervalTime(resizeTime) : resizeTime;
        }
        else {
            var resizeEnd = (isNotHourSlot && resizeTime.getHours() === 0 && resizeTime.getMinutes() === 0) ?
                util.addDays(resizeTime, 1) : resizeTime;
            if (isNotHourSlot && (resizeEnd.getTime() - eventStart.getTime()) <= 0) {
                resizeEnd = util.addDays(util.resetTime(eventStart), 1);
            }
            this.actionObj.end = !isNotHourSlot ? this.calculateIntervalTime(resizeEnd) : resizeEnd;
        }
    };
    Resize.prototype.getTopBottomStyles = function (e, isTop) {
        var viewElement = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var slotInterval = (this.actionObj.cellHeight / this.actionObj.slotInterval) * this.actionObj.interval;
        var clnHeight = isTop ? this.actionObj.element.offsetHeight + (this.actionObj.Y - this.actionObj.pageY) :
            this.actionObj.element.offsetHeight + (this.actionObj.pageY - this.actionObj.Y);
        var clnTop = isTop ? this.actionObj.element.offsetTop -
            (this.actionObj.Y - this.actionObj.pageY) : this.actionObj.clone.offsetTop;
        clnHeight = (clnTop < 0) ? this.actionObj.clone.offsetHeight :
            (this.actionObj.clone.offsetTop + this.actionObj.clone.offsetHeight) > this.scrollArgs.height ?
                this.actionObj.clone.offsetHeight : clnHeight;
        clnTop = (clnTop < 0) ? 0 : clnTop;
        clnTop = isTop ? Math.floor(clnTop / slotInterval) * slotInterval : clnTop;
        clnHeight = clnTop + clnHeight >= viewElement.scrollHeight ? viewElement.scrollHeight - clnTop :
            Math.ceil(clnHeight / slotInterval) * slotInterval;
        if (!isTop && this.actionObj.clone.offsetTop + clnHeight >= this.parent.getContentTable().offsetHeight) {
            clnHeight = this.parent.getContentTable().offsetHeight - this.actionObj.clone.offsetTop;
        }
        var styles = {
            height: formatUnit(clnHeight < this.actionObj.cellHeight ? Math.floor(clnHeight / slotInterval) * slotInterval : clnHeight),
            top: formatUnit((clnHeight < this.actionObj.cellHeight && isTop) ? Math.ceil(clnTop / slotInterval) * slotInterval : clnTop),
            left: '0px', right: '0px', width: '100%'
        };
        return styles;
    };
    Resize.prototype.getLeftRightStyles = function (e, isLeft) {
        var styles = {};
        var isTimelineView = this.parent.activeView.isTimelineView();
        var isTimeViews = ['TimelineDay', 'TimelineWeek', 'TimelineWorkWeek'].indexOf(this.parent.currentView) > -1 &&
            this.parent.activeViewOptions.timeScale.enable;
        var slotInterval = (this.actionObj.cellWidth / this.actionObj.slotInterval) * this.actionObj.interval;
        var pageWidth = isLeft ? (this.actionObj.X - this.actionObj.pageX) : (this.actionObj.pageX - this.actionObj.X);
        var targetWidth = isTimelineView ?
            Math.round(this.parent.getElementWidth(this.actionObj.element) / this.actionObj.cellWidth) * this.actionObj.cellWidth :
            this.parent.currentView === 'Month' ? this.parent.getElementWidth(this.actionObj.element) :
                Math.ceil(this.parent.getElementWidth(this.actionObj.element) / this.actionObj.cellWidth) * this.actionObj.cellWidth;
        var offsetWidth = targetWidth + (Math.ceil(pageWidth / this.actionObj.cellWidth) * this.actionObj.cellWidth);
        var left = (this.parent.enableRtl) ? parseInt(this.actionObj.element.style.right, 10) : this.actionObj.clone.offsetLeft;
        left = Math.round(left / slotInterval) * slotInterval;
        if (isTimeViews) {
            offsetWidth = targetWidth + (Math.ceil(pageWidth / slotInterval) * slotInterval);
            if (!isLeft) {
                var roundedLeft = (+parseFloat(this.actionObj.element.style[this.parent.enableRtl ? 'right' : 'left'])).toFixed(1);
                var roundedWidth = Math.round(targetWidth / slotInterval) * slotInterval;
                if (roundedLeft !== left.toFixed(1) || roundedWidth !== targetWidth) {
                    offsetWidth = (Math.round((left + offsetWidth) / slotInterval) * slotInterval) - left;
                }
            }
            this.actionObj.event[this.parent.eventFields.isAllDay] = false;
        }
        var width = !isLeft && ((offsetWidth + this.actionObj.clone.offsetLeft > this.scrollArgs.width)) ?
            this.parent.getElementWidth(this.actionObj.clone) : (offsetWidth < this.actionObj.cellWidth) ? offsetWidth : offsetWidth;
        if (this.parent.enableRtl) {
            var rightValue = isTimelineView ? parseInt(this.actionObj.element.style.right, 10) :
                -(offsetWidth - this.actionObj.cellWidth);
            rightValue = isTimelineView ? rightValue : isLeft ? 0 : rightValue > 0 ? 0 : rightValue;
            if (isTimelineView && !isLeft) {
                rightValue = Math.round(rightValue / slotInterval) * slotInterval;
                rightValue = rightValue - (Math.ceil((this.actionObj.pageX - this.actionObj.X) / slotInterval) * slotInterval);
                if (rightValue < 0) {
                    rightValue = parseInt(this.actionObj.clone.style.right, 10);
                    width = parseInt(this.actionObj.clone.style.width, 10);
                }
            }
            rightValue = rightValue >= this.scrollArgs.width ? this.scrollArgs.width - this.actionObj.cellWidth : rightValue;
            styles.right = formatUnit(rightValue);
            width = width + rightValue > this.scrollArgs.width ? this.parent.getElementWidth(this.actionObj.clone) : width;
        }
        else {
            var offsetLeft = isLeft ? this.actionObj.element.offsetLeft - (this.actionObj.X - this.actionObj.pageX) :
                this.parent.enableRtl ? this.actionObj.element.offsetLeft : 0;
            if (isTimelineView) {
                offsetLeft = isLeft ? offsetLeft : parseInt(this.actionObj.clone.style.left, 10);
                if (this.parent.enableRtl) {
                    offsetLeft = !isLeft ? (this.actionObj.pageX < this.actionObj.X - this.parent.getElementWidth(this.actionObj.clone))
                        ? parseInt(this.actionObj.clone.style.right, 10) : offsetLeft : offsetLeft;
                }
                else {
                    offsetLeft = isLeft ? (this.actionObj.pageX > this.actionObj.X + this.parent.getElementWidth(this.actionObj.clone) &&
                        this.parent.getElementWidth(this.actionObj.clone) === this.actionObj.cellWidth) ?
                        parseInt(this.actionObj.clone.style.left, 10) : offsetLeft : offsetLeft;
                }
            }
            var leftValue = offsetLeft;
            offsetLeft = isTimelineView ? isTimeViews ? isLeft ? this.actionObj.element.offsetLeft -
                (Math.ceil((this.actionObj.element.offsetLeft - offsetLeft) / slotInterval) * slotInterval) : offsetLeft :
                Math.floor(offsetLeft / this.actionObj.cellWidth) * this.actionObj.cellWidth :
                Math.ceil(Math.abs(offsetLeft) / this.actionObj.cellWidth) * this.actionObj.cellWidth;
            if (offsetLeft < 0) {
                if (isTimelineView && isLeft && (offsetLeft % slotInterval)) {
                    offsetLeft = parseInt(this.actionObj.clone.style.left, 10);
                    width = parseInt(this.actionObj.clone.style.width, 10);
                }
                else {
                    offsetLeft = 0;
                    width = this.parent.getElementWidth(this.actionObj.clone);
                }
            }
            var cloneWidth = Math.ceil(this.parent.getElementWidth(this.actionObj.clone) / this.actionObj.cellWidth) *
                this.actionObj.cellWidth;
            if (isLeft) {
                styles.left = formatUnit(isTimelineView ? offsetLeft : isLeft ? leftValue < 0 ? -offsetLeft :
                    (Math.ceil((targetWidth - cloneWidth) / this.actionObj.cellWidth) * this.actionObj.cellWidth) : offsetLeft);
            }
        }
        styles.width = formatUnit(width);
        return styles;
    };
    Resize.prototype.resizeValidation = function (e) {
        var pages = this.parent.eventBase.getPageCoordinates(e);
        var viewDimension = this.getContentAreaDimension();
        var isTimeScale = this.parent.activeView.isTimelineView() && this.parent.activeViewOptions.timeScale.enable;
        var cellWidth = this.actionObj.cellWidth;
        var resizeValidation = false;
        if (this.resizeEdges.left) {
            if (pages.pageX < viewDimension.leftOffset && pages.pageX >= viewDimension.left && isTimeScale) {
                cellWidth = 0;
            }
            resizeValidation = (pages.pageX - cellWidth) >= viewDimension.left;
        }
        if (this.resizeEdges.right) {
            if (pages.pageX > viewDimension.rightOffset && pages.pageX <= viewDimension.right && isTimeScale) {
                cellWidth = 0;
            }
            resizeValidation = (pages.pageX + cellWidth) <= viewDimension.right;
        }
        if (this.resizeEdges.top) {
            resizeValidation = this.actionObj.clone.offsetTop >= viewDimension.top;
        }
        if (this.resizeEdges.bottom) {
            resizeValidation = (this.actionObj.clone.offsetTop + this.actionObj.clone.offsetHeight) <= this.scrollArgs.height;
        }
        return resizeValidation;
    };
    /**
     * Get module name
     *
     * @returns {string} Returns the module name..
     */
    Resize.prototype.getModuleName = function () {
        return 'resize';
    };
    return Resize;
}(ActionBase));
export { Resize };
