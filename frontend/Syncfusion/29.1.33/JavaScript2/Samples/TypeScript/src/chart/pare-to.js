define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "@syncfusion/ej2-charts", "@syncfusion/ej2-base", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, ej2_charts_2, ej2_base_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.ColumnSeries, ej2_charts_2.Category, ej2_charts_2.ParetoSeries, ej2_charts_2.LineSeries, ej2_charts_1.Legend, ej2_charts_1.Tooltip);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var chart = new ej2_charts_1.Chart({
            primaryXAxis: {
                title: 'Defects',
                interval: 1,
                valueType: 'Category',
                majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
                majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
                lineStyle: { width: 0 },
            },
            primaryYAxis: {
                title: 'Frequency',
                minimum: 0,
                maximum: 150,
                interval: 30,
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
                minorGridLines: { width: 1 }, minorTickLines: { width: 0 }
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            series: [
                {
                    type: 'Pareto',
                    dataSource: [
                        { x: 'Traffic', y: 56 }, { x: 'Child Care', y: 44.8 },
                        { x: 'Transport', y: 27.2 }, { x: 'Weather', y: 19.6 },
                        { x: 'Emergency', y: 6.6 }
                    ],
                    xName: 'x', yName: 'y', name: 'Defect', width: 2,
                    marker: {
                        visible: true,
                        width: 10,
                        height: 10
                    },
                }
            ],
            width: ej2_base_1.Browser.isDevice ? '100%' : '60%',
            title: 'Defect vs Frequency',
            legendSettings: { visible: false },
            tooltip: {
                enable: true,
                shared: true
            },
            load: function (args) {
                (0, theme_color_1.loadChartTheme)(args);
            }
        });
        chart.appendTo('#container');
    };
});
