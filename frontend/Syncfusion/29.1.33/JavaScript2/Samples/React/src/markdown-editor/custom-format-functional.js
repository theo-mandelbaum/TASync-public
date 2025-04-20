"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor custom format sample
 */
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var Marked = require("marked");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./custom-format.css");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
function CustomFormat() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    // set the value to Rich Text Editor
    var template = "The sample is configured with customized markdown syntax using the __formatter__ property. Type the content and click the toolbar item to view customized markdown syntax. For unordered list, you need to add a plus sign before the word (e.g., + list1). Or To make a phrase bold, you need to add two underscores before and after the phrase (e.g., __this text is bold__).";
    var placeholder = "Enter your text here...";
    // Rich Text Editor items list
    var items = ['Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
        'CreateLink', 'Image', '|',
        {
            template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
                '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
        }, 'Undo', 'Redo'];
    var textArea;
    var mdsource;
    var mdPreview;
    var tooltipObj;
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items
    };
    var formatter = new ej2_react_richtexteditor_1.MarkdownFormatter({
        listTags: { 'OL': '2. ', 'UL': '+ ' },
        formatTags: {
            'Blockquote': '> '
        },
        selectionTags: { 'Bold': '__', 'Italic': '_' }
    });
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
            rteObj.enableToolbarItem(rteObj.toolbarSettings.items);
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
            tooltipObj.content = "Preview";
        }
        else {
            mdsource.classList.add('e-active');
            rteObj.disableToolbarItem(rteObj.toolbarSettings.items);
            if (!htmlPreview) {
                htmlPreview = (0, ej2_base_1.createElement)('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            tooltipObj.content = "Codeview";
            htmlPreview.innerHTML = Marked.marked(rteObj.contentModule.getEditPanel().value);
        }
    }
    function rendereComplete() {
        mdPreview = document.getElementById('MD_Preview');
        textArea = rteObj.contentModule.getEditPanel();
        textArea.addEventListener('keyup', function (e) {
            markdownConversion();
        });
        mdsource = document.getElementById('preview-code');
        mdsource.addEventListener('click', function (e) {
            fullPreview();
        });
        tooltipObj = new ej2_react_popups_1.Tooltip({
            content: "Preview",
            target: "#preview-code"
        });
        tooltipObj.appendTo("#preview-code");
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rteCustomFormat" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "markdownRTE", ref: function (richtexteditor) { rteObj = richtexteditor; }, height: '260px', editorMode: 'Markdown', formatter: formatter, valueTemplate: template, created: rendereComplete, toolbarSettings: toolbarSettings },
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.MarkdownEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Table] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, " This sample demonstrates how to customize tags of markdown formatting. Type or edit the text and apply the format to view customized markdown syntax. For example, apply \u201C+\u201D to Unordered list. ")),
        React.createElement("div", { id: "description" },
            "The Rich Text Editor allows you to customize the markdown syntax by overriding its default syntax. Configure the customized markdown syntax using the ",
            React.createElement("code", null, "formatter"),
            "property",
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                React.createElement("code", null, "Toolbar, Link, Image, MarkdownEditor"),
                " modules into the services."),
            React.createElement("p", null,
                "The third-party library ",
                React.createElement("code", null, "Marked"),
                " is used in this sample to convert markdown into HTML content."))));
}
exports.default = CustomFormat;
