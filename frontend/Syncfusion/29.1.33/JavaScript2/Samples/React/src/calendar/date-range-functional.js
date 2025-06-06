"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./daterange-style.css");
var Range = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7);
    var maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27);
    var _a = (0, react_1.useState)(null), selectedValue = _a[0], setSelectedValue = _a[1];
    var onchange = function (args) {
        /*Displays selected date in the label*/
        setSelectedValue(args.value.toLocaleDateString());
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_calendars_1.CalendarComponent, { id: "calendar", min: minDate, max: maxDate, change: onchange }),
                React.createElement("label", { id: 'date_label' },
                    "Selected Value:",
                    selectedValue))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In the following sample, a specific date ranges from 7th to 27th of a month has been set to select from the Calendar. All the other dates are out of range and ",
                React.createElement("code", null, "restricted"),
                " to set or select.")),
        React.createElement("div", { id: 'description' },
            "Date Range sample illustrates the date selection within a specific range in a calendar by using min and max properties. Here, the date selection range was resricted within  a range from 7th to 27th days in a month.",
            React.createElement("p", null,
                "More information on the calendar instantiation can be found in this ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/calendar/date-range/' }, "documentation"),
                " section."))));
};
exports.default = Range;
