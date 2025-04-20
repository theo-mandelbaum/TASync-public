"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data1 = void 0;
/**
 * Sample for Bar series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'Japan', y: 1.71 }, { x: 'France', y: 1.82 },
    { x: 'India', y: 6.68 }, { x: 'Germany', y: 2.22 }, { x: 'Italy', y: 1.50 }, { x: 'Canada', y: 3.05 }
];
exports.data2 = [
    { x: 'Japan', y: 6.02 }, { x: 'France', y: 3.19 },
    { x: 'India', y: 3.28 }, { x: 'Germany', y: 4.56 }, { x: 'Italy', y: 2.40 }, { x: 'Canada', y: 2.04 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Bar sample
 */
var Bar = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.load3DChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", null,
                React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { enableHighlight: true }, rotation: 22, depth: 100, height: '400', enableRotation: true, primaryXAxis: { valueType: 'Category', labelPlacement: 'BetweenTicks' }, primaryYAxis: { labelFormat: '{value}%', maximum: ej2_base_1.Browser.isDevice ? 8 : 7, interval: ej2_base_1.Browser.isDevice ? 2 : 1, edgeLabelPlacement: 'Shift' }, load: load.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '70%', title: 'GDP Percentage by Country in 2017', loaded: onChartLoad.bind(_this), tooltip: { enable: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BarSeries3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Legend3D, ej2_react_charts_1.Tooltip3D, ej2_react_charts_1.Highlight3D] }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', type: 'Bar', columnSpacing: 0.1, name: 'GDP' }),
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', type: 'Bar', columnSpacing: 0.1, name: "Share in World's GDP" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the GDP data by country for the year 2017 using bar series in a 3D chart. Data points are enhanced with tooltips.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure a 3D bar chart. The 3D bar chart, similar to the 3D column chart, differs in that the orientation of the y-axis is horizontal rather than vertical."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject ",
                React.createElement("code", null, "BarSeries3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = Bar;
