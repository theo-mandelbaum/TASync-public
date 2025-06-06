/**
 * Sample for Range Area Series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, LineSeries, Tooltip, DateTime, SeriesDirective, Inject, Category, RangeAreaSeries } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { chartDataValues } from './financial-data';
import { loadChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const RangeArea = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args) => {
        loadChartTheme(args);
    };
    return (<div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} load={load.bind(this)} primaryXAxis={{ valueType: 'DateTime', labelFormat: 'dd MMM', majorGridLines: { width: 0 }, edgeLabelPlacement: (Browser.isDevice) ? 'Shift' : 'Hide' }} legendSettings={{ visible: false }} primaryYAxis={{ labelFormat: '{value}˚C', minimum: -10, maximum: 25, interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} title="Temperature Variation by Month" loaded={onChartLoad.bind(this)} tooltip={{ enable: true, shared: false, format: 'Temperature : <b>${point.low} - ${point.high}</b>', header: '<b>${point.x}</b>', showNearestTooltip: true }}>
                    <Inject services={[RangeAreaSeries, LineSeries, Category, DateTime, Tooltip]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartDataValues} enableTooltip={true} border={{ width: 2 }} xName="x" high="high" opacity={0.4} marker={{ visible: false, height: 7, width: 7, opacity: 1, dataLabel: { visible: false, position: 'Outer' } }} low="low" animation={{ enable: true }} type="RangeArea"></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p> This React Range Area Chart example visualizes minimum and maximum temperatures of different days with default range area series.</p>
            </div>
            <div id="description">
                <p> In this example, you can see how to render and configure the range area chart. This chart is used to display continuous data points as a set of lines varying between high and low values over time intervals and across different categories.</p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use range area series, we need to inject <code>RangeAreaSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about area type series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-area" aria-label="Navigate to the documentation for Range Area in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default RangeArea;
