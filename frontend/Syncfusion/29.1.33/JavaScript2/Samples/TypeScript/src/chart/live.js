define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.LineSeries, ej2_charts_1.Legend);
    var series1 = [];
    var series2 = [];
    var point1;
    var point2;
    var value = 10;
    var value1 = 15;
    var i;
    var intervalId;
    for (i = 0; i < 100; i++) {
        if (Math.random() > .5) {
            if (value < 45) {
                value += Math.random() * 2.0;
            }
            else {
                value -= 2.0;
            }
            if (value1 < 40) {
                value1 += Math.random() * 1.8;
            }
            else {
                value1 -= 2.0;
            }
        }
        else {
            if (value > 5) {
                value -= Math.random() * 2.0;
            }
            else {
                value += 2.0;
            }
            if (value1 > 5) {
                value1 -= Math.random() * 1.8;
            }
            else {
                value1 += 2.0;
            }
        }
        series1[i] = { x: i, y: value };
        series2[i] = { x: i, y: value1 + 10 };
    }
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var chart = new ej2_charts_1.Chart({
            primaryXAxis: {
                majorGridLines: { width: 0 }
            },
            primaryYAxis: {
                minimum: 0,
                maximum: 50,
                interval: 10
            },
            series: [
                {
                    type: 'Line',
                    dataSource: series1,
                    xName: 'x',
                    yName: 'y', animation: { enable: false }
                },
                {
                    type: 'Line',
                    dataSource: series2,
                    xName: 'x',
                    yName: 'y', animation: { enable: false }
                }
            ],
            width: '800',
            height: '350',
            load: function (args) {
                (0, theme_color_1.loadChartTheme)(args);
            }
        });
        chart.appendTo('#container-live');
        var setTimeoutValue = 100;
        intervalId = window.setInterval(function () {
            if ((0, ej2_charts_1.getElement)('container-live') === null) {
                clearInterval(intervalId);
            }
            else {
                if (Math.random() > .5) {
                    if (value < 45) {
                        value += Math.random() * 2.0;
                    }
                    else {
                        value -= 2.0;
                    }
                    if (value1 < 40) {
                        value1 += Math.random() * 1.8;
                    }
                    else {
                        value1 -= 2.0;
                    }
                }
                else {
                    if (value > 5) {
                        value -= Math.random() * 2.0;
                    }
                    else {
                        value += 2.0;
                    }
                    if (value1 > 5) {
                        value1 -= Math.random() * 1.8;
                    }
                    else {
                        value1 += 2.0;
                    }
                }
                series1.push({ x: i.toString(), y: value });
                series2.push({ x: i.toString(), y: value1 + 10 });
                i++;
                series1.shift();
                series2.shift();
                chart.series[0].dataSource = series1;
                chart.series[1].dataSource = series2;
                chart.refresh();
            }
        }, setTimeoutValue);
    };
});
