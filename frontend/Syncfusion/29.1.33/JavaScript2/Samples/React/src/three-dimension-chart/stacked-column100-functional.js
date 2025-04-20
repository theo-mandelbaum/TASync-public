"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
/**
 * Sample for 100 percent Stacking Column series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: '2013', y: 9628912, y1: 4298390, y2: 2842133, y3: 2006366 },
    { x: '2014', y: 9609326, y1: 4513769, y2: 3016710, y3: 2165566 },
    { x: '2015', y: 7485587, y1: 4543838, y2: 3034081, y3: 2279503 },
    { x: '2016', y: 7793066, y1: 4999266, y2: 2945295, y3: 2359756 },
    { x: '2017', y: 6856880, y1: 5235842, y2: 3302336, y3: 2505741 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StackedColumn100 = function () {
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
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { enableHighlight: true }, primaryXAxis: {
                    valueType: 'Category',
                    labelPlacement: 'BetweenTicks'
                }, primaryYAxis: {
                    rangePadding: 'None',
                    interval: ej2_base_1.Browser.isDevice ? 25 : 20,
                }, wallColor: 'transparent', height: "400", enableRotation: true, rotation: 7, tilt: 10, depth: 100, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', load: load.bind(_this), title: 'Motor Vehicle Production by Manufacturer', loaded: onChartLoad.bind(_this), tooltip: { enable: true, format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries3D, ej2_react_charts_1.Legend3D, ej2_react_charts_1.Tooltip3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Highlight3D] }),
                React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', name: 'General Motors', columnWidth: 0.5, type: 'StackingColumn100' }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y1', name: 'Honda', columnWidth: 0.5, type: 'StackingColumn100' }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y2', name: 'Suzuki', columnWidth: 0.5, type: 'StackingColumn100' }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y3', name: 'BMW', columnWidth: 0.5, type: 'StackingColumn100' }))),
            React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                "Source: \u00A0 ",
                React.createElement("a", { href: "https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026", target: "_blank" }, "www.cyberagent.co.jp"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example of a 100% 3D stacked column chart visualizes motor vehicle production by manufacturer using a stacked column series. The legend in the sample provides information about these series.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the 100% 3D stacked column chart. The 100% 3D stacked column chart displays multiple series of data as stacked columns, ensuring that the cumulative proportion of each stacked element always totals 100%."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D chart component features are segregated into individual feature-wise modules. To use 100% stacking column series, we need to inject ",
                React.createElement("code", null, "StackingColumnSeries3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = StackedColumn100;
