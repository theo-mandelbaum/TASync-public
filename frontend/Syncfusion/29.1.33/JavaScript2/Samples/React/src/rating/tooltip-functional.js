"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./tooltip.css");
var Tooltip = function () {
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
        React.createElement("div", { id: "tooltip-rating-control" },
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Default"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating1', value: 3.0 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Template"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating2', tooltipTemplate: "<span>${value} Star</span>", value: 3.0 }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the tooltip and its customization using templates in the Angular Rating component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "tooltipTemplate"),
                " property customizes the tooltip template in the Angular Rating component."))));
};
exports.default = Tooltip;
