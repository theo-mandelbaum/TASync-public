"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./block-events.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule block events sample
 */
var BlockEvents = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.blockData, null, true);
    var employeeData = [
        { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
        { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
        { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
        { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
        { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
        { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
    ];
    var getEmployeeName = function (value) {
        return value.resourceData[value.resource.textField];
    };
    var getEmployeeImage = function (value) {
        return getEmployeeName(value).toLowerCase();
    };
    var getEmployeeDesignation = function (value) {
        return value.resourceData.Designation;
    };
    var resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "employee-category" },
                React.createElement("div", { className: "employee-image " + getEmployeeImage(props) }),
                React.createElement("div", { className: "employee-name" },
                    " ",
                    getEmployeeName(props)),
                React.createElement("div", { className: "employee-designation" }, getEmployeeDesignation(props)))));
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper drag-sample-wrapper' },
                React.createElement("div", { className: "schedule-container" },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'block-events', width: '100%', height: '650px', selectedDate: new Date(2021, 7, 2), currentView: 'TimelineDay', resourceHeaderTemplate: resourceHeaderTemplate, eventSettings: { dataSource: data }, group: { enableCompactView: false, resources: ['Employee'] } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'EmployeeId', title: 'Employees', name: 'Employee', allowMultiple: true, dataSource: employeeData, textField: 'Text', idField: 'Id', colorField: 'Color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example shows how to block specific time intervals or days on the Scheduler.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, few blocked events are defined to block the specific time range with the text \u201CUnavailable\u201D. No events can be created on those blocked time range as well as edited through it. These blocked events can be defined by setting ",
                React.createElement("code", null, "isBlock"),
                " field to true within the ",
                React.createElement("code", null, "eventSettings"),
                " and assigned altogether with the events ",
                React.createElement("code", null, "dataSource"),
                "."))));
};
exports.default = BlockEvents;
