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
exports.BulletLegend = void 0;
/**
 * Right to left for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var BulletLegend = /** @class */ (function (_super) {
    __extends(BulletLegend, _super);
    function BulletLegend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletLoad = function (args) {
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        };
        return _this;
    }
    BulletLegend.prototype.legendRender = function (args) {
        if (args.text === 'Target_0') {
            args.text = 'Previous Target';
        }
        if (args.text === 'Target_1') {
            args.text = 'Current Target';
        }
        if (args.text === 'Target_2') {
            args.text = 'Future Target';
        }
    };
    BulletLegend.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", null,
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'bar-legend', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '70%', height: '160', animation: { enable: false }, tooltip: { enable: false }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 30, interval: 5, title: 'Package Downloads', subtitle: 'in Thousands', labelFormat: '{value}K', legendRender: this.legendRender.bind(this), load: this.bulletLoad.bind(this), legendSettings: { visible: true }, dataSource: [{ value: 25, target: [20, 26, 28] }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip, ej2_react_charts_1.BulletChartLegend] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 8, color: '#CA4218', name: 'Poor' }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 18, color: '#EFC820', name: 'Avg' }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 30, color: '#599C20', name: 'Good' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a bullet chart with legend. Legend is used to know what the colors and shapes represent in bullet chart."))));
    };
    return BulletLegend;
}(sample_base_1.SampleBase));
exports.BulletLegend = BulletLegend;
