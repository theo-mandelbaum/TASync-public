/**
 * MultipleLayer sample
 */
import * as React from "react";
import { MapsComponent, Inject, LayersDirective, LayerDirective, Marker, MarkerDirective, Zoom, DataLabel, MarkersDirective, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import * as california from './map-data/california.json';
import * as texas from './map-data/texas.json';
import * as usa from './map-data/usa.json';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    
    .svgcircle{
        -webkit-animation: opac 1.5s ease-out infinite;
        animation: opac 1.5s ease-out infinite;
    }
    @keyframes opac {
        0% {
            stroke-opacity: 0.8;
            strokeWidth: 0px;
        }
        100% {
            stroke-opacity: 0;
            strokeWidth: 8px;
        }
    }`;
let markers = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625 },
    { name: 'Australia', latitude: -25.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -55.54687499999999 }
];
export class MultilayerMaps extends SampleBase {
    mapInstance;
    render() {
        return (<main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-12'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} zoomSettings={{
                enable: true,
                pinchZooming: true,
            }} titleSettings={{
                text: 'Samsung Semiconductor office locations in USA',
                textStyle: {
                    size: '16px'
                }
            }}>
                            <Inject services={[Marker, Zoom, DataLabel, Marker, MapsTooltip]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={usa} shapeSettings={{
                fill: '#E5E5E5',
                border: {
                    color: 'black',
                    width: 0.1
                }
            }} dataLabelSettings={{
                visible: true,
                labelPath: 'iso_3166_2',
                smartLabelMode: 'Hide',
                textStyle: {
                    color: 'black'
                }
            }}>
                                </LayerDirective>
                                <LayerDirective shapeData={california} type='SubLayer' shapeSettings={{
                fill: 'rgba(141, 206, 255, 0.6)',
                border: {
                    color: '#1a9cff',
                    width: 0.25
                }
            }}> <MarkersDirective>
                                <MarkerDirective visible={true} width={20} fill='white' height={20} template='<svg id="markertemplate" width="20" height="20" style={{display:none}}><circle class="svgcircle" cx=10 cy=10 r=6 stroke="rgba(77, 77, 77, 0.8)" fill="rgba(0, 77, 153, 0.8)"/></svg>' dataSource={[
                { latitude: 37.3382082,
                    longitude: -121.8863286,
                    name: 'San Jose'
                }
            ]} tooltipSettings={{
                visible: true,
                valuePath: 'name',
                format: '<b>${name}</b><br>Regional Office,<br>Research and Development Center'
            }}>
                                    </MarkerDirective>
                                    <MarkerDirective visible={true} dataSource={[
                { latitude: 37.09023980307208,
                    longitude: -119.35546875000001
                }
            ]} template='<div style="color:black;">CA</div>'>
                                                </MarkerDirective>
                                </MarkersDirective>

                                </LayerDirective>

                                <LayerDirective shapeData={texas} type='SubLayer' shapeSettings={{
                fill: 'rgba(141, 206, 255, 0.5)',
                border: {
                    color: '#1a9cff',
                    width: 0.25
                }
            }}><MarkersDirective>
                                <MarkerDirective visible={true} animationDuration={0} fill='white' width={20} height={20} template='<svg id="markertemplate" width="20" height="20" style={{display:none}}><circle class="svgcircle" cx=10 cy=10 r=6 stroke="rgba(77, 77, 77, 0.8)" fill="rgba(0, 77, 153, 0.8)"/></svg>' dataSource={[
                { latitude: 30.267153,
                    longitude: -97.7430608,
                    name: 'Austin'
                }
            ]} tooltipSettings={{
                visible: true,
                valuePath: 'name',
                format: '<b>${name}</b><br>Manufacturing Center,<br>Research and Development Center'
            }}>
                                            </MarkerDirective>
                                            <MarkerDirective visible={true} dataSource={[
                { latitude: 31.80289258670676,
                    longitude: -98.96484375
                }
            ]} template='<div style="color:black;">TX</div>'>
                                                
                                                </MarkerDirective>
                            </MarkersDirective>
                            
                               

                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                </div>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>Source: 
                    <a href="http://www.samsung.com/semiconductor/about-us/location/" target="_blank">www.samsung.com</a>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Maps sample">
                <p>
                  This sample depicts the layers along with sublayers. Countries in the African and Australian continents are rendered in the sublayers.
               </p>
                </section>
                <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>
                In this example, you can see how to render a sublayer in map. Sublayers are used to render the desired shapes over the existing layers. Any number of sublayers can be added to a map. You can use the <code>fill</code>, <code>width</code>, and <code>color</code> properties in the border to customize the appearance of the shapes. 
                </p>
                <p>
                Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.
                </p>
                </section>
            </main>);
    }
    onMapsLoad(args) {
        let maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    }
    ;
    load(args) {
    }
    ;
}
