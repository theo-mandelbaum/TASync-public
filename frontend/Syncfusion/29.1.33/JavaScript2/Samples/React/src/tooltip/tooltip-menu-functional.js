"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./tooltip-menu.css");
var TooltipMenu = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var tooltip = (0, react_1.useRef)(null);
    var fields = { text: "Name", iconCss: "icon" };
    var animationSettings = { effect: "None", duration: 0, delay: 0 };
    var listData;
    var data1 = [
        { Name: "WI-FI", id: "1", icon: "wifi" },
        { Name: "Bluetooth", id: "2", icon: "bluetooth" },
        { Name: "SIM cards", id: "3", icon: "sim" }
    ];
    var data2 = [
        { Name: "Display", icon: "display" },
        { Name: "Sound", icon: "sound" },
        { Name: "Battery", icon: "battery" },
        { Name: "Users", icon: "user" }
    ];
    var data3 = [
        { Name: "Location", icon: "location" },
        { Name: "Security", icon: "security" },
        { Name: "Language", icon: "language" }
    ];
    var dataSource = [data1, data2, data3];
    var tooltipTemplate = function () {
        return (React.createElement(ej2_react_lists_1.ListViewComponent, { id: "tooltipMenu-list", dataSource: listData, fields: fields, showIcon: true }));
    };
    var onClick = function (args) {
        var targetEle;
        if (args) {
            targetEle = (0, ej2_base_1.closest)(args.target, '.e-toolbar-item');
        }
        if (!targetEle) {
            if (document.getElementsByClassName("e-tooltip-wrap").length > 0 && tooltip.current) {
                tooltip.current.close(animationSettings);
            }
        }
    };
    var onScroll = function () {
        if (document.getElementsByClassName("e-tooltip-wrap").length > 0 && tooltip.current) {
            tooltip.current.close(animationSettings);
        }
    };
    var onBeforeRender = function (args) {
        var data = [{ title: "Wireless & networks" }, { title: "Device" }, { title: "Personal" }];
        for (var i = 0; i < data.length; i++) {
            if (data[i].title === args.target.parentElement.getAttribute("title")) {
                if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                    tooltip.current.close(animationSettings);
                }
                listData = dataSource[i];
            }
        }
    };
    var created = function () {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", onClick.bind(_this));
            document.getElementById("right-pane").addEventListener("scroll", onScroll.bind(_this));
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement(ej2_react_popups_1.TooltipComponent, { created: created.bind(_this), ref: tooltip, opensOn: "Click", cssClass: "e-tooltip-menu-settings", beforeRender: onBeforeRender.bind(_this), target: "#toolbar-menu button", width: 170, tabIndex: 0, id: "tooltip-menu", content: tooltipTemplate.bind(_this) },
                    React.createElement("div", { className: "toolbarContainer" },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar-menu" },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-copy-icon tb-icons", tooltipText: "Wireless & networks", text: "Wireless & networks", overflow: "Hide" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-copy-icon tb-icons", tooltipText: "Device", text: "Device", overflow: "Hide" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-copy-icon tb-icons", tooltipText: "Personal", text: "Personal", overflow: "Hide" }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "In this demo, the Tooltip has been customized to show the list of menu items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tooltip has been integrated with Listview component to display the Tooltip menu. With the help of ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#beforerender" }, "beforeRender"),
                " event, dataSource for ListView changed and its instance assigned to ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#content" }, "content"),
                " of Tooltip to appear like menu. On clicking the Toolbar items, the corresponding Tooltip menu will be opened."))));
};
exports.default = TooltipMenu;
