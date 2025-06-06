/**
 * Color Mapping sample for treemap
 */
import * as React from "react";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TreeMapComponent, Inject, TreeMapLegend, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/color.json';
let datasource = data;
const SAMPLE_CSS = `
    .colorMappingPadding {
        margin-left: -10px;margin-top: -10px;padding-left: 10px;
    }
    .e-view.fluent2-highcontrast #property .colorMappingPadding {
        margin-left: -18px;
    }
    .e-view.fluent2 #property .colorMappingPadding, .e-view.fluent2-dark #property .colorMappingPadding {
        margin-left: -8px;margin-top: -10px;padding-left: 0px;
    }`;
export class ColorMapping extends SampleBase {
    treemapInstance;
    typeElement;
    minOpacityElement;
    maxOpacityElement;
    opacityElement;
    // Code for Property Panel
    dropList = [
        { text: 'Range', value: 'RangeColorMapping' },
        { text: 'Equal', value: 'EqualColorMapping' },
        { text: 'Desaturation', value: 'DesaturationColorMapping' }
    ];
    minOpacityChange() {
        if (this.opacityElement.checked && !this.opacityElement.disabled) {
            let slider = document.getElementById('minOpacity');
            let minOpacity = parseFloat(slider.value);
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = minOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = minOpacity;
            this.treemapInstance.refresh();
        }
    }
    maxOpacityChange() {
        if (this.opacityElement.checked && !this.opacityElement.disabled) {
            let slider = document.getElementById('maxOpacity');
            let maxOpacity = parseFloat(slider.value);
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = maxOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = maxOpacity;
            this.treemapInstance.refresh();
        }
    }
    opacityChange(args) {
        let value = args.checked;
        let minOpacity = parseFloat(this.minOpacityElement.value.toString());
        let maxOpacity = parseFloat(this.maxOpacityElement.value.toString());
        if (value) {
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = minOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = maxOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = minOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = maxOpacity;
            this.minOpacityElement.disabled = false;
            this.maxOpacityElement.disabled = false;
        }
        else {
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = null;
            this.minOpacityElement.disabled = true;
            this.maxOpacityElement.disabled = true;
        }
        this.treemapInstance.refresh();
    }
    typeChange() {
        let value = this.typeElement.value.toString();
        if (value === 'RangeColorMapping') {
            this.opacityElement.disabled = true;
            this.treemapInstance.rangeColorValuePath = 'Area';
            this.treemapInstance.leafItemSettings.colorMapping[2].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].from = 100000;
            this.treemapInstance.leafItemSettings.colorMapping[0].to = 250000;
            this.treemapInstance.leafItemSettings.colorMapping[0].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].label = '0.1M - 0.25M';
            this.treemapInstance.leafItemSettings.colorMapping[0].color = '#547C84';
            this.treemapInstance.leafItemSettings.colorMapping[1].from = 250000;
            this.treemapInstance.leafItemSettings.colorMapping[1].to = 500000;
            this.treemapInstance.leafItemSettings.colorMapping[1].label = '0.25M - 0.50M';
            this.treemapInstance.leafItemSettings.colorMapping[1].color = '#37AFAB';
            this.treemapInstance.leafItemSettings.colorMapping[2].from = 500000;
            this.treemapInstance.leafItemSettings.colorMapping[2].to = 750000;
            this.treemapInstance.leafItemSettings.colorMapping[2].label = '0.5M - 0.75M';
            this.treemapInstance.leafItemSettings.colorMapping[2].color = '#A4D6AD';
            this.treemapInstance.leafItemSettings.colorMapping[2].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].from = 750000;
            this.treemapInstance.leafItemSettings.colorMapping[3].to = 2200000;
            this.treemapInstance.leafItemSettings.colorMapping[3].label = '0.75M - 2M';
            this.treemapInstance.leafItemSettings.colorMapping[3].color = '#DEEBAE';
            this.treemapInstance.leafItemSettings.colorMapping[4].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].from = null;
            this.treemapInstance.legendSettings.title.text = 'Area';
            this.treemapInstance.refresh();
        }
        else if (value === 'EqualColorMapping') {
            this.opacityElement.disabled = true;
            this.treemapInstance.rangeColorValuePath = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].value = 'North America';
            this.treemapInstance.leafItemSettings.colorMapping[0].color = '#DEEBAE';
            this.treemapInstance.leafItemSettings.colorMapping[1].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].value = 'Oceania';
            this.treemapInstance.leafItemSettings.colorMapping[1].color = '#A4D6AD';
            this.treemapInstance.leafItemSettings.colorMapping[2].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].value = 'Asia';
            this.treemapInstance.leafItemSettings.colorMapping[2].color = '#37AFAB';
            this.treemapInstance.leafItemSettings.colorMapping[3].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].value = 'Africa';
            this.treemapInstance.leafItemSettings.colorMapping[3].color = '#547C84';
            this.treemapInstance.leafItemSettings.colorMapping[4].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].value = 'Europe';
            this.treemapInstance.leafItemSettings.colorMapping[4].color = '#CEBF93';
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].maxOpacity = null;
            this.treemapInstance.equalColorValuePath = 'Location';
            this.treemapInstance.legendSettings.title.text = 'Continent';
            this.treemapInstance.refresh();
        }
        else if (value === 'DesaturationColorMapping') {
            this.opacityElement.disabled = false;
            this.treemapInstance.rangeColorValuePath = 'Area';
            this.treemapInstance.equalColorValuePath = null;
            let minOpacity = document.getElementById('minOpacity');
            let maxOpacity = document.getElementById('maxOpacity');
            this.treemapInstance.leafItemSettings.colorMapping[2].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].from = 100000;
            this.treemapInstance.leafItemSettings.colorMapping[0].to = 2230800;
            this.treemapInstance.leafItemSettings.colorMapping[0].label = '0.1M - 2M';
            this.treemapInstance.leafItemSettings.colorMapping[0].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
            if (this.opacityElement.checked) {
                this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = parseFloat(minOpacity.value);
                this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacity.value);
            }
            else {
                this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = null;
                this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = null;
            }
            this.treemapInstance.legendSettings.title.text = 'Area';
            this.treemapInstance.refresh();
        }
    }
    load(args) {
    }
    render() {
        return (<main><div className='control-pane'>
				<style>
					{SAMPLE_CSS}
				</style>
				<div className='control-section'>
					<div className='col-md-9'>
						<TreeMapComponent load={this.load.bind(this)} id='treemap-container' ref={m => this.treemapInstance = m} titleSettings={{
                text: 'Top 10 largest islands in the World',
                textStyle: { size: '15px' }
            }} format={"n"} useGroupingSeparator={true} rangeColorValuePath='Area' dataSource={datasource.color} legendSettings={{
                visible: true,
                position: 'Bottom',
                mode: 'Interactive',
                height: '10',
                title: {
                    text: 'Area'
                }
            }} tooltipSettings={{
                visible: true,
                format: 'Name: ${Name}<br>Area: ${Area} per square kms<br>Continent: ${Location}',
                opacity: 0.8
            }} weightValuePath='Area' leafItemSettings={{
                labelPath: 'Name',
                border: { color: 'white', width: 0.5 },
                colorMapping: [
                    { from: 100000, to: 250000, label: '0.1M - 0.25M', color: '#547C84' },
                    { from: 250000, to: 550000, label: '0.25M - 0.55M', color: '#37AFAB' },
                    { from: 550000, to: 750000, label: '0.55M - 0.75M', color: '#A4D6AD' },
                    { from: 750000, to: 2250000, label: '0.75M - 2M', color: '#DEEBAE' },
                    { to: null, from: null, color: 'null' },
                    { to: null, from: null, color: 'null' },
                ]
            }}>
							<Inject services={[TreeMapLegend, TreeMapTooltip]}/>
						</TreeMapComponent>
					</div>
                    {/* Property Panel */}
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                              <tbody>
                                <tr>
									<td>
										<div style={{ paddingLeft: '0px' }}>Color Mapping Type</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="Type" width="100%" index={0} change={this.typeChange.bind(this)} ref={d => this.typeElement = d} dataSource={this.dropList} fields={{ text: 'text', value: 'value' }}/>
										</div>
									</td>
								</tr>
								<tr id="hideOne" style={{ height: '50px' }}>
									<td>
										<div style={{ paddingLeft: '0px' }}>Change Opacity</div>
									</td>
									<td>
										<div className="colorMappingPadding">
											<CheckBoxComponent id='opacity' checked={false} change={this.opacityChange.bind(this)} ref={d => this.opacityElement = d} disabled={true} style={{ paddingLeft: '0px' }}/>
										</div>
									</td>
								</tr>
								<tr id="hideTwo" style={{ height: '50px' }}>
									<td>
										<div style={{ paddingLeft: '0px' }}>Min Opacity</div>
									</td>
									<td>
										<div>
											<input type="range" id='minOpacity' disabled onChange={this.minOpacityChange.bind(this)} ref={d => this.minOpacityElement = d} min="0" max="1" step="0.1" defaultValue="0.5"/>
										</div>
									</td>
								</tr>
								<tr id="hideThree" style={{ height: '50px' }}>
									<td>
										<div style={{ paddingLeft: '0px' }}>Max Opacity</div>
									</td>
									<td>
										<div>
											<input type="range" id='maxOpacity' disabled onChange={this.maxOpacityChange.bind(this)} ref={d => this.maxOpacityElement = d} min="0" max="1" step="0.1" defaultValue="1"/>
										</div>
									</td>
								</tr>
                              </tbody>
							</table>
						</PropertyPane>
					</div>
                </div>
            </div>
				<section id="action-description" aria-label="Description of TreeMap sample">
					<p>
                    This sample visualizes the top 10 largest islands in the world based on area. The color mapping is applied to the items to differentiate them from other items.
                    </p>
				</section>
				<section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
					<p>
                        In this example, you can see how to render a tree map with color mapping. The range color mapping and desaturation color mapping group the shapes based on the area size, whereas the equal color mapping groups the shapes based on the continent value. The legend is enabled in this example to represent each color mapping.
						<br /><br />
						The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices.
					</p>
					<br />
					<p className='description-header'>Injecting Module</p>
					<p>
                    The TreeMap component features are segregated into individual modules by feature. To use a legend, inject the <code>Legend</code> module using the <code>TreeMap.Inject(TreeMapLegend)</code> method.
                    </p>
				</section>
            </main>);
    }
}
