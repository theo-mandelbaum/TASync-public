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
exports.Batch = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Batch = /** @class */ (function (_super) {
    __extends(Batch, _super);
    function Batch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch', newRowPosition: 'Below' };
        _this.validationRule = { required: true };
        _this.validationRule1 = { date: ['M/d/yyyy', 'Please enter a valid date'] };
        _this.validationRule2 = { required: true, number: true };
        _this.editparams2 = { params: { format: 'n' } };
        _this.editparams3 = { params: { format: 'M/d/yyyy' } };
        return _this;
    }
    Batch.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', editSettings: this.editSettings, toolbar: this.toolbarOptions, ref: function (treegrid) { return _this.treegridObj = treegrid; } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '90', textAlign: 'Right', validationRules: this.validationRule, isPrimaryKey: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '220', validationRules: this.validationRule }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '160', textAlign: 'Right', editType: 'datepickeredit', format: 'yMd', edit: this.editparams3, validationRules: this.validationRule1 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '140', editType: 'numericedit', textAlign: 'Right', validationRules: this.validationRule2, edit: this.editparams2 })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates CRUD operations in Tree Grid. You can perform CRUD operations as follows,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        " -  To add new record, click Add toolbar button "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - To edit record, double click a cell "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete record, click toolbar Delete button after selected a row "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update"),
                        ",",
                        React.createElement("code", null, "Cancel"),
                        " - You can save or discard changes by click toolbar Update and cancel button respectively"))),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The Tree Grid supports CRUD operations. This CRUD operations can be configured in Tree Grid using editSettings. Also, it has different modes to manipulate the datasource."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Dialog")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Batch"))),
                React.createElement("p", null,
                    "In this demo, Batch mode is enabled for editing by defining ",
                    React.createElement("code", null, "editSettings.mode"),
                    " as ",
                    React.createElement("code", null, "Batch"),
                    " with",
                    React.createElement("code", null, "editSettings.newRowPosition"),
                    " as ",
                    React.createElement("code", null, "Below"),
                    ". You can start editing by double clicking a cell and can change the cell value. The edited cell will be highlighted while navigating to a new cell, so that you know which cells had been edited. You can bulk save the edited data to the datasource by click on the toolbar's update button."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                    React.createElement("code", null, "Edit"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the selection configuration can be found in this ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/edit/#batch" }, "documentation section."))))));
    };
    return Batch;
}(sample_base_1.SampleBase));
exports.Batch = Batch;
