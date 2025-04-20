"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * CellTemplate sample
 */
function CellTemplate() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spreadsheet;
    var scrollSettings = { isFinite: true };
    var selectionSettings = { mode: 'None' };
    var boldCenter = {
        fontWeight: 'bold', textAlign: 'center', fontSize: '12pt', verticalAlign: 'middle',
        textDecoration: 'underline'
    };
    function nameTextbox() {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Name" }));
    }
    function dobTextbox() {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "DOB" }));
    }
    function genderRadioButton() {
        return (React.createElement("div", { style: { paddingLeft: '2px' } },
            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { name: "gender", value: "male", label: "Male" }),
            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { name: "gender", value: "female", label: "Female" })));
    }
    function dropDownList() {
        var experience = ['0 - 1 year', '1 - 3 years', '3 - 5 years', '5 - 10 years'];
        return (React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { placeholder: "Experience", dataSource: experience }));
    }
    function multiSelect() {
        var languages = ['JAVA', 'C#', 'SQL'];
        return (React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { placeholder: "Areas of Interest", showClearButton: false, dataSource: languages }));
    }
    function mobileNoTextbox() {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Mobile Number" }));
    }
    function emailTextbox() {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Email" }));
    }
    function textArea() {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Address", multiline: true }));
    }
    function button() {
        return (React.createElement(ej2_react_buttons_1.ButtonComponent, { content: "Add", style: { float: "right" }, cssClass: "e-flat" }));
    }
    function onCreated() {
        spreadsheet.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
        // Merges B1 and C1 cells
        spreadsheet.merge('B1:C1');
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section spreadsheet-control' },
            React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { showRibbon: false, enableContextMenu: false, allowPrint: false, showFormulaBar: false, cssClass: 'e-custom-spreadsheet', allowOpen: false, allowSave: false, ref: function (ssObj) { spreadsheet = ssObj; }, created: onCreated.bind(this), name: 'Candidates List', scrollSettings: scrollSettings, allowEditing: false, selectionSettings: selectionSettings },
                React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                    React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Registration Form', rowCount: 40, colCount: 30, showGridLines: false },
                        React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 55 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Interview Registration Form', style: boldCenter }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 45 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Name' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 45 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Date of Birth:' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 45 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Gender:' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 45 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Year of Experience:' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 45 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Areas of Interest:' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 45 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Mobile Number:' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 45 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Email:' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 82 },
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Address:' })))),
                        React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { index: 1, width: 190 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 350 })),
                        React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: nameTextbox, address: 'C2' }),
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: dobTextbox, address: 'C3' }),
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: genderRadioButton, address: 'C4' }),
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: dropDownList, address: 'C5' }),
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: multiSelect, address: 'C6' }),
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: mobileNoTextbox, address: 'C7' }),
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: emailTextbox, address: 'C8' }),
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: textArea, address: 'C9' }),
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: button, address: 'C11' })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates cell template feature with interview registration form scenario using input components.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this demo, cell template is applied to `C2:C9` and instantiated with input components like TextBox, DropDownList, RadioButton, MultiSelect, DatePicker etc."),
            React.createElement("p", null,
                "More information about cell template feature can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/template" }, "documentation"),
                " section."))));
}
exports.default = CellTemplate;
