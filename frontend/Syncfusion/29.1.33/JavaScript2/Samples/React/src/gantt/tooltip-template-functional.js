"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TooltipTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        resourceInfo: 'resources',
        baselineStartDate: 'BaselineStartDate',
        baselineEndDate: 'BaselineEndDate',
        child: 'subtasks'
    };
    var resourceFields = {
        id: 'resourceId',
        name: 'resourceName'
    };
    var taskbarTooltip = function (props) {
        var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
        return (React.createElement("table", null,
            props.ganttProperties.resourceNames &&
                React.createElement("tr", null,
                    React.createElement("td", { rowSpan: 3, style: { padding: '3px' } },
                        React.createElement("img", { src: src, height: '40px' })),
                    React.createElement("td", { style: { padding: '3px' } }, "Task done By:"),
                    React.createElement("td", { style: { padding: '3px' } }, props.ganttProperties.resourceNames)),
            React.createElement("tr", null,
                React.createElement("td", { style: { padding: '3px' } }, "Starts On:"),
                React.createElement("td", { style: { padding: '3px' } }, ganttInstance.current.getFormatedDate(props.StartDate))),
            React.createElement("tr", null,
                React.createElement("td", { style: { padding: '3px' } }, "Ends On:"),
                React.createElement("td", { style: { padding: '3px' } }, ganttInstance.current.getFormatedDate(props.EndDate)))));
    };
    var templateTaskbar = taskbarTooltip;
    var baselineTooltip = function (props) {
        return (React.createElement("table", null,
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "Planned Start Date: "),
                    React.createElement("td", null, ganttInstance.current.getFormatedDate(props.BaselineStartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Planned End Date: "),
                    React.createElement("td", null, ganttInstance.current.getFormatedDate(props.BaselineEndDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Current Start Date: "),
                    React.createElement("td", null, ganttInstance.current.getFormatedDate(props.StartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Current End Date: "),
                    React.createElement("td", null, ganttInstance.current.getFormatedDate(props.EndDate))))));
    };
    var templateBaseline = baselineTooltip;
    var timelineTooltip = function (props) {
        var tier = props.tier;
        var date = props.date;
        var endDate = new Date(date);
        if (tier === 'topTier' && ganttInstance.current.timelineSettings.topTier.unit) {
            endDate.setDate(endDate.getDate() + 6);
        }
        var data = getTooltipData(new Date(date), endDate, tier);
        var themeIsDark = document.body.classList.contains('tailwind3-dark') ||
            document.body.classList.contains('fluent2-dark') ||
            document.body.classList.contains('material3-dark') ||
            document.body.classList.contains('bootstrap5.3-dark') ||
            document.body.classList.contains('fluent2-highcontrast') ||
            document.body.classList.contains('highcontrast') ||
            document.body.classList.contains('fluent2-dark');
        var borderColor = themeIsDark ? 'black' : 'white';
        return (React.createElement("div", { style: { padding: '5px' } },
            React.createElement("div", { style: { paddingBottom: '9px', textAlign: 'center', borderBottom: "2px solid ".concat(borderColor) } },
                React.createElement("span", { style: { fontWeight: 'bold', fontSize: '14px' } }, tier === 'topTier' ? props.value : date)),
            React.createElement("div", { style: { display: 'flex', paddingBottom: '5px', paddingTop: '9px' } },
                React.createElement("span", { style: { fontWeight: 'bold' } }, "Active Tasks:"),
                React.createElement("span", { style: { paddingLeft: '2px' } }, data.activeTasks)),
            React.createElement("div", { style: { display: 'flex', paddingBottom: '5px' } },
                React.createElement("span", { style: { fontWeight: 'bold' } }, "Milestones:"),
                React.createElement("span", { style: { paddingLeft: '2px' } }, data.milestones)),
            React.createElement("div", { style: { display: 'flex', paddingBottom: '5px' } },
                React.createElement("span", { style: { fontWeight: 'bold' } }, "Overall Progress:"),
                React.createElement("span", { style: { paddingLeft: '2px' } }, data.overallProgress))));
    };
    var templateTimeline = timelineTooltip;
    var getTooltipData = function (startDate, endDate, tier) {
        var gantt = ganttInstance.current;
        var activeTasks = [];
        if (tier === 'topTier') {
            activeTasks = gantt.currentViewData.filter(function (task) {
                var taskStart = new Date(task['StartDate']);
                var taskEnd = new Date(task['EndDate']);
                taskStart.setHours(0, 0, 0, 0);
                taskEnd.setHours(0, 0, 0, 0);
                return (taskStart >= startDate && taskEnd <= endDate);
            });
        }
        else {
            activeTasks = gantt.currentViewData.filter(function (task) {
                var taskStart = new Date(task['StartDate']);
                var taskEnd = new Date(task['EndDate']);
                taskStart.setHours(0, 0, 0, 0);
                taskEnd.setHours(0, 0, 0, 0);
                return (taskStart.getTime() === startDate.getTime() && taskEnd.getTime() === endDate.getTime());
            });
        }
        var milestones = activeTasks.filter(function (task) { return task.Duration === 0; });
        var totalProgress = activeTasks.reduce(function (acc, task) { return acc + (task.Progress || 0); }, 0);
        var overallProgress = (activeTasks.length > 0) ? (totalProgress / activeTasks.length).toFixed(2) : '0';
        return {
            activeTasks: activeTasks.length,
            milestones: milestones.length,
            overallProgress: overallProgress
        };
    };
    var tooltipSettings = {
        showTooltip: true,
        taskbar: templateTaskbar.bind(_this),
        baseline: templateBaseline.bind(_this),
        timeline: templateTimeline.bind(_this),
    };
    var labelSettings = {
        leftLabel: 'TaskName',
        rightLabel: 'resources'
    };
    var splitterSettings = {
        columnIndex: 2
    };
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('05/04/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TooltipTemplate', ref: ganttInstance, dataSource: data_1.tooltipData, highlightWeekends: true, renderBaseline: true, treeColumnIndex: 1, tooltipSettings: tooltipSettings, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate, resourceFields: resourceFields, resources: data_1.editingResources },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'BaselineStartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'BaselineEndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample explains the way of rendering tooltip template for taskbar and baseline by mapping template elements to the property of taskbar and baseline in ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/" }, "tooltipSettings"),
                ".")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tooltip can be enabled or disabled using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#showtooltip" }, "tooltipSettings.showTooltip"),
                " property.In this demo, the tooltip template is rendered for ",
                React.createElement("code", null, "taskbar"),
                ", ",
                React.createElement("code", null, "timeline"),
                " and ",
                React.createElement("code", null, "baseline"),
                " using the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#taskbar" }, "tooltipSettings.taskbar"),
                ",  ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#timeline" }, "tooltipSettings.timeline"),
                "and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#baseline" }, "tooltipSettings.baseline"),
                " properties."),
            React.createElement("p", null,
                "The baseline feature enables the user to view the deviation between the planned dates and the actual dates of the tasks in a project. Baselines can be enabled in Gantt chart by enabling the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#renderbaseline" }, "renderBaseline"),
                " property along with mapping the data source values for ",
                React.createElement("code", null, "baselineStartDate"),
                " and ",
                React.createElement("code", null, "baselineEndDate"),
                " properties."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Selection)"),
                " method.To use markers, inject the",
                React.createElement("code", null, "DayMarkers"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                " method."))));
};
exports.default = TooltipTemplate;
