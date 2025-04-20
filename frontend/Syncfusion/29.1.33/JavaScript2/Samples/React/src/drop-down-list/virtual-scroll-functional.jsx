import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent, Inject, VirtualScroll } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import './virtual-scroll.css';
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    // define the array of string
    let records = [];
    for (let i = 1; i <= 150; i++) {
        let item = {};
        item.id = 'id' + i;
        item.text = `Item ${i}`;
        // Generate a random number between 1 and 4 to determine the group
        const randomGroup = Math.floor(Math.random() * 4) + 1;
        switch (randomGroup) {
            case 1:
                item.group = 'Group A';
                break;
            case 2:
                item.group = 'Group B';
                break;
            case 3:
                item.group = 'Group C';
                break;
            case 4:
                item.group = 'Group D';
                break;
            default:
                break;
        }
        records.push(item);
    }
    // bind the DataManager instance to dataSource property
    const customerData = new DataManager({
        url: 'http://localhost:62728/api/VirtualDropdownData',
        adaptor: new UrlAdaptor,
        crossDomain: true
    });
    // maps the appropriate column to fields property
    const fields = { text: 'text', value: 'id' };
    const customerField = { text: 'OrderID', value: 'OrderID' };
    const groupField = { groupBy: 'group', text: 'text', value: 'id' };
    return (<div id="dropdowndefault" className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-6'>
                    <div className='drop-down-list-content' id="local">
                    <label className="h4">Local Data</label>
                        <DropDownListComponent id="localdata" dataSource={records} placeholder="e.g. Item 1" allowFiltering={false} enableVirtualization={true} fields={fields} popupHeight="200px">
                            <Inject services={[VirtualScroll]}/>
                        </DropDownListComponent>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='drop-down-list-content' id="remote">
                    <label className="h4">Remote Data</label>
                        <DropDownListComponent id="remotedata" dataSource={customerData} placeholder="OrderId" allowFiltering={true} enableVirtualization={true} fields={customerField} popupHeight="200px">
                            <Inject services={[VirtualScroll]}/>
                        </DropDownListComponent>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='drop-down-list-content' id="group">
                    <label className="h4">Grouping</label>
                        <DropDownListComponent id="groupdata" dataSource={records} placeholder="e.g. Item 1" allowFiltering={true} enableVirtualization={true} fields={groupField} popupHeight="200px">
                            <Inject services={[VirtualScroll]}/>
                        </DropDownListComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates the virtualization support of the DropDownList. The component has 150 items bound to it; however, when you open the suggestion list, only few items are loaded based on the popup height, and the remaining items are loaded while scrolling.</p>
            </div>
            <div id="description">
                <p>The <code>DropDownList</code> component supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the <code>enableVirtualization</code> property to true. When virtualization is enabled, DropDownList doesn't render the entire suggestion data source on initial component rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling.
            Virtualization works with both local and remote data.</p>
            <p>To perform the virtualization feature in the DropDownList, the <code>VirtualScroll</code> module has to be injected at the application level.</p>
            </div>
        </div>);
};
export default Default;
