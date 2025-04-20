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
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var react_1 = require("react");
var title_bar_1 = require("./title-bar");
var datasource_1 = require("./datasource");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./smart-editor.css");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
function SmartEditor() {
    var container = (0, react_1.useRef)(null);
    var titleBar;
    var dialog;
    var toolbar;
    var questionDiv;
    var editableDiv;
    //toolbar
    var toneValue = 'Professional';
    var formatValue = 'Paragraph';
    var lengthValue = 'Medium';
    var outList = [];
    var translateValue = 'French';
    var grammerList = [];
    var toneList = ['Professional', 'Friendly', 'Instructional', 'Marketing', 'Academic', 'Legal', 'Technical', 'Narrative', 'Direct'];
    var formatValueList = ['Paragraph', 'Blog post', 'Technical Documentation', 'Report', 'Research Papers', 'Tutorial', 'Meeting Notes'];
    var lengthList = ['Short', 'Medium', 'Long'];
    var languageList = ['Simplified Chinese', 'Spanish', 'French', 'Arabic', 'Portuguese', 'Russian', 'Urdu', 'Indonesian', 'German', 'Japanese'];
    var grammer = [
        { id: 'SVA', name: 'Subject-Verb Agreement' },
        { id: 'TC', name: 'Tense Consistency' },
        { id: 'PA', name: 'Pronoun Agreement' },
        { id: 'CU', name: 'Comma Usage' },
        { id: 'PS', name: 'Parallel Structure' },
        { id: 'MM', name: 'Misplaced Modifiers' },
        { id: 'DM', name: 'Dangling Modifiers' },
        { id: 'WC', name: 'Word Choice' },
        { id: 'R', name: 'Redundancy' },
        { id: 'UA', name: 'Use of Articles' },
        { id: 'PM', name: 'Punctuation Marks' },
        { id: 'APC', name: 'Apostrophes for Possessives and Contractions' },
        { id: 'SE', name: 'Spelling Errors' }
    ];
    var menuItems = [
        {
            text: 'Rewrite',
            id: 'rewrite',
            iconCss: 'e-icons e-edit'
        },
        {
            text: 'Translate',
            id: 'translate',
            iconCss: 'e-icons e-transform-right'
        },
        {
            text: 'Grammar',
            id: 'grammer',
            iconCss: 'e-icons e-redaction'
        },
    ];
    (0, react_1.useEffect)(function () {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        if (!titleBar) {
            titleBar = new title_bar_1.TitleBar(document.getElementById("documenteditor_titlebar"), container.current.documentEditor, true);
        }
        onLoadDefault();
    }, []);
    var onLoadDefault = function () {
        // tslint:disable
        var defaultDocument = {
            sfdt: datasource_1.sfdtData
        };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Getting Started";
        titleBar.updateDocumentTitle();
        container.current.documentEditor.contextMenu.addCustomMenu(menuItems, false);
        container.current.documentEditor.customContextMenuBeforeOpen = function (args) {
            var isEmpty = container.current.documentEditor.selection.isEmpty;
            for (var i = 0; i < args.ids.length; i++) {
                var element = document.getElementById(args.ids[i]);
                if (!isEmpty) {
                    element.style.display = 'block';
                }
                else {
                    element.style.display = 'none';
                }
            }
        };
        container.current.customContextMenuSelect = function (args) {
            var item = args.id;
            var id = container.current.element.id;
            switch (item) {
                case id + '_editorrewrite':
                    onRewrite();
                    break;
                case id + '_editortranslate':
                    onTranslate();
                    break;
                case id + '_editorgrammer':
                    onGrammerCheck();
                    break;
            }
        };
    };
    function onRewrite() {
        dialog.header = 'AI Rephrase';
        dialog.show();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        onChangeToolbarVisibility(true, false, false);
        onRewriteClick();
    }
    function onTranslate() {
        dialog.header = 'AI Translate';
        dialog.show();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        onChangeToolbarVisibility(false, true, false);
        onTranslateClick();
    }
    function onGrammerCheck() {
        dialog.header = 'Grammer';
        dialog.show();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        onChangeToolbarVisibility(false, false, true);
        onGrammerCheckClick();
    }
    function onBeforeOpen() {
        onChangeToolbarVisibility(true, false, false);
    }
    function onclose() {
        clearContent();
    }
    function onOpen(args) {
        args.preventFocus = true;
    }
    function onToolbarCreated() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                updateIndex();
                return [2 /*return*/];
            });
        });
    }
    // multiSelect.selectAll(true);
    function onSettingsClick() {
        onChangeToolbarVisibility(false, false, false);
    }
    function onCloseSecndaryToolbar() {
        onChangeToolbarVisibility(true, false, false);
    }
    function onToneChange(args) {
        toneValue = args.value;
    }
    function onFormatChange(args) {
        formatValue = args.value;
    }
    function onLengthChange(args) {
        lengthValue = args.value;
    }
    function onLanguageChange(args) {
        translateValue = args.value;
    }
    function ValueChangeHandler(args) {
        grammerList = args.value;
    }
    function onChangeToolbarVisibility(showPryItem, showTranslateItem, showGrammerItem) {
        var isPrimary = false;
        var isSecondary = true;
        var isTranslate = false;
        var isGrammer = false;
        if (showPryItem) {
            isPrimary = true;
            isSecondary = false;
            isTranslate = false;
            isGrammer = false;
        }
        if (showTranslateItem) {
            isPrimary = false;
            isSecondary = false;
            isTranslate = true;
            isGrammer = false;
        }
        if (showGrammerItem) {
            isPrimary = false;
            isSecondary = false;
            isTranslate = false;
            isGrammer = true;
        }
        for (var i = 0; i < 5; i++) {
            toolbar.items[i].visible = isPrimary;
            toolbar.items[i + 5].visible = isSecondary;
        }
        toolbar.items[10].visible = isTranslate;
        toolbar.items[11].visible = isTranslate;
        toolbar.items[12].visible = isGrammer;
        toolbar.items[13].visible = isGrammer;
    }
    // spinner
    (0, ej2_react_popups_1.createSpinner)({
        target: document.getElementById('dialog'),
    });
    function onRewriteClick() {
        return __awaiter(this, void 0, void 0, function () {
            var text, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, ej2_react_popups_1.showSpinner)(document.getElementById('dialog'));
                        text = questionDiv.innerText;
                        options = {
                            messages: [
                                { role: "system", content: "You are a helpful assistant. Your task is to analyze the provided text and rephrase it. Please adjust the text to reflect a tone of '".concat(toneValue, "', formatted in '").concat(formatValue, "' style, and maintain a length of '").concat(lengthValue, "'. Always respond in proper HTML format, excluding <html>, <head>, and <body> tags.") },
                                { role: "user", content: text }
                            ],
                            model: "gpt-4",
                        };
                        return [4 /*yield*/, onGenerate(options)];
                    case 1:
                        _a.sent();
                        (0, ej2_react_popups_1.hideSpinner)(document.getElementById('dialog'));
                        return [2 /*return*/];
                }
            });
        });
    }
    function onTranslateClick() {
        return __awaiter(this, void 0, void 0, function () {
            var text, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, ej2_react_popups_1.showSpinner)(document.getElementById('dialog'));
                        text = questionDiv.innerText;
                        options = {
                            messages: [
                                { role: "system", content: "You are a helpful assistant. Your task is to translate the provided text into '".concat(translateValue, "'. Always respond in proper HTML format, excluding <html> and <head> tags.") },
                                { role: "user", content: text }
                            ],
                            model: "gpt-4",
                        };
                        return [4 /*yield*/, reframeContent(options)];
                    case 1:
                        _a.sent();
                        (0, ej2_react_popups_1.hideSpinner)(document.getElementById('dialog'));
                        return [2 /*return*/];
                }
            });
        });
    }
    function onGrammerCheckClick() {
        return __awaiter(this, void 0, void 0, function () {
            var value, systemPrompt, text, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, ej2_react_popups_1.showSpinner)(document.getElementById('dialog'));
                        value = '';
                        systemPrompt = '';
                        if (grammerList.length > 0) {
                            grammerList.forEach(function (item) {
                                value += item + ', ';
                            });
                            systemPrompt = "You are a helpful assistant. Your task is to analyze the provided text and perform the following grammar checks: ".concat(value, ". Please ensure that the revised text reflects these corrections. Always respond in proper HTML format, but do not include <html>, <head>, or <body> tags.");
                        }
                        else {
                            systemPrompt = "You are a helpful assistant. Your task is to analyze the provided text, check for and correct any grammatical errors, and rephrase it. Always respond in proper HTML format, but do not include <html>, <head>, or <body> tags.";
                        }
                        text = questionDiv.innerText;
                        options = {
                            messages: [
                                { role: "system", content: systemPrompt },
                                { role: "user", content: text }
                            ],
                            model: "gpt-4",
                        };
                        return [4 /*yield*/, reframeContent(options)];
                    case 1:
                        _a.sent();
                        (0, ej2_react_popups_1.hideSpinner)(document.getElementById('dialog'));
                        return [2 /*return*/];
                }
            });
        });
    }
    function onGenerate(options) {
        return __awaiter(this, void 0, void 0, function () {
            var i, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outList = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, window.getAzureChatAIRequest(options)];
                    case 2:
                        response = _a.sent();
                        if (response && outList.indexOf(response) === -1) {
                            outList.push(response);
                        }
                        else {
                            i--;
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (outList.length > 0) {
                            editableDiv.innerHTML = outList[0];
                            updateIndex();
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function reframeContent(options) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, window.getAzureChatAIRequest(options)];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            editableDiv.innerHTML = response;
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function moveToNext() {
        var text = editableDiv.innerHTML;
        var index = outList.indexOf(text);
        if (index + 1 < outList.length) {
            editableDiv.innerHTML = outList[index + 1];
            updateIndex();
        }
    }
    function moveToPrevious() {
        var text = editableDiv.innerHTML;
        var index = outList.indexOf(text);
        if (index - 1 >= 0) {
            editableDiv.innerHTML = outList[index - 1];
            updateIndex();
        }
    }
    function moveToNextPara() {
        editableDiv.innerHTML = '';
        container.current.documentEditor.selection.moveToParagraphEnd();
        container.current.documentEditor.selection.moveToNextLine();
        container.current.documentEditor.selection.selectParagraph();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        if (dialog.header === 'AI Translate') {
            onTranslateClick();
        }
        else if (dialog.header === 'AI Rephrase') {
            onRewriteClick();
        }
        else {
            onGrammerCheckClick();
        }
    }
    function moveToPreviousPara() {
        editableDiv.innerHTML = '';
        container.current.documentEditor.selection.moveToParagraphEnd();
        container.current.documentEditor.selection.moveToNextLine();
        container.current.documentEditor.selection.selectParagraph();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        if (dialog.header === 'AI Translate') {
            onTranslateClick();
        }
        else if (dialog.header === 'AI Rephrase') {
            onRewriteClick();
        }
        else {
            onGrammerCheckClick();
        }
    }
    function updateIndex() {
        var element = document.getElementById('numeric');
        var editableDiv = document.getElementById("e-de-editable-div");
        var text = editableDiv.innerHTML;
        if (outList.length > 0 && outList.indexOf(text) !== -1) {
            element.value = (outList.indexOf(text) + 1).toString();
        }
        else if (element) {
            element.value = '0';
        }
    }
    //convertion
    function onInsertContent() {
        return __awaiter(this, void 0, void 0, function () {
            var response, http, url, sfdt;
            return __generator(this, function (_a) {
                response = editableDiv.innerHTML;
                http = new XMLHttpRequest();
                url = container.current.serviceUrl + 'SystemClipboard';
                http.open('POST', url, true);
                http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                http.onreadystatechange = function () {
                    if (http.readyState === 4) {
                        if (http.status === 200 || http.status === 304) {
                            container.current.documentEditor.editor.paste(http.responseText);
                            container.current.documentEditor.editor.onEnter();
                            clearContent();
                            dialog.hide();
                        }
                    }
                };
                sfdt = {
                    content: response,
                    type: '.Html',
                };
                http.send(JSON.stringify(sfdt));
                return [2 /*return*/];
            });
        });
    }
    //clear
    function clearContent() {
        editableDiv.innerHTML = '';
        questionDiv.innerText = '';
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'container', style: { height: "100%", width: "100%" } },
            React.createElement("div", { id: "documenteditor_titlebar", className: "e-de-ctn-title" }),
            React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { ref: container, id: 'DocumentEditor', style: { height: "99%", width: "100%" }, enableToolbar: true, height: '99%', width: '100%', serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/' },
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'dialog', ref: function (dialogRef) { return dialog = dialogRef; }, header: 'AI Rephrase', showCloseIcon: true, content: document.getElementById("splitter"), buttons: [
                        {
                            click: function () {
                                onInsertContent();
                            },
                            buttonModel: {
                                isPrimary: true,
                                content: 'Replace'
                            }
                        },
                        {
                            click: function () {
                                clearContent();
                                dialog.hide();
                            },
                            buttonModel: {
                                content: 'Cancel',
                                cssClass: 'e-flat'
                            }
                        }
                    ], visible: false, target: document.getElementById("DocumentEditor"), width: '50%', height: 'auto', isModal: true, close: onclose, beforeOpen: onBeforeOpen, open: onOpen },
                    React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "splitter", height: 'auto', paneSettings: [
                            { size: 'auto', collapsible: true },
                            { size: 'auto', collapsible: true }
                        ], orientation: 'Vertical', width: '100%' },
                        React.createElement("div", { id: "e-de-qus-parent" },
                            React.createElement("div", { id: "e-de-qus-div", ref: function (question) { return questionDiv = question; } }),
                            React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-de-qus-toolbar" },
                                React.createElement(ej2_react_layouts_1.ItemsDirective, null,
                                    React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-left', align: 'Center', click: moveToPreviousPara }),
                                    React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-right', align: 'Center', click: moveToNextPara })))),
                        React.createElement("div", { id: "e-de-editable-div", ref: function (editable) { return editableDiv = editable; }, contentEditable: "true", style: { height: "85px", padding: "5px" } })),
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-d-toolbar", ref: function (toolbarObj) { return toolbar = toolbarObj; }, created: onToolbarCreated },
                        React.createElement(ej2_react_layouts_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-left', align: 'Left', click: moveToPrevious }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', cssClass: 'page-count', template: function () { return React.createElement("div", null,
                                    React.createElement("input", { type: 'text', id: 'numeric', style: { width: '20px', paddingLeft: '10px' } }),
                                    React.createElement("span", { className: "total-page" }, " of 3 ")); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-right', align: 'Left', click: moveToNext }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Rewrite', align: 'Right', click: onRewriteClick }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-settings', align: 'Right', click: onSettingsClick }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-close', align: 'Left', click: onCloseSecndaryToolbar }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', template: function () { return React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: '125px', change: onToneChange, value: toneValue, dataSource: toneList, popupWidth: '125px', showClearButton: false, readonly: false }); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', template: function () { return React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: '200px', change: onFormatChange, value: formatValue, dataSource: formatValueList, popupWidth: '200px', showClearButton: false, readonly: false }); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', template: function () { return React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: '100px', change: onLengthChange, value: lengthValue, dataSource: lengthList, popupWidth: '100px', showClearButton: false, readonly: false }); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Rewrite', align: 'Right', click: onRewriteClick }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', template: function () { return React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: '160px', change: onLanguageChange, value: 'French', dataSource: languageList, popupWidth: '160px', showClearButton: false, readonly: false }); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Translate', align: 'Right', click: onTranslateClick }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', template: function () { return React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { width: '250px', change: ValueChangeHandler, dataSource: grammer, fields: { text: 'name', value: 'name' }, placeholder: "e.g. Spelling Errors", mode: 'CheckBox', showSelectAll: true, selectAllText: "Select All", showDropDownIcon: true, enableSelectionOrder: true, filterBarPlaceholder: "Search grammar suggestion" },
                                    React.createElement(ej2_react_documenteditor_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Rewrite', align: 'Right', click: onGrammerCheckClick })))),
                React.createElement(ej2_react_documenteditor_1.Inject, { services: [ej2_react_documenteditor_1.Toolbar] })))));
}
exports.default = SmartEditor;
