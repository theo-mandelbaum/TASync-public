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
exports.SynchronizedChart = void 0;
/**
 * Sample for Synchronized Chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var financial_data_1 = require("./financial-data");
var base_1 = require("@syncfusion/ej2/base");
var SAMPLE_CSS = "\n#control-container {\n    padding: 1px !important;\n}\n\n.row {\n    display: flex;\n}\n\n.col {\n    width: 50%;\n    margin: 10px;\n    height: 270px;\n}";
/**
 * Synchronized Chart Sample
 */
var SynchronizedChart = /** @class */ (function (_super) {
    __extends(SynchronizedChart, _super);
    function SynchronizedChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.charts = [];
        _this.zoomFactor = 0;
        _this.zoomPosition = 0;
        _this.isZoom = false;
        _this.selectedData = [];
        _this.count = 0;
        _this.legendCount = 0;
        return _this;
    }
    SynchronizedChart.prototype.componentDidMount = function () {
        this.charts = [this.chart1, this.chart2, this.chart3, this.chart4];
    };
    SynchronizedChart.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col" },
                        React.createElement(ej2_react_charts_1.ChartComponent, { id: "container1", ref: function (chart) { return _this.chart1 = chart; }, style: { textAlign: 'center' }, primaryXAxis: {
                                minimum: new Date(2023, 1, 18),
                                maximum: new Date(2023, 7, 18),
                                valueType: 'DateTime',
                                labelFormat: 'MMM d',
                                lineStyle: { width: 0 },
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: base_1.Browser.isDevice ? 'None' : 'Shift',
                                labelRotation: base_1.Browser.isDevice ? -45 : 0,
                                interval: base_1.Browser.isDevice ? 2 : 1
                            }, primaryYAxis: {
                                labelFormat: 'n2',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                minimum: 0.86,
                                maximum: 0.96,
                                interval: 0.025
                            }, chartArea: { border: { width: 0 } }, zoomSettings: {
                                enableMouseWheelZooming: true,
                                enablePinchZooming: true,
                                enableScrollbar: false,
                                enableDeferredZooming: true,
                                enablePan: true,
                                mode: 'X',
                                toolbarItems: ['Pan', 'Reset']
                            }, zoomComplete: this.zoomComplete.bind(this), chartMouseLeave: this.chartMouseLeave.bind(this), chartMouseMove: this.chartMouseMove.bind(this), chartMouseUp: this.chartMouseUp.bind(this), load: this.load.bind(this), titleStyle: { textAlignment: 'Near' }, tooltip: { enable: true, fadeOutDuration: base_1.Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>€${point.y}</b><br>${point.x} 2023', enableMarker: false, enableHighlight: true }, crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' }, title: "US to Euro" },
                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.Crosshair] }),
                            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                                React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Line", dataSource: financial_data_1.synchronizedData, xName: "USD", yName: "EUR", width: 2, emptyPointSettings: { mode: 'Drop' } })))),
                    React.createElement("div", { className: "col" },
                        React.createElement(ej2_react_charts_1.ChartComponent, { id: "container2", ref: function (chart) { return _this.chart2 = chart; }, style: { textAlign: 'center' }, primaryXAxis: {
                                minimum: new Date(2023, 1, 18),
                                maximum: new Date(2023, 7, 18),
                                valueType: 'DateTime',
                                labelFormat: 'MMM d',
                                lineStyle: { width: 0 },
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: base_1.Browser.isDevice ? 'None' : 'Shift',
                                labelRotation: base_1.Browser.isDevice ? -45 : 0,
                                interval: base_1.Browser.isDevice ? 2 : 1
                            }, primaryYAxis: {
                                labelFormat: '{value}',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                minimum: 120,
                                maximum: 152,
                                interval: 8
                            }, chartArea: { border: { width: 0 } }, zoomSettings: {
                                enableMouseWheelZooming: true,
                                enablePinchZooming: true,
                                enableScrollbar: false,
                                enableDeferredZooming: true,
                                enablePan: true,
                                mode: 'X',
                                toolbarItems: ['Pan', 'Reset']
                            }, zoomComplete: this.zoomComplete.bind(this), chartMouseLeave: this.chartobjMouseLeave.bind(this), chartMouseMove: this.chartobjMouseMove.bind(this), chartMouseUp: this.chartobjMouseUp.bind(this), load: this.load.bind(this), titleStyle: { textAlignment: 'Near' }, tooltip: { enable: true, fadeOutDuration: base_1.Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>¥${point.y}</b><br>${point.x} 2023', enableMarker: false, enableHighlight: true }, crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' }, title: "US to Yen" },
                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.Crosshair] }),
                            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                                React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Spline", dataSource: financial_data_1.synchronizedData, xName: "USD", yName: "JPY", width: 2 }))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col" },
                        React.createElement(ej2_react_charts_1.ChartComponent, { id: "container3", ref: function (chart) { return _this.chart3 = chart; }, style: { textAlign: 'center' }, primaryXAxis: {
                                minimum: new Date(2023, 1, 18),
                                maximum: new Date(2023, 7, 18),
                                valueType: 'DateTime',
                                labelFormat: 'MMM d',
                                lineStyle: { width: 0 },
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: base_1.Browser.isDevice ? 'None' : 'Shift',
                                labelRotation: base_1.Browser.isDevice ? -45 : 0,
                                interval: base_1.Browser.isDevice ? 2 : 1
                            }, primaryYAxis: {
                                labelFormat: 'n2',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                minimum: 1.30,
                                maximum: 1.37,
                                interval: 0.0175
                            }, chartArea: { border: { width: 0 } }, zoomSettings: {
                                enableMouseWheelZooming: true,
                                enablePinchZooming: true,
                                enableScrollbar: false,
                                enableDeferredZooming: true,
                                enablePan: true,
                                mode: 'X',
                                toolbarItems: ['Pan', 'Reset']
                            }, zoomComplete: this.zoomComplete.bind(this), chartMouseLeave: this.chart3MouseLeave.bind(this), chartMouseMove: this.chart3MouseMove.bind(this), chartMouseUp: this.chart3MouseUp.bind(this), load: this.load.bind(this), titleStyle: { textAlignment: 'Near' }, tooltip: { enable: true, fadeOutDuration: base_1.Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>$${point.y}</b><br>${point.x} 2023', enableMarker: false }, crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' }, title: "US to SGD" },
                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.Crosshair] }),
                            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                                React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Area", dataSource: financial_data_1.synchronizedData, xName: "USD", yName: "SGD", opacity: 0.6, width: 2, border: { width: 2 } })))),
                    React.createElement("div", { className: "col" },
                        React.createElement(ej2_react_charts_1.ChartComponent, { id: "container4", ref: function (chart) { return _this.chart4 = chart; }, style: { textAlign: 'center' }, primaryXAxis: {
                                minimum: new Date(2023, 1, 18),
                                maximum: new Date(2023, 7, 18),
                                valueType: 'DateTime',
                                labelFormat: 'MMM d',
                                lineStyle: { width: 0 },
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: base_1.Browser.isDevice ? 'None' : 'Shift',
                                labelRotation: base_1.Browser.isDevice ? -45 : 0,
                                interval: base_1.Browser.isDevice ? 2 : 1
                            }, primaryYAxis: {
                                labelFormat: 'n1',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                minimum: 79,
                                maximum: 85,
                                interval: 1.5
                            }, chartArea: { border: { width: 0 } }, zoomSettings: {
                                enableMouseWheelZooming: true,
                                enablePinchZooming: true,
                                enableScrollbar: false,
                                enableDeferredZooming: true,
                                enablePan: true,
                                mode: 'X',
                                toolbarItems: ['Pan', 'Reset']
                            }, zoomComplete: this.zoomComplete.bind(this), chartMouseLeave: this.chart4MouseLeave.bind(this), chartMouseMove: this.chart4MouseMove.bind(this), chartMouseUp: this.chart4MouseUp.bind(this), load: this.load.bind(this), titleStyle: { textAlignment: 'Near' }, tooltip: { enable: true, fadeOutDuration: base_1.Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>₹${point.y}</b><br>${point.x} 2023', enableMarker: false }, crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' }, title: "US to INR" },
                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.Crosshair] }),
                            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                                React.createElement(ej2_react_charts_1.SeriesDirective, { type: "SplineArea", dataSource: financial_data_1.synchronizedData, xName: "USD", yName: "INR", opacity: 0.6, width: 2, border: { width: 2 } })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example visualizes the history of currency exchange rates using synchronized charts.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This demo showcases the synchronization of multiple charts, with crosshair, tooltip, and zooming functionalities synchronized across the charts. Hover over or zoom in on one chart to observe the corresponding impact on the other charts as well."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use line series, spline series, area series and splinearea series, we need to inject ",
                    React.createElement("code", null, "LineSeries"),
                    ", ",
                    React.createElement("code", null, "SplineSeries"),
                    ", ",
                    React.createElement("code", null, "AreaSeries"),
                    " and ",
                    React.createElement("code", null, "SplineAreaSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the area series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/cross-hair-and-track-ball", "aria-label": "Navigate to the documentation for Crosshair and Trackball in React Chart component" }, "documentation section"),
                    "."))));
    };
    SynchronizedChart.prototype.zoomComplete = function (args) {
        if (args.axis.name === 'primaryXAxis') {
            this.zoomFactor = args.currentZoomFactor;
            this.zoomPosition = args.currentZoomPosition;
            this.zoomCompleteFunction(args);
        }
    };
    ;
    SynchronizedChart.prototype.zoomCompleteFunction = function (args) {
        for (var i = 0; i < this.charts.length; i++) {
            if (args.axis.series[0].chart.element.id !== this.charts[i].element.id) {
                this.charts[i].primaryXAxis.zoomFactor = this.zoomFactor;
                this.charts[i].primaryXAxis.zoomPosition = this.zoomPosition;
                this.charts[i].zoomModule.isZoomed = args.axis.series[0].chart.zoomModule.isZoomed;
                this.charts[i].zoomModule.isPanning = args.axis.series[0].chart.zoomModule.isPanning;
            }
        }
    };
    SynchronizedChart.prototype.chartMouseLeave = function (args) {
        this.chart2.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chart2.hideTooltip();
        this.chart3.hideTooltip();
        this.chart4.hideTooltip();
    };
    ;
    SynchronizedChart.prototype.chartMouseMove = function (args) {
        if (!base_1.Browser.isDevice || this.chart1.startMove) {
            this.chart2.startMove = this.chart3.startMove = this.chart4.startMove = this.chart1.startMove;
            this.chart2.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chart2.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    ;
    SynchronizedChart.prototype.chartMouseUp = function (args) {
        if (base_1.Browser.isDevice && this.chart1.startMove) {
            this.chart2.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chart2.hideTooltip();
            this.chart3.hideTooltip();
            this.chart4.hideTooltip();
        }
    };
    ;
    SynchronizedChart.prototype.chartobjMouseLeave = function (args) {
        this.chart1.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chart1.hideTooltip();
        this.chart3.hideTooltip();
        this.chart4.hideTooltip();
    };
    ;
    SynchronizedChart.prototype.chartobjMouseMove = function (args) {
        if (!base_1.Browser.isDevice || this.chart2.startMove) {
            this.chart1.startMove = this.chart3.startMove = this.chart4.startMove = this.chart2.startMove;
            this.chart1.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chart1.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    ;
    SynchronizedChart.prototype.chartobjMouseUp = function (args) {
        if (base_1.Browser.isDevice && this.chart2.startMove) {
            this.chart1.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chart1.hideTooltip();
            this.chart3.hideTooltip();
            this.chart4.hideTooltip();
        }
    };
    ;
    SynchronizedChart.prototype.chart3MouseLeave = function (args) {
        this.chart2.hideCrosshair();
        this.chart1.hideCrosshair();
        this.chart4.hideCrosshair();
        this.chart2.hideTooltip();
        this.chart1.hideTooltip();
        this.chart4.hideTooltip();
    };
    ;
    SynchronizedChart.prototype.chart3MouseMove = function (args) {
        if (!base_1.Browser.isDevice || this.chart3.startMove) {
            this.chart1.startMove = this.chart2.startMove = this.chart4.startMove = this.chart3.startMove;
            this.chart2.showTooltip(args.x, args.y);
            this.chart1.showTooltip(args.x, args.y);
            this.chart4.showTooltip(args.x, args.y);
            this.chart2.showCrosshair(args.x, args.y);
            this.chart1.showCrosshair(args.x, args.y);
            this.chart4.showCrosshair(args.x, args.y);
        }
    };
    ;
    SynchronizedChart.prototype.chart3MouseUp = function (args) {
        if (base_1.Browser.isDevice && this.chart3.startMove) {
            this.chart2.hideCrosshair();
            this.chart1.hideCrosshair();
            this.chart4.hideCrosshair();
            this.chart2.hideTooltip();
            this.chart1.hideTooltip();
            this.chart4.hideTooltip();
        }
    };
    ;
    SynchronizedChart.prototype.chart4MouseLeave = function (args) {
        this.chart2.hideCrosshair();
        this.chart3.hideCrosshair();
        this.chart1.hideCrosshair();
        this.chart2.hideTooltip();
        this.chart3.hideTooltip();
        this.chart1.hideTooltip();
    };
    ;
    SynchronizedChart.prototype.chart4MouseMove = function (args) {
        if (!base_1.Browser.isDevice || this.chart4.startMove) {
            this.chart1.startMove = this.chart2.startMove = this.chart3.startMove = this.chart4.startMove;
            this.chart2.showTooltip(args.x, args.y);
            this.chart3.showTooltip(args.x, args.y);
            this.chart1.showTooltip(args.x, args.y);
            this.chart2.showCrosshair(args.x, args.y);
            this.chart3.showCrosshair(args.x, args.y);
            this.chart1.showCrosshair(args.x, args.y);
        }
    };
    ;
    SynchronizedChart.prototype.chart4MouseUp = function (args) {
        if (base_1.Browser.isDevice && this.chart4.startMove) {
            this.chart2.hideCrosshair();
            this.chart3.hideCrosshair();
            this.chart1.hideCrosshair();
            this.chart2.hideTooltip();
            this.chart3.hideTooltip();
            this.chart1.hideTooltip();
        }
    };
    ;
    SynchronizedChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        var themeColor = [];
        var materialColors = ['#00bdae', '#404041', '#357cd2', '#e56590'];
        var materialDarkColors = ['#9ECB08', '#56AEFF', '#C57AFF', '#61EAA9'];
        var fabricColors = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47'];
        var bootstrapColors = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e'];
        var highContrastColors = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773'];
        var bootstrap4Colors = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e'];
        var bootstrap5Colors = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384'];
        var bootstrap5DarkColors = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384'];
        var fluentColors = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF'];
        var tailwindColors = ['#5A61F6', '#65A30D', '#334155', '#14B8A6'];
        var tailwindDarkColors = ['#8B5CF6', '#22D3EE', '#F87171', '#4ADE80'];
        var tailwind3Colors = ['#2F4074', '#03B4B4', '#0D72DE', '#FF5733'];
        var tailwind3DarkColors = ['#8029F1', '#1ABC9C', '#0D72DE', '#FF5733'];
        var fabricdarkColors = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47'];
        var material3Colors = ['#6355C7', '#00AEE0', '#FFB400', '#F7523F'];
        var material3DarkColors = ['#4EAAFF', '#FA4EAB', '#FFF500', '#17EA58'];
        // check the theme
        if (args.chart.theme === 'MaterialDark') {
            themeColor = materialDarkColors;
        }
        else if (args.chart.theme === 'Material') {
            themeColor = materialColors;
        }
        else if (args.chart.theme === "Fabric") {
            themeColor = fabricColors;
        }
        else if (args.chart.theme === "FabricDark") {
            themeColor = fabricdarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            themeColor = bootstrap5DarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5') {
            themeColor = bootstrap5Colors;
        }
        else if (args.chart.theme === "Bootstrap4") {
            themeColor = bootstrap4Colors;
        }
        else if (args.chart.theme === 'TailwindDark') {
            themeColor = tailwindDarkColors;
        }
        else if (args.chart.theme === 'Tailwind') {
            themeColor = tailwindColors;
        }
        else if (args.chart.theme === "HighContrast") {
            themeColor = highContrastColors;
        }
        else if (args.chart.theme === 'FluentDark') {
            themeColor = fluentColors;
        }
        else if (args.chart.theme === 'Bootstrap') {
            themeColor = bootstrapColors;
        }
        else if (args.chart.theme === 'BootstrapDark') {
            themeColor = bootstrapColors;
        }
        else if (args.chart.theme === 'Material3') {
            themeColor = material3Colors;
        }
        else if (args.chart.theme === 'Material3Dark') {
            themeColor = material3DarkColors;
        }
        else if (args.chart.theme === 'Tailwind3Dark') {
            themeColor = tailwind3DarkColors;
        }
        else if (args.chart.theme === 'Tailwind3') {
            themeColor = tailwind3Colors;
        }
        else {
            themeColor = fluentColors;
        }
        // check the container
        if (args.chart.element.id === 'container1') {
            args.chart.series[0].fill = themeColor[0];
        }
        else if (args.chart.element.id === 'container2') {
            args.chart.series[0].fill = themeColor[1];
        }
        else if (args.chart.element.id === 'container3') {
            args.chart.series[0].fill = themeColor[2];
        }
        else if (args.chart.element.id === 'container4') {
            args.chart.series[0].fill = themeColor[3];
        }
    };
    ;
    return SynchronizedChart;
}(sample_base_1.SampleBase));
exports.SynchronizedChart = SynchronizedChart;
