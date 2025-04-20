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
var title_bar_1 = require("./title-bar");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./writing-assist.css");
function WritingAssist() {
    var container = (0, react_1.useRef)(null);
    var titleBar;
    var dialog;
    var toolbar;
    var editableDiv;
    var toolItem = {
        prefixIcon: "e-icons e-file-new",
        text: "AI Write",
        id: "write"
    };
    var menuItems = [
        {
            text: 'AI Write',
            id: 'write',
            iconCss: 'e-icons e-file-new'
        }
    ];
    (0, react_1.useEffect)(function () {
        editableDiv === null || editableDiv === void 0 ? void 0 : editableDiv.addEventListener("focus", removePlaceholder);
        editableDiv === null || editableDiv === void 0 ? void 0 : editableDiv.addEventListener("blur", setPlaceholder);
        editableDiv === null || editableDiv === void 0 ? void 0 : editableDiv.addEventListener('input', function () {
            toolbar.items[3].disabled = false;
            toolbar.dataBind();
        });
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
        setPlaceholder();
    }, []);
    var toneValue = 'Professional';
    var formatValue = 'Paragraph';
    var lengthValue = 'Medium';
    var outList = [];
    var toneList = ['Professional', 'Friendly', 'Instructional', 'Marketing', 'Academic', 'Legal', 'Technical', 'Narrative', 'Direct'];
    var formatValueList = ['Paragraph', 'Blog post', 'Technical Documentation', 'Report', 'Research Papers', 'Tutorial', 'Meeting Notes'];
    var lengthList = ['Short', 'Medium', 'Long'];
    function setPlaceholder() {
        if ((editableDiv === null || editableDiv === void 0 ? void 0 : editableDiv.innerHTML.trim()) === "") {
            editableDiv.innerHTML = "Please provide the topic or idea for content generation...";
            editableDiv.classList.add("placeholder"); // Add a class for styling
        }
    }
    function removePlaceholder() {
        if (editableDiv.innerHTML === "Please provide the topic or idea for content generation...") {
            editableDiv.innerHTML = "";
            editableDiv.classList.remove("placeholder");
        }
    }
    var onLoadDefault = function () {
        container.current.documentEditor.documentName = "Getting Started";
        titleBar.updateDocumentTitle();
        container.current.documentEditor.contextMenu.addCustomMenu(menuItems, false);
        container.current.customContextMenuSelect = function (args) {
            var item = args.id;
            var id = container.current.element.id;
            switch (item) {
                case id + '_editorwrite':
                    dialog.show();
                    break;
            }
        };
        container.current.toolbarClick = function (args) {
            switch (args.item.id) {
                case 'write':
                    dialog.show();
                    break;
            }
        };
    };
    function onOpen() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, onChangeToolbarVisibility(true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function onclose() {
        clearContent();
    }
    function onToolbarCreated() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (dialog) {
                    dialog.show();
                }
                updateIndex();
                return [2 /*return*/];
            });
        });
    }
    function onSettingsClick() {
        onChangeToolbarVisibility(false);
    }
    function onCloseSecndaryToolbar() {
        onChangeToolbarVisibility(true);
    }
    function onChangeToolbarVisibility(showPryItem) {
        return __awaiter(this, void 0, void 0, function () {
            var isPrimary, i;
            return __generator(this, function (_a) {
                isPrimary = true;
                if (!showPryItem) {
                    isPrimary = false;
                }
                for (i = 0; i < 5; i++) {
                    toolbar.items[i].visible = isPrimary;
                    toolbar.items[i + 5].visible = !isPrimary;
                }
                return [2 /*return*/];
            });
        });
    }
    function onGenerateClick() {
        return __awaiter(this, void 0, void 0, function () {
            var text, options, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, ej2_react_popups_1.createSpinner)({
                            target: document.getElementById('dialog'),
                        });
                        (0, ej2_react_popups_1.showSpinner)(document.getElementById('dialog'));
                        text = editableDiv.innerText;
                        if (!(toolbar.items[3].text === 'Generate')) return [3 /*break*/, 2];
                        options = {
                            messages: [
                                { role: "system", content: "You are a helpful assistant. Your task is to generate content based on the provided text. Please adjust the text to reflect a tone of '".concat(toneValue, "', formatted in '").concat(formatValue, "' style, and maintain a length of '").concat(lengthValue, "'. Always respond in proper text format not a md format. Always respond in proper HTML format, excluding <html>, <head>, and <body> tags.") },
                                { role: "user", content: text }
                            ],
                            model: "gpt-4",
                        };
                        return [4 /*yield*/, onGenerate(options)];
                    case 1:
                        _a.sent();
                        toolbar.items[3].text = 'Rewrite';
                        return [3 /*break*/, 4];
                    case 2:
                        options = {
                            messages: [
                                { role: "system", content: "You are a helpful assistant. Your task is to generate content based on the provided text. Please adjust the text to reflect a tone of '".concat(toneValue, "', formatted in '").concat(formatValue, "' style, and maintain a length of '").concat(lengthValue, "'. Always respond in proper text format not a md format. Always respond in proper HTML format, excluding <html>, <head>, and <body> tags.") },
                                { role: "user", content: text }
                            ],
                            model: "gpt-4",
                        };
                        return [4 /*yield*/, onGenerate(options)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
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
    function updateIndex() {
        var element = document.getElementById('numeric');
        var editableDiv = document.getElementById('e-de-editable-div');
        var text = editableDiv.innerHTML;
        if (outList.length > 0 && outList.indexOf(text) !== -1) {
            element.value = (outList.indexOf(text) + 1).toString();
        }
        else if (element) {
            element.value = '0';
        }
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
    //convertion
    function onInsertContent() {
        var response = editableDiv.innerHTML;
        var http = new XMLHttpRequest();
        var url = container.current.serviceUrl + 'SystemClipboard';
        http.open('POST', url, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 304) {
                    container.current.documentEditor.editor.paste(http.responseText);
                    container.current.documentEditor.editor.onEnter();
                    dialog.hide();
                }
            }
        };
        var sfdt = {
            content: response,
            type: '.Html',
        };
        http.send(JSON.stringify(sfdt));
    }
    //clear
    function clearContent() {
        editableDiv.innerHTML = '';
        setPlaceholder();
        onChangeToolbarVisibility(true);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'container', style: { height: "100%" } },
            React.createElement("div", { id: "documenteditor_titlebar", className: "e-de-ctn-title" }),
            React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { id: 'DocumentEditor', ref: container, enableToolbar: true, height: '99%', serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/', toolbarItems: [
                    'New', 'Open', 'Separator', toolItem, 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields', 'ContentControl'
                ] },
                React.createElement(ej2_react_popups_1.DialogComponent, { ref: function (dialogObj) { return dialog = dialogObj; }, id: 'dialog', header: 'Generate Content', showCloseIcon: true, content: document.getElementById("e-de-editable-div"), buttons: [
                        {
                            click: function () {
                                onInsertContent();
                                clearContent();
                            },
                            buttonModel: {
                                isPrimary: true,
                                content: 'Insert',
                                cssClass: 'e-dig-insert'
                            },
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
                    ], visible: false, target: document.getElementById("DocumentEditor"), width: '50%', height: 'auto', isModal: true, close: onclose, beforeOpen: onOpen },
                    React.createElement("div", { id: "e-de-editable-div", contentEditable: "true", style: { height: "100px" }, ref: function (editable) { return editableDiv = editable; } }),
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-d-toolbar", ref: function (toolbarObj) { return toolbar = toolbarObj; }, created: onToolbarCreated },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-left', align: 'Left', click: moveToPrevious }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', cssClass: 'page-count', template: function () {
                                    return React.createElement("div", null,
                                        React.createElement("input", { type: 'text', id: 'numeric', style: { width: '20px', paddingLeft: '10px' } }),
                                        React.createElement("span", { id: "total-page" }, " of 3 "));
                                } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-right', align: 'Left', click: moveToNext }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Generate', align: 'Right', click: onGenerateClick, disabled: true }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-settings', align: 'Right', click: onSettingsClick }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-close', align: 'Left', click: onCloseSecndaryToolbar }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', template: function () { return React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: '125px', change: onToneChange, value: toneValue, dataSource: toneList, popupWidth: '125px', showClearButton: false, readonly: false }); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', template: function () { return React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: '200px', change: onFormatChange, value: formatValue, dataSource: formatValueList, popupWidth: '200px', showClearButton: false, readonly: false }); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', align: 'Left', template: function () { return React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: '100px', change: onLengthChange, value: lengthValue, dataSource: lengthList, popupWidth: '100px', showClearButton: false, readonly: false }); } }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Rewrite', align: 'Right', click: onGenerateClick })))),
                React.createElement(ej2_react_documenteditor_1.Inject, { services: [ej2_react_documenteditor_1.Toolbar] })))));
}
exports.default = WritingAssist;
