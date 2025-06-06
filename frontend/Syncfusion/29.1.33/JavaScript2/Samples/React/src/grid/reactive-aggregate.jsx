import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Sort, Page, Aggregate, Edit, Toolbar, Group, AggregateColumnsDirective, Filter, AggregateColumnDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';
export class ReactiveAggregate extends SampleBase {
    footerSum(props) {
        return (<span>Sum: {props.Sum}</span>);
    }
    groupFooterSum(props) {
        return (<span>Sum: {props.Sum}</span>);
    }
    groupcFooterAvg(props) {
        return (<span>Average: {props.Average}</span>);
    }
    pageSettings = { pageCount: 5 };
    filterSettings = { type: 'Excel' };
    groupSettings = { showDropArea: false, columns: ['CustomerID'] };
    toolbarOptions = ['Delete', 'Update', 'Cancel'];
    editSettings = { allowEditing: true, allowDeleting: true, mode: 'Batch' };
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data} allowPaging={true} pageSettings={this.pageSettings} allowSorting={true} allowFiltering={true} filterSettings={this.filterSettings} toolbar={this.toolbarOptions} editSettings={this.editSettings} allowGrouping={true} groupSettings={this.groupSettings}>
            <ColumnsDirective>             
            <ColumnDirective field='OrderID' headerText='Customer Name' isPrimaryKey={true} width='150'></ColumnDirective>
              <ColumnDirective field='CustomerID' headerText='Customer ID' width='150'></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' editType='numericedit' width='120' format='C2' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' editType='dropdownedit' width='150'></ColumnDirective>
            </ColumnsDirective>
            <AggregatesDirective>
                <AggregateDirective>
                  <AggregateColumnsDirective>
                  <AggregateColumnDirective field='Freight' type='Sum' format='C2' footerTemplate={this.footerSum}> </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                  </AggregateDirective>
                  <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective field='Freight' type='Sum' format='C2' groupFooterTemplate={this.groupFooterSum}> </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                  </AggregateDirective>
                  <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective field='Freight' type='Average' format='C2' groupCaptionTemplate={this.groupcFooterAvg}> </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                </AggregateDirective>
            </AggregatesDirective>
            <Inject services={[Page, Aggregate, Edit, Toolbar, Group, Sort, Filter]}/>
          </GridComponent>
          <div id="action-description">
            <p>This sample demonstrates reactive aggregate update on data change functionality of the Grid. In this sample, the batch editing  is enabled and the corresponding aggregate values will be refreshed when 'Freight' cell value is changed.</p>
          </div>
          <div id="description">
            <p>The Grid supports aggregates which will be displayed at the footer, group footer and group caption of the Grid.
    The aggregate configurations can be provided by the <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#aggregates">
                aggregates
        </a></code> property.</p>
            <p>
              In this demo, the batch editing  is enabled and the corresponding aggregate values will be refreshed when <strong><i>Freight</i></strong> cell value is changed.
    </p>
            <p>
              By default, reactive aggregate update is not supported by inline and dialog edit modes. But, we can refresh aggregates manually. Please refer to the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/aggregates/reactive-aggregate#refresh-aggregate-values-in-inline-editing">
                documentation.</a>
            </p>
          </div>
        </div>
      </div>);
    }
}
