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
exports.ResourceMultiTaskbar = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./resource-multi-taskbar.css");
var ResourceMultiTaskbar = /** @class */ (function (_super) {
    __extends(ResourceMultiTaskbar, _super);
    function ResourceMultiTaskbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            resourceInfo: 'resources',
            work: 'work',
            expandState: 'isExpand',
            child: 'subtasks'
        };
        _this.taskType = 'FixedWork';
        _this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName',
            unit: 'resourceUnit',
            group: 'resourceGroup'
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
            columnIndex: 2
        };
        _this.projectStartDate = new Date('03/28/2024');
        _this.projectEndDate = new Date('05/18/2024');
        _this.labelSettings = {
            taskLabel: 'TaskName'
        };
        return _this;
    }
    ResourceMultiTaskbar.prototype.dragDropChange = function (args) {
        if (args.checked) {
            this.ganttInstance.allowTaskbarDragAndDrop = true;
        }
        else {
            this.ganttInstance.allowTaskbarDragAndDrop = false;
        }
    };
    ResourceMultiTaskbar.prototype.overlapChange = function (args) {
        if (args.checked) {
            this.ganttInstance.allowTaskbarOverlap = true;
        }
        else {
            this.ganttInstance.allowTaskbarOverlap = false;
        }
    };
    ResourceMultiTaskbar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-12' },
                    React.createElement("div", { style: { display: 'flex' } },
                        React.createElement("div", { style: { display: 'flex' } },
                            React.createElement("label", { htmlFor: "checked", id: "ResourceMultiTaskbarallow", style: { fontSize: '15px', margin: '0px 5px 0px 0px' } }, " Allow Taskbar Drag And Drop "),
                            React.createElement("div", null,
                                React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "checked", change: this.dragDropChange.bind(this) }))),
                        React.createElement("div", { style: { display: 'flex' } },
                            React.createElement("label", { htmlFor: "unchecked", id: "ResourceMultiTaskbarallow", style: { fontSize: '15px', margin: '0px 5px 0px 5px' } }, " Allow Taskbar Overlap "),
                            React.createElement("div", null,
                                React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "unchecked", checked: true, change: this.overlapChange.bind(this) })))),
                    React.createElement("div", null,
                        React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ResourceMultiTaskbar', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.multiTaskbarData, treeColumnIndex: 1, viewType: 'ResourceView', enableMultiTaskbar: true, allowSelection: true, allowResizing: true, highlightWeekends: true, toolbar: this.toolbar, editSettings: this.editSettings, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, resourceFields: this.resourceFields, taskFields: this.taskFields, taskType: this.taskType, labelSettings: this.labelSettings, splitterSettings: this.splitterSettings, height: '410px', resources: data_1.resources, showOverAllocation: true },
                            React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', visible: false }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'work', headerText: 'Work' }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resourceGroup', headerText: 'Group' }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                                React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' })),
                            React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Edit, ej2_react_gantt_1.Resize, ej2_react_gantt_1.RowDD] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to visualize a list of tasks assigned to a resource within a collapsed parent row. It also allows modifying task scheduling actions such as dragging, left resizing, and progress editing while keeping the parent row collapsed. This functionality can be enabled by setting the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#enablemultitaskbar" }, "enableMultiTaskbar"),
                    " property to ",
                    React.createElement("code", null, "true"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example demonstrates how to enable taskbar drag-and-drop functionality for reassigning tasks between resources vertically by setting the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowtaskbardraganddrop" }, "allowTaskbarDragAndDrop"),
                    " property to ",
                    React.createElement("code", null, "true"),
                    ". Additionally, you can prevent taskbar overlap within a resource's tasks by disabling the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/javascript/documentation/api/gantt#allowtaskbaroverlap" }, "allowTaskbarOverlap"),
                    " property."),
                React.createElement("p", null,
                    "In this example, resources are assigned to tasks using predefined resource IDs, allowing efficient task distribution. The resource details are displayed using the ",
                    React.createElement("code", null, "labelSetting"),
                    " property. You can also perform CRUD operations on resource allocation using toolbar actions, considering availability and task complexity."),
                React.createElement("p", null,
                    "The resources and their assigned tasks are grouped into categories. Resources can be mapped using the following ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#resourcefields" }, "resourceFields:"),
                    "."),
                React.createElement("p", null,
                    React.createElement("code", null, "ID"),
                    ": Maps the resource ID."),
                React.createElement("p", null,
                    React.createElement("code", null, "Name"),
                    ": Maps the resource name."),
                React.createElement("p", null,
                    React.createElement("code", null, "Unit"),
                    ": Map the resource unit."),
                React.createElement("p", null,
                    React.createElement("code", null, "Group"),
                    ": Maps the resource group."),
                React.createElement("p", null,
                    React.createElement("code", null, "Injecting module:")),
                React.createElement("p", null,
                    "The Gantt control features are segregated into individual feature-wise modules. To use a selection, inject the",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Selection)"),
                    " method. To use markers, inject the",
                    React.createElement("code", null, "DayMarkers"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                    " method. To edit,  inject the ",
                    React.createElement("code", null, "Toolbar"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Toolbar)"),
                    " method and ",
                    React.createElement("code", null, "Edit"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Edit)"),
                    " method."))));
    };
    return ResourceMultiTaskbar;
}(sample_base_1.SampleBase));
exports.ResourceMultiTaskbar = ResourceMultiTaskbar;
