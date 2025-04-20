"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
function RTEApi() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    var getVal;
    var selectHtml;
    var selectall;
    var Numericvalue = 1000;
    var min = 555;
    var max = 2000;
    var placeholder = "Maximum Length";
    var format = 'n0';
    var numericChange = function (e) {
        rteObj.maxLength = e.value;
    };
    var readonlyChecked = false;
    var readonlyChange = function (args) {
        rteObj.readonly = args.checked;
    };
    var enableChecked = true;
    var enableChange = function (args) {
        rteObj.enabled = args.checked;
    };
    var htmlChecked = false;
    var htmlChange = function (args) {
        rteObj.enableHtmlEncode = args.checked;
    };
    var getValue = function () {
        alert(rteObj.value);
    };
    var getSelection = function () {
        alert(rteObj.getSelection());
    };
    var selectAll = function () {
        rteObj.selectAll();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-8' },
            React.createElement("div", { className: 'control-section', id: "rteAPI" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "API", ref: function (richtexteditor) { rteObj = richtexteditor; }, showCharCount: true, maxLength: 1000 },
                        React.createElement("p", null, "Rich Text Editor is a WYSIWYG editing control which will reduce the effort for users while trying to express their formatting word content as HTML or Markdown format."),
                        React.createElement("p", null,
                            React.createElement("b", null, "API\u2019s:")),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("p", null, "maxLength - allows restricting the maximum length to be entered.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "readOnly - allows to change it as a non-editable state.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "enabled - enable or disable the RTE component.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "enableHtmlEncode - Get the encoded string value through value property and source code panel")),
                            React.createElement("li", null,
                                React.createElement("p", null, "getValue - get the value of RTE.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "getSelection - get the selected text of RTE.")),
                            React.createElement("li", null,
                                React.createElement("p", null, "selectAll - select all content in RTE."))),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Count, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] }))))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "rteAPIProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', margin: '10px' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                React.createElement("div", null, "Max Length ")),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "maxlength", min: min, max: max, format: format, change: numericChange.bind(this), value: Numericvalue })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                React.createElement("div", null, "Readonly")),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "readonly", checked: readonlyChecked, change: readonlyChange.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                React.createElement("div", null, "Enable")),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "enable", checked: enableChecked, change: enableChange.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                React.createElement("div", null, "Enable HTML Encode ")),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingLeft: '10px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "enablehtml", checked: htmlChecked, change: htmlChange.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingTop: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "getVal", ref: function (btn) { getVal = btn; }, onClick: getValue.bind(this), className: "btn btn-default" }, "Get Value")))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingTop: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "selectHtml", ref: function (btn) { selectHtml = btn; }, onClick: getSelection.bind(this), className: "btn btn-default" }, "Get Selection")))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingTop: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "selectall", ref: function (btn) { selectall = btn; }, onClick: selectAll.bind(this), className: "btn btn-default" }, "Select All ")))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrate the usage of API in Rich Text Editor, use the properties panel to change maximum length, read only mode, disable status, to get value, enable HTML encode, select all content and get selected HTML from the Rich Text Editor.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this demos, Ensuring the API'S behavious by doing"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Change the value of ",
                    React.createElement("code", null, "maxLength"),
                    " textbox to change maximum Length of character."),
                React.createElement("li", null,
                    "Click the ",
                    React.createElement("code", null, "readOnly"),
                    " check box to enable/disable editable and non-editable mode of the RTE."),
                React.createElement("li", null,
                    "Click the ",
                    React.createElement("code", null, "enabled"),
                    " check box to enable/disable the RTE component."),
                React.createElement("li", null,
                    "Click the ",
                    React.createElement("code", null, "enableHtmlEncode"),
                    " check box to enableHtmlEncode/disableHtmlEncode the RTE component."),
                React.createElement("li", null,
                    "Click the ",
                    React.createElement("code", null, "getValue"),
                    " button which shows the RTE values in the alert window."),
                React.createElement("li", null,
                    "Click the ",
                    React.createElement("code", null, "getSelection"),
                    " button which shows the selectedText in the alert window."),
                React.createElement("li", null,
                    "Click the ",
                    React.createElement("code", null, "selectAll"),
                    " button selecting all text content in the RTE.")),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                React.createElement("code", null, "Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, PasteCleanup"),
                " modules into the services."))));
}
exports.default = RTEApi;
