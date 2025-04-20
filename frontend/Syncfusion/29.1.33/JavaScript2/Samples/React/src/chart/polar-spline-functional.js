"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data3 = exports.data2 = exports.data1 = exports.GetSplineData = void 0;
/**
 * Sample for Polar Series with drawType Spline
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
function GetSplineData() {
    var cardData = [];
    var biDirData = [];
    var omniDirData = [];
    var point1;
    var point2;
    for (var x = -180; x < 180; x++) {
        point1 = { x: x, y: -12.6 * (1 - Math.cos(x * 3.14 / 180)) };
        cardData.push(point1);
        point2 = { x: x, y: -3 };
        omniDirData.push(point2);
    }
    for (var x = -180; x < -90; x++) {
        point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    for (var x = -90; x < 90; x++) {
        point1 = { x: x, y: -26 * (1 - Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    for (var x = 90; x < 180; x++) {
        point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    return { 'series1': cardData, 'series2': omniDirData, 'series3': biDirData };
}
exports.GetSplineData = GetSplineData;
exports.data1 = GetSplineData().series1;
exports.data2 = GetSplineData().series2;
exports.data3 = GetSplineData().series3;
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var PolarSpline = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Polar'), type = _a[0], setType = _a[1];
    var chartInstance = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var loaded;
    var onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var change = function () {
        chartInstance.current.series[0].type = dropElement.current.value;
        chartInstance.current.series[1].type = dropElement.current.value;
        chartInstance.current.series[2].type = dropElement.current.value;
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.series[2].animation.enable = false;
        chartInstance.current.refresh();
    };
    var droplist = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, primaryXAxis: { minimum: -180, maximum: 180, interval: 30, labelFormat: '{value}°', coefficient: ej2_base_1.Browser.isDevice ? 80 : 100 }, legendSettings: { enableHighlight: true }, load: load.bind(_this), title: 'Microphone Types Polar Patterns', loaded: onChartLoad.bind(_this), tooltip: { enable: true, enableHighlight: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.PolarSeries, ej2_react_charts_1.RadarSeries, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Cardioid (unidirectional)', type: type, drawType: 'Spline', dashArray: '5 5 2', width: 2, isClosed: false }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Omnidirectional', type: type, drawType: 'Spline', dashArray: '2', width: 2, isClosed: false }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'Bidirectional', type: type, drawType: 'Spline', width: 2, isClosed: false })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Series Type:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "selmode", change: change.bind(_this), ref: dropElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: type }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates polar series with spline type for the microphone type data. The switching between polar and radar series can be done by using ",
                React.createElement("code", null, "Series Type"),
                " in property panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the spline type charts. Spline chart connects each point in series through a curved line. You can use ",
                React.createElement("code", null, "dashArray"),
                ", ",
                React.createElement("code", null, "width"),
                ", ",
                React.createElement("code", null, "fill"),
                " properties to customize the spline. ",
                React.createElement("code", null, "marker"),
                " and ",
                React.createElement("code", null, "dataLabel"),
                " are used to represent individual data and its value."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject ",
                React.createElement("code", null, "SplineSeries"),
                ", ",
                React.createElement("code", null, "PolarSeries"),
                " and ",
                React.createElement("code", null, "RadarSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the polar-radar series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#spline", "aria-label": "Navigate to the documentation for Polar Spline in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = PolarSpline;
