"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var data = [
    { x: 'Internet Explorer', y: 6.12, text: ej2_base_1.Browser.isDevice ? 'Internet Explorer:<br> 6.12%' : 'Internet Explorer: 6.12%' },
    { x: 'Chrome', y: 57.28, text: ej2_base_1.Browser.isDevice ? 'Chrome:<br> 57.282%' : 'Chrome: 57.28%' },
    { x: 'Safari', y: 4.73, text: ej2_base_1.Browser.isDevice ? 'Safari:<br> 4.73%' : 'Safari: 4.73%' },
    { x: 'QQ', y: 5.96, text: ej2_base_1.Browser.isDevice ? 'QQ:<br>5.96%' : 'QQ: 5.96%' },
    { x: 'UC Browser', y: 4.37, text: ej2_base_1.Browser.isDevice ? 'UC Browser:<br>4.37%' : 'UC Browser: 4.37%' },
    { x: 'Edge', y: 7.48, text: ej2_base_1.Browser.isDevice ? 'Edge:<br> 7.48%' : 'Edge: 7.48%' },
    { x: 'Others', y: 14.06, text: ej2_base_1.Browser.isDevice ? 'Others:<br> 14.06%' : 'Others: 14.06%' }
];
var PieWithPattern = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onPointRender = function (args) {
        (0, theme_color_1.accpatternPointRender)(args);
    };
    var load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', style: { textAlign: 'center' }, title: 'Browser Market Share', load: load.bind(_this), enableBorderOnMouseMove: false, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', pointRender: onPointRender.bind(_this), tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "", enableHighlight: true }, legendSettings: { visible: false } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.PieSeries] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: data, xName: 'x', yName: 'y', type: 'Pie', applyPattern: true, dataLabel: {
                            visible: true,
                            position: 'Outside',
                            name: 'text',
                            font: { fontWeight: '600' },
                            connectorStyle: { length: '20px', type: 'Curve' }
                        }, border: { width: 2 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Mobile Browser Market Share using a pie chart with various patterns.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a pie chart with different patterns. The pie chart is a circular graphic ideal for displaying categories as a proportion or percentage of the whole. You can apply different patterns to the pie slices using the ",
                React.createElement("code", null, "applyPattern"),
                " property in the series and the ",
                React.createElement("code", null, "pointRender"),
                " event."),
            React.createElement("p", null,
                "More information on the pie series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/accumulation-chart/pie-dough-nut/#pie-chart", "aria-label": "Navigate to the documentation for Pie Chart in TypeScript Accumulation Chart control" }, "documentation section"),
                "."))));
};
exports.default = PieWithPattern;
