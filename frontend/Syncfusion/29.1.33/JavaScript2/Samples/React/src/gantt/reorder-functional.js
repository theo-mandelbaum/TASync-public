"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ReorderColumn = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
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
    var ganttObj = (0, react_1.useRef)(null);
    var columnsDropdownObj = (0, react_1.useRef)(null);
    var columnIndexDropdownObj = (0, react_1.useRef)(null);
    var columnNames = [
        { id: 'TaskID', name: 'ID' },
        { id: 'TaskName', name: 'Name' },
        { id: 'StartDate', name: 'Start Date' },
        { id: 'EndDate', name: 'End Date' },
        { id: 'Duration', name: 'Duration' },
        { id: 'Progress', name: 'Progress' },
        { id: 'Predecessor', name: 'Dependency' }
    ];
    var columnsIndex = [
        { id: '0', name: '1' },
        { id: '1', name: '2' },
        { id: '2', name: '3' },
        { id: '3', name: '4' },
        { id: '4', name: '5' },
        { id: '5', name: '6' },
        { id: '6', name: '7' }
    ];
    var columnNameChange = function (args) {
        var columnName = args.value.toString();
        var index = ganttObj.current.treeGrid.getColumnIndexByField(columnName);
        columnIndexDropdownObj.current.value = index.toString();
    };
    var columnIndexChange = function (args) {
        var columnName = columnsDropdownObj.current.value.toString();
        var toColumnIndex = args.value;
        var column = ganttObj.current.treeGrid.columns[toColumnIndex];
        ganttObj.current.reorderColumns(columnName, column.field);
    };
    var actionComplete = function (args) {
        if (args.requestType === 'reorder') {
            var columnName = columnsDropdownObj.current.value;
            var index = ganttObj.current.treeGrid.getColumnIndexByField(columnName);
            columnIndexDropdownObj.current.value = index.toString();
        }
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
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-md-9' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ReorderColumn', treeColumnIndex: 1, allowReordering: true, ref: ganttObj, splitterSettings: splitterSettings, actionComplete: actionComplete.bind(_this), dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '100' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Dependency' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Reorder] }))),
            React.createElement("div", { className: 'col-md-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Column ")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "columns", change: columnNameChange.bind(_this), dataSource: columnNames, fields: { text: 'name', value: 'id' }, value: "TaskID", ref: columnsDropdownObj })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, " Column Index ")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "columnindex", change: columnIndexChange.bind(_this), dataSource: columnsIndex, fields: { text: 'name', value: 'id' }, value: "0", ref: columnIndexDropdownObj }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the reordering feature of the Gantt columns. Select column name and index from properties panel to reorder the columns. You can also reorder columns by simply dragging and dropping them to the desired position.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Reordering can be enabled by setting the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowreordering" }, "allowReordering"),
                " property to true. Reordering can be done by dragging and dropping the column header from one index to another index within the TreeGrid part."),
            React.createElement("p", null, "The location in which the column to be placed will be indicated by two arrows symbols."),
            React.createElement("p", null, "In this demo, you can either reorder columns by dragging and dropping or by selecting column name and column index from dropdown to reorder the columns."),
            React.createElement("b", null, "Injecting Module:"),
            React.createElement("p", null,
                "Gantt features are segregated into individual feature-wise modules. To use reordering feature, we need to inject ",
                React.createElement("code", null, "Reorder"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null, "More information about Column Reorder can be found in this documentation section."))));
};
exports.default = ReorderColumn;
