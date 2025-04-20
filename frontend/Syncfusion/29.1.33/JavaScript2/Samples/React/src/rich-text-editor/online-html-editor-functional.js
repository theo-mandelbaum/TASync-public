"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_richtexteditor_2 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var CodeMirror = require("codemirror");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("./online-html-editor.css");
function OnlineHtmlEditor() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    var splitterInstance;
    // Rich Text Editor items list
    var items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent',
        'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'SourceCode', '|', 'Undo', 'Redo'
    ];
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items,
        type: ej2_react_richtexteditor_2.ToolbarType.Expand,
        enableFloating: false
    };
    var myCodeMirror;
    var srcArea;
    var textArea;
    function onCreate() {
        updateValue();
        textArea = rteObj.contentModule.getEditPanel();
        srcArea = document.querySelector('.source-code');
        if (srcArea) {
            srcArea.addEventListener('keyup', updateHtmlValue);
        }
    }
    function updateHtmlValue() {
        rteObj.value = myCodeMirror.getValue();
        rteObj.dataBind();
    }
    function onChange() {
        updateValue();
    }
    function onResizing() {
        rteObj.refreshUI();
    }
    function updateValue() {
        var mirrorView = document.querySelector('#src-view');
        if (!mirrorView) {
            mirrorView = (0, ej2_base_1.createElement)('div', {
                className: 'e-content'
            });
            mirrorView.id = 'src-view';
            var srcCodeElement = document.querySelector('.source-code');
            if (srcCodeElement) {
                srcCodeElement.appendChild(mirrorView);
            }
            mirrorView.innerHTML = '';
            mirrorView.style.display = 'block';
        }
        var srcViewEle = document.querySelector('#src-view');
        var codemirrorEle = document.querySelector('.CodeMirror-wrap');
        if (codemirrorEle) {
            codemirrorEle.remove();
        }
        if (rteObj.value) {
            renderCodeMirror(srcViewEle, rteObj.value);
        }
    }
    function renderCodeMirror(mirrorView, content) {
        myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    }
    function updateOrientation() {
        if (ej2_base_1.Browser.isDevice) {
            splitterInstance.orientation = 'Vertical';
            document.body.querySelector('.heading').style.width = 'auto';
        }
    }
    function content1() {
        return (React.createElement("div", { className: "content" },
            React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: 'defaultRTE', ref: function (richtexteditor) { rteObj = richtexteditor; }, toolbarSettings: toolbarSettings, height: '447px', saveInterval: 1, showCharCount: true, maxLength: 5000, created: onCreate.bind(this), change: onChange.bind(this), actionComplete: updateValue.bind(this) },
                React.createElement("h3", null, "Welcome to the HTML real-time live editor!"),
                React.createElement("p", null, "Create and edit the valid HTML code simply! You don't worry about the HTML syntax to format your text content. The WYSIWYG editor (left side view) provided the toolbar to make format text and insert images, tables, and more options."),
                React.createElement("h4", null, "Don't worry about syntax"),
                React.createElement("p", null, "The content editing works bi-directional, you can write the HTML code on the right-side view (code view), and changes will reflect in the WYSIWYG editor."),
                React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_2.QuickToolbar, ej2_react_richtexteditor_2.Table, ej2_react_richtexteditor_2.Count, ej2_react_richtexteditor_2.PasteCleanup, ej2_react_richtexteditor_2.EmojiPicker, ej2_react_richtexteditor_2.Audio, ej2_react_richtexteditor_2.Video, ej2_react_richtexteditor_2.FormatPainter] }))));
    }
    ;
    function content2() {
        return (React.createElement("div", { className: "heading right" },
            React.createElement("h6", { className: "title" },
                React.createElement("b", null, "HTML SOURCE")),
            React.createElement("div", { className: "splitter-default-content source-code pane2", contentEditable: true })));
    }
    ;
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: 'control-section onlineEditor' },
            React.createElement("div", { id: "rte-online-sample-view" },
                React.createElement(ej2_react_layouts_1.SplitterComponent, { id: 'splitter-rte-online-html-editor', ref: function (splitter) { return (splitterInstance = splitter); }, height: '450px', width: '100%', resizing: onResizing.bind(this), created: updateOrientation.bind(this) },
                    React.createElement(ej2_react_layouts_1.PanesDirective, null,
                        React.createElement(ej2_react_layouts_1.PaneDirective, { resizable: true, size: '50%', min: "40%", cssClass: 'pane1', content: content1.bind(this) }),
                        React.createElement(ej2_react_layouts_1.PaneDirective, { min: "40%", cssClass: 'pane2', content: content2.bind(this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The online HTML editor sample demonstrates how to create LIVE editing scenario with real-world applications using JavaScript Rich Text Editor. Most of the control features are enabled in this sample to edit the content quickly."),
            React.createElement("p", null, "You can edit the source code and content also parallelly. The source code is formatted using the code mirror library.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This sample explains how to create a live HTML editor application using Rich Text Editor."))));
}
exports.default = OnlineHtmlEditor;
