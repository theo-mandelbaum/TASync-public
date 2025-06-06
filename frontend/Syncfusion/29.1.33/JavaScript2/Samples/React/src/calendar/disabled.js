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
exports.Disabled = void 0;
var React = require("react");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var sample_base_1 = require("../common/sample-base");
require("./disabled-style.css");
var Disabled = /** @class */ (function (_super) {
    __extends(Disabled, _super);
    function Disabled() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Disabled.prototype.disabledDate = function (args) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            /*set 'true' to disable the weekends*/
            args.isDisabled = true;
        }
    };
    Disabled.prototype.onchange = function (args) {
        /*Displays selected date in the label*/
        document.getElementById('date_label').textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    };
    Disabled.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                    React.createElement(ej2_react_calendars_1.CalendarComponent, { renderDayCell: this.disabledDate, change: this.onchange }),
                    React.createElement("label", { id: 'date_label' }, "Selected Value:"))),
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
    return Disabled;
}(sample_base_1.SampleBase));
exports.Disabled = Disabled;
