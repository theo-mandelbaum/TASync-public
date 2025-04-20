"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./taskbar-template.css");
var Taskbar = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskFields = {
        id: 'TaskId',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var splitterSettings = {
        columnIndex: 1
    };
    var dayWorkingTime = [{ from: 0, to: 24 }];
    var timelineSettings = {
        timelineUnitSize: 60,
        topTier: {
            unit: 'Hour',
            format: 'MMM dd, yyyy'
        },
        bottomTier: {
            unit: 'Minutes',
            count: 2,
            format: 'h:mm a'
        },
    };
    var eventMarkerDay1 = new Date('03/05/2024 07:09:00 PM');
    var eventMarkerDay2 = new Date('03/05/2024 07:46:00 PM');
    var eventMarkerDay3 = new Date('03/05/2024 07:59:00 PM');
    var eventMarkerDay4 = new Date('03/05/2024 08:08:00 PM');
    var eventMarkerDay5 = new Date('03/05/2024 08:24:00 PM');
    var eventMarkerDay6 = new Date('03/05/2024 08:31:00 PM');
    var eventMarkerDay7 = new Date('03/05/2024 08:47:00 PM');
    var labelSettings = {
        leftLabel: 'TaskName',
    };
    var tooltipTemplate = function (props) {
        if (props.Winner && props.Movie) {
            return (React.createElement("div", null,
                props.Winner,
                " wins oscar award for ",
                props.Movie));
        }
        else if (props.Movie) {
            return (React.createElement("div", null,
                props.Winner,
                " wins oscar award for ",
                props.Movie));
        }
        else {
            return (React.createElement("div", null, props.Performance));
        }
    };
    var template = tooltipTemplate;
    var tooltipSettings = {
        taskbar: template.bind(_this),
    };
    var taskbarTemplate = function (props) {
        if (props.TaskName == 'Oscar moments') {
            return (React.createElement("div", { className: "e-gantt-child-taskbar e-custom-moments", style: { height: "100%", borderRadius: "5px" } }, props.ganttProperties.duration < 4 ?
                React.createElement("img", { className: "moments", src: "src/gantt/images/moments.svg", height: "32", width: "32", alt: 'Oscar Moment svg' }) :
                React.createElement("div", null,
                    React.createElement("img", { className: "moments", src: "src/gantt/images/moments.svg", height: "32", width: "32", alt: 'Oscar Moment svg' }),
                    React.createElement("span", { className: "e-task-label", style: { position: "absolute", top: "15px", fontSize: "12px", textOverflow: "ellipsis", height: "90%", overflow: "hidden" } }, props.Performance))));
        }
        else if (props.TaskName == 'Oscar performance') {
            return (React.createElement("div", { className: "e-gantt-child-taskbar e-custom-performance", style: { height: "100%", borderRadius: "5px" } }, props.ganttProperties.duration <= 5 ?
                React.createElement("img", { className: "face-mask", src: "src/gantt/images/face-mask.svg", height: "32", width: "32", alt: 'Oscar Performance svg' }) :
                React.createElement("div", null,
                    React.createElement("img", { className: "face-mask", src: "src/gantt/images/face-mask.svg", height: "32", width: "32", alt: 'Oscar Performance svg' }),
                    React.createElement("span", { className: "e-task-label e-oscar-performance", style: { position: "absolute", top: "5px", fontSize: "12px", textOverflow: "ellipsis", height: "90%", overflow: "hidden" } }, props.Performance))));
        }
        else {
            return (React.createElement("div", { className: "e-gantt-parent-taskbar e-custom-parent", style: { height: "100%", borderRadius: "5px", textOverflow: "ellipsis" } }, props.ganttProperties.duration < 4 ?
                React.createElement("img", { className: "oscar", src: "src/gantt/images/oscar.svg", height: "32", width: "32", alt: 'Oscar svg' }) :
                props.Winner && props.Movie ?
                    React.createElement("div", null,
                        React.createElement("img", { className: "oscar", src: "src/gantt/images/oscar.svg", height: "32", width: "32", alt: 'Oscar svg' }),
                        React.createElement("span", { className: "e-task-label", style: { position: "absolute", top: "13px", fontSize: "14px" } }, props.Winner),
                        React.createElement("span", { className: "e-task-label", style: { position: "absolute", top: "33px", fontSize: "10px", textOverflow: "ellipsis" } }, props.Movie)) : props.Movie ?
                    React.createElement("div", null,
                        React.createElement("img", { className: "oscar", src: "src/gantt/images/oscar.svg", height: "32", width: "32", alt: 'Oscar svg' }),
                        React.createElement("span", { className: "e-task-label e-oscar-movie", style: { position: "absolute", top: "24px", fontSize: "12px", textOverflow: "ellipsis" } },
                            props.Movie,
                            " ")) :
                    React.createElement("span", { className: "e-task-label" })));
        }
    };
    var childTaskbarTemplate = taskbarTemplate.bind(_this);
    var milstoneTemplate = function (props) {
        return (React.createElement("div", { style: { marginTop: "-7px" } },
            React.createElement("div", { className: "e-gantt-milestone", style: { position: "absolute" } },
                React.createElement("img", { className: "moments", src: "src/gantt/images/moments.svg", height: "24", width: "48", alt: 'Moments svg' }),
                React.createElement("div", { className: "e-milestone-top", style: { borderRightWidth: "26px", marginTop: "-24px", borderLeftWidth: "26px", borderBottomWidth: "26px" } }),
                React.createElement("div", { className: "e-milestone-bottom", style: { top: "26px", borderRightWidth: "26px", borderLeftWidth: "26px", borderTopWidth: "26px" } }))));
    };
    var milestone = milstoneTemplate.bind(_this);
    var projectStartDate = new Date('03/05/2024 06:00 PM');
    var projectEndDate = new Date('03/05/2024 09:50 PM');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TaskbarTemplate', dataSource: data_1.customizedData, dateFormat: 'hh:mm a', taskFields: taskFields, height: '410px', splitterSettings: splitterSettings, treeColumnIndex: 1, rowHeight: 75, taskbarHeight: 65, dayWorkingTime: dayWorkingTime, durationUnit: 'Minute', timelineSettings: timelineSettings, labelSettings: labelSettings, tooltipSettings: tooltipSettings, milestoneTemplate: milestone, taskbarTemplate: childTaskbarTemplate, projectStartDate: projectStartDate, projectEndDate: projectEndDate, allowSelection: true },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskId', headerText: 'Event Id' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Event Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start time' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End time' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Winner', headerText: 'Winner' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Movie', headerText: 'Movie' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Performance', headerText: 'Moments / Performance Details' })),
                React.createElement(ej2_react_gantt_1.EventMarkersDirective, null,
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay1, label: 'Performance' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay2, label: 'Moments' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay3, label: 'Performance' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay4, label: 'Moments' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay5, label: 'Moments' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay6, label: 'Performance' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay7, label: 'Moments' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Selection] })),
            React.createElement("div", { style: { float: 'right', margin: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/90th_Academy_Awards", target: '_blank' }, "https://en.wikipedia.org/"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the complete event schedule of the 90th Academy awards. Taskbars are customized using template support and timeline header is customized for a better view of the data.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Gantt chart provides support for customizing taskbar UI using taskbar template feature. The",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#taskbartemplate" }, "taskbarTemplate"),
                "property accepts either string or HTML element`s ID value, which will be used as the template for the taskbars. The summary tasks and the milestone items can also customized using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#parenttaskbartemplate" }, "parentTaskbarTemplate"),
                " and",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#milestonetemplate" }, "milestoneTemplate"),
                " properties. In this demo, we have customized the taskbar UI to display the data from custom columns and the taskbarTemplate is assigned with the ID of a SCRIPT element whose content is used as the template."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use markers, inject the",
                React.createElement("code", null, "DayMarkers"),
                " module. To use a selection, inject the",
                React.createElement("code", null, "Selection"),
                " module."))));
};
exports.default = Taskbar;
