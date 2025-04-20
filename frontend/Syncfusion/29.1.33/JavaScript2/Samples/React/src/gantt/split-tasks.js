"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitTasks = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SplitTasks = /** @class */ (function (_super) {
    __extends(SplitTasks, _super);
    function SplitTasks() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
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
        _this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        _this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        _this.splitterSettings = {
            position: "35%"
        };
        _this.labelSettings = {
            leftLabel: 'TaskName',
            taskLabel: '${Progress}%'
        };
        _this.projectStartDate = new Date('01/30/2024');
        _this.projectEndDate = new Date('03/04/2024');
        return _this;
    }
    SplitTasks.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'SplitTasks', dataSource: data_1.splitTasksData, treeColumnIndex: 1, labelSettings: this.labelSettings, allowSelection: true, highlightWeekends: true, enableContextMenu: true, toolbar: this.toolbar, editSettings: this.editSettings, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, splitterSettings: this.splitterSettings, height: '450px' },
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
    return SplitTasks;
}(sample_base_1.SampleBase));
exports.SplitTasks = SplitTasks;
