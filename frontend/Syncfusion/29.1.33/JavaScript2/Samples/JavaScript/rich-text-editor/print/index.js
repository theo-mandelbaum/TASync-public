ej.base.enableRipple(window.ripple)
/*jshint esversion: 6 */
/**
 * Rich Text Editor print sample
 */

    var defaultRTE = new ej.richtexteditor.RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',
                'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo', 'Print']
        }
    });
    defaultRTE.appendTo('#defaultRTE');

