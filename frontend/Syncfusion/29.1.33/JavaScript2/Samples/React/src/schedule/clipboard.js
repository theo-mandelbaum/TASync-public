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
exports.ClipboardSchedule = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
require("./context-menu.css");
var ClipboardSchedule = /** @class */ (function (_super) {
    __extends(ClipboardSchedule, _super);
    function ClipboardSchedule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
        _this.menuItems = [
            { text: 'Cut Event', iconCss: 'e-icons e-cut', id: 'Cut' },
            { text: 'Copy Event', iconCss: 'e-icons e-copy', id: 'Copy' },
            { text: 'Paste', iconCss: 'e-icons e-paste', id: 'Paste' }
        ];
        _this.onContextMenuBeforeOpen = function (args) {
            var newEventElement = document.querySelector('.e-new-event');
            if (newEventElement) {
                (0, ej2_base_1.remove)(newEventElement);
            }
            _this.scheduleObj.closeQuickInfoPopup();
            _this.targetElement = args.event.target;
            if ((0, ej2_base_1.closest)(_this.targetElement, '.e-contextmenu')) {
                return;
            }
            _this.selectedTarget = (0, ej2_base_1.closest)(_this.targetElement, '.e-appointment,.e-work-cells,' +
                '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
            if ((0, ej2_base_1.isNullOrUndefined)(_this.selectedTarget)) {
                args.cancel = true;
                return;
            }
            if (_this.selectedTarget.classList.contains('e-appointment')) {
                _this.menuObj.showItems(['Cut', 'Copy'], true);
                _this.menuObj.hideItems(['Paste'], true);
            }
            else {
                _this.menuObj.showItems(['Paste'], true);
                _this.menuObj.hideItems(['Cut', 'Copy'], true);
            }
        };
        _this.onMenuItemSelect = function (args) {
            var selectedMenuItem = args.item.id;
            switch (selectedMenuItem) {
                case 'Cut':
                    _this.scheduleObj.cut([_this.selectedTarget]);
                    break;
                case 'Copy':
                    _this.scheduleObj.copy([_this.selectedTarget]);
                    break;
                case 'Paste':
                    _this.scheduleObj.paste(_this.targetElement);
                    break;
            }
        };
        return _this;
    }
    ClipboardSchedule.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'content-wrapper' },
                    React.createElement("div", { className: 'schedule-container' },
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '550px', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: this.data }, allowClipboard: true, showQuickInfo: false },
                            React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWorkWeek' }),
                                React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })),
                        React.createElement(ej2_react_navigations_1.ContextMenuComponent, { target: '.e-schedule', items: this.menuItems, beforeOpen: this.onContextMenuBeforeOpen, select: this.onMenuItemSelect, cssClass: 'schedule-context-menu', ref: function (menu) { return _this.menuObj = menu; } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to integrate clipboard functionality (cut, copy, paste) and a custom context menu into the Scheduler control.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the ",
                    React.createElement("code", null, "allowClipboard"),
                    " property is set to ",
                    React.createElement("code", null, "true"),
                    " to enable clipboard functionality. This property allows the following keyboard shortcuts:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("strong", null, "Ctrl + X:"),
                        " To cut the selected appointment from the scheduler."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Ctrl + C:"),
                        " To copy the selected appointment."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Ctrl + V:"),
                        " To paste the cut/copied appointment.")),
                React.createElement("p", null, "Additionally, we have integrated the ContextMenu control separately from the application end and set its target to the Scheduler control. Also, we have used the following Scheduler's public methods in the context menu handlers:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("strong", null, "cut()"),
                        " method to remove the selected appointment."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "copy()"),
                        " method to duplicate the selected appointment."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "paste()"),
                        " method to insert the appointment into the target time slot.")),
                React.createElement("p", null, "On mobile devices, the context menu will open when you tap and hold on the cells or events."))));
    };
    return ClipboardSchedule;
}(sample_base_1.SampleBase));
exports.ClipboardSchedule = ClipboardSchedule;
