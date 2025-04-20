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
exports.Editing = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Editing = /** @class */ (function (_super) {
    __extends(Editing, _super);
    function Editing() {
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
            notes: 'info',
            resourceInfo: 'resources'
        };
        _this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        _this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        _this.splitterSettings = {
            position: "35%"
        };
        _this.projectStartDate = new Date('03/25/2024');
        _this.projectEndDate = new Date('07/28/2024');
        _this.gridLines = 'Both';
        _this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
        _this.timelineSettings = {
            topTier: {
                unit: 'Week',
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
            },
        };
        _this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        _this.eventMarkerDay1 = new Date('4/17/2024');
        _this.eventMarkerDay2 = new Date('5/3/2024');
        _this.eventMarkerDay3 = new Date('6/7/2024');
        _this.eventMarkerDay4 = new Date('7/16/2024');
        return _this;
    }
    Editing.prototype.customFn = function (args) {
        var endDate;
        var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
        if (args.element && args.value) {
            endDate = new Date(args.value);
            if (!this.startDate && gantt.editModule.dialogModule['beforeOpenArgs']) {
                this.startDate = gantt.editModule.dialogModule['beforeOpenArgs'].rowData['ganttProperties'].startDate;
                endDate = (gantt.editModule.dialogModule['beforeOpenArgs'].rowData['ganttProperties'].endDate);
            }
            this.startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
        }
        return this.startDate <= endDate;
    };
    Editing.prototype.actionbeing = function (args) {
        if (args.columnName === "EndDate" || args.requestType === "beforeOpenAddDialog" || args.requestType === "beforeOpenEditDialog") {
            this.startDate = args.rowData.ganttProperties.startDate;
        }
        if (args.requestType === "taskbarediting" && args.taskBarEditAction === "ChildDrag") {
            this.startDate = args.data.ganttProperties.startDate;
        }
    };
    Editing.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Editing', dataSource: data_1.editingData, dateFormat: 'MMM dd, y', treeColumnIndex: 1, allowSelection: true, showColumnMenu: false, highlightWeekends: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, timelineSettings: this.timelineSettings, labelSettings: this.labelSettings, splitterSettings: this.splitterSettings, height: '410px', editSettings: this.editSettings, gridLines: this.gridLines, toolbar: this.toolbar, resourceFields: this.resourceFields, resources: data_1.editingResources, actionBegin: this.actionbeing },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip', validationRules: { required: true, minLength: [5, 'Task name should have a minimum length of 5 characters'], } }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', validationRules: { required: [this.customFn, 'Please enter a value greater than the start date.'] } }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', validationRules: { required: true } }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', validationRules: { required: true, min: 0, max: 100 } }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' })),
                    React.createElement(ej2_react_gantt_1.EditDialogFieldsDirective, null,
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'General', headerText: 'General' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Dependency' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Resources' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Notes' })),
                    React.createElement(ej2_react_gantt_1.EventMarkersDirective, null,
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay1, label: 'Project approval and kick-off' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay2, label: 'Foundation inspection' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay3, label: 'Site manager inspection' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay4, label: 'Property handover and sign-off' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.DayMarkers] })),
                React.createElement("div", { style: { float: 'right', margin: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Construction", target: '_blank' }, "https://en.wikipedia.org/"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample visualizes the various phases involved in constructing a residential house, from testing the soil to handing over the fully constructed property to the owner. This sample also demonstrates CRUD operations in Gantt chart. You can perform CRUD operations as follows,",
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        " - To add new task, click Add toolbar button"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit "),
                        "- To edit a task, double click a row or double click a taskbar or click toolbar Edit button after selected a row"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Indent"),
                        " - To indent a task, click toolbar indent button after selecting a row"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Outdent"),
                        " - To outdent a task, click toolbar outdent button after selecting a row"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete a task, click toolbar Delete button after selected a row"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update,Cancel"),
                        " - You can save or discard changes by click toolbar Update and Cancel button respectively"))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This CRUD operations can be configured in Gantt chart using ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#editsettings" }, "editSettings"),
                    " and",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#allowtaskbardraganddrop" }, "allowTaskbarEditing"),
                    ". Gantt chart has two modes to manipulate the datasource",
                    React.createElement("li", null,
                        React.createElement("code", null, "Auto")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Dialog")),
                    "In this demo, ",
                    React.createElement("code", null, "Auto"),
                    " mode is enabled for editing. On the TreeGrid side, you can start editing any row by double clicking on it or clicking on toolbar\u2019s Edit button, then the currently selected row will be changed to edited state. On the chart side, you can edit the tasks using edit dialog by double clicking on the taskbars and you can edit the dependency connector lines using drag and drop action with connector line points available on the either side of taskbar.",
                    React.createElement("br", null),
                    "In this sample ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#validationrules" }, "column.validation"),
                    " has been enabled for the columns. It uses the Form Validator control and the column validation property to define validation rules to display error messages for invalid value entries."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use editing feature, inject the",
                    React.createElement("code", null, "Edit"),
                    " module. To use a selection feature, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module."))));
    };
    return Editing;
}(sample_base_1.SampleBase));
exports.Editing = Editing;
