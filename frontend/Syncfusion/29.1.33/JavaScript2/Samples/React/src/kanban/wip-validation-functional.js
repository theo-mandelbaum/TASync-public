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
require("./wip-validation.css");
var property_pane_1 = require("../common/property-pane");
/**
 * Kanban WIP Validation sample
 */
var WIPValidation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    var formObject;
    var kanbanObj = (0, react_1.useRef)(null);
    var dropObj = (0, react_1.useRef)(null);
    var minimum = (0, react_1.useRef)(null);
    var maximum = (0, react_1.useRef)(null);
    var dialogInstance = (0, react_1.useRef)(null);
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
    var columnType = [
        { value: "Column", text: "Column" },
        { value: "Descending", text: "Swimlane" },
    ];
    var statusData = [
        { Id: 0, text: "To Do" },
        { Id: 1, text: "In Progress" },
        { Id: 2, text: "Done" },
    ];
    var value = "Column";
    var fields = { text: "text", value: "Id" };
    var rendereComplete = function () {
        // initialize the form validator
        formObject = new ej2_react_inputs_1.FormValidator("#column");
        document
            .getElementById("column")
            .addEventListener("submit", function (e) { return e.preventDefault(); });
    };
    var changeContraintType = function (args) {
        kanbanObj.current.constraintType = args.value;
    };
    var changeColumns = function (args) {
        var changeIndex = args.value;
        if (changeIndex !== null) {
            minimum.current.value = kanbanObj.current.columns[changeIndex].minCount;
            maximum.current.value = kanbanObj.current.columns[changeIndex].maxCount;
        }
    };
    var onFormValidate = function () {
        var colindex = dropObj.current.index;
        var colText = dropObj.current.text;
        var colmin = minimum.current.value;
        var colmax = maximum.current.value;
        if (colText === null) {
            dialogInstance.current.content = "Select column Header Text";
            dialogInstance.current.show();
        }
        else if (colText !== null &&
            minimum.current.value === null &&
            maximum.current.value === null) {
            dialogInstance.current.content = "Enter column min-count or max-count";
            dialogInstance.current.show();
        }
        else {
            kanbanObj.current.columns[colindex].headerText = colText;
            if (minimum.current.value !== null) {
                kanbanObj.current.columns[colindex].minCount = colmin;
            }
            if (maximum.current.value !== null) {
                kanbanObj.current.columns[colindex].maxCount = colmax;
            }
            formObject.reset();
        }
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-9 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: data, ref: kanbanObj, cardSettings: { contentField: "Summary", headerField: "Id" }, swimlaneSettings: { keyField: "Assignee" } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", allowToggle: true, showItemCount: true, minCount: 6, maxCount: 8 }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", allowToggle: true, showItemCount: true, minCount: 2 }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", allowToggle: true, showItemCount: true, maxCount: 4 }))),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialog", ref: dialogInstance, showCloseIcon: true, isModal: true, visible: false, width: "350px", header: "Validation", buttons: buttons }))),
        React.createElement("div", { className: "col-lg-3 property-section property-customization", id: "wipValidationProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: "Constraint" },
                React.createElement("table", { className: "e-constraint-table" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "e-constraint-label" },
                                React.createElement("div", null, "Type")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "type", dataSource: columnType, change: changeContraintType.bind(_this), value: value })))))),
                React.createElement("p", { className: "property-panel-header", style: { width: '100%', padding: '22px 0 0 0' } }, "Validate Constraints"),
                React.createElement("div", { className: "property-panel-content" },
                    React.createElement("form", { id: "column" },
                        React.createElement("table", { className: "e-constraint-table" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { className: "e-constraint-label" },
                                        React.createElement("div", null, "Columns")),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "key", ref: dropObj, dataSource: statusData, change: changeColumns.bind(_this), fields: fields, placeholder: "Header Text " }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { className: "e-constraint-label" },
                                        React.createElement("div", null, "MinCount")),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: minimum, id: "minIndex", format: "###.##", min: 0, placeholder: "Minimum Count" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { className: "e-constraint-label" },
                                        React.createElement("div", null, "MaxCount")),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: maximum, id: "maxIndex", format: "###.##", min: 0, placeholder: "Maximum Count" }))))),
                        React.createElement("div", { className: "e-validate" },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "validate", className: "e-btn", onClick: onFormValidate.bind(_this) }, "Validate")))))),
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
exports.default = WIPValidation;
