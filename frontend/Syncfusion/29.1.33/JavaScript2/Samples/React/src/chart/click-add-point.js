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
exports.ClickAddPoint = void 0;
/**
 * Sample for Column series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var chartData = [
    { x: 20, y: 20 }, { x: 80, y: 80 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var ClickAddPoint = /** @class */ (function (_super) {
    __extends(ClickAddPoint, _super);
    function ClickAddPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClickAddPoint.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'AddPoint', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                        edgeLabelPlacement: 'Shift',
                        rangePadding: 'Additional',
                        majorGridLines: { width: 0 }
                    }, primaryYAxis: {
                        title: 'Value', interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                    }, chartMouseClick: this.chartMouseClick.bind(this), axisRangeCalculated: this.axisRangeCalculated.bind(this), tooltip: { enable: true, enableHighlight: true }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), loaded: this.loaded.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '70%', title: 'User supplied data' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: chartData, xName: 'x', yName: 'y', type: 'Line', width: 3, marker: { visible: true, isFilled: true, border: { width: 2, color: 'White' }, width: 13, height: 13 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a chart that allows users to add new data and update existing data source by clicking in the chart area. Additionally, clicking on an existing point will remove that data from the existing data source.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the X-Axis and Y-Axis data of the currently clicked location are retrieved from the ",
                    React.createElement("code", null, "chartMouseClick"),
                    " event arguments and converted into a new point. This point is then added to the existing datasource. If there is already a point with the same coordinates present, it will be removed from the existing datasource."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use the line series, we need to inject the",
                    React.createElement("code", null, "LineSeries"),
                    " module using ",
                    React.createElement("code", null, "Chart.Inject(LineSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the line series can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/line", "aria-label": "Navigate to the documentation for Line Chart in React Chart control" }, "documentation section"),
                    "."))));
    };
    ClickAddPoint.prototype.chartMouseClick = function (args) {
        var isRemoved = false;
        if (args.axisData) {
            for (var i = 0; i < this.chartInstance.series[0].points.length; i++) {
                var markerWidth = this.chartInstance.series[0].marker.width / 2;
                if (Math.round(args.axisData['primaryXAxis']) + markerWidth === Math.round(this.chartInstance.series[0].points[i].x) + markerWidth &&
                    Math.round(args.axisData['primaryYAxis']) + markerWidth === Math.round(this.chartInstance.series[0].points[i].y) + markerWidth) {
                    if (this.chartInstance.series[0].points.length > 1) {
                        this.chartInstance.series[0].removePoint(i);
                    }
                    isRemoved = true;
                }
            }
            if (!isRemoved) {
                this.chartInstance.series[0].addPoint({ x: Math.round(args.axisData['primaryXAxis']), y: Math.round(args.axisData['primaryYAxis']) });
            }
        }
    };
    ;
    ClickAddPoint.prototype.axisRangeCalculated = function (args) {
        if (args.axis.name === 'primaryXAxis') {
            if (args.interval < 10) {
                args.maximum = args.maximum + 10;
                args.minimum = args.minimum - 10;
                args.interval = 10;
            }
        }
    };
    ;
    ClickAddPoint.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    ClickAddPoint.prototype.loaded = function (args) {
        var chart = document.getElementById('AddPoint');
        chart.setAttribute('title', '');
    };
    ;
    return ClickAddPoint;
}(sample_base_1.SampleBase));
exports.ClickAddPoint = ClickAddPoint;
