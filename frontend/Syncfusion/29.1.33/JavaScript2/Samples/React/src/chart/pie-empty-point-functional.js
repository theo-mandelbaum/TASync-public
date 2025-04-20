"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for empty for Pie chart
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'Rice', y: 80, }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var PieEmptyPoint = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Drop'), emptyPointMode = _a[0], setEmptyPointMode = _a[1];
    var pie = (0, react_1.useRef)(null);
    var modeElement = (0, react_1.useRef)(null);
    var mode = function () {
        pie.current.series[0].emptyPointSettings.mode = modeElement.current.value;
        pie.current.series[0].animation.enable = false;
        pie.current.refresh();
    };
    var droplist = [
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];
    var onChartLoad = function (args) {
        var chart = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    var load = function (args) {
        var selectedTheme = (0, theme_color_1.loadAccumulationChartTheme)(args);
        if (selectedTheme === 'Bootstrap5-Dark') {
            args.chart.series[0].emptyPointSettings.fill = '#FF7F7F';
        }
    };
    var textRender = function (args) {
        args.text = args.point.x + ": $" + args.point.y + "K";
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: pie, title: 'Annual Product-Wise Profit Analysis', load: load.bind(_this), textRender: textRender.bind(_this), legendSettings: { visible: false }, tooltip: { enable: true, header: "", format: '<b>${point.x}</b><br> Profit: <b>$${point.y}K</b>', enableHighlight: true }, enableBorderOnMouseMove: false, loaded: onChartLoad.bind(_this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Profit', dataLabel: { visible: true, position: 'Inside', enableRotation: true, font: { fontWeight: '600' } }, emptyPointSettings: { fill: '#e6e6e6', mode: emptyPointMode } })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Empty Point Mode: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: mode.bind(_this), ref: modeElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: emptyPointMode }))))))))),
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
                "More information on the empty points can be found in this ",
                React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/accumulation-chart/empty-points/", "aria-label": "Navigate to the documentation for Empty Points in React Accumulation Chart component" }, "documentation section"),
                "."))));
};
exports.default = PieEmptyPoint;
