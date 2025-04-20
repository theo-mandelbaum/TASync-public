"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_pdf_export_1 = require("@syncfusion/ej2-pdf-export");
var AdvancedExporting = function () {
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
    var projectStartDate = new Date('03/25/2025');
    var projectEndDate = new Date('06/25/2025');
    var gridLines = 'Both';
    var toolbar = ['PdfExport'];
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
            day: new Date('04/09/2025'),
            label: 'Research phase'
        },
        {
            day: new Date('06/20/2025'),
            label: 'Sales and marketing phase'
        }
    ];
    var holidays = [
        {
            from: new Date('04/04/2025'),
            to: new Date('04/04/2025'),
            label: 'Local Holiday'
        }, {
            from: new Date('04/19/2025'),
            to: new Date('04/19/2025'),
            label: 'Good Friday'
        }, {
            from: new Date('04/30/2025'),
            to: new Date('04/30/2025'),
            label: 'Release Holiday'
        },
    ];
    var LeftLabelTemplate = function (props) {
        return (React.createElement("span", null, props.TaskName));
    };
    var templateLeft = LeftLabelTemplate;
    var RightLabelTemplate = function (props) {
        if (props.ganttProperties.resourceInfo) {
            var resources = props.ganttProperties.resourceInfo;
            var out = [];
            for (var index = 0; index < resources.length; index++) {
                var src = 'src/gantt/images/' + resources[index].resourceName + '.png';
                var img = (React.createElement("img", { key: "img-".concat(index), src: src, height: "40px", alt: resources[index].resourceName }));
                var span = (React.createElement("span", { key: "span-".concat(index), style: { marginLeft: '5px', marginRight: '5px' } }, resources[index].resourceName));
                out.push(img, span);
            }
            return (React.createElement("div", null, out));
        }
        else {
            return React.createElement("div", null);
        }
    };
    var templateRight = RightLabelTemplate;
    var labelSettings = {
        leftLabel: templateLeft.bind(_this),
        rightLabel: templateRight.bind(_this)
    };
    var toolbarClick = function (args) {
        if (args.item.id === "AdvancedExporting_pdfexport") {
            var borderWidth = 1;
            var borderColor = new ej2_pdf_export_1.PdfColor(227, 22, 91);
            var pdfpen = new ej2_pdf_export_1.PdfPen(borderColor, borderWidth);
            pdfpen.dashStyle = ej2_pdf_export_1.PdfDashStyle.Dash;
            var exportProperties = {
                pageSize: 'A2',
                fileName: "Product Development Report.pdf.pdf",
                ganttStyle: {
                    eventMarker: {
                        label: {
                            fontColor: new ej2_pdf_export_1.PdfColor(33, 33, 33),
                            fontStyle: ej2_pdf_export_1.PdfFontStyle.Bold,
                            backgroundColor: new ej2_pdf_export_1.PdfColor(253, 191, 100),
                        },
                        lineStyle: pdfpen,
                    },
                    holiday: {
                        fontColor: new ej2_pdf_export_1.PdfColor(33, 33, 33),
                        backgroundColor: new ej2_pdf_export_1.PdfColor(243, 244, 246),
                    }
                },
                header: {
                    fromTop: 0,
                    height: 150,
                    contents: [
                        {
                            type: 'Text',
                            value: 'Product Development Lifecycle Gantt Chart Report March 2025 - June 2025',
                            position: { x: 20, y: 20 },
                            style: { textBrushColor: '#00008B', fontSize: 24 },
                        },
                        {
                            type: 'Line',
                            style: { penColor: '#00008B', penSize: 2, dashStyle: 'Solid' },
                            points: { x1: 20, y1: 70, x2: 755, y2: 70 },
                        },
                    ],
                },
                footer: {
                    fromBottom: 160,
                    height: 100,
                    contents: [
                        {
                            type: 'Text',
                            value: "© 2025 Syncfusion Inc. All Rights Reserved.\n" +
                                "Generated on: " + new Date().toLocaleString('en-US', {
                                month: 'long',
                                day: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                            }),
                            position: { x: 1950, y: 40 },
                            style: { textBrushColor: '#3a435e', fontSize: 20 },
                        }
                    ],
                },
                fitToWidthSettings: {
                    isFitToWidth: isFitToWidth,
                }
            };
            ganttInstance.current.pdfExport(exportProperties);
        }
    };
    var pdfQueryTaskbarInfo = function (args) {
        args.labelSettings.leftLabel.value = args.data.ganttProperties.taskName;
        if (args.data.ganttProperties.resourceNames) {
            args.labelSettings.rightLabel.value = args.data.ganttProperties.resourceNames;
            args.labelSettings.rightLabel.image = [{
                    base64: args.data.taskData.resourcesImage, width: 20, height: 20
                }];
            if (args.data.ganttProperties.taskId === 7) {
                args.labelSettings.leftLabel.value = 'Custom Label';
                args.labelSettings.leftLabel.fontStyle.fontColor = new ej2_pdf_export_1.PdfColor(142, 36, 64);
            }
        }
        var theme = document.body.classList.contains('tailwind3-dark') || document.body.classList.contains('fluent2-dark') ||
            document.body.classList.contains('material3-dark') || document.body.classList.contains('bootstrap5.3-dark') ||
            document.body.classList.contains('fluent2-highcontrast') || document.body.classList.contains('fluent2-dark');
        if (theme && args.data.isCritical) {
            args.taskbar.progressColor = new ej2_pdf_export_1.PdfColor(172, 6, 136);
            args.taskbar.taskColor = args.taskbar.taskBorderColor = new ej2_pdf_export_1.PdfColor(73, 4, 58);
        }
        else if (!theme && args.data.isCritical) {
            args.taskbar.progressColor = new ej2_pdf_export_1.PdfColor(176, 0, 138);
            args.taskbar.taskColor = new ej2_pdf_export_1.PdfColor(255, 206, 244);
        }
    };
    var queryTaskbarInfo = function (args) {
        var theme = document.body.classList.contains('tailwind3-dark') || document.body.classList.contains('fluent2-dark') ||
            document.body.classList.contains('material3-dark') || document.body.classList.contains('bootstrap5.3-dark') ||
            document.body.classList.contains('fluent2-highcontrast') || document.body.classList.contains('fluent2-dark');
        if (theme && args.data.isCritical) {
            args.taskbarBgColor = "#49043A";
            args.progressBarBgColor = "#AC0688";
        }
        else if (!theme && args.data.isCritical) {
            args.progressBarBgColor = "#B0008A";
            args.taskbarBgColor = "#FFCEF4";
        }
    };
    var autofit = function (args) {
        if (args.checked) {
            isFitToWidth = true;
        }
        else {
            isFitToWidth = false;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { style: { display: 'flex' } },
                React.createElement("div", { style: { display: 'flex' } },
                    React.createElement("label", { htmlFor: "unchecked", id: "exported", style: { fontSize: '15px', margin: '0px 5px 0px 5px' } }, " AutoFit in Pdf Export "),
                    React.createElement("div", null,
                        React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "unchecked", checked: false, change: autofit.bind(_this) })))),
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'AdvancedExporting', ref: ganttInstance, dataSource: data_1.pdfExport, dateFormat: 'MMM dd, y', enableCriticalPath: true, treeColumnIndex: 1, allowExcelExport: true, allowPdfExport: true, allowSelection: true, showColumnMenu: false, highlightWeekends: true, allowUnscheduledTasks: true, projectStartDate: projectStartDate, projectEndDate: projectEndDate, splitterSettings: splitterSettings, taskFields: taskFields, timelineSettings: timelineSettings, labelSettings: labelSettings, toolbarClick: toolbarClick.bind(_this), height: '410px', gridLines: gridLines, toolbar: toolbar, resourceFields: resourceFields, holidays: holidays, eventMarkers: eventMarkers, resources: data_1.editingResources, pdfQueryTaskbarInfo: pdfQueryTaskbarInfo, queryTaskbarInfo: queryTaskbarInfo },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.ExcelExport, ej2_react_gantt_1.PdfExport, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.CriticalPath] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the advanced PDF export features of the Gantt Chart, allowing customization of various elements such as headers, footers, task labels, event markers, holidays, and taskbars. These customizations can be configured using the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties/" }, "pdfExportProperties"),
                "and",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/pdfQueryTaskbarInfoEventArgs/" }, "pdfQueryTaskbarInfo"),
                "event.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this sample, the Gantt Chart's PDF export functionality is enhanced with various customization options:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("strong", null, "Custom Headers and Footers"),
                    ": The headers and footers in the exported PDF can be customized using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties/#header" }, "header"),
                    "and",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties/#footer" }, "footer"),
                    "properties,which allowing us to include relevant information of exported PDF."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Taskbar and Task Label Styling"),
                    ":Taskbar and Task Label appearance can be customized in the exported PDF using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/pdfQueryTaskbarInfoEventArgs" }, "pdfQueryTaskbarInfoEvent"),
                    "."),
                React.createElement("li", null,
                    React.createElement("strong", null, " Event marker and holiday"),
                    ":Event marker and holiday can be cusotmized in exported PDF using",
                    React.createElement("a", { target: "_blank", href: "https://helpej2.syncfusion.com/documentation/api/gantt/pdfExportProperties/#ganttstyle" }, "ganttstyle"),
                    "in ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties" }, "pdfExportProperties"),
                    "."),
                React.createElement("li", null,
                    React.createElement("strong", null, "Fit-to-Width Support"),
                    ": This feature allows the Gantt component's rows to be auto-fitted to the width of the PDF document's page using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties/#fittowidthsettings" }, "fitToWidthSettings"),
                    "in ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/pdfExportProperties" }, "pdfExportProperties"),
                    ".")),
            React.createElement("p", null,
                "More information about advanced PDF exporting features in Gantt can be found in the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/javascript/documentation/gantt/pdf-export/pdf-export" }, "documentation section"),
                "."),
            React.createElement("p", null,
                "To use PDF export feature, we need to inject",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport" }, "pdfExport")),
                " module into the ",
                React.createElement("code", null, "services"),
                ". "))));
};
exports.default = AdvancedExporting;
