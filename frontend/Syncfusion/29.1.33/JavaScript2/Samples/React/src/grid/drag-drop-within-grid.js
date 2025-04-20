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
exports.DragWithinGrid = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var DragWithinGrid = /** @class */ (function (_super) {
    __extends(DragWithinGrid, _super);
    function DragWithinGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterSettings = { type: 'Excel' };
        _this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.customeridRule = { required: true, minLength: 5 };
        _this.orderidRules = { required: true, number: true };
        _this.freightRules = { required: true, min: 0 };
        _this.visible = false;
        _this.animationSettings = { effect: 'None' };
        _this.alertButtons = [{
                click: function () {
                    _this.alertDialogInstance.hide();
                },
                buttonModel: { content: 'OK', isPrimary: true }
            }];
        return _this;
    }
    DragWithinGrid.prototype.columnDragStart = function (args) {
        if (args.column.field === 'ShipCountry') {
            this.alertDialogInstance.show();
        }
    };
    DragWithinGrid.prototype.created = function () {
        this.gridInstance.on('columnDragStart', this.columnDragStart, this);
    };
    DragWithinGrid.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return _this.gridInstance = grid; }, dataSource: data_1.orderDetails, allowRowDragAndDrop: true, allowSorting: true, editSettings: this.editSettings, allowFiltering: true, filterSettings: this.filterSettings, toolbar: this.toolbar, allowGrouping: true, height: '400', selectionSettings: { type: 'Multiple' }, created: this.created },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: this.orderidRules }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '100', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: this.freightRules, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', allowGrouping: false, editType: 'dropdownedit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.RowDD, ej2_react_grids_1.Selection, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] })),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Grouping', visible: this.visible, animationSettings: this.animationSettings, width: '300px', content: 'Grouping is disabled for this column', ref: function (alertdialog) { return _this.alertDialogInstance = alertdialog; }, target: '.control-section', buttons: this.alertButtons })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the row drag and drop feature within same grid. You can rearrange the grid rows by using drag icon in left side of grid column.Here you can drag and drop the grid rows between the decided rows.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Row drag and drop enabled by setting",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowrowdraganddrop" }, "allowRowDragAndDrop")),
                    " property as true."),
                React.createElement("p", null,
                    "Grouping can be enabled by setting",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping" }, "allowGrouping")),
                    " property as true."),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use row drag and drop and grouping features, we need to inject",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#rowdraganddropmodule" }, "RowDD")),
                    ",",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/group/#group" }, "Group")),
                    " modules into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "The row drag and drop functionality is enabled with grouped records in the grid. Now, you can drag and drop the records from one group to another group of your choice."))));
    };
    return DragWithinGrid;
}(sample_base_1.SampleBase));
exports.DragWithinGrid = DragWithinGrid;
