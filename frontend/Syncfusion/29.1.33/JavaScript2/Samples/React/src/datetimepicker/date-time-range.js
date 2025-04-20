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
exports.Range = void 0;
var React = require("react");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var sample_base_1 = require("../common/sample-base");
require("./range-style.css");
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7, 10);
        _this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27, 22, 30);
        _this.minTime = new Date(new Date().getFullYear(), new Date().getMonth(), 7, 10);
        _this.maxTime = new Date(new Date().getFullYear(), new Date().getMonth(), 27, 20, 30);
        _this.dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10, 30);
        return _this;
    }
    Range.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { className: 'datetimepicker-control-section', id: "datetime-restriction" },
                        React.createElement("h4", null, "DateTime Restriction"),
                        React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "calendar1", min: this.minDate, max: this.maxDate, value: this.dateValue }))),
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { className: 'datetimepicker-control-section', id: "time-restriction" },
                        React.createElement("h4", null, "Time Restriction"),
                        React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "calendar2", minTime: this.minTime, maxTime: this.maxTime, value: this.dateValue })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This example demonstrates date and time selection within specific ranges defined by the ",
                    React.createElement("code", null, "Min"),
                    ", ",
                    React.createElement("code", null, "Max"),
                    ", ",
                    React.createElement("code", null, "MinTime"),
                    ", and ",
                    React.createElement("code", null, "MaxTime"),
                    " properties. Dates and times outside these ranges are ",
                    React.createElement("code", null, "restricted"),
                    " and cannot be set or selected.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Date Range example explains the date and time selection within the specific range in a calendar and time popup list by using ",
                    React.createElement("code", null, "Min"),
                    ", ",
                    React.createElement("code", null, "Max"),
                    ", ",
                    React.createElement("code", null, "MinTime"),
                    " and ",
                    React.createElement("code", null, "MaxTime"),
                    " properties. Here, the 1st datetimepicker date selection range was restricted within a range from 7th 10:00 AM to 27th 10:30 PM days in a month."),
                React.createElement("p", null, "The 2nd datetimepicker time selection range is restricted from 10:00 AM to 8:30 PM of each day."),
                React.createElement("p", null,
                    "More information on the date range configuration can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datetimepicker/date-time-range/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Range;
}(sample_base_1.SampleBase));
exports.Range = Range;
