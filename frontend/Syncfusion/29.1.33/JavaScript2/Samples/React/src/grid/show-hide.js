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
exports.ShowHide = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ShowHide = /** @class */ (function (_super) {
    __extends(ShowHide, _super);
    function ShowHide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        _this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.customeridRule = { required: true, minLength: 5 };
        _this.orderidRules = { required: true, number: true };
        _this.freightRules = { required: true, min: 0 };
        _this.flag = false;
        return _this;
    }
    ShowHide.prototype.click = function (e) {
        if (!this.flag) {
            return;
        }
        var element = e.target;
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        this.flag = false;
        var hidden = element.classList.contains('e-ghidden');
        var classFn = hidden ? ej2_base_1.removeClass : ej2_base_1.addClass;
        var visibleColumns = Array.from(this.ToolbarInstance.element.getElementsByClassName('e-tbar-btn-text'))
            .filter(function (item) { return !(item.classList.contains('e-ghidden')); });
        var isLastVisibleColumn = visibleColumns.length === 1 && visibleColumns[0].parentElement === element.parentElement;
        if (hidden) {
            classFn([element], 'e-ghidden');
            this.gridInstance.showColumns(element.innerHTML);
        }
        else {
            if (isLastVisibleColumn) {
                alert("At least one column should be visible.");
                this.flag = true;
                return;
            }
            classFn([element], 'e-ghidden');
            this.gridInstance.hideColumns(element.innerHTML);
        }
        this.flag = true;
    };
    ShowHide.prototype.dataBound = function () {
        this.flag = true;
    };
    ShowHide.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'e-statustext' }, "Select column name to toggle visibility"),
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar", ref: function (toolbar) { return _this.ToolbarInstance = toolbar; }, onClick: this.click.bind(this) },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Order ID" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Customer Name" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Freight" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Order Date" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Shipped Date" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Ship Country" }))),
                React.createElement("br", null),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, ref: function (grid) { return _this.gridInstance = grid; }, dataBound: this.dataBound.bind(this), allowPaging: true, allowSorting: true, editSettings: this.editSettings, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbar },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: "Right", validationRules: this.orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: this.freightRules, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: "yMd", textAlign: "Right", editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '170', editType: 'dropdownedit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates dynamic show hide columns feature of Grid. Click column name from the toolbar to toggle visibility.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid column can be showed/hidden dynamically using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#showcolumns' }, "ShowColumns")),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#hidecolumns' }, "hideColumns")),
                    " method of the Grid."),
                React.createElement("p", null,
                    "In this demo, the columns can be showed and hidden by clicking the column name in the toolbar. And the column`s visibility is toggled based on the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/column/#headertext' }, "columns->headerText")),
                    "value."),
                React.createElement("p", null, "The columns->visible property specifies the visibility of a column. To hide a column at the initial rendering, set the columns->visible property to false."))));
    };
    return ShowHide;
}(sample_base_1.SampleBase));
exports.ShowHide = ShowHide;
