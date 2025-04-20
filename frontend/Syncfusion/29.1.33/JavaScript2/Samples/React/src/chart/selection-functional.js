"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Selection in chart
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'China', y: 17 }, { x: 'USA', y: 19 },
    { x: 'India', y: 29 }, { x: 'Japan', y: 13 },
    { x: 'Brazil', y: 24 }
];
exports.data2 = [
    { x: 'China', y: 54 }, { x: 'USA', y: 67 },
    { x: 'India', y: 65 }, { x: 'Japan', y: 61 },
    { x: 'Brazil', y: 68 }
];
exports.data3 = [
    { x: 'China', y: 9 }, { x: 'USA', y: 14 },
    { x: 'India', y: 6 }, { x: 'Japan', y: 26 },
    { x: 'Brazil', y: 8 }
];
var SelectionChart = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Point'), selectMode = _a[0], setSelectMode = _a[1];
    var _b = (0, react_1.useState)('None'), highlightMode = _b[0], setHighlightMode = _b[1];
    var _c = (0, react_1.useState)(false), isMultiSelect = _c[0], setIsMultiSelect = _c[1];
    var _d = (0, react_1.useState)('None'), selectPattern = _d[0], setSelectPattern = _d[1];
    var _e = (0, react_1.useState)('None'), highlightPattern = _e[0], setHighlightPattern = _e[1];
    var _f = (0, react_1.useState)(''), highlightColor = _f[0], setHighlightColor = _f[1];
    var chartInstance = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var patternDropDownList = (0, react_1.useRef)(null);
    var highlightDropDownList = (0, react_1.useRef)(null);
    var checkElement = (0, react_1.useRef)(null);
    var checkBoxObj = (0, react_1.useRef)(null);
    var droplist = [
        { value: 'Point' },
        { value: 'Series' },
        { value: 'Cluster' }
    ];
    var patternTypes = [
        { value: 'None' },
        { value: 'DiagonalForward' },
        { value: 'Chessboard' },
        { value: 'Triangle' },
        { value: 'Box' },
        { value: 'HorizontalDash' }
    ];
    var patternTypes2 = [
        { value: 'None' },
        { value: 'Dots' },
        { value: 'Chessboard' },
        { value: 'Triangle' },
        { value: 'Bubble' },
        { value: 'Tile' },
        { value: 'Grid' }
    ];
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var change = function () {
        setSelectMode(dropElement.current.value);
        if (checkBoxObj.current.checked) {
            setHighlightMode(dropElement.current.value);
        }
        else {
            setHighlightMode('None');
        }
        chartInstance.current.dataBind();
    };
    var check = function () {
        setIsMultiSelect(checkElement.current.checked);
    };
    var selectionChange = function () {
        setSelectPattern(patternDropDownList.current.value);
    };
    var hightlightPatternChange = function () {
        if (checkBoxObj.current.checked) {
            setHighlightPattern(highlightDropDownList.current.value);
        }
        else {
            setHighlightPattern('None');
        }
    };
    var highlightChange = function (e) {
        if (e.target.checked) {
            setHighlightMode(chartInstance.current.selectionMode);
            setHighlightPattern(highlightDropDownList.current.value);
        }
        else {
            setHighlightMode('None');
            setHighlightPattern('None');
        }
    };
    // function to handle the ColorPicker change event
    var onChange = function (args) {
        setHighlightColor(args.currentValue.hex);
        chartInstance.current.dataBind();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', interval: 1, labelIntersectAction: 'Rotate90', majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, majorGridLines: { width: 0 } }, primaryYAxis: { title: 'Distribution', labelFormat: '{value}%', lineStyle: { width: 0 }, interval: 20, majorTickLines: { width: 0 } }, load: load.bind(_this), chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, title: 'Age Distribution by Country', loaded: onChartLoad.bind(_this), legendSettings: { visible: true, toggleVisibility: false }, selectionMode: selectMode, highlightMode: highlightMode, selectionPattern: selectPattern, highlightPattern: highlightPattern, isMultiSelect: isMultiSelect, highlightColor: highlightColor },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Selection, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', width: 2, yName: 'y', name: 'Age 0-14', type: 'Column' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', width: 2, yName: 'y', name: 'Age 15-64', type: 'Column' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', width: 2, yName: 'y', name: 'Age 65 & Above', type: 'Column' })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Selection Mode:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: change.bind(_this), ref: dropElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: "Point" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", { id: "multiSelection" }, "Enable Multi-selection:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "select", onChange: check.bind(_this), ref: checkElement, "aria-labelledby": "Checkbox unchecked" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Selection Patterns:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "patternMode", change: selectionChange.bind(_this), ref: patternDropDownList, dataSource: patternTypes, fields: { text: 'value', value: 'value' }, value: "None" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Highlight Color:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "inline-palette", mode: "Palette", value: "null", change: onChange.bind(_this) }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", { id: "highLight" }, "Enable Hightlight Pattern:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "highlightCheckbox", ref: checkBoxObj, onChange: highlightChange.bind(_this), "aria-labelledby": "Checkbox unchecked" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Highlight Patterns:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "highpattern", change: hightlightPatternChange.bind(_this), ref: highlightDropDownList, dataSource: patternTypes2, fields: { text: 'value', value: 'value' }, value: "None" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the different modes of selection and highlight behavior in the charts.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, any point or series can be selected in the chart by clicking on or touching the point. You can also change the selection mode by changing the ",
                React.createElement("code", null, "Selection Mode"),
                " option in the properties panel. You can enable multiple selections with the ",
                React.createElement("code", null, "Enable Multi Selection"),
                " option. You can also select a point while loading a chart using the ",
                React.createElement("code", null, "SelectedDataIndexes"),
                " option. While hovering the point, the point is highlighted using the ",
                React.createElement("code", null, "Enable Highlight"),
                " option, as well as you can set different highlight patterns and colors using the ",
                React.createElement("code", null, "Highlight Patterns"),
                " and ",
                React.createElement("code", null, "Highlight Color"),
                " option."),
            React.createElement("p", null, "Tap to select a point or series, double tap and drag to enable rectangular selection in touch enabled devices."),
            React.createElement("p", null,
                "Chart supports seven mode of selection which can be set using ",
                React.createElement("code", null, "SelectionMode"),
                " property."),
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
                "."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information about selection can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/selection/", "aria-label": "Navigate to the documentation for Selection in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = SelectionChart;
