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
exports.WorkingTimeRange = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var WorkingTimeRange = /** @class */ (function (_super) {
    __extends(WorkingTimeRange, _super);
    function WorkingTimeRange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTimeUpdated = false;
        _this.workDays = [
            { id: 'Monday', day: 'Monday' },
            { id: 'Tuesday', day: 'Tuesday' },
            { id: 'Wednesday', day: 'Wednesday' },
            { id: 'Thursday', day: 'Thursday' },
            { id: 'Friday', day: 'Friday' },
        ];
        _this.defaultValue = "Monday";
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.timelineSettings = {
            topTier: {
                unit: 'Day',
            },
            bottomTier: {
                unit: 'Hour',
            }
        };
        _this.durationUnit = 'Hour';
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.projectStartDate = new Date('04/02/2024');
        _this.projectEndDate = new Date('04/28/2024');
        _this.splitterSettings = {
            columnIndex: 1
        };
        return _this;
    }
    WorkingTimeRange.prototype.select = function (args) {
        var startTime = 8;
        var endTime = 17;
        for (var i = 0; i < this.ganttInstance.weekWorkingTime.length; i++) {
            if (this.ganttInstance.weekWorkingTime[i].dayOfWeek === args.item.innerText) {
                startTime = this.ganttInstance.weekWorkingTime[i].timeRange[0].from;
                endTime = this.ganttInstance.weekWorkingTime[i].timeRange[0].to;
                break;
            }
        }
        this.workStartTime1.value = startTime;
        this.workEndTime1.value = endTime;
    };
    ;
    WorkingTimeRange.prototype.change1 = function (args) {
        if (this.workStartTime.value >= this.workEndTime.value) {
            if (this.workStartTime.value < 24) {
                this.workEndTime.value = this.workStartTime.value + 1.00;
            }
            else {
                this.workEndTime.value = 0.00;
            }
        }
    };
    ;
    WorkingTimeRange.prototype.change2 = function (args) {
        if (this.workStartTime1.value >= this.workEndTime1.value) {
            if (this.workStartTime1.value < 24) {
                this.workEndTime1.value = this.workStartTime1.value + 1.00;
            }
            else {
                this.workEndTime1.value = 0.00;
            }
        }
    };
    ;
    WorkingTimeRange.prototype.perform = function () {
        var selectedDay = this.selectObj.value;
        var workingTime = [];
        var weekWorkingTime = this.ganttInstance.weekWorkingTime;
        var isUpdated = false;
        for (var i = 0; i < weekWorkingTime.length; i++) {
            workingTime.push({ dayOfWeek: weekWorkingTime[i].dayOfWeek, timeRange: weekWorkingTime[i].timeRange });
        }
        for (var i = 0; i < workingTime.length; i++) {
            if (workingTime[i].dayOfWeek === selectedDay) {
                workingTime[i].dayOfWeek = workingTime[i].dayOfWeek;
                workingTime[i].timeRange = [{ from: this.workStartTime1.value, to: this.workEndTime1.value }];
                isUpdated = true;
                break;
            }
        }
        if (!isUpdated) {
            workingTime.push({ dayOfWeek: selectedDay, timeRange: [{ from: this.workStartTime1.value, to: this.workEndTime1.value }] });
        }
        this.ganttInstance.weekWorkingTime = workingTime;
    };
    WorkingTimeRange.prototype.update = function () {
        var workingTime = [{ from: this.workStartTime.value, to: this.workEndTime.value }];
        this.ganttInstance.dayWorkingTime = workingTime;
    };
    WorkingTimeRange.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'WorkingTimeRange', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.workTimeRange, highlightWeekends: true, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', timelineSettings: this.timelineSettings, durationUnit: this.durationUnit, splitterSettings: this.splitterSettings, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                        React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '270' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
                React.createElement("div", { className: 'col-lg-4 property-section', style: { paddingLeft: '0px' } },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%', paddingLeft: '0px' } },
                            React.createElement("colgroup", null,
                                React.createElement("col", { style: { width: '55%' } }),
                                React.createElement("col", { style: { width: '45%' } })),
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("label", { htmlFor: 'Time range' }, "Time Range for all days"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { paddingBottom: '10px' } },
                                        React.createElement("div", null, "Work Start Time")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.workStartTime = NumericTextBox; }, id: 'workStart', value: 8, min: 0, max: 24, showSpinButton: true, change: this.change1.bind(this), width: '125px', step: 0.5 })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { paddingBottom: '10px' } },
                                        React.createElement("div", null, "Work End Time")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.workEndTime = NumericTextBox; }, id: 'workEnd', value: 8, min: 0, max: 24, showSpinButton: true, change: this.change1.bind(this), width: '125px', step: 0.5 })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.update.bind(this) }, "Update for all days"))))),
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("label", { htmlFor: 'Time Range', style: { marginTop: '20px' } }, "Time Range for each day"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { paddingBottom: '10px' } },
                                        React.createElement("div", null, "Working Days")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropselect) { return _this.selectObj = dropselect; }, id: "WorkWeek", value: this.defaultValue, dataSource: this.workDays, width: '100%', popupHeight: '350px', fields: { text: 'day', value: 'id' }, select: this.select.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { paddingBottom: '10px' } },
                                        React.createElement("div", null, "Work Start Time")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.workStartTime1 = NumericTextBox; }, id: 'workStart', value: 8, min: 0, max: 24, showSpinButton: true, change: this.change2.bind(this), width: '125px', step: 0.5 })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { paddingBottom: '10px' } },
                                        React.createElement("div", null, "Work End Time")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.workEndTime1 = NumericTextBox; }, id: 'workEnd', value: 8, min: 0, max: 24, showSpinButton: true, change: this.change2.bind(this), width: '125px', step: 0.5 })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.perform.bind(this) }, "Update for each day"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the support for changing the working hours in a day. The selected start and end hours from the property panel will be applied to each task available in the project.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a Gantt chart with the provided data source and customizable working hours in a day. You can split the working hours in a day to one or more range. So, you can also provide the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#dayworkingtime" }, "dayworkingtime"),
                    " property value as array of object collection. Gantt chart also supports different ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#durationunit" }, "durationUnit"),
                    " values as follows:",
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "day")),
                        React.createElement("li", null,
                            React.createElement("code", null, "hour")),
                        React.createElement("li", null,
                            React.createElement("code", null, "minute")))),
                React.createElement("p", null,
                    "You can also set different working time range for different working days using ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#weekworkingtime" }, "weekWorkingTime"),
                    " property. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#weekworkingtime" }, "weekWorkingTime"),
                    " property enables you to specify different working hours for each day of the week in your Gantt chart. By configuring this property, you can ensure that tasks are only scheduled during defined working periods, avoiding non-working hours."),
                React.createElement("p", null,
                    "Given duration in dataSource will be considered with this unit. In this demo, the ",
                    React.createElement("code", null, "hour"),
                    " unit is used to render taskbars in day hour timeline mode. Gantt chart supports only 24hours format as of now. The working hours will differ between organizations. This feature will be helpful to keep track of each task and resource task status based on the working time of company."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the",
                    React.createElement("code", null, "Selection"),
                    ", ",
                    React.createElement("code", null, "DayMarkers"),
                    " modules."))));
    };
    return WorkingTimeRange;
}(sample_base_1.SampleBase));
exports.WorkingTimeRange = WorkingTimeRange;
