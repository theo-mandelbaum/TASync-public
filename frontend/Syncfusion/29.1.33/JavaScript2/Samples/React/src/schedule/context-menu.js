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
exports.ContextMenu = void 0;
var React = require("react");
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
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
        _this.menuItems = [
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
        return _this;
    }
    ContextMenu.prototype.onMenuItemSelect = function (args) {
        var _this = this;
        var selectedMenuItem = args.item.id;
        if (this.selectedTarget.classList.contains('e-appointment')) {
            this.eventObj = this.scheduleObj.getEventDetails(this.selectedTarget);
        }
        switch (selectedMenuItem) {
            case 'Today':
                this.scheduleObj.selectedDate = new Date();
                break;
            case 'Add':
            case 'AddRecurrence':
                var selectedCells = this.scheduleObj.getSelectedElements();
                var isRightClickInSelectedCells = selectedCells.some(function (cell) { return cell === _this.selectedTarget; });
                var activeCellsData = this.scheduleObj.getCellDetails(isRightClickInSelectedCells ? selectedCells : [this.selectedTarget]);
                if (selectedMenuItem === 'Add') {
                    this.scheduleObj.openEditor(activeCellsData, 'Add');
                }
                else {
                    this.scheduleObj.openEditor(activeCellsData, 'Add', null, 1);
                }
                break;
            case 'Save':
            case 'EditOccurrence':
            case 'EditSeries':
                if (selectedMenuItem === 'EditSeries') {
                    this.eventObj = new ej2_data_1.DataManager(this.scheduleObj.eventsData).executeLocal(new ej2_data_1.Query().where(this.scheduleObj.eventFields.id, 'equal', this.eventObj[this.scheduleObj.eventFields.recurrenceID]))[0];
                }
                this.scheduleObj.openEditor(this.eventObj, selectedMenuItem);
                break;
            case 'Delete':
                this.scheduleObj.deleteEvent(this.eventObj);
                break;
            case 'DeleteOccurrence':
            case 'DeleteSeries':
                this.scheduleObj.deleteEvent(this.eventObj, selectedMenuItem);
                break;
        }
    };
    ContextMenu.prototype.onContextMenuBeforeOpen = function (args) {
        var newEventElement = document.querySelector('.e-new-event');
        if (newEventElement) {
            (0, ej2_base_1.remove)(newEventElement);
            (0, ej2_base_1.removeClass)([document.querySelector('.e-selected-cell')], 'e-selected-cell');
        }
        this.scheduleObj.closeQuickInfoPopup();
        var targetElement = args.event.target;
        if ((0, ej2_base_1.closest)(targetElement, '.e-contextmenu')) {
            return;
        }
        this.selectedTarget = (0, ej2_base_1.closest)(targetElement, '.e-appointment,.e-work-cells,' +
            '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
        if ((0, ej2_base_1.isNullOrUndefined)(this.selectedTarget)) {
            args.cancel = true;
            return;
        }
        if (this.selectedTarget.classList.contains('e-appointment')) {
            this.eventObj = this.scheduleObj.getEventDetails(this.selectedTarget);
            if (this.eventObj.RecurrenceRule) {
                this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
            }
            else {
                this.menuObj.showItems(['Save', 'Delete'], true);
                this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
            }
            return;
        }
        else if ((this.selectedTarget.classList.contains('e-work-cells') || this.selectedTarget.classList.contains('e-all-day-cells')) &&
            !this.selectedTarget.classList.contains('e-selected-cell')) {
            (0, ej2_base_1.removeClass)([].slice.call(this.scheduleObj.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
            this.selectedTarget.setAttribute('aria-selected', 'true');
            this.selectedTarget.classList.add('e-selected-cell');
        }
        this.menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        this.menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
    };
    ContextMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '650px', ref: function (t) { return _this.scheduleObj = t; }, selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: this.data } },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda] })))),
            React.createElement(ej2_react_navigations_1.ContextMenuComponent, { cssClass: 'schedule-context-menu', ref: function (menu) { return _this.menuObj = menu; }, target: '.e-schedule', items: this.menuItems, beforeOpen: this.onContextMenuBeforeOpen.bind(this), select: this.onMenuItemSelect.bind(this) }),
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
    return ContextMenu;
}(sample_base_1.SampleBase));
exports.ContextMenu = ContextMenu;
