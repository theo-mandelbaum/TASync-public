/**
 * Sample for Waterfall series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, DateTime, Logarithmic, Tooltip, WaterfallSeries, DataLabel, Category, Crosshair, Zoom, ILoadedEventArgs, ChartTheme, ITextRenderEventArgs } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
export let data: object[] = [
    { x: 'Income', y: 971  }, { x: 'Sales', y: -101 },
    { x: 'Development', y: -268 },
    { x: 'Revenue', y: 403  }, { x: 'Balance' },
    { x: 'Expense', y: -136 }, { x: 'Tax', y:  -365 },
    { x: 'Net Profit' }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #control-charts {
        padding: 0px !important;
    }

    #charts_Series_0_Connector_ {
        stroke-dasharray: 1px 2px;
        stroke-linejoin: round; stroke-linecap: round;
        -webkit-animation: dash 1s linear infinite;
        animation: dash 1s linear infinite;
    }
    @-webkit-keyframes dash {
        100% {
            stroke-dashoffset: -3px;
        }
    }
    @keyframes dash {
        100% {
            stroke-dashoffset: -3px;
        }
    }`;
const Waterfall = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const textRender = (args:ITextRenderEventArgs): void =>{
          args.series.marker.dataLabel.font.size = Browser.isDevice ?'8px':'12px'
    }
    const cornerRadius = { topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3 };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' load={load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', labelRotation: Browser.isDevice ? -90 : 0, labelIntersectAction : Browser.isDevice ? 'None' : 'Rotate45', majorTickLines: {width : 0}, minorTickLines: {width: 0}, majorGridLines: { width: 0 } ,interval: 1}} primaryYAxis={{ lineStyle: {width: 0}, minimum: 0, maximum: 1250, interval: 250, majorGridLines: { width: 1 }, minorTickLines: {width: 0}, title: 'USD', labelFormat: "{value}K", majorTickLines: { width: 0 } }} tooltip={{ enable: true, format: '<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>', header: " " }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false }} title='Company Revenue and Profit' textRender={textRender} loaded={onChartLoad.bind(this)}>
                    <Inject services={[WaterfallSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} border={{color:'black' , width: 0.2}} xName='x' yName='y' type='Waterfall' intermediateSumIndexes={[4]} sumIndexes={[7]} marker={{ dataLabel: { visible: true,font:{color:'#ffffff'}}, }} connector={{ color: '#5F6A6A', width: 0.8 , dashArray: '1,2' }} negativeFillColor='#e56590' columnWidth={0.5} cornerRadius={cornerRadius}/>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample visualizes the revenue and profits of a company using the default waterfall series chart. The tooltip provides details on the profits made by each department.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure the waterfall chart. The waterfall chart explains the gradual change in the quantitative value of an entity that is subject to changes by increments or decrements.</p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Waterfall series, we need to inject <code>WaterfallSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the Waterfall series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/waterfallt" aria-label="Navigate to the documentation for Waterfall in React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default Waterfall;
