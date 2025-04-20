"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var data = require("./promptResponseData.json");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var promptsData = [
        {
            response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
        }
    ];
    var prompts = data["defaultPromptResponseData"];
    var suggestion = data["defaultSuggestions"];
    var toolbarItemClicked = function (args) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            assistInstance.current.prompts = [];
            assistInstance.current.promptSuggestions = suggestion;
        }
    };
    var assistViewToolbarSettings = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: toolbarItemClicked
    };
    var bannerTemplate = "<div class=\"banner-content\">\n        <div class=\"e-icons e-assistview-icon\"></div>\n        <h3>AI Assistance</h3>\n        <i>To get started, provide input or choose a suggestion.</i>\n    </div>";
    var assistInstance = (0, react_1.useRef)(null);
    var promptRequest = function (args) {
        setTimeout(function () {
            var foundPrompt = prompts.find(function (promptObj) { return promptObj.prompt === args.prompt; });
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistInstance.current.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            assistInstance.current.promptSuggestions = (foundPrompt === null || foundPrompt === void 0 ? void 0 : foundPrompt.suggestions) || suggestion;
        }, 2000);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "default-aiassistview" },
                React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "aiAssistView", promptSuggestions: suggestion, toolbarSettings: assistViewToolbarSettings, promptRequest: promptRequest, ref: assistInstance, bannerTemplate: bannerTemplate }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the AI AssistView component. The AI AssistView creates an interface through which users can interact with AI-driven suggestions and prompts.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the ",
                React.createElement("code", null, "bannerTemplate"),
                " customizes the banner content, and ",
                React.createElement("code", null, "toolbarSettings"),
                " adds custom toolbar items like a right-aligned ",
                React.createElement("code", null, "Refresh"),
                " button. The ",
                React.createElement("code", null, "promptSuggestions"),
                " provides AI prompt suggestions, and ",
                React.createElement("code", null, "promptRequest"),
                " handles prompt requests when triggered."))));
};
exports.default = Default;
