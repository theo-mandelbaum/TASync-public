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
    var minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7);
    var maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27);
    var dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'datepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DatePickerComponent, { id: "calendar", min: minDate, max: maxDate, value: dateValue }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "Date Range sample illustrates the date selection within the specific range in a calendar by using min and max properties. Here, the date selection range was ",
                React.createElement("code", null, "restricted"),
                " within a range from 7th to 27th days in a month.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null, "Date Range sample illustrates the date selection within the specific range in a calendar by using min and max properties. Here, the date selection range was restricted within a range from 7th to 27th days in a month."),
            React.createElement("p", null,
                "More information on the date range configuration can be found in the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datepicker/date-range.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Range;
