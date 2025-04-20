"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var React = require("react");
require("./integration.css");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var sample_base_1 = require("../common/sample-base");
var react_1 = require("react");
var Integration = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var aiAssistViewObj = React.useRef(null);
    var speechToTextObj = React.useRef(null);
    var toastObj = React.useRef(null);
    var toolbarSettings = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: function (args) { return toolbarItemClicked(args); }
    };
    var bannerTemplate = function () {
        return (React.createElement("div", { className: "banner-info" },
            React.createElement("div", { className: "e-icons e-listen-icon" }),
            React.createElement("h3", null, "Speech To Text"),
            React.createElement("i", null, "Click the below mic-button to convert your voice to text.")));
    };
    var footerTemplate = function () {
        return (React.createElement("div", { className: "e-footer-wrapper" },
            React.createElement("div", { id: "assistview-footer", className: "content-editor", contentEditable: "true", placeholder: "Click to speak or start typing...", onInput: toggleButtons, onKeyDown: handleKeyDown }),
            React.createElement("div", { className: "option-container" },
                React.createElement(ej2_react_inputs_1.SpeechToTextComponent, { id: "speechToText", ref: speechToTextObj, cssClass: 'e-flat', transcriptChanged: onTranscriptChange, onStop: onListeningStop, created: onCreated, onError: onErrorHandler }),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "assistview-sendButton", className: "e-assist-send e-icons", onClick: sendIconClicked }))));
    };
    var onPromptRequest = function () {
        var defaultAiassist = aiAssistViewObj.current;
        setTimeout(function () {
            defaultAiassist.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service.');
            toggleButtons();
        }, 2000);
    };
    var toolbarItemClicked = function (args) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewObj.current.prompts = [];
        }
    };
    var sendIconClicked = function () {
        var assistviewFooter = document.getElementById('assistview-footer');
        aiAssistViewObj.current.executePrompt(assistviewFooter.innerText);
        assistviewFooter.innerText = "";
    };
    var onTranscriptChange = function (args) {
        var assistviewFooter = document.getElementById('assistview-footer');
        assistviewFooter.innerText = args.transcript;
    };
    var onListeningStop = function () {
        toggleButtons();
    };
    var onCreated = function () {
        toggleButtons();
    };
    var toggleButtons = function () {
        var assistviewFooter = document.querySelector('#assistview-footer');
        var sendButton = document.querySelector('#assistview-sendButton');
        var speechButton = document.querySelector('#speechToText');
        var hasText = assistviewFooter.innerText.trim() !== '';
        sendButton.classList.toggle('visible', hasText);
        speechButton.classList.toggle('visible', !hasText);
        if (!hasText) {
            if ((assistviewFooter.innerHTML === '<br>' || assistviewFooter.innerHTML.trim() === '')) {
                assistviewFooter.innerHTML = '';
            }
        }
    };
    var handleKeyDown = function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendIconClicked();
            event.preventDefault(); // Prevent the default behavior of the Enter key
        }
    };
    var onErrorHandler = function (args) {
        toastObj.current.content = args.errorMessage;
        if (args.error === 'unsupported-browser') {
            speechToTextObj.current.disabled = true;
            toastObj.current.show({ timeOut: 0 });
        }
        else {
            toastObj.current.show({ timeOut: 5000 });
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section integration-control-section" },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement("div", { className: "integration-speechToText-section" },
                    React.createElement(ej2_react_notifications_1.ToastComponent, { id: "stt-toast", ref: toastObj, cssClass: "e-toast-danger", target: '.integration-control-section', position: { X: 'Right' } }),
                    React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "aiAssistView", ref: aiAssistViewObj, promptRequest: onPromptRequest, bannerTemplate: bannerTemplate, footerTemplate: footerTemplate, toolbarSettings: toolbarSettings })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the integration of SpeechToText with the AI AssistView component. It allows users to convert spoken words into text in real time and use the transcribed content as input for AI-based interactions.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, the SpeechToText component captures and transcribes spoken input into text, which is displayed in an editable area. Users can modify the transcribed text or send it directly to the AI AssistView for processing."),
            React.createElement("p", null, "The AI AssistView responds based on the provided input. A toolbar option is available to clear the conversation history, and a toast notification alerts users to any speech recognition errors."))));
};
exports.default = Integration;
