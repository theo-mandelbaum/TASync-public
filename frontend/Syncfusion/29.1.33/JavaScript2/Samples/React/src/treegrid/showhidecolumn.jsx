import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
const SAMPLE_CSS = `
.fluent2 .btn,
.fluent2-dark .btn,
.fluent2-highcontrast .btn{
  outline: none !important;
}
  @media (min-width: 990px) and (max-width: 1300px){
  .column-property {
  padding-left:5px;
  }
  }`;
export class ShowHideColumn extends SampleBase {
    treegridObj;
    dropdownObj;
    buttonObj;
    buttonObj2;
    columnsName = [
        { id: 'taskID', name: 'Task ID' },
        { id: 'duration', name: 'Duration' },
        { id: 'startDate', name: 'Start Date' },
        { id: 'progress', name: 'Progress' }
    ];
    btnClick() {
        let columnName = this.dropdownObj.value.toString();
        let column = this.treegridObj.getColumnByField(columnName);
        if (this.treegridObj.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
            alert('Atleast one Column should be visible');
        }
        else {
            this.treegridObj.grid.hideColumns(column.headerText, 'headerText');
            let hiddenColumns = document.getElementById('hiddencolumns');
            hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
        }
    }
    showClick() {
        let columnName = this.dropdownObj.value.toString();
        let column = this.treegridObj.getColumnByField(columnName);
        this.treegridObj.grid.showColumns(column.headerText, 'headerText');
        let hiddenColumns = document.getElementById('hiddencolumns');
        hiddenColumns.value = hiddenColumns.value.replace(column.headerText + '\n', '');
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <style>
            {SAMPLE_CSS}
          </style>
          <div className='col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true} ref={treegrid => this.treegridObj = treegrid} pageSettings={{ pageSize: 10 }}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='100' type='date' format='yMd' textAlign='Right'/>
                <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right'/>
                <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right'/>
              </ColumnsDirective>
            <Inject services={[Page]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section column-property'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <div> Column </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div id='columnddl'>
                        <DropDownListComponent width="132px" id="ddlelement" dataSource={this.columnsName} fields={{ text: 'name', value: 'id' }} value="taskID" ref={dropdown => this.dropdownObj = dropdown}/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <ButtonComponent id='hide' ref={button => this.buttonObj = button} onClick={this.btnClick.bind(this)}> Hide </ButtonComponent>
                      </div>
                    </td>
                    <td style={{ width: '70%' }}>
                      <div>
                        <ButtonComponent id='show' ref={button => this.buttonObj2 = button} onClick={this.showClick.bind(this)}> Show </ButtonComponent>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ paddingTop: '10px' }}> Hidden Columns</div>
                    </td>
                    <td style={{ width: '70%', padding: '10px 10px 10px 0px' }}>
                      <div>
                        <textarea id='hiddencolumns' style={{ resize: 'none', height: '65px', width: '100%', backgroundColor: '#fff', padding: '6px' }} className='form-control'></textarea>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
          </PropertyPane>
        </div>
      </div>
        <div id="action-description">
          <p>This sample demonstrates the text alignment functionalities of the Tree Grid columns.</p>
        </div>
        <div id='description'>
          <p>The Tree Grid column can be showed/hidden dynamically using <code>showColumns
              </code> and <code>hideColumns</code> method of the Grid.</p>
          <p>In this demo, the columns can be showed and hidden by selecting the column name in the dropdown
              and click the Show or Hide buttons to toggle visibility. And the column`s visibility is toggled based on the 
              <code>columns-&gt;headerText</code> value.</p>
          <br />
          <p>The <code>columns-&gt;visible</code> property specifies the visibility of a column. 
            To hide a column at the initial rendering, set the <code>columns-&gt;visible</code> property to false.</p>
        </div>
      </div>);
    }
}
