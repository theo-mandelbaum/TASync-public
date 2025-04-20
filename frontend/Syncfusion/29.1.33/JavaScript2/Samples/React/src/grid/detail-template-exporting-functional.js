"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var instance = new ej2_base_1.Internationalization();
function DetailTemplateExport() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var toolbarOptions = ['ExcelExport', 'PdfExport'];
    var gridInstance;
    var format = function (value) {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    };
    function gridTemplate(props) {
        var src = 'src/grid/images/' + props.EmployeeID + '.png';
        return (React.createElement("table", { className: "detailtable", style: { width: "100%" } },
            React.createElement("colgroup", null,
                React.createElement("col", { style: { width: "35%" } }),
                React.createElement("col", { style: { width: "35%" } }),
                React.createElement("col", { style: { width: "30%" } })),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { rowSpan: 4, className: 'images' },
                        React.createElement("img", { className: 'photo', src: src, alt: props.EmployeeID })),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "First Name: "),
                        " ",
                        props.FirstName),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Postal Code: "),
                        " ",
                        props.PostalCode)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Last Name: "),
                        " ",
                        props.LastName),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "City: "),
                        " ",
                        props.City)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Title: "),
                        " ",
                        props.Title),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Phone: "),
                        " ",
                        props.HomePhone)),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "Address: "),
                        " ",
                        props.Address),
                    React.createElement("td", null,
                        React.createElement("span", { style: { fontWeight: 500 } }, "HireDate: "),
                        " ",
                        format(props.HireDate))))));
    }
    var template = gridTemplate;
    function toolbarClick(args) {
        switch (args.item.id) {
            case 'DetailTemplateExport_pdfexport':
                gridInstance.pdfExport({ hierarchyExportMode: 'All' });
                break;
            case 'DetailTemplateExport_excelexport':
                gridInstance.excelExport({ hierarchyExportMode: 'All' });
                break;
        }
    }
    function exportDetailTemplate(args) {
        args.value = {
            columnCount: 3,
            rows: [
                {
                    cells: [
                        {
                            index: 0, rowSpan: 4, image: args.action === 'excelexport' ? {
                                base64: args.parentRow.data['EmployeeImage'],
                                height: 80, width: 80
                            } : { base64: args.parentRow.data['EmployeeImage'], width: 80 }
                        },
                        { index: 1, value: 'First Name: ' + args.parentRow.data['FirstName'] },
                        { index: 2, value: 'Postal Code: ' + args.parentRow.data['PostalCode'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Last Name: ' + args.parentRow.data['LastName'] },
                        { index: 2, value: 'City: ' + args.parentRow.data['City'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Title: ' + args.parentRow.data['Title'] },
                        { index: 2, value: 'Phone: ' + args.parentRow.data['HomePhone'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Address: ' + args.parentRow.data['Address'] },
                        { index: 2, value: 'HireDate: ' + format(args.parentRow.data['HireDate']) }
                    ]
                }
            ]
        };
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { id: 'DetailTemplateExport', dataSource: data_1.employeeData, ref: function (grid) { return gridInstance = grid; }, toolbar: toolbarOptions, allowExcelExport: true, allowSorting: true, allowFiltering: true, filterSettings: filterSettings, allowPdfExport: true, toolbarClick: toolbarClick.bind(this), detailTemplate: template.bind(this), exportDetailTemplate: exportDetailTemplate.bind(this), width: 'auto' },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'First Name', width: '110' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'LastName', headerText: 'Last Name', width: '110' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Name', width: '240' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '180' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.DetailRow, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.PdfExport, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how to export detail grids. In this sample, you can export the detail grid by clicking the corresponding export button on the grid's toolbar.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The detail row template provides additional information about a data row which can shown or hidden by clicking the expand or collapse button. The ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#detailtemplate" }, "detailTemplate")),
                " property accepts either the string or HTML element`s ID value, which will be used as the template for the detail row."),
            React.createElement("p", null, "In this demo, Employees' information is displayed in the detail row."),
            React.createElement("p", null, "Data Grid supports client-side exporting to export data to the Excel and PDF formats."),
            React.createElement("p", null,
                "In this demo, the Employees' information can be exported using the ",
                React.createElement("code", null, "exportDetailTemplate"),
                " event where each cell can be customized. The ExcelExport and PdfExport items are defined in the toolbar of the Grid. Actions are defined in the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://helpej2.syncfusion.com/react/documentation/api/grid/#toolbarclick" }, "toolbarClick")),
                " event to export Grid data using ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://helpej2.syncfusion.com/react/documentation/api/grid/#excelexport" }, "excelExport")),
                " and ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid#pdfexport" }, "pdfExport")),
                " methods with the",
                React.createElement("code", null, "hierarchyExportMode"),
                " set to ",
                React.createElement("code", null, "All"),
                "."),
            React.createElement("p", null,
                "The detail grids' export options can be changed by using the ",
                React.createElement("code", null, "hierarchyExportMode"),
                " property."),
            React.createElement("p", null, "The detail template allows you to export the grid with the following options,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Expanded"),
                    " : Exports only the visible detail rows in an expanded state."),
                React.createElement("li", null,
                    React.createElement("code", null, "All"),
                    " : Exports all the detail rows in an expanded state."),
                React.createElement("li", null,
                    React.createElement("code", null, "None"),
                    " : Exports the detail rows in a collapsed state.")),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "Grid features are segregated into individual feature-wise modules. To use the detail template, PdfExport and ExcelExport Grid features, inject ",
                React.createElement("code", null, "DetailRow"),
                ",",
                React.createElement("code", null, "PdfExport"),
                ", ",
                React.createElement("code", null, "ExcelExport"),
                " modules into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the exporting configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/excel-export/excel-exporting" }, "Excel-export"),
                "and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/pdf-export/pdf-export" }, "PDF-export"),
                " documentation sections."))));
}
exports.default = DetailTemplateExport;
