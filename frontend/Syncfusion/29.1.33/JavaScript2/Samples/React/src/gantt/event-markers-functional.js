"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var EventMarkers = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
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
    var eventMarkerDay1 = new Date('04/02/2024');
    var eventMarkerDay2 = new Date('04/09/2024');
    var eventMarkerDay3 = new Date('04/19/2024');
    var eventMarkerDay4 = new Date('05/23/2024');
    var eventMarkerDay5 = new Date('06/20/2024');
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('07/06/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'EventMarkers', dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' })),
                React.createElement(ej2_react_gantt_1.EventMarkersDirective, null,
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay1 }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay2, label: 'Design phase' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay3, label: 'Research phase' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay4, label: 'Production phase' }),
                    React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: eventMarkerDay5, label: 'Sales and marketing phase' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes how to notify the important dates in the project timeline.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#eventmarkers" }, "eventMarkers"),
                " are used like a bookmark to show the different stages of the project life cycle. You can show the desired text on the date. The Event Markers model has the below properties to customize the marker:",
                React.createElement("li", null,
                    React.createElement("code", null, "cssClass"),
                    ": Used to assign external CSS styles to that particular marker."),
                React.createElement("li", null,
                    React.createElement("code", null, "day"),
                    ": Used to set date of the event marker."),
                React.createElement("li", null,
                    React.createElement("code", null, "label"),
                    ": The desired text can be shown on the vertical line using this property.")),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the",
                React.createElement("code", null, "Selection"),
                ", ",
                React.createElement("code", null, "DayMarkers"),
                " modules."))));
};
exports.default = EventMarkers;
