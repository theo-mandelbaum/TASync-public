import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, EventMarkersDirective, EventMarkerDirective, Selection, DayMarkers, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

const EventMarkers = () => {
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
  const eventMarkerDay1: Date = new Date('04/02/2024');
  const eventMarkerDay2: Date = new Date('04/09/2024');
  const eventMarkerDay3: Date = new Date('04/19/2024');
  const eventMarkerDay4: Date = new Date('05/23/2024');
  const eventMarkerDay5: Date = new Date('06/20/2024');
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const projectStartDate: Date = new Date('03/24/2024');
  const projectEndDate: Date = new Date('07/06/2024');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='EventMarkers' dataSource={projectNewData} highlightWeekends={true}
          taskFields={taskFields} labelSettings={labelSettings} height='410px'
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
          </ColumnsDirective>
          <EventMarkersDirective>
            <EventMarkerDirective day={eventMarkerDay1}></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay2} label='Design phase' ></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay3} label='Research phase' ></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay4} label='Production phase' ></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay5} label='Sales and marketing phase' ></EventMarkerDirective>
          </EventMarkersDirective>
          <Inject services={[Selection, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample visualizes how to notify the important dates in the project timeline.</p>
      </div>
      <div id="description">
        <p>
          In this example, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#eventmarkers">eventMarkers</a> are used like a bookmark to show the different stages of the project life cycle. You can show the desired text on the date. The Event Markers model has the below properties to customize the marker:
          <li><code>cssClass</code>: Used to assign external CSS styles to that particular marker.</li>
          <li><code>day</code>: Used to set date of the event marker.</li>
          <li><code>label</code>: The desired text can be shown on the vertical line using this property.</li>
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
          <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
      </div>
    </div>
  )
}
export default EventMarkers;
