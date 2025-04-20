define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "@syncfusion/ej2-buttons", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, ej2_buttons_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.LineSeries, ej2_charts_1.Legend);
    var chart;
    var loaded;
    var dt1;
    var dt2;
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        chart = new ej2_charts_1.Chart({
            primaryXAxis: {
                majorGridLines: { color: 'transparent' }
            },
            series: [
                {
                    name: 'Series1',
                    type: 'Line',
                    animation: { enable: false }
                }
            ],
            legendSettings: { visible: false },
            load: function (args) {
                (0, theme_color_1.loadChartTheme)(args);
            }
        });
        chart.appendTo('#container');
        var button = new ej2_buttons_1.Button({ cssClass: 'e-info', isPrimary: true });
        button.appendTo('#load');
        document.getElementById('load').onclick = function () {
            var series1 = [];
            var point1;
            var value = 0;
            var i;
            for (i = 0; i < 100000; i++) {
                value += (Math.random() * 10 - 5);
                point1 = { x: i, y: value };
                series1.push(point1);
            }
            dt1 = new Date().getTime();
            chart.series[0].dataSource = series1;
            chart.series[0].xName = 'x';
            chart.series[0].yName = 'y';
            chart.legendSettings.visible = false;
            chart.loaded = loaded;
            chart.refresh();
        };
        loaded = function (args) {
            dt2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = (dt2 - dt1) + 'ms';
        };
    };
});
