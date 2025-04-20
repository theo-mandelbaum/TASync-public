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
exports.ShowHideColumns = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Kanban Show / Hide Columns sample
 */
var ShowHideColumns = /** @class */ (function (_super) {
    __extends(ShowHideColumns, _super);
    function ShowHideColumns() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        return _this;
    }
    ShowHideColumns.prototype.onChange = function (args) {
        if (args.checked) {
            this.kanbanObj.showColumn(this.checkObj.element.getAttribute('data-id'));
        }
        else {
            this.kanbanObj.hideColumn(this.checkObj.element.getAttribute('data-id'));
        }
    };
    ShowHideColumns.prototype.onChangeProgress = function (args) {
        if (args.checked) {
            this.kanbanObj.showColumn(this.progressObj.element.getAttribute('data-id'));
        }
        else {
            this.kanbanObj.hideColumn(this.progressObj.element.getAttribute('data-id'));
        }
    };
    ShowHideColumns.prototype.onChangeReview = function (args) {
        if (args.checked) {
            this.kanbanObj.showColumn(this.reviewObj.element.getAttribute('data-id'));
        }
        else {
            this.kanbanObj.hideColumn(this.reviewObj.element.getAttribute('data-id'));
        }
    };
    ShowHideColumns.prototype.onChangeClose = function (args) {
        if (args.checked) {
            this.kanbanObj.showColumn(this.closeObj.element.getAttribute('data-id'));
        }
        else {
            this.kanbanObj.hideColumn(this.closeObj.element.getAttribute('data-id'));
        }
    };
    ShowHideColumns.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: this.data, ref: function (kanban) { _this.kanbanObj = kanban; }, cardSettings: { contentField: "Summary", headerField: "Id" } },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Review", keyField: "Review" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Show / Hide Columns' },
                    React.createElement("table", { id: 'property', title: 'Show / Hide Columns', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (kanban) { _this.checkObj = kanban; }, "data-id": 'Open', checked: true, label: 'To Do', change: this.onChange.bind(this) }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (kanban) { _this.progressObj = kanban; }, "data-id": 'InProgress', checked: true, label: 'In Progress', change: this.onChangeProgress.bind(this) }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (kanban) { _this.reviewObj = kanban; }, "data-id": 'Review', checked: true, label: 'In Review', change: this.onChangeReview.bind(this) }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (kanban) { _this.closeObj = kanban; }, "data-id": 'Close', checked: true, label: 'Done', change: this.onChangeClose.bind(this) }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to control the visibility of Kanban columns dynamically. Check or uncheck the checkboxes from the property panel to show or hide the corresponding column.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Kanban provides an option to show or hide its columns dynamically using the following public methods."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "showColumn:"),
                        " Makes the corresponding column visible based on the specified ID."),
                    React.createElement("li", null,
                        React.createElement("code", null, "hideColumn:"),
                        " Hides the corresponding column based on the specified column ID.")))));
    };
    return ShowHideColumns;
}(sample_base_1.SampleBase));
exports.ShowHideColumns = ShowHideColumns;
