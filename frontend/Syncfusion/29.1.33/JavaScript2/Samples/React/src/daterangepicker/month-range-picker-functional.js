"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./monthrangepicker-style.css");
var MonthRangePicker = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var start = 'Year';
    var depth = 'Year';
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'daterangepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { format: 'MMM/yyyy hh:mm a', start: start, depth: depth }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the DateRangePicker component acting as a month range picker. It allows you to select values within the range of months.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "DateRangePicker has the ",
                React.createElement("code", null, "Start"),
                " and the ",
                React.createElement("code", null, "Depth"),
                " properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade)."))));
};
exports.default = MonthRangePicker;
