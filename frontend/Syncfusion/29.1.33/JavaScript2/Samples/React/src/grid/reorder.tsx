import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Reorder, Inject, Sort, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit} from '@syncfusion/ej2-react-grids';
import { employeeData } from './data';
import { SampleBase } from '../common/sample-base';

export class Reordering extends SampleBase<{}, {}> {
    public filterSettings: FilterSettingsModel = {type: 'Excel'};
    public toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    public firstnameRule: Object = { required: true, minLength: 5};
    public employeeidRules: Object = { required: true, number: true };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={employeeData} allowReordering={true} allowSorting={true} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings} toolbar={this.toolbar}>
                        <ColumnsDirective>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' width='150' textAlign="Right" validationRules={this.employeeidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='FirstName' headerText='Name' width='140' validationRules={this.firstnameRule}></ColumnDirective>
                            <ColumnDirective field='Title' headerText='Title' width='170' />
                            <ColumnDirective field='HireDate' headerText='Hired Date' width='120' format='yMd' textAlign="Right" editType='datepickeredit' type='date'/>
                            <ColumnDirective field='ReportsTo' headerText='Reports To' width='120'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Reorder, Sort, Toolbar, Filter, Edit]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates reordering of the Grid columns. You can reorder columns by simply drag and drop in the desired column position. 
    </p>
                </div>
                <div id='description'>               
                    <p>
                        Reordering can be enabled by setting  <code><a target='_blank' className='code'
                            href='https://ej2.syncfusion.com/react/documentation/api/grid/#allowreordering'>
                            allowReordering</a></code> property as true. Reordering can be done by drag and drop the column header from one index to another index within the Grid.</p>

                    <p>The location in which the column to be placed, will be indicated by two arrows symbols.</p>

                    <p>In this demo, you can reorder columns by drag and drop the column to the desired column.
          </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use Reordering feature, we need to inject <code>Reorder</code> modeule into the <code>services</code></p>

                    <p>
                        More information on the Reordering feature configuration can be found in this
            <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/grid/#allowreordering'> documentation section</a>.
          </p>
                </div>
            </div>
        )
    }
}