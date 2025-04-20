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
exports.EmptyRecordTemplate = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./empty-record-template.css");
var EmptyRecordTemplate = /** @class */ (function (_super) {
    __extends(EmptyRecordTemplate, _super);
    function EmptyRecordTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [];
        _this.template = _this.emptyMessageTemplate;
        _this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        _this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        _this.orderidRules = { required: true, number: true };
        _this.pageSettings = { pageCount: 5 };
        _this.format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
        _this.editparams = { params: { dataSource: new ej2_data_1.DataManager(data_1.orderDataSource), fields: { text: "ShipCountry", value: "ShipCountry" }, } };
        _this.validationRule = { required: true };
        return _this;
    }
    EmptyRecordTemplate.prototype.emptyMessageTemplate = function () {
        var src = '';
        if (document.body.classList.value.indexOf('dark') > -1 || document.body.classList.value.indexOf('highcontrast') > -1) {
            src = "src/grid/images/emptyRecordTemplate_dark.svg";
        }
        else {
            src = "src/grid/images/emptyRecordTemplate_light.svg";
        }
        return (React.createElement("div", { className: 'emptyRecordTemplate' },
            React.createElement("img", { src: src, className: "e-emptyRecord", alt: "No record" }),
            React.createElement("span", null, "There is no data available to display at the moment.")));
    };
    EmptyRecordTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: this.data, emptyRecordTemplate: this.template.bind(this), toolbar: this.toolbarOptions, allowPaging: true, editSettings: this.editSettings, pageSettings: this.pageSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '140', textAlign: 'Right', validationRules: this.orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: this.validationRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '140', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit', format: this.format, width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: this.editparams })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Edit, ej2_react_grids_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of the empty record template in the DataGrid. In this sample, we show a custom image in the place of the default no-record message typically shown by the DataGrid.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The DataGrid provides a way to use a custom content when it has no data to present. The ",
                    React.createElement("code", null, "emptyRecordTemplate"),
                    " property accepts either a string or an HTML element ID value, which will be used as the template when there's no data."),
                React.createElement("p", null,
                    "More information on the dataBinding feature configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/grid/data-binding/data-binding" }, " documentation section"),
                    "."))));
    };
    return EmptyRecordTemplate;
}(sample_base_1.SampleBase));
exports.EmptyRecordTemplate = EmptyRecordTemplate;
