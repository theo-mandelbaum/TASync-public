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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overview = void 0;
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var moment_timezone_1 = require("moment-timezone");
var sample_base_1 = require("../common/sample-base");
require("./overview.css");
var Overview = /** @class */ (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTimelineView = false;
        _this.intl = new ej2_base_1.Internationalization();
        _this.weekDays = [
            { text: 'Sunday', value: 0 },
            { text: 'Monday', value: 1 },
            { text: 'Tuesday', value: 2 },
            { text: 'Wednesday', value: 3 },
            { text: 'Thursday', value: 4 },
            { text: 'Friday', value: 5 },
            { text: 'Saturday', value: 6 }
        ];
        _this.exportItems = [
            { text: 'iCalendar', iconCss: 'e-icons e-export' },
            { text: 'Excel', iconCss: 'e-icons e-export-excel' }
        ];
        _this.contextMenuItems = [
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
        _this.calendarCollections = [
            { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
            { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
            { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
            { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
        ];
        _this.timezoneData = [
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
        _this.majorSlotData = [
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
        _this.minorSlotData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        _this.timeFormatData = [
            { Name: "12 hours", Value: "hh:mm a" },
            { Name: "24 hours", Value: "HH:mm" }
        ];
        _this.weekNumberData = [
            { Name: 'Off', Value: 'Off' },
            { Name: 'First Day of Year', Value: 'FirstDay' },
            { Name: 'First Full Week', Value: 'FirstFullWeek' },
            { Name: 'First Four-Day Week', Value: 'FirstFourDayWeek' }
        ];
        _this.tooltipData = [
            { Name: 'Off', Value: 'Off' },
            { Name: 'On', Value: 'On' }
        ];
        return _this;
    }
    Overview.prototype.importTemplateFn = function (data) {
        var template = '<div class="e-template-btn"><span class="e-btn-icon e-icons e-upload-1 e-icon-left"></span>${text}</div>';
        return (0, ej2_base_1.compile)(template.trim())(data);
    };
    Overview.prototype.updateLiveTime = function () {
        var scheduleTimezone = this.scheduleObj ? this.scheduleObj.timezone : 'Etc/GMT';
        var timeBtn = document.querySelector('.schedule-overview #timeBtn');
        if (timeBtn) {
            var liveTime = void 0;
            if (this.scheduleObj.isAdaptive) {
                liveTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: scheduleTimezone });
            }
            else {
                liveTime = new Date().toLocaleTimeString('en-US', { timeZone: scheduleTimezone });
            }
            timeBtn.innerHTML = liveTime;
        }
    };
    ;
    Overview.prototype.onImportClick = function (args) {
        this.scheduleObj.importICalendar(args.event.target.files[0]);
    };
    Overview.prototype.onPrint = function () {
        this.scheduleObj.print();
    };
    Overview.prototype.onExportClick = function (args) {
        if (args.item.text === 'Excel') {
            var exportDatas = [];
            var eventCollection = this.scheduleObj.getEvents();
            var resourceCollection = this.scheduleObj.getResourceCollections();
            var resourceData = resourceCollection[0].dataSource;
            var _loop_1 = function (resource) {
                var data = eventCollection.filter(function (e) { return e.CalendarId === resource.CalendarId; });
                exportDatas = exportDatas.concat(data);
            };
            for (var _i = 0, resourceData_1 = resourceData; _i < resourceData_1.length; _i++) {
                var resource = resourceData_1[_i];
                _loop_1(resource);
            }
            this.scheduleObj.exportToExcel({ exportType: 'xlsx', customData: exportDatas, fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'CalendarId'] });
        }
        else {
            this.scheduleObj.exportToICalendar();
        }
    };
    Overview.prototype.getEventData = function () {
        var date = this.scheduleObj.selectedDate;
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
    };
    Overview.prototype.onToolbarItemClicked = function (args) {
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
                var eventData = this.getEventData();
                this.scheduleObj.openEditor(eventData, 'Add', true);
                break;
            case 'New Recurring Event':
                var recEventData = this.getEventData();
                this.scheduleObj.openEditor(recEventData, 'Add', true, 1);
                break;
        }
    };
    Overview.prototype.timelineTemplate = function () {
        var _this = this;
        return (React.createElement("div", { className: 'template' },
            React.createElement("div", { className: 'icon-child' },
                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'timeline_views', checked: false, change: function (args) {
                        _this.isTimelineView = args.checked;
                        switch (_this.scheduleObj.currentView) {
                            case 'Day':
                            case 'TimelineDay':
                                _this.scheduleObj.currentView = _this.isTimelineView ? 'TimelineDay' : 'Day';
                                break;
                            case 'Week':
                            case 'TimelineWeek':
                                _this.scheduleObj.currentView = _this.isTimelineView ? 'TimelineWeek' : 'Week';
                                break;
                            case 'WorkWeek':
                            case 'TimelineWorkWeek':
                                _this.scheduleObj.currentView = _this.isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
                                break;
                            case 'Month':
                            case 'TimelineMonth':
                                _this.scheduleObj.currentView = _this.isTimelineView ? 'TimelineMonth' : 'Month';
                                break;
                            case 'Year':
                            case 'TimelineYear':
                                _this.scheduleObj.currentView = _this.isTimelineView ? 'TimelineYear' : 'Year';
                                break;
                            case 'Agenda':
                                _this.scheduleObj.currentView = 'Agenda';
                                break;
                        }
                    } })),
            React.createElement("div", { className: 'text-child' }, "Timeline Views")));
    };
    Overview.prototype.groupTemplate = function () {
        var _this = this;
        return (React.createElement("div", { className: 'template' },
            React.createElement("label", null,
                React.createElement("div", { className: 'icon-child' },
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'grouping', checked: true, change: function (args) { _this.scheduleObj.group.resources = args.checked ? ['Calendars'] : []; } })),
                React.createElement("div", { className: 'text-child' }, "Grouping"))));
    };
    Overview.prototype.gridlineTemplate = function () {
        var _this = this;
        return (React.createElement("div", { className: 'template' },
            React.createElement("label", null,
                React.createElement("div", { className: 'icon-child' },
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'gridlines', checked: true, change: function (args) { _this.scheduleObj.timeScale.enable = args.checked; } })),
                React.createElement("div", { className: 'text-child' }, "Gridlines"))));
    };
    Overview.prototype.autoHeightTemplate = function () {
        var _this = this;
        return (React.createElement("div", { className: 'template' },
            React.createElement("label", null,
                React.createElement("div", { className: 'icon-child' },
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'row_auto_height', checked: false, change: function (args) { _this.scheduleObj.rowAutoHeight = args.checked; } })),
                React.createElement("div", { className: 'text-child' }, "Row Auto Height"))));
    };
    Overview.prototype.getDateHeaderDay = function (value) {
        return this.intl.formatDate(value, { skeleton: 'E' });
    };
    Overview.prototype.getDateHeaderDate = function (value) {
        return this.intl.formatDate(value, { skeleton: 'd' });
    };
    Overview.prototype.getWeather = function (value) {
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
    };
    Overview.prototype.dateHeaderTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("div", null, this.getDateHeaderDay(props.date)),
            React.createElement("div", null, this.getDateHeaderDate(props.date)),
            React.createElement("div", { className: "date-text", dangerouslySetInnerHTML: { __html: this.getWeather(props.date) } })));
    };
    Overview.prototype.onResourceChange = function (args) {
        var resourcePredicate;
        for (var _i = 0, _a = args.value; _i < _a.length; _i++) {
            var value = _a[_i];
            if (resourcePredicate) {
                resourcePredicate = resourcePredicate.or(new ej2_data_1.Predicate('CalendarId', 'equal', value));
            }
            else {
                resourcePredicate = new ej2_data_1.Predicate('CalendarId', 'equal', value);
            }
        }
        this.scheduleObj.resources[0].query = resourcePredicate ? new ej2_data_1.Query().where(resourcePredicate) : new ej2_data_1.Query().where('CalendarId', 'equal', 1);
    };
    Overview.prototype.componentWillUnmount = function () {
        if (this.liveTimeInterval) {
            clearInterval(this.liveTimeInterval);
        }
    };
    Overview.prototype.render = function () {
        var _this = this;
        var generateEvents = function () {
            var eventData = [];
            var eventSubjects = [
                'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Traveling', 'Annual Conference', 'Birthday Celebration',
                'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day', 'MoonShiners',
                'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice', 'Rugby Match', 'Guitar Class',
                'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
            ];
            var weekDate = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
            var startDate = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 10, 0);
            var endDate = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 11, 30);
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
            for (var a = 0, id = 2; a < 500; a++) {
                var month = Math.floor(Math.random() * (11 - 0 + 1) + 0);
                var date = Math.floor(Math.random() * (28 - 1 + 1) + 1);
                var hour = Math.floor(Math.random() * (23 - 0 + 1) + 0);
                var minutes = Math.floor(Math.random() * (59 - 0 + 1) + 0);
                var start = new Date(new Date().getFullYear(), month, date, hour, minutes, 0);
                var end = new Date(start.getTime());
                end.setHours(end.getHours() + 2);
                var startDate_1 = new Date(start.getTime());
                var endDate_1 = new Date(end.getTime());
                eventData.push({
                    Id: id,
                    Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
                    StartTime: startDate_1,
                    EndTime: endDate_1,
                    Location: '',
                    Description: 'Event Scheduled',
                    IsAllDay: id % 10 === 0,
                    IsReadonly: endDate_1 < new Date(),
                    CalendarId: (a % 4) + 1
                });
                id++;
            }
            if (ej2_base_1.Browser.isIE) {
                ej2_react_schedule_1.Timezone.prototype.offset = function (date, timezone) { return moment_timezone_1.tz.zone(timezone).utcOffset(date.getTime()); };
            }
            var overviewEvents = (0, ej2_base_1.extend)([], eventData, undefined, true);
            var timezone = new ej2_react_schedule_1.Timezone();
            var currentTimezone = timezone.getLocalTimezoneName();
            for (var _i = 0, overviewEvents_1 = overviewEvents; _i < overviewEvents_1.length; _i++) {
                var event_1 = overviewEvents_1[_i];
                event_1.StartTime = timezone.convert(event_1.StartTime, 'UTC', currentTimezone);
                event_1.EndTime = timezone.convert(event_1.EndTime, 'UTC', currentTimezone);
            }
            return overviewEvents;
        };
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'content-wrapper' },
                    React.createElement("div", { className: 'schedule-overview' },
                        React.createElement(ej2_react_navigations_1.AppBarComponent, { colorMode: "Primary" },
                            React.createElement("span", { className: "time e-icons e-time-zone" }),
                            React.createElement("span", { id: "timezoneBtn", className: "time " }, "UTC"),
                            React.createElement("span", { className: "time e-icons e-clock" }),
                            React.createElement("span", { id: "timeBtn", className: "time current-time" }, "Time"),
                            React.createElement("div", { className: "e-appbar-spacer" }),
                            React.createElement("div", { className: 'control-panel calendar-export' },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'printBtn', cssClass: 'title-bar-btn e-inherit', iconCss: 'e-icons e-print', onClick: (this.onPrint.bind(this)), content: 'Print' })),
                            React.createElement("div", { className: 'control-panel import-button' },
                                React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', allowedExtensions: '.ics', cssClass: 'calendar-import', buttons: { browse: this.importTemplateFn({ text: 'Import' })[0] }, multiple: false, showFileList: false, selected: (this.onImportClick.bind(this)), created: function () {
                                        var element = document.querySelector('.calendar-import .e-css.e-btn');
                                        element.classList.add('e-inherit');
                                    } })),
                            React.createElement("div", { className: 'control-panel calendar-export' },
                                React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: 'exportBtn', content: 'Export', cssClass: 'e-inherit', items: this.exportItems, select: this.onExportClick.bind(this) })),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'settingsBtn', cssClass: 'overview-toolbar-settings e-inherit', iconCss: 'e-icons e-settings', iconPosition: 'Top', content: '', onClick: function () {
                                    var settingsPanel = document.querySelector('.overview-content .right-panel');
                                    if (settingsPanel.classList.contains('hide')) {
                                        (0, ej2_base_1.removeClass)([settingsPanel], 'hide');
                                        _this.workWeekObj.refresh();
                                        _this.resourceObj.refresh();
                                    }
                                    else {
                                        (0, ej2_base_1.addClass)([settingsPanel], 'hide');
                                    }
                                    _this.scheduleObj.refreshEvents();
                                } })),
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: 'toolbarOptions', cssClass: 'overview-toolbar', width: '100%', height: 70, overflowMode: 'Scrollable', scrollStep: 100, created: function () { return _this.liveTimeInterval = setInterval(function () { _this.updateLiveTime(); }, 1000); }, clicked: this.onToolbarItemClicked.bind(this) },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-plus', tooltipText: 'New Event', text: 'New Event', tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-repeat', tooltipText: 'New Recurring Event', text: 'New Recurring Event', tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-day', tooltipText: 'Day', text: 'Day', tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-week', tooltipText: 'Week', text: 'Week', tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-week', tooltipText: 'WorkWeek', text: 'WorkWeek', tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-month', tooltipText: 'Month', text: 'Month', tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-month', tooltipText: 'Year', text: 'Year', tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-agenda-date-range', tooltipText: 'Agenda', text: 'Agenda', tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Timeline Views', text: 'Timeline Views', template: this.timelineTemplate.bind(this), tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Grouping', text: 'Grouping', template: this.groupTemplate.bind(this), tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Timme Slots', text: 'Timme Slots', template: this.gridlineTemplate.bind(this), tabIndex: 0 }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Auto Fit Rows', text: 'Auto Fit Rows', template: this.autoHeightTemplate.bind(this), tabIndex: 0 }))),
                        React.createElement("div", { className: 'overview-content' },
                            React.createElement("div", { className: 'left-panel' },
                                React.createElement("div", { className: 'overview-scheduler' },
                                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: 'scheduler', cssClass: 'schedule-overview', ref: function (schedule) { return _this.scheduleObj = schedule; }, width: '100%', height: '100%', group: { resources: ['Calendars'] }, timezone: 'UTC', eventSettings: { dataSource: generateEvents() }, dateHeaderTemplate: this.dateHeaderTemplate.bind(this) },
                                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'CalendarId', title: 'Calendars', name: 'Calendars', dataSource: this.calendarCollections, query: new ej2_data_1.Query().where('CalendarId', 'equal', 1), textField: 'CalendarText', idField: 'CalendarId', colorField: 'CalendarColor' })),
                                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Year' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWorkWeek' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' }),
                                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineYear' })),
                                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Year, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.TimelineYear, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Resize, ej2_react_schedule_1.Print, ej2_react_schedule_1.ExcelExport, ej2_react_schedule_1.ICalendarImport, ej2_react_schedule_1.ICalendarExport] })),
                                    React.createElement(ej2_react_navigations_1.ContextMenuComponent, { id: 'overviewContextMenu', cssClass: 'schedule-context-menu', ref: function (menu) { return _this.contextMenuObj = menu; }, target: '.e-schedule', items: this.contextMenuItems, beforeOpen: function (args) {
                                            var newEventElement = document.querySelector('.e-new-event');
                                            if (newEventElement) {
                                                (0, ej2_base_1.remove)(newEventElement);
                                                (0, ej2_base_1.removeClass)([document.querySelector('.e-selected-cell')], 'e-selected-cell');
                                            }
                                            _this.scheduleObj.closeQuickInfoPopup();
                                            var targetElement = args.event.target;
                                            if ((0, ej2_base_1.closest)(targetElement, '.e-contextmenu')) {
                                                return;
                                            }
                                            _this.selectedTarget = (0, ej2_base_1.closest)(targetElement, '.e-appointment,.e-work-cells,.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
                                            if ((0, ej2_base_1.isNullOrUndefined)(_this.selectedTarget)) {
                                                args.cancel = true;
                                                return;
                                            }
                                            if (_this.selectedTarget.classList.contains('e-appointment')) {
                                                var eventObj = _this.scheduleObj.getEventDetails(_this.selectedTarget);
                                                if (eventObj.RecurrenceRule) {
                                                    _this.contextMenuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                                                    _this.contextMenuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
                                                }
                                                else {
                                                    _this.contextMenuObj.showItems(['Save', 'Delete'], true);
                                                    _this.contextMenuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                                                }
                                                return;
                                            }
                                            else if ((_this.selectedTarget.classList.contains('e-work-cells') || _this.selectedTarget.classList.contains('e-all-day-cells')) &&
                                                !_this.selectedTarget.classList.contains('e-selected-cell')) {
                                                (0, ej2_base_1.removeClass)([].slice.call(_this.scheduleObj.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
                                                _this.selectedTarget.setAttribute('aria-selected', 'true');
                                                _this.selectedTarget.classList.add('e-selected-cell');
                                            }
                                            _this.contextMenuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                                            _this.contextMenuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
                                        }, select: function (args) {
                                            var selectedMenuItem = args.item.id;
                                            var eventObj = {};
                                            if (_this.selectedTarget && _this.selectedTarget.classList.contains('e-appointment')) {
                                                eventObj = _this.scheduleObj.getEventDetails(_this.selectedTarget);
                                            }
                                            switch (selectedMenuItem) {
                                                case 'Today':
                                                    _this.scheduleObj.selectedDate = new Date();
                                                    break;
                                                case 'Add':
                                                case 'AddRecurrence':
                                                    var selectedCells = _this.scheduleObj.getSelectedElements();
                                                    var isRightClickInSelectedCells = selectedCells.some(function (cell) { return cell === _this.selectedTarget; });
                                                    var activeCellsData = _this.scheduleObj.getCellDetails(isRightClickInSelectedCells ? selectedCells : [_this.selectedTarget]);
                                                    if (selectedMenuItem === 'Add') {
                                                        _this.scheduleObj.openEditor(activeCellsData, 'Add');
                                                    }
                                                    else {
                                                        _this.scheduleObj.openEditor(activeCellsData, 'Add', false, 1);
                                                    }
                                                    break;
                                                case 'Save':
                                                case 'EditOccurrence':
                                                case 'EditSeries':
                                                    if (selectedMenuItem === 'EditSeries') {
                                                        var query = new ej2_data_1.Query().where(_this.scheduleObj.eventFields.id, 'equal', eventObj.RecurrenceID);
                                                        eventObj = new ej2_data_1.DataManager(_this.scheduleObj.eventsData).executeLocal(query)[0];
                                                    }
                                                    _this.scheduleObj.openEditor(eventObj, selectedMenuItem);
                                                    break;
                                                case 'Delete':
                                                    _this.scheduleObj.deleteEvent(eventObj);
                                                    break;
                                                case 'DeleteOccurrence':
                                                case 'DeleteSeries':
                                                    _this.scheduleObj.deleteEvent(eventObj, selectedMenuItem);
                                                    break;
                                            }
                                        } }))),
                            React.createElement("div", { className: 'right-panel hide' },
                                React.createElement("div", { className: 'control-panel e-css' },
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Calendar")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "resources", cssClass: 'schedule-resource', ref: function (resources) { return _this.resourceObj = resources; }, dataSource: this.calendarCollections, mode: 'CheckBox', fields: { text: 'CalendarText', value: 'CalendarId' }, enableSelectionOrder: false, showClearButton: false, showDropDownIcon: true, popupHeight: 300, value: [1], change: this.onResourceChange.bind(this) },
                                                React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "First Day of Week")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "weekFirstDay", dataSource: this.weekDays, fields: { text: 'text', value: 'value' }, value: 0, popupHeight: 400, change: function (args) { _this.scheduleObj.firstDayOfWeek = args.value; } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Work week")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "workWeekDays", cssClass: 'schedule-workweek', ref: function (workWeek) { return _this.workWeekObj = workWeek; }, dataSource: this.weekDays, mode: 'CheckBox', fields: { text: 'text', value: 'value' }, enableSelectionOrder: false, showClearButton: false, showDropDownIcon: true, popupHeight: 150, value: [1, 2, 3, 4, 5], change: function (args) { return _this.scheduleObj.workDays = args.value; } },
                                                React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Resources")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "resources", cssClass: 'schedule-resource', ref: function (resources) { return _this.resourceObj = resources; }, dataSource: this.calendarCollections, mode: 'CheckBox', fields: { text: 'CalendarText', value: 'CalendarId' }, enableSelectionOrder: false, showClearButton: false, showDropDownIcon: true, popupHeight: 150, value: [1], change: this.onResourceChange.bind(this) },
                                                React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Timezone")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "timezone", dataSource: this.timezoneData, fields: { text: 'text', value: 'value' }, value: 'Etc/GMT', popupHeight: 150, change: function (args) {
                                                    _this.scheduleObj.timezone = args.value;
                                                    _this.updateLiveTime();
                                                    document.querySelector('.schedule-overview #timezoneBtn').innerHTML = args.itemData.text;
                                                } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Day Start Hour")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'dayStartHour', showClearButton: false, value: new Date(new Date().setHours(0, 0, 0)), change: function (args) { return _this.scheduleObj.startHour = _this.intl.formatDate(args.value, { skeleton: 'Hm' }); } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Day End Hour")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'dayEndHour', showClearButton: false, value: new Date(new Date().setHours(23, 59, 59)), change: function (args) { return _this.scheduleObj.endHour = _this.intl.formatDate(args.value, { skeleton: 'Hm' }); } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Work Start Hour")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'workHourStart', showClearButton: false, value: new Date(new Date().setHours(9, 0, 0)), change: function (args) { return _this.scheduleObj.workHours.start = _this.intl.formatDate(args.value, { skeleton: 'Hm' }); } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Work End Hour")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: 'workHourEnd', showClearButton: false, value: new Date(new Date().setHours(18, 0, 0)), change: function (args) { return _this.scheduleObj.workHours.end = _this.intl.formatDate(args.value, { skeleton: 'Hm' }); } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Slot Duration")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "slotDuration", dataSource: this.majorSlotData, fields: { text: 'Name', value: 'Value' }, value: 60, popupHeight: 150, change: function (args) { _this.scheduleObj.timeScale.interval = args.value; } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Slot Interval")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "slotInterval", dataSource: this.minorSlotData, value: 2, popupHeight: 150, change: function (args) { _this.scheduleObj.timeScale.slotCount = args.value; } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Time Format")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "timeFormat", dataSource: this.timeFormatData, fields: { text: 'Name', value: 'Value' }, value: "hh:mm a", popupHeight: 150, change: function (args) { _this.scheduleObj.timeFormat = args.value; } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Week Numbers")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "weekNumber", dataSource: this.weekNumberData, fields: { text: 'Name', value: 'Value' }, value: "Off", popupHeight: 150, change: function (args) {
                                                    if (args.value == "Off") {
                                                        _this.scheduleObj.showWeekNumber = false;
                                                    }
                                                    else {
                                                        _this.scheduleObj.showWeekNumber = true;
                                                        _this.scheduleObj.weekRule = args.value;
                                                    }
                                                } }))),
                                    React.createElement("div", { className: 'col-row' },
                                        React.createElement("div", { className: 'col-left' },
                                            React.createElement("label", { style: { lineHeight: '34px', margin: '0' } }, "Tooltip")),
                                        React.createElement("div", { className: 'col-right' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "tooltip", dataSource: this.tooltipData, fields: { text: 'Name', value: 'Value' }, value: "Off", popupHeight: 150, change: function (args) {
                                                    if (args.value === "Off") {
                                                        _this.scheduleObj.eventSettings.enableTooltip = false;
                                                    }
                                                    else {
                                                        _this.scheduleObj.eventSettings.enableTooltip = true;
                                                    }
                                                } }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This ",
                    React.createElement("a", { "aria-label": "React scheduler example", href: "https://www.syncfusion.com/react-ui-components/react-scheduler", target: "_blank" }, "React Scheduler example"),
                    " demonstrates the overview of React Scheduler with its overall features. Use the toolbar buttons to play with Scheduler functionalities.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The React Scheduler is a fully-features calendar component that is used to manage appointments with multiple resources. The data can be pulled from the ",
                    React.createElement("code", null, "dataManager"),
                    " component or valid local JSON data or Restful web services and bind the data fields using ",
                    React.createElement("code", null, "eventSettings.fields"),
                    "."),
                React.createElement("p", null, "In this demo, React Scheduler features such as Multiple views, Templates (Date Header, Quick Info), Resources, Grouping, Timezone, Timescale, etc... are used along with multiple resources."))));
    };
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
