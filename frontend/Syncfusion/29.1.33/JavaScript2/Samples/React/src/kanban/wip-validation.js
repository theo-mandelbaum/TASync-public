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
exports.WIPValidation = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
require("./wip-validation.css");
var property_pane_1 = require("../common/property-pane");
/**
 * Kanban WIP Validation sample
 */
var WIPValidation = /** @class */ (function (_super) {
    __extends(WIPValidation, _super);
    function WIPValidation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        _this.buttons = [{
                click: _this.dlgButtonClick.bind(_this),
                buttonModel: {
                    content: 'OK',
                    isPrimary: true
                }
            }];
        _this.columnType = [
            { 'value': 'Column', 'text': 'Column' }, { 'value': 'Descending', 'text': 'Swimlane' }
        ];
        _this.statusData = [
            { Id: 0, text: 'To Do' },
            { Id: 1, text: 'In Progress' },
            { Id: 2, text: 'Done' }
        ];
        _this.value = 'Column';
        _this.fields = { text: 'text', value: 'Id' };
        return _this;
    }
    WIPValidation.prototype.dlgButtonClick = function () {
        this.dialogInstance.hide();
    };
    WIPValidation.prototype.rendereComplete = function () {
        // initialize the form validator
        this.formObject = new ej2_react_inputs_1.FormValidator('#column');
        document.getElementById('column').addEventListener('submit', function (e) { return e.preventDefault(); });
    };
    WIPValidation.prototype.changeContraintType = function (args) {
        this.kanbanObj.constraintType = args.value;
    };
    WIPValidation.prototype.changeColumns = function (args) {
        var changeIndex = args.value;
        if (changeIndex !== null) {
            this.minimum.value = this.kanbanObj.columns[changeIndex].minCount;
            this.maximum.value = this.kanbanObj.columns[changeIndex].maxCount;
        }
    };
    WIPValidation.prototype.onFormValidate = function () {
        var colindex = this.dropObj.index;
        var colText = this.dropObj.text;
        var colmin = this.minimum.value;
        var colmax = this.maximum.value;
        if (colText === null) {
            this.dialogInstance.content = 'Select column Header Text';
            this.dialogInstance.show();
        }
        else if (colText !== null && this.minimum.value === null && this.maximum.value === null) {
            this.dialogInstance.content = 'Enter column min-count or max-count';
            this.dialogInstance.show();
        }
        else {
            this.kanbanObj.columns[colindex].headerText = colText;
            if (this.minimum.value !== null) {
                this.kanbanObj.columns[colindex].minCount = colmin;
            }
            if (this.maximum.value !== null) {
                this.kanbanObj.columns[colindex].maxCount = colmax;
            }
            this.formObject.reset();
        }
    };
    WIPValidation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: this.data, ref: function (kanban) { _this.kanbanObj = kanban; }, cardSettings: { contentField: "Summary", headerField: "Id" }, swimlaneSettings: { keyField: "Assignee" } },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", allowToggle: true, showItemCount: true, minCount: 6, maxCount: 8 }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", allowToggle: true, showItemCount: true, minCount: 2 }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", allowToggle: true, showItemCount: true, maxCount: 4 }))),
                    React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialog", ref: function (dialog) { return _this.dialogInstance = dialog; }, showCloseIcon: true, isModal: true, visible: false, width: '350px', header: 'Validation', buttons: this.buttons }))),
            React.createElement("div", { className: "col-lg-3 property-section property-customization", id: "wipValidationProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: "Constraint" },
                    React.createElement("table", { className: "e-constraint-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: "e-constraint-label" },
                                    React.createElement("div", null, "Type")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'type', dataSource: this.columnType, change: this.changeContraintType.bind(this), value: this.value })))))),
                    React.createElement("p", { className: "property-panel-header", style: { width: '100%', padding: '22px 0 0 0' } }, "Validate Constraints"),
                    React.createElement("div", { className: "property-panel-content" },
                        React.createElement("form", { id: "column" },
                            React.createElement("table", { className: "e-constraint-table" },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", { className: "e-constraint-label" },
                                            React.createElement("div", null, "Columns")),
                                        React.createElement("td", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'key', ref: function (kanban) { _this.dropObj = kanban; }, dataSource: this.statusData, change: this.changeColumns.bind(this), fields: this.fields, placeholder: 'Header Text ' }))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { className: "e-constraint-label" },
                                            React.createElement("div", null, "MinCount")),
                                        React.createElement("td", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (kanban) { _this.minimum = kanban; }, id: "minIndex", format: '###.##', min: 0, placeholder: "Minimum Count" }))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { className: "e-constraint-label" },
                                            React.createElement("div", null, "MaxCount")),
                                        React.createElement("td", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (kanban) { _this.maximum = kanban; }, id: "maxIndex", format: '###.##', min: 0, placeholder: "Maximum Count" }))))),
                            React.createElement("div", { className: "e-validate" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'validate', className: "e-btn", onClick: this.onFormValidate.bind(this) }, "Validate")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to limit the minimum and maximum number of cards to each column of the Kanban component. Configured the options in the property panel to change the constraint type and related attributes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample validates the number of cards in the particular column or swimlane using the ",
                    React.createElement("code", null, "constraintType"),
                    " property. This property contains two types:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Column: Validates the number of cards based on the particular column. By default, column validation is applied to Kanban board."),
                    React.createElement("li", null, "Swimlane: Validation applies based on number of cards in a particular column cell and swimlane.")),
                React.createElement("p", null, "This sample contains the following properties: "),
                React.createElement("ul", null,
                    React.createElement("li", null, "Columns: You can choose a column and set maximum and minimum limit to the selected column."),
                    React.createElement("li", null, "minCount: Minimum limit of cards required for each column. If the cards count do not reach the minimum limit, it will indicate the validation failed state."),
                    React.createElement("li", null, "maxCount: Maximum limit of cards per column. If the cards count exceeds the maximum limit, it will indicate the validation failed state.")))));
    };
    return WIPValidation;
}(sample_base_1.SampleBase));
exports.WIPValidation = WIPValidation;
