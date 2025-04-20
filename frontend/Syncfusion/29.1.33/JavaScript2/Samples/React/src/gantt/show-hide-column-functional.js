"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ShowHideColumn = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttObj = (0, react_1.useRef)(null);
    var dropdownObj = (0, react_1.useRef)(null);
    var hideButtonObj = (0, react_1.useRef)(null);
    var showButtonObj = (0, react_1.useRef)(null);
    var columnsName = [
        { id: 'TaskID', name: 'ID' },
        { id: 'StartDate', name: 'Start Date' },
        { id: 'EndDate', name: 'End Date' },
        { id: 'Duration', name: 'Duration' },
        { id: 'Predecessor', name: 'Dependency' },
        { id: 'Progress', name: 'Progress' }
    ];
    var change = function (args) {
        var columnName = args.value.toString();
        var column = ganttObj.current.treeGrid.grid.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            showButtonObj.current.disabled = true;
            hideButtonObj.current.disabled = false;
        }
        else {
            hideButtonObj.current.disabled = true;
            showButtonObj.current.disabled = false;
        }
    };
    var hideButtonClick = function () {
        if (dropdownObj.current.value) {
            var dropValue = dropdownObj.current.value.toString();
            var columnName = ganttObj.current.treeGrid.getColumnByField(dropValue).headerText;
            ganttObj.current.hideColumn(columnName);
            hideButtonObj.current.disabled = true;
            showButtonObj.current.disabled = false;
            var hiddenColumns = document.getElementById('hiddencolumns');
            hiddenColumns.value = hiddenColumns.value + columnName + '\n';
        }
    };
    var showButtonClick = function () {
        if (dropdownObj.current.value) {
            var dropValue = dropdownObj.current.value.toString();
            var columnName = ganttObj.current.treeGrid.getColumnByField(dropValue).headerText;
            ganttObj.current.showColumn(columnName);
            showButtonObj.current.disabled = true;
            hideButtonObj.current.disabled = false;
            var hiddenColumns = document.getElementById('hiddencolumns');
            hiddenColumns.value = hiddenColumns.value.replace(columnName + '\n', '');
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
    var splitterSettings = {
        columnIndex: 4
    };
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('07/06/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-md-9 control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', treeColumnIndex: 1, allowFiltering: true, allowSorting: true, ref: ganttObj, allowResizing: true, dataSource: data_1.projectNewData, highlightWeekends: true, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] }))),
        React.createElement("div", { className: 'col-md-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", null, " Column ")),
                            React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                React.createElement("div", { id: 'columnddl' },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "dropDown", change: change.bind(_this), dataSource: columnsName, fields: { text: 'name', value: 'id' }, ref: dropdownObj })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'hide', ref: hideButtonObj, onClick: hideButtonClick.bind(_this) }, " Hide "))),
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'show', ref: showButtonObj, onClick: showButtonClick.bind(_this) }, " Show ")))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { style: { paddingTop: '10px' } }, " Hidden Columns")),
                            React.createElement("td", { style: { width: '70%', padding: '10px 10px 10px 0px' } },
                                React.createElement("div", null,
                                    React.createElement("textarea", { id: 'hiddencolumns', style: { resize: 'none', height: '65px', backgroundColor: '#fff', padding: '6px' }, className: 'form-control' })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates dynamic show/hide columns feature of Gantt. Select column name from the properties panel, and then click hide/show to toggle visibility.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Gantt column can be shown or hidden dynamically using the ",
                React.createElement("code", null, "showColumn"),
                " and ",
                React.createElement("code", null, "hideColumn"),
                " methods of the Gantt."),
            React.createElement("p", null,
                "In this demo, the columns can be shown and hidden by selecting the column name in dropdown. Click the Show or Hide button to toggle the visibility. The visibility of column is toggled based on the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#headertext" }, "columns -> headerText"),
                " value."),
            React.createElement("p", null,
                "The ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/raect/documentation/api/gantt/columnModel/#visible" }, "columns -> visible"),
                " property specifies the visibility of a column. To hide a column at the initial rendering, set the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#visible" }, "columns -> visible"),
                " property to false."))));
};
exports.default = ShowHideColumn;
