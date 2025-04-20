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
exports.OverView = void 0;
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n.e-dashboardlayout {\n  padding: 20px;\n  z-index: 0;\n}\n.e-panel {\n  cursor: auto !important;\n}\n.e-panel-header{\n  border: none !important;\n  height: 50px !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n} \n.template{\n  height: 100%;\n  width: 100%;\n}\n\n#control-container {\n    padding: 0px !important;\n}\n#gradient-chart stop {\n    stop-color: #2485FA;        \n}\n#gradient-chart1 stop{\n    stop-color: #FEC200;\n} \n.ellipse[id*=_Trackball_1] {\n  strokeWidth: 1 !important;\n}\n.e-chart-focused:focus {\n  outline: none !important;\n}\n.title{\n  font-size: 15px;\n  font-weight: bold;\n  color: #737373;\n}\n\n}";
var argument;
var OverView = /** @class */ (function (_super) {
    __extends(OverView, _super);
    function OverView() {
        var _this = _super.call(this, argument) || this;
        _this.cellSpacing = [15, 15];
        return _this;
    }
    OverView.prototype.columnTemplate = function () {
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.ChartComponent, { style: { "height": "100%", "width": "100%", }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, labelStyle: { size: '11px' } }, load: this.load.bind(this), primaryYAxis: {
                    minimum: 0, maximum: 100, interval: 20, majorTickLines: { width: 0 }, labelFormat: '{value}%', lineStyle: { width: 0 }, labelStyle: { size: '11px' }, titleStyle: { size: '13px' },
                }, tooltip: { enable: true, enableHighlight: true }, legendSettings: { padding: 5, shapeHeight: 8, shapeWidth: 8 }, chartArea: { border: { width: 0 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Column", dataSource: [
                            { Period: '2017', Percentage: 60 },
                            { Period: '2018', Percentage: 56 },
                            { Period: '2019', Percentage: 71 },
                            { Period: '2020', Percentage: 85 },
                            { Period: '2021', Percentage: 73 },
                        ], name: "Online", xName: "Period", yName: "Percentage", fill: '#2485FA', marker: { dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Column", dataSource: [
                            { Period: '2017', Percentage: 40 },
                            { Period: '2018', Percentage: 44 },
                            { Period: '2019', Percentage: 29 },
                            { Period: '2020', Percentage: 15 },
                            { Period: '2021', Percentage: 27 },
                        ], name: "Retail", xName: "Period", yName: "Percentage", fill: '#FEC200', marker: { dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } } })))));
    };
    OverView.prototype.splineTemplate = function () {
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.ChartComponent, { style: { "height": "100%", "width": "100%" }, primaryXAxis: { majorTickLines: { width: 0 }, valueType: "Category", majorGridLines: { width: 0 }, labelStyle: { size: '11px' } }, load: this.load.bind(this), primaryYAxis: {
                    majorTickLines: { width: 0 },
                    minimum: 0, maximum: 12000, interval: 2000, edgeLabelPlacement: 'Shift', labelFormat: '${value}', lineStyle: { width: 0 }, labelStyle: { size: '11px' }, titleStyle: { size: '13px' }
                }, legendSettings: { enableHighlight: true }, tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true, enableMarker: false }, chartArea: { border: { width: 0 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { type: "SplineArea", dataSource: [{ period: 'Jan', percentage: 3600 }, { period: 'Feb', percentage: 6200 },
                            { period: 'Mar', percentage: 8100 }, { period: 'Apr', percentage: 5900 },
                            { period: 'May', percentage: 8900 }, { period: 'Jun', percentage: 7200 },
                            { period: 'Jul', percentage: 4300 }, { period: 'Aug', percentage: 4600 },
                            { period: 'Sep', percentage: 5500 }, { period: 'Oct', percentage: 6350 },
                            { period: 'Nov', percentage: 5700 }, { period: 'Dec', percentage: 8000 },], xName: "period", yName: "percentage", name: "Online", width: 2.5, marker: { visible: false }, fill: "#2485FA", opacity: 0.3, border: { width: 2.75, color: '#2485FA' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { type: "SplineArea", dataSource: [{ period: 'Jan', percentage: 6400 }, { period: 'Feb', percentage: 5300 },
                            { period: 'Mar', percentage: 4900 }, { period: 'Apr', percentage: 5300 },
                            { period: 'May', percentage: 4200 }, { period: 'Jun', percentage: 6500 },
                            { period: 'Jul', percentage: 7900 }, { period: 'Aug', percentage: 3800 },
                            { period: 'Sep', percentage: 6800 }, { period: 'Oct', percentage: 3400 },
                            { period: 'Nov', percentage: 6400 }, { period: 'Dec', percentage: 6800 },], xName: "period", yName: "percentage", name: "Retail", width: 2.5, marker: { visible: false }, fill: "#FEC200", opacity: 0.3, border: { width: 2.75, color: '#FEC200' } })))));
    };
    OverView.prototype.pieTemplate = function () {
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { style: { "height": "100%", "width": "100%" }, legendSettings: { visible: false }, load: this.accumulationload.bind(this), tooltip: { enable: true, format: "${point.tooltip}", enableHighlight: true }, pointRender: this.onPointRender.bind(this), enableSmartLabels: true, enableBorderOnMouseMove: false },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { tooltipMappingName: 'r', dataLabel: {
                            visible: true,
                            position: 'Outside', name: 'Product',
                            connectorStyle: { length: '10px', type: 'Curve' }
                        }, type: "Pie", palettes: ["#61EFCD", "#CDDE1F", "#FEC200", "#CA765A", "#2485FA", "#F57D7D", "#C152D2",
                            "#8854D9", "#3D4EB8", "#00BCD7", "#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e", "#997300"], dataSource: [
                            { Product: "TV : 12%", Percentage: 12, r: 'TV, 30 (12%)' },
                            { Product: "PC : 8%", Percentage: 8, r: 'PC : 20 (8%)' },
                            { Product: "Laptop : 16%", Percentage: 16, r: 'Laptop : 40 (16%)' },
                            { Product: "Mobile : 36%", Percentage: 36, r: 'Mobile : 90 (36%)' },
                            { Product: "Camera : 11%", Percentage: 11, r: 'Camera : 27 (11%)' },
                        ], xName: "Product", yName: "Percentage", startAngle: 270, innerRadius: "40%", border: { width: 3, color: 'transparent' } })))));
    };
    OverView.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { cellSpacing: this.cellSpacing, cellAspectRatio: 0.8, columns: 8 },
                    React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 5, sizeY: 2, row: 0, col: 0, content: this.columnTemplate.bind(this), header: '<div class="title" id="header1";>Sales - Yearly Performance</div>' }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 3, sizeY: 2, row: 0, col: 5, content: this.pieTemplate.bind(this), header: '<div class="title" id="header2">Product Wise Sales - 2021</div>' }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: 8, sizeY: 3, row: 4, col: 0, content: this.splineTemplate.bind(this), header: '<div class="title" id="header3">Monthly Sales for 2021</div>' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample shows an overview of ",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/react-components/react-charts", "aria-label": "Navigate to explore the Syncfusion React Charts" }, "React Charts"),
                    " that allows users to visualize data easily and take decisions based on it. There are different types of charts to create feature rich apps.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The React Chart is a well-crafted charting component to visualize data.In this example, you will see how to render and configure line, column, and pie charts with different features such as highlight, legend, tooltip, and annotation . The Chart uses ",
                    React.createElement("code", null, "SfDataManager"),
                    ", which supports both RESTful JSON data services binding and IEnumerable binding."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    "More information on the React Chart types can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/line", "aria-label": "Navigate to the documentation for Line Chart in React Chart component" }, "documentation section"),
                    ".")),
            React.createElement("svg", { style: { height: '0' } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "gradient-chart1", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" }))))));
    };
    OverView.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        args.chart.series[0].fill = 'url(#' + 'gradient-chart)';
        args.chart.series[1].fill = 'url(#' + 'gradient-chart1)';
    };
    ;
    OverView.prototype.accumulationload = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    OverView.prototype.onPointRender = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme.indexOf('dark') > -1) {
            if (selectedTheme.indexOf('material') > -1) {
                args.border.color = '#303030';
                this.layoutColor = '#303030';
            }
            else if (selectedTheme.indexOf('bootstrap5') > -1) {
                args.border.color = '#343a40';
                this.layoutColor = '#343a40';
            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';
                this.layoutColor = '#1A1A1A';
            }
            else if (selectedTheme.indexOf('fabric') > -1) {
                args.border.color = '#201f1f';
                this.layoutColor = '#201f1f';
            }
            else if (selectedTheme.indexOf('fluent') > -1) {
                args.border.color = '#252423';
                this.layoutColor = '#252423';
            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';
                this.layoutColor = '#1A1A1A';
            }
            else if (selectedTheme.indexOf('tailwind') > -1) {
                args.border.color = '#1F2937';
                this.layoutColor = '#1F2937';
            }
            else {
                args.border.color = '#222222';
                this.layoutColor = '#222222';
            }
        }
        else if (selectedTheme.indexOf('highcontrast') > -1) {
            args.border.color = '#000000';
            this.layoutColor = '#000000';
        }
        else {
            args.border.color = '#FFFFFF';
            this.layoutColor = '#FFFFFF';
        }
        if (selectedTheme.indexOf('highcontrast') > -1 || selectedTheme.indexOf('dark') > -1) {
            var element_1 = document.querySelector('#header1');
            element_1.style.color = '#F3F2F1';
            var element1_1 = document.querySelector('#header2');
            element1_1.style.color = '#F3F2F1';
            var element2_1 = document.querySelector('#header3');
            element2_1.style.color = '#F3F2F1';
        }
        var element = document.querySelector('#layout_0template');
        element.style.background = this.layoutColor;
        var element1 = document.querySelector('#layout_1template');
        element1.style.background = this.layoutColor;
        var element2 = document.querySelector('#layout_2template');
        element2.style.background = this.layoutColor;
    };
    ;
    return OverView;
}(sample_base_1.SampleBase));
exports.OverView = OverView;
