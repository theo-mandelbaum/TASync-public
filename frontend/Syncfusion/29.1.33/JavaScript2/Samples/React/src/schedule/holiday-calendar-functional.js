"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var helper_1 = require("./helper");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule Holiday Calendar sample
 */
var HolidayCalendar = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var toastRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(true), holidayEventCollection = _a[0], setHolidayEventCollection = _a[1];
    var _b = (0, react_1.useState)(true), holidayListCollection = _b[0], setHolidayListCollection = _b[1];
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleEvent, null, true);
    var holidayList = (0, ej2_base_1.extend)([], dataSource.holidayList, null, true);
    var updateHolidayEventCollection = function (args) {
        setHolidayEventCollection(args.checked);
        scheduleObj.current.refreshEvents();
    };
    var updateHolidayListCollection = function (args) {
        setHolidayListCollection(args.checked);
        scheduleObj.current.refreshEvents();
    };
    var isEventWithinHolidayRange = function (eventStartDate, eventEndDate) {
        for (var _i = 0, holidayList_1 = holidayList; _i < holidayList_1.length; _i++) {
            var holiday = holidayList_1[_i];
            var holidayStartDate = new Date(holiday.StartTime);
            var holidayEndDate = new Date(holiday.EndTime);
            if ((eventStartDate >= holidayStartDate &&
                eventStartDate <= holidayEndDate) ||
                (eventEndDate >= holidayStartDate && eventEndDate <= holidayEndDate) ||
                (eventStartDate <= holidayStartDate && eventEndDate >= holidayEndDate)) {
                return true;
            }
        }
        return false;
    };
    var showToastForAction = function (actionName, holidayDateRange) {
        if (!holidayDateRange)
            return;
        var messages = {
            resizeStop: 'You cannot resize an event within the holiday date range',
            dragStop: 'You cannot drop an event within the holiday date range',
            eventCreate: 'You cannot add an event within the holiday date range',
            eventChange: 'You cannot edit an event within the holiday date range',
        };
        if (messages[actionName]) {
            toastRef.current.content = messages[actionName];
            toastRef.current.show();
        }
    };
    var onActionBegin = function (args) {
        var requestType = args.requestType, data = args.data;
        var isCreateOrChange = requestType === 'eventCreate' || requestType === 'eventChange';
        if (isCreateOrChange) {
            var eventData = requestType === 'eventCreate' ? data[0] : data;
            var adjustedEndTime = eventData.IsAllDay
                ? new Date(eventData.EndTime.setMinutes(eventData.EndTime.getMinutes() - 1))
                : eventData.EndTime;
            var isHolidayDateRange = !holidayEventCollection &&
                !eventData.RecurrenceRule &&
                isEventWithinHolidayRange(eventData.StartTime, adjustedEndTime);
            args.cancel = isHolidayDateRange;
            showToastForAction(requestType, isHolidayDateRange);
        }
    };
    var onEventRender = function (args) {
        var event = args.data;
        if (!holidayEventCollection) {
            if (!event.isHoliday && event.IsAllDay) {
                event.EndTime.setMinutes(event.EndTime.getMinutes() - 1);
            }
            args.cancel =
                !event.isHoliday &&
                    isEventWithinHolidayRange(event.StartTime, event.EndTime);
        }
        if (event.isHoliday && !holidayListCollection) {
            args.cancel = true;
        }
        (0, helper_1.applyCategoryColor)(args, scheduleObj.current.currentView);
    };
    var clickOnHoliday = function (args) {
        args.cancel =
            !holidayEventCollection &&
                isEventWithinHolidayRange(args.startTime, args.endTime.setMinutes(args.endTime.getMinutes() - 1));
    };
    var onEventDragOrResize = function (args) {
        var isHolidayDateRange = !holidayEventCollection &&
            isEventWithinHolidayRange(args.data.StartTime, args.data.EndTime.setMinutes(args.data.EndTime.getMinutes() - 1));
        args.cancel = isHolidayDateRange;
        showToastForAction(args.name, isHolidayDateRange);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: "100%", height: "100%", ref: scheduleObj, cssClass: 'schedule-holiday-calendar', rowAutoHeight: true, selectedDate: new Date(2024, 7, 5), eventSettings: { dataSource: data.concat(holidayList) }, eventRendered: onEventRender, actionBegin: onActionBegin, cellClick: clickOnHoliday, cellDoubleClick: clickOnHoliday, resizeStop: onEventDragOrResize, dragStop: onEventDragOrResize },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })),
                React.createElement("div", null,
                    React.createElement(ej2_react_notifications_1.ToastComponent, { ref: toastRef, id: "toast_default", title: "Information!", cssClass: "e-toast-info", icon: "e-info toast-icons", target: ".e-schedule", position: { X: 'Right', Y: 'Top' } })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: '' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: holidayListCollection, label: "Holiday events", change: updateHolidayListCollection })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: holidayEventCollection, label: 'Scheduling event on holiday', change: updateHolidayEventCollection })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo illustrates how to add and remove holiday events and perform CRUD operations on holiday dates in the Scheduler.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample demonstrates how to perform CRUD operations on holiday dates in a calendar. If a user wants to schedule an appointment on a holiday, they should check the ",
                React.createElement("code", null, "Scheduling event on holiday"),
                " checkbox. This will enable them to add an appointment on a holiday date.If a holiday list is displayed in the calendar, the",
                React.createElement("code", null, "Holiday events"),
                " checkbox will be checked. The holiday list is highlighted in a different color."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "When an action is performed to drag and resize an event, if the ",
                    React.createElement("code", null, "Scheduling event on holiday"),
                    "checkbox is checked, the appointment can be scheduled on holiday dates. If it is unchecked, the appointment cannot have CRUD actions performed on it, and a warning message will be displayed."),
                React.createElement("li", null,
                    "If a recurring event is added on a holiday date and the ",
                    React.createElement("code", null, "Scheduling event on holiday"),
                    " checkbox is checked, it allows the event to occur on that dates. If the checkbox is unchecked, it prevents the event from occurring, based on the dates in the holiday collection.")))));
};
exports.default = HolidayCalendar;
