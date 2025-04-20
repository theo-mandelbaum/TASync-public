"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./format-style.css");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var dateValue = new Date();
var Dateformat = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataTypes = [
        { value: 'dd-MMM-yy' },
        { value: 'yyyy-MM-dd' },
        { value: 'dd-MMMM' },
    ];
    var inputFormatData = [
        { text: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
        { text: 'ddMMMyy', value: 'ddMMMyy' },
        { text: 'yyyyMMdd', value: 'yyyyMMdd' },
        { text: 'dd.MM.yy', value: 'dd.MM.yy' },
        { text: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
        { text: 'yyyy/MMM/dd', value: 'yyyy/MMM/dd' },
        { text: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
    ];
    var checkFields = { text: 'text', value: 'value' };
    var fields = { value: 'value' };
    var waterMark = 'Format';
    var index = 0;
    var _a = (0, react_1.useState)('dd-MMM-yy'), format = _a[0], setFormat = _a[1];
    var _b = (0, react_1.useState)(['dd/MM/yyyy', 'yyyyMMdd']), inputFormats = _b[0], setinputFormats = _b[1];
    /*Apply selected format to the component*/
    var onChange = function (args) {
        setFormat(args.value);
    };
    var onChangeInputFormat = function (args) {
        setinputFormats(args.value);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'datepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DatePickerComponent, { format: format, value: dateValue, inputFormats: inputFormats }))),
            React.createElement("div", { id: "format", className: 'col-lg-4 property-section' },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", null,
                    React.createElement("label", { className: 'example-label' }, "Choose a display format"),
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "dateFormats", dataSource: dataTypes, fields: fields, index: index, placeholder: waterMark, change: onChange.bind(_this) }))),
            React.createElement("div", { id: "format", className: 'col-lg-4 property-section' },
                React.createElement("div", null,
                    React.createElement("label", { className: "example-label", style: { marginTop: '40px' } }, "Choose input formats"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "inputFormatsDatePicker", dataSource: inputFormatData, fields: checkFields, placeholder: "e.g. MM/dd/yyyy", value: inputFormats, mode: "CheckBox", showSelectAll: true, showDropDownIcon: true, enableSelectionOrder: false, change: onChangeInputFormat },
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
exports.default = Dateformat;
