"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var React = require("react");
require("./default.css");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isSupportedBrowser = _a[0], setIsSupportBrowser = _a[1];
    var _b = (0, react_1.useState)(true), languageDropdownEnabled = _b[0], setLanguageDropdownEnabled = _b[1];
    var _c = (0, react_1.useState)(false), interimSwitchDisabled = _c[0], setInterimSwitchDisabled = _c[1];
    var speechToTextObj = (0, react_1.useRef)(null);
    var textareaObj = (0, react_1.useRef)(null);
    var copyButtonObj = (0, react_1.useRef)(null);
    var miColor = [
        { text: "Normal", value: "" },
        { text: "Primary", value: "e-primary" },
        { text: "Success", value: "e-success" },
        { text: "Warning", value: "e-warning" },
        { text: "Danger", value: "e-danger" },
        { text: "Flat", value: "e-flat" },
        { text: "Info", value: "e-info" }
    ];
    var languageTypes = [
        { text: "English, US", value: "en-US" },
        { text: "German, DE", value: "de-DE" },
        { text: "Chinese, CN", value: "zh-CN" },
        { text: "French, FR", value: "fr-FR" },
        { text: "Arabic, SA", value: "ar-SA" }
    ];
    var micField = { text: "text", value: "value" };
    var languageField = { text: "text", value: "value" };
    var onTranscriptChanged = function (args) {
        if (!args.isInterimResult)
            args.transcript += ' ';
        textareaObj.current.value = args.transcript;
        toggleCopyButtonState();
    };
    var onListeningStart = function () {
        if (isSupportedBrowser) {
            if (textareaObj.current.value)
                speechToTextObj.current.transcript = textareaObj.current.value + '\n';
            updateStatus('Listening... Speak now...');
        }
        else {
            updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
        }
        setLanguageDropdownEnabled(false);
        setInterimSwitchDisabled(true);
    };
    var onListeningStop = function (args) {
        if (isSupportedBrowser) {
            if (args.isInteracted)
                updateStatus('Click the mic button to start speaking...');
        }
        else {
            updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
        }
        setLanguageDropdownEnabled(true);
        setInterimSwitchDisabled(false);
    };
    var onErrorHandler = function (args) {
        updateStatus(args.errorMessage);
        if (args.error === 'unsupported-browser')
            setIsSupportBrowser(false);
    };
    var updateStatus = function (status) {
        document.querySelector('.speech-recognition-status').innerText = status;
    };
    var handleMiColor = function (args) {
        speechToTextObj.current.cssClass = args.value;
    };
    var handleLanguageType = function (args) {
        speechToTextObj.current.lang = args.value;
    };
    var handleAllowInterimResults = function (args) {
        speechToTextObj.current.allowInterimResults = args.checked;
    };
    var handleShowTooltip = function (args) {
        speechToTextObj.current.showTooltip = args.checked;
    };
    var handleIconWithText = function (args) {
        speechToTextObj.current.buttonSettings = {
            content: args.checked ? 'Start Listening' : '',
            stopContent: args.checked ? 'Stop Listening' : ''
        };
    };
    var handleCopyButton = function () {
        var copyText = textareaObj.current.value;
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
    var handleClearButton = function () {
        textareaObj.current.value = speechToTextObj.current.transcript = '';
        toggleCopyButtonState();
    };
    var toggleCopyButtonState = function () {
        var hasText = textareaObj.current.element.value.trim() !== '';
        copyButtonObj.current.disabled = hasText ? false : true;
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "default-speechToText-section" },
                React.createElement("div", { className: "speechToText-container" },
                    React.createElement(ej2_react_inputs_1.SpeechToTextComponent, { id: "speech-to-text", ref: speechToTextObj, transcriptChanged: onTranscriptChanged, onStart: onListeningStart, onStop: onListeningStop, onError: onErrorHandler }),
                    React.createElement("mark", { className: "speech-recognition-status" }, "Click the mic button to start speaking...")),
                React.createElement("div", { className: "output-container" },
                    React.createElement("h4", null, "Live Speech Transcription"),
                    React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "output-textarea", ref: textareaObj, cssClass: "e-outline", resizeMode: "None", rows: 10, placeholder: "Transcribed text will appear here...", input: toggleCopyButtonState }),
                    React.createElement("div", { className: "output-options" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "transcript-copy-button", className: "e-btn", onClick: handleCopyButton, disabled: true, ref: copyButtonObj }, "Copy"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "transcript-clear-button", className: "e-btn", onClick: handleClearButton }, "Clear"))))),
        React.createElement("div", { className: "col-lg-4 default-speechToText property-section" },
            React.createElement("div", { className: "property-panel-header" }, "Properties"),
            React.createElement("div", { className: "property-panel-content" },
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "Styling"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "stt-styling-ddl", dataSource: miColor, fields: micField, change: handleMiColor, index: 0 }))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Language"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "stt-lang-ddl", dataSource: languageTypes, fields: languageField, change: handleLanguageType, index: 0, enabled: languageDropdownEnabled }))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Interim results"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "interim-switch", type: "checkbox", checked: true, change: handleAllowInterimResults, disabled: interimSwitchDisabled }))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Show tooltip"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "tooltip-switch", type: "checkbox", checked: true, change: handleShowTooltip }))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Show icon with text"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "icon-with-text-switch", type: "checkbox", checked: false, change: handleIconWithText }))))))),
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
exports.default = Default;
