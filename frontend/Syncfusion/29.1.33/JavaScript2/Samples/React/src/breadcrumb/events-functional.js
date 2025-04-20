"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./events.css");
var Events = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), eventLog = _a[0], setEventLog = _a[1];
    var breadObj = (0, react_1.useRef)(null);
    var eventObj = (0, react_1.useRef)(null);
    var clearLog = function () {
        setEventLog('');
    };
    var createdHandler = function () {
        logEvent('created');
    };
    var clickHandler = function (args) {
        logEvent(args.name);
    };
    var beforeItemRenderHandler = function (args) {
        logEvent(args.name);
    };
    var logEvent = function (eventName) {
        setEventLog(function (prevLog) { return "Breadcrumb <b>".concat(eventName, "</b> event is triggered<hr>").concat(prevLog); });
    };
    var btnClick = function () {
        var breadcrumbInst, breadcrumb = breadObj.current.element;
        breadcrumbInst = (0, ej2_base_1.getComponent)(breadcrumb, 'breadcrumb');
        breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
    };
    (0, react_1.useEffect)(function () {
        var eventEle = eventObj.current;
        eventEle.innerHTML = eventLog;
    }, [eventLog]);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "content-wrapper breadcrumb-control-wrapper" },
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement("h5", { style: { display: "inline-block" } }, "Breadcrumb with Events"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small reset-btn', onClick: btnClick }, "Reset State"))),
                React.createElement("div", { className: "row material2" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12 e-breadcrumb-icons" },
                        React.createElement(ej2_react_navigations_1.BreadcrumbComponent, { created: createdHandler, itemClick: clickHandler, ref: breadObj, beforeItemRender: beforeItemRenderHandler },
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
                            React.createElement("div", { className: "eventarea", tabIndex: 0, ref: eventObj, style: { height: "245px", overflow: "auto" } },
                                React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: "normal" }, dangerouslySetInnerHTML: { __html: eventLog } })))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", { className: "evtbtn", style: { paddingBottom: "10px" } },
                                React.createElement("button", { className: "e-btn", onClick: clearLog, id: "clear" }, "Clear Log"))))))),
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
exports.default = Events;
