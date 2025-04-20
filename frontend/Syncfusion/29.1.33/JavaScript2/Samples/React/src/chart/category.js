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
exports.CategoryAxis = exports.categoryData = void 0;
/**
 * Sample for Category Axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
exports.categoryData = [
    { x: 'Facebook', y: 3049, country: 'Facebook: 3049' },
    { x: 'YouTube', y: 2491, country: 'YouTube: 2491' },
    { x: 'WhatsApp', y: 2000, country: 'WhatsApp: 2000' },
    { x: 'Instagram', y: 2000, country: 'Instagram: 2000' },
    { x: 'TikTok', y: 1562, country: 'TikTok:  1562' },
    { x: 'WeChat', y: 1336, country: 'WeChat: 1336' },
    { x: 'Facebook Messenger', y: 979, country: 'Facebook Messenger: 979' },
    { x: 'Telegram', y: 800, country: 'Telegram:  800' },
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Category sample
 */
var CategoryAxis = /** @class */ (function (_super) {
    __extends(CategoryAxis, _super);
    function CategoryAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryAxis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', enableWrap: true, maximumLabelWidth: 50, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, }, primaryYAxis: { labelFormat: '{value}M', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, legendSettings: { visible: false }, title: 'Active Users of Largest Social Networking Services (January 2024)', subTitle: 'Source: wikipedia.org', pointRender: this.pointRender.bind(this), loaded: this.onChartLoad.bind(this), tooltip: { enable: false, format: '${point.tooltip}' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BarSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.categoryData, xName: 'x', yName: 'y', type: 'Bar', width: 2, tooltipMappingName: 'country', marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff', size: ej2_base_1.Browser.isDevice ? '9px' : '11px' } } }, name: 'Users' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows a category axis in a chart with details about internet users across different countries.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "You can use the category axis to represent string values instead of numbers in the chart. To use the category axis, set ",
                    React.createElement("code", null, "ValueType"),
                    " in axis to ",
                    React.createElement("b", null, "Category"),
                    "."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Category axis, we need to inject ",
                    React.createElement("code", null, "Category"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Category axis can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/category-axis/", "aria-label": "Navigate to the documentation for Category Axis in React Chart component" }, "documentation section"),
                    "."))));
    };
    CategoryAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    CategoryAxis.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    CategoryAxis.prototype.pointRender = function (args) {
        (0, theme_color_1.pointRenderEvent)(args);
    };
    ;
    return CategoryAxis;
}(sample_base_1.SampleBase));
exports.CategoryAxis = CategoryAxis;
