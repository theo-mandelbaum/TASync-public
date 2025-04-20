"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_buttons_2 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./template-and-customization.css");
var TemplateAndCustomization = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(false), disable = _a[0], setDisable = _a[1];
    var chipTemplate = function (data) {
        return (React.createElement(ej2_react_buttons_1.ChipListComponent, null,
            React.createElement(ej2_react_buttons_1.ChipsDirective, null,
                React.createElement(ej2_react_buttons_1.ChipDirective, { text: data.text }))));
    };
    var arrowSeparatorTemplate = function () {
        return (React.createElement("span", { className: "e-icons e-arrow" }));
    };
    var specificItemTemplate = function (data) {
        return (React.createElement("div", null, data.text == "Breadcrumb" ? (React.createElement("span", null,
            React.createElement("span", { className: "e-searchfor-text" },
                React.createElement("span", { style: { marginRight: "5px" } }, "Search for:"),
                React.createElement("a", { className: "e-breadcrumb-text", href: data.url, onClick: function () { return false; } }, data.text)))) : (React.createElement("a", { className: "e-breadcrumb-text", href: data.url, onClick: function () { return false; } }, data.text))));
    };
    var customTemplate = function (data) {
        return (React.createElement("div", { className: "e-custom-item" },
            React.createElement("div", { className: "e-custom-icon" },
                React.createElement("span", { className: "e-bicons e-frame e-check" }),
                React.createElement("span", { className: "e-label" }, data.text))));
    };
    var customSeparatorTemplate = function () {
        return (React.createElement("div", { className: "e-custom-separator" }));
    };
    var beforeItemRenderHandler = function (args) {
        if (args.item.text !== 'Program Files') {
            setDisable(true);
        }
    };
    var btnClick = function () {
        var breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (0, ej2_base_1.getComponent)(breadcrumb, 'breadcrumb');
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", { style: { display: "inline-block" } }, "Custom Breadcrumb"),
                        React.createElement(ej2_react_buttons_2.ButtonComponent, { cssClass: 'e-small reset-btn', onClick: btnClick }, "Reset State"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { cssClass: "e-breadcrumb-chips", itemTemplate: chipTemplate },
                            React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Cart" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Billing" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Shipping" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Payment" }))))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", null, "Specific Item Template"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { itemTemplate: specificItemTemplate, cssClass: "e-specific-item-template", enableNavigation: false },
                            React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Home", url: "https://ej2.syncfusion.com/home/react.html#platform" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Components", url: "https://ej2.syncfusion.com/react/demos/#/material/grid/overview/" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Navigations", url: "https://ej2.syncfusion.com/react/demos/#/material/menu/default" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Breadcrumb", url: "./breadcrumb/default" }))))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", null, "Custom Separator"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12 e-bc-separator" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { separatorTemplate: arrowSeparatorTemplate },
                            React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Cart" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Billing" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Shipping" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Payment" }))))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", null, "Custom Breadcrumb and Separator"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { cssClass: "e-custom-breadcrumb", itemTemplate: customTemplate, separatorTemplate: customSeparatorTemplate },
                            React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Cart" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Billing" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Shipping" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Payment" }))))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", null, "Breadcrumb with Icons"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12 e-breadcrumb-icons" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, null,
                            React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Program Files", iconCss: "e-bicons e-folder" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Commom Files", iconCss: "e-bicons e-folder" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Services", iconCss: "e-bicons e-folder" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Config.json", iconCss: "e-bicons e-file" }))))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", null, "Disabled Breadcrumb"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12 e-breadcrumb-icons" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { disabled: disable, beforeItemRender: beforeItemRenderHandler },
                            React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Program Files", iconCss: "e-bicons e-folder" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Commom Files", iconCss: "e-bicons e-folder" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Services", iconCss: "e-bicons e-folder" }),
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Config.json", iconCss: "e-bicons e-file" }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the template functionalities of the ",
                React.createElement("b", null, "Breadcrumb"),
                " component. The breadcrumb item templates are customized using HTML and CSS.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Breadcrumb"),
                " component provides a way to customize the items using ",
                React.createElement("code", null, "itemTemplate"),
                " and the separators using",
                React.createElement("code", null, "separatorTemplate"),
                " properties."),
            React.createElement("p", null,
                "The icons are used for the visual representation of the breadcrumb items. You can specify the",
                React.createElement("code", null, "iconCss"),
                " property to display the icon within the corresponding breadcrumb item. By default, the icons are aligned in the left position."),
            React.createElement("p", null,
                "You can enable or disable the entire Breadcrumb using ",
                React.createElement("code", null, "disabled"),
                " property."),
            React.createElement("p", null,
                "In this demo, we have used Shopping Cart details as Breadcrumb Items and customized the items using",
                React.createElement("code", null, "itemTemplate"),
                " and ",
                React.createElement("code", null, "separatorTemplate"),
                "."),
            React.createElement("p", null,
                "And, showcased the file path of the config.json file with icons using the ",
                React.createElement("code", null, "iconCss"),
                " property and disabled the specific Breadcrumb items in ",
                React.createElement("code", null, "beforeItemRender"),
                " event using item ",
                React.createElement("code", null, "disabled"),
                " property."),
            React.createElement("p", null,
                "More information about Breadcrumb component template feature can be found in this ",
                React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/breadcrumb/templates/" }, "documentation section"),
                "."))));
};
exports.default = TemplateAndCustomization;
