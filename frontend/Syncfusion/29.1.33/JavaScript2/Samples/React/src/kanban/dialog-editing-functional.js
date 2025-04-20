"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
var DialogEditing = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, true);
    var kanbanObj = (0, react_1.useRef)(null);
    var addClick = function () {
        var cardIds = kanbanObj.current.kanbanData.map(function (obj) {
            return parseInt(obj.Id.replace("Task ", ""), 10);
        });
        var cardCount = Math.max.apply(Math, cardIds) + 1;
        var cardDetails = {
            Id: "Task " + cardCount,
            Status: "Open",
            Priority: "Normal",
            Assignee: "Andrew Fuller",
            Estimate: 0,
            Tags: "",
            Summary: "",
        };
        kanbanObj.current.openDialog("Add", cardDetails);
    };
    var KanbanDialogFormTemplate = function (props) {
        var assigneeData = [
            "Nancy Davloio",
            "Andrew Fuller",
            "Janet Leverling",
            "Steven walker",
            "Robert King",
            "Margaret hamilt",
            "Michael Suyama",
        ];
        var statusData = ["Open", "InProgress", "Testing", "Close"];
        var priorityData = [
            "Low",
            "Normal",
            "Critical",
            "Release Breaker",
            "High",
        ];
        var tagsHtmlAttributes = { name: "Tags" };
        var _a = (0, react_1.useState)((0, ej2_base_1.extend)({}, {}, props, true)), state = _a[0], setState = _a[1];
        var onChange = function (args) {
            var _a;
            var key = args.target.name;
            var value = args.target.value;
            setState((_a = {}, _a[key] = value, _a));
        };
        var data = state;
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
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "Status", name: "Status", dataSource: statusData, className: "e-field", placeholder: "Status", value: data.Status }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Assignee"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "Assignee", name: "Assignee", className: "e-field", dataSource: assigneeData, placeholder: "Assignee", value: data.Assignee }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Priority"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { type: "text", name: "Priority", id: "Priority", popupHeight: "300px", className: "e-field", value: data.Priority, dataSource: priorityData, placeholder: "Priority" }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Summary"),
                        React.createElement("td", null,
                            React.createElement("div", { className: "e-float-input e-control-wrapper" },
                                React.createElement("textarea", { name: "Summary", className: "e-field", value: data.Summary, onChange: onChange.bind(_this) }))))))));
    };
    var dialogTemplate = function (props) {
        return React.createElement(KanbanDialogFormTemplate, __assign({}, props));
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-9 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement("div", { className: "kanban-section" },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", ref: kanbanObj, keyField: "Status", dataSource: data, cardSettings: { contentField: "Summary", headerField: "Id" }, dialogSettings: { template: dialogTemplate.bind(_this) } },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" })))))),
        React.createElement("div", { className: "col-lg-3 property-section" },
            React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                React.createElement("table", { id: "property", title: "Properties" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "addNew", className: "e-btn e-dialog-add", onClick: addClick.bind(_this) }, "Add New Card"))))))),
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
exports.default = DialogEditing;
