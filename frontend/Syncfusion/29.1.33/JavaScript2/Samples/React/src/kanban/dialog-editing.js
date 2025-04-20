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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanDialogFormTemplate = exports.DialogEditing = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Kanban Dialog Editing sample
 */
var DialogEditing = /** @class */ (function (_super) {
    __extends(DialogEditing, _super);
    function DialogEditing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, true);
        return _this;
    }
    DialogEditing.prototype.addClick = function () {
        var cardIds = this.kanbanObj.kanbanData.map(function (obj) { return parseInt(obj.Id.replace('Task ', ''), 10); });
        var cardCount = Math.max.apply(Math, cardIds) + 1;
        var cardDetails = { Id: "Task " + cardCount, Status: "Open", Priority: "Normal", Assignee: "Andrew Fuller", Estimate: 0, Tags: "", Summary: "" };
        this.kanbanObj.openDialog('Add', cardDetails);
    };
    DialogEditing.prototype.dialogTemplate = function (props) {
        return (React.createElement(KanbanDialogFormTemplate, __assign({}, props)));
    };
    DialogEditing.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement("div", { className: 'kanban-section' },
                        React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", ref: function (kanban) { _this.kanbanObj = kanban; }, keyField: "Status", dataSource: this.data, cardSettings: { contentField: "Summary", headerField: "Id" }, dialogSettings: { template: this.dialogTemplate.bind(this) } },
                            React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                                React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                                React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                                React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                                React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" })))))),
            React.createElement("div", { className: "col-lg-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'addNew', className: "e-btn e-dialog-add", onClick: this.addClick.bind(this) }, "Add New Card"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample showcases the CRUD (Create, Read, Update, and Delete) operations of the Kanban component. You can add a new card using the button from the property panel and read, update, or delete a card by opening the card details in dialog by double-clicking it.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The sample is designed to showcase the CRUD operations of the Kanban board. The Kanban provides the essential methods to handle the CRUD operation from the application-end."),
                React.createElement("ol", null,
                    React.createElement("li", null, "updateCard"),
                    React.createElement("li", null, "addCard"),
                    React.createElement("li", null, "deleteCard")),
                React.createElement("p", null, "The double click event of the card is used to open the card details in a dialog and read, edit, or delete a card."))));
    };
    return DialogEditing;
}(sample_base_1.SampleBase));
exports.DialogEditing = DialogEditing;
var KanbanDialogFormTemplate = /** @class */ (function (_super) {
    __extends(KanbanDialogFormTemplate, _super);
    function KanbanDialogFormTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.assigneeData = [
            'Nancy Davloio', 'Andrew Fuller', 'Janet Leverling',
            'Steven walker', 'Robert King', 'Margaret hamilt', 'Michael Suyama'
        ];
        _this.statusData = ['Open', 'InProgress', 'Testing', 'Close'];
        _this.priorityData = ['Low', 'Normal', 'Critical', 'Release Breaker', 'High'];
        _this.tagsHtmlAttributes = { name: "Tags" };
        _this.state = (0, ej2_base_1.extend)({}, {}, props, true);
        return _this;
    }
    KanbanDialogFormTemplate.prototype.onChange = function (args) {
        var _a;
        var key = args.target.name;
        var value = args.target.value;
        this.setState((_a = {}, _a[key] = value, _a));
    };
    KanbanDialogFormTemplate.prototype.render = function () {
        var data = this.state;
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "ID"),
                        React.createElement("td", null,
                            React.createElement("div", { className: "e-float-input e-control-wrapper" },
                                React.createElement("input", { id: "Id", name: "Id", type: "text", className: "e-field", value: data.Id, disabled: true })))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Status"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'Status', name: "Status", dataSource: this.statusData, className: "e-field", placeholder: 'Status', value: data.Status }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Assignee"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'Assignee', name: "Assignee", className: "e-field", dataSource: this.assigneeData, placeholder: 'Assignee', value: data.Assignee }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Priority"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { type: "text", name: "Priority", id: "Priority", popupHeight: '300px', className: "e-field", value: data.Priority, dataSource: this.priorityData, placeholder: 'Priority' }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Summary"),
                        React.createElement("td", null,
                            React.createElement("div", { className: "e-float-input e-control-wrapper" },
                                React.createElement("textarea", { name: "Summary", className: "e-field", value: data.Summary, onChange: this.onChange.bind(this) }))))))));
    };
    return KanbanDialogFormTemplate;
}(React.Component));
exports.KanbanDialogFormTemplate = KanbanDialogFormTemplate;
