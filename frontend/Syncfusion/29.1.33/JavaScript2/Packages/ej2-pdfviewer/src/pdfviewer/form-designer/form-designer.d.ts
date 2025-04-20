import { DrawingElement, PointModel } from '@syncfusion/ej2-drawings';
import { PdfFormFieldBaseModel, PdfFontModel } from '../drawing';
import { DiagramHtmlElement } from '../drawing/html-element';
import { PdfAnnotationBaseModel, PdfViewer, PdfViewerBase } from '../index';
import { CheckBoxFieldSettings, DropdownFieldSettings, PasswordFieldSettings, Item, ListBoxFieldSettings, RadioButtonFieldSettings, SignatureFieldSettings, TextFieldSettings, InitialFieldSettings } from '../pdfviewer';
import { ItemModel } from '../pdfviewer-model';
import { FormFieldType } from '../base/types';
/**
 * The `FormDesigner` module is used to handle form designer actions of PDF viewer.
 */
export declare class FormDesigner {
    private formFieldTooltips;
    private data;
    private previousBackgroundColor;
    private formFieldsData;
    private pdfViewer;
    private pdfViewerBase;
    private isFormFieldExistingInCollection;
    private propertiesDialog;
    private tabControl;
    private formFieldName;
    private formFieldTooltip;
    private formFieldValue;
    private formFieldVisibility;
    private formFieldReadOnly;
    private formFieldChecked;
    private formFieldRequired;
    private formFieldPrinting;
    private formFieldMultiline;
    private formFieldFontFamily;
    private formFieldFontSize;
    private maxLengthItem;
    private fontColorDropDown;
    private fontColorPalette;
    private fontColorElement;
    private colorDropDownElement;
    private colorPalette;
    private colorDropDown;
    private strokeDropDownElement;
    private strokeColorPicker;
    private strokeDropDown;
    private thicknessElement;
    private thicknessDropDown;
    private thicknessSlider;
    private thicknessIndicator;
    private formFieldListItem;
    private formFieldAddButton;
    private formFieldDeleteButton;
    private formFieldUpButton;
    private formFieldDownButton;
    private isBold;
    private isItalic;
    private isUnderline;
    private isStrikeThrough;
    private formFieldBold;
    private formFieldItalic;
    private formFieldUnderline;
    private formFieldStrikeOut;
    private formFieldAlign;
    private fontColorValue;
    private backgroundColorValue;
    private borderColorValue;
    private formFieldBorderWidth;
    private checkboxCheckedState;
    private multilineCheckboxCheckedState;
    private formFieldListItemCollection;
    private formFieldListItemDataSource;
    private isInitialField;
    private isSetFormFieldMode;
    private isAddFormFieldProgrammatically;
    private isAddFormFieldUi;
    private increasedSize;
    private defaultZoomValue;
    private defaultFontSize;
    private signIndicatorPadding;
    private signIndicatorMinimunFontSize;
    private signatureFieldPropertyChanged;
    private initialFieldPropertyChanged;
    private textFieldPropertyChanged;
    private passwordFieldPropertyChanged;
    private checkBoxFieldPropertyChanged;
    private radioButtonFieldPropertyChanged;
    private dropdownFieldPropertyChanged;
    private listBoxFieldPropertyChanged;
    /**
     * @private
     */
    disableSignatureClickEvent: boolean;
    /**
     * @private
     */
    formFieldIndex: number;
    /**
     * @private
     */
    formFieldIdIndex: number;
    /**
     * @private
     */
    isProgrammaticSelection: boolean;
    /**
     * @private
     */
    isShapeCopied: boolean;
    /**
     * @private
     */
    isFormFieldSizeUpdated: boolean;
    private isDrawHelper;
    private isFormFieldUpdated;
    /**
     * @param {PdfViewer} viewer - It describes about the viewer
     * @param {PdfViewerBase} base - It describes about the base
     * @private
     */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * @private
     */
    isPropertyDialogOpen: boolean;
    /**
     * @param {string} formFieldAnnotationType - It describes about the form field annotation type
     * @param {PdfFormFieldBaseModel} obj - It describes about the object
     * @param {Event} event - It describes about the event
     * @private
     * @returns {void}
     */
    drawHelper(formFieldAnnotationType: string, obj: PdfFormFieldBaseModel, event: Event): void;
    /**
     * @param {string} formFieldAnnotationType - It describes about the form field annotation type
     * @param {DiagramHtmlElement} element - It describes about the diagram html element
     * @param {PdfFormFieldBaseModel} drawingObject - It describes about the drawing object
     * @param {number} pageIndex - It describes about the page index
     * @param {PdfViewer} commandHandler - It describes about the command handler
     * @param {string} fieldId - It describes about the field id
     * @param {boolean} isAddedProgrammatically - It describes about the isAddedProgrammatically
     * @private
     * @returns {HTMLElement} - html element
     */
    drawHTMLContent(formFieldAnnotationType: string, element: DiagramHtmlElement, drawingObject: PdfFormFieldBaseModel, pageIndex?: number, commandHandler?: PdfViewer, fieldId?: string, isAddedProgrammatically?: boolean): HTMLElement;
    /**
     * @param {PointModel} point - It describes about the point
     * @param {DiagramHtmlElement} element - It describes about the element
     * @param {string} formFieldType - It describes about the form field type
     * @param {PdfFormFieldBaseModel} drawingObject - It describes about the drawing object
     * @private
     * @returns {void}
     */
    updateFormDesignerFieldInSessionStorage(point: PointModel, element: DiagramHtmlElement, formFieldType: string, drawingObject?: PdfFormFieldBaseModel): void;
    private getRadioButtonItem;
    private getRgbCode;
    /**
     * @param {string} colour -It describes about the color
     * @private
     * @returns {string} - string
     */
    nameToHash(colour: string): string;
    /**
     * @param {string} value - It describes about the value
     * @param {string} type - It describes about the type
     * @private
     * @returns {string} - string
     */
    getValue(value?: string, type?: string): string;
    private convertRgbToNumberArray;
    private convertToRgbString;
    private convertToHsvString;
    private roundValue;
    private hexToRgb;
    private rgbToHsv;
    private hsvToRgb;
    private rgbToHex;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {HTMLElement} canvas - It describes about the html element
     * @private
     * @returns {void}
     */
    updateCanvas(pageNumber: number, canvas?: HTMLElement): void;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    rerenderFormFields(pageIndex: number): void;
    private renderFormFieldsInZooming;
    /**
     * @param {DrawingElement} obj - It describes about the object
     * @param {string} formFieldAnnotationType - It describes about the form field annotation type
     * @private
     * @returns {any} - any
     */
    updateFormFieldInitialSize(obj: DrawingElement, formFieldAnnotationType: string): any;
    /**
     * @param {PdfAnnotationBaseModel} actualObject - It describes about the actual object
     * @private
     * @returns {void}
     */
    updateHTMLElement(actualObject: PdfAnnotationBaseModel): void;
    private getCheckboxRadioButtonBounds;
    private updateSessionFormFieldProperties;
    /**
     * @param {any} commandHandler - It describes about the command handler
     * @param {any} signatureField - It describes about the signature field
     * @param {any} bounds - It describes about the bounds
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {HTMLElement} - html element
     */
    createSignatureDialog(commandHandler: any, signatureField: any, bounds?: any, isPrint?: boolean): HTMLElement;
    private setIndicatorText;
    private getBounds;
    private updateSignatureandInitialIndicator;
    private setHeightWidth;
    /**
     * @param {DiagramHtmlElement} dropdownElement -  It describes about the dropdown element
     * @param {PdfFormFieldBaseModel} drawingObject - It describes about the drawing object
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {HTMLElement} - html element
     */
    createDropDownList(dropdownElement: DiagramHtmlElement, drawingObject: PdfFormFieldBaseModel, isPrint?: boolean): HTMLElement;
    /**
     * @param {DiagramHtmlElement} listBoxElement - It describes about the list box element
     * @param {PdfFormFieldBaseModel} drawingObject - It describes about the drawing object
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {HTMLElement} - html element
     */
    createListBox(listBoxElement: DiagramHtmlElement, drawingObject: PdfFormFieldBaseModel, isPrint?: boolean): HTMLElement;
    /**
     * @param {string} formFieldAnnotationType - It describes about the form field annotation type
     * @param {PdfFormFieldBaseModel} drawingObject - It describes about the drawing object
     * @param {any} formFieldBounds - It describes about the form field bounds
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {HTMLElement} - html element
     */
    createInputElement(formFieldAnnotationType: string, drawingObject: PdfFormFieldBaseModel, formFieldBounds?: any, isPrint?: boolean): HTMLElement;
    private listBoxChange;
    private dropdownChange;
    setCheckBoxState(event: Event): void;
    private setCheckedValue;
    private setRadioButtonState;
    private getTextboxValue;
    private inputElementClick;
    private updateFormFieldSessions;
    focusFormFields(event: any): void;
    blurFormFields(event: any): void;
    private setTextBoxFontStyle;
    /**
     * Adds form field to the PDF page.
     *
     * @param {FormFieldType} formFieldType - It describes about the form field type
     * @param {TextFieldSettings} options - It describes about the options
     * @param {boolean} isCollection - It describes about the isCollection
     * @param {string} id - It describes about the id
     * @returns {HTMLElement} - html element
     */
    addFormField(formFieldType: FormFieldType, options?: TextFieldSettings | PasswordFieldSettings | CheckBoxFieldSettings | DropdownFieldSettings | RadioButtonFieldSettings | ListBoxFieldSettings | SignatureFieldSettings | InitialFieldSettings, isCollection?: boolean, id?: string): HTMLElement;
    /**
     * Adds form field to the PDF page.
     *
     * @param {FormFieldType} formFieldType - It describes about the form field type
     * @param {TextFieldSettings} options - It describes about the options
     * @param {boolean} isCollection - It describes about the isCollection
     * @param {string} id - It describes about the id
     * @param {boolean} isAddedProgrammatically - It describes about the isAddedProgrammatically
     * @private
     * @returns {HTMLElement} - html element
     */
    addField(formFieldType: FormFieldType, options?: TextFieldSettings | PasswordFieldSettings | CheckBoxFieldSettings | DropdownFieldSettings | RadioButtonFieldSettings | ListBoxFieldSettings | SignatureFieldSettings | InitialFieldSettings, isCollection?: boolean, id?: string, isAddedProgrammatically?: boolean): HTMLElement;
    addFieldCollection(node: any): void;
    /**
     * @param {PdfFormFieldBaseModel} obj - It describes about the pdf formfield base model
     * @param {boolean} isAddedProgrammatically - It describes about the isAddedProgrammatically
     * @private
     * @returns {void}
     */
    drawFormField(obj: PdfFormFieldBaseModel, isAddedProgrammatically?: boolean): HTMLElement;
    /**
     * Update the node value based on the collections
     *
     * @param {PdfFormFieldBaseModel} node - It describes about the node
     * @param {any} data - It describes about the data
     * @returns {void}
     */
    private updateNodeBasedOnCollections;
    /**
     * Set the form field mode to add the form field on user interaction.
     *
     * @param {FormFieldType} formFieldType - It describes about the form field Id
     * @param {Item} options - It describes about the options
     * @returns {void}
     */
    setFormFieldMode(formFieldType: FormFieldType, options?: Item[]): void;
    /**
     * Reset the form fields into its original state.
     *
     * @param {string} formFieldId - It describes about the form field id
     * @returns {void}
     */
    resetFormField(formFieldId: string | object): void;
    /**
     * Select the form field in the PDF Viewer.
     *
     * @param {string} formFieldId - It describes about the form field id
     * @returns {void}
     */
    selectFormField(formFieldId: string | object): void;
    /**
     * Update the form field with the given properties and value.
     *
     * @param {string} formFieldId - It describes about the form field Id
     * @param {TextFieldSettings} options - It describes about the options
     * @returns {void}
     */
    updateFormField(formFieldId: string | object, options: TextFieldSettings | PasswordFieldSettings | CheckBoxFieldSettings | DropdownFieldSettings | RadioButtonFieldSettings | SignatureFieldSettings | InitialFieldSettings): void;
    /**
     * Update the form field in the form designer session.
     *
     * @param {any} formFieldId - It describes about the form field id
     * @param {any} options - It describes about the options
     * @returns {void}
     */
    private updateDesignerSession;
    /**
     * Update the form field in the form field session.
     *
     * @param {any} formFieldId - It describes about the form field id
     * @param {any} options - It describes about the options
     * @returns {void}
     */
    private updateFormFieldsInFieldsSession;
    /**
     * Update the form field in the form field collections.
     *
     * @param {any} formFieldId - It describes about the form field id
     * @param {any} options - It describes about the options
     * @returns {void}
     */
    private updateFormFieldsInCollections;
    /**
     * Update the form field data based on the value
     *
     * @param {any} currentData - It describes about the current data
     * @param {any} options - It describes about the options
     * @returns {void}
     */
    private updateFormFieldData;
    private formFieldPropertyChange;
    private colorNametoHashValue;
    /**
     * @param {string} formFieldId - It describes about the form field id
     * @private
     * @returns {PdfFormFieldBaseModel} - pdf formfiels base model
     */
    getFormField(formFieldId: string | object): PdfFormFieldBaseModel;
    private resetTextboxProperties;
    private resetPasswordProperties;
    private resetCheckboxProperties;
    private resetRadioButtonProperties;
    private resetDropdownListProperties;
    private resetListBoxProperties;
    private resetSignatureTextboxProperties;
    /**
     * Deletes the form field from the PDF page.
     *
     * @param {string} formFieldId - It describes about the form field id
     * @param {boolean} addAction - It describes about the addAction
     * @returns {void}
     */
    deleteFormField(formFieldId: string | object, addAction?: boolean): void;
    /**
     * Clears the selection of the form field in the PDF page.
     *
     * @param {string} formFieldId - It describes about the form field id
     * @returns {void}
     */
    clearSelection(formFieldId: string | object): void;
    /**
     * @param {string} mode - It describes about the mode
     * @private
     * @returns {void}
     */
    setMode(mode: string): void;
    private enableDisableFormFieldsInteraction;
    private getAnnotationsFromAnnotationCollections;
    /**
     * @param {string} formFieldId - It describes about the form field id
     * @private
     * @returns {void}
     */
    updateSignatureValue(formFieldId: string): void;
    /**
     * @param {string} annotationId - It describes about the annotation id
     * @param {string} fieldName - It describes about the field name
     * @private
     * @returns {void}
     */
    removeFieldsFromAnnotationCollections(annotationId: string, fieldName: string): void;
    /**
     * @private
     * @returns {number} - number
     */
    setFormFieldIndex(): number;
    private setFormFieldIdIndex;
    private activateTextboxElement;
    private activatePasswordField;
    private activateCheckboxElement;
    private activateRadioButtonElement;
    private activateDropDownListElement;
    private activateListboxElement;
    private activateSignatureBoxElement;
    /**
     * @param {PdfFormFieldBaseModel} obj - It describes about the object
     * @param {HTMLElement} inputElement - It describes about the input element
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {void}
     */
    updateTextboxProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @param {PdfFormFieldBaseModel} obj - It describes about the object
     * @param {HTMLElement} inputElement - It describes about the input element
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {void}
     */
    updatePasswordFieldProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @param {PdfFormFieldBaseModel} obj - It describes about the object
     * @param {HTMLElement} inputElement - It describes about the input element
     * @private
     * @returns {void}
     */
    updateCheckboxProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement): void;
    /**
     * @param {PdfFormFieldBaseModel} obj - It describes about the object
     * @param {HTMLElement} inputElement - It describes about the input element
     * @param {HTMLElement} labelElement - It describes about the label element
     * @private
     * @returns {void}
     */
    updateRadioButtonProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, labelElement?: HTMLElement): void;
    /**
     * @param {PdfFormFieldBaseModel} obj - It describes about the object
     * @param {HTMLElement} inputElement - It describes about the input element
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {void}
     */
    updateDropdownListProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @param {PdfFormFieldBaseModel} obj - It describes about the object
     * @param {HTMLElement} inputElement - It describes about the input element
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {void}
     */
    updateListBoxProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @param {PdfFormFieldBaseModel} obj - It describes about the object
     * @param {HTMLElement} inputElement - It describes about the input element
     * @param {boolean} isPrint - It describes about the isPrint
     * @private
     * @returns {void}
     */
    updateSignatureFieldProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @param {string} elementType - It describes about the elementt type
     * @param {object} attribute - It describes about the attribut
     * @private
     * @returns {HTMLElement} - html element
     */
    createHtmlElement(elementType: string, attribute: Object): HTMLElement;
    private setAttributeHtml;
    private applyStyleAgainstCsp;
    private getFieldBounds;
    /**
     * @private
     * @returns {string} - string
     */
    downloadFormDesigner(): string;
    private getTextToImage;
    /**
     * @param {any} currentData - It describes about the current data
     * @private
     * @returns {any} - any
     */
    private loadedFormFieldValue;
    /**
     * @param {HTMLElement} pageDiv - It describes about the pageDiv
     * @param {number} pageWidth - It describes about the pageWidth
     * @param {number} pageHeight - It describes about the pageHeight
     * @param {number} pageNumber - It describes about the pageNumber
     * @param {string} displayMode - It describes about the displayMode
     * @private
     * @returns {HTMLElement} - html element
     */
    createAnnotationLayer(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode: string): HTMLElement;
    /**
     * @param {number} width - It describes about the width
     * @param {number} height - It describes about the height
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    resizeAnnotations(width: number, height: number, pageNumber: number): void;
    /**
     * @param {Event} event - It describes about the event
     * @private
     * @returns {number} - number
     */
    getEventPageNumber(event: Event): number;
    private getPropertyPanelHeaderContent;
    /**
     * @private
     * @returns {void}
     */
    createPropertiesWindow(): void;
    private onOkClicked;
    /**
     * Update the form fields properties to the collection while rendering the page
     *
     * @param {any} item - It describes about the item
     * @returns {void}
     */
    private updateFormFieldPropertiesInCollections;
    private checkTextboxName;
    renderMultilineText(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    renderTextbox(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    private addMultilineTextbox;
    private reRenderMultilineTextbox;
    private createTextAreaElement;
    private createTextboxElement;
    /**
     * @param {PdfFormFieldBaseModel} formFieldObject - It describes about the form field object
     * @private
     * @returns {void}
     */
    updateFormFieldCollections(formFieldObject: PdfFormFieldBaseModel): void;
    /**
     * Get the Hex value from the RGB value.
     *
     * @param {string} color - It describes about the color
     * @returns {void}
     */
    private getRgbToHex;
    /**
     * @param {PdfFormFieldBaseModel} selectedItem - It describes about the selected item
     * @param {boolean} isUndoRedo - It describes about the isUndoRedo
     * @private
     * @returns {void}
     */
    updateDropdownFormDesignerProperties(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    /**
     * @param {PdfFormFieldBaseModel} selectedItem - It describes about the selected item
     * @param {boolean} isUndoRedo - It describes about the isUndoRedo
     * @private
     * @returns {void}
     */
    updateListBoxFormDesignerProperties(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    private updateDropDownListDataSource;
    private createDropdownDataSource;
    /**
     * @param {PdfFormFieldBaseModel} selectedItem - It describes about the selected Item
     * @param {boolean} isUndoRedo - It describes about the isUndoRedo
     * @private
     * @returns {void}
     */
    updateSignatureTextboxProperties(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    /**
     * @param {PdfFormFieldBaseModel} selectedItem - It describes about the selected item
     * @param {boolean} updateValue - It describes about the update value
     * @param {boolean} isUndoRedo - isUndoRedo
     * @private
     * @returns {void}
     */
    updateCheckboxFormDesignerProperties(selectedItem: PdfFormFieldBaseModel, updateValue?: boolean, isUndoRedo?: boolean): void;
    /**
     * @param {PdfFormFieldBaseModel} selectedItem - It describes about the selected item
     * @param {boolean} updateValue - It describes about the update value
     * @param {boolean} isUndoRedo - It describes about the isUndoRedo
     * @private
     * @returns {void}
     */
    updateRadioButtonDesignerProperties(selectedItem: PdfFormFieldBaseModel, updateValue?: boolean, isUndoRedo?: boolean): void;
    /**
     * @param {PdfFormFieldBaseModel} selectedItem - It describes about the selected item
     * @param {boolean} isUndoRedo - It describes about the isUndoRedo
     * @private
     * @returns {void}
     */
    updateTextboxFormDesignerProperties(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    /**
     * @param {any} selectedItem - It describes about the selected item
     * @param {any} element - It describes about the element
     * @param {boolean} isUndoRedo - It describes about the isUndoRedo
     * @param {number} index - It describes about the index
     * @param {any} formFieldsData - It describes about the form fields data
     * @private
     * @returns {void}
     */
    updateIsCheckedPropertyChange(selectedItem: any, element: any, isUndoRedo: boolean, index: number, formFieldsData: any): void;
    /**
     * @param {any} selectedItem - It describes about the selected item
     * @param {any} element - It describes about the element
     * @param {boolean} isUndoRedo - It describes about the isUndoRedo
     * @param {number} index - It describes about the index
     * @param {any} formFieldsData - It describes about the form fields data
     * @private
     * @returns {void}
     */
    updateIsSelectedPropertyChange(selectedItem: any, element: any, isUndoRedo: boolean, index: number, formFieldsData: any): void;
    /**
     * @param {any} selectedItem - It describes about the selected item
     * @param {any} element - It describes about the element
     * @param {boolean} isUndoRedo - It describes about the isUndoRedo
     * @param {number} index - It describes about the index
     * @param {any} formFieldsData - It describes about the form fields data
     * @param {boolean} updateValue - It describes about the update value
     * @private
     * @returns {void}
     */
    updateValuePropertyChange(selectedItem: any, element: any, isUndoRedo: boolean, index: number, formFieldsData: any, updateValue?: boolean): void;
    private updateFontStylePropertyChange;
    private updateBorderThicknessPropertyChange;
    private updateBorderColorPropertyChange;
    private updateBackgroundColorPropertyChange;
    private updateColorPropertyChange;
    private updateAlignmentPropertyChange;
    private updateFontSizePropertyChange;
    private updateFontFamilyPropertyChange;
    private updateVisibilityPropertyChange;
    private hideSignatureValue;
    private showSignatureValue;
    private updateTooltipPropertyChange;
    private updateNamePropertyChange;
    private setReadOnlyProperty;
    private updateIsReadOnlyPropertyChange;
    private updateIsRequiredPropertyChange;
    private updateIsPrintPropertyChange;
    /**
     * @param {number} id - It describes about the id
     * @private
     * @returns {number} - number
     */
    getFormFiledIndex(id: any): number;
    private updateFontStyle;
    private setFontStyleValues;
    private setDropdownFontStyleValue;
    /**
     * @param {string} name - It describes about the name
     * @param {PdfFormFieldBaseModel} selectedItem - It describes about the selected item
     * @param {boolean} isValueChanged - It describes about the isValueChanged
     * @param {boolean} isFontFamilyChanged - It describes about the isFontFamilyChanged
     * @param {boolean} isFontSizeChanged - It describes about the isFontSizeChanged
     * @param {boolean} isFontStyleChanged - It describes about the isFontStyleChanged
     * @param {boolean} isColorChanged - It describes about the isColorChanged
     * @param {boolean} isBackgroundColorChanged - It describes about the isBackgroundColorChanged
     * @param {boolean} isBorderColorChanged - It describes about the isBorderColorChanged
     * @param {boolean} isBorderWidthChanged - It describes about the isBorderWidthChanged
     * @param {boolean} isAlignmentChanged - It describes about the isAlignmentChanged
     * @param {boolean} isReadOnlyChanged - It describes about the isReadOnlyChanged
     * @param {boolean} isVisibilityChanged - It describes about the isVisibilityChanged
     * @param {boolean} isMaxLengthChanged - It describes about the isMaxLengthChanged
     * @param {boolean} isRequiredChanged - It describes about the isRequiredChanged
     * @param {boolean} isPrintChanged - It describes about the isPrintChanged
     * @param {boolean} isToolTipChanged - It describes about the isToolTipChanged
     * @param {boolean} isCustomDataChanged - It describes about the isCustomDataChanged
     * @param {any} oldValue - It describes about the old value
     * @param {any} newValue - It describes about the new value
     * @param {boolean} isNamechanged - It describes about the isNameChanged
     * @param {string} previousName - It describes about the previous name
     * @private
     * @returns {void}
     */
    updateFormFieldPropertiesChanges(name: string, selectedItem: PdfFormFieldBaseModel, isValueChanged: boolean, isFontFamilyChanged: boolean, isFontSizeChanged: boolean, isFontStyleChanged: boolean, isColorChanged: boolean, isBackgroundColorChanged: boolean, isBorderColorChanged: boolean, isBorderWidthChanged: boolean, isAlignmentChanged: boolean, isReadOnlyChanged: boolean, isVisibilityChanged: boolean, isMaxLengthChanged: boolean, isRequiredChanged: boolean, isPrintChanged: boolean, isToolTipChanged: boolean, isCustomDataChanged: boolean, oldValue: any, newValue: any, isNamechanged?: boolean, previousName?: string): void;
    private onCancelClicked;
    private select;
    private createAppearanceTab;
    private createGeneralProperties;
    private checkBoxChange;
    private multilineCheckboxChange;
    private setToolTip;
    private tooltipBeforeOpen;
    private createAppearanceProperties;
    private thicknessChange;
    private thicknessDropDownBeforeOpen;
    private updateThicknessIndicator;
    private createOptionProperties;
    private addListItemOnClick;
    private listItemOnClick;
    private deleteListItem;
    private moveUpListItem;
    private moveDownListItem;
    private createListElement;
    private createThicknessSlider;
    private createColorPicker;
    private fontStyleClicked;
    private clearFontAlignIconSelection;
    private fontAlignClicked;
    private onFontColorChange;
    private onColorPickerChange;
    /**
     * @param {HTMLElement} element - It describes about the element
     * @param {string} color - It describes about the color
     * @private
     * @returns {void}
     */
    updateColorInIcon(element: HTMLElement, color: string): void;
    private onStrokePickerChange;
    private createDropDownButton;
    /**
     * @param {string} idString - It describes about the id string
     * @param {string} className - It describes about the class name
     * @param {boolean} isSelectedStyle - It describes about the isSelectedStyle
     * @private
     * @returns {HTMLElement} - html element
     */
    addClassFontItem(idString: string, className: string, isSelectedStyle?: boolean): HTMLElement;
    private createLabelElement;
    private setReadOnlyToFormField;
    /**
     * @param {any} signatureFieldCollection - It describes about the signature field collection
     * @private
     * @returns {any} - any
     */
    getFormDesignerSignField(signatureFieldCollection: any): any[];
    private setRequiredToFormField;
    private isTransparentBackground;
    private setReadOnlyToElement;
    private setRequiredToElement;
    /**
     * @private
     * @returns {void}
     */
    destroyPropertiesWindow(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private hex;
    /**
     * @private
     * @returns {string} - string
     */
    getModuleName(): string;
    private updateAnnotationCanvas;
    private getFontFamily;
    private updateTextFieldSettingProperties;
    private updatePasswordFieldSettingProperties;
    private updateCheckBoxFieldSettingsProperties;
    private updateRadioButtonFieldSettingProperties;
    private updateDropdownFieldSettingsProperties;
    private updatelistBoxFieldSettingsProperties;
    private updateSignInitialFieldProperties;
    /**
     * @param {any} newSignatureFieldSettings - It describes about the new signature field settings
     * @param {boolean} isInitialField - It describes about the isInitialField
     * @private
     * @returns {void}
     */
    updateSignatureSettings(newSignatureFieldSettings: any, isInitialField: boolean): void;
    /**
     * @param {any} textFieldSettings - It describes about the text field settings
     * @private
     * @returns {void}
     */
    updateTextFieldSettings(textFieldSettings: any): void;
    /**
     * @param {any} passwordFieldSettings - It describes about the password field settings
     * @private
     * @returns {void}
     */
    updatePasswordFieldSettings(passwordFieldSettings: any): void;
    /**
     * @param {any} checkBoxFieldSettings - It describes about the checkbox field settings
     * @private
     * @returns {void}
     */
    updateCheckBoxFieldSettings(checkBoxFieldSettings: any): void;
    /**
     * @param {any} radioButtonFieldSettings - It describes about the radio button field settings
     * @private
     * @returns {void}
     */
    updateRadioButtonFieldSettings(radioButtonFieldSettings: any): void;
    /**
     * @param {any} dropdownFieldSettings - It describes about the dropdown field settings
     * @private
     * @returns {void}
     */
    updateDropDownFieldSettings(dropdownFieldSettings: any): void;
    /**
     * @param {any} listBoxFieldSettings - It describes about the listBoxField settings
     * @private
     * @returns {void}
     */
    updateListBoxFieldSettings(listBoxFieldSettings: any): void;
    private getFontStyleName;
    private getAlignment;
    private getFontStyle;
}
/**
 * Defines the common properties of Radiobutton Item
 *
 * @hidden
 */
export interface IRadiobuttonItem {
    id: string;
    lineBound: IFormFieldBound;
    pageNumber: number;
    formFieldAnnotationType: string;
    name: string;
    value: string;
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    fontColor: any;
    backgroundColor: any;
    textAlign: string;
    isReadonly: boolean;
    visibility: string;
    maxLength: number;
    isRequired: boolean;
    isPrint: boolean;
    rotation: number;
    tooltip: string;
    isChecked: boolean;
    isSelected: boolean;
    zoomValue: number;
    borderColor?: any;
    thickness?: number;
    isMultiline?: boolean;
    isTransparent?: boolean;
    zIndex?: number;
    insertSpaces?: boolean;
    customData?: object;
}
/**
 * Defines the common properties of Form Fields Item
 *
 * @hidden
 */
export interface IFormField {
    id?: string;
    lineBound?: IFormFieldBound;
    pageNumber?: number;
    zoomValue?: number;
    formFieldAnnotationType?: string;
    name?: string;
    value?: string;
    option?: ItemModel[];
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontColor?: any;
    color?: any;
    backgroundColor: any;
    textAlign?: string;
    alignment?: string;
    isReadonly?: boolean;
    visibility?: string;
    maxLength?: number;
    isRequired?: boolean;
    isMultiline?: boolean;
    isPrint?: boolean;
    rotation?: number;
    tooltip?: string;
    isChecked?: boolean;
    isSelected?: boolean;
    radiobuttonItem?: IRadiobuttonItem[];
    selectedIndex?: number[];
    options?: ItemModel[];
    borderColor?: any;
    thickness?: number;
    font?: PdfFontModel;
    signatureBound?: any;
    signatureType?: string;
    type?: string;
    currentName?: string;
    previousName?: string;
    insertSpaces?: boolean;
    isTransparent?: boolean;
    zIndex?: number;
    customData?: object;
}
/**
 * Defines the FormFields Bound properties
 *
 * @hidden
 */
export interface IFormFieldBound {
    X: number;
    Y: number;
    Width: number;
    Height: number;
}
/**
 * Defines the FormFields element attributes
 *
 * @hidden
 */
export interface IElement extends HTMLElement {
    options: any;
    name: string;
    value: string;
    checked: boolean;
    selectedIndex: number;
    selectedOptions: any;
    autocomplete: string;
    type: string;
}
