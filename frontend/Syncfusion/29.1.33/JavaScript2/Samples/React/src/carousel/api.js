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
exports.API = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./api.css");
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showArrowsData = [
            { text: 'Hidden', value: 'Hidden' },
            { text: 'Visible', value: 'Visible' },
            { text: 'On Hover', value: 'VisibleOnHover' }
        ];
        _this.showArrowsField = { text: 'text', value: 'value' };
        _this.intervalData = [
            { text: '3 Seconds', value: 3000 },
            { text: '5 Seconds', value: 5000 },
            { text: '7 Seconds', value: 7000 }
        ];
        _this.intervalField = { text: 'text', value: 'value' };
        return _this;
    }
    API.prototype.itemTemplate1 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/bridge.jpg", alt: "bridge", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 1 of 5")));
    };
    API.prototype.itemTemplate2 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/trees.jpg", alt: "spring_trees", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 2 of 5")));
    };
    API.prototype.itemTemplate3 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/waterfall.jpg", alt: "waterfall", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 3 of 5")));
    };
    API.prototype.itemTemplate4 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/sea.jpg", alt: "sea", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 4 of 5")));
    };
    API.prototype.itemTemplate5 = function () {
        return (React.createElement("figure", { className: "img-container" },
            React.createElement("img", { src: "src/carousel/images/rocks.jpeg", alt: "rocks", style: { height: "100%", width: "100% " } }),
            React.createElement("figcaption", { className: "img-caption" }, "Showing 5 of 5")));
    };
    API.prototype.showArrowsStateChange = function (args) {
        this.carouselObj.buttonsVisibility = args.value;
        this.carouselObj.dataBind();
    };
    API.prototype.intervalStateChange = function (args) {
        this.carouselObj.interval = args.value;
        this.carouselObj.dataBind();
    };
    API.prototype.autoPlayStateChange = function (args) {
        this.carouselObj.autoPlay = args.checked;
        this.carouselObj.dataBind();
    };
    API.prototype.infiniteLoopStateChange = function (args) {
        this.carouselObj.loop = args.checked;
        this.carouselObj.dataBind();
    };
    API.prototype.showIndicatorStateChange = function (args) {
        this.carouselObj.showIndicators = args.checked;
        this.carouselObj.dataBind();
    };
    API.prototype.showPlayStateChange = function (args) {
        this.carouselObj.showPlayButton = args.checked;
        this.carouselObj.dataBind();
    };
    API.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section api-carousel-section' },
                React.createElement("div", { className: 'control-wrapper carousel-sample' },
                    React.createElement(ej2_react_navigations_1.CarouselComponent, { ref: function (carousel) { _this.carouselObj = carousel; }, cssClass: "api-carousel", interval: 3000 },
                        React.createElement(ej2_react_navigations_1.CarouselItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate1.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate2.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate3.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate4.bind(this) }),
                            React.createElement(ej2_react_navigations_1.CarouselItemDirective, { template: this.itemTemplate5.bind(this) }))))),
            React.createElement("div", { className: 'col-lg-4 property-section api-carousel-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null, "Enable Autoplay"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "autoPlay", checked: true, change: this.autoPlayStateChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Infinite Looping"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "infiniteLoop", checked: true, change: this.infiniteLoopStateChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Show Indicators"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "showIndicator", checked: true, change: this.showIndicatorStateChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Show Play Button"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "showPlay", checked: false, change: this.showPlayStateChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Show Arrows"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'showArrows', dataSource: this.showArrowsData, fields: this.showArrowsField, value: 'Visible', change: this.showArrowsStateChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Slide Interval"),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'interval', dataSource: this.intervalData, fields: this.intervalField, value: 3000, change: this.intervalStateChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the properties available in the ",
                    React.createElement("a", { "aria-label": "React Carousel", href: "https://www.syncfusion.com/react-ui-components/react-carousel", target: "_blank" }, "React Carousel"),
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
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/documentation/api/carousel/" }, "documentation section"),
                    "."))));
    };
    return API;
}(sample_base_1.SampleBase));
exports.API = API;
