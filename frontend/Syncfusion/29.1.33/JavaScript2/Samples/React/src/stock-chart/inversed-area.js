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
exports.InversedArea = void 0;
/**
 * Sample for Stock Chart Default
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var stock_data_1 = require("./stock-data");
var sample_base_1 = require("../common/sample-base");
var InversedArea = /** @class */ (function (_super) {
    __extends(InversedArea, _super);
    function InversedArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InversedArea.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartinversed', primaryXAxis: {
                        valueType: 'DateTime',
                        isInversed: true,
                        majorGridLines: { width: 0 },
                        crosshairTooltip: { enable: true }
                    }, primaryYAxis: {
                        isInversed: true,
                        lineStyle: { color: 'transparent' },
                        majorTickLines: { color: 'transparent', width: 0 },
                        crosshairTooltip: { enable: true }
                    }, load: this.load.bind(this), seriesType: [], indicatorType: [], chartArea: { border: { width: 0 } }, crosshair: { enable: true, lineType: 'Both' }, title: 'AAPL Stock Price' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.Crosshair, ej2_react_charts_1.AreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines,
                            ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export,
                            ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.aapl, xName: 'x', yName: 'high', type: 'Area', opacity: 0.5 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample uses area series and inversed axis to visualize stock data. The crosshair display information about the data and period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure stock chart to visualize the stock data with inversed axis and it can be inversed by setting ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/stock-chart/stockChartAxis/#isinversed", "aria-label": "Navigate to the isInversed property reference for React Stock Chart Axis" }, "isInversed"),
                    " property as ",
                    React.createElement("b", null, "true"),
                    "."),
                React.createElement("p", null,
                    React.createElement("code", null, "Crosshair"),
                    " is enabled in this example. To see the crosshair in action, hover the chart or tap on touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                    React.createElement("code", null, "DateTime"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(DateTime)"),
                    " method. To use the AreaSeries, inject the ",
                    React.createElement("code", null, "AreaSeries"),
                    " module using the ",
                    React.createElement("code", null, "StockChart.Inject(AreaSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information about the axis can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/axis-types", "aria-label": "Navigate to the documentation for Axis types in React Stock Chart component" }, "documentation section"),
                    "."))));
    };
    InversedArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    ;
    return InversedArea;
}(sample_base_1.SampleBase));
exports.InversedArea = InversedArea;
