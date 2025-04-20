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
exports.BulletChartOrientation = void 0;
/**
 * Right to left for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var BulletChartOrientation = /** @class */ (function (_super) {
    __extends(BulletChartOrientation, _super);
    function BulletChartOrientation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletLoad = function (args) {
            var chart = document.getElementById('bar-Orientation');
            chart.setAttribute('title', '');
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        };
        return _this;
    }
    BulletChartOrientation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section col-md-8' },
                React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'bar-Orientation', ref: function (chart) { return _this.bulletChartInstance = chart; }, width: '19%', height: '400', animation: { enable: false }, tooltip: { enable: true }, valueField: 'value', targetField: 'target', categoryField: 'name', minimum: 0, maximum: 30, interval: 5, labelFormat: '{value}%', title: 'Profit in Percent', margin: { left: 10 }, titlePosition: 'Top', orientation: 'Vertical', load: this.bulletLoad.bind(this), dataSource: [{ value: 23, target: 27, name: 'Product A' }] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                    React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 20 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 25 }),
                        React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 30 })))),
            React.createElement("div", { className: 'property-section col-md-4' },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '60%' } },
                                React.createElement("div", { className: 'prop-text' }, "Feature Mode")),
                            React.createElement("td", { style: { width: '40%' } },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'featureType', value: 'Vertical', dataSource: ['Vertical', 'Horizontal'], change: function (args) {
                                        if (args.value === 'Horizontal') {
                                            _this.bulletChartInstance.width = '80%';
                                            _this.bulletChartInstance.height = '100px';
                                        }
                                        else {
                                            _this.bulletChartInstance.width = '19%';
                                            _this.bulletChartInstance.height = '400px';
                                        }
                                        _this.bulletChartInstance.orientation = args.value;
                                        _this.bulletChartInstance.refresh();
                                    } })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a bullet chart with vertical orientation to compare different values.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    };
    return BulletChartOrientation;
}(sample_base_1.SampleBase));
exports.BulletChartOrientation = BulletChartOrientation;
