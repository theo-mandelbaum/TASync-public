import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './icons.css';
import * as data from './dataSource.json';
const Grouping = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const temp = 'vegetableData';
    //define the data with category
    const vegetableData = data[temp];
    // map the groupBy field with Category column
    const groupFields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    const tempData = 'socialMedia';
    //define the data with icon class
    const socialMediaData = data[tempData];
    // map the iconCss field with Class column
    const iconFields = { text: 'SocialMedia', value: 'Id', iconCss: 'Class' };
    return (<div className='control-pane'>
            <div className='control-section' id='dropIcon'>
                <div className='col-lg-6'>
                    <div className='drop-down-list-content' id="group">
                    <label className="h4">Grouping</label>
                        <DropDownListComponent id="vegetables" dataSource={vegetableData} fields={groupFields} placeholder="Select a vegetable" popupHeight="220px"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='drop-down-list-content' id="icon">
                    <label className="h4"> Icons</label>
                        <DropDownListComponent id="icons" dataSource={socialMediaData} fields={iconFields} placeholder="Select a social media" popupHeight="220px"/>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the grouping and icons supports of the DropDownList. Click the DropDownList element and select an item from the categorized list/icons list.</p>
            </div>
            <div id="description">
                <p>The DropDownList allows to group the relevant items under a corresponding category by mapping the <code>groupBy</code> field, and allows to load the list items with icons.</p>
                <p>The grouping sample illustrates how the vegetables are grouped based on its category.</p>
                <p>The second DropDownList is populated with icons that is rendered by mapping the <code>iconCss</code> field.</p>
                <p>More information on the grouping feature configuration can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/drop-down-list/grouping.html" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>);
};
export default Grouping;
