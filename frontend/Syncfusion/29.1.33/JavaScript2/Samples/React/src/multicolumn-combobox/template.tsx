/**
 * MultiColumnComboBox Template Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import './template.css';
import * as data from './dataSource.json';

export class Template extends SampleBase<{}, {}> {
    fields: object = { text: 'Name', value: 'Eimg' };
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper template-multicolumn'>
                        <div style={{ paddingTop: '55px' }}>
                        <label>Select an employee</label>
                            <MultiColumnComboBoxComponent cssClass='multicolumn-customize' type="text" dataSource={(data as any).empList} fields={this.fields} placeholder='e.g. Andrew Fuller' popupHeight={'230px'} popupWidth={'540px'} gridSettings={{ rowHeight: 40 }}>
                                <ColumnsDirective>
                                    <ColumnDirective field='Eimg' header='Photos' width={90} headerTemplate={'<div class="header"> <span>Photo</span> </div>'} template={'<div><img class="empImage" src="src/multicolumn-combobox/Employees/${Eimg}.png" alt="employee"/> </div>'}></ColumnDirective>
                                    <ColumnDirective field='Name' header='Employee Name' width={160} headerTemplate={'<div class="header"> <span class="e-icons e-multicolumn-userlogin"></span> <span>Employee info</span> </div>'} template={'<div class="ename"> ${Name} </div>' + '<div class="job"> ${Designation} </div>'}></ColumnDirective>
                                    <ColumnDirective field='DateofJoining' header='Date Of Joining' width={165} headerTemplate={'<div class="header"> <span class="e-icons e-multicolumn-calender"></span> <span>Date of joining</span> </div>'} template={'<div class="dateOfJoining"> ${DateofJoining} </div>'}></ColumnDirective>
                                    <ColumnDirective field='Country' header='Country' width={100} headerTemplate={'<div class="header"> <span>Country</span> </div>'} template={'<div class="country"> ${Country} </div>'}></ColumnDirective>
                                </ColumnsDirective>
                            </MultiColumnComboBoxComponent>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the template functionalities of the MultiColumn ComboBox.</p>
                </div>

                <div id="description">
                    <p>The MultiColumn ComboBox provides several options to customize each list items and column headers.</p>
                    
                    <p>This sample uses the following list of templates in ComboBox</p>
                    <ul>
                        <li><code>Template</code> - To customize the MultiColumn ComboBox list item's content.</li>
                        <li><code>HeaderTemplate</code> - To customize the header element.</li>
                    </ul>
                </div>
            </div>
        )
    }
}
