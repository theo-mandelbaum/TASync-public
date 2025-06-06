import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Page, Selection, Inject, Toolbar, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';
function Selectioning() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    const filterSettings = { type: 'Excel' };
    const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const customeridRule = { required: true, minLength: 5 };
    const orderidRules = { required: true, number: true };
    const freightRules = { required: true, min: 0 };
    return (<div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={data} allowPaging={true} pageSettings={{ pageCount: 5 }} selectionSettings={{ type: 'Multiple' }} allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="Right" validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
                        <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="Right" editType='datepickeredit' type='date'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Selection, Sort, Toolbar, Filter, Edit]}/>
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionality of the selection in Grid, which allows you to select row or cell or column through simple mouse down or keyboard interaction.</p>
            </div>

            <div id='description'>
                <p>
                    Selection provides an interactive support to highlight the row or cell or column that you select. Selection can be done through a simple
                    Mouse down or Keyboard interaction. To enable selection, set <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid#allowselection">
                        allowSelection
                    </a></code> as true.
                </p>
                <p>Grid component supports two types of selection which can be set using <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#type">
                    selectionSettings-&gt;type
                </a></code> property.
                    They are</p>
                <ul>
                    <li><code>Single</code> - Enabled by default. Allows the user to select single row/cell/column at a time.</li>
                    <li><code>Multiple</code> - Allows the user to select more than one row/cell/column at a time.</li>
                </ul>
                <p>Also, supports three modes of selection which can be set using <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#mode">
                    selectionSettings-&gt;mode
                </a></code> property. They are
                </p>
                <ul>
                    <li><code>Row</code> - Enabled by default. Enables the row selection in Grid.</li>
                    <li><code>Cell</code> - Enables the cell selection in Grid.</li>
                    <li><code>Both</code> - Enables both the row and cell selection in Grid. Clicking any cell will select both row and cell
                        simultaneously</li>
                </ul>
                <p>To perform the column selection, enable the <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#allowcolumnselection">
                    selectionSettings-&gt;allowColumnSelection
                </a></code> property.</p>
                <p>To perform the multi-selection, hold <strong>CTRL</strong> key and click the desired rows/cells/columns. To select range of rows/cells/columns,
                    hold <strong>SHIFT</strong> key and click the rows/cells/columns.</p>
                <p>While using the Grid in a touch device environment, there is an option for multi-selection through a single tap on the
                    row and it will show a popup with the multi-selection symbol. Tap the icon to enable multi-selection in a single
                    tap.
                </p>
                <p>In this demo, multiple row selection is enabled, click any row to select.</p>

                <p>
                    More information on the selection configuration can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/selection.html#selection"> documentation section</a>.
                </p>

            </div>
        </div>);
}
export default Selectioning;
