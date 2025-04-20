"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./card.component.css");
var Reveal = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("e-reveal-show"), class1 = _a[0], setClass1 = _a[1];
    var _b = (0, react_1.useState)("e-reveal-hide"), class2 = _b[0], setClass2 = _b[1];
    var reveal = function () {
        setClass1('e-reveal-hide');
        setClass2('e-reveal-show');
    };
    var collapse = function () {
        setClass1('e-reveal-show');
        setClass2('e-reveal-hide');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section card-control-section reveal_card_layout' },
            React.createElement("div", { className: "e-card-resize-container" },
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: "row card-layout" },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "e-card", style: { textAlign: 'center' } },
                                React.createElement("img", { className: "img-responsive", src: "./src/card/images/Tile_4.png", alt: "Force.com Succinctly" }),
                                React.createElement("div", { id: "card_revealed", style: { minHeight: '177px' }, className: class1 },
                                    React.createElement("div", { className: "e-card-content", style: { lineHeight: '2.75em' } },
                                        React.createElement("table", { style: { width: '100%', tableLayout: 'fixed' } },
                                            React.createElement("tbody", null,
                                                React.createElement("tr", null,
                                                    React.createElement("td", null,
                                                        React.createElement("div", { style: { textAlign: 'left', fontWeight: 500 } }, " Author ")),
                                                    React.createElement("td", null,
                                                        React.createElement("div", { style: { textAlign: 'left', width: '80px', whiteSpace: 'nowrap' } }, "Steve Fenton"))),
                                                React.createElement("tr", null,
                                                    React.createElement("td", null,
                                                        React.createElement("div", { style: { textAlign: 'left', fontWeight: 500 } }, "Published on")),
                                                    React.createElement("td", null,
                                                        React.createElement("div", { style: { textAlign: 'left', whiteSpace: 'nowrap' } }, "July 7, 2014"))),
                                                React.createElement("tr", null,
                                                    React.createElement("td", null,
                                                        React.createElement("div", { style: { textAlign: 'left', fontWeight: 500 } }, "Pages")),
                                                    React.createElement("td", null,
                                                        React.createElement("div", { style: { textAlign: 'left' } }, "82"))),
                                                React.createElement("tr", null,
                                                    React.createElement("td", null,
                                                        React.createElement("div", { className: "e-card-actions" },
                                                            React.createElement("button", { id: "showcarddata", className: "e-btn e-outline e-primary" }, "Know More"))),
                                                    React.createElement("td", { style: { textAlign: 'right' } },
                                                        React.createElement("div", { className: "e-card-actions" },
                                                            React.createElement("button", { className: "e-card-btn", id: "showcarddata_icon", title: "Click to see more..." },
                                                                React.createElement("span", { className: "e-btn-icon e-icons e-reveal-icon e-icon-right", style: { margin: '0px' } }))))))))),
                                React.createElement("div", { id: "card_reveal", style: { minHeight: '154px' }, className: class2 },
                                    React.createElement("div", { className: "e-card-header" },
                                        React.createElement("div", { className: "e-card-header-caption" },
                                            React.createElement("div", { className: "e-card-header-title" }, "TypeScript")),
                                        React.createElement("div", { id: "card-reveal_collapse", title: "Click to see back...", onClick: collapse },
                                            React.createElement("span", { className: "e-icons e-collapse", style: { height: '5px' } }))),
                                    React.createElement("div", { className: "e-card-content", style: { lineHeight: '1.4em' } }, "Microsoft has done extensive work to make JavaScript easier to use. Microsoft TypeScript extends many familiar features of .NET programming to JavaScript."),
                                    React.createElement("div", { className: "e-card-actions e-card-vertical" },
                                        React.createElement("a", { href: "https://www.syncfusion.com/ebooks/typescript", target: "_blank" }, " Go to Download "))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates rendering the ",
                React.createElement("code", null, "card"),
                " with reveal layouts. Hidden information of card can be revealed to see while clicking \u201CKnow more\u201D.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Cards in this sample have a hidden content within the DOM which is available behind the visible element."),
            React.createElement("p", null,
                "More information about Card can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/card/getting-started/" }, " documentation"),
                " section."))));
};
exports.default = Reveal;
