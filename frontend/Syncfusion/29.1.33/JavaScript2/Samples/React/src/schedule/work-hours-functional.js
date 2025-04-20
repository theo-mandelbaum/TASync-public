"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
 * Schedule Work Hour sample
 */
var WorkHours = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.employeeEventData, null, true);
    var _a = (0, react_1.useState)('08:00'), startTime = _a[0], setStartTime = _a[1];
    var _b = (0, react_1.useState)('20:00'), endTime = _b[0], setEndTime = _b[1];
    var _c = (0, react_1.useState)({
        highlight: true,
        start: startTime,
        end: endTime
    }), workHours = _c[0], setWorkHours = _c[1];
    var onSubmit = function () {
        setWorkHours(__assign(__assign({}, workHours), { start: startTime, end: endTime }));
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
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: scheduleObj, selectedDate: new Date(2021, 1, 15), eventSettings: { dataSource: data }, workHours: workHours, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { className: 'timepicker-control-section range' },
                                    React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'startTime', value: new Date(2000, 0, 1, 8), format: 'HH:mm', placeholder: 'Work Start', floatLabelType: 'Always', onChange: onStartTimeChange })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { className: 'timepicker-control-section range' },
                                    React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'endTime', value: new Date(2000, 0, 1, 20), format: 'HH:mm', placeholder: 'Work End', floatLabelType: 'Always', onChange: onEndTimeChange })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'submit', title: 'Submit', onClick: onSubmit }, "Submit")))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases how to set the required working hours on Schedule, thus visually highlighting the cells underlying the given work hour range.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the work hours are set by using the ",
                React.createElement("code", null, "workHours"),
                " property and it usually applies only on the working days defined for the Schedule. It can either be highlighted or not by defining the ",
                React.createElement("code", null, "highlight"),
                " option within the ",
                React.createElement("code", null, "workHours"),
                " property. The working hour range can be defined by making use of the ",
                React.createElement("code", null, "start"),
                " and ",
                React.createElement("code", null, "end"),
                " option available within the ",
                React.createElement("code", null, "workHours"),
                " property."),
            React.createElement("p", null,
                "To set discontinuous working hours on a day, then the default ",
                React.createElement("code", null, "workHours"),
                " on Scheduler needs to be disabled by setting false to ",
                React.createElement("code", null, "highlight"),
                " option within it. Then, make use of the ",
                React.createElement("code", null, "setWorkHours"),
                " method which accepts the days collection and the start & end hour values as parameters."))));
};
exports.default = WorkHours;
