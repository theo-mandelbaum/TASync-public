"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for smart axis labels
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [{ x: 'Grapes', y: 28 }, { x: 'Apples', y: 87 },
    { x: 'Pears', y: 42 }, { x: 'Grapes', y: 13 },
    { x: 'Apples', y: 13 }, { x: 'Pears', y: 10 },
    { x: 'Tomato', y: 31 }, { x: 'Potato', y: 96 },
    { x: 'Cucumber', y: 41 }, { x: 'Onion', y: 59 }];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Multilevellabels = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var pointRender = function (args) {
        (0, theme_color_1.pointRenderEvent)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", null,
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', labelRotation: 90, border: { width: 1, type: 'Rectangle' }, isIndexed: true, interval: 1, majorGridLines: { width: 0 }, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'Rotate90' : 'Trim', multiLevelLabels: (ej2_base_1.Browser.isDevice ? ([{ border: { type: 'Rectangle' }, categories: [{ start: -0.5, end: 2.5, text: 'In Season' }, { start: 2.5, end: 5.5, text: 'Out of Season' }, { start: 5.5, end: 7.5, text: 'In Season' }, { start: 7.5, end: 9.5, text: 'Out of Season' }] }, { border: { type: 'Rectangle' }, textStyle: { fontWeight: 'Bold' }, categories: [{ start: -0.5, end: 5.5, text: 'Fruits' }, { start: 5.5, end: 9.5, text: 'Vegetables' }] }]) : [{ border: { type: 'Rectangle' }, categories: [{ start: -0.5, end: 0.5, text: 'Seedless' }, { start: 0.5, end: 2.5, text: 'Seeded' }, { start: 2.5, end: 3.5, text: 'Seedless' }, { start: 3.5, end: 5.5, text: 'Seeded' }, { start: 5.5, end: 6.5, text: 'Seedless' }, { start: 6.5, end: 7.5, text: 'Seeded' }, { start: 7.5, end: 8.5, text: 'Seedless' }, { start: 8.5, end: 9.5, text: 'Seeded' }] }, { border: { type: 'Rectangle' }, categories: [{ start: -0.5, end: 2.5, text: 'In Season' }, { start: 2.5, end: 5.5, text: 'Out of Season' }, { start: 5.5, end: 7.5, text: 'In Season' }, { start: 7.5, end: 9.5, text: 'Out of Season' }] }, { border: { type: 'Rectangle' }, textStyle: { fontWeight: 'Bold' }, categories: [{ start: -0.5, end: 5.5, text: 'Fruits' }, { start: 5.5, end: 9.5, text: 'Vegetables' }] }]) }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, primaryYAxis: { minimum: 0, maximum: 120, interval: 30, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }, load: load.bind(_this), pointRender: pointRender, title: "Fruits and Vegetables - Season", loaded: onChartLoad.bind(_this), legendSettings: { visible: false }, tooltip: { enable: false } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.MultiLevelLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', type: 'Column', marker: { dataLabel: { visible: true, position: 'Outer' } } }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example shows multilevel labels in the chart axis. We can add layers of labels to the axis using start and end range values.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to group axis labels. You can customize text in each level by using ",
                React.createElement("code", null, "alignment"),
                ", ",
                React.createElement("code", null, "overflow"),
                ", ",
                React.createElement("code", null, "textSytle"),
                " and ",
                React.createElement("code", null, "border"),
                " properties."),
            React.createElement("p", null,
                "Axis labels in each level can be arranged smartly using ",
                React.createElement("code", null, "overflow"),
                " property."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Trim"),
                    " - Trim the label when it intersect."),
                React.createElement("li", null,
                    React.createElement("code", null, "Wrap"),
                    " - Wrap the label when it intersect."),
                React.createElement("li", null,
                    React.createElement("code", null, "None"),
                    " - Shows all the labels.")),
            React.createElement("p", null,
                "Border of the axis labels can be customized by using ",
                React.createElement("code", null, "type"),
                " property."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Rectangle")),
                React.createElement("li", null,
                    React.createElement("code", null, "Brace")),
                React.createElement("li", null,
                    React.createElement("code", null, "WithoutTopBorder")),
                React.createElement("li", null,
                    React.createElement("code", null, "WithoutTopandBottomBorder")),
                React.createElement("li", null,
                    React.createElement("code", null, "CurlyBrace")),
                React.createElement("li", null,
                    React.createElement("code", null, "withoutBorder"),
                    ".")),
            React.createElement("p", null,
                "More information on the multi level labels can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/axis-labels#multilevel-labels", "aria-label": "Navigate to the documentation for Multilevel Labels in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Multilevellabels;
