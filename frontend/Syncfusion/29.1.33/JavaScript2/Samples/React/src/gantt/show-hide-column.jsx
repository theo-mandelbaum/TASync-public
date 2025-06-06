import * as React from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class ShowHideColumn extends SampleBase {
    ganttObj;
    dropdownObj;
    hideButtonObj;
    showButtonObj;
    columnsName = [
        { id: 'TaskID', name: 'ID' },
        { id: 'StartDate', name: 'Start Date' },
        { id: 'EndDate', name: 'End Date' },
        { id: 'Duration', name: 'Duration' },
        { id: 'Predecessor', name: 'Dependency' },
        { id: 'Progress', name: 'Progress' }
    ];
    change(args) {
        let columnName = args.value.toString();
        let column = this.ganttObj.treeGrid.grid.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            this.showButtonObj.disabled = true;
            this.hideButtonObj.disabled = false;
        }
        else {
            this.hideButtonObj.disabled = true;
            this.showButtonObj.disabled = false;
        }
    }
    hideButtonClick() {
        if (this.dropdownObj.value) {
            let dropValue = this.dropdownObj.value.toString();
            let columnName = this.ganttObj.treeGrid.getColumnByField(dropValue).headerText;
            this.ganttObj.hideColumn(columnName);
            this.hideButtonObj.disabled = true;
            this.showButtonObj.disabled = false;
            let hiddenColumns = document.getElementById('hiddencolumns');
            hiddenColumns.value = hiddenColumns.value + columnName + '\n';
        }
    }
    showButtonClick() {
        if (this.dropdownObj.value) {
            let dropValue = this.dropdownObj.value.toString();
            let columnName = this.ganttObj.treeGrid.getColumnByField(dropValue).headerText;
            this.ganttObj.showColumn(columnName);
            this.showButtonObj.disabled = true;
            this.hideButtonObj.disabled = false;
            let hiddenColumns = document.getElementById('hiddencolumns');
            hiddenColumns.value = hiddenColumns.value.replace(columnName + '\n', '');
        }
    }
    taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    labelSettings = {
        leftLabel: 'TaskName'
    };
    splitterSettings = {
        columnIndex: 4
    };
    projectStartDate = new Date('03/24/2024');
    projectEndDate = new Date('07/06/2024');
    render() {
        return (<div className='control-pane'>
        <div className='col-md-9 control-section'>
        
          <GanttComponent id='ColumnMenu' treeColumnIndex={1} allowFiltering={true} allowSorting={true} ref={gantt => this.ganttObj = gantt} allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={this.splitterSettings} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px' projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <Inject services={[Selection]}/>
          </GanttComponent>
       </div>

        <div className='col-md-3 property-section'>
        <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                  <tr>
                  <td style={{ width: '30%' }}>
                      <div> Column </div>
                    </td>
                    <td style={{ width: '70%', paddingRight: '10px' }}>
                      <div id='columnddl'>
                         <DropDownListComponent width="120px" id="dropDown" change={this.change.bind(this)} dataSource={this.columnsName} fields={{ text: 'name', value: 'id' }} ref={dropdown => this.dropdownObj = dropdown}/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                     <td style={{ width: '30%' }}>
                        <div>
                          <ButtonComponent id='hide' ref={button => this.hideButtonObj = button} onClick={this.hideButtonClick.bind(this)}> Hide </ButtonComponent>
                        </div>
                     </td>
                     <td style={{ width: '70%' }}>
                        <div>
                          <ButtonComponent id='show' ref={button => this.showButtonObj = button} onClick={this.showButtonClick.bind(this)}> Show </ButtonComponent>
                        </div>
                     </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div style={{ paddingTop: '10px' }}> Hidden Columns</div>
                    </td>
                    <td style={{ width: '70%', padding: '10px 10px 10px 0px' }}>
                      <div>
                        <textarea id='hiddencolumns' style={{ resize: 'none', height: '65px', backgroundColor: '#fff', padding: '6px' }} className='form-control'></textarea>
                      </div>
                    </td>
                  </tr>
                  </tbody>
              </table>
          </PropertyPane>
        </div>
        <div id="action-description">
        <p>This sample demonstrates dynamic show/hide columns feature of Gantt. Select column name from the properties panel, 
        and then click hide/show to toggle visibility.
        </p>
        </div>

        <div id="description">
        <p>The Gantt column can be shown or hidden dynamically using the <code>showColumn</code> and <code>hideColumn</code> methods of the Gantt.</p>
        <p>In this demo, the columns can be shown and hidden by selecting the column name in dropdown. Click the Show or Hide button to toggle the visibility.
          The visibility of column is toggled based on the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#headertext">columns -&gt; headerText</a> value.
        </p>

        <p>The <a target="_blank" href="https://ej2.syncfusion.com/raect/documentation/api/gantt/columnModel/#visible">columns -&gt; visible</a> property specifies the visibility of a column.
          To hide a column at the initial rendering, set the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#visible">columns -&gt; visible</a> property to false.
        </p>
        </div>
    </div>);
    }
}
