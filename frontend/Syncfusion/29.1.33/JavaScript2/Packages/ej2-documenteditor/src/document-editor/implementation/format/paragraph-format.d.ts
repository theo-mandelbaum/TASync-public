import { WBorders } from './borders';
import { LineSpacingType, TextAlignment, OutlineLevel, TabJustification, TabLeader } from '../../base/types';
import { WUniqueFormat } from '../../base/unique-format';
import { WListFormat } from './list-format';
import { WStyle } from './style';
import { DocumentHelper } from '../viewer';
/**
 * @private
 */
export declare class WTabStop {
    private positionIn;
    private deletePositionIn;
    private justification;
    private leader;
    position: number;
    deletePosition: number;
    tabJustification: TabJustification;
    tabLeader: TabLeader;
    clone(): WTabStop;
    equals(tab: WTabStop): boolean;
    destroy(): void;
}
/**
 * @private
 */
export declare class WParagraphFormat {
    uniqueParagraphFormat: WUniqueFormat;
    private static uniqueParagraphFormats;
    private static uniqueFormatType;
    borders: WBorders;
    listFormat: WListFormat;
    ownerBase: Object;
    baseStyle: WStyle;
    tabs: WTabStop[];
    getUpdatedTabs(): WTabStop[];
    private getTabStopsFromListFormat;
    private isValidTabStop;
    private hasTabStop;
    leftIndent: number;
    rightIndent: number;
    firstLineIndent: number;
    beforeSpacing: number;
    afterSpacing: number;
    spaceBeforeAuto: boolean;
    spaceAfterAuto: boolean;
    lineSpacing: number;
    lineSpacingType: LineSpacingType;
    textAlignment: TextAlignment;
    keepWithNext: boolean;
    keepLinesTogether: boolean;
    widowControl: boolean;
    outlineLevel: OutlineLevel;
    bidi: boolean;
    contextualSpacing: boolean;
    constructor(node?: Object);
    private getListFormatParagraphFormat;
    /**
    * @private
    */
    getListPargaraphFormat(property: string): WParagraphFormat;
    getPropertyValue(property: string): Object;
    private getDefaultValue;
    /**
    * @private
    */
    getDocumentParagraphFormat(): WParagraphFormat;
    /**
    * @private
    */
    getDocumentHelperObject(): DocumentHelper;
    private setPropertyValue;
    private initializeUniqueParagraphFormat;
    private addUniqueParaFormat;
    private static getPropertyDefaultValue;
    clearIndent(): void;
    clearPropertyValue(property: string): void;
    clearFormat(): void;
    destroy(): void;
    copyFormat(format: WParagraphFormat): void;
    updateUniqueParagraphFormat(format: WParagraphFormat): void;
    cloneFormat(): WParagraphFormat;
    /**
     *
     * @private
     */
    hasValue(property: string): boolean;
    static clear(): void;
    applyStyle(baseStyle: WStyle): void;
    getValue(property: string): Object;
    /**
     * Assinging the value for style dialog
     * @private
     * @returns {void}
     */
    assignFormat(format: WParagraphFormat, isStyle?: boolean): void;
}
