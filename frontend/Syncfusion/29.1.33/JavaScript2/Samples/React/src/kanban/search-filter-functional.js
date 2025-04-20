"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./search-filter.css");
var dataSource = require("./datasource.json");
var property_pane_1 = require("../common/property-pane");
/**
 * Kanban Search Filter sample
 */
var SearchFilter = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    var kanbanObj = (0, react_1.useRef)(null);
    var priorityObj = (0, react_1.useRef)(null);
    var textBoxObj = (0, react_1.useRef)(null);
    var statusObj = (0, react_1.useRef)(null);
    var priorityData = ["None", "High", "Normal", "Low"];
    var statusData = [
        { id: "None", value: "None" },
        { id: "To Do", value: "Open" },
        { id: "In Progress", value: "InProgress" },
        { id: "Testing", value: "Testing" },
        { id: "Done", value: "Close" },
    ];
    var value = "None";
    var fields = { text: "id", value: "value" };
    var prioritySelect = function (args) {
        var filterQuery = new ej2_data_1.Query();
        if (args.itemData.value !== "None") {
            filterQuery = new ej2_data_1.Query().where("Priority", "equal", args.itemData.value);
        }
        statusObj.current.value = "None";
        kanbanObj.current.query = filterQuery;
    };
    var statusSelect = function (args) {
        var filterQuery = new ej2_data_1.Query();
        if (args.itemData.value !== "None") {
            filterQuery = new ej2_data_1.Query().where("Status", "equal", args.itemData.value);
        }
        priorityObj.current.value = "None";
        kanbanObj.current.query = filterQuery;
    };
    var searchClick = function (e) {
        var searchValue = e.value;
        var searchQuery = new ej2_data_1.Query();
        if (searchValue !== "") {
            searchQuery = new ej2_data_1.Query().search(searchValue, ["Id", "Summary"], "contains", true);
        }
        kanbanObj.current.query = searchQuery;
    };
    var resetClick = function () {
        textBoxObj.current.value = "";
        reset();
    };
    var onFocus = function (e) {
        if (e.target.value === "") {
            reset();
        }
    };
    var reset = function () {
        priorityObj.current.value = "None";
        statusObj.current.value = "None";
        kanbanObj.current.query = new ej2_data_1.Query();
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-9 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", ref: kanbanObj, keyField: "Status", dataSource: data, cardSettings: { contentField: "Summary", headerField: "Id" }, swimlaneSettings: { keyField: "Assignee" } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
        React.createElement("div", { className: "col-lg-3 property-section", id: "searchFilterProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: "Filtering" },
                React.createElement("table", { className: "e-filter-table" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "e-filter-label" },
                                React.createElement("div", null, "Priority")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "priority_filter", ref: priorityObj, dataSource: priorityData, select: prioritySelect.bind(_this), value: value, placeholder: "Select a priority" })))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "e-filter-label" },
                                React.createElement("div", null, "Status")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "status_filter", ref: statusObj, dataSource: statusData, select: statusSelect.bind(_this), value: value, fields: fields, placeholder: "Select a status" }))))),
                React.createElement("p", { className: "property-panel-header", style: { width: '100%', padding: '22px 0 0 0' } }, "Searching"),
                React.createElement("div", { className: "filtering property-panel-content" },
                    React.createElement("table", { className: "e-filter-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "search_text", ref: textBoxObj, showClearButton: true, placeholder: "Enter search text", onFocus: onFocus.bind(_this), input: searchClick.bind(_this) })))))),
                    React.createElement("div", { className: "e-reset-button" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "reset_filter", className: "e-btn", onClick: resetClick.bind(_this) }, "Reset"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the filtering and searching actions of Kanban. In this sample, select the key value from drop down list to display the filtered data in Kanban board. Type in search box to be searched in header/content and display the search result in a board.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Kanban provides an option to filter or search the cards and displayed on Kanban board using ",
                React.createElement("code", null, "query"),
                " property."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "In query, ",
                    React.createElement("code", null, "where"),
                    " used for filtering the Kanban cards."),
                React.createElement("li", null,
                    "In query, ",
                    React.createElement("code", null, "search"),
                    " is used for searching the cards.")))));
};
exports.default = SearchFilter;
