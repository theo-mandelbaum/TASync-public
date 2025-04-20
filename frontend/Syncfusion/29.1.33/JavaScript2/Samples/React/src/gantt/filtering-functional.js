"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var Filtering = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var filterType = [
        { text: 'Menu', value: 'Menu' },
        { text: 'Excel', value: 'Excel' }
    ];
    var modes = [
        { text: 'Parent', value: 'Parent' },
        { text: 'Child', value: 'Child' },
        { text: 'Both', value: 'Both' },
        { text: 'None', value: 'None' },
    ];
    var onChange = function (sel) {
        var type = sel.value.toString();
        ganttInstance.current.filterSettings.type = type;
        ganttInstance.current.clearFiltering();
    };
    var onChange2 = function (sel) {
        var mode = sel.value.toString();
        ganttInstance.current.filterSettings.hierarchyMode = mode;
        ganttInstance.current.clearFiltering();
    };
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var projectStartDate = new Date('07/16/2024 01:00:00 AM');
    var projectEndDate = new Date('07/25/2024');
    var timelineSettings = {
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
    var splitterSettings = {
        columnIndex: 3
    };
    var dayWorkingTime = [{ from: 0, to: 24 }];
    var labelSettings = {
        rightLabel: 'TaskName'
    };
    var actionCompleteEvent = function (args) {
        if (args.requestType == "filterafteropen" && (args.columnName === "StartDate" || args.columnName === "EndDate")
            && ganttInstance.current.filterSettings.type === "Menu") {
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(2024, 5, 1);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(2024, 8, 30);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].showTodayButton = false;
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-md-9' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Filtering', ref: ganttInstance, dataSource: data_1.filteredData, durationUnit: 'Hour', treeColumnIndex: 0, allowFiltering: true, includeWeekend: true, allowSorting: true, dateFormat: 'MM/dd/yyyy hh:mm:ss', projectStartDate: projectStartDate, projectEndDate: projectEndDate, taskFields: taskFields, timelineSettings: timelineSettings, splitterSettings: splitterSettings, labelSettings: labelSettings, filterSettings: { type: 'Menu', hierarchyMode: 'Parent' }, dayWorkingTime: dayWorkingTime, height: '410px', actionComplete: actionCompleteEvent.bind(_this) },
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
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { style: { paddingTop: '10px' } }, " Filter Type ")),
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "100px", id: "seltype", change: onChange.bind(_this), dataSource: filterType, value: "Menu" })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { style: { paddingTop: '10px' } }, " Hierarchy Mode ")),
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "100px", id: "selmode", change: onChange2.bind(_this), dataSource: modes, value: "Parent" })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the manned lunar mission, which landed the first human on the Moon using the Apollo 11 spacecraft in the year 1969. This sample demonstrates the Filtering feature available in Gantt chart. You can filter a particular column using filter menu available in the columns. This sample is also enabled with toolbar searching option, using which you can filter the Gantt content across all the columns.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The filtering feature enables the user to view a reduced amount of records based on filter criteria. The column menu filtering can be enabled by setting ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowfiltering" }, "allowFiltering"),
                " property as ",
                React.createElement("code", null, "true"),
                ", and the toolbar search box can be enabled by including the search item in the ",
                React.createElement("code", null, "toolbar"),
                " property."),
            React.createElement("div", null,
                React.createElement("p", null, "Gantt supports the following filter types. They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Menu")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Excel")))),
            React.createElement("div", null,
                "Gantt chart also provides support for a set of filtering modes with the ",
                React.createElement("code", null, "hierarchyMode"),
                " property. The following are the types of filter modes available in Gantt chart:",
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Parent"),
                        " - This is the default filter hierarchy mode in Gantt chart. The filtered records are displayed with their parent records. If the filtered records do not have any parent record, then the filtered record alone will be displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Child"),
                        " - The filtered records are displayed with their child records. If the filtered records do not have any child record, then only the filtered records are displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - The filtered records are displayed with both parent and child records. If the filtered records do not have any parent or child record, then only the filtered records are displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Only the filtered records are displayed."))),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use the filtering feature, inject the ",
                React.createElement("code", null, "Filter"),
                " module. To enable toolbar support, inject the ",
                React.createElement("code", null, "Toolbar"),
                " module. To enable selection, inject the ",
                React.createElement("code", null, "Selection"),
                " module."))));
};
exports.default = Filtering;
