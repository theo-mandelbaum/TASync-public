"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { 'x': 'Chrome', y: 57.28, text: '57.28%' },
    { 'x': 'UC Browser', y: 4.37, text: '4.37%' },
    { 'x': 'Internet Explorer', y: 6.12, text: '6.12%' },
    { 'x': 'QQ', y: 5.96, text: '5.96%' },
    { 'x': 'Edge', y: 7.48, text: '7.48%' },
    { 'x': 'Others', y: 14.06, text: '18.76%' },
];
var content = ej2_base_1.Browser.isDevice ? " " : "<div style='font-Weight:600;font-size:14px'>Browser<br>Market<br>Share</div>";
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .pie-chart2 {\n        align :center\n    }";
var Doughnut = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var fluent2Colors = ["#6200EE", "#09AF74", "#0076E5", "#CB3587", "#E7910F", "#66CD15", "#F3A93C", "#107C10",
        "#C19C00"];
    var labelRender = function (args) {
        var selectedTheme = (0, theme_color_1.loadAccumulationChartTheme)();
        ;
        if (selectedTheme === 'Fluent2') {
            args.fill = fluent2Colors[args.point.index % 10];
        }
    };
    var load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart2', title: ej2_base_1.Browser.isDevice ? "Browser Market Share" : '', load: load.bind(_this), legendSettings: { visible: true, toggleVisibility: false, position: 'Bottom', maximumColumns: ej2_base_1.Browser.isDevice ? 2 : 3, fixedWidth: true }, enableSmartLabels: true, enableAnimation: false, center: { x: '50%', y: '50%' }, enableBorderOnMouseMove: false, tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "", enableHighlight: true }, pointRender: labelRender.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationSelection, ej2_react_charts_1.Selection, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.AccumulationAnnotation] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', explode: false, explodeOffset: '10%', explodeIndex: 0, startAngle: 30, innerRadius: '50%', dataLabel: {
                            visible: true, position: 'Inside',
                            font: { fontWeight: '600', color: '#ffffff' }, name: 'text', connectorStyle: { length: '20px', type: 'Curve' }
                        }, radius: ej2_base_1.Browser.isDevice ? '80%' : '85%' })),
                React.createElement(ej2_react_charts_1.AccumulationAnnotationsDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationAnnotationDirective, { content: content, region: "Series", x: "52%", y: "50%" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates a donut chart showcasing mobile browser usage statistics, with legends displayed at the bottom of the chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                " This example demonstrates how to render a donut chart with legends positioned at the bottom. The legend can be arranged in horizontal, vertical, or auto layout modes. Using the ",
                React.createElement("code", null, "maximumColumns"),
                " property, you can define the maximum number of columns in auto layout. Additionally, a fixed width option ensures uniform legend sizes for a polished appearance."),
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
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accumulation-chart/legend", "aria-label": "Navigate to the documentation for Legend in React Accumulation Chart component" }, "documentation section"),
                "."))));
};
exports.default = Doughnut;
