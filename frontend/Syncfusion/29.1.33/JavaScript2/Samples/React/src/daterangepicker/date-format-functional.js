"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./format-style.css");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var startValue = new Date(new Date().setDate(1));
var endValue = new Date(new Date().setDate(20));
var Format = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataTypes = [
        { value: 'dd\'\/\'MMM\'\/\'yy hh:mm a', text: 'dd/MMM/yy hh:mm a' },
        { value: 'yyyy\'\/\'MM\'\/\'dd HH:mm', text: 'yyyy/MM/dd HH:mm' },
        { value: 'dd\'\/\'MMMM\'\/\'yyyy', text: 'dd/MMMM/yyyy' },
    ];
    var fields = { value: 'value', text: 'text' };
    var waterMark = 'Format';
    var floatLabelType = 'Auto';
    var index = 0;
    var _a = (0, react_1.useState)('dd/MMM/yy hh:mm a'), format = _a[0], setFormat = _a[1];
    var _b = (0, react_1.useState)('-'), separator = _b[0], setSeparator = _b[1];
    /*Apply selected format to the component*/
    var onChange = function (args) {
        setFormat(args.value);
        setSeparator(args.itemData[fields.text] === 'yyyy/MM/dd HH:mm' ? 'to' : '-');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'daterangepicker-control-section format' },
                    React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { format: format, separator: separator, startDate: startValue, endDate: endValue }))),
            React.createElement("div", { id: "format", className: 'col-lg-4 property-section' },
                React.createElement("div", null,
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "dateFormats", dataSource: dataTypes, fields: fields, floatLabelType: floatLabelType, index: index, placeholder: waterMark, change: onChange.bind(_this) })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In this sample, the DateRangePicker has been configured with the ",
                React.createElement("code", null, " dd/MMM/yy hh:mm a"),
                " date time format. To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options. For mobile mode touch the icon at the right side and select a date time format from the dropdown options.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Format sample illustrates the support of custom date format in the DateRangePicker component by using the ",
                React.createElement("code", null, "format"),
                " property. You can also change the date format by selecting it from the format options in the properties panel."),
            React.createElement("p", null,
                " More information on the date format configuration can be found in the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/daterangepicker/globalization/#date-format", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Format;
