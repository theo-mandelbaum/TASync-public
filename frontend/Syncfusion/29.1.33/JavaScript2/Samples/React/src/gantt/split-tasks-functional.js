"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SplitTasks = function () {
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
        child: 'subtasks',
        segments: 'Segments'
    };
    var editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    var toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
    var splitterSettings = {
        position: "35%"
    };
    var labelSettings = {
        leftLabel: 'TaskName',
        taskLabel: '${Progress}%'
    };
    var projectStartDate = new Date('01/30/2024');
    var projectEndDate = new Date('03/04/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'SplitTasks', dataSource: data_1.splitTasksData, treeColumnIndex: 1, labelSettings: labelSettings, allowSelection: true, highlightWeekends: true, enableContextMenu: true, toolbar: toolbar, editSettings: editSettings, projectStartDate: projectStartDate, projectEndDate: projectEndDate, taskFields: taskFields, splitterSettings: splitterSettings, height: '450px' },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Edit, ej2_react_gantt_1.ContextMenu] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the split tasks support in the Gantt Chart. This support allows an interruption in the task due to circumstances such as the occurrence of an unplanned event or reprioritization of already planned events. Sometimes a task may be interrupted due to unexpected situations. In such situtations, the pending work can be split into segments and the work can be resumed at a different date.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The split tasks can be called the segments of a task. A task can be split into any number of segments with a minimum of one time unit cell. Segments can be defined in the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/taskFieldsModel/#segments" }, "taskFields.segments"),
                " property. Segments can be created or merged by two ways: Using Edit Dialog and Context Menu."),
            React.createElement("p", null, "A task must have a duration of minimum two time unit cells in order to be split. Similarly, milestone tasks or parent tasks cannot be split into segments."))));
};
exports.default = SplitTasks;
