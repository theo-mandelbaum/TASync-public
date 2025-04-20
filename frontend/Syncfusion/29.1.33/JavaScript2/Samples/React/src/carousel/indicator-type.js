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
exports.IndicatorType = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./indicator-type.css");
var IndicatorType = /** @class */ (function (_super) {
    __extends(IndicatorType, _super);
    function IndicatorType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndicatorType.prototype.itemTemplate1 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 1"));
    };
    IndicatorType.prototype.itemTemplate2 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 2"));
    };
    IndicatorType.prototype.itemTemplate3 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 3"));
    };
    IndicatorType.prototype.itemTemplate4 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 4"));
    };
    IndicatorType.prototype.itemTemplate5 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 5"));
    };
    IndicatorType.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section indicator-type-section' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: 'col-lg-6 carousel-sample' },
                        React.createElement("h1", null, "Default Indicator"),
                        React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "indicator-type", indicatorsType: 'Default', autoPlay: false },
                            React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate1.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate2.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate3.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate4.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate5.bind(this) })))),
                    React.createElement("div", { className: 'col-lg-6 carousel-sample' },
                        React.createElement("h1", null, "Dynamic Indicator"),
                        React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "indicator-type", indicatorsType: 'Dynamic', autoPlay: false },
                            React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate1.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate2.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate3.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate4.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate5.bind(this) }))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: 'col-lg-6 carousel-sample' },
                        React.createElement("h1", null, "Fraction Indicator"),
                        React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "indicator-type", indicatorsType: 'Fraction', autoPlay: false },
                            React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate1.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate2.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate3.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate4.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate5.bind(this) })))),
                    React.createElement("div", { className: 'col-lg-6 carousel-sample' },
                        React.createElement("h1", null, "Progress Indicator"),
                        React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "indicator-type", indicatorsType: 'Progress', autoPlay: false },
                            React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate1.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate2.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate3.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate4.bind(this) }),
                                React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate5.bind(this) })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the types of indicators in the ",
                    React.createElement("a", { href: "https://www.syncfusion.com/javascript-ui-controls/js-carousel", target: "_blank" }, "React Carousel"),
                    " component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, the available types of indicators of JavaScript Carousel are showcased. They are ",
                    React.createElement("code", null, "default"),
                    ", ",
                    React.createElement("code", null, "dynamic"),
                    ", ",
                    React.createElement("code", null, "progress"),
                    " and ",
                    React.createElement("code", null, "fraction"),
                    ", and can be set using the ",
                    React.createElement("strong", null, "indicatorsType"),
                    " property. "),
                React.createElement("p", null,
                    React.createElement("code", null, "Default"),
                    " - The Carousel displays indicators with a bullet design."),
                React.createElement("p", null,
                    React.createElement("code", null, "Dynamic"),
                    " - The Carousel applies dynamic animation to the indicators."),
                React.createElement("p", null,
                    React.createElement("code", null, "Fraction"),
                    " - The Carousel displays slides numerically as indicators."),
                React.createElement("p", null,
                    React.createElement("code", null, "Progress"),
                    " - The Carousel displays indicators like a progress bar."))));
    };
    return IndicatorType;
}(sample_base_1.SampleBase));
exports.IndicatorType = IndicatorType;
