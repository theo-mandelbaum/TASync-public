/**
 * Legend sample
 */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { MapsComponent, Inject, LayersDirective, LayerDirective, Legend, MapsTooltip } from '@syncfusion/ej2-react-maps';
import { updateSampleSection } from '../common/sample-base';
import * as data from './map-data/legend-datasource.json';
import * as worldMap from './map-data/world-map.json';
let datasource = data;
const SAMPLE_CSS = `
    .e-view.fluent2 #property .e-checkbox-wrapper .e-icons, .e-view.fluent2-dark #property .e-checkbox-wrapper .e-icons {
        margin-left: 0px;
    }
    .legendCheckBox {
        margin-left: 0px, padding-left: 0px, margin-top: -19px;
    }
    .e-view.fluent2-highcontrast .legendCheckBox {
        padding-left: 1px !important; margin-left: -8px !important;
    }
    .legendModeCheckBox{
        padding-left: 10px;
    }`;
const LegendMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [legendHeight, setLegendHeight] = useState('');
    const [legendWidth, setLegendWidth] = useState('');
    const [mode, setMode] = useState('Default');
    const [isEnableToggleLegend, setIsEnableToggleLegend] = useState(false);
    const [orientation, setOrientation] = useState('Horizontal');
    const [position, setPosition] = useState('Top');
    let mapInstance = useRef(null);
    let legendElement = useRef(null);
    let legendPositionElement = useRef(null);
    let droplist = [
        { text: 'Default', value: 'Default' },
        { text: 'Interactive', value: 'Interactive' },
    ];
    let positionList = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' },
        { text: 'Left', value: 'Left' },
        { text: 'Right', value: 'Right' },
    ];
    let colorMappingData = [
        { from: 0.00001, to: 100, color: "rgb(153,174,214)", label: "<100" },
        { from: 100, to: 200, color: "rgb(115,143,199)", label: "100 - 200" },
        { from: 200, to: 300, color: "rgb(77,112,184)", label: "200 - 300" },
        { from: 300, to: 500, color: "rgb(38,82,168)", label: "300 - 500" },
        { from: 500, to: 19000, color: "rgb(0,51,153)", label: ">500" },
        { color: null, label: null },
    ];
    const legendChange = (args) => {
        mapInstance.current.legendSettings.mode = legendElement.current.value;
        if (legendElement.current.value === 'Interactive') {
            if (mapInstance.current.legendSettings.orientation === 'Horizontal' || mapInstance.current.legendSettings.orientation === 'None') {
                mapInstance.current.legendSettings.height = '10';
                mapInstance.current.legendSettings.width = '';
            }
            else {
                mapInstance.current.legendSettings.height = '70%';
                mapInstance.current.legendSettings.width = '10';
            }
        }
        else {
            mapInstance.current.legendSettings.height = '';
            mapInstance.current.legendSettings.width = '';
        }
        mapInstance.current.refresh();
    };
    const legendPositionChange = (args) => {
        mapInstance.current.legendSettings.position = legendPositionElement.current.value;
        if (legendPositionElement.current.value === 'Left' || legendPositionElement.current.value === 'Right') {
            mapInstance.current.legendSettings.orientation = 'Vertical';
            if (mapInstance.current.legendSettings.mode === 'Interactive') {
                mapInstance.current.legendSettings.height = '70%';
                mapInstance.current.legendSettings.width = '10';
            }
            else {
                mapInstance.current.legendSettings.height = '';
                mapInstance.current.legendSettings.width = '';
            }
        }
        else {
            mapInstance.current.legendSettings.orientation = 'Horizontal';
            if (mapInstance.current.legendSettings.mode === 'Interactive') {
                mapInstance.current.legendSettings.height = '10';
                mapInstance.current.legendSettings.width = '';
            }
        }
        mapInstance.current.refresh();
    };
    const dataChange = (args) => {
        if (args.checked) {
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].color = 'lightgrey';
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].label = 'No Data';
        }
        else {
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].label = null;
        }
        mapInstance.current.refresh();
    };
    const toggleLegendChange = (args) => {
        mapInstance.current.legendSettings.toggleLegendSettings.enable = args.checked;
        mapInstance.current.refresh();
    };
    const onMapsLoad = () => {
        let maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    const load = (args) => {
    };
    //tslint:disable
    const tooltip = (args) => {
        if (!args.options['data']) {
            args.cancel = true;
        }
    };
    return (<main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='col-lg-8 control-section'>
                <MapsComponent id="maps" tooltipRender={tooltip} loaded={onMapsLoad} load={load} ref={mapInstance} zoomSettings={{ enable: false }} legendSettings={{ visible: true, position: position, height: legendHeight, width: legendWidth, orientation: orientation, mode: mode, toggleLegendSettings: { enable: isEnableToggleLegend } }} titleSettings={{ text: 'Population density (per square kilometer) - 2015', textStyle: { size: '16px' } }}>
                    <Inject services={[Legend, MapsTooltip]}/>
                    <LayersDirective>
                        <LayerDirective shapeData={worldMap} shapePropertyPath='name' shapeDataPath='name' dataSource={datasource.legend} tooltipSettings={{ visible: true, valuePath: 'name', format: '${name} : ${density}' }} shapeSettings={{ colorValuePath: 'density', colorMapping: colorMappingData, fill: '#E5E5E5' }}/>
                    </LayersDirective>
                </MapsComponent>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>
                    Source:<a href="https://simple.wikipedia.org/wiki/List_of_countries_by_population_density" target="_blank">simple.wikipedia.org</a>
                </div>
            </div>
            {/* Property Panel */}
            <div className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: "100%", marginBottom: "20px" }}>
                      <tbody>
                        <tr>
                            <td>
                                <div style={{ paddingLeft: '0px' }}>Legend mode</div>
                            </td>
                            <td className="legendModeCheckBox">
                                <div style={{ marginLeft: '0px' }}>
                                    <DropDownListComponent id="legendmode" width="100%" index={0} change={legendChange.bind(this)} ref={legendElement} dataSource={droplist} fields={{ text: 'text', value: 'value' }}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ paddingLeft: '0px' }}>Legend position </div>
                            </td>
                            <td className="legendModeCheckBox">
                                <div style={{ marginLeft: '0px' }}>
                                    <DropDownListComponent id="legendPosition" width="100%" index={0} change={legendPositionChange.bind(this)} ref={legendPositionElement} dataSource={positionList} fields={{ text: 'text', value: 'value' }}/>
                                </div>
                            </td>
                        </tr>
                        <tr style={{ height: "50px" }}>
                            <td>
                                <div className="property-text" style={{ padding: "0px" }}>Show legend for remaining data source items</div>
                            </td>
                            <td className="legendModeCheckBox">
                                <div className="col legendCheckBox">
                                    <CheckBoxComponent id="datasource" change={dataChange.bind(this)} style={{ paddingLeft: '0px' }}/>
                                </div>
                            </td>
                        </tr>
                        <tr style={{ height: "50px" }}>
                            <td>
                                <div className="property-text" style={{ padding: "0px" }}>Show population density when the legend item is toggled</div>
                            </td>
                            <td className="legendModeCheckBox">
                                <div className="col legendCheckBox">
                                    <CheckBoxComponent id="toggleLegend" change={toggleLegendChange.bind(this)} style={{ paddingLeft: '0px' }}/>
                                </div>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                </PropertyPane>
            </div>
		</div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample visualizes grouping of countries in the legends based on its population density. The legend will be displayed at the top of the map.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>In this example, you can see how to render a legend in the maps. A legend item denotes the value of a shape. Any number of legend items can be added to the legend. You can bind the desired colors to the shapes, if its values are within the specified range using the ColorMapping property. You can also show or hide color mapping related to population density when toggling the legend item</p>
                <p>Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the Maps.Inject(Legend) method.</p>
            </section>
		</main>);
};
export default LegendMaps;
