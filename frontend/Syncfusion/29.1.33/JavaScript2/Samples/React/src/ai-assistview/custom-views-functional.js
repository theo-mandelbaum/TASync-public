"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./custom-views.css");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data = require("./promptResponseData.json");
var CustomViews = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var promptsData = [];
    var prompts = data["defaultPromptResponseData"];
    var assistInstance = (0, react_1.useRef)(null);
    var viewTemplate = '<div class="view-container"><h5>Custom view content</h5></div>';
    var suggestions = data["defaultSuggestions"];
    var created = function () {
        var textareaObj = new ej2_react_inputs_1.TextArea({
            placeholder: "Enter your prompt...",
            rows: 5,
            resizeMode: 'None',
            input: function (e) {
                generateBtn.disabled = !e.value;
            }
        });
        textareaObj.appendTo('#promptTextarea');
        var generateBtn = new ej2_react_buttons_1.Button({ cssClass: 'e-primary generate-btn', content: 'Generate Prompt', disabled: true });
        generateBtn.appendTo('#generateBtn');
        generateBtn.element.addEventListener('click', function () {
            var promptValue = textareaObj.value;
            if (promptValue) {
                textareaObj.value = '';
                generateBtn.disabled = true;
                assistInstance.current.activeView = 1;
                assistInstance.current.dataBind();
                updateResponseView(promptValue);
            }
        });
        assistInstance.current.element.querySelector('.view-container .suggestions').addEventListener('click', function (e) {
            if (e.target.classList.contains('suggestion-item')) {
                textareaObj.value = e.target.textContent;
                textareaObj.dataBind();
                generateBtn.disabled = false;
            }
        });
    };
    var updateResponseView = function (prompt) {
        var responseView = assistInstance.current.element.querySelector('.view-container');
        var separatorElem = '<hr style="height: 1px;margin: 0;">';
        var responseItemElem = "<div class=\"responseItemContent e-card\">\n                                    <div class=\"response-header\"><b>Prompt:</b> ".concat(prompt, "</div>").concat(separatorElem, "\n                                    <div class=\"assist-loading-content\">\n                                        <div class=\"e-skeleton e-shimmer-wave\" style=\"width: 100%; height: 20px;\"></div>\n                                        <div class=\"e-skeleton e-shimmer-wave\" style=\"width: 80%; height: 20px;\"></div>\n                                        <div class=\"e-skeleton e-shimmer-wave\" style=\"width: 100%; height: 20px;\"></div>\n                                    </div>\n                                    ").concat(separatorElem, "\n                                    <div class=\"options\">\n                                        <button id=\"copyBtn\" class=\"e-btn e-normal e-skeleton e-shimmer-wave\">Copy</button>\n                                    </div>\n                                </div>");
        var defaultResponse = responseView.querySelector('.default-response');
        if (defaultResponse) {
            defaultResponse.remove();
        }
        responseView.innerHTML = responseItemElem + responseView.innerHTML;
        setTimeout(function () {
            var foundPrompt = prompts.find(function (promptObj) { return promptObj.prompt === prompt; });
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            var response = foundPrompt ? foundPrompt.response : defaultResponse;
            responseView.children[0].querySelector('.assist-loading-content').innerHTML = response;
            var copyBtn = responseView.children[0].querySelector('#copyBtn');
            copyBtn.classList.remove('e-skeleton', 'e-shimmer-wave');
            copyBtn.addEventListener('click', function (e) {
                var textToCopy = e.target.parentElement.parentElement.querySelector('.assist-loading-content').textContent;
                navigator.clipboard.writeText(textToCopy).then(function () {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(function () {
                        copyBtn.textContent = 'Copy';
                    }, 1000);
                });
            });
        }, 2000);
    };
    var promptViewContent = function () {
        var suggestionsElem = '';
        suggestions.forEach(function (suggestion) {
            suggestionsElem += "<li class=\"suggestion-item e-card\">".concat(suggestion, "</li>");
        });
        return "<div class=\"view-container\">\n                   <textarea id=\"promptTextarea\"></textarea>\n                   <button id=\"generateBtn\"></button>\n                   <ul class=\"suggestions\">".concat(suggestionsElem, "</ul>\n                </div>");
    };
    var responseViewContent = function () {
        return "<div class=\"view-container response-view\">\n                    <div class=\"responseItemContent default-response e-card\">\n                    <span class=\"e-icons e-circle-info\"></span>\n                    No prompt provided. Please enter a prompt and click 'Generate Prompt' to see the response.</div>\n                </div>";
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "views-aiassistview" },
                React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "aiAssistView", ref: assistInstance, created: created },
                    React.createElement(ej2_react_interactive_chat_1.ViewsDirective, null,
                        React.createElement(ej2_react_interactive_chat_1.ViewDirective, { type: 'Assist', name: 'Prompt', viewTemplate: promptViewContent() }),
                        React.createElement(ej2_react_interactive_chat_1.ViewDirective, { type: 'Custom', name: 'Response', iconCss: 'e-icons e-comment-show', viewTemplate: responseViewContent() }),
                        React.createElement(ej2_react_interactive_chat_1.ViewDirective, { type: 'Custom', name: 'Custom', viewTemplate: viewTemplate }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the different view available for the AI AssistView component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the AI AssistView component is configured with three distinct views using the ",
                React.createElement("code", null, "views"),
                " property."),
            React.createElement("p", null, "Each view displays its own unique content:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "The ",
                    React.createElement("code", null, "prompt"),
                    " view includes a textarea with a ",
                    React.createElement("code", null, "Generate"),
                    " button and displays a list of suggestions"),
                React.createElement("li", null,
                    "The ",
                    React.createElement("code", null, "response"),
                    " view shows the generated response with a copy option."),
                React.createElement("li", null,
                    "The ",
                    React.createElement("code", null, "custom"),
                    " view allows to display the custom content.")))));
};
exports.default = CustomViews;
