"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data1 = void 0;
/**
 * Sample for Indexed Category Axis
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'India', y: 7.3 },
    { x: 'Myanmar', y: 7.9 },
    { x: 'Bangladesh', y: 6.0 },
    { x: 'Cambodia', y: 7.0 },
    { x: 'China', y: 6.9 },
];
exports.data2 = [
    { x: 'Australia', y: 2.5 },
    { x: 'Poland', y: 2.7 },
    { x: 'Singapore', y: 2.0 },
    { x: 'Canada', y: 1.4 },
    { x: 'Germany', y: 1.8 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #isIndexed:hover {\n        cursor: pointer;\n    }";
var IndexedAxis = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chartInstance = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var loaded;
    var onChange = function () {
        chartInstance.current.primaryXAxis.isIndexed = dropElement.current.checked;
        if (chartInstance.current.primaryXAxis.isIndexed) {
            chartInstance.current.tooltip.shared = false;
            chartInstance.current.series[0].type = 'Column';
            chartInstance.current.series[1].type = 'Column';
            chartInstance.current.series[0].marker.visible = false;
            chartInstance.current.series[1].marker.visible = false;
            chartInstance.current.primaryXAxis.labelRotation = 0;
            chartInstance.current.crosshair.line.width = 1;
        }
        else {
            chartInstance.current.series[0].type = 'Line';
            chartInstance.current.series[1].type = 'Line';
            chartInstance.current.series[0].marker.visible = true;
            chartInstance.current.series[1].marker.visible = true;
            chartInstance.current.primaryXAxis.labelRotation = 90;
            chartInstance.current.crosshair.line.width = 0;
            chartInstance.current.tooltip.enable = false;
            chartInstance.current.tooltip.shared = false;
        }
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
            React.createElement("div", { className: 'col-md-9' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, primaryXAxis: { valueType: 'Category', interval: 1, crosshairTooltip: { enable: false }, isIndexed: true, labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45', majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, majorGridLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}%', title: 'GDP Growth Rate', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: load.bind(_this), title: "GDP by Countries", loaded: onChartLoad.bind(_this), tooltip: { enable: false }, crosshair: { enable: false, lineType: 'Vertical' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.LineSeries, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: '2015', width: 2, type: 'Column', marker: { height: 10, width: 10, dataLabel: { visible: true, position: 'Top', enableRotation: ej2_base_1.Browser.isDevice ? true : false, angle: -90, font: { size: ej2_base_1.Browser.isDevice ? '8px' : '11px' } } } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: '2016', width: 2, type: 'Column', marker: { height: 10, width: 10, dataLabel: { visible: true, position: 'Top', enableRotation: ej2_base_1.Browser.isDevice ? true : false, angle: -90, font: { size: ej2_base_1.Browser.isDevice ? '8px' : '11px' } } } })))),
            React.createElement("div", { className: 'col-md-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "indexed" }, "Indexed:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "isIndexed", defaultChecked: true, onChange: onChange.bind(_this), style: { marginLeft: '-5px' }, ref: dropElement, "aria-labelledby": "Checkbox checked" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows an indexed category axis in a chart with details about GDP growth across different countries.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The category axis is also rendered on the basis of the index values in the data source. To render the indexed category axis, set ",
                React.createElement("code", null, "ValueType"),
                " to Category and ",
                React.createElement("code", null, "IsIndexed"),
                " property to ",
                React.createElement("b", null, "true"),
                "."),
            React.createElement("p", null,
                "More information on the indexed axis can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/category-axis/#indexed-category-axis", "aria-label": "Navigate to the documentation for Indexed category Axis in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = IndexedAxis;
