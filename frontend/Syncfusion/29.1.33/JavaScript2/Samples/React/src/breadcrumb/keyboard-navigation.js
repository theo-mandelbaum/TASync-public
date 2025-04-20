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
exports.KeyboardNavigation = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./keyboard-navigation.css");
var KeyboardNavigation = /** @class */ (function (_super) {
    __extends(KeyboardNavigation, _super);
    function KeyboardNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyboardNavigation.prototype.btnClick = function () {
        this.breadcrumb.activeItem = this.breadcrumb.items[this.breadcrumb.items.length - 1].text;
    };
    KeyboardNavigation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement("h5", { style: { display: "inline-block" } }, "Simple Breadcrumb"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small reset-btn', onClick: this.btnClick.bind(this) }, "Reset State"))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { ref: function (breadcrumbObj) { _this.breadcrumb = breadcrumbObj; }, enableNavigation: false }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    " This sample demonstrates the keyboard navigation functionalities of the ",
                    React.createElement("b", null, "Breadcrumb"),
                    " component."),
                "        "),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Breadcrumb"),
                    " component can be interacted with keyboard navigation. Below key combinations can be used in Breadcrumb to initiate various actions."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Tab"),
                        " to navigate to the next item."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Shift + Tab"),
                        " to navigate to the previous item."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Enter"),
                        " to click the item.")),
                React.createElement("p", null,
                    "More information about ",
                    React.createElement("code", null, "Breadcrumb"),
                    " component keyboard navigations can be found in this ",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/" }, "documentation section"),
                    "."))));
    };
    return KeyboardNavigation;
}(sample_base_1.SampleBase));
exports.KeyboardNavigation = KeyboardNavigation;
