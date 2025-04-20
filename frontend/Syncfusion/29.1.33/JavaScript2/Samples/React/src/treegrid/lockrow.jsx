import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData, lockRowDropDownData } from './data';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { addClass, removeClass } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
.disableRow .e-rowcell,
.material .disableRow .e-rowcell{
    color: rgba(0, 0, 0, .38) !important;
  }
.disableRow .e-rowcell,
  body:not([class]) #_gridcontrol .disableRow .e-rowcell,
  .ej2-new #_gridcontrol .disableRow .e-rowcell {
   color: rgba(0, 0, 0, .38) !important;
  }`;
export class LockRow extends SampleBase {
    treegridObj;
    multiselectObj;
    toolbarOptions = ['Edit', 'Update', 'Cancel'];
    editSettings = { allowEditing: true, mode: 'Row', newRowPosition: 'Child' };
    editparams = { params: { popupHeight: '300px' } };
    validationRule = { required: true, number: true };
    validationRule1 = { required: true };
    validationRule2 = { date: ['M/d/yyyy', 'Please enter a valid date'] };
    validationRule3 = { number: true, min: 0 };
    editparams2 = { params: { format: 'n' } };
    editparams3 = { params: { format: 'M/d/yyyy' } };
    pageSettings = { pageSize: 2, pageSizeMode: 'Root' };
    rowValues = [2, 6];
    rowDataBound(args) {
        let key = 'taskID';
        if (this.multiselectObj.value.indexOf(args.data[key]) !== -1) {
            addClass([args.row], 'disableRow');
        }
        else {
            removeClass([args.row], 'disableRow');
        }
    }
    beginEdit(args) {
        let key = 'taskID';
        if (this.multiselectObj.value.indexOf(args.rowData[key]) !== -1) {
            args.cancel = true;
        }
    }
    select() {
        this.treegridObj.refresh();
    }
    removed() {
        this.treegridObj.refresh();
    }
    render() {
        return (<div className='control-pane' role="control" aria-label="Tree Grid Control">
        <style>
          {SAMPLE_CSS}
        </style>

        <div className='control-section'>
          <div className='col-md-9'> 
           <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings} toolbar={this.toolbarOptions} enableHover={false} rowDataBound={this.rowDataBound.bind(this)} ref={treegrid => this.treegridObj = treegrid} beginEdit={this.beginEdit.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right' validationRules={this.validationRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='220' validationRules={this.validationRule1}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='130' textAlign='Right' editType='datepickeredit' format='yMd' edit={this.editparams3} validationRules={this.validationRule2}/>
              <ColumnDirective field='duration' headerText='Duration' width='140' editType='numericedit' textAlign='Right' validationRules={this.validationRule3} edit={this.editparams2}/>
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section lockrow-propertypanel'>
          <PropertyPane title='Properties' aria-label="Property Pane">
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tbody>
                  <tr style={{ height: '50px' }}>
                    <td>
                      <div style={{ paddingLeft: '10px' }}> Disable Rows </div>
                    </td>
                    <td style={{ width: '60%' }}>
                      <div>
                        <MultiSelectComponent width="150px" id="lockrows" mode="CheckBox" value={this.rowValues} dataSource={lockRowDropDownData} showDropDownIcon={true} popupHeight='350px' select={this.select.bind(this)} removed={this.removed.bind(this)} ref={multiselect => this.multiselectObj = multiselect} aria-label="Select Rows to Disable">
                          <Inject services={[CheckBoxSelection]}></Inject>
                        </MultiSelectComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
          </PropertyPane>
         </div>
        </div>
        <div id="action-description">
          <p>
            This samples demonstrates the way of preventing editing for certain row and disable the locked rows
              to differentiate edit and non-editable rows in Tree Grid.
          </p>
        </div>
        <div id="description">
          <p>
            The Tree Grid supports CRUD operations. This CRUD operations can be configured in Tree Grid using <code>editSettings</code>.
            Also, it has different modes to manipulate the datasource.
          </p>
          <p> The available modes are,</p>
          <ul>
            <li><code>Row </code></li>
            <li><code>Cell</code></li>
            <li><code>Dialog</code></li>
          </ul>
          <p>
            In this sample, we have provided an option in property panel to prevent editing for certain rows. Using <code>beginEdit</code>
              event of Tree Grid, we prevent the editing for selected Task ID row in the dropdown and disable the corresponding row using
              <code>rowDataBound</code> event of Tree Grid.
          </p>

          <p>Injecting Module:</p>
          <p>Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
             <code>Edit</code> module into the <code>services</code>.</p>
          <p>
            More information on the selection configuration can be found in this documentation section.
          </p>

        </div>
      </div>);
    }
}
