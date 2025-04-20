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
exports.Default = exports.regionColor = exports.borderColor = exports.themes = exports.data = void 0;
/**
 * Sample for Default Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var default_data_1 = require("./default-data");
var sample_base_1 = require("../common/sample-base");
exports.data = default_data_1.bitCoinData;
exports.themes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
exports.borderColor = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
exports.regionColor = ['rgba(52, 58, 64, 0.1)', 'rgba(173, 181, 189, 0.1)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(97, 69, 112, 0.3)', 'rgba(138, 177, 19, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(47, 64, 116, 0.3)', 'rgba(128, 41, 241, 0.3)'];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #title{\n        font-size: 15px;\n        font-style: normal;\n        font-family: \"Segoe UI\";\n        font-weight: 500;\n        text-anchor: middle;\n        transform: none;\n        opacity: 1;\n    }\n    #rangenavigator {\n        transform: translate(0, 25%);\n    }\n\n    #material-gradient-chart stop {\n        stop-color: #00bdae;\n    }\n\n    #fabric-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #bootstrap4-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #highcontrast-gradient-chart stop {\n        stop-color: #79ECE4;\n    }\n\n    #bootstrap5-gradient-chart stop {\n        stop-color: #FD7E14;\n    }\n\n    #material-dark-gradient-chart stop {\n        stop-color: #9ECB08;\n    }\n\n    #fabric-dark-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-dark-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #tailwind-gradient-chart stop {\n        stop-color: #5A61F6;\n    }\n\n\t#tailwind3-gradient-chart stop {\n        stop-color: #2F4074;\n    }\n\n    #tailwinddark-gradient-chart stop {\n        stop-color: #8B5CF6;\n    }\n\n    #tailwind3-dark-gradient-chart stop {\n        stop-color: #8029F1;\n    }\n\n    #bootstrap5-dark-gradient-chart stop {\n        stop-color: #5ECB9B;\n    }\n\n    #fluent-gradient-chart stop {\n        stop-color: #614570;\n    }\n\n    #fluent-dark-gradient-chart stop {\n        stop-color: #8AB113;\n    }\n\n    #material3-gradient-chart stop {\n        stop-color: #6355C7;\n    }\n\n    #material3-dark-gradient-chart stop {\n        stop-color: #4EAAFF;\n    }\n\n    .chart-gradient stop[offset=\"0\"] {\n        stop-opacity: 0.9;\n    }\n\n    .chart-gradient stop[offset=\"1\"] {\n        stop-opacity: 0.3;\n    }\n    ";
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row", style: { textAlign: "center" } },
                    React.createElement("div", { id: "title" }, "Bitcoin (USD) Price Range")),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', style: { textAlign: "center" }, valueType: 'DateTime', load: this.load.bind(this), tooltip: { enable: true, displayMode: 'Always', format: 'MM/dd/yyyy' }, navigatorStyleSettings: {
                            unselectedRegionColor: 'transparent'
                        }, labelFormat: 'MMM-yy', width: ej2_base_1.Browser.isDevice ? '100%' : '80%', value: [new Date('2017-09-01'), new Date('2018-02-01')] },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.RangeTooltip] }),
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', type: 'Area', width: 2, border: { width: 2 } }))))),
            React.createElement("svg", { style: { height: '0' } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "material-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fabric-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap4-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "highcontrast-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap5-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind3-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind3-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fabric-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap5-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material3-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material3-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the bitcoin price range with area series in the range navigator. Selected range values are enhanced with tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the range navigator with area type series. ",
                    React.createElement("code", null, "Tooltip"),
                    " is used to represent selected data value. You can also use ",
                    React.createElement("code", null, "selectedRegionColor"),
                    " and ",
                    React.createElement("code", null, "unselectedRegionColor"),
                    " properties to customize selected and unselected area in range navigator."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the",
                    React.createElement("code", null, "DateTime"),
                    " module using",
                    React.createElement("code", null, "RangeNavigator.Inject(DateTime)"),
                    " method.To use tooltip, inject the",
                    React.createElement("code", null, "RangeTooltip"),
                    " module using",
                    React.createElement("code", null, "RangeNavigator.Inject(RangeTooltip)"),
                    " method."))));
    };
    Default.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        var rangeTheme = args.rangeNavigator.theme;
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = exports.borderColor[exports.themes.indexOf(rangeTheme.toLowerCase())];
        args.rangeNavigator.navigatorStyleSettings.selectedRegionColor = exports.regionColor[exports.themes.indexOf(rangeTheme.toLowerCase())];
    };
    ;
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
