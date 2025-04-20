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
exports.AreaNegative = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Area series with empty points
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'Onion', y: 3000 }, { x: 'Potato', y: 4000 },
    { x: 'Tomato', y: -4000 }, { x: 'Corn', y: -2000 },
    { x: 'Carrot', y: 5000 }
];
exports.data2 = [
    { x: 'Onion', y: 2000 }, { x: 'Potato', y: 3000 },
    { x: 'Tomato', y: 4000 }, { x: 'Corn', y: 2000 },
    { x: 'Carrot', y: 3000 }
];
exports.data3 = [
    { x: 'Onion', y: 2000 }, { x: 'Potato', y: -1000 },
    { x: 'Tomato', y: -3000 }, { x: 'Corn', y: 4000 },
    { x: 'Carrot', y: 1000 }
];
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
/**
 * Area empty sample
 */
var AreaNegative = /** @class */ (function (_super) {
    __extends(AreaNegative, _super);
    function AreaNegative() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AreaNegative.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, primaryYAxis: { labelFormat: '${value}', minimum: -4000, maximum: 8000, interval: 2000, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, legendSettings: { enableHighlight: true }, load: this.load.bind(this), margin: { left: ej2_base_1.Browser.isDevice ? 2 : 10, right: ej2_base_1.Browser.isDevice ? 2 : 10, top: ej2_base_1.Browser.isDevice ? 2 : 10, bottom: ej2_base_1.Browser.isDevice ? 2 : 10 }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Profit and Loss", tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true }, loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend, ej2_react_charts_1.Highlight] }),
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
                    "More information on the area negative points can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/working-with-data#empty-points", "aria-label": "Navigate to the documentation for Empty points in React Chart component" }, "documentation section"),
                    "."))));
    };
    AreaNegative.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    AreaNegative.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return AreaNegative;
}(sample_base_1.SampleBase));
exports.AreaNegative = AreaNegative;
