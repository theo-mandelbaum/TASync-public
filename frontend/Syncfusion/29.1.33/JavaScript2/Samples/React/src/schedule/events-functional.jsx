import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Schedule events sample
 */
const Events = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [eventLog, setEventLog] = useState("");
    let scheduleObj = useRef(null);
    let eventObj = useRef(null);
    const data = extend([], dataSource.scheduleData, null, true);
    const onEventRendered = (args) => {
        applyCategoryColor(args, scheduleObj.current.currentView);
    };
    const onClear = () => {
        setEventLog('');
    };
    const onCreate = () => {
        appendElement('Load');
    };
    const onActionBegin = () => {
        appendElement('Action Begin');
    };
    const onActionComplete = () => {
        appendElement('Action Complete');
    };
    const onActionFailure = () => {
        appendElement('Action Failure');
    };
    const onCellDoubleClick = () => {
        appendElement('Cell Double Click');
    };
    const onCellClick = () => {
        appendElement('Cell Click');
    };
    const onNavigating = () => {
        appendElement('Navigating');
    };
    const onDestroyed = () => {
        appendElement('Destroyed');
    };
    const onEventClick = () => {
        appendElement('Event Click');
    };
    const onPopupOpen = () => {
        appendElement('Popup Open');
    };
    const appendElement = (html) => {
        setEventLog(prevLog => `Schedule <b>${html}</b> event is triggered<hr>${prevLog}`);
    };
    return (<div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent ref={scheduleObj} width='100%' height='650px' selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }} created={onCreate} eventRendered={onEventRendered} actionBegin={onActionBegin} actionComplete={onActionComplete} actionFailure={onActionFailure} cellClick={onCellClick} cellDoubleClick={onCellDoubleClick} destroyed={onDestroyed} navigating={onNavigating} eventClick={onEventClick} popupOpen={onPopupOpen}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Event Trace'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '250px' }}>
                <td>
                  <div className='eventarea' style={{ height: '245px', overflow: 'auto' }}>
                    <span className='EventLog' id='EventLog' style={{ wordBreak: 'normal' }} ref={eventObj} dangerouslySetInnerHTML={{ __html: eventLog }}></span>
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                    <ButtonComponent title='Clear' onClick={onClear}>Clear</ButtonComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>This demo illustrates the client-side events that triggers on respective Scheduler actions and the same is being displayed on the event trace panel.</p>
      </div>
      <div id='description'>
        <p>
          In this demo, the client-side events that triggers based on the action taking place in Scheduler has been demonstrated. The
          user can make use of these events, if at some point they need to perform some custom actions or any needed additional
          customizations on the available Scheduler features.
        </p>
      </div>
    </div>);
};
export default Events;
