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
exports.Inline = void 0;
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
require("./inline.css");
var Inline = /** @class */ (function (_super) {
    __extends(Inline, _super);
    function Inline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inlineMode = {
            enable: true,
            onSelection: true
        };
        _this.format = {
            width: 'auto'
        };
        _this.fontFamily = {
            width: 'auto'
        };
        // Rich Text Editor items list
        _this.items = ['Bold', 'Italic', 'Underline',
            'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
            'CreateLink'];
        //Rich Text Editor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    Inline.prototype.change = function (args) {
        this.rteObj.inlineMode.onSelection = args.checked;
    };
    Inline.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: 'rteInline' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "inlineRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, inlineMode: this.inlineMode, toolbarSettings: this.toolbarSettings, format: this.format, fontFamily: this.fontFamily },
                            React.createElement("h2", null, "Inline Rich Text Editor!"),
                            React.createElement("p", null, "Click on this text to edit dynamically. The formatting toolbar will appear only when you select the content."),
                            React.createElement("h5", null, "Features:"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Minimal UI:"),
                                    " The editor is clean and distraction-free."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Contextual Toolbar:"),
                                    " The toolbar appears only when text is selected."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Rich Formatting:"),
                                    " Supports bold, italic, underline, lists, links, and more."),
                                React.createElement("li", null,
                                    React.createElement("strong", null, "Seamless Editing:"),
                                    " Works like a native text field but with powerful styling options.")),
                            React.createElement("blockquote", null,
                                React.createElement("p", null, "Try selecting this text to see the toolbar in action!")),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Show on Selection', ref: function (scope) { _this.checkboxObj = scope; }, change: this.change.bind(this) }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the toolbar show on inline mode. Toolbar show while selection on the below editable content and it hide on focus out from edit area.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Rich Text Editor provides an option to display toolbar on demand using mode property. Set mode as inline to enable inline editor. The toolbar becomes visible only when the content is selected"),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                    React.createElement("code", null, "Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup"),
                    " modules into the services."))));
    };
    return Inline;
}(sample_base_1.SampleBase));
exports.Inline = Inline;
