import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './editing.css';

/**
 * PivotView Sample with Edit Options.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Quarter' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};

function Editing () {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let pivotObj: PivotViewComponent;

    function onRadioChange(args: any): void {
        let id: string = (args.event.target as HTMLElement).id;
        if (id === 'inline') {
            pivotObj.editSettings.allowCommandColumns = false;
            pivotObj.editSettings.mode = 'Normal';
        } else if (id === 'batch') {
            pivotObj.editSettings.allowCommandColumns = false;
            pivotObj.editSettings.mode = 'Batch';
        } else if (id === 'dialog') {
            pivotObj.editSettings.allowCommandColumns = false;
            pivotObj.editSettings.mode = 'Dialog';
        } else {
            pivotObj.editSettings.allowCommandColumns = true;
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-9 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} showTooltip={false} dataSourceSettings={dataSourceSettings} width={'100%'} height={'290'} gridSettings={{ columnWidth: 140 }} editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' }}>
                    </PivotViewComponent>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', height: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='row' style={{ margin: '0px' }}>
                                            <RadioButtonComponent id="inline" change={onRadioChange.bind(this)} checked={true} label='Inline Editing' name='EditOperation' value="Inline Editing"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='row' style={{ margin: '0px' }}>
                                            <RadioButtonComponent id="batch" change={onRadioChange.bind(this)} label='Batch Editing' name='EditOperation' value="Batch Editing"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='row' style={{ margin: '0px' }}>
                                            <RadioButtonComponent id="dialog" change={onRadioChange.bind(this)} label='Dialog Editing' name='EditOperation' value="Dialog Editing"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='row' style={{ margin: '0px' }}>
                                            <RadioButtonComponent id="cc" change={onRadioChange.bind(this)} label='Command Columns' name='EditOperation' value="Command Columns"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates CRUD operations performed over the raw items of any value cell in a pivot table. Different types of cell editing options are provided to make editing simpler.</p>
            </div>
            <div id="description">
                <p>In the sample, the raw items of any value cell can be viewed in a drill-through dialog by double-clicking the
                    cell. CRUD operations can be performed by double-clicking the cells or using toolbar options. The following
                    CRUD operations can be performed through toolbar operations for normal and batch edits:
                </p>
                <ul>
                    <li><code>Add</code> - To add new record, click <code>Add</code> in the toolbar.</li>
                    <li><code>Edit</code> - To edit record, double click a cell.</li>
                    <li><code>Delete</code> - To delete a record, click <code>Delete</code> in the toolbar after selected a row.</li>
                    <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by clicking <code>Update</code>
                    or <code>Cancel</code> in
                    the toolbar, respectively.</li>
                </ul>
                <p>This CRUD operations can be configured in a pivot table using <code>editSettings</code> in code behind. There are also
                    different modes to manipulate the data source.</p>
                <p>The available modes are:</p>
                <ul>
                    <li><code>Normal</code> - Editing by row.</li>
                    <li><code>Batch</code> - Editing individual cells and bulk updating.</li>
                    <li><code>Dialog</code> - Editing by row with a dialog option.</li>
                    <li><code>Command Columns</code> - An additional column appends to the data grid with icons to perform CRUD
                        operations. Editing using cell double-click is restricted here.</li>
                </ul><br />
                <p>
                    More information on the editing can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/pivotview/editing">
                    documentation section</a>.
                </p>
            </div>
        </div>
    )
}

export default Editing;