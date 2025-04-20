"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule Work days sample
 */
var WorkDays = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.employeeEventData, null, true);
    var _a = (0, react_1.useState)([1, 3, 5]), workDays = _a[0], setWorkDays = _a[1];
    var _b = (0, react_1.useState)(0), firstDayOfWeek = _b[0], setFirstDayOfWeek = _b[1];
    var workDaysOptions = [
        { text: 'Mon, Wed, Fri', value: '1,3,5' },
        { text: 'Mon, Tue, Wed, Thu, Fri', value: '1,2,3,4,5' },
        { text: 'Tue, Wed, Thu, Fri', value: '2,3,4,5' },
        { text: 'Thu, Fri, Sat, Mon, Tue', value: '4,5,6,1,2' }
    ];
    var dayOfWeekOptions = [
        { text: 'Sunday', value: 0 },
        { text: 'Monday', value: 1 },
        { text: 'Tuesday', value: 2 },
        { text: 'Wednesday', value: 3 },
        { text: 'Thursday', value: 4 },
        { text: 'Friday', value: 5 },
        { text: 'Saturday', value: 6 }
    ];
    var fields = { text: 'text', value: 'value' };
    var onWorkDaysChange = function (args) {
        var _a;
        setWorkDays(args.value.toString().split(',').map(Number));
        (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.dataBind();
    };
    var onDayOfWeekChange = function (args) {
        var _a;
        setFirstDayOfWeek(args.value);
        (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.dataBind();
    };
    var onEventRendered = function (args) {
        var _a;
        (0, helper_1.applyCategoryColor)(args, (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.currentView);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: scheduleObj, workHours: { start: '08:00' }, selectedDate: new Date(2021, 1, 15), eventSettings: { dataSource: data }, workDays: workDays, firstDayOfWeek: firstDayOfWeek, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: '1,3,5', dataSource: workDaysOptions, fields: fields, change: onWorkDaysChange, popupWidth: '180px', placeholder: 'Work days', floatLabelType: 'Always' })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: firstDayOfWeek, dataSource: dayOfWeekOptions, fields: fields, change: onDayOfWeekChange, placeholder: 'First day of week', floatLabelType: 'Always' })))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases how to set customized working days as well as first day of a week on Schedule.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the working days of a week can be set on Scheduler using the ",
                React.createElement("code", null, "workDays"),
                " property which accepts the collection of day indexes (from 0 to 6) of a week. By default, it is set to ",
                React.createElement("code", null, "[1, 2, 3, 4, 5]"),
                " and in this demo, it has been set to ",
                React.createElement("code", null, "[1, 3, 5]"),
                " which means that ",
                React.createElement("code", null, "Monday, Wednesday, Friday"),
                "is being set as working days of a week and is visually differentiated from non-working days. The working hours usually applies only on these given working days."),
            React.createElement("p", null,
                "The first day of the week can also be set on the Scheduler by making use of the ",
                React.createElement("code", null, "firstDayOfWeek"),
                " property, doing so which will make the Scheduler to start with that day."),
            React.createElement("p", null,
                React.createElement("strong", null, "Note: "),
                " Here, Sunday is always denoted as 0, Monday as 1 and so on."))));
};
exports.default = WorkDays;
