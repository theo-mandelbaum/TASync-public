import { Kanban } from '../base/kanban';
import { DragArgs } from '../base/interface';
/**
 * Drag and Drop module is used to perform card actions.
 */
export declare class DragAndDrop {
    private parent;
    dragObj: DragArgs;
    private dragEdges;
    isDragging: boolean;
    private kanbanObj;
    private isExternalDrop;
    private borderElm;
    private insertClone;
    /**
     * Constructor for drag and drop module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    constructor(parent: Kanban);
    wireDragEvents(element: HTMLElement): void;
    private dragHelper;
    private dragStart;
    private draggedClone;
    private drag;
    private removeElement;
    private isTargetElementVisible;
    private externalDrop;
    private multiCloneCreate;
    private allowedTransition;
    private cellDropping;
    private addDropping;
    private updateDimension;
    private keydownHandler;
    private dragStop;
    removeEmptyTrElement(): void;
    private dragStopClear;
    private dragStopPostClear;
    private updateDroppedData;
    private changeOrder;
    private toggleVisible;
    private multiCloneRemove;
    private calculateArgs;
    private getPageCoordinates;
    private getColumnKey;
    private updateScrollPosition;
    private autoScrollValidation;
    private autoScroll;
    unWireDragEvents(element: HTMLElement): void;
}
