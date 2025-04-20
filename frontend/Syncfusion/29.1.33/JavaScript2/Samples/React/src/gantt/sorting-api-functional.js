"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var SortingAPI = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var dropdownColumns = (0, react_1.useRef)(null);
    var dropdownDirection = (0, react_1.useRef)(null);
    var dropdownColumnsData = [
        { id: 'TaskID', type: 'TaskID' },
        { id: 'TaskName', type: 'TaskName' },
        { id: 'StartDate', type: 'StartDate' },
        { id: 'EndDate', type: 'EndDate' },
        { id: 'Duration', type: 'Duration' },
        { id: 'Progress', type: 'Progress' }
    ];
    var dropdownDirectionData = [
        { id: 'Ascending', type: 'Ascending' },
        { id: 'Descending', type: 'Descending' },
    ];
    var sortColumn = function () {
        var columnName = dropdownColumns.current.value;
        var sortType = dropdownDirection.current.value;
        ganttInstance.current.sortModule.sortColumn(columnName, sortType, false);
    };
    var clearSort = function () {
        ganttInstance.current.clearSorting();
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
        columnIndex: 2
    };
    var projectStartDate = new Date('03/25/2024');
    var projectEndDate = new Date('07/28/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'SortingAPI', ref: ganttInstance, dataSource: data_1.editingData, highlightWeekends: true, allowSorting: true, treeColumnIndex: 1, allowSelection: true, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '80' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'TaskName', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', headerText: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', headerText: 'Progress' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Sort] }))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", { style: { fontSize: '15px' } }, "Column"))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: dropdownColumns, id: 'columns', width: "150px", tabIndex: 1, dataSource: dropdownColumnsData, fields: { text: 'type', value: 'id' }, value: 'TaskID' })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", { style: { fontSize: '15px' } }, "Direction"))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: dropdownDirection, id: 'direction', width: "150px", tabIndex: 1, dataSource: dropdownDirectionData, fields: { text: 'type', value: 'id' }, value: 'Ascending' })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: sortColumn.bind(_this), style: { marginRight: '5px', width: '80px' } }, " Sort "),
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: clearSort.bind(_this), style: { width: '80px' } }, " Clear "))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                " The sorting feature enables you to order data in a particular direction. It can be enabled by setting ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowselection" }, "allowSelection"),
                " to ",
                React.createElement("code", null, "true"),
                ".")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The sorting feature enables you to order data in a particular direction. It can be enabled by setting the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowselection" }, "allowSelection"),
                " to true."),
            React.createElement("p", null, "To sort a Gantt column, click the column header. The icons (ascending) and (descending) specify the sort direction of a column."),
            React.createElement("p", null,
                "By default, the multi-sorting feature is enabled in Gantt. To sort multiple columns, hold the ",
                React.createElement("strong", null, "CTRL"),
                " key, and then click the column header. To clear sort for a column, hold the ",
                React.createElement("strong", null, "SHIFT"),
                " key, and then click the column header."),
            React.createElement("p", null, "In this demo, select the column and direction from the properties panel, and then click the Sort button. Use the Clear button to remove sort for the sorted column."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Selection)"),
                " method.To use sort, inject the",
                React.createElement("code", null, "Sort"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Sort)"),
                " method.To use markers, inject the",
                React.createElement("code", null, "DayMarkers"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                " method."))));
};
exports.default = SortingAPI;
