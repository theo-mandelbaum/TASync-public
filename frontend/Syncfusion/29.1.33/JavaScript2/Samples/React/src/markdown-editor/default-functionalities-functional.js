"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor markdown overview sample
 */
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var Marked = require("marked");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./default-functionalities.css");
function MarkDown() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    // set the value to Rich Text Editor
    var template = "The sample is added to showcase **markdown editing**.\n  \n  Type or edit the content and apply formatting to view markdown formatted content.\n      \n  We can add our own custom formation syntax for the Markdown formation, [sample link](https://ej2.syncfusion.com/home/).\n      \n  The third-party library <b>Marked</b> is used in this sample to convert markdown into HTML content";
    var placeholder = 'Enter your text here...';
    // Rich Text Editor items list
    var items = ['Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', 'SuperScript', 'SubScript', '|',
        'CreateLink', 'Image', 'CreateTable', '|',
        {
            tooltipText: 'Preview',
            template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code" >' +
                '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
        }, '|', 'Undo', 'Redo'];
    var textArea;
    var mdsource;
    var mdPreview;
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items
    };
    var formatter = new ej2_react_richtexteditor_1.MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.' } });
    function markdownConversion() {
        if (mdsource.classList.contains('e-active')) {
            var id = rteObj.getID() + 'html-view';
            var htmlPreview = rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked(rteObj.contentModule.getEditPanel().value);
        }
    }
    function fullPreview() {
        var id = rteObj.getID() + 'html-preview';
        var htmlPreview = rteObj.element.querySelector('#' + id);
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        }
        else {
            mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = (0, ej2_base_1.createElement)('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked.marked(rteObj.contentModule.getEditPanel().value);
            mdsource.parentElement.title = 'Code View';
        }
    }
    function rendereComplete() {
        textArea = rteObj.contentModule.getEditPanel();
        textArea.addEventListener('keyup', function (e) {
            markdownConversion();
        });
        mdsource = document.getElementById('preview-code');
        mdsource.addEventListener('click', function (e) {
            fullPreview();
            if (e.currentTarget.classList.contains('e-active')) {
                rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            }
            else {
                rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            }
        });
    }
    return (React.createElement("div", { id: "markdownSample", className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rteMarkdown" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "markdownRTE", ref: function (richtexteditor) { rteObj = richtexteditor; }, editorMode: 'Markdown', height: '250px', valueTemplate: template, formatter: formatter, created: rendereComplete, toolbarSettings: toolbarSettings },
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.MarkdownEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Table] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates markdown editing in the Rich Text Editor with complete features.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Rich Text Editor supports markdown editing when the ",
                React.createElement("code", null, "editorMode"),
                " is set to mode property of the Rich Text Editor"),
            React.createElement("p", null, "The editor\u2019s toolbar contains commands to format the markdown content. The toolbar consists of:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Lists"),
                    " - Ordered and unordered list types."),
                React.createElement("li", null,
                    React.createElement("code", null, "Links"),
                    " - A hyperlink can be inserted into the editor for quick access to related information."),
                React.createElement("li", null,
                    React.createElement("code", null, "Image"),
                    " - Inserts and manages images."),
                React.createElement("li", null,
                    React.createElement("code", null, "Alignment"),
                    " - Aligns the content with left, center, and right margins."),
                React.createElement("li", null,
                    React.createElement("code", null, "Format"),
                    " \u2013 Formats the sentence in different ways such as heading level, quotation, and code snippet"),
                React.createElement("li", null,
                    React.createElement("code", null, "Styles"),
                    " \u2013 Allows you to apply inline styles to the selected content like bold, italic, and more."),
                React.createElement("li", null,
                    React.createElement("code", null, "Tables"),
                    " \u2013 Allows you to insert a table with header.")),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                React.createElement("code", null, "Toolbar, Link, Image, MarkdownEditor, Table"),
                " modules into the services."),
            React.createElement("p", null,
                "The third-party library ",
                React.createElement("code", null, "Marked"),
                " is used in this sample to convert markdown into HTML content."))));
}
exports.default = MarkDown;
