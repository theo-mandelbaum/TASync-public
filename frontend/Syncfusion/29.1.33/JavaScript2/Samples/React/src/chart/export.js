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
exports.ChartExport = exports.data1 = void 0;
/**
 * Sample for chart export
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var theme_color_1 = require("./theme-color");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'DEU', y: 35.5 }, { x: 'CHN', y: 18.3 }, { x: 'ITA', y: 17.6 }, { x: 'JPN', y: 13.6 },
    { x: 'US', y: 12 }, { x: 'ESP', y: 5.6 }, { x: 'FRA', y: 4.6 }, { x: 'AUS', y: 3.3 },
    { x: 'BEL', y: 3 }, { x: 'UK', y: 2.9 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #btn-control {\n        width: 100%;\n        text-align: center;\n    }\n\n    .e-export-icon::before {\n        content: '\\e728';\n    }\n    \n    .e-view.fabric .e-export-icon::before, .e-view.fabric-dark .e-export-icon::before  {\n        content: '\\e710';\n    }\n    \n    .e-view.bootstrap4 .e-export-icon::before {\n        content: '\\e780';\n    }\n    \n    .e-view.tailwind3-dark .e-icons.e-export::before, .e-view.tailwind3 .e-icons.e-export::before {\n        content: '\\e7bf';\n    }\n    \n    .e-view.highcontrast .e-export-icon::before {\n        content: '\\e710';\n    }\n    \n    .e-view.bootstrap5 .e-export-icon::before, .e-view.bootstrap5-dark .e-export-icon::before {\n        content: '\\e72e';\n    }";
var ChartExport = /** @class */ (function (_super) {
    __extends(ChartExport, _super);
    function ChartExport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = [
            { value: 'JPEG' },
            { value: 'PNG' },
            { value: 'SVG' },
            { value: 'PDF' },
            { value: 'XLSX' },
            { value: 'CSV' }
        ];
        return _this;
    }
    ChartExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelIntersectAction: "None", labelRotation: -45, interval: 1 }, chartArea: { border: { width: 0 } }, primaryYAxis: { labelFormat: '{value}GW', minimum: 0, maximum: 40, interval: 10, lineStyle: { width: 0 }, majorGridLines: { width: 2 }, minorTickLines: { width: 0 }, majorTickLines: { width: 0 } }, pointRender: this.labelRender.bind(this), load: this.load.bind(this), legendSettings: { visible: false }, title: "Top 10 Countries Using Solar Power", loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Export, ej2_react_charts_1.DataLabel] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, name: 'Measurements (in Gigawatt)', xName: 'x', yName: 'y', width: 2, marker: { dataLabel: { visible: true, name: 'DataLabelMappingName', enableRotation: ej2_base_1.Browser.isDevice ? true : false, angle: -90, position: 'Top', font: { fontWeight: '600', color: '#ffffff', size: '9px' } } }, type: 'Column' })))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "30%" } }, "Export Type:"),
                                    React.createElement("td", { style: { width: "30%" } },
                                        React.createElement("div", { style: { "marginLeft": "-10px", width: "100%" } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "etype", value: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "40%" }, id: "exportFile" }, "File Name:"),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", { className: "e-float-input", style: { 'marginTop': '0px' } },
                                            React.createElement("input", { type: "text", defaultValue: "Chart", id: "fileName", style: { "marginLeft": "-10px" }, "aria-labelledby": "Chart" })))),
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
    ChartExport.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    ChartExport.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    ChartExport.prototype.labelRender = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = theme_color_1.fabricColors[args.point.index % 10];
        }
        else if (selectedTheme === 'material') {
            args.fill = theme_color_1.materialColors[args.point.index % 10];
        }
        else if (selectedTheme === 'highcontrast') {
            args.fill = theme_color_1.highContrastColors[args.point.index % 10];
        }
        else if (selectedTheme === 'fluent') {
            args.fill = theme_color_1.fluentColors[args.point.index % 10];
        }
        else if (selectedTheme === 'fluent-dark') {
            args.fill = theme_color_1.fluentDarkColors[args.point.index % 10];
        }
        else if (selectedTheme === 'bootstrap5' || selectedTheme === 'bootstrap5-dark') {
            args.fill = theme_color_1.bootstrap5Colors[args.point.index % theme_color_1.bootstrap5Colors.length];
        }
        else if (selectedTheme === 'tailwind') {
            args.fill = theme_color_1.pointTailwindColors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind-dark') {
            args.fill = theme_color_1.pointTailwindDarkColors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind3') {
            args.fill = theme_color_1.pointTailwind3Colors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind3-dark') {
            args.fill = theme_color_1.pointTailwind3DarkColors[args.point.index % 10];
        }
        else {
            args.fill = theme_color_1.bootstrapColors[args.point.index % theme_color_1.bootstrapColors.length];
        }
    };
    ChartExport.prototype.onClick = function (e) {
        var fileName = document.getElementById('fileName').value;
        this.chartInstance.exportModule.export(this.mode.value, fileName);
    };
    return ChartExport;
}(sample_base_1.SampleBase));
exports.ChartExport = ChartExport;
