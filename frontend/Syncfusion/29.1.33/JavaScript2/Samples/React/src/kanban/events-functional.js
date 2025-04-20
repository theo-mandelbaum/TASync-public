"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
require("./events.css");
/**
 * Kanban Events sample
 */
var Events = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
    var onClear = function () {
        document.getElementById("EventLog").innerHTML = "";
    };
    var OnCreate = function () {
        appendElement("Kanban <b>Load</b> event called<hr>");
    };
    var OnActionBegin = function () {
        appendElement("Kanban <b>Action Begin</b> event called<hr>");
    };
    var OnActionComplete = function () {
        appendElement("Kanban <b>Action Complete</b> event called<hr>");
    };
    var OnActionFailure = function () {
        appendElement("Kanban <b>Action Failure</b> event called<hr>");
    };
    var OnDataBinding = function () {
        appendElement("Kanban <b>Data Binding</b> event called<hr>");
    };
    var OnDataBound = function () {
        appendElement("Kanban <b>Data Bound</b> event called<hr>");
    };
    var OnCardRendered = function (args) {
        appendElement("Kanban - " +
            args.data.Id +
            " - <b>Card Rendered</b> event called<hr>");
    };
    var OnQueryCellInfo = function () {
        appendElement("Kanban <b>Query Cell Info</b> event called<hr>");
    };
    var OnCardClick = function (args) {
        appendElement("Kanban - " +
            args.data.Id +
            " - <b>Card Click</b> event called<hr>");
    };
    var OnCardDoubleClick = function (args) {
        appendElement("Kanban - " +
            args.data.Id +
            " - <b>Card Double Click</b> event called<hr>");
    };
    var OnDragStart = function () {
        appendElement("Kanban <b>Drag Start</b> event called<hr>");
    };
    var OnDrag = function () {
        appendElement("Kanban <b>Drag</b> event called<hr>");
    };
    var OnDragStop = function () {
        appendElement("Kanban <b>Drag Stop</b> event called<hr>");
    };
    var appendElement = function (html) {
        var span = document.createElement("span");
        span.innerHTML = html;
        var log = document.getElementById("EventLog");
        log.insertBefore(span, log.firstChild);
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: data, swimlaneSettings: { keyField: "Assignee" }, cardSettings: { contentField: "Summary", headerField: "Id" }, created: OnCreate.bind(_this), actionBegin: OnActionBegin.bind(_this), actionComplete: OnActionComplete.bind(_this), actionFailure: OnActionFailure.bind(_this), dataBinding: OnDataBinding.bind(_this), dataBound: OnDataBound.bind(_this), cardRendered: OnCardRendered.bind(_this), queryCellInfo: OnQueryCellInfo.bind(_this), cardClick: OnCardClick.bind(_this), cardDoubleClick: OnCardDoubleClick.bind(_this), dragStart: OnDragStart.bind(_this), drag: OnDrag.bind(_this), dragStop: OnDragStop.bind(_this) },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", allowToggle: true }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", allowToggle: true }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", allowToggle: true }))))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement(property_pane_1.PropertyPane, { title: "Event Trace" },
                React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { className: "eventarea" },
                                    React.createElement("span", { className: "EventLog", id: "EventLog" })))),
                        React.createElement("tr", { style: { height: "50px" } },
                            React.createElement("td", { style: { width: "30%" } },
                                React.createElement("div", { className: "evtbtn" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { title: "Clear", onClick: onClear.bind(_this) }, "Clear")))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The sample showcases the client-side events of JavaScript Kanban. For every action in a Kanban board, corresponding events will be displayed in the event tracer panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The demo is showcased to list-out the client-side events of Kanban. The events are useful to customize the Kanban board from the application end."),
            React.createElement("p", null, "The following events are bounded in this demo."),
            React.createElement("ol", null,
                React.createElement("li", null, "Created"),
                React.createElement("li", null, "Action begin"),
                React.createElement("li", null, "Action complete"),
                React.createElement("li", null, "Action failure"),
                React.createElement("li", null, "Data binding"),
                React.createElement("li", null, "Data bound"),
                React.createElement("li", null, "Card rendered"),
                React.createElement("li", null, "Query cell info"),
                React.createElement("li", null, "Card click"),
                React.createElement("li", null, "Card double click"),
                React.createElement("li", null, "Drag start"),
                React.createElement("li", null, "Drag"),
                React.createElement("li", null, "Drag stop")))));
};
exports.default = Events;
