"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Local Data for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n      .control-fluid {\n          padding: 0px !important;\n      }";
var data = [
    {
        requiredStories: 20,
        completedStories: 25,
        name: 'David',
        color: "#7f84e8"
    },
    {
        requiredStories: 25,
        completedStories: 20,
        name: 'Asif',
        color: "#dd8abd"
    },
    {
        requiredStories: 15,
        completedStories: 10,
        name: 'Thomas',
        color: "#70ad47"
    },
    {
        requiredStories: 40,
        completedStories: 39,
        name: 'Rohit',
        color: "#f8b883"
    },
    {
        requiredStories: 35,
        completedStories: 40,
        name: 'Virat',
        color: "#e56590"
    },
    {
        requiredStories: 28,
        completedStories: 25,
        name: 'Jude',
        color: "#357cd2"
    },
    {
        requiredStories: 10,
        completedStories: 18,
        name: 'Warner',
        color: "#404041"
    },
    {
        requiredStories: 30,
        completedStories: 28,
        name: 'Malik',
        color: "#00bdae"
    }
];
function BulletChartMultipleData() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'multipleData', style: { textAlign: "center" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', tooltip: { enable: true }, dataSource: data, valueField: 'completedStories', targetField: 'requiredStories', categoryField: 'name', animation: { enable: false }, height: '400', minimum: 5, maximum: 45, interval: 5, minorTickLines: { width: 0 }, title: 'Sprint Planning', titlePosition: 'Top', valueFill: 'color', targetColor: '#304560', subtitle: 'Estimated in story points', load: bulletLoad.bind(this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 25, color: '#DBE7F3' }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 37, color: '#BBCEE7' }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 45, color: '#96B2D7' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a bullet chart with multiple datasets, allowing for the comparison of different values.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can observe how multiple datasets are compared in a bullet chart. Here, each value bar is assigned a different color from the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/bullet-chart/#datasource", "aria-label": "Navigate to the dataSource property reference for React Bullet Chart component" }, "dataSource"),
                "."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example, to see them in action, hover over a feature bar or comparative bar on the bullet chart."),
            React.createElement("p", null,
                "More information on the data binding for the bullet chart can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/bullet-chart/data-binding", "aria-label": "Navigate to the documentation for Data Binding in React Bullet Chart component" }, "documentation section"),
                "."))));
    function bulletLoad(args) {
        var chart = document.getElementById('multipleData');
        chart.setAttribute('title', '');
        (0, theme_color_1.loadBulletChartTheme)(args);
        var color = [];
        switch (args.bulletChart.theme) {
            case 'Fabric':
                color = theme_color_1.fabricColors;
                break;
            case 'Bootstrap4':
            case 'Bootstrap':
                color = theme_color_1.bootstrapColors;
                break;
            case 'HighContrastLight':
            case 'HighContrast':
                color = theme_color_1.highContrastColors;
                break;
            case 'MaterialDark':
                color = theme_color_1.materialColors;
                break;
            case 'FabricDark':
                color = theme_color_1.fabricColors;
                break;
            case 'BootstrapDark':
                color = theme_color_1.bootstrapDarkColors;
                break;
            case 'Tailwind':
                color = theme_color_1.tailwindColors;
                break;
            case 'TailwindDark':
                color = theme_color_1.tailwindDarkColors;
                break;
            case "Tailwind3":
                color = theme_color_1.tailwind3Colors;
                break;
            case "Tailwind3Dark":
                color = theme_color_1.tailwind3DarkColors;
                break;
            case 'Bootstrap5':
                color = theme_color_1.bootstarp5Colors;
                break;
            case 'Bootstrap5Dark':
                color = theme_color_1.bootstarp5DarkColors;
                break;
            case 'Fluent':
            case 'FluentDark':
                color = theme_color_1.fluentColors;
                break;
            case 'Material3':
                color = theme_color_1.material3Colors;
                break;
            case 'Material3Dark':
                color = theme_color_1.material3DarkColors;
                break;
            case "Fluent2":
                color = theme_color_1.fluent2Colors;
                break;
            case "Fluent2HighContrast":
            case "Fluent2Dark":
                color = theme_color_1.fluent2DarkColors;
                break;
            default:
                color = theme_color_1.defaultColors;
                break;
        }
        for (var i = 0; i < args.bulletChart.dataSource.length; i++) {
            args.bulletChart.dataSource[i].color = color[i];
        }
    }
}
exports.default = BulletChartMultipleData;
