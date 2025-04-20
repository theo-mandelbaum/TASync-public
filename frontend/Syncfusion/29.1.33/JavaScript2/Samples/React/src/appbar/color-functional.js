"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./color.css");
var Color = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var btnCreated = function () {
        var menuButtonElement = document.querySelectorAll('.color-appbar-section .e-inherit.menu');
        for (var i = 0; i < menuButtonElement.length; i++) {
            if (!(menuButtonElement[i].hasAttribute("aria-label"))) {
                menuButtonElement[i].setAttribute('aria-label', 'menu');
            }
        }
    };
    var productDropDownButtonItems = [
        { text: 'Developer' },
        { text: 'Analytics' },
        { text: 'Reporting' },
        { text: 'E-Signature' },
        { text: 'Help Desk' }
    ];
    var companyDropDownButtonItems = [
        { text: 'About Us' },
        { text: 'Customers' },
        { text: 'Blog' },
        { text: 'Careers' }
    ];
    var verticalMenuItems = [
        {
            iconCss: 'e-icons e-more-vertical-1',
            items: [
                { text: 'Home' },
                {
                    text: 'Products',
                    items: [
                        { text: 'Developer' },
                        { text: 'Analytics' },
                        { text: 'Reporting' },
                        { text: 'E-Signature' },
                        { text: 'Help Desk' }
                    ]
                },
                {
                    text: 'Company',
                    items: [
                        { text: 'About Us' },
                        { text: 'Customers' },
                        { text: 'Blog' },
                        { text: 'Careers' }
                    ]
                },
                { text: 'Login' }
            ]
        }
    ];
    var appBarColors = [
        { colorMode: 'Light', colorClass: 'e-light', isPrimary: 'true', loginClass: 'login' }, { colorMode: 'Dark', colorClass: 'e-dark', isPrimary: 'false', loginClass: 'e-inherit login' },
        { colorMode: 'Primary', colorClass: 'e-primary', isPrimary: 'false', loginClass: 'e-inherit login' }, { colorMode: 'Inherit', colorClass: 'e-inherit', isPrimary: 'true', loginClass: 'login' }
    ];
    var onInputFocus = function (args) {
        args.target.parentElement.classList.add('e-input-focus');
    };
    var onInputBlur = function (args) {
        args.target.parentElement.classList.remove('e-input-focus');
    };
    var beforeItemRender = function (args) {
        if (args.element.children.length > 0 && args.element.children[0].classList.contains("e-more-vertical-1")) {
            args.element.setAttribute('aria-label', 'more vertical');
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section color-appbar-section' },
            React.createElement("div", { className: 'control appbar-sample' },
                React.createElement("div", { className: "color-appbar-container" }, appBarColors === null || appBarColors === void 0 ? void 0 : appBarColors.map(function (props, key) { return (React.createElement("div", { key: key },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement("h1", null, props.colorMode))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement(ej2_react_navigations_1.AppBarComponent, { colorMode: props.colorMode },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { created: btnCreated, cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' }),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-inherit home e-appbar-menu' }, "Home"),
                                React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { cssClass: 'e-inherit e-appbar-menu ' + props.colorClass, items: productDropDownButtonItems }, "Products"),
                                React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { cssClass: 'e-inherit e-appbar-menu ' + props.colorClass, items: companyDropDownButtonItems }, "Company"),
                                React.createElement("div", { className: 'e-appbar-spacer' }),
                                React.createElement("div", { style: { width: '200px', marginRight: '10px' } },
                                    React.createElement("span", { className: 'e-input-group e-control-wrapper e-inherit' },
                                        React.createElement("input", { type: 'text', className: 'e-searchinput e-input', placeholder: 'Search', onFocus: onInputFocus, onBlur: onInputBlur }),
                                        React.createElement("span", { className: 'e-icons e-search e-input-group-icon' }))),
                                React.createElement("div", { className: "e-appbar-separator" }),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { isPrimary: props.isPrimary, cssClass: props.loginClass }, "Login"),
                                React.createElement(ej2_react_navigations_1.MenuComponent, { cssClass: 'e-inherit e-appbar-icon-menu ' + props.colorClass, items: verticalMenuItems, beforeItemRender: beforeItemRender })))),
                    React.createElement("br", null))); })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the available types of color in the ",
                React.createElement("strong", null, "React AppBar"),
                ".")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, the available types of background color for ",
                React.createElement("strong", null, "React AppBar"),
                " are showcased. The background and font colors can be set using the ",
                React.createElement("strong", null, "ColorMode"),
                " property. The different types are ",
                React.createElement("code", null, "light"),
                ", ",
                React.createElement("code", null, "dark"),
                ", ",
                React.createElement("code", null, "primary"),
                ", and ",
                React.createElement("code", null, "inherit"),
                "."),
            React.createElement("p", null,
                React.createElement("code", null, "Light"),
                " - The AppBar can be displayed with a light background."),
            React.createElement("p", null,
                React.createElement("code", null, "Dark"),
                " - The AppBar can be displayed with a dark background."),
            React.createElement("p", null,
                React.createElement("code", null, "Primary"),
                " - The AppBar can be displayed with primary colors."),
            React.createElement("p", null,
                React.createElement("code", null, "Inherit"),
                " - The AppBar inherits the color from its parent element."),
            " ",
            React.createElement("br", null),
            React.createElement("p", null,
                " On ",
                React.createElement("code", null, "mobile devices"),
                ", media query is used to display the AppBar in adaptive views. You can click the menu to see the hidden AppBar content."))));
};
exports.default = Color;
