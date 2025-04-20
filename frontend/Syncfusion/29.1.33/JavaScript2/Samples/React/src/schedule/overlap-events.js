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
exports.OverlapEvents = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule OverlapEvents sample
 */
var OverlapEvents = /** @class */ (function (_super) {
    __extends(OverlapEvents, _super);
    function OverlapEvents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.scheduleOverlapData, null, true);
        return _this;
    }
    OverlapEvents.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'content-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '550px', selectedDate: new Date(2025, 1, 12), eventSettings: { dataSource: this.data }, allowOverlap: false },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo explains how to restrict overlapping appointments within the same time range in the React Scheduler component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " This example uses the Scheduler's ",
                    React.createElement("code", null, "allowOverlap"),
                    " API to prevent overlapping events. By default, it's ",
                    React.createElement("code", null, "true"),
                    ", allowing overlaps. When set to ",
                    React.createElement("code", null, "false"),
                    ", events cannot be added, edited, dragged, or resized to overlap with others."))));
    };
    return OverlapEvents;
}(sample_base_1.SampleBase));
exports.OverlapEvents = OverlapEvents;
