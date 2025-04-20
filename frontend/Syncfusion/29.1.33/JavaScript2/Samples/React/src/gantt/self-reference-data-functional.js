"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SelfReferenceData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskFields = {
        id: 'taskID',
        name: 'taskName',
        startDate: 'startDate',
        endDate: 'endDate',
        duration: 'duration',
        progress: 'progress',
        dependency: 'predecessor',
        parentID: 'parentID'
    };
    var labelSettings = {
        leftLabel: 'taskName'
    };
    var splitterSettings = {
        columnIndex: 2
    };
    var projectStartDate = new Date('01/28/2024');
    var projectEndDate = new Date('03/10/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'SelfReferenceData', dataSource: data_1.selfData, highlightWeekends: true, allowSelection: true, treeColumnIndex: 1, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskName', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'startDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'endDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'predecessor' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'progress' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the way of binding self-referential flat data to the Gantt component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Gantt can be bound either to local or remote data services. The ",
                React.createElement("code", null, "dataSource"),
                " property can be assigned either with the array of JavaScript objects or an instance of ",
                React.createElement("code", null, "DataManager"),
                "."),
            React.createElement("p", null,
                "In this demo, the array of self-referential flat data with ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/taskFieldsModel/#parentid" }, "parentID"),
                " is assigned as data source to the Gantt."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Selection)"),
                " method.To use markers, inject the",
                React.createElement("code", null, "DayMarkers"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                " method."))));
};
exports.default = SelfReferenceData;
