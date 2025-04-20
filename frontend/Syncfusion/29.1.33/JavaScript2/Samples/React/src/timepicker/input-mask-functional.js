"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./default-style.css");
function MaskSupport() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane default' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'timepicker-control-section' },
                React.createElement(ej2_react_calendars_1.TimePickerComponent, { format: 'h:mm a', enableMask: true },
                    React.createElement(ej2_react_calendars_1.Inject, { services: [ej2_react_calendars_1.MaskedDateTime] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the time masking functionality in the TimePicker. It allows you to enter a valid value for each mask pattern of the time masking.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "TimePicker has an ",
                React.createElement("code", null, "enableMask"),
                " property that allows you to enable the built-in time masking support. The mask pattern is defined based on the provided time format to the component. If the format is not specified, the mask pattern is formed based on the default format of the current culture."))));
}
exports.default = MaskSupport;
