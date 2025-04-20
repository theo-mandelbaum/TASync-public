"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TaskMode = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        endDate: 'EndDate',
        dependency: 'Predecessor',
        child: 'Children',
        manual: 'isManual'
    };
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var splitterSettings = {
        position: "35%"
    };
    var editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    var toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
    var projectStartDate = new Date('02/20/2024');
    var projectEndDate = new Date('03/30/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TaskMode', dataSource: data_1.taskModeData, treeColumnIndex: 1, allowSelection: true, highlightWeekends: true, toolbar: toolbar, editSettings: editSettings, splitterSettings: splitterSettings, height: '450px', taskMode: 'Custom', taskFields: taskFields, labelSettings: labelSettings, projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', visible: false }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'isManual', headerText: 'Task Mode' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.DayMarkers] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The Gantt provides support for automatic and manual task scheduling modes. Scheduling mode of a task is used to indicate whether the start and end dates of a task will be automatically validated or not. Using the property ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#taskmode" }, "taskMode"),
                " we can able to change the scheduling mode of a task. The following are the enumeration values that can be set to the property ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#taskmode" }, "taskMode"),
                "."),
            React.createElement("ul", null,
                React.createElement("li", null, "Auto"),
                React.createElement("li", null, "Manual"),
                React.createElement("li", null, "Custom"))),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "When the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#taskmode" }, "taskMode"),
                " property is set as ",
                React.createElement("code", null, "Auto"),
                " scheduling mode, all the tasks in the project will be rendered as automatically scheduled tasks. Thus the start and end dates of the tasks in the project will be automatically validated."),
            React.createElement("p", null,
                "When the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#taskmode" }, "taskMode"),
                " property is set as ",
                React.createElement("code", null, "Manual"),
                " scheduling mode, all the tasks in the project will be rendered as manually scheduled tasks. Thus the dates of the tasks will not get validated automatically by the system."),
            React.createElement("p", null,
                "When the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#taskmode" }, "taskMode"),
                " property is set as ",
                React.createElement("code", null, "Custom"),
                ", the scheduling mode for each tasks will be mapped form the data source field. The property ",
                React.createElement("code", null, "manual"),
                " is used to map the scheduling mode field from the data source."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use editing feature, inject the ",
                React.createElement("code", null, "Edit"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Edit)"),
                " method. To use a selection, inject the ",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Selection)"),
                " method, and to use toolbar by injecting the ",
                React.createElement("code", null, "Toolbar"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Toolbar)"),
                " method. "))));
};
exports.default = TaskMode;
