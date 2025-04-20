/**
 * ComboBox Default functionality Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { ComboBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import './default.css';
import * as data from './dataSource.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let records: { [key: string]: Object }[] = [];
    for (let i = 1; i <= 150; i++) {
        let item: { [key: string]: Object } = {};
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
    const [value, setValue] = useState<string>(null);
    const [objectValue, setObjectValue] = useState<string>("Selected value : ");
    const onChange = (args: any) => {
        setObjectValue("Selected value : " + JSON.stringify(args.value));
    }
    // maps the appropriate column to fields property
    const fields: { [key: string]: string } = { text: 'text', value: 'id' };
    return (
        <div>
        <div className="col-lg-8 control-section">
          <div className="control-wrapper">
            <div id="default" style={{ paddingTop: '75px' }}>
              <ComboBoxComponent id="games" dataSource={records}  fields={fields} change={onChange.bind(this)} allowObjectBinding={true} value={value} placeholder="Select a Item" popupHeight="220px" />
            </div>
          </div>
        </div>
        <div className="col-lg-4 property-section">
        <textarea id="value" className="auto-dropdowns" title="Properties" style={{ width: '100%', marginTop: '90px', height: '60px' }} value={objectValue} readOnly />
        </div>

        <div id="action-description">
          <p>This sample demonstrates the object value binding functionalities of the ComboBox. Type a character in the
            ComboBox element or click the drodown icon to choose an item from the <code>options</code> list. The
            corresponding object value of the selected item is then assigned to the value property.
            In the property panel, the <code>value</code> property of the selected item's will be displayed.</p>
        </div>

        <div id="description">
        <p>The <code>ComboBox</code> component allows users to select single value from a predefined list. 
          Upon selection, the associated object value is automatically assigned 
          to the <code>value</code> property, enabled by the <code>allowObjectBinding</code> feature.</p>
        </div>
      </div>
    );
}
export default Default;