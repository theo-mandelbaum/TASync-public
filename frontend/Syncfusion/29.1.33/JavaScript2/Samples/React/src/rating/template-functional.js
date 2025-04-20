"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./template.css");
var Template = function () {
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
    var emptyFont = function () {
        return (React.createElement(react_1.Fragment, null,
            React.createElement("span", { className: 'custom-font rating-icon-heart' })));
    };
    var fullFont = function () {
        return (React.createElement(react_1.Fragment, null,
            React.createElement("span", { className: 'custom-font rating-icon-heart' })));
    };
    var emptyTemplate = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("svg", { width: "35", height: "25", className: "e-rating-svg-icon" },
                React.createElement("rect", { width: "35", height: "25", fill: "transparent", strokeWidth: "2", stroke: "rgb(173,181,189)" }))));
    };
    var fullTemplate = function (props) {
        return (React.createElement("svg", { width: "35", height: "25", className: "e-rating-svg-icon" },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "grad".concat(props.index), x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                    React.createElement("stop", { className: "start", offset: "0%" }),
                    React.createElement("stop", { className: "end", offset: "100%" }))),
            React.createElement("rect", { width: "35", height: "25", fill: "url(#grad".concat(props.index, ")"), strokeWidth: "2", stroke: "rgb(173,181,189)" })));
    };
    var template = function (props) {
        if (props.index === 0) {
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { className: 'angry emoji' }, "\uD83D\uDE21")));
        }
        else if (props.index === 1) {
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { className: 'disagree emoji' }, "\uD83D\uDE41")));
        }
        else if (props.index === 2) {
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { className: 'neutral emoji' }, "\uD83D\uDE10")));
        }
        else if (props.index === 3) {
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { className: 'agree emoji' }, "\uD83D\uDE42")));
        }
        else {
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { className: 'happy emoji' }, "\uD83D\uDE00")));
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { id: "template-rating-control" },
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Font Icon"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating1', emptyTemplate: emptyFont, fullTemplate: fullFont, value: 3.0 })),
            React.createElement("div", { className: "rating-content custom-svg" },
                React.createElement("label", null, "SVG Icon"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating2', emptyTemplate: emptyTemplate, fullTemplate: fullTemplate, enableAnimation: false, value: 3.0 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Emoji Icon"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating3', emptyTemplate: template, enableAnimation: false, enableSingleSelection: true, value: 3.0 })),
            React.createElement("div", { className: "rating-content" },
                React.createElement("label", null, "Customization"),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating4', cssClass: 'custom-icon', enableAnimation: false, value: 3.0 }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates customization of rating items using templates in the Angular Rating component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, rating item stars are customized using ",
                React.createElement("code", null, "emptyTemplate"),
                ", which defines the unrated items appearance, and ",
                React.createElement("code", null, "fullTemplate"),
                ", which defines the rated items appearance."))));
};
exports.default = Template;
