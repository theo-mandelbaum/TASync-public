import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { formatData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class ColumnFormat extends SampleBase {
    treegridObj;
    dropdownObj;
    dropdownObj2;
    format = { type: 'dateTime', format: 'M/d/yyyy' };
    columnNames = [
        { id: 'price', name: 'Price' },
        { id: 'orderDate', name: 'Order Date' }
    ];
    priceFormat = [
        { id: 'n2', format: 'n2' },
        { id: 'n3', format: 'n3' },
        { id: 'c2', format: 'c2' },
        { id: 'c3', format: 'c3' },
        { id: 'p2', format: 'p2' },
        { id: 'p3', format: 'p3' }
    ];
    dateFormat = [
        { id: 'M/d/yyyy', format: 'Short Date' },
        { id: 'dddd, MMMM dd, yyyy', format: 'Long Date' },
        { id: 'MMMM, yyyy', format: 'Month/Year' },
        { id: 'MMMM, dd', format: 'Month/Day' }
    ];
    change(args) {
        let columnName = args.value.toString();
        if (columnName === 'price') {
            this.dropdownObj2.dataSource = this.priceFormat;
            let priceColumn = this.treegridObj.getColumnByField('price');
            this.dropdownObj2.value = priceColumn.format.toString();
        }
        if (columnName === 'orderDate') {
            this.dropdownObj2.dataSource = this.dateFormat;
            let format = this.treegridObj.getColumnByField('orderDate').format;
            this.dropdownObj2.value = format.format;
        }
    }
    change2(args) {
        let formatval = args.value;
        let columnName = this.dropdownObj.value.toString();
        if (columnName === 'price') {
            this.treegridObj.getColumnByField(columnName).format = formatval;
        }
        if (columnName === 'orderDate') {
            this.treegridObj.getColumnByField(columnName).format = { format: formatval, type: 'date' };
        }
        this.treegridObj.refreshColumns();
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <TreeGridComponent dataSource={formatData} treeColumnIndex={1} childMapping='subtasks' height='350' allowPaging={true} ref={treegrid => this.treegridObj = treegrid} pageSettings={{ pageCount: 5 }}>
              <ColumnsDirective>
                <ColumnDirective field='orderID' headerText='Order ID' width='110' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='orderName' headerText='Order Name' width='200'></ColumnDirective>
                <ColumnDirective field='orderDate' headerText='Order Date' width='190' type='date' format={this.format} textAlign='Right'/>
                <ColumnDirective field='price' headerText='Price' width='120' format='c2' textAlign='Right' type='number'/>
              </ColumnsDirective>
            <Inject services={[Page]}/>
          </TreeGridComponent>
        </div>
        <div className='col-lg-3 property-section' style={{ paddingLeft: '5px' }}>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tbody>
                  <tr style={{ height: '50px' }}>
                    <td>
                      <div style={{ paddingTop: '7px' }}> Column </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div>
                        <DropDownListComponent width="145px" id="columns" change={this.change.bind(this)} dataSource={this.columnNames} fields={{ text: 'name', value: 'id' }} value="price" ref={dropdown => this.dropdownObj = dropdown}/>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: '50px' }}>
                    <td>
                      <div> Format </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div>
                        <DropDownListComponent width="145px" id="colformat" change={this.change2.bind(this)} dataSource={this.priceFormat} fields={{ text: 'format', value: 'id' }} value="c2" ref={dropdown => this.dropdownObj2 = dropdown}/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
          <p>This sample demonstrates the way of displaying the content of Tree Grid columns
              based on the specified format. In this sample, format of columns can be changed dynamically through property panel.
          </p>
      </div>
      <div id="description">
        <p>Format is the process of customizing the particular column data/values based on specific culture. The Tree Grid uses
              Internalization library to format number and date values.
            The format can be specified by using <code>format</code> property of columns.</p>
            <p>In this demo, select the column and format from the property panel to format the corresponding column values.</p>
            <p>
                More information about Column Formatting can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/columns#format">documentation section</a>.
            </p>
      </div>
    </div>);
    }
}
