import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, LineSeries, BollingerBands, ChartTheme, RangeAreaSeries, SplineRangeAreaSeries
} from '@syncfusion/ej2-charts';
import { chartValue } from './financial-data';
import { Browser} from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(
    CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries, RangeAreaSeries,
    BollingerBands, SplineRangeAreaSeries
);

/**
 * Sample for Bollinger Band indicator
 */

    
        // tslint:disable
        let chart: Chart = new Chart({
            // Initializing the axes
            primaryXAxis: {
                valueType: 'DateTime',intervalType: "Months",
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true }
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
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 }
            },
            // Initializing the chart series
            series: [{
                dataSource: chartValue, width: 2,
                xName: 'period', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                type: 'Candle'
            }],
            // Initializing the indicators
            indicators: [{
                type: 'BollingerBands', field: 'Close', seriesName: 'Apple Inc', fill: '#606eff',
                period: 14, animation: { enable: true }, upperLine: { color: '#ffb735', width: 1 },
                lowerLine: { color: '#f2ec2f', width: 1 }
            }],
            /**
             * Initializing the user interaction features like, tooltip, crosshair and zooming
             */
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
            width: Browser.isDevice ? '100%' : '75%',
            title: 'AAPL Stock Price 2012-2017',
            load: (args: ILoadedEventArgs) => {
                loadChartTheme(args);
            },
            legendSettings: { visible: false }
        });
        chart.appendTo('#container');
    
