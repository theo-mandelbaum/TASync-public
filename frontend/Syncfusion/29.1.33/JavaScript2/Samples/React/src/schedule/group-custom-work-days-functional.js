"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./group-custom-work-days.css");
var ej2_base_2 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule resources group-custom-work-days sample
 */
var GroupCustomWorkDays = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj;
    var data = (0, ej2_base_2.extend)([], dataSource.doctorData, null, true);
    var resourceData = [
        { text: 'Will Smith', id: 1, color: '#ea7a57', workDays: [1, 2, 4, 5], startHour: '08:00', endHour: '15:00' },
        { text: 'Alice', id: 2, color: 'rgb(53, 124, 210)', workDays: [1, 3, 5], startHour: '08:00', endHour: '17:00' },
        { text: 'Robson', id: 3, color: '#7fa900', startHour: '08:00', endHour: '16:00' }
    ];
    var getDoctorImage = function (value) {
        return getDoctorName(value).replace(' ', '-').toLowerCase();
    };
    var getDoctorName = function (value) {
        return ((value.resourceData) ? value.resourceData[value.resource.textField] : value.resourceName);
    };
    var getDoctorLevel = function (value) {
        var resourceName = getDoctorName(value);
        return (resourceName === 'Will Smith') ? 'Cardiologist' : (resourceName === 'Alice') ? 'Neurologist' : 'Orthopedic Surgeon';
    };
    var onActionBegin = function (args) {
        var isEventChange = (args.requestType === 'eventChange');
        if ((args.requestType === 'eventCreate' && args.data.length > 0) || isEventChange) {
            var eventData = (isEventChange) ? args.data : args.data[0];
            var eventField = scheduleObj.eventFields;
            var startDate = eventData[eventField.startTime];
            var endDate = eventData[eventField.endTime];
            var resourceIndex = [1, 2, 3].indexOf(eventData.DoctorId);
            args.cancel = !isValidTime(startDate, endDate, resourceIndex);
            if (!args.cancel) {
                args.cancel = !scheduleObj.isSlotAvailable(startDate, endDate, resourceIndex);
            }
        }
    };
    var isValidTime = function (startDate, endDate, resIndex) {
        var resource = scheduleObj.getResourcesByIndex(resIndex);
        var startHour = parseInt(resource.resourceData.startHour.toString().slice(0, 2), 10);
        var endHour = parseInt(resource.resourceData.endHour.toString().slice(0, 2), 10);
        return (startHour <= startDate.getHours() && endHour >= endDate.getHours());
    };
    var onPopupOpen = function (args) {
        if (args.target && args.target.classList.contains('e-work-cells')) {
            args.cancel = !args.target.classList.contains('e-work-hours');
        }
    };
    var onRenderCell = function (args) {
        if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
            (0, ej2_base_1.addClass)([args.element], ['willsmith', 'alice', 'robson'][parseInt(args.element.getAttribute('data-group-index'), 10)]);
        }
    };
    var resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "resource-image " + getDoctorImage(props) }),
            React.createElement("div", { className: "resource-detail" },
                React.createElement("div", { className: "resource-name" }, getDoctorName(props)),
                React.createElement("div", { className: "resource-designation" }, getDoctorLevel(props)))));
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: function (schedule) { return scheduleObj = schedule; }, cssClass: 'custom-work-days', width: '100%', height: '650px', selectedDate: new Date(2021, 3, 6), currentView: 'WorkWeek', resourceHeaderTemplate: resourceHeaderTemplate, eventSettings: { dataSource: data, fields: { subject: { title: 'Service Type', name: 'Subject' }, location: { title: 'Patient Name', name: 'Location' }, description: { title: 'Summary', name: 'Description' }, startTime: { title: 'From', name: 'StartTime' }, endTime: { title: 'To', name: 'EndTime' } } }, actionBegin: onActionBegin, popupOpen: onPopupOpen, renderCell: onRenderCell, group: { resources: ['Doctors'] } },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'DoctorId', title: 'Doctor Name', name: 'Doctors', dataSource: resourceData, textField: 'text', idField: 'id', groupIDField: 'groupId', colorField: 'color', workDaysField: 'workDays', startHourField: 'startHour', endHourField: 'endHour' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo showcases the different available dates of doctors and their appointments on those days.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, different working days are assigned by passing the ",
                React.createElement("code", null, "workDays"),
                " collection for each doctor to show their available dates. On each of their available dates, their daily available time range is also depicted by mentioning the ",
                React.createElement("code", null, "startHour"),
                " and",
                React.createElement("code", null, "endHour"),
                " for each doctor. These values needs to be provided along with the resource ",
                React.createElement("code", null, "dataSource"),
                " by mapping the appropriate fields namely",
                React.createElement("code", null, "workDaysField"),
                ", ",
                React.createElement("code", null, "startHourField"),
                " and ",
                React.createElement("code", null, "endHourField"),
                "."),
            React.createElement("p", null,
                "Here, we have customized the background cell color of the available times of each doctor using ",
                React.createElement("code", null, "renderCell"),
                " event to denote that, only those timeslots are available for booking appointments. All other cells are simply read-only and no appointments can be booked on it. Also, if the applicable timeslot already contains an appointment, then no more appointments can be added to that cell which has been prevented by making use of the ",
                React.createElement("code", null, "isSlotAvailable"),
                " function within the ",
                React.createElement("code", null, "actionBegin"),
                " event checking for ",
                React.createElement("code", null, "eventCreate"),
                " and",
                React.createElement("code", null, "eventChange"),
                " request type. The resource header is customized by making use of the ",
                React.createElement("code", null, "resourceHeaderTemplate"),
                " option."))));
};
exports.default = GroupCustomWorkDays;
