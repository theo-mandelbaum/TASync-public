/**
 * IncrementalSearch module file
 */
export declare type SearchType = 'StartsWith' | 'Equal' | 'EndsWith' | 'Contains';
/**
 * Search and focus the list item based on key code matches with list text content.
 *
 * @param {number} keyCode - Specifies the key code which pressed on keyboard events.
 * @param {HTMLElement[]} items - Specifies an array of HTMLElement, from which matches find has done.
 * @param {number} selectedIndex - Specifies the selected item in list item, so that search will happen after selected item otherwise it will do from initial.
 * @param {boolean} ignoreCase - Specifies the case consideration when search has done.
 * @param {string} elementId - Specifies the list element ID.
 * @param {boolean} [queryStringUpdated] - Optional parameter.
 * @param {string} [currentValue] - Optional parameter.
 * @param {boolean} [isVirtual] - Optional parameter.
 * @param {boolean} [refresh] - Optional parameter.
 * @returns {Element} Returns list item based on key code matches with list text content.
 */
export declare function incrementalSearch(keyCode: number, items: HTMLElement[], selectedIndex: number, ignoreCase: boolean, elementId: string, queryStringUpdated?: boolean, currentValue?: string, isVirtual?: boolean, refresh?: boolean): Element;
/**
 * Search the list item based on given input value matches with search type.
 *
 * @param {string} inputVal - Specifies the given input value.
 * @param {HTMLElement[]} items - Specifies the list items.
 * @param {SearchType} searchType - Specifies the filter type.
 * @param {boolean} [ignoreCase=true] - Specifies the case sensitive option for search operation.
 * @param {(string | number | boolean | { [key: string]: Object })[]} [dataSource] - Specifies the data source.
 * @param {{ text: string, value: string }} [fields] - Specifies the fields.
 * @param {string} [type] - Specifies the type.
 * @returns {{ item: Element | null, index: number | null }} Returns the search matched items.
 */
export declare function Search(inputVal: string, items: HTMLElement[], searchType: SearchType, ignoreCase?: boolean, dataSource?: (string | number | boolean | {
    [key: string]: Object;
})[], fields?: any, type?: string, ignoreAccent?: boolean): {
    item: Element | null;
    index: number | null;
};
/**
 * @param {string} value - The value to escape.
 * @returns {string} Returns the escaped string.
 */
export declare function escapeCharRegExp(value: string): string;
/**
 * @param {string} elementId - The ID of the list element.
 * @returns {void}
 */
export declare function resetIncrementalSearchValues(elementId: string): void;
