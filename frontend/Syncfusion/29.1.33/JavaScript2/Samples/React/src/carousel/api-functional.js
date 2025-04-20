"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./api.css");
var API = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Visible'), showArrow = _a[0], setShowArrow = _a[1];
    var _b = (0, react_1.useState)(3000), interval = _b[0], setInterval = _b[1];
    var _c = (0, react_1.useState)(true), isAutoPlay = _c[0], setIsAutoPlay = _c[1];
    var _d = (0, react_1.useState)(true), isInfinityLoop = _d[0], setIsInfinityLoop = _d[1];
    var _e = (0, react_1.useState)(true), isShowIndicator = _e[0], setIsShowIndicator = _e[1];
    var _f = (0, react_1.useState)(true), isShowPlay = _f[0], setIsShowPlay = _f[1];
    var carouselObj;
    var itemTemplate1 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/bridge.jpg", alt: "bridge", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 1 of 5")));
    };
    var itemTemplate2 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/trees.jpg", alt: "spring_trees", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 2 of 5")));
    };
    var itemTemplate3 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/waterfall.jpg", alt: "waterfall", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 3 of 5")));
    };
    var itemTemplate4 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/sea.jpg", alt: "sea", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 4 of 5")));
    };
    var itemTemplate5 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/rocks.jpeg", alt: "rocks", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 5 of 5")));
    };
    var showArrowsData = [
        { text: 'Hidden', value: 'Hidden' },
        { text: 'Visible', value: 'Visible' },
        { text: 'On Hover', value: 'VisibleOnHover' }
    ];
    var showArrowsField = { text: 'text', value: 'value' };
    var showArrowsStateChange = function (args) {
        setShowArrow(args.value);
    };
    var intervalData = [
        { text: '3 Seconds', value: 3000 },
        { text: '5 Seconds', value: 5000 },
        { text: '7 Seconds', value: 7000 }
    ];
    var intervalField = { text: 'text', value: 'value' };
    var intervalStateChange = function (args) {
        setInterval(args.value);
    };
    var autoPlayStateChange = function (args) {
        setIsAutoPlay(args.checked);
    };
    var infiniteLoopStateChange = function (args) {
        setIsInfinityLoop(args.checked);
    };
    var showIndicatorStateChange = function (args) {
        setIsShowIndicator(args.checked);
    };
    var showPlayStateChange = function (args) {
        setIsShowPlay(args.checked);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-8 control-section api-carousel-section' },
            React.createElement("div", { className: 'control-wrapper carousel-sample' },
                React.createElement(ej2_react_navigations_1.CarouselComponent, { ref: function (carousel) { carouselObj = carousel; }, cssClass: "api-carousel", interval: interval, buttonsVisibility: showArrow, autoPlay: isAutoPlay, loop: isInfinityLoop, showIndicators: isShowIndicator, showPlayButton: isShowPlay },
                    React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate1 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate2 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate3 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate4 }),
                        React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: itemTemplate5 }))))),
        React.createElement("div", { className: 'col-lg-4 property-section api-carousel-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table' },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "Enable Autoplay"),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "autoPlay", checked: isAutoPlay, change: autoPlayStateChange })))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Infinite Looping"),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "infiniteLoop", checked: isInfinityLoop, change: infiniteLoopStateChange })))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Show Indicators"),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "showIndicator", checked: isShowIndicator, change: showIndicatorStateChange })))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Show Play Button"),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "showPlay", checked: isShowPlay, change: showPlayStateChange })))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Show Arrows"),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'showArrows', dataSource: showArrowsData, fields: showArrowsField, value: showArrow, change: showArrowsStateChange })))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Slide Interval"),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'interval', dataSource: intervalData, fields: intervalField, value: interval, change: intervalStateChange })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the properties available in the ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-carousel", target: "_blank" }, "React Carousel"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo,  you can manually change the properties of the ",
                React.createElement("code", null, "React Carousel"),
                " component like ",
                React.createElement("code", null, "autoPlay"),
                ", ",
                React.createElement("code", null, "buttonsVisibility"),
                ", ",
                React.createElement("code", null, "showIndicators"),
                ",",
                React.createElement("code", null, "interval"),
                ", ",
                React.createElement("code", null, "showPlayButton"),
                ", ",
                React.createElement("code", null, "loop"),
                " using the property panel."),
            React.createElement("p", null,
                "More information about the properties available in the Carousel component can be found in this ",
                React.createElement("a", { "aria-label": "documentation section", target: '_blank', href: "https://ej2.syncfusion.com/documentation/api/carousel/" }, "documentation section"),
                "."))));
};
exports.default = API;
