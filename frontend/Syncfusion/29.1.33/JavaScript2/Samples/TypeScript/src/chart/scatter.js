define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "@syncfusion/ej2-base", "./scatter-data", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, ej2_base_1, scatter_data_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.ScatterSeries, ej2_charts_1.Legend, ej2_charts_1.Tooltip);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var chart = new ej2_charts_1.Chart({
            primaryXAxis: {
                majorGridLines: { width: 0 },
                minimum: 100,
                maximum: 220,
                edgeLabelPlacement: 'Shift',
                title: 'Height in Inches'
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            primaryYAxis: {
                majorTickLines: {
                    width: 0
                },
                minimum: 50,
                maximum: 80,
                lineStyle: {
                    width: 0
                },
                title: 'Weight in Pounds',
                rangePadding: 'None'
            },
            series: [
                {
                    type: 'Scatter',
                    dataSource: scatter_data_1.scatterData.getMaleData,
                    xName: 'x', width: 2, marker: {
                        visible: false,
                        width: 12,
                        height: 12,
                        shape: 'Circle'
                    },
                    yName: 'y', name: 'Male', opacity: 0.6
                },
                {
                    type: 'Scatter',
                    dataSource: scatter_data_1.scatterData.getFemaleData,
                    xName: 'x', width: 2, marker: {
                        visible: false,
                        width: 12,
                        height: 12,
                        shape: 'Diamond'
                    },
                    yName: 'y', name: 'Female', opacity: 0.6
                }
            ],
            title: 'Height vs Weight',
            tooltip: {
                enable: true,
                format: 'Weight: <b>${point.x} lbs</b> <br/> Height: <b>${point.y}"</b>'
            },
            width: ej2_base_1.Browser.isDevice ? '100%' : '80%',
            load: function (args) {
                (0, theme_color_1.loadChartTheme)(args);
            }
        });
        chart.appendTo('#container');
    };
});
