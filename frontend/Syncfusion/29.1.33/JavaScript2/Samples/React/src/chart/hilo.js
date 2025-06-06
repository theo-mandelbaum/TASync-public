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
exports.Hilo = void 0;
/**
 * Sample for Hilo Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var financial_data_1 = require("./financial-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var date1 = new Date('2017, 1, 1');
var returnValue = financial_data_1.chartData.filter(filterValue);
function filterValue(value) {
    if (value.x >= date1) {
        return value.x, value.high, value.low;
    }
}
var Hilo = /** @class */ (function (_super) {
    __extends(Hilo, _super);
    function Hilo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hilo.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: this.load.bind(this), style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }, primaryYAxis: { title: 'Price', minimum: 10, maximum: 180, interval: 20, labelFormat: '${value}', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, legendSettings: { visible: false }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, shared: true, enableMarker: false, header: "", format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b>" }, crosshair: { enable: false, lineType: 'Vertical', line: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'AAPL Historical', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.HiloSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Zoom] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: financial_data_1.chartValues, xName: 'period', yName: 'low', name: 'Apple Inc', type: 'Hilo', low: 'low', high: 'high' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Hilo Chart example visualizes the AAPL stock price with a default Hilo series in the chart. The tooltip and crosshair show information about the stock price.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the HILO series. This series shows the high and low stock values over a given period of time."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Hilo series, we need to inject",
                    React.createElement("code", null, "HiloSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Hilo series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/financial-types/#hilo", "aria-label": "Navigate to the documentation for Hilo in React Chart component" }, "documentation section"),
                    "."))));
    };
    Hilo.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Hilo.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return Hilo;
}(sample_base_1.SampleBase));
exports.Hilo = Hilo;
