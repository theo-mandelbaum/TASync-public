import { Dictionary } from '../../base/dictionary';
import { ListLevelPattern, FollowCharacterType } from '../../base/types';
import { WCharacterFormat } from '../format/character-format';
import { WParagraphFormat } from '../format/paragraph-format';
import { WAbstractList } from './abstract-list';
import { WLevelOverride } from './level-override';
/**
 * @private
 */
export declare class WListLevel {
    static dotBullet: string;
    static squareBullet: string;
    static arrowBullet: string;
    static circleBullet: string;
    private uniqueListLevel;
    private static uniqueListLevels;
    private static uniqueFormatType;
    paragraphFormat: WParagraphFormat;
    characterFormat: WCharacterFormat;
    ownerBase: WAbstractList | WLevelOverride;
    listLevelPattern: ListLevelPattern;
    followCharacter: FollowCharacterType;
    startAt: number;
    numberFormat: string;
    paraStyleName: string;
    restartLevel: number;
    /**
     * Gets the boolean that specifies that the format for the numbering at this level should be in the decimal format.
     */
    /**
    * Sets the boolean that specifies that the format for the numbering at this level should be in the decimal format.
    * @param {boolean} isLegalStyleNumbering - Specifies the value.
    */
    isLegalStyleNumbering: boolean;
    constructor(node: WAbstractList | WLevelOverride);
    getPropertyValue(property: string): Object;
    setPropertyValue(property: string, value: Object): void;
    initializeUniqueWListLevel(property: string, propValue: object): void;
    addUniqueWListLevel(property: string, modifiedProperty: string, propValue: object, uniqueCharFormatTemp: Dictionary<number, object>): void;
    static getPropertyDefaultValue(property: string): Object;
    /**
     * Disposes the internal objects which are maintained.
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @private
     * @returns {void}
     */
    clearFormat(): void;
    static clear(): void;
    clone(node: WAbstractList | WLevelOverride): WListLevel;
}
