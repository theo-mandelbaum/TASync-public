/**
 * Sample for smart axis labels
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, LineSeries, ScatterSeries, SplineSeries, Tooltip, Legend, Inject } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
export let data1 = [{ x: -6, y: 2 }, { x: -3, y: -4 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 }];
export let data2 = [{ x: -6, y: 2 }, { x: -5, y: 0 }, { x: -4.511, y: -0.977 }, { x: -3, y: -4 }, { x: -1.348, y: -1.247 },
    { x: -0.6, y: 0 }, { x: 0, y: 1 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 }];
export let data3 = [{ x: -6, y: 2 }, { x: -5.291, y: 0 }, { x: -5, y: -0.774 }, { x: -3, y: -4 }, { x: -0.6, y: -0.965 },
    { x: -0.175, y: 0 }, { x: 0, y: 0.404 }, { x: 1.5, y: 3.5 }, { x: 3.863, y: 5.163 }, { x: 6, y: 4.5 }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class AxisCrossing extends SampleBase {
    chartInstance;
    dropElement;
    checkboxElement;
    numericValue;
    isChecked = true;
    droplist = [
        { value: 'X' },
        { value: 'Y' },
    ];
    change() {
        if (this.dropElement.value === 'X') {
            this.checkboxElement.checked = this.chartInstance.primaryXAxis.placeNextToAxisLine;
            this.numericValue.value = +this.chartInstance.primaryXAxis.crossesAt;
        }
        else {
            this.checkboxElement.checked = this.chartInstance.primaryYAxis.placeNextToAxisLine;
            this.numericValue.value = +this.chartInstance.primaryYAxis.crossesAt;
        }
        this.chartInstance.dataBind();
    }
    ;
    crosshingValue() {
        if (this.dropElement.index === 0) {
            this.chartInstance.primaryXAxis.crossesAt = this.numericValue.value;
        }
        else {
            this.chartInstance.primaryYAxis.crossesAt = this.numericValue.value;
        }
        this.chartInstance.dataBind();
    }
    ;
    handleCheckboxChange = (e) => {
        if (this.dropElement.index === 0) {
            this.chartInstance.primaryXAxis.placeNextToAxisLine = this.checkboxElement.checked;
        }
        else {
            this.chartInstance.primaryYAxis.placeNextToAxisLine = this.checkboxElement.checked;
        }
        this.chartInstance.dataBind();
    };
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }} primaryXAxis={{
                minimum: -8, maximum: 8, interval: 2,
                valueType: 'Double',
                lineStyle: {
                    width: 2
                },
                minorTickLines: { width: 0 },
                majorTickLines: { width: 0 },
                crossesAt: 0,
                minorTicksPerInterval: 3
            }} chartArea={{ border: { width: 0 } }} primaryYAxis={{
                minimum: -8, maximum: 8, interval: 2,
                lineStyle: {
                    width: 2
                },
                majorTickLines: { width: 0 },
                minorTickLines: { width: 0 },
                crossesAt: 0,
                minorTicksPerInterval: 3,
            }} load={this.load.bind(this)} title="Spline Interpolation" tooltip={{ enable: true, enableHighlight: true }} loaded={this.onChartLoad.bind(this)}>
                            <Inject services={[LineSeries, ScatterSeries, SplineSeries, Tooltip, Legend]}/>
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name="Linear Interpolation" type='Line' width={2} enableTooltip={false} fill='Blue'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name="Cubic Spline Interpolation" type='Spline' width={2} enableTooltip={false} fill='Green'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name="Data Points" type='Scatter' width={2} marker={{ visible: false, width: 12, height: 12 }} fill='red'>
                                </SeriesDirective>                                
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Axis: </div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent index={0} width="120px" id="selmode" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="X"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div id="crossValue">Crosses Value:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <NumericTextBoxComponent value={0} min={-8} max={8} width={120} step={2} change={this.crosshingValue.bind(this)} style={{ marginLeft: '-5px' }} ref={d => this.numericValue = d} aria-labelledby="Text"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div id="axis">Placing Label Near to Axis Line:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <input type="checkbox" id="axisElements" onChange={(e) => this.handleCheckboxChange(e)} style={{ marginLeft: '-5px' }} defaultChecked={true} ref={d => this.checkboxElement = d} aria-labelledby="Checkbox checked"/>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates an interpolation of data points between linear and cubic by using spline and line series.
    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the axis crossing behavior in chart.
                Axis can be positioned anywhere in the chart area by using the <code>crossesAt</code> property of axis. This property specifies where the horizontal axis should intersect or cross the vertical axis and vice-versa.
            </p>
                    <p>
                        Default value of crossesAt property is null. So, you can use <code>placeNextToAxisLine</code> property to place the axis labels and ticks next to axis line.
                When there are multiple axes, you can choose an axis to cross by using <code>crossesInAxis</code> property.
                If the axis name is not valid, primaryXAxis or primaryYAxis will be used for crossing, by default.
            </p>
                    <p>
                        More information on the smart axis labels can be found in this &nbsp;
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/axis-customization/#axis-crossing" aria-label="Navigate to the documentation for Axis Crossing in React Chart component">documentation section</a>.
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
