import { L10n } from '@syncfusion/ej2-base';
import { WParagraphFormat } from '../index';
import { DocumentHelper } from '../viewer';
/**
 * The Paragraph dialog is used to modify formatting of selected paragraphs.
 */
export declare class ParagraphDialog {
    /**
     * @private
     */
    documentHelper: DocumentHelper;
    private target;
    private alignment;
    private outlineLevel;
    private lineSpacing;
    private special;
    private leftIndentIn;
    private rightIndentIn;
    private byIn;
    private beforeSpacingIn;
    private afterSpacingIn;
    private atIn;
    private rtlButton;
    private ltrButton;
    private contextSpacing;
    private keepWithNext;
    private keepLinesTogether;
    private widowControlIn;
    private leftIndent;
    private rightIndent;
    private beforeSpacing;
    private afterSpacing;
    private spaceBeforeAuto;
    private spaceAfterAuto;
    private textAlignment;
    private paraOutlineLevel;
    private firstLineIndent;
    private lineSpacingIn;
    private lineSpacingType;
    private paragraphFormat;
    private bidi;
    private contextualSpacing;
    isStyleDialog: boolean;
    private directionDiv;
    keepWithNextValue: boolean;
    keepLineTogetherValue: boolean;
    widowControlValue: boolean;
    private tabObj;
    private paginationDiv;
    private ejtab;
    private div;
    private generalDiv;
    private genLabel;
    private alignmentWholeDiv;
    private alignmentDiv;
    private dirLabel;
    private rtlDiv;
    private rtlInputELe;
    private ltrDiv;
    private ltrInputELe;
    private indentionWholeDiv;
    private indentLabel;
    private indentionSubDiv1;
    private indentionSubDiv2;
    private beforeTextDiv;
    private afterTextDiv;
    private specialDiv;
    private byDiv;
    private by;
    private spacingDiv;
    private leftSpacingDiv;
    private contextSpacingDiv;
    private rightSpacingDiv;
    private contextInputEle;
    private spaceLabel;
    private spacingWholeDiv;
    private beforeSpacingWholeDiv;
    private afterSpacingWholeDiv;
    private lineSpacingDiv;
    private lineTypeDiv;
    private lineSpacingAt;
    private lineBreakContainer;
    private paginationLabel;
    private widowContorlContainer;
    private keepNextContainer;
    private keepLines;
    private widowControl;
    private keepWithNext1;
    private keepLinesTogether1;
    private instance;
    private beforeSpacingSpinDown;
    private afterSpacingSpinDown;
    private indentContainer;
    private clickBeforeSpacingClickHandler;
    private clickAfterSpacingClickHandler;
    private keyUpParagraphSettingsClickHandler;
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    constructor(documentHelper: DocumentHelper);
    private readonly owner;
    /**
     * @private
     * @returns {string} Returns module name
     */
    getModuleName(): string;
    /**
     * @private
     * @param {L10n} locale - Specifies the locale.
     * @returns {void}
     */
    initParagraphDialog(locale: L10n): void;
    private onKeyUpParagraphSettingsClick;
    /**
     * @private
     * @param {KeyboardEvent} event - Specifies the event args.
     * @returns {void}
     */
    keyUpParagraphSettings: (event: KeyboardEvent) => void;
    /**
     * @private
     * @param {KeyboardEvent} event - Specifies the event args.
     * @returns {void}
     */
    private changeBeforeSpacing;
    /**
     * @private
     * @param {NumericFocusEventArgs} event - Specifies the event args.
     * @returns {void}
     */
    private focusBeforeSpacing;
    /**
     * @private
     * @param {NumericFocusEventArgs} event - Specifies the event args.
     * @returns {void}
     */
    private blurBeforeSpacing;
    private onClickBeforeSpacingClick;
    /**
    * @private
    * @param {ClickEventArgs} event - Specifies the event args.
    * @returns {void}
    */
    private clickBeforeSpacing;
    /**
     * @private
     * @param {NumericChangeArgs} event - Specifies the event args.
     * @returns {void}
     */
    private changeAfterSpacing;
    /**
     * @private
     * @param {NumericFocusEventArgs} event - Specifies the event args.
     * @returns {void}
     */
    private focusAfterSpacing;
    /**
     * @private
     * @param {NumericFocusEventArgs} event - Specifies the event args.
     * @returns {void}
     */
    private blurAfterSpacing;
    private onClickAfterSpacingClick;
    /**
    * @private
    * @param {ClickEventArgs} event - Specifies the event args.
    * @returns {void}
    */
    private clickAfterSpacing;
    /**
     * @private
     * @param {NumericChangeArgs} event - Specifies the event args.
     * @returns {void}
     */
    private changeLeftIndent;
    /**
     * @private
     * @param {NumericChangeArgs} event - Specifies the event args.
     * @returns {void}
     */
    private changeRightIndent;
    /**
     * @private
     * @param {NumericChangeArgs} event - Specifies the event args.
     * @returns {void}
     */
    private changeLineSpacingValue;
    /**
     * @private
     * @param {NumericChangeArgs} event - Specifies the event args.
     * @returns {void}
     */
    private changeFirstLineIndent;
    /**
     * @private
     * @param {DropDownChangeArgs} event - Specifies the event args.
     * @returns {void}
     */
    private changeByTextAlignment;
    /**
     * @private
     * @param {DropDownChangeArgs} event - Specifies the event args.
     * @returns {void}
     */
    private changeByOutlineLevel;
    /**
     * @private
     * @param {ChangeArgs} event - Specifies change event args.
     * @returns {void}
     */
    private changeBidirectional;
    /**
     * @private
     * @param {ChangeEventArgs} args - Specifies change event args.
     * @returns {void}
     */
    private changeContextualSpacing;
    /**
     * @private
     * @param {ChangeEventArgs} args - Specifies change event args.
     * @returns {void}
     */
    private changeKeepWithNext;
    /**
     * @private
     * @param {ChangeEventArgs} args - Specifies change event args.
     * @returns {void}
     */
    private changeKeepLinesTogether;
    /**
     * @private
     * @param {ChangeEventArgs} args - Specifies change event args.
     * @returns {void}
     */
    private changeWidowControl;
    private changeAlignmentByBidi;
    /**
     * @private
     * @returns {void}
     */
    changeByValue: () => void;
    /**
     * @private
     * @returns {void}
     */
    changeBySpacing: () => void;
    /**
     * @private
     * @returns {void}
     */
    loadParagraphDialog: () => void;
    private getAlignmentValue;
    private isHeadingStyle;
    private getOutlineValue;
    /**
     * @private
     * @returns {void}
     */
    applyParagraphFormat: () => void;
    /**
     * @private
     * @returns {void}
     */
    openTabDialog: () => void;
    /**
     * Applies Paragraph Format
     *
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    onParagraphFormat(paragraphFormat: WParagraphFormat): void;
    /**
     * @private
     * @returns {void}
     */
    closeParagraphDialog: () => void;
    /**
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    show(paragraphFormat?: WParagraphFormat): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private removeEvents;
    private removeElements;
}
