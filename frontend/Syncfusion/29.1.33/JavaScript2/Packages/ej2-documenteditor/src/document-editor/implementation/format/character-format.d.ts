import { Underline, HighlightColor, BaselineAlignment, Strikethrough, BiDirectionalOverride, FontHintType } from '../../base/types';
import { WUniqueFormat } from '../../base/unique-format';
import { WStyle } from './style';
import { Revision } from '../track-changes/track-changes';
/**
 * @private
 */
export declare class WCharacterFormat {
    uniqueCharacterFormat: WUniqueFormat;
    private static uniqueCharacterFormats;
    private static uniqueFormatType;
    ownerBase: Object;
    baseCharStyle: WStyle;
    /**
     * @private
     */
    removedIds: string[];
    /**
     * @private
     */
    revisions: Revision[];
    bold: boolean;
    italic: boolean;
    fontSize: number;
    characterSpacing: number;
    scaling: number;
    fontFamily: string;
    underline: Underline;
    underlineColor: string;
    fontHintType: FontHintType;
    strikethrough: Strikethrough;
    baselineAlignment: BaselineAlignment;
    highlightColor: HighlightColor;
    fontColor: string;
    bidi: boolean;
    localeIdBidi: number;
    localeIdFarEast: number;
    localeIdAscii: number;
    bdo: BiDirectionalOverride;
    boldBidi: boolean;
    italicBidi: boolean;
    fontSizeBidi: number;
    fontFamilyBidi: string;
    allCaps: boolean;
    Lowercase: boolean;
    Uppercase: boolean;
    SentenceCase: boolean;
    ToggleCase: boolean;
    CapitalizeEachWord: boolean;
    complexScript: boolean;
    hidden: boolean;
    fontFamilyFarEast: string;
    fontFamilyAscii: string;
    fontFamilyNonFarEast: string;
    constructor(node?: Object);
    getPropertyValue(property: string): Object;
    private getDefaultValue;
    private documentCharacterFormat;
    private checkBaseStyle;
    private checkCharacterStyle;
    private setPropertyValue;
    private initializeUniqueCharacterFormat;
    private addUniqueCharacterFormat;
    private static getPropertyDefaultValue;
    isEqualFormat(format: WCharacterFormat): boolean;
    isSameFormat(format: WCharacterFormat): boolean;
    cloneFormat(): WCharacterFormat;
    hasValue(property: string): boolean;
    clearFormat(): void;
    destroy(): void;
    copyFormat(format: WCharacterFormat): void;
    isEqualTocFormat(format: WCharacterFormat): boolean;
    copyTocFormat(format: WCharacterFormat): void;
    updateUniqueCharacterFormat(format: WCharacterFormat): void;
    static clear(): void;
    applyStyle(baseCharStyle: WStyle): void;
    getValue(property: string): Object;
    mergeFormat(format: WCharacterFormat): void;
    /**
     * Assinging the value for style dialog
     * @private
     * @returns {void}
     */
    assignFormat(format: WCharacterFormat): void;
    hasValueWithParent(property: string): boolean;
}
