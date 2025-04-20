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
exports.AIAssistant = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var AIAssistant = /** @class */ (function (_super) {
    __extends(AIAssistant, _super);
    function AIAssistant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AIAssistant.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-rich-text-editor/images/ai-assistant.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the AI Integration with Rich Text Editor and has enabled the AI features like content generation, summarization, rephrasing, translate and grammar correction."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this sample, the Rich Text Editor content can be selected, and AI Assistant dropdown menu can be opened to use the following AI features,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("strong", null, "Rephrase:"),
                        " Selecting this option will offer alternative phrasings for sentences to improve clarity."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Correct Grammar:"),
                        " Selecting this option will correct the grammar for the selected content."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Summarize:"),
                        " Selecting this option will summarize long documents or sections into concise versions."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Content Generation:"),
                        " Selecting this option will generate content based on selected content."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Translate:"),
                        " Selecting this will translate the selected content into the desired language based on the language selection.")))));
    };
    return AIAssistant;
}(sample_base_1.SampleBase));
exports.AIAssistant = AIAssistant;
