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
exports.Numeric = exports.labelRender = exports.data2 = exports.data1 = void 0;
/**
 * Sample for numeric axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 16, y: 2 }, { x: 17, y: 14 },
    { x: 18, y: 7 }, { x: 19, y: 7 },
    { x: 20, y: 10 }
];
exports.data2 = [
    { x: 16, y: 7 }, { x: 17, y: 7 },
    { x: 18, y: 11 }, { x: 19, y: 8 },
    { x: 20, y: 24 }
];
var labelRender = function (args) {
    if (args.axis.orientation === 'Horizontal') {
        args.cancel = args.value === 15 || args.value === 21;
    }
};
exports.labelRender = labelRender;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var Numeric = /** @class */ (function (_super) {
    __extends(Numeric, _super);
    function Numeric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Numeric.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Death Overs',
                        minimum: 15,
                        maximum: 21,
                        interval: 1,
                        majorGridLines: { width: 0 }
                    }, load: this.load.bind(this), primaryYAxis: {
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                        labelStyle: {
                            color: 'transparent'
                        }
                    }, axisLabelRender: exports.labelRender, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, title: 'England vs West Indies', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, format: '${point.x}th Over : <b>${point.y} Runs</b>', enableHighlight: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', fill: '#1e90ff', marker: {
                                dataLabel: {
                                    visible: true,
                                    position: 'Top',
                                    font: {
                                        fontWeight: '600'
                                    }
                                }
                            }, name: 'England', type: 'Column', width: 2 }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', fill: '#b22222', marker: {
                                dataLabel: {
                                    visible: true,
                                    position: 'Top',
                                    font: {
                                        fontWeight: '600'
                                    }
                                }
                            }, name: 'West Indies', type: 'Column', width: 2 }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "http://www.espncricinfo.com/icc-world-twenty20-2016/engine/current/match/951373.html", target: "_blank", "aria-label": "Navigate to the documentation for espncricinfo" }, "www.espncricinfo.com"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of numeric axis in the chart with England and West indies cricket match data.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Numeric axis is used to plot numeric data in chart. To render numeric axis, set ",
                    React.createElement("code", null, "valueType"),
                    " in axis to ",
                    React.createElement("code", null, "Double"),
                    "."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    "More information on the Numeric axis can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/numeric-axis/", "aria-label": "Navigate to the documentation for Numeric Axis in React Chart component" }, "documentation section"),
                    "."))));
    };
    Numeric.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Numeric.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].fill = '#57BCFF';
            args.chart.series[1].fill = '#E58184';
        }
    };
    ;
    return Numeric;
}(sample_base_1.SampleBase));
exports.Numeric = Numeric;
