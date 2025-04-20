import { FieldElementBox } from '../viewer/page';
import { DocumentEditor } from '../../document-editor';
/**
 * @private
 */
export declare class FormFieldPopUp {
    private target;
    private textBoxContainer;
    private textBoxInput;
    private numberInput;
    private dateInput;
    private dropDownInput;
    private numbericInput;
    private popupObject;
    private owner;
    private formField;
    private textBoxInstance;
    private numericTextBoxInstance;
    private datePickerInstance;
    private ddlInstance;
    private dataPickerOkButton;
    private popupElement;
    private textBoxDiv;
    private textBoxButtonDiv;
    private textBoxOkButton;
    private textBoxCancelButton;
    private numericDiv;
    private textBoxButtonNumericDiv;
    private textBoxOkButtonNumeric;
    private textBoxCancelButtonNumeric;
    private dateDiv;
    private textBoxButtonDateDiv;
    private textBoxOkButtonDate;
    private textBoxCancelButtonDate;
    private dropDownDiv;
    private textBoxButtonDropDownDiv;
    private textBoxOkButtonDropDown;
    private textBoxCancelButtonDropDown;
    private applyTextFormFieldValueClickHandler;
    private applyDropDownFormFieldValueClickHandler;
    private closeButtonClickHandler;
    private applyDateFormFieldValueClickHandler;
    private applyNumberFormFieldValueClickHandler;
    /**
     * @param {DocumentEditor} owner - Specifies the document editor.
     * @private
     */
    constructor(owner: DocumentEditor);
    private initPopup;
    private initTextBoxInput;
    private initNumericTextBox;
    private initDatePicker;
    private initDropDownList;
    private onApplyTextFormFieldValueClick;
    /**
     * @returns {void}
     */
    private applyTextFormFieldValue;
    private onApplyNumberFormFieldValueClick;
    /**
     * @returns {void}
     */
    private applyNumberFormFieldValue;
    private onApplyDateFormFieldValueClick;
    /**
     * @returns {void}
     */
    private applyDateFormFieldValue;
    private onApplyDropDownFormFieldValueClick;
    /**
     * @returns {void}
     */
    private applyDropDownFormFieldValue;
    /**
     * @param {ChangedEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    private enableDisableDatePickerOkButton;
    /**
     * @private
     * @param {FieldElementBox} formField - Specifies the field element.
     * @returns {void}
     */
    showPopUp(formField: FieldElementBox): void;
    private onCloseButtonClick;
    /**
     * @private
     * @returns {void}
     */
    private closeButton;
    /**
     * @private
     * @returns {void}
     */
    hidePopup: () => void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private removeEvents;
    private removeElements;
}
