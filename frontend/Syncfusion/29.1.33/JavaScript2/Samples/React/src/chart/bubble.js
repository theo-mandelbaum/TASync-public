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
exports.Bubble = exports.data = exports.pointRender = void 0;
/**
 * Sample for Bubble Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var pointRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_1.bubbleFabricColors[args.point.index % 10];
        args.border.color = theme_color_1.pointFabricColors[args.point.index % 10];
        ;
    }
    else if (selectedTheme === 'material-dark') {
        args.fill = theme_color_1.bubbleMaterialDarkColors[args.point.index % 10];
        args.border.color = theme_color_1.pointMaterialDarkColors[args.point.index % 10];
        ;
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_1.bubbleMaterialColors[args.point.index % 10];
        args.border.color = theme_color_1.pointMaterialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = theme_color_1.bubbleBootstrap5DarkColors[args.point.index % 10];
        args.border.color = theme_color_1.pointBootstrap5DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5') {
        args.fill = theme_color_1.bubbleBootstrap5Colors[args.point.index % 10];
        args.border.color = theme_color_1.pointBootstrap5Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap') {
        args.fill = theme_color_1.bubbleBootstrapColors[args.point.index % 10];
        args.border.color = theme_color_1.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap4') {
        args.fill = theme_color_1.bubbleBootstrapColors[args.point.index % 10];
        args.border.color = theme_color_1.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap-dark') {
        args.fill = theme_color_1.bubbleBootstrapColors[args.point.index % 10];
        args.border.color = theme_color_1.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = theme_color_1.bubbleHighContrastColors[args.point.index % 10];
        args.border.color = theme_color_1.pointHighContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent-dark') {
        args.fill = theme_color_1.bubbleFluentDarkColors[args.point.index % 10];
        args.border.color = theme_color_1.pointFluentDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent') {
        args.fill = theme_color_1.bubbleFluentColors[args.point.index % 10];
        args.border.color = theme_color_1.pointFluentColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind-dark') {
        args.fill = theme_color_1.bubbleTailwindDarkColors[args.point.index % 10];
        args.border.color = theme_color_1.pointTailwindDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind') {
        args.fill = theme_color_1.bubbleTailwindColors[args.point.index % 10];
        args.border.color = theme_color_1.pointTailwindColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3') {
        args.fill = theme_color_1.bubbleMaterial3Colors[args.point.index % 10];
        args.border.color = theme_color_1.pointMaterial3Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3-dark') {
        args.fill = theme_color_1.bubbleMaterial3DarkColors[args.point.index % 10];
        args.border.color = theme_color_1.pointMaterial3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3-dark') {
        args.fill = theme_color_1.bubbleTailwind3DarkColors[args.point.index % 10];
        args.border.color = theme_color_1.pointTailwind3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3') {
        args.fill = theme_color_1.bubbleTailwind3Colors[args.point.index % 10];
        args.border.color = theme_color_1.pointTailwind3Colors[args.point.index % 10];
    }
};
exports.pointRender = pointRender;
exports.data = [
    { x: 92.2, y: 7.8, size: 1.347, text: 'China', r: 'China' },
    { x: 74, y: 6.5, size: 1.241, text: 'India', r: 'India' },
    { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia', r: ej2_base_1.Browser.isDevice ? 'ID' : 'Indonesia' },
    { x: 99.4, y: 2.2, size: 0.312, text: 'United States', r: 'US' },
    { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil', r: ej2_base_1.Browser.isDevice ? 'BR' : 'Brazil' },
    { x: 99, y: 0.7, size: 0.0818, text: 'Germany', r: ej2_base_1.Browser.isDevice ? 'DE' : 'Germany' },
    { x: 72, y: 2.0, size: 0.0826, text: 'Egypt', r: ej2_base_1.Browser.isDevice ? 'EG' : 'Egypt' },
    { x: 99.6, y: 3.4, size: 0.143, text: 'Russia', r: ej2_base_1.Browser.isDevice ? 'RUS' : 'Russia' },
    { x: 96.5, y: 0.2, size: 0.128, text: 'Japan', r: ej2_base_1.Browser.isDevice ? 'JP' : 'Japan' },
    { x: 86.1, y: 4.0, size: 0.115, text: 'MeLiteracy Ion', r: 'MLI' },
    { x: 92.6, y: 5.2, size: 0.096, text: 'Philippines', r: 'PH' },
    { x: 61.3, y: 1.45, size: 0.162, text: 'Nigeria', r: 'Nigeria' },
    { x: 82.2, y: 3.97, size: 0.7, text: 'Hong Kong', r: ej2_base_1.Browser.isDevice ? 'HK' : 'Hong Kong' },
    { x: 79.2, y: 4.9, size: 0.162, text: 'Netherland', r: 'NL' },
    { x: 72.5, y: 4.5, size: 0.7, text: 'Jordan', r: 'Jordan' },
    { x: 81, y: 2.5, size: 0.21, text: 'Australia', r: ej2_base_1.Browser.isDevice ? 'AU' : 'Australia' },
    { x: 66.8, y: 3.9, size: 0.028, text: 'Mongolia', r: 'MN' },
    { x: 78.4, y: 2.9, size: 0.231, text: 'Taiwan', r: ej2_base_1.Browser.isDevice ? 'TW' : 'Taiwan' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    ellipse[id*=_Trackball_0] {\n\n        strokeWidth: 1 !important;\n    } \n";
/**
 * Bubble sample
 */
var Bubble = /** @class */ (function (_super) {
    __extends(Bubble, _super);
    function Bubble() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bubble.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        minimum: 65,
                        maximum: 102,
                        interval: 5,
                        crossesAt: 5
                    }, load: this.load.bind(this), primaryYAxis: {
                        minimum: 0,
                        maximum: 10,
                        crossesAt: 85,
                        interval: 2.5
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'World Countries Details', pointRender: exports.pointRender, legendSettings: { visible: false }, loaded: this.onChartLoad.bind(this), tooltip: {
                        enableMarker: false,
                        enable: true,
                        header: "<b>${point.tooltip}</b>",
                        format: "Literacy Rate : <b>${point.x}%</b> <br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>"
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BubbleSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, type: 'Bubble', minRadius: 3, maxRadius: 8, tooltipMappingName: 'text', border: { width: 2 }, xName: 'x', yName: 'y', size: 'size', marker: { dataLabel: { visible: true, name: 'r', position: 'Middle', font: { fontWeight: '500', color: '#ffffff' } } } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React bubble chart example visualizes the literacy rates and GDP growth rates of countries. A tooltip shows more information about the countries.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the bubble chart. The bubble chart is a type of chart that shows three dimensions of the data. Each point is drawn as a bubble, where the bubble's size depends on the ",
                    React.createElement("code", null, "Size"),
                    " property. You can also use the ",
                    React.createElement("code", null, "Fill"),
                    " property to customize the data appearance."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use bubble series, we need to inject",
                    React.createElement("code", null, "BubbleSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the bubble series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/chart-types/#bubble-chart", "aria-label": "Navigate to the documentation for Bubble Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    Bubble.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Bubble.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return Bubble;
}(sample_base_1.SampleBase));
exports.Bubble = Bubble;
