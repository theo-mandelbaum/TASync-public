"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var WorkingTimeRange = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var workStartTime = (0, react_1.useRef)(null);
    var workStartTime1 = (0, react_1.useRef)(null);
    var workEndTime1 = (0, react_1.useRef)(null);
    var dropselectObj = (0, react_1.useRef)(null);
    var workEndTime = (0, react_1.useRef)(null);
    var isTimeUpdated = false;
    var workDays = [
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
    ];
    var defaultValue = "Monday";
    var select = function (args) {
        var startTime = 8;
        var endTime = 17;
        for (var i = 0; i < ganttInstance.current.weekWorkingTime.length; i++) {
            if (ganttInstance.current.weekWorkingTime[i].dayOfWeek === args.item.innerText) {
                startTime = ganttInstance.current.weekWorkingTime[i].timeRange[0].from;
                endTime = ganttInstance.current.weekWorkingTime[i].timeRange[0].to;
                break;
            }
        }
        workStartTime1.current.value = startTime;
        workEndTime1.current.value = endTime;
    };
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var timelineSettings = {
        topTier: {
            unit: 'Day',
        },
        bottomTier: {
            unit: 'Hour',
        }
    };
    var durationUnit = 'Hour';
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var projectStartDate = new Date('04/02/2024');
    var projectEndDate = new Date('04/28/2024');
    var perform = function () {
        var selectedDay = dropselectObj.current.value;
        var workingTime = [];
        var weekWorkingTime = ganttInstance.current.weekWorkingTime;
        var isUpdated = false;
        for (var i = 0; i < weekWorkingTime.length; i++) {
            workingTime.push({ dayOfWeek: weekWorkingTime[i].dayOfWeek, timeRange: weekWorkingTime[i].timeRange });
        }
        for (var i = 0; i < workingTime.length; i++) {
            if (workingTime[i].dayOfWeek === selectedDay) {
                workingTime[i].dayOfWeek = workingTime[i].dayOfWeek;
                workingTime[i].timeRange = [{ from: workStartTime1.current.value, to: workEndTime1.current.value }];
                isUpdated = true;
                break;
            }
        }
        if (!isUpdated) {
            workingTime.push({ dayOfWeek: selectedDay, timeRange: [{ from: workStartTime1.current.value, to: workEndTime1.current.value }] });
        }
        ganttInstance.current.weekWorkingTime = workingTime;
    };
    var update = function () {
        var workingTime = [{ from: workStartTime.current.value, to: workEndTime.current.value }];
        ganttInstance.current.dayWorkingTime = workingTime;
    };
    var splitterSettings = {
        columnIndex: 1
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'WorkingTimeRange', ref: ganttInstance, dataSource: data_1.workTimeRange, highlightWeekends: true, taskFields: taskFields, labelSettings: labelSettings, height: '410px', timelineSettings: timelineSettings, durationUnit: durationUnit, splitterSettings: splitterSettings, projectStartDate: projectStartDate, projectEndDate: projectEndDate },
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
                                    React.createElement("div", { id: 'workStartTime', style: { marginLeft: '10px', marginTop: "10px" } }, "Work Start Time")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: workStartTime, id: 'workStart', value: 8, min: 0, max: 24, showSpinButton: true, width: '125px', step: 0.5 })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { paddingBottom: '10px' } },
                                    React.createElement("div", { id: 'workEndTime', style: { marginLeft: '10px', marginTop: "10px" } }, "Work End Time")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: workEndTime, id: 'workEnd', value: 17, min: 0, max: 24, showSpinButton: true, width: '125px', step: 0.5 })))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: update.bind(_this) }, " Update for all days")))),
                            React.createElement("tr", { style: { height: '30px' } },
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("label", { htmlFor: 'Time range' }, "Time Range for each day"))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { paddingBottom: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement("div", { id: "WorkWeek" }, "Working Days"))),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: '0px', paddingLeft: '0px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: dropselectObj, id: "WorkWeek", style: { padding: '2px' }, value: defaultValue, dataSource: workDays, width: '100%', popupHeight: '350px', fields: { text: 'day', value: 'id' }, select: select.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { paddingBottom: '10px' } },
                                    React.createElement("div", { id: 'workStart', style: { marginLeft: '10px', marginTop: "10px" } }, "Work Start Time")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: workStartTime1, id: 'workStart', value: 8, min: 0, max: 24, showSpinButton: true, width: '125px', step: 0.5 })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { paddingBottom: '10px' } },
                                    React.createElement("div", { id: 'workEnd', style: { marginLeft: '10px', marginTop: "10px" } }, "Work End Time")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: workEndTime1, id: 'workEnd', value: 17, min: 0, max: 24, showSpinButton: true, width: '125px', step: 0.5 })))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: perform.bind(_this) }, " Update for each day"))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the support for changing the working hours in a day. The selected start and end hours from the property panel will be applied to each task available in the project.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render a Gantt chart with the provided data source and customizable working hours in a day. You can split the working hours in a day to one or more range. So, you can also provide the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#dayworkingtime" }, "dayworkingtime"),
                " property value as array of object collection. Gantt chart also supports different ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#durationunit" }, "durationUnit"),
                " values as follows:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "day")),
                React.createElement("li", null,
                    React.createElement("code", null, "hour")),
                React.createElement("li", null,
                    React.createElement("code", null, "minute"))),
            React.createElement("p", null,
                "You can also set different working time range for different working days using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#weekworkingtime" }, "weekWorkingTime"),
                " property. The weekWorkingTime property enables you to specify different working hours for each day of the week in your Gantt chart. By configuring this property, you can ensure that tasks are only scheduled during defined working periods, avoiding non-working hours."),
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
exports.default = WorkingTimeRange;
