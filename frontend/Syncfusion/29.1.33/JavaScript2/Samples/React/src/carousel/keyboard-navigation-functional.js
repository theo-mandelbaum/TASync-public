"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./keyboard-navigation.css");
var KeyboardNavigation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        document.body.addEventListener("keydown", function (e) {
            var carouselElement = document.querySelector(".e-carousel .e-carousel-slide-container");
            if (e.altKey && e.keyCode === 74 && carouselElement) {
                carouselElement.focus();
            }
        });
    }, []);
    var itemTemplate1 = function () {
        return (React.createElement("div", { className: "product-container" },
            React.createElement("div", { className: "col-sm-5 component-container" },
                React.createElement("div", { className: "heading" }, "San Francisco"),
                React.createElement("div", { className: "description" }, "San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California."),
                React.createElement("a", { className: "demo", href: "https://en.wikipedia.org/wiki/San_Francisco", target: "_blank" }, "READ MORE")),
            React.createElement("div", { className: "col-sm-5 image-container" },
                React.createElement("picture", null,
                    React.createElement("img", { width: "100%", height: "100%", src: "src/carousel/images/san-francisco.jpg", alt: "San Francisco" })))));
    };
    var itemTemplate2 = function () {
        return (React.createElement("div", { className: "product-container" },
            React.createElement("div", { className: "col-sm-5 component-container" },
                React.createElement("div", { className: "heading" }, "London"),
                React.createElement("div", { className: "description" }, "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic \u2018Big Ben\u2019 clock tower and Westminster Abbey, site of British monarch coronations."),
                React.createElement("a", { className: "demo", href: "https://en.wikipedia.org/wiki/London", target: "_blank" }, "READ MORE")),
            React.createElement("div", { className: "col-sm-5 image-container" },
                React.createElement("picture", null,
                    React.createElement("img", { width: "100%", height: "100%", src: "src/carousel/images/london.jpg", alt: "London" })))));
    };
    var itemTemplate3 = function () {
        return (React.createElement("div", { className: "product-container" },
            React.createElement("div", { className: "col-sm-5 component-container" },
                React.createElement("div", { className: "heading" }, "Tokyo"),
                React.createElement("div", { className: "description" }, "Tokyo, Japan\u2019s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens."),
                React.createElement("a", { className: "demo", href: "https://en.wikipedia.org/wiki/Tokyo", target: "_blank" }, "READ MORE")),
            React.createElement("div", { className: "col-sm-5 image-container" },
                React.createElement("picture", null,
                    React.createElement("img", { width: "100%", height: "100%", src: "src/carousel/images/tokyo.jpg", alt: "Tokyo" })))));
    };
    var itemTemplate4 = function () {
        return (React.createElement("div", { className: "product-container" },
            React.createElement("div", { className: "col-sm-5 component-container" },
                React.createElement("div", { className: "heading" }, "Moscow"),
                React.createElement("div", { className: "description" }, "Moscow, on the Moskva River in western Russia, is the nation\u2019s cosmopolitan capital. In its historic core is the Kremlin, a complex that\u2019s home to the president and tsarist treasures in the Armoury. Outside its walls is Red Square, Russia's symbolic center."),
                React.createElement("a", { className: "demo", href: "https://en.wikipedia.org/wiki/Moscow", target: "_blank" }, "READ MORE")),
            React.createElement("div", { className: "col-sm-5 image-container" },
                React.createElement("picture", null,
                    React.createElement("img", { width: "100%", height: "100%", src: "src/carousel/images/moscow.jpg", alt: "Moscow" })))));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section keyboard-carousel-section' },
            React.createElement("div", { className: 'control carousel-sample' },
                React.createElement(ej2_react_navigations_1.CarouselComponent, { id: 'carousel', showPlayButton: true, autoPlay: false, cssClass: "kb-carousel" },
                    React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate1 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate2 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate3 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate4 }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the keyboard navigation functionalities of the ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-carousel", target: "_blank" }, "React Carousel"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "React Carousel"),
                " component can be interacted with keyboard navigation. Below key combinations can be used in Carousel to initiate various actions."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "Alt + J"),
                    " keys to focus the carousel component (done at application end)."),
                React.createElement("li", null,
                    React.createElement("b", null, "Arrows"),
                    " keys to navigate between slides."),
                React.createElement("li", null,
                    React.createElement("b", null, "Home"),
                    " to navigate to the first slide."),
                React.createElement("li", null,
                    React.createElement("b", null, "End"),
                    " to navigate to the last slide."),
                React.createElement("li", null,
                    React.createElement("b", null, "Space"),
                    " to play/pause the slide transitions."),
                React.createElement("li", null,
                    React.createElement("b", null, "Enter"),
                    " to perform the respective action on its focus.")),
            React.createElement("p", null,
                "More information about React Carousel component keyboard navigations can be found in this",
                React.createElement("a", { "aria-label": "Documentation", target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/carousel/getting-started/" }, " documentation"),
                " section."))));
};
exports.default = KeyboardNavigation;
