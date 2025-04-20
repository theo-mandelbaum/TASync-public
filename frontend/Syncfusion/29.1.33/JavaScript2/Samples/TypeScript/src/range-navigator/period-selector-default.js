define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "@syncfusion/ej2-charts", "@syncfusion/ej2-charts", "./financial-data", "@syncfusion/ej2-base", "./theme-colors"], function (require, exports, culture_loader_1, ej2_charts_1, ej2_charts_2, ej2_charts_3, financial_data_1, ej2_base_1, theme_colors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.AreaSeries, ej2_charts_1.DateTime, ej2_charts_1.LineSeries, ej2_charts_1.Crosshair, ej2_charts_2.ChartAnnotation, ej2_charts_2.CandleSeries, ej2_charts_2.MomentumIndicator, ej2_charts_2.Tooltip);
    ej2_charts_1.RangeNavigator.Inject(ej2_charts_1.AreaSeries, ej2_charts_1.DateTime, ej2_charts_2.PeriodSelector, ej2_charts_3.RangeTooltip);
    var theme = (0, theme_colors_1.loadRangeNavigatorTheme)();
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var chart = new ej2_charts_1.Chart({
            primaryXAxis: {
                valueType: 'DateTime',
                majorGridLines: { width: 0 },
                crosshairTooltip: { enable: true }
            },
            primaryYAxis: {
                title: 'Price',
                labelFormat: '${value}',
                plotOffset: 25,
                minimum: 50, maximum: 170, rangePadding: 'None',
                interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 },
            },
            rows: [
                {
                    height: '40%'
                }, {
                    height: '60%'
                }
            ],
            axes: [{
                    name: 'secondary',
                    opposedPosition: true, rowIndex: 0,
                    majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 80, maximum: 120, interval: 20,
                    majorTickLines: { width: 0 }, title: 'Momentum', stripLines: [
                        {
                            start: 80, end: 120, text: '', color: 'black', visible: true,
                            opacity: 0.03, zIndex: 'Behind'
                        }
                    ]
                }],
            series: [{
                    dataSource: financial_data_1.chartData, width: 2,
                    xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                    name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                    type: 'Candle', animation: { enable: true }
                }],
            indicators: [{
                    type: 'Momentum', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff',
                    period: 3, animation: { enable: true }, upperLine: { color: '#e74c3d' }
                }],
            margin: { top: -50 },
            tooltip: { enable: true, shared: true },
            width: ej2_base_1.Browser.isDevice ? '100%' : '80%',
            crosshair: { enable: true, lineType: 'Vertical' },
            chartArea: { border: { width: 0 } },
            title: 'AAPL 2012-2017',
            theme: theme, legendSettings: { visible: false }
        });
        chart.appendTo('#chart');
        var range = new ej2_charts_1.RangeNavigator({
            labelPosition: 'Outside', valueType: 'DateTime', height: '150',
            value: [new Date(2014, 0), new Date(2015, 0)],
            series: [{ dataSource: financial_data_1.chartData, xName: 'x', yName: 'high', type: 'Line', width: 1 }],
            changed: function (args) {
                chart.primaryXAxis.zoomFactor = args.zoomFactor;
                chart.primaryXAxis.zoomPosition = args.zoomPosition;
                chart.dataBind();
            },
            width: ej2_base_1.Browser.isDevice ? '100%' : '80%',
            margin: { right: 0, left: 0, top: 0, bottom: 0 },
            theme: theme,
            loaded: function (args) {
                if (!ej2_base_1.Browser.isDevice) {
                    document.getElementById('container_Secondary_Element').style.transform = 'translate(13%)';
                }
            },
            load: function (args) {
                args.rangeNavigator.periodSelectorSettings.height =
                    document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
            },
            periodSelectorSettings: {
                position: 'Top',
                periods: [
                    { text: '1M', interval: 1, intervalType: 'Months' },
                    { text: '2M', interval: 2, intervalType: 'Months' },
                    { text: '6M', interval: 6, intervalType: 'Months' },
                    { text: 'YTD' },
                    { text: '1Y', interval: 1, intervalType: 'Years' },
                    { text: '2Y', interval: 2, intervalType: 'Years' },
                    { text: 'ALL' }
                ]
            }
        });
        range.appendTo('#container');
    };
});
