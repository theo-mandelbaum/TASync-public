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
exports.TooltipTemplate = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TooltipTemplate = /** @class */ (function (_super) {
    __extends(TooltipTemplate, _super);
    function TooltipTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
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
        _this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        _this.templateTaskbar = _this.taskbarTooltip;
        _this.templateBaseline = _this.baselineTooltip;
        _this.templateTimeline = _this.timelineTooltip;
        _this.tooltipSettings = {
            showTooltip: true,
            taskbar: _this.templateTaskbar.bind(_this),
            baseline: _this.templateBaseline.bind(_this),
            timeline: _this.templateTimeline.bind(_this)
        };
        _this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.projectStartDate = new Date('03/24/2024');
        _this.projectEndDate = new Date('05/04/2024');
        return _this;
    }
    TooltipTemplate.prototype.taskbarTooltip = function (props) {
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
                React.createElement("td", { style: { padding: '3px' } }, this.ganttInstance.getFormatedDate(props.StartDate))),
            React.createElement("tr", null,
                React.createElement("td", { style: { padding: '3px' } }, "Ends On:"),
                React.createElement("td", { style: { padding: '3px' } }, this.ganttInstance.getFormatedDate(props.EndDate)))));
    };
    ;
    TooltipTemplate.prototype.baselineTooltip = function (props) {
        return (React.createElement("table", null,
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "Planned Start Date: "),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.BaselineStartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Planned End Date: "),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.BaselineEndDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Current Start Date: "),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.StartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Current End Date: "),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.EndDate))))));
    };
    ;
    TooltipTemplate.prototype.timelineTooltip = function (props) {
        var tier = props.tier;
        var date = props.date;
        var endDate = new Date(date);
        if (tier === 'topTier' && this.ganttInstance.timelineSettings.topTier.unit) {
            endDate.setDate(endDate.getDate() + 6);
        }
        var data = this.getTooltipData(new Date(date), endDate, tier);
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
    ;
    TooltipTemplate.prototype.getTooltipData = function (startDate, endDate, tier) {
        var gantt = this.ganttInstance; // accessed via ref
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
    TooltipTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TooltipTemplate', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.tooltipData, highlightWeekends: true, renderBaseline: true, treeColumnIndex: 1, tooltipSettings: this.tooltipSettings, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, resourceFields: this.resourceFields, resources: data_1.editingResources },
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
                    "This sample explains the way of rendering tooltip template for taskbar, timeline and baseline by mapping template elements to the property of taskbar and baseline in ",
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
                    ",",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#timeline" }, "tooltipSettings.timeline"),
                    " and ",
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
    return TooltipTemplate;
}(sample_base_1.SampleBase));
exports.TooltipTemplate = TooltipTemplate;
