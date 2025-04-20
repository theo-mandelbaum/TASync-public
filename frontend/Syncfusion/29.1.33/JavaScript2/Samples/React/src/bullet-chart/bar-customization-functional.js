"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Right to left for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n      .control-fluid {\n          padding: 0px !important;\n      }";
function BulletChartBarCustomization() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var bulletChartInstance;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section col-md-8' },
            React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'bar-customization', ref: function (chart) { return bulletChartInstance = chart; }, width: '100%', animation: { enable: false }, tooltip: { enable: true }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 300, interval: 50, title: 'New Customers', titlePosition: ej2_base_1.Browser.isDevice ? 'Top' : 'Left', subtitle: 'in Thousands', load: bulletLoad.bind(this), dataSource: [{ value: 270, target: 250 }] },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 150 }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 250 }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 300 })))),
        React.createElement("div", { className: 'property-section col-md-4' },
            React.createElement("div", { className: "property-panel-header" }, "Properties"),
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Actual Value:")),
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: 'actualValue', min: 0, max: 300, value: 270, tooltip: { isVisible: true }, change: function (args) {
                                    bulletChartInstance.dataSource[0].value = args.value;
                                    bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Target Value:")),
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement(ej2_react_inputs_1.SliderComponent, { min: 0, max: 300, value: 250, tooltip: { isVisible: true }, change: function (args) {
                                    bulletChartInstance.dataSource[0].target = args.value;
                                    bulletChartInstance.refresh();
                                }, id: 'targetValue' }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Feature Mode")),
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'featureType', value: 'Rect', dataSource: ['Rect', 'Dot'], change: function (args) {
                                    bulletChartInstance.type = args.value;
                                    bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Value Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { value: '#000000', mode: 'Palette', change: function (args) {
                                    bulletChartInstance.valueFill = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Target Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { value: '#000000', mode: 'Palette', change: function (args) {
                                    bulletChartInstance.targetColor = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                } })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a customization of feature bar and comparative bar type, width and color in bullet chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    function bulletLoad(args) {
        (0, theme_color_1.loadBulletChartTheme)(args);
    }
}
exports.default = BulletChartBarCustomization;
