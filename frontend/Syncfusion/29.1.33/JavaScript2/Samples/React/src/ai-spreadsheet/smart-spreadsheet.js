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
exports.SmartSpreadsheet = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartSpreadsheet = /** @class */ (function (_super) {
    __extends(SmartSpreadsheet, _super);
    function SmartSpreadsheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartSpreadsheet.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-spreadsheet/images/spreadsheet.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of AI to automatically analyze content, generate formulas, and validate them in the Spreadsheet."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, a tab labeled ",
                    React.createElement("code", null, "AI Assistant"),
                    " provides access to AI-powered features. Users can utilize the following capabilities:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("strong", null, "Full Sheet Analysis:"),
                        " Analyzes the data in the sheet and provides a summary of the details."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Validate:"),
                        " Validates the formulas in the current selection and updates the details as notes in the corresponding cells."),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Generate Formula:"),
                        " Generates formulas based on user requirements using the AI AssistView.")))));
    };
    return SmartSpreadsheet;
}(sample_base_1.SampleBase));
exports.SmartSpreadsheet = SmartSpreadsheet;
