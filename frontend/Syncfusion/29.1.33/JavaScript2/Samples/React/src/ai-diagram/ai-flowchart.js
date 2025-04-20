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
exports.convertTextToFlowchart = void 0;
function convertTextToFlowchart(inputText, diagram) {
    return __awaiter(this, void 0, void 0, function () {
        var options, jsonResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    showLoading();
                    options = {
                        messages: [
                            {
                                role: 'system',
                                content: 'You are an assistant tasked with generating mermaid flow chart diagram data sources based on user queries'
                            },
                            {
                                role: 'user',
                                content: "\n              Generate only the Mermaid flowchart code for the process titled \"".concat(inputText, "\".\n              Use the format provided in the example below, but adjust the steps, conditions, and styles according to the new title:\n              \n              **Example Title:** Bus Ticket Booking\n              \n              **Example Steps and Mermaid Code:**\n              \n                  graph TD\n                  A([Start]) --> B[Choose Destination]\n                  B --> C{Already Registered?}\n                  C -->|No| D[Sign Up]\n                  D --> E[Enter Details]\n                  E --> F[Search Buses]\n                  C --> |Yes| F\n                  F --> G{Buses Available?}\n                  G -->|Yes| H[Select Bus]\n                  H --> I[Enter Passenger Details]\n                  I --> J[Make Payment]\n                  J --> K[Booking Confirmed]\n                  G -->|No| L[Set Reminder]\n                  K --> M([End])\n                  L --> M\n                  style A fill:#90EE90,stroke:#333,stroke-width:2px;\n                  style B fill:#4682B4,stroke:#333,stroke-width:2px;\n                  style C fill:#32CD32,stroke:#333,stroke-width:2px;\n                  style D fill:#FFD700,stroke:#333,stroke-width:2px;\n                  style E fill:#4682B4,stroke:#333,stroke-width:2px;\n                  style F fill:#4682B4,stroke:#333,stroke-width:2px;\n                  style G fill:#32CD32,stroke:#333,stroke-width:2px;\n                  style H fill:#4682B4,stroke:#333,stroke-width:2px;\n                  style I fill:#4682B4,stroke:#333,stroke-width:2px;\n                  style J fill:#4682B4,stroke:#333,stroke-width:2px;\n                  style K fill:#FF6347,stroke:#333,stroke-width:2px;\n                  style L fill:#FFD700,stroke:#333,stroke-width:2px;\n                  style M fill:#FF6347,stroke:#333,stroke-width:2px;\n              \n              \n              Note: Please ensure the generated code matches the title \"").concat(inputText, "\" and follows the format given above. Provide only the Mermaid flowchart code, without any additional explanations, comments, or text.\n              ")
                            }
                        ],
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, window.getAzureChatAIRequest(options)];
                case 2:
                    jsonResponse = _a.sent();
                    diagram.loadDiagramFromMermaid(jsonResponse);
                    diagram.dataBind();
                    hideLoading();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    convertTextToFlowchart(inputText, diagram);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.convertTextToFlowchart = convertTextToFlowchart;
;
// Function to show loading indicator
function showLoading() {
    document.getElementById('loadingContainer').style.display = 'block';
}
// Function to hide loading indicator
function hideLoading() {
    document.getElementById('loadingContainer').style.display = 'none';
}
