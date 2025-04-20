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
exports.RTL = exports.regionColor = exports.borderColor = exports.themes = exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for RTL Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var stock_data_1 = require("./stock-data");
var sample_base_1 = require("../common/sample-base");
var data = stock_data_1.axesData;
exports.themes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentDark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
exports.borderColor = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
exports.regionColor = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(97, 69, 112, 0.3)', 'rgba(138, 177, 19, 0.3)', 'rgba(47, 64, 116, 0.3)', 'rgba(128, 41, 241, 0.3)'];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #title{\n        font-size: 15px;\n        font-style: normal;\n        font-family: \"Segoe UI\";\n        font-weight: 500;\n        text-anchor: middle;\n        transform: none;\n        opacity: 1;\n    }\n    #control-container {\n        padding: 0px !important;\n    }\n\n    #container {\n        transform: translate(0, 25%);\n    }\n\n    #material-gradient-chart stop {\n        stop-color: #00bdae;\n    }\n\n    #fabric-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #bootstrap4-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #highcontrast-gradient-chart stop {\n        stop-color: #79ECE4;\n    }\n\n   #tailwind-gradient-chart stop {\n        stop-color: #5A61F6;\n    }\n\n\t#tailwind3-gradient-chart stop {\n        stop-color: #2F4074;\n    }\n\n    #bootstrap5-gradient-chart stop {\n        stop-color: #FD7E14;\n    }\n\n    #material-dark-gradient-chart stop {\n        stop-color: #9ECB08;\n    }\n\n    #fabric-dark-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-dark-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n     #tailwinddark-gradient-chart stop {\n        stop-color: #8B5CF6;\n    }\n\n    #tailwind3-dark-gradient-chart stop {\n        stop-color: #8029F1;\n    }\n\n    #bootstrap5-dark-gradient-chart stop {\n        stop-color: #5ECB9B;\n    }\n\n    #fluent-gradient-chart stop {\n        stop-color: #614570;\n    }\n\n    #fluent-dark-gradient-chart stop {\n        stop-color: #8AB113;\n    }\n\n    #material3-gradient-chart stop {\n        stop-color: #6355C7;\n    }\n\n    #material3-dark-gradient-chart stop {\n        stop-color: #4EAAFF;\n    }\n\n    .chart-gradient stop[offset=\"0\"] {\n        stop-opacity: 0.9;\n    }\n\n    .chart-gradient stop[offset=\"1\"] {\n        stop-opacity: 0.3;\n    }\n    ";
var RTL = /** @class */ (function (_super) {
    __extends(RTL, _super);
    function RTL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTL.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row", style: { textAlign: "center" } },
                    React.createElement("div", { id: "title" }, "Inflation - Consumer Price")),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenavigator) { return _this.rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, height: '120', labelPosition: 'Outside', tooltip: { enable: true, displayMode: 'Always' }, valueType: 'DateTime', intervalType: 'Years', load: this.rangeLoad.bind(this), changed: this.changed.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', enableRtl: true, value: [new Date('2014-01-01'), new Date('2015-12-31')] },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.RangeTooltip] }),
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: data, xName: 'xDate', yName: 'High', type: 'Area', width: 2 })))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', enableRtl: true, ref: function (chart) { return _this.chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                            labelFormat: '{value}%',
                            minimum: 82, maximum: 87, interval: 1
                        }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', height: '350', load: this.chartLoad.bind(this), chartArea: { border: { width: 0 } }, tooltip: {
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
                            React.createElement("stop", { offset: "1" })))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample visualizes the consumer price with Range Navigator and Chart in RTL direction.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
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
                            " is enabled in this example, to see the tooltip in action, while the selected range is changed.")),
                    React.createElement("br", null),
                    React.createElement("p", null,
                        React.createElement("b", null, "Injecting Module")),
                    React.createElement("p", null,
                        "The range navigator component features are segregated into individual feature-wise modules. To use area series, inject the",
                        React.createElement("code", null, "AreaSeries"),
                        " module using the",
                        React.createElement("code", null, "RangeNavigator.Inject(AreaSeries)"),
                        " method.")))));
    };
    RTL.prototype.changed = function (args) {
        if (this.chart1 && this.chartRendered) {
            this.chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chart1.dataBind();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    };
    ;
    RTL.prototype.chartLoad = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        var chartTheme = args.chart.theme;
        args.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border.color = exports.borderColor[exports.themes.indexOf(chartTheme.toLowerCase())];
        args.chart.series[0].border.width = 2;
        this.chartRendered = true;
    };
    ;
    RTL.prototype.rangeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        var rangeTheme = args.rangeNavigator.theme;
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = exports.borderColor[exports.themes.indexOf(rangeTheme.toLowerCase())];
        args.rangeNavigator.series[0].border.width = 2;
    };
    ;
    return RTL;
}(sample_base_1.SampleBase));
exports.RTL = RTL;
