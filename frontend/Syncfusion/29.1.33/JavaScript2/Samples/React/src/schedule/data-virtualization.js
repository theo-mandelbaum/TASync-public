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
exports.DataVirtualization = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./virtual-scrolling.css");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var helper_1 = require("./helper");
/**
 * schedule virtual scrolling sample
 */
var DataVirtualization = /** @class */ (function (_super) {
    __extends(DataVirtualization, _super);
    function DataVirtualization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataManager = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/VirtualEventData',
            adaptor: new ej2_data_1.WebApiAdaptor,
            crossDomain: true
        });
        return _this;
    }
    DataVirtualization.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', selectedDate: new Date(2023, 3, 1), readonly: true, group: { resources: ['Resources'] }, eventSettings: { dataSource: this.dataManager } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ResourceId', title: 'Resource', name: 'Resources', dataSource: (0, helper_1.generateResourceData)(1, 1000, 'Resource'), textField: 'Text', idField: 'Id', colorField: 'Color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth', isSelected: true, enableLazyLoading: true }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month', enableLazyLoading: true })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Month] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the dynamic retrieval of events on each scroll within the Scheduler. As the content is scrolled, a data-loading request is dispatched to a remote data server. This request specifically aims to load appointments only for the resources currently being displayed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the lazy loading option is enabled in timeline month and month views to load 1000 resources, and data from remote service is bound to the Scheduler using the instance of ",
                    React.createElement("code", null,
                        React.createElement("a", { "aria-label": "Data Manager", target: "_blank", className: 'code', href: "http://ej2.syncfusion.com/documentation/data/api-dataManager.html" }, "DataManager")),
                    ". To enable the on-demand loading of events in the Scheduler, set the ",
                    React.createElement("code", null, "enableLazyLoading"),
                    " property to ",
                    React.createElement("code", null, "true"),
                    " within the view-specific settings."))));
    };
    return DataVirtualization;
}(sample_base_1.SampleBase));
exports.DataVirtualization = DataVirtualization;
