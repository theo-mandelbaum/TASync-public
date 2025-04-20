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
exports.TooltipTemplate = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
require("./tooltip-template.css");
var dataSource = require("./datasource.json");
/**
 * Kanban Tooltip Template sample
 */
var TooltipTemplate = /** @class */ (function (_super) {
    __extends(TooltipTemplate, _super);
    function TooltipTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        return _this;
    }
    TooltipTemplate.prototype.template = function (props) {
        return (React.createElement("div", { className: "e-kanbantooltiptemp" },
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-kanban-card-details" },
                            React.createElement("table", null,
                                React.createElement("colgroup", null,
                                    React.createElement("col", { style: { width: "30%" } }),
                                    React.createElement("col", { style: { width: "70%" } })),
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", { className: "CardHeader" }, "Assignee:"),
                                        React.createElement("td", null, props.Assignee)),
                                    React.createElement("tr", null,
                                        React.createElement("td", { className: "CardHeader" }, "Type:"),
                                        React.createElement("td", null, props.Type)),
                                    React.createElement("tr", null,
                                        React.createElement("td", { className: "CardHeader" }, "Estimate:"),
                                        React.createElement("td", null, props.Estimate)),
                                    React.createElement("tr", null,
                                        React.createElement("td", { className: "CardHeader" }, "Summary:"),
                                        React.createElement("td", null, props.Summary))))))))));
    };
    TooltipTemplate.prototype.onToolTipChange = function (args) {
        this.kanbanObj.enableTooltip = args.checked;
    };
    TooltipTemplate.prototype.onToolTipTemplateChange = function (args) {
        this.kanbanObj.tooltipTemplate = args.checked ? this.template : null;
    };
    TooltipTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", cssClass: "kanban-tooltip", keyField: "Status", dataSource: this.data, ref: function (kanban) { _this.kanbanObj = kanban; }, cardSettings: { contentField: "Summary", headerField: "Id" }, enableTooltip: true, tooltipTemplate: this.template.bind(this) },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '90%' } },
                                    React.createElement("div", { className: 'enableTooltip' },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Enable Tooltip', change: this.onToolTipChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '90%' } },
                                    React.createElement("div", { className: 'enableTooltipTemplate' },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Enable Tooltip Template', change: this.onToolTipTemplateChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to customize the tooltip messages in Kanban cards. You can enable or disable the tooltip and its template.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Kanban provides an option to show default tooltip and templated tooltip using the ",
                    React.createElement("code", null, "enableTooltip"),
                    "and ",
                    React.createElement("code", null, "tooltipTemplate"),
                    " properties."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "enableTooltip:"),
                        " If you set this property to true, the cards show a tooltip with default format."),
                    React.createElement("li", null,
                        React.createElement("code", null, "tooltipTemplate:"),
                        " If you set ",
                        React.createElement("code", null, "enableTooltip"),
                        " property to true and configured the tooltipTemplate, the cards show a tooltip with templated content.")))));
    };
    return TooltipTemplate;
}(sample_base_1.SampleBase));
exports.TooltipTemplate = TooltipTemplate;
