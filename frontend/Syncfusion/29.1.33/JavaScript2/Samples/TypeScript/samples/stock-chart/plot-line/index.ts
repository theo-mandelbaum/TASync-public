import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { StockChart } from '@syncfusion/ej2-charts';
import { amzn } from './stock-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, StripLine } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, IStockChartEventArgs, ChartTheme, Export } from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
StockChart.Inject(DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, Export);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, StripLine);

/**
 * Sample for Multiple series in stock chart
 */

    
    let stockChart: StockChart = new StockChart({
        primaryYAxis: {
            stripLines: [{ start: 320, sizeType: 'Pixel', size: 1, color: 'green', dashArray: '10,5' },
            { start: 380, sizeType: 'Pixel', size: 1, color: 'red', dashArray: '10,5' }],
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 }
        },

        chartArea: { border: { width: 0 } },
        primaryXAxis: { majorGridLines: { color: 'transparent' }},
        series: [
            {
                dataSource: amzn, xName: 'x', yName: 'close', type: 'Line', name: 'google'
            }
        ],
        seriesType : [],
        indicatorType : [],
        trendlineType : ['Linear', 'Exponential', 'Polynomial', 'Logarithmic', 'MovingAverage'],
        title: 'Plot line on Y axis',
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
