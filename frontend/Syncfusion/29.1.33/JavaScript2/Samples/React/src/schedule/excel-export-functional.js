"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./excel-export.css");
var dataSource = require("./datasource.json");
/**
 *  Schedule header customization sample
 */
var ExportToExcel = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
    var onActionBegin = function (args) {
        if (args.requestType === 'toolbarItemRendering') {
            var exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick.bind(_this)
            };
            args.items.push(exportItem);
        }
    };
    var onExportClick = function () {
        var exportFields = [
            { name: 'Id', text: 'Id' },
            { name: 'Subject', text: 'Summary' },
            { name: 'StartTime', text: 'Start Date' },
            { name: 'EndTime', text: 'End Date' },
            { name: 'Location', text: 'Place' }
        ];
        var exportValues = { fieldsInfo: exportFields };
        scheduleObj.current.exportToExcel(exportValues);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'excel-export', width: '100%', height: '650px', id: 'schedule', ref: scheduleObj, selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: data }, actionBegin: onActionBegin },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Week, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.ExcelExport] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This example demonstrates how to export the Scheduler events to an Excel file format at client-side.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this example, the Scheduler events data are exported to an Excel file by making use of the public method",
                React.createElement("code", null, "exportToExcel"),
                ". By default, the whole event collection bound to the Scheduler gets exported as an excel file. To export only specific events of Scheduler, you need to pass the custom data collection as a parameter to the",
                React.createElement("code", null, "exportToExcel"),
                " method. This method accepts the export options as its arguments such as fileName, exportType, fields, customData, and includeOccurrences. The fileName denotes the name to be given for the exported file and the ",
                React.createElement("code", null, "exportType"),
                " allows you to set the format of the excel file to be exported either as .xlsx or .csv. The custom or specific field collection of event dataSource to be exported can be provided through ",
                React.createElement("code", null, "fieldsInfo"),
                " option and the custom data collection can be exported by passing them through the ",
                React.createElement("code", null, "customData"),
                " option. There also exists option to export individual instances of the recurring events to an excel file, by setting true or false to the",
                React.createElement("code", null, "includeOccurrences"),
                " option, denoting either to include or exclude the occurrences as separate instances on an exported excel file."),
            React.createElement("p", null,
                React.createElement("strong", null, "Module Injection")),
            React.createElement("p", null,
                "To start using Excel exporting functionality in Scheduler, we need to inject ",
                React.createElement("code", null, "ExcelExport"),
                " module into the services."))));
};
exports.default = ExportToExcel;
