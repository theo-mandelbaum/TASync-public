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
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'datetimepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DateTimePickerComponent, null))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the default functionalities of the DateTimePicker. Enter the value in input text box or Click/Touch the date and time popup icon to select the desired value.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "DateTimePicker"),
                " is a graphical user interface component that allows the user to select, or to enter a date time value."),
            React.createElement("p", null,
                "More information on the DateTimePicker instantiation can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datetimepicker/getting-started/", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Default;
