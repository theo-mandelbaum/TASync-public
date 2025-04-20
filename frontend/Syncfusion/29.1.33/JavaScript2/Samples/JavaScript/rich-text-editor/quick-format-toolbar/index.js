ej.base.enableRipple(window.ripple)
/*jshint esversion: 6 */
/**
 * Rich Text Editor text quick toolbar sample
 */

    var defaultRTE = new ej.richtexteditor.RichTextEditor({
        quickToolbarSettings: {
            text: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor', 'Alignments', '-', 'FontSize', 'FontName', 'Formats', 'OrderedList', 'UnorderedList', 'FormatPainter']
        },
        toolbarSettings: {
            type: 'MultiRow',
            enableFloating: false,
        },
    });
    defaultRTE.appendTo("#quickRTE");

