import { LineWidget, ElementBox, BodyWidget, ParagraphWidget, TextElementBox, TableRowWidget, TableCellWidget, TableWidget } from '../viewer/page';
import { WCharacterFormat, WCellFormat, TextPosition, TextSearchResults, WList, WAbstractList, CommentElementBox } from '../index';
import { HighlightColor, TextFormFieldType, CheckBoxSizeType, RevisionType, CollaborativeEditingAction, BaselineAlignment, Underline, Strikethrough, BiDirectionalOverride, BreakClearType, LineStyle, TextAlignment, LineSpacingType, OutlineLevel, VerticalAlignment, FontHintType } from '../../base/types';
import { Widget, CommentCharacterElementBox } from '../viewer/page';
import { Dictionary } from '../..';
import { WBorder, WBorders, WParagraphFormat } from '../format';
import { FieldSettingsModel } from '@syncfusion/ej2-navigations';
/**
 * @private
 */
export declare class HelperMethods {
    /**
     * @private
     */
    static wordBefore: string;
    /**
     * @private
     */
    static wordAfter: string;
    /**
     * @private
     */
    static wordSplitCharacters: string[];
    /**
     * Inserts text at specified index in string.
     *
     * @private
     * @param {string} spanText - Specifies the span text.
     * @param {number} index - Specifies the index
     * @param {string} text - Specifies the text
     * @returns {string} - Returns modified string
     */
    static insert(spanText: string, index: number, text: string): string;
    /**
     * @returns {string} returns a string value
     * @param {string} text takes string as parameter
     * @private
     */
    private static replaceSpecialChars;
    /**
     * @returns {any} returns any type
     * @param {string} text gets string as a input
     * @public
     */
    static getSpellCheckData(text: string): any;
    /**
     * Check given string is a valid either roman or arabic number
     * @private
     * @param {string} input input string value to check if it is a number
     * @returns {boolean} weather given string is a number or not
     */
    static checkTextFormat(input: string): boolean;
    /**
     * @returns {string}
     * Sanitize the string for xss string content
     * @param {string} value accepts a string value
     * @public
     */
    static sanitizeString(value: string): string;
    /**
     * @returns {any} returns any type
     * Get the SFDT document from the optimized SFDT.
     * @param {any} json accepts a json file
     * @public
     */
    static getSfdtDocument(json: any): any;
    /**
     * @returns {number}
     * Generates a unique unique hexadecimal ID.
     * @param {WList[]} lists accepts list
     * @param {WAbstractList[]} abstractLists accepts array of abstractList
     * @public
     */
    static generateUniqueId(lists: WList[], abstractLists?: WAbstractList[]): number;
    /**
     * @private
     * @returns {string} returns a string value
     */
    static generateHexDecimal(): string;
    /**
     * @private
     * @param {number} id id need to be converted
     * @returns {string} returns a string value
     */
    static numberToHexDecimal(id: number): string;
    /**
     * @returns {boolean} returns a boolean value
     * @param {number} nsid accepts number as a parameter
     * @param {WList[]} lists accepts an array of type WList
     * @param {WAbstractList[]} abstractLists accepts an array of type WAbstractList
     * @param {boolean} isAbstractList accepts a boolean value
     * @private
     */
    static isSameListIDExists(nsid: number, lists: WList[], abstractLists?: WAbstractList[], isAbstractList?: boolean): boolean;
    /**
     * Removes text from specified index in string.
     *
     * @private
     * @param {string} text - Specifies the text
     * @param {number} index - Specifies the index
     * @returns {string} - Returns modified string
     */
    static remove(text: string, index: number): string;
    static indexOfAny(text: string, wordSplitCharacter: string[]): any;
    static lastIndexOfAny(text: string, wordSplitCharacter: string[]): number;
    /**
     * Convert ARGB to RGB
     * @private
     * @param {string} color accepts a color string
     * @returns {string} returns a string value
     */
    static convertArgbToRgb(color: string): string;
    static convertRgbToHex(val: number): string;
    /**
     * @returns {number} returns a number
     * @param {string} input accepts a string value as an input
     * @private
     */
    static getNumberFromString(input: string): number;
    static convertHexToRgb(colorCode: string): any;
    static addCssStyle(css: string): void;
    /**
     * @returns {HTMLElement[]} returns an array of HTML elements
     * @param {NodeListOf<HTMLElement>} nodeList accepts a list of HTML elements
     * @public
     */
    static convertNodeListToArray(nodeList: NodeListOf<HTMLElement>): HTMLElement[];
    static getHighlightColorCode(highlightColor: HighlightColor): string;
    static isVeryDark(backColor: string): boolean;
    static getColor(color: string): string;
    static getTextVerticalAlignment(textVerticalAlignment: number | VerticalAlignment): VerticalAlignment;
    static convertPointToPixel(point: number): number;
    static convertPixelToPoint(pixel: number): number;
    static isLinkedFieldCharacter(inline: ElementBox): boolean;
    /**
     * Removes white space in a string.
     *
     * @private
     * @param {string} text - Specifies text to trim.
     * @returns {string} - Returns modified text.
     */
    static removeSpace(text: string): string;
    /**
     * Trims white space at start of the string.
     *
     * @private
     * @param {string} text - Specifies text to trim.
     * @returns {string} - Returns modified text.
     */
    static trimStart(text: string): string;
    /**
     * Trims white space at end of the string.
     *
     * @private
     * @param {string} text - Specifies text to trim.
     * @returns {string} - Returns modified text.
     */
    static trimEnd(text: string): string;
    /**
     * Checks whether string ends with whitespace.
     * @private
     * @param {string} text - Specifies the text.
     * @returns {boolean} - Returns true if text ends with specified text.
     */
    static endsWith(text: string): boolean;
    static addSpace(length: number): string;
    static getBoolValue(value: boolean): number;
    static getBoolInfo(value: boolean, keywordIndex: number): any;
    static parseBoolValue(value: any): boolean;
    static getBaselineAlignmentEnumValue(baselineAlignment: BaselineAlignment): number;
    static getFontHintTypeEnumValue(fontHintType: FontHintType): number;
    static getUnderlineEnumValue(underline: Underline): number;
    static getStrikeThroughEnumValue(strikethrough: Strikethrough): number;
    static getHighlightColorEnumValue(highlightColor: HighlightColor): number;
    static getBiDirectionalOverride(biDirectionalOverride: BiDirectionalOverride): number;
    static getBreakClearType(breakClearType: BreakClearType): number;
    static getOutlineLevelEnumValue(outlineLevel: OutlineLevel): number;
    static getTextAlignmentEnumValue(textAlignment: TextAlignment): number;
    static getLineStyleEnumValue(lineStyle: LineStyle): number;
    static getLineSpacingTypeEnumValue(lineSpacing: LineSpacingType): number;
    static writeBorder(wBorder: WBorder, keywordIndex: number): any;
    static writeBorders(wBorders: WBorders, keywordIndex: number): any;
    static writeParagraphFormat(paragraphFormat: WParagraphFormat, isInline: boolean, format: WParagraphFormat, keywordIndex?: number): void;
    static writeCharacterFormat(characterFormat: any, isInline: boolean, format: WCharacterFormat, keywordIndex?: number, isWriteAllValues?: boolean): void;
    static isThemeFont(fontName: string): boolean;
    static toWriteInline(format: WCharacterFormat, propertyName: string): any;
    static round(value: number, decimalDigits: number): number;
    static removeInvalidXmlChars(text: string): string;
    static commentInlines(ctext: string, mentions: FieldSettingsModel[], keywordIndex: number): any;
    static parseCommentAsText(comment: CommentElementBox): string;
    private static getEmailIdByName;
    private static serializeMentions;
    static reverseString(text: string): string;
    static formatClippedString(base64ImageString: string): ImageFormatInfo;
    /**
     * @private
     * @param sourceString
     * @param startString
     * @returns
     */
    static startsWith(sourceString: string, startString: string): boolean;
    static formatText(format: string, value: string): string;
    static formatNumber(format: string, value: string): string;
    static formatDate(format: string, value: string): string;
    private static capitaliseFirst;
    private static lowerFirstChar;
    private static capitaliseFirstInternal;
    static getModifiedDate(date: string): string;
    static getUtcDate(dateTime?: Date): string;
    static getLocaleDate(date: string): Date;
    static getCompatibilityModeValue(compatibilityMode: number): string;
    /**
     * @private
     * @returns {string} - Returns the unique id for document editor.
     */
    static getUniqueElementId(): string;
    /**
     * @private
     * @param element - element to be splitted of space
     * @param fromStart - weather to removed space from start or end
     * @returns {Boolean} - is the input element is splitted
     */
    static splitSpaceInTextElementBox(element: TextElementBox, fromStart: boolean): void;
    private static getTextIndexAfterWhitespace;
    /**
     * @private
     * @param {TextElementBox} textElementBox text element box to split the text based on max text length.
     * @param {LineWidget} lineWidget  line widget to add the splitted text element box.
     * @returns {void}
     */
    static splitWordByMaxLength(textElementBox: TextElementBox, lineWidget: LineWidget, isInitialParsing?: boolean): void;
}
/**
 * @private
 */
export declare class Point {
    private xIn;
    private yIn;
    x: number;
    y: number;
    constructor(xPosition: number, yPosition: number);
    copy(point: Point): void;
    /**
     * Destroys the internal objects maintained.
     *
     * @returns {void}
     */
    destroy(): void;
}
/**
 * @private
 */
export declare class Base64 {
    private keyStr;
    encodeString(input: string): string;
    private unicodeEncode;
    decodeString(input: string): Uint8Array;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
}
/**
 * TextSearchResultInfo
 */
export interface TextSearchResultInfo {
    startOffset: string;
    endOffset: string;
}
/**
 * ListSearchResultInfo
 */
export interface ListSearchResultInfo {
    paragraph: ParagraphWidget;
    listId: number;
}
/**
 * Locked region selection info.
 */
export interface LockSelectionInfo {
    /**
     * Selection start of the locked region.
     */
    start: string;
    /**
     * Selection end of the locked region.
     */
    end: string;
    /**
     * Specifies collaborative editing room name.
     */
    roomName: string;
    /**
     * Specifies author of the locked region.
     */
    author: string;
    /**
     * Version of the collaborative editing session.
     */
    version: number;
    /**
     * @private
     */
    previousLockInfo?: LockSelectionInfo;
}
/**
 * Document Editor data
 */
export interface CollaborativeEditingEventArgs {
    /**
     * Specifies current action in collaborative session.
     */
    action: CollaborativeEditingAction;
    /**
     * Specifies selection info.
     */
    selectionInfo?: LockSelectionInfo;
    /**
     * Collaborative session version.
     */
    version?: number;
    /**
     * Specifies modified data in SFDT format.
     */
    data?: string;
    /**
     * Specifies author of the edit action.
     */
    author?: string;
    /**
     * Specifies collaborative editing room name.
     */
    roomName?: string;
}
/**
 * @private
 */
export interface SubWidthInfo {
    trimmedSpaceWidth: number;
    subWidth: number;
    spaceCount: number;
    totalSpaceCount: number;
}
/**
 * @private
 */
export interface LineElementInfo {
    topMargin: number;
    bottomMargin: number;
    addSubWidth: boolean;
    whiteSpaceCount: number;
}
/**
 * @private
 */
export interface Color {
    r: number;
    g: number;
    b: number;
}
/**
 * @private
 */
export interface CaretHeightInfo {
    height: number;
    topMargin: number;
    isItalic?: boolean;
}
/**
 * @private
 */
export interface SizeInfo {
    width: number;
    height: number;
    topMargin: number;
    bottomMargin: number;
}
/**
 * @private
 */
export interface FirstElementInfo {
    element: ElementBox;
    left: number;
}
/**
 * @private
 */
export interface IndexInfo {
    index: string;
}
/**
 * @private
 */
export interface ImagePointInfo {
    selectedElement: HTMLElement;
    resizePosition: string;
}
/**
 * @private
 */
export interface HyperlinkTextInfo {
    displayText: string;
    isNestedField: boolean;
    format: WCharacterFormat;
}
/**
 * @private
 */
export interface BodyWidgetInfo {
    bodyWidget: BodyWidget;
    index: number;
}
/**
 * @private
 */
export interface ParagraphInfo {
    paragraph: ParagraphWidget;
    offset: number;
}
/**
 * @private
 */
export interface ErrorInfo {
    errorFound: boolean;
    elements: any[];
}
/**
 * @private
 */
export interface SpaceCharacterInfo {
    width: number;
    wordLength: number;
    isBeginning: boolean;
}
/**
 * @private
 */
export interface SpecialCharacterInfo {
    beginningWidth: number;
    endWidth: number;
    wordLength: number;
}
/**
 * @private
 */
export interface ContextElementInfo {
    element: ElementBox;
    text: string;
}
/**
 * @private
 */
export interface WordSpellInfo {
    hasSpellError: boolean;
    isElementPresent: boolean;
}
/**
 * @private
 */
export interface TextInLineInfo {
    elementsWithOffset: Dictionary<TextElementBox, number>;
    fullText: string;
}
/**
 * @private
 */
export interface CellInfo {
    start: number;
    end: number;
}
/**
 * @private
 */
export interface FieldCodeInfo {
    isNested: boolean;
    isParsed: boolean;
}
/**
 * @private
 */
export interface LineInfo {
    line: LineWidget;
    offset: number;
}
/**
 * @private
 */
export interface ElementInfo {
    element: ElementBox;
    index: number;
}
/**
 * @private
 */
export interface RevisionMatchedInfo {
    element: ElementBox;
    isMatched: boolean;
}
/**
 * @private
 */
export interface RevisionInfo {
    type: RevisionType;
    color: string;
}
/**
 * @private
 */
export interface MatchResults {
    matches: RegExpExecArray[];
    elementInfo: Dictionary<TextElementBox, number>;
    textResults: TextSearchResults;
}
/**
 * @private
 */
export interface TextPositionInfo {
    element: ElementBox;
    index: number;
    caretPosition: Point;
    isImageSelected: boolean;
}
/**
 * @private
 */
export interface ShapeInfo {
    element: ElementBox;
    caretPosition: Point;
    isShapeSelected: boolean;
    isInShapeBorder: boolean;
}
/**
 * @private
 */
export interface PageInfo {
    height: number;
    width: number;
    viewerWidth: number;
    viewerHeight: number;
}
/**
 * @private
 */
export interface CanvasInfo {
    height: number;
    width: number;
    viewerWidth: number;
    viewerHeight: number;
    containerHeight: number;
    containerWidth: number;
}
/**
 * @private
 */
export interface CellCountInfo {
    count: number;
    cellFormats: WCellFormat[];
}
/**
 * @private
 */
export interface BlockInfo {
    node: Widget;
    position: IndexInfo;
}
/**
 * @private
 */
export interface WidthInfo {
    minimumWordWidth: number;
    maximumWordWidth: number;
}
/**
 * @private
 */
export interface RtlInfo {
    isRtl: boolean;
    id: number;
}
/**
 * @private
 */
export interface ImageFormatInfo {
    extension: string;
    formatClippedString: string;
}
/**
 * @private
 */
export interface ImageStringInfo {
    imageString: string;
    metaFileImageString: string;
}
/**
 * @private
 */
export interface PositionInfo {
    startPosition: TextPosition;
    endPosition: TextPosition;
}
/**
 * @private
 */
export interface BorderRenderInfo {
    skipTopBorder: boolean;
    skipBottomBorder: boolean;
}
/**
 * @private
 */
export interface LineCountInfo {
    lineWidget: LineWidget;
    lineCount: number;
}
/**
 * Specifies the field information.
 */
export interface FieldInfo {
    /**
     *  Specifies the field code.
     */
    code: string;
    /**
     *  Specifies the field result.
     */
    result: string;
}
/**
 * Text form field info
 */
export interface TextFormFieldInfo {
    /**
     * Specifies text form field type.
     */
    type: TextFormFieldType;
    /**
     * Text form field default value.
     */
    defaultValue: string;
    /**
     * Text form field format
     */
    format: string;
    /**
     * Maximum text length.
     */
    maxLength: number;
    /**
     * Enable or disable form field.
     */
    enabled: boolean;
    /**
     * Tooltip text.
     */
    helpText: string;
    /**
     * Specifies the name of the form field.
     *
     * > If a form field already exists in the document with the new name specified, the old form field name property will be cleared and it will not be accessible. Ensure the new name is unique.
     */
    name?: string;
}
/**
 * CheckBox form field info
 */
export interface CheckBoxFormFieldInfo {
    /**
     * CheckBox form field size type.
     */
    sizeType: CheckBoxSizeType;
    /**
     * CheckBox form field size.
     */
    size: number;
    /**
     * CheckBox form field default value.
     */
    defaultValue: boolean;
    /**
     * Enable or disable form field.
     */
    enabled: boolean;
    /**
     * Tooltip text.
     */
    helpText: string;
    /**
     * Specifies the name of the form field.
     *
     * > If a form field already exists in the document with the new name specified, the old form field name property will be cleared and it will not be accessible. Ensure the new name is unique.
     */
    name?: string;
}
/**
 * DropDown form field info
 */
export interface DropDownFormFieldInfo {
    /**
     * DropDown items
     */
    dropdownItems: string[];
    /**
     * Enable or disable form field.
     */
    enabled: boolean;
    /**
     * Tooltip text.
     */
    helpText: string;
    /**
     * Specifies the name of the form field.
     *
     * > If a form field already exists in the document with the new name specified, the old form field name property will be cleared and it will not be accessible. Ensure the new name is unique.
     */
    name?: string;
}
/**
 * @private
 */
export interface BorderInfo {
    border: WBorder;
    width: number;
}
/**
 * @private
 */
export interface LtrRtlTextInfo {
    value?: boolean;
}
/**
 * @private
 */
export interface FootNoteWidgetsInfo {
    footNoteWidgets: BodyWidget[];
    toBodyWidget: BodyWidget;
    fromBodyWidget: BodyWidget;
}
/**
 * @private
 */
export interface SelectedCommentInfo {
    commentStartInfo: CommentCharacterElementBox[];
    commentEndInfo: CommentCharacterElementBox[];
}
/**
 * @private
 */
export interface AbsolutePositionInfo {
    /**
     * Selection position.
     * @private
     */
    position?: number;
    /**
     * Specifies whether the specfic element is reached or not.
     * @private
     */
    done: boolean;
}
/**
 * @private
 */
export interface FieldResultInfo {
    /**
     * Specifies the field result length.
     * @private
     */
    length: number;
}
/**
 * @private
 */
export interface AbsoluteParagraphInfo {
    offset: number;
    currentLength: number;
    paragraph: ParagraphWidget;
    rowOrCellIndex?: number;
    tableWidget?: TableWidget;
    rowWidget?: TableRowWidget;
    cellWidget?: TableCellWidget;
}
/**
 * @private
 */
export declare class WrapPosition {
    x: number;
    width: number;
    readonly right: number;
    constructor(x: number, width: number);
}
/**
 * Specifies the External font information.
 * @private
 */
export interface ExternalFontInfo {
    /**
     *  Specifies the font url.
     */
    fontFamily: string;
    /**
     *  Specifies the font name.
     */
    src: string;
}
