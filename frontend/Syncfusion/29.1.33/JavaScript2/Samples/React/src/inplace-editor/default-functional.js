"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inplace_editor_1 = require("@syncfusion/ej2-react-inplace-editor");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./inplace.component.css");
// tslint:disable:max-line-length
function Default() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var textObj;
    var numericObj;
    var maskObj;
    var editableon;
    var editorMode;
    var textModel = { placeholder: 'Enter employee name' };
    var popupSettings = { title: 'Enter Employee Name' };
    var numericModel = { format: 'c2', value: 100, placeholder: 'Currency format' };
    var maskModel = { mask: '000-000-0000' };
    // Mapping DropDownList dataSource property
    var dropDownData = [
        { 'value': 'Inline', 'text': 'Inline' }, { 'value': 'popup', 'text': 'Popup' }
    ];
    // Mapping DropDownList fields property
    var dropDownFields = { text: 'text', value: 'value' };
    // Mapping DropDownList value property
    var dropDownVal = 'Inline';
    // Mapping DropDownList dataSource property
    var editableData = [
        { 'value': 'Click', 'text': 'Click' }, { 'value': 'DblClick', 'text': 'Double Click' }, { 'value': 'EditIconClick', 'text': 'Edit Icon Click' }
    ];
    // Mapping DropDownList fields property
    var editableFields = { text: 'text', value: 'value' };
    // Mapping DropDownList value property
    var editableVal = 'Click';
    // Change event funtion for DropDownList component   
    function changeEditorMode(e) {
        var mode = editorMode.value;
        textObj.mode = numericObj.mode = maskObj.mode = mode;
        textObj.dataBind();
        numericObj.dataBind();
        maskObj.dataBind();
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
        if (textObj && (textObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            textObj.enableEditMode = false;
        }
        if (numericObj && (numericObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            numericObj.enableEditMode = false;
        }
        if (maskObj && (maskObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            maskObj.enableEditMode = false;
        }
    }
    // Change event funtion for DropDownList component   
    function onEditableOn(e) {
        var editableValue = editableon.value;
        textObj.editableOn = numericObj.editableOn = maskObj.editableOn = editableValue;
        textObj.dataBind();
        numericObj.dataBind();
        maskObj.dataBind();
    }
    // Change event funtion for CheckBox component
    function onChange(e) {
        e.checked ? textObj.showButtons = numericObj.showButtons = maskObj.showButtons = true : textObj.showButtons = numericObj.showButtons = maskObj.showButtons = false;
    }
    // Change event funtion for CheckBox component
    function onChangeEnable(e) {
        e.checked ? textObj.disabled = numericObj.disabled = maskObj.disabled = true : textObj.disabled = numericObj.disabled = maskObj.disabled = false;
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-8 control-section inplace-control-section default_layout" },
            React.createElement("div", { className: "control_wrapper" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null),
                            React.createElement("th", null))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "TextBox ")),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (text) { textObj = text; }, id: 'textboxEle', mode: 'Inline', type: 'Text', value: 'Andrew', model: textModel, popupSettings: popupSettings }))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "NumericTextBox ")),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (numeric) { numericObj = numeric; }, id: 'numericTextBoxEle', mode: 'Inline', type: 'Numeric', value: '$100.00', model: numericModel }))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("label", { className: "control-label", style: { textAlign: 'left', fontSize: '14px', fontWeight: 400 } }, "MaskedTextBox ")),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (mask) { maskObj = mask; }, id: 'maskedTextBoxEle', mode: 'Inline', type: 'Mask', value: '012-345-6789', model: maskModel })))))),
        React.createElement("div", { className: 'col-lg-4 property-section inplace-overview', id: "defaultProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Mode")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (edit) { editorMode = edit; }, id: 'editorMode', className: 'form-control', dataSource: dropDownData, fields: dropDownFields, value: dropDownVal, width: '90%', change: changeEditorMode.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Editable On")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (edit) { editableon = edit; }, id: 'editableon', className: 'form-control', dataSource: editableData, fields: editableFields, value: editableVal, width: '90%', change: onEditableOn.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Show Buttons")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'showbuttons', checked: true, labelPosition: 'Before', change: onChange.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Disable")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'editorEnable', checked: false, labelPosition: 'Before', change: onChangeEnable.bind(this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the In-place Editor control. Click on the dotted input element to switch to the editable state and save or cancel it by clicking the actions buttons.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "In-place Editor"),
                " component is used to edit values in place and update them to the server."),
            React.createElement("p", null,
                React.createElement("code", null, "In-place Editor"),
                " modes can be switched by selecting the appropriate values provided in a drop-down. The applicable editor positions are as follows:"),
            React.createElement("p", null,
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/inplace-editor/#mode" }, "Inline")),
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/inplace-editor/#mode" }, "Pop-up")))),
            React.createElement("p", null,
                "The edit on modes of In-place editor can be switched by selecting the appropriate values provided in a drop-down. The applicable modes are as follows:",
                React.createElement("ul", null,
                    React.createElement("li", null, "Click - Editor opens the edit input with single click of textbox."),
                    React.createElement("li", null, "DblClick - Editor opens the edit input with double click of textbox."),
                    React.createElement("li", null, "EditIconClick - Edit mode can be open with the use of edit icon only which is visible on hover of textbox."))),
            React.createElement("p", null,
                "The Save and Cancel buttons of the ",
                React.createElement("code", null, "In-place Editor"),
                " control can be shown or hidden by switching the Show Button check box state. If the action buttons are hidden, then you can save the data by clicking outside the target or by pressing the Enter key. You can cancel the edit request by pressing the Esc key."),
            React.createElement("p", null,
                "More information on the ",
                React.createElement("code", null, "In-place Editor"),
                " instantiation can be found in the\u00A0",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = Default;
