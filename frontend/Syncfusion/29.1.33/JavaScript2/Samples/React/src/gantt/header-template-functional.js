"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./header-template.css");
var HeaderTemplate = function () {
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
        resourceInfo: 'resources',
        child: 'subtasks'
    };
    var resourceFields = {
        id: 'resourceId',
        name: 'resourceName'
    };
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var splitterSettings = {
        columnIndex: 4
    };
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('07/06/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', resourceFields: resourceFields, resources: data_1.editingResources, dataSource: data_1.templateData, highlightWeekends: true, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', headerTemplate: function () {
                            return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                                React.createElement("div", { className: "gantttaskName" }),
                                React.createElement("b", { className: 'e-header' }, "Task Name")));
                        }, width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerTemplate: function () {
                            return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                                React.createElement("div", { className: "ganttstartDate" }),
                                React.createElement("b", { className: 'e-header' }, "Start Date")));
                        } }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources', headerTemplate: function () {
                            return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                                React.createElement("div", { className: "ganttresource" }),
                                React.createElement("b", { className: 'e-header' }, "Resources")));
                        } }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', headerTemplate: function () {
                            return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                                React.createElement("div", { className: "ganttduration" }),
                                React.createElement("b", { className: 'e-header' }, "Duration")));
                        } }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', headerTemplate: function () {
                            return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                                React.createElement("div", { className: "ganttprogressTemplate" }),
                                React.createElement("b", { className: 'e-header' }, "Progress")));
                        } })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Gantt header template feature. In this sample, custom icons have been shown in the column headers.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Gantt provides a way to define a custom element in header element. The ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#headertemplate" }, "columns -> headerTemplate"),
                " property accepts the template for the header cell."),
            React.createElement("p", null, "In this demo, we have rendered the customized template for all column headers."))));
};
exports.default = HeaderTemplate;
