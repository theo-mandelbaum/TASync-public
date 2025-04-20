import * as React from 'react';
import { extend, Internationalization, isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ScheduleComponent, ResourcesDirective, ResourceDirective, Day, Week, WorkWeek, Month, Agenda, MonthAgenda, Inject, Resize, DragAndDrop } from "@syncfusion/ej2-react-schedule";
import './quick-info-template.css';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
/**
 * Schedule quick info template sample
 */
export class QuickInfoTemplate extends SampleBase {
    scheduleObj;
    eventTypeObj;
    titleObj;
    notesObj;
    scheduleData = extend([], dataSource.quickInfoTemplateData, undefined, true);
    intl = new Internationalization();
    roomData = [
        { Name: 'Jammy', Id: 1, Capacity: 20, Color: '#ea7a57', Type: 'Conference' },
        { Name: 'Tweety', Id: 2, Capacity: 7, Color: '#7fa900', Type: 'Cabin' },
        { Name: 'Nestle', Id: 3, Capacity: 5, Color: '#5978ee', Type: 'Cabin' },
        { Name: 'Phoenix', Id: 4, Capacity: 15, Color: '#fec200', Type: 'Conference' },
        { Name: 'Mission', Id: 5, Capacity: 25, Color: '#df5286', Type: 'Conference' },
        { Name: 'Hangout', Id: 6, Capacity: 10, Color: '#00bdae', Type: 'Cabin' },
        { Name: 'Rick Roll', Id: 7, Capacity: 20, Color: '#865fcf', Type: 'Conference' },
        { Name: 'Rainbow', Id: 8, Capacity: 8, Color: '#1aaa55', Type: 'Cabin' },
        { Name: 'Swarm', Id: 9, Capacity: 30, Color: '#df5286', Type: 'Conference' },
        { Name: 'Photogenic', Id: 10, Capacity: 25, Color: '#710193', Type: 'Conference' }
    ];
    getResourceData(data) {
        const resources = this.scheduleObj.getResourceCollections().slice(-1)[0];
        const resourceData = resources.dataSource.filter((resource) => resource.Id === data.RoomId)[0];
        return resourceData;
    }
    getHeaderStyles(data) {
        if (data.elementType === 'cell') {
            return { alignItems: 'center', color: '#919191' };
        }
        else {
            const resourceData = this.getResourceData(data);
            return { background: resourceData.Color, color: '#FFFFFF' };
        }
    }
    getHeaderTitle(data) {
        return (data.elementType === 'cell') ? 'Add Appointment' : 'Appointment Details';
    }
    getHeaderDetails(data) {
        return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    }
    getEventType(data) {
        return this.getResourceData(data).Name;
    }
    buttonClickActions(e) {
        const quickPopup = closest(e.target, '.e-quick-popup-wrapper');
        const getSlotData = () => {
            const addObj = {};
            addObj.Id = this.scheduleObj.getEventMaxID();
            addObj.Subject = isNullOrUndefined(this.titleObj.value) ? 'Add title' : this.titleObj.value;
            addObj.StartTime = new Date(this.scheduleObj.activeCellsData.startTime);
            addObj.EndTime = new Date(this.scheduleObj.activeCellsData.endTime);
            addObj.IsAllDay = this.scheduleObj.activeCellsData.isAllDay;
            addObj.Description = isNullOrUndefined(this.notesObj.value) ? 'Add notes' : this.notesObj.value;
            addObj.RoomId = this.eventTypeObj.value;
            return addObj;
        };
        if (e.target.id === 'add') {
            const addObj = getSlotData();
            this.scheduleObj.addEvent(addObj);
        }
        else if (e.target.id === 'delete') {
            const eventDetails = this.scheduleObj.activeEventData.event;
            let currentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            this.scheduleObj.deleteEvent(eventDetails, currentAction);
        }
        else {
            const isCellPopup = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            const eventDetails = isCellPopup ? getSlotData() :
                this.scheduleObj.activeEventData.event;
            let currentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            this.scheduleObj.openEditor(eventDetails, currentAction, true);
        }
        this.scheduleObj.closeQuickInfoPopup();
    }
    onPopupOpen(args) {
        if (args.target && !args.target.classList.contains('e-appointment') && !isNullOrUndefined(this.titleObj)) {
            this.titleObj.focusIn();
        }
    }
    headerTemplate(props) {
        return (<div className="quick-info-header">
                <div className="quick-info-header-content" style={this.getHeaderStyles(props)}>
                    <div className="quick-info-title">{this.getHeaderTitle(props)}</div>
                    <div className="duration-text">{this.getHeaderDetails(props)}</div>
                </div>
            </div>);
    }
    contentTemplate(props) {
        return (<div className="quick-info-content">
                {props.elementType === 'cell' ?
                <div className="e-cell-content">
                        <div className="quick-content-area">
                            <TextBoxComponent id="title" ref={(textbox) => this.titleObj = textbox} placeholder="Title"/>
                        </div>
                        <div className="quick-content-area">
                            <DropDownListComponent id="eventType" ref={(ddl) => this.eventTypeObj = ddl} dataSource={this.roomData} fields={{ text: "Name", value: "Id" }} placeholder="Choose Type" index={0} popupHeight="200px"/>
                        </div>
                        <div className="quick-content-area">
                            <TextBoxComponent id="notes" ref={(textbox) => this.notesObj = textbox} placeholder="Notes"/>
                        </div>
                    </div>
                :
                    <div className="event-content">
                        <div className="meeting-type-wrap">
                            <label>Subject</label>:
                            <span>{props.Subject}</span>
                        </div>
                        <div className="meeting-subject-wrap">
                            <label>Type</label>:
                            <span>{this.getEventType(props)}</span>
                        </div>
                        <div className="notes-wrap">
                            <label>Notes</label>:
                            <span>{props.Description}</span>
                        </div>
                    </div>}
            </div>);
    }
    footerTemplate(props) {
        return (<div className="quick-info-footer">
                {props.elementType == "cell" ?
                <div className="cell-footer">
                        <ButtonComponent id="more-details" cssClass='e-flat' content="More Details" onClick={this.buttonClickActions.bind(this)}/>
                        <ButtonComponent id="add" cssClass='e-flat' content="Add" isPrimary={true} onClick={this.buttonClickActions.bind(this)}/>
                    </div>
                :
                    <div className="event-footer">
                        <ButtonComponent id="delete" cssClass='e-flat' content="Delete" onClick={this.buttonClickActions.bind(this)}/>
                        <ButtonComponent id="more-details" cssClass='e-flat' content="More Details" isPrimary={true} onClick={this.buttonClickActions.bind(this)}/>
                    </div>}
            </div>);
    }
    render() {
        return (<div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent id="schedule" cssClass='quick-info-template' ref={(schedule) => this.scheduleObj = schedule} height="650px" selectedDate={new Date(2021, 0, 9)} eventSettings={{ dataSource: this.scheduleData }} quickInfoTemplates={{
                header: this.headerTemplate.bind(this),
                content: this.contentTemplate.bind(this),
                footer: this.footerTemplate.bind(this)
            }} popupOpen={this.onPopupOpen.bind(this)}>
                            <ResourcesDirective>
                                <ResourceDirective field='RoomId' title='Room Type' name='MeetingRoom' textField='Name' idField='Id' colorField='Color' dataSource={this.roomData}></ResourceDirective>
                            </ResourcesDirective>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, Resize, DragAndDrop]}/>
                        </ScheduleComponent>
                    </div>
                </div>
                <div id='action-description'>
                    <p>This demo showcases the quick popups for cells and appointments with the customized templates.</p>
                </div>
                <div id='description'>
                    <p>In this demo, the quick popup is customized based on the office required appointment-related fields which can be achieved by making use of the <code>quickInfoTemplate</code> option.</p>
                    <p>The <code>quickInfoTemplate</code> has three UI elements such as <code>header</code>, <code>content</code>, and <code>footer</code>. You can customize these UI elements of the quick popup.
                        You can also customize whether the quick popup is applicable to the cells or events or for both using the <code>elementType</code> property.</p>
                </div>
            </div>);
    }
}
