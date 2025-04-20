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
exports.CellTemplate = void 0;
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
var CellTemplate = /** @class */ (function (_super) {
    __extends(CellTemplate, _super);
    function CellTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollSettings = { isFinite: true };
        _this.selectionSettings = { mode: 'None' };
        _this.boldCenter = { fontWeight: 'bold', textAlign: 'center', fontSize: '12pt', verticalAlign: 'middle',
            textDecoration: 'underline'
        };
        return _this;
    }
    CellTemplate.prototype.nameTextbox = function () {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Name" }));
    };
    CellTemplate.prototype.dobTextbox = function () {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "DOB" }));
    };
    CellTemplate.prototype.genderRadioButton = function () {
        return (React.createElement("div", { style: { paddingLeft: '2px' } },
            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { name: "gender", value: "male", label: "Male" }),
            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { name: "gender", value: "female", label: "Female" })));
    };
    CellTemplate.prototype.dropDownList = function () {
        var experience = ['0 - 1 year', '1 - 3 years', '3 - 5 years', '5 - 10 years'];
        return (React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { placeholder: "Experience", dataSource: experience }));
    };
    CellTemplate.prototype.multiSelect = function () {
        var languages = ['JAVA', 'C#', 'SQL'];
        return (React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { placeholder: "Areas of Interest", showClearButton: false, dataSource: languages }));
    };
    CellTemplate.prototype.mobileNoTextbox = function () {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Mobile Number" }));
    };
    CellTemplate.prototype.emailTextbox = function () {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Email" }));
    };
    CellTemplate.prototype.textArea = function () {
        return (React.createElement(ej2_react_inputs_1.TextBoxComponent, { placeholder: "Address", multiline: true }));
    };
    CellTemplate.prototype.button = function () {
        return (React.createElement(ej2_react_buttons_1.ButtonComponent, { content: "Add", style: { float: "right" }, cssClass: "e-flat" }));
    };
    CellTemplate.prototype.onCreated = function () {
        this.spreadsheet.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
        // Merges B1 and C1 cells
        this.spreadsheet.merge('B1:C1');
    };
    CellTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { showRibbon: false, enableContextMenu: false, allowPrint: false, showFormulaBar: false, cssClass: 'e-custom-spreadsheet', allowOpen: false, allowSave: false, ref: function (ssObj) { _this.spreadsheet = ssObj; }, created: this.onCreated.bind(this), name: 'Candidates List', scrollSettings: this.scrollSettings, allowEditing: false, selectionSettings: this.selectionSettings },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Registration Form', rowCount: 40, colCount: 30, showGridLines: false },
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 55 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Interview Registration Form', style: this.boldCenter }))),
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
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.nameTextbox, address: 'C2' }),
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.dobTextbox, address: 'C3' }),
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.genderRadioButton, address: 'C4' }),
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.dropDownList, address: 'C5' }),
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.multiSelect, address: 'C6' }),
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.mobileNoTextbox, address: 'C7' }),
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.emailTextbox, address: 'C8' }),
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.textArea, address: 'C9' }),
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { template: this.button, address: 'C11' })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates cell template feature with interview registration form scenario using input components.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demo, cell template is applied to `C2:C9` and instantiated with input components like TextBox, DropDownList, RadioButton, MultiSelect, DatePicker etc."),
                React.createElement("p", null,
                    "More information about cell template feature can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/template" }, "documentation"),
                    " section."))));
    };
    return CellTemplate;
}(sample_base_1.SampleBase));
exports.CellTemplate = CellTemplate;
