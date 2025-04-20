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
    var _a = (0, react_1.useState)(null), selectedValue = _a[0], setSelectedValue = _a[1];
    var onchange = function (args) {
        /*Displays selected date in the label*/
        var month = args.value.toLocaleDateString('default', { month: 'long' });
        var year = args.value.getFullYear();
        setSelectedValue(month + ' ' + year);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_calendars_1.CalendarComponent, { change: onchange, start: start, depth: depth }),
                React.createElement("label", { id: "date_label" },
                    "Selected Value: ",
                    selectedValue,
                    " "))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the Calendar component acting as a month picker. It allows you to select values in terms of months.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Calendar has the ",
                React.createElement("code", null, "Start"),
                " and the ",
                React.createElement("code", null, "Depth"),
                " properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade). "),
            React.createElement("p", null,
                "More information on the Calendar Start/Depth can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/calendar/#start", target: "_blank" }, "Start"),
                "|",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/calendar/#depth", target: "_blank" }, "Depth"),
                " documentation section."))));
};
exports.default = MonthPicker;
