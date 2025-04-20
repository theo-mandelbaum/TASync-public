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
exports.PolarArea = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Polar Series with drawType Area
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [{ x: '2000', y: 4 }, { x: '2001', y: 3.0 },
    { x: '2002', y: 3.8 }, { x: '2003', y: 3.4 },
    { x: '2004', y: 3.2 }, { x: '2005', y: 3.9 }];
exports.data2 = [{ x: '2000', y: 2.6 }, { x: '2001', y: 2.8 },
    { x: '2002', y: 2.6 }, { x: '2003', y: 3 },
    { x: '2004', y: 3.6 }, { x: '2005', y: 3 }];
exports.data3 = [{ x: '2000', y: 2.8 }, { x: '2001', y: 2.5 },
    { x: '2002', y: 2.8 }, { x: '2003', y: 3.2 },
    { x: '2004', y: 2.9 }, { x: '2005', y: 2 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var PolarArea = /** @class */ (function (_super) {
    __extends(PolarArea, _super);
    function PolarArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Polar' },
            { value: 'Radar' }
        ];
        return _this;
    }
    PolarArea.prototype.change = function () {
        this.chartInstance.series[0].type = this.dropElement.value;
        this.chartInstance.series[1].type = this.dropElement.value;
        this.chartInstance.series[2].type = this.dropElement.value;
        this.chartInstance.refresh();
    };
    ;
    PolarArea.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: { valueType: 'Category', labelPlacement: 'OnTicks', interval: 1, coefficient: ej2_base_1.Browser.isDevice ? 80 : 100 }, primaryYAxis: { title: 'Revenue in Millions', labelFormat: '{value}M' }, legendSettings: { visible: true, enableHighlight: true }, tooltip: { enable: true, enableHighlight: true }, load: this.load.bind(this), title: "Average Sales Comparison", loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.PolarSeries, ej2_react_charts_1.RadarSeries, ej2_react_charts_1.Highlight, ej2_react_charts_1.Tooltip] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Product A', width: 2, opacity: 0.5, type: 'Polar', drawType: 'Area', border: { color: 'transparent' } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Product B', width: 2, opacity: 0.5, type: 'Polar', drawType: 'Area', border: { color: 'transparent' } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'Product C', width: 2, opacity: 0.5, type: 'Polar', drawType: 'Area', border: { color: 'transparent' } })))),
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
                React.createElement("p", null, "This sample shows the average product sales comparison for 6 years in polar and radar charts.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure polar and radar charts with an area series. Switching between polar and radar series can be done using ",
                    React.createElement("code", null, "Series Type"),
                    " in the property panel"),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject ",
                    React.createElement("code", null, "AreaSeries"),
                    ", ",
                    React.createElement("code", null, "PolarSeries"),
                    " and ",
                    React.createElement("code", null, "RadarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the polar-radar series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#area", "aria-label": "Navigate to the documentation for Polar Area in React Chart component" }, "documentation section"),
                    "."))));
    };
    PolarArea.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    PolarArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return PolarArea;
}(sample_base_1.SampleBase));
exports.PolarArea = PolarArea;
