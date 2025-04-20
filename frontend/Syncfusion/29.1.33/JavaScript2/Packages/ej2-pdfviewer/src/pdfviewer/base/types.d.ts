/**
 * Enum toolbarItem for toolbar settings
 */
export declare type ToolbarItem = 'OpenOption' | 'PageNavigationTool' | 'MagnificationTool' | 'PanTool' | 'SelectionTool' | 'SearchOption' | 'PrintOption' | 'DownloadOption' | 'UndoRedoTool' | 'AnnotationEditTool' | 'FormDesignerEditTool' | 'CommentTool' | 'SubmitForm' | 'OrganizePagesTool';
/**
 * Enum AnnotationToolbarItem for annotation toolbar settings
 */
export declare type AnnotationToolbarItem = 'HighlightTool' | 'UnderlineTool' | 'StrikethroughTool' | 'ShapeTool' | 'CalibrateTool' | 'ColorEditTool' | 'StrokeColorEditTool' | 'ThicknessEditTool' | 'OpacityEditTool' | 'AnnotationDeleteTool' | 'StampAnnotationTool' | 'HandWrittenSignatureTool' | 'InkAnnotationTool' | 'FreeTextAnnotationTool' | 'FontFamilyAnnotationTool' | 'FontSizeAnnotationTool' | 'FontStylesAnnotationTool' | 'FontAlignAnnotationTool' | 'FontColorAnnotationTool' | 'CommentPanelTool';
/**
 * Enum value of form designer toolbar item.
 */
export declare type FormDesignerToolbarItem = 'TextboxTool' | 'PasswordTool' | 'CheckBoxTool' | 'RadioButtonTool' | 'DropdownTool' | 'ListboxTool' | 'DrawSignatureTool' | 'DeleteTool';
/**
 * Enum LinkTarget for hyperlink navigation
 */
export declare type LinkTarget = 'CurrentTab' | 'NewTab' | 'NewWindow';
/**
 * Enum InteractionMode for interaction mode
 */
export declare type InteractionMode = 'TextSelection' | 'Pan';
/**
 * Enum type for Signature Items
 */
export declare type SignatureItem = 'Signature' | 'Initial';
/**
 * Enum AnnotationType for specifying Annotations
 */
export declare type AnnotationType = 'None' | 'Highlight' | 'Underline' | 'Strikethrough' | 'Line' | 'Arrow' | 'Rectangle' | 'Circle' | 'Polygon' | 'Distance' | 'Perimeter' | 'Area' | 'Radius' | 'Volume' | 'FreeText' | 'HandWrittenSignature' | 'Initial' | 'Ink' | 'Stamp' | 'Image' | 'StickyNotes';
/**
 * Enum LineHeadStyle for line and arrow annotation
 */
export declare type LineHeadStyle = 'None' | 'Closed' | 'Open' | 'Square' | 'Round' | 'Diamond' | 'Butt';
/**
 * Enum unit for calibration annotation
 */
export declare type CalibrationUnit = 'pt' | 'in' | 'mm' | 'cm' | 'p' | 'ft' | 'ft_in' | 'm';
/**
 * Enum for comment status of the annotation
 */
export declare enum CommentStatus {
    None = 1,
    Accepted = 2,
    Canceled = 3,
    Completed = 4,
    Rejected = 5
}
/**
 * Enum unit for ContextMenu Actions
 */
export declare type ContextMenuAction = 'None' | 'MouseUp' | 'RightClick';
/**
 * Enum unit for FormFieldType
 */
export declare type FormFieldType = 'Textbox' | 'Password' | 'CheckBox' | 'RadioButton' | 'DropDown' | 'ListBox' | 'SignatureField' | 'InitialField';
/**
 * Enum for font styles
 */
export declare enum FontStyle {
    None = 0,
    Bold = 1,
    Italic = 2,
    Underline = 4,
    Strikethrough = 8
}
/**
 * Enum for context menu items
 */
export declare enum ContextMenuItem {
    Copy = 0,
    Highlight = 1,
    Cut = 2,
    Underline = 4,
    Paste = 8,
    Delete = 16,
    ScaleRatio = 32,
    Strikethrough = 64,
    Properties = 128,
    Comment = 256
}
/**
 * Enum for signature type
 */
export declare enum SignatureType {
    Draw = "Draw",
    Type = "Type",
    Image = "Image"
}
/**
 * Enum unit for text alignment
 */
export declare type TextAlignment = 'Left' | 'Right' | 'Center' | 'Justify';
/**
 * Enum unit for Visibility
 */
export declare type Visibility = 'visible' | 'hidden';
/**
 * Enum for annotation selector shapes
 */
export declare type AnnotationResizerShape = 'Square' | 'Circle';
/**
 * Enum for annotation resizer location
 */
export declare enum AnnotationResizerLocation {
    Corners = 1,
    Edges = 2
}
/**
 * Specifies the type of text extraction result to be returned.
 * This enum is used to customize the output of text extraction methods and events,
 * allowing developers to choose whether to retrieve plain text, text with layout information (bounds),
 * or both. It also includes an option for cases where no text information is applicable.
 */
export declare enum ExtractTextOption {
    /**
     * Indicates that no text information is returned.
     * This option is not applicable for the ExtractText method and is only used
     * in the extractTextCompleted event when no text data is available.
     * Use this option when text extraction is not relevant or supported for the given context.
     */
    None = "None",
    /**
     * Indicates that only plain text is extracted and returned.
     * This option does not include any additional bounds  information.
     * Use this option when only the textual content is needed, without any positional or layout details.
     */
    TextOnly = "TextOnly",
    /**
     * Indicates that text is returned along with layout information, such as bounds or coordinates.
     * This option does not include plain text and is useful when only positional data is required.
     * Use this option when you need to know the location or layout of the extracted text but not the text itself.
     */
    BoundsOnly = "BoundsOnly",
    /**
     * Indicates that both plain text and text with bounds (layout information) are returned.
     * This is the default behavior, providing both the extracted text and its positional data.
     * Use this option when you need both the textual content and its layout information for further processing or analysis.
     */
    TextAndBounds = "TextAndBounds"
}
/**
 * Enum for displaying the signature dialog
 */
export declare enum DisplayMode {
    /** Draw - Display only the draw option in the signature dialog. */
    Draw = 1,
    /** Text - Display only the type option in the signature dialog. */
    Text = 2,
    /** Upload - Display only the upload option in the signature dialog. */
    Upload = 4
}
/**
 * set the ZoomMode on rendering
 */
export declare type ZoomMode = 'Default' | 'FitToWidth' | 'FitToPage';
/**
 * Enum for Print Mode
 */
export declare type PrintMode = 'Default' | 'NewWindow';
/**
 * Enum for cursor type
 */
export declare enum CursorType {
    auto = "auto",
    crossHair = "crosshair",
    e_resize = "e-resize",
    ew_resize = "ew-resize",
    grab = "grab",
    grabbing = "grabbing",
    move = "move",
    n_resize = "n-resize",
    ne_resize = "ne-resize",
    ns_resize = "ns-resize",
    nw_resize = "nw-resize",
    pointer = "pointer",
    s_resize = "s-resize",
    se_resize = "se-resize",
    sw_resize = "sw-resize",
    text = "text",
    w_resize = "w-resize"
}
/**
 * Enum type for Dynamic Stamp Items
 */
export declare enum DynamicStampItem {
    Revised = "Revised",
    Reviewed = "Reviewed",
    Received = "Received",
    Approved = "Approved",
    Confidential = "Confidential",
    NotApproved = "NotApproved"
}
/**
 * Enum type for Sign Stamp Items
 */
export declare enum SignStampItem {
    Witness = "Witness",
    InitialHere = "InitialHere",
    SignHere = "SignHere",
    Accepted = "Accepted",
    Rejected = "Rejected"
}
/**
 * Enum type for Standard Business Stamp Items
 */
export declare enum StandardBusinessStampItem {
    Approved = "Approved",
    NotApproved = "NotApproved",
    Draft = "Draft",
    Final = "Final",
    Completed = "Completed",
    Confidential = "Confidential",
    ForPublicRelease = "ForPublicRelease",
    NotForPublicRelease = "NotForPublicRelease",
    ForComment = "ForComment",
    Void = "Void",
    PreliminaryResults = "PreliminaryResults",
    InformationOnly = "InformationOnly"
}
/**
 * Enum type for allowed interactions for locked annotations
 */
export declare enum AllowedInteraction {
    Select = "Select",
    Move = "Move",
    Resize = "Resize",
    Delete = "Delete",
    None = "None",
    PropertyChange = "PropertyChange"
}
/**
 * Enum type for signature mode for signature fields
 */
export declare type SignatureFitMode = 'Default' | 'Stretch';
/**
 * Enum type for export annotation file types
 */
export declare enum AnnotationDataFormat {
    Json = "Json",
    Xfdf = "Xfdf"
}
/**
 * Represents the format type of form data.
 */
export declare enum FormFieldDataFormat {
    Xml = "Xml",
    Fdf = "Fdf",
    Xfdf = "Xfdf",
    Json = "Json"
}
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
export declare enum ModifierKeys {
    /** Specifies when no modifiers are pressed. */
    None = 0,
    /** Specifies the Ctrl key as a key modifier. */
    Control = 1,
    /** Specifies the meta key in Mac. */
    Meta = 1,
    /** Specifies the alt key as a key modifier. */
    Alt = 2,
    /** Specifies the shift key as a key modifier. */
    Shift = 4
}
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
export declare enum PdfKeys {
    /** No key pressed */
    None,
    /** The 0 key */
    N0 = 48,
    /** The 1 key */
    N1 = 49,
    /** The 2 key */
    N2 = 50,
    /** The 3 key */
    N3 = 51,
    /** The 4 key */
    N4 = 52,
    /** The 5 key */
    N5 = 53,
    /** The 6 key */
    N6 = 54,
    /** The 7 key */
    N7 = 55,
    /** The 8 key */
    N8 = 56,
    /** The 9 key */
    N9 = 57,
    /** The 0 in number pad key */
    Number0 = 96,
    /** The 1 in number pad key */
    Number1 = 97,
    /** The 2 in number pad key */
    Number2 = 98,
    /** The 3 in number pad key */
    Number3 = 99,
    /** The 4 in number pad key */
    Number4 = 100,
    /** The 5 in number pad key */
    Number5 = 101,
    /** The 6 in number pad key */
    Number6 = 102,
    /** The 7 in number pad key */
    Number7 = 103,
    /** The 8 in number pad key */
    Number8 = 104,
    /** The 9 in number pad key */
    Number9 = 105,
    /** The A key */
    A = 65,
    /** The B key */
    B = 66,
    /** The C key */
    C = 67,
    /** The D key */
    D = 68,
    /** The E key */
    E = 69,
    /** The F key */
    F = 70,
    /** The G key */
    G = 71,
    /** The H key */
    H = 72,
    /** The I key */
    I = 73,
    /** The J key */
    J = 74,
    /** The K key */
    K = 75,
    /** The L key */
    L = 76,
    /** The M key */
    M = 77,
    /** The N key */
    N = 78,
    /** The O key */
    O = 79,
    /** The P key */
    P = 80,
    /** The Q key */
    Q = 81,
    /** The R key */
    R = 82,
    /** The S key */
    S = 83,
    /** The T key */
    T = 84,
    /** The U key */
    U = 85,
    /** The V key */
    V = 86,
    /** The W key */
    W = 87,
    /** The X key */
    X = 88,
    /** The Y key */
    Y = 89,
    /** The Z key */
    Z = 90,
    /** The left arrow key */
    ArrowLeft = 37,
    /** The up arrow key */
    ArrowUp = 38,
    /** The right arrow key */
    ArrowRight = 39,
    /** The down arrow key */
    ArrowDown = 40,
    /** The Escape key */
    Escape = 27,
    /** The Space key */
    Space = 32,
    /** The page up key */
    PageUp = 33,
    /** The Page down key */
    PageDown = 34,
    /** The End key */
    End = 35,
    /** The Home key */
    Home = 36,
    /** The delete key */
    Delete = 46,
    /** The tab key */
    Tab = 9,
    /** The enter key */
    Enter = 13,
    /** The BackSpace key */
    BackSpace = 8,
    /** The F1 key */
    F1 = 112,
    /** The F2 key */
    F2 = 113,
    /** The F3 key */
    F3 = 114,
    /** The F4 key */
    F4 = 115,
    /** The F5 key */
    F5 = 116,
    /** The F6 key */
    F6 = 117,
    /** The F7 key */
    F7 = 118,
    /** The F8 key */
    F8 = 119,
    /** The F9 key */
    F9 = 120,
    /** The F10 key */
    F10 = 121,
    /** The F111 key */
    F11 = 122,
    /** The F12 Key */
    F12 = 123,
    /** The Star key */
    Star = 56,
    /** The Plus key */
    Plus = 187,
    /** The Minus key */
    Minus = 189,
    /** The Open Square bracket key */
    BracketLeft = 219,
    /** The close Square bracket key */
    BracketRight = 221
}
