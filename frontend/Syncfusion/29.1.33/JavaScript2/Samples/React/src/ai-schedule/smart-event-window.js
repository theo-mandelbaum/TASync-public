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
exports.SmartEventWindow = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartEventWindow = /** @class */ (function (_super) {
    __extends(SmartEventWindow, _super);
    function SmartEventWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartEventWindow.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-schedule/images/schedule.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo demonstrates how AI can be utilized to convert natural language context into scheduler events. It allows for seamless conversion of casual text into structured meeting appointments, enhancing user experience and efficiency."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "In this sample, we have integrated Smart Paste component with the Scheduler component to convert natural language content into scheduler events. By using the smart paste feature, users can populate the converted content into a custom dialog, which is then added to the Scheduler component."))));
    };
    return SmartEventWindow;
}(sample_base_1.SampleBase));
exports.SmartEventWindow = SmartEventWindow;
