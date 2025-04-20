"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./quick-info-template.css");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule quick info template sample
 */
var QuickInfoTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var eventTypeObj = (0, react_1.useRef)(null);
    var titleObj = (0, react_1.useRef)(null);
    var notesObj = (0, react_1.useRef)(null);
    var scheduleData = (0, ej2_base_1.extend)([], dataSource.quickInfoTemplateData, undefined, true);
    var intl = new ej2_base_1.Internationalization();
    var roomData = [
        { Name: 'Jammy', Id: 1, Capacity: 20, Color: '#ea7a57', Type: 'Conference' },
        { Name: 'Tweety', Id: 2, Capacity: 7, Color: '#7fa900', Type: 'Cabin' },
        { Name: 'Nestle', Id: 3, Capacity: 5, Color: '#5978ee', Type: 'Cabin' },
        { Name: 'Phoenix', Id: 4, Capacity: 15, Color: '#fec200', Type: 'Conference' },
        { Name: 'Mission', Id: 5, Capacity: 25, Color: '#df5286', Type: 'Conference' },
        { Name: 'Hangout', Id: 6, Capacity: 10, Color: '#00bdae', Type: 'Cabin' },
        { Name: 'Rick Roll', Id: 7, Capacity: 20, Color: '#865fcf', Type: 'Conference' },
        { Name: 'Rainbow', Id: 8, Capacity: 8, Color: '#1aaa55', Type: 'Cabin' },
        { Name: 'Swarm', Id: 9, Capacity: 30, Color: '#df5286', Type: 'Conference' },
        { Name: 'Photogenic', Id: 10, Capacity: 25, Color: '#710193', Type: 'Conference' }
    ];
    var getResourceData = function (data) {
        var resources = scheduleObj.current.getResourceCollections().slice(-1)[0];
        var resourceData = resources.dataSource.filter(function (resource) { return resource.Id === data.RoomId; })[0];
        return resourceData;
    };
    var getHeaderStyles = function (data) {
        if (data.elementType === 'cell') {
            return { alignItems: 'center', color: '#919191' };
        }
        else {
            var resourceData = getResourceData(data);
            return { background: resourceData.Color, color: '#FFFFFF' };
        }
    };
    var getHeaderTitle = function (data) {
        return (data.elementType === 'cell') ? 'Add Appointment' : 'Appointment Details';
    };
    var getHeaderDetails = function (data) {
        return intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    };
    var getEventType = function (data) {
        return getResourceData(data).Name;
    };
    var buttonClickActions = function (e) {
        var quickPopup = (0, ej2_base_1.closest)(e.target, '.e-quick-popup-wrapper');
        var getSlotData = function () {
            var addObj = {};
            addObj.Id = scheduleObj.current.getEventMaxID();
            addObj.Subject = (0, ej2_base_1.isNullOrUndefined)(titleObj.current.value) ? 'Add title' : titleObj.current.value;
            addObj.StartTime = new Date(scheduleObj.current.activeCellsData.startTime);
            addObj.EndTime = new Date(scheduleObj.current.activeCellsData.endTime);
            addObj.IsAllDay = scheduleObj.current.activeCellsData.isAllDay;
            addObj.Description = (0, ej2_base_1.isNullOrUndefined)(notesObj.current.value) ? 'Add notes' : notesObj.current.value;
            addObj.RoomId = eventTypeObj.current.value;
            return addObj;
        };
        if (e.target.id === 'add') {
            var addObj = getSlotData();
            scheduleObj.current.addEvent(addObj);
        }
        else if (e.target.id === 'delete') {
            var eventDetails = scheduleObj.current.activeEventData.event;
            var currentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            scheduleObj.current.deleteEvent(eventDetails, currentAction);
        }
        else {
            var isCellPopup = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            var eventDetails = isCellPopup ? getSlotData() : scheduleObj.current.activeEventData.event;
            var currentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            scheduleObj.current.openEditor(eventDetails, currentAction, true);
        }
        scheduleObj.current.closeQuickInfoPopup();
    };
    var onPopupOpen = function (args) {
        if (args.target && !args.target.classList.contains('e-appointment') && !(0, ej2_base_1.isNullOrUndefined)(titleObj) && !(0, ej2_base_1.isNullOrUndefined)(titleObj.current)) {
            titleObj.current.focusIn();
        }
    };
    var headerTemplate = function (props) {
        return (React.createElement("div", { className: "quick-info-header" },
            React.createElement("div", { className: "quick-info-header-content", style: getHeaderStyles(props) },
                React.createElement("div", { className: "quick-info-title" }, getHeaderTitle(props)),
                React.createElement("div", { className: "duration-text" }, getHeaderDetails(props)))));
    };
    var contentTemplate = function (props) {
        return (React.createElement("div", { className: "quick-info-content" }, props.elementType === 'cell' ?
            React.createElement("div", { className: "e-cell-content" },
                React.createElement("div", { className: "content-area" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "title", ref: titleObj, placeholder: "Title" })),
                React.createElement("div", { className: "content-area" },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "eventType", ref: eventTypeObj, dataSource: roomData, fields: { text: "Name", value: "Id" }, placeholder: "Choose Type", index: 0, popupHeight: "200px" })),
                React.createElement("div", { className: "content-area" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "notes", ref: notesObj, placeholder: "Notes" })))
            :
                React.createElement("div", { className: "event-content" },
                    React.createElement("div", { className: "meeting-type-wrap" },
                        React.createElement("label", null, "Subject"),
                        ":",
                        React.createElement("span", null, props.Subject)),
                    React.createElement("div", { className: "meeting-subject-wrap" },
                        React.createElement("label", null, "Type"),
                        ":",
                        React.createElement("span", null, getEventType(props))),
                    React.createElement("div", { className: "notes-wrap" },
                        React.createElement("label", null, "Notes"),
                        ":",
                        React.createElement("span", null, props.Description)))));
    };
    var footerTemplate = function (props) {
        return (React.createElement("div", { className: "quick-info-footer" }, props.elementType == "cell" ?
            React.createElement("div", { className: "cell-footer" },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "more-details", cssClass: 'e-flat', content: "More Details", onClick: buttonClickActions.bind(_this) }),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "add", cssClass: 'e-flat', content: "Add", isPrimary: true, onClick: buttonClickActions.bind(_this) }))
            :
                React.createElement("div", { className: "event-footer" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "delete", cssClass: 'e-flat', content: "Delete", onClick: buttonClickActions.bind(_this) }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "more-details", cssClass: 'e-flat', content: "More Details", isPrimary: true, onClick: buttonClickActions.bind(_this) }))));
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "schedule", cssClass: 'quick-info-template', ref: scheduleObj, height: "650px", selectedDate: new Date(2021, 0, 9), eventSettings: { dataSource: scheduleData }, quickInfoTemplates: { header: headerTemplate.bind(_this), content: contentTemplate.bind(_this), footer: footerTemplate.bind(_this) }, popupOpen: onPopupOpen.bind(_this) },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'RoomId', title: 'Room Type', name: 'MeetingRoom', textField: 'Name', idField: 'Id', colorField: 'Color', dataSource: roomData })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.MonthAgenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases the quick popups for cells and appointments with the customized templates.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the quick popup is customized based on the office required appointment-related fields which can be achieved by making use of the ",
                React.createElement("code", null, "quickInfoTemplate"),
                " option."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "quickInfoTemplate"),
                " has three UI elements such as ",
                React.createElement("code", null, "header"),
                ", ",
                React.createElement("code", null, "content"),
                ", and ",
                React.createElement("code", null, "footer"),
                ". You can customize these UI elements of the quick popup. You can also customize whether the quick popup is applicable to the cells or events or for both using the ",
                React.createElement("code", null, "elementType"),
                " property."))));
};
exports.default = QuickInfoTemplate;
