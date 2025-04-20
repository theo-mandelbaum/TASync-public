/**
 * Map Pie sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { ColorMappingSettingsModel } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Marker, Legend, MarkersDirective, MarkerDirective, IResizeEventArgs } from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { AccumulationChart, PieSeries, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import * as continentMap from './map-data/continent.json';
AccumulationChart.Inject(PieSeries, AccumulationTooltip);
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const PieMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let chartCollection: AccumulationChart[] = [];
    let colorMapData: ColorMappingSettingsModel[] = [
        { from: 0, to: 4, color: '#634D6F', label: '0-14 years' },
        { from: 5, to: 14, color: '#B34D6D', label: '15-24 years' },
        { from: 15, to: 59, color: '#557C5C', label: '25-54 years' },
        { from: 60, to: 100, color: '#5E55E2', label: '55-64 years' },
    ];
    const onMapsLoad = (): void => {
        let chart: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'China',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 17.2 },
                        { 'x':'15-24 years', y: 15.4 },
                        { 'x': '25-54 years', y: 46.9 },
                        { 'x': '55-64 years', y: 11.3 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart.appendTo('#marker1');
        chartCollection.push(chart);
        let chart1: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Russia',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 16 },
                        { 'x': '15-24 years', y: 11.5 },
                        { 'x': '25-54 years', y: 45.9 },
                        { 'x': '55-64 years', y: 13.5 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart1.appendTo('#marker2');
        chartCollection.push(chart1);
        let chart2: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Canada',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 15.5 },
                        { 'x': '15-24 years', y: 12.9 },
                        { 'x': '25-54 years', y: 41.4 },
                        { 'x': '55-64 years', y: 13.3 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart2.appendTo('#marker3');
        chartCollection.push(chart2);
        let chart3: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'USA',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 20 },
                        { 'x': '15-24 years', y: 13.7 },
                        { 'x': '25-54 years', y: 40.2 },
                        { 'x': '55-64 years', y: 12.3 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart3.appendTo('#marker4');
        chartCollection.push(chart3);
        let chart4: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Brazil',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 24.2 },
                        { 'x': '15-24 years', y: 16.7 },
                        { 'x': '25-54 years', y: 43.6 },
                        { 'x': '55-64 years', y: 8.2 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart4.appendTo('#marker5');
        chartCollection.push(chart4);
        let chart5: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            width: '70',
            height: '70',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: 'Australia',
                    palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
                    dataSource: [
                        { 'x': '0-14 years', y: 18.1 },
                        { 'x': '15-24 years', y: 13.4 },
                        { 'x': '25-54 years', y: 42 },
                        { 'x': '55-64 years', y: 11.8 },
                    ],
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart5.appendTo('#marker6');
        chartCollection.push(chart5);
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5') as MapsTheme;
        // custom code end
    };
    const resize = (): void => {
        for (let i: number = 0; i < chartCollection.length; i++) {
            chartCollection[i].destroy();
        }
    }
    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-12'>
                    <MapsComponent id="maps" resize={resize} loaded={onMapsLoad} load={load} titleSettings={{ text: 'Top 6 largest countries age group details', textStyle: { size: '16px' } }} zoomSettings={{ enable: false }} legendSettings={{ visible: true, position: 'Bottom' }}>
                        <Inject services={[Marker, Legend]} />
                        <LayersDirective>
                            <LayerDirective shapeData={continentMap} shapeSettings={{ fill: '#E5E5E5', colorMapping: colorMapData }}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} animationDuration={0} template='<div id="marker4" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>' dataSource={[{ 'latitude': 35.746512259918504, 'longitude': 102.216796875 }]} />
                                    <MarkerDirective visible={true} animationDuration={0} template='<div id="marker1" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>' dataSource={[{ 'latitude': 61.938950426660604, 'longitude': 97.03125 }]} />
                                    <MarkerDirective visible={true} animationDuration={0} template='<div id="marker2" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>' dataSource={[{ 'latitude': 57.70414723434193, 'longitude': -114.08203125 }]} />
                                    <MarkerDirective visible={true} animationDuration={0} template='<div id="marker3" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>' dataSource={[{ 'latitude': 39.90973623453719, 'longitude': -103.0078125 }]} />
                                    <MarkerDirective visible={true} animationDuration={0} template='<div id="marker5" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>' dataSource={[{ 'latitude': -8.667918002363107, 'longitude': -52.55859375 }]} />
                                    <MarkerDirective visible={true} animationDuration={0} template='<div id="marker6" style="margin-left:-35px;margin-top:-35px;position: absolute !important;"></div>' dataSource={[{ 'latitude': -23.725011735951796, 'longitude': 132.978515625 }]} />
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
            </div>
            {/* Source Link */}
            <div style={{ float: 'right', marginRight: '10px' }}>
                Source:<a href="http://www.nationmaster.com/country-info/stats/People/Age-structure/55--64-years" target="_blank">www.nationmaster.com</a>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample visualizes the placing of pie charts on the maps. Pie chart is rendered with the age group detais of top 6 largest countries.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>In this example, you can see how to render the pie chart as marker in map. Any custom HTML elements can be used as a marker.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use marker template, you need to inject <code>Marker</code> module using <code>Maps.Inject(Marker)</code> method.
                </p>
            </section>
        </main>
    )
}
export default PieMaps;