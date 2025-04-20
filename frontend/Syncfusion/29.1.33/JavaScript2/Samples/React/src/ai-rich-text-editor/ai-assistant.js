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
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./rich-text-editor.css");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var react_1 = require("react");
(0, ej2_base_1.enableRipple)(true);
function SmartRichTextEditor() {
    (0, react_1.useEffect)(function () {
        regenerateButton.element.addEventListener('click', function () {
            updateAISugesstions();
        });
        copyButton.element.addEventListener('click', function () {
            copyTextToClipboard(AIResult);
        });
        replaceButton.element.addEventListener('click', function () {
            var _a, _b;
            var range = (_a = defaultRTE.formatter.editorManager.nodeSelection) === null || _a === void 0 ? void 0 : _a.getRange(defaultRTE.contentModule.getDocument());
            (_b = defaultRTE.formatter.editorManager.nodeSelection) === null || _b === void 0 ? void 0 : _b.restore(range);
            defaultRTE.executeCommand('insertHTML', AIResult, { undo: true });
            closeDialog();
        });
    }, []);
    var toolbarSettings = {
        items: [
            {
                tooltipText: 'AI Assistant',
                template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="ai_assistant_button_tbar" style="width:100%"><div class="e-rte-dropdown-btn-text">AIAssistant</div></button>'
            },
            {
                tooltipText: 'Rephrase',
                template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="ai_rephrase_button_tbar" style="width:100%"><div class="e-tbar-btn-text">Rephrase</div></button>'
            },
            'Bold',
            'Italic',
            'Underline',
            '|',
            'FontName',
            'FontSize',
            'FontColor',
            '|',
            'BackgroundColor',
            'Formats',
            'Alignments',
            '|',
            'OrderedList',
            'BulletFormatList',
            'CreateLink',
            'Image',
            '|',
            'createTable',
            'SourceCode',
            'Undo',
            'Redo',
        ],
    };
    var queryList = [
        { ID: "Rephrase", Text: "Rephrase" },
        { ID: "Grammar", Text: "Correct Grammar" },
        { ID: "Summarize", Text: "Summarize" },
        { ID: "Elaborate", Text: "Elaborate" },
        { ID: "Translate", Text: "Translate" },
        { ID: "SentimentAnalysis", Text: "Sentiment Analysis" }
    ];
    var languageList = [
        { ID: "EN", Text: "English" },
        { ID: "ZH", Text: "Chinese (Simplified)" },
        { ID: "ZHT", Text: "Chinese (Traditional)" },
        { ID: "ES", Text: "Spanish" },
        { ID: "HI", Text: "Hindi" },
        { ID: "AR", Text: "Arabic" },
        { ID: "BN", Text: "Bengali" },
        { ID: "PT", Text: "Portuguese" },
        { ID: "RU", Text: "Russian" },
        { ID: "JA", Text: "Japanese" },
        { ID: "DE", Text: "German" },
        { ID: "KO", Text: "Korean" },
        { ID: "FR", Text: "French" },
        { ID: "IT", Text: "Italian" },
        { ID: "TR", Text: "Turkish" }
    ];
    var subQuery = '';
    var promptQuery = '';
    var isSentimentCheck = false;
    var resultData = '';
    var defaultRTE;
    var leftRte;
    var rightRte;
    var aiassistantButton;
    var dropValIndex = 0;
    var queryCategory;
    var regenerateButton;
    var copyButton;
    var replaceButton;
    var sentimentButton;
    var apiResultData;
    var AIResult;
    var toastObj;
    var chipList;
    var languageCategory;
    var translatelanguage;
    var chipValue = ['Standard'];
    var dialog;
    function aiQuerySelectedMenu(args) {
        dialogueOpen(args.item.text);
    }
    function onToolbarClick(args) {
        if (args.item.tooltipText === 'Rephrase') {
            dialogueOpen("Rephrase");
        }
    }
    function dialogueOpen(selectedQuery) {
        var _a, _b;
        var selectionText = defaultRTE.getSelectedHtml();
        if (selectionText) {
            var range = (_a = defaultRTE.formatter.editorManager.nodeSelection) === null || _a === void 0 ? void 0 : _a.getRange(defaultRTE.contentModule.getDocument());
            (_b = defaultRTE.formatter.editorManager.nodeSelection) === null || _b === void 0 ? void 0 : _b.save(range, defaultRTE.contentModule.getDocument());
            dropValIndex = queryList.findIndex(function (q) { return q.Text.toLowerCase() === selectedQuery.toLowerCase(); });
            queryCategory.index = dropValIndex;
            leftRte.value = promptQuery = selectionText;
            leftRte.refreshUI();
            dialog.show();
            updateAISugesstionsData(selectedQuery);
        }
        else {
            toastObj.timeOut = 2000;
            toastObj.content = 'Please select the content to perform the AI operation.';
            toastObj.show();
        }
    }
    function updateAISugesstionsData(selectedQuery) {
        document.getElementById('language').style.display = 'none';
        document.getElementById('chips-container').style.display = 'none';
        isSentimentCheck = false;
        switch (selectedQuery) {
            case "Summarize":
                subQuery = "Summarize the upcoming sentence shortly.";
                break;
            case "Elaborate":
                subQuery = "Elaborate on the upcoming sentence.";
                break;
            case "Rephrase":
                document.getElementById('chips-container').style.display = '';
                subQuery = chipValue[0] + " rephrase the upcoming sentence.";
                break;
            case "Correct Grammar":
                subQuery = "Correct the grammar of the upcoming sentence.";
                break;
            case "Translate":
                document.getElementById('language').style.display = '';
                subQuery = "Translate the upcoming sentence to " + translatelanguage + ".";
                break;
            case "Sentiment Analysis":
                isSentimentCheck = true;
                subQuery = "Analyze the sentiment and grammar of the following paragraphs and provide the expression score with an emoji followed by the sentiment in the format: \"😊 Neutral\". \n\nNOTE: Avoid any additional text or explanation:";
                break;
        }
        updateAISugesstions();
    }
    function updateAISugesstions() {
        try {
            if (promptQuery) {
                document.getElementById('skeletonId').style.display = '';
                document.getElementById('rightRte').style.display = 'none';
                sentimentButton.element.style.display = 'none';
                regenerateButton.disabled = true;
                copyButton.disabled = true;
                replaceButton.disabled = true;
                apiResultData = getResponseFromOpenAI(subQuery, promptQuery);
                apiResultData.then(function (result) {
                    AIResult = isSentimentCheck ? promptQuery : result;
                    sentimentButton.content = result.toLowerCase().includes("positive") ? "😊 Positive" : result.toLowerCase().includes("negative") ? "😞 Negative" : "😐 Neutral";
                    sentimentButton.element.style.display = !isSentimentCheck ? 'none' : '';
                    rightRte.value = AIResult;
                    var noResultsFound = !(AIResult || promptQuery);
                    document.getElementById('no-results-found').style.display = noResultsFound ? '' : 'none';
                    regenerateButton.disabled = noResultsFound;
                    copyButton.disabled = noResultsFound;
                    replaceButton.disabled = noResultsFound;
                    document.getElementById('skeletonId').style.display = 'none';
                    document.getElementById('rightRte').style.display = noResultsFound ? 'none' : '';
                });
            }
        }
        catch (_a) {
            toastObj.show();
        }
    }
    function getResponseFromOpenAI(subQuery, promptQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, window.OpenAiModelRTE(subQuery, promptQuery)];
                    case 1:
                        content = _a.sent();
                        return [2 /*return*/, content ? content : ''];
                }
            });
        });
    }
    function onCreate() {
        if (!aiassistantButton) {
            aiassistantButton = new ej2_react_splitbuttons_1.DropDownButton({
                items: [
                    { text: 'Rephrase' },
                    { text: 'Correct Grammar' },
                    { text: 'Summarize' },
                    { text: 'Elaborate' },
                    { text: 'Translate' },
                    { text: 'Sentiment Analysis' }
                ],
                cssClass: 'menubutton e-tbar-btn e-tbar-btn-text',
                select: aiQuerySelectedMenu
            });
            aiassistantButton.appendTo('#ai_assistant_button_tbar');
        }
        dialog.hide();
    }
    function dialogShow() {
        dialog.element.style.display = '';
    }
    function closeDialog() {
        dialog.hide();
        rightRte.value = '';
        leftRte.value = '';
        promptQuery = '';
        chipValue[0] = 'Standard';
        AIResult = '';
        dropValIndex = 0;
        document.getElementById('chips-container').style.display = '';
        document.getElementById('language').style.display = 'none';
        sentimentButton.content = '😊 Neutral';
    }
    function copyTextToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                console.log('Text copied to clipboard successfully!');
            }).catch(function (err) {
                console.error('Failed to copy text: ', err);
            });
        }
        else {
            // Fallback for browsers that do not support the Clipboard API
            var textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                console.log('Text copied to clipboard using execCommand');
            }
            catch (err) {
                console.error('Failed to copy text: ', err);
            }
            finally {
                document.body.removeChild(textarea);
            }
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'container', className: 'e-rte-custom-tbar-section' },
            React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { ref: function (richtexteditor) { return defaultRTE = richtexteditor; }, id: 'defaultRTE', height: 550, saveInterval: 0, autoSaveOnIdle: true, value: "<h2><span>Integrate AI with the Editor</span></h2><p>Integrate the AI assistant into the rich text editor by capturing the content from the editor, sending it to the AI service, and displaying the results or suggestions back in the editor.</p><h3>Summarize</h3><p>This function condenses the selected content into a brief summary, capturing the main points succinctly.</p><h3>Elaborate</h3><p>This function expands the selected content, adding additional details and context.</p><h3>Rephrase</h3><p>This function rewrites the selected content to convey the same meaning using different words or structures. It also enables rephrase options and disables language selection.</p><h3>Correct Grammar</h3><p>This function reviews and corrects the grammar of the selected content, ensuring it adheres to standard grammatical rules.</p><h3>Translate</h3><p>This function translates the selected content into the specified language, enabling language selection and disabling rephrase options.</p>", toolbarSettings: toolbarSettings, created: onCreate, toolbarClick: onToolbarClick },
                React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.HtmlEditor] })),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialog", ref: function (dialogObj) { return dialog = dialogObj; }, className: "modal", style: { display: "none" }, header: "AI Assistant", content: document.getElementById('dialog-content'), target: document.getElementById('defaultRTE'), showCloseIcon: true, isModal: true, height: "100%", width: "80%", cssClass: "e-rte-elements custom-dialog-rte", zIndex: 1000, footerTemplate: document.getElementById('dialog-footer-content'), close: closeDialog, overlayClick: function () {
                    var activeEle = dialog.element.querySelector('.char_block.e-active');
                    if (activeEle) {
                        activeEle.classList.remove('e-active');
                    }
                    closeDialog();
                }, open: dialogShow },
                React.createElement("div", { id: "dialog-content", className: "dialog-content", style: { height: "100%" } },
                    React.createElement("div", { className: "custom-row-0" },
                        React.createElement("div", { className: "cuscol-0", style: { width: "100%", alignItems: "center", justifyContent: "left" } },
                            React.createElement("div", { style: { width: '75%', textAlign: 'left' } },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (query) { return queryCategory = query; }, id: "queryCategory", index: 0, dataSource: queryList, fields: { text: 'Text', value: 'ID' }, cssClass: "e-e-round-corner", select: function (args) {
                                        chipList.selectedChips = 0;
                                        languageCategory.index = 0;
                                        translatelanguage = "EN";
                                        updateAISugesstionsData(args.itemData.Text);
                                    } }, "Rephrase"))),
                        React.createElement("div", { className: "cuscol-1", style: { justifyContent: 'space-between', alignItems: 'center', width: '100%' } },
                            React.createElement("div", { id: "language", style: { width: '100%', display: 'none' } },
                                React.createElement("div", { style: { display: 'flex', justifyContent: 'right', alignItems: 'center' } },
                                    React.createElement("div", { style: { textAlign: 'end', paddingRight: '20px' } },
                                        React.createElement("span", null, "Target Language")),
                                    React.createElement("div", { style: { textAlign: 'right' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (language) { return languageCategory = language; }, id: "language-Category", index: 0, dataSource: languageList, fields: { text: 'Text', value: 'ID' }, cssClass: "e-e-round-corner", select: function (args) {
                                                translatelanguage = args.itemData.ID;
                                                updateAISugesstionsData("Translate");
                                            } })))),
                            React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "chips-container", ref: function (chip) { return chipList = chip; }, style: { justifyContent: 'right', alignItems: 'center', width: '100%', display: 'none' }, chips: ['Standard', 'Fluent', 'Professional'], selection: "Single", cssClass: "e-outline", selectedChips: [0], click: function (args) {
                                    chipValue[0] = args.text;
                                    updateAISugesstionsData("Rephrase");
                                } }))),
                    React.createElement("div", { className: "custom-row-1", style: { height: "74%" } },
                        React.createElement("div", { className: "cuscol-0", style: { width: "100%", height: "100%", alignItems: "center", justifyContent: "left" } },
                            React.createElement("div", { style: { textAlign: 'left' } },
                                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { ref: function (richtexteditor) { return leftRte = richtexteditor; }, id: "leftRte", height: 310, value: resultData, toolbarSettings: {
                                        enable: false,
                                    }, placeholder: "Analysis of AI Support", width: "100%", cssClass: "e-outline" },
                                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor] })))),
                        React.createElement("div", { className: "cuscol-1", style: { display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' } },
                            React.createElement("div", { style: { textAlign: 'left', width: '100%' } },
                                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { ref: function (richtexteditor) { return rightRte = richtexteditor; }, id: "rightRte", style: { display: 'none' }, height: 310, value: resultData, toolbarSettings: {
                                        enable: false,
                                    }, placeholder: "Analysis of AI Support", width: "100%", cssClass: "e-outline" },
                                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor] })),
                                React.createElement("div", { className: "no-results-found", id: "no-results-found", style: { height: '244px', alignContent: 'center', display: 'none' } },
                                    React.createElement("img", { height: "50", width: "50", src: "https://storage.googleapis.com/cdn-bolddesk/agent-angular-app/images/light/no-records-warning.svg" }),
                                    React.createElement("div", null, "No results found")),
                                React.createElement("div", { id: 'skeletonId', style: { display: 'none' } },
                                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonId1', shape: "Rectangle", height: "20px", width: "100%" }),
                                    React.createElement("br", null),
                                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonId2', shape: "Rectangle", height: "20px", width: "90%" }),
                                    React.createElement("br", null),
                                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonId3', shape: "Rectangle", height: "20px", width: "70%" }),
                                    React.createElement("br", null),
                                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonId4', shape: "Rectangle", height: "20px", width: "50%" }),
                                    React.createElement("br", null),
                                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonId5', shape: "Rectangle", height: "20px", width: "30%" }),
                                    React.createElement("br", null),
                                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { id: 'skeletonId6', shape: "Rectangle", height: "20px", width: "10%" }),
                                    React.createElement("br", null))))),
                    React.createElement("div", { id: "dialog-footer-content" },
                        React.createElement("div", { className: "custom-row-0" },
                            React.createElement("div", { className: "cuscol-0", style: { width: "100%", alignItems: "center", justifyContent: "left" } },
                                React.createElement("div", { style: { textAlign: 'right' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (button) { return regenerateButton = button; }, content: "Regenerate", isPrimary: true, disabled: true }))),
                            React.createElement("div", { className: "cuscol-1", style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' } },
                                React.createElement("div", { style: { textAlign: 'right', width: '100%' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (button) { return sentimentButton = button; }, content: "\uD83D\uDE0A Neutral", disabled: true, cssClass: "sentiment" }),
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (button) { return copyButton = button; }, content: "Copy", disabled: true }),
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (button) { return replaceButton = button; }, content: "Replace", isPrimary: true, disabled: true }))))))),
            React.createElement(ej2_react_notifications_1.ToastComponent, { id: "toast_default", ref: function (toast) { return toastObj = toast; }, showCloseButton: true, timeOut: 0, content: "An error occurred during the AI process, Please try again.", position: { X: 'Right', Y: 'Top' } }))));
}
exports.default = SmartRichTextEditor;
