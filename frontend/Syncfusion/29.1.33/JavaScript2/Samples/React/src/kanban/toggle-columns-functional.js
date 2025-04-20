"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Kanban Toggle Columns sample
 */
var ToggleColumns = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: data, cardSettings: { contentField: "Summary", headerField: "Id" } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", allowToggle: true }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", allowToggle: true }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing", allowToggle: true, isExpanded: false }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", allowToggle: true }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the toggle column feature of Kanban. Each column of Kanban can be collapsible, and the testing column is collapsed on page load itself.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Kanban component allows you to expand or collapse its columns to save space. The remaining columns extend its width to occupy the hided column space. This feature can be achieved by the following properties:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "allowToggle:"),
                    " Enables the expand/collapse behavior in Kanban."),
                React.createElement("li", null,
                    React.createElement("code", null, "isExpanded:"),
                    " The property determines whether the column can be collapsed on the page load itself.")))));
};
exports.default = ToggleColumns;
