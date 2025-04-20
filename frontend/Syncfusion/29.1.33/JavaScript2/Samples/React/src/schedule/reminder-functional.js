"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_base_1 = require("@syncfusion/ej2-react-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
var sample_base_1 = require("../common/sample-base");
/**
 * Schedule reminder sample
 */
var Reminder = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        return function () {
            if (reminderInterval) {
                clearInterval(reminderInterval);
            }
        };
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var toastObj = (0, react_1.useRef)(null);
    var reminderInterval;
    var position = { X: 'Right', Y: 'Top' };
    var timeout = 0;
    var animation = {
        hide: { effect: 'SlideRightOut' },
        show: { effect: 'SlideRightIn' }
    };
    var data = (0, helper_1.getReminderEvents)();
    var onCreated = function () {
        reminderInterval = setInterval(refreshEventReminder, 5000);
    };
    var templateFn = function (data) {
        var template = '<div class="e-toast-template"><div class="e-toast-message"><div class="e-toast-title">${Subject}</div>' +
            '<div class="e-toast-content">${StartTime.toLocaleTimeString()} - ${EndTime.toLocaleTimeString()}</div></div></div>';
        return (0, ej2_react_base_1.compile)(template.trim())(data);
    };
    var refreshEventReminder = function () {
        var eventCollection = scheduleObj.current.getCurrentViewEvents();
        eventCollection.forEach(function (event, i) {
            var dateFormat = function (date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()); };
            var startTime = dateFormat(event[scheduleObj.current.eventFields.startTime]);
            var currentTime = dateFormat(new Date(new Date().toUTCString().slice(0, -3)));
            var difference = currentTime.getTime() - startTime.getTime();
            if (startTime.getTime() <= currentTime.getTime() && difference > -1 && difference <= 4000) {
                toastObj.current.show({ template: templateFn(event) });
            }
        });
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '550px', ref: scheduleObj, timezone: 'UTC', eventSettings: { dataSource: data }, created: onCreated },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })),
                React.createElement(ej2_react_notifications_1.ToastComponent, { ref: toastObj, cssClass: 'e-schedule-reminder e-toast-info', target: '.e-schedule', position: position, animation: animation, newestOnTop: true, showCloseButton: true, timeOut: timeout }))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases an event reminder notification that will be displayed after 5 seconds of sample getting loaded.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this example, the ",
                React.createElement("code", null, "Toast"),
                " component is used to show the reminder notification. The reminder notification will be displayed after 5 seconds. We can also customize the notification interval as per our needs."))));
};
exports.default = Reminder;
