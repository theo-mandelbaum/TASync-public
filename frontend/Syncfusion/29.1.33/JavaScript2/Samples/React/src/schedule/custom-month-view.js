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
exports.CustomMonthView = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
var sample_base_1 = require("../common/sample-base");
/**
 * Schedule custom month view sample
 */
var CustomMonthView = /** @class */ (function (_super) {
    __extends(CustomMonthView, _super);
    function CustomMonthView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomMonthView.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '650px', eventSettings: { dataSource: (0, helper_1.generateObject)(new Date(2021, 11, 19).getTime(), new Date(2022, 2, 12).getTime(), true) } },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month', displayDate: new Date(2022, 0, 16), numberOfWeeks: 4, maxEventsPerRow: 3 })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases how to customize the starting week of the month, the number of weeks rendered, and the maximum number of events rendered in month view.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, the starting week of the month view is customized by using the ",
                    React.createElement("code", null, "displayDate"),
                    "property. The number of weeks rendered in a month is customized by using the ",
                    React.createElement("code", null, "numberOfWeeks"),
                    "property and the maximum number of events displayed in a single row is customized by using the",
                    React.createElement("code", null, "maxEventsPerRow"),
                    " property. These properties have been configured under the ",
                    React.createElement("code", null, "views"),
                    "property view options. ",
                    React.createElement("code", null, "displayDate"),
                    " and ",
                    React.createElement("code", null, "numberOfWeeks"),
                    " properties can be applicable only for month view. The ",
                    React.createElement("code", null, "maxEventsPerRow"),
                    " property is only applicable for month, timeline, and timeline year views."))));
    };
    return CustomMonthView;
}(sample_base_1.SampleBase));
exports.CustomMonthView = CustomMonthView;
