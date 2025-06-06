import { IToolbarStatus } from './interface';
/**
 * @returns {void}
 * @hidden
 */
export declare function isIDevice(): boolean;
/**
 * @param {Element} editableElement - specifies the editable element.
 * @param {string} selector - specifies the string values.
 * @returns {void}
 * @hidden
 */
export declare function setEditFrameFocus(editableElement: Element, selector: string): void;
/**
 * @param {string} value - specifies the string value
 * @returns {void}
 * @hidden
 */
export declare function updateTextNode(value: string): string;
/**
 * @param {Node} startChildNodes - specifies the node
 * @returns {void}
 * @hidden
 */
export declare function getLastTextNode(startChildNodes: Node): Node;
/**
 * @returns {void}
 * @hidden
 */
export declare function getDefaultHtmlTbStatus(): IToolbarStatus;
/**
 * @returns {void}
 * @hidden
 */
export declare function getDefaultMDTbStatus(): IToolbarStatus;
/**
 * @param {Range} range - specifies the range
 * @param {Node} parentNode - specifies the parent node
 * @returns {void}
 * @hidden
 */
export declare function nestedListCleanUp(range: Range, parentNode: Node): void;
/**
 * Method to scroll the content to the cursor position
 *
 * @param {Document} document - specifies the document.
 * @param {HTMLElement | HTMLBodyElement} inputElement - specifies the input element.
 * @returns {void}
 */
export declare function scrollToCursor(document: Document, inputElement: HTMLElement | HTMLBodyElement): void;
/**
 * Inserts items at a specific index in an array.
 *
 * @template T
 * @param {Array<T>} oldArray - Specifies the old array.
 * @param {Array<T>} newArray - Specifies the elements to insert.
 * @param {number} indexToInsert - Specifies the index to insert.
 * @returns {Array<T>} - Returns the array after inserting the elements.
 */
export declare function insertItemsAtIndex<T>(oldArray: Array<T>, newArray: Array<T>, indexToInsert: number): Array<T>;
/**
 * Wrapper function to remove a class from the element and remove the attribute if the class is empty.
 *
 * @param  {Element[]|NodeList} elements - An array of elements that need to remove a list of classes
 * @param  {string|string[]} classes - String or array of string that need to add an individual element as a class
 *
 * @returns {Element[]|NodeList} - Returns the array of elements after removing the class.
 * @private
 */
export declare function removeClassWithAttr(elements: Element[] | NodeList, classes: string | string[]): Element[] | NodeList;
