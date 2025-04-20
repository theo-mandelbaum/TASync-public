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
exports.RowTemplate = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./row-template.css");
var RowTemplate = /** @class */ (function (_super) {
    __extends(RowTemplate, _super);
    function RowTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chipTags = function (tags) {
            return (React.createElement(ej2_react_buttons_1.ChipListComponent, { chips: tags, cssClass: 'e-outline' }));
        };
        _this.template = _this.gridTemplate;
        return _this;
    }
    RowTemplate.prototype.gridTemplate = function (props) {
        var src = 'src/grid/images/pizza/' + props.ImageURL;
        return (React.createElement("tr", null,
            React.createElement("td", { className: "details" },
                React.createElement("div", { className: "e-pizza-info-container" },
                    React.createElement("div", { className: "e-pizza-image-layout" },
                        React.createElement("img", { className: "e-pizza-image", src: src, alt: props.Title })),
                    React.createElement("div", { className: "e-pizza-info-layout" },
                        React.createElement("div", { className: "e-info-text-separator" },
                            React.createElement("span", { className: "e-pizza-title" }, props.Title),
                            React.createElement("span", { className: "e-pizza-size" },
                                "(",
                                props.Size,
                                " size)")),
                        React.createElement("div", { className: "e-info-text-separator" },
                            React.createElement("span", null, props.Description)),
                        React.createElement("div", { className: "e-info-text-separator" }, this.chipTags(props.Tags)),
                        React.createElement("div", { className: "e-pizza-price-min-layout e-info-text-separator" },
                            React.createElement("span", { className: "e-pizza-price-text" }, "Buy at\u00A0"),
                            React.createElement("span", { className: "e-pizza-price" }, props.Price),
                            props.OriginalPrice ?
                                (React.createElement("span", { className: "e-pizza-original-price" }, props.OriginalPrice))
                                : '')),
                    React.createElement("div", { className: "e-flex-grow" }),
                    React.createElement("div", { className: "e-pizza-price-layout" },
                        React.createElement("div", { className: "e-info-text-separator" },
                            React.createElement("span", { className: "e-pizza-price-text" }, "Buy at")),
                        React.createElement("div", { className: "e-info-text-separator" },
                            React.createElement("span", { className: "e-pizza-price" }, props.Price)),
                        props.OriginalPrice ?
                            React.createElement("div", { className: "e-info-text-separator" },
                                React.createElement("span", { className: "e-pizza-original-price" }, props.OriginalPrice))
                            : '')))));
    };
    RowTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.pizzaData, rowTemplate: this.template.bind(this), width: 'auto', height: '335' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'PIZZA MENU', textAlign: 'Center', field: 'Title', customAttributes: { class: 'e-pizza-cell' } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The Grid utilizes the row template feature to design a custom layout for its rows. The ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#rowtemplate" }, "rowTemplate")),
                    " property can accept either a string or the ID of an HTML element, which is used as the template for each row.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "In this demo, various types of pizza are displayed along with their ingredients, additional toppings, prices, and discount offers, all presented within a custom layout in the Grid."),
                React.createElement("p", null,
                    "For more details on the row template feature, refer to this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/row/row-template" }, "documentation section"),
                    "."))));
    };
    return RowTemplate;
}(sample_base_1.SampleBase));
exports.RowTemplate = RowTemplate;
