"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var sample_base_1 = require("../common/sample-base");
var Timezone = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var timezoneData = [
        { taskID: 1, taskName: 'Project Schedule', startDate: new Date('02/04/2024 08:00'), endDate: new Date('03/10/2024') },
        { taskID: 2, taskName: 'Planning', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), parentID: 1 },
        { taskID: 3, taskName: 'Plan timeline', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '60', parentID: 2 },
        { taskID: 4, taskName: 'Plan budget', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '90', parentID: 2 },
        { taskID: 5, taskName: 'Allocate resources', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '75', parentID: 2 },
        { taskID: 6, taskName: 'Planning complete', startDate: new Date('02/06/2024 08:00'), endDate: new Date('02/10/2024'), duration: 0, predecessor: '3FS,4FS,5FS', parentID: 2 },
        { taskID: 7, taskName: 'Design', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/17/2024 08:00'), parentID: 1, },
        { taskID: 8, taskName: 'Software Specification', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/15/2024'), duration: 3, progress: '60', predecessor: '6FS', parentID: 7, },
        { taskID: 9, taskName: 'Develop prototype', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/15/2024'), duration: 3, progress: '100', predecessor: '6FS', parentID: 7, },
        { taskID: 10, taskName: 'Get approval from customer', startDate: new Date('02/16/2024 08:00'), endDate: new Date('02/17/2024 08:00'), duration: 2, progress: '100', predecessor: '9FS', parentID: 7 },
        { taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2024 08:00'), endDate: new Date('02/17/2024 08:00'), duration: 0, predecessor: '10FS', parentID: 7 }
    ];
    var taskFields = {
        id: 'taskID',
        name: 'taskName',
        startDate: 'startDate',
        duration: 'duration',
        progress: 'progress',
        dependency: 'predecessor',
        parentID: 'parentID'
    };
    var timelineSettings = {
        timelineUnitSize: 65,
        topTier: {
            unit: 'Day',
            format: 'MMM dd, yyyy'
        },
        bottomTier: {
            unit: 'Hour',
            format: 'hh:mm a'
        }
    };
    var dayWorkingTime = [{ from: 0, to: 24 }];
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Timezone', dataSource: timezoneData, timelineSettings: timelineSettings, height: '450px', timezone: 'UTC', durationUnit: 'Hour', includeWeekend: true, treeColumnIndex: 1, dateFormat: 'hh:mm a', dayWorkingTime: dayWorkingTime, taskFields: taskFields },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskName', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'startDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'predecessor' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'progress' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo explains how the Gantt Chart schedules project in UTC timezone.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "For example, in this demo, the timezone of Gantt is set to UTC, and the task named ",
                React.createElement("code", null, "Plan timeline"),
                " has start time as ",
                React.createElement("code", null, "08:00 am"),
                " but converted based on UTC and rendered at ",
                React.createElement("code", null, "2.30 am")),
            React.createElement("p", null,
                "When a user sets any timezone, dates are converted based on the value set to ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#timezone" }, "timezone"),
                " property of Gantt control."))));
};
exports.default = Timezone;
