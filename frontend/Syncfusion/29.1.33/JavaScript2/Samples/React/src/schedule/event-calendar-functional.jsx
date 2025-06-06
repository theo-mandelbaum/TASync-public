import * as React from "react";
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './event-calendar.css';
import { ItemDirective, ItemsDirective, SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ResourcesDirective, ResourceDirective, TimelineMonth, Year, resetTime, ViewsDirective, ViewDirective, addDays } from '@syncfusion/ej2-react-schedule';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { useRef, useState } from "react";
import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids";
import * as dataSource from './datasource.json';
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ColorPickerComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { extend, isNullOrUndefined } from "@syncfusion/ej2/base";
import { DropDownList } from "@syncfusion/ej2-react-dropdowns";
/**
 *  Schedule event calendar sample
 */
const EventCalendar = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const scheduleObj = useRef(null);
    const calendarSidebarObj = useRef(null);
    const colorPickerObj = useRef(null);
    const calendarObj = useRef(null);
    const unPlannedSidebarObj = useRef(null);
    const calendarsListObj = useRef(null);
    const gridObj = useRef(null);
    const dialogObj = useRef(null);
    const toolbarObj = useRef(null);
    const calendarNameObj = useRef(null);
    let [currentDate] = useState(new Date());
    const saveButtonRef = useRef(null);
    let isAdd;
    let calendars = [
        { name: "My Calendar", id: 1, color: "#c43081", isSelected: true },
        { name: "Company", id: 2, color: "#ff7f50", isSelected: true },
        { name: "Birthday", id: 3, color: "#AF27CD", isSelected: true },
        { name: "Holiday", id: 4, color: "#808000", isSelected: true }
    ];
    let fields = { text: "name", value: "id" };
    let selectedCalendars = getSelectedCalendars();
    let appointmentData = generateCalendarData();
    let filteredData = getFilteredData();
    const eventSettings = { dataSource: extend([], filteredData.planned, null, true) };
    const resourceData = [
        { name: 'Nancy', id: 1, color: '#df5286' },
        { name: 'Steven', id: 2, color: '#7fa900' },
        { name: 'Robert', id: 3, color: '#ea7a57' },
        { name: 'Smith', id: 4, color: '#5978ee' },
        { name: 'Micheal', id: 5, color: '#df5286' },
        { name: 'Root', id: 6, color: '#00bdae' }
    ];
    function getSelectedCalendars() {
        const selectedIds = [];
        const selectedItems = [];
        for (let calendar of calendars) {
            if (calendar.isSelected) {
                selectedIds.push(calendar.id);
                selectedItems.push(calendar);
            }
        }
        return { ids: selectedIds, items: selectedItems };
    }
    ;
    function generateCalendarData() {
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
    ;
    function getFilteredData() {
        const planned = [];
        const unPlanned = [];
        for (const data of appointmentData) {
            if (selectedCalendars.ids.indexOf(data.CalendarId) > -1) {
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
    ;
    const onCalendarListChange = (args) => {
        if (args?.event?.target) {
            const target = args.event.target;
            if (target.classList.contains('e-edit')) {
                args.cancel = true;
                openDialog(args, 'Save');
            }
            else if (target.classList.contains('e-trash')) {
                args.cancel = true;
                removeCalendar(args);
            }
            else {
                calendarSelection(args);
            }
        }
        else {
            calendarSelection(args);
        }
    };
    const openDialog = (args, action) => {
        if (calendarNameObj) {
            calendarNameObj.current.value = args.data.name;
            colorPickerObj.current.value = args.data.color;
            saveButtonRef.current.innerHTML = action;
            dialogObj.current.header = "Edit Calendar";
            dialogObj.current.show();
            saveButtonRef.current.onclick = () => {
                if (calendarNameObj) {
                    const newValue = calendarNameObj.current.value.trim();
                    const newColor = colorPickerObj.current.value.trim();
                    if (newValue.length > 0) {
                        calendars = calendars.map((item) => {
                            if (item.name === args.data.name) {
                                return { ...item, name: newValue, color: newColor };
                            }
                            return item;
                        });
                        selectedCalendars = getSelectedCalendars();
                        calendarsListObj.current.dataSource = extend([], calendars, null, true);
                        scheduleObj.current.refreshEvents();
                        dialogObj.current.hide();
                    }
                }
            };
        }
    };
    const removeCalendar = (args) => {
        calendarsListObj.current.removeItem(args.item);
        calendars = calendars.filter((item) => item.id !== args.data.id);
        appointmentData = appointmentData.filter((item) => item.CalendarId !== args.data.id);
        selectedCalendars = getSelectedCalendars();
        filteredData = getFilteredData();
        scheduleObj.current.eventSettings.dataSource = extend([], filteredData.planned, null, true);
        gridObj.current.dataSource = extend([], filteredData.unPlanned, null, true);
    };
    const updateTextValue = () => {
        if (isAdd) {
            if (calendarNameObj) {
                let newValue = calendarNameObj.current.value.trim();
                newValue = newValue === "" ? "New Calendar" : newValue;
                const newId = (calendars.length + 1);
                const newItem = { name: newValue, id: newId, color: colorPickerObj.current.value, isSelected: true };
                calendars.push(newItem);
                selectedCalendars = getSelectedCalendars();
                calendarsListObj.current.dataSource = extend([], calendars, null, true);
                dialogObj.current.hide();
            }
            isAdd = false;
        }
    };
    const onListActionComplete = () => {
        setTimeout(() => {
            if (calendarsListObj.current) {
                let iconAdd = calendarsListObj.current.element.querySelector(".e-plus");
                applyBackgroundColors();
                if (iconAdd) {
                    iconAdd.addEventListener("click", () => {
                        isAdd = true;
                        calendarNameObj.current.value = '';
                        colorPickerObj.current.value = "#008000ff";
                        saveButtonRef.current.innerHTML = "Add";
                        dialogObj.current.show();
                    });
                }
            }
        }, 200);
    };
    const calendarSelection = (args) => {
        const idFromArgs = Number(args.data.id);
        calendars[args.index].isSelected = args.isChecked;
        selectedCalendars = getSelectedCalendars();
        if (args.isChecked) {
            changeCheckboxBackgroundColor(idFromArgs);
        }
        filteredData = getFilteredData();
        scheduleObj.current.eventSettings.dataSource = extend([], filteredData.planned, null, true);
        gridObj.current.dataSource = extend([], filteredData.unPlanned, null, true);
    };
    const applyBackgroundColors = () => {
        calendars.forEach((calendar) => {
            const listItem = calendarsListObj.current.element.querySelector(`[data-uid="${calendar.id}"]`);
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
    const changeCheckboxBackgroundColor = (idFromArgs) => {
        const listItem = document.querySelector(`[data-uid="${idFromArgs}"]`);
        if (listItem) {
            const checkboxFrame = listItem.querySelector('.e-checkbox-wrapper .e-frame.e-check');
            const selectedItem = calendars.find((item) => item.id === idFromArgs);
            if (checkboxFrame && selectedItem?.color) {
                checkboxFrame.style.backgroundColor = selectedItem.color;
                checkboxFrame.style.borderColor = selectedItem.color;
            }
        }
    };
    const onToolbarItemClicked = (args) => {
        if (!args.item) {
            return;
        }
        switch (args.item.cssClass) {
            case 'e-menu-btn':
                calendarSidebarObj.current.toggle();
                break;
            case 'e-create':
                if (scheduleObj && calendars.length > 0) {
                    const data = {
                        StartTime: resetTime(new Date()),
                        EndTime: resetTime(addDays(new Date(), 1)),
                        ResourceId: selectedCalendars?.ids[0] || calendars[0]?.id
                    };
                    scheduleObj.current.openEditor(data, 'Add', true);
                }
                break;
            case 'e-previous':
                scheduleObj.current.changeDate(scheduleObj.current.activeView.getNextPreviousDate('Previous'));
                break;
            case 'e-next':
                scheduleObj.current.changeDate(scheduleObj.current.activeView.getNextPreviousDate('Next'));
                break;
            case 'e-today':
                scheduleObj.current.selectedDate = new Date();
                break;
            case 'e-day':
                scheduleObj.current.currentView = 'Day';
                break;
            case 'e-week':
                scheduleObj.current.currentView = 'Week';
                break;
            case 'e-month':
                scheduleObj.current.currentView = 'Month';
                break;
            case 'e-agenda':
                scheduleObj.current.currentView = 'Agenda';
                break;
            case 'e-timeline':
                scheduleObj.current.currentView = 'TimelineMonth';
                break;
            case 'e-year':
                scheduleObj.current.currentView = 'Year';
                break;
            default:
                break;
        }
    };
    const onScheduleActionComplete = (args) => {
        if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
            updateDateRange();
            if (args.requestType === 'dateNavigate' && resetTime(calendarObj.current?.value) !== resetTime(scheduleObj.current.selectedDate)) {
                calendarObj.current.value = scheduleObj.current.selectedDate;
            }
        }
        else if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
            for (const event of args.addedRecords) {
                event.IsPlanned = true;
                appointmentData.push(event);
            }
            for (const event of args.changedRecords) {
                const index = appointmentData.findIndex((item) => item.Id === event.Id);
                appointmentData[index] = event;
            }
            for (const event of args.deletedRecords) {
                const index = appointmentData.findIndex((item) => item.Id === event.Id);
                appointmentData.splice(index, 1);
            }
            const events = args.addedRecords.concat(args.changedRecords);
            for (const event of events) {
                let calendar = selectedCalendars.items.find((item) => item.id === event.CalendarId);
                if (isNullOrUndefined(calendar)) {
                    calendar = calendars.find((item) => item.id === event.CalendarId);
                    calendar.isSelected = true;
                    selectedCalendars = getSelectedCalendars();
                    filteredData = getFilteredData();
                    calendarsListObj.current.dataSource = extend([], calendars, null, true);
                    scheduleObj.current.eventSettings.dataSource = extend([], filteredData.planned, null, true);
                    gridObj.current.dataSource = extend([], filteredData.unPlanned, null, true);
                }
            }
        }
    };
    const updateDateRange = () => {
        let dateRange = '';
        if (scheduleObj.current) {
            const dateCollection = scheduleObj.current.getCurrentViewDates();
            dateRange = scheduleObj.current.getDateRangeText(dateCollection);
            if (dateRange !== '' && toolbarObj) {
                const dateRangeElement = toolbarObj.current.element.querySelector('.e-date-range .e-tbar-btn-text');
                toolbarObj.current.element.querySelector('.e-date-range .e-tbar-btn').setAttribute('aria-label', dateRange);
                dateRangeElement.textContent = dateRange;
            }
        }
    };
    const valueChange = (args) => {
        if (args?.isInteracted && scheduleObj) {
            scheduleObj.current.selectedDate = args.value;
        }
    };
    const listTemplate = (data) => {
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
    const listHeaderTemplate = () => {
        return (<div className="calendars-list-header">
                <div className="header-text">Calendars</div>
                <div className="header-icon e-icons e-plus"></div>
            </div>);
    };
    const schedulePopupOpen = (args) => {
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
                    dataSource: extend([], calendars, null, true),
                    cssClass: "calendar-ddl",
                    fields: { text: "name", value: "id" },
                    value: args.data?.CalendarId || selectedCalendars?.ids[0] || calendars[0]?.id,
                    floatLabelType: "Always", placeholder: "Calendar"
                });
                dropDownList.appendTo(inputEle);
                inputEle.setAttribute("name", "CalendarId");
            }
            else {
                const calendarDDL = args.element.querySelector(".calendar-ddl input").ej2_instances[0];
                calendarDDL.dataSource = extend([], calendars, null, true);
                calendarDDL.value = args.data?.CalendarId || selectedCalendars?.ids[0] || calendars[0]?.id;
            }
        }
        else if (args.type === "QuickInfo" && isNullOrUndefined(args.data.Id)) {
            args.cancel = true;
        }
    };
    const eventRendered = (args) => {
        const categoryColor = selectedCalendars.items[selectedCalendars.ids.indexOf(args.data.CalendarId)].color;
        if (!args.element || !categoryColor) {
            return;
        }
        if (scheduleObj.current.currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            args.element.style.backgroundColor = categoryColor;
        }
    };
    const dialogContent = () => {
        return (<div className="dialogContent">
                <div>Calendar Name</div><div className="dialog-content"><TextBoxComponent ref={calendarNameObj} id="text-box" placeholder="Enter the calender name"/><ColorPickerComponent ref={colorPickerObj} id="color-picker"/></div>
            </div>);
    };
    const dialogFooterTemplate = () => {
        return (<button id="saveButton" ref={saveButtonRef} className="e-control e-btn e-primary" data-ripple="true" onClick={updateTextValue}></button>);
    };
    const unplannedSidebarClosed = () => {
        const unplannedElement = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
        if (unplannedElement) {
            unplannedElement.style.display = 'block';
        }
    };
    const unplannedSideBarCreated = () => {
        if (unPlannedSidebarObj.current) {
            const open = unPlannedSidebarObj.current.element.parentElement.querySelector('#plannedOpen');
            const unplannedElement = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
            if (open) {
                open.onclick = () => {
                    unPlannedSidebarObj.current.show();
                    filteredData = getFilteredData();
                    gridObj.current.dataSource = extend([], filteredData.unPlanned, null, true);
                    if (unplannedElement) {
                        unplannedElement.style.display = 'none';
                    }
                };
            }
        }
    };
    const unplannedSideBarCollapse = () => {
        if (unPlannedSidebarObj.current.isOpen) {
            unPlannedSidebarObj.current.hide();
            const unplannedElement = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
            if (unplannedElement) {
                unplannedElement.style.display = 'block';
            }
        }
    };
    return (<div id="event-calendar-sample" className="control-section event-calendar-control-section">
            <div className="control-wrapper">
                <div>
                    <ToolbarComponent ref={toolbarObj} id='toolbar' clicked={onToolbarItemClicked} cssClass="event-calendar-toolbar" style={{ 'border': '1px solid #e5e5e5', 'marginBottom': '8px' }}>
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
                <SidebarComponent id="sidebar-left" className="sidebar-treeview" ref={calendarSidebarObj} width={'320px'} height={'550px'} target={'.main-content'} mediaQuery={'(min-width: 600px)'} isOpen={true}>
                    <div className="table-content">
                        <CalendarComponent ref={calendarObj} id="calendar" value={currentDate} change={valueChange} cssClass='selected-date-calendar'/>
                        <div className="calendar-list-container">
                            <ListViewComponent ref={calendarsListObj} id='listview-def' dataSource={calendars} showCheckBox={true} fields={{ id: 'id', text: 'name', isChecked: 'isSelected' }} showHeader={true} headerTemplate={listHeaderTemplate} template={listTemplate} select={onCalendarListChange} actionComplete={onListActionComplete}></ListViewComponent>
                        </div>
                    </div>
                </SidebarComponent>
                <div className="main-content" id="main-text">
                    <div className="sidebar-content">
                        <div className="schedule-container">
                            <ScheduleComponent id="Schedule" ref={scheduleObj} height='550px' selectedDate={currentDate} showHeaderBar={false} eventSettings={eventSettings} eventRendered={eventRendered} popupOpen={schedulePopupOpen} created={updateDateRange} actionComplete={onScheduleActionComplete}>
                                <ResourcesDirective>
                                    <ResourceDirective field='ResourceId' title='Resources' name='Resources' allowMultiple={true} dataSource={resourceData} textField='name' idField='id' colorField='color'/>
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
                            <SidebarComponent ref={unPlannedSidebarObj} id="sidebar-right" position={'Right'} width={'300px'} target={'.main-content'} type="Push" isOpen={false} created={unplannedSideBarCreated} close={unplannedSidebarClosed}>
                                <div id="unplanned-events-toolbar">
                                    <button className="e-icons e-exit-full-screen" title="Open/Close Sidebar" onClick={unplannedSideBarCollapse}></button>
                                    <h4 id="headerText">Unplanned Events</h4>
                                </div>
                                <div className="unplanned-text-containers">
                                    <GridComponent ref={gridObj} dataSource={extend([], filteredData.unplanned, null, true)}>
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
                <DialogComponent ref={dialogObj} id='dialog' className='calendar-edit-dialog' header={"New Calender"} width={'320px'} content={dialogContent} footerTemplate={dialogFooterTemplate} showCloseIcon={true} isModal={true} animationSettings={{ effect: 'Zoom' }} visible={false}> </DialogComponent>
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
};
export default EventCalendar;
