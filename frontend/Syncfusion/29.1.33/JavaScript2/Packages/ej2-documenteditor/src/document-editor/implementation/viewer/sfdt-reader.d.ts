import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { WCharacterFormat, WParagraphFormat, WCellFormat, WTableFormat, WSectionFormat, WRowFormat } from '../format/index';
import { WStyles } from '../format/index';
import { DocumentHelper } from './viewer';
import { Widget, BodyWidget, BlockWidget, HeaderFooters, CommentCharacterElementBox, CommentElementBox, FormField, ContentControlProperties, Footnote } from './page';
import { Dictionary } from '../../base/dictionary';
import { Revision } from '../track-changes/track-changes';
import { ListLevelPattern } from '../../base/types';
import { Themes, MajorMinorFontScheme, ActionInfo } from '../index';
/**
 * @private
 */
export declare class SfdtReader {
    private documentHelper;
    private fieldSeparator;
    /**
     * @private
     */
    commentStarts: Dictionary<string, CommentCharacterElementBox>;
    /**
     * @private
     */
    commentEnds: Dictionary<string, CommentCharacterElementBox>;
    /**
     * @private
     */
    commentsCollection: Dictionary<string, CommentElementBox>;
    /**
     * @private
     */
    revisionCollection: Dictionary<string, Revision>;
    private isPageBreakInsideTable;
    private referedRevisions;
    private editableRanges;
    private fontInfoCollection;
    private isParseHeader;
    footnotes: Footnote;
    endnotes: Footnote;
    keywordIndex: number;
    themes: Themes;
    /**
     * @private
     */
    isCutPerformed: boolean;
    /**
     * @private
     */
    isPaste: boolean;
    /**
     * @private
     */
    isContextBasedPaste: boolean;
    /**
     * @private
     */
    isHtmlPaste: boolean;
    private readonly isPasting;
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    convertJsonToDocument(json: string, incrementalOperations?: Record<string, ActionInfo[]>): BodyWidget[];
    private parseFontSubstitutionTable;
    private removeUnmappedBookmark;
    private generalizeRevisions;
    private parseFootnotes;
    /**
     * @private
     */
    parseImages(data: any): void;
    private parseEndtnotes;
    /**
     * @private
     */
    parseCustomXml(data: any): void;
    private parseDocumentProtection;
    /**
     * @private
     */
    parseStyles(data: any, styles: WStyles): void;
    parseRevisions(data: any, revisions: Revision[]): void;
    parseRevision(data: any): Revision;
    private checkAndApplyRevision;
    parseComments(data: any, comments: CommentElementBox[]): void;
    private parseComment;
    private parseCommentText;
    private parseCommentMentions;
    parseStyle(data: any, style: any, styles: WStyles, resetKeyIndex?: boolean): void;
    private updateParagraphFormatFromBaseStyle;
    private getStyle;
    parseAbstractList(data: any, abstractLists: WAbstractList[]): void;
    private parseListLevel;
    parseList(data: any, listCollection: WList[]): void;
    private parseLevelOverride;
    private parseSections;
    parseHeaderFooter(data: any, headersFooters: any): HeaderFooters;
    private parseTextBody;
    addCustomStyles(data: any): void;
    parseBody(data: any, blocks: BlockWidget[], container?: Widget, isSectionBreak?: boolean, contentControlProperties?: ContentControlProperties, styles?: any, breakCode?: string, isFootnoteEndnote?: boolean): void;
    private parseTable;
    private parseTablePositioning;
    private parseRowGridValues;
    /**
     * @private
     */
    parseContentControlProperties(wContentControlProperties: any, contentControlProperties: ContentControlProperties, keywordIndex?: number): void;
    private parseSymbol;
    private parseParagraph;
    /**
     * @private
     */
    parseFormFieldData(keywordIndex: number, sourceData: any, formFieldData: FormField): FormField;
    private applyCharacterStyle;
    private parseEditableRangeStart;
    private addEditRangeCollection;
    private parseChartTitleArea;
    private parseChartDataFormat;
    private parseChartLayout;
    private parseChartLegend;
    private parseChartCategoryAxis;
    private parseChartDataTable;
    private parseChartArea;
    private parseChartData;
    private parseChartSeries;
    private parseChartDataLabels;
    private parseChartSeriesDataPoints;
    private parseChartTrendLines;
    /**
     * @private
     */
    parseTableFormat(sourceFormat: any, tableFormat: WTableFormat, keywordIndex: number): void;
    /**
     * @private
     */
    parseCellFormat(sourceFormat: any, cellFormat: WCellFormat, keyIndex: number): void;
    private parseCellMargin;
    /**
     * @private
     */
    parseRowFormat(sourceFormat: any, rowFormat: WRowFormat, keyIndex: number): void;
    private parseBorders;
    private parseBorder;
    private parseShading;
    /**
     * @private
     */
    parseCharacterFormat(keyIndex: number, sourceFormat: any, characterFormat: WCharacterFormat, writeInlineFormat?: boolean): void;
    /**
     * @private
     * @returns {boolean}
     */
    isFontInstalled(fontFamily: string): boolean;
    private getWidth;
    private getColor;
    parseThemes(sourceFormat: any, themes: Themes): void;
    parseFontScheme(sourceFormat: any, themes: Themes): void;
    parseMajorMinorFontScheme(sourceFormat: any, majorMinor: MajorMinorFontScheme): void;
    parseParagraphFormat(keyIndex: number, sourceFormat: any, paragraphFormat: WParagraphFormat): void;
    private parseListFormat;
    parseSectionFormat(keyIndex: number, data: any, sectionFormat: WSectionFormat): void;
    private parseColumns;
    private parseTabStop;
    private validateImageUrl;
    private containsFieldBegin;
    private getBaseAlignment;
    private getUnderline;
    private getFontHintType;
    private getStrikethrough;
    private getHighlightColor;
    private getLineSpacingType;
    private getOutlineLevel;
    private getTextAlignment;
    private getWidthType;
    private getTableAlignment;
    private getLineStyle;
    private getTextureStyle;
    private getHeightType;
    private getCellVerticalAlignment;
    /**
     * @private
     */
    getListLevelPattern(listLevelPattern: number | ListLevelPattern): ListLevelPattern;
    private getFollowCharacterType;
    private getStyleType;
    private getProtectionType;
    private getRevisionType;
    private getFootnoteType;
    private getFootnoteRestartIndex;
    private getFootEndNoteNumberFormat;
    private getBiDirectionalOverride;
    private getBreakClearType;
    private getTextVerticalAlignment;
    private getShapeVerticalAlignment;
    private getShapeHorizontalAlignment;
    private getVerticalOrigin;
    private getHorizontalOrigin;
    private getTableVerticalRelation;
    private getTableHorizontalRelation;
    private getTableVerticalPosition;
    private getTableHorizontalPosition;
    private getLineDashStyle;
    private getHorizontalPositionAbs;
    private getTabJustification;
    private getTabLeader;
    private getTextFormFieldType;
    private getTextFormFieldFormat;
    private getCheckBoxSizeType;
    private getContentControlAppearance;
    private getContentControlType;
    private getDateCalendarType;
    private getDateStorageFormat;
    private getTextWrappingStyle;
    private getTextWrappingType;
    private getCompatibilityMode;
    private getLineFormatType;
    private getAutoShapeType;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
}
