"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./sidebar-component.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var sidebarobj = (0, react_1.useRef)(null);
    var listObj = (0, react_1.useRef)(null);
    //ListView data source initialization
    var inboxData = [
        { id: "1", text: "Albert Lives", subject: "Business dinner invitation", message: "Hello Uta Morgan," },
        { id: "2", text: "Ila Russo", subject: "Opening for Sales Manager", message: "Hello Jelani Moreno," },
        { id: "3", text: "Garth Owen", subject: "Application for Job Title", message: "Hello Ila Russo," },
        { id: "4", text: "Ursula Patterson", subject: "Programmer Position Application", message: "Hello Kerry Best," },
        { id: "5", text: "Nichole Rivas", subject: "Annual Conference", message: "Hi Igor Mccoy," }
    ];
    var sentItemData = [
        { id: "11", text: "Gemma Roberson", subject: "Apology for late response email", message: "Hello Colette Wooten," },
        { id: "12", text: "Ann Garza", subject: "Application for Job Title", message: "Hello Kerry Best," },
        { id: "13", text: "Alfonso Burnett", subject: "Anything I can help with", message: "Hello Otto Ashley," },
        { id: "14", text: "Rogan Espinoza", subject: "Assistant Marketing Department", message: "Hello Kerry Best," },
        { id: "15", text: "Sierra Kerr", subject: "Application for Transfer", message: "Hi Halee Lindsey," }
    ];
    var draftsData = [
        { id: "21", text: "Chaim Barber", subject: "We launched new Product!", message: "Hello Cameran Roth," },
        { id: "22", text: "Lara Knox", subject: "Request for meeting appointment email", message: "Hello Mona Bates," },
        { id: "23", text: "Igor Mccoy", subject: "Thank you", message: "Hello Kerry Best," },
        { id: "24", text: "Patricia Boyle", subject: "Sales Team", message: "Hello Amelia Curtis," },
        { id: "25", text: "Zachery Peters", subject: "Today’s meeting schedule", message: "Hi Leslie Juarez," }
    ];
    var deleteData = [
        { id: "31", text: "Elijah Berry", subject: "Apology marketing email", message: "Dear Kerry Best," },
        { id: "32", text: "Cameran Newman", subject: "Business appointment request", message: "Hello Mona Bates," },
        { id: "33", text: "Amity Slater", subject: "Business dinner invitation", message: "Hello Kerry Best," },
        { id: "34", text: "Leo Cooley", subject: "Apology Email for Wrong Order", message: "Hi Athena Mcintosh," },
        { id: "35", text: "Halee Lindsey", subject: "Apology for late response email", message: "Hi Fletcher Beck," }
    ];
    var outBoxData = [
        { id: "41", text: "Willow Frye", subject: "Out of Office", message: "Hello Maggy Randall," },
        { id: "42", text: "Regan Haney", subject: "Project Manager Interview", message: "Hello Kerry Best," },
        { id: "43", text: "Stella Calderon", subject: "Proposition for a new business", message: "Hello Gail Pierce," },
        { id: "44", text: "Xanthus Harmon", subject: "Performance appraisal announcement", message: "Dear Clare Heath," },
        { id: "45", text: "Cheyenne Cline", subject: "Office Holiday", message: "Hi Fletcher Beck," }
    ];
    var treeData = [
        { id: "1", name: "Favorites", hasChild: true, expanded: true },
        { id: "2", name: "Inbox", selected: true, pid: "1" },
        { id: "3", name: "Sent Items", pid: "1" },
        { id: "5", name: "John", hasChild: true, expanded: true },
        { id: "6", name: "Inbox", pid: "5" },
        { id: "7", name: "Drafts", pid: "5" },
        { id: "8", name: "Deleted Items", pid: "5" },
        { id: "9", name: "Sent Items", pid: "5" },
        { id: "12", name: "Outbox", pid: "5" },
    ];
    var _a = (0, react_1.useState)(inboxData), data = _a[0], setData = _a[1];
    var treeFields = { dataSource: treeData, id: "id", text: "name", selected: "selected", parentID: "pid", hasChildren: "hasChild", expanded: "expanded" };
    var listTemplate = function (data) {
        return (React.createElement("div", { className: "e-list-wrapper e-list-avatar e-list-multi-line" },
            React.createElement("span", { className: "e-avatar e-avatar-circle e-icon sf-icon-profile" }),
            React.createElement("span", { className: "e-list-item-header" }, data.text),
            React.createElement("span", { className: "e-list-content" }, data.subject),
            React.createElement("span", { className: "e-list-text" }, data.message)));
    };
    //Toolbar component template element specification
    var folderEle = '<div class= "e-folder"><div class= "e-folder-name">Webmail</div></div>';
    var userNameEle = '<div><div class= "e-user-name">John</div></div>';
    var imageEle = '<div class= "image-container"><img height="20px" src="src/sidebar/images/user.svg" alt="John"></img></div>';
    //ListView Fields Mapping
    var fields = { id: "id", text: "text" };
    //open / close the sidebar
    var toolbarCliked = function (args) {
        if (args.item.tooltipText == "Menu") {
            sidebarobj.current.toggle();
        }
    };
    var beforeSelect = function (args) {
        if (args.nodeData.text == "Favorites" || args.nodeData.text == "John") {
            args.cancel = true;
        }
    };
    var onSelect = function (args) {
        if (args.nodeData.text == "Inbox") {
            setData(inboxData);
        }
        else if (args.nodeData.text == "Sent Items") {
            setData(sentItemData);
        }
        else if (args.nodeData.text == "Drafts") {
            setData(draftsData);
        }
        else if (args.nodeData.text == "Deleted Items") {
            setData(deleteData);
        }
        else if (args.nodeData.text == "Outbox") {
            setData(outBoxData);
        }
    };
    var onListSelect = function (args) {
        args.item.classList.remove("e-active");
    };
    return (React.createElement("div", { className: "control-section", id: "sidebar-wrapper" },
        React.createElement("div", null,
            React.createElement(ej2_react_navigations_1.ToolbarComponent, { cssClass: "defaultToolbar", id: "defaultToolbar", clicked: toolbarCliked.bind(_this) },
                React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                    React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" }),
                    React.createElement(ej2_react_navigations_1.ItemDirective, { template: folderEle }),
                    React.createElement(ej2_react_navigations_1.ItemDirective, { align: "Right", template: userNameEle }),
                    React.createElement(ej2_react_navigations_1.ItemDirective, { cssClass: "e-custom", align: "Right", template: imageEle })))),
        React.createElement("div", { className: "maincontent" },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: "listView", ref: listObj, template: listTemplate, cssClass: "e-list-template", dataSource: data, fields: fields, select: onListSelect.bind(_this), statelessTemplates: ['template'] })),
        React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "defaultSidebar", ref: sidebarobj, className: "default-sidebar", width: "260px", target: ".maincontent", position: "Left" },
            React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: "defaultTree", fields: treeFields, nodeSelecting: beforeSelect.bind(_this), nodeSelected: onSelect.bind(_this) })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Sidebar"),
                " sample demonstrates the default functionalities of the ",
                React.createElement("code", null, "Sidebar"),
                ". Click on the hamburger menu icon to expand/collapse the sidebar. Click the TreeView node to see the corresponding folder\u2019s mail details.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Sidebar"),
                " is an expandable and collapsible component that typically acts as a side container to place primary or secondary content alongside the main content. It provides flexible options that can be shown and hidden based on user interactions. Any type of HTML content or component can be placed in the ",
                React.createElement("code", null, "Sidebar"),
                " for quick access and easy navigation, like quick references, menus, lists, and tree views."),
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "Sidebar"),
                " is populated as like webmail with folder structure."))));
};
exports.default = Default;
