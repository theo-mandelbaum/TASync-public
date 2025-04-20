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
function BulletChartRightToLeft() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'RTL', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', tooltip: { enable: true }, animation: { enable: false }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 300, interval: 50, title: 'Revenue YTD', subtitle: '$ in Thousands', enableRtl: true, labelFormat: '${value}K', load: bulletLoad.bind(this), dataSource: [{ value: 270, target: 250 }] },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 150 }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 250 }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 300 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates bullet chart with diferent mode and orientation such as like right to left or left to right.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    function bulletLoad(args) {
        var chart = document.getElementById('RTL');
        chart.setAttribute('title', '');
        (0, theme_color_1.loadBulletChartTheme)(args);
    }
}
exports.default = BulletChartRightToLeft;
