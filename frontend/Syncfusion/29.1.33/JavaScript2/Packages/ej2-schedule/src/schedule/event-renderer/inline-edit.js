/* eslint-disable @typescript-eslint/no-explicit-any */
import { addClass, createElement, closest, remove, removeClass, isNullOrUndefined } from '@syncfusion/ej2-base';
import { VerticalEvent } from '../event-renderer/vertical-view';
import { MonthEvent } from '../event-renderer/month';
import { TimelineEvent } from '../event-renderer/timeline-view';
import * as cls from '../base/css-constant';
import * as events from '../base/constant';
import * as util from '../base/util';
/**
 * Inline Edit interactions
 */
var InlineEdit = /** @class */ (function () {
    function InlineEdit(parent) {
        this.parent = parent;
        this.parent.on(events.inlineClick, this.inlineEdit, this);
    }
    InlineEdit.prototype.inlineEdit = function (args) {
        if (this.parent.quickPopup) {
            this.parent.quickPopup.quickPopupHide();
        }
        if (args.type === 'Cell') {
            var moreWrapper = this.parent.element.querySelector('.' + cls.MORE_POPUP_WRAPPER_CLASS);
            if (moreWrapper && moreWrapper.classList.contains(cls.POPUP_OPEN)) {
                this.parent.quickPopup.morePopup.hide();
            }
            this.removeInlineAppointmentElement();
            this.cellEdit(args);
        }
        else {
            if (this.parent.element.querySelector('.' + cls.INLINE_SUBJECT_CLASS) !==
                args.element.querySelector('.' + cls.INLINE_SUBJECT_CLASS)) {
                this.removeInlineAppointmentElement();
            }
            this.eventEdit(args);
        }
    };
    InlineEdit.prototype.cellEdit = function (args) {
        var saveObj = this.generateEventData();
        var cellIndex = args.element.cellIndex;
        var count = this.getEventDaysCount(saveObj);
        if (count > 1) {
            count = Math.round(count);
            count--;
            cellIndex = cellIndex - count;
        }
        var start = util.resetTime(new Date('' + saveObj[this.parent.eventFields.startTime])).getTime();
        var end = util.resetTime(new Date('' + saveObj[this.parent.eventFields.endTime])).getTime();
        var resIndex = args.groupIndex || 0;
        var isVertical = this.parent.currentView === 'Day' || this.parent.currentView === 'Week' || this.parent.currentView === 'WorkWeek';
        if (this.parent.activeViewOptions.timeScale.enable && isVertical) {
            var dayIndex = saveObj[this.parent.eventFields.startTime].getDay();
            this.createVerticalViewInline(saveObj, dayIndex, resIndex, cellIndex);
        }
        else if (this.parent.currentView === 'Month' || (!this.parent.activeViewOptions.timeScale.enable && isVertical)) {
            this.createMonthViewInline(saveObj, resIndex, start, end);
        }
        else {
            this.createTimelineViewInline(saveObj, start, end, resIndex);
        }
        var inlineSubject = this.parent.element.querySelector('.' + cls.INLINE_SUBJECT_CLASS);
        if (inlineSubject) {
            inlineSubject.focus();
        }
    };
    InlineEdit.prototype.eventEdit = function (args) {
        var inlineSubject = args.element.querySelector('.' + cls.INLINE_SUBJECT_CLASS);
        var subject;
        if (inlineSubject) {
            subject = inlineSubject.value;
        }
        else {
            var subEle = args.element.querySelector('.' + cls.SUBJECT_CLASS);
            if (!isNullOrUndefined(subEle)) {
                addClass([subEle], cls.DISABLE_CLASS);
                subject = subEle.innerText;
            }
            else {
                subject = args.data[this.parent.eventFields.subject];
            }
            inlineSubject = this.inlineInputEle =
                createElement('input', { className: cls.INLINE_SUBJECT_CLASS, attrs: { value: subject } });
            if (closest(args.element, '.' + cls.MORE_POPUP_WRAPPER_CLASS)) {
                args.element.insertBefore(inlineSubject, subEle);
            }
            else if (['Agenda', 'MonthAgenda'].indexOf(this.parent.currentView) > -1) {
                var subjectWrap = args.element.querySelector('.' + cls.SUBJECT_WRAP);
                if (isNullOrUndefined(subjectWrap)) {
                    subjectWrap = createElement('div', { className: cls.SUBJECT_WRAP });
                    args.element.prepend(subjectWrap);
                }
                subjectWrap.insertBefore(inlineSubject, subjectWrap.firstChild);
            }
            else {
                var elementSelector = ['TimelineDay', 'TimelineWeek', 'TimelineWorkWeek', 'TimelineMonth'].indexOf(this.parent.currentView) > -1 ?
                    '.e-inner-wrap' : '.e-appointment-details';
                var innerWrapElement = args.element.querySelector(elementSelector);
                if (isNullOrUndefined(innerWrapElement)) {
                    args.element.querySelector('.e-appointment-details').prepend(inlineSubject);
                }
                else {
                    innerWrapElement.prepend(inlineSubject);
                }
            }
            inlineSubject.focus();
        }
        inlineSubject.setSelectionRange(subject.length, subject.length);
    };
    InlineEdit.prototype.createVerticalViewInline = function (saveObj, dayIndex, resIndex, daysCount) {
        var _a;
        var count = this.getEventDaysCount(saveObj);
        var verticalEvent = new VerticalEvent(this.parent);
        verticalEvent.initializeValues();
        var index = verticalEvent.dateRender[parseInt(resIndex.toString(), 10)].map(function (date) { return date.getDay(); }).indexOf(dayIndex);
        if (count >= 1) {
            verticalEvent.allDayElement = [].slice.call(this.parent.element.querySelectorAll('.' + cls.ALLDAY_CELLS_CLASS));
            (_a = verticalEvent.slots).push.apply(_a, this.parent.activeView.renderDates.map(function (date) { return +date; }));
            var allDayElements = [].slice.call(this.parent.element.querySelectorAll('.' + cls.ALLDAY_APPOINTMENT_CLASS));
            var allDayLevel = 0;
            if (allDayElements.length > 0) {
                allDayLevel = Math.floor(this.parent.getElementHeight(this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS)) /
                    allDayElements[0].offsetHeight) - 1;
            }
            verticalEvent.allDayLevel = allDayLevel;
            var appHeight = this.parent.getElementHeightFromClass(this.parent.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS), cls.APPOINTMENT_CLASS);
            var cellTop = verticalEvent.allDayElement.length > 0 ? verticalEvent.allDayElement[0].offsetTop : 0;
            verticalEvent.renderAllDayEvents(saveObj, index, resIndex, daysCount, this.parent.allowInline, cellTop, appHeight);
        }
        else {
            verticalEvent.renderNormalEvents(saveObj, index, resIndex, daysCount, this.parent.allowInline);
        }
    };
    InlineEdit.prototype.createMonthViewInline = function (saveObj, index, start, end) {
        var count = this.getEventDaysCount(saveObj);
        var saveObject = this.parent.eventBase.cloneEventObject(saveObj, start, end, count, false, false);
        var monthEvent = new MonthEvent(this.parent);
        monthEvent.dateRender = this.parent.activeView.renderDates;
        monthEvent.inlineValue = this.parent.allowInline;
        var renderDates = this.parent.activeView.renderDates;
        var workDays = this.parent.activeViewOptions.workDays;
        var monthCellSelector = '.' + cls.WORK_CELLS_CLASS;
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            monthCellSelector += '[data-group-index="' + index + '"]';
            var resourceData = this.parent.resourceBase.lastResourceLevel[parseInt(index.toString(), 10)];
            renderDates = resourceData.renderDates;
            workDays = resourceData.workDays;
        }
        monthEvent.dateRender = renderDates;
        monthEvent.workCells = [].slice.call(this.parent.element.querySelectorAll(monthCellSelector));
        monthEvent.cellWidth = monthEvent.workCells[0].offsetWidth;
        monthEvent.cellHeight = monthEvent.workCells[0].offsetHeight;
        monthEvent.eventHeight =
            this.parent.getElementHeightFromClass(this.parent.monthModule.element || monthEvent.element, cls.APPOINTMENT_CLASS);
        monthEvent.getSlotDates(workDays);
        var filteredDates = monthEvent.getRenderedDates(renderDates);
        var spannedEvents = monthEvent.splitEvent(saveObject, filteredDates || renderDates);
        for (var _i = 0, spannedEvents_1 = spannedEvents; _i < spannedEvents_1.length; _i++) {
            var eventData = spannedEvents_1[_i];
            monthEvent.renderEvents(eventData, index);
        }
        var inlineSubject = this.parent.element.querySelector('.' + cls.INLINE_SUBJECT_CLASS);
        inlineSubject.focus();
    };
    InlineEdit.prototype.createTimelineViewInline = function (saveObj, start, end, resIndex) {
        var count = this.getEventDaysCount(saveObj);
        var saveObject = this.parent.eventBase.cloneEventObject(saveObj, start, end, count, false, false);
        var timelineView = new TimelineEvent(this.parent, this.parent.activeViewOptions.timeScale.enable ? 'hour' : 'day');
        timelineView.dateRender = this.parent.activeView.renderDates;
        timelineView.eventContainers = [].slice.call(this.parent.element.querySelectorAll('.' + cls.APPOINTMENT_CONTAINER_CLASS));
        var workCell = this.parent.element.querySelector('.' + cls.WORK_CELLS_CLASS);
        timelineView.inlineValue = this.parent.allowInline;
        timelineView.cellWidth = workCell.offsetWidth;
        timelineView.cellHeight = workCell.offsetHeight;
        var dayLength = this.parent.element.querySelectorAll('.' + cls.CONTENT_TABLE_CLASS + ' tbody tr').length === 0 ?
            0 : this.parent.element.querySelectorAll('.' + cls.CONTENT_TABLE_CLASS + ' tbody tr')[0].children.length;
        timelineView.slotsPerDay = dayLength / timelineView.dateRender.length;
        timelineView.eventHeight = this.parent.getElementHeightFromClass(timelineView.element, cls.APPOINTMENT_CLASS);
        timelineView.renderEvents(saveObject, resIndex);
    };
    InlineEdit.prototype.getEventDaysCount = function (saveObj) {
        var startDate = saveObj[this.parent.eventFields.startTime];
        var endDate = saveObj[this.parent.eventFields.endTime];
        var daysCount = Math.abs(endDate.getTime() - startDate.getTime()) / util.MS_PER_DAY;
        return daysCount;
    };
    InlineEdit.prototype.generateEventData = function (target) {
        var inlineElement = this.parent.element.querySelector('.' + cls.INLINE_SUBJECT_CLASS);
        var subject = inlineElement ? inlineElement.value : target ? target.innerHTML : '';
        var saveObj = {};
        saveObj[this.parent.eventFields.id] = this.parent.eventBase.getEventMaxID();
        saveObj[this.parent.eventFields.subject] = subject;
        saveObj[this.parent.eventFields.startTime] = this.parent.activeCellsData.startTime;
        saveObj[this.parent.eventFields.endTime] = this.parent.activeCellsData.endTime;
        saveObj[this.parent.eventFields.isAllDay] = this.parent.activeCellsData.isAllDay;
        this.parent.eventWindow.setDefaultValueToObject(saveObj);
        if (this.parent.resourceBase) {
            this.parent.resourceBase.setResourceValues(saveObj, this.parent.activeCellsData.groupIndex);
        }
        return saveObj;
    };
    InlineEdit.prototype.documentClick = function (target) {
        if (target && target.value !== '') {
            this.inlineCrudActions(target);
        }
        else {
            this.removeInlineAppointmentElement();
        }
    };
    InlineEdit.prototype.inlineCrudActions = function (target) {
        if (closest(target, '.' + cls.INLINE_APPOINTMENT_CLASS)) {
            var saveObj = this.generateEventData(target);
            this.parent.addEvent(saveObj);
        }
        else {
            var eventTarget = closest(target, '.' + cls.APPOINTMENT_CLASS);
            var eventDetails = this.parent.getEventDetails(eventTarget);
            eventDetails[this.parent.eventFields.subject] = target.value;
            var currentAction = void 0;
            if (eventDetails[this.parent.eventFields.id] === eventDetails[this.parent.eventFields.recurrenceID]) {
                currentAction = 'EditOccurrence';
                eventDetails[this.parent.eventFields.id] = this.parent.eventBase.getEventMaxID();
            }
            this.parent.saveEvent(eventDetails, currentAction);
        }
        this.removeInlineAppointmentElement();
    };
    InlineEdit.prototype.createInlineAppointmentElement = function (inlineData) {
        var inlineAppointmentElement = createElement('div', {
            className: cls.APPOINTMENT_CLASS + ' ' + cls.INLINE_APPOINTMENT_CLASS
        });
        var inlineDetails = createElement('div', { className: cls.APPOINTMENT_DETAILS });
        inlineAppointmentElement.appendChild(inlineDetails);
        var inline = this.inlineInputEle =
            createElement('input', { className: cls.INLINE_SUBJECT_CLASS });
        inlineDetails.appendChild(inline);
        if (inlineData) {
            this.parent.eventBase.applyResourceColor(inlineAppointmentElement, inlineData, 'backgroundColor');
        }
        return inlineAppointmentElement;
    };
    InlineEdit.prototype.removeInlineAppointmentElement = function () {
        var inlineAppointment = [].slice.call(this.parent.element.querySelectorAll('.' + cls.INLINE_APPOINTMENT_CLASS));
        if (inlineAppointment.length > 0) {
            inlineAppointment.forEach(function (node) {
                var inlineSubject = node.querySelector('.' + cls.INLINE_SUBJECT_CLASS);
                if (!isNullOrUndefined(inlineSubject)) {
                    inlineSubject.blur();
                }
                remove(node);
            });
        }
        var inlineSubject = this.getInlineElement();
        if (inlineSubject) {
            var appointmentSubject = closest(inlineSubject, '.' + cls.APPOINTMENT_CLASS);
            var subject = appointmentSubject.querySelector('.' + cls.SUBJECT_CLASS);
            if (!isNullOrUndefined(subject)) {
                removeClass([subject], cls.DISABLE_CLASS);
            }
            remove(inlineSubject);
        }
        this.inlineInputEle = null;
    };
    InlineEdit.prototype.getInlineElement = function () {
        return this.inlineInputEle;
    };
    InlineEdit.prototype.destroy = function () {
        this.inlineInputEle = null;
        this.parent.off(events.inlineClick, this.inlineEdit);
    };
    return InlineEdit;
}());
export { InlineEdit };
