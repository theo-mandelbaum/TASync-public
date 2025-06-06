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
import { append, createElement, extend, EventHandler, Animation, formatUnit, closest } from '@syncfusion/ej2-base';
import { isNullOrUndefined, setStyleAttribute, remove, removeClass, addClass } from '@syncfusion/ej2-base';
import { EventBase } from './event-base';
import * as util from '../base/util';
import * as events from '../base/constant';
import * as cls from '../base/css-constant';
/**
 * Vertical view appointment rendering
 */
var VerticalEvent = /** @class */ (function (_super) {
    __extends(VerticalEvent, _super);
    function VerticalEvent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.dateRender = [];
        _this.renderedEvents = [];
        _this.renderedAllDayEvents = [];
        _this.overlapEvents = [];
        _this.moreEvents = [];
        _this.overlapList = [];
        _this.allDayEvents = [];
        _this.slotCount = _this.parent.activeViewOptions.timeScale.slotCount;
        _this.interval = _this.parent.activeViewOptions.timeScale.interval;
        _this.allDayLevel = 0;
        _this.startHour = _this.getStartEndHours(_this.parent.activeViewOptions.startHour);
        _this.endHour = _this.getStartEndHours(_this.parent.activeViewOptions.endHour);
        _this.element = _this.parent.activeView.getPanel();
        _this.fields = _this.parent.eventFields;
        _this.animation = new Animation({ progress: _this.animationUiUpdate.bind(_this) });
        _this.addEventListener();
        return _this;
    }
    VerticalEvent.prototype.renderAppointments = function () {
        var _this = this;
        if (isNullOrUndefined(this.parent)) {
            return;
        }
        if (this.parent.dragAndDropModule) {
            this.parent.dragAndDropModule.setDragArea();
        }
        this.isResourceEventTemplate = this.parent.isSpecificResourceEvents();
        var wrapperElements = [].slice.call(this.parent.element.querySelectorAll('.' + cls.BLOCK_APPOINTMENT_CLASS +
            ',.' + cls.APPOINTMENT_CLASS + ',.' + cls.ROW_COUNT_WRAPPER_CLASS));
        var isDragging = (this.parent.crudModule && this.parent.crudModule.crudObj.isCrudAction) ? true : false;
        var hideWrapper = function (wrapper) {
            if (_this.parent.isReact && !isNullOrUndefined(_this.parent.activeViewOptions.eventTemplate)) {
                var appWrapper = closest(wrapper, '.' + cls.DAY_WRAPPER_CLASS + ',.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS);
                if (appWrapper && !appWrapper.classList.contains(cls.APPOINTMENT_WRAPPER_HIDDEN_CLASS)) {
                    addClass([appWrapper], cls.APPOINTMENT_WRAPPER_HIDDEN_CLASS);
                }
            }
        };
        for (var _i = 0, wrapperElements_1 = wrapperElements; _i < wrapperElements_1.length; _i++) {
            var wrapper = wrapperElements_1[_i];
            if (isDragging && !(wrapper.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS) ||
                wrapper.classList.contains(cls.ROW_COUNT_WRAPPER_CLASS))) {
                var groupIndex = parseInt(wrapper.getAttribute('data-group-index'), 10);
                for (var j = 0, len = this.parent.crudModule.crudObj.sourceEvent.length; j < len; j++) {
                    if (groupIndex === this.parent.crudModule.crudObj.sourceEvent[parseInt(j.toString(), 10)].groupIndex ||
                        groupIndex === this.parent.crudModule.crudObj.targetEvent[parseInt(j.toString(), 10)].groupIndex) {
                        hideWrapper(wrapper);
                        remove(wrapper);
                    }
                }
            }
            else {
                hideWrapper(wrapper);
                remove(wrapper);
            }
        }
        if (!this.element.querySelector('.' + cls.WORK_CELLS_CLASS)) {
            return;
        }
        if (this.parent.virtualScrollModule) {
            this.parent.virtualScrollModule.updateFocusedWorkCell();
        }
        this.allDayElement = [].slice.call(this.element.querySelectorAll('.' + cls.ALLDAY_CELLS_CLASS));
        this.setAllDayRowHeight(0);
        if (this.parent.eventsProcessed.length === 0 && this.parent.blockProcessed.length === 0) {
            return;
        }
        var expandCollapse = this.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_SECTION_CLASS);
        EventHandler.remove(expandCollapse, 'click', this.rowExpandCollapse);
        EventHandler.add(expandCollapse, 'click', this.rowExpandCollapse, this);
        this.renderedEvents = [];
        this.renderedAllDayEvents = [];
        this.initializeValues();
        this.processBlockEvents();
        this.renderEvents('normalEvents');
        if (this.allDayEvents.length > 0) {
            this.allDayEvents = this.allDayEvents.filter(function (item, index, arr) {
                return index === arr.map(function (item) { return item.Guid; }).indexOf(item.Guid);
            });
            removeClass(this.allDayElement, cls.ALLDAY_ROW_ANIMATE_CLASS);
            this.slots.push(this.parent.activeView.renderDates.map(function (date) { return +date; }));
            this.renderEvents('allDayEvents');
            this.animation.animate(this.allDayElement[0]);
        }
        this.parent.notify(events.contentReady, {});
        addClass(this.allDayElement, cls.ALLDAY_ROW_ANIMATE_CLASS);
        if (isDragging) {
            this.parent.crudModule.crudObj.isCrudAction = false;
        }
        this.parent.renderTemplates(function () {
            if (_this.parent && _this.parent.isReact && _this.parent.activeViewOptions.eventTemplate) {
                var wraps = [].slice.call(_this.parent.element.querySelectorAll('.' + cls.APPOINTMENT_WRAPPER_HIDDEN_CLASS));
                removeClass(wraps, cls.APPOINTMENT_WRAPPER_HIDDEN_CLASS);
            }
        });
    };
    VerticalEvent.prototype.initializeValues = function () {
        this.resources = (this.parent.activeViewOptions.group.resources.length > 0) ? this.parent.uiStateValues.isGroupAdaptive ?
            [this.parent.resourceBase.lastResourceLevel[this.parent.uiStateValues.groupIndex]] :
            this.parent.resourceBase.lastResourceLevel : [];
        if (this.resources.length > 0 && this.parent.activeViewOptions.allowVirtualScrolling && this.parent.virtualScrollModule) {
            this.resources = this.parent.resourceBase.renderedResources;
        }
        this.cellHeight =
            parseFloat(this.parent.getElementHeight(this.parent.element.querySelector('.e-content-wrap tbody tr')).toFixed(2));
        this.dateRender[0] = this.parent.activeView.renderDates;
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            for (var i = 0, len = this.resources.length; i < len; i++) {
                this.dateRender[parseInt(i.toString(), 10)] = this.resources[parseInt(i.toString(), 10)].renderDates;
            }
        }
    };
    VerticalEvent.prototype.getHeight = function (start, end) {
        var appHeight = (util.getUniversalTime(end) - util.getUniversalTime(start)) /
            util.MS_PER_MINUTE * (this.cellHeight * this.slotCount) / this.interval;
        appHeight = (appHeight <= 0) ? this.cellHeight : appHeight;
        return appHeight;
    };
    VerticalEvent.prototype.appendEvent = function (eventObj, appointmentElement, index, appLeft) {
        var appointmentWrap = this.element.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS + '[id="' + cls.APPOINTMENT_WRAPPER_CLASS + '-' + index + '"]');
        if (this.parent.enableRtl) {
            setStyleAttribute(appointmentElement, { 'right': appLeft });
        }
        else {
            setStyleAttribute(appointmentElement, { 'left': appLeft });
        }
        var eventType = appointmentElement.classList.contains(cls.BLOCK_APPOINTMENT_CLASS) ? 'blockEvent' : 'event';
        var args = {
            data: extend({}, eventObj, null, true),
            element: appointmentElement, cancel: false, type: eventType
        };
        this.parent.trigger(events.eventRendered, args, function (eventArgs) {
            if (!eventArgs.cancel) {
                appointmentWrap.appendChild(appointmentElement);
            }
        });
    };
    VerticalEvent.prototype.processBlockEvents = function () {
        var resources = this.getResourceList();
        var dateCount = this.getStartCount();
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var resource = resources_1[_i];
            var renderDates = this.dateRender[parseInt(resource.toString(), 10)];
            for (var day = 0, length_1 = renderDates.length; day < length_1; day++) {
                var startDate = new Date(renderDates[parseInt(day.toString(), 10)].getTime());
                var endDate = util.resetTime(util.addDays(renderDates[parseInt(day.toString(), 10)], 1));
                var filterEvents = this.filterEvents(startDate, endDate, this.parent.blockProcessed, this.resources[parseInt(resource.toString(), 10)]);
                for (var _a = 0, filterEvents_1 = filterEvents; _a < filterEvents_1.length; _a++) {
                    var event_1 = filterEvents_1[_a];
                    if (this.parent.resourceBase) {
                        this.setValues(event_1, resource);
                    }
                    this.renderBlockEvents(event_1, day, resource, dateCount);
                    this.cssClass = null;
                    this.groupOrder = null;
                }
                dateCount += 1;
            }
        }
    };
    VerticalEvent.prototype.renderBlockEvents = function (eventObj, dayIndex, resource, dayCount) {
        var spannedData = this.isSpannedEvent(eventObj, dayIndex, resource);
        var eStart = spannedData[this.fields.startTime];
        var eEnd = spannedData[this.fields.endTime];
        var currentDate = util.resetTime(new Date(this.dateRender[parseInt(resource.toString(), 10)][parseInt(dayIndex.toString(), 10)].getTime()));
        var schedule = util.getStartEndHours(currentDate, this.startHour, this.endHour);
        if (eStart <= eEnd && this.isValidEvent(eventObj, eStart, eEnd, schedule) && this.isWorkDayAvailable(resource, eStart)) {
            var blockTop = void 0;
            var blockHeight = void 0;
            if (spannedData[this.fields.isAllDay]) {
                var contentWrap = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS + ' table');
                blockHeight = formatUnit(contentWrap.offsetHeight);
                blockTop = formatUnit(0);
            }
            else {
                blockHeight = formatUnit(this.getHeight(eStart, eEnd));
                blockTop = formatUnit(this.getTopValue(eStart));
            }
            var appointmentElement = this.createBlockAppointmentElement(eventObj, resource, this.isResourceEventTemplate);
            setStyleAttribute(appointmentElement, { 'width': '100%', 'height': blockHeight, 'top': blockTop });
            var index = this.getDayIndex(dayIndex, resource, dayCount);
            this.appendEvent(eventObj, appointmentElement, index, '0px');
        }
    };
    VerticalEvent.prototype.renderEvents = function (eventType) {
        removeClass(this.allDayElement, cls.ALLDAY_ROW_ANIMATE_CLASS);
        var eventCollection = (eventType === 'allDayEvents') ? this.sortByDateTime(this.allDayEvents) : undefined;
        var resources = this.getResourceList();
        var dateCount = this.getStartCount();
        var isRender;
        var appHeight = eventType === 'allDayEvents' ? this.parent.getElementHeightFromClass(this.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS), cls.APPOINTMENT_CLASS) : 0;
        var allDayRowTop = eventType === 'allDayEvents' && this.allDayElement.length > 0 ? this.allDayElement[0].offsetTop : 0;
        var _loop_1 = function (resource) {
            isRender = true;
            if (this_1.parent.crudModule && this_1.parent.crudModule.crudObj.isCrudAction && eventType !== 'allDayEvents'
                && !this_1.parent.uiStateValues.isGroupAdaptive) {
                if (this_1.parent.crudModule.crudObj.sourceEvent.filter(function (data) { return data.groupIndex === resource; }).length === 0 &&
                    this_1.parent.crudModule.crudObj.targetEvent.filter(function (data) { return data.groupIndex === resource; }).length === 0) {
                    isRender = false;
                }
            }
            this_1.slots = [];
            var renderDates = this_1.dateRender[parseInt(resource.toString(), 10)];
            var renderedDate = this_1.getRenderedDates(renderDates) || renderDates;
            this_1.slots.push(renderDates.map(function (date) { return +date; }));
            for (var day = 0, length_2 = renderDates.length; day < length_2 &&
                renderDates[parseInt(day.toString(), 10)] <= renderedDate[renderedDate.length - 1]; day++) {
                this_1.renderedEvents = [];
                var startDate = new Date(renderDates[parseInt(day.toString(), 10)].getTime());
                var endDate = util.resetTime(util.addDays(renderDates[parseInt(day.toString(), 10)], 1));
                var filterEvents = this_1.filterEvents(startDate, endDate, eventCollection, this_1.resources[parseInt(resource.toString(), 10)]);
                if (isRender) {
                    for (var _i = 0, filterEvents_2 = filterEvents; _i < filterEvents_2.length; _i++) {
                        var event_2 = filterEvents_2[_i];
                        if (this_1.parent.resourceBase) {
                            this_1.setValues(event_2, resource);
                        }
                        if (eventType === 'allDayEvents') {
                            this_1.renderAllDayEvents(event_2, day, resource, dateCount, false, allDayRowTop, appHeight);
                        }
                        else {
                            if (this_1.isAllDayAppointment(event_2)) {
                                this_1.allDayEvents.push(extend({}, event_2, null, true));
                            }
                            else {
                                if (this_1.parent.eventSettings.enableMaxHeight) {
                                    if (this_1.getOverlapIndex(event_2, day, false, resource) > 0) {
                                        continue;
                                    }
                                }
                                this_1.renderNormalEvents(event_2, day, resource, dateCount);
                            }
                        }
                        this_1.cssClass = null;
                        this_1.groupOrder = null;
                    }
                }
                else {
                    for (var _a = 0, filterEvents_3 = filterEvents; _a < filterEvents_3.length; _a++) {
                        var event_3 = filterEvents_3[_a];
                        if (this_1.isAllDayAppointment(event_3)) {
                            this_1.allDayEvents.push(extend({}, event_3, null, true));
                        }
                    }
                }
                dateCount += 1;
            }
        };
        var this_1 = this;
        for (var _i = 0, resources_2 = resources; _i < resources_2.length; _i++) {
            var resource = resources_2[_i];
            _loop_1(resource);
        }
    };
    VerticalEvent.prototype.getStartCount = function () {
        return this.parent.virtualScrollModule && this.parent.activeViewOptions.allowVirtualScrolling && this.parent.timeScale.enable ?
            parseInt(this.element.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS).getAttribute('id').split('-').slice(-1)[0], 10) : 0;
    };
    VerticalEvent.prototype.getDayIndex = function (dayIndex, resource, dayCount) {
        var _this = this;
        if (!this.parent.activeViewOptions.group.byDate) {
            return dayCount;
        }
        if (this.parent.activeViewOptions.group.byDate && !this.parent.activeViewOptions.group.hideNonWorkingDays) {
            var renderedIndex = this.parent.resourceBase.lastResourceLevel[0].renderDates.indexOf(this.dateRender[parseInt(resource.toString(), 10)][parseInt(dayIndex.toString(), 10)]);
            return (this.resources.length * renderedIndex) + resource;
        }
        var dateIndex = 0;
        var firstColumn = this.parent.activeView.colLevels[0];
        var currentDate = this.dateRender[parseInt(resource.toString(), 10)][parseInt(dayIndex.toString(), 10)].getTime();
        var currentResources = [];
        for (var i = 0; i < firstColumn.length; i++) {
            currentResources = this.parent.resourceBase.resourceDateTree[parseInt(i.toString(), 10)];
            if (currentDate === firstColumn[parseInt(i.toString(), 10)].date.getTime()) {
                break;
            }
            dateIndex = dateIndex + firstColumn[parseInt(i.toString(), 10)].colSpan;
        }
        var resIndex = currentResources.findIndex(function (x) { return x.groupOrder.toString() ===
            _this.resources[parseInt(resource.toString(), 10)].groupOrder.toString(); });
        if (resIndex < 0) {
            return dateIndex;
        }
        return dateIndex + resIndex;
    };
    VerticalEvent.prototype.setValues = function (event, resourceIndex) {
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            this.cssClass = this.resources[parseInt(resourceIndex.toString(), 10)].cssClass;
            this.groupOrder = this.resources[parseInt(resourceIndex.toString(), 10)].groupOrder;
        }
        else {
            this.cssClass = this.parent.resourceBase.getCssClass(event);
        }
    };
    VerticalEvent.prototype.getResourceList = function () {
        // eslint-disable-next-line prefer-spread
        var resources = Array.apply(null, {
            length: (this.parent.activeViewOptions.group.resources.length > 0 && !this.parent.uiStateValues.isGroupAdaptive) ?
                this.resources.length : 1
        }).map(function (value, index) { return index; });
        return resources;
    };
    // eslint-disable-next-line max-len
    VerticalEvent.prototype.createAppointmentElement = function (record, isAllDay, data, resource) {
        var fieldMapping = this.parent.eventFields;
        var recordSubject = (record[fieldMapping.subject] || this.parent.eventSettings.fields.subject.default
            || this.parent.localeObj.getConstant('addTitle'));
        var appointmentWrapper = createElement('div', {
            className: cls.APPOINTMENT_CLASS,
            attrs: {
                'data-id': 'Appointment_' + record[fieldMapping.id],
                'data-guid': record.Guid,
                'role': 'button',
                'tabindex': '0',
                'aria-disabled': this.parent.eventBase.getReadonlyAttribute(record),
                'aria-label': this.parent.getAnnouncementString(record)
            }
        });
        if (record[this.fields.isReadonly]) {
            addClass([appointmentWrapper], 'e-read-only');
        }
        var appointmentDetails = createElement('div', { className: cls.APPOINTMENT_DETAILS });
        appointmentWrapper.appendChild(appointmentDetails);
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            var resourceIndex = this.parent.uiStateValues.isGroupAdaptive ? this.parent.uiStateValues.groupIndex : resource;
            appointmentWrapper.setAttribute('data-group-index', resourceIndex.toString());
        }
        var templateElement;
        var eventData = data;
        if (!isNullOrUndefined(this.parent.activeViewOptions.eventTemplate)) {
            var elementId = this.parent.element.id + '_';
            var viewName = this.parent.activeViewOptions.eventTemplateName;
            var templateId = elementId + viewName + 'eventTemplate';
            var resIndex = this.parent.uiStateValues.isGroupAdaptive ? this.parent.uiStateValues.groupIndex : resource;
            var templateName = this.isResourceEventTemplate ? this.parent.getEventTemplateName(resIndex) : 'eventTemplate';
            templateElement = this.parent.getAppointmentTemplate()(record, this.parent, templateName, templateId, false, undefined, undefined, this.parent.root);
        }
        else {
            var appointmentSubject = createElement('div', { className: cls.SUBJECT_CLASS });
            this.parent.sanitize(recordSubject, appointmentSubject);
            if (isAllDay) {
                if (record[fieldMapping.isAllDay]) {
                    templateElement = [appointmentSubject];
                }
                else {
                    templateElement = [];
                    var appointmentStartTime = createElement('div', {
                        className: cls.APPOINTMENT_TIME + (this.parent.isAdaptive ? ' ' + cls.DISABLE_CLASS : ''),
                        innerHTML: this.parent.getTimeString(record[fieldMapping.startTime])
                    });
                    var appointmentEndTime = createElement('div', {
                        className: cls.APPOINTMENT_TIME + (this.parent.isAdaptive ? ' ' + cls.DISABLE_CLASS : ''),
                        innerHTML: this.parent.getTimeString(record[fieldMapping.endTime])
                    });
                    addClass([appointmentSubject], 'e-text-center');
                    if (!eventData.isLeft) {
                        templateElement.push(appointmentStartTime);
                    }
                    templateElement.push(appointmentSubject);
                    if (!eventData.isRight) {
                        templateElement.push(appointmentEndTime);
                    }
                }
            }
            else {
                var timeStr = this.parent.getTimeString(record[fieldMapping.startTime]) + ' - ' +
                    this.parent.getTimeString(record[fieldMapping.endTime]);
                var appointmentTime = createElement('div', {
                    className: cls.APPOINTMENT_TIME + (this.parent.isAdaptive ? ' ' + cls.DISABLE_CLASS : ''),
                    innerHTML: timeStr
                });
                var appointmentLocation = createElement('div', { className: cls.LOCATION_CLASS });
                this.parent.sanitize((record[fieldMapping.location] || this.parent.eventSettings.fields.location.default || ''), appointmentLocation);
                templateElement = [appointmentSubject, appointmentTime, appointmentLocation];
            }
        }
        append(templateElement, appointmentDetails);
        if (!this.parent.isAdaptive &&
            (!isNullOrUndefined(record[fieldMapping.recurrenceRule]) || !isNullOrUndefined(record[fieldMapping.recurrenceID]))) {
            var iconClass = (record[fieldMapping.id] === record[fieldMapping.recurrenceID]) ?
                cls.EVENT_RECURRENCE_ICON_CLASS : cls.EVENT_RECURRENCE_EDIT_ICON_CLASS;
            var recurrenceIcon = createElement('div', { className: cls.ICON + ' ' + iconClass });
            if (isAllDay) {
                appointmentDetails.appendChild(recurrenceIcon);
            }
            else {
                appointmentWrapper.appendChild(recurrenceIcon);
            }
        }
        this.parent.eventBase.renderSpannedIcon(isAllDay ? appointmentDetails : appointmentWrapper, eventData);
        if (!isNullOrUndefined(this.cssClass)) {
            addClass([appointmentWrapper], this.cssClass);
        }
        this.applyResourceColor(appointmentWrapper, record, 'backgroundColor', this.groupOrder);
        this.renderResizeHandler(appointmentWrapper, eventData, record[this.fields.isReadonly]);
        return appointmentWrapper;
    };
    VerticalEvent.prototype.createMoreIndicator = function (allDayRow, count, currentDay) {
        var index = currentDay + count;
        var countWrapper = allDayRow[parseInt(index.toString(), 10)];
        if (countWrapper.childElementCount <= 0) {
            var innerCountWrap = createElement('div', {
                className: cls.ROW_COUNT_WRAPPER_CLASS,
                id: cls.ROW_COUNT_WRAPPER_CLASS + '-' + index.toString()
            });
            var moreIndicatorElement = createElement('div', {
                className: cls.MORE_INDICATOR_CLASS,
                attrs: { 'tabindex': '0', 'data-index': index.toString(), 'data-count': '1' },
                innerHTML: '+1&nbsp;' + (this.parent.isAdaptive ? '' : this.parent.localeObj.getConstant('more'))
            });
            innerCountWrap.appendChild(moreIndicatorElement);
            countWrapper.appendChild(innerCountWrap);
            EventHandler.add(moreIndicatorElement, 'click', this.rowExpandCollapse, this);
        }
        else {
            var countCell = countWrapper.querySelector('.' + cls.MORE_INDICATOR_CLASS);
            var moreCount = parseInt(countCell.getAttribute('data-count'), 10) + 1;
            countCell.setAttribute('data-count', moreCount.toString());
            countCell.innerHTML = '+' + this.parent.globalize.formatNumber(moreCount) + '&nbsp;' + (this.parent.isAdaptive ? '' : this.parent.localeObj.getConstant('more'));
        }
    };
    VerticalEvent.prototype.isSpannedEvent = function (record, day, resource) {
        var currentDate = util.resetTime(this.dateRender[parseInt(resource.toString(), 10)][parseInt(day.toString(), 10)]);
        var renderedDate = this.getRenderedDates(this.dateRender[parseInt(resource.toString(), 10)]) || [currentDate];
        var currentDay = renderedDate.filter(function (date) { return date.getDay() === day; });
        if (currentDay.length === 0) {
            currentDate = util.resetTime(renderedDate[0]);
        }
        var field = this.parent.eventFields;
        var schedule = util.getStartEndHours(currentDate, this.startHour, this.endHour);
        var event = extend({}, record, null, true);
        event.isSpanned = {
            isBottom: false, isTop: false,
            isSameDuration: event[field.startTime].getTime() === event[field.endTime].getTime()
        };
        if (record[field.startTime].getTime() < schedule.startHour.getTime()) {
            event[field.startTime] = schedule.startHour;
            event.isSpanned.isTop = true;
        }
        if (record[field.endTime].getTime() > schedule.endHour.getTime()) {
            event[field.endTime] = schedule.endHour;
            event.isSpanned.isBottom = true;
        }
        var eventDates = this.updateEventMinimumDuration(schedule, event[field.startTime], event[field.endTime]);
        event[field.startTime] = eventDates.startDate;
        event[field.endTime] = eventDates.endDate;
        return event;
    };
    VerticalEvent.prototype.isWorkDayAvailable = function (resource, start) {
        if (this.parent.activeViewOptions.group.hideNonWorkingDays && this.resources.length > 0) {
            var workDays = this.resources[parseInt(resource.toString(), 10)].
                resourceData[this.resources[parseInt(resource.toString(), 10)].resource.workDaysField] ||
                this.parent.activeViewOptions.workDays;
            return workDays && workDays.indexOf(start.getDay()) >= 0;
        }
        return true;
    };
    // eslint-disable-next-line max-len
    VerticalEvent.prototype.renderAllDayEvents = function (eventObj, dayIndex, resource, dayCount, inline, cellTop, eventHeight) {
        var _this = this;
        var currentDates = this.getRenderedDates(this.dateRender[parseInt(resource.toString(), 10)]) ||
            this.dateRender[parseInt(resource.toString(), 10)];
        if (this.parent.activeViewOptions.group.byDate) {
            this.slots[0] = [this.dateRender[parseInt(resource.toString(), 10)][parseInt(dayIndex.toString(), 10)].getTime()];
            currentDates = [this.dateRender[parseInt(resource.toString(), 10)][parseInt(dayIndex.toString(), 10)]];
        }
        var record = this.splitEvent(eventObj, currentDates)[0];
        var eStart = new Date(record[this.parent.eventFields.startTime].getTime());
        var eEnd = new Date(record[this.parent.eventFields.endTime].getTime());
        var appWidth = 0;
        var topValue = 1;
        var isDateRange = currentDates[0].getTime() <= eStart.getTime() &&
            util.addDays(currentDates.slice(-1)[0], 1).getTime() >= eStart.getTime();
        if (eStart <= eEnd && isDateRange && this.isWorkDayAvailable(resource, eStart)) {
            var isAlreadyRendered = [];
            if (this.renderedAllDayEvents[parseInt(resource.toString(), 10)]) {
                isAlreadyRendered = this.renderedAllDayEvents[parseInt(resource.toString(), 10)].filter(function (event) {
                    return event.Guid === eventObj.Guid;
                });
                if (this.parent.activeViewOptions.group.byDate) {
                    isAlreadyRendered = isAlreadyRendered.filter(function (event) {
                        return event[_this.parent.eventFields.startTime] >= currentDates[parseInt(dayIndex.toString(), 10)] &&
                            event[_this.parent.eventFields.endTime] <=
                                util.addDays(new Date(+currentDates[parseInt(dayIndex.toString(), 10)]), 1);
                    });
                }
            }
            if (isAlreadyRendered.length === 0) {
                var allDayDifference_1 = record.data.count;
                var allDayIndex_1 = this.getOverlapIndex(record, dayIndex, true, resource);
                record.Index = allDayIndex_1;
                this.allDayLevel = (this.allDayLevel < allDayIndex_1) ? allDayIndex_1 : this.allDayLevel;
                var widthAdjustment = record.data.isRight ? 0 :
                    this.parent.currentView === 'Day' ? 4 : 7;
                if (allDayDifference_1 >= 0) {
                    appWidth = (allDayDifference_1 * 100) - (!this.parent.activeViewOptions.allowOverlap ? 0 : widthAdjustment);
                }
                if (isNullOrUndefined(this.renderedAllDayEvents[parseInt(resource.toString(), 10)])) {
                    this.renderedAllDayEvents[parseInt(resource.toString(), 10)] = [];
                }
                this.renderedAllDayEvents[parseInt(resource.toString(), 10)].push(extend({}, record, null, true));
                var allDayRow_1 = [].slice.call(this.element.querySelector('.' + cls.ALLDAY_ROW_CLASS).children);
                var wIndex_1 = this.getDayIndex(dayIndex, resource, dayCount);
                var eventWrapper_1 = this.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS +
                    ':nth-child(' + (wIndex_1 + 1) + ')');
                var appointmentElement_1;
                if (inline) {
                    appointmentElement_1 = this.parent.inlineModule.createInlineAppointmentElement(eventObj);
                }
                else {
                    appointmentElement_1 = this.createAppointmentElement(eventObj, true, record.data, resource);
                }
                addClass([appointmentElement_1], cls.ALLDAY_APPOINTMENT_CLASS);
                var eventData = extend({}, record.data, null, true);
                eventObj.data = eventData;
                var args = { data: eventObj, element: appointmentElement_1, cancel: false };
                this.parent.trigger(events.eventRendered, args, function (eventArgs) {
                    if (!eventArgs.cancel) {
                        eventWrapper_1.appendChild(appointmentElement_1);
                        topValue += (allDayIndex_1 === 0 ? cellTop : (cellTop + (allDayIndex_1 * eventHeight))) + 1;
                        setStyleAttribute(appointmentElement_1, { 'width': appWidth + '%', 'top': formatUnit(topValue) });
                        if (allDayIndex_1 > 1) {
                            _this.moreEvents.push(appointmentElement_1);
                            for (var count = 0, length_3 = allDayDifference_1; count < length_3; count++) {
                                _this.createMoreIndicator(allDayRow_1, count, wIndex_1);
                            }
                        }
                        _this.allDayElement[0].setAttribute('data-count', _this.allDayLevel.toString());
                        var allDayRowHeight = ((!_this.parent.uiStateValues.expand && _this.allDayLevel > 2) ?
                            (3 * eventHeight) : ((_this.allDayLevel + 1) * eventHeight)) + 4;
                        _this.setAllDayRowHeight(allDayRowHeight);
                        _this.addOrRemoveClass();
                        _this.wireAppointmentEvents(appointmentElement_1, eventObj);
                    }
                });
            }
        }
    };
    VerticalEvent.prototype.renderNormalEvents = function (eventObj, dayIndex, resource, dayCount, inline) {
        var record = this.isSpannedEvent(eventObj, dayIndex, resource);
        var eStart = record[this.fields.startTime];
        var eEnd = record[this.fields.endTime];
        var appWidth = '0%';
        var appLeft = '0%';
        var topValue = 0;
        var currentDate = util.resetTime(new Date(this.dateRender[parseInt(resource.toString(), 10)][parseInt(dayIndex.toString(), 10)].getTime()));
        var schedule = util.getStartEndHours(currentDate, this.startHour, this.endHour);
        var isValidEvent = this.isValidEvent(eventObj, eStart, eEnd, schedule);
        if ((eStart.getTime() < this.parent.minDate.getTime()) || (eEnd.getTime() > this.parent.maxDate.getTime())) {
            return;
        }
        if (eStart <= eEnd && isValidEvent && this.isWorkDayAvailable(resource, eStart)) {
            var appHeight = record.isSpanned.isSameDuration ? this.cellHeight : this.getHeight(eStart, eEnd);
            if (eStart.getTime() >= schedule.startHour.getTime()) {
                topValue = this.getTopValue(eStart);
            }
            var appIndex = this.getOverlapIndex(record, dayIndex, false, resource);
            record.Index = appIndex;
            this.overlapList.push(record);
            if (this.overlapList.length > 1) {
                if (isNullOrUndefined(this.overlapEvents[parseInt(appIndex.toString(), 10)])) {
                    this.overlapEvents[parseInt(appIndex.toString(), 10)] = [];
                }
                this.overlapEvents[parseInt(appIndex.toString(), 10)].push(record);
            }
            else {
                this.overlapEvents = [];
                this.overlapEvents.push([record]);
            }
            appWidth = this.getEventWidth();
            var argsData = {
                index: appIndex, left: appLeft, width: appWidth,
                day: dayCount, dayIndex: dayIndex, record: record, resource: resource
            };
            var tempData = this.adjustOverlapElements(argsData);
            appWidth = (tempData.appWidth);
            if (isNullOrUndefined(this.renderedEvents[parseInt(resource.toString(), 10)])) {
                this.renderedEvents[parseInt(resource.toString(), 10)] = [];
            }
            this.renderedEvents[parseInt(resource.toString(), 10)].push(extend({}, record, null, true));
            var appointmentElement = void 0;
            if (inline) {
                appointmentElement = this.parent.inlineModule.createInlineAppointmentElement(eventObj);
            }
            else {
                appointmentElement = this.createAppointmentElement(eventObj, false, record.isSpanned, resource);
            }
            setStyleAttribute(appointmentElement, {
                'width': (this.parent.eventSettings.enableMaxHeight || !this.parent.activeViewOptions.allowOverlap ? '100%' : tempData.appWidth),
                'height': appHeight + 'px', 'top': topValue + 'px'
            });
            var iconHeight = appointmentElement.querySelectorAll('.' + cls.EVENT_INDICATOR_CLASS).length * 15;
            var maxHeight = appHeight - 40 - iconHeight;
            var subjectElement = appointmentElement.querySelector('.' + cls.SUBJECT_CLASS);
            if (!this.parent.isAdaptive && subjectElement) {
                subjectElement.style.maxHeight = formatUnit(maxHeight);
            }
            var index = this.getDayIndex(dayIndex, resource, dayCount);
            var eventData = {};
            eventData[this.fields.startTime] = eventObj[this.fields.startTime];
            eventData[this.fields.endTime] = eventObj[this.fields.endTime];
            record.data = eventData;
            this.appendEvent(record, appointmentElement, index, tempData.appLeft);
            this.wireAppointmentEvents(appointmentElement, eventObj);
        }
    };
    VerticalEvent.prototype.getEventWidth = function () {
        var width = this.parent.currentView === 'Day' ? 97 : 94;
        var tempWidth = ((width - this.overlapEvents.length) / this.overlapEvents.length);
        return (tempWidth < 0 ? 0 : tempWidth) + '%';
    };
    VerticalEvent.prototype.getEventLeft = function (appWidth, index) {
        var tempLeft = (parseFloat(appWidth) + 1) * index;
        return (tempLeft > 99 ? 99 : tempLeft) + '%';
    };
    VerticalEvent.prototype.getStartEndHours = function (startEndTime) {
        if (!isNullOrUndefined(startEndTime) && startEndTime !== '') {
            var startEndDate = new Date(2000, 0, 0, 0);
            var timeString = startEndTime.split(':');
            if (timeString.length === 2) {
                startEndDate.setHours(parseInt(timeString[0], 10), parseInt(timeString[1], 10), 0);
            }
            return startEndDate;
        }
        return null;
    };
    VerticalEvent.prototype.getTopValue = function (date) {
        var startHour = this.getStartEndHours(this.parent.activeViewOptions.startHour);
        var diffInMinutes = ((date.getHours() - startHour.getHours()) * 60) + (date.getMinutes() - startHour.getMinutes());
        return (this.parent.activeViewOptions.timeScale.enable) ? ((diffInMinutes * this.cellHeight * this.slotCount) / this.interval) : 0;
    };
    VerticalEvent.prototype.getOverlapIndex = function (record, day, isAllDay, resource) {
        var _this = this;
        var fieldMapping = this.parent.eventFields;
        var eventsList = [];
        var appIndex = -1;
        this.overlapEvents = [];
        if (isAllDay) {
            if (!isNullOrUndefined(this.renderedAllDayEvents[parseInt(resource.toString(), 10)])) {
                var date_1 = util.resetTime(new Date(this.dateRender[parseInt(resource.toString(), 10)][parseInt(day.toString(), 10)].getTime()));
                eventsList = this.renderedAllDayEvents[parseInt(resource.toString(), 10)].filter(function (app) {
                    return util.resetTime(app[fieldMapping.startTime]).getTime() <= date_1.getTime() &&
                        util.resetTime(app[fieldMapping.endTime]).getTime() >= date_1.getTime();
                });
                if (this.parent.activeViewOptions.group.resources.length > 0) {
                    eventsList = this.filterEventsByResource(this.resources[parseInt(resource.toString(), 10)], eventsList);
                }
            }
        }
        else {
            var appointmentList_1 = !isNullOrUndefined(this.renderedEvents[parseInt(resource.toString(), 10)]) ?
                this.renderedEvents[parseInt(resource.toString(), 10)] : [];
            var appointment_1 = [];
            var recordStart_1 = record[fieldMapping.startTime];
            var recordEnd_1 = record[fieldMapping.endTime];
            this.overlapList = appointmentList_1.filter(function (data) {
                return (data[fieldMapping.endTime] > recordStart_1 && data[fieldMapping.startTime] <= recordEnd_1) ||
                    (data[fieldMapping.startTime] >= recordEnd_1 && data[fieldMapping.endTime] <= recordStart_1) ||
                    (data[fieldMapping.endTime].getTime() === data[fieldMapping.startTime].getTime() &&
                        data[fieldMapping.startTime].getTime() === recordStart_1.getTime() && data[fieldMapping.endTime] < recordEnd_1);
            });
            if (this.parent.activeViewOptions.group.resources.length > 0) {
                this.overlapList = this.filterEventsByResource(this.resources[parseInt(resource.toString(), 10)], this.overlapList);
            }
            var queue_1 = [];
            this.overlapList.forEach(function (obj) {
                queue_1.push(obj);
                var filterList = [];
                var processedIds = new Set();
                var _loop_2 = function () {
                    var currentObj = queue_1.shift();
                    var overlaps = appointmentList_1.filter(function (data) {
                        return data[fieldMapping.endTime] > currentObj[fieldMapping.startTime] &&
                            data[fieldMapping.startTime] <= currentObj[fieldMapping.endTime] &&
                            !processedIds.has(data[fieldMapping.id]);
                    });
                    overlaps.forEach(function (overlap) {
                        filterList.push(overlap);
                        processedIds.add(overlap[fieldMapping.id]);
                        queue_1.push(overlap);
                    });
                    if (processedIds.size < appointmentList_1.length - 1) {
                        return "break";
                    }
                };
                while (queue_1.length > 0) {
                    var state_1 = _loop_2();
                    if (state_1 === "break")
                        break;
                }
                if (_this.parent.activeViewOptions.group.resources.length > 0) {
                    filterList = _this.filterEventsByResource(_this.resources[parseInt(resource.toString(), 10)], filterList);
                }
                var collection = filterList.filter(function (val) {
                    return _this.overlapList.indexOf(val) === -1;
                });
                if (collection.length > 0) {
                    appointment_1 = appointment_1.concat(collection);
                }
            });
            for (var i = 0; i < appointment_1.length - 1; i++) {
                for (var j = i + 1; j < appointment_1.length; j++) {
                    if (appointment_1[parseInt(i.toString(), 10)][fieldMapping.id] ===
                        appointment_1[parseInt(j.toString(), 10)][fieldMapping.id]) {
                        appointment_1.splice(j, 1);
                        j--;
                    }
                }
            }
            this.overlapList = this.overlapList.concat(appointment_1);
            eventsList = this.overlapList;
            for (var _i = 0, eventsList_1 = eventsList; _i < eventsList_1.length; _i++) {
                var event_4 = eventsList_1[_i];
                var record_1 = event_4;
                var index = record_1.Index;
                if (isNullOrUndefined(this.overlapEvents[parseInt(index.toString(), 10)])) {
                    this.overlapEvents[parseInt(index.toString(), 10)] = [event_4];
                }
                else {
                    this.overlapEvents[parseInt(index.toString(), 10)].push(event_4);
                }
            }
        }
        if (!isAllDay) {
            eventsList = eventsList.filter(function (obj) { return (obj[fieldMapping.startTime] === record[fieldMapping.startTime] &&
                obj[fieldMapping.endTime] > record[fieldMapping.endTime] || obj[fieldMapping.endTime] > record[fieldMapping.startTime] &&
                obj[fieldMapping.startTime] < record[fieldMapping.endTime] || obj[fieldMapping.endTime] === record[fieldMapping.startTime]
                && obj[fieldMapping.startTime] === record[fieldMapping.endTime]) ||
                ((obj[fieldMapping.startTime].getTime() === record[fieldMapping.startTime].getTime() &&
                    obj[fieldMapping.endTime].getTime() === record[fieldMapping.endTime].getTime())
                    || (obj[fieldMapping.startTime].getTime() === record[fieldMapping.startTime].getTime() &&
                        obj[fieldMapping.endTime].getTime() < record[fieldMapping.endTime].getTime() ||
                        obj[fieldMapping.endTime].getTime() > record[fieldMapping.endTime].getTime())); });
        }
        if (eventsList.length > 0) {
            var appLevel = eventsList.map(function (obj) { return obj.Index; });
            appIndex = (appLevel.length > 0) ? this.getSmallestMissingNumber(appLevel) : 0;
        }
        return (appIndex === -1) ? 0 : appIndex;
    };
    VerticalEvent.prototype.adjustOverlapElements = function (args) {
        var data = { appWidth: args.width, appLeft: args.left };
        for (var i = 0, length1 = this.overlapEvents.length; i < length1; i++) {
            if (!isNullOrUndefined(this.overlapEvents[parseInt(i.toString(), 10)])) {
                for (var j = 0, length2 = this.overlapEvents[parseInt(i.toString(), 10)].length; j < length2; j++) {
                    var dayCount = this.getDayIndex(args.dayIndex, args.resource, args.day);
                    var element = this.element.querySelector('#e-appointment-wrapper-' + dayCount);
                    if (element && element.childElementCount > 0) {
                        var eleGuid = this.overlapEvents[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].Guid;
                        if (element.querySelectorAll('div[data-guid="' + eleGuid + '"]').length > 0 && eleGuid !== args.record.Guid) {
                            var apps = element.querySelector('div[data-guid="' + eleGuid + '"]');
                            if (parseFloat(args.width) <= parseFloat(apps.style.width)) {
                                if (this.parent.enableRtl) {
                                    apps.style.right = this.getEventLeft(args.width, i);
                                }
                                else {
                                    apps.style.left = this.getEventLeft(args.width, i);
                                }
                                apps.style.width = ((parseFloat(args.width))) + '%';
                                data.appWidth = apps.style.width;
                            }
                            else {
                                data.appWidth = apps.style.width;
                            }
                        }
                        else {
                            var appWidth = args.width;
                            if (isNullOrUndefined(this.overlapEvents[i - 1])) {
                                appWidth = this.getEventWidth();
                            }
                            data.appWidth = appWidth;
                            data.appLeft = this.getEventLeft(appWidth, args.index);
                        }
                    }
                }
            }
        }
        return data;
    };
    VerticalEvent.prototype.setAllDayRowHeight = function (height) {
        var dateHeader = this.parent.element.querySelector('.' + cls.DATE_HEADER_WRAP_CLASS);
        if (this.parent.height === 'auto' || !this.parent.enableAllDayScroll) {
            addClass([dateHeader], cls.ALLDAY_APPOINTMENT_AUTO);
        }
        var allDayRow = this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS);
        allDayRow.style.height = '';
        if (this.parent.uiStateValues.expand && this.parent.height !== 'auto' && this.parent.enableAllDayScroll) {
            allDayRow.style.height = (height / 12) + 'em';
            this.parent.eventBase.allDayExpandScroll(dateHeader);
        }
        else {
            for (var _i = 0, _a = this.allDayElement; _i < _a.length; _i++) {
                var element = _a[_i];
                element.style.height = (height / 12) + 'em';
            }
            removeClass([dateHeader], cls.ALLDAY_APPOINTMENT_SCROLL);
        }
    };
    VerticalEvent.prototype.addOrRemoveClass = function () {
        var _this = this;
        this.moreEvents.filter(function (element) {
            if (!_this.parent.uiStateValues.expand && _this.allDayLevel > 2) {
                addClass([element], cls.EVENT_COUNT_CLASS);
                element.setAttribute('tabindex', '-1');
            }
            else {
                removeClass([element], cls.EVENT_COUNT_CLASS);
                element.setAttribute('tabindex', '0');
            }
        });
        var moreEventCount = this.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_SECTION_CLASS);
        if (this.parent.uiStateValues.expand) {
            removeClass([moreEventCount], cls.APPOINTMENT_ROW_EXPAND_CLASS);
            addClass([moreEventCount], cls.APPOINTMENT_ROW_COLLAPSE_CLASS);
        }
        else {
            removeClass([moreEventCount], cls.APPOINTMENT_ROW_COLLAPSE_CLASS);
            addClass([moreEventCount], cls.APPOINTMENT_ROW_EXPAND_CLASS);
        }
        if (this.allDayLevel > 2) {
            removeClass([moreEventCount], cls.DISABLE_CLASS);
        }
        else {
            addClass([moreEventCount], cls.DISABLE_CLASS);
        }
        var countCell = [].slice.call(this.element.querySelectorAll('.' + cls.ROW_COUNT_WRAPPER_CLASS));
        countCell.forEach(function (element) {
            if (!_this.parent.uiStateValues.expand && _this.allDayLevel > 2) {
                removeClass([element], cls.DISABLE_CLASS);
            }
            else {
                addClass([element], cls.DISABLE_CLASS);
            }
        });
    };
    VerticalEvent.prototype.getEventHeight = function () {
        var eventElement = createElement('div', { className: cls.APPOINTMENT_CLASS, styles: 'visibility:hidden' });
        var eventWrapper = this.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS + ':first-child');
        eventWrapper.appendChild(eventElement);
        var height = eventElement.offsetHeight;
        remove(eventElement);
        return height;
    };
    VerticalEvent.prototype.rowExpandCollapse = function () {
        var target = this.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_SECTION_CLASS);
        this.parent.uiStateValues.expand = target.classList.contains(cls.APPOINTMENT_ROW_EXPAND_CLASS);
        var rowHeight;
        if (this.parent.uiStateValues.expand) {
            target.setAttribute('title', this.parent.localeObj.getConstant('collapseAllDaySection'));
            target.setAttribute('aria-label', this.parent.localeObj.getConstant('collapseAllDaySection'));
            rowHeight = ((this.allDayLevel + 1) * this.getEventHeight()) + 4;
        }
        else {
            target.setAttribute('title', this.parent.localeObj.getConstant('expandAllDaySection'));
            target.setAttribute('aria-label', this.parent.localeObj.getConstant('expandAllDaySection'));
            rowHeight = (3 * this.getEventHeight()) + 4;
            this.parent.element.querySelector('.' + cls.DATE_HEADER_WRAP_CLASS).scrollTop = 0;
        }
        this.setAllDayRowHeight(rowHeight);
        this.animation.animate(this.allDayElement[0]);
        this.addOrRemoveClass();
        this.animation.animate(target);
    };
    VerticalEvent.prototype.animationUiUpdate = function () {
        this.parent.notify(events.contentReady, {});
    };
    VerticalEvent.prototype.destroy = function () {
        if (!this.parent || this.parent && this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
        this.allDayElement = null;
        this.renderedAllDayEvents = null;
        this.renderedEvents = null;
        this.slotCount = null;
        this.interval = null;
        this.startHour = null;
        this.endHour = null;
        this.element = null;
        this.fields = null;
        this.animation = null;
        _super.prototype.destroy.call(this);
    };
    return VerticalEvent;
}(EventBase));
export { VerticalEvent };
