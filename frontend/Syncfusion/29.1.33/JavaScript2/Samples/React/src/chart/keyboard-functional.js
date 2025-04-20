"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for RangeColumn series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var KeyboardNavigation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chartInstance = (0, react_1.useRef)(null);
    var data = [
        { xValue: "Jan 15", yValue: 10 },
        { xValue: "Jan 31", yValue: 15 },
        { xValue: "Feb 15", yValue: 15 },
        { xValue: "Feb 28", yValue: 20 },
        { xValue: "March 15", yValue: 20 },
        { xValue: "March 31", yValue: 25 },
        { xValue: "March", yValue: null }
    ];
    var data1 = [
        { xValue: "Apr 15", yValue: 36 },
        { xValue: "Apr 30", yValue: 48 },
        { xValue: "May 15", yValue: 43 },
        { xValue: "May 31", yValue: 59 },
        { xValue: "Jun 15", yValue: 35 },
        { xValue: "Jun 30", yValue: 50 },
        { xValue: "Jun", yValue: null }
    ];
    var data2 = [
        { xValue: "Jul 15", yValue: 30 },
        { xValue: "Jul 31", yValue: 45 },
        { xValue: "Aug 15", yValue: 30 },
        { xValue: "Aug 31", yValue: 55 },
        { xValue: "Sep 15", yValue: 57 },
        { xValue: "Sep 30", yValue: 60 },
        { xValue: "Sep", yValue: null }
    ];
    var data3 = [
        { xValue: "Oct 15", yValue: 60 },
        { xValue: "Oct 31", yValue: 70 },
        { xValue: "Nov 15", yValue: 70 },
        { xValue: "Nov 30", yValue: 70 },
        { xValue: "Dec 15", yValue: 90 },
        { xValue: "Dec 31", yValue: 100 }
    ];
    var FontColor = "#353535";
    var seriesIndex = 0;
    var Segments = [[0, 5], [7, 12], [14, 19], [21, 26]];
    var legendClick = function (args) {
        seriesIndex = 0;
        getStriplineValues(args.series.name);
    };
    var getStriplineValues = function (legendClickedName) {
        var chart = chartInstance.current;
        for (var i = 0; i < chart.series.length; i++) {
            var name = chart.series[i].name;
            var visible = name === legendClickedName ? !chart.series[i].visible : chart.series[i].visible;
            if (seriesIndex > 3) {
                seriesIndex = 0;
            }
            if (name == "Quarter 1") {
                chart.primaryYAxis.stripLines[0].visible = chart.primaryYAxis.stripLines[1].visible = visible;
                if (chart.primaryYAxis.stripLines[0].visible) {
                    chart.primaryYAxis.stripLines[0].segmentStart = chart.primaryYAxis.stripLines[1].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[0].segmentEnd = chart.primaryYAxis.stripLines[1].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 2") {
                chart.primaryYAxis.stripLines[2].visible = chart.primaryYAxis.stripLines[3].visible = visible;
                if (chart.primaryYAxis.stripLines[2].visible) {
                    chart.primaryYAxis.stripLines[2].segmentStart = chart.primaryYAxis.stripLines[3].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[2].segmentEnd = chart.primaryYAxis.stripLines[3].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 3") {
                chart.primaryYAxis.stripLines[4].visible = chart.primaryYAxis.stripLines[5].visible = visible;
                if (chart.primaryYAxis.stripLines[4].visible) {
                    chart.primaryYAxis.stripLines[4].segmentStart = chart.primaryYAxis.stripLines[5].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[4].segmentEnd = chart.primaryYAxis.stripLines[5].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else {
                chart.primaryYAxis.stripLines[6].visible = chart.primaryYAxis.stripLines[7].visible = visible;
                if (chart.primaryYAxis.stripLines[6].visible) {
                    chart.primaryYAxis.stripLines[6].segmentStart = chart.primaryYAxis.stripLines[7].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[6].segmentEnd = chart.primaryYAxis.stripLines[7].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
        }
        chart.refresh();
    };
    var loaded = function (args) {
        var chart = document.getElementById('keyboard_charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        FontColor = args.chart.theme.indexOf("Dark") > -1 || args.chart.theme.indexOf("HighContrast") > -1 ? "#F3F2F1" : "#353535";
        var FillColors;
        if (args.chart.theme === 'MaterialDark') {
            FillColors = theme_color_1.pointMaterialDarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Material') {
            FillColors = theme_color_1.pointMaterialColors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === "Fabric") {
            FillColors = theme_color_1.pointFabricColors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'FabricDark') {
            FillColors = theme_color_1.keyFabricDark;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            FillColors = theme_color_1.pointBootstrap5DarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Bootstrap4') {
            FillColors = theme_color_1.keyBootstrap4Colors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'Bootstrap5') {
            FillColors = theme_color_1.pointBootstrap5Colors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === "Bootstrap") {
            FillColors = theme_color_1.pointBootstrapColors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'BootstrapDark') {
            FillColors = theme_color_1.keyBootstrapdarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'TailwindDark') {
            FillColors = theme_color_1.pointTailwindDarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Tailwind') {
            FillColors = theme_color_1.pointTailwindColors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === "HighContrast") {
            FillColors = theme_color_1.pointHighContrastColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Fluent') {
            FillColors = theme_color_1.pointFluentColors;
            FontColor = '#000000';
        }
        else if (args.chart.theme === 'FluentDark') {
            FillColors = theme_color_1.pointFluentDarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Material3') {
            FillColors = theme_color_1.pointMaterial3Colors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'Material3Dark') {
            FillColors = theme_color_1.pointMaterial3DarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Fluent2') {
            FillColors = theme_color_1.pointFluent2Colors;
            FontColor = "#000000";
        }
        else if (args.chart.theme === 'Fluent2HighContrast' || args.chart.theme === 'Fluent2Dark') {
            FillColors = theme_color_1.pointFluent2HighContrastColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Tailwind3Dark') {
            FillColors = theme_color_1.pointTailwind3DarkColors;
            FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Tailwind3') {
            FillColors = theme_color_1.pointTailwind3Colors;
            FontColor = "#000000";
        }
        else {
            FillColors = theme_color_1.pointFluentColors;
            FontColor = "#FFFFFF";
        }
        args.chart.primaryYAxis.stripLines[0].color = FillColors[0 % 10];
        args.chart.primaryYAxis.stripLines[2].color = FillColors[1 % 10];
        args.chart.primaryYAxis.stripLines[4].color = FillColors[2 % 10];
        args.chart.primaryYAxis.stripLines[6].color = FillColors[3 % 10];
        args.chart.primaryYAxis.stripLines[1].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[3].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[5].textStyle.color = FontColor;
        args.chart.primaryYAxis.stripLines[7].textStyle.color = FontColor;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'keyboard_charts', ref: chartInstance, style: { textAlign: "center" }, selectionMode: 'Point', selectionPattern: 'DiagonalForward', enableSideBySidePlacement: false, enableAnimation: false, legendClick: legendClick.bind(_this), load: load.bind(_this), loaded: loaded.bind(_this), primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, labelStyle: { size: "0px" }, majorTickLines: { width: 0 } }, primaryYAxis: { maximum: 120, title: "Sales in Percentage", labelFormat: "{value}%", lineStyle: { width: 0 }, majorTickLines: { width: 0 }, stripLines: [{ isSegmented: true, start: 33, end: 35.5, visible: true, segmentStart: 0, segmentEnd: 5 }, { isSegmented: true, start: 39, end: 39.2, visible: true, text: "Jan - Mar", color: "transparent", segmentStart: 0, segmentEnd: 5 }, { isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 7, segmentEnd: 12 }, { isSegmented: true, start: 70, end: 70.2, visible: true, text: "Apr - Jun", segmentStart: 7, segmentEnd: 12, color: "transparent" }, { isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 14, segmentEnd: 19 }, { isSegmented: true, start: 70, end: 70.2, visible: true, text: "Jul - Sep", segmentStart: 14, segmentEnd: 19, color: "transparent" }, { isSegmented: true, start: 104, end: 106.5, visible: true, segmentStart: 21, segmentEnd: 26 }, { isSegmented: true, start: 109, end: 109.2, visible: true, text: "Oct - Dec", segmentStart: 21, segmentEnd: 26, color: "transparent" }] }, zoomSettings: { enableSelectionZooming: true }, title: "Quarterly Sales Chart", chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', tooltip: { enable: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Selection, ej2_react_charts_1.StripLine, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data, name: 'Quarter 1', xName: 'xValue', yName: 'yValue', type: 'Column' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data1, name: 'Quarter 2', xName: 'xValue', yName: 'yValue', type: 'Column' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data2, name: 'Quarter 3', xName: 'xValue', yName: 'yValue', type: 'Column' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data3, name: 'Quarter 4', xName: 'xValue', yName: 'yValue', type: 'Column' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "Keyboard shortcuts can be used to interact with chart functionality. In the example below, various key combinations can be used to interact with the chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("i", null, "The key combinations listed below can be used in the chart to initiate various actions."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "FOCUS ELEMENTS"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Alt"),
                                " + ",
                                React.createElement("kbd", null, "J")),
                            React.createElement("span", null, " - Moves the focus to the chart element.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves the focus to the next element in the chart.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves the focus to the previous element in the chart.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "SERIES"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - Moves the focus to the data point left side from the selected point.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - Moves the focus to the data point right side from the selected point.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Left arrow")),
                            React.createElement("span", null, " - Moves the focus to the next series in our chart.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - Moves the focus to the previous series in our chart.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "ESC")),
                            React.createElement("span", null, " - Cancel the tooltip for the data point.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter"),
                                "/",
                                React.createElement("kbd", null, "Space")),
                            React.createElement("span", null, " - Selects the data point in the series.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "Legend "),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down"),
                                "/",
                                React.createElement("kbd", null, "Left arrow")),
                            React.createElement("span", null, " - Moves the focus to the legend left side from the selected legend.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up"),
                                "/",
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - Moves the focus to the legend right side from the selected legend.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter"),
                                "/",
                                React.createElement("kbd", null, "Space")),
                            React.createElement("span", null, " - Toggles the visibility of the corresponding series.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "ZOOMING AND PANNING"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Ctrl"),
                                " + ",
                                React.createElement("kbd", null, "+")),
                            React.createElement("span", null, " - Zoom in the chart.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Ctrl"),
                                " + ",
                                React.createElement("kbd", null, "-")),
                            React.createElement("span", null, " - Zoom out the chart.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down"),
                                "/",
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - Pans the chart vertically.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Left"),
                                "/",
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - Pans the chart horizontally.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "R")),
                            React.createElement("span", null, " - Reset the zoomed chart.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "PRINT"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Ctrl"),
                                " + ",
                                React.createElement("kbd", null, "P")),
                            React.createElement("span", null, " - Prints the chart."))))))));
};
exports.default = KeyboardNavigation;
