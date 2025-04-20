"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CylindricalColumn = exports.pointRender = exports.data = void 0;
/**
 * Sample for Cylindrical Column series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data = [{ x: 'Italy', y: 10 }, { x: 'Kenya', y: 4 }, { x: 'France', y: 10 }, { x: 'Hungary', y: 0 }, { x: 'Australia', y: 17 }, { x: 'Brazil', y: 7 }, { x: 'Netherlands', y: 10 }, { x: 'Unspecified', y: null }, { x: 'Germany', y: 10 }, { x: 'Serbia', y: 3 }];
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
    else if (selectedTheme === 'tailwind3-dark') {
        args.fill = theme_color_1.pointTailwind3DarkColors[args.point.index % 10];
    }
    else if (selectedTheme === 'tailwind3') {
        args.fill = theme_color_1.pointTailwind3Colors[args.point.index % 10];
    }
};
exports.pointRender = pointRender;
var CylindricalColumn = /** @class */ (function (_super) {
    __extends(CylindricalColumn, _super);
    function CylindricalColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CylindricalColumn.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, title: 'Olympic Gold Medal Counts - Tokyo 2020', enableRotation: true, rotation: 10, tilt: 18, depth: 100, primaryXAxis: {
                        valueType: 'Category', labelPlacement: 'BetweenTicks', interval: 1, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45', labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }
                    }, primaryYAxis: {
                        majorTickLines: { width: 0 }, maximum: 20, interval: 4
                    }, tooltip: {
                        enable: true, header: '${point.x}', format: 'Gold Medal : <b>${point.y}'
                    }, pointRender: exports.pointRender, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Tooltip3D] }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data, type: 'Column', xName: 'x', yName: 'y', name: 'Gold', columnSpacing: 0.1 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example of a 3D column chart visualizes the medal count from the Tokyo Olympics using the default column series in the 3D chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can observe how to render and configure a 3D column chart. The 3D column chart serves the purpose of comparing the frequency, count, total, or average of data across different categories."),
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
                    "."),
                React.createElement("p", null,
                    "More information on the column 3D chart be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/column", "aria-label": "Navigate to the documentation for React 3D column chart" }, "documentation section"),
                    "."))));
    };
    CylindricalColumn.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    CylindricalColumn.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    return CylindricalColumn;
}(sample_base_1.SampleBase));
exports.CylindricalColumn = CylindricalColumn;
