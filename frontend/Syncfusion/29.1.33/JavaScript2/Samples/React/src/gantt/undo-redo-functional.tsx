import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, Filter, Sort, ColumnMenu, Resize,Edit,Reorder,UndoRedo,ContextMenu, ColumnsDirective, ColumnDirective,Toolbar,DayMarkers } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

const GanttUndoRedo = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const undoRedoActions: any = ['Sorting','Add','ColumnReorder','ColumnResize','ColumnState','Delete','Edit','Filtering','Indent','Outdent','NextTimeSpan','PreviousTimeSpan','RowDragAndDrop','Search'];

  const splitterSettings: any = {
    columnIndex: 4
};
const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
const toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Search', 'Undo', 'Redo'];
  const projectStartDate: Date = new Date('03/24/2024');
  const projectEndDate: Date = new Date('07/06/2024');
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ColumnMenu' treeColumnIndex={1} showColumnMenu={true} allowFiltering={true} allowSorting={true}
            allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={splitterSettings}
            taskFields={taskFields} labelSettings={labelSettings} height='410px' enableUndoRedo={true} enableContextMenu={true}
            allowReordering={true} editSettings={editSettings} toolbar={toolbar} undoRedoActions={undoRedoActions}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='100' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Filter, Sort, ColumnMenu, Resize,Edit,Reorder,UndoRedo,ContextMenu, Toolbar,DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This example showcases the undo-redo functionality within the Gantt Chart, offering users the flexibility to revert or reapply their latest actions on the Gantt Chart.</p>
        </div>
        <div id="description">
          <p>
            Undo feature enables users to revert the most recent action performed in the Gantt Chart. It helps in undo the changes made to tasks, dependencies, or other elements within the Gantt Chart.
          </p>
          <p>
            Redo feature can reapply an action that was previously undone using the Undo feature. This allows users to revert their decision to undo an action.
          </p>
          <p>
            To undo a recent action, you can either press the Undo keyboard shortcut(Ctrl + Z) or click on the Undo toolbar option. To reapply an action that was undone, you can use the Redo keyboard shortcut(Ctrl + Y) or click on the Redo toolbar option.
          </p>
          <p>
            You can specify the actions to be restored using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#undoredoactions">
            undoRedoActions</a> property, such as <code>Edit</code>, <code>Add</code>, <code>Delete</code>, <code>Sorting</code>, <code>ColumnReorder</code>, <code>ColumnResize</code>, <code>Search</code>, <code>Filtering</code>, <code>ZoomIn</code>, <code>ZoomOut</code>, <code>ZoomToFit</code>, <code>ColumnState</code>, <code>Indent</code>, <code>Outdent</code>, <code>RowDragAndDrop</code>, <code>TaskbarDragAndDrop</code>, <code>PreviousTimeSpan</code>, <code>NextTimeSpan</code>.
          </p>
          <p>
            Additionally, you can also define number of undo/redo actions that should be stored. This setting can be adjusted using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#undoredostepscount">
            undoRedoStepsCount</a> property. By default <code>undoRedoStepsCount</code> value is 10.
          </p>
          <p>
            In this demo, the Undo-Redo feature is enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enableundoredo">
            enableUndoRedo</a> to true.
          </p>
          <p>Gantt features are segregated into individual feature-wise modules. To use column menu feature, we need to inject <code>UndoRedo</code> module into the <code>services</code>.</p>
        </div>

      </div>
    )
  }
export default GanttUndoRedo;
