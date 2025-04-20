import { ContentControl } from '../viewer/page';
import { DocumentEditor } from '../../document-editor';
/**
 * @private
 */
export declare class ContentControlPopUp {
    private target;
    private dropDownInput;
    private popupObject;
    private owner;
    private contenControl;
    private ddlInstance;
    private dataPickerOkButton;
    private popupElement;
    private dropDownDiv;
    private textBoxButtonDiv;
    private textBoxOkButton;
    private textBoxCancelButton;
    private applyDropDownFormFieldValueHandler;
    private closeButtonClickedHandler;
    /**
     * @param {DocumentEditor} owner - Specifies the document editor.
     * @private
     */
    constructor(owner: DocumentEditor);
    private initPopup;
    private initDropDownList;
    private onapplyDropDownFormFieldValue;
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
    showPopUp(formField: ContentControl): void;
    private onCloseButtonClicked;
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
