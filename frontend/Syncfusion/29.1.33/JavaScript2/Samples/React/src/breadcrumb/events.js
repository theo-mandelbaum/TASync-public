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
exports.Events = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./events.css");
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Events.prototype.clearLog = function () {
        document.getElementById('EventLog').innerHTML = '';
    };
    ;
    Events.prototype.createdHandler = function () {
        this.logEvent('created');
    };
    Events.prototype.clickHandler = function (args) {
        this.logEvent(args.name);
    };
    Events.prototype.beforeItemRenderHandler = function (args) {
        this.logEvent(args.name);
    };
    Events.prototype.logEvent = function (eventName) {
        var span = document.createElement('span');
        span.innerHTML = 'Breadcrumb <b>' + eventName + '</b> event is triggered<hr>';
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    Events.prototype.btnClick = function () {
        var breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (0, ej2_base_1.getComponent)(breadcrumb, 'breadcrumb');
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    };
    Events.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                            React.createElement("h5", { style: { display: "inline-block" } }, "Breadcrumb with Events"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small reset-btn', onClick: this.btnClick.bind(this) }, "Reset State"))),
                    React.createElement("div", { className: "row material2" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12 e-breadcrumb-icons" },
                            React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { created: this.createdHandler.bind(this), itemClick: this.clickHandler.bind(this), beforeItemRender: this.beforeItemRenderHandler.bind(this) },
                                React.createElement(ej2_react_navigations_1.BreadcrumbItemsDirective, null,
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Program Files", iconCss: "e-bicons e-folder" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Commom Files", iconCss: "e-bicons e-folder" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Services", iconCss: "e-bicons e-folder" }),
                                    React.createElement(ej2_react_navigations_1.BreadcrumbItemDirective, { text: "Config.json", iconCss: "e-bicons e-file" }))))))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Event Trace' },
                    React.createElement("table", { id: "property", title: "Event Trace" },
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { className: "eventarea", tabIndex: 0, style: { height: "245px", overflow: "auto" } },
                                    React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: "normal" } })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { className: "evtbtn", style: { paddingBottom: "10px" } },
                                    React.createElement("button", { className: "e-btn", onClick: this.clearLog, id: "clear" }, "Clear Log"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the events that have been triggered on ",
                    React.createElement("code", null, "Breadcrumb"),
                    " actions. The event details are showcased in the event trace panel.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, ",
                    React.createElement("code", null, "Breadcrumb"),
                    " performs following actions which can be traced by event trace panel:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "created - Triggers when the Breadcrumb is created."),
                    React.createElement("li", null, "itemClick - Triggers when a Breadcrumb item is clicked."),
                    React.createElement("li", null, "beforeItemRender - Triggers while rendering each Breadcrumb item and separator.")),
                React.createElement("p", null,
                    "More information about Breadcrumb component can be found in this ",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Events;
}(sample_base_1.SampleBase));
exports.Events = Events;
