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
exports.SmartFlowchart = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartFlowchart = /** @class */ (function (_super) {
    __extends(SmartFlowchart, _super);
    function SmartFlowchart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartFlowchart.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-diagram/images/text-to-flowchart.gif', width: '100%', alt: "Showcase Text to Flowchart Gif", height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo illustrates the creation of a flowchart diagram using the React Diagram component with the assistance of AI. The AI-powered flowchart is structured with nodes and connectors arranged in a flowchart layout, designed to visually represent processes and workflows. This sample is particularly effective for visualizing step-by-step procedures, workflows, and decision-making paths in a clear and interactive manner."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample leverages a specialized AI prompt to create a dynamic flowchart diagram by submitting a request to OpenAI. The AI-generated response is parsed to produce nodes and connectors arranged in a flowchart layout, visually representing the defined processes or workflows. Users can generate and visualize the flowchart content based on their input prompt, creating an interactive and organized depiction of processes and decision-making paths."))));
    };
    return SmartFlowchart;
}(sample_base_1.SampleBase));
exports.SmartFlowchart = SmartFlowchart;
