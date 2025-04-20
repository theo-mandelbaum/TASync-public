import * as React from 'react';
import { DropDownListComponent, Inject, VirtualScroll } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './virtual-scroll.css';
export class Default extends SampleBase {
    listObj;
    // define the array of string
    records = [];
    constructor(props) {
        super(props);
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
            this.records.push(item);
        }
    }
    // bind the DataManager instance to dataSource property
    customerData = new DataManager({
        url: 'http://localhost:62728/api/VirtualDropdownData',
        adaptor: new UrlAdaptor,
        crossDomain: true
    });
    // maps the appropriate column to fields property
    fields = { text: 'text', value: 'id' };
    customerField = { text: 'OrderID', value: 'OrderID' };
    groupField = { groupBy: 'group', text: 'text', value: 'id' };
    // call the change event's function after initialized the component.
    rendereComplete() {
    }
    render() {
        return (<div id="dropdowndefault" className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-6'>
            <div id="local">
              <h4> Local Data</h4>
              <DropDownListComponent id="localdata" dataSource={this.records} placeholder="e.g. Item 1" allowFiltering={false} enableVirtualization={true} fields={this.fields} popupHeight="200px">
                <Inject services={[VirtualScroll]}/>
              </DropDownListComponent>
            </div>
          </div>
          <div className='col-lg-6'>
            <div id="remote">
              <h4>Remote Data</h4>
              <DropDownListComponent id="remotedata" dataSource={this.customerData} placeholder="OrderId" allowFiltering={true} enableVirtualization={true} fields={this.customerField} popupHeight="200px">
                <Inject services={[VirtualScroll]}/>
              </DropDownListComponent>
            </div>
          </div>
          <div className='col-lg-6'>
            <div id="remote">
              <h4>Grouping</h4>
              <DropDownListComponent id="groupdata" dataSource={this.records} placeholder="e.g. Item 1" allowFiltering={true} enableVirtualization={true} fields={this.groupField} popupHeight="200px">
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
    }
}
