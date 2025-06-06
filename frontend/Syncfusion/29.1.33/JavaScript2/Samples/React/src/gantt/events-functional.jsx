import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ContextMenu, Reorder, Resize, ColumnMenu, Toolbar, Edit, Filter, Sort, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
const Events = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let eventLog = useRef(null);
    const taskFields = {
        id: "TaskID",
        name: "TaskName",
        startDate: "StartDate",
        endDate: "EndDate",
        duration: "Duration",
        progress: "Progress",
        dependency: "Predecessor",
        child: "subtasks",
    };
    const columns = [
        { field: "TaskID", width: 80 },
        { field: "TaskName", width: 250 },
        { field: "StartDate" },
        { field: "EndDate" },
        { field: "Duration" },
        { field: "Predecessor" },
        { field: "Progress" },
    ];
    const toolbar = [
        "Add",
        "Edit",
        "Update",
        "Delete",
        "Cancel",
        "ExpandAll",
        "CollapseAll",
        "Search",
    ];
    const editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
    };
    const labelSettings = {
        leftLabel: "TaskName",
    };
    const splitterSettings = {
        columnIndex: 2,
    };
    const projectStartDate = new Date("03/24/2024");
    const projectEndDate = new Date("07/06/2024");
    const created = () => {
        appendElement('Gantt <b>created</b> event called<hr>');
    };
    const load = () => {
        appendElement('Gantt <b>load</b> event called<hr>');
    };
    const dataBound = () => {
        appendElement('Gantt <b>dataBound</b> event called<hr>');
    };
    const toolbarClick = () => {
        appendElement('Gantt <b>toolbarClick</b> event called<hr>');
    };
    const beforeTooltipRender = () => {
        appendElement('Gantt <b>beforeTooltipRender</b> event called<hr>');
    };
    const actionBegin = () => {
        appendElement('Gantt <b>actionBegin</b> event called<hr>');
    };
    const actionComplete = () => {
        appendElement('Gantt <b>actionComplete</b> event called<hr>');
    };
    const cellEdit = () => {
        appendElement('Gantt <b>cellEdit</b> event called<hr>');
    };
    const endEdit = () => {
        appendElement('Gantt <b>endEdit</b> event called<hr>');
    };
    const taskbarEditing = () => {
        appendElement('Gantt <b>taskbarEditing</b> event called<hr>');
    };
    const taskbarEdited = () => {
        appendElement('Gantt <b>taskbarEdited</b> event called<hr>');
    };
    const rowSelecting = () => {
        appendElement('Gantt <b>rowSelecting</b> event called<hr>');
    };
    const rowSelected = () => {
        appendElement('Gantt <b>rowSelected</b> event called<hr>');
    };
    const rowDeselecting = () => {
        appendElement('Gantt <b>rowDeselecting</b> event called<hr>');
    };
    const rowDeselected = () => {
        appendElement('Gantt <b>rowDeselected</b> event called<hr>');
    };
    const columnDragStart = () => {
        appendElement('Gantt <b>columnDragStart</b> event called<hr>');
    };
    const columnDrag = () => {
        appendElement('Gantt <b>columnDrag</b> event called<hr>');
    };
    const columnDrop = () => {
        appendElement('Gantt <b>columnDrop</b> event called<hr>');
    };
    const expanding = () => {
        appendElement('Gantt <b>expanding</b> event called<hr>');
    };
    const expanded = () => {
        appendElement('Gantt <b>expanded</b> event called<hr>');
    };
    const collapsing = () => {
        appendElement('Gantt <b>collapsing</b> event called<hr>');
    };
    const collapsed = () => {
        appendElement('Gantt <b>collapsed</b> event called<hr>');
    };
    const columnMenuClick = () => {
        appendElement('Gantt <b>columnMenuClick</b> event called<hr>');
    };
    const columnMenuOpen = () => {
        appendElement('Gantt <b>columnMenuOpen</b> event called<hr>');
    };
    const contextMenuClick = () => {
        appendElement('Gantt <b>contextMenuClick</b> event called<hr>');
    };
    const contextMenuOpen = () => {
        appendElement('Gantt <b>contextMenuOpen</b> event called<hr>');
    };
    const resizeStart = () => {
        appendElement('Gantt <b>resizeStart</b> event called<hr>');
    };
    const resizing = () => {
        appendElement('Gantt <b>resizing</b> event called<hr>');
    };
    const resizeStop = () => {
        appendElement('Gantt <b>resizeStop</b> event called<hr>');
    };
    const splitterResizeStart = () => {
        appendElement('Gantt <b>splitterResizeStart</b> event called<hr>');
    };
    const splitterResizing = () => {
        appendElement('Gantt <b>splitterResizing</b> event called<hr>');
    };
    const splitterResized = () => {
        appendElement('Gantt <b>splitterResized</b> event called<hr>');
    };
    const recordDoubleClick = () => {
        appendElement('Gantt <b>recordDoubleClick</b> event called<hr>');
    };
    const onTaskbarClick = () => {
        appendElement('Gantt <b>onTaskbarClick</b> event called<hr>');
    };
    const appendElement = (html) => {
        let span = document.createElement('span');
        span.innerHTML = html;
        let log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    const clear = () => {
        eventLog.current.innerHTML = "";
    };
    return (<div className="control-pane">
      <div className="control-section">
        <div className="col-lg-9">
          <GanttComponent id="Events" dataSource={projectNewData} highlightWeekends={true} treeColumnIndex={1} allowSelection={true} allowSorting={true} allowReordering={true} allowResizing={true} enableContextMenu={true} showColumnMenu={true} columns={columns} toolbar={toolbar} editSettings={editSettings} splitterSettings={splitterSettings} taskFields={taskFields} labelSettings={labelSettings} height="410px" created={created.bind(this)} load={load.bind(this)} dataBound={dataBound.bind(this)} toolbarClick={toolbarClick.bind(this)} beforeTooltipRender={beforeTooltipRender.bind(this)} actionBegin={actionBegin.bind(this)} actionComplete={actionComplete.bind(this)} cellEdit={cellEdit.bind(this)} endEdit={endEdit.bind(this)} taskbarEditing={taskbarEditing.bind(this)} taskbarEdited={taskbarEdited.bind(this)} rowSelecting={rowSelecting.bind(this)} rowSelected={rowSelected.bind(this)} rowDeselecting={rowDeselecting.bind(this)} rowDeselected={rowDeselected.bind(this)} columnDragStart={columnDragStart.bind(this)} columnDrag={columnDrag.bind(this)} columnDrop={columnDrop.bind(this)} expanding={expanding.bind(this)} expanded={expanded.bind(this)} collapsing={collapsing.bind(this)} collapsed={collapsed.bind(this)} columnMenuClick={columnMenuClick.bind(this)} columnMenuOpen={columnMenuOpen.bind(this)} contextMenuClick={contextMenuClick.bind(this)} contextMenuOpen={contextMenuOpen.bind(this)} resizeStart={resizeStart.bind(this)} resizing={resizing.bind(this)} resizeStop={resizeStop.bind(this)} splitterResizeStart={splitterResizeStart.bind(this)} splitterResizing={splitterResizing.bind(this)} splitterResized={splitterResized.bind(this)} recordDoubleClick={recordDoubleClick.bind(this)} onTaskbarClick={onTaskbarClick.bind(this)} projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field="TaskID" width="80"></ColumnDirective>
              <ColumnDirective field="TaskName" width="250"></ColumnDirective>
              <ColumnDirective field="StartDate"></ColumnDirective>
              <ColumnDirective field="EndDate"></ColumnDirective>
              <ColumnDirective field="Duration"></ColumnDirective>
              <ColumnDirective field="Predecessor"></ColumnDirective>
              <ColumnDirective field="Progress"></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[
            Selection,
            DayMarkers,
            ContextMenu,
            Reorder,
            Resize,
            ColumnMenu,
            Toolbar,
            Edit,
            Filter,
            Sort,
        ]}/>
          </GanttComponent>
        </div>
        <div className="col-lg-3 property-section">
          <PropertyPane title="Event Trace">
            <table id="property" className="property-panel-table" title="Event Trace" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <div className="eventarea" style={{ height: "346px", overflow: "auto" }}>
                    <span className="EventLog" id="EventLog" style={{ wordBreak: "normal" }} ref={eventLog}></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", padding: "20px 10px 10px 80px" }}>
                  <div>
                    <ButtonComponent onClick={clear.bind(this)}>
                      {" "}
                      Clear{" "}
                    </ButtonComponent>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates all the events that occur on all the Gantt
          operations with the help of Event Trace panel.
        </p>
      </div>

      <div id="description">
        <p>
          The Gantt triggers events based on its actions. The events can be used
          as an extension point to perform custom operations.
        </p>
        <p>
          In this demo, perform Gantt actions such as load, created, dataBound,
          toolbarClick, beforeTooltipRender, actionBegin, actionComplete,
          cellEdit, endEdit, taskbarEditing, taskbarEdited, rowSelecting,
          rowSelected, rowDeselecting, rowDeselected, columnDragStart,
          columnDrag, columnDrop, expanding, expanded, collapsing, collapsed,
          columnMenuClick, columnMenuOpen, contextMenuClick, contextMenuOpen,
          resizeStart, resizing, resizeStop, splitterResizeStart,
          splitterResizing, splitterResized, recordDoubleClick, onTaskbarClick
          and see the <strong>Event Trace</strong> panel for the events emitted.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise
          modules. To use a selection, inject the
          <code>Selection</code> module using the{" "}
          <code>Gantt.Inject(Selection)</code> method.To use a sorting, inject
          the
          <code>Sort</code> module using the <code>Gantt.Inject(Sort)</code>{" "}
          method.To reorder column, inject the
          <code>Reorder</code> module using the{" "}
          <code>Gantt.Inject(Reorder)</code> method.To resize column width,
          inject the
          <code>Resize</code> module using the <code>Gantt.Inject(Resize)</code>{" "}
          method.To use a contextmenu, inject the
          <code>Contextmenu</code> module using the{" "}
          <code>Gantt.Inject(Contextmenu)</code> method.To use a columnmenu,
          inject the
          <code>ColumnMenu</code> module using the{" "}
          <code>Gantt.Inject(ColumnMenu)</code> method.To use a toolbar, inject
          the
          <code>Toolbar</code> module using the{" "}
          <code>Gantt.Inject(Toolbar)</code> method.To use a edit, inject the
          <code>Edit</code> module using the <code>Gantt.Inject(Edit)</code>{" "}
          method.To use markers, inject the
          <code>DayMarkers</code> module using the{" "}
          <code>Gantt.Inject(DayMarkers)</code> method.
        </p>
      </div>
    </div>);
};
export default Events;
