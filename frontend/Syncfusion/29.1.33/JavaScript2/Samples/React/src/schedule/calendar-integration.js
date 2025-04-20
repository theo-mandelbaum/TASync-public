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
exports.CalendarIntegration = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
/**
 * schedule google calendar integration sample
 */
var CalendarIntegration = /** @class */ (function (_super) {
    __extends(CalendarIntegration, _super);
    function CalendarIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.calendarId = 'en.usa%23holiday@group.v.calendar.google.com';
        _this.publicKey = 'AIzaSyBgbX_tgmVanBP4yafDPPXxWr70sjbKAXM';
        _this.dataManger = new ej2_data_1.DataManager({
            url: 'https://www.googleapis.com/calendar/v3/calendars/' + _this.calendarId + '/events?key=' + _this.publicKey,
            adaptor: new ej2_data_1.WebApiAdaptor(),
            crossDomain: true
        });
        return _this;
    }
    CalendarIntegration.prototype.onDataBinding = function (e) {
        var items = e.result.items;
        var scheduleData = [];
        if (items.length > 0) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var event_1 = items_1[_i];
                var when = event_1.start.dateTime;
                var start = event_1.start.dateTime;
                var end = event_1.end.dateTime;
                if (!when) {
                    when = event_1.start.date;
                    start = event_1.start.date;
                    end = event_1.end.date;
                }
                scheduleData.push({
                    Id: event_1.id,
                    Subject: event_1.summary,
                    StartTime: start,
                    EndTime: end,
                    IsAllDay: !event_1.start.dateTime
                });
            }
        }
        e.result = scheduleData;
    };
    CalendarIntegration.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper drag-sample-wrapper' },
                    React.createElement("div", { className: "schedule-container" },
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', readonly: true, eventSettings: { dataSource: this.dataManger }, dataBinding: this.onDataBinding.bind(this), currentView: 'Month', timezone: 'UTC' },
                            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example illustrates how to load and integrate events data from the Google Calendar into our Scheduler.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, we have assigned our custom created Google Calendar url to the DataManager and assigned the same to the Scheduler ",
                    React.createElement("code", null, "dataSource"),
                    " within the ",
                    React.createElement("code", null, "eventSettings"),
                    " API. Since the events data retrieved from the Google Calendar will be in its own object format, therefore it needs to be resolved manually within the Scheduler\u2019s ",
                    React.createElement("code", null, "dataBinding"),
                    " event. Within this ",
                    React.createElement("code", null, "dataBinding"),
                    " event, the event fields needs to be mapped properly and then assigned to the result."))));
    };
    return CalendarIntegration;
}(sample_base_1.SampleBase));
exports.CalendarIntegration = CalendarIntegration;
