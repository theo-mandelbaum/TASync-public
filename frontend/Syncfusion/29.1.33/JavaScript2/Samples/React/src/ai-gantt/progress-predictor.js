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
exports.SmartProgressPredictor = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartProgressPredictor = /** @class */ (function (_super) {
    __extends(SmartProgressPredictor, _super);
    function SmartProgressPredictor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartProgressPredictor.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-gantt/images/progress-predictor.gif', width: '100%', alt: "Showcase Text to MindMap Gif", height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample showcases how to predict milestone task completion and project end dates using AI-driven analysis within a Gantt Chart. The predictions are displayed as event markers, providing visual cues for upcoming milestones and the overall project timeline."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This functionality retrieves predicted milestone dates and the overall project completion date. The predictions are based on the current year's ",
                    React.createElement("strong", null, "TaskCollection"),
                    " data, enhanced by analyzing historical ",
                    React.createElement("strong", null, "TaskCollection"),
                    " data from the past five years."))));
    };
    return SmartProgressPredictor;
}(sample_base_1.SampleBase));
exports.SmartProgressPredictor = SmartProgressPredictor;
