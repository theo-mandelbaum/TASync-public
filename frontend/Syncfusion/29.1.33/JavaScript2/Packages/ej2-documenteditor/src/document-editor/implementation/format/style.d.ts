import { StyleType } from '../../base/index';
import { WParagraphFormat } from './paragraph-format';
import { WCharacterFormat } from './character-format';
/**
 * @private
 */
export declare abstract class WStyle {
    ownerBase: Object;
    type: StyleType;
    next: WStyle;
    basedOn: WStyle;
    link: WStyle;
    name: string;
}
/**
 * @private
 */
export declare class WParagraphStyle extends WStyle {
    /**
     * Specifies the paragraph format
     *
     * @default undefined
     */
    paragraphFormat: WParagraphFormat;
    /**
     * Specifies the character format
     *
     * @default undefined
     */
    characterFormat: WCharacterFormat;
    constructor(node?: Object);
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * Disposes the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
    copyStyle(paraStyle: WParagraphStyle): void;
}
/**
 * @private
 */
export declare class WCharacterStyle extends WStyle {
    /**
     * Specifies the character format
     *
     * @default undefined
     */
    characterFormat: WCharacterFormat;
    constructor(node?: Object);
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * Disposes the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
    copyStyle(charStyle: WCharacterStyle): void;
}
/**
 * @private
 */
export declare class WTableStyle extends WStyle {
    constructor(node?: Object);
    /**
     * Disposes the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
}
/**
 * @private
 */
export declare class WStyles {
    collection: Object[];
    readonly length: number;
    remove(item: WParagraphStyle | WCharacterStyle): void;
    push(item: WParagraphStyle | WCharacterStyle): number;
    getItem(index: number): Object;
    indexOf(item: WParagraphStyle | WCharacterStyle): number;
    contains(item: WParagraphStyle | WCharacterStyle): boolean;
    clear(): void;
    findByName(name: string, type?: StyleType): Object;
    getStyleNames(type?: StyleType): string[];
    getStyles(type?: StyleType): Object[];
    /**
     * Disposes the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
}
