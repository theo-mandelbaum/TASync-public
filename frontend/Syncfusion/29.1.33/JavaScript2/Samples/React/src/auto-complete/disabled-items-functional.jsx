import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import './disabled-items.css';
import * as data from './dataSource.json';
const DisabledItems = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const temp = 'statusData';
    //define the data with status
    const statusData = data[temp];
    // map the groupBy field with status
    const statusFields = { value: "Status", disabled: "State" };
    const tempData = 'vegetables';
    //define the data with groupong
    const vegetableData = data[tempData];
    // map the vegetable field with Class column
    const vegetableFields = { groupBy: 'Category', value: 'Vegetable', disabled: 'State' };
    return (<div className='control-pane'>
            <div className='control-section' id='dropIcon'>
                <div className='col-lg-6'>
                    <div id="disabled-status">
                        <h4>Status</h4>
                        <AutoCompleteComponent id="status" dataSource={statusData} fields={statusFields} placeholder="Select Status"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div id="vegetable">
                        <h4>Vegetable</h4>
                        <AutoCompleteComponent id="vegetables" dataSource={vegetableData} fields={vegetableFields} placeholder="Select Vegetable"/>
                    </div>
                </div>
            </div>
            <div id="action-description">
            <p>This example showcases the disabled items of AutoComplete. When you type on the AutoComplete the popup will open, and you will notice that the disabled items are greyed out and cannot be selected.</p>
            </div>
            <div id="description">
            <p>The AutoComplete provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be selected as a value for the component. To configure the disabled item columns, use the <code>fields.disabled</code> property.</p>
            </div>
        </div>);
};
export default DisabledItems;
