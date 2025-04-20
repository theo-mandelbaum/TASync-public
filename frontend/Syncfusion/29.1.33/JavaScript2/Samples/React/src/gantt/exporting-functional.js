"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./exporting.css");
var Exporting = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var isFitToWidth;
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks',
        resourceInfo: 'resources'
    };
    var resourceFields = {
        id: 'resourceId',
        name: 'resourceName'
    };
    var splitterSettings = {
        position: "35%"
    };
    var projectStartDate = new Date('03/25/2024');
    var projectEndDate = new Date('07/28/2024');
    var gridLines = 'Both';
    var toolbar = ['ExcelExport', 'CsvExport', 'PdfExport'];
    var timelineSettings = {
        topTier: {
            unit: 'Week',
            format: 'MMM dd, y',
        },
        bottomTier: {
            unit: 'Day',
        },
    };
    var eventMarkers = [
        {
            day: new Date('04/02/2024'),
        }, {
            day: new Date("04/09/2024"),
            label: 'Research phase'
        }, {
            day: new Date("04/30/2024"),
            label: 'Design phase'
        }, {
            day: new Date("05/23/2024"),
            label: 'Production phase'
        }, {
            day: new Date("06/20/2024"),
            label: 'Sales and marketing phase'
        }
    ];
    var holidays = [
        {
            from: new Date('04/04/2024'),
            to: new Date('04/04/2024'),
            label: 'Local Holiday'
        }, {
            from: new Date('04/19/2024'),
            to: new Date('04/19/2024'),
            label: 'Good Friday'
        }, {
            from: new Date('04/30/2024'),
            to: new Date('04/30/2024'),
            label: 'Release Holiday'
        },
    ];
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var toolbarClick = function (args) {
        if (args.item.id === "GanttExport_excelexport") {
            ganttInstance.current.excelExport();
        }
        else if (args.item.id === "GanttExport_csvexport") {
            ganttInstance.current.csvExport();
        }
        else if (args.item.id === "GanttExport_pdfexport") {
            ganttInstance.current.pdfExport();
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'GanttExport', ref: ganttInstance, dataSource: data_1.editingData, dateFormat: 'MMM dd, y', treeColumnIndex: 1, allowExcelExport: true, allowPdfExport: true, allowSelection: true, showColumnMenu: false, highlightWeekends: true, allowUnscheduledTasks: true, projectStartDate: projectStartDate, projectEndDate: projectEndDate, splitterSettings: splitterSettings, taskFields: taskFields, timelineSettings: timelineSettings, labelSettings: labelSettings, toolbarClick: toolbarClick.bind(_this), height: '410px', gridLines: gridLines, toolbar: toolbar, resourceFields: resourceFields, holidays: holidays, eventMarkers: eventMarkers, resources: data_1.editingResources },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.ExcelExport, ej2_react_gantt_1.PdfExport, ej2_react_gantt_1.DayMarkers] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates client-side exporting of the Gantt, which allows you to export Gantt data to Excel, PDF and CSV formats. Using the Gantt toolbar buttons, you can export Gantt data to the desired format. ")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Gantt supports client-side exporting, which allows you to export its data to the Excel, PDF and CSV formats. "),
            React.createElement("p", null,
                "In this demo, we have defined actions in the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#toolbarclick" }, "toolbarClick"),
                " event to export the Gantt data using the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport" }, "excelExport"),
                ",",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport" }, "pdfExport"),
                "and",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#csvexport" }, "csvExport"),
                " methods."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "To use Excel and CSV export features, we need to inject",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport" }, "excelExport")),
                " module into the ",
                React.createElement("code", null, "services"),
                ". "),
            React.createElement("p", null,
                "To use PDF export feature, we need to inject",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport" }, "pdfExport")),
                " module into the ",
                React.createElement("code", null, "services"),
                ". "))));
};
exports.default = Exporting;
