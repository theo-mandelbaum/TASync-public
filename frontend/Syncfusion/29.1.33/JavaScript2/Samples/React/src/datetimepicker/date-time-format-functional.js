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
        { value: 'dd-MMM-yy hh:mm a' },
        { value: 'yyyy-MM-dd HH:mm' },
        { value: 'dd-MMMM HH:mm' },
    ];
    var inputFormatData = [
        { text: 'dd/MM/yyyy HH:mm', value: 'dd/MM/yyyy HH:mm' },
        { text: 'ddMMMyy HH:mm', value: 'ddMMMyy HH:mm' },
        { text: 'yyyyMMdd HH:mm', value: 'yyyyMMdd HH:mm' },
        { text: 'dd.MM.yy HH:mm', value: 'dd.MM.yy HH:mm' },
        { text: 'MM/dd/yyyy HH:mm', value: 'MM/dd/yyyy HH:mm' },
        { text: 'yyyy/MMM/dd HH:mm', value: 'yyyy/MMM/dd HH:mm' },
        { text: 'dd-MM-yyyy HH:mm', value: 'dd-MM-yyyy HH:mm' },
    ];
    var fields = { value: 'value' };
    var checkFields = { text: 'text', value: 'value' };
    var waterMark = 'Format';
    var index = 0;
    var _a = (0, react_1.useState)('dd-MMM-yy hh:mm a'), format = _a[0], setFormat = _a[1];
    var _b = (0, react_1.useState)(['dd/MM/yyyy HH:mm', 'yyyyMMdd HH:mm']), inputFormats = _b[0], setinputFormats = _b[1];
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
                React.createElement("div", { className: 'datetimepicker-control-section' },
                    React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { format: format, value: dateValue, inputFormats: inputFormats }))),
            React.createElement("div", { id: "format", className: 'col-lg-4 property-section', style: { width: '250px' } },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", null,
                    React.createElement("label", { className: 'example-label' }, "Choose a display format"),
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "dateFormats", dataSource: dataTypes, fields: fields, index: index, placeholder: waterMark, change: onChange.bind(_this) }))),
            React.createElement("div", { id: "format", className: 'col-lg-4 property-section', style: { width: '250px' } },
                React.createElement("div", null,
                    React.createElement("label", { className: "example-label", style: { marginTop: '40px' } }, "Choose input formats"),
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "inputFormatsDatePicker", dataSource: inputFormatData, fields: checkFields, placeholder: "e.g. MM/dd/yyyy", value: inputFormats, mode: "CheckBox", showSelectAll: true, showDropDownIcon: true, enableSelectionOrder: false, change: onChangeInputFormat },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In this sample, the DateTimePicker has been configured with the",
                React.createElement("code", null, "dd-MMM-yy hh:mm a"),
                " date time format. To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options. For mobile mode touch the icon at the right side and select a date time format from the dropdown options.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Format sample illustrates the support of custom date format in the DateTimePicker component by using the ",
                React.createElement("code", null, "format"),
                " property. You can also change the datetime format by selecting it from the format options in the properties panel.  By using the ",
                React.createElement("code", null, "timeFormat"),
                " property to customize the displayed time value in a time popup list."))));
};
exports.default = Dateformat;
