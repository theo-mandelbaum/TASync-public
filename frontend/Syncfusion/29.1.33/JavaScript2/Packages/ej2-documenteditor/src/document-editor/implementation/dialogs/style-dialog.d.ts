import { L10n } from '@syncfusion/ej2-base';
import { SelectEventArgs, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { StyleType } from '../../base/index';
import { WCharacterFormat, WParagraphFormat } from '../index';
import { DocumentHelper } from '../viewer';
/**
 * The Style dialog is used to create or modify styles.
 */
export declare class StyleDialog {
    documentHelper: DocumentHelper;
    private target;
    private styleType;
    private styleBasedOn;
    private styleParagraph;
    private onlyThisDocument;
    private template;
    private isEdit;
    private editStyleName;
    private style;
    private abstractList;
    private numberingBulletDialog;
    private okButton;
    private styleNameElement;
    private isUserNextParaUpdated;
    private fontFamily;
    private fontSize;
    private characterFormat;
    private paragraphFormat;
    private textAlignment;
    private lineSpacing;
    private leftIndent;
    private beforeSpacing;
    private afterSpacing;
    private localObj;
    private bold;
    private italic;
    private underline;
    private fontColor;
    private leftAlign;
    private rightAlign;
    private centerAlign;
    private justify;
    private singleLineSpacing;
    private doubleLineSpacing;
    private onePointFiveLineSpacing;
    private styleDropdwn;
    private container;
    private properties;
    private styleNameTypeDiv;
    private nameWholeDiv;
    private nameValue;
    private styleTypeWholeDiv;
    private styleTypeDivElement;
    private styleTypeValue;
    private styleBasedParaDiv;
    private styleBasedOnWholeDiv;
    private styleBasedOnDivElement;
    private styleBasedOnValue;
    private styleParagraphWholeDiv;
    private styleParagraphDivElement;
    private styleParagraphValue;
    private formatting;
    private optionsDiv;
    private fontOptionsDiv;
    private paragraphOptionsDiv;
    private formatBtn;
    private fontFamilyElement;
    private fontSizeElement;
    private fontGroupButton;
    private fontColorElement;
    private alignmentDiv;
    private lineSpacingDiv;
    private spacingDiv;
    private beforeSpacingEle;
    private afterSpacingEle;
    private indentingDiv;
    private decreaseIndent;
    private increaseindent;
    private setLeftAlignmentClickHandler;
    private setCenterAlignmentClickHandler;
    private setRightAlignmentClickHandler;
    private setJustifyAlignmentClickHandler;
    private setSingleLineSpacingClickHandler;
    private setOnePointFiveLineSpacingClickHandler;
    private setDoubleLineSpacingClickHandler;
    private increaseIndentValueHandler;
    private decreaseIndentValueHandler;
    private increaseBeforeAfterSpacingValueHandler;
    private decreaseBeforeAfterSpacingValueHandler;
    private setUnderlinePropertyHandler;
    private setItalicPropertyHandler;
    private setBoldPropertyHandler;
    private openDialogHandler;
    private updateOkButtonClickHandler;
    private updateNextStyleHandler;
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    constructor(documentHelper: DocumentHelper);
    /**
     * @private
     * @returns {string} Returns module name
     */
    getModuleName(): string;
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    initStyleDialog(localValue: L10n, isRtl?: boolean): void;
    private createFormatDropdown;
    private onOpenDialog;
    /**
     *
     * @param {DropDownButtonMenuEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    private openDialog;
    private createFontOptions;
    private onSetBoldProperty;
    /**
     * @private
     * @returns {void}
     */
    private setBoldProperty;
    private onSetItalicProperty;
    /**
     * @private
     * @returns {void}
     */
    private setItalicProperty;
    private onSetUnderlineProperty;
    /**
     * @private
     * @returns {void}
     */
    private setUnderlineProperty;
    /**
     * @private
     * @returns {void}
     */
    private fontButtonClicked;
    /**
     * @private
     * @param {ChangeEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    private fontSizeUpdate;
    /**
     * @private
     * @param {ChangeEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    private fontFamilyChanged;
    /**
     * @private
     * @param {ColorPickerEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    private fontColorUpdate;
    private createParagraphOptions;
    private setSingleLineSpacing;
    private setOnePointFiveLineSpacing;
    private setDoubleLineSpacing;
    private increaseIndentValue;
    private decreaseIndentValue;
    private onSetLeftAlignmentClick;
    /**
     * @private
     * @returns {void}
     */
    private setLeftAlignment;
    private onSetRightAlignmentClick;
    /**
     * @private
     * @returns {void}
     */
    private setRightAlignment;
    private onSetCenterAlignmentClick;
    /**
     * @private
     * @returns {void}
     */
    private setCenterAlignment;
    private onSetJustifyAlignmentClick;
    /**
     * @private
     * @returns {void}
     */
    private setJustifyAlignment;
    private createButtonElement;
    private onIncreaseBeforeAfterSpacing;
    /**
     * @private
     * @returns {void}
     */
    private increaseBeforeAfterSpacing;
    private onDecreaseBeforeAfterSpacing;
    /**
     * @private
     * @returns {void}
     */
    private decreaseBeforeAfterSpacing;
    private toggleDisable;
    private onUpdateNextStyle;
    /**
     * @private
     * @returns {void}
     */
    updateNextStyle: (args: FocusEvent) => void;
    private onUpdateOkButtonClick;
    /**
     * @private
     * @returns {void}
     */
    updateOkButton: () => void;
    /**
     * @private
     * @param {ChangeEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    styleTypeChange: (args: ChangeEventArgs) => void;
    /**
     * @returns {void}
     */
    private styleBasedOnChange;
    /**
     * @private
     * @param {SelectEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    styleParagraphChange: (args: SelectEventArgs) => void;
    /**
     * @private
     * @returns {void}
     */
    showFontDialog: () => void;
    /**
     * @private
     * @returns {void}
     */
    showParagraphDialog: () => void;
    /**
     * @private
     * @returns {void}
     */
    showNumberingBulletDialog: () => void;
    /**
     * @private
     * @param {string} styleName - Specifies the style name.
     * @param {string} header - Specifies the header.
     * @returns {void}
     */
    show(styleName?: string, header?: string): void;
    /**
     * @private
     * @returns {void}
     */
    onOkButtonClick: () => void;
    private updateList;
    private createLinkStyle;
    /**
     * @private
     * @returns {void}
     */
    private loadStyleDialog;
    /**
     * @private
     * @param {L10n} characterFormat - Specifies the character format
     * @returns {void}
     */
    updateCharacterFormat(characterFormat?: WCharacterFormat): void;
    private applyParagraphFormat;
    /**
     * @private
     * @returns {void}
     */
    updateParagraphFormat(paragraphFOrmat?: WParagraphFormat): void;
    private enableOrDisableOkButton;
    /**
     * @private
     */
    getTypeValue(type?: string): StyleType;
    private updateStyleNames;
    private getStyle;
    /**
     * @private
     * @returns {void}
     */
    onCancelButtonClick: () => void;
    /**
     * @private
     * @returns {void}
     */
    closeStyleDialog: () => void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private removeEvents;
    private removeElements;
}
