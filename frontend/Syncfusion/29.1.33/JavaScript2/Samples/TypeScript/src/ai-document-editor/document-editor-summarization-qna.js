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
define(["require", "exports", "@syncfusion/ej2-documenteditor", "@syncfusion/ej2-interactive-chat", "@syncfusion/ej2/popups", "./title-bar"], function (require, exports, ej2_documenteditor_1, ej2_interactive_chat_1, popups_1, title_bar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onValueChange = void 0;
    var isDocumentChanged = true;
    ej2_documenteditor_1.DocumentEditorContainer.Inject(ej2_documenteditor_1.Toolbar);
    var container = new ej2_documenteditor_1.DocumentEditorContainer({ enableToolbar: true, height: '100%', width: '100%', serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/' });
    container.created = function () {
        var sfdt = '{\"sfdt\":\"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\"}';
        container.documentEditor.open(sfdt);
    };
    container.appendTo('#DocumentEditor');
    var titleBar = new title_bar_1.TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    if (container.documentEditor) {
        container.documentEditor.documentName = 'Getting Started';
    }
    titleBar.updateDocumentTitle();
    (0, popups_1.createSpinner)({
        target: document.getElementById('container'),
    });
    var isChecked = false;
    var responseToolbarSettings = {
        itemClicked: function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = args.item.iconCss;
                            switch (_a) {
                                case 'e-icons e-copy': return [3, 1];
                                case 'e-btn-icon e-de-ctnr-new': return [3, 3];
                            }
                            return [3, 4];
                        case 1: return [4, copyToClip(aiAssistView.prompts[args.dataIndex].response)];
                        case 2:
                            _b.sent();
                            return [3, 4];
                        case 3:
                            onInsertContent(aiAssistView.prompts[args.dataIndex].response);
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            });
        },
        items: [
            { iconCss: 'e-icons e-copy' },
            { iconCss: 'e-btn-icon e-de-ctnr-new' },
        ]
    };
    function copyToClip(content) {
        return __awaiter(this, void 0, void 0, function () {
            var blob, clipboardItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blob = new Blob([content], { type: 'text/html' });
                        clipboardItem = new ClipboardItem({
                            'text/html': blob,
                        });
                        return [4, navigator.clipboard.write([clipboardItem])];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    }
    var assistViewToolbarSettings = {
        itemClicked: function (args) {
            switch (args.item.iconCss) {
                case 'e-icons e-close':
                    onCloseAIPane();
                    titleBar.onValueChange(false);
                    break;
            }
        },
        items: [
            { iconCss: 'e-icons e-close', align: 'Right' },
        ]
    };
    var aiAssistView = new ej2_interactive_chat_1.AIAssistView({
        promptPlaceholder: "Ask a question about this document.",
        height: '100%',
        toolbarSettings: assistViewToolbarSettings,
        bannerTemplate: "<div class=\"ai-assist-banner\">\n                            <div class=\"e-icons e-ai-assist\"></div>\n                            <h2>Summarization & QnA</h2>\n                        </div>",
        promptRequest: promptRequestToAI,
        responseToolbarSettings: responseToolbarSettings,
    });
    aiAssistView.appendTo('#e-de-ai');
    function onValueChange(checked) {
        if (checked) {
            onOpenAIPane();
        }
        else {
            onCloseAIPane();
        }
    }
    exports.onValueChange = onValueChange;
    function onOpenAIPane() {
        isChecked = true;
        container.showPropertiesPane = false;
        container.width = '70%';
        var element = document.getElementById('e-de-ai');
        if (element) {
            element.style.display = 'block';
        }
        if (isDocumentChanged) {
            aiAssistView.executePrompt("Summarize the document");
        }
    }
    function onCloseAIPane() {
        isChecked = false;
        container.showPropertiesPane = true;
        container.width = '100%';
        var element = document.getElementById('e-de-ai');
        if (element) {
            element.style.display = 'none';
        }
    }
    container.documentChange = function () {
        isDocumentChanged = true;
        dispose();
        if (isChecked) {
            aiAssistView.executePrompt("Summarize the document");
        }
    };
    function promptRequestToAI(args) {
        return __awaiter(this, void 0, void 0, function () {
            var documentText_1, response, suggestions, suggestionsArray, ans;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, popups_1.showSpinner)(document.getElementById('container'));
                        if (!(args.prompt === 'Summarize the document' && isDocumentChanged)) return [3, 5];
                        isDocumentChanged = false;
                        documentText_1 = '';
                        return [4, container.documentEditor.saveAsBlob('Txt')
                                .then(function (exportedDocument) { return exportedDocument.text(); })
                                .then(function (text) {
                                documentText_1 = text;
                            })];
                    case 1:
                        _a.sent();
                        return [4, uploadDocument(documentText_1)];
                    case 2:
                        _a.sent();
                        return [4, getDocumentSummary(documentText_1)];
                    case 3:
                        response = _a.sent();
                        aiAssistView.addPromptResponse(response);
                        return [4, getSuggestions()];
                    case 4:
                        suggestions = _a.sent();
                        suggestionsArray = suggestions.split('\n');
                        aiAssistView.promptSuggestions = suggestionsArray;
                        return [3, 7];
                    case 5:
                        if (!args.prompt) return [3, 7];
                        return [4, getAnswer(args.prompt)];
                    case 6:
                        ans = _a.sent();
                        aiAssistView.addPromptResponse(ans);
                        _a.label = 7;
                    case 7:
                        (0, popups_1.hideSpinner)(document.getElementById('container'));
                        return [2];
                }
            });
        });
    }
    function dispose() {
        aiAssistView.prompts = [];
        aiAssistView.promptSuggestions = [];
    }
    function uploadDocument(documentText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var http = new XMLHttpRequest();
                        var url = 'http://localhost:62870/api/documenteditor/UpLoadDocument';
                        http.open('POST', url, true);
                        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                        var sfdt = {
                            content: documentText,
                        };
                        http.onreadystatechange = function () {
                            if (http.readyState === 4) {
                                if (http.status === 200 || http.status === 304) {
                                    resolve();
                                }
                                else {
                                    reject("Error: ".concat(http.status, " - ").concat(http.statusText));
                                }
                            }
                        };
                        http.send(JSON.stringify(sfdt));
                    })];
            });
        });
    }
    function getDocumentSummary(documentText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var http = new XMLHttpRequest();
                        var url = 'http://localhost:62870/api/documenteditor/GetDocumentSummary';
                        http.open('GET', url, true);
                        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                        http.onreadystatechange = function () {
                            if (http.readyState === 4) {
                                if (http.status === 200 || http.status === 304) {
                                    resolve(http.responseText);
                                }
                                else {
                                    reject("Error: ".concat(http.status, " - ").concat(http.statusText));
                                }
                            }
                        };
                        var sfdt = {
                            content: documentText,
                        };
                        http.send(JSON.stringify(sfdt));
                    })];
            });
        });
    }
    function getSuggestions() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var http = new XMLHttpRequest();
                        var url = 'http://localhost:62870/api/documenteditor/GetSuggestions';
                        http.open('GET', url, true);
                        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                        http.onreadystatechange = function () {
                            if (http.readyState === 4) {
                                if (http.status === 200 || http.status === 304) {
                                    resolve(http.responseText);
                                }
                                else {
                                    reject("Error: ".concat(http.status, " - ").concat(http.statusText));
                                }
                            }
                        };
                        http.send();
                    })];
            });
        });
    }
    function getAnswer(question) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var http = new XMLHttpRequest();
                        var url = 'http://localhost:62870/api/documenteditor/GetDocumentSummary';
                        http.open('GET', url, true);
                        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                        http.onreadystatechange = function () {
                            if (http.readyState === 4) {
                                if (http.status === 200 || http.status === 304) {
                                    resolve(http.responseText);
                                }
                                else {
                                    reject("Error: ".concat(http.status, " - ").concat(http.statusText));
                                }
                            }
                        };
                        var sfdt = {
                            content: question,
                        };
                        http.send(JSON.stringify(sfdt));
                    })];
            });
        });
    }
    function onInsertContent(response) {
        var http = new XMLHttpRequest();
        var url = container.serviceUrl + 'SystemClipboard';
        http.open('POST', url, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 304) {
                    container.documentEditor.editor.paste(http.responseText);
                    container.documentEditor.editor.onEnter();
                }
            }
        };
        var sfdt = {
            content: response,
            type: '.Html',
        };
        http.send(JSON.stringify(sfdt));
    }
});
