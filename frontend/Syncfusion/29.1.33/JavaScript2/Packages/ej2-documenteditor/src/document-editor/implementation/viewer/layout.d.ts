import { ListLevelPattern, FootEndNoteNumberFormat } from '../../base/types';
import { FootNoteWidgetsInfo, WrapPosition } from '../editor/editor-helper';
import { WBorder, WBorders, WCharacterFormat, WListFormat } from '../format/index';
import { WAbstractList } from '../list/abstract-list';
import { WList } from '../list/list';
import { WListLevel } from '../list/list-level';
import { BlockContainer, BlockWidget, BodyWidget, CommentElementBox, ElementBox, FieldElementBox, HeaderFooterWidget, IWidget, LineWidget, Page, ParagraphWidget, Rect, TableCellWidget, TableRowWidget, TableWidget, Widget, CheckBoxFormField, FootnoteElementBox, FootNoteWidget } from './page';
import { DocumentHelper, LayoutViewer, PageLayoutViewer } from './viewer';
/**
 * @private
 */
export declare class Layout {
    private documentHelper;
    private value;
    private previousPara;
    /**
     * @private
     */
    islayoutFootnote: boolean;
    /**
     * @private
     */
    isMultiColumnDoc: boolean;
    /**
     * @private
     */
    allowLayout: boolean;
    /**
     * @private
     */
    isReplaceAll: boolean;
    /**
     * @private
     */
    isTextFormat: boolean;
    /**
    * @private
    */
    isSectionBreakCont: boolean;
    /**
     * @private
     */
    isReplacingAll: boolean;
    /**
     * @private
     */
    footHeight: number;
    /**
     * @private
     */
    existFootnoteHeight: number;
    /**
     * @private
     */
    isfootMove: boolean;
    /**
     * @private
     */
    footnoteHeight: number;
    /**
     * @private
     */
    isTableFootNote: boolean;
    /**
     * @private
     */
    isRelayout: boolean;
    /**
     * @private
     */
    isRelayoutneed: boolean;
    /**
     * @private
     */
    isOverlapFloatTable: boolean;
    isInitialLoad: boolean;
    /**
      * @private
      */
    isInsertFormField: boolean;
    private fieldBegin;
    private maxTextHeight;
    private maxBaseline;
    private maxTextBaseline;
    private isFieldCode;
    private isRtlFieldCode;
    private isRTLLayout;
    private isSkipFirstLineIndent;
    currentCell: TableCellWidget;
    isFootnoteContentChanged: boolean;
    isEndnoteContentChanged: boolean;
    private keepWithNext;
    private is2013Justification;
    private nextElementToLayout;
    private endNoteHeight;
    private isMultiColumnSplit;
    private isMultiColumnLayout;
    private skipUpdateContainerWidget;
    private isIFfield;
    /**
     * @private
     */
    startat: number;
    isLayoutWhole: boolean;
    /**
     * @private
     */
    isBidiReLayout: boolean;
    /**
     * @private
     */
    defaultTabWidthPixel: number;
    /**
     * @private
     */
    isRelayoutFootnote: boolean;
    private isRelayoutOverlap;
    private skipRelayoutOverlap;
    private startOverlapWidget;
    private endOverlapWidget;
    private isWrapText;
    private isYPositionUpdated;
    private isXPositionUpdated;
    private hasFloatingElement;
    private isFootNoteLayoutStart;
    wrapPosition: WrapPosition[];
    private shiftedFloatingItemsFromTable;
    isDocumentContainsRtl: boolean;
    /**
     * @private
     */
    isPastingContent: boolean;
    private layoutedFootnoteElement;
    /**
     * @private
     */
    isAllColumnHasAutoWidthType: boolean;
    private isSameStyle;
    private updateFirstParagraphSpacingBasedOnContextualSpacing;
    private updateLastParagraphSpacingBasedOnContextualSpacing;
    private checkOwnerTablePrevItem;
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    layout(): void;
    /**
     * Releases un-managed and - optionally - managed resources.
     *
     * @returns {void}
     */
    destroy(): void;
    layoutItems(sections: BodyWidget[], isReLayout: boolean, isContinuousSection?: boolean): void;
    /**
     * @private
     */
    layoutComments(comments: CommentElementBox[]): void;
    private layoutSection;
    /**
     * @private
     *
     */
    reLayoutMultiColumn(section: BodyWidget, isFirstBlock: boolean, blockIndex: number): void;
    private combineMultiColumnForRelayout;
    private reLayoutMultiColumnBlock;
    private splitBodyWidgetBasedOnColumn;
    /**
   * @private
   */
    getColumnBreak(section: BodyWidget): boolean;
    private layoutMultiColumnBody;
    getNextWidgetHeight(body: BodyWidget): number;
    private getHeight;
    private getBookmarkMargin;
    private getCountOrLine;
    private getCountOrLineTable;
    /**
       * @private
       */
    combineMultiColumn(section: BodyWidget): void;
    private updateCellHeightInCombinedTable;
    layoutHeaderFooter(section: BodyWidget, viewer: PageLayoutViewer, page: Page): void;
    private shiftItemsForVerticalAlignment;
    updateHeaderFooterToParent(node: HeaderFooterWidget): HeaderFooterWidget;
    private updateRevisionsToHeaderFooter;
    private updateRevisionRange;
    private linkFieldInHeaderFooter;
    /**
     * @private
     */
    linkFieldInParagraph(widget: ParagraphWidget): void;
    /**
     * @private
     */
    getCommentById(commentsCollection: CommentElementBox[], commentId: string): CommentElementBox;
    linkFieldInTable(widget: TableWidget): void;
    layoutHeaderFooterItems(viewer: LayoutViewer, widget: HeaderFooterWidget): HeaderFooterWidget;
    private shiftChildLocation;
    private shiftChildLocationForTableWidget;
    private shiftChildLocationForTableRowWidget;
    private shiftChildLocationForTableCellWidget;
    private layoutBlock;
    private updateTableYPositionBasedonTextWrap;
    private shiftWrapStyle;
    private checkAndRelayoutPreviousOverlappingBlock;
    private getLineHeigth;
    private addParagraphWidget;
    private updateXPositionForEmptyParagraph;
    private addLineWidget;
    isFirstElementWithPageBreak(paragraphWidget: ParagraphWidget): boolean;
    /**
     * Layouts specified paragraph.
     *
     * @private
     * @param footnote
     */
    layoutfootNote(footnote: FootNoteWidget): BlockContainer;
    private getFootNoteBodyHeight;
    private splitFootNoteWidgetBasedOnColumn;
    private updateColumnIndex;
    private shiftChildWidgetInFootnote;
    /**
       * @private
       */
    getBodyWidgetHeight(bodyWidget: BodyWidget): number;
    private checkBlockHasField;
    private checkTableHasField;
    private layoutParagraph;
    private checkIsFieldParagraph;
    private clearLineMeasures;
    private layoutFloatElements;
    private layoutShape;
    private moveElementFromNextLine;
    private layoutLine;
    private layoutElement;
    /**
    * @private
    */
    adjustPosition(element: ElementBox, bodyWidget: BlockContainer): void;
    private getFirstElement;
    private updateWrapPosition;
    private isFirstitemInPage;
    private isTextFitBelow;
    private isNeedToWrapForTopAndBottom;
    private isNeedToWrapForSquareTightAndThrough;
    private isNeedToWrapForSquareTightAndThroughForTable;
    private isNeedToWrapLeafWidget;
    private getMinWidth;
    private getNextTextRangeWidth;
    private isLeafWidgetNextSiblingIsTextRange;
    private isNextSibligSizeNeedToBeMeasure;
    private isNeedDoIntermediateWrapping;
    private isFloatingItemOnLeft;
    private getNextSibling;
    private adjustClientAreaBasedOnTextWrap;
    private adjustClientAreaBasedOnTextWrapForTable;
    private getNestedTable;
    private startAt;
    private layoutFootEndNoteElement;
    private layoutEndNoteElement;
    hasValidElement(paragraph: ParagraphWidget): boolean;
    private isConsiderAsEmptyLineWidget;
    private updateFieldText;
    private checkLineWidgetWithClientArea;
    private checkAndSplitTabOrLineBreakCharacter;
    private moveFromNextPage;
    private cutClientWidth;
    private layoutFieldCharacters;
    private checkAndUpdateFieldData;
    /**
     * Set the checkbox font size
     * @returns {void}
     */
    setCheckBoxFontSize(formFieldData: CheckBoxFormField, format: WCharacterFormat): void;
    private layoutEmptyLineWidget;
    private layoutSectionBreakParagraph;
    private getLineYPosition;
    private getLineXPosition;
    private getLineWidth;
    private isUpdateMarginForCurrentLine;
    private adjustPositionBasedOnTopAndBottom;
    private layoutListItems;
    private layoutList;
    private addBodyWidget;
    /**
     * @private
     */
    addListLevels(abstractList: WAbstractList): void;
    private addSplittedLineWidget;
    private addElementToLine;
    private splitElementForClientArea;
    private splitByWord;
    private spitTextElementByWhitespace;
    private splitErrorCollection;
    private splitByCharacter;
    private updateRevisionForSplittedElement;
    private splitTextElementWordByWord;
    private isSplitByHyphen;
    private splitTextForClientArea;
    private splitByLineBreakOrTab;
    private moveToNextLine;
    private updateShapeYPosition;
    getBodyWidget(section: BodyWidget, isFirstBody: boolean): BodyWidget;
    private splitParagraphForMultiColumn;
    private checkInbetweenShapeOverlap;
    private getLineY;
    private updateLineWidget;
    /**
     * @private
     */
    reLayoutEndnote(): void;
    private moveEndnoteToNextPage;
    private moveToNextPage;
    private isImagePresent;
    private updateShapeBaseLocation;
    private moveChildsToParagraph;
    /**
     * @param {ParagraphWidget} paragarph - the paragraph
     * @param {BodyWidget} body - the bodyWidget
     * @param {boolean} add - to specify add or remove floating elements from body widget.
     */
    private addRemoveFloatElementsFromBody;
    /**
     * Align block based on keep with next and keep lines together property.
     */
    private alignBlockElement;
    private getPreviousBlock;
    private splitRow;
    private splitParagraph;
    private updateClientPositionForBlock;
    private updateClientAreaForNextBlock;
    private layoutStartEndBlocks;
    private alignLineElements;
    private updateWidgetToPage;
    private shiftFooterChildLocation;
    private shiftFootnoteChildLocation;
    private checkPreviousElement;
    clearListElementBox(paragraph: ParagraphWidget): void;
    /**
 * @private
 */
    clearInvalidList(list: WList): void;
    getListNumber(listFormat: WListFormat, isAutoList?: boolean): string;
    private ClearSubListLevelValues;
    getListStartValue(listLevelNumber: number, list: WList): number;
    private updateListValues;
    private getListText;
    getAsLetter(number: number): string;
    getListTextListLevel(listLevel: WListLevel, listValue: number, customPattern?: ListLevelPattern): string;
    getFootEndNote(numberFormat: FootEndNoteNumberFormat, value: number): string;
    private generateNumber;
    private getAsLeadingZero;
    getAsRoman(number: number): string;
    private getOrdinalText;
    private numberToWords;
    private getOrdinalTextInSpanish;
    private numberToSpanishWords;
    private getAsOrdinal;
    private getOrdinalInEnglish;
    private getOrdinalInSwedish;
    private getOrdinalInCatalan;
    private getOrdinalInDanish;
    getListLevel(list: WList, listLevelNumber: number): WListLevel;
    private getOverrideListLevel;
    private getTabWidth;
    private getJustificationTabWidth;
    private getRightTabWidth;
    private getSplitIndexByWord;
    private getTextSplitIndexByCharacter;
    private getSubWidth;
    private getSubWidthBasedOnTextWrap;
    private isWordFittedByJustification;
    /**
     * Returns the total space width in line widget.
     * @param {LineWidget} lineWidget - the line widget
     * @param {number} count - the space count to be considered.
     * @returns {number} the total space width.
     */
    private getTotalSpaceWidth;
    private getSubWidthInfo;
    getBeforeSpacing(paragraph: ParagraphWidget, pageIndex?: number): number;
    getAfterSpacing(paragraph: ParagraphWidget): number;
    getLineSpacing(paragraph: ParagraphWidget, maxHeight: number, alterLineSpacing?: boolean): number;
    private isParagraphFirstLine;
    private isParagraphLastLine;
    private getTextIndexAfterSpace;
    moveNextWidgetsToTable(tableWidget: TableWidget[], currentRow: TableRowWidget, moveFromNext: boolean): void;
    private addTableCellWidget;
    private checkPreviousMargins;
    private addWidgetToTable;
    private layoutFootnoteInSplittedRow;
    private getFootNoteHeight;
    private getFootnoteHeightInternal;
    updateRowHeightBySpannedCell(tableWidget: TableWidget, row: TableRowWidget, insertIndex: number): void;
    private updateRowHeight;
    private updateSpannedRowCollection;
    private updateRowHeightByCellSpacing;
    private isRowSpanEnd;
    isVerticalMergedCellContinue(row: TableRowWidget): boolean;
    private splitWidgets;
    private getSplittedWidgetForRow;
    private combineSplittedRowWidgets;
    private getSplittedWidgetForSpannedRow;
    private getFootNoteHeightInLine;
    private getFootnoteFromLine;
    updateWidgetsToTable(tableWidgets: TableWidget[], rowWidgets: TableRowWidget[], row: TableRowWidget, rearrangeRow: boolean, lineIndexInCell?: number, cellIndex?: number, isMultiColumnSplit?: boolean): void;
    getHeader(table: TableWidget): TableRowWidget;
    private getHeaderHeight;
    private getHeaderHeightForSpannedRow;
    private updateWidgetToRow;
    private updateHeightForRowWidget;
    private updateHeightForCellWidget;
    getRowHeight(row: TableRowWidget, rowCollection: TableRowWidget[]): number;
    private splitSpannedCellWidget;
    private insertSplittedCellWidgets;
    private insertRowSpannedWidget;
    private insertEmptySplittedCellWidget;
    private isColumnExistsInCurrentRow;
    private getSplittedWidget;
    private getNextFootNoteHeight;
    private getFootHeightFromTable;
    private getFootHeightFromPara;
    private updateFootHeight;
    private updateFootHeightForTable;
    getListLevelPattern(value: number): ListLevelPattern;
    private createCellWidget;
    private createTableWidget;
    private getSplittedWidgetForPara;
    getSplittedWidgetForTable(bottom: number, tableCollection: TableWidget[], tableWidget: TableWidget, footNoteCollection: FootnoteElementBox[], lineIndexInCell?: number, isMultiColumnSplit?: boolean, count?: number): TableWidget;
    private isFirstLineFitForPara;
    isFirstLineFitForTable(bottom: number, tableWidget: TableWidget): boolean;
    private isFirstLineFitForRow;
    private isFirstLineFitForCell;
    private updateWidgetLocation;
    updateChildLocationForTable(top: number, tableWidget: TableWidget, bodyWidget?: BodyWidget, updatePosition?: boolean): void;
    updateChildLocationForRow(top: number, rowWidget: TableRowWidget, bodyWidget?: BodyWidget, updatePosition?: boolean): void;
    private updateChildLocationForCellOrShape;
    updateCellVerticalPosition(cellWidget: TableCellWidget, isUpdateToTop: boolean, isInsideTable: boolean): void;
    private updateCellContentVerticalPosition;
    private updateShapeInsideCell;
    private updateTableWidgetLocation;
    private getDisplacement;
    private getCellContentHeight;
    private getFloatingItemsHeight;
    private considerPositionTableHeight;
    getTableLeftBorder(borders: WBorders): WBorder;
    getTableRightBorder(borders: WBorders): WBorder;
    getTableTopBorder(borders: WBorders): WBorder;
    getTableBottomBorder(borders: WBorders): WBorder;
    getCellDiagonalUpBorder(tableCell: TableCellWidget): WBorder;
    getCellDiagonalDownBorder(tableCell: TableCellWidget): WBorder;
    getTableWidth(table: TableWidget): number;
    layoutNextItemsBlock(blockAdv: BlockWidget, viewer: LayoutViewer, isFootnoteReLayout?: boolean, isNextBlockToShift?: boolean): void;
    /**
     * Update the client area for the line widget.
     *
     * @param {LineWidget} startLineWidget LineWidget instance.
     * @private
     */
    updateClientAreaForLine(startLineWidget: LineWidget): void;
    /**
     * @private
     */
    isAuto(table: TableWidget): boolean;
    getParentTable(block: BlockWidget): TableWidget;
    reLayoutParagraph(paragraphWidget: ParagraphWidget, lineIndex: number, elementBoxIndex: number, isBidi?: boolean, isSkip?: boolean): void;
    private getParentRow;
    /**
     * @private
     */
    getParentCell(block: BlockWidget): TableCellWidget;
    private reLayoutRow;
    reLayoutTable(block: BlockWidget, isFootnoteReLayout?: boolean): void;
    private getYPosition;
    private clearFootnoteReference;
    /**
     * @private
     */
    clearTableWidget(table: TableWidget, clearPosition: boolean, clearHeight: boolean, clearGrid?: boolean, updateClientHeight?: boolean, skipToClearPara?: boolean): void;
    /**
     * @private
     */
    clearRowWidget(row: TableRowWidget, clearPosition: boolean, clearHeight: boolean, clearGrid: boolean, skipToClearPara?: boolean): void;
    /**
     * @private
     */
    clearCellWidget(cell: TableCellWidget, clearPosition: boolean, clearHeight: boolean, clearGrid: boolean, skipToClearPara?: boolean): void;
    /**
     * @private
     */
    clearBlockWidget(blocks: IWidget[], clearPosition: boolean, clearHeight: boolean, clearGrid: boolean, skipToClearPara?: boolean): void;
    layoutBodyWidgetCollection(blockIndex: number, bodyWidget: Widget, block: BlockWidget, shiftNextWidget: boolean, isSkipShifting?: boolean, isSelectionInsideTable?: boolean): void;
    /**
     * @private
     */
    checkAndGetBlock(containerWidget: Widget, blockIndex: number): BlockWidget;
    layoutTable(table: TableWidget, startIndex: number): BlockWidget;
    private updateFootnoteHeight;
    private updateClientAreaForWrapTable;
    addTableWidget(area: Rect, table: TableWidget[], create?: boolean): TableWidget;
    updateWidgetsToPage(tables: TableWidget[], rows: TableRowWidget[], table: TableWidget, rearrangeRow: boolean, endRowWidget?: TableRowWidget): void;
    updateHeightForTableWidget(tables: TableWidget[], rows: TableRowWidget[], tableWidget: TableWidget, endRowWidget?: TableRowWidget): void;
    layoutRow(tableWidget: TableWidget[], row: TableRowWidget, isRowLayout?: boolean): TableRowWidget;
    private updateExistingFootnoteHeight;
    private isIntersecting;
    private getAdjacentRowCell;
    private addTableRowWidget;
    private getMaxTopCellMargin;
    private getMaxBottomCellMargin;
    private layoutCell;
    private isInsertTable;
    private updateTopBorders;
    shiftLayoutedItems(reLayout: boolean, isMultiColumnShift?: boolean): void;
    private isSectionEndsWithColumnBreak;
    /**
     * @private
     */
    checkAndShiftEndnote(isRelayout?: boolean): void;
    updateFieldElements(reLayout?: boolean): void;
    private reLayoutOrShiftWidgets;
    private isNeedToRelayout;
    private shiftWidgetsBlock;
    private shiftWidgetsForPara;
    private updateFloatingElementPosition;
    private isPageBreakInsideField;
    private isPageBreakInsideContentControl;
    /**
     * @private
     * Get the footnote of the block widget.
     *
     * @param {BlockWidget} widget BlockWidget instance.
     * @returns
     */
    getFootNotesOfBlock(widget: BlockWidget, footnoteElements?: FootnoteElementBox[]): FootnoteElementBox[];
    private getFootNotesWidgetsInLine;
    private getFootNoteWidgetsBy;
    /**
     * @param widget
     * @private
     */
    getFootNoteWidgetsOf(widget: BlockWidget, isShifting?: boolean): BodyWidget[];
    getFootNodeWidgetsToShiftToPage(paragraph: ParagraphWidget): FootNoteWidgetsInfo;
    shiftTableWidget(table: TableWidget, viewer: LayoutViewer, isClearHeight?: boolean): TableWidget;
    shiftRowWidget(tables: TableWidget[], row: TableRowWidget, isClearHeight?: boolean): TableRowWidget;
    private updateFootnoteToBody;
    private getFootnoteBody;
    shiftCellWidget(cell: TableCellWidget, maxCellMarginTop: number, maxCellMarginBottom: number, isClearHeight: boolean): void;
    shiftParagraphWidget(paragraph: ParagraphWidget, skipCellContentHeightCalc?: boolean): void;
    private updateContainerForTable;
    private shiftWidgetsForTable;
    private updateVerticalPositionToTop;
    private splitWidget;
    private getMaximumLineHeightToSplit;
    /**
     * @private
     * @param footnoteWidgets
     * @param fromBodyWidget
     * @param toBodyWidget
     */
    moveFootNotesToPage(footnoteWidgets: BodyWidget[], fromBodyWidget: BodyWidget, toBodyWidget: BodyWidget): void;
    private addEmptyFootNoteToBody;
    private getMaxElementHeight;
    private createOrGetNextBodyWidget;
    private isFitInClientArea;
    private isLineInFootNote;
    private shiftToPreviousWidget;
    private updateParagraphWidgetInternal;
    private shiftFloatingElements;
    private shiftNextWidgets;
    updateContainerWidget(widget: Widget, bodyWidget: BodyWidget, index: number, destroyAndScroll: boolean, footWidget?: BodyWidget[]): void;
    private getBodyWidgetOfPreviousBlock;
    moveBlocksToNextPage(block: BlockWidget, moveFootnoteFromLastBlock?: boolean, childStartIndex?: number, sectionBreakContinuous?: boolean, isEndnote?: boolean, isTableSplit?: boolean): BodyWidget;
    private createSplitBody;
    private createOrGetNextColumnBody;
    private moveToNextColumnByBodyWidget;
    reLayoutLine(paragraph: ParagraphWidget, lineIndex: number, isBidi: boolean, isSkip?: boolean, isSkipList?: boolean): void;
    isContainsRtl(lineWidget: LineWidget): boolean;
    private shiftElementsForRTLLayouting;
    private isNumberNonReversingCharacter;
    private isNumberReverseLangForSlash;
    private isNumberReverseLangForOthers;
    private isStartMarker;
    private isEndMarker;
    private getNextValidWidget;
    private hasTextRangeBidi;
    private isContainsRTLText;
    private updateCharacterRange;
    private reorderElements;
    private isInsertWordSplitToLeft;
    private shiftLayoutFloatingItems;
    private getFloatingItemPoints;
    private getLeftMarginHorizPosition;
    private getRightMarginHorizPosition;
    private getVerticalPosition;
    private getHorizontalPosition;
    private updateTableFloatPoints;
    isTocField(element: FieldElementBox): boolean;
    private getTotalColumnSpan;
    private getMaximumRightCellBorderWidth;
    private getDefaultBorderSpacingValue;
    private getMinimumWidthRequiredForTable;
    private shiftFloatingItemsFromTable;
}
