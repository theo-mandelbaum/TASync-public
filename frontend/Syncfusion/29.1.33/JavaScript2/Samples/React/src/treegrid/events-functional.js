"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
{ /* custom code start */ }
var SAMPLE_CSS = "\n    #EventLog b{\n      color: #388e3c;\n    }\n    hr {\n      margin: 1px 10px 1px 0px;\n      border-top: 1px solid #eee;\n    }";
{ /* custom code end */ }
var Events = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var editparams2 = { params: { format: "n" } };
    var taskNameRule = { required: true };
    var created = function () {
        appendElement("Tree Grid <b>created</b> event called<hr>");
    };
    var collapsing = function () {
        appendElement("Tree Grid <b>collapsing</b> event called<hr>");
    };
    var collapsed = function () {
        appendElement("Tree Grid <b>collapsed</b> event called<hr>");
    };
    var expanded = function () {
        appendElement("Tree Grid <b>expanded</b> event called<hr>");
    };
    var expanding = function () {
        appendElement("Tree Grid <b>expanding</b> event called<hr>");
    };
    var beginEdit = function () {
        appendElement("Tree Grid <b>beginEdit</b> event called<hr>");
    };
    var columnDragStart = function () {
        appendElement("Tree Grid <b>columnDragStart</b> event called<hr>");
    };
    var columnDrop = function () {
        appendElement("Tree Grid <b>columnDrop</b> event called<hr>");
    };
    var columnDrag = function () {
        appendElement("Tree Grid <b>columnDrag</b> event called<hr>");
    };
    var load = function () {
        appendElement("Tree Grid <b>load</b> event called<hr>");
    };
    var create = function () {
        appendElement("Tree Grid <b>create</b> event called<hr>");
    };
    var actionBegin = function () {
        appendElement("Tree Grid <b>actionBegin</b> event called<hr>");
    };
    var actionComplete = function () {
        appendElement("Tree Grid <b>actionComplete</b> event called<hr>");
    };
    var dataBound = function () {
        appendElement("Tree Grid <b>dataBound</b> event called<hr>");
    };
    var rowSelecting = function () {
        appendElement("Tree Grid <b>rowSelecting</b> event called<hr>");
    };
    var rowSelected = function () {
        appendElement("Tree Grid <b>rowSelected</b> event called<hr>");
    };
    var rowDeselecting = function () {
        appendElement("Tree Grid <b>rowDeselecting</b> event called<hr>");
    };
    var rowDeselected = function () {
        appendElement("Tree Grid <b>rowDeselected</b> event called<hr>");
    };
    var appendElement = function (html) {
        var span = document.createElement("span");
        span.innerHTML = html;
        var log = document.getElementById("EventLog");
        log.insertBefore(span, log.firstChild);
    };
    var btnClick = function () {
        document.getElementById("EventLog").innerHTML = "";
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, ref: treegridObj, editSettings: { allowEditing: true }, allowReordering: true, allowSorting: true, pageSettings: { pageCount: 5 }, load: load.bind(_this), created: created.bind(_this), actionBegin: actionBegin.bind(_this), actionComplete: actionComplete.bind(_this), dataBound: dataBound.bind(_this), rowSelecting: rowSelecting.bind(_this), rowSelected: rowSelected.bind(_this), columnDrag: columnDrag.bind(_this), columnDragStart: columnDragStart.bind(_this), columnDrop: columnDrop.bind(_this), beginEdit: beginEdit.bind(_this), collapsing: collapsing.bind(_this), collapsed: collapsed.bind(_this), expanded: expanded.bind(_this), expanding: expanding.bind(_this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", isPrimaryKey: true, width: "100", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "215", validationRules: taskNameRule }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "160", type: "date", format: "yMd", textAlign: "Right", editType: "datepickeredit" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "110", editType: "numericedit", textAlign: "Right", edit: editparams2 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "110", textAlign: "Right", editType: "numericedit", edit: editparams2 })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Reorder, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Edit] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "eventarea", style: { height: "245px", overflow: "auto" } },
                                        React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: "normal" } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "evtbtn", style: { paddingBottom: "10px" } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: btnClick.bind(_this) },
                                            " ",
                                            "Clear",
                                            " "))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates all the events that have been triggered on all the Tree Grid operations with the help of Event Trace panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Tree Grid triggers events based on its actions. The events can be used as an extension point to perform custom operations."),
            React.createElement("p", null,
                "In this demo, perform Tree Grid actions like paging, sorting, reordering, filtering etc. and see the ",
                React.createElement("strong", null, "Event Trace"),
                " ",
                "panel for the events emitted."),
            React.createElement("p", null,
                "More information on the Grid events can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#events" }, "documentation section"),
                "."))));
};
exports.default = Events;
