/**
 * Sample for Stochastic Indicator
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, RowDirective, RowsDirective, SeriesDirective, Inject, StripLine, DateTime, Logarithmic, Tooltip, CandleSeries, Crosshair, Zoom, StripLinesDirective, StripLineDirective, LineSeries, StochasticIndicator, IndicatorsDirective, IndicatorDirective, Category } from '@syncfusion/ej2-react-charts';
import { chartValues } from './financial-data';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class Stochastic extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }} primaryYAxis={{ title: 'Price (in Million)', labelFormat: '${value}M', minimum: 50, maximum: 170, plotOffset: 25, interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} tooltip={{ enable: true, shared: true }} crosshair={{ enable: true, lineType: 'Vertical' }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false }} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL Stock Price 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries, StochasticIndicator, StripLine]}/>
                        <RowsDirective>
                            <RowDirective height={'40%'}/>
                            <RowDirective height={'60%'}/>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective rowIndex={0} name='secondary' opposedPosition={true} majorGridLines={{ width: 0 }} majorTickLines={{ width: 0 }} minimum={0} maximum={120} interval={60} title='Stochastic' lineStyle={{ width: 0 }}>
                                <StripLinesDirective>
                                    <StripLineDirective start={0} end={120} text='' color='black' visible={true} opacity={0.03} zIndex='Behind'/>
                                </StripLinesDirective>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartValues} width={2} xName='period' yName='y' low='low' high='high' close='close' volume='volume' open='open' name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' type='Candle' animation={{ enable: true }}/>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='Stochastic' field='Close' seriesName='Apple Inc' yAxisName='secondary' fill='#6063ff' overBought={70} overSold={30} showZones={true} periodLine={{ color: '#f2ec2f' }} period={3} animation={{ enable: false }} upperLine={{ color: '#ffb735' }} lowerLine={{ color: '#f2ec2f' }}/>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample illustrates a chart with candle series and a stochastic oscillator. The trackball shows information about each day’s stock and indicator values.</p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure a stochastic oscillator that is a momentum indicator. It shows the location of the close relative to the high-low range over a set number of periods.</p>
                    <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Stochastic Indicator, we need to inject <code>StochasticIndicator</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the Stochastic Indicator can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#stochastic" aria-label="Navigate to the documentation for Stochastic in technical indicators of React Chart component">documentation section</a>.
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
        loadChartTheme(args);
    }
    ;
}
