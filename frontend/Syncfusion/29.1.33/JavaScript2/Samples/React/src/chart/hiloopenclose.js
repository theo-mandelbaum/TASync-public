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
exports.HiloOpenClose = exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for Hilo Open Close Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var stock_chart_data_1 = require("./stock-chart-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var HiloOpenClose = /** @class */ (function (_super) {
    __extends(HiloOpenClose, _super);
    function HiloOpenClose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiloOpenClose.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: this.load.bind(this), style: { textAlign: "center" }, ref: function (chart) { return _this.chart1 = chart; }, loaded: this.loaded.bind(this), primaryXAxis: {
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            title: 'Price',
                            labelFormat: 'n0',
                            lineStyle: { width: 0 },
                            minimum: 40,
                            maximum: 140,
                            interval: 20,
                            majorTickLines: { width: 0 }
                        }, chartArea: { border: { width: 0 } }, tooltip: {
                            enable: true, shared: true,
                            format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b>"
                        }, title: "AAPL Historical", axisLabelRender: this.axisLabelRender.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', legendSettings: { visible: false }, crosshair: { enable: true, lineType: 'Vertical', line: { width: 0 } } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'HiloOpenClose', dataSource: stock_chart_data_1.chartData, animation: { enable: true }, bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc' }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the AAPL historical data with default HILO Open Close series in the chart. Tooltip and crosshair shows the information about the data and period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the Hilo Open Close type charts. Hilo Open Close chart are used to represent the price movements in stock. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical rect."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use HiloOpenClose series, we need to inject",
                    React.createElement("code", null, "HiloOpenCloseSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the HILO Open Close series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/high-low-open-close", "aria-label": "Navigate to the documentation for High Low Open Close in React Chart component" }, "documentation section"),
                    "."))));
    };
    HiloOpenClose.prototype.loaded = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    HiloOpenClose.prototype.load = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    HiloOpenClose.prototype.axisLabelRender = function (args) {
        if (args.axis.title === 'Price') {
            args.text = '$' + args.text;
        }
    };
    return HiloOpenClose;
}(sample_base_1.SampleBase));
exports.HiloOpenClose = HiloOpenClose;
