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
exports.SmartTaskPrioritizer = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartTaskPrioritizer = /** @class */ (function (_super) {
    __extends(SmartTaskPrioritizer, _super);
    function SmartTaskPrioritizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartTaskPrioritizer.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-gantt/images/task-prioritizer.gif', width: '100%', alt: "Showcase Text to MindMap Gif", height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how AI can prioritize tasks within a task collection. The AI evaluates baseline dates and scheduled taskbar dates to identify critical tasks, which are crucial for meeting project deadlines. It then reallocates resources to these critical tasks, ensuring efficient resource management and timely project completion."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The process begins with the AI identifying the critical tasks based on the project schedule. Following this, the AI generates another prompt to reassign resources and provides a summary of the reallocation and critical task details."))));
    };
    return SmartTaskPrioritizer;
}(sample_base_1.SampleBase));
exports.SmartTaskPrioritizer = SmartTaskPrioritizer;
