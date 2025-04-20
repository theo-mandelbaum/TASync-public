"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VINYL = exports.CASSETTE = exports.COMPACT = exports.DOWNLOADS = exports.STREAMING = exports.TRACK = exports.OTHERS = void 0;
/**
 * Sample for Area series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.OTHERS = [
    { x: new Date(1988, 0, 1), y: -0.16 }, { x: new Date(1989, 0, 1), y: -0.17 }, { x: new Date(1990, 0, 1), y: -0.08 },
    { x: new Date(1992, 0, 1), y: 0.08 }, { x: new Date(1996, 0, 1), y: 0.161 }, { x: new Date(1998, 0, 1), y: 0.48 },
    { x: new Date(1999, 0, 1), y: 0.16 }, { x: new Date(2001, 0, 1), y: 0.4 }, { x: new Date(2002, 0, 1), y: 0.32 },
    { x: new Date(2003, 0, 1), y: 0.807 }, { x: new Date(2005, 0, 1), y: 1.12 }, { x: new Date(2006, 0, 1), y: 1.614 },
    { x: new Date(2008, 0, 1), y: 1.21 }, { x: new Date(2009, 0, 1), y: 1.12 }, { x: new Date(2011, 0, 1), y: 0.64 },
    { x: new Date(2013, 0, 1), y: 0.161 }, { x: new Date(2018, 0, 1), y: -0.08 }
];
exports.TRACK = [
    { x: new Date(1973, 0, 1), y: 2.58 }, { x: new Date(1975, 0, 1), y: 2.25 }, { x: new Date(1977, 0, 1), y: 3.55 },
    { x: new Date(1978, 0, 1), y: 2.42 }, { x: new Date(1981, 0, 1), y: -0.24 }, { x: new Date(1982, 0, 1), y: -0 }
];
exports.STREAMING = [
    { x: new Date(2011, 0, 1), y: 0.48 }, { x: new Date(2013, 0, 1), y: 1.61 }, { x: new Date(2015, 0, 1), y: 2.12 },
    { x: new Date(2017, 0, 1), y: 7.18 }
];
exports.DOWNLOADS = [
    { x: new Date(2004, 0, 1), y: 0.48 }, { x: new Date(2007, 0, 1), y: 1.45 }, { x: new Date(2012, 0, 1), y: 2.82 },
    { x: new Date(2013, 0, 1), y: 2.58 }, { x: new Date(2015, 0, 1), y: 2.01 }, { x: new Date(2016, 0, 1), y: 1.61 },
    { x: new Date(2017, 0, 1), y: 0.8 }
];
exports.COMPACT = [
    { x: new Date(1990, 0, 1), y: 0.69 }, { x: new Date(1992, 0, 1), y: 2.86 }, { x: new Date(1995, 0, 1), y: 10.2 },
    { x: new Date(1996, 0, 1), y: 13.0 }, { x: new Date(1997, 0, 1), y: 14.35 }, { x: new Date(1998, 0, 1), y: 15.17 },
    { x: new Date(1999, 0, 1), y: 14.89 }, { x: new Date(2000, 0, 1), y: 18.96 }, { x: new Date(2001, 0, 1), y: 18.78 },
    { x: new Date(2004, 0, 1), y: 14.25 }, { x: new Date(2005, 0, 1), y: 14.24 }, { x: new Date(2006, 0, 1), y: 12.34 },
    { x: new Date(2007, 0, 1), y: 9.34 }, { x: new Date(2008, 0, 1), y: 4.45 }, { x: new Date(2010, 0, 1), y: 1.46 },
    { x: new Date(2011, 1, 1), y: 0.64 }
];
exports.CASSETTE = [
    { x: new Date(1976, 0, 1), y: 0.08 }, { x: new Date(1979, 0, 1), y: 1.85 }, { x: new Date(1980, 0, 1), y: 2.0 },
    { x: new Date(1982, 0, 1), y: 3.55 }, { x: new Date(1984, 0, 1), y: 5.4 }, { x: new Date(1985, 0, 1), y: 5.24 },
    { x: new Date(1988, 0, 1), y: 6.94 }, { x: new Date(1989, 0, 1), y: 6.85 }, { x: new Date(1990, 0, 1), y: 7.02 },
    { x: new Date(1992, 0, 1), y: 5.81 }, { x: new Date(1993, 0, 1), y: 5.32 }, { x: new Date(1994, 0, 1), y: 4.03 },
    { x: new Date(1997, 0, 1), y: 2.25 }, { x: new Date(1998, 0, 1), y: 2.01 }, { x: new Date(1999, 0, 1), y: 0.8 },
    { x: new Date(2001, 0, 1), y: 0.4 }
];
exports.VINYL = [
    { x: new Date(1973, 0, 1), y: 7.74 }, { x: new Date(1974, 0, 1), y: 7.58 }, { x: new Date(1976, 0, 1), y: 8.23 },
    { x: new Date(1977, 0, 1), y: 9.68 }, { x: new Date(1978, 0, 1), y: 10.16 }, { x: new Date(1979, 0, 1), y: 8.15 },
    { x: new Date(1981, 0, 1), y: 6.77 }, { x: new Date(1982, 0, 1), y: 5.64 }, { x: new Date(1984, 0, 1), y: 4.35 },
    { x: new Date(1985, 0, 1), y: 2.5 }, { x: new Date(1989, 0, 1), y: 0.64 }, { x: new Date(1990, 0, 1), y: 0 }
];
var content = ej2_base_1.Browser.isDevice ? '<div style="font-weight: bold; color: white; font-size: 8px;">8-TRACK</div>' : '<div style="font-weight: bold; color: white; font-size: 11px;">8-TRACK</div>';
var content1 = ej2_base_1.Browser.isDevice ? '<div style="font-weight: bold; color: white; font-size: 8px;">VINYL</div>' : '<div style="font-weight: bold; color: white;font-size: 11px;">VINYL</div>';
var content2 = ej2_base_1.Browser.isDevice ? '<div style="font-weight: bold; color: white; font-size: 8px;">CASSETTE</div>' : '<div style="font-weight: bold; color: white;font-size: 11px;">CASSETTE</div>';
var content3 = ej2_base_1.Browser.isDevice ? '<div style="font-weight: bold; color: white; font-size: 8px;">COMPACT DISC</div>' : '<div style="font-weight: bold; color: white;font-size: 11px;">COMPACT DISC</div>';
var content4 = ej2_base_1.Browser.isDevice ? '<div style="font-weight: bold; color: white; font-size: 8px;">OTHERS</div>' : '<div style="font-weight: bold; color: white;font-size: 11px;">OTHERS</div>';
var content5 = ej2_base_1.Browser.isDevice ? '<div style="font-weight: bold; color: white; font-size: 8px;">DOWNLOAD</div>' : '<div style="font-weight: bold; color: white; font-size: 11px;">DOWNLOAD</div>';
var content6 = ej2_base_1.Browser.isDevice ? '' : '<div style="font-weight: bold; color: white;font-size: 11px;">STREAMING</div>';
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Area sampleuiz
 */
var Area = function () {
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
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', minimum: new Date(1973, 1, 1), maximum: new Date(2018, 1, 1), labelFormat: 'y', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, primaryYAxis: { title: 'In Billions (USD)', labelFormat: '{value}', interval: 5, minimum: 0, maximum: 25, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, load: load.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, title: "US Music Sales By Format", loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.Legend, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content, region: "Series", x: "8%", y: "95%" }),
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content1, region: "Series", x: "12%", y: "80%" }),
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content2, region: "Series", x: "35%", y: "87%" }),
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content3, region: "Series", x: "63%", y: "70%" }),
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content4, region: "Series", x: "75%", y: "98%" }),
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content5, region: "Series", x: "85%", y: "93%" }),
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content6, region: "Series", x: "93%", y: "96%" })),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.COMPACT, xName: "x", yName: "y", opacity: 1, type: "Area", width: 2, border: { width: 1.5, color: 'white' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.DOWNLOADS, xName: "x", yName: "y", opacity: 1, type: "Area", width: 2, border: { width: 1.5, color: 'white' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.STREAMING, xName: "x", yName: "y", opacity: 1, type: "Area", width: 2, border: { width: 1.5, color: 'white' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.CASSETTE, xName: "x", yName: "y", opacity: 1, type: "Area", width: 2, border: { width: 1.5, color: 'white' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.VINYL, xName: "x", yName: "y", opacity: 1, type: "Area", width: 2, border: { width: 1.5, color: 'white' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.TRACK, xName: "x", yName: "y", opacity: 1, type: "Area", width: 2, border: { width: 1.5, color: 'white' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.OTHERS, xName: "x", yName: "y", opacity: 1, type: "Area", width: 2, border: { width: 1.5, color: 'white' } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React Area Chart example visualizes music sales data by format in US by using a default area series in the chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how the area type chart can be rendered and configured. It is like the line chart, which represents time-dependent data and shows trends at equal intervals, but the area is closed and filled with the color of the series."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject ",
                React.createElement("code", null, "AreaSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the area series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/area", "aria-label": "Navigate to the documentation for Area Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Area;
