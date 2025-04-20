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
exports.Default = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideTooltipOnScroll = function () {
            var tooltipElement = document.querySelector('.e-rating-tooltip');
            if (tooltipElement && ej2_base_1.Browser.isDevice) {
                tooltipElement.style.display = 'none';
            }
        };
        return _this;
    }
    Default.prototype.componentDidMount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    Default.prototype.componentWillUnmount = function () {
        var _a;
        if (document.getElementById('right-pane')) {
            (_a = document.getElementById('right-pane')) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', this.hideTooltipOnScroll);
        }
    };
    Default.prototype.render = function () {
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
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
