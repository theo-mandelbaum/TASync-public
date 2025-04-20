define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.AccumulationChart.Inject(ej2_charts_1.AccumulationLegend, ej2_charts_1.Selection, ej2_charts_1.PieSeries, ej2_charts_1.AccumulationAnnotation, ej2_charts_1.AccumulationDataLabel, ej2_charts_1.AccumulationTooltip, ej2_charts_1.AccumulationSelection);
    var year = 10;
    var updatedData = [
        { x: 'Apple', y: 7.8451 },
        { x: 'Google', y: 13.4167 },
        { x: 'Amazon', y: 6.9403 },
        { x: 'Microsoft', y: 20.7127 },
        { x: 'IBM', y: 76.2822 },
        { x: 'Oracle', y: 21.0090 },
        { x: 'Netflix', y: 16.8242 }
    ];
    var updatedData2 = [
        { x: 'Apple', y: 10.9899 },
        { x: 'Google', y: 14.2521 },
        { x: 'Amazon', y: 9.8100 },
        { x: 'Microsoft', y: 20.4205 },
        { x: 'IBM', y: 100.6536 },
        { x: 'Oracle', y: 26.0708 },
        { x: 'Netflix', y: 27.4937 }
    ];
    var updatedData3 = [
        { x: 'Apple', y: 17.4344 },
        { x: 'Google', y: 16.1018 },
        { x: 'Amazon', y: 10.9887 },
        { x: 'Microsoft', y: 24.0142 },
        { x: 'IBM', y: 117.6709 },
        { x: 'Oracle', y: 24.9828 },
        { x: 'Netflix', y: 11.8551 }
    ];
    var updatedData4 = [
        { x: 'Apple', y: 14.5929 },
        { x: 'Google', y: 22.1492 },
        { x: 'Amazon', y: 14.8658 },
        { x: 'Microsoft', y: 26.9842 },
        { x: 'IBM', y: 118.2763 },
        { x: 'Oracle', y: 28.5474 },
        { x: 'Netflix', y: 35.2718 }
    ];
    var updatedData5 = [
        { x: 'Apple', y: 20.4231 },
        { x: 'Google', y: 28.3890 },
        { x: 'Amazon', y: 16.5876 },
        { x: 'Microsoft', y: 36.2762 },
        { x: 'IBM', y: 113.4907 },
        { x: 'Oracle', y: 34.4296 },
        { x: 'Netflix', y: 57.4951 }
    ];
    var updatedData6 = [
        { x: 'Apple', y: 27.0239 },
        { x: 'Google', y: 30.9638 },
        { x: 'Amazon', y: 23.8494 },
        { x: 'Microsoft', y: 40.9778 },
        { x: 'IBM', y: 99.4267 },
        { x: 'Oracle', y: 35.4508 },
        { x: 'Netflix', y: 91.8956 }
    ];
    var updatedData7 = [
        { x: 'Apple', y: 24.0368 },
        { x: 'Google', y: 38.1172 },
        { x: 'Amazon', y: 34.8921 },
        { x: 'Microsoft', y: 49.8084 },
        { x: 'IBM', y: 100.0202 },
        { x: 'Oracle', y: 34.6261 },
        { x: 'Netflix', y: 102.0304 }
    ];
    var updatedData8 = [
        { x: 'Apple', y: 35.2487 },
        { x: 'Google', y: 46.9350 },
        { x: 'Amazon', y: 48.2920 },
        { x: 'Microsoft', y: 66.5079 },
        { x: 'IBM', y: 108.4717 },
        { x: 'Oracle', y: 41.7164 },
        { x: 'Netflix', y: 165.3743 }
    ];
    var updatedData9 = [
        { x: 'Apple', y: 44.9396 },
        { x: 'Google', y: 56.0381 },
        { x: 'Amazon', y: 81.8891 },
        { x: 'Microsoft', y: 95.1360 },
        { x: 'IBM', y: 103.0934 },
        { x: 'Oracle', y: 43.7122 },
        { x: 'Netflix', y: 319.2903 }
    ];
    var updatedData10 = [
        { x: 'Apple', y: 50.2883 },
        { x: 'Google', y: 59.4929 },
        { x: 'Amazon', y: 89.2447 },
        { x: 'Microsoft', y: 124.6044 },
        { x: 'IBM', y: 103.0097 },
        { x: 'Oracle', y: 49.6689 },
        { x: 'Netflix', y: 328.8713 }
    ];
    var intervalId;
    var yearIndex = 2;
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var count = 0;
        var pie = new ej2_charts_1.AccumulationChart({
            series: [
                {
                    type: 'Pie', dataSource: updatedData, xName: 'x', yName: 'y', radius: '75%',
                    innerRadius: '65%',
                    dataLabel: {
                        visible: true, position: 'Outside', font: {
                            fontWeight: '600',
                        },
                        connectorStyle: { type: 'Line', width: 2, length: '18' }
                    }
                }
            ],
            legendSettings: { visible: false },
            textRender: function (args) {
                args.text = args.point.x + ": " + args.text;
            },
            annotationRender: function (args) {
                args.content.innerHTML = "<span style='font-size: 40px; font-weight: 600;'>20" + year + "</span>";
            },
            enableBorderOnMouseMove: false,
            load: function (args) {
                theme_color_1.loadAccumulationChartTheme;
                updateClearInterval();
                intervalId = setInterval(function () {
                    var container = document.getElementById('donut-container');
                    if (container && container.id === args.chart.element.id) {
                        var newData = (eval('updatedData' + yearIndex) || []).map(function (item) {
                            return { x: item.x, y: item.y };
                        });
                        year = year < 20 ? year + 1 : 10;
                        if (pie.series.length > 0) {
                            pie.series[0].setData(newData, 500);
                        }
                        yearIndex = yearIndex < 10 ? yearIndex + 1 : 2;
                    }
                    else {
                        updateClearInterval();
                    }
                }, 1500);
            },
            title: 'Average Stock Market Prices of Leading Tech Giants',
            titleStyle: { size: '18px' },
            annotations: [{
                    content: '<div ><b>2010<b></div>',
                    x: "48%",
                    y: "48%"
                }],
        });
        pie.appendTo('#donut-container');
        function updateClearInterval() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }
    };
});
