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
exports.Default = void 0;
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { id: "chip-default-wrapper" },
                    React.createElement("div", { id: "chips", className: "chips-headers" }, "Chips"),
                    React.createElement("div", { className: "sample-padding" },
                        React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "chip-default", "aria-labelledby": "chips" },
                            React.createElement(ej2_react_buttons_1.ChipsDirective, null,
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Apple", cssClass: "e-primary" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Microsoft", cssClass: "e-info" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Google", cssClass: "e-success" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Tesla", cssClass: "e-warning" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Intel", cssClass: "e-danger" })))),
                    React.createElement("div", { className: "separator" }),
                    React.createElement("div", { id: "inputChips", className: "chips-headers" }, "Input Chips"),
                    React.createElement("div", { className: "sample-padding" },
                        React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "chip-avatar", enableDelete: true, "aria-labelledby": "inputChips" },
                            React.createElement(ej2_react_buttons_1.ChipsDirective, null,
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Anne", leadingIconCss: "anne" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Janet", leadingIconCss: "janet" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Laura", leadingIconCss: "laura" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Margaret", leadingIconCss: "margaret" })))),
                    React.createElement("div", { className: "separator" }),
                    React.createElement("div", { id: "filterChips", className: "chips-headers" }, "Filter Chips"),
                    React.createElement("div", { className: "sample-padding" },
                        React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "chip-filter", selectedChips: [1, 3], selection: "Multiple", "aria-labelledby": "filterChips" },
                            React.createElement(ej2_react_buttons_1.ChipsDirective, null,
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Extra small" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Small" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Medium" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Large" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Extra large" })))),
                    React.createElement("div", { className: "separator" }),
                    React.createElement("div", { id: "choiceChips", className: "chips-headers" }, "Choice Chips"),
                    React.createElement("div", { className: "sample-padding" },
                        React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "chip-choice", selection: "Single", cssClass: "e-outline", selectedChips: [1], "aria-labelledby": "choiceChips" },
                            React.createElement(ej2_react_buttons_1.ChipsDirective, null,
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Send a text", leadingIconCss: "text" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Set a reminder", leadingIconCss: "alarm" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Read my emails", leadingIconCss: "mail" }),
                                React.createElement(ej2_react_buttons_1.ChipDirective, { text: "Play a game", leadingIconCss: "game" })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of Chips with different types and predefined styles. Click and interact the chip, to select single or multiple options from chips collection.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Chip is a small block of essential information that triggers an event on click action. It contains the text, an image, or both, mostly used in contacts, mails or filter tags."),
                React.createElement("p", null, "In this sample, default, input, filter and choice chips are demonstrated with their default functionalities."),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Input chip"),
                        "\u2013 Basic chip with delete icon, enables to remove chips from the chip list collection."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Choice chip"),
                        " \u2013 Used to choose a choice from available options."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Filter chip"),
                        " \u2013 Used to select multiple choices from available options.")))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
