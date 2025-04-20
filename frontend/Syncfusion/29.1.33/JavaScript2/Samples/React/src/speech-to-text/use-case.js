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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var React = require("react");
require("./use-case.css");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var sample_base_1 = require("../common/sample-base");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msgIdx = -1;
        _this.isIndicatorVisible = false;
        _this.emptyChatTemplate = function () {
            React.createElement("div", { className: "empty-chat" },
                React.createElement("span", { className: "e-icons e-multiple-comment" }),
                "No transcript available. Start speaking to generate a transcript.");
        };
        _this.typingIndicatorTemplate = function () {
            React.createElement("div", { className: "e-typing-indicator " },
                React.createElement("span", { className: "e-user-text" }, "Transcripting"),
                React.createElement("div", { className: "e-indicator-wrapper" },
                    React.createElement("span", { className: "e-indicator" }),
                    React.createElement("span", { className: "e-indicator" }),
                    React.createElement("span", { className: "e-indicator" })));
        };
        _this.buttonSettings = {
            stopIconCss: 'e-icons e-listen-icon'
        };
        _this.onTranscriptChange = function (args) {
            var existingMsg = _this.chatUIObj.messages[_this.msgIdx];
            if (existingMsg) {
                _this.chatUIObj.updateMessage({ text: args.transcript }, existingMsg.id);
                _this.chatUIObj.scrollToBottom();
            }
            else {
                var newMsg = { id: 'msg-' + (_this.msgIdx + 1), text: args.transcript, author: { id: 'testing-user', user: 'Testing User' } };
                _this.chatUIObj.addMessage(newMsg);
            }
            // Show typing indicator only if it’s not visible
            if (!_this.isIndicatorVisible) {
                _this.chatUIObj.typingUsers = [{ id: 'testing-user', user: 'Testing User' }];
                _this.isIndicatorVisible = true;
            }
            // Final transcript
            if (!args.isInterimResult) {
                _this.msgIdx + 1;
                _this.speechToTextObj.transcript = '';
                _this.chatUIObj.typingUsers = [];
                _this.isIndicatorVisible = false;
            }
        };
        // Event handler for listening start
        _this.onListeningStart = function () {
            var sttElement = document.querySelector('#speechToText');
            _this.msgIdx = _this.chatUIObj.messages.length;
            sttElement.classList.add('stt-listening-state');
            _this.updateStatus('Listening... Speak now...');
        };
        // Event handler for listening stop
        _this.onListeningStop = function (args) {
            var sttElement = document.querySelector('#speechToText');
            sttElement.classList.remove('stt-listening-state');
            _this.chatUIObj.typingUsers = [];
            if (args.isInteracted)
                _this.updateStatus('Click the mic button to start speaking...');
        };
        // Event handler for errors
        _this.onErrorHandler = function (args) {
            _this.updateStatus(args.errorMessage);
            if (args.error === 'unsupported-browser') {
                _this.speechToTextObj.disabled = true;
            }
        };
        // Function to updates the speech recognition status message
        _this.updateStatus = function (status) {
            document.querySelector('.speech-recognition-status').innerText = status;
        };
        return _this;
    }
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "usecase-speechToText-section e-message" },
                    React.createElement("div", { className: "stt-container" },
                        React.createElement(ej2_react_inputs_1.SpeechToTextComponent, { id: "speechToText", ref: function (speechtotext) { _this.speechToTextObj = speechtotext; }, buttonSettings: this.buttonSettings, transcriptChanged: this.onTranscriptChange, onStart: this.onListeningStart, onStop: this.onListeningStop, onError: this.onErrorHandler, cssClass: "usecase-stt-btn" }),
                        React.createElement("span", { className: "speech-recognition-status" }, "Click the mic button to start speaking...")),
                    React.createElement("div", { className: "transcript-container" },
                        React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { id: "transcript-content", ref: function (chatui) { _this.chatUIObj = chatui; }, showHeader: false, showFooter: false, timeStampFormat: "MMM d, h:mm a", autoScrollToBottom: true, emptyChatTemplate: this.emptyChatTemplate, typingUsersTemplate: this.typingIndicatorTemplate })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates a live transcription feature that converts spoken words into text in real-time. Click the microphone button to start speaking, and the transcribed text will appear in the ChatUI component as a conversation with timestamps.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Speech-to-Text component captures audio input and transcribes it dynamically, updating the transcript in the ",
                    React.createElement("code", null, "ChatUI"),
                    " component. Each spoken segment is displayed as an individual message with a timestamp, ensuring a structured conversation format."),
                React.createElement("p", null,
                    "The integration with ",
                    React.createElement("code", null, "ChatUI"),
                    " allows real-time updates, maintaining the natural flow of conversation. This setup enhances readability and interaction, making it easier to follow and review the transcription."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
