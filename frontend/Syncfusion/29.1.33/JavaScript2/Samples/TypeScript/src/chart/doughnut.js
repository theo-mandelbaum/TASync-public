define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.AccumulationChart.Inject(ej2_charts_1.AccumulationLegend, ej2_charts_1.PieSeries, ej2_charts_1.AccumulationDataLabel);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var pie = new ej2_charts_1.AccumulationChart({
            series: [
                {
                    dataSource: [{ x: 'Labour', y: 18, text: '18%' }, { x: 'Legal', y: 8, text: '8%' },
                        { x: 'Production', y: 15, text: '15%' }, { x: 'License', y: 11, text: '11%' },
                        { x: 'Facilities', y: 18, text: '18%' }, { x: 'Taxes', y: 14, text: '14%' },
                        { x: 'Insurance', y: 16, text: '16%' }],
                    dataLabel: {
                        visible: true,
                        name: 'text',
                        position: 'Inside',
                        font: {
                            fontWeight: '600',
                            color: '#ffffff'
                        }
                    },
                    radius: '70%', xName: 'x',
                    yName: 'y', startAngle: 0,
                    endAngle: 360, innerRadius: '40%', name: 'Project',
                    explode: true, explodeOffset: '10%', explodeIndex: 3
                }
            ],
            enableSmartLabels: true,
            legendSettings: {
                visible: true, position: 'Top'
            },
            tooltip: { enable: false },
            title: 'Project Cost Breakdown',
            load: function (args) {
                (0, theme_color_1.loadAccumulationChartTheme)(args);
            }
        });
        pie.appendTo('#container');
    };
});
