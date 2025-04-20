/**
 * Sample for SMA indicator
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, DateTime, Logarithmic, Tooltip, CandleSeries, DataLabel, Crosshair, Zoom, ILoadedEventArgs, LineSeries, SmaIndicator, IndicatorsDirective, IndicatorDirective, ChartTheme } from '@syncfusion/ej2-react-charts';
import { chartValues } from './financial-data';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const SMA = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' load={load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }} primaryYAxis={{ title: 'Price (in Million)', labelFormat: '${value}M', minimum: 50, maximum: 170, interval: 30, majorGridLines: { width: 1 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} tooltip={{ enable: true, shared: true }} chartArea={{ border: { width: 0 } }} crosshair={{ enable: true, lineType: 'Vertical' }} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL Stock Price 2012-2017' legendSettings={{ visible:false }} loaded={onChartLoad.bind(this)}>
                    <Inject services={[CandleSeries, SmaIndicator, Tooltip, DateTime,Legend, Logarithmic, DataLabel, Crosshair, Zoom, LineSeries]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartValues} xName='period' yName='silver' name='Apple Inc' low='low' open='open' close='close' high='high' volume='volume' type='Candle' bearFillColor= '#2ecd71' bullFillColor= '#e74c3d' animation={{ enable: false }} />
                    </SeriesCollectionDirective>
                    <IndicatorsDirective>
                        <IndicatorDirective type='Sma' fill='#6063ff' seriesName='Apple Inc' period={14} />
                    </IndicatorsDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample illustrates a chart with candle series and a simple moving average indicator. The trackball shows information about each day’s stock and signal value.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure a simple moving average indicator. A SMA is used to calculate the average of a selected range of prices by the number of periods in that range.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use SMA Indicator, we need to inject <code>SmaIndicator</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the SMA Indicator can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#simple-moving-average-sma" aria-label="Navigate to the documentation for Simple Moving Average in technical indicators of React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default SMA;
