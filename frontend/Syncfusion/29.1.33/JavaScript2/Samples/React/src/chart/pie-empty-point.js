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
exports.PieEmptyPoint = exports.data1 = void 0;
/**
 * Sample for empty for Pie chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'Rice', y: 80, }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var PieEmptyPoint = /** @class */ (function (_super) {
    __extends(PieEmptyPoint, _super);
    function PieEmptyPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Drop' },
            { value: 'Average' },
            { value: 'Zero' }
        ];
        return _this;
    }
    PieEmptyPoint.prototype.mode = function () {
        this.pie.series[0].emptyPointSettings.mode = this.modeElement.value;
        this.pie.series[0].animation.enable = false;
        this.pie.refresh();
    };
    ;
    PieEmptyPoint.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return _this.pie = pie; }, title: 'Annual Product-Wise Profit Analysis', load: this.load.bind(this), textRender: this.textRender.bind(this), legendSettings: { visible: false }, tooltip: { enable: true, header: "", format: '<b>${point.x}</b><br> Profit: <b>$${point.y}K</b>', enableHighlight: true }, enableBorderOnMouseMove: false, loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip] }),
                        React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Profit', dataLabel: { visible: true, position: 'Inside', enableRotation: true, font: { fontWeight: '600' } }, emptyPointSettings: { fill: '#e6e6e6' } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                " ",
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null, "Empty Point Mode: ")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.mode.bind(this), ref: function (d) { return _this.modeElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Drop" }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates the annual product-wise profit analysis of an organization with empty point functionality in the pie series.  The Mode of empty point can be changed by using ",
                    React.createElement("code", null, "Empty Point Mode"),
                    " in property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the pie series with empty points. The empty point in the chart can be handled using the ",
                    React.createElement("code", null, "EmptyPointSettings"),
                    " property."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    "More information on the empty points can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/accumulation-chart/empty-points/", "aria-label": "Navigate to the documentation for Empty Points in React Accumulation Chart component" }, "documentation section"),
                    "."))));
    };
    PieEmptyPoint.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    ;
    PieEmptyPoint.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        if (selectedTheme === 'bootstrap5-dark') {
            args.chart.series[0].emptyPointSettings.fill = '#FF7F7F';
        }
    };
    ;
    PieEmptyPoint.prototype.textRender = function (args) {
        args.text = args.point.x + ": $" + args.point.y + "K";
    };
    return PieEmptyPoint;
}(sample_base_1.SampleBase));
exports.PieEmptyPoint = PieEmptyPoint;
