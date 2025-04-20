"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./templates.css");
var Templates = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var itemTemplate1 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/cardinal.png", alt: "cardinal", style: { height: "100%", width: "100%" } })));
    };
    var itemTemplate2 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/hunei.png", alt: "hunei", style: { height: "100%", width: "100%" } })));
    };
    var itemTemplate3 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/costa-rica.png", alt: "costa-rica", style: { height: "100%", width: "100%" } })));
    };
    var itemTemplate4 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/kaohsiung.png", alt: "kaohsiung", style: { height: "100%", width: "100%" } })));
    };
    var itemTemplate5 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/bee-eater.png", alt: "bee-eater", style: { height: "100%", width: "100%" } })));
    };
    var previousButtonTemplate = function (props) {
        return (React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn", cssClass: "e-flat e-round nav-btn", title: props.type },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 40 40", width: "40", height: "40" },
                React.createElement("path", { d: "m13.5 7.01 13 13m-13 13 13-13" }))));
    };
    var nextButtonTemplate = function (props) {
        return (React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn", cssClass: "e-flat e-round nav-btn", title: props.type },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 40 40", width: "40", height: "40" },
                React.createElement("path", { d: "m13.5 7.01 13 13m-13 13 13-13" }))));
    };
    var indicatorTemplate = function (props) {
        var birds = ['cardinal', 'hunei', 'costa-rica', 'kaohsiung', 'bee-eater'];
        return (React.createElement("div", { className: "indicator" },
            React.createElement("img", { src: "src/carousel/images/".concat(birds[props.index], ".png"), alt: "image", style: { height: "100%", width: "100%" } })));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section template-carousel-section' },
            React.createElement("div", { className: 'control carousel-sample' },
                React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "templateCarousel", animationEffect: "Fade", buttonsVisibility: "Visible", indicatorsTemplate: indicatorTemplate, previousButtonTemplate: previousButtonTemplate, nextButtonTemplate: nextButtonTemplate },
                    React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate1 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate2 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate3 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate4 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate5 }))))),
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
exports.default = Templates;
