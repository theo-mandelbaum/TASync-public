"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Lazy Loading
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n";
var LazyLoading = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chart = (0, react_1.useRef)(null);
    var lazymode = (0, react_1.useRef)(null);
    var intl = new ej2_base_1.Internationalization();
    var minDate;
    var maxDate;
    var pointslength;
    var droplist = [
        { value: 'Range' },
        { value: 'Points Length' }
    ];
    var scrollEnd = function (args) {
        if (lazymode.current.value === 'Range') {
            chart.current.series[0].dataSource = GetDateTimeData(args.currentRange.minimum, args.currentRange.maximum);
        }
        else {
            chart.current.series[0].dataSource = GetNumericData(args.currentRange.minimum, args.currentRange.maximum);
        }
        chart.current.dataBind();
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var minChange = function (args) {
        chart.current.primaryXAxis.scrollbarSettings.range.minimum = args.value;
        chart.current.refresh();
    };
    var maxChange = function (args) {
        chart.current.primaryXAxis.scrollbarSettings.range.maximum = args.value;
        chart.current.refresh();
    };
    var pointChange = function (args) {
        chart.current.primaryXAxis.scrollbarSettings.pointsLength = args.value;
        chart.current.refresh();
    };
    var modeChange = function (arg) {
        var min;
        var max;
        if (arg.value === 'Range') {
            chart.current.primaryXAxis.valueType = 'DateTime';
            min = chart.current.primaryXAxis.scrollbarSettings.range.minimum = new Date(2009, 0, 1);
            max = chart.current.primaryXAxis.scrollbarSettings.range.maximum = new Date(2014, 0, 1);
            chart.current.series[0].dataSource = GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1));
            chart.current.refresh();
            minDate.enabled = true;
            maxDate.enabled = true;
            pointslength.enabled = false;
        }
        else {
            chart.current.primaryXAxis.valueType = 'Double';
            chart.current.primaryXAxis.scrollbarSettings.range.minimum = null;
            chart.current.primaryXAxis.scrollbarSettings.range.maximum = null;
            chart.current.primaryXAxis.scrollbarSettings.pointsLength = 1000;
            chart.current.series[0].dataSource = GetNumericData(1, 200);
            chart.current.refresh();
            minDate.enabled = false;
            maxDate.enabled = false;
            pointslength.enabled = true;
        }
    };
    var GetDateTimeData = function (start, end) {
        var series1 = [];
        var date;
        var value = 30;
        var option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        var dateParser = intl.getDateParser(option);
        var dateFormatter = intl.getDateFormat(option);
        for (var i = 0; start <= end; i++) {
            date = Date.parse(dateParser(dateFormatter(start)));
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            }
            else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = getRandomInt(20, 40);
            }
            var point1 = { x: new Date(date), y: Math.round(value) };
            new Date(start.setDate(start.getDate() + 1));
            series1.push(point1);
        }
        return series1;
    };
    var GetNumericData = function (start, end) {
        var series1 = [];
        var value = 30;
        for (var i = start; i <= end; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            }
            else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = getRandomInt(20, 40);
            }
            var point = { x: i, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    };
    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chart, primaryXAxis: { valueType: 'DateTime', edgeLabelPlacement: 'Shift', skeleton: 'yMMM', skeletonType: 'Date', majorGridLines: { width: 0 }, scrollbarSettings: { range: { minimum: new Date(2009, 0, 1), maximum: new Date(2014, 0, 1) }, enable: true, pointsLength: 1000, enableZoom: false, height: 14 } }, primaryYAxis: { title: 'Server Load', labelFormat: '{value}MB', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, tooltip: { enable: true, showNearestTooltip: true, header: '<b>${point.x}</b>', format: 'Server load : <b>${point.y}</b>', enableHighlight: true }, legendSettings: { visible: true }, scrollEnd: scrollEnd.bind(_this), load: load.bind(_this), title: 'Network Load', height: '450', width: '100%', chartArea: { border: { width: 0 } } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ScrollBar, ej2_react_charts_1.Zoom, ej2_react_charts_1.Crosshair] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1)), xName: 'x', yName: 'y', type: 'Line', animation: { enable: false } })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null, "Lazy Load ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { index: 0, width: 120, id: "lazymode", ref: lazymode, style: { "width": "auto" }, change: modeChange.bind(_this), dataSource: droplist, fields: { text: 'value', value: 'value' }, value: "Range" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Min ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { width: 120, ref: function (min) { return minDate = min; }, id: "datepickermin", style: { "width": "auto" }, change: minChange.bind(_this), value: new Date(2009, 0, 1) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Max ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { width: 120, ref: function (max) { return maxDate = max; }, id: "datepickermax", style: { "width": "auto" }, change: maxChange.bind(_this), value: new Date(2014, 0, 1) })))),
                            React.createElement("tr", { style: { width: '40%' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: "pointLength" }, "Point Length ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 1000, max: 10000, value: 1000, step: 100, enabled: false, format: 'n', width: 120, ref: function (point) { return pointslength = point; }, id: "pointslength", style: { "width": "auto" }, change: pointChange.bind(_this), "aria-labelledby": "Text" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates lazy loading feature in chart which loads data on demand.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to load data for the chart on demand. The chart will fire the ",
                React.createElement("code", null, "scrollEnd"),
                " event, and in that event, we can update the chart with the required data based on the point length and axis range. The scrollbar in the chart can be customized using the ",
                React.createElement("code", null, "height"),
                ", ",
                React.createElement("code", null, "trackColor"),
                ", ",
                React.createElement("code", null, "trackRadius"),
                ", ",
                React.createElement("code", null, "scrollbarRadius"),
                ", ",
                React.createElement("code", null, "scrollbarColor"),
                ", ",
                React.createElement("code", null, "enableZoom"),
                ", and ",
                React.createElement("code", null, "gripColor"),
                " properties in ",
                React.createElement("code", null, "scrollbarSettings"),
                "."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use lazy loading need to inject ",
                React.createElement("code", null, "ScrollBar"),
                " and ",
                React.createElement("code", null, "Zoom"),
                " modules into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information about the lazy loading can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#lazy-loading", "aria-label": "Navigate to the documentation for Lazy loading in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = LazyLoading;
