"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = exports.pointRender = void 0;
/**
 * Sample for Column series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var theme_color_2 = require("./theme-color");
var pointRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_2.pointFabricColors[args.point.index % 10];
        ;
    }
    else if (selectedTheme === 'material-dark') {
        args.fill = theme_color_2.pointMaterialDarkColors[args.point.index % 10];
        ;
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_2.pointMaterialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = theme_color_2.pointBootstrap5DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5') {
        args.fill = theme_color_2.pointBootstrap5Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap') {
        args.fill = theme_color_2.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap4') {
        args.fill = theme_color_2.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap-dark') {
        args.fill = theme_color_2.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = theme_color_2.pointHighContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent-dark') {
        args.fill = theme_color_2.pointFluentDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent') {
        args.fill = theme_color_2.pointFluentColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind-dark') {
        args.fill = theme_color_2.pointTailwindDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind') {
        args.fill = theme_color_2.pointTailwindColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3-dark') {
        args.fill = theme_color_2.pointMaterial3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3') {
        args.fill = theme_color_2.pointMaterial3Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent2') {
        args.fill = theme_color_2.pointFluent2Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
        args.fill = theme_color_2.pointFluent2HighContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3-dark') {
        args.fill = theme_color_2.pointTailwind3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3') {
        args.fill = theme_color_2.pointTailwind3Colors[args.point.index % 10];
    }
    ;
};
exports.pointRender = pointRender;
exports.data1 = [{ x: 'Tesla', y: 137429 }, { x: 'Aion', y: 80308 }, { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 }, { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 }, { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 }];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Column = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var labelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            var value = Number(args.text) / 1000;
            args.text = (typeof value === 'number' && !isNaN(value)) ? String(value) + 'k' : args.text;
        }
    };
    var load = function (args) {
        (0, theme_color_1.load3DChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, axisLabelRender: labelRender.bind(_this), legendSettings: { enableHighlight: true, visible: false }, primaryXAxis: {
                    valueType: 'Category',
                    labelRotation: -45,
                    labelPlacement: 'BetweenTicks'
                }, wallColor: 'transparent', height: "400", pointRender: exports.pointRender.bind(_this), primaryYAxis: {
                    maximum: 150000, interval: 30000
                }, load: load.bind(_this), enableRotation: true, rotation: 7, tilt: 10, depth: 100, tooltip: { enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Top Selling Electric Cars in China', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries3D, ej2_react_charts_1.Legend3D, ej2_react_charts_1.Tooltip3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Highlight3D] }),
                React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', columnSpacing: 0.1, yName: 'y', type: 'Column' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the top-selling electric car in China using the default column series in the 3D chart. Data points are enhanced with tooltips.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure a 3D column chart. The 3D column chart serves the purpose of comparing the frequency, count, total, or average of data across different categories."),
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
exports.default = Column;
