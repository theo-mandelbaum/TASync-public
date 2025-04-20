ej.base.enableRipple(window.ripple)
/*jshint esversion: 6 */
/**
 * Rich Text Editor insert emoticons sample
 */

    var emojiPickerRTE = new ej.richtexteditor.RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList',
                'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'EmojiPicker',
                '|', 'Undo', 'Redo'
            ]
        },
    });
    emojiPickerRTE.appendTo('#emojiPickerRTE');
      