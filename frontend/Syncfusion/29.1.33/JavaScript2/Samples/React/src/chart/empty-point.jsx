/**
 * Sample for Empty Point
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, SplineSeries, Category, Legend, Tooltip, Inject, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
export let data1 = [
    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
export class EmptyPoint extends SampleBase {
    chartInstance;
    dropElement;
    modeElement;
    isVisible = false;
    emptyPointMode = 'Gap';
    chartType = 'Column';
    droplist = [
        { value: 'Column' },
        { value: 'SplineArea' },
        { value: 'Spline' },
    ];
    modelist = [
        { value: 'Gap' },
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];
    change() {
        this.chartType = this.dropElement.value;
        if (this.dropElement.value === 'Spline') {
            this.isVisible = true;
            this.chartInstance.series[0].marker.visible = true;
        }
        else {
            this.isVisible = false;
            this.chartInstance.series[0].marker.visible = false;
        }
        this.chartInstance.series[0].type = this.chartType;
        this.chartInstance.refresh();
    }
    ;
    mode() {
        this.emptyPointMode = this.modeElement.value;
        this.chartInstance.series[0].emptyPointSettings.mode = this.emptyPointMode;
        this.chartInstance.refresh();
    }
    ;
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} primaryXAxis={{
                valueType: 'Category', interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
                labelRotation: Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 }, title: 'Product',
                minorTickLines: { width: 0 }, majorGridLines: { width: 0 }
            }} chartArea={{ border: { width: 0 } }} primaryYAxis={{
                title: 'Profit', minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%',
                majorTickLines: { width: 0 }, lineStyle: { width: 0 }
            }} load={this.load.bind(this)} legendSettings={{ visible: false }} title="Annual Product-Wise Profit Analysis" loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, header: '' }}>
                            <Inject services={[ColumnSeries, Category, Legend, Tooltip, SplineSeries, SplineAreaSeries]}/>
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Profit' type={this.chartType} marker={{ visible: this.isVisible, height: 10, width: 10 }} emptyPointSettings={{ fill: '#e6e6e6', mode: this.emptyPointMode }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td style={{ width: '60%' }}>
                                            <div>Series Type: </div>
                                        </td>
                                        <td style={{ width: '40%' }}>
                                            <div>
                                                <DropDownListComponent width="120px" id="selchange" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value={this.chartType}/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td style={{ width: '60%' }}>
                                            <div>Empty Point Mode: </div>
                                        </td>
                                        <td style={{ width: '40%' }}>
                                            <div>
                                                <DropDownListComponent width="120px" id="selmode" change={this.mode.bind(this)} ref={d => this.modeElement = d} dataSource={this.modelist} fields={{ text: 'value', value: 'value' }} value={this.emptyPointMode}/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample illustrates the annual profit by product analysis of an organization with empty point functionality.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure empty points for a chart. Users can customize the empty points using <code>ChartEmptyPointSettings</code> in series. Default empty point Mode is <b>Gap</b>.
                    </p>
                    <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <p>
                        More information on the empty points can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#empty-points" aria-label="Navigate to the documentation for Empty points in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        document.getElementById('charts').setAttribute('title', '');
    }
    ;
    load(args) {
        loadChartTheme(args);
    }
    ;
}
