"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Zooming = function () {
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
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var splitterSettings = {
        position: "35%"
    };
    var toolbar = ['ZoomIn', 'ZoomOut', 'ZoomToFit'];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Zooming', dataSource: data_1.zoomingData, toolbar: toolbar, treeColumnIndex: 1, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px' },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the various phases involved in the manufacturing process of a product, which transforms from a conceptual model to a sellable product.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The sample demonstrates the zooming support in Gantt chart. You can zoom in or zoom out the project timeline dynamically with following toolbar buttons.",
                React.createElement("li", null,
                    React.createElement("code", null, "ZoomIn"),
                    " - To perform zoom in action on Gantt timeline."),
                React.createElement("li", null,
                    React.createElement("code", null, "ZoomOut "),
                    " - To perform zoom out action on Gantt timeline."),
                React.createElement("li", null,
                    React.createElement("code", null, "ZoomToFit "),
                    " - To show all tasks with timeline fit into available chart width."),
                "The zooming feature enables you to view the tasks in the project clearly from minute to year timespan. You need to include",
                React.createElement("code", null, "ZoomIn"),
                ", ",
                React.createElement("code", null, "ZoomOut "),
                " and ",
                React.createElement("code", null, "ZoomToFit "),
                " buttons in the toolbar for performing zooming actions in Gantt chart.",
                React.createElement("li", null,
                    React.createElement("code", null, "ZoomIn"),
                    " - If the user clicks on the ",
                    React.createElement("code", null, "ZoomIn"),
                    " icon we have increased the timeline cell width, when the cell size exceeds the specified range then we have changed the timeline view mode."),
                React.createElement("li", null,
                    React.createElement("code", null, "ZoomOut "),
                    " - If the user clicks on the ",
                    React.createElement("code", null, "ZoomOut"),
                    " icon we have decrease the timeline cell width, when the cell size falls behind the specified range then we have changed the timeline view mode based on the zooming levels."),
                React.createElement("li", null,
                    React.createElement("code", null, "ZoomToFit "),
                    " - In project, if the tasks are rendered in different time ranges, when the user clicks on the  ",
                    React.createElement("code", null, "ZoomToFit"),
                    " icon, then all the tasks are rendered within the current viewable chart container width.")),
            React.createElement("p", null,
                "To use a zoom support related icons, inject the ",
                React.createElement("code", null, "Toolbar"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = Zooming;
