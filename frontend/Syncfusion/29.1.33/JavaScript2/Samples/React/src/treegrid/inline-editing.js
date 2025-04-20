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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var SAMPLE_CSS = "\n.fluent2,\n.fluent2-dark,\n.fluent2-highcontrast {\n    #columnddl .e-input-group {\n        width: 140px !important;\n    }\n}";
var Editing = /** @class */ (function (_super) {
    __extends(Editing, _super);
    function Editing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Add', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Cell', newRowPosition: 'Below' };
        _this.validationRule = { required: true };
        _this.validationRule1 = { date: ['M/d/yyyy', 'Please enter a valid date'] };
        _this.validationRule2 = { required: true, number: true };
        _this.editparams2 = { params: { format: 'n' } };
        _this.editparams3 = { params: { format: 'M/d/yyyy' } };
        _this.pageSettings = { pageCount: 5 };
        _this.editing = [
            { id: 'CellEditing', name: 'Cell Editing' }, { id: 'RowEditing', name: 'Row Editing' }
        ];
        return _this;
    }
    Editing.prototype.change = function (args) {
        if (args.value === 'CellEditing') {
            this.treegridObj.editSettings.mode = 'Cell';
            this.treegridObj.toolbar = ['Add', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'];
        }
        else {
            this.treegridObj.editSettings.mode = 'Row';
            this.treegridObj.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'];
        }
    };
    Editing.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', allowPaging: true, selectedRowIndex: 2, editSettings: this.editSettings, pageSettings: this.pageSettings, toolbar: this.toolbarOptions, ref: function (treegrid) { return _this.treegridObj = treegrid; } },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '90', textAlign: 'Right', validationRules: this.validationRule2, isPrimaryKey: true }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '220', validationRules: this.validationRule }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '160', textAlign: 'Right', editType: 'datepickeredit', format: 'yMd', edit: this.editparams3, validationRules: this.validationRule1 }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '140', editType: 'numericedit', textAlign: 'Right', validationRules: this.validationRule2, edit: this.editparams2 })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.RowDD] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Edit Mode ")),
                                    React.createElement("td", { style: { width: '70%' } },
                                        React.createElement("div", { id: 'columnddl' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "147px", id: "selmode", change: this.change.bind(this), dataSource: this.editing, fields: { text: 'name', value: 'id' }, value: "CellEditing" }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates CRUD operations in Tree Grid. You can perform CRUD operations as follows,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        " -  To add new record, click Add toolbar button "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - To edit record, double click a row or click toolbar Edit button after selected a row "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete record, click toolbar Delete button after selected a row "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update"),
                        ",",
                        React.createElement("code", null, "Cancel"),
                        " - You can save or discard changes by click toolbar Update and cancel button respectively"),
                    React.createElement("li", null,
                        React.createElement("code", null, "Indent"),
                        " - Indents the record to one level of hierarchy."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Outdent"),
                        " - Outdent the record to one level of hierarchy."))),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The Tree Grid supports CRUD operations. This CRUD operations can be configured in Tree Grid using editSettings. Also, it has different modes to manipulate the datasource."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Dialog"))),
                React.createElement("p", null, "In this demo, Row mode is enabled for editing by default. You can start editing any row by double clicking on it or clicking on toolbar\u2019s Edit button, then the currently selected row will be changed to edited state. You can change the row values and save edited data to the datasource."),
                React.createElement("p", null,
                    "We have also provided an option in property panel to select the edit mode as Cell or Row to change ",
                    React.createElement("code", null, "mode"),
                    " of editing."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                    React.createElement("code", null, "Edit"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "To use indent and outdent feature, we need to inject",
                    React.createElement("code", null, "RowDD"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the selection configuration can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/editing/row-editing" }, "documentation section"),
                    "."))));
    };
    return Editing;
}(sample_base_1.SampleBase));
exports.Editing = Editing;
