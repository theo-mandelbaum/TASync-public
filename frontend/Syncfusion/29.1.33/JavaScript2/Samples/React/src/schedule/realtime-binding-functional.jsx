import * as React from 'react';
import { useEffect, useState } from 'react';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { updateSampleSection } from '../common/sample-base';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Schedule realtime binding sample
 */
const RealTimeBinding = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let connection;
    const data = extend([], dataSource.scheduleData, null, true);
    let isHubConnected = false;
    const [eventSettings, setEventSettings] = useState({ dataSource: data });
    const [currentView, setCurrentView] = useState("Week");
    const onCreated = () => {
        const url = 'https://ej2.syncfusion.com/aspnetcore/schedulehub/';
        connection = new HubConnectionBuilder().withUrl(url, { withCredentials: false, skipNegotiation: true, transport: HttpTransportType.WebSockets }).withAutomaticReconnect().build();
        connection.on('ReceiveData', (action, data) => {
            if (action == 'view') {
                setCurrentView(data);
            }
            if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
                setEventSettings({ dataSource: data });
            }
        });
        connection.start().then(() => { isHubConnected = true; }).catch(() => { isHubConnected = false; });
    };
    const onNavigating = (args) => {
        if (args.action == 'view' && isHubConnected) {
            connection.invoke('SendData', args.action, args.currentView);
        }
    };
    const onActionComplete = (args) => {
        if (isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
            connection.invoke('SendData', args.requestType, eventSettings.dataSource);
        }
    };
    const componentWillUnmount = () => {
        if (connection) {
            connection.stop().then(() => { isHubConnected = false; }).catch((err) => { console.log(err); });
        }
    };
    return (<div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent height='550px' selectedDate={new Date(2021, 0, 10)} eventSettings={eventSettings} actionComplete={onActionComplete} navigating={onNavigating} created={onCreated} currentView={currentView}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
                    </ScheduleComponent>
                </div>
            </div>
            <div id='action-description'>
                <p>This demo showcases the way of binding signalR services to Scheduler component. Here, the SignalR is used to bind the data with Scheduler.</p>
            </div>
            <div id='description'>
                <p>
                    In this sample, we have used the <code>navigating</code> event to invoke the scheduler control’s view change action and <code>actionComplete</code>
                    event to update the scheduler data source after performing the CRUD operations. The SignalR will bind the data in order to corresponding event call.
                </p>
            </div>
        </div>);
};
export default RealTimeBinding;
