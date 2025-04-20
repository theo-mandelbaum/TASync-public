"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeExport = exports.regionColor = exports.borderColor = exports.themes = exports.dateTimeData = exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for Range Navigator Export
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var export_data_1 = require("./export-data");
exports.dateTimeData = export_data_1.dataCollection;
exports.themes = ['Material', 'Fabric', 'Bootstrap', 'Bootstrap4', 'HighContrast', 'Bootstrap5', 'Tailwind', 'MaterialDark', 'FabricDark', 'BootstrapDark', 'TailwindDark', 'Bootstrap5Dark', 'Fluent', 'FluentDark', 'Material3', 'Material3Dark', 'Fluent2', 'Fluent2HighContrast', 'Fluent2Dark', 'Tailwind3', 'Tailwind3Dark'];
exports.borderColor = ['#FF4081', '#007897', '#428BCA', '#FFD939', '#FFD939', '#FD7E14', '#4F46E5', '#FF4081', '#007897', '#428BCA', '#22D3EE', '#FD7E14', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
exports.regionColor = ['rgba(255, 64, 129, 0.3)', ' rgba(0, 120, 151, 0.3)', 'rgba(66, 139, 202, 0.3)', 'rgba(255, 217, 57, 0.3)', 'rgba(255, 217, 57, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(79, 70, 229, 0.3)',
    'rgba(255, 64, 129, 0.3)', 'rgba(0, 120, 151, 0.3)', 'rgba(66, 139, 202, 0.3)', 'rgba(34, 211, 238, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(47, 64, 116, 0.3)', 'rgba(128, 41, 241, 0.3)'];
var SAMPLE_CSS = "\n        .control-fluid {\n            padding: 0px !important;\n        }\n        #title{\n            font-size: 15px;\n            font-style: normal;\n            font-family: \"Segoe UI\";\n            font-weight: 500;\n            text-anchor: middle;\n            transform: none;\n            opacity: 1;\n        }\n        #btn-control {\n            width: 100%;\n            text-align: center;\n        }\n        \n        .e-print-icon::before {\n            content: 'e34b';\n        }\n     \n        .e-view.fabric .e-print-icon::before, .e-view.fabric-dark .e-print-icon::before {\n            content: 'e7df';\n        }\n     \n        .e-view.bootstrap .e-print-icon::before {\n            content: 'ebd2';\n        }\n     \n       .e-view.bootstrap4 .e-print-icon::before {\n            content: 'e743';\n        }\n     \n       .e-view.tailwind3 .e-print-icon::before, .e-view.tailwind3-dark .e-print-icon::before {\n            content: '\\e76c';\n        }\n\n       .e-view.tailwind3 .e-export-icon::before, .e-view.tailwind3-dark .e-export-icon::before {\n            content: '\\e7bf';\n        }\n     \n        .e-view.highcontrast .e-print-icon::before {\n            content: 'ebf9';\n        }\n     \n        .e-view.bootstrap5 .e-print-icon::before, .e-view.bootstrap5-dark .e-print-icon::before {\n            content: 'e75d';\n        }\n     \n        .e-view.fluent .e-print-icon::before, .e-view.fluent-dark .e-print-icon::before {\n            content: 'e75d';\n        }\n        .e-view.fluent2 .e-print-icon::before, .e-view.fluent2-dark .e-print-icon::before, .e-view.fluent2-highcontrast .e-print-icon::before {\n            content: 'e75d';\n        }\n        .e-view.material3 .e-print-icon::before, .e-view.material3-dark .e-print-icon::before {\n            content: 'e75d';\n        }\n        .e-export-icon::before {\n            content: 'e728';\n        }\n     \n        .e-view.fabric .e-export-icon::before, .e-view.fabric-dark .e-export-icon::before {\n            content: 'e710';\n        }\n     \n        .e-view.bootstrap4 .e-export-icon::before {\n            content: 'e780';\n        }\n\n        .e-view.highcontrast .e-export-icon::before {\n            content: 'e710';\n        }\n     \n        .e-view.bootstrap5 .e-export-icon::before, .e-view.bootstrap5-dark .e-export-icon::before {\n            content: 'e72e';\n        }\n        .e-view.fluent .e-export-icon::before, .e-view.fluent-dark .e-export-icon::before {\n            content: 'e72e';\n        }\n        .e-view.fluent2 .e-export-icon::before, .e-view.fluent2-dark .e-export-icon::before, .e-view.fluent2-highcontrast .e-export-icon::before {\n            content: 'e72e';\n        }\n        .e-view.material3 .e-export-icon::before, .e-view.material3-dark .e-export-icon::before {\n            content: 'e72e';\n        }\n        ";
var RangeExport = /** @class */ (function (_super) {
    __extends(RangeExport, _super);
    function RangeExport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = [
            { value: 'JPEG' },
            { value: 'PNG' },
            { value: 'SVG' },
            { value: 'PDF' }
        ];
        return _this;
    }
    RangeExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement("div", { className: "row", style: { textAlign: "center" } },
                        React.createElement("div", { id: "title" }, "Conns,Inc Stock Details")),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenav) { return _this.rangeInstance = rangenav; }, style: { textAlign: "center" }, valueType: 'DateTime', intervalType: 'Months', labelFormat: 'MMM', enableGrouping: true, value: [new Date('2013-05-01'), new Date('2013-08-01')], dataSource: exports.dateTimeData, xName: 'xDate', yName: 'Close', load: this.rangeLoad.bind(this), changed: this.changed.bind(this) },
                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime] }))),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                                valueType: 'DateTime',
                                crosshairTooltip: { enable: true },
                                edgeLabelPlacement: 'Shift',
                                majorGridLines: { width: 0 }
                            }, primaryYAxis: {
                                minimum: 81, maximum: 87, interval: 2,
                                title: 'Million in USD',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                labelFormat: '${value}M'
                            }, load: this.chartLoad.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', height: '350', chartArea: { border: { width: 0 } }, tooltip: {
                                enable: true, shared: true
                            }, legendSettings: { visible: false } },
                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Export, ej2_react_charts_1.Legend] }),
                            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                                React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dateTimeData, xName: 'xDate', yName: 'Close', border: { width: 2 }, animation: { enable: false }, name: 'Close', type: 'SplineArea', width: 2 }))))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "40%" } }, "Export Type:"),
                                    React.createElement("td", { style: { width: "60%" } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 90, id: "etype", value: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" }))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "40%" }, id: "filename" }, "File Name:"),
                                    React.createElement("td", { style: { width: "60%" } },
                                        React.createElement("div", { className: "e-float-input", style: { 'width': '100px', 'marginTop': '0px' } },
                                            React.createElement("input", { type: "text", defaultValue: "Chart", id: "fileName", style: { "marginLeft": "-10px" }, "aria-labelledby": "Chart" })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: "btn-control", style: { 'marginLeft': '50%' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "range-export", iconCss: 'e-icons e-export-icon', cssClass: 'e-flat', isPrimary: true }, "Export")))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: "btn-control", style: { 'marginLeft': '50%' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "range-print", iconCss: 'e-icons e-print-icon', cssClass: 'e-flat', isPrimary: true }, "Print"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates the export feature in the range navigator. You can export the range navigator in PNG, SVG, PDF, or JPEG format by clicking ",
                    React.createElement("code", null, "Export"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the export feature. The rendered range navigator can be exported as either JPEG, PNG, or SVG format. It can be achieved using the Blob. It is supported only in modern browsers."),
                React.createElement("p", null,
                    "More information on the export can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype", "aria-label": "Navigate to the documentation for series in EJ2 TypeScript Chart component" }, "documentation section"),
                    "."))));
    };
    RangeExport.prototype.changed = function (args) {
        if (this.chartInstance && this.chartRendered) {
            this.chartInstance.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chartInstance.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chartInstance.dataBind();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    };
    ;
    RangeExport.prototype.chartLoad = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        var chartTheme = args.chart.theme;
        args.chart.series[0].fill = exports.regionColor[exports.themes.indexOf(chartTheme)];
        args.chart.series[0].border.color = exports.borderColor[exports.themes.indexOf(chartTheme)];
        this.chartRendered = true;
    };
    ;
    RangeExport.prototype.rangeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    RangeExport.prototype.exportClick = function (e) {
        var fileName = document.getElementById('fileName').value;
        this.chartInstance.exportModule.export(this.mode.value, fileName, null, [this.rangeInstance, this.chartInstance]);
    };
    RangeExport.prototype.printClick = function (e) {
        this.rangeInstance.print(['rangenavigator', 'charts']);
    };
    return RangeExport;
}(sample_base_1.SampleBase));
exports.RangeExport = RangeExport;
