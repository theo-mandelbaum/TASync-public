"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var KeyboardInteraction = function () {
    var accObj = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        var handleKeyDown = function (e) {
            if (e.altKey && e.keyCode === 74 && accObj.current) {
                accObj.current.select(0);
            }
        };
        document.body.addEventListener('keydown', handleKeyDown);
        return function () {
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    var acrdnheader1 = function () {
        return (React.createElement("div", null, "ASP.NET"));
    };
    var acrdnheader2 = function () {
        return (React.createElement("div", null, "ASP.NET MVC"));
    };
    var acrdnheader3 = function () {
        return (React.createElement("div", null, "JavaScript"));
    };
    var acrdnContent1 = function () {
        return (React.createElement("div", null, "Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser. ASP.NET pages use a compiled,event-driven programming model that improves performance and enables the separation of application logic and user interface."));
    };
    var acrdnContent2 = function () {
        return (React.createElement("div", null, "The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications.The ASP.NET MVC framework is a lightweight, highly testable presentation framework that (as with Web Forms-based applications) is integrated with existing ASP.NET features, such as master pages and membership-based authentication."));
    };
    var acrdnContent3 = function () {
        return (React.createElement("div", null, "JavaScript (JS) is an interpreted computer programming language.It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.More recently, however, it has become common in both game development and the creation of desktop applications."));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section accordion-control-section' },
            React.createElement("div", { className: 'control Accordion-sample', style: { margin: '25px 0' } },
                React.createElement(ej2_react_navigations_1.AccordionComponent, { ref: accObj },
                    React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnheader1, expanded: true, content: acrdnContent1 }),
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnheader2, content: acrdnContent2 }),
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnheader3, content: acrdnContent3 }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This demo showcases the keyboard shortcuts applicable on ",
                React.createElement("code", null, "Accordion"),
                ".")),
        React.createElement("div", { id: "description" },
            React.createElement("i", null, "Below key combinations can be used in Accordion to initiate various actions."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "Focus"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Alt"),
                                " + ",
                                React.createElement("kbd", null, "J")),
                            React.createElement("span", null, " - Focuses on the first component of the demo.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - Focus the first Accordion header.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - Focus the last Accordion header.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - Focus the next Accordion header.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - Focus the previous Accordion header.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "Expand and Collapse"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter"),
                                " or ",
                                React.createElement("kbd", null, "Space")),
                            React.createElement("span", null, " - Expand and collapse when the focus is on the Accordion header."))))))));
};
exports.default = KeyboardInteraction;
