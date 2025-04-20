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
exports.TaskRecommendation = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var TaskRecommendation = /** @class */ (function (_super) {
    __extends(TaskRecommendation, _super);
    function TaskRecommendation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskRecommendation.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-kanban/images/task-recommendation.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample showcases the integration of AI to automatically generate task segments based on the provided project details and includes them within the Syncfusion React Kanban component."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this sample, the following AI-powered features are accessible:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Provide the project title and task count, and based on this input, AI will suggest tasks and generate them within the Kanban board."),
                    React.createElement("li", null, "Additionally, an option is available to view the backlog items in a Grid.")))));
    };
    return TaskRecommendation;
}(sample_base_1.SampleBase));
exports.TaskRecommendation = TaskRecommendation;
