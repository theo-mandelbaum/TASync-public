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
exports.Template = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./template.css");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideTooltipOnScroll = function () {
            var tooltipElement = document.querySelector('.e-rating-tooltip');
            if (tooltipElement && ej2_base_1.Browser.isDevice) {
                tooltipElement.style.display = 'none';
            }
        };
        return _this;
    }
    Template.prototype.componentDidMount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    Template.prototype.componentWillUnmount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    Template.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: "template-rating-control" },
                React.createElement("div", { className: "rating-content" },
                    React.createElement("label", null, "Font Icon"),
                    React.createElement("br", null),
                    React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating1', emptyTemplate: this.emptyFont, value: 3.0 })),
                React.createElement("div", { className: "rating-content custom-svg" },
                    React.createElement("label", null, "SVG Icon"),
                    React.createElement("br", null),
                    React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating2', emptyTemplate: this.emptyTemplate, fullTemplate: this.fullTemplate, enableAnimation: false, value: 3.0 })),
                React.createElement("div", { className: "rating-content" },
                    React.createElement("label", null, "Emoji Icon"),
                    React.createElement("br", null),
                    React.createElement(ej2_react_inputs_1.RatingComponent, { id: 'rating3', emptyTemplate: this.template, enableAnimation: false, enableSingleSelection: true, value: 3.0 })),
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
    Template.prototype.emptyFont = function () {
        return (React.createElement("span", { className: 'custom-font rating-icon-heart' }));
    };
    Template.prototype.emptyTemplate = function () {
        return (React.createElement("svg", { width: "35", height: "25", className: "e-rating-svg-icon" },
            React.createElement("rect", { width: "35", height: "25", fill: "transparent", strokeWidth: "2", stroke: "rgb(173,181,189)" })));
    };
    Template.prototype.fullTemplate = function (props) {
        return (React.createElement("svg", { width: "35", height: "25", className: "e-rating-svg-icon" },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "grad".concat(props.index), x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                    React.createElement("stop", { className: "start", offset: "0%" }),
                    React.createElement("stop", { className: "end", offset: "100%" }))),
            React.createElement("rect", { width: "35", height: "25", fill: "url(#grad".concat(props.index, ")"), strokeWidth: "2", stroke: "rgb(173,181,189)" })));
    };
    Template.prototype.template = function (props) {
        if (props.index == 0) {
            return (React.createElement("span", { className: 'angry emoji' }, "\uD83D\uDE21"));
        }
        else if (props.index == 1) {
            return (React.createElement("span", { className: 'disagree emoji' }, "\uD83D\uDE41"));
        }
        else if (props.index == 2) {
            return (React.createElement("span", { className: 'neutral emoji' }, "\uD83D\uDE10"));
        }
        else if (props.index == 3) {
            return (React.createElement("span", { className: 'agree emoji' }, "\uD83D\uDE42"));
        }
        else {
            return (React.createElement("span", { className: 'happy emoji' }, "\uD83D\uDE00"));
        }
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
