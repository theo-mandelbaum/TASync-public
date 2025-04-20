"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var AggregateRow = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var toolbarOptions = ["ExcelExport", "PdfExport", "CsvExport"];
    var QueryCellInfo = function (args) {
        if (args.column && args.column.footerTemplate) {
            if (args.cell.value !== null && args.cell.value !== undefined) {
                var aggregateType = args.column.footerTemplate.match(/Minimum|Maximum/);
                if (aggregateType) {
                    args.value = "".concat(aggregateType[0], ": ").concat(args.value);
                }
            }
        }
    };
    var toolbarClick = function (args) {
        switch (args.item.id) {
            case treegridObj.current.grid.element.id + "_pdfexport":
                if (treegridObj.current.enableRtl === true && treegridObj.current.locale === "ar") {
                    var innercontent = "You need custom fonts to export Arabic characters, refer this" +
                        '<a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/pdf-export/#add-custom-font-for-pdf-exporting">' +
                        "documentation section</a>";
                    ej2_popups_1.DialogUtility.alert({ content: innercontent });
                }
                else {
                    treegridObj.current.pdfExport();
                }
                break;
            case treegridObj.current.grid.element.id + "_excelexport":
                treegridObj.current.excelExport();
                break;
            case treegridObj.current.grid.element.id + "_csvexport":
                treegridObj.current.csvExport();
                break;
        }
    };
    var onChange = function (args) {
        if (args.checked) {
            treegridObj.current.aggregates[0].showChildSummary = true;
            treegridObj.current.refresh();
        }
        else {
            treegridObj.current.aggregates[0].showChildSummary = false;
            treegridObj.current.refresh();
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.summaryRowData, treeColumnIndex: 0, childMapping: "children", height: "410", toolbar: toolbarOptions, toolbarClick: toolbarClick.bind(_this), allowExcelExport: true, allowPdfExport: true, ref: treegridObj, excelQueryCellInfo: QueryCellInfo, pdfQueryCellInfo: QueryCellInfo },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FreightID", headerText: "Freight ID", width: "150" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "FreightName", headerText: "Freight Name", width: "190" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "TotalUnits", headerText: "Total Units", width: "160", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "UnitWeight", headerText: "Weight Per Unit", width: "130", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.AggregatesDirective, null,
                        React.createElement(ej2_react_treegrid_1.AggregateDirective, null,
                            React.createElement(ej2_react_treegrid_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_treegrid_1.AggregateColumnDirective, { field: "TotalUnits", columnName: "TotalUnits", type: "Min", footerTemplate: "Minimum: ${Min}" }, " "),
                                React.createElement(ej2_react_treegrid_1.AggregateColumnDirective, { field: "UnitWeight", columnName: "UnitWeight", type: "Max", footerTemplate: "Maximum: ${Max}" }, " ")))),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Aggregate, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.ExcelExport, ej2_react_treegrid_1.PdfExport] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "60%" } },
                                    React.createElement("div", null, "Show Child Summary")),
                                React.createElement("td", { style: { width: "60%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: onChange.bind(_this) }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates aggregate functionality of the Tree Grid. In this sample, the aggregate value for the columns \u201CTotal Units\u201D and \u201CUnit Weight\u201D is displayed in column footer and provide an option to show child summary.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Tree Grid supports aggregates which will be displayed at the footer and every hierarchy level. The aggregate configurations can be provided by the ",
                React.createElement("code", null, " aggregates"),
                " property."),
            React.createElement("p", null, "The built-in aggregates are,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Sum")),
                React.createElement("li", null,
                    React.createElement("code", null, "Average")),
                React.createElement("li", null,
                    React.createElement("code", null, "Min")),
                React.createElement("li", null,
                    React.createElement("code", null, "Max")),
                React.createElement("li", null,
                    React.createElement("code", null, "Count")),
                React.createElement("li", null,
                    React.createElement("code", null, "TrueCount")),
                React.createElement("li", null,
                    React.createElement("code", null, "FalseCount")),
                React.createElement("li", null,
                    React.createElement("code", null, "Custom"),
                    " - Requires the ",
                    React.createElement("code", null, "customAggregate"),
                    " ",
                    "property to perform aggregation. The custom aggregate value can be accessed inside template using the key ",
                    React.createElement("code", null,
                        "$",
                        "custom"))),
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "footerTemplate"),
                " property is used to display three different aggregates in the Tree Grid footer."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Showing minimum aggregate for \u201CTotal Units\u201D column and the footerTemplate using its type name as ",
                    React.createElement("code", null,
                        "($",
                        "Min",
                        ")"),
                    "."),
                React.createElement("li", null,
                    "Showing average aggregate for \u201CUnit weight column\u201D column and the footerTemplate using its type name as ",
                    React.createElement("code", null,
                        "($",
                        "Max",
                        ")"),
                    ".")),
            React.createElement("p", null,
                "The template expression should be provided inside",
                " ",
                React.createElement("code", null,
                    "$",
                    "..."),
                " the interpolation syntax."),
            React.createElement("p", null, "Additionally, the Tree Grid supports client-side exporting to Excel, PDF, and CSV formats. In this demo, for the toolbar items of exporting, actions are defined in the toolbarClick event to export the Tree Grid data using the excelExport, pdfExport, and csvExport methods."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject",
                " ",
                React.createElement("code", null, "Aggregate"),
                " module into the services."),
            React.createElement("p", null,
                "More information about aggregate can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/aggregates/aggregates" }, "documentation section"),
                "."))));
};
exports.default = AggregateRow;
