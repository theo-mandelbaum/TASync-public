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
exports.InlineEditing = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule inline editing sample
 */
var InlineEditing = /** @class */ (function (_super) {
    __extends(InlineEditing, _super);
    function InlineEditing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.resourceData.concat(dataSource.timelineResourceData), null, true);
        _this.workDays = [0, 1, 2, 3, 4, 5];
        _this.categoriesData = [
            { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
            { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
            { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
            { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
            { text: 'Michael', id: 5, groupId: 3, color: '#df5286' }
        ];
        return _this;
    }
    InlineEditing.prototype.onEventRendered = function (args) {
        var categoryColor = args.data.CategoryColor;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            args.element.style.backgroundColor = categoryColor;
        }
    };
    InlineEditing.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (t) { return _this.scheduleObj = t; }, cssClass: 'inline-edit', workDays: this.workDays, currentView: 'TimelineWeek', allowInline: true, selectedDate: new Date(2023, 0, 4), eventSettings: { dataSource: this.data }, group: { resources: ['Categories'] }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Category', name: 'Categories', allowMultiple: true, dataSource: this.categoriesData, textField: 'text', idField: 'id', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Resize] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo shows the experience of adding a new appointment or editing the existing appointment through inline mode. Click on the cells to add an appointment with the subject alone and click on the appointment to edit the subject of the appointment.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The features enable user to add or edit the appointment through inline mode. Click on the cells or the existing appointments to enable inline mode. You can press the ENTER key on the selected cell or appointment."),
                React.createElement("p", null,
                    "The feature activates when you enable the ",
                    React.createElement("code", null, "allowInline"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null, "For adding an appointment, the appointment will be created based on the selected time and subject once you focused-out or press ENTER key."),
                    React.createElement("li", null, "For editing an appointment, the appointment will be saved based on the modified subject.")))));
    };
    return InlineEditing;
}(sample_base_1.SampleBase));
exports.InlineEditing = InlineEditing;
