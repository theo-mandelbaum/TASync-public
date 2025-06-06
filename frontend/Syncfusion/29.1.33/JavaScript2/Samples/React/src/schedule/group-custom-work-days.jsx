import * as React from 'react';
import { WorkWeek, Month, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject } from '@syncfusion/ej2-react-schedule';
import { addClass } from '@syncfusion/ej2-base';
import './group-custom-work-days.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
/**
 * schedule resources group-custom-work-days sample
 */
export class GroupCustomWorkDays extends SampleBase {
    scheduleObj;
    data = extend([], dataSource.doctorData, null, true);
    resourceData = [
        { text: 'Will Smith', id: 1, color: '#ea7a57', workDays: [1, 2, 4, 5], startHour: '08:00', endHour: '15:00' },
        { text: 'Alice', id: 2, color: 'rgb(53, 124, 210)', workDays: [1, 3, 5], startHour: '08:00', endHour: '17:00' },
        { text: 'Robson', id: 3, color: '#7fa900', startHour: '08:00', endHour: '16:00' }
    ];
    getDoctorImage(value) {
        return this.getDoctorName(value).replace(' ', '-').toLowerCase();
    }
    getDoctorName(value) {
        return ((value.resourceData) ?
            value.resourceData[value.resource.textField] :
            value.resourceName);
    }
    getDoctorLevel(value) {
        let resourceName = this.getDoctorName(value);
        return (resourceName === 'Will Smith') ? 'Cardiologist' : (resourceName === 'Alice') ? 'Neurologist' : 'Orthopedic Surgeon';
    }
    onActionBegin(args) {
        let isEventChange = (args.requestType === 'eventChange');
        if ((args.requestType === 'eventCreate' && args.data.length > 0) || isEventChange) {
            let eventData = (isEventChange) ? args.data : args.data[0];
            let eventField = this.scheduleObj.eventFields;
            let startDate = eventData[eventField.startTime];
            let endDate = eventData[eventField.endTime];
            let resourceIndex = [1, 2, 3].indexOf(eventData.DoctorId);
            args.cancel = !this.isValidTime(startDate, endDate, resourceIndex);
            if (!args.cancel) {
                args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate, resourceIndex);
            }
        }
    }
    isValidTime(startDate, endDate, resIndex) {
        let resource = this.scheduleObj.getResourcesByIndex(resIndex);
        let startHour = parseInt(resource.resourceData.startHour.toString().slice(0, 2), 10);
        let endHour = parseInt(resource.resourceData.endHour.toString().slice(0, 2), 10);
        return (startHour <= startDate.getHours() && endHour >= endDate.getHours());
    }
    onPopupOpen(args) {
        if (args.target && args.target.classList.contains('e-work-cells')) {
            args.cancel = !args.target.classList.contains('e-work-hours');
        }
    }
    onRenderCell(args) {
        if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
            addClass([args.element], ['willsmith', 'alice', 'robson'][parseInt(args.element.getAttribute('data-group-index'), 10)]);
        }
    }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap"><div className={"resource-image " + this.getDoctorImage(props)}></div>
      <div className="resource-detail"><div className="resource-name">{this.getDoctorName(props)}</div>
        <div className="resource-designation">{this.getDoctorLevel(props)}</div></div></div>);
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent ref={schedule => this.scheduleObj = schedule} cssClass='custom-work-days' width='100%' height='650px' selectedDate={new Date(2021, 3, 6)} currentView='WorkWeek' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} eventSettings={{
                dataSource: this.data,
                fields: {
                    subject: { title: 'Service Type', name: 'Subject' },
                    location: { title: 'Patient Name', name: 'Location' },
                    description: { title: 'Summary', name: 'Description' },
                    startTime: { title: 'From', name: 'StartTime' },
                    endTime: { title: 'To', name: 'EndTime' }
                }
            }} actionBegin={this.onActionBegin.bind(this)} popupOpen={this.onPopupOpen.bind(this)} renderCell={this.onRenderCell.bind(this)} group={{ resources: ['Doctors'] }}>
              <ResourcesDirective>
                <ResourceDirective field='DoctorId' title='Doctor Name' name='Doctors' dataSource={this.resourceData} textField='text' idField='id' groupIDField='groupId' colorField='color' workDaysField='workDays' startHourField='startHour' endHourField='endHour'>
                </ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='WorkWeek'/>
                <ViewDirective option='Month'/>
              </ViewsDirective>
              <Inject services={[WorkWeek, Month]}/>
            </ScheduleComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This demo showcases the different available dates of doctors and their appointments on those days.</p>
        </div>
        <div id="description">
          <p>
            In this demo, different working days are assigned by passing the <code>workDays</code> collection for each doctor to show their available dates.
            On each of their available dates, their daily available time range is also depicted by mentioning the <code>startHour</code> and
            <code>endHour</code> for each doctor. These values needs to be provided along with the resource <code>dataSource</code> by mapping the appropriate fields namely
            <code>workDaysField</code>, <code>startHourField</code> and <code>endHourField</code>.
          </p>
          <p>
            Here, we have customized the background cell color of the available times of each doctor using <code>renderCell</code> event to denote that,
            only those timeslots are available for booking appointments. All other cells are simply read-only and no appointments can be booked on it.
            Also, if the applicable timeslot already contains an appointment, then no more appointments can be added to that cell which has been prevented
            by making use of the <code>isSlotAvailable</code> function within the <code>actionBegin</code> event checking for <code>eventCreate</code> and
            <code>eventChange</code> request type. The resource header is customized by making use of the <code>resourceHeaderTemplate</code> option.
          </p>
        </div>
      </div>);
    }
}
