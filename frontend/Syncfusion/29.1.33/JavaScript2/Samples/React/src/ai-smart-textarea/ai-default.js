"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./default.css");
function Default() {
    var _this = this;
    var textareaObj;
    var phrasesData = [
        "Please find the attached report.",
        "Let's schedule a meeting to discuss this further.",
        "Can you provide an update on this task?",
        "I appreciate your prompt response.",
        "Let's collaborate on this project to ensure timely delivery."
    ];
    var rolesData = [
        "Maintainer of an open-source project replying to GitHub issues",
        "Employee communicating with internal team",
        "Customer support representative responding to customer queries",
        "Sales representative responding to client inquiries"
    ];
    var presets = [
        {
            userRole: "Maintainer of an open-source project replying to GitHub issues",
            userPhrases: [
                "Thank you for contacting us.",
                "To investigate, we'll need a repro as a public Git repo.",
                "Could you please post a screenshot of NEED_INFO?",
                "This sounds like a usage question. This issue tracker is intended for bugs and feature proposals. Unfortunately, we don't have the capacity to answer general usage questions and would recommend StackOverflow for a faster response.",
                "We don't accept ZIP files as repros."
            ]
        },
        {
            userRole: "Customer support representative responding to customer queries",
            userPhrases: [
                "Thank you for reaching out to us.",
                "Can you please provide your order number?",
                "We apologize for the inconvenience.",
                "Our team is looking into this issue and will get back to you shortly.",
                "For urgent matters, please call our support line."
            ]
        },
        {
            userRole: "Employee communicating with internal team",
            userPhrases: [
                "Please find the attached report.",
                "Let's schedule a meeting to discuss this further.",
                "Can you provide an update on this task?",
                "I appreciate your prompt response.",
                "Let's collaborate on this project to ensure timely delivery."
            ]
        },
        {
            userRole: "Sales representative responding to client inquiries",
            userPhrases: [
                "Thank you for your interest in our product.",
                "Can I schedule a demo for you?",
                "Please find the pricing details attached.",
                "Our team is excited to work with you.",
                "Let me know if you have any further questions."
            ]
        }
    ];
    var serverAIRequest = function (settings) { return __awaiter(_this, void 0, void 0, function () {
        var output, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    output = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, window.getAzureChatAIRequest(settings)];
                case 2:
                    response = _a.sent();
                    output = response;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, output];
            }
        });
    }); };
    function onChange(args) {
        var selectedRole = args.value;
        var selectedPreset = presets.find(function (preset) { return preset.userRole === selectedRole; });
        textareaObj.userRole = selectedRole;
        textareaObj.UserPhrases = selectedPreset.userPhrases;
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement("div", { className: "example-label" }, "Select a role"),
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { type: "text", id: 'user-role', dataSource: rolesData, width: '75%', placeholder: "Select a role", value: "Maintainer of an open-source project replying to GitHub issues", popupHeight: "200px", change: onChange }),
                React.createElement("br", null),
                React.createElement(ej2_react_inputs_1.SmartTextAreaComponent, { id: 'smart-textarea', ref: function (textarea) { textareaObj = textarea; }, placeholder: 'Enter your queries here', floatLabelType: 'Auto', rows: 5, userRole: 'Employee communicating with internal team', UserPhrases: phrasesData, aiSuggestionHandler: serverAIRequest })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how the Smart TextArea provides sentence-level autocompletion suggestions based on its configuration and the user's current input."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/ej2-react-ai-samples', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Smart TextArea uses AI to offer real-time sentence suggestions based on the user's input and role, helping users complete sentences more quickly and accurately.")))));
}
exports.default = Default;
