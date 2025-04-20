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
exports.SentimentAnalysis = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SentimentAnalysis = /** @class */ (function (_super) {
    __extends(SentimentAnalysis, _super);
    function SentimentAnalysis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SentimentAnalysis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-kanban/images/sentiment-analysis.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of AI to automatically generate emoticon expressions based on customer feedback, which are then updated in the Syncfusion React Kanban Board."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this sample, users can utilize the following AI-powered feature:"),
                React.createElement("p", null,
                    React.createElement("strong", null, "Analyze Customer Sentiments:"),
                    " By clicking the \"Analyze Customer Sentiments\" button, AI will automatically generate emoticon expressions based on the customer feedback for delivered items and update them in the Syncfusion React Kanban Board."))));
    };
    return SentimentAnalysis;
}(sample_base_1.SampleBase));
exports.SentimentAnalysis = SentimentAnalysis;
