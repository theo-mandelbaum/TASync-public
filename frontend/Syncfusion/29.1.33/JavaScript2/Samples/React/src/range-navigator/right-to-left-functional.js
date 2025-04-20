"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for RTL Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var stock_data_1 = require("./stock-data");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var theme_color_2 = require("./theme-color");
var data = stock_data_1.axesData;
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n     #title{\n         font-size: 15px;\n         font-style: normal;\n         font-family: \"Segoe UI\";\n         font-weight: 500;\n         text-anchor: middle;\n         transform: none;\n         opacity: 1;\n     }\n     #control-container {\n         padding: 0px !important;\n     }\n \n     #container {\n         transform: translate(0, 25%);\n     }\n \n     #material-gradient-chart stop {\n         stop-color: #00bdae;\n     }\n \n     #fabric-gradient-chart stop {\n         stop-color: #4472c4;\n     }\n \n     #bootstrap-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n \n     #bootstrap4-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n \n     #highcontrast-gradient-chart stop {\n         stop-color: #79ECE4;\n     }\n\n   #tailwind-gradient-chart stop {\n        stop-color: #5A61F6;\n    }\n\n\t#tailwind3-gradient-chart stop {\n        stop-color: #2F4074;\n    }\n \n     #bootstrap5-gradient-chart stop {\n        stop-color: #FD7E14;\n     }\n \n     #material-dark-gradient-chart stop {\n         stop-color: #9ECB08;\n     }\n \n     #fabric-dark-gradient-chart stop {\n         stop-color: #4472c4;\n     }\n \n     #bootstrap-dark-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n \n    #tailwinddark-gradient-chart stop {\n        stop-color: #8B5CF6;\n    }\n\n    #tailwind3-dark-gradient-chart stop {\n        stop-color: #8029F1;\n    }\n \n     #bootstrap5-dark-gradient-chart stop {\n         stop-color: #8F80F4;\n     }\n \n     #fluent-gradient-chart stop {\n         stop-color: #1AC9E6;\n     }\n \n     #fluent-dark-gradient-chart stop {\n         stop-color: #1AC9E6;\n     }\n\n     #material3-gradient-chart stop {\n         stop-color: #6355C7;\n     }\n\n     #material3-dark-gradient-chart stop {\n         stop-color: #4EAAFF;\n     }\n \n     #fluent2-gradient-chart stop {\n        stop-color: #6200EE;\n    }\n\n    #fluent2-highcontrast-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n\n    #fluent2-dark-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n\n     .chart-gradient stop[offset=\"0\"] {\n         stop-opacity: 0.9;\n     }\n \n     .chart-gradient stop[offset=\"1\"] {\n         stop-opacity: 0.3;\n     }\n     ";
function RTL() {
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
                React.createElement("div", { id: "title" }, "Inflation - Consumer Price")),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenavigator) { return rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, height: '120', labelPosition: 'Outside', tooltip: { enable: true, displayMode: 'Always' }, valueType: 'DateTime', intervalType: 'Years', load: rangeLoad.bind(this), changed: changed.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', enableRtl: true, value: [new Date('2014-01-01'), new Date('2015-12-31')] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.RangeTooltip] }),
                    React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: data, xName: 'xDate', yName: 'High', type: 'Area', width: 2 })))),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', enableRtl: true, ref: function (chart) { return chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'DateTime',
                        crosshairTooltip: { enable: true },
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    }, primaryYAxis: {
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                        labelFormat: '{value}%',
                        minimum: 82, maximum: 87, interval: 1
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', height: '350', load: chartLoad.bind(this), chartArea: { border: { width: 0 } }, tooltip: {
                        enable: true, shared: true,
                        header: '<b>England<b>', format: '${point.x} : <b>${point.y}<b>'
                    }, legendSettings: { visible: false } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data, name: 'England', xName: 'xDate', yName: 'High', type: 'Area', width: 2 })))),
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
                    React.createElement("linearGradient", { id: "tailwind3-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap5-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
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
                    React.createElement("linearGradient", { id: "tailwind3-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
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
                        React.createElement("stop", { offset: "1" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the consumer price with Range Navigator and Chart in RTL direction.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("code", null, "Right-to-left(RTL)"),
                    " is used to render the component from right to left direction and it can be enabled by setting ",
                    React.createElement("code", null, "enableRtl"),
                    " property as ",
                    React.createElement("b", null, "true"),
                    ". In this demo, you can see ",
                    React.createElement("code", null, "Axis"),
                    " and ",
                    React.createElement("code", null, "Data Points"),
                    " are aligned from right to left direction."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example, to see the tooltip in action, while the selected range is changed."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The range navigator component features are segregated into individual feature-wise modules. To use area series, inject the ",
                    React.createElement("code", null, "AreaSeries"),
                    " module using the ",
                    React.createElement("code", null, "RangeNavigator.Inject(AreaSeries)"),
                    " method.")))));
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
        var selectedTheme = (0, theme_color_1.loadRangeNavigatorTheme)(args, true);
        args.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border.color = theme_color_2.borderColor[theme_color_2.themes.indexOf(args.chart.theme.toLowerCase())];
        args.chart.series[0].border.width = 2;
        chartRendered = true;
    }
    ;
    function rangeLoad(args) {
        var selectedTheme = (0, theme_color_1.loadRangeNavigatorTheme)(args, true);
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = theme_color_2.borderColor[theme_color_2.themes.indexOf(args.rangeNavigator.theme.toLowerCase())];
        args.rangeNavigator.series[0].border.width = 2;
    }
    ;
}
exports.default = RTL;
