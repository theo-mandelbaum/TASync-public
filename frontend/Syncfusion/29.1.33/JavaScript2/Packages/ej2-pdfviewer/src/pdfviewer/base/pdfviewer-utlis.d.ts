import { PdfFontStyle, PdfTrueTypeFont } from '@syncfusion/ej2-pdf';
import { PdfViewer } from '../index';
/**
 *
 * @hidden
 */
export declare class PdfViewerUtils {
    /**
     * It returns a boolean value.
     *
     * @param {string} text - It get the fontcollection.
     * @param {PdfTrueTypeFont} font - Get the font.
     * @private
     * @returns {boolean} - Return the boolean.
     */
    static isSupportedFont(text: string, font: PdfTrueTypeFont): boolean;
    /**
     * Checks if the given character is an escape sequence.
     *
     * @param {string} char - The character to be checked.
     * @private
     * @returns {boolean} - Returns true if the character is an escape sequence, otherwise false.
     */
    private static hasEscapeSequences;
    /**
     * It convert byte array to base64 string.
     *
     * @param {any} fontStream - It get the byte array.
     * @private
     * @returns {any} - Return the base64 string.
     */
    static processFontStream(fontStream: any): any;
    /**
     * @param {string} customFonts - Get the custom fonts.
     * @param {string} url - Get the url.
     * @returns {any} - It's return fontCollection
     * @private
     */
    static fetchCustomFonts(customFonts: string[], url: string): Promise<{
        [key: string]: Uint8Array;
    }>;
    /**
     * @param {any} fontCollection - Get the custom fonts collection.
     * @param {string} text - Get the font family.
     * @param {number} fontSize - Get the font size.
     * @param {PdfFontStyle} fontStyle - Get the font style.
     * @returns {any} - It's return fontCollection
     * @private
     */
    static tryGetFontFromKeys(fontCollection: {
        [key: string]: any;
    }, text: string, fontSize: number, fontStyle?: PdfFontStyle): (PdfTrueTypeFont | null);
    /**
     * @param {any} fallbackFontCollection - Get the custom fonts collection.
     * @param {string} fontFamily - Get the font family.
     * @returns {any} - It's return fontCollection
     * @private
     */
    static getFontKey(fallbackFontCollection: {
        [key: string]: any;
    }, fontFamily: string): string | undefined;
    /**
     * @param {string} color - Gets the color in hex RGBA pattern.
     * @returns {boolean} - It's return boolean
     * @private
     */
    static isHexRGBAAndTransparent(color: string): boolean;
    /**
     * @param {string} color - Gets the background color with transparency.
     * @returns {string} - It's return background color with transparency.
     * @private
     */
    static setTransparencyToHex(color: string): string;
    /**
     * @param {string} color - Gets the background color without transparency.
     * @returns {string} - It's return background color without transparency.
     * @private
     */
    static removeAlphaValueFromHex(color: string): string;
    private static fetchData;
    private static convertByteArrayToBase64;
    /**
     * @private
     * @param {number} value - It describes about the value
     * @returns {number} - number
     */
    static convertPixelToPoint(value: number): number;
    /**
     * Method to deep-shallow copy an object, only if it is a Proxy
     *
     * @private
     * @param {any} obj - Get the data of the next queued task.
     * @returns {any} - The copied object if it was a Proxy; otherwise, returns the original object.
     */
    static cloneProxy(obj: any): any;
    /**
     * Method to check if a value is a plain object (Proxy detection)
     *
     * @private
     * @param {any} value - Get the data of the next queued task.
     * @returns {boolean} - Returns true if the value is a Proxy; otherwise, false.
     */
    static isProxy(value: any): boolean;
    /**
     * @private
     * @returns {string} - string
     */
    static createGUID(): string;
    private static getRandomNumber;
}
/**
 *
 * @hidden
 */
export declare class PdfViewerSessionStorage {
    private localStorage;
    /**
     * @private
     */
    enableLocalStorage: boolean;
    /**
     * @private
     */
    documentId: string;
    constructor(enableLocalStorage: boolean);
    /**
     * Method to set an item in either session or local storage
     *
     * @param {string} key - Get the key.
     * @param {string} value - Get the value.
     * @private
     * @returns {void}
     */
    setItem(key: string, value: string): void;
    /**
     * Method to get an item from either session or local storage
     *
     * @param {string} key - Get the key.
     * @private
     * @returns {any} - It's return the value.
     */
    getItem(key: string): string | null;
    /**
     * Method to remove an item from either session or local storage
     *
     * @param {string} key - Get the key.
     * @private
     * @returns {void}
     */
    removeItem(key: string): void;
    /**
     * Method to return the length of the storage
     *
     * @private
     * @returns {number} - return the length of the session.
     */
    getSessionLength(): number;
    /**
     * Method to return the key at the specified index
     *
     * @param {number} index - Get the index.
     * @private
     * @returns {any} - It's return the key value.
     */
    getKey(index: number): string | null;
    /**
     * Method to return the window session storage size.
     *
     * @private
     * @returns {any} - It's return the key value.
     */
    getWindowSessionStorageSize(): any;
    /**
     * Method to move all items from sessionStorage to localStorage
     *
     * @param {boolean} enableLocalStorage - Get the enableLocalStorage value.
     * @private
     * @returns {void}
     */
    migrateToLocalStorage(enableLocalStorage: boolean): void;
    /**
     * Method to clear all viewer items from sessionStorage and localStorage.
     *
     * @private
     * @returns {void}
     */
    clear(): void;
    private getRemovingItems;
}
/**
 *
 * @hidden
 */
export declare enum TaskPriorityLevel {
    High = 1,
    Medium = 2,
    Low = 3
}
/**
 *
 * @hidden
 */
export declare class PdfiumTaskScheduler {
    private worker;
    private taskQueue;
    private isProcessing;
    private pdfViewer;
    private functionManager;
    constructor(workerScript: any, pdfViewer: PdfViewer);
    /**
     * Method to add the given task into request for the worker
     *
     * @param {any} taskData - Get the task data.
     * @param {TaskPriorityLevel} priority - Get the priority level for the task.
     * @private
     * @returns {void}
     */
    addTask(taskData: any, priority: TaskPriorityLevel): void;
    /**
     * Method to request posted for the queue task
     *
     * @returns {void}
     */
    private processQueue;
    /**
     * Method to call on message for the worker
     *
     * @param {string} key - Get the key value for the method function.
     * @param {any} method - Get the method for the onmessage.
     * @private
     * @returns {void}
     */
    onMessage(key: string, method: (event: any) => void): void;
    /**
     * Method to terminate the worker
     *
     * @private
     * @returns {void}
     */
    terminate(): void;
}
