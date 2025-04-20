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
exports.Label = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./label.css");
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideTooltipOnScroll = function () {
            var tooltipElement = document.querySelector('.e-rating-tooltip');
            if (tooltipElement && ej2_base_1.Browser.isDevice) {
                tooltipElement.style.display = 'none';
            }
        };
        return _this;
    }
    Label.prototype.componentDidMount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    Label.prototype.componentWillUnmount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    Label.prototype.render = function () {
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
    return Label;
}(sample_base_1.SampleBase));
exports.Label = Label;
