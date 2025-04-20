"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./group-editing.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule resources group-editing sample
 */
var GroupEditing = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.resourceConferenceData, null, true);
    var resourceData = [
        { Text: 'Margaret', Id: 1, Color: '#1aaa55' },
        { Text: 'Robert', Id: 2, Color: '#357cd2' },
        { Text: 'Laura', Id: 3, Color: '#7fa900' }
    ];
    var getEmployeeName = function (value) {
        return ((value.resourceData) ? value.resourceData[value.resource.textField] : value.resourceName);
    };
    var getEmployeeImage = function (value) {
        return getEmployeeName(value).replace(' ', '-').toLowerCase();
    };
    var getEmployeeDesignation = function (value) {
        var resourceName = getEmployeeName(value);
        return (resourceName === 'Margaret') ? 'Sales Representative' : (resourceName === 'Robert') ? 'Vice President, Sales' : 'Inside Sales Coordinator';
    };
    var monthEventTemplate = function (props) {
        return (React.createElement("div", { className: "subject" }, props.Subject));
    };
    var resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "resource-image " + getEmployeeImage(props) }),
            React.createElement("div", { className: "resource-details" },
                React.createElement("div", { className: "resource-name" }, getEmployeeName(props)),
                React.createElement("div", { className: "resource-designation" }, getEmployeeDesignation(props)))));
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'group-editing', width: '100%', height: '650px', selectedDate: new Date(2021, 5, 5), currentView: 'WorkWeek', resourceHeaderTemplate: resourceHeaderTemplate, eventSettings: { dataSource: data, fields: { subject: { title: 'Conference Name', name: 'Subject' }, description: { title: 'Summary', name: 'Description' }, startTime: { title: 'From', name: 'StartTime' }, endTime: { title: 'To', name: 'EndTime' } } }, group: { allowGroupEdit: true, resources: ['Conferences'] } },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ConferenceId', title: 'Attendees', name: 'Conferences', allowMultiple: true, dataSource: resourceData, textField: 'Text', idField: 'Id', colorField: 'Color' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month', eventTemplate: monthEventTemplate }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo illustrates the usage of single event that are shared by multiple resources.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                React.createElement("code", null, "allowGroupEdit"),
                " option is set to true within the ",
                React.createElement("code", null, "group"),
                " property to enable the same event to be shared with multiple resources. With this property enabled, a single appointment object will be maintained within the appointment collection, even if it is shared by more than one resource \u2013 whereas the resource fields of such appointment object will hold the IDs of the multiple resources separated by commas. Any actions such as create, edit or delete held on any one of the event, will be reflected on all other related instances visible on the UI. The ",
                React.createElement("code", null, "allowMultiple"),
                " option when set as true within the ",
                React.createElement("code", null, "resource"),
                " property, will allow the user to select multiple resources from the resource field of editor window, while trying to create appointments."))));
};
exports.default = GroupEditing;
