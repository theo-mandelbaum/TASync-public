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
exports.EnterKeyConfiguration = void 0;
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
var EnterKeyConfiguration = /** @class */ (function (_super) {
    __extends(EnterKeyConfiguration, _super);
    function EnterKeyConfiguration(props) {
        var _this = _super.call(this, props) || this;
        _this.rteValue = "<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>";
        _this.popupHeight = '200px';
        _this.enterValue = "P";
        _this.shiftEnterValue = "BR";
        _this.enterPlaceholder = "When pressing the enter key";
        _this.shiftEnterPlaceholder = "When pressing the shift + enter key";
        _this.fields = { text: "text", value: "value" };
        _this.enterData = [
            { text: 'Create a new <p>', value: 'P' },
            { text: 'Create a new <div>', value: 'DIV' },
            { text: 'Create a new <br>', value: 'BR' }
        ];
        _this.shiftEnterData = [
            { text: 'Create a new <br>', value: 'BR' },
            { text: 'Create a new <div>', value: 'DIV' },
            { text: 'Create a new <p>', value: 'P' }
        ];
        _this.enterChange = function () {
            if (_this.enterList.value === 'P') {
                _this.rteObj.enterKey = 'P';
                _this.rteObj.value = "<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>";
            }
            else if (_this.enterList.value === 'DIV') {
                _this.rteObj.enterKey = 'DIV';
                _this.rteObj.value = "<div>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</div><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>";
            }
            else if (_this.enterList.value === 'BR') {
                _this.rteObj.enterKey = 'BR';
                _this.rteObj.value = "In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:<ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>";
            }
            _this.onChange();
        };
        _this.shiftEnterChange = function () {
            if (_this.shiftEnterList.value === 'BR') {
                _this.rteObj.shiftEnterKey = 'BR';
            }
            else if (_this.shiftEnterList.value === 'DIV') {
                _this.rteObj.shiftEnterKey = 'DIV';
            }
            else if (_this.shiftEnterList.value === 'P') {
                _this.rteObj.shiftEnterKey = 'P';
            }
        };
        _this.onCreate = function () {
            _this.onChange();
        };
        _this.onChange = function () {
            var id = _this.rteObj.getID() + 'mirror-view';
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
            if (_this.rteObj.value !== null) {
                CodeMirror(mirrorView, {
                    value: _this.rteObj.value,
                    mode: 'text/html',
                    lineWrapping: true,
                    readOnly: true
                });
            }
        };
        _this.state = {
            textAreaValue: "<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>"
        };
        return _this;
    }
    EnterKeyConfiguration.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section enter-key', id: "rte" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement("table", { className: 'api' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "enterOption", dataSource: this.enterData, ref: function (dropdownlist) { _this.enterList = dropdownlist; }, fields: this.fields, change: this.enterChange.bind(this), value: this.enterValue, popupHeight: this.popupHeight, placeholder: this.enterPlaceholder, floatLabelType: "Always" }))),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "shiftEnterOption", dataSource: this.shiftEnterData, ref: function (dropdownlist) { _this.shiftEnterList = dropdownlist; }, fields: this.fields, change: this.shiftEnterChange.bind(this), value: this.shiftEnterValue, popupHeight: this.popupHeight, placeholder: this.shiftEnterPlaceholder, floatLabelType: "Always" })))))),
                    React.createElement("br", null),
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "defaultRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, change: this.onChange.bind(this), created: this.onCreate.bind(this), height: 220, saveInterval: 1, value: this.rteValue },
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
    };
    return EnterKeyConfiguration;
}(sample_base_1.SampleBase));
exports.EnterKeyConfiguration = EnterKeyConfiguration;
