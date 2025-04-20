"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./default.css");
var Default = function () {
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
        React.createElement("div", { id: "default-rating-control" },
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Basic"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating1' })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Reset"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating2', allowReset: true, value: 3.0 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "ReadOnly"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating3', readOnly: true, value: 3.0 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Disabled"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating4', disabled: true, value: 3.0 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Single selection"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating5', enableSingleSelection: true, value: 3.0 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Item count"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating6', itemsCount: 8, value: 3.0 }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the Rating component. The component lets a user provide a star rating or view other people's ratings on a numeric scale for any service provided, such as for movies, applications, or products.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This example showcases the usage of the ",
                React.createElement("code", null, "allowReset"),
                ", ",
                React.createElement("code", null, "readOnly"),
                ", ",
                React.createElement("code", null, "enableSingleSelection"),
                ", ",
                React.createElement("code", null, "itemsCount"),
                ", and ",
                React.createElement("code", null, "disabled"),
                " properties in the Angular Rating component."))));
};
exports.default = Default;
