"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * Cell Formatting sample
 */
function CellFormatting() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spreadsheet;
    var rows = [
        {
            height: 36,
            //Applying cell formatting through cell binding
            cells: [{ style: { textAlign: 'right' } }, { style: { textIndent: '2pt' } }, { style: { textAlign: 'right' } },
                { style: { textIndent: '2pt' } }, { index: 5, style: { textAlign: 'right' } },
                { index: 7, style: { textAlign: 'center' } }, { index: 8, style: { textAlign: 'right' } }]
        },
        { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 },
        { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 },
        { height: 42 }, { height: 42 }
    ];
    var sheetSettings = [{
            name: 'Order Details',
            ranges: [{ dataSource: data_1.orderDetails }],
            columns: [{ width: 80 }, { width: 140 }, { width: 100 }, { width: 232 }, { width: 120 }, { width: 100 },
                { width: 100 }, { width: 120 }, { width: 80 }],
            rows: rows,
            showGridLines: false
        }];
    function createdHandler() {
        //Applying cell formatting dynamically using cellFormat method.
        spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#4b5366', color: '#ffffff', fontSize: '12pt' }, 'A1:I1');
        spreadsheet.cellFormat({ fontWeight: 'bold', textIndent: '2pt' }, 'B2:B16');
        spreadsheet.cellFormat({ fontStyle: 'italic', textIndent: '2pt' }, 'D2:D16');
        spreadsheet.cellFormat({ textIndent: '2pt' }, 'E1:E16');
        spreadsheet.cellFormat({ textIndent: '2pt' }, 'G1:G16');
        spreadsheet.cellFormat({ textAlign: 'center', fontWeight: 'bold' }, 'H2:H16');
        spreadsheet.cellFormat({ fontFamily: 'Helvetica New', verticalAlign: 'middle' }, 'A1:I16');
        //Applying border to a range
        spreadsheet.setBorder({ border: '1px solid #e0e0e0' }, 'A1:I16', 'Outer');
        spreadsheet.setBorder({ border: '1px solid #e0e0e0' }, 'A2:I15', 'Horizontal');
        // Applying a short date format to a range.
        spreadsheet.numberFormat('m/d/yyyy', 'C2:C16');
        // Applying currency format to a range.
        spreadsheet.numberFormat('$#,##0.00', 'I2:I16');
    }
    function beforeCellRender(args) {
        if (spreadsheet.sheets[spreadsheet.activeSheetIndex].name === 'Order Details' && !spreadsheet.isOpen) {
            if (args.cell && args.cell.value) {
                //Applying cell formatting before rendering the particular cell.
                switch (args.cell.value) {
                    case 'Delivered':
                        spreadsheet.cellFormat({ color: '#10c469', textDecoration: 'line-through' }, args.address);
                        break;
                    case 'Shipped':
                        spreadsheet.cellFormat({ color: '#62c9e8' }, args.address);
                        break;
                    case 'Pending':
                        spreadsheet.cellFormat({ color: '#FFC107', textDecoration: 'underline' }, args.address);
                        break;
                    case 'Cancelled':
                        spreadsheet.cellFormat({ color: '#ff5b5b' }, args.address);
                        break;
                }
            }
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section spreadsheet-control' },
            React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { showRibbon: false, showFormulaBar: false, sheets: sheetSettings, ref: function (ssObj) { spreadsheet = ssObj; }, created: createdHandler.bind(this), beforeCellRender: beforeCellRender.bind(this) })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the ",
                React.createElement("code", null, "Spreadsheet"),
                " cell formatting feature by applying different styles to a range of cells.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                React.createElement("p", null,
                    "Cell formatting allows you to highlight cell data that appears in the Spreadsheet. It can be enabled or disabled using the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/spreadsheet/#allowcellformatting" }, "allowCellFormatting")),
                    " property."),
                React.createElement("p", null,
                    "In this sample, gridlines are hidden using the ",
                    React.createElement("code", null, "showGridLines"),
                    " property and the styles are applied using the ",
                    React.createElement("code", null, "style"),
                    " property and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/spreadsheet/#cellFormat" }, "cellFormat")),
                    " method.")),
            React.createElement("p", null,
                "More information about ",
                React.createElement("code", null, "cell formatting"),
                " can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/formatting/#text-and-cell-formatting" }, " documentation"),
                " section."))));
}
exports.default = CellFormatting;
