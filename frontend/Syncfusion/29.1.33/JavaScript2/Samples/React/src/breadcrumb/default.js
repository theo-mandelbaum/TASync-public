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
exports.Default = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.btnClick = function () {
        var breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (0, ej2_base_1.getComponent)(breadcrumb, 'breadcrumb');
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    };
    Default.prototype.breadcrumbTemplate = function () {
        return (React.createElement("span", { className: "e-bicons e-arrow" }));
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement("h5", { style: { display: "inline-block" } }, "Simple Breadcrumb"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small reset-btn', onClick: this.btnClick.bind(this) }, "Reset State"))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { enableNavigation: false },
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { iconCss: "e-icons e-home", url: "https://ej2.syncfusion.com/home/react.html#platform" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Components", url: "https://ej2.syncfusion.com/react/demos/#/material/grid/overview/" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Navigations", url: "https://ej2.syncfusion.com/react/demos/#/material/menu/default" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Breadcrumb", url: "./breadcrumb/default" }))))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement("h5", null, "Breadcrumb with Overflow"))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12 e-bc-overflow" },
                            React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { maxItems: 3, enableNavigation: false, separatorTemplate: this.breadcrumbTemplate },
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Home", url: "./" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Breadcrumb", url: "./breadcrumb" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Default", url: "./breadcrumb/default-functionalities" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Icons", url: "./breadcrumb/icons" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Navigation", url: "./breadcrumb/navigation" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Overflow", url: "./breadcrumb/overflow" }))))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement("h5", null, "Active Last Breadcrumb"))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { enableNavigation: false, enableActiveItemNavigation: true },
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { iconCss: "e-icons e-home", url: "https://ej2.syncfusion.com/home/react.html#platform" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "All Components", url: "https://ej2.syncfusion.com/react/demos/#/material/grid/overview/" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Breadcrumb", url: "./breadcrumb/default" }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the basic rendering, overflow feature and navigable active item of the ",
                    React.createElement("b", null, "Breadcrumb"),
                    " component with icon support. Click the ",
                    React.createElement("b", null, "Reset State"),
                    " button to refresh Breadcrumb component states."),
                "        "),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Breadcrumb"),
                    " component is used as a navigational aid to identify the current page location within the navigational hierarchy structure of websites. It has list of items that can be populated using the ",
                    React.createElement("code", null, "BreadcrumbItemDirective"),
                    " tag."),
                React.createElement("p", null,
                    React.createElement("b", null, "Simple Breadcrumb")),
                React.createElement("p", null, "In this sample, the Breadcrumb is populated with text, icon, and URL."),
                React.createElement("p", null,
                    React.createElement("b", null, "Breadcrumb with Overflow")),
                React.createElement("p", null,
                    "In the Breadcrumb component, ",
                    React.createElement("code", null, "maxItems"),
                    " and ",
                    React.createElement("code", null, "overflowMode"),
                    " properties were used to limit the number of breadcrumb items to be displayed."),
                React.createElement("p", null,
                    "In this sample, the ",
                    React.createElement("code", null, "maxItems"),
                    " is set as ",
                    React.createElement("code", null, "3"),
                    " with ",
                    React.createElement("code", null, "overflowMode"),
                    " as ",
                    React.createElement("code", null, "Menu"),
                    ". To prevent breadcrumb item navigation we have set ",
                    React.createElement("code", null, "false"),
                    " in ",
                    React.createElement("code", null, "enableNavigation"),
                    " property of Breadcrumb component."),
                "          ",
                React.createElement("p", null,
                    React.createElement("b", null, "Active Last Breadcrumb")),
                React.createElement("p", null,
                    "In this sample, navigation for the last item is enabled by using ",
                    React.createElement("code", null, "enableActiveItemNavigation"),
                    " property."),
                React.createElement("p", null,
                    "More information about Breadcrumb component can be found in this ",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
