import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Inject, Toolbar, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';
export class Sorting extends SampleBase {
    filterSettings = { type: 'Excel' };
    toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    customeridRule = { required: true, minLength: 5 };
    orderidRules = { required: true, number: true };
    freightRules = { required: true, min: 0 };
    sortingOptions = { columns: [{ field: 'Freight', direction: 'Ascending' }, { field: 'CustomerName', direction: 'Descending' }] };
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} allowPaging={true} allowSorting={true} pageSettings={{ pageCount: 5 }} sortSettings={this.sortingOptions} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings} toolbar={this.toolbar}>
                        <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="Right" validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.customeridRule}></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={this.freightRules} editType='numericedit'/>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="Right" editType='datepickeredit'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Sort, Toolbar, Filter, Edit]}/>
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the Grid multi sorting feature. To sort two or more columns,
                        hold the CTRL key and click the column header.
                    </p>
                </div>

                <div id='description'>
                    <p>
                        Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the  <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/grid/#allowsorting'>
                            allowSorting</a></code> as true.</p>

                    <p>To sort a Grid column simply click the column header. The icons (ascending) and (descending) specifies the sort direction of a column.</p>

                    <p>By default, multi-sorting is enabled in Grid, to sort multiple column hold <b>CTRL</b> key and <b>click</b> the column header. To clear sort for a column, hold SHIFT key and click the column header.</p>

                    <p>While using Grid in a touch device, you have an option for multi sorting in single tap on the grid header. By tapping on the grid header, it will show the toggle button in small popup with sort icon. Now tap the button to enable the multi sorting in single tap.</p>

                    <p>In this demo, simply click the column header to sort a column. Also multiple sorting is enabled.
          </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use Sorting feature, we need to inject <code>Sort</code> modeule into the <code>services</code>.</p>

                    <p>
                        More information on the paging feature configuration can be found in this
            <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/sorting.html'> documentation section</a>.
          </p>
                </div>
            </div>);
    }
}
