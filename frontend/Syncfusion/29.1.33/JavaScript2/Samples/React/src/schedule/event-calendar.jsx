import * as React from "react";
import './event-calendar.css';
import { ItemDirective, ItemsDirective, SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ResourcesDirective, ResourceDirective, TimelineMonth, Year, resetTime, ViewsDirective, ViewDirective, addDays } from '@syncfusion/ej2-react-schedule';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids";
import * as dataSource from './datasource.json';
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ColorPickerComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Internationalization, extend, isNullOrUndefined } from "@syncfusion/ej2/base";
import { DropDownList } from "@syncfusion/ej2-react-dropdowns";
import { SampleBase } from "../common/sample-base";
export class EventCalendar extends SampleBase {
    scheduleObj;
    calendarSidebarObj;
    colorPickerObj;
    calendarObj;
    unPlannedSidebarObj;
    calendarsListObj;
    gridObj;
    dialogObj;
    toolbarObj;
    calendarNameObj;
    saveButtonRef;
    currentDate = new Date();
    intl = new Internationalization();
    isAdd;
    calendars = [
        { name: "My Calendar", id: 1, color: "#c43081", isSelected: true },
        { name: "Company", id: 2, color: "#ff7f50", isSelected: true },
        { name: "Birthday", id: 3, color: "#AF27CD", isSelected: true },
        { name: "Holiday", id: 4, color: "#808000", isSelected: true }
    ];
    selectedCalendars = this.getSelectedCalendars();
    appointmentData = this.generateCalendarData();
    filteredData = this.getFilteredData();
    eventSettings = { dataSource: extend([], this.filteredData.planned, null, true) };
    resourceData = [
        { name: 'Nancy', id: 1, color: '#df5286' },
        { name: 'Steven', id: 2, color: '#7fa900' },
        { name: 'Robert', id: 3, color: '#ea7a57' },
        { name: 'Smith', id: 4, color: '#5978ee' },
        { name: 'Micheal', id: 5, color: '#df5286' },
        { name: 'Root', id: 6, color: '#00bdae' }
    ];
    getSelectedCalendars() {
        const selectedIds = [];
        const selectedItems = [];
        for (let calendar of this.calendars) {
            if (calendar.isSelected) {
                selectedIds.push(calendar.id);
                selectedItems.push(calendar);
            }
        }
        return { ids: selectedIds, items: selectedItems };
    }
    generateCalendarData() {
        let collections = extend([], [...dataSource.personalData, ...dataSource.companyData, ...dataSource.birthdayData, ...dataSource.holidayData], null, true);
        const oldTime = new Date(2021, 3, 1).getTime();
        const newTime = resetTime(new Date()).getTime();
        for (const data of collections) {
            data.IsPlanned = !(data.Id % 2);
            data.IsAllDay = [1, 2].indexOf(data.CalendarId) <= -1;
            const diff = oldTime - new Date(data.StartTime).getTime();
            const hour = Math.floor(Math.random() * (13 - 9) + 9);
            data.StartTime = new Date(newTime - diff + (data.IsAllDay ? 0 : (hour * 60 * 60 * 1000)));
            data.EndTime = new Date(data.StartTime.getTime() + (data.IsAllDay ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000));
            data.ResourceId = Math.floor(Math.random() * 6) + 1;
        }
        return collections;
    }
    getFilteredData() {
        const planned = [];
        const unPlanned = [];
        for (const data of this.appointmentData) {
            if (this.selectedCalendars.ids.indexOf(data.CalendarId) > -1) {
                if (data.IsPlanned) {
                    planned.push(data);
                }
                else {
                    unPlanned.push(data);
                }
            }
        }
        return { planned: planned, unPlanned: unPlanned };
    }
    onCalendarListChange = (args) => {
        if (args?.event?.target) {
            const target = args.event.target;
            if (target.classList.contains('e-edit')) {
                args.cancel = true;
                this.openDialog(args, 'Save');
            }
            else if (target.classList.contains('e-trash')) {
                args.cancel = true;
                this.removeCalendar(args);
            }
            else {
                this.calendarSelection(args);
            }
        }
        else {
            this.calendarSelection(args);
        }
    };
    openDialog = (args, action) => {
        if (this.calendarNameObj) {
            this.calendarNameObj.value = args.data.name;
            this.colorPickerObj.value = args.data.color;
            this.saveButtonRef.innerHTML = action;
            this.dialogObj.header = "Edit Calendar";
            this.dialogObj.show();
            this.saveButtonRef.onclick = () => {
                if (this.calendarNameObj) {
                    const newValue = this.calendarNameObj.value.trim();
                    const newColor = this.colorPickerObj.value.trim();
                    if (newValue.length > 0) {
                        this.calendars = this.calendars.map((item) => {
                            if (item.name === args.data.name) {
                                return { ...item, name: newValue, color: newColor };
                            }
                            return item;
                        });
                        this.selectedCalendars = this.getSelectedCalendars();
                        this.calendarsListObj.dataSource = extend([], this.calendars, null, true);
                        this.scheduleObj.refreshEvents();
                        this.dialogObj.hide();
                    }
                }
            };
        }
    };
    removeCalendar = (args) => {
        this.calendarsListObj.removeItem(args.item);
        this.calendars = this.calendars.filter((item) => item.id !== args.data.id);
        this.appointmentData = this.appointmentData.filter((item) => item.CalendarId !== args.data.id);
        this.selectedCalendars = this.getSelectedCalendars();
        this.filteredData = this.getFilteredData();
        this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true);
        this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true);
    };
    updateTextValue = () => {
        if (this.isAdd) {
            if (this.calendarNameObj) {
                let newValue = this.calendarNameObj.value.trim();
                newValue = newValue === "" ? "New Calendar" : newValue;
                const newId = (this.calendars.length + 1);
                const newItem = { name: newValue, id: newId, color: this.colorPickerObj.value, isSelected: true };
                this.calendars.push(newItem);
                this.selectedCalendars = this.getSelectedCalendars();
                this.calendarsListObj.dataSource = extend([], this.calendars, null, true);
                this.dialogObj.hide();
            }
            this.isAdd = false;
        }
    };
    onListActionComplete = () => {
        setTimeout(() => {
            if (this.calendarsListObj) {
                let iconAdd = this.calendarsListObj.element.querySelector(".e-plus");
                this.applyBackgroundColors();
                if (iconAdd) {
                    iconAdd.addEventListener("click", () => {
                        this.isAdd = true;
                        this.calendarNameObj.value = '';
                        this.colorPickerObj.value = "#008000ff";
                        this.saveButtonRef.innerHTML = "Add";
                        this.dialogObj.show();
                    });
                }
            }
        }, 200);
    };
    calendarSelection = (args) => {
        const idFromArgs = Number(args.data.id);
        this.calendars[args.index].isSelected = args.isChecked;
        this.selectedCalendars = this.getSelectedCalendars();
        if (args.isChecked) {
            this.changeCheckboxBackgroundColor(idFromArgs);
        }
        this.filteredData = this.getFilteredData();
        this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true);
        this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true);
    };
    applyBackgroundColors = () => {
        this.calendars.forEach((calendar) => {
            const listItem = this.calendarsListObj.element.querySelector(`[data-uid="${calendar.id}"]`);
            if (listItem) {
                const checkboxFrame = listItem.querySelector(`.e-checkbox-wrapper .e-frame.e-check,
                    .e-css.e-checkbox-wrapper .e-frame.e-check,.e-checkbox-wrapper .e-frame,.e-css.e-checkbox-wrapper .e-frame`);
                if (checkboxFrame) {
                    checkboxFrame.style.backgroundColor = calendar.color;
                    checkboxFrame.style.borderColor = calendar.color;
                }
            }
        });
    };
    changeCheckboxBackgroundColor = (idFromArgs) => {
        const listItem = document.querySelector(`[data-uid="${idFromArgs}"]`);
        if (listItem) {
            const checkboxFrame = listItem.querySelector('.e-checkbox-wrapper .e-frame.e-check');
            const selectedItem = this.calendars.find((item) => item.id === idFromArgs);
            if (checkboxFrame && selectedItem?.color) {
                checkboxFrame.style.backgroundColor = selectedItem.color;
                checkboxFrame.style.borderColor = selectedItem.color;
            }
        }
    };
    onToolbarItemClicked = (args) => {
        if (!args.item) {
            return;
        }
        switch (args.item.cssClass) {
            case 'e-menu-btn':
                this.calendarSidebarObj.toggle();
                break;
            case 'e-create':
                if (this.scheduleObj && this.calendars.length > 0) {
                    const data = {
                        StartTime: resetTime(new Date()),
                        EndTime: resetTime(addDays(new Date(), 1)),
                        ResourceId: this.selectedCalendars?.ids[0] || this.calendars[0]?.id
                    };
                    this.scheduleObj.openEditor(data, 'Add', true);
                }
                break;
            case 'e-previous':
                this.scheduleObj.changeDate(this.scheduleObj.activeView.getNextPreviousDate('Previous'));
                break;
            case 'e-next':
                this.scheduleObj.changeDate(this.scheduleObj.activeView.getNextPreviousDate('Next'));
                break;
            case 'e-today':
                this.scheduleObj.selectedDate = new Date();
                break;
            case 'e-day':
                this.scheduleObj.currentView = 'Day';
                break;
            case 'e-week':
                this.scheduleObj.currentView = 'Week';
                break;
            case 'e-month':
                this.scheduleObj.currentView = 'Month';
                break;
            case 'e-agenda':
                this.scheduleObj.currentView = 'Agenda';
                break;
            case 'e-timeline':
                this.scheduleObj.currentView = 'TimelineMonth';
                break;
            case 'e-year':
                this.scheduleObj.currentView = 'Year';
                break;
            default:
                break;
        }
    };
    onScheduleActionComplete = (args) => {
        if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
            this.updateDateRange();
            if (args.requestType === 'dateNavigate' && resetTime(this.calendarObj.value) !== resetTime(this.scheduleObj.selectedDate)) {
                this.calendarObj.value = this.scheduleObj.selectedDate;
            }
        }
        else if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
            for (const event of args.addedRecords) {
                event.IsPlanned = true;
                this.appointmentData.push(event);
            }
            for (const event of args.changedRecords) {
                const index = this.appointmentData.findIndex((item) => item.Id === event.Id);
                this.appointmentData[index] = event;
            }
            for (const event of args.deletedRecords) {
                const index = this.appointmentData.findIndex((item) => item.Id === event.Id);
                this.appointmentData.splice(index, 1);
            }
            const events = args.addedRecords.concat(args.changedRecords);
            for (const event of events) {
                let calendar = this.selectedCalendars.items.find((item) => item.id === event.CalendarId);
                if (isNullOrUndefined(calendar)) {
                    calendar = this.calendars.find((item) => item.id === event.CalendarId);
                    calendar.isSelected = true;
                    this.selectedCalendars = this.getSelectedCalendars();
                    this.filteredData = this.getFilteredData();
                    this.calendarsListObj.dataSource = extend([], this.calendars, null, true);
                    this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true);
                    this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true);
                }
            }
        }
    };
    updateDateRange = () => {
        let dateRange = '';
        if (this.scheduleObj) {
            const dateCollection = this.scheduleObj.getCurrentViewDates();
            dateRange = this.scheduleObj.getDateRangeText(dateCollection);
            if (dateRange !== '' && this.toolbarObj) {
                const dateRangeElement = this.toolbarObj.element.querySelector('.e-date-range .e-tbar-btn-text');
                this.toolbarObj.element.querySelector('.e-date-range .e-tbar-btn').setAttribute('aria-label', dateRange);
                dateRangeElement.textContent = dateRange;
            }
        }
    };
    valueChanged = (args) => {
        if (args?.isInteracted && this.scheduleObj) {
            this.scheduleObj.selectedDate = args.value;
        }
    };
    listTemplate = (data) => {
        return (<div className="calendar-list-item">
                <div className="calendar-name" title={data.name}>
                    {data.name}
                </div>
                {data.id !== 1 && (<div className="calendar-buttons">
                        <span id="calendar-edit-btn" className="e-icons e-edit" data-calendar-id={data.id}></span>
                        <span id="calendar-delete-btn" className="e-icons e-trash" data-calendar-id={data.id}></span>
                    </div>)}
            </div>);
    };
    listHeaderTemplate = () => {
        return (<div className="calendars-list-header">
                <div className="header-text">Calendars</div>
                <div className="header-icon e-icons e-plus"></div>
            </div>);
    };
    schedulePopupOpen = (args) => {
        if (args.type === "Editor") {
            if (!args.element.querySelector(".custom-field-row")) {
                const row = document.createElement('div');
                row.className = 'custom-field-row';
                const formElement = args.element.querySelector(".e-schedule-form");
                formElement.firstChild.insertBefore(row, args.element.querySelector(".e-resources-row"));
                const container = document.createElement('div');
                container.className = 'custom-field-container';
                const inputEle = document.createElement('input');
                inputEle.className = 'e-field';
                inputEle.name = 'CalendarId';
                container.appendChild(inputEle);
                row.appendChild(container);
                const dropDownList = new DropDownList({
                    dataSource: extend([], this.calendars, null, true),
                    cssClass: "calendar-ddl",
                    fields: { text: "name", value: "id" },
                    value: args.data?.CalendarId || this.selectedCalendars?.ids[0] || this.calendars[0]?.id,
                    floatLabelType: "Always", placeholder: "Calendar"
                });
                dropDownList.appendTo(inputEle);
                inputEle.setAttribute("name", "CalendarId");
            }
            else {
                const calendarDDL = args.element.querySelector(".calendar-ddl input").ej2_instances[0];
                calendarDDL.dataSource = extend([], this.calendars, null, true);
                calendarDDL.value = args.data?.CalendarId || this.selectedCalendars?.ids[0] || this.calendars[0]?.id;
            }
        }
        else if (args.type === "QuickInfo" && isNullOrUndefined(args.data.Id)) {
            args.cancel = true;
        }
    };
    eventRendered = (args) => {
        const categoryColor = this.selectedCalendars.items[this.selectedCalendars.ids.indexOf(args.data.CalendarId)].color;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            args.element.style.backgroundColor = categoryColor;
        }
    };
    dialogContent = () => {
        return (<div className="dialogContent">
                <div>Calendar Name</div><div className="dialog-content"><TextBoxComponent ref={(calendarName) => this.calendarNameObj = calendarName} id="text-box" placeholder="Enter the calender name"/><ColorPickerComponent ref={(colorPickerObj) => this.colorPickerObj = colorPickerObj} id="color-picker"/></div>
            </div>);
    };
    dialogFooterTemplate = () => {
        return (<button id="saveButton" ref={(saveButton) => this.saveButtonRef = saveButton} className="e-control e-btn e-primary" data-ripple="true" onClick={this.updateTextValue}></button>);
    };
    unplannedSidebarClosed = () => {
        const unplannedElement = this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
        if (unplannedElement) {
            unplannedElement.style.display = 'block';
        }
    };
    unplannedSideBarCreated = () => {
        if (this.unPlannedSidebarObj) {
            const open = this.unPlannedSidebarObj.element.parentElement.querySelector('#plannedOpen');
            const unplannedElement = this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
            if (open) {
                open.onclick = () => {
                    this.unPlannedSidebarObj.show();
                    this.filteredData = this.getFilteredData();
                    this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true);
                    if (unplannedElement) {
                        unplannedElement.style.display = 'none';
                    }
                };
            }
        }
    };
    unplannedSideBarCollapse = () => {
        if (this.unPlannedSidebarObj.isOpen) {
            this.unPlannedSidebarObj.hide();
            const unplannedElement = this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
            if (unplannedElement) {
                unplannedElement.style.display = 'block';
            }
        }
    };
    render() {
        return (<div id="event-calendar-sample" className="control-section event-calendar-control-section">
                <div className="control-wrapper">
                    <div>
                        <ToolbarComponent ref={(toolbar) => this.toolbarObj = toolbar} cssClass="event-calendar-toolbar" id='toolbar' clicked={this.onToolbarItemClicked} style={{ 'border': '1px solid #e5e5e5', 'marginBottom': '8px' }}>
                            <ItemsDirective>
                                <ItemDirective tooltipText="Menu" prefixIcon="e-menu" cssClass='e-menu-btn'/>
                                <ItemDirective prefixIcon="e-chevron-left" tooltipText='Previous Week' cssClass='e-previous'/>
                                <ItemDirective prefixIcon="e-chevron-right" tooltipText='Next Week' cssClass='e-next'/>
                                <ItemDirective text={new Date().toLocaleDateString()} cssClass='e-date-range'/>
                                <ItemDirective text="Create" align='Right' prefixIcon="e-plus" cssClass='e-create'/>
                                <ItemDirective type='Separator' align='Right'/>
                                <ItemDirective text='Today' align='Right' cssClass='e-today'/>
                                <ItemDirective type='Separator' align='Right'/>
                                <ItemDirective text='Day' align='Right' cssClass='e-day'/>
                                <ItemDirective text='Week' align='Right' cssClass='e-week'/>
                                <ItemDirective text='Month' align='Right' cssClass='e-month'/>
                                <ItemDirective text='Agenda' align='Right' cssClass='e-agenda'/>
                                <ItemDirective text='Timeline' align='Right' cssClass='e-timeline'/>
                                <ItemDirective text='Year' align='Right' cssClass='e-year'/>
                            </ItemsDirective>
                        </ToolbarComponent>
                    </div>
                    <div className="leftside">
                    </div>
                    <SidebarComponent id="sidebar-left" className="sidebar-treeview" ref={(sidebar) => this.calendarSidebarObj = sidebar} width={'320px'} height={'550px'} target={'.main-content'} mediaQuery={'(min-width: 600px)'} isOpen={true}>
                        <div className="table-content">
                            <CalendarComponent ref={(calendar) => this.calendarObj = calendar} id="calendar" value={this.currentDate} change={this.valueChanged} cssClass='selected-date-calendar'/>
                            <div className="calendar-list-container">
                                <ListViewComponent ref={(calendarsObj) => this.calendarsListObj = calendarsObj} id='listview-def' dataSource={this.calendars} showCheckBox={true} fields={{ id: 'id', text: 'name', isChecked: 'isSelected' }} showHeader={true} headerTemplate={this.listHeaderTemplate} template={this.listTemplate} select={this.onCalendarListChange} actionComplete={this.onListActionComplete}></ListViewComponent>
                            </div>
                        </div>
                    </SidebarComponent>
                    <div className="main-content" id="main-text">
                        <div className="sidebar-content">
                            <div className="schedule-container">
                                <ScheduleComponent id="Schedule" ref={(schedule) => this.scheduleObj = schedule} height='550px' selectedDate={this.currentDate} showHeaderBar={false} eventSettings={this.eventSettings} eventRendered={this.eventRendered} popupOpen={this.schedulePopupOpen} created={this.updateDateRange} actionComplete={this.onScheduleActionComplete}>

                                    <ResourcesDirective>
                                        <ResourceDirective field='ResourceId' title='Resources' name='Resources' allowMultiple={true} dataSource={this.resourceData} textField='name' idField='id' colorField='color'/>
                                    </ResourcesDirective>
                                    <ViewsDirective>
                                        <ViewDirective option='Day'/>
                                        <ViewDirective option='Week'/>
                                        <ViewDirective option='Month'/>
                                        <ViewDirective option='Agenda'/>
                                        <ViewDirective option='TimelineMonth' group={{ resources: ['Resources'] }}/>
                                        <ViewDirective option='Year'/>
                                    </ViewsDirective>
                                    <Inject services={[Day, Week, WorkWeek, Month, Agenda, TimelineMonth, Year]}/>
                                </ScheduleComponent>
                            </div>
                            <div className="unplanned-container">
                                <div id="plannedOpen" className="e-icons e-chevron-left-double"></div>
                                <SidebarComponent ref={(rightSidebarObj) => this.unPlannedSidebarObj = rightSidebarObj} id="sidebar-right" position={'Right'} width={'300px'} target={'.main-content'} type="Push" isOpen={false} created={this.unplannedSideBarCreated} close={this.unplannedSidebarClosed}>
                                <div id="unplanned-events-toolbar">
                                    <button className="e-icons e-exit-full-screen" title="Open/Close Sidebar" onClick={this.unplannedSideBarCollapse}></button>
                                    <h4 id="headerText">Unplanned Events</h4>
                                    </div>
                                    <div className="unplanned-text-containers">
                                        <GridComponent ref={(grid) => this.gridObj = grid} dataSource={extend([], this.filteredData.unplanned, null, true)}>
                                            <ColumnsDirective>
                                                <ColumnDirective field='Subject' headerText="Event" width='120px' textAlign="Left"/>
                                                <ColumnDirective field='StartTime' headerText="Date" width='140px' format={'dd MMMM yyyy'}/>
                                            </ColumnsDirective>
                                        </GridComponent>
                                    </div>
                                </SidebarComponent>
                                <div className="unplanned-text-container">Unplanned events</div>
                            </div>
                        </div>
                    </div>
                    <DialogComponent ref={(dialog) => this.dialogObj = dialog} id='dialog' className='calendar-edit-dialog' header={"New Calender"} width={'320px'} content={this.dialogContent} footerTemplate={this.dialogFooterTemplate} showCloseIcon={true} isModal={true} animationSettings={{ effect: 'Zoom' }} visible={false}> </DialogComponent>
                </div>
                <div id="action-description">
                    <p>This demo showcases the way to organize and filter multiple types of events such as Personal, Birthdays, Work,
                        and Holidays in the scheduler.</p>
                </div>
                <div id="description">
                    <p>In this example the multiple type of appointments such as Personal, Birthdays, Work,
                        and Holidays organized with filter option in a single scheduler. It helps the user to view a
                        specific or multiple type of appointments at one place.</p>
                    <p>The left sidebar helps the user to navigate between the scheduler dates and filter the appointments based
                        on their type.</p>
                    <p>The Schedule component is configured to show the appointments in colors based on their type to identify
                        the appointment type.</p>
                    <p>The right sidebar displays the list of unplanned events, which can be useful for the user to plan them later.</p>
                </div>
            </div>);
    }
}
