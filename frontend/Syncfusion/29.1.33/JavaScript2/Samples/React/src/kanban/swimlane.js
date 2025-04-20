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
exports.Swimlane = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./swimlane.css");
var dataSource = require("./datasource.json");
/**
 * Kanban Swimlane sample
 */
var Swimlane = /** @class */ (function (_super) {
    __extends(Swimlane, _super);
    function Swimlane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.kanbanData, null, true);
        _this.sortData = [
            { 'value': 'Ascending', 'text': 'Ascending' }, { 'value': 'Descending', 'text': 'Descending' }
        ];
        _this.value = 'Ascending';
        return _this;
    }
    Swimlane.prototype.changeSortOrder = function (args) {
        this.kanbanObj.swimlaneSettings.sortDirection = args.itemData.value;
    };
    ;
    Swimlane.prototype.onChange = function (args) {
        this.kanbanObj.swimlaneSettings.allowDragAndDrop = args.checked;
    };
    ;
    Swimlane.prototype.changeRow = function (args) {
        this.kanbanObj.swimlaneSettings.showEmptyRow = args.checked;
    };
    ;
    Swimlane.prototype.changeCount = function (args) {
        this.kanbanObj.swimlaneSettings.showItemCount = args.checked;
    };
    Swimlane.prototype.changeFrozen = function (args) {
        this.kanbanObj.swimlaneSettings.enableFrozenRows = args.checked;
    };
    Swimlane.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", cssClass: "kanban-swimlane", ref: function (kanban) { _this.kanbanObj = kanban; }, keyField: "Status", dataSource: this.data, cardSettings: { contentField: "Summary", headerField: "Id" }, swimlaneSettings: { keyField: "Assignee" }, height: "500px" },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Sort Direction")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'sort', dataSource: this.sortData, change: this.changeSortOrder.bind(this), value: this.value })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Enable Swimlane Drag And Drop")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: this.onChange.bind(this) }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Show Empty Swimlane Row")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: this.changeRow.bind(this) }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Show Swimlane Item Count")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: this.changeCount.bind(this) }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Enable Frozen Rows")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.changeFrozen.bind(this) }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the swimlane functionalities of Kanban component. Provided options in the property panel to sort the cards, enable drag-and-drop across swimlanes, show or hide the empty row, items count and swimlane frozen rows. Also, you can expand/collapse the swimlane row in the Kanban board.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample renders the assignee field as a swimlane header using the ",
                    React.createElement("code", null, "swimlaneSettings"),
                    " property. The property provides the following options to change its related settings:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Sorting the swimlane cards using the ",
                        React.createElement("code", null, "swimlaneSettings.sortDirection"),
                        " property"),
                    React.createElement("li", null,
                        "Control the drag-and-drop of the cards across swimlane using the",
                        React.createElement("code", null, "swimlaneSettings.allowDragAndDrop"),
                        " property."),
                    React.createElement("li", null,
                        "Show or hide the empty swimlane row using the ",
                        React.createElement("code", null, "swimlaneSettings.showEmptyRow"),
                        " property."),
                    React.createElement("li", null,
                        "Show or hide the items count in the swimlane header using the ",
                        React.createElement("code", null, "swimlaneSettings.showItemCount"),
                        "property."),
                    React.createElement("li", null,
                        "Enable or disable the frozen swimlane rows using the ",
                        React.createElement("code", null, "swimlaneSettings.enableFrozenRows"),
                        " property.")))));
    };
    return Swimlane;
}(sample_base_1.SampleBase));
exports.Swimlane = Swimlane;
