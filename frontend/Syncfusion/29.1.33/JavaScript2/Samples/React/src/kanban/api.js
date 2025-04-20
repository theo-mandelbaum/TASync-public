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
exports.API = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
require("./api.css");
var property_pane_1 = require("../common/property-pane");
/**
 * Kanban API sample
 */
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        _this.statusData = [{ Id: 0, text: 'Testing' }, { Id: 1, text: 'Review' }, { Id: 2, text: 'Validate' }];
        _this.buttons = [{
                click: _this.dlgButtonClick.bind(_this),
                buttonModel: {
                    content: 'OK',
                    isPrimary: true
                }
            }];
        return _this;
    }
    API.prototype.dlgButtonClick = function () {
        this.dialogInstance.hide();
    };
    API.prototype.rendereComplete = function () {
        // initialize the form validator
        this.addFormObj = new ej2_react_inputs_1.FormValidator('#addForm');
        this.deleteFormObj = new ej2_react_inputs_1.FormValidator('#deleteForm');
        document.getElementById('addForm').addEventListener('submit', function (e) { return e.preventDefault(); });
        document.getElementById('deleteForm').addEventListener('submit', function (e) { return e.preventDefault(); });
    };
    API.prototype.onAdd = function () {
        var text = this.header.value;
        var key = this.dropObj.text;
        var index = this.addIndex.value;
        if (this.kanbanObj.columns.length >= index && key && key.length > 0 && text && text.length > 0 && index !== null) {
            this.kanbanObj.addColumn({ keyField: key, headerText: text, showItemCount: true }, index);
            this.addIndex.max = this.kanbanObj.columns.length;
            this.deleteIndex.max = this.kanbanObj.columns.length - 1;
            this.addFormObj.reset();
            this.addIndex.value = null;
        }
        else if (!(text && text.length > 0)) {
            this.dialogInstance.content = 'Enter Column Header Text';
            this.dialogInstance.show();
        }
        else if (!(key && key.length > 0)) {
            this.dialogInstance.content = 'Enter Column Key Field';
            this.dialogInstance.show();
        }
        else if (!index) {
            this.dialogInstance.content = 'Enter Column Index';
            this.dialogInstance.show();
        }
    };
    API.prototype.onDelete = function () {
        var index = this.deleteIndex.value;
        if (this.kanbanObj.columns.length > 1) {
            if (this.kanbanObj.columns.length >= (index + 1) && index !== null) {
                this.kanbanObj.deleteColumn(index);
                this.addIndex.max = this.kanbanObj.columns.length;
                this.deleteIndex.max = this.kanbanObj.columns.length - 1;
                this.deleteFormObj.reset();
                this.deleteIndex.value = null;
            }
            else {
                this.dialogInstance.content = 'Enter Column Index';
                this.dialogInstance.show();
            }
        }
        else {
            this.dialogInstance.content = 'Atleast one column must be displayed in kanban';
            this.dialogInstance.show();
        }
    };
    API.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", cssClass: "kanban-api", dataSource: this.data, ref: function (kanban) { _this.kanbanObj = kanban; }, cardSettings: { contentField: "Summary", headerField: "Id" } },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))),
                    React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialog", ref: function (dialog) { return _this.dialogInstance = dialog; }, showCloseIcon: true, isModal: true, visible: false, width: '350px', header: 'Validation', buttons: this.buttons }))),
            React.createElement("div", { className: "col-lg-3 property-section property-customization", id: "apiKanbanProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: "Add Column" },
                    React.createElement("form", { id: "addForm" },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: function (kanban) { _this.header = kanban; }, id: "text", className: "e-input", type: "text", placeholder: "Text Field" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'key', ref: function (kanban) { _this.dropObj = kanban; }, dataSource: this.statusData, placeholder: 'Key Field' }))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (kanban) { _this.addIndex = kanban; }, id: "index", format: '###.##', min: 0, value: 0, max: 3, placeholder: "Index" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { className: 'e-check' },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'add', type: 'button', className: "e-btn", onClick: this.onAdd.bind(this) }, "Add")))))),
                    React.createElement("p", { className: "property-panel-header", style: { width: '100%', padding: '22px 0 0 0' } }, "Delete Column"),
                    React.createElement("div", { className: "property-panel-content" },
                        React.createElement("form", { id: "deleteForm" },
                            React.createElement("table", null,
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (kanban) { _this.deleteIndex = kanban; }, id: "deteteIndex", format: '###.##', min: 0, value: 0, max: 2, placeholder: "Index" }))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { className: 'e-check' },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'delete', type: 'button', className: "e-btn", onClick: this.onDelete.bind(this) }, "Delete"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the important APIs required to manipulate the Kanban component. Provides necessary details in the property panel to add and remove the columns dynamically.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The demo explains how to add or remove columns programmatically."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "addColumn:"),
                        " The public method used to add a column to the Kanban board dynamically."),
                    React.createElement("li", null,
                        React.createElement("code", null, "deleteColumn:"),
                        " The public method used to remove the existing column from the Kanban board based on an index.")))));
    };
    return API;
}(sample_base_1.SampleBase));
exports.API = API;
