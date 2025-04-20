"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'Chrome', y: 100, text: 'Chrome (100M)<br>40%', tooltipMappingName: '40%' },
    { x: 'UC Browser', y: 40, text: 'UC Browser (40M)<br>16%', tooltipMappingName: '16%' },
    { x: 'Opera', y: 30, text: 'Opera (30M)<br>12%', tooltipMappingName: '12%' },
    { x: 'Safari', y: 30, text: 'Safari (30M)<br>12%', tooltipMappingName: '12%' },
    { x: 'Firefox', y: 25, text: 'Firefox (25M)<br>10%', tooltipMappingName: '10%' },
    { x: 'Others', y: 25, text: 'Others (25M)<br>10%', tooltipMappingName: '10%' }
];
var content = ej2_base_1.Browser.isDevice ? "<div style='font-Weight:700; font-size:11px;'>Browser<br>Market<br>Shares</div>" : "<div style='font-Weight:600; font-size:14px;'>Browser<br>Market<br>Shares</div>";
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .pie-chart {\n        align :center\n    }";
var SemiPie = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return pie = pie; }, legendSettings: { visible: false }, enableBorderOnMouseMove: false, load: load.bind(_this), loaded: onChartLoad.bind(_this), tooltip: { enable: true, format: "<b>${point.x}</b><br>Browser Share: <b>${point.tooltip}</b>", header: '', enableHighlight: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.AccumulationAnnotation] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, tooltipMappingName: 'tooltipMappingName', xName: 'x', yName: 'y', startAngle: 270, endAngle: 90, explode: false, radius: ej2_base_1.Browser.isDevice ? '85%' : '100%', innerRadius: '40%', dataLabel: { visible: true, position: 'Inside', enableRotation: true, connectorStyle: { length: '10%' }, name: 'text', font: { fontWeight: '600', size: ej2_base_1.Browser.isDevice ? '8px' : '11px', color: '#ffffff' } } })),
                React.createElement(ej2_react_charts_1.AccumulationAnnotationsDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationAnnotationDirective, { content: content, region: "Series", x: ej2_base_1.Browser.isDevice ? "52%" : "50%", y: ej2_base_1.Browser.isDevice ? "82%" : "85%" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates a semi-pie chart for mobile browsers usage statistics.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render a semi pie chart using ",
                React.createElement("code", null, "StartAngle"),
                " and ",
                React.createElement("code", null, "EndAngle"),
                " properties. Data labels are wrapped to fit inside the pie slice."),
            React.createElement("p", null,
                "More information on the data labels can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accumulation-chart/data-label/", "aria-label": "Navigate to the documentation for DataLabel in React Accumulation Chart component" }, "documentation section"),
                "."))));
};
exports.default = SemiPie;
