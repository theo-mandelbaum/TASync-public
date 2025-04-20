"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFormat = void 0;
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
var CustomFormat = /** @class */ (function (_super) {
    __extends(CustomFormat, _super);
    function CustomFormat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // set the value to Rich Text Editor
        _this.template = "The sample is configured with customized markdown syntax using the __formatter__ property. Type the content and click the toolbar item to view customized markdown syntax. For unordered list, you need to add a plus sign before the word (e.g., + list1). Or To make a phrase bold, you need to add two underscores before and after the phrase (e.g., __this text is bold__).";
        _this.placeholder = "Enter your text here...";
        // Rich Text Editor items list
        _this.items = ['Bold', 'Italic', 'StrikeThrough', '|',
            'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
            {
                template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
                    '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
            }, 'Undo', 'Redo'];
        //Rich Text Editor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        _this.formatter = new ej2_react_richtexteditor_1.MarkdownFormatter({
            listTags: { 'OL': '2. ', 'UL': '+ ' },
            formatTags: {
                'Blockquote': '> '
            },
            selectionTags: { 'Bold': '__', 'Italic': '_' }
        });
        return _this;
    }
    CustomFormat.prototype.markdownConversion = function () {
        if (this.mdsource.classList.contains('e-active')) {
            var id = this.rteObj.getID() + 'html-view';
            var htmlPreview = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked(this.rteObj.contentModule.getEditPanel().value);
        }
    };
    CustomFormat.prototype.fullPreview = function () {
        var id = this.rteObj.getID() + 'html-preview';
        var htmlPreview = this.rteObj.element.querySelector('#' + id);
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.rteObj.enableToolbarItem(this.rteObj.toolbarSettings.items);
            this.textArea.style.display = 'block';
            this.tooltipObj.content = "Preview";
            htmlPreview.style.display = 'none';
        }
        else {
            this.mdsource.classList.add('e-active');
            this.rteObj.disableToolbarItem(this.rteObj.toolbarSettings.items);
            if (!htmlPreview) {
                htmlPreview = (0, ej2_base_1.createElement)('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            this.tooltipObj.content = "Codeview";
            htmlPreview.innerHTML = Marked.marked(this.rteObj.contentModule.getEditPanel().value);
        }
    };
    CustomFormat.prototype.rendereComplete = function () {
        var _this = this;
        this.mdPreview = document.getElementById('MD_Preview');
        this.textArea = this.rteObj.contentModule.getEditPanel();
        this.textArea.addEventListener('keyup', function (e) {
            _this.markdownConversion();
            _this.rteObj.toolbarModule.baseToolbar.toolbarObj.hideItem(13, true);
        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', function (e) {
            _this.fullPreview();
        });
        this.tooltipObj = new ej2_react_popups_1.Tooltip({
            content: "Preview",
            target: "#preview-code"
        });
        this.tooltipObj.appendTo("#preview-code");
    };
    CustomFormat.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rteCustomFormat" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "markdownRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, height: '260px', editorMode: 'Markdown', formatter: this.formatter, valueTemplate: this.template, toolbarSettings: this.toolbarSettings },
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
    };
    return CustomFormat;
}(sample_base_1.SampleBase));
exports.CustomFormat = CustomFormat;
