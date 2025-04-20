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
exports.DataEdit = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Line Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: '2005', y: 21 }, { x: '2006', y: 60 },
    { x: '2007', y: 45 }, { x: '2008', y: 50 },
    { x: '2009', y: 74 }, { x: '2010', y: 65 },
    { x: '2011', y: 85 }
];
exports.data2 = [
    { x: '2005', y: 21 }, { x: '2006', y: 22 },
    { x: '2007', y: 36 }, { x: '2008', y: 34 },
    { x: '2009', y: 54 }, { x: '2010', y: 55 },
    { x: '2011', y: 60 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        .charts {\n            align :center\n        }";
var DataEdit = /** @class */ (function (_super) {
    __extends(DataEdit, _super);
    function DataEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataEdit.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', labelFormat: 'y', labelPlacement: 'BetweenTicks', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, load: this.load.bind(this), primaryYAxis: { rangePadding: 'None', minimum: 0, maximum: 100, interval: 20, title: 'Production(Billion in kWh)', labelFormat: '{value}B', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Electricity - Production', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataEditing, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, dragSettings: { enable: true }, xName: 'x', yName: 'y', name: 'Renewable', width: 2, marker: { visible: true, width: 7, height: 7 }, type: 'Column' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, dragSettings: { enable: true }, xName: 'x', yName: 'y', name: 'Non-Renewable', width: 2, marker: { visible: true, width: 7, height: 7, isFilled: true }, type: 'Line' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the behavior of the data editing in the chart. Drag and drop the points to change the data values dynamically.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to drag and drop the data points in the chart by setting Enable property in ",
                    React.createElement("code", null, "ChartDataEditSettings"),
                    " to ",
                    React.createElement("b", null, "true"),
                    ". Also, you can set data editing\u2019s minimum and maximum range using the ",
                    React.createElement("code", null, "MinY"),
                    " and ",
                    React.createElement("code", null, "MaxY"),
                    " properties."),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use data editing, we need to inject",
                    React.createElement("code", null, "DataEditing"),
                    " module using ",
                    React.createElement("code", null, "Chart.Inject(DataEditing)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the Data Editing can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/data-editing/", "aria-label": "Navigate to the documentation for Data Editing in React Chart component" }, "documentation section"),
                    "."))));
    };
    DataEdit.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    DataEdit.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return DataEdit;
}(sample_base_1.SampleBase));
exports.DataEdit = DataEdit;
