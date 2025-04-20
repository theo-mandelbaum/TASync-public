"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule local data sample
 */
var LocalData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.zooEventsData, null, true);
    var onEventRendered = function (args) {
        var categoryColor = args.data.CategoryColor;
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
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', selectedDate: new Date(2021, 1, 15), ref: scheduleObj, eventSettings: { dataSource: data }, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo shows the way of binding an array of JavaScript objects (local JSON datasource) to Scheduler.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Scheduler can be bound either to local or remote data services which will load the data by default on demand to reduce the data transfer and load time. In this sample, the ",
                React.createElement("code", null, "dataSource"),
                " property available within the ",
                React.createElement("code", null, "eventSettings"),
                " needs to be assigned with the valid local JSON data."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "eventRendered"),
                " event is used to customize the events. In this sample, background color of the event is changed based on the custom field 'CategoryColor'"))));
};
exports.default = LocalData;
