import { PdfFontStyle } from '@syncfusion/ej2-pdf';
import { PdfViewer, PdfViewerBase } from '../index';
/**
 * FormFieldsBase
 *
 * @hidden
 */
export declare class FormFieldsBase {
    private pdfViewer;
    private pdfViewerBase;
    private formFieldLoadedDocument;
    private defaultAppearanceFields;
    private pageRenderer;
    /**
     * @private
     */
    mIsDigitalSignaturePresent: boolean;
    /**
     * @private
     */
    showDigitalSignatureAppearance: boolean;
    /**
     * @private
     */
    hideEmptyDigitalSignatureFields: boolean;
    /**
     * @private
     */
    PdfRenderedFormFields: PdfRenderedFields[];
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @param {boolean} digitalSignatruePresent - The digitalSignatruePresent
     * @private
     * @returns {void}
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase, digitalSignatruePresent?: boolean);
    /**
     * @private
     * @param {any} textSignature - This is textSignature
     * @param {any} loadedDocument - loadedDocument
     * @param {boolean} isAnnotationFlattern - isAnnotationFlattern
     * @returns {void}
     */
    drawFreeTextAnnotations(textSignature: any, loadedDocument: any, isAnnotationFlattern: boolean): void;
    private getRotateAngle;
    /**
     * @private
     * @param {any} signatureImage - signatureImage
     * @param {any} loadedDocument - loadedDocument
     * @param {boolean} isAnnotationFlattern - isAnnotationFlattern
     * @returns {void}
     */
    drawImage(signatureImage: any, loadedDocument: any, isAnnotationFlattern: boolean): void;
    /**
     * @private
     * @param {any} jsonObject - jsonObject
     * @returns {void}
     */
    saveFormFieldsDesignerData(jsonObject: any): void;
    private setFont;
    /**
     * @private
     * @param {any} jsonObject - jsonObject
     * @returns {void}
     */
    saveFormFieldsData(jsonObject: any): void;
    private addFormFieldsToDocument;
    private setFontFromKeys;
    private setFontAppearance;
    private disableFieldAppearance;
    private saveTextBoxField;
    private saveDropDownField;
    private SaveCheckBoxField;
    private saveListBoxField;
    private saveRadioButtonField;
    private saveSignatureField;
    private drawDesignerFieldFreeTextAnnotations;
    private drawDesignerFieldImage;
    private drawDesignerFieldPath;
    private setFontSize;
    private getTrueFont;
    private convertFieldBounds;
    private getFontFamily;
    private getBounds;
    private getFormfieldRotation;
    private getTextAlignment;
    private getFormFieldsVisibility;
    private getFontStyle;
    private convertPixelToPoint;
    private convertPointtoPixel;
    private fontConvert;
    private parseFontStyle;
    /**
     * @private
     * @returns {void}
     */
    GetFormFields(): void;
    private addTextBoxFieldItems;
    private addTextBoxField;
    private addComboBoxField;
    private addCheckBoxFieldItems;
    private addCheckBoxField;
    private addListBoxField;
    private addRadioButtonField;
    private checkTransparent;
    private GetRotateAngle;
    private drawFieldFreeTextAnnotations;
    private drawFieldImage;
    private drawFieldPath;
    private addSigntureFieldItems;
    private addSignatureField;
    private retrieveInkAnnotation;
    private getFontFamilyString;
}
/**
 * @private
 */
export declare class PdfRenderedFields {
    LineBounds: any;
    Name: string;
    FieldName: string;
    CheckBoxIndex: string;
    ComboBoxList: object[];
    ActualFieldName: string;
    CheckBoxGroupName: string;
    GroupName: string;
    Text: string;
    IsTransparent: boolean;
    ToolTip: string;
    Multiline: boolean;
    MultiSelect: boolean;
    Selected: boolean;
    PageIndex: number;
    Visible: number;
    Alignment: number;
    Value: string;
    FontStyle: PdfFontStyle;
    selectedIndex: number;
    IsSignatureField: boolean;
    IsInitialField: boolean;
    TextList: string[];
    SelectedList: number[];
    SelectedValue: string;
    BackColor: any;
    BorderColor: any;
    Foreground: number[];
    Font: any;
    FontColor: any;
    BorderStyle: any;
    BorderWidth: number;
    MaxLength: number;
    FontSize: number;
    InsertSpaces: boolean;
    IsRequired: boolean;
    Rotation: number;
    IsReadonly: boolean;
    RotationAngle: number;
    IsAutoSize: boolean;
    TabIndex: number;
    FontFamily: string;
    CustomData: object;
    constructor();
}
