"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./month-agenda.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule month agenda sample
 */
function MonthAgendaView() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.fifaEventsData, null, true);
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper schedule-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '510px', selectedDate: new Date(2021, 5, 20), eventSettings: { dataSource: data } },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'MonthAgenda' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.MonthAgenda] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases the layout of Month Agenda view and its working.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the active view of Scheduler is set to ",
                React.createElement("code", null, "MonthAgenda"),
                " and no other view options are provided to ",
                React.createElement("code", null, "views"),
                " property. This view is designed by considering the combination of both the calendar and agenda layout together, so that whenever a particular date is selected \u2013 the events belonging to that date will be displayed on the event section at the bottom. Also, the dates which holds one or more events are marked with a round indicator below that date."),
            React.createElement("p", null, "On double clicking the date cells, the user can open the default event editor to create events. The events displayed on this view at the bottom section can be edited or deleted either through popup options or edit event editor."),
            React.createElement("p", null,
                React.createElement("strong", null, "Module Injection")),
            React.createElement("p", null,
                "To work with Month Agenda view on Scheduler \u2013 it is necessary to inject the MonthAgenda module using ",
                React.createElement("code", null, "services"),
                " property under ",
                React.createElement("code", null, "Inject"),
                " tag."))));
}
exports.default = MonthAgendaView;
