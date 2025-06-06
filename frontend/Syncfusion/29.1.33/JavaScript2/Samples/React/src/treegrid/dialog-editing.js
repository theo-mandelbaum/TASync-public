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
exports.Dialog = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
{ /* custom code start */ }
var editDialog_height = "\n  #_gridcontrol_dialogEdit_wrapper.e-dialog.e-edit-dialog {\n    max-height: 589px !important;\n  } ";
{ /* custom code end */ }
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.validationRule = { required: true };
        _this.validationRule1 = { date: ['M/d/yyyy', 'Please enter a valid date'] };
        _this.editparams3 = { params: { format: 'M/d/yyyy', } };
        _this.validationRule2 = { required: true, number: true };
        _this.editparams2 = { params: { format: 'n' } };
        _this.pageSettings = { pageCount: 8 };
        return _this;
    }
    Dialog.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, editDialog_height),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', allowPaging: true, editSettings: this.editSettings, pageSettings: this.pageSettings, toolbar: this.toolbarOptions },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right', validationRules: this.validationRule2, isPrimaryKey: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '150', validationRules: this.validationRule }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '110', textAlign: 'Right', editType: 'datepickeredit', format: 'yMd', edit: this.editparams3, validationRules: this.validationRule1 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '130', textAlign: 'Right', editType: 'datepickeredit', format: 'yMd' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', editType: 'numericedit', textAlign: 'Right', validationRules: this.validationRule2, edit: this.editparams2 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right', editType: 'dropdownedit', edit: this.editparams })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " This sample demonstrates Dialog Editing ")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, Dialog mode is enabled for editing by defining ",
                    React.createElement("code", null, "editSettings.mode"),
                    " as dialog. You can start editing by double clicking a row or clicking on toolbar's Edit button, then the currently selected row will be shown on a dialog and you can change the row values and save edited data to the datasource."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                    React.createElement("code", null, "Edit"),
                    "module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the selection configuration can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/editing/dialog-editing" }, "documentation section"),
                    "."))));
    };
    return Dialog;
}(sample_base_1.SampleBase));
exports.Dialog = Dialog;
