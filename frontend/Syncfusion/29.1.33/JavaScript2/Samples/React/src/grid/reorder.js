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
exports.Reordering = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Reordering = /** @class */ (function (_super) {
    __extends(Reordering, _super);
    function Reordering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        _this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.firstnameRule = { required: true, minLength: 5 };
        _this.employeeidRules = { required: true, number: true };
        return _this;
    }
    Reordering.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeData, allowReordering: true, allowSorting: true, editSettings: this.editSettings, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbar },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '150', textAlign: "Right", validationRules: this.employeeidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', width: '140', validationRules: this.firstnameRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hired Date', width: '120', format: 'yMd', textAlign: "Right", editType: 'datepickeredit', type: 'date' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportsTo', headerText: 'Reports To', width: '120' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Reorder, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates reordering of the Grid columns. You can reorder columns by simply drag and drop in the desired column position.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Reordering can be enabled by setting  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowreordering' }, "allowReordering")),
                    " property as true. Reordering can be done by drag and drop the column header from one index to another index within the Grid."),
                React.createElement("p", null, "The location in which the column to be placed, will be indicated by two arrows symbols."),
                React.createElement("p", null, "In this demo, you can reorder columns by drag and drop the column to the desired column."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use Reordering feature, we need to inject ",
                    React.createElement("code", null, "Reorder"),
                    " modeule into the ",
                    React.createElement("code", null, "services")),
                React.createElement("p", null,
                    "More information on the Reordering feature configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowreordering' }, " documentation section"),
                    "."))));
    };
    return Reordering;
}(sample_base_1.SampleBase));
exports.Reordering = Reordering;
