define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "@syncfusion/ej2-base", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, ej2_base_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.LineSeries, ej2_charts_1.DateTime, ej2_charts_1.Logarithmic, ej2_charts_1.Legend, ej2_charts_1.Tooltip);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var chart = new ej2_charts_1.Chart({
            primaryXAxis: {
                labelFormat: 'y',
                valueType: 'DateTime',
                edgeLabelPlacement: 'Shift'
            },
            primaryYAxis: {
                valueType: 'Logarithmic',
                edgeLabelPlacement: 'Shift',
                minorTicksPerInterval: 5,
                majorGridLines: { width: 1.5 },
                minorTickLines: { width: 0, height: 4 },
                minimum: 0,
                maximum: 100000,
                interval: 1,
                labelFormat: '${value}'
            },
            series: [
                {
                    type: 'Line',
                    dataSource: [
                        { x: new Date(1995, 0, 1), y: 80 },
                        { x: new Date(1996, 0, 1), y: 200 },
                        { x: new Date(1997, 0, 1), y: 400 },
                        { x: new Date(1998, 0, 1), y: 600 },
                        { x: new Date(1999, 0, 1), y: 700 },
                        { x: new Date(2000, 0, 1), y: 1400 },
                        { x: new Date(2001, 0, 1), y: 2000 },
                        { x: new Date(2002, 0, 1), y: 4000 },
                        { x: new Date(2003, 0, 1), y: 6000 },
                        { x: new Date(2004, 0, 1), y: 8000 },
                        { x: new Date(2005, 0, 1), y: 11000 }
                    ],
                    xName: 'x', width: 2,
                    yName: 'y', name: 'Product X',
                    marker: {
                        visible: true, height: 10, width: 10
                    }
                }
            ],
            title: 'Product X Growth [1995-2005]', legendSettings: { visible: false },
            tooltip: { enable: true, header: 'Profit' },
            width: ej2_base_1.Browser.isDevice ? '100%' : '60%',
            load: function (args) {
                (0, theme_color_1.loadChartTheme)(args);
            }
        });
        chart.appendTo('#container');
    };
});
