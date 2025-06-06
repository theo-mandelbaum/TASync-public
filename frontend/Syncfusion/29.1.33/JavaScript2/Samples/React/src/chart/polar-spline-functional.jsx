/**
 * Sample for Polar Series with drawType Spline
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, SplineSeries, Tooltip, PolarSeries, RadarSeries, Highlight } from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export function GetSplineData() {
    let cardData = [];
    let biDirData = [];
    let omniDirData = [];
    let point1;
    let point2;
    for (let x = -180; x < 180; x++) {
        point1 = { x: x, y: -12.6 * (1 - Math.cos(x * 3.14 / 180)) };
        cardData.push(point1);
        point2 = { x: x, y: -3 };
        omniDirData.push(point2);
    }
    for (let x = -180; x < -90; x++) {
        point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    for (let x = -90; x < 90; x++) {
        point1 = { x: x, y: -26 * (1 - Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    for (let x = 90; x < 180; x++) {
        point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }
    return { 'series1': cardData, 'series2': omniDirData, 'series3': biDirData };
}
export let data1 = GetSplineData().series1;
export let data2 = GetSplineData().series2;
export let data3 = GetSplineData().series3;
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PolarSpline = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [type, setType] = useState('Polar');
    let chartInstance = useRef(null);
    let dropElement = useRef(null);
    let loaded;
    const onChartLoad = (args) => {
        document.getElementById('charts').setAttribute('title', '');
    };
    const load = (args) => {
        loadChartTheme(args);
    };
    const change = () => {
        chartInstance.current.series[0].type = dropElement.current.value;
        chartInstance.current.series[1].type = dropElement.current.value;
        chartInstance.current.series[2].type = dropElement.current.value;
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.series[2].animation.enable = false;
        chartInstance.current.refresh();
    };
    let droplist = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ minimum: -180, maximum: 180, interval: 30, labelFormat: '{value}°', coefficient: Browser.isDevice ? 80 : 100 }} legendSettings={{ enableHighlight: true }} load={load.bind(this)} title='Microphone Types Polar Patterns' loaded={onChartLoad.bind(this)} tooltip={{ enable: true, enableHighlight: true }}>
                        <Inject services={[SplineSeries, Legend, Tooltip, Category, PolarSeries, RadarSeries, Highlight]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Cardioid (unidirectional)' type={type} drawType='Spline' dashArray='5 5 2' width={2} isClosed={false}/>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Omnidirectional' type={type} drawType='Spline' dashArray='2' width={2} isClosed={false}/>
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='Bidirectional' type={type} drawType='Spline' width={2} isClosed={false}/>
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
                                        <DropDownListComponent width={120} id="selmode" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value={type}/>
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates polar series with spline type for the microphone type data. The switching between polar and radar series can be done by using <code>Series Type</code> in property panel.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the spline type charts. Spline chart connects each point in series through a curved line.
                    You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the spline. <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject <code>SplineSeries</code>, <code>PolarSeries</code> and <code>RadarSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the polar-radar series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#spline" aria-label="Navigate to the documentation for Polar Spline in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default PolarSpline;
