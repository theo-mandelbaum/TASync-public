"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var data = require("./promptResponseData.json");
var Template = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var promptSuggestionsHeader = 'Hello! Ask Questions, to better understand how your prompt interacts with AI AssistView!';
    var prompts = data["defaultPromptResponseData"];
    var suggestion = data["defaultSuggestions"];
    var templateAiAssistView = (0, react_1.useRef)(null);
    var assistViewCarousel = (0, react_1.useRef)(null);
    var buttonVisible = 'Visible';
    var dataSource = [
        { imagePath: 'src/ai-assistview/images/moscow.jpg', title: 'Moscow', suggestion: 'How do I prioritize tasks effectively?' },
        { imagePath: 'src/ai-assistview/images/bridge.jpg', title: 'Bridge', suggestion: 'How do I set daily goals in my work day?' },
        { imagePath: 'src/ai-assistview/images/london.jpg', title: 'London', suggestion: 'Steps to publish a e-book with marketing strategy' },
        { imagePath: 'src/ai-assistview/images/tokyo.jpg', title: 'Tokyo', suggestion: 'What tools or apps can help me prioritize tasks?' }
    ];
    var productTemplate = function (data) {
        return (React.createElement("div", { className: "carousel-template" },
            React.createElement("img", { src: data.imagePath, alt: data.title }),
            React.createElement("div", { className: "e-card" },
                React.createElement("div", { className: "e-card-header" }, data.suggestion))));
    };
    var bannerViewTemplate = function () {
        return (React.createElement("div", { className: "banner-content" },
            React.createElement("h3", null,
                React.createElement("span", { className: "e-icons e-assistview-icon" }),
                "AI Assistance"),
            React.createElement(ej2_react_navigations_1.CarouselComponent, { id: "bannerCarousel", ref: assistViewCarousel, width: '100%', height: '60%', buttonsVisibility: buttonVisible, showIndicators: false, partialVisible: true, dataSource: dataSource, itemTemplate: productTemplate })));
    };
    var promptTemplate = function (props) {
        var prompt = props.prompt.replace('<span class="e-icons e-circle-info"></span>', '');
        return (React.createElement("div", { className: "promptItemContent" },
            React.createElement("div", { className: "prompt-header" },
                "You",
                React.createElement("span", { className: "e-icons e-user" })),
            React.createElement("div", { className: "assist-prompt-content" }, prompt)));
    };
    var responseTemplate = function (props) {
        return (React.createElement("div", { className: "responseItemContent" },
            React.createElement("div", { className: "response-header" },
                React.createElement("span", { className: "e-icons e-assistview-icon" }),
                "AI Assist"),
            React.createElement("div", { className: "assist-response-content", dangerouslySetInnerHTML: { __html: props.response } })));
    };
    var promptSuggestionItemTemplate = function (props) {
        return (React.createElement("div", { className: 'suggestion-item active' },
            React.createElement("span", { className: "e-icons e-circle-info" }),
            React.createElement("div", { className: "assist-suggestion-content" }, props.promptSuggestion)));
    };
    var toolbarSettings = {
        items: [
            { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
        ]
    };
    var handleAction = function (e) {
        var target = e.target;
        var prompt = '';
        if (target.tagName === 'IMG') {
            prompt = target.nextElementSibling.textContent;
        }
        else if (target.className === 'e-card-header') {
            prompt = target.textContent;
        }
        if (prompt) {
            templateAiAssistView.current.executePrompt(prompt);
        }
    };
    var created = function () {
        setTimeout(function () {
            assistViewCarousel.current.element.addEventListener('click', function (e) {
                handleAction(e);
            });
            assistViewCarousel.current.element.addEventListener('touchstart', function (e) {
                handleAction(e);
            });
        });
        new ej2_react_splitbuttons_1.DropDownButton({
            items: [
                { text: 'Settings', iconCss: 'e-icons e-settings' },
                { separator: true },
                { text: 'Log out' }
            ],
            iconCss: 'e-icons e-user',
            cssClass: 'e-caret-hide',
        }, '#ddMenu');
    };
    var promptRequest = function (args) {
        setTimeout(function () {
            var foundPrompt = prompts.find(function (promptObj) { return promptObj.prompt === args.prompt; });
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            templateAiAssistView.current.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            templateAiAssistView.current.promptSuggestions = (foundPrompt === null || foundPrompt === void 0 ? void 0 : foundPrompt.suggestions) || suggestion;
        }, 2000);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "template-aiassistview" },
                React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "aiAssistView", bannerTemplate: bannerViewTemplate, promptItemTemplate: promptTemplate, responseItemTemplate: responseTemplate, promptSuggestionItemTemplate: promptSuggestionItemTemplate, promptSuggestionsHeader: promptSuggestionsHeader, promptSuggestions: suggestion, promptRequest: promptRequest, ref: templateAiAssistView, toolbarSettings: toolbarSettings, created: created }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the template functionality of the AI AssistView component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the AI AssistView component uses customizable templates for the banner, prompts, responses, and suggestions. We have used the ",
                React.createElement("code", null, "bannerViewTemplate"),
                ", ",
                React.createElement("code", null, "promptItemTemplate"),
                ", ",
                React.createElement("code", null, "responseItemTemplate"),
                " and ",
                React.createElement("code", null, "promptSuggestionItemTemplate"),
                " to define the structure and appearance of these elements."),
            React.createElement("p", null,
                "By using the ",
                React.createElement("code", null, "executePrompt"),
                " method you can trigger the prompt request externally and generate the output based on the ",
                React.createElement("code", null, "promptRequest"),
                " data returned. If found, the response will be displayed and suggestions updated."))));
};
exports.default = Template;
