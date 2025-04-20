"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor default sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./rich-text-editor.css");
function Default() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rte" },
            React.createElement("div", { className: 'rte-control-section' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "defaultRTE", ref: function (richtexteditor) { rteObj = richtexteditor; } },
                    React.createElement("h2", null, "Welcome to the Rich Text Editor Demo!"),
                    React.createElement("p", null, "The Rich Text Editor control is a WYSIWYG (\"what you see is what you get\") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands."),
                    React.createElement("h4", null, "Flexible Editing!"),
                    React.createElement("p", null,
                        "For a better editing experience, the Angular Rich Text Editor component offers a variety of tools and choices. So, you can quickly insert ",
                        React.createElement("strong", null, "images"),
                        ", ",
                        React.createElement("strong", null, "videos"),
                        ", ",
                        React.createElement("strong", null, "hyperlinks"),
                        ", and ",
                        React.createElement("strong", null, "tables"),
                        "; ",
                        React.createElement("strong", null, "merge table cells"),
                        "; and configure."),
                    React.createElement("p", null,
                        "You can easily format the text and paragraphs by setting the editor\u2019s foreground and ",
                        React.createElement("strong", null, "background colors"),
                        ", ",
                        React.createElement("strong", null, "font type"),
                        ", ",
                        React.createElement("strong", null, "italicization"),
                        ", ",
                        React.createElement("strong", null, "adding ordered "),
                        "and ",
                        React.createElement("strong", null, "unordered custom lists"),
                        ", ",
                        React.createElement("strong", null, "underlining"),
                        ", ",
                        React.createElement("strong", null, "strikethrough"),
                        ", and ",
                        React.createElement("strong", null, "bolding"),
                        ".",
                        React.createElement("br", null),
                        React.createElement("br", null)),
                    React.createElement("p", null,
                        React.createElement("img", { alt: "Editor Features Overview", src: "https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png", width: "400", height: "200", className: "e-img-left" })),
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio, ej2_react_richtexteditor_1.PasteCleanup] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default rendering of the Rich Text Editor with minimum configuration.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Rich Text Editor is WYSIWYG (\"what you see is what you get\") editor that is used to create and edit content, and return valid HTML markup. The editor provides a standard toolbar to format content using its commands. The toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo the operation, HTML view, and more."))));
}
exports.default = Default;
