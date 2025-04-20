"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickInfoTemplate = void 0;
var React = require("react");
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
var QuickInfoTemplate = /** @class */ (function (_super) {
    __extends(QuickInfoTemplate, _super);
    function QuickInfoTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scheduleData = (0, ej2_base_1.extend)([], dataSource.quickInfoTemplateData, undefined, true);
        _this.intl = new ej2_base_1.Internationalization();
        _this.roomData = [
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
        return _this;
    }
    QuickInfoTemplate.prototype.getResourceData = function (data) {
        var resources = this.scheduleObj.getResourceCollections().slice(-1)[0];
        var resourceData = resources.dataSource.filter(function (resource) {
            return resource.Id === data.RoomId;
        })[0];
        return resourceData;
    };
    QuickInfoTemplate.prototype.getHeaderStyles = function (data) {
        if (data.elementType === 'cell') {
            return { alignItems: 'center', color: '#919191' };
        }
        else {
            var resourceData = this.getResourceData(data);
            return { background: resourceData.Color, color: '#FFFFFF' };
        }
    };
    QuickInfoTemplate.prototype.getHeaderTitle = function (data) {
        return (data.elementType === 'cell') ? 'Add Appointment' : 'Appointment Details';
    };
    QuickInfoTemplate.prototype.getHeaderDetails = function (data) {
        return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    };
    QuickInfoTemplate.prototype.getEventType = function (data) {
        return this.getResourceData(data).Name;
    };
    QuickInfoTemplate.prototype.buttonClickActions = function (e) {
        var _this = this;
        var quickPopup = (0, ej2_base_1.closest)(e.target, '.e-quick-popup-wrapper');
        var getSlotData = function () {
            var addObj = {};
            addObj.Id = _this.scheduleObj.getEventMaxID();
            addObj.Subject = (0, ej2_base_1.isNullOrUndefined)(_this.titleObj.value) ? 'Add title' : _this.titleObj.value;
            addObj.StartTime = new Date(_this.scheduleObj.activeCellsData.startTime);
            addObj.EndTime = new Date(_this.scheduleObj.activeCellsData.endTime);
            addObj.IsAllDay = _this.scheduleObj.activeCellsData.isAllDay;
            addObj.Description = (0, ej2_base_1.isNullOrUndefined)(_this.notesObj.value) ? 'Add notes' : _this.notesObj.value;
            addObj.RoomId = _this.eventTypeObj.value;
            return addObj;
        };
        if (e.target.id === 'add') {
            var addObj = getSlotData();
            this.scheduleObj.addEvent(addObj);
        }
        else if (e.target.id === 'delete') {
            var eventDetails = this.scheduleObj.activeEventData.event;
            var currentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            this.scheduleObj.deleteEvent(eventDetails, currentAction);
        }
        else {
            var isCellPopup = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            var eventDetails = isCellPopup ? getSlotData() :
                this.scheduleObj.activeEventData.event;
            var currentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            this.scheduleObj.openEditor(eventDetails, currentAction, true);
        }
        this.scheduleObj.closeQuickInfoPopup();
    };
    QuickInfoTemplate.prototype.onPopupOpen = function (args) {
        if (args.target && !args.target.classList.contains('e-appointment') && !(0, ej2_base_1.isNullOrUndefined)(this.titleObj)) {
            this.titleObj.focusIn();
        }
    };
    QuickInfoTemplate.prototype.headerTemplate = function (props) {
        return (React.createElement("div", { className: "quick-info-header" },
            React.createElement("div", { className: "quick-info-header-content", style: this.getHeaderStyles(props) },
                React.createElement("div", { className: "quick-info-title" }, this.getHeaderTitle(props)),
                React.createElement("div", { className: "duration-text" }, this.getHeaderDetails(props)))));
    };
    QuickInfoTemplate.prototype.contentTemplate = function (props) {
        var _this = this;
        return (React.createElement("div", { className: "quick-info-content" }, props.elementType === 'cell' ?
            React.createElement("div", { className: "e-cell-content" },
                React.createElement("div", { className: "quick-content-area" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "title", ref: function (textbox) { return _this.titleObj = textbox; }, placeholder: "Title" })),
                React.createElement("div", { className: "quick-content-area" },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "eventType", ref: function (ddl) { return _this.eventTypeObj = ddl; }, dataSource: this.roomData, fields: { text: "Name", value: "Id" }, placeholder: "Choose Type", index: 0, popupHeight: "200px" })),
                React.createElement("div", { className: "quick-content-area" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "notes", ref: function (textbox) { return _this.notesObj = textbox; }, placeholder: "Notes" })))
            :
                React.createElement("div", { className: "event-content" },
                    React.createElement("div", { className: "meeting-type-wrap" },
                        React.createElement("label", null, "Subject"),
                        ":",
                        React.createElement("span", null, props.Subject)),
                    React.createElement("div", { className: "meeting-subject-wrap" },
                        React.createElement("label", null, "Type"),
                        ":",
                        React.createElement("span", null, this.getEventType(props))),
                    React.createElement("div", { className: "notes-wrap" },
                        React.createElement("label", null, "Notes"),
                        ":",
                        React.createElement("span", null, props.Description)))));
    };
    QuickInfoTemplate.prototype.footerTemplate = function (props) {
        return (React.createElement("div", { className: "quick-info-footer" }, props.elementType == "cell" ?
            React.createElement("div", { className: "cell-footer" },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "more-details", cssClass: 'e-flat', content: "More Details", onClick: this.buttonClickActions.bind(this) }),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "add", cssClass: 'e-flat', content: "Add", isPrimary: true, onClick: this.buttonClickActions.bind(this) }))
            :
                React.createElement("div", { className: "event-footer" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "delete", cssClass: 'e-flat', content: "Delete", onClick: this.buttonClickActions.bind(this) }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "more-details", cssClass: 'e-flat', content: "More Details", isPrimary: true, onClick: this.buttonClickActions.bind(this) }))));
    };
    QuickInfoTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: "schedule", cssClass: 'quick-info-template', ref: function (schedule) { return _this.scheduleObj = schedule; }, height: "650px", selectedDate: new Date(2021, 0, 9), eventSettings: { dataSource: this.scheduleData }, quickInfoTemplates: {
                            header: this.headerTemplate.bind(this),
                            content: this.contentTemplate.bind(this),
                            footer: this.footerTemplate.bind(this)
                        }, popupOpen: this.onPopupOpen.bind(this) },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'RoomId', title: 'Room Type', name: 'MeetingRoom', textField: 'Name', idField: 'Id', colorField: 'Color', dataSource: this.roomData })),
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
    return QuickInfoTemplate;
}(sample_base_1.SampleBase));
exports.QuickInfoTemplate = QuickInfoTemplate;
