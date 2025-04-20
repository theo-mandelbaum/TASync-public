"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskSupport = void 0;
var React = require("react");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var sample_base_1 = require("../common/sample-base");
require("./default-style.css");
var MaskSupport = /** @class */ (function (_super) {
    __extends(MaskSupport, _super);
    function MaskSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaskSupport.prototype.render = function () {
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
    };
    return MaskSupport;
}(sample_base_1.SampleBase));
exports.MaskSupport = MaskSupport;
