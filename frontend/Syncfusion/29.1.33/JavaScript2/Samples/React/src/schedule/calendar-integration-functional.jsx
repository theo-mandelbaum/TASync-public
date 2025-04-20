import * as React from 'react';
import { useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, Inject, Day, WorkWeek, Month, Week, Agenda, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { updateSampleSection } from '../common/sample-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
/**
 * schedule google calendar integration sample
 */
const CalendarIntegration = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let calendarId = 'en.usa%23holiday@group.v.calendar.google.com';
    let publicKey = 'AIzaSyBgbX_tgmVanBP4yafDPPXxWr70sjbKAXM';
    let dataManger = new DataManager({
        url: 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?key=' + publicKey,
        adaptor: new WebApiAdaptor(),
        crossDomain: true
    });
    const onDataBinding = (e) => {
        let items = e.result.items;
        let scheduleData = [];
        if (items.length > 0) {
            for (let event of items) {
                let when = event.start.dateTime;
                let start = event.start.dateTime;
                let end = event.end.dateTime;
                if (!when) {
                    when = event.start.date;
                    start = event.start.date;
                    end = event.end.date;
                }
                scheduleData.push({
                    Id: event.id,
                    Subject: event.summary,
                    StartTime: start,
                    EndTime: end,
                    IsAllDay: !event.start.dateTime
                });
            }
        }
        e.result = scheduleData;
    };
    return (<div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper drag-sample-wrapper'>
                    <div className="schedule-container">
                        <ScheduleComponent width='100%' height='650px' readonly={true} eventSettings={{ dataSource: dataManger }} dataBinding={onDataBinding} currentView='Month' timezone='UTC'>
                            <ViewsDirective>
                                <ViewDirective option='Day'/>
                                <ViewDirective option='Week'/>
                                <ViewDirective option='WorkWeek'/>
                                <ViewDirective option='Month'/>
                                <ViewDirective option='Agenda'/>
                            </ViewsDirective>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                        </ScheduleComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This example illustrates how to load and integrate events data from the Google Calendar into our Scheduler.</p>
            </div>
            <div id="description">
                <p> 
                    In this example, we have assigned our custom created Google Calendar url to the DataManager and assigned the
                    same to the Scheduler <code>dataSource</code> within the <code>eventSettings</code> API. Since the events data
                    retrieved from the Google Calendar will be in its own object format, therefore it needs to be resolved manually
                    within the Scheduler’s <code>dataBinding</code> event. Within this <code>dataBinding</code> event, the event fields
                    needs to be mapped properly and then assigned to the result.
                </p>
            </div>
        </div>);
};
export default CalendarIntegration;
