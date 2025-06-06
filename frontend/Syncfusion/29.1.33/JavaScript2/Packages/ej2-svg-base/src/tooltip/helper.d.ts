import { TextStyleModel } from './tooltip-model';
/**
 * Function to measure the height and width of the text.
 *
 * @private
 * @param {string} text To get a text
 * @param {FontModel} font To get a font of the text
 * @returns {Size} measureText
 */
export declare function measureText(text: string, font: TextStyleModel, themeFontStyle?: TextStyleModel, isHeader?: boolean): Size;
/** @private */
export declare function withInAreaBounds(x: number, y: number, areaBounds: Rect, width?: number, height?: number): boolean;
/** @private */
export declare function findDirection(rX: number, rY: number, rect: Rect, arrowLocation: TooltipLocation, arrowPadding: number, top: boolean, bottom: boolean, left: boolean, tipX: number, tipY: number, controlName?: string): string;
/** @private */
export declare class Size {
    height: number;
    width: number;
    constructor(width: number, height: number);
}
/** @private */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
export declare class Side {
    isRight: boolean;
    isBottom: boolean;
    constructor(bottom: boolean, right: boolean);
}
/** @private */
export declare class CustomizeOption {
    id: string;
    constructor(id?: string);
}
/** @private */
export declare class TextOption extends CustomizeOption {
    anchor: string;
    text: string | string[];
    transform: string;
    x: number;
    y: number;
    baseLine: string;
    labelRotation: number;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string | string[], transform?: string, baseLine?: string, labelRotation?: number);
}
/** @private */
export declare function getElement(id: string): Element;
/** @private */
export declare function removeElement(id: string): void;
/** @private */
export interface IShapes {
    renderOption?: Object;
    functionName?: string;
}
/** @private */
export declare function drawSymbol(location: TooltipLocation, shape: string, size: Size, url: string, options: PathOption, role: string, label: string): Element;
/** @private */
export declare function calculateShapes(location: TooltipLocation, size: Size, shape: string, options: PathOption, url: string): IShapes;
/** @private */
export declare class PathOption extends CustomizeOption {
    opacity: number;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    d: string;
    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string);
}
/** @private */
export declare function textElement(options: TextOption, font: TextStyleModel, color: string, parent: HTMLElement | Element, themeStyle?: TextStyleModel): Element;
export declare class TooltipLocation {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
