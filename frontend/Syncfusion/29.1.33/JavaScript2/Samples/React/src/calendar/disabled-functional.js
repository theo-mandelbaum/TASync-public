"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./disabled-style.css");
var Disabled = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(null), selectedValue = _a[0], setSelectedValue = _a[1];
    var disabledDate = function (args) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            /*set 'true' to disable the weekends*/
            args.isDisabled = true;
        }
    };
    var onchange = function (args) {
        /*Displays selected date in the label*/
        setSelectedValue(args.value.toLocaleDateString());
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_calendars_1.CalendarComponent, { renderDayCell: disabledDate, change: onchange }),
                React.createElement("label", { id: "date_label" },
                    "Selected Value: ",
                    selectedValue))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In the following sample, all the weekends (Saturday and Sunday) of a month are ",
                React.createElement("code", null, "disabled"),
                ", and these dates are ",
                React.createElement("code", null, "restricted"),
                " to set or select in the Calendar.")),
        React.createElement("div", { id: 'description' },
            "Disabled Dates sample demonstrates, how to disable a specific dates in a calendar by using renderDayCell event. This event gets triggered on each day cell element creation, that allows you to customize or disable the specific dates in calendar. Here the weekend date's are disabled by using renderDayCell event.",
            React.createElement("p", null,
                "More information on the disabled dates can be found in this ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/calendar/customization/' }, "documentation"),
                " section."))));
};
exports.default = Disabled;
