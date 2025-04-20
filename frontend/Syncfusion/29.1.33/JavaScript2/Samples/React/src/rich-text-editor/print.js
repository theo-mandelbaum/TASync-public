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
exports.Print = void 0;
/**
 * Rich Text Editor print sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./print.css");
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Rich Text Editor items list
        _this.items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo', 'Print'];
        //Rich Text Editor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    Print.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rtePrint" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "print", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, toolbarSettings: this.toolbarSettings },
                        React.createElement("h2", null, "The Greatest Lessons from Nature"),
                        React.createElement("p", null, "Nature is a powerful teacher, offering timeless wisdom through its beauty, resilience, and harmony. Here are three of the most important lessons we can learn from nature:"),
                        React.createElement("p", null,
                            React.createElement("strong", null, "Adaptability & Resilience"),
                            " \uD83C\uDF3F",
                            React.createElement("br", null)),
                        React.createElement("p", null, "Nature is constantly changing and evolving. Trees withstand storms, rivers carve through rocks, and animals adapt to new environments. Similarly, life challenges us, and, like nature, we must be flexible and resilient in order to overcome obstacles."),
                        React.createElement("p", null,
                            React.createElement("strong", null, "Patience & Growth"),
                            " \uD83C\uDF31"),
                        React.createElement("p", null, "A seed does not become a tree overnight. Growth takes time, whether in nature or in our personal and professional lives. Success, wisdom, and strength develop through persistence, effort, and patience."),
                        React.createElement("p", null,
                            React.createElement("strong", null, "Balance & Harmony"),
                            " \uD83C\uDF0E"),
                        React.createElement("p", null, "Nature maintains a delicate balance throughout the day and night, across the seasons, and within ecosystems. It teaches us the importance of balance in our own lives between work and rest, giving and receiving, and action and reflection."),
                        React.createElement("p", null,
                            React.createElement("br", null)),
                        React.createElement("p", { style: { textAlign: 'center' } },
                            React.createElement("em", null,
                                "\u201CLook deep into nature, and then you will understand everything better.\u201D ",
                                React.createElement("strong", null, "\u2013 Albert Einstein"))),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to print the content of the Rich Text Editor. Click the print command which placed in toolbar of RTE to print the editor\u2019s content."))));
    };
    return Print;
}(sample_base_1.SampleBase));
exports.Print = Print;
