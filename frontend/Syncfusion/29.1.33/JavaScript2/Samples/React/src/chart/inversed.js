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
exports.InversedAxis = exports.data = exports.labelRender = void 0;
/**
 * Sample for Inversed axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var labelRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_1.fabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_1.materialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = theme_color_1.highContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent') {
        args.fill = theme_color_1.fluentColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent-dark') {
        args.fill = theme_color_1.fluentDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind') {
        args.fill = theme_color_1.pointTailwindColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind-dark') {
        args.fill = theme_color_1.pointTailwindDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3') {
        args.fill = theme_color_1.pointTailwind3Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3-dark') {
        args.fill = theme_color_1.pointTailwind3DarkColors[args.point.index % 10];
    }
    else {
        args.fill = theme_color_1.bootstrapColors[args.point.index % 10];
    }
};
exports.labelRender = labelRender;
exports.data = [
    { x: '2008', y: 15.1 }, { x: '2009', y: 16 }, { x: '2010', y: 21.4 },
    { x: '2011', y: 18 }, { x: '2012', y: 16.2 }, { x: '2013', y: 11 },
    { x: '2014', y: 7.6 }, { x: '2015', y: 1.5 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var InversedAxis = /** @class */ (function (_super) {
    __extends(InversedAxis, _super);
    function InversedAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InversedAxis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Category',
                        opposedPosition: true,
                        isInversed: true,
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, load: this.load.bind(this), primaryYAxis: {
                        edgeLabelPlacement: 'Shift',
                        labelIntersectAction: 'Rotate45',
                        isInversed: true,
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                        labelStyle: {
                            color: 'transparent'
                        }
                    }, pointRender: exports.labelRender, chartArea: { border: { width: 0 } }, legendSettings: { visible: false }, title: 'Exchange Rate (INR per USD)', width: ej2_base_1.Browser.isDevice ? '100%' : '75%', loaded: this.onChartLoad.bind(this), tooltip: {
                        enable: true
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend,
                            ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', type: 'Column', name: 'Rate', marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample uses an inverse axis in a chart to plot an exchange rate over a period of time.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to inverse an axis in chart. Here both the X and Y axis are inversed using ",
                    React.createElement("code", null, "isInversed"),
                    " property."),
                React.createElement("p", null, " DataLabel are used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    "More information on inversed axis can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#isInversed", "aria-label": "Navigate to the documentation for Inversed Axis in React Chart component" }, "documentation section"),
                    "."))));
    };
    InversedAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    InversedAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return InversedAxis;
}(sample_base_1.SampleBase));
exports.InversedAxis = InversedAxis;
