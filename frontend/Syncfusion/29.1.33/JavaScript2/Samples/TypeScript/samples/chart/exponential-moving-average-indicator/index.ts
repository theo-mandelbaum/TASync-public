import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, LineSeries, EmaIndicator
} from '@syncfusion/ej2-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(
    CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    EmaIndicator
);

/**
 * Sample for EMA Indicator
 */


    
        let chart: Chart = new Chart({
            // Initialize the chart axes
            primaryXAxis: {
                valueType: 'DateTime',
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true },
            }, chartArea: {
                border: {
                    width: 0
                }
            },
            primaryYAxis: {
                title: 'Price (in Million)',
                labelFormat: '${value}M',
                minimum: 50, maximum: 170, interval: 30,
                majorTickLines: { width: 1 },
                lineStyle: { width: 0 }
            },
            // Initialize the chart series
            series: [{
                dataSource: chartValue, width: 2,
                xName: 'period', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                type: 'Candle', animation: { enable: false }
            }],
            // Initialize the indicators
            indicators: [{
                type: 'Ema', field: 'Close', seriesName: 'Apple Inc', fill: '#606eff',
                period: 14, animation: { enable: true }
            }],
            /**
             * Initialize user interaction features tooltip, crosshiar and zooming
             */
            tooltip: {
                enable: true, shared: true
            },
            crosshair: { enable: true, lineType: 'Vertical' },
            zoomSettings: {
                enablePan: true,
                enableSelectionZooming: true,
                mode: 'X',
            },
            title: 'AAPL Stock Price 2012-2017',
            width: Browser.isDevice ? '100%' : '75%',
            load: (args: ILoadedEventArgs) => {
                loadChartTheme(args);
            },
            legendSettings: { visible: false }
        });
        chart.appendTo('#container');
    
