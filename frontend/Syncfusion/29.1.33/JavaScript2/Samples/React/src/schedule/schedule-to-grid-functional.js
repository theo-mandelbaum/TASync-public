"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
require("./schedule-to-grid.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ScheduleToGrid = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleRef = (0, react_1.useRef)(null);
    var gridObj = (0, react_1.useRef)(null);
    var dataSource = require('./datasource.json');
    var firstData = (0, ej2_base_1.extend)([], dataSource.resourceData, null, true);
    var eventSettings = { dataSource: firstData };
    var resourceData = [
        { text: "Nancy", id: 1, color: "#df5286" },
        { text: "Steven", id: 2, color: "#7fa900" },
        { text: "Robert", id: 3, color: "#ea7a57" },
        { text: "Smith", id: 4, color: "#5978ee" },
        { text: "Michael", id: 5, color: "#00bdae" },
        { text: "Root", id: 6, color: "#f57b42" },
        { text: "John", id: 7, color: "#1aaa55" },
        { text: "Stellah", id: 8, color: "#ffb74d" },
        { text: "Chirish", id: 9, color: "#7460ee" },
        { text: "Megan", id: 10, color: "#c0ca33" },
    ];
    var gridData = [
        { Task: "Test report validation", Duration: "3 Hours" },
        { Task: "Timeline estimation", Duration: "4 Hours" },
        { Task: "Workflow Analysis", Duration: "2 Hours" },
        { Task: "Quality Analysis", Duration: "5 Hours" },
        { Task: "Cross-browser testing", Duration: "1 Hour" },
        { Task: "Resolution-based testing", Duration: "3 Hours" },
        { Task: "Project Preview", Duration: "6 Hours" },
        { Task: "Developers Meeting", Duration: "2 Hours" },
        { Task: "Test case correction", Duration: "7 Hours" },
        { Task: "Debugging", Duration: "4 Hours" },
        { Task: "Exception handling", Duration: "5 Hours" },
        { Task: "Bug fixing", Duration: "1 Hour" },
        { Task: "Bug Automation", Duration: "3 Hours" },
        { Task: "Bug fixing", Duration: "6 Hours" },
    ];
    var group = { enableCompactView: false, resources: ["Names"] };
    var editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: "Normal" };
    function handleDragStop(args) {
        if (scheduleRef.current && gridObj.current && gridObj.current.element.contains(args.event.target)) {
            scheduleRef.current.deleteEvent(args.data.Id);
            var startTime = new Date(args.data.StartTime);
            var endTime = new Date(args.data.EndTime);
            var formattedDuration = calculateEventDuration(startTime, endTime);
            var gridRecord = { Task: args.data.Subject, Duration: formattedDuration };
            gridData = __spreadArray(__spreadArray([], gridData, true), [gridRecord], false);
            gridObj.current.dataSource = gridData;
            gridObj.current.dataBind();
        }
    }
    function calculateEventDuration(startTime, endTime) {
        var durationInMilliseconds = endTime.getTime() - startTime.getTime();
        var durationInHours = durationInMilliseconds / (1000 * 60 * 60);
        return durationInHours + " Hours";
    }
    var rowDrag = function (args) { args.cancel = true; };
    var rowDrop = function (args) {
        args.cancel = true;
        var scheduleObj = scheduleRef.current;
        if (scheduleObj && gridObj.current && scheduleObj.element.contains(args.target)) {
            var cellData = scheduleObj.getCellDetails(args.target);
            if (typeof cellData.groupIndex === "number") {
                var resourceDetails = scheduleObj.getResourcesByIndex(cellData.groupIndex);
                var durationStr = args.data[0].Duration;
                var durationHours = parseInt(durationStr.split(" ")[0], 10);
                var startTime = new Date(cellData.startTime);
                var endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);
                var eventData = {
                    Id: scheduleObj.getEventMaxID(),
                    Subject: args.data[0].Task,
                    StartTime: startTime,
                    EndTime: endTime,
                    IsAllDay: cellData.isAllDay,
                    TaskId: resourceDetails.resourceData.id,
                };
                scheduleObj.addEvent(eventData);
                gridData = gridData.filter(function (item) { return item.Task !== args.data[0].Task; });
                gridObj.current.dataSource = gridData;
                gridObj.current.dataBind();
            }
        }
    };
    var dataBound = function () {
        if (scheduleRef.current) {
            var selectedCells = scheduleRef.current.element.querySelectorAll(".e-selected-cell");
            for (var i = 0; i < selectedCells.length; i++) {
                selectedCells[i].classList.remove("e-selected-cell");
            }
        }
    };
    var onDataBound = function () {
        var scheduleObj = scheduleRef.current;
        var resourceDataCounter = 0;
        var resourceCells = scheduleObj.element.querySelectorAll(".e-resource-cells .e-resource-text");
        var workcells = scheduleObj.element.querySelector(".e-work-cells");
        if (!workcells)
            return;
        var timestamp = Number(workcells.getAttribute("data-date"));
        var startDate = new Date(timestamp);
        var endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        var events = scheduleObj.getEvents(startDate, endDate, true);
        var eventsMap = new Map();
        for (var i = 0; i < events.length; i++) {
            var taskId = events[i].TaskId;
            if (!eventsMap.has(taskId)) {
                eventsMap.set(taskId, []);
            }
            eventsMap.get(taskId).push(events[i]);
        }
        for (var i = 0; i < resourceCells.length; i++) {
            var cell = resourceCells[i];
            if (Array.isArray(scheduleObj.resourceCollection[0].dataSource) &&
                resourceDataCounter < scheduleObj.resourceCollection[0].dataSource.length) {
                resourceDataCounter++;
            }
            var resourceEvents = eventsMap.get(resourceDataCounter) || [];
            var currentText = cell.innerText;
            var eventCount = resourceEvents.length;
            var resourceName = currentText.split('(')[0].trim();
            cell.innerText = resourceName + ' (' + eventCount + ')';
        }
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: " col-lg-12 control-section" },
            React.createElement("div", { className: "content-wrapper grid-to-schedule" },
                React.createElement("div", { className: "schedule-container" },
                    React.createElement("div", { className: "schedule-content" },
                        React.createElement("h5", { style: { textAlign: 'center', margin: '0', position: 'relative', bottom: '10px' } }, " Task Management "),
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "Schedule", rowAutoHeight: true, ref: scheduleRef, width: "100%", height: "100%", currentView: "TimelineDay", selectedDate: new Date(2023, 0, 4), group: group, eventSettings: eventSettings, eventDragArea: ".content-wrapper", cssClass: "custom-room-schedule", dragStop: handleDragStop, dataBound: onDataBound },
                            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: "TimelineDay" })),
                            React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                React.createElement(ej2_react_schedule_1.ResourceDirective, { field: "TaskId", title: "Name", name: "Names", dataSource: resourceData, textField: "text", idField: "id", colorField: "color" })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Resize] }))),
                    React.createElement("div", { className: "grid-content" },
                        React.createElement("h5", { style: { textAlign: 'center', margin: '0', position: 'relative', bottom: '10px' } }, " Unplanned Tasks "),
                        React.createElement(ej2_react_grids_1.GridComponent, { dataSource: gridData, cssClass: "drag-grid", width: "280px", height: "100%", allowRowDragAndDrop: true, rowDrop: rowDrop, rowDrag: rowDrag, editSettings: editOptions, rowDropSettings: { targetID: "Schedule" }, ref: gridObj, dataBound: dataBound },
                            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Task", headerText: "Task", width: 50 }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Duration", headerText: "Duration", width: 30 })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_grids_1.RowDD, ej2_react_grids_1.Edit] })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example illustrates how to drag and drop events between the DataGrid and the Scheduler.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the DataGrid's ",
                React.createElement("code", null, "allowRowDragAndDrop"),
                " and ",
                React.createElement("code", null, "rowDropSettings"),
                " are used to drag and drop items from the DataGrid to the Scheduler. The ",
                React.createElement("code", null, "rowDrop"),
                " event of the DataGrid is triggered when an item is dropped to the Scheduler. Within the ",
                React.createElement("code", null, "rowDrop"),
                " event, the ",
                React.createElement("code", null, "addEvent"),
                " method is used to add the dropped item to the target Scheduler, and the ",
                React.createElement("code", null, "deleteRecord"),
                " method is used to remove the dragged item from the DataGrid.",
                React.createElement("br", null),
                "For Scheduler to DataGrid, ",
                React.createElement("code", null, "eventDragArea"),
                " is used to drag a range of events. The ",
                React.createElement("code", null, "dragStop"),
                " event of the Scheduler is triggered when an item is dropped from the Scheduler to the DataGrid. Within the ",
                React.createElement("code", null, "dragStop"),
                " event, the DataGrid's ",
                React.createElement("code", null, "addRecord"),
                " method is used to add the dropped event to the target DataGrid, and the ",
                React.createElement("code", null, "deleteEvent"),
                " method is used to remove the dragged event from the Scheduler."))));
};
exports.default = ScheduleToGrid;
