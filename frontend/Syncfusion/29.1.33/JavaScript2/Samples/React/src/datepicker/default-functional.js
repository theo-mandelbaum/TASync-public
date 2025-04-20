"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./default-style.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dateValue = new Date();
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'datepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DatePickerComponent, { value: dateValue }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The following sample demonstrates the default functionalities of the DatePicker. Today's date is always ",
                React.createElement("code", null, "highlighted"),
                " in the popup calendar and it get focused if there's no selected date. Click/Touch the desired date from the popup calendar and the selected date will be displayed in the element.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "DatePicker"),
                " is a graphical user interface component that allows the user to select, or to enter a date value."),
            React.createElement("p", null,
                "More information on the DatePicker instantiation can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datepicker/getting-started/", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Default;
