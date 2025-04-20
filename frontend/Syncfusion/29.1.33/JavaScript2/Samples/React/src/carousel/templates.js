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
exports.Templates = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./templates.css");
var Templates = /** @class */ (function (_super) {
    __extends(Templates, _super);
    function Templates() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Templates.prototype.itemTemplate1 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/cardinal.png", alt: "cardinal", style: { height: "100%", width: "100%" } })));
    };
    Templates.prototype.itemTemplate2 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/hunei.png", alt: "hunei", style: { height: "100%", width: "100%" } })));
    };
    Templates.prototype.itemTemplate3 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/costa-rica.png", alt: "costa-rica", style: { height: "100%", width: "100%" } })));
    };
    Templates.prototype.itemTemplate4 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/kaohsiung.png", alt: "kaohsiung", style: { height: "100%", width: "100%" } })));
    };
    Templates.prototype.itemTemplate5 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/bee-eater.png", alt: "bee-eater", style: { height: "100%", width: "100%" } })));
    };
    Templates.prototype.previousButtonTemplate = function (props) {
        return (React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn", cssClass: "e-flat e-round nav-btn", title: props.type },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 40 40", width: "40", height: "40" },
                React.createElement("path", { d: "m13.5 7.01 13 13m-13 13 13-13" }))));
    };
    Templates.prototype.nextButtonTemplate = function (props) {
        return (React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn", cssClass: "e-flat e-round nav-btn", title: props.type },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 40 40", width: "40", height: "40" },
                React.createElement("path", { d: "m13.5 7.01 13 13m-13 13 13-13" }))));
    };
    Templates.prototype.indicatorTemplate = function (props) {
        var birds = ['cardinal', 'hunei', 'costa-rica', 'kaohsiung', 'bee-eater'];
        return (React.createElement("div", { className: "indicator" },
            React.createElement("img", { src: "src/carousel/images/".concat(birds[props.index], ".png"), alt: "image", style: { height: "100%", width: "100%" } })));
    };
    Templates.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section template-carousel-section' },
                React.createElement("div", { className: 'control carousel-sample' },
                    React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "templateCarousel", animationEffect: "Fade", buttonsVisibility: "Visible", indicatorsTemplate: this.indicatorTemplate.bind(this), previousButtonTemplate: this.previousButtonTemplate.bind(this), nextButtonTemplate: this.nextButtonTemplate.bind(this) },
                        React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate1.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate2.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate3.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate4.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate5.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the customization of the ",
                    React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-carousel", target: "_blank" }, "React Carousel"),
                    " component using various templates.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null, "React Carousel"),
                    " component is customized by using the templates. The navigators are customized using ",
                    React.createElement("code", null, "previousButtonTemplate"),
                    ", and ",
                    React.createElement("code", null, "nextButtonTemplate"),
                    ". The indicators are customized using ",
                    React.createElement("code", null, "indicatorsTemplate"),
                    ". The carousel item is customized using ",
                    React.createElement("code", null, "template"),
                    " option."),
                React.createElement("p", null,
                    "More information about customizing React Carousel component can be found in this ",
                    React.createElement("a", { "aria-label": "Documentation section", target: '_blank', href: "https://ej2.syncfusion.com/documentation/carousel/getting-started" }, "documentation section"),
                    "."))));
    };
    return Templates;
}(sample_base_1.SampleBase));
exports.Templates = Templates;
