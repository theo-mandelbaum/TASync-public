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
exports.Sorting = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Sorting = /** @class */ (function (_super) {
    __extends(Sorting, _super);
    function Sorting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        _this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.customeridRule = { required: true, minLength: 5 };
        _this.orderidRules = { required: true, number: true };
        _this.freightRules = { required: true, min: 0 };
        _this.sortingOptions = { columns: [{ field: 'Freight', direction: 'Ascending' }, { field: 'CustomerName', direction: 'Descending' }] };
        return _this;
    }
    Sorting.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, allowPaging: true, allowSorting: true, pageSettings: { pageCount: 5 }, sortSettings: this.sortingOptions, editSettings: this.editSettings, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbar },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: "Right", validationRules: this.orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: this.freightRules, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: "yMd", textAlign: "Right", editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid multi sorting feature. To sort two or more columns, hold the CTRL key and click the column header.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowsorting' }, "allowSorting")),
                    " as true."),
                React.createElement("p", null, "To sort a Grid column simply click the column header. The icons (ascending) and (descending) specifies the sort direction of a column."),
                React.createElement("p", null,
                    "By default, multi-sorting is enabled in Grid, to sort multiple column hold ",
                    React.createElement("b", null, "CTRL"),
                    " key and ",
                    React.createElement("b", null, "click"),
                    " the column header. To clear sort for a column, hold SHIFT key and click the column header."),
                React.createElement("p", null, "While using Grid in a touch device, you have an option for multi sorting in single tap on the grid header. By tapping on the grid header, it will show the toggle button in small popup with sort icon. Now tap the button to enable the multi sorting in single tap."),
                React.createElement("p", null, "In this demo, simply click the column header to sort a column. Also multiple sorting is enabled."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use Sorting feature, we need to inject ",
                    React.createElement("code", null, "Sort"),
                    " modeule into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the paging feature configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/grid/sorting.html' }, " documentation section"),
                    "."))));
    };
    return Sorting;
}(sample_base_1.SampleBase));
exports.Sorting = Sorting;
