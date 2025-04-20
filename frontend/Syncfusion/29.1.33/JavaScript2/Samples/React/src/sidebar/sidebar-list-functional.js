"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./sidebar-list.css");
var SidebarWithList = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("Before getting into any programming language, one should have basic knowledge about HTML, CSS, and JavaScript. These are the basic building blocks of web designing. HTML describes the structure of a web page whereas CSS describes the presentation of the web page."), description = _a[0], setDescription = _a[1];
    var sidebarobj = (0, react_1.useRef)(null);
    var listTemplate = function (data) {
        return (React.createElement("div", { id: "sidebarList" },
            React.createElement("span", { className: "".concat(data.pic, " e-avatar e-avatar-xsmall e-avatar-circle") }),
            React.createElement("span", { className: "text e-text-content" }, data.text)));
    };
    //Toolbar component template element specification
    var folderEle = '<div class= "e-folder"><div class= "e-folder-name">Language</div></div>';
    var ListData = [
        { id: "1", text: "JavaScript", pic: "javascript",
            description: "JavaScript (JS) is an interpreted computer programming language. " +
                "It was originally implemented as part of web browsers so that client-side scripts" +
                "could interact with the user, control the browser, communicate asynchronously, and" +
                "alter the document content that was displayed. However, it has recently" +
                "become common in both game development and the creation of desktop applications." },
        { id: "2", text: "TypeScript", pic: "typescript",
            description: "It is a typed superset of JavaScript that compiles to plain JavaScript." +
                "TypeScript is an open-source, object-oriented programing language. It contains all elements of JavaScript" +
                "It is a language designed for large-scale JavaScript application development, which can be executed on any" +
                "browser, any Host, and any Operating System. TypeScript is a language as well as a set of tools." +
                " TypeScript is the ES6 version of JavaScript with some additional features." },
        { id: "3", text: "Angular", pic: "angular",
            description: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript." +
                " Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript" +
                " libraries that you import into your applications." },
        { id: "4", text: "React", pic: "react",
            description: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces." +
                " It lets you compose complex UIs from small and isolated pieces of code called “components”." +
                " It can also render on the server using Node." },
        { id: "5", text: "Vue", pic: "vue",
            description: "A progressive framework for building user interfaces. It is incrementally adoptable." +
                " The core library is focused on the view layer only and is easy to pick up and integrate with other" +
                " libraries or existing projects. On the other hand, Vue is also perfectly capable of powering" +
                " sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries." }
    ];
    var listFields = { id: "id", text: "text" };
    var toolbarCliked = function (args) {
        if (args.item.tooltipText == "Menu") {
            sidebarobj.current.toggle();
        }
    };
    var OnSelect = function (args) {
        document.getElementById("listContent").innerHTML = args.data.description;
    };
    return (React.createElement("div", { className: "control-section", id: "sblist-wrapper" },
        React.createElement("div", { id: "sidelistwrapper" },
            React.createElement("div", null,
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "listToolbar", clicked: toolbarCliked.bind(_this) },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { template: folderEle })))),
            React.createElement("div", { className: "listmaincontent" },
                React.createElement("div", null,
                    React.createElement("div", { id: "listContent", className: "listcontent" }, description)))),
        React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "listSidebar", ref: sidebarobj, className: "sidebar-list", width: "250px", target: ".listmaincontent", type: "Auto", isOpen: true },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "listSidebarList", dataSource: ListData, cssClass: "e-template-list", template: listTemplate, fields: listFields, select: OnSelect.bind(_this) })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Sidebar"),
                " ListView sample demonstrates customizing the ",
                React.createElement("code", null, "Sidebar"),
                " with ListView. Click on the hamburger menu icon to expand/collapse the sidebar. Click the ListView item to see the corresponding item details.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Sidebar can allow to render custom components like TreeView, ListView, Menu, etc."),
            React.createElement("p", null, "In this sample, the ListView component is placed inside the Sidebar for navigation. Click the ListView item to see the corresponding item details."))));
};
exports.default = SidebarWithList;
