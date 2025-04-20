"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Synchronized Chart
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var financial_data_1 = require("./financial-data");
var base_1 = require("@syncfusion/ej2/base");
var theme_color_1 = require("./theme-color");
var theme_color_2 = require("./theme-color");
var SAMPLE_CSS = "\n#control-container {\n    padding: 1px !important;\n}\n\n.row {\n    display: flex;\n    margin: 0px;\n}\n\n.col {\n    width: 50%;\n    margin: 10px;\n    height: 270px;\n}";
/**
 * Synchronized Chart Sample
 */
var SynchronizedChart = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chart1;
    var chart2;
    var chart3;
    var chart4;
    var charts = [];
    (0, react_1.useEffect)(function () {
        charts = [chart1, chart2, chart3, chart4];
    }, []);
    var zoomFactor = 0;
    var zoomPosition = 0;
    var isZoom = false;
    var selectedData = [];
    var count = 0;
    var legendCount = 0;
    var load = function (args) {
        args.chart.primaryXAxis.labelRotation = base_1.Browser.isDevice ? -45 : 0;
        (0, theme_color_1.loadChartTheme)(args);
        var themeColor = [];
        if (args.chart.theme === 'MaterialDark') {
            themeColor = theme_color_2.pointMaterialDarkColors;
        }
        else if (args.chart.theme === 'Material') {
            themeColor = theme_color_2.pointMaterialColors;
        }
        else if (args.chart.theme === "Fabric") {
            themeColor = theme_color_2.pointFabricColors;
        }
        else if (args.chart.theme === "FabricDark") {
            themeColor = theme_color_2.pointFabricColors;
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            themeColor = theme_color_2.pointBootstrap5DarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5') {
            themeColor = theme_color_2.pointBootstrap5Colors;
        }
        else if (args.chart.theme === "Bootstrap4") {
            themeColor = theme_color_2.keyBootstrap4Colors;
        }
        else if (args.chart.theme === 'TailwindDark') {
            themeColor = theme_color_2.pointTailwindDarkColors;
        }
        else if (args.chart.theme === 'Tailwind') {
            themeColor = theme_color_2.pointTailwindColors;
        }
        else if (args.chart.theme === "HighContrast") {
            themeColor = theme_color_2.pointHighContrastColors;
        }
        else if (args.chart.theme === 'FluentDark') {
            themeColor = theme_color_2.pointFluentDarkColors;
        }
        else if (args.chart.theme === 'Bootstrap') {
            themeColor = theme_color_2.pointBootstrapColors;
        }
        else if (args.chart.theme === 'BootstrapDark') {
            themeColor = theme_color_2.pointBootstrapColors;
        }
        else if (args.chart.theme === 'Material3') {
            themeColor = theme_color_2.pointMaterial3Colors;
        }
        else if (args.chart.theme === 'Material3Dark') {
            themeColor = theme_color_2.pointMaterial3DarkColors;
        }
        else if (args.chart.theme === 'Fluent2') {
            themeColor = theme_color_2.pointFluent2Colors;
        }
        else if (args.chart.theme === 'Fluent2HighContrast' || args.chart.theme === 'Fluent2Dark') {
            themeColor = theme_color_2.pointFluent2DarkColors;
        }
        else if (args.chart.theme === 'Tailwind3Dark') {
            themeColor = theme_color_2.pointTailwind3DarkColors;
        }
        else if (args.chart.theme === 'Tailwind3') {
            themeColor = theme_color_2.pointTailwind3Colors;
        }
        else {
            themeColor = theme_color_2.pointFluentColors;
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
    var onChartLoad = function (args) {
        var chart = document.getElementById('container1');
        chart.setAttribute('title', '');
    };
    var onChartLoad2 = function (args) {
        var chart = document.getElementById('container2');
        chart.setAttribute('title', '');
    };
    var onChartLoad3 = function (args) {
        var chart = document.getElementById('container3');
        chart.setAttribute('title', '');
    };
    var onChartLoad4 = function (args) {
        var chart = document.getElementById('container4');
        chart.setAttribute('title', '');
    };
    var zoomComplete = function (args) {
        if (args.axis.name === 'primaryXAxis') {
            zoomFactor = args.currentZoomFactor;
            zoomPosition = args.currentZoomPosition;
            zoomCompleteFunction(args);
        }
    };
    var zoomCompleteFunction = function (args) {
        for (var i = 0; i < charts.length; i++) {
            if (args.axis.series[0].chart.element.id !== charts[i].element.id) {
                charts[i].primaryXAxis.zoomFactor = zoomFactor;
                charts[i].primaryXAxis.zoomPosition = zoomPosition;
                charts[i].zoomModule.isZoomed = args.axis.series[0].chart.zoomModule.isZoomed;
                charts[i].zoomModule.isPanning = args.axis.series[0].chart.zoomModule.isPanning;
            }
        }
    };
    var chartMouseLeave = function (args) {
        chart2.hideCrosshair();
        chart3.hideCrosshair();
        chart4.hideCrosshair();
        chart2.hideTooltip();
        chart3.hideTooltip();
        chart4.hideTooltip();
    };
    var chartMouseMove = function (args) {
        if ((!base_1.Browser.isDevice && !chart1.isTouch && !chart1.isChartDrag) || chart1.startMove) {
            chart2.startMove = chart3.startMove = chart4.startMove = chart1.startMove;
            chart2.showTooltip(args.x, args.y);
            chart3.showTooltip(args.x, args.y);
            chart4.showTooltip(args.x, args.y);
            chart2.showCrosshair(args.x, args.y);
            chart3.showCrosshair(args.x, args.y);
            chart4.showCrosshair(args.x, args.y);
        }
    };
    var chartobjMouseLeave = function (args) {
        chart1.hideCrosshair();
        chart3.hideCrosshair();
        chart4.hideCrosshair();
        chart1.hideTooltip();
        chart3.hideTooltip();
        chart4.hideTooltip();
    };
    var chartobjMouseMove = function (args) {
        if ((!base_1.Browser.isDevice && !chart2.isTouch && !chart2.isChartDrag) || chart2.startMove) {
            chart1.startMove = chart3.startMove = chart4.startMove = chart2.startMove;
            chart1.showTooltip(args.x, args.y);
            chart3.showTooltip(args.x, args.y);
            chart4.showTooltip(args.x, args.y);
            chart1.showCrosshair(args.x, args.y);
            chart3.showCrosshair(args.x, args.y);
            chart4.showCrosshair(args.x, args.y);
        }
    };
    var chart3MouseLeave = function (args) {
        chart2.hideCrosshair();
        chart1.hideCrosshair();
        chart4.hideCrosshair();
        chart2.hideTooltip();
        chart1.hideTooltip();
        chart4.hideTooltip();
    };
    var chart3MouseMove = function (args) {
        if ((!base_1.Browser.isDevice && !chart3.isTouch && !chart3.isChartDrag) || chart3.startMove) {
            chart1.startMove = chart2.startMove = chart4.startMove = chart3.startMove;
            chart1.showTooltip(args.x, args.y);
            chart2.showTooltip(args.x, args.y);
            chart4.showTooltip(args.x, args.y);
            chart1.showCrosshair(args.x, args.y);
            chart2.showCrosshair(args.x, args.y);
            chart4.showCrosshair(args.x, args.y);
        }
    };
    var chart4MouseLeave = function (args) {
        chart2.hideCrosshair();
        chart3.hideCrosshair();
        chart1.hideCrosshair();
        chart2.hideTooltip();
        chart3.hideTooltip();
        chart1.hideTooltip();
    };
    var chart4MouseMove = function (args) {
        if ((!base_1.Browser.isDevice && !chart4.isTouch && !chart4.isChartDrag) || chart4.startMove) {
            chart1.startMove = chart2.startMove = chart3.startMove = chart4.startMove;
            chart1.showTooltip(args.x, args.y);
            chart2.showTooltip(args.x, args.y);
            chart3.showTooltip(args.x, args.y);
            chart1.showCrosshair(args.x, args.y);
            chart2.showCrosshair(args.x, args.y);
            chart3.showCrosshair(args.x, args.y);
        }
    };
    var chartMouseUp = function (args) {
        if (base_1.Browser.isDevice && chart1.startMove) {
            chart2.hideCrosshair();
            chart3.hideCrosshair();
            chart4.hideCrosshair();
            chart2.hideTooltip();
            chart3.hideTooltip();
            chart4.hideTooltip();
        }
    };
    var chart2MouseUp = function (args) {
        if (base_1.Browser.isDevice && chart2.startMove) {
            chart1.hideCrosshair();
            chart3.hideCrosshair();
            chart4.hideCrosshair();
            chart1.hideTooltip();
            chart3.hideTooltip();
            chart4.hideTooltip();
        }
    };
    var chart3MouseUp = function (args) {
        if (base_1.Browser.isDevice && chart3.startMove) {
            chart2.hideCrosshair();
            chart1.hideCrosshair();
            chart4.hideCrosshair();
            chart2.hideTooltip();
            chart1.hideTooltip();
            chart4.hideTooltip();
        }
    };
    var chart4MouseUp = function (args) {
        if (base_1.Browser.isDevice && chart4.startMove) {
            chart2.hideCrosshair();
            chart3.hideCrosshair();
            chart1.hideCrosshair();
            chart2.hideTooltip();
            chart3.hideTooltip();
            chart1.hideTooltip();
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "row", style: { margin: 0 } },
                React.createElement("div", { className: "col" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: "container1", ref: function (chart) { return chart1 = chart; }, style: { textAlign: 'center' }, primaryXAxis: {
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
                            enableDeferredZooming: false,
                            enablePan: true,
                            mode: 'X',
                            toolbarItems: ['Pan', 'Reset']
                        }, zoomComplete: zoomComplete.bind(_this), chartMouseLeave: chartMouseLeave.bind(_this), chartMouseMove: chartMouseMove.bind(_this), chartMouseUp: chartMouseUp.bind(_this), load: load.bind(_this), loaded: onChartLoad.bind(_this), titleStyle: { textAlignment: 'Near' }, tooltip: { enable: true, fadeOutDuration: base_1.Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>€${point.y}</b><br>${point.x} 2023', enableMarker: false, enableHighlight: true }, crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' }, title: "US to Euro" },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Line", dataSource: financial_data_1.synchronizedData, xName: "USD", yName: "EUR", width: 2, emptyPointSettings: { mode: 'Drop' } })))),
                React.createElement("div", { className: "col" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: "container2", ref: function (chart) { return chart2 = chart; }, style: { textAlign: 'center' }, primaryXAxis: {
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
                            interval: 8,
                            labelPadding: 8
                        }, chartArea: { border: { width: 0 } }, zoomSettings: {
                            enableMouseWheelZooming: true,
                            enablePinchZooming: true,
                            enableScrollbar: false,
                            enableDeferredZooming: false,
                            enablePan: true,
                            mode: 'X',
                            toolbarItems: ['Pan', 'Reset']
                        }, zoomComplete: zoomComplete.bind(_this), chartMouseLeave: chartobjMouseLeave.bind(_this), chartMouseMove: chartobjMouseMove.bind(_this), chartMouseUp: chart2MouseUp.bind(_this), load: load.bind(_this), loaded: onChartLoad2.bind(_this), titleStyle: { textAlignment: 'Near' }, tooltip: { enable: true, fadeOutDuration: base_1.Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>¥${point.y}</b><br>${point.x} 2023', enableMarker: false, enableHighlight: true }, crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' }, title: "US to Yen" },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Line", dataSource: financial_data_1.synchronizedData, xName: "USD", yName: "JPY", width: 2 }))))),
            React.createElement("div", { className: "row", style: { margin: 0 } },
                React.createElement("div", { className: "col" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: "container3", ref: function (chart) { return chart3 = chart; }, style: { textAlign: 'center' }, primaryXAxis: {
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
                            enableDeferredZooming: false,
                            enablePan: true,
                            mode: 'X',
                            toolbarItems: ['Pan', 'Reset']
                        }, zoomComplete: zoomComplete.bind(_this), chartMouseLeave: chart3MouseLeave.bind(_this), chartMouseMove: chart3MouseMove.bind(_this), chartMouseUp: chart3MouseUp.bind(_this), load: load.bind(_this), loaded: onChartLoad3.bind(_this), titleStyle: { textAlignment: 'Near' }, tooltip: { enable: true, fadeOutDuration: base_1.Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>$${point.y}</b><br>${point.x} 2023', enableMarker: false }, crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' }, title: "US to SGD" },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Area", dataSource: financial_data_1.synchronizedData, xName: "USD", yName: "SGD", opacity: 0.6, width: 2, border: { width: 2 } })))),
                React.createElement("div", { className: "col" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: "container4", ref: function (chart) { return chart4 = chart; }, style: { textAlign: 'center' }, primaryXAxis: {
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
                            enableDeferredZooming: false,
                            enablePan: true,
                            mode: 'X',
                            toolbarItems: ['Pan', 'Reset']
                        }, zoomComplete: zoomComplete.bind(_this), chartMouseLeave: chart4MouseLeave.bind(_this), chartMouseMove: chart4MouseMove.bind(_this), chartMouseUp: chart4MouseUp.bind(_this), load: load.bind(_this), loaded: onChartLoad4.bind(_this), titleStyle: { textAlignment: 'Near' }, tooltip: { enable: true, fadeOutDuration: base_1.Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>₹${point.y}</b><br>${point.x} 2023', enableMarker: false }, crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' }, title: "US to INR" },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Area", dataSource: financial_data_1.synchronizedData, xName: "USD", yName: "INR", opacity: 0.6, width: 2, border: { width: 2 } })))))),
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
                "Chart component features are segregated into individual feature-wise modules. To use line series and area series, we need to inject ",
                React.createElement("code", null, "LineSeries"),
                " and ",
                React.createElement("code", null, "AreaSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the area series can be found in this \u00A0",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/cross-hair-and-track-ball", "aria-label": "Navigate to the documentation for Crosshair and Trackball in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = SynchronizedChart;
function componentDidMount() {
    throw new Error('Function not implemented.');
}
