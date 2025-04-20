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
exports.HeaderTemplate = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
require("./header-template.css");
var dataSource = require("./datasource.json");
/**
 * Kanban Header Template sample
 */
var HeaderTemplate = /** @class */ (function (_super) {
    __extends(HeaderTemplate, _super);
    function HeaderTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        return _this;
    }
    HeaderTemplate.prototype.columnTemplate = function (props) {
        return (React.createElement("div", { className: "header-template-wrap" },
            React.createElement("div", { className: "header-icon e-icons " + props.keyField }),
            React.createElement("div", { className: "header-text" }, props.headerText)));
    };
    HeaderTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { cssClass: "kanban-header", id: "kanban", keyField: "Status", dataSource: this.data, cardSettings: { contentField: "Summary", headerField: "Id" } },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", template: this.columnTemplate.bind(this) }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", template: this.columnTemplate.bind(this) }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Review", keyField: "Review", template: this.columnTemplate.bind(this) }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", template: this.columnTemplate.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the header template feature of Kanban. The column headers of Kanban are customized with text + icons in this demo.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Kanban provides an option to customize its column header using the ",
                    React.createElement("code", null, "columns"),
                    " ->",
                    React.createElement("code", null, "template"),
                    " property, which accepts the string or HTML element`s ID value, which is used as the template for the header."))));
    };
    return HeaderTemplate;
}(sample_base_1.SampleBase));
exports.HeaderTemplate = HeaderTemplate;
