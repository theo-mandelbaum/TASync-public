"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./scrollable.css");
var dataSource = require("./menu-data.json");
/*
 Scrollable Menu sample
 */
var Scrollable = function () {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    // Increased duration for smooth animation
    var animation = { duration: 800 };
    var onBeforeOpen = function (args) {
        // Restricting sub menu wrapper height
        if (args.parentItem.text === 'Appliances') {
            // Using closest method we are getting the sub menu wrapper element
            (0, ej2_base_1.closest)(args.element, '.e-menu-wrapper').style.height = '320px';
        }
        if (args.parentItem.text === 'Mobile') {
            (0, ej2_base_1.closest)(args.element, '.e-menu-wrapper').style.height = '260px';
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'menu-section' },
                React.createElement("div", { className: 'scrollable-menu-control' },
                    React.createElement(ej2_react_navigations_1.MenuComponent, { items: data.scrollableData, enableScrolling: true, animationSettings: animation, cssClass: 'e-custom-scroll', beforeOpen: onBeforeOpen })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the ",
                React.createElement("code", null, "Scrollable"),
                " option in the Menu component. Click the scroll arrows to view the hidden menu items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The menu component supports horizontal and vertical scrolling to render large menus and submenus in an adaptive way. This can be achieved by enabling the ",
                React.createElement("code", null, "enableScrolling"),
                " property and by restricting the corresponding menu/submenu size."),
            React.createElement("p", null, "In this demo, the parent menu is horizontally scrollable while the submenu and nested submenu are vertically scrollable."),
            React.createElement("p", null,
                "More information about menu can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/menu/" }, "documentation"),
                " section."))));
};
exports.default = Scrollable;
