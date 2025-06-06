/**
 * Sample for error bar
 */
import * as React from "react";
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ErrorBar, ScatterSeries, Tooltip, Category, ColumnSeries, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export let data1 = [
    { x: 'Printer', y: 750, error: 50 }, { x: 'Desktop', y: 500, error: 70 }, { x: 'Charger', y: 550, error: 60 },
    { x: 'Mobile', y: 575, error: 80 }, { x: 'Keyboard', y: 400, error: 20 },
    { x: 'Power Bank', y: 450, error: 90 }, { x: 'Laptop', y: 650, error: 40 }, { x: 'Battery', y: 525, error: 84 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const ErrorBarChart = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const pointRender = (args) => {
        let selectedTheme = loadChartTheme();
        if (selectedTheme === 'bootstrap5' || selectedTheme === 'fluent') {
            args.fill = '#81ccbb';
        }
    };
    const onChartLoad = (args) => {
        document.getElementById('charts').setAttribute('title', '');
    };
    const load = (args) => {
        let selectedTheme = loadChartTheme(args);
        if (selectedTheme === 'Bootstrap5' || selectedTheme === 'Fluent') {
            args.chart.highlightColor = '#c7e9b6';
        }
    };
    const tooltipRender = (args) => {
        args.text = '<b>' + args.data.pointX + ' Count' + ': ' + args.data.pointY + '</b> (error range: ' + (args.data.pointY - args.series.visiblePoints[args.data.pointIndex].verticalError / 2) + '-' + (args.data.pointY + args.series.visiblePoints[args.data.pointIndex].verticalError / 2) + ')';
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section ' style={{ textAlign: "center" }}>
                <ChartComponent id='charts' primaryXAxis={{ valueType: 'Category', interval: 1, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, majorGridLines: { width: 0 }, labelRotation: Browser.isDevice ? -45 : 0, labelIntersectAction: Browser.isDevice ? "None" : "Rotate45" }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ minimum: 0, maximum: 1250, interval: 250, lineStyle: { width: 0 }, title: 'Quantity', majorTickLines: { width: 0 } }} load={load.bind(this)} tooltipRender={tooltipRender.bind(this)} highlightColor='' width={Browser.isDevice ? '100%' : '75%'} pointRender={pointRender.bind(this)} title="Quantity vs Items" loaded={onChartLoad.bind(this)} tooltip={{ enable: true, enableMarker: false }}>
                    <Inject services={[ScatterSeries, Category, ColumnSeries, ErrorBar, Tooltip]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName='x' yName='y' type='Column' marker={{ height: 10, width: 10 }} errorBar={{ visible: true, verticalError: 'error' }} width={2}/>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the errors in the quantity of different items with an error bar chart.</p>
            </div>                
            <div id="description">
                <p>In this example, you can see how to render and configure the error bar chart. An error bar chart is used to indicate the error or uncertainty in the reported measurement.</p>
                <p>Chart supports the following error bar types.</p>
                <ul>
                    <li><code>Fixed</code> - Renders a fixed type error bar.</li>
                    <li><code>Percentage</code> - Renders a percentage type error bar.</li>
                    <li><code>StandardDeviation</code> - Renders a standard deviation type error bar.</li>
                    <li><code>StandardError</code> - Renders a standard error type error bar.</li>
                    <li><code>Custom</code> - Renders a custom type error bar.</li>
                </ul>
                <p>
                    The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/tooltip/" aria-label="Navigate to the Tooltip property reference for React Chart">tooltip</a> is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    The Charts component’s features are segregated into individual feature modules. To use error bar, we need to inject <code>ErrorBar</code> into the <code>@services</code> section.
                </p>
                <p>
                    More information on the error bar can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/other-types/#error-bar-chart" aria-label="Navigate to the documentation for Error Bar in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default ErrorBarChart;
