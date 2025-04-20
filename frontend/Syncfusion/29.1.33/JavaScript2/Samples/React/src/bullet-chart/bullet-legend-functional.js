"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Right to left for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n      .control-fluid {\n          padding: 0px !important;\n      }";
function BulletLegend() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", null,
            React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'bar-legend', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '70%', height: '160', animation: { enable: false }, tooltip: { enable: true }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 30, interval: 5, title: 'Package Downloads', subtitle: 'in Thousands', labelFormat: '{value}K', legendRender: legendRender.bind(this), load: bulletLoad.bind(this), legendSettings: { visible: true }, dataSource: [{ value: 25, target: [20, 26, 28] }] },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip, ej2_react_charts_1.BulletChartLegend] }),
                React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 8, color: '#CA4218', name: 'Poor' }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 18, color: '#EFC820', name: 'Avg' }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 30, color: '#599C20', name: 'Good' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a bullet chart with legend. Legend is used to know what the colors and shapes represent in bullet chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    function bulletLoad(args) {
        (0, theme_color_1.loadBulletChartTheme)(args);
    }
    function legendRender(args) {
        if (args.text === 'Target_0') {
            args.text = 'Previous Target';
        }
        if (args.text === 'Target_1') {
            args.text = 'Current Target';
        }
        if (args.text === 'Target_2') {
            args.text = 'Future Target';
        }
    }
}
exports.default = BulletLegend;
