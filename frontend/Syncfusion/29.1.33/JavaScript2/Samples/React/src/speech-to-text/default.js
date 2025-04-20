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
exports.Default = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./default.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default(props) {
        var _this = _super.call(this, props) || this;
        _this.isSupportedBrowser = true;
        _this.miColor = [
            { text: "Normal", value: "" },
            { text: "Primary", value: "e-primary" },
            { text: "Success", value: "e-success" },
            { text: "Warning", value: "e-warning" },
            { text: "Danger", value: "e-danger" },
            { text: "Flat", value: "e-flat" },
            { text: "Info", value: "e-info" }
        ];
        _this.languageTypes = [
            { text: "English, US", value: "en-US" },
            { text: "German, DE", value: "de-DE" },
            { text: "Chinese, CN", value: "zh-CN" },
            { text: "French, FR", value: "fr-FR" },
            { text: "Arabic, SA", value: "ar-SA" }
        ];
        _this.micField = { text: "text", value: "value" };
        _this.languageField = { text: "text", value: "value" };
        _this.onTranscriptChanged = function (args) {
            if (!args.isInterimResult)
                args.transcript += ' ';
            _this.textareaObj.value = args.transcript;
            _this.toggleCopyButtonState();
        };
        _this.onListeningStart = function () {
            if (_this.isSupportedBrowser) {
                if (_this.textareaObj.value)
                    _this.speechToTextObj.transcript = _this.textareaObj.value + '\n';
                _this.updateStatus('Listening... Speak now...');
            }
            else {
                _this.updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
            }
            _this.setState({
                languageDropdownEnabled: false,
                interimSwitchDisabled: true
            });
        };
        _this.onListeningStop = function (args) {
            if (_this.isSupportedBrowser) {
                if (args.isInteracted)
                    _this.updateStatus('Click the mic button to start speaking...');
            }
            else {
                _this.updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
            }
            _this.setState({
                languageDropdownEnabled: true,
                interimSwitchDisabled: false
            });
        };
        _this.onErrorHandler = function (args) {
            _this.updateStatus(args.errorMessage);
            if (args.error === 'unsupported-browser')
                _this.isSupportedBrowser = false;
        };
        _this.updateStatus = function (status) {
            document.querySelector('.speech-recognition-status').innerText = status;
        };
        _this.handleMiColor = function (args) {
            _this.speechToTextObj.cssClass = args.value;
        };
        _this.handleLanguageType = function (args) {
            _this.speechToTextObj.lang = args.value;
        };
        _this.handleAllowInterimResults = function (args) {
            _this.speechToTextObj.allowInterimResults = args.checked;
        };
        _this.handleShowTooltip = function (args) {
            _this.speechToTextObj.showTooltip = args.checked;
        };
        _this.handleIconWithText = function (args) {
            _this.speechToTextObj.buttonSettings = {
                content: args.checked ? 'Start Listening' : '',
                stopContent: args.checked ? 'Stop Listening' : ''
            };
        };
        _this.handleCopyButton = function () {
            var copyText = _this.textareaObj.value;
            var copyBtnElem = document.querySelector('#transcript-copy-button');
            if (copyText && navigator.clipboard) {
                navigator.clipboard.writeText(copyText).then(function () {
                    copyBtnElem.innerText = 'Copied!';
                    setTimeout(function () {
                        copyBtnElem.innerText = 'Copy';
                    }, 1000);
                }).catch(function (err) {
                    console.error('Clipboard write failed', err);
                });
            }
        };
        _this.handleClearButton = function () {
            _this.textareaObj.value = _this.speechToTextObj.transcript = '';
            _this.toggleCopyButtonState();
        };
        _this.toggleCopyButtonState = function () {
            var hasText = _this.textareaObj.element.value.trim() !== '';
            _this.copyButtonObj.disabled = hasText ? false : true;
        };
        _this.state = {
            languageDropdownEnabled: true,
            interimSwitchDisabled: false
        };
        return _this;
    }
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "default-speechToText-section" },
                    React.createElement("div", { className: "speechToText-container" },
                        React.createElement(ej2_react_inputs_1.SpeechToTextComponent, { id: "speech-to-text", ref: function (speechtotext) { _this.speechToTextObj = speechtotext; }, transcriptChanged: this.onTranscriptChanged, onStart: this.onListeningStart, onStop: this.onListeningStop, onError: this.onErrorHandler }),
                        React.createElement("mark", { className: "speech-recognition-status" }, "Click the mic button to start speaking...")),
                    React.createElement("div", { className: "output-container" },
                        React.createElement("h4", null, "Live Speech Transcription"),
                        React.createElement("mark", { className: "speech-recognition-status" }, "Click the above mic button to start speaking..."),
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "output-textarea", ref: function (textarea) { _this.textareaObj = textarea; }, cssClass: "e-outline", resizeMode: "None", rows: 10, placeholder: "Transcribed text will appear here...", input: this.toggleCopyButtonState }),
                        React.createElement("div", { className: "output-options" },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "transcript-copy-button", ref: function (button) { _this.copyButtonObj = button; }, disabled: true, onClick: this.handleCopyButton, className: "e-btn" }, "Copy"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "transcript-clear-button", onClick: this.handleClearButton, className: "e-btn" }, "Clear"))))),
            React.createElement("div", { className: "col-lg-4 default-speechToText property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "property-panel-content" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null, "Styling"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "stt-styling-ddl", dataSource: this.miColor, fields: this.micField, change: this.handleMiColor, index: 0 }))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Language"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "stt-lang-ddl", dataSource: this.languageTypes, fields: this.languageField, change: this.handleLanguageType, index: 0, enabled: this.state.languageDropdownEnabled }))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Interim results"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "interim-switch", type: "checkbox", checked: true, change: this.handleAllowInterimResults, disabled: this.state.interimSwitchDisabled }))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Show tooltip"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "tooltip-switch", type: "checkbox", checked: true, change: this.handleShowTooltip }))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "Show icon with text"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "icon-with-text-switch", type: "checkbox", checked: false, change: this.handleIconWithText }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample showcases the functionality of the SpeechToText component, which converts spoken words into text using your device\u2019s microphone. It utilizes the built-in JavaScript SpeechRecognition API for speech processing. Speak into the microphone to see the transcribed text appear in the text area.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The SpeechToText component enables real-time speech-to-text conversion using the JavaScript ",
                    React.createElement("code", null, "SpeechRecognition"),
                    " API. This demo explores its key features and customization options:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "cssClass"),
                        ": Modify the microphone button\u2019s appearance with predefined styles such as Success, Warning, or Danger."),
                    React.createElement("li", null,
                        React.createElement("code", null, "lang"),
                        ": Select a preferred language for speech recognition."),
                    React.createElement("li", null,
                        React.createElement("code", null, "allowInterimResults"),
                        ": Choose whether to display words as you speak or only after completing a phrase."),
                    React.createElement("li", null,
                        React.createElement("code", null, "showTooltip"),
                        ": Enable or disable tooltips for additional guidance."),
                    React.createElement("li", null,
                        React.createElement("code", null, "buttonSettings"),
                        ": Configure the button to display text alongside the microphone icon.")),
                React.createElement("p", null, "These options allow you to configure the SpeechToText component to suit your needs. Try different settings in the property panel to see how they affect the component\u2019s appearance and functionality."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
