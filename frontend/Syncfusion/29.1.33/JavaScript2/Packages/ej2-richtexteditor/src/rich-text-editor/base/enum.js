/**
 * Defines types of Render
 *
 * @hidden
 * @deprecated
 */
export var RenderType;
(function (RenderType) {
    /* eslint-disable */
    /** Defines RenderType as Toolbar */
    RenderType[RenderType["Toolbar"] = 0] = "Toolbar";
    /** Defines RenderType as Content */
    RenderType[RenderType["Content"] = 1] = "Content";
    /** Defines RenderType as Popup */
    RenderType[RenderType["Popup"] = 2] = "Popup";
    /** Defines RenderType as LinkToolbar */
    RenderType[RenderType["LinkToolbar"] = 3] = "LinkToolbar";
    /** Defines RenderType as TextToolbar */
    RenderType[RenderType["TextToolbar"] = 4] = "TextToolbar";
    /** Defines RenderType as ImageToolbar */
    RenderType[RenderType["ImageToolbar"] = 5] = "ImageToolbar";
    /** Defines RenderType as AudioToolbar */
    RenderType[RenderType["AudioToolbar"] = 6] = "AudioToolbar";
    /** Defines RenderType as AudioToolbar */
    RenderType[RenderType["VideoToolbar"] = 7] = "VideoToolbar";
    /** Defines RenderType as InlineToolbar */
    RenderType[RenderType["InlineToolbar"] = 8] = "InlineToolbar";
    /** Defines RenderType as TableToolbar */
    RenderType[RenderType["TableToolbar"] = 9] = "TableToolbar";
    /* eslint-enable */
})(RenderType || (RenderType = {}));
/**
 * Enumerates the types of toolbars available.
 */
export var ToolbarType;
(function (ToolbarType) {
    /* eslint-disable */
    /** Defines ToolbarType as Expand. */
    ToolbarType["Expand"] = "Expand";
    /** Defines ToolbarType as MultiRow. */
    ToolbarType["MultiRow"] = "MultiRow";
    /** Defines ToolbarType as Scrollable. */
    ToolbarType["Scrollable"] = "Scrollable";
    /* eslint-enable */
})(ToolbarType || (ToolbarType = {}));
/**
 * Enumerates the types of dialogs that can be opened or closed in the Rich Text Editor.
 */
export var DialogType;
(function (DialogType) {
    /* eslint-disable */
    /** Defines DialogType for inserting a link. */
    DialogType["InsertLink"] = "InsertLink";
    /** Defines DialogType for inserting an image. */
    DialogType["InsertImage"] = "InsertImage";
    /** Defines DialogType for inserting audio. */
    DialogType["InsertAudio"] = "InsertAudio";
    /** Defines DialogType for inserting video. */
    DialogType["InsertVideo"] = "InsertVideo";
    /** Defines DialogType for inserting a table. */
    DialogType["InsertTable"] = "InsertTable";
    /* eslint-enable */
})(DialogType || (DialogType = {}));
/**
 * Enumerates the sources for images to be inserted.
 */
export var ImageInputSource;
(function (ImageInputSource) {
    /** Defines ImageInputSource as Uploaded. */
    ImageInputSource["Uploaded"] = "Uploaded";
    /** Defines ImageInputSource as Dropped. */
    ImageInputSource["Dropped"] = "Dropped";
    /** Defines ImageInputSource as Pasted. */
    ImageInputSource["Pasted"] = "Pasted";
})(ImageInputSource || (ImageInputSource = {}));
