"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor markdown preview sample
 */
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var Marked = require("marked");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./overview.css");
function Preview() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    var splitterInstance;
    // set the value to Rich Text Editor
    var value = "In Rich Text Editor , you click the toolbar buttons to format the words and the changes are visible immediately. \n  Markdown is not like that. When you format the word in Markdown format, you need to add Markdown syntax to the word to indicate which words \n  and phrases should look different from each other\n      \n  Rich Text Editor supports markdown editing when the editorMode set as **markdown** and using both *keyboard interaction* and *toolbar action*, you can apply the formatting to text.\n      \n  We can add our own custom formation syntax for the Markdown formation, [sample link](https://ej2.syncfusion.com/home/).\n      \n  The third-party library <b>Marked</b> is used in this sample to convert markdown into HTML content";
    // Rich Text Editor items list
    var items = ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo'];
    var textArea;
    var srcArea;
    var placeholder = 'Enter your text here...';
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items,
        type: ej2_react_richtexteditor_1.ToolbarType.Expand,
        enableFloating: false
    };
    function onCreate() {
        textArea = rteObj.contentModule.getEditPanel();
        srcArea = document.querySelector('.source-code');
        updateValue();
    }
    function onChange() {
        updateValue();
    }
    function onResizing() {
        rteObj.refreshUI();
    }
    function updateValue() {
        srcArea.innerHTML = Marked.marked(rteObj.contentModule.getEditPanel().value);
    }
    function updateOrientation() {
        if (ej2_base_1.Browser.isDevice) {
            splitterInstance.orientation = 'Vertical';
            document.body.querySelector('.heading').style.width = 'auto';
        }
    }
    function content1() {
        return (React.createElement("div", { className: "content" },
            React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: 'defaultRTE', ref: function (richtexteditor) { rteObj = richtexteditor; }, editorMode: 'Markdown', toolbarSettings: toolbarSettings, height: '447px', saveInterval: 1, created: onCreate.bind(this), change: onChange.bind(this), actionComplete: updateValue.bind(this), value: value },
                React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.MarkdownEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Table] }))));
    }
    ;
    function content2() {
        return (React.createElement("div", { className: "heading right" },
            React.createElement("h6", { className: "title" },
                React.createElement("b", null, "Markdown Preview")),
            React.createElement("div", { className: "splitter-default-content source-code pane2", style: { padding: "20px" } })));
    }
    ;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section markdown-preview', id: "rtePreview" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement(ej2_react_layouts_1.SplitterComponent, { id: 'splitter-rte-markdown-preview', ref: function (splitter) { return (splitterInstance = splitter); }, height: '450px', width: '100%', resizing: onResizing.bind(this), created: updateOrientation.bind(this) },
                    React.createElement(ej2_react_layouts_1.PanesDirective, null,
                        React.createElement(ej2_react_layouts_1.PaneDirective, { resizable: true, size: '50%', min: "40%", cssClass: 'pane1', content: content1.bind(this) }),
                        React.createElement(ej2_react_layouts_1.PaneDirective, { min: "40%", cssClass: 'pane2', content: content2.bind(this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how to preview markdown changes in Rich Text Editor. Type or edit the display text, and apply format to view the preview of markdown. You can preview the markdown changes immediately in the preview area.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Rich Text Editor allows you to preview markdown changes immediately using ",
                React.createElement("code", null, "preview"),
                ". The third-party library ",
                React.createElement("code", null, "Marked"),
                " is used in this sample to convert markdown into HTML content."))));
}
exports.default = Preview;
