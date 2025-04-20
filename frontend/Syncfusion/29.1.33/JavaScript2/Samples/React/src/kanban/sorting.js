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
exports.Sorting = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
require("./sorting.css");
/**
 * Kanban Sorting sample
 */
var Sorting = /** @class */ (function (_super) {
    __extends(Sorting, _super);
    function Sorting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        _this.sortByData = [
            { Id: 'DataSourceOrder', Sort: 'Data Source Order' },
            { Id: 'Index', Sort: 'Index' },
            { Id: 'Custom', Sort: 'Custom' }
        ];
        _this.fields = { text: 'Sort', value: 'Id' };
        _this.fieldData = ['None'];
        _this.directionData = ['Ascending', 'Descending'];
        return _this;
    }
    Sorting.prototype.change = function (args) {
        if (args.value === 'DataSourceOrder' || args.value === 'Index') {
            var data = args.value === 'Index' ? 'RankId' : 'None';
            this.setFieldValue(data);
        }
        if (args.value === 'Custom') {
            this.fieldObj.dataSource = ['Priority', 'RankId', 'Summary'];
            this.fieldObj.value = 'Priority';
            this.fieldObj.enabled = true;
        }
    };
    Sorting.prototype.setFieldValue = function (data) {
        this.fieldObj.dataSource = [data];
        this.fieldObj.value = data;
        this.fieldObj.enabled = false;
    };
    Sorting.prototype.sortClick = function () {
        this.setKanbanProperties();
    };
    ;
    Sorting.prototype.clearClick = function () {
        this.sortByObj.value = 'Index';
        this.directionObj.value = 'Ascending';
        this.setFieldValue('None');
        this.setKanbanProperties();
    };
    ;
    Sorting.prototype.setKanbanProperties = function () {
        this.kanbanObj.sortSettings.sortBy = this.sortByObj.value;
        this.kanbanObj.sortSettings.field = this.fieldObj.value;
        this.kanbanObj.sortSettings.direction = this.directionObj.value;
    };
    Sorting.prototype.cardTemplate = function (props) {
        return (React.createElement("div", { className: "card-template " + props.Priority },
            React.createElement("div", { className: "e-card-header" },
                React.createElement("div", { className: "e-card-header-caption" },
                    React.createElement("div", { className: "e-card-header-title e-tooltip-text" }, props.Id))),
            React.createElement("div", { className: "e-card-content e-tooltip-text" },
                React.createElement("div", { className: "e-text" }, props.Summary)),
            React.createElement("div", { className: "e-card-footer" },
                React.createElement("div", { className: "e-card-footer-css e-".concat(props.Priority) }),
                React.createElement("div", { className: 'e-rank' },
                    "Rank #",
                    props.RankId))));
    };
    Sorting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", ref: function (kanban) { _this.kanbanObj = kanban; }, keyField: "Status", dataSource: this.data, cardSettings: { headerField: "Id", contentField: "Summary", template: this.cardTemplate.bind(this) } },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Sort By")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'sortBy', ref: function (sortDrop) { _this.sortByObj = sortDrop; }, dataSource: this.sortByData, change: this.change.bind(this), fields: this.fields, index: 1 }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Field")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'field', ref: function (fieldDrop) { _this.fieldObj = fieldDrop; }, dataSource: this.fieldData, enabled: false, index: 0 }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Direction")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'direction', ref: function (directionDrop) { _this.directionObj = directionDrop; }, dataSource: this.directionData, index: 0 }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'sort', className: "e-btn", onClick: this.sortClick.bind(this) }, "Sort")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'clear', className: "e-btn", onClick: this.clearClick.bind(this) }, "Clear"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of sorting cards in the Kanban board. You can change the sort options in the dropdown list to reflect the card ordering on the board.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The sample is designed to showcase the sorting behavior of the Kanban board. It contains the ",
                    React.createElement("code", null, "sortBy"),
                    ", ",
                    React.createElement("code", null, "field"),
                    " and ",
                    React.createElement("code", null, "direction"),
                    " properties. The ",
                    React.createElement("code", null, "sortBy"),
                    " property provides the following options:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DataSourceOrder"),
                        ": Cards are aligned in the ascending or descending order based on the data source order and act accordingly when the user drag-and-drop the cards. Since the feature considers the default data source order, ",
                        React.createElement("code", null, "field"),
                        " mapping is not required to sort the cards."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Index"),
                        ": The cards are aligned based on the index value. The index binds to the card based on the mapping field that must be an integer value. Cards will be dropped at the particular position where the user drag-and-drop the cards. The index of the cards will dynamically update its ",
                        React.createElement("code", null, "field"),
                        " value based on the dropped position."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Custom"),
                        ": Users can map any field to sort the cards using this option, which accepts both string and integer ",
                        React.createElement("code", null, "field"),
                        " value.  It maintains the initial mapping key-value to drag and drop the cards and does not change their mapping value after dropping the cards.")),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "direction"),
                    " property is used to align the cards either in the ascending or descending order on the Kanban board."))));
    };
    return Sorting;
}(sample_base_1.SampleBase));
exports.Sorting = Sorting;
