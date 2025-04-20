import { TreeMap } from '../treemap';
/**
 * Performing treemap highlight
 */
export declare class TreeMapHighlight {
    private treemap;
    highLightId: string;
    private target;
    shapeTarget: string;
    private shapeElement;
    shapeHighlightCollection: any[];
    legendHighlightCollection: any[];
    currentElement: any[];
    constructor(treeMap: TreeMap);
    /**
     * Mouse Move event in highlight
     *
     * @param {PointerEvent} e - Specifies the pointer argument.
     * @returns {boolean} - return the highlight process is true or false.
     * @private
     */
    mouseMove(e: PointerEvent | KeyboardEvent): boolean;
    /**
     * This method highlights the target element for mouse move event.
     *
     * @param {Element} targetElement - Specifies the target element to highlight.
     * @returns {boolean} - return the highlight process is true or false.
     * @private
     */
    highlightOnMouseMove(targetElement: Element): boolean;
    /**
     * To bind events for highlight
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * To unbind events for highlight
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the hightlight.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
/**
 * Performing treemap selection
 */
export declare class TreeMapSelection {
    private treemap;
    legendSelectId: string;
    shapeSelectId: string;
    shapeElement: Element;
    shapeSelectionCollection: any[];
    legendSelectionCollection: any[];
    shapeSelect: boolean;
    legendSelect: boolean;
    constructor(treeMap: TreeMap);
    /**
     * Mouse down event in selection
     *
     * @param {PointerEvent} e - Specifies the pointer argument.
     * @returns {void}
     * @private
     */
    mouseDown(e: PointerEvent | KeyboardEvent): void;
    /**
     * This method selects the target element for mouse down event.
     *
     * @param {Element} targetEle - Specifies the target element that was clicked.
     * @returns {void}
     * @private
     */
    selectionOnMouseDown(targetEle: Element): void;
    /**
     * @param {string} levelOrder - Specifies the level order of treemap item
     * @param {boolean} enable - Specifies the boolean value
     * @returns {void}
     * @private
     */
    selectTreemapItem(levelOrder: string, enable: boolean): void;
    /**
     * To bind events for selection
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * To unbind events for selection
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
