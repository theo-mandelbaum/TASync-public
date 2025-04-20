"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
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
                React.createElement(ej2_react_navigations_1.AccordionComponent, null,
                    React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnheader1, expanded: true, content: acrdnContent1 }),
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnheader2, content: acrdnContent2 }),
                        React.createElement(ej2_react_navigations_1.AccordionItemDirective, { header: acrdnheader3, content: acrdnContent3 }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the default functionalities of the ",
                React.createElement("code", null, "Accordion"),
                ". Click on the ",
                React.createElement("code", null, "header"),
                " element to expand/collapse the corresponding Accordion panel, and displays its content.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The Accordion is a vertically collapsible content panel which is displaying panels, one or multiple at a time within the available space. This sample illustrates the simple Accordion rendering with ",
                React.createElement("code", null, "multiple"),
                " expand mode."),
            React.createElement("p", null,
                "More information about Accordion can be found in this ",
                React.createElement("a", { "aria-label": "Accordion getting started", target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accordion/getting-started/" }, "documentation"),
                " section."))));
};
exports.default = Default;
