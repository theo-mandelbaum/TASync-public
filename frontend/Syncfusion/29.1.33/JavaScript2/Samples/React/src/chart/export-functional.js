"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for chart export
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var theme_color_1 = require("./theme-color");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_2 = require("./theme-color");
exports.data1 = [
    { x: 'India', y: 35.5, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "35.5" : "35.5GW" }, { x: 'China', y: 18.3, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "18.3" : "18.3GW" }, { x: 'Italy', y: 17.6, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "17.6" : "17.6GW" }, { x: 'Japan', y: 13.6, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "13.6" : "13.6GW" },
    { x: 'United state', y: 12, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "12" : "12GW" }, { x: 'Spain', y: 5.6, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "5.6" : "5.6GW" }, { x: 'France', y: 4.6, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "4.6" : "4.6GW" }, { x: 'Australia', y: 3.3, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "3.3" : "3.3GW" },
    { x: 'Belgium', y: 3, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "3" : "3GW" }, { x: 'United Kingdom', y: 2.9, DataLabelMappingName: ej2_base_1.Browser.isDevice ? "2.9" : "2.9GW" }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #btn-control {\n        width: 100%;\n        text-align: center;\n    }\n\n    .e-icons.e-export::before {\n        content: '\\e728';\n    }\n \n    .e-view.fabric .e-icons.e-export::before, .e-view.fabric-dark .e-icons.e-export::before {\n        content: '\\e710';\n    }\n \n    .e-view.bootstrap4 .e-icons.e-export::before {\n        content: '\\e780';\n    }\n \n    .e-view.tailwind3-dark .e-icons.e-export::before, .e-view.tailwind3 .e-icons.e-export::before {\n        content: '\\e7bf';\n    }\n \n    .e-view.highcontrast .e-icons.e-export::before {\n        content: '\\e710';\n    }\n \n    .e-view.bootstrap5 .e-icons.e-export::before, .e-view.bootstrap5-dark .e-icons.e-export::before {\n        content: '\\e72e';\n    }\n    .e-view.fluent .e-icons.e-export::before, .e-view.fluent-dark .e-icons.e-export::before {\n        content: '\\e72e';\n    }\n    .e-view.fluent2 .e-icons.e-export::before, .e-view.fluent2-dark .e-icons.e-export::before, .e-view.fluent2-highcontrast .e-icons.e-export::before {\n        content: '\\e72e';\n    }\n    .e-view.material3 .e-icons.e-export::before, .e-view.material3-dark .e-icons.e-export::before {\n        content: '\\e72e';\n    }";
var ChartExport = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        var button = document.getElementById('chart-export');
        button.addEventListener('click', onClick);
    }, []);
    var chartInstance = (0, react_1.useRef)(null);
    var mode = (0, react_1.useRef)(null);
    var inputObj = (0, react_1.useRef)(null);
    var type = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' },
        { value: 'XLSX' },
        { value: 'CSV' }
    ];
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_2.loadChartTheme)(args);
    };
    var onClick = function (e) {
        chartInstance.current.exportModule.export(mode.current.value, inputObj.current.value);
    };
    var pointRender = function (args) {
        (0, theme_color_1.pointRenderEvent)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelIntersectAction: "None", labelRotation: -45, interval: 1 }, chartArea: { border: { width: 0 } }, primaryYAxis: { labelFormat: '{value}GW', minimum: 0, maximum: 40, interval: 10, lineStyle: { width: 0 }, majorGridLines: { width: 2 }, minorTickLines: { width: 0 }, majorTickLines: { width: 0 } }, pointRender: pointRender.bind(_this), load: load.bind(_this), legendSettings: { visible: false }, title: "Top 10 Countries Using Solar Power", loaded: onChartLoad.bind(_this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Export, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, name: 'Measurements (in Gigawatt)', xName: 'x', yName: 'y', width: 2, marker: { dataLabel: { visible: true, name: 'DataLabelMappingName', enableRotation: ej2_base_1.Browser.isDevice ? true : false, angle: -90, position: 'Top', font: { fontWeight: '600', color: '#ffffff', size: '9px' } } }, type: 'Column' })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "40%" } }, "Export Type:"),
                                React.createElement("td", { style: { width: "60%" } },
                                    React.createElement("div", { style: { "marginLeft": "-10px" } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "etype", value: "JPEG", width: 90, ref: mode, dataSource: type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "40%" }, id: "exportFile" }, "File Name:"),
                                React.createElement("td", { style: { width: "40%" } },
                                    React.createElement("div", { className: "e-float-input", style: { 'marginTop': '0px', "marginLeft": "-10px" } },
                                        React.createElement("input", { type: "text", ref: inputObj, defaultValue: "Chart", id: "fileName", style: { "width": "90px" }, "aria-labelledby": "Chart" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control", style: { 'marginLeft': '50%' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "chart-export", iconCss: 'e-icons e-export icon', isPrimary: true }, "Export"))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates client-side exporting of the chart, enabling you to export its data to Excel, PDF, and CSV formats. Additionally, it allows you to save the chart in image formats such as JPEG, PNG, and SVG.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how the export functionality is configured. The rendered chart can be exported in JPEG, PNG, SVG, and PDF file types. Data from the chart can also be exported to Excel and CSV files."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use export, we need to inject ",
                React.createElement("code", null, "export"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the export can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-print/#export", "aria-label": "Navigate to the documentation for Export in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = ChartExport;
