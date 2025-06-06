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
exports.SortingAPI = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var SAMPLE_CSS = "\n@media (min-with:990 && max-width:1300){\n .property-panel-section{\n   padding-left:0px;\n }\n}";
var SortingAPI = /** @class */ (function (_super) {
    __extends(SortingAPI, _super);
    function SortingAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columnsName = [
            { id: 'taskID', name: 'Task ID' },
            { id: 'taskName', name: 'Task Name' },
            { id: 'duration', name: 'Duration' },
            { id: 'progress', name: 'Progress' }
        ];
        _this.direction = [
            { id: 'Ascending', name: 'Ascending' },
            { id: 'Descending', name: 'Descending' }
        ];
        return _this;
    }
    SortingAPI.prototype.btnClick = function () {
        var columnName = this.columnName.value;
        var sortType = this.sortDirection.value;
        this.treegridObj.sortByColumn(columnName, sortType, false);
    };
    SortingAPI.prototype.btnClick2 = function () {
        this.treegridObj.clearSorting();
    };
    SortingAPI.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '410', ref: function (treegrid) { return _this.treegridObj = treegrid; }, allowSorting: true },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '160' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Sort] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement("style", null, SAMPLE_CSS),
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Column ")),
                                    React.createElement("td", { style: { width: '80%', paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: '8px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "146px", id: "columns", ref: function (columnname) { return _this.columnName = columnname; }, dataSource: this.columnsName, fields: { text: 'name', value: 'id' }, value: "taskID" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Direction ")),
                                    React.createElement("td", { style: { width: '80%', paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: '8px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "146px", id: "direction", ref: function (sortdirection) { return _this.sortDirection = sortdirection; }, dataSource: this.direction, fields: { text: 'name', value: 'id' }, value: "Ascending" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2, style: { paddingTop: '10%', paddingLeft: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { marginRight: '10px' }, onClick: this.btnClick.bind(this) }, "Sort"),
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.btnClick2.bind(this) }, "Clear")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the allowSorting as true.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the ",
                    React.createElement("code", null, "allowSorting"),
                    " as true."),
                React.createElement("p", { className: "e-treegrid", style: { border: 'none' } },
                    "To sort a Tree Grid column simply click the column header. The icons ",
                    React.createElement("span", { className: "e-icons e-icon-ascending" }),
                    "(ascending) and ",
                    React.createElement("span", { className: "e-icons e-icon-descending" }),
                    "(descending) specifies the sort direction of a column."),
                React.createElement("p", null,
                    "By default, multi-sorting is enabled in Tree Grid, to sort multiple column hold ",
                    React.createElement("strong", null, "CTRL"),
                    " key and click the column header. To clear sort for a column, hold ",
                    React.createElement("strong", null, "SHIFT"),
                    " key and click the column header."),
                React.createElement("p", null, "While using Tree Grid in a touch device, you have an option for multi sorting in single tap on the Tree Grid header. By tapping on the Tree Grid header, it will show the toggle button in small popup with sort icon. Now tap the button to enable the multi-sorting in single tap."),
                React.createElement("p", null, "In this demo, select the column and direction from the properties panel then click the Sort button. Use the Clear button to remove sort for the selected column."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Tree Grid features are segregated into individual feature-wise modules. To use sorting feature, we need to inject",
                    React.createElement("code", null, "Sort"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the sorting feature configuration can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/sorting" }, "documentation section"),
                    "."))));
    };
    return SortingAPI;
}(sample_base_1.SampleBase));
exports.SortingAPI = SortingAPI;
