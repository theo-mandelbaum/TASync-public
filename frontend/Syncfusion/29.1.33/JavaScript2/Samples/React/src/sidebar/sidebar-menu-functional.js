"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_navigations_2 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./sidebar-menu.css");
var SidebarWithMenu = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var sidebarobj = (0, react_1.useRef)(null);
    var menuItems = [
        {
            text: 'Overview',
            iconCss: 'icon-user icon',
            items: [
                { text: 'All Data' },
                { text: 'Category2' },
                { text: 'Category3' }
            ]
        },
        {
            text: 'Notification',
            iconCss: 'icon-bell-alt icon',
            items: [
                { text: 'Change Profile' },
                { text: 'Add Name' },
                { text: 'Add Details' }
            ]
        },
        {
            text: 'Info',
            iconCss: 'icon-tag icon',
            items: [
                { text: 'Message' },
                { text: 'Facebook' },
                { text: 'Twitter' }
            ]
        },
        {
            text: 'Comments',
            iconCss: 'icon-comment-inv-alt2 icon',
            items: [
                { text: 'Category1' },
                { text: 'Category2' },
                { text: 'Category3' }
            ]
        },
        {
            text: 'Bookmarks',
            iconCss: 'icon-bookmark icon',
            items: [
                { text: 'All Comments' },
                { text: 'Add Comments' },
                { text: 'Delete Comments' }
            ]
        },
        {
            text: 'Images',
            iconCss: 'icon-picture icon',
            items: [
                { text: 'Add Name' },
                { text: 'Add Mobile Number' }
            ]
        },
        {
            text: 'Users ',
            iconCss: 'icon-user icon',
            items: [
                { text: 'Mobile User' },
                { text: 'Laptop User' },
                { text: 'Desktop User' }
            ]
        },
        {
            text: 'Settings',
            iconCss: 'icon-eye icon',
            items: [
                { text: 'Change Profile' },
                { text: 'Add Name' },
                { text: 'Add Details' }
            ]
        }
    ];
    var enableDock = true;
    var dockSize = '50px';
    var width = '220px';
    var target = '.main-menu-content';
    var folderEle = '<div class= "e-folder"><div class= "e-folder-name">Navigation Pane</div></div>';
    var toolbarCliked = function (args) {
        if (args.item.tooltipText == "Menu") {
            sidebarobj.current.toggle();
        }
    };
    return (React.createElement("div", { id: "menu-wrapper", className: "control-section" },
        React.createElement("div", { id: "sidebarmenu" },
            React.createElement("div", null,
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "menuToolbar", clicked: toolbarCliked.bind(_this) },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "icon-menu", tooltipText: "Menu" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { template: folderEle })))),
            React.createElement("div", { className: "main-menu-content", id: "maintext" },
                React.createElement("div", { className: "menu-content" },
                    React.createElement("div", { className: "sidebar-heading" }, "Responsive Sidebar with Menu"),
                    React.createElement("p", { className: "paragraph-content" }, "The React Sidebar is an expandable and collapsible component that typically acts as a side container to place primary or secondary content alongside the main content. It provides flexible options that can be shown and hidden based on user interactions. Any type of HTML content or component can be placed in the React Sidebar for quick access and easy navigation, like quick references, menus, lists, and tree views."),
                    React.createElement("div", { className: "sidebar-heading" }, "HTML side content position"),
                    React.createElement("p", { className: "paragraph-content" }, "The React Sidebar component positions its content to the left or right side of the main content area. This option allows the placement of two sidebars on a page, one on the left and one on the right, to show primary and secondary content simultaneously."),
                    React.createElement("div", { className: "sidebar-heading" }, "Responsive sidebar"),
                    React.createElement("p", { className: "paragraph-content" }, "Auto closing the React Sidebar component\u2019s content, makes the main content area more readable."))),
            React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "menuSidebar", className: "sidebar-menu", ref: sidebarobj, enableDock: enableDock, dockSize: dockSize, width: width, target: target, isOpen: true, type: "Auto" },
                React.createElement("div", { className: "main-menu" },
                    React.createElement("div", null,
                        React.createElement(ej2_react_navigations_2.MenuComponent, { id: "dockMenu", items: menuItems, orientation: 'Vertical', cssClass: 'dock-menu' }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Sidebar"),
                " Menu sample demonstrates customizing the Sidebar with Menu. Click on the hamburger menu icon to expand/collapse the sidebar. Hover the Menu item to see the corresponding child menu items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Sidebar"),
                " can allow to render custom components like TreeView, ListView, Menu, etc."),
            React.createElement("p", null, "In this sample, the Menu component is placed inside the Sidebar. Hover the Menu item to see the corresponding child menu items."))));
};
exports.default = SidebarWithMenu;
