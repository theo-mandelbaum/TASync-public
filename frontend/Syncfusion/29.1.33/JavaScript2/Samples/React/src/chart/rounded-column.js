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
exports.RoundedColumn = exports.roundedColumnData = void 0;
/**
 * Sample for column series with rounded corner
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var theme_color_2 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
exports.roundedColumnData = [
    { x: 'Healthcare', y: 0.9, text: '0.9%' },
    { x: 'Real Estate', y: 1.3, text: '1.3%' },
    { x: 'Energy', y: 2.3, text: '2.3%' },
    { x: ej2_base_1.Browser.isDevice ? 'Consumer <br> Staples' : 'Consumer Staples', y: 12.0, text: '12.0%' },
    { x: 'Industrials', y: 15.6, text: '15.6%' },
    { x: 'Utilities', y: 19.6, text: '19.6%' },
    { x: ej2_base_1.Browser.isDevice ? 'S&P <br> 500 Average' : 'S&P 500 Average', y: 23.3, text: '23.3%' },
    { x: 'Financials', y: 28.4, text: '28.4%' },
    { x: ej2_base_1.Browser.isDevice ? 'Consumer <br> Discretionary' : 'Consumer Discretionary', y: 29.1, text: '29.1%' },
    { x: ej2_base_1.Browser.isDevice ? 'Information <br> Technology' : 'Information Technology', y: 35.7, text: '35.7%' },
    { x: ej2_base_1.Browser.isDevice ? 'Communication <br> Services' : 'Communication Services', y: 38.9, text: '38.9%' }
];
var RoundedColumn = /** @class */ (function (_super) {
    __extends(RoundedColumn, _super);
    function RoundedColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundedColumn.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts2', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelPosition: 'Outside', labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45' }, primaryYAxis: { minimum: 0, maximum: 50, title: 'Sector-wise Growth (%)', labelFormat: '{value}%', interval: 10, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, opposedPosition: true }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), title: 'Top Performing Market Sectors by Growth Rate (2024)', subTitle: 'Source: visualcapitalist.com', titleStyle: { position: 'Bottom' }, loaded: this.loaded.bind(this), legendSettings: { visible: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '77%', tooltip: { enable: true, header: "<b>${point.x}</b>", format: "Growth Rate : <b>${point.text}</b>" }, pointRender: this.pointRender.bind(this), height: '500px' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BarSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { xName: 'x', yName: 'y', columnWidth: 0.5, dataSource: exports.roundedColumnData, type: 'Bar', marker: { dataLabel: { visible: true, name: 'text', enableRotation: false, angle: -90, font: { fontWeight: '600' } } }, cornerRadius: { bottomLeft: ej2_base_1.Browser.isDevice ? 8 : 10, bottomRight: ej2_base_1.Browser.isDevice ? 8 : 10, topLeft: ej2_base_1.Browser.isDevice ? 8 : 10, topRight: ej2_base_1.Browser.isDevice ? 8 : 10 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample showcases a bar chart with rounded corners, illustrating the anticipated growth rates across various sectors in 2024.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the bar chart. The bar chart is similar to the column chart, but the orientation of the y-axis is horizontal rather than vertical. You can use the ",
                    React.createElement("code", null, "cornerRadius"),
                    " option to customize the horizontal rectangle, resulting in a rounded bar."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject ",
                    React.createElement("code", null, "BarSeries"),
                    " module into ",
                    React.createElement("code", null, "services")),
                React.createElement("p", null,
                    "More information on the bar series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/bar", "aria-label": "Navigate to the documentation for Bar Chart in React Chart Component" }, "documentation section"),
                    "."))));
    };
    RoundedColumn.prototype.loaded = function (args) {
        var chart = document.getElementById('charts2');
        chart.setAttribute('title', '');
    };
    ;
    RoundedColumn.prototype.load = function (args) {
        (0, theme_color_2.loadChartTheme)(args);
    };
    ;
    RoundedColumn.prototype.pointRender = function (args) {
        (0, theme_color_1.roundedPointRender)(args);
    };
    ;
    return RoundedColumn;
}(sample_base_1.SampleBase));
exports.RoundedColumn = RoundedColumn;
