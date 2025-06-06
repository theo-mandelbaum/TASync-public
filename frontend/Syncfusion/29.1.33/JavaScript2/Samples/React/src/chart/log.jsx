/**
 * Samples for Logarithmic Axis
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Logarithmic, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let data = [
    { x: new Date(1995, 0, 1), y: 80 },
    { x: new Date(1996, 0, 1), y: 200 },
    { x: new Date(1997, 0, 1), y: 400 },
    { x: new Date(1998, 0, 1), y: 600 },
    { x: new Date(1999, 0, 1), y: 700 },
    { x: new Date(2000, 0, 1), y: 1400 },
    { x: new Date(2001, 0, 1), y: 2000 },
    { x: new Date(2002, 0, 1), y: 4000 },
    { x: new Date(2003, 0, 1), y: 6000 },
    { x: new Date(2004, 0, 1), y: 8000 },
    { x: new Date(2005, 0, 1), y: 11000 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class LogAxis extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ labelFormat: 'y', valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }} load={this.load.bind(this)} primaryYAxis={{ valueType: 'Logarithmic', edgeLabelPlacement: 'Shift', minorTicksPerInterval: 5, majorGridLines: { width: 1.5 }, minorTickLines: { width: 0, height: 4 }, minimum: 0, maximum: 100000, interval: 1, labelFormat: '${value}', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} legendSettings={{ visible: false }} width={Browser.isDevice ? '100%' : '75%'} title='Product X Growth [1995-2005]' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, header: '', showNearestTooltip: true, enableHighlight: true }} chartArea={{ border: { width: 0 } }}>
                        <Inject services={[LineSeries, DateTime, Logarithmic, Legend, Tooltip]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' name='Product X' yName='y' type='Line' width={2} marker={{ visible: true, height: 7, width: 7, isFilled: true }}/>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample shows a logarithmic axis in a chart with data about the sales of a product between 1995 and 2005.</p>
                </div>
                <div id="description">
                    <p>
                        Logarithmic axis uses logarithmic scale and it is very useful in visualizing when the data has values with both lower order of magnitude (eg: 10^-6) and higher order of magnitude (eg: 10^6).
                        To render Logarithmic axis, set <code>valueType</code> in axis to <b>Logarithmic</b>.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Logarithmic axis, we need to inject
                        <code>Logarithmic</code> module using <code>servives</code>.
                    </p>
                    <p>
                        More information on the Logarithmic axis can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/logarithmic-axis/" aria-label="Navigate to the documentation for Logarithmic axis in React Chart component">documentation section</a>.
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
}
