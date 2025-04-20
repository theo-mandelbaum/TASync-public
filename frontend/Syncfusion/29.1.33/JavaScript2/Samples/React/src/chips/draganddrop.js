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
exports.DragAndDrop = void 0;
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./draganddrop.css");
var DragAndDrop = /** @class */ (function (_super) {
    __extends(DragAndDrop, _super);
    function DragAndDrop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragAndDrop.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { id: "chip-draganddrop-wrapper" },
                    React.createElement("div", { id: "chips", className: "chips-headers" }, "Customize your order with add-ons"),
                    React.createElement("div", { className: "sample-padding" },
                        React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "choice-container", allowDragAndDrop: true, "aria-labelledby": "choice-chips" },
                            React.createElement(ej2_react_buttons_1.ChipsDirective, null,
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Extra cheese", cssClass: "e-primary" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Spicy Level: Medium", cssClass: "e-info" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Spicy Level: Low", cssClass: "e-success" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Fast Delivery", cssClass: "e-warning" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Gift Wrapping", cssClass: "e-danger" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Eco-Friendly Packaging", cssClass: "e-primary" }))),
                        React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "selection-container", allowDragAndDrop: true, "aria-labelledby": "selection-chips" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Chips sample demonstrates the drag and drop functionality of Chips component. To drag and drop a chip element, select and drag the desired chip and drop it at the target index within the required container.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Chips"),
                    " component allows users to drag any chip and drop it on any index in a container using ",
                    React.createElement("code", null, "allowDragAndDrop"),
                    " property. Additionally, it supports dropping a chip to an external chips container."))));
    };
    return DragAndDrop;
}(sample_base_1.SampleBase));
exports.DragAndDrop = DragAndDrop;
