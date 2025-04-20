"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./schedule-component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
/**
 * Schedule agenda sample
 */
var AgendaView = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var virtualScrollOptions = [
        { text: 'True', value: true },
        { text: 'False', value: false }
    ];
    var hideEmptyAgendaDaysOptions = [
        { text: 'True', value: true },
        { text: 'False', value: false }
    ];
    var fields = { text: 'text', value: 'value' };
    var _a = (0, react_1.useState)([{ option: 'Agenda', allowVirtualScrolling: false }]), views = _a[0], setViews = _a[1];
    var _b = (0, react_1.useState)(true), hideEmptyAgendaDays = _b[0], setHideEmptyAgendaDays = _b[1];
    var _c = (0, react_1.useState)(7), agendaDaysCount = _c[0], setAgendaDaysCount = _c[1];
    var onVirtualChange = function (args) {
        setViews([{ option: 'Agenda', allowVirtualScrolling: args.value }]);
    };
    var onEmptyAgendaDaysChange = function (args) {
        setHideEmptyAgendaDays(args.value);
    };
    var onCountChange = function (args) {
        setAgendaDaysCount(args.value !== null ? args.value : 7);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', views: views, currentView: 'Agenda', selectedDate: new Date(2021, 1, 15), eventSettings: { dataSource: (0, helper_1.generateObject)() }, hideEmptyAgendaDays: hideEmptyAgendaDays, agendaDaysCount: agendaDaysCount },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Agenda] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: false, dataSource: virtualScrollOptions, fields: fields, change: onVirtualChange, floatLabelType: 'Always', placeholder: 'Allow Virtual Scrolling' })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: hideEmptyAgendaDays, dataSource: hideEmptyAgendaDaysOptions, fields: fields, change: onEmptyAgendaDaysChange, floatLabelType: 'Always', placeholder: 'Hide Empty Days' })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: 'n0', value: agendaDaysCount, min: 1, max: 15, change: onCountChange, floatLabelType: 'Always', placeholder: 'Days Count' })))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases the agenda view and the configurations available in it.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, Agenda view is set as active view on Scheduler and made its ",
                React.createElement("code", null, "allowVirtualScrolling"),
                " option as false. With this settings, the Agenda view loads the initial data for the next 7 days count from the date value assigned to the ",
                React.createElement("code", null, "selectedDate"),
                " property of the Scheduler. The initial data loading for 7 days count is due to the default value assigned to the ",
                React.createElement("code", null, "agendaDaysCount"),
                " property which can be customized as per the user needs."),
            React.createElement("p", null,
                "When the ",
                React.createElement("code", null, "allowVirtualScrolling"),
                " property is set to true, the user is allowed to scroll through all the events simply by scrolling up and down upto the last event available in Scheduler."),
            React.createElement("p", null,
                "By default, the days which doesn\u2019t have any events will be hidden on this view \u2013 but by setting ",
                React.createElement("code", null, "hideEmptyAgendaDays"),
                " property to false will allow the ",
                React.createElement("code", null, "No Events"),
                " text to be displayed against the dates that has no events."))));
};
exports.default = AgendaView;
