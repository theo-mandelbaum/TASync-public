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
exports.FrozenAPI = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var FrozenAPI = /** @class */ (function (_super) {
    __extends(FrozenAPI, _super);
    function FrozenAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refresh = true;
        _this.filterSettings = { type: 'Excel' };
        _this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.customeridRule = { required: true, minLength: 5 };
        _this.orderidRules = { required: true, number: true };
        _this.freightRules = { required: true, min: 0 };
        _this.columnNames = [
            { id: 'OrderID', name: 'Order ID' },
            { id: 'Freight', name: 'Freight' },
            { id: 'CustomerID', name: 'Customer ID' },
            { id: 'OrderDate', name: 'Order Date' },
            { id: 'ShipName', name: 'Ship Name' },
            { id: 'ShipAddress', name: 'Ship Address' },
            { id: 'ShipCity', name: 'Ship City' },
            { id: 'ShipCountry', name: 'Ship Country' }
        ];
        _this.directions = [
            { id: 'Left', name: 'Left' },
            { id: 'Right', name: 'Right' },
            { id: 'Center', name: 'Center' },
            { id: 'Fixed', name: 'Fixed' },
        ];
        _this.fields = { text: 'name', value: 'id' };
        _this.confirmButton = [{
                click: function () {
                    _this.alertDialogInstance.hide();
                },
                buttonModel: { content: 'OK', isPrimary: true }
            }];
        return _this;
    }
    FrozenAPI.prototype.directionChange = function (e) {
        if (this.refresh) {
            var columnName = this.columnDropDown.value;
            var mvblColumns = this.grid.getMovableColumns();
            if (mvblColumns.length === 1 && columnName === mvblColumns[0].field && e.value !== mvblColumns[0].freeze) {
                this.alertDialogInstance.show();
                this.refresh = false;
                this.freezeDropDown.value = "Center";
                this.freezeDropDown.refresh();
            }
            else {
                this.grid.getColumnByField(columnName).freeze = e.value === 'Center' ? undefined : e.value;
                this.grid.refreshColumns();
            }
        }
        this.refresh = true;
    };
    ;
    FrozenAPI.prototype.columnChange = function (e) {
        var columnName = e.value;
        var column = this.grid.getColumnByField(columnName);
        var value = column.freeze === undefined ? 'Center' : column.freeze;
        this.refresh = this.freezeDropDown.value === value;
        this.freezeDropDown.value = value;
    };
    ;
    FrozenAPI.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { style: { paddingBottom: '5px' } },
                    React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                        React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                            React.createElement("span", null, "Column Name")),
                        React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "column", dataSource: this.columnNames, change: this.columnChange.bind(this), value: "ShipCountry", fields: this.fields, ref: function (colDropDown) { _this.columnDropDown = colDropDown; } }))),
                    React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                        React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                            React.createElement("span", null, "Freeze Direction")),
                        React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "freezedirection", dataSource: this.directions, value: "Left", change: this.directionChange.bind(this), fields: this.fields, ref: function (freezeDropDown) { _this.freezeDropDown = freezeDropDown; } })))),
                React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { return _this.grid = g; }, dataSource: data_1.orderDetails, height: '350', frozenRows: 2, enableHover: false, allowSorting: true, editSettings: this.editSettings, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbar },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', freeze: 'Left', validationRules: this.orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '125', format: 'C2', textAlign: 'Right', validationRules: this.freightRules, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '130', freeze: 'Right', validationRules: this.customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '150', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '300' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipAddress', headerText: 'Ship Address', width: '270', freeze: 'Fixed' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '250' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '250', editType: 'dropdownedit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Sort, ej2_react_grids_1.Freeze, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Frozen', visible: false, animationSettings: { effect: 'None' }, width: '300px', content: 'Atleast one Column should be in movable', ref: function (alertdialog) { _this.alertDialogInstance = alertdialog; }, target: '.control-section', buttons: this.confirmButton, showCloseIcon: false }),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the frozen rows and columns feature of the Grid. Scroll the movable content horizontally to view the frozen and fixed columns, vertically to view the frozen rows with the content.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This feature enables users to freeze certain columns at specific positions. This can be achieved by setting the",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#freeze" }, "freeze")),
                    "property of column settings. The various modes are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Left"),
                        " : Freezes the column at the left."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Right"),
                        " : Freezes the column at the right."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Center"),
                        " : Freezes the column at the center."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Fixed"),
                        " : Freezes the column at a fixed position. This will ensure its visibility while scrolling horizontally.")),
                React.createElement("p", null,
                    " In this demo sample, the ",
                    React.createElement("b", null, "Order ID"),
                    " column is frozen at the left, the ",
                    React.createElement("b", null, "Customer ID"),
                    " column is frozen at the right and the ",
                    React.createElement("b", null, "Ship Address"),
                    " column at a fixed position using ",
                    React.createElement("code", null, "column->freeze"),
                    " property."),
                React.createElement("p", null,
                    "More information on the frozen rows and columns can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/frozen" }, " documentation section"),
                    "."))));
    };
    return FrozenAPI;
}(sample_base_1.SampleBase));
exports.FrozenAPI = FrozenAPI;
