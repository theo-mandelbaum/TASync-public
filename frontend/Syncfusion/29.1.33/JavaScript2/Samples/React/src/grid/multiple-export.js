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
exports.MultipleExport = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var MultipleExport = /** @class */ (function (_super) {
    __extends(MultipleExport, _super);
    function MultipleExport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = null;
        _this.detail = [];
        _this.toolbarOptions = ['ExcelExport', 'PdfExport'];
        _this.exportGrids = ['MasterGrid', 'DetailGrid'];
        _this.newSheetExcelProperties = {
            multipleExport: { type: 'NewSheet' }
        };
        _this.sameSheetPdfProperties = {
            multipleExport: { type: "AppendToPage", blankSpace: 10 }
        };
        _this.names = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];
        _this.master = data_1.customerData.filter(function (e) { return _this.names.indexOf(e.CustomerID) !== -1; });
        return _this;
    }
    ;
    MultipleExport.prototype.rowselect = function (args) {
        var selRecord = args.data;
        var selecteMessage = document.getElementsByClassName('e-statustext')[0];
        var message = selecteMessage.querySelector('b');
        message.textContent = selRecord.ContactName;
        this.detailGrid.dataSource = data_1.data.filter(function (record) { return record.CustomerName === selRecord.ContactName; }).slice(0, 5);
    };
    MultipleExport.prototype.toolbarClick = function (args) {
        if (this.checkboxObj.checked) {
            switch (args.item.id) {
                case 'MasterGrid_excelexport':
                    this.masterGrid.excelExport({}, true);
                    break;
                case 'MasterGrid_pdfexport':
                    this.masterGrid.pdfExport(this.sameSheetPdfProperties, true);
                    break;
            }
        }
        else {
            switch (args.item.id) {
                case 'MasterGrid_excelexport':
                    this.masterGrid.excelExport(this.newSheetExcelProperties, true);
                    break;
                case 'MasterGrid_pdfexport':
                    this.masterGrid.pdfExport({}, true);
                    break;
            }
        }
    };
    MultipleExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("p", { className: "e-mastertext" }, "Master Grid"),
                React.createElement(ej2_react_grids_1.GridComponent, { id: 'MasterGrid', ref: function (grid) { return _this.masterGrid = grid; }, dataSource: this.master, selectedRowIndex: 2, allowExcelExport: true, allowPdfExport: true, toolbar: this.toolbarOptions, exportGrids: this.exportGrids, rowSelected: this.rowselect.bind(this), toolbarClick: this.toolbarClick.bind(this) },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ContactName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CompanyName', headerText: 'Company Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Address', headerText: 'Address', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Selection, ej2_react_grids_1.PdfExport, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.Toolbar] })),
                React.createElement("div", { className: 'e-statustext' },
                    " Showing orders of Customer:  ",
                    React.createElement("b", null)),
                React.createElement(ej2_react_grids_1.GridComponent, { id: 'DetailGrid', dataSource: this.detail, allowSelection: false, allowExcelExport: true, allowPdfExport: true, ref: function (grid) { return _this.detailGrid = grid; } },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '150', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '150', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.PdfExport, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.Toolbar] }))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null, "Export Grids in same sheet")),
                                React.createElement("td", { style: { width: '30%', padding: '10px 10px 10px 0px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (scope) { _this.checkboxObj = scope; }, checked: true, "aria-label": "Export Grids in same sheet" }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the client-side exporting of mutliple grids, which allows you to export the data of multiple grids in the same or different pages to Excel and PDF formats.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "Data Grids support client-side exporting which allows you to export data to Excel and PDF formats."),
                React.createElement("p", null,
                    "Multiple grids can be exported by providing ",
                    React.createElement("code", null, "IDs"),
                    " in the ",
                    React.createElement("code", null, "exportGrids"),
                    " property."),
                React.createElement("p", null,
                    "In this demo, Excel and PDF exports are enabled in both grids by setting the ",
                    React.createElement("code", null, "allowExcelExport"),
                    " and",
                    React.createElement("code", null, "allowPdfExport"),
                    " properties to true. In the master grid, the grid IDs are listed in the",
                    React.createElement("code", null, "exportGrids"),
                    " property which can be exported to Excel and PDF formats by clicking the toolbar buttons."),
                React.createElement("p", null,
                    "The ExcelExport and PdfExport items are defined in the toolbar of the Grid. Actions are defined in the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://helpej2.syncfusion.com/react/documentation/api/grid/#toolbarclick" }, "toolbarClick")),
                    " event to export Grid data using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://helpej2.syncfusion.com/react/documentation/api/grid/#excelexport" }, "excelExport")),
                    "and",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid#pdfexport" }, "pdfExport")),
                    " methods."),
                React.createElement("p", null,
                    "By default, in this demo grids are exported on the same page. They can be exported in separate pages by unchecking the checkbox. This can be achieved by setting the multipleExport ",
                    React.createElement("code", null, "type"),
                    " of",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://helpej2.syncfusion.com/react/documentation/api/grid/excelExportProperties/" }, "ExcelExportProperties")),
                    "and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://helpej2.syncfusion.com/react/documentation/api/grid/pdfExportProperties/" }, "PdfExportProperties."))),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Modules"),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use selection and export features, inject ",
                    React.createElement("code", null, "Selection"),
                    ", ",
                    React.createElement("code", null, "ExcelExport"),
                    "and ",
                    React.createElement("code", null, "PdfExport"),
                    " modules into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the exporting configuration can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/excel-export/excel-exporting" }, "excel-export"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/pdf-export/pdf-export" }, "pdf-export"),
                    " documentation sections."))));
    };
    return MultipleExport;
}(sample_base_1.SampleBase));
exports.MultipleExport = MultipleExport;
