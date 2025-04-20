/**
 * Sample for Cylindrical Column series
 */
import * as React from 'react';
import { useEffect } from "react";
import { Chart3DComponent, ColumnSeries3D, Category3D, Tooltip3D, Chart3DSeriesDirective, Chart3DSeriesCollectionDirective, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { pointRenderEvent } from './theme-color';
import { load3DChartTheme } from './theme-color';
export let data = [{ x: 'Czechia', y: 1.11 }, { x: 'Spain', y: 1.66 }, { x: 'USA', y: 1.56 }, { x: 'Germany', y: 3.1 }, { x: 'Russia', y: 1.35 }, { x: 'Slovakia', y: 1 }, { x: 'South Korea', y: 3.16 }, { x: 'France', y: 0.92 }];
const CylindricalColumn = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const axisLabelRender = (args) => {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + 'M';
        }
    };
    const pointRender = (args) => {
        pointRenderEvent(args);
    };
    const load = (args) => {
        load3DChartTheme(args);
    };
    return (<div className='control-pane'>
            <div className='control-section'>
                <Chart3DComponent id='charts' style={{ textAlign: "center" }} title='Passenger Car Production in Selected Countries – 2021' primaryXAxis={{
            valueType: 'Category', interval: 1,
            labelPlacement: 'BetweenTicks',
            labelRotation: -45
        }} primaryYAxis={{
            maximum: 4,
            interval: 1
        }} tooltip={{
            enable: true, header: "${point.x}", format: 'Car Production : <b>${point.y}M'
        }} rotation={7} tilt={10} depth={100} height='400' wallColor='transparent' pointRender={pointRender} load={load.bind(this)} loaded={onChartLoad.bind(this)} axisLabelRender={axisLabelRender.bind(this)} width={Browser.isDevice ? '100%' : '75%'}>
                    <Inject services={[ColumnSeries3D, Category3D, Tooltip3D]}/>
                    <Chart3DSeriesCollectionDirective>
                        <Chart3DSeriesDirective dataSource={data} columnFacet='Cylinder' type='Column' xName='x' yName='y' columnWidth={0.9}>
                        </Chart3DSeriesDirective>
                    </Chart3DSeriesCollectionDirective>
                </Chart3DComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the passenger car production in selected countries for 2021, using a cylindrical column in 3D chart.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see the rendering and configuration of a 3D cylindrical column chart. The 3D cylindrical column chart is similar to a 3D column chart but features a distinct cylindrical shape.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    3D chart component features are segregated into individual feature-wise modules. To use  column series, we need to inject <code>ColumnSeries3D</code> module into <code>services</code>.
                </p>
            </div>
        </div>);
};
export default CylindricalColumn;
