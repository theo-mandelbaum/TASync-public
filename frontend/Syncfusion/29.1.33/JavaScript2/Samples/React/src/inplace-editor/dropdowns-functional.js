"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inplace_editor_1 = require("@syncfusion/ej2-react-inplace-editor");
var sample_base_1 = require("../common/sample-base");
require("./dropdowns.component.css");
// tslint:disable:max-line-length
function DropDowns() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var editObj;
    var multiObj;
    var comboObbj;
    var dropObj;
    var editorMode;
    var popupSettings = { model: { width: 'auto' } };
    var multiValue = ['Canada', 'Bermuda'];
    // define the array of string
    var dropDownData = ['Australia', 'Bermuda', 'Canada', 'Cameroon', 'Denmark', 'Finland', 'Greenland', 'Poland'];
    var dropDownModel = { dataSource: dropDownData, placeholder: 'Find a country' };
    var autoCompleteModel = { dataSource: dropDownData, placeholder: ' Type to search country' };
    var comboBoxModel = { dataSource: dropDownData, placeholder: 'Find a country' };
    var multiSelectModel = { dataSource: dropDownData, placeholder: 'Choose the countries', mode: 'Box', width: 150 };
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
        editObj.mode = mode;
        multiObj.mode = mode;
        comboObbj.mode = mode;
        dropObj.mode = mode;
        editObj.dataBind();
        multiObj.dataBind();
        comboObbj.dataBind();
        dropObj.dataBind();
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
        if (editObj && (editObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            editObj.enableEditMode = false;
        }
        if (multiObj && (multiObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            multiObj.enableEditMode = false;
        }
        if (dropObj && (dropObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dropObj.enableEditMode = false;
        }
        if (comboObbj && (comboObbj.element.querySelectorAll('.e-editable-open').length > 0)) {
            comboObbj.enableEditMode = false;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-8 control-section inplace-control-section drop-down-layout" },
            React.createElement("div", { className: "control_wrapper" },
                React.createElement("table", null,
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null),
                            React.createElement("th", null))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label" }, "DropDownList ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (drop) { dropObj = drop; }, id: 'dropdownEle', mode: 'Inline', type: 'DropDownList', value: 'Canada', model: dropDownModel }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label" }, "AutoComplete ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (edit) { editObj = edit; }, id: 'autoCompleteEle', mode: 'Inline', type: 'AutoComplete', value: 'Australia', model: autoCompleteModel },
                                    React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.AutoComplete] })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label" }, "ComboBox ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (combo) { comboObbj = combo; }, id: 'comboBoxEle', mode: 'Inline', type: 'ComboBox', value: 'Finland', model: comboBoxModel },
                                    React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.ComboBox] })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("label", { className: "control-label" }, "MultiSelect ")),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inplace_editor_1.InPlaceEditorComponent, { ref: function (multi) { multiObj = multi; }, id: 'multiSelectEle', mode: 'Inline', type: 'MultiSelect', value: multiValue, model: multiSelectModel, popupSettings: popupSettings },
                                    React.createElement(ej2_react_inplace_editor_1.Inject, { services: [ej2_react_inplace_editor_1.MultiSelect] })))))))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "dropdownProperty" },
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
            React.createElement("p", null, "This sample demonstrates the usage of drop-down components such as AutoComplete, ComboBox, DropDownList, and MultiSelect. Click on the dotted input element to switch to the editable state of the corresponding integrated component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample illustrates the way to integrate drop-down components with ",
                React.createElement("code", null, "In-place Editor"),
                ". The applicable types of components are:"),
            React.createElement("p", null,
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DropDownList")),
                    React.createElement("li", null,
                        React.createElement("code", null, "AutoComplete")),
                    React.createElement("li", null,
                        React.createElement("code", null, "ComboBox")),
                    React.createElement("li", null,
                        React.createElement("code", null, "MultiSelect")))),
            React.createElement("p", null, "The above components and their features are editable in place and can be customized with the model properties of the specific component."),
            React.createElement("p", null,
                "More information on the ",
                React.createElement("code", null, "In-place Editor"),
                " instantiation can be found in the\u00A0",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = DropDowns;
