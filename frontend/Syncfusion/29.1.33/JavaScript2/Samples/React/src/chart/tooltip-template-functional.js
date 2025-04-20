"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Line Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 2002, y: 1.61 }, { x: 2003, y: 2.34 }, { x: 2004, y: 2.16 }, { x: 2005, y: 2.10 },
    { x: 2006, y: 1.81 }, { x: 2007, y: 2.05 }, { x: 2008, y: 2.50 }, { x: 2009, y: 2.22 },
    { x: 2010, y: 2.21 }, { x: 2011, y: 2.00 }, { x: 2012, y: 1.7 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .charts {\n        align :center\n    }";
var ChartTooltipTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var template = '<div id="Tooltip"><table style="width:100%;  border: 1px solid black;" class="table-borderless">' +
        '<tbody><tr><th rowspan="2" style="background-color: #C1272D"><img src="https://ej2.syncfusion.com/react/demos/src/chart/images/grain.png" alt="Grain Picture"/>' +
        '</th><td style="height: 25px; width: 50px; background-color: #C1272D; font-size: 14px; color: #E7C554; font-weight: bold; padding-left: 5px">' +
        '${x}</td></tr><tr ><td style="height: 25px; width: 50px; background-color: #C1272D; font-size: 18px; color: #FFFFFF; font-weight: bold; padding-left: 5px">${y}B</td>' +
        '</tr></tbody></table></div>';
    var onChartLoad = function (args) {
        var chart = document.getElementById('chartTooltip');
        chart.setAttribute('title', '');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'chartTooltip', style: { textAlign: "center" }, backgroundImage: 'src/chart/images/wheat.png', primaryXAxis: { labelStyle: { color: 'white' }, valueType: 'Category', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { color: '#EFEFEF', width: 3 } }, primaryYAxis: { rangePadding: 'None', labelStyle: { color: 'white' }, majorGridLines: { color: '#EFEFEF' }, majorTickLines: { width: 0 }, title: 'Billion Bushels', titleStyle: { color: 'white' }, lineStyle: { width: 0 } }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, template: template, showNearestTooltip: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'USA Wheat Production', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', fill: '#333333', width: 2, marker: { visible: true, width: 10, height: 10, fill: '#C1272D', border: { color: '#333333', width: 2 } }, type: 'Line' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the USA Wheat Production data with default line series in the chart. Data points are enhanced with marker and tooltip.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the backgroundImage and tooltip template for the charts. You can use backgroundImage, tooltip, fill properties to customize the line. marker is used to represent individual data and its value."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use Tooltip, we need to inject ",
                React.createElement("code", null, "Tooltip"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information about the tooltip can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/tool-tip/", "aria-label": "Navigate to the documentation for Tooltip Template in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = ChartTooltipTemplate;
