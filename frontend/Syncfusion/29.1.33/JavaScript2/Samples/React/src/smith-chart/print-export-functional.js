"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * print and export sample for smith chart
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
// custom code start
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n     #btn-control {\n         width: 100%;\n         text-align: center;\n         text-transform:none !important;\n     }\n     .e-print-icon::before {\n        content: '\\e34b';\n    }\n \n    .e-view.fabric .e-print-icon::before, .e-view.fabric-dark .e-print-icon::before {\n        content: '\\e7df';\n    }\n \n    .e-view.bootstrap .e-print-icon::before {\n        content: '\\ebd2';\n    }\n \n   .e-view.bootstrap4 .e-print-icon::before {\n        content: '\\e743';\n    }\n \n   .e-view.tailwind3 .e-print-icon::before, .e-view.tailwind3-dark .e-print-icon::before {\n          content: '\\e76c';\n    }\n    \n    .e-view.tailwind3 .e-export-icon::before, .e-view.tailwind3-dark .e-export-icon::before {\n          content: '\\e7bf';\n    }\n \n    .e-view.highcontrast .e-print-icon::before {\n        content: '\\ebf9';\n    }\n \n    .e-view.bootstrap5 .e-print-icon::before, .e-view.bootstrap5-dark .e-print-icon::before {\n        content: '\\e75d';\n    }\n \n    .e-view.fluent .e-print-icon::before, .e-view.fluent-dark .e-print-icon::before {\n        content: '\\e75d';\n    }\n    .e-view.fluent2 .e-print-icon::before, .e-view.fluent2-dark .e-print-icon::before, .e-view.fluent2-highcontrast .e-print-icon::before {\n        content: '\\e75d';\n    }\n    .e-view.material3 .e-print-icon::before, .e-view.material3-dark .e-print-icon::before {\n        content: '\\e75d';\n    }\n    .e-export-icon::before {\n        content: '\\e728';\n    }\n \n    .e-view.fabric .e-export-icon::before, .e-view.fabric-dark .e-export-icon::before {\n        content: '\\e710';\n    }\n \n    .e-view.bootstrap4 .e-icons.e-export::before {\n        content: '\\e7bf';\n    }\n\n.e-view.tailwind\u0003-dark .e-export-icon::before, .e-view.tailwind\u0003 .e-export-icon::before {\n        content: 'e7bf';\n    }\n \n    .e-view.highcontrast .e-export-icon::before {\n        content: '\\e710';\n    }\n \n    .e-view.bootstrap5 .e-export-icon::before, .e-view.bootstrap5-dark .e-export-icon::before {\n            content: '\\e728';\n    }\n    .e-view.fluent .e-export-icon::before, .e-view.fluent-dark .e-export-icon::before {\n        content: '\\e72e';\n    }\n    .e-view.fluent2 .e-export-icon::before, .e-view.fluent2-dark .e-export-icon::before, .e-view.fluent2-highcontrast .e-export-icon::before {\n        content: '\\e72e';\n    }\n    .e-view.material3 .e-export-icon::before, .e-view.material3-dark .e-export-icon::before {\n        content: '\\e72e';\n    }";
// custom code end
function Print() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        var exportbutton = document.getElementById('smith-export');
        exportbutton.addEventListener('click', onClick1);
        var printbutton = document.getElementById('smith-print');
        printbutton.addEventListener('click', onClick2);
    }, []);
    // Code for Property Panel
    var smithchartInstance;
    var positionElement;
    var mode;
    var nameElement;
    var droplist = [
        { text: 'JPEG', value: 'JPEG' },
        { text: 'PNG', value: 'PNG' },
        { text: 'SVG', value: 'SVG' },
        { text: 'PDF', value: 'PDF' },
    ];
    function onClick2(e) {
        smithchartInstance.print();
    }
    function onClick1(e) {
        var fileName = document.getElementById('fileName').value;
        smithchartInstance.export(mode.value, fileName);
    }
    function load(args) {
        (0, theme_color_1.loadSmithChartTheme)(args);
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement(ej2_react_charts_1.SmithchartComponent, { load: load.bind(this), id: 'container', ref: function (gauge) { return smithchartInstance = gauge; }, horizontalAxis: { minorGridLines: { visible: true } }, legendSettings: { visible: true, shape: 'Circle' }, radialAxis: { minorGridLines: { visible: true } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.TooltipRender, ej2_react_charts_1.SmithchartLegend] }),
                React.createElement(ej2_react_charts_1.SmithchartSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SmithchartSeriesDirective, { points: [
                            { resistance: 0.15, reactance: 0 }, { resistance: 0.15, reactance: 0.15 },
                            { resistance: 0.18, reactance: 0.3 }, { resistance: 0.2, reactance: 0.4 },
                            { resistance: 0.25, reactance: 0.6 }, { resistance: 0.38, reactance: 0.95 },
                            { resistance: 0.6, reactance: 1.25 }, { resistance: 1, reactance: 1.6 },
                            { resistance: 1.65, reactance: 1.9 }, { resistance: 2.75, reactance: 2 },
                            { resistance: 4.5, reactance: 0 }, { resistance: 3, reactance: -2 },
                            { resistance: 1.65, reactance: -1.95 }, { resistance: 1, reactance: -1.65 },
                            { resistance: 0.6, reactance: -1.25 }, { resistance: 0.35, reactance: -0.9 },
                            { resistance: 0.25, reactance: -0.6 }, { resistance: 0.25, reactance: -0.4 },
                            { resistance: 0.25, reactance: -0.3 }, { resistance: 0.25, reactance: -0.15 },
                            { resistance: 0.25, reactance: 0 },
                        ], name: 'Transmission', enableAnimation: true, tooltip: { visible: true }, marker: { shape: 'Circle', visible: true, border: { width: 2 } } })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { 'height': '50px' } },
                            React.createElement("td", { style: { 'width': '40%' } },
                                React.createElement("div", null, "Export Type")),
                            React.createElement("td", { style: { 'width': '60%' } },
                                React.createElement("div", { style: { 'marginLeft': '-10px' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "mode", width: "100px", index: 0, placeholder: "JPEG", ref: function (d) { return mode = d; }, dataSource: droplist, fields: { text: 'text', value: 'value' } })))),
                        React.createElement("tr", { style: { 'height': '50px' } },
                            React.createElement("td", { style: { 'width': '40%' } },
                                React.createElement("div", { id: "filename" }, "File Name")),
                            React.createElement("td", { style: { 'width': '60%' } },
                                React.createElement("div", { className: "e-float-input", style: { 'marginTop': '0px', 'marginLeft': '-10px' } },
                                    React.createElement("input", { id: "fileName", ref: function (d) { return nameElement = d; }, type: "text", defaultValue: "Smith chart", style: { "width": "100px" }, "aria-labelledby": "Smith Chart" })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { id: "btn-control", style: { 'marginLeft': '50%' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "smith-export", isPrimary: true, iconCss: 'e-icons e-export-icon' }, "Export")))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { id: "btn-control", style: { 'marginLeft': '50%' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "smith-print", isPrimary: true, iconCss: 'e-icons e-print-icon' }, "Print")))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample explores the exporting and printing functionality in Smith chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to export and print the rendered Smith chart. Smith chart can be exported to JPEG, PNG, SVG, and PDF formats."))));
}
exports.default = Print;
