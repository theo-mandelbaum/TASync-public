"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_2 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_3 = require("@syncfusion/ej2-react-spreadsheet");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
var data_1 = require("./data");
/**
 * Image sample with import and export support.
 */
function Image() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spreadsheet;
    //To insert image in a cell
    var image = [{
            src: data_1.base64ImageUrl,
            height: 149, width: 907, top: 20, left: 20
        }];
    function onCreated() {
        spreadsheet.merge('B2:F2');
        spreadsheet.merge('B4:F4');
        spreadsheet.cellFormat({ fontSize: '28pt', fontFamily: 'Arial', color: '#3a3838', verticalAlign: 'middle', textAlign: 'center' }, 'B4');
        spreadsheet.cellFormat({ fontSize: '16pt', fontFamily: 'Calibri', color: '#757171', verticalAlign: 'middle' }, 'B6:F6');
        spreadsheet.cellFormat({ fontSize: '14pt', fontFamily: 'Calibri', color: '#757171', verticalAlign: 'middle', textAlign: 'center' }, 'B7:B13');
        spreadsheet.cellFormat({ fontSize: '14pt', color: '#000000', verticalAlign: 'middle' }, 'C7:F13');
        spreadsheet.setBorder({ border: '1px solid #e0e0e0' }, 'B7:F13', 'Horizontal');
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section spreadsheet-control' },
            React.createElement(ej2_react_spreadsheet_3.SpreadsheetComponent, { openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { spreadsheet = ssObj; }, created: onCreated.bind(this), showRibbon: false, showFormulaBar: false },
                React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                    React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Weekly Diet Planner', showGridLines: false, selectedRange: 'B4' },
                        React.createElement(ej2_react_spreadsheet_2.RowsDirective, null,
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 20 }),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 150 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, image: image }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 20 }),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'Weekly Diet Planner' }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 20 }),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 2, value: 'BREAKFAST' }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { value: 'LUNCH' }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { value: 'DINNER' }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { value: 'SNACKS' }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'S' }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { value: 'Bacon, Eggs, and Toast' }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'M' }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { value: 'Strawberry Waffles' }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'T' }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { value: 'Pancakes and Maple Syrup' }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'W' }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { value: 'Sausage and Egg Sandwich' }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'T' }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'F' }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 50 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'S' })))),
                        React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                            React.createElement(ej2_react_spreadsheet_3.ColumnDirective, { width: 20 }),
                            React.createElement(ej2_react_spreadsheet_3.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_3.ColumnDirective, { width: 208 }),
                            React.createElement(ej2_react_spreadsheet_3.ColumnDirective, { width: 200 }),
                            React.createElement(ej2_react_spreadsheet_3.ColumnDirective, { width: 200 }),
                            React.createElement(ej2_react_spreadsheet_3.ColumnDirective, { width: 200 })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample explains about the image feature by using weekly diet planner as an example. You can change the height and width of the picture by resizing and move it to another position by drag and drop.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, the image has been inserted in the specific cell position by using the ",
                React.createElement("code", null, "image"),
                " property in the cell object. You can also insert an image by using the ",
                React.createElement("code", null, "insertImage"),
                " method. To enable or disable this feature use the ",
                React.createElement("code", null, "allowImage"),
                " property in Spreadsheet."),
            React.createElement("p", null,
                "This sample is configured with import and export options. Use ",
                React.createElement("b", null, "Ctrl + O"),
                " to open an excel file and ",
                React.createElement("b", null, "Ctrl + S"),
                " to save an excel file with a picture."),
            React.createElement("p", null,
                "More information about the image can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/illustrations/#image" }, " documentation"),
                " section."))));
}
exports.default = Image;
