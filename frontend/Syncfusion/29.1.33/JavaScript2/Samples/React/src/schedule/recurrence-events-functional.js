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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
/**
 * Schedule Recurrence events sample
 */
var RecurrenceEvents = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.recurrenceData, null, true);
    var _a = (0, react_1.useState)({ dataSource: data, editFollowingEvents: false }), eventSettings = _a[0], setEventSettings = _a[1];
    var onEventRendered = function (args) {
        (0, helper_1.applyCategoryColor)(args, scheduleObj.current.currentView);
    };
    var onChange = function (args) {
        setEventSettings(__assign(__assign({}, eventSettings), { editFollowingEvents: args.checked }));
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', selectedDate: new Date(2021, 1, 20), ref: scheduleObj, eventSettings: eventSettings, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'editFollowingEvents', checked: eventSettings.editFollowingEvents, label: 'Enable Following Events', change: onChange }))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases the scheduler with recurring meetings handled by a top-level manager on a regular pattern.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the recurrence events are defined with different repeat patterns. It can be defined through ",
                React.createElement("code", null, "recurrenceRule"),
                " field which should accept the valid rule string following the ",
                React.createElement("a", { "aria-label": "iCalender", target: "_blank", href: "https://tools.ietf.org/html/rfc5545#section-3.3.10" }, "iCalendar"),
                " specifications. The recurring events are differentiated from other events by a repeat marker added to the right-bottom of it. These events can repeat on daily, weekly, monthly or yearly basis."),
            React.createElement("p", null, "Here, the daily patterned events are depicted in blue color, weekly events are differentiated with green color, monthly events are depicted in orange color and the yearly event is depicted in the all-day section with another green shade for reference."),
            React.createElement("p", null,
                "Scheduler requires only the ",
                React.createElement("code", null, "startTime"),
                " and ",
                React.createElement("code", null, "endTime"),
                " fields as mandatory to be mapped from the dataSource. The Scheduler events can be categorized into 3 types based on its time range and all-day type."),
            React.createElement("table", { style: { width: '100%' } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", { style: { width: '100px' } },
                            React.createElement("strong", null, "Event")),
                        React.createElement("th", null,
                            React.createElement("strong", null, "Description"))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } }, "Normal events"),
                        React.createElement("td", null, "The events that has its start and end time duration on the same date.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } }, "Spanned events"),
                        React.createElement("td", null, "The events on which its start and end time spans over multiple days and usually displays together with all-day events.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } }, "All-day events"),
                        React.createElement("td", null,
                            "The events that are defined as all-day in its event object by setting ",
                            React.createElement("code", null, "isAllDay"),
                            " to true. It usually renders at the date header section of the Scheduler where no time-cells are present.")))))));
};
exports.default = RecurrenceEvents;
