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
exports.Symbols = exports.data = void 0;
/**
 * Sample for Chart symbols
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { x: 'WW', y: 12, y1: 22, y2: 38.3, y3: 50, text: 'World Wide' },
    { x: 'EU', y: 9.9, y1: 26, y2: 45.2, y3: 63.6, text: 'Europe' },
    { x: 'APAC', y: 4.4, y1: 9.3, y2: 18.2, y3: 20.9, text: 'Asia Pacific' },
    { x: 'LATAM', y: 6.4, y1: 28, y2: 46.7, y3: 65.1, text: 'Latin America' },
    { x: 'MEA', y: 30, y1: 45.7, y2: 61.5, y3: 73, text: 'Middle East Africa' },
    { x: 'NA', y: 25.3, y1: 35.9, y2: 64, y3: 81.4, text: 'North America' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Symbols = /** @class */ (function (_super) {
    __extends(Symbols, _super);
    function Symbols() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Symbols.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', interval: 1, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Trim', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0 }, load: this.load.bind(this), primaryYAxis: { title: 'Penetration', rangePadding: 'None', labelFormat: '{value}%', minimum: 0, lineStyle: { width: 0 }, maximum: 75, interval: 15, majorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, title: 'FB Penetration of Internet Audience', loaded: this.onChartLoad.bind(this), legendSettings: { visible: true, enableHighlight: true }, tooltip: { enable: true, header: "", format: "<b>${point.text}</b> <br> ${series.name} : <b>${point.y}</b>", enableHighlight: true, showNearestTooltip: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', width: 2, name: '2007', type: 'Line', marker: { visible: true, dataLabel: { name: 'text' }, width: 8, height: 8, shape: 'Diamond', isFilled: true } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y1', width: 2, name: '2008', type: 'Line', marker: { visible: true, dataLabel: { name: 'text' }, width: 8, height: 8, shape: 'Pentagon', isFilled: true } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y2', width: 2, name: '2009', type: 'Line', marker: { visible: true, dataLabel: { name: 'text' }, width: 8, height: 8, shape: 'Triangle', isFilled: true } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "http://www.marketingprofs.com/charts/2012/7064/facebook-stats-five-years-of-worldwide-growth", target: "_blank", "aria-label": "Navigate to the documentation for marketing profs" }, "www.marketingprofs.com"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates Facebook users in a chart for different countries over several years. In a line-based series, data points can be annotated using symbols.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Each points in a series can be represented as a symbol through marker. We can also customize the shape, size and color of a symbol through ",
                    React.createElement("code", null, "marker"),
                    " properties."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    "More information on the marker can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/data-markers/", "aria-label": "Navigate to the documentation for Data Markers in React Chart component" }, "documentation section"),
                    "."))));
    };
    Symbols.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Symbols.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return Symbols;
}(sample_base_1.SampleBase));
exports.Symbols = Symbols;
