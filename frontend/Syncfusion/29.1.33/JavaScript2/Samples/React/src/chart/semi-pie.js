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
exports.SemiPie = exports.data1 = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var base_1 = require("@syncfusion/ej2/base");
exports.data1 = [
    { x: 'Chrome', y: 100, text: 'Chrome (100M)<br>40%', tooltipMappingName: '40%' },
    { x: 'UC Browser', y: 40, text: 'UC Browser (40M)<br>16%', tooltipMappingName: '16%' },
    { x: 'Opera', y: 30, text: 'Opera (30M)<br>12%', tooltipMappingName: '12%' },
    { x: 'Safari', y: 30, text: 'Safari (30M)<br>12%', tooltipMappingName: '12%' },
    { x: 'Firefox', y: 25, text: 'Firefox (25M)<br>10%', tooltipMappingName: '10%' },
    { x: 'Others', y: 25, text: 'Others (25M)<br>10%', tooltipMappingName: '10%' }
];
var content = base_1.Browser.isDevice ? "<div style='font-Weight:700; font-size:11px;'>Browser<br>Market<br>Shares</div>" : "<div style='font-Weight:600; font-size:14px;'>Browser<br>Market<br>Shares</div>";
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        .pie-chart {\n            align :center\n        }";
var SemiPie = /** @class */ (function (_super) {
    __extends(SemiPie, _super);
    function SemiPie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SemiPie.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return pie = pie; }, legendSettings: { visible: false }, enableBorderOnMouseMove: false, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), tooltip: { enable: true, format: "<b>${point.x}</b><br>Browser Share: <b>${point.tooltip}</b>", header: '', enableHighlight: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.AccumulationAnnotation] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, tooltipMappingName: 'tooltipMappingName', xName: 'x', yName: 'y', startAngle: 270, endAngle: 90, explode: false, radius: base_1.Browser.isDevice ? '85%' : '100%', innerRadius: '40%', dataLabel: { visible: true, position: 'Inside', enableRotation: true, connectorStyle: { length: '10%' }, name: 'text', font: { fontWeight: '600', size: base_1.Browser.isDevice ? '8px' : '11px', color: '#ffffff' } } })),
                    React.createElement(ej2_react_charts_1.AccumulationAnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationAnnotationDirective, { content: content, region: "Series", x: base_1.Browser.isDevice ? "52%" : "50%", y: base_1.Browser.isDevice ? "82%" : "85%" })))),
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
    SemiPie.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    SemiPie.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    ;
    return SemiPie;
}(sample_base_1.SampleBase));
exports.SemiPie = SemiPie;
