import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, DateTime, Logarithmic, Tooltip, WaterfallSeries, DataLabel, Category, Crosshair, Zoom } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data = [
    { x: 'JAN', y: 55 },
    { x: 'MAR', y: 42 },
    { x: 'JUNE', y: -12 },
    { x: 'AUG', y: 40 },
    { x: 'OCT', y: -26 },
    { x: 'DEC', y: 45 },
    { x: '2023' }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
`;
export class HorizontalWaterfall extends SampleBase {
    onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        if (chart) {
            chart.setAttribute('title', '');
        }
    };
    load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    legendRender = (args) => {
        if (args.text === 'JAN') {
            args.text = 'Increase';
        }
        else if (args.text === 'OCT') {
            args.text = 'Decrease';
            args.fill = '#e56590';
        }
        else if (args.text === '2023') {
            args.text = 'Total';
            args.fill = '#4E81BC';
        }
        else {
            args.cancel = true;
        }
    };
    render() {
        return (<div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load} style={{ textAlign: "center" }} primaryXAxis={{
                valueType: 'Category',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 1 },
                majorTickLines: { width: 0 },
                isInversed: true
            }} primaryYAxis={{
                minimum: 0, maximum: 150, interval: 25,
                labelFormat: '{value}K',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 0 },
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 }
            }} tooltip={{
                enable: true,
                format: '<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>',
                header: " "
            }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ mode: 'Point', toggleVisibility: false }} title='Revenue Variation' loaded={this.onChartLoad} legendRender={this.legendRender} isTransposed={true}>
                        <Inject services={[WaterfallSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend, DataLabel]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} border={{ color: 'black', width: 0.2 }} xName='x' yName='y' type='Waterfall' name="Increases" marker={{ dataLabel: { visible: true, position: 'Middle' } }} columnWidth={0.5} connector={{ color: '#5F6A6A', width: 0.8, dashArray: '1,2' }} cornerRadius={{ topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3 }} negativeFillColor='#e56590' sumIndexes={[6]}/>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes a company's revenue and profits using the waterfall series chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a horizontal waterfall chart. The waterfall chart illustrates the gradual change in an entity's quantitative value due to increments or decrements.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example, to see them in action, hover over a point or tap on a point on touch-enabled devices.
                    </p>
                    <p style={{ fontWeight: 500 }}><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Waterfall series, we need to inject <code>WaterfallSeries</code> module using <code>chart.Inject(WaterfallSeries)</code> method.
                    </p>
                    <p>
                        More information on the waterfall series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/documentation/chart/Chart-types/waterfall" aria-label="Navigate to the documentation for Waterfall Chart in TypeScript Chart control">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
}
