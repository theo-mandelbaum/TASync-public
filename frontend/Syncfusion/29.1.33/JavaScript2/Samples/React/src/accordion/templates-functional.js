"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./accordion.component.css");
var Templates = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var sensorContent = function () {
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, "Proximity sensor"),
                        React.createElement("td", null, "Yes")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Face ID"),
                        React.createElement("td", null, "Yes")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Accelerometer"),
                        React.createElement("td", null, "Yes"))))));
    };
    var cameraContent = function () {
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", { rowSpan: 3 }, "Camera"),
                        React.createElement("td", null, " 12MP wide-angle")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Live Photos with stabilization")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Body and face detection")),
                    React.createElement("tr", null,
                        React.createElement("th", { rowSpan: 4 }, "TrueDepth Camera"),
                        React.createElement("td", null, " 7MP camera")),
                    React.createElement("tr", null,
                        React.createElement("td", null, " Animoji")),
                    React.createElement("tr", null,
                        React.createElement("td", null, " Face detection"))))));
    };
    var videoRecordContent = function () {
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", { rowSpan: 6 }, "Video Recording"),
                        React.createElement("td", null, "4K video recording")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "1080p & 720p HD video recording")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Optical zoom, 6x digital zoom")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Slow motion video support")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Take 8MP still photos while recording 4K video")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Noise reduction"))))));
    };
    var nestedAccordion = function () {
        return (React.createElement("div", null,
            React.createElement(ej2_react_navigations_1.AccordionComponent, { expandMode: "Single" },
                React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null,
                    React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: "Sensor", content: sensorContent }),
                    React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: "Camera", content: cameraContent }),
                    React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: "Video Recording", content: videoRecordContent })))));
    };
    var networkHeader = function () {
        return React.createElement("div", null, "Network & Connectivity");
    };
    var featureheader = function () {
        return React.createElement("div", null, "Feature");
    };
    var hardwareheader = function () {
        return React.createElement("div", null, "Hardware & Software");
    };
    var hardwareContent = function () {
        return (React.createElement("div", { id: "Hard_Soft_features" },
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", { rowSpan: 3 }, " Hardware"),
                        React.createElement("td", { rowSpan: 2 }, "Chip"),
                        React.createElement("td", null, "Apple A11 Bionic chip with 64-bit architecture")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Embedded M11 motion coprocessor")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Capacity"),
                        React.createElement("td", null, "64GB/256GB")),
                    React.createElement("tr", null,
                        React.createElement("th", null, " Software"),
                        React.createElement("td", null, "Operating System"),
                        React.createElement("td", null, "iOS 11"))))));
    };
    var networkContent = function () {
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", { rowSpan: 2 }, "CELLULAR"),
                        React.createElement("td", null, "Technology"),
                        React.createElement("td", null, "GSM / CDMA / HSPA / EV-DO / LTE")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Edge"),
                        React.createElement("td", null, "Yes")),
                    React.createElement("tr", null,
                        React.createElement("th", { rowSpan: 3 }, "WIRELESS"),
                        React.createElement("td", null, "Wi-Fi"),
                        React.createElement("td", null, "Yes (802.11 a/b/g/n/ac)")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Bluetooth"),
                        React.createElement("td", null, "Yes (v 5.0)")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "NFC"),
                        React.createElement("td", null, "Yes"))))));
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section accordion-control-section" },
            React.createElement("div", { className: "product_title" }, " iPhone X Product Specification "),
            React.createElement(ej2_react_navigations_1.AccordionComponent, { expandMode: "Single" },
                React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null,
                    React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: networkHeader, content: networkContent, expanded: true }),
                    React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: featureheader, content: nestedAccordion }),
                    React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: hardwareheader, content: hardwareContent })))),
        React.createElement("div", { id: "source_link" },
            "Source: \u00A0",
            React.createElement("a", { href: "https://www.apple.com/iphone-x/specs/", target: "_blank" }, "www.apple.com/iphone-x/specs/")),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the template functionalities of the ",
                React.createElement("code", null, "Accordion"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample illustrates to load an Accordion content using ",
                React.createElement("code", null, "content"),
                " property. In second panel Feature, another Accordion component is nested as the content of the main Accordion component."),
            React.createElement("p", null,
                "More information about Accordion can be found in this",
                " ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accordion/getting-started/" }, "documentation"),
                " ",
                "section."))));
};
exports.default = Templates;
