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
exports.LockRow = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n.disableRow .e-rowcell,\n.material .disableRow .e-rowcell{\n    color: rgba(0, 0, 0, .38) !important;\n  }\n.disableRow .e-rowcell,\n  body:not([class]) #_gridcontrol .disableRow .e-rowcell,\n  .ej2-new #_gridcontrol .disableRow .e-rowcell {\n   color: rgba(0, 0, 0, .38) !important;\n  }";
{ /* custom code start */ }
var SAMPLE1_CSS = "\n.disableRow .e-rowcell,\n.material-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.material3 .disableRow .e-rowcell{\n  color: rgba(0, 0, 0, .38) !important;\n}\n.disableRow .e-rowcell,\n.material3-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.fabric .disableRow .e-rowcell{\n  color: #c8c8c8 !important;\n}\n.disableRow .e-rowcell,\n.fabric-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}    \n.disableRow .e-rowcell,\n.bootstrap .disableRow .e-rowcell{\n  color: rgba(0, 0, 0, .35) !important;\n}\n.disableRow .e-rowcell,\n.bootstrap-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.bootstrap4 .disableRow .e-rowcell{\n  color: rgba(0, 0, 0, .35) !important;\n}\n.disableRow .e-rowcell,\n.bootstrap5 .disableRow .e-rowcell{\n  color: rgba(0, 0, 0, .35) !important;\n}\n.disableRow .e-rowcell,\n.bootstrap5.3 .disableRow .e-rowcell{\n  color: rgba(0, 0, 0, .35) !important;\n}\n.disableRow .e-rowcell,\n.bootstrap5_3 .disableRow .e-rowcell{\n  color: rgba(0, 0, 0, .35) !important;\n}\n.disableRow .e-rowcell,\n.fluent .disableRow .e-rowcell{\n  color: rgba(0, 0, 0, .35) !important;\n}\n.disableRow .e-rowcell,\n.fluent2 .disableRow .e-rowcell{\n  color: rgba(0, 0, 0, .35) !important;\n}\n.disableRow .e-rowcell,\n.bootstrap5-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.bootstrap5.3-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.bootstrap5_3-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.fluent-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n .fluent2-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.fluent2-highcontrast .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.highcontrast .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.tailwind .disableRow .e-rowcell,\n.tailwind3 .disableRow .e-rowcell {\n  color: #757575 !important;\n}\n.disableRow .e-rowcell,\n.tailwind-dark .disableRow .e-rowcell,\n.tailwind3-dark .disableRow .e-rowcell{\n  color: #757575 !important;\n}\n.e-multiselect {\n  padding-left : 0px !important;\n  padding-top: 0px !important;\n}\n  @media (min-width: 990px) and (max-width: 1300px){\n  .lockrow-propertypanel {\n  padding-left:5px;\n  }\n  }\n";
{ /* custom code end */ }
var LockRow = /** @class */ (function (_super) {
    __extends(LockRow, _super);
    function LockRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Edit', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, mode: 'Row', newRowPosition: 'Child' };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.validationRule = { required: true, number: true };
        _this.validationRule1 = { required: true };
        _this.validationRule2 = { date: ['M/d/yyyy', 'Please enter a valid date'] };
        _this.validationRule3 = { number: true, min: 0 };
        _this.editparams2 = { params: { format: 'n' } };
        _this.editparams3 = { params: { format: 'M/d/yyyy' } };
        _this.pageSettings = { pageSize: 2, pageSizeMode: 'Root' };
        _this.rowValues = [2, 6];
        return _this;
    }
    LockRow.prototype.rowDataBound = function (args) {
        var key = 'taskID';
        if (this.multiselectObj.value.indexOf(args.data[key]) !== -1) {
            (0, ej2_base_1.addClass)([args.row], 'disableRow');
        }
        else {
            (0, ej2_base_1.removeClass)([args.row], 'disableRow');
        }
    };
    LockRow.prototype.beginEdit = function (args) {
        var key = 'taskID';
        if (this.multiselectObj.value.indexOf(args.rowData[key]) !== -1) {
            args.cancel = true;
        }
    };
    LockRow.prototype.select = function () {
        this.treegridObj.refresh();
    };
    LockRow.prototype.removed = function () {
        this.treegridObj.refresh();
    };
    LockRow.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane', role: "control", "aria-label": "Tree Grid Control" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("style", null, SAMPLE1_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', allowPaging: true, editSettings: this.editSettings, pageSettings: this.pageSettings, toolbar: this.toolbarOptions, enableHover: false, rowDataBound: this.rowDataBound.bind(this), ref: function (treegrid) { return _this.treegridObj = treegrid; }, beginEdit: this.beginEdit.bind(this) },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '100', textAlign: 'Right', validationRules: this.validationRule, isPrimaryKey: true }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '220', validationRules: this.validationRule1 }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '130', textAlign: 'Right', editType: 'datepickeredit', format: 'yMd', edit: this.editparams3, validationRules: this.validationRule2 }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '140', editType: 'numericedit', textAlign: 'Right', validationRules: this.validationRule3, edit: this.editparams2 })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar] }))),
                React.createElement("div", { className: 'col-md-3 property-section lockrow-propertypanel' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties', "aria-label": "Property Pane" },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: '10px' } }, " Disable Rows ")),
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { width: "150px", id: "lockrows", mode: "CheckBox", value: this.rowValues, dataSource: data_1.lockRowDropDownData, showDropDownIcon: true, popupHeight: '350px', select: this.select.bind(this), removed: this.removed.bind(this), ref: function (multiselect) { return _this.multiselectObj = multiselect; }, "aria-label": "Select Rows to Disable" },
                                                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This samples demonstrates the way of preventing editing for certain row and disable the locked rows to differentiate edit and non-editable rows in Tree Grid.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Tree Grid supports CRUD operations. This CRUD operations can be configured in Tree Grid using ",
                    React.createElement("code", null, "editSettings"),
                    ". Also, it has different modes to manipulate the datasource."),
                React.createElement("p", null, " The available modes are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row ")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Dialog"))),
                React.createElement("p", null,
                    "In this sample, we have provided an option in property panel to prevent editing for certain rows. Using ",
                    React.createElement("code", null, "beginEdit"),
                    "event of Tree Grid, we prevent the editing for selected Task ID row in the dropdown and disable the corresponding row using",
                    React.createElement("code", null, "rowDataBound"),
                    " event of Tree Grid."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                    React.createElement("code", null, "Edit"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "More information on the selection configuration can be found in this documentation section."))));
    };
    return LockRow;
}(sample_base_1.SampleBase));
exports.LockRow = LockRow;
