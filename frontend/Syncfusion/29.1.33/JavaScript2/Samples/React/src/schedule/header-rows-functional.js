"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./resources.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var helper_1 = require("./helper");
var dataSource = require("./datasource.json");
/**
 * schedule header rows sample
 */
var HeaderRows = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.headerRowData, null, true);
    var scheduleObj = (0, react_1.useRef)(null);
    var instance = new ej2_base_1.Internationalization();
    var getMonthDetails = function (value) {
        return instance.formatDate(value.date, { skeleton: 'yMMMM' });
    };
    var getWeekDetails = function (value) {
        return 'Week ' + (0, ej2_react_schedule_1.getWeekNumber)((0, ej2_react_schedule_1.getWeekLastDate)(value.date, 0));
    };
    var monthTemplate = function (props) {
        return (React.createElement("span", { className: "month" }, getMonthDetails(props)));
    };
    var weekTemplate = function (props) {
        return (React.createElement("span", { className: "week" }, getWeekDetails(props)));
    };
    var onEventRendered = function (args) {
        (0, helper_1.applyCategoryColor)(args, scheduleObj.current.currentView);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: scheduleObj, width: '100%', height: '650px', selectedDate: new Date(2021, 0, 1), eventSettings: { dataSource: data }, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.HeaderRowsDirective, null,
                        React.createElement(ej2_react_schedule_1.HeaderRowDirective, { option: 'Month', template: monthTemplate }),
                        React.createElement(ej2_react_schedule_1.HeaderRowDirective, { option: 'Week', template: weekTemplate }),
                        React.createElement(ej2_react_schedule_1.HeaderRowDirective, { option: 'Date' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth', interval: 12 })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This demo showcases how to display the additional header rows on timeline view. In this demo, an additional row for displaying",
                React.createElement("b", null, "month"),
                " and ",
                React.createElement("b", null, "week number"),
                " has been added.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Unlike the usual date and time rows, timeline view can be displayed with additional header rows to display the years, months and week numbers. To do so, define the ",
                React.createElement("code", null, "headerRows"),
                " property which accepts an array of object and each object includes the",
                React.createElement("code", null, "option"),
                " API to define the specific header row type such as ",
                React.createElement("code", null, "Year"),
                ", ",
                React.createElement("code", null, "Month"),
                ", ",
                React.createElement("code", null, "Week"),
                " and",
                React.createElement("code", null, "Date"),
                ". The object also includes the ",
                React.createElement("code", null, "template"),
                " option to provide label customization on these rows. This",
                React.createElement("code", null, "headerRows"),
                " property is application only on timeline views."))));
};
exports.default = HeaderRows;
