import { L10n } from '@syncfusion/ej2-base';
import { DocumentEditorContainer } from '../document-editor-container';
/**
 * Paragraph Properties
 *
 * @private
 */
export declare class Paragraph {
    private container;
    private showHiddenMarksBtn;
    private leftAlignmentBtn;
    private rightAlignmentBtn;
    private centerAlignmentBtn;
    private justifyBtn;
    private increaseIndentBtn;
    private decreaseIndentBtn;
    private lineSpacing;
    private style;
    private bulletListBtn;
    private numberedListBtn;
    private bordersBtn;
    private textProperties;
    private leftAlignment;
    private rightAlignment;
    private centerAlignment;
    private justify;
    private increaseIndent;
    private decreaseIndent;
    private showHiddenMarks;
    private noneNumberTag;
    private numberList;
    private lowLetter;
    private upLetter;
    private lowRoman;
    private upRoman;
    private noneBulletTag;
    private dotBullet;
    private circleBullet;
    private squareBullet;
    private flowerBullet;
    private arrowBullet;
    private tickBullet;
    private borders;
    private paragraphDiv;
    private label;
    private styleDiv;
    private styleSelect;
    private indentWholeDiv;
    private indentDiv;
    private incDecIndentDiv;
    private listDiv;
    private paraDiv;
    private lineHeight;
    private listDropDown;
    private bulletButton;
    private numberingList;
    private numberListDropDiv;
    private numberListDropUlTag;
    private numberedAndBulletNoneClickHandler;
    private numberedNumberDotClickHandler;
    private numberedLowLetterClickHandler;
    private numberedUpLetterClickHandler;
    private numberedLowRomanClickHandler;
    private numberedUpRomanClickHandler;
    private numberSplitButtonBeforeOpenHandler;
    private bulletDotClickHandler;
    private bulletCircleClickHandler;
    private bulletSquareClickHandler;
    private bulletFlowerClickHandler;
    private bulletArrowClickHandler;
    private bulletTickClickHandler;
    private onrightAlignmentClickHandler;
    private isRetrieving;
    private styleName;
    appliedBulletStyle: string;
    appliedNumberingStyle: string;
    appliedLineSpacing: string;
    localObj: L10n;
    private isRtl;
    private splitButtonClass;
    private readonly documentEditor;
    constructor(container: DocumentEditorContainer);
    initializeParagraphPropertiesDiv(wholeDiv: HTMLElement, isRtl?: boolean): void;
    private createSeparator;
    private createDivElement;
    private createButtonTemplate;
    private createLineSpacingDropdown;
    private createNumberListDropButton;
    private numberSplitButtonBeforeClose;
    private numberSplitButtonBeforeOpen;
    private updateSelectedBulletListType;
    private updateSelectedNumberedListType;
    private removeSelectedList;
    /**
     * @private
     * @returns {void}
     */
    applyLastAppliedNumbering(): void;
    private applyLastAppliedBullet;
    private createBulletListDropButton;
    private createNumberListTag;
    private createNumberNoneListTag;
    private createBulletListTag;
    private createStyleDropDownList;
    private updateOptions;
    updateStyleNames(): void;
    private createStyle;
    private constructStyleDropItems;
    private parseStyle;
    private onrightAlignmentClick;
    wireEvent(): void;
    unwireEvents(): void;
    /**
     * @private
     */
    toggleHiddenMarks(): void;
    private leftAlignmentAction;
    private lineSpacingAction;
    private setLineSpacing;
    private selectStyleValue;
    private applyStyleValue;
    private rightAlignmentAction;
    private centerAlignmentAction;
    private justifyAction;
    private increaseIndentAction;
    private decreaseIndentAction;
    private numberedNoneClick;
    private numberedNumberDotClick;
    private numberedUpRomanClick;
    private numberedUpLetterClick;
    private numberedLowLetterClick;
    private numberedLowRomanClick;
    private getLevelFormatNumber;
    private bulletDotClick;
    private bulletCircleClick;
    private bulletSquareClick;
    private bulletFlowerClick;
    private bulletArrowClick;
    private bulletTickClick;
    onSelectionChange(): void;
    private removeHTMLElements;
    destroy(): void;
}
