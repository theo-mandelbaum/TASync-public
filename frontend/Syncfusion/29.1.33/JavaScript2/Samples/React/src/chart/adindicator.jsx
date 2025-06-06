/**
 * Sample for ADI Indicator
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject, CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, StripLineDirective, Crosshair, LineSeries, AccumulationDistributionIndicator, StripLine, IndicatorsDirective, IndicatorDirective, StripLinesDirective, Legend } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { chartValues } from './financial-data';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .charts {
        align :center
    }`;
/**
 * AccumulationDistribution sample
 */
export class AccumulationDistribution extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }} primaryYAxis={{ title: 'Price', labelFormat: '${value}', minimum: 50, maximum: 170, plotOffset: 25, interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} tooltip={{ enable: true, shared: true }} crosshair={{ enable: true, lineType: 'Vertical' }} axisLabelRender={this.axisLableRender.bind(this)} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL Stock Price 2012-2017' legendSettings={{ visible: false }} loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, Legend, StripLine, DateTime, Zoom, Logarithmic, Crosshair, LineSeries, AccumulationDistributionIndicator]}/>
                        <RowsDirective>
                            <RowDirective height={'40%'}/>
                            <RowDirective height={'60%'}/>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective rowIndex={0} name='secondary' opposedPosition={true} majorGridLines={{ width: 0 }} majorTickLines={{ width: 0 }} minimum={-7000000000} maximum={5000000000} interval={6000000000} title='Accumulation Distribution (in Billion)' lineStyle={{ width: 0 }}>
                                <StripLinesDirective>
                                    <StripLineDirective start={-7000000000} end={6000000000} text='' color='#6063ff' visible={true} opacity={0.1} zIndex={'Behind'}/>
                                </StripLinesDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartValues} width={2} xName='period' yName='y' low='low' high='high' close='close' volume='volume' open='open' name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' type='Candle' animation={{ enable: true }}/>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='AccumulationDistribution' field='Close' seriesName='Apple Inc' yAxisName='secondary' fill='#6063ff' period={3} animation={{ enable: true }}/>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample illustrates a chart with candle series and an accumulation distribution indicator. The trackball shows information about the stock rates and signal values each day.</p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure an accumulation distribution indicator. This uses volume and price to identify whether stock is accumulated or distributed. It also identifies divergences between the stock price and volume flow.</p>
                    <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Accumulation Distribution Indicator, we need to inject 
                        <code>AccumulationDistributionIndicator</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the Accumulation Distribution Indicator can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#accumulation-distribution" aria-label="Navigate to the documentation for Accumulation Distribution in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    ;
    axisLableRender(args) {
        if (args.axis.name === 'secondary') {
            let value = Number(args.text) / 1000000000;
            args.text = String(value) + 'bn';
        }
    }
}
