"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
/**
 * Sample for Default Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var default_data_1 = require("./default-data");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data = default_data_1.bitCoinData;
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n     #title{\n         font-size: 15px;\n         font-style: normal;\n         font-family: \"Segoe UI\";\n         font-weight: 500;\n         text-anchor: middle;\n         transform: none;\n         opacity: 1;\n     }\n     #rangenavigator {\n         transform: translate(0, 25%);\n     }\n \n     #material-gradient-chart stop {\n         stop-color: #00bdae;\n     }\n \n     #fabric-gradient-chart stop {\n         stop-color: #4472c4;\n     }\n \n     #bootstrap-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n \n     #bootstrap4-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n \n     #highcontrast-gradient-chart stop {\n         stop-color: #79ECE4;\n     }\n \n\n     #tailwind-gradient-chart stop {\n        stop-color: #5A61F6;\n    }\n\n\t#tailwind3-gradient-chart stop {\n        stop-color: #2F4074;\n    }\n\n    #tailwinddark-gradient-chart stop {\n        stop-color: #8B5CF6;\n    }\n\n    #tailwind3-dark-gradient-chart stop {\n        stop-color: #8029F1;\n    }\n \n     #bootstrap5-gradient-chart stop {\n        stop-color: #FD7E14;\n     }\n \n     #material-dark-gradient-chart stop {\n         stop-color: #9ECB08;\n     }\n \n     #fabric-dark-gradient-chart stop {\n         stop-color: #4472c4;\n     }\n \n     #bootstrap-dark-gradient-chart stop {\n         stop-color: #a16ee5;\n     }\n\n     #bootstrap5-dark-gradient-chart stop {\n         stop-color: #8F80F4;\n     }\n \n     #fluent-gradient-chart stop {\n         stop-color: #1AC9E6;\n     }\n \n     #fluent-dark-gradient-chart stop {\n         stop-color: #1AC9E6;\n     }\n\n     #material3-gradient-chart stop {\n         stop-color: #6355C7;\n     }\n\n     #material3-dark-gradient-chart stop {\n         stop-color: #4EAAFF;\n     }\n \n     #fluent2-gradient-chart stop {\n        stop-color: #6200EE;\n    }\n\n    #fluent2-highcontrast-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n\n    #fluent2-dark-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n\n     .chart-gradient stop[offset=\"0\"] {\n         stop-opacity: 0.9;\n     }\n \n     .chart-gradient stop[offset=\"1\"] {\n         stop-opacity: 0.3;\n     }\n     ";
function Default() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row", style: { textAlign: "center" } },
                React.createElement("div", { id: "title" }, "Bitcoin (USD) Price Range")),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', style: { textAlign: "center" }, valueType: 'DateTime', load: load.bind(this), tooltip: { enable: true, displayMode: 'Always', format: 'MM/dd/yyyy' }, navigatorStyleSettings: {
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
                    React.createElement("stop", { offset: "1" })),
                React.createElement("linearGradient", { id: "fluent2-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                    React.createElement("stop", { offset: "0" }),
                    React.createElement("stop", { offset: "1" })),
                React.createElement("linearGradient", { id: "fluent2-highcontrast-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                    React.createElement("stop", { offset: "0" }),
                    React.createElement("stop", { offset: "1" })),
                React.createElement("linearGradient", { id: "fluent2-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
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
                "The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                React.createElement("code", null, "DateTime"),
                " module using ",
                React.createElement("code", null, "RangeNavigator.Inject(DateTime)"),
                " method. To use tooltip, inject the ",
                React.createElement("code", null, "RangeTooltip"),
                " module using ",
                React.createElement("code", null, "RangeNavigator.Inject(RangeTooltip)"),
                " method."))));
    function load(args) {
        var selectedTheme = (0, theme_color_1.loadRangeNavigatorTheme)(args, true);
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = theme_color_1.borderColor[theme_color_1.themes.indexOf(args.rangeNavigator.theme.toLowerCase())];
        args.rangeNavigator.navigatorStyleSettings.selectedRegionColor = theme_color_1.regionColor[theme_color_1.themes.indexOf(args.rangeNavigator.theme.toLowerCase())];
    }
    ;
}
exports.default = Default;
