"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for Hilo Open Close Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var financial_data_1 = require("./financial-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var HiloOpenClose = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var loaded = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: load.bind(_this), loaded: loaded.bind(_this), style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 } }, primaryYAxis: { title: 'Price', labelFormat: 'n0', lineStyle: { width: 0 }, minimum: 40, maximum: 140, interval: 20, majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, shared: true, header: "", format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b>" }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { visible: false }, crosshair: { enable: true, lineType: 'Vertical' }, title: "AAPL Historical" },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'HiloOpenClose', dataSource: financial_data_1.chartValues, animation: { enable: true }, bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', xName: 'period', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc' }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the AAPL stock price with default HILO Open Close series in the chart. The tooltip and the crosshairs display the data and period information.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the HILO Open Close series. The horizontal lines on the left and the right are used to show the opening and closing values of the stock, and the vertical line represents both high and low values."),
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use HiloOpenClose series, we need to inject ",
                React.createElement("code", null, "HiloOpenCloseSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the column series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/financial-types/#high-low-open-close", "aria-label": "Navigate to the documentation for High Low Open Close in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = HiloOpenClose;
