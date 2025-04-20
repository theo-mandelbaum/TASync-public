"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Critical = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    var toolbar = ['Add', 'Edit', 'Delete', 'CriticalPath'];
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('07/06/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Critical', dataSource: data_1.projectNewData, treeColumnIndex: 1, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate, enableCriticalPath: true, editSettings: editSettings, toolbar: toolbar },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.CriticalPath, ej2_react_gantt_1.Edit] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the rendering of critical path to the Gantt control.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render a Gantt chart with critical path. The default timeline view week-day mode is applied to Gantt chart. The dependency lines are enabled in this example to represent the execution order or the hierarchy between the phases."),
            React.createElement("p", null, "The critical path is a series of tasks (or sometimes only a single task) that controls the calculated finish date of the project. If a task in a critical path is delayed, then the entire project will be delayed."),
            React.createElement("p", null,
                "Gantt control features are segregated into individual feature-wise modules. To use a critical path, inject the",
                React.createElement("code", null, "CriticalPath"),
                " module."),
            React.createElement("p", null,
                "More information on the Critical Path feature can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/gantt/critical-path/" }, "documentation section"),
                "."))));
};
exports.default = Critical;
