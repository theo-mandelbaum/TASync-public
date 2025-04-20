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
exports.PolarRangeColumn = exports.data1 = void 0;
/**
 * Sample for Polar Series with drawType RangeColumn
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'Jan', low: 2, high: 7 }, { x: 'Feb', low: 3, high: 7 },
    { x: 'Mar', low: 3, high: 7 }, { x: 'Apr', low: 4, high: 9 },
    { x: 'May', low: 6, high: 11 }, { x: 'June', low: 8, high: 14 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var PolarRangeColumn = /** @class */ (function (_super) {
    __extends(PolarRangeColumn, _super);
    function PolarRangeColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Polar' },
            { value: 'Radar' }
        ];
        return _this;
    }
    PolarRangeColumn.prototype.change = function () {
        this.chartInstance.series[0].type = this.dropElement.value;
        this.chartInstance.refresh();
    };
    ;
    PolarRangeColumn.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: { valueType: 'Category', title: 'month', labelPlacement: 'OnTicks', interval: 1, coefficient: ej2_base_1.Browser.isDevice ? 80 : 100 }, primaryYAxis: { labelFormat: '{value}˚C', minimum: 0, maximum: 15, interval: 5 }, title: 'Temperatures of Germany', loaded: this.onChartLoad.bind(this), load: this.load.bind(this), tooltip: { enable: true, header: " ", format: "<b>${point.x}</b> <br> Low : <b>${point.low}°C</b> <br> High : <b>${point.high}°C" }, legendSettings: { visible: false } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.PolarSeries, ej2_react_charts_1.RadarSeries, ej2_react_charts_1.DataLabel] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', low: 'low', high: 'high', type: 'Polar', drawType: 'RangeColumn', name: "Germany", border: { width: 3, color: 'white' }, marker: { dataLabel: { visible: true, position: 'Top', font: { color: '#ffffff', fontWeight: '600' }, enableRotation: true } } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null, "Series Type:")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "selmode", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: 'Polar' }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows minimum and maximum temperature variations in polar and radar charts using a range column series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure polar and radar charts with a range column series. Switching between polar and radar series can be done using ",
                    React.createElement("b", null, "Series Type"),
                    " in the property panel."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting",
                    React.createElement("code", null, "PolarSeries"),
                    " and ",
                    React.createElement("code", null, "RadarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the polar-radar series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#range-column", "aria-label": "Navigate to the documentation for Polar Range Column in React Chart component" }, "documentation section"),
                    "."))));
    };
    PolarRangeColumn.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    PolarRangeColumn.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return PolarRangeColumn;
}(sample_base_1.SampleBase));
exports.PolarRangeColumn = PolarRangeColumn;
