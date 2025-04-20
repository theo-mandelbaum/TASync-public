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
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./streaming.css");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var data = require("./promptResponseData.json");
var Marked = require("marked");
var Streaming = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var streamingAIAssistView = (0, react_1.useRef)(null);
    var stopStreaming = false;
    var bannerTemplate = "<div class=\"banner-content\">\n        <div class=\"e-icons e-assistview-icon\"></div>\n        <h3>AI Assistance</h3>\n        <i>To get started, provide input or choose a suggestion.</i>\n    </div>";
    var prompts = data["streamingPromptResponseData"];
    var suggestion = data["streamingSuggestions"];
    var toolbarItemClicked = function (args) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            streamingAIAssistView.current.prompts = [];
            streamingAIAssistView.current.promptSuggestions = suggestion;
        }
    };
    var assistViewToolbarSettings = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: toolbarItemClicked
    };
    var handleStopResponse = function () {
        stopStreaming = true;
    };
    var onPromptRequest = function (args) {
        var lastResponse = "";
        var streamingResponse = prompts.find(function (data) { return data.prompt === args.prompt; });
        var defaultResponse = "For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
        var responseUpdateRate = 10;
        function streamResponse(response) {
            return __awaiter(this, void 0, void 0, function () {
                var i, responseLength, htmlResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            responseLength = response.length;
                            _a.label = 1;
                        case 1:
                            if (!(i < responseLength && !stopStreaming)) return [3 /*break*/, 3];
                            lastResponse += response[i];
                            i++;
                            if (i % responseUpdateRate === 0 || i === responseLength) {
                                htmlResponse = Marked.marked(lastResponse);
                                streamingAIAssistView.current.addPromptResponse(htmlResponse, i === responseLength);
                                streamingAIAssistView.current.scrollToBottom();
                            }
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 15); })];
                        case 2:
                            _a.sent(); // Delay before the next chunk
                            return [3 /*break*/, 1];
                        case 3:
                            streamingAIAssistView.current.promptSuggestions = (streamingResponse === null || streamingResponse === void 0 ? void 0 : streamingResponse.suggestions) || suggestion;
                            return [2 /*return*/];
                    }
                });
            });
        }
        if (streamingResponse) {
            stopStreaming = false;
            streamResponse(streamingResponse.response);
        }
        else {
            streamingAIAssistView.current.addPromptResponse(defaultResponse, true);
            streamingAIAssistView.current.promptSuggestions = suggestion;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "stream-aiassistview" },
                React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "streamAssistView", ref: streamingAIAssistView, promptSuggestions: suggestion, toolbarSettings: assistViewToolbarSettings, promptRequest: onPromptRequest, stopRespondingClick: handleStopResponse, bannerTemplate: bannerTemplate }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the streaming response update in the ",
                React.createElement("code", null, "AI AssistView"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the ",
                React.createElement("code", null, "AI AssistView"),
                " component dynamically updates responses in a streaming manner using the ",
                React.createElement("code", null, "addPromptResponse"),
                " method, while the ",
                React.createElement("code", null, "scrollToBottom"),
                " method ensures automatic scrolling. The ",
                React.createElement("code", null, "bannerTemplate"),
                " allows customization of the banner content, and ",
                React.createElement("code", null, "toolbarSettings"),
                " enables custom toolbar items, including a right-aligned Refresh button. Additionally, ",
                React.createElement("code", null, "promptSuggestions"),
                " offers AI-generated prompt suggestions, while ",
                React.createElement("code", null, "promptRequest"),
                " processes prompt requests when triggered."),
            React.createElement("p", null,
                "This implementation provides an interactive AI chat experience with real-time streaming updates, enhanced by Markdown-to-HTML conversion using the ",
                React.createElement("code", null, "Marked"),
                " plugin."))));
};
exports.default = Streaming;
