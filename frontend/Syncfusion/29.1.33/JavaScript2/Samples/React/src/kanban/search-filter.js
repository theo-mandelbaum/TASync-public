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
exports.SearchFilter = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./search-filter.css");
var dataSource = require("./datasource.json");
var property_pane_1 = require("../common/property-pane");
/**
 * Kanban Search Filter sample
 */
var SearchFilter = /** @class */ (function (_super) {
    __extends(SearchFilter, _super);
    function SearchFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        _this.priorityData = ['None', 'High', 'Normal', 'Low'];
        _this.statusData = [
            { id: 'None', value: 'None' },
            { id: 'To Do', value: 'Open' },
            { id: 'In Progress', value: 'InProgress' },
            { id: 'Testing', value: 'Testing' },
            { id: 'Done', value: 'Close' }
        ];
        _this.value = 'None';
        _this.fields = { text: 'id', value: 'value' };
        return _this;
    }
    SearchFilter.prototype.prioritySelect = function (args) {
        var filterQuery = new ej2_data_1.Query();
        if (args.itemData.value !== 'None') {
            filterQuery = new ej2_data_1.Query().where('Priority', 'equal', args.itemData.value);
        }
        this.statusObj.value = 'None';
        this.kanbanObj.query = filterQuery;
    };
    ;
    SearchFilter.prototype.statusSelect = function (args) {
        var filterQuery = new ej2_data_1.Query();
        if (args.itemData.value !== 'None') {
            filterQuery = new ej2_data_1.Query().where('Status', 'equal', args.itemData.value);
        }
        this.priorityObj.value = 'None';
        this.kanbanObj.query = filterQuery;
    };
    ;
    SearchFilter.prototype.searchClick = function (e) {
        var searchValue = e.value;
        var searchQuery = new ej2_data_1.Query();
        if (searchValue !== '') {
            searchQuery = new ej2_data_1.Query().search(searchValue, ['Id', 'Summary'], 'contains', true);
        }
        this.kanbanObj.query = searchQuery;
    };
    ;
    SearchFilter.prototype.resetClick = function () {
        document.getElementById('search_text').value = '';
        this.reset();
    };
    ;
    SearchFilter.prototype.onFocus = function (e) {
        if (e.target.value === '') {
            this.reset();
        }
    };
    SearchFilter.prototype.reset = function () {
        this.priorityObj.value = 'None';
        this.statusObj.value = 'None';
        this.kanbanObj.query = new ej2_data_1.Query();
    };
    SearchFilter.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", ref: function (kanban) { _this.kanbanObj = kanban; }, keyField: "Status", dataSource: this.data, cardSettings: { contentField: "Summary", headerField: "Id" }, swimlaneSettings: { keyField: "Assignee" } },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
            React.createElement("div", { className: "col-lg-3 property-section", id: "searchFilterProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: "Filtering" },
                    React.createElement("table", { className: "e-filter-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: "e-filter-label" },
                                    React.createElement("div", null, "Priority")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'priority_filter', ref: function (kanban) { _this.priorityObj = kanban; }, dataSource: this.priorityData, select: this.prioritySelect.bind(this), value: this.value, placeholder: 'Select a priority' })))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "e-filter-label" },
                                    React.createElement("div", null, "Status")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'status_filter', ref: function (kanban) { _this.statusObj = kanban; }, dataSource: this.statusData, select: this.statusSelect.bind(this), value: this.value, fields: this.fields, placeholder: 'Select a status' }))))),
                    React.createElement("p", { className: "property-panel-header", style: { width: '100%', padding: '22px 0 0 0' } }, "Searching"),
                    React.createElement("div", { className: "filtering property-panel-content" },
                        React.createElement("table", { className: "e-filter-table" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "search_text", ref: function (kanban) { _this.textBoxObj = kanban; }, showClearButton: true, placeholder: "Enter search text", onFocus: this.onFocus.bind(this), input: this.searchClick.bind(this) })))))),
                        React.createElement("div", { className: 'e-reset-button' },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'reset_filter', className: "e-btn", onClick: this.resetClick.bind(this) }, "Reset"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the filtering and searching actions of Kanban. In this sample, select the key value from drop down list to display the filtered data in Kanban board. Type in search box to be searched in header/content and display the search result in a board.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Kanban provides an option to filter or search the cards and displayed on Kanban board using ",
                    React.createElement("code", null, "query"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "In query, ",
                        React.createElement("code", null, "where"),
                        " used for filtering the Kanban cards."),
                    React.createElement("li", null,
                        "In query, ",
                        React.createElement("code", null, "search"),
                        " is used for searching the cards.")))));
    };
    return SearchFilter;
}(sample_base_1.SampleBase));
exports.SearchFilter = SearchFilter;
