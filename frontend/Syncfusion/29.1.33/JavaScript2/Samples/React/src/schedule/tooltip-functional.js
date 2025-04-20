"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./tooltip.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 *  Schedule event tooltip sample
 */
var Tooltip = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.eventsData, null, true);
    var template = function (props) {
        return (React.createElement("div", { className: "tooltip-wrap" },
            React.createElement("div", { className: "image " + props.EventType }),
            React.createElement("div", { className: "content-area" },
                React.createElement("div", { className: "event-name" }, props.Subject),
                (props.City !== null && props.City !== undefined) ? React.createElement("div", { className: "city" }, props.City) : '',
                React.createElement("div", { className: "time" },
                    "From\u00A0:\u00A0",
                    props.StartTime.toLocaleString()),
                React.createElement("div", { className: "time" },
                    "To\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0:\u00A0",
                    props.EndTime.toLocaleString()))));
    };
    var _a = (0, react_1.useState)({
        dataSource: data,
        enableTooltip: true,
        tooltipTemplate: template.bind(_this)
    }), eventSettings = _a[0], setEventSettings = _a[1];
    var onToolTipChange = function (args) {
        setEventSettings(__assign(__assign({}, eventSettings), { enableTooltip: args.checked }));
        scheduleObj.current.dataBind();
    };
    var onToolTipTemplateChange = function (args) {
        setEventSettings(__assign(__assign({}, eventSettings), { tooltipTemplate: (args.checked) ? template.bind(_this) : null }));
        scheduleObj.current.dataBind();
    };
    var onEventRendered = function (args) {
        (0, helper_1.applyCategoryColor)(args, scheduleObj.current.currentView);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: scheduleObj, selectedDate: new Date(2021, 1, 15), eventSettings: eventSettings, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '90%' } },
                                React.createElement("div", { className: 'enableTooltip' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Enable Tooltip', change: onToolTipChange })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '90%' } },
                                React.createElement("div", { className: 'enableTooltipTemplate' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Enable Tooltip Template', change: onToolTipTemplateChange })))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo illustrates how to enable tooltip on scheduler events as well as the way to customize it. The tooltip can be customized to display any of the information in a formatted style by making use of the tooltip template option.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the tooltip is enabled to display on events by setting true to ",
                React.createElement("code", null, "enableTooltip"),
                " option within the ",
                React.createElement("code", null, "eventSettings"),
                " property. After enabling the default tooltip, it is customized to display the needed event information along with the appropriate images by making use of the ",
                React.createElement("code", null, "tooltipTemplate"),
                " option within the ",
                React.createElement("code", null, "eventSettings"),
                "."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "tooltipTemplate"),
                " option will not work, if ",
                React.createElement("code", null, "enableTooltip"),
                " is set to false.In mobile devices, tap holding the events will open the tooltip."))));
};
exports.default = Tooltip;
