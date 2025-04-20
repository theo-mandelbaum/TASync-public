import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { StockChart, } from '@syncfusion/ej2-charts';
import { amzn } from './stock-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries  } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, StripLine } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, IStockChartEventArgs, ChartTheme, Export } from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
StockChart.Inject(DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, Export);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, StripLine);

/**
 * Sample for stock chart with strip line
 */

    
    let stockChart: StockChart = new StockChart({
        chartArea: { border: { width: 0 } },
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift'  },
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 },
            stripLines: [{ start: 340, end: 380, color: '#3CB371', opacity: 0.1 }]
        },
        series: [
            {
                dataSource: amzn, xName: 'x', yName: 'close', type: 'Line'
            }
        ],
        seriesType : [],
        indicatorType : [],
        trendlineType : ['Linear', 'Exponential', 'Polynomial', 'Logarithmic', 'MovingAverage'],
        title: 'AAPL Historical',
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
