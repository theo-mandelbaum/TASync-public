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
exports.Filtering = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var Filtering = /** @class */ (function (_super) {
    __extends(Filtering, _super);
    function Filtering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterType = [
            { text: 'Menu', value: 'Menu' },
            { text: 'Excel', value: 'Excel' }
        ];
        _this.modes = [
            { text: 'Parent', value: 'Parent' },
            { text: 'Child', value: 'Child' },
            { text: 'Both', value: 'Both' },
            { text: 'None', value: 'None' },
        ];
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.projectStartDate = new Date('07/16/2024 01:00:00 AM');
        _this.projectEndDate = new Date('07/25/2024');
        _this.timelineSettings = {
            timelineUnitSize: 60,
            topTier: {
                format: 'MMM dd, yyyy',
                unit: 'Day',
            },
            bottomTier: {
                unit: 'Hour',
                format: 'h.mm a'
            },
        };
        _this.splitterSettings = {
            columnIndex: 3
        };
        _this.dayWorkingTime = [{ from: 0, to: 24 }];
        _this.labelSettings = {
            rightLabel: 'TaskName'
        };
        return _this;
    }
    Filtering.prototype.onChange = function (sel) {
        var type = sel.value.toString();
        this.ganttInstance.filterSettings.type = type;
        this.ganttInstance.clearFiltering();
    };
    Filtering.prototype.onChange2 = function (sel) {
        var mode = sel.value.toString();
        this.ganttInstance.filterSettings.hierarchyMode = mode;
        this.ganttInstance.clearFiltering();
    };
    Filtering.prototype.actionCompleteEvent = function (args) {
        if (args.requestType == "filterafteropen" && (args.columnName === "StartDate" || args.columnName === "EndDate")
            && this.ganttInstance.filterSettings.type === "Menu") {
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(2024, 5, 1);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(2024, 8, 30);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].showTodayButton = false;
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
        }
    };
    Filtering.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-md-9' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Filtering', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.filteredData, durationUnit: 'Hour', treeColumnIndex: 0, allowFiltering: true, includeWeekend: true, allowSorting: true, dateFormat: 'MM/dd/yyyy hh:mm:ss', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, timelineSettings: this.timelineSettings, splitterSettings: this.splitterSettings, labelSettings: this.labelSettings, filterSettings: { type: 'Menu', hierarchyMode: 'Parent' }, dayWorkingTime: this.dayWorkingTime, height: '410px', actionComplete: this.actionCompleteEvent.bind(this) },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', headerText: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Predecessor' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Filter, ej2_react_gantt_1.Selection] })),
                React.createElement("div", { style: { float: 'right', margin: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Apollo_11#Launch_and_flight_to_lunar_orbit", target: '_blank' }, "https://en.wikipedia.org/"))),
            React.createElement("div", { className: 'col-md-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { style: { paddingTop: '10px' } }, " Filter Type ")),
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "100px", id: "seltype", change: this.onChange.bind(this), dataSource: this.filterType, value: "Menu" })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { style: { paddingTop: '10px' } }, " Hierarchy Mode ")),
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "100px", id: "selmode", change: this.onChange2.bind(this), dataSource: this.modes, value: "Parent" }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the manned lunar mission, which landed the first human on the Moon using the Apollo 11 spacecraft in the year 1969. This sample demonstrates the Filtering feature available in Gantt chart. You can filter a particular column using filter menu available in the columns. This sample is also enabled with toolbar searching option, using which you can filter the Gantt content across all the columns.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The filtering feature enables the user to view reduced amount of records based on filter criteria. The column menu filtering can be enabled by setting ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowfiltering" }, "allowFiltering"),
                    " property as ",
                    React.createElement("code", null, "true"),
                    " and toolbar search box can be enabled by including the search item in the ",
                    React.createElement("code", null, "toolbar"),
                    " property.",
                    React.createElement("p", null, "Gantt supports the following filter types. They are "),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Menu")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Excel"))),
                    "Gantt chart also provides support for a set of filtering modes with ",
                    React.createElement("code", null, "hierarchyMode"),
                    " property. The below are the type of filter mode available in Gantt chart.",
                    React.createElement("li", null,
                        React.createElement("code", null, "Parent"),
                        " - This is the default filter hierarchy mode in Gantt chart. The filtered records are displayed with its parent records, if the filtered records not have any parent record then the filtered record alone will be displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Child"),
                        " - The filtered records are displayed with its child record, if the filtered records do not have any child record then only the filtered records are displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - The filtered records are displayed with its both parent and child record. If the filtered records do not have any parent and child record then only the filtered records are displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Only the filtered records are displayed.")),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use filtering feature, we need to inject ",
                    React.createElement("code", null, "Filter"),
                    " module, and use the toolbar support we need to inject ",
                    React.createElement("code", null, "Toolbar"),
                    " module. To use a selection, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module."))));
    };
    return Filtering;
}(sample_base_1.SampleBase));
exports.Filtering = Filtering;
