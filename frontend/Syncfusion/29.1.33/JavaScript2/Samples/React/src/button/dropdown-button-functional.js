"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var sample_base_1 = require("../common/sample-base");
require("./dropdown-button.css");
var DropDownButton = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var items = [
        {
            text: 'Dashboard',
            iconCss: 'e-ddb-icons e-dashboard'
        },
        {
            text: 'Notifications',
            iconCss: 'e-ddb-icons e-notifications',
        },
        {
            text: 'User Settings',
            iconCss: 'e-ddb-icons e-settings',
        },
        {
            text: 'Log Out',
            iconCss: 'e-ddb-icons e-logout'
        }
    ];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'dropdownbutton-section' },
                React.createElement("div", { id: 'dropdownbutton-control' },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                            React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { items: items, iconCss: 'e-ddb-icons e-profile' })),
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                            React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { items: items }, "Profile")),
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                            React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { items: items, iconCss: 'e-ddb-icons e-profile' }, "Profile")),
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                            React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { items: items, cssClass: 'e-caret-hide' }, "Profile")))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the DropDownButton. Clicking DropDownButton will display popup with list of action items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The DropDownButton component is used to toggle contextual overlays for displaying list of action items. It can contain both text and images."),
            React.createElement("p", null,
                "In this sample, DropDownButton contains icon, content and list of action items, and can be added using",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-button/#iconcss" }, "iconCss,")),
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-button/#content" }, "content")),
                "and",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-button/#items" }, "items")),
                "property."),
            React.createElement("p", null,
                "More information about DropDownButton can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/drop-down-button/getting-started" }, "documentation section"),
                "."))));
};
exports.default = DropDownButton;
