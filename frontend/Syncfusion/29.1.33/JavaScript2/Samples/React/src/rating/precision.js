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
exports.Precision = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./precision.css");
var Precision = /** @class */ (function (_super) {
    __extends(Precision, _super);
    function Precision() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideTooltipOnScroll = function () {
            var tooltipElement = document.querySelector('.e-rating-tooltip');
            if (tooltipElement && ej2_base_1.Browser.isDevice) {
                tooltipElement.style.display = 'none';
            }
        };
        return _this;
    }
    Precision.prototype.componentDidMount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    Precision.prototype.componentWillUnmount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    Precision.prototype.render = function () {
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
    return Precision;
}(sample_base_1.SampleBase));
exports.Precision = Precision;
