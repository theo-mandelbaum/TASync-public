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
exports.Exporting = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Exporting = /** @class */ (function (_super) {
    __extends(Exporting, _super);
    function Exporting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
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
        _this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        _this.splitterSettings = {
            position: "35%"
        };
        _this.projectStartDate = new Date('03/25/2024');
        _this.projectEndDate = new Date('07/28/2024');
        _this.gridLines = 'Both';
        _this.toolbar = ['ExcelExport', 'CsvExport', 'PdfExport'];
        _this.timelineSettings = {
            topTier: {
                unit: 'Week',
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
            },
        };
        _this.eventMarkers = [
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
        _this.holidays = [
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
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        return _this;
    }
    Exporting.prototype.toolbarClick = function (args) {
        if (args.item.id === "GanttExport_excelexport") {
            this.ganttInstance.excelExport();
        }
        else if (args.item.id === "GanttExport_csvexport") {
            this.ganttInstance.csvExport();
        }
        else if (args.item.id === "GanttExport_pdfexport") {
            var exportProperties = {
                fitToWidthSettings: {
                    isFitToWidth: this.isFitToWidth,
                }
            };
            this.ganttInstance.pdfExport(exportProperties);
        }
    };
    Exporting.prototype.componentDidMount = function () {
        this.checkHighContrastMode();
    };
    Exporting.prototype.checkHighContrastMode = function () {
        // Check if body has fluent2-highcontrast, fluent2-dark, or fluent2 class
        var themes = ['fluent2-highcontrast', 'fluent2-dark', 'fluent2'];
        var isHighContrast = themes.some(function (theme) { return document.body.classList.contains(theme); });
        if (isHighContrast) {
            var labelElement = document.getElementById('exported');
            if (labelElement) {
                labelElement.style.padding = '5px';
            }
        }
    };
    Exporting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'GanttExport', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.editingData, dateFormat: 'MMM dd, y', treeColumnIndex: 1, allowExcelExport: true, allowPdfExport: true, allowSelection: true, showColumnMenu: false, highlightWeekends: true, allowUnscheduledTasks: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, splitterSettings: this.splitterSettings, taskFields: this.taskFields, timelineSettings: this.timelineSettings, labelSettings: this.labelSettings, toolbarClick: this.toolbarClick.bind(this), height: '410px', gridLines: this.gridLines, holidays: this.holidays, eventMarkers: this.eventMarkers, toolbar: this.toolbar, resourceFields: this.resourceFields, resources: data_1.editingResources },
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
    return Exporting;
}(sample_base_1.SampleBase));
exports.Exporting = Exporting;
