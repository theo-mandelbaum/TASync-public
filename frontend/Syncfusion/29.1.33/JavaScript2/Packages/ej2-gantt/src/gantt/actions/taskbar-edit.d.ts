import { Gantt } from '../base/gantt';
import { IGanttData, ITaskData, ITaskbarEditedEventArgs, ITaskSegment } from '../base/interface';
import { DateProcessor } from '../base/date-processor';
/**
 * File for handling taskbar editing operation in Gantt.
 */
export declare class TaskbarEdit extends DateProcessor {
    protected parent: Gantt;
    taskBarEditElement: HTMLElement;
    taskBarEditRecord: IGanttData;
    taskBarEditAction: string;
    roundOffDuration: boolean;
    private droppedTarget;
    leftValue: number;
    private previousLeftValue;
    private mouseDownX;
    private mouseDownY;
    mouseMoveX: number;
    mouseMoveY: number;
    previousItem: ITaskData;
    previousItemProperty: string[];
    taskbarEditedArgs: ITaskbarEditedEventArgs;
    private progressBorderRadius;
    private scrollTimer;
    timerCount: number;
    dragMouseLeave: boolean;
    tooltipPositionX: number;
    isMouseDragged: boolean;
    private falseLine;
    connectorSecondElement: Element;
    connectorSecondRecord: IGanttData;
    connectorSecondAction: string;
    fromPredecessorText: string;
    toPredecessorText: string;
    finalPredecessor: string;
    dependencyCancel: boolean;
    drawPredecessor: boolean;
    private highlightedSecondElement;
    private editTooltip;
    private isDragged;
    private canDrag;
    private mainElement;
    private currentSegmentIndex;
    private progressValue;
    /** @private */
    tapPointOnFocus: boolean;
    private editElement;
    touchEdit: boolean;
    private prevZIndex;
    private previousMouseMove;
    private elementOffsetLeft;
    private elementOffsetTop;
    private elementOffsetWidth;
    private elementOffsetHeight;
    segmentIndex: number;
    private targetElement;
    currentItemTop: number;
    currentItemPrevTop: number;
    topValue: number;
    draggedRecordMarginTop: string;
    dragMoveY: number;
    private realTaskbarElement;
    private cloneTaskbarElement;
    private taskbarElement;
    private taskbarResizer;
    private currentIndex;
    private currentData;
    private isClonedElement;
    private draggedTreeGridRowElement;
    private draggedTreeGridRowHeight;
    private updatePosition;
    private tooltipValue;
    previousFlatData: object[];
    previousIds: string[];
    private oldData;
    constructor(ganttObj?: Gantt);
    private wireEvents;
    /**
     * To initialize the public property.
     *
     * @returns {void} .
     * @private
     */
    private initPublicProp;
    private mouseDownHandler;
    private mouseClickHandler;
    private showHideActivePredecessors;
    private applyActiveColor;
    private validateConnectorPoint;
    private mouseLeaveHandler;
    /**
     * To update taskbar edited elements on mouse down action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    updateTaskBarEditElement(e: PointerEvent): void;
    /**
     * To show/hide taskbar editing elements.
     *
     * @param {Element} element .
     * @param {Element} secondElement .
     * @param {boolean} fadeConnectorLine .
     * @returns {void} .
     * @private
     */
    showHideTaskBarEditingElements(element: Element, secondElement: Element, fadeConnectorLine?: boolean): void;
    /**
     * To get taskbar edit actions.
     *
     * @param {PointerEvent} e .
     * @returns {string} .
     * @private
     */
    private getTaskBarAction;
    /**
     * To update property while perform mouse down.
     *
     * @param {PointerEvent} event .
     * @returns {void} .
     * @private
     */
    private updateMouseDownProperties;
    private isMouseDragCheck;
    removeFirstBorder(element: any): void;
    removeLastBorder(element: Element): void;
    private removetopOrBottomBorder;
    private topOrBottomBorder;
    private removeChildBorder;
    private addRemoveClasses;
    private addErrorElem;
    private removeErrorElem;
    ensurePosition(draggedRecords: IGanttData[], currentRecord: IGanttData): void;
    /**
     * To handle mouse move action in chart
     *
     * @param {PointerEvent} event .
     * @returns {void} .
     * @private
     */
    mouseMoveAction(event: PointerEvent): void;
    /**
     * Method to update taskbar editing action on mous move.
     *
     * @param {PointerEvent} e .
     * @param {boolean} isMouseClick .
     * @returns {void} .
     * @private
     */
    taskBarEditingAction(e: PointerEvent, isMouseClick: boolean): void;
    /**
     * To update property while perform mouse move.
     *
     * @param {PointerEvent} event .
     * @returns {void} .
     * @private
     */
    private updateMouseMoveProperties;
    /**
     * To start the scroll timer.
     *
     * @param {string} direction .
     * @returns {void} .
     * @private
     */
    startScrollTimer(direction: string): void;
    /**
     * To stop the scroll timer.
     *
     * @returns {void} .
     * @private
     */
    stopScrollTimer(): void;
    /**
     * To update left and width while perform taskbar drag operation.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    private enableDragging;
    private validateProgressWidth;
    /**
     * To update left and width while perform progress resize operation.
     *
     * @param {PointerEvent} e .
     * @param {number} segmentIndex .
     * @returns {void} .
     * @private
     */
    private performProgressResize;
    /**
     * To update left and width while perform taskbar left resize operation.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    private enableLeftResizing;
    private enableSplitTaskLeftResize;
    /**
     * Update mouse position and edited item value
     *
     * @param {PointerEvent} e .
     * @param {ITaskData} item .
     * @returns {void} .
     */
    private updateEditPosition;
    /**
     *  To update milestone property.
     *
     * @param {ITaskData} item .
     * @returns {void} .
     * @private
     */
    private updateIsMilestone;
    /**
     * To update left and width while perform taskbar right resize operation.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    private enableRightResizing;
    /**
     * To updated startDate and endDate while perform taskbar edit operation.
     *
     * @returns {void} .
     * @private
     */
    private updateEditedItem;
    private updateChildDrag;
    private updateSplitLeftResize;
    private updateSplitRightResizing;
    sumOfDuration(segments: ITaskSegment[]): number;
    private setSplitTaskDrag;
    /**
     * To get roundoff enddate.
     *
     * @param {ITaskData} ganttRecord .
     * @param {boolean} isRoundOff .
     * @returns {number} .
     * @private
     */
    private getRoundOffEndLeft;
    /**
     * To get roundoff startdate.
     *
     * @param {ITaskData | ITaskSegment} ganttRecord .
     * @param {boolean} isRoundOff .
     * @returns {number} .
     * @private
     */
    getRoundOffStartLeft(ganttRecord: ITaskData | ITaskSegment, isRoundOff: boolean): number;
    /**
     * To get date by left value.
     *
     * @param {number} left .
     * @param {boolean} isMilestone .
     * @param {ITaskData} property .
     * @returns {Date} .
     * @private
     */
    getDateByLeft(left: number, isMilestone?: boolean, property?: ITaskData): Date;
    /**
     * To set item position.
     *
     * @returns {void} .
     * @private
     */
    private setItemPosition;
    /**
     * To handle mouse up event in chart
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    mouseUpHandler(e: PointerEvent): void;
    /**
     * To perform taskbar edit operation.
     *
     * @param {PointerEvent} event .
     * @returns {void} .
     * @private
     */
    taskBarEditedAction(event: PointerEvent): void;
    /**
     * To cancel the taskbar edt action.
     *
     * @returns {void} .
     * @private
     */
    cancelTaskbarEditActionInMouseLeave(): void;
    updateSegmentProgress(taskData: ITaskData): void;
    /**
     * To trigger taskbar edited event.
     *
     * @param {ITaskbarEditedEventArgs} arg .
     * @returns {void} .
     * @private
     */
    taskbarEdited(arg: ITaskbarEditedEventArgs): void;
    /**
     * To get progress in percentage.
     *
     * @param {number} parentwidth .
     * @param {number} progresswidth .
     * @returns {number} .
     * @private
     */
    private getProgressPercent;
    /**
     * false line implementation.
     *
     * @returns {void} .
     * @private
     */
    private drawFalseLine;
    /**
     *
     * @param {boolean} isRemoveConnectorPointDisplay .
     * @returns {void} .
     * @private
     */
    removeFalseLine(isRemoveConnectorPointDisplay: boolean): void;
    /**
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    updateConnectorLineSecondProperties(e: PointerEvent): void;
    private triggerDependencyEvent;
    private getCoordinate;
    private getElementByPosition;
    private multipleSelectionEnabled;
    private unWireEvents;
    /**
     * @returns {void} .
     * @private
     */
    destroy(): void;
}
