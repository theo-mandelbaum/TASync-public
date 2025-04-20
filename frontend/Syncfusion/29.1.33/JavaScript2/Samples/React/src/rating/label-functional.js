"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./label.css");
var Label = function () {
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
        React.createElement("div", { id: "label-rating-control" },
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Default"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating1', value: 3.0, showLabel: true })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Left"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating2', value: 3.0, showLabel: true, labelPosition: 'Left' })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Label Template"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating3', value: 3.0, showLabel: true, labelTemplate: "<span>${value} out of 5</span>" })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Top"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating4', value: 3.0, showLabel: true, labelPosition: 'Top' })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Bottom"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating5', value: 3.0, showLabel: true, labelPosition: 'Bottom' }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates label support, including label positioning and templates, in the Angular Rating component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "You can show or hide labels by setting the ",
                React.createElement("code", null, "showLabel"),
                " property. The ",
                React.createElement("code", null, "labelPosition"),
                " property provides several built-in positions and the appearance of labels can be customized using the ",
                React.createElement("code", null, "labelTemplate"),
                " property."))));
};
exports.default = Label;
