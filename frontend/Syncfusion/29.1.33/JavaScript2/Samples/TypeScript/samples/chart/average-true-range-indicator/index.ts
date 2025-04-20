import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, LineSeries, AtrIndicator, StripLine, ChartTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { chartValue } from './financial-data';
import { loadChartTheme } from './theme-color';
Chart.Inject(
    CandleSeries, Category, Tooltip, StripLine, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    AtrIndicator
);

/**
 * Average True Range Indicator sample
 */


    
   
        let chart: Chart = new Chart({
            // Initiazlizing the axes
            primaryXAxis: {
                valueType: 'DateTime',
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true },
            },
            primaryYAxis: {
                title: 'Price',
                labelFormat: '${value}',
                minimum: 50, maximum: 170,
                interval: 30, rowIndex: 1,
                plotOffset: 25,
                majorGridLines: { width: 1 }, opposedPosition: true, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
            },
            axes: [{
                name: 'secondary',
                opposedPosition: true, rowIndex: 0,
                majorGridLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 },
                title: 'ATR',
                stripLines: [
                    {
                        start: 0, end: 14, text: '', color: '#6063ff', visible: true,
                        opacity: 0.1, zIndex: 'Behind'
                    }]
            }],
            // Initializing the rows
            rows: [
                {
                    height: '40%'
                }, {
                    height: '60%'
                }
            ],
            // Initializing the chart series
            series: [{
                dataSource: chartValue, width: 2,
                xName: 'period', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                type: 'Candle'
            }],
            // Initializing the indicators
            indicators: [{
                type: 'Atr', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff',
                period: 3
            }],
            /**
             * User interaction initialized zooming, tooltip and crosshair
             */
            zoomSettings:
                {

                    enableSelectionZooming: true,
                    enablePinchZooming: true,
                    mode: 'X',
                    enablePan: true
                },
            tooltip: {
                enable: true, shared: true
            },
            crosshair: { enable: true, lineType: 'Vertical' },
            chartArea: { border: { width: 0 } },
            title: 'AAPL Stock Price 2012-2017',
            width: Browser.isDevice ? '100%' : '75%',
            load: (args: ILoadedEventArgs) => {
                loadChartTheme(args);
            },
            legendSettings: {
                visible: false
            }
        });
        chart.appendTo('#container');
    

