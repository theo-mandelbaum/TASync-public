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
exports.AutoSave = void 0;
/**
 * Rich Text Editor Auto Save sample
 */
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
require("./auto-save.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var property_pane_1 = require("../common/property-pane");
var AutoSave = /** @class */ (function (_super) {
    __extends(AutoSave, _super);
    function AutoSave(props) {
        var _this = _super.call(this, props) || this;
        // Rich Text Editor items list
        _this.items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo'];
        //Rich Text Editor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        _this.savingRef = function (element) {
            _this.savingEle = element;
        };
        _this.savedRef = function (element) {
            _this.savedEle = element;
        };
        return _this;
    }
    AutoSave.prototype.updateStatus = function () {
        var _this = this;
        this.savingEle.style.display = 'block';
        this.savedEle.style.display = 'none';
        setTimeout(function () {
            if (!(0, ej2_base_1.isNullOrUndefined)(_this.savingEle) && !(0, ej2_base_1.isNullOrUndefined)(_this.savedEle)) {
                _this.savingEle.style.display = 'none';
                _this.savedEle.style.display = 'block';
            }
        }, 500);
    };
    AutoSave.prototype.onChange = function (e) {
        var _this = this;
        if (e.checked) {
            this.rteObj.saveInterval = 5000;
        }
        else {
            this.rteObj.saveInterval = 0;
            setTimeout(function () {
                _this.savingEle.style.display = 'none';
                _this.savedEle.style.display = 'none';
            }, 500);
        }
    };
    AutoSave.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'control-section', id: "rteAPI" },
                    React.createElement("div", { className: 'rte-control-section' },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "autoSaveRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, enablePersistence: true, placeholder: 'Start to type a content to save', saveInterval: 5000, toolbarSettings: this.toolbarSettings, change: this.updateStatus.bind(this) },
                            React.createElement("h2", null, "Welcome to the Rich Text Editor Demo!\uD83D\uDCDD"),
                            React.createElement("p", { style: { textAlign: 'start' } }, "Experience the power of modern content editing with advanced formatting, media embedding, and many other features. You can explore this demo for yourself."),
                            React.createElement("h5", null, "Explore the Possibilities! \uD83D\uDE80"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("b", null, "Highly customizable"),
                                    " - You can configure the toolbar, enable/disable features, and fine-tune the editing experience to match your needs."),
                                React.createElement("li", null,
                                    React.createElement("b", null, "Seamless content pasting"),
                                    " - Copy and paste from Microsoft Word, Outlook, or other editors or sources while preserving formatting, styles, and structure."),
                                React.createElement("li", null,
                                    React.createElement("b", null, "Import Word documents"),
                                    " - Convert ",
                                    React.createElement("b", null, "DOCX"),
                                    React.createElement("b", null, " files"),
                                    " into editable HTML content inside the editor using the Import from Word feature."),
                                React.createElement("li", null,
                                    React.createElement("b", null, "One-click Export"),
                                    " - Save your document as ",
                                    React.createElement("b", null, "PDF"),
                                    " \uD83D\uDCC4 or ",
                                    React.createElement("b", null, "Word (DOCX)"),
                                    " \uD83D\uDCDD with just a single click."),
                                React.createElement("li", null,
                                    React.createElement("b", null, "@Mentions"),
                                    " - Type ",
                                    React.createElement("span", { className: "e-mention-chip" },
                                        React.createElement("a", { href: "mailto:albert@gmail.com", title: "albert@gmail.com" }, "@Albert")),
                                    " to see available suggestions and tag users in your content."),
                                React.createElement("li", null,
                                    React.createElement("b", null, "Image Management"),
                                    " - Use the File Manager to browse, upload, and manage images within the editor.")),
                            React.createElement("p", null,
                                React.createElement("br", null)),
                            React.createElement("h5", null, "Powerful Features!"),
                            React.createElement("p", null,
                                "A quick overview of the essential features of the Rich Text Editor.",
                                React.createElement("br", null)),
                            React.createElement("table", { className: "e-rte-table", style: { width: '61.0405%', minWidth: '0px', height: '82px' } },
                                React.createElement("thead", null,
                                    React.createElement("tr", null,
                                        React.createElement("th", { style: { width: '29.9807%' } },
                                            "Feature",
                                            React.createElement("br", null)),
                                        React.createElement("th", { style: { width: '70.0193%' } },
                                            "Description",
                                            React.createElement("br", null)))),
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", { style: { width: '29.981%' } },
                                            "Text Formatting",
                                            React.createElement("br", null)),
                                        React.createElement("td", { style: { width: '70.0193%' } },
                                            "Bold, Italic, Underline, Strikethrough, and more.",
                                            React.createElement("br", null))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { style: { width: '29.9807%' } },
                                            "Lists & Indentation",
                                            React.createElement("br", null)),
                                        React.createElement("td", { style: { width: '70.019%' } },
                                            "Ordered, unordered, nested lists.",
                                            React.createElement("br", null))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { style: { width: '29.9807%' } },
                                            "Tables",
                                            React.createElement("br", null)),
                                        React.createElement("td", { style: { width: '70.019%' } },
                                            "Insert and edit tables with styling.",
                                            React.createElement("br", null))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { style: { width: '29.9807%' } },
                                            "Media Embedding",
                                            React.createElement("br", null)),
                                        React.createElement("td", { style: { width: '70.019%' } },
                                            "Images, videos, and iframes.",
                                            React.createElement("br", null))),
                                    React.createElement("tr", null,
                                        React.createElement("td", { style: { width: '29.9807%' } },
                                            "Mentions",
                                            React.createElement("br", null)),
                                        React.createElement("td", { style: { width: '70.019%' } },
                                            "Tag users and add comments",
                                            React.createElement("br", null))))),
                            React.createElement("p", null,
                                React.createElement("br", null)),
                            React.createElement("h5", null, "Effortless Image Handling!"),
                            React.createElement("p", null,
                                "Insert, resize, align, and manage images seamlessly within the editor.",
                                React.createElement("br", null)),
                            React.createElement("p", { style: { textAlign: 'center' } },
                                React.createElement("img", { alt: "Sky with sun", src: "https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png", width: "400", height: "200", className: "e-rte-image e-imgcenter" })),
                            React.createElement("p", null,
                                React.createElement("br", null)),
                            React.createElement("p", { style: { textAlign: 'center' } },
                                React.createElement("b", null, "\"Great writing begins with a great editor.\""),
                                React.createElement("b", null, " \u270D\uFE0F"),
                                " ",
                                React.createElement("br", null)),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] }),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })),
                        React.createElement("div", { id: 'statusEle', className: 'current-status' },
                            React.createElement("div", { id: 'saving', ref: this.savingRef, style: { display: 'none' } },
                                React.createElement("div", { className: "e-icons e-icon-refresh" }, " "),
                                React.createElement("p", { className: 'status-text' }, " Saving changes")),
                            React.createElement("div", { id: 'saved', ref: this.savedRef, style: { display: 'none' } },
                                React.createElement("span", { className: "e-icons e-icon-tick" }, " "),
                                React.createElement("p", { className: 'status-text' }, "Changes saved")))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "rteAPIProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("label", { htmlFor: "checked", style: { padding: "10px 72px 10px 0" } }, " Auto Save "),
                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "checked", ref: function (scope) { _this.switchObj = scope; }, change: this.onChange.bind(this), checked: true }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "Demonstrates how to save the Rich Text Editor\u2019s content automatically with periodic interval. When you type or edit the content, it will be saved automatically by every 5 seconds. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Rich Text Editor provides options to save its content automatically using the \u2018saveInterval\u2019 property. By default, the save interval time has 10 seconds from built-in support, but it can be customizable as per the application needs. The interval is calculated based on editing the content and does not considered on idle state."),
                React.createElement("p", null, "We have configured save interval as 5 seconds in this example. You can save the content in server also using this \u2018auto save\u2019 option."),
                React.createElement("p", null, "When you disable this 'Auto Save' option in a sample, the value will be saved on focus-out from the editor."),
                React.createElement("p", null, "Rich Text Editor content will be automatically saved when you focus out the editor."))));
    };
    return AutoSave;
}(sample_base_1.SampleBase));
exports.AutoSave = AutoSave;
