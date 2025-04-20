"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Area series with empty points
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: new Date(2017, 0, 1), y: 3000 }, { x: new Date(2018, 0, 1), y: 4000 },
    { x: new Date(2019, 0, 1), y: -4000 }, { x: new Date(2020, 0, 1), y: -2000 },
    { x: new Date(2021, 0, 1), y: 5000 }
];
exports.data2 = [
    { x: new Date(2017, 0, 1), y: 2000 }, { x: new Date(2018, 0, 1), y: 3000 },
    { x: new Date(2019, 0, 1), y: 4000 }, { x: new Date(2020, 0, 1), y: 2000 },
    { x: new Date(2021, 0, 1), y: 3000 }
];
exports.data3 = [
    { x: new Date(2017, 0, 1), y: 2000 }, { x: new Date(2018, 0, 1), y: -1000 },
    { x: new Date(2019, 0, 1), y: -3000 }, { x: new Date(2020, 0, 1), y: 4000 },
    { x: new Date(2021, 0, 1), y: 1000 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Area empty sample
 */
var AreaNegative = function () {
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
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', labelFormat: 'y', majorGridLines: { width: 0 }, minimum: new Date(2017, 0, 1), maximum: new Date(2021, 0, 1), intervalType: 'Years', edgeLabelPlacement: 'Shift' }, primaryYAxis: { labelFormat: '${value}', minimum: -4000, maximum: 8000, interval: 2000, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, legendSettings: { enableHighlight: true }, load: load.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Profit and Loss", tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true }, loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend, ej2_react_charts_1.DateTime, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "x", yName: "y", name: "Company A", opacity: 0.75, marker: { visible: true, shape: 'Circle', isFilled: true, width: 7, height: 7 }, type: "Area", width: 2, border: { width: 2 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: "x", yName: "y", name: "Company B", opacity: 0.75, marker: { visible: true, shape: 'Diamond', isFilled: true, width: 7, height: 7 }, type: "Area", width: 2, border: { width: 2 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: "x", yName: "y", name: "Company C", opacity: 0.75, marker: { visible: true, shape: 'Rectangle', isFilled: true, width: 5, height: 5 }, type: "Area", width: 2, border: { width: 2 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates an area series with negative values. Data points with negative values are shown here.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render an area series with negative values. Similar to line type series, but the area gets closed and filled with series color. You can use ",
                React.createElement("a", { target: "_blank", href: " https://ej2.syncfusion.com/react/documentation/api/chart/series/#border", "aria-label": "Navigate to the border property reference for React Chart component" }, "border"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/series/#fill", "aria-label": "Navigate to the fill property reference for React Chart component" }, "fill "),
                " properties to customize the area. Also, the legend is enabled with the shape of the series type."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                "More information on the area series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/working-with-data#empty-points", "aria-label": "Navigate to the documentation for Empty points in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = AreaNegative;
