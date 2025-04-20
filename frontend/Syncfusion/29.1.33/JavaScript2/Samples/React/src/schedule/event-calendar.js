"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.EventCalendar = void 0;
var React = require("react");
require("./event-calendar.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var dataSource = require("./datasource.json");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var base_1 = require("@syncfusion/ej2/base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var EventCalendar = /** @class */ (function (_super) {
    __extends(EventCalendar, _super);
    function EventCalendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentDate = new Date();
        _this.intl = new base_1.Internationalization();
        _this.calendars = [
            { name: "My Calendar", id: 1, color: "#c43081", isSelected: true },
            { name: "Company", id: 2, color: "#ff7f50", isSelected: true },
            { name: "Birthday", id: 3, color: "#AF27CD", isSelected: true },
            { name: "Holiday", id: 4, color: "#808000", isSelected: true }
        ];
        _this.selectedCalendars = _this.getSelectedCalendars();
        _this.appointmentData = _this.generateCalendarData();
        _this.filteredData = _this.getFilteredData();
        _this.eventSettings = { dataSource: (0, base_1.extend)([], _this.filteredData.planned, null, true) };
        _this.resourceData = [
            { name: 'Nancy', id: 1, color: '#df5286' },
            { name: 'Steven', id: 2, color: '#7fa900' },
            { name: 'Robert', id: 3, color: '#ea7a57' },
            { name: 'Smith', id: 4, color: '#5978ee' },
            { name: 'Micheal', id: 5, color: '#df5286' },
            { name: 'Root', id: 6, color: '#00bdae' }
        ];
        _this.onCalendarListChange = function (args) {
            var _a;
            if ((_a = args === null || args === void 0 ? void 0 : args.event) === null || _a === void 0 ? void 0 : _a.target) {
                var target = args.event.target;
                if (target.classList.contains('e-edit')) {
                    args.cancel = true;
                    _this.openDialog(args, 'Save');
                }
                else if (target.classList.contains('e-trash')) {
                    args.cancel = true;
                    _this.removeCalendar(args);
                }
                else {
                    _this.calendarSelection(args);
                }
            }
            else {
                _this.calendarSelection(args);
            }
        };
        _this.openDialog = function (args, action) {
            if (_this.calendarNameObj) {
                _this.calendarNameObj.value = args.data.name;
                _this.colorPickerObj.value = args.data.color;
                _this.saveButtonRef.innerHTML = action;
                _this.dialogObj.header = "Edit Calendar";
                _this.dialogObj.show();
                _this.saveButtonRef.onclick = function () {
                    if (_this.calendarNameObj) {
                        var newValue_1 = _this.calendarNameObj.value.trim();
                        var newColor_1 = _this.colorPickerObj.value.trim();
                        if (newValue_1.length > 0) {
                            _this.calendars = _this.calendars.map(function (item) {
                                if (item.name === args.data.name) {
                                    return __assign(__assign({}, item), { name: newValue_1, color: newColor_1 });
                                }
                                return item;
                            });
                            _this.selectedCalendars = _this.getSelectedCalendars();
                            _this.calendarsListObj.dataSource = (0, base_1.extend)([], _this.calendars, null, true);
                            _this.scheduleObj.refreshEvents();
                            _this.dialogObj.hide();
                        }
                    }
                };
            }
        };
        _this.removeCalendar = function (args) {
            _this.calendarsListObj.removeItem(args.item);
            _this.calendars = _this.calendars.filter(function (item) { return item.id !== args.data.id; });
            _this.appointmentData = _this.appointmentData.filter(function (item) { return item.CalendarId !== args.data.id; });
            _this.selectedCalendars = _this.getSelectedCalendars();
            _this.filteredData = _this.getFilteredData();
            _this.scheduleObj.eventSettings.dataSource = (0, base_1.extend)([], _this.filteredData.planned, null, true);
            _this.gridObj.dataSource = (0, base_1.extend)([], _this.filteredData.unPlanned, null, true);
        };
        _this.updateTextValue = function () {
            if (_this.isAdd) {
                if (_this.calendarNameObj) {
                    var newValue = _this.calendarNameObj.value.trim();
                    newValue = newValue === "" ? "New Calendar" : newValue;
                    var newId = (_this.calendars.length + 1);
                    var newItem = { name: newValue, id: newId, color: _this.colorPickerObj.value, isSelected: true };
                    _this.calendars.push(newItem);
                    _this.selectedCalendars = _this.getSelectedCalendars();
                    _this.calendarsListObj.dataSource = (0, base_1.extend)([], _this.calendars, null, true);
                    _this.dialogObj.hide();
                }
                _this.isAdd = false;
            }
        };
        _this.onListActionComplete = function () {
            setTimeout(function () {
                if (_this.calendarsListObj) {
                    var iconAdd = _this.calendarsListObj.element.querySelector(".e-plus");
                    _this.applyBackgroundColors();
                    if (iconAdd) {
                        iconAdd.addEventListener("click", function () {
                            _this.isAdd = true;
                            _this.calendarNameObj.value = '';
                            _this.colorPickerObj.value = "#008000ff";
                            _this.saveButtonRef.innerHTML = "Add";
                            _this.dialogObj.show();
                        });
                    }
                }
            }, 200);
        };
        _this.calendarSelection = function (args) {
            var idFromArgs = Number(args.data.id);
            _this.calendars[args.index].isSelected = args.isChecked;
            _this.selectedCalendars = _this.getSelectedCalendars();
            if (args.isChecked) {
                _this.changeCheckboxBackgroundColor(idFromArgs);
            }
            _this.filteredData = _this.getFilteredData();
            _this.scheduleObj.eventSettings.dataSource = (0, base_1.extend)([], _this.filteredData.planned, null, true);
            _this.gridObj.dataSource = (0, base_1.extend)([], _this.filteredData.unPlanned, null, true);
        };
        _this.applyBackgroundColors = function () {
            _this.calendars.forEach(function (calendar) {
                var listItem = _this.calendarsListObj.element.querySelector("[data-uid=\"".concat(calendar.id, "\"]"));
                if (listItem) {
                    var checkboxFrame = listItem.querySelector(".e-checkbox-wrapper .e-frame.e-check,\n                    .e-css.e-checkbox-wrapper .e-frame.e-check,.e-checkbox-wrapper .e-frame,.e-css.e-checkbox-wrapper .e-frame");
                    if (checkboxFrame) {
                        checkboxFrame.style.backgroundColor = calendar.color;
                        checkboxFrame.style.borderColor = calendar.color;
                    }
                }
            });
        };
        _this.changeCheckboxBackgroundColor = function (idFromArgs) {
            var listItem = document.querySelector("[data-uid=\"".concat(idFromArgs, "\"]"));
            if (listItem) {
                var checkboxFrame = listItem.querySelector('.e-checkbox-wrapper .e-frame.e-check');
                var selectedItem = _this.calendars.find(function (item) { return item.id === idFromArgs; });
                if (checkboxFrame && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.color)) {
                    checkboxFrame.style.backgroundColor = selectedItem.color;
                    checkboxFrame.style.borderColor = selectedItem.color;
                }
            }
        };
        _this.onToolbarItemClicked = function (args) {
            var _a, _b;
            if (!args.item) {
                return;
            }
            switch (args.item.cssClass) {
                case 'e-menu-btn':
                    _this.calendarSidebarObj.toggle();
                    break;
                case 'e-create':
                    if (_this.scheduleObj && _this.calendars.length > 0) {
                        var data = {
                            StartTime: (0, ej2_react_schedule_1.resetTime)(new Date()),
                            EndTime: (0, ej2_react_schedule_1.resetTime)((0, ej2_react_schedule_1.addDays)(new Date(), 1)),
                            ResourceId: ((_a = _this.selectedCalendars) === null || _a === void 0 ? void 0 : _a.ids[0]) || ((_b = _this.calendars[0]) === null || _b === void 0 ? void 0 : _b.id)
                        };
                        _this.scheduleObj.openEditor(data, 'Add', true);
                    }
                    break;
                case 'e-previous':
                    _this.scheduleObj.changeDate(_this.scheduleObj.activeView.getNextPreviousDate('Previous'));
                    break;
                case 'e-next':
                    _this.scheduleObj.changeDate(_this.scheduleObj.activeView.getNextPreviousDate('Next'));
                    break;
                case 'e-today':
                    _this.scheduleObj.selectedDate = new Date();
                    break;
                case 'e-day':
                    _this.scheduleObj.currentView = 'Day';
                    break;
                case 'e-week':
                    _this.scheduleObj.currentView = 'Week';
                    break;
                case 'e-month':
                    _this.scheduleObj.currentView = 'Month';
                    break;
                case 'e-agenda':
                    _this.scheduleObj.currentView = 'Agenda';
                    break;
                case 'e-timeline':
                    _this.scheduleObj.currentView = 'TimelineMonth';
                    break;
                case 'e-year':
                    _this.scheduleObj.currentView = 'Year';
                    break;
                default:
                    break;
            }
        };
        _this.onScheduleActionComplete = function (args) {
            if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
                _this.updateDateRange();
                if (args.requestType === 'dateNavigate' && (0, ej2_react_schedule_1.resetTime)(_this.calendarObj.value) !== (0, ej2_react_schedule_1.resetTime)(_this.scheduleObj.selectedDate)) {
                    _this.calendarObj.value = _this.scheduleObj.selectedDate;
                }
            }
            else if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
                for (var _i = 0, _a = args.addedRecords; _i < _a.length; _i++) {
                    var event_1 = _a[_i];
                    event_1.IsPlanned = true;
                    _this.appointmentData.push(event_1);
                }
                var _loop_1 = function (event_2) {
                    var index = _this.appointmentData.findIndex(function (item) { return item.Id === event_2.Id; });
                    _this.appointmentData[index] = event_2;
                };
                for (var _b = 0, _c = args.changedRecords; _b < _c.length; _b++) {
                    var event_2 = _c[_b];
                    _loop_1(event_2);
                }
                var _loop_2 = function (event_3) {
                    var index = _this.appointmentData.findIndex(function (item) { return item.Id === event_3.Id; });
                    _this.appointmentData.splice(index, 1);
                };
                for (var _d = 0, _e = args.deletedRecords; _d < _e.length; _d++) {
                    var event_3 = _e[_d];
                    _loop_2(event_3);
                }
                var events = args.addedRecords.concat(args.changedRecords);
                var _loop_3 = function (event_4) {
                    var calendar = _this.selectedCalendars.items.find(function (item) { return item.id === event_4.CalendarId; });
                    if ((0, base_1.isNullOrUndefined)(calendar)) {
                        calendar = _this.calendars.find(function (item) { return item.id === event_4.CalendarId; });
                        calendar.isSelected = true;
                        _this.selectedCalendars = _this.getSelectedCalendars();
                        _this.filteredData = _this.getFilteredData();
                        _this.calendarsListObj.dataSource = (0, base_1.extend)([], _this.calendars, null, true);
                        _this.scheduleObj.eventSettings.dataSource = (0, base_1.extend)([], _this.filteredData.planned, null, true);
                        _this.gridObj.dataSource = (0, base_1.extend)([], _this.filteredData.unPlanned, null, true);
                    }
                };
                for (var _f = 0, events_1 = events; _f < events_1.length; _f++) {
                    var event_4 = events_1[_f];
                    _loop_3(event_4);
                }
            }
        };
        _this.updateDateRange = function () {
            var dateRange = '';
            if (_this.scheduleObj) {
                var dateCollection = _this.scheduleObj.getCurrentViewDates();
                dateRange = _this.scheduleObj.getDateRangeText(dateCollection);
                if (dateRange !== '' && _this.toolbarObj) {
                    var dateRangeElement = _this.toolbarObj.element.querySelector('.e-date-range .e-tbar-btn-text');
                    _this.toolbarObj.element.querySelector('.e-date-range .e-tbar-btn').setAttribute('aria-label', dateRange);
                    dateRangeElement.textContent = dateRange;
                }
            }
        };
        _this.valueChanged = function (args) {
            if ((args === null || args === void 0 ? void 0 : args.isInteracted) && _this.scheduleObj) {
                _this.scheduleObj.selectedDate = args.value;
            }
        };
        _this.listTemplate = function (data) {
            return (React.createElement("div", { className: "calendar-list-item" },
                React.createElement("div", { className: "calendar-name", title: data.name }, data.name),
                data.id !== 1 && (React.createElement("div", { className: "calendar-buttons" },
                    React.createElement("span", { id: "calendar-edit-btn", className: "e-icons e-edit", "data-calendar-id": data.id }),
                    React.createElement("span", { id: "calendar-delete-btn", className: "e-icons e-trash", "data-calendar-id": data.id })))));
        };
        _this.listHeaderTemplate = function () {
            return (React.createElement("div", { className: "calendars-list-header" },
                React.createElement("div", { className: "header-text" }, "Calendars"),
                React.createElement("div", { className: "header-icon e-icons e-plus" })));
        };
        _this.schedulePopupOpen = function (args) {
            var _a, _b, _c, _d, _e, _f;
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
                        dataSource: (0, base_1.extend)([], _this.calendars, null, true),
                        cssClass: "calendar-ddl",
                        fields: { text: "name", value: "id" },
                        value: ((_a = args.data) === null || _a === void 0 ? void 0 : _a.CalendarId) || ((_b = _this.selectedCalendars) === null || _b === void 0 ? void 0 : _b.ids[0]) || ((_c = _this.calendars[0]) === null || _c === void 0 ? void 0 : _c.id),
                        floatLabelType: "Always", placeholder: "Calendar"
                    });
                    dropDownList.appendTo(inputEle);
                    inputEle.setAttribute("name", "CalendarId");
                }
                else {
                    var calendarDDL = args.element.querySelector(".calendar-ddl input").ej2_instances[0];
                    calendarDDL.dataSource = (0, base_1.extend)([], _this.calendars, null, true);
                    calendarDDL.value = ((_d = args.data) === null || _d === void 0 ? void 0 : _d.CalendarId) || ((_e = _this.selectedCalendars) === null || _e === void 0 ? void 0 : _e.ids[0]) || ((_f = _this.calendars[0]) === null || _f === void 0 ? void 0 : _f.id);
                }
            }
            else if (args.type === "QuickInfo" && (0, base_1.isNullOrUndefined)(args.data.Id)) {
                args.cancel = true;
            }
        };
        _this.eventRendered = function (args) {
            var categoryColor = _this.selectedCalendars.items[_this.selectedCalendars.ids.indexOf(args.data.CalendarId)].color;
            if (!args.element || !categoryColor) {
                return;
            }
            if (_this.scheduleObj.currentView === 'Agenda') {
                args.element.firstChild.style.borderLeftColor = categoryColor;
            }
            else {
                args.element.style.backgroundColor = categoryColor;
            }
        };
        _this.dialogContent = function () {
            return (React.createElement("div", { className: "dialogContent" },
                React.createElement("div", null, "Calendar Name"),
                React.createElement("div", { className: "dialog-content" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: function (calendarName) { return _this.calendarNameObj = calendarName; }, id: "text-box", placeholder: "Enter the calender name" }),
                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: function (colorPickerObj) { return _this.colorPickerObj = colorPickerObj; }, id: "color-picker" }))));
        };
        _this.dialogFooterTemplate = function () {
            return (React.createElement("button", { id: "saveButton", ref: function (saveButton) { return _this.saveButtonRef = saveButton; }, className: "e-control e-btn e-primary", "data-ripple": "true", onClick: _this.updateTextValue }));
        };
        _this.unplannedSidebarClosed = function () {
            var unplannedElement = _this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
            if (unplannedElement) {
                unplannedElement.style.display = 'block';
            }
        };
        _this.unplannedSideBarCreated = function () {
            if (_this.unPlannedSidebarObj) {
                var open_1 = _this.unPlannedSidebarObj.element.parentElement.querySelector('#plannedOpen');
                var unplannedElement_1 = _this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
                if (open_1) {
                    open_1.onclick = function () {
                        _this.unPlannedSidebarObj.show();
                        _this.filteredData = _this.getFilteredData();
                        _this.gridObj.dataSource = (0, base_1.extend)([], _this.filteredData.unPlanned, null, true);
                        if (unplannedElement_1) {
                            unplannedElement_1.style.display = 'none';
                        }
                    };
                }
            }
        };
        _this.unplannedSideBarCollapse = function () {
            if (_this.unPlannedSidebarObj.isOpen) {
                _this.unPlannedSidebarObj.hide();
                var unplannedElement = _this.unPlannedSidebarObj.element.parentElement.querySelector('.unplanned-container');
                if (unplannedElement) {
                    unplannedElement.style.display = 'block';
                }
            }
        };
        return _this;
    }
    EventCalendar.prototype.getSelectedCalendars = function () {
        var selectedIds = [];
        var selectedItems = [];
        for (var _i = 0, _a = this.calendars; _i < _a.length; _i++) {
            var calendar = _a[_i];
            if (calendar.isSelected) {
                selectedIds.push(calendar.id);
                selectedItems.push(calendar);
            }
        }
        return { ids: selectedIds, items: selectedItems };
    };
    EventCalendar.prototype.generateCalendarData = function () {
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
    };
    EventCalendar.prototype.getFilteredData = function () {
        var planned = [];
        var unPlanned = [];
        for (var _i = 0, _a = this.appointmentData; _i < _a.length; _i++) {
            var data = _a[_i];
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
    };
    EventCalendar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "event-calendar-sample", className: "control-section event-calendar-control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement("div", null,
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (toolbar) { return _this.toolbarObj = toolbar; }, cssClass: "event-calendar-toolbar", id: 'toolbar', clicked: this.onToolbarItemClicked, style: { 'border': '1px solid #e5e5e5', 'marginBottom': '8px' } },
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
                React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "sidebar-left", className: "sidebar-treeview", ref: function (sidebar) { return _this.calendarSidebarObj = sidebar; }, width: '320px', height: '550px', target: '.main-content', mediaQuery: '(min-width: 600px)', isOpen: true },
                    React.createElement("div", { className: "table-content" },
                        React.createElement(ej2_react_calendars_1.CalendarComponent, { ref: function (calendar) { return _this.calendarObj = calendar; }, id: "calendar", value: this.currentDate, change: this.valueChanged, cssClass: 'selected-date-calendar' }),
                        React.createElement("div", { className: "calendar-list-container" },
                            React.createElement(ej2_react_lists_1.ListViewComponent, { ref: function (calendarsObj) { return _this.calendarsListObj = calendarsObj; }, id: 'listview-def', dataSource: this.calendars, showCheckBox: true, fields: { id: 'id', text: 'name', isChecked: 'isSelected' }, showHeader: true, headerTemplate: this.listHeaderTemplate, template: this.listTemplate, select: this.onCalendarListChange, actionComplete: this.onListActionComplete })))),
                React.createElement("div", { className: "main-content", id: "main-text" },
                    React.createElement("div", { className: "sidebar-content" },
                        React.createElement("div", { className: "schedule-container" },
                            React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "Schedule", ref: function (schedule) { return _this.scheduleObj = schedule; }, height: '550px', selectedDate: this.currentDate, showHeaderBar: false, eventSettings: this.eventSettings, eventRendered: this.eventRendered, popupOpen: this.schedulePopupOpen, created: this.updateDateRange, actionComplete: this.onScheduleActionComplete },
                                React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                    React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ResourceId', title: 'Resources', name: 'Resources', allowMultiple: true, dataSource: this.resourceData, textField: 'name', idField: 'id', colorField: 'color' })),
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
                            React.createElement(ej2_react_navigations_1.SidebarComponent, { ref: function (rightSidebarObj) { return _this.unPlannedSidebarObj = rightSidebarObj; }, id: "sidebar-right", position: 'Right', width: '300px', target: '.main-content', type: "Push", isOpen: false, created: this.unplannedSideBarCreated, close: this.unplannedSidebarClosed },
                                React.createElement("div", { id: "unplanned-events-toolbar" },
                                    React.createElement("button", { className: "e-icons e-exit-full-screen", title: "Open/Close Sidebar", onClick: this.unplannedSideBarCollapse }),
                                    React.createElement("h4", { id: "headerText" }, "Unplanned Events")),
                                React.createElement("div", { className: "unplanned-text-containers" },
                                    React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return _this.gridObj = grid; }, dataSource: (0, base_1.extend)([], this.filteredData.unplanned, null, true) },
                                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Subject', headerText: "Event", width: '120px', textAlign: "Left" }),
                                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'StartTime', headerText: "Date", width: '140px', format: 'dd MMMM yyyy' }))))),
                            React.createElement("div", { className: "unplanned-text-container" }, "Unplanned events")))),
                React.createElement(ej2_react_popups_1.DialogComponent, { ref: function (dialog) { return _this.dialogObj = dialog; }, id: 'dialog', className: 'calendar-edit-dialog', header: "New Calender", width: '320px', content: this.dialogContent, footerTemplate: this.dialogFooterTemplate, showCloseIcon: true, isModal: true, animationSettings: { effect: 'Zoom' }, visible: false }, " ")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo showcases the way to organize and filter multiple types of events such as Personal, Birthdays, Work, and Holidays in the scheduler.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example the multiple type of appointments such as Personal, Birthdays, Work, and Holidays organized with filter option in a single scheduler. It helps the user to view a specific or multiple type of appointments at one place."),
                React.createElement("p", null, "The left sidebar helps the user to navigate between the scheduler dates and filter the appointments based on their type."),
                React.createElement("p", null, "The Schedule component is configured to show the appointments in colors based on their type to identify the appointment type."),
                React.createElement("p", null, "The right sidebar displays the list of unplanned events, which can be useful for the user to plan them later."))));
    };
    return EventCalendar;
}(sample_base_1.SampleBase));
exports.EventCalendar = EventCalendar;
