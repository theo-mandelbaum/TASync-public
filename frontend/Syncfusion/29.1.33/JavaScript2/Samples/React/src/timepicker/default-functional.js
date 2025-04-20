"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./default-style.css");
function Default() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane default' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'timepicker-control-section' },
                React.createElement(ej2_react_calendars_1.TimePickerComponent, null))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the default functionalities of the TimePicker. Click/Touch the TimePicker popup icon to select a desired time and the selected time value will be displayed in the TimePicker element.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "A ",
                React.createElement("code", null, "TimePicker"),
                " is an interactive component that provides an option to select a value from popup list or set a desired time value."),
            React.createElement("p", null,
                "More information about TimePicker and it's configuration can be found in the  ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/timepicker/getting-started/#adding-timepicker-component-to-the-application' }, "documentation"),
                "  section."))));
}
exports.default = Default;
