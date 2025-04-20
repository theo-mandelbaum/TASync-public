"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var React = require("react");
require("./use-case.css");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var sample_base_1 = require("../common/sample-base");
var react_1 = require("react");
var UseCase = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var speechToTextObj = (0, react_1.useRef)(null);
    var chatUIObj = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(-1), msgIdx = _a[0], setmsgIdx = _a[1];
    var _b = (0, react_1.useState)(false), isIndicatorVisible = _b[0], setisIndicatorVisible = _b[1];
    var emptyChatTemplate = function () {
        return (React.createElement("div", { className: "empty-chat" },
            React.createElement("span", { className: "e-icons e-multiple-comment" }),
            "No transcript available. Start speaking to generate a transcript."));
    };
    var typingIndicatorTemplate = function () {
        return (React.createElement("div", { className: "e-typing-indicator " },
            React.createElement("span", { className: "e-user-text" }, "Transcripting"),
            React.createElement("div", { className: "e-indicator-wrapper" },
                React.createElement("span", { className: "e-indicator" }),
                React.createElement("span", { className: "e-indicator" }),
                React.createElement("span", { className: "e-indicator" }))));
    };
    var buttonSettings = {
        stopIconCss: 'e-icons e-listen-icon'
    };
    var onTranscriptChange = function (args) {
        var existingMsg = chatUIObj.current.messages[msgIdx];
        if (existingMsg) {
            chatUIObj.current.updateMessage({ text: args.transcript }, existingMsg.id);
            chatUIObj.current.scrollToBottom();
        }
        else {
            var newMsg = { id: 'msg-' + (msgIdx + 1), text: args.transcript, author: { id: 'testing-user', user: 'Testing User' } };
            chatUIObj.current.addMessage(newMsg);
        }
        // Show typing indicator only if it’s not visible
        if (!isIndicatorVisible) {
            chatUIObj.current.typingUsers = [{ id: 'testing-user', user: 'Testing User' }];
            setisIndicatorVisible(true);
        }
        // Final transcript
        if (!args.isInterimResult) {
            msgIdx + 1;
            speechToTextObj.current.transcript = '';
            chatUIObj.current.typingUsers = [];
            setisIndicatorVisible(false);
        }
    };
    // Event handler for listening start
    var onListeningStart = function () {
        var sttElement = document.querySelector('#speechToText');
        setmsgIdx(chatUIObj.current.messages.length);
        sttElement.classList.add('stt-listening-state');
        updateStatus('Listening... Speak now...');
    };
    // Event handler for listening stop
    var onListeningStop = function (args) {
        var sttElement = document.querySelector('#speechToText');
        sttElement.classList.remove('stt-listening-state');
        chatUIObj.current.typingUsers = [];
        if (args.isInteracted)
            updateStatus('Click the mic button to start speaking...');
    };
    // Event handler for errors
    var onErrorHandler = function (args) {
        updateStatus(args.errorMessage);
        if (args.error === 'unsupported-browser') {
            speechToTextObj.current.disabled = true;
        }
    };
    // Function to updates the speech recognition status message
    var updateStatus = function (status) {
        document.querySelector('.speech-recognition-status').innerText = status;
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "usecase-speechToText-section e-message" },
                React.createElement("div", { className: "stt-container" },
                    React.createElement(ej2_react_inputs_1.SpeechToTextComponent, { id: "speechToText", ref: speechToTextObj, buttonSettings: buttonSettings, transcriptChanged: onTranscriptChange, onStart: onListeningStart, onStop: onListeningStop, onError: onErrorHandler, cssClass: "usecase-stt-btn" }),
                    React.createElement("span", { className: "speech-recognition-status" }, "Click the mic button to start speaking...")),
                React.createElement("div", { className: "transcript-container" },
                    React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { id: "transcript-content", ref: chatUIObj, showHeader: false, showFooter: false, timeStampFormat: "MMM d, h:mm a", autoScrollToBottom: true, emptyChatTemplate: emptyChatTemplate, typingUsersTemplate: typingIndicatorTemplate })))),
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
exports.default = UseCase;
