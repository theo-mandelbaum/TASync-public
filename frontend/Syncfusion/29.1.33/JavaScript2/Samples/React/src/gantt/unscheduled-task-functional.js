"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./unscheduled.css");
var UnscheduledTask = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var taskFields = {
        id: 'TaskId',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
    };
    var editSettings = {
        allowAdding: true,
        allowEditing: true,
    };
    var toolbar = [{ text: 'Insert task', tooltipText: 'Insert task at top', id: 'toolbarAdd', prefixIcon: 'e-add-icon tb-icons' }];
    var labelSettings = {
        leftLabel: 'TaskName',
        rightLabel: 'TaskType'
    };
    var splitterSettings = {
        columnIndex: 4
    };
    var columns = [
        { field: 'TaskId', width: 90 },
        { field: 'TaskName', width: 80 },
        { field: 'StartDate', width: 120 },
        { field: 'EndDate', width: 120 },
        { field: 'Duration', width: 90 }
    ];
    var projectStartDate = new Date('01/01/2024');
    var projectEndDate = new Date('01/20/2024');
    var toolbarClickEvent = function () {
        var data = {
            Duration: null,
            StartDate: null,
            EndDate: null,
            TaskType: ''
        };
        ganttInstance.current.addRecord(data);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Unscheduled', ref: ganttInstance, dataSource: data_1.unscheduledData, taskFields: taskFields, height: '410px', editSettings: editSettings, allowSelection: true, toolbar: toolbar, labelSettings: labelSettings, allowUnscheduledTasks: true, toolbarClick: toolbarClickEvent.bind(_this), splitterSettings: splitterSettings, columns: columns, projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Edit, ej2_react_gantt_1.Selection] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the support for displaying unscheduled tasks in Gantt and adding empty rows using the custom toolbar button.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Unscheduled tasks are tasks in a project that are not scheduled with proper dates or duration at the commencement of the project. These tasks can be scheduled properly at any time during project implementation based on factors such as resource availability, dependent tasks, and more. This example shows how to display the unscheduled tasks in Gantt by enabling the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowunscheduledtasks" }, "allowUnscheuldedTasks"),
                " property. This also shows how to add an empty row in Gantt by using a custom toolbar button click action. By using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#toolbarclick" }, "toolbarClick"),
                " event and ",
                React.createElement("code", null, "addRecord"),
                " method, an empty row can be added at the top of the rows with undefined task details."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a toolbar and add support, inject the ",
                React.createElement("code", null, "Toolbar"),
                " and ",
                React.createElement("code", null, "Edit"),
                " module. To use a selection, inject the ",
                React.createElement("code", null, "Selection"),
                " module."))));
};
exports.default = UnscheduledTask;
