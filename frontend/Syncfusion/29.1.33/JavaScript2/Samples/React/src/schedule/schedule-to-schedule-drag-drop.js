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
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./schedule-to-schedule-drag-drop.css");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ScheduleDragAndDrop = /** @class */ (function (_super) {
    __extends(ScheduleDragAndDrop, _super);
    function ScheduleDragAndDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSource = require('./datasource.json');
        _this.firstData = (0, ej2_base_1.extend)([], _this.dataSource.resourceData, null, true);
        _this.secondData = (0, ej2_base_1.extend)([], _this.dataSource.timelineResourceData, null, true);
        _this.eventSettings = { dataSource: _this.firstData };
        _this.secondEventSettings = { dataSource: _this.secondData };
        _this.draggedEventDurations = 0;
        _this.calculateEventDuration = function (args) {
            var startTime = new Date(args.data.StartTime);
            var endTime = new Date(args.data.EndTime);
            var durationInMilliseconds = endTime.getTime() - startTime.getTime();
            _this.draggedEventDurations = durationInMilliseconds / (1000 * 60 * 60);
        };
        _this.firstScheduleResourceData = [
            { text: 'Steven', id: 1, color: '#7fa900' }
        ];
        _this.secondScheduleResourceData = [
            { text: 'John', id: 2, color: '#ffb74d' },
        ];
        _this.handleDragStop = function (args) {
            var sourceSchedule;
            var targetSchedule;
            if (_this.firstSchedule && _this.firstSchedule.element.contains(args.event.target)) {
                sourceSchedule = _this.secondSchedule;
                targetSchedule = _this.firstSchedule;
            }
            else if (_this.secondSchedule && _this.secondSchedule.element.contains(args.event.target)) {
                sourceSchedule = _this.firstSchedule;
                targetSchedule = _this.secondSchedule;
            }
            else {
                return;
            }
            args.cancel = true;
            var cellData = targetSchedule === null || targetSchedule === void 0 ? void 0 : targetSchedule.getCellDetails(args.event.target);
            if (cellData && sourceSchedule && targetSchedule) {
                sourceSchedule.deleteEvent(args.data.Id);
                var resourceDetails = targetSchedule.getResourcesByIndex(cellData.groupIndex);
                var droppedEventStartTime = void 0;
                var droppedEventEndTime = void 0;
                var eventDuration = new Date(args.data.EndTime).getTime() - new Date(args.data.StartTime).getTime();
                if (!args.data.IsAllDay) {
                    droppedEventStartTime = new Date(cellData.startTime);
                    droppedEventStartTime.setHours(args.data.StartTime.getHours(), args.data.StartTime.getMinutes());
                    droppedEventEndTime = new Date(droppedEventStartTime.getTime() + eventDuration);
                }
                else {
                    droppedEventStartTime = cellData.startTime;
                    droppedEventEndTime = new Date(droppedEventStartTime.getTime() + eventDuration);
                }
                var eventData = {
                    Id: targetSchedule.getEventMaxID(),
                    Subject: args.data.Subject,
                    StartTime: droppedEventStartTime,
                    EndTime: droppedEventEndTime,
                    IsAllDay: args.data.IsAllDay,
                    Location: args.data.Location,
                    Description: args.data.Description,
                    StartTimezone: args.data.StartTimezone,
                    EndTimezone: args.data.EndTimezone,
                    TaskId: resourceDetails.resourceData.id
                };
                targetSchedule.addEvent(eventData);
                var classElement = sourceSchedule.element.querySelector('.e-selected-cell');
                if (classElement) {
                    classElement.classList.remove('e-selected-cell');
                }
            }
        };
        return _this;
    }
    ScheduleDragAndDrop.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { className: "content-wrapper multiple-schedulers" },
                    React.createElement("div", { className: "schedule-container" },
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "first-schedule", width: '100%', height: '500px', ref: function (schedule) { return _this.firstSchedule = schedule; }, selectedDate: new Date(2023, 0, 1), dragStop: this.handleDragStop, dragStart: this.calculateEventDuration, eventDragArea: '.content-wrapper', group: { resources: ['Employees'] }, rowAutoHeight: true, eventSettings: this.eventSettings },
                            React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Employee', name: 'Employees', dataSource: this.firstScheduleResourceData, textField: 'text', idField: 'id', colorField: 'color' })),
                            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Resize] })),
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "second-schedule", width: '100%', height: '500px', ref: function (schedule) { return _this.secondSchedule = schedule; }, selectedDate: new Date(2023, 0, 1), dragStop: this.handleDragStop, dragStart: this.calculateEventDuration, eventDragArea: '.content-wrapper', group: { resources: ['Employees'] }, eventSettings: this.secondEventSettings },
                            React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Employee', name: 'Employees', dataSource: this.secondScheduleResourceData, textField: 'text', idField: 'id', colorField: 'color' })),
                            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example illustrates how to drag and drop events among multiple Scheduler. You can drag events from one Scheduler to another.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, ",
                    React.createElement("code", null, "eventDragArea"),
                    " is used to drag a range of events from one Scheduler to another. The",
                    React.createElement("code", null, "dragStop"),
                    " event of the Scheduler is triggered when an item is dropped from one Scheduler onto another. Within the ",
                    React.createElement("code", null, "dragStop"),
                    " event, the ",
                    React.createElement("code", null, "addEvent"),
                    " method is used to add the dropped event to the target Scheduler, and the ",
                    React.createElement("code", null, "deleteEvent"),
                    " method is used to remove the dragged event from the source Scheduler."))));
    };
    return ScheduleDragAndDrop;
}(sample_base_1.SampleBase));
exports.default = ScheduleDragAndDrop;
