"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data4 = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Stacking Column series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: '2018', y: 24.5 },
    { x: '2019', y: 25.6 },
    { x: '2020', y: 29 },
    { x: '2021', y: 28.5 },
    { x: '2022', y: 30.6 },
];
exports.data2 = [
    { x: '2018', y: 6.2 },
    { x: '2019', y: 15.6 },
    { x: '2020', y: 14.3 },
    { x: '2021', y: 9.3 },
    { x: '2022', y: 7.8 }
];
exports.data3 = [
    { x: '2018', y: 24.5 },
    { x: '2019', y: 23.2 },
    { x: '2020', y: 20.4 },
    { x: '2021', y: 23.2 },
    { x: '2022', y: 24.5 }
];
exports.data4 = [
    { x: '2018', y: 15.4 },
    { x: '2019', y: 21.1 },
    { x: '2020', y: 13.9 },
    { x: '2021', y: 11.6 },
    { x: '2022', y: 14.4 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StackedColumn = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.load3DChartTheme)(args);
    };
    var axisLabelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + ' Mmt';
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { enableHighlight: true }, primaryXAxis: {
                    interval: 1,
                    valueType: 'Category'
                }, primaryYAxis: {
                    maximum: ej2_base_1.Browser.isDevice ? 50 : 60,
                    interval: 10
                }, wallColor: 'transparent', height: "400", width: ej2_base_1.Browser.isDevice ? '100%' : '75%', load: load.bind(_this), title: 'Steel Production by Countries, Grouped by Continent', loaded: onChartLoad.bind(_this), tooltip: { enable: true, format: '${point.x} : <b>${point.y} Mmt' }, axisLabelRender: axisLabelRender.bind(_this), rotation: 7, tilt: 10, depth: 100, enableRotation: true },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Legend3D, ej2_react_charts_1.Tooltip3D, ej2_react_charts_1.Highlight3D] }),
                React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Iran', stackingGroup: 'Asia', columnWidth: 0.6, type: 'StackingColumn' }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Indonesia', stackingGroup: 'Asia', columnWidth: 0.6, type: 'StackingColumn' }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'Italy', stackingGroup: 'Europe', columnWidth: 0.6, type: 'StackingColumn' }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data4, xName: 'x', yName: 'y', name: 'France', stackingGroup: 'Europe', columnWidth: 0.6, type: 'StackingColumn' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example of a 3D stacked column chart visualizes the steel production of countries, grouped by continent. The legend in the sample provides information about these series.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a 3D stacked column chart. The 3D stacked column chart stacks points in the series vertically. Additionally, the ",
                React.createElement("code", null, "stackingGroup"),
                " property can be used to group stacked collections based on category."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject ",
                React.createElement("code", null, "StackingColumnSeries3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = StackedColumn;
