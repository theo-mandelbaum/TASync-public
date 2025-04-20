"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor Smart Suggestion sample
 */
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
function SmartSuggestion() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var formatRTE;
    var meetingNotes = '<p><strong>Meeting Notes</strong></p><table class="e-rte-table" style="width: 100%; min-width: 0px; height: 150px;"> <tbody> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Attendees</strong></td> <td style="width: 50%;" class=""><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Date &amp; Time</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Agenda</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Discussed Items</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Action Items</strong></td> <td style="width: 50%;"><br></td> </tr> </tbody> </table>';
    var signature = '<p><br></p><p>Warm regards,</p><p>John Doe<br>Event Coordinator<br>ABC Company</p>';
    var toolbarSettings = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
            '|', 'EmojiPicker', '|',
            'SourceCode', '|', 'Undo', 'Redo']
    };
    var slashMenuSettings = {
        enable: true,
        items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList',
            'CodeBlock', 'Blockquote', 'Link', 'Image', 'Video', 'Audio', 'Table', 'Emojipicker',
            {
                text: 'Meeting notes',
                description: 'Insert a meeting note template.',
                iconCss: 'e-icons e-description',
                type: 'Custom',
                command: 'MeetingNotes'
            },
            {
                text: 'Signature',
                description: 'Insert a signature template.',
                iconCss: 'e-icons e-signature',
                type: 'Custom',
                command: 'Signature'
            }]
    };
    function slashMenuItemSelect(args) {
        if (args.itemData.command === 'MeetingNotes') {
            formatRTE.executeCommand('insertHTML', meetingNotes, { undo: true });
        }
        if (args.itemData.command === 'Signature') {
            formatRTE.executeCommand('insertHTML', signature, { undo: true });
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "mentionFormat" },
            React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "MentionInlineFormat", ref: function (scope) { formatRTE = scope; }, toolbarSettings: toolbarSettings, placeholder: "Type '/' and choose format", slashMenuSettings: slashMenuSettings, slashMenuItemSelect: slashMenuItemSelect.bind(this) },
                React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Audio, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.EmojiPicker, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.FormatPainter, ej2_react_richtexteditor_1.SlashMenu] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates how to use the slash menu feature of the Rich Text Editor to apply formats, open dialogs easily.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample demonstrates the ",
                React.createElement("code", null, "SlashMenu"),
                " feature of the Rich Text Editor, which allows users to apply formatting such as headings, lists, quotes, open insert dialogs, and execute custom commands within the editor. The slash menu can be triggered by typing the \"/\" character in the editor."),
            React.createElement("p", null,
                "In this example, the slash menu is enabled by setting the ",
                React.createElement("code", null, "enable"),
                " property within the",
                React.createElement("code", null, "slashMenuSettings"),
                " to ",
                React.createElement("code", null, "true"),
                "."),
            React.createElement("p", null,
                "This example includes two ",
                React.createElement("b", null, "Custom Slash menu items"),
                " that allow you to easily insert meeting notes and a signature into the content."),
            React.createElement("p", null, "The slash menu is configured with the following properties:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("p", null,
                        React.createElement("code", null, "enable"),
                        ": Enables or disables the slash menu in the editor. The default value is",
                        React.createElement("code", null, "false"),
                        ".")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        React.createElement("code", null, "items"),
                        ": Defines the items displayed in the slash menu popup. Custom items can also be added, and their actions can be handled using the ",
                        React.createElement("code", null, "slashMenuItemSelect"),
                        " event."))),
            React.createElement("p", null,
                React.createElement("b", null, "Adding Custom Slash Menu Items")),
            React.createElement("p", null,
                "The custom items can be added to the slash menu by defining the ",
                React.createElement("code", null, "items"),
                " child property within",
                React.createElement("code", null, "slashMenuSettings"),
                ". The ",
                React.createElement("code", null, "items"),
                " property accepts a string of items and also an array of objects, where each object represents a custom slash menu item. These objects can include the following properties:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "text"),
                    " - Sets the text displayed for the slash menu item."),
                React.createElement("li", null,
                    React.createElement("code", null, "command"),
                    " - Specifies the action to be executed when the slash menu item is clicked."),
                React.createElement("li", null,
                    React.createElement("code", null, "type"),
                    " - Groups related items within the slash menu."),
                React.createElement("li", null,
                    React.createElement("code", null, "iconCss"),
                    " - Sets the CSS class for the icon associated with the item."),
                React.createElement("li", null,
                    React.createElement("code", null, "description"),
                    " - Provides a description for the slash menu item.")),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                React.createElement("code", null, "HtmlEditor, Toolbar, Image, Audio, Table, Video, Link, QuickToolbar, EmojiPicker, PasteCleanup, FormatPainter, SlashMenu "),
                " modules into the services."))));
}
exports.default = SmartSuggestion;
