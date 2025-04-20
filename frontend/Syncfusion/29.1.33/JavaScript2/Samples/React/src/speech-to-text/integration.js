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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var React = require("react");
require("./default.css");
var sample_base_1 = require("../common/sample-base");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarSettings = {
            items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
            itemClicked: function (args) { return _this.toolbarItemClicked(args); }
        };
        _this.bannerTemplate = function () {
            return (React.createElement("div", { className: "banner-info" },
                React.createElement("div", { className: "e-icons e-listen-icon" }),
                React.createElement("h3", null, "Speech To Text"),
                React.createElement("i", null, "Click the below mic-button to convert your voice to text.")));
        };
        _this.footerTemplate = function () {
            return (React.createElement("div", { className: "e-footer-wrapper" },
                React.createElement("div", { id: "assistview-footer", className: "content-editor", contentEditable: "true", placeholder: "Click to speak or start typing...", onInput: _this.toggleButtons, onKeyDown: _this.handleKeyDown }),
                React.createElement("div", { className: "option-container" },
                    React.createElement(ej2_react_inputs_1.SpeechToTextComponent, { id: "speechToText", ref: function (speechtotext) { _this.speechToTextObj = speechtotext; }, transcriptChanged: _this.onTranscriptChange, onStop: _this.onListeningStop, created: _this.onCreated, onError: _this.onErrorHandler }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "assistview-sendButton", className: "e-assist-send e-icons", onClick: _this.sendIconClicked }))));
        };
        _this.onPromptRequest = function () {
            var defaultAiassist = _this.aiAssistViewObj;
            setTimeout(function () {
                defaultAiassist.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service.');
                _this.toggleButtons();
            }, 2000);
        };
        _this.toolbarItemClicked = function (args) {
            if (args.item.iconCss === 'e-icons e-refresh') {
                _this.aiAssistViewObj.prompts = [];
            }
        };
        _this.sendIconClicked = function () {
            var assistviewFooter = document.getElementById('assistview-footer');
            _this.aiAssistViewObj.executePrompt(assistviewFooter.innerText);
            assistviewFooter.innerText = "";
        };
        _this.onTranscriptChange = function (args) {
            var assistviewFooter = document.getElementById('assistview-footer');
            assistviewFooter.innerText = args.transcript;
        };
        _this.onListeningStop = function () {
            _this.toggleButtons();
        };
        _this.onCreated = function () {
            _this.toggleButtons();
        };
        _this.toggleButtons = function () {
            var assistviewFooter = document.querySelector('#assistview-footer');
            var sendButton = document.querySelector('#assistview-sendButton');
            var speechButton = document.querySelector('#speech-to-text');
            var hasText = assistviewFooter.innerText.trim() !== '';
            sendButton.classList.toggle('visible', hasText);
            speechButton.classList.toggle('visible', !hasText);
            if (!hasText) {
                if ((assistviewFooter.innerHTML === '<br>' || assistviewFooter.innerHTML.trim() === '')) {
                    assistviewFooter.innerHTML = '';
                }
            }
        };
        _this.handleKeyDown = function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                _this.sendIconClicked();
                e.preventDefault();
            }
        };
        _this.onErrorHandler = function (args) {
            _this.toastObj.content = args.errorMessage;
            if (args.error === 'unsupported-browser') {
                _this.speechToTextObj.disabled = true;
                _this.toastObj.show({ timeOut: 0 });
            }
            else {
                _this.toastObj.show({ timeOut: 5000 });
            }
        };
        return _this;
    }
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section integration-control-section" },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement("div", { className: "integration-speechToText-section" },
                        React.createElement(ej2_react_notifications_1.ToastComponent, { id: "stt-toast", ref: function (toast) { _this.toastObj = toast; }, cssClass: "e-toast-danger", target: '.integration-control-section', position: { X: 'Right' } }),
                        React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "aiAssistView", ref: function (assistview) { _this.aiAssistViewObj = assistview; }, promptRequest: this.onPromptRequest, bannerTemplate: this.bannerTemplate, footerTemplate: this.footerTemplate, toolbarSettings: this.toolbarSettings })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of SpeechToText with the AI AssistView component. It allows users to convert spoken words into text in real time and use the transcribed content as input for AI-based interactions.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, the SpeechToText component captures and transcribes spoken input into text, which is displayed in an editable area. Users can modify the transcribed text or send it directly to the AI AssistView for processing."),
                React.createElement("p", null, "The AI AssistView responds based on the provided input. A toolbar option is available to clear the conversation history, and a toast notification alerts users to any speech recognition errors."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
