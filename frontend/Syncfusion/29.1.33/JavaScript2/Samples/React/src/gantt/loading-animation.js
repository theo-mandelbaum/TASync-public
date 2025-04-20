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
exports.LoadingAnimation = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var LoadingAnimation = /** @class */ (function (_super) {
    __extends(LoadingAnimation, _super);
    function LoadingAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterType = [
            { text: 'Shimmer', value: 'Shimmer' },
            { text: 'Spinner', value: 'Spinner' }
        ];
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
        _this.loadingIndicator = {
            indicatorType: 'Shimmer'
        };
        _this.labelSettings = {
            taskLabel: 'Progress'
        };
        return _this;
    }
    LoadingAnimation.prototype.onChange = function (sel) {
        var type = sel.value.toString();
        if (type === "Shimmer") {
            this.ganttInstance.loadingIndicator.indicatorType = "Shimmer";
            this.ganttInstance.enableVirtualMaskRow = true;
            this.ganttInstance.refresh();
        }
        else {
            this.ganttInstance.loadingIndicator.indicatorType = "Spinner";
            this.ganttInstance.enableVirtualMaskRow = false;
            this.ganttInstance.refresh();
        }
    };
    LoadingAnimation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-md-9' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Filtering', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.virtualData, treeColumnIndex: 1, labelSettings: this.labelSettings, allowSelection: true, allowFiltering: true, allowSorting: true, highlightWeekends: true, enableVirtualization: true, taskFields: this.taskFields, splitterSettings: this.splitterSettings, height: '450px', loadingIndicator: this.loadingIndicator },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Filter, ej2_react_gantt_1.Selection, ej2_react_gantt_1.VirtualScroll, ej2_react_gantt_1.Sort] }))),
            React.createElement("div", { className: 'col-md-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingLeft: 0 } },
                                    React.createElement("div", { style: { paddingTop: '10px', paddingLeft: 0 } }, "Indicator Type ")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "113px", id: "seltype", change: this.onChange.bind(this), dataSource: this.filterType, value: "Shimmer" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the loading indicator while initial rendering, refreshing and all gantt action. In this sample, you can change the loading indicators from the properties panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Gantt has an option to show a loading indicator in-between the time of fetching the data and binding it to the gantt during initial rendering, refreshing or while performing action like sorting, filtering and more."),
                React.createElement("p", null, "The Gantt support the following loading indicator types"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Shimmer")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Spinner"))),
                React.createElement("p", null,
                    "Use the loading indicator by setting the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/loadingIndicatorModel/#indicatortype" }, "loadingIndicator.indicatorType"),
                    " property as Spinner or Shimmer. The default value of the indicatorType is Spinner."),
                React.createElement("p", null,
                    "By default ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#enablevirtualmaskrow" }, "enableVirtualMaskRow"),
                    " is set to true which renders Shimmer during virtual scrolling."))));
    };
    return LoadingAnimation;
}(sample_base_1.SampleBase));
exports.LoadingAnimation = LoadingAnimation;
