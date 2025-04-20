"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Baseline = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskFields = {
        id: 'TaskId',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        baselineStartDate: 'BaselineStartDate',
        baselineEndDate: 'BaselineEndDate'
    };
    var ganttInstance;
    var projectStartDate = new Date('03/05/2024 09:30:00 AM');
    var projectEndDate = new Date('03/05/2024 07:00:00 PM');
    var timelineSettings = {
        timelineUnitSize: 65,
        topTier: {
            unit: 'None',
        },
        bottomTier: {
            unit: 'Minutes',
            count: 15,
            format: 'hh:mm a'
        }
    };
    var dayWorkingTime = [{ from: 0, to: 24 }];
    var tooltipTemplate = function (props) {
        return (React.createElement("table", null,
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: 3 }, props.TaskName)),
                React.createElement("tr", null,
                    React.createElement("td", null, " Start Time "),
                    " ",
                    React.createElement("td", null, ":"),
                    React.createElement("td", null, ganttInstance.getFormatedDate(props.StartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, " End Time"),
                    " ",
                    React.createElement("td", null, ":"),
                    React.createElement("td", null, ganttInstance.getFormatedDate(props.EndDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, " Planned start time"),
                    " ",
                    React.createElement("td", null, ":"),
                    React.createElement("td", null, ganttInstance.getFormatedDate(props.BaselineStartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, " Planned end time"),
                    " ",
                    React.createElement("td", null, ":"),
                    React.createElement("td", null, ganttInstance.getFormatedDate(props.BaselineEndDate))))));
    };
    var template = tooltipTemplate;
    var tooltipSettings = {
        taskbar: template.bind(_this),
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Baseline', ref: function (gantt) { return ganttInstance = gantt; }, dataSource: data_1.baselineData, renderBaseline: true, dateFormat: 'hh:mm a', treeColumnIndex: 1, allowSelection: true, projectStartDate: projectStartDate, projectEndDate: projectEndDate, taskFields: taskFields, timelineSettings: timelineSettings, includeWeekend: true, height: '410px', tooltipSettings: tooltipSettings, durationUnit: 'Minute', dayWorkingTime: dayWorkingTime },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Service Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'BaselineStartDate', headerText: 'Planned start time' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'BaselineEndDate', headerText: 'Planned end time' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start time' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End time' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] })),
            React.createElement("div", { style: { float: 'right', margin: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/Service_(motor_vehicle)", target: '_blank' }, "https://en.wikipedia.org/"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the complete service schedule for a car. Baselines are enabled in this sample to view the deviation between the planned dates and actual dates.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The baseline feature enables the user to view the deviation between the planned dates and the actual dates of the tasks in a project. Baselines can be enabled in Gantt chart by enabling the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#renderbaseline" }, "renderBaseline"),
                "property along with mapping the data source values for ",
                React.createElement("code", null, "baselineStartDate"),
                " and ",
                React.createElement("code", null, "baselineEndDate"),
                "properties. The baseline will appear for all type of tasks in the project such as child tasks, parent tasks and also for milestones. You can change the color for the baselines using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#baselinecolor" }, "baselineColor"),
                " property."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection support, inject the",
                React.createElement("code", null, "Selection"),
                " module."))));
};
exports.default = Baseline;
