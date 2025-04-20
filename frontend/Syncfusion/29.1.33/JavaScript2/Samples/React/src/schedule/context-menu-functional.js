"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./context-menu.css");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule Context Menu sample
 */
var ContextMenu = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var menuObj = (0, react_1.useRef)(null);
    var eventObj;
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
    var selectedTarget;
    var menuItems = [
        { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
        { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
        { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
        { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
        {
            text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit', items: [
                { text: 'Edit Occurrence', id: 'EditOccurrence' },
                { text: 'Edit Series', id: 'EditSeries' }
            ]
        },
        { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
        {
            text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash', items: [
                { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
                { text: 'Delete Series', id: 'DeleteSeries' }
            ]
        }
    ];
    var onMenuItemSelect = function (args) {
        var selectedMenuItem = args.item.id;
        if (selectedTarget.classList.contains('e-appointment')) {
            eventObj = scheduleObj.current.getEventDetails(selectedTarget);
        }
        switch (selectedMenuItem) {
            case 'Today':
                scheduleObj.current.selectedDate = new Date();
                break;
            case 'Add':
            case 'AddRecurrence':
                var selectedCells = scheduleObj.current.getSelectedElements();
                var isRightClickInSelectedCells = selectedCells.some(function (cell) { return cell === selectedTarget; });
                var activeCellsData = scheduleObj.current.getCellDetails(isRightClickInSelectedCells ? selectedCells : [selectedTarget]);
                if (selectedMenuItem === 'Add') {
                    scheduleObj.current.openEditor(activeCellsData, 'Add');
                }
                else {
                    scheduleObj.current.openEditor(activeCellsData, 'Add', null, 1);
                }
                break;
            case 'Save':
            case 'EditOccurrence':
            case 'EditSeries':
                if (selectedMenuItem === 'EditSeries') {
                    eventObj = new ej2_data_1.DataManager(scheduleObj.current.eventsData).executeLocal(new ej2_data_1.Query().where(scheduleObj.current.eventFields.id, 'equal', eventObj[scheduleObj.current.eventFields.recurrenceID]))[0];
                }
                scheduleObj.current.openEditor(eventObj, selectedMenuItem);
                break;
            case 'Delete':
                scheduleObj.current.deleteEvent(eventObj);
                break;
            case 'DeleteOccurrence':
            case 'DeleteSeries':
                scheduleObj.current.deleteEvent(eventObj, selectedMenuItem);
                break;
        }
    };
    var onContextMenuBeforeOpen = function (args) {
        var newEventElement = document.querySelector('.e-new-event');
        if (newEventElement) {
            (0, ej2_base_1.remove)(newEventElement);
            (0, ej2_base_1.removeClass)([document.querySelector('.e-selected-cell')], 'e-selected-cell');
        }
        scheduleObj.current.closeQuickInfoPopup();
        var targetElement = args.event.target;
        if ((0, ej2_base_1.closest)(targetElement, '.e-contextmenu')) {
            return;
        }
        selectedTarget = (0, ej2_base_1.closest)(targetElement, '.e-appointment,.e-work-cells,' + '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
        if ((0, ej2_base_1.isNullOrUndefined)(selectedTarget)) {
            args.cancel = true;
            return;
        }
        if (selectedTarget.classList.contains('e-appointment')) {
            eventObj = scheduleObj.current.getEventDetails(selectedTarget);
            if (eventObj.RecurrenceRule) {
                menuObj.current.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                menuObj.current.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
            }
            else {
                menuObj.current.showItems(['Save', 'Delete'], true);
                menuObj.current.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
            }
            return;
        }
        else if ((selectedTarget.classList.contains('e-work-cells') || selectedTarget.classList.contains('e-all-day-cells')) &&
            !selectedTarget.classList.contains('e-selected-cell')) {
            (0, ej2_base_1.removeClass)([].slice.call(scheduleObj.current.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
            selectedTarget.setAttribute('aria-selected', 'true');
            selectedTarget.classList.add('e-selected-cell');
        }
        menuObj.current.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        menuObj.current.showItems(['Add', 'AddRecurrence', 'Today'], true);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '650px', ref: scheduleObj, selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: data } },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda] })))),
        React.createElement(ej2_react_navigations_1.ContextMenuComponent, { cssClass: 'schedule-context-menu', ref: menuObj, target: '.e-schedule', items: menuItems, beforeOpen: onContextMenuBeforeOpen, select: onMenuItemSelect }),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example illustrates how to enable the context menu on Scheduler and perform its related actions based on the selected menu options.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, we have integrated the ContextMenu control separately from application end and set its target to Scheduler control. Also, we have used the public methods ",
                React.createElement("code", null, "openEditor"),
                " through which the default event editor is set to open for saving or updating the appointments, ",
                React.createElement("code", null, "deleteEvent"),
                " to delete the selected appointment, and",
                React.createElement("code", null, "selectedDate"),
                " to navigate to today's date. In mobile devices, the context menu will open when you tap hold on the cells or events."))));
};
exports.default = ContextMenu;
