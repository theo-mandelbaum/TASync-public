"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
/**
 * Sample for Cylindrical Column series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var theme_color_2 = require("./theme-color");
exports.data = [{ x: 'Czechia', y: 1.11 }, { x: 'Spain', y: 1.66 }, { x: 'USA', y: 1.56 }, { x: 'Germany', y: 3.1 }, { x: 'Russia', y: 1.35 }, { x: 'Slovakia', y: 1 }, { x: 'South Korea', y: 3.16 }, { x: 'France', y: 0.92 }];
var CylindricalColumn = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var axisLabelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + 'M';
        }
    };
    var pointRender = function (args) {
        (0, theme_color_1.pointRenderEvent)(args);
    };
    var load = function (args) {
        (0, theme_color_2.load3DChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, title: 'Passenger Car Production in Selected Countries \u2013 2021', primaryXAxis: {
                    valueType: 'Category', interval: 1,
                    labelPlacement: 'BetweenTicks',
                    labelRotation: -45
                }, primaryYAxis: {
                    maximum: 4,
                    interval: 1
                }, tooltip: {
                    enable: true, header: "${point.x}", format: 'Car Production : <b>${point.y}M'
                }, rotation: 7, tilt: 10, depth: 100, height: '400', wallColor: 'transparent', pointRender: pointRender, load: load.bind(_this), loaded: onChartLoad.bind(_this), axisLabelRender: axisLabelRender.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Tooltip3D] }),
                React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data, columnFacet: 'Cylinder', type: 'Column', xName: 'x', yName: 'y', columnWidth: 0.9 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the passenger car production in selected countries for 2021, using a cylindrical column in 3D chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see the rendering and configuration of a 3D cylindrical column chart. The 3D cylindrical column chart is similar to a 3D column chart but features a distinct cylindrical shape."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D chart component features are segregated into individual feature-wise modules. To use  column series, we need to inject ",
                React.createElement("code", null, "ColumnSeries3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = CylindricalColumn;
