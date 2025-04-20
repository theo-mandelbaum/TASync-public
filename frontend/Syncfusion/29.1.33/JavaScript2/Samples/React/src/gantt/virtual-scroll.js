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
exports.Virtualscroll = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Virtualscroll = /** @class */ (function (_super) {
    __extends(Virtualscroll, _super);
    function Virtualscroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            parentID: 'parentID'
        };
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.labelSettings = {
            taskLabel: 'Progress'
        };
        _this.projectStartDate = new Date('04/01/2024');
        _this.projectEndDate = new Date('12/31/2030');
        return _this;
    }
    Virtualscroll.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'SplitTasks', dataSource: data_1.virtualData, treeColumnIndex: 1, labelSettings: this.labelSettings, allowSelection: true, highlightWeekends: true, enableVirtualization: true, enableTimelineVirtualization: true, taskFields: this.taskFields, splitterSettings: this.splitterSettings, height: '450px', projectEndDate: this.projectEndDate, projectStartDate: this.projectStartDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.VirtualScroll] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Virtual Scroll support in the Gantt Chart. This feature allows users to load a large amount of data effectively. It also reduces the DOM element's weight by virtually updating DOM during the vertical scroll and also in timeline during horizontal scroll.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Virtualization support is used to render large number tasks in Gantt with effective performance. In this mode all the tasks are fetched from data source initially, then some of the records are rendered in DOM which are compact to the current viewport area. While scrolling tasks are updated in DOM as per current viewport position. This mode can be enabled by setting",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#enablevirtualization" }, "enableVirtualization"),
                    " property as true. Additionally, the Gantt component now includes the timeline virtualization feature by setting the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#enabletimelinevirtualization" }, "enableTimelineVirtualization"),
                    " to true."),
                React.createElement("p", null, "This demo highlights the utilization of row and timeline virtualization features within the Gantt."),
                React.createElement("p", null,
                    "By default during Virtual scroll Shimmer effect is enabled you can disable this by changing ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#enablevirtualmaskrow" }, "enableVirtualMaskRow"),
                    " to false"))));
    };
    return Virtualscroll;
}(sample_base_1.SampleBase));
exports.Virtualscroll = Virtualscroll;
