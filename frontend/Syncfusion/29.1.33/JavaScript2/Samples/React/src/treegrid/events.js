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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
{ /* custom code start */ }
var SAMPLE_CSS = "\n    #EventLog b{\n      color: #388e3c;\n    }\n    hr {\n      margin: 1px 10px 1px 0px;\n      border-top: 1px solid #eee;\n    }";
{ /* custom code end */ }
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editparams2 = { params: { format: 'n' } };
        _this.taskNameRule = { required: true };
        return _this;
    }
    Events.prototype.created = function () {
        this.appendElement('Tree Grid <b>created</b> event called<hr>');
    };
    Events.prototype.collapsing = function () {
        this.appendElement('Tree Grid <b>collapsing</b> event called<hr>');
    };
    Events.prototype.collapsed = function () {
        this.appendElement('Tree Grid <b>collapsed</b> event called<hr>');
    };
    Events.prototype.expanded = function () {
        this.appendElement('Tree Grid <b>expanded</b> event called<hr>');
    };
    Events.prototype.expanding = function () {
        this.appendElement('Tree Grid <b>expanding</b> event called<hr>');
    };
    Events.prototype.beginEdit = function () {
        this.appendElement('Tree Grid <b>beginEdit</b> event called<hr>');
    };
    Events.prototype.columnDragStart = function () {
        this.appendElement('Tree Grid <b>columnDragStart</b> event called<hr>');
    };
    Events.prototype.columnDrop = function () {
        this.appendElement('Tree Grid <b>columnDrop</b> event called<hr>');
    };
    Events.prototype.columnDrag = function () {
        this.appendElement('Tree Grid <b>columnDrag</b> event called<hr>');
    };
    Events.prototype.load = function () {
        this.appendElement('Tree Grid <b>load</b> event called<hr>');
    };
    Events.prototype.create = function () {
        this.appendElement('Tree Grid <b>create</b> event called<hr>');
    };
    Events.prototype.actionBegin = function () {
        this.appendElement('Tree Grid <b>actionBegin</b> event called<hr>');
    };
    Events.prototype.actionComplete = function () {
        this.appendElement('Tree Grid <b>actionComplete</b> event called<hr>');
    };
    Events.prototype.dataBound = function () {
        this.appendElement('Tree Grid <b>dataBound</b> event called<hr>');
    };
    Events.prototype.rowSelecting = function () {
        this.appendElement('Tree Grid <b>rowSelecting</b> event called<hr>');
    };
    Events.prototype.rowSelected = function () {
        this.appendElement('Tree Grid <b>rowSelected</b> event called<hr>');
    };
    Events.prototype.rowDeselecting = function () {
        this.appendElement('Tree Grid <b>rowDeselecting</b> event called<hr>');
    };
    Events.prototype.rowDeselected = function () {
        this.appendElement('Tree Grid <b>rowDeselected</b> event called<hr>');
    };
    Events.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    Events.prototype.btnClick = function () {
        document.getElementById('EventLog').innerHTML = '';
    };
    Events.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', allowPaging: true, ref: function (treegrid) { return _this.treegridObj = treegrid; }, editSettings: { allowEditing: true }, allowReordering: true, allowSorting: true, pageSettings: { pageCount: 5 }, load: this.load.bind(this), created: this.created.bind(this), actionBegin: this.actionBegin.bind(this), actionComplete: this.actionComplete.bind(this), dataBound: this.dataBound.bind(this), rowSelecting: this.rowSelecting.bind(this), rowSelected: this.rowSelected.bind(this), columnDrag: this.columnDrag.bind(this), columnDragStart: this.columnDragStart.bind(this), columnDrop: this.columnDrop.bind(this), beginEdit: this.beginEdit.bind(this), collapsing: this.collapsing.bind(this), collapsed: this.collapsed.bind(this), expanded: this.expanded.bind(this), expanding: this.expanding.bind(this) },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: '100', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '215', validationRules: this.taskNameRule }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '160', type: 'date', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '110', editType: 'numericedit', textAlign: 'Right', edit: this.editparams2 }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '110', textAlign: 'Right', editType: 'numericedit', edit: this.editparams2 })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Reorder, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Edit] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'eventarea', style: { height: '245px', overflow: 'auto' } },
                                            React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: 'normal' } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.btnClick.bind(this) }, " Clear "))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates all the events that have been triggered on all the Tree Grid operations with the help of Event Trace panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Tree Grid triggers events based on its actions. The events can be used as an extension point to perform custom operations."),
                React.createElement("p", null,
                    "In this demo, perform Tree Grid actions like paging, sorting, reordering, filtering etc. and see the ",
                    React.createElement("strong", null, "Event Trace"),
                    " panel for the events emitted."),
                React.createElement("p", null,
                    "More information on the Grid events can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#events" }, "documentation section"),
                    "."))));
    };
    return Events;
}(sample_base_1.SampleBase));
exports.Events = Events;
