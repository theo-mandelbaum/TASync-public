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
exports.AggregateGroup = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./grid-group-aggregate.css");
var AggregateGroup = /** @class */ (function (_super) {
    __extends(AggregateGroup, _super);
    function AggregateGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        _this.groupSettings = { showDropArea: false, columns: ['ConsumptionCategory'], showGroupedColumn: true };
        return _this;
    }
    AggregateGroup.prototype.groupFooterSum = function (props) {
        return (React.createElement("span", null,
            "Total Energy Produced: ",
            props.Sum,
            " KWh"));
    };
    AggregateGroup.prototype.footerSum = function (props) {
        return (React.createElement("span", null,
            "Total Energy Produced: ",
            props.Sum,
            " KWh"));
    };
    AggregateGroup.prototype.footerAverage = function (props) {
        return (React.createElement("span", null,
            "Average Energy Produced: ",
            props.Average,
            " KWh"));
    };
    AggregateGroup.prototype.groupcFootertMaxMin = function (props) {
        return (React.createElement("div", { className: "e-grid-group-caption-temp" },
            React.createElement("span", { className: "e-minimum" },
                "Min: ",
                props.Min),
            React.createElement("span", null, "||"),
            " ",
            React.createElement("span", { className: "e-maximum" },
                " Max : ",
                props.Max)));
    };
    AggregateGroup.prototype.energyHeaderTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("span", { className: "energy e-icons e-icon" }),
            React.createElement("span", null, " Energy (KWh)")));
    };
    AggregateGroup.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: "group-aggregate-grid", dataSource: data_1.energyData, gridLines: 'Vertical', enableHover: false, allowSorting: true, allowMultiSorting: true, height: 300, allowGrouping: true, groupSettings: this.groupSettings, allowFiltering: true, filterSettings: this.filterSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ID', visible: false, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Month', headerText: 'Month', format: 'yMd', width: '120', type: 'date' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ConsumptionCategory', headerText: 'Category', width: '130', textAlign: 'Left' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerTemplate: this.energyHeaderTemplate, width: '130', textAlign: 'Center', columns: [{ field: 'EnergyConsumed', headerText: 'Consumed', width: 150, textAlign: 'Right' },
                                { field: 'EnergyProduced', headerText: 'Produced', width: 300, textAlign: 'Right' }] }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'WeatherCondition', headerText: 'Weather', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EnergyPrice', headerText: 'Price ($)', width: '130', format: 'C2' })),
                    React.createElement(ej2_react_grids_1.AggregatesDirective, null,
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'EnergyProduced', type: 'Sum', format: 'N2', footerTemplate: this.footerSum }, " "))),
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'EnergyProduced', type: 'Average', format: 'N2', footerTemplate: this.footerAverage }, " "))),
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'EnergyProduced', type: 'Max', format: 'N2', groupCaptionTemplate: this.groupcFootertMaxMin }, " "))),
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'EnergyProduced', type: 'Sum', format: 'N2', groupFooterTemplate: this.groupFooterSum }, " ")))),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Aggregate, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] })),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null,
                        "This sample demonstrates the aggregate functionality of the Grid. In this sample, the \u201CEnergy Produced\u201D column will displays its ",
                        React.createElement("code", null, "sum"),
                        " aggregate value in the group footer and the ",
                        React.createElement("code", null, "min"),
                        " and ",
                        React.createElement("code", null, "max"),
                        " aggregate values in group caption.")),
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
                            " property to perform the aggregation. The custom aggregate value can be accessed inside template using the key ",
                            React.createElement("code", null, "custom"),
                            ".")),
                    React.createElement("p", null,
                        "In this demo, the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupfootertemplate" }, "groupFooterTemplate")),
                        " property is used to display the group footer aggregation for the ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Energy Produced")),
                        " column and the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupcaptiontemplate" }, "groupCaptionTemplate")),
                        " property is used to display its group caption aggregation."),
                    React.createElement("p", null,
                        "    To enable group footer aggregation for the ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Energy Produced")),
                        " column, use the ",
                        React.createElement("code", null, "Sum"),
                        " aggregate type by setting the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type" }, "type")),
                        " and set the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field" }, "field")),
                        " property to ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "EnergyProduced")),
                        " which will be used to perform the aggregation. The aggregate value is accessed inside the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupfootertemplate" }, "groupFooterTemplate")),
                        " using its ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type" }, "type")),
                        " name (",
                        React.createElement("code", null, "Sum"),
                        ")."),
                    React.createElement("p", null,
                        "    To enable group caption aggregation for the ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Energy Produced")),
                        " column, the ",
                        React.createElement("code", null, "max"),
                        " and ",
                        React.createElement("code", null, "min"),
                        "aggregate types are used by setting the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type" }, "type")),
                        " and the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#field" }, "field")),
                        " property is set to ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "EnergyProduced")),
                        ", which will be used to perform the aggregation. The aggregate value is accessed inside the",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupcaptiontemplate" }, "groupCaptionTemplate")),
                        " using its ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#type" }, "type")),
                        " name (",
                        React.createElement("code", null, "Max"),
                        " and ",
                        React.createElement("code", null, "Min"),
                        ")."),
                    React.createElement("p", null,
                        "In this sample, we use the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/aggregateColumn/#groupcaptiontemplate" }, "groupCaptionTemplate")),
                        " to show multiple aggregate values."),
                    React.createElement("p", null, "Injecting Module:"),
                    React.createElement("p", null,
                        "Grid component features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject",
                        React.createElement("code", null, "Aggregate"),
                        " into the ",
                        React.createElement("code", null, "provide"),
                        " section.  Since grouping feature is required to show group aggreations, we also need to inject ",
                        React.createElement("code", null, "Group"),
                        " module.")))));
    };
    return AggregateGroup;
}(sample_base_1.SampleBase));
exports.AggregateGroup = AggregateGroup;
