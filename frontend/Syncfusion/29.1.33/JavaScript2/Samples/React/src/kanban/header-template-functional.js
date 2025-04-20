"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
require("./header-template.css");
var dataSource = require("./datasource.json");
/**
 * Kanban Header Template sample
 */
var HeaderTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    var columnTemplate = function (props) {
        return (React.createElement("div", { className: "header-template-wrap" },
            React.createElement("div", { className: "header-icon e-icons " + props.keyField }),
            React.createElement("div", { className: "header-text" }, props.headerText)));
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { cssClass: "kanban-header", id: "kanban", keyField: "Status", dataSource: data, cardSettings: { contentField: "Summary", headerField: "Id" } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", template: columnTemplate.bind(_this) }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", template: columnTemplate.bind(_this) }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Review", keyField: "Review", template: columnTemplate.bind(_this) }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", template: columnTemplate.bind(_this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the header template feature of Kanban. The column headers of Kanban are customized with text + icons in this demo.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Kanban provides an option to customize its column header using the",
                " ",
                React.createElement("code", null, "columns"),
                " ->",
                React.createElement("code", null, "template"),
                " property, which accepts the string or HTML element`s ID value, which is used as the template for the header."))));
};
exports.default = HeaderTemplate;
