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
function BulletChartTooltip() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ChartToolTemplate = tooltipTemplate;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'Revenue', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '70%', tooltip: { enable: true, template: ChartToolTemplate }, animation: { enable: false }, valueField: 'value', targetField: 'target', minimum: 0, maximum: 100, interval: 10, title: 'Revenue YTD', subtitle: 'US $(in thousands)', labelFormat: '${value}K', load: bulletLoad.bind(this), dataSource: [{ value: 70, target: 50 }] },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 30, color: "#599C20" }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 60, color: "#EFC820" }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 100, color: "#CA4218" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates bullet chart with tooltip customization such as template.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    function tooltipTemplate(props) {
        return (React.createElement("div", { id: "wrap" },
            React.createElement("table", { style: { width: '100%', backgroundColor: '#ffffff', borderSpacing: '0px', borderCollapse: 'separate', border: '1px solid grey', borderRadius: '10px', paddingTop: '5px', paddingBottom: '5px' } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { fontWeight: 'bold', color: 'black', paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px' } }, "Sales")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { paddingLeft: '5px', color: 'black', paddingRight: '5px', paddingBottom: '2px' } },
                            "Target   : $",
                            props.target,
                            "K ")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { paddingLeft: '5px', color: 'black', paddingRight: '5px' } },
                            "Current : ",
                            props.value,
                            " "))))));
    }
    function bulletLoad(args) {
        var chart = document.getElementById('Revenue');
        chart.setAttribute('title', '');
        (0, theme_color_1.loadBulletChartTheme)(args);
    }
}
exports.default = BulletChartTooltip;
