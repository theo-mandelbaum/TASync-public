import { Component, INotifyPropertyChanged, ChildProperty, L10n } from '@syncfusion/ej2-base';
import { ModuleDeclaration, EmitType } from '@syncfusion/ej2-base';
import { PdfViewerModel, HighlightSettingsModel, UnderlineSettingsModel, StrikethroughSettingsModel, LineSettingsModel, ArrowSettingsModel, RectangleSettingsModel, CircleSettingsModel, PolygonSettingsModel, StampSettingsModel, StickyNotesSettingsModel, CustomStampSettingsModel, VolumeSettingsModel, RadiusSettingsModel, AreaSettingsModel, PerimeterSettingsModel, DistanceSettingsModel, MeasurementSettingsModel, FreeTextSettingsModel, AnnotationSelectorSettingsModel, TextSearchColorSettingsModel, PageInfoModel, DocumentTextCollectionSettingsModel, TextDataSettingsModel, RectangleBoundsModel, SignatureFieldSettingsModel, InitialFieldSettingsModel, SignatureIndicatorSettingsModel, TextFieldSettingsModel, PasswordFieldSettingsModel, CheckBoxFieldSettingsModel, RadioButtonFieldSettingsModel, DropdownFieldSettingsModel, ListBoxFieldSettingsModel, ItemModel, SignatureDialogSettingsModel, PageOrganizerSettingsModel } from './pdfviewer-model';
import { ToolbarSettingsModel, ShapeLabelSettingsModel, KeyGestureModel, KeyboardCommandModel, CommandManagerModel } from './pdfviewer-model';
import { ServerActionSettingsModel, AjaxRequestSettingsModel, CustomStampModel, CustomToolbarItemModel, HandWrittenSignatureSettingsModel, AnnotationSettingsModel, TileRenderingSettingsModel, ScrollSettingsModel, FormFieldModel, InkAnnotationSettingsModel } from './pdfviewer-model';
import { IAnnotationPoint, IPoint, PdfViewerBase } from './index';
import { Navigation } from './index';
import { Magnification } from './index';
import { Toolbar } from './index';
import { ToolbarItem } from './index';
import { PdfRenderer } from './index';
import { LinkTarget, InteractionMode, SignatureFitMode, AnnotationType, AnnotationToolbarItem, LineHeadStyle, ContextMenuAction, FontStyle, TextAlignment, AnnotationResizerShape, AnnotationResizerLocation, ZoomMode, PrintMode, CursorType, ContextMenuItem, DynamicStampItem, SignStampItem, StandardBusinessStampItem, FormFieldType, AllowedInteraction, AnnotationDataFormat, SignatureType, CommentStatus, SignatureItem, FormDesignerToolbarItem, DisplayMode, Visibility, FormFieldDataFormat, PdfKeys, ModifierKeys, ExtractTextOption } from './base/types';
import { Annotation } from './index';
import { LinkAnnotation } from './index';
import { ThumbnailView } from './index';
import { BookmarkView } from './index';
import { TextSelection } from './index';
import { TextSearch } from './index';
import { AccessibilityTags } from './index';
import { FormFields } from './index';
import { FormDesigner } from './index';
import { Print, CalibrationUnit } from './index';
import { PageOrganizer } from './index';
import { UnloadEventArgs, LoadEventArgs, LoadFailedEventArgs, AjaxRequestFailureEventArgs, PageChangeEventArgs, PageClickEventArgs, ZoomChangeEventArgs, HyperlinkClickEventArgs, HyperlinkMouseOverArgs, ImportStartEventArgs, ImportSuccessEventArgs, ImportFailureEventArgs, ExportStartEventArgs, ExportSuccessEventArgs, ExportFailureEventArgs, AjaxRequestInitiateEventArgs, PageRenderInitiateEventArgs, AjaxRequestSuccessEventArgs, PageRenderCompleteEventArgs, PageOrganizerSaveAsEventArgs } from './index';
import { AnnotationAddEventArgs, AnnotationRemoveEventArgs, AnnotationPropertiesChangeEventArgs, AnnotationResizeEventArgs, AnnotationSelectEventArgs, AnnotationMoveEventArgs, AnnotationDoubleClickEventArgs, AnnotationMouseoverEventArgs, PageMouseoverEventArgs, AnnotationMouseLeaveEventArgs, ButtonFieldClickEventArgs } from './index';
import { TextSelectionStartEventArgs, TextSelectionEndEventArgs, DownloadStartEventArgs, DownloadEndEventArgs, ExtractTextCompletedEventArgs, PrintStartEventArgs, PrintEndEventArgs } from './index';
import { TextSearchStartEventArgs, TextSearchCompleteEventArgs, TextSearchHighlightEventArgs } from './index';
import { CustomContextMenuSelectEventArgs, CustomContextMenuBeforeOpenEventArgs } from './index';
import { PdfAnnotationBase, ZOrderPageTable } from './drawing/pdf-annotation';
import { PdfAnnotationBaseModel, PdfFormFieldBaseModel } from './drawing/pdf-annotation-model';
import { Drawing, ClipBoardObject } from './drawing/drawing';
import { SelectorModel } from './drawing/selector-model';
import { PointModel, IElement, Rect, Point, Size } from '@syncfusion/ej2-drawings';
import { ThumbnailClickEventArgs } from './index';
import { ValidateFormFieldsArgs, BookmarkClickEventArgs, AnnotationUnSelectEventArgs, BeforeAddFreeTextEventArgs, FormFieldFocusOutEventArgs, CommentEventArgs, FormFieldClickArgs, FormFieldAddArgs, FormFieldRemoveArgs, FormFieldPropertiesChangeArgs, FormFieldMouseLeaveArgs, FormFieldMouseoverArgs, FormFieldMoveArgs, FormFieldResizeArgs, FormFieldSelectArgs, FormFieldUnselectArgs, FormFieldDoubleClickArgs, AnnotationMovingEventArgs, KeyboardCustomCommandsEventArgs } from './base';
import { AddSignatureEventArgs, RemoveSignatureEventArgs, MoveSignatureEventArgs, SignaturePropertiesChangeEventArgs, ResizeSignatureEventArgs, SignatureSelectEventArgs, SignatureUnselectEventArgs } from './base';
import { ContextMenuSettingsModel } from './pdfviewer-model';
import { IFormField, IFormFieldBound } from './form-designer/form-designer';
import { ClickEventArgs, MenuItemModel } from '@syncfusion/ej2-navigations';
/**
 * The `ToolbarSettings` module is used to provide the toolbar settings of PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the tool bar settings.
 *  viewer.toolbarSettings = {
 *      showTooltip: false,
 *      toolbarItems: [
 *          "OpenOption",
 *          "UndoRedoTool",
 *          "PageNavigationTool",
 *          "MagnificationTool",
 *          "PanTool",
 *          "SelectionTool",
 *          "CommentTool",
 *          "SubmitForm",
 *          "AnnotationEditTool",
 *          "FormDesignerEditTool",
 *          "FreeTextAnnotationOption",
 *          "InkAnnotationOption",
 *          "ShapeAnnotationOption",
 *          "StampAnnotation",
 *          "SignatureOption",
 *          "SearchOption",
 *          "PrintOption",
 *          "DownloadOption"
 *      ],
 *      annotationToolbarItems: [
 *          "HighlightTool",
 *          "UnderlineTool",
 *          "StrikethroughTool",
 *          "ColorEditTool",
 *          "OpacityEditTool",
 *          "AnnotationDeleteTool",
 *          "StampAnnotationTool",
 *          "HandWrittenSignatureTool",
 *          "InkAnnotationTool",
 *          "ShapeTool",
 *          "CalibrateTool",
 *          "StrokeColorEditTool",
 *          "ThicknessEditTool",
 *          "FreeTextAnnotationTool",
 *          "FontFamilyAnnotationTool",
 *          "FontSizeAnnotationTool",
 *          "FontStylesAnnotationTool",
 *          "FontAlignAnnotationTool",
 *          "FontColorAnnotationTool",
 *          "CommentPanelTool"
 *      ],
 *      formDesignerToolbarItems: [
 *          "TextboxTool",
 *          "PasswordTool",
 *          "CheckBoxTool",
 *          "RadioButtonTool",
 *          "DropdownTool",
 *          "ListboxTool",
 *          "DrawSignatureTool",
 *          "DeleteTool"
 *      ]
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ToolbarSettings extends ChildProperty<ToolbarSettings> {
    /**
     * Enable or disables the toolbar of PdfViewer.
     */
    showTooltip: boolean;
    /**
     * shows only the defined options in the PdfViewer.
     */
    toolbarItems: (CustomToolbarItemModel | ToolbarItem)[];
    /**
     * Provide option to customize the annotation toolbar of the PDF Viewer.
     */
    annotationToolbarItems: AnnotationToolbarItem[];
    /**
     * Customize the tools to be exposed in the form designer toolbar.
     */
    formDesignerToolbarItems: FormDesignerToolbarItem[];
}
/**
 * Defines customized toolbar items.
 */
export declare class CustomToolbarItem extends ChildProperty<CustomToolbarItem> {
    /**
     * Defines single/multiple classes separated by space used to specify an icon for the button.
     * The icon will be positioned before the text content if text is available, otherwise the icon alone will be rendered.
     */
    prefixIcon: string;
    /**
     * Specifies the text to be displayed on the Toolbar button.
     */
    tooltipText: string;
    /**
     * Specifies the unique ID to be used with button or input element of Toolbar items.
     */
    id: string;
    /**
     * Specifies the text to be displayed on the Toolbar button.
     */
    text: string;
    /**
     * Defines single/multiple classes (separated by space) to be used for customization of commands.
     */
    cssClass: string;
    /**
     * Define which side(right/left) to use for customizing the icon.
     */
    align: string;
    /**
     * Specifies the HTML element/element ID as a string that can be added as a Toolbar command.
     */
    template: string | object | Function;
    /**
     * Specify the type or category of the Toolbar item.
     */
    type: string;
}
/**
 * The `AjaxRequestSettings` module is used to set the ajax Request Headers of PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // HTTP header "X-Custom-Header": "Custom header value" // Custom HTTP header
 *  viewer.ajaxRequestSettings = {
 *      ajaxHeaders: [
 *          {
 *              headerName : "Authorization",
 *              headerValue : "Bearer"
 *          }
 *      ],
 *      withCredentials: false
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AjaxRequestSettings extends ChildProperty<AjaxRequestSettings> {
    /**
     * set the ajax Header values in the PdfViewer.
     */
    ajaxHeaders: IAjaxHeaders[];
    /**
     * set the ajax credentials for the pdfviewer.
     */
    withCredentials: boolean;
}
export interface IAjaxHeaders {
    /**
     * specifies the ajax Header Name of the PdfViewer.
     */
    headerName: string;
    /**
     * specifies the ajax Header Value of the PdfViewer.
     */
    headerValue: string;
}
/**
 * The `CustomStamp` module is used to provide the custom stamp added in stamp menu of the PDF Viewer toolbar.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Add your custom stamp image source as base64 image.
 *  viewer.customStamp = [
 *       {
 *          customStampName: 'Sample',
 *          customStampImageSource: "data:image/png;base64, Syncfusion pdf viewer"
 *      }
 *  ];
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class CustomStamp extends ChildProperty<CustomStamp> {
    /**
     * Defines the custom stamp name to be added in stamp menu of the PDF Viewer toolbar.
     */
    customStampName: string;
    /**
     * Defines the custom stamp images source to be added in stamp menu of the PDF Viewer toolbar.
     */
    customStampImageSource: string;
}
/**
 * The `AnnotationToolbarSettings` module is used to provide the annotation toolbar settings of the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the annotation tool bar settings.
 *  viewer.toolbarSettings = {
 *      showTooltip: false,
 *      annotationToolbarItems: [
 *          "HighlightTool",
 *          "UnderlineTool",
 *          "StrikethroughTool",
 *          "ColorEditTool",
 *          "OpacityEditTool",
 *          "AnnotationDeleteTool",
 *          "StampAnnotationTool",
 *          "HandWrittenSignatureTool",
 *          "InkAnnotationTool",
 *          "ShapeTool",
 *          "CalibrateTool",
 *          "StrokeColorEditTool",
 *          "ThicknessEditTool",
 *          "FreeTextAnnotationTool",
 *          "FontFamilyAnnotationTool",
 *          "FontSizeAnnotationTool",
 *          "FontStylesAnnotationTool",
 *          "FontAlignAnnotationTool",
 *          "FontColorAnnotationTool",
 *          "CommentPanelTool"
 *      ],
 *  };
 * viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AnnotationToolbarSettings extends ChildProperty<AnnotationToolbarSettings> {
    /**
     * Enable or disables the tooltip of the toolbar.
     */
    showTooltip: boolean;
    /**
     * shows only the defined options in the PdfViewer.
     */
    annotationToolbarItem: AnnotationToolbarItem[];
}
/**
 * The `FormDesignerToolbarSettings` module is used to provide the Form designer toolbar settings of the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the form field tool bar settings.
 *  viewer.toolbarSettings = {
 *      showTooltip: false,
 *      formDesignerToolbarItems: [
 *          "TextboxTool",
 *          "PasswordTool",
 *          "CheckBoxTool",
 *          "RadioButtonTool",
 *          "DropdownTool",
 *          "ListboxTool",
 *          "DrawSignatureTool",
 *          "DeleteTool"
 *      ]
 *  };
 * viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class FormDesignerToolbarSettings extends ChildProperty<FormDesignerToolbarSettings> {
    /**
     * Enable or disables the tooltip of the toolbar.
     */
    showTooltip: boolean;
    /**
     * shows only the defined options in the PdfViewer.
     */
    formDesignerToolbarItem: FormDesignerToolbarItem[];
}
/**
 * The `SignatureFieldSettings` module is used to set the properties of signature field in PDF Viewer
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the signature field settings.
 *  viewer.signatureFieldSettings = {
 *      name: "",
 *      isReadOnly: true,
 *      visibility: "visible",
 *      isRequired: true,
 *      isPrint: false,
 *      tooltip: "",
 *      thickness: 1,
 *      signatureIndicatorSettings: {
 *          opacity: 1,
 *          backgroundColor: "orange",
 *          width: 19,
 *          height: 10,
 *          fontSize: 10,
 *          text: null,
 *          color: "black"
 *      },
 *      signatureDialogSettings: {
 *          displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
 *          hideSaveSignature: false
 *      }
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class SignatureFieldSettings extends ChildProperty<SignatureFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Specifies whether the signature field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the signature field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the thickness of the Signature field. Default value is 1. To hide the borders, set the value to 0 (zero).
     */
    thickness: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Specifies the properties of the signature Dialog Settings in the signature field.
     */
    signatureDialogSettings: SignatureDialogSettingsModel;
    /**
     * Specifies the properties of the signature indicator in the signature field.
     */
    signatureIndicatorSettings: SignatureIndicatorSettingsModel;
    /**
     * specifies the custom data of the form fields.
     */
    customData: object;
    /**
     * Allows setting the font name for typed signatures at specific indices. The maximum number of font names is limited to 4, so the key values should range from 0 to 3.
     */
    typeSignatureFonts: {
        [key: number]: string;
    };
}
/**
 * The `InitialFieldSettings` module is used to set the properties of initial field in PDF Viewer
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Changes the initial field settings.
 *  viewer.initialFieldSettings = {
 *      name: "",
 *      isReadOnly: true,
 *      visibility: "visible",
 *      isRequired: true,
 *      isPrint: true,
 *      tooltip: "",
 *      thickness: 1,
 *      initialIndicatorSettings: {
 *          opacity: 1,
 *          backgroundColor: "orange",
 *          width: 19,
 *          height: 10,
 *          fontSize: 10,
 *          text: null,
 *          color: "black"
 *      },
 *      initialDialogSettings: {
 *         displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
 *          hideSaveSignature: false
 *      }
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class InitialFieldSettings extends ChildProperty<InitialFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Specifies whether the initial field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the initial field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the thickness of the Initial field. Default value is 1. To hide the borders, set the value to 0 (zero).
     */
    thickness: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Gets or sets the initial field type of the signature field.
     */
    isInitialField: boolean;
    /**
     * Get or set the signature dialog settings for initial field.
     */
    initialDialogSettings: SignatureDialogSettingsModel;
    /**
     * Specifies the properties of the signature indicator in the initial field.
     */
    initialIndicatorSettings: SignatureIndicatorSettingsModel;
    /**
     * specifies the custom data of the form fields.
     */
    customData: object;
    /**
     * Allows setting the font name for typed initials at specific indices. The maximum number of font names is limited to 4, so the key values should range from 0 to 3.
     */
    typeInitialFonts: {
        [key: number]: string;
    };
}
/**
 * The `SignatureIndicatorSettings` module is used to provide the properties of signature Indicator in the signature field.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the signature indicator settings.
 *  viewer.signatureFieldSettings = {
 *      signatureIndicatorSettings: {
 *          opacity: 1,
 *          backgroundColor: 'orange',
 *          width: 19,
 *          height: 10,
 *          fontSize: 10,
 *          text: null,
 *          color: 'black'
 *      }
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class SignatureIndicatorSettings extends ChildProperty<SignatureIndicatorSettings> {
    /**
     * Specifies the opacity of the signature indicator.
     */
    opacity: number;
    /**
     * Specifies the color of the signature indicator.
     */
    backgroundColor: string;
    /**
     * Specifies the width of the signature indicator. Maximum width is half the width of the signature field.
     * Minimum width is the default value.
     */
    width: number;
    /**
     * Specifies the height of the signature indicator. Maximum height is half the height of the signature field.
     * Minimum height is the default value.
     */
    height: number;
    /**
     * Specifies the signature Indicator's font size. The maximum size of the font is half the height of the signature field.
     */
    fontSize: number;
    /**
     * Specifies the text of the signature Indicator.
     */
    text: string;
    /**
     * Specifies the color of the text of signature indicator.
     */
    color: string;
}
/**
 * The `SignatureDialogSettings` module is used to customize the signature dialog box.
 *
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the signature dialog settings.
 *  viewer.signatureDialogSettings = {
 *      displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
 *      hideSaveSignature: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class SignatureDialogSettings extends ChildProperty<SignatureDialogSettings> {
    /**
     * Get or set the required signature options will be enabled in the signature dialog.
     */
    displayMode: DisplayMode;
    /**
     * Get or set a boolean value to show or hide the save signature check box option in the signature dialog. FALSE by default.
     */
    hideSaveSignature: boolean;
}
/**
 * The `ServerActionSettings` module is used to provide the server action methods of PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the server action settings.
 *  viewer.serverActionSettings = {
 *      load: "Load",
 *      renderPages: "RenderPdfPages",
 *      unload: "Unload",
 *      download: "Download",
 *      renderThumbnail: "RenderThumbnailImages",
 *      print: "PrintImages",
 *      renderComments: "RenderAnnotationComments",
 *      importAnnotations: "ImportAnnotations",
 *      exportAnnotations: "ExportAnnotations",
 *      importFormFields: "ImportFormFields",
 *      exportFormFields: "ExportFormFields",
 *      renderTexts: "RenderPdfTexts",
 *      validatePassword: "ValidatePassword"
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ServerActionSettings extends ChildProperty<ServerActionSettings> {
    /**
     * specifies the load action of PdfViewer.
     */
    load: string;
    /**
     * specifies the unload action of PdfViewer.
     */
    unload: string;
    /**
     * specifies the render action of PdfViewer.
     */
    renderPages: string;
    /**
     * specifies the print action of PdfViewer.
     */
    print: string;
    /**
     * specifies the download action of PdfViewer.
     */
    download: string;
    /**
     * specifies the download action of PdfViewer.
     */
    renderThumbnail: string;
    /**
     * specifies the annotation comments action of PdfViewer.
     */
    renderComments: string;
    /**
     * specifies the imports annotations action of PdfViewer.
     */
    importAnnotations: string;
    /**
     * specifies the export annotations action of PdfViewer.
     */
    exportAnnotations: string;
    /**
     * specifies the imports action of PdfViewer.
     */
    importFormFields: string;
    /**
     * specifies the export action of PdfViewer.
     */
    exportFormFields: string;
    /**
     * specifies the export action of PdfViewer.
     */
    renderTexts: string;
    /**
     * Specifies the password validation action of PDF Viewer.
     */
    validatePassword: string;
}
/**
 * The `StrikethroughSettings` module is used to provide the properties to Strikethrough annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the strike through annotation settings.
 *  viewer.strikethroughSettings = {
 *      opacity: 1,
 *      color: '#ff0000',
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges
 *      },
 *      isLock: false,
 *      enableMultiPageAnnotation: false,
 *      enableTextMarkupResizer: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class StrikethroughSettings extends ChildProperty<StrikethroughSettings> {
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set bounds of the annotation.
     *
     * @default []
     */
    bounds: IAnnotationPoint[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * Enables or disables the multi-page text markup annotation selection in UI.
     *
     * @default false
     */
    enableMultiPageAnnotation: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.
     *
     * @default false
     */
    enableTextMarkupResizer: boolean;
    /**
     * Gets or sets the allowed interactions for the locked strikethrough annotations.
     * IsLock can be configured using strikethrough settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `UnderlineSettings` module is used to provide the properties to Underline annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the underline annotation settings.
 *  viewer.underlineSettings = {
 *      opacity: 1,
 *      color: '#9c2592',
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges
 *      },
 *      isLock: false,
 *      enableMultiPageAnnotation: false,
 *      enableTextMarkupResizer: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class UnderlineSettings extends ChildProperty<UnderlineSettings> {
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set bounds of the annotation.
     *
     * @default []
     */
    bounds: IAnnotationPoint[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * Enables or disables the multi-page text markup annotation selection in UI.
     *
     * @default false
     */
    enableMultiPageAnnotation: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.
     *
     * @default false
     */
    enableTextMarkupResizer: boolean;
    /**
     * Gets or sets the allowed interactions for the locked underline annotations.
     * IsLock can be configured using underline settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `HighlightSettings` module is used to provide the properties to Highlight annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the highlight annotation settings.
 *  viewer.highlightSettings = {
 *      opacity: 1,
 *      color: '#ff0000',
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges
 *      },
 *      isLock: false,
 *      enableMultiPageAnnotation: false,
 *      enableTextMarkupResizer: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class HighlightSettings extends ChildProperty<HighlightSettings> {
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set bounds of the annotation.
     *
     * @default []
     */
    bounds: IAnnotationPoint[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * Enables or disables the multi-page text markup annotation selection in UI.
     *
     * @default false
     */
    enableMultiPageAnnotation: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.
     *
     * @default false
     */
    enableTextMarkupResizer: boolean;
    /**
     * Gets or sets the allowed interactions for the locked highlight annotations.
     * IsLock can be configured using highlight settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `LineSettings` module is used to provide the properties to line annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the line annotation settings.
 *  viewer.lineSettings = {
 *      opacity: 1,
 *      color: '#9c2592',
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges
 *      },
 *      isLock: false,
 *      enableMultiPageAnnotation: false,
 *      enableTextMarkupResizer: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class LineSettings extends ChildProperty<LineSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head end style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked highlight annotations.
     * IsLock can be configured using line settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `ArrowSettings` module is used to provide the properties to arrow annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the arrow annotation settings.
 *  viewer.arrowSettings = {
 *      opacity: 1,
 *      fillColor: '#9c2592',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      borderDashArray: 0,
 *      lineHeadStartStyle: 'Closed',
 *      lineHeadEndStyle: 'Closed',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ArrowSettings extends ChildProperty<ArrowSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked arrow annotations.
     * IsLock can be configured using arrow settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `RectangleSettings` module is used to provide the properties to rectangle annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the rectangle annotation settings.
 *  viewer.rectangleSettings = {
 *      opacity: 1,
 *      fillColor: '#9c2592',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class RectangleSettings extends ChildProperty<RectangleSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked rectangle annotations.
     * IsLock can be configured using rectangle settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `CircleSettings` module is used to provide the properties to circle annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the circle annotation settings.
 *  viewer.circleSettings = {
 *      opacity: 1,
 *      fillColor: '#9c2592',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class CircleSettings extends ChildProperty<CircleSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked circle annotations.
     * IsLock can be configured using circle settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `ShapeLabelSettings` module is used to provide the properties to rectangle annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the shape label settings.
 *  viewer.shapeLabelSettings = {
 *      opacity: 1,
 *      fillColor: '#9c2592',
 *      borderColor: '#ff0000',
 *      fontColor: '#000',
 *      fontSize: 16,
 *      labelHeight: 24.6,
 *      labelMaxWidth: 151,
 *      labelContent: 'Label'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ShapeLabelSettings extends ChildProperty<ShapeLabelSettings> {
    /**
     * specifies the opacity of the label.
     */
    opacity: number;
    /**
     * specifies the fill color of the label.
     */
    fillColor: string;
    /**
     * specifies the border color of the label.
     */
    fontColor: string;
    /**
     * specifies the font size of the label.
     */
    fontSize: number;
    /**
     * specifies the max-width of the label.
     */
    fontFamily: string;
    /**
     * specifies the default content of the label.
     */
    labelContent: string;
    /**
     * specifies the default content of the label.
     */
    notes: string;
}
/**
 * The `PolygonSettings` module is used to provide the properties to polygon annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the polygon annotation settings.
 *  viewer.polygonSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class PolygonSettings extends ChildProperty<PolygonSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked polygon annotations.
     * IsLock can be configured using polygon settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `stampSettings` module is used to provide the properties to stamp annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the stamp annotation settings.
 *  viewer.stampSettings = {
 *      opacity: 1,
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'red',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 5,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      dynamicStamps: [
 *          DynamicStampItem.Revised,
 *          DynamicStampItem.Reviewed,
 *          DynamicStampItem.Received,
 *          DynamicStampItem.Confidential,
 *          DynamicStampItem.Approved,
 *          DynamicStampItem.NotApproved
 *      ],
 *      signStamps: [
 *          SignStampItem.Witness,
 *          SignStampItem.InitialHere,
 *          SignStampItem.SignHere,
 *          SignStampItem.Accepted,
 *          SignStampItem.Rejected
 *      ],
 *      standardBusinessStamps: [
 *          StandardBusinessStampItem.Approved,
 *          StandardBusinessStampItem.NotApproved,
 *          StandardBusinessStampItem.Draft,
 *          StandardBusinessStampItem.Final,
 *          StandardBusinessStampItem.Completed,
 *          StandardBusinessStampItem.Confidential,
 *          StandardBusinessStampItem.ForPublicRelease,
 *          StandardBusinessStampItem.NotForPublicRelease,
 *          StandardBusinessStampItem.ForComment,
 *          StandardBusinessStampItem.Void,
 *          StandardBusinessStampItem.PreliminaryResults,
 *          StandardBusinessStampItem.InformationOnly
 *      ],
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class StampSettings extends ChildProperty<StampSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Provide option to define the required dynamic stamp items to be displayed in annotation toolbar menu.
     */
    dynamicStamps: DynamicStampItem[];
    /**
     * Provide option to define the required sign stamp items to be displayed in annotation toolbar menu.
     */
    signStamps: SignStampItem[];
    /**
     * Provide option to define the required standard business stamp items to be displayed in annotation toolbar menu.
     */
    standardBusinessStamps: StandardBusinessStampItem[];
    /**
     * Gets or sets the allowed interactions for the locked stamp annotations.
     * IsLock can be configured using stamp settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `CustomStampSettings` module is used to provide the properties to customstamp annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the custom stamp annotation settings.
 *  viewer.customStampSettings = {
 *      opacity: 1,
 *      author: 'Guest',
 *      width: 0,
 *      height: 0,
 *      left: 0,
 *      top: 0,
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      enableCustomStamp: true,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class CustomStampSettings extends ChildProperty<CustomStampSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the left position of the annotation.
     */
    left: number;
    /**
     * specifies the top position of the annotation.
     */
    top: number;
    /**
     * Specifies to maintain the newly added custom stamp element in the menu items.
     */
    isAddToMenu: boolean;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * Define the custom image path and it's name to be displayed in the menu items.
     */
    customStamps: CustomStampModel[];
    /**
     * If it is set as false. then the custom stamp items won't be visible in the annotation toolbar stamp menu items.
     */
    enableCustomStamp: boolean;
    /**
     * Gets or sets the allowed interactions for the locked custom stamp annotations.
     * IsLock can be configured using custom stamp settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `DistanceSettings` module is used to provide the properties to distance calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the distance annotation settings.
 *  viewer.distanceSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      borderDashArray: 0,
 *      lineHeadStartStyle: 'Closed',
 *      lineHeadEndStyle: 'Closed',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      leaderLength: 40,
 *      resizeCursorType: CursorType.move,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class DistanceSettings extends ChildProperty<DistanceSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the leader length of the annotation.
     */
    leaderLength: number;
    /**
     * Defines the cursor type for distance annotation.
     */
    resizeCursorType: CursorType;
    /**
     * Gets or sets the allowed interactions for the locked distance annotations.
     * IsLock can be configured using distance settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `PerimeterSettings` module is used to provide the properties to perimeter calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the perimeter annotation settings.
 *  viewer.perimeterSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      borderDashArray: 0,
 *      lineHeadStartStyle: 'Open',
 *      lineHeadEndStyle: 'Open',
 *      minHeight: 0, minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class PerimeterSettings extends ChildProperty<PerimeterSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Gets or sets the allowed interactions for the locked perimeter annotations.
     * IsLock can be configured using perimeter settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `AreaSettings` module is used to provide the properties to area calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the area annotation settings.
 *  viewer.areaSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AreaSettings extends ChildProperty<AreaSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Gets or sets the allowed interactions for the locked area annotations.
     * IsLock can be configured using area settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `RadiusSettings` module is used to provide the properties to radius calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the radius annotation settings.
 *  viewer.radiusSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'red',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class RadiusSettings extends ChildProperty<RadiusSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked radius annotations.
     * IsLock can be configured using area settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `VolumeSettings` module is used to provide the properties to volume calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the volume annotation settings.
 *  viewer.volumeSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class VolumeSettings extends ChildProperty<VolumeSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Gets or sets the allowed interactions for the locked volume annotations.
     * IsLock can be configured using volume settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `Ink` module is used to provide the properties to Ink annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the ink annotation settings.
 *  viewer.inkAnnotationSettings = {
 *      author: 'Guest',
 *      opacity: 1,
 *      strokeColor: '#ff0000',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class InkAnnotationSettings extends ChildProperty<InkAnnotationSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * Gets or sets the path of the ink annotation.
     */
    path: string;
    /**
     * Sets the opacity value for ink annotation.By default value is 1. It range varies from 0 to 1.
     */
    opacity: number;
    /**
     * Sets the stroke color for ink annotation.By default values is #FF0000.
     */
    strokeColor: string;
    /**
     * Sets the thickness for the ink annotation. By default value is 1. It range varies from 1 to 10.
     */
    thickness: number;
    /**
     * Define the default option to customize the selector for ink annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * If it is set as true, can't interact with annotation. Otherwise can interact the annotations. By default it is false.
     */
    isLock: boolean;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * Gets or sets the allowed interactions for the locked ink annotations.
     * IsLock can be configured using ink settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies the custom data of the annotation
     */
    customData: object;
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `stickyNotesSettings` module is used to provide the properties to sticky notes annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the sticky notes annotation settings.
 *  viewer.stickyNotesSettings = {
 *      author: 'Guest',
 *      opacity: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'red',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class StickyNotesSettings extends ChildProperty<StickyNotesSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the lock action of the annotation.
     */
    isLock: boolean;
    /**
     * Gets or sets the allowed interactions for the locked sticky notes annotations.
     * IsLock can be configured using sticky notes settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `MeasurementSettings` module is used to provide the settings to measurement annotations.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the measurement annotation settings.
 *  viewer.measurementSettings = {
 *      conversionUnit: 'cm',
 *      displayUnit: 'cm',
 *      scaleRatio: 1,
 *      depth: 96
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class MeasurementSettings extends ChildProperty<MeasurementSettings> {
    /**
     * specifies the scale ratio of the annotation.
     */
    scaleRatio: number;
    /**
     * specifies the unit of the annotation.
     */
    conversionUnit: CalibrationUnit;
    /**
     * specifies the unit of the annotation.
     */
    displayUnit: CalibrationUnit;
    /**
     * specifies the depth of the volume annotation.
     */
    depth: number;
}
/**
 * The `FreeTextSettings` module is used to provide the properties to free text annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the free text annotation settings.
 *  viewer.freeTextSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      borderColor: '#4070FF',
 *      author: 'Guest',
 *      borderWidth: 1,
 *      width: 151,
 *      fontSize: 16,
 *      height: 24.6,
 *      fontColor: '#000',
 *      fontFamily: 'Courier',
 *      defaultText: 'Type Here',
 *      textAlignment: 'Right',
 *      fontStyle: FontStyle.Italic,
 *      allowTextOnly: false,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true,
 *      isReadonly: false,
 *      enableAutoFit: false
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class FreeTextSettings extends ChildProperty<FreeTextSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the border color of the annotation.
     */
    borderColor: string;
    /**
     * specifies the border with of the annotation.
     */
    borderWidth: number;
    /**
     * specifies the border style of the annotation.
     */
    borderStyle: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the background fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the text box font size of the annotation.
     */
    fontSize: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the text box font color of the annotation.
     */
    fontColor: string;
    /**
     * specifies the text box font family of the annotation.
     */
    fontFamily: string;
    /**
     * setting the default text for annotation.
     */
    defaultText: string;
    /**
     * applying the font styles for the text.
     */
    fontStyle: FontStyle;
    /**
     * Aligning the text in the annotation.
     */
    textAlignment: TextAlignment;
    /**
     * specifies the allow text only action of the free text annotation.
     */
    allowEditTextOnly: boolean;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked free text annotations.
     * IsLock can be configured using free text settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * Allow to edit the FreeText annotation. FALSE, by default.
     */
    isReadonly: boolean;
    /**
     * Enable or disable auto fit mode for FreeText annotation in the Pdfviewer. FALSE by default.
     */
    enableAutoFit: boolean;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `AnnotationSelectorSettings` module is used to provide the properties to annotation selectors.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the annotation selector settings.
 *  viewer.annotationSelectorSettings = {
 *      selectionBorderColor: '',
 *      resizerBorderColor: 'Circle',
 *      resizerFillColor: '#4070FF',
 *      resizerSize: 8,
 *      selectionBorderThickness: 1,
 *      resizerShape: 'Square',
 *      selectorLineDashArray: [],
 *      resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *      resizerCursorType: null
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AnnotationSelectorSettings extends ChildProperty<AnnotationSelectorSettings> {
    /**
     * Specifies the selection border color.
     */
    selectionBorderColor: string;
    /**
     * Specifies the border color of the resizer.
     *
     * @ignore
     */
    resizerBorderColor: string;
    /**
     * Specifies the fill color of the resizer.
     *
     * @ignore
     */
    resizerFillColor: string;
    /**
     * Specifies the size of the resizer.
     *
     * @ignore
     */
    resizerSize: number;
    /**
     * Specifies the thickness of the border of selection.
     */
    selectionBorderThickness: number;
    /**
     * Specifies the shape of the resizer.
     */
    resizerShape: AnnotationResizerShape;
    /**
     * Specifies the border dash array of the selection.
     */
    selectorLineDashArray: number[];
    /**
     * Specifies the location of the resizer.
     */
    resizerLocation: AnnotationResizerLocation;
    /**
     * specifies the cursor type of resizer
     */
    resizerCursorType: CursorType;
}
/**
 * The `TextSearchColorSettings` module is used to set the settings for the color of the text search highlight.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the text search color settings.
 *  viewer.textSearchColorSettings = {
 *      searchHighlightColor: '#4070FF',
 *      searchColor: '#FF4081'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class TextSearchColorSettings extends ChildProperty<TextSearchColorSettings> {
    /**
     * Gets or Sets the color of the current occurrence of the text searched string.
     */
    searchHighlightColor: string;
    /**
     * Gets or Sets the color of the other occurrence of the text searched string.
     */
    searchColor: string;
}
/**
 * Represents the information of a specific page within the viewer.
 * This class provides essential information such as the page index, dimensions, and rotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  viewer.appendTo("#pdfViewer");
 *  let pageInfo = viewer.getPageInfo(pageIndex);
 *  console.log(pageInfo);
 * ```
 *
 */
export declare class PageInfo extends ChildProperty<PageInfo> {
    /**
     * The 0-based index of the page.
     */
    pageIndex: number;
    /**
     * The width of the page in points.
     */
    width: number;
    /**
     * The height of the page in points.
     */
    height: number;
    /**
     * The rotation angle of the page in degrees.
     */
    rotation: number;
}
/**
 * The `HandWrittenSignatureSettings` module is used to provide the properties to handwritten signature.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the hand written signature settings.
 *  viewer.handWrittenSignatureSettings = {
 *      signatureItem: [
 *          'Signature',
 *          'Initial'
 *      ],
 *      saveSignatureLimit: 1,
 *      saveInitialLimit: 1,
 *      opacity: 1,
 *      strokeColor: '#000000',
 *      width: 150,
 *      height: 100,
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      allowedInteractions: ['None'],
 *      signatureDialogSettings: {
 *          displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false
 *      },
 *      initialDialogSettings: {
 *          displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
 *      hideSaveSignature: false
 *      }
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class HandWrittenSignatureSettings extends ChildProperty<HandWrittenSignatureSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specified the width of the annotation.
     */
    width: number;
    /**
     * specified the height of the annotation.
     */
    height: number;
    /**
     * Gets or sets the save signature limit of the signature. By default value is 1 and maximum limit is 5.
     */
    saveSignatureLimit: number;
    /**
     * Gets or sets the save initial limit of the initial. By default value is 1 and maximum limit is 5.
     */
    saveInitialLimit: number;
    /**
     * Provide option to define the required signature items to be displayed in signature menu.
     */
    signatureItem: SignatureItem[];
    /**
     * Options to set the type signature font name with respective index and maximum font name limit is 4 so key value should be 0 to 3.
     */
    typeSignatureFonts: {
        [key: number]: string;
    };
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Get or set the Signature DialogSettings for Handwritten signature.
     */
    signatureDialogSettings: SignatureDialogSettingsModel;
    /**
     * Get or set the initialDialogSettings for Handwritten initial.
     */
    initialDialogSettings: SignatureDialogSettingsModel;
    /**
     * Gets or sets the signature offset.
     *
     * @default {x:0,y:0}
     */
    offset: IPoint;
    /**
     * Gets or sets the signature page number.
     *
     * @default 1
     */
    pageNumber: number;
    /**
     * Gets or sets the path of the signature.
     *
     * @default ''
     */
    path: string;
    /**
     * Gets or sets the font family for text signature.
     *
     * @default 'Helvetica'
     */
    fontFamily: string;
    /**
     * Allows saving of programmatically added signatures.
     *
     * @default false
     */
    canSave: boolean;
}
/**
 * The `AnnotationSettings` module is used to provide the properties to annotations.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the annotation settings.
 *  viewer.annotationSettings = {
 *      author: 'Guest',
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      skipPrint: false,
 *      skipDownload: false,
 *      allowedInteractions: ['None']
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AnnotationSettings extends ChildProperty<AnnotationSettings> {
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies whether the annotations are included or not in print actions.
     */
    skipPrint: boolean;
    /**
     * specifies whether the annotations are included or not in download actions.
     */
    skipDownload: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked annotations.
     * IsLock can be configured using annotation settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
}
/**
 * The `DocumentTextCollectionSettings` module is used to provide the properties to DocumentTextCollection.
 */
export declare class DocumentTextCollectionSettings extends ChildProperty<DocumentTextCollectionSettings> {
    /**
     * specifies the text data of the document.
     */
    textData: TextDataSettingsModel[];
    /**
     * specifies the page text of the document.
     */
    pageText: string;
    /**
     * specifies the page size of the document.
     */
    pageSize: number;
}
/**
 * The `TextDataSettings` module is used to provide the properties of text data.
 */
export declare class TextDataSettings extends ChildProperty<TextDataSettings> {
    /**
     * specifies the bounds of the rectangle.
     */
    bounds: RectangleBoundsModel;
    /**
     * specifies the text of the document.
     */
    text: string;
}
/**
 * The `RectangleBounds` module is used to provide the properties of rectangle bounds.
 */
export declare class RectangleBounds extends ChildProperty<RectangleBounds> {
    /**
     * specifies the size of the rectangle.
     */
    size: number;
    /**
     * specifies the x co-ordinate of the upper-left corner of the rectangle.
     */
    x: number;
    /**
     * specifies the y co-ordinate of the upper-left corner of the rectangle.
     */
    y: number;
    /**
     * specifies the width of the rectangle.
     */
    width: number;
    /**
     * specifies the height of the rectangle.
     */
    height: number;
    /**
     * specifies the left value of the rectangle.
     */
    left: number;
    /**
     * specifies the top value of the rectangle.
     */
    top: number;
    /**
     * specifies the right of the rectangle.
     */
    right: number;
    /**
     * specifies the bottom value of the rectangle.
     */
    bottom: number;
    /**
     * Returns true if height and width of the rectangle is zero.
     *
     * @default 'false'
     */
    isEmpty: boolean;
}
/**
 * The `TileRenderingSettings` module is used to provide the tile rendering settings of the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the tile rendering settings.
 *  viewer.tileRenderingSettings = {
 *      enableTileRendering: false,
 *      x: 0,
 *      y: 0
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class TileRenderingSettings extends ChildProperty<TileRenderingSettings> {
    /**
     * Enable or disables tile rendering mode in the PDF Viewer.
     */
    enableTileRendering: boolean;
    /**
     * specifies the tileX count of the render Page.
     */
    x: number;
    /**
     * specifies the tileY count of the render Page.
     */
    y: number;
}
/**
 * The `ScrollSettings` module is used to provide the settings of the scroll of the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the scroll settings.
 *  viewer.scrollSettings = {
 *      delayPageRequestTimeOnScroll: 150
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ScrollSettings extends ChildProperty<ScrollSettings> {
    /**
     * Increase or decrease the delay time.
     */
    delayPageRequestTimeOnScroll: number;
}
/**
 * The `FormField` is used to store the form fields of PDF document.
 */
export declare class FormField extends ChildProperty<FormField> {
    /**
     * Gets the name of the form field.
     */
    name: string;
    /**
     * Specifies whether the check box is in checked state or not.
     */
    isChecked: boolean;
    /**
     * Specifies whether the radio button is in checked state or not.
     */
    isSelected: boolean;
    /**
     * Gets the id of the form field.
     */
    id: string;
    /**
     * Gets or sets the value of the form field.
     */
    value: string;
    /**
     * Gets the type of the form field.
     */
    type: FormFieldType;
    /**
     * If it is set as true, can't edit the form field in the PDF document. By default it is false.
     */
    isReadOnly: boolean;
    /**
     * specifies the type of the signature.
     */
    signatureType: SignatureType[];
    /**
     * specifies the fontName of the signature.
     */
    fontName: string;
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the font family of the form field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the form field.
     */
    fontSize: number;
    /**
     * Get or set the font Style of form field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the form field in hexadecimal string format.
     */
    color: string;
    /**
     * Get or set the background color of the form field in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the text alignment of the form field.
     */
    alignment: TextAlignment;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the maximum character length.
     */
    maxLength: number;
    /**
     * Gets or set the is Required of form field.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the form field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the form field items. This can be Dropdown items or Listbox items.
     */
    options: ItemModel[];
    /**
     * Specifies the properties of the signature indicator in the signature field.
     */
    signatureIndicatorSettings: SignatureIndicatorSettingsModel;
    /**
     * Get or set the thickness of the form field.
     */
    thickness: number;
    /**
     * Get or set the border color of the form field.
     */
    borderColor: string;
    /**
     * Allows multiline input in the text field. FALSE, by default.
     */
    isMultiline: boolean;
    /**
     * Meaningful only if the MaxLength property is set and the Multiline, Password properties are false.
     * If set, the field is automatically divided into as many equally spaced position, or  combs, as the value of MaxLength, and the text is laid out into the combs.
     *
     * @default false
     */
    private insertSpaces;
    /**
     * Get the pageIndex of the form field. Default value is -1.
     */
    pageIndex: number;
    /**
     * Get the pageNumber of the form field. Default value is 1.
     */
    pageNumber: number;
    /**
     * Get the isTransparent of the form field. Default value is false.
     */
    isTransparent: boolean;
    /**
     * Get the rotateAngle of the form field. Default value is 0.
     */
    rotateAngle: number;
    /**
     * Get the selectedIndex of the form field. Default value is null.
     */
    selectedIndex: number[];
    /**
     * Get the zIndex of the form field. Default value is 0.
     */
    zIndex: number;
    /**
     * specifies the custom data of the form field.
     */
    customData: object;
}
/**
 * The `ContextMenuSettings` is used to show the context menu of PDF document.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the settings of the context menu option.
 *  viewer.contextMenuSettings = {
 *      contextMenuAction: 'RightClick',
 *      contextMenuItems: [
 *          ContextMenuItem.Comment,
 *          ContextMenuItem.Copy,
 *          ContextMenuItem.Cut,
 *          ContextMenuItem.Delete,
 *          ContextMenuItem.Highlight,
 *          ContextMenuItem.Paste,
 *          ContextMenuItem.Properties,
 *          ContextMenuItem.ScaleRatio,
 *          ContextMenuItem.Strikethrough,
 *          ContextMenuItem.Underline
 *         ]
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ContextMenuSettings extends ChildProperty<ContextMenuSettings> {
    /**
     * Defines the context menu action.
     *
     * @default RightClick
     */
    contextMenuAction: ContextMenuAction;
    /**
     * Defines the context menu items should be visible in the PDF Viewer.
     *
     *  @default []
     */
    contextMenuItems: ContextMenuItem[];
}
/**
 * The `TextFieldSettings` is used to to show and customize the appearance of text box HTML element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the text field settings.
 *  viewer.textFieldSettings = {
 *      name: '',
 *      value: '',
 *      fontFamily: 'Courier',
 *      fontSize: 10,
 *      fontStyle: 'None',
 *      color: 'black',
 *      borderColor: 'black',
 *      backgroundColor: 'white',
 *      alignment: 'Right',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      maxLength: 0,
 *      isRequired: false,
 *      isPrint: true,
 *      tooltip: '',
 *      thickness: 1,
 *      isMultiline: false
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class TextFieldSettings extends ChildProperty<TextFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Get or set the value of the form field.
     */
    value: string;
    /**
     * Get or set the font family of the textbox field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the textbox field.
     */
    fontSize: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the font Style of textbox field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the textbox in hexadecimal string format.
     */
    color: string;
    /**
     * Get or set the background color of the textbox in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the alignment of the text.
     */
    alignment: TextAlignment;
    /**
     * Specifies whether the textbox field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the maximum character length.
     */
    maxLength: number;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the textbox field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the thickness of the textbox field.
     */
    thickness: number;
    /**
     * Get or set the border color of the textbox field.
     */
    borderColor: string;
    /**
     * Allows multiline input in the text field. FALSE, by default.
     */
    isMultiline: boolean;
    /**
     * specifies the custom data of the form fields.
     */
    customData: object;
}
/**
 * The `PasswordFieldSettings` is used to to show and customize the appearance of password input HTML element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the password field settings.
 *  viewer.passwordFieldSettings = {
 *      name: '',
 *      value: '',
 *      fontFamily: 'Courier',
 *      fontSize: 10,
 *      fontStyle: 'None',
 *      color: 'black',
 *      borderColor: 'black',
 *      backgroundColor: 'white',
 *      alignment: 'Right',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      maxLength: 0,
 *      isRequired: false,
 *      isPrint: true,
 *      tooltip: '',
 *      thickness: 1
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class PasswordFieldSettings extends ChildProperty<PasswordFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Get or set the value of the form field.
     */
    value: string;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the font family of the password field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the password field.
     */
    fontSize: number;
    /**
     * Get or set the font Style of password field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the password field in hexadecimal string format.
     */
    color: string;
    /**
     * Get or set the background color of the password field in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the alignment of the text.
     */
    alignment: TextAlignment;
    /**
     * Specifies whether the password field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the maximum character length.
     */
    maxLength: number;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the password field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the thickness of the password field.
     */
    thickness: number;
    /**
     * Get or set the border color of the password field.
     */
    borderColor: string;
    /**
     * specifies the custom data of the form fields.
     */
    customData: object;
}
/**
 * The `CheckBoxFieldSettings` is used to to show and customize the appearance of check box element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the check box field settings.
 *  viewer.checkBoxFieldSettings = {
 *      name: '',
 *      isChecked: true,
 *      backgroundColor: 'white',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      isPrint: true,
 *      tooltip: '',
 *      isRequired: false,
 *      thickness: 5,
 *      borderColor: 'black'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class CheckBoxFieldSettings extends ChildProperty<CheckBoxFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the check box.
     */
    name: string;
    /**
     * Get or set the value of the check box.
     */
    value: string;
    /**
     * Specifies whether the check box is in checked state or not.
     */
    isChecked: boolean;
    /**
     * Get or set the background color of the check box in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Specifies whether the check box field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the boolean value to print the check box field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the thickness of the check box field.
     */
    thickness: number;
    /**
     * Get or set the border color of the check box field.
     */
    borderColor: string;
    /**
     * specifies the custom data of the form fields.
     */
    customData: object;
}
/**
 * The `RadioButtonFieldSettings` is used to to show and customize the appearance of radio button element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the radio button field settings.
 *  viewer.radioButtonFieldSettings = {
 *      name: '',
 *      isSelected: false,
 *      backgroundColor: 'white',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      isPrint: true,
 *      tooltip: '',
 *      isRequired: false,
 *      thickness: 1,
 *      borderColor: 'black'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class RadioButtonFieldSettings extends ChildProperty<RadioButtonFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Get or set the value of the form field element.
     */
    value: string;
    /**
     * Specifies whether the radio button is in checked state or not.
     */
    isSelected: boolean;
    /**
     * Get or set the background color of the radio button in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Specifies whether the radio button field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the boolean value to print the radio button field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the thickness of the radio button field.
     */
    thickness: number;
    /**
     * Get or set the border color of the radio button field.
     */
    borderColor: string;
    /**
     * specifies the custom data of the form fields.
     */
    customData: object;
}
/**
 * The `DropdownFieldSettings` is used to to show and customize the appearance of drop down element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the drop down field settings.
 *  viewer.DropdownFieldSettings = {
 *      name: '',
 *      isSelected: false,
 *      backgroundColor: 'white',
 *      isReadOnly: true,
 *      visibility: 'visible',
 *      isPrint: true,
 *      tooltip: '',
 *      isRequired: false,
 *      thickness: 5,
 *      borderColor: 'blue'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class DropdownFieldSettings extends ChildProperty<DropdownFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the dropdown.
     */
    name: string;
    /**
     * Get or set the value of the form field.
     */
    value: string;
    /**
     * Get or set the font family of the dropdown field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the dropdown field.
     */
    fontSize: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the font style of dropdown field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the dropdown in hexadecimal string format..
     */
    color: string;
    /**
     * Get or set the background color of the dropdown in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the alignment of the text.
     */
    alignment: TextAlignment;
    /**
     * Specifies whether the dropdown field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the dropdown field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the dropdown items.
     */
    options: ItemModel[];
    /**
     * Get or set the thickness of the drop down field.
     */
    thickness: number;
    /**
     * Get or set the border color of the drop down field.
     */
    borderColor: string;
    /**
     * specifies the custom data of the form fields.
     */
    customData: object;
}
/**
 * The `ListBoxFieldSettings` is used to to show and customize the appearance of list box element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the list box field settings.
 *  viewer.listBoxFieldSettings = {
 *      name: '',
 *      fontFamily: 'Courier',
 *      fontSize: 5,
 *      fontStyle: 'None',
 *      color: 'black',
 *      backgroundColor: 'white',
 *      alignment: 'Right',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      isRequired: false,
 *      isPrint: false,
 *      tooltip: '',
 *      options: [],
 *      thickness: 1,
 *      borderColor: 'black'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ListBoxFieldSettings extends ChildProperty<ListBoxFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Get or set the value of the form field.
     */
    value: string;
    /**
     * Get or set the font family of the listbox field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the listbox field.
     */
    fontSize: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the font Style of listbox field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the listbox in hexadecimal string format.
     */
    color: string;
    /**
     * Get or set the background color of the listbox in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the alignment of the text.
     */
    alignment: TextAlignment;
    /**
     * Specifies whether the listbox field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the listbox field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tool tip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the listbox items.
     */
    options: ItemModel[];
    /**
     * Get or set the thickness of the list box field.
     */
    thickness: number;
    /**
     * Get or set the border color of the list box field.
     */
    borderColor: string;
}
export declare class Item extends ChildProperty<Item> {
    /**
     * Get or set the name.
     */
    itemName: string;
    /**
     * Get or set the value.
     */
    itemValue: string;
}
/**
 * Defines the combination of keys and modifier keys.
 */
export declare class KeyGesture extends ChildProperty<KeyGesture> {
    /**
     * Defines a collection of keys commonly used in Pdf-related operations.
     * * none - no key
     * * N0 = The 0 key
     * * N1 = The 1 key
     * * N2 = The 2 key
     * * N3 = The 3 key
     * * N4 = The 4 key
     * * N5 = The 5 key
     * * N6 = The 6 key
     * * N7 = The 7 key
     * * N8 = The 8 key
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
     *
     * @aspDefaultValueIgnore
     * @aspNumberEnum
     * @default undefined
     */
    pdfKeys: PdfKeys;
    /**
     * Specifies a combination of key modifiers, on recognition of which the command will be executed.
     * * None - no modifiers are pressed
     * * Control - ctrl key
     * * Meta - meta key im mac
     * * Alt - alt key
     * * Shift - shift key
     *
     * @aspDefaultValueIgnore
     * @aspNumberEnum
     * @default undefined
     */
    modifierKeys: ModifierKeys;
}
/**
 * Defines a command and a key gesture to define when the command should be executed.
 */
export declare class KeyboardCommand extends ChildProperty<KeyboardCommand> {
    /**
     * Defines the name of the command.
     *
     * @default ''
     */
    name: string;
    /**
     * Defines a combination of keys and key modifiers, on recognition of which the command will be executed.
     *
     * ```html
     * <div id='pdfViewer'></div>
     * ```
     * ```typescript
     * let pdfViewer: PdfViewer = new PdfViewer({
     * ...
     * commandManager:{
     * commands:[{
     * name:'customCopy',
     * gesture:{
     * key:Keys.G, keyModifiers:KeyModifiers.Shift | KeyModifiers.Alt
     * }
     * }]
     * },
     * ...
     * });
     * pdfViewer.appendTo('#pdfViewer');
     * ```
     *
     * @default {}
     */
    gesture: KeyGestureModel;
}
/**
 * Defines the collection of commands and the corresponding key gestures.
 *```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 * let viewer: PdfViewer = new PdfViewer();
 * viewer.commandManager = {
 *      keyboardCommand: [{
 *          name: 'customCopy',
 *          gesture: {
 *              pdfKeys: PdfKeys.G,
 *              modifierKeys: ModifierKeys.Shift | ModifierKeys.Alt
 *          }
 *       },
 *       {
 *          name: 'customPaste',
 *          gesture: {
 *              pdfKeys: PdfKeys.H,
 *              modifierKeys: ModifierKeys.Shift | ModifierKeys.Alt
 *          }
 *      }]
 * };
 * viewer.appendTo("#pdfViewer");
 * ```
 */
export declare class CommandManager extends ChildProperty<CommandManager> {
    /**
     * Defines the multiple command names with the corresponding command objects.
     *
     * @default []
     */
    keyboardCommand: KeyboardCommandModel[];
}
/**
 * The `PageOrganizerSettings` is allows pages to be deleted, inserted and rotated in the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the page organizer settings.
 *  viewer.pageOrganizerSettings = {
 *           canDelete: true,
 *           canInsert: true,
 *           canRotate: true,
 *           canCopy: true,
 *           canRearrange: true,
 *           canImport: true;
 *   };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class PageOrganizerSettings extends ChildProperty<PageOrganizerSettings> {
    /**
     * Specifies whether the pages can be deleted.
     */
    canDelete: boolean;
    /**
     * Specifies whether the pages can be inserted.
     */
    canInsert: boolean;
    /**
     * Specifies whether the pages can be rotated.
     */
    canRotate: boolean;
    /**
     * Specifies whether the pages can be copied.
     */
    canCopy: boolean;
    /**
     * Specifies whether the pages can be rearranged.
     */
    canRearrange: boolean;
    /**
     * Specifies whether the other PDF document can be imported.
     */
    canImport: boolean;
}
/**
 * Specifies the properties of the text search result bounds.
 */
export interface IPdfRectBounds {
    /**
     * Returns the x position of the rectangle.
     */
    x: number;
    /**
     * Returns the y position of the rectangle.
     */
    y: number;
    /**
     * Returns the rectangle width.
     */
    width: number;
    /**
     * Returns the rectangle height.
     */
    height: number;
}
/**
 * The `SearchResult` provides the page index along with an array of bounds that indicate the locations of the search text identified on that page.
 */
export declare class SearchResult extends ChildProperty<SearchResult> {
    /**
     * Returns the page index of the search text.
     */
    pageIndex: number;
    /**
     * Returns the bounds of the search text.
     */
    bounds: IPdfRectBounds[];
}
/**
 * Represents the PDF viewer component.
 * ```html
 * <div id="pdfViewer"></div>
 * <script>
 *  var pdfViewerObj = new PdfViewer();
 *  pdfViewerObj.appendTo("#pdfViewer");
 * </script>
 * ```
 */
export declare class PdfViewer extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Defines the service url of the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/serviceUrl/index.md' %}{% endcodeBlock %}
     *
     */
    serviceUrl: string;
    /**
     * gets the page count of the document loaded in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/pageCount/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    pageCount: number;
    /**
     *Specifies the document printing quality. The default printing quality is set to 1.0. This limit varies from 0.5 to 5.0. If an invalid value is specified, the default value of 1.0 will be used. For documents with smaller page dimensions, a higher print quality is recommended.
     *
     *{% codeBlock src='pdfviewer/printScaleFactor/index.md' %}{% endBlock %}
     *
     * @default 1.0
     */
    printScaleFactor: number;
    /**
     * Get File byte array of the PDF document.
     *
     * @private
     */
    fileByteArray: Uint8Array;
    /**
     * @private
     * Uploaded File byte array of the PDF document.
     */
    uploadedFileByteArray: Uint8Array;
    /**
     * Checks whether the PDF document is edited.
     *
     * {% codeBlock src='pdfviewer/isDocumentEdited/index.md' %}{% endcodeBlock %}
     *
     * @asptype bool
     * @blazorType bool
     */
    isDocumentEdited: boolean;
    /**
     * Returns the current page number of the document displayed in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/currentPageNumber/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    currentPageNumber: number;
    /**
     * Sets the PDF document path for initial loading.
     *
     * {% codeBlock src='pdfviewer/documentPath/index.md' %}{% endcodeBlock %}
     *
     */
    documentPath: string;
    /**
     * Returns the current zoom percentage of the PdfViewer control.
     *
     * @asptype int
     * @blazorType int
     * @returns {number} - number
     */
    readonly zoomPercentage: number;
    /**
     * Get the Loaded document annotation Collections in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/annotationCollection/index.md' %}{% endcodeBlock %}
     *
     */
    annotationCollection: any[];
    /**
     * Get the Loaded document formField Collections in the PdfViewer control.
     *
     * @private
     */
    formFieldCollection: any[];
    /**
     * Checks if the form fields are loaded for the document in the PdfViewer control.
     *
     * @private
     */
    isFormFieldsLoaded: boolean;
    /**
     * Get the Loaded document signature Collections in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/signatureCollection/index.md' %}{% endcodeBlock %}
     *
     */
    signatureCollection: any[];
    /**
     * Gets or sets the document name loaded in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/fileName/index.md' %}{% endcodeBlock %}
     *
     */
    fileName: string;
    /**
     * Gets or sets the export annotations JSON file name in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/exportAnnotationFileName/index.md' %}{% endcodeBlock %}
     *
     */
    exportAnnotationFileName: string;
    /**
     * Gets or sets the download file name in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/downloadFileName/index.md' %}{% endcodeBlock %}
     *
     */
    downloadFileName: string;
    /**
     * Defines the scrollable height of the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/height/index.md' %}{% endcodeBlock %}
     *
     * @default 'auto'
     */
    height: string | number;
    /**
     * Defines the scrollable width of the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/width/index.md' %}{% endcodeBlock %}
     *
     * @default 'auto'
     */
    width: string | number;
    /**
     * Enable or disables the toolbar of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enableToolbar/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableToolbar: boolean;
    /**
     * Specifies the retry count for the failed requests.
     *
     * {% codeBlock src='pdfviewer/retryCount/index.md' %}{% endcodeBlock %}
     *
     * @default 1
     */
    retryCount: number;
    /**
     * Specifies the response status codes for retrying a failed request with a "3xx", "4xx", or "5xx" response status code.
     * The value can have multiple values, such as [500, 401, 400], and the default value is 500.
     *
     * {% codeBlock src='pdfviewer/retryStatusCodes/index.md' %}{% endcodeBlock %}
     *
     * @default [500]
     */
    retryStatusCodes: number[];
    /**
     * Gets or sets the timeout for retries in seconds.
     *
     * {% codeBlock src='pdfviewer/retryTimeout/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    retryTimeout: number;
    /**
     * Initially renders the first N pages of the PDF document when the document is loaded.
     *
     * {% codeBlock src='pdfviewer/initialRenderPages/index.md' %}{% endcodeBlock %}
     *
     * @default 2
     */
    initialRenderPages: number;
    /**
     * If it is set as false then error message box is not displayed in PDF viewer control.
     *
     * {% codeBlock src='pdfviewer/showNotificationDialog/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    showNotificationDialog: boolean;
    /**
     * Enable or disables the Navigation toolbar of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enableNavigationToolbar/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableNavigationToolbar: boolean;
    /**
     * Enable or disables the Comment Panel of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enableCommentPanel/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableCommentPanel: boolean;
    /**
     * If it set as true, then the command panel show at initial document loading in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/isCommandPanelOpen/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isCommandPanelOpen: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.
     *
     * {% codeBlock src='pdfviewer/enableTextMarkupResizer/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableTextMarkupResizer: boolean;
    /**
     * Enable or disable the multi line text markup annotations in overlapping collections.
     *
     * {% codeBlock src='pdfviewer/enableMultiLineOverlap/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableMultiLineOverlap: boolean;
    /**
     * Checks if the freeText value is valid or not.
     *
     * {% codeBlock src='pdfviewer/isValidFreeText/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isValidFreeText: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially.
     *
     * @deprecated This property renamed into "isAnnotationToolbarVisible"
     * @default false
     */
    isAnnotationToolbarOpen: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially
     * and get the annotation Toolbar Visible status.
     *
     * {% codeBlock src='pdfviewer/isAnnotationToolbarVisible/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isAnnotationToolbarVisible: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially
     * and get the annotation Toolbar Visible status.
     *
     * {% codeBlock src='pdfviewer/isFormDesignerToolbarVisible/index.md' %}{% endcodeBlock %}
     *
     * @public
     * @default false
     */
    isFormDesignerToolbarVisible: boolean;
    /**
     * Enables or disables the multi-page text markup annotation selection in UI.
     *
     * {% codeBlock src='pdfviewer/enableMultiPageAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableMultiPageAnnotation: boolean;
    /**
     * Enable or disables the download option of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enableDownload/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableDownload: boolean;
    /**
     * Enable or disables the print option of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enablePrint/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enablePrint: boolean;
    /**
     * If it is set as FALSE, will suppress the page rotation of Landscape document on print action. By default it is TRUE.
     *
     * {% codeBlock src='pdfviewer/enablePrintRotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enablePrintRotation: boolean;
    /**
     * Specifies a collection of font names as strings. These fonts must be located in the resourceUrl folder.
     *
     * @default []
     */
    customFonts: string[];
    /**
     * Enables or disables the thumbnail view in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/enableThumbnail/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableThumbnail: boolean;
    /**
     * Enable or disable the page organizer in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enablePageOrganizer/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enablePageOrganizer: boolean;
    /**
     * Specifies whether the page organizer dialog will be displayed upon the initial document loading in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/isPageOrganizerOpen/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isPageOrganizerOpen: boolean;
    /**
     * This property allows for control over various page management functionalities within the PDF Viewer. By setting it to `true`, users will be able to delete, insert, rotate pages, rearrange pages. Conversely, setting it to `false` will disable these actions.
     *
     * {% codeBlock src='pdfviewer/pageOrganizerSettings/index.md' %}{% endcodeBlock %}
     *
     */
    pageOrganizerSettings: PageOrganizerSettingsModel;
    /**
     * If it set as true, then the thumbnail view show at initial document loading in the PDF Viewer
     *
     * {% codeBlock src='pdfviewer/isThumbnailViewOpen/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isThumbnailViewOpen: boolean;
    /**
     * Enables or disable saving Hand Written signature as editable in the PDF.
     *
     * {% codeBlock src='pdfviewer/isSignatureEditable/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isSignatureEditable: boolean;
    /**
     * Enables or disables the bookmark view in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/enableBookmark/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableBookmark: boolean;
    /**
     * Enables different levels of extract text for the Standalone PDF Viewer.
     * The choice of `extractTextCompleted` determines the content of the `textData`.
     *
     * **Options:**
     * - `ExtractTextOption.TextAndBounds`: Indicates that both plain text and text with bounds (layout information) are returned.
     * This is the default behavior, providing both the extracted text and its positional data.
     * Use this option when you need both the textual content and its layout information for further processing or analysis.
     * - `ExtractTextOption.TextOnly`: Indicates that only plain text is extracted and returned.
     * This option does not include any additional bounds  information.
     * - `ExtractTextOption.BoundsOnly`: Indicates that text is returned along with layout information, such as bounds or coordinates.
     * This option does not include plain text and is useful when only positional data is required.
     * - `ExtractTextOption.None`: Indicates that no text information is returned. This option is not applicable for the ExtractText method and is only used in the extractTextCompleted event when no text data is available.
     *
     * This property is used to determine how `textData` should be managed during the `extractTextCompleted` event.
     *
     * @default 'TextAndBounds'
     */
    extractTextOption: ExtractTextOption;
    /**
     * Enable or disable session storage for PDF Viewer data.
     * When true, the PDF Viewer stores data in an internal collection instead of session storage.
     * When false, the default session storage mechanism is used.
     *
     * **Remarks:**
     * - Setting `enableLocalStorage` to `true` stores all session-specific data (e.g., form fields, annotations, signatures) in memory, increasing memory usage based on the document size and content complexity.
     * - Larger documents or those with more interactive elements will consume more memory.
     * - Ensure proper cleanup by destroying the PDF Viewer instance when no longer needed to avoid memory leaks.
     *
     * @default false
     */
    enableLocalStorage: boolean;
    /**
     * Enables or disables the bookmark styles in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/enableBookmarkStyles/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableBookmarkStyles: boolean;
    /**
     * Enables or disables the hyperlinks in PDF document.
     *
     * {% codeBlock src='pdfviewer/enableHyperlink/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableHyperlink: boolean;
    /**
     * Enables or disables the handwritten signature in PDF document.
     *
     * {% codeBlock src='pdfviewer/enableHandwrittenSignature/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableHandwrittenSignature: boolean;
    /**
     * If it is set as false, then the ink annotation support in the PDF Viewer will be disabled. By default it is true.
     *
     * {% codeBlock src='pdfviewer/enableInkAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableInkAnnotation: boolean;
    /**
     * restrict zoom request.
     *
     * {% codeBlock src='pdfviewer/restrictZoomRequest/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    restrictZoomRequest: boolean;
    /**
     * Specifies the open state of the hyperlink in the PDF document.
     *
     * {% codeBlock src='pdfviewer/hyperlinkOpenState/index.md' %}{% endcodeBlock %}
     *
     * @default CurrentTab
     */
    hyperlinkOpenState: LinkTarget;
    /**
     * Specifies the state of the ContextMenu in the PDF document.
     *
     * {% codeBlock src='pdfviewer/contextMenuOption/index.md' %}{% endcodeBlock %}
     *
     * @default RightClick
     */
    contextMenuOption: ContextMenuAction;
    /**
     * Disables the menu items in the context menu.
     *
     * {% codeBlock src='pdfviewer/disableContextMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    disableContextMenuItems: ContextMenuItem[];
    /**
     * Gets the form fields present in the loaded PDF document. It used to get the form fields id, name, type and it's values.
     *
     * {% codeBlock src='pdfviewer/formFieldCollections/index.md' %}{% endcodeBlock %}
     *
     */
    formFieldCollections: FormFieldModel[];
    /**
     * Enable or disable the Navigation module of PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableNavigation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableNavigation: boolean;
    /**
     * Enable or disables the auto complete option in form documents.
     *
     * {% codeBlock src='pdfviewer/enableAutoComplete/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAutoComplete: boolean;
    /**
     * Enable or disable the Magnification module of PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableMagnification/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableMagnification: boolean;
    /**
     * Enable or disable the Label for shapeAnnotations of PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableShapeLabel/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableShapeLabel: boolean;
    /**
     * Enable or disable the customization of measure values in PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableImportAnnotationMeasurement/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableImportAnnotationMeasurement: boolean;
    /**
     * Enable or disable the pinch zoom option in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enablePinchZoom/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enablePinchZoom: boolean;
    /**
     * Enable or disable the text selection in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableTextSelection/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableTextSelection: boolean;
    /**
     * Enable or disable the text search in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableTextSearch/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableTextSearch: boolean;
    /**
     * Enable or disable the annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAnnotation: boolean;
    /**
     * Enable or disable the form fields in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableFormFields/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableFormFields: boolean;
    /**
     * Show or hide the form designer tool in the main toolbar of the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableFormDesigner/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableFormDesigner: boolean;
    /**
     * Enable or disable the interaction of form fields in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/designerMode/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    designerMode: boolean;
    /**
     * Enable or disable the form fields validation.
     *
     * {% codeBlock src='pdfviewer/enableFormFieldsValidation/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableFormFieldsValidation: boolean;
    /**
     * Enable if the PDF document contains form fields.
     *
     * {% codeBlock src='pdfviewer/isFormFieldDocument/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isFormFieldDocument: boolean;
    /**
     * Gets or sets a boolean value to show or hide desktop toolbar in mobile devices.
     *
     * {% codeBlock src='pdfviewer/enableDesktopMode/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableDesktopMode: boolean;
    /**
     * Gets or sets a boolean value to show or hide the save signature check box option in the signature dialog.
     * FALSE by default
     *
     * @default false
     * @deprecated
     */
    hideSaveSignature: boolean;
    /**
     * Enable or disable the free text annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableFreeText/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableFreeText: boolean;
    /**
     * Enable or disable the text markup annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableTextMarkupAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableTextMarkupAnnotation: boolean;
    /**
     * Enable or disable the shape annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableShapeAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableShapeAnnotation: boolean;
    /**
     * Enable or disable the calibrate annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableMeasureAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableMeasureAnnotation: boolean;
    /**
     * Enables and disable the stamp annotations when the PDF viewer control is loaded initially.
     *
     * {% codeBlock src='pdfviewer/enableStampAnnotations/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableStampAnnotations: boolean;
    /**
     * Enables and disable the stickyNotes annotations when the PDF viewer control is loaded initially.
     *
     * {% codeBlock src='pdfviewer/enableStickyNotesAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableStickyNotesAnnotation: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially.
     *
     * {% codeBlock src='pdfviewer/enableAnnotationToolbar/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAnnotationToolbar: boolean;
    /**
     * Opens the form designer toolbar when the PDF document is loaded in the PDF Viewer control initially.
     *
     * {% codeBlock src='pdfviewer/enableFormDesignerToolbar/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableFormDesignerToolbar: boolean;
    /**
     * Gets or sets a boolean value to show or hide the bookmark panel while loading a document.
     *
     * {% codeBlock src='pdfviewer/isBookmarkPanelOpen/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isBookmarkPanelOpen: boolean;
    /**
     * Gets or sets a boolean value if initial field selected in form designer toolbar.
     *
     * @private
     * @default false
     */
    isInitialFieldToolbarSelection: boolean;
    /**
     * Sets the interaction mode of the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/interactionMode/index.md' %}{% endcodeBlock %}
     *
     * @default TextSelection
     */
    interactionMode: InteractionMode;
    /**
     * Specifies the rendering mode in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/zoomMode/index.md' %}{% endcodeBlock %}
     *
     * @default Default
     */
    zoomMode: ZoomMode;
    /**
     * Specifies the signature mode in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/signatureFitMode/index.md' %}{% endcodeBlock %}
     *
     * @default Default
     */
    signatureFitMode: SignatureFitMode;
    /**
     * Specifies the print mode in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/printMode/index.md' %}{% endcodeBlock %}
     *
     * @default Default
     */
    printMode: PrintMode;
    /**
     * Sets the initial loading zoom value from 10 to 400 in the PDF Viewer Control.
     *
     * {% codeBlock src='pdfviewer/zoomValue/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    zoomValue: number;
    /**
     * Specifies the minimum acceptable zoom level for the control, with a default value of 10.
     *
     * {% codeBlock src='pdfviewer/minZoom/index.md' %}{% endcodeBlock %}
     *
     * @default 10
     */
    minZoom: number;
    /**
     * Specifies the maximum allowable zoom level for the control, with a default value of 400.
     *
     * {% codeBlock src='pdfviewer/maxZoom/index.md' %}{% endcodeBlock %}
     *
     * @default 400
     */
    maxZoom: number;
    /**
     *  Enable or disable the zoom optimization mode in PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableZoomOptimization/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableZoomOptimization: boolean;
    /**
     * Enable or disable the text extract from the PDF viewer.
     *
     * {% codeBlock src='pdfviewer/isExtractText/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isExtractText: boolean;
    /**
     * Maintain the selection of text markup annotation.
     *
     * {% codeBlock src='pdfviewer/isMaintainSelection/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isMaintainSelection: boolean;
    /**
     *  Get or set the flag to hide the digitally signed field on document loading.
     *
     * @private
     * @default false
     */
    hideEmptyDigitalSignatureFields: boolean;
    /**
     *  Show or hide the digital signature appearance in the document.
     *
     * {% codeBlock src='pdfviewer/showDigitalSignatureAppearance/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    showDigitalSignatureAppearance: boolean;
    /**
     *  Determines whether accessibility tags are enabled or disabled.
     *  Accessibility tags can help make web content more accessible to users with disabilities.
     *
     * {% codeBlock src='pdfviewer/enableAccessibilityTags/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAccessibilityTags: boolean;
    /**
     * Specifies whether to display or remove the untrusted HTML values in the PDF Viewer component.
     *
     * If 'enableHtmlSanitizer' set to true, the component will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @private
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * Customize desired date and time format
     *
     * {% codeBlock src='pdfviewer/dateTimeFormat/index.md' %}{% endcodeBlock %}
     *
     */
    dateTimeFormat: string;
    /**
     * Set the resource URL for assets or the public directory. The standalone PDF Viewer will load its custom resources from this URL.
     *
     * {% codeBlock src='pdfviewer/resourceUrl/index.md' %}{% endcodeBlock %}
     *
     * @remarks
     *
     * Users incorporating custom assets, public directories, or routing setups into their
     * Standalone PDF Viewer applications may face challenges when loading the PDF Viewer
     * libraries from the default assets location. This property addresses these issues by allowing
     * resource URL customization, guaranteeing a smooth integration process for loading libraries
     * in the Standalone PDF Viewer.
     *
     * @default ''
     */
    resourceUrl: string;
    /**
     * Defines the settings of the PDF Viewer toolbar.
     *
     * {% codeBlock src='pdfviewer/toolbarSettings/index.md' %}{% endcodeBlock %}
     *
     */
    toolbarSettings: ToolbarSettingsModel;
    /**
     * Defines the ajax Request settings of the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/ajaxRequestSettings/index.md' %}{% endcodeBlock %}
     *
     */
    ajaxRequestSettings: AjaxRequestSettingsModel;
    /**
     * Defines the stamp items of the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/customStamp/index.md' %}{% endcodeBlock %}
     *
     */
    customStamp: CustomStampModel[];
    /**
     * Defines the settings of the PDF Viewer service.
     *
     * {% codeBlock src='pdfviewer/serverActionSettings/index.md' %}{% endcodeBlock %}
     *
     */
    serverActionSettings: ServerActionSettingsModel;
    /**
     * Get or set the signature field settings.
     *
     * {% codeBlock src='pdfviewer/signatureFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    signatureFieldSettings: SignatureFieldSettingsModel;
    /**
     * Get or set the initial field settings.
     *
     * {% codeBlock src='pdfviewer/initialFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    initialFieldSettings: InitialFieldSettingsModel;
    /**
     * Defines the settings of highlight annotation.
     *
     * {% codeBlock src='pdfviewer/highlightSettings/index.md' %}{% endcodeBlock %}
     *
     */
    highlightSettings: HighlightSettingsModel;
    /**
     * Defines the settings of strikethrough annotation.
     *
     * {% codeBlock src='pdfviewer/strikethroughSettings/index.md' %}{% endcodeBlock %}
     *
     */
    strikethroughSettings: StrikethroughSettingsModel;
    /**
     * Defines the settings of underline annotation.
     *
     * {% codeBlock src='pdfviewer/underlineSettings/index.md' %}{% endcodeBlock %}
     *
     */
    underlineSettings: UnderlineSettingsModel;
    /**
     * Defines the settings of line annotation.
     *
     * {% codeBlock src='pdfviewer/lineSettings/index.md' %}{% endcodeBlock %}
     *
     */
    lineSettings: LineSettingsModel;
    /**
     * Defines the settings of arrow annotation.
     *
     * {% codeBlock src='pdfviewer/arrowSettings/index.md' %}{% endcodeBlock %}
     *
     */
    arrowSettings: ArrowSettingsModel;
    /**
     * Defines the settings of rectangle annotation.
     *
     * {% codeBlock src='pdfviewer/rectangleSettings/index.md' %}{% endcodeBlock %}
     *
     */
    rectangleSettings: RectangleSettingsModel;
    /**
     * Defines the settings of shape label.
     *
     * {% codeBlock src='pdfviewer/shapeLabelSettings/index.md' %}{% endcodeBlock %}
     *
     */
    shapeLabelSettings: ShapeLabelSettingsModel;
    /**
     * Defines the settings of circle annotation.
     *
     * {% codeBlock src='pdfviewer/circleSettings/index.md' %}{% endcodeBlock %}
     *
     */
    circleSettings: CircleSettingsModel;
    /**
     * Defines the settings of polygon annotation.
     *
     * {% codeBlock src='pdfviewer/polygonSettings/index.md' %}{% endcodeBlock %}
     *
     */
    polygonSettings: PolygonSettingsModel;
    /**
     * Defines the settings of stamp annotation.
     *
     * {% codeBlock src='pdfviewer/stampSettings/index.md' %}{% endcodeBlock %}
     *
     */
    stampSettings: StampSettingsModel;
    /**
     * Defines the settings of customStamp annotation.
     *
     * {% codeBlock src='pdfviewer/customStampSettings/index.md' %}{% endcodeBlock %}
     *
     */
    customStampSettings: CustomStampSettingsModel;
    /**
     * Defines the settings of distance annotation.
     *
     * {% codeBlock src='pdfviewer/distanceSettings/index.md' %}{% endcodeBlock %}
     *
     */
    distanceSettings: DistanceSettingsModel;
    /**
     * Defines the settings of perimeter annotation.
     *
     * {% codeBlock src='pdfviewer/perimeterSettings/index.md' %}{% endcodeBlock %}
     *
     */
    perimeterSettings: PerimeterSettingsModel;
    /**
     * Defines the settings of area annotation.
     *
     * {% codeBlock src='pdfviewer/areaSettings/index.md' %}{% endcodeBlock %}
     *
     */
    areaSettings: AreaSettingsModel;
    /**
     * Defines the settings of radius annotation.
     *
     * {% codeBlock src='pdfviewer/radiusSettings/index.md' %}{% endcodeBlock %}
     *
     */
    radiusSettings: RadiusSettingsModel;
    /**
     * Defines the settings of volume annotation.
     *
     * {% codeBlock src='pdfviewer/volumeSettings/index.md' %}{% endcodeBlock %}
     *
     */
    volumeSettings: VolumeSettingsModel;
    /**
     * Defines the settings of stickyNotes annotation.
     *
     * {% codeBlock src='pdfviewer/stickyNotesSettings/index.md' %}{% endcodeBlock %}
     *
     */
    stickyNotesSettings: StickyNotesSettingsModel;
    /**
     * Defines the settings of free text annotation.
     *
     * {% codeBlock src='pdfviewer/freeTextSettings/index.md' %}{% endcodeBlock %}
     *
     */
    freeTextSettings: FreeTextSettingsModel;
    /**
     * Defines the settings of measurement annotation.
     *
     * {% codeBlock src='pdfviewer/measurementSettings/index.md' %}{% endcodeBlock %}
     *
     */
    measurementSettings: MeasurementSettingsModel;
    /**
     * Defines the settings of annotation selector.
     *
     * {% codeBlock src='pdfviewer/annotationSelectorSettings/index.md' %}{% endcodeBlock %}
     *
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Sets the settings for the color of the text search highlight.
     *
     * {% codeBlock src='pdfviewer/textSearchColorSettings/index.md' %}{% endcodeBlock %}
     *
     */
    textSearchColorSettings: TextSearchColorSettingsModel;
    /**
     * Get or set the signature dialog settings for signature field.
     *
     * {% codeBlock src='pdfviewer/signatureDialogSettings/index.md' %}{% endcodeBlock %}
     *
     */
    signatureDialogSettings: SignatureDialogSettingsModel;
    /**
     * Get or set the signature dialog settings for initial field.
     *
     * {% codeBlock src='pdfviewer/initialDialogSettings/index.md' %}{% endcodeBlock %}
     *
     */
    initialDialogSettings: SignatureDialogSettingsModel;
    /**
     * Defines the settings of handWrittenSignature.
     *
     * {% codeBlock src='pdfviewer/handWrittenSignatureSettings/index.md' %}{% endcodeBlock %}
     *
     */
    handWrittenSignatureSettings: HandWrittenSignatureSettingsModel;
    /**
     * Defines the ink annotation settings for PDF Viewer.It used to customize the strokeColor, thickness, opacity of the ink annotation.
     *
     * {% codeBlock src='pdfviewer/inkAnnotationSettings/index.md' %}{% endcodeBlock %}
     *
     */
    inkAnnotationSettings: InkAnnotationSettingsModel;
    /**
     * Defines the settings of the annotations.
     *
     * {% codeBlock src='pdfviewer/annotationSettings/index.md' %}{% endcodeBlock %}
     *
     */
    annotationSettings: AnnotationSettingsModel;
    /**
     * Defines the tile rendering settings.
     *
     * {% codeBlock src='pdfviewer/tileRenderingSettings/index.md' %}{% endcodeBlock %}
     *
     */
    tileRenderingSettings: TileRenderingSettingsModel;
    /**
     * Defines the scroll settings.
     *
     * {% codeBlock src='pdfviewer/scrollSettings/index.md' %}{% endcodeBlock %}
     *
     */
    scrollSettings: ScrollSettingsModel;
    /**
     * Get or set the text field settings.
     *
     * {% codeBlock src='pdfviewer/textFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    textFieldSettings: TextFieldSettingsModel;
    /**
     * Get or set the password field settings.
     *
     * {% codeBlock src='pdfviewer/passwordFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    passwordFieldSettings: PasswordFieldSettingsModel;
    /**
     * Get or set the check box field settings.
     *
     * {% codeBlock src='pdfviewer/checkBoxFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    checkBoxFieldSettings: CheckBoxFieldSettingsModel;
    /**
     * Get or set the radio button field settings.
     *
     * {% codeBlock src='pdfviewer/radioButtonFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    radioButtonFieldSettings: RadioButtonFieldSettingsModel;
    /**
     * Get or set the dropdown field settings.
     *
     * {% codeBlock src='pdfviewer/DropdownFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    DropdownFieldSettings: DropdownFieldSettingsModel;
    /**
     * Get or set the listbox field settings.
     *
     * {% codeBlock src='pdfviewer/listBoxFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    listBoxFieldSettings: ListBoxFieldSettingsModel;
    /**
     * Defines the context menu settings.
     *
     * {% codeBlock src='pdfviewer/contextMenuSettings/index.md' %}{% endcodeBlock %}
     *
     */
    contextMenuSettings: ContextMenuSettingsModel;
    /**
     * Defines the custom context menu items.
     *
     * @private
     */
    customContextMenuItems: MenuItemModel[];
    /**
     * Defines the custom context menu items.
     *
     * @private
     */
    disableDefaultContextMenu: boolean;
    /**
     * Defines the custom context menu items.
     *
     * @private
     */
    showCustomContextMenuBottom: boolean;
    /**
     * Defines a set of custom commands and binds them with a set of desired key gestures.
     *
     * {% codeBlock src='pdfviewer/commandManager/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    commandManager: CommandManagerModel;
    /**
     * @private
     */
    viewerBase: PdfViewerBase;
    /**
     * @private
     */
    drawing: Drawing;
    /**
     * @private
     */
    /**
     * Defines the collection of selected items, size and position of the selector
     *
     * @default {}
     */
    selectedItems: SelectorModel;
    /**
     * @private
     */
    adornerSvgLayer: SVGSVGElement;
    /**
     * @private
     */
    zIndex: number;
    /**
     * @private
     */
    nameTable: {};
    /**   @private  */
    clipboardData: ClipBoardObject;
    /**
     * @private
     */
    zIndexTable: ZOrderPageTable[];
    /**
     * @private
     */
    navigationModule: Navigation;
    /**
     * @private
     */
    toolbarModule: Toolbar;
    /**
     * @private
     */
    magnificationModule: Magnification;
    /**
     * @private
     */
    linkAnnotationModule: LinkAnnotation;
    /** @hidden */
    localeObj: L10n;
    /**
     * @private
     */
    thumbnailViewModule: ThumbnailView;
    /**
     * @private
     */
    bookmarkViewModule: BookmarkView;
    /**
     * @private
     */
    textSelectionModule: TextSelection;
    /**
     * @private
     */
    textSearchModule: TextSearch;
    /**
     * @private
     */
    printModule: Print;
    /**
     * @private
     */
    annotationModule: Annotation;
    /**
     * @private
     */
    formFieldsModule: FormFields;
    /**
     * @private
     */
    formDesignerModule: FormDesigner;
    /**
     * @private
     */
    accessibilityTagsModule: AccessibilityTags;
    /**
     * @private
     */
    pdfRendererModule: PdfRenderer;
    /**
     * @private
     */
    pageOrganizerModule: PageOrganizer;
    private isTextSelectionStarted;
    /**
     * @private
     */
    _dotnetInstance: any;
    /**
     * Gets the bookmark view object of the pdf viewer.
     *
     * @asptype BookmarkView
     * @blazorType BookmarkView
     * @returns { BookmarkView } - Bookmark view module
     */
    readonly bookmark: BookmarkView;
    /**
     * Gets the print object of the pdf viewer.
     *
     * @asptype Print
     * @blazorType Print
     * @returns { Print } - Print module
     */
    readonly print: Print;
    /**
     * Gets the magnification object of the pdf viewer.
     *
     * @asptype Magnification
     * @blazorType Magnification
     * @returns { Magnification } - Magnification module
     */
    readonly magnification: Magnification;
    /**
     * Gets the navigation object of the pdf viewer.
     *
     * @asptype Navigation
     * @blazorType Navigation
     * @returns { Navigation } - Navigation module
     */
    readonly navigation: Navigation;
    /**
     * Gets the text search object of the pdf viewer.
     *
     * @asptype TextSearch
     * @blazorType TextSearch
     * @returns { TextSearch } - Text search module
     */
    readonly textSearch: TextSearch;
    /**
     * Gets the toolbar object of the pdf viewer.
     *
     * @asptype Toolbar
     * @blazorType Toolbar
     * @returns { Toolbar } - Toolbar module
     */
    readonly toolbar: Toolbar;
    /**
     * Gets the thumbnail-view object of the pdf viewer.
     *
     * @asptype ThumbnailView
     * @blazorType ThumbnailView
     * @returns { ThumbnailView } - Thumbnail view module
     */
    readonly thumbnailView: ThumbnailView;
    /**
     * Gets the annotation object of the pdf viewer.
     *
     * @asptype Annotation
     * @blazorType Annotation
     * @returns { Annotation } - Annotation module
     */
    readonly annotation: Annotation;
    /**
     * Gets the FormDesigner object of the pdf viewer.
     *
     * @asptype FormDesigner
     * @blazorType FormDesigner
     * @returns { FormDesigner } - Form designer module
     */
    readonly formDesigner: FormDesigner;
    /**
     * Gets the TextSelection object of the pdf viewer.
     *
     * @asptype TextSelection
     * @blazorType TextSelection
     * @returns { TextSelection } - Text selection module
     */
    readonly textSelection: TextSelection;
    /**
     * Gets the Accessibility Tags object of the pdf viewer.
     *
     * @asptype AccessibilityTags
     * @blazorType AccessibilityTags
     * @returns { AccessibilityTags } - Accessibility tags module
     */
    readonly accessibilityTags: AccessibilityTags;
    /**
     * Gets the Pdf renderer object of the pdf renderer.
     *
     * @asptype PdfRenderer
     * @blazorType PdfRenderer
     * @returns { PdfRenderer } - Pdf renderer module
     * @private
     */
    readonly pdfRenderer: PdfRenderer;
    /**
     * Gets the page organizer object of the PDF Viewer.
     *
     * @asptype PageOrganizer
     * @blazorType PageOrganizer
     * @returns { PageOrganizer } - Page organizer module
     */
    readonly pageOrganizer: PageOrganizer;
    /**
     * Triggers during the creation of the PDF viewer component.
     *
     * @event created
     * @blazorProperty 'Created'
     */
    created: EmitType<void>;
    /**
     * Triggers after loading the Pdfium resources.
     *
     * @event resourcesLoaded
     */
    resourcesLoaded: EmitType<void>;
    /**
     * Triggers while loading document into PDF viewer.
     *
     * @event documentLoad
     * @blazorProperty 'DocumentLoaded'
     */
    documentLoad: EmitType<LoadEventArgs>;
    /**
     * Triggers while closing the document.
     *
     * @event documentUnload
     * @blazorProperty 'DocumentUnloaded'
     */
    documentUnload: EmitType<UnloadEventArgs>;
    /**
     * Triggers while document loading failed in PdfViewer.
     *
     * @event documentLoadFailed
     * @blazorProperty 'DocumentLoadFailed'
     */
    documentLoadFailed: EmitType<LoadFailedEventArgs>;
    /**
     * Triggers when the AJAX request is failed.
     *
     * @event ajaxRequestFailed
     * @blazorProperty 'AjaxRequestFailed'
     */
    ajaxRequestFailed: EmitType<AjaxRequestFailureEventArgs>;
    /**
     * Triggers on successful AJAX request.
     *
     * @event ajaxRequestSuccess
     */
    ajaxRequestSuccess: EmitType<AjaxRequestSuccessEventArgs>;
    /**
     * Triggers upon completion of page rendering.
     *
     * @event pageRenderComplete
     */
    pageRenderComplete: EmitType<PageRenderCompleteEventArgs>;
    /**
     * Triggers when validation is failed.
     *
     * @event validateFormFields
     * @blazorProperty 'validateFormFields'
     */
    validateFormFields: EmitType<ValidateFormFieldsArgs>;
    /**
     * Triggers when the mouse click is performed over the page of the PDF document.
     *
     * @event pageClick
     * @blazorProperty 'OnPageClick'
     */
    pageClick: EmitType<PageClickEventArgs>;
    /**
     * Triggers when there is change in current page number.
     *
     * @event pageChange
     * @blazorProperty 'PageChanged'
     */
    pageChange: EmitType<PageChangeEventArgs>;
    /**
     * Triggers when a hyperlink in a PDF document is clicked.
     *
     * @event hyperlinkClick
     * @blazorProperty 'OnHyperlinkClick'
     */
    hyperlinkClick: EmitType<HyperlinkClickEventArgs>;
    /**
     * Triggers when hyperlink in a PDF document is hovered.
     *
     * @event hyperlinkMouseOver
     * @blazorProperty 'OnHyperlinkMouseOver'
     */
    hyperlinkMouseOver: EmitType<HyperlinkMouseOverArgs>;
    /**
     * Triggers When the magnification value changes.
     *
     * @event zoomChange
     * @blazorProperty 'ZoomChanged'
     */
    zoomChange: EmitType<ZoomChangeEventArgs>;
    /**
     * Triggers when an annotation is added to a PDF document's page.
     *
     * @event annotationAdd
     * @blazorProperty 'AnnotationAdded'
     */
    annotationAdd: EmitType<AnnotationAddEventArgs>;
    /**
     * Triggers when an annotation is removed from a PDF document's page.
     *
     * @event annotationRemove
     * @blazorProperty 'AnnotationRemoved'
     */
    annotationRemove: EmitType<AnnotationRemoveEventArgs>;
    /**
     * Triggers when the annotation's property is modified on a PDF document page.
     *
     * @event annotationPropertiesChange
     * @blazorProperty 'AnnotationPropertiesChanged'
     */
    annotationPropertiesChange: EmitType<AnnotationPropertiesChangeEventArgs>;
    /**
     * Triggers when an annotation is resized over the page of a PDF document.
     *
     * @event annotationResize
     * @blazorProperty 'AnnotationResized'
     */
    annotationResize: EmitType<AnnotationResizeEventArgs>;
    /**
     * Triggers when a signature is added to a page of a PDF document.
     *
     * @event addSignature
     */
    addSignature: EmitType<AddSignatureEventArgs>;
    /**
     * Triggers when the signature is removed from the page of a PDF document.
     *
     * @event removeSignature
     */
    removeSignature: EmitType<RemoveSignatureEventArgs>;
    /**
     * Triggers when a signature is moved across the page of a PDF document.
     *
     * @event moveSignature
     */
    moveSignature: EmitType<MoveSignatureEventArgs>;
    /**
     * Triggers when the property of the signature is changed in the page of the PDF document.
     *
     * @event signaturePropertiesChange
     */
    signaturePropertiesChange: EmitType<SignaturePropertiesChangeEventArgs>;
    /**
     * Triggers when the signature is resized and placed on a page of a PDF document.
     *
     * @event resizeSignature
     */
    resizeSignature: EmitType<ResizeSignatureEventArgs>;
    /**
     * Triggers when signature is selected over the page of the PDF document.
     *
     * @event signatureSelect
     */
    signatureSelect: EmitType<SignatureSelectEventArgs>;
    /**
     * Triggers when signature is unselected over the page of the PDF document.
     *
     * @event signatureUnselect
     */
    signatureUnselect: EmitType<SignatureUnselectEventArgs>;
    /**
     * Triggers when an annotation is selected over the page of the PDF document.
     *
     * @event annotationSelect
     * @blazorProperty 'AnnotationSelected'
     */
    annotationSelect: EmitType<AnnotationSelectEventArgs>;
    /**
     * Triggers when an annotation is unselected over the page of the PDF document.
     *
     * @event annotationUnSelect
     * @blazorProperty 'AnnotationUnSelect'
     */
    annotationUnSelect: EmitType<AnnotationUnSelectEventArgs>;
    /**
     * Triggers when the annotation is double clicked.
     *
     * @event annotationDoubleClick
     * @blazorProperty 'OnAnnotationDoubleClick'
     */
    annotationDoubleClick: EmitType<AnnotationDoubleClickEventArgs>;
    /**
     * Triggers when an annotation is moved over the page of the PDF document.
     *
     * @event annotationMove
     * @blazorProperty 'AnnotationMoved'
     */
    annotationMove: EmitType<AnnotationMoveEventArgs>;
    /**
     * Triggers while moving an annotation.
     *
     * @event annotationMoving
     * @blazorProperty 'AnnotationMoving'
     */
    annotationMoving: EmitType<AnnotationMovingEventArgs>;
    /**
     * Triggers when the mouse is moved over the annotation object.
     *
     * @event annotationMouseover
     */
    annotationMouseover: EmitType<AnnotationMouseoverEventArgs>;
    /**
     * Triggers when the user mouse moves away from the annotation object.
     *
     * @event annotationMouseLeave
     */
    annotationMouseLeave: EmitType<AnnotationMouseLeaveEventArgs>;
    /**
     * Triggers when moving the mouse over the page.
     *
     * @event pageMouseover
     */
    pageMouseover: EmitType<PageMouseoverEventArgs>;
    /**
     * Triggers when an imported annotation started to appear in the PDF document.
     *
     * @event importStart
     * @blazorProperty 'ImportStarted'
     */
    importStart: EmitType<ImportStartEventArgs>;
    /**
     * Triggers when an exported annotation started in the PDF Viewer.
     *
     * @event exportStart
     * @blazorProperty 'ExportStarted'
     */
    exportStart: EmitType<ExportStartEventArgs>;
    /**
     * Triggers when the annotations in a PDF document are successfully imported.
     *
     * @event importSuccess
     * @blazorProperty 'ImportSucceed'
     */
    importSuccess: EmitType<ImportSuccessEventArgs>;
    /**
     * Triggers when the annotations in a PDF document are successfully exported.
     *
     * @event exportSuccess
     * @blazorProperty 'ExportSucceed'
     */
    exportSuccess: EmitType<ExportSuccessEventArgs>;
    /**
     * Triggers when the annotations imports in a PDF document fails.
     *
     * @event importFailed
     * @blazorProperty 'ImportFailed'
     */
    importFailed: EmitType<ImportFailureEventArgs>;
    /**
     * Triggers when the annotations export in a PDF document fails.
     *
     * @event exportFailed
     * @blazorProperty 'ExportFailed'
     */
    exportFailed: EmitType<ExportFailureEventArgs>;
    /**
     * Triggers when an text extraction is completed in the PDF Viewer.
     *
     * @event extractTextCompleted
     * @blazorProperty 'ExtractTextCompleted'
     */
    extractTextCompleted: EmitType<ExtractTextCompletedEventArgs>;
    /**
     * Triggers when the thumbnail in the PDF Viewer's thumbnail panel is clicked.
     *
     * @event thumbnailClick
     * @blazorProperty 'OnThumbnailClick'
     */
    thumbnailClick: EmitType<ThumbnailClickEventArgs>;
    /**
     * Triggers when the bookmark is clicked in the PDF Viewer's bookmark panel.
     *
     * @event bookmarkClick
     * @blazorProperty 'BookmarkClick'
     */
    bookmarkClick: EmitType<BookmarkClickEventArgs>;
    /**
     * Triggers when custom toolbar item is clicked.
     *
     * @event toolbarClick
     * @blazorProperty 'ToolbarClick'
     */
    toolbarClick: EmitType<ClickEventArgs>;
    /**
     * Triggers when the text selection is initiated.
     *
     * @event textSelectionStart
     * @blazorProperty 'OnTextSelectionStart'
     */
    textSelectionStart: EmitType<TextSelectionStartEventArgs>;
    /**
     * Triggers when the text selection is complete.
     *
     * @event textSelectionEnd
     * @blazorProperty 'OnTextSelectionEnd'
     */
    textSelectionEnd: EmitType<TextSelectionEndEventArgs>;
    /**
     * Triggers when the download action is initiated.
     *
     * @event downloadStart
     * @blazorProperty 'DownloadStart'
     */
    downloadStart: EmitType<DownloadStartEventArgs>;
    /**
     * Triggers when the button is clicked.
     *
     * @deprecated This property renamed into "formFieldClick"
     * @event buttonFieldClick
     * @blazorProperty 'ButtonFieldClick'
     */
    buttonFieldClick: EmitType<ButtonFieldClickEventArgs>;
    /**
     * Triggers when the form field is selected.
     *
     * @event formFieldClick
     * @blazorProperty 'FormFieldClick'
     */
    formFieldClick: EmitType<FormFieldClickArgs>;
    /**
     * Triggers when the download actions are completed.
     *
     * @event downloadEnd
     * @blazorProperty 'DownloadEnd'
     */
    downloadEnd: EmitType<DownloadEndEventArgs>;
    /**
     * Triggers when the print action is initiated.
     *
     * @event printStart
     * @blazorProperty 'PrintStart'
     */
    printStart: EmitType<PrintStartEventArgs>;
    /**
     * Triggers when the print actions are completed.
     *
     * @event printEnd
     * @blazorProperty 'PrintEnd'
     */
    printEnd: EmitType<PrintEndEventArgs>;
    /**
     * Triggers when the text search is initiated.
     *
     * @event textSearchStart
     * @blazorProperty 'OnTextSearchStart'
     */
    textSearchStart: EmitType<TextSearchStartEventArgs>;
    /**
     * Triggers when the text search is completed.
     *
     * @event textSearchComplete
     * @blazorProperty 'OnTextSearchComplete'
     */
    textSearchComplete: EmitType<TextSearchCompleteEventArgs>;
    /**
     * Triggers when the text search text is highlighted.
     *
     * @event textSearchHighlight
     * @blazorProperty 'OnTextSearchHighlight'
     */
    textSearchHighlight: EmitType<TextSearchHighlightEventArgs>;
    /**
     * Triggers before the data is sent to the server.
     *
     * @event ajaxRequestInitiate
     */
    ajaxRequestInitiate: EmitType<AjaxRequestInitiateEventArgs>;
    /**
     * Triggers upon the initiation of page rendering.
     *
     * @event pageRenderInitiate
     */
    pageRenderInitiate: EmitType<PageRenderInitiateEventArgs>;
    /**
     * Triggers when a comment for the annotation is added to the comment panel.
     *
     * @event commentAdd
     * @blazorProperty 'commentAdd'
     */
    commentAdd: EmitType<CommentEventArgs>;
    /**
     * Triggers when the comment for the annotation in the comment panel is edited.
     *
     * @event commentEdit
     * @blazorProperty 'commentEdit'
     */
    commentEdit: EmitType<CommentEventArgs>;
    /**
     * Triggers when the comment for the annotation in the comment panel is deleted.
     *
     * @event commentDelete
     * @blazorProperty 'commentDelete'
     */
    commentDelete: EmitType<CommentEventArgs>;
    /**
     * Triggers when the comment for the annotation in the comment panel is selected.
     *
     * @event commentSelect
     * @blazorProperty 'commentSelect
     */
    commentSelect: EmitType<CommentEventArgs>;
    /**
     * Triggers when the annotation's comment for status is changed in the comment panel.
     *
     * @event commentStatusChanged
     * @blazorProperty 'commentStatusChanged'
     */
    commentStatusChanged: EmitType<CommentEventArgs>;
    /**
     * Triggers before adding a text in the freeText annotation.
     *
     * @event beforeAddFreeText
     * @blazorProperty 'beforeAddFreeText'
     */
    beforeAddFreeText: EmitType<BeforeAddFreeTextEventArgs>;
    /**
     * Triggers when focus out from the form fields.
     *
     * @event formFieldFocusOut
     * @blazorProperty 'formFieldFocusOut'
     */
    formFieldFocusOut: EmitType<FormFieldFocusOutEventArgs>;
    /**
     * Triggers when a form field is added.
     *
     * @event formFieldAdd
     * @blazorProperty 'formFieldAdd'
     */
    formFieldAdd: EmitType<FormFieldAddArgs>;
    /**
     * Triggers when a form field is removed.
     *
     * @event formFieldRemove
     * @blazorProperty 'formFieldRemove'
     */
    formFieldRemove: EmitType<FormFieldRemoveArgs>;
    /**
     * Triggers when a property of form field is changed.
     *
     * @event formFieldPropertiesChange
     * @blazorProperty 'formFieldPropertiesChange'
     */
    formFieldPropertiesChange: EmitType<FormFieldPropertiesChangeArgs>;
    /**
     * Triggers when the mouse cursor leaves the form field.
     *
     * @event formFieldMouseLeave
     * @blazorProperty 'formFieldMouseLeave'
     */
    formFieldMouseLeave: EmitType<FormFieldMouseLeaveArgs>;
    /**
     * Triggers when the mouse cursor is over a form field.
     *
     * @event formFieldMouseover
     * @blazorProperty 'formFieldMouseover'
     */
    formFieldMouseover: EmitType<FormFieldMouseoverArgs>;
    /**
     * Triggers when a form field is moved.
     *
     * @event formFieldMove
     * @blazorProperty 'formFieldMove'
     */
    formFieldMove: EmitType<FormFieldMoveArgs>;
    /**
     * Triggers when a form field is resized.
     *
     * @event formFieldResize
     * @blazorProperty 'formFieldResize'
     */
    formFieldResize: EmitType<FormFieldResizeArgs>;
    /**
     * Triggers when a form field is selected.
     *
     * @event formFieldSelect
     * @blazorProperty 'formFieldSelect'
     */
    formFieldSelect: EmitType<FormFieldSelectArgs>;
    /**
     * Triggers when a form field is unselected.
     *
     * @event formFieldUnselect
     * @blazorProperty 'formFieldUnselect'
     */
    formFieldUnselect: EmitType<FormFieldUnselectArgs>;
    /**
     * Triggers when the form field is double-clicked.
     *
     * @event formFieldDoubleClick
     * @blazorProperty 'formFieldDoubleClick'
     */
    formFieldDoubleClick: EmitType<FormFieldDoubleClickArgs>;
    /**
     * Fires when a custom context menu option is selected.
     *
     * @event customContextMenuSelect
     */
    customContextMenuSelect: EmitType<CustomContextMenuSelectEventArgs>;
    /**
     * Fires before the custom context menu option is opened.
     *
     * @event customContextMenuBeforeOpen
     */
    customContextMenuBeforeOpen: EmitType<CustomContextMenuBeforeOpenEventArgs>;
    /**
     * Triggers when the customized keyboard command keys are pressed.
     *
     * @event keyboardCustomCommands
     */
    keyboardCustomCommands: EmitType<KeyboardCustomCommandsEventArgs>;
    /**
     * Triggers when the page organizer save as triggered.
     *
     * @event pageOrganizerSaveAs
     */
    pageOrganizerSaveAs: EmitType<PageOrganizerSaveAsEventArgs>;
    /**
     * PDF document annotation collection.
     *
     * @private
     * @deprecated
     */
    annotations: PdfAnnotationBaseModel[];
    /**
     * PDF document form fields collection.
     *
     * @private
     * @deprecated
     */
    formFields: PdfFormFieldBaseModel[];
    /**
     * @private
     * @deprecated
     */
    tool: string;
    /**
     * @private
     */
    touchPadding: number;
    /**
     * @private
     */
    paddingDifferenceValue: number;
    /**
     * store the drawing objects.
     *
     * @private
     * @deprecated
     */
    drawingObject: PdfAnnotationBaseModel;
    constructor(options?: PdfViewerModel, element?: string | HTMLElement);
    protected preRender(): void;
    private getUniqueElementId;
    private initializePdfiumModule;
    protected render(): void;
    /**
     * Exports the specified page as a Base64-encoded image string.
     *
     * @param {number} pageIndex -  The index of the page to export.
     * @param {Size} [size] - Specifies the width and height of the image. If not specified, the default size will be used.
     * @param {number} [size.width] - The width of the image.
     * @param {number} [size.height] - The height of the image.
     * @returns { Promise<string> } - Returns the Base64-encoded string representing the image of the specified page.
     * @private
     */
    exportAsImage(pageIndex: number, size?: Size): Promise<string>;
    /**
     * Exports the range of pages as Base64-encoded image strings.
     *
     * @param {number} startIndex - The index of the first page to export.
     * @param {number} endIndex - The index of the last page to export.
     * @param {Size} [size] - Specifies the width and height of the image. If not specified, the default size will be used.
     * @param {number} [size.width] - The width of the image.
     * @param {number} [size.height] - The height of the image.
     * @returns { Promise<string[]> } - An array of Base64-encoded strings, each representing the image of a page within the specified range.
     * @private
     */
    exportAsImages(startIndex: number, endIndex: number, size?: Size): Promise<string[]>;
    /**
     * Extracts text from a specific page of the PDF document based on the supplied options.
     *
     * @param {number} pageIndex - The index of the page from which text will be extracted. The first page is indexed as 0.
     * @param {ExtractTextOption} options - A configuration option specifying the type of text extraction, such as layout preferences.
     *
     * @returns {Promise<{ textData: TextDataSettingsModel[], pageText: string }>} - A promise that resolves with an object containing:
     * - textData: An array of TextDataSettingsModel, detailing the structure and positioning of the extracted text.
     * - pageText: A concatenated string of the extracted text content from the specified page.
     */
    extractText(pageIndex: number, options: ExtractTextOption): Promise<{
        textData: TextDataSettingsModel[];
        pageText: string;
    }>;
    /**
     * Extracts text from a specified range of pages in the PDF document.
     *
     * @param {number} startIndex - The starting page index for text extraction. The first page is indexed as 0.
     * @param {number} endIndex - The ending page index for text extraction. The page at this index is also included.
     * @param {ExtractTextOption} options - The options to specify additional extraction configurations, such as layout preferences.
     *
     * @returns {Promise<{ textData: TextDataSettingsModel[], pageText: string }>} - A promise that resolves with an object containing:
     * - textData: An array of TextDataSettingsModel representing the structure and bounds of the extracted text.
     * - pageText: A concatenated string of the extracted text from the specified range of pages.
     */
    extractText(startIndex: number, endIndex: number, options: ExtractTextOption): Promise<{
        textData: TextDataSettingsModel[];
        pageText: string;
    }>;
    private getScriptPathForPlatform;
    private renderComponent;
    getModuleName(): string;
    /**
     * @private
     * @returns {Object} - Object
     */
    getLocaleConstants(): Object;
    /**
     * To modify the Json Data in ajax request.
     *
     * @param jsonData
     * @returns void
     */
    setJsonData(jsonData: any): void;
    private updateLocalStorage;
    onPropertyChanged(newProp: PdfViewerModel, oldProp: PdfViewerModel): void;
    private renderCustomerStamp;
    getPersistData(): string;
    requiredModules(): ModuleDeclaration[];
    /** @hidden */
    defaultLocale: Object;
    /**
     * Loads the given PDF document in the PDF viewer control
     *
     * @param  {string} document - Specifies the document name for load
     * @param  {string} password - Specifies the Given document password
     * @returns {void}
     */
    load(document: string | Uint8Array, password: string): void;
    /**
     * Loads the given PDF document internally in the PDF viewer control
     *
     * @param  {string} document - Specifies the document name for load
     * @param  {string} password - Specifies the Given document password
     * @param  {boolean} isSkipDocumentId - It indicates whether we need to skip removing the jsonDocumentId
     * @private
     * @returns {void}
     */
    loadDocInternally(document: string | Uint8Array, password: string, isSkipDocumentId?: boolean): void;
    private convertByteArrayToBase64;
    /**
     * Loads the given PDF document in the PDF viewer control
     *
     * @param {string} documentId - It describes about the document Id value
     * @param {boolean} isFileName - It ensures whether the file name is true or not
     * @param {string} fileName - It describes about the file name
     * @private
     * @returns {void}
     */
    loadDocument(documentId: string, isFileName: boolean, fileName: string): void;
    /**
     * Loads the PDF document with the document details in the PDF viewer control
     *
     * @param {any} documentDetails - It describes about the document details
     * @param {string} password - It describes about the password value
     * @private
     * @returns {void}
     */
    loadSuccess(documentDetails: any, password?: string): void;
    /**
     * Set the focus of the given element
     *
     * @param {string} elementId - It describes about the element id value
     * @private
     * @returns {void}
     */
    focusElement(elementId: string): void;
    /**
     * Downloads the PDF document being loaded in the ejPdfViewer control.
     *
     * @returns {void}
     */
    download(): void;
    /**
     * Saves the PDF document being loaded in the PDF Viewer control as blob.
     *
     * @returns {Promise<Blob>} - Promise
     */
    saveAsBlob(): Promise<Blob>;
    /**
     * updates the PDF Viewer container width and height from externally.
     *
     * @returns {void}
     */
    updateViewerContainer(): void;
    /**
     * Retrieves the information of a specified page in the viewer.
     * @param {number} pageIndex - The page index to get the details. The first page is 0.
     * @returns {PageInfo} - An instance of the PageInfo model containing the page information.
     */
    getPageInfo(pageIndex: number): PageInfoModel;
    /**
     * Specifies the message to be displayed  in the popup.
     *
     * @param {string} errorString - It describes about the error string value
     * @returns {void}
     */
    showNotificationPopup(errorString: string): void;
    /**
     * Focus a form field in a document by its field name or the field object.
     *
     * @param {any} field - It describes about the field value
     * @returns {void}
     */
    focusFormField(field: any): void;
    /**
     * Update the form field values from externally.
     *
     * @param {any} fieldValue - It describes about the field value
     * @returns {void}
     */
    updateFormFieldsValue(fieldValue: any): void;
    private getFormFieldByID;
    /**
     * @param {any} number - Gets the number value
     * @returns {number} - number
     */
    private ConvertPointToPixel;
    /**
     * @param {any} currentData - Current form field data.
     * @param {any} fieldValue - Form Field.
     * @param {any} signBounds - It contains a signatureBounds.
     * @returns {any} - Returns the updated the current Data.
     */
    private updateSignatureValue;
    private imageOnLoad;
    /**
     * Perform undo action for the edited annotations
     *
     * @returns {void}
     */
    undo(): void;
    /**
     * Perform redo action for the edited annotations
     *
     * @returns {void}
     */
    redo(): void;
    /**
     * Unloads the PDF document being displayed in the PDF viewer.
     *
     * @returns {void}
     */
    unload(): void;
    /**
     * Destroys all managed resources used by this object.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Perform imports annotations action in the PDF Viewer
     *
     * @param {any} importData - Specifies the data for annotation imports
     * @param {AnnotationDataFormat} annotationDataFormat - Specifies the annotation data format
     * @returns {void}
     */
    importAnnotation(importData: any, annotationDataFormat?: AnnotationDataFormat): void;
    private importAnnotationsAsJson;
    /**
     * Perform export annotations action in the PDF Viewer
     *
     * @param {AnnotationDataFormat} annotationDataFormat -Gets the annotation data format
     * @returns {void}
     */
    exportAnnotation(annotationDataFormat?: AnnotationDataFormat): void;
    /**
     * Perform export annotations action in the PDF Viewer
     *
     *@param {AnnotationDataFormat} annotationDataFormat - Export the annotation based on the format.
     * @returns {Promise<object>} - promise
     */
    exportAnnotationsAsObject(annotationDataFormat?: AnnotationDataFormat): Promise<object>;
    /**
     * Export annotations and returns a base64 string for both Json and XFDF formats
     *
     * @param {AnnotationDataFormat} annotationDataFormat - Gets the annotation data format
     * @returns {Promise<string>} - promise
     */
    exportAnnotationsAsBase64String(annotationDataFormat: AnnotationDataFormat): Promise<string>;
    /**
     * Perform to add annotations in the PDF Viewer
     *
     * @param {any} annotation - Specifies the annotation
     * @returns {void}
     */
    addAnnotation(annotation: any): void;
    /**
     * Imports the form fields data into the current PDF document.
     *
     * @param {string} data - The path for importing the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat - Gets the form field data format
     * @returns {void}
     */
    importFormFields(data?: string, formFieldDataFormat?: FormFieldDataFormat): void;
    /**
     * Exports the form field data in the specified data format.
     *
     * @param {string} data - The path for exporting the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat - Form field data format
     * @returns {void}
     */
    exportFormFields(data?: string, formFieldDataFormat?: FormFieldDataFormat): void;
    /**
     * Returns an object which represents the form field data in the specified data format.
     *
     * @param {FormFieldDataFormat} formFieldDataFormat - Form field data format
     * @returns {Promise<object>} - promise
     */
    exportFormFieldsAsObject(formFieldDataFormat?: FormFieldDataFormat): Promise<object>;
    /**
     * reset all form fields data
     *
     * @returns {void}
     */
    resetFormFields(): void;
    /**
     * Clears data from the form fields.
     * Parameter - Specifies the form field object.
     *
     * @param {any} formField - It describes about the form field
     * @returns {void}
     */
    clearFormFields(formField?: any): void;
    /**
     * To delete the annotation Collections in the PDF Document.
     *
     * @returns {void}
     */
    deleteAnnotations(): void;
    /**
     * To retrieve the form fields in the PDF Document.
     *
     * @returns {void}
     */
    retrieveFormFields(): FormFieldModel[];
    /**
     * To update the form fields within a PDF document, but only when the FormDesigner module is either not injected or has been disabled.
     *
     * @param {any} formFields - It describes about the form field
     * @returns {void}
     */
    updateFormFields(formFields: any): void;
    /**
     * @returns {void}
     */
    private fireResourcesLoaded;
    /**
     * @param {any} JsonData - It gives the json data values
     * @private
     * @returns {void}
     */
    fireAjaxRequestInitiate(JsonData: any): void;
    /**
     * @param {any} jsonData - It gives the json data values
     * @private
     * @returns {void}
     */
    firePageRenderInitiate(jsonData: any): void;
    /**
     * @param {string} value - The button field value
     * @param {string} fieldName - It describes about the button field name
     * @param {string} id - It describes about the id value
     * @private
     * @returns {void}
     */
    fireButtonFieldClickEvent(value: string, fieldName: string, id: string): void;
    /**
     * @param {string} name - Form field name
     * @param {FormFieldModel} field - It describes about the form field model
     * @param {boolean} cancel - checks whether the cancel is true or not
     * @param {boolean} isLeftClick - becomes true on signature panel left click.
     * @private
     * @returns {Promise<void>} - returns promise
     */
    fireFormFieldClickEvent(name: string, field: FormFieldModel, cancel?: boolean, isLeftClick?: boolean): Promise<void>;
    /**
     * @param { srting} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field add event.
     * @param {number} pageIndex - Get the page number.
     * @private
     * @returns {void}
     */
    fireFormFieldAddEvent(name: string, field: IFormField, pageIndex: number): void;
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field remove event.
     * @param {number} pageIndex - Get the page number.
     * @private
     * @returns {void}
     */
    fireFormFieldRemoveEvent(name: string, field: IFormField, pageIndex: number): void;
    /**
     * @param {FormFieldDoubleClickArgs} eventArgs - Returns the event args
     * @private
     * @returns {FormFieldDoubleClickArgs} - FormFieldDoubleClickArgs
     */
    fireFormFieldDoubleClickEvent(eventArgs: FormFieldDoubleClickArgs): FormFieldDoubleClickArgs;
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field properties change event.
     * @param {number} pageIndex - Get the page number.
     * @param {boolean} isValueChanged - Specifies whether the form field value is changed or not.
     * @param {boolean} isFontFamilyChanged - Specifies whether the font family of the form field is changed or not.
     * @param {boolean} isFontSizeChanged - Specifies whether the font size of the form field is changed or not.
     * @param {boolean} isFontStyleChanged - Specifies whether the font style of the form field is changed or not.
     * @param {boolean} isColorChanged - Specifies whether the font color of the form field is changed or not.
     * @param {boolean} isBackgroundColorChanged - Specifies whether the background color of the form field is changed or not.
     * @param {boolean} isBorderColorChanged - Specifies whether the border color of the form field is changed or not.
     * @param {boolean} isBorderWidthChanged - Specifies whether the border width of the form field is changed or not.
     * @param {boolean} isAlignmentChanged - Specifies whether the text alignment of the form field is changed or not.
     * @param {boolean} isReadOnlyChanged - Specifies the Read Only of Form field is changed or not.
     * @param {boolean} isVisibilityChanged - Specifies whether the form field visibility is changed or not.
     * @param {boolean} isMaxLengthChanged - Specifies whether the max length of the form field is changed or not.
     * @param {boolean} isRequiredChanged - Specifies whether the is required option of the form field is changed or not.
     * @param {boolean} isPrintChanged - Specifies whether the print option of the form field is changed or not.
     * @param {boolean} isToolTipChanged - Specifies whether the tool tip property is changed or not.
     * @param {boolean} isCustomDataChanged - Specifies isCustomDataChanged
     * @param {any} oldValue - Specifies the old value of the form field.
     * @param {any} newValue - Specifies the new value of the form field.
     * @param {any} isNamechanged - Specifies whether the name changed property is changed or not.
     * @private
     * @returns {void}
     */
    fireFormFieldPropertiesChangeEvent(name: string, field: IFormField, pageIndex: number, isValueChanged: boolean, isFontFamilyChanged: boolean, isFontSizeChanged: boolean, isFontStyleChanged: boolean, isColorChanged: boolean, isBackgroundColorChanged: boolean, isBorderColorChanged: boolean, isBorderWidthChanged: boolean, isAlignmentChanged: boolean, isReadOnlyChanged: boolean, isVisibilityChanged: boolean, isMaxLengthChanged: boolean, isRequiredChanged: boolean, isPrintChanged: boolean, isToolTipChanged: boolean, isCustomDataChanged: boolean, oldValue?: any, newValue?: any, isNamechanged?: any): void;
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field mouse leave event.
     * @param {number} pageIndex - Get the page number.
     * @private
     * @returns {void}
     */
    fireFormFieldMouseLeaveEvent(name: string, field: IFormField, pageIndex: number): void;
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field mouse over event.
     * @param {number} pageIndex - Get the page number.
     * @param {number} pageX - Get the mouse over x position with respect to the page container.
     * @param {number} pageY - Get the mouse over y position with respect to the page container.
     * @param {number} X - Specifies the mouse over x position with respect to the viewer container.
     * @param {number} Y - Specifies the mouse over y position with respect to the viewer container.
     * @private
     * @returns {void}
     */
    fireFormFieldMouseoverEvent(name: string, field: IFormField, pageIndex: number, pageX: number, pageY: number, X: number, Y: number): void;
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field move event.
     * @param {number} pageIndex - Get the page number.
     * @param {IFormFieldBound} previousPosition - Get the previous position of the form field in the page.
     * @param {IFormFieldBound} currentPosition - Current position of form field in the page.
     * @private
     * @returns {void}
     */
    fireFormFieldMoveEvent(name: string, field: IFormField, pageIndex: number, previousPosition: IFormFieldBound, currentPosition: IFormFieldBound): void;
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field move event.
     * @param {number} pageIndex - Get the page number.
     * @param {IFormFieldBound} previousPosition - Get the previous position of the form field in the page.
     * @param {IFormFieldBound} currentPosition - Current position of form field in the page.
     * @private
     * @returns {void}
     */
    fireFormFieldResizeEvent(name: string, field: IFormField, pageIndex: number, previousPosition: IFormFieldBound, currentPosition: IFormFieldBound): void;
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field select event.
     * @param {number} pageIndex - Get the page number.
     * @param {boolean} isProgrammaticSelection - Specifies whether the the form field is selected programmatically or by UI.
     * @private
     * @returns {void}
     */
    fireFormFieldSelectEvent(name: string, field: IFormField, pageIndex: number, isProgrammaticSelection: boolean): void;
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field unselect event.
     * @param {number} pageIndex - Get the page number.
     * @private
     * @returns {void}
     */
    fireFormFieldUnselectEvent(name: string, field: IFormField, pageIndex: number): void;
    /**
     * @param {any} pageData - It contains the page data
     * @private
     * @returns {void}
     */
    fireDocumentLoad(pageData: any): void;
    /**
     * @param {string} fileName - Get the file name
     * @private
     * @returns {void}
     */
    fireDocumentUnload(fileName: string): void;
    /**
     * @param {boolean} isPasswordRequired - Checks whether the password required is true or not
     * @param {string} password - Get the password value
     * @private
     * @returns {void}
     */
    fireDocumentLoadFailed(isPasswordRequired: boolean, password: string): void;
    /**
     * @param {number} errorStatusCode - It Gets the error status code
     * @param {string} errorMessage - It Gets the error message
     * @param {string} action - It describes the action
     * @param {boolean} retryCount - checks whether retry count ie true or not
     * @private
     * @returns {void}
     */
    fireAjaxRequestFailed(errorStatusCode: number, errorMessage: string, action: string, retryCount?: boolean): void;
    /**
     * @param {string} action - It describes the action
     * @param {any} data - It describes the data
     * @private
     * @returns {boolean} - boolean
     */
    fireAjaxRequestSuccess(action: string, data: any): boolean;
    /**
     * @param {any} data - It describes the data
     * @private
     * @returns {any} - any
     */
    firePageRenderComplete(data: any): any;
    /**
     * @param {string} action - It describes the action
     * @private
     * @returns {void}
     */
    fireValidatedFailed(action: string): void;
    /**
     * @param {number} x - It Gets the x value
     * @param {number} y - It Gets the y value
     * @param {number} pageNumber - It Gets the page number value
     * @private
     * @returns {void}
     */
    firePageClick(x: number, y: number, pageNumber: number): void;
    /**
     * @param {number} previousPageNumber - It Gets the previous page number
     * @private
     * @returns {void}
     */
    firePageChange(previousPageNumber: number): void;
    /**
     * @private
     * @returns {void}
     */
    fireZoomChange(): void;
    /**
     * @param {string} hyperlink - Get the hyper link
     * @param  {HTMLAnchorElement} hyperlinkElement - Get the hyper link element
     * @private
     * @returns {Promise<boolean>} - Promise<boolean>
     */
    fireHyperlinkClick(hyperlink: string, hyperlinkElement: HTMLAnchorElement): Promise<boolean>;
    /**
     * @param {HTMLAnchorElement} hyperlinkElement - Gets the hyper link element
     * @private
     * @returns {void}
     */
    fireHyperlinkHover(hyperlinkElement: HTMLAnchorElement): void;
    /**
     * @param {string} fieldName - Gets the field name
     * @param {string} value - Gets the field value
     * @private
     * @returns {void}
     */
    fireFocusOutFormField(fieldName: string, value: string): void;
    /**
     * @param {number} pageNumber -- It Gets the page number value
     * @param {string} index - It Gets the index value
     * @param {AnnotationType} type - It Gets the annotation type
     * @param {any} bounds - Gets the annotation bounds
     * @param {any} settings - Gets the annotation settings
     * @param {string} textMarkupContent - Gets the text markup content
     * @param {number} tmStartIndex - Gets the text markup start index
     * @param {number} tmEndIndex - Gets the text markup end index
     * @param {ShapeLabelSettingsModel} labelSettings - Gets the label settings
     * @param {any} multiPageCollection - Gets the multi page collection
     * @param {string} customStampName - Gets the name of the custom stamp
     * @private
     * @returns {void}
     */
    fireAnnotationAdd(pageNumber: number, index: string, type: AnnotationType, bounds: any, settings: any, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number, labelSettings?: ShapeLabelSettingsModel, multiPageCollection?: any, customStampName?: string): void;
    /**
     * @param {number} pageNumber -- It Gets the page number value
     * @param {string} index - It Gets the index value
     * @param {AnnotationType} type - It Gets the annotation type
     * @param {any} bounds - Gets the annotation bounds
     * @param {string} textMarkupContent - Gets the text markup content
     * @param {number} tmStartIndex - Gets the text markup start index
     * @param {number} tmEndIndex - Gets the text markup end index
     * @param {any} multiPageCollection - Gets the multi page collection
     * @private
     * @returns {void}
     */
    fireAnnotationRemove(pageNumber: number, index: string, type: AnnotationType, bounds: any, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number, multiPageCollection?: any): void;
    /**
     * @param {string} value - Gets the value of the free text annotation
     * @private
     * @returns {void}
     */
    fireBeforeAddFreeTextAnnotation(value: string): void;
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @private
     * @returns {void}
     */
    fireCommentAdd(id: string, text: string, annotation: any): void;
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @private
     * @returns {void}
     */
    fireCommentEdit(id: string, text: string, annotation: any): void;
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @private
     * @returns {void}
     */
    fireCommentDelete(id: string, text: string, annotation: any): void;
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @private
     * @returns {void}
     */
    fireCommentSelect(id: string, text: string, annotation: any): void;
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @param {CommentStatus} statusChange - Get the value of status change
     * @private
     * @returns {void}
     */
    fireCommentStatusChanged(id: string, text: string, annotation: any, statusChange: CommentStatus): void;
    /**
     * @param {number} pageNumber -- It Gets the page number value
     * @param {string} index - It Gets the index value
     * @param {AnnotationType} type - It Gets the annotation type
     * @param {boolean} isColorChanged - check whetehr the color changed is true or not
     * @param {boolean} isOpacityChanged - check's whether the opacity changed is true or not
     * @param {boolean} isTextChanged - check's whether the text changed is true or not
     * @param {boolean} isCommentsChanged - check's whether the comments changed is true or not
     * @param {string} textMarkupContent - Gets the text markup content
     * @param {number} tmStartIndex - Gets the text markup start index
     * @param {number} tmEndIndex - Gets the text markup end index
     * @param {any} multiPageCollection - Gets the multi page collection
     * @private
     * @returns {void}
     */
    fireAnnotationPropertiesChange(pageNumber: number, index: string, type: AnnotationType, isColorChanged: boolean, isOpacityChanged: boolean, isTextChanged: boolean, isCommentsChanged: boolean, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number, multiPageCollection?: any): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} index - Gets the index value
     * @param {any} type - Gets the type of the signature
     * @param {any} bounds - Gets the annotation bounda
     * @param {number} opacity - Gets the opacity value
     * @param {string} strokeColor - Gets the stroke color value
     * @param {number} thickness - Gets the thickness value
     * @param {string} data - Gets the data of the annotation
     * @private
     * @returns {void}
     */
    fireSignatureAdd(pageNumber: number, index: string, type: any, bounds: any, opacity: number, strokeColor?: string, thickness?: number, data?: string): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} index - Gets the index value of the signature
     * @param {AnnotationType} type - Gets the annotation type
     * @param {any} bounds - Gets the bounds value of the annotation
     * @private
     * @returns {void}
     */
    fireSignatureRemove(pageNumber: number, index: string, type: AnnotationType, bounds: any): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} id - Gets the id value of the signature
     * @param {AnnotationType} type - Gets the annotation type
     * @param {number} opacity - Gets the opacity value of the annotation
     * @param {string} strokeColor - Gets the stroke color value
     * @param {number} thickness - Gets the thickness value
     * @param {object} previousPosition - Gets the previous position values
     * @param {object} currentPosition - Gets the current position values
     * @private
     * @returns {void}
     */
    fireSignatureMove(pageNumber: number, id: string, type: AnnotationType, opacity: number, strokeColor: string, thickness: number, previousPosition: object, currentPosition: object): void;
    /**
     * @param {number} pageNumber - Gets the current page number value
     * @param {string} index - Gets the index value
     * @param {AnnotationType} type - Gets the annotation type
     * @param {boolean} isStrokeColorChanged - Check's whether the stroke color changes is true or not
     * @param {boolean} isOpacityChanged - Check's whether the opacity change is true or not
     * @param {boolean} isThicknessChanged - Check's whether the thickness change is true or not
     * @param {any} oldProp - Gets the old prop value
     * @param {any} newProp - Gets the new prop value
     * @private
     * @returns {void}
     */
    fireSignaturePropertiesChange(pageNumber: number, index: string, type: AnnotationType, isStrokeColorChanged: boolean, isOpacityChanged: boolean, isThicknessChanged: boolean, oldProp: any, newProp: any): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} index - Gets the index value
     * @param {AnnotationType} type - Gets the annotation type
     * @param {number} opacity - Gets the opacity value
     * @param {string} strokeColor - Gets the stroke color value
     * @param {number} thickness - Gets the thickness value
     * @param {any} currentPosition - Gets the current position of the signature
     * @param {any} previousPosition - Gets the previous position of the signature
     * @private
     * @returns {void}
     */
    fireSignatureResize(pageNumber: number, index: string, type: AnnotationType, opacity: number, strokeColor: string, thickness: number, currentPosition: any, previousPosition: any): void;
    /**
     * @param {string} id - Gets the id value
     * @param {number} pageNumber - Gets the page number value
     * @param {object} signature - Gets the signature object
     * @private
     * @returns {void}
     */
    fireSignatureSelect(id: string, pageNumber: number, signature: object): void;
    /**
     * @param {string} id - Gets the id value
     * @param {number} pageNumber - Gets the page number value
     * @param {object} signature - Gets the signature object
     * @private
     * @returns {void}
     */
    fireSignatureUnselect(id: string, pageNumber: number, signature: object): void;
    /**
     * @param {string} id - Gets the annotation id value
     * @param {number} pageNumber - Gets the page number value
     * @param {any} annotation - Gets the annotation
     * @param {any} annotationCollection - Gets the annotation collection
     * @param {any} multiPageCollection - Gets the multi page collection
     * @param {boolean} isSelected - checks whether the selected is true or not
     * @param {string} annotationAddMode - Gets the annotation add mode value
     * @private
     * @returns {void}
     */
    fireAnnotationSelect(id: string, pageNumber: number, annotation: any, annotationCollection?: any, multiPageCollection?: any, isSelected?: boolean, annotationAddMode?: string): void;
    /**
     * @param {string} id - Gets the annottion id value
     * @param {number} pageNumber - Gets the page number value
     * @param {any} annotation - Gets the annotation details
     * @private
     * @returns {void}
     */
    fireAnnotationUnSelect(id: string, pageNumber: number, annotation: any): void;
    /**
     * @param {string} id - Gets the annottion id value
     * @param {number} pageNumber - Gets the page number value
     * @param {any} annotation - Gets the annotation details
     * @private
     * @returns {void}
     */
    fireAnnotationDoubleClick(id: string, pageNumber: number, annotation: any): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @private
     * @returns {void}
     */
    fireTextSelectionStart(pageNumber: number): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} text - Gets the selected text value
     * @param {any[]} bound - Gets the annotation bounds
     * @private
     * @returns {void}
     */
    fireTextSelectionEnd(pageNumber: number, text: string, bound: any[]): void;
    /**
     * @param {HTMLCanvasElement} canvas - Gets the canvas element
     * @param {number} index - Gets the index value
     * @private
     * @returns {void}
     */
    renderDrawing(canvas?: HTMLCanvasElement, index?: number): void;
    /**
     * @param {number} pageNumber -- It Gets the page number value
     * @param {string} index - It Gets the index value
     * @param {AnnotationType} type - It Gets the annotation type
     * @param {any} bounds - Gets the annotation bounds
     * @param {any} settings - Gets the settings of the annotation
     * @param {string} textMarkupContent - Gets the text markup content
     * @param {number} tmStartIndex - Gets the text markup start index
     * @param {number} tmEndIndex - Gets the text markup end index
     * @param {ShapeLabelSettingsModel} labelSettings - Gets the label settings
     * @param {any} multiPageCollection - Gets the multi page collection
     * @private
     * @returns {void}
     */
    fireAnnotationResize(pageNumber: number, index: string, type: AnnotationType, bounds: any, settings: any, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number, labelSettings?: ShapeLabelSettingsModel, multiPageCollection?: any): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} id - Gets the id value of the annotation
     * @param {AnnotationType} type - Gets the annotation type
     * @param {any} annotationSettings - Gets the annotation settings
     * @param {object} previousPosition - Gets the previous position of the annotation
     * @param {object} currentPosition - Gets the current position of the annotation
     * @private
     * @returns {void}
     */
    fireAnnotationMoving(pageNumber: number, id: string, type: AnnotationType, annotationSettings: any, previousPosition: object, currentPosition: object): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} id - Gets the id value of the annotation
     * @param {AnnotationType} type - Gets the annotation type
     * @param {any} annotationSettings - Gets the annotation settings
     * @param {object} previousPosition - Gets the previous position of the annotation
     * @param {object} currentPosition - Gets the current position of the annotation
     * @private
     * @returns {void}
     */
    fireAnnotationMove(pageNumber: number, id: string, type: AnnotationType, annotationSettings: any, previousPosition: object, currentPosition: object): void;
    /**
     * @param {string} id -Gets the id value of the annotation
     * @param {number} pageNumber - Gets the page number value
     * @param {AnnotationType} annotationType - Gets the annotation type
     * @param {any} bounds - Gets the bounds values of the annotation
     * @param {any} annotation - Gets the annotation
     * @param {any} currentPosition - Gets the current position of the annotation
     * @param {any} mousePosition - Gets the mouse position of the annotation
     * @private
     * @returns {void}
     */
    fireAnnotationMouseover(id: string, pageNumber: number, annotationType: AnnotationType, bounds: any, annotation: any, currentPosition: any, mousePosition: any): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @private
     * @returns {void}
     */
    fireAnnotationMouseLeave(pageNumber: number): void;
    /**
     * @param {number} pageX - Gets the page X value
     * @param {number} pageY - Gets the page Y value
     * @private
     * @returns {void}
     */
    firePageMouseover(pageX: number, pageY: number): void;
    /**
     * @param {string} fileName - Gets the file name
     * @private
     * @returns {void}
     */
    fireDownloadStart(fileName: string): boolean;
    /**
     * @param {string} fileName - Gets the file name value
     * @param {string} downloadData - Gets the download data
     * @private
     * @returns {void}
     */
    fireDownloadEnd(fileName: string, downloadData: string): void;
    /**
     * @private
     * @returns {Promise<void>} - Promise<void>
     */
    firePrintStart(): Promise<void>;
    /**
     * @param {string} eventName - Gets the name of the event
     * @param {object} args - Gets the args object value
     * @private
     * @returns {Promise<void | object>} - Returns a promise
     */
    triggerEvent(eventName: string, args: object): Promise<void | object>;
    /**
     * @param {string} fileName - Gets the name of the file
     * @private
     * @returns {void}
     */
    firePrintEnd(fileName: string): void;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @private
     * @returns {void}
     */
    fireThumbnailClick(pageNumber: number): void;
    /**
     * Custom toolbar click event.
     *
     * @param {ClickEventArgs} target - Gets the click event args value
     * @private
     * @returns {void}
     */
    fireCustomToolbarClickEvent(target: ClickEventArgs): Promise<void>;
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {number} position - Gets the position of the book mark
     * @param {string} text - Gets the text value
     * @param {string} fileName - Gets the name of the file
     * @private
     * @returns {void}
     */
    fireBookmarkClick(pageNumber: number, position: number, text: string, fileName: string): void;
    /**
     * @param {any} importData - Gets the imported data
     * @private
     * @returns {void}
     */
    fireImportStart(importData: any): void;
    /**
     * @param {any} exportData - Gets the exported data
     * @private
     * @returns {boolean} - Returns boolean value
     */
    fireExportStart(exportData: any): boolean;
    /**
     * @param {any} importData - Gets the imported data
     * @private
     * @returns {void}
     */
    fireImportSuccess(importData: any): void;
    /**
     * @param {any} exportData - Gets the exported data
     * @param {string} fileName - Gets the name of the file
     * @private
     * @returns {void}
     */
    fireExportSuccess(exportData: any, fileName: string): void;
    /**
     * @param {any} data - Gets the imported data
     * @param {string} errorDetails - Gets the error details
     * @private
     * @returns {void}
     */
    fireImportFailed(data: any, errorDetails: string): void;
    /**
     * @param {any} data - Gets the exported data
     * @param {string} errorDetails - Gets the error details
     * @private
     * @returns {void}
     */
    fireExportFailed(data: any, errorDetails: string): void;
    /**
     * @param {any} data - Gets the imported data
     * @private
     * @returns {void}
     */
    fireFormImportStarted(data: any): void;
    /**
     * @param {any} data - Gets the exported data
     * @private
     * @returns {boolean} - boolean
     */
    fireFormExportStarted(data: any): boolean;
    /**
     * @param {any} data - Gets the imported data
     * @private
     * @returns {void}
     */
    fireFormImportSuccess(data: any): void;
    /**
     * @param {any} data - Gets the exported data
     * @param {string} fileName - Gets the name of the file
     * @private
     * @returns {void}
     */
    fireFormExportSuccess(data: any, fileName: string): void;
    /**
     * @param {any} data - Gets the imported data
     * @param {string} errorDetails - Gets the error details
     * @private
     * @returns {void}
     */
    fireFormImportFailed(data: any, errorDetails: string): void;
    /**
     * @param {any} data - Gets the exported data
     * @param {string} errorDetails - Gets the error details
     * @private
     * @returns {void}
     */
    fireFormExportFailed(data: any, errorDetails: string): void;
    /**
     * @param {DocumentTextCollectionSettingsModel} documentCollection - Gets the document collection values
     * @private
     * @returns {void}
     */
    fireTextExtractionCompleted(documentCollection: DocumentTextCollectionSettingsModel[][]): void;
    /**
     * @param {string} searchText - Gets the search text values
     * @param {boolean} isMatchcase - Gets whether the match case is true or not
     * @private
     * @returns {void}
     */
    fireTextSearchStart(searchText: string, isMatchcase: boolean): void;
    /**
     * @param {string} searchText - Gets the search text values
     * @param {boolean} isMatchcase - Gets whether the match case is true or not
     * @private
     * @returns {void}
     */
    fireTextSearchComplete(searchText: string, isMatchcase: boolean): void;
    /**
     * @param {string} searchText - Gets the search text values
     * @param {boolean} isMatchcase - Gets whether the match case is true or not
     * @param {RectangleBoundsModel} bounds - Gets the bounds values
     * @param {number} pageNumber - Gets the page number value
     * @private
     * @returns {void}
     */
    fireTextSearchHighlight(searchText: string, isMatchcase: boolean, bounds: RectangleBoundsModel, pageNumber: number): void;
    /**
     * @param  {string} id - Gets the id value
     * @private
     * @returns {void}
     */
    firecustomContextMenuSelect(id: string): void;
    /**
     * @param  {string[]} ids - Gets the id value
     * @private
     * @returns {void}
     */
    firecustomContextMenuBeforeOpen(ids: string[]): void;
    /**
     * @param {KeyboardCommandModel} gesture - Gets the keyboard command value
     * @private
     * @returns {void}
     */
    fireKeyboardCustomCommands(gesture: KeyboardCommandModel): void;
    /**
     * @param {string} fileName - Gets the name of the file
     * @param {string} downloadData - Gets the downloaded data values
     * @private
     * @returns {boolean} - boolean
     */
    firePageOrganizerSaveAsEventArgs(fileName: string, downloadData: string): boolean;
    /**
     * @param {ClientRect} bounds - Gets the bounds values
     * @param {string} commonStyle - Gets the common style value
     * @param {HTMLElement} cavas - Gets the canvas value
     * @param {number} index - Gets the index values
     * @private
     * @returns {void}
     */
    renderAdornerLayer(bounds: ClientRect, commonStyle: string, cavas: HTMLElement, index: number): void;
    /**
     * @param {number} index - Gets the index value
     * @param {AnnotationSelectorSettingsModel} currentSelector - Gets the current selector
     * @private
     * @returns {void}
     */
    renderSelector(index: number, currentSelector?: AnnotationSelectorSettingsModel): void;
    /**
     * @param {string[]} objArray - Gets the object array values
     * @param {AnnotationSelectorSettingsModel} currentSelector - Gets the current selector
     * @param {boolean} multipleSelection - Checks whether the multiple selection is true or not
     * @param {boolean} preventUpdate - Checks whether the prevent update is true or not
     * @private
     * @returns {void}
     */
    select(objArray: string[], currentSelector?: AnnotationSelectorSettingsModel, multipleSelection?: boolean, preventUpdate?: boolean): void;
    /**
     * @param {number} pageId - Gets the page id value
     * @private
     * @returns {ZOrderPageTable} - return
     */
    getPageTable(pageId: number): ZOrderPageTable;
    /**
     * @param {number} diffX - Gets the diffX value
     * @param {number} diffY - Gets the diffY value
     * @param {number} pageIndex - Gets the page index value
     * @param {AnnotationSelectorSettingsModel} currentSelector - Gets the current selector
     * @param {PdfAnnotationBaseModel} helper - Gets the helper value
     * @private
     * @returns {boolean} - returns boolean
     */
    dragSelectedObjects(diffX: number, diffY: number, pageIndex: number, currentSelector?: AnnotationSelectorSettingsModel, helper?: PdfAnnotationBaseModel): boolean;
    /**
     * @param {number} sx - Gets the sx value
     * @param {number} sy - Gets the sy value
     * @param {PointModel} pivot - Gets the pivot value
     * @private
     * @returns {boolean} - return boolean
     */
    scaleSelectedItems(sx: number, sy: number, pivot: PointModel): boolean;
    /**
     * @param {string} endPoint - Gets the end point value
     * @param {IElement} obj - Gets the object value
     * @param {PointModel} point - Gets the point value
     * @param {PointModel} segment - Gets the segment
     * @param {IElement} target - Gets the target value
     * @param {string} targetPortId - Gets the target port id value
     * @param {AnnotationSelectorSettingsModel} currentSelector - Gets the current selector
     * @private
     * @returns {boolean} -returns boolean value
     */
    dragConnectorEnds(endPoint: string, obj: IElement, point: PointModel, segment: PointModel, target?: IElement, targetPortId?: string, currentSelector?: AnnotationSelectorSettingsModel): boolean;
    /**
     * @param {number} pageId - Gets the page id value
     * @private
     * @returns {void}
     */
    clearSelection(pageId: number): void;
    /**
     * Get page number from the user coordinates x and y.
     *
     * @param {Point} clientPoint - The user will provide a x, y coordinates.
     * @returns {number} - number
     */
    getPageNumberFromClientPoint(clientPoint: Point): number;
    /**
     * Convert user coordinates to the PDF page coordinates.
     *
     * @param {Point} clientPoint - The user should provide a x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    convertClientPointToPagePoint(clientPoint: Point, pageNumber: number): Point;
    /**
     * Convert page coordinates to the user coordinates.
     *
     * @param {Point} pagePoint - The user should provide a page x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    convertPagePointToClientPoint(pagePoint: Point, pageNumber: number): Point;
    /**
     * Convert page coordinates to the scrolling coordinates.
     *
     * @param {Point} pagePoint - The user should provide a page x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    convertPagePointToScrollingPoint(pagePoint: Point, pageNumber: number): Point;
    /**
     * Brings the given rectangular region to view and zooms in the document to fit the region in client area (view port).
     *
     * @param {Rect} rectangle - Specifies the region in client coordinates that is to be brought to view.
     * @returns {void}
     */
    zoomToRect(rectangle: Rect): void;
    /**
     * @param {PdfAnnotationBase} obj - It describes about the object
     * @private
     * @returns {PdfAnnotationBaseModel} - Pdf annotation base model
     */
    add(obj: PdfAnnotationBase): PdfAnnotationBaseModel;
    /**
     * @param {PdfAnnotationBaseModel} obj - It describes about the object
     * @private
     * @returns {void}
     */
    remove(obj: PdfAnnotationBaseModel): void;
    /**
     * @private
     * @returns {Object} - returns object
     */
    copy(): Object;
    /**
     * @param {number} angle - It describes about the angle value
     * @param {AnnotationSelectorSettingsModel} currentSelector  - It describes about the current selector
     * @private
     * @returns {boolean} - returns boolean value
     */
    rotate(angle: number, currentSelector?: AnnotationSelectorSettingsModel): boolean;
    /**
     * @param {PdfAnnotationBaseModel[]} obj - It describes about the object
     * @private
     * @returns {void}
     */
    paste(obj?: PdfAnnotationBaseModel[]): void;
    /**
     * @private
     * @returns {void}
     */
    refresh(): void;
    /**
     * @private
     * @returns {void}
     */
    cut(): void;
    /**
     * @param {PdfAnnotationBaseModel} actualObject - It describes about the actual object value
     * @param {PdfAnnotationBaseModel} node - It describes about the node value
     * @private
     * @returns {void}
     */
    nodePropertyChange(actualObject: PdfAnnotationBaseModel, node: PdfAnnotationBaseModel): void;
    /**
     * enableServerDataBinding method
     *
     * @returns { void }  enableServerDataBinding method.
     * @param {boolean} enable - provide the node value.
     * @param {boolean} clearBulkChanges - checks whether the clear bulk changes true or not
     * @private
     */
    enableServerDataBinding(enable: boolean, clearBulkChanges?: boolean): void;
    /**
     * @param {number} tx - It describes about the tx value
     * @param {number} ty - It describes about the ty value
     * @param {number} pageIndex - It describes about the page index value
     * @param {Rect} nodeBounds - It describes about the node bounds value
     * @param {boolean} isStamp - It describes about the isStamp value
     * @param {boolean} isSkip - It describes about the isSkip value
     * @private
     * @returns {boolean} - boolean
     */
    checkBoundaryConstraints(tx: number, ty: number, pageIndex: number, nodeBounds?: Rect, isStamp?: boolean, isSkip?: boolean): boolean;
    /**
     * Adds a custom menu item to the existing menu, with optional configurations.
     *
     * @param {MenuItemModel[]} menuItems - The custom menu item to be added.
     * @param {boolean} disableDefaultItems - Optional. When set to true, this parameter disables the inclusion of default items in the menu. Defaults to false, meaning default items will be included.
     * @param {boolean} appendToEnd - Optional. When set to true, the custom menu item will be added at the bottom of the existing menu list. If false or not provided, the item will be added at the default position.
     * @returns {void}
     */
    addCustomMenu(menuItems: MenuItemModel[], disableDefaultItems?: boolean, appendToEnd?: boolean): void;
}
