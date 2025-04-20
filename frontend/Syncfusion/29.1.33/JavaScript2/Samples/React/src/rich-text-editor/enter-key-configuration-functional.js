"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor Enter Key Configuration sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var CodeMirror = require("codemirror");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("./enter-key-configuration.css");
function EnterKeyConfiguration() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var state = {
        textAreaValue: "<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>"
    };
    var rteObj;
    var enterList;
    var shiftEnterList;
    var rteValue = "<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>";
    var popupHeight = '200px';
    var enterValue = "P";
    var shiftEnterValue = "BR";
    var enterPlaceholder = "When pressing the enter key";
    var shiftEnterPlaceholder = "When pressing the shift + enter key";
    var fields = { text: "text", value: "value" };
    var enterData = [
        { text: 'Create a new <p>', value: 'P' },
        { text: 'Create a new <div>', value: 'DIV' },
        { text: 'Create a new <br>', value: 'BR' }
    ];
    var shiftEnterData = [
        { text: 'Create a new <br>', value: 'BR' },
        { text: 'Create a new <div>', value: 'DIV' },
        { text: 'Create a new <p>', value: 'P' }
    ];
    var enterChange = function () {
        if (enterList.value === 'P') {
            rteObj.enterKey = 'P';
            rteObj.value = "<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>";
        }
        else if (enterList.value === 'DIV') {
            rteObj.enterKey = 'DIV';
            rteObj.value = "<div>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</div><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>";
        }
        else if (enterList.value === 'BR') {
            rteObj.enterKey = 'BR';
            rteObj.value = "In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:<ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>";
        }
        onChange();
    };
    var shiftEnterChange = function () {
        if (shiftEnterList.value === 'BR') {
            rteObj.shiftEnterKey = 'BR';
        }
        else if (shiftEnterList.value === 'DIV') {
            rteObj.shiftEnterKey = 'DIV';
        }
        else if (shiftEnterList.value === 'P') {
            rteObj.shiftEnterKey = 'P';
        }
    };
    var onCreate = function () {
        onChange();
    };
    var onChange = function () {
        var id = rteObj.getID() + 'mirror-view';
        var codeView = document.getElementById('codeView');
        var mirrorView;
        if (document.getElementById(id)) {
            mirrorView = document.getElementById(id);
            mirrorView.innerHTML = '';
        }
        else {
            mirrorView = (0, ej2_base_1.createElement)('div', { className: 'e-content codeViewContent' });
            mirrorView.id = id;
            codeView.appendChild(mirrorView);
        }
        mirrorView.style.display = 'block';
        if (rteObj.value !== null) {
            CodeMirror(mirrorView, {
                value: rteObj.value,
                mode: 'text/html',
                lineWrapping: true,
                readOnly: true
            });
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section enter-key', id: "rte" },
            React.createElement("div", { className: 'rte-control-section' },
                React.createElement("table", { className: 'api' },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "enterOption", dataSource: enterData, ref: function (dropdownlist) { enterList = dropdownlist; }, fields: fields, change: enterChange.bind(this), value: enterValue, popupHeight: popupHeight, placeholder: enterPlaceholder, floatLabelType: "Always" }))),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "shiftEnterOption", dataSource: shiftEnterData, ref: function (dropdownlist) { shiftEnterList = dropdownlist; }, fields: fields, change: shiftEnterChange.bind(this), value: shiftEnterValue, popupHeight: popupHeight, placeholder: shiftEnterPlaceholder, floatLabelType: "Always" })))))),
                React.createElement("br", null),
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "defaultRTE", ref: function (richtexteditor) { rteObj = richtexteditor; }, change: onChange.bind(this), created: onCreate.bind(this), height: 220, saveInterval: 1, value: rteValue },
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })),
                React.createElement("br", null),
                React.createElement("label", null, "Code View "),
                React.createElement("div", { id: "codeView", className: "codeView" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the API usage to customize the enter key and shift + enter key actions in the Rich Text Editor content. Code view represents the current rich text editor value when pressing typing any content or pressing enter key or shift + enter keys.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this demo, ensure the API's behaviors by"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Changing the value of ",
                    React.createElement("code", null, "enterKey"),
                    " dropdown to customize the enter key action when it is pressed."),
                React.createElement("li", null,
                    "Changing the value of ",
                    React.createElement("code", null, "shiftEnterKey"),
                    " dropdown to customize the shift + enter key action when it is pressed.")))));
}
exports.default = EnterKeyConfiguration;
