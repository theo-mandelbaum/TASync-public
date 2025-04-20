"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./draganddrop.css");
var DragAndDrop = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
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
            React.createElement("p", null, "This React Chips sample demonstrates the drag and drop functionality of Chips. To drag and drop a chip element, select and drag the desired chip and drop it at the target index within the required container.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Chips"),
                " component allows users to drag any chip and drop it on any index in a container using ",
                React.createElement("code", null, "allowDragAndDrop"),
                " property. Additionally, it supports dropping a chip to an external chips container."))));
};
exports.default = DragAndDrop;
