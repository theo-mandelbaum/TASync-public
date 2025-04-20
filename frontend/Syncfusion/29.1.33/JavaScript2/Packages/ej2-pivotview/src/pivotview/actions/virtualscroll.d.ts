import { PivotView } from '../base/pivotview';
/**
 * `VirtualScroll` module is used to handle scrolling behavior.
 */
export declare class VirtualScroll {
    private parent;
    private previousValues;
    private frozenPreviousValues;
    private pageXY;
    private eventType;
    private engineModule;
    private isFireFox;
    /** @hidden */
    direction: string;
    private keyboardEvents;
    private isScrolling;
    /**
     * Constructor for PivotView scrolling.
     *
     * @param {PivotView} parent - Instance of pivot table.
     * @hidden
     */
    constructor(parent?: PivotView);
    /**
     * It returns the Module name.
     *
     * @returns {string} - string.
     * @hidden
     */
    getModuleName(): string;
    private addInternalEvents;
    private wireEvents;
    private onWheelScroll;
    private getPointXY;
    private onCustomScrollbarScroll;
    private onTouchScroll;
    private update;
    private enginePopulatedEventMethod;
    private setPageXY;
    private common;
    /**
     * It performs while scrolling horizontal scroll bar
     *
     * @param {HTMLElement} mHdr - It contains the header details.
     * @param {HTMLElement} mCont - It contains the content details.
     * @returns {Function} - It returns the table details as Function.
     * @hidden
     */
    onHorizondalScroll(mHdr: HTMLElement, mCont: HTMLElement): Function;
    /**
     * It performs while scrolling horizontal scroll bar
     *
     * @param {number} horiOffset - It contains the horizondal offset translation value of freezed cells.
     * @param {boolean} isParentCells - It helps to identify the frozen cells of the parent element.
     * @returns {void}
     * @hidden
     */
    alignFreezedCells(horiOffset: number, isParentCells: boolean): void;
    private onVerticalScroll;
    /**
     * @hidden
     */
    removeInternalEvents(): void;
    /**
     * To destroy the virtualscrolling event listener
     *
     * @returns {void}
     * @hidden
     */
    destroy(): void;
    private setFrozenColumnPosition;
}
