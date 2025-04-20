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
exports.GroupByDate = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
/**
 * schedule resources group-bydate sample
 */
var GroupByDate = /** @class */ (function (_super) {
    __extends(GroupByDate, _super);
    function GroupByDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.resourceData, null, true);
        _this.resourceData = [
            { text: 'Alice', id: 1, color: '#1aaa55', workDays: [1, 2, 3, 4] },
            { text: 'Smith', id: 2, color: '#7fa900', workDays: [2, 3, 5] }
        ];
        return _this;
    }
    GroupByDate.prototype.onChange = function (args) {
        if (args.checked) {
            this.scheduleObj.group.hideNonWorkingDays = true;
        }
        else {
            this.scheduleObj.group.hideNonWorkingDays = false;
        }
    };
    GroupByDate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Hide non working days', change: this.onChange.bind(this) }),
                    React.createElement("br", null),
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: function (schedule) { return _this.scheduleObj = schedule; }, width: '100%', height: '650px', selectedDate: new Date(2023, 0, 6), eventSettings: {
                            dataSource: this.data, fields: {
                                subject: { title: 'Task', name: 'Subject' },
                                location: { title: 'Project Name', name: 'Location' },
                                description: { title: 'Comments', name: 'Description' }
                            }
                        }, group: { byDate: true, hideNonWorkingDays: true, resources: ['Owners'] } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Assignee', name: 'Owners', allowMultiple: true, dataSource: this.resourceData, textField: 'text', idField: 'id', colorField: 'color', workDaysField: 'workDays' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo illustrates the daily tasks of two employees grouped by date-wise.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, there are 2 resources defined namely ",
                    React.createElement("strong", null, "Alice"),
                    " and ",
                    React.createElement("strong", null, "Smith"),
                    " under the resource",
                    React.createElement("code", null, "dataSource"),
                    ". The Scheduler can be switched to group by date, by setting ",
                    React.createElement("code", null, "true"),
                    " to the option",
                    React.createElement("code", null, "byDate"),
                    " within the ",
                    React.createElement("code", null, "group"),
                    " property."),
                React.createElement("p", null,
                    "The different work days for the each resources are provided by using the ",
                    React.createElement("code", null, "workDaysField"),
                    " property and the Scheduler will be displayed the provided dates alone when ",
                    React.createElement("code", null, "hideNonWorkingDays"),
                    " property set as ",
                    React.createElement("code", null, "true"),
                    "."))));
    };
    return GroupByDate;
}(sample_base_1.SampleBase));
exports.GroupByDate = GroupByDate;
