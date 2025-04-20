"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Kanban Local Data sample
 */
var LocalData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: data, cardSettings: { contentField: "Summary", headerField: "Id" } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the way of data binding to Kanban component with JavaScript object array (local data source).")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Kanban supports binding data source to the board using the",
                " ",
                React.createElement("code", null, "dataSource"),
                " property that can be assigned with the array of JavaScript objects or instances of DataManager."),
            React.createElement("p", null, "In this demo, the array of JavaScript objects is assigned as the data source to the Kanban board."))));
};
exports.default = LocalData;
