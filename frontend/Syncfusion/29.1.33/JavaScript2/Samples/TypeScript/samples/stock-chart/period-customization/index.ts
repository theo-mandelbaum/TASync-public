import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { StockChart } from '@syncfusion/ej2-charts';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
StockChart.Inject(DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export);

/**
 * Sample for Multiple series in stock chart
 */

    
    let series1: Object[] = [];
    let point1: Object;
    let value: number = 80;
    let i: number;
    for (i = 1; i < 1440; i++) {
        if (Math.random() > .5) {
            value += Math.random();
        } else {
            value -= Math.random();
        }
        point1 = { x: new Date(2000, 1, 1, 0, i), y: value.toFixed(1) };
        series1.push(point1);
    }
    let stockChart: StockChart = new StockChart({
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { color: 'transparent' }, edgeLabelPlacement: 'Shift',
                        crosshairTooltip: { enable: true }},
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 },
            crosshairTooltip: { enable: true }
        },
        chartArea: { border: { width: 0 } },
        series: [
            {
                dataSource: series1, xName: 'x', yName: 'y', type: 'Line', name: 'google',
            }
        ],
        seriesType: [],
        indicatorType: [],
        exportType: [],
        trendlineType : [],
        periods: [
            { intervalType: 'Minutes', interval: 1, text: '1m' },
            { intervalType: 'Minutes', interval: 30, text: '30m' },
            { intervalType: 'Hours', interval: 1, text: '1H' },
            { intervalType: 'Hours', interval: 12, text: '12H', selected: true },
            { text: '1D' }
        ],
        title: 'AAPL stock price by minutes',
        crosshair: {
            enable: true,
            lineType:'Both'
        },
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
