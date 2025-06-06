import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, LineSeries, StripLine, MacdIndicator, ColumnSeries, ChartTheme,
} from '@syncfusion/ej2-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(
    CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    MacdIndicator, StripLine, ColumnSeries
);

/**
 * Sample for MACD Indicator
 */

    
        let chart: Chart = new Chart({
            //Initializing Primary X Axis
            primaryXAxis: {
                valueType: 'DateTime', intervalType: 'Months',
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true }
            },
            //Initializing Primary Y Axis
            primaryYAxis: {
                title: 'Price',
                labelFormat: '${value}',
                plotOffset: 25, minimum: 50,
                maximum: 170, majorTickLines: { width: 0 },
                interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
            },
            //Initializing Rows
            rows: [
                {
                    height: '40%'
                }, {
                    height: '60%'
                }
            ],
            //Initializing Axes
            axes: [{
                name: 'secondary',
                opposedPosition: true, rowIndex: 0,
                majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: -3.5, maximum: 3.5, interval: 3.5,
                majorTickLines: { width: 0 }, title: 'MACD', stripLines: [
                    {
                        start: -3.5, end: 3.5, text: '', color: '#000000', visible: true,
                        opacity: 0.03, zIndex: 'Behind'
                    }]
            }],
            //Initializing Chart Series
            series: [{
                dataSource: chartValue, width: 2,
                xName: 'period', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                type: 'Candle'
            }],
            //Initializing Technical Indicators
            indicators: [{
                type: 'Macd',
                period: 3,
                fastPeriod: 8,
                slowPeriod: 5,
                seriesName: 'Apple Inc',
                macdType: 'Both',
                width: 2,
                macdPositiveColor: '#2ecd71',
                macdNegativeColor: '#e74c3d',
                fill: '#6063ff',
                yAxisName: 'secondary'
            }],
            //Initializing User Interaction Zoom, Tooltip and Crosshair
            zoomSettings:
                {
                    enablePan: true,
                    enableSelectionZooming: true,
                    enablePinchZooming: true,
                    mode: 'X',
                },
            tooltip: {
                enable: true, shared: true
            },
            crosshair: { enable: true, lineType: 'Vertical' },
            chartArea: { border: { width: 0 } },
            //Initializing Chart Title
            title: 'AAPL Stock Price 2012-2017 ',
            width: Browser.isDevice ? '100%' : '75%',
            load: (args: ILoadedEventArgs) => {
                loadChartTheme(args);
            },
            legendSettings: { visible: false }
        });
        chart.appendTo('#container');
    

