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
exports.Preview = void 0;
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
var Preview = /** @class */ (function (_super) {
    __extends(Preview, _super);
    function Preview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // set the value to Rich Text Editor
        _this.value = "In Rich Text Editor , you click the toolbar buttons to format the words and the changes are visible immediately. \nMarkdown is not like that. When you format the word in Markdown format, you need to add Markdown syntax to the word to indicate which words \nand phrases should look different from each other\n    \nRich Text Editor supports markdown editing when the editorMode set as **markdown** and using both *keyboard interaction* and *toolbar action*, you can apply the formatting to text.\n    \nWe can add our own custom formation syntax for the Markdown formation, [sample link](https://ej2.syncfusion.com/home/).\n    \nThe third-party library <b>Marked</b> is used in this sample to convert markdown into HTML content";
        // Rich Text Editor items list
        _this.items = ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote', 'OrderedList',
            'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo'];
        _this.placeholder = 'Enter your text here...';
        //Rich Text Editor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items,
            type: ej2_react_richtexteditor_1.ToolbarType.Expand,
            enableFloating: false
        };
        return _this;
    }
    Preview.prototype.onCreate = function () {
        this.textArea = this.rteObj.contentModule.getEditPanel();
        this.srcArea = document.querySelector('.source-code');
        this.updateValue();
    };
    Preview.prototype.onChange = function () {
        this.updateValue();
    };
    Preview.prototype.onResizing = function () {
        this.rteObj.refreshUI();
    };
    Preview.prototype.updateValue = function () {
        this.srcArea.innerHTML = Marked.marked(this.rteObj.contentModule.getEditPanel().value);
    };
    Preview.prototype.updateOrientation = function () {
        if (ej2_base_1.Browser.isDevice) {
            this.splitterInstance.orientation = 'Vertical';
            document.body.querySelector('.heading').style.width = 'auto';
        }
    };
    Preview.prototype.content1 = function () {
        var _this = this;
        return (React.createElement("div", { className: "content" },
            React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: 'defaultRTE', ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, editorMode: 'Markdown', toolbarSettings: this.toolbarSettings, height: '447px', saveInterval: 1, created: this.onCreate.bind(this), change: this.onChange.bind(this), actionComplete: this.updateValue.bind(this), value: this.value },
                React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.MarkdownEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Table] }))));
    };
    ;
    Preview.prototype.content2 = function () {
        return (React.createElement("div", { className: "heading right" },
            React.createElement("h6", { className: "title" },
                React.createElement("b", null, "Markdown Preview")),
            React.createElement("div", { className: "splitter-default-content source-code pane2", style: { padding: "20px" } })));
    };
    ;
    Preview.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section markdown-preview', id: "rtePreview" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_layouts_1.SplitterComponent, { id: 'splitter-rte-markdown-preview', ref: function (splitter) { return (_this.splitterInstance = splitter); }, height: '450px', width: '100%', resizing: this.onResizing.bind(this), created: this.updateOrientation.bind(this) },
                        React.createElement(ej2_react_layouts_1.PanesDirective, null,
                            React.createElement(ej2_react_layouts_1.PaneDirective, { resizable: true, size: '50%', min: "40%", cssClass: 'pane1', content: this.content1.bind(this) }),
                            React.createElement(ej2_react_layouts_1.PaneDirective, { min: "40%", cssClass: 'pane2', content: this.content2.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example illustrates how to preview Markdown changes within the Rich Text Editor. You can input or modify the display text, apply formatting, and observe the Markdown preview alongside. This capability is enabled by utilizing the splitter component, which effectively separates the Rich Text Editor from the preview section.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Rich Text Editor provides the ability to instantly ",
                    React.createElement("code", null, "preview"),
                    " Markdown changes through the preview functionality. To achieve this, the sample utilizes the third-party library Marked.js to convert Markdown into HTML content."))));
    };
    return Preview;
}(sample_base_1.SampleBase));
exports.Preview = Preview;
