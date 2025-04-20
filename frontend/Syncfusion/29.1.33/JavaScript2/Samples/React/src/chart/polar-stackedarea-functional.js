"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Polar Series with drawType StackingArea
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'JPN', text: 'Japan', y: 5156, y1: 4849, y2: 4382, y3: 4939 },
    { x: 'DEU', text: 'Germany', y: 3754, y1: 3885, y2: 3365, y3: 3467 },
    { x: 'FRA', text: 'France', y: 2809, y1: 2844, y2: 2420, y3: 2463 },
    { x: 'GBR', text: ej2_base_1.Browser.isDevice ? 'UK' : 'United Kingdom', y: 2721, y1: 3002, y2: 2863, y3: 2629 },
    { x: 'BRA', text: 'Brazil', y: 2472, y1: 2456, y2: 1801, y3: 1799 },
    { x: 'RUS', text: 'Russia', y: 2231, y1: 2064, y2: 1366, y3: 1281 },
    { x: 'ITA', text: 'Italy', y: 2131, y1: 2155, y2: 1826, y3: 1851 },
    { x: 'IND', text: 'India', y: 1857, y1: 2034, y2: 2088, y3: 2256 },
    { x: 'CAN', text: 'Canada', y: 1843, y1: 1793, y2: 1553, y3: 1529 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var PolarStackedArea = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Polar'), type = _a[0], setType = _a[1];
    var chartInstance = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var loaded;
    var onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var change = function () {
        chartInstance.current.series[0].type = dropElement.current.value;
        chartInstance.current.series[1].type = dropElement.current.value;
        chartInstance.current.series[2].type = dropElement.current.value;
        chartInstance.current.series[3].type = dropElement.current.value;
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.series[2].animation.enable = false;
        chartInstance.current.series[3].animation.enable = false;
        chartInstance.current.refresh();
    };
    var droplist = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, primaryXAxis: { valueType: 'Category', labelPlacement: 'OnTicks', interval: 1, coefficient: ej2_base_1.Browser.isDevice ? 80 : 100 }, load: load.bind(_this), legendSettings: { visible: true, enableHighlight: true }, title: "GDP in Current Prices (USD Billion)", tooltip: { enable: true, enableHighlight: true }, loaded: onChartLoad.bind(_this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingAreaSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.Highlight, ej2_react_charts_1.PolarSeries, ej2_react_charts_1.RadarSeries, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'text', yName: 'y', name: '2013', type: type, drawType: 'StackingArea' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'text', yName: 'y1', name: '2014', type: type, drawType: 'StackingArea' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'text', yName: 'y2', name: '2015', type: type, drawType: 'StackingArea' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'text', yName: 'y3', name: '2016', type: type, drawType: 'StackingArea' })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Series Type:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "selmode", change: change.bind(_this), ref: dropElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: type }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows GDP growth of various countries for a few years in the polar and radar charts using the stacked area series.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure polar and radar charts with stacking area series. Switching between polar and radar series can be done using Series Type in the property panel."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject ",
                React.createElement("code", null, "StackingAreaSeries"),
                ", ",
                React.createElement("code", null, "PolarSeries"),
                " and ",
                React.createElement("code", null, "SRadarSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the polar-radar series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#stacked-area", "aria-label": "Navigate to the documentation for Polar Stacked Area in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = PolarStackedArea;
