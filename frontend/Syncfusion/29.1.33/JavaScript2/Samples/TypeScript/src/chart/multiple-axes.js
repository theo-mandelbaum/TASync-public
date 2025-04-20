define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "@syncfusion/ej2-base", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, ej2_base_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.SplineSeries, ej2_charts_1.ColumnSeries, ej2_charts_1.Category, ej2_charts_1.Tooltip, ej2_charts_1.ChartAnnotation);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var chart = new ej2_charts_1.Chart({
            primaryXAxis: {
                valueType: 'Category',
                majorGridLines: { width: 0 },
                minorGridLines: { width: 0 },
                majorTickLines: { width: 0 }
            },
            primaryYAxis: {
                minimum: 0, maximum: 100, interval: 20,
                lineStyle: { width: 0 },
                labelFormat: '{value}°F', majorTickLines: { width: 0 }
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            axes: [
                {
                    majorGridLines: { width: 0 },
                    rowIndex: 0, opposedPosition: true,
                    lineStyle: { width: 0 },
                    minimum: 24, maximum: 36, interval: 2,
                    name: 'yAxis', minorTickLines: { width: 0 },
                    labelFormat: '{value}°C'
                }
            ],
            annotations: [{
                    content: '<div id="chart_cloud"><img src="src/chart/images/cloud.png"  style="width: 41px; height: 41px"/></div>',
                    x: 'Sun', y: 70, coordinateUnits: 'Point', verticalAlignment: 'Top'
                }, {
                    content: '<div id="chart_cloud"><img src="src/chart/images/sunny.png"  style="width: 41px; height: 41px"/></div>',
                    x: 'Sat', y: 35, coordinateUnits: 'Point', yAxisName: 'yAxis'
                }],
            series: [
                {
                    type: 'Column',
                    dataSource: [
                        { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
                        { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 },
                        { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
                        { x: 'Sat', y: 50 }
                    ],
                    width: 2,
                    xName: 'x', yName: 'y',
                    name: 'Germany', marker: { visible: true, height: 7, width: 7 }
                },
                {
                    type: 'Spline',
                    dataSource: [
                        { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
                        { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 },
                        { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
                        { x: 'Sat', y: 34 }
                    ],
                    xName: 'x', yName: 'y',
                    width: 2, yAxisName: 'yAxis',
                    name: 'Japan',
                    marker: { visible: true, width: 7, height: 7, isFilled: true }
                }
            ],
            title: 'Weather Data',
            tooltip: { enable: true },
            legendSettings: {
                visible: false
            },
            width: ej2_base_1.Browser.isDevice ? '100%' : '75%',
            load: function (args) {
                (0, theme_color_1.loadChartTheme)(args);
            }
        });
        chart.appendTo('#container');
    };
});
