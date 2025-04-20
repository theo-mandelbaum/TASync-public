"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Circular Pie 3D Chart with various radius.
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'Belgium', y: 551500, r: ej2_base_1.Browser.isDevice ? '120' : '110.7', text: 'Belgium' },
    { x: 'Dominican Republic', y: 312685, r: '137.5', text: 'Dominican Republic' },
    { x: 'Cuba', y: 350000, r: '124.6', text: 'Cuba' },
    { x: 'Egypt', y: 301000, r: ej2_base_1.Browser.isDevice ? '130.8' : '150.8', text: 'Egypt' },
    { x: 'Kazakhstan', y: 300000, r: ej2_base_1.Browser.isDevice ? '135.5' : '155.5', text: 'Kazakhstan' },
    { x: 'Somalia', y: 357022, r: ej2_base_1.Browser.isDevice ? '104.6' : '160.6', text: 'Somalia' },
    { x: 'Argentina', y: 505370, r: ej2_base_1.Browser.isDevice ? '110' : '100', text: 'Argentina' },
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Circular Pie 3D Chart sample.
 */
var PieRadius = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadCircular3DChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", null,
                React.createElement(ej2_react_charts_1.CircularChart3DComponent, { id: 'charts', style: { textAlign: "center" }, rotation: 15, legendSettings: { visible: true, reverse: true }, load: load.bind(_this), title: 'Population Density per Square Kilometer by Country', loaded: onChartLoad.bind(_this), enableAnimation: false, tilt: -15, tooltip: { enable: true, format: '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries3D, ej2_react_charts_1.CircularChartDataLabel3D, ej2_react_charts_1.CircularChartLegend3D, ej2_react_charts_1.CircularChartTooltip3D, ej2_react_charts_1.CircularChartHighlight3D] }),
                    React.createElement(ej2_react_charts_1.CircularChart3DSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.CircularChart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', radius: 'r', tooltipMappingName: 'r', innerRadius: '20%', animation: { enable: false }, dataLabel: {
                                visible: true, position: ej2_base_1.Browser.isDevice ? 'Inside' : 'Outside', name: 'text', enableRotation: true, font: { fontWeight: '600' }, connectorStyle: { length: '20px' }
                            } }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample compares countries by population density and total area using various radii in a 3D pie series.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render a 3D donut chart with varying radii. You can use the",
                React.createElement("code", null, "radius"),
                " mapping property to achieve this feature. The data labels are used to represent individual data and its values. In addition, the sample shows how to change the order of legend for the donut chart by using the ",
                React.createElement("code", null, "reverse"),
                " property."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example. To see the tooltip in action, hover over a point or tap on a point on touch-enabled devices. "),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D circular chart component features are segregated into individual feature-wise modules. To use legend, you need to Inject the ",
                React.createElement("code", null, "CircularChartLegend3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = PieRadius;
