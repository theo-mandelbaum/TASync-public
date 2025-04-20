"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule events sample
 */
var Events = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(""), eventLog = _a[0], setEventLog = _a[1];
    var scheduleObj = (0, react_1.useRef)(null);
    var eventObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
    var onEventRendered = function (args) {
        (0, helper_1.applyCategoryColor)(args, scheduleObj.current.currentView);
    };
    var onClear = function () {
        setEventLog('');
    };
    var onCreate = function () {
        appendElement('Load');
    };
    var onActionBegin = function () {
        appendElement('Action Begin');
    };
    var onActionComplete = function () {
        appendElement('Action Complete');
    };
    var onActionFailure = function () {
        appendElement('Action Failure');
    };
    var onCellDoubleClick = function () {
        appendElement('Cell Double Click');
    };
    var onCellClick = function () {
        appendElement('Cell Click');
    };
    var onNavigating = function () {
        appendElement('Navigating');
    };
    var onDestroyed = function () {
        appendElement('Destroyed');
    };
    var onEventClick = function () {
        appendElement('Event Click');
    };
    var onPopupOpen = function () {
        appendElement('Popup Open');
    };
    var appendElement = function (html) {
        setEventLog(function (prevLog) { return "Schedule <b>".concat(html, "</b> event is triggered<hr>").concat(prevLog); });
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: scheduleObj, width: '100%', height: '650px', selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: data }, created: onCreate, eventRendered: onEventRendered, actionBegin: onActionBegin, actionComplete: onActionComplete, actionFailure: onActionFailure, cellClick: onCellClick, cellDoubleClick: onCellDoubleClick, destroyed: onDestroyed, navigating: onNavigating, eventClick: onEventClick, popupOpen: onPopupOpen },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Event Trace' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '250px' } },
                            React.createElement("td", null,
                                React.createElement("div", { className: 'eventarea', style: { height: '245px', overflow: 'auto' } },
                                    React.createElement("span", { className: 'EventLog', id: 'EventLog', style: { wordBreak: 'normal' }, ref: eventObj, dangerouslySetInnerHTML: { __html: eventLog } })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { title: 'Clear', onClick: onClear }, "Clear")))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo illustrates the client-side events that triggers on respective Scheduler actions and the same is being displayed on the event trace panel.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null, "In this demo, the client-side events that triggers based on the action taking place in Scheduler has been demonstrated. The user can make use of these events, if at some point they need to perform some custom actions or any needed additional customizations on the available Scheduler features."))));
};
exports.default = Events;
