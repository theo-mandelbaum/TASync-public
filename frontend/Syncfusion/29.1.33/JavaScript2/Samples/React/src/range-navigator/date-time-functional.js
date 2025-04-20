"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionColor = exports.borderColor = exports.themes = exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for DateTime Axis Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var stock_data_1 = require("./stock-data");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.themes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
exports.borderColor = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
exports.regionColor = ['rgba(99, 85, 199, 0.3)', 'rgba(143, 128, 244, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(47, 64, 116, 0.3)', 'rgba(128, 41, 241, 0.3)'];
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n     #days {\n         font-size: 15px;\n         font-style: normal;\n         font-family: \"Segoe UI\";\n         font-weight: 500;\n         text-anchor: middle;\n         transform: none;\n         opacity: 1;\n     }\n     #control-container {\n         padding: 0px !important;\n     }\n \n     #material-gradient-chart stop {\n         stop-color: #00bdae;\n     }\n \n     #fabric-gradient-chart stop {\n         stop-color: #4472c4;\n     }\n \n     #bootstrap-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n \n     #bootstrap4-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n \n     #highcontrast-gradient-chart stop {\n         stop-color: #79ECE4;\n     }\n \n    #tailwind-gradient-chart stop {\n        stop-color: #5A61F6;;\n    }\n\n\t#tailwind3-gradient-chart stop {\n        stop-color: #2F4074;;\n    }\n \n     #bootstrap5-gradient-chart stop {\n        stop-color: #FD7E14;\n     }\n \n     #material-dark-gradient-chart stop {\n         stop-color: #9ECB08;\n     }\n \n     #fabric-dark-gradient-chart stop {\n         stop-color: #4472c4;\n     }\n \n     #bootstrap-dark-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n \n     #tailwind-dark-gradient-chart stop {\n        stop-color: #8B5CF6;\n    }\n    #tailwind3-dark-gradient-chart stop {\n        stop-color: #8029F1;\n    }\n \n     #bootstrap5-dark-gradient-chart stop {\n         stop-color: #8F80F4;\n     }\n \n     #fluent-gradient-chart stop {\n         stop-color: #1AC9E6;\n     }\n \n     #fluent-dark-gradient-chart stop {\n         stop-color: #1AC9E6;\n     }\n\n     #material3-gradient-chart stop {\n        stop-color: #6355C7;\n     }\n\n     #material3-dark-gradient-chart stop {\n        stop-color: #4EAAFF;\n     }\n \n     #fluent2-gradient-chart stop {\n        stop-color: #6200EE;\n    }\n\n    #fluent2-highcontrast-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n\n    #fluent2-dark-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n\n     .chart-gradient stop[offset=\"0\"] {\n         stop-opacity: 0.9;\n     }\n \n     .chart-gradient stop[offset=\"1\"] {\n         stop-opacity: 0.3;\n     }\n     ";
function DateTimeAxis() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chart1;
    var rangenavigator1;
    var chartRendered;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row", style: { textAlign: "center" } },
                React.createElement("div", { id: "days" }, "EUR Exchange Rate from USD")),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenavigator) { return rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, labelPosition: 'Outside', valueType: 'DateTime', majorTickLines: {
                        width: 0
                    }, tooltip: { enable: true, format: 'yyyy/MM/dd', displayMode: 'Always' }, value: [new Date('2011-01-01'), new Date('2013-12-31')], width: ej2_base_1.Browser.isDevice ? '100%' : '80%', load: rangeLoad.bind(this), changed: changed.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.RangeTooltip] }),
                    React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: stock_data_1.stockData, xName: 'x', yName: 'y', type: 'Area', width: 2, animation: { enable: false }, border: { width: 2 } })))),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'DateTime',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    }, primaryYAxis: {
                        labelFormat: 'n1',
                        minimum: 0.6,
                        maximum: 1,
                        interval: 0.1,
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', legendSettings: { visible: false }, load: chartLoad.bind(this), height: '350', chartArea: { border: { width: 0 } }, tooltip: {
                        enable: true, shared: true
                    }, crosshair: {
                        enable: false,
                        lineType: 'None'
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Crosshair, ej2_react_charts_1.DateTime, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { name: 'Rate', type: 'Spline', dataSource: stock_data_1.stockData, xName: 'x', yName: 'y', width: 2 })))),
            React.createElement("svg", { style: { height: '0' } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "material-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fabric-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap4-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "highcontrast-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap5-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind3-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind3-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fabric-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap5-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material3-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material3-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent2-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent2-highcontrast-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent2-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes rendering of date-time in the range navigator with exchange rate analysis of EUR to USD.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Date-time data is used in this sample, and the selected range values are showed with tooltip. Date-time axis uses date-time scale and displays date-time values as axis labels. To render date-time axis, set the ",
                React.createElement("code", null, "valueType"),
                " to ",
                React.createElement("code", null, "DateTime"),
                ". Format of the axis label will be calculated based on the intervalType of the range navigator. You can also directly set the format using the labelFormat property."),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "The range navigator component features are segregated into individual feature-wise modules. To use area series, inject the ",
                React.createElement("code", null, "AreaSeries"),
                " module using ",
                React.createElement("code", null, "RangeNavigator.Inject(AreaSeries)"),
                " method. To use date time axis, inject the ",
                React.createElement("code", null, "DateTime"),
                " module using ",
                React.createElement("code", null, "RangeNavigator.Inject(DateTime)"),
                " method."))));
    function changed(args) {
        if (chart1 && chartRendered) {
            chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            chart1.dataBind();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    }
    ;
    function chartLoad(args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        (0, theme_color_1.loadRangeNavigatorTheme)(args);
        chartRendered = true;
    }
    ;
    function rangeLoad(args) {
        var selectedTheme = (0, theme_color_1.loadRangeNavigatorTheme)(args, true);
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = exports.borderColor[exports.themes.indexOf(args.rangeNavigator.theme.toLowerCase())];
    }
    ;
}
exports.default = DateTimeAxis;
