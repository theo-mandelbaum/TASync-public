"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.color3 = exports.color2 = exports.color1 = exports.data = void 0;
/**
 * Sample for RangeColumn series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: "Jan", y: 6 },
    { x: "Feb", y: 8.9 },
    { x: "Mar", y: 12 },
    { x: "Apr", y: 17.5 },
    { x: "May", y: 22.1 },
    { x: "June", y: 25 },
    { x: "July", y: 29.4 },
    { x: "Aug", y: 29.6 },
    { x: "Sep", y: 25.8 },
    { x: "Oct", y: 21.1 },
    { x: "Nov", y: 15.5 },
    { x: "Dec", y: 9.9 }
];
exports.color1 = ['#F9D422'];
exports.color2 = ['#F28F3F'];
exports.color3 = ['#E94F53'];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var RangeColorMapping = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, highlightMode: 'Point', highlightPattern: 'DiagonalForward', primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelFormat: '{value}°C' }, title: "USA CLIMATE - WEATHER BY MONTH", loaded: onChartLoad.bind(_this), load: load.bind(_this), chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { mode: 'Range', visible: true, toggleVisibility: false } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Highlight, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, name: 'USA', xName: 'x', yName: 'y', type: 'Column', animation: { enable: false }, cornerRadius: { topLeft: 10, topRight: 10 }, marker: { dataLabel: { visible: true, position: "Outer" } } })),
                React.createElement(ej2_react_charts_1.RangeColorSettingsDirective, null,
                    React.createElement(ej2_react_charts_1.RangeColorSettingDirective, { label: "1\u00B0C to 10\u00B0C", start: 1, end: 10, colors: exports.color1 }),
                    React.createElement(ej2_react_charts_1.RangeColorSettingDirective, { label: "11\u00B0C to 20\u00B0C", start: 11, end: 20, colors: exports.color2 }),
                    React.createElement(ej2_react_charts_1.RangeColorSettingDirective, { label: "21\u00B0C to 30\u00B0C", start: 21, end: 30, colors: exports.color3 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates the USA climate with the month-wise data. Columns are differentiated using color codes based on the temperature ranges for better visualization. By toggling the legend items you can control the visibility of the columns within the ranges.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, column segment color is applied based on their ",
                React.createElement("code", null, "y"),
                " value ranges by using the ",
                React.createElement("code", null, "RangeColorSettingsDirective"),
                ". You can use below properties in the ",
                React.createElement("code", null, "RangeColorSettingsDirective"),
                "to customize the data under range."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("p", null,
                        React.createElement("code", null, "label"),
                        " - Specify the name for the range mapping which will be displayed in the legend item.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        React.createElement("code", null, "start"),
                        " - Specify the start value of the color mapping range.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        React.createElement("code", null, "end"),
                        " - Specify the end value of the color mapping range.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        React.createElement("code", null, "colors"),
                        " - Specify the fill colors of point those lies on the given range. If multiple colors are mentioned, then gradient will be applied."))))));
};
exports.default = RangeColorMapping;
