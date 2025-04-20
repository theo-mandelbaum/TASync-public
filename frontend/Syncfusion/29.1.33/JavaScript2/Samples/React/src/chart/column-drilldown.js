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
exports.ColumnDrilldown = void 0;
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n   #control-container {\n        padding: 0px !important;\n    }\n\n    .no-underline {\n      text-decoration: none !important;\n      cursor: auto !important;\n\n    }\n\n    #drilldown0_AxisLabel_0,\n    #drilldown0_AxisLabel_1,\n    #drilldown0_AxisLabel_2,\n    #drilldown0_AxisLabel_3,\n    #drilldown0_AxisLabel_4,\n    #drilldown_Series_0_Point_0,\n    #drilldown_Series_0_Point_1,\n    #drilldown_Series_0_Point_2,\n    #drilldown_Series_0_Point_3,\n    #drilldown_Series_0_Point_4,\n    #drilldown0_AxisLabel_5 {\n           text-decoration: underline;\n           cursor: pointer;\n\n    }\n\n    #category:hover {\n        cursor: pointer;\n    }";
var ColumnDrilldown = /** @class */ (function (_super) {
    __extends(ColumnDrilldown, _super);
    function ColumnDrilldown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chartRef = React.createRef();
        _this.clicked = false;
        _this.data = [
            { y: 4778, drilldown: 'Asia' },
            { y: 1481, drilldown: 'Africa' },
            { y: 746, drilldown: 'Europe' },
            { y: 379, drilldown: 'North America' },
            { y: 46, drilldown: 'Oceania' }
        ];
        _this.title = 'Top Populated Continents of 2023';
        _this.subTitle = 'A Look at Population Rankings and Trends in 2023';
        _this.categoryText = '';
        return _this;
    }
    ColumnDrilldown.prototype.loaded = function (args) {
        var chart = document.getElementById('drilldown');
        chart.setAttribute('title', '');
        if (this.clicked) {
            for (var i = 0; i <= 6; i++) {
                var axisLabel = document.getElementById("drilldown0_AxisLabel_".concat(i));
                if (axisLabel) {
                    axisLabel.classList.add('no-underline');
                }
                var seriesElement = document.getElementById("drilldown_Series_0_Point_".concat(i));
                if (seriesElement) {
                    seriesElement.classList.add('no-underline');
                }
            }
        }
    };
    ;
    ColumnDrilldown.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    ColumnDrilldown.prototype.onPointRender = function (args) {
        if (!this.clicked) {
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'material';
            var colorSet = {
                'fabric': [theme_color_1.bubbleFabricColors, theme_color_1.pointFabricColors],
                'material-dark': [theme_color_1.bubbleMaterialDarkColors, theme_color_1.pointMaterialDarkColors],
                'material': [theme_color_1.bubbleMaterialColors, theme_color_1.pointMaterialColors],
                'bootstrap5-dark': [theme_color_1.bubbleBootstrap5DarkColors, theme_color_1.pointBootstrap5DarkColors],
                'bootstrap5': [theme_color_1.bubbleBootstrap5Colors, theme_color_1.pointBootstrap5Colors],
                'bootstrap': [theme_color_1.bubbleBootstrapColors, theme_color_1.pointBootstrapColors],
                'highcontrast': [theme_color_1.bubbleHighContrastColors, theme_color_1.pointHighContrastColors],
                'fluent-dark': [theme_color_1.bubbleFluentDarkColors, theme_color_1.pointFluentDarkColors],
                'fluent': [theme_color_1.bubbleFluentColors, theme_color_1.pointFluentColors],
                'tailwind-dark': [theme_color_1.bubbleTailwindDarkColors, theme_color_1.pointTailwindDarkColors],
                'tailwind': [theme_color_1.bubbleTailwindColors, theme_color_1.pointTailwindColors],
                'material3': [theme_color_1.bubbleMaterial3Colors, theme_color_1.pointMaterial3Colors],
                'material3-dark': [theme_color_1.bubbleMaterial3DarkColors, theme_color_1.pointMaterial3DarkColors],
                'fluent2': [theme_color_1.bubbleFluent2Colors, theme_color_1.pointFluent2Colors],
                'fluent2-highcontrast': [theme_color_1.bubbleFluent2HighContrastColors, theme_color_1.pointFluent2HighContrastColors],
                'fluent2-dark': [theme_color_1.bubbleFluent2DarkColors, theme_color_1.pointFluent2DarkColors],
                'tailwind3-dark': [theme_color_1.bubbleTailwind3DarkColors, theme_color_1.pointTailwind3DarkColors],
                'tailwind3': [theme_color_1.bubbleTailwind3Colors, theme_color_1.pointTailwind3Colors]
            };
            var themeColors = colorSet[selectedTheme] || [theme_color_1.bubbleMaterialColors, theme_color_1.pointMaterialColors];
            args.fill = themeColors[1][args.point.index % 10];
            args.border.color = themeColors[1][args.point.index % 10];
        }
    };
    ;
    ColumnDrilldown.prototype.pointClick = function (args) {
        args.series.fill = args.point.color;
        if (args.point.index !== 6) {
            args.series.yAxis.interval = null;
            if (!args.series.chart.theme.includes('Dark') && args.series.chart.theme !== 'HighContrast' && args.series.chart.theme !== 'Fluent2HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "black";
            }
            else if (args.series.chart.theme === 'Material3Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#CAC4D0";
            }
            else if (args.series.chart.theme === 'FluentDark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#C8C6C4";
            }
            else if (args.series.chart.theme === 'Fluent2Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#ADADAD";
            }
            else if (args.series.chart.theme === 'Bootstrap5Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#DEE2E6";
            }
            else if (args.series.chart.theme === 'TailwindDark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#9CA3AF";
            }
            else if (args.series.chart.theme === 'Tailwind3Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#D1D5DB";
            }
            else if (args.series.chart.theme === 'HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "#969696";
            }
            else if (args.series.chart.theme === 'Fluent2HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "#FFFFFF";
            }
            if (!this.clicked) {
                document.getElementById("text").innerHTML = String(args.point.x);
                document.getElementById("category").style.visibility = "visible";
                document.getElementById("symbol").style.visibility = "visible";
                document.getElementById("text").style.visibility = "visible";
                if (args.point.index === 0) {
                    args.series.chart.title = "Top Populated Countries of Asia - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 1422,
                            drilldown: 'China'
                        },
                        {
                            y: 1438,
                            drilldown: 'India'
                        },
                        {
                            y: 278,
                            drilldown: 'Indonesia'
                        },
                        {
                            y: 240,
                            drilldown: 'Pakistan'
                        },
                        {
                            y: 173,
                            drilldown: 'Bangladesh'
                        },
                        {
                            y: 125,
                            drilldown: 'Japan'
                        },
                        {
                            y: 117,
                            drilldown: 'Philippines'
                        },
                        {
                            y: 99,
                            drilldown: 'Vietnam'
                        }
                    ];
                }
                if (args.point.index === 1) {
                    args.series.chart.title = "Top Populated Countries of Africa - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 223,
                            drilldown: 'Nigeria'
                        },
                        {
                            y: 126,
                            drilldown: 'Ethiopia'
                        },
                        {
                            y: 113,
                            drilldown: 'Egypt'
                        },
                        {
                            y: 68,
                            drilldown: 'Tanzania'
                        },
                        {
                            y: 60,
                            drilldown: 'South Africa'
                        },
                        {
                            y: 55,
                            drilldown: 'Kenya'
                        },
                        {
                            y: 48,
                            drilldown: 'Uganda'
                        }
                    ];
                }
                if (args.point.index === 2) {
                    args.series.chart.title = "Top Populated Countries of Europe - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 143,
                            drilldown: 'Russia'
                        },
                        {
                            y: 84,
                            drilldown: 'Germany'
                        },
                        {
                            y: 67,
                            drilldown: 'United Kingdom'
                        },
                        {
                            y: 65,
                            drilldown: 'France'
                        },
                        {
                            y: 59,
                            drilldown: 'Italy'
                        },
                        {
                            y: 47,
                            drilldown: 'Spain'
                        }
                    ];
                }
                if (args.point.index === 3) {
                    args.series.chart.title = "Top Populated Countries of North America - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 339,
                            drilldown: 'United States'
                        },
                        {
                            y: 127,
                            drilldown: 'Mexico'
                        },
                        {
                            y: 39,
                            drilldown: 'Canada'
                        },
                        {
                            y: 19,
                            drilldown: 'Guatemala'
                        },
                        {
                            y: 10,
                            drilldown: 'Honduras'
                        },
                        {
                            y: 6,
                            drilldown: 'El Salvador'
                        },
                        {
                            y: 6,
                            drilldown: 'Nicaragua'
                        },
                        {
                            y: 5,
                            drilldown: 'Costa Rica'
                        }
                    ];
                }
                if (args.point.index === 4) {
                    args.series.chart.title = "Top Populated Countries of Oceania - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 26,
                            drilldown: 'Australia'
                        },
                        {
                            y: 9,
                            drilldown: 'Papua New Guinea'
                        },
                        {
                            y: 5,
                            drilldown: 'New Zealand'
                        }
                    ];
                }
            }
        }
    };
    ColumnDrilldown.prototype.onAxisLabelClick = function (args) {
        if (args.axis.name === "primaryXAxis") {
            args.chart.series[0].fill = args.chart.series[0].points[args.index].color;
            if (args.index !== 6) {
                args.chart.primaryYAxis.interval = null;
                if (!args.chart.theme.includes('Dark') && args.chart.theme !== 'HighContrast' && args.chart.theme !== 'Fluent2HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "black";
                }
                else if (args.chart.theme === 'Material3Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#CAC4D0";
                }
                else if (args.chart.theme === 'FluentDark') {
                    args.chart.primaryXAxis.labelStyle.color = "#C8C6C4";
                }
                else if (args.chart.theme === 'Fluent2Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#ADADAD";
                }
                else if (args.chart.theme === 'Bootstrap5Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#DEE2E6";
                }
                else if (args.chart.theme === 'TailwindDark') {
                    args.chart.primaryXAxis.labelStyle.color = "#9CA3AF";
                }
                else if (args.chart.theme === 'Tailwind3Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#D1D5DB";
                }
                else if (args.chart.theme === 'HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "#969696";
                }
                else if (args.chart.theme === 'Fluent2HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "#FFFFFF";
                }
                if (!this.clicked) {
                    document.getElementById("text").innerHTML = args.text;
                    document.getElementById("category").style.visibility = "visible";
                    document.getElementById("symbol").style.visibility = "visible";
                    document.getElementById("text").style.visibility = "visible";
                    if (args.index === 0) {
                        args.chart.title = "Top Populated Countries of Asia - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                                y: 1422,
                                drilldown: 'China'
                            },
                            {
                                y: 1438,
                                drilldown: 'India'
                            },
                            {
                                y: 278,
                                drilldown: 'Indonesia'
                            },
                            {
                                y: 240,
                                drilldown: 'Pakistan'
                            },
                            {
                                y: 173,
                                drilldown: 'Bangladesh'
                            },
                            {
                                y: 125,
                                drilldown: 'Japan'
                            },
                            {
                                y: 117,
                                drilldown: 'Philippines'
                            },
                            {
                                y: 99,
                                drilldown: 'Vietnam'
                            }
                        ];
                    }
                    if (args.index === 1) {
                        args.chart.title = "Top Populated Countries of Africa - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                                y: 223,
                                drilldown: 'Nigeria'
                            },
                            {
                                y: 126,
                                drilldown: 'Ethiopia'
                            },
                            {
                                y: 113,
                                drilldown: 'Egypt'
                            },
                            {
                                y: 68,
                                drilldown: 'Tanzania'
                            },
                            {
                                y: 60,
                                drilldown: 'South Africa'
                            },
                            {
                                y: 55,
                                drilldown: 'Kenya'
                            },
                            {
                                y: 48,
                                drilldown: 'Uganda'
                            }
                        ];
                    }
                    if (args.index === 2) {
                        args.chart.title = "Top Populated Countries of Europe - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                                y: 143,
                                drilldown: 'Russia'
                            },
                            {
                                y: 84,
                                drilldown: 'Germany'
                            },
                            {
                                y: 67,
                                drilldown: 'United Kingdom'
                            },
                            {
                                y: 65,
                                drilldown: 'France'
                            },
                            {
                                y: 59,
                                drilldown: 'Italy'
                            },
                            {
                                y: 47,
                                drilldown: 'Spain'
                            }
                        ];
                    }
                    if (args.index === 3) {
                        args.chart.title = "Top Populated Countries of North America - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                                y: 339,
                                drilldown: 'United States'
                            },
                            {
                                y: 127,
                                drilldown: 'Mexico'
                            },
                            {
                                y: 39,
                                drilldown: 'Canada'
                            },
                            {
                                y: 19,
                                drilldown: 'Guatemala'
                            },
                            {
                                y: 10,
                                drilldown: 'Honduras'
                            },
                            {
                                y: 6,
                                drilldown: 'El Salvador'
                            },
                            {
                                y: 6,
                                drilldown: 'Nicaragua'
                            },
                            {
                                y: 5,
                                drilldown: 'Costa Rica'
                            }
                        ];
                    }
                    if (args.index === 4) {
                        args.chart.title = "Top Populated Countries of Oceania - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                                y: 26,
                                drilldown: 'Australia'
                            },
                            {
                                y: 9,
                                drilldown: 'Papua New Guinea'
                            },
                            {
                                y: 5,
                                drilldown: 'New Zealand'
                            }
                        ];
                    }
                }
            }
        }
    };
    ;
    ColumnDrilldown.prototype.goBack = function (e) {
        var chart = this.chartRef.current;
        chart.title = "Top Populated Continents of 2023";
        chart.subTitle = "A Look at Population Rankings and Trends in 2023";
        chart.primaryXAxis.labelStyle.color = "blue";
        chart.primaryYAxis.interval = 1000;
        chart.series[0].dataSource = this.data;
        this.clicked = false;
        e.target.style.visibility = 'hidden';
        document.getElementById(('symbol')).style.visibility = 'hidden';
        document.getElementById(('text')).style.visibility = 'hidden';
    };
    ;
    ColumnDrilldown.prototype.tooltipRender = function (args) {
        args.text = args.text.replace(/\d+/g, function (num) {
            return Number(num).toLocaleString('en-US');
        });
    };
    ;
    ColumnDrilldown.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "link" },
                    React.createElement("a", { id: "category", style: { visibility: this.clicked ? 'visible' : 'hidden', display: 'inline-block', cursor: 'pointer' }, onClick: this.goBack }, "Population"),
                    React.createElement("p", { style: { visibility: this.clicked ? 'visible' : 'hidden', display: 'inline-block' }, id: "symbol" }, "\u00A0>>\u00A0"),
                    React.createElement("p", { id: "text", style: { visibility: this.clicked ? 'visible' : 'hidden', display: 'inline-block' } }, this.categoryText)),
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "drilldown", style: { textAlign: "center" }, ref: this.chartRef, primaryXAxis: {
                        valueType: 'Category',
                        labelStyle: { color: 'blue' },
                        interval: 1,
                        majorGridLines: { width: 0 },
                        labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate90',
                        labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0,
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, primaryYAxis: {
                        interval: 1000,
                        title: 'Population (in Millions)',
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: this.title, subTitle: this.subTitle, tooltip: { enable: true, header: "<b>Population - 2023</b>", format: '${point.x}: <b>${point.y}M</b>' }, legendSettings: { visible: false }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), loaded: this.loaded.bind(this), pointRender: this.onPointRender, pointClick: this.pointClick, axisLabelClick: this.onAxisLabelClick, tooltipRender: this.tooltipRender.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: this.data, xName: 'drilldown', yName: 'y', name: 'Population', type: 'Column', cornerRadius: { topLeft: 5, topRight: 5 }, marker: {
                                dataLabel: {
                                    visible: true,
                                    position: 'Outer',
                                }
                            }, width: 2 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This drilldown column chart example visualizes the population distribution across different continents. Users can click on the columns to explore further details, allowing for an interactive analysis of population statistics by country within each continent.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure a drilldown column chart. Each column represents a continent, and users can drill down to view detailed population statistics by country upon selection. This functionality enhances data exploration and provides a clearer understanding of demographic distributions."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject",
                    React.createElement("code", null, "ColumnSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the column series can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/Chart-types/column", "aria-label": "Navigate to the documentation for Column Chart in TypeScript Chart control" }, " documentation section"),
                    "."))));
    };
    return ColumnDrilldown;
}(sample_base_1.SampleBase));
exports.ColumnDrilldown = ColumnDrilldown;
