"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var Export = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var collapsedStatePersist = true;
    var toolbarOptions = ["ExcelExport", "PdfExport", "CsvExport"];
    var treegridInstance = (0, react_1.useRef)(null);
    var toolbarClick = function (args) {
        switch (args.item.id) {
            case treegridInstance.current.grid.element.id + "_pdfexport":
                if (treegridInstance.current.enableRtl === true &&
                    treegridInstance.current.locale === "ar") {
                    var innercontent = "You need custom fonts to export Arabic characters, refer this" +
                        '<a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/pdf-export/#add-custom-font-for-pdf-exporting">' +
                        "documentation section</a>";
                    ej2_popups_1.DialogUtility.alert({ content: innercontent });
                }
                else {
                    var pdfExportProperties = {
                        isCollapsedStatePersist: collapsedStatePersist,
                    };
                    treegridInstance.current.pdfExport(pdfExportProperties);
                }
                break;
            case treegridInstance.current.grid.element.id + "_excelexport":
                var excelExportProperties = {
                    isCollapsedStatePersist: collapsedStatePersist,
                };
                treegridInstance.current.excelExport(excelExportProperties);
                break;
            case treegridInstance.current.grid.element.id + "_csvexport":
                treegridInstance.current.csvExport();
                break;
        }
    };
    var onChange = function (args) {
        if (args.checked) {
            collapsedStatePersist = true;
        }
        else {
            collapsedStatePersist = false;
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, ref: treegridInstance, treeColumnIndex: 1, childMapping: "subtasks", toolbar: toolbarOptions, toolbarClick: toolbarClick.bind(_this), height: "410", allowExcelExport: true, allowPdfExport: true },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "110", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "180" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "120", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "90", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "90" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.ExcelExport, ej2_react_treegrid_1.PdfExport] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Export Customization" },
                    React.createElement("table", { id: "property", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "60%" } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: "Persist collapsed state", labelPosition: "Before", change: onChange.bind(_this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the client-side exporting of the Tree Grid, which allows you to export its data to the Excel, Pdf and CSV formats. Use the toolbar buttons to export Tree Grid data to desired format.",
                " "),
            React.createElement("p", null,
                "By using the Persist collapsed state checkbox we can persist the Expand/Collpase state of Tree Grid in exported document",
                " ")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Tree Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats."),
            React.createElement("p", null,
                "In this demo, for the toolbar items of exporting, we have defined actions in ",
                React.createElement("code", null, "toolbarClick"),
                " event to export the Tree Grid data using the ",
                React.createElement("code", null, "excelExport"),
                ", ",
                React.createElement("code", null, "pdfExport"),
                " and",
                " ",
                React.createElement("code", null, "csvExport"),
                " methods."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject",
                " ",
                React.createElement("code", null, "ExcelExport"),
                " and ",
                React.createElement("code", null, "PdfExport"),
                " module into the services."),
            React.createElement("p", null,
                "More information on the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/pdf-export/pdf-export" }, "Pdf exporting "),
                " and",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/excel-export/excel-export" }, "Excel exporting"),
                "can be found in documentation section."))));
};
exports.default = Export;
