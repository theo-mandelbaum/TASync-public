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
exports.BindToLocation = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./bind-to-location.css");
var BindToLocation = /** @class */ (function (_super) {
    __extends(BindToLocation, _super);
    function BindToLocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BindToLocation.prototype.btnClick = function () {
        var breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (0, ej2_base_1.getComponent)(breadcrumb, 'breadcrumb');
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    };
    BindToLocation.prototype.beforeItemRenderHandler = function (args) {
        var url = 'https://ej2.syncfusion.com/react/demos/#/bootstrap5/breadcrumb/bind-to-location', themeName = url.split('/')[6];
        if (args.item.text == 'demos') {
            args.item.url = args.item.url + '/#/' + themeName + '/grid/default';
        }
        else if (args.item.text == 'breadcrumb') {
            args.item.url = 'https://ej2.syncfusion.com/react/demos/#/bootstrap5/breadcrumb/default';
        }
        else if (args.item.text == themeName || args.item.text == 'react') {
            args.cancel = true;
        }
    };
    BindToLocation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement("h5", { style: { display: "inline-block" } }, "Bind to Location"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small reset-btn', onClick: this.btnClick.bind(this) }, "Reset State"))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { enableNavigation: false }))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement("h5", null, "URL Binding and Navigation"))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { ref: function (breadcrumbObj) { _this.breadcrumb = breadcrumbObj; }, url: "https://ej2.syncfusion.com/react/demos/breadcrumb/bind-to-location", beforeItemRender: this.beforeItemRenderHandler.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    " This sample demonstrates the navigation functionality of the ",
                    React.createElement("b", null, "Breadcrumb"),
                    " component."),
                "                "),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Breadcrumb"),
                    " component can be rendered by using the href(URL) of the current page or by using ",
                    React.createElement("code", null, "url"),
                    " property when the user is not specified the breadcrumb items using ",
                    React.createElement("code", null, "items"),
                    " property. In this demonstration, URL navigation is enabled for bind to location sample and ",
                    React.createElement("code", null, "beforeItemRender"),
                    " event is used to customize rendering Breadcrumb item."),
                React.createElement("p", null,
                    "More information about Breadcrumb component navigations feature can be found in this ",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/breadcrumb/data-binding/#items-based-on-current-url" }, "documentation section"),
                    "."),
                "                ")));
    };
    return BindToLocation;
}(sample_base_1.SampleBase));
exports.BindToLocation = BindToLocation;
