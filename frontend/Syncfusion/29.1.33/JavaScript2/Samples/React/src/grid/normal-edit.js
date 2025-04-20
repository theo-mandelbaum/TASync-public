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
exports.NormalEdit = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var NormalEdit = /** @class */ (function (_super) {
    __extends(NormalEdit, _super);
    function NormalEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showAddNewRow: true, newRowPosition: 'Top' };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.customeridRule = { required: true, minLength: 5 };
        _this.freightRule = { required: true, min: 0 };
        _this.orderidRules = { required: true, number: true };
        _this.pageSettings = { pageCount: 5 };
        _this.format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
        _this.droplist = [
            { text: 'Top', value: 'Top' },
            { text: 'Bottom', value: 'Bottom' }
        ];
        return _this;
    }
    NormalEdit.prototype.actionBegin = function (args) {
        if (args.requestType === 'save') {
            if (this.gridInstance.pageSettings.currentPage !== 1 && this.gridInstance.editSettings.newRowPosition === 'Top') {
                args.index = (this.gridInstance.pageSettings.currentPage * this.gridInstance.pageSettings.pageSize) - this.gridInstance.pageSettings.pageSize;
            }
            else if (this.gridInstance.editSettings.newRowPosition === 'Bottom') {
                args.index = (this.gridInstance.pageSettings.currentPage * this.gridInstance.pageSettings.pageSize) - 1;
            }
        }
    };
    NormalEdit.prototype.ddChange = function () {
        this.gridInstance.editSettings.newRowPosition = this.dropDownInstance.value;
        this.gridInstance.refresh();
    };
    NormalEdit.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDataSource, ref: function (grid) { return _this.gridInstance = grid; }, allowSorting: true, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbarOptions, allowPaging: true, editSettings: this.editSettings, pageSettings: this.pageSettings, actionBegin: this.actionBegin.bind(this) },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '140', textAlign: 'Right', validationRules: this.orderidRules, isPrimaryKey: true }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.customeridRule }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '140', format: 'C2', textAlign: 'Right', validationRules: this.freightRule, editType: 'numericedit' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit', format: this.format, width: '160' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: this.editparams })),
                        React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, "Add New Row Position")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "newRowPosition", width: "120px", index: 0, change: this.ddChange.bind(this), ref: function (d) { return _this.dropDownInstance = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } })))))))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "In this demo, you can edit the currently selected record by changing the state of the corresponding record to edit. You can carry out the following CRUD operations:"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Add"),
                            " -  To add a new record, click the add toolbar button. "),
                        React.createElement("li", null,
                            React.createElement("code", null, "Edit"),
                            " - To edit record, double click a cell. "),
                        React.createElement("li", null,
                            React.createElement("code", null, "Delete"),
                            " - To delete a record, click the toolbar delete button after selecting a row. "),
                        React.createElement("li", null,
                            React.createElement("code", null, "Update"),
                            " and ",
                            React.createElement("code", null, "Cancel"),
                            " - Save or discard changes by clicking the toolbar update and cancel button respectively.")),
                    React.createElement("p", null,
                        "By default, a new row will be added at the top of the grid. You can change it by setting ",
                        React.createElement("code", null, "editSettings.newRowPosition"),
                        " as ",
                        React.createElement("code", null, "Bottom"))),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        " Grid supports CRUD operations. This CRUD operations can be configured using",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/" }, "editSettings")),
                        ". It also has the following modes to manipulate the datasource."),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Normal")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Dialog")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Batch"))),
                    React.createElement("p", null,
                        "In the normal edit mode, when you start editing the currently selected record is changed to edit state. You can edit any row by double clicking it or clicking the toolbar\u2019s",
                        React.createElement("code", null, "Edit"),
                        " button. You can change the row values and save edited data to the data source."),
                    React.createElement("p", null,
                        "In order to add a new record easily, the grid content always displays a blank \"add new row\". You can enable this feature by setting the ",
                        React.createElement("code", null, "showAddNewRow"),
                        " property of ",
                        React.createElement("code", null, "editSettings"),
                        " to true."),
                    React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                    React.createElement("p", null,
                        "Grid features are separated into feature-wise modules. To use the editing feature, inject",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/edit/" }, "Edit")),
                        " module into the ",
                        React.createElement("code", null, "services"),
                        "."),
                    React.createElement("p", null,
                        "More information on the inline editing can be found in this",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/editing/in-line-editing" }, "documentation section"),
                        ".")))));
    };
    return NormalEdit;
}(sample_base_1.SampleBase));
exports.NormalEdit = NormalEdit;
