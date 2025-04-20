/**
 * Sample for SMA Indicator
 */
var renderChartSMA = function (chartData) {
        var chart = new ej.charts.Chart({
            primaryXAxis: {
                valueType: 'DateTime', intervalType: 'Months',
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true },
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            primaryYAxis: {
                title: 'Price (in Million)',
                labelFormat: '${value}M',
                minimum: 50, maximum: 170, interval: 30,
                majorGridLines: { width: 1 },
                lineStyle: { width: 0 }
            },
            series: [{
                    dataSource: chartValue, width: 2,
                    xName: 'period', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                    name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                    type: 'Candle', animation: { enable: false }
                }],
            indicators: [{
                    type: 'Sma', field: 'Close', seriesName: 'Apple Inc', fill: '#6063ff',
                    period: 14, xName: 'period'
                }],
            tooltip: {
                enable: true, shared: true
            },
            crosshair: { enable: true, lineType: 'Vertical' },
            zoomSettings: {
                enableSelectionZooming: true,
                enablePinchZooming: true,
                mode: 'X',
                enablePan: true
            },
            title: 'AAPL - 2012-2017',
            width: ej.base.Browser.isDevice ? '100%' : '75%',
               // custom code start
            load: function (args) {
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
                args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + 
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            },
               // custom code end
            legendSettings: { visible: false }
        });
        chart.appendTo('#sma-container');
    };
    this.default = function () {
            renderChartSMA();
        };