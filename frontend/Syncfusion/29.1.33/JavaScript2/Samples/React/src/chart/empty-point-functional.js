"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Empty Point
 */
var React = require("react");
var react_1 = require("react");
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
var EmptyPoint = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    var _b = (0, react_1.useState)('Gap'), emptyPointMode = _b[0], setEmptyPointMode = _b[1];
    var _c = (0, react_1.useState)('Column'), chartType = _c[0], setchartType = _c[1];
    var chartInstance = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var modeElement = (0, react_1.useRef)(null);
    var droplist = [
        { value: 'Column' },
        { value: 'SplineArea' },
        { value: 'Spline' },
    ];
    var modelist = [
        { value: 'Gap' },
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];
    var change = function () {
        setchartType(dropElement.current.value);
        if (dropElement.current.value === 'Spline') {
            setIsVisible(true);
            chartInstance.current.series[0].marker.visible = true;
        }
        else {
            setIsVisible(false);
            chartInstance.current.series[0].marker.visible = false;
        }
        chartInstance.current.series[0].type = dropElement.current.value;
        chartInstance.current.refresh();
    };
    var mode = function () {
        setEmptyPointMode(modeElement.current.value);
        chartInstance.current.series[0].emptyPointSettings.mode = modeElement.current.value;
        chartInstance.current.refresh();
    };
    var onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, primaryXAxis: { valueType: 'Category', interval: 1, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45', labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 }, title: 'Product', minorTickLines: { width: 0 }, majorGridLines: { width: 0 } }, chartArea: { border: { width: 0 } }, primaryYAxis: { title: 'Profit', minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, load: load.bind(_this), legendSettings: { visible: false }, title: "Annual Product-Wise Profit Analysis", loaded: onChartLoad.bind(_this), tooltip: { enable: true, header: '' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.SplineAreaSeries] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, name: 'Profit', type: chartType, marker: { visible: isVisible, height: 10, width: 10 }, emptyPointSettings: { fill: '#e6e6e6', mode: emptyPointMode } })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Series Type: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selchange", change: change.bind(_this), ref: dropElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: chartType })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Empty Point Mode: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: mode.bind(_this), ref: modeElement, dataSource: modelist, fields: { text: 'value', value: 'value' }, value: emptyPointMode }))))))))),
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
exports.default = EmptyPoint;
