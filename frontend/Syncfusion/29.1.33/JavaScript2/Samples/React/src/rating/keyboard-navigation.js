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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./keyboard-navigation.css");
var KeyboardNavigation = /** @class */ (function (_super) {
    __extends(KeyboardNavigation, _super);
    function KeyboardNavigation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideTooltipOnScroll = function () {
            var tooltipElement = document.querySelector('.e-rating-tooltip');
            if (tooltipElement && ej2_base_1.Browser.isDevice) {
                tooltipElement.style.display = 'none';
            }
        };
        return _this;
    }
    KeyboardNavigation.prototype.componentDidMount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    KeyboardNavigation.prototype.componentWillUnmount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    KeyboardNavigation.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: "nav-rating-control" },
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating1', allowReset: true, value: 3.0 })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo showcases the keyboard shortcuts applicable in the Rating component.")),
            React.createElement("div", { id: "description" },
                React.createElement("i", null, "The below key combinations can be used in Rating to perform various actions. "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Tab")),
                        React.createElement("span", null, " - Focus.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Left Arrow")),
                        React.createElement("span", null, " - Increase in RTL and decrease in LTR.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Right Arrow")),
                        React.createElement("span", null, " - Decrease in RTL and increase in LTR.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Down arrow")),
                        React.createElement("span", null, " - Decreases the value.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Up arrow")),
                        React.createElement("span", null, " - Increases the value."))))));
    };
    return KeyboardNavigation;
}(sample_base_1.SampleBase));
exports.KeyboardNavigation = KeyboardNavigation;
