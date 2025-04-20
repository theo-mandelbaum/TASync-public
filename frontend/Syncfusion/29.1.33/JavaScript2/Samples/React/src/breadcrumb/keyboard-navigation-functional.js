"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./keyboard-navigation.css");
var KeyboardNavigation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var breadcrumb = (0, react_1.useRef)(null);
    var btnClick = function () {
        breadcrumb.current.activeItem = breadcrumb.current.items[breadcrumb.current.items.length - 1].text;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", { style: { display: "inline-block" } }, "Simple Breadcrumb"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small reset-btn', onClick: btnClick }, "Reset State"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { ref: breadcrumb, enableNavigation: false }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                " This sample demonstrates the keyboard navigation functionalities of the ",
                React.createElement("b", null, "Breadcrumb"),
                " component.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Breadcrumb"),
                " component can be interacted with keyboard navigation. Below key combinations can be used in Breadcrumb to initiate various actions."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "Tab"),
                    " to navigate to the next item."),
                React.createElement("li", null,
                    React.createElement("b", null, "Shift + Tab"),
                    " to navigate to the previous item."),
                React.createElement("li", null,
                    React.createElement("b", null, "Enter"),
                    " to click the item.")),
            React.createElement("p", null,
                "More information about ",
                React.createElement("code", null, "Breadcrumb"),
                " component keyboard navigations can be found in this ",
                React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = KeyboardNavigation;
