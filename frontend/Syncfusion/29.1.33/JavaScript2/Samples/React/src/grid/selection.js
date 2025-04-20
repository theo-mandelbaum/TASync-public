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
exports.Selectioning = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Selectioning = /** @class */ (function (_super) {
    __extends(Selectioning, _super);
    function Selectioning() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        _this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.customeridRule = { required: true, minLength: 5 };
        _this.orderidRules = { required: true, number: true };
        _this.freightRules = { required: true, min: 0 };
        return _this;
    }
    Selectioning.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, allowPaging: true, allowSorting: true, pageSettings: { pageCount: 5 }, selectionSettings: { type: 'Multiple' }, editSettings: this.editSettings, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbar },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: "Right", validationRules: this.orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: this.freightRules, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: "yMd", textAlign: "Right", editType: 'datepickeredit', type: 'date' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Selection, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionality of the selection in Grid, which allows you to select row or cell or column through simple mouse down or keyboard interaction.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Selection provides an interactive support to highlight the row or cell or column that you select. Selection can be done through a simple Mouse down or Keyboard interaction. To enable selection, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#allowselection" }, "allowSelection")),
                    " as true."),
                React.createElement("p", null,
                    "Grid component supports two types of selection which can be set using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#type" }, "selectionSettings->type")),
                    " property. They are"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Single"),
                        " - Enabled by default. Allows the user to select single row/cell/column at a time."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Multiple"),
                        " - Allows the user to select more than one row/cell/column at a time.")),
                React.createElement("p", null,
                    "Also, supports three modes of selection which can be set using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#mode" }, "selectionSettings->mode")),
                    " property. They are"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row"),
                        " - Enabled by default. Enables the row selection in Grid."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell"),
                        " - Enables the cell selection in Grid."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - Enables both the row and cell selection in Grid. Clicking any cell will select both row and cell simultaneously")),
                React.createElement("p", null,
                    "To perform the column selection, enable the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#allowcolumnselection" }, "selectionSettings->allowColumnSelection")),
                    " property."),
                React.createElement("p", null,
                    "To perform the multi-selection, hold ",
                    React.createElement("strong", null, "CTRL"),
                    " key and click the desired rows/cells/columns. To select range of rows/cells/columns, hold ",
                    React.createElement("strong", null, "SHIFT"),
                    " key and click the rows/cells/columns."),
                React.createElement("p", null, "While using the Grid in a touch device environment, there is an option for multi-selection through a single tap on the row and it will show a popup with the multi-selection symbol. Tap the icon to enable multi-selection in a single tap."),
                React.createElement("p", null, "In this demo, multiple row selection is enabled, click any row to select."),
                React.createElement("p", null,
                    "More information on the selection configuration can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/selection.html#selection" }, " documentation section"),
                    "."))));
    };
    return Selectioning;
}(sample_base_1.SampleBase));
exports.Selectioning = Selectioning;
