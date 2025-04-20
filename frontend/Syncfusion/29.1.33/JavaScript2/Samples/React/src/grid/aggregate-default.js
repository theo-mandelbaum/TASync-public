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
exports.AggregateDefault = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./grid-aggregate-default.css");
var AggregateDefault = /** @class */ (function (_super) {
    __extends(AggregateDefault, _super);
    function AggregateDefault() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        return _this;
    }
    AggregateDefault.prototype.footerSum = function (props) {
        return (React.createElement("div", null,
            "Total: ",
            props.Sum));
    };
    AggregateDefault.prototype.footerSumNewCustomers = function (props) {
        return (React.createElement("div", null,
            "New Customers: ",
            props.Sum));
    };
    AggregateDefault.prototype.footerSumReturnCustomers = function (props) {
        return (React.createElement("div", null,
            "Total: ",
            props.Sum));
    };
    AggregateDefault.prototype.footerAvg = function (props) {
        return (React.createElement("div", null,
            "Average: ",
            props.Average));
    };
    AggregateDefault.prototype.footerMin = function (props) {
        return (React.createElement("div", null,
            "Min: ",
            props.Min));
    };
    AggregateDefault.prototype.footerMax = function (props) {
        return (React.createElement("div", null,
            "Max: ",
            props.Max));
    };
    AggregateDefault.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: "default-aggregate-grid", dataSource: data_1.OverallData, enableHover: false, height: '300', gridLines: 'Vertical', allowSorting: true, allowMultiSorting: true, allowFiltering: true, filterSettings: this.filterSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Month', headerText: 'Time Stamp', textAlign: 'Left', width: '140', isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Sales', headerText: 'Sales', width: '150', textAlign: 'Right', format: 'C2' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'MarketingSpend', headerText: 'Marketing Spent', width: '190', format: 'C2', textAlign: 'Right', editType: 'dropdownedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'NewCustomers', headerText: 'New Customers', width: '180', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReturningCustomers', headerText: 'Returning Customers', width: '220', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'WebTraffic', headerText: 'Web Traffic', width: '160', textAlign: 'Right' })),
                    React.createElement(ej2_react_grids_1.AggregatesDirective, null,
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'Sales', type: 'Sum', footerTemplate: this.footerSum, format: 'C2' }, " "),
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'MarketingSpend', type: 'Sum', footerTemplate: this.footerSum, format: 'C2' }, " "),
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'NewCustomers', type: 'Sum', footerTemplate: this.footerSumNewCustomers, format: 'N' }, " "),
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'ReturningCustomers', type: 'Sum', footerTemplate: this.footerSumReturnCustomers, format: 'N' }, " "))),
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'Sales', type: 'Average', footerTemplate: this.footerAvg, format: 'C2' }, " "),
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'MarketingSpend', type: 'Average', footerTemplate: this.footerAvg, format: 'C2' }, " "),
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'WebTraffic', type: 'Max', footerTemplate: this.footerMax, format: 'N' }, " "))),
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'WebTraffic', type: 'Min', footerTemplate: this.footerMin, format: 'N' }, " ")))),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Aggregate, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit, ej2_react_grids_1.Filter] })),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates the aggregate functionality of the Grid. In this sample, the aggregate values for the columns are displayed in the column footer.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "The Grid supports displaying aggregates in its footer, group footer and group caption. The aggregate configurations can be provided by the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#aggregates" }, "aggregates")),
                        " property."),
                    React.createElement("p", null, "Built-in aggregates:"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Sum")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Average")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Min")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Max")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Count")),
                        React.createElement("li", null,
                            React.createElement("code", null, "TrueCount")),
                        React.createElement("li", null,
                            React.createElement("code", null, "FalseCount")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Custom"),
                            " - Requires the ",
                            React.createElement("code", null,
                                React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#customaggregate" }, "customAggregate")),
                            " property to perform aggregation. The custom aggregate value can be accessed inside template using the key ",
                            React.createElement("code", null, "custom"),
                            ".")),
                    React.createElement("p", null,
                        "In this demo, the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#footertemplate" }, "footerTemplate")),
                        " property is used to display four different aggregates (",
                        React.createElement("code", null, "Sum"),
                        ", ",
                        React.createElement("code", null, "Average"),
                        ", ",
                        React.createElement("code", null, "Max"),
                        " and ",
                        React.createElement("code", null, "Min"),
                        ") in the Grid footer. Each aggregate type is specified using the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type" }, "type")),
                        " and ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field" }, "field")),
                        " properties accessed in the footerTemplate with its type name. The aggregate value will be formatted based on its ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#format" }, "format")),
                        " value (",
                        React.createElement("strong", null,
                            React.createElement("i", null, "N2")),
                        " or ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "C2")),
                        ") before being displayed."),
                    React.createElement("p", null, "Injecting Module:"),
                    React.createElement("p", null,
                        "Grid component features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject",
                        React.createElement("code", null, "Aggregate"),
                        " into the ",
                        React.createElement("code", null, "provide"),
                        " section."),
                    React.createElement("p", null,
                        " More information on the Stacked Header feature configuration can be found in this",
                        React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/grid/aggregates/footer-aggregate' }, " documentation section"),
                        ".")))));
    };
    return AggregateDefault;
}(sample_base_1.SampleBase));
exports.AggregateDefault = AggregateDefault;
