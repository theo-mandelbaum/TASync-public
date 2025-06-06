/* eslint-disable @typescript-eslint/no-explicit-any */
import { addClass, createElement, extend, isNullOrUndefined, closest, setStyleAttribute } from '@syncfusion/ej2-base';
import { formatUnit, remove, removeClass } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constant';
import * as util from '../base/util';
/**
 * Base class for the common drag and resize related actions
 */
var ActionBase = /** @class */ (function () {
    function ActionBase(parent) {
        this.daysVariation = 0;
        this.parent = parent;
        this.actionObj = {
            X: 0, Y: 0, groupIndex: 0, cellWidth: 0, cellHeight: 0, slotInterval: 0, interval: 0, actionIndex: 0,
            cloneElement: [], originalElement: [], action: null, isAllDay: null, excludeSelectors: null,
            index: 0, navigationInterval: null, scrollInterval: null
        };
        this.scrollArgs = { element: null, width: 0, height: 0 };
        this.resizeEdges = { left: false, right: false, top: false, bottom: false };
        this.scrollEdges = { left: false, right: false, top: false, bottom: false };
    }
    ActionBase.prototype.getChangedData = function (multiData) {
        var _this = this;
        var eventObj = extend({}, this.actionObj.event, null, true);
        eventObj[this.parent.eventFields.startTime] = this.actionObj.start;
        eventObj[this.parent.eventFields.endTime] = this.actionObj.end;
        if (!isNullOrUndefined(this.actionObj.isAllDay)) {
            eventObj[this.parent.eventFields.isAllDay] = this.actionObj.isAllDay;
        }
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            var originalElement = this.getOriginalElement(this.actionObj.element);
            if (originalElement) {
                var indexCol_1 = originalElement.map(function (element) { return parseInt(element.getAttribute('data-group-index'), 10); });
                if (indexCol_1.indexOf(this.actionObj.groupIndex) === -1 || (!isNullOrUndefined(multiData) && multiData.length > 0)) {
                    var cloneIndex_1 = parseInt(this.actionObj.clone.getAttribute('data-group-index'), 10);
                    indexCol_1 = indexCol_1.filter(function (index) { return index !== cloneIndex_1; });
                    indexCol_1.push(this.actionObj.groupIndex);
                    if (multiData && multiData.length > 0) {
                        multiData.forEach(function (data) {
                            _this.parent.resourceBase.getResourceData(data, _this.actionObj.groupIndex, indexCol_1);
                        });
                    }
                    else {
                        this.parent.resourceBase.getResourceData(eventObj, this.actionObj.groupIndex, indexCol_1);
                    }
                }
            }
        }
        return eventObj;
    };
    ActionBase.prototype.saveChangedData = function (eventArgs, isMultiSelect) {
        if (isMultiSelect === void 0) { isMultiSelect = false; }
        this.parent.activeEventData.event = this.actionObj.event;
        this.parent.currentAction = 'Save';
        var currentAction;
        var eventsCollection = [eventArgs.data];
        if (isMultiSelect) {
            eventsCollection = eventArgs.selectedData;
        }
        for (var _i = 0, eventsCollection_1 = eventsCollection; _i < eventsCollection_1.length; _i++) {
            var eventObj = eventsCollection_1[_i];
            var isSameResource = (this.parent.activeViewOptions.group.resources.length > 0) ?
                parseInt(this.actionObj.element.getAttribute('data-group-index'), 10) === this.actionObj.groupIndex : true;
            if (+eventObj[this.parent.eventFields.startTime] === +this.actionObj.event[this.parent.eventFields.startTime] &&
                +eventObj[this.parent.eventFields.endTime] === +this.actionObj.event[this.parent.eventFields.endTime] && isSameResource) {
                this.parent.crudModule.crudObj.isCrudAction = false;
                return;
            }
            if (eventObj[this.parent.eventFields.recurrenceRule]) {
                var eveId = (eventObj[this.parent.eventFields.recurrenceID] || eventObj[this.parent.eventFields.id]);
                if (eventObj[this.parent.eventFields.id] === eventObj[this.parent.eventFields.recurrenceID]) {
                    eventObj[this.parent.eventFields.id] = this.parent.eventBase.getEventMaxID();
                    currentAction = 'EditOccurrence';
                }
                if (this.parent.enableRecurrenceValidation
                    && this.parent.eventWindow.editOccurrenceValidation(eveId, eventObj, this.actionObj.event)) {
                    return;
                }
            }
            else {
                currentAction = null;
            }
            if (eventObj[this.parent.eventFields.startTimezone] || eventObj[this.parent.eventFields.endTimezone]) {
                this.parent.eventBase.timezoneConvert(eventObj);
            }
            this.parent.crudModule.saveEvent(eventObj, currentAction);
        }
    };
    ActionBase.prototype.calculateIntervalTime = function (date) {
        var dateInMS = util.resetTime(date).getTime();
        var startHour = this.parent.activeView.getStartHour();
        var intervalInMS = util.MS_PER_MINUTE * this.actionObj.interval;
        dateInMS += (startHour.getHours() * 60 + startHour.getMinutes()) * util.MS_PER_MINUTE + startHour.getSeconds() * 1000;
        dateInMS = dateInMS + Math.floor((date.getTime() - dateInMS) / intervalInMS) * intervalInMS;
        return new Date(dateInMS);
    };
    ActionBase.prototype.getContentAreaDimension = function () {
        var viewElement = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var trElement = [].slice.call(viewElement.querySelector('tr').children);
        if (!this.parent.activeView.isTimelineView() && this.parent.activeViewOptions.group.resources.length > 0 &&
            !this.parent.isAdaptive && !this.parent.enableAdaptiveUI && !this.parent.virtualScrollModule) {
            trElement = this.getResourceElements(trElement);
        }
        var leftOffset = trElement[0].getBoundingClientRect();
        var rightOffset = trElement.slice(-1)[0].getBoundingClientRect();
        var viewDimension = {
            bottom: viewElement.scrollHeight - 5,
            left: this.parent.enableRtl ? rightOffset.left : leftOffset.left,
            right: this.parent.enableRtl ? leftOffset.right : rightOffset.right,
            top: 0,
            leftOffset: this.parent.enableRtl ? rightOffset.right : leftOffset.right,
            rightOffset: this.parent.enableRtl ? leftOffset.left : rightOffset.left
        };
        return viewDimension;
    };
    ActionBase.prototype.getIndex = function (index) {
        var contentElements = [].slice.call(this.parent.getContentTable().querySelector('tr').children);
        var indexes = { minIndex: 0, maxIndex: contentElements.length - 1 };
        if (this.actionObj.action === 'resize' && this.parent.activeViewOptions.group.resources.length > 0 &&
            !this.parent.uiStateValues.isGroupAdaptive && !this.parent.activeView.isTimelineView()) {
            var groupElements = this.getResourceElements(contentElements);
            indexes.minIndex = groupElements[0].cellIndex;
            indexes.maxIndex = groupElements.slice(-1)[0].cellIndex;
        }
        if (index < indexes.minIndex) {
            index = indexes.minIndex;
        }
        if (index > indexes.maxIndex) {
            index = indexes.maxIndex;
        }
        return index;
    };
    ActionBase.prototype.updateTimePosition = function (date, multiData) {
        var index = 0;
        for (var _i = 0, _a = this.actionObj.cloneElement; _i < _a.length; _i++) {
            var cloneElement = _a[_i];
            var timeElement = cloneElement.querySelector('.' + cls.APPOINTMENT_TIME);
            if (timeElement) {
                var startTime = this.actionObj.start;
                var endTime = this.actionObj.end;
                if (multiData && multiData.length > 0) {
                    startTime = multiData[parseInt(index.toString(), 10)][this.parent.eventFields.startTime];
                    endTime = multiData[parseInt(index.toString(), 10)][this.parent.eventFields.endTime];
                }
                timeElement.innerHTML = this.parent.getTimeString(startTime) + ' - ' +
                    this.parent.getTimeString(endTime);
            }
            index++;
        }
        if (!this.parent.activeViewOptions.timeScale.enable || !this.parent.isAdaptive || this.parent.currentView === 'Month' ||
            this.parent.currentView === 'TimelineMonth') {
            return;
        }
        var timeIndicator = this.parent.element.querySelector('.' + cls.CLONE_TIME_INDICATOR_CLASS);
        if (!timeIndicator) {
            timeIndicator = createElement('div', { className: cls.CLONE_TIME_INDICATOR_CLASS });
            var wrapperClass = this.parent.activeView.isTimelineView() ? cls.DATE_HEADER_WRAP_CLASS : cls.TIME_CELLS_WRAP_CLASS;
            this.parent.element.querySelector('.' + wrapperClass).appendChild(timeIndicator);
        }
        timeIndicator.innerHTML = this.parent.getTimeString(date);
        var offsetValue = 0;
        if (this.parent.activeView.isTimelineView()) {
            if (this.parent.enableRtl) {
                var rightValue = parseInt(this.actionObj.clone.style.right, 10);
                offsetValue = this.actionObj.action === 'drag' || this.resizeEdges.left ?
                    rightValue + this.actionObj.clone.offsetWidth : rightValue;
                timeIndicator.style.right = formatUnit(offsetValue);
            }
            else {
                var leftValue = parseInt(this.actionObj.clone.style.left, 10);
                offsetValue = this.actionObj.action === 'drag' || this.resizeEdges.left ?
                    leftValue : leftValue + this.actionObj.clone.offsetWidth;
                timeIndicator.style.left = formatUnit(offsetValue);
            }
        }
        else {
            offsetValue = this.actionObj.action === 'drag' || this.resizeEdges.top ? this.actionObj.clone.offsetTop :
                this.actionObj.clone.offsetTop + this.actionObj.clone.offsetHeight;
            timeIndicator.style.top = formatUnit(offsetValue);
        }
    };
    ActionBase.prototype.getResourceElements = function (table) {
        var _this = this;
        return table.filter(function (element) {
            return parseInt(element.getAttribute('data-group-index'), 10) === _this.actionObj.groupIndex;
        });
    };
    ActionBase.prototype.getOriginalElement = function (element) {
        var originalElement;
        var guid = element.getAttribute('data-guid');
        var isMorePopup = element.offsetParent && element.offsetParent.classList.contains(cls.MORE_EVENT_POPUP_CLASS);
        if (isMorePopup || this.parent.activeView.isTimelineView() || (this.actionObj.action !== 'resize' && this.parent.virtualScrollModule)) {
            originalElement = [].slice.call(this.parent.element.querySelectorAll('[data-guid="' + guid + '"]'));
        }
        else {
            var tr = closest(element, 'tr');
            if (tr) {
                originalElement = [].slice.call(tr.querySelectorAll('[data-guid="' + guid + '"]'));
            }
        }
        return originalElement;
    };
    ActionBase.prototype.createCloneElement = function (element) {
        var cloneWrapper = document.createElement('div');
        cloneWrapper.appendChild(element.cloneNode(true));
        var cloneElement = cloneWrapper.children[0];
        var cloneClassLists = [cls.CLONE_ELEMENT_CLASS];
        cloneClassLists.push((this.actionObj.action === 'drag') ? cls.DRAG_CLONE_CLASS : cls.RESIZE_CLONE_CLASS);
        if (this.parent.currentView === 'Month' || this.parent.currentView === 'TimelineMonth') {
            cloneClassLists.push(cls.MONTH_CLONE_ELEMENT_CLASS);
        }
        addClass([cloneElement], cloneClassLists);
        addClass([element], cls.EVENT_ACTION_CLASS);
        if (!isNullOrUndefined(element.parentElement)) {
            element.parentElement.appendChild(cloneElement);
        }
        cloneElement.style.width = formatUnit(cloneElement.offsetWidth - 2);
        var dragElement = document.querySelector(this.parent.eventDragArea);
        if (this.parent.eventDragArea && this.actionObj.action === 'drag' && dragElement) {
            dragElement.appendChild(cloneElement);
        }
        setStyleAttribute(cloneElement, { border: '0px' });
        return cloneElement;
    };
    ActionBase.prototype.removeCloneElementClasses = function () {
        var elements = this.actionObj.originalElement;
        if (this.parent.currentView === 'Month' || this.parent.currentView === 'TimelineYear' ||
            this.parent.currentView === 'Day' || this.parent.currentView === 'Week' || this.parent.currentView === 'WorkWeek') {
            elements = [].slice.call(this.parent.element.querySelectorAll('.' + cls.EVENT_ACTION_CLASS));
        }
        removeClass(elements, cls.EVENT_ACTION_CLASS);
    };
    ActionBase.prototype.removeCloneElement = function () {
        this.actionObj.originalElement = [];
        var dynamicEle = [].slice.call(this.parent.element.querySelectorAll('.e-dynamic-clone'));
        for (var _i = 0, dynamicEle_1 = dynamicEle; _i < dynamicEle_1.length; _i++) {
            var cloneEle = dynamicEle_1[_i];
            remove(cloneEle);
        }
        for (var _a = 0, _b = this.actionObj.cloneElement; _a < _b.length; _a++) {
            var cloneElement = _b[_a];
            if (!isNullOrUndefined(cloneElement.parentNode)) {
                remove(cloneElement);
            }
        }
        this.actionObj.cloneElement = [];
        var timeIndicator = this.parent.element.querySelector('.' + cls.CLONE_TIME_INDICATOR_CLASS);
        if (timeIndicator) {
            remove(timeIndicator);
        }
    };
    ActionBase.prototype.getCursorElement = function (e) {
        var pages = this.parent.eventBase.getPageCoordinates(e);
        return document.elementFromPoint(pages.clientX, pages.clientY);
    };
    ActionBase.prototype.autoScroll = function () {
        var parent = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var yIsScrollable = parent.offsetHeight <= parent.scrollHeight;
        var xIsScrollable = parent.offsetWidth <= parent.scrollWidth;
        var yInBounds = yIsScrollable && parent.scrollTop >= 0 && parent.scrollTop + parent.offsetHeight <= parent.scrollHeight;
        var xInBounds = xIsScrollable && parent.scrollLeft >= 0 && parent.scrollLeft + parent.offsetWidth <= parent.scrollWidth;
        if (this.actionObj.action === 'resize' && this.scrollEdges.right && (parent.scrollLeft + parent.offsetWidth) > parent.scrollWidth) {
            var tdCollections = ([].slice.call(this.parent.getContentTable().querySelector('tr').children)).length - 1;
            var cellIndex = Math.ceil((this.actionObj.clone.offsetLeft + (this.actionObj.clone.offsetWidth)) /
                this.actionObj.cellWidth);
            xInBounds = cellIndex === tdCollections;
        }
        if (yInBounds && (this.scrollEdges.top || this.scrollEdges.bottom)) {
            parent.scrollTop += this.scrollEdges.top ? -this.actionObj.scroll.scrollBy : this.actionObj.scroll.scrollBy;
            if (this.actionObj.action === 'resize') {
                if (parent.scrollHeight !== parent.offsetHeight + parent.scrollTop && parent.scrollTop > 0) {
                    this.actionObj.Y += this.scrollEdges.top ? this.actionObj.scroll.scrollBy : -this.actionObj.scroll.scrollBy;
                }
            }
        }
        if (xInBounds && (this.scrollEdges.left || this.scrollEdges.right)) {
            parent.scrollLeft += this.scrollEdges.left ? -this.actionObj.scroll.scrollBy : this.actionObj.scroll.scrollBy;
            if (this.actionObj.action === 'resize') {
                if (parent.scrollWidth !== parent.offsetWidth + parent.scrollLeft && parent.scrollLeft > 0) {
                    this.actionObj.X += this.scrollEdges.left ? this.actionObj.scroll.scrollBy : -this.actionObj.scroll.scrollBy;
                }
            }
        }
    };
    ActionBase.prototype.autoScrollValidation = function () {
        if (!this.actionObj.scroll.enable) {
            return false;
        }
        var res = this.parent.boundaryValidation(this.actionObj.pageY, this.actionObj.pageX);
        this.scrollEdges = res;
        return res.bottom || res.top || res.left || res.right;
    };
    ActionBase.prototype.actionClass = function (type) {
        if (type === 'addClass') {
            addClass([this.parent.element], cls.EVENT_ACTION_CLASS);
        }
        else {
            removeClass([this.parent.element], cls.EVENT_ACTION_CLASS);
        }
    };
    ActionBase.prototype.updateScrollPosition = function (e) {
        var _this = this;
        this.scrollEventArgs = e;
        if (this.actionObj.scroll.enable && isNullOrUndefined(this.actionObj.scrollInterval)) {
            this.actionObj.scrollInterval = window.setInterval(function () {
                if (_this.autoScrollValidation() && !_this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
                    if (_this.parent.activeView.isTimelineView() && _this.parent.activeViewOptions.group.resources.length > 0
                        && _this.actionObj.groupIndex < 0) {
                        return;
                    }
                    _this.autoScroll();
                    if (_this.actionObj.action === 'drag') {
                        _this.parent.dragAndDropModule.updateDraggingDateTime(_this.scrollEventArgs);
                    }
                    else {
                        _this.parent.resizeModule.updateResizingDirection(_this.scrollEventArgs);
                    }
                }
            }, this.actionObj.scroll.timeDelay);
        }
    };
    ActionBase.prototype.updateOriginalElement = function (cloneElement) {
        var query = '[data-id="' + cloneElement.getAttribute('data-id') + '"]';
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            query = query.concat('[data-group-index = "' + cloneElement.getAttribute('data-group-index') + '"]');
        }
        var elements = [].slice.call(this.parent.element.querySelectorAll(query));
        addClass(elements, cls.EVENT_ACTION_CLASS);
        var eventWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CLONE_ELEMENT_CLASS));
        removeClass(eventWrappers, cls.EVENT_ACTION_CLASS);
    };
    ActionBase.prototype.getUpdatedEvent = function (startTime, endTime, eventObj) {
        var event = JSON.parse(JSON.stringify(eventObj));
        event[this.parent.eventFields.startTime] = startTime;
        event[this.parent.eventFields.endTime] = endTime;
        return event;
    };
    ActionBase.prototype.dynamicYearlyEventsRendering = function (event, isResize) {
        if (isResize === void 0) { isResize = false; }
        if (!isNullOrUndefined(this.parent.eventDragArea)) {
            return;
        }
        var appWidth = this.actionObj.cellWidth - 7;
        if (isResize && (this.resizeEdges.left || this.resizeEdges.right)) {
            appWidth = this.actionObj.cellWidth * event.count;
        }
        if (!isResize && (this.parent.activeViewOptions.orientation === 'Horizontal' && this.parent.activeViewOptions.group.resources.length === 0)) {
            var eventObj = this.yearEvent.isSpannedEvent(event, event[this.parent.eventFields.startTime]);
            if (eventObj[this.parent.eventFields.startTime].getTime() ===
                eventObj[this.parent.eventFields.endTime].getTime()) {
                eventObj.isSpanned.count = 1;
            }
            appWidth = eventObj.isSpanned.count * this.actionObj.cellWidth;
        }
        if (!isResize && this.parent.activeViewOptions.orientation === 'Vertical' && this.parent.activeViewOptions.group.resources.length !== 0) {
            var eventObj = this.yearEvent.isSpannedEvent(event, event[this.parent.eventFields.startTime]);
            appWidth = eventObj.isSpanned.count * this.actionObj.cellWidth;
        }
        var appointmentElement = this.createAppointmentElement(this.actionObj.groupIndex, event[this.parent.eventFields.subject]);
        appointmentElement.setAttribute('drag', 'true');
        addClass([appointmentElement], cls.CLONE_ELEMENT_CLASS);
        setStyleAttribute(appointmentElement, {
            'width': appWidth + 'px', 'border': '0px', 'pointer-events': 'none',
            'position': 'absolute', 'overflow': 'hidden', 'padding': '3px'
        });
        if (this.actionObj.clone.style.backgroundColor !== '') {
            setStyleAttribute(appointmentElement, { 'backgroundColor': this.actionObj.clone.style.backgroundColor });
        }
        var date = util.resetTime(event[this.parent.eventFields.startTime]).getTime();
        var query = '.' + cls.WORK_CELLS_CLASS + '[data-date="' + date + '"]';
        if (this.parent.activeViewOptions.group.resources.length > 0 && !this.parent.uiStateValues.isGroupAdaptive) {
            query = '.' + cls.WORK_CELLS_CLASS + '[data-date="' + date + '"][data-group-index="' + this.actionObj.groupIndex + '"]';
        }
        var cellTd = this.parent.element.querySelector(query);
        if (isNullOrUndefined(cellTd)) {
            return;
        }
        if (isResize) {
            var dateHeader = cellTd.querySelector('.' + cls.DATE_HEADER_CLASS);
            var appHeight = this.actionObj.cellHeight * event.count -
                (dateHeader ? dateHeader.offsetHeight : 0) - 7;
            if (this.resizeEdges.right || this.resizeEdges.left) {
                appHeight = parseInt(this.actionObj.clone.style.height, 10);
            }
            setStyleAttribute(appointmentElement, { 'height': appHeight + 'px' });
        }
        this.renderDynamicElement(cellTd, appointmentElement, true);
        this.actionObj.cloneElement.push(appointmentElement);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ActionBase.prototype.renderDynamicElement = function (cellTd, element, isAppointment) {
        if (isAppointment === void 0) { isAppointment = false; }
        if (cellTd.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS)) {
            cellTd.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS).appendChild(element);
        }
        else {
            var wrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
            wrapper.appendChild(element);
            cellTd.appendChild(wrapper);
        }
    };
    ActionBase.prototype.createAppointmentElement = function (resIndex, innerText) {
        var appointmentWrapper = createElement('div', {
            className: cls.APPOINTMENT_CLASS,
            innerHTML: innerText
        });
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            appointmentWrapper.setAttribute('data-group-index', resIndex.toString());
        }
        return appointmentWrapper;
    };
    ActionBase.prototype.dynamicEventsRendering = function (event) {
        var _this = this;
        if (!isNullOrUndefined(this.parent.eventDragArea)) {
            return;
        }
        var dateRender = this.parent.activeView.renderDates;
        var workCells = [].slice.call(this.parent.element.querySelectorAll('.' + cls.WORK_CELLS_CLASS));
        var workDays = this.parent.activeViewOptions.workDays;
        var groupOrder;
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            var renderedResource = this.parent.virtualScrollModule && this.parent.virtualScrollModule.isHorizontalScroll ?
                this.parent.resourceBase.renderedResources : this.parent.resourceBase.lastResourceLevel;
            var resources = renderedResource.
                filter(function (res) { return res.groupIndex === _this.actionObj.groupIndex; });
            dateRender = resources[0].renderDates;
            var elementSelector = "." + cls.WORK_CELLS_CLASS + "[data-group-index=\"" + this.actionObj.groupIndex + "\"]";
            workCells = [].slice.call(this.parent.element.querySelectorAll(elementSelector));
            workDays = resources[0].workDays;
            groupOrder = resources[0].groupOrder;
        }
        this.monthEvent.dateRender = dateRender;
        this.monthEvent.getSlotDates(workDays);
        if (this.resizeEdges.left || this.resizeEdges.right) {
            var eventWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CLONE_ELEMENT_CLASS));
            for (var _i = 0, eventWrappers_1 = eventWrappers; _i < eventWrappers_1.length; _i++) {
                var wrapper = eventWrappers_1[_i];
                remove(wrapper);
            }
        }
        var spannedEvents = this.monthEvent.splitEvent(event, dateRender);
        for (var _a = 0, spannedEvents_1 = spannedEvents; _a < spannedEvents_1.length; _a++) {
            var event_1 = spannedEvents_1[_a];
            var day = this.parent.getIndexOfDate(dateRender, util.resetTime(event_1[this.monthEvent.fields.startTime]));
            var diffInDays = event_1.data.count;
            var appWidth = (diffInDays * this.actionObj.cellWidth) - 7;
            var appointmentElement = this.monthEvent.createAppointmentElement(event_1, this.actionObj.groupIndex, true);
            appointmentElement.setAttribute('drag', 'true');
            addClass([appointmentElement], cls.CLONE_ELEMENT_CLASS);
            this.monthEvent.applyResourceColor(appointmentElement, event_1, 'backgroundColor', groupOrder);
            setStyleAttribute(appointmentElement, { 'width': appWidth + 'px', 'border': '0px', 'pointer-events': 'none' });
            var cellTd = workCells[parseInt(day.toString(), 10)];
            if (cellTd) {
                this.monthEvent.renderElement(cellTd, appointmentElement, true);
                this.actionObj.cloneElement.push(appointmentElement);
            }
        }
    };
    ActionBase.prototype.destroy = function () {
        if (!this.parent || this.parent && this.parent.isDestroyed) {
            return;
        }
        this.actionObj = {};
        this.scrollArgs = {};
        this.resizeEdges = { left: false, right: false, top: false, bottom: false };
        this.scrollEdges = { left: false, right: false, top: false, bottom: false };
    };
    return ActionBase;
}());
export { ActionBase };
