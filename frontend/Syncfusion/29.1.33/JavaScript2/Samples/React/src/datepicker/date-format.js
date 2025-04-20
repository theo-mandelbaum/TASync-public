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
exports.Dateformat = void 0;
var React = require("react");
require("./format-style.css");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var dateValue = new Date();
var Dateformat = /** @class */ (function (_super) {
    __extends(Dateformat, _super);
    function Dateformat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputFormats = ['dd/MM/yyyy', 'yyyyMMdd'];
        _this.dataTypes = [
            { value: 'dd-MMM-yy' },
            { value: 'yyyy-MM-dd' },
            { value: 'dd-MMMM' },
        ];
        _this.inputFormatData = [
            { text: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
            { text: 'ddMMMyy', value: 'ddMMMyy' },
            { text: 'yyyyMMdd', value: 'yyyyMMdd' },
            { text: 'dd.MM.yy', value: 'dd.MM.yy' },
            { text: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
            { text: 'yyyy/MMM/dd', value: 'yyyy/MMM/dd' },
            { text: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
        ];
        _this.fields = { value: 'value' };
        _this.checkFields = { text: 'text', value: 'value' };
        _this.waterMark = 'Format';
        _this.index = 0;
        return _this;
    }
    /*Apply selected format to the component*/
    Dateformat.prototype.onChange = function () {
        var format = this.listObj.value;
        this.datepickerInstance.format = format;
    };
    Dateformat.prototype.onChangeInputFormat = function (args) {
        this.datepickerInstance.inputFormats = args.value;
    };
    Dateformat.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: 'datepicker-control-section' },
                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { format: 'dd-MMM-yy', ref: function (calendar) { return _this.datepickerInstance = calendar; }, value: dateValue, inputFormats: this.inputFormats }))),
                React.createElement("div", { id: "format", className: 'col-lg-4 property-section' },
                    React.createElement("div", { className: "property-panel-header" }, "Properties"),
                    React.createElement("div", null,
                        React.createElement("label", { className: 'example-label' }, "Choose a display format"),
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "dateFormats", dataSource: this.dataTypes, fields: this.fields, index: this.index, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, placeholder: this.waterMark, change: this.onChange.bind(this) }))),
                React.createElement("div", { id: "format", className: 'col-lg-4 property-section' },
                    React.createElement("div", null,
                        React.createElement("label", { className: 'example-label', style: { marginTop: '40px' } }, "Choose input formats"),
                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "inputFormatsDatePicker", ref: function (multiselect) { return _this.inputFormatInstance = multiselect; }, dataSource: this.inputFormatData, fields: this.checkFields, placeholder: "e.g. MM/dd/yyyy", value: this.inputFormats, mode: "CheckBox", showSelectAll: true, showDropDownIcon: true, enableSelectionOrder: false, change: this.onChangeInputFormat },
                            React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "In this sample, the DatePicker has been configured with the ",
                    React.createElement("code", null, "dd-MMM-yy"),
                    " date format. To change this current date format, go to the properties panel at the right side and select a date format from the dropdown options. For mobile mode touch the icon at the right side and select a date format from the dropdown options.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Format sample illustrates the support of custom date format in the DatePicker component by using the ",
                    React.createElement("code", null, "format"),
                    " property. You can also change the date format by selecting it from the format options in the properties panel."),
                React.createElement("p", null,
                    " More information on the date format configuration can be found in the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datepicker/date-format/", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return Dateformat;
}(sample_base_1.SampleBase));
exports.Dateformat = Dateformat;
