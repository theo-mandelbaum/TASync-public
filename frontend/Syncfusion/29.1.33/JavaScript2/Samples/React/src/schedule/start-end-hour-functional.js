"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule start and end hour sample
 */
var DayHourLimit = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.employeeEventData, null, true);
    var _a = (0, react_1.useState)('08:00'), startTime = _a[0], setStartTime = _a[1];
    var _b = (0, react_1.useState)('20:00'), endTime = _b[0], setEndTime = _b[1];
    var _c = (0, react_1.useState)(startTime), startHour = _c[0], setStartHour = _c[1];
    var _d = (0, react_1.useState)(endTime), endHour = _d[0], setEndHour = _d[1];
    var onSubmit = function () {
        setStartHour(startTime);
        setEndHour(endTime);
    };
    var onStartTimeChange = function (args) {
        setStartTime(args.target.element.value);
    };
    var onEndTimeChange = function (args) {
        setEndTime(args.target.element.value);
    };
    var onEventRendered = function (args) {
        var _a;
        (0, helper_1.applyCategoryColor)(args, (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.currentView);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: scheduleObj, startHour: startHour, endHour: endHour, selectedDate: new Date(2021, 1, 15), eventSettings: { dataSource: data }, workHours: { highlight: false }, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { className: 'timepicker-control-section range' },
                                    React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'startTime', value: new Date(2000, 0, 1, 8), format: 'HH:mm', placeholder: 'Start Hour', floatLabelType: 'Always', onChange: onStartTimeChange.bind(_this) })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { className: 'timepicker-control-section range' },
                                    React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'endTime', value: new Date(2000, 0, 1, 20), format: 'HH:mm', placeholder: 'End Hour', floatLabelType: 'Always', onChange: onEndTimeChange.bind(_this) })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'submit', title: 'Submit', onClick: onSubmit }, "Submit")))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo depicts how to restrict the start and end hours of Schedule, thus limiting it to display only the given hour range.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the Scheduler is made to display from 8 AM to 8 PM and the rest of the hours are hidden, as it is restricted to start from ",
                React.createElement("code", null, "08:00"),
                " hours and end on ",
                React.createElement("code", null, "20:00"),
                " hours by setting to ",
                React.createElement("code", null, "startHour"),
                " and ",
                React.createElement("code", null, "endHour"),
                " properties respectively."))));
};
exports.default = DayHourLimit;
