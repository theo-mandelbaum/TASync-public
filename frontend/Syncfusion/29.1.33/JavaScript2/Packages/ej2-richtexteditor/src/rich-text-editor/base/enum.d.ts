/**
 * Defines types of Render
 *
 * @hidden
 * @deprecated
 */
export declare enum RenderType {
    /** Defines RenderType as Toolbar */
    Toolbar = 0,
    /** Defines RenderType as Content */
    Content = 1,
    /** Defines RenderType as Popup */
    Popup = 2,
    /** Defines RenderType as LinkToolbar */
    LinkToolbar = 3,
    /** Defines RenderType as TextToolbar */
    TextToolbar = 4,
    /** Defines RenderType as ImageToolbar */
    ImageToolbar = 5,
    /** Defines RenderType as AudioToolbar */
    AudioToolbar = 6,
    /** Defines RenderType as AudioToolbar */
    VideoToolbar = 7,
    /** Defines RenderType as InlineToolbar */
    InlineToolbar = 8,
    /** Defines RenderType as TableToolbar */
    TableToolbar = 9
}
/**
 * Defines the types of actions to perform on a quick toolbar scroll.
 */
export declare type ActionOnScroll = 'hide' | 'none';
/**
 * Enumerates the types of toolbars available.
 */
export declare enum ToolbarType {
    /** Defines ToolbarType as Expand. */
    Expand = "Expand",
    /** Defines ToolbarType as MultiRow. */
    MultiRow = "MultiRow",
    /** Defines ToolbarType as Scrollable. */
    Scrollable = "Scrollable"
}
/**
 * Enumerates the types of dialogs that can be opened or closed in the Rich Text Editor.
 */
export declare enum DialogType {
    /** Defines DialogType for inserting a link. */
    InsertLink = "InsertLink",
    /** Defines DialogType for inserting an image. */
    InsertImage = "InsertImage",
    /** Defines DialogType for inserting audio. */
    InsertAudio = "InsertAudio",
    /** Defines DialogType for inserting video. */
    InsertVideo = "InsertVideo",
    /** Defines DialogType for inserting a table. */
    InsertTable = "InsertTable"
}
/**
 * Specifies the types of items that can be used in the toolbar.
 */
export declare type ToolbarItems = 'alignments' | 'justifyLeft' | 'justifyCenter' | 'justifyRight' | 'justifyFull' | 'fontName' | 'fontSize' | 'fontColor' | 'backgroundColor' | 'bold' | 'italic' | 'underline' | 'strikeThrough' | 'clearFormat' | 'clearAll' | 'cut' | 'copy' | 'paste' | 'unorderedList' | 'orderedList' | 'indent' | 'outdent' | 'undo' | 'redo' | 'superScript' | 'subScript' | 'createLink' | 'openLink' | 'editLink' | 'image' | 'createTable' | 'removeTable' | 'replace' | 'align' | 'caption' | 'remove' | 'openImageLink' | 'editImageLink' | 'removeImageLink' | 'insertLink' | 'display' | 'altText' | 'dimension' | 'fullScreen' | 'maximize' | 'minimize' | 'lowerCase' | 'upperCase' | 'print' | 'formats' | 'sourceCode' | 'preview' | 'viewSide' | 'insertCode' | 'blockquote' | 'tableHeader' | 'tableRemove' | 'tableRows' | 'tableColumns' | 'tableCellBackground' | 'tableCellHorizontalAlign' | 'tableCellVerticalAlign' | 'tableEditProperties' | 'styles' | 'removeLink' | 'merge' | 'inlineCode';
/**
 * Specifies the configuration items available for the toolbar settings.
 */
export declare type ToolbarConfigItems = 'Alignments' | 'JustifyLeft' | 'JustifyCenter' | 'JustifyRight' | 'JustifyFull' | 'FontName' | 'FontSize' | 'FontColor' | 'BackgroundColor' | 'ImportWord' | 'ExportWord' | 'ExportPdf' | 'Bold' | 'Italic' | 'Underline' | 'StrikeThrough' | 'ClearFormat' | 'ClearAll' | 'Cut' | 'Copy' | 'Paste' | 'UnorderedList' | 'OrderedList' | 'Indent' | 'Outdent' | 'Undo' | 'Redo' | 'SuperScript' | 'SubScript' | 'CreateLink' | 'Image' | 'CreateTable' | 'InsertLink' | 'FullScreen' | 'LowerCase' | 'UpperCase' | 'Print' | 'Formats' | 'FormatPainter' | 'EmojiPicker' | 'UnderLine' | 'ZoomOut' | 'ZoomIn' | 'SourceCode' | 'Preview' | 'ViewSide' | 'InsertCode' | 'Blockquote' | 'Audio' | 'Video' | 'NumberFormatList' | 'BulletFormatList' | 'FileManager' | '|' | '-' | 'InlineCode';
/**
 * Enumerates the sources for images to be inserted.
 */
export declare enum ImageInputSource {
    /** Defines ImageInputSource as Uploaded. */
    Uploaded = "Uploaded",
    /** Defines ImageInputSource as Dropped. */
    Dropped = "Dropped",
    /** Defines ImageInputSource as Pasted. */
    Pasted = "Pasted"
}
/**
 * Lists the items available in the slash menu.
 */
export declare type SlashMenuItems = 'Heading 1' | 'Heading 2' | 'Heading 3' | 'Heading 4' | 'Paragraph' | 'Blockquote' | 'OrderedList' | 'UnorderedList' | 'Table' | 'Image' | 'Audio' | 'Video' | 'CodeBlock' | 'Emojipicker' | 'Link';
