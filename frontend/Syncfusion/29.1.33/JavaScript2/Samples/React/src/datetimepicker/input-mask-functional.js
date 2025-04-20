"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./default-style.css");
var MaskSupport = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'datetimepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { format: 'M/d/yyyy hh:mm a', enableMask: true },
                    React.createElement(ej2_react_calendars_1.Inject, { services: [ej2_react_calendars_1.MaskedDateTime] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the date time masking functionality in the DateTimePicker. It allows you to enter a valid value for each mask pattern of the date time masking.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "DateTimePicker has an ",
                React.createElement("code", null, "enableMask"),
                " property that allows you to enable the built-in date time masking support. The mask pattern is defined based on the provided date time format to the component. If the format is not specified, the mask pattern is formed based on the default format of the current culture."))));
};
exports.default = MaskSupport;
