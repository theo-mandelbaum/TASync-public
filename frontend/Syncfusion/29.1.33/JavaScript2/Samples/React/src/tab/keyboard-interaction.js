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
exports.KeyboardInteraction = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./tab.component.css");
var KeyboardInteraction = /** @class */ (function (_super) {
    __extends(KeyboardInteraction, _super);
    function KeyboardInteraction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyboardInteraction.prototype.componentDidMount = function () {
        document.body.addEventListener("keydown", function (e) {
            var tabElement = document.querySelector('#tab_keyboard_interaction .e-tab-header .e-toolbar-item .e-tab-wrap');
            if (e.altKey && e.keyCode === 74 && tabElement) {
                tabElement.focus();
            }
        });
    };
    KeyboardInteraction.prototype.render = function () {
        var _this = this;
        var headertext;
        // Mapping Tab items Header property
        headertext = [{ text: "HTML" }, { text: "C-Sharp(C#)" }, { text: "Java" }, { text: "VB.NET" }, { text: "Xamarin" },
            { text: "ASP.NET" }, { text: "ASP.NET MVC" }, { text: "JavaScript" }];
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section tab-control-section row' },
                React.createElement("div", { className: 'col-lg-8 control-section', id: 'tab_keyboard_interaction' },
                    React.createElement(ej2_react_navigations_1.TabComponent, { overflowMode: 'Popup', ref: function (t) { return (_this.tabObj = t); } },
                        React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[0], content: 'HyperText Markup Language, commonly referred to as HTML, is the standard markup ' +
                                    'language used to create web pages. Along with CSS, and JavaScript, HTML is a cornerstone ' +
                                    'technology, used by most websites to create visually engaging web pages, user interfaces ' +
                                    'for web applications, and user interfaces for many mobile applications. Web browsers ' +
                                    'can read HTML files and render them into visible or audible web pages. HTML describes ' +
                                    'the structure of a website semantically along with cues for presentation, making it a ' +
                                    'markup language, rather than a programming language.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[1], content: 'C# is intended to be a simple, modern, general-purpose, object-oriented ' +
                                    'programming language. Its development team is led by Anders Hejlsberg. The most recent ' +
                                    'version is C# 5.0, which was released on August 15, 2012.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[2], content: 'Java is a set of computer software and specifications developed by Sun Microsystems, ' +
                                    'later acquired by Oracle Corporation, that provides a system for developing application ' +
                                    'software and deploying it in a cross-mobile phones to platform computing environment. Java ' +
                                    'is used in a wide variety of computing platforms from embedded devices and enterprise servers ' +
                                    'and supercomputers. While less common, Java applets run in secure, sandboxed environments to ' +
                                    'provide many features of native applications and can be embedded in HTML pages.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[3], content: 'The command-line compiler, VBC.EXE, is installed as part of the freeware .NET ' +
                                    'Framework SDK. Mono also includes a command-line VB.NET compiler. The most recent version ' +
                                    'is VB 2012, which was released on August 15, 2012.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[4], content: 'Xamarin is a San Francisco, California based software company created in May ' +
                                    '2011 by the engineers that created Mono, Mono for Android and MonoTouch that are ' +
                                    'cross-platform implementations of the Common Language Infrastructure (CLI) and Common ' +
                                    'Language Specifications (often called Microsoft .NET). With a C#-shared codebase,developers ' +
                                    'can use Xamarin tools to write native Android, iOS, and Windows apps with native user interfaces ' +
                                    'and share code across multiple platforms. Xamarin has over 1 million developers in more ' +
                                    'than 120 countries around the World as of May 2015.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[5], content: 'ASP.NET is an open-source server-side web application framework designed for web ' +
                                    'development to produce dynamic web pages. It was developed by Microsoft to allow programmers ' +
                                    'to build dynamic web sites, web applications and web services. It was first released in January ' +
                                    '2002 with version 1.0 of the .NET Framework, and is the successor to Microsoft\'\s Active Server ' +
                                    'Pages (ASP) technology. ASP.NET is built on the Common Language Runtime (CLR), allowing ' +
                                    'programmers to write ASP.NET code using any supported .NET language. The ASP.NET SOAP extension ' +
                                    'framework allows ASP.NET components to process SOAP messages.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[6], content: 'The ASP.NET MVC is a web application framework developed by Microsoft, which implements' +
                                    ' the model–view–controller (MVC) pattern. It is open-source software, apart from the ASP.NET Web ' +
                                    'Forms component which is proprietary. In the later versions of ASP.NET, ASP.NET MVC, ASP.NET Web ' +
                                    'API, and ASP.NET Web Pages (a platform using only Razor pages) will merge into a unified MVC 6. ' +
                                    'The project is called ASP.NET vNext.' }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[7], content: 'JavaScript (JS) is an interpreted computer programming language. It was originally ' +
                                    'implemented as part of web browsers so that client-side scripts could interact with the ' +
                                    'user, control the browser, communicate asynchronously, and alter the document content that ' +
                                    'was displayed. More recently, however, it has become common in both game development ' +
                                    'and the creation of desktop applications.' }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This demo showcases the keyboard shortcuts applicable on ",
                    React.createElement("code", null, "Tab"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("i", null, "Below key combinations can be used in Tabs to initiate various actions."),
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
                        React.createElement("span", null, " - Moves focus to the first Tab.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "End")),
                        React.createElement("span", null, " - Moves focus to the last Tab.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Down arrow"),
                            " or ",
                            React.createElement("kbd", null, "Up arrow")),
                        React.createElement("span", null, " - When the popup is open and focused, it will move to previous/next Tab items of the popup in the vertical direction.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Left arrow")),
                        React.createElement("span", null, " - Moves focus to the previous Tab. If focus is on the first Tab, the focus will not move to any Tab.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Right arrow")),
                        React.createElement("span", null, " - Moves focus to the next Tab. If focus is on the last Tab element, the focus will not move to any Tab.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Enter"),
                            " or ",
                            React.createElement("kbd", null, "Space")),
                        React.createElement("span", null, " - Selects the Tab if it is not selected. Opens the popup dropdown icon if it is focussed. Select the Tab item as active when popup item is focussed.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Esc")),
                        React.createElement("span", null, " - Closes the popup if popup is in opened state.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Delete")),
                        React.createElement("span", null, " - Deletes the Tab, if close button is enabled in Tab header.")),
                    React.createElement("li", null,
                        React.createElement("span", { className: "key-class" },
                            React.createElement("kbd", null, "Shift + F10")),
                        React.createElement("span", null, " - If popup mode is enabled, it opens the popup when the Tab is focused."))))));
    };
    return KeyboardInteraction;
}(sample_base_1.SampleBase));
exports.KeyboardInteraction = KeyboardInteraction;
