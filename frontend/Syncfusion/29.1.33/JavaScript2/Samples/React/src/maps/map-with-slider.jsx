/**
 * Slider sample
 */
import * as React from "react";
import { MapsComponent, Inject, LayersDirective, LayerDirective, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import { SliderComponent } from "@syncfusion/ej2-react-inputs";
import * as data from './map-data/population-growth.json';
import * as northAmericaMap from './map-data/north-america.json';
let datasource = data;
let sliderVal = [-2, 4];
let colorCodes = ['#7E9CDC', '#DCD57E', '#7EDCA2', '#6EB5D0', '#A6DC7E', '#DCA87E', '#d075c6'];
const SAMPLE_CSS = `
    .map-slider {
        width: 300px !important;
    }
    #mapslider {
        display: grid;
        justify-content: center;
    }
    .control-fluid {
		padding: 0px !important;
    }
    .e-control-wrapper.e-slider-container.e-horizontal .e-slider-track {
        background: -webkit-linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);
        background: linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);
        background: -moz-linear-gradient(left, #7E9CDC 0, #DCD57E 17%, #7EDCA2 34%, #6EB5D0 51%, #A6DC7E 68%, #DCA87E 85%, #d075c6 100%);
    }
    .e-limit-bar.e-limits {
        background-color: transparent !important;
    }
    .e-control-wrapper.e-slider-container.e-horizontal .e-range {
        height: 0px !important;
        width: 0px !important;
    }`;
export class MapSlider extends SampleBase {
    mapInstance;
    sliderElement;
    load(args) {
    }
    ;
    render() {
        return (<main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <MapsComponent id="maps" load={this.load.bind(this)} ref={m => this.mapInstance = m} margin={{
                bottom: 20
            }} titleSettings={{
                text: 'Average annual population growth in North American countries',
                textStyle: {
                    size: '16px'
                }
            }} zoomSettings={{
                enable: false
            }}>
                        <Inject services={[MapsTooltip]}/>
                        <LayersDirective>
                            <LayerDirective shapeData={northAmericaMap} shapePropertyPath='name' shapeDataPath='name' dataSource={datasource.population} shapeSettings={{
                colorValuePath: 'population',
                colorMapping: [
                    {
                        from: -1.5, to: -0.75, color: '#7E9CDC'
                    },
                    {
                        from: -0.75, to: 0, color: '#DCD57E'
                    },
                    {
                        from: 0.1, to: 0.75, color: '#7EDCA2'
                    },
                    {
                        from: 0.76, to: 1.5, color: '#6EB5D0'
                    },
                    {
                        from: 1.5, to: 2.25, color: '#A6DC7E'
                    },
                    {
                        from: 2.25, to: 3, color: '#DCA87E'
                    },
                    {
                        from: 3, to: 3.75, color: '#d075c6'
                    }
                ]
            }} tooltipSettings={{
                visible: true,
                format: '${name} : ${population}'
            }}>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
                <div id="mapslider">
                    <SliderComponent id="mapannotation" className="map-slider" type='Range' min={-1.5} max={3.75} step={0.75} value={sliderVal} ticks={{ placement: 'After', largeStep: 0.75 }} change={this.sliderChange.bind(this)} ref={d => this.sliderElement = d}/>
                </div>
                <div style={{ float: 'right', marginRight: '10px', marginTop: '20px' }}>Source: 
                    <a href="https://en.wikipedia.org/wiki/List_of_North_American_countries_by_population" target="_blank">Population growth in North America</a>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Maps sample">
                    <p>
                        This sample visualizes the average annual population growth of the countries in the North America continent.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                    <p>
                        In this example, range color mapping is applied to the shapes based on their population growth percentage. EJ2 Slider control is place at the bottom of the map to control the minimum and maximum color range.
                    </p>
                    <p>
                        Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices.
                    </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        Maps component features are segregated into individual feature-wise modules. To use a marker, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method, and use a legend by injecting the <code>Legend</code> module.
                    </p>
                </section>
            </main>);
    }
    sliderChange() {
        if (!isNaN(this.sliderElement.value[0]) && !isNaN(this.sliderElement.value[1])) {
            for (let i = 0; i < this.mapInstance.layers[0].shapeSettings.colorMapping.length; i++) {
                if (this.mapInstance.layers[0].shapeSettings.colorMapping[i].from < this.sliderElement.value[0] ||
                    this.mapInstance.layers[0].shapeSettings.colorMapping[i].to > this.sliderElement.value[1]) {
                    this.mapInstance.layers[0].shapeSettings.colorMapping[i].color = '#E5E5E5';
                }
                else {
                    this.mapInstance.layers[0].shapeSettings.colorMapping[i].color = colorCodes[i];
                }
            }
            sliderVal = this.sliderElement.value;
            this.mapInstance.refresh();
        }
    }
}
