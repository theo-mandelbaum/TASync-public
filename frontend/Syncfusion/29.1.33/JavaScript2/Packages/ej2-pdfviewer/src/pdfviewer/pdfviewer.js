var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, NotifyPropertyChanges, ChildProperty, L10n, Collection, Complex, isBlazor, Browser } from '@syncfusion/ej2-base';
import { isNullOrUndefined, Property, Event, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { PdfViewerBase, PdfiumRunner } from './index';
import { PdfRenderer } from './index';
import { FontStyle, AnnotationResizerLocation, CursorType, ContextMenuItem, DynamicStampItem, SignStampItem, StandardBusinessStampItem, AnnotationDataFormat, DisplayMode, FormFieldDataFormat, ExtractTextOption } from './base/types';
import { FormFields } from './index';
import { PdfAnnotationBase, PdfFormFieldBase } from './drawing/pdf-annotation';
import { Drawing } from './drawing/drawing';
import { Selector } from './drawing/selector';
import { processPathData, splitArrayCollection } from '@syncfusion/ej2-drawings';
import { renderAdornerLayer } from './drawing/dom-util';
import { PdfViewerUtils, PdfiumTaskScheduler, TaskPriorityLevel } from './base/pdfviewer-utlis';
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
var ToolbarSettings = /** @class */ (function (_super) {
    __extends(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], ToolbarSettings.prototype, "showTooltip", void 0);
    __decorate([
        Property()
    ], ToolbarSettings.prototype, "toolbarItems", void 0);
    __decorate([
        Property()
    ], ToolbarSettings.prototype, "annotationToolbarItems", void 0);
    __decorate([
        Property()
    ], ToolbarSettings.prototype, "formDesignerToolbarItems", void 0);
    return ToolbarSettings;
}(ChildProperty));
export { ToolbarSettings };
/**
 * Defines customized toolbar items.
 */
var CustomToolbarItem = /** @class */ (function (_super) {
    __extends(CustomToolbarItem, _super);
    function CustomToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], CustomToolbarItem.prototype, "prefixIcon", void 0);
    __decorate([
        Property('')
    ], CustomToolbarItem.prototype, "tooltipText", void 0);
    __decorate([
        Property('')
    ], CustomToolbarItem.prototype, "id", void 0);
    __decorate([
        Property('')
    ], CustomToolbarItem.prototype, "text", void 0);
    __decorate([
        Property('')
    ], CustomToolbarItem.prototype, "cssClass", void 0);
    __decorate([
        Property('left')
    ], CustomToolbarItem.prototype, "align", void 0);
    __decorate([
        Property('')
    ], CustomToolbarItem.prototype, "template", void 0);
    __decorate([
        Property('Button')
    ], CustomToolbarItem.prototype, "type", void 0);
    return CustomToolbarItem;
}(ChildProperty));
export { CustomToolbarItem };
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
var AjaxRequestSettings = /** @class */ (function (_super) {
    __extends(AjaxRequestSettings, _super);
    function AjaxRequestSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], AjaxRequestSettings.prototype, "ajaxHeaders", void 0);
    __decorate([
        Property(false)
    ], AjaxRequestSettings.prototype, "withCredentials", void 0);
    return AjaxRequestSettings;
}(ChildProperty));
export { AjaxRequestSettings };
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
var CustomStamp = /** @class */ (function (_super) {
    __extends(CustomStamp, _super);
    function CustomStamp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], CustomStamp.prototype, "customStampName", void 0);
    __decorate([
        Property('')
    ], CustomStamp.prototype, "customStampImageSource", void 0);
    return CustomStamp;
}(ChildProperty));
export { CustomStamp };
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
var AnnotationToolbarSettings = /** @class */ (function (_super) {
    __extends(AnnotationToolbarSettings, _super);
    function AnnotationToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], AnnotationToolbarSettings.prototype, "showTooltip", void 0);
    __decorate([
        Property()
    ], AnnotationToolbarSettings.prototype, "annotationToolbarItem", void 0);
    return AnnotationToolbarSettings;
}(ChildProperty));
export { AnnotationToolbarSettings };
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
var FormDesignerToolbarSettings = /** @class */ (function (_super) {
    __extends(FormDesignerToolbarSettings, _super);
    function FormDesignerToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], FormDesignerToolbarSettings.prototype, "showTooltip", void 0);
    __decorate([
        Property()
    ], FormDesignerToolbarSettings.prototype, "formDesignerToolbarItem", void 0);
    return FormDesignerToolbarSettings;
}(ChildProperty));
export { FormDesignerToolbarSettings };
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
var SignatureFieldSettings = /** @class */ (function (_super) {
    __extends(SignatureFieldSettings, _super);
    function SignatureFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], SignatureFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], SignatureFieldSettings.prototype, "name", void 0);
    __decorate([
        Property(false)
    ], SignatureFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], SignatureFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], SignatureFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], SignatureFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], SignatureFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], SignatureFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], SignatureFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property()
    ], SignatureFieldSettings.prototype, "signatureDialogSettings", void 0);
    __decorate([
        Property()
    ], SignatureFieldSettings.prototype, "signatureIndicatorSettings", void 0);
    __decorate([
        Property(null)
    ], SignatureFieldSettings.prototype, "customData", void 0);
    __decorate([
        Property()
    ], SignatureFieldSettings.prototype, "typeSignatureFonts", void 0);
    return SignatureFieldSettings;
}(ChildProperty));
export { SignatureFieldSettings };
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
var InitialFieldSettings = /** @class */ (function (_super) {
    __extends(InitialFieldSettings, _super);
    function InitialFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], InitialFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], InitialFieldSettings.prototype, "name", void 0);
    __decorate([
        Property(false)
    ], InitialFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], InitialFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], InitialFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], InitialFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], InitialFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], InitialFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], InitialFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(false)
    ], InitialFieldSettings.prototype, "isInitialField", void 0);
    __decorate([
        Property()
    ], InitialFieldSettings.prototype, "initialDialogSettings", void 0);
    __decorate([
        Property()
    ], InitialFieldSettings.prototype, "initialIndicatorSettings", void 0);
    __decorate([
        Property(null)
    ], InitialFieldSettings.prototype, "customData", void 0);
    __decorate([
        Property()
    ], InitialFieldSettings.prototype, "typeInitialFonts", void 0);
    return InitialFieldSettings;
}(ChildProperty));
export { InitialFieldSettings };
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
var SignatureIndicatorSettings = /** @class */ (function (_super) {
    __extends(SignatureIndicatorSettings, _super);
    function SignatureIndicatorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], SignatureIndicatorSettings.prototype, "opacity", void 0);
    __decorate([
        Property('orange')
    ], SignatureIndicatorSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property(19)
    ], SignatureIndicatorSettings.prototype, "width", void 0);
    __decorate([
        Property(10)
    ], SignatureIndicatorSettings.prototype, "height", void 0);
    __decorate([
        Property(10)
    ], SignatureIndicatorSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(null)
    ], SignatureIndicatorSettings.prototype, "text", void 0);
    __decorate([
        Property('black')
    ], SignatureIndicatorSettings.prototype, "color", void 0);
    return SignatureIndicatorSettings;
}(ChildProperty));
export { SignatureIndicatorSettings };
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
var SignatureDialogSettings = /** @class */ (function (_super) {
    __extends(SignatureDialogSettings, _super);
    function SignatureDialogSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload)
    ], SignatureDialogSettings.prototype, "displayMode", void 0);
    __decorate([
        Property(false)
    ], SignatureDialogSettings.prototype, "hideSaveSignature", void 0);
    return SignatureDialogSettings;
}(ChildProperty));
export { SignatureDialogSettings };
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
var ServerActionSettings = /** @class */ (function (_super) {
    __extends(ServerActionSettings, _super);
    function ServerActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Load')
    ], ServerActionSettings.prototype, "load", void 0);
    __decorate([
        Property('Unload')
    ], ServerActionSettings.prototype, "unload", void 0);
    __decorate([
        Property('RenderPdfPages')
    ], ServerActionSettings.prototype, "renderPages", void 0);
    __decorate([
        Property('RenderPdfPages')
    ], ServerActionSettings.prototype, "print", void 0);
    __decorate([
        Property('Download')
    ], ServerActionSettings.prototype, "download", void 0);
    __decorate([
        Property('RenderThumbnailImages')
    ], ServerActionSettings.prototype, "renderThumbnail", void 0);
    __decorate([
        Property('RenderAnnotationComments')
    ], ServerActionSettings.prototype, "renderComments", void 0);
    __decorate([
        Property('ImportAnnotations')
    ], ServerActionSettings.prototype, "importAnnotations", void 0);
    __decorate([
        Property('ExportAnnotations')
    ], ServerActionSettings.prototype, "exportAnnotations", void 0);
    __decorate([
        Property('ImportFormFields')
    ], ServerActionSettings.prototype, "importFormFields", void 0);
    __decorate([
        Property('ExportFormFields')
    ], ServerActionSettings.prototype, "exportFormFields", void 0);
    __decorate([
        Property('RenderPdfTexts')
    ], ServerActionSettings.prototype, "renderTexts", void 0);
    __decorate([
        Property('ValidatePassword')
    ], ServerActionSettings.prototype, "validatePassword", void 0);
    return ServerActionSettings;
}(ChildProperty));
export { ServerActionSettings };
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
var StrikethroughSettings = /** @class */ (function (_super) {
    __extends(StrikethroughSettings, _super);
    function StrikethroughSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], StrikethroughSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], StrikethroughSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ff0000')
    ], StrikethroughSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], StrikethroughSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], StrikethroughSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(null)
    ], StrikethroughSettings.prototype, "customData", void 0);
    __decorate([
        Property(false)
    ], StrikethroughSettings.prototype, "isLock", void 0);
    __decorate([
        Property(false)
    ], StrikethroughSettings.prototype, "enableMultiPageAnnotation", void 0);
    __decorate([
        Property(false)
    ], StrikethroughSettings.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(['None'])
    ], StrikethroughSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], StrikethroughSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], StrikethroughSettings.prototype, "subject", void 0);
    return StrikethroughSettings;
}(ChildProperty));
export { StrikethroughSettings };
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
var UnderlineSettings = /** @class */ (function (_super) {
    __extends(UnderlineSettings, _super);
    function UnderlineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], UnderlineSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], UnderlineSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#00ff00')
    ], UnderlineSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], UnderlineSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], UnderlineSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(null)
    ], UnderlineSettings.prototype, "customData", void 0);
    __decorate([
        Property(false)
    ], UnderlineSettings.prototype, "isLock", void 0);
    __decorate([
        Property(false)
    ], UnderlineSettings.prototype, "enableMultiPageAnnotation", void 0);
    __decorate([
        Property(false)
    ], UnderlineSettings.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(['None'])
    ], UnderlineSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], UnderlineSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], UnderlineSettings.prototype, "subject", void 0);
    return UnderlineSettings;
}(ChildProperty));
export { UnderlineSettings };
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
var HighlightSettings = /** @class */ (function (_super) {
    __extends(HighlightSettings, _super);
    function HighlightSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], HighlightSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], HighlightSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#FFDF56')
    ], HighlightSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], HighlightSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], HighlightSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(null)
    ], HighlightSettings.prototype, "customData", void 0);
    __decorate([
        Property(false)
    ], HighlightSettings.prototype, "isLock", void 0);
    __decorate([
        Property(false)
    ], HighlightSettings.prototype, "enableMultiPageAnnotation", void 0);
    __decorate([
        Property(false)
    ], HighlightSettings.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(['None'])
    ], HighlightSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], HighlightSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], HighlightSettings.prototype, "subject", void 0);
    return HighlightSettings;
}(ChildProperty));
export { HighlightSettings };
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
var LineSettings = /** @class */ (function (_super) {
    __extends(LineSettings, _super);
    function LineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], LineSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], LineSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], LineSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], LineSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], LineSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], LineSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], LineSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], LineSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], LineSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "borderDashArray", void 0);
    __decorate([
        Property('')
    ], LineSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], LineSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], LineSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], LineSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], LineSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], LineSettings.prototype, "subject", void 0);
    return LineSettings;
}(ChildProperty));
export { LineSettings };
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
var ArrowSettings = /** @class */ (function (_super) {
    __extends(ArrowSettings, _super);
    function ArrowSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], ArrowSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], ArrowSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], ArrowSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], ArrowSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], ArrowSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], ArrowSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], ArrowSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], ArrowSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], ArrowSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "borderDashArray", void 0);
    __decorate([
        Property('')
    ], ArrowSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], ArrowSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], ArrowSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], ArrowSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], ArrowSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], ArrowSettings.prototype, "subject", void 0);
    return ArrowSettings;
}(ChildProperty));
export { ArrowSettings };
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
var RectangleSettings = /** @class */ (function (_super) {
    __extends(RectangleSettings, _super);
    function RectangleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], RectangleSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], RectangleSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(100)
    ], RectangleSettings.prototype, "width", void 0);
    __decorate([
        Property(50)
    ], RectangleSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], RectangleSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], RectangleSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], RectangleSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], RectangleSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], RectangleSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], RectangleSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], RectangleSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], RectangleSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], RectangleSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], RectangleSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], RectangleSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], RectangleSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], RectangleSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], RectangleSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], RectangleSettings.prototype, "subject", void 0);
    return RectangleSettings;
}(ChildProperty));
export { RectangleSettings };
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
var CircleSettings = /** @class */ (function (_super) {
    __extends(CircleSettings, _super);
    function CircleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], CircleSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], CircleSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(100)
    ], CircleSettings.prototype, "width", void 0);
    __decorate([
        Property(100)
    ], CircleSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], CircleSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], CircleSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], CircleSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], CircleSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], CircleSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], CircleSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], CircleSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], CircleSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], CircleSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], CircleSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], CircleSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], CircleSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], CircleSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], CircleSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], CircleSettings.prototype, "subject", void 0);
    return CircleSettings;
}(ChildProperty));
export { CircleSettings };
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
var ShapeLabelSettings = /** @class */ (function (_super) {
    __extends(ShapeLabelSettings, _super);
    function ShapeLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], ShapeLabelSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], ShapeLabelSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#000')
    ], ShapeLabelSettings.prototype, "fontColor", void 0);
    __decorate([
        Property(16)
    ], ShapeLabelSettings.prototype, "fontSize", void 0);
    __decorate([
        Property('Helvetica')
    ], ShapeLabelSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property('Label')
    ], ShapeLabelSettings.prototype, "labelContent", void 0);
    __decorate([
        Property('')
    ], ShapeLabelSettings.prototype, "notes", void 0);
    return ShapeLabelSettings;
}(ChildProperty));
export { ShapeLabelSettings };
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
var PolygonSettings = /** @class */ (function (_super) {
    __extends(PolygonSettings, _super);
    function PolygonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], PolygonSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], PolygonSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], PolygonSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], PolygonSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], PolygonSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], PolygonSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], PolygonSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], PolygonSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], PolygonSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], PolygonSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], PolygonSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], PolygonSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], PolygonSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], PolygonSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], PolygonSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], PolygonSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], PolygonSettings.prototype, "subject", void 0);
    return PolygonSettings;
}(ChildProperty));
export { PolygonSettings };
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
var StampSettings = /** @class */ (function (_super) {
    __extends(StampSettings, _super);
    function StampSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], StampSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], StampSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(150)
    ], StampSettings.prototype, "width", void 0);
    __decorate([
        Property(50)
    ], StampSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], StampSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Guest')
    ], StampSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], StampSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], StampSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], StampSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], StampSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], StampSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], StampSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], StampSettings.prototype, "customData", void 0);
    __decorate([
        Property([])
    ], StampSettings.prototype, "dynamicStamps", void 0);
    __decorate([
        Property([])
    ], StampSettings.prototype, "signStamps", void 0);
    __decorate([
        Property([])
    ], StampSettings.prototype, "standardBusinessStamps", void 0);
    __decorate([
        Property(['None'])
    ], StampSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], StampSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], StampSettings.prototype, "subject", void 0);
    return StampSettings;
}(ChildProperty));
export { StampSettings };
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
var CustomStampSettings = /** @class */ (function (_super) {
    __extends(CustomStampSettings, _super);
    function CustomStampSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], CustomStampSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], CustomStampSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], CustomStampSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Guest')
    ], CustomStampSettings.prototype, "author", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "left", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "top", void 0);
    __decorate([
        Property(false)
    ], CustomStampSettings.prototype, "isAddToMenu", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], CustomStampSettings.prototype, "isLock", void 0);
    __decorate([
        Property('')
    ], CustomStampSettings.prototype, "customStamps", void 0);
    __decorate([
        Property(true)
    ], CustomStampSettings.prototype, "enableCustomStamp", void 0);
    __decorate([
        Property(['None'])
    ], CustomStampSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], CustomStampSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], CustomStampSettings.prototype, "subject", void 0);
    return CustomStampSettings;
}(ChildProperty));
export { CustomStampSettings };
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
var DistanceSettings = /** @class */ (function (_super) {
    __extends(DistanceSettings, _super);
    function DistanceSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], DistanceSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], DistanceSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], DistanceSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ff0000')
    ], DistanceSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], DistanceSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], DistanceSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], DistanceSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], DistanceSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], DistanceSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "borderDashArray", void 0);
    __decorate([
        Property('')
    ], DistanceSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], DistanceSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], DistanceSettings.prototype, "customData", void 0);
    __decorate([
        Property(40)
    ], DistanceSettings.prototype, "leaderLength", void 0);
    __decorate([
        Property(CursorType.move)
    ], DistanceSettings.prototype, "resizeCursorType", void 0);
    __decorate([
        Property(['None'])
    ], DistanceSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], DistanceSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], DistanceSettings.prototype, "subject", void 0);
    return DistanceSettings;
}(ChildProperty));
export { DistanceSettings };
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
var PerimeterSettings = /** @class */ (function (_super) {
    __extends(PerimeterSettings, _super);
    function PerimeterSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], PerimeterSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], PerimeterSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], PerimeterSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], PerimeterSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], PerimeterSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], PerimeterSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], PerimeterSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], PerimeterSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], PerimeterSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "borderDashArray", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], PerimeterSettings.prototype, "isLock", void 0);
    __decorate([
        Property('')
    ], PerimeterSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(['None'])
    ], PerimeterSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], PerimeterSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], PerimeterSettings.prototype, "subject", void 0);
    return PerimeterSettings;
}(ChildProperty));
export { PerimeterSettings };
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
var AreaSettings = /** @class */ (function (_super) {
    __extends(AreaSettings, _super);
    function AreaSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], AreaSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], AreaSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], AreaSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], AreaSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], AreaSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], AreaSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], AreaSettings.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], AreaSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], AreaSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], AreaSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], AreaSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], AreaSettings.prototype, "isLock", void 0);
    __decorate([
        Property('')
    ], AreaSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(['None'])
    ], AreaSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], AreaSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], AreaSettings.prototype, "subject", void 0);
    return AreaSettings;
}(ChildProperty));
export { AreaSettings };
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
var RadiusSettings = /** @class */ (function (_super) {
    __extends(RadiusSettings, _super);
    function RadiusSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], RadiusSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], RadiusSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(100)
    ], RadiusSettings.prototype, "width", void 0);
    __decorate([
        Property(90)
    ], RadiusSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], RadiusSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], RadiusSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], RadiusSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], RadiusSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], RadiusSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], RadiusSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], RadiusSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], RadiusSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], RadiusSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], RadiusSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], RadiusSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], RadiusSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], RadiusSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], RadiusSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], RadiusSettings.prototype, "subject", void 0);
    return RadiusSettings;
}(ChildProperty));
export { RadiusSettings };
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
var VolumeSettings = /** @class */ (function (_super) {
    __extends(VolumeSettings, _super);
    function VolumeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], VolumeSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], VolumeSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], VolumeSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], VolumeSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], VolumeSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], VolumeSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], VolumeSettings.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], VolumeSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], VolumeSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], VolumeSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], VolumeSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], VolumeSettings.prototype, "isLock", void 0);
    __decorate([
        Property('')
    ], VolumeSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(['None'])
    ], VolumeSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], VolumeSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], VolumeSettings.prototype, "subject", void 0);
    return VolumeSettings;
}(ChildProperty));
export { VolumeSettings };
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
var InkAnnotationSettings = /** @class */ (function (_super) {
    __extends(InkAnnotationSettings, _super);
    function InkAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], InkAnnotationSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], InkAnnotationSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(0)
    ], InkAnnotationSettings.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], InkAnnotationSettings.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], InkAnnotationSettings.prototype, "path", void 0);
    __decorate([
        Property(1)
    ], InkAnnotationSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ff0000')
    ], InkAnnotationSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property(1)
    ], InkAnnotationSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], InkAnnotationSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(false)
    ], InkAnnotationSettings.prototype, "isLock", void 0);
    __decorate([
        Property('Guest')
    ], InkAnnotationSettings.prototype, "author", void 0);
    __decorate([
        Property(['None'])
    ], InkAnnotationSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(null)
    ], InkAnnotationSettings.prototype, "customData", void 0);
    __decorate([
        Property(true)
    ], InkAnnotationSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], InkAnnotationSettings.prototype, "subject", void 0);
    return InkAnnotationSettings;
}(ChildProperty));
export { InkAnnotationSettings };
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
var StickyNotesSettings = /** @class */ (function (_super) {
    __extends(StickyNotesSettings, _super);
    function StickyNotesSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], StickyNotesSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], StickyNotesSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('Guest')
    ], StickyNotesSettings.prototype, "author", void 0);
    __decorate([
        Property(1)
    ], StickyNotesSettings.prototype, "opacity", void 0);
    __decorate([
        Property('')
    ], StickyNotesSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(null)
    ], StickyNotesSettings.prototype, "customData", void 0);
    __decorate([
        Property(false)
    ], StickyNotesSettings.prototype, "isLock", void 0);
    __decorate([
        Property(['None'])
    ], StickyNotesSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], StickyNotesSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], StickyNotesSettings.prototype, "subject", void 0);
    return StickyNotesSettings;
}(ChildProperty));
export { StickyNotesSettings };
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
var MeasurementSettings = /** @class */ (function (_super) {
    __extends(MeasurementSettings, _super);
    function MeasurementSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MeasurementSettings.prototype, "scaleRatio", void 0);
    __decorate([
        Property('in')
    ], MeasurementSettings.prototype, "conversionUnit", void 0);
    __decorate([
        Property('in')
    ], MeasurementSettings.prototype, "displayUnit", void 0);
    __decorate([
        Property(96)
    ], MeasurementSettings.prototype, "depth", void 0);
    return MeasurementSettings;
}(ChildProperty));
export { MeasurementSettings };
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
var FreeTextSettings = /** @class */ (function (_super) {
    __extends(FreeTextSettings, _super);
    function FreeTextSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], FreeTextSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], FreeTextSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], FreeTextSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], FreeTextSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(1)
    ], FreeTextSettings.prototype, "borderWidth", void 0);
    __decorate([
        Property('solid')
    ], FreeTextSettings.prototype, "borderStyle", void 0);
    __decorate([
        Property('Guest')
    ], FreeTextSettings.prototype, "author", void 0);
    __decorate([
        Property('#ffffff00')
    ], FreeTextSettings.prototype, "fillColor", void 0);
    __decorate([
        Property(16)
    ], FreeTextSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(151)
    ], FreeTextSettings.prototype, "width", void 0);
    __decorate([
        Property(24.6)
    ], FreeTextSettings.prototype, "height", void 0);
    __decorate([
        Property('#000')
    ], FreeTextSettings.prototype, "fontColor", void 0);
    __decorate([
        Property('Helvetica')
    ], FreeTextSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property('TypeHere')
    ], FreeTextSettings.prototype, "defaultText", void 0);
    __decorate([
        Property('None')
    ], FreeTextSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('Left')
    ], FreeTextSettings.prototype, "textAlignment", void 0);
    __decorate([
        Property(false)
    ], FreeTextSettings.prototype, "allowEditTextOnly", void 0);
    __decorate([
        Property('')
    ], FreeTextSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], FreeTextSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], FreeTextSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], FreeTextSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], FreeTextSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], FreeTextSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], FreeTextSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], FreeTextSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], FreeTextSettings.prototype, "isPrint", void 0);
    __decorate([
        Property(false)
    ], FreeTextSettings.prototype, "isReadonly", void 0);
    __decorate([
        Property(false)
    ], FreeTextSettings.prototype, "enableAutoFit", void 0);
    __decorate([
        Property('')
    ], FreeTextSettings.prototype, "subject", void 0);
    return FreeTextSettings;
}(ChildProperty));
export { FreeTextSettings };
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
var AnnotationSelectorSettings = /** @class */ (function (_super) {
    __extends(AnnotationSelectorSettings, _super);
    function AnnotationSelectorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], AnnotationSelectorSettings.prototype, "selectionBorderColor", void 0);
    __decorate([
        Property('black')
    ], AnnotationSelectorSettings.prototype, "resizerBorderColor", void 0);
    __decorate([
        Property('#FF4081')
    ], AnnotationSelectorSettings.prototype, "resizerFillColor", void 0);
    __decorate([
        Property(8)
    ], AnnotationSelectorSettings.prototype, "resizerSize", void 0);
    __decorate([
        Property(1)
    ], AnnotationSelectorSettings.prototype, "selectionBorderThickness", void 0);
    __decorate([
        Property('Square')
    ], AnnotationSelectorSettings.prototype, "resizerShape", void 0);
    __decorate([
        Property('')
    ], AnnotationSelectorSettings.prototype, "selectorLineDashArray", void 0);
    __decorate([
        Property(AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges)
    ], AnnotationSelectorSettings.prototype, "resizerLocation", void 0);
    __decorate([
        Property(null)
    ], AnnotationSelectorSettings.prototype, "resizerCursorType", void 0);
    return AnnotationSelectorSettings;
}(ChildProperty));
export { AnnotationSelectorSettings };
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
var TextSearchColorSettings = /** @class */ (function (_super) {
    __extends(TextSearchColorSettings, _super);
    function TextSearchColorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#fdd835')
    ], TextSearchColorSettings.prototype, "searchHighlightColor", void 0);
    __decorate([
        Property('#8b4c12')
    ], TextSearchColorSettings.prototype, "searchColor", void 0);
    return TextSearchColorSettings;
}(ChildProperty));
export { TextSearchColorSettings };
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
var PageInfo = /** @class */ (function (_super) {
    __extends(PageInfo, _super);
    function PageInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], PageInfo.prototype, "pageIndex", void 0);
    __decorate([
        Property(0)
    ], PageInfo.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], PageInfo.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], PageInfo.prototype, "rotation", void 0);
    return PageInfo;
}(ChildProperty));
export { PageInfo };
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
var HandWrittenSignatureSettings = /** @class */ (function (_super) {
    __extends(HandWrittenSignatureSettings, _super);
    function HandWrittenSignatureSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#000000')
    ], HandWrittenSignatureSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "thickness", void 0);
    __decorate([
        Property(150)
    ], HandWrittenSignatureSettings.prototype, "width", void 0);
    __decorate([
        Property(100)
    ], HandWrittenSignatureSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "saveSignatureLimit", void 0);
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "saveInitialLimit", void 0);
    __decorate([
        Property([])
    ], HandWrittenSignatureSettings.prototype, "signatureItem", void 0);
    __decorate([
        Property()
    ], HandWrittenSignatureSettings.prototype, "typeSignatureFonts", void 0);
    __decorate([
        Property('')
    ], HandWrittenSignatureSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property()
    ], HandWrittenSignatureSettings.prototype, "signatureDialogSettings", void 0);
    __decorate([
        Property()
    ], HandWrittenSignatureSettings.prototype, "initialDialogSettings", void 0);
    __decorate([
        Property({ x: 0, y: 0 })
    ], HandWrittenSignatureSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('')
    ], HandWrittenSignatureSettings.prototype, "path", void 0);
    __decorate([
        Property('Helvetica')
    ], HandWrittenSignatureSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(false)
    ], HandWrittenSignatureSettings.prototype, "canSave", void 0);
    return HandWrittenSignatureSettings;
}(ChildProperty));
export { HandWrittenSignatureSettings };
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
var AnnotationSettings = /** @class */ (function (_super) {
    __extends(AnnotationSettings, _super);
    function AnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Guest')
    ], AnnotationSettings.prototype, "author", void 0);
    __decorate([
        Property(0)
    ], AnnotationSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], AnnotationSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], AnnotationSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], AnnotationSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], AnnotationSettings.prototype, "isLock", void 0);
    __decorate([
        Property(false)
    ], AnnotationSettings.prototype, "skipPrint", void 0);
    __decorate([
        Property(false)
    ], AnnotationSettings.prototype, "skipDownload", void 0);
    __decorate([
        Property(null)
    ], AnnotationSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], AnnotationSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property('')
    ], AnnotationSettings.prototype, "subject", void 0);
    return AnnotationSettings;
}(ChildProperty));
export { AnnotationSettings };
/**
 * The `DocumentTextCollectionSettings` module is used to provide the properties to DocumentTextCollection.
 */
var DocumentTextCollectionSettings = /** @class */ (function (_super) {
    __extends(DocumentTextCollectionSettings, _super);
    function DocumentTextCollectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], DocumentTextCollectionSettings.prototype, "textData", void 0);
    __decorate([
        Property()
    ], DocumentTextCollectionSettings.prototype, "pageText", void 0);
    __decorate([
        Property()
    ], DocumentTextCollectionSettings.prototype, "pageSize", void 0);
    return DocumentTextCollectionSettings;
}(ChildProperty));
export { DocumentTextCollectionSettings };
/**
 * The `TextDataSettings` module is used to provide the properties of text data.
 */
var TextDataSettings = /** @class */ (function (_super) {
    __extends(TextDataSettings, _super);
    function TextDataSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], TextDataSettings.prototype, "bounds", void 0);
    __decorate([
        Property()
    ], TextDataSettings.prototype, "text", void 0);
    return TextDataSettings;
}(ChildProperty));
export { TextDataSettings };
/**
 * The `RectangleBounds` module is used to provide the properties of rectangle bounds.
 */
var RectangleBounds = /** @class */ (function (_super) {
    __extends(RectangleBounds, _super);
    function RectangleBounds() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], RectangleBounds.prototype, "size", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "x", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "y", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "width", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "height", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "left", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "top", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "right", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "bottom", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "isEmpty", void 0);
    return RectangleBounds;
}(ChildProperty));
export { RectangleBounds };
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
var TileRenderingSettings = /** @class */ (function (_super) {
    __extends(TileRenderingSettings, _super);
    function TileRenderingSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], TileRenderingSettings.prototype, "enableTileRendering", void 0);
    __decorate([
        Property(0)
    ], TileRenderingSettings.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], TileRenderingSettings.prototype, "y", void 0);
    return TileRenderingSettings;
}(ChildProperty));
export { TileRenderingSettings };
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
var ScrollSettings = /** @class */ (function (_super) {
    __extends(ScrollSettings, _super);
    function ScrollSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(100)
    ], ScrollSettings.prototype, "delayPageRequestTimeOnScroll", void 0);
    return ScrollSettings;
}(ChildProperty));
export { ScrollSettings };
/**
 * The `FormField` is used to store the form fields of PDF document.
 */
var FormField = /** @class */ (function (_super) {
    __extends(FormField, _super);
    function FormField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], FormField.prototype, "name", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isChecked", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isSelected", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "id", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "value", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "type", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isReadOnly", void 0);
    __decorate([
        Property([''])
    ], FormField.prototype, "signatureType", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "fontName", void 0);
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], FormField.prototype, "bounds", void 0);
    __decorate([
        Property('Helvetica')
    ], FormField.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], FormField.prototype, "fontSize", void 0);
    __decorate([
        Property('None')
    ], FormField.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], FormField.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], FormField.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], FormField.prototype, "alignment", void 0);
    __decorate([
        Property('visible')
    ], FormField.prototype, "visibility", void 0);
    __decorate([
        Property(0)
    ], FormField.prototype, "maxLength", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "tooltip", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "options", void 0);
    __decorate([
        Property()
    ], FormField.prototype, "signatureIndicatorSettings", void 0);
    __decorate([
        Property(1)
    ], FormField.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], FormField.prototype, "borderColor", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isMultiline", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "insertSpaces", void 0);
    __decorate([
        Property(-1)
    ], FormField.prototype, "pageIndex", void 0);
    __decorate([
        Property(1)
    ], FormField.prototype, "pageNumber", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isTransparent", void 0);
    __decorate([
        Property(0)
    ], FormField.prototype, "rotateAngle", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "selectedIndex", void 0);
    __decorate([
        Property(0)
    ], FormField.prototype, "zIndex", void 0);
    __decorate([
        Property(null)
    ], FormField.prototype, "customData", void 0);
    return FormField;
}(ChildProperty));
export { FormField };
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
var ContextMenuSettings = /** @class */ (function (_super) {
    __extends(ContextMenuSettings, _super);
    function ContextMenuSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('RightClick')
    ], ContextMenuSettings.prototype, "contextMenuAction", void 0);
    __decorate([
        Property([])
    ], ContextMenuSettings.prototype, "contextMenuItems", void 0);
    return ContextMenuSettings;
}(ChildProperty));
export { ContextMenuSettings };
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
var TextFieldSettings = /** @class */ (function (_super) {
    __extends(TextFieldSettings, _super);
    function TextFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], TextFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], TextFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], TextFieldSettings.prototype, "value", void 0);
    __decorate([
        Property('Helvetica')
    ], TextFieldSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], TextFieldSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(0)
    ], TextFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('None')
    ], TextFieldSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], TextFieldSettings.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], TextFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], TextFieldSettings.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], TextFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], TextFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(0)
    ], TextFieldSettings.prototype, "maxLength", void 0);
    __decorate([
        Property(false)
    ], TextFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], TextFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], TextFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], TextFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], TextFieldSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(false)
    ], TextFieldSettings.prototype, "isMultiline", void 0);
    __decorate([
        Property(null)
    ], TextFieldSettings.prototype, "customData", void 0);
    return TextFieldSettings;
}(ChildProperty));
export { TextFieldSettings };
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
var PasswordFieldSettings = /** @class */ (function (_super) {
    __extends(PasswordFieldSettings, _super);
    function PasswordFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], PasswordFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], PasswordFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], PasswordFieldSettings.prototype, "value", void 0);
    __decorate([
        Property(0)
    ], PasswordFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('Helvetica')
    ], PasswordFieldSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], PasswordFieldSettings.prototype, "fontSize", void 0);
    __decorate([
        Property('None')
    ], PasswordFieldSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], PasswordFieldSettings.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], PasswordFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], PasswordFieldSettings.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], PasswordFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], PasswordFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(0)
    ], PasswordFieldSettings.prototype, "maxLength", void 0);
    __decorate([
        Property(false)
    ], PasswordFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], PasswordFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], PasswordFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], PasswordFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], PasswordFieldSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(null)
    ], PasswordFieldSettings.prototype, "customData", void 0);
    return PasswordFieldSettings;
}(ChildProperty));
export { PasswordFieldSettings };
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
var CheckBoxFieldSettings = /** @class */ (function (_super) {
    __extends(CheckBoxFieldSettings, _super);
    function CheckBoxFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], CheckBoxFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], CheckBoxFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], CheckBoxFieldSettings.prototype, "value", void 0);
    __decorate([
        Property(false)
    ], CheckBoxFieldSettings.prototype, "isChecked", void 0);
    __decorate([
        Property('white')
    ], CheckBoxFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property(false)
    ], CheckBoxFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], CheckBoxFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], CheckBoxFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property(0)
    ], CheckBoxFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('')
    ], CheckBoxFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(false)
    ], CheckBoxFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(1)
    ], CheckBoxFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], CheckBoxFieldSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(null)
    ], CheckBoxFieldSettings.prototype, "customData", void 0);
    return CheckBoxFieldSettings;
}(ChildProperty));
export { CheckBoxFieldSettings };
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
var RadioButtonFieldSettings = /** @class */ (function (_super) {
    __extends(RadioButtonFieldSettings, _super);
    function RadioButtonFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], RadioButtonFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], RadioButtonFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], RadioButtonFieldSettings.prototype, "value", void 0);
    __decorate([
        Property(false)
    ], RadioButtonFieldSettings.prototype, "isSelected", void 0);
    __decorate([
        Property('white')
    ], RadioButtonFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property(false)
    ], RadioButtonFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property(false)
    ], RadioButtonFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(0)
    ], RadioButtonFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('visible')
    ], RadioButtonFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], RadioButtonFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], RadioButtonFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], RadioButtonFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], RadioButtonFieldSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(null)
    ], RadioButtonFieldSettings.prototype, "customData", void 0);
    return RadioButtonFieldSettings;
}(ChildProperty));
export { RadioButtonFieldSettings };
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
var DropdownFieldSettings = /** @class */ (function (_super) {
    __extends(DropdownFieldSettings, _super);
    function DropdownFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], DropdownFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], DropdownFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], DropdownFieldSettings.prototype, "value", void 0);
    __decorate([
        Property('Helvetica')
    ], DropdownFieldSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], DropdownFieldSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(0)
    ], DropdownFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('None')
    ], DropdownFieldSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], DropdownFieldSettings.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], DropdownFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], DropdownFieldSettings.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], DropdownFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], DropdownFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], DropdownFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], DropdownFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], DropdownFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property('')
    ], DropdownFieldSettings.prototype, "options", void 0);
    __decorate([
        Property(1)
    ], DropdownFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], DropdownFieldSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(null)
    ], DropdownFieldSettings.prototype, "customData", void 0);
    return DropdownFieldSettings;
}(ChildProperty));
export { DropdownFieldSettings };
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
var ListBoxFieldSettings = /** @class */ (function (_super) {
    __extends(ListBoxFieldSettings, _super);
    function ListBoxFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], ListBoxFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], ListBoxFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], ListBoxFieldSettings.prototype, "value", void 0);
    __decorate([
        Property('Helvetica')
    ], ListBoxFieldSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], ListBoxFieldSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(0)
    ], ListBoxFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('None')
    ], ListBoxFieldSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], ListBoxFieldSettings.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], ListBoxFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], ListBoxFieldSettings.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], ListBoxFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], ListBoxFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], ListBoxFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], ListBoxFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], ListBoxFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property([])
    ], ListBoxFieldSettings.prototype, "options", void 0);
    __decorate([
        Property(1)
    ], ListBoxFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], ListBoxFieldSettings.prototype, "borderColor", void 0);
    return ListBoxFieldSettings;
}(ChildProperty));
export { ListBoxFieldSettings };
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Item.prototype, "itemName", void 0);
    __decorate([
        Property('')
    ], Item.prototype, "itemValue", void 0);
    return Item;
}(ChildProperty));
export { Item };
/**
 * Defines the combination of keys and modifier keys.
 */
var KeyGesture = /** @class */ (function (_super) {
    __extends(KeyGesture, _super);
    function KeyGesture() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], KeyGesture.prototype, "pdfKeys", void 0);
    __decorate([
        Property()
    ], KeyGesture.prototype, "modifierKeys", void 0);
    return KeyGesture;
}(ChildProperty));
export { KeyGesture };
/**
 * Defines a command and a key gesture to define when the command should be executed.
 */
var KeyboardCommand = /** @class */ (function (_super) {
    __extends(KeyboardCommand, _super);
    function KeyboardCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], KeyboardCommand.prototype, "name", void 0);
    __decorate([
        Complex({}, KeyGesture)
    ], KeyboardCommand.prototype, "gesture", void 0);
    return KeyboardCommand;
}(ChildProperty));
export { KeyboardCommand };
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
var CommandManager = /** @class */ (function (_super) {
    __extends(CommandManager, _super);
    function CommandManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Collection([], KeyboardCommand)
    ], CommandManager.prototype, "keyboardCommand", void 0);
    return CommandManager;
}(ChildProperty));
export { CommandManager };
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
var PageOrganizerSettings = /** @class */ (function (_super) {
    __extends(PageOrganizerSettings, _super);
    function PageOrganizerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], PageOrganizerSettings.prototype, "canDelete", void 0);
    __decorate([
        Property(true)
    ], PageOrganizerSettings.prototype, "canInsert", void 0);
    __decorate([
        Property(true)
    ], PageOrganizerSettings.prototype, "canRotate", void 0);
    __decorate([
        Property(true)
    ], PageOrganizerSettings.prototype, "canCopy", void 0);
    __decorate([
        Property(true)
    ], PageOrganizerSettings.prototype, "canRearrange", void 0);
    __decorate([
        Property(true)
    ], PageOrganizerSettings.prototype, "canImport", void 0);
    return PageOrganizerSettings;
}(ChildProperty));
export { PageOrganizerSettings };
/**
 * The `SearchResult` provides the page index along with an array of bounds that indicate the locations of the search text identified on that page.
 */
var SearchResult = /** @class */ (function (_super) {
    __extends(SearchResult, _super);
    function SearchResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], SearchResult.prototype, "pageIndex", void 0);
    __decorate([
        Property([])
    ], SearchResult.prototype, "bounds", void 0);
    return SearchResult;
}(ChildProperty));
export { SearchResult };
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
var PdfViewer = /** @class */ (function (_super) {
    __extends(PdfViewer, _super);
    function PdfViewer(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Checks if the form fields are loaded for the document in the PdfViewer control.
         *
         * @private
         */
        _this.isFormFieldsLoaded = false;
        /**
         * Get the Loaded document signature Collections in the PdfViewer control.
         *
         * {% codeBlock src='pdfviewer/signatureCollection/index.md' %}{% endcodeBlock %}
         *
         */
        _this.signatureCollection = [];
        /**
         * Gets or sets the document name loaded in the PdfViewer control.
         *
         * {% codeBlock src='pdfviewer/fileName/index.md' %}{% endcodeBlock %}
         *
         */
        _this.fileName = null;
        /**
         * @private
         */
        _this.zIndex = -1;
        /**
         * @private
         */
        _this.nameTable = {};
        /**   @private  */
        _this.clipboardData = {};
        /**
         * @private
         */
        _this.zIndexTable = [];
        _this.isTextSelectionStarted = false;
        /**
         * @private
         */
        _this.touchPadding = 10;
        /**
         * @private
         */
        _this.paddingDifferenceValue = 10;
        /** @hidden */
        _this.defaultLocale = {
            'PdfViewer': 'PDF Viewer',
            'Cancel': 'Cancel',
            'Download file': 'Download file',
            'Download': 'Download',
            'Enter Password': 'This document is password protected. Please enter a password.',
            'File Corrupted': 'File Corrupted',
            'File Corrupted Content': 'The file is corrupted and cannot be opened.',
            'Fit Page': 'Fit Page',
            'Fit Width': 'Fit Width',
            'Automatic': 'Automatic',
            'Go To First Page': 'Show first page',
            'Invalid Password': 'Incorrect Password. Please try again.',
            'Next Page': 'Show next page',
            'OK': 'OK',
            'Open': 'Open file',
            'Page Number': 'Current page number',
            'Previous Page': 'Show previous page',
            'Go To Last Page': 'Show last page',
            'Zoom': 'Zoom',
            'Zoom In': 'Zoom in',
            'Zoom Out': 'Zoom out',
            'Page Thumbnails': 'Page Thumbnails',
            'Bookmarks': 'Bookmarks',
            'Print': 'Print file',
            'Organize Pages': 'Organize Pages',
            'Insert Right': 'Insert Right',
            'Insert Left': 'Insert Left',
            'Total': 'Total',
            'Pages': 'Pages',
            'Rotate Right': 'Rotate Right',
            'Rotate Left': 'Rotate Left',
            'Delete Page': 'Delete Page',
            'Delete Pages': 'Delete Pages',
            'Copy Page': 'Copy Page',
            'Copy Pages': 'Copy Pages',
            'Save': 'Save',
            'Save As': 'Save As',
            'Select All': 'Select All',
            'Import Document': 'Import Document',
            'Password Protected': 'Password Required',
            'Copy': 'Copy',
            'Text Selection': 'Text selection tool',
            'Panning': 'Pan mode',
            'Text Search': 'Find text',
            'Find in document': 'Find in document',
            'Match case': 'Match case',
            'Match any word': 'Match any word',
            'Apply': 'Apply',
            'GoToPage': 'Go to Page',
            'No Matches': 'PDF Viewer has finished searching the document. No matches were found.',
            'No More Matches': 'PDF Viewer has finished searching the document. No more matches were found.',
            'No Search Matches': 'No matches found',
            'No More Search Matches': 'No more matches found',
            'Exact Matches': 'EXACT MATCHES',
            'Total Matches': 'TOTAL MATCHES',
            'Undo': 'Undo',
            'Redo': 'Redo',
            'Annotation': 'Add or Edit annotations',
            'FormDesigner': 'Add and Edit Form Fields',
            'Highlight': 'Highlight Text',
            'Underline': 'Underline Text',
            'Strikethrough': 'Strikethrough Text',
            'Delete': 'Delete annotation',
            'Opacity': 'Opacity',
            'Color edit': 'Change Color',
            'Opacity edit': 'Change Opacity',
            'Highlight context': 'Highlight',
            'Underline context': 'Underline',
            'Strikethrough context': 'Strikethrough',
            'Server error': 'Web-service is not listening. PDF Viewer depends on web-service for all it\'s features. Please start the web service to continue.',
            'Client error': 'Client-side error is found. Please check the custom headers provided in the AjaxRequestSettings property and web action methods in the ServerActionSettings property.',
            'Open text': 'Open',
            'First text': 'First Page',
            'Previous text': 'Previous Page',
            'Next text': 'Next Page',
            'Last text': 'Last Page',
            'Zoom in text': 'Zoom In',
            'Zoom out text': 'Zoom Out',
            'Selection text': 'Selection',
            'Pan text': 'Pan',
            'Print text': 'Print',
            'Search text': 'Search',
            'Annotation Edit text': 'Edit Annotation',
            'FormDesigner Edit text': 'Add and Edit Form Fields',
            'Line Thickness': 'Line Thickness',
            'Line Properties': 'Line Properties',
            'Start Arrow': 'Start Arrow',
            'End Arrow': 'End Arrow',
            'Line Style': 'Line Style',
            'Fill Color': 'Fill Color',
            'Line Color': 'Line Color',
            'None': 'None',
            'Open Arrow': 'Open',
            'Closed Arrow': 'Closed',
            'Round Arrow': 'Round',
            'Square Arrow': 'Square',
            'Diamond Arrow': 'Diamond',
            'Butt': 'Butt',
            'Cut': 'Cut',
            'Paste': 'Paste',
            'Delete Context': 'Delete',
            'Properties': 'Properties',
            'Add Stamp': 'Add Stamp',
            'Add Shapes': 'Add Shapes',
            'Stroke edit': 'Change Stroke Color',
            'Change thickness': 'Change Border Thickness',
            'Add line': 'Add Line',
            'Add arrow': 'Add Arrow',
            'Add rectangle': 'Add Rectangle',
            'Add circle': 'Add Circle',
            'Add polygon': 'Add Polygon',
            'Add Comments': 'Add Comments',
            'Comments': 'Comments',
            'SubmitForm': 'Submit Form',
            'No Comments Yet': 'No Comments Yet',
            'Accepted': 'Accepted',
            'Completed': 'Completed',
            'Cancelled': 'Cancelled',
            'Rejected': 'Rejected',
            'Leader Length': 'Leader Length',
            'Scale Ratio': 'Scale Ratio',
            'Calibrate': 'Calibrate',
            'Calibrate Distance': 'Calibrate Distance',
            'Calibrate Perimeter': 'Calibrate Perimeter',
            'Calibrate Area': 'Calibrate Area',
            'Calibrate Radius': 'Calibrate Radius',
            'Calibrate Volume': 'Calibrate Volume',
            'Depth': 'Depth',
            'Closed': 'Closed',
            'Round': 'Round',
            'Square': 'Square',
            'Diamond': 'Diamond',
            'Edit': 'Edit',
            'Comment': 'Comment',
            'Comment Panel': 'Comment Panel',
            'Set Status': 'Set Status',
            'Post': 'Post',
            'Page': 'Page',
            'Add a comment': 'Add a comment',
            'Add a reply': 'Add a reply',
            'Import Annotations': 'Import annotations from JSON file',
            'Export Annotations': 'Export annotation to JSON file',
            'Export XFDF': 'Export annotation to XFDF file',
            'Import XFDF': 'Import annotations from XFDF file',
            'Add': 'Add',
            'Clear': 'Clear',
            'Bold': 'Bold',
            'Italic': 'Italic',
            'Strikethroughs': 'Strikethrough',
            'Underlines': 'Underline',
            'Superscript': 'Superscript',
            'Subscript': 'Subscript',
            'Align left': 'Align Left',
            'Align right': 'Align Right',
            'Center': 'Center',
            'Justify': 'Justify',
            'Font color': 'Font Color',
            'Text Align': 'Text Align',
            'Text Properties': 'Font Style',
            'SignatureFieldDialogHeaderText': 'Add Signature',
            'HandwrittenSignatureDialogHeaderText': 'Add Signature',
            'InitialFieldDialogHeaderText': 'Add Initial',
            'HandwrittenInitialDialogHeaderText': 'Add Initial',
            'Draw Ink': 'Draw Ink',
            'Create': 'Create',
            'Font family': 'Font Family',
            'Font size': 'Font Size',
            'Free Text': 'Free Text',
            'Import Failed': 'Invalid JSON file type or file name; please select a valid JSON file',
            'Import PDF Failed': 'Invalid PDF file type or PDF file not found. Please select a valid PDF file',
            'File not found': 'Imported JSON file is not found in the desired location',
            'Export Failed': 'Export annotations action has failed; please ensure annotations are added properly',
            'of': 'of ',
            'Dynamic': 'Dynamic',
            'Standard Business': 'Standard Business',
            'Sign Here': 'Sign Here',
            'Custom Stamp': 'Custom Stamp',
            'Enter Signature as Name': 'Enter your name',
            'Draw-hand Signature': 'DRAW',
            'Type Signature': 'TYPE',
            'Upload Signature': 'UPLOAD',
            'Browse Signature Image': 'BROWSE',
            'Save Signature': 'Save Signature',
            'Save Initial': 'Save Initial',
            'Textbox': 'Textbox',
            'Password': 'Password',
            'Check Box': 'Checkbox',
            'Radio Button': 'Radio Button',
            'Dropdown': 'Drop Down',
            'List Box': 'List Box',
            'Signature': 'Signature',
            'Delete FormField': 'Delete Form Field',
            'Textbox Properties': 'Textbox Properties',
            'Name': 'Name',
            'Tooltip': 'Tooltip',
            'Value': 'Value',
            'Form Field Visibility': 'Form Field Visibility',
            'Read Only': 'Read Only',
            'Required': 'Required',
            'Checked': 'Checked',
            'Show Printing': 'Show Printing',
            'Formatting': 'Format',
            'Fill': 'Fill',
            'Border': 'Border',
            'Border Color': 'Border Color',
            'Thickness': 'Thickness',
            'Max Length': 'Max Length',
            'List Item': 'Item Name',
            'Export Value': 'Item Value',
            'Dropdown Item List': 'Dropdown Item List',
            'List Box Item List': 'List Box Item List',
            'General': 'GENERAL',
            'Appearance': 'APPEARANCE',
            'Options': 'OPTIONS',
            'Delete Item': 'Delete',
            'Up': 'Up',
            'Down': 'Down',
            'Multiline': 'Multiline',
            'Revised': 'Revised',
            'Reviewed': 'Reviewed',
            'Received': 'Received',
            'Confidential': 'Confidential',
            'Approved': 'Approved',
            'Not Approved': 'Not Approved',
            'Witness': 'Witness',
            'Initial Here': 'Initial Here',
            'Draft': 'Draft',
            'Final': 'Final',
            'For Public Release': 'For Public Release',
            'Not For Public Release': 'Not For Public Release',
            'For Comment': 'For Comment',
            'Void': 'Void',
            'Preliminary Results': 'Preliminary Results',
            'Information Only': 'Information Only',
            'in': 'in',
            'm': 'm',
            'ft_in': 'ft_in',
            'ft': 'ft',
            'p': 'p',
            'cm': 'cm',
            'mm': 'mm',
            'pt': 'pt',
            'cu': 'cu',
            'sq': 'sq',
            'Initial': 'Initial'
        };
        _this.viewerBase = new PdfViewerBase(_this);
        _this.drawing = new Drawing(_this);
        _this.pdfRendererModule = new PdfRenderer(_this, _this.viewerBase);
        return _this;
    }
    Object.defineProperty(PdfViewer.prototype, "zoomPercentage", {
        /**
         * Returns the current zoom percentage of the PdfViewer control.
         *
         * @asptype int
         * @blazorType int
         * @returns {number} - number
         */
        get: function () {
            return this.magnificationModule.zoomFactor * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "bookmark", {
        /**
         * Gets the bookmark view object of the pdf viewer.
         *
         * @asptype BookmarkView
         * @blazorType BookmarkView
         * @returns { BookmarkView } - Bookmark view module
         */
        get: function () {
            return this.bookmarkViewModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "print", {
        /**
         * Gets the print object of the pdf viewer.
         *
         * @asptype Print
         * @blazorType Print
         * @returns { Print } - Print module
         */
        get: function () {
            return this.printModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "magnification", {
        /**
         * Gets the magnification object of the pdf viewer.
         *
         * @asptype Magnification
         * @blazorType Magnification
         * @returns { Magnification } - Magnification module
         */
        get: function () {
            return this.magnificationModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "navigation", {
        /**
         * Gets the navigation object of the pdf viewer.
         *
         * @asptype Navigation
         * @blazorType Navigation
         * @returns { Navigation } - Navigation module
         */
        get: function () {
            return this.navigationModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "textSearch", {
        /**
         * Gets the text search object of the pdf viewer.
         *
         * @asptype TextSearch
         * @blazorType TextSearch
         * @returns { TextSearch } - Text search module
         */
        get: function () {
            return this.textSearchModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "toolbar", {
        /**
         * Gets the toolbar object of the pdf viewer.
         *
         * @asptype Toolbar
         * @blazorType Toolbar
         * @returns { Toolbar } - Toolbar module
         */
        get: function () {
            return this.toolbarModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "thumbnailView", {
        /**
         * Gets the thumbnail-view object of the pdf viewer.
         *
         * @asptype ThumbnailView
         * @blazorType ThumbnailView
         * @returns { ThumbnailView } - Thumbnail view module
         */
        get: function () {
            return this.thumbnailViewModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "annotation", {
        /**
         * Gets the annotation object of the pdf viewer.
         *
         * @asptype Annotation
         * @blazorType Annotation
         * @returns { Annotation } - Annotation module
         */
        get: function () {
            return this.annotationModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "formDesigner", {
        /**
         * Gets the FormDesigner object of the pdf viewer.
         *
         * @asptype FormDesigner
         * @blazorType FormDesigner
         * @returns { FormDesigner } - Form designer module
         */
        get: function () {
            return this.formDesignerModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "textSelection", {
        /**
         * Gets the TextSelection object of the pdf viewer.
         *
         * @asptype TextSelection
         * @blazorType TextSelection
         * @returns { TextSelection } - Text selection module
         */
        get: function () {
            return this.textSelectionModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "accessibilityTags", {
        /**
         * Gets the Accessibility Tags object of the pdf viewer.
         *
         * @asptype AccessibilityTags
         * @blazorType AccessibilityTags
         * @returns { AccessibilityTags } - Accessibility tags module
         */
        get: function () {
            return this.accessibilityTagsModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "pdfRenderer", {
        /**
         * Gets the Pdf renderer object of the pdf renderer.
         *
         * @asptype PdfRenderer
         * @blazorType PdfRenderer
         * @returns { PdfRenderer } - Pdf renderer module
         * @private
         */
        get: function () {
            return this.pdfRendererModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "pageOrganizer", {
        /**
         * Gets the page organizer object of the PDF Viewer.
         *
         * @asptype PageOrganizer
         * @blazorType PageOrganizer
         * @returns { PageOrganizer } - Page organizer module
         */
        get: function () {
            return this.pageOrganizerModule;
        },
        enumerable: true,
        configurable: true
    });
    PdfViewer.prototype.preRender = function () {
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
        if (!isNullOrUndefined(this.element) && this.element.id === '') {
            //Set unique id, if id is empty
            this.element.id = this.getUniqueElementId();
        }
        if (Browser.isDevice) {
            //EJ2-63562 - Reduced the touchPadding of mobile devices to 16 to improve selection of fields without affecting resizing ability.
            this.touchPadding = 16;
        }
        this.updateLocalStorage(this.enableLocalStorage);
    };
    PdfViewer.prototype.getUniqueElementId = function () {
        return 'pdfViewer_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
    };
    PdfViewer.prototype.initializePdfiumModule = function (fontCollection) {
        this.viewerBase.pdfViewerRunner.addTask({
            url: this.getScriptPathForPlatform(),
            fonts: fontCollection,
            message: 'initialLoading'
        }, TaskPriorityLevel.High);
    };
    PdfViewer.prototype.render = function () {
        var _this = this;
        if (this.enableHtmlSanitizer && this.serviceUrl) {
            this.serviceUrl = SanitizeHtmlHelper.sanitize(this.serviceUrl);
        }
        if (isNullOrUndefined(this.serviceUrl) || this.serviceUrl === '') {
            this.viewerBase.clientSideRendering = true;
        }
        if (this.viewerBase.clientSideRendering) {
            // eslint-disable-next-line
            var proxy_1 = this;
            var workerBob = new Blob([PdfiumRunner.toString().replace(/^[^{]*{([\s\S]*)}$/m, '$1')], { type: 'text/javascript' });
            var workerBlobUrl = URL.createObjectURL(workerBob);
            window['pdfViewerRunner_' + this.element.id] = this.viewerBase.pdfViewerRunner = new PdfiumTaskScheduler(workerBlobUrl, proxy_1);
            if (this.customFonts && this.customFonts.length > 0) {
                PdfViewerUtils.fetchCustomFonts(this.customFonts, this.getScriptPathForPlatform()).then(function (fontCollection) {
                    _this.pdfRenderer.FallbackFontCollection = fontCollection;
                    _this.initializePdfiumModule(fontCollection);
                });
            }
            else {
                this.initializePdfiumModule({});
            }
            this.viewerBase.pdfViewerRunner.onMessage('loaded', function (event) {
                if (event.data.message === 'loaded') {
                    proxy_1.renderComponent();
                    proxy_1.fireResourcesLoaded();
                }
            });
        }
        else {
            this.renderComponent();
        }
    };
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
    PdfViewer.prototype.exportAsImage = function (pageIndex, size) {
        var image;
        if (!isNullOrUndefined(size)) {
            image = this.pdfRendererModule.exportAsImagewithSize(pageIndex, size);
        }
        else {
            image = this.pdfRendererModule.exportAsImage(pageIndex);
        }
        return image;
    };
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
    PdfViewer.prototype.exportAsImages = function (startIndex, endIndex, size) {
        var imageDeatils;
        if (!isNullOrUndefined(size)) {
            imageDeatils = this.pdfRendererModule.exportAsImagesWithSize(startIndex, endIndex, size);
        }
        else {
            imageDeatils = this.pdfRendererModule.exportAsImages(startIndex, endIndex);
        }
        return imageDeatils;
    };
    /**
     * Extracts text from one or multiple pages in the PDF document based on the specified criteria.
     *
     * This method retrieves the text data and associated information from the specified page(s) in the PDF document.
     * Based on the input parameters, it can extract text data from either a single page or a range of pages.
     *
     * @param {number} startIndex - The starting page index for text extraction.
     * @param {number | ExtractTextOption} endIndexOrIsoptions - Either the ending page index for the text extraction
     *        or the options for text extraction if extracting text from a single page.
     * @param {ExtractTextOption} [options] - Optional parameter that specifies additional options for text extraction
     *        when extracting from multiple pages.
     *
     * @returns {Promise<{textData: TextDataSettingsModel[], pageText: string}>} - A promise that resolves with an object containing two properties:
     * - textData: An array of TextDataSettingsModel objects, each representing details and structure of extracted text.
     * - pageText: A concatenated string of the text extracted from the page(s).
     *          {Promise<{pageText: string}>} - A promise resolving with an object containing the extracted plain text
     *                                           from a single page.
     *          {Promise<{textData: TextDataSettingsModel[]}>} - A promise resolving with an array of extracted text
     *                                                            data models from a single page.
     */
    PdfViewer.prototype.extractText = function (startIndex, endIndexOrIsoptions, options) {
        var isLayout = true;
        var endIndex;
        var option;
        // Determines the correct values for endIndex and isLayout
        if (typeof endIndexOrIsoptions === 'number') {
            endIndex = endIndexOrIsoptions;
            option = options;
        }
        else {
            option = endIndexOrIsoptions;
        }
        if (isNullOrUndefined(endIndex)) {
            endIndex = startIndex;
        }
        return this.pdfRendererModule.extractsText(startIndex, endIndex, option, isLayout);
    };
    PdfViewer.prototype.getScriptPathForPlatform = function () {
        if (this.enableHtmlSanitizer && this.resourceUrl) {
            this.resourceUrl = SanitizeHtmlHelper.sanitize(this.resourceUrl);
        }
        if (!isNullOrUndefined(this.resourceUrl) && this.resourceUrl !== '') {
            if (this.resourceUrl.indexOf('/ej2-pdfviewer-lib') !== -1) {
                return this.resourceUrl;
            }
            return this.resourceUrl + '/ej2-pdfviewer-lib';
        }
        var _a = document.location, protocol = _a.protocol, host = _a.host, pathname = _a.pathname;
        // Remove trailing slashes from the pathname using a regular expression
        var trimmedPathname = pathname.replace(/\/+$/, '');
        var baseUrl = protocol + "//" + host + trimmedPathname;
        if (this.isAngular || (this.parent && this.parent.isAngular)) {
            return baseUrl + '/assets/ej2-pdfviewer-lib';
        }
        else if (this.isReact || (this.parent && this.parent.isReact)) {
            return baseUrl + '/ej2-pdfviewer-lib';
        }
        else if ((this.isVue || (this.parent && this.parent.isVue)) ||
            (this.isVue3 || (this.parent && this.parent.isVue3))) {
            return baseUrl + '/public/js/ej2-pdfviewer-lib';
        }
        else {
            window.getRunningScript = function () {
                return function () {
                    var stackTrace = new Error().stack;
                    // eslint-disable-next-line
                    var match = stackTrace && stackTrace.match(/(?:http[s]?:\/\/(?:[^\/\s]+\/))(.*\.js)/);
                    return match ? match[0] : 'src/pdfviewer/pdfviewer.js';
                };
            };
            var scriptLinkURL = window.getRunningScript()();
            var splitURL = scriptLinkURL.split('/');
            var path = scriptLinkURL.replace('/' + splitURL[splitURL.length - 1], '');
            return path + '/ej2-pdfviewer-lib';
        }
    };
    PdfViewer.prototype.renderComponent = function () {
        this.viewerBase.initializeComponent();
        if (!this.enableFormFields) {
            this.formFieldsModule = new FormFields(this, this.viewerBase);
            this.formFieldsModule.formFieldsReadOnly(this.enableFormFields);
        }
        if (this.enableTextSelection && this.textSelectionModule) {
            this.textSelectionModule.enableTextSelectionMode();
        }
        else {
            this.viewerBase.disableTextSelectionMode();
        }
        this.drawing.renderLabels(this);
        this.renderComplete();
    };
    PdfViewer.prototype.getModuleName = function () {
        return 'PdfViewer';
    };
    /**
     * @private
     * @returns {Object} - Object
     */
    PdfViewer.prototype.getLocaleConstants = function () {
        return this.defaultLocale;
    };
    /**
     * To modify the Json Data in ajax request.
     *
     * @param jsonData
     * @returns void
     */
    PdfViewer.prototype.setJsonData = function (jsonData) {
        this.viewerBase.ajaxData = jsonData;
    };
    PdfViewer.prototype.updateLocalStorage = function (enable) {
        if (enable && !PdfViewerBase.sessionStorageManager.enableLocalStorage) {
            PdfViewerBase.sessionStorageManager.migrateToLocalStorage(true);
        }
        else {
            this.enableLocalStorage = PdfViewerBase.sessionStorageManager.enableLocalStorage;
        }
    };
    PdfViewer.prototype.onPropertyChanged = function (newProp, oldProp) {
        var requireRefresh = false;
        if (this.isDestroyed) {
            return;
        }
        var properties = Object.keys(newProp);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            switch (prop) {
                case 'locale':
                    if (this.viewerBase.loadedData) {
                        var data = null;
                        if (this.formFieldsModule) {
                            data = this.viewerBase.getItemFromSessionStorage('_formfields');
                        }
                        if (data) {
                            this.viewerBase.formfieldvalue = JSON.parse(data);
                            var annotCollection = this.annotationCollection;
                            var filename = this.viewerBase.jsonDocumentId;
                            _super.prototype.refresh.call(this);
                            this.load(this.viewerBase.loadedData, null);
                            this.addAnnotation(annotCollection);
                            this.viewerBase.loadedData = null;
                            this.downloadFileName = filename;
                            this.fileName = filename;
                        }
                    }
                    break;
                case 'toolbarSettings':
                    if (!Browser.isDevice || this.enableDesktopMode) {
                        this.toolbar.applyToolbarSettings();
                        if (!isNullOrUndefined(this.toolbar.annotationToolbarModule)) {
                            this.toolbar.annotationToolbarModule.applyAnnotationToolbarSettings();
                        }
                        if (!isNullOrUndefined(this.toolbar.formDesignerToolbarModule)) {
                            this.toolbar.formDesignerToolbarModule.applyFormDesignerToolbarSettings();
                        }
                    }
                    else {
                        this.toolbar.applyToolbarSettingsForMobile();
                        this.toolbar.annotationToolbarModule.applyMobileAnnotationToolbarSettings();
                    }
                    break;
                case 'enableToolbar':
                    this.notify('', { module: 'toolbar', enable: this.enableToolbar });
                    requireRefresh = true;
                    break;
                case 'enableLocalStorage':
                    this.updateLocalStorage(this.enableLocalStorage);
                    break;
                case 'enableCommentPanel':
                    this.notify('', { module: 'annotation', enable: this.enableCommentPanel });
                    requireRefresh = true;
                    if (this.toolbarModule && this.toolbarModule.annotationToolbarModule) {
                        this.toolbarModule.annotationToolbarModule.enableCommentPanelTool(this.enableCommentPanel);
                    }
                    if (!this.enableCommentPanel) {
                        if (this.viewerBase.navigationPane) {
                            this.viewerBase.navigationPane.closeCommentPanelContainer();
                        }
                    }
                    break;
                case 'documentPath':
                    if (!this.viewerBase.isSkipDocumentPath) {
                        if (!isBlazor()) {
                            this.load(newProp.documentPath, null);
                        }
                        else {
                            this._dotnetInstance.invokeMethodAsync('LoadDocumentFromClient', newProp.documentPath);
                        }
                    }
                    else {
                        this.viewerBase.isSkipDocumentPath = false;
                    }
                    break;
                case 'interactionMode':
                    this.interactionMode = newProp.interactionMode;
                    if (newProp.interactionMode === 'Pan') {
                        this.viewerBase.initiatePanning();
                        if (this.toolbar) {
                            this.toolbar.updateInteractionTools(false);
                        }
                    }
                    else if (newProp.interactionMode === 'TextSelection') {
                        this.viewerBase.initiateTextSelectMode();
                        if (this.toolbar) {
                            this.toolbar.updateInteractionTools(true);
                        }
                    }
                    break;
                case 'height':
                    this.height = newProp.height;
                    this.viewerBase.updateHeight();
                    this.viewerBase.onWindowResize();
                    if (this.toolbar && this.toolbar.annotationToolbarModule) {
                        if (this.toolbar.annotationToolbarModule.isToolbarHidden) {
                            this.toolbar.annotationToolbarModule.adjustViewer(false);
                        }
                        else {
                            this.toolbar.annotationToolbarModule.adjustViewer(true);
                        }
                    }
                    break;
                case 'width':
                    this.width = newProp.width;
                    this.viewerBase.updateWidth();
                    this.viewerBase.onWindowResize();
                    break;
                case 'customStamp':
                    this.renderCustomerStamp(this.customStamp[0]);
                    break;
                case 'customStampSettings':
                    if (newProp.customStampSettings.customStamps) {
                        for (var i = 0; i < newProp.customStampSettings.customStamps.length; i++) {
                            this.viewerBase.customStampCollection.push({ customStampName: this.customStampSettings.
                                    customStamps[parseInt(i.toString(), 10)].customStampName, customStampImageSource: this.customStampSettings.customStamps[parseInt(i.toString(), 10)].customStampImageSource });
                        }
                    }
                    break;
                case 'enableFormFields':
                    if (this.enableFormFields && this.formFieldsModule) {
                        for (var m = 0; m < this.pageCount; m++) {
                            this.formFieldsModule.renderFormFields(m, false);
                        }
                    }
                    else {
                        this.formFieldsModule = new FormFields(this, this.viewerBase);
                        this.formFieldsModule.formFieldsReadOnly(this.enableFormFields);
                    }
                    break;
                case 'designerMode':
                    if (this.designerMode) {
                        this.formDesignerModule.setMode('designer');
                    }
                    else {
                        this.formDesignerModule.setMode('edit');
                    }
                    break;
                case 'highlightSettings':
                case 'underlineSettings':
                case 'strikethroughSettings':
                    if (this.annotationModule && this.annotationModule.textMarkupAnnotationModule) {
                        this.annotationModule.textMarkupAnnotationModule.updateTextMarkupSettings(prop);
                    }
                    break;
                case 'signatureFieldSettings':
                case 'initialFieldSettings':
                    if (this.formDesignerModule) {
                        var isInitialField = (prop === 'initialFieldSettings');
                        // eslint-disable-next-line security/detect-object-injection
                        this.formDesignerModule.updateSignatureSettings(newProp[prop], isInitialField);
                    }
                    break;
                case 'textFieldSettings':
                    if (this.formDesignerModule) {
                        // eslint-disable-next-line security/detect-object-injection
                        this.formDesignerModule.updateTextFieldSettings(newProp[prop]);
                    }
                    break;
                case 'passwordFieldSettings':
                    if (this.formDesignerModule) {
                        // eslint-disable-next-line security/detect-object-injection
                        this.formDesignerModule.updatePasswordFieldSettings(newProp[prop]);
                    }
                    break;
                case 'checkBoxFieldSettings':
                    if (this.formDesignerModule) {
                        // eslint-disable-next-line security/detect-object-injection
                        this.formDesignerModule.updateCheckBoxFieldSettings(newProp[prop]);
                    }
                    break;
                case 'radioButtonFieldSettings':
                    if (this.formDesignerModule) {
                        // eslint-disable-next-line security/detect-object-injection
                        this.formDesignerModule.updateRadioButtonFieldSettings(newProp[prop]);
                    }
                    break;
                case 'DropdownFieldSettings':
                    if (this.formDesignerModule) {
                        // eslint-disable-next-line security/detect-object-injection
                        this.formDesignerModule.updateDropDownFieldSettings(newProp[prop]);
                    }
                    break;
                case 'listBoxFieldSettings':
                    if (this.formDesignerModule) {
                        // eslint-disable-next-line security/detect-object-injection
                        this.formDesignerModule.updateListBoxFieldSettings(newProp[prop]);
                    }
                    break;
                case 'isFormDesignerToolbarVisible':
                    if (!Browser.isDevice || this.enableDesktopMode) {
                        if (this.toolbarModule && this.formDesignerModule && !oldProp.isFormDesignerToolbarVisible &&
                            newProp.isFormDesignerToolbarVisible) {
                            if (this.toolbarModule.annotationToolbarModule && this.isAnnotationToolbarVisible) {
                                this.isAnnotationToolbarVisible = false;
                                this.toolbarModule.annotationToolbarModule.showAnnotationToolbar();
                            }
                            this.toolbarModule.formDesignerToolbarModule.resetFormDesignerToolbar();
                        }
                        else {
                            if (!isNullOrUndefined(this.toolbarModule) && !isNullOrUndefined(this.formDesignerModule) &&
                                this.toolbarModule.formDesignerToolbarModule && !this.isFormDesignerToolbarVisible) {
                                this.isFormDesignerToolbarVisible = false;
                                this.formDesignerModule.setMode('edit');
                                this.toolbarModule.formDesignerToolbarModule.resetFormDesignerToolbar();
                            }
                        }
                    }
                    break;
                case 'isAnnotationToolbarVisible':
                    if (!Browser.isDevice || this.enableDesktopMode) {
                        if (this.toolbarModule && this.annotationModule && !oldProp.isAnnotationToolbarVisible &&
                            newProp.isAnnotationToolbarVisible) {
                            if (this.toolbarModule.formDesignerToolbarModule && this.isFormDesignerToolbarVisible) {
                                this.isFormDesignerToolbarVisible = false;
                                this.toolbarModule.formDesignerToolbarModule.showFormDesignerToolbar();
                            }
                            this.toolbarModule.annotationToolbarModule.resetToolbar();
                        }
                    }
                    else {
                        if (this.toolbarModule) {
                            this.toolbar.showAnnotationToolbar(newProp.isAnnotationToolbarVisible);
                        }
                    }
                    break;
                case 'serviceUrl':
                    if (isNullOrUndefined(newProp.serviceUrl) || newProp.serviceUrl === '') {
                        this.viewerBase.clientSideRendering = true;
                    }
                    else {
                        this.viewerBase.clientSideRendering = false;
                    }
                    break;
                case 'pageOrganizerSettings':
                    if (!isNullOrUndefined(newProp.pageOrganizerSettings)) {
                        if (isNullOrUndefined(newProp.pageOrganizerSettings.canDelete)) {
                            this.pageOrganizerSettings.canDelete = true;
                        }
                        if (isNullOrUndefined(newProp.pageOrganizerSettings.canRotate)) {
                            this.pageOrganizerSettings.canRotate = true;
                        }
                        if (isNullOrUndefined(newProp.pageOrganizerSettings.canInsert)) {
                            this.pageOrganizerSettings.canInsert = true;
                        }
                        if (isNullOrUndefined(newProp.pageOrganizerSettings.canCopy)) {
                            this.pageOrganizerSettings.canCopy = true;
                        }
                        if (isNullOrUndefined(newProp.pageOrganizerSettings.canRearrange)) {
                            this.pageOrganizerSettings.canRearrange = true;
                        }
                        if (isNullOrUndefined(newProp.pageOrganizerSettings.canImport)) {
                            this.pageOrganizerSettings.canImport = true;
                        }
                    }
                    break;
            }
        }
    };
    PdfViewer.prototype.renderCustomerStamp = function (customStamp) {
        this.annotation.stampAnnotationModule.isStampAddMode = true;
        this.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
        this.viewerBase.stampAdded = true;
        this.viewerBase.isAlreadyAdded = false;
        this.annotation.stampAnnotationModule.createCustomStampAnnotation(customStamp.customStampImageSource, customStamp.customStampName);
    };
    PdfViewer.prototype.getPersistData = function () {
        return 'PdfViewer';
    };
    PdfViewer.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableMagnification) {
            modules.push({
                member: 'Magnification', args: [this, this.viewerBase]
            });
        }
        if (this.enableNavigation) {
            modules.push({
                member: 'Navigation', args: [this, this.viewerBase]
            });
        }
        if (this.enableToolbar || this.enableNavigationToolbar || this.enableAnnotationToolbar || this.enableFormDesignerToolbar) {
            modules.push({
                member: 'Toolbar', args: [this, this.viewerBase]
            });
        }
        if (this.enableHyperlink) {
            modules.push({
                member: 'LinkAnnotation', args: [this, this.viewerBase]
            });
        }
        if (this.enableThumbnail) {
            modules.push({
                member: 'ThumbnailView', args: [this, this.viewerBase]
            });
        }
        if (this.enableBookmark) {
            modules.push({
                member: 'BookmarkView', args: [this, this.viewerBase]
            });
        }
        if (this.enableTextSelection) {
            modules.push({
                member: 'TextSelection', args: [this, this.viewerBase]
            });
        }
        if (this.enableTextSearch) {
            modules.push({
                member: 'TextSearch', args: [this, this.viewerBase]
            });
        }
        if (this.enablePrint) {
            modules.push({
                member: 'Print', args: [this, this.viewerBase]
            });
        }
        if (this.enableAnnotation) {
            modules.push({
                member: 'Annotation', args: [this, this.viewerBase]
            });
        }
        if (this.enableFormFields) {
            modules.push({
                member: 'FormFields', args: [this, this.viewerBase]
            });
        }
        if (this.enableFormDesigner && !isBlazor()) {
            modules.push({
                member: 'FormDesigner', args: [this, this.viewerBase]
            });
        }
        if (this.enableAccessibilityTags) {
            modules.push({
                member: 'AccessibilityTags', args: [this, this.viewerBase]
            });
        }
        if (isNullOrUndefined(this.serviceUrl) || this.serviceUrl === '') {
            modules.push({
                member: 'PdfRenderer', args: [this, this.viewerBase]
            });
        }
        if (this.enablePageOrganizer) {
            modules.push({
                member: 'PageOrganizer', args: [this, this.viewerBase]
            });
        }
        return modules;
    };
    /**
     * Loads the given PDF document in the PDF viewer control
     *
     * @param  {string} document - Specifies the document name for load
     * @param  {string} password - Specifies the Given document password
     * @returns {void}
     */
    PdfViewer.prototype.load = function (document, password) {
        this.loadDocInternally(document, password);
    };
    /**
     * Loads the given PDF document internally in the PDF viewer control
     *
     * @param  {string} document - Specifies the document name for load
     * @param  {string} password - Specifies the Given document password
     * @param  {boolean} isSkipDocumentId - It indicates whether we need to skip removing the jsonDocumentId
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.loadDocInternally = function (document, password, isSkipDocumentId) {
        if (isSkipDocumentId === void 0) { isSkipDocumentId = true; }
        if (this.pageCount !== 0) {
            this.viewerBase.clear(true);
        }
        else {
            this.viewerBase.clear(false);
        }
        this.pageCount = 0;
        this.currentPageNumber = 0;
        if (!isBlazor()) {
            if (this.toolbarModule) {
                this.toolbarModule.resetToolbar();
            }
        }
        else {
            this.viewerBase.blazorUIAdaptor.resetToolbar();
        }
        this.isFormFieldsLoaded = true;
        if (this.viewerBase.documentPathByteArray instanceof Uint8Array && !this.viewerBase.clientSideRendering) {
            var base64String = this.convertByteArrayToBase64(this.viewerBase.documentPathByteArray);
            this.viewerBase.initiatePageRender(base64String, password);
        }
        else {
            this.viewerBase.initiatePageRender(document, password, isSkipDocumentId);
        }
    };
    PdfViewer.prototype.convertByteArrayToBase64 = function (byteArray) {
        var binaryString = '';
        var byteArrayLength = byteArray.byteLength;
        for (var i = 0; i < byteArrayLength; i++) {
            binaryString += String.fromCharCode(byteArray[parseInt(i.toString(), 10)]);
        }
        return btoa(binaryString);
    };
    /**
     * Loads the given PDF document in the PDF viewer control
     *
     * @param {string} documentId - It describes about the document Id value
     * @param {boolean} isFileName - It ensures whether the file name is true or not
     * @param {string} fileName - It describes about the file name
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.loadDocument = function (documentId, isFileName, fileName) {
        if (this.pageCount !== 0) {
            this.viewerBase.clear(true);
        }
        else {
            this.viewerBase.clear(false);
        }
        this.viewerBase.clear(!isNullOrUndefined(this.customContextMenuItems));
        this.pageCount = 0;
        this.currentPageNumber = 0;
        this.viewerBase.blazorUIAdaptor.resetToolbar();
        this.fileName = fileName;
        this.viewerBase.initiateLoadDocument(documentId, isFileName, fileName);
    };
    /**
     * Loads the PDF document with the document details in the PDF viewer control
     *
     * @param {any} documentDetails - It describes about the document details
     * @param {string} password - It describes about the password value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.loadSuccess = function (documentDetails, password) {
        this.viewerBase.loadSuccess(documentDetails, password);
    };
    /**
     * Set the focus of the given element
     *
     * @param {string} elementId - It describes about the element id value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.focusElement = function (elementId) {
        var element = document.getElementById(elementId);
        if (element != null) {
            element.focus();
        }
    };
    /**
     * Downloads the PDF document being loaded in the ejPdfViewer control.
     *
     * @returns {void}
     */
    PdfViewer.prototype.download = function () {
        if (this.enableDownload) {
            this.viewerBase.download();
        }
    };
    /**
     * Saves the PDF document being loaded in the PDF Viewer control as blob.
     *
     * @returns {Promise<Blob>} - Promise
     */
    PdfViewer.prototype.saveAsBlob = function () {
        var _this = this;
        if (this.enableDownload) {
            return new Promise(function (resolve, reject) {
                resolve(_this.viewerBase.saveAsBlob());
            });
        }
        else {
            return null;
        }
    };
    /**
     * updates the PDF Viewer container width and height from externally.
     *
     * @returns {void}
     */
    PdfViewer.prototype.updateViewerContainer = function () {
        this.viewerBase.updateViewerContainer();
    };
    /**
     * Retrieves the information of a specified page in the viewer.
     * @param {number} pageIndex - The page index to get the details. The first page is 0.
     * @returns {PageInfo} - An instance of the PageInfo model containing the page information.
     */
    PdfViewer.prototype.getPageInfo = function (pageIndex) {
        var pageDetails = {};
        if (!isNullOrUndefined(pageIndex) && typeof pageIndex == 'number' && !isNullOrUndefined(this.viewerBase.pageSize)
            && this.viewerBase.pageSize.length !== 0 && pageIndex >= 0 && pageIndex < this.viewerBase.pageSize.length) {
            var pageIndexValue = parseInt(pageIndex.toString(), 10);
            var pageSizeDetails = this.viewerBase.pageSize[pageIndexValue];
            pageDetails.pageIndex = pageIndexValue;
            pageDetails.height = this.viewerBase.ConvertPixelToPoint(pageSizeDetails.height);
            pageDetails.width = this.viewerBase.ConvertPixelToPoint(pageSizeDetails.width);
            pageDetails.rotation = this.viewerBase.getAngle(pageSizeDetails.rotation);
        }
        return pageDetails;
    };
    /**
     * Specifies the message to be displayed  in the popup.
     *
     * @param {string} errorString - It describes about the error string value
     * @returns {void}
     */
    PdfViewer.prototype.showNotificationPopup = function (errorString) {
        this.viewerBase.showNotificationPopup(errorString);
    };
    /**
     * Focus a form field in a document by its field name or the field object.
     *
     * @param {any} field - It describes about the field value
     * @returns {void}
     */
    PdfViewer.prototype.focusFormField = function (field) {
        var _this = this;
        if (typeof (field) === 'string') {
            var fieldCollections = this.retrieveFormFields();
            for (var i = 0; i < fieldCollections.length; i++) {
                if (fieldCollections[parseInt(i.toString(), 10)].name === field) {
                    field = fieldCollections[parseInt(i.toString(), 10)];
                }
            }
        }
        if (field) {
            this.viewerBase.isFocusField = true;
            this.viewerBase.focusField = field;
            if (this.formDesignerModule) {
                this.navigationModule.goToPage(field.pageIndex + 1);
            }
            else {
                var pageIndex = parseFloat(field.id.split('_')[1]);
                this.navigationModule.goToPage(pageIndex + 1);
            }
            setTimeout(function () {
                var currentField = document.getElementById(field.id);
                if (_this.formDesignerModule && field.type === 'Checkbox') {
                    currentField = document.getElementById(field.id + '_input');
                }
                if (currentField) {
                    if (_this.formDesignerModule && (field.type === 'SignatureField' || field.type === 'InitialField')) {
                        currentField.parentElement.focus();
                    }
                    else {
                        currentField.focus();
                        _this.viewerBase.isFocusField = false;
                        _this.viewerBase.focusField = [];
                    }
                }
            }, 100);
        }
    };
    /**
     * Update the form field values from externally.
     *
     * @param {any} fieldValue - It describes about the field value
     * @returns {void}
     */
    PdfViewer.prototype.updateFormFieldsValue = function (fieldValue) {
        var target = document.getElementById(fieldValue.id);
        var isformDesignerModuleListBox = false;
        if (target) {
            target = target ? target : document.getElementById(fieldValue.id + '_content_html_element').children[0].children[0];
            if (target && fieldValue.type === 'Textbox' || fieldValue.type === 'Password' || fieldValue.type === 'PasswordField') {
                target.value = fieldValue.value;
                target.multiline = fieldValue.isMultiline;
            }
            else if (fieldValue.type === 'Checkbox' || fieldValue.type === 'RadioButton' || fieldValue.type === 'CheckBox') {
                if (fieldValue.type === 'CheckBox') {
                    target.style.appearance = 'auto';
                }
                if (this.formDesignerModule) {
                    if (fieldValue.type === 'RadioButton') {
                        var radioButtonOption = { isSelected: fieldValue.isSelected };
                        this.formDesignerModule.updateFormField(fieldValue, radioButtonOption);
                    }
                    else {
                        var checkBoxOption = { isChecked: fieldValue.isChecked };
                        this.formDesignerModule.updateFormField(fieldValue, checkBoxOption);
                    }
                }
                else {
                    if (fieldValue.type === 'RadioButton') {
                        target.selected = fieldValue.isSelected;
                    }
                    else {
                        target.checked = fieldValue.isChecked;
                    }
                }
                // eslint-disable-next-line
                if (target.value != fieldValue.value) {
                    target.value = fieldValue.value;
                }
            }
            else if (fieldValue.type === 'DropDown' || fieldValue.type === 'ListBox' || fieldValue.type === 'DropdownList') {
                if (this.formDesignerModule) {
                    isformDesignerModuleListBox = true;
                    var dropDownListOption = { options: fieldValue.value };
                    this.formDesignerModule.updateFormField(fieldValue, dropDownListOption);
                }
                else {
                    target.value = fieldValue.value;
                    target.selectedIndex = fieldValue.selectedIndex;
                }
            }
            if (fieldValue.type === 'SignatureField' || fieldValue.type === 'InitialField') {
                if (fieldValue.signatureType || fieldValue.initialType) {
                    if (typeof fieldValue.signatureType !== 'string') {
                        fieldValue.signatureType = fieldValue.initialType;
                    }
                }
                fieldValue.fontName = fieldValue.fontName ? fieldValue.fontName : fieldValue.fontFamily;
                var currentValue = fieldValue.value;
                var signatureField = this.getFormFieldByID(fieldValue.id);
                var isSameValue = this.formDesignerModule ? signatureField.value === fieldValue.value :
                    signatureField.Value === fieldValue.value;
                if (target.classList.contains('e-pdfviewer-signatureformfields-signature') && !isSameValue) {
                    if (this.formDesignerModule) {
                        this.annotation.deleteAnnotationById(fieldValue.id.split('_')[0] + '_content');
                    }
                    else {
                        this.annotation.deleteAnnotationById(fieldValue.id);
                    }
                }
                if (!fieldValue.signatureType || !fieldValue.value) {
                    fieldValue.value = currentValue;
                    if (this.viewerBase.isSignaturePathData(fieldValue.value)) {
                        fieldValue.signatureType = 'Path';
                        target.signatureType = 'Path';
                    }
                    else if (this.viewerBase.isSignatureImageData(fieldValue.value)) {
                        fieldValue.signatureType = 'Image';
                        target.signatureType = 'Image';
                    }
                    else {
                        fieldValue.signatureType = 'Type';
                        target.signatureType = 'Type';
                    }
                }
                if (fieldValue.tooltip) {
                    target.tooltip = fieldValue.tooltip;
                }
                target.Required = fieldValue.isRequired ? fieldValue.isRequired : false;
                if (!isSameValue) {
                    this.formFieldsModule.drawSignature(fieldValue.signatureType, fieldValue.value, target, fieldValue.fontName, fieldValue.signatureBounds);
                }
            }
            else {
                if (!isformDesignerModuleListBox) {
                    this.formFieldsModule.updateDataInSession(target);
                }
            }
        }
        else {
            var designerData = this.viewerBase.getItemFromSessionStorage('_formDesigner');
            if (!isNullOrUndefined(designerData)) {
                var FormFieldsData = JSON.parse(designerData);
                var filteredCollection = this.viewerBase.formFieldCollection.filter(function (field) {
                    return field.FormField.id.split('_')[0] === fieldValue.id;
                });
                var csData_1;
                if (fieldValue.signatureType === 'Path') {
                    var collectionData = processPathData(fieldValue.value);
                    csData_1 = splitArrayCollection(collectionData);
                }
                filteredCollection.forEach(function (field) {
                    field.FormField.signatureType = fieldValue.signatureType;
                    if (fieldValue.signatureType === 'Path') {
                        field.FormField.value = JSON.stringify(csData_1);
                    }
                    else {
                        field.FormField.value = fieldValue.value;
                    }
                });
                for (var m = 0; m < FormFieldsData.length; m++) {
                    // eslint-disable-next-line
                    var field = FormFieldsData[parseInt(m.toString(), 10)].FormField;
                    if (field.id.split('_')[0] === fieldValue.id) {
                        if (fieldValue.signatureType === 'Path') {
                            FormFieldsData[parseInt(m.toString(), 10)].FormField.value = JSON.stringify(csData_1);
                        }
                        else {
                            FormFieldsData[parseInt(m.toString(), 10)].FormField.value = fieldValue.value;
                        }
                        FormFieldsData[parseInt(m.toString(), 10)].FormField.signatureType = fieldValue.signatureType;
                        this.viewerBase.setItemInSessionStorage(FormFieldsData, '_formDesigner');
                        break;
                    }
                }
            }
            var fieldsData = this.viewerBase.getItemFromSessionStorage('_formfields');
            if (!isNullOrUndefined(fieldsData)) {
                var FormFieldsData = JSON.parse(fieldsData);
                var _loop_1 = function (m) {
                    var currentData = FormFieldsData[parseInt(m.toString(), 10)];
                    var fieldName;
                    if (fieldValue.type === 'Checkbox' || fieldValue.type === 'RadioButton' || fieldValue.type === 'CheckBox') {
                        fieldName = currentData.FieldName;
                    }
                    else if (fieldValue.type === 'DropDown' || fieldValue.type === 'ListBox' || fieldValue.type === 'DropdownList') {
                        fieldName = currentData.Text;
                    }
                    else {
                        fieldName = currentData.FieldName;
                    }
                    //map the signature field and its data object to find the signature field name.
                    var fieldData = FormFieldsData.filter(function (item) {
                        return item.FieldName ===
                            currentData.FieldName.split('_')[0];
                    });
                    if (!isNullOrUndefined(fieldData) && !isNullOrUndefined(fieldData[0])) {
                        if (fieldData[0].Name === 'SignatureField' || fieldData[0].Name === 'InitialField') {
                            fieldName = currentData.FieldName.split('_')[0];
                            currentData.LineBounds = FormFieldsData.filter(function (item) {
                                return item.FieldName ===
                                    fieldName;
                            })[0].LineBounds;
                        }
                    }
                    if (fieldName === fieldValue.name) {
                        if (fieldValue.type === 'Textbox' || fieldValue.type === 'Password' || fieldValue.type === 'PasswordField') {
                            if (fieldValue.value) {
                                currentData.Text = fieldValue.value;
                                currentData.Value = fieldValue.value;
                            }
                        }
                        else if (fieldValue.type === 'Checkbox' || fieldValue.type === 'RadioButton' || fieldValue.type === 'CheckBox') {
                            if (fieldValue.isSelected || fieldValue.isChecked) {
                                currentData.Selected = true;
                            }
                            else {
                                currentData.Selected = false;
                            }
                            currentData.Value = fieldValue.value;
                        }
                        else if (fieldValue.type === 'DropDown' || fieldValue.type === 'ListBox' || fieldValue.type === 'DropdownList') {
                            currentData.SelectedValue = fieldValue.value;
                            var index = currentData.TextList ? currentData.TextList.indexOf(fieldValue.value) : 0;
                            currentData.selectedIndex = index > -1 ? index : 0;
                            if (fieldValue.type === 'ListBox') {
                                currentData.SelectedListed = [currentData.selectedIndex];
                            }
                            else {
                                currentData.SelectedListed = [];
                            }
                        }
                        else if (fieldValue.type === 'SignatureField' || fieldValue.type === 'InitialField') {
                            if (fieldValue.value) {
                                currentData.Value = fieldValue.value;
                                currentData = this_1.updateSignatureValue(currentData, fieldValue, fieldValue.signatureBounds);
                            }
                        }
                        this_1.formFieldsModule.updateFormFieldsCollection(currentData);
                    }
                };
                var this_1 = this;
                for (var m = 0; m < FormFieldsData.length; m++) {
                    _loop_1(m);
                }
                PdfViewerBase.sessionStorageManager.removeItem(this.viewerBase.documentId + '_formfields');
                this.viewerBase.setItemInSessionStorage(FormFieldsData, '_formfields');
            }
        }
    };
    PdfViewer.prototype.getFormFieldByID = function (id) {
        if (this.formDesignerModule) {
            return this.nameTable[id.split('_')[0]];
        }
        var data = PdfViewerBase.sessionStorageManager.getItem(this.viewerBase.documentId + '_formfields');
        var formFieldsData = JSON.parse(data);
        return formFieldsData[formFieldsData.findIndex(function (el) { return el.uniqueID === id; })];
    };
    /**
     * @param {any} number - Gets the number value
     * @returns {number} - number
     */
    PdfViewer.prototype.ConvertPointToPixel = function (number) {
        return (number * (96 / 72));
    };
    /**
     * @param {any} currentData - Current form field data.
     * @param {any} fieldValue - Form Field.
     * @param {any} signBounds - It contains a signatureBounds.
     * @returns {any} - Returns the updated the current Data.
     */
    PdfViewer.prototype.updateSignatureValue = function (currentData, fieldValue, signBounds) {
        if (!fieldValue.signatureType) {
            fieldValue.signatureType = this.viewerBase.isSignatureImageData(fieldValue.value) ? 'Image' : (this.viewerBase.isSignaturePathData(fieldValue.value) ? 'Path' : 'Type');
        }
        var bound = currentData.LineBounds;
        var left = this.ConvertPointToPixel(bound.X);
        var top = this.ConvertPointToPixel(bound.Y);
        var width = this.ConvertPointToPixel(bound.Width);
        var height = this.ConvertPointToPixel(bound.Height);
        var bounds;
        if (fieldValue.signatureType === 'Type') {
            if (!currentData.FontFamily) {
                currentData.FontFamily = 'Helvetica';
            }
            bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, width, height);
            if (this.signatureFitMode === 'Default') {
                bounds = this.formFieldsModule.getDefaultBoundsforSign(bounds);
            }
            currentData.Bounds = bounds;
            var fontSize = bounds.height / 1.35;
            var textWidth = this.formFieldsModule.getTextWidth(currentData.value, fontSize, currentData.FontFamily);
            var widthRatio = 1;
            if (textWidth > bounds.width) {
                widthRatio = bounds.width / textWidth;
            }
            currentData.FontSize = this.formFieldsModule.getFontSize(Math.floor((fontSize * widthRatio)));
        }
        else if (fieldValue.signatureType === 'Image') {
            bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, width, height);
            var image_1 = new Image();
            image_1.src = currentData.Value;
            // eslint-disable-next-line
            var proxy_2 = this;
            image_1.onload = function () {
                proxy_2.imageOnLoad(bounds, image_1, currentData);
            };
        }
        else {
            if ((currentData.Value.indexOf('base64')) !== -1) {
                bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, width, height);
                if (this.signatureFitMode === 'Default') {
                    bounds = this.formFieldsModule.getDefaultBoundsforSign(bounds);
                }
            }
            else {
                if (!isNullOrUndefined(signBounds)) {
                    bounds = signBounds;
                }
                else if (this.signatureFitMode === 'Default') {
                    var signBounds_1 = this.viewerBase.signatureModule.updateSignatureAspectRatio(currentData.Value, false, null, currentData);
                    bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, signBounds_1.width, signBounds_1.height, true);
                    bounds.x = bounds.x + signBounds_1.left;
                    bounds.y = bounds.y + signBounds_1.top;
                }
                else {
                    bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, width, height);
                }
            }
            currentData.Bounds = bounds;
        }
        return currentData;
    };
    PdfViewer.prototype.imageOnLoad = function (bounds, image, currentData) {
        if (this.signatureFitMode === 'Default') {
            var padding = Math.min(bounds.height / this.paddingDifferenceValue, bounds.width / this.paddingDifferenceValue);
            var maxHeight = bounds.height - padding;
            var maxWidth = bounds.width - padding;
            var imageWidth = image.width;
            var imageHeight = image.height;
            var beforeWidth = bounds.width;
            var beforeHeight = bounds.height;
            var ratio = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
            bounds.width = imageWidth * ratio;
            bounds.height = imageHeight * ratio;
            bounds.x = bounds.x + (beforeWidth - bounds.width) / 2;
            bounds.y = bounds.y + (beforeHeight - bounds.height) / 2;
            var data = this.viewerBase.getItemFromSessionStorage('_formfields');
            if (data) {
                var FormFieldsData = JSON.parse(data);
                for (var i = 0; i < FormFieldsData.length; i++) {
                    if (FormFieldsData[parseInt(i.toString(), 10)].FieldName === currentData.FieldName) {
                        FormFieldsData[parseInt(i.toString(), 10)].Bounds = bounds;
                        this.formFieldsModule.updateFormFieldsCollection(FormFieldsData[parseInt(i.toString(), 10)]);
                    }
                }
                PdfViewerBase.sessionStorageManager.removeItem(this.viewerBase.documentId + '_formfields');
                this.viewerBase.setItemInSessionStorage(FormFieldsData, '_formfields');
            }
        }
    };
    /**
     * Perform undo action for the edited annotations
     *
     * @returns {void}
     */
    PdfViewer.prototype.undo = function () {
        if (this.annotationModule) {
            this.annotationModule.undo();
        }
        else {
            this.viewerBase.getModuleWarningMessage('Annotation');
        }
    };
    /**
     * Perform redo action for the edited annotations
     *
     * @returns {void}
     */
    PdfViewer.prototype.redo = function () {
        if (this.annotationModule) {
            this.annotationModule.redo();
        }
        else {
            this.viewerBase.getModuleWarningMessage('Annotation');
        }
    };
    /**
     * Unloads the PDF document being displayed in the PDF viewer.
     *
     * @returns {void}
     */
    PdfViewer.prototype.unload = function () {
        if (!isNullOrUndefined(this.viewerBase.pdfViewerRunner) && !this.viewerBase.isPasswordProtected) {
            this.viewerBase.pdfViewerRunner.addTask({ message: 'unloadFPDF' }, TaskPriorityLevel.High);
        }
        this.viewerBase.clear(true);
        this.pageCount = 0;
        if (!isBlazor()) {
            if (this.toolbarModule) {
                this.viewerBase.pageCount = 0;
                this.toolbarModule.resetToolbar();
            }
        }
        else {
            this.viewerBase.blazorUIAdaptor.resetToolbar();
        }
        if (this.fileByteArray) {
            this.fileByteArray = null;
        }
        if (this.magnificationModule) {
            this.magnificationModule.zoomTo(100);
        }
        if (this.viewerBase.hyperlinkAndLinkAnnotation) {
            this.viewerBase.hyperlinkAndLinkAnnotation = {};
        }
        if (this.viewerBase.pageTextDetails) {
            this.viewerBase.pageTextDetails = {};
        }
        if (this.textSearchModule) {
            this.textSearchModule.showSearchBox(false);
        }
    };
    /**
     * Destroys all managed resources used by this object.
     *
     * @returns {void}
     */
    PdfViewer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (!isNullOrUndefined(this.element)) {
            if (!this.refreshing) {
                this.element.classList.remove('e-pdfviewer');
            }
            this.element.innerHTML = '';
        }
        if (this.viewerBase.navigationPane) {
            this.viewerBase.navigationPane.restrictUpdateZoomValue = false;
        }
        this.viewerBase.destroy();
        if (this.viewerBase.navigationPane) {
            this.viewerBase.navigationPane.restrictUpdateZoomValue = true;
        }
    };
    /**
     * Perform imports annotations action in the PDF Viewer
     *
     * @param {any} importData - Specifies the data for annotation imports
     * @param {AnnotationDataFormat} annotationDataFormat - Specifies the annotation data format
     * @returns {void}
     */
    PdfViewer.prototype.importAnnotation = function (importData, annotationDataFormat) {
        if (this.annotationModule) {
            if (typeof (importData) === 'string') {
                var isXfdfFile = ((importData.indexOf('.xfdf') > -1) || (annotationDataFormat.indexOf('Xfdf') > -1)) ? true : false;
                if (annotationDataFormat) {
                    if (importData.indexOf('</xfdf>') > -1) {
                        this.viewerBase.importAnnotations(importData, annotationDataFormat, false);
                    }
                    else {
                        // eslint-disable-next-line
                        if (annotationDataFormat == 'Json') {
                            if (importData.includes('pdfAnnotation')) {
                                this.importAnnotationsAsJson(importData);
                            }
                            else if (importData.split('.')[1] === 'json') {
                                this.viewerBase.isPDFViewerJson = true;
                                this.viewerBase.importAnnotations(importData, annotationDataFormat, isXfdfFile);
                            }
                            else {
                                this.importAnnotationsAsJson(importData);
                            }
                        }
                        else {
                            this.viewerBase.importAnnotations(importData, annotationDataFormat, isXfdfFile);
                        }
                    }
                }
                else {
                    if (importData.split('.')[1] === 'json') {
                        if (importData.includes('pdfAnnotation')) {
                            this.importAnnotationsAsJson(importData);
                        }
                        else {
                            var newImportData = importData.split(',')[1] ? importData.split(',')[1] : importData.split(',')[0];
                            importData = decodeURIComponent(escape(atob(newImportData)));
                            this.importAnnotationsAsJson(importData);
                        }
                    }
                    else {
                        this.viewerBase.importAnnotations(importData, AnnotationDataFormat.Xfdf, isXfdfFile);
                    }
                }
            }
            else {
                var imporedAnnotation = importData.pdfAnnotation;
                if (typeof (importData) === 'object' && !isNullOrUndefined(imporedAnnotation) && !isNullOrUndefined(Object.keys(imporedAnnotation)) && !isNullOrUndefined(Object.keys(imporedAnnotation)[0]) && Object.keys(imporedAnnotation[Object.keys(imporedAnnotation)[0]]).length > 1) {
                    this.viewerBase.importAnnotations(importData);
                }
                else {
                    importData = JSON.stringify(importData);
                    this.viewerBase.isPDFViewerJson = false;
                    if (this.viewerBase.clientSideRendering) {
                        var encoder = new TextEncoder();
                        var utf8Bytes = encoder.encode(importData);
                        var binaryString = '';
                        var chunkSize = 65536; // Process in chunks of 64 KB
                        for (var i = 0; i < utf8Bytes.length; i += chunkSize) {
                            binaryString += String.fromCharCode.apply(String, Array.from(utf8Bytes.subarray(i, i + chunkSize)));
                        }
                        this.viewerBase.importAnnotations(btoa(binaryString), AnnotationDataFormat.Json);
                    }
                    else {
                        this.viewerBase.importAnnotations(btoa(importData), AnnotationDataFormat.Json);
                    }
                }
            }
        }
        else {
            this.viewerBase.getModuleWarningMessage('Annotation');
        }
    };
    PdfViewer.prototype.importAnnotationsAsJson = function (importData) {
        var jsonData = JSON.parse(importData);
        var firstAnnotation = jsonData.pdfAnnotation[Object.keys(jsonData.pdfAnnotation)[0]];
        if ((Object.keys(jsonData.pdfAnnotation).length >= 1) && (firstAnnotation.textMarkupAnnotation ||
            firstAnnotation.measureShapeAnnotation || firstAnnotation.freeTextAnnotation ||
            firstAnnotation.stampAnnotations || firstAnnotation.signatureInkAnnotation ||
            (firstAnnotation.shapeAnnotation && firstAnnotation.shapeAnnotation[0].Bounds))) {
            this.viewerBase.isPDFViewerJson = true;
            this.viewerBase.importAnnotations(jsonData, AnnotationDataFormat.Json);
        }
        else {
            this.viewerBase.isPDFViewerJson = false;
            this.viewerBase.importAnnotations(btoa(importData), AnnotationDataFormat.Json);
        }
    };
    /**
     * Perform export annotations action in the PDF Viewer
     *
     * @param {AnnotationDataFormat} annotationDataFormat -Gets the annotation data format
     * @returns {void}
     */
    PdfViewer.prototype.exportAnnotation = function (annotationDataFormat) {
        if (this.annotationModule) {
            if (annotationDataFormat && annotationDataFormat === 'Xfdf') {
                this.viewerBase.exportAnnotations(AnnotationDataFormat.Xfdf);
            }
            else {
                this.viewerBase.exportAnnotations(AnnotationDataFormat.Json);
            }
        }
        else {
            this.viewerBase.getModuleWarningMessage('Annotation');
        }
    };
    /**
     * Perform export annotations action in the PDF Viewer
     *
     *@param {AnnotationDataFormat} annotationDataFormat - Export the annotation based on the format.
     * @returns {Promise<object>} - promise
     */
    PdfViewer.prototype.exportAnnotationsAsObject = function (annotationDataFormat) {
        var _this = this;
        if (annotationDataFormat === void 0) { annotationDataFormat = AnnotationDataFormat.Json; }
        var isAnnotations = this.viewerBase.updateExportItem();
        if (this.annotationModule && isAnnotations) {
            return new Promise(function (resolve, reject) {
                _this.viewerBase.exportAnnotationsAsObject(annotationDataFormat).then(function (value) {
                    resolve(value);
                });
            });
        }
        else {
            // eslint-disable-next-line
            return new Promise(function (resolve) { resolve(null); });
        }
    };
    /**
     * Export annotations and returns a base64 string for both Json and XFDF formats
     *
     * @param {AnnotationDataFormat} annotationDataFormat - Gets the annotation data format
     * @returns {Promise<string>} - promise
     */
    PdfViewer.prototype.exportAnnotationsAsBase64String = function (annotationDataFormat) {
        var _this = this;
        if (this.annotationModule) {
            return new Promise(function (resolve, reject) {
                _this.viewerBase.createRequestForExportAnnotations(false, annotationDataFormat, true).then(function (value) {
                    resolve(value);
                });
            });
        }
        else {
            return null;
        }
    };
    /**
     * Perform to add annotations in the PDF Viewer
     *
     * @param {any} annotation - Specifies the annotation
     * @returns {void}
     */
    PdfViewer.prototype.addAnnotation = function (annotation) {
        if (this.viewerBase) {
            this.viewerBase.addAnnotation(annotation);
        }
    };
    /**
     * Imports the form fields data into the current PDF document.
     *
     * @param {string} data - The path for importing the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat - Gets the form field data format
     * @returns {void}
     */
    PdfViewer.prototype.importFormFields = function (data, formFieldDataFormat) {
        if (this.formFieldsModule) {
            if (isNullOrUndefined(formFieldDataFormat)) {
                formFieldDataFormat = FormFieldDataFormat.Json;
            }
            this.viewerBase.importFormFields(data, formFieldDataFormat);
        }
        else {
            this.viewerBase.getModuleWarningMessage('FormFields');
        }
    };
    /**
     * Exports the form field data in the specified data format.
     *
     * @param {string} data - The path for exporting the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat - Form field data format
     * @returns {void}
     */
    PdfViewer.prototype.exportFormFields = function (data, formFieldDataFormat) {
        if (this.formFieldsModule) {
            this.viewerBase.exportFormFields(data, formFieldDataFormat);
        }
        else {
            this.viewerBase.getModuleWarningMessage('FormFields');
        }
    };
    /**
     * Returns an object which represents the form field data in the specified data format.
     *
     * @param {FormFieldDataFormat} formFieldDataFormat - Form field data format
     * @returns {Promise<object>} - promise
     */
    PdfViewer.prototype.exportFormFieldsAsObject = function (formFieldDataFormat) {
        var _this = this;
        if (formFieldDataFormat === void 0) { formFieldDataFormat = FormFieldDataFormat.Json; }
        if (this.formFieldsModule) {
            return new Promise(function (resolve, reject) {
                _this.viewerBase.exportFormFieldsAsObject(formFieldDataFormat).then(function (value) {
                    resolve(value);
                });
            });
        }
        else {
            return null;
        }
    };
    /**
     * reset all form fields data
     *
     * @returns {void}
     */
    PdfViewer.prototype.resetFormFields = function () {
        this.formFieldsModule.resetFormFields();
    };
    /**
     * Clears data from the form fields.
     * Parameter - Specifies the form field object.
     *
     * @param {any} formField - It describes about the form field
     * @returns {void}
     */
    PdfViewer.prototype.clearFormFields = function (formField) {
        this.formFieldsModule.clearFormFields(formField);
    };
    /**
     * To delete the annotation Collections in the PDF Document.
     *
     * @returns {void}
     */
    PdfViewer.prototype.deleteAnnotations = function () {
        if (this.annotationModule) {
            this.viewerBase.deleteAnnotations();
        }
        else {
            this.viewerBase.getModuleWarningMessage('Annotation');
        }
    };
    /**
     * To retrieve the form fields in the PDF Document.
     *
     * @returns {void}
     */
    PdfViewer.prototype.retrieveFormFields = function () {
        return this.formFieldCollections;
    };
    /**
     * To update the form fields within a PDF document, but only when the FormDesigner module is either not injected or has been disabled.
     *
     * @param {any} formFields - It describes about the form field
     * @returns {void}
     */
    PdfViewer.prototype.updateFormFields = function (formFields) {
        this.updateFormFieldsValue(formFields);
        this.formFieldsModule.updateFormFieldValues(formFields);
    };
    /**
     * @returns {void}
     */
    PdfViewer.prototype.fireResourcesLoaded = function () {
        this.trigger('resourcesLoaded');
    };
    /**
     * @param {any} JsonData - It gives the json data values
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireAjaxRequestInitiate = function (JsonData) {
        var eventArgs = { name: 'ajaxRequestInitiate', JsonData: JsonData };
        this.trigger('ajaxRequestInitiate', eventArgs);
    };
    /**
     * @param {any} jsonData - It gives the json data values
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.firePageRenderInitiate = function (jsonData) {
        var eventArgs = { name: 'pageRenderInitiate', jsonData: jsonData };
        this.trigger('pageRenderInitiate', eventArgs);
    };
    /**
     * @param {string} value - The button field value
     * @param {string} fieldName - It describes about the button field name
     * @param {string} id - It describes about the id value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireButtonFieldClickEvent = function (value, fieldName, id) {
        var eventArgs = { name: 'buttonFieldClicked', buttonFieldValue: value, buttonFieldName: fieldName, id: id };
        this.trigger('buttonFieldClick', eventArgs);
    };
    /**
     * @param {string} name - Form field name
     * @param {FormFieldModel} field - It describes about the form field model
     * @param {boolean} cancel - checks whether the cancel is true or not
     * @param {boolean} isLeftClick - becomes true on signature panel left click.
     * @private
     * @returns {Promise<void>} - returns promise
     */
    PdfViewer.prototype.fireFormFieldClickEvent = function (name, field, cancel, isLeftClick) {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs, target, formFieldCollectionsValue, readOnly;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventArgs = { name: name, field: field, cancel: cancel };
                        if (!isBlazor()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.triggerEvent('formFieldClick', eventArgs)];
                    case 1:
                        eventArgs = (_a.sent()) || eventArgs;
                        eventArgs.field.type = field.type;
                        return [3 /*break*/, 3];
                    case 2:
                        this.triggerEvent('formFieldClick', eventArgs);
                        _a.label = 3;
                    case 3:
                        if (field.type === 'SignatureField' || field.type === 'InitialField') {
                            if (field.type === 'InitialField') {
                                this.viewerBase.isInitialField = true;
                            }
                            else {
                                this.viewerBase.isInitialField = false;
                            }
                            target = document.getElementById(field.id);
                            if (target.style.visibility === 'hidden') {
                                target.disabled = true;
                            }
                            target = target ? target : (document.getElementById(field.id + '_content_html_element') ? document.getElementById(field.id + '_content_html_element').children[0].children[0] : null);
                            formFieldCollectionsValue = this.formFieldCollections.filter(function (item) { return item.id === field.id; });
                            if (formFieldCollectionsValue) {
                                readOnly = formFieldCollectionsValue[0].isReadOnly;
                                if ((!readOnly) && !eventArgs.cancel && target && !target.disabled && target.classList.contains('e-pdfviewer-signatureformfields') && (isLeftClick || isNullOrUndefined(isLeftClick))) {
                                    this.viewerBase.signatureModule.showSignatureDialog(true);
                                }
                                else if (readOnly) {
                                    target.disabled = true;
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param { srting} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field add event.
     * @param {number} pageIndex - Get the page number.
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormFieldAddEvent = function (name, field, pageIndex) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex };
        this.viewerBase.isFormFieldSelect = false;
        this.trigger('formFieldAdd', eventArgs);
    };
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field remove event.
     * @param {number} pageIndex - Get the page number.
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormFieldRemoveEvent = function (name, field, pageIndex) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex };
        this.trigger('formFieldRemove', eventArgs);
    };
    /**
     * @param {FormFieldDoubleClickArgs} eventArgs - Returns the event args
     * @private
     * @returns {FormFieldDoubleClickArgs} - FormFieldDoubleClickArgs
     */
    PdfViewer.prototype.fireFormFieldDoubleClickEvent = function (eventArgs) {
        this.trigger('formFieldDoubleClick', eventArgs);
        return eventArgs;
    };
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
    PdfViewer.prototype.fireFormFieldPropertiesChangeEvent = function (name, field, pageIndex, isValueChanged, isFontFamilyChanged, isFontSizeChanged, isFontStyleChanged, isColorChanged, isBackgroundColorChanged, isBorderColorChanged, isBorderWidthChanged, isAlignmentChanged, isReadOnlyChanged, isVisibilityChanged, isMaxLengthChanged, isRequiredChanged, isPrintChanged, isToolTipChanged, isCustomDataChanged, oldValue, newValue, isNamechanged) {
        var eventArgs = {
            name: name, field: field, pageIndex: pageIndex, isValueChanged: isValueChanged,
            isFontFamilyChanged: isFontFamilyChanged, isFontSizeChanged: isFontSizeChanged,
            isFontStyleChanged: isFontStyleChanged, isColorChanged: isColorChanged,
            isBackgroundColorChanged: isBackgroundColorChanged, isBorderColorChanged: isBorderColorChanged,
            isBorderWidthChanged: isBorderWidthChanged, isAlignmentChanged: isAlignmentChanged,
            isReadOnlyChanged: isReadOnlyChanged, isVisibilityChanged: isVisibilityChanged,
            isMaxLengthChanged: isMaxLengthChanged, isRequiredChanged: isRequiredChanged, isPrintChanged: isPrintChanged,
            isToolTipChanged: isToolTipChanged, oldValue: oldValue, newValue: newValue,
            isNameChanged: !isNullOrUndefined(isNamechanged) ? isNamechanged : false, isCustomDataChanged: isCustomDataChanged
        };
        this.trigger('formFieldPropertiesChange', eventArgs);
    };
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field mouse leave event.
     * @param {number} pageIndex - Get the page number.
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormFieldMouseLeaveEvent = function (name, field, pageIndex) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex };
        this.trigger('formFieldMouseLeave', eventArgs);
    };
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
    PdfViewer.prototype.fireFormFieldMouseoverEvent = function (name, field, pageIndex, pageX, pageY, X, Y) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex, pageX: pageX,
            pageY: pageY, X: X, Y: Y };
        this.trigger('formFieldMouseover', eventArgs);
    };
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field move event.
     * @param {number} pageIndex - Get the page number.
     * @param {IFormFieldBound} previousPosition - Get the previous position of the form field in the page.
     * @param {IFormFieldBound} currentPosition - Current position of form field in the page.
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormFieldMoveEvent = function (name, field, pageIndex, previousPosition, currentPosition) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex,
            previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('formFieldMove', eventArgs);
    };
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field move event.
     * @param {number} pageIndex - Get the page number.
     * @param {IFormFieldBound} previousPosition - Get the previous position of the form field in the page.
     * @param {IFormFieldBound} currentPosition - Current position of form field in the page.
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormFieldResizeEvent = function (name, field, pageIndex, previousPosition, currentPosition) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex,
            previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('formFieldResize', eventArgs);
    };
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field select event.
     * @param {number} pageIndex - Get the page number.
     * @param {boolean} isProgrammaticSelection - Specifies whether the the form field is selected programmatically or by UI.
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormFieldSelectEvent = function (name, field, pageIndex, isProgrammaticSelection) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex,
            isProgrammaticSelection: isProgrammaticSelection };
        this.trigger('formFieldSelect', eventArgs);
    };
    /**
     * @param {string} name - Get the name of the event.
     * @param {IFormField} field - Event arguments for the form field unselect event.
     * @param {number} pageIndex - Get the page number.
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormFieldUnselectEvent = function (name, field, pageIndex) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex };
        this.trigger('formFieldUnselect', eventArgs);
    };
    /**
     * @param {any} pageData - It contains the page data
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireDocumentLoad = function (pageData) {
        var eventArgs = { name: 'documentLoad', documentName: this.fileName, pageData: pageData };
        this.trigger('documentLoad', eventArgs);
        if (isBlazor()) {
            this._dotnetInstance.invokeMethodAsync('LoadDocument', null);
            this.viewerBase.blazorUIAdaptor.loadDocument();
        }
    };
    /**
     * @param {string} fileName - Get the file name
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireDocumentUnload = function (fileName) {
        var eventArgs = { name: 'documentUnload', documentName: fileName };
        this.trigger('documentUnload', eventArgs);
    };
    /**
     * @param {boolean} isPasswordRequired - Checks whether the password required is true or not
     * @param {string} password - Get the password value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireDocumentLoadFailed = function (isPasswordRequired, password) {
        var eventArgs = { name: 'documentLoadFailed', documentName: this.fileName,
            isPasswordRequired: isPasswordRequired, password: password };
        this.trigger('documentLoadFailed', eventArgs);
    };
    /**
     * @param {number} errorStatusCode - It Gets the error status code
     * @param {string} errorMessage - It Gets the error message
     * @param {string} action - It describes the action
     * @param {boolean} retryCount - checks whether retry count ie true or not
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireAjaxRequestFailed = function (errorStatusCode, errorMessage, action, retryCount) {
        var eventArgs = { name: 'ajaxRequestFailed', documentName: this.fileName,
            errorStatusCode: errorStatusCode, errorMessage: errorMessage, action: action };
        if (retryCount) {
            eventArgs.retryCount = true;
        }
        this.trigger('ajaxRequestFailed', eventArgs);
    };
    /**
     * @param {string} action - It describes the action
     * @param {any} data - It describes the data
     * @private
     * @returns {boolean} - boolean
     */
    PdfViewer.prototype.fireAjaxRequestSuccess = function (action, data) {
        var eventArgs = { name: 'ajaxRequestSuccess', documentName: this.fileName,
            action: action, data: data, cancel: false };
        this.trigger('ajaxRequestSuccess', eventArgs);
        if (eventArgs.cancel) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @param {any} data - It describes the data
     * @private
     * @returns {any} - any
     */
    PdfViewer.prototype.firePageRenderComplete = function (data) {
        var eventArgs = { name: 'pageRenderComplete', documentName: this.fileName, data: data };
        this.trigger('pageRenderComplete', eventArgs);
    };
    /**
     * @param {string} action - It describes the action
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireValidatedFailed = function (action) {
        if (!isBlazor()) {
            var eventArgs = { formField: this.formFieldCollections,
                documentName: this.fileName, nonFillableFields: this.viewerBase.nonFillableFields };
            this.trigger('validateFormFields', eventArgs);
        }
        else {
            var eventArgs = {};
            eventArgs.documentName = this.fileName;
            eventArgs.formFields = this.formFieldCollections;
            eventArgs.nonFillableFields = this.viewerBase.nonFillableFields;
            this.trigger('validateFormFields', eventArgs);
        }
    };
    /**
     * @param {number} x - It Gets the x value
     * @param {number} y - It Gets the y value
     * @param {number} pageNumber - It Gets the page number value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.firePageClick = function (x, y, pageNumber) {
        var eventArgs = { name: 'pageClick', documentName: this.fileName, x: x, y: y, pageNumber: pageNumber };
        this.trigger('pageClick', eventArgs);
    };
    /**
     * @param {number} previousPageNumber - It Gets the previous page number
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.firePageChange = function (previousPageNumber) {
        var eventArgs = { name: 'pageChange', documentName: this.fileName,
            currentPageNumber: this.currentPageNumber, previousPageNumber: previousPageNumber };
        this.trigger('pageChange', eventArgs);
        if (isBlazor()) {
            //this._dotnetInstance.invokeMethodAsync('OnPageChanged', this.currentPageNumber);
            this.viewerBase.blazorUIAdaptor.pageChanged(this.currentPageNumber);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireZoomChange = function () {
        var eventArgs = { name: 'zoomChange', zoomValue: this.magnificationModule.zoomFactor * 100,
            previousZoomValue: this.magnificationModule.previousZoomFactor * 100 };
        this.trigger('zoomChange', eventArgs);
    };
    /**
     * @param {string} hyperlink - Get the hyper link
     * @param  {HTMLAnchorElement} hyperlinkElement - Get the hyper link element
     * @private
     * @returns {Promise<boolean>} - Promise<boolean>
     */
    PdfViewer.prototype.fireHyperlinkClick = function (hyperlink, hyperlinkElement) {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventArgs = { name: 'hyperlinkClick', hyperlink: hyperlink,
                            hyperlinkElement: hyperlinkElement, cancel: false };
                        if (!isBlazor()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.triggerEvent('hyperlinkClick', eventArgs)];
                    case 1:
                        eventArgs = (_a.sent()) || eventArgs;
                        return [3 /*break*/, 3];
                    case 2:
                        this.triggerEvent('hyperlinkClick', eventArgs);
                        _a.label = 3;
                    case 3:
                        if (eventArgs.hyperlinkElement.href !== eventArgs.hyperlink) {
                            hyperlinkElement.href = eventArgs.hyperlink;
                        }
                        if (eventArgs.cancel) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {HTMLAnchorElement} hyperlinkElement - Gets the hyper link element
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireHyperlinkHover = function (hyperlinkElement) {
        var eventArgs = { name: 'hyperlinkMouseOver', hyperlinkElement: hyperlinkElement };
        this.trigger('hyperlinkMouseOver', eventArgs);
    };
    /**
     * @param {string} fieldName - Gets the field name
     * @param {string} value - Gets the field value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFocusOutFormField = function (fieldName, value) {
        var eventArgs = { name: 'formFieldFocusOut', fieldName: fieldName, value: value };
        this.trigger('formFieldFocusOut', eventArgs);
    };
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
    PdfViewer.prototype.fireAnnotationAdd = function (pageNumber, index, type, bounds, settings, textMarkupContent, tmStartIndex, tmEndIndex, labelSettings, multiPageCollection, customStampName) {
        var eventArgs = { name: 'annotationAdd', pageIndex: pageNumber,
            annotationId: index, annotationType: type, annotationBound: bounds, annotationSettings: settings };
        if (textMarkupContent) {
            if (isBlazor()) {
                eventArgs.annotationSettings.textMarkupContent = textMarkupContent;
                eventArgs.annotationSettings.textMarkupStartIndex = tmStartIndex;
                eventArgs.annotationSettings.textMarkupEndIndex = tmEndIndex;
            }
            else {
                eventArgs.textMarkupContent = textMarkupContent;
                eventArgs.textMarkupStartIndex = tmStartIndex;
                eventArgs.textMarkupEndIndex = tmEndIndex;
            }
        }
        if (labelSettings) {
            eventArgs.labelSettings = labelSettings;
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        if (type === 'Image') {
            eventArgs.customStampName = customStampName;
        }
        this.viewerBase.isAnnotationSelect = false;
        this.trigger('annotationAdd', eventArgs);
        if (isBlazor()) {
            // this._dotnetInstance.invokeMethodAsync('AnnotationAdd', null);
            this.viewerBase.blazorUIAdaptor.annotationAdd();
        }
    };
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
    PdfViewer.prototype.fireAnnotationRemove = function (pageNumber, index, type, bounds, textMarkupContent, tmStartIndex, tmEndIndex, multiPageCollection) {
        var eventArgs = { name: 'annotationRemove', pageIndex: pageNumber, annotationId: index,
            annotationType: type, annotationBounds: bounds };
        if (textMarkupContent) {
            eventArgs.textMarkupContent = textMarkupContent;
            eventArgs.textMarkupStartIndex = tmStartIndex;
            eventArgs.textMarkupEndIndex = tmEndIndex;
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        this.trigger('annotationRemove', eventArgs);
    };
    /**
     * @param {string} value - Gets the value of the free text annotation
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireBeforeAddFreeTextAnnotation = function (value) {
        var eventArgs = { name: 'beforeAddFreeText', value: value };
        this.trigger('beforeAddFreeText', eventArgs);
    };
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireCommentAdd = function (id, text, annotation) {
        var eventArgs = { name: 'CommentAdd', id: id, text: text, annotation: annotation };
        this.trigger('commentAdd', eventArgs);
    };
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireCommentEdit = function (id, text, annotation) {
        var eventArgs = { name: 'CommentEdit', id: id, text: text, annotation: annotation };
        this.trigger('commentEdit', eventArgs);
    };
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireCommentDelete = function (id, text, annotation) {
        var eventArgs = { name: 'CommentDelete', id: id, text: text, annotation: annotation };
        this.trigger('commentDelete', eventArgs);
    };
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireCommentSelect = function (id, text, annotation) {
        var eventArgs = { name: 'CommentSelect', id: id, text: text, annotation: annotation };
        this.trigger('commentSelect', eventArgs);
    };
    /**
     * @param {string} id - Gets the id of the comment
     * @param {string} text - Gets the text value
     * @param {any} annotation - Gets the annotation value
     * @param {CommentStatus} statusChange - Get the value of status change
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireCommentStatusChanged = function (id, text, annotation, statusChange) {
        var eventArgs = { name: 'CommentStatusChanged', id: id, text: text, annotation: annotation, status: statusChange };
        this.trigger('commentStatusChanged', eventArgs);
    };
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
    PdfViewer.prototype.fireAnnotationPropertiesChange = function (pageNumber, index, type, isColorChanged, isOpacityChanged, isTextChanged, isCommentsChanged, textMarkupContent, tmStartIndex, tmEndIndex, multiPageCollection) {
        var eventArgs = { name: 'annotationPropertiesChange', pageIndex: pageNumber,
            annotationId: index, annotationType: type, isColorChanged: isColorChanged,
            isOpacityChanged: isOpacityChanged, isTextChanged: isTextChanged, isCommentsChanged: isCommentsChanged };
        if (textMarkupContent) {
            eventArgs.textMarkupContent = textMarkupContent;
            eventArgs.textMarkupStartIndex = tmStartIndex;
            eventArgs.textMarkupEndIndex = tmEndIndex;
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        this.trigger('annotationPropertiesChange', eventArgs);
    };
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
    PdfViewer.prototype.fireSignatureAdd = function (pageNumber, index, type, bounds, opacity, strokeColor, thickness, data) {
        var eventArgs = { pageIndex: pageNumber, id: index, type: type, bounds: bounds, opacity: opacity };
        if (thickness) {
            eventArgs.thickness = thickness;
        }
        if (strokeColor) {
            eventArgs.strokeColor = strokeColor;
        }
        if (data) {
            eventArgs.data = data;
        }
        this.trigger('addSignature', eventArgs);
    };
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} index - Gets the index value of the signature
     * @param {AnnotationType} type - Gets the annotation type
     * @param {any} bounds - Gets the bounds value of the annotation
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireSignatureRemove = function (pageNumber, index, type, bounds) {
        var eventArgs = { pageIndex: pageNumber, id: index, type: type, bounds: bounds };
        this.trigger('removeSignature', eventArgs);
    };
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
    PdfViewer.prototype.fireSignatureMove = function (pageNumber, id, type, opacity, strokeColor, thickness, previousPosition, currentPosition) {
        var eventArgs = { pageIndex: pageNumber, id: id, type: type, opacity: opacity,
            strokeColor: strokeColor, thickness: thickness, previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('moveSignature', eventArgs);
    };
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
    PdfViewer.prototype.fireSignaturePropertiesChange = function (pageNumber, index, type, isStrokeColorChanged, isOpacityChanged, isThicknessChanged, oldProp, newProp) {
        var eventArgs = { pageIndex: pageNumber, id: index, type: type,
            isStrokeColorChanged: isStrokeColorChanged, isOpacityChanged: isOpacityChanged,
            isThicknessChanged: isThicknessChanged, oldValue: oldProp, newValue: newProp };
        this.trigger('signaturePropertiesChange', eventArgs);
    };
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
    PdfViewer.prototype.fireSignatureResize = function (pageNumber, index, type, opacity, strokeColor, thickness, currentPosition, previousPosition) {
        var eventArgs = { pageIndex: pageNumber, id: index, type: type, opacity: opacity,
            strokeColor: strokeColor, thickness: thickness, currentPosition: currentPosition,
            previousPosition: previousPosition };
        this.trigger('resizeSignature', eventArgs);
    };
    /**
     * @param {string} id - Gets the id value
     * @param {number} pageNumber - Gets the page number value
     * @param {object} signature - Gets the signature object
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireSignatureSelect = function (id, pageNumber, signature) {
        var eventArgs = { id: id, pageIndex: pageNumber, signature: signature };
        this.trigger('signatureSelect', eventArgs);
    };
    /**
     * @param {string} id - Gets the id value
     * @param {number} pageNumber - Gets the page number value
     * @param {object} signature - Gets the signature object
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireSignatureUnselect = function (id, pageNumber, signature) {
        var eventArgs = { id: id, pageIndex: pageNumber, signature: signature };
        this.trigger('signatureUnselect', eventArgs);
    };
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
    PdfViewer.prototype.fireAnnotationSelect = function (id, pageNumber, annotation, annotationCollection, multiPageCollection, isSelected, annotationAddMode) {
        var eventArgs = { name: 'annotationSelect', annotationId: id, pageIndex: pageNumber,
            annotation: annotation };
        if (annotationCollection) {
            eventArgs = { name: 'annotationSelect', annotationId: id, pageIndex: pageNumber, annotation: annotation,
                annotationCollection: annotationCollection };
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        if (isSelected) {
            eventArgs.isProgrammaticSelection = isSelected;
        }
        if (annotationAddMode) {
            eventArgs.annotationAddMode = annotationAddMode;
        }
        if (isBlazor()) {
            if (annotation.type === 'FreeText') {
                var fontStyle = { isBold: false, isItalic: false, isStrikeout: false, isUnderline: false };
                if (annotation.fontStyle === 1) {
                    fontStyle.isBold = true;
                }
                else if (annotation.fontStyle === 2) {
                    fontStyle.isItalic = true;
                }
                else if (annotation.fontStyle === 3) {
                    fontStyle.isStrikeout = true;
                }
                else if (annotation.fontStyle === 4) {
                    fontStyle.isUnderline = true;
                }
                annotation.fontStyle = fontStyle;
            }
            //this._dotnetInstance.invokeMethodAsync('AnnotationSelect', annotation.type);
            this.viewerBase.blazorUIAdaptor.annotationSelect(annotation.type);
        }
        this.trigger('annotationSelect', eventArgs);
    };
    /**
     * @param {string} id - Gets the annottion id value
     * @param {number} pageNumber - Gets the page number value
     * @param {any} annotation - Gets the annotation details
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireAnnotationUnSelect = function (id, pageNumber, annotation) {
        if (isBlazor()) {
            this.viewerBase.blazorUIAdaptor.annotationUnSelect();
        }
        var eventArgs = { name: 'annotationUnSelect', annotationId: id,
            pageIndex: pageNumber, annotation: annotation };
        this.trigger('annotationUnSelect', eventArgs);
    };
    /**
     * @param {string} id - Gets the annottion id value
     * @param {number} pageNumber - Gets the page number value
     * @param {any} annotation - Gets the annotation details
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireAnnotationDoubleClick = function (id, pageNumber, annotation) {
        var eventArgs = { name: 'annotationDblClick', annotationId: id,
            pageIndex: pageNumber, annotation: annotation };
        this.trigger('annotationDoubleClick', eventArgs);
    };
    /**
     * @param {number} pageNumber - Gets the page number value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireTextSelectionStart = function (pageNumber) {
        this.isTextSelectionStarted = true;
        var eventArgs = { pageIndex: pageNumber };
        this.trigger('textSelectionStart', eventArgs);
    };
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {string} text - Gets the selected text value
     * @param {any[]} bound - Gets the annotation bounds
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireTextSelectionEnd = function (pageNumber, text, bound) {
        if (this.isTextSelectionStarted) {
            var eventArgs = { pageIndex: pageNumber, textContent: text, textBounds: bound };
            this.trigger('textSelectionEnd', eventArgs);
            this.isTextSelectionStarted = false;
        }
    };
    /**
     * @param {HTMLCanvasElement} canvas - Gets the canvas element
     * @param {number} index - Gets the index value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.renderDrawing = function (canvas, index) {
        if (isNullOrUndefined(index) && (!isNullOrUndefined(this.viewerBase.activeElements.activePageID) &&
            this.viewerBase.activeElements.activePageID >= 0) && !this.viewerBase.isPrint) {
            index = this.viewerBase.activeElements.activePageID;
        }
        if (this.annotation) {
            this.annotation.renderAnnotations(index, null, null, null, canvas);
        }
        else if (this.formDesignerModule) {
            this.formDesignerModule.updateCanvas(index, canvas);
        }
    };
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
    PdfViewer.prototype.fireAnnotationResize = function (pageNumber, index, type, bounds, settings, textMarkupContent, tmStartIndex, tmEndIndex, labelSettings, multiPageCollection) {
        var eventArgs = { name: 'annotationResize', pageIndex: pageNumber,
            annotationId: index, annotationType: type, annotationBound: bounds, annotationSettings: settings };
        if (textMarkupContent) {
            eventArgs.textMarkupContent = textMarkupContent;
            eventArgs.textMarkupStartIndex = tmStartIndex;
            eventArgs.textMarkupEndIndex = tmEndIndex;
        }
        if (labelSettings) {
            eventArgs.labelSettings = labelSettings;
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        this.trigger('annotationResize', eventArgs);
    };
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
    PdfViewer.prototype.fireAnnotationMoving = function (pageNumber, id, type, annotationSettings, previousPosition, currentPosition) {
        var eventArgs = { name: 'annotationMoving', pageIndex: pageNumber,
            annotationId: id, annotationType: type, annotationSettings: annotationSettings,
            previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('annotationMoving', eventArgs);
    };
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
    PdfViewer.prototype.fireAnnotationMove = function (pageNumber, id, type, annotationSettings, previousPosition, currentPosition) {
        var eventArgs = { name: 'annotationMove', pageIndex: pageNumber,
            annotationId: id, annotationType: type, annotationSettings: annotationSettings,
            previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('annotationMove', eventArgs);
    };
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
    PdfViewer.prototype.fireAnnotationMouseover = function (id, pageNumber, annotationType, bounds, annotation, currentPosition, mousePosition) {
        var eventArgs = { name: 'annotationMouseover', annotationId: id,
            pageIndex: pageNumber, annotationType: annotationType, annotationBounds: bounds,
            annotation: annotation, pageX: currentPosition.left, pageY: currentPosition.top,
            X: mousePosition.left, Y: mousePosition.top };
        if (isBlazor()) {
            if (annotation.subject === 'Perimeter calculation') {
                eventArgs.annotationType = 'Perimeter';
            }
            else if (annotation.subject === 'Area calculation') {
                eventArgs.annotationType = 'Area';
            }
            else if (annotation.subject === 'Volume calculation') {
                eventArgs.annotationType = 'Volume';
            }
            else if (annotation.subject === 'Arrow') {
                eventArgs.annotationType = 'Arrow';
            }
            else if (annotation.subject === 'Circle') {
                eventArgs.annotationType = 'Circle';
            }
        }
        this.trigger('annotationMouseover', eventArgs);
    };
    /**
     * @param {number} pageNumber - Gets the page number value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireAnnotationMouseLeave = function (pageNumber) {
        var eventArgs = { name: 'annotationMouseLeave', pageIndex: pageNumber };
        this.trigger('annotationMouseLeave', eventArgs);
    };
    /**
     * @param {number} pageX - Gets the page X value
     * @param {number} pageY - Gets the page Y value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.firePageMouseover = function (pageX, pageY) {
        var eventArgs = { pageX: pageX, pageY: pageY };
        this.trigger('pageMouseover', eventArgs);
    };
    /**
     * @param {string} fileName - Gets the file name
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireDownloadStart = function (fileName) {
        var eventArgs = { fileName: fileName, cancel: false };
        this.trigger('downloadStart', eventArgs);
        if (eventArgs.cancel) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * @param {string} fileName - Gets the file name value
     * @param {string} downloadData - Gets the download data
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireDownloadEnd = function (fileName, downloadData) {
        var eventArgs = { fileName: fileName, downloadDocument: downloadData };
        this.trigger('downloadEnd', eventArgs);
    };
    /**
     * @private
     * @returns {Promise<void>} - Promise<void>
     */
    PdfViewer.prototype.firePrintStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventArgs = { fileName: this.downloadFileName, cancel: false };
                        if (!isBlazor) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.triggerEvent('printStart', eventArgs)];
                    case 1:
                        eventArgs = (_a.sent()) || eventArgs;
                        return [3 /*break*/, 3];
                    case 2:
                        this.triggerEvent('printStart', eventArgs);
                        _a.label = 3;
                    case 3:
                        if (!eventArgs.cancel) {
                            this.printModule.print();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {string} eventName - Gets the name of the event
     * @param {object} args - Gets the args object value
     * @private
     * @returns {Promise<void | object>} - Returns a promise
     */
    PdfViewer.prototype.triggerEvent = function (eventName, args) {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trigger(eventName, args)];
                    case 1:
                        eventArgs = _a.sent();
                        if (isBlazor && typeof eventArgs === 'string') {
                            eventArgs = JSON.parse(eventArgs);
                        }
                        return [2 /*return*/, eventArgs];
                }
            });
        });
    };
    /**
     * @param {string} fileName - Gets the name of the file
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.firePrintEnd = function (fileName) {
        var eventArgs = { fileName: fileName };
        this.trigger('printEnd', eventArgs);
    };
    /**
     * @param {number} pageNumber - Gets the page number value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireThumbnailClick = function (pageNumber) {
        var eventArgs = { name: 'thumbnailClick', pageNumber: pageNumber };
        this.trigger('thumbnailClick', eventArgs);
    };
    /**
     * Custom toolbar click event.
     *
     * @param {ClickEventArgs} target - Gets the click event args value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireCustomToolbarClickEvent = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.trigger('toolbarClick', target);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {number} pageNumber - Gets the page number value
     * @param {number} position - Gets the position of the book mark
     * @param {string} text - Gets the text value
     * @param {string} fileName - Gets the name of the file
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireBookmarkClick = function (pageNumber, position, text, fileName) {
        var eventArgs = { name: 'bookmarkClick', pageNumber: pageNumber,
            position: position, text: text, fileName: fileName };
        this.trigger('bookmarkClick', eventArgs);
    };
    /**
     * @param {any} importData - Gets the imported data
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireImportStart = function (importData) {
        var eventArgs = { name: 'importAnnotationsStart', importData: importData, formFieldData: null };
        this.trigger('importStart', eventArgs);
    };
    /**
     * @param {any} exportData - Gets the exported data
     * @private
     * @returns {boolean} - Returns boolean value
     */
    PdfViewer.prototype.fireExportStart = function (exportData) {
        var eventArgs = { name: 'exportAnnotationsStart', exportData: exportData, formFieldData: null, cancel: false };
        this.trigger('exportStart', eventArgs);
        if (eventArgs.cancel) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * @param {any} importData - Gets the imported data
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireImportSuccess = function (importData) {
        var eventArgs = { name: 'importAnnotationsSuccess', importData: importData, formFieldData: null };
        this.trigger('importSuccess', eventArgs);
    };
    /**
     * @param {any} exportData - Gets the exported data
     * @param {string} fileName - Gets the name of the file
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireExportSuccess = function (exportData, fileName) {
        var eventArgs = { name: 'exportAnnotationsSuccess', exportData: exportData, fileName: fileName, formFieldData: null };
        this.trigger('exportSuccess', eventArgs);
    };
    /**
     * @param {any} data - Gets the imported data
     * @param {string} errorDetails - Gets the error details
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireImportFailed = function (data, errorDetails) {
        var eventArgs = { name: 'importAnnotationsFailed', importData: data, errorDetails: errorDetails, formFieldData: null };
        this.trigger('importFailed', eventArgs);
    };
    /**
     * @param {any} data - Gets the exported data
     * @param {string} errorDetails - Gets the error details
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireExportFailed = function (data, errorDetails) {
        var eventArgs = { name: 'exportAnnotationsFailed', exportData: data, errorDetails: errorDetails, formFieldData: null };
        this.trigger('exportFailed', eventArgs);
    };
    /**
     * @param {any} data - Gets the imported data
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormImportStarted = function (data) {
        var eventArgs = { name: 'importFormFieldsStart', importData: null, formFieldData: data };
        this.trigger('importStart', eventArgs);
    };
    /**
     * @param {any} data - Gets the exported data
     * @private
     * @returns {boolean} - boolean
     */
    PdfViewer.prototype.fireFormExportStarted = function (data) {
        var eventArgs = { name: 'exportFormFieldsStart', exportData: null, formFieldData: data, cancel: false };
        this.trigger('exportStart', eventArgs);
        if (eventArgs.cancel) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * @param {any} data - Gets the imported data
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormImportSuccess = function (data) {
        var eventArgs = { name: 'importFormFieldsSuccess', importData: data, formFieldData: data };
        this.trigger('importSuccess', eventArgs);
    };
    /**
     * @param {any} data - Gets the exported data
     * @param {string} fileName - Gets the name of the file
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormExportSuccess = function (data, fileName) {
        var eventArgs = { name: 'exportFormFieldsSuccess', exportData: data, fileName: fileName, formFieldData: data };
        this.trigger('exportSuccess', eventArgs);
    };
    /**
     * @param {any} data - Gets the imported data
     * @param {string} errorDetails - Gets the error details
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormImportFailed = function (data, errorDetails) {
        var eventArgs = { name: 'importFormFieldsfailed', importData: data, errorDetails: errorDetails, formFieldData: data };
        this.trigger('importFailed', eventArgs);
    };
    /**
     * @param {any} data - Gets the exported data
     * @param {string} errorDetails - Gets the error details
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireFormExportFailed = function (data, errorDetails) {
        var eventArgs = { name: 'exportFormFieldsFailed', exportData: data, errorDetails: errorDetails, formFieldData: data };
        this.trigger('exportFailed', eventArgs);
    };
    /**
     * @param {DocumentTextCollectionSettingsModel} documentCollection - Gets the document collection values
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireTextExtractionCompleted = function (documentCollection) {
        var emptyObj = [];
        if (this.extractTextOption === ExtractTextOption.TextAndBounds) {
            emptyObj = documentCollection;
        }
        else if (this.extractTextOption === ExtractTextOption.None) {
            emptyObj = [];
        }
        else {
            for (var i = 0; i < documentCollection.length; i++) {
                var document_1 = documentCollection[parseInt(i.toString(), 10)][parseInt(i.toString(), 10)];
                if (!emptyObj[parseInt(i.toString(), 10)]) {
                    emptyObj[parseInt(i.toString(), 10)] = {};
                }
                switch (this.extractTextOption) {
                    case ExtractTextOption.TextOnly:
                        emptyObj[parseInt(i.toString(), 10)][parseInt(i.toString(), 10)] =
                            { PageSize: document_1.PageSize, PageText: document_1.PageText };
                        break;
                    case ExtractTextOption.BoundsOnly:
                        emptyObj[parseInt(i.toString(), 10)][parseInt(i.toString(), 10)] =
                            { PageSize: document_1.PageSize, TextData: document_1.TextData };
                        break;
                }
            }
        }
        var eventArgs = { documentTextCollection: emptyObj };
        this.trigger('extractTextCompleted', eventArgs);
    };
    /**
     * @param {string} searchText - Gets the search text values
     * @param {boolean} isMatchcase - Gets whether the match case is true or not
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireTextSearchStart = function (searchText, isMatchcase) {
        var eventArgs = { name: 'textSearchStart', searchText: searchText, matchCase: isMatchcase };
        this.trigger('textSearchStart', eventArgs);
    };
    /**
     * @param {string} searchText - Gets the search text values
     * @param {boolean} isMatchcase - Gets whether the match case is true or not
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireTextSearchComplete = function (searchText, isMatchcase) {
        var eventArgs = { name: 'textSearchComplete', searchText: searchText, matchCase: isMatchcase };
        this.trigger('textSearchComplete', eventArgs);
    };
    /**
     * @param {string} searchText - Gets the search text values
     * @param {boolean} isMatchcase - Gets whether the match case is true or not
     * @param {RectangleBoundsModel} bounds - Gets the bounds values
     * @param {number} pageNumber - Gets the page number value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireTextSearchHighlight = function (searchText, isMatchcase, bounds, pageNumber) {
        var eventArgs = { name: 'textSearchHighlight', searchText: searchText, matchCase: isMatchcase, bounds: bounds, pageNumber: pageNumber };
        this.trigger('textSearchHighlight', eventArgs);
    };
    /**
     * @param  {string} id - Gets the id value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.firecustomContextMenuSelect = function (id) {
        var eventArgs = { id: id };
        this.trigger('customContextMenuSelect', eventArgs);
    };
    /**
     * @param  {string[]} ids - Gets the id value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.firecustomContextMenuBeforeOpen = function (ids) {
        var eventArgs = { ids: ids };
        this.trigger('customContextMenuBeforeOpen', eventArgs);
    };
    /**
     * @param {KeyboardCommandModel} gesture - Gets the keyboard command value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.fireKeyboardCustomCommands = function (gesture) {
        var eventArgs = { keyboardCommand: gesture };
        this.trigger('keyboardCustomCommands', eventArgs);
    };
    /**
     * @param {string} fileName - Gets the name of the file
     * @param {string} downloadData - Gets the downloaded data values
     * @private
     * @returns {boolean} - boolean
     */
    PdfViewer.prototype.firePageOrganizerSaveAsEventArgs = function (fileName, downloadData) {
        var eventArgs = { fileName: fileName, downloadDocument: downloadData, cancel: false };
        this.trigger('pageOrganizerSaveAs', eventArgs);
        if (eventArgs.cancel) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * @param {ClientRect} bounds - Gets the bounds values
     * @param {string} commonStyle - Gets the common style value
     * @param {HTMLElement} cavas - Gets the canvas value
     * @param {number} index - Gets the index values
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.renderAdornerLayer = function (bounds, commonStyle, cavas, index) {
        renderAdornerLayer(bounds, commonStyle, cavas, index, this);
    };
    /**
     * @param {number} index - Gets the index value
     * @param {AnnotationSelectorSettingsModel} currentSelector - Gets the current selector
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.renderSelector = function (index, currentSelector) {
        this.drawing.renderSelector(index, currentSelector);
    };
    /**
     * @param {string[]} objArray - Gets the object array values
     * @param {AnnotationSelectorSettingsModel} currentSelector - Gets the current selector
     * @param {boolean} multipleSelection - Checks whether the multiple selection is true or not
     * @param {boolean} preventUpdate - Checks whether the prevent update is true or not
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.select = function (objArray, currentSelector, multipleSelection, preventUpdate) {
        var allowServerDataBind = this.allowServerDataBinding;
        this.enableServerDataBinding(false);
        if (this.annotationModule) {
            var module = this.annotationModule.textMarkupAnnotationModule;
            var annotationSelect = module && module.selectTextMarkupCurrentPage;
            var annotation = this.selectedItems.annotations[0];
            if (annotationSelect) {
                var currentAnnot = this.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
                this.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(annotationSelect, true);
                this.fireAnnotationUnSelect(currentAnnot.annotName, currentAnnot.pageNumber, currentAnnot);
            }
            if (!multipleSelection) {
                if (this.viewerBase.activeElements && this.viewerBase.activeElements.activePageID >= 0) {
                    if (!this.viewerBase.isNewStamp && annotation && annotation.shapeAnnotationType !== 'HandWrittenSignature' && annotation.shapeAnnotationType !== 'SignatureText' && annotation.shapeAnnotationType !== 'SignatureImage') {
                        this.fireAnnotationUnSelect(annotation.annotName, annotation.pageIndex, annotation);
                    }
                }
            }
        }
        if (this.viewerBase.signatureModule) {
            var annotation = this.selectedItems.annotations[0];
            if (!multipleSelection) {
                var selectorModel = this.selectedItems;
                if (selectorModel.annotations.length) {
                    for (var j = 0; j < selectorModel.annotations.length; j++) {
                        var node = selectorModel.annotations[parseInt(j.toString(), 10)];
                        if (this.viewerBase.activeElements && this.viewerBase.activeElements.activePageID >= 0) {
                            if (!this.viewerBase.isNewSignatureAdded && (annotation.shapeAnnotationType === 'HandWrittenSignature' || annotation.shapeAnnotationType === 'SignatureText' || annotation.shapeAnnotationType === 'SignatureImage')) {
                                this.annotationModule.unselectSignature(node.signatureName, node.pageIndex, node);
                            }
                        }
                    }
                }
            }
        }
        if (this.formDesignerModule) {
            var formField = this.selectedItems.formFields[0];
            if (formField) {
                if (this.formDesignerModule && formField && formField.formFieldAnnotationType) {
                    var field = {
                        name: formField.name, id: formField.id, value: formField.value,
                        fontFamily: formField.fontFamily, fontSize: formField.fontSize, fontStyle: formField.fontStyle,
                        color: formField.color,
                        backgroundColor: formField.backgroundColor,
                        borderColor: formField.borderColor,
                        thickness: formField.thickness,
                        alignment: formField.alignment, isReadonly: formField.isReadonly,
                        visibility: formField.visibility,
                        maxLength: formField.maxLength, isRequired: formField.isRequired,
                        isPrint: formField.isPrint, rotation: formField.rotateAngle, tooltip: formField.tooltip,
                        options: formField.options,
                        isChecked: formField.isChecked, isSelected: formField.isSelected
                    };
                    this.fireFormFieldUnselectEvent('formFieldUnselect', field, formField.pageIndex);
                }
            }
        }
        // eslint-disable-next-line
        var proxy = this;
        this.viewerBase.renderedPagesList.forEach(function (item) {
            proxy.clearSelection(item);
        });
        this.drawing.select(objArray, currentSelector, multipleSelection, preventUpdate);
        this.enableServerDataBinding(allowServerDataBind, true);
    };
    /**
     * @param {number} pageId - Gets the page id value
     * @private
     * @returns {ZOrderPageTable} - return
     */
    PdfViewer.prototype.getPageTable = function (pageId) {
        return this.drawing.getPageTable(pageId);
    };
    /**
     * @param {number} diffX - Gets the diffX value
     * @param {number} diffY - Gets the diffY value
     * @param {number} pageIndex - Gets the page index value
     * @param {AnnotationSelectorSettingsModel} currentSelector - Gets the current selector
     * @param {PdfAnnotationBaseModel} helper - Gets the helper value
     * @private
     * @returns {boolean} - returns boolean
     */
    PdfViewer.prototype.dragSelectedObjects = function (diffX, diffY, pageIndex, currentSelector, helper) {
        return this.drawing.dragSelectedObjects(diffX, diffY, pageIndex, currentSelector, helper);
    };
    /**
     * @param {number} sx - Gets the sx value
     * @param {number} sy - Gets the sy value
     * @param {PointModel} pivot - Gets the pivot value
     * @private
     * @returns {boolean} - return boolean
     */
    PdfViewer.prototype.scaleSelectedItems = function (sx, sy, pivot) {
        return this.drawing.scaleSelectedItems(sx, sy, pivot);
    };
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
    PdfViewer.prototype.dragConnectorEnds = function (endPoint, obj, point, segment, target, targetPortId, currentSelector) {
        return this.drawing.dragConnectorEnds(endPoint, obj, point, segment, target, null, currentSelector);
    };
    /**
     * @param {number} pageId - Gets the page id value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.clearSelection = function (pageId) {
        var allowServerDataBind = this.allowServerDataBinding;
        this.enableServerDataBinding(false);
        var selectormodel = this.selectedItems;
        var node = selectormodel.annotations.length > 0 ?
            this.selectedItems.annotations[0] : this.selectedItems.formFields[0];
        if (selectormodel.annotations.length > 0) {
            selectormodel.offsetX = 0;
            selectormodel.offsetY = 0;
            selectormodel.width = 0;
            selectormodel.height = 0;
            selectormodel.rotateAngle = 0;
            selectormodel.annotations = [];
            selectormodel.wrapper = null;
        }
        else if (selectormodel.formFields.length > 0) {
            selectormodel.offsetX = 0;
            selectormodel.offsetY = 0;
            selectormodel.width = 0;
            selectormodel.height = 0;
            selectormodel.rotateAngle = 0;
            selectormodel.formFields = [];
            selectormodel.wrapper = null;
        }
        this.drawing.clearSelectorLayer(pageId);
        this.viewerBase.isAnnotationSelect = false;
        this.viewerBase.isFormFieldSelect = false;
        if (this.annotationModule) {
            var module = this.annotationModule.textMarkupAnnotationModule;
            if (module) {
                var annotationSelect = module.selectTextMarkupCurrentPage;
                this.annotationModule.textMarkupAnnotationModule.clearCurrentSelectedAnnotation();
                this.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(annotationSelect);
            }
        }
        this.enableServerDataBinding(allowServerDataBind, true);
    };
    /**
     * Get page number from the user coordinates x and y.
     *
     * @param {Point} clientPoint - The user will provide a x, y coordinates.
     * @returns {number} - number
     */
    PdfViewer.prototype.getPageNumberFromClientPoint = function (clientPoint) {
        var pageNumber = this.viewerBase.getPageNumberFromClientPoint(clientPoint);
        return pageNumber;
    };
    /**
     * Convert user coordinates to the PDF page coordinates.
     *
     * @param {Point} clientPoint - The user should provide a x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    PdfViewer.prototype.convertClientPointToPagePoint = function (clientPoint, pageNumber) {
        var pagePoint = this.viewerBase.convertClientPointToPagePoint(clientPoint, pageNumber);
        return pagePoint;
    };
    /**
     * Convert page coordinates to the user coordinates.
     *
     * @param {Point} pagePoint - The user should provide a page x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    PdfViewer.prototype.convertPagePointToClientPoint = function (pagePoint, pageNumber) {
        var clientPoint = this.viewerBase.convertPagePointToClientPoint(pagePoint, pageNumber);
        return clientPoint;
    };
    /**
     * Convert page coordinates to the scrolling coordinates.
     *
     * @param {Point} pagePoint - The user should provide a page x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    PdfViewer.prototype.convertPagePointToScrollingPoint = function (pagePoint, pageNumber) {
        var scrollingPoint = this.viewerBase.convertPagePointToScrollingPoint(pagePoint, pageNumber);
        return scrollingPoint;
    };
    /**
     * Brings the given rectangular region to view and zooms in the document to fit the region in client area (view port).
     *
     * @param {Rect} rectangle - Specifies the region in client coordinates that is to be brought to view.
     * @returns {void}
     */
    PdfViewer.prototype.zoomToRect = function (rectangle) {
        this.magnificationModule.zoomToRect(rectangle);
    };
    /**
     * @param {PdfAnnotationBase} obj - It describes about the object
     * @private
     * @returns {PdfAnnotationBaseModel} - Pdf annotation base model
     */
    PdfViewer.prototype.add = function (obj) {
        return this.drawing.add(obj);
    };
    /**
     * @param {PdfAnnotationBaseModel} obj - It describes about the object
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.remove = function (obj) {
        return this.drawing.remove(obj);
    };
    /**
     * @private
     * @returns {Object} - returns object
     */
    PdfViewer.prototype.copy = function () {
        if (this.annotation) {
            this.annotation.isShapeCopied = true;
        }
        else if (this.formDesigner && this.designerMode) {
            this.formDesigner.isShapeCopied = true;
        }
        return this.drawing.copy();
    };
    /**
     * @param {number} angle - It describes about the angle value
     * @param {AnnotationSelectorSettingsModel} currentSelector  - It describes about the current selector
     * @private
     * @returns {boolean} - returns boolean value
     */
    PdfViewer.prototype.rotate = function (angle, currentSelector) {
        return this.drawing.rotate(this.selectedItems, angle, null, currentSelector);
    };
    /**
     * @param {PdfAnnotationBaseModel[]} obj - It describes about the object
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.paste = function (obj) {
        var index;
        if (this.viewerBase.activeElements.activePageID) {
            index = this.viewerBase.activeElements.activePageID;
        }
        return this.drawing.paste(obj, index || 0);
    };
    /**
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.refresh = function () {
        for (var i = 0; i < this.annotations.length; i++) {
            if (this.zIndexTable.length !== undefined) {
                var notFound = true;
                for (var i_1 = 0; i_1 < this.zIndexTable.length; i_1++) {
                    var objects = this.zIndexTable[parseInt(i_1.toString(), 10)].objects;
                    for (var j = 0; j < objects.length; j++) {
                        objects.splice(j, 1);
                    }
                    delete this.zIndexTable[parseInt(i_1.toString(), 10)];
                }
                if (this.annotations[parseInt(i.toString(), 10)]) {
                    delete this.annotations[parseInt(i.toString(), 10)];
                }
                if (this.selectedItems.annotations && this.selectedItems.annotations[parseInt(i.toString(), 10)]) {
                    delete this.selectedItems.annotations[parseInt(i.toString(), 10)];
                }
                this.zIndexTable = [];
                this.renderDrawing();
            }
            if (this.annotations && this.annotations.length !== 0) {
                this.annotations.length = 0;
                this.selectedItems.annotations.length = 0;
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.cut = function () {
        var index;
        if (this.viewerBase.activeElements.activePageID) {
            index = this.viewerBase.activeElements.activePageID;
        }
        if (this.annotation) {
            this.annotation.isShapeCopied = true;
        }
        else if (this.formDesigner && this.designerMode) {
            this.formDesigner.isShapeCopied = true;
        }
        return this.drawing.cut(index || 0);
    };
    /**
     * @param {PdfAnnotationBaseModel} actualObject - It describes about the actual object value
     * @param {PdfAnnotationBaseModel} node - It describes about the node value
     * @private
     * @returns {void}
     */
    PdfViewer.prototype.nodePropertyChange = function (actualObject, node) {
        this.drawing.nodePropertyChange(actualObject, node);
    };
    /**
     * enableServerDataBinding method
     *
     * @returns { void }  enableServerDataBinding method.
     * @param {boolean} enable - provide the node value.
     * @param {boolean} clearBulkChanges - checks whether the clear bulk changes true or not
     * @private
     */
    PdfViewer.prototype.enableServerDataBinding = function (enable, clearBulkChanges) {
        if (clearBulkChanges === void 0) { clearBulkChanges = false; }
        if (isBlazor()) {
            this.allowServerDataBinding = enable;
            if (clearBulkChanges) {
                this.bulkChanges = {};
            }
        }
    };
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
    PdfViewer.prototype.checkBoundaryConstraints = function (tx, ty, pageIndex, nodeBounds, isStamp, isSkip) {
        return this.drawing.checkBoundaryConstraints(tx, ty, pageIndex, nodeBounds, isStamp, isSkip);
    };
    /**
     * Adds a custom menu item to the existing menu, with optional configurations.
     *
     * @param {MenuItemModel[]} menuItems - The custom menu item to be added.
     * @param {boolean} disableDefaultItems - Optional. When set to true, this parameter disables the inclusion of default items in the menu. Defaults to false, meaning default items will be included.
     * @param {boolean} appendToEnd - Optional. When set to true, the custom menu item will be added at the bottom of the existing menu list. If false or not provided, the item will be added at the default position.
     * @returns {void}
     */
    PdfViewer.prototype.addCustomMenu = function (menuItems, disableDefaultItems, appendToEnd) {
        var _a;
        if (!isNullOrUndefined(menuItems)) {
            (_a = this.customContextMenuItems).push.apply(_a, menuItems);
            this.showCustomContextMenuBottom = appendToEnd;
        }
        this.disableDefaultContextMenu = disableDefaultItems;
    };
    __decorate([
        Property()
    ], PdfViewer.prototype, "serviceUrl", void 0);
    __decorate([
        Property(0)
    ], PdfViewer.prototype, "pageCount", void 0);
    __decorate([
        Property(1)
    ], PdfViewer.prototype, "printScaleFactor", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isDocumentEdited", void 0);
    __decorate([
        Property(0)
    ], PdfViewer.prototype, "currentPageNumber", void 0);
    __decorate([
        Property()
    ], PdfViewer.prototype, "documentPath", void 0);
    __decorate([
        Property(null)
    ], PdfViewer.prototype, "exportAnnotationFileName", void 0);
    __decorate([
        Property()
    ], PdfViewer.prototype, "downloadFileName", void 0);
    __decorate([
        Property('auto')
    ], PdfViewer.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], PdfViewer.prototype, "width", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableToolbar", void 0);
    __decorate([
        Property(1)
    ], PdfViewer.prototype, "retryCount", void 0);
    __decorate([
        Property([500])
    ], PdfViewer.prototype, "retryStatusCodes", void 0);
    __decorate([
        Property(0)
    ], PdfViewer.prototype, "retryTimeout", void 0);
    __decorate([
        Property(2)
    ], PdfViewer.prototype, "initialRenderPages", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "showNotificationDialog", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableNavigationToolbar", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableCommentPanel", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isCommandPanelOpen", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableMultiLineOverlap", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isValidFreeText", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isAnnotationToolbarOpen", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isAnnotationToolbarVisible", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isFormDesignerToolbarVisible", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableMultiPageAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableDownload", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePrint", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePrintRotation", void 0);
    __decorate([
        Property([])
    ], PdfViewer.prototype, "customFonts", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableThumbnail", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePageOrganizer", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isPageOrganizerOpen", void 0);
    __decorate([
        Property({ canDelete: true, canInsert: true, canRotate: true, canCopy: true, canRearrange: true, canImport: true })
    ], PdfViewer.prototype, "pageOrganizerSettings", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isThumbnailViewOpen", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isSignatureEditable", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableBookmark", void 0);
    __decorate([
        Property('TextAndBounds')
    ], PdfViewer.prototype, "extractTextOption", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableLocalStorage", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableBookmarkStyles", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableHyperlink", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableHandwrittenSignature", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableInkAnnotation", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "restrictZoomRequest", void 0);
    __decorate([
        Property('CurrentTab')
    ], PdfViewer.prototype, "hyperlinkOpenState", void 0);
    __decorate([
        Property('RightClick')
    ], PdfViewer.prototype, "contextMenuOption", void 0);
    __decorate([
        Property([])
    ], PdfViewer.prototype, "disableContextMenuItems", void 0);
    __decorate([
        Property({ name: '', id: '', type: '', isReadOnly: false, isSelected: false, isChecked: false, value: '', signatureType: [''], fontName: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', backgroundColor: 'white', alignment: 'Left', visibility: 'visible', maxLength: 0, isRequired: false, isPrint: false, tooltip: '', pageIndex: -1, options: [], signatureIndicatorSettings: { opacity: 1, backgroundColor: 'orange', width: 19, height: 10, fontSize: 10, text: null, color: 'black', customData: '' } })
    ], PdfViewer.prototype, "formFieldCollections", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableNavigation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAutoComplete", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableMagnification", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableShapeLabel", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableImportAnnotationMeasurement", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePinchZoom", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextSelection", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextSearch", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFormFields", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFormDesigner", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "designerMode", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableFormFieldsValidation", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isFormFieldDocument", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableDesktopMode", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "hideSaveSignature", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFreeText", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextMarkupAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableShapeAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableMeasureAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableStampAnnotations", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableStickyNotesAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAnnotationToolbar", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFormDesignerToolbar", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isBookmarkPanelOpen", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isInitialFieldToolbarSelection", void 0);
    __decorate([
        Property('TextSelection')
    ], PdfViewer.prototype, "interactionMode", void 0);
    __decorate([
        Property('Default')
    ], PdfViewer.prototype, "zoomMode", void 0);
    __decorate([
        Property('Default')
    ], PdfViewer.prototype, "signatureFitMode", void 0);
    __decorate([
        Property('Default')
    ], PdfViewer.prototype, "printMode", void 0);
    __decorate([
        Property(0)
    ], PdfViewer.prototype, "zoomValue", void 0);
    __decorate([
        Property(10)
    ], PdfViewer.prototype, "minZoom", void 0);
    __decorate([
        Property(400)
    ], PdfViewer.prototype, "maxZoom", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableZoomOptimization", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isExtractText", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isMaintainSelection", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "hideEmptyDigitalSignatureFields", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "showDigitalSignatureAppearance", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAccessibilityTags", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property('M/d/yyyy h:mm:ss a')
    ], PdfViewer.prototype, "dateTimeFormat", void 0);
    __decorate([
        Property('')
    ], PdfViewer.prototype, "resourceUrl", void 0);
    __decorate([
        Property({ showTooltip: true, toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'AnnotationEditTool', 'FormDesignerEditTool', 'FreeTextAnnotationOption', 'InkAnnotationOption', 'ShapeAnnotationOption', 'StampAnnotation', 'SignatureOption', 'SearchOption', 'PrintOption', 'DownloadOption'], annotationToolbarItems: ['HighlightTool', 'UnderlineTool', 'StrikethroughTool', 'ColorEditTool', 'OpacityEditTool', 'AnnotationDeleteTool', 'StampAnnotationTool', 'HandWrittenSignatureTool', 'InkAnnotationTool', 'ShapeTool', 'CalibrateTool', 'StrokeColorEditTool', 'ThicknessEditTool', 'FreeTextAnnotationTool', 'FontFamilyAnnotationTool', 'FontSizeAnnotationTool', 'FontStylesAnnotationTool', 'FontAlignAnnotationTool', 'FontColorAnnotationTool', 'CommentPanelTool'], formDesignerToolbarItems: ['TextboxTool', 'PasswordTool', 'CheckBoxTool', 'RadioButtonTool', 'DropdownTool', 'ListboxTool', 'DrawSignatureTool', 'DeleteTool'] })
    ], PdfViewer.prototype, "toolbarSettings", void 0);
    __decorate([
        Property({ ajaxHeaders: [], withCredentials: false })
    ], PdfViewer.prototype, "ajaxRequestSettings", void 0);
    __decorate([
        Property({ customStampName: '', customStampImageSource: '' })
    ], PdfViewer.prototype, "customStamp", void 0);
    __decorate([
        Property({ load: 'Load', renderPages: 'RenderPdfPages', unload: 'Unload', download: 'Download', renderThumbnail: 'RenderThumbnailImages', print: 'PrintImages', renderComments: 'RenderAnnotationComments', importAnnotations: 'ImportAnnotations', exportAnnotations: 'ExportAnnotations', importFormFields: 'ImportFormFields', exportFormFields: 'ExportFormFields', renderTexts: 'RenderPdfTexts', validatePassword: 'ValidatePassword' })
    ], PdfViewer.prototype, "serverActionSettings", void 0);
    __decorate([
        Property({ name: '', isReadOnly: false, visibility: 'visible', isRequired: false, isPrint: true, tooltip: '', thickness: 1, signatureIndicatorSettings: { opacity: 1, backgroundColor: 'orange', width: 19, height: 10, fontSize: 10, text: null, color: 'black' }, signatureDialogSettings: { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false } })
    ], PdfViewer.prototype, "signatureFieldSettings", void 0);
    __decorate([
        Property({ name: '', isReadOnly: false, visibility: 'visible', isRequired: false, isPrint: true, tooltip: '', thickness: 1, initialIndicatorSettings: { opacity: 1, backgroundColor: 'orange', width: 19, height: 10, fontSize: 10, text: null, color: 'black' }, initialDialogSettings: { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false } })
    ], PdfViewer.prototype, "initialFieldSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#FFDF56', author: 'Guest', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges }, isLock: false, enableMultiPageAnnotation: false, enableTextMarkupResizer: false, allowedInteractions: ['None'], isPrint: true, subject: 'Highlight' })
    ], PdfViewer.prototype, "highlightSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#ff0000', author: 'Guest', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges }, isLock: false, enableMultiPageAnnotation: false, enableTextMarkupResizer: false, allowedInteractions: ['None'], isPrint: true, subject: 'Strikethrough' })
    ], PdfViewer.prototype, "strikethroughSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#00ff00', author: 'Guest', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges }, isLock: false, enableMultiPageAnnotation: false, enableTextMarkupResizer: false, allowedInteractions: ['None'], isPrint: true, subject: 'Underline' })
    ], PdfViewer.prototype, "underlineSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'None', lineHeadEndStyle: 'None', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true, subject: 'Line' })
    ], PdfViewer.prototype, "lineSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Closed', lineHeadEndStyle: 'Closed', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true, subject: 'Arrow' })
    ], PdfViewer.prototype, "arrowSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true, subject: 'Rectangle' })
    ], PdfViewer.prototype, "rectangleSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', borderColor: '#ff0000', fontColor: '#000', fontSize: 16, labelHeight: 24.6, labelMaxWidth: 151, labelContent: 'Label' })
    ], PdfViewer.prototype, "shapeLabelSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true, subject: 'Circle' })
    ], PdfViewer.prototype, "circleSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true, subject: 'Polygon' })
    ], PdfViewer.prototype, "polygonSettings", void 0);
    __decorate([
        Property({ opacity: 1, author: 'Guest', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, dynamicStamps: [DynamicStampItem.Revised, DynamicStampItem.Reviewed, DynamicStampItem.Received, DynamicStampItem.Confidential, DynamicStampItem.Approved, DynamicStampItem.NotApproved], signStamps: [SignStampItem.Witness, SignStampItem.InitialHere, SignStampItem.SignHere, SignStampItem.Accepted, SignStampItem.Rejected], standardBusinessStamps: [StandardBusinessStampItem.Approved, StandardBusinessStampItem.NotApproved, StandardBusinessStampItem.Draft, StandardBusinessStampItem.Final, StandardBusinessStampItem.Completed, StandardBusinessStampItem.Confidential, StandardBusinessStampItem.ForPublicRelease, StandardBusinessStampItem.NotForPublicRelease, StandardBusinessStampItem.ForComment, StandardBusinessStampItem.Void, StandardBusinessStampItem.PreliminaryResults, StandardBusinessStampItem.InformationOnly], allowedInteractions: ['None'], isPrint: true, subject: '' })
    ], PdfViewer.prototype, "stampSettings", void 0);
    __decorate([
        Property({ opacity: 1, author: 'Guest', width: 0, height: 0, left: 0, top: 0, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, enableCustomStamp: true, allowedInteractions: ['None'], isPrint: true, subject: '' })
    ], PdfViewer.prototype, "customStampSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Closed', lineHeadEndStyle: 'Closed', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, leaderLength: 40, resizeCursorType: CursorType.move, allowedInteractions: ['None'], isPrint: true, subject: 'Distance calculation' })
    ], PdfViewer.prototype, "distanceSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Open', lineHeadEndStyle: 'Open', minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, allowedInteractions: ['None'], isPrint: true, subject: 'Perimeter calculation' })
    ], PdfViewer.prototype, "perimeterSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, allowedInteractions: ['None'], isPrint: true, subject: 'Area calculation' })
    ], PdfViewer.prototype, "areaSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true, subject: 'Radius calculation' })
    ], PdfViewer.prototype, "radiusSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, allowedInteractions: ['None'], isPrint: true, subject: 'Volume calculation' })
    ], PdfViewer.prototype, "volumeSettings", void 0);
    __decorate([
        Property({ author: 'Guest', opacity: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, isLock: false, allowedInteractions: ['None'], isPrint: true, subject: 'Sticky Note' })
    ], PdfViewer.prototype, "stickyNotesSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', borderColor: '#ffffff00', author: 'Guest', borderWidth: 1, width: 151, fontSize: 16, height: 24.6, fontColor: '#000', fontFamily: 'Helvetica', defaultText: 'Type Here', textAlignment: 'Left', fontStyle: FontStyle.None, allowTextOnly: false, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true, isReadonly: false, enableAutoFit: false, subject: 'Text Box' })
    ], PdfViewer.prototype, "freeTextSettings", void 0);
    __decorate([
        Property({ conversionUnit: 'in', displayUnit: 'in', scaleRatio: 1, depth: 96 })
    ], PdfViewer.prototype, "measurementSettings", void 0);
    __decorate([
        Property({ selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null })
    ], PdfViewer.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property({ searchHighlightColor: '#fdd835', searchColor: '#8b4c12' })
    ], PdfViewer.prototype, "textSearchColorSettings", void 0);
    __decorate([
        Property({ displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false })
    ], PdfViewer.prototype, "signatureDialogSettings", void 0);
    __decorate([
        Property({ displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false })
    ], PdfViewer.prototype, "initialDialogSettings", void 0);
    __decorate([
        Property({ signatureItem: ['Signature', 'Initial'], saveSignatureLimit: 1, saveInitialLimit: 1, opacity: 1, strokeColor: '#000000', width: 150, height: 100, thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, allowedInteractions: ['None'], signatureDialogSettings: { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false }, initialDialogSettings: { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false } })
    ], PdfViewer.prototype, "handWrittenSignatureSettings", void 0);
    __decorate([
        Property({ author: 'Guest', opacity: 1, strokeColor: '#ff0000', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, isLock: false, allowedInteractions: ['None'], isPrint: true, subject: 'Ink' })
    ], PdfViewer.prototype, "inkAnnotationSettings", void 0);
    __decorate([
        Property({ author: 'Guest', minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, skipPrint: false, skipDownload: false, allowedInteractions: ['None'], subject: '' })
    ], PdfViewer.prototype, "annotationSettings", void 0);
    __decorate([
        Property({ enableTileRendering: true, x: 0, y: 0 })
    ], PdfViewer.prototype, "tileRenderingSettings", void 0);
    __decorate([
        Property({ delayPageRequestTimeOnScroll: 100 })
    ], PdfViewer.prototype, "scrollSettings", void 0);
    __decorate([
        Property({ name: '', value: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', borderColor: 'black', backgroundColor: 'white', alignment: 'Left', isReadOnly: false, visibility: 'visible', maxLength: 0, isRequired: false, isPrint: true, tooltip: '', thickness: 1, isMultiline: false, customData: '' })
    ], PdfViewer.prototype, "textFieldSettings", void 0);
    __decorate([
        Property({ name: '', value: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', borderColor: 'black', backgroundColor: 'white', alignment: 'Left', isReadOnly: false, visibility: 'visible', maxLength: 0, isRequired: false, isPrint: true, tooltip: '', thickness: 1, customData: '' })
    ], PdfViewer.prototype, "passwordFieldSettings", void 0);
    __decorate([
        Property({ name: '', value: '', isChecked: false, backgroundColor: 'white', isReadOnly: false, visibility: 'visible', isPrint: true, tooltip: '', isRequired: false, thickness: 1, borderColor: 'black', customData: '' })
    ], PdfViewer.prototype, "checkBoxFieldSettings", void 0);
    __decorate([
        Property({ name: '', value: '', isSelected: false, backgroundColor: 'white', isReadOnly: false, visibility: 'visible', isPrint: true, tooltip: '', isRequired: false, thickness: 1, borderColor: 'black', customData: '' })
    ], PdfViewer.prototype, "radioButtonFieldSettings", void 0);
    __decorate([
        Property({ name: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', backgroundColor: 'white', alignment: 'Left', isReadOnly: false, visibility: 'visible', isRequired: false, isPrint: true, tooltip: '', options: [], thickness: 1, borderColor: 'black', customData: '' })
    ], PdfViewer.prototype, "DropdownFieldSettings", void 0);
    __decorate([
        Property({ name: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', backgroundColor: 'white', alignment: 'Left', isReadOnly: false, visibility: 'visible', isRequired: false, isPrint: false, tooltip: '', options: [], thickness: 1, borderColor: 'black', customData: '' })
    ], PdfViewer.prototype, "listBoxFieldSettings", void 0);
    __decorate([
        Property({ contextMenuAction: 'RightClick', contextMenuItems: [ContextMenuItem.Comment, ContextMenuItem.Copy, ContextMenuItem.Cut, ContextMenuItem.Delete, ContextMenuItem.Highlight, ContextMenuItem.Paste, ContextMenuItem.Properties, ContextMenuItem.ScaleRatio, ContextMenuItem.Strikethrough, ContextMenuItem.Underline] })
    ], PdfViewer.prototype, "contextMenuSettings", void 0);
    __decorate([
        Property([])
    ], PdfViewer.prototype, "customContextMenuItems", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "disableDefaultContextMenu", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "showCustomContextMenuBottom", void 0);
    __decorate([
        Complex({}, CommandManager)
    ], PdfViewer.prototype, "commandManager", void 0);
    __decorate([
        Complex({}, Selector)
    ], PdfViewer.prototype, "selectedItems", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "created", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "resourcesLoaded", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentLoad", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentUnload", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentLoadFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "ajaxRequestFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "ajaxRequestSuccess", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageRenderComplete", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "validateFormFields", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "hyperlinkClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "hyperlinkMouseOver", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "zoomChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationAdd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationRemove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationPropertiesChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationResize", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "addSignature", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "removeSignature", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "moveSignature", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "signaturePropertiesChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "resizeSignature", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "signatureSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "signatureUnselect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationUnSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationDoubleClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationMove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationMoving", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationMouseover", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationMouseLeave", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageMouseover", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importSuccess", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportSuccess", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "extractTextCompleted", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "thumbnailClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "bookmarkClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "toolbarClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSelectionStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSelectionEnd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "downloadStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "buttonFieldClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "downloadEnd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "printStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "printEnd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSearchStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSearchComplete", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSearchHighlight", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "ajaxRequestInitiate", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageRenderInitiate", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentAdd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentEdit", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentDelete", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentStatusChanged", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "beforeAddFreeText", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldFocusOut", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldAdd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldRemove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldPropertiesChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldMouseLeave", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldMouseover", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldMove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldResize", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldUnselect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldDoubleClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "customContextMenuSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "customContextMenuBeforeOpen", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "keyboardCustomCommands", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageOrganizerSaveAs", void 0);
    __decorate([
        Collection([], PdfAnnotationBase)
    ], PdfViewer.prototype, "annotations", void 0);
    __decorate([
        Collection([], PdfFormFieldBase)
    ], PdfViewer.prototype, "formFields", void 0);
    __decorate([
        Property()
    ], PdfViewer.prototype, "drawingObject", void 0);
    PdfViewer = __decorate([
        NotifyPropertyChanges
    ], PdfViewer);
    return PdfViewer;
}(Component));
export { PdfViewer };
