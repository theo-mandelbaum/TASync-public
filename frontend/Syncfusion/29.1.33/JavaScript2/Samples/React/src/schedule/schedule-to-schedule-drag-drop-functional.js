"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var sample_base_1 = require("../common/sample-base");
require("./schedule-to-schedule-drag-drop.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ScheduleDragAndDrop = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataSource = require('./datasource.json');
    var draggedEventDurations;
    var firstSchedule = (0, react_1.useRef)(null);
    var secondSchedule = (0, react_1.useRef)(null);
    var firstData = (0, ej2_base_1.extend)([], dataSource.resourceData, null, true);
    var eventSettings = { dataSource: firstData };
    var secondData = (0, ej2_base_1.extend)([], dataSource.timelineResourceData, null, true);
    var secondEventSettings = { dataSource: secondData };
    var calculateEventDuration = function (args) {
        var startTime = new Date(args.data.StartTime);
        var endTime = new Date(args.data.EndTime);
        var durationInMilliseconds = endTime.getTime() - startTime.getTime();
        draggedEventDurations = durationInMilliseconds / (1000 * 60 * 60);
    };
    var firstScheduleResourceData = [
        { text: 'Steven', id: 1, color: '#7fa900' }
    ];
    var secondScheduleResourceData = [
        { text: 'John', id: 2, color: '#ffb74d' },
    ];
    var handleDragStop = function (args) {
        var sourceSchedule;
        var targetSchedule;
        if (firstSchedule.current && firstSchedule.current.element.contains(args.event.target)) {
            sourceSchedule = secondSchedule.current;
            targetSchedule = firstSchedule.current;
        }
        else if (secondSchedule.current && secondSchedule.current.element.contains(args.event.target)) {
            sourceSchedule = firstSchedule.current;
            targetSchedule = secondSchedule.current;
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
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "content-wrapper multiple-schedulers" },
                React.createElement("div", { className: "schedule-container" },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "first-schedule", ref: firstSchedule, width: '100%', height: '550px', currentView: 'Month', selectedDate: new Date(2023, 0, 1), eventDragArea: '.content-wrapper', group: { resources: ['Employees'] }, dragStart: calculateEventDuration, dragStop: handleDragStop, eventSettings: eventSettings },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Employee', name: 'Employees', dataSource: firstScheduleResourceData, textField: 'text', idField: 'id', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.DragAndDrop] })),
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "second-schedule", ref: secondSchedule, group: { resources: ['Employees'] }, width: '100%', height: '550px', currentView: 'Month', selectedDate: new Date(2023, 0, 1), eventDragArea: '.content-wrapper', dragStop: handleDragStop, eventSettings: secondEventSettings },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Employee', name: 'Employees', dataSource: secondScheduleResourceData, textField: 'text', idField: 'id', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.DragAndDrop] }))))),
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
exports.default = ScheduleDragAndDrop;
