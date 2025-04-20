"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./precision.css");
var Precision = function () {
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
        React.createElement("div", { id: "precision-rating-control" },
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Full"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating1', value: 3.0 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Half"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating2', precision: 'Half', value: 2.5 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Quarter"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating3', precision: 'Quarter', value: 2.75 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Exact"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating4', precision: 'Exact', value: 2.3 }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the different precision types supported in the Angular Rating component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "precision"),
                " property used to change the type of precision to ",
                React.createElement("code", null, "Quarter"),
                ", ",
                React.createElement("code", null, "Half"),
                ", ",
                React.createElement("code", null, "Full"),
                " and ",
                React.createElement("code", null, "Exact"),
                "."))));
};
exports.default = Precision;
