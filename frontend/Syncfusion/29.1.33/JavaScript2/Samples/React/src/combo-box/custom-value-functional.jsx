import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import './custom.css';
import * as data from './dataSource.json';
const Custom = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const listObj = useRef(null);
    const temp = 'countries';
    // defined the JSON of data
    const searchData = data[temp];
    // maps the appropriate column to fields property
    const fields = { text: 'Name', value: 'Code' };
    // set the template content when the typed character(s) is not present in the list
    const template = '<div id="nodata"> No matched item, do you want to add it as new item in list?</div> <button id="btn" class="e-control e-btn">Add New Item</button>';
    // bind the filtering event
    const onFiltering = (e) => {
        let query = new Query();
        // frame the query based on search string with filter type.
        query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
        // pass the filter data source, filter query to updateData method.
        e.updateData(searchData, query);
        if (document.getElementById('nodata')) {
            // bind click event to button which is shown in popup element when the typed character(s) is not present in the list
            document.getElementById('btn').onclick = function () {
                // get the typed characters
                let customValue = document.getElementById('customvalue').value;
                // make new object based on typed characters
                let newItem = { 'Name': customValue, 'Code': customValue };
                // new object added to data source.
                listObj.current.dataSource.push(newItem);
                // close the popup element.
                listObj.current.hidePopup();
                // pass new object to addItem method.
                listObj.current.addItem(newItem);
                // select the newly added item.
                listObj.current.value = customValue;
            };
        }
    };
    return (<div className='control-pane'>
            <div className='control-section'>
                <div id='customvalues'>
                    <ComboBoxComponent id="customvalue" ref={listObj} dataSource={searchData} filtering={onFiltering.bind(this)} allowFiltering={true} fields={fields} noRecordsTemplate={template} placeholder="Select a country" popupHeight="270px"/>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the custom value functionalities of the ComboBox. When the typed character(s) is not present in the list, a button will be shown in the popup list.
                    By clicking on this button, the custom value character is added in the existing list as a new item.</p>
            </div>
            <div id="description">
                <p>The ComboBox allows the user to give input as <code>custom value</code> which is not required to
                    present in the predefined set of values. By default, this support is enabled by <code>allowCustom</code>
                    property. In this case, both text field and value field are considered as same. The custom value will be
                    sent to post back handler when a form is about to be submitted.</p>
                <p> More information about the Custom value feature can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/combo-box/getting-started.html#custom-values" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>);
};
export default Custom;
