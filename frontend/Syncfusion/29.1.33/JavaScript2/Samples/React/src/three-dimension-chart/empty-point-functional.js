"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.pointRender = void 0;
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
var pointRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_1.pointFabricColors[args.point.index % 10];
        ;
    }
    else if (selectedTheme === 'material-dark') {
        args.fill = theme_color_1.pointMaterialDarkColors[args.point.index % 10];
        ;
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_1.pointMaterialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5-dark') {
        args.fill = theme_color_1.pointBootstrap5DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap5') {
        args.fill = theme_color_1.pointBootstrap5Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap') {
        args.fill = theme_color_1.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap4') {
        args.fill = theme_color_1.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'bootstrap-dark') {
        args.fill = theme_color_1.pointBootstrapColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = theme_color_1.pointHighContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent-dark') {
        args.fill = theme_color_1.pointFluentDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent') {
        args.fill = theme_color_1.pointFluentColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind-dark') {
        args.fill = theme_color_1.pointTailwindDarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind') {
        args.fill = theme_color_1.pointTailwindColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3-dark') {
        args.fill = theme_color_1.pointMaterial3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material3') {
        args.fill = theme_color_1.pointMaterial3Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent2') {
        args.fill = theme_color_1.pointFluent2Colors[args.point.index % 10];
    }
    else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
        args.fill = theme_color_1.pointFluent2HighContrastColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3-dark') {
        args.fill = theme_color_1.pointTailwind3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3') {
        args.fill = theme_color_1.pointTailwind3Colors[args.point.index % 10];
    }
};
exports.pointRender = pointRender;
exports.data = [{ x: 'Italy', y: 10 }, { x: 'Kenya', y: 4 }, { x: 'France', y: 10 }, { x: 'Hungary', y: 0 }, { x: 'Australia', y: 17 }, { x: 'Brazil', y: 7 }, { x: 'Netherlands', y: 10 }, { x: 'Unspecified', y: null }, { x: 'Germany', y: 10 }, { x: 'Serbia', y: 3 }];
var EmptyPoint = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_2.load3DChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, title: 'Olympic Gold Medal Counts - Tokyo 2020', enableRotation: true, rotation: 7, tilt: 10, depth: 100, primaryXAxis: {
                    valueType: 'Category', labelPlacement: 'BetweenTicks', interval: 1, labelRotation: -45
                }, primaryYAxis: {
                    maximum: 20, interval: 4
                }, pointRender: exports.pointRender, tooltip: {
                    enable: true, header: '${point.x}', format: 'Gold Medal : <b>${point.y}'
                }, load: load.bind(_this), loaded: onChartLoad.bind(_this), height: '400', wallColor: 'transparent', width: ej2_base_1.Browser.isDevice ? '100%' : '75%' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Tooltip3D] }),
                React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data, type: 'Column', xName: 'x', yName: 'y', columnSpacing: 0.1 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example of a 3D column chart visualizes the medal count from the Tokyo Olympics using the default column series in the 3D chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure a 3D column chart, accommodating null and zero values. The null points represent missing data, while zero is considered a valid value in the 3D chart."),
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
exports.default = EmptyPoint;
