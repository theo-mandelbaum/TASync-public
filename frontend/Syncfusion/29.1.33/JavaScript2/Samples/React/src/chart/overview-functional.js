"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n.e-dashboardlayout {\n  padding: 20px;\n  z-index: 0;\n}\n.e-panel {\n  cursor: auto !important;\n}\n.e-panel-header{\n  border: none !important;\n  background-color: backgroundcolor;\n  height: 50px !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n} \n.template{\n  height: 100%;\n  width: 100%;\n}\n\n#control-container {\n    padding: 0px !important;\n}\n#gradient-chart stop {\n    stop-color: #2485FA;        \n}\n#gradient-chart1 stop{\n    stop-color: #FEC200;\n} \n.ellipse[id*=_Trackball_1] {\n  strokeWidth: 1 !important;\n}\n.e-chart-focused:focus {\n  outline: none !important;\n}\n.title{\n  font-size: 15px;\n  font-weight: bold;\n  color: #737373;\n}\n\n}";
var argument;
function OverView() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    function columnTemplate() {
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.ChartComponent, { style: { "height": "100%", "width": "100%", }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, labelStyle: { size: '11px' } }, load: load.bind(this), primaryYAxis: {
                    minimum: 0, maximum: 100, majorTickLines: { width: 0 }, labelFormat: '{value}%', lineStyle: { width: 0 }, labelStyle: { size: '11px' }, titleStyle: { size: '13px' },
                }, tooltip: { enable: false }, legendSettings: { padding: 5, shapeHeight: 8, shapeWidth: 8, enableHighlight: true }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Column", dataSource: [
                            { Period: '2020', Percentage: 60 },
                            { Period: '2021', Percentage: 56 },
                            { Period: '2022', Percentage: 71 },
                            { Period: '2023', Percentage: 85 },
                            { Period: '2024', Percentage: 73 },
                        ], name: "Online", xName: "Period", yName: "Percentage", fill: '#2485FA', marker: { dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } }, cornerRadius: { topLeft: 4, topRight: 4 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { type: "Column", dataSource: [
                            { Period: '2020', Percentage: 40 },
                            { Period: '2021', Percentage: 44 },
                            { Period: '2022', Percentage: 29 },
                            { Period: '2023', Percentage: 15 },
                            { Period: '2024', Percentage: 27 },
                        ], name: "Retail", xName: "Period", yName: "Percentage", fill: '#FEC200', marker: { dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } }, cornerRadius: { topLeft: 4, topRight: 4 } })))));
    }
    function splineTemplate() {
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.ChartComponent, { style: { "height": "100%", "width": "100%" }, primaryXAxis: { majorTickLines: { width: 0 }, valueType: "Category", majorGridLines: { width: 0 }, labelStyle: { size: '11px' } }, load: load.bind(this), primaryYAxis: {
                    majorTickLines: { width: 0 },
                    minimum: 0, maximum: 12000, edgeLabelPlacement: 'Shift', labelFormat: '${value}', lineStyle: { width: 0 }, labelStyle: { size: '11px' }, titleStyle: { size: '13px' }
                }, legendSettings: { enableHighlight: true }, tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true, enableMarker: false }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } } },
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
    }
    function pieTemplate() {
        return (React.createElement("div", { className: "template" },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { style: { "height": "100%", "width": "100%" }, legendSettings: { visible: false }, load: accumulationload.bind(this), tooltip: { enable: true, format: "${point.tooltip}", enableHighlight: true }, pointRender: onPointRender.bind(this), enableSmartLabels: false, enableBorderOnMouseMove: false },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { tooltipMappingName: 'Product', dataLabel: {
                            visible: true,
                            position: 'Outside', name: 'r',
                            connectorStyle: { length: '10px', type: 'Curve' }
                        }, type: "Pie", palettes: ["#61EFCD", "#CDDE1F", "#FEC200", "#CA765A", "#2485FA", "#F57D7D", "#C152D2",
                            "#8854D9", "#3D4EB8", "#00BCD7", "#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e", "#997300"], dataSource: [
                            { Product: "TV : 30 (12%)", Percentage: 12, r: "TV, 30 <br>12%" },
                            { Product: "PC : 20 (8%)", Percentage: 8, r: "PC, 20 <br>8%" },
                            { Product: "Laptop : 40 (16%)", Percentage: 16, r: "Laptop, 40 <br>16%" },
                            { Product: "Mobile : 90 (36%)", Percentage: 36, r: "Mobile, 90 <br>36%" },
                            { Product: "Camera : 27 (11%)", Percentage: 11, r: "Camera, 27 <br>11%" },
                        ], xName: "Product", yName: "Percentage", startAngle: 270, innerRadius: "40%", border: { width: 3, color: 'transparent' } })))));
    }
    var cellSpacing = [15, 15];
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { cellSpacing: cellSpacing, cellAspectRatio: ej2_base_1.Browser.isDevice ? 1 : 0.8, columns: ej2_base_1.Browser.isDevice ? 2 : 8 },
                React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                    React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: ej2_base_1.Browser.isDevice ? 1 : 5, sizeY: ej2_base_1.Browser.isDevice ? 1 : 2, row: 0, col: 0, content: columnTemplate.bind(this), header: '<div class="title" id="header1";>Sales - Yearly Performance</div>' }),
                    React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: ej2_base_1.Browser.isDevice ? 1 : 3, sizeY: ej2_base_1.Browser.isDevice ? 1 : 2, row: 0, col: ej2_base_1.Browser.isDevice ? 1 : 5, content: pieTemplate.bind(this), header: '<div  class="title" id="header2";>Product Wise Sales - 2024</div>' }),
                    React.createElement(ej2_react_layouts_1.PanelDirective, { sizeX: ej2_base_1.Browser.isDevice ? 2 : 8, sizeY: ej2_base_1.Browser.isDevice ? 1 : 3, row: ej2_base_1.Browser.isDevice ? 1 : 4, col: 0, content: splineTemplate.bind(this), header: '<div  class="title" id="header3";>Monthly Sales for 2024</div>' })))),
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
                "More information on the React Chart types can be found in this ",
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
    function load(args) {
        (0, theme_color_1.loadChartTheme)(args);
        args.chart.series[0].fill = 'url(#' + 'gradient-chart)';
        args.chart.series[1].fill = 'url(#' + 'gradient-chart1)';
    }
    ;
    function accumulationload(args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    }
    ;
    function onPointRender(args) {
        (0, theme_color_1.accPointRender)(args);
    }
}
exports.default = OverView;
