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
    var _a = (0, react_1.useState)(null), selectedValue = _a[0], setSelectedValue = _a[1];
    var onchange = function (args) {
        /*Displays selected date in the label*/
        setSelectedValue(args.value.toLocaleDateString());
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_calendars_1.CalendarComponent, { change: onchange }),
                React.createElement("label", { id: "date_label" },
                    "Selected Value: ",
                    selectedValue,
                    " "))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The following sample demonstrates the default functionalities of the Calendar. Today's date is always ",
                React.createElement("code", null, "highlighted"),
                " in the Calendar and it get ",
                React.createElement("code", null, "focused"),
                " if there is no selected date. Click/Touch the desired date from the Calendar and the selected date will be displayed in the below label.")),
        React.createElement("div", { id: 'description' },
            "A Calendar is a graphical user interface component which provides the multi-view representation to display and select a date. Also, provide options to navigate in different levels of views like month, year, decade.",
            React.createElement("p", null,
                "More information on the calendar instantiation can be found in this ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/calendar/getting-started/' }, "documentation"),
                " section."))));
};
exports.default = Default;
