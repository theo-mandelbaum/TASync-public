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
exports.StackedBar = exports.data4 = exports.data3 = exports.data2 = exports.data = void 0;
/**
 * Sample for stackingBar series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { x: 'Sochi 2014', y: 9 },
    { x: 'Rio 2016', y: 46 },
    { x: ej2_base_1.Browser.isDevice ? 'Pyeongchang <br> 2018' : 'Pyeongchang 2018', y: 9 },
    { x: 'Tokyo 2020', y: 39 },
    { x: 'Beijing 2022', y: 8 },
];
exports.data2 = [
    { x: 'Sochi 2014', y: 10 },
    { x: 'Rio 2016', y: 4 },
    { x: ej2_base_1.Browser.isDevice ? 'Pyeongchang <br> 2018' : 'Pyeongchang 2018', y: 11 },
    { x: 'Tokyo 2020', y: 7 },
    { x: 'Beijing 2022', y: 4 }
];
exports.data3 = [
    { x: 'Sochi 2014', y: 4 },
    { x: 'Rio 2016', y: 10 },
    { x: ej2_base_1.Browser.isDevice ? 'Pyeongchang <br> 2018' : 'Pyeongchang 2018', y: 5 },
    { x: 'Tokyo 2020', y: 10 },
    { x: 'Beijing 2022', y: 5 }
];
exports.data4 = [
    { x: 'Sochi 2014', y: 8 },
    { x: 'Rio 2016', y: 17 },
    { x: ej2_base_1.Browser.isDevice ? 'Pyeongchang <br> 2018' : 'Pyeongchang 2018', y: 14 },
    { x: 'Tokyo 2020', y: 10 },
    { x: 'Beijing 2022', y: 12 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StackedBar = /** @class */ (function (_super) {
    __extends(StackedBar, _super);
    function StackedBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedBar.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { enableHighlight: true }, primaryXAxis: { valueType: 'Category', labelPlacement: 'BetweenTicks' }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', primaryYAxis: {
                        majorTickLines: { width: 0 },
                        edgeLabelPlacement: 'Shift'
                    }, load: this.load.bind(this), enableRotation: true, rotation: 25, tilt: 18, depth: 100, title: 'Olympic Gold Medal Comparison', loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingBarSeries3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Legend3D, ej2_react_charts_1.Tooltip3D, ej2_react_charts_1.Highlight3D] }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', columnWidth: 0.6, name: 'America', type: 'StackingBar' }),
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', columnWidth: 0.6, name: 'Canada', type: 'StackingBar' }),
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', columnWidth: 0.6, name: 'France', type: 'StackingBar' }),
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data4, xName: 'x', yName: 'y', columnWidth: 0.6, name: 'Germany', type: 'StackingBar' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This 3D stacked bar chart example visualizes a comparison of several Olympic medal-winning countries using the stacked bar series. The legend in the sample provides additional information about the series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a 3D stacked bar chart. The stacked bar chart stacks points in the series horizontally. Additionally, the ",
                    React.createElement("code", null, "StackingGroup"),
                    " property can be used to group stacked collections based on category."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "3D chart component features are segregated into individual feature-wise modules. To use stacking bar series, we need to inject",
                    React.createElement("code", null, "StackingBarSeries3D"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the 3D chart can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/chart-types/#bar-chart", "aria-label": "Navigate to the documentation for React 3D bar chart" }, "documentation section"),
                    "."))));
    };
    StackedBar.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    StackedBar.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return StackedBar;
}(sample_base_1.SampleBase));
exports.StackedBar = StackedBar;
