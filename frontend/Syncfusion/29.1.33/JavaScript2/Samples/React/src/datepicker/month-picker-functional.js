"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./monthpicker-style.css");
var MonthPicker = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var start = 'Year';
    var depth = 'Year';
    var format = 'MMMM y';
    var dateValue = new Date();
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'datepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DatePickerComponent, { value: dateValue, start: start, depth: depth, format: format }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the DatePicker component acting as a month picker. It allows you to select values in terms of months.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "DatePicker has the ",
                React.createElement("code", null, "Start"),
                " and the ",
                React.createElement("code", null, "Depth"),
                " properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade). "),
            React.createElement("p", null,
                "More information on the DatePicker Start/Depth can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datepicker/date-views/#start-and-depth-view", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = MonthPicker;
