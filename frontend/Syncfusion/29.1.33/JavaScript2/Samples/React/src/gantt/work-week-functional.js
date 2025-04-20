"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var emptyCss = "\n.property-panel-table div {\n  padding-top: 0px}";
var WorkWeek = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var multiselectObj = (0, react_1.useRef)(null);
    var workDays = [
        { id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' },
    ];
    var defaultValue = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var select = function (args) {
        var workingDays = (0, ej2_base_1.extend)([], multiselectObj.current.value, [], true);
        workingDays.push(args.itemData.day);
        ganttInstance.current.workWeek = workingDays;
    };
    var removed = function (args) {
        var index = ganttInstance.current.workWeek.indexOf(args.itemData.day);
        if (index !== -1) {
            ganttInstance.current.workWeek = multiselectObj.current.value;
        }
    };
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var workWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('07/06/2024');
    var splitterSettings = {
        columnIndex: 1
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'WorkWeek', ref: ganttInstance, dataSource: data_1.projectNewData, treeColumnIndex: 1, highlightWeekends: true, taskFields: taskFields, labelSettings: labelSettings, splitterSettings: splitterSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                        React.createElement("colgroup", null,
                            React.createElement("col", { style: { width: '30%' } }),
                            React.createElement("col", { style: { width: '70%' } })),
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        React.createElement("label", { htmlFor: "WorkWeek" }, "Working Days"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { style: { paddingTop: '0px' } },
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: multiselectObj, id: "WorkWeek", style: { padding: '2px' }, mode: "CheckBox", value: defaultValue, dataSource: workDays, showDropDownIcon: true, popupHeight: '350px', fields: { text: 'day', value: 'id' }, select: select.bind(_this), removed: removed.bind(_this) },
                                            React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))))))))),
        React.createElement("style", null, emptyCss),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the support for changing different set of working days in a week. The selected working days in drop down list will be applied to Gantt chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render a Gantt chart with the provided data source and customizable array of working days. These working days alone will be considered for taskbar rendering and duration calculations."),
            React.createElement("p", null,
                "The working days in your project can be customized using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#workweek" }, "workWeek"),
                " property and the selected days in the dropdown list available in the property panel will be applied to Gantt chart. You can get to know the working days in the Gantt chart timeline by the highlighted weekend days. This can be enabled by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#highlightweekends" }, "highlightWeekends"),
                " property"),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the",
                React.createElement("code", null, "Selection"),
                ", ",
                React.createElement("code", null, "DayMarkers"),
                " modules."))));
};
exports.default = WorkWeek;
