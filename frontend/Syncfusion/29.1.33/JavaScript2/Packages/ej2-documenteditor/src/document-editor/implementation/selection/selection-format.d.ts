import { Selection } from './selection';
import { TextAlignment, Underline, HighlightColor, BaselineAlignment, WidthType, Strikethrough, LineSpacingType, CellVerticalAlignment, HeightType, TableAlignment, FootEndNoteNumberFormat, FootnoteRestartIndex, OutlineLevel } from '../../base/types';
import { WSectionFormat, WCharacterFormat, WParagraphFormat, WTableFormat, WRowFormat, WCellFormat, WColumnFormat } from '../format/index';
import { DocumentHelper } from '../index';
import { TableWidget, ImageElementBox } from '../viewer/page';
import { WList } from '../list/list';
import { LineStyle } from '../../base/types';
import { WBorder, WBorders } from '../../implementation/format';
/**
 * Selection character format implementation
 */
export declare class SelectionCharacterFormat {
    /**
     * @private
     */
    selection: Selection;
    private boldIn;
    private italicIn;
    private underlineIn;
    private strikeThroughIn;
    private baselineAlignmentIn;
    private highlightColorIn;
    private fontSizeIn;
    private fontFamilyIn;
    private scriptType;
    private renderedFontFamilyIn;
    private fontColorIn;
    private allCapsIn;
    /**
     * @private
     */
    boldBidi: boolean;
    /**
     * @private
     */
    italicBidi: boolean;
    /**
     * @private
     */
    complexScript: boolean;
    /**
     * @private
     */
    fontSizeBidi: number;
    /**
     * @private
     */
    fontFamilyBidi: string;
    /**
     * @private
     */
    bidi: boolean;
    /**
     * @private
     */
    private bdo;
    /**
     * @private
     */
    styleName: string;
    /**
     * Gets the font size of selected contents.
     *
     * @aspType int
     */
    /**
    * Sets the font size of selected contents.
    *
    * @aspType int
    */
    fontSize: number;
    readonly renderedFontFamily: string;
    /**
     * Gets or sets the font family of selected contents.
     *
     * @aspType string
     */
    /**
    * Sets the font family of selected contents.
    *
    * @aspType string
    */
    fontFamily: string;
    /**
     * Gets or sets the font color of selected contents.
     *
     * @aspType string
     */
    /**
    * Sets the font color of selected contents.
    *
    * @aspType string
    */
    fontColor: string;
    /**
     * Gets or sets the bold formatting of selected contents.
     *
     * @aspType bool
     */
    /**
    * Sets the bold formatting of selected contents.
    *
    * @aspType bool
    */
    bold: boolean;
    /**
     * Gets or sets the italic formatting of selected contents.
     *
     * @aspType bool
     */
    /**
    * Sets the italic formatting of selected contents.
    *
    * @aspType bool
    */
    italic: boolean;
    /**
     * Gets or sets the strikethrough property of selected contents.
     */
    /**
    * Sets the strikethrough property of selected contents.
    */
    strikethrough: Strikethrough;
    /**
     * Gets or sets the baseline alignment property of selected contents.
     */
    /**
    * Sets the baseline alignment property of selected contents.
    */
    baselineAlignment: BaselineAlignment;
    /**
     * Gets or sets the underline style of selected contents.
     */
    /**
    * Sets the underline style of selected contents.
    */
    underline: Underline;
    /**
     * Gets or sets the highlight color of selected contents.
     */
    /**
    * Sets the highlight color of selected contents.
    */
    highlightColor: HighlightColor;
    /**
     * Gets or sets the allCaps formatting of selected contents.
     *
     * @aspType bool
     */
    /**
    * Sets the allCaps formatting of selected contents.
    *
    * @aspType bool
    */
    allCaps: boolean;
    /**
     * @param selection
     * @private
     */
    constructor(selection: Selection);
    private getPropertyValue;
    /**
     * Notifies whenever property gets changed.
     *
     * @param {string} propertyName
     */
    private notifyPropertyChanged;
    /**
     * Copies the source format.
     *
     * @param {WCharacterFormat} format
     * @returns {void}
     * @private
     */
    copyFormat(format: WCharacterFormat, renderFontFamily?: string): void;
    /**
     * Combines the format.
     *
     * @param {WCharacterFormat} format
     * @private
     */
    combineFormat(format: WCharacterFormat, renderFontFamily?: string): void;
    /**
     * @private
     */
    canRetrieveNextCharacterFormat(): boolean;
    /**
     * Clones the format.
     *
     * @param {SelectionCharacterFormat} selectionCharacterFormat
     * @returns {void}
     * @private
     */
    cloneFormat(selectionCharacterFormat: SelectionCharacterFormat): void;
    /**
     * Checks whether current format is equal to the source format or not.
     *
     * @param {SelectionCharacterFormat} format
     * @returns boolean
     * @private
     */
    isEqualFormat(format: SelectionCharacterFormat): boolean;
    /**
     * Clears the format.
     *
     * @returns {void}
     * @private
     */
    clearFormat(): void;
    /**
     * Destroys the maintained resources.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
/**
 * Selection Border implementation
 */
export declare class SelectionBorder {
    private selection;
    private colorIn;
    private lineStyleIn;
    private lineWidthIn;
    private shadowIn;
    private spaceIn;
    private ownerBase;
    private borderType;
    /**
     * Gets or sets the color for selected paragraph borders.
     *
     * @default undefined
     * @aspType string
     */
    /**
    * Sets the color for selected paragraph borders.
    *
    * @default undefined
    * @aspType string
    */
    color: string;
    /**
     * Gets or sets the lineStyle for selected paragraph borders.
     *
     * @default undefined
     * @aspType LineStyle
     */
    /**
    * Sets the lineStyle for selected paragraph borders.
    *
    * @default undefined
    * @aspType LineStyle
    */
    lineStyle: LineStyle;
    /**
     * Gets or sets the lineWidth for selected paragraph borders.
     *
     * @default undefined
     * @aspType number
     */
    /**
    * Sets the lineWidth for selected paragraphs borders.
    *
    * @default undefined
    * @aspType number
    */
    lineWidth: number;
    /**
     * Gets or sets the shadow for selected paragraph borders.
     *
     * @default undefined
     * @aspType boolean
     */
    /**
    * Sets the shadow for selected paragraphs borders.
    *
    * @default undefined
    * @aspType boolean
    */
    shadow: boolean;
    /**
     * Gets or sets the space for selected paragraphs borders.
     *
     * @default undefined
     * @aspType number
     */
    /**
    * Sets the space for selected paragraphs borders.
    *
    * @default undefined
    * @aspType number
    */
    space: number;
    /**
     * @param SelectionBorders
     * @private
     */
    constructor(selection?: Selection, borderType?: string, node?: SelectionBorders);
    /**
     *Copies the format.
     *
     * @param {WBorder} border
     * @returns {void}
     * @private
     */
    copyFormat(border: WBorder): void;
    /**
     * Combines the format.
     *
     * @param {WBorder} border
     * @returns {void}
     * @private
     */
    combineFormat(border: WBorder): void;
    private getPropertyValue;
    /**
     * Notifies whenever the property gets changed.
     * @param {string} propertyName
     * @returns {void}
     */
    private notifyPropertyChanged;
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
/**
 * Selection Borders implementation
 */
export declare class SelectionBorders {
    private selection;
    private topIn;
    private bottomIn;
    private leftIn;
    private rightIn;
    private horizontalIn;
    private verticalIn;
    private ownerBase;
    /**
     * Gets the top Border for selected paragraphs.
     *
     * @default undefined
     * @aspType SelectionBorder
     */
    readonly top: SelectionBorder;
    /**
     * Gets the bottom Border for selected paragraphs.
     *
     * @default undefined
     * @aspType SelectionBorder
     */
    readonly bottom: SelectionBorder;
    /**
     * Gets the left Border for selected paragraphs.
     *
     * @default undefined
     * @aspType SelectionBorder
     */
    readonly left: SelectionBorder;
    /**
     * Gets the right Border for selected paragraphs.
     *
     * @default undefined
     * @aspType SelectionBorder
     */
    readonly right: SelectionBorder;
    /**
     * Gets the horizontal Border for selected paragraphs.
     *
     * @default undefined
     * @aspType SelectionBorder
     */
    readonly horizontal: SelectionBorder;
    /**
     * Gets the vertical Border for selected paragraphs.
     *
     * @default undefined
     * @aspType SelectionBorder
     */
    readonly vertical: SelectionBorder;
    /**
     * @param Object
     * @private
     */
    constructor(selection: Selection, node?: Object);
    /**
     * Copies the format.
     *
     * @param {WBorders} borders
     * @returns {void}
     * @private
     */
    copyFormat(borders: WBorders): void;
    /**
     * Combines the format.
     *
     * @param {WBorders} borders
     * @private
     */
    combineFormat(borders: WBorders): void;
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
/**
 * Selection paragraph format implementation
 */
export declare class SelectionParagraphFormat {
    private selection;
    private leftIndentIn;
    private rightIndentIn;
    private beforeSpacingIn;
    private afterSpacingIn;
    private spaceAfterAutoIn;
    private spaceBeforeAutoIn;
    private textAlignmentIn;
    private outlineLevelIn;
    private firstLineIndentIn;
    private lineSpacingIn;
    private lineSpacingTypeIn;
    private bidiIn;
    private keepWithNextIn;
    private keepLinesTogetherIn;
    private widowControlIn;
    private contextualSpacingIn;
    private bordersIn;
    /**
     * Gets the borders for selected paragraphs.
     *
     * @default undefined
     * @aspType SelectionBorders
     */
    readonly borders: SelectionBorders;
    /**
     * @private
     */
    listId: number;
    private listLevelNumberIn;
    private documentHelper;
    /**
     * @private
     */
    styleName: string;
    /**
     * Gets or Sets the left indent for selected paragraphs.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Sets the left indent for selected paragraphs.
    *
    * @default undefined
    * @aspType int
    */
    leftIndent: number;
    /**
     * Gets or Sets the right indent for selected paragraphs.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Sets the right indent for selected paragraphs.
    *
    * @default undefined
    * @aspType int
    */
    rightIndent: number;
    /**
     * Gets or Sets the first line indent for selected paragraphs.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Sets the first line indent for selected paragraphs.
    *
    * @default undefined
    * @aspType int
    */
    firstLineIndent: number;
    /**
     * Gets or Sets the text alignment for selected paragraphs.
     *
     * @default undefined
     */
    /**
    * Sets the text alignment for selected paragraphs.
    *
    * @default undefined
    */
    textAlignment: TextAlignment;
    /**
     * Gets or Sets the outline level for selected paragraphs.
     *
     * @default undefined
     */
    /**
    * Sets the outline level for selected paragraphs.
    *
    * @default undefined
    */
    outlineLevel: OutlineLevel;
    /**
     * Sets the after spacing for selected paragraphs.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the after spacing for selected paragraphs.
    *
    * @default undefined
    * @aspType int
    */
    afterSpacing: number;
    /**
     * Gets or Sets the before spacing for selected paragraphs.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Sets the before spacing for selected paragraphs.
    *
    * @default undefined
    * @aspType int
    */
    beforeSpacing: number;
    /**
     * Gets or Sets the space after auto for selected paragraphs.
     *
     * @default false
     * @aspType bool
     */
    /**
    *  Sets the space after auto for selected paragraphs.
    *
    * @aspType bool
    * @blazorType bool
    */
    spaceAfterAuto: boolean;
    /**
     * Gets or Sets the space before auto for selected paragraphs.
     *
     * @default false
     * @aspType bool
     */
    /**
    *  Sets the space before auto for selected paragraphs.
    *
    * @aspType bool
    * @blazorType bool
    */
    spaceBeforeAuto: boolean;
    /**
     * Gets or Sets the line spacing for selected paragraphs.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Sets the line spacing for selected paragraphs.
    *
    * @default undefined
    * @aspType int
    */
    lineSpacing: number;
    /**
     * Gets or Sets the line spacing type for selected paragraphs.
     *
     * @default undefined
     */
    /**
    * Gets or Sets the line spacing type for selected paragraphs.
    *
    * @default undefined
    */
    lineSpacingType: LineSpacingType;
    /**
     * Sets the list level number for selected paragraphs.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the list level number for selected paragraphs.
    *
    * @default undefined
    * @aspType int
    */
    listLevelNumber: number;
    /**
     * Gets or Sets the bidirectional property for selected paragraphs
     *
     * @aspType bool
     */
    /**
    * Sets the bidirectional property for selected paragraphs
    *
    * @aspType bool
    */
    bidi: boolean;
    /**
     * Gets or sets a value indicating whether the specified paragraph remains on the same page as the paragraph that follows it while paginating the document.
     *
     * @default false
     * @aspType bool
     * @returns {boolean} - `true` if the specified paragraph remains on the same page as the paragraph that follows it; otherwise, `false`.
     */
    /**
    * Sets a value indicating whether the specified paragraph remains on the same page as the paragraph that follows it while paginating the document.
    *
    * @aspType bool
    * @blazorType bool
    */
    keepWithNext: boolean;
    /**
     * Gets or sets a value indicating whether all lines in the specified paragraphs remain on the same page while paginating the document.
     *
     * @default false
     * @aspType bool
     * @returns {boolean} - `true` if all lines in the specified paragraphs remain on the same page; otherwise, `false`.
     */
    /**
    * Sets a value indicating whether all lines in the specified paragraphs remain on the same page while paginating the document.
    *
    * @aspType bool
    * @blazorType bool
    */
    keepLinesTogether: boolean;
    /**
     * Gets or sets a value indicating whether the first and last lines of the paragraph are to remain on the same page as the rest of the paragraph when paginating the document.
     *
     * @default true
     * @aspType bool
     * @returns {boolean} - `true` if the first and last lines of the paragraph are to remain on the same page; otherwise, `false`.
     */
    /**
    * Sets a value indicating whether the first and last lines of the paragraph are to remain on the same page as the rest of the paragraph when paginating the document.
    *
    * @default true
    * @aspType bool
    */
    widowControl: boolean;
    /**
     * Gets or sets a value indicating whether to add space between the paragraphs of same style.
     *
     * @aspType bool
     */
    /**
    * Sets a value indicating whether to add space between the paragraphs of same style.
    *
    * @aspType bool
    */
    contextualSpacing: boolean;
    private validateLineSpacing;
    /**
     * Gets the list text for selected paragraphs.
     *
     * @aspType string
     */
    readonly listText: string;
    /**
     * @param selection
     * @param documentHelper
     * @private
     */
    constructor(selection: Selection, documentHelper: DocumentHelper);
    private getPropertyValue;
    /**
     * Notifies whenever the property gets changed.
     *
     * @param {string} propertyName
     */
    private notifyPropertyChanged;
    /**
     * Copies the format.
     *
     * @param {WParagraphFormat} format
     * @returns {void}
     * @private
     */
    copyFormat(format: WParagraphFormat): void;
    /**
     * Copies to format.
     *
     * @param {WParagraphFormat} format
     * @private
     */
    copyToFormat(format: WParagraphFormat): void;
    /**
     * Combines the format.
     *
     * @param {WParagraphFormat} format
     * @private
     */
    combineFormat(format: WParagraphFormat): void;
    /**
     * Clears the format.
     *
     * @returns {void}
     * @private
     */
    clearFormat(): void;
    /**
     * Gets the clone of list at current selection.
     *
     * @returns WList
     * @private
     */
    getList(): WList;
    /**
     * Modifies the list at current selection.
     *
     * @param {WList} listAdv
     * @private
     */
    setList(listAdv: WList, isListDialog?: boolean): void;
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
export declare class SelectionHeaderFooter {
    private linkToPreviousIn;
    private selection;
    /**
     * Gets or sets a value indicating whether this header footer is linked to the previous section header footer in the document.
     *
     * @default true
     * @aspType bool
     * @returns {boolean} Returns `true` if the header footer is linked to the previous section header footer; Otherwise `false`.
     */
    linkToPrevious: boolean;
    constructor(selection?: Selection);
    private notifyPropertyChanged;
    private getPropertyvalue;
}
/**
 * Selection section format implementation
 */
export declare class SelectionSectionFormat {
    private selection;
    private differentFirstPageIn;
    private differentOddAndEvenPagesIn;
    private headerDistanceIn;
    private footerDistanceIn;
    private pageHeightIn;
    private pageWidthIn;
    private leftMarginIn;
    private topMarginIn;
    private rightMarginIn;
    private bottomMarginIn;
    private restartPageNumberingIn;
    private pageStartingNumberIn;
    private endnoteNumberFormatIn;
    private footNoteNumberFormatIn;
    private restartIndexForFootnotesIn;
    private restartIndexForEndnotesIn;
    private initialFootNoteNumberIn;
    private initialEndNoteNumberIn;
    private equalWidthIn;
    private lineBetweenColumnsIn;
    private columnsIn;
    private breakCodeIn;
    private firstPageHeaderIn;
    private firstPageFooterIn;
    private oddPageHeaderIn;
    private oddPageFooterIn;
    private evenPageHeaderIn;
    private evenPageFooterIn;
    /**
     * private
     */
    bidi: boolean;
    /**
     * Gets or sets the page height.
     *
     * @aspType int
     */
    /**
    * Gets or sets the page height.
    *
    * @aspType int
    */
    pageHeight: number;
    /**
     * Gets or sets the page width.
     *
     * @aspType int
     */
    /**
    * Gets or sets the page width.
    *
    * @aspType int
    */
    pageWidth: number;
    /**
     * Gets or sets the page left margin.
     *
     * @aspType int
     */
    /**
    * Gets or sets the page left margin.
    *
    * @aspType int
    */
    leftMargin: number;
    /**
     * Gets or sets the page bottom margin.
     *
     * @aspType int
     */
    /**
    * Gets or sets the page bottom margin.
    *
    * @aspType int
    */
    bottomMargin: number;
    /**
     * Gets or sets the page top margin.
     *
     * @aspType int
     */
    /**
    * Gets or sets the page top margin.
    *
    * @aspType int
    */
    topMargin: number;
    /**
     * Gets or sets the page right margin.
     *
     * @aspType int
     */
    /**
    * Gets or sets the page right margin.
    *
    * @aspType int
    */
    rightMargin: number;
    /**
     * Gets or sets the header distance.
     *
     * @aspType int
     */
    /**
    * Gets or sets the header distance.
    *
    * @aspType int
    */
    headerDistance: number;
    /**
     * Gets the first page header of the section.
     *
     * @aspType SelectionHeaderFooter
     */
    firstPageHeader: SelectionHeaderFooter;
    /**
     * Gets the first page footer of the section.
     *
     * @aspType SelectionHeaderFooter
     */
    firstPageFooter: SelectionHeaderFooter;
    /**
     * Gets the odd page header of the section.
     *
     * @aspType SelectionHeaderFooter
     */
    oddPageHeader: SelectionHeaderFooter;
    /**
     * Gets the odd page footer of the section.
     *
     * @aspType SelectionHeaderFooter
     */
    oddPageFooter: SelectionHeaderFooter;
    /**
     * Gets the even page header of the section.
     *
     * @aspType SelectionHeaderFooter
     */
    evenPageHeader: SelectionHeaderFooter;
    /**
     * Gets the even page footer of the section.
     *
     * @aspType SelectionHeaderFooter
     */
    evenPageFooter: SelectionHeaderFooter;
    /**
     * Gets or sets the starting page number.
     *
     * @aspType int
     */
    /**
    * Gets or sets the starting page number.
    *
    * @aspType int
    */
    pageStartingNumber: number;
    /**
     * Gets or sets a value indicating whether to restart page numbering.
     *
     * @aspType bool
     */
    /**
    * Gets or sets a value indicating whether to restart page numbering.
    *
    * @aspType bool
    */
    restartPageNumbering: boolean;
    /**
     * Gets or sets the footer distance.
     *
     * @aspType int
     */
    /**
    * Gets or sets the footer distance.
    *
    * @aspType int
    */
    footerDistance: number;
    /**
     * Gets or sets a value indicating whether the section has different first page.
     *
     * @aspType bool
     */
    /**
    * Gets or sets a value indicating whether the section has different first page.
    *
    * @aspType bool
    */
    differentFirstPage: boolean;
    /**
     * Gets or sets a value indicating whether the section has different odd and even page.
     *
     * @aspType bool
     */
    /**
    * Gets or sets a value indicating whether the section has different odd and even page.
    *
    * @aspType bool
    */
    differentOddAndEvenPages: boolean;
    /**
     * Gets or sets the number format of endnote.
     */
    /**
    * Gets or sets the number format of endnote.
    */
    endnoteNumberFormat: FootEndNoteNumberFormat;
    /**
     * Gets or sets the number format of footnote.
     */
    /**
    * Gets or sets the number format of footnote.
    */
    footNoteNumberFormat: FootEndNoteNumberFormat;
    /**
     * Gets or sets the number format of footnote.
     */
    /**
    * Gets or sets the number format of footnote.
    */
    initialFootNoteNumber: number;
    /**
     * Gets or sets the number format of footnote.
     */
    /**
    * Gets or sets the number format of footnote.
    */
    initialEndNoteNumber: number;
    /**
     * Gets or sets the restart index of footnote
     */
    /**
    * Gets or sets the restart index of footnote
    */
    restartIndexForFootnotes: FootnoteRestartIndex;
    /**
     * Gets or sets the restart index of endnote
     */
    /**
    * Gets or sets the restart index of endnote
    */
    restartIndexForEndnotes: FootnoteRestartIndex;
    /**
     * Gets the number of columns on a page.
     */
    readonly numberOfColumns: number;
    /**
     * Gets or sets a value indicating whether all the columns on a page has even width and space.
     */
    /**
    * Gets or sets a value indicating whether all the columns on a page has even width and space.
    */
    equalWidth: boolean;
    /**
     * Gets or sets a value indicating whether the vertical lines appear between all the columns.
     */
    /**
    * Gets or sets a value indicating whether the vertical lines appear between all the columns.
    */
    lineBetweenColumns: boolean;
    /**
     * Gets or sets the columns.
     */
    /**
    * Gets or sets the columns.
    */
    columns: SelectionColumnFormat[];
    /**
     * Gets or sets the breakCode.
     *
     * @aspType int
     */
    /**
    * Gets or sets the breakCode.
    *
    * @aspType int
    */
    breakCode: string;
    /**
     * @param selection
     * @private
     */
    constructor(selection: Selection);
    /**
     * Copies the format.
     *
     * @param {WSectionFormat} format
     * @returns {void}
     * @private
     */
    copyFormat(format: WSectionFormat): void;
    private applyColumnFormat;
    private notifyPropertyChanged;
    private getPropertyvalue;
    /**
     * Combines the format.
     *
     * @param {WSectionFormat} format
     * @private
     */
    combineFormat(format: WSectionFormat): void;
    /**
     * Clears the format.
     *
     * @returns {void}
     * @private
     */
    clearFormat(): void;
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
/**
 * Selection table format implementation
 */
export declare class SelectionTableFormat {
    private selection;
    private tableIn;
    private leftIndentIn;
    private backgroundIn;
    private tableAlignmentIn;
    private cellSpacingIn;
    private leftMarginIn;
    private rightMarginIn;
    private topMarginIn;
    private bottomMarginIn;
    private preferredWidthIn;
    private preferredWidthTypeIn;
    private bidiIn;
    private titleIn;
    private descriptionIn;
    /**
     * Gets or sets the table.
     *
     * @private
     */
    table: TableWidget;
    /**
     * Gets or sets the title of the selected table.
     *
     * @aspType string
     */
    /**
    * Gets or sets the title of the selected table.
    *
    * @aspType string
    */
    title: string;
    /**
     * Gets or sets the description of the selected table.
     *
     * @aspType string
     */
    /**
    * Gets or sets the description of the selected table.
    *
    * @aspType string
    */
    description: string;
    /**
     * Gets or Sets the left indent for selected table.
     *
     * @aspType int
     */
    /**
    * Gets or Sets the left indent for selected table.
    *
    * @aspType int
    */
    leftIndent: number;
    /**
     * Gets or Sets the default top margin of cell for selected table.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the default top margin of cell for selected table.
    *
    * @default undefined
    * @aspType int
    */
    topMargin: number;
    /**
     * Gets or Sets the background for selected table.
     *
     * @default undefined
     * @aspType string
     */
    /**
    * Gets or Sets the background for selected table.
    *
    * @default undefined
    * @aspType string
    */
    background: string;
    /**
     * Gets or Sets the table alignment for selected table.
     *
     * @default undefined
     */
    /**
    * Gets or Sets the table alignment for selected table.
    *
    * @default undefined
    */
    tableAlignment: TableAlignment;
    /**
     * Gets or Sets the default left margin of cell for selected table.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the default left margin of cell for selected table.
    *
    * @default undefined
    * @aspType int
    */
    leftMargin: number;
    /**
     * Gets or Sets the default bottom margin of cell for selected table.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the default bottom margin of cell for selected table.
    *
    * @default undefined
    * @aspType int
    */
    bottomMargin: number;
    /**
     * Gets or Sets the cell spacing for selected table.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the cell spacing for selected table.
    *
    * @default undefined
    * @aspType int
    */
    cellSpacing: number;
    /**
     * Gets or Sets the default right margin of cell for selected table.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the default right margin of cell for selected table.
    *
    * @default undefined
    * @aspType int
    */
    rightMargin: number;
    /**
     * Gets or Sets the preferred width for selected table.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the preferred width for selected table.
    *
    * @default undefined
    * @aspType int
    */
    preferredWidth: number;
    /**
     * Gets or Sets the preferred width type for selected table.
     *
     * @default undefined
     */
    /**
    * Gets or Sets the preferred width type for selected table.
    *
    * @default undefined
    */
    preferredWidthType: WidthType;
    /**
     * Gets or sets the bidi property
     *
     * @aspType bool
     */
    /**
    * Gets or sets the bidi property
    *
    * @aspType bool
    */
    bidi: boolean;
    /**
     * @param selection
     * @private
     */
    constructor(selection: Selection);
    private getPropertyValue;
    private notifyPropertyChanged;
    /**
     * Copies the format.
     *
     * @param {WTableFormat} format Format to copy.
     * @returns {void}
     * @private
     */
    copyFormat(format: WTableFormat): void;
    /**
     * Clears the format.
     *
     * @returns {void}
     * @private
     */
    clearFormat(): void;
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
/**
 * Selection cell format implementation
 */
export declare class SelectionCellFormat {
    private selection;
    private verticalAlignmentIn;
    private leftMarginIn;
    private rightMarginIn;
    private topMarginIn;
    private bottomMarginIn;
    private backgroundIn;
    private preferredWidthIn;
    private preferredWidthTypeIn;
    /**
     * Gets or sets the vertical alignment of the selected cells.
     *
     * @default undefined
     */
    /**
    * Gets or sets the vertical alignment of the selected cells.
    *
    * @default undefined
    */
    verticalAlignment: CellVerticalAlignment;
    /**
     * Gets or Sets the left margin for selected cells.
     *
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the left margin for selected cells.
    * @default undefined
    * @aspType int
    */
    leftMargin: number;
    /**
     * Gets or Sets the right margin for selected cells.
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the right margin for selected cells.
    * @default undefined
    * @aspType int
    */
    rightMargin: number;
    /**
     * Gets or Sets the top margin for selected cells.
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the top margin for selected cells.
    * @default undefined
    * @aspType int
    */
    topMargin: number;
    /**
     * Gets or Sets the bottom margin for selected cells.
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the bottom margin for selected cells.
    * @default undefined
    * @aspType int
    */
    bottomMargin: number;
    /**
     * Gets or Sets the background for selected cells.
     * @default undefined
     * @aspType string
     */
    /**
    * Gets or Sets the background for selected cells.
    * @default undefined
    * @aspType string
    */
    background: string;
    /**
     * Gets or Sets the preferred width type for selected cells.
     * @default undefined
     */
    /**
    * Gets or Sets the preferred width type for selected cells.
    * @default undefined
    */
    preferredWidthType: WidthType;
    /**
     * Gets or Sets the preferred width  for selected cells.
     * @default undefined
     * @aspType int
     */
    /**
    * Gets or Sets the preferred width  for selected cells.
    * @default undefined
    * @aspType int
    */
    preferredWidth: number;
    /**
     * @private
     */
    constructor(selection: Selection);
    private notifyPropertyChanged;
    private getPropertyValue;
    /**
     * Copies the format.
     *
     * @private
     * @param {WCellFormat} format - Source Format to copy.
     * @returns {void}
     */
    copyFormat(format: WCellFormat): void;
    /**
     * Clears the format.
     *
     * @private
     * @returns {void}
     */
    clearCellFormat(): void;
    /**
     * Combines the format.
     *
     * @param {WCellFormat} format - Returns cell format
     * @private
     */
    combineFormat(format: WCellFormat): void;
    /**
     * Clears the format.
     *
     * @private
     * @returns {void}
     */
    clearFormat(): void;
    /**
     * Destroys the manages resources.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
}
/**
 * Selection row format implementation
 */
export declare class SelectionRowFormat {
    private selection;
    private heightIn;
    private heightTypeIn;
    private isHeaderIn;
    private allowRowBreakAcrossPagesIn;
    /**
     * Gets or Sets the height for selected rows.
     *
     * @default undefined
     * @aspType int
     * @returns {number} - Returns the height
     */
    /**
    * Gets or Sets the height for selected rows.
    *
    * @default undefined
    * @aspType int
    * @param {number} value - Specified the value
    */
    height: number;
    /**
     * Gets or Sets the height type for selected rows.
     *
     * @default undefined
     * @returns {HeightType} - Returns height type
     */
    /**
    * Gets or Sets the height type for selected rows.
    *
    * @default undefined
    * @param {HeightType} value - Specified the value
    */
    heightType: HeightType;
    /**
     * Gets or Sets a value indicating whether the selected rows are header rows or not.
     *
     * @default undefined
     * @aspType bool
     * @returns {boolean} - Returns the is header
     */
    /**
    * Gets or Sets a value indicating whether the selected rows are header rows or not.
    *
    * @default undefined
    * @aspType bool
    * @param {boolean} value - Specified the value
    */
    isHeader: boolean;
    /**
     * Gets or Sets a value indicating whether to allow break across pages for selected rows.
     *
     * @default undefined
     * @aspType bool
     * @returns {boolean} - Returns the allow break across page
     */
    /**
    * Gets or Sets a value indicating whether to allow break across pages for selected rows.
    *
    * @default undefined
    * @param {boolean} value - Specified the value
    * @aspType bool
    */
    allowBreakAcrossPages: boolean;
    /**
     * @param {Selection} selection - Specifies the selection
     * @private
     */
    constructor(selection: Selection);
    private notifyPropertyChanged;
    private getPropertyValue;
    /**
     * Copies the format.
     *
     * @param {WRowFormat} format - Specified row format
     * @private
     * @returns {void}
     */
    copyFormat(format: WRowFormat): void;
    /**
     * Combines the format.
     *
     * @param {WRowFormat} format - Secifies row format
     * @private
     */
    combineFormat(format: WRowFormat): void;
    /**
     * Clears the row format.
     *
     * @private
     * @returns {void}
     */
    clearRowFormat(): void;
    /**
     * Clears the format.
     *
     * @private
     * @returns {void}
     */
    clearFormat(): void;
    /**
     * Destroys the managed resources.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
}
/**
 * Selection image format implementation
 */
export declare class SelectionImageFormat {
    /**
     * @private
     */
    image: ImageElementBox;
    /**
     * @private
     */
    selection: Selection;
    /**
     * Gets the width of the image.
     *
     * @aspType int
     * @returns {number} - Returns image width
     */
    readonly width: number;
    /**
     * Gets the height of the image.
     *
     * @aspType int
     * @returns {number} - Returns image height
     */
    readonly height: number;
    /**
     * Gets the alternateText of the image.
     *
     * @aspType string
     * @returns {string} - Returns image alternateText
     */
    /**
    * Sets the alternateText of the image.
    *
    * @aspType string
    * @returns {string} - Returns image alternateText
    */
    alternateText: string;
    /**
     * @param {Selection} selection - Specifies selecion module
     * @private
     */
    constructor(selection: Selection);
    /**
     * Resizes the image based on given size.
     *
     * @param {number} width - Specified the image width
     * @param {number} height - Specifies the image height
     * @private
     * @returns {void}
     */
    resize(width: number, height: number): void;
    /**
     * update the image based on given alternateText.
     *
     * @param {string} alternateText - Specified the image alternateText
     * @private
     * @returns {void}
     */
    applyImageAlternativeText(alternateText: string): void;
    /**
     * Update image width and height
     *
     * @param {number} width - Specified the image width
     * @param {number} height - Specifies the image height
     * @param {string} alternateText - Specofies the image alternateText
     * @private
     * @returns {void}
     */
    updateImageFormat(width: number, height: number, alternateText: string): void;
    /**
     * @param {ImageElementBox} image - Specifies image element box
     * @private
     * @returns {void}
     */
    copyImageFormat(image: ImageElementBox): void;
    /**
     * @private
     * @returns {void}
     */
    clearImageFormat(): void;
}
/**
 * Selection column format
 */
export declare class SelectionColumnFormat {
    private selection;
    private widthIn;
    private spaceIn;
    /**
     * @param selection
     * @private
     */
    constructor(selection: Selection);
    /**
     * Copies the format.
     *
     * @private
     * @param {WColumnFormat} format - Source Format to copy.
     * @returns {void}
     */
    copyFormat(format: WColumnFormat): void;
    /**
     * Gets or sets the width of the column.
     */
    /**
    * Gets or sets the width of the column.
    */
    width: number;
    /**
     * Gets or sets the space in between this column and next column.
     */
    /**
    * Gets or sets the space in between this column and next column.
    */
    space: number;
    private getPropertyValue;
    private notifyPropertyChanged;
    /**
     * Clears the format.
     *
     * @private
     * @returns {void}
     */
    clearFormat(): void;
    /**
     * Destroys the manages resources.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
}
