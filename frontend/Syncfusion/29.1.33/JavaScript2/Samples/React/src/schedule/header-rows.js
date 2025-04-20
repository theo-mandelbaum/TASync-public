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
exports.HeaderRows = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./resources.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var helper_1 = require("./helper");
var dataSource = require("./datasource.json");
/**
 * schedule header rows sample
 */
var HeaderRows = /** @class */ (function (_super) {
    __extends(HeaderRows, _super);
    function HeaderRows() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.headerRowData, null, true);
        _this.instance = new ej2_base_1.Internationalization();
        return _this;
    }
    HeaderRows.prototype.getMonthDetails = function (value) {
        return this.instance.formatDate(value.date, { skeleton: 'yMMMM' });
    };
    HeaderRows.prototype.getWeekDetails = function (value) {
        return 'Week ' + (0, ej2_react_schedule_1.getWeekNumber)((0, ej2_react_schedule_1.getWeekLastDate)(value.date, 0));
    };
    HeaderRows.prototype.monthTemplate = function (props) {
        return (React.createElement("span", { className: "month" }, this.getMonthDetails(props)));
    };
    HeaderRows.prototype.weekTemplate = function (props) {
        return (React.createElement("span", { className: "week" }, this.getWeekDetails(props)));
    };
    HeaderRows.prototype.onEventRendered = function (args) {
        (0, helper_1.applyCategoryColor)(args, this.scheduleObj.currentView);
    };
    HeaderRows.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: function (schedule) { return _this.scheduleObj = schedule; }, width: '100%', height: '650px', selectedDate: new Date(2021, 0, 1), eventSettings: { dataSource: this.data }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.HeaderRowsDirective, null,
                            React.createElement(ej2_react_schedule_1.HeaderRowDirective, { option: 'Month', template: this.monthTemplate.bind(this) }),
                            React.createElement(ej2_react_schedule_1.HeaderRowDirective, { option: 'Week', template: this.weekTemplate.bind(this) }),
                            React.createElement(ej2_react_schedule_1.HeaderRowDirective, { option: 'Date' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth', interval: 12 })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This demo showcases how to display the additional header rows on timeline view. In this demo, an additional row for displaying",
                    React.createElement("b", null, "month"),
                    " and ",
                    React.createElement("b", null, "week number"),
                    " has been added.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Unlike the usual date and time rows, timeline view can be displayed with additional header rows to display the years, months and week numbers. To do so, define the ",
                    React.createElement("code", null, "headerRows"),
                    " property which accepts an array of object and each object includes the",
                    React.createElement("code", null, "option"),
                    " API to define the specific header row type such as ",
                    React.createElement("code", null, "Year"),
                    ", ",
                    React.createElement("code", null, "Month"),
                    ", ",
                    React.createElement("code", null, "Week"),
                    " and",
                    React.createElement("code", null, "Date"),
                    ". The object also includes the ",
                    React.createElement("code", null, "template"),
                    " option to provide label customization on these rows. This",
                    React.createElement("code", null, "headerRows"),
                    " property is application only on timeline views."))));
    };
    return HeaderRows;
}(sample_base_1.SampleBase));
exports.HeaderRows = HeaderRows;
