"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_navigations_2 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./address-bar.css");
var AddressBar = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), classList = _a[0], setClassList = _a[1];
    var breadcrumbInst = (0, react_1.useRef)(null);
    var btnClick = function () {
        breadcrumbInst.current.items = initialBreadcrumbItems;
        breadcrumbItems = initialBreadcrumbItems;
    };
    var itemTemplate = function (data) {
        var menuItems = [{ text: data.text, iconCss: data.iconCss }];
        return (React.createElement("div", { style: { display: "flex" } }, data.text != 'LastItem' && React.createElement(ej2_react_navigations_2.MenuComponent, { items: menuItems, select: selectHandler })));
    };
    var selectHandler = function (args) {
        for (var i = 0; i < breadcrumbItems.length; i++) {
            if (breadcrumbItems[i].text === args.item.text) {
                breadcrumbItems = breadcrumbItems.slice(0, i + 1);
                breadcrumbItems[0].iconCss = 'e-bicons e-' + getItems(args.item.text, true)[0].items.type;
                breadcrumbInst.current.items = breadcrumbItems;
                break;
            }
        }
        breadcrumbInst.current.items.push({ text: 'LastItem' });
        breadcrumbInst.current.activeItem = 'LastItem';
    };
    var subMenuSelectHandler = function (args) {
        if (!args.element.parentElement.classList.contains('e-menu') && args.item.parentObj.items) {
            var idx = void 0;
            var subItems = args.item.parentObj.items;
            for (var i = 0; i < subItems.length; i++) {
                for (var j = 0; j < breadcrumbItems.length; j++) {
                    if (subItems[i].text === breadcrumbItems[j].text) {
                        idx = j;
                        break;
                    }
                }
            }
            if (idx) {
                breadcrumbItems = breadcrumbItems.slice(0, idx);
            }
            breadcrumbItems[0].iconCss = 'e-bicons e-' + args.item.type;
            if (breadcrumbItems[breadcrumbItems.length - 1].text === 'LastItem') {
                breadcrumbItems.pop();
            }
            breadcrumbItems.push({ text: args.item.text });
            breadcrumbItems.push({ text: 'LastItem' });
            breadcrumbInst.current.items = breadcrumbItems;
        }
    };
    var beforeOpen = function () {
        setClassList('e-open');
    };
    var onClose = function () {
        setClassList('');
    };
    var separatorTemplate = function (data) {
        var subMenuItems = getItems(data.previousItem.text);
        return (React.createElement("div", { style: { display: "flex" } }, subMenuItems[0].items && data.previousItem.text !== "LastItem" && (React.createElement(ej2_react_navigations_2.MenuComponent, { className: classList, items: subMenuItems, select: subMenuSelectHandler, showItemOnClick: true, beforeOpen: beforeOpen, onClose: onClose }))));
    };
    var breadcrumbItems = [
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
    var initialBreadcrumbItems = [].slice.call(breadcrumbItems);
    var items = [
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
    var getItems = function (text, needParent) {
        var mItems = [].slice.call(items);
        var isBreaked;
        if (!text) {
            mItems = getSubMenuItems(mItems);
        }
        else {
            for (var i = 1; i < breadcrumbItems.length; i++) {
                for (var j = 0; j < mItems.length; j++) {
                    if (mItems[j].text === breadcrumbItems[i].text) {
                        if (mItems[j].text === text) {
                            if (needParent) {
                                mItems = mItems[j];
                            }
                            else {
                                mItems = getSubMenuItems(mItems[j].items);
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
    var getSubMenuItems = function (mItems) {
        var subItems;
        if (mItems) {
            subItems = [];
            for (var i = 0; i < mItems.length; i++) {
                subItems.push({ text: mItems[i].text, type: mItems[i].type });
            }
        }
        return subItems;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", { style: { display: "inline-block" } }, "File Manager like Breadcrumb"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small reset-btn', onClick: btnClick }, "Reset State"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { ref: breadcrumbInst, cssClass: "e-addressbar-breadcrumb", itemTemplate: itemTemplate, separatorTemplate: separatorTemplate },
                            React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { iconCss: "e-bicons e-picture" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "This PC" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Local Disk (C:)" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Users" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Admin" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Pictures" }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the address bar functionalities using the ",
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
exports.default = AddressBar;
