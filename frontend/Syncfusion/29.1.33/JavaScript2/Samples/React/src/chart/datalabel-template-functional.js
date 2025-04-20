"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample fro DataLabel template
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var data1 = [
    { sports: "Tennis", boys: 50, girls: 38 },
    { sports: "Badminton", boys: 30, girls: 40 },
    { sports: "Cycling", boys: 37, girls: 20 },
    { sports: "Football", boys: 60, girls: 21 },
    { sports: "Hockey", boys: 15, girls: 8 },
];
var data2 = [
    { sports: "Tennis", boys: 50, girls: 38 },
    { sports: "Badminton", boys: 30, girls: 40 },
    { sports: "Cycling", boys: 37, girls: 20 },
    { sports: "Football", boys: 60, girls: 21 },
    { sports: "Hockey", boys: 15, girls: 8 },
];
var theme;
var materialMan = '<div style="background-color:#00bdae;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var materialWomen = '<div style="background-color:#404041;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fabricMan = '<div style="background-color:#4472c4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
var fabricWomen = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
var bootstrapMan = '<div style="background-color:#a16ee5;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var bootstrapWomen = '<div style="background-color:#f7ce69;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
var highcontrastMan = '<div style="background-color:#79ECE4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var highcontrastWomen = '<div style="background-color:#E98272;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var tailwindMan = '<div style="background-color:#5A61F6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var tailwindWomen = '<div style="background-color:#65A30D;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var tailwind3Man = '<div style="background-color:#2F4074;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var tailwind3Women = '<div style="background-color:#03B4B4;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var bootstrap5Man = '<div style="background-color:#FD7E14;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var bootstrap5Women = '<div style="background-color:#6610F2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var materialDarkMan = '<div style="background-color:#9ECB08;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var materialDarkWomen = '<div style="background-color:#56AEFF;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fabricDarkMan = '<div style="background-color:#4472c4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fabricDarkWomen = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var tailwindDarkMan = '<div style="background-color:#8B5CF6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var tailwindDarkWomen = '<div style="background-color:#22D3EE;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var tailwind3DarkMan = '<div style="background-color:#8029F1;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var tailwind3DarkWomen = '<div style="background-color:#1ABC9C;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var bootstrap5DarkMan = '<div style="background-color:#FD7E14;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var bootstrap5DarkWomen = '<div style="background-color:#6610F2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluentMan = '<div style="background-color:#1AC9E6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluentWomen = '<div style="background-color:#DA4CB2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluentDarkMan = '<div style="background-color:#1AC9E6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluentDarkWomen = '<div style="background-color:#DA4CB2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var material3Man = '<div style="background-color:#6355C7;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var material3Women = '<div style="background-color:#00AEE0;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var material3DarkMan = '<div style="background-color:#4EAAFF;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var material3DarkWomen = '<div style="background-color:#FA4EAB;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluent2Women = '<div style="background-color:#09AF74;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluent2Man = '<div style="background-color:#6200EE;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluent2DarkMan = '<div style="background-color:#9BB449;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluent2DarkWomen = '<div style="background-color:#2A72D5;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluent2HighContrastMan = '<div style="background-color:#9BB449;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var fluent2HighContrastWomen = '<div style="background-color:#2A72D5;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var DataLabelTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var textRender = function (args) {
        if (theme === 'Material') {
            args.template = args.series.name === 'Boys' ? materialMan : materialWomen;
        }
        else if (theme === 'Fabric') {
            args.template = args.series.name === 'Boys' ? fabricMan : fabricWomen;
        }
        else if (theme === 'Tailwind') {
            args.template = args.series.name === 'Boys' ? tailwindMan : tailwindWomen;
        }
        else if (theme === 'Tailwind3') {
            args.template = args.series.name === 'Boys' ? tailwind3Man : tailwind3Women;
        }
        else if (theme.toLowerCase() === 'highcontrast') {
            args.template = args.series.name === 'Boys' ? highcontrastMan : highcontrastWomen;
        }
        else if (theme === 'MaterialDark') {
            args.template = args.series.name === 'Boys' ? materialDarkMan : materialDarkWomen;
        }
        else if (theme === 'FabricDark') {
            args.template = args.series.name === 'Boys' ? fabricDarkMan : fabricDarkWomen;
        }
        else if (theme === 'TailwindDark') {
            args.template = args.series.name === 'Boys' ? tailwindDarkMan : tailwindDarkWomen;
        }
        else if (theme === 'Tailwind3Dark') {
            args.template = args.series.name === 'Boys' ? tailwind3DarkMan : tailwind3DarkWomen;
        }
        else if (theme === 'Bootstrap5Dark') {
            args.template = args.series.name === 'Boys' ? bootstrap5DarkMan : bootstrap5DarkWomen;
        }
        else if (theme === 'Bootstrap5') {
            args.template = args.series.name === 'Boys' ? bootstrap5Man : bootstrap5Women;
        }
        else if (theme === 'Fluent') {
            args.template = args.series.name === 'Boys' ? fluentMan : fluentWomen;
        }
        else if (theme === 'FluentDark') {
            args.template = args.series.name === 'Boys' ? fluentDarkMan : fluentDarkWomen;
        }
        else if (theme === 'Material3') {
            args.template = args.series.name === 'Boys' ? material3Man : material3Women;
        }
        else if (theme === 'Material3Dark') {
            args.template = args.series.name === 'Boys' ? material3DarkMan : material3DarkWomen;
        }
        else if (theme === 'Fluent2') {
            args.template = args.series.name === 'Boys' ? fluent2Man : fluent2Women;
        }
        else if (theme === 'Fluent2Dark') {
            args.template = args.series.name === 'Boys' ? fluent2DarkMan : fluent2DarkWomen;
        }
        else if (theme === 'Fluent2HighContrast') {
            args.template = args.series.name === 'Boys' ? fluent2HighContrastMan : fluent2HighContrastWomen;
        }
        else {
            args.template = args.series.name === 'Boys' ? bootstrapMan : bootstrapWomen;
        }
    };
    var loadPre = function (args) {
        theme = (0, theme_color_1.loadChartTheme)(args);
    };
    var loaded = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, labelIntersectAction: 'Rotate45', majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { minimum: 0, maximum: 70, lineStyle: { width: 0 }, majorGridLines: { color: '#eaeaea', width: 1 }, majorTickLines: { width: 0 } }, titleStyle: { fontStyle: 'medium', size: '14px' }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Athletes in Popular School', load: loadPre.bind(_this), loaded: loaded.bind(_this), textRender: textRender.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.ColumnSeries] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data1, xName: 'sports', yName: 'boys', name: 'Boys', type: 'Column', columnWidth: 0.75, columnSpacing: 0.5, marker: { visible: false, shape: 'Circle', dataLabel: { visible: true, position: 'Outer', margin: { top: 70 }, template: materialMan } }, width: 2 }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data2, xName: 'sports', yName: 'girls', name: 'Girls', type: 'Column', columnWidth: 0.75, columnSpacing: 0.5, marker: { visible: false, shape: 'Rectangle', dataLabel: { visible: true, position: 'Outer', margin: { top: 70 }, template: materialWomen } }, width: 2 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates data label template support in charts. Each data label for each point is rendered using the template.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The React Charts data label template feature allows you to change the appearance and behavior of the data label for each data point using the ",
                React.createElement("code", null, "Template"),
                " property in ",
                React.createElement("code", null, "ChartDataLabel"),
                "."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use dataLabel, we need to inject ",
                React.createElement("code", null, "DataLabel"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the data label template can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/data-labels/#data-label-template", "aria-label": "Navigate to the documentation for Data Label Template in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = DataLabelTemplate;
