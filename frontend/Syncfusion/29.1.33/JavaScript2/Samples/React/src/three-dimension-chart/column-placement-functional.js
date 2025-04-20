"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data4 = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Column Series with disabled side by side placement
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [{ x: 'Jamesh', y: 1 }, { x: 'Michael', y: 2 }, { x: 'John', y: 2 }, { x: 'Jack', y: 1 }, { x: 'Lucas', y: 1 }];
exports.data2 = [{ x: 'Jamesh', y: 4 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }, { x: 'Jack', y: 2 }, { x: 'Lucas', y: 3 }];
exports.data3 = [{ x: 'Jamesh', y: 5 }, { x: 'Michael', y: 4 }, { x: 'John', y: 5 }, { x: 'Jack', y: 5 }, { x: 'Lucas', y: 6 }];
exports.data4 = [{ x: 'Jamesh', y: 10, text: 'Total 10' }, { x: 'Michael', y: 9, text: 'Total 9' }, { x: 'John', y: 11, text: 'Total 11' }, { x: 'Jack', y: 8, text: 'Total 8' }, { x: 'Lucas', y: 10, text: 'Total 10' }];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Column Side placment sample
 */
var ColumnPlacement = function () {
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
            React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, load: load.bind(_this), rotation: ej2_base_1.Browser.isDevice ? 5 : 25, depth: 500, height: '400', primaryXAxis: {
                    valueType: 'Category', interval: 1,
                    labelPlacement: 'BetweenTicks',
                    labelRotation: -45
                }, primaryYAxis: {
                    interval: ej2_base_1.Browser.isDevice ? 4 : 2
                }, enableSideBySidePlacement: false, title: 'Fruit Consumption by Individuals', tooltip: { enable: true }, legendSettings: { visible: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Tooltip3D, ej2_react_charts_1.Legend3D, ej2_react_charts_1.Highlight3D] }),
                React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Grapes', type: 'Column', columnWidth: 0.2 }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Orange', type: 'Column', columnWidth: 0.2 }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'Apple', type: 'Column', columnWidth: 0.2 }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data4, xName: 'x', yName: 'y', name: 'Total', type: 'Column', columnWidth: 0.2 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample displays four series of 3D column chart, with each column positioned behind the preceding one.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a 3D column chart with each column positioned behind the preceding one. The 3D column chart serves the purpose of comparing the frequency, count, total, or average of data across different categories. The ",
                React.createElement("code", null, "enableSideBySidePlacement"),
                " property is used to position the column behind another."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D chart component features are segregated into individual feature-wise modules. To use column series, we need to inject ",
                React.createElement("code", null, "ColumnSeries3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = ColumnPlacement;
