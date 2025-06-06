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
import { createElement, closest, Draggable, extend, formatUnit, isNullOrUndefined } from '@syncfusion/ej2-base';
import { addClass, remove, removeClass, setStyleAttribute } from '@syncfusion/ej2-base';
import { ActionBase } from '../actions/action-base';
import { MonthEvent } from '../event-renderer/month';
import { TimelineEvent } from '../event-renderer/timeline-view';
import { YearEvent } from '../event-renderer/year';
import { VerticalEvent } from '../event-renderer/vertical-view';
import * as cls from '../base/css-constant';
import * as events from '../base/constant';
import * as util from '../base/util';
var MINUTES_PER_DAY = 1440;
/**
 * Schedule events drag actions
 */
var DragAndDrop = /** @class */ (function (_super) {
    __extends(DragAndDrop, _super);
    function DragAndDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.widthUptoCursorPoint = 0;
        _this.heightUptoCursorPoint = 0;
        _this.cursorPointIndex = 0;
        _this.isHeaderRows = false;
        _this.isTimelineDayProcess = false;
        _this.widthPerMinute = 0;
        _this.heightPerMinute = 0;
        _this.minDiff = 0;
        _this.isStepDragging = false;
        _this.isMorePopupOpened = false;
        _this.isAllDayDrag = false;
        _this.isMultiSelect = false;
        _this.multiData = [];
        _this.updatedData = [];
        _this.swagData = [];
        _this.startTime = 0;
        _this.isAllDayTarget = false;
        _this.targetTd = null;
        _this.isCursorAhead = false;
        _this.enableCurrentViewDrag = false;
        _this.isPreventMultiDrag = false;
        _this.slotsUptoCursor = -1;
        _this.eleTop = 0;
        _this.distanceUptoCursor = 0;
        return _this;
    }
    DragAndDrop.prototype.wireDragEvent = function (element) {
        new Draggable(element, {
            abort: '.' + cls.EVENT_RESIZE_CLASS,
            clone: true,
            isDragScroll: true,
            enableTailMode: this.parent.eventDragArea ? true : false,
            cursorAt: (this.parent.eventDragArea) ? { left: -20, top: -20 } : { left: 0, top: 0 },
            dragArea: this.dragArea,
            dragStart: this.dragStart.bind(this),
            drag: this.drag.bind(this),
            dragStop: this.dragStop.bind(this),
            enableAutoScroll: false,
            helper: this.dragHelper.bind(this),
            queryPositionInfo: this.dragPosition.bind(this)
        });
    };
    DragAndDrop.prototype.setDragArea = function () {
        var dragElement = document.querySelector(this.parent.eventDragArea);
        this.dragArea = this.parent.eventDragArea && dragElement ? dragElement :
            this.parent.element.querySelector('.' + cls.CONTENT_TABLE_CLASS);
    };
    DragAndDrop.prototype.dragHelper = function (e) {
        var _this = this;
        if (e.sender && e.sender.type === 'touchmove' && (!this.parent.uiStateValues.isTapHold ||
            !e.element.classList.contains(cls.APPOINTMENT_BORDER))) {
            return null;
        }
        this.setDragActionDefaultValues();
        this.actionObj.element = e.element;
        if (e.sender && ['Day', 'Week', 'WorkWeek'].indexOf(this.parent.currentView) > -1) {
            var eventArgs = this.parent.eventBase.getPageCoordinates(e.sender);
            this.distanceUptoCursor = eventArgs.clientY - this.actionObj.element.getBoundingClientRect().top;
            this.eleTop = parseFloat(this.actionObj.element.style.top);
            this.slotsUptoCursor = -1;
        }
        this.actionObj.action = 'drag';
        var elements = [];
        if (!this.parent.allowMultiDrag || isNullOrUndefined(this.parent.selectedElements) || this.parent.selectedElements.length === 0 ||
            (this.parent.selectedElements.length > 0 && this.parent.selectedElements.indexOf(this.actionObj.element) === -1)) {
            elements = [e.element];
        }
        else {
            elements = this.parent.selectedElements;
            this.isMultiSelect = true;
        }
        elements.forEach(function (ele) {
            var cloneElement = _this.createCloneElement(ele);
            if (ele.getAttribute('data-guid') === _this.actionObj.element.getAttribute('data-guid')) {
                _this.actionObj.clone = cloneElement;
                if (!_this.parent.eventDragArea && _this.parent.currentView !== 'Month' &&
                    _this.parent.activeViewOptions.timeScale.enable && !_this.parent.activeView.isTimelineView() &&
                    !_this.actionObj.element.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
                    setStyleAttribute(_this.actionObj.clone, { cursor: 'move', left: '0%', right: '0%', width: '100%' });
                }
                _this.actionObj.clone.style.top = formatUnit(_this.actionObj.element.offsetTop);
            }
            _this.actionObj.cloneElement.push(cloneElement);
            _this.actionObj.originalElement.push(ele);
        });
        return this.actionObj.clone;
    };
    DragAndDrop.prototype.dragPosition = function (e) {
        if (this.parent.eventDragArea) {
            return { left: e.left, top: e.top };
        }
        var cellHeight = (this.actionObj.cellHeight / this.actionObj.slotInterval) * this.actionObj.interval;
        var leftValue = formatUnit(0);
        if (this.parent.currentView === 'Month') {
            leftValue = e.left;
        }
        var cloneRight;
        if (this.isStepDragging) {
            cloneRight = Math.ceil(this.actionObj.clone.getBoundingClientRect().right) + this.actionObj.interval;
        }
        else {
            cloneRight = this.actionObj.clone.getBoundingClientRect().right;
        }
        var dragArea = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var contentWrapRight = dragArea.getBoundingClientRect().right;
        if (this.parent.activeView.isTimelineView() && this.parent.currentView !== 'TimelineYear' && !this.parent.enableRtl &&
            this.actionObj.pageX > cloneRight && !this.isMorePopupOpened && !(this.actionObj.pageX > contentWrapRight)) {
            this.isCursorAhead = true;
        }
        if (this.parent.activeView.isTimelineView()) {
            leftValue = formatUnit(this.actionObj.clone.offsetLeft);
        }
        var topValue;
        if ((this.parent.activeView.isTimelineView() || !this.parent.timeScale.enable ||
            (!isNullOrUndefined(this.actionObj.clone.offsetParent) &&
                this.actionObj.clone.offsetParent.classList.contains(cls.MORE_EVENT_POPUP_CLASS)))) {
            topValue = formatUnit(this.actionObj.clone.offsetTop);
        }
        else if (this.parent.currentView === 'Month') {
            topValue = formatUnit(0);
        }
        else if (this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
            topValue = formatUnit(this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS).offsetTop);
            setStyleAttribute(this.actionObj.clone, {
                width: formatUnit(Math.ceil(this.actionObj.clone.offsetWidth / this.actionObj.cellWidth) * this.actionObj.cellWidth),
                right: this.parent.enableRtl && formatUnit(0)
            });
        }
        else {
            if (this.actionObj.element.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS) &&
                !this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
                setStyleAttribute(this.actionObj.clone, {
                    height: formatUnit(this.actionObj.cellHeight),
                    width: formatUnit(this.actionObj.cellWidth - 1),
                    pointerEvents: 'none'
                });
            }
            var top_1 = parseInt(e.top, 10);
            top_1 = top_1 < 0 ? 0 : top_1;
            if (this.slotsUptoCursor < 0) {
                var cellsCountUptoCursor = Math.floor((this.eleTop + this.distanceUptoCursor) / cellHeight);
                var cellsCountUptoEleTop = Math.floor(this.eleTop / cellHeight);
                this.slotsUptoCursor = cellsCountUptoCursor - cellsCountUptoEleTop;
            }
            top_1 = (Math.floor((top_1 + this.distanceUptoCursor + 1) / cellHeight) - this.slotsUptoCursor) * cellHeight;
            topValue = formatUnit(top_1 < 0 ? 0 : top_1);
            var scrollHeight = this.parent.element.querySelector('.e-content-wrap').scrollHeight;
            var cloneBottom = parseInt(topValue, 10) + this.actionObj.clone.offsetHeight;
            if (cloneBottom > scrollHeight) {
                topValue = (parseInt(topValue, 10) - (cloneBottom - scrollHeight)) + 'px';
            }
            if (this.isPreventMultiDrag) {
                topValue = formatUnit(this.actionObj.clone.offsetTop);
            }
        }
        return { left: leftValue, top: topValue };
    };
    DragAndDrop.prototype.setDragActionDefaultValues = function () {
        this.actionObj.action = 'drag';
        this.actionObj.isAllDay = null;
        this.actionObj.slotInterval = this.parent.activeViewOptions.timeScale.interval / this.parent.activeViewOptions.timeScale.slotCount;
        this.actionObj.interval = this.actionObj.slotInterval;
        var workCell = this.parent.element.querySelector('.' + cls.WORK_CELLS_CLASS);
        this.actionObj.cellWidth = workCell.offsetWidth;
        this.actionObj.cellHeight = workCell.offsetHeight;
    };
    DragAndDrop.prototype.dragStart = function (e) {
        var _this = this;
        var eventGuid = this.actionObj.element.getAttribute('data-guid');
        this.actionObj.event = this.parent.eventBase.getEventByGuid(eventGuid);
        var eventObj = extend({}, this.actionObj.event, null, true);
        if (!isNullOrUndefined(eventObj)) {
            this.startTime = eventObj[this.parent.eventFields.startTime].getTime();
        }
        if (!this.parent.allowMultiDrag) {
            this.parent.eventBase.removeSelectedAppointmentClass();
        }
        var dragArgs = {
            cancel: false,
            data: eventObj,
            selectedData: this.getSelectedData(),
            event: e,
            excludeSelectors: null,
            element: this.actionObj.element,
            interval: this.actionObj.interval,
            navigation: { enable: false, timeDelay: 2000 },
            scroll: { enable: true, scrollBy: 30, timeDelay: 100 }
        };
        this.parent.trigger(events.dragStart, dragArgs, function (dragEventArgs) {
            if (dragEventArgs.cancel || (!isNullOrUndefined(_this.actionObj.element) &&
                isNullOrUndefined(_this.actionObj.element.parentElement))) {
                var dragObj = _this.actionObj.element.ej2_instances[0];
                if (!isNullOrUndefined(dragObj)) {
                    dragObj.intDestroy(e.event);
                }
                _this.actionObj.action = '';
                _this.removeCloneElementClasses();
                _this.removeCloneElement();
                return;
            }
            _this.actionClass('addClass');
            _this.parent.uiStateValues.action = true;
            _this.actionObj.start = eventObj[_this.parent.eventFields.startTime];
            _this.actionObj.end = eventObj[_this.parent.eventFields.endTime];
            _this.actionObj.groupIndex = parseInt(_this.actionObj.element.getAttribute('data-group-index') || '0', 10);
            _this.actionObj.interval = dragEventArgs.interval;
            _this.actionObj.navigation = dragEventArgs.navigation;
            _this.actionObj.scroll = dragEventArgs.scroll;
            _this.enableCurrentViewDrag = dragArgs.dragWithinRange && !dragArgs.navigation.enable && _this.parent.allowMultiDrag;
            _this.actionObj.excludeSelectors = dragEventArgs.excludeSelectors;
            var viewElement = _this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
            _this.scrollArgs = { element: viewElement, width: viewElement.scrollWidth, height: viewElement.scrollHeight };
            _this.widthPerMinute = (_this.actionObj.cellWidth / _this.actionObj.slotInterval) * _this.actionObj.interval;
            _this.heightPerMinute = (_this.actionObj.cellHeight / _this.actionObj.slotInterval) * _this.actionObj.interval;
            _this.widthUptoCursorPoint = 0;
            _this.heightUptoCursorPoint = 0;
            _this.cursorPointIndex = -1;
            _this.isHeaderRows = false;
            _this.isTimelineDayProcess = false;
            _this.minDiff = 0;
            _this.isMorePopupOpened = false;
            _this.daysVariation = -1;
            _this.isAllDayTarget = _this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS);
            if ((_this.parent.activeView.isTimelineView() || !_this.parent.timeScale.enable) && _this.parent.currentView !== 'TimelineYear') {
                if (!isNullOrUndefined(_this.actionObj.clone.offsetParent) &&
                    _this.actionObj.clone.offsetParent.classList.contains(cls.MORE_EVENT_POPUP_CLASS)) {
                    _this.isMorePopupOpened = true;
                }
                _this.actionObj.pageX = e.event.pageX;
                var rows = _this.parent.activeViewOptions.headerRows;
                _this.isHeaderRows = rows.length > 0 && rows[rows.length - 1].option !== 'Hour' &&
                    rows[rows.length - 1].option !== 'Date';
                _this.isTimelineDayProcess = !_this.parent.activeViewOptions.timeScale.enable || _this.isHeaderRows ||
                    _this.parent.currentView === 'TimelineMonth' || (rows.length > 0 && rows[rows.length - 1].option === 'Date');
                _this.isAllDayDrag = !_this.isTimelineDayProcess && eventObj[_this.parent.eventFields.isAllDay];
                _this.isStepDragging = !_this.isTimelineDayProcess && !_this.isAllDayDrag &&
                    (_this.actionObj.slotInterval !== _this.actionObj.interval);
                if (_this.isTimelineDayProcess) {
                    _this.timelineEventModule = new TimelineEvent(_this.parent, 'day');
                }
                else {
                    _this.timelineEventModule = new TimelineEvent(_this.parent, 'hour');
                }
            }
            if (_this.parent.currentView === 'TimelineYear') {
                _this.yearEvent = new YearEvent(_this.parent);
            }
            if (_this.parent.currentView === 'Month') {
                _this.startTime = util.resetTime(new Date(_this.startTime)).getTime();
                _this.updateOriginalElement(_this.actionObj.clone);
                _this.monthEvent = new MonthEvent(_this.parent);
            }
            if (_this.parent.currentView === 'Day' || _this.parent.currentView === 'Week' || _this.parent.currentView === 'WorkWeek') {
                _this.verticalEvent = new VerticalEvent(_this.parent);
                _this.verticalEvent.initializeValues();
                var splitEvents = _this.splitEvent(_this.actionObj.event);
                splitEvents.forEach(function (event) {
                    var query = ".e-day-wrapper[data-date=\"" + util.resetTime(event[_this.parent.eventFields.startTime]).getTime() + "\"]";
                    if (_this.parent.activeViewOptions.group.resources.length > 0) {
                        query = query.concat('[data-group-index = "' + _this.actionObj.groupIndex + '"]');
                    }
                    var appWrap = _this.parent.element.querySelector(query);
                    if (appWrap) {
                        var appEle = appWrap.querySelector('[data-id="' + _this.actionObj.clone.getAttribute('data-id') + '"]');
                        if (appEle) {
                            addClass([appEle], cls.EVENT_ACTION_CLASS);
                        }
                    }
                });
            }
        });
    };
    DragAndDrop.prototype.getSelectedData = function () {
        if (this.isMultiSelect && this.multiData.length === 0 && this.parent.selectedElements.length > 0) {
            for (var _i = 0, _a = this.parent.selectedElements; _i < _a.length; _i++) {
                var element = _a[_i];
                var eventGuid = element.getAttribute('data-guid');
                var data = this.parent.eventBase.getEventByGuid(eventGuid);
                this.multiData.push(extend({}, data, null, true));
            }
        }
        return this.multiData;
    };
    DragAndDrop.prototype.drag = function (e) {
        if (e.event && e.event.type === 'touchmove') {
            e.event.preventDefault();
        }
        if (this.parent.quickPopup) {
            this.parent.quickPopup.quickPopupHide(true);
        }
        if ((!isNullOrUndefined(e.target)) && e.target.classList &&
            e.target.classList.contains(cls.DISABLE_DATES)) {
            return;
        }
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventArgs = this.parent.eventBase.getPageCoordinates(e);
        this.actionObj.Y = this.actionObj.pageY = eventArgs.pageY;
        this.actionObj.X = this.actionObj.pageX = eventArgs.pageX;
        this.actionObj.target = e.target;
        this.widthUptoCursorPoint = (this.widthUptoCursorPoint === 0) ?
            Math.ceil((Math.abs(this.actionObj.clone.getBoundingClientRect().left - this.actionObj.X) / this.widthPerMinute)) *
                this.widthPerMinute : this.widthUptoCursorPoint;
        this.widthUptoCursorPoint = this.isMorePopupOpened ? this.actionObj.cellWidth : this.widthUptoCursorPoint;
        this.heightUptoCursorPoint = (this.heightUptoCursorPoint === 0) ?
            Math.ceil((Math.abs(this.actionObj.clone.getBoundingClientRect().top - this.actionObj.Y) / this.heightPerMinute)) *
                this.heightPerMinute : this.heightUptoCursorPoint;
        if (['Day', 'Week', 'WorkWeek'].indexOf(this.parent.currentView) > -1) {
            this.isAllDayDrag = (this.parent.activeViewOptions.timeScale.enable) ?
                this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS) :
                this.actionObj.event[this.parent.eventFields.isAllDay];
        }
        if (this.isStepDragging && this.minDiff === 0) {
            this.calculateMinutesDiff(eventObj);
        }
        if ((this.parent.currentView === 'Month' || this.isAllDayDrag) && this.daysVariation < 0) {
            var date = this.parent.getDateFromElement(this.actionObj.target);
            if (!isNullOrUndefined(date)) {
                var currentDate = util.resetTime(date);
                var startDate = util.resetTime(new Date(eventObj[this.parent.eventFields.startTime].getTime()));
                this.daysVariation = (currentDate.getTime() - startDate.getTime()) / util.MS_PER_DAY;
            }
            else {
                this.daysVariation = 0;
            }
        }
        else {
            this.daysVariation = 0;
        }
        if (this.parent.eventDragArea) {
            var targetElement = eventArgs.target;
            this.actionObj.clone.style.top = formatUnit(targetElement.offsetTop);
            this.actionObj.clone.style.left = formatUnit(targetElement.offsetLeft);
            var currentTarget = closest(targetElement, '.' + cls.ROOT);
            if (!currentTarget) {
                this.actionObj.clone.style.height = '';
                this.actionObj.clone.style.width = '';
            }
            else {
                if (!(this.parent.currentView === 'Week' || this.parent.currentView === 'WorkWeek' || this.parent.currentView === 'Day')) {
                    this.actionObj.clone.style.width = formatUnit(this.actionObj.element.offsetWidth);
                }
            }
        }
        this.updateScrollPosition(e);
        this.updateNavigatingPosition(e);
        this.updateDraggingDateTime(e);
        var dragArgs = {
            data: eventObj, event: e, element: this.actionObj.element, startTime: this.actionObj.start,
            endTime: this.actionObj.end, selectedData: this.updatedData
        };
        if (this.parent.group.resources.length > 0) {
            dragArgs.groupIndex = this.actionObj.groupIndex;
        }
        this.parent.trigger(events.drag, dragArgs);
    };
    DragAndDrop.prototype.calculateMinutesDiff = function (eventObj) {
        if (this.parent.enableRtl) {
            this.minDiff =
                ((this.actionObj.clone.offsetWidth - this.widthUptoCursorPoint) / this.widthPerMinute) * this.actionObj.interval;
        }
        else {
            this.minDiff = (this.widthUptoCursorPoint / this.widthPerMinute) * this.actionObj.interval;
        }
        var startDate = eventObj[this.parent.eventFields.startTime];
        var startTime = this.parent.activeView.renderDates[0];
        var startEndHours = util.getStartEndHours(startTime, this.parent.activeView.getStartHour(), this.parent.activeView.getEndHour());
        if (startEndHours.startHour.getTime() > startDate.getTime()) {
            this.minDiff = this.minDiff + ((startEndHours.startHour.getTime() - startDate.getTime()) / util.MS_PER_MINUTE);
        }
    };
    DragAndDrop.prototype.dragStop = function (e) {
        var _this = this;
        this.isCursorAhead = false;
        this.isPreventMultiDrag = false;
        this.removeCloneElementClasses();
        this.removeCloneElement();
        clearInterval(this.actionObj.navigationInterval);
        this.actionObj.navigationInterval = null;
        clearInterval(this.actionObj.scrollInterval);
        this.actionObj.scrollInterval = null;
        this.actionClass('removeClass');
        this.parent.uiStateValues.action = this.parent.uiStateValues.isTapHold = false;
        if (this.isAllowDrop(e)) {
            return;
        }
        var target = (e.target.classList && (!e.target.classList.contains('e-work-cells') && this.parent.cellTemplate) ?
            closest(e.target, '.e-work-cells') : e.target);
        var dragArgs = {
            cancel: false, data: this.getChangedData(this.updatedData), selectedData: this.updatedData,
            event: e, element: this.actionObj.element, target: target
        };
        this.actionObj.action = null;
        this.parent.trigger(events.dragStop, dragArgs, function (dragEventArgs) {
            if (dragEventArgs.cancel) {
                return;
            }
            if (_this.parent.eventBase.checkOverlap(dragEventArgs.data)) {
                return;
            }
            if (_this.parent.isSpecificResourceEvents()) {
                _this.parent.crudModule.crudObj.isCrudAction = true;
                _this.parent.crudModule.crudObj.sourceEvent =
                    [_this.parent.resourceBase.lastResourceLevel[parseInt(dragArgs.element.getAttribute('data-group-index'), 10)]];
                var currentGroupIndex = parseInt(dragArgs.target.getAttribute('data-group-index'), 10) || _this.actionObj.groupIndex;
                _this.parent.crudModule.crudObj.targetEvent =
                    [_this.parent.resourceBase.lastResourceLevel[parseInt(currentGroupIndex.toString(), 10)]];
            }
            _this.saveChangedData(dragEventArgs, _this.isMultiSelect);
        });
        this.updatedData = [];
        this.multiData = [];
        this.isMultiSelect = false;
        this.parent.selectedElements = [];
    };
    DragAndDrop.prototype.updateNavigatingPosition = function (e) {
        var _this = this;
        if (this.actionObj.navigation.enable) {
            var currentDate_1 = this.parent.getCurrentTime();
            if (isNullOrUndefined(this.actionObj.navigationInterval)) {
                this.actionObj.navigationInterval = window.setInterval(function () {
                    if (currentDate_1) {
                        var crtDate = _this.parent.getCurrentTime();
                        var end = crtDate.getSeconds();
                        var start = currentDate_1.getSeconds() + (_this.actionObj.navigation.timeDelay / 1000);
                        start = (start >= 60) ? start - 60 : start;
                        if (start === end) {
                            currentDate_1 = _this.parent.getCurrentTime();
                            _this.viewNavigation(e);
                            _this.updateDraggingDateTime(e);
                        }
                    }
                }, this.actionObj.navigation.timeDelay);
            }
        }
    };
    DragAndDrop.prototype.updateDraggingDateTime = function (e) {
        if (!isNullOrUndefined(this.actionObj.clone.offsetParent) &&
            this.actionObj.clone.offsetParent.classList.contains(cls.MORE_EVENT_POPUP_CLASS)) {
            this.morePopupEventDragging(e);
        }
        else if (this.parent.activeView.isTimelineView() && this.parent.currentView !== 'TimelineYear') {
            this.timelineEventModule.dateRender = this.parent.activeView.renderDates;
            this.timelineEventModule.cellWidth = this.actionObj.cellWidth;
            this.timelineEventModule.getSlotDates();
            this.actionObj.cellWidth = this.isHeaderRows ? this.timelineEventModule.cellWidth :
                this.parent.getElementWidth(this.parent.element.querySelector('.' + cls.WORK_CELLS_CLASS));
            this.calculateTimelineTime(e);
        }
        else {
            if (this.parent.currentView === 'Month' || this.parent.currentView === 'TimelineYear') {
                this.calculateVerticalDate(e);
            }
            else {
                this.calculateVerticalTime(e);
            }
        }
    };
    DragAndDrop.prototype.navigationWrapper = function () {
        if (!this.parent.activeView.isTimelineView()) {
            if (this.parent.currentView === 'Month' || !this.parent.timeScale.enable) {
                var outerWrapperCls = [].slice.call(this.parent.element.querySelectorAll('.' + cls.WORK_CELLS_CLASS));
                this.actionObj.index = (this.parent.activeView.renderDates.length < this.actionObj.index) ?
                    this.parent.activeView.renderDates.length - 1 : this.actionObj.index;
                var targetWrapper = outerWrapperCls[this.actionObj.index].querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
                if (!targetWrapper) {
                    targetWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
                    outerWrapperCls[this.actionObj.index].appendChild(targetWrapper);
                }
                targetWrapper.appendChild(this.actionObj.clone);
            }
            else {
                var wrapperClass = this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS) ?
                    '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS : '.' + cls.APPOINTMENT_WRAPPER_CLASS;
                this.parent.element.querySelectorAll(wrapperClass)
                    .item(this.actionObj.index).appendChild(this.actionObj.clone);
                if (wrapperClass === '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS) {
                    var elementHeight = this.getAllDayEventHeight();
                    var event_2 = [].slice.call(this.parent.element.querySelectorAll('.' + cls.ALLDAY_CELLS_CLASS + ':first-child'));
                    if (event_2[0].offsetHeight < elementHeight) {
                        for (var _i = 0, event_1 = event_2; _i < event_1.length; _i++) {
                            var e = event_1[_i];
                            e.style.height = ((elementHeight + 2) / 12) + 'em';
                        }
                    }
                    this.actionObj.clone.style.height = formatUnit(elementHeight);
                }
                this.actionObj.height = parseInt(this.actionObj.clone.style.height, 10);
            }
        }
        else {
            var outWrapper = void 0;
            if (this.parent.activeViewOptions.group.resources.length > 0) {
                outWrapper = this.parent.element.querySelectorAll('.e-appointment-container:not(.e-hidden)').item(this.actionObj.index);
            }
            else {
                outWrapper = this.parent.element.querySelector('.' + cls.APPOINTMENT_CONTAINER_CLASS);
            }
            if (!isNullOrUndefined(outWrapper)) {
                var tarWrapper_1 = outWrapper.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
                if (!tarWrapper_1) {
                    tarWrapper_1 = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
                    outWrapper.appendChild(tarWrapper_1);
                }
                this.actionObj.cloneElement.forEach(function (ele) {
                    tarWrapper_1.appendChild(ele);
                });
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DragAndDrop.prototype.viewNavigation = function (e) {
        var navigationType;
        var dragArea = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        if (dragArea && ((!this.scrollEdges.top && !this.scrollEdges.bottom) ||
            closest(this.actionObj.clone, '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS))) {
            if ((dragArea.scrollLeft === 0) &&
                (Math.round(this.actionObj.X) <=
                    Math.round(dragArea.getBoundingClientRect().left + this.actionObj.cellWidth + window.pageXOffset))) {
                navigationType = this.parent.enableRtl ? 'Next' : 'Previous';
            }
            else if ((Math.round(dragArea.scrollLeft) + dragArea.clientWidth === dragArea.scrollWidth) &&
                (Math.round(this.actionObj.X) >=
                    Math.round(dragArea.getBoundingClientRect().right - this.actionObj.cellWidth + window.pageXOffset))) {
                navigationType = this.parent.enableRtl ? 'Previous' : 'Next';
            }
            if (navigationType) {
                this.parent.changeDate(this.parent.activeView.getNextPreviousDate(navigationType));
            }
        }
    };
    DragAndDrop.prototype.morePopupEventDragging = function (e) {
        if (isNullOrUndefined(e.target) || (e.target && isNullOrUndefined(closest(e.target, 'td')))) {
            return;
        }
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventDuration = eventObj[this.parent.eventFields.endTime].getTime() -
            eventObj[this.parent.eventFields.startTime].getTime();
        var td = closest(e.target, 'td');
        if (this.parent.currentView === 'TimelineYear' && (!td.classList.contains(cls.WORK_CELLS_CLASS) || td.classList.contains(cls.OTHERMONTH_CLASS))) {
            return;
        }
        var dragStart = this.parent.getDateFromElement(td);
        var dragEnd = new Date(dragStart.getTime());
        dragEnd.setMilliseconds(eventDuration);
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            this.actionObj.groupIndex = parseInt(td.getAttribute('data-group-index'), 10);
        }
        this.actionObj.start = new Date(dragStart.getTime());
        this.actionObj.end = new Date(dragEnd.getTime());
        this.actionObj.clone.style.top = formatUnit(td.offsetParent.offsetTop);
        this.actionObj.clone.style.left = formatUnit(td.offsetLeft);
        this.actionObj.clone.style.width = formatUnit(td.offsetWidth);
        var eventContainer = td;
        var eventWrapper;
        if (this.parent.activeView.isTimelineView()) {
            var rowIndex = closest(td, 'tr').rowIndex;
            eventContainer = this.parent.element.querySelectorAll('.e-appointment-container').item(rowIndex);
        }
        eventWrapper = eventContainer.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
        if (!eventWrapper) {
            eventWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
            eventContainer.appendChild(eventWrapper);
        }
        this.appendCloneElement(eventWrapper);
    };
    DragAndDrop.prototype.calculateVerticalTime = function (e) {
        var _this = this;
        if (isNullOrUndefined(this.actionObj.target) ||
            (this.actionObj.target && isNullOrUndefined(closest(this.actionObj.target, 'tr'))) ||
            (!isNullOrUndefined(closest(this.actionObj.target, 'td')) && !(closest(this.actionObj.target, 'td').classList.contains(cls.WORK_CELLS_CLASS)) &&
                !(closest(this.actionObj.target, 'td').classList.contains(cls.ALLDAY_CELLS_CLASS)))) {
            return;
        }
        if (this.parent.activeViewOptions.timeScale.enable) {
            this.swapDragging(e);
        }
        var dragArea = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventStart = eventObj[this.parent.eventFields.startTime];
        var eventEnd = eventObj[this.parent.eventFields.endTime];
        var eventDuration = util.getUniversalTime(eventEnd) - util.getUniversalTime(eventStart);
        var offsetTop = Math.floor(parseInt(this.actionObj.clone.style.top, 10) / this.actionObj.cellHeight)
            * this.actionObj.cellHeight;
        offsetTop = offsetTop < 0 ? 0 : offsetTop;
        if (this.scrollEdges.top || this.scrollEdges.bottom) {
            offsetTop = this.scrollEdges.top ? dragArea.scrollTop - this.heightUptoCursorPoint +
                this.actionObj.cellHeight + window.pageYOffset :
                (dragArea.scrollTop + dragArea.offsetHeight - this.actionObj.clone.offsetHeight + window.pageYOffset) +
                    (this.actionObj.clone.offsetHeight - this.heightUptoCursorPoint);
            offsetTop = Math.round(offsetTop / this.actionObj.cellHeight) * this.actionObj.cellHeight;
            if (dragArea.scrollTop > 0 && offsetTop < dragArea.scrollHeight) {
                this.actionObj.clone.style.top = formatUnit(offsetTop);
            }
        }
        var rowIndex = (this.parent.activeViewOptions.timeScale.enable) ? (offsetTop / this.actionObj.cellHeight) : 0;
        var heightPerMinute = this.actionObj.cellHeight / this.actionObj.slotInterval;
        var diffInMinutes = parseInt(this.actionObj.clone.style.top, 10) - offsetTop;
        var tr;
        if (this.isAllDayDrag) {
            tr = this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS);
        }
        else {
            var trCollections = [].slice.call(this.parent.getContentTable().querySelectorAll('tr'));
            tr = trCollections[parseInt(rowIndex.toString(), 10)];
        }
        var index;
        if (!isNullOrUndefined(closest(this.actionObj.target, 'td')) && (closest(this.actionObj.target, 'td').classList.contains(cls.WORK_CELLS_CLASS) ||
            closest(this.actionObj.target, 'td').classList.contains(cls.ALLDAY_CELLS_CLASS))) {
            index = closest(this.actionObj.target, 'td').cellIndex;
        }
        var colIndex = isNullOrUndefined(index) ? closest(this.actionObj.clone, 'td').cellIndex : index;
        this.actionObj.index = colIndex;
        if (isNullOrUndefined(tr)) {
            return;
        }
        var td = tr.children[parseInt(colIndex.toString(), 10)];
        if (this.parent.activeViewOptions.group.resources.length > 0 && !this.parent.uiStateValues.isGroupAdaptive) {
            this.actionObj.groupIndex = parseInt(td.getAttribute('data-group-index'), 10);
        }
        var dragStart;
        var dragEnd;
        if (this.parent.activeViewOptions.timeScale.enable && !this.isAllDayDrag) {
            if (!this.enableCurrentViewDrag || this.multiData.length === 0) {
                this.appendCloneElement(this.getEventWrapper(colIndex));
            }
            dragStart = this.parent.getDateFromElement(td);
            dragStart.setMinutes(dragStart.getMinutes() + (diffInMinutes / heightPerMinute));
            dragEnd = new Date(dragStart.getTime());
            if (this.actionObj.element.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
                dragEnd.setMinutes(dragEnd.getMinutes() + this.actionObj.slotInterval);
            }
            else {
                dragEnd.setMilliseconds(eventDuration);
            }
        }
        else {
            dragStart = this.parent.getDateFromElement(td);
            dragStart.setDate(dragStart.getDate() - this.daysVariation);
            dragStart.setHours(eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds());
            dragEnd = new Date(dragStart.getTime());
            dragEnd.setMilliseconds(eventDuration);
            if (!this.actionObj.element.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS) &&
                this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
                dragEnd = util.addDays(util.resetTime(dragEnd), 1);
            }
            var index_1 = this.parent.activeViewOptions.group.byDate || (this.parent.virtualScrollModule &&
                !this.parent.activeViewOptions.timeScale.enable) ? colIndex : undefined;
            this.updateAllDayEvents(dragStart, dragEnd, index_1);
        }
        this.actionObj.start = new Date(+dragStart);
        this.actionObj.end = new Date(+dragEnd);
        var event = this.getUpdatedEvent(this.actionObj.start, this.actionObj.end, this.actionObj.event);
        var dynamicWrappers = [].slice.call(this.parent.element.querySelectorAll('.e-dynamic-clone'));
        for (var _i = 0, dynamicWrappers_1 = dynamicWrappers; _i < dynamicWrappers_1.length; _i++) {
            var wrapper = dynamicWrappers_1[_i];
            remove(wrapper);
        }
        if (this.multiData.length > 0) {
            if (this.isAllDayTarget && this.isAllDayDrag && !isNullOrUndefined(this.actionObj.isAllDay) && !this.actionObj.isAllDay) {
                var targetCellTime_1 = parseInt((closest(this.actionObj.target, 'td')).getAttribute('data-date'), 10);
                this.multiData.forEach(function (data) {
                    _this.swagData.push(extend({}, data, null, true));
                    if (data[_this.parent.eventFields.isAllDay]) {
                        data[_this.parent.eventFields.startTime] =
                            new Date(data[_this.parent.eventFields.startTime].getTime() + (targetCellTime_1 - _this.startTime));
                        var startTime = new Date(data[_this.parent.eventFields.startTime]);
                        var endTime = new Date(startTime.setMinutes(startTime.getMinutes() + _this.actionObj.slotInterval));
                        data[_this.parent.eventFields.endTime] = endTime;
                        data[_this.parent.eventFields.isAllDay] = false;
                    }
                });
                this.startTime = targetCellTime_1;
            }
            if (this.isAllDayTarget && this.isAllDayDrag &&
                !isNullOrUndefined(this.actionObj.isAllDay) && this.actionObj.isAllDay && this.swagData.length > 0) {
                this.multiData = this.swagData;
                this.swagData = [];
                var eventObj_1 = extend({}, this.actionObj.event, null, true);
                this.startTime = eventObj_1[this.parent.eventFields.startTime].getTime();
            }
            var startTimeDiff = event[this.parent.eventFields.startTime].getTime() - this.startTime;
            if (this.enableCurrentViewDrag) {
                var renderDates = this.getRenderedDates();
                for (var i = 0; i < this.multiData.length; i++) {
                    var eventObj_2 = extend({}, this.multiData[parseInt(i.toString(), 10)], null, true);
                    var startTime = new Date(eventObj_2[this.parent.eventFields.startTime].getTime() + startTimeDiff);
                    var dayIndex = this.parent.getIndexOfDate(renderDates, util.resetTime(startTime));
                    if (dayIndex < 0) {
                        this.isPreventMultiDrag = true;
                        break;
                    }
                    this.isPreventMultiDrag = false;
                }
            }
            if (!this.isPreventMultiDrag) {
                for (var index_2 = 0; index_2 < this.multiData.length; index_2++) {
                    this.updatedData[parseInt(index_2.toString(), 10)] =
                        this.updateMultipleData(this.multiData[parseInt(index_2.toString(), 10)], startTimeDiff);
                    var dayIndex = this.getDayIndex(this.updatedData[parseInt(index_2.toString(), 10)]);
                    if (dayIndex >= 0) {
                        var isAllDay = this.updatedData[parseInt(index_2.toString(), 10)][this.parent.eventFields.isAllDay];
                        var wrapper = this.getEventWrapper(dayIndex, isAllDay);
                        this.appendCloneElement(wrapper, this.actionObj.cloneElement[parseInt(index_2.toString(), 10)]);
                        this.updateEventHeight(this.updatedData[parseInt(index_2.toString(), 10)], index_2, dayIndex);
                    }
                    else {
                        if (!isNullOrUndefined(this.actionObj.cloneElement[parseInt(index_2.toString(), 10)].parentNode)) {
                            remove(this.actionObj.cloneElement[parseInt(index_2.toString(), 10)]);
                        }
                    }
                }
            }
        }
        else {
            this.updateEventHeight(event);
        }
        this.updateTimePosition(this.actionObj.start, this.updatedData);
    };
    DragAndDrop.prototype.splitEvent = function (event) {
        var eventFields = this.parent.eventFields;
        var eventData = [];
        var startTime = event[eventFields.startTime];
        var endTime = event[eventFields.endTime];
        if (util.resetTime(new Date(startTime.getTime())) < util.resetTime(new Date(endTime.getTime()))) {
            var startReferenceDate = util.resetTime(new Date(startTime.getTime()));
            var endReferenceDate = new Date(startReferenceDate.getTime());
            for (var i = 0; startReferenceDate < new Date(endTime.getTime()); i++) {
                endReferenceDate = new Date(endReferenceDate.setDate(startReferenceDate.getDate() + 1));
                var eventObj = extend({}, event, null, true);
                eventObj[eventFields.startTime] = new Date(startReferenceDate);
                eventObj[eventFields.endTime] = new Date(endReferenceDate);
                startReferenceDate = new Date(startReferenceDate.setDate(startReferenceDate.getDate() + 1));
                eventData.push(eventObj);
            }
            var index = eventData.length - 1;
            eventData[0][eventFields.startTime] = startTime;
            eventData[parseInt(index.toString(), 10)][eventFields.endTime] = endTime;
        }
        else {
            eventData.push(event);
        }
        return eventData;
    };
    DragAndDrop.prototype.updateMultipleData = function (data, timeDifference) {
        var eventObj = extend({}, data, null, true);
        if (!isNullOrUndefined(this.actionObj.isAllDay) && this.parent.activeViewOptions.timeScale.enable &&
            ((this.isAllDayTarget && eventObj[this.parent.eventFields.isAllDay]) ||
                (!this.isAllDayTarget && !eventObj[this.parent.eventFields.isAllDay]))) {
            eventObj[this.parent.eventFields.isAllDay] = this.actionObj.isAllDay;
        }
        var endTimeDiff = eventObj[this.parent.eventFields.endTime].getTime() -
            eventObj[this.parent.eventFields.startTime].getTime();
        if (eventObj[this.parent.eventFields.isAllDay]) {
            var differInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
            var day = Math.ceil(endTimeDiff / (1000 * 3600 * 24));
            var startTime = new Date(eventObj[this.parent.eventFields.startTime]);
            eventObj[this.parent.eventFields.startTime] = util.resetTime(new Date(startTime.setDate(startTime.getDate() + differInDays)));
            eventObj[this.parent.eventFields.endTime] = util.addDays(eventObj[this.parent.eventFields.startTime], day);
        }
        else {
            eventObj[this.parent.eventFields.startTime] =
                new Date(eventObj[this.parent.eventFields.startTime].getTime() + timeDifference);
            eventObj[this.parent.eventFields.endTime] =
                new Date(eventObj[this.parent.eventFields.startTime].getTime() + endTimeDiff);
        }
        return eventObj;
    };
    DragAndDrop.prototype.getDayIndex = function (event) {
        var eventObj = extend({}, event, null, true);
        var startDate = util.resetTime(eventObj[this.parent.eventFields.startTime]);
        if (this.parent.activeViewOptions.timeScale.enable && !eventObj[this.parent.eventFields.isAllDay]) {
            var startHour = this.parent.activeView.getStartHour();
            startDate.setMilliseconds(startHour.getTime() - util.resetTime(startHour).getTime());
        }
        var startTime = startDate.getTime();
        var query = '';
        var wrapper = cls.DAY_WRAPPER_CLASS;
        if (this.parent.activeViewOptions.timeScale.enable && (eventObj[this.parent.eventFields.isAllDay])) {
            wrapper = cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS;
        }
        else {
            wrapper = cls.WORK_CELLS_CLASS;
        }
        query = '.' + wrapper + '[data-date="' + startTime + '"]';
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            query = query + '[data-group-index="' + this.actionObj.groupIndex + '"]';
        }
        this.targetTd = this.parent.element.querySelector(query);
        if (isNullOrUndefined(this.targetTd)) {
            return -1;
        }
        return this.targetTd.cellIndex;
    };
    DragAndDrop.prototype.updateEventHeight = function (event, index, colIndex) {
        this.verticalEvent.initializeValues();
        var datesCount = this.verticalEvent.getStartCount();
        if (!this.parent.uiStateValues.isGroupAdaptive) {
            for (var i = 0; i < this.actionObj.groupIndex; i++) {
                if (this.verticalEvent.dateRender[parseInt(i.toString(), 10)]) {
                    datesCount = datesCount + this.verticalEvent.dateRender[parseInt(i.toString(), 10)].length;
                }
            }
        }
        var indexGroup = this.parent.uiStateValues.isGroupAdaptive ? datesCount : this.actionObj.groupIndex;
        var target = (this.parent.activeViewOptions.group.byDate &&
            !isNullOrUndefined(this.parent.getDateFromElement(this.actionObj.target))) ? true : false;
        if (target || !this.parent.activeViewOptions.group.byDate) {
            var dynamicIndex = -1;
            var dayIndex = !this.parent.activeViewOptions.group.byDate ?
                isNullOrUndefined(index) ? this.actionObj.index - datesCount : colIndex - datesCount
                : this.parent.getIndexOfDate(this.verticalEvent.dateRender[parseInt(indexGroup.toString(), 10)], util.resetTime(
                // eslint-disable-next-line max-len
                this.parent.getDateFromElement(isNullOrUndefined(index) ? this.actionObj.target : this.targetTd)));
            var splitEvents = this.splitEvent(event);
            var events_1 = this.parent.eventBase.isAllDayAppointment(event) || splitEvents.length > 2 ||
                this.parent.eventSettings.spannedEventPlacement !== 'TimeSlot' ? [event] : splitEvents;
            for (var i = 0; i < events_1.length; i++) {
                if (i > 0) {
                    var filterQuery = ".e-day-wrapper[data-date=\"" + util.resetTime(events_1[parseInt(i.toString(), 10)][this.parent.eventFields.startTime]).getTime() + "\"]";
                    if (this.parent.activeViewOptions.group.resources.length > 0) {
                        filterQuery = filterQuery.concat('[data-group-index = "' + this.actionObj.groupIndex + '"]');
                    }
                    var appWrap = this.parent.element.querySelector(filterQuery);
                    if (appWrap) {
                        dayIndex = dayIndex + 1;
                        dynamicIndex = appWrap.cellIndex;
                    }
                    else {
                        dayIndex = -1;
                    }
                }
                if (dayIndex >= 0) {
                    var record = this.verticalEvent.isSpannedEvent(events_1[parseInt(i.toString(), 10)], dayIndex, indexGroup);
                    var eStart = record[this.verticalEvent.fields.startTime];
                    var eEnd = record[this.verticalEvent.fields.endTime];
                    var appHeight = this.parent.activeViewOptions.timeScale.enable ? this.verticalEvent.getHeight(eStart, eEnd) :
                        this.actionObj.element.offsetHeight;
                    var topValue = this.parent.activeViewOptions.timeScale.enable ?
                        this.verticalEvent.getTopValue(eStart) : this.actionObj.element.offsetTop;
                    if (isNullOrUndefined(index)) {
                        if (i === 0) {
                            this.actionObj.clone.style.top = formatUnit(topValue);
                            this.actionObj.clone.style.height = formatUnit(appHeight);
                        }
                        else {
                            this.renderSpannedEvents(record, dynamicIndex, topValue, appHeight);
                        }
                    }
                    else {
                        var appWidth = this.actionObj.cellWidth;
                        if (event[this.parent.eventFields.isAllDay]) {
                            topValue = this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS).offsetTop;
                            appHeight = this.getAllDayEventHeight();
                            var timeDiff = event[this.parent.eventFields.endTime].getTime() -
                                event[this.parent.eventFields.startTime].getTime();
                            var allDayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (allDayDifference >= 0) {
                                appWidth = (allDayDifference * this.actionObj.cellWidth);
                            }
                        }
                        if (this.actionObj.cloneElement[parseInt(index.toString(), 10)]) {
                            if (i === 0) {
                                this.actionObj.cloneElement[parseInt(index.toString(), 10)].style.top = formatUnit(topValue);
                                this.actionObj.cloneElement[parseInt(index.toString(), 10)].style.height = formatUnit(appHeight);
                                this.actionObj.cloneElement[parseInt(index.toString(), 10)].style.width = formatUnit(appWidth);
                                this.actionObj.cloneElement[parseInt(index.toString(), 10)].style.left = formatUnit(0);
                            }
                            else {
                                this.renderSpannedEvents(record, dynamicIndex, topValue, appHeight);
                            }
                        }
                    }
                }
            }
        }
    };
    DragAndDrop.prototype.renderSpannedEvents = function (record, index, top, height) {
        var startTime = record[this.parent.eventFields.startTime].getTime();
        var endTime = record[this.parent.eventFields.endTime].getTime();
        if (startTime !== endTime) {
            var appointmentElement = this.verticalEvent.
                createAppointmentElement(record, false, record.isSpanned, this.actionObj.groupIndex);
            addClass([appointmentElement], [cls.CLONE_ELEMENT_CLASS, 'e-dynamic-clone']);
            setStyleAttribute(appointmentElement, {
                'width': '100%',
                'height': height + 'px',
                'top': top + 'px',
                'border': '0px'
            });
            var appointmentWrap = [].slice.call(this.parent.element.querySelectorAll('.' + cls.APPOINTMENT_WRAPPER_CLASS));
            appointmentWrap[parseInt(index.toString(), 10)].appendChild(appointmentElement);
        }
    };
    DragAndDrop.prototype.getRenderedDates = function () {
        var _this = this;
        var _a, _b;
        var renderDates = this.parent.activeView.renderDates;
        (_a = this.parent.eventBase.slots).push.apply(_a, this.parent.activeView.renderDates.map(function (date) { return +date; }));
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            this.parent.eventBase.slots = [];
            var resources = this.parent.resourceBase.lastResourceLevel.
                filter(function (res) { return res.groupIndex === _this.actionObj.groupIndex; });
            renderDates = resources[0].renderDates;
            (_b = this.parent.eventBase.slots).push.apply(_b, renderDates.map(function (date) { return +date; }));
        }
        return renderDates;
    };
    DragAndDrop.prototype.updateAllDayEvents = function (startDate, endDate, colIndex) {
        this.parent.eventBase.slots = [];
        var event = this.getUpdatedEvent(startDate, endDate, this.actionObj.event);
        var renderDates = this.getRenderedDates();
        var events = this.parent.eventBase.splitEvent(event, renderDates);
        var query = ".e-all-day-cells[data-date=\"" + events[0][this.parent.eventFields.startTime].getTime() + "\"]";
        if (this.parent.activeViewOptions.group.resources.length > 0 && !this.parent.uiStateValues.isGroupAdaptive) {
            query = query.concat('[data-group-index = "' + this.actionObj.groupIndex + '"]');
        }
        var cell = [].slice.call(this.parent.element.querySelectorAll(query));
        if (cell.length > 0 || !isNullOrUndefined(colIndex)) {
            var cellIndex = !isNullOrUndefined(colIndex) ? colIndex : cell[0].cellIndex;
            this.appendCloneElement(this.getEventWrapper(cellIndex));
            // eslint-disable-next-line max-len
            this.actionObj.clone.style.width = formatUnit(events[0].data.count * this.actionObj.cellWidth);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DragAndDrop.prototype.swapDragging = function (e) {
        if (this.isPreventMultiDrag) {
            return;
        }
        var colIndex = !isNullOrUndefined(closest(this.actionObj.target, 'td')) && closest(this.actionObj.target, 'td').cellIndex;
        if (closest(this.actionObj.target, '.' + cls.DATE_HEADER_WRAP_CLASS) &&
            !closest(this.actionObj.clone, '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS)) {
            addClass([this.actionObj.clone], cls.ALLDAY_APPOINTMENT_CLASS);
            this.appendCloneElement(this.getEventWrapper(colIndex));
            this.actionObj.isAllDay = true;
            var eventHeight = this.getAllDayEventHeight();
            var allDayElement = [].slice.call(this.parent.element.querySelectorAll('.' + cls.ALLDAY_CELLS_CLASS + ':first-child'));
            if (allDayElement[0].offsetHeight < eventHeight) {
                for (var _i = 0, allDayElement_1 = allDayElement; _i < allDayElement_1.length; _i++) {
                    var element = allDayElement_1[_i];
                    element.style.height = ((eventHeight + 2) / 12) + 'em';
                }
            }
            setStyleAttribute(this.actionObj.clone, {
                width: formatUnit(this.actionObj.cellWidth),
                height: formatUnit(eventHeight),
                top: formatUnit(this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS).offsetTop)
            });
        }
        if (closest(this.actionObj.target, '.' + cls.WORK_CELLS_CLASS) &&
            !closest(this.actionObj.clone, '.' + cls.DAY_WRAPPER_CLASS)) {
            removeClass([this.actionObj.clone], cls.ALLDAY_APPOINTMENT_CLASS);
            this.appendCloneElement(this.getEventWrapper(colIndex));
            this.actionObj.isAllDay = false;
            // eslint-disable-next-line max-len
            var height = (this.actionObj.element.offsetHeight === 0) ? this.actionObj.height : this.actionObj.element.offsetHeight;
            setStyleAttribute(this.actionObj.clone, {
                left: formatUnit(0),
                height: formatUnit(height),
                width: formatUnit(this.actionObj.cellWidth)
            });
        }
    };
    DragAndDrop.prototype.calculateVerticalDate = function (e) {
        if (isNullOrUndefined(e.target) || (e.target && isNullOrUndefined(closest(e.target, 'tr'))) ||
            (e.target && e.target.tagName === 'DIV')) {
            return;
        }
        var eventObj = extend({}, this.actionObj.event, null, true);
        if (isNullOrUndefined(this.parent.eventDragArea)) {
            this.removeCloneElement();
        }
        var eventDuration = util.getUniversalTime(eventObj[this.parent.eventFields.endTime]) -
            util.getUniversalTime(eventObj[this.parent.eventFields.startTime]);
        var td = closest(this.actionObj.target, 'td');
        if (!isNullOrUndefined(td)) {
            var tr = td.parentElement;
            this.actionObj.index = (tr.rowIndex * tr.children.length) + td.cellIndex;
            var workCells = [].slice.call(this.parent.element.querySelectorAll('.' + cls.WORK_CELLS_CLASS));
            td = workCells[this.actionObj.index];
            var currentDate = this.parent.getDateFromElement(td);
            if (!isNullOrUndefined(currentDate)) {
                if (this.parent.activeViewOptions.group.resources.length > 0) {
                    this.actionObj.groupIndex = parseInt(td.getAttribute('data-group-index'), 10);
                }
                var timeString = new Date(currentDate.setDate(currentDate.getDate() - this.daysVariation));
                var dragStart = new Date(timeString.getTime());
                var startTimeDiff = util.getUniversalTime(eventObj[this.parent.eventFields.startTime]) -
                    util.getUniversalTime(util.resetTime(new Date(+eventObj[this.parent.eventFields.startTime])));
                dragStart.setMilliseconds(startTimeDiff);
                var dragEnd = new Date(dragStart.getTime());
                dragEnd.setMilliseconds(eventDuration);
                this.actionObj.start = new Date(dragStart.getTime());
                this.actionObj.end = new Date(dragEnd.getTime());
            }
        }
        var event = this.getUpdatedEvent(this.actionObj.start, this.actionObj.end, this.actionObj.event);
        if (isNullOrUndefined(this.parent.eventDragArea)) {
            var eventWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CLONE_ELEMENT_CLASS));
            for (var _i = 0, eventWrappers_1 = eventWrappers; _i < eventWrappers_1.length; _i++) {
                var wrapper = eventWrappers_1[_i];
                remove(wrapper);
            }
        }
        if (this.multiData && this.multiData.length > 0) {
            var startTime = util.resetTime(new Date(event[this.parent.eventFields.startTime]));
            var startTimeDiff = startTime.getTime() - this.startTime;
            if (this.parent.currentView === 'TimelineYear' && this.parent.group.resources.length > 0) {
                startTimeDiff = (startTime.getFullYear() - new Date(this.startTime).getFullYear()) * 12;
                startTimeDiff -= new Date(this.startTime).getMonth();
                startTimeDiff += startTime.getMonth();
            }
            for (var index = 0; index < this.multiData.length; index++) {
                this.updatedData[parseInt(index.toString(), 10)] =
                    this.updateMultipleVerticalDate(this.multiData[parseInt(index.toString(), 10)], startTimeDiff);
                if (this.parent.currentView === 'TimelineYear') {
                    this.dynamicYearlyEventsRendering(this.updatedData[parseInt(index.toString(), 10)]);
                }
                else {
                    this.dynamicEventsRendering(this.updatedData[parseInt(index.toString(), 10)]);
                }
            }
        }
        else {
            if (this.parent.currentView === 'TimelineYear') {
                this.dynamicYearlyEventsRendering(event);
            }
            else {
                this.dynamicEventsRendering(event);
            }
        }
    };
    DragAndDrop.prototype.updateMultipleVerticalDate = function (data, timeDifference) {
        var eventObj = extend({}, data, null, true);
        var eventDuration = eventObj[this.parent.eventFields.endTime].getTime() -
            eventObj[this.parent.eventFields.startTime].getTime();
        var startDate = new Date(eventObj[this.parent.eventFields.startTime]);
        if (this.parent.currentView === 'TimelineYear' && this.parent.group.resources.length > 0) {
            eventObj[this.parent.eventFields.startTime] = new Date(startDate.setMonth(startDate.getMonth() + timeDifference));
        }
        else {
            var differInDays = Math.ceil(timeDifference / util.MS_PER_DAY);
            eventObj[this.parent.eventFields.startTime] = new Date(startDate.setDate(startDate.getDate() + differInDays));
        }
        eventObj[this.parent.eventFields.endTime] =
            new Date(eventObj[this.parent.eventFields.startTime].getTime() + eventDuration);
        return eventObj;
    };
    DragAndDrop.prototype.calculateTimelineTime = function (e) {
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventDuration = util.getUniversalTime(eventObj[this.parent.eventFields.endTime]) -
            util.getUniversalTime(eventObj[this.parent.eventFields.startTime]);
        var offsetLeft = this.parent.enableRtl ? Math.abs(this.actionObj.clone.offsetLeft) - this.actionObj.clone.offsetWidth :
            parseInt(this.actionObj.clone.style.left, 10);
        offsetLeft = Math.round(offsetLeft / this.actionObj.cellWidth) * this.actionObj.cellWidth;
        var rightOffset;
        if (this.parent.enableRtl) {
            rightOffset = Math.abs(parseInt(this.actionObj.clone.style.right, 10));
            this.actionObj.clone.style.right = formatUnit(rightOffset);
        }
        offsetLeft = this.getOffsetValue(offsetLeft, rightOffset);
        var colIndex = this.getColumnIndex(offsetLeft);
        var dragArea = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var contentWrapRight = dragArea.getBoundingClientRect().right;
        var cursorDrag = this.parent.activeView.isTimelineView() && !this.parent.enableRtl &&
            this.actionObj.pageX > this.actionObj.clone.getBoundingClientRect().right &&
            !this.isMorePopupOpened && !(this.actionObj.pageX > contentWrapRight);
        var leftVal = (this.parent.eventDragArea) ? dragArea.scrollLeft - dragArea.offsetLeft : 0;
        if ((this.isCursorAhead || cursorDrag) && !this.isStepDragging) {
            this.isCursorAhead = true;
        }
        var cloneIndex = Math.floor((this.actionObj.pageX - this.actionObj.clone.getBoundingClientRect().left + leftVal) / this.actionObj.cellWidth);
        if (this.parent.enableRtl) {
            cloneIndex = Math.abs(Math.floor((this.actionObj.pageX - this.actionObj.clone.getBoundingClientRect().right) /
                this.actionObj.cellWidth)) - 1;
        }
        if (this.cursorPointIndex < 0) {
            this.cursorIndex(e, eventObj, offsetLeft, cloneIndex);
        }
        var tr = this.parent.getContentTable().querySelector('tr');
        var index = this.getCursorCurrentIndex(colIndex, cloneIndex, tr);
        index = index < 0 ? 0 : index;
        var eventStart = this.isHeaderRows ? new Date(this.timelineEventModule.dateRender[parseInt(index.toString(), 10)].getTime()) :
            this.parent.getDateFromElement(tr.children[parseInt(index.toString(), 10)]);
        eventStart = this.isAllDayDrag ? util.resetTime(eventStart) : eventStart;
        if (this.isStepDragging) {
            var widthDiff = this.getWidthDiff(tr, index);
            if (widthDiff !== 0) {
                var timeDiff = Math.ceil(widthDiff / this.widthPerMinute);
                eventStart.setMinutes(eventStart.getMinutes() + (timeDiff * this.actionObj.interval));
                if (this.isCursorAhead || cursorDrag) {
                    eventStart.setMilliseconds(-(eventDuration));
                }
                else {
                    eventStart.setMinutes(eventStart.getMinutes() - this.minDiff);
                    var intervalInMS = this.actionObj.interval * util.MS_PER_MINUTE;
                    timeDiff = Math.abs(eventStart.getTime() - this.actionObj.start.getTime()) / intervalInMS;
                    var roundTimeDiff = Math.trunc(timeDiff);
                    if (roundTimeDiff !== timeDiff) {
                        timeDiff = (roundTimeDiff * intervalInMS) * (eventStart > this.actionObj.start ? 1 : -1);
                        eventStart = new Date(this.actionObj.start.getTime() + timeDiff);
                    }
                }
            }
            else {
                eventStart = this.actionObj.start;
            }
        }
        else {
            if ((this.isCursorAhead || cursorDrag) && !this.isAllDayDrag) {
                var minutes = this.isTimelineDayProcess || this.isAllDayDrag ? MINUTES_PER_DAY : this.actionObj.slotInterval;
                eventStart.setMinutes(eventStart.getMinutes() + minutes);
                eventStart.setMilliseconds(-(eventDuration));
                if (eventStart.getTime() === util.resetTime(eventStart).getTime() && eventStart.getMinutes() === 0 && eventDuration === 0) {
                    eventStart.setMinutes(-minutes);
                }
            }
            else {
                eventStart.setMinutes(eventStart.getMinutes() - (this.cursorPointIndex *
                    (this.isTimelineDayProcess || this.isAllDayDrag ? MINUTES_PER_DAY : this.actionObj.slotInterval)));
            }
        }
        if (!this.isStepDragging) {
            eventStart = this.calculateIntervalTime(eventStart);
        }
        if (this.isTimelineDayProcess || this.isAllDayDrag) {
            var eventSrt = eventObj[this.parent.eventFields.startTime];
            eventStart.setHours(eventSrt.getHours(), eventSrt.getMinutes(), eventSrt.getSeconds());
        }
        if (this.parent.eventDragArea) {
            var targetDate = this.parent.getDateFromElement(e.target);
            if (!isNullOrUndefined(targetDate)) {
                if (!this.parent.activeViewOptions.timeScale.enable || (this.parent.currentView === 'TimelineMonth')) {
                    var eventSrt = eventObj[this.parent.eventFields.startTime];
                    eventStart = new Date(targetDate.setHours(eventSrt.getHours(), eventSrt.getMinutes(), eventSrt.getSeconds()));
                }
                else {
                    eventStart = targetDate;
                }
            }
        }
        var eventEnd = new Date(eventStart.getTime());
        eventEnd.setMilliseconds(eventDuration);
        var eventsData = [this.getUpdatedEvent(eventStart, eventEnd, this.actionObj.event)];
        if (this.multiData.length > 0) {
            var startTimeDiff = eventsData[0][this.parent.eventFields.startTime].getTime() - this.startTime;
            for (var i = 0; i < this.multiData.length; i++) {
                this.updatedData[parseInt(i.toString(), 10)] =
                    this.updateMultipleData(this.multiData[parseInt(i.toString(), 10)], startTimeDiff);
            }
            eventsData = this.updatedData;
        }
        for (var dataIndex = 0; dataIndex < eventsData.length; dataIndex++) {
            var cloneElement = this.multiData.length > 0 ? this.actionObj.cloneElement[parseInt(dataIndex.toString(), 10)] : this.actionObj.clone;
            if (isNullOrUndefined(this.parent.eventDragArea)) {
                var events_2 = this.timelineEventModule.splitEvent(eventsData[parseInt(dataIndex.toString(), 10)], this.timelineEventModule.dateRender);
                var eventData = events_2[0].data;
                var startTime = this.timelineEventModule.getStartTime(events_2[0], eventData);
                var endTime = this.timelineEventModule.getEndTime(events_2[0], eventData);
                // eslint-disable-next-line max-len
                var width = this.timelineEventModule.getEventWidth(startTime, endTime, eventObj[this.parent.eventFields.isAllDay], eventData.count);
                // eslint-disable-next-line max-len
                var day = this.parent.getIndexOfDate(this.timelineEventModule.dateRender, util.resetTime(new Date(startTime.getTime())));
                day = day < 0 ? 0 : day;
                var left = this.timelineEventModule.getPosition(startTime, endTime, eventObj[this.parent.eventFields.isAllDay], day);
                if (this.parent.enableRtl) {
                    cloneElement.style.right = formatUnit(left);
                }
                else {
                    cloneElement.style.left = formatUnit(left);
                }
                if (!this.isMorePopupOpened) {
                    cloneElement.style.width = formatUnit(width);
                }
            }
            if (this.parent.activeViewOptions.group.resources.length > 0) {
                this.calculateResourceGroupingPosition(e, cloneElement);
            }
            this.actionObj.start = new Date(eventStart.getTime());
            this.actionObj.end = new Date(eventEnd.getTime());
            this.updateTimePosition(this.actionObj.start, this.updatedData);
        }
    };
    DragAndDrop.prototype.getOffsetValue = function (offsetLeft, rightOffset) {
        if (this.scrollEdges.left || this.scrollEdges.right) {
            var viewEle = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
            if (this.parent.enableRtl) {
                rightOffset = viewEle.offsetWidth - viewEle.scrollLeft;
                if (this.scrollEdges.right) {
                    rightOffset = (rightOffset - viewEle.offsetWidth + this.actionObj.clone.offsetWidth) -
                        (this.actionObj.clone.offsetWidth - this.widthUptoCursorPoint);
                }
                else {
                    rightOffset = rightOffset + this.widthUptoCursorPoint;
                    if (rightOffset - this.widthUptoCursorPoint >= viewEle.scrollWidth) {
                        this.actionObj.clone.style.width =
                            formatUnit(this.actionObj.clone.offsetWidth - this.widthUptoCursorPoint + this.actionObj.cellWidth);
                        rightOffset = (viewEle.scrollLeft - viewEle.scrollWidth);
                    }
                }
                if (isNullOrUndefined(this.parent.eventDragArea)) {
                    this.actionObj.clone.style.left = formatUnit(rightOffset);
                }
            }
            else {
                if (this.scrollEdges.left) {
                    offsetLeft = viewEle.scrollLeft - this.widthUptoCursorPoint + this.actionObj.cellWidth;
                    if (viewEle.scrollLeft + viewEle.offsetWidth >= viewEle.offsetWidth) {
                        viewEle.scrollLeft = viewEle.scrollLeft - 1;
                    }
                    else if (this.actionObj.clone.offsetLeft === 0) {
                        offsetLeft = viewEle.scrollLeft;
                    }
                }
                else {
                    offsetLeft = (viewEle.scrollLeft + viewEle.offsetWidth -
                        this.actionObj.clone.offsetWidth) + (this.actionObj.clone.offsetWidth - this.widthUptoCursorPoint);
                }
                offsetLeft = offsetLeft < 0 ? 0 : offsetLeft;
                if (isNullOrUndefined(this.parent.eventDragArea)) {
                    this.actionObj.clone.style.left = formatUnit(offsetLeft);
                }
            }
        }
        return offsetLeft;
    };
    DragAndDrop.prototype.getWidthDiff = function (tr, index) {
        var pages = this.scrollArgs.element.getBoundingClientRect();
        if (pages.left <= this.actionObj.pageX && pages.right >= this.actionObj.pageX) {
            var targetLeft = tr.children[parseInt(index.toString(), 10)].offsetLeft;
            var pageX = this.actionObj.pageX - pages.left;
            if (this.parent.enableRtl) {
                return (targetLeft + this.actionObj.cellWidth) - (this.scrollArgs.element.scrollLeft + pageX);
            }
            else {
                return (this.scrollArgs.element.scrollLeft + pageX) - targetLeft;
            }
        }
        return 0;
    };
    DragAndDrop.prototype.getColumnIndex = function (offsetLeft) {
        var index = Math.round(offsetLeft / this.actionObj.cellWidth);
        if (this.isHeaderRows) {
            return index;
        }
        return this.getIndex(index);
    };
    DragAndDrop.prototype.getCursorCurrentIndex = function (colIndex, cloneIndex, tr) {
        var index = colIndex + cloneIndex;
        if (this.isHeaderRows) {
            var dateLength = Math.floor(tr.offsetWidth / this.actionObj.cellWidth);
            return (index > dateLength - 1) ? dateLength - 1 : index;
        }
        return (index > tr.children.length - 1) ? tr.children.length - 1 : index;
    };
    DragAndDrop.prototype.cursorIndex = function (e, event, left, index) {
        var td = closest(e.target, '.e-work-cells');
        if (!isNullOrUndefined(td) && !this.isMorePopupOpened) {
            var targetDate = this.parent.getDateFromElement(td);
            targetDate = this.isAllDayDrag ? util.resetTime(targetDate) : targetDate;
            if (this.isHeaderRows) {
                var currentIndex = Math.floor(left / this.actionObj.cellWidth);
                targetDate = new Date(this.timelineEventModule.dateRender[currentIndex + index].getTime());
            }
            var timeDiff = targetDate.getTime() - event[this.parent.eventFields.startTime].getTime();
            if (this.isTimelineDayProcess || this.isAllDayDrag) {
                this.cursorPointIndex = Math.abs(Math.ceil(timeDiff / (util.MS_PER_DAY)));
            }
            else {
                var widthDiff = Math.floor((timeDiff / util.MS_PER_MINUTE) / (this.actionObj.slotInterval / this.actionObj.cellWidth));
                this.cursorPointIndex = Math.floor(widthDiff / this.actionObj.cellWidth);
                this.cursorPointIndex = this.cursorPointIndex < 0 ? 0 : this.cursorPointIndex;
            }
        }
        else {
            this.cursorPointIndex = 0;
        }
    };
    DragAndDrop.prototype.calculateResourceGroupingPosition = function (e, cloneElement) {
        var dragArea = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var trCollection = [].slice.call(this.parent.element.querySelectorAll('.e-content-wrap .e-content-table tr:not(.e-hidden)'));
        var translateY = util.getTranslateY(dragArea.querySelector('table'));
        translateY = (isNullOrUndefined(translateY)) ? 0 : translateY;
        var rowHeight = (this.parent.rowAutoHeight) ?
            ~~(dragArea.querySelector('table').offsetHeight / trCollection.length) : this.actionObj.cellHeight;
        var rowIndex = Math.floor(Math.floor((this.actionObj.Y +
            (dragArea.scrollTop - translateY - (window.scrollY || window.pageYOffset))) -
            util.getElementTop(dragArea, this.parent.uiStateValues.isTransformed)) / rowHeight);
        rowIndex = (rowIndex < 0) ? 0 : (rowIndex > trCollection.length - 1) ? trCollection.length - 1 : rowIndex;
        this.actionObj.index = rowIndex;
        var eventContainer = this.parent.element.querySelectorAll('.e-appointment-container:not(.e-hidden)').item(rowIndex);
        var eventWrapper = eventContainer.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
        if (!eventWrapper) {
            eventWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
            eventContainer.appendChild(eventWrapper);
        }
        this.appendCloneElement(eventWrapper, cloneElement);
        var td = closest(this.actionObj.target, 'td');
        this.actionObj.groupIndex = (td && !isNaN(parseInt(td.getAttribute('data-group-index'), 10)))
            ? parseInt(td.getAttribute('data-group-index'), 10) : this.actionObj.groupIndex;
        if (!isNullOrUndefined(this.parent.eventDragArea)) {
            return;
        }
        var top = this.parent.getElementHeight(trCollection[parseInt(rowIndex.toString(), 10)]) * rowIndex;
        if (this.parent.rowAutoHeight) {
            var cursorElement = this.getCursorElement(e);
            if (cursorElement) {
                top = cursorElement.classList.contains(cls.WORK_CELLS_CLASS) ? cursorElement.offsetTop :
                    (cursorElement.offsetParent && cursorElement.offsetParent.classList.contains(cls.APPOINTMENT_CLASS)) ?
                        cursorElement.offsetParent.offsetTop : top;
            }
        }
        cloneElement.style.top = formatUnit(top);
    };
    DragAndDrop.prototype.appendCloneElement = function (element, cloneElement) {
        if (cloneElement === void 0) { cloneElement = null; }
        cloneElement = isNullOrUndefined(cloneElement) ? this.actionObj.clone : cloneElement;
        var dragElement = document.querySelector(this.parent.eventDragArea);
        if (this.parent.eventDragArea && dragElement) {
            dragElement.appendChild(cloneElement);
        }
        else {
            element.appendChild(cloneElement);
        }
    };
    DragAndDrop.prototype.getEventWrapper = function (index, isAllDayDrag) {
        var eventWrapper;
        if (isNullOrUndefined(isAllDayDrag)) {
            isAllDayDrag = this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS);
        }
        if (this.parent.activeViewOptions.timeScale.enable) {
            var wrapperClass = isAllDayDrag ? '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS : '.' + cls.APPOINTMENT_WRAPPER_CLASS;
            eventWrapper = this.parent.element.querySelectorAll(wrapperClass).item(index);
        }
        else {
            var targetWrapper = this.parent.element.querySelectorAll('.' + cls.WORK_CELLS_CLASS).item(index);
            eventWrapper = targetWrapper.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
            if (!eventWrapper) {
                eventWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
                targetWrapper.appendChild(eventWrapper);
            }
        }
        return eventWrapper;
    };
    DragAndDrop.prototype.getAllDayEventHeight = function () {
        var eventWrapper = createElement('div', { className: cls.APPOINTMENT_CLASS });
        this.parent.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS).appendChild(eventWrapper);
        var eventHeight = eventWrapper.offsetHeight;
        remove(eventWrapper);
        return eventHeight;
    };
    DragAndDrop.prototype.isAllowDrop = function (e) {
        if (!this.actionObj.excludeSelectors) {
            return false;
        }
        var dropSelectors = this.actionObj.excludeSelectors.split(',');
        var isAllowDrop = false;
        for (var _i = 0, dropSelectors_1 = dropSelectors; _i < dropSelectors_1.length; _i++) {
            var selector = dropSelectors_1[_i];
            if (e.target.classList.contains(selector)) {
                isAllowDrop = true;
                break;
            }
        }
        return isAllowDrop;
    };
    /**
     * Get module name.
     *
     * @returns {string} Returns the module name
     */
    DragAndDrop.prototype.getModuleName = function () {
        return 'dragAndDrop';
    };
    return DragAndDrop;
}(ActionBase));
export { DragAndDrop };
