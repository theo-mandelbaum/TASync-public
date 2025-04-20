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
exports.TaskMode = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TaskMode = /** @class */ (function (_super) {
    __extends(TaskMode, _super);
    function TaskMode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
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
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.splitterSettings = {
            position: "35%"
        };
        _this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        _this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        _this.projectStartDate = new Date('02/20/2024');
        _this.projectEndDate = new Date('03/30/2024');
        return _this;
    }
    TaskMode.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TaskMode', dataSource: data_1.taskModeData, treeColumnIndex: 1, allowSelection: true, highlightWeekends: true, toolbar: this.toolbar, editSettings: this.editSettings, splitterSettings: this.splitterSettings, height: '450px', taskMode: 'Custom', taskFields: this.taskFields, labelSettings: this.labelSettings, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
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
    return TaskMode;
}(sample_base_1.SampleBase));
exports.TaskMode = TaskMode;
