"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./toolbar-integration.css");
var dataSource = require("./menu-data.json");
var ToolbarIntegration = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var searchTemplate = '<div class="e-input-group"><input class="e-input" type="text" placeholder="Search" /><span class="e-input-group-icon em-icons e-search"></span></div>';
    var tbObj = (0, react_1.useRef)(null);
    var menuTemplate = function () {
        return (React.createElement(ej2_react_navigations_1.MenuComponent, { id: "menuele", items: data.toolbarIntegrationData }));
    };
    var ddbTemplate = function () {
        return (React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "userDBtn", content: 'Andrew', created: onCreated, items: data.userData }));
    };
    var onCreated = function () {
        tbObj.current.refreshOverflow();
        (0, ej2_base_1.removeClass)([tbObj.current.element.querySelector('.e-shopping-cart')], 'e-icons');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { id: "menu-control", className: 'control-section' },
            React.createElement("div", { className: 'toolbar-menu-control' },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar", ref: tbObj },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { template: menuTemplate }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { template: searchTemplate, align: 'Right' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { template: ddbTemplate, align: 'Right' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'em-icons e-shopping-cart', align: 'Right' }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the real use case of ",
                React.createElement("code", null, "menu"),
                " component in web application.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Menu utilizes the ",
                React.createElement("code", null, "items"),
                " property to represent the menu bar in web application. In this demo, the menu component is integrated with toolbar along with customized search input box, dropdownbutton component and added shopping cart item using toolbar default option."),
            React.createElement("p", null,
                "More information about menu can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/menu/use-case-scenarios/#menu-in-toolbar" }, "documentation"),
                " section."))));
};
exports.default = ToolbarIntegration;
