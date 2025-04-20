"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./read-only-events.css");
var sample_base_1 = require("../common/sample-base");
var helper_1 = require("./helper");
/**
 * Schedule readonly events sample
 */
var ReadonlyEvents = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, helper_1.getReadOnlyEventsData)();
    var onPopupOpen = function (args) {
        if ((args.target && !args.target.classList.contains('e-appointment') && (args.type === 'QuickInfo')) || (args.type === 'Editor')) {
            args.cancel = onEventCheck(args);
        }
    };
    var onActionBegin = function (args) {
        if ((args.requestType === 'eventCreate') || args.requestType === 'eventChange') {
            args.cancel = onEventCheck(args);
        }
    };
    var onDragStop = function (args) {
        args.cancel = onEventCheck(args);
    };
    var onResizeStop = function (args) {
        args.cancel = onEventCheck(args);
    };
    var onEventCheck = function (args) {
        var eventObj = args.data instanceof Array ? args.data[0] : args.data;
        return (eventObj.StartTime < new Date());
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', eventSettings: { dataSource: data }, popupOpen: onPopupOpen, actionBegin: onActionBegin, dragStop: onDragStop, resizeStop: onResizeStop },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases how to make specific events on the Scheduler to be displayed in a read-only mode. The read-only events can be simply viewed and prevented from undergoing any edit actions.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the events that has occurred on the past hours from the current time are made as read-only and the CRUD actions has been prevented on it. This has been done by setting ",
                React.createElement("code", null, "true"),
                " to the ",
                React.createElement("code", null, "IsReadonly"),
                " field of past events. By doing so, the ",
                React.createElement("code", null, "aria-readonly"),
                " attribute gets added into the event element and differentiate it from the other normal events."))));
};
exports.default = ReadonlyEvents;
