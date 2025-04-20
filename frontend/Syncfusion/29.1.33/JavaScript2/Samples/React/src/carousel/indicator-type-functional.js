"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./indicator-type.css");
var IndicatorType = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var itemTemplate1 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 1"));
    };
    var itemTemplate2 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 2"));
    };
    var itemTemplate3 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 3"));
    };
    var itemTemplate4 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 4"));
    };
    var itemTemplate5 = function () {
        return (React.createElement("div", { className: "e-slide" }, "Slide 5"));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section indicator-type-section' },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: 'col-lg-6 carousel-sample' },
                    React.createElement("h1", null, "Default Indicator"),
                    React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "indicator-type", indicatorsType: 'Default', autoPlay: false },
                        React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate1 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate2 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate3 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate4 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate5 })))),
                React.createElement("div", { className: 'col-lg-6 carousel-sample' },
                    React.createElement("h1", null, "Dynamic Indicator"),
                    React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "indicator-type", indicatorsType: 'Dynamic', autoPlay: false },
                        React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate1 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate2 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate3 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate4 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate5 }))))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: 'col-lg-6 carousel-sample' },
                    React.createElement("h1", null, "Fraction Indicator"),
                    React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "indicator-type", indicatorsType: 'Fraction', autoPlay: false },
                        React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate1 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate2 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate3 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate4 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate5 })))),
                React.createElement("div", { className: 'col-lg-6 carousel-sample' },
                    React.createElement("h1", null, "Progress Indicator"),
                    React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "indicator-type", indicatorsType: 'Progress', autoPlay: false },
                        React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate1 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate2 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate3 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate4 }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate5 })))))),
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
exports.default = IndicatorType;
