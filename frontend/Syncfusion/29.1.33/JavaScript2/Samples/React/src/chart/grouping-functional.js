"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { 'x': 'Australia', y: 26, text: 'Australia: 26' },
    { 'x': 'Russia', y: 19, text: 'Russia: 19' },
    { 'x': 'Germany', y: 17, text: 'Germany: 17' },
    { 'x': 'Japan', y: 12, text: 'Japan: 12' },
    { 'x': 'China', y: 10, text: 'China: 10' },
    { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
    { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
    { 'x': 'Italy', y: 8, text: 'Italy: 8' },
    { 'x': 'France', y: 8, text: 'France: 8' },
    { 'x': 'Spain', y: 7, text: 'Spain: 7' },
    { 'x': 'Hungary', y: 8, text: 'Hungary: 8' },
    { 'x': 'Brazil', y: 7, text: 'Brazil: 7' },
    { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
    { 'x': 'Kenya', y: 6, text: 'Kenya: 6' },
];
var Grouping = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('9'), clubText = _a[0], setClubText = _a[1];
    var pie = (0, react_1.useRef)(null);
    var slider = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var droplist = [
        { value: 'Point' },
        { value: 'Value' }
    ];
    var change = function () {
        pie.current.series[0].groupMode = dropElement.current.value;
        var currentValue = dropElement.current.value === 'Point' ? 9 : 8;
        pie.current.series[0].groupTo = currentValue.toString();
        pie.current.series[0].animation.enable = false;
        setClubText(currentValue.toString());
        slider.current.value = currentValue.toString();
        pie.current.removeSvg();
        pie.current.refreshSeries();
        pie.current.refreshChart();
    };
    var onTextRender = function (args) {
        args.text = args.point.x + ' ' + args.point.y;
    };
    var onPointRender = function (args) {
        if (args.point.isClubbed || args.point.isSliced) {
            args.fill = '#D3D3D3';
        }
    };
    var onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    var onClubValue = function (e) {
        var clubvalue = slider.current.value;
        pie.current.series[0].groupTo = clubvalue;
        pie.current.series[0].animation.enable = false;
        setClubText(clubvalue);
        pie.current.removeSvg();
        pie.current.refreshSeries();
        pie.current.refreshChart();
    };
    var load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: pie, title: 'Rio Olympic Gold Medals', load: load.bind(_this), tooltip: { enable: true, format: "<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>", enableHighlight: true }, legendSettings: { visible: false }, textRender: onTextRender.bind(_this), pointRender: onPointRender.bind(_this), enableSmartLabels: true, loaded: onChartLoad.bind(_this), enableBorderOnMouseMove: false },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', animation: { enable: true }, explode: true, radius: ej2_base_1.Browser.isDevice ? '40%' : '70%', groupTo: '9', groupMode: 'Point', startAngle: 0, endAngle: 360, innerRadius: '0%', dataLabel: { visible: true, position: 'Outside', connectorStyle: { type: 'Curve', length: '20px' }, font: { fontWeight: '600' } } })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Mode: ")),
                                React.createElement("td", { style: { padding: 10, width: '50%' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "modes", change: change.bind(_this), ref: dropElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: "Point" }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "groupValue" },
                                        "Group To:",
                                        React.createElement("p", { id: "clubtext", style: { fontWeight: 'normal' } }, clubText))),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", name: "clubvalue", onChange: onClubValue.bind(_this), ref: slider, defaultValue: "9", min: "0", max: "27", id: "clubvalue", style: { marginLeft: '-5px' }, "aria-labelledby": "Slider" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the gold medal count scored by each country at the Rio Olympic Games, along with the pie series grouping functionality.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to group points based on count and values. The slice can be grouped based on the number of points by specifying the ",
                React.createElement("code", null, "GroupMode"),
                " to Point. For example, if the ",
                React.createElement("code", null, "GroupTo"),
                " property is set to 10, the chart will display the first 10 points and the remaining entries from the collection will be grouped as a single point. The slice can also be grouped based on values by specifying the ",
                React.createElement("code", null, "GroupMode"),
                " to Value. For example, if the ",
                React.createElement("code", null, "GroupTo"),
                " is set to 10, the first 10 points with a lower value will be grouped together and shown as a single point while the others as a slice."),
            React.createElement("p", null, " A tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
            React.createElement("p", null,
                "More information on the grouping in pie series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accumulation-chart/grouping", "aria-label": "Navigate to the documentation for Grouping in React Accumulation Chart component" }, "documentation section"),
                "."))));
};
exports.default = Grouping;
