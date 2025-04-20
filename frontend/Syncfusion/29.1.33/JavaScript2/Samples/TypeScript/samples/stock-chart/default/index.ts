import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { StockChart } from '@syncfusion/ej2-charts';
import { defaultData } from './indicator-data';
import { DateTime, DateTimeCategory, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme }
from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
StockChart.Inject(DateTime, DateTimeCategory, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export);

/**
 * Sample for Area Series with Empty Point
 */

    
    let stockChart: StockChart = new StockChart({
        chartArea: { border: { width: 0 } },
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 }, crosshairTooltip: { enable: true }
        },
        primaryXAxis: { valueType:'DateTimeCategory', edgeLabelPlacement: 'Shift', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true }},
        series: [
            {
                dataSource: defaultData,
                type: 'Candle',
                xName:'x',
                yName:'high',
                high:'high',
                low:'low'
            },
        ],
        tooltipRender : (args: ITooltipRenderEventArgs) => {
            if (args.text.split('<br/>')[4]) {
                let target : number = parseFloat(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
                let value : string = (target / 100000000).toFixed(1) + 'B';
                args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
            }
        },
        tooltip: {
            enable: true
        },
        crosshair: {
            enable: true, lineType:'Both'
        },
        title: 'AAPL Stock Price',
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
