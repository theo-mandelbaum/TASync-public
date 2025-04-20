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
exports.WritingAssist = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var WritingAssist = /** @class */ (function (_super) {
    __extends(WritingAssist, _super);
    function WritingAssist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WritingAssist.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-document-editor/images/writing-assist.gif', width: '100%', alt: "Showcase writing assist Gif", height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The Writing Assist feature is designed to generate new content based on user-provided ideas or prompts, seamlessly integrating the content into the document editor. This tool, available in the Syncfusion React Document Editor, assists users in expanding their ideas by generating relevant text, ensuring a smooth writing process. Simply provide an idea or topic, and the Writing Assist will suggest content that can be directly inserted into your document."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    React.createElement("strong", null, "Content Generation:"),
                    " Writing Assist takes user input, such as a brief idea or keyword, and generates new content that aligns with the theme. This feature aids in content creation, helping users develop their thoughts into fully-formed paragraphs or sections within the document."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Idea Expansion:"),
                    " Users can rely on Writing Assist to expand on initial concepts, offering detailed elaborations or additional perspectives that can enhance the quality of the writing. It is ideal for overcoming writer\u2019s block and ensuring comprehensive coverage of a topic."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Seamless Insertion:"),
                    " Once the content is generated, it can be effortlessly inserted into the document at the cursor's position, allowing users to maintain the flow of their writing without disruption."))));
    };
    return WritingAssist;
}(sample_base_1.SampleBase));
exports.WritingAssist = WritingAssist;
