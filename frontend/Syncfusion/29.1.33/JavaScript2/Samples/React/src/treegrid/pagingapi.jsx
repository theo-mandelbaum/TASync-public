import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { getObject } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class PagingAPI extends SampleBase {
    treegridObj;
    sizemodeObj;
    pageSizeObj;
    pageCountObj;
    currentPageObj;
    onChange(args) {
        this.treegridObj.allowPaging = args.checked;
        this.toggleInputs(this.treegridObj.allowPaging, true);
    }
    changeNum() {
        this.pageSizeObj.value = this.pageSizeObj.value > this.treegridObj.pageSettings.totalRecordsCount ?
            this.treegridObj.pageSettings.totalRecordsCount : this.pageSizeObj.value;
        this.treegridObj.pageSettings.pageSize = this.pageSizeObj.value;
        this.currentPageObj.max = Math.ceil(this.treegridObj.pageSettings.totalRecordsCount / this.treegridObj.pageSettings.pageSize);
    }
    countChange() {
        this.pageCountObj.value = this.pageCountObj.value > 8 ? 8 : this.pageCountObj.value;
        this.treegridObj.pageSettings.pageCount = this.pageCountObj.value;
    }
    currentPageChange() {
        this.currentPageObj.value = this.currentPageObj.value > this.currentPageObj.max ? this.currentPageObj.max : this.currentPageObj.value;
        let pageNumber = this.currentPageObj.value;
        this.treegridObj.goToPage(pageNumber);
    }
    change(args) {
        let type = getObject('value', args);
        if (type === 'Root') {
            this.treegridObj.pageSettings = { pageSizeMode: 'Root', pageSize: 2 };
        }
        else {
            this.treegridObj.pageSettings = { pageSizeMode: 'All', pageSize: this.pageSizeObj.value };
        }
        this.toggleInputs(type === 'All');
    }
    toggleInputs(state, isPager) {
        if (!isNullOrUndefined(isPager)) {
            let element = document.getElementsByClassName('con-prop1')[0];
            element.style.display = state ? 'table-row' : 'none';
        }
        let flag = this.sizemodeObj.value === 'All';
        let elem = document.getElementsByClassName('con-prop2');
        for (let i = 0; i < elem.length; i++) {
            let element = elem[i];
            element.style.display = state && flag ? 'table-row' : 'none';
        }
    }
    type = [
        { id: 'All', type: 'All' },
        { id: 'Root', type: 'Root' }
    ];
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true} ref={treegrid => this.treegridObj = treegrid} pageSettings={{ pageCount: 2 }}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='100' type='date' format='yMd' textAlign='Right'/>
                <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right'/>
                <ColumnDirective field='progress' headerText='progress' width='90' textAlign='Right'/>
              </ColumnsDirective>
            <Inject services={[Page]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '60%' }}>
                      <div> Allow Paging </div>
                    </td>
                    <td style={{ width: '60%' }}>
                      <div>
                        <CheckBoxComponent checked={true} change={this.onChange.bind(this)}></CheckBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr className='con-prop1'>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '7px' }}> Page Size Mode </div>
                    </td>
                    <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                      <div id='dropdown'>
                        <DropDownListComponent width="115px" id="sizemode" change={this.change.bind(this)} dataSource={this.type} fields={{ text: 'type', value: 'id' }} value="All" ref={dropdown => this.sizemodeObj = dropdown}/>
                      </div>
                    </td>
                  </tr>
                  <tr className='con-prop2'>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '7px' }}> Page Size </div>
                    </td>
                    <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                      <div id='numericbox'>
                        <NumericTextBoxComponent id='pagesize' format='##' min={1} max={200} value={12} width='115px' ref={numeric => this.pageSizeObj = numeric} change={this.changeNum.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr className='con-prop2'>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '7px' }}> Page Count </div>
                    </td>
                    <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                      <div id='numericbox'>
                        <NumericTextBoxComponent id='pagecount' format='##' min={1} max={4} value={2} width='115px' ref={numeric => this.pageCountObj = numeric} change={this.countChange.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                  <tr className='con-prop2'>
                    <td style={{ width: '50%' }}>
                      <div style={{ paddingTop: '7px' }}> Current Page </div>
                    </td>
                    <td style={{ width: '50%', paddingTop: '10px 10px 10px 0px' }}>
                      <div id='numericbox'>
                        <NumericTextBoxComponent id='currentpage' format='##' min={1} max={17} value={1} width='115px' ref={numeric => this.currentPageObj = numeric} change={this.currentPageChange.bind(this)}>
                        </NumericTextBoxComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the usage of paging API in Tree Grid. In this sample, use the properties panel 
          to change the page size mode, page size, page count and current page of the Tree Grid.</p>
      </div>

      <div id="description">
        <p>Paging allows you to display the contents of the Tree Grid in page segments. The number of items on a page is determined by
            the <code>pageSettings-&gt;pageSize</code> property. If no value is specified for the <code>pageSettings-&gt;pageSize</code> property,
            the Tree Grid will display 12 items on a page. By default, paging is disabled. To enable paging,
            set <code>allowPaging</code> property to true.</p>
        <p>In this demo,</p>
        <ul>
          <li>Click the <strong>Allow Paging</strong> check box to enable/disable paging feature.</li>
          <li>Change the value of <strong>Page Size Mode</strong> Dropdown to change <code>pageSettings-&gt;pageSizeMode.</code></li>
          <li>Change the value of <strong>Page Size</strong> textbox to change <code>pageSettings-&gt;pageSize.</code></li>
          <li>Change the value of <strong>Page Count</strong> textbox to change <code>pageSettings-&gt;pageCount.</code></li>
          <li>Change the value of <strong>Current Page</strong> textbox to change
          <code> pageSettings-&gt;currentPage.</code></li>
        </ul>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise modules. To use paging feature, we need to inject
            <code>Page</code> module into the <code>services</code>.
        </p>
        <p>
          More information on the paging configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/paging">documentation section</a>.
        </p>
        </div>
      </div>);
    }
}
