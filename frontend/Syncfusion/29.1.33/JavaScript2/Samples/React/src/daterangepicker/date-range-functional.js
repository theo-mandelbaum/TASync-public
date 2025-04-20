"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./range-style.css");
var DateRange = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var minDate = new Date('1/15/2017');
    var maxDate = new Date('12/20/2017');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'daterangepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { min: minDate, max: maxDate }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In this sample, the date ranges from ",
                React.createElement("code", null, "Jan 15, 2017 - Dec 20, 2017"),
                " have been set. All the other dates are out of range and ",
                React.createElement("code", null, "restricted"),
                " to set or select.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "DateRangePicker has ",
                React.createElement("code", null, "min"),
                " and ",
                React.createElement("code", null, "max"),
                " supports to restrict the user to select a value from the given range. Only the values in this range will be enabled. In this sample, we have specified ",
                React.createElement("code", null, "min"),
                " range as ",
                React.createElement("code", null, "Jan 15, 2017"),
                " and ",
                React.createElement("code", null, "max"),
                " range as ",
                React.createElement("code", null, "Dec 20, 2017"),
                ". User will be able to select the values between this range only."),
            React.createElement("p", null,
                "More information on the DateRangePicker min/max support can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/daterangepicker/range-selection/#restrict-the-range-within-a-range", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = DateRange;
