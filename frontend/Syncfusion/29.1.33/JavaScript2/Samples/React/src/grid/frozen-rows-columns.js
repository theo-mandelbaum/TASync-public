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
exports.FrozenRowsColumns = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var FrozenRowsColumns = /** @class */ (function (_super) {
    __extends(FrozenRowsColumns, _super);
    function FrozenRowsColumns() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        return _this;
    }
    /* After clicking 'Set' button, the `frozenRows` and `frozenColumns` values will be updated in Grid */
    FrozenRowsColumns.prototype.btnClick = function () {
        this.grid.frozenRows = this.rowInstance.value;
        this.grid.frozenColumns = this.columnInstance.value;
    };
    FrozenRowsColumns.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, height: '350', frozenRows: 2, frozenColumns: 1, allowSelection: false, enableHover: false, allowResizing: true, allowSorting: true, allowFiltering: true, filterSettings: this.filterSettings, allowMultiSorting: false, ref: function (g) { return _this.grid = g; } },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', isPrimaryKey: true }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '125', format: 'C2' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '150' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '180' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '150', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '180', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '300' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipAddress', headerText: 'Ship Address', width: '270' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '250' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '250' })),
                        React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Freeze, ej2_react_grids_1.Resize, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '30%' } },
                                        React.createElement("div", null, "Frozen Rows ")),
                                    React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                        React.createElement("div", { style: { minWidth: '148px' } },
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 0, max: 5, validateDecimalOnType: true, decimals: 0, format: 'n', value: 2, ref: function (numeric) { return _this.rowInstance = numeric; }, "aria-label": "Frozen rows" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '30%' } },
                                        React.createElement("div", null, "Frozen Columns ")),
                                    React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                        React.createElement("div", { style: { minWidth: '148px' } },
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 0, max: ej2_base_1.Browser.isDevice ? 1 : 2, validateDecimalOnType: true, decimals: 0, format: 'n', value: 1, ref: function (numeric) { return _this.columnInstance = numeric; }, "aria-label": "Frozen columns" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.btnClick.bind(this) }, "Set"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the frozen rows and columns feature of the Grid. Scroll the movable content vertically/horizontally to view the frozen rows/columns with the content.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The freezing feature enables the user to freeze certain rows/columns to scroll remaining movable content. This can be achieved by setting ",
                    React.createElement("b", null, "frozenRows"),
                    " and ",
                    React.createElement("b", null, "frozenColumns"),
                    " property."),
                React.createElement("p", null,
                    "In this demo sample, the first column and two rows are set to frozen by using the ",
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#frozenrows" },
                        React.createElement("code", null, "frozenRows")),
                    " and",
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#frozencolumns" },
                        React.createElement("code", null, "frozenColumns")),
                    " properties."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use frozen rows and columns feature, we need to inject ",
                    React.createElement("code", null, "Freeze"),
                    " module into the ",
                    React.createElement("code", null, "services")))));
    };
    return FrozenRowsColumns;
}(sample_base_1.SampleBase));
exports.FrozenRowsColumns = FrozenRowsColumns;
