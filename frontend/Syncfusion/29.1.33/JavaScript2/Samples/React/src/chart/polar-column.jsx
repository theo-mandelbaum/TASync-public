/**
 * Sample for Polar Series with drawType Column
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, PolarSeries, RadarSeries, Tooltip, Highlight } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    //{text: 'China', 	  x: 'CHN', 	  	y: 1246.3, y1: 1341, y2: 448.3},
    //{text: 'India', 		x: 'IND', 		y: 893.3, y1: 1237, y2: 41.95},
    { text: 'Japan', x: 'JPN', y: 137.9, y1: 127.6, y2: 108.8 },
    //{text: 'USA', 			x: 'USA', 			y: 345.2, y1: 313.9, y2: 287.4},
    { text: 'Indonesia', x: 'Indonesia', y: 85.0, y1: 246.9, y2: 45.5 },
    //{text: 'Brazil', 		x: 'IDN', 		y: 272.6, y1: 137.2, y2: 110.2 },
    { text: 'Russia', x: 'RUS', y: 237.1, y1: 143.5, y2: 41.2 },
    { text: 'Vietnam', x: 'VNM', y: 127.7, y1: 88.8, y2: 18.0 },
    { text: 'Pakistan', x: 'PAK', y: 126.1, y1: 179.2, y2: null },
    { text: 'Nigeria', x: 'NGA', y: 175.0, y1: 168.8, y2: 12.7 },
    { text: 'Germany', x: 'DEU', y: 113.6, y1: 81.9, y2: 46.0 },
    { text: 'Bangladesh', x: 'BGS', y: 116.0, y1: 154.7, y2: 34.6 },
    { text: 'Philippines', x: 'PHL', y: 109.5, y1: 96.7, y2: 16.6 },
    { text: 'Mexico', x: 'MEX', y: 102.7, y1: 120.8, y2: 19.8 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class PolarColumn extends SampleBase {
    chartInstance;
    loaded;
    change() {
        this.chartInstance.series[0].type = this.dropElement.value;
        this.chartInstance.series[1].type = this.dropElement.value;
        this.chartInstance.series[2].type = this.dropElement.value;
        this.chartInstance.refresh();
    }
    ;
    dropElement;
    droplist = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];
    render() {
        return (<div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} primaryXAxis={{ valueType: 'Category', labelPlacement: 'OnTicks', coefficient: Browser.isDevice ? 80 : 100, interval: 1 }} primaryYAxis={{ labelFormat: '{value}M' }} load={this.load.bind(this)} legendSettings={{ visible: true, enableHighlight: true }} title="Top 10 Mobile Markets by Number of Subscriptions" loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, header: "", format: '<b>${point.text}</b> <br> ${series.name} : <b>${point.y}</b>', enableHighlight: true }}>
                            <Inject services={[Legend, Category, PolarSeries, RadarSeries, Highlight, Tooltip]}/>
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='text' yName='y' name='Population' type='Polar' drawType='Column' border={{ color: 'white', width: 1 }} marker={{ dataLabel: { name: 'text' } }}/>
                                <SeriesDirective dataSource={data1} xName='text' yName='y1' name='Mobile Subscriptions' type='Polar' drawType='Column' border={{ color: 'white', width: 1 }} marker={{ dataLabel: { name: 'text' } }}/>
                                <SeriesDirective dataSource={data1} xName='text' yName='y2' name='3G/4G Subscriptions' type='Polar' drawType='Column' border={{ color: 'white', width: 1 }} marker={{ dataLabel: { name: 'text' } }}/>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody><tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Series Type:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width={120} id="selmode" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value='Polar'/>
                                        </div>
                                    </td>
                                </tr></tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample shows the top 10 mobile markets by the number of subscriptions in polar and radar charts using column series.</p>
                </div>
                <div id="description">
                    <p>In this example, you can see how to render and configure polar and radar charts with a column series. Switching between polar and radar series can be done using <b>Series Type</b> in the property panel.</p>
                    <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
                        <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the polar-radar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#column" aria-label="Navigate to the documentation for Polar Column in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        document.getElementById('charts').setAttribute('title', '');
    }
    ;
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    ;
}
