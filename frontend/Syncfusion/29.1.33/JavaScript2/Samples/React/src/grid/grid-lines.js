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
exports.GridLines = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var GridLines = /** @class */ (function (_super) {
    __extends(GridLines, _super);
    function GridLines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lines = "Default";
        _this.filterSettings = { type: 'Excel' };
        _this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.firstnameRule = { required: true, minLength: 5 };
        _this.employeeidRules = { required: true, number: true };
        return _this;
    }
    GridLines.prototype.click = function (e) {
        var element = e.target;
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        (0, ej2_base_1.removeClass)([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        (0, ej2_base_1.addClass)([element.parentElement.parentElement], 'e-ghidden');
        this.lines = element.innerHTML;
        this.gridInstance.gridLines = this.lines;
        this.gridInstance.dataBind();
        this.gridInstance.refresh();
    };
    GridLines.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'e-statustext' }, "Select Grid Line"),
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar", onClick: this.click.bind(this) },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Default', cssClass: "e-ghidden" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "None" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Both" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Horizontal" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Vertical" }))),
                React.createElement("br", null),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeData, ref: function (grid) { return _this.gridInstance = grid; }, gridLines: 'Default', allowSorting: true, editSettings: this.editSettings, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbar },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '125', textAlign: 'Right', validationRules: this.employeeidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'FirstName', width: '125', validationRules: this.firstnameRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', width: '180' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hire Date', width: '135', format: { skeleton: 'yMd', type: 'date' }, textAlign: 'Right', editType: 'datepickeredit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit, ej2_react_grids_1.Filter] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates visibility of the grid lines that separates the rows and columns. In this sample, you can change the gridline from the toolbar.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "    The  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#gridlines' }, "gridLines")),
                    " property is used to control the line visibility that separates the rows and columns. The Grid allow us to display the following grid lines,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Default"),
                        " - Shows the Horizontal line."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Shows no line."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both "),
                        "- Shows both Horizontal and Vertical lines."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Horizontal"),
                        " - Shows the Horizontal line."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Vertical"),
                        " - Shows the Vertical line.")),
                React.createElement("p", null, "In this demo, you can modify the display of gridlines by selecting values in the toolbar."),
                React.createElement("p", null,
                    "More information on the gridLines configuration can be found in this ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#gridlines' }, " documentation section"),
                    "."))));
    };
    return GridLines;
}(sample_base_1.SampleBase));
exports.GridLines = GridLines;
