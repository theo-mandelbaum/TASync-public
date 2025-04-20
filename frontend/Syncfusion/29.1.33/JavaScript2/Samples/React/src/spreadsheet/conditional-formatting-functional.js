"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_2 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_3 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_4 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * ConditionalFormatting sample
 */
function ConditionalFormatting() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spreadsheet;
    function onCreated() {
        spreadsheet.merge('A1:H1');
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:H1');
        // Apply format to the specified range in the active sheet.
        spreadsheet.numberFormat('$#,##0.00', 'D3:D18');
        spreadsheet.numberFormat('$#,##0.00', 'E3:E18');
        spreadsheet.numberFormat('$#,##0.00', 'F3:F18');
        spreadsheet.numberFormat('m/d/yyyy', 'G3:G18');
        spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'D3:D18' });
        spreadsheet.conditionalFormat({ type: 'GreenDataBar', range: 'E3:E18' });
        spreadsheet.conditionalFormat({ type: 'ThreeStars', range: 'H3:H18' });
        spreadsheet.conditionalFormat({ type: 'Top10Items', value: '1', format: { style: { color: '#ffffff', backgroundColor: '#009999', fontWeight: 'bold' } }, range: 'F3:F18' });
        spreadsheet.conditionalFormat({ type: 'Bottom10Items', value: '1', format: { style: { color: '#ffffff', backgroundColor: '#c68d53', fontWeight: 'bold' } }, range: 'F3:F18' });
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section spreadsheet-control' },
            React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { spreadsheet = ssObj; }, created: onCreated.bind(this) },
                React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                    React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Inventory List' },
                        React.createElement(ej2_react_spreadsheet_2.RowsDirective, null,
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 30 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'Inventory List' })))),
                        React.createElement(ej2_react_spreadsheet_4.RangesDirective, null,
                            React.createElement(ej2_react_spreadsheet_3.RangeDirective, { dataSource: data_1.conditionalFormatting, startCell: 'A2' })),
                        React.createElement(ej2_react_spreadsheet_3.ConditionalFormatsDirective, null,
                            React.createElement(ej2_react_spreadsheet_3.ConditionalFormatDirective, { type: 'GYRColorScale', range: 'C3:C18' }),
                            React.createElement(ej2_react_spreadsheet_3.ConditionalFormatDirective, { type: 'LessThan', cFColor: 'RedFT', value: '8-8-2019', range: 'G3:G18' })),
                        React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 158 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 72 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 113 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 113 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 77 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 97 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 73 })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates about the conditional formatting features like highlight cell rules, data bars, color scales, and icon sets by using the inventory list details.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This feature allows you to format a cell or range of cells based on the conditions applied. You can enable or disable conditional formats by using the ",
                React.createElement("code", null, "allowConditionalFormat"),
                " property."),
            React.createElement("p", null,
                "In this sample, we have applied conditional formatting color scales in Quantity column, data bars in Purchase price and selling price column, highlight cell rules in last updated column and rating icon sets applied in rating column by using the ",
                React.createElement("code", null, "conditionalFormat"),
                " method and ",
                React.createElement("code", null, "conditionalFormats"),
                " property in sheets model."),
            React.createElement("p", null, "In the Profit column, we have applied conditional formatting custom format. Using the support you can set cell styles like color, background color, font style, font weight and underline etc."),
            React.createElement("p", null,
                "More information about the Spreadsheet component can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/formatting/#conditional-formatting" }, "documentation"),
                " section."))));
}
exports.default = ConditionalFormatting;
