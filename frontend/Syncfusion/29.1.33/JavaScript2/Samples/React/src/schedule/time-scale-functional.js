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
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule Timescale sample
 */
var Timescale = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
    var instance = new ej2_base_1.Internationalization();
    var workDays = [0, 1, 2, 3, 4, 5];
    var slotCountList = [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 }
    ];
    var intervalList = [
        { text: '30', value: 30 },
        { text: '60', value: 60 },
        { text: '90', value: 90 },
        { text: '120', value: 120 },
        { text: '150', value: 150 },
        { text: '180', value: 180 },
        { text: '240', value: 240 },
        { text: '300', value: 300 },
        { text: '720', value: 720 }
    ];
    var timeScaleOptions = [
        { text: 'Show', value: 'enable' },
        { text: 'Hide', value: 'disable' }
    ];
    var templateOptions = [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
    ];
    var fields = { text: 'text', value: 'value' };
    var _a = (0, react_1.useState)({
        enable: true,
        interval: 60,
        slotCount: 6,
        majorSlotTemplate: null,
        minorSlotTemplate: null
    }), timeScale = _a[0], setTimeScale = _a[1];
    var majorSlotTemplate = function (props) {
        return (React.createElement("div", null, instance.formatDate(props.date, { skeleton: 'hm' })));
    };
    var minorSlotTemplate = function (props) {
        return (React.createElement("div", { style: { textAlign: 'center' } }, instance.formatDate(props.date, { skeleton: 'ms' }).replace(':00', '')));
    };
    var onSlotCountChange = function (args) {
        setTimeScale(__assign(__assign({}, timeScale), { slotCount: args.value }));
        scheduleObj.current.dataBind();
    };
    var onIntervalChange = function (args) {
        setTimeScale(__assign(__assign({}, timeScale), { interval: args.value }));
    };
    var onTimeScaleChange = function (args) {
        setTimeScale(__assign(__assign({}, timeScale), { enable: (args.value === 'enable') ? true : false }));
        scheduleObj.current.dataBind();
    };
    var onTemplateChange = function (args) {
        setTimeScale(__assign(__assign({}, timeScale), { majorSlotTemplate: args.value ? majorSlotTemplate.bind(_this) : null, minorSlotTemplate: args.value ? minorSlotTemplate.bind(_this) : null }));
        scheduleObj.current.dataBind();
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '550px', cssClass: 'time-scale', ref: scheduleObj, selectedDate: new Date(2021, 0, 10), workDays: workDays, eventSettings: { dataSource: data }, currentView: 'TimelineWeek', timeScale: timeScale },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 60, fields: fields, dataSource: intervalList, change: onIntervalChange, placeholder: 'Interval (in minutes)', floatLabelType: 'Always' })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 6, fields: fields, dataSource: slotCountList, change: onSlotCountChange, placeholder: 'Slot Count', floatLabelType: 'Always' })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 'enable', fields: fields, dataSource: timeScaleOptions, change: onTimeScaleChange, placeholder: 'Gridlines', floatLabelType: 'Always' })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: false, fields: fields, dataSource: templateOptions, change: onTemplateChange, placeholder: 'Apply Template', floatLabelType: 'Always' })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo depicts how to customize the grid lines of scheduler with different duration, count and also, how to apply template customizations on it.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, scheduler has been allowed to display different number of grid lines per hour assigned with different duration to each cell, by making use of the ",
                React.createElement("code", null, "interval"),
                " and ",
                React.createElement("code", null, "slotCount"),
                " properties. The grid lines can also be disabled on schedule, by setting `false` to the ",
                React.createElement("code", null, "enable"),
                " property available within",
                React.createElement("code", null, "timeScale"),
                ". The time header text can be customized by making use of the ",
                React.createElement("code", null, "majorSlotTemplate"),
                " and ",
                React.createElement("code", null, "minorSlotTemplate"),
                " properties."))));
};
exports.default = Timescale;
