"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Kanban StackedHeader sample
 */
var StackedHeader = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", cssClass: "kanban-overview", keyField: "Status", dataSource: data, cardSettings: { contentField: "Summary", headerField: "Id" } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Open", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Review", keyField: "Review" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Completed", keyField: "Close" })),
                    React.createElement(ej2_react_kanban_1.StackedHeadersDirective, null,
                        React.createElement(ej2_react_kanban_1.StackedHeaderDirective, { text: "To Do", keyFields: "Open" }),
                        React.createElement(ej2_react_kanban_1.StackedHeaderDirective, { text: "Development Phase", keyFields: "InProgress, Review" }),
                        React.createElement(ej2_react_kanban_1.StackedHeaderDirective, { text: "Done", keyFields: "Close" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Kanban component with the stacked header feature. In this sample, the Kanban is showcased with two headers aligned in a stacked manner.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Kanban provides an option to add an additional header along with a column header in stacked manner. This header groups the logically related columns. This can be achieved by mapping ",
                React.createElement("code", null, "text"),
                " and",
                React.createElement("code", null, "keyFields"),
                " attribute of the ",
                React.createElement("code", null, "stackedHeaders"),
                " ",
                "property."))));
};
exports.default = StackedHeader;
