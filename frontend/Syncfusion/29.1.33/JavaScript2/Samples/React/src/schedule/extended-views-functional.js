"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 *  Schedule view based configuration sample
 */
var ExtendedViews = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.fifaEventsData, null, true);
    var onEventRendered = function (args) {
        var _a;
        (0, helper_1.applyCategoryColor)(args, (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.currentView);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: scheduleObj, selectedDate: new Date(2021, 5, 16), eventSettings: { dataSource: data }, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day', displayName: '3 Days', interval: 3 }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week', displayName: '2 Weeks', interval: 2 }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month', displayName: '4 Month', interval: 4 })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo illustrates how to display n number of days, weeks and months on a single view.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "interval"),
                " property has been defined with different values on each view such as 3 on day view, 2 on week view and 4 on month view \u2013 so that 3 days, 2 weeks and 4 months displayed on the respective views. This property is not applicable on agenda and month agenda views."))));
};
exports.default = ExtendedViews;
