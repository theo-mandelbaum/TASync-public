/**
 * Label sample
 */
import * as React from "react";
import { MapsComponent, Inject, LayersDirective, LayerDirective, DataLabel, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as usa from './map-data/usa.json';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class LabelMaps extends SampleBase {
    mapInstance;
    // Code for Property panel
    dropElement1;
    dropElement2;
    droplist = [
        { text: 'Trim', value: 'Trim' },
        { text: 'None', value: 'None' },
        { text: 'Hide', value: 'Hide' }
    ];
    showlabel() {
        let element = (document.getElementById('select'));
        this.mapInstance.layers[0].dataLabelSettings.visible = element.checked;
        this.mapInstance.refresh();
    }
    intersectaction() {
        this.mapInstance.layers[0].dataLabelSettings.intersectionAction = this.dropElement1.value;
        this.mapInstance.refresh();
    }
    smartlabel() {
        this.mapInstance.layers[0].dataLabelSettings.smartLabelMode = this.dropElement2.value;
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
            }}>
                            <Inject services={[DataLabel, MapsTooltip]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={usa} shapePropertyPath='iso_3166_2' dataLabelSettings={{
                visible: true,
                labelPath: 'name',
                smartLabelMode: 'Trim',
                intersectionAction: 'None'
            }} shapeSettings={{
                autofill: true
            }} tooltipSettings={{
                visible: true,
                valuePath: 'name'
            }}>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ paddingLeft: '0px' }}>Show Labels</div>
                                    </td>
                                    <td>
                                        <div style={{ marginTop: '3px' }}>
                                            <input type="checkbox" onClick={this.showlabel.bind(this)} defaultChecked={true} id="select" style={{ marginTop: '0px', marginLeft: '0px' }}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ paddingLeft: '0px' }}>Smart label mode</div>
                                    </td>
                                    <td>
                                        <div>
                                        <DropDownListComponent width="100%" index={0} change={this.smartlabel.bind(this)} ref={d => this.dropElement2 = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} placeholder='Select smartlabel mode'/>
                                        </div>
                                    </td>
                                </tr><tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ paddingLeft: '0px' }}>Intersect action</div>
                                    </td>
                                    <td>
                                        <div>
                                        <DropDownListComponent width="100%" index={1} change={this.intersectaction.bind(this)} ref={d => this.dropElement1 = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} placeholder='Select intersect action'/>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Maps sample">
                <p>
                  This sample visualizes the names of all the states in USA in data labels. Options have been provided to change the intersect action and smart labels mode of the data labels.
                </p>
                </section>
                <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>
                   In this example, you can see how to render a map with the provided GeoJSON data. Group of shapes can be combined to form a layer of the map. You can bind the desired colors from the data source to the map shapes. The marker templates are used to display the names for shapes and mark specific locations. Legend is enabled in this example to represent each continent.
                </p>
                <p>
            Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.
                </p>
            <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                   Maps component features are segregated into individual feature-wise modules. To use a marker, inject the <code>Marker</code> module using the <code>Maps.Inject(Marker)</code> method, and use a legend by injecting the <code>Legend</code> module.
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
