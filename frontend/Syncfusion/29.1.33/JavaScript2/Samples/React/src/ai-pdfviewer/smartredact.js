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
exports.SmartRedact = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartRedact = /** @class */ (function (_super) {
    __extends(SmartRedact, _super);
    function SmartRedact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartRedact.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-pdfviewer/images/smart-redact.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how the Syncfusion React PDF Viewer can intelligently redact sensitive information with the help of AI assistance. Users can select specific patterns, such as emails or names, and the AI will identify and redact sensitive information based on these patterns"),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("strong", null, "Smart Redaction:"),
                        " Users can select patterns such as emails or names to identify sensitive information in the document. The AI detects this content, and if some identified information isn't actually sensitive, users can review and deselect it before proceeding with redaction. This process ensures efficient protection of private data."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Manual Redaction:"),
                        " Users can manually select specific content for redaction to handle sensitive information directly. This feature provides precise control over which parts of the document are redacted. It complements the AI's automated detection by allowing for additional customization. This ensures that only the intended sensitive information is protected.")))));
    };
    return SmartRedact;
}(sample_base_1.SampleBase));
exports.SmartRedact = SmartRedact;
