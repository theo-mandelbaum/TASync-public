"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./range-style.css");
var Range = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7, 10);
    var maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27, 22, 30);
    var minTime = new Date(new Date().getFullYear(), new Date().getMonth(), 7, 10);
    var maxTime = new Date(new Date().getFullYear(), new Date().getMonth(), 27, 20, 30);
    var dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10, 30);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'datetimepicker-control-section', id: "datetime-restriction" },
                    React.createElement("label", { className: "h4" }, "DateTime Restriction"),
                    React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "calendar1", min: minDate, max: maxDate, value: dateValue }))),
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'datetimepicker-control-section', id: "time-restriction" },
                    React.createElement("label", { className: "h4" }, "Time Restriction"),
                    React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "calendar2", minTime: minTime, maxTime: maxTime, value: dateValue })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This example demonstrates date and time selection within specific ranges defined by the ",
                React.createElement("code", null, "Min"),
                ", ",
                React.createElement("code", null, "Max"),
                ", ",
                React.createElement("code", null, "MinTime"),
                ", and ",
                React.createElement("code", null, "MaxTime"),
                " properties. Dates and times outside these ranges are ",
                React.createElement("code", null, "restricted"),
                " and cannot be set or selected.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Date Range example explains the date and time selection within the specific range in a calendar and time popup list by using ",
                React.createElement("code", null, "Min"),
                ", ",
                React.createElement("code", null, "Max"),
                ", ",
                React.createElement("code", null, "MinTime"),
                " and ",
                React.createElement("code", null, "MaxTime"),
                " properties. Here, the 1st datetimepicker date selection range was restricted within a range from 7th 10:00 AM to 27th 10:30 PM days in a month."),
            React.createElement("p", null, "The 2nd datetimepicker time selection range is restricted from 10:00 AM to 8:30 PM of each day."),
            React.createElement("p", null,
                "More information on the date range configuration can be found in the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datetimepicker/date-time-range/", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Range;
