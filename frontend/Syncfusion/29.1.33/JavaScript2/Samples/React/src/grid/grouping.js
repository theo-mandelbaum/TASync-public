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
exports.Grouping = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var refresh;
var Grouping = /** @class */ (function (_super) {
    __extends(Grouping, _super);
    function Grouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Edit', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true };
        _this.editparams = { params: { popupHeight: '300px' } };
        _this.validationRule = { required: true };
        _this.orderidRules = { required: true, number: true };
        _this.format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
        _this.filterSettings = { type: 'Excel' };
        _this.groupOptions = { showGroupedColumn: false, columns: ['ShipCountry'] };
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
    Grouping.prototype.dataBound = function () {
        if (refresh) {
            this.gridInstance.groupColumn('ShipCountry');
            refresh = false;
        }
    };
    Grouping.prototype.load = function () {
        refresh = this.refreshing;
    };
    Grouping.prototype.columnDragStart = function (args) {
        if (args.column.field === 'OrderDate') {
            this.alertDialogInstance.show();
        }
    };
    Grouping.prototype.created = function () {
        this.gridInstance.on('columnDragStart', this.columnDragStart, this);
    };
    Grouping.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDataSource, allowPaging: true, ref: function (grid) { return _this.gridInstance = grid; }, toolbar: this.toolbarOptions, pageSettings: { pageCount: 5 }, allowFiltering: true, filterSettings: this.filterSettings, editSettings: this.editSettings, allowGrouping: true, groupSettings: this.groupOptions, allowSorting: true, height: "320", dataBound: this.dataBound.bind(this), load: this.load, created: this.created },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '140', textAlign: 'Right', validationRules: this.orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.validationRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '140', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit', allowGrouping: false, format: this.format, width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: this.editparams })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.Edit, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter] })),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Grouping', visible: this.visible, animationSettings: this.animationSettings, width: '300px', content: 'Grouping is disabled for this column', ref: function (alertdialog) { return _this.alertDialogInstance = alertdialog; }, target: '.control-section', buttons: this.alertButtons }),
                React.createElement("div", { className: "e-dsalign" },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_prolific_inventors", target: '_blank' }, "Wikipedia: List of Prolific inventors"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates grouping feature of the Grid component. In this sample, the Grid data is grouped against ShipCountry column. To group any other column simply drag the column header and drop on the group drop area.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid control has options to group the records based on the required column. When grouping is applied, grouped records are organized into a hierarchical structure to facilitate easier expansion and collapse of records. To enable grouping, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping" }, "allowGrouping")),
                    " property as true."),
                React.createElement("p", null, "Columns can be grouped by simply dragging the column header and drop on the group drop area."),
                React.createElement("p", null, "In this demo, to group a specify column, drag and drop the column in the group drop area."),
                React.createElement("p", null,
                    "In this demo, editing options can be enabled by setting ",
                    React.createElement("code", null, "editSettings.allowEditing"),
                    " as ",
                    React.createElement("code", null, "true"),
                    ". You can start editing by double-clicking a row or the toolbar `Edit` button. Once in edit mode, you have the ability to modify the values of the selected row. When saving the record, the Grid will refresh the specific edited row without affecting the expanded group state."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use grouping and editing features, we need to inject",
                    React.createElement("code", null, "Group"),
                    ", ",
                    React.createElement("code", null, "Edit"),
                    " modules into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the grouping feature configuration can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#groupsettings" }, " documentation section"),
                    "."))));
    };
    return Grouping;
}(sample_base_1.SampleBase));
exports.Grouping = Grouping;
