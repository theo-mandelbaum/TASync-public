import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { StockChart } from '@syncfusion/ej2-charts';
import { aapl } from './stock-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries  } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair , IStockChartEventArgs, ChartTheme} from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
StockChart.Inject(DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export);

/**
 * Sample for Spline Series in stock chart
 */

    
    let stockChart: StockChart = new StockChart({
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }},
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 },
        },
        chartArea: { border: { width: 0 } },
        series: [
            {
                dataSource: aapl, xName: 'x', yName: 'high', type: 'Spline'
            }
        ],
        tooltip: { enable: true },
        crosshair: { enable: true },
        seriesType : [],
        indicatorType : [],
        title: 'AAPL Stock Price',
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
