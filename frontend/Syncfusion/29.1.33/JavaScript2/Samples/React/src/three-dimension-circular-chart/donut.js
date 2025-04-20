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
exports.DonutSeries = exports.data1 = void 0;
/**
 * Sample for Circular Donut 3D Chart.
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [{ x: 'Tesla', y: 137429 }, { x: 'Aion', y: 80308 }, { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 }, { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 }, { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Circular Donut 3D Chart.
 */
var DonutSeries = /** @class */ (function (_super) {
    __extends(DonutSeries, _super);
    function DonutSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DonutSeries.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", null,
                    React.createElement(ej2_react_charts_1.CircularChart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { visible: false }, tilt: -30, enableRotation: true, load: this.load.bind(this), title: 'Top Selling Electric Cars in China', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries3D, ej2_react_charts_1.CircularChartDataLabel3D, ej2_react_charts_1.CircularChartLegend3D, ej2_react_charts_1.CircularChartTooltip3D] }),
                        React.createElement(ej2_react_charts_1.CircularChart3DSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.CircularChart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', innerRadius: '65%', radius: ej2_base_1.Browser.isDevice ? '45%' : '75%', dataLabel: { visible: true, name: 'x', position: 'Outside', font: { fontWeight: '600', }, connectorStyle: { length: ej2_base_1.Browser.isDevice ? '20px' : '40px' } } }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the top-selling electric cars in China using a 3D donut chart. Data points are enhanced with tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a 3D donut chart. The donut chart is a circular graphic, which is ideal for displaying categories as a proportion or a percentage of the whole. To create a donut in the pie series, use the ",
                    React.createElement("code", null, "innerRadius"),
                    " property. You can rotate and tilt the donut chart using a mouse or touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example. To see the tooltip in action, hover over a point or tap on a point on touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "3D circular chart component features are segregated into individual feature-wise modules. To use datalabel, you need to inject the ",
                    React.createElement("code", null, "CircularChartDataLabel3D"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    DonutSeries.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    DonutSeries.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return DonutSeries;
}(sample_base_1.SampleBase));
exports.DonutSeries = DonutSeries;
