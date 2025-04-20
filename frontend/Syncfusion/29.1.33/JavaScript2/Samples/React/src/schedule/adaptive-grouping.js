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
exports.AdaptiveGrouping = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./custom-view.css");
var dataSource = require("./datasource.json");
/**
 *  Schedule adaptive grouping sample
 */
var AdaptiveGrouping = /** @class */ (function (_super) {
    __extends(AdaptiveGrouping, _super);
    function AdaptiveGrouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.resourceData.concat(dataSource.timelineResourceData), null, true);
        _this.projectData = [
            { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
            { text: 'PROJECT 2', id: 2, color: '#56ca85' },
            { text: 'PROJECT 3', id: 3, color: '#df5286' }
        ];
        _this.categoryData = [
            { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
            { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
            { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
            { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
            { text: 'Michael', id: 5, groupId: 3, color: '#df5286' },
            { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
        ];
        _this.group = { resources: ['Projects', 'Categories'] };
        return _this;
    }
    AdaptiveGrouping.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper schedule-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', id: 'schedule', selectedDate: new Date(2023, 0, 4), group: this.group, enableAdaptiveUI: true, currentView: 'Month', eventSettings: { dataSource: this.data } },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ProjectId', title: 'Choose Project', name: 'Projects', allowMultiple: false, dataSource: this.projectData, textField: 'text', idField: 'id', colorField: 'color' }),
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Category', name: 'Categories', allowMultiple: true, dataSource: this.categoryData, textField: 'text', idField: 'id', groupIDField: 'groupId', colorField: 'color' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Year, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo showcases how multiple resources are grouped in compact view and how events are portrayed in the scheduler view layouts.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, we have showcased the Schedule views and resource grouping in the compact view mode with the help of the ",
                    React.createElement("code", null, "enableAdaptiveUI"),
                    " property. In Scheduler view, only one resource has been shown to enhance the view experience of resource events details clearly."))));
    };
    return AdaptiveGrouping;
}(sample_base_1.SampleBase));
exports.AdaptiveGrouping = AdaptiveGrouping;
