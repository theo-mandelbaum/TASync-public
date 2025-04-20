import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Page, Selection, Inject, Filter } from '@syncfusion/ej2-react-grids';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { data } from './data';
import { SampleBase } from '../common/sample-base';
export class SelectionAPI extends SampleBase {
    selectionsettings = { type: 'Multiple' };
    filterSettings = { type: 'Excel' };
    ToolbarInstance;
    checkboxObj;
    gridInstance;
    selectingEvents(e) {
        if (this.selectionSettings.allowColumnSelection) {
            e.cancel = true;
        }
    }
    click(e) {
        let element = e.target;
        let options = {
            type: { class: '.e-gtype', val: (mode) => mode === 'Single' ? 'Multiple' : 'Single' },
            mode: { class: '.e-gmode', val: (mode) => mode === 'Row' ? 'Cell' : 'Row' },
        };
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        let isType = element.parentElement.parentElement.classList.contains('e-gtype');
        let opt = options[isType ? 'type' : 'mode'];
        let parent = document.querySelector('.e-gridlist');
        let typeEle = parent.querySelector(opt.class + ' .e-tbar-btn-text');
        let type = typeEle.innerHTML;
        let val = opt.val(type);
        typeEle.innerHTML = val;
        this.gridInstance.selectionSettings = isType ? { type: val } : { mode: val };
        this.gridInstance.refresh();
    }
    setColumnSelection(args) {
        this.gridInstance.clearSelection();
        if (args.checked) {
            this.ToolbarInstance.enableItems(1, false);
            this.gridInstance.selectionSettings.allowColumnSelection = true;
        }
        else {
            this.ToolbarInstance.enableItems(1, true);
            this.gridInstance.selectionSettings.allowColumnSelection = false;
        }
    }
    checkboxTemp() {
        return (<CheckBoxComponent label='Enable Column Selection' ref={(columnSelection) => { this.checkboxObj = columnSelection; }} change={this.setColumnSelection.bind(this)}/>);
    }
    template = this.checkboxTemp;
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='e-statustext'>Selection Type / Selection Mode</div>
                    <ToolbarComponent className="e-gridlist" ref={toolbar => this.ToolbarInstance = toolbar} onClick={this.click.bind(this)}>
                        <ItemsDirective>
                            <ItemDirective text="Multiple" cssClass='e-gtype'/>
                            <ItemDirective text="Row" cssClass='e-gmode'/>
                            <ItemDirective template={this.template.bind(this)}/>
                        </ItemsDirective>
                    </ToolbarComponent>
                    <br />
                    <GridComponent dataSource={data} ref={grid => this.gridInstance = grid} allowSorting={true} allowFiltering={true} filterSettings={this.filterSettings} enableHover={false} allowPaging={true} pageSettings={{ pageCount: 5 }} selectionSettings={this.selectionsettings} rowSelecting={this.selectingEvents} cellSelecting={this.selectingEvents}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="Right" isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right'/>
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right'/>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="Right"></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Selection, Sort, Filter]}/>
                    </GridComponent>
                </div>
                <div id="action-description">
                <p>This sample demonstrates the selection functionality of the Grid, you can select the type and mode from the desired button</p>
                </div>
                <div id='description'>
                    <p>
                        Selection provides an interactive support to highlight the row or cell or column that you select. Selection can be done through simple
            Mouse down or Keyboard interaction. To enable selection, set <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid#allowselection">
                            allowSelection
        </a></code> as true.
        </p>
                    <p>Grid component supports two types of selection which can be set using <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#type">
                        selectionSettings-&gt;type
        </a></code> property.
            They are,</p>
                    <ul>
                        <li><code>Single</code> - Enabled by default. Allows the user to select single row/cell/column at a time.</li>
                        <li><code>Multiple</code> - Allows the user to select more than one row/cell/column at a time.</li>
                    </ul>
                    <p>Also, supports three modes of selection which can be set using <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#mode">
                        selectionSettings-&gt;mode
        </a></code> property. They
            are,
        </p>
                    <ul>
                        <li><code>Row</code> - Enabled by default. Enables row selection in Grid.</li>
                        <li><code>Cell</code> - Enables cell selection in Grid.</li>
                        <li><code>Both</code> - Enables both row and cell selection in Grid. Clicking any cell will select both the row and cell
                simultaneously
            </li>
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
                    <p>In this demo, click the toolbar options to toggle between the selection type and selection mode available in Grid.</p>
                    <p>
                        More information on the selection configuration can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/grid/selection.html#selection"> documentation section</a>.
        </p>

                </div>
            </div>);
    }
}
