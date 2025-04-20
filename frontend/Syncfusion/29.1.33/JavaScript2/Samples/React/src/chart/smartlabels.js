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
exports.SmartLabels = exports.data1 = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { 'x': 'USA', y: 46, text: ej2_base_1.Browser.isDevice ? 'USA: 46' : 'United States of America: 46' },
    { 'x': 'China', y: 26, text: 'China: 26' },
    { 'x': 'Russia', y: 19, text: 'Russia: 19' },
    { 'x': 'Germany', y: 17, text: 'Germany: 17' },
    { 'x': 'Kazakhstan', y: 3, text: ej2_base_1.Browser.isDevice ? 'KZ: 3' : 'Kazakhstan: 3' },
    { 'x': 'New Zealand', y: 4, text: ej2_base_1.Browser.isDevice ? 'NZ: 4' : 'New Zealand: 4' },
    { 'x': 'South Korea', y: 9, text: ej2_base_1.Browser.isDevice ? 'KR: 9' : 'South Korea: 9' },
    { 'x': 'Great Britain', y: 27, text: ej2_base_1.Browser.isDevice ? 'GB: 27' : 'Great Britain: 27' },
    { 'x': 'Switzerland', y: 3, text: ej2_base_1.Browser.isDevice ? 'CH: 3' : 'Switzerland: 3' },
    { 'x': 'Australia', y: 8, text: ej2_base_1.Browser.isDevice ? 'ASTL: 8' : 'Australia: 8' },
    { 'x': 'Netherlands', y: 8, text: ej2_base_1.Browser.isDevice ? 'NL: 8' : 'Netherlands: 8' },
    { 'x': 'Colombia', y: 3, text: 'Colombia: 3' },
    { 'x': 'Uzbekistan', y: 4, text: ej2_base_1.Browser.isDevice ? 'Uzbekistan: <br> 4' : 'Uzbekistan: 4' },
    { 'x': 'Japan', y: 12, text: 'Japan: 12' },
    { 'x': 'France', y: 10, text: 'France: 10' },
    { 'x': 'Italy', y: 8, text: 'Italy: 8' },
    { 'x': 'Argentina', y: 3, text: ej2_base_1.Browser.isDevice ? 'AR: 3' : 'Argentina: 3' },
    { 'x': 'South Africa', y: 2, text: ej2_base_1.Browser.isDevice ? 'SA: 2' : 'South Africa: 2' },
    { 'x': 'North Korea', y: 2, text: ej2_base_1.Browser.isDevice ? 'KP: 2' : 'North Korea: 2' }
];
var SmartLabels = /** @class */ (function (_super) {
    __extends(SmartLabels, _super);
    function SmartLabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartLabels.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', title: 'Rio Olympics Gold', tooltip: { enable: true, format: '<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>', enableHighlight: true }, load: this.load.bind(this), enableBorderOnMouseMove: false, legendSettings: { visible: false }, loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.PieSeries] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', startAngle: 60, dataLabel: { visible: true, position: 'Outside', connectorStyle: { length: '20px', type: 'Curve' }, name: 'text', font: { fontWeight: '600' } }, radius: ej2_base_1.Browser.isDevice ? '40%' : '70%' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the gold medal count scored by each country at the Rio Olympic Games using smart labels on the chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how the labels can be arranged smartly without overlapping. You can use the ",
                    React.createElement("code", null, "EnableSmartLabels"),
                    " property to enable or disable the support."),
                React.createElement("p", { style: { fontWeight: 500 } }, " Injecting Module "),
                React.createElement("p", null,
                    " Accumulation chart component features are segregated into individual feature-wise modules. To use DataLabel, we need to inject ",
                    React.createElement("code", null, "AccumulationDataLabel"),
                    " into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the smart labels can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accumulation-chart/data-label#smart-labels", "aria-label": "Navigate to the documentation for Smart Labels in React Accumulation Chart component" }, "documentation section"),
                    "."))));
    };
    SmartLabels.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    SmartLabels.prototype.load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    ;
    return SmartLabels;
}(sample_base_1.SampleBase));
exports.SmartLabels = SmartLabels;
