"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inplace_editor_1 = require("@syncfusion/ej2-react-inplace-editor");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./pickers.component.css");
// tslint:disable:max-line-length
function Pickers() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dateObj;
    var timeObj;
    var dateTimeObj;
    var dateRangeObj;
    var editorMode;
    var dateValue = new Date('5/23/2017');
    var dateTimeValue = new Date('5/23/2017 12:00 PM');
    var dateRangeValue = [new Date('5/23/2017'), new Date('7/5/2017')];
    var datePickerModel = { placeholder: 'Select a date' };
    var timePickerModel = { placeholder: 'Select a time', value: new Date('5/23/2017,12:00 PM') };
    var dateTimePickerModel = { placeholder: 'Select a date and time' };
    var dateRangePickerModel = { placeholder: 'Select a date range' };
    // Mapping DropDownList dataSource property
    var editorData = [
        { 'value': 'Inline', 'text': 'Inline' }, { 'value': 'Popup', 'text': 'Popup' }
    ];
    // Mapping DropDownList fields property
    var dropDownFields = { text: 'text', value: 'value' };
    // Mapping DropDownList value property
    var dropDownVal = 'Inline';
    // Change event funtion for DropDownList component   
    function changeEditorMode(e) {
        var mode = editorMode.value;
        dateObj.mode = mode;
        timeObj.mode = mode;
        dateTimeObj.mode = mode;
        dateRangeObj.mode = mode;
        dateObj.dataBind();
        timeObj.dataBind();
        dateTimeObj.dataBind();
        dateRangeObj.dataBind();
    }
    function rendereComplete() {
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', scrollRightPane);
        }
    }
    function componentWillUnmount() {
        var rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', scrollRightPane);
        }
    }
    function scrollRightPane() {
        var mode = document.getElementById('editorMode');
        if (mode && mode.value === 'Inline') {
            return;
        }
        if (dateObj && (dateObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateObj.enableEditMode = false;
        }
        if (timeObj && (timeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            timeObj.enableEditMode = false;
        }
        if (dateTimeObj && (dateTimeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateTimeObj.enableEditMode = false;
        }
        if (dateRangeObj && (dateRangeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dateRangeObj.enableEditMode = false;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-8 control-section inplace-control-section pickers-layout" },
            React.createElement("div", { className: "control_wrapper form-horizontal" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null),
                            React.createElement("th", null))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "DatePicker ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (date) { dateObj = date; }, id: 'datePickerEle', mode: 'Inline', type: 'Date', value: dateValue, model: datePickerModel }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "TimePicker ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (time) { timeObj = time; }, id: 'timePickerEle', mode: 'Inline', type: 'Time', value: dateValue, model: timePickerModel },
                                    React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.TimePicker] })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "DateTimePicker ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (dateTime) { dateTimeObj = dateTime; }, id: 'dateTimePickerEle', mode: 'Inline', type: 'DateTime', value: dateTimeValue, model: dateTimePickerModel }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "DateRangePicker ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (dateRange) { dateRangeObj = dateRange; }, id: 'dateRangePickerEle', mode: 'Inline', type: 'DateRange', value: dateRangeValue, model: dateRangePickerModel },
                                    React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.DateRangePicker] })))))))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "pickerProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Mode")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (drop) { editorMode = drop; }, id: 'editorMode', className: 'form-control', dataSource: editorData, fields: dropDownFields, value: dropDownVal, width: '90%', change: changeEditorMode.bind(this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the usage of picker components such as Date, Time, DateTime, and DateRange. Click on the dotted input element to switch to the editable state of the corresponding integrated component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample illustrates the way to integrate picker components with the ",
                React.createElement("code", null, "In-place Editor"),
                " control. The applicable types of components are:"),
            React.createElement("p", null,
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DatePicker")),
                    React.createElement("li", null,
                        React.createElement("code", null, "TimePicker")),
                    React.createElement("li", null,
                        React.createElement("code", null, "DateTimePicker")),
                    React.createElement("li", null,
                        React.createElement("code", null, "DateRangePicker")))),
            React.createElement("p", null, "The above components and their features are editable in place and can be customized with the model properties of the specific component."),
            React.createElement("p", null,
                "More information on the ",
                React.createElement("code", null, "In-place Editor"),
                " instantiation can be found in the\u00A0",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = Pickers;
