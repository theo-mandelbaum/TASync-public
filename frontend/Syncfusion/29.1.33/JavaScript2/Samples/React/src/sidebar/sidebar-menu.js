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
exports.SidebarWithMenu = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_navigations_2 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./sidebar-menu.css");
var SidebarWithMenu = /** @class */ (function (_super) {
    __extends(SidebarWithMenu, _super);
    function SidebarWithMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.menuItems = [
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
        _this.enableDock = true;
        _this.dockSize = '50px';
        _this.width = '220px';
        _this.target = '.main-menu-content';
        return _this;
    }
    SidebarWithMenu.prototype.render = function () {
        var _this = this;
        var folderEle = '<div class= "e-folder"><div class= "e-folder-name">Navigation Pane</div></div>';
        return (React.createElement("div", { id: "menu-wrapper", className: "control-section" },
            React.createElement("div", { id: "sidebarmenu" },
                React.createElement("div", null,
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "menuToolbar", clicked: this.toolbarCliked.bind(this) },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "icon-menu", tooltipText: "Menu" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: folderEle })))),
                React.createElement("div", { className: "main-menu-content", id: "maintext" },
                    React.createElement("div", { className: "menu-content" },
                        React.createElement("div", { className: "sidebar-heading" }, " Responsive Sidebar with Menu"),
                        React.createElement("p", { className: "paragraph-content" }, "The React Sidebar is an expandable and collapsible component that typically acts as a side container to place primary or secondary content alongside the main content. It provides flexible options that can be shown and hidden based on user interactions. Any type of HTML content or component can be placed in the React Sidebar for quick access and easy navigation, like quick references, menus, lists, and tree views."),
                        React.createElement("div", { className: "sidebar-heading" }, " HTML side content position"),
                        React.createElement("p", { className: "paragraph-content" }, "The React Sidebar component positions its content to the left or right side of the main content area. This option allows the placement of two sidebars on a page, one on the left and one on the right, to show primary and secondary content simultaneously."),
                        React.createElement("div", { className: "sidebar-heading" }, " Responsive sidebar"),
                        React.createElement("p", { className: "paragraph-content" }, "Auto closing the React Sidebar component\u2019s content, makes the main content area more readable."))),
                React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "menuSidebar", className: "sidebar-menu", ref: function (Sidebar) { return _this.sidebarobj = Sidebar; }, enableDock: this.enableDock, dockSize: this.dockSize, width: this.width, target: this.target, isOpen: true, type: "Auto" },
                    React.createElement("div", { className: "main-menu" },
                        React.createElement("div", null,
                            React.createElement(ej2_react_navigations_2.MenuComponent, { id: "dockMenu", items: this.menuItems, orientation: 'Vertical', cssClass: 'dock-menu' }))))),
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
    SidebarWithMenu.prototype.toolbarCliked = function (args) {
        if (args.item.tooltipText == "Menu") {
            this.sidebarobj.toggle();
        }
    };
    return SidebarWithMenu;
}(sample_base_1.SampleBase));
exports.SidebarWithMenu = SidebarWithMenu;
