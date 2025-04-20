"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
exports.data1 = [
    { x: 'Argentina', y: 505370, r: ej2_base_1.Browser.isDevice ? '110' : '100', text: 'Argentina' },
    { x: 'Belgium', y: 551500, r: ej2_base_1.Browser.isDevice ? '120' : '118.7', text: 'Belgium' },
    { x: 'Dominican Republic', y: 312685, r: '137.5', text: ej2_base_1.Browser.isDevice ? 'Dominican <br> Republic' : 'Dominican Republic' },
    { x: 'Cuba', y: 350000, r: '124.6', text: 'Cuba' },
    { x: 'Egypt', y: 301000, r: '150.8', text: 'Egypt' },
    { x: 'Kazakhstan', y: 300000, r: '155.5', text: 'Kazakhstan' },
    { x: 'Somalia', y: 357022, r: '160.6', text: 'Somalia' }
];
var PieRadius = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var loaded = function (args) {
        var chart = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', legendSettings: { visible: true, reverse: true }, enableSmartLabels: true, title: 'Pie with different Radius', enableBorderOnMouseMove: false, enableAnimation: true, load: load.bind(_this), loaded: loaded.bind(_this), tooltip: { enable: true, format: '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>', enableHighlight: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', innerRadius: '20%', tooltipMappingName: 'r', dataLabel: { visible: true, position: ej2_base_1.Browser.isDevice ? 'Inside' : 'Outside', name: 'text', enableRotation: true, font: { fontWeight: '600' }, connectorStyle: { length: '20px', type: 'Curve' } }, radius: 'r' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample compares countries by population density and total area using various radius in a pie series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a doughnut chart with different radius. You can use the ",
                    React.createElement("code", null, "Radius"),
                    " mapping property to achieve this feature. ",
                    React.createElement("code", null, "DataLabels"),
                    " are used to represent individual data and its values. In addition, the sample shows how to change the order of legends for the doughnut chart by using the ",
                    React.createElement("code", null, "Reverse"),
                    " property."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Accumulation Chart component features are segregated into individual feature-wise modules.To use pie chart, you need to inject ",
                    React.createElement("code", null, "AccumulationLegend"),
                    " into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information about the pie series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#various-radius-pie-chart", "aria-label": "Navigate to the documentation for Various Radius Pie Chart in React Accumulation Chart component" }, "documentation section"),
                    ".")))));
};
exports.default = PieRadius;
