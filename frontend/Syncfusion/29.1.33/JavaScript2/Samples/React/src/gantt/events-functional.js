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
var Events = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var eventLog = (0, react_1.useRef)(null);
    var taskFields = {
        id: "TaskID",
        name: "TaskName",
        startDate: "StartDate",
        endDate: "EndDate",
        duration: "Duration",
        progress: "Progress",
        dependency: "Predecessor",
        child: "subtasks",
    };
    var columns = [
        { field: "TaskID", width: 80 },
        { field: "TaskName", width: 250 },
        { field: "StartDate" },
        { field: "EndDate" },
        { field: "Duration" },
        { field: "Predecessor" },
        { field: "Progress" },
    ];
    var toolbar = [
        "Add",
        "Edit",
        "Update",
        "Delete",
        "Cancel",
        "ExpandAll",
        "CollapseAll",
        "Search",
    ];
    var editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
    };
    var labelSettings = {
        leftLabel: "TaskName",
    };
    var splitterSettings = {
        columnIndex: 2,
    };
    var projectStartDate = new Date("03/24/2024");
    var projectEndDate = new Date("07/06/2024");
    var created = function () {
        appendElement('Gantt <b>created</b> event called<hr>');
    };
    var load = function () {
        appendElement('Gantt <b>load</b> event called<hr>');
    };
    var dataBound = function () {
        appendElement('Gantt <b>dataBound</b> event called<hr>');
    };
    var toolbarClick = function () {
        appendElement('Gantt <b>toolbarClick</b> event called<hr>');
    };
    var beforeTooltipRender = function () {
        appendElement('Gantt <b>beforeTooltipRender</b> event called<hr>');
    };
    var actionBegin = function () {
        appendElement('Gantt <b>actionBegin</b> event called<hr>');
    };
    var actionComplete = function () {
        appendElement('Gantt <b>actionComplete</b> event called<hr>');
    };
    var cellEdit = function () {
        appendElement('Gantt <b>cellEdit</b> event called<hr>');
    };
    var endEdit = function () {
        appendElement('Gantt <b>endEdit</b> event called<hr>');
    };
    var taskbarEditing = function () {
        appendElement('Gantt <b>taskbarEditing</b> event called<hr>');
    };
    var taskbarEdited = function () {
        appendElement('Gantt <b>taskbarEdited</b> event called<hr>');
    };
    var rowSelecting = function () {
        appendElement('Gantt <b>rowSelecting</b> event called<hr>');
    };
    var rowSelected = function () {
        appendElement('Gantt <b>rowSelected</b> event called<hr>');
    };
    var rowDeselecting = function () {
        appendElement('Gantt <b>rowDeselecting</b> event called<hr>');
    };
    var rowDeselected = function () {
        appendElement('Gantt <b>rowDeselected</b> event called<hr>');
    };
    var columnDragStart = function () {
        appendElement('Gantt <b>columnDragStart</b> event called<hr>');
    };
    var columnDrag = function () {
        appendElement('Gantt <b>columnDrag</b> event called<hr>');
    };
    var columnDrop = function () {
        appendElement('Gantt <b>columnDrop</b> event called<hr>');
    };
    var expanding = function () {
        appendElement('Gantt <b>expanding</b> event called<hr>');
    };
    var expanded = function () {
        appendElement('Gantt <b>expanded</b> event called<hr>');
    };
    var collapsing = function () {
        appendElement('Gantt <b>collapsing</b> event called<hr>');
    };
    var collapsed = function () {
        appendElement('Gantt <b>collapsed</b> event called<hr>');
    };
    var columnMenuClick = function () {
        appendElement('Gantt <b>columnMenuClick</b> event called<hr>');
    };
    var columnMenuOpen = function () {
        appendElement('Gantt <b>columnMenuOpen</b> event called<hr>');
    };
    var contextMenuClick = function () {
        appendElement('Gantt <b>contextMenuClick</b> event called<hr>');
    };
    var contextMenuOpen = function () {
        appendElement('Gantt <b>contextMenuOpen</b> event called<hr>');
    };
    var resizeStart = function () {
        appendElement('Gantt <b>resizeStart</b> event called<hr>');
    };
    var resizing = function () {
        appendElement('Gantt <b>resizing</b> event called<hr>');
    };
    var resizeStop = function () {
        appendElement('Gantt <b>resizeStop</b> event called<hr>');
    };
    var splitterResizeStart = function () {
        appendElement('Gantt <b>splitterResizeStart</b> event called<hr>');
    };
    var splitterResizing = function () {
        appendElement('Gantt <b>splitterResizing</b> event called<hr>');
    };
    var splitterResized = function () {
        appendElement('Gantt <b>splitterResized</b> event called<hr>');
    };
    var recordDoubleClick = function () {
        appendElement('Gantt <b>recordDoubleClick</b> event called<hr>');
    };
    var onTaskbarClick = function () {
        appendElement('Gantt <b>onTaskbarClick</b> event called<hr>');
    };
    var appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    var clear = function () {
        eventLog.current.innerHTML = "";
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-9" },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: "Events", dataSource: data_1.projectNewData, highlightWeekends: true, treeColumnIndex: 1, allowSelection: true, allowSorting: true, allowReordering: true, allowResizing: true, enableContextMenu: true, showColumnMenu: true, columns: columns, toolbar: toolbar, editSettings: editSettings, splitterSettings: splitterSettings, taskFields: taskFields, labelSettings: labelSettings, height: "410px", created: created.bind(_this), load: load.bind(_this), dataBound: dataBound.bind(_this), toolbarClick: toolbarClick.bind(_this), beforeTooltipRender: beforeTooltipRender.bind(_this), actionBegin: actionBegin.bind(_this), actionComplete: actionComplete.bind(_this), cellEdit: cellEdit.bind(_this), endEdit: endEdit.bind(_this), taskbarEditing: taskbarEditing.bind(_this), taskbarEdited: taskbarEdited.bind(_this), rowSelecting: rowSelecting.bind(_this), rowSelected: rowSelected.bind(_this), rowDeselecting: rowDeselecting.bind(_this), rowDeselected: rowDeselected.bind(_this), columnDragStart: columnDragStart.bind(_this), columnDrag: columnDrag.bind(_this), columnDrop: columnDrop.bind(_this), expanding: expanding.bind(_this), expanded: expanded.bind(_this), collapsing: collapsing.bind(_this), collapsed: collapsed.bind(_this), columnMenuClick: columnMenuClick.bind(_this), columnMenuOpen: columnMenuOpen.bind(_this), contextMenuClick: contextMenuClick.bind(_this), contextMenuOpen: contextMenuOpen.bind(_this), resizeStart: resizeStart.bind(_this), resizing: resizing.bind(_this), resizeStop: resizeStop.bind(_this), splitterResizeStart: splitterResizeStart.bind(_this), splitterResizing: splitterResizing.bind(_this), splitterResized: splitterResized.bind(_this), recordDoubleClick: recordDoubleClick.bind(_this), onTaskbarClick: onTaskbarClick.bind(_this), projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: "TaskID", width: "80" }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: "TaskName", width: "250" }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: "StartDate" }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: "EndDate" }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: "Duration" }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: "Predecessor" }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: "Progress" })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [
                            ej2_react_gantt_1.Selection,
                            ej2_react_gantt_1.DayMarkers,
                            ej2_react_gantt_1.ContextMenu,
                            ej2_react_gantt_1.Reorder,
                            ej2_react_gantt_1.Resize,
                            ej2_react_gantt_1.ColumnMenu,
                            ej2_react_gantt_1.Toolbar,
                            ej2_react_gantt_1.Edit,
                            ej2_react_gantt_1.Filter,
                            ej2_react_gantt_1.Sort,
                        ] }))),
            React.createElement("div", { className: "col-lg-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Event Trace" },
                    React.createElement("table", { id: "property", className: "property-panel-table", title: "Event Trace", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "eventarea", style: { height: "346px", overflow: "auto" } },
                                        React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: "normal" }, ref: eventLog })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%", padding: "20px 10px 10px 80px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: clear.bind(_this) },
                                            " ",
                                            "Clear",
                                            " "))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates all the events that occur on all the Gantt operations with the help of Event Trace panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Gantt triggers events based on its actions. The events can be used as an extension point to perform custom operations."),
            React.createElement("p", null,
                "In this demo, perform Gantt actions such as load, created, dataBound, toolbarClick, beforeTooltipRender, actionBegin, actionComplete, cellEdit, endEdit, taskbarEditing, taskbarEdited, rowSelecting, rowSelected, rowDeselecting, rowDeselected, columnDragStart, columnDrag, columnDrop, expanding, expanded, collapsing, collapsed, columnMenuClick, columnMenuOpen, contextMenuClick, contextMenuOpen, resizeStart, resizing, resizeStop, splitterResizeStart, splitterResizing, splitterResized, recordDoubleClick, onTaskbarClick and see the ",
                React.createElement("strong", null, "Event Trace"),
                " panel for the events emitted."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the",
                React.createElement("code", null, "Selection"),
                " module using the",
                " ",
                React.createElement("code", null, "Gantt.Inject(Selection)"),
                " method.To use a sorting, inject the",
                React.createElement("code", null, "Sort"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Sort)"),
                " ",
                "method.To reorder column, inject the",
                React.createElement("code", null, "Reorder"),
                " module using the",
                " ",
                React.createElement("code", null, "Gantt.Inject(Reorder)"),
                " method.To resize column width, inject the",
                React.createElement("code", null, "Resize"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Resize)"),
                " ",
                "method.To use a contextmenu, inject the",
                React.createElement("code", null, "Contextmenu"),
                " module using the",
                " ",
                React.createElement("code", null, "Gantt.Inject(Contextmenu)"),
                " method.To use a columnmenu, inject the",
                React.createElement("code", null, "ColumnMenu"),
                " module using the",
                " ",
                React.createElement("code", null, "Gantt.Inject(ColumnMenu)"),
                " method.To use a toolbar, inject the",
                React.createElement("code", null, "Toolbar"),
                " module using the",
                " ",
                React.createElement("code", null, "Gantt.Inject(Toolbar)"),
                " method.To use a edit, inject the",
                React.createElement("code", null, "Edit"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Edit)"),
                " ",
                "method.To use markers, inject the",
                React.createElement("code", null, "DayMarkers"),
                " module using the",
                " ",
                React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                " method."))));
};
exports.default = Events;
