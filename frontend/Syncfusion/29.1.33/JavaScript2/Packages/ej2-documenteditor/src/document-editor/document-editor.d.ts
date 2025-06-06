import { Component, INotifyPropertyChanged, ModuleDeclaration, ChildProperty } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DocumentChangeEventArgs, ViewChangeEventArgs, ZoomFactorChangeEventArgs, StyleType, WStyle, BeforePaneSwitchEventArgs, LayoutType, FormFieldFillEventArgs, FormFieldData } from './index';
import { SelectionChangeEventArgs, RequestNavigateEventArgs, ContentChangeEventArgs, DocumentEditorKeyDownEventArgs, CustomContentMenuEventArgs, BeforeOpenCloseCustomContentMenuEventArgs, CommentDeleteEventArgs, RevisionActionEventArgs, BeforeFileOpenArgs, CommentActionEventArgs, XmlHttpRequestEventArgs } from './index';
import { LayoutViewer } from './index';
import { Print, SearchResultsChangeEventArgs, ElementBox } from './index';
import { WParagraphFormat, WCharacterFormat } from './index';
import { SfdtReader } from './index';
import { Selection } from './index';
import { TextPosition } from './index';
import { Editor, EditorHistory } from './index';
import { Search } from './index';
import { OptionsPane } from './index';
import { XmlPane } from './index';
import { WordExport } from './index';
import { TextExport } from './index';
import { FormatType, PageFitType, DialogType, FormattingExceptions, CompatibilityMode } from './index';
import { ContextMenu } from './index';
import { ImageResizer } from './index';
import { SfdtExport } from './index';
import { HyperlinkDialog, TableDialog, BookmarkDialog, StylesDialog, TableOfContentsDialog } from './index';
import { PageSetupDialog, ParagraphDialog, ListDialog, StyleDialog, FontDialog } from './index';
import { TablePropertiesDialog, BordersAndShadingDialog, CellOptionsDialog, TableOptionsDialog } from './index';
import { SpellChecker } from './implementation/spell-check/spell-checker';
import { SpellCheckDialog } from './implementation/dialogs/spellCheck-dialog';
import { DocumentEditorModel, ServerActionSettingsModel, DocumentEditorSettingsModel, FormFieldSettingsModel, CollaborativeEditingSettingsModel, DocumentSettingsModel, AutoResizeSettingsModel } from './document-editor-model';
import { CharacterFormatProperties, ParagraphFormatProperties, SectionFormatProperties, DocumentHelper } from './index';
import { PasteOptions } from './index';
import { CommentReviewPane, CheckBoxFormFieldDialog, TextFormFieldInfo, CheckBoxFormFieldInfo, DropDownFormFieldInfo, CollaborativeEditing, CollaborativeEditingEventArgs, CollaborativeEditingHandler, ExternalFontInfo } from './implementation/index';
import { TextFormFieldDialog } from './implementation/dialogs/form-field-text-dialog';
import { DropDownFormFieldDialog } from './implementation/dialogs/form-field-drop-down-dialog';
import { FormFillingMode, TrackChangeEventArgs, ServiceFailureArgs, ImageFormat, ProtectionType, ContentControlInfo, CommentInfo } from './base';
import { TrackChangesPane } from './implementation/track-changes/track-changes-pane';
import { RevisionCollection } from './implementation/track-changes/track-changes';
import { NotesDialog } from './implementation/dialogs/notes-dialog';
import { ContentControl, TextElementBox } from './implementation/viewer/page';
import { Optimized, Regular } from './index';
import { ColumnsDialog } from './implementation/dialogs/columns-dialog';
import { Ruler } from './implementation/ruler/index';
import { TabDialog } from './implementation/dialogs/tab-dialog';
import { RulerHelper } from './implementation/utility/dom-util';
import { ColorPickerModel } from '@syncfusion/ej2-inputs';
import { MentionModel } from '@syncfusion/ej2-dropdowns';
import { DatePickerDialog } from './implementation/dialogs/datepicker-dialog';
import { ContentControlPropertiesDialog } from './implementation/dialogs/content-control-properties-dialog';
import { PicContentControlDialog } from './implementation/dialogs/pic-contentControl-dialog';
import { ContentControlFillEventArgs, DocumentLoadFailedEventArgs } from './base/events-helper';
/**
 * The `DocumentEditorSettings` module is used to provide the customize property of Document Editor.
 */
export declare class DocumentEditorSettings extends ChildProperty<DocumentEditorSettings> {
    /**
     * Gets or sets a value indicating where to append the pop up element
     *
     * @returns {HTMLElement}
     * @aspType HTMLElement
     * @default null
     */
    popupTarget: HTMLElement;
    /**
     * Specifies the user preferred Search Highlight Color of Document Editor.
     *
     * @default '#FFE97F'
     */
    searchHighlightColor: string;
    /**
     * Specifies the user preferred font family of Document Editor.
     * @default ['Algerian','Arial','Calibri','Cambria','CambriaMath','Candara','CourierNew','Georgia','Impact','SegoePrint','SegoeScript','SegoeUI','Symbol','TimesNewRoman','Verdana','Wingdings']
     */
    fontFamilies: string[];
    /**
     * Gets or sets the form field settings.
     */
    formFieldSettings: FormFieldSettingsModel;
    /**
     * Specified the auto resize settings.
     */
    autoResizeSettings: AutoResizeSettingsModel;
    /**
     * Gets ot sets the collaborative editing settings.
     */
    collaborativeEditingSettings: CollaborativeEditingSettingsModel;
    /**
     * Specifies the device pixel ratio for the image generated for printing.
     * > Increasing the device pixel ratio will increase the image file size, due to high resolution of image.
     */
    printDevicePixelRatio: number;
    /**
     * Gets or sets a value indicating whether to use optimized text measuring approach to match Microsoft Word pagination.
     *
     * @default true
     * @aspType bool
     * @returns {boolean} Returns `true` if uses optimized text measuring approach to match Microsoft Word pagination; otherwise, `false`
     */
    enableOptimizedTextMeasuring: boolean;
    /**
     * Enable or Disable moving selected content within Document Editor
     *
     * @default true
     * @aspType bool
     * @returns {boolean} Returns `true` moving selected content within Document Editor is enabled; otherwise, `false`
     */
    allowDragAndDrop: boolean;
    /**
     * Gets or sets the maximum number of rows allowed while inserting a table in Document editor component.
     * > The maximum value is 32767, as per Microsoft Word application and you can set any value less than 32767 to this property. If you set any value greater than 32767, then Syncfusion Document editor will automatically reset as 32767.
     *
     * @default 32767
     * @returns {number}
     */
    maximumRows: number;
    /**
     * Gets or sets the maximum number of columns allowed while inserting a table in Document editor component.
     * > The maximum value is 63, as per Microsoft Word application and you can set any value less than 63 to this property. If you set any value greater than 63, then Syncfusion Document editor will automatically reset as 63.
     *
     * @default 63
     * @returns {number}
     */
    maximumColumns: number;
    /**
     * Gets or sets a value indicating whether to show the hidden characters like spaces, tab, paragraph marks, and breaks.
     *
     * @default false
     * @aspType bool
     * @returns {boolean} Returns `false` if hides the hidden characters like spaces, tab, paragraph marks, and breaks. Otherwise `true`.
     */
    showHiddenMarks: boolean;
    /**
     * Gets or sets a value indicating whether to show square brackets around bookmarked items.
     *
     * @returns {boolean}
     * @aspType bool
     * @default false
     */
    showBookmarks: boolean;
    /**
     * Gets or sets a value indicating whether to highlight the editable ranges in the document where the current user can edit.
     *
     * @default true
     * @aspType bool
     * @returns {boolean} Returns `true` if editable ranges in the document is highlighted. Otherwise `false`.
     */
    highlightEditableRanges: boolean;
    /**
     * Describes whether to reduce the resultant SFDT file size by minifying the file content
     *
     * @default true
     * @aspType bool
     * @returns {boolean} Returns `true` if sfdt content generated is optimized. Otherwise `false`.
     */
    optimizeSfdt: boolean;
    /**
     *  Gets or sets a value indicating whether to display ruler in Document Editor.
     *
     * @default false
     * @aspType bool
     * @returns {boolean} Returns `true` if ruler is visible in Document Editor. Otherwise `false`.
     */
    showRuler: boolean;
    /**
     * Gets or sets color picker settings to customize the color picker used in Document Editor.
     */
    colorPickerSettings: ColorPickerModel;
    /**
     *  Gets or sets a value indicating whether to display navigation pane in Document Editor.
     *
     * @default false
     * @aspType bool
     * @returns {boolean} Returns `true` if navigation pane is visible in Document Editor. Otherwise `false`.
     */
    showNavigationPane: boolean;
    /**
     * Gets ot sets the mention configuration used in Document Editor.
     */
    mentionSettings: MentionModel;
    /**
     * Gets or sets a value indicating whether the final paragraph of pasted content should be appended as a new paragraph in the Document Editor.
     *
     * @default false
     * @aspType bool
     */
    pasteAsNewParagraph: boolean;
}
/**
 * Represents the settings and properties of the document that is opened in Document editor component.
 */
export declare class DocumentSettings extends ChildProperty<DocumentSettings> {
    /**
     * Gets or sets the compatibility mode of the current document.
     *
     * @default `Word2013`
     * @returns {CompatibilityMode}
     */
    compatibilityMode: CompatibilityMode;
}
/**
 * Represents the settings required for resizing the Document editor automatically when the visibility of parent element changed.
 */
export declare class AutoResizeSettings extends ChildProperty<AutoResizeSettings> {
    /**
     * Gets or sets the time interval in milliseconds to validate whether the parent element's height and width is non-zero.
     *
     * @default 2000
     * @returns {number}
     */
    interval: number;
    /**
     * Gets or sets the number of times the Document editor has to validate whether the parent element's height and width is non-zero.
     *
     * @default 5
     * @returns {number}
     */
    iterationCount: number;
}
/**
 * The Document editor component is used to draft, save or print rich text contents as page by page.
 */
export declare class DocumentEditor extends Component<HTMLElement> implements INotifyPropertyChanged {
    private enableHeaderFooterIn;
    /**
     * @private
     * @returns {boolean} Returns true if header and footer is enabled.
     */
    /**
    * @private
    * @param {boolean} value True if enable the header and footer; Otherwise, false.
    */
    enableHeaderAndFooter: boolean;
    /**
     * @private
     */
    viewer: LayoutViewer;
    /**
     * @private
     */
    documentHelper: DocumentHelper;
    /**
     * @private
     */
    isShiftingEnabled: boolean;
    /**
     * @private
     */
    isContainerResize: boolean;
    /**
     * @private
     */
    enableXMLPane: boolean;
    /**
     * @private
     */
    xPathString: string;
    /**
     * @private
     */
    prefixMappings: string;
    /**
     * @private
     */
    isLayoutEnabled: boolean;
    /**
     * @private
     */
    isPastingContent: boolean;
    /**
     * @private
     */
    isOnIndent: boolean;
    /**
     * @private
     */
    isTableMarkerDragging: boolean;
    /**
     * @private
     */
    startXPosition: number;
    /**
     * @private
     */
    parser: SfdtReader;
    /**
     * @private
     */
    isUpdateTrackChanges: boolean;
    private isDocumentLoadedIn;
    private disableHistoryIn;
    private documentSettingOps;
    /**
     * @private
     */
    skipSettingsOps: boolean;
    /**
     * @private
     */
    hRuler: Ruler;
    /**
     * @private
     */
    vRuler: Ruler;
    /**
     * @private
     */
    rulerHelper: RulerHelper;
    private isSettingOp;
    /**
     * @private
     */
    findResultsList: HTMLElement[];
    /**
     * @private
     */
    printModule: Print;
    /**
     * @private
     */
    sfdtExportModule: SfdtExport;
    /**
     * @private
     */
    selectionModule: Selection;
    /**
     * @private
     */
    editorModule: Editor;
    /**
     * @private
     */
    wordExportModule: WordExport;
    /**
     * @private
     */
    textExportModule: TextExport;
    /**
     * @private
     */
    editorHistoryModule: EditorHistory;
    /**
     * @private
     */
    tableOfContentsDialogModule: TableOfContentsDialog;
    /**
     * @private
     */
    tablePropertiesDialogModule: TablePropertiesDialog;
    /**
     * @private
     */
    bordersAndShadingDialogModule: BordersAndShadingDialog;
    /**
     * @private
     */
    listDialogModule: ListDialog;
    /**
     * @private
     */
    styleDialogModule: StyleDialog;
    /**
     * @private
     */
    tabDialogModule: TabDialog;
    /**
     * @private
     */
    cellOptionsDialogModule: CellOptionsDialog;
    /**
     * @private
     */
    tableOptionsDialogModule: TableOptionsDialog;
    /**
     * @private
     */
    tableDialogModule: TableDialog;
    /**
     * @private
     */
    spellCheckDialogModule: SpellCheckDialog;
    /**
     * @private
     */
    pageSetupDialogModule: PageSetupDialog;
    /**
     * @private
     */
    dateContentDialogModule: DatePickerDialog;
    /**
     * @private
     */
    picContentControlDialogModule: PicContentControlDialog;
    /**
     * @private
     */
    picturePositionY: number;
    /**
     * @private
     */
    contentControlPropertiesDialogModule: ContentControlPropertiesDialog;
    /**
     * @private
     */
    columnsDialogModule: ColumnsDialog;
    /**
     * @private
     */
    footNotesDialogModule: NotesDialog;
    /**
     * @private
     */
    paragraphDialogModule: ParagraphDialog;
    /**
     * @private
     */
    checkBoxFormFieldDialogModule: CheckBoxFormFieldDialog;
    /**
     * @private
     */
    textFormFieldDialogModule: TextFormFieldDialog;
    /**
     * @private
     */
    dropDownFormFieldDialogModule: DropDownFormFieldDialog;
    /**
     * @private
     */
    optionsPaneModule: OptionsPane;
    /**
     * @private
     */
    xmlPaneModule: XmlPane;
    /**
     * @private
     */
    hyperlinkDialogModule: HyperlinkDialog;
    /**
     * @private
     */
    bookmarkDialogModule: BookmarkDialog;
    /**
     * @private
     */
    stylesDialogModule: StylesDialog;
    /**
     * @private
     */
    contextMenuModule: ContextMenu;
    /**
     * @private
     */
    imageResizerModule: ImageResizer;
    /**
     * @private
     */
    searchModule: Search;
    /**
     * @private
     */
    optimizedModule: Optimized;
    /**
     * @private
     */
    regularModule: Regular;
    private createdTriggered;
    /**
     * Gets or sets the Collaborative editing module.
     */
    collaborativeEditingModule: CollaborativeEditing;
    /**
     * Gets or sets the Collaborative editing module.
     */
    collaborativeEditingHandlerModule: CollaborativeEditingHandler;
    /**
     * Holds regular or optimized module based on DocumentEditorSettting `enableOptimizedTextMeasuring` property.
     *
     * @private
     */
    textMeasureHelper: Regular | Optimized;
    /**
     * Enable collaborative editing in document editor.
     *
     * @default false
     */
    enableCollaborativeEditing: boolean;
    /**
     * Gets or sets the default Paste Formatting Options
     *
     * @default KeepSourceFormatting
     */
    defaultPasteOption: PasteOptions;
    /**
     * Gets or sets the Layout Type.
     *
     * @default Pages
     */
    layoutType: LayoutType;
    /**
     * Gets or sets the current user.
     *
     * @default ''
     */
    currentUser: string;
    /**
     * Gets or sets the color used for highlighting the editable ranges or regions of the `currentUser` in Document Editor. The default value is "#FFFF00".
     * > If the visibility of text affected due this highlight color matching with random color applied for the track changes, then modify the color value of this property to resolve text visibility problem.
     *
     * @default '#FFFF00'
     */
    userColor: string;
    /**
     * Gets or sets the page gap value in document editor.
     *
     * @default 20
     */
    pageGap: number;
    /**
     * Gets or sets the name of the document.
     *
     * @default ''
     */
    documentName: string;
    /**
     * @private
     */
    spellCheckerModule: SpellChecker;
    /**
     * Defines the width of the DocumentEditor component.
     *
     * @default '100%'
     */
    width: string;
    /**
     * Defines the height of the DocumentEditor component.
     *
     * @default '200px'
     */
    height: string;
    /**
     * Gets or sets the Sfdt Service URL.
     *
     * @default ''
     */
    serviceUrl: string;
    /**
     * Gets or sets the zoom factor in document editor.
     *
     * @default 1
     */
    zoomFactor: number;
    /**
     * Specifies the z-order for rendering that determines whether the dialog is displayed in front or behind of another component.
     *
     * @default 2000
     * @aspType int
     */
    zIndex: number;
    /**
     * Gets or sets a value indicating whether the document editor is in read only state or not.
     *
     * @default true
     */
    isReadOnly: boolean;
    /**
     * Gets or sets a value indicating whether print needs to be enabled or not.
     *
     * @default false
     */
    enablePrint: boolean;
    /**
     * Gets or sets a value indicating whether selection needs to be enabled or not.
     *
     * @default false
     */
    enableSelection: boolean;
    /**
     * Gets or sets a value indicating whether editor needs to be enabled or not.
     *
     * @default false
     */
    enableEditor: boolean;
    /**
     * Gets or sets a value indicating whether editor history needs to be enabled or not.
     *
     * @default false
     */
    enableEditorHistory: boolean;
    /**
     * Gets or sets a value indicating whether Sfdt export needs to be enabled or not.
     *
     * @default false
     */
    enableSfdtExport: boolean;
    /**
     * Gets or sets a value indicating whether word export needs to be enabled or not.
     *
     * @default false
     */
    enableWordExport: boolean;
    /**
     * Gets or sets a value indicating whether the automatic focus behavior is enabled for Document editor or not.
     *
     * > By default, the Document editor gets focused automatically when the page loads. If you want the Document editor not to be focused automatically, then set this property to false.
     *
     * @returns {boolean}
     * @aspType bool
     * @default true
     */
    enableAutoFocus: boolean;
    /**
     * Gets or sets a value indicating whether text export needs to be enabled or not.
     *
     * @default false
     */
    enableTextExport: boolean;
    /**
     * Gets or sets a value indicating whether options pane is enabled or not.
     *
     * @default false
     */
    enableOptionsPane: boolean;
    /**
     * Gets or sets a value indicating whether context menu is enabled or not.
     *
     * @default false
     */
    enableContextMenu: boolean;
    /**
     * Gets or sets a value indicating whether hyperlink dialog is enabled or not.
     *
     * @default false
     */
    enableHyperlinkDialog: boolean;
    /**
     * Gets or sets a value indicating whether bookmark dialog is enabled or not.
     *
     * @default false
     */
    enableBookmarkDialog: boolean;
    /**
     * Gets or sets a value indicating whether table of contents dialog is enabled or not.
     *
     * @default false
     */
    enableTableOfContentsDialog: boolean;
    /**
     * Gets or sets a value indicating whether search module is enabled or not.
     *
     * @default false
     */
    enableSearch: boolean;
    /**
     * Gets or sets a value indicating whether paragraph dialog is enabled or not.
     *
     * @default false
     */
    enableParagraphDialog: boolean;
    /**
     * Gets or sets a value indicating whether list dialog is enabled or not.
     *
     * @default false
     */
    enableListDialog: boolean;
    /**
     * Gets or sets a value indicating whether table properties dialog is enabled or not.
     *
     * @default false
     */
    enableTablePropertiesDialog: boolean;
    /**
     * Gets or sets a value indicating whether borders and shading dialog is enabled or not.
     *
     * @default false
     */
    enableBordersAndShadingDialog: boolean;
    /**
     * Gets or sets a value indicating whether notes dialog is enabled or not.
     *
     * @default false
     */
    enableFootnoteAndEndnoteDialog: boolean;
    /**
     * Gets or sets a value indicating whether margin dialog is enabled or not.
     *
     * @default false
     */
    enableColumnsDialog: boolean;
    /**
     * Gets or sets a value indicating whether font dialog is enabled or not.
     *
     * @default false
     */
    enablePageSetupDialog: boolean;
    /**
     * Gets or sets a value indicating whether font dialog is enabled or not.
     *
     * @default false
     */
    enableStyleDialog: boolean;
    /**
     * Gets or sets a value indicating whether font dialog is enabled or not.
     *
     * @default false
     */
    enableFontDialog: boolean;
    /**
     * @private
     */
    fontDialogModule: FontDialog;
    /**
     * Gets or sets a value indicating whether table options dialog is enabled or not.
     *
     * @default false
     */
    enableTableOptionsDialog: boolean;
    /**
     * Gets or sets a value indicating whether table dialog is enabled or not.
     *
     * @default false
     */
    enableTableDialog: boolean;
    /**
     * Gets or sets a value indicating whether image resizer is enabled or not.
     *
     * @default false
     */
    enableImageResizer: boolean;
    /**
     * Gets or sets a value indicating whether editor need to be spell checked.
     *
     * @default false
     */
    enableSpellCheck: boolean;
    /**
     * Gets or sets a value indicating whether comment is enabled or not
     *
     * @default false
     */
    enableComment: boolean;
    /**
     * Gets or sets a value indicating whether track changes is enabled or not
     *
     * @default false
     */
    enableTrackChanges: boolean;
    /**
     * Gets or sets a value indicating whether form fields is enabled or not.
     *
     * @default false
     */
    enableFormField: boolean;
    /**
     * Gets or sets a value indicating whether tab key can be accepted as input or not.
     *
     * @default false
     */
    acceptTab: boolean;
    /**
     * Gets or sets a value indicating whether holding Ctrl key is required to follow hyperlink on click. The default value is true.
     *
     * @default true
     */
    useCtrlClickToFollowHyperlink: boolean;
    /**
     * Gets or sets the page outline color.
     *
     * @default '#000000'
     */
    pageOutline: string;
    /**
     * Gets or sets a value indicating whether to enable cursor in document editor on read only state or not. The default value is false.
     *
     * @default false
     */
    enableCursorOnReadOnly: boolean;
    /**
     * Gets or sets a value indicating whether local paste needs to be enabled or not.
     *
     * @default false
     */
    enableLocalPaste: boolean;
    /**
     * Enables the partial lock and edit module.
     *
     * @default false
     */
    enableLockAndEdit: boolean;
    /**
     * Defines the settings for DocumentEditor customization.
     *
     * @default {}
     */
    documentEditorSettings: DocumentEditorSettingsModel;
    /**
     * Gets the settings and properties of the document that is opened in Document editor component.
     *
     * @default {}
     */
    documentSettings: DocumentSettingsModel;
    /**
     * Defines the settings of the DocumentEditor services
     */
    serverActionSettings: ServerActionSettingsModel;
    /**
     * Adds the custom headers to XMLHttpRequest.
     *
     * @default []
     */
    headers: object[];
    /**
     * Shows the comment in the document.
     *
     * @default false
     */
    showComments: boolean;
    /**
     * Shows the revision changes in the document.
     *
     * @default false
     */
    showRevisions: boolean;
    /**
     * Gets or sets a value indicating whether to start automatic resize with the specified time interval and iteration count.
     *
     * > * Resize action triggers automatically for the specified number of iterations, or till the parent element's height and width is non-zero.
     *
     * > * If the parent element's height and width is zero even in the last iteration, then the default height and width (200) is allocated for the Document editor.
     *
     * @default false
     * @returns {boolean}
     */
    autoResizeOnVisibilityChange: boolean;
    /**
     * Triggers whenever the document changes in the document editor.
     *
     * @event documentChange
     */
    documentChange: EmitType<DocumentChangeEventArgs>;
    /**
     * Triggers whenever the container view changes in the document editor.
     *
     * @event viewChange
     */
    viewChange: EmitType<ViewChangeEventArgs>;
    /**
     * Triggers whenever the zoom factor changes in the document editor.
     *
     * @event zoomFactorChange
     */
    zoomFactorChange: EmitType<ZoomFactorChangeEventArgs>;
    /**
     * Triggers whenever the selection changes in the document editor.
     *
     * @event selectionChange
     */
    selectionChange: EmitType<SelectionChangeEventArgs>;
    /**
     * Triggers whenever the hyperlink is clicked or tapped in the document editor.
     *
     * @event requestNavigate
     */
    requestNavigate: EmitType<RequestNavigateEventArgs>;
    /**
     * Triggers whenever the content changes in the document editor.
     *
     * @event contentChange
     */
    contentChange: EmitType<ContentChangeEventArgs>;
    /**
     * Triggers whenever the key is pressed in the document editor.
     *
     * @event keyDown
     */
    keyDown: EmitType<DocumentEditorKeyDownEventArgs>;
    /**
     * Triggers whenever search results changes in the document editor.
     *
     * @event searchResultsChange
     */
    searchResultsChange: EmitType<SearchResultsChangeEventArgs>;
    /**
     * Triggers when the component is created.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Triggers when the component is destroyed.
     *
     * @event destroyed
     */
    destroyed: EmitType<Object>;
    /**
     * Triggers while selecting the custom context-menu option.
     *
     * @event customContextMenuSelect
     */
    customContextMenuSelect: EmitType<CustomContentMenuEventArgs>;
    /**
     * Triggers before opening the custom context-menu option.
     *
     * @event customContextMenuBeforeOpen
     */
    customContextMenuBeforeOpen: EmitType<BeforeOpenCloseCustomContentMenuEventArgs>;
    /**
     * Triggers before opening the comment pane.
     *
     * @event beforePaneSwitch
     */
    beforePaneSwitch: EmitType<BeforePaneSwitchEventArgs>;
    /**
     * Triggers after inserting the comment.
     *
     * @event commentBegin
     */
    commentBegin: EmitType<Object>;
    /**
     * Triggers after posting the comment.
     *
     * @event commentEnd
     */
    commentEnd: EmitType<Object>;
    /**
     * Triggers before a file is opened.
     *
     * @event beforeFileOpen
     */
    beforeFileOpen: EmitType<BeforeFileOpenArgs>;
    /**
     * Triggers after deleting the comment.
     *
     * @event commentDelete
     */
    commentDelete: EmitType<CommentDeleteEventArgs>;
    /**
     * Triggers before accepting or rejecting changes.
     *
     * @event beforeAcceptRejectChanges
     */
    beforeAcceptRejectChanges: EmitType<RevisionActionEventArgs>;
    /**
     * Triggers on comment actions(Post, edit, reply, resolve, reopen).
     *
     * @event beforeCommentAction
     */
    beforeCommentAction: EmitType<CommentActionEventArgs>;
    /**
     * Triggers when the trackChanges enabled / disabled.
     *
     * @event trackChange
     */
    trackChange: EmitType<TrackChangeEventArgs>;
    /**
     * Triggers before the form field fill.
     *
     * @event beforeFormFieldFill
     */
    beforeFormFieldFill: EmitType<FormFieldFillEventArgs>;
    /**
     * @private
     */
    beforeContentControlFill: EmitType<ContentControlFillEventArgs>;
    /**
     * @private
     */
    afterContentControlFill: EmitType<ContentControlFillEventArgs>;
    /**
     * Triggers when the server side action fails.
     *
     * @event serviceFailure
     */
    serviceFailure: EmitType<ServiceFailureArgs>;
    /**
     * Triggers after the form field fill.
     *
     * @event afterFormFieldFill
     */
    afterFormFieldFill: EmitType<FormFieldFillEventArgs>;
    /**
     * Triggers when the document editor collaborative actions (such as LockContent, SaveContent, UnlockContent) gets completed.
     *
     * @event actionComplete
     */
    actionComplete: EmitType<CollaborativeEditingEventArgs>;
    /**
     * Triggers when user interaction prevented in content control.
     *
     * @event contentControl
     */
    contentControl: EmitType<Object>;
    /**
     * Triggers before a server request is started, allows you to modify the XMLHttpRequest object (setting additional headers, if needed).
     */
    beforeXmlHttpRequestSend: EmitType<XmlHttpRequestEventArgs>;
    /**
     * Triggers when SFDT is failed to load in the document editor
     */
    documentLoadFailed: EmitType<DocumentLoadFailedEventArgs>;
    /**
     * @private
     */
    externalFonts: ExternalFontInfo[];
    /**
     * @private
     */
    characterFormat: CharacterFormatProperties;
    /**
     * @private
     */
    paragraphFormat: ParagraphFormatProperties;
    /**
     * @private
     */
    sectionFormat: SectionFormatProperties;
    /**
     * @private
     */
    commentReviewPane: CommentReviewPane;
    /**
     * @private
     */
    trackChangesPane: TrackChangesPane;
    /**
     * @private
     */
    rulerContainer: HTMLElement;
    /**
     * @private
     */
    revisionsInternal: RevisionCollection;
    /**
     * @private
     */
    enableDateContentDialog: boolean;
    /**
     * @private
     */
    enablePicContentControlDialog: boolean;
    /**
     * @private
     */
    enableContentControlPropertiesDialog: boolean;
    /**
     * @private
     */
    serverActionSettingsImport: string;
    /**
     * Gets or sets a value indicating whether xml toolbar is enabled or not.
     * @private
     *
     * @default false
     */
    isXmlPaneTool: boolean;
    /**
     * Gets or sets a value indicating whether xml cc is enabled or not.
     * @private
     *
     * @default false
     */
    isXmlMapCC: boolean;
    /**
     * Gets the total number of pages.
     *
     * @returns {number} Returns the page count.
     */
    readonly pageCount: number;
    /**
     * Gets the entire document's comment information.
     *
     * @returns {CommentInfo[]} Returns the collection of comments.
     */
    getComments(): CommentInfo[];
    /**
     * Gets the selection object of the document editor.
     *
     * @default undefined
     * @aspType Selection
     * @returns {Selection} Returns the selection object.
     */
    readonly selection: Selection;
    /**
     * Gets the editor object of the document editor.
     *
     * @aspType Editor
     * @returns {Editor} Returns the editor object.
     */
    readonly editor: Editor;
    /**
     * Gets the editor history object of the document editor.
     *
     * @aspType EditorHistory
     * @returns {EditorHistory} Returns the editor history object.
     */
    readonly editorHistory: EditorHistory;
    /**
     * Gets the search object of the document editor.
     *
     * @aspType Search
     * @returns { Search } Returns the search object.
     */
    readonly search: Search;
    /**
     * Gets the context menu object of the document editor.
     *
     * @aspType ContextMenu
     * @returns {ContextMenu} Returns the context menu object.
     */
    readonly contextMenu: ContextMenu;
    /**
     * Gets the spell check dialog object of the document editor.
     *
     * @returns {SpellCheckDialog} Returns the spell check dialog object.
     */
    readonly spellCheckDialog: SpellCheckDialog;
    /**
     * Gets the spell check object of the document editor.
     *
     * @aspType SpellChecker
     * @returns {SpellChecker} Returns the spell checker object.
     */
    readonly spellChecker: SpellChecker;
    /**
     * @private
     * @returns {string }- Returns the container id.
     */
    readonly containerId: string;
    /**
     * @private
     * @returns {boolean} - Returns true if document is loaded.
     */
    /**
    * @private
    * @param {boolean} value - Specifies whether the document is loaded or not.
    * @returns {void}
    */
    isDocumentLoaded: boolean;
    /**
     *  Describes whether Document contains any content or not
     *
     * @returns {boolean} Returns `true` if Document does not contains any content; otherwise, `false`
     * @aspType bool
     * @default false
     */
    readonly isDocumentEmpty: boolean;
    /**
     * Gets the revision collection which contains information about changes made from original document
     *
     * @returns {RevisionCollection} Returns the revision collection object.
     */
    readonly revisions: RevisionCollection;
    /**
     * Determines whether history needs to be enabled or not.
     *
     * @default - false
     * @private
     * @returns {boolean} Returns true if history module is enabled.
     */
    readonly enableHistoryMode: boolean;
    /**
     * Gets the start text position in the document.
     *
     * @default undefined
     * @private
     * @returns {TextPosition} - Returns the document start.
     */
    readonly documentStart: TextPosition;
    /**
     * Gets the end text position in the document.
     *
     * @default undefined
     * @private
     * @returns {TextPosition} - Returns the document end.
     */
    readonly documentEnd: TextPosition;
    /**
     * @private
     * @returns {TextPosition} - Returns isReadOnlyMode.
     */
    readonly isReadOnlyMode: boolean;
    /**
     * @private
     * @returns {TextPosition} - Returns isSpellCheck.
     */
    readonly isSpellCheck: boolean;
    /**
     * Specifies to enable image resizer option
     *
     * @private
     * @returns {boolean} - Returns enableImageResizerMode.
     */
    readonly enableImageResizerMode: boolean;
    /**
     * Initializes a new instance of the DocumentEditor class.
     *
     * @param {DocumentEditorModel} options Specifies the document editor model.
     * @param {string | HTMLElement} element Specifies the element.
     */
    constructor(options?: DocumentEditorModel, element?: string | HTMLElement);
    protected preRender(): void;
    private updateExternalStyle;
    private clearExistingStyles;
    private initHelper;
    protected render(): void;
    /**
     * @private
     * @returns {void}
     */
    renderRulers(): void;
    /**
     * @private
     * @returns {void}
     */
    showHideRulers(): void;
    private renderNavigationPane;
    /**
     * Get component name
     *
     * @private
     * @returns {string} - Returns module name.
     */
    getModuleName(): string;
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {DocumentEditorModel} model - Specifies the new model.
     * @param {DocumentEditorModel} oldProp - Specifies the old model.
     * @returns {void}
     */
    onPropertyChanged(model: DocumentEditorModel, oldProp: DocumentEditorModel): void;
    private applyColorPickerProperties;
    private localizeDialogs;
    /**
     * Sets the default character format for document editor
     *
     * @param {CharacterFormatProperties} characterFormat Specifies the character format.
     * @returns {void}
     */
    setDefaultCharacterFormat(characterFormat: CharacterFormatProperties): void;
    /**
     * Sets the default paragraph format for document editor
     *
     * @param {ParagraphFormatProperties} paragraphFormat Specifies the paragraph format.
     * @returns {void}
     */
    setDefaultParagraphFormat(paragraphFormat: ParagraphFormatProperties): void;
    /**
     * Sets the default section format for document editor
     *
     * @param {SectionFormatProperties} sectionFormat Specifies the section format.
     * @returns {void}
     */
    setDefaultSectionFormat(sectionFormat: SectionFormatProperties): void;
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - Returns the persisted data.
     */
    getPersistData(): string;
    private clearPreservedCollectionsInViewer;
    /**
     * @private
     * @returns {HTMLElement} - Returns the document editor element.
     */
    getDocumentEditorElement(): HTMLElement;
    /**
     * @private
     * @returns {void}
     */
    fireContentChange(): void;
    /**
     * @private
     * @returns {void}
     */
    fireDocumentChange(): void;
    /**
     * @private
     * @returns {void}
     */
    fireSelectionChange(): void;
    /**
     * @private
     * @returns {void}
     */
    fireZoomFactorChange(): void;
    /**
     * @private
     * @returns {void}
     */
    fireOptionPaneChange(show: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    fireBeformFieldFill(): void;
    /**
     * @private
     * @returns {void}
     */
    fireAfterFormFieldFill(): void;
    /**
     * @private
     * @returns {void}
     */
    fireBeforeContentControlFill(): void;
    /**
     * @private
     * @returns {void}
     */
    fireAfterContentControlFill(): void;
    /**
     * @private
     * @param {ServiceFailureArgs} eventArgs - Specifies the event args.
     * @returns {void}
     */
    fireServiceFailure(eventArgs: ServiceFailureArgs): void;
    /**
     * @private
     * @returns {void}
     */
    fireViewChange(): void;
    /**
     * @private
     * @param {string} item - Specifies the menu items.
     * @returns {void}
     */
    fireCustomContextMenuSelect(item: string): void;
    /**
     * @private
     * @param {string[]} item - Specifies the menu items.
     * @returns {void}
     */
    fireCustomContextMenuBeforeOpen(item: string[]): void;
    /**
     * Shows the Paragraph dialog
     *
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    showParagraphDialog(paragraphFormat?: WParagraphFormat): void;
    /**
     * Shows the margin dialog
     *
     * @private
     * @returns {void}
     */
    showPageSetupDialog(): void;
    /**
     * Shows insert columns dialog
     *
     * @private
     * @returns {void}
     */
    showColumnsDialog(): void;
    /**
     * Shows the Footnote dialog
     *
     * @private
     * @returns {void}
     */
    showFootNotesDialog(): void;
    /**
     * Shows the font dialog
     *
     * @private
     * @param {WCharacterFormat} characterFormat - Specifies character format.
     * @returns {void}
     */
    showFontDialog(characterFormat?: WCharacterFormat): void;
    /**
     * Shows the cell option dialog
     *
     * @private
     * @returns {void}
     */
    showCellOptionsDialog(): void;
    /**
     * Shows the table options dialog.
     *
     * @private
     * @returns {void}
     */
    showTableOptionsDialog(): void;
    /**
     * Shows insert table dialog
     *
     * @private
     * @returns {void}
     */
    showTableDialog(): void;
    /**
     * Shows Date picker content dialog
     *
     * @private
     * @returns {void}
     */
    showDateContentDialog(): void;
    /**
    * Apply Content control properties
    *
    * @private
    * @returns {void}
    */
    showPicContentControlDialog(): void;
    /**
     * Shows Picture Content Control dialog
     *
     * @private
     * @returns {void}
     */
    showpicContentControlDialogModule(): void;
    /**
        * Shows Picture Content Control button
        *
        * @private
        * @returns {void}
    */
    renderPictureContentControlElement(documentEditor: DocumentEditor, showPicContentControl: boolean, pictureElement: boolean, picturePositionY?: number): void;
    /**
        * Update the picture content control dialog position
        *
        * @private
        * @returns {void}
    */
    setPictureContentControlPositions(pictureElement: HTMLElement): void;
    /**
    * @private
    * @returns {ElementBox}
    */
    getImageContentControl(): ElementBox;
    /**
     * Shows content Control properties dialog
     *
     * @private
     * @returns {void}
     */
    showContentPropertiesDialog(): void;
    /**
     * Shows the table of content dialog
     *
     * @private
     * @returns {void}
     */
    showTableOfContentsDialog(): void;
    /**
     * Shows the style dialog
     *
     * @private
     * @returns {void}
     */
    showStyleDialog(): void;
    /**
     * Shows the hyperlink dialog
     *
     * @private
     * @returns {void}
     */
    showHyperlinkDialog(): void;
    /**
     * Shows the bookmark dialog.
     *
     * @private
     * @returns {void}
     */
    showBookmarkDialog(): void;
    /**
     * Shows the styles dialog.
     *
     * @private
     * @returns {void}
     */
    showStylesDialog(): void;
    /**
     * Shows the List dialog
     *
     * @private
     * @returns {void}
     */
    showListDialog(): void;
    /**
     * Shows the table properties dialog
     *
     * @private
     * @returns {void}
     */
    showTablePropertiesDialog(): void;
    /**
     * Shows the borders and shading dialog
     *
     * @private
     * @returns {void}
     */
    showBordersAndShadingDialog(): void;
    protected requiredModules(): ModuleDeclaration[];
    /**
     * @private
     * @param moduleName
     * @param value
     */
    checkModuleInjection(moduleName: string, value: boolean): void;
    /**
     * @private
     */
    defaultLocale: Object;
    /**
     * Opens the given sfdt text or base 64 string or url.
     *
     * @param {string} sfdtText Specifies the sfdt text or base 64 string or url.
     * @returns {void}
     */
    open(inputData: string): void;
    /**
     * Opens the given blob.
     *
     * @param {string} blob Specifies the Blob object containing the document data.
     * @returns {void}
     */
    open(blob: Blob): void;
    /**
     * Opens the given file.
     *
     * @param {string} file Specifies the File object containing the document data..
     * @returns {void}
     */
    open(file: File): void;
    /**
     * Opens the given sfdt text or base 64 string or url.
     *
     * @param {string} sfdtText Specifies the sfdt text or base 64 string or url.
     * @returns {void}
     */
    openAsync(inputData: string): void;
    /**
     * Opens the given blob.
     *
     * @param {string} blob Specifies the Blob object containing the document data.
     * @returns {void}
     */
    openAsync(blob: Blob): void;
    /**
     * Opens the given file.
     *
     * @param {string} file Specifies the File object containing the document data..
     * @returns {void}
     */
    openAsync(file: File): void;
    private openInternal;
    private processSfdt;
    private isValidUrl;
    private isValidBase64;
    private getSfdtFromUrl;
    private convertToSfdt;
    private getSfdtFromBase64string;
    private convertFromBlob;
    private getBlobType;
    private send;
    private convertFromSfdtBlob;
    private failureHandler;
    /**
     * Scrolls view to start of the given page number if exists.
     *
     * @param {number} pageNumber Specifies the page number.
     * @returns {void}
     */
    scrollToPage(pageNumber: number): boolean;
    /**
     * Enables all the modules.
     *
     * @returns {void}
     */
    enableAllModules(): void;
    /**
     * Resizes the component and its sub elements based on given size or container size.
     *
     * @param {number} width Specifies the width
     * @param {number} height Specifies the hight
     * @returns {void}
     */
    resize(width?: number, height?: number): void;
    /**
     * Resize Document Editor
     *
     * @private
     * @returns {void}
     */
    triggerResize(): void;
    /**
     * Gets all the form field names in current document.
     *
     * @returns {string[]} Returns all the form field names in current document.
     */
    getFormFieldNames(): string[];
    /**
     * Gets the form field by name
     *
     * @param {string} name - The form field name.
     * @returns {TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo} Returns the form field info.
     */
    getFormFieldInfo(name: string): TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo;
    /**
     * Sets the form field info with the specified name.
     *
     * @param {string} name Specifies the form field name
     * @param {TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo} formFieldInfo - Form Field info.
     * @returns {void}
     */
    setFormFieldInfo(name: string, formFieldInfo: TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo): void;
    /**
     * Resets the form field value to default with the specified form field name.
     *
     * @param {string} name Specifies the form field name
     * @returns {void}
     */
    resetFormFields(name?: string): void;
    /**
     * Imports the form field values.
     *
     * @param {FormFieldData[]} formData Specifies the form field values.
     * @returns {void}
     */
    importFormData(formData: FormFieldData[]): void;
    /**
     * Exports the form field values.
     *
     * @returns {FormFieldData[]} Returns the form field data.
     */
    exportFormData(): FormFieldData[];
    /**
     * Imports content control data and returns the processed content control information.
     *
     * @param {ContentControlInfo[]} contentControlInfo - The array of content control information to be imported.
     * @returns {ContentControlInfo[]} The processed content control information.
     */
    importContentControlData(contentControlInfo: ContentControlInfo[]): ContentControlInfo[];
    /**
     * Exports the content control values.
     *
     * @returns {ContentControlInfo[]} The array of content control data.
     */
    exportContentControlData(): ContentControlInfo[];
    /**
     * Resets the content control data.
     *
     * @param {ContentControlInfo[]} contentControInfo - The array of content control information to be reset.
     * @returns {void}
     */
    resetContentControlData(contentControInfo: ContentControlInfo[]): void;
    /**
     * @param {TextElementBox} element - Specifies the text element box.
     * @private
     * @returns {string} - Returns the content control value.
     */
    getContentControlValue(element: TextElementBox): string;
    /**
     * @param {ContentControl} element - Specifies the content control.
     * @private
     * @returns {string} - Returns the content control value.
     */
    getContentControlValueForText(element: ContentControl): string;
    /**
     * Updates the fields in the current document.
     * Currently cross reference field only supported.
     *
     * @returns {void}
     */
    updateFields(): void;
    /**
     * Shifts the focus to the document.
     *
     * @returns {void}
     */
    focusIn(): void;
    /**
     * Fits the page based on given fit type.
     *
     * @param {PageFitType} pageFitType - The default value of ‘pageFitType’ parameter is 'None'
     * @returns {void}
     */
    fitPage(pageFitType?: PageFitType): void;
    /**
     * Exports the specified page as image.
     *
     * @param {number} pageNumber Specifies the page number starts from index `1`.
     * @param {number} format Specifies the image format.
     * @returns {HTMLImageElement} Returns the html image element.
     */
    exportAsImage(pageNumber: number, format: ImageFormat): HTMLImageElement;
    /**
     * Exports the specified page as content.
     *
     * @param {number} pageNumber Specifies the page number starts from index `1`.
     * @private
     * @returns {string} Returns the page as content.
     */
    exportAsPath(pageNumber: number): string;
    /**
     * Prints the document.
     *
     * @param {Window} printWindow - Default value of 'printWindow' parameter is undefined.
     * @returns {void}
     */
    print(printWindow?: Window): void;
    /**
     * Serializes the data to JSON string.
     *
     * @returns {string} Returns the data as JSON string.
     */
    serialize(): string;
    /**
     * Saves the document.
     *
     * @param {string} fileName Specifies the file name.
     * @param {FormatType} formatType Specifies the format type.
     * @returns {void}
     */
    save(fileName: string, formatType?: FormatType): void;
    private zipArchiveBlobToSfdtFile;
    /**
     * Saves the document as blob.
     *
     * @param {FormatType} formatType Specifies the format type.
     * @returns {Promise<Blob>} Returns the document as blob.
     */
    saveAsBlob(formatType?: FormatType): Promise<Blob>;
    private getBase64StringFromBlob;
    /**
     * Opens a blank document.
     *
     * @returns {void}
     */
    openBlank(): void;
    /**
     * Gets the style names based on given style type.
     *
     * @param {StyleType} styleType Specifies the style type.
     * @returns {string[]} Returns the style names.
     */
    getStyleNames(styleType?: StyleType): string[];
    /**
     * Gets the style objects on given style type.
     *
     * @param {StyleType} styleType Specifies the style type.
     * @returns {Object[]} Returns the Specifies styles.
     */
    getStyles(styleType?: StyleType): Object[];
    /**
     * Gets the bookmarks.
     *
     * @returns {string[]} Returns the bookmark collection.
     */
    getBookmarks(): string[];
    /**
     * Shows the dialog.
     *
     * @param {DialogType} dialogType Specifies the dialog type.
     * @returns {void}
     */
    showDialog(dialogType: DialogType): void;
    /**
     * @private
     * @returns {void}
     */
    toggleShowHiddenMarksInternal(): void;
    /**
     * Shows the options pane.
     *
     * @returns {void}
     */
    showOptionsPane(): void;
    /**
     * Shows the Xml pane.
     *
     * @returns {void}
     */
    showXmlPane(): void;
    /**
     * Shows the restrict editing pane.
     *
     * @param {boolean} show Specifies to show or hide restrict editing pane.
     * @returns {void}
     */
    showRestrictEditingPane(show?: boolean): void;
    /**
     * Shows the spell check dialog.
     *
     * @private
     * @returns {void}
     */
    showSpellCheckDialog(): void;
    /**
     * Shows the tab dialog.
     *
     * @private
     * @returns {void}
     */
    showTabDialog(): void;
    /**
     * Destroys all managed resources used by this object.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * @param {WStyle} styleInCollection - Specifies the style in collection.
     * @param {WStyle} style - Specifies the style.
     * @private
     * @returns {void} - Returns the void.
     */
    updateStyle(styleInCollection: WStyle, style: WStyle): void;
    private createNewBodyWidget;
    private clearSpellCheck;
    /**
     * @param {string} name - Specifies the name.
     * @param {number} listId - Specifies the list id.
     * @private
     * @returns {void} - Returns the void.
     */
    setStyleData(name: string, listId?: number): void;
    /**
     * Sets custom fonts in the document editor.
     *
     * @param {string | object[]}fonts - A stringified JSON array or an array of objects, where each object defines:
     * - `fontFamily`: The name of the font family.
     * - `src`: A URL or relative path pointing to the font file.
     *
     * Example usage:
     *
     * // Using a stringified JSON array
     * documentEditor.setCustomFonts('[{fontFamily: "Algerian", src: "url('/fonts/myfont.ttf') format('ttf')"}, {fontFamily: "Arial", src: "url('https://example.com/font2.ttf') format('ttf')"}, {fontFamily: "Arial", src: "url('data:font/ttf;base64,d09GRgABAAAAAA...') format('ttf')"}]');
     *
     * // Using an array of objects
     * documentEditor.setCustomFonts([
     * {fontFamily: "Algerian", src: "url('/fonts/myfont.ttf') format('ttf')"},
     * {fontFamily: "Arial", src: "url('https://example.com/font2.ttf') format('ttf')"},
     * {fontFamily: "Arial", src: "url('data:font/ttf;base64,d09GRgABAAAAAA...') format('ttf')"}
     * ]);
     * @returns {void}
     */
    setCustomFonts(fonts: string | object[]): void;
    /**
     *
     * @private
     * @param {Object} style - Specifies the style.
     * @param {number} listId - Specifies the list id.
     * @returns {any} - Returns the style object.
     */
    getStyleObject(style: Object, listId: number): any;
    /**
     * @param {string} name - Specifies the name.
     * @param {boolean} value - Specifies the value.
     * @param {string} hashValue - Specifies the hash value.
     * @param {string} saltValue - Specifies the salt value.
     * @param {ProtectionType} protectionType - Specifies the protection type.
     * @private
     * @returns {void} - Returns the void.
     */
    getSettingData(name: string, value: boolean, hashValue?: string, saltValue?: string, protectionType?: ProtectionType): void;
    private destroyDependentModules;
}
/**
 * The `ServerActionSettings` module is used to provide the server action methods of Document Editor.
 */
export declare class ServerActionSettings extends ChildProperty<ServerActionSettings> {
    /**
     * Specifies the system clipboard action of Document Editor.
     *
     * @default 'SystemClipboard'
     */
    systemClipboard: string;
    /**
     * Specifies the spell check action of Document Editor.
     *
     * @default 'SpellCheck'
     */
    spellCheck: string;
    /**
     * Specifies the spell check by page action of Document Editor.
     *
     * @default 'SpellCheckByPage'
     */
    spellCheckByPage: string;
    /**
     * Specifies the restrict editing encryption/decryption action of Document Editor.
     *
     * @default 'RestrictEditing'
     */
    restrictEditing: string;
    /**
     * Specifies the server action name to lock selected region.
     *
     * @default 'CanLock'
     */
    canLock: string;
    /**
     * Specifies the server action name to pull pending actions.
     *
     * @default 'GetPendingActions'
     */
    getPendingActions: string;
}
/**
 * Form field settings.
 */
export declare class FormFieldSettings extends ChildProperty<FormFieldSettings> {
    /**
     * Gets or sets the form fields shading color.
     * You can customize shading color in application level, but cannot be exported in file level
     *
     * @default '#cfcfcf'
     */
    shadingColor: string;
    /**
     * Gets or sets the whether apply shadings for field or not.
     *
     * @default true
     */
    applyShading: boolean;
    /**
     * Gets or sets the field selection color.
     *
     * @default '#cccccc'
     */
    selectionColor: string;
    /**
     * Gets or sets the form filling mode type.
     *
     * @default 'Popup'
     */
    formFillingMode: FormFillingMode;
    /**
     * Gets or sets the formatting exception.
     *
     * @default []
     */
    formattingExceptions: FormattingExceptions[];
}
/**
 * Represents the collaborative editing settings.
 */
export declare class CollaborativeEditingSettings extends ChildProperty<CollaborativeEditingSettings> {
    /**
     * Gets or sets the collaborative editing room name.
     *
     * @default ''
     */
    roomName: string;
    /**
     * Gets or sets the editable region color.
     */
    editableRegionColor: string;
    /**
     * Gets or sets the locked region color.
     */
    lockedRegionColor: string;
    /**
     * Gets or sets the timeout for syncing content in milliseconds.
     */
    saveTimeout: number;
}
/**
 * The `ServerActionSettings` module is used to provide the server action methods of Document Editor Container.
 */
export declare class ContainerServerActionSettings extends ServerActionSettings {
    /**
     * Specifies the load action of Document Editor.
     *
     * @default 'Import'
     */
    import: string;
}
