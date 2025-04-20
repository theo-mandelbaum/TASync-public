import * as React from 'react';
import { MultiColumnComboBoxComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './filtering.css';
import * as data from './dataSource.json';
export class Filter extends SampleBase {
    fields;
    mccbDropdownListData = ['StartsWith', 'EndsWith', 'Contains'];
    filterType = 'StartsWith';
    change = (args) => {
        this.setState({ filterType: args.value });
    };
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className="col-lg-8">
                        <div className="control-wrapper multicolumn">
                            <div style={{ paddingTop: '50px' }}>
                            <label>Select an employee</label>
                            <MultiColumnComboBoxComponent type="text" dataSource={data.employee} fields={this.fields} placeholder='Select a name' filterType={this.filterType} popupHeight={'200px'} popupWidth={'650px'}>
                            <ColumnsDirective>
                                <ColumnDirective field='Name' header='Name' width={110}></ColumnDirective>
                                <ColumnDirective field='Department' header='Department' width={120}></ColumnDirective>
                                <ColumnDirective field='Role' header='Role' width={140}></ColumnDirective>
                                <ColumnDirective field='Location' header='Location' width={100}></ColumnDirective>
                                <ColumnDirective field='Experience' header='Experience in Year' width={150}></ColumnDirective>
                            </ColumnsDirective>
                            </MultiColumnComboBoxComponent>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 property-section">
                        <div className="property-panel-header"> Properties </div>
                        <div className="property-panel-content">
                            <table className="property-panel-table">
                                <tbody>
                                    <tr>
                                        <td> Choose filter type </td>
                                        <td style={{ paddingRight: '10px' }}>
                                            <DropDownListComponent id="filterType" dataSource={this.mccbDropdownListData} index={0} change={this.change} placeholder="Select a filter type" popupHeight="200px" popupWidth="300px"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the built-in support to filter the <code>datasource</code> in the MultiColumn ComboBox.</p>
                </div>

                <div id="description">
                <p>The <code>MultiColumn ComboBox</code> supports filtering, which allows users to search for and select items by typing keywords. The available items are dynamically filtered based on the input, ensuring quick access to the desired data.</p>
                </div>
            </div>);
    }
}
