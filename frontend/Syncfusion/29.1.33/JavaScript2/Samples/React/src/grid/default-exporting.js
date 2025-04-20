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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var Exporting = /** @class */ (function (_super) {
    __extends(Exporting, _super);
    function Exporting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        _this.toolbarOptions = ['ExcelExport', 'PdfExport', 'CsvExport'];
        _this.flag = true;
        _this.template1 = _this.gridImageTemplate;
        _this.template2 = _this.gridUrlTemplate;
        return _this;
    }
    Exporting.prototype.dataBound = function () {
        if (this.flag) {
            this.gridInstance.toolbarModule.toolbar.hideItem(2, true);
            this.flag = false;
        }
    };
    Exporting.prototype.exportQueryCellInfo = function (args) {
        if (args.column.headerText === 'Employee Image') {
            if (args.name === "excelQueryCellInfo") {
                args.image = { height: 75, base64: args.data["EmployeeImage"], width: 75 };
            }
            else {
                args.image = { base64: args.data["EmployeeImage"] };
            }
        }
        if (args.column.headerText === 'Email ID') {
            args.hyperLink = {
                target: 'mailto:' + args.data["EmailID"],
                displayText: args.data["EmailID"]
            };
        }
    };
    Exporting.prototype.onChanged = function (args) {
        var fields = ["Employee Image", "Email ID"];
        if (args.checked) {
            this.gridInstance.showColumns(fields, "headerText");
            this.gridInstance.toolbarModule.toolbar.hideItem(2, true);
        }
        else {
            this.gridInstance.hideColumns(fields, "headerText");
            this.gridInstance.toolbarModule.toolbar.hideItem(2, false);
        }
    };
    Exporting.prototype.gridImageTemplate = function (props) {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, alt: props.EmployeeID })));
    };
    Exporting.prototype.gridUrlTemplate = function (props) {
        var src = 'mailto:${EmailID}' + props.EmailID;
        return (React.createElement("div", { className: 'url' },
            React.createElement("a", { href: src }, props.EmailID)));
    };
    Exporting.prototype.toolbarClick = function (args) {
        switch (args.item.id) {
            case 'DefaultExport_pdfexport':
                this.gridInstance.pdfExport();
                break;
            case 'DefaultExport_excelexport':
                this.gridInstance.excelExport();
                break;
            case 'DefaultExport_csvexport':
                this.gridInstance.csvExport();
                break;
        }
    };
    Exporting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: 'DefaultExport', dataSource: data_1.employeeDetails, ref: function (grid) { return _this.gridInstance = grid; }, toolbar: this.toolbarOptions, allowExcelExport: true, allowSorting: true, allowFiltering: true, filterSettings: this.filterSettings, allowPdfExport: true, allowGrouping: true, toolbarClick: this.toolbarClick.bind(this), dataBound: this.dataBound.bind(this), excelQueryCellInfo: this.exportQueryCellInfo.bind(this), pdfQueryCellInfo: this.exportQueryCellInfo.bind(this), height: '350' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Employee Image', width: '150', template: this.template1, textAlign: 'Center' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', width: '130' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Designation', width: '180' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Email ID', width: '180', template: this.template2 }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hire Date', width: '120', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Address', width: '180', allowGrouping: false })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.PdfExport, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null, "Export template column ")),
                                React.createElement("td", { style: { width: '30%', padding: '10px 10px 10px 0px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (scope) { _this.checkboxObj = scope; }, checked: true, change: this.onChanged.bind(this), "aria-label": "Export template column" }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the client-side exporting of the Grid, which allows you to export its data to the Excel, Pdf and CSV formats. Use the toolbar buttons to export Grid data to desired format.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats."),
                React.createElement("p", null,
                    "In this demo, while exporting, we have included images and hyperlinks from the template columns i.e",
                    React.createElement("strong", null,
                        React.createElement("i", null, "Image")),
                    " and ",
                    React.createElement("strong", null,
                        React.createElement("i", null, "URL")),
                    " using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#excelquerycellinfo" }, "excelQueryCellInfo")),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#pdfquerycellinfo" }, "pdfQueryCellInfo")),
                    " events. The ExcelExport, PdfExport, and CsvExport items are defined in the toolbar, for which we have defined actions in toolbarClick event to export the Grid data using the",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#excelexport" }, "excelExport")),
                    ",",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#pdfexport" }, "pdfExport")),
                    "            and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#csvexport" }, "csvExport")),
                    " methods."),
                React.createElement("p", null, "Note: Since CSV format is supported only plain text, images and hyperlinks will not be exported on this."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject ",
                    React.createElement("code", null, "ExcelExport"),
                    "and ",
                    React.createElement("code", null, "PdfExport"),
                    " module into the ",
                    React.createElement("code", null, "services")),
                React.createElement("p", null,
                    "More information on the exporting can be found in these",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/excel-export/excel-exporting" }, "Excel Export"),
                    " &",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/pdf-export/pdf-export" }, "PDF Export"),
                    "documentation section."))));
    };
    return Exporting;
}(sample_base_1.SampleBase));
exports.Exporting = Exporting;
