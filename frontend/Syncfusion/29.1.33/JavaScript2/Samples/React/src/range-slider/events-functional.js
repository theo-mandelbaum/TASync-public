"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.content-wrapper {\n    width: 52%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    margin-top: 60px;\n}\n\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n\n#EventLog b {\n    color: #388e3c;\n}\n\nhr {\n    margin-top: 6px;\n    margin-bottom: 6px;\n}\n";
var Events = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), eventLog = _a[0], setEventLog = _a[1];
    var defaultObj = (0, react_1.useRef)(null);
    var defaultTooltip = { isVisible: true, placement: 'Before', showOn: 'Focus' };
    var defaultTicks = { placement: 'Both', largeStep: 20, smallStep: 5, showSmallTicks: true };
    //Handler for create event trace
    var onCreated = function () {
        appendElement('Slider control has been <b>created</b><hr>');
    };
    //Handler for change event trace
    var onChange = function (args) {
        appendElement('Slider value is <b>changing</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    };
    //Handler for changed event trace
    var onChanged = function (args) {
        appendElement('Slider value has been <b>changed</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    };
    //Display event log
    var appendElement = function (html) {
        setEventLog(function (prevLog) { return "".concat(html).concat(prevLog); });
    };
    // Clears the event log details
    var onclick = function () {
        setEventLog('');
    };
    var refreshTooltip = function (e) {
        if (defaultObj.current) {
            defaultObj.current.refreshTooltip(defaultObj.tooltipTarget);
        }
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', refreshTooltip.bind(_this));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, slidercss),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: 'minrange', value: 30, type: 'MinRange', tooltip: defaultTooltip, ticks: defaultTicks, ref: defaultObj, changed: onChanged.bind(_this), created: onCreated.bind(_this), change: onChange.bind(_this) })))),
            React.createElement("div", { id: "slider_event", className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Event Trace", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "eventarea", style: { height: '245px', overflow: 'auto' } },
                                        React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: "normal" }, dangerouslySetInnerHTML: { __html: eventLog } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "evtbtn", style: { paddingBottom: '10px' } },
                                        React.createElement("input", { id: "clear", type: "button", className: "btn btn-default", value: "Clear", onClick: onclick }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the events that have been triggered on the Slider operations with the help of Event Trace panel. Drag the thumb over the bar between min and max to know the event details.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Slider component triggers event based on its actions. The events can be used as an extension point to perform custom operations."),
            React.createElement("p", null, "In this demo, Slider performs following action like created, change, changed Which can be traced by event trace panel."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#change" }, "created"),
                    " - Triggers when Slider is created."),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#change" }, "change"),
                    " - Triggers when the Slider value is changed."),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#changed" }, "changed"),
                    " - Triggers when the Slider action is completed with change in Slider value.")),
            React.createElement("p", null,
                "For more information, we can refer the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#events" }, "events"),
                " API from the documentation."))));
};
exports.default = Events;
