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
exports.Summarizer = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var Summarizer = /** @class */ (function (_super) {
    __extends(Summarizer, _super);
    function Summarizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Summarizer.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-pdfviewer/images/summarize.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "PDF Summarization provides users with a comprehensive overview of a document's content. The AI generates a detailed summary, highlighting key points. This feature streamlines understanding complex documents in just a few clicks."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("strong", null, "Summarization:"),
                    " PDF Summarization provides users with a comprehensive overview of a document's content. The AI generates a detailed summary, highlighting key points. This feature streamlines understanding complex documents in just a few clicks."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Q&A:"),
                    " Q&A feature allows users to ask questions about the document's content. Users can either input their own queries or choose from AI-generated suggestions. This makes it easier to find specific information within the document."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Reference Page Navigation:"),
                    " This also allows users to navigate directly to relevant pages in the document based on their queries. When a question is asked, the tool identifies the specific content and directs the user to the corresponding page. It streamlines finding specific information within the document."))));
    };
    return Summarizer;
}(sample_base_1.SampleBase));
exports.Summarizer = Summarizer;
