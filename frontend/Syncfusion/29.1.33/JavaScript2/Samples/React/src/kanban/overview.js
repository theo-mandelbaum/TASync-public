"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overview = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
require("./overview.css");
/**
 * Kanban Overview sample
 */
var Overview = /** @class */ (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.cardData, null, true);
        _this.fields = [
            { text: 'ID', key: 'Title', type: 'TextBox' },
            { key: 'Status', type: 'DropDown' },
            { key: 'Assignee', type: 'DropDown' },
            { key: 'RankId', type: 'TextBox' },
            { key: 'Summary', type: 'TextArea' }
        ];
        return _this;
    }
    Overview.prototype.cardRendered = function (args) {
        var val = args.data.Priority;
        (0, ej2_base_1.addClass)([args.element], val);
    };
    ;
    Overview.prototype.columnTemplate = function (props) {
        return (React.createElement("div", { className: "header-template-wrap" },
            React.createElement("div", { className: "header-icon e-icons " + props.keyField }),
            React.createElement("div", { className: "header-text" }, props.headerText)));
    };
    Overview.prototype.cardTemplate = function (props) {
        return (React.createElement("div", { className: "card-template" },
            React.createElement("div", { className: "e-card-header" },
                React.createElement("div", { className: "e-card-header-caption" },
                    React.createElement("div", { className: "e-card-header-title e-tooltip-text" }, props.Title))),
            React.createElement("div", { className: "e-card-content e-tooltip-text" },
                React.createElement("div", { className: "e-text" }, props.Summary)),
            React.createElement("div", { className: "e-card-custom-footer" },
                props.Tags.split(",").map(function (tag) { return React.createElement("div", { className: "e-card-tag-field e-tooltip-text", key: tag }, tag); }),
                React.createElement("div", { className: "e-card-avatar" }, this.getString(props.Assignee)))));
    };
    Overview.prototype.getString = function (assignee) {
        return assignee.match(/\b(\w)/g).join("").toUpperCase();
    };
    Overview.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", cssClass: "kanban-overview", keyField: "Status", dataSource: this.data, enableTooltip: true, swimlaneSettings: { keyField: "Assignee" }, cardSettings: { headerField: "Title", template: this.cardTemplate.bind(this), selectionType: "Multiple" }, dialogSettings: { fields: this.fields }, cardRendered: this.cardRendered.bind(this) },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", allowToggle: true, template: this.columnTemplate.bind(this) }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", allowToggle: true, template: this.columnTemplate.bind(this) }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Review", keyField: "Review", allowToggle: true, template: this.columnTemplate.bind(this) }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", allowToggle: true, template: this.columnTemplate.bind(this) }))))),
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
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
