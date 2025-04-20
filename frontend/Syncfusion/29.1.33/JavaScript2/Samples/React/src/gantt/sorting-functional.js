"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Sorting = function () {
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
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var splitterSettings = {
        columnIndex: 2
    };
    var sortSettings = {
        columns: [{ field: 'TaskName', direction: 'Ascending' }, { field: 'TaskID', direction: 'Ascending' }]
    };
    var projectStartDate = new Date('03/25/2024');
    var projectEndDate = new Date('07/28/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Sorting', dataSource: data_1.editingData, highlightWeekends: true, allowSelection: true, taskFields: taskFields, splitterSettings: splitterSettings, treeColumnIndex: 1, labelSettings: labelSettings, height: '410px', selectedRowIndex: 0, sortSettings: sortSettings, allowSorting: true, projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Sort] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Gantt multi-sorting feature. To sort two or more columns, hold the CTRL key, and click the column header.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The sorting feature enables you to order data in a particular direction. It can be enabled by setting ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowselection" }, "allowSelection"),
                " to true."),
            React.createElement("p", null, "To sort a Gantt column, click the column header. The icons (ascending) and (descending) specifies the sort direction of a column."),
            React.createElement("p", null,
                "By default, the multi-sorting feature is enabled in Gantt. To sort multiple columns, hold the ",
                React.createElement("strong", null, "CTRL"),
                " key, and then click the column header. To clear sort for a column, hold the ",
                React.createElement("strong", null, "SHIFT"),
                " key, and then click the column header."),
            React.createElement("p", null,
                "In this demo, multiple sorting enabled on load time by assigning multiple columns into ",
                React.createElement("code", null, "sortSettings"),
                " property."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Selection)"),
                " method. To use sort, inject the",
                React.createElement("code", null, "Sort"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Sort)"),
                " method.To use markers, inject the",
                React.createElement("code", null, "DayMarkers"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                " method."))));
};
exports.default = Sorting;
