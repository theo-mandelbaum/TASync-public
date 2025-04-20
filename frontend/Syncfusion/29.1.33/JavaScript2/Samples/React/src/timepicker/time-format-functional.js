"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./format-style.css");
function Format() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var value = new Date();
    var interval = 60;
    var customFormat = 'HH:mm';
    return (React.createElement("div", { className: 'control-pane format' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'timepicker-control-section' },
                React.createElement(ej2_react_calendars_1.TimePickerComponent, { value: value, step: interval, format: customFormat }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The TimePicker has been customized with 24-hour format with 60 minutes ",
                React.createElement("code", null, "interval"),
                ". Click/Touch the TimePicker popup icon to a select a time from 00:00 to 23:00 from the TimePicker popup.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "TimePicker provides an option to customize the display format of the time value using the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/timepicker/getting-started/#setting-the-time-format", target: "_blank" }, "format"),
                "property. It accepts ",
                React.createElement("a", { href: "https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings", target: "_blank" }, " standard "),
                React.createElement("a", { href: "https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings", target: "_blank" }, " custom date and time format strings"),
                "as specified in MSDN."),
            React.createElement("p", null,
                " Here, the time value displayed in 24-hour format with ",
                React.createElement("code", null, " 60 "),
                " minute step interval. To know more about custom time formatting, refer the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/base/internationalization/#custom-formats", target: "_blank" }, " Parsing and formatting"),
                " section. By default, TimePicker component is formatted with `en` (English) culture."),
            React.createElement("p", null,
                "More information about TimePicker and it's configuration can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/timepicker/getting-started/#create-a-simple-timepicker", target: "_blank" }, " documentation section"),
                "."))));
}
exports.default = Format;
