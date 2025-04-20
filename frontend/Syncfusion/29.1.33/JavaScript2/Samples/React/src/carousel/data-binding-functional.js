"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./data-binding.css");
var DataBinding = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var productDetails = [
        {
            ID: 1,
            Title: 'San Francisco',
            Content: 'San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California. Located in Northern California, San Francisco is the 17th most populous city proper in the United States, and the fourth most populous in California.',
            ImgPath: 'src/carousel/images/san-francisco.jpg',
            URL: 'https://en.wikipedia.org/wiki/San_Francisco'
        }, {
            ID: 2,
            Title: 'London',
            Content: 'London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations.',
            ImgPath: 'src/carousel/images/london.jpg',
            URL: 'https://en.wikipedia.org/wiki/London'
        }, {
            ID: 3,
            Title: 'Tokyo',
            Content: 'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.',
            ImgPath: 'src/carousel/images/tokyo.jpg',
            URL: 'https://en.wikipedia.org/wiki/Tokyo'
        }, {
            ID: 4,
            Title: 'Moscow',
            Content: 'Moscow, on the Moskva River in western Russia, is the nation’s cosmopolitan capital. In its historic core is the Kremlin, a complex that’s home to the president and tsarist treasures in the Armoury. Outside its walls is Red Square, Russia`s symbolic center.',
            ImgPath: 'src/carousel/images/moscow.jpg',
            URL: 'https://en.wikipedia.org/wiki/Moscow'
        }
    ];
    var showButtons = "Hidden";
    var productTemplate = function (props) {
        return (React.createElement("div", { className: "card" },
            React.createElement("img", { src: props.ImgPath, alt: props.Title, className: "card-img-top", style: { height: "210px", width: "100%" } }),
            React.createElement("div", { className: "card-body", style: { padding: "1rem" } },
                React.createElement("h1", { className: "card-title" }, props.Title),
                React.createElement("p", { className: "card-text" }, props.Content))));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section db-carousel-section' },
            React.createElement("div", { className: 'control carousel-sample' },
                React.createElement(ej2_react_navigations_1.CarouselComponent, { cssClass: "db-carousel", animationEffect: "Fade", dataSource: productDetails, buttonsVisibility: showButtons, itemTemplate: productTemplate }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the basic rendering of the ",
                React.createElement("a", { "aria-label": "React carousel", href: "https://www.syncfusion.com/react-ui-components/react-carousel", target: "_blank" }, "React Carousel"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, products and its details available in our Syncfusion",
                React.createElement("sup", null, "\u00AE"),
                " has been shown as slide show. The data to the React Carousel component is bound using ",
                React.createElement("code", null, "dataSource"),
                " property. Also,",
                React.createElement("code", null, "itemTemplate"),
                " is used to customize the slides of the carousel."))));
};
exports.default = DataBinding;
