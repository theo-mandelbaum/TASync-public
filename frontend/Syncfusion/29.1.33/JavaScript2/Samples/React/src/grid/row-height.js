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
exports.RowHeight = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var RowHeight = /** @class */ (function (_super) {
    __extends(RowHeight, _super);
    function RowHeight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Row height sample
         */
        _this.filterSettings = { type: 'Excel' };
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.customeridRule = { required: true, minLength: 5 };
        _this.orderidRules = { required: true, number: true };
        _this.freightRules = { required: true, min: 0 };
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right', tooltipText: 'Row-height-big' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right', tooltipText: 'Row-height-medium' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right', tooltipText: 'Row-height-small' }];
        return _this;
    }
    RowHeight.prototype.clickHandler = function (args) {
        if (args.item.id === 'small') {
            this.gridInstance.rowHeight = 20;
        }
        if (args.item.id === 'medium') {
            this.gridInstance.rowHeight = 40;
        }
        if (args.item.id === 'big') {
            this.gridInstance.rowHeight = 60;
        }
    };
    RowHeight.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, ref: function (grid) { return _this.gridInstance = grid; }, rowHeight: 20, height: 400, editSettings: this.editSettings, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbarOptions, toolbarClick: this.clickHandler.bind(this), allowSorting: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: this.orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: this.freightRules, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '140', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the row height feature of the Grid. In this demo, the ",
                    React.createElement("b", null, "rowHeight"),
                    " for all the Grid rows can be changed as ",
                    React.createElement("b", null, "20px"),
                    ", ",
                    React.createElement("b", null, "40px"),
                    " and ",
                    React.createElement("b", null, "60px"),
                    " on ToolBar button click.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid has support to provide ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#rowheight' }, "rowHeight")),
                    " property."))));
    };
    return RowHeight;
}(sample_base_1.SampleBase));
exports.RowHeight = RowHeight;
