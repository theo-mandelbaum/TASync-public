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
exports.SmartFill = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var SmartFill = /** @class */ (function (_super) {
    __extends(SmartFill, _super);
    function SmartFill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartFill.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("img", { src: 'src/ai-pdfviewer/images/smart-fill.gif', width: '100%', height: '100%' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates how the Syncfusion React PDF Viewer, with the help of AI, can automatically fill form fields using the data provided by the user. "),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The AI processes the input information to populate the relevant fields in the PDF form, improving efficiency and reducing manual entry errors. However, users may need to review and adjust the filled fields as needed."))));
    };
    return SmartFill;
}(sample_base_1.SampleBase));
exports.SmartFill = SmartFill;
