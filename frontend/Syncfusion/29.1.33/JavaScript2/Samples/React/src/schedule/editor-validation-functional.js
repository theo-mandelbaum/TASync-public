"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 *  Schedule editor validation sample
 */
var EditorFieldValidation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
    var fields = {
        subject: { name: 'Subject', validation: { required: true } },
        location: {
            name: 'Location', validation: {
                required: true,
                regex: ['^[a-zA-Z0-9- ]*$', 'Special characters are not allowed in this field']
            }
        },
        description: {
            name: 'Description', validation: {
                required: true, minLength: 5, maxLength: 500
            }
        },
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } }
    };
    var onEventRendered = function (args) {
        var _a;
        (0, helper_1.applyCategoryColor)(args, (_a = scheduleObj.current) === null || _a === void 0 ? void 0 : _a.currentView);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '550px', ref: scheduleObj, selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: data, fields: fields }, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo shows the way of adding default and custom validation rules to the editor fields of Scheduler.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the specific fields of Scheduler editor window such as",
                React.createElement("code", null, "subject"),
                ",",
                React.createElement("code", null, "location"),
                ",",
                React.createElement("code", null, "description"),
                ",",
                React.createElement("code", null, "startTime"),
                " and",
                React.createElement("code", null, "endTime"),
                " are made to undergo validation such that if it is left as blank, then the default required validation message will be displayed in a separate tooltip, on clicking a save button."),
            React.createElement("p", null,
                "Additionally, the regex condition has been added to the ",
                React.createElement("code", null, "location"),
                " field, so that if any special characters are typed into it, then the custom validation message will be displayed. The ",
                React.createElement("code", null, "description"),
                " field has been validated to restrict the character count to be typed into it between 5 and 500 and not beyond that. This validation can be given by making use of the ",
                React.createElement("code", null, "validation"),
                " API available within each ",
                React.createElement("code", null, "fields"),
                " of ",
                React.createElement("code", null, "eventSettings"),
                " property."),
            React.createElement("p", null, "Apart from this validation feature, the built-in validation has been provided to the start and end time fields - so that, when the selected end time occurs before the start time, a validation message will be displayed as well as when some unwanted characters are typed into the date fields, the invalid date message will be alerted."))));
};
exports.default = EditorFieldValidation;
