"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor insert emoticons sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./insert-emoticons.css");
function InsertEmoticons() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    var rteSectionEle = null;
    var rteSectionRef = function (element) {
        rteSectionEle = element;
    };
    // Rich Text Editor items list
    var items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'EmojiPicker', '|', 'Undo', 'Redo'
    ];
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section e-rte-custom-tbar-section', id: "rteCustomTool" },
            React.createElement("div", { className: 'rte-control-section', ref: rteSectionRef, id: 'rteSection' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "EmotionIconstRTE", ref: function (scope) { rteObj = scope; }, toolbarSettings: toolbarSettings },
                    React.createElement("div", { style: { display: 'block;' } },
                        React.createElement("p", { style: { marginRight: '10px' } }, "An emoji picker in a Rich Text Editor is a tool that allows users to easily add emojis or emoticons to their text. Typically, it is a small window or panel that displays a variety of emojis, arranged in different categories, such as smileys, animals, food, and so on. Users can select the desired emoji by clicking on it or by typing its name in a search bar. ")),
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.EmojiPicker, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, " This sample demonstrates how to insert an emoji into the content of a Rich Text Editor. First, click the emoji button in the toolbar. This will open the emoji picker popup. Next, click on the desired emoji in the picker to insert it into the editor.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("b", null, "Emoji Picker"),
                " feature allows you to insert an emoji into an editor. The emoji picker has a grid of emojis grouped by categories, such as smileys, animals, food, and travel. You are able to scroll through the emojis and click on one to insert it into the editor."),
            React.createElement("p", null,
                "In this demo, to enable this feature, configure the ",
                React.createElement("b", null, "EmojiPicker"),
                " command in the ",
                React.createElement("a", { target: '_blank', href: 'https://helpej2.syncfusion.com/react/documentation/api/rich-text-editor/toolbarSettingsModel/#items' }, "toolbarSettings.items"),
                " property."),
            React.createElement("p", null, "You can also insert an emoji by pressing the colon (:) which will open the emoji picker. Choose an emoji from the picker and insert it into the editor. The feature also provides the option to filter emojis based on the typing character."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "The above features built as modules have to be included in your application. For example, to use image and link, we need to inject ",
                React.createElement("code", null, "HtmlEditor, Toolbar, Link, Image, QuickToolbar, EmojiPicker, PasteCleanup"),
                "."))));
}
exports.default = InsertEmoticons;
