/**
 * Sample for Stock Chart with Default
 */
import * as React from "react";
import { useEffect } from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, DateTimeCategory } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { defaultData } from './indicator-data';
import { updateSampleSection } from '../common/sample-base';
import { loadStockChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const load = (args) => {
        loadStockChartTheme(args);
    };
    const tooltipRender = (args) => {
        if (args.text.split('<br/>')[4]) {
            let target = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
            let value = (target / 100000000).toFixed(1) + 'B';
            args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <StockChartComponent id='stockchartdefault' primaryXAxis={{ valueType: 'DateTimeCategory', majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }} primaryYAxis={{ labelFormat: 'n0', lineStyle: { width: 0 }, rangePadding: 'None', majorTickLines: { height: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} tooltipRender={tooltipRender} crosshair={{ enable: true }} load={load.bind(this)} title='AAPL Stock Price'>
                    <Inject services={[DateTime, DateTimeCategory, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={defaultData} xName='x' type='Candle' animation={{ enable: true }}/>
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
            <div id="action-description">
                <p>This <a target="_blank" href="https://www.syncfusion.com/react-components/react-stock-chart" aria-label="Default React Stock Chart">React Stock Chart</a> example visualizes the AAPL stock price with candle chart. Tooltip and crosshair show the information about the data and period.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the stock chart. The candle type series chart shows financial data and trends at equal intervals. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/period-selector" aria-label="Navigate to the documentation for Period Selector in React Stock Chart component">Period Selector</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/range-selector" aria-label="Navigate to the documentation for Range Selector in React Stock Chart component">Range Selector</a> can be used to select a range with specified periods.
                </p>
                <p>
                    Stock Chart provides support to 10 types of <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/technical-indicators" aria-label="Navigate to the documentation for Technical Indicators in React Stock Chart component">Technical Indicators</a> namely <code>Accumulation Distribution</code>, <code>ATR</code>, <code>EMA</code>, <code>SMA</code>, <code>TMA</code>, <code>Momentum</code>, <code>MACD</code>, <code>RSI</code>, <code>Stochastic</code>, <code>Bollinger Band</code>. By using indicator dropdown box, add and remove the required indicator types.
                </p>
                <p>
                    <code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, 
                    inject the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method. To use the LineSeries, inject the <code>CandleSeries</code> module using the <code>StockChart.Inject(CandleSeries)</code> method.
                </p>
                <p>
                    More information about the stock charts can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/getting-started" aria-label="Navigate to the documentation for getting started with React Stock Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default Default;
