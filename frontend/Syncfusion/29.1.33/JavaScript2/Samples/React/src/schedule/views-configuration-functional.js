"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./views-configuration.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 *  Schedule view based configuration sample
 */
var ViewConfigurations = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.fifaEventsData, null, true);
    var instance = new ej2_base_1.Internationalization();
    var resourceData = [
        { GroupText: 'Group A', GroupId: 1, GroupColor: '#1aaa55' },
        { GroupText: 'Group B', GroupId: 2, GroupColor: '#357cd2' }
    ];
    var getTimeString = function (value) {
        return instance.formatDate(value, { skeleton: 'Hm' });
    };
    var agendaTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("div", { className: "subject " }, props.Subject),
            (props.Description !== null && props.Description !== undefined && props.Description !== "") ? React.createElement("div", { className: "group" }, props.Description) : "",
            React.createElement("div", { className: "location" },
                getTimeString(props.StartTime),
                (props.City !== null && props.City !== undefined && props.City !== "") ? ", " + props.City : "")));
    };
    var monthEventTemplate = function (props) {
        return (React.createElement("div", { className: "e-subject" }, props.Subject));
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'schedule-views-config', width: '100%', height: '650px', currentView: 'Month', selectedDate: new Date(2021, 5, 20), eventSettings: { dataSource: data, fields: { location: { name: 'City' } } } },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'GroupId', title: 'Owner', name: 'Owners', dataSource: resourceData, textField: 'GroupText', idField: 'GroupId', colorField: 'GroupColor' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day', startHour: '07:00', endHour: '18:00' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week', startHour: '09:00', endHour: '19:00', showWeekend: false, timeScale: { interval: 60, slotCount: 4 } }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month', group: { resources: ['Owners'] }, eventTemplate: monthEventTemplate }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda', eventTemplate: agendaTemplate })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo illustrates how to customize each view with specific configurations like applying event template on agenda view, setting different start/end hour to day and week views and enabling grouping in month view. It also shows how to hide the weekend days and to set different time intervals on week view.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the  ",
                React.createElement("code", null, "views"),
                " property is defined to accept the array of view options and therefore for each view, it is possible to set different configurations. In day view, the the ",
                React.createElement("code", null, "startHour"),
                " is set to 7 and ",
                React.createElement("code", null, "endHour"),
                " set to 18 whereas in week view, the same is set as 9 and 19 respectively. Also, the ",
                React.createElement("code", null, "showWeekend"),
                " property is set to false only on week view along with different timescale interval. The customized template is applied to the events on Agenda view and on month view, the grouping functionality is enabled by setting ",
                React.createElement("code", null, "group"),
                " property."))));
};
exports.default = ViewConfigurations;
