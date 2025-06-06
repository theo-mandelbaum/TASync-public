import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import './checkbox.css';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import * as dataSource from './checkbox-data.json';
const Checkbox = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const data = dataSource;
    const fields = { dataSource: data.checkboxData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    const showCheckBox = true;
    const [treeSettings, setTreeSettings] = useState({
        autoCheck: false
    });
    const onChange = (args) => {
        setTreeSettings({
            autoCheck: args.checked
        });
    };
    return (<div className='control-pane'>
            <div className='col-lg-8 control-section dropdowntree-check'>
                <div className='control_wapper'>
                    {/* Render the Dropdown Tree with checkboxes */}
                    <DropDownTreeComponent fields={fields} showCheckBox={showCheckBox} mode="Delimiter" placeholder="Select items" popupHeight="200px" treeSettings={treeSettings}/>
                </div>
            </div>
            <div className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <CheckBoxComponent id="check" label='Auto Check' change={onChange.bind(this)}></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample explains you about the CheckBox functionalities of the Dropdown Tree. Click on any parent item's
                    CheckBox to check or uncheck the item and its child items. The parent item's checked state will be determined by
                    its child item’s checked state.</p>
            </div>
            <div id="description">
                <p>The <code>Dropdown Tree</code> component can be rendered with the checkbox on the left side of each tree item.
                    This allows the user to check more than one item, and this can be enabled by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#showcheckbox">showCheckBox</a>
                    property.</p>
                <p>In this demo, the Dropdown Tree is populated with the checkbox enabled feature.</p>
            </div>
        </div>);
};
export default Checkbox;
