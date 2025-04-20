"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Timeline = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskFields = {
        id: 'taskID',
        name: 'taskName',
        startDate: 'startDate',
        endDate: 'endDate',
        duration: 'duration',
        progress: 'progress',
        dependency: 'predecessor',
        child: 'subtasks'
    };
    var ganttInstance = (0, react_1.useRef)(null);
    var topTierformat = (0, react_1.useRef)(null);
    var bottomTierformat = (0, react_1.useRef)(null);
    var topTierCheckbox = (0, react_1.useRef)(null);
    var bottomTierCheckbox = (0, react_1.useRef)(null);
    var topTierUnit = (0, react_1.useRef)(null);
    var bottomTierUnit = (0, react_1.useRef)(null);
    var topTierCount = (0, react_1.useRef)(null);
    var bottomTierCount = (0, react_1.useRef)(null);
    var timelineUnitSize = (0, react_1.useRef)(null);
    var multitaskbarcheckbox = (0, react_1.useRef)(null);
    var projectStartDate = new Date('02/03/2024');
    var projectEndDate = new Date('03/23/2024');
    var timelineSettings = {
        topTier: {
            format: 'MMM dd, yyyy',
            unit: 'Week',
        },
        bottomTier: {
            unit: 'Day',
        }
    };
    var labelSettings = {
        rightLabel: 'taskName'
    };
    var splitterSettings = {
        columnIndex: 1
    };
    var yearformat = [
        { id: 'MMM "yy', format: 'Jan "18' },
        { id: 'y', format: '2018' },
        { id: 'MMMM, y', format: 'January, 18' },
    ];
    var monthformat = [
        { id: 'MMM dd, yyyy', format: 'Jan 01, 2018' },
        { id: 'MMMM', format: 'January' },
        { id: 'MMM', format: 'Jan' },
    ];
    var weekformat = [
        { id: 'MMM dd, yyyy', format: 'Jan 01, 2019' },
        { id: 'EEE MMM dd, "yy', format: 'Mon Jan 01, "19' },
        { id: 'EEE MMM dd', format: 'Mon Jan 01' },
    ];
    var dayformat = [
        { id: '', format: 'M' },
        { id: 'EEE', format: 'Mon' },
        { id: 'dd', format: '01' },
    ];
    var hourformat = [
        { id: 'hh', format: '00' },
        { id: 'hh : mm a', format: '00 : 00 AM' },
        { id: 'h : mm a', format: '0 : 00 AM' },
    ];
    var unit = [
        { id: 'Year', unit: 'Year' },
        { id: 'Month', unit: 'Month' },
        { id: 'Week', unit: 'Week' },
        { id: 'Day', unit: 'Day' },
        { id: 'Hour', unit: 'Hour' }
    ];
    var multitaskbarCheck = function (props) {
        if (multitaskbarcheckbox.current.checked) {
            ganttInstance.current.enableMultiTaskbar = true;
        }
        else {
            ganttInstance.current.enableMultiTaskbar = false;
        }
    };
    var topTierCick = function (props) {
        if (topTierCheckbox.current.checked) {
            ganttInstance.current.timelineSettings.topTier.unit = 'Week';
            topTierCount.current.enabled = true;
            topTierformat.current.enabled = true;
            topTierUnit.current.enabled = true;
        }
        else {
            ganttInstance.current.timelineSettings.topTier.unit = 'None';
            topTierCount.current.enabled = false;
            topTierformat.current.enabled = false;
            topTierUnit.current.enabled = false;
        }
    };
    var bottomTierCick = function (props) {
        if (bottomTierCheckbox.current.checked) {
            ganttInstance.current.timelineSettings.bottomTier.unit = 'Day';
            bottomTierCount.current.enabled = true;
            bottomTierformat.current.enabled = true;
            bottomTierUnit.current.enabled = true;
        }
        else {
            ganttInstance.current.timelineSettings.bottomTier.unit = 'None';
            bottomTierCount.current.enabled = false;
            bottomTierformat.current.enabled = false;
            bottomTierUnit.current.enabled = false;
        }
    };
    var topTierCountchange = function (e) {
        var count = e.value;
        ganttInstance.current.timelineSettings.topTier.count = count;
    };
    var bottomTierCountchange = function (e) {
        var count = e.value;
        ganttInstance.current.timelineSettings.bottomTier.count = count;
    };
    var topUnitChange = function (e) {
        var unit = e.value;
        ganttInstance.current.timelineSettings.topTier.unit = unit;
        if (unit === 'Year') {
            topTierformat.current.dataSource = yearformat;
        }
        else if (unit === 'Month') {
            topTierformat.current.dataSource = monthformat;
        }
        else if (unit === 'Week') {
            topTierformat.current.dataSource = weekformat;
        }
        else if (unit === 'Day') {
            topTierformat.current.dataSource = dayformat;
        }
        else {
            topTierformat.current.dataSource = hourformat;
        }
        topTierformat.current.refresh();
        updateUnitWidth(unit, 'top');
        ganttInstance.current.timelineSettings.topTier.unit = unit;
    };
    var bottomUnitChange = function (e) {
        var unit = e.value;
        ganttInstance.current.timelineSettings.bottomTier.unit = unit;
        if (unit === 'Year') {
            bottomTierformat.current.dataSource = yearformat;
        }
        else if (unit === 'Month') {
            bottomTierformat.current.dataSource = monthformat;
        }
        else if (unit === 'Week') {
            bottomTierformat.current.dataSource = weekformat;
        }
        else if (unit === 'Day') {
            bottomTierformat.current.dataSource = dayformat;
        }
        else {
            bottomTierformat.current.dataSource = hourformat;
        }
        bottomTierformat.current.refresh();
        updateUnitWidth(unit, 'bottom');
        ganttInstance.current.timelineSettings.bottomTier.unit = unit;
    };
    var bottomFormatChange = function (e) {
        var format = e.value;
        ganttInstance.current.timelineSettings.bottomTier.format = format.toString();
    };
    var topFormatChange = function (e) {
        var format = e.value;
        ganttInstance.current.timelineSettings.topTier.format = format.toString();
    };
    var unitWidth = function (e) {
        var width = e.value;
        ganttInstance.current.timelineSettings.timelineUnitSize = width;
    };
    var unitField = { text: 'unit', value: 'id' };
    var formatField = { text: 'format', value: 'id' };
    var updateUnitWidth = function (unit, tier) {
        var topUnit = tier === 'top' ? unit : ganttInstance.current.timelineSettings.topTier.unit;
        var bottomUnit = tier === 'bottom' ? unit : ganttInstance.current.timelineSettings.bottomTier.unit;
        var units = ['None', 'Hour', 'Day', 'Week', 'Month', 'Year'];
        var bootomCellUnit;
        var unitWidth;
        if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = 'Day';
        }
        else if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) > 0) {
            bootomCellUnit = bottomUnit;
        }
        else if (units.indexOf(topUnit) > 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = topUnit;
        }
        else if (units.indexOf(topUnit) <= units.indexOf(bottomUnit)) {
            bootomCellUnit = topUnit;
        }
        else {
            bootomCellUnit = bottomUnit;
        }
        if (bootomCellUnit === 'Year') {
            unitWidth = 2000;
        }
        else if (bootomCellUnit === 'Month') {
            unitWidth = 300;
        }
        else if (bootomCellUnit === 'Week') {
            unitWidth = 150;
        }
        else if (bootomCellUnit === 'Day') {
            unitWidth = 33;
        }
        else if (bootomCellUnit === 'Hour') {
            unitWidth = 25;
        }
        timelineUnitSize.current.value = unitWidth;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Timeline', ref: ganttInstance, dataSource: data_1.projectData, renderBaseline: true, allowSorting: true, treeColumnIndex: 1, allowSelection: true, projectStartDate: projectStartDate, projectEndDate: projectEndDate, taskFields: taskFields, timelineSettings: timelineSettings, highlightWeekends: true, height: '463px', labelSettings: labelSettings, splitterSettings: splitterSettings },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskID', visible: false }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskName', headerText: 'Name', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'endDate', headerText: 'End Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'duration', headerText: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'predecessor', headerText: 'Dependency' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'progress', headerText: 'Progress' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Sort, ej2_react_gantt_1.DayMarkers] }))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                        React.createElement("colgroup", null,
                            React.createElement("col", { style: { width: '30%' } }),
                            React.createElement("col", { style: { width: '70%' } })),
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Unit width")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: timelineUnitSize, format: "n", value: 33, min: 10, change: unitWidth.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("b", null, "Top tier"))),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: topTierCheckbox, id: "topTierCheck", onClick: topTierCick.bind(_this), className: "checkbox", checked: true })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Count")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: topTierCount, id: "count", format: "n", min: 1, max: 50, value: 1, className: "form-control", change: topTierCountchange.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Unit")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: topTierUnit, id: "unit", tabIndex: 1, dataSource: unit, fields: unitField, value: "Week", change: topUnitChange.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Format")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: topTierformat, id: "topformat", tabIndex: 1, dataSource: weekformat, fields: formatField, value: "MMM dd, yyyy", change: topFormatChange.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("b", null, "Bottom tier"))),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: bottomTierCheckbox, id: "bottomTierCheck", onClick: bottomTierCick.bind(_this), className: "checkbox", checked: true })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Count")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: bottomTierCount, id: "count", format: "n", min: 1, max: 50, value: 1, className: "form-control", change: bottomTierCountchange.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Unit")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: bottomTierUnit, id: "unit", tabIndex: 1, dataSource: unit, fields: unitField, value: "Day", change: bottomUnitChange.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Format")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: bottomTierformat, id: "btFormat", tabIndex: 1, dataSource: dayformat, fields: formatField, value: "", change: bottomFormatChange.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Enable multitaskbar")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: multitaskbarcheckbox, id: "multitaskbarCheck", onClick: multitaskbarCheck.bind(_this), className: "checkbox", checked: false }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates the different phases from planning to delivery, involved in a software development lifecycle. This sample demonstrates the different timeline modes available in Gantt chart. Options are available to change the unit, format and count of the header texts for both top and bottom timeline headers.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to change the timeline settings in Gantt chart. The top and bottom timeline header texts can be customized by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/#toptier" }, "timelineSettings.topTier"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/#bottomtier" }, "timelineSettings.bottomTier"),
                " properties                                                          Using these properties, you can change the format, count, and units of the timeline header texts."),
            React.createElement("p", null, "Gantt chart has built-in support for many timeline modes such as minutes, hour, day, week, month and year."),
            React.createElement("p", null,
                "The default timeline headers can also be replaced with custom header texts by using the ",
                React.createElement("code", null, "formatter"),
                " method."),
            React.createElement("p", null, "Tooltip is enabled by default for the timeline headers, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection support, inject the",
                React.createElement("code", null, "Selection"),
                " module. To use markers in Gantt, inject the ",
                React.createElement("code", null, "DayMarkers"),
                " module."),
            React.createElement("p", null,
                "If the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#enablemultitaskbar" }, "enableMultiTaskbar"),
                " property is enabled, it displays child taskbars in the parent row when in collapsed state."))));
};
exports.default = Timeline;
