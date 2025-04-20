"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
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
var API = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    var kanbanObj = (0, react_1.useRef)(null);
    var addFormObj;
    var deleteFormObj;
    var header = (0, react_1.useRef)(null);
    var dropObj = (0, react_1.useRef)(null);
    var addIndex = (0, react_1.useRef)(null);
    var deleteIndex = (0, react_1.useRef)(null);
    var dialogInstance = (0, react_1.useRef)(null);
    var statusData = [
        { Id: 0, text: "Testing" },
        { Id: 1, text: "Review" },
        { Id: 2, text: "Validate" },
    ];
    var dlgButtonClick = function () {
        dialogInstance.current.hide();
    };
    var buttons = [
        {
            click: dlgButtonClick.bind(_this),
            buttonModel: {
                content: "OK",
                isPrimary: true,
            },
        },
    ];
    var rendereComplete = function () {
        // initialize the form validator
        addFormObj = new ej2_react_inputs_1.FormValidator("#addForm");
        deleteFormObj = new ej2_react_inputs_1.FormValidator("#deleteForm");
        document
            .getElementById("addForm")
            .addEventListener("submit", function (e) { return e.preventDefault(); });
        document
            .getElementById("deleteForm")
            .addEventListener("submit", function (e) { return e.preventDefault(); });
    };
    var onAdd = function () {
        var text = header.current.value;
        var key = dropObj.current.text;
        var index = addIndex.current.value;
        if (kanbanObj.current.columns.length >= index &&
            key &&
            key.length > 0 &&
            text &&
            text.length > 0 &&
            index !== null) {
            kanbanObj.current.addColumn({ keyField: key, headerText: text, showItemCount: true }, index);
            addIndex.current.max = kanbanObj.current.columns.length;
            deleteIndex.current.max = kanbanObj.current.columns.length - 1;
            addFormObj.reset();
            addIndex.current.value = null;
        }
        else if (!(text && text.length > 0)) {
            dialogInstance.current.content = "Enter Column Header Text";
            dialogInstance.current.show();
        }
        else if (!(key && key.length > 0)) {
            dialogInstance.current.content = "Enter Column Key Field";
            dialogInstance.current.show();
        }
        else if (!index) {
            dialogInstance.current.content = "Enter Column Index";
            dialogInstance.current.show();
        }
    };
    var onDelete = function () {
        var index = deleteIndex.current.value;
        if (kanbanObj.current.columns.length > 1) {
            if (kanbanObj.current.columns.length >= index + 1 && index !== null) {
                kanbanObj.current.deleteColumn(index);
                addIndex.current.max = kanbanObj.current.columns.length;
                deleteIndex.current.max = kanbanObj.current.columns.length - 1;
                deleteFormObj.reset();
                deleteIndex.current.value = null;
            }
            else {
                dialogInstance.current.content = "Enter Column Index";
                dialogInstance.current.show();
            }
        }
        else {
            dialogInstance.current.content =
                "Atleast one column must be displayed in kanban";
            dialogInstance.current.show();
        }
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-9 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", cssClass: "kanban-api", dataSource: data, ref: kanbanObj, cardSettings: { contentField: "Summary", headerField: "Id" } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialog", ref: dialogInstance, showCloseIcon: true, isModal: true, visible: false, width: "350px", header: "Validation", buttons: buttons }))),
        React.createElement("div", { className: "col-lg-3 property-section property-customization", id: "apiKanbanProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: "Add Column" },
                React.createElement("form", { id: "addForm" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: header, id: "text", className: "e-input", type: "text", placeholder: "Text Field" }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "key", ref: dropObj, dataSource: statusData, placeholder: "Key Field" }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: addIndex, id: "index", format: "###.##", min: 0, value: 0, max: 3, placeholder: "Index" }))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "e-check" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "add", type: "button", className: "e-btn", onClick: onAdd.bind(_this) }, "Add")))))),
                React.createElement("p", { className: "property-panel-header", style: { width: '100%', padding: '22px 0 0 0' } }, "Delete Column"),
                React.createElement("div", { className: "property-panel-content" },
                    React.createElement("form", { id: "deleteForm" },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: deleteIndex, id: "deteteIndex", format: "###.##", min: 0, value: 0, max: 2, placeholder: "Index" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { className: "e-check" },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "delete", type: "button", className: "e-btn", onClick: onDelete.bind(_this) }, "Delete"))))))))),
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
exports.default = API;
