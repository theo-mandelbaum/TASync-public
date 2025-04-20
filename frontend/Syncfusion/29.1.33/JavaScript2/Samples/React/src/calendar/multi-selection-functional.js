"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./multi-style.css");
var MultipleSelection = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)([
        new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        new Date(new Date().getFullYear(), new Date().getMonth(), 15),
        new Date(new Date().getFullYear(), new Date().getMonth(), 25),
    ]), selectedValues = _a[0], setSelectedValues = _a[1];
    var onchange = function (args) {
        if (args) {
            setSelectedValues(args.values);
        }
    };
    return (React.createElement("div", { className: "col-lg-12" },
        React.createElement("div", { className: "col-lg-7 control-section" },
            React.createElement("div", { id: "control_wrapper", className: "col-lg-6 col-sm-8 col-md-8 multiselectWrapper" },
                React.createElement("div", { className: "calendar-control-section" },
                    React.createElement(ej2_react_calendars_1.CalendarComponent, { id: "calendar", isMultiSelection: true, values: selectedValues, change: onchange.bind(_this), created: onchange.bind(_this) })))),
        React.createElement("div", { className: "col-lg-5" },
            React.createElement("label", { style: { paddingTop: '22px' } }, "Selected values"),
            React.createElement("div", { className: "content-value" }, __spreadArray([], selectedValues, true).reverse().map(function (value, index) { return (React.createElement("div", { key: index }, value.toString())); }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the multiple date selection functionalities of the Calendar. Click /Touch the desired date from the Calendar and the selected date will be added to the values property of the calendar.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Multi selection sample demonstrates, how to enable and select the multiple date in a calendar by using",
                React.createElement("code", null, "isMultiSelection"),
                " and",
                React.createElement("code", null, "values"),
                " properties . Here 10, 15 and 25 date's are selected."),
            React.createElement("p", null,
                "More information on the calendar instantiation can be found in this",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/calendar/multi-select/#multi-selection", target: "_blank" }, "documentation section"),
                "."))));
};
exports.default = MultipleSelection;
