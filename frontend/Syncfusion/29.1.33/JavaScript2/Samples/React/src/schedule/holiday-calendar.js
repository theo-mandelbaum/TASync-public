"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayCalendar = void 0;
var React = require("react");
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
var HolidayCalendar = /** @class */ (function (_super) {
    __extends(HolidayCalendar, _super);
    function HolidayCalendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.holidayEventCollection = true;
        _this.holidayListCollection = true;
        _this.data = (0, ej2_base_1.extend)([], dataSource.scheduleEvent, null, true);
        _this.holidayList = (0, ej2_base_1.extend)([], dataSource.holidayList, null, true);
        return _this;
    }
    HolidayCalendar.prototype.updateHolidayEventCollection = function (args) {
        var _a;
        this.holidayEventCollection = args.checked;
        (_a = this.scheduleObj) === null || _a === void 0 ? void 0 : _a.refreshEvents();
    };
    ;
    HolidayCalendar.prototype.updateHolidayListCollection = function (args) {
        var _a;
        this.holidayListCollection = args.checked;
        (_a = this.scheduleObj) === null || _a === void 0 ? void 0 : _a.refreshEvents();
    };
    ;
    HolidayCalendar.prototype.isEventWithinHolidayRange = function (eventStartDate, eventEndDate) {
        for (var _i = 0, _a = this.holidayList; _i < _a.length; _i++) {
            var holiday = _a[_i];
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
    ;
    HolidayCalendar.prototype.showToastForAction = function (actionName, holidayDateRange) {
        if (!holidayDateRange)
            return;
        var messages = {
            resizeStop: 'You cannot resize an event within the holiday date range',
            dragStop: 'You cannot drop an event within the holiday date range',
            eventCreate: 'You cannot add an event within the holiday date range',
            eventChange: 'You cannot edit an event within the holiday date range',
        };
        if (messages[actionName] && this.toastObj) {
            this.toastObj.content = messages[actionName];
            this.toastObj.show();
        }
    };
    ;
    HolidayCalendar.prototype.onActionBegin = function (args) {
        var requestType = args.requestType, data = args.data;
        var isCreateOrChange = requestType === 'eventCreate' || requestType === 'eventChange';
        if (isCreateOrChange) {
            var eventData = requestType === 'eventCreate' ? data[0] : data;
            var adjustedEndTime = eventData.IsAllDay
                ? new Date(eventData.EndTime.setMinutes(eventData.EndTime.getMinutes() - 1))
                : eventData.EndTime;
            var isHolidayDateRange = !this.holidayEventCollection &&
                !eventData.RecurrenceRule &&
                this.isEventWithinHolidayRange(eventData.StartTime, adjustedEndTime);
            args.cancel = isHolidayDateRange;
            this.showToastForAction(requestType, isHolidayDateRange);
        }
    };
    ;
    HolidayCalendar.prototype.onEventRender = function (args) {
        var _a;
        var event = args.data;
        if (!this.holidayEventCollection) {
            if (!event.isHoliday && event.IsAllDay) {
                event.EndTime.setMinutes(event.EndTime.getMinutes() - 1);
            }
            args.cancel =
                !event.isHoliday &&
                    this.isEventWithinHolidayRange(event.StartTime, event.EndTime);
        }
        if (event.isHoliday && !this.holidayListCollection) {
            args.cancel = true;
        }
        (0, helper_1.applyCategoryColor)(args, (_a = this.scheduleObj) === null || _a === void 0 ? void 0 : _a.currentView);
    };
    ;
    HolidayCalendar.prototype.clickOnHoliday = function (args) {
        args.cancel =
            !this.holidayEventCollection &&
                this.isEventWithinHolidayRange(args.startTime, args.endTime.setMinutes(args.endTime.getMinutes() - 1));
    };
    ;
    HolidayCalendar.prototype.onEventDragOrResize = function (args) {
        var isHolidayDateRange = !this.holidayEventCollection &&
            this.isEventWithinHolidayRange(args.data.StartTime, args.data.EndTime.setMinutes(args.data.EndTime.getMinutes() - 1));
        args.cancel = isHolidayDateRange;
        this.showToastForAction(args.name, isHolidayDateRange);
    };
    ;
    HolidayCalendar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '100%', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2024, 7, 5), cssClass: 'schedule-holiday-calendar', rowAutoHeight: true, eventSettings: { dataSource: this.data.concat(this.holidayList) }, eventRendered: this.onEventRender.bind(this), actionBegin: this.onActionBegin.bind(this), cellClick: this.clickOnHoliday.bind(this), cellDoubleClick: this.clickOnHoliday.bind(this), resizeStop: this.onEventDragOrResize.bind(this), dragStop: this.onEventDragOrResize.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })),
                    React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { _this.toastObj = toast; }, id: 'schedule_remainder', position: { X: 'Right', Y: 'Top' }, title: "Information!", cssClass: "e-toast-info", icon: "e-info toast-icons", target: ".e-schedule" }))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: '' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: this.holidayListCollection, label: "Holiday events", change: this.updateHolidayListCollection })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: this.holidayEventCollection, label: "Scheduling event on holiday", change: this.updateHolidayEventCollection })))))))),
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
    return HolidayCalendar;
}(sample_base_1.SampleBase));
exports.HolidayCalendar = HolidayCalendar;
