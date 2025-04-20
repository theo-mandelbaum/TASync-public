import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { StockChart } from '@syncfusion/ej2-charts';
import { aapl } from './stock-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair , IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
StockChart.Inject(DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export);

/**
 * Sample for Multiple series in stock chart
 */

    
    let stockChart: StockChart = new StockChart({
        chartArea: { border: { width: 0 } },
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true }},
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 },
            crosshairTooltip: { enable: true }
        },
        series: [
            {
                dataSource: aapl, xName: 'x', yName: 'high', type: 'Area', opacity: 0.5, name: 'google'
            }
        ],
        seriesType : [],
        indicatorType : [],
        title: 'AAPL Stock Price',
        crosshair: { enable: true, lineType:'Both'},
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
