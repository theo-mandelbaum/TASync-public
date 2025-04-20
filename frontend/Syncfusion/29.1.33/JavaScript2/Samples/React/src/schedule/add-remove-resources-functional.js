"use strict";
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
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./add-remove-resources.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * schedule add and remove resources dynamically
 */
var AddRemoveResources = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var calendarCollections = [
        { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
        { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
        { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
        { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
    ];
    var generateCalendarData = function () {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], dataSource.personalData, true), dataSource.companyData, true), dataSource.birthdayData, true), dataSource.holidayData, true);
    };
    var onChange = function (args) {
        var value = parseInt(args.event.currentTarget.querySelector('input').getAttribute('value'), 10);
        var resourceData = calendarCollections.filter(function (calendar) { return calendar.CalendarId === value; });
        if (args.checked) {
            scheduleObj.current.addResource(resourceData[0], 'Calendars', value - 1);
        }
        else {
            scheduleObj.current.removeResource(value, 'Calendars');
        }
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'dynamic-resource', ref: scheduleObj, width: '100%', height: '650px', selectedDate: new Date(2021, 3, 1), group: { resources: ['Calendars'] }, eventSettings: { dataSource: generateCalendarData() } },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'CalendarId', title: 'Calendars', name: 'Calendars', allowMultiple: true, dataSource: [calendarCollections[0]], textField: 'CalendarText', idField: 'CalendarId', colorField: 'CalendarColor' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Show / Hide Resource' },
                React.createElement("table", { id: 'property', title: 'Show / Hide Resource', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { value: '1', id: 'personal', cssClass: 'personal', checked: true, label: 'My Calendar', disabled: true, change: onChange }))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { value: '2', id: 'company', cssClass: 'company', checked: false, label: 'Company', change: onChange }))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { value: '3', id: 'birthdays', cssClass: 'birthday', checked: false, label: 'Birthday', change: onChange }))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { value: '4', id: 'holidays', cssClass: 'holiday', checked: false, label: 'Holiday', change: onChange }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo illustrates how to dynamically add or remove resources to and from the Scheduler layout.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, Scheduler is initially displayed with single resource with its related set of appointments. When the additional checkboxes given are checked and unchecked, the respective resources gets added up or removed from the scheduler layout. To add new resources dynamically,",
                React.createElement("code", null, "addResource"),
                " method is used which accepts the arguments such as resource object, resource name (within which level, the resource object to be added) and index (position where the resource needs to be added). To remove the resources dynamically,",
                React.createElement("code", null, "removeResource"),
                " method is used which accepts the index (position from where the resource to be removed) and resource name (within which level, the resource object presents) as parameters."))));
};
exports.default = AddRemoveResources;
