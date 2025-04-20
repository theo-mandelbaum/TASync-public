"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Range Area Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var financial_data_1 = require("./financial-data");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var RangeStepArea = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        switch (args.chart.theme) {
            case 'Bootstrap5':
                {
                    args.chart.series[0].fill = '#BDD9F5';
                    args.chart.series[0].border.color = '#539DE3';
                }
                break;
            case 'Fluent':
                {
                    args.chart.series[0].fill = '#C3A6DB';
                    args.chart.series[0].border.color = '#9E71C2';
                }
                break;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null,
            " ",
            SAMPLE_CSS,
            " "),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, load: load.bind(_this), primaryXAxis: { valueType: 'DateTime', labelFormat: 'dd MMM', edgeLabelPlacement: (ej2_base_1.Browser.isDevice) ? 'Shift' : 'Hide', majorGridLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}˚C', lineStyle: { width: 0 }, minimum: -10, maximum: 25, interval: 5, majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, format: 'Temperature : <b>${point.low} - ${point.high}</b>', header: '<b>${point.x}</b>', shared: false, showNearestTooltip: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Temperature Variation by Month', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeStepAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: financial_data_1.chartDataValues, border: { width: 2 }, xName: 'x', high: 'high', opacity: 0.5, marker: { visible: false }, low: 'low', animation: { enable: true }, type: 'RangeStepArea' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React range step area chart example illustrates the minimum and maximum temperatures for different days using the default range step area series.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                " In this example, you can see how to render and configure a range step area type chart. You can use ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/border/", "aria-label": "Navigate to the Border property reference for React Chart Series" }, "border"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/seriesModel/#fill", "aria-label": "Navigate to the Fill property reference for React Chart Series" }, "fill"),
                " properties to customize the range step area. Both ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/marker/", "aria-label": "Navigate to the documentation for Data markers in React Chart component" }, "markers"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/dataLabel/", "aria-label": "Navigate to the documentation for DataLabel in React Chart component" }, "dataLabels"),
                " are used to represent data points and their values."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "The Charts component\u2019s features are segregated into individual feature modules by feature. To use range step area series, we need to inject the ",
                React.createElement("code", null, "RangeStepAreaSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information about the area type series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-step-area", "aria-label": "Navigate to the documentation for Range Step Area in React Charts component" }, "documentation section"),
                "."))));
};
exports.default = RangeStepArea;
