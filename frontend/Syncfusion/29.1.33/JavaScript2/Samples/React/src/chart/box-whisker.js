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
exports.BoxWhisker = exports.data1 = exports.pointRender = void 0;
/**
 * Sample for Box and Whisker
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var base_1 = require("@syncfusion/ej2/base");
var pointRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_1.fabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_1.materialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent') {
        args.fill = theme_color_1.fluentColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent-dark') {
        args.fill = theme_color_1.fluentDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3-dark') {
        args.fill = theme_color_1.pointTailwind3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3') {
        args.fill = theme_color_1.pointTailwind3Colors[args.point.index % 10];
    }
    else {
        args.fill = theme_color_1.bootstrapColors[args.point.index % theme_color_1.bootstrapColors.length];
    }
    args.border.color = (0, ej2_react_charts_1.getSaturationColor)(args.fill, -0.6);
};
exports.pointRender = pointRender;
exports.data1 = [
    { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
    { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
    { x: 'HR', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
    { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
    { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
    { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
    { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
    { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
    { x: 'Training', y: [28, 29, 30, 31, 32, 34, 35, 36] }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * BoxWhisker sample
 */
var BoxWhisker = /** @class */ (function (_super) {
    __extends(BoxWhisker, _super);
    function BoxWhisker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Normal' },
            { value: 'Exclusive' },
            { value: 'Inclusive' }
        ];
        return _this;
    }
    BoxWhisker.prototype.change = function () {
        this.chartInstance.series[0].boxPlotMode = this.dropElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ;
    BoxWhisker.prototype.check = function () {
        this.chartInstance.series[0].showMean = this.checkElement.checked;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ;
    BoxWhisker.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', labelIntersectAction: base_1.Browser.isDevice ? 'None' : 'Rotate45', labelRotation: base_1.Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, primaryYAxis: { title: 'Age', minimum: 10, maximum: 60, interval: 10, majorGridLines: { width: 1 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, pointRender: exports.pointRender, load: this.load.bind(this), width: base_1.Browser.isDevice ? '100%' : '75%', title: "Employee Age Group in Various Department", loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.BoxAndWhiskerSeries, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', type: 'BoxAndWhisker', marker: { visible: true, height: 7, width: 7 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Box and Whisker Chart example visualizes the employee\u2019s age group in various departments of a company with box and whisker chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure a box and whisker chart or box plot. This chart is used to visualize a group of numerical data through their data quartiles. Box plots may also have lines extending vertically from the boxes (whiskers) indicating variability outside the upper and lower quartiles. Marker and DataLabel are used to represent individual data and its values."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use BoxAndWhisker series, we need to inject",
                    React.createElement("code", null, "BoxAndWhiskerSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Box and Whisker series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/other-types/#boxplotmode", "aria-label": "Navigate to the documentation for Box and Whisker in React Chart component" }, "documentation section"),
                    "."))));
    };
    BoxWhisker.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    BoxWhisker.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return BoxWhisker;
}(sample_base_1.SampleBase));
exports.BoxWhisker = BoxWhisker;
