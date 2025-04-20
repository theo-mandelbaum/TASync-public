"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * Formula sample
 */
function Formula() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spreadsheet;
    var definedNames = [{
            name: 'Profit', refersTo: '=F2:F11'
        },
        {
            name: 'High', refersTo: '=D2:D11'
        }];
    function onCreated() {
        spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#279377', color: '#fff', textAlign: 'center', verticalAlign: 'middle', fontSize: '14px' }, 'A1:F1');
        spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#EEEEEE' }, 'A12:F15');
        spreadsheet.numberFormat('0.00', 'F2:F11');
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section spreadsheet-control' },
            React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { showRibbon: false, ref: function (ssObj) { spreadsheet = ssObj; }, definedNames: definedNames, created: onCreated.bind(this) },
                React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                    React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Stock Details', selectedRange: 'F15' },
                        React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.formulaData })),
                        React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 40 }),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { index: 11 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Average profit:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 5, formula: '=AVERAGE(Profit)', format: '0.00' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 25 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Maximum stock value:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 5, formula: '=MAX(High)', format: '0.00' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 25 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Minimum stock value:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 5, formula: '=MIN(E2:E11)' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 25 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Non-profitable days:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 5, formula: '=COUNTIF(F2:F11,"<=0")' })))),
                        React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 140 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 140 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the analysis of a company's stock value for a certain period with formula feature.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                " The ",
                React.createElement("code", null, "Spreadsheet"),
                " component provides a built-in calculation library that supports most commonly used formulas. In this demo, a formula is specified to a cell using the ",
                React.createElement("code", null, "formula"),
                " property."),
            React.createElement("p", null,
                "More information about formula support can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/formulas/" }, " documentation"),
                " section."))));
}
exports.default = Formula;
