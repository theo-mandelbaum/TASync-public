import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './inline.css';
import * as data from './dataSource.json';
const Inline = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const temp = 'employees';
    // define the JSON of data
    const employeesData = data[temp];
    // maps the appropriate column to fields property
    const fields = { text: 'Name' };
    return (<div className='control-pane'>
            <div className='control-section'>
                <div id='inline' style={{ paddingTop: '75px', textAlign: 'center' }}>
                    <span id="contentText">React top expert of this week is
                        <DropDownListComponent id="inline" cssClass="inlinecss" dataSource={employeesData} fields={fields} placeholder="Select an employee" popupHeight="200px" width="65px" popupWidth="140px" value='Michael'/>
                    </span>
                </div>
            </div>
            <div id="action-description">
                <p>The DropDownList appearing in line with highlighted content. Click that DropDownList value content and select an item
                    from the popup list.
                </p>
            </div>
            <div id="description">
                <p>The DropDownList component can be rendered in line with other content and you can override the styles of the dropdownlist
                    component.</p>
                <p>This sample illustrates using the user's data that has been used and customized DropDownList border.</p>
            </div>
        </div>);
};
export default Inline;
