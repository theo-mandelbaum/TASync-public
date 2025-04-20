"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./partial-visible.css");
var PartialVisible = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var itemTemplate1 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/bridge.jpg", alt: "bridge", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Golden Gate Bridge, San Francisco")));
    };
    var itemTemplate2 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/trees.jpg", alt: "trees", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Spring Flower Trees")));
    };
    var itemTemplate3 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/waterfall.jpg", alt: "waterfall", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Oddadalen Waterfalls, Norway")));
    };
    var itemTemplate4 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/sea.jpg", alt: "sea", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Anse Source d`Argent, Seychelles")));
    };
    var itemTemplate5 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/rocks.jpeg", alt: "rocks", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Stonehenge, England")));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section partial-carousel-section' },
            React.createElement("div", { className: 'control carousel-sample' },
                React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "partial-carousel", partialVisible: true },
                    React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate1 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate2 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate3 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate4 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate5 }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the partial visible functionality of the ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-carousel", target: "_blank" }, "React Carousel"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "React Carousel"),
                " component shows partially visible previous/next slides by setting the",
                React.createElement("code", null, "partialVisible"),
                " property to true. By default, this property is set to ",
                React.createElement("code", null, "false"),
                "."),
            React.createElement("p", null, "See also"),
            React.createElement("p", null,
                React.createElement("a", { "aria-label": "Carousel Getting Started", target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/carousel/getting-started/" }, "React Carousel Getting Started"),
                "."))));
};
exports.default = PartialVisible;
