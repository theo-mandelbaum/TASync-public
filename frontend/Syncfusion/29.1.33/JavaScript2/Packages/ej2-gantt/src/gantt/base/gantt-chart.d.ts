import { Gantt } from '../base/gantt';
import { KeyboardEvents, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { ChartScroll } from '../actions/chart-scroll';
import { IGanttData } from '../base/interface';
import { RecordDoubleClickEventArgs } from '../base/interface';
import { VirtualContentRenderer } from '../renderer/virtual-content-render';
/**
 * module to render gantt chart - project view
 */
export declare class GanttChart {
    private parent;
    chartElement: HTMLElement;
    chartTimelineContainer: HTMLElement;
    chartBodyContainer: HTMLElement;
    chartBodyContent: HTMLElement;
    rangeViewContainer: HTMLElement;
    scrollElement: HTMLElement;
    scrollObject: ChartScroll;
    isExpandCollapseFromChart: boolean;
    isExpandAll: boolean;
    isCollapseAll: boolean;
    private focusedElement;
    focusedRowIndex: number;
    debounceTimeoutNext: number;
    debounceTimeout: number;
    private isGanttElement;
    keyboardModule: KeyboardEvents;
    targetElement: Element;
    previousPinchDistance: number;
    virtualRender: VirtualContentRenderer;
    isEditableElement: boolean;
    tempNextElement: any;
    nextElementIndex: number;
    childrenIndex: number;
    private currentToolbarIndex;
    private initPinchDistance;
    private isPinching;
    private preventScrollIntoView;
    constructor(parent: Gantt);
    private addEventListener;
    private renderChartContents;
    /**
     * Method to render top level containers in Gantt chart
     *
     * @returns {void} .
     * @private
     */
    renderChartContainer(): void;
    /**
     * method to render timeline, holidays, weekends at load time
     *
     * @returns {void} .
     */
    private renderInitialContents;
    /**
     * @returns {void} .
     * @private
     */
    renderOverAllocationContainer(): void;
    private renderChartElements;
    /**
     * @param {IGanttData[]} records .
     * @returns {void} .
     * @private
     */
    renderRangeContainer(records: IGanttData[]): void;
    private getTopValue;
    private getHierarchyChildRecords;
    private collectHierarchyChildren;
    private getRangeHeight;
    private calculateCollapsedRowHeight;
    private calculateHierarchyChildLength;
    private calculateExpandedRowHeight;
    private renderRange;
    /**
     * @returns {void} .
     * @private
     */
    renderTimelineContainer(): void;
    /**
     * initiate chart container
     *
     * @returns {void} .
     */
    private renderBodyContainers;
    /**
     * @returns {void} .
     * @private
     */
    updateWidthAndHeight(): void;
    private setVirtualHeight;
    /**
     * Method to update bottom border for chart rows
     *
     * @returns {void} .
     */
    updateLastRowBottomWidth(): void;
    private removeEventListener;
    /**
     * Click event handler in chart side
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     */
    private ganttChartMouseDown;
    private calculatePinchDistance;
    private ganttChartMouseClick;
    private ganttChartMouseUp;
    /**
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     */
    private scrollToTarget;
    /**
     * To focus selected task in chart side
     *
     * @param {number} scrollLeft .
     * @returns {void} .
     * @private
     */
    updateScrollLeft(scrollLeft: number): void;
    /**
     *  Method trigger while perform mouse up action.
     *
     * @param {PointerEvent} e .
     * @returns {void}
     * @private
     */
    private mouseUp;
    /**
     *  Method trigger while perform mouse up action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    private documentMouseUp;
    /**
     * This event triggered when click on taskbar element
     *
     * @param {PointerEvent | KeyboardEventArgs} e .
     * @param {EventTarget} target .
     * @param {Element} taskbarElement .
     * @returns {void}
     */
    onTaskbarClick(e: PointerEvent | KeyboardEventArgs, target: EventTarget, taskbarElement: Element): void;
    /**
     *  Method trigger while perform mouse leave action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    private ganttChartLeave;
    /**
     *  Method trigger while perform mouse move action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    private ganttChartMove;
    /**
     *  Method trigger while perform right click action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    private contextClick;
    /**
     * Method to trigger while perform mouse move on Gantt.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    mouseMoveHandler(e: PointerEvent): void;
    /**
     * Double click handler for chart
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     */
    private doubleClickHandler;
    /**
     * To trigger record double click event.
     *
     * @param {RecordDoubleClickEventArgs} args .
     * @returns {void} .
     * @private
     */
    recordDoubleClick(args: RecordDoubleClickEventArgs): void;
    /**
     * @param {PointerEvent | KeyboardEventArgs} e .
     * @returns {IGanttData} .
     * @private
     */
    getRecordByTarget(e: PointerEvent | KeyboardEventArgs): IGanttData;
    /**
     * To get gantt chart row elements
     *
     * @returns {NodeListOf<Element>} .
     * @private
     */
    getChartRows(): NodeListOf<Element>;
    /**
     * Expand Collapse operations from gantt chart side
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    private chartExpandCollapseRequest;
    /**
     * @returns {void} .
     * @private
     */
    reRenderConnectorLines(): void;
    /**
     * To collapse gantt rows
     *
     * @param {object} args .
     * @param {boolean} isCancel .
     * @returns {void} .
     * @private
     */
    collapseGanttRow(args: object): void;
    /**
     * @returns {void} .
     * @param {object} args .
     * @private
     */
    collapsedGanttRow(args: object): void;
    /**
     * To expand gantt rows
     *
     * @returns {void} .
     * @param {object} args .
     * @param {boolean} isCancel .
     * @private
     */
    expandGanttRow(args: object): void;
    /**
     * @returns {void} .
     * @param {object} args .
     * @private
     */
    expandedGanttRow(args: object): void;
    private renderMultiTaskbar;
    /**
     * On expand collapse operation row properties will be updated here.
     *
     * @param {string} action .
     * @param {Node} rowElement .
     * @param {IGanttData} record .
     * @param {boolean} isChild .
     * @returns {void} .
     * @private
     */
    private expandCollapseChartRows;
    /**
     * Public method to expand or collapse all the rows of Gantt
     *
     * @returns {void}
     * @param {string} action .
     * @private
     */
    expandCollapseAll(action: string): void;
    /**
     * Public method to expand particular level of rows.
     *
     * @returns {void} .
     * @param {number} level .
     * @private
     */
    expandAtLevel(level: number): void;
    /**
     * Public method to collapse particular level of rows.
     *
     * @returns {void} .
     * @param {number} level .
     * @private
     */
    collapseAtLevel(level: number): void;
    /**
     * Event Binding for gantt chart click
     *
     * @returns {void} .
     */
    private wireEvents;
    private unWireEvents;
    private onWheelZoom;
    /**
     * To get record by taskbar element.
     *
     * @param {Element} target .
     * @returns {IGanttData} .
     * @private
     */
    getRecordByTaskBar(target: Element): IGanttData;
    private updateElement;
    /**
     * Trigger Tab & Shift + Tab keypress to highlight active element.
     *
     * @param {KeyboardEventArgs} e .
     * @returns {void} .
     * @private
     */
    onTabAction(e: KeyboardEventArgs): void;
    /**
     * Get next/previous sibling element.
     *
     * @param {Element} $target .
     * @param {boolean} isTab .
     * @param {boolean} isInEditedState .
     * @returns {Element | string} .
     */
    private getNextElement;
    /**
     * Get next/previous row element.
     *
     * @param {number} rowIndex .
     * @param {boolean} isTab .
     * @param {boolean} isChartRow .
     * @returns {Element} .
     */
    private getNextRowElement;
    /**
     * Validate next/previous sibling element haschilds.
     *
     * @param {Element} $target .
     * @param {string} className .
     * @returns {boolean} .
     */
    private validateNextElement;
    /**
     * Getting child element based on row element.
     *
     * @param {Element} rowElement .
     * @param {boolean} isTab .
     * @returns {Element | string} .
     */
    private getChildElement;
    /**
     * Add/Remove active element.
     *
     * @private
     * @param {HTMLElement} element .
     * @param {string} focus .
     * @param {boolean} isChartElement .
     * @param {string} keyAction .
     * @returns {void} .
     */
    manageFocus(element: HTMLElement, focus: string, isChartElement?: boolean, keyAction?: string): void;
    /**
     * To get index by taskbar element.
     *
     * @param {Element} target .
     * @returns {number} .
     * @private
     */
    getIndexByTaskBar(target: Element): number;
    private destroy;
}
