"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var moment_timezone_1 = require("moment-timezone");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 *  Schedule timezone events sample
 */
if (ej2_base_1.Browser.isIE) {
    ej2_react_schedule_1.Timezone.prototype.offset = function (date, timezone) {
        return moment_timezone_1.tz.zone(timezone).utcOffset(date.getTime());
    };
}
var TimeZone = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var fifaEvents = (0, ej2_base_1.extend)([], (dataSource.fifaEventsData), null, true);
    var timezone = new ej2_react_schedule_1.Timezone();
    var timeZoneOptions = [
        { text: '(UTC-05:00) Eastern Time', value: 'America/New_York' },
        { text: 'Coordinated Universal Time', value: 'UTC' },
        { text: '(UTC+03:00) Moscow+00 - Moscow', value: 'Europe/Moscow' },
        { text: '(UTC+05:30) India Standard Time', value: 'Asia/Kolkata' },
        { text: '(UTC+08:00) Western Time - Perth', value: 'Australia/Perth' }
    ];
    var fields = { text: 'text', value: 'value' };
    var _a = (0, react_1.useState)('UTC'), schedulerTimezone = _a[0], setSchedulerTimezone = _a[1];
    // Here remove the local offset from events
    (0, react_1.useEffect)(function () {
        for (var _i = 0, fifaEvents_1 = fifaEvents; _i < fifaEvents_1.length; _i++) {
            var event_1 = fifaEvents_1[_i];
            event_1.StartTime = timezone.removeLocalOffset(new Date(event_1.StartTime));
            event_1.EndTime = timezone.removeLocalOffset(new Date(event_1.EndTime));
        }
    }, [timezone]);
    var onEventRendered = function (args) {
        var _a;
        (0, helper_1.applyCategoryColor)(args, (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.currentView);
    };
    var onTimeZoneChange = function (args) {
        var _a;
        setSchedulerTimezone(args.value);
        (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.dataBind();
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '18px' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '5%' } },
                                React.createElement("div", { className: 'timezone', style: { fontSize: '14px' } }, " Timezone")),
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 'UTC', popupWidth: 'auto', fields: fields, dataSource: timeZoneOptions, change: onTimeZoneChange, floatLabelType: 'Always', width: '250' })))))),
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: scheduleObj, selectedDate: new Date(2021, 5, 20), timezone: schedulerTimezone, workHours: { start: '11:00' }, eventSettings: { dataSource: fifaEvents }, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo visualizes the 2021 FIFA football match scheduler which is depicted as events here. The timings of each event are associated with the timezone of the match location where it will be held. When the Scheduler time zone changes, the events in it displays according to the selected timezone's offset time difference.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "timezone"),
                " of Scheduler is set to UTC and each events on it holds different ",
                React.createElement("code", null, "startTimezone"),
                " and",
                React.createElement("code", null, "endTimezone"),
                " values, therefore the event timings will be converted based on timezone assigned to Scheduler and will be displayed appropriately in UTC timings."),
            React.createElement("p", null,
                "When the user selects different timezone value listed out in a dropdown on properties panel, Scheduler will display the events accordingly to the selected timezone value as the selected timezone will be assigned to Scheduler ",
                React.createElement("code", null, "timezone"),
                " property."))));
};
exports.default = TimeZone;
