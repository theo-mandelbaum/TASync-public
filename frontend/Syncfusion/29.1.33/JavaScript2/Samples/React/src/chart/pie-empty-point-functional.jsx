/**
 * Sample for empty for Pie chart
 */
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, AccumulationTooltip, PieSeries } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { loadAccumulationChartTheme } from './theme-color';
export let data1 = [
    { x: 'Rice', y: 80, }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const PieEmptyPoint = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [emptyPointMode, setEmptyPointMode] = useState('Drop');
    let pie = useRef(null);
    let modeElement = useRef(null);
    const mode = () => {
        pie.current.series[0].emptyPointSettings.mode = modeElement.current.value;
        pie.current.series[0].animation.enable = false;
        pie.current.refresh();
    };
    let droplist = [
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];
    const onChartLoad = (args) => {
        let chart = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    const load = (args) => {
        let selectedTheme = loadAccumulationChartTheme(args);
        if (selectedTheme === 'Bootstrap5-Dark') {
            args.chart.series[0].emptyPointSettings.fill = '#FF7F7F';
        }
    };
    const textRender = (args) => {
        args.text = args.point.x + ": $" + args.point.y + "K";
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <AccumulationChartComponent id='pie-chart' ref={pie} title='Annual Product-Wise Profit Analysis' load={load.bind(this)} textRender={textRender.bind(this)} legendSettings={{ visible: false }} tooltip={{ enable: true, header: "", format: '<b>${point.x}</b><br> Profit: <b>$${point.y}K</b>', enableHighlight: true }} enableBorderOnMouseMove={false} loaded={onChartLoad.bind(this)}>
                        <Inject services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]}/>
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' name='Profit' dataLabel={{ visible: true, position: 'Inside', enableRotation: true, font: { fontWeight: '600' } }} emptyPointSettings={{ fill: '#e6e6e6', mode: emptyPointMode }}/>
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Empty Point Mode: </div></td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="selmode" change={mode.bind(this)} ref={modeElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value={emptyPointMode}/>
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates the annual product-wise profit analysis of an organization with empty point functionality in the pie series.  The Mode of empty point can be changed by using <code>Empty Point Mode</code> in property panel.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the pie series with empty points. The empty point in the chart can be handled using the <code>EmptyPointSettings</code> property.
                </p>
                <p>Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.</p>
                <p>
                    More information on the empty points can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/empty-points/" aria-label="Navigate to the documentation for Empty Points in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default PieEmptyPoint;
