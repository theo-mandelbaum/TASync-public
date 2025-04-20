"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
require("./default.css");
/**
 * Kanban Default sample
 */
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: data, cardSettings: {
                        contentField: "Summary",
                        headerField: "Id",
                        tagsField: "Tags",
                        grabberField: "Color",
                        footerCssField: "ClassName",
                    } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the default functionalities of the Kanban component. You can drag and drop the cards across multiple states of the Kanban board by default.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The sample is configured with a minimal setting that is mandatory to render Kanban layout and cards. The dataSource, columns, and cardSettings are essential fields to render the Kanban component. By default, you can drag and drop the cards across all stages of Kanban."))));
};
exports.default = Default;
