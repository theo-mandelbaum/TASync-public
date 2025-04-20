"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 *  Schedule hide non-working days sample
 */
ej2_react_dropdowns_1.MultiSelectComponent.Inject(ej2_react_dropdowns_1.CheckBoxSelection);
var HideWeekend = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.employeeEventData, null, true);
    var weekDays = [
        { Name: 'Sunday', Value: '0' },
        { Name: 'Monday', Value: '1' },
        { Name: 'Tuesday', Value: '2' },
        { Name: 'Wednesday', Value: '3' },
        { Name: 'Thursday', Value: '4' },
        { Name: 'Friday', Value: '5' },
        { Name: 'Saturday', Value: '6' }
    ];
    var localFields = { text: 'Name', value: 'Value' };
    var value = ['1', '3', '4', '5'];
    var _a = (0, react_1.useState)('Show'), content = _a[0], setContent = _a[1];
    var _b = (0, react_1.useState)(false), showWeekend = _b[0], setShowWeekend = _b[1];
    var onChange = function (args) {
        setContent(args.target.classList.contains('e-active') ? 'Hide' : 'Show');
        setShowWeekend(args.target.classList.contains('e-active') ? true : false);
    };
    var onMultiSelectChange = function (args) {
        if (scheduleObj.current) {
            var value_1 = args.value.slice(0).map(Number).sort();
            scheduleObj.current.workDays = (value_1.length === 0 ? [0] : value_1);
            scheduleObj.current.dataBind();
        }
    };
    var OnEventRendered = function (args) {
        var _a;
        (0, helper_1.applyCategoryColor)(args, (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.currentView);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: scheduleObj, workDays: [1, 3, 4, 5], workHours: { start: '08:00' }, selectedDate: new Date(2021, 1, 15), eventSettings: { dataSource: data }, showWeekend: showWeekend, eventRendered: OnEventRendered },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { className: 'multi-prop' },
                                    React.createElement("div", { className: 'workdayscheckbox', style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: 'workdayscheckbox', dataSource: weekDays, fields: localFields, mode: 'CheckBox', value: value, change: onMultiSelectChange, showDropDownIcon: true, showClearButton: false, placeholder: 'Working days', floatLabelType: 'Always' }))))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { style: { fontWeight: 500 } }, "Non-Working days"),
                                React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { title: 'Show/hide weekend', isToggle: true, onClick: onChange }, content)))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo depicts the way to show or hide the weekend days of a week on Scheduler. The days whichever not specified in working days collections will be taken into consideration as weekend days.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "showWeekend"),
                " property is used either to show or hide the weekend days of a week and it is not applicable on ",
                React.createElement("code", null, "WorkWeek"),
                " view. By default, it is set to ",
                React.createElement("code", null, "true"),
                ". The days which are not a part of the working days collection of a Scheduler are usually considered as weekend days here."),
            React.createElement("p", null,
                "Here, the working days are defined as ",
                React.createElement("code", null, "[1, 3, 4, 5]"),
                " on Scheduler. Therefore, the remaining days (0, 2, 6 \u2013 Sunday, Tuesday and Saturday) are considered as weekend days and will be hidden from the views as the ",
                React.createElement("code", null, "showWeekend"),
                " property is set to false."))));
};
exports.default = HideWeekend;
