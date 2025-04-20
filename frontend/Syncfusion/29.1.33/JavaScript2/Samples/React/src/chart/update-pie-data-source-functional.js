"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n  .control-fluid {\n    padding: 0px !important;\n  }\n  .donut-chart {\n    align: center;\n  }\n";
var updatedData = [
    { x: 'Apple', y: 7.8451 },
    { x: 'Google', y: 13.4167 },
    { x: 'Amazon', y: 6.9403 },
    { x: 'Microsoft', y: 20.7127 },
    { x: 'IBM', y: 76.2822 },
    { x: 'Oracle', y: 21.0090 },
    { x: 'Netflix', y: 16.8242 }
];
var updatedData2 = [
    { x: 'Apple', y: 10.9899 },
    { x: 'Google', y: 14.2521 },
    { x: 'Amazon', y: 9.8100 },
    { x: 'Microsoft', y: 20.4205 },
    { x: 'IBM', y: 100.6536 },
    { x: 'Oracle', y: 26.0708 },
    { x: 'Netflix', y: 27.4937 }
];
var updatedData3 = [
    { x: 'Apple', y: 17.4344 },
    { x: 'Google', y: 16.1018 },
    { x: 'Amazon', y: 10.9887 },
    { x: 'Microsoft', y: 24.0142 },
    { x: 'IBM', y: 117.6709 },
    { x: 'Oracle', y: 24.9828 },
    { x: 'Netflix', y: 11.8551 }
];
var updatedData4 = [
    { x: 'Apple', y: 14.5929 },
    { x: 'Google', y: 22.1492 },
    { x: 'Amazon', y: 14.8658 },
    { x: 'Microsoft', y: 26.9842 },
    { x: 'IBM', y: 118.2763 },
    { x: 'Oracle', y: 28.5474 },
    { x: 'Netflix', y: 35.2718 }
];
var updatedData5 = [
    { x: 'Apple', y: 20.4231 },
    { x: 'Google', y: 28.3890 },
    { x: 'Amazon', y: 16.5876 },
    { x: 'Microsoft', y: 36.2762 },
    { x: 'IBM', y: 113.4907 },
    { x: 'Oracle', y: 34.4296 },
    { x: 'Netflix', y: 57.4951 }
];
var updatedData6 = [
    { x: 'Apple', y: 27.0239 },
    { x: 'Google', y: 30.9638 },
    { x: 'Amazon', y: 23.8494 },
    { x: 'Microsoft', y: 40.9778 },
    { x: 'IBM', y: 99.4267 },
    { x: 'Oracle', y: 35.4508 },
    { x: 'Netflix', y: 91.8956 }
];
var updatedData7 = [
    { x: 'Apple', y: 24.0368 },
    { x: 'Google', y: 38.1172 },
    { x: 'Amazon', y: 34.8921 },
    { x: 'Microsoft', y: 49.8084 },
    { x: 'IBM', y: 100.0202 },
    { x: 'Oracle', y: 34.6261 },
    { x: 'Netflix', y: 102.0304 }
];
var updatedData8 = [
    { x: 'Apple', y: 35.2487 },
    { x: 'Google', y: 46.9350 },
    { x: 'Amazon', y: 48.2920 },
    { x: 'Microsoft', y: 66.5079 },
    { x: 'IBM', y: 108.4717 },
    { x: 'Oracle', y: 41.7164 },
    { x: 'Netflix', y: 165.3743 }
];
var updatedData9 = [
    { x: 'Apple', y: 44.9396 },
    { x: 'Google', y: 56.0381 },
    { x: 'Amazon', y: 81.8891 },
    { x: 'Microsoft', y: 95.1360 },
    { x: 'IBM', y: 103.0934 },
    { x: 'Oracle', y: 43.7122 },
    { x: 'Netflix', y: 319.2903 }
];
var updatedData10 = [
    { x: 'Apple', y: 50.2883 },
    { x: 'Google', y: 59.4929 },
    { x: 'Amazon', y: 89.2447 },
    { x: 'Microsoft', y: 124.6044 },
    { x: 'IBM', y: 103.0097 },
    { x: 'Oracle', y: 49.6689 },
    { x: 'Netflix', y: 328.8713 }
];
var UpdatePieDataSource = function () {
    var pieRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(null), intervalId = _a[0], setIntervalId = _a[1];
    var _b = (0, react_1.useState)(10), year = _b[0], setYear = _b[1];
    var _c = (0, react_1.useState)(2), yearIndex = _c[0], setYearIndex = _c[1];
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        yearIndex = 2;
        year = 10;
        args.accumulation.centerLabel.text = "2010";
        (0, theme_color_1.loadAccumulationChartTheme)(args);
        updateData(args);
    };
    var onChartLoad = function (args) {
        var chart = document.getElementById('donut-container');
        chart.setAttribute('title', '');
    };
    var updateData = function (args) {
        updateClearInterval();
        intervalId = setInterval(function () {
            var container = document.getElementById('donut-container');
            if (container && container.id === args.chart.element.id) {
                var newData = (eval('updatedData' + yearIndex) || []).map(function (item) {
                    return { x: item.x, y: item.y };
                });
                year = year < 20 ? year + 1 : 10;
                args.accumulation.centerLabel.text = "20" + year;
                if (args.accumulation.series.length > 0) {
                    args.accumulation.series[0].setData(newData, 500);
                }
                yearIndex = yearIndex < 10 ? yearIndex + 1 : 2;
            }
            else {
                updateClearInterval();
            }
        }, 1500);
    };
    var updateClearInterval = function () {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
    };
    var textRender = function (args) {
        args.text = ej2_base_1.Browser.isDevice ? String(args.point.x) : String(args.point.x + ": " + "$" + args.text);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'donut-container', ref: pieRef, title: 'Average Stock Market Prices of Leading Tech Giants', style: { textAlign: 'center' }, titleStyle: { size: '18px' }, load: load.bind(_this), loaded: onChartLoad.bind(_this), textRender: textRender, legendSettings: { visible: false }, centerLabel: {
                    text: '2010',
                    textStyle: {
                        fontWeight: '600',
                        size: ej2_base_1.Browser.isDevice ? '25px' : '40px'
                    }
                }, enableBorderOnMouseMove: false, width: ej2_base_1.Browser.isDevice ? '100%' : '75%' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationLegend] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: updatedData, xName: 'x', yName: 'y', radius: '75%', innerRadius: '65%', dataLabel: { visible: true, position: 'Outside', font: { fontWeight: '600' }, connectorStyle: { type: 'Line', width: 2, length: '18' } } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how the data source for the donut chart can dynamically update at regular intervals over a span of years.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a donut chart that displays the average stock market prices of leading tech giants, with each entry featuring the company name and corresponding stock price. The donut chart updates dynamically using the",
                React.createElement("code", null, "setData"),
                " method to show the progression of stock prices from 2010 to 2020."),
            React.createElement("p", null,
                "More information about the donut series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/accumulation-chart/pie-dough-nut/#doughnut-chart", "aria-label": "Navigate to the documentation for Doughnut Chart in TypeScript Accumulation Chart control" }, "documentation section"),
                "."))));
};
exports.default = UpdatePieDataSource;
