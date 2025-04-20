define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "@syncfusion/ej2-charts", "@syncfusion/ej2-base", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, ej2_charts_2, ej2_base_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.StackingColumnSeries, ej2_charts_1.LineSeries, ej2_charts_2.Category, ej2_charts_2.ColumnSeries, ej2_charts_1.Tooltip, ej2_charts_2.Legend);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var chart = new ej2_charts_1.Chart({
            primaryXAxis: {
                title: 'Years',
                interval: ej2_base_1.Browser.isDevice ? 2 : 1,
                labelIntersectAction: 'Rotate45',
                valueType: 'Category',
                majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
                majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
                lineStyle: { width: 0 },
            },
            primaryYAxis: {
                title: 'Growth',
                minimum: -3,
                maximum: 3,
                interval: 1,
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
                minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
                labelFormat: '{value}B',
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            series: [
                {
                    type: 'StackingColumn',
                    dataSource: [
                        { x: '2007', y: 1 }, { x: '2008', y: 0.25 },
                        { x: '2009', y: 0.1 }, { x: '2010', y: 1 },
                        { x: '2011', y: 0.1 }, { x: '2012', y: -0.25 },
                        { x: '2013', y: 0.25 }, { x: '2014', y: 0.6 }
                    ],
                    xName: 'x', yName: 'y', name: 'Private Consumption',
                }, {
                    type: 'StackingColumn',
                    dataSource: [
                        { x: '2007', y: 0.5 }, { x: '2008', y: 0.35 },
                        { x: '2009', y: 0.9 }, { x: '2010', y: 0.5 },
                        { x: '2011', y: 0.25 }, { x: '2012', y: -0.5 },
                        { x: '2013', y: 0.5 }, { x: '2014', y: 0.6 }
                    ],
                    xName: 'x', yName: 'y', name: 'Government Consumption',
                }, {
                    type: 'StackingColumn',
                    dataSource: [
                        { x: '2007', y: 1.5 }, { x: '2008', y: 0.35 },
                        { x: '2009', y: -2.7 }, { x: '2010', y: 0.5 },
                        { x: '2011', y: 0.25 }, { x: '2012', y: -0.1 },
                        { x: '2013', y: -0.3 }, { x: '2014', y: -0.6 }
                    ],
                    xName: 'x', yName: 'y', name: 'Investment',
                }, {
                    type: 'StackingColumn',
                    dataSource: [
                        { x: '2007', y: -1 }, { x: '2008', y: -.35 },
                        { x: '2009', y: -0.3 }, { x: '2010', y: -0.5 },
                        { x: '2011', y: 0 }, { x: '2012', y: -0.4 },
                        { x: '2013', y: 0 }, { x: '2014', y: -0.6 }
                    ],
                    xName: 'x', yName: 'y', name: 'Net Foreign Trade'
                }, {
                    type: 'Line',
                    dataSource: [
                        { x: '2007', y: 2 }, { x: '2008', y: 0.1 },
                        { x: '2009', y: -2.7 }, { x: '2010', y: 1.8 },
                        { x: '2011', y: 2 }, { x: '2012', y: 0.4 },
                        { x: '2013', y: 0.9 }, { x: '2014', y: 0.4 }
                    ],
                    xName: 'x', yName: 'y', name: 'GDP',
                    width: 2,
                    marker: {
                        visible: true,
                        width: 10,
                        height: 10
                    },
                }
            ],
            width: ej2_base_1.Browser.isDevice ? '100%' : '60%',
            title: 'Annual Growth GDP in France',
            legendSettings: {
                visible: true
            },
            tooltip: {
                enable: true, enableHighlight: true
            },
            load: function (args) {
                (0, theme_color_1.loadChartTheme)(args);
            }
        });
        chart.appendTo('#container');
    };
});
