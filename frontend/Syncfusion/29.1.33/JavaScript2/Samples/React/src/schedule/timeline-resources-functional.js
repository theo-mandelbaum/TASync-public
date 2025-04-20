"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./timeline-resources.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule room scheduler sample
 */
var TimelineResource = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.roomData, null, true);
    var scheduleObj = (0, react_1.useRef)(null);
    var ownerData = [
        { text: 'Jammy', id: 1, color: '#ea7a57', capacity: 20, type: 'Conference' },
        { text: 'Tweety', id: 2, color: '#7fa900', capacity: 7, type: 'Cabin' },
        { text: 'Nestle', id: 3, color: '#5978ee', capacity: 5, type: 'Cabin' },
        { text: 'Phoenix', id: 4, color: '#fec200', capacity: 15, type: 'Conference' },
        { text: 'Mission', id: 5, color: '#df5286', capacity: 25, type: 'Conference' },
        { text: 'Hangout', id: 6, color: '#00bdae', capacity: 10, type: 'Cabin' },
        { text: 'Rick Roll', id: 7, color: '#865fcf', capacity: 20, type: 'Conference' },
        { text: 'Rainbow', id: 8, color: '#1aaa55', capacity: 8, type: 'Cabin' },
        { text: 'Swarm', id: 9, color: '#df5286', capacity: 30, type: 'Conference' },
        { text: 'Photogenic', id: 10, color: '#710193', capacity: 25, type: 'Conference' }
    ];
    var getRoomName = function (value) {
        return value.resourceData[value.resource.textField];
    };
    var getRoomType = function (value) {
        return value.resourceData.type;
    };
    var getRoomCapacity = function (value) {
        return value.resourceData.capacity;
    };
    var isReadOnly = function (endDate) {
        return (endDate < new Date(2021, 6, 31, 0, 0));
    };
    var resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "room-name" }, getRoomName(props)),
            React.createElement("div", { className: "room-type" }, getRoomType(props)),
            React.createElement("div", { className: "room-capacity" }, getRoomCapacity(props))));
    };
    var onActionBegin = function (args) {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            var data_1 = args.data instanceof Array ? args.data[0] : args.data;
            args.cancel = !scheduleObj.current.isSlotAvailable(data_1);
        }
    };
    var onEventRendered = function (args) {
        var data = args.data;
        if (isReadOnly(data.EndTime)) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only');
        }
    };
    var onRenderCell = function (args) {
        if (args.element.classList.contains('e-work-cells')) {
            if (args.date < new Date(2021, 6, 31, 0, 0)) {
                args.element.setAttribute('aria-readonly', 'true');
                args.element.classList.add('e-read-only-cells');
            }
        }
        if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
            var target = args.element.querySelector('.e-resource-text');
            target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
        }
    };
    var onPopupOpen = function (args) {
        var data = args.data;
        if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
            var target = (args.type === 'RecurrenceAlert' ||
                args.type === 'DeleteAlert') ? args.element[0] : args.target;
            if (!(0, ej2_base_1.isNullOrUndefined)(target) && target.classList.contains('e-work-cells')) {
                if ((target.classList.contains('e-read-only-cells')) ||
                    (!scheduleObj.current.isSlotAvailable(data))) {
                    args.cancel = true;
                }
            }
            else if (!(0, ej2_base_1.isNullOrUndefined)(target) && target.classList.contains('e-appointment') &&
                (isReadOnly(data.EndTime))) {
                args.cancel = true;
            }
        }
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'timeline-resource', ref: scheduleObj, width: '100%', height: '650px', selectedDate: new Date(2021, 7, 2), workHours: { start: '08:00', end: '18:00' }, timeScale: { interval: 60, slotCount: 1 }, resourceHeaderTemplate: resourceHeaderTemplate, eventSettings: { dataSource: data, fields: { id: 'Id', subject: { title: 'Summary', name: 'Subject' }, location: { title: 'Location', name: 'Location' }, description: { title: 'Comments', name: 'Description' }, startTime: { title: 'From', name: 'StartTime' }, endTime: { title: 'To', name: 'EndTime' } } }, eventRendered: onEventRendered, popupOpen: onPopupOpen, actionBegin: onActionBegin, renderCell: onRenderCell, group: { enableCompactView: false, resources: ['MeetingRoom'] } },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'RoomId', title: 'Room Type', name: 'MeetingRoom', allowMultiple: true, dataSource: ownerData, textField: 'text', idField: 'id', colorField: 'color' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demo showcases the scheduler that lists out the meeting rooms of an office and its availability. The slots which are already booked and the lunch time can\u2019t be allowed for any new bookings. Also, the existing bookings which were made on past dates were not allowed to edit as well as the new bookings on those past dates will also be not allowed.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Here, the timeline view is grouped with single level of resources by making use of the ",
                React.createElement("code", null, "group"),
                " property. Also, the lunch time blocking is done by block event. The event editor and popup is prevented to open on those blocked time slots as well as on the past bookings by making use of the ",
                React.createElement("code", null, "popupOpen"),
                " event. The ",
                React.createElement("code", null, "eventRendered"),
                " event is utilized in order to make the bookings done on past dates as read-only. To block more than one bookings per slot, the ",
                React.createElement("code", null, "isSlotAvailable"),
                " method is used. Also, the resource header displayed at the left panel is customized to render as columns with the help of ",
                React.createElement("code", null, "resourceHeaderTemplate"),
                ". The tooltip for resource header is customized by defining the",
                React.createElement("code", null, "headerTooltipTemplate"),
                " property within the ",
                React.createElement("code", null, "group"),
                " API."),
            React.createElement("p", null,
                React.createElement("b", null, "Note:"),
                " The dates which lies beyond the current date set to scheduler through ",
                React.createElement("code", null, "selectedDate"),
                " property is considered as the past dates here in this sample."))));
};
exports.default = TimelineResource;
