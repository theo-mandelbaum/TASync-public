import * as React from 'react';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { SampleBase } from '../common/sample-base';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Schedule realtime binding sample
 */
export class RealTimeBinding extends SampleBase {
    connection;
    data = extend([], dataSource.scheduleData, null, true);
    isHubConnected = false;
    scheduleObj;
    onCreated() {
        const url = 'https://ej2.syncfusion.com/aspnetcore/schedulehub/';
        this.connection = new HubConnectionBuilder().withUrl(url, { withCredentials: false, skipNegotiation: true, transport: HttpTransportType.WebSockets }).withAutomaticReconnect().build();
        this.connection.on('ReceiveData', (action, data) => {
            if (action == 'view') {
                this.scheduleObj.currentView = data;
            }
            if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
                this.scheduleObj.eventSettings.dataSource = data;
            }
        });
        this.connection.start().then(() => { this.isHubConnected = true; }).catch(() => { this.isHubConnected = false; });
    }
    onNavigating(args) {
        if (args.action == 'view' && this.isHubConnected) {
            this.connection.invoke('SendData', args.action, args.currentView);
        }
    }
    onActionComplete(args) {
        if (this.isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
            this.connection.invoke('SendData', args.requestType, this.scheduleObj.eventSettings.dataSource);
        }
    }
    componentWillUnmount() {
        if (this.connection) {
            this.connection.stop().then(() => { this.isHubConnected = false; }).catch((err) => { console.log(err); });
        }
    }
    render() {
        return (<div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent ref={(schedule) => this.scheduleObj = schedule} height='550px' selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: this.data }} created={this.onCreated.bind(this)} actionComplete={this.onActionComplete.bind(this)} navigating={this.onNavigating.bind(this)}>
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
    }
}
