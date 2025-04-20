"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var GanttUndoRedo = function () {
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
    var undoRedoActions = ['Sorting', 'Add', 'ColumnReorder', 'ColumnResize', 'ColumnState', 'Delete', 'Edit', 'Filtering', 'Indent', 'Outdent', 'NextTimeSpan', 'PreviousTimeSpan', 'RowDragAndDrop', 'Search'];
    var splitterSettings = {
        columnIndex: 4
    };
    var editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    var toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Search', 'Undo', 'Redo'];
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('07/06/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', treeColumnIndex: 1, showColumnMenu: true, allowFiltering: true, allowSorting: true, allowResizing: true, dataSource: data_1.projectNewData, highlightWeekends: true, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px', enableUndoRedo: true, enableContextMenu: true, allowReordering: true, editSettings: editSettings, toolbar: toolbar, undoRedoActions: undoRedoActions, projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '100' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Dependency' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Filter, ej2_react_gantt_1.Sort, ej2_react_gantt_1.ColumnMenu, ej2_react_gantt_1.Resize, ej2_react_gantt_1.Edit, ej2_react_gantt_1.Reorder, ej2_react_gantt_1.UndoRedo, ej2_react_gantt_1.ContextMenu, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.DayMarkers] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example showcases the undo-redo functionality within the Gantt Chart, offering users the flexibility to revert or reapply their latest actions on the Gantt Chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Undo feature enables users to revert the most recent action performed in the Gantt Chart. It helps in undo the changes made to tasks, dependencies, or other elements within the Gantt Chart."),
            React.createElement("p", null, "Redo feature can reapply an action that was previously undone using the Undo feature. This allows users to revert their decision to undo an action."),
            React.createElement("p", null, "To undo a recent action, you can either press the Undo keyboard shortcut(Ctrl + Z) or click on the Undo toolbar option. To reapply an action that was undone, you can use the Redo keyboard shortcut(Ctrl + Y) or click on the Redo toolbar option."),
            React.createElement("p", null,
                "You can specify the actions to be restored using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#undoredoactions" }, "undoRedoActions"),
                " property, such as ",
                React.createElement("code", null, "Edit"),
                ", ",
                React.createElement("code", null, "Add"),
                ", ",
                React.createElement("code", null, "Delete"),
                ", ",
                React.createElement("code", null, "Sorting"),
                ", ",
                React.createElement("code", null, "ColumnReorder"),
                ", ",
                React.createElement("code", null, "ColumnResize"),
                ", ",
                React.createElement("code", null, "Search"),
                ", ",
                React.createElement("code", null, "Filtering"),
                ", ",
                React.createElement("code", null, "ZoomIn"),
                ", ",
                React.createElement("code", null, "ZoomOut"),
                ", ",
                React.createElement("code", null, "ZoomToFit"),
                ", ",
                React.createElement("code", null, "ColumnState"),
                ", ",
                React.createElement("code", null, "Indent"),
                ", ",
                React.createElement("code", null, "Outdent"),
                ", ",
                React.createElement("code", null, "RowDragAndDrop"),
                ", ",
                React.createElement("code", null, "TaskbarDragAndDrop"),
                ", ",
                React.createElement("code", null, "PreviousTimeSpan"),
                ", ",
                React.createElement("code", null, "NextTimeSpan"),
                "."),
            React.createElement("p", null,
                "Additionally, you can also define number of undo/redo actions that should be stored. This setting can be adjusted using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#undoredostepscount" }, "undoRedoStepsCount"),
                " property. By default ",
                React.createElement("code", null, "undoRedoStepsCount"),
                " value is 10."),
            React.createElement("p", null,
                "In this demo, the Undo-Redo feature is enabled by setting ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#enableundoredo" }, "enableUndoRedo"),
                " to true."),
            React.createElement("p", null,
                "Gantt features are segregated into individual feature-wise modules. To use column menu feature, we need to inject ",
                React.createElement("code", null, "UndoRedo"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = GanttUndoRedo;
