import { Dictionary } from '../../base/dictionary';
import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { Selection } from '../index';
import { DocumentEditor } from '../../document-editor';
import { Action } from '../../index';
import { BaseHistoryInfo } from './base-history-info';
import { ModifiedParagraphFormat, ModifiedLevel } from './history-helper';
import { HistoryInfo } from './history-info';
import { Point } from '../editor/editor-helper';
import { TableResizer } from '../editor/table-resizer';
import { DocumentHelper } from '../viewer';
/**
 *  `EditorHistory` Module class is used to handle history preservation
 */
export declare class EditorHistory {
    private undoLimitIn;
    private redoLimitIn;
    private undoStackIn;
    private redoStackIn;
    /**
     * @private
     */
    historyInfoStack: HistoryInfo[];
    private isUndoGroupingEnded;
    private owner;
    /**
     * @private
     */
    isUndoing: boolean;
    /**
     * @private
     */
    isRedoing: boolean;
    /**
     * @private
     */
    currentBaseHistoryInfo: BaseHistoryInfo;
    /**
     * @private
     * @returns {HistoryInfo} - Returns the history info.
     */
    /**
    * @private
    * @param {HistoryInfo} value - Specified the value.
    */
    currentHistoryInfo: HistoryInfo;
    /**
     * @private
     */
    modifiedParaFormats: Dictionary<BaseHistoryInfo, ModifiedParagraphFormat[]>;
    /**
     * @private
     */
    documentHelper: DocumentHelper;
    /**
     * @private
     */
    lastOperation: BaseHistoryInfo;
    /**
     * gets undo stack
     *
     * @private
     * @returns {BaseHistoryInfo[]} - Returns the undo stack.
     */
    readonly undoStack: BaseHistoryInfo[];
    /**
     * gets redo stack
     *
     * @private
     * @returns {BaseHistoryInfo[]} - Returns the redo stack.
     */
    readonly redoStack: BaseHistoryInfo[];
    /**
     * Gets the limit of undo operations can be done.
     *
     * @aspType int
     * @returns {number} - Returns the redo limit
     */
    /**
    * Sets the limit of undo operations can be done.
    *
    * @aspType int
    * @param {number} value - Specifies the value to set undo limit.
    */
    undoLimit: number;
    /**
     * Gets the limit of redo operations can be done.
     *
     * @aspType int
     * @returns {number} - Returns the redo limit.
     */
    /**
    * Sets the limit of redo operations can be done.
    *
    * @aspType int
    * @param {number} value Specifies the value to set redo limit.
    */
    redoLimit: number;
    /**
     * @param {DocumentEditor} node - Specified the document editor.
     * @private
     */
    constructor(node: DocumentEditor);
    private readonly viewer;
    private getModuleName;
    /**
     * Determines whether the undo operation can be done.
     *
     * @returns {boolean} - Returns true if can undo; Otherwise, false.
     */
    canUndo(): boolean;
    /**
     * Determines whether the redo operation can be done.
     *
     * @returns {boolean} - Returns true if can redo; Otherwise, false.
     */
    canRedo(): boolean;
    /**
     * initialize EditorHistory
     *
     * @private
     * @param {Action} action - Specifies the action.
     * @returns {void}
     */
    initializeHistory(action: Action): void;
    /**
     * Initialize complex history
     *
     * @private
     * @param {Selection} selection - Specifies the selection.
     * @param {Action} action - Specifies the action.
     * @returns {void}
     */
    initComplexHistory(selection: Selection, action: Action): void;
    /**
     * @private
     * @param {Point} startingPoint - Specifies the start point.
     * @param {TableResizer} tableResize - Spcifies the table resizer.
     * @returns {void}
     */
    initResizingHistory(startingPoint: Point, tableResize: TableResizer): void;
    /**
     * Starts a new undo able action.
     * > All editing and formatting changes made between `beginUndoAction` and `endUndoAction` will be grouped together as a single undo able action.
     *
     * @returns {void}
     */
    beginUndoAction(): void;
    /**
     * Ends the current undo able action.
     * > All editing and formatting changes made between `beginUndoAction` and `endUndoAction` will be grouped together as a single undo able action.
     *
     * @returns {void}
     */
    endUndoAction(): void;
    /**
     * Update resizing history
     *
     * @private
     * @param {Point} point - Specifies the point.
     * @param {TableResizer} tableResize - Specifies the table resizer.
     * @returns {void}
     */
    updateResizingHistory(point: Point, tableResize: TableResizer): void;
    /**
     * Record the changes
     *
     * @private
     * @param {BaseHistoryInfo} baseHistoryInfo - Specified the base history info.
     * @returns {void}
     */
    recordChanges(baseHistoryInfo: BaseHistoryInfo): void;
    /**
     * update EditorHistory
     *
     * @private
     * @returns {void}
     */
    updateHistory(): void;
    /**
     * @private
     * @returns {boolean} -Returns isHandleComplexHistory
     */
    isHandledComplexHistory(): boolean;
    /**
     * Update complex history
     *
     * @private
     * @returns {void}
     */
    updateComplexHistory(): void;
    /**
     * @private
     *
     * @returns {void}
     */
    updateComplexHistoryInternal(): void;
    /**
     * update list changes for history preservation
     *
     * @private
     * @param  {WAbstractList} currentAbstractList - Specfies the abstractlist.
     * @param  {WList} list - Specifies the list.
     * @returns {Dictionary<number, ModifiedLevel>} - Returns the modified action.
     */
    updateListChangesInHistory(currentAbstractList: WAbstractList, list: WList): Dictionary<number, ModifiedLevel>;
    /**
     * Apply list changes
     *
     * @private
     * @param  {Selection} selection - Specifies the selection.
     * @param  {Dictionary<number, ModifiedLevel>} modifiedLevelsInternal - Specifies the modified levels.
     * @returns {void}
     */
    applyListChanges(selection: Selection, modifiedLevelsInternal: Dictionary<number, ModifiedLevel>): void;
    /**
     * Update list changes
     *
     * @private
     * @param  {Dictionary<number, ModifiedLevel>} modifiedCollection - Specifies the modified colection.
     * @returns {void }
     */
    updateListChanges(modifiedCollection: Dictionary<number, ModifiedLevel>): void;
    /**
     * Reverts the last editing action.
     *
     * @returns {void}
     */
    undo(): void;
    /**
     * Performs the last reverted action.
     *
     * @returns {void}
     */
    redo(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @private
     * @returns {void}
     */
    clearHistory(): void;
    private clearUndoStack;
    private clearRedoStack;
}
