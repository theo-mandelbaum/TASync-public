import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, Sort, Group, Edit, Resize, Toolbar, Aggregate, Page, ExcelExport, PdfExport, ColumnChooser, ColumnMenu } from '@syncfusion/ej2-react-grids';
import { AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { Browser } from "@syncfusion/ej2-base";
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './adaptive-layout.css';
// custom code end
function Adaptive() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    // custom code start
    const SAMPLE_CSS = `
  .e-bigger.e-responsive-dialog .e-dlg-content {
    padding: 16px;
  }

  /* The device with borders */
  .e-mobile-layout {
    position: relative;
    width: 360px;
    height: 640px;
    margin: auto;
    border: 16px #f4f4f4 solid;
    border-top-width: 60px;
    border-bottom-width: 60px;
    border-radius: 36px;
    box-shadow: 0 0px 2px rgb(144 144 144), 0 0px 10px rgb(0 0 0 / 16%);
  }

  .tailwind-dark .e-mobile-layout,
  .material-dark .e-mobile-layout,
  .fabric-dark .e-mobile-layout,
  .bootstrap-dark .e-mobile-layout,
  .bootstrap5-dark .e-mobile-layout {
    border: 16px rgb(255 255 255 / 10%) solid;
    border-top-width: 60px;
    border-bottom-width: 60px;
  }

  /* The horizontal line on the top of the device */
  .e-mobile-layout:before {
    content: '';
    display: block;
    width: 60px;
    height: 5px;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ebebeb;
    border-radius: 10px;
  }

  .tailwind-dark .e-mobile-layout::before,
  .tailwind-dark .e-mobile-layout::after,
  .material-dark .e-mobile-layout::before,
  .material-dark .e-mobile-layout::after,
  .fabric-dark .e-mobile-layout::before,
  .fabric-dark .e-mobile-layout::after,
  .bootstrap-dark .e-mobile-layout::before,
  .bootstrap-dark .e-mobile-layout::after,
  .bootstrap5-dark .e-mobile-layout::before,
  .bootstrap5-dark .e-mobile-layout::after {
    background: rgb(255 255 255  / 20%);
  }

  /* The circle on the bottom of the device */
  .e-mobile-layout:after {
    content: '';
    display: block;
    width: 35px;
    height: 35px;
    position: absolute;
    left: 50%;
    bottom: -65px;
    transform: translate(-50%, -50%);
    background: #e8e8e8;
    border-radius: 50%;
  }

  /* The screen (or content) of the device */
  .e-mobile-layout .e-mobile-content {
    overflow: hidden;
    width: 328px;
    height: 100%;
    background: transparent;
    border: 0px solid #dddddd;
  }

  .highcontrast .e-mobile-layout {
      border: 16px #000000 solid;
      border-top-width: 60px;
      border-bottom-width: 60px;
      box-shadow: -1px 2px white, -2px -2px white, 2px -2px white, 2px 1px white;
  }`;
    let grid;
    let checkboxObj;
    const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ColumnChooser', 'ExcelExport', 'PdfExport'];
    const renderingMode = 'Vertical';
    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    const groupOptions = { showGroupedColumn: true };
    const validationRule = { required: true };
    const orderidRules = { required: true, number: true };
    const filterOptions = { type: 'Excel' };
    function onChange(e) {
        grid.rowRenderingMode = e.checked ? 'Horizontal' : 'Vertical';
        grid.allowGrouping = e.checked;
    }
    ;
    function footerSum(props) {
        return (<span>Sum: {props.Sum}</span>);
    }
    function footerAvg(props) {
        return (<span>Average: {props.Average}</span>);
    }
    function load() {
        this.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0];
        if (this.pageSettings.pageSizes) {
            document.querySelector('.e-adaptive-demo')?.classList.add('e-pager-pagesizes');
        }
        else {
            document.querySelector('.e-adaptive-demo')?.classList.remove('e-pager-pagesizes');
        }
    }
    function toolbarClick(args) {
        switch (args.item.id) {
            case grid.element.id + '_pdfexport':
                grid.pdfExport();
                break;
            case grid.element.id + '_excelexport':
                grid.excelExport();
                break;
        }
    }
    return (<div className='control-pane'>
      <div className='control-section'>
        <style>
          {SAMPLE_CSS}
        </style>
        <div className="col-md-9 e-bigger e-adaptive-demo">
          {!Browser.isDevice ? (<div className="e-mobile-layout">
              <div className="e-mobile-content">
                <GridComponent id="adaptivebrowser" dataSource={data} height='100%' ref={(g) => { grid = g; }} enableAdaptiveUI={true} rowRenderingMode={renderingMode} allowFiltering={true} allowSorting={true} allowGrouping={false} showColumnChooser={true} showColumnMenu={true} allowPaging={true} groupSettings={groupOptions} filterSettings={filterOptions} toolbar={toolbarOptions} editSettings={editSettings} pageSettings={{ pageCount: 3, pageSizes: true }} load={load} toolbarClick={toolbarClick} allowExcelExport={true} allowPdfExport={true}>
                  <ColumnsDirective>
                    <ColumnDirective field='OrderID' headerText='Order ID' width='180' isPrimaryKey={true} validationRules={orderidRules}></ColumnDirective>
                    <ColumnDirective field='Freight' headerText='Freight' width='180' format='C2' editType='numericedit' validationRules={validationRule}/>
                    <ColumnDirective field='CustomerName' headerText='Name' width='180' validationRules={validationRule}></ColumnDirective>
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
            </div>) : (<GridComponent id="adaptivedevice" dataSource={data} height='100%' ref={(g) => { grid = g; }} enableAdaptiveUI={true} rowRenderingMode={renderingMode} allowFiltering={true} allowSorting={true} allowGrouping={false} showColumnChooser={true} showColumnMenu={true} allowPaging={true} groupSettings={groupOptions} filterSettings={filterOptions} toolbar={toolbarOptions} editSettings={editSettings} pageSettings={{ pageCount: 3, pageSizes: true }} load={load} toolbarClick={toolbarClick} allowExcelExport={true} allowPdfExport={true}>
              <ColumnsDirective>
                <ColumnDirective field='OrderID' headerText='Order ID' width='180' isPrimaryKey={true} validationRules={orderidRules}></ColumnDirective>
                <ColumnDirective field='Freight' headerText='Freight' width='180' format='C2' editType='numericedit' validationRules={validationRule}/>
                <ColumnDirective field='CustomerName' headerText='Name' width='180' validationRules={validationRule}></ColumnDirective>
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
                    <CheckBoxComponent ref={(scope) => { checkboxObj = scope; }} change={onChange.bind(this)} aria-label="Enable horizontal row mode"></CheckBoxComponent>
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
export default Adaptive;
