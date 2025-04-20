import * as React from 'react';
import { GanttComponent, Inject, EventMarkersDirective, EventMarkerDirective, Selection, DayMarkers, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
export class EventMarkers extends SampleBase {
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
    eventMarkerDay1 = new Date('04/02/2024');
    eventMarkerDay2 = new Date('04/09/2024');
    eventMarkerDay3 = new Date('04/19/2024');
    eventMarkerDay4 = new Date('05/23/2024');
    eventMarkerDay5 = new Date('06/20/2024');
    labelSettings = {
        leftLabel: 'TaskName'
    };
    projectStartDate = new Date('03/24/2024');
    projectEndDate = new Date('07/06/2024');
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='EventMarkers' dataSource={projectNewData} highlightWeekends={true} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px' projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <EventMarkersDirective>
              <EventMarkerDirective day={this.eventMarkerDay1}></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay2} label='Design phase'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay3} label='Research phase'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay4} label='Production phase'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay5} label='Sales and marketing phase'></EventMarkerDirective>
            </EventMarkersDirective>
            <Inject services={[Selection, DayMarkers]}/>
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
      </div>);
    }
}
