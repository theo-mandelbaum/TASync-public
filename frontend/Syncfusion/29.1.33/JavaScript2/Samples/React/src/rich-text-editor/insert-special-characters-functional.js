"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor custom toolbar sample
 */
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./insert-special-characters.css");
function InsertSpecialCharacters() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    var rteSpecialCharEle = null;
    var rteSpecialCharRef = function (element) {
        rteSpecialCharEle = element;
    };
    var rteSectionEle = null;
    var rteSectionRef = function (element) {
        rteSectionEle = element;
    };
    var selection = new ej2_react_richtexteditor_1.NodeSelection();
    var range;
    var customBtn;
    var dialogCtn;
    var saveSelection;
    var dialogObj;
    // Rich Text Editor items list
    var items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
        {
            tooltipText: 'Insert Symbol',
            template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%"><div class="e-tbar-btn-text" style="font-weight: 400;"> &#937;</div></button>'
        }, '|', 'Undo', 'Redo'
    ];
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items
    };
    var dlgButtons = [{ buttonModel: { content: "Insert", isPrimary: true }, click: onInsert.bind(this) },
        { buttonModel: { content: 'Cancel' }, click: onCancel }];
    var header = 'Special Characters';
    var target = rteSectionEle;
    var height = 'auto';
    function onCreate() {
        var customBtn = document.getElementById('custom_tbar');
        customBtn.onclick = function (e) {
            rteObj.contentModule.getEditPanel().focus();
            dialogObj.element.style.display = '';
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialogObj.content = rteSpecialCharEle;
            dialogObj.show();
        };
    }
    function dialogCreate() {
        var dialogCtn = rteSpecialCharEle;
        dialogCtn.onclick = function (e) {
            var target = e.target;
            var activeEle = dialogObj.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeEle) {
                    activeEle.classList.remove('e-active');
                }
            }
        };
    }
    function onInsert() {
        var activeEle = dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            if (rteObj.formatter.getUndoRedoStack().length === 0) {
                rteObj.formatter.saveData();
            }
            saveSelection.restore();
            rteObj.executeCommand('insertText', activeEle.textContent);
            rteObj.formatter.saveData();
            rteObj.formatter.enableUndo(rteObj);
        }
        dialogOverlay();
    }
    function dialogOverlay() {
        var activeEle = dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        dialogObj.hide();
    }
    function onCancel() {
        var activeEle = this.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        this.hide();
    }
    function actionCompleteHandler(e) {
        if (e.requestType === 'SourceCode') {
            rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.add('e-overlay');
        }
        else if (e.requestType === 'Preview') {
            rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.remove('e-overlay');
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section e-rte-custom-tbar-section', id: "rteCustomTool" },
            React.createElement("div", { className: 'rte-control-section', ref: rteSectionRef, id: 'rteSection' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "specialCharRTE", ref: function (scope) { rteObj = scope; }, toolbarSettings: toolbarSettings, actionComplete: actionCompleteHandler.bind(this), created: onCreate.bind(this) },
                    React.createElement("div", { style: { display: 'block' } },
                        React.createElement("p", { style: { marginRight: '10px' } }, "The custom command \"insert special character\" is configured as the last item of the toolbar. Click on the command and choose the special character you want to include from the popup.")),
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'customTbarDlg', ref: function (scope) { dialogObj = scope; }, buttons: dlgButtons, overlayClick: dialogOverlay.bind(this), header: header, visible: false, showCloseIcon: false, width: '43%', target: '#rteSection', height: height, created: dialogCreate.bind(this), isModal: true }),
                React.createElement("div", { id: "customTbarDialog", style: { display: 'none' } },
                    React.createElement("div", { id: "rteSpecial_char", ref: rteSpecialCharRef },
                        React.createElement("div", { className: "char_block", title: "^" }, "^"),
                        React.createElement("div", { className: "char_block", title: "_" }, "_"),
                        React.createElement("div", { className: "char_block", title: "`" }, "`"),
                        React.createElement("div", { className: "char_block", title: "{" }, "{"),
                        React.createElement("div", { className: "char_block", title: "|" }, "|"),
                        React.createElement("div", { className: "char_block", title: "}" }, "}"),
                        React.createElement("div", { className: "char_block", title: "~" }, "~"),
                        React.createElement("div", { className: "char_block", title: "\u00A0" }, "\u00A0"),
                        React.createElement("div", { className: "char_block", title: "\u00A1" }, "\u00A1"),
                        React.createElement("div", { className: "char_block", title: "\u00A2" }, "\u00A2"),
                        React.createElement("div", { className: "char_block", title: "\u00A3" }, "\u00A3"),
                        React.createElement("div", { className: "char_block", title: "\u00A4" }, "\u00A4"),
                        React.createElement("div", { className: "char_block", title: "\u00A5" }, "\u00A5"),
                        React.createElement("div", { className: "char_block", title: "\u20B9" }, "\u20B9"),
                        React.createElement("div", { className: "char_block", title: "\u00A6" }, "\u00A6"),
                        React.createElement("div", { className: "char_block", title: "\u00A7" }, "\u00A7"),
                        React.createElement("div", { className: "char_block", title: "\u00A8" }, "\u00A8"),
                        React.createElement("div", { className: "char_block", title: "\u00A9" }, "\u00A9"),
                        React.createElement("div", { className: "char_block", title: "\u00AA" }, "\u00AA"),
                        React.createElement("div", { className: "char_block", title: "\u00AB" }, "\u00AB"),
                        React.createElement("div", { className: "char_block", title: "\u00AC" }, "\u00AC"),
                        React.createElement("div", { className: "char_block", title: "\u00AD" }, "\u00AD"),
                        React.createElement("div", { className: "char_block", title: "\u00AE" }, "\u00AE"),
                        React.createElement("div", { className: "char_block", title: "\u00AF" }, "\u00AF"),
                        React.createElement("div", { className: "char_block", title: "\u00B0" }, "\u00B0"),
                        React.createElement("div", { className: "char_block", title: "\u00B1" }, "\u00B1"),
                        React.createElement("div", { className: "char_block", title: "\u00B2" }, "\u00B2"),
                        React.createElement("div", { className: "char_block", title: "\u00B3" }, "\u00B3"),
                        React.createElement("div", { className: "char_block", title: "\u00B4" }, "\u00B4"),
                        React.createElement("div", { className: "char_block", title: "\u00B5" }, "\u00B5"),
                        React.createElement("div", { className: "char_block", title: "\u00B6" }, "\u00B6"),
                        React.createElement("div", { className: "char_block", title: "\u00B7" }, "\u00B7"),
                        React.createElement("div", { className: "char_block", title: "\u00B8" }, "\u00B8"),
                        React.createElement("div", { className: "char_block", title: "\u00B9" }, "\u00B9"),
                        React.createElement("div", { className: "char_block", title: "\u00BA" }, "\u00BA"),
                        React.createElement("div", { className: "char_block", title: "\u00BB" }, "\u00BB"),
                        React.createElement("div", { className: "char_block", title: "\u00BC" }, "\u00BC"),
                        React.createElement("div", { className: "char_block", title: "\u00BD" }, "\u00BD"),
                        React.createElement("div", { className: "char_block", title: "\u00BE" }, "\u00BE"),
                        React.createElement("div", { className: "char_block", title: "\u00BF" }, "\u00BF"),
                        React.createElement("div", { className: "char_block", title: "\u00C0" }, "\u00C0"),
                        React.createElement("div", { className: "char_block", title: "\u00C1" }, "\u00C1"),
                        React.createElement("div", { className: "char_block", title: "\u00C2" }, "\u00C2"),
                        React.createElement("div", { className: "char_block", title: "\u00C3" }, "\u00C3"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample shows how to add your own commands to toolbar of the Rich Text Editor. The ",
                React.createElement("code", null, "\u201C\u03A9\u201D "),
                "  command is added to insert special characters in the editor. Click the \u201C\u03A9\u201D command to show the special characters list, and then choose the character to be inserted in the editor.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Rich Text Editor allows you to configure your own commands to its toolbar using ",
                React.createElement("code", null, "toolbarSettings"),
                " property. The command can be plain text, icon, or HTML template. You can also define the order and group where the command should be included. Bind the action to the command by getting its instance. "),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                React.createElement("code", null, "Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup"),
                " modules into the services."))));
}
exports.default = InsertSpecialCharacters;
