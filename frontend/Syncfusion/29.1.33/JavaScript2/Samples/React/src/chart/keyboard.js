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
exports.KeyboardNavigation = exports.Segments = exports.seriesIndex = exports.FontColor = exports.data3 = exports.data2 = exports.data1 = exports.data = void 0;
/**
 * Sample for RangeColumn series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { xValue: "Jan 15", yValue: 10 },
    { xValue: "Jan 31", yValue: 15 },
    { xValue: "Feb 15", yValue: 15 },
    { xValue: "Feb 28", yValue: 20 },
    { xValue: "March 15", yValue: 20 },
    { xValue: "March 31", yValue: 25 },
    { xValue: "March", yValue: null }
];
exports.data1 = [
    { xValue: "Apr 15", yValue: 36 },
    { xValue: "Apr 30", yValue: 48 },
    { xValue: "May 15", yValue: 43 },
    { xValue: "May 31", yValue: 59 },
    { xValue: "Jun 15", yValue: 35 },
    { xValue: "Jun 30", yValue: 50 },
    { xValue: "Jun", yValue: null }
];
exports.data2 = [
    { xValue: "Jul 15", yValue: 30 },
    { xValue: "Jul 31", yValue: 45 },
    { xValue: "Aug 15", yValue: 30 },
    { xValue: "Aug 31", yValue: 55 },
    { xValue: "Sep 15", yValue: 57 },
    { xValue: "Sep 30", yValue: 60 },
    { xValue: "Sep", yValue: null }
];
exports.data3 = [
    { xValue: "Oct 15", yValue: 60 },
    { xValue: "Oct 31", yValue: 70 },
    { xValue: "Nov 15", yValue: 70 },
    { xValue: "Nov 30", yValue: 70 },
    { xValue: "Dec 15", yValue: 90 },
    { xValue: "Dec 31", yValue: 100 }
];
exports.FontColor = "#353535";
exports.seriesIndex = 0;
exports.Segments = [[0, 5], [7, 12], [14, 19], [21, 26]];
var materialColors = ["#00bdae", "#404041", "#357cd2", "#e56590", "#f8b883", "#70ad47", "#dd8abd", "#7f84e8", "#7bb4eb",
    "#ea7a57", "#404041", "#00bdae"];
var materialDarkColors = ["#9ECB08", "#56AEFF", "#C57AFF", "#61EAA9", "#EBBB3E", "#F45C5C", "#8A77FF", "#63C7FF", "#FF84B0",
    "#F7C928"];
var fabricColors = ["#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e",
    "#997300", "#4472c4", "#70ad47", "#ffc000", "#ed7d31"];
var bootstrapColors = ["#a16ee5", "#f7ce69", "#55a5c2", "#7ddf1e", "#ff6ea6", "#7953ac", "#b99b4f", "#407c92", "#5ea716",
    "#b91c52"];
var highContrastColors = ["#79ECE4", "#E98272", "#DFE6B6", "#C6E773", "#BA98FF", "#FA83C3", "#00C27A", "#43ACEF", "#D681EF",
    "#D8BC6E"];
var bootstrap5Colors = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545', '#FFC107', '#198754', '#0DCAF0'];
var bootstrap5DarkColors = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545', '#FFC107', '#198754', '#0DCAF0'];
var fluentColors = ["#614570", "#4C6FB1", "#CC6952", "#3F579A", "#4EA09B", "#6E7A89", "#D4515C", "#E6AF5D", "#639751",
    "#9D4D69"];
var fluentDarkColors = ["#8AB113", "#2A72D5", "#43B786", "#584EC6", "#E85F9C", "#6E7A89", "#EA6266", "#EBA844", "#26BC7A",
    "#BC4870"];
var tailwindColors = ["#5A61F6", "#65A30D", "#334155", "#14B8A6", "#8B5CF6", "#0369A1", "#F97316", "#9333EA", "#F59E0B", "#15803D"];
var tailwindDarkColors = ["#8B5CF6", "#22D3EE", "#F87171", "#4ADE80", "#E879F9", "#FCD34D", "#F97316", "#2DD4BF", "#F472B6", "#10B981"];
var tailwind3Colors = ['#2F4074', '#03B4B4', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822', '#2F4074', '#03B4B4'];
var tailwind3DarkColors = ['#8029F1', '#1ABC9C', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822', '#8029F1', '#1ABC9C'];
var material3Colors = ["#6355C7", "#00AEE0", "#FFB400", "#F7523F", "#963C70", "#FD7400", "#4BE0BC", "#2196F5", "#DE3D8A",
    "#162F88"];
var material3DarkColors = ["#4EAAFF", "#FA4EAB", "#FFF500", "#17EA58", "#38FFE7", "#FF9E45", "#B3F32F", "#B93CE4", "#FC5664",
    "#9B55FF"];
var fluent2Colors = ["#6200EE", "#09AF74", "#0076E5", "#CB3587", "#E7910F", "#0364DE", "#66CD15", "#F3A93C", "#107C10",
    "#C19C00"];
var fluent2HighContrastColors = ["#9BB449", "#2A72D5", "#43B786", "#3F579A", "#584EC6", "#E85F9C", "#6E7A89", "#EA6266",
    "#0B6A0B", "#C19C00"];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var KeyboardNavigation = /** @class */ (function (_super) {
    __extends(KeyboardNavigation, _super);
    function KeyboardNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyboardNavigation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'keyboard_charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, selectionMode: 'Point', selectionPattern: 'DiagonalForward', enableSideBySidePlacement: false, enableAnimation: false, legendClick: this.legendClick.bind(this), load: this.load.bind(this), loaded: this.loaded.bind(this), primaryXAxis: { title: "Manager",
                        valueType: 'Category',
                        majorGridLines: { width: 0 },
                        labelStyle: { size: "0px" },
                        majorTickLines: { width: 0 }
                    }, primaryYAxis: { maximum: 120, title: "Sales in Percentage",
                        labelFormat: "{value}%",
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        stripLines: [
                            { isSegmented: true, start: 33, end: 35.5, visible: true, segmentStart: 0, segmentEnd: 5 },
                            { isSegmented: true, start: 39, end: 39.2, visible: true, text: "Jan - Mar", color: "transparent", segmentStart: 0, segmentEnd: 5 },
                            { isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 7, segmentEnd: 12 },
                            { isSegmented: true, start: 70, end: 70.2, visible: true, text: "Apr - Jun", segmentStart: 7, segmentEnd: 12, color: "transparent" },
                            { isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 14, segmentEnd: 19 },
                            { isSegmented: true, start: 70, end: 70.2, visible: true, text: "Jul - Sep", segmentStart: 14, segmentEnd: 19, color: "transparent" },
                            { isSegmented: true, start: 104, end: 106.5, visible: true, segmentStart: 21, segmentEnd: 26 },
                            { isSegmented: true, start: 109, end: 109.2, visible: true, text: "Oct - Dec", segmentStart: 21, segmentEnd: 26, color: "transparent" }
                        ]
                    }, zoomSettings: { enableSelectionZooming: true }, title: "Quarterly Sales Chart", chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', tooltip: {
                        enable: true
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Selection, ej2_react_charts_1.StripLine, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Zoom, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, name: 'Quarter 1', xName: 'xValue', yName: 'yValue', type: 'Column' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, name: 'Quarter 2', xName: 'xValue', yName: 'yValue', type: 'Column' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, name: 'Quarter 3', xName: 'xValue', yName: 'yValue', type: 'Column' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, name: 'Quarter 4', xName: 'xValue', yName: 'yValue', type: 'Column' })))),
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
    KeyboardNavigation.prototype.legendClick = function (args) {
        exports.seriesIndex = 0;
        this.getStriplineValues(args.series.name);
    };
    KeyboardNavigation.prototype.getStriplineValues = function (legendClickedName) {
        var chart = this.chartInstance;
        for (var i = 0; i < chart.series.length; i++) {
            var name = chart.series[i].name;
            var visible = name === legendClickedName ? !chart.series[i].visible : chart.series[i].visible;
            if (exports.seriesIndex > 3) {
                exports.seriesIndex = 0;
            }
            if (name == "Quarter 1") {
                chart.primaryYAxis.stripLines[0].visible = chart.primaryYAxis.stripLines[1].visible = visible;
                if (chart.primaryYAxis.stripLines[0].visible) {
                    chart.primaryYAxis.stripLines[0].segmentStart = chart.primaryYAxis.stripLines[1].segmentStart = exports.Segments[exports.seriesIndex][0];
                    chart.primaryYAxis.stripLines[0].segmentEnd = chart.primaryYAxis.stripLines[1].segmentEnd = exports.Segments[exports.seriesIndex][1];
                    exports.seriesIndex++;
                }
            }
            else if (name == "Quarter 2") {
                chart.primaryYAxis.stripLines[2].visible = chart.primaryYAxis.stripLines[3].visible = visible;
                if (chart.primaryYAxis.stripLines[2].visible) {
                    chart.primaryYAxis.stripLines[2].segmentStart = chart.primaryYAxis.stripLines[3].segmentStart = exports.Segments[exports.seriesIndex][0];
                    chart.primaryYAxis.stripLines[2].segmentEnd = chart.primaryYAxis.stripLines[3].segmentEnd = exports.Segments[exports.seriesIndex][1];
                    exports.seriesIndex++;
                }
            }
            else if (name == "Quarter 3") {
                chart.primaryYAxis.stripLines[4].visible = chart.primaryYAxis.stripLines[5].visible = visible;
                if (chart.primaryYAxis.stripLines[4].visible) {
                    chart.primaryYAxis.stripLines[4].segmentStart = chart.primaryYAxis.stripLines[5].segmentStart = exports.Segments[exports.seriesIndex][0];
                    chart.primaryYAxis.stripLines[4].segmentEnd = chart.primaryYAxis.stripLines[5].segmentEnd = exports.Segments[exports.seriesIndex][1];
                    exports.seriesIndex++;
                }
            }
            else {
                chart.primaryYAxis.stripLines[6].visible = chart.primaryYAxis.stripLines[7].visible = visible;
                if (chart.primaryYAxis.stripLines[6].visible) {
                    chart.primaryYAxis.stripLines[6].segmentStart = chart.primaryYAxis.stripLines[7].segmentStart = exports.Segments[exports.seriesIndex][0];
                    chart.primaryYAxis.stripLines[6].segmentEnd = chart.primaryYAxis.stripLines[7].segmentEnd = exports.Segments[exports.seriesIndex][1];
                    exports.seriesIndex++;
                }
            }
        }
        chart.refresh();
    };
    ;
    KeyboardNavigation.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        exports.FontColor = args.chart.theme.indexOf("Dark") > -1 || args.chart.theme.indexOf("HighContrast") > -1 ? "#F3F2F1" : "#353535";
        var FillColors;
        if (args.chart.theme === 'MaterialDark') {
            FillColors = materialDarkColors;
        }
        else if (args.chart.theme === 'Material') {
            FillColors = materialColors;
        }
        else if (args.chart.theme.indexOf("fabric") > -1) {
            FillColors = fabricColors;
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            FillColors = bootstrap5DarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5') {
            FillColors = bootstrap5Colors;
        }
        else if (args.chart.theme.indexOf("bootstrap") > -1) {
            FillColors = bootstrapColors;
        }
        else if (args.chart.theme === 'TailwindDark') {
            FillColors = tailwindDarkColors;
        }
        else if (args.chart.theme === 'Tailwind') {
            FillColors = tailwindColors;
        }
        else if (args.chart.theme === "HighContrast") {
            FillColors = highContrastColors;
        }
        else if (args.chart.theme === 'FluentDark') {
            FillColors = fluentDarkColors;
        }
        else if (args.chart.theme === 'Material3') {
            FillColors = material3Colors;
            exports.FontColor = "#000000";
        }
        else if (args.chart.theme === 'Material3Dark') {
            FillColors = material3DarkColors;
        }
        else if (args.chart.theme === 'Fluent2') {
            FillColors = fluent2Colors;
        }
        else if (args.chart.theme === 'Fluent2HighContrast' || args.chart.theme === 'Fluent2Dark') {
            FillColors = fluent2HighContrastColors;
            exports.FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Tailwind3Dark') {
            FillColors = tailwind3DarkColors;
            exports.FontColor = "#FFFFFF";
        }
        else if (args.chart.theme === 'Tailwind3') {
            FillColors = tailwind3Colors;
            exports.FontColor = "#000000";
        }
        else {
            FillColors = fluentColors;
        }
        args.chart.primaryYAxis.stripLines[0].color = FillColors[0 % 10];
        args.chart.primaryYAxis.stripLines[2].color = FillColors[1 % 10];
        args.chart.primaryYAxis.stripLines[4].color = FillColors[2 % 10];
        args.chart.primaryYAxis.stripLines[6].color = FillColors[3 % 10];
        args.chart.primaryYAxis.stripLines[1].textStyle.color = exports.FontColor;
        args.chart.primaryYAxis.stripLines[3].textStyle.color = exports.FontColor;
        args.chart.primaryYAxis.stripLines[5].textStyle.color = exports.FontColor;
        args.chart.primaryYAxis.stripLines[7].textStyle.color = exports.FontColor;
    };
    ;
    KeyboardNavigation.prototype.loaded = function (args) {
        var chart = document.getElementById('keyboard_charts');
        chart.setAttribute('title', '');
    };
    ;
    return KeyboardNavigation;
}(sample_base_1.SampleBase));
exports.KeyboardNavigation = KeyboardNavigation;
