/**
 * Enum for comment status of the annotation
 */
export var CommentStatus;
(function (CommentStatus) {
    CommentStatus[CommentStatus["None"] = 1] = "None";
    CommentStatus[CommentStatus["Accepted"] = 2] = "Accepted";
    CommentStatus[CommentStatus["Canceled"] = 3] = "Canceled";
    CommentStatus[CommentStatus["Completed"] = 4] = "Completed";
    CommentStatus[CommentStatus["Rejected"] = 5] = "Rejected";
})(CommentStatus || (CommentStatus = {}));
/**
 * Enum for font styles
 */
export var FontStyle;
(function (FontStyle) {
    FontStyle[FontStyle["None"] = 0] = "None";
    FontStyle[FontStyle["Bold"] = 1] = "Bold";
    FontStyle[FontStyle["Italic"] = 2] = "Italic";
    FontStyle[FontStyle["Underline"] = 4] = "Underline";
    FontStyle[FontStyle["Strikethrough"] = 8] = "Strikethrough";
})(FontStyle || (FontStyle = {}));
/**
 * Enum for context menu items
 */
export var ContextMenuItem;
(function (ContextMenuItem) {
    ContextMenuItem[ContextMenuItem["Copy"] = 0] = "Copy";
    ContextMenuItem[ContextMenuItem["Highlight"] = 1] = "Highlight";
    ContextMenuItem[ContextMenuItem["Cut"] = 2] = "Cut";
    ContextMenuItem[ContextMenuItem["Underline"] = 4] = "Underline";
    ContextMenuItem[ContextMenuItem["Paste"] = 8] = "Paste";
    ContextMenuItem[ContextMenuItem["Delete"] = 16] = "Delete";
    ContextMenuItem[ContextMenuItem["ScaleRatio"] = 32] = "ScaleRatio";
    ContextMenuItem[ContextMenuItem["Strikethrough"] = 64] = "Strikethrough";
    ContextMenuItem[ContextMenuItem["Properties"] = 128] = "Properties";
    ContextMenuItem[ContextMenuItem["Comment"] = 256] = "Comment";
})(ContextMenuItem || (ContextMenuItem = {}));
/**
 * Enum for signature type
 */
export var SignatureType;
(function (SignatureType) {
    SignatureType["Draw"] = "Draw";
    SignatureType["Type"] = "Type";
    SignatureType["Image"] = "Image";
})(SignatureType || (SignatureType = {}));
/**
 * Enum for annotation resizer location
 */
export var AnnotationResizerLocation;
(function (AnnotationResizerLocation) {
    AnnotationResizerLocation[AnnotationResizerLocation["Corners"] = 1] = "Corners";
    AnnotationResizerLocation[AnnotationResizerLocation["Edges"] = 2] = "Edges";
})(AnnotationResizerLocation || (AnnotationResizerLocation = {}));
/**
 * Specifies the type of text extraction result to be returned.
 * This enum is used to customize the output of text extraction methods and events,
 * allowing developers to choose whether to retrieve plain text, text with layout information (bounds),
 * or both. It also includes an option for cases where no text information is applicable.
 */
export var ExtractTextOption;
(function (ExtractTextOption) {
    /**
     * Indicates that no text information is returned.
     * This option is not applicable for the ExtractText method and is only used
     * in the extractTextCompleted event when no text data is available.
     * Use this option when text extraction is not relevant or supported for the given context.
     */
    ExtractTextOption["None"] = "None";
    /**
     * Indicates that only plain text is extracted and returned.
     * This option does not include any additional bounds  information.
     * Use this option when only the textual content is needed, without any positional or layout details.
     */
    ExtractTextOption["TextOnly"] = "TextOnly";
    /**
     * Indicates that text is returned along with layout information, such as bounds or coordinates.
     * This option does not include plain text and is useful when only positional data is required.
     * Use this option when you need to know the location or layout of the extracted text but not the text itself.
     */
    ExtractTextOption["BoundsOnly"] = "BoundsOnly";
    /**
     * Indicates that both plain text and text with bounds (layout information) are returned.
     * This is the default behavior, providing both the extracted text and its positional data.
     * Use this option when you need both the textual content and its layout information for further processing or analysis.
     */
    ExtractTextOption["TextAndBounds"] = "TextAndBounds";
})(ExtractTextOption || (ExtractTextOption = {}));
/**
 * Enum for displaying the signature dialog
 */
export var DisplayMode;
(function (DisplayMode) {
    /** Draw - Display only the draw option in the signature dialog. */
    DisplayMode[DisplayMode["Draw"] = 1] = "Draw";
    /** Text - Display only the type option in the signature dialog. */
    DisplayMode[DisplayMode["Text"] = 2] = "Text";
    /** Upload - Display only the upload option in the signature dialog. */
    DisplayMode[DisplayMode["Upload"] = 4] = "Upload";
})(DisplayMode || (DisplayMode = {}));
/**
 * Enum for cursor type
 */
export var CursorType;
(function (CursorType) {
    CursorType["auto"] = "auto";
    CursorType["crossHair"] = "crosshair";
    // eslint-disable-next-line
    CursorType["e_resize"] = "e-resize";
    // eslint-disable-next-line
    CursorType["ew_resize"] = "ew-resize";
    CursorType["grab"] = "grab";
    CursorType["grabbing"] = "grabbing";
    CursorType["move"] = "move";
    // eslint-disable-next-line
    CursorType["n_resize"] = "n-resize";
    // eslint-disable-next-line
    CursorType["ne_resize"] = "ne-resize";
    // eslint-disable-next-line
    CursorType["ns_resize"] = "ns-resize";
    // eslint-disable-next-line
    CursorType["nw_resize"] = "nw-resize";
    CursorType["pointer"] = "pointer";
    // eslint-disable-next-line
    CursorType["s_resize"] = "s-resize";
    // eslint-disable-next-line
    CursorType["se_resize"] = "se-resize";
    // eslint-disable-next-line
    CursorType["sw_resize"] = "sw-resize";
    CursorType["text"] = "text";
    // eslint-disable-next-line
    CursorType["w_resize"] = "w-resize";
})(CursorType || (CursorType = {}));
/**
 * Enum type for Dynamic Stamp Items
 */
export var DynamicStampItem;
(function (DynamicStampItem) {
    DynamicStampItem["Revised"] = "Revised";
    DynamicStampItem["Reviewed"] = "Reviewed";
    DynamicStampItem["Received"] = "Received";
    DynamicStampItem["Approved"] = "Approved";
    DynamicStampItem["Confidential"] = "Confidential";
    DynamicStampItem["NotApproved"] = "NotApproved";
})(DynamicStampItem || (DynamicStampItem = {}));
/**
 * Enum type for Sign Stamp Items
 */
export var SignStampItem;
(function (SignStampItem) {
    SignStampItem["Witness"] = "Witness";
    SignStampItem["InitialHere"] = "InitialHere";
    SignStampItem["SignHere"] = "SignHere";
    SignStampItem["Accepted"] = "Accepted";
    SignStampItem["Rejected"] = "Rejected";
})(SignStampItem || (SignStampItem = {}));
/**
 * Enum type for Standard Business Stamp Items
 */
export var StandardBusinessStampItem;
(function (StandardBusinessStampItem) {
    StandardBusinessStampItem["Approved"] = "Approved";
    StandardBusinessStampItem["NotApproved"] = "NotApproved";
    StandardBusinessStampItem["Draft"] = "Draft";
    StandardBusinessStampItem["Final"] = "Final";
    StandardBusinessStampItem["Completed"] = "Completed";
    StandardBusinessStampItem["Confidential"] = "Confidential";
    StandardBusinessStampItem["ForPublicRelease"] = "ForPublicRelease";
    StandardBusinessStampItem["NotForPublicRelease"] = "NotForPublicRelease";
    StandardBusinessStampItem["ForComment"] = "ForComment";
    StandardBusinessStampItem["Void"] = "Void";
    StandardBusinessStampItem["PreliminaryResults"] = "PreliminaryResults";
    StandardBusinessStampItem["InformationOnly"] = "InformationOnly";
})(StandardBusinessStampItem || (StandardBusinessStampItem = {}));
/**
 * Enum type for allowed interactions for locked annotations
 */
export var AllowedInteraction;
(function (AllowedInteraction) {
    AllowedInteraction["Select"] = "Select";
    AllowedInteraction["Move"] = "Move";
    AllowedInteraction["Resize"] = "Resize";
    AllowedInteraction["Delete"] = "Delete";
    AllowedInteraction["None"] = "None";
    AllowedInteraction["PropertyChange"] = "PropertyChange";
})(AllowedInteraction || (AllowedInteraction = {}));
/**
 * Enum type for export annotation file types
 */
export var AnnotationDataFormat;
(function (AnnotationDataFormat) {
    AnnotationDataFormat["Json"] = "Json";
    AnnotationDataFormat["Xfdf"] = "Xfdf";
})(AnnotationDataFormat || (AnnotationDataFormat = {}));
/**
 * Represents the format type of form data.
 */
export var FormFieldDataFormat;
(function (FormFieldDataFormat) {
    FormFieldDataFormat["Xml"] = "Xml";
    FormFieldDataFormat["Fdf"] = "Fdf";
    FormFieldDataFormat["Xfdf"] = "Xfdf";
    FormFieldDataFormat["Json"] = "Json";
})(FormFieldDataFormat || (FormFieldDataFormat = {}));
/**
 * Specifies a combination of key modifiers, on recognition of which the command will be executed.They are
 * None - no modifiers are pressed
 * Control - ctrl key
 * Meta - meta key im mac
 * Alt - alt key
 * Shift - shift key
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export var ModifierKeys;
(function (ModifierKeys) {
    /** Specifies when no modifiers are pressed. */
    ModifierKeys[ModifierKeys["None"] = 0] = "None";
    /** Specifies the Ctrl key as a key modifier. */
    ModifierKeys[ModifierKeys["Control"] = 1] = "Control";
    /** Specifies the meta key in Mac. */
    ModifierKeys[ModifierKeys["Meta"] = 1] = "Meta";
    /** Specifies the alt key as a key modifier. */
    ModifierKeys[ModifierKeys["Alt"] = 2] = "Alt";
    /** Specifies the shift key as a key modifier. */
    ModifierKeys[ModifierKeys["Shift"] = 4] = "Shift";
})(ModifierKeys || (ModifierKeys = {}));
/**
 * Defines a collection of keys commonly used in Pdf-related operations. They are
 * none - no key
 * N0 = The 0 key
 * N1 = The 1 key
 * N2 = The 2 key
 * N3 = The 3 key
 * N4 = The 4 key
 * N5 = The 5 key
 * N6 = The 6 key
 * N7 = The 7 key
 * N8 = The 8 key
 * * N9 = The 9 key
 * * Number0 = The 0 in number pad key
 * * Number1 = The 1 in number pad key
 * * Number2 = The 2 in number pad key
 * * Number3 = The 3 in number pad key
 * * Number4 = The 4 in number pad key
 * * Number5 = The 5 in number pad key
 * * Number6 = The 6 in number pad key
 * * Number7 = The 7 in number pad key
 * * Number8 = The 8 in number pad key
 * * Number9 = The 9 in number pad key
 * * BackSpace = The BackSpace key
 * * F1 = The f1 key
 * * F2 = The f2 key
 * * F3 = The f3 key
 * * F4 = The f4 key
 * * F5 = The f5 key
 * * F6 = The f6 key
 * * F7 = The f7 key
 * * F8 = The f8 key
 * * F9 = The f9 key
 * * F10 = The f10 key
 * * F11 = The f11 key
 * * F12 = The f12 key
 * * A = The a key
 * * B = The b key
 * * C = The c key
 * * D = The d key
 * * E = The e key
 * * F = The f key
 * * G = The g key
 * * H = The h key
 * * I = The i key
 * * J = The j key
 * * K = The k key
 * * L = The l key
 * * M = The m key
 * * N = The n key
 * * O = The o key
 * * P = The p key
 * * Q = The q key
 * * R = The r key
 * * S = The s key
 * * T = The t key
 * * U = The u key
 * * V = The v key
 * * W = The w key
 * * X = The x key
 * * Y = The y key
 * * Z = The z key
 * * Left = The left key
 * * Right = The right key
 * * Top = The top key
 * * Bottom = The bottom key
 * * Escape = The Escape key
 * * Tab = The tab key
 * * Delete = The delete key
 * * Enter = The enter key
 * * The Space key
 * * The page up key
 * * The page down key
 * * The end key
 * * The home key
 * * The Minus key
 * * The Plus key
 * * The Star key
 * * The Open Square Bracket key
 * * The close Square Bracket key
 *
 * @aspNumberEnum
 * @IgnoreSingular
 */
export var PdfKeys;
(function (PdfKeys) {
    /** No key pressed */
    PdfKeys[PdfKeys["None"] = null] = "None";
    /** The 0 key */
    PdfKeys[PdfKeys["N0"] = 48] = "N0";
    /** The 1 key */
    PdfKeys[PdfKeys["N1"] = 49] = "N1";
    /** The 2 key */
    PdfKeys[PdfKeys["N2"] = 50] = "N2";
    /** The 3 key */
    PdfKeys[PdfKeys["N3"] = 51] = "N3";
    /** The 4 key */
    PdfKeys[PdfKeys["N4"] = 52] = "N4";
    /** The 5 key */
    PdfKeys[PdfKeys["N5"] = 53] = "N5";
    /** The 6 key */
    PdfKeys[PdfKeys["N6"] = 54] = "N6";
    /** The 7 key */
    PdfKeys[PdfKeys["N7"] = 55] = "N7";
    /** The 8 key */
    PdfKeys[PdfKeys["N8"] = 56] = "N8";
    /** The 9 key */
    PdfKeys[PdfKeys["N9"] = 57] = "N9";
    /** The 0 in number pad key */
    PdfKeys[PdfKeys["Number0"] = 96] = "Number0";
    /** The 1 in number pad key */
    PdfKeys[PdfKeys["Number1"] = 97] = "Number1";
    /** The 2 in number pad key */
    PdfKeys[PdfKeys["Number2"] = 98] = "Number2";
    /** The 3 in number pad key */
    PdfKeys[PdfKeys["Number3"] = 99] = "Number3";
    /** The 4 in number pad key */
    PdfKeys[PdfKeys["Number4"] = 100] = "Number4";
    /** The 5 in number pad key */
    PdfKeys[PdfKeys["Number5"] = 101] = "Number5";
    /** The 6 in number pad key */
    PdfKeys[PdfKeys["Number6"] = 102] = "Number6";
    /** The 7 in number pad key */
    PdfKeys[PdfKeys["Number7"] = 103] = "Number7";
    /** The 8 in number pad key */
    PdfKeys[PdfKeys["Number8"] = 104] = "Number8";
    /** The 9 in number pad key */
    PdfKeys[PdfKeys["Number9"] = 105] = "Number9";
    /** The A key */
    PdfKeys[PdfKeys["A"] = 65] = "A";
    /** The B key */
    PdfKeys[PdfKeys["B"] = 66] = "B";
    /** The C key */
    PdfKeys[PdfKeys["C"] = 67] = "C";
    /** The D key */
    PdfKeys[PdfKeys["D"] = 68] = "D";
    /** The E key */
    PdfKeys[PdfKeys["E"] = 69] = "E";
    /** The F key */
    PdfKeys[PdfKeys["F"] = 70] = "F";
    /** The G key */
    PdfKeys[PdfKeys["G"] = 71] = "G";
    /** The H key */
    PdfKeys[PdfKeys["H"] = 72] = "H";
    /** The I key */
    PdfKeys[PdfKeys["I"] = 73] = "I";
    /** The J key */
    PdfKeys[PdfKeys["J"] = 74] = "J";
    /** The K key */
    PdfKeys[PdfKeys["K"] = 75] = "K";
    /** The L key */
    PdfKeys[PdfKeys["L"] = 76] = "L";
    /** The M key */
    PdfKeys[PdfKeys["M"] = 77] = "M";
    /** The N key */
    PdfKeys[PdfKeys["N"] = 78] = "N";
    /** The O key */
    PdfKeys[PdfKeys["O"] = 79] = "O";
    /** The P key */
    PdfKeys[PdfKeys["P"] = 80] = "P";
    /** The Q key */
    PdfKeys[PdfKeys["Q"] = 81] = "Q";
    /** The R key */
    PdfKeys[PdfKeys["R"] = 82] = "R";
    /** The S key */
    PdfKeys[PdfKeys["S"] = 83] = "S";
    /** The T key */
    PdfKeys[PdfKeys["T"] = 84] = "T";
    /** The U key */
    PdfKeys[PdfKeys["U"] = 85] = "U";
    /** The V key */
    PdfKeys[PdfKeys["V"] = 86] = "V";
    /** The W key */
    PdfKeys[PdfKeys["W"] = 87] = "W";
    /** The X key */
    PdfKeys[PdfKeys["X"] = 88] = "X";
    /** The Y key */
    PdfKeys[PdfKeys["Y"] = 89] = "Y";
    /** The Z key */
    PdfKeys[PdfKeys["Z"] = 90] = "Z";
    /** The left arrow key */
    PdfKeys[PdfKeys["ArrowLeft"] = 37] = "ArrowLeft";
    /** The up arrow key */
    PdfKeys[PdfKeys["ArrowUp"] = 38] = "ArrowUp";
    /** The right arrow key */
    PdfKeys[PdfKeys["ArrowRight"] = 39] = "ArrowRight";
    /** The down arrow key */
    PdfKeys[PdfKeys["ArrowDown"] = 40] = "ArrowDown";
    /** The Escape key */
    PdfKeys[PdfKeys["Escape"] = 27] = "Escape";
    /** The Space key */
    PdfKeys[PdfKeys["Space"] = 32] = "Space";
    /** The page up key */
    PdfKeys[PdfKeys["PageUp"] = 33] = "PageUp";
    /** The Page down key */
    PdfKeys[PdfKeys["PageDown"] = 34] = "PageDown";
    /** The End key */
    PdfKeys[PdfKeys["End"] = 35] = "End";
    /** The Home key */
    PdfKeys[PdfKeys["Home"] = 36] = "Home";
    /** The delete key */
    PdfKeys[PdfKeys["Delete"] = 46] = "Delete";
    /** The tab key */
    PdfKeys[PdfKeys["Tab"] = 9] = "Tab";
    /** The enter key */
    PdfKeys[PdfKeys["Enter"] = 13] = "Enter";
    /** The BackSpace key */
    PdfKeys[PdfKeys["BackSpace"] = 8] = "BackSpace";
    /** The F1 key */
    PdfKeys[PdfKeys["F1"] = 112] = "F1";
    /** The F2 key */
    PdfKeys[PdfKeys["F2"] = 113] = "F2";
    /** The F3 key */
    PdfKeys[PdfKeys["F3"] = 114] = "F3";
    /** The F4 key */
    PdfKeys[PdfKeys["F4"] = 115] = "F4";
    /** The F5 key */
    PdfKeys[PdfKeys["F5"] = 116] = "F5";
    /** The F6 key */
    PdfKeys[PdfKeys["F6"] = 117] = "F6";
    /** The F7 key */
    PdfKeys[PdfKeys["F7"] = 118] = "F7";
    /** The F8 key */
    PdfKeys[PdfKeys["F8"] = 119] = "F8";
    /** The F9 key */
    PdfKeys[PdfKeys["F9"] = 120] = "F9";
    /** The F10 key */
    PdfKeys[PdfKeys["F10"] = 121] = "F10";
    /** The F111 key */
    PdfKeys[PdfKeys["F11"] = 122] = "F11";
    /** The F12 Key */
    PdfKeys[PdfKeys["F12"] = 123] = "F12";
    /** The Star key */
    PdfKeys[PdfKeys["Star"] = 56] = "Star";
    /** The Plus key */
    PdfKeys[PdfKeys["Plus"] = 187] = "Plus";
    /** The Minus key */
    PdfKeys[PdfKeys["Minus"] = 189] = "Minus";
    /** The Open Square bracket key */
    PdfKeys[PdfKeys["BracketLeft"] = 219] = "BracketLeft";
    /** The close Square bracket key */
    PdfKeys[PdfKeys["BracketRight"] = 221] = "BracketRight";
})(PdfKeys || (PdfKeys = {}));
