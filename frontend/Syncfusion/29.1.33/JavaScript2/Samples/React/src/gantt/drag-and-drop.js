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
exports.DragAndDrop = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var DragAndDrop = /** @class */ (function (_super) {
    __extends(DragAndDrop, _super);
    function DragAndDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.selectionSettings = {
            type: 'Multiple'
        };
        _this.splitterSettings = {
            columnIndex: 3
        };
        _this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        _this.projectStartDate = new Date('03/25/2024');
        _this.projectEndDate = new Date('07/06/2024');
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        return _this;
    }
    DragAndDrop.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'DragandDrop', dataSource: data_1.projectNewData, taskFields: this.taskFields, height: '410px', treeColumnIndex: 1, allowRowDragAndDrop: true, highlightWeekends: true, labelSettings: this.labelSettings, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, allowTaskbarDragAndDrop: true, splitterSettings: this.splitterSettings, editSettings: this.editSettings, selectionSettings: this.selectionSettings },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '80' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Dependency' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.RowDD, ej2_react_gantt_1.Selection] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Gantt component with the row drag and drop feature. You can rearrange the gantt rows by using drag icon in left side of gantt column. Here you can perform drag and drop the gantt rows in to required position.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Row drag and drop feature can be enabled by settting ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#allowrowdraganddrop" }, "allowRowDragAndDrop"),
                    " property as true. In this demo, taskbar drag and drop between rows can be enabled by setting ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#allowtaskbardraganddrop" }, "allowTaskbarDragAndDrop"),
                    " as true."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use row, drag and drop feature we need to inject ",
                    React.createElement("code", null, "RowDD"),
                    " and ",
                    React.createElement("code", null, "Edit"),
                    " modules."))));
    };
    return DragAndDrop;
}(sample_base_1.SampleBase));
exports.DragAndDrop = DragAndDrop;
