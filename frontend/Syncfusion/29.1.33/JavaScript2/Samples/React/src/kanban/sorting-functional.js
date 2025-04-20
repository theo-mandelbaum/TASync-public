"use strict";
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
require("./sorting.css");
/**
 * Kanban Sorting sample
 */
var Sorting = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    var kanbanObj = (0, react_1.useRef)(null);
    var sortByObj = (0, react_1.useRef)(null);
    var fieldObj = (0, react_1.useRef)(null);
    var directionObj = (0, react_1.useRef)(null);
    var sortByData = [
        { Id: "DataSourceOrder", Sort: "Data Source Order" },
        { Id: "Index", Sort: "Index" },
        { Id: "Custom", Sort: "Custom" },
    ];
    var fields = { text: "Sort", value: "Id" };
    var fieldData = ["None"];
    var directionData = ["Ascending", "Descending"];
    var change = function (args) {
        if (args.value === "DataSourceOrder" || args.value === "Index") {
            var data_1 = args.value === "Index" ? "RankId" : "None";
            setFieldValue(data_1);
        }
        if (args.value === "Custom") {
            fieldObj.current.dataSource = ["Priority", "RankId", "Summary"];
            fieldObj.current.value = "Priority";
            fieldObj.current.enabled = true;
        }
        if (args.value === "Ascending") {
            var data_2 = sortByObj.current.value === "Index" ? "RankId" : "None";
            setFieldValue(data_2);
            directionObj.current.value = "Ascending";
        }
        if (args.value === "Descending") {
            var data_3 = sortByObj.current.value === "Index" ? "RankId" : "None";
            setFieldValue(data_3);
            directionObj.current.value = "Descending";
        }
    };
    var setFieldValue = function (data) {
        fieldObj.current.dataSource = [data];
        fieldObj.current.value = data;
        fieldObj.current.enabled = false;
    };
    var sortClick = function () {
        setKanbanProperties();
    };
    var clearClick = function () {
        sortByObj.current.value = "Index";
        directionObj.current.value = "Ascending";
        setFieldValue("None");
        setKanbanProperties();
    };
    var setKanbanProperties = function () {
        kanbanObj.current.sortSettings.sortBy = sortByObj.current
            .value;
        kanbanObj.current.sortSettings.field = fieldObj.current.value;
        kanbanObj.current.sortSettings.direction = directionObj.current
            .value;
    };
    var cardTemplate = function (props) {
        return (React.createElement("div", { className: "card-template " + props.Priority },
            React.createElement("div", { className: "e-card-header" },
                React.createElement("div", { className: "e-card-header-caption" },
                    React.createElement("div", { className: "e-card-header-title e-tooltip-text" }, props.Id))),
            React.createElement("div", { className: "e-card-content e-tooltip-text" },
                React.createElement("div", { className: "e-text" }, props.Summary)),
            React.createElement("div", { className: "e-card-footer" },
                React.createElement("div", { className: "e-card-footer-css e-".concat(props.Priority) }),
                React.createElement("div", { className: "e-rank" },
                    "Rank #",
                    props.RankId))));
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-9 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", ref: kanbanObj, keyField: "Status", dataSource: data, cardSettings: {
                        headerField: "Id",
                        contentField: "Summary",
                        template: cardTemplate.bind(_this),
                    } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
        React.createElement("div", { className: "col-lg-3 property-section" },
            React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Sort By")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "sortBy", ref: sortByObj, dataSource: sortByData, change: change.bind(_this), fields: fields, index: 1 }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Field")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "field", ref: fieldObj, dataSource: fieldData, enabled: false, index: 0 }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Direction")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "direction", ref: directionObj, dataSource: directionData, change: change.bind(_this), index: 0 }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "sort", className: "e-btn", onClick: sortClick.bind(_this) }, "Sort")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", className: "e-btn", onClick: clearClick.bind(_this) }, "Clear"))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the usage of sorting cards in the Kanban board. You can change the sort options in the dropdown list to reflect the card ordering on the board.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The sample is designed to showcase the sorting behavior of the Kanban board. It contains the ",
                React.createElement("code", null, "sortBy"),
                ", ",
                React.createElement("code", null, "field"),
                " and",
                " ",
                React.createElement("code", null, "direction"),
                " properties. The ",
                React.createElement("code", null, "sortBy"),
                " property provides the following options:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "DataSourceOrder"),
                    ": Cards are aligned in the ascending or descending order based on the data source order and act accordingly when the user drag-and-drop the cards. Since the feature considers the default data source order, ",
                    React.createElement("code", null, "field"),
                    " mapping is not required to sort the cards."),
                React.createElement("li", null,
                    React.createElement("code", null, "Index"),
                    ": The cards are aligned based on the index value. The index binds to the card based on the mapping field that must be an integer value. Cards will be dropped at the particular position where the user drag-and-drop the cards. The index of the cards will dynamically update its ",
                    React.createElement("code", null, "field"),
                    " value based on the dropped position."),
                React.createElement("li", null,
                    React.createElement("code", null, "Custom"),
                    ": Users can map any field to sort the cards using this option, which accepts both string and integer",
                    " ",
                    React.createElement("code", null, "field"),
                    " value. It maintains the initial mapping key-value to drag and drop the cards and does not change their mapping value after dropping the cards.")),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "direction"),
                " property is used to align the cards either in the ascending or descending order on the Kanban board."))));
};
exports.default = Sorting;
