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
require("./swimlane.css");
var dataSource = require("./datasource.json");
/**
 * Kanban Swimlane sample
 */
var Swimlane = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var kanbanObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    var sortData = [
        { value: "Ascending", text: "Ascending" },
        { value: "Descending", text: "Descending" },
    ];
    var value = "Ascending";
    var changeSortOrder = function (args) {
        kanbanObj.current.swimlaneSettings.sortDirection = args.itemData
            .value;
    };
    var onChange = function (args) {
        kanbanObj.current.swimlaneSettings.allowDragAndDrop = args.checked;
    };
    var changeRow = function (args) {
        kanbanObj.current.swimlaneSettings.showEmptyRow = args.checked;
    };
    var changeCount = function (args) {
        kanbanObj.current.swimlaneSettings.showItemCount = args.checked;
    };
    var changeFrozen = function (args) {
        kanbanObj.current.swimlaneSettings.enableFrozenRows = args.checked;
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", cssClass: "kanban-swimlane", ref: kanbanObj, keyField: "Status", dataSource: data, cardSettings: { contentField: "Summary", headerField: "Id" }, swimlaneSettings: { keyField: "Assignee" }, height: "500px" },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Sort Direction")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "sort", dataSource: sortData, change: changeSortOrder.bind(_this), value: value })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Enable Swimlane Drag And Drop")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: onChange.bind(_this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Show Empty Swimlane Row")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: changeRow.bind(_this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Show Swimlane Item Count")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: changeCount.bind(_this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Enable Frozen Rows")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: changeFrozen.bind(_this) }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the swimlane functionalities of Kanban component. Provided options in the property panel to sort the cards, enable drag-and-drop across swimlanes, show or hide the empty row, items count and swimlane frozen rows. Also, you can expand/collapse the swimlane row in the Kanban board.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample renders the assignee field as a swimlane header using the",
                " ",
                React.createElement("code", null, "swimlaneSettings"),
                " property. The property provides the following options to change its related settings:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Sorting the swimlane cards using the",
                    " ",
                    React.createElement("code", null, "swimlaneSettings.sortDirection"),
                    " property"),
                React.createElement("li", null,
                    "Control the drag-and-drop of the cards across swimlane using the",
                    React.createElement("code", null, "swimlaneSettings.allowDragAndDrop"),
                    " property."),
                React.createElement("li", null,
                    "Show or hide the empty swimlane row using the",
                    " ",
                    React.createElement("code", null, "swimlaneSettings.showEmptyRow"),
                    " property."),
                React.createElement("li", null,
                    "Show or hide the items count in the swimlane header using the",
                    " ",
                    React.createElement("code", null, "swimlaneSettings.showItemCount"),
                    "property."),
                React.createElement("li", null,
                    "Enable or disable the frozen swimlane rows using the",
                    " ",
                    React.createElement("code", null, "swimlaneSettings.enableFrozenRows"),
                    " property.")))));
};
exports.default = Swimlane;
