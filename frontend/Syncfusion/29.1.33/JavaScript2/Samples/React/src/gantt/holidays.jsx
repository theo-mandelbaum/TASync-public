import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, HolidaysDirective, HolidayDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
export class Holidays extends SampleBase {
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
    projectStartDate = new Date('03/24/2024');
    projectEndDate = new Date('07/06/2024');
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Holidays' dataSource={projectNewData} highlightWeekends={true} treeColumnIndex={1} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px' projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
            </ColumnsDirective>
            <HolidaysDirective>
                <HolidayDirective from='04/04/2024' to='04/04/2024' label='Local Holiday'></HolidayDirective>
                <HolidayDirective from='04/19/2024' to='04/19/2024' label='Good Friday'></HolidayDirective>
                <HolidayDirective from='04/30/2024' to='04/30/2024' label='Release Holiday'></HolidayDirective>
            </HolidaysDirective>
            <Inject services={[Selection, DayMarkers]}/>
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample visualizes how to define the holidays in between the project timeline. </p>
        </div>

        <div id="description">
        <p>
          In this example,<a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#holidays">holidays</a> are displayed with vertical bar with the desired text using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/holidayModel/#label">label</a> property. You can also mention the continuous holidays by specifying the <code>from</code> and <code>to</code> range. For single holiday, you can define from value alone. Holidays are defined as an array of object collection, so that we can display more than one holiday in the project.
        </p>
        <p>
          You can even assign the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/holidayModel/#cssclass">cssClass</a> to each holiday to change the default color of label and background.
        </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
            <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
        </div>
      </div>);
    }
}
