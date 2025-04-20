/**
 * Selection and Highlight sample for treemap
 */
import * as React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapHighlight, TreeMapSelection } from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/import.json';
let datasource = data;
const SAMPLE_CSS = `
	.e-view.fluent2 #property .e-checkbox-wrapper .e-icons, .e-view.fluent2-dark #property .e-checkbox-wrapper .e-icons {
        margin-left: 0px;
    }
	.drilldownCheckbox{
		margin-left: 0px;
	}
	.e-view.fluent2-highcontrast #property .drilldownCheckbox {
        margin-left: -8px;
    }
	`;
export class Selection extends SampleBase {
    treemapInstance;
    highlightModeElement;
    selectionModeElement;
    // Code for Property Panel
    droplist1 = [
        { value: 'Item' },
        { value: 'Child' },
        { value: 'Parent' },
        { value: 'All' },
    ];
    droplist2 = [
        { value: 'Item' },
        { value: 'Child' },
        { value: 'Parent' },
        { value: 'All' },
    ];
    highlightChange(args) {
        let value = args.checked;
        this.treemapInstance.highlightSettings.enable = value;
        this.treemapInstance.refresh();
    }
    highlightModeChange() {
        this.treemapInstance.highlightSettings.mode = this.highlightModeElement.value;
        this.treemapInstance.refresh();
    }
    selectionchange(args) {
        let value = args.checked;
        this.treemapInstance.selectionSettings.enable = value;
        this.treemapInstance.refresh();
    }
    selectionModeChange() {
        this.treemapInstance.selectionSettings.mode = this.selectionModeElement.value;
        this.treemapInstance.refresh();
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
                text: 'Import and Export details of US'
            }} selectionSettings={{
                enable: true,
                fill: '#58a0d3',
                border: { width: 0.3, color: 'black' },
                opacity: '1'
            }} highlightSettings={{
                enable: true,
                fill: '#71b0dd',
                border: { width: 0.3, color: 'black' },
                opacity: '1'
            }} leafItemSettings={{
                labelPath: 'type',
                fill: '#8ebfe2',
                labelPosition: 'Center',
                gap: 10
            }} dataSource={datasource.import} weightValuePath='sales'>
							<Inject services={[TreeMapHighlight, TreeMapSelection]}/>
							<LevelsDirective>
								<LevelDirective groupPath='dataType' fill='#c5e2f7' headerStyle={{ size: '16px' }} headerAlignment='Center' groupGap={5}/>
								<LevelDirective groupPath='product' fill='#a4d1f2' headerAlignment='Center' groupGap={2}/>
							</LevelsDirective>
						</TreeMapComponent>
						{/* Source Link */}
						<div style={{ float: 'right', marginRight: '10px' }}>Source:
       <a href="https://www.indexmundi.com/united_states/imports_commodities.html" target="_blank">www.indexmundi.com</a>
						</div>
					</div>
					{/* Property Panel */}
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table role='none' id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
							  <tbody>
								<tr style={{ "height": "50px" }}>
									<td>
										<div style={{ paddingLeft: '0px' }}><b>Highlight</b></div>
									</td>

								</tr>
								<tr>
									<td>
										<div style={{ paddingLeft: '0px' }}> Enable</div>
									</td>
									<td>
										<div className="drilldownCheckbox" style={{ paddingTop: "0px", paddingLeft: '0px' }}>
											<CheckBoxComponent id='highlightEnable' checked={true} change={this.highlightChange.bind(this)}> </CheckBoxComponent>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div style={{ paddingLeft: '0px' }}>Mode</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="highlightmode" width="100%" index={0} change={this.highlightModeChange.bind(this)} ref={d => this.highlightModeElement = d} dataSource={this.droplist1} fields={{ text: 'value', value: 'value' }}/>
										</div>
									</td>
								</tr>
								<tr style={{ "height": "50px" }}>
									<td>
										<div style={{ paddingLeft: '0px' }}><b>Selection</b></div>
									</td>

								</tr>
								<tr>
									<td>
										<div style={{ paddingLeft: '0px' }}>Enable</div>
									</td>
									<td>
										<div className="drilldownCheckbox" style={{ paddingTop: "0px", paddingLeft: '0px' }}>
											<CheckBoxComponent id='SelectionEnable' checked={true} change={this.selectionchange.bind(this)}> </CheckBoxComponent>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div style={{ paddingLeft: '0px' }}>Mode</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="selectionmode" width="100%" index={0} change={this.selectionModeChange.bind(this)} ref={d => this.selectionModeElement = d} dataSource={this.droplist2} fields={{ text: 'value', value: 'value' }}/>
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

						This sample depicts the details of goods imported by Japan. Selection and highlight options have been enabled in this sample.
            </p>
				</section>
				<section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
					<p>
						In this example, you can see the modes available for performing highlight and selection in TreeMap. It can be either enabled or disabled.
                    </p>
					<br />
					<p className='description-header'>Injecting Module</p>
					<p>
						TreeMap component features are segregated into individual feature-wise modules. To use highlight and selection, inject the <code>Selection</code> module using the <code>TreeMap.Inject(TreeMapSelection)</code>inject the <code>Highlight</code> module using the <code>TreeMap.Inject(TreeMapHighlight)</code> method.
                    </p>
				</section>
			</main>);
    }
}
