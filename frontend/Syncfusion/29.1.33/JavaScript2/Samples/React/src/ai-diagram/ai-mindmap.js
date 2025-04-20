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
exports.convertTextToMindMap = void 0;
var utilitymethods_1 = require("./utilitymethods");
var ai_text_to_mindmap_1 = require("./ai-text-to-mindmap");
function convertTextToMindMap(inputText, diagram) {
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
                                content: 'You are an assistant tasked with generating mermaid mindmap diagram data source based on user queries with space indentation'
                            },
                            {
                                role: 'user',
                                content: "Generate only the Mermaid mindmap code for the subject titled \"".concat(inputText, "\".\n            Use the format provided in the example below, but adjust the steps, shapes, and indentation according to the new title:\n            \n            **Example Title:** Organizational Research\n            \n            **Example Steps and Mermaid Code:**\n  \n                mindmap\n                root(Mobile Banking Registration)\n                    User(User)\n                    PersonalInfo(Personal Information)\n                        Name(Name)\n                        DOB(Date of Birth)\n                        Address(Address)\n                    ContactInfo))Contact Information((\n                        Email(Email)\n                        Phone(Phone Number)\n                    Account[Account]\n                        AccountType[Account Type]\n                            Savings[Savings]\n                            Checking[Checking]\n                        AccountDetails(Account Details)\n                            AccountNumber(Account Number)\n                            SortCode(Sort Code)\n                    Security{{Security}}\n                        Authentication(Authentication)\n                            Password(Password)\n                            Biometrics(Biometrics)\n                            Fingerprint(Fingerprint)\n                            FaceID(Face ID)\n                        Verification)Verification(\n                            OTP)OTP(\n                            SecurityQuestions)Security Questions(\n                    Terms(Terms & Conditions)\n                        AcceptTerms(Accept Terms)\n                        PrivacyPolicy(Privacy Policy)\n  \n            \n            \n            Note: Please ensure the generated code matches the title \"").concat(inputText, "\" and follows the format given above. Provide only the Mermaid mindmap code, without any additional explanations, comments, or text.\n            ")
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
                    diagram.clearHistory();
                    (0, utilitymethods_1.pushWorkingData)(diagram);
                    ai_text_to_mindmap_1.toolbarObj.items[0].disabled = true;
                    hideLoading();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    convertTextToMindMap(inputText, diagram);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.convertTextToMindMap = convertTextToMindMap;
;
// Function to show loading indicator
function showLoading() {
    document.getElementById('loadingContainer').style.display = 'block';
}
// Function to hide loading indicator
function hideLoading() {
    document.getElementById('loadingContainer').style.display = 'none';
}
