/**
 * Layout sample for treemap
 */
import * as React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TreeMapComponent, Inject, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import * as data from './treemap-data/economics.json';
let datasource = data;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class Layout extends SampleBase {
    treemapInstance;
    layoutElement;
    renderDirectionElement;
    // Code for Property Panel
    droplist = [
        { text: 'Squarified', value: 'Squarified' },
        { text: 'Horizontal', value: 'SliceAndDiceHorizontal' },
        { text: 'Vertical', value: 'SliceAndDiceVertical' },
        { text: 'Auto', value: 'SliceAndDiceAuto' },
    ];
    dropList = [
        { text: 'TopLeftBottomRight', value: 'TopLeftBottomRight' },
        { text: 'TopRightBottomLeft', value: 'TopRightBottomLeft' },
        { text: 'BottomLeftTopRight', value: 'BottomLeftTopRight' },
        { text: 'BottomRightTopLeft', value: 'BottomRightTopLeft' }
    ];
    layoutChange() {
        this.treemapInstance.layoutType = this.layoutElement.value;
        this.treemapInstance.refresh();
    }
    renderDirectionChange() {
        this.treemapInstance.renderDirection = this.renderDirectionElement.value;
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
                text: 'Top 10 countries by GDP Nominal - 2015',
                textStyle: { size: '15px' }
            }} dataSource={datasource.economics} weightValuePath='GDP' tooltipSettings={{
                visible: true,
                format: '${State}<br>Rank : ${Rank}'
            }} rangeColorValuePath='GDP' leafItemSettings={{
                labelPath: 'State',
                labelFormat: '${State}<br>$${GDP} Trillion<br>(${percentage} %)',
                labelStyle: {
                    color: '#000000'
                },
                border: {
                    color: '#000000',
                    width: 0.5
                },
                colorMapping: [
                    {
                        from: 1550,
                        to: 17946,
                        color: '#9cbb59',
                        minOpacity: 0.7,
                        maxOpacity: 1,
                    }
                ]
            }}>
							<Inject services={[TreeMapTooltip]}/>
						</TreeMapComponent>
						{/* Source Link */}
						<div style={{ float: 'right', marginRight: '10px' }}>Source:
       <a href="https://www.reinisfischer.com/top-10-largest-economies-world-gdp-nominal-2015" target="_blank">www.reinisfischer.com</a>
						</div>
					</div>
					{/* Property Panel */}
					<div className='col-md-3 property-section'>
						<PropertyPane title='Properties'>
							<table role='none' id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
							<tbody>
								<tr>
									<td>
										<div style={{ paddingLeft: '0px' }}>Layout Type</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="layoutMode" width="100%" index={0} change={this.layoutChange.bind(this)} ref={d => this.layoutElement = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }}/>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div style={{ paddingLeft: '0px' }}>Render Direction</div>
									</td>
									<td>
										<div>
											<DropDownListComponent id="highlightMode" width="100%" index={0} dataSource={this.dropList} fields={{ text: 'text', value: 'value' }} change={this.renderDirectionChange.bind(this)} ref={d => this.renderDirectionElement = d}/>
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
					This sample orders the countries based on the unemployment rate by rendering TreeMap in the right-to-left (RTL)
        	direction
					</p>
				</section>
				<section id="description" aria-label="Description of the TreeMap features demonstrated in this sample">
					<p>
					In this example, you can see how to render a TreeMap from the right-to-left direction. The tooltip is enabled in
        this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled
        devices.
				<br /><br />
				The tooltip is enabled in this example. To see the tooltip in action,
        hover the mouse over an item or tap an item in touch-enabled devices.
				</p>
				</section>
			</main>);
    }
}
