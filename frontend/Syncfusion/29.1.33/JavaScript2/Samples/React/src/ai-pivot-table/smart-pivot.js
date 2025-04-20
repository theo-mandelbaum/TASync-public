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
exports.SmartPivot = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartPivot = /** @class */ (function (_super) {
    __extends(SmartPivot, _super);
    function SmartPivot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartPivot.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-pivot-table/images/smart-pivot.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo showcases the integration of AI with the Syncfusion React Pivot Table, designed to dynamically visualize and analyze data based on user queries. By leveraging advanced AI capabilities, this integration simplifies the process of extracting valuable insights from various data categories, making complex "),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This showcase highlights the advanced capabilities of the Syncfusion React Pivot Table integrated with AI, designed to streamline data exploration and visualization. Leveraging AI-driven features like Smart Data Aggregation, Predictive Modeling, and Adaptive Filtering, this sample demonstrates how the Pivot Table can automatically generate and adjust pivot tables based on user queries."),
                React.createElement("p", null, "Users can interact with the React Pivot Table in real-time to experience the power of AI-assisted data analysis. By selecting and updating queries through the AI Assist dialog UI, the Pivot Table dynamically recalculates and displays relevant insights, offering a more intuitive and responsive way to explore data."))));
    };
    return SmartPivot;
}(sample_base_1.SampleBase));
exports.SmartPivot = SmartPivot;
