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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
require("./schedule-to-grid.css");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ScheduleToGrid = /** @class */ (function (_super) {
    __extends(ScheduleToGrid, _super);
    function ScheduleToGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSource = require('./datasource.json');
        _this.firstData = (0, ej2_base_1.extend)([], _this.dataSource.resourceData, null, true);
        _this.eventSettings = { dataSource: _this.firstData };
        _this.resourceData = [
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
        _this.gridData = [
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
        _this.group = { enableCompactView: false, resources: ["Names"] };
        _this.editOptions = {
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
        };
        _this.handleDragStop = function (args) {
            if (_this.scheduleRef && _this.gridObj && _this.gridObj.element.contains(args.event.target)) {
                _this.scheduleRef.deleteEvent(args.data.Id);
                var startTime = new Date(args.data.StartTime);
                var endTime = new Date(args.data.EndTime);
                var formattedDuration = _this.calculateEventDuration(startTime, endTime);
                var gridRecord = { Task: args.data.Subject, Duration: formattedDuration };
                _this.gridObj.addRecord(gridRecord);
            }
        };
        _this.calculateEventDuration = function (startTime, endTime) {
            var durationInMilliseconds = endTime.getTime() - startTime.getTime();
            var durationInHours = durationInMilliseconds / (1000 * 60 * 60);
            return durationInHours + " Hours";
        };
        _this.rowDrag = function (args) {
            args.cancel = true;
        };
        _this.rowDrop = function (args) {
            args.cancel = true;
            var scheduleObj = _this.scheduleRef;
            if (scheduleObj && _this.gridObj && scheduleObj.element.contains(args.target)) {
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
                    _this.gridData = _this.gridData.filter(function (item) { return item.Task !== args.data[0].Task; });
                    _this.gridObj.dataSource = _this.gridData;
                    _this.gridObj.dataBind();
                }
            }
        };
        _this.dataBound = function () {
            if (_this.scheduleRef) {
                var selectedCells = _this.scheduleRef.element.querySelectorAll(".e-selected-cell");
                for (var i = 0; i < selectedCells.length; i++) {
                    selectedCells[i].classList.remove("e-selected-cell");
                }
            }
        };
        _this.onDataBound = function () {
            var scheduleObj = _this.scheduleRef;
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
            for (var i_1 = 0; i_1 < resourceCells.length; i_1++) {
                var cell = resourceCells[i_1];
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
        return _this;
    }
    ScheduleToGrid.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { className: "content-wrapper grid-to-schedule" },
                    React.createElement("div", { className: "schedule-container" },
                        React.createElement("div", { className: "schedule-content" },
                            React.createElement("h5", { style: { textAlign: 'center', margin: '0', position: 'relative', bottom: '10px' } }, " Task Management "),
                            React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "Schedule", ref: function (schedule) { return (_this.scheduleRef = schedule); }, width: "100%", height: "100%", currentView: "TimelineDay", selectedDate: new Date(2023, 0, 4), group: this.group, rowAutoHeight: true, eventDragArea: ".content-wrapper", eventSettings: this.eventSettings, cssClass: "grid-schedule", dragStop: this.handleDragStop, dataBound: this.onDataBound },
                                React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                    React.createElement(ej2_react_schedule_1.ViewDirective, { option: "TimelineDay" })),
                                React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                                    React.createElement(ej2_react_schedule_1.ResourceDirective, { field: "TaskId", title: "Name", name: "Names", allowMultiple: true, dataSource: this.resourceData, textField: "text", idField: "id", colorField: "color" })),
                                React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Resize] }))),
                        React.createElement("div", { className: "grid-content" },
                            React.createElement("h5", { style: { textAlign: 'center', margin: '0', position: 'relative', bottom: '10px' } }, " Unplanned Tasks "),
                            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: this.gridData, cssClass: "drag-grid", width: "280px", height: "100%", allowRowDragAndDrop: true, rowDrop: this.rowDrop, rowDrag: this.rowDrag, editSettings: this.editOptions, rowDropSettings: { targetID: "Schedule" }, ref: function (grid) { return (_this.gridObj = grid); } },
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
    return ScheduleToGrid;
}(sample_base_1.SampleBase));
exports.default = ScheduleToGrid;
