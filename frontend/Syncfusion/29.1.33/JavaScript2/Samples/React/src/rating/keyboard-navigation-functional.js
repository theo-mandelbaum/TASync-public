"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./keyboard-navigation.css");
var KeyboardNavigation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        var hideTooltipOnScroll = function () {
            var tooltipElement = document.querySelector('.e-rating-tooltip');
            if (tooltipElement && ej2_base_1.Browser.isDevice) {
                tooltipElement.style.display = 'none';
            }
        };
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', hideTooltipOnScroll);
        }
        return function () {
            if (rightPane) {
                rightPane.removeEventListener('scroll', hideTooltipOnScroll);
            }
        };
    }, []);
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
exports.default = KeyboardNavigation;
