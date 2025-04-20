import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, Sort, Group, Edit, Resize, Toolbar, Aggregate, Page, ExcelExport, PdfExport, ColumnChooser, ColumnMenu } from '@syncfusion/ej2-react-grids';
import { AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { Browser } from "@syncfusion/ej2-base";
import { data } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './adaptive-layout.css';
export class AdaptiveLayout extends SampleBase {
    grid;
    checkboxObj;
    toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ColumnChooser', 'ExcelExport', 'PdfExport'];
    renderingMode = 'Vertical';
    editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    groupOptions = { showGroupedColumn: true };
    validationRule = { required: true };
    orderidRules = { required: true, number: true };
    filterOptions = { type: 'Excel' };
    onChange(e) {
        this.grid.rowRenderingMode = e.checked ? 'Horizontal' : 'Vertical';
        this.grid.allowGrouping = e.checked;
    }
    ;
    footerSum(props) {
        return (<span>Sum: {props.Sum}</span>);
    }
    footerAvg(props) {
        return (<span>Average: {props.Average}</span>);
    }
    load() {
        this.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0];
        if (this.pageSettings.pageSizes) {
            document.querySelector('.e-adaptive-demo')?.classList.add('e-pager-pagesizes');
        }
        else {
            document.querySelector('.e-adaptive-demo')?.classList.remove('e-pager-pagesizes');
        }
    }
    toolbarClick(args) {
        switch (args.item.id) {
            case this.grid.element.id + '_pdfexport':
                this.grid.pdfExport();
                break;
            case this.grid.element.id + '_excelexport':
                this.grid.excelExport();
                break;
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <style>
            {SAMPLE_CSS}
          </style>
          <div className="col-md-9 e-bigger e-adaptive-demo">
            {!Browser.isDevice ? (<div className="e-mobile-layout">
                <div className="e-mobile-content">
                    <GridComponent id="adaptivebrowser" dataSource={data} height='100%' ref={grid => this.grid = grid} enableAdaptiveUI={true} rowRenderingMode={this.renderingMode} allowFiltering={true} allowSorting={true} allowGrouping={false} showColumnChooser={true} showColumnMenu={true} allowPaging={true} groupSettings={this.groupOptions} filterSettings={this.filterOptions} toolbar={this.toolbarOptions} editSettings={this.editSettings} pageSettings={{ pageCount: 3, pageSizes: true }} load={this.load} toolbarClick={this.toolbarClick.bind(this)} allowExcelExport={true} allowPdfExport={true}>
                      <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='180' isPrimaryKey={true} validationRules={this.orderidRules}></ColumnDirective>
                        <ColumnDirective field='Freight' headerText='Freight' width='180' format='C2' editType='numericedit' validationRules={this.validationRule}/>
                        <ColumnDirective field='CustomerName' headerText='Name' width='180' validationRules={this.validationRule}></ColumnDirective>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='180'></ColumnDirective>
                      </ColumnsDirective>
                      <AggregatesDirective>
                        <AggregateDirective>
                          <AggregateColumnsDirective>
                            <AggregateColumnDirective field='Freight' type='Sum' format='C2' footerTemplate={'<span>Sum: ${Sum}</span>'}> </AggregateColumnDirective>
                          </AggregateColumnsDirective>
                        </AggregateDirective>
                      </AggregatesDirective>
                      <Inject services={[Filter, Sort, Group, Edit, Resize, Toolbar, Aggregate, Page, ExcelExport, PdfExport, ColumnChooser, ColumnMenu]}/>
                    </GridComponent>
                </div>
              </div>) : (<GridComponent id="adaptivedevice" dataSource={data} height='100%' ref={grid => this.grid = grid} enableAdaptiveUI={true} rowRenderingMode={this.renderingMode} allowFiltering={true} allowSorting={true} allowGrouping={false} showColumnChooser={true} showColumnMenu={true} allowPaging={true} groupSettings={this.groupOptions} filterSettings={this.filterOptions} toolbar={this.toolbarOptions} editSettings={this.editSettings} pageSettings={{ pageCount: 3, pageSizes: true }} load={this.load} toolbarClick={this.toolbarClick.bind(this)} allowExcelExport={true} allowPdfExport={true}>
                    <ColumnsDirective>
                      <ColumnDirective field='OrderID' headerText='Order ID' width='180' isPrimaryKey={true} validationRules={this.orderidRules}></ColumnDirective>
                      <ColumnDirective field='Freight' headerText='Freight' width='180' format='C2' editType='numericedit' validationRules={this.validationRule}/>
                      <ColumnDirective field='CustomerName' headerText='Name' width='180' validationRules={this.validationRule}></ColumnDirective>
                      <ColumnDirective field='ShipCountry' headerText='Ship Country' width='180'></ColumnDirective>
                    </ColumnsDirective>
                    <AggregatesDirective>
                      <AggregateDirective>
                        <AggregateColumnsDirective>
                          <AggregateColumnDirective field='Freight' type='Sum' format='C2' footerTemplate={'<span>Sum: ${Sum}</span>'}> </AggregateColumnDirective>
                        </AggregateColumnsDirective>
                      </AggregateDirective>
                    </AggregatesDirective>
                    <Inject services={[Filter, Sort, Group, Edit, Toolbar, Aggregate, Page, ExcelExport, PdfExport, ColumnChooser, ColumnMenu]}/>
                  </GridComponent>)}
          </div>
          <div className='col-md-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                <tbody>
                <tr>
                  <td>
                    <div>Enable horizontal row mode</div>
                  </td>
                  <td>
                    <div>
                      <CheckBoxComponent ref={(scope) => { this.checkboxObj = scope; }} change={this.onChange.bind(this)} aria-label="Enable horizontal row mode"></CheckBoxComponent>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
          <div id="action-description">
            <p>This sample demonstrates optimal viewing experience and improve usability on small screens.</p>
          </div>
          <div id='description'>
            <p>
              The <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#enableadaptiveui">
                enableAdaptiveUI</a></code> property is used to render the grid filter, sort, edit, pager and toolbars like column chooser, pdf export, excel export, etc... dialogs adaptively and
              <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#rowrenderingmode"> rowRenderingMode</a></code>
              property is used to render the grid row elements in the following directions,
            </p>
            <ul>
              <li><code>Horizontal</code> - Renders the grid row elements in the horizontal direction.</li>
              <li><code>Vertical</code> - Renders the grid row elements in the vertical direction.</li>
            </ul>
            <p> In this sample, you can change the row direction by using the properties panel checkbox
            </p>
            <p> In this demo, the column menu feature is only supported for the Grid <code>rowRenderingMode</code> mode as <code>Vertical</code>.
                This feature includes grouping, sorting, autofit, filter, and column chooser feature.
            </p>
            <p>
              More information on the rowRenderingMode configuration can be found in this 
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/grid/#rowrenderingmode">
                documentation section</a>.
            </p>
          </div>
        </div>
      </div>);
    }
}
