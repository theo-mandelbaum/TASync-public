import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Sort, Toolbar, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';
export class Scrolling extends SampleBase {
    filterSettings = { type: 'Excel' };
    toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    customeridRule = { required: true, minLength: 5 };
    orderidRules = { required: true, number: true };
    freightRules = { required: true, min: 0 };
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} height="400" allowSorting={true} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings} toolbar={this.toolbar}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='150' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='160' validationRules={this.customeridRule}></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='155' format='yMd' textAlign='Right' editType='datepickeredit'/>
                            <ColumnDirective field='Freight' headerText='Freight' width='130' format='C2' textAlign='Right' validationRules={this.freightRules} editType='numericedit'/>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='155' format='yMd' textAlign='Right' editType='datepickeredit'></ColumnDirective>
                            <ColumnDirective field='ShipName' headerText='Ship Name' width='170'></ColumnDirective>
                            <ColumnDirective field='ShipAddress' headerText='Ship Address' width='170'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Sort, Filter, Edit]}/>
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid component with the horizontal and vertical scrollbars to view the exceeded grid content.
    </p>
                </div>
                <div id='description'>
                    <p>The Grid component will show scrollbar when the content exceeds the element width or height. The vertical and horizontal
                    scrollbar will be displayed based on the following criteria.
                   </p>
                    <ul>
                        <li>The vertical scrollbar appears when the total height of rows present in Grid exceeds its element height.</li>
                        <li>The horizontal scrollbar appears when the sum of column`s width exceeds Grid element width.</li>
                    </ul>
                    <p>The <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#height">height
        </a></code> and <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#width">width
        </a></code> property is used to set the Grid height and width respectively. The value
        of these properties can be a numeric value, pixel(<code>px</code>) or percentage (<code>%</code>).</p>
                    <p>
                        In this demo, the <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#height">height
        </a></code> and <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#width">width
        </a></code> property of the Grid is set to <strong><em>400</em></strong> and <strong><em>auto</em></strong>
                        respectively. Now, the Grid will render with vertical scrollbar when the total height of rows
        exceeds its element height and horizontal scrollbar will appear when the
        total column width exceeds the element width.
    </p>

                </div>
            </div>);
    }
}
