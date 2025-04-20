"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = exports.data = void 0;
/**
 * Sample for Range Selection in chart
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: 1971, y: 50 }, { x: 1972, y: 20 }, { x: 1973, y: 63 }, { x: 1974, y: 81 }, { x: 1975, y: 64 },
    { x: 1976, y: 36 }, { x: 1977, y: 22 }, { x: 1978, y: 78 }, { x: 1979, y: 60 }, { x: 1980, y: 41 },
    { x: 1981, y: 62 }, { x: 1982, y: 56 }, { x: 1983, y: 96 }, { x: 1984, y: 48 }, { x: 1985, y: 23 },
    { x: 1986, y: 54 }, { x: 1987, y: 73 }, { x: 1988, y: 56 }, { x: 1989, y: 67 }, { x: 1990, y: 79 },
    { x: 1991, y: 18 }, { x: 1992, y: 78 }, { x: 1993, y: 92 }, { x: 1994, y: 43 }, { x: 1995, y: 29 },
    { x: 1996, y: 14 }, { x: 1997, y: 85 }, { x: 1998, y: 24 }, { x: 1999, y: 61 }, { x: 2000, y: 80 },
    { x: 2001, y: 14 }, { x: 2002, y: 34 }, { x: 2003, y: 81 }, { x: 2004, y: 70 }, { x: 2005, y: 21 },
    { x: 2006, y: 70 }, { x: 2007, y: 32 }, { x: 2008, y: 43 }, { x: 2009, y: 21 }, { x: 2010, y: 63 },
    { x: 2011, y: 9 }, { x: 2012, y: 51 }, { x: 2013, y: 25 }, { x: 2014, y: 96 }, { x: 2015, y: 32 }
];
exports.data1 = [
    { x: 1971, y: 23 }, { x: 1972, y: 67 }, { x: 1973, y: 83 }, { x: 1974, y: 43 }, { x: 1975, y: 8 },
    { x: 1976, y: 41 }, { x: 1977, y: 56 }, { x: 1978, y: 31 }, { x: 1979, y: 29 }, { x: 1980, y: 87 },
    { x: 1981, y: 43 }, { x: 1982, y: 12 }, { x: 1983, y: 38 }, { x: 1984, y: 67 }, { x: 1985, y: 49 },
    { x: 1986, y: 67 }, { x: 1987, y: 83 }, { x: 1988, y: 16 }, { x: 1989, y: 89 }, { x: 1990, y: 18 },
    { x: 1991, y: 46 }, { x: 1992, y: 39 }, { x: 1993, y: 68 }, { x: 1994, y: 87 }, { x: 1995, y: 45 },
    { x: 1996, y: 42 }, { x: 1997, y: 28 }, { x: 1998, y: 82 }, { x: 1999, y: 13 }, { x: 2000, y: 83 },
    { x: 2001, y: 26 }, { x: 2002, y: 57 }, { x: 2003, y: 48 }, { x: 2004, y: 84 }, { x: 2005, y: 64 },
    { x: 2006, y: 24 }, { x: 2007, y: 82 }, { x: 2008, y: 37 }, { x: 2009, y: 68 }, { x: 2010, y: 37 },
    { x: 2011, y: 35 }, { x: 2012, y: 81 }, { x: 2013, y: 38 }, { x: 2014, y: 51 }, { x: 2015, y: 58 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #select:hover {\n        cursor: pointer;\n    }";
var RangeSelection = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('DragXY'), selectionMode = _a[0], setSelectionMode = _a[1];
    var chartInstance = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var checkElement = (0, react_1.useRef)(null);
    var droplist = [
        { value: 'DragXY' },
        { value: 'DragX' },
        { value: 'DragY' },
        { value: 'Lasso' }
    ];
    var onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var change = function () {
        chartInstance.current.selectionMode = dropElement.current.value;
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.refresh();
    };
    var check = function () {
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.refresh();
        chartInstance.current.allowMultiSelection = checkElement.current.checked;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, primaryXAxis: { minimum: 1970, maximum: 2016, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { title: 'Sales', labelFormat: '{value}%', interval: 25, minimum: 0, maximum: 100, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, legendSettings: { visible: true, toggleVisibility: false }, title: 'Profit Comparision of A and B', loaded: onChartLoad.bind(_this), selectionMode: selectionMode, load: load.bind(_this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Selection, ej2_react_charts_1.Legend, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.ScatterSeries] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, name: 'Product A', xName: 'x', yName: 'y', type: 'Scatter', marker: { shape: 'Triangle', width: 10, height: 10 } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, name: 'Product B', xName: 'x', yName: 'y', type: 'Scatter', marker: { shape: 'Pentagon', width: 10, height: 10 } })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Selection Mode:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: change.bind(_this), ref: dropElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: "DragXY" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", { id: "multiSelection" }, "Enable MultipleSelection:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "select", onChange: check.bind(_this), ref: checkElement, "aria-labelledby": "Checkbox unchecked" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the range selection behavior and its mode in the charts.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to select points in a specific region. You can change the ",
                React.createElement("b", null, "Selection Mode"),
                " in the properties panel. You can also enable multiple selection."),
            React.createElement("p", null, "Click and drag to enable a rectangular selection and it will display the collection of points that are selected under the region."),
            React.createElement("p", null,
                "Rectangular selection can be set using the ",
                React.createElement("code", null, "SelectionMode"),
                " property, and it supports the following modes."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Series"),
                    " - Select the series in chart."),
                React.createElement("li", null,
                    React.createElement("code", null, "Point"),
                    " - Select a point in the series ."),
                React.createElement("li", null,
                    React.createElement("code", null, "Cluster"),
                    " - Select a group of points in the chart."),
                React.createElement("li", null,
                    React.createElement("code", null, "DragXY"),
                    " - Rectangular selection with respect to both axis."),
                React.createElement("li", null,
                    React.createElement("code", null, "DragX"),
                    " - Rectangular selection with respect to horizontal axis."),
                React.createElement("li", null,
                    React.createElement("code", null, "DragY"),
                    " - Rectangular selection with respect to vertical axis."),
                React.createElement("li", null,
                    React.createElement("code", null, "Lasso"),
                    " - Select free form of selection area points.")),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use selection feature, we need to inject ",
                React.createElement("code", null, "Selection"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = RangeSelection;
