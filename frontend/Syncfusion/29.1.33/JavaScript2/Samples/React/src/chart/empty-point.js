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
exports.EmptyPoint = exports.data1 = void 0;
/**
 * Sample for Empty Point
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var EmptyPoint = /** @class */ (function (_super) {
    __extends(EmptyPoint, _super);
    function EmptyPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isVisible = false;
        _this.emptyPointMode = 'Gap';
        _this.chartType = 'Column';
        _this.droplist = [
            { value: 'Column' },
            { value: 'SplineArea' },
            { value: 'Spline' },
        ];
        _this.modelist = [
            { value: 'Gap' },
            { value: 'Drop' },
            { value: 'Average' },
            { value: 'Zero' }
        ];
        return _this;
    }
    EmptyPoint.prototype.change = function () {
        this.chartType = this.dropElement.value;
        if (this.dropElement.value === 'Spline') {
            this.isVisible = true;
            this.chartInstance.series[0].marker.visible = true;
        }
        else {
            this.isVisible = false;
            this.chartInstance.series[0].marker.visible = false;
        }
        this.chartInstance.series[0].type = this.chartType;
        this.chartInstance.refresh();
    };
    ;
    EmptyPoint.prototype.mode = function () {
        this.emptyPointMode = this.modeElement.value;
        this.chartInstance.series[0].emptyPointSettings.mode = this.emptyPointMode;
        this.chartInstance.refresh();
    };
    ;
    EmptyPoint.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            valueType: 'Category', interval: 1, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45',
                            labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 }, title: 'Product',
                            minorTickLines: { width: 0 }, majorGridLines: { width: 0 }
                        }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                            title: 'Profit', minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%',
                            majorTickLines: { width: 0 }, lineStyle: { width: 0 }
                        }, load: this.load.bind(this), legendSettings: { visible: false }, title: "Annual Product-Wise Profit Analysis", loaded: this.onChartLoad.bind(this), tooltip: { enable: true, header: '' } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.SplineAreaSeries] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, name: 'Profit', type: this.chartType, marker: { visible: this.isVisible, height: 10, width: 10 }, emptyPointSettings: { fill: '#e6e6e6', mode: this.emptyPointMode } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null, "Series Type: ")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selchange", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: this.chartType })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null, "Empty Point Mode: ")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.mode.bind(this), ref: function (d) { return _this.modeElement = d; }, dataSource: this.modelist, fields: { text: 'value', value: 'value' }, value: this.emptyPointMode }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the annual profit by product analysis of an organization with empty point functionality.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure empty points for a chart. Users can customize the empty points using ",
                    React.createElement("code", null, "ChartEmptyPointSettings"),
                    " in series. Default empty point Mode is ",
                    React.createElement("b", null, "Gap"),
                    "."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    "More information on the empty points can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#empty-points", "aria-label": "Navigate to the documentation for Empty points in React Chart component" }, "documentation section"),
                    "."))));
    };
    EmptyPoint.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    EmptyPoint.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    return EmptyPoint;
}(sample_base_1.SampleBase));
exports.EmptyPoint = EmptyPoint;
