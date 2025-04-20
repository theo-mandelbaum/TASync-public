"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Right to left for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n      .control-fluid {\n          padding: 0px !important;\n      }";
function BulletChartCustomization() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var bulletChartInstance;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section col-md-8' },
            React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'customization', ref: function (chart) { return bulletChartInstance = chart; }, width: '100%', tooltip: { enable: true }, animation: { enable: false }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 3, interval: 0.5, title: 'Package Downloads', subtitle: 'in Thousands', minorTickLines: { width: 0 }, load: bulletLoad.bind(this), dataSource: [{ value: 1.7, target: 2.5 }] },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 1.5, color: '#599C20' }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 2.5, color: '#EFC820' }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 3, color: '#CA4218' })))),
        React.createElement("div", { className: 'property-section col-md-4' },
            React.createElement("div", { className: "property-panel-header" }, "Properties"),
            React.createElement("table", { style: { width: '100%' } },
                React.createElement("tbody", null,
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Start Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'start', mode: 'Palette', value: '#599C20', change: function (args) {
                                    bulletChartInstance.ranges[0].color = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Middle Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { mode: 'Palette', id: 'middle', value: '#EFC820', change: function (args) {
                                    bulletChartInstance.ranges[1].color = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "End Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'end', mode: 'Palette', value: '#CA4218', change: function (args) {
                                    bulletChartInstance.ranges[2].color = args.currentValue.hex;
                                    bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Use Range Color:")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'rangeColor', checked: false, change: function (args) {
                                    bulletChartInstance.majorTickLines.useRangeColor = args.checked;
                                    bulletChartInstance.minorTickLines.useRangeColor = args.checked;
                                    bulletChartInstance.labelStyle.useRangeColor = args.checked;
                                    bulletChartInstance.refresh();
                                } }))),
                    React.createElement("tr", { style: { height: '50px' } },
                        React.createElement("td", { style: { width: '50%' } },
                            React.createElement("div", { className: 'prop-text' }, "Opposed Position")),
                        React.createElement("td", { style: { width: '50%', textAlign: 'center' } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'opposedPosition', checked: false, change: function (args) {
                                    bulletChartInstance.opposedPosition = args.checked;
                                    bulletChartInstance.refresh();
                                } })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a bullet chart with with different customization in value, range fill, opposed position changes.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    function bulletLoad(args) {
        (0, theme_color_1.loadBulletChartTheme)(args);
    }
}
exports.default = BulletChartCustomization;
