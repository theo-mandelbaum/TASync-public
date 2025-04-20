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
exports.StackedColumn100 = exports.data4 = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for 100 percent Stacking Column series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = ej2_base_1.Browser.isDevice ?
    [
        { x: '2021', y: 24300000 },
        { x: '2022', y: 26300000 },
        { x: '2023', y: 25400000 },
        { x: '2024', y: 25000000 }
    ] :
    [
        { x: '2019', y: 28500000 },
        { x: '2020', y: 27500000 },
        { x: '2021', y: 24300000 },
        { x: '2022', y: 26300000 },
        { x: '2023', y: 25400000 },
        { x: '2024', y: 25000000 }
    ];
exports.data2 = ej2_base_1.Browser.isDevice ?
    [
        { x: '2021', y: 26700000 },
        { x: '2022', y: 30800000 },
        { x: '2023', y: 27400000 },
        { x: '2024', y: 31000000 }
    ] :
    [
        { x: '2019', y: 26900000 },
        { x: '2020', y: 29300000 },
        { x: '2021', y: 26700000 },
        { x: '2022', y: 30800000 },
        { x: '2023', y: 27400000 },
        { x: '2024', y: 31000000 }
    ];
exports.data3 = ej2_base_1.Browser.isDevice ?
    [
        { x: '2021', y: 17500000 },
        { x: '2022', y: 14500000 },
        { x: '2023', y: 12100000 },
        { x: '2024', y: 14400000 }
    ] :
    [
        { x: '2019', y: 19900000 },
        { x: '2020', y: 14600000 },
        { x: '2021', y: 17500000 },
        { x: '2022', y: 14500000 },
        { x: '2023', y: 12100000 },
        { x: '2024', y: 14400000 }
    ];
exports.data4 = ej2_base_1.Browser.isDevice ?
    [
        { x: '2021', y: 10800000 },
        { x: '2022', y: 11700000 },
        { x: '2023', y: 14600000 },
        { x: '2024', y: 17000000 }
    ] :
    [
        { x: '2019', y: 13000000 },
        { x: '2020', y: 13800000 },
        { x: '2021', y: 10800000 },
        { x: '2022', y: 11700000 },
        { x: '2023', y: 14600000 },
        { x: '2024', y: 17000000 }
    ];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StackedColumn100 = /** @class */ (function (_super) {
    __extends(StackedColumn100, _super);
    function StackedColumn100() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedColumn100.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }, primaryXAxis: { majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, labelIntersectAction: 'Rotate45', valueType: 'Category' }, primaryYAxis: { lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, interval: 20 }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: this.load.bind(this), title: ej2_base_1.Browser.isDevice ? 'Global Cotton Production by Country (2021–2024)' : 'Global Cotton Production by Country (2019–2024)', subTitle: 'Source: fas.usda.gov', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, enableHighlight: true, header: '<b>${point.x}</b>' }, legendClick: this.onLegendClick.bind(this), tooltipRender: this.tooltipRender.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'India', columnWidth: 0.4, border: { width: 1, color: "white" }, type: 'StackingColumn100', legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'China', columnWidth: 0.4, border: { width: 1, color: "white" }, type: 'StackingColumn100', legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'United States', columnWidth: 0.4, border: { width: 1, color: "white" }, type: 'StackingColumn100', legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data4, xName: 'x', yName: 'y', name: 'Brazil', columnWidth: 0.4, border: { width: 1, color: "white" }, type: 'StackingColumn100', cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React 100% stacked column chart example visualizes global cotton production trends by depicting the contributions of various countries over multiple years. Each stacked column represents a countries proportionate production for a given year, summing to a total of 100% per year. The legend in the sample provides information about the series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the 100% stacked column chart. The 100% stacked column chart displays multiple series of data as stacked columns, ensuring that the cumulative proportion of each stacked element always totals 100%."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use 100% stacking column series, we need to inject ",
                    React.createElement("code", null, "StackingColumnSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the 100% stacking column series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-column", "aria-label": "Navigate to the documentation for 100% Stacked Column Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    StackedColumn100.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    StackedColumn100.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    StackedColumn100.prototype.onLegendClick = function (args) {
        if (args.series.index === 0) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
            }
        }
        if (args.series.index === 1) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
        }
        if (args.series.index === 2) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
            else if (!args.series.visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
        }
        if (args.series.index === 3) {
            if (!args.series.visible) {
                args.chart.series[3].cornerRadius.topLeft = 4;
                args.chart.series[3].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[3].cornerRadius.topLeft = 0;
                args.chart.series[3].cornerRadius.topRight = 0;
            }
        }
    };
    ;
    StackedColumn100.prototype.tooltipRender = function (args) {
        if (args.text) {
            var value = args.point.y.toLocaleString('en-US');
            args.text = "".concat(args.series.name, ": <b>").concat(value, "M (").concat(args.point.percentage, "%)</b>");
        }
    };
    ;
    return StackedColumn100;
}(sample_base_1.SampleBase));
exports.StackedColumn100 = StackedColumn100;
