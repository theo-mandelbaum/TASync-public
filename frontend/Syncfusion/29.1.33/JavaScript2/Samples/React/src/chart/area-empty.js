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
exports.AreaEmpty = exports.data1 = void 0;
/**
 * Sample for Area series with empty points
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { Period: 'Nov 14', US_InflationRate: 2.2, IN_InflationRate: 0.8 }, { Period: 'Nov 15', US_InflationRate: 2.0, IN_InflationRate: 1.7 }, { Period: 'Nov 16', US_InflationRate: 2.8, IN_InflationRate: 1.8 },
    { Period: 'Nov 17', US_InflationRate: 1.6, IN_InflationRate: 2.1 }, { Period: 'Nov 18', US_InflationRate: 2.3, IN_InflationRate: null }, { Period: 'Nov 19', US_InflationRate: 2.5, IN_InflationRate: 2.3 },
    { Period: 'Nov 20', US_InflationRate: 2.9, IN_InflationRate: 1.7 }, { Period: 'Nov 21', US_InflationRate: 1.1, IN_InflationRate: 1.5 }, { Period: 'Nov 22', US_InflationRate: 1.4, IN_InflationRate: 0.5 },
    { Period: 'Nov 23', US_InflationRate: 1.1, IN_InflationRate: 1.3 }
];
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
/**
 * Area empty sample
 */
var AreaEmpty = /** @class */ (function (_super) {
    __extends(AreaEmpty, _super);
    function AreaEmpty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AreaEmpty.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, primaryYAxis: { labelFormat: '{value}MB', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, minimum: 0, maximum: 5, interval: 1 }, tooltip: { enable: true, format: '${point.x} : <b>${point.y}</b>', enableHighlight: true, showNearestTooltip: true }, legendSettings: { enableHighlight: true }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Data Consumption", loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "Period", yName: "US_InflationRate", name: "Andrew", opacity: 0.5, marker: { visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }, type: "Area", width: 2, border: { width: 2 } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "Period", yName: "IN_InflationRate", name: "Thomas", marker: { visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }, opacity: 0.5, type: "Area", width: 2, border: { width: 2 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates an area series with empty points. Data points with null points are shown here.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render an area series with empty points. Also, a legend is enabled in the shape of the series."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject",
                    React.createElement("code", null, "AreaSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the area empty points can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/working-with-data#empty-points", "aria-label": "Navigate to the documentation for Empty points in React Chart component" }, "documentation section"),
                    "."))));
    };
    AreaEmpty.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    AreaEmpty.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return AreaEmpty;
}(sample_base_1.SampleBase));
exports.AreaEmpty = AreaEmpty;
