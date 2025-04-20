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
exports.Reminder = void 0;
var React = require("react");
var ej2_react_base_1 = require("@syncfusion/ej2-react-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
var sample_base_1 = require("../common/sample-base");
/**
 * Schedule reminder sample
 */
var Reminder = /** @class */ (function (_super) {
    __extends(Reminder, _super);
    function Reminder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.position = { X: 'Right', Y: 'Top' };
        _this.timeout = 0;
        _this.animation = {
            hide: { effect: 'SlideRightOut' },
            show: { effect: 'SlideRightIn' }
        };
        _this.data = (0, helper_1.getReminderEvents)();
        return _this;
    }
    Reminder.prototype.onCreated = function () {
        this.reminderInterval = setInterval(this.refreshEventReminder.bind(this), 5000);
    };
    Reminder.prototype.templateFn = function (data) {
        var template = '<div class="e-toast-template"><div class="e-toast-message"><div class="e-toast-title">${Subject}</div>' +
            '<div class="e-toast-content">${StartTime.toLocaleTimeString()} - ${EndTime.toLocaleTimeString()}</div></div></div>';
        return (0, ej2_react_base_1.compile)(template.trim())(data);
    };
    Reminder.prototype.refreshEventReminder = function () {
        var _this = this;
        var eventCollection = this.scheduleObj.getCurrentViewEvents();
        eventCollection.forEach(function (event, i) {
            var dateFormat = function (date) {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            };
            var startTime = dateFormat(event[_this.scheduleObj.eventFields.startTime]);
            var currentTime = dateFormat(new Date(new Date().toUTCString().slice(0, -3)));
            var difference = currentTime.getTime() - startTime.getTime();
            if (startTime.getTime() <= currentTime.getTime() && difference > -1 && difference <= 4000) {
                _this.toastObj.show({ template: _this.templateFn(event) });
            }
        });
    };
    Reminder.prototype.componentWillUnmount = function () {
        if (this.reminderInterval) {
            clearInterval(this.reminderInterval);
        }
    };
    Reminder.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '550px', ref: function (schedule) { return _this.scheduleObj = schedule; }, timezone: 'UTC', eventSettings: { dataSource: this.data }, created: this.onCreated.bind(this) },
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })),
                    React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { _this.toastObj = toast; }, cssClass: 'e-schedule-reminder e-toast-info', target: '.e-schedule', position: this.position, animation: this.animation, newestOnTop: true, showCloseButton: true, timeOut: this.timeout }))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases an event reminder notification that will be displayed after 5 seconds of sample getting loaded.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this example, the ",
                    React.createElement("code", null, "Toast"),
                    " component is used to show the reminder notification. The reminder notification will be displayed after 5 seconds. We can also customize the notification interval as per our needs."))));
    };
    return Reminder;
}(sample_base_1.SampleBase));
exports.Reminder = Reminder;
