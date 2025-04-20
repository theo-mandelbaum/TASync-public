import * as React from 'react';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { ToolbarComponent, ItemsDirective, ItemDirective, ContextMenuComponent, AppBarComponent } from '@syncfusion/ej2-react-navigations';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Year, TimelineViews, TimelineMonth, TimelineYear, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop, Agenda, Print, ExcelExport, ICalendarImport, ICalendarExport, Timezone } from '@syncfusion/ej2-react-schedule';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { addClass, Browser, closest, extend, Internationalization, isNullOrUndefined, removeClass, remove, compile } from '@syncfusion/ej2-base';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { tz } from 'moment-timezone';
import { SampleBase } from '../common/sample-base';
import './overview.css';
export class Overview extends SampleBase {
    scheduleObj;
    eventTypeObj;
    titleObj;
    notesObj;
    contextMenuObj;
    isTimelineView = false;
    selectedTarget;
    intl = new Internationalization();
    workWeekObj;
    resourceObj;
    liveTimeInterval;
    weekDays = [
        { text: 'Sunday', value: 0 },
        { text: 'Monday', value: 1 },
        { text: 'Tuesday', value: 2 },
        { text: 'Wednesday', value: 3 },
        { text: 'Thursday', value: 4 },
        { text: 'Friday', value: 5 },
        { text: 'Saturday', value: 6 }
    ];
    exportItems = [
        { text: 'iCalendar', iconCss: 'e-icons e-export' },
        { text: 'Excel', iconCss: 'e-icons e-export-excel' }
    ];
    contextMenuItems = [
        { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
        { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
        { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
        { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
        { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
        {
            text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash',
            items: [
                { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
                { text: 'Delete Series', id: 'DeleteSeries' }
            ]
        },
        {
            text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit',
            items: [
                { text: 'Edit Occurrence', id: 'EditOccurrence' },
                { text: 'Edit Series', id: 'EditSeries' }
            ]
        }
    ];
    calendarCollections = [
        { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
        { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
        { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
        { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
    ];
    timezoneData = [
        { text: 'UTC -12:00', value: 'Etc/GMT+12' },
        { text: 'UTC -11:00', value: 'Etc/GMT+11' },
        { text: 'UTC -10:00', value: 'Etc/GMT+10' },
        { text: 'UTC -09:00', value: 'Etc/GMT+9' },
        { text: 'UTC -08:00', value: 'Etc/GMT+8' },
        { text: 'UTC -07:00', value: 'Etc/GMT+7' },
        { text: 'UTC -06:00', value: 'Etc/GMT+6' },
        { text: 'UTC -05:00', value: 'Etc/GMT+5' },
        { text: 'UTC -04:00', value: 'Etc/GMT+4' },
        { text: 'UTC -03:00', value: 'Etc/GMT+3' },
        { text: 'UTC -02:00', value: 'Etc/GMT+2' },
        { text: 'UTC -01:00', value: 'Etc/GMT+1' },
        { text: 'UTC +00:00', value: 'Etc/GMT' },
        { text: 'UTC +01:00', value: 'Etc/GMT-1' },
        { text: 'UTC +02:00', value: 'Etc/GMT-2' },
        { text: 'UTC +03:00', value: 'Etc/GMT-3' },
        { text: 'UTC +04:00', value: 'Etc/GMT-4' },
        { text: 'UTC +05:00', value: 'Etc/GMT-5' },
        { text: 'UTC +05:30', value: 'Asia/Calcutta' },
        { text: 'UTC +06:00', value: 'Etc/GMT-6' },
        { text: 'UTC +07:00', value: 'Etc/GMT-7' },
        { text: 'UTC +08:00', value: 'Etc/GMT-8' },
        { text: 'UTC +09:00', value: 'Etc/GMT-9' },
        { text: 'UTC +10:00', value: 'Etc/GMT-10' },
        { text: 'UTC +11:00', value: 'Etc/GMT-11' },
        { text: 'UTC +12:00', value: 'Etc/GMT-12' },
        { text: 'UTC +13:00', value: 'Etc/GMT-13' },
        { text: 'UTC +14:00', value: 'Etc/GMT-14' }
    ];
    majorSlotData = [
        { Name: '1 hour', Value: 60 },
        { Name: '1.5 hours', Value: 90 },
        { Name: '2 hours', Value: 120 },
        { Name: '2.5 hours', Value: 150 },
        { Name: '3 hours', Value: 180 },
        { Name: '3.5 hours', Value: 210 },
        { Name: '4 hours', Value: 240 },
        { Name: '4.5 hours', Value: 270 },
        { Name: '5 hours', Value: 300 },
        { Name: '5.5 hours', Value: 330 },
        { Name: '6 hours', Value: 360 },
        { Name: '6.5 hours', Value: 390 },
        { Name: '7 hours', Value: 420 },
        { Name: '7.5 hours', Value: 450 },
        { Name: '8 hours', Value: 480 },
        { Name: '8.5 hours', Value: 510 },
        { Name: '9 hours', Value: 540 },
        { Name: '9.5 hours', Value: 570 },
        { Name: '10 hours', Value: 600 },
        { Name: '10.5 hours', Value: 630 },
        { Name: '11 hours', Value: 660 },
        { Name: '11.5 hours', Value: 690 },
        { Name: '12 hours', Value: 720 }
    ];
    minorSlotData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    timeFormatData = [
        { Name: "12 hours", Value: "hh:mm a" },
        { Name: "24 hours", Value: "HH:mm" }
    ];
    weekNumberData = [
        { Name: 'Off', Value: 'Off' },
        { Name: 'First Day of Year', Value: 'FirstDay' },
        { Name: 'First Full Week', Value: 'FirstFullWeek' },
        { Name: 'First Four-Day Week', Value: 'FirstFourDayWeek' }
    ];
    tooltipData = [
        { Name: 'Off', Value: 'Off' },
        { Name: 'On', Value: 'On' }
    ];
    importTemplateFn(data) {
        const template = '<div class="e-template-btn"><span class="e-btn-icon e-icons e-upload-1 e-icon-left"></span>${text}</div>';
        return compile(template.trim())(data);
    }
    updateLiveTime() {
        let scheduleTimezone = this.scheduleObj ? this.scheduleObj.timezone : 'Etc/GMT';
        let timeBtn = document.querySelector('.schedule-overview #timeBtn');
        if (timeBtn) {
            let liveTime;
            if (this.scheduleObj.isAdaptive) {
                liveTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: scheduleTimezone });
            }
            else {
                liveTime = new Date().toLocaleTimeString('en-US', { timeZone: scheduleTimezone });
            }
            timeBtn.innerHTML = liveTime;
        }
    }
    ;
    onImportClick(args) {
        this.scheduleObj.importICalendar(args.event.target.files[0]);
    }
    onPrint() {
        this.scheduleObj.print();
    }
    onExportClick(args) {
        if (args.item.text === 'Excel') {
            let exportDatas = [];
            let eventCollection = this.scheduleObj.getEvents();
            let resourceCollection = this.scheduleObj.getResourceCollections();
            let resourceData = resourceCollection[0].dataSource;
            for (let resource of resourceData) {
                let data = eventCollection.filter((e) => e.CalendarId === resource.CalendarId);
                exportDatas = exportDatas.concat(data);
            }
            this.scheduleObj.exportToExcel({ exportType: 'xlsx', customData: exportDatas, fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'CalendarId'] });
        }
        else {
            this.scheduleObj.exportToICalendar();
        }
    }
    getEventData() {
        const date = this.scheduleObj.selectedDate;
        return {
            Id: this.scheduleObj.getEventMaxID(),
            Subject: '',
            StartTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), 0, 0),
            EndTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours() + 1, 0, 0),
            Location: '',
            Description: '',
            IsAllDay: false,
            CalendarId: 1
        };
    }
    onToolbarItemClicked(args) {
        switch (args.item.text) {
            case 'Day':
                this.scheduleObj.currentView = this.isTimelineView ? 'TimelineDay' : 'Day';
                break;
            case 'Week':
                this.scheduleObj.currentView = this.isTimelineView ? 'TimelineWeek' : 'Week';
                break;
            case 'WorkWeek':
                this.scheduleObj.currentView = this.isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
                break;
            case 'Month':
                this.scheduleObj.currentView = this.isTimelineView ? 'TimelineMonth' : 'Month';
                break;
            case 'Year':
                this.scheduleObj.currentView = this.isTimelineView ? 'TimelineYear' : 'Year';
                break;
            case 'Agenda':
                this.scheduleObj.currentView = 'Agenda';
                break;
            case 'New Event':
                const eventData = this.getEventData();
                this.scheduleObj.openEditor(eventData, 'Add', true);
                break;
            case 'New Recurring Event':
                const recEventData = this.getEventData();
                this.scheduleObj.openEditor(recEventData, 'Add', true, 1);
                break;
        }
    }
    timelineTemplate() {
        return (<div className='template'>
        <div className='icon-child'>
          <CheckBoxComponent id='timeline_views' checked={false} change={(args) => {
                this.isTimelineView = args.checked;
                switch (this.scheduleObj.currentView) {
                    case 'Day':
                    case 'TimelineDay':
                        this.scheduleObj.currentView = this.isTimelineView ? 'TimelineDay' : 'Day';
                        break;
                    case 'Week':
                    case 'TimelineWeek':
                        this.scheduleObj.currentView = this.isTimelineView ? 'TimelineWeek' : 'Week';
                        break;
                    case 'WorkWeek':
                    case 'TimelineWorkWeek':
                        this.scheduleObj.currentView = this.isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
                        break;
                    case 'Month':
                    case 'TimelineMonth':
                        this.scheduleObj.currentView = this.isTimelineView ? 'TimelineMonth' : 'Month';
                        break;
                    case 'Year':
                    case 'TimelineYear':
                        this.scheduleObj.currentView = this.isTimelineView ? 'TimelineYear' : 'Year';
                        break;
                    case 'Agenda':
                        this.scheduleObj.currentView = 'Agenda';
                        break;
                }
            }}/>
        </div>
        <div className='text-child'>Timeline Views</div>
      </div>);
    }
    groupTemplate() {
        return (<div className='template'>
        <label>
          <div className='icon-child'>
            <CheckBoxComponent id='grouping' checked={true} change={(args) => { this.scheduleObj.group.resources = args.checked ? ['Calendars'] : []; }}/>
          </div>
          <div className='text-child'>Grouping</div>
        </label>
      </div>);
    }
    gridlineTemplate() {
        return (<div className='template'>
        <label>
          <div className='icon-child'>
            <CheckBoxComponent id='gridlines' checked={true} change={(args) => { this.scheduleObj.timeScale.enable = args.checked; }}/>
          </div>
          <div className='text-child'>Gridlines</div>
        </label>
      </div>);
    }
    autoHeightTemplate() {
        return (<div className='template'>
        <label>
          <div className='icon-child'>
            <CheckBoxComponent id='row_auto_height' checked={false} change={(args) => { this.scheduleObj.rowAutoHeight = args.checked; }}/>
          </div>
          <div className='text-child'>Row Auto Height</div>
        </label>
      </div>);
    }
    getDateHeaderDay(value) {
        return this.intl.formatDate(value, { skeleton: 'E' });
    }
    getDateHeaderDate(value) {
        return this.intl.formatDate(value, { skeleton: 'd' });
    }
    getWeather(value) {
        switch (value.getDay()) {
            case 0:
                return '<img class="weather-image"  src= "src/schedule/images/weather-clear.svg" alt="Clear Weather"/>';
            case 1:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
            case 2:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg" alt="Rain Weather"/>';
            case 3:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
            case 4:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg" alt="Rain Weather"//>';
            case 5:
                return '<img class="weather-image" src="src/schedule/images/weather-clear.svg" alt="Clear Weather"/>';
            case 6:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
            default:
                return null;
        }
    }
    dateHeaderTemplate(props) {
        return (<div><div>{this.getDateHeaderDay(props.date)}</div><div>{this.getDateHeaderDate(props.date)}</div><div className="date-text" dangerouslySetInnerHTML={{ __html: this.getWeather(props.date) }}></div></div>);
    }
    onResourceChange(args) {
        let resourcePredicate;
        for (let value of args.value) {
            if (resourcePredicate) {
                resourcePredicate = resourcePredicate.or(new Predicate('CalendarId', 'equal', value));
            }
            else {
                resourcePredicate = new Predicate('CalendarId', 'equal', value);
            }
        }
        this.scheduleObj.resources[0].query = resourcePredicate ? new Query().where(resourcePredicate) : new Query().where('CalendarId', 'equal', 1);
    }
    componentWillUnmount() {
        if (this.liveTimeInterval) {
            clearInterval(this.liveTimeInterval);
        }
    }
    render() {
        let generateEvents = () => {
            let eventData = [];
            let eventSubjects = [
                'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Traveling', 'Annual Conference', 'Birthday Celebration',
                'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day', 'MoonShiners',
                'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice', 'Rugby Match', 'Guitar Class',
                'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
            ];
            let weekDate = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
            let startDate = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 10, 0);
            let endDate = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 11, 30);
            eventData.push({
                Id: 1,
                Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
                StartTime: startDate,
                EndTime: endDate,
                Location: '',
                Description: 'Event Scheduled',
                RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;',
                IsAllDay: false,
                IsReadonly: false,
                CalendarId: 1
            });
            for (let a = 0, id = 2; a < 500; a++) {
                let month = Math.floor(Math.random() * (11 - 0 + 1) + 0);
                let date = Math.floor(Math.random() * (28 - 1 + 1) + 1);
                let hour = Math.floor(Math.random() * (23 - 0 + 1) + 0);
                let minutes = Math.floor(Math.random() * (59 - 0 + 1) + 0);
                let start = new Date(new Date().getFullYear(), month, date, hour, minutes, 0);
                let end = new Date(start.getTime());
                end.setHours(end.getHours() + 2);
                let startDate = new Date(start.getTime());
                let endDate = new Date(end.getTime());
                eventData.push({
                    Id: id,
                    Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
                    StartTime: startDate,
                    EndTime: endDate,
                    Location: '',
                    Description: 'Event Scheduled',
                    IsAllDay: id % 10 === 0,
                    IsReadonly: endDate < new Date(),
                    CalendarId: (a % 4) + 1
                });
                id++;
            }
            if (Browser.isIE) {
                Timezone.prototype.offset = (date, timezone) => tz.zone(timezone).utcOffset(date.getTime());
            }
            let overviewEvents = extend([], eventData, undefined, true);
            let timezone = new Timezone();
            let currentTimezone = timezone.getLocalTimezoneName();
            for (let event of overviewEvents) {
                event.StartTime = timezone.convert(event.StartTime, 'UTC', currentTimezone);
                event.EndTime = timezone.convert(event.EndTime, 'UTC', currentTimezone);
            }
            return overviewEvents;
        };
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='content-wrapper'>
            <div className='schedule-overview'>
            <AppBarComponent colorMode="Primary">
                <span className="time e-icons e-time-zone"></span>
                <span id="timezoneBtn" className="time ">UTC</span>
                <span className="time e-icons e-clock"></span>
                <span id="timeBtn" className="time current-time">Time</span>
                <div className="e-appbar-spacer"></div>
              <div className='control-panel calendar-export'>
                    <ButtonComponent id='printBtn' cssClass='title-bar-btn e-inherit' iconCss='e-icons e-print' onClick={(this.onPrint.bind(this))} content='Print'/>
              </div>
              <div className='control-panel import-button'>
                <UploaderComponent id='fileUpload' type='file' allowedExtensions='.ics' cssClass='calendar-import' buttons={{ browse: this.importTemplateFn({ text: 'Import' })[0] }} multiple={false} showFileList={false} selected={(this.onImportClick.bind(this))} created={() => {
                const element = document.querySelector('.calendar-import .e-css.e-btn');
                element.classList.add('e-inherit');
            }}/>
              </div>
              <div className='control-panel calendar-export'>
                <DropDownButtonComponent id='exportBtn' content='Export' cssClass='e-inherit' items={this.exportItems} select={this.onExportClick.bind(this)}/>
              </div>
                <ButtonComponent id='settingsBtn' cssClass='overview-toolbar-settings e-inherit' iconCss='e-icons e-settings' iconPosition='Top' content='' onClick={() => {
                let settingsPanel = document.querySelector('.overview-content .right-panel');
                if (settingsPanel.classList.contains('hide')) {
                    removeClass([settingsPanel], 'hide');
                    this.workWeekObj.refresh();
                    this.resourceObj.refresh();
                }
                else {
                    addClass([settingsPanel], 'hide');
                }
                this.scheduleObj.refreshEvents();
            }}/>
            </AppBarComponent>
            <ToolbarComponent id='toolbarOptions' cssClass='overview-toolbar' width='100%' height={70} overflowMode='Scrollable' scrollStep={100} created={() => this.liveTimeInterval = setInterval(() => { this.updateLiveTime(); }, 1000)} clicked={this.onToolbarItemClicked.bind(this)}>
                  <ItemsDirective>
                    <ItemDirective prefixIcon='e-icons e-plus' tooltipText='New Event' text='New Event' tabIndex={0}/>
                    <ItemDirective prefixIcon='e-icons e-repeat' tooltipText='New Recurring Event' text='New Recurring Event' tabIndex={0}/>
                    <ItemDirective type='Separator'/>
                    <ItemDirective prefixIcon='e-icons e-day' tooltipText='Day' text='Day' tabIndex={0}/>
                    <ItemDirective prefixIcon='e-icons e-week' tooltipText='Week' text='Week' tabIndex={0}/>
                    <ItemDirective prefixIcon='e-icons e-week' tooltipText='WorkWeek' text='WorkWeek' tabIndex={0}/>
                    <ItemDirective prefixIcon='e-icons e-month' tooltipText='Month' text='Month' tabIndex={0}/>
                    <ItemDirective prefixIcon='e-icons e-month' tooltipText='Year' text='Year' tabIndex={0}/>
                    <ItemDirective prefixIcon='e-icons e-agenda-date-range' tooltipText='Agenda' text='Agenda' tabIndex={0}/>
                    <ItemDirective tooltipText='Timeline Views' text='Timeline Views' template={this.timelineTemplate.bind(this)} tabIndex={0}/>
                    <ItemDirective type='Separator'/>
                    <ItemDirective tooltipText='Grouping' text='Grouping' template={this.groupTemplate.bind(this)} tabIndex={0}/>
                    <ItemDirective tooltipText='Timme Slots' text='Timme Slots' template={this.gridlineTemplate.bind(this)} tabIndex={0}/>
                    <ItemDirective tooltipText='Auto Fit Rows' text='Auto Fit Rows' template={this.autoHeightTemplate.bind(this)} tabIndex={0}/>
                  </ItemsDirective>
            </ToolbarComponent>
              <div className='overview-content'>
                <div className='left-panel'>
                  <div className='overview-scheduler'>
                    <ScheduleComponent id='scheduler' cssClass='schedule-overview' ref={(schedule) => this.scheduleObj = schedule} width='100%' height='100%' group={{ resources: ['Calendars'] }} timezone='UTC' eventSettings={{ dataSource: generateEvents() }} dateHeaderTemplate={this.dateHeaderTemplate.bind(this)}>
                      <ResourcesDirective>
                        <ResourceDirective field='CalendarId' title='Calendars' name='Calendars' dataSource={this.calendarCollections} query={new Query().where('CalendarId', 'equal', 1)} textField='CalendarText' idField='CalendarId' colorField='CalendarColor'>
                        </ResourceDirective>
                      </ResourcesDirective>
                      <ViewsDirective>
                        <ViewDirective option='Day'/>
                        <ViewDirective option='Week'/>
                        <ViewDirective option='WorkWeek'/>
                        <ViewDirective option='Month'/>
                        <ViewDirective option='Year'/>
                        <ViewDirective option='Agenda'/>
                        <ViewDirective option='TimelineDay'/>
                        <ViewDirective option='TimelineWeek'/>
                        <ViewDirective option='TimelineWorkWeek'/>
                        <ViewDirective option='TimelineMonth'/>
                        <ViewDirective option='TimelineYear'/>
                      </ViewsDirective>
                      <Inject services={[Day, Week, WorkWeek, Month, Year, Agenda, TimelineViews, TimelineMonth, TimelineYear, DragAndDrop, Resize, Print, ExcelExport, ICalendarImport, ICalendarExport]}/>
                    </ScheduleComponent>
                    <ContextMenuComponent id='overviewContextMenu' cssClass='schedule-context-menu' ref={(menu) => this.contextMenuObj = menu} target='.e-schedule' items={this.contextMenuItems} beforeOpen={(args) => {
                let newEventElement = document.querySelector('.e-new-event');
                if (newEventElement) {
                    remove(newEventElement);
                    removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
                }
                this.scheduleObj.closeQuickInfoPopup();
                let targetElement = args.event.target;
                if (closest(targetElement, '.e-contextmenu')) {
                    return;
                }
                this.selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
                if (isNullOrUndefined(this.selectedTarget)) {
                    args.cancel = true;
                    return;
                }
                if (this.selectedTarget.classList.contains('e-appointment')) {
                    let eventObj = this.scheduleObj.getEventDetails(this.selectedTarget);
                    if (eventObj.RecurrenceRule) {
                        this.contextMenuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                        this.contextMenuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
                    }
                    else {
                        this.contextMenuObj.showItems(['Save', 'Delete'], true);
                        this.contextMenuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                    }
                    return;
                }
                else if ((this.selectedTarget.classList.contains('e-work-cells') || this.selectedTarget.classList.contains('e-all-day-cells')) &&
                    !this.selectedTarget.classList.contains('e-selected-cell')) {
                    removeClass([].slice.call(this.scheduleObj.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
                    this.selectedTarget.setAttribute('aria-selected', 'true');
                    this.selectedTarget.classList.add('e-selected-cell');
                }
                this.contextMenuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                this.contextMenuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
            }} select={(args) => {
                let selectedMenuItem = args.item.id;
                let eventObj = {};
                if (this.selectedTarget && this.selectedTarget.classList.contains('e-appointment')) {
                    eventObj = this.scheduleObj.getEventDetails(this.selectedTarget);
                }
                switch (selectedMenuItem) {
                    case 'Today':
                        this.scheduleObj.selectedDate = new Date();
                        break;
                    case 'Add':
                    case 'AddRecurrence':
                        let selectedCells = this.scheduleObj.getSelectedElements();
                        let isRightClickInSelectedCells = selectedCells.some(cell => cell === this.selectedTarget);
                        let activeCellsData = this.scheduleObj.getCellDetails(isRightClickInSelectedCells ? selectedCells : [this.selectedTarget]);
                        if (selectedMenuItem === 'Add') {
                            this.scheduleObj.openEditor(activeCellsData, 'Add');
                        }
                        else {
                            this.scheduleObj.openEditor(activeCellsData, 'Add', false, 1);
                        }
                        break;
                    case 'Save':
                    case 'EditOccurrence':
                    case 'EditSeries':
                        if (selectedMenuItem === 'EditSeries') {
                            let query = new Query().where(this.scheduleObj.eventFields.id, 'equal', eventObj.RecurrenceID);
                            eventObj = new DataManager(this.scheduleObj.eventsData).executeLocal(query)[0];
                        }
                        this.scheduleObj.openEditor(eventObj, selectedMenuItem);
                        break;
                    case 'Delete':
                        this.scheduleObj.deleteEvent(eventObj);
                        break;
                    case 'DeleteOccurrence':
                    case 'DeleteSeries':
                        this.scheduleObj.deleteEvent(eventObj, selectedMenuItem);
                        break;
                }
            }}>
                    </ContextMenuComponent>
                  </div>
                </div>
                <div className='right-panel hide'>
                  <div className='control-panel e-css'>
                  <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Calendar</label>
                      </div>
                      <div className='col-right'>
                        <MultiSelectComponent id="resources" cssClass='schedule-resource' ref={(resources) => this.resourceObj = resources} dataSource={this.calendarCollections} mode='CheckBox' fields={{ text: 'CalendarText', value: 'CalendarId' }} enableSelectionOrder={false} showClearButton={false} showDropDownIcon={true} popupHeight={300} value={[1]} change={this.onResourceChange.bind(this)}>
                          <Inject services={[CheckBoxSelection]}/>
                        </MultiSelectComponent>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>First Day of Week</label>
                      </div>
                      <div className='col-right'>
                        <DropDownListComponent id="weekFirstDay" dataSource={this.weekDays} fields={{ text: 'text', value: 'value' }} value={0} popupHeight={400} change={(args) => { this.scheduleObj.firstDayOfWeek = args.value; }}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Work week</label>
                      </div>
                      <div className='col-right'>
                        <MultiSelectComponent id="workWeekDays" cssClass='schedule-workweek' ref={(workWeek) => this.workWeekObj = workWeek} dataSource={this.weekDays} mode='CheckBox' fields={{ text: 'text', value: 'value' }} enableSelectionOrder={false} showClearButton={false} showDropDownIcon={true} popupHeight={150} value={[1, 2, 3, 4, 5]} change={(args) => this.scheduleObj.workDays = args.value}>
                          <Inject services={[CheckBoxSelection]}/>
                        </MultiSelectComponent>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Resources</label>
                      </div>
                      <div className='col-right'>
                        <MultiSelectComponent id="resources" cssClass='schedule-resource' ref={(resources) => this.resourceObj = resources} dataSource={this.calendarCollections} mode='CheckBox' fields={{ text: 'CalendarText', value: 'CalendarId' }} enableSelectionOrder={false} showClearButton={false} showDropDownIcon={true} popupHeight={150} value={[1]} change={this.onResourceChange.bind(this)}>
                          <Inject services={[CheckBoxSelection]}/>
                        </MultiSelectComponent>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Timezone</label>
                      </div>
                      <div className='col-right'>
                        <DropDownListComponent id="timezone" dataSource={this.timezoneData} fields={{ text: 'text', value: 'value' }} value='Etc/GMT' popupHeight={150} change={(args) => {
                this.scheduleObj.timezone = args.value;
                this.updateLiveTime();
                document.querySelector('.schedule-overview #timezoneBtn').innerHTML = args.itemData.text;
            }}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Day Start Hour</label>
                      </div>
                      <div className='col-right'>
                        <TimePickerComponent id='dayStartHour' showClearButton={false} value={new Date(new Date().setHours(0, 0, 0))} change={(args) => this.scheduleObj.startHour = this.intl.formatDate(args.value, { skeleton: 'Hm' })}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Day End Hour</label>
                      </div>
                      <div className='col-right'>
                        <TimePickerComponent id='dayEndHour' showClearButton={false} value={new Date(new Date().setHours(23, 59, 59))} change={(args) => this.scheduleObj.endHour = this.intl.formatDate(args.value, { skeleton: 'Hm' })}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Work Start Hour</label>
                      </div>
                      <div className='col-right'>
                        <TimePickerComponent id='workHourStart' showClearButton={false} value={new Date(new Date().setHours(9, 0, 0))} change={(args) => this.scheduleObj.workHours.start = this.intl.formatDate(args.value, { skeleton: 'Hm' })}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Work End Hour</label>
                      </div>
                      <div className='col-right'>
                        <TimePickerComponent id='workHourEnd' showClearButton={false} value={new Date(new Date().setHours(18, 0, 0))} change={(args) => this.scheduleObj.workHours.end = this.intl.formatDate(args.value, { skeleton: 'Hm' })}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Slot Duration</label>
                      </div>
                      <div className='col-right'>
                        <DropDownListComponent id="slotDuration" dataSource={this.majorSlotData} fields={{ text: 'Name', value: 'Value' }} value={60} popupHeight={150} change={(args) => { this.scheduleObj.timeScale.interval = args.value; }}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Slot Interval</label>
                      </div>
                      <div className='col-right'>
                        <DropDownListComponent id="slotInterval" dataSource={this.minorSlotData} value={2} popupHeight={150} change={(args) => { this.scheduleObj.timeScale.slotCount = args.value; }}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Time Format</label>
                      </div>
                      <div className='col-right'>
                        <DropDownListComponent id="timeFormat" dataSource={this.timeFormatData} fields={{ text: 'Name', value: 'Value' }} value={"hh:mm a"} popupHeight={150} change={(args) => { this.scheduleObj.timeFormat = args.value; }}/>
                      </div>
                    </div>
                    <div className='col-row'>
                      <div className='col-left'>
                        <label style={{ lineHeight: '34px', margin: '0' }}>Week Numbers</label>
                      </div>
                      <div className='col-right'>
                        <DropDownListComponent id="weekNumber" dataSource={this.weekNumberData} fields={{ text: 'Name', value: 'Value' }} value={"Off"} popupHeight={150} change={(args) => {
                if (args.value == "Off") {
                    this.scheduleObj.showWeekNumber = false;
                }
                else {
                    this.scheduleObj.showWeekNumber = true;
                    this.scheduleObj.weekRule = args.value;
                }
            }}/>
                      </div>
                    </div>
                  <div className='col-row'>
                    <div className='col-left'>
                      <label style={{ lineHeight: '34px', margin: '0' }}>Tooltip</label>
                    </div>
                    <div className='col-right'>
                      <DropDownListComponent id="tooltip" dataSource={this.tooltipData} fields={{ text: 'Name', value: 'Value' }} value={"Off"} popupHeight={150} change={(args) => {
                if (args.value === "Off") {
                    this.scheduleObj.eventSettings.enableTooltip = false;
                }
                else {
                    this.scheduleObj.eventSettings.enableTooltip = true;
                }
            }}/>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>This <a aria-label="React scheduler example" href="https://www.syncfusion.com/react-ui-components/react-scheduler" target="_blank">React Scheduler example</a> demonstrates the overview of React Scheduler with its overall features. Use the toolbar buttons
            to play with Scheduler functionalities.</p>
        </div>
        <div id="description">
          <p>The React Scheduler is a fully-features calendar component that is used to manage appointments with multiple
            resources. The data can be pulled from the <code>dataManager</code> component or valid local JSON data or
            Restful web services and bind the data fields using <code>eventSettings.fields</code>.
          </p>
          <p>In this demo, React Scheduler features such as Multiple views, Templates (Date Header, Quick Info),
            Resources, Grouping, Timezone, Timescale, etc... are used along with multiple resources.</p>
        </div>
      </div>);
    }
}
