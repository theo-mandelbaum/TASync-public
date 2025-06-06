/**
 * Sample for local data
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip, Crosshair } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export function GetLocalData() {
    let series1 = [];
    let series2 = [];
    let point1;
    let point2;
    let value = 80;
    let value1 = 90;
    let i;
    for (i = 1; i < 500; i++) {
        if (Math.random() > .5) {
            value += Math.random();
            value1 += Math.random();
        }
        else {
            value -= Math.random();
            value1 -= Math.random();
        }
        point1 = { x: new Date(1960, (i + 1), i), y: Math.round(value) };
        point2 = { x: new Date(1960, (i + 1), i), y: Math.round(value1) };
        series1.push(point1);
        series2.push(point2);
    }
    return { 'series1': series1, 'series2': series2 };
}
export let data1 = GetLocalData().series1;
export let data2 = GetLocalData().series2;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class LocalData extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
                title: 'Years',
                skeleton: 'y',
                majorGridLines: { width: 0 },
                valueType: 'DateTime',
                edgeLabelPlacement: 'Shift'
            }} load={this.load.bind(this)} primaryYAxis={{
                title: 'Price',
                labelFormat: '${value}',
                rangePadding: 'None',
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 },
                minorTickLines: { width: 0 }
            }} crosshair={{
                enable: true,
                line: {
                    color: 'rgba(204,214,235,0.25)',
                    width: Browser.isDevice ? 50 : 20,
                },
                lineType: 'Vertical'
            }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} width={Browser.isDevice ? '100%' : '75%'} title='Stock Price Analysis' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, DateTime, Legend, Crosshair, Tooltip]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Product X' animation={{ enable: true }} type='Line'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' width={2} name='Product Y' animation={{ enable: true }} type='Line'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates  plotting of local data about stock price analysis of two products for a certain period.
            </p>
                </div>
                <div id="description">
                    <p>
                        The Charts control supports data binding. The <code>DataSource</code> property can be assigned either as list of objects or with instance of DataManager.
                    </p>
                    <p>In this demo, the array of JavaScript objects is assigned as the data source to the Chart.</p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p>
                        More information about the local data binding can be found in this  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#local-data" aria-label="Navigate to the documentation for Local Data in React Chart component">documentation section</a>.
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
