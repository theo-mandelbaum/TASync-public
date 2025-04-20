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
exports.SmartEditor = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartEditor = /** @class */ (function (_super) {
    __extends(SmartEditor, _super);
    function SmartEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartEditor.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-document-editor/images/smart-editor.gif', width: '100%', alt: "Showcase smart editor Gif", height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the capabilities of the Smart Editor in enhancing document editing within the Syncfusion React Document Editor. Users can refine their content by:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Rewriting text for improved clarity and style."),
                    React.createElement("li", null, "Checking grammar to ensure correct language use."),
                    React.createElement("li", null, "Translating content into different languages seamlessly.")),
                React.createElement("p", null, "With the selection context feature, users can enhance their writing quality directly within the editor, making it easier to achieve polished and accurate documents."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    React.createElement("strong", null, "Rewriting:"),
                    " The rewriting feature enables users to rephrase sentences or paragraphs, enhancing content clarity and adapting the tone to fit different contexts. This tool is designed to improve the overall readability and effectiveness of the document."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Grammar Check:"),
                    " The grammar check function scans the document for grammatical errors, providing suggestions for corrections related to subject-verb agreement, punctuation, and sentence structure. This ensures the document maintains high grammatical accuracy."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Translation:"),
                    " The translation feature allows users to convert the document content into multiple languages. This is particularly useful for creating multilingual documents or understanding content written in foreign languages."))));
    };
    return SmartEditor;
}(sample_base_1.SampleBase));
exports.SmartEditor = SmartEditor;
