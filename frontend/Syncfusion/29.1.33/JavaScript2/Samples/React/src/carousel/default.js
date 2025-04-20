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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.itemTemplate1 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/bridge.jpg", alt: "bridge", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Golden Gate Bridge, San Francisco")));
    };
    Default.prototype.itemTemplate2 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/trees.jpg", alt: "spring_trees", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Spring Flower Trees")));
    };
    Default.prototype.itemTemplate3 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/waterfall.jpg", alt: "waterfall", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Oddadalen Waterfalls, Norway")));
    };
    Default.prototype.itemTemplate4 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/sea.jpg", alt: "sea", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Anse Source d'Argent, Seychelles")));
    };
    Default.prototype.itemTemplate5 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/rocks.jpeg", alt: "rocks", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Stonehenge, England")));
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section default-carousel-section' },
                React.createElement("div", { className: 'control carousel-sample' },
                    React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "default-carousel" },
                        React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate1.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate2.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate3.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate4.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate5.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the basic rendering of the ",
                    React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-carousel", target: "_blank" }, "React Carousel"),
                    " component with items.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "React Carousel"),
                    " component is commonly used as a slideshow of images and contents. In this demo, simple slideshow of natural images has been showcased with the help of ",
                    React.createElement("code", null, "items"),
                    " property."),
                React.createElement("p", null,
                    "By default, the slide will be changed automatically with the interval of ",
                    React.createElement("b", null, "5 seconds."),
                    " You can also manually change the slide items using previous and next icons."),
                React.createElement("p", null,
                    "More information about React Carousel component can be found in this ",
                    React.createElement("a", { "aria-label": "Carousel getting started", target: '_blank', href: "https://ej2.syncfusion.com/documentation/carousel/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
