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
exports.PasteCleanupRTE = void 0;
/**
 * Rich Text Editor Paste Cleanup sample
 */
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./paste-cleanup.css");
var PasteCleanupRTE = /** @class */ (function (_super) {
    __extends(PasteCleanupRTE, _super);
    function PasteCleanupRTE(props) {
        var _this = _super.call(this, props) || this;
        _this.pasteCleanupSettings = {
            prompt: true,
            plainText: false,
            keepFormat: false
        };
        _this.popupHeight = '200px';
        _this.value = "prompt";
        _this.fields = { text: "text", value: "value" };
        _this.formatData = [
            { text: 'Prompt', value: 'prompt' },
            { text: 'Plain Text', value: 'plainText' },
            { text: 'Keep Format', value: 'keepFormat' },
            { text: 'Clean Format', value: 'cleanFormat' }
        ];
        _this.formatChange = function () {
            if (_this.formatOption.value === 'prompt') {
                _this.rteObj.pasteCleanupSettings.prompt = true;
            }
            else if (_this.formatOption.value === 'plainText') {
                _this.rteObj.pasteCleanupSettings.prompt = false;
                _this.rteObj.pasteCleanupSettings.plainText = true;
            }
            else if (_this.formatOption.value === 'keepFormat') {
                _this.rteObj.pasteCleanupSettings.prompt = false;
                _this.rteObj.pasteCleanupSettings.plainText = false;
                _this.rteObj.pasteCleanupSettings.keepFormat = true;
            }
            else if (_this.formatOption.value === 'cleanFormat') {
                _this.rteObj.pasteCleanupSettings.prompt = false;
                _this.rteObj.pasteCleanupSettings.plainText = false;
                _this.rteObj.pasteCleanupSettings.keepFormat = false;
            }
        };
        _this.allowedStylePropertiesEle = null;
        _this.allowedStylePropertiesRef = function (element) {
            _this.allowedStylePropertiesEle = element;
        };
        _this.deniedTagsEle = null;
        _this.deniedTagsRef = function (element) {
            _this.deniedTagsEle = element;
        };
        _this.deniedAttributesEle = null;
        _this.deniedAttributesRef = function (element) {
            _this.deniedAttributesEle = element;
        };
        return _this;
    }
    PasteCleanupRTE.prototype.rendereComplete = function () {
        var _this = this;
        var allowedStylePropsElem = this.allowedStylePropertiesEle;
        var deniedTagsElem = this.deniedTagsEle;
        var deniedAttrsElem = this.deniedAttributesEle;
        allowedStylePropsElem.addEventListener('blur', function (e) {
            _this.onPasteCleanupSettingsChange(e.target.value, 'allowedStyleProps');
        });
        deniedAttrsElem.addEventListener('blur', function (e) {
            _this.onPasteCleanupSettingsChange(e.target.value, 'deniedAttrs');
        });
        deniedTagsElem.addEventListener('blur', function (e) {
            _this.onPasteCleanupSettingsChange(e.target.value, 'deniedTags');
        });
    };
    PasteCleanupRTE.prototype.onPasteCleanupSettingsChange = function (value, settingsProperty) {
        if (!(0, ej2_base_1.isNullOrUndefined)(value)) {
            var arrayValue = value.split(',').map(function (item) { return item.trim().replace(/^['"]|['"]$/g, ''); });
            this.rteObj.pasteCleanupSettings[settingsProperty] = arrayValue.filter(function (prop) { return prop !== ''; });
        }
    };
    PasteCleanupRTE.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'control-section', id: "rteAPI" },
                    React.createElement("div", { className: 'rte-control-section' },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "PasteCleanup", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, pasteCleanupSettings: this.pasteCleanupSettings },
                            React.createElement("h4", null,
                                "Paste Cleanup in Rich Text Editor",
                                React.createElement("br", null)),
                            React.createElement("p", null,
                                "The Rich Text Editor automatically ",
                                React.createElement("strong", null, "cleans up formatted content"),
                                " when you paste from external sources like Word, Google Docs, or web pages."),
                            React.createElement("p", null,
                                React.createElement("b", null, "Paste Cleanup properties:")),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Prompt "),
                                    "- specifies whether to enable the prompt when pasting in Rich Text Editor"),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Plain Text "),
                                    "- specifies whether to paste as plain text or not in Rich Text Editor."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Keep Format"),
                                    "- specifies whether to keep or remove the format when pasting in Rich Text Editor."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Denied Tags"),
                                    " - specifies the tags to restrict when pasting in Rich Text Editor."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Denied Attributes"),
                                    " - specifies the attributes to restrict when pasting in Rich Text Editor."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Allowed Style Properties"),
                                    " - specifies the allowed style properties when pasting in Rich Text Editor.")),
                            React.createElement("p", null,
                                React.createElement("span", null,
                                    React.createElement("strong", null, "Try It Out!"))),
                            React.createElement("p", null, "Copy content from a web page or document and paste it here. The editor will display a prompt and allow you to input your options."),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] }))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "rteAPIProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: "pasteStyle", style: { width: '100%', margin: '10px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Prompt ")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "formattingOption", dataSource: this.formatData, ref: function (dropdownlist) { _this.formatOption = dropdownlist; }, fields: this.fields, change: this.formatChange.bind(this), value: this.value, popupHeight: this.popupHeight })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Denied Tags ")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement("input", { type: "text", id: "deniedTags", ref: this.deniedTagsRef, className: "e-input", placeholder: "'img[!href]', 'h1'" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Denied Attributes ")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement("input", { id: "deniedAttributes", ref: this.deniedAttributesRef, type: "text", className: "e-input", placeholder: "'id', 'title'" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Allowed Style Properties ")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement("input", { id: "allowedStyleProperties", ref: this.allowedStylePropertiesRef, type: "text", className: "e-input", placeholder: "'href', 'style'" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the paste cleanup feature of the Rich Text Editor control. Copy your content from MS Word or other website, and paste it within the editor to cleanup.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Rich Text Editor allows to paste the HTML content from MS Word or other websites. The editor cleanup the pasted HTML content by considering the following items."),
                React.createElement("ul", null,
                    React.createElement("li", null, "The unformatted HTML element (MOS XML format) content to standard HTML elements."),
                    React.createElement("li", null, "The MS Office prefixed style properties is converted to proper CSS style properties."),
                    React.createElement("li", null, "The unwanted tags, CSS styles, and comments are removed from the copied content.")),
                React.createElement("p", null, "The following settings are available to cleanup the content in pasteCleanup settings property:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Select any option in ",
                        React.createElement("code", null, "Format Option"),
                        " drop down list for the paste content.",
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                "Select the ",
                                React.createElement("code", null, "Prompt"),
                                " option to invoke prompt dialog with paste options on pasting the content in editor."),
                            React.createElement("li", null,
                                "Select the ",
                                React.createElement("code", null, "Plain Text"),
                                " option to paste the content as plain text."),
                            React.createElement("li", null,
                                "Select the ",
                                React.createElement("code", null, "Keep Format"),
                                " option to keep the same format in the copied content."),
                            React.createElement("li", null,
                                "Select the ",
                                React.createElement("code", null, "Clean Format"),
                                " option to remove the style format in the copied content."))),
                    React.createElement("li", null,
                        "Fill the ",
                        React.createElement("code", null, "denied tags"),
                        " text box to ignore the tags when pasting HTML content. For example:",
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("code", null, "['a[!href]']"),
                                " - paste the content by filtering anchor tags that don\u2019t have the 'href' attribute."),
                            React.createElement("li", null,
                                React.createElement("code", null, "['a[href, target]']"),
                                " - paste the content by filtering anchor tags that have the 'href' and 'target' attributes."))),
                    React.createElement("li", null,
                        "Fill the ",
                        React.createElement("code", null, "denied attributes"),
                        " to paste the content by filtering out these attributes from the content. For example:",
                        React.createElement("ul", null,
                            React.createElement("code", null, "['id', 'title']"),
                            " - This will remove the attributes 'id' and 'title' from all tags.")),
                    React.createElement("li", null,
                        "Fill the ",
                        React.createElement("code", null, "allowed style properties"),
                        " to paste the content by accepting these style attributes and removing other attributes. For example:",
                        React.createElement("ul", null,
                            React.createElement("code", null, "['color', 'margin']"),
                            " - This will allow only the style properties 'color' and 'margin' in each pasted element."))),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The previous features were built as modules to be included in your application. For example, inject the ",
                    React.createElement("code", null, "'PasteCleanup'"),
                    " module using ",
                    React.createElement("code", null, "Toolbar, Link, Image, QuickToolbar, Count, HtmlEditor, PasteCleanup"),
                    " to use the paste cleanup feature."))));
    };
    return PasteCleanupRTE;
}(sample_base_1.SampleBase));
exports.PasteCleanupRTE = PasteCleanupRTE;
