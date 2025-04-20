"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
require("./overview.css");
/**
 * Kanban Overview sample
 */
var Overview = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.cardData, null, true);
    var fields = [
        { text: "ID", key: "Title", type: "TextBox" },
        { key: "Status", type: "DropDown" },
        { key: "Assignee", type: "DropDown" },
        { key: "RankId", type: "TextBox" },
        { key: "Summary", type: "TextArea" },
    ];
    var cardRendered = function (args) {
        var val = args.data
            .Priority;
        (0, ej2_base_1.addClass)([args.element], val);
    };
    var columnTemplate = function (props) {
        return (React.createElement("div", { className: "header-template-wrap" },
            React.createElement("div", { className: "header-icon e-icons " + props.keyField }),
            React.createElement("div", { className: "header-text" }, props.headerText)));
    };
    var cardTemplate = function (props) {
        return (React.createElement("div", { className: "card-template" },
            React.createElement("div", { className: "e-card-header" },
                React.createElement("div", { className: "e-card-header-caption" },
                    React.createElement("div", { className: "e-card-header-title e-tooltip-text" }, props.Title))),
            React.createElement("div", { className: "e-card-content e-tooltip-text" },
                React.createElement("div", { className: "e-text" }, props.Summary)),
            React.createElement("div", { className: "e-card-custom-footer" },
                props.Tags.split(",").map(function (tag) { return (React.createElement("div", { className: "e-card-tag-field e-tooltip-text", key: tag }, tag)); }),
                React.createElement("div", { className: "e-card-avatar" }, getString(props.Assignee)))));
    };
    var getString = function (assignee) {
        return assignee.match(/\b(\w)/g).join("").toUpperCase();
    };
    return (React.createElement("div", { className: "schedule-control-section" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", cssClass: "kanban-overview", keyField: "Status", dataSource: data, enableTooltip: true, swimlaneSettings: { keyField: "Assignee" }, cardSettings: {
                        headerField: "Title",
                        template: cardTemplate.bind(_this),
                        selectionType: "Multiple",
                    }, dialogSettings: { fields: fields }, cardRendered: cardRendered.bind(_this) },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", allowToggle: true, template: columnTemplate.bind(_this) }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", allowToggle: true, template: columnTemplate.bind(_this) }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Review", keyField: "Review", allowToggle: true, template: columnTemplate.bind(_this) }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", allowToggle: true, template: columnTemplate.bind(_this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the overview functionalities of Kanban component. Enabled most features such as templating, toggle columns, drag-and-drop, swimlane, tooltip, and more in the Kanban board.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The sample is designed by enabling the major features in Kanban. The features enabled in the samples are:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Card template"),
                React.createElement("li", null, "Header template"),
                React.createElement("li", null, "Swimlane"),
                React.createElement("li", null, "Tooltip"),
                React.createElement("li", null, "Toggle columns")))));
};
exports.default = Overview;
