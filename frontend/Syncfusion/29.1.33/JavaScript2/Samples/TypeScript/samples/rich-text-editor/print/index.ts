import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * Rich Text Editor print sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio} from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio);


    
    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',
                'OrderedList',  'UnorderedList',  '|',  'CreateLink',  'Image',  '|',  'SourceCode',  'Undo',  'Redo', 'Print']
        }
    });
    defaultRTE.appendTo('#defaultRTE');


