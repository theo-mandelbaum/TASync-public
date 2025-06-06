import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './treeview.css';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './dataSource/checkbox-data.json';
export class Checkbox extends SampleBase {
    treeObj;
    data = dataSource;
    fields = { dataSource: this.data.checkboxData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    showCheckBox = true;
    onChange(args) {
        this.treeObj.autoCheck = args.checked;
    }
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-8 control-section'>
                    <div className='tree-control_wrapper'>
                        {/* Render the TreeView with checkboxes */}
                        <TreeViewComponent fields={this.fields} ref={(scope) => { this.treeObj = scope; }} showCheckBox={this.showCheckBox}/>
                    </div>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <CheckBoxComponent id="check" checked={true} label='Auto Check' change={this.onChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the CheckBox functionalities of the TreeView. Click on any parent node's CheckBox to check/uncheck the node and its child nodes. The parent node's checked state will be determined by its child nodes checked state.</p>
                </div>
                <div id="description">
                    <p>The <code>TreeView</code> component can be rendered with checkbox on the left side of each tree node. This allows the user to check more than one nodes, and this can be enabled by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treeview#showcheckbox">showCheckBox</a> property.</p>
                    <p>In this demo, the TreeView is populated with checkbox enabled.</p>
                    <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/check-box/" target="_blank">Checkboxes</a> section from the documentation.</p>
                </div>
            </div>);
    }
}
