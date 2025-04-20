"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./event-calendar.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var react_2 = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var dataSource = require("./datasource.json");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var base_1 = require("@syncfusion/ej2/base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
/**
 *  Schedule event calendar sample
 */
var EventCalendar = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_2.useRef)(null);
    var calendarSidebarObj = (0, react_2.useRef)(null);
    var colorPickerObj = (0, react_2.useRef)(null);
    var calendarObj = (0, react_2.useRef)(null);
    var unPlannedSidebarObj = (0, react_2.useRef)(null);
    var calendarsListObj = (0, react_2.useRef)(null);
    var gridObj = (0, react_2.useRef)(null);
    var dialogObj = (0, react_2.useRef)(null);
    var toolbarObj = (0, react_2.useRef)(null);
    var calendarNameObj = (0, react_2.useRef)(null);
    var currentDate = (0, react_2.useState)(new Date())[0];
    var saveButtonRef = (0, react_2.useRef)(null);
    var isAdd;
    var calendars = [
        { name: "My Calendar", id: 1, color: "#c43081", isSelected: true },
        { name: "Company", id: 2, color: "#ff7f50", isSelected: true },
        { name: "Birthday", id: 3, color: "#AF27CD", isSelected: true },
        { name: "Holiday", id: 4, color: "#808000", isSelected: true }
    ];
    var fields = { text: "name", value: "id" };
    var selectedCalendars = getSelectedCalendars();
    var appointmentData = generateCalendarData();
    var filteredData = getFilteredData();
    var eventSettings = { dataSource: (0, base_1.extend)([], filteredData.planned, null, true) };
    var resourceData = [
        { name: 'Nancy', id: 1, color: '#df5286' },
        { name: 'Steven', id: 2, color: '#7fa900' },
        { name: 'Robert', id: 3, color: '#ea7a57' },
        { name: 'Smith', id: 4, color: '#5978ee' },
        { name: 'Micheal', id: 5, color: '#df5286' },
        { name: 'Root', id: 6, color: '#00bdae' }
    ];
    function getSelectedCalendars() {
        var selectedIds = [];
        var selectedItems = [];
        for (var _i = 0, calendars_1 = calendars; _i < calendars_1.length; _i++) {
            var calendar = calendars_1[_i];
            if (calendar.isSelected) {
                selectedIds.push(calendar.id);
                selectedItems.push(calendar);
            }
        }
        return { ids: selectedIds, items: selectedItems };
    }
    ;
    function generateCalendarData() {
        var collections = (0, base_1.extend)([], __spreadArray(__spreadArray(__spreadArray(__spreadArray([], dataSource.personalData, true), dataSource.companyData, true), dataSource.birthdayData, true), dataSource.holidayData, true), null, true);
        var oldTime = new Date(2021, 3, 1).getTime();
        var newTime = (0, ej2_react_schedule_1.resetTime)(new Date()).getTime();
        for (var _i = 0, collections_1 = collections; _i < collections_1.length; _i++) {
            var data = collections_1[_i];
            data.IsPlanned = !(data.Id % 2);
            data.IsAllDay = [1, 2].indexOf(data.CalendarId) <= -1;
            var diff = oldTime - new Date(data.StartTime).getTime();
            var hour = Math.floor(Math.random() * (13 - 9) + 9);
            data.StartTime = new Date(newTime - diff + (data.IsAllDay ? 0 : (hour * 60 * 60 * 1000)));
            data.EndTime = new Date(data.StartTime.getTime() + (data.IsAllDay ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000));
            data.ResourceId = Math.floor(Math.random() * 6) + 1;
        }
        return collections;
    }
    ;
    function getFilteredData() {
        var planned = [];
        var unPlanned = [];
        for (var _i = 0, appointmentData_1 = appointmentData; _i < appointmentData_1.length; _i++) {
            var data = appointmentData_1[_i];
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
    var onCalendarListChange = function (args) {
        var _a;
        if ((_a = args === null || args === void 0 ? void 0 : args.event) === null || _a === void 0 ? void 0 : _a.target) {
            var target = args.event.target;
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
    var openDialog = function (args, action) {
        if (calendarNameObj) {
            calendarNameObj.current.value = args.data.name;
            colorPickerObj.current.value = args.data.color;
            saveButtonRef.current.innerHTML = action;
            dialogObj.current.header = "Edit Calendar";
            dialogObj.current.show();
            saveButtonRef.current.onclick = function () {
                if (calendarNameObj) {
                    var newValue_1 = calendarNameObj.current.value.trim();
                    var newColor_1 = colorPickerObj.current.value.trim();
                    if (newValue_1.length > 0) {
                        calendars = calendars.map(function (item) {
                            if (item.name === args.data.name) {
                                return __assign(__assign({}, item), { name: newValue_1, color: newColor_1 });
                            }
                            return item;
                        });
                        selectedCalendars = getSelectedCalendars();
                        calendarsListObj.current.dataSource = (0, base_1.extend)([], calendars, null, true);
                        scheduleObj.current.refreshEvents();
                        dialogObj.current.hide();
                    }
                }
            };
        }
    };
    var removeCalendar = function (args) {
        calendarsListObj.current.removeItem(args.item);
        calendars = calendars.filter(function (item) { return item.id !== args.data.id; });
        appointmentData = appointmentData.filter(function (item) { return item.CalendarId !== args.data.id; });
        selectedCalendars = getSelectedCalendars();
        filteredData = getFilteredData();
        scheduleObj.current.eventSettings.dataSource = (0, base_1.extend)([], filteredData.planned, null, true);
        gridObj.current.dataSource = (0, base_1.extend)([], filteredData.unPlanned, null, true);
    };
    var updateTextValue = function () {
        if (isAdd) {
            if (calendarNameObj) {
                var newValue = calendarNameObj.current.value.trim();
                newValue = newValue === "" ? "New Calendar" : newValue;
                var newId = (calendars.length + 1);
                var newItem = { name: newValue, id: newId, color: colorPickerObj.current.value, isSelected: true };
                calendars.push(newItem);
                selectedCalendars = getSelectedCalendars();
                calendarsListObj.current.dataSource = (0, base_1.extend)([], calendars, null, true);
                dialogObj.current.hide();
            }
            isAdd = false;
        }
    };
    var onListActionComplete = function () {
        setTimeout(function () {
            if (calendarsListObj.current) {
                var iconAdd = calendarsListObj.current.element.querySelector(".e-plus");
                applyBackgroundColors();
                if (iconAdd) {
                    iconAdd.addEventListener("click", function () {
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
    var calendarSelection = function (args) {
        var idFromArgs = Number(args.data.id);
        calendars[args.index].isSelected = args.isChecked;
        selectedCalendars = getSelectedCalendars();
        if (args.isChecked) {
            changeCheckboxBackgroundColor(idFromArgs);
        }
        filteredData = getFilteredData();
        scheduleObj.current.eventSettings.dataSource = (0, base_1.extend)([], filteredData.planned, null, true);
        gridObj.current.dataSource = (0, base_1.extend)([], filteredData.unPlanned, null, true);
    };
    var applyBackgroundColors = function () {
        calendars.forEach(function (calendar) {
            var listItem = calendarsListObj.current.element.querySelector("[data-uid=\"".concat(calendar.id, "\"]"));
            if (listItem) {
                var checkboxFrame = listItem.querySelector(".e-checkbox-wrapper .e-frame.e-check,\n                    .e-css.e-checkbox-wrapper .e-frame.e-check,.e-checkbox-wrapper .e-frame,.e-css.e-checkbox-wrapper .e-frame");
                if (checkboxFrame) {
                    checkboxFrame.style.backgroundColor = calendar.color;
                    checkboxFrame.style.borderColor = calendar.color;
                }
            }
        });
    };
    var changeCheckboxBackgroundColor = function (idFromArgs) {
        var listItem = document.querySelector("[data-uid=\"".concat(idFromArgs, "\"]"));
        if (listItem) {
            var checkboxFrame = listItem.querySelector('.e-checkbox-wrapper .e-frame.e-check');
            var selectedItem = calendars.find(function (item) { return item.id === idFromArgs; });
            if (checkboxFrame && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.color)) {
                checkboxFrame.style.backgroundColor = selectedItem.color;
                checkboxFrame.style.borderColor = selectedItem.color;
            }
        }
    };
    var onToolbarItemClicked = function (args) {
        var _a;
        if (!args.item) {
            return;
        }
        switch (args.item.cssClass) {
            case 'e-menu-btn':
                calendarSidebarObj.current.toggle();
                break;
            case 'e-create':
                if (scheduleObj && calendars.length > 0) {
                    var data = {
                        StartTime: (0, ej2_react_schedule_1.resetTime)(new Date()),
                        EndTime: (0, ej2_react_schedule_1.resetTime)((0, ej2_react_schedule_1.addDays)(new Date(), 1)),
                        ResourceId: (selectedCalendars === null || selectedCalendars === void 0 ? void 0 : selectedCalendars.ids[0]) || ((_a = calendars[0]) === null || _a === void 0 ? void 0 : _a.id)
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
    var onScheduleActionComplete = function (args) {
        var _a;
        if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
            updateDateRange();
            if (args.requestType === 'dateNavigate' && (0, ej2_react_schedule_1.resetTime)((_a = calendarObj.current) === null || _a === void 0 ? void 0 : _a.value) !== (0, ej2_react_schedule_1.resetTime)(scheduleObj.current.selectedDate)) {
                calendarObj.current.value = scheduleObj.current.selectedDate;
            }
        }
        else if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
            for (var _i = 0, _b = args.addedRecords; _i < _b.length; _i++) {
                var event_1 = _b[_i];
                event_1.IsPlanned = true;
                appointmentData.push(event_1);
            }
            var _loop_1 = function (event_2) {
                var index = appointmentData.findIndex(function (item) { return item.Id === event_2.Id; });
                appointmentData[index] = event_2;
            };
            for (var _c = 0, _d = args.changedRecords; _c < _d.length; _c++) {
                var event_2 = _d[_c];
                _loop_1(event_2);
            }
            var _loop_2 = function (event_3) {
                var index = appointmentData.findIndex(function (item) { return item.Id === event_3.Id; });
                appointmentData.splice(index, 1);
            };
            for (var _e = 0, _f = args.deletedRecords; _e < _f.length; _e++) {
                var event_3 = _f[_e];
                _loop_2(event_3);
            }
            var events = args.addedRecords.concat(args.changedRecords);
            var _loop_3 = function (event_4) {
                var calendar = selectedCalendars.items.find(function (item) { return item.id === event_4.CalendarId; });
                if ((0, base_1.isNullOrUndefined)(calendar)) {
                    calendar = calendars.find(function (item) { return item.id === event_4.CalendarId; });
                    calendar.isSelected = true;
                    selectedCalendars = getSelectedCalendars();
                    filteredData = getFilteredData();
                    calendarsListObj.current.dataSource = (0, base_1.extend)([], calendars, null, true);
                    scheduleObj.current.eventSettings.dataSource = (0, base_1.extend)([], filteredData.planned, null, true);
                    gridObj.current.dataSource = (0, base_1.extend)([], filteredData.unPlanned, null, true);
                }
            };
            for (var _g = 0, events_1 = events; _g < events_1.length; _g++) {
                var event_4 = events_1[_g];
                _loop_3(event_4);
            }
        }
    };
    var updateDateRange = function () {
        var dateRange = '';
        if (scheduleObj.current) {
            var dateCollection = scheduleObj.current.getCurrentViewDates();
            dateRange = scheduleObj.current.getDateRangeText(dateCollection);
            if (dateRange !== '' && toolbarObj) {
                var dateRangeElement = toolbarObj.current.element.querySelector('.e-date-range .e-tbar-btn-text');
                toolbarObj.current.element.querySelector('.e-date-range .e-tbar-btn').setAttribute('aria-label', dateRange);
                dateRangeElement.textContent = dateRange;
            }
        }
    };
    var valueChange = function (args) {
        if ((args === null || args === void 0 ? void 0 : args.isInteracted) && scheduleObj) {
            scheduleObj.current.selectedDate = args.value;
        }
    };
    var listTemplate = function (data) {
        return (React.createElement("div", { className: "calendar-list-item" },
            React.createElement("div", { className: "calendar-name", title: data.name }, data.name),
            data.id !== 1 && (React.createElement("div", { className: "calendar-buttons" },
                React.createElement("span", { id: "calendar-edit-btn", className: "e-icons e-edit", "data-calendar-id": data.id }),
                React.createElement("span", { id: "calendar-delete-btn", className: "e-icons e-trash", "data-calendar-id": data.id })))));
    };
    var listHeaderTemplate = function () {
        return (React.createElement("div", { className: "calendars-list-header" },
            React.createElement("div", { className: "header-text" }, "Calendars"),
            React.createElement("div", { className: "header-icon e-icons e-plus" })));
    };
    var schedulePopupOpen = function (args) {
        var _a, _b, _c, _d;
        if (args.type === "Editor") {
            if (!args.element.querySelector(".custom-field-row")) {
                var row = document.createElement('div');
                row.className = 'custom-field-row';
                var formElement = args.element.querySelector(".e-schedule-form");
                formElement.firstChild.insertBefore(row, args.element.querySelector(".e-resources-row"));
                var container = document.createElement('div');
                container.className = 'custom-field-container';
                var inputEle = document.createElement('input');
                inputEle.className = 'e-field';
                inputEle.name = 'CalendarId';
                container.appendChild(inputEle);
                row.appendChild(container);
                var dropDownList = new ej2_react_dropdowns_1.DropDownList({
                    dataSource: (0, base_1.extend)([], calendars, null, true),
                    cssClass: "calendar-ddl",
                    fields: { text: "name", value: "id" },
                    value: ((_a = args.data) === null || _a === void 0 ? void 0 : _a.CalendarId) || (selectedCalendars === null || selectedCalendars === void 0 ? void 0 : selectedCalendars.ids[0]) || ((_b = calendars[0]) === null || _b === void 0 ? void 0 : _b.id),
                    floatLabelType: "Always", placeholder: "Calendar"
                });
                dropDownList.appendTo(inputEle);
                inputEle.setAttribute("name", "CalendarId");
            }
            else {
                var calendarDDL = args.element.querySelector(".calendar-ddl input").ej2_instances[0];
                calendarDDL.dataSource = (0, base_1.extend)([], calendars, null, true);
                calendarDDL.value = ((_c = args.data) === null || _c === void 0 ? void 0 : _c.CalendarId) || (selectedCalendars === null || selectedCalendars === void 0 ? void 0 : selectedCalendars.ids[0]) || ((_d = calendars[0]) === null || _d === void 0 ? void 0 : _d.id);
            }
        }
        else if (args.type === "QuickInfo" && (0, base_1.isNullOrUndefined)(args.data.Id)) {
            args.cancel = true;
        }
    };
    var eventRendered = function (args) {
        var categoryColor = selectedCalendars.items[selectedCalendars.ids.indexOf(args.data.CalendarId)].color;
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
    var dialogContent = function () {
        return (React.createElement("div", { className: "dialogContent" },
            React.createElement("div", null, "Calendar Name"),
            React.createElement("div", { className: "dialog-content" },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: calendarNameObj, id: "text-box", placeholder: "Enter the calender name" }),
                React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: colorPickerObj, id: "color-picker" }))));
    };
    var dialogFooterTemplate = function () {
        return (React.createElement("button", { id: "saveButton", ref: saveButtonRef, className: "e-control e-btn e-primary", "data-ripple": "true", onClick: updateTextValue }));
    };
    var unplannedSidebarClosed = function () {
        var unplannedElement = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
        if (unplannedElement) {
            unplannedElement.style.display = 'block';
        }
    };
    var unplannedSideBarCreated = function () {
        if (unPlannedSidebarObj.current) {
            var open_1 = unPlannedSidebarObj.current.element.parentElement.querySelector('#plannedOpen');
            var unplannedElement_1 = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
            if (open_1) {
                open_1.onclick = function () {
                    unPlannedSidebarObj.current.show();
                    filteredData = getFilteredData();
                    gridObj.current.dataSource = (0, base_1.extend)([], filteredData.unPlanned, null, true);
                    if (unplannedElement_1) {
                        unplannedElement_1.style.display = 'none';
                    }
                };
            }
        }
    };
    var unplannedSideBarCollapse = function () {
        if (unPlannedSidebarObj.current.isOpen) {
            unPlannedSidebarObj.current.hide();
            var unplannedElement = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
            if (unplannedElement) {
                unplannedElement.style.display = 'block';
            }
        }
    };
    return (React.createElement("div", { id: "event-calendar-sample", className: "control-section event-calendar-control-section" },
        React.createElement("div", { className: "control-wrapper" },
            React.createElement("div", null,
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: toolbarObj, id: 'toolbar', clicked: onToolbarItemClicked, cssClass: "event-calendar-toolbar", style: { 'border': '1px solid #e5e5e5', 'marginBottom': '8px' } },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: "Menu", prefixIcon: "e-menu", cssClass: 'e-menu-btn' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-chevron-left", tooltipText: 'Previous Week', cssClass: 'e-previous' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-chevron-right", tooltipText: 'Next Week', cssClass: 'e-next' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: new Date().toLocaleDateString(), cssClass: 'e-date-range' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Create", align: 'Right', prefixIcon: "e-plus", cssClass: 'e-create' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator', align: 'Right' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Today', align: 'Right', cssClass: 'e-today' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator', align: 'Right' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Day', align: 'Right', cssClass: 'e-day' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Week', align: 'Right', cssClass: 'e-week' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Month', align: 'Right', cssClass: 'e-month' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Agenda', align: 'Right', cssClass: 'e-agenda' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Timeline', align: 'Right', cssClass: 'e-timeline' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Year', align: 'Right', cssClass: 'e-year' })))),
            React.createElement("div", { className: "leftside" }),
            React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "sidebar-left", className: "sidebar-treeview", ref: calendarSidebarObj, width: '320px', height: '550px', target: '.main-content', mediaQuery: '(min-width: 600px)', isOpen: true },
                React.createElement("div", { className: "table-content" },
                    React.createElement(ej2_react_calendars_1.CalendarComponent, { ref: calendarObj, id: "calendar", value: currentDate, change: valueChange, cssClass: 'selected-date-calendar' }),
                    React.createElement("div", { className: "calendar-list-container" },
                        React.createElement(ej2_react_lists_1.ListViewComponent, { ref: calendarsListObj, id: 'listview-def', dataSource: calendars, showCheckBox: true, fields: { id: 'id', text: 'name', isChecked: 'isSelected' }, showHeader: true, headerTemplate: listHeaderTemplate, template: listTemplate, select: onCalendarListChange, actionComplete: onListActionComplete })))),
            React.createElement("div", { className: "main-content", id: "main-text" },
                React.createElement("div", { className: "sidebar-content" },
                    React.createElement("div", { className: "schedule-container" },
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "Schedule", ref: scheduleObj, height: '550px', selectedDate: currentDate, showHeaderBar: false, eventSettings: eventSettings, eventRendered: eventRendered, popupOpen: schedulePopupOpen, created: updateDateRange, actionComplete: onScheduleActionComplete },
                            React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ResourceId', title: 'Resources', name: 'Resources', allowMultiple: true, dataSource: resourceData, textField: 'name', idField: 'id', colorField: 'color' })),
                            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth', group: { resources: ['Resources'] } }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Year' })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Year] }))),
                    React.createElement("div", { className: "unplanned-container" },
                        React.createElement("div", { id: "plannedOpen", className: "e-icons e-chevron-left-double" }),
                        React.createElement(ej2_react_navigations_1.SidebarComponent, { ref: unPlannedSidebarObj, id: "sidebar-right", position: 'Right', width: '300px', target: '.main-content', type: "Push", isOpen: false, created: unplannedSideBarCreated, close: unplannedSidebarClosed },
                            React.createElement("div", { id: "unplanned-events-toolbar" },
                                React.createElement("button", { className: "e-icons e-exit-full-screen", title: "Open/Close Sidebar", onClick: unplannedSideBarCollapse }),
                                React.createElement("h4", { id: "headerText" }, "Unplanned Events")),
                            React.createElement("div", { className: "unplanned-text-containers" },
                                React.createElement(ej2_react_grids_1.GridComponent, { ref: gridObj, dataSource: (0, base_1.extend)([], filteredData.unplanned, null, true) },
                                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Subject', headerText: "Event", width: '120px', textAlign: "Left" }),
                                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'StartTime', headerText: "Date", width: '140px', format: 'dd MMMM yyyy' }))))),
                        React.createElement("div", { className: "unplanned-text-container" }, "Unplanned events")))),
            React.createElement(ej2_react_popups_1.DialogComponent, { ref: dialogObj, id: 'dialog', className: 'calendar-edit-dialog', header: "New Calender", width: '320px', content: dialogContent, footerTemplate: dialogFooterTemplate, showCloseIcon: true, isModal: true, animationSettings: { effect: 'Zoom' }, visible: false }, " ")),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo showcases the way to organize and filter multiple types of events such as Personal, Birthdays, Work, and Holidays in the scheduler.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example the multiple type of appointments such as Personal, Birthdays, Work, and Holidays organized with filter option in a single scheduler. It helps the user to view a specific or multiple type of appointments at one place."),
            React.createElement("p", null, "The left sidebar helps the user to navigate between the scheduler dates and filter the appointments based on their type."),
            React.createElement("p", null, "The Schedule component is configured to show the appointments in colors based on their type to identify the appointment type."),
            React.createElement("p", null, "The right sidebar displays the list of unplanned events, which can be useful for the user to plan them later."))));
};
exports.default = EventCalendar;
