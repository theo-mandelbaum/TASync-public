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
exports.FormatPainterRTE = void 0;
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var FormatPainterRTE = /** @class */ (function (_super) {
    __extends(FormatPainterRTE, _super);
    function FormatPainterRTE() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarSettings = {
            items: ['FormatPainter', 'Bold', 'Italic', 'Underline', 'StrikeThrough',
                'SuperScript', 'SubScript', '|', 'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
                'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'SourceCode', 'Undo', 'Redo']
        };
        return _this;
    }
    FormatPainterRTE.prototype.setAllowedFormats = function (e) {
        this.formatPainterRTE.formatPainterSettings.allowedFormats = e.value;
    };
    FormatPainterRTE.prototype.setdeniedFormats = function (e) {
        this.formatPainterRTE.formatPainterSettings.deniedFormats = e.value;
    };
    FormatPainterRTE.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'control-section', id: "rteAPI" },
                    React.createElement("div", { className: 'rte-control-section' },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "formatPainterRTE", ref: function (richtexteditor) { _this.formatPainterRTE = richtexteditor; }, toolbarSettings: this.toolbarSettings },
                            React.createElement("h3", null, "Format Painter in Rich Text Editor"),
                            React.createElement("p", null,
                                "The ",
                                React.createElement("strong", { "data-start": "50", "data-end": "68" }, "Format Painter"),
                                " allows you to quickly copy and apply text formatting within the editor, saving time and ensuring consistency."),
                            React.createElement("h5", null, "How to Use Format Painter?"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Select the text"),
                                    " with the formatting you want to copy."),
                                React.createElement("li", null,
                                    "Click the ",
                                    React.createElement("strong", null, "Format Painter"),
                                    " button (paintbrush icon) in the toolbar."),
                                React.createElement("li", null,
                                    "The cursor changes to a ",
                                    React.createElement("strong", null, "paintbrush"),
                                    " icon."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Click and drag"),
                                    " over the text where you want to apply the copied format."),
                                React.createElement("li", null, "Release the mouse button, and the formatting will be applied.")),
                            React.createElement("h5", null, "Why Use Format Painter?"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Saves time"),
                                    " when formatting large documents."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Ensures consistency"),
                                    " in text styles. "),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Easy to use"),
                                    " for writers, editors, and content creators.")),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.FormatPainter, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Audio, ej2_react_richtexteditor_1.Video] }))))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "rteAPIProperty" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: "pasteStyle", style: { width: '100%', margin: '10px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Allowed Formats"),
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "allowedFormatInput", cssClass: "e-outline", floatLabelType: 'Never', placeholder: 'span; strong; em; sup, sub; code;', blur: this.setAllowedFormats })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                    React.createElement("div", null, "Denied Formats"),
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "deniedFormatInput", cssClass: "e-outline", floatLabelType: 'Never', placeholder: "span(important)[title]{background-color,color};", blur: this.setdeniedFormats })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo demonstrates the Format Painter feature of the Rich Text Editor component. With Format Painter, copy and apply styles from one content to another.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("b", null, "Format Painter"),
                    " feature allows you to copy the formats and apply them to content that has no formatting thus saving the time to reformat the content."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Format painter can be accessed via the toolbar or the keyboard shortcuts."),
                    React.createElement("li", null, "The sticky mode can be enabled by double-clicking the toolbar button, and it can be utilized to apply a format to multiple locations.")),
                React.createElement("p", null,
                    React.createElement("b", null, "Keyboard Shortcut:")),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("kbd", null, "ALT + SHIFT + C"),
                        " - Copy the selection format or current range."),
                    React.createElement("li", null,
                        React.createElement("kbd", null, "ALT + SHIFT + V"),
                        " - Paint the copied format."),
                    React.createElement("li", null,
                        React.createElement("kbd", null, "ESC"),
                        " - Remove the previously copied format and disable the sticky mode.")),
                React.createElement("p", null,
                    "The following settings are available to customize the format painter in the ",
                    React.createElement("code", null, "formatPainterSettings"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("p", null,
                            "Fill the ",
                            React.createElement("code", null, "Allowed Formats"),
                            " input with selectors only whose format styles will be allowed. For example: ")),
                    React.createElement("li", null,
                        React.createElement("code", null, "span; strong; em; "),
                        " as the input allows only the span, strong, and em format styles to be copied."),
                    React.createElement("li", null,
                        React.createElement("p", null,
                            "Fill the ",
                            React.createElement("code", null, "Denied Formats"),
                            " input with selectors only whose format styles will be explicitly prohibited. For example:"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("code", null,
                                    "span(important)[title]",
                                    '{',
                                    "background-color,color",
                                    '}'),
                                " as the input will remove only the ",
                                React.createElement("code", null, "important"),
                                " class,",
                                React.createElement("code", null, "title"),
                                " attribute, ",
                                React.createElement("code", null, "color"),
                                " and ",
                                React.createElement("code", null, "background-color"),
                                "of the span element. All other format styles will be copied.")))),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Modules:")),
                React.createElement("p", null, "The Format Painter feature is segregated as an individual module. To use the format painter you can import and then inject it into the RichTextEditor."),
                React.createElement("p", null,
                    "To use Rich Text Editor feature, we need to inject  ",
                    React.createElement("code", null, "'FormatPainter'"),
                    " module using inject component and then adding the modules in the services prop.",
                    React.createElement("code", null, "[HtmlEditor, Toolbar, FormatPainter, QuickToolbar, Image, Link, Table, PasteCleanup]")))));
    };
    return FormatPainterRTE;
}(sample_base_1.SampleBase));
exports.FormatPainterRTE = FormatPainterRTE;
;
