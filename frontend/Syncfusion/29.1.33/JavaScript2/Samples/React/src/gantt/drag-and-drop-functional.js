"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var DragAndDrop = function () {
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
    var selectionSettings = {
        type: 'Multiple'
    };
    var splitterSettings = {
        columnIndex: 3
    };
    var editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    var projectStartDate = new Date('03/25/2024');
    var projectEndDate = new Date('07/06/2024');
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'DragandDrop', dataSource: data_1.projectNewData, taskFields: taskFields, height: '410px', treeColumnIndex: 1, allowRowDragAndDrop: true, highlightWeekends: true, labelSettings: labelSettings, projectStartDate: projectStartDate, projectEndDate: projectEndDate, allowTaskbarDragAndDrop: true, splitterSettings: splitterSettings, editSettings: editSettings, selectionSettings: selectionSettings },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Dependency' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.RowDD, ej2_react_gantt_1.Selection] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Gantt component with the row drag and drop feature. You can rearrange the gantt rows by using drag icon in left side of gantt column. Here you can perform drag and drop the gantt rows in to required position.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Row drag and drop feature can be enabled by settting ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#allowrowdraganddrop" }, "allowRowDragAndDrop"),
                " property as true. In this demo, taskbar drag and drop between rows can be enabled by setting ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#allowtaskbardraganddrop" }, "allowTaskbarDragAndDrop"),
                " as true."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use row, drag and drop feature we need to inject ",
                React.createElement("code", null, "RowDD"),
                " and ",
                React.createElement("code", null, "Edit"),
                " modules."))));
};
exports.default = DragAndDrop;
