"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Kanban Show / Hide Columns sample
 */
var ShowHideColumns = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    var kanbanObj = (0, react_1.useRef)(null);
    var checkObj = (0, react_1.useRef)(null);
    var progressObj = (0, react_1.useRef)(null);
    var reviewObj = (0, react_1.useRef)(null);
    var closeObj = (0, react_1.useRef)(null);
    var onChange = function (args) {
        if (args.checked) {
            kanbanObj.current.showColumn(checkObj.current.element.getAttribute("data-id"));
        }
        else {
            kanbanObj.current.hideColumn(checkObj.current.element.getAttribute("data-id"));
        }
    };
    var onChangeProgress = function (args) {
        if (args.checked) {
            kanbanObj.current.showColumn(progressObj.current.element.getAttribute("data-id"));
        }
        else {
            kanbanObj.current.hideColumn(progressObj.current.element.getAttribute("data-id"));
        }
    };
    var onChangeReview = function (args) {
        if (args.checked) {
            kanbanObj.current.showColumn(reviewObj.current.element.getAttribute("data-id"));
        }
        else {
            kanbanObj.current.hideColumn(reviewObj.current.element.getAttribute("data-id"));
        }
    };
    var onChangeClose = function (args) {
        if (args.checked) {
            kanbanObj.current.showColumn(closeObj.current.element.getAttribute("data-id"));
        }
        else {
            kanbanObj.current.hideColumn(closeObj.current.element.getAttribute("data-id"));
        }
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-9 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: data, ref: kanbanObj, cardSettings: { contentField: "Summary", headerField: "Id" } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Review", keyField: "Review" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
        React.createElement("div", { className: "col-lg-3 property-section" },
            React.createElement(property_pane_1.PropertyPane, { title: "Show / Hide Columns" },
                React.createElement("table", { id: "property", title: "Show / Hide Columns", className: "property-panel-table", style: { width: "100%" } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: "50px" } },
                            React.createElement("td", { style: { width: "100%" } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: checkObj, "data-id": "Open", checked: true, label: "To Do", change: onChange.bind(_this) }))),
                        React.createElement("tr", { style: { height: "50px" } },
                            React.createElement("td", { style: { width: "100%" } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: progressObj, "data-id": "InProgress", checked: true, label: "In Progress", change: onChangeProgress.bind(_this) }))),
                        React.createElement("tr", { style: { height: "50px" } },
                            React.createElement("td", { style: { width: "100%" } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: reviewObj, "data-id": "Review", checked: true, label: "In Review", change: onChangeReview.bind(_this) }))),
                        React.createElement("tr", { style: { height: "50px" } },
                            React.createElement("td", { style: { width: "100%" } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: closeObj, "data-id": "Close", checked: true, label: "Done", change: onChangeClose.bind(_this) }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how to control the visibility of Kanban columns dynamically. Check or uncheck the checkboxes from the property panel to show or hide the corresponding column.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Kanban provides an option to show or hide its columns dynamically using the following public methods."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "showColumn:"),
                    " Makes the corresponding column visible based on the specified ID."),
                React.createElement("li", null,
                    React.createElement("code", null, "hideColumn:"),
                    " Hides the corresponding column based on the specified column ID.")))));
};
exports.default = ShowHideColumns;
