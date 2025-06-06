/**
 * Projection sample
 */
import * as React from "react";
import { MapsComponent, Inject, LayersDirective, LayerDirective, Zoom, Legend, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as data from './map-data/projection-datasource.json';
import * as worldMap from './map-data/world-map.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class ProjectionMaps extends SampleBase {
    mapInstance;
    dropElement;
    droplist = [
        { value: 'Mercator' },
        { value: 'Equirectangular' },
        { value: 'Miller' },
        { value: 'Eckert3' },
        { value: 'Eckert5' },
        { value: 'Eckert6' },
        { value: 'Winkel3' },
        { value: 'AitOff' }
    ];
    change() {
        this.mapInstance.projectionType = this.dropElement.value;
        this.mapInstance.refresh();
    }
    render() {
        return (<main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} zoomSettings={{
                enable: false
            }} legendSettings={{
                visible: true
            }} titleSettings={{
                text: 'Members of the UN Security Council',
                textStyle: {
                    size: '16px'
                },
                subtitleSettings: {
                    text: '- In 2017',
                    alignment: 'Far'
                }
            }}>
                            <Inject services={[Zoom, Legend, MapsTooltip]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={worldMap} shapePropertyPath='name' shapeDataPath='Country' dataSource={datasource.projection} tooltipSettings={{
                visible: true,
                valuePath: 'Country'
            }} shapeSettings={{
                fill: '#E5E5E5',
                colorMapping: [
                    {
                        value: 'Permanent',
                        color: '#EDB46F'
                    },
                    {
                        color: '#F1931B',
                        value: 'Non-Permanent'
                    }
                ],
                colorValuePath: 'Membership'
            }}>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: '-10px' }}>
                               <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div style={{ marginLeft: '1px' }}>Projection Type</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div style={{ marginRight: '0px' }}>
                                            <DropDownListComponent width="100%" index={0} change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} placeholder='Select projection type'/>
                                        </div>
                                    </td>
                                </tr>
                               </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>Source: 
                <a href="https://en.wikipedia.org/wiki/List_of_members_of_the_United_Nations_Security_Council" target="_blank">en.wikipedia.org</a>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Maps sample">
                <p>
                This sample illustrates the details of permanent and non-permanent countries in the UN security council, in 2017. Projection of a map can be changed by using the projection type in properties panel.
               </p>
                </section>
                <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                  <p>
                     In this example, you can see how to render a map with various projections. You can use the ColorMapping property to customize the color of the shapes. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.
                    </p>
                       <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                      Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the Maps.Inject(Legend) method.
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
