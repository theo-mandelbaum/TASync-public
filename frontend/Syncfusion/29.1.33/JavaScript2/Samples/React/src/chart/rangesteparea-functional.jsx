/**
 * Sample for Range Area Series
 */
import * as React from "react";
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, Highlight, DateTime, SeriesDirective, Inject, Tooltip, RangeStepAreaSeries } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { chartDataValues } from './financial-data';
import { loadChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const RangeStepArea = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args) => {
        loadChartTheme(args);
        switch (args.chart.theme) {
            case 'Bootstrap5':
                {
                    args.chart.series[0].fill = '#BDD9F5';
                    args.chart.series[0].border.color = '#539DE3';
                }
                break;
            case 'Fluent':
                {
                    args.chart.series[0].fill = '#C3A6DB';
                    args.chart.series[0].border.color = '#9E71C2';
                }
                break;
        }
    };
    return (<div className='control-pane'>
            <style> {SAMPLE_CSS} </style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} load={load.bind(this)} primaryXAxis={{ valueType: 'DateTime', labelFormat: 'dd MMM', edgeLabelPlacement: (Browser.isDevice) ? 'Shift' : 'Hide', majorGridLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}˚C', lineStyle: { width: 0 }, minimum: -10, maximum: 25, interval: 5, majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, format: 'Temperature : <b>${point.low} - ${point.high}</b>', header: '<b>${point.x}</b>', shared: false, showNearestTooltip: true }} width={Browser.isDevice ? '100%' : '75%'} title='Temperature Variation by Month' loaded={onChartLoad.bind(this)}>
                    <Inject services={[RangeStepAreaSeries, DateTime, Tooltip, Highlight]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartDataValues} border={{ width: 2 }} xName='x' high='high' opacity={0.5} marker={{ visible: false }} low='low' animation={{ enable: true }} type='RangeStepArea'/>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This React range step area chart example illustrates the minimum and maximum temperatures for different days using the default range step area series.</p>
            </div>
            <div id="description">
                <p> In this example, you can see how to render and configure a range step area type chart. You can use <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/border/" aria-label="Navigate to the Border property reference for React Chart Series">border</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/seriesModel/#fill" aria-label="Navigate to the Fill property reference for React Chart Series">fill</a> properties to customize the range step area. Both <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/marker/" aria-label="Navigate to the documentation for Data markers in React Chart component">markers</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/dataLabel/" aria-label="Navigate to the documentation for DataLabel in React Chart component">dataLabels</a> are used to represent data points and their values.</p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    The Charts component’s features are segregated into individual feature modules by feature. To use range step area series, we need to inject the <code>RangeStepAreaSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about the area type series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-step-area" aria-label="Navigate to the documentation for Range Step Area in React Charts component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default RangeStepArea;
