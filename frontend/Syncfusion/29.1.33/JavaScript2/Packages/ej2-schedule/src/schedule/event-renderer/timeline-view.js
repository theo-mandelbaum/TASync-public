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
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNullOrUndefined, setStyleAttribute, extend, EventHandler, createElement } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constant';
import * as util from '../base/util';
import { MonthEvent } from './month';
var EVENT_GAP = 2;
var BLOCK_INDICATOR_WIDTH = 22;
var BLOCK_INDICATOR_HEIGHT = 18;
/**
 * Timeline view events render
 */
var TimelineEvent = /** @class */ (function (_super) {
    __extends(TimelineEvent, _super);
    function TimelineEvent(parent, type) {
        var _this = _super.call(this, parent) || this;
        _this.startHour = _this.parent.activeView.getStartHour();
        _this.endHour = _this.parent.activeView.getEndHour();
        _this.slotCount = _this.parent.activeViewOptions.timeScale.slotCount;
        _this.interval = _this.parent.activeViewOptions.timeScale.interval;
        _this.day = 0;
        _this.rowIndex = 0;
        _this.cellTops = [];
        _this.renderType = type;
        _this.eventContainers = [].slice.call(_this.element.querySelectorAll('.' + cls.APPOINTMENT_CONTAINER_CLASS));
        var tr = [].slice.call(_this.element.querySelectorAll('.' + cls.CONTENT_TABLE_CLASS + ' tbody tr'));
        _this.dayLength = tr.length === 0 ? 0 : tr[0].children.length;
        _this.content = _this.parent.element.querySelector('.' + cls.SCHEDULE_TABLE_CLASS + '.' + cls.CONTENT_TABLE_CLASS);
        return _this;
    }
    TimelineEvent.prototype.getSlotDates = function () {
        this.slots = [];
        this.slots.push(this.parent.activeView.renderDates.map(function (date) { return +date; }));
        if (this.parent.activeViewOptions.headerRows.length > 0 &&
            this.parent.activeViewOptions.headerRows.slice(-1)[0].option !== 'Hour') {
            this.renderType = 'day';
            var workCell = this.content.querySelector('.' + cls.WORK_CELLS_CLASS);
            this.cellWidth = this.parent.getElementWidth(workCell) / +(workCell.getAttribute('colspan') || 1);
            this.slotsPerDay = 1;
        }
        else {
            this.slotsPerDay = (this.dayLength / this.dateRender.length);
        }
    };
    TimelineEvent.prototype.getOverlapEvents = function (date, appointments) {
        var appointmentsList = [];
        if (this.renderType === 'day') {
            for (var _i = 0, appointments_1 = appointments; _i < appointments_1.length; _i++) {
                var app = appointments_1[_i];
                if ((util.resetTime(app[this.fields.startTime]).getTime() <= util.resetTime(new Date(date.getTime())).getTime()) &&
                    (util.resetTime(app[this.fields.endTime]).getTime() >= util.resetTime(new Date(date.getTime())).getTime())) {
                    appointmentsList.push(app);
                }
            }
        }
        else {
            for (var _a = 0, appointments_2 = appointments; _a < appointments_2.length; _a++) {
                var app = appointments_2[_a];
                var eventData = app.data;
                if ((eventData.trimStartTime.getTime() <= date.getTime() &&
                    eventData.trimEndTime.getTime() > date.getTime()) ||
                    (eventData.trimStartTime.getTime() === date.getTime() &&
                        eventData.trimEndTime.getTime() === date.getTime())) {
                    appointmentsList.push(app);
                }
            }
        }
        return appointmentsList;
    };
    TimelineEvent.prototype.getSortComparerIndex = function (startDate, endDate) {
        var appIndex = -1;
        var appointments = this.renderedEvents;
        if (appointments.length > 0) {
            var appointmentsList = this.getOverlapSortComparerEvents(startDate, endDate, appointments);
            var appLevel = appointmentsList.map(function (obj) { return obj.Index; });
            appIndex = (appLevel.length > 0) ? this.getSmallestMissingNumber(appLevel) : 0;
        }
        return (appIndex === -1) ? 0 : appIndex;
    };
    TimelineEvent.prototype.getOverlapSortComparerEvents = function (startDate, endDate, appointmentsCollection) {
        var appointments = [];
        var _loop_1 = function (app) {
            if (this_1.renderType === 'day') {
                var start_1 = util.resetTime(startDate).getTime();
                var end_1 = util.resetTime(endDate).getTime();
                var appStart_1 = util.resetTime(app[this_1.fields.startTime]).getTime();
                var appEnd_1 = util.resetTime(app[this_1.fields.endTime]).getTime();
                var isEndOverlap = function () {
                    var endTime = (end_1 - (util.getDateInMs(endDate) <= 0 ? util.MS_PER_DAY : 0));
                    endTime = start_1 > endTime ? start_1 : endTime;
                    return appEnd_1 >= endTime && appStart_1 <= endTime;
                };
                if (appStart_1 <= start_1 && appEnd_1 >= start_1 || isEndOverlap() || appStart_1 > start_1 && appEnd_1 < end_1) {
                    appointments.push(app);
                }
            }
            else {
                var eventData = app.data;
                if (((eventData.trimStartTime.getTime() <= startDate.getTime()) && (startDate.getTime() < eventData.trimEndTime.getTime())) ||
                    ((startDate.getTime() <= eventData.trimStartTime.getTime()) && (eventData.trimStartTime.getTime() < endDate.getTime()))) {
                    appointments.push(app);
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, appointmentsCollection_1 = appointmentsCollection; _i < appointmentsCollection_1.length; _i++) {
            var app = appointmentsCollection_1[_i];
            _loop_1(app);
        }
        return appointments;
    };
    TimelineEvent.prototype.renderResourceEvents = function () {
        this.removeHeightProperty(cls.RESOURCE_COLUMN_TABLE_CLASS);
        var selector = '.' + cls.RESOURCE_COLUMN_TABLE_CLASS + ' tbody tr';
        this.addCellHeight(selector, this.eventHeight, EVENT_GAP, this.moreIndicatorHeight, 0, false);
        var resources = this.parent.uiStateValues.isGroupAdaptive ?
            [this.parent.resourceBase.lastResourceLevel[this.parent.uiStateValues.groupIndex]] :
            this.parent.resourceBase.renderedResources;
        if (this.parent.crudModule && this.parent.crudModule.crudObj.isCrudAction) {
            for (var i = 0, len = this.parent.crudModule.crudObj.sourceEvent.length; i < len; i++) {
                var source = this.parent.crudModule.crudObj.sourceEvent[parseInt(i.toString(), 10)];
                this.rowIndex = source.groupIndex;
                if (!this.parent.uiStateValues.isGroupAdaptive ||
                    (this.parent.uiStateValues.groupIndex === source.groupIndex && this.parent.uiStateValues.isGroupAdaptive)) {
                    this.renderEventsHandler(this.parent.activeView.renderDates, this.parent.activeViewOptions.workDays, source);
                }
                if (this.parent.crudModule.crudObj.targetEvent[parseInt(i.toString(), 10)] && this.parent.crudModule.crudObj.sourceEvent[parseInt(i.toString(), 10)].groupIndex !==
                    this.parent.crudModule.crudObj.targetEvent[parseInt(i.toString(), 10)].groupIndex) {
                    var target = this.parent.crudModule.crudObj.targetEvent[parseInt(i.toString(), 10)];
                    this.rowIndex = target.groupIndex;
                    this.renderEventsHandler(this.parent.activeView.renderDates, this.parent.activeViewOptions.workDays, target);
                }
            }
            this.parent.crudModule.crudObj.isCrudAction = false;
        }
        else {
            for (var i = 0; i < resources.length; i++) {
                this.rowIndex = i;
                this.renderEventsHandler(this.parent.activeView.renderDates, this.parent.activeViewOptions.workDays, resources[parseInt(i.toString(), 10)]);
            }
        }
    };
    TimelineEvent.prototype.renderEvents = function (event, resIndex, appointmentsList) {
        var startTime = event[this.fields.startTime];
        var endTime = event[this.fields.endTime];
        if ((startTime.getTime() < this.parent.minDate.getTime()) || (endTime.getTime() > this.parent.maxDate.getTime())) {
            return;
        }
        var eventData = event.data;
        startTime = this.getStartTime(event, eventData);
        endTime = this.getEndTime(event, eventData);
        var startEndHours = util.getStartEndHours(event[this.fields.startTime], this.startHour, this.endHour);
        var eventDates = this.updateEventMinimumDuration(startEndHours, startTime, endTime);
        startTime = eventDates.startDate;
        endTime = eventDates.endDate;
        this.day = this.parent.getIndexOfDate(this.dateRender, util.resetTime(new Date(startTime.getTime())));
        if (this.day < 0) {
            return;
        }
        var cellTd = this.getCellTd();
        var eventsPerRow = this.parent.rowAutoHeight ? 1 : this.parent.activeViewOptions.maxEventsPerRow;
        var overlapCount = (isNullOrUndefined(this.parent.eventSettings.sortComparer)) ? this.getIndex(startTime) : this.getSortComparerIndex(startTime, endTime);
        event.Index = overlapCount;
        var appHeight = this.eventHeight;
        var diffInDays = eventData.count;
        var eventObj = extend({}, event, null, true);
        eventObj[this.fields.startTime] = eventData[this.fields.startTime];
        eventObj[this.fields.endTime] = eventData[this.fields.endTime];
        var currentDate = util.resetTime(new Date(this.dateRender[this.day].getTime()));
        var schedule = util.getStartEndHours(currentDate, this.startHour, this.endHour);
        var isValidEvent = true;
        if (this.isDayProcess() || eventObj[this.fields.isAllDay]) {
            isValidEvent = true;
        }
        else {
            isValidEvent = this.isValidEvent(eventObj, startTime, endTime, schedule);
        }
        if (startTime <= endTime && isValidEvent) {
            var appWidth = this.getEventWidth(startTime, endTime, event[this.fields.isAllDay], diffInDays);
            appWidth = this.renderType === 'day' ? appWidth - 2 : appWidth;
            var appLeft = 0;
            var appRight = 0;
            var position = this.getPosition(startTime, endTime, event[this.fields.isAllDay], this.day);
            appWidth = (appWidth <= 0) ? this.cellWidth : appWidth; // appWidth 0 when start and end time as same
            this.renderedEvents.push(extend({}, event, null, true));
            if (isNullOrUndefined(this.cellTops[parseInt(resIndex.toString(), 10)])) {
                this.cellTops[parseInt(resIndex.toString(), 10)] = this.getRowTop(resIndex);
            }
            var top_1 = this.cellTops[parseInt(resIndex.toString(), 10)];
            var appTop = (top_1 + (this.maxHeight ? 0 : EVENT_GAP)) + (overlapCount * (appHeight + EVENT_GAP));
            appLeft = (this.parent.enableRtl) ? 0 : position;
            appRight = (this.parent.enableRtl) ? position : 0;
            var height = ((overlapCount + 1) * (appHeight + EVENT_GAP)) + this.moreIndicatorHeight;
            var renderApp = this.parent.activeViewOptions.maxEventsPerRow && !this.parent.rowAutoHeight && !this.parent.eventSettings.enableIndicator
                ? overlapCount < eventsPerRow : this.maxOrIndicator ? overlapCount < 1 ? true : false : this.cellHeight > height;
            if (this.parent.rowAutoHeight || renderApp) {
                var appointmentElement = void 0;
                if (isNullOrUndefined(this.inlineValue)) {
                    appointmentElement = this.createAppointmentElement(event, resIndex);
                }
                else {
                    appointmentElement = this.parent.inlineModule.createInlineAppointmentElement();
                }
                this.applyResourceColor(appointmentElement, event, 'backgroundColor', this.groupOrder);
                setStyleAttribute(appointmentElement, {
                    'width': appWidth + 'px', 'left': appLeft + 'px', 'right': appRight + 'px', 'top': appTop + 'px'
                });
                this.wireAppointmentEvents(appointmentElement, event);
                if (this.parent.rowAutoHeight) {
                    var conWrap = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
                    var conWidth = this.parent.getElementWidth(conWrap);
                    var isWithoutScroll = conWrap.offsetHeight === conWrap.clientHeight &&
                        conWrap.offsetWidth === conWrap.clientWidth;
                    this.renderEventElement(event, appointmentElement, cellTd);
                    var firstChild = this.getFirstChild(resIndex);
                    this.updateCellHeight(firstChild, height);
                    if (isWithoutScroll &&
                        (conWrap.offsetWidth > conWrap.clientWidth || conWidth !== this.parent.getElementWidth(conWrap))) {
                        this.adjustAppointments(conWidth);
                    }
                }
                else {
                    this.renderEventElement(event, appointmentElement, cellTd);
                }
            }
            else {
                for (var i = 0; i < diffInDays; i++) {
                    var moreIndicator = cellTd.querySelector('.' + cls.MORE_INDICATOR_CLASS);
                    var appPos = (this.parent.enableRtl) ? appRight : appLeft;
                    appPos = (Math.floor(appPos / this.cellWidth) * this.cellWidth);
                    var interval = this.interval / this.slotCount;
                    var startDate = (this.parent.activeViewOptions.option === 'TimelineMonth' || this.renderType === 'day' || i !== 0) ?
                        new Date(this.dateRender[this.day + i].getTime()) : new Date(startTime);
                    var endDate = util.addDays(this.dateRender[this.day + i], 1);
                    if (this.parent.activeViewOptions.option === 'TimelineMonth' || this.renderType === 'day') {
                        var position_1 = this.getPosition(startDate, endDate, event[this.fields.isAllDay], (this.day + i));
                        this.renderTimelineMoreIndicator(startTime, startDate, endDate, appHeight, interval, resIndex, appointmentsList, top_1, appLeft, appRight, cellTd, moreIndicator, appPos, position_1);
                    }
                    else {
                        var slotCount = (util.getUniversalTime(endTime) - util.getUniversalTime(startTime)) / util.MS_PER_MINUTE *
                            this.slotCount / this.interval;
                        for (var k = 0; k < slotCount; k++) {
                            startDate = (k === 0) ? new Date(startDate.getTime()) : new Date(startDate.getTime() + (60000 * interval));
                            if (slotCount < 1) {
                                startDate = this.adjustToNearestTimeSlot(startDate, interval);
                            }
                            endDate = new Date(startDate.getTime() + (60000 * interval));
                            if (slotCount >= 1 && endDate.getTime() > endTime.getTime()) {
                                break;
                            }
                            var position_2 = this.getPosition(startDate, endDate, false, (this.day + i));
                            if (appPos > position_2) {
                                break;
                            }
                            appPos = position_2;
                            this.renderTimelineMoreIndicator(startTime, startDate, endDate, appHeight, interval, resIndex, appointmentsList, top_1, appLeft, appRight, cellTd, moreIndicator, appPos, position_2);
                        }
                    }
                }
            }
        }
        this.parent.renderTemplates();
    };
    TimelineEvent.prototype.adjustToNearestTimeSlot = function (inputTime, interval) {
        // Parse the input time
        var parsedTime = new Date(inputTime);
        // Get the minutes of the input time in milliseconds
        var minutesInMilliseconds = parsedTime.getHours() * 60 * 60 * 1000 + parsedTime.getMinutes() * 60 * 1000;
        // Calculate the adjusted time in milliseconds (nearest time slot)
        var adjustedMinutesInMilliseconds = Math.floor(minutesInMilliseconds / (interval * 60 * 1000)) * (interval * 60 * 1000);
        // Create a new Date object with the adjusted time
        var adjustedTime = new Date(parsedTime.getTime());
        adjustedTime.setHours(adjustedMinutesInMilliseconds / (60 * 60 * 1000) % 24);
        adjustedTime.setMinutes((adjustedMinutesInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
        // Return the adjusted time in string format
        return adjustedTime;
    };
    TimelineEvent.prototype.renderTimelineMoreIndicator = function (startTime, startDate, endDate, appHeight, interval, resIndex, appointmentsList, top, appLeft, appRight, cellTd, moreIndicator, appPos, position) {
        appLeft = (this.parent.enableRtl) ? appRight = position : position;
        appPos = (this.parent.enableRtl) ? appRight : appLeft;
        appPos = (Math.floor(appPos / this.cellWidth) * this.cellWidth);
        if ((cellTd && isNullOrUndefined(moreIndicator)) ||
            (!this.isAlreadyAvail(appPos, cellTd))) {
            var startDateTime = (this.parent.activeViewOptions.option === 'TimelineMonth' || this.renderType === 'day') ? new Date(+startTime) : startDate;
            var slotStartTime = (new Date(startDateTime.setMinutes(Math.floor(startDateTime.getMinutes() / interval) * interval)));
            var slotEndTime = new Date(slotStartTime.getTime() + (60000 * interval));
            var groupIndex = void 0;
            if (this.parent.activeViewOptions.group.resources.length > 0 && !isNullOrUndefined(resIndex)) {
                groupIndex = resIndex.toString();
            }
            var filterEvents = this.getFilterEvents(startDate, endDate, slotStartTime, slotEndTime, groupIndex, appointmentsList);
            var appArea = this.cellHeight - this.moreIndicatorHeight;
            appHeight = this.withIndicator ? appArea - EVENT_GAP : appHeight;
            var renderedAppCount = Math.floor(appArea / (appHeight + EVENT_GAP));
            var count = this.parent.activeViewOptions.maxEventsPerRow && !this.parent.eventSettings.enableIndicator
                ? filterEvents.length - this.parent.activeViewOptions.maxEventsPerRow : (filterEvents.length - renderedAppCount) <= 0 ? 1
                : filterEvents.length - renderedAppCount;
            var moreIndicatorElement = void 0;
            if (this.renderType === 'day') {
                moreIndicatorElement = this.getMoreIndicatorElement(count, startDate, endDate);
            }
            else {
                moreIndicatorElement = this.getMoreIndicatorElement(count, slotStartTime, slotEndTime);
            }
            if (!isNullOrUndefined(groupIndex)) {
                moreIndicatorElement.setAttribute('data-group-index', groupIndex);
            }
            moreIndicatorElement.style.top = top + appArea + 'px';
            moreIndicatorElement.style.width = this.cellWidth + 'px';
            moreIndicatorElement.style.left = (Math.floor(appLeft / this.cellWidth) * this.cellWidth) + 'px';
            moreIndicatorElement.style.right = (Math.floor(appRight / this.cellWidth) * this.cellWidth) + 'px';
            this.renderElement(cellTd, moreIndicatorElement);
            EventHandler.add(moreIndicatorElement, 'click', this.moreIndicatorClick, this);
        }
    };
    TimelineEvent.prototype.updateCellHeight = function (cell, height) {
        var cellHeight = cell.style.height === '' ? this.cellHeight : parseInt(cell.style.height, 10);
        if (height > cellHeight) {
            setStyleAttribute(cell, { 'height': height + 'px' });
            if (this.parent.activeViewOptions.group.resources.length > 0) {
                var resourceCell = this.parent.element.querySelector('.' + cls.RESOURCE_COLUMN_TABLE_CLASS + ' ' + 'tbody td[data-group-index="' +
                    cell.getAttribute('data-group-index') + '"]');
                if (resourceCell) {
                    setStyleAttribute(resourceCell, { 'height': height + 'px' });
                }
            }
            var monthHeader = this.parent.element.querySelector('.e-month-header-wrapper table tr:nth-child(' +
                (cell.parentElement.rowIndex + 1) + ') td');
            if (monthHeader) {
                setStyleAttribute(monthHeader, { 'height': height + 'px' });
            }
        }
    };
    TimelineEvent.prototype.adjustAppointments = function (conWidth) {
        var _this = this;
        var tr = this.parent.element.querySelector('.' + cls.CONTENT_TABLE_CLASS + ' tbody tr');
        var actualCellWidth = this.parent.getElementWidth(this.workCells[0]);
        this.cellWidth = actualCellWidth / +(this.workCells[0].getAttribute('colspan') || 1);
        var currentPercentage = (actualCellWidth * tr.children.length) / (conWidth / 100);
        var apps = [].slice.call(this.parent.element.querySelectorAll('.' + cls.APPOINTMENT_CLASS));
        apps.forEach(function (app) {
            if (_this.parent.enableRtl && app.style.right !== '0px') {
                app.style.right = ((parseFloat(app.style.right) / 100) * currentPercentage) + 'px';
            }
            else if (app.style.left !== '0px') {
                app.style.left = ((parseFloat(app.style.left) / 100) * currentPercentage) + 'px';
            }
            app.style.width = ((parseFloat(app.style.width) / 100) * currentPercentage) + 'px';
        });
    };
    TimelineEvent.prototype.getFirstChild = function (index) {
        var query = '.' + cls.CONTENT_TABLE_CLASS + ' tbody td';
        var groupIndex = '';
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            groupIndex = '[data-group-index="' + index.toString() + '"]';
        }
        var td = this.parent.element.querySelector(query + groupIndex);
        return td;
    };
    TimelineEvent.prototype.updateBlockElements = function () {
        var blockElement = [].slice.call(this.element.querySelectorAll('.' + cls.BLOCK_APPOINTMENT_CLASS));
        for (var _i = 0, blockElement_1 = blockElement; _i < blockElement_1.length; _i++) {
            var element = blockElement_1[_i];
            var resIndex = parseInt(element.getAttribute('data-group-index'), 10);
            var firstChild = this.getFirstChild(resIndex);
            element.style.height = firstChild.offsetHeight + 'px';
            var width = element.offsetWidth / firstChild.offsetWidth;
            element.style.width = (firstChild.offsetWidth * width) + 'px';
        }
        var blockIndicator = [].slice.call(this.element.querySelectorAll('.' + cls.BLOCK_INDICATOR_CLASS));
        for (var _a = 0, blockIndicator_1 = blockIndicator; _a < blockIndicator_1.length; _a++) {
            var element = blockIndicator_1[_a];
            var resIndex = parseInt(element.getAttribute('data-group-index'), 10);
            element.style.top = this.getRowTop(resIndex) +
                this.getFirstChild(resIndex).offsetHeight - BLOCK_INDICATOR_HEIGHT + 'px';
        }
    };
    TimelineEvent.prototype.getStartTime = function (event, eventData) {
        var startTime = event[this.fields.startTime];
        var schedule = util.getStartEndHours(startTime, this.startHour, this.endHour);
        if (this.isDayProcess()) {
            startTime = event[this.fields.startTime];
        }
        else {
            if (schedule.startHour.getTime() >= eventData[this.fields.startTime]) {
                startTime = schedule.startHour;
            }
            else if (schedule.endHour.getTime() <= eventData[this.fields.startTime]) {
                startTime = this.getNextDay(schedule.startHour, eventData);
            }
            else {
                startTime = eventData[this.fields.startTime];
            }
        }
        // To overcome the overflow
        eventData.trimStartTime = (event[this.fields.isAllDay]) ? schedule.startHour : eventData[this.fields.startTime];
        return startTime;
    };
    TimelineEvent.prototype.getNextDay = function (startTime, eventData) {
        var startDate;
        for (var i = 1; i <= this.dateRender.length; i++) {
            startDate = util.addDays(startTime, i);
            if (this.parent.getIndexOfDate(this.dateRender, util.resetTime(new Date(startTime.getTime()))) !== -1) {
                eventData.count = eventData.count - 1;
                return startDate;
            }
        }
        return startDate;
    };
    TimelineEvent.prototype.getEndTime = function (event, eventData) {
        var endTime = event[this.fields.endTime];
        var schedule = util.getStartEndHours(endTime, this.startHour, this.endHour);
        if (this.isDayProcess()) {
            endTime = eventData[this.fields.endTime];
        }
        else {
            endTime = eventData[this.fields.endTime];
            if (schedule.endHour.getTime() <= eventData[this.fields.endTime] || event[this.fields.isAllDay]) {
                endTime = schedule.endHour;
            }
            if (schedule.startHour.getTime() >= eventData[this.fields.endTime].getTime() && !event[this.fields.isAllDay]) {
                endTime = this.getPreviousDay(schedule.startHour, schedule.endHour, eventData);
            }
        }
        // To overcome the overflow
        eventData.trimEndTime = (event[this.fields.isAllDay]) ? schedule.endHour : eventData[this.fields.endTime];
        return endTime;
    };
    TimelineEvent.prototype.getPreviousDay = function (startTime, endTime, eventData) {
        for (var i = 1; i <= this.dateRender.length; i++) {
            var endDate = util.addDays(endTime, -i);
            if (this.parent.getIndexOfDate(this.dateRender, util.resetTime(new Date(startTime.getTime()))) !== -1) {
                endDate = util.resetTime(new Date(endDate.getTime()));
                endDate.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());
                var count = eventData.count;
                var actualEndTime = eventData[this.fields.endTime];
                eventData.count = actualEndTime.getHours() !== 0 || actualEndTime.getMinutes() !== 0 ? count - 1 : count;
                return endDate;
            }
        }
        return eventData[this.fields.endTime];
    };
    TimelineEvent.prototype.getEventWidth = function (startDate, endDate, isAllDay, count) {
        if (this.renderType === 'day' || isAllDay) {
            return (count * this.slotsPerDay) * this.cellWidth;
        }
        if (this.isSameDay(startDate, endDate)) {
            return this.getSameDayEventsWidth(startDate, endDate);
        }
        else {
            return this.getSpannedEventsWidth(startDate, endDate, count);
        }
    };
    TimelineEvent.prototype.getSameDayEventsWidth = function (startDate, endDate) {
        return ((util.getUniversalTime(endDate) - util.getUniversalTime(startDate)) /
            util.MS_PER_MINUTE * (this.cellWidth * this.slotCount) / this.getIntervalInMinutes(startDate));
    };
    TimelineEvent.prototype.getSpannedEventsWidth = function (startDate, endDate, diffInDays) {
        var width = (diffInDays * this.slotsPerDay) * this.cellWidth;
        var endWidth;
        var start = util.getStartEndHours(util.resetTime(new Date(startDate.getTime())), this.startHour, this.endHour);
        var startWidth = this.getSameDayEventsWidth(start.startHour, startDate);
        if (this.parent.getIndexOfDate(this.dateRender, util.resetTime(new Date(endDate.getTime()))) === -1) {
            endWidth = 0;
        }
        else {
            var _a = util.getStartEndHours(util.resetTime(new Date(endDate.getTime())), this.startHour, this.endHour), startHour = _a.startHour, endHour = _a.endHour;
            var interval = this.interval / this.slotCount;
            var lastSlotEndTime = this.getEndTimeOfLastSlot(startHour, endHour, interval);
            var adjustedEndDate = endHour < lastSlotEndTime ? endHour : lastSlotEndTime;
            endWidth = this.getSameDayEventsWidth(endDate, adjustedEndDate);
            endWidth = ((this.slotsPerDay * this.cellWidth) === endWidth) ? 0 : endWidth;
        }
        var spannedWidth = startWidth + endWidth;
        return (width > spannedWidth) ? width - spannedWidth : width - startWidth;
    };
    TimelineEvent.prototype.getEndTimeOfLastSlot = function (startHour, endHour, interval) {
        var minutesInDay = (endHour.getTime() - startHour.getTime()) / (1000 * 60);
        var lastSlotEndMinutes = Math.floor(minutesInDay / interval) * interval;
        var lastSlotEndTime = new Date(startHour);
        lastSlotEndTime.setMinutes(lastSlotEndMinutes);
        return lastSlotEndTime;
    };
    TimelineEvent.prototype.isSameDay = function (startTime, endTime) {
        var startDay = this.parent.getIndexOfDate(this.dateRender, util.resetTime(new Date(startTime.getTime())));
        var endDay = this.parent.getIndexOfDate(this.dateRender, util.resetTime(new Date(endTime.getTime())));
        return (startDay === endDay);
    };
    TimelineEvent.prototype.getAppointmentLeft = function (schedule, startTime, day) {
        var slotTd = (this.isSameDay(startTime, schedule.startHour)) ?
            ((util.getUniversalTime(startTime) - util.getUniversalTime(schedule.startHour)) /
                (util.MS_PER_MINUTE * this.getIntervalInMinutes(startTime))) * this.slotCount : 0;
        if (day === 0) {
            return slotTd;
        }
        else {
            var daySlot = Math.round(((util.getUniversalTime(schedule.endHour) - util.getUniversalTime(schedule.startHour)) /
                this.interval / util.MS_PER_MINUTE) * this.slotCount);
            return (daySlot * day) + slotTd;
        }
    };
    TimelineEvent.prototype.getPosition = function (startTime, endTime, isAllDay, day) {
        if (this.renderType === 'day' || isAllDay) {
            return (day * this.slotsPerDay) * this.cellWidth;
        }
        var currentDate = util.resetTime(new Date(this.dateRender[parseInt(day.toString(), 10)].getTime()));
        var schedule = util.getStartEndHours(currentDate, this.startHour, this.endHour);
        var cellIndex;
        if (schedule.endHour.getTime() <= endTime.getTime() && schedule.startHour.getTime() >= startTime.getTime()) {
            cellIndex = this.getAppointmentLeft(schedule, schedule.startHour, day);
        }
        else if (schedule.endHour.getTime() <= endTime.getTime()) {
            cellIndex = this.getAppointmentLeft(schedule, startTime, day);
        }
        else if (schedule.startHour.getTime() >= startTime.getTime()) {
            cellIndex = this.getAppointmentLeft(schedule, schedule.startHour, day);
        }
        else {
            cellIndex = this.getAppointmentLeft(schedule, startTime, day);
        }
        return cellIndex * this.cellWidth;
    };
    TimelineEvent.prototype.getFilterEvents = function (startDate, endDate, startTime, endTime, gIndex, eventsList) {
        if (this.renderType === 'day') {
            return this.getFilteredEvents(startDate, endDate, gIndex, eventsList);
        }
        else {
            return this.getFilteredEvents(startTime, endTime, gIndex, eventsList);
        }
    };
    TimelineEvent.prototype.getIntervalInMinutes = function (startDate) {
        if (this.slotsPerDay !== 1) {
            return this.interval;
        }
        var hoursRange = util.getStartEndHours(util.resetTime(new Date(startDate.getTime())), this.startHour, this.endHour);
        return (hoursRange.endHour.getTime() - hoursRange.startHour.getTime()) / util.MS_PER_MINUTE;
    };
    TimelineEvent.prototype.isAlreadyAvail = function (appPos, cellTd) {
        var moreIndicator = [].slice.call(cellTd.querySelectorAll('.' + cls.MORE_INDICATOR_CLASS));
        for (var i = 0; i < moreIndicator.length; i++) {
            var indicatorPos = void 0;
            if (moreIndicator) {
                indicatorPos = (this.parent.enableRtl) ? moreIndicator[parseInt(i.toString(), 10)].style.right : moreIndicator[parseInt(i.toString(), 10)].style.left;
            }
            if (parseInt(indicatorPos, 10) === Math.floor(appPos)) {
                return true;
            }
        }
        return false;
    };
    TimelineEvent.prototype.getRowTop = function (resIndex) {
        if (this.parent.activeViewOptions.group.resources.length > 0 && !this.parent.uiStateValues.isGroupAdaptive) {
            return this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS +
                ' ' + 'tbody td[data-group-index="' + resIndex.toString() + '"]').offsetTop;
        }
        return 0;
    };
    TimelineEvent.prototype.getCellTd = function () {
        var wrapIndex = this.parent.uiStateValues.isGroupAdaptive ? 0 : this.rowIndex;
        return this.eventContainers[parseInt(wrapIndex.toString(), 10)];
    };
    TimelineEvent.prototype.renderBlockIndicator = function (cellTd, position, resIndex) {
        // No need to render block icon for Year, Month and Week header rows
        if (this.parent.headerRows.length > 0 &&
            (this.parent.headerRows[this.parent.headerRows.length - 1].option !== 'Hour' ||
                this.parent.headerRows[this.parent.headerRows.length - 1].option !== 'Date')) {
            return;
        }
        position = (Math.floor(position / this.cellWidth) * this.cellWidth) + this.cellWidth - BLOCK_INDICATOR_WIDTH;
        if (!this.isAlreadyAvail(position, cellTd)) {
            var blockIndicator = createElement('div', { className: 'e-icons ' + cls.BLOCK_INDICATOR_CLASS });
            if (this.parent.activeViewOptions.group.resources.length > 0) {
                blockIndicator.setAttribute('data-group-index', resIndex.toString());
            }
            if (this.parent.enableRtl) {
                blockIndicator.style.right = position + 'px';
            }
            else {
                blockIndicator.style.left = position + 'px';
            }
            blockIndicator.style.top = this.getRowTop(resIndex) + this.cellHeight - BLOCK_INDICATOR_HEIGHT + 'px';
            this.renderElement(cellTd, blockIndicator);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TimelineEvent.prototype.setMaxEventHeight = function (event, cell) {
        setStyleAttribute(event, {
            'height': (this.cellHeight - (this.maxHeight ? 0 : EVENT_GAP) - (this.maxHeight ? 0 : this.moreIndicatorHeight)) + 'px'
        });
    };
    TimelineEvent.prototype.isDayProcess = function () {
        if (this.parent.currentView === 'TimelineMonth' || !this.parent.activeViewOptions.timeScale.enable ||
            (this.parent.activeViewOptions.headerRows.length > 0 &&
                this.parent.activeViewOptions.headerRows.slice(-1)[0].option !== 'Hour')) {
            return true;
        }
        return false;
    };
    TimelineEvent.prototype.destroy = function () {
        this.renderType = null;
        this.eventContainers = null;
        this.dayLength = null;
        this.content = null;
        _super.prototype.destroy.call(this);
        this.parent = null;
    };
    return TimelineEvent;
}(MonthEvent));
export { TimelineEvent };
