import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Month, Week, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { applyCategoryColor } from './helper';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Schedule Holiday Calendar sample
 */
export class HolidayCalendar extends SampleBase {
    scheduleObj;
    toastObj;
    holidayEventCollection = true;
    holidayListCollection = true;
    data = extend([], dataSource.scheduleEvent, null, true);
    holidayList = extend([], dataSource.holidayList, null, true);
    updateHolidayEventCollection(args) {
        this.holidayEventCollection = args.checked;
        this.scheduleObj?.refreshEvents();
    }
    ;
    updateHolidayListCollection(args) {
        this.holidayListCollection = args.checked;
        this.scheduleObj?.refreshEvents();
    }
    ;
    isEventWithinHolidayRange(eventStartDate, eventEndDate) {
        for (let holiday of this.holidayList) {
            const holidayStartDate = new Date(holiday.StartTime);
            const holidayEndDate = new Date(holiday.EndTime);
            if ((eventStartDate >= holidayStartDate &&
                eventStartDate <= holidayEndDate) ||
                (eventEndDate >= holidayStartDate && eventEndDate <= holidayEndDate) ||
                (eventStartDate <= holidayStartDate && eventEndDate >= holidayEndDate)) {
                return true;
            }
        }
        return false;
    }
    ;
    showToastForAction(actionName, holidayDateRange) {
        if (!holidayDateRange)
            return;
        const messages = {
            resizeStop: 'You cannot resize an event within the holiday date range',
            dragStop: 'You cannot drop an event within the holiday date range',
            eventCreate: 'You cannot add an event within the holiday date range',
            eventChange: 'You cannot edit an event within the holiday date range',
        };
        if (messages[actionName] && this.toastObj) {
            this.toastObj.content = messages[actionName];
            this.toastObj.show();
        }
    }
    ;
    onActionBegin(args) {
        const { requestType, data } = args;
        const isCreateOrChange = requestType === 'eventCreate' || requestType === 'eventChange';
        if (isCreateOrChange) {
            const eventData = requestType === 'eventCreate' ? data[0] : data;
            const adjustedEndTime = eventData.IsAllDay
                ? new Date(eventData.EndTime.setMinutes(eventData.EndTime.getMinutes() - 1))
                : eventData.EndTime;
            const isHolidayDateRange = !this.holidayEventCollection &&
                !eventData.RecurrenceRule &&
                this.isEventWithinHolidayRange(eventData.StartTime, adjustedEndTime);
            args.cancel = isHolidayDateRange;
            this.showToastForAction(requestType, isHolidayDateRange);
        }
    }
    ;
    onEventRender(args) {
        const event = args.data;
        if (!this.holidayEventCollection) {
            if (!event.isHoliday && event.IsAllDay) {
                event.EndTime.setMinutes(event.EndTime.getMinutes() - 1);
            }
            args.cancel =
                !event.isHoliday &&
                    this.isEventWithinHolidayRange(event.StartTime, event.EndTime);
        }
        if (event.isHoliday && !this.holidayListCollection) {
            args.cancel = true;
        }
        applyCategoryColor(args, this.scheduleObj?.currentView);
    }
    ;
    clickOnHoliday(args) {
        args.cancel =
            !this.holidayEventCollection &&
                this.isEventWithinHolidayRange(args.startTime, args.endTime.setMinutes(args.endTime.getMinutes() - 1));
    }
    ;
    onEventDragOrResize(args) {
        const isHolidayDateRange = !this.holidayEventCollection &&
            this.isEventWithinHolidayRange(args.data.StartTime, args.data.EndTime.setMinutes(args.data.EndTime.getMinutes() - 1));
        args.cancel = isHolidayDateRange;
        this.showToastForAction(args.name, isHolidayDateRange);
    }
    ;
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent height='100%' ref={(schedule) => this.scheduleObj = schedule} selectedDate={new Date(2024, 7, 5)} cssClass='schedule-holiday-calendar' rowAutoHeight={true} eventSettings={{ dataSource: this.data.concat(this.holidayList) }} eventRendered={this.onEventRender.bind(this)} actionBegin={this.onActionBegin.bind(this)} cellClick={this.clickOnHoliday.bind(this)} cellDoubleClick={this.clickOnHoliday.bind(this)} resizeStop={this.onEventDragOrResize.bind(this)} dragStop={this.onEventDragOrResize.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Month'/>
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Resize, DragAndDrop]}/>
            </ScheduleComponent>
            <ToastComponent ref={(toast) => { this.toastObj = toast; }} id='schedule_remainder' position={{ X: 'Right', Y: 'Top' }} title="Information!" cssClass="e-toast-info" icon="e-info toast-icons" target=".e-schedule"></ToastComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title=''>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '100%' }}>
                    <div>
                      <CheckBoxComponent checked={this.holidayListCollection} label="Holiday events" change={this.updateHolidayListCollection}/>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '100%' }}>
                    <div>
                      <CheckBoxComponent checked={this.holidayEventCollection} label="Scheduling event on holiday" change={this.updateHolidayEventCollection}/>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>
            This demo illustrates how to add and remove holiday events and perform CRUD operations on holiday dates in the
            Scheduler.
          </p>
        </div>
        <div id="description">
          <p>
          This sample demonstrates how to perform CRUD operations on holiday dates in a calendar. If a user wants to
            schedule an appointment on a holiday, they should check the <code>Scheduling event on holiday</code> checkbox.
            This will enable them to add an appointment on a holiday date.If a holiday list is displayed in the calendar, the
            <code>Holiday events</code> checkbox will be checked. The holiday list is highlighted in a different color.
          </p>
          <ul>
            <li>
              When an action is performed to drag and resize an event, if the <code>Scheduling event on holiday</code>
              checkbox is checked, the appointment can be scheduled on holiday dates. If it is unchecked, the appointment
              cannot have CRUD actions performed on it, and a warning message will be displayed.
            </li>
            <li>If a recurring event is added on a holiday date and the <code>Scheduling event on holiday</code> checkbox is
              checked, it allows the event to occur on that dates. If the checkbox is unchecked, it prevents the event from
              occurring, based on the dates in the holiday collection.
            </li>
          </ul>
        </div>
      </div>);
    }
}
