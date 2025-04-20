"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
var React = require("react");
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
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        return _this;
    }
    Events.prototype.onClear = function () {
        document.getElementById('EventLog').innerHTML = '';
    };
    Events.prototype.OnCreate = function () {
        this.appendElement('Kanban <b>Load</b> event called<hr>');
    };
    Events.prototype.OnActionBegin = function () {
        this.appendElement('Kanban <b>Action Begin</b> event called<hr>');
    };
    Events.prototype.OnActionComplete = function () {
        this.appendElement('Kanban <b>Action Complete</b> event called<hr>');
    };
    Events.prototype.OnActionFailure = function () {
        this.appendElement('Kanban <b>Action Failure</b> event called<hr>');
    };
    Events.prototype.OnDataBinding = function () {
        this.appendElement('Kanban <b>Data Binding</b> event called<hr>');
    };
    Events.prototype.OnDataBound = function () {
        this.appendElement('Kanban <b>Data Bound</b> event called<hr>');
    };
    Events.prototype.OnCardRendered = function (args) {
        this.appendElement('Kanban - ' + args.data.Id + ' - <b>Card Rendered</b> event called<hr>');
    };
    Events.prototype.OnQueryCellInfo = function () {
        this.appendElement('Kanban <b>Query Cell Info</b> event called<hr>');
    };
    Events.prototype.OnCardClick = function (args) {
        this.appendElement('Kanban - ' + args.data.Id + ' - <b>Card Click</b> event called<hr>');
    };
    Events.prototype.OnCardDoubleClick = function (args) {
        this.appendElement('Kanban - ' + args.data.Id + ' - <b>Card Double Click</b> event called<hr>');
    };
    Events.prototype.OnDragStart = function () {
        this.appendElement('Kanban <b>Drag Start</b> event called<hr>');
    };
    Events.prototype.OnDrag = function () {
        this.appendElement('Kanban <b>Drag</b> event called<hr>');
    };
    Events.prototype.OnDragStop = function () {
        this.appendElement('Kanban <b>Drag Stop</b> event called<hr>');
    };
    Events.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    Events.prototype.render = function () {
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: this.data, swimlaneSettings: { keyField: "Assignee" }, cardSettings: { contentField: "Summary", headerField: "Id" }, created: this.OnCreate.bind(this), actionBegin: this.OnActionBegin.bind(this), actionComplete: this.OnActionComplete.bind(this), actionFailure: this.OnActionFailure.bind(this), dataBinding: this.OnDataBinding.bind(this), dataBound: this.OnDataBound.bind(this), cardRendered: this.OnCardRendered.bind(this), queryCellInfo: this.OnQueryCellInfo.bind(this), cardClick: this.OnCardClick.bind(this), cardDoubleClick: this.OnCardDoubleClick.bind(this), dragStart: this.OnDragStart.bind(this), drag: this.OnDrag.bind(this), dragStop: this.OnDragStop.bind(this) },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open", allowToggle: true }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress", allowToggle: true }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close", allowToggle: true }))))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Event Trace' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'eventarea' },
                                        React.createElement("span", { className: 'EventLog', id: 'EventLog' })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'evtbtn' },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { title: 'Clear', onClick: this.onClear.bind(this) }, "Clear")))))))),
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
    return Events;
}(sample_base_1.SampleBase));
exports.Events = Events;
