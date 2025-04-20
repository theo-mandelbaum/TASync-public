"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Chart print
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'John', y: 10, dataLabelMappingName: "$10k" }, { x: 'Jake', y: 12, dataLabelMappingName: "$12k" }, { x: 'Peter', y: 18, dataLabelMappingName: "$18k" },
    { x: 'James', y: 11, dataLabelMappingName: "$11k" }, { x: 'Mary', y: 9.7, dataLabelMappingName: "$9.7k" }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #btn-control {\n        width: 100%;\n        text-align: center;\n    }\n\n    .e-print-icon::before {\n        content: '\\e34b';\n    }\n \n    .e-view.fabric .e-print-icon::before, .e-view.fabric-dark .e-print-icon::before {\n        content: '\\e7df';\n    }\n \n    .e-view.bootstrap .e-print-icon::before {\n        content: '\\ebd2';\n    }\n \n   .e-view.bootstrap4 .e-print-icon::before {\n        content: '\\e743';\n    }\n \n   .e-view.tailwind3 .e-print-icon::before, .e-view.tailwind3-dark .e-print-icon::before {\n        content: '\\e76c';\n    }\n \n    .e-view.highcontrast .e-print-icon::before {\n        content: '\\ebf9';\n    }\n \n    .e-view.bootstrap5 .e-print-icon::before, .e-view.bootstrap5-dark .e-print-icon::before {\n        content: '\\e75d';\n    }\n \n    .e-view.fluent .e-print-icon::before, .e-view.fluent-dark .e-print-icon::before {\n        content: '\\e75d';\n    }\n    .e-view.fluent2 .e-print-icon::before, .e-view.fluent2-dark .e-print-icon::before, .e-view.fluent2-highcontrast .e-print-icon::before {\n        content: '\\e75d';\n    }\n    .e-view.material3 .e-print-icon::before, .e-view.material3-dark .e-print-icon::before {\n        content: '\\e75d';\n    }\n    ";
var Print = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        var button = document.getElementById('chart-print');
        button.addEventListener('click', onClick);
    }, []);
    var chartInstance = (0, react_1.useRef)(null);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var labelRender = function (args) {
        (0, theme_color_1.pointRenderEvent)(args);
    };
    var onClick = function (e) {
        chartInstance.current.print();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, primaryYAxis: { labelFormat: '${value}k', minimum: 0, maximum: 20, interval: 4, lineStyle: { width: 0 }, majorGridLines: { width: 2 }, majorTickLines: { width: 0 } }, pointRender: labelRender.bind(_this), load: load.bind(_this), title: "Sales Comparision", loaded: onChartLoad.bind(_this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, type: 'Column', marker: { dataLabel: { visible: true, name: 'dataLabelMappingName', position: 'Top', font: { fontWeight: '600', color: "#ffffff" } } } })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { textAlign: 'center' } },
                                    React.createElement("b", null, "Print the chart"))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", { id: "btn-control" },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "chart-print", iconCss: 'e-icons e-print-icon', cssClass: 'e-flat', isPrimary: true }, "Print"))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the print option in the charts.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "By clicking the ",
                React.createElement("b", null, "Print"),
                " button, you can print a chart directly from the browser by calling the public method print."),
            React.createElement("p", null,
                "More information on the print can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-print/#print", "aria-label": "Navigate to the documentation for Print in React Chart component" }, " documentation section"),
                "."))));
};
exports.default = Print;
