"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor Resizable sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./resize-editor.css");
function ResizableEditor() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var resize = true;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section resize-rte', id: "rte" },
            React.createElement("div", { className: 'rte-control-section' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "resizeRTE", enableResize: resize, height: '250px' },
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
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Resize, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the resize operation of the Rich Text Editor control. To resize the Rich Text Editor, select and resize the editor using its handle (grip) at the bottom right corner of the content panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Users can create resizable Rich Text Editor by setting the ",
                React.createElement("code", null, "enableResize"),
                " property to true, which is used to change the size of the Rich Text Editor dynamically."))));
}
exports.default = ResizableEditor;
