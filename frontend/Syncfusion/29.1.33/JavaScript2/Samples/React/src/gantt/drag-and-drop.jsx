import * as React from 'react';
import { GanttComponent, Inject, Edit, Selection, ColumnsDirective, ColumnDirective, RowDD } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
export class DragAndDrop extends SampleBase {
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
    selectionSettings = {
        type: 'Multiple'
    };
    splitterSettings = {
        columnIndex: 3
    };
    editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    projectStartDate = new Date('03/25/2024');
    projectEndDate = new Date('07/06/2024');
    labelSettings = {
        leftLabel: 'TaskName'
    };
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='DragandDrop' dataSource={projectNewData} taskFields={this.taskFields} height='410px' treeColumnIndex={1} allowRowDragAndDrop={true} highlightWeekends={true} labelSettings={this.labelSettings} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} allowTaskbarDragAndDrop={true} splitterSettings={this.splitterSettings} editSettings={this.editSettings} selectionSettings={this.selectionSettings}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
            </ColumnsDirective>
            
            <Inject services={[Edit, RowDD, Selection]}/>
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the Gantt component with the row drag and drop feature. You can rearrange the gantt rows by using drag icon in left side of gantt column. Here you can perform drag and drop the gantt rows in to required position.</p>
        </div>

        <div id="description">
        <p>Row drag and drop feature can be enabled by settting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#allowrowdraganddrop">
            allowRowDragAndDrop</a> property as true. In this demo, taskbar drag and drop between rows can be enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#allowtaskbardraganddrop">
            allowTaskbarDragAndDrop</a> as true.</p>
        <p>
         Gantt component features are segregated into individual feature-wise modules. To use row, drag and drop feature we need to inject <code>RowDD</code> and <code>Edit</code> modules.
        </p>
        </div>
      </div>);
    }
}
