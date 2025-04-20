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
exports.SmartResourceAllocation = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartResourceAllocation = /** @class */ (function (_super) {
    __extends(SmartResourceAllocation, _super);
    function SmartResourceAllocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartResourceAllocation.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-gantt/images/resource-manager.gif', width: '100%', alt: "Showcase Text to MindMap Gif", height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to efficiently manage resource overallocation by reallocating available resources to tasks. It visually updates the Gantt Chart by changing the color of the taskbars to reflect the reallocated tasks, allowing for better tracking and management of resource usage. The process helps ensure that no single resource is overburdened, maintaining an optimized workflow."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The sample reallocates tasks to prevent resource overallocation. The reallocation process involves interacting with the ",
                    React.createElement("strong", null, "TaskCollection"),
                    ", ",
                    React.createElement("strong", null, "ResourceCollection"),
                    ", and ",
                    React.createElement("strong", null, "AssignmentCollection"),
                    " to generate a new assignment collection. This new collection resolves any overallocated tasks by redistributing them within the same resource, ensuring balanced resource utilization. Taskbar colors are updated accordingly to indicate the changes in allocation, providing clear visual feedback on the resource adjustments."))));
    };
    return SmartResourceAllocation;
}(sample_base_1.SampleBase));
exports.SmartResourceAllocation = SmartResourceAllocation;
