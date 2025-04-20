"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_navigations_2 = require("@syncfusion/ej2-react-navigations");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./responsive-panel.css");
var ResponsivePanel = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var sidebarobj = (0, react_1.useRef)(null);
    var data = [
        {
            nodeId: '01', nodeText: 'Installation', iconCss: 'icon-microchip icon',
        },
        {
            nodeId: '02', nodeText: 'Deployment', iconCss: 'icon-thumbs-up-alt icon',
        },
        {
            nodeId: '03', nodeText: 'Quick Start', iconCss: 'icon-docs icon',
        },
        {
            nodeId: '04', nodeText: 'Components', iconCss: 'icon-th icon',
            nodeChild: [
                { nodeId: '04-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
            ]
        },
        {
            nodeId: '05', nodeText: 'API Reference', iconCss: 'icon-code icon',
            nodeChild: [
                { nodeId: '05-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
            ]
        },
        {
            nodeId: '06', nodeText: 'Browser Compatibility', iconCss: 'icon-chrome icon'
        },
        {
            nodeId: '07', nodeText: 'Upgrade Packages', iconCss: 'icon-up-hand icon'
        },
        {
            nodeId: '08', nodeText: 'Release Notes', iconCss: 'icon-bookmark-empty icon'
        },
        {
            nodeId: '09', nodeText: 'FAQ', iconCss: 'icon-help-circled icon'
        },
        {
            nodeId: '10', nodeText: 'License', iconCss: 'icon-doc-text icon'
        }
    ];
    var width = '290px';
    var target = '.main-sidebar-content';
    var mediaQuery = '(min-width: 600px)';
    var fields = { dataSource: data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: "iconCss" };
    var folderEle = '<div class= "e-folder"><div class= "e-folder-name">Navigation Pane</div></div>';
    //toggle the sidebar
    var toolbarCliked = function () {
        sidebarobj.current.toggle();
    };
    return (React.createElement("div", { className: "control-section", id: "responsive-wrapper" },
        React.createElement("div", { id: "reswrapper" },
            React.createElement("div", null,
                React.createElement(ej2_react_navigations_2.ToolbarComponent, { id: "resToolbar", clicked: toolbarCliked.bind(_this) },
                    React.createElement(ej2_react_navigations_2.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_2.ItemDirective, { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" }),
                        React.createElement(ej2_react_navigations_2.ItemDirective, { template: folderEle })))),
            React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "sideTree", className: "sidebar-treeview", ref: sidebarobj, width: width, target: target, mediaQuery: mediaQuery, isOpen: true },
                React.createElement("div", { className: 'res-main-menu' },
                    React.createElement("div", { className: "table-content" },
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "resSearch", placeholder: "Search..." }),
                        React.createElement("p", { className: "main-menu-header" }, "TABLE OF CONTENTS")),
                    React.createElement("div", null,
                        React.createElement(ej2_react_navigations_2.TreeViewComponent, { id: 'mainTree', cssClass: "main-treeview", fields: fields, expandOn: 'Click' })))),
            React.createElement("div", { className: "main-sidebar-content", id: "main-text" },
                React.createElement("div", { className: "sidebar-content" },
                    React.createElement("div", { className: "sidebar-heading" }, "Responsive Sidebar with Treeview"),
                    React.createElement("p", { className: "paragraph-content" }, "This is a graphical aid for visualising and categorising the site, in the style of an expandable and collapsable treeview component. It auto-expands to display the node(s), if any, corresponding to the currently viewed title, highlighting that node(s) and its ancestors. Load-on-demand when expanding nodes is available where supported (most graphical browsers), falling back to a full-page reload. MediaWiki-supported caching, aside from squid, has been considered so that unnecessary re-downloads of content are avoided where possible. The complete expanded/collapsed state of the treeview persists across page views in most situations.")))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Sidebar"),
                " sample demonstrates how the Sidebar will act in responsive case. Click on the hamburger menu icon to expand/collapse the sidebar.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Sidebar"),
                " will be shown or hidden based on the resolutions of the screen. It will be shown on larger resolution screens and hidden automatically in lower resolution screens. This can be achieved by the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/sidebar#mediaquery" }, "mediaquery"),
                " property."),
            React.createElement("p", null,
                "In this sample, the TreeView component is placed inside the ",
                React.createElement("code", null, "Sidebar"),
                "."))));
};
exports.default = ResponsivePanel;
