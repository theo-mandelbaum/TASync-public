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
exports.AddressBar = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_navigations_2 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./address-bar.css");
var AddressBar = /** @class */ (function (_super) {
    __extends(AddressBar, _super);
    function AddressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.breadcrumbItems = [
            {
                iconCss: 'e-bicons e-picture'
            },
            {
                text: 'This PC'
            },
            {
                text: 'Local Disk (C:)'
            },
            {
                text: 'Users'
            },
            {
                text: 'Admin'
            },
            {
                text: 'Pictures'
            }
        ];
        _this.initialBreadcrumbItems = [].slice.call(_this.breadcrumbItems);
        _this.items = [
            {
                text: 'OneDrive', type: 'onedrive',
                items: [
                    { text: 'Documents', type: 'folder' },
                    { text: 'Email attachments', type: 'folder' },
                    { text: 'Music', type: 'folder' },
                    { text: 'Pictures', type: 'folder' }
                ]
            },
            {
                text: 'This PC', type: 'desktop',
                items: [
                    { text: 'Desktop', type: 'desktop' },
                    {
                        text: 'Documents', type: 'documents', items: [
                            {
                                text: 'IISExpress', type: 'folder', items: [
                                    { text: 'config', type: 'folder' }
                                ]
                            },
                            {
                                text: 'Visual Studio 2019', type: 'folder', items: [
                                    { text: 'Code Snippets', type: 'folder' },
                                    { text: 'Templates', type: 'folder' },
                                    { text: 'Visualizers', type: 'folder' }
                                ]
                            }
                        ]
                    },
                    { text: 'Downloads', type: 'downloads' },
                    {
                        text: 'Local Disk (C:)', type: 'folder', items: [
                            {
                                text: 'Microsoft', type: 'folder'
                            },
                            {
                                text: 'Program Files', type: 'folder', items: [
                                    {
                                        text: 'Git', type: 'folder', items: [
                                            { text: 'bin', type: 'folder' },
                                            { text: 'cmd', type: 'folder' },
                                            { text: 'dev', type: 'folder' }
                                        ]
                                    },
                                    {
                                        text: 'Google', type: 'folder', items: [
                                            { text: 'Chrome', type: 'folder' }
                                        ]
                                    },
                                    {
                                        text: 'Internet Explorer', type: 'folder', items: [
                                            { text: 'en-US', type: 'folder' }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: 'Program Files (x86)', type: 'folder', items: [
                                    {
                                        text: 'Microsoft', type: 'folder', items: [
                                            { text: 'Edge', type: 'folder' }
                                        ]
                                    },
                                    { text: 'MSBuild', type: 'folder' },
                                    { text: 'Windows Defender', type: 'folder' }
                                ]
                            },
                            {
                                text: 'Users', type: 'folder', items: [
                                    {
                                        text: 'Admin', type: 'folder', items: [
                                            { text: 'Desktop', type: 'desktop' },
                                            { text: 'Documents', type: 'documents' },
                                            { text: 'Downloads', type: 'downloads' },
                                            { text: 'Pictures', type: 'picture' }
                                        ]
                                    },
                                    { text: 'Public', type: 'folder' }
                                ]
                            },
                            {
                                text: 'Windows', type: 'folder', items: [
                                    { text: 'Boot', type: 'folder' },
                                    {
                                        text: 'System32', type: 'folder', items: [
                                            { text: 'Configuration', type: 'folder' },
                                            { text: 'LogFiles', type: 'folder' }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    { text: 'Local Disk (D:)', type: 'folder' }
                ]
            },
            { text: 'Libraries', type: 'folder' },
            { text: 'Network', type: 'network' },
            { text: 'Recycle Bin', type: 'recyclebin' }
        ];
        return _this;
    }
    AddressBar.prototype.btnClick = function () {
        this.breadcrumbInst.items = this.initialBreadcrumbItems;
        this.breadcrumbItems = this.initialBreadcrumbItems;
    };
    AddressBar.prototype.itemTemplate = function (data) {
        var menuItems = [{ text: data.text, iconCss: data.iconCss }];
        return (React.createElement("div", { style: { display: "flex" } }, data.text != 'LastItem' && React.createElement(ej2_react_navigations_2.MenuComponent, { items: menuItems, select: this.selectHandler.bind(this) })));
    };
    AddressBar.prototype.selectHandler = function (args) {
        for (var i = 0; i < this.breadcrumbItems.length; i++) {
            if (this.breadcrumbItems[i].text === args.item.text) {
                this.breadcrumbItems = this.breadcrumbItems.slice(0, i + 1);
                this.breadcrumbItems[0].iconCss = 'e-bicons e-' + this.getItems(args.item.text, true)[0].items.type;
                this.breadcrumbInst.items = this.breadcrumbItems;
                break;
            }
        }
        this.breadcrumbInst.items.push({ text: 'LastItem' });
        this.breadcrumbInst.activeItem = 'LastItem';
    };
    AddressBar.prototype.subMenuSelectHandler = function (args) {
        if (!args.element.parentElement.classList.contains('e-menu') && args.item.parentObj.items) {
            var idx = void 0;
            var subItems = args.item.parentObj.items;
            for (var i = 0; i < subItems.length; i++) {
                for (var j = 0; j < this.breadcrumbItems.length; j++) {
                    if (subItems[i].text === this.breadcrumbItems[j].text) {
                        idx = j;
                        break;
                    }
                }
            }
            if (idx) {
                this.breadcrumbItems = this.breadcrumbItems.slice(0, idx);
            }
            this.breadcrumbItems[0].iconCss = 'e-bicons e-' + args.item.type;
            if (this.breadcrumbItems[this.breadcrumbItems.length - 1].text === 'LastItem') {
                this.breadcrumbItems.pop();
            }
            this.breadcrumbItems.push({ text: args.item.text });
            this.breadcrumbItems.push({ text: 'LastItem' });
            this.breadcrumbInst.items = this.breadcrumbItems;
        }
    };
    AddressBar.prototype.beforeOpen = function () {
        this.element.classList.add('e-open');
    };
    AddressBar.prototype.onClose = function () {
        this.element.classList.remove('e-open');
    };
    AddressBar.prototype.separatorTemplate = function (data) {
        var subMenuItems = this.getItems(data.previousItem.text);
        return (React.createElement("div", { style: { display: "flex" } }, subMenuItems[0].items && data.previousItem.text !== "LastItem" && (React.createElement(ej2_react_navigations_2.MenuComponent, { items: subMenuItems, select: this.subMenuSelectHandler.bind(this), showItemOnClick: true, beforeOpen: this.beforeOpen, onClose: this.onClose }))));
    };
    AddressBar.prototype.getItems = function (text, needParent) {
        var mItems = [].slice.call(this.items);
        var isBreaked;
        if (!text) {
            mItems = this.getSubMenuItems(mItems);
        }
        else {
            for (var i = 1; i < this.breadcrumbItems.length; i++) {
                for (var j = 0; j < mItems.length; j++) {
                    if (mItems[j].text === this.breadcrumbItems[i].text) {
                        if (mItems[j].text === text) {
                            if (needParent) {
                                mItems = mItems[j];
                            }
                            else {
                                mItems = this.getSubMenuItems(mItems[j].items);
                            }
                            isBreaked = true;
                        }
                        else {
                            mItems = mItems[j].items;
                            j = 0;
                        }
                        break;
                    }
                }
                if (isBreaked) {
                    break;
                }
            }
        }
        return [{ items: mItems }];
    };
    AddressBar.prototype.getSubMenuItems = function (mItems) {
        var subItems;
        if (mItems) {
            subItems = [];
            for (var i = 0; i < mItems.length; i++) {
                subItems.push({ text: mItems[i].text, type: mItems[i].type });
            }
        }
        return subItems;
    };
    AddressBar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement("h5", { style: { display: "inline-block" } }, "File Manager like Breadcrumb"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small reset-btn', ref: function (scope) { _this.btnobj = scope; }, onClick: this.btnClick.bind(this) }, "Reset State"))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { ref: function (breadcrumbObj) { _this.breadcrumbInst = breadcrumbObj; }, cssClass: "e-addressbar-breadcrumb", itemTemplate: this.itemTemplate.bind(this), separatorTemplate: this.separatorTemplate.bind(this) },
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { iconCss: "e-bicons e-picture" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "This PC" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Local Disk (C:)" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Users" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Admin" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Pictures" }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    " This sample demonstrates the address bar functionalities using the ",
                    React.createElement("b", null, "Breadcrumb"),
                    " component. Click the right arrow icon to view and navigate to the next level items.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In the ",
                    React.createElement("code", null, "Breadcrumb"),
                    " component, ",
                    React.createElement("code", null, "itemTemplate"),
                    " property is used to render ",
                    React.createElement("code", null, "Menu"),
                    "as Breadcrumb items."),
                React.createElement("p", null, "In this demo, we have rendered address of pictures folder in Breadcrumb. And click the right arrow icon to view and navigate to the next level items."),
                React.createElement("p", null,
                    "More information about Breadcrumb component can be found in this ",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/" }, "documentation section"),
                    "."))));
    };
    return AddressBar;
}(sample_base_1.SampleBase));
exports.AddressBar = AddressBar;
