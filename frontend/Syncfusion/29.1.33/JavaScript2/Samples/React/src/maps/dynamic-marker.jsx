/**
 * Dynamic Marker sample
 */
import * as React from "react";
import { NavigationLine, Zoom } from '@syncfusion/ej2-maps';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { MapsComponent, Inject, LayersDirective, LayerDirective, Marker, MarkerSettings } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
const SAMPLE_CSS = `
    .e-input[disabled] {
        border-bottom-color: inherit;
        background-image: none;
    }
    .dynamicCheckBox {
        padding-left: 0px;
        margin-left: 0px;
    }
    .e-view.fluent2 #property .dynamicCheckBox, .e-view.fluent2-dark #property .dynamicCheckBox {
        padding-left: 0px;
        margin-left: -10px !important;
    }`;
export class DynamicMarker extends SampleBase {
    mapInstance;
    dropElement;
    connectLineInstance;
    buttonInstance;
    markerCheck = true;
    lineCheck;
    connectLineCheck;
    navigationLines = [];
    latitude = [];
    longitude = [];
    textElement;
    droplist = [
        { value: 'Image' },
        { value: 'Circle' },
        { value: 'Diamond' },
        { value: 'Star' },
        { value: 'Triangle' }
    ];
    render() {
        return (<main><div className='control-panel'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-9 control-section'>
                    <MapsComponent id="container" load={this.load} click={this.click.bind(this)} ref={m => this.mapInstance = m} zoomSettings={{
                enable: true
            }}>
                        <Inject services={[Marker, NavigationLine, Zoom]}/>
                        <LayersDirective>
                            <LayerDirective urlTemplate="https://tile.openstreetmap.org/level/tileX/tileY.png">
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                    <div>
                        <i>
                            <div>
                                <p id="content" style={{ fontSize: '16px', color: 'grey', textAlign: 'center' }}>Click on the maps to add marker/navigation line</p>
                            </div>
                        </i>
                    </div>
                </div>
                <div className="col-lg-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" role='none' title="Properties" style={{ width: '100%', marginTop: '5px' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ padding: '0px', display: 'inline-block' }}>Marker</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div className="dynamicCheckBox" style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                            <CheckBoxComponent id='marker' change={this.markerChange.bind(this)} checked></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ padding: '0px' }}>Line</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div className="dynamicCheckBox" style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                            <CheckBoxComponent id='line' change={this.lineChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ padding: '0px' }}>Connecting line</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div className="dynamicCheckBox" style={{ marginLeft: '0px', marginTop: '-2px' }}>
                                            <CheckBoxComponent id='connect' change={this.connectLineChange.bind(this)} ref={d => this.connectLineInstance = d} disabled></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '15px' }}></tr>
                                <tr style={{ height: '35px' }}>
                                    <td style={{ width: '50%' }}>
                                        Marker type
                                </td>
                                    <td style={{ width: '50%', marginLeft: '20px' }}>
                                        <div>
                                        <DropDownListComponent id='type' fields={{ text: 'value', value: 'value' }} ref={d => this.dropElement = d} dataSource={this.droplist} index={0} placeholder='Select marker shape' width={'100%'}></DropDownListComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '15px' }}></tr>
                                <tr style={{ height: '35px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ padding: '0px' }}>Width</div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div style={{ 'width': '100%' }}>
                                        <TextBoxComponent className="e-input" value='1' style={{ width: '100%' }} id="width" ref={d => this.textElement = d} disabled></TextBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '60px' }}>
                                    <td>
                                        <div style={{ marginLeft: '50%', width: '100%', textAlign: 'center' }}>
                                            <ButtonComponent id='togglebtn' cssClass='e-info' isPrimary={true} onClick={this.buttonClick.bind(this)} style={{ textTransform: 'none', width: '80px', marginTop: '2px' }} ref={d => this.buttonInstance = d}>Clear</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Maps sample">
                    <p>
                        This sample shows how custom markers and lines can be dynamically added to our maps with UI interaction. Marker or line can be chosen from the properties panel. </p>
                </section>
                <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                    <p>
                        Using UI interaction, the markers or line can be added as follows: You can get the currently clicked geo location by passing "PointerEvent" or "MouseEvent" argument and layer index to the "getGeoLocation" method. Then, use that geo position to place the marker or line in the appropriate position.
            </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module</p>
                    <p>
                        The features of maps component are segregated into individual feature-wise modules. To use navigation lines and marker, you need to inject the <code>NavigationLine </code> and <code>Marker </code> module using the <code>Maps.Inject(NavigationLine, Marker)</code> method.
            </p>
                </section>
            </main>);
    }
    load(args) {
    }
    ;
    click(args) {
        if (this.markerCheck) {
            this.addMarker(args);
        }
        if (this.lineCheck && !this.connectLineCheck) {
            this.addLine(args, this.textElement.value);
        }
        if (this.connectLineCheck) {
            this.addLine(args, this.textElement.value, true);
        }
        if (this.markerCheck || this.lineCheck || this.connectLineCheck) {
            this.mapInstance.refresh();
            if (this.buttonInstance.disabled && (this.mapInstance.layers[0].markerSettings.length ||
                this.mapInstance.layers[0].navigationLineSettings.length)) {
                this.buttonInstance.disabled = false;
            }
        }
    }
    ;
    markerChange(args) {
        this.markerCheck = args.checked;
        this.dropElement.enabled = args.checked;
    }
    ;
    lineChange(args) {
        this.lineCheck = args.checked;
        if (args.checked) {
            this.connectLineInstance.disabled = false;
            this.connectLineInstance.checked = false;
            this.textElement.enabled = true;
        }
        else {
            this.connectLineCheck = args.checked;
            this.emptySavedLinePositions();
            this.connectLineInstance.disabled = true;
            this.connectLineInstance.checked = false;
            this.textElement.enabled = false;
        }
    }
    ;
    connectLineChange(args) {
        this.connectLineCheck = args.checked;
        if (!args.checked) {
            this.emptySavedLinePositions();
        }
    }
    ;
    buttonClick(args) {
        this.mapInstance.layers[0].markerSettings = [];
        this.mapInstance.layers[0].navigationLineSettings = [];
        this.navigationLines = [];
        this.emptySavedLinePositions();
        this.buttonInstance.disabled = true;
    }
    ;
    emptySavedLinePositions = () => {
        this.latitude = [];
        this.longitude = [];
    };
    addMarker = (args) => {
        if (args['latitude'] !== null && args['longitude'] !== null) {
            let layerIndex = (args.target.indexOf('_LayerIndex_') !== -1) ?
                parseFloat(args.target.split('_LayerIndex_')[1].split('_')[0]) : 0;
            let marker;
            let dynamicMarker = this.mapInstance.layersCollection[layerIndex].markerSettings;
            dynamicMarker.push(new MarkerSettings(this.mapInstance, 'markerSettings', marker));
            let markerIndex = dynamicMarker.length - 1;
            dynamicMarker[markerIndex].visible = true;
            dynamicMarker[markerIndex].dataSource = [
                { latitude: args['latitude'], longitude: args['longitude'], name: 'dynamicmarker' }
            ];
            dynamicMarker[markerIndex].animationDuration = 0;
            dynamicMarker[markerIndex].fill = '#DB4537';
            dynamicMarker[markerIndex].shape = (this.dropElement.value !== 'Image') ? this.dropElement.value : 'Image';
            dynamicMarker[markerIndex].height = (this.dropElement.value !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].width = (this.dropElement.value !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].imageUrl = (this.dropElement.value !== 'Image') ? '' : 'src/maps/images/ballon.png';
        }
    };
    addLine = (lineArgs, lineWidth, connectiveLine) => {
        if (lineArgs.latitude != null && lineArgs.longitude != null) {
            this.latitude.push(lineArgs.latitude);
            this.longitude.push(lineArgs.longitude);
        }
        if (this.latitude.length >= 2) {
            this.navigationLines.push({
                'visible': true,
                'latitude': [this.latitude[(this.latitude.length - 2)], this.latitude[(this.latitude.length - 1)]],
                'longitude': [this.longitude[(this.longitude.length - 2)], this.longitude[(this.longitude.length - 1)]],
                'angle': 0,
                'color': 'blue',
                'width': (lineWidth > 5) ? 5 : (((5 >= lineWidth) && (lineWidth >= 1)) ? lineWidth : 1)
            });
            this.mapInstance.layers[0].navigationLineSettings = this.navigationLines;
            if (!connectiveLine) {
                this.emptySavedLinePositions();
            }
        }
    };
}
