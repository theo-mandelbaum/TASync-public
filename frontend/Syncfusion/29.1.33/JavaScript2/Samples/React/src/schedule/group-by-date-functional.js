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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
/**
 * schedule resources group-bydate sample
 */
var GroupByDate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.resourceData, null, true);
    var _a = (0, react_1.useState)({ byDate: true, hideNonWorkingDays: true, resources: ['Owners'] }), group = _a[0], setGroup = _a[1];
    var resourceData = [
        { text: 'Alice', id: 1, color: '#1aaa55', workDays: [1, 2, 3, 4] },
        { text: 'Smith', id: 2, color: '#7fa900', workDays: [2, 3, 5] },
    ];
    var onChange = function (args) {
        setGroup(__assign(__assign({}, group), { hideNonWorkingDays: args.checked ? true : false }));
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Hide non working days', change: onChange }),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', selectedDate: new Date(2023, 0, 6), eventSettings: { dataSource: data, fields: { subject: { title: 'Task', name: 'Subject' }, location: { title: 'Project Name', name: 'Location' }, description: { title: 'Comments', name: 'Description' } } }, group: group },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Assignee', name: 'Owners', allowMultiple: true, dataSource: resourceData, textField: 'text', idField: 'id', colorField: 'color', workDaysField: 'workDays' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo illustrates the daily tasks of two employees grouped by date-wise.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, there are 2 resources defined namely ",
                React.createElement("strong", null, "Alice"),
                " and ",
                React.createElement("strong", null, "Smith"),
                " under the resource",
                React.createElement("code", null, "dataSource"),
                ". The Scheduler can be switched to group by date, by setting ",
                React.createElement("code", null, "true"),
                " to the option",
                React.createElement("code", null, "byDate"),
                " within the ",
                React.createElement("code", null, "group"),
                " property."),
            React.createElement("p", null,
                "The different work days for the each resources are provided by using the ",
                React.createElement("code", null, "workDaysField"),
                " property and the Scheduler will be displayed the provided dates alone when ",
                React.createElement("code", null, "hideNonWorkingDays"),
                " property set as ",
                React.createElement("code", null, "true"),
                "."))));
};
exports.default = GroupByDate;
