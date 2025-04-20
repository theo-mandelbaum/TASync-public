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
exports.Print = exports.data1 = void 0;
/**
 * Sample for Chart print
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var theme_color_1 = require("./theme-color");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'John', y: 10, dataLabelMappingName: "$10k" }, { x: 'Jake', y: 12, dataLabelMappingName: "$12k" }, { x: 'Peter', y: 18, dataLabelMappingName: "$18k" },
    { x: 'James', y: 11, dataLabelMappingName: "$11k" }, { x: 'Mary', y: 9.7, dataLabelMappingName: "$9.7k" }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #btn-control {\n        width: 100%;\n        text-align: center;\n    }\n\n    .e-print-icon::before {\n        content: \"\\e34b\";\n    }\n    \n    .e-view.fabric .e-print-icon::before, .e-view.fabric-dark .e-print-icon::before\n    {\n        content: '\\e7df';\n    }\n    \n    .e-view.bootstrap .e-print-icon::before {\n        content: '\\ebd2';\n    }\n    \n    .e-view.bootstrap4 .e-print-icon::before {\n        content: '\\e743';\n    }\n    \n    .e-view.tailwind3 .e-print-icon::before, .e-view.tailwind3-dark .e-print-icon::before {\n        content: '\\e76c';\n    }\n\n    .e-view.fluent .e-print-icon::before, .e-view.fluent-dark .e-print-icon::before {\n        content: '\\e75d';\n    }\n    \n    .e-view.highcontrast .e-print-icon::before {\n        content: '\\ebf9';\n    }\n    \n    .e-view.bootstrap5 .e-print-icon::before, .e-view.bootstrap5-dark .e-print-icon::before {\n        content: '\\e75d';\n    }";
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Print.prototype.mode = function () {
        this.chartInstance.print();
    };
    ;
    Print.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, primaryYAxis: { labelFormat: '${value}k', minimum: 0, maximum: 20, interval: 4, lineStyle: { width: 0 }, majorGridLines: { width: 2 }, majorTickLines: { width: 0 } }, pointRender: this.labelRender.bind(this), load: this.load.bind(this), title: "Sales Comparision", loaded: this.onChartLoad.bind(this) },
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
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "chart-print", iconCss: 'e-icons e-print-icon', cssClass: 'e-flat', isPrimary: true }, "Print")))))))))));
    };
    Print.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Print.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    Print.prototype.labelRender = function (args) {
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
            args.fill = theme_color_1.bootstrap5Colors[args.point.index % 10];
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
            args.fill = theme_color_1.bootstrapColors[args.point.index % 10];
        }
    };
    Print.prototype.onClick = function (e) {
        this.chartInstance.print();
    };
    return Print;
}(sample_base_1.SampleBase));
exports.Print = Print;
