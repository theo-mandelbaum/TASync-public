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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanDialogFormTemplate = exports.CardTemplate = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
require("./card-template.css");
var dataSource = require("./datasource.json");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
/**
 * Kanban Card Template sample
 */
var CardTemplate = /** @class */ (function (_super) {
    __extends(CardTemplate, _super);
    function CardTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanPizzaData, null, true);
        return _this;
    }
    CardTemplate.prototype.dialogTemplate = function (props) {
        return (React.createElement(KanbanDialogFormTemplate, __assign({}, props)));
    };
    CardTemplate.prototype.render = function () {
        return (React.createElement("div", { className: "kanban-control-section" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "control-wrapper" },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { cssClass: "kanban-card-template", id: "kanban", keyField: "Category", dataSource: this.data, cardSettings: {
                            headerField: 'Id',
                            template: this.cardTemplate.bind(this),
                        }, dialogSettings: { template: this.dialogTemplate.bind(this) } },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Menu", keyField: "Menu" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Order", keyField: "Order" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Ready to Serve", keyField: "Ready to Serve" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Delivered", keyField: "Delivered" })))))));
    };
    CardTemplate.prototype.cardTemplate = function (props) {
        var src = 'src/kanban/images/' + props.ImageURL;
        return (React.createElement("div", { className: "card-template" },
            React.createElement("div", { className: "card-template-wrap" },
                React.createElement("table", { className: "card-template-wrap" },
                    React.createElement("colgroup", null,
                        React.createElement("col", { style: { width: "55px" } }),
                        React.createElement("col", null)),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "e-image" },
                                React.createElement("img", { src: src, alt: props.ImageURL })),
                            React.createElement("td", { className: "e-title" },
                                React.createElement("div", { className: "e-card-stacked" },
                                    React.createElement("div", { className: "e-card-header" },
                                        React.createElement("div", { className: "e-card-header-caption" },
                                            React.createElement("div", { className: "e-card-header-title e-tooltip-text" }, props.Title))),
                                    React.createElement("div", { className: "e-card-content", style: { lineHeight: "2.75em" } },
                                        React.createElement("table", { className: "card-template-wrap", style: { tableLayout: "auto" } },
                                            React.createElement("tbody", null,
                                                React.createElement("tr", null,
                                                    (props.Category == 'Menu' || props.Category == 'Order' || props.Category == 'Ready to Serve') && React.createElement("td", { colSpan: 2 },
                                                        props.Category == 'Menu' && React.createElement("div", { className: "e-description e-tooltip-text" }, props.Description),
                                                        props.Category != 'Menu' && React.createElement("div", { className: "e-description e-tooltip-text" }, props.OrderID)),
                                                    (props.Category == 'Delivered') && React.createElement("td", { className: "card-content" },
                                                        React.createElement("table", null,
                                                            React.createElement("tbody", null,
                                                                React.createElement("tr", null,
                                                                    React.createElement("td", { className: "e-description e-tooltip-text" }, props.OrderID),
                                                                    React.createElement("td", { className: "e-icons e-done" })),
                                                                React.createElement("tr", null,
                                                                    React.createElement("td", null,
                                                                        React.createElement("label", { className: "e-date" }, "Deliver:"),
                                                                        React.createElement("span", { className: "e-kanban-date" }, props.Date))))))),
                                                React.createElement("tr", null,
                                                    props.Category == 'Menu' && React.createElement("td", { className: "card-content" },
                                                        React.createElement("div", { className: "e-size e-tooltip-text" }, props.Size),
                                                        React.createElement("div", { className: "e-price e-tooltip-text" }, props.Price)),
                                                    props.Category != 'Menu' && React.createElement("td", { className: "card-content" },
                                                        props.Category == 'Order' && React.createElement("div", { className: "e-preparingText e-tooltip-text" }, "Preparing"),
                                                        props.Category === 'Ready to Serve' && React.createElement("div", { className: "e-readyText e-tooltip-text" }, "Ready to Serve"),
                                                        (props.Category == 'Delivered') && React.createElement("div", { className: "e-deliveredText e-tooltip-text" }, "Delivered"),
                                                        props.Category == 'Order' && React.createElement("div", { className: "e-time e-tooltip-text" },
                                                            React.createElement("div", { className: "e-icons e-clock" }),
                                                            React.createElement("div", { className: "e-mins" }, "15 mins")),
                                                        props.Category == 'Ready to Serve' && React.createElement("div", { className: "e-time e-tooltip-text" },
                                                            React.createElement("div", { className: "e-icons e-clock" }),
                                                            React.createElement("div", { className: "e-mins" }, "5 mins")))))))))))))));
    };
    return CardTemplate;
}(sample_base_1.SampleBase));
exports.CardTemplate = CardTemplate;
var KanbanDialogFormTemplate = /** @class */ (function (_super) {
    __extends(KanbanDialogFormTemplate, _super);
    function KanbanDialogFormTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.categoryData = ['Menu', 'Order', 'Ready to Serve', 'Delivered'];
        _this.state = (0, ej2_base_1.extend)({}, {}, props, true);
        return _this;
    }
    KanbanDialogFormTemplate.prototype.onChange = function (args) {
        var _a;
        var key = args.target.name;
        var value = args.target.value;
        this.setState((_a = {}, _a[key] = value, _a));
    };
    KanbanDialogFormTemplate.prototype.render = function () {
        var data = this.state;
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "ID"),
                        React.createElement("td", null,
                            React.createElement("div", { className: "e-float-input e-control-wrapper" },
                                React.createElement("input", { id: "Id", name: "Id", type: "text", className: "e-field", value: data.Id, disabled: true })))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Status"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "Category", name: "Category", dataSource: this.categoryData, className: "e-field", placeholder: "Category", value: data.Category }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Title"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "Title", name: "Title", className: "e-field", placeholder: "Title", value: data.Title }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Size"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "Size", name: "Size", className: "e-field", placeholder: "Size", value: data.Size }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Description"),
                        React.createElement("td", null,
                            React.createElement("div", { className: "e-float-input e-control-wrapper" },
                                React.createElement("textarea", { name: "Description", className: "e-field", value: data.Description, onChange: this.onChange.bind(this) })))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-label" }, "Deliver"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_calendars_1.DatePickerComponent, { id: "Date", className: "e-field", format: "MM/dd/yyyy", value: data.Date })))))));
    };
    return KanbanDialogFormTemplate;
}(React.Component));
exports.KanbanDialogFormTemplate = KanbanDialogFormTemplate;
