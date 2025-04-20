"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Resizing = function () {
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
        columnIndex: 6
    };
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('07/06/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', treeColumnIndex: 1, allowResizing: true, dataSource: data_1.projectNewData, highlightWeekends: true, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', width: '250', minWidth: '120', maxWidth: '300' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', minWidth: '8', width: '135' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', minWidth: '8', width: '135' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', allowResizing: false, width: '120' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', minWidth: '8', headerText: 'Progress', textAlign: 'Right', width: '120' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', minWidth: '8', headerText: 'Dependency', textAlign: 'Left', width: '135' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Resize] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Gantt column resizing feature. Click and drag at the right corner of each column header to resize the column.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Gantt columns can be resized by clicking and dragging at the right corner of columns header. Set the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowresizing" }, "allowResizing"),
                " property to true to enable column resizing behavior in Gantt. You can also prevent the resize of a particular column by setting ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#allowresizing" }, "columns -> allowResizing"),
                " to false in columns definition"),
            React.createElement("p", null,
                " In this demo, the allowResizing feature has been enabled by setting the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowresizing" }, "allowResizing"),
                " property to true. Task Name column can be resized between a range of ",
                React.createElement("code", null, "minWidth (120 pixels)"),
                " and ",
                React.createElement("code", null, "maxWidth (300 pixels)"),
                ". The column resizing has been disabled in the ",
                React.createElement("b", null, "Duration"),
                " column"),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use Resize feature, we need to inject ",
                    React.createElement("code", null, "Resize"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    ".")))));
};
exports.default = Resizing;
