"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./card.component.css");
var Flip = function () {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isFlipped1 = _a[0], setIsFlipped1 = _a[1];
    var _b = (0, react_1.useState)("e-card e-business e-flip"), class1 = _b[0], setClass1 = _b[1];
    var _c = (0, react_1.useState)(true), isFlipped2 = _c[0], setIsFlipped2 = _c[1];
    var _d = (0, react_1.useState)("e-card e-business e-flip"), class2 = _d[0], setClass2 = _d[1];
    var flip1 = function () {
        setIsFlipped1(!isFlipped1);
        setClass1(isFlipped1 ? 'e-card e-business e-flip e-flipped' : 'e-card e-business e-flip');
    };
    var flip2 = function () {
        setIsFlipped2(!isFlipped2);
        setClass2(isFlipped2 ? 'e-card e-business e-flip e-flipped' : 'e-card e-business e-flip');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section card-control-section flip_card_layout' },
            React.createElement("div", { className: "e-card-resize-container" },
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: "row card-layout" },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: class1, id: "card_flip", onClick: flip1, title: "Click to flip the Card" },
                                React.createElement("div", { className: "e-card-header e-front" },
                                    React.createElement("div", { className: "e-card-header-caption" },
                                        React.createElement("div", { className: "e-card-header-title" }, "Mayumi Ohno"),
                                        React.createElement("div", { className: "e-card-sub-title" }, "Marketing Representative"))),
                                React.createElement("div", { className: "e-card-actions e-front" },
                                    React.createElement("button", { className: "e-card-btn" },
                                        React.createElement("div", { className: "e-email e-card-btn-txt" }, "mayum@mail.com")),
                                    React.createElement("button", { className: "e-card-btn" },
                                        React.createElement("div", { className: "e-email e-card-btn-txt" }, "011-232-221")),
                                    React.createElement("button", { className: "e-card-btn" },
                                        React.createElement("div", { className: "e-email e-card-btn-txt" }, "www.mayum.com"))),
                                React.createElement("div", { className: "e-card-header e-back" },
                                    React.createElement("div", { className: "e-card-header-caption" },
                                        React.createElement("div", { className: "e-card-header-title" }, "Address"),
                                        React.createElement("div", { className: "e-card-sub-title" },
                                            "P.O. Box 78934",
                                            React.createElement("br", null),
                                            "New Orleans",
                                            React.createElement("br", null),
                                            "Los Angeles",
                                            React.createElement("br", null),
                                            "Postal Code: 70117",
                                            React.createElement("br", null),
                                            "USA"))))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: class2, id: "card_flip_profile", onClick: flip2, title: "Click to flip the Card" },
                                React.createElement("div", { className: "e-card-header e-back" },
                                    React.createElement("div", { className: "e-card-header-caption" },
                                        React.createElement("div", { className: "e-card-header-title" }, "Address"),
                                        React.createElement("div", { className: "e-card-sub-title" },
                                            "970 Drummond Street",
                                            React.createElement("br", null),
                                            "New York",
                                            React.createElement("br", null),
                                            "New Jersey",
                                            React.createElement("br", null),
                                            "Postal Code: 07102",
                                            React.createElement("br", null),
                                            "USA"))),
                                React.createElement("div", { className: "e-card-front e-front" },
                                    React.createElement("div", { className: "e-card-header e-card-right", style: { justifyContent: 'flex-end' } },
                                        React.createElement("div", { className: "e-card-header-image" })),
                                    React.createElement("div", { className: "e-card-header e-card-right", style: { textAlign: 'right' } },
                                        React.createElement("div", { className: "e-card-header-caption" },
                                            React.createElement("div", { className: "e-card-header-title" }, "Creative One"))),
                                    React.createElement("div", { className: "e-card-header e-card-left", style: { textAlign: 'left' } },
                                        React.createElement("div", { className: "e-card-header-caption" },
                                            React.createElement("div", { className: "e-card-header-title" }, "John Doe"),
                                            React.createElement("div", { className: "e-card-sub-title" }, "Architecture"))),
                                    React.createElement("div", { className: "e-card-separator e-card-left" }),
                                    React.createElement("div", { className: "e-card-content e-card-left", style: { textAlign: 'left' } },
                                        React.createElement("table", null,
                                            React.createElement("tbody", null,
                                                React.createElement("tr", null,
                                                    React.createElement("td", null, "johndoe@mail.com")),
                                                React.createElement("tr", null,
                                                    React.createElement("td", null, "011-141-221")),
                                                React.createElement("tr", null,
                                                    React.createElement("td", null, "www.johndoe.com")))))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates to flip(rotate) the ",
                React.createElement("code", null, "card"),
                " to show hidden information which is on back side of the card by clicking or focus-out of it.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Cards in this sample have a hidden content within the DOM (Document Object Model), which is set behind the visible card. On the click action handler of front card, the back-side content is shown with a flip animation."),
            React.createElement("p", null,
                "More information about Card can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/card/getting-started/" }, "documentation"),
                " section."))));
};
exports.default = Flip;
