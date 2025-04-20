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
exports.Template = void 0;
var React = require("react");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var data = require("./promptResponseData.json");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prompts = data["defaultPromptResponseData"];
        _this.suggestion = data["defaultSuggestions"];
        _this.productTemplate = function (data) {
            return (React.createElement("div", { className: "carousel-template" },
                React.createElement("img", { src: data.imagePath, alt: data.title }),
                React.createElement("div", { className: "e-card" },
                    React.createElement("div", { className: "e-card-header" }, data.suggestion))));
        };
        _this.bannerViewTemplate = function () {
            return (React.createElement("div", { className: "banner-content" },
                React.createElement("h3", null,
                    React.createElement("span", { className: "e-icons e-assistview-icon" }),
                    "AI Assistance"),
                React.createElement(ej2_react_navigations_1.CarouselComponent, { id: "bannerCarousel", ref: function (carousel) { return (_this.assistViewCarousel = carousel); }, width: '100%', height: '60%', showIndicators: false, partialVisible: false, dataSource: _this.dataSource, itemTemplate: _this.productTemplate, buttonsVisibility: _this.buttonVisible })));
        };
        _this.promptItemTemplate = function (props) {
            var prompt = props.prompt.replace('<span class="e-icons e-circle-info"></span>', '');
            return (React.createElement("div", { className: "promptItemContent" },
                React.createElement("div", { className: "prompt-header" },
                    "You",
                    React.createElement("span", { className: "e-icons e-user" })),
                React.createElement("div", { className: "assist-prompt-content" }, prompt)));
        };
        _this.responseItemTemplate = function (props) {
            return (React.createElement("div", { className: "responseItemContent" },
                React.createElement("div", { className: "response-header" },
                    React.createElement("span", { className: "e-icons e-assistview-icon" }),
                    "AI Assist"),
                React.createElement("div", { className: "assist-response-content", dangerouslySetInnerHTML: { __html: props.response } })));
        };
        _this.promptSuggestionItemTemplate = function (props) {
            return (React.createElement("div", { className: 'suggestion-item active' },
                React.createElement("span", { className: "e-icons e-circle-info" }),
                React.createElement("div", { className: "assist-suggestion-content" }, props.promptSuggestion)));
        };
        _this.toolbarSettings = {
            items: [
                { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
            ]
        };
        _this.handleAction = function (e) {
            var target = e.target;
            var prompt = '';
            if (target.tagName === 'IMG') {
                prompt = target.nextElementSibling.textContent;
            }
            else if (target.className === 'e-card-header') {
                prompt = target.textContent;
            }
            if (prompt) {
                _this.templateAiAssistView.executePrompt(prompt);
            }
        };
        _this.created = function () {
            setTimeout(function () {
                _this.assistViewCarousel.element.addEventListener('click', function (e) {
                    _this.handleAction(e);
                });
                _this.assistViewCarousel.element.addEventListener('touchstart', function (e) {
                    _this.handleAction(e);
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
        _this.promptRequest = function (args) {
            setTimeout(function () {
                var foundPrompt = _this.prompts.find(function (promptObj) { return promptObj.prompt === args.prompt; });
                var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                _this.templateAiAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
                _this.templateAiAssistView.promptSuggestions = (foundPrompt === null || foundPrompt === void 0 ? void 0 : foundPrompt.suggestions) || _this.suggestion;
            }, 2000);
        };
        return _this;
    }
    Template.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "template-aiassistview" },
                    React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "aiAssistView", bannerTemplate: this.bannerViewTemplate, promptItemTemplate: this.promptItemTemplate, responseItemTemplate: this.responseItemTemplate, promptSuggestionItemTemplate: this.promptSuggestionItemTemplate, promptSuggestions: this.suggestion, promptRequest: this.promptRequest, ref: function (aiassistView) { return (_this.templateAiAssistView = aiassistView); }, created: this.created, promptSuggestionsHeader: this.promptSuggestionsHeader, toolbarSettings: this.toolbarSettings }))),
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
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
