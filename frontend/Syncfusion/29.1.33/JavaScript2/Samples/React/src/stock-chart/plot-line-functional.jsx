/**
 * Sample for Stock Chart with Plot Line
 */
import * as React from "react";
import { useEffect } from "react";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, DateTime, StripLine, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { amzn } from './stock-data';
import { loadStockChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;
const PlotLine = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const load = (args) => {
        loadStockChartTheme(args);
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <StockChartComponent id='stockchartplotline' primaryXAxis={{ valueType: 'DateTime', majorGridLines: { color: 'transparent' } }} primaryYAxis={{ stripLines: [{ start: 150, sizeType: 'Pixel', size: 1, color: 'green', dashArray: '10,5' },
                { start: 190, sizeType: 'Pixel', size: 1, color: 'red', dashArray: '10,5' }], lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 } }} load={load.bind(this)} indicatorType={[]} seriesType={[]} trendlineType={['Linear', 'Exponential', 'Polynomial', 'Logarithmic', 'MovingAverage']} chartArea={{ border: { width: 0 } }} title='Plot line on Y axis'>
                    <Inject services={[DateTime, StripLine, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={amzn} xName='x' yName='close' type='Line'/>
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
            <div id="action-description">
                <p>This sample visualizes stock chart with plot line on y axis.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to add threshold lines in the stock chart. Period and range selector help us to navigate different of data. <code>LineSeries</code> is used to represent selected data value.
                </p>
                <p>
                    Stock Chart provides support to 6 types of <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/trend-lines" aria-label="Navigate to the documentation for Trendlines in React Stock Chart component">trendlines</a> namely <code>Linear</code>, <code>Exponential</code>, <code>Logarithmic</code>, <code>Polynomial</code>, <code>Power</code>, <code>Moving Average</code>. By using trendline dropdown button, the required trendline type can be added or removed.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method. To use the LineSeries, inject the <code>LineSeries</code> module using the <code>StockChart.Inject(LineSeries)</code> method.
                </p>
            </div>
        </div>);
};
export default PlotLine;
