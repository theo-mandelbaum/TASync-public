import { Diagram } from '../diagram';
import { HistoryEntry } from '../diagram/history';
import { NodeModel } from '../objects/node-model';
import { Node } from './node';
/**
 * Undo redo function used for revert and restore the changes
 */
export declare class UndoRedo {
    private groupUndo;
    private childTable;
    private historyCount;
    private hasGroup;
    private groupCount;
    private undoOffsets;
    checkRedo: boolean;
    /**
     * initHistory method \
     *
     * @returns { void } initHistory method .\
     * @param {Diagram} diagram - provide the points value.
     *
     * @private
     */
    initHistory(diagram: Diagram): void;
    /**
     * addHistoryEntry method \
     *
     * @returns { void } addHistoryEntry method .\
     * @param {HistoryEntry} entry - provide the points value.
     * @param {Diagram} diagram - provide the points value.
     *
     * @private
     */
    addHistoryEntry(entry: HistoryEntry, diagram: Diagram): boolean;
    /**
     * applyLimit method \
     *
     * @returns { void } applyLimit method .\
     * @param {HistoryEntry} list - provide the list value.
     * @param {number} stackLimit - provide the list value.
     * @param {Diagram} diagram - provide the list value.
     * @param {boolean} limitHistory - provide the list value.
     *
     * @private
     */
    applyLimit(list: HistoryEntry, stackLimit: number, diagram: Diagram, limitHistory?: boolean): void;
    /**
     * clearHistory method \
     *
     * @returns { void } clearHistory method .\
     * @param {Diagram} diagram - provide the points value.
     *
     * @private
     */
    clearHistory(diagram: Diagram): void;
    private setEntryLimit;
    private limitHistoryStack;
    private removeFromStack;
    /**
     * undo method \
     *
     * @returns { void } undo method .\
     * @param {Diagram} diagram - provide the diagram value.
     *
     * @private
     */
    undo(diagram: Diagram): void;
    private getHistoryList;
    private getHistroyObject;
    private undoGroupAction;
    private undoEntry;
    private checkNodeObject;
    private group;
    private unGroup;
    private ignoreProperty;
    private getProperty;
    private recordLaneOrPhaseCollectionChanged;
    private recordAnnotationChanged;
    private recordChildCollectionChanged;
    /**
     * removeChildFromLane method \
     *
     * @returns { void } undo method .\
     * @param {Diagram} diagram - provide the diagram value.
     * @param {NodeModel} parentNode - provide the lane obj.
     * @param {Node} actualObject - provide the node value.
     * @private
     */
    removeChildFromLane(diagram: Diagram, parentNode: NodeModel, actualObject: Node): void;
    private recordStackPositionChanged;
    private recordGridSizeChanged;
    private recordLanePositionChanged;
    private recordPortChanged;
    private recordPropertyChanged;
    private recordOrderCommandChanged;
    private recordAddChildToGroupNode;
    private recordRemoveChildFromGroupNode;
    private recordSegmentChanged;
    private segmentChanged;
    private recordPositionChanged;
    private positionChanged;
    private recordSizeChanged;
    private sizeChanged;
    private recordRotationChanged;
    private rotationChanged;
    private recordConnectionChanged;
    private connectionChanged;
    private recordCollectionChanged;
    /**
     * updateConnectorZindex method \
     *
     * @returns { void }
     * @param {NodeModel | ConnectorModel} obj - provide the diagram value.
     * @param {Diagram} diagram - provide the diagram value.
     * @private
     */
    private updateConnectorZindex;
    private recordLabelCollectionChanged;
    private recordPortCollectionChanged;
    /**
     * redo method \
     *
     * @returns { void } redo method .\
     * @param {Diagram} diagram - provide the diagram value.
     *
     * @private
     */
    redo(diagram: Diagram): void;
    private redoGroupAction;
    private redoEntry;
    private getUndoEntry;
    private getRedoEntry;
    /**
     * Constructor for the undo redo module
     *
     * @private
     */
    constructor();
    /**
     * To destroy the undo redo module
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * @returns { string } toBounds method .\
     * Get getModuleName name.
     */
    protected getModuleName(): string;
}
