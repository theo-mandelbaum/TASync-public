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
exports.UpdateSpline = void 0;
/**
 * Sample for Update DataSource.
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var data = (function () {
    var data = [];
    var time = new Date().getTime();
    for (var i = -10; i <= 0; i += 1) {
        var cpuValue = Math.max(17, Math.random() * 100);
        data.push({
            x: time + i * 1000,
            y: cpuValue
        });
    }
    return data;
}());
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #container_Series_0_Point_10_Symbol {\n        -webkit-animation: opac 1s ease-out infinite;\n        animation: opac 1s ease-out infinite;\n    }\n    @keyframes opac {\n        0% {\n            stroke-opacity: 1;\n            stroke-width: 10px;\n        }\n        100% {\n            stroke-opacity: 0;\n            stroke-width: 20px;\n        }\n    }";
var UpdateSpline = /** @class */ (function (_super) {
    __extends(UpdateSpline, _super);
    function UpdateSpline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateSpline.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'spline', style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', interval: 2, edgeLabelPlacement: ej2_base_1.Browser.isDevice ? 'None' : 'Shift', labelRotation: ej2_base_1.Browser.isDevice ? 45 : 0, majorGridLines: { width: 0 } }, primaryYAxis: {
                        title: 'Value', interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                    }, axisRangeCalculated: this.axisRangeCalculated.bind(this), chartArea: { border: { width: 0 } }, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Live data' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data, xName: 'x', yName: 'y', type: 'Spline', width: 2, marker: { visible: true, isFilled: true, width: 7, height: 7 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to add and remove data points in a spline chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure a spline chart to display data that updates every second, with old data being removed. The X-axis represents the time at which the data is added, while the Y-axis displays the data values."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use the spline series, we need to inject the",
                    React.createElement("code", null, "SplineSeries"),
                    " module using the ",
                    React.createElement("code", null, "Chart.Inject(SplineSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the spline series can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline", "aria-label": "Navigate to the documentation for Spline Chart in React Chart control" }, "documentation section"),
                    "."))));
    };
    UpdateSpline.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('spline');
        chart.setAttribute('title', '');
    };
    ;
    UpdateSpline.prototype.axisRangeCalculated = function (args) {
        if (args.axis.name === 'primaryXAxis') {
            var lastPoint = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 500;
        }
    };
    ;
    UpdateSpline.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        setInterval(function () {
            var x = (new Date()).getTime();
            var y = Math.max(17, Math.random() * 100);
            if (args.chart.series.length > 0) {
                args.chart.series[0].addPoint({ x: x, y: y });
                args.chart.series[0].removePoint(0);
            }
        }, 1000);
    };
    ;
    return UpdateSpline;
}(sample_base_1.SampleBase));
exports.UpdateSpline = UpdateSpline;
