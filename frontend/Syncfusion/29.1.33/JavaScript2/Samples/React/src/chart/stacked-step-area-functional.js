"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = exports.data = void 0;
/**
 * Sample for Stacked Step Area series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: 2000, y: 416 }, { x: 2001, y: 490 }, { x: 2002, y: 470 }, { x: 2003, y: 500 },
    { x: 2004, y: 449 }, { x: 2005, y: 470 }, { x: 2006, y: 437 }, { x: 2007, y: 458 },
    { x: 2008, y: 500 }, { x: 2009, y: 473 }, { x: 2010, y: 520 }, { x: 2011, y: 520 }
];
exports.data1 = [
    { x: 2000, y: 180 }, { x: 2001, y: 240 }, { x: 2002, y: 370 }, { x: 2003, y: 200 },
    { x: 2004, y: 229 }, { x: 2005, y: 210 }, { x: 2006, y: 337 }, { x: 2007, y: 258 },
    { x: 2008, y: 300 }, { x: 2009, y: 173 }, { x: 2010, y: 220 }, { x: 2011, y: 220 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StackedStepArea = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Double', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, load: load.bind(_this), primaryYAxis: { title: 'Production (Billion as kWh)', valueType: 'Double', labelFormat: '{value}B', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { enableHighlight: true }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, loaded: onChartLoad.bind(_this), title: 'Electricity- Production' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingStepAreaSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', name: 'Renewable', type: 'StackingStepArea', fill: "#56CCF2", opacity: 0.5, border: { width: 2.5 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Non-Renewable', type: 'StackingStepArea', opacity: 0.5, fill: "#2F80ED", border: { width: 2.5 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the data about electricity production using stacked stepped area chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the stacked step area chart. Both ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/marker/", "aria-label": "Navigate to the documentation for Data markers in React Chart component" }, "marker"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/dataLabel/", "aria-label": "Navigate to the documentation for DataLabel in React Chart component" }, "dataLabel"),
                " are used to represent individual data and its value."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use stacking step area series, we need to inject ",
                React.createElement("code", null, "StackingStepArea"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the area type series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-step-area", "aria-label": "Navigate to the documentation for Stacked Step Area Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = StackedStepArea;
