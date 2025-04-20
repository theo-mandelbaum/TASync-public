import { NodeSelection } from './../../selection/index';
export declare const markerClassName: {
    [key: string]: string;
};
/**
 * DOMNode internal plugin
 *
 * @hidden
 * @deprecated
 */
export declare class DOMNode {
    private parent;
    private currentDocument;
    private nodeSelection;
    private tableSelection;
    /**
     * Constructor for creating the DOMNode plugin
     *
     * @param {Element} parent - specifies the parent element
     * @param {Document} currentDocument - specifies the current document.
     * @hidden
     * @deprecated
     */
    constructor(parent: Element, currentDocument: Document);
    /**
     * contents method
     *
     * @param {Element} element - specifies the element.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    contents(element: Element): Node[];
    /**
     * isBlockNode method
     *
     * @param {Element} element - specifies the node element.
     * @returns {boolean} - sepcifies the boolean value
     * @hidden
     * @deprecated
     */
    isBlockNode(element: Element): boolean;
    /**
     * isLink method
     *
     * @param {Element} element - specifies the element
     * @returns {boolean} -  specifies the boolean value
     * @hidden
     * @deprecated
     */
    isLink(element: Element): boolean;
    /**
     * blockParentNode method
     *
     * @param {Element} element - specifies the element
     * @returns {Element} - returns the element value
     * @hidden
     * @deprecated
     */
    blockParentNode(element: Element): Element;
    /**
     * rawAttributes method
     *
     * @param {Element} element - specifies the element
     * @returns {string} - returns the string value
     * @hidden
     * @deprecated
     */
    rawAttributes(element: Element): {
        [key: string]: string;
    };
    /**
     * attributes method
     *
     * @param {Element} element - sepcifies the element.
     * @returns {string} - returns the string value.
     * @hidden
     * @deprecated
     */
    attributes(element?: Element): string;
    /**
     * clearAttributes method
     *
     * @param {Element} element - specifies the element
     * @returns {void}
     * @hidden
     * @deprecated
     */
    clearAttributes(element: Element): void;
    /**
     * openTagString method
     *
     * @param {Element} element - specifies the element.
     * @returns {string} - returns the string
     * @hidden
     * @deprecated
     */
    openTagString(element: Element): string;
    /**
     * closeTagString method
     *
     * @param {Element} element - specifies the element
     * @returns {string} - returns the string value
     * @hidden
     * @deprecated
     */
    closeTagString(element: Element): string;
    /**
     * createTagString method
     *
     * @param {string} tagName - specifies the tag name
     * @param {Element} relativeElement - specifies the relative element
     * @param {string} innerHTML - specifies the string value
     * @returns {string} - returns the string value.
     * @hidden
     * @deprecated
     */
    createTagString(tagName: string, relativeElement: Element, innerHTML: string): string;
    /**
     * isList method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    isList(element: Element): boolean;
    /**
     * isElement method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    isElement(element: Element): boolean;
    /**
     * isEditable method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    isEditable(element: Element): boolean;
    /**
     * hasClass method
     *
     * @param {Element} element - specifes the element.
     * @param {string} className - specifies the class name value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    hasClass(element: Element, className: string): boolean;
    /**
     * replaceWith method
     *
     * @param {Element} element - specifes the element.
     * @param {string} value - specifies the string value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    replaceWith(element: Element, value: string): void;
    /**
     * parseHTMLFragment method
     *
     * @param {string} value - specifies the string value
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    parseHTMLFragment(value: string): Element;
    /**
     * wrap method
     *
     * @param {Element} element - specifies the element
     * @param {Element} wrapper - specifies the element.
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    wrap(element: Element, wrapper: Element): Element;
    /**
     * insertAfter method
     *
     * @param {Element} newNode - specifies the new node element
     * @param {Element} referenceNode - specifies the referenece node
     * @returns {void}
     * @hidden
     * @deprecated
     */
    insertAfter(newNode: Element, referenceNode: Element): void;
    /**
     * wrapInner method
     *
     * @param {Element} parent - specifies the parent element.
     * @param {Element} wrapper - specifies the wrapper element.
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    wrapInner(parent: Element, wrapper: Element): Element;
    /**
     * unWrap method
     *
     * @param {Element} element - specifies the element.
     * @returns {Element} - returns the element.
     * @hidden
     * @deprecated
     */
    unWrap(element: Element): Element[];
    /**
     * getSelectedNode method
     *
     * @param {Element} element - specifies the element
     * @param {number} index - specifies the index value.
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    getSelectedNode(element: Element, index: number): Element;
    /**
     * nodeFinds method
     *
     * @param {Element} element - specifies the element.
     * @param {Element[]} elements - specifies the array of elements
     * @returns {Element[]} - returnts the array elements
     * @hidden
     * @deprecated
     */
    nodeFinds(element: Element, elements: Element[]): Element[];
    /**
     * isEditorArea method
     *
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    isEditorArea(): boolean;
    /**
     * getRangePoint method
     *
     * @param {number} point - specifies the number value.
     * @returns {Range} - returns the range.
     * @hidden
     * @deprecated
     */
    getRangePoint(point?: number): Range | Range[];
    getSelection(): Selection;
    /**
     * getPreviousNode method
     *
     * @param {Element} element - specifies the element
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    getPreviousNode(element: Element): Element;
    /**
     * encode method
     *
     * @param {string} value - specifies the string value
     * @returns {string} - specifies the string value
     * @hidden
     * @deprecated
     */
    encode(value: string): string;
    /**
     * saveMarker method
     *
     * @param {NodeSelection} save - specifies the node selection,
     * @returns {NodeSelection} - returns the value
     * @hidden
     * @deprecated
     */
    saveMarker(save: NodeSelection): NodeSelection;
    private marker;
    /**
     * setMarker method
     *
     * @param {NodeSelection} save - specifies the node selection.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    setMarker(save: NodeSelection): void;
    /**
     * ensureSelfClosingTag method
     *
     * @param {Element} start - specifies the element.
     * @param {string} className - specifes the class name string value
     * @param {Range} range - specifies the range value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ensureSelfClosingTag(start: Element, className: string, range: Range): void;
    /**
     * createTempNode method
     *
     * @param {Element} element - specifies the element.
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    createTempNode(element: Element): Element;
    /**
     * getImageTagInSelection method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    getImageTagInSelection(): NodeListOf<HTMLImageElement>;
    /**
     * Method to wrap the inline and text node with block node.
     *
     * @param {HTMLElement} node - specifies the element sent to wrap the node around it with block nodes.
     * @param {string} wrapperElement - specifies which block nodes to wrap around.
     * @returns {HTMLElement} - returns the wrapped element.
     * @hidden
     * @deprecated
     */
    gatherElementsAround(node: HTMLElement, wrapperElement: string): HTMLElement;
    /**
     * Method to convert all the inline nodes between the selection to block nodes.
     *
     * @param {Node[]} selectedNodes - specifies the nodes of the start and end selection.
     * @param {boolean} fromList - specifies if the method is called from list module.
     * @returns {Node[]} - returns the selected list of elements as block nodes.
     * @hidden
     * @deprecated
     */
    convertToBlockNodes(selectedNodes: Node[], fromList: boolean): Node[];
    /**
     * blockNodes method
     *
     * @param {boolean} action - Optional Boolean that specifies the action is whether performed.
     * @returns {Node[]} - returns the node array values
     * @hidden
     * @deprecated
     */
    blockNodes(action?: boolean): Node[];
    private ignoreTableTag;
    private getPreBlockNodeCollection;
    private getClosestInlineParent;
    private wrapWithBlockNode;
    getImmediateBlockNode(node: Node): Node;
}
